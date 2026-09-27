#!/usr/bin/env node
/**
 * 章节 markdown 密钥脱敏(就地修复,幂等)。
 * 抓取的开源书籍代码示例里偶带真实格式的 API key(作者疏漏或演示占位),
 * GitHub Push Protection 会拒绝含此类字符串的推送,分发的站点也不应展示。
 * 只替换明确的高熵 key 模式,保留代码结构可读。
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BOOKS_DIR = join(ROOT, 'content', 'books');

const PATTERNS = [
  [/sk-[A-Za-z0-9_-]{20,}/g, 'sk-REDACTED'], // OpenAI 风格(含 sk-proj-)
  [/AKIA[0-9A-Z]{16}/g, 'AKIA-REDACTED'], // AWS access key id
  [/gh[pousr]_[A-Za-z0-9]{30,}/g, 'gh_REDACTED'], // GitHub tokens
  [/github_pat_[A-Za-z0-9_]{30,}/g, 'github_pat_REDACTED'],
  [/AIza[0-9A-Za-z_-]{30,}/g, 'AIza-REDACTED'], // Google API key
  [/xox[baprs]-[A-Za-z0-9-]{20,}/g, 'xox-REDACTED'], // Slack tokens
];

let scanned = 0;
let redacted = 0;
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
    let text = readFileSync(p, 'utf8');
    const before = text;
    for (const [re, repl] of PATTERNS) text = text.replace(re, repl);
    if (text !== before) {
      writeFileSync(p, text, 'utf8');
      redacted++;
    }
  }
}
console.log(`扫描 ${scanned} 个章节,脱敏 ${redacted} 个含密钥样式字符串的文件`);
