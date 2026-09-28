#!/usr/bin/env node
/**
 * 批量抓取:遍历 data/books.json,逐本(带并发/限流/断点续抓)调用 fetchOne。
 * - 已有 ok meta 且未过期的书跳过(断点续抓;--force 全量重抓)
 * - 上游标记 deprecated 的条目直接落 failed meta(外链降级),不尝试抓取
 * - 输出 content/report.json + 控制台摘要
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchOne } from './fetch-book.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'content', 'books');
const CONCURRENCY = 4;
const BOOK_TIMEOUT_MS = 120000;
/** 重抓周期:超过该天数的成功记录在 --refresh 模式下会重抓 */
const STALE_DAYS = 30;

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    force: args.includes('--force'),
    refresh: args.includes('--refresh'),
    limit: Number(args.find((a) => a.startsWith('--limit='))?.split('=')[1]) || Infinity,
    only: args.find((a) => a.startsWith('--only='))?.split('=')[1], // 分类名过滤
    idsFile: args.find((a) => a.startsWith('--ids-file='))?.split('=')[1], // 仅抓取列出的 id(上游同步增量)
    // 上游 :worried: 标记的条目也尝试抓取(部分网站可能已恢复;抓不到自动降级外链)
    retryDeprecated: args.includes('--retry-deprecated'),
  };
}

/** 整本书超时:AbortController 贯穿到底层 fetch,超时即真正取消(而非留下僵尸继续写盘)。
 * @param {(signal: AbortSignal) => Promise} createPromise 接收取消信号的 promise 工厂 */
function withTimeout(createPromise, ms) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), ms);
  timer.unref?.();
  const timeout = new Promise((_, rej) =>
    ac.signal.addEventListener('abort', () => rej(new Error(`超时 ${ms}ms`)), { once: true }),
  );
  return Promise.race([
    createPromise(ac.signal).then(
      (v) => {
        clearTimeout(timer);
        return v;
      },
      (e) => {
        clearTimeout(timer);
        throw e;
      },
    ),
    timeout,
  ]);
}

async function main() {
  const opts = parseArgs();
  const books = JSON.parse(readFileSync(join(ROOT, 'data', 'books.json'), 'utf8'));
  const workDir = join(ROOT, 'data', 'tmp');
  mkdirSync(workDir, { recursive: true });

  let allowIds = null;
  if (opts.idsFile) {
    allowIds = new Set(
      readFileSync(join(ROOT, opts.idsFile), 'utf8')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    );
  }
  const queue = books.filter((b) => {
    if (allowIds && !allowIds.has(b.id)) return false;
    if (opts.only && b.categoryPath[0] !== opts.only) return false;
    return true;
  }).slice(0, opts.limit);
  console.log(`待处理 ${queue.length} 本(共 ${books.length}),并发 ${CONCURRENCY}`);

  const results = [];
  let index = 0;
  async function worker() {
    while (index < queue.length) {
      const book = queue[index++];
      const metaPath = join(CONTENT_DIR, book.id, 'meta.json');
      if (!opts.force && existsSync(metaPath)) {
        try {
          const prev = JSON.parse(readFileSync(metaPath, 'utf8'));
          const lastSeen = Math.max(
            new Date(prev.fetchedAt || 0).getTime(),
            new Date(prev.keptAt || 0).getTime(),
          );
          const ageDays = (Date.now() - lastSeen) / 86400000;
          const fresh = prev.status === 'ok' && (opts.refresh ? ageDays < STALE_DAYS : true);
          if (fresh) {
            results.push({ id: book.id, title: book.title, status: 'cached', chapters: prev.chapters.length });
            continue;
          }
        } catch { /* 损坏的 meta 视同未抓取 */ }
      }
      if (book.status === 'deprecated' && !opts.retryDeprecated) {
        results.push({ id: book.id, title: book.title, status: 'skipped-deprecated' });
        // 落 failed meta 并清理旧章节(曾有 ok 内容的书在此不会残留孤儿文件)
        const outDir = join(CONTENT_DIR, book.id);
        rmSync(outDir, { recursive: true, force: true });
        mkdirSync(outDir, { recursive: true });
        writeFileSync(
          join(outDir, 'meta.json'),
          JSON.stringify(
            {
              bookId: book.id,
              title: book.title,
              url: book.url,
              status: 'failed',
              error: '上游标记疑似失效,未尝试抓取',
              fetchedAt: new Date().toISOString(),
              chapters: [],
            },
            null,
            2,
          ) + '\n',
          'utf8',
        );
        continue;
      }
      // H2:每本书独立 workDir 子目录——并发下 GitHub tarball 解压互不干扰
      const bookWorkDir = join(workDir, book.id);
      mkdirSync(bookWorkDir, { recursive: true });
      const started = Date.now();
      try {
        const meta = await withTimeout((signal) => fetchOne(book, { workDir: bookWorkDir, signal }), BOOK_TIMEOUT_MS);
        const chapters = meta.status === 'kept' ? meta.keptChapters : meta.chapters.length;
        results.push({ id: book.id, title: book.title, status: meta.status, chapters, error: meta.error, ms: Date.now() - started });
        const mark = meta.status === 'ok' ? '✓' : meta.status === 'kept' ? '⟳' : '△';
        console.log(`  ${mark} ${book.title} (${chapters} 章${meta.error ? `, ${meta.error}` : ''})`);
      } catch (e) {
        results.push({ id: book.id, title: book.title, status: 'failed', error: String(e.message || e) });
        console.log(`  ✗ ${book.title}: ${e.message}`);
      } finally {
        // 独立 workDir 用后即清,防止磁盘随轮次增长
        rmSync(bookWorkDir, { recursive: true, force: true });
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const summary = {
    generatedAt: new Date().toISOString(),
    total: results.length,
    ok: results.filter((r) => r.status === 'ok').length,
    cached: results.filter((r) => r.status === 'cached').length,
    kept: results.filter((r) => r.status === 'kept').length,
    partial: results.filter((r) => r.status === 'partial').length,
    failed: results.filter((r) => r.status === 'failed').length,
    skippedDeprecated: results.filter((r) => r.status === 'skipped-deprecated').length,
    results,
  };
  // --ids-file 增量模式:合并进既有 report,而不是覆盖(否则全量统计被子集冲掉)
  const reportPath = join(ROOT, 'content', 'report.json');
  if (opts.idsFile && existsSync(reportPath)) {
    try {
      const prev = JSON.parse(readFileSync(reportPath, 'utf8'));
      const byId = new Map((prev.results || []).map((r) => [r.id, r]));
      for (const r of results) byId.set(r.id, r);
      const merged = [...byId.values()];
      summary.total = merged.length;
      for (const k of ['ok', 'cached', 'kept', 'partial', 'failed', 'skippedDeprecated']) {
        summary[k] = merged.filter((r) => r.status === k).length;
      }
      summary.results = merged;
      summary.mergedFromPartialRun = true;
    } catch { /* 旧 report 损坏则直接覆盖 */ }
  }
  writeFileSync(reportPath, JSON.stringify(summary, null, 2) + '\n', 'utf8');
  console.log(
    `\n完成:成功 ${summary.ok},缓存 ${summary.cached},保留 ${summary.kept},部分 ${summary.partial},失败 ${summary.failed},跳过(失效) ${summary.skippedDeprecated}`,
  );
}

main();
