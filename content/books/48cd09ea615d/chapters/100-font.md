Deprecated

Avoid using this feature in new projects. This feature may be a candidate for removal from web standards or browsers.

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

## [概要](#概要)

_HTML Font 元素_（`<font>`）定义了该内容的字体大小、顏色与表现。

**备注：**不要使用这个元素！请使用 CSS [字体](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Guides/Fonts)属性来为文本添加样式。

## [属性](#属性)

如同其他 HTML 元素，这个元素支持[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`color`](#color)

这个属性使用颜色名称或是十六进制的 #RRGGBB 格式，来设置文字的颜色。

[`face`](#face)

这个属性列出了一个或多个逗号分隔的字体名称。默认样式中的文档文字，会使用客户端浏览器所支持的，第一个字体风格来渲染。如果本地系统中并没有安装列出的字体，浏览器会使用系统预设的均衡（proportional）或等宽（fixed-width）字体。

[`size`](#size)

该属性将字体大小指定为数字或相对值。数值范围从 `1` 到 `7`，其中 `1` 是最小的，`3` 是默认值。可以使用相对值来定义它，例如 `+2` 或 `-3`，这将其设置为相对于默认值 `3`。

## [DOM 接口](#dom_接口)

这个元素实现了 [`HTMLFontElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFontElement) 接口。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# font](https://html.spec.whatwg.org/multipage/obsolete.html#font) |

## [浏览器兼容性](#浏览器兼容性)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/font/contributors.txt)更新。
