#!/usr/bin/env node
/**
 * 数据校验:CI 门禁。解析产物必须通过校验才允许构建/部署。
 *
 * 检查项:
 * - 条目总数不低于阈值,且相对上次生成({@var lastGeneratedTotal})波动 <15%(上游格式突变报警)
 * - 必填字段完整、URL 合法、分类路径存在
 * - 重复 URL / 失效条目只报告不阻断
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = join(ROOT, 'data');

/** 绝对下限:上游书单历史规模始终 >400,低于此值基本是解析器坏了 */
const MIN_TOTAL = 380;
/** 相对上次生成的最大允许降幅(上游正常单次增删远小于此) */
const MAX_DROP_RATIO = 0.15;

const errors = [];
const warnings = [];

function load(name) {
  const p = join(DATA_DIR, name);
  if (!existsSync(p)) {
    errors.push(`缺少产物 ${name},请先运行 npm run parse`);
    return null;
  }
  return JSON.parse(readFileSync(p, 'utf8'));
}

const books = load('books.json');
const categories = load('categories.json');
const meta = load('meta.json');

if (books && meta) {
  const { totalBooks } = meta.stats;
  if (totalBooks !== books.length) errors.push(`meta.stats.totalBooks(${totalBooks}) 与 books.json(${books.length}) 不一致`);
  if (totalBooks < MIN_TOTAL) errors.push(`条目总数 ${totalBooks} 低于阈值 ${MIN_TOTAL},疑似解析异常`);

  // 突变基线:优先 git HEAD 中的上次产物(CI 全新检出也有基线,删文件绕不过),
  // 本地未提交时回退 meta.prev.json
  let prevStats = null;
  try {
    const out = execSync('git show HEAD:data/meta.json', { cwd: ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    prevStats = JSON.parse(out).stats;
  } catch {
    const prevPath = join(DATA_DIR, 'meta.prev.json');
    if (existsSync(prevPath)) prevStats = JSON.parse(readFileSync(prevPath, 'utf8')).stats;
  }
  if (prevStats?.totalBooks) {
    const drop = (prevStats.totalBooks - totalBooks) / prevStats.totalBooks;
    if (drop > MAX_DROP_RATIO) {
      errors.push(`条目较上次生成减少 ${Math.round(drop * 100)}%(上次 ${prevStats.totalBooks} → 本次 ${totalBooks}),疑似上游格式变化`);
    }
  }

  const catNames = new Set((categories || []).map((c) => c.name));
  const urlCounts = new Map();
  for (const b of books) {
    if (!b.id) errors.push(`行 ${b.line}(${b.title}):缺少 id`);
    if (!b.title?.trim()) errors.push(`行 ${b.line}:缺少书名`);
    if (!/^https?:\/\/\S+$/i.test(b.url || '')) errors.push(`行 ${b.line}(${b.title}):URL 非法 "${b.url}"`);
    if (!b.categoryPath?.length || !b.categoryPath[0]) errors.push(`行 ${b.line}(${b.title}):缺少分类`);
    else if (!catNames.has(b.categoryPath[0])) {
      errors.push(`行 ${b.line}(${b.title}):顶层分类 "${b.categoryPath[0]}" 不在分类表中`);
    }
    if (b.status !== 'ok' && b.status !== 'deprecated') {
      warnings.push(`行 ${b.line}(${b.title}):未知状态 "${b.status}"`);
    }
    urlCounts.set(b.url, (urlCounts.get(b.url) || 0) + 1);
  }

  const dupUrls = [...urlCounts.entries()].filter(([, n]) => n > 1);
  if (dupUrls.length) {
    warnings.push(`重复 URL ${dupUrls.length} 组(保留,站内按独立条目展示):`);
    for (const [u, n] of dupUrls.slice(0, 10)) warnings.push(`  ×${n} ${u}`);
  }

  const dep = books.filter((b) => b.status === 'deprecated').length;
  warnings.push(`失效标记条目:${dep} 条`);
}

if (errors.length) {
  console.error(`✗ 校验失败(${errors.length} 项错误):`);
  for (const e of errors) console.error(`  - ${e}`);
  if (warnings.length) {
    console.warn(`警告 ${warnings.length} 条:`);
    for (const w of warnings) console.warn(`  - ${w}`);
  }
  process.exit(1);
}

console.log(`✓ 校验通过:书籍 ${books.length} 条 / 分类 ${categories.length} 个 / 非编程书籍 ${meta.stats.totalNonProgramming} 条`);
for (const w of warnings) console.warn(`· ${w}`);
