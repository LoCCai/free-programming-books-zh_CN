基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**HTML <base> 元素** 指定用于一个文档中包含的所有相对 URL 的根 URL。一份中只能有一个 <base> 元素。

一个文档的基本 URL，可以通过使用 [`document.baseURI`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/baseURI) 的 JS 脚本查询。如果文档不包含 `<base>` 元素，`baseURI` 默认为 `document.location.href`。

<table><tbody><tr><th><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容类别</a></th><td>元数据内容。</td></tr><tr><th>合法的内容</th><td>无，它是一个<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Void_element">empty element</a></td></tr><tr><th><dfn>标签省略</dfn></th><td>该标签不能有结束标签。</td></tr><tr><th>合法的父级</th><td>任何不带有任何其他 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/base" aria-current="page"><code>&lt;base&gt;</code></a> 元素的<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/head"><code>&lt;head&gt;</code></a> 元素</td></tr><tr><th>合法的 ARIA 角色</th><td>无</td></tr><tr><th>DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLBaseElement"><code>HTMLBaseElement</code></a></td></tr></tbody></table>

## [属性](#属性)

该标签包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

如果指定了以下任一属性，这个元素**必须**在其他任何属性是 URL 的元素之前。例如：[`<link>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/link) 的 `href` 属性。

[`href`](#href)

用于文档中相对 URL 地址的基础 URL。允许绝对和相对 URL。

[`target`](#target)

默认浏览上下文的关键字或作者定义的名称，当没有明确目标的链接 [`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a) 或表单 [`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) 导致导航被激活时显示其结果。该属性值定位到_浏览上下文_（例如选项卡，窗口或内联框 [`<iframe>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/iframe)）。以下的关键字指定特殊的意思：

-   `_self`: 载入结果到当前浏览上下文中。（该值是元素的默认值）。
-   `_blank`: 载入结果到一个新的未命名的浏览上下文。
-   `_parent`: 载入结果到父级浏览上下文（如果当前页是内联框）。如果没有父级结构，该选项的行为和`_self`一样。
-   `_top`: 载入结果到顶级浏览上下文（该浏览上下文是当前上下文的最顶级上下文）。如果没有父级，该选项的行为和\_self 一样。

## [使用说明](#使用说明)

### [多个 `<base>` 元素](#多个_base_元素)

如果指定了多个 `<base>` 元素，只会使用第一个 `href` 和 `target` 值，其余都会被忽略。

### [页内锚](#页内锚)

指向文档中某个片段的链接，例如 `<a href="#some-id">` 用 `<base>` 解析，触发对带有附加片段的基本 URL 的 HTTP 请求。

例如：给定 `<base href="https://example.com">`

以及此链接 `<a href="#anchor">Anker</a>`

链接指向 `https://example.com/#anchor`

### [Open Graph](#open_graph)

[Open Graph](https://ogp.me "外部链接（在新标签页中打开）") 标签不接受 `<base>`，并且应该始终具有完整的绝对 URL。例如：

html

```
<meta property="og:image" content="https://example.com/thumbnail.jpg" />
```

## [示例](#示例)

html

```
<base href="http://www.example.com/" />
<base target="_blank" />
<base target="_top" href="http://www.example.com/" />
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-base-element](https://html.spec.whatwg.org/multipage/semantics.html#the-base-element) |

## [浏览器兼容性](#浏览器兼容性)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月21日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/base/contributors.txt)更新。
