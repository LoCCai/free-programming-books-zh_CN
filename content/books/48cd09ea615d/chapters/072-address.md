基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<address>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素表示其包含的 HTML 内容提供了与个人、团体或组织联系的信息。

## [尝试一下](#尝试一下)

```
<p>Contact the author of this page:</p>

<address>
  <a href="mailto:jim@example.com">jim@example.com</a><br />
  <a href="tel:+14155550132">+1 (415) 555‑0132</a>
</address>
```

```
a[href^="mailto"]::before {
  content: "📧 ";
}

a[href^="tel"]::before {
  content: "📞 ";
}
```

由 `<address>` 元素内容提供的联系信息应根据上下文采用适当的格式，并可能包含所需的各种类型的联系方式，如实体地址、URL、电子邮件地址、电话号码、社交媒体账号、地理位置等。`<address>` 元素应当包含联系信息所指的个人、群体或组织的名称。

`<address>` 可以在多种场景下使用，例如在页面头部提供企业的联系方式，或在 [`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article) 内嵌入 `<address>` 元素来标注文章作者的联系信息。

## [属性](#属性)

这个元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

## [使用说明](#使用说明)

-   当表示一个和联系信息无关的任意的地址时，请改用 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/p) 元素而不是 `<address>` 元素。
-   这个元素不能包含除联系信息之外的任何信息，比如出版日期（这应当被包含在 [`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/time) 元素之中）。
-   通常，`<address>` 元素可以放在 [`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer) 元素之中（如果存在的话）。

## [示例](#示例)

此示例演示了如何使用 `<address>` 表示一篇文章的作者的联系信息。

html

```
<address>
  你可以通过
  <a href="http://www.example.com/contact">www.example.com</a><br />
  与作者联系。如果你发现了任何错误，请<a href="mailto:webmaster@example.com"
    >联系网站管理员</a
  >。<br />
  你也可以前来访问：美国加利福尼亚州山景城伊芙琳大道东 331 号 Mozilla
  基金会，邮编：94041
</address>
```

### [结果](#结果)

虽然 `<address>` 元素看起来只是使用了 [`<i>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/i) 或者 [`<em>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/em) 元素的默认样式来渲染其中的文本，但是当处理联系信息时使用它更为合适，因为它表达了额外的语义信息。

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、可感知内容。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>，但不允许嵌套 <code>&lt;address&gt;</code> 元素，不允许包含标题内容（<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hgroup"><code>&lt;hgroup&gt;</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements">h1</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements">h2</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements">h3</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements">h4</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements">h5</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements">h6</a>）、章节内容(<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article"><code>&lt;article&gt;</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside"><code>&lt;aside&gt;</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section"><code>&lt;section&gt;</code></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav"><code>&lt;nav&gt;</code></a>）以及 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header"><code>&lt;header&gt;</code></a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer"><code>&lt;footer&gt;</code></a> 元素。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>的元素，但始终排除 <code>&lt;address&gt;</code> 元素（按照逻辑对称性原则，如果 <code>&lt;address&gt;</code> 标签作为父级，不能有嵌套的 <code>&lt;address&gt;</code> 元素，那么相同的 <code>&lt;address&gt;</code> 内容也不能有 <code>&lt;address&gt;</code> 标签作为其父级）。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><code><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/group_role">group</a></code></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>任意</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement"><code>HTMLElement</code></a> 在 Gecko 2.0（Firefox 4）之前，Gecko 使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLSpanElement"><code>HTMLSpanElement</code></a> 接口实现此元素</td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-address-element](https://html.spec.whatwg.org/multipage/sections.html#the-address-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   与章节相关的其他元素：[`<body>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/body)、[`<nav>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/nav)、[`<article>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/article)、[`<aside>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/aside)、[h1](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h2](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h3](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h4](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h5](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[h6](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)、[`<hgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/hgroup)、[`<footer>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/footer)、[`<section>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/section)、[`<header>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/header)；
-   [HTML 文档的章节和大纲](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/Heading_Elements)。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/address/contributors.txt)更新。
