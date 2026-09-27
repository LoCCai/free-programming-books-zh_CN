基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`RangeError`** 对象表示一个特定值不在所允许的范围或者集合中的错误。

## [描述](#描述)

试图将一个值作为参数传递给一个允许的范围不包含该值的函数会引发 `RangeError`。

在以下的情况中，可能会遇到这个问题：

-   将不允许的字符串值传递给 [`String.prototype.normalize()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)，或
-   尝试使用 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) 构造函数创建一个具有不合法的长度的字符串，或
-   传递错误值到数值计算方法（[`Number.toExponential()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential)、[`Number.toFixed()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 或 [`Number.toPrecision()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)）。

`RangeError` 是一个[可序列化对象](https://developer.mozilla.org/zh-CN/docs/Glossary/Serializable_object)，所以可以使用 [`structuredClone()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/structuredClone "structuredClone()") 对它进行克隆，也可以使用 [`postMessage()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/postMessage "postMessage()") 在 [Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker) 之间拷贝它。

## [构造函数](#构造函数)

[`RangeError()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError/RangeError)

创建一个新的 `RangeError` 对象。

## [实例属性](#实例属性)

[`Error.prototype.message`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/message)

错误消息。继承自 [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)。

[`Error.prototype.name`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/name)

错误名称。继承自 [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)。

[`Error.prototype.cause`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/cause)

表示导致当前错误被抛出的原因。继承自 [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)。

[`Error.prototype.fileName`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/fileName)

引发此错误的文件的路径。继承自 [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)。

[`Error.prototype.lineNumber`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/lineNumber)

引发此错误的代码所在的文件的行号。继承自 [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)。

[`Error.prototype.columnNumber`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/columnNumber)

引发此错误的代码在文件中所在行的列号。继承自 [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)。

[`Error.prototype.stack`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/stack)

堆栈跟踪。继承自 [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)。

## [示例](#示例)

### [使用 RangeError（对于数值）](#使用_rangeerror（对于数值）)

js

```
function check(n) {
  if (!(n >= -500 && n <= 500)) {
    throw new RangeError("The argument must be between -500 and 500.");
  }
}

try {
  check(2000);
} catch (error) {
  if (error instanceof RangeError) {
    // 处理错误
  }
}
```

### [使用 RangeError（对于其他的值）](#使用_rangeerror（对于其他的值）)

js

```
function check(value) {
  if (!["apple", "banana", "carrot"].includes(value)) {
    throw new RangeError(
      'The argument must be an "apple", "banana", or "carrot".',
    );
  }
}

try {
  check("cabbage");
} catch (error) {
  if (error instanceof RangeError) {
    // 处理错误
  }
}
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-native-error-types-used-in-this-standard-rangeerror](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-native-error-types-used-in-this-standard-rangeerror) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)
-   [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
-   [`Number.prototype.toExponential()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toExponential)
-   [`Number.prototype.toFixed()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
-   [`Number.prototype.toPrecision()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)
-   [`String.prototype.normalize()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RangeError/contributors.txt)更新。
