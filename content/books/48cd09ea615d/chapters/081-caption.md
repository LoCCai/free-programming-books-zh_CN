基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

## [简介](#简介)

**HTML `<caption>` 元素** (or _HTML 表格标题元素_) 展示一个表格的标题，它常常作为 [`<table>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table) 的第一个子元素出现，同时显示在表格内容的最前面，但是，它同样可以被 CSS 样式化，所以，它同样可以出现在任何一个一个相对于表格的做任意位置。

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">Content categories</a></th><td>None.</td></tr><tr><th scope="row">Permitted content</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#Flow_content">Flow content</a>.</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">Permitted parent elements</th><td>A <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table"><code>&lt;table&gt;</code></a> element, as its first descendant.</td></tr><tr><th scope="row">DOM interface</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLTableCaptionElement"><code>HTMLTableCaptionElement</code></a></td></tr></tbody></table>

## [特性](#特性)

本元素包含了所有 [全局特性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`align`](#align)

这个可枚举属性表明了 caption 相对于 table 应该如何排列。它可能有以下几个值：

-   `left`, 展示在表格左边
-   `top`, 显示在表格前面
-   `right`, 显示在表格右边
-   `bottom`, 显示在表格下面

## [使用说明](#使用说明)

当 [`<table>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table) 元素是[`<caption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/caption) 的父元素，caption 是[`<figure>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figure) 元素的唯一后代的时候，使用[`<figcaption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/figcaption)元素替代 caption 元素

## [实例](#实例)

请查看 [`<table>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table) 页面获得 [`<caption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/caption)的例子

## [Specifications](#specifications)

| 规范 |
| --- |
| [HTML  
\# the-caption-element](https://html.spec.whatwg.org/multipage/tables.html#the-caption-element) |

## [Browser compatibility](#browser_compatibility)

## [See also](#see_also)

-   其他与 table 相关的 HTML 元素：[`<col>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/col), [`<colgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/colgroup), [`<table>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table), [`<tbody>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tbody), [`<td>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/td), [`<tfoot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tfoot), [`<th>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/th), [`<thead>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/thead), [`<tr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr);
-   可能对[`<caption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/caption) 元素有用的 CSS 属性：
    -   [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-align), [`caption-side`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/caption-side).

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月29日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/caption/contributors.txt)更新。
