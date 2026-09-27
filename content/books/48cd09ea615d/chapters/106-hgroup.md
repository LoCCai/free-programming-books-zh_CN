基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<hgroup>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素代表文档标题和与标题相关联的内容，它将一个 [`<h1>–<h6>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements) 元素与一个或多个 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/p) 元素组合在一起。

## [尝试一下](#尝试一下)

```
<hgroup>
  <h1>Frankenstein</h1>
  <p>Or: The Modern Prometheus</p>
</hgroup>
<p>
  Victor Frankenstein, a Swiss scientist, has a great ambition: to create
  intelligent life. But when his creature first stirs, he realizes he has made a
  monster. A monster which, abandoned by his master and shunned by everyone who
  sees it, follows Dr Frankenstein to the very ends of the earth.
</p>
```

```
hgroup {
  text-align: right;
  padding-right: 16px;
  border-right: 10px solid #00c8d7;
}

hgroup h1 {
  margin-bottom: 0;
}

hgroup p {
  margin: 0;
  font-weight: bold;
}
```

## [属性](#属性)

这个元素仅包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [使用说明](#使用说明)

`<hgroup>` 元素允许将一个标题与任意次要内容（例如子标题、副标题或口号）组合在一起。在 `<hgroup>` 中，这些类型的内容也表示为 `<p>` 元素。

`<hgroup>` 本身对网页的文档大纲没有任何影响。而 `<hgroup>` 中所允许的单个标题则会被用于文档大纲。

## [示例](#示例)

html

```
<!doctype html>
<title>HTML 标准</title>
<body>
  <hgroup id="document-title">
    <h1>HTML：现行标准</h1>
    <p>更新于 2022 年 7 月 12 日</p>
  </hgroup>
  <p>文档的介绍。</p>
  <h2>目录</h2>
  <ol id="toc">
    …
  </ol>
  <h2>第一节</h2>
  <p>第一节的介绍。</p>
</body>
```

## [无障碍考虑](#无障碍考虑)

目前，`<hgroup>` 没有无障碍的语义。只有其中的元素（标题和可选的段落）会被暴露给浏览器的无障碍 API。

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、标题内容、可感知内容。</td></tr><tr><th scope="row">允许的内容</th><td>零个或多个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/p"><code>&lt;p&gt;</code></a> 元素，后跟一个 <a data-href="/zh-CN/docs/Web/HTML/Reference/Elements/h1" title="此文档尚未被撰写，期待你的贡献！"><code>&lt;h1&gt;</code></a>、<a data-href="/zh-CN/docs/Web/HTML/Reference/Elements/h2" title="此文档尚未被撰写，期待你的贡献！"><code>&lt;h2&gt;</code></a>、<a data-href="/zh-CN/docs/Web/HTML/Reference/Elements/h3" title="此文档尚未被撰写，期待你的贡献！"><code>&lt;h3&gt;</code></a>、<a data-href="/zh-CN/docs/Web/HTML/Reference/Elements/h4" title="此文档尚未被撰写，期待你的贡献！"><code>&lt;h4&gt;</code></a>、<a data-href="/zh-CN/docs/Web/HTML/Reference/Elements/h5" title="此文档尚未被撰写，期待你的贡献！"><code>&lt;h5&gt;</code></a> 或 <a data-href="/zh-CN/docs/Web/HTML/Reference/Elements/h6" title="此文档尚未被撰写，期待你的贡献！"><code>&lt;h6&gt;</code></a> 元素，后跟零个或多个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/p"><code>&lt;p&gt;</code></a> 元素。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>的元素。</td></tr><tr><th scope="row">隐式 ARIA 角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有对应的角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>任意</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement"><code>HTMLElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-hgroup-element](https://html.spec.whatwg.org/multipage/sections.html#the-hgroup-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   与本章节相关的其他元素：[`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body)、[`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article)、[`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section)、[`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside)、`<h1>`、`<h2>`、`<h3>`、`<h4>`、`<h5>`、`<h6>`、[`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav)、[`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header)、[`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer)、[`<address>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address)；
-   [HTML 文档的章节和大纲](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hgroup/contributors.txt)更新。
