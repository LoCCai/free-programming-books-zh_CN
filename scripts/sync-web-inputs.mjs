#!/usr/bin/env node
/**
 * 把仓库根的数据与书籍内容同步进 web/src(Astro 构建输入)。
 *
 * 原因:import.meta.glob 的模式不能越出 Astro root(web/),而 data/ 与 content/
 * 是抓取管道在仓库根维护的真相源,故构建前复制为 web/src/_data 与 web/src/_content。
 * 每次全量重建(先删后拷),保证无陈旧文件。
 */
import { rmSync, cpSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'web', 'src');

const pairs = [
  ['data', '_data'],
  ['content', '_content'],
];

for (const [from, to] of pairs) {
  const src = join(ROOT, from);
  const dest = join(SRC, to);
  rmSync(dest, { recursive: true, force: true });
  if (!existsSync(src)) {
    if (from === 'content') {
      // 尚无任何抓取内容时建空目录,保证 glob 模式有效
      mkdirSync(dest, { recursive: true });
      console.log(`sync ${from}/ → web/src/${to}/ (空)`);
      continue;
    }
    throw new Error(`缺少 ${src},请先运行 npm run parse`);
  }
  if (from === 'data') {
    // 白名单拷贝:data/ 里的临时目录(tmp*)与待抓清单不进构建输入
    mkdirSync(dest, { recursive: true });
    for (const f of ['books.json', 'categories.json', 'meta.json', 'non-programming-books.json', 'report.json']) {
      const srcFile = join(src, f);
      if (existsSync(srcFile)) cpSync(srcFile, join(dest, f));
    }
  } else {
    cpSync(src, dest, { recursive: true });
  }
  console.log(`sync ${from}/ → web/src/${to}/`);
}
