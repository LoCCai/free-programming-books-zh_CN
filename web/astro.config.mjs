import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages 项目页:https://<owner>.github.io/free-programming-books-zh_CN/
const site = 'https://loccai.github.io';
const base = '/free-programming-books-zh_CN';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // 中文分类名/章节 slug 生成 UTF-8 目录,GitHub Pages 原生支持
    format: 'directory',
  },
});
