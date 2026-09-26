#!/usr/bin/env node
/**
 * 批量抓取:遍历 data/books.json,逐本(带并发/限流/断点续抓)调用 fetchOne。
 * - 已有 ok meta 且未过期的书跳过(断点续抓;--force 全量重抓)
 * - 上游标记 deprecated 的条目直接落 failed meta(外链降级),不尝试抓取
 * - 输出 content/report.json + 控制台摘要
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
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
  };
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error(`超时 ${ms}ms`)), ms)),
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
  });
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
          const ageDays = (Date.now() - new Date(prev.fetchedAt).getTime()) / 86400000;
          const fresh = prev.status === 'ok' && (opts.refresh ? ageDays < STALE_DAYS : true);
          if (fresh) {
            results.push({ id: book.id, title: book.title, status: 'cached', chapters: prev.chapters.length });
            continue;
          }
        } catch { /* 损坏的 meta 视同未抓取 */ }
      }
      if (book.status === 'deprecated') {
        results.push({ id: book.id, title: book.title, status: 'skipped-deprecated' });
        // 直接落 failed meta(不发起抓取):详情页据此明确走外链
        const outDir = join(CONTENT_DIR, book.id);
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
      const started = Date.now();
      try {
        const meta = await withTimeout(fetchOne(book, { workDir }), BOOK_TIMEOUT_MS);
        results.push({ id: book.id, title: book.title, status: meta.status, chapters: meta.chapters.length, error: meta.error, ms: Date.now() - started });
        console.log(`  ${meta.status === 'ok' ? '✓' : '△'} ${book.title} (${meta.chapters.length} 章${meta.error ? `, ${meta.error}` : ''})`);
      } catch (e) {
        results.push({ id: book.id, title: book.title, status: 'failed', error: String(e.message || e) });
        console.log(`  ✗ ${book.title}: ${e.message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const summary = {
    generatedAt: new Date().toISOString(),
    total: results.length,
    ok: results.filter((r) => r.status === 'ok').length,
    cached: results.filter((r) => r.status === 'cached').length,
    partial: results.filter((r) => r.status === 'partial').length,
    failed: results.filter((r) => r.status === 'failed').length,
    skippedDeprecated: results.filter((r) => r.status === 'skipped-deprecated').length,
    results,
  };
  writeFileSync(join(ROOT, 'content', 'report.json'), JSON.stringify(summary, null, 2) + '\n', 'utf8');
  console.log(
    `\n完成:成功 ${summary.ok},缓存 ${summary.cached},部分 ${summary.partial},失败 ${summary.failed},跳过(失效) ${summary.skippedDeprecated}`,
  );
}

main();
