#!/usr/bin/env node
/**
 * 上游同步变更报告。在重新解析前后调用:
 *   1. cp data/books.json data/books.prev.json(解析前)
 *   2. node scripts/parse-books.mjs
 *   3. node scripts/sync-report.mjs
 * 产出:
 * - data/changelog/<date>.md   变更摘要(新增/移除/失效标记变化)
 * - data/new-book-ids.txt      新增条目 id 列表(供 CI 增量抓取)
 * - data/meta.prev.json        上次统计(供 validate 突变检测)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data');

/** 对比基线:优先 git HEAD 中的上次解析产物(未提交的本地运行回退 prev 文件) */
function loadPrevBooks() {
  try {
    const out = execSync('git show HEAD:data/books.json', { cwd: ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    return JSON.parse(out);
  } catch {
    const p = join(DATA, 'books.prev.json');
    return existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
  }
}

const cur = JSON.parse(readFileSync(join(DATA, 'books.json'), 'utf8'));
const prev = loadPrevBooks();

function keyOf(b) {
  return b.url || b.title;
}
const prevMap = new Map((prev ?? []).map((b) => [keyOf(b), b]));
const curMap = new Map(cur.map((b) => [keyOf(b), b]));

const added = cur.filter((b) => !prevMap.has(keyOf(b)));
const removed = (prev ?? []).filter((b) => !curMap.has(keyOf(b)));
const changed = cur.filter((b) => {
  const p = prevMap.get(keyOf(b));
  return (
    p &&
    (p.title !== b.title ||
      p.description !== b.description ||
      p.status !== b.status ||
      JSON.stringify(p.categoryPath) !== JSON.stringify(b.categoryPath))
  );
});

const date = new Date().toISOString().slice(0, 10);
if (added.length || removed.length || changed.length) {
  mkdirSync(join(DATA, 'changelog'), { recursive: true });
  const lines = [
    `# 上游同步变更 ${date}`,
    '',
    `源提交: ${JSON.parse(readFileSync(join(DATA, 'meta.json'), 'utf8')).sourceCommit.slice(0, 10)}`,
    `条目: ${prev?.length ?? 0} → ${cur.length}(新增 ${added.length},移除 ${removed.length},修改 ${changed.length})`,
    '',
  ];
  if (added.length) {
    lines.push('## 新增', '');
    for (const b of added) lines.push(`- [${b.title}](${b.url}) — ${b.categoryPath.join(' / ')}`);
    lines.push('');
  }
  if (removed.length) {
    lines.push('## 移除', '');
    for (const b of removed) lines.push(`- ${b.title}(${b.url})`);
    lines.push('');
  }
  if (changed.length) {
    lines.push('## 修改', '');
    for (const b of changed) lines.push(`- ${b.title} — ${b.categoryPath.join(' / ')}`);
    lines.push('');
  }
  writeFileSync(join(DATA, 'changelog', `${date}.md`), lines.join('\n'), 'utf8');
  console.log(`变更报告: 新增 ${added.length} / 移除 ${removed.length} / 修改 ${changed.length} → data/changelog/${date}.md`);
} else {
  console.log('上游无条目变更');
}

// 新书 id 列表(含移动/路径变化的重新抓取候选)
writeFileSync(join(DATA, 'new-book-ids.txt'), added.map((b) => b.id).join('\n') + (added.length ? '\n' : ''), 'utf8');

// validate 突变检测基线(不入库;.gitignore 已排除)
const meta = JSON.parse(readFileSync(join(DATA, 'meta.json'), 'utf8'));
writeFileSync(join(DATA, 'meta.prev.json'), JSON.stringify(meta, null, 2) + '\n', 'utf8');
