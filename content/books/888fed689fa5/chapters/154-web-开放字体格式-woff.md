基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**WOFF**（**Web Open Font Format**，Web 开放字体格式）是由 Mozilla 与 Type Supply、LettError 及其他组织协同开发的一种新的网页字体格式。它使用了与 TrueType、OpenType、Open Font 所采用的 `sfnt` 结构类似的压缩算法，不过还添加了元数据（metadata）及私有数据结构，其中包括了自定义空间，允许厂家和经销商在需要时提供许可证。

WOFF 有以下三点优势：

1.  字体采用压缩格式，因此，使用 WOFF 的网站将使用更少的带宽，并且比使用同等的未压缩的 TrueType 或 OpenType 文件加载更快。
2.  许多字体经销商并不愿意将 TrueType 或 OpenType 的许可证颁发给网站，他们更愿意颁发 WOFF 的许可证。这提高了网站设计者对字体的可用性。
3.  无论是收费还是免费的浏览器厂家都喜欢 WOFF 格式，因此它很可能成为真正通用的、可互操作的网络字体格式，这与目前其他的字体格式不同。

WOFF 有两个版本：WOFF 和 WOFF2。它们之间最大的差别体现在使用的压缩算法上。在 [`@font-face`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/At-rules/@font-face) 属性中，它们使用 `'woff'` 和 `'woff2'` 这两个标识符来区分。

## [使用 WOFF](#使用_woff)

通过 [`@font-face`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/At-rules/@font-face) 这个 CSS 属性来为你的网站使用 WOFF 字体。它的工作原理与 OpenType 和 TrueType 格式的字体完全一样，只是由于增加了压缩功能，它可能会让你的内容下载更有效率。

## [用于处理 WOFF 字体的工具](#用于处理_woff_字体的工具)

-   [用于处理 WOFF 字体的工具](https://github.com/odemiral/woff2sfnt-sfnt2woff "外部链接（在新标签页中打开）")。`sfnt2woff` 和 `woff2sfnt` 可以在 WOFF 和 OpenType 之间相互转换。

## [规范](#规范)

| 规范 |
| --- |
| [WOFF File Format 1.0  
\# OverallStructure](https://w3c.github.io/woff/woff1/spec/Overview.html#OverallStructure) |
| [WOFF File Format 2.0  
\# FileStructure](https://w3c.github.io/woff/woff2/#FileStructure) |

## [浏览器兼容性](#浏览器兼容性)

### [css.at-rules.font-face.WOFF](#css.at-rules.font-face.WOFF)

### [css.at-rules.font-face.WOFF\_2](#css.at-rules.font-face.WOFF_2)

## [参见](#参见)

-   [`@font-face`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/At-rules/@font-face)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年11月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Fonts/WOFF/contributors.txt)更新。
