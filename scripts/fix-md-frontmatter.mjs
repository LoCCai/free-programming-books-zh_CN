#!/usr/bin/env node
/**
 * 章节 markdown 构建防御处理(对 content/ 源头文件就地修复,幂等):
 *
 * 1. frontmatter 风险:文件以 `---` 开头(内容分隔线)会被 Astro 当 YAML 解析,
 *    非法 YAML 直接构建失败 → 前插一行 HTML 注释。
 * 2. 非法图片引用:`![alt](target)` 的 target 不是 http/data/普通锚点可渲染资源时
 *    (如 Sphinx 把标题锚点转成 `![¶](#anchor "Permalink")`,或漏网相对路径),
 *    Vite 会把它当构建资源 resolve 而失败 → 替换为 alt 文本(空则删除)。
 *    文字链接 `[t](#anchor)` 是合法页内锚点,不受影响。
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BOOKS_DIR = join(ROOT, 'content', 'books');
const GUARD = '<!-- chapter content -->\n';

/** 非法图片 target(会被 Vite 当资源 resolve):`#...` 锚点图片、无协议相对路径 */
const BAD_IMG = /!\[([^\]]*)\]\(\s*(?!https?:\/\/|data:|mailto:)([^)\s]*)\s*(?:"[^")]*")?\)/g;

function sanitize(text) {
  let changed = false;
  if (text.startsWith('---')) {
    text = GUARD + text;
    changed = true;
  }
  const cleaned = text.replace(BAD_IMG, (full, alt) => {
    changed = true;
    return alt || '';
  });
  return { text: cleaned, changed };
}

let scanned = 0;
let fixed = 0;
for (const book of readdirSync(BOOKS_DIR)) {
  const chDir = join(BOOKS_DIR, book, 'chapters');
  let files;
  try {
    files = readdirSync(chDir);
  } catch {
    continue;
  }
  for (const f of files) {
    if (!f.endsWith('.md')) continue;
    scanned++;
    const p = join(chDir, f);
    const orig = readFileSync(p, 'utf8');
    const { text, changed } = sanitize(orig);
    if (changed) {
      writeFileSync(p, text, 'utf8');
      fixed++;
    }
  }
}
console.log(`扫描 ${scanned} 个章节,修复 ${fixed} 个(frontmatter 风险 + 非法图片引用)`);
