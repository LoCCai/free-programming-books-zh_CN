Deprecated

Avoid using this feature in new projects. TC39 included the `escape()` and `unescape()` methods in Annex B of the ECMAScript specification, which covers JavaScript features with "one or more undesirable characteristics and in the absence of legacy usage would be removed." This feature may be a candidate for removal from web standards or browsers.

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

## [概览](#概览)

废弃的 **`escape()`** 方法生成新的由十六进制转义序列替换的字符串。使用 [`encodeURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 或 [`encodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 代替。

## [语法](#语法)

js

```
escape(str)
```

### [参数](#参数)

[`str`](#str)

待编码的字符串。

## [描述](#描述)

`escape` 函数是全局对象的属性。特色字符如：`@*_+-./` 被排除在外。

字符的 16 进制格式值，当该值小于等于 0xFF 时，用一个 2 位转义序列：`%xx` 表示。大于的话则使用 4 位序列：%**u**xxxx 表示。

## [示例](#示例)

js

```
escape("abc123"); // "abc123"
escape("äöü"); // "%E4%F6%FC"
escape("ć"); // "%u0107"

// special characters
escape("@*_+-./"); // "@*_+-./"
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-escape-string](https://tc39.es/ecma262/multipage/additional-ecmascript-features-for-web-browsers.html#sec-escape-string) |

## [浏览器兼容性](#浏览器兼容性)

## [其他链接](#其他链接)

-   [`encodeURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
-   [`encodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月21日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/escape/contributors.txt)更新。
