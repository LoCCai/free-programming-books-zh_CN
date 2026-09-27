Deprecated

Avoid using this feature in new projects. TC39 included the `escape()` and `unescape()` methods in Annex B of the ECMAScript specification, which covers JavaScript features with "one or more undesirable characteristics and in the absence of legacy usage would be removed." This feature may be a candidate for removal from web standards or browsers.

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**备注：**`unescape()` 是由浏览器实现的非标准函数，其仅针对跨引擎兼容性而进行了标准化。并不要求所有的 JavaScript 引擎都实现它，并且可能无法在所有地方都正常工作。如果可能的话，请使用 [`decodeURIComponent()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent) 或 [`decodeURI()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)。

**`unescape()`** 函数计算一个新的字符串，将其中的十六进制转义序列替换为它们所代表的字符。转义序列可能是由 [`escape()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/escape) 等函数引入的。

## [语法](#语法)

js

```
unescape(str)
```

### [参数](#参数)

[`str`](#str)

要解码的字符串。

### [返回值](#返回值)

一个其中的某些字符已被解码的新的字符串。

## [描述](#描述)

`unescape` 函数是全局对象的函数属性。

`unescape()` 函数将任何转移序列替换为它所代表的字符。具体来说，它将任何形式为 `%XX` 或 `%uXXXX`（其中 `X` 代表一个十六进制数字）的转义序列替换为十六进制值为 `XX`/`XXXX` 的字符。如果转义序列无效（例如，如果 `%` 后面跟着一个或未跟十六进制数字），则保持不变。

**备注：**该函数主要用于 [URL 编码](https://zh.wikipedia.org/wiki/百分号编码 "外部链接（在新标签页中打开）")，其部分基于 [RFC 1738](https://datatracker.ietf.org/doc/html/rfc1738 "外部链接（在新标签页中打开）") 中的转义格式。`unescape()` 函数_不会_对字符串字面量中的[转义序列](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E8%BD%AC%E4%B9%89%E5%BA%8F%E5%88%97)进行求值。你可以将 `\xXX` 替换为 `%XX`，将 `\uXXXX` 替换为 `%uXXXX`，以获得一个可以被 `unescape()` 处理的字符串。

## [示例](#示例)

### [使用 unescape()](#使用_unescape)

js

```
unescape("abc123"); // "abc123"
unescape("%E4%F6%FC"); // "äöü"
unescape("%u0107"); // "ć"
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-unescape-string](https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-unescape-string) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`core-js` 中 `unescape` 的 polyfill](https://github.com/zloirock/core-js#ecmascript-string-and-regexp "外部链接（在新标签页中打开）")
-   [`decodeURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)
-   [`decodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)
-   [`escape`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/escape)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/unescape/contributors.txt)更新。
