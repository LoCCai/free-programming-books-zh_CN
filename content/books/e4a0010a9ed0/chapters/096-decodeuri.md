基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`decodeURI()`** 函数能解码由[`encodeURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 创建或其他流程得到的统一资源标识符（URI）。

## [尝试一下](#尝试一下)

```
const uri = "https://mozilla.org/?x=шеллы";
const encoded = encodeURI(uri);
console.log(encoded);
// Expected output: "https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"

try {
  console.log(decodeURI(encoded));
  // Expected output: "https://mozilla.org/?x=шеллы"
} catch (e) {
  // Catches a malformed URI
  console.error(e);
}
```

## [语法](#语法)

js

```
decodeURI(encodedURI)
```

### [参数](#参数)

[`encodedURI`](#encodeduri)

一个完整的编码过的 URI

### [返回值](#返回值)

返回一个给定编码统一资源标识符 (URI) 的未编码版本的新字符串。

### [异常](#异常)

当`encodedURI` 包含无效字符序列时，引发[`URIError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/URIError)（“格式错误的 URI 序列”）异常。

## [描述](#描述)

将已编码 URI 中所有能识别的转义序列转换成原字符，但不能解码那些不会被 [`encodeURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 编码的内容（例如 "`#`"）。

## [示例](#示例)

### [解码一个西里尔字母（Cyrillic）URL](#解码一个西里尔字母（cyrillic）url)

js

```
decodeURI(
  "https://developer.mozilla.org/ru/docs/JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B",
);
// "https://developer.mozilla.org/ru/docs/JavaScript_шеллы"
```

### [捕捉异常](#捕捉异常)

js

```
try {
  var a = decodeURI("%E0%A4%A");
} catch (e) {
  console.error(e);
}

// URIError: malformed URI sequence
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-decodeuri-encodeduri](https://tc39.es/ecma262/multipage/global-object.html#sec-decodeuri-encodeduri) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`decodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)
-   [`encodeURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
-   [`encodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月21日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI/contributors.txt)更新。
