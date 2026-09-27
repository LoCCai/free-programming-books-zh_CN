基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`decodeURIComponent()`** 方法用于解码由 [`encodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 方法或者其他类似方法编码的部分统一资源标识符（URI）。

## [语法](#语法)

js

```
decodeURIComponent(encodedURI)
```

### [参数](#参数)

[`encodedURI`](#encodeduri)

编码后的部分 URI

### [返回值](#返回值)

一个解码后的统一资源标识符（URI）字符串，处理前的 URI 经过了给定格式的编码。

### [异常](#异常)

当该方法使用不当时，将会抛出一个[`URIError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/URIError)（“格式错误的 URI 序列”）异常。

## [描述](#描述)

将已编码 URI 中所有能识别的转义序列转换成原字符。

## [示例](#示例)

### [解码一个西里尔字母的 URL](#解码一个西里尔字母的_url)

js

```
decodeURIComponent("JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B");
// "JavaScript_шеллы"
```

### [捕捉异常](#捕捉异常)

js

```
try {
  var a = decodeURIComponent("%E0%A4%A");
} catch (e) {
  console.error(e);
}

// URIError: malformed URI sequence
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-decodeuricomponent-encodeduricomponent](https://tc39.es/ecma262/multipage/global-object.html#sec-decodeuricomponent-encodeduricomponent) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`decodeURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)
-   [`encodeURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
-   [`encodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年9月21日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent/contributors.txt)更新。
