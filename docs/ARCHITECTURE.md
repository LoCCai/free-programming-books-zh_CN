# 架构设计

> 分支模型:`main` 只镜像上游,`site` 承载本项目的全部自有代码。
> 数据流:上游 markdown → 结构化数据 → 书籍内容抓取 → 静态站点 + 全文搜索。

## 总体数据流

```
上游 main (README.md / what-non-programming-*.md)
   │  git fetch + merge(--ff-only,永不冲突)
   ▼
scripts/parse-books.mjs ──► data/books.json (456 条)
                            data/categories.json (53 分类,含 URL slug)
                            data/non-programming-books.json (8 条)
                            data/meta.json (统计 + 源 commit)
   │  scripts/fetch-all.mjs(增量:跳过已抓/失效直接降级)
   ▼
content/books/<bookId>/
   ├── meta.json            # 状态/许可证/章节树(阅读器路由依赖)
   └── chapters/*.md        # 统一 markdown,相对链接已绝对化
   │  Astro 构建(getStaticPaths × data + content)
   ▼
web/dist/                   # 全静态:首页/分类页/详情页/阅读器/搜索
   └── pagefind/             # 构建后 pagefind --site dist 生成的全文索引
   ▼
GitHub Pages(deploy.yml)
```

## 目录职责

| 路径 | 职责 | 上游存在? |
|---|---|---|
| `scripts/` | 解析/校验/抓取/同步报告 | 否 |
| `data/` | 解析产物(入库,diff 即上游变更) | 否 |
| `content/` | 抓取的书籍内容(入库) | 否 |
| `web/` | Astro 站点 | 否 |
| `.github/workflows/` | deploy + sync | 否 |
| `docs/` | 本文档 | 否 |

**关键约束:site 分支不修改上游任何文件**(README.md/LICENSE 等原样保留),
因此 `git merge main` 几乎不可能冲突,同步成本趋近于零。

## 标识符设计

- **bookId**:条目 URL 的 sha1 前 12 位(重复 URL 追加序号)。跨文件稳定,
  上游条目位置变化不影响 id;仅当 URL 变化才生成新 id(旧内容保留,新 id 重新抓取)。
- **分类 slug**:分类名折叠非字母数字字符为 `-`(C/C++ → C-C),预生成在
  categories.json,路由统一走 slug——分类名中的 `/` 会破坏单段路由参数,
  且 `%2F` 编码路径在 GitHub Pages(nginx 解码后匹配)上不可靠。
- **章节 slug**:三位序号 + 文件名 slug(`001-introduction`),抓取时生成,
  保证排序与稳定。

## 解析器(行级状态机,零依赖)

上游书单是"半规整"markdown,解析器按行处理,已覆盖实测的全部格式:

- `## 分类` 与一处 `<h2 id="csshtml">CSS/HTML</h2>` HTML 标题
- 特殊节跳过:`参与交流`、`目录`;文件头部说明区(首个分类前)整块忽略
- 条目 `* [书名](URL) 描述` 与置顶节的 `- ` 符号
- **balanced brackets/parens**:书名含 `[`(如 `[[笔记]前端…]`)、URL 含配对括号
- 嵌套列表:无链接父项(如 `* jQuery`)入子分类栈,子项继承 `categoryPath`
- `:worried:` → `status: deprecated`;其他 emoji 短代码剥离
- 描述清洗:内嵌链接转纯文本、强调标记剥离、空白归一、HTML 实体解码
  (`C&#35;` → `C#`)

校验(`validate.mjs`)是 CI 门禁:总数下限 380、相对上次生成降幅 >15% 报错
(上游格式突变报警)、必填字段/URL 格式/分类存在性。

## 抓取管道

来源分级,每本书独立状态机,失败自动降级为"去原站阅读"外链:

| 优先级 | 来源 | 策略 |
|---|---|---|
| 1 | `github.com/.../blob/...` 单文件 | 文件即全书(the-art-of-command-line 类) |
| 2 | `github.com/owner/repo` | codeload tarball 下载 → SUMMARY.md(GitBook)优先,否则目录收集(README 置顶);许可证 = API(有 token)→ tarball 内 LICENSE 文本 |
| 3 | 其他 URL | readability 正文抽取 → turndown 转 md → `下一页`/`rel=next` 链式抓取(≤50 页) |
| — | 上游 `:worried:` / 抓取失败 | `status: failed` meta,不产出章节,详情页走外链 |

质量控制:并发 4、单本 120s 超时、章节 ≤200 章/≤2MB、非内容文件
(LICENSE/contributing/node_modules 等)排除、图片与相对链接改写为
`raw.githubusercontent.com` 绝对地址。

断点续抓:`content/books/<id>/meta.json` 存在且 `ok` 即跳过;
`--force` 全量重抓、`--refresh` 重抓超过 30 天的、`--ids-file` 增量(上游同步用)。

## 站点(Astro + Pagefind)

- **静态优先**:全部页面构建期渲染,运行时零服务端;托管零成本
- **数据读取**:`data/*.json` 构建时内联(import),`content/books/*` 经
  `import.meta.glob` 按需编译
- **搜索**:Pagefind 构建后索引(内置中文分词),覆盖详情页元数据 +
  章节正文——站内可读书籍的内容可被全文命中
- **路由**:`/category/<slug>/`、`/books/<id>/`、`/read/<id>/<chapterSlug>/`
- **降级展示**:详情页按 `isReadable()` 决定"开始阅读"或"去原站阅读",
  失效条目带醒目标记;任何单本失败不影响整站

### 已知取舍与演进方向

- 章节内站内互链仍指向 raw.githubusercontent(跳 GitHub);可按章节 slug
  映射改写为站内路由
- 网页类书籍的目录页发现(如 Pro Git 教程站)暂只抓当前页;可加
  "目录页链接聚类"启发式
- `import.meta.glob` 全量编译章节,书量上万后构建时间线性上涨;可迁移
  Content Collections 或分批 glob
- 书籍正文版权:优先托管许可证明确允许再分发的;全部条目标注来源,
  关于页声明侵权即删
