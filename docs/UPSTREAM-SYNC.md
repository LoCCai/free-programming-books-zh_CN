# 上游同步手册

上游 `justjavac/free-programming-books-zh_CN` 更新书单后,本站自动跟进。
同步的关键设计:**site 分支不修改上游任何文件,自有代码只存在于上游没有的路径**,
因此合并永远干净。

## 自动同步(默认,已配置)

`.github/workflows/sync.yml` 每周一(北京时间 10:00)自动运行,也可手动
Actions → Sync upstream → Run workflow:

```
fetch upstream main
  → main 分支 ff-only 快进 + push(保持镜像干净)
  → site 分支 merge main
  → npm run parse(重新解析)
  → sync-report(与 git HEAD 里的旧 books.json diff)
      → data/changelog/<日期>.md   变更明细(新增/移除/修改)
      → data/new-book-ids.txt      新增条目 id
  → validate 门禁(突变报警)
  → fetch-all --ids-file(只抓新增的书;有 GITHUB_TOKEN,许可证识别更准)
  → commit data/ + content/ + push
      → push 触发 deploy.yml 自动重建部署
```

人工审查点:Actions 运行详情中的 sync-report 输出,以及
`data/changelog/` 里的变更明细 PR/提交。

## 手动同步(本地)

```bash
git fetch upstream
git checkout main
git merge --ff-only upstream/main
git push origin main
git checkout site
git merge main
npm run parse && node scripts/sync-report.mjs && npm run validate
node scripts/fetch-all.mjs --ids-file=data/new-book-ids.txt   # 增量抓取
git add data/ content/ && git commit -m "sync: 上游书单更新"
git push origin site    # 触发部署
```

全量重抓(慎用,456 本耗时较长):

```bash
node scripts/fetch-all.mjs            # 断点续抓:跳过已有 ok 记录
node scripts/fetch-all.mjs --refresh  # 重抓 30 天前的旧记录
node scripts/fetch-all.mjs --force    # 全部重抓
```

## 上游格式突变怎么办

validate 门禁会在以下情况失败(部署被挡住,属于预期保护):

- 条目总数 < 380(解析器漏抓)
- 相对上次生成降幅 > 15%
- 字段缺失 / URL 非法 / 分类不在分类表

处理:看 parse 输出的分类分布是否异常 → 检查上游 README 是否换了格式 →
修 `scripts/lib/books-md.mjs` 的对应规则 → 重跑 parse + validate。

## 条目身份(id)的稳定性

id = URL 的 sha1 前 12 位。上游调整条目顺序、修改文字描述不影响 id;
只有 URL 本身变化才产生新 id(旧书内容保留,新书重新抓取)。
同步报告的"新增/移除"即以 URL 为准。
