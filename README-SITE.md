# 免费编程中文书籍 · 在线书库(site 分支项目)

把上游书单变成**可搜索、可在线阅读**的静态网站。
上游 `main` 只做镜像;本分支(`site`)承载全部自有代码。

## 快速开始

```bash
npm install && npm install --prefix web

npm run parse          # 上游 markdown → data/*.json
npm run validate       # 数据校验门禁
npm run build --prefix web   # astro build + pagefind 索引
npm run preview --prefix web # http://localhost:4321/free-programming-books-zh_CN/
```

## 它能做什么

- **456 本免费编程书籍**(来自上游书单)+ 8 本非编程好书,53 个分类
- **全文搜索**:Pagefind 构建期索引,支持中文,覆盖书名/描述/可读书籍正文
- **在线阅读**:GitHub 开源书籍抓取到站内(目录树 + 章节正文 + 上下章导航),
  其余条目一键跳原站——抓取失败/上游标记失效的自动降级,永不 404
- **上游自动同步**:每周 Actions 合并上游 → 重新解析 → 增量抓取新书 → 自动部署,
  详见 [docs/UPSTREAM-SYNC.md](docs/UPSTREAM-SYNC.md)

## 常用命令

| 命令 | 作用 |
|---|---|
| `npm run parse` | 重新解析上游书单 |
| `npm run validate` | 数据校验(CI 门禁) |
| `node scripts/fetch-book.mjs <bookId>` | 抓取单本书 |
| `node scripts/fetch-all.mjs [--force/--refresh/--ids-file=]` | 批量抓取(断点续抓) |
| `node scripts/sync-report.mjs` | 上游变更报告(新增/移除/修改) |
| `npm run build --prefix web` | 构建站点 + 搜索索引 |

## 文档

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — 架构设计(数据流/标识符/解析规则/抓取策略)
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — 部署计划(GitHub Pages/本地开发/自定义域名)
- [docs/UPSTREAM-SYNC.md](docs/UPSTREAM-SYNC.md) — 上游同步手册(自动/手动/突变处理)

## 数据与版权

- 书单数据来自 [justjavac/free-programming-books-zh_CN](https://github.com/justjavac/free-programming-books-zh_CN)(GPL-3.0),本项目衍生代码与数据同样以 GPL-3.0 发布
- 站内托管的书籍内容版权归原作者/出版社所有;优先收录许可证明确允许再分发的开源书籍,如内容侵权请提 Issue 联系移除
