# 部署计划

## 线上部署:GitHub Pages(已配置,推送即部署)

### 首次开启(一次性,两种方式任选)

**方式 A:gh CLI(本地已认证时)**

```bash
gh api -X POST repos/LoCCai/free-programming-books-zh_CN/pages \
  -f build_type=workflow -f source='{"branch":"site","path":"/"}'
```

**方式 B:网页操作**

1. 推送 `site` 分支到 origin(见下"发布命令")
2. 仓库 → Settings → Pages → Build and deployment → **Source 选 "GitHub Actions"**

之后 `.github/workflows/deploy.yml` 在每次 `site` 分支 push 时自动:
解析 → 校验 → Astro 构建 → Pagefind 索引 → 部署到
`https://loccai.github.io/free-programming-books-zh_CN/`

### 本地完整验证(部署前自查)

```bash
npm run parse        # 重新解析上游书单
npm run validate     # 数据校验门禁
npm run sync:inputs  # data/ content/ → web/src/_data _content(Astro 构建输入)
npm install --prefix web
npm run build --prefix web   # astro build + pagefind --site dist
npm run preview --prefix web # http://localhost:4321/free-programming-books-zh_CN/
# 一键: npm run build(等价于上面除 npm install 外的全部)
```

## 本地开发

```bash
# 只改站点(数据/内容不变)
npm --prefix web run dev      # http://localhost:4321/free-programming-books-zh_CN/
                              # dev 模式搜索页提示需 build(索引是构建产物)

# 改了抓取内容后验证阅读器
node scripts/fetch-book.mjs <bookId>
npm run build --prefix web
```

## 自定义域名(可选)

1. 仓库 Settings → Pages → Custom domain 填入域名
2. DNS:CNAME 记录指向 `loccai.github.io`(或 A 记录指向 Pages IP)
3. 在 `web/public/CNAME` 写入域名(静态资产,构建时自动带入 dist)
4. `web/astro.config.mjs` 的 `site` 改为 `https://<域名>`,`base` 改为 `/`

## 体积与限额

- 全站构建产物(当前 909 页)约 10–20MB,GitHub Pages 限额 1GB,
  按当前书量(456 条,站内可读 ~30 本)可承载全书库抓取
- 若未来超限:优先抓小体积 markdown 书籍、PDF 类转外链
  (抓取器已排除 >2MB 单章与 >200 章的书)

## 监控

- Actions 页查看 deploy/sync 运行历史
- `content/report.json` 记录每次抓取的成功/失败明细
- validate 门禁失败(上游格式突变)会直接挡住部署,需要人工审查解析器
