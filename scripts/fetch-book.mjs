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
import { fileURLToPath } from 'node:url';
import { fetchGithubBook, absolutizeMd } from './lib/fetch-github.mjs';
import { fetchWebBook, absolutizeWebMd } from './lib/fetch-web.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_DIR = join(ROOT, 'content', 'books');

function loadBooks() {
  return JSON.parse(readFileSync(join(ROOT, 'data', 'books.json'), 'utf8'));
}

export async function fetchOne(book, { workDir }) {
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
  try {
    let result;
    if (/github\.com/i.test(book.url)) {
      result = await fetchGithubBook(book, workDir);
      // 相对链接/图片绝对化
      for (const ch of result.chapters) {
        ch.body = absolutizeMd(ch.body, result.rawBase, ch.file);
      }
      meta.license = result.license;
      meta.sourceType = 'github';
    } else {
      result = await fetchWebBook(book.url);
      // markdown 层兜底绝对化(基准 = 起始页 URL)
      for (const ch of result.chapters) {
        ch.body = absolutizeWebMd(ch.body, book.url);
      }
      meta.sourceType = 'web';
    }
    if (!result.chapters.length) throw new Error('没有可用章节');

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
    // failed:清理半成品,详情页走外链降级
    rmSync(outDir, { recursive: true, force: true });
  }
  if (!existsSync(join(CONTENT_DIR, book.id))) mkdirSync(CONTENT_DIR, { recursive: true });
  if (meta.status === 'failed') {
    // 失败也要留 meta,记录降级原因(阅读器/详情页提示),但不放 chapters
    mkdirSync(join(CONTENT_DIR, book.id), { recursive: true });
    writeJson(join(CONTENT_DIR, book.id, 'meta.json'), meta);
  } else {
    writeJson(join(CONTENT_DIR, book.id, 'meta.json'), meta);
  }
  return meta;
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

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
