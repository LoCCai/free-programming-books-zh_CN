#!/usr/bin/env node
/**
 * 单本抓取调度:node scripts/fetch-book.mjs <bookId|url>
 *
 * 产物写入 content/books/<id>/:
 * - meta.json  抓取状态 + 章节树(阅读器 getStaticPaths 依赖)
 * - chapters/*.md  章节正文(相对链接已绝对化)
 *
 * 状态机:ok(全部章节)/ partial(抓到部分)/ failed(降级为外链,不产出章节)
 */
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { fetchGithubBook, absolutizeMd } from './lib/fetch-github.mjs';
import { fetchWebBook, absolutizeWebMd } from './lib/fetch-web.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'content', 'books');

function loadBooks() {
  return JSON.parse(readFileSync(join(ROOT, 'data', 'books.json'), 'utf8'));
}

export async function fetchOne(book, { workDir, signal } = {}) {
  const outDir = join(CONTENT_DIR, book.id);
  const startedAt = new Date().toISOString();
  const meta = {
    bookId: book.id,
    title: book.title,
    url: book.url,
    status: 'failed',
    fetchedAt: startedAt,
    chapters: [],
  };
  // 重抓保护:已有 ok 内容时,新结果不劣于旧(章节数不少于)才覆盖;
  // 抓取失败/退化则保留旧内容并返回 kept 状态(磁盘不动,仅刷新校验时间戳)
  const prevMeta = readPrevMeta(outDir);
  if (prevMeta?.pinned) {
    // 人工核实过的书(如单文档误抓修复):完全跳过抓取,避免管道反复折腾
    const meta = { ...prevMeta, status: 'kept', keptPrev: true, keptChapters: prevMeta.chapters.length, error: '人工锁定(pinned),跳过抓取', fetchedAt: new Date().toISOString() };
    return meta;
  }
  const markKept = (reason) => {
    meta.status = 'kept';
    meta.keptPrev = true;
    meta.keptChapters = prevMeta.chapters.length;
    meta.error = reason;
    meta.fetchedAt = new Date().toISOString();
    // 刷新磁盘 meta 的校验时间戳(--refresh 依据),内容与章节保持不变
    const refreshed = { ...prevMeta, fetchedAt: meta.fetchedAt, keptAt: meta.fetchedAt, keptReason: reason };
    writeJson(join(outDir, 'meta.json'), refreshed);
    return meta;
  };
  try {
    let result;
    let finalUrl = book.url;
    if (/github\.com/i.test(book.url)) {
      result = await fetchGithubBook(book, workDir, signal);
      // 相对链接/图片绝对化
      for (const ch of result.chapters) {
        ch.body = absolutizeMd(ch.body, result.rawBase, ch.file);
      }
      meta.license = result.license;
      meta.sourceType = 'github';
    } else {
      result = await fetchWebBook(book.url, signal);
      finalUrl = result.finalUrl || book.url;
      // markdown 层兜底绝对化(基准 = 重定向后的最终 URL)
      for (const ch of result.chapters) {
        ch.body = absolutizeWebMd(ch.body, finalUrl);
      }
      meta.sourceType = 'web';
    }
    if (!result.chapters.length) throw new Error('没有可用章节');
    if (prevMeta?.status === 'ok' && result.chapters.length < prevMeta.chapters.length) {
      return markKept(`新抓取 ${result.chapters.length} 章少于既有 ${prevMeta.chapters.length} 章,保留旧内容`);
    }

    if (signal?.aborted) throw new Error('已取消');
    rmSync(outDir, { recursive: true, force: true });
    mkdirSync(join(outDir, 'chapters'), { recursive: true });
    for (const ch of result.chapters) {
      // file 字段仅用于抓取期定位;产物统一 chapters/<slug>.md
      // 内容以 --- 开头会被 Astro 误判为 frontmatter,加前导注释防御
      const body = ch.body.startsWith('---') ? `<!-- chapter content -->\n${ch.body}` : ch.body;
      writeFileSync(join(outDir, 'chapters', `${ch.slug}.md`), body.trim() + '\n', 'utf8');
      meta.chapters.push({ slug: ch.slug, title: ch.title, file: `chapters/${ch.slug}.md` });
    }
    meta.status = 'ok';
    meta.fetchedAt = new Date().toISOString();
    if (result.title && result.title.length <= 120) meta.sourceTitle = result.title;
  } catch (e) {
    meta.status = 'failed';
    meta.error = String(e.message || e).slice(0, 200);
    meta.fetchedAt = new Date().toISOString();
    if (prevMeta?.status === 'ok' && prevMeta.chapters.length > 0) {
      // 保留既有 ok 内容:磁盘不动,仅刷新校验时间戳
      return markKept(meta.error);
    }
    // failed:清理半成品,详情页走外链降级
    rmSync(outDir, { recursive: true, force: true });
  }
  if (meta.status === 'failed') {
    // 失败也要留 meta,记录降级原因(阅读器/详情页提示),但不放 chapters
    mkdirSync(join(CONTENT_DIR, book.id), { recursive: true });
    writeJson(join(CONTENT_DIR, book.id, 'meta.json'), meta);
  } else {
    writeJson(join(CONTENT_DIR, book.id, 'meta.json'), meta);
  }
  return meta;
}

function readPrevMeta(outDir) {
  try {
    return JSON.parse(readFileSync(join(outDir, 'meta.json'), 'utf8'));
  } catch {
    return null;
  }
}

function writeJson(p, data) {
  writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('用法: node scripts/fetch-book.mjs <bookId|url>');
    process.exit(2);
  }
  const books = loadBooks();
  const book = books.find((b) => b.id === arg) || books.find((b) => b.url === arg);
  if (!book) {
    console.error(`未找到条目: ${arg}`);
    process.exit(2);
  }
  const workDir = join(ROOT, 'data', 'tmp');
  mkdirSync(workDir, { recursive: true });
  console.log(`抓取: ${book.title} <${book.url}>`);
  const meta = await fetchOne(book, { workDir });
  console.log(`结果: ${meta.status},章节 ${meta.chapters.length} ${meta.error ? `错误: ${meta.error}` : ''}`);
  process.exit(meta.status === 'failed' ? 1 : 0);
}

// 直跑判定须用 pathToFileURL 归一:Windows 下 argv[1] 是盘符路径,
// 与 import.meta.url 的 file:///C:/... 形态直接字符串比较永不相等
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
