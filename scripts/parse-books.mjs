#!/usr/bin/env node
/**
 * 解析上游书单 markdown → data/*.json(结构化数据,提交入库)。
 *
 * 产物:
 * - data/books.json          全部书籍条目(README.md)
 * - data/categories.json     分类树(含每类计数)
 * - data/non-programming-books.json  非编程书单
 * - data/meta.json           生成信息 + 统计(供校验与 CI 对账)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseBookListMd, parseNonProgrammingMd, assignIds } from './lib/books-md.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'data');

const README_FILE = 'README.md';
const NONPRO_FILE = 'what-non-programming-books-should-programmers-read.md';

function sourceCommit() {
  try {
    return execSync('git rev-parse HEAD', { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

function main() {
  const readme = readFileSync(join(ROOT, README_FILE), 'utf8');
  const nonpro = readFileSync(join(ROOT, NONPRO_FILE), 'utf8');

  const parsed = parseBookListMd(readme, README_FILE);
  const books = assignIds(parsed.books);
  const nonproBooks = assignIds(parseNonProgrammingMd(nonpro, NONPRO_FILE).books);

  // ---- 分类树:按 categoryPath[0] 聚合,嵌套路径保留在条目上 ----
  const catMap = new Map(); // name -> { name, slug, anchor, bookCount }
  for (const b of books) {
    const top = b.categoryPath[0];
    if (!catMap.has(top)) catMap.set(top, { name: top, slug: categorySlug(top), anchor: slugAnchor(top), bookCount: 0 });
    catMap.get(top).bookCount++;
  }
  const categories = [...catMap.values()].sort((a, b) => a.name.localeCompare(b.name, 'zh'));

  // ---- 统计 ----
  const duplicateUrls = [...new Set(books.map((b) => b.url).filter((u, i, a) => a.indexOf(u) !== i))];
  const meta = {
    generatedAt: new Date().toISOString(),
    sourceCommit: sourceCommit(),
    sourceFiles: [README_FILE, NONPRO_FILE],
    stats: {
      totalBooks: books.length,
      totalNonProgramming: nonproBooks.length,
      categories: categories.length,
      deprecated: books.filter((b) => b.status === 'deprecated').length,
      duplicateUrls: duplicateUrls.length,
      skippedAnchorLines: parsed.skippedLines,
      sections: parsed.sections,
    },
  };

  mkdirSync(DATA_DIR, { recursive: true });
  writeJson(join(DATA_DIR, 'books.json'), books);
  writeJson(join(DATA_DIR, 'categories.json'), categories);
  writeJson(join(DATA_DIR, 'non-programming-books.json'), nonproBooks);
  writeJson(join(DATA_DIR, 'meta.json'), meta);

  // ---- 控制台报告 ----
  console.log(`解析完成:书籍 ${books.length} 条,非编程书籍 ${nonproBooks.length} 条,分类 ${categories.length} 个`);
  console.log(`失效标记 ${meta.stats.deprecated} 条,重复 URL ${duplicateUrls.length} 组,跳过锚点行 ${parsed.skippedLines} 行`);
  console.log('分类分布(前 15):');
  for (const c of categories.slice(0, 15)) console.log(`  ${c.name}: ${c.bookCount}`);
  if (categories.length > 15) console.log(`  … 共 ${categories.length} 个分类`);
}

/** 分类名 → 页内锚点(与 GitHub 中文锚点规则一致,仅供展示回退用) */
function slugAnchor(name) {
  return name.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-');
}

/**
 * 分类名 → URL slug。中文保留(UTF-8 路径各托管平台均支持),
 * 其余非字母数字字符折叠为 '-'(如 C/C++ → C-C、CSS/HTML → CSS-HTML),
 * 保证不含会破坏路由的 / 等字符;冲突或过短时追加哈希确保唯一。
 */
function categorySlug(name) {
  let s = name
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  if (s.length < 2 || usedSlugs.has(s)) {
    const hash = createHash('sha1').update(name).digest('hex').slice(0, 6);
    s = `${s || 'cat'}-${hash}`;
  }
  usedSlugs.add(s);
  return s;
}

const usedSlugs = new Set();

function writeJson(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
  const label = Array.isArray(data) ? `(${data.length} 条)` : '';
  console.log(`写出 ${path.replace(ROOT + '/', '')} ${label}`);
}

main();
