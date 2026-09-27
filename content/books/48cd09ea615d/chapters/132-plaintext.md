Deprecated

Avoid using this feature in new projects. This feature may be a candidate for removal from web standards or browsers.

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<plaintext>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素将起始标签后面的任何东西渲染为纯文本，不会解释为 HTML。它没有闭合标签，因为起始标签之后的所有内容都被视为原始文本。

**警告：**不要使用这个元素。

-   `<plaintext>` 自从 HTML 2 就废弃了，并且并不是所有浏览器都实现了它。就算是实现了它的浏览器，行为也并不一致。
-   `<plaintext>` 已经过时；接受它的浏览器可以将其视为 [`<pre>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/pre) 元素，仍然会解释其中的 HTML。
-   如果 [`<plaintext>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/plaintext) 元素是页面的第一个元素（除了任何不显示的元素），那就不要使用 HTML 了，取而代之的是使用 `text/plain` [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Extensions/Server-side/Configuring_server_MIME_types)的文本文件。
-   应该使用 [`<pre>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/pre) 元素代替 `<plaintext>`，或者如果语义准确（如内联文本），使用 [`<code>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/code) 元素。要确保转义了任何 `<`、`>` 和 `&` 字符，来避免将内容解释为 HTML。
-   等宽字体也可以显示在 [`<div>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/div) 元素中，通过使用足够的 [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 样式，在 [`font-family`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/font-family) 中将 `monospace` 用作通用字体的值。

## [属性](#属性)

除了[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)之外，这个元素没有其他属性。

## [DOM 接口](#dom_接口)

该元素实现了 [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) 接口。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# plaintext](https://html.spec.whatwg.org/multipage/obsolete.html#plaintext) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   可以使用 [`<pre>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/pre) 和 [`<code>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/code) 元素来代替本元素。
-   类似于 `<plaintext>` 的 [`<xmp>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/xmp) 元素，但同样已过时。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/plaintext/contributors.txt)更新。
