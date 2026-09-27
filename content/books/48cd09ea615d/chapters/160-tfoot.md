基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

HTML 元素 **`<tfoot>`** 定义了一组表格中各列的汇总行。

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容类别</a></th><td>无。</td></tr><tr><th scope="row">允许的内容</th><td>0 或多个<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr"><code>&lt;tr&gt;</code></a> 元素。</td></tr><tr><th scope="row">标签省略</th><td>开始标签是必需的。在父元素 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table"><code>&lt;table&gt;</code></a> 没有后续内容的情况下，结束标签可被省略。</td></tr><tr><th scope="row">允许的父元素</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table"><code>&lt;table&gt;</code></a> 元素。<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tfoot" aria-current="page"><code>&lt;tfoot&gt;</code></a> 必须出现在一个或多个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/caption"><code>&lt;caption&gt;</code></a>，<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/colgroup"><code>&lt;colgroup&gt;</code></a>，<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/thead"><code>&lt;thead&gt;</code></a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tbody"><code>&lt;tbody&gt;</code></a>，或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr"><code>&lt;tr&gt;</code></a> 元素之后。注意这是自 HTML5 起有的要求。<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tfoot" aria-current="page"><code>&lt;tfoot&gt;</code></a> 元素不能放在任何 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tbody"><code>&lt;tbody&gt;</code></a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr"><code>&lt;tr&gt;</code></a> 元素之后。注意，这与上述 HTML5 的标准相冲突。</td></tr><tr><th scope="row">Permitted ARIA roles</th><td>任意。</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLTableSectionElement"><code>HTMLTableSectionElement</code></a></td></tr></tbody></table>

## [属性](#属性)

此元素包含 [全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes).

[`align`](#align)

此枚举属性指定每个单元格内容所使用的水平对齐方式。可选值为：

-   `left`，单元格内容左对齐
-   `center`，单元格内容居中对齐
-   `right`，单元格内容右对齐
-   `justify`，插入空白调整单元格中的文本内容（译者注：即两端对齐）
-   `char`，将文本内容与一个具有最小偏移量的特定字符对齐，字符和偏移量分别由[`char`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tbody#char) 和 [`charoff`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tbody#charoff) 属性定义。若此值未设置，则假定为 `left`。

**备注：**此属性在最新标准中已被废弃（不支持），所以请勿使用。

-   为达到与`left`, `center`, `right`或`justify`相同的效果，请使用 CSS [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-align)属性。
-   为达到与 char 值相同的效果，在 CSS3 中可将 [`char`](#char) 的值用作 [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-align) 的属性值。

[`bgcolor`](#bgcolor)

此属性定义了列内单元格的背景色。定义此属性使用'#'作为前缀，其后是定义于[sRGB](https://www.w3.org/Graphics/Color/sRGB "外部链接（在新标签页中打开）")的 6 位十六进制码。也可使用 16 种预定义的色彩字符串之一。

**备注：**请勿使用此属性，因为这并非标准，且只有某些特定版本的 Microsoft Internet Explorer（IE 浏览器）支持：[`<tfoot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tfoot)元素应使用[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)设计。若想得到与**bgcolor**属性相似的效果，可在相关的 [`<td>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/td)或[`<th>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/th)元素中使用[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) [`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/background-color)属性。

[`char`](#char)

此属性设置单元格对齐的基准字符。当对齐数字或货币值时，一个典型值会带有一个句点 (.)。如果[`align`](#align)未设置为`char`，此属性将被忽略。

**备注：**请勿使用此属性，因为在最新标准中此属性被废弃（且不受支持）。想要达到与`char`相同的效果，在 CSS3 中，可将[`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-align)属性设置为[`char`](#char)的属性值。

[`charoff`](#charoff)

此属性用作表明列内数据对于对齐基准字符的偏移字符数，对其基准字符由`char`属性指定。

**备注：**请勿使用此属性，因为在最新标准中此属性被废弃（且不受支持）。

[`valign`](#valign)

指定每个表脚单元格的垂直对齐方式。可能的[枚举](https://developer.mozilla.org/zh-CN/docs/Glossary/Enumerated)值有：`baseline`、`bottom`、`middle` 和 `top`。此属性已被弃用，请使用 CSS 属性 [`vertical-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/vertical-align) 代替。

## [示例](#示例)

请查看[`<table>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table)页面中`<tfoot>`的相关示例。

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-tfoot-element](https://html.spec.whatwg.org/multipage/tables.html#the-tfoot-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   其他 table 相关的 HTML 元素：[`<caption>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/caption), [`<col>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/col), [`<colgroup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/colgroup), [`<table>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/table), [`<tbody>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tbody), [`<td>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/td), [`<tbody>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tbody), [`<th>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/th), [`<thead>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/thead), [`<tr>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tr);
-   在设计`<tfoot>`时可能会有特殊效果的 CSS 属性和伪类：
    -   [`:nth-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Selectors/:nth-child)伪类：设置列内元素的对齐方式；
    -   [`text-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/text-align)属性：可设置单元格内容与同一字符对齐，例如'.'。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月10日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tfoot/contributors.txt)更新。
