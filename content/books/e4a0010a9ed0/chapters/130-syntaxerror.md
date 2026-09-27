基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`SyntaxError`**（语法错误）对象代表尝试解析不符合语法的代码的错误。当 Javascript 引擎解析代码时，遇到了不符合语法规范的标记（token）或标记顺序，则会抛出 `SyntaxError`。

`SyntaxError` 是一个[可序列化对象](https://developer.mozilla.org/zh-CN/docs/Glossary/Serializable_object)，所以可以使用 [`structuredClone()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/structuredClone "structuredClone()") 对它进行克隆，也可以使用 [`postMessage()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/postMessage "postMessage()") 在 [Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker) 之间拷贝它。

## [构造函数](#构造函数)

[`SyntaxError()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError/SyntaxError)

创建一个新的 `SyntaxError` 对象。

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

### [捕获 SyntaxError](#捕获_syntaxerror)

js

```
try {
  eval("hoo bar");
} catch (e) {
  console.error(e instanceof SyntaxError);
  console.error(e.message);
  console.error(e.name);
  console.error(e.fileName);
  console.error(e.lineNumber);
  console.error(e.columnNumber);
  console.error(e.stack);
}
```

### [创建 SyntaxError](#创建_syntaxerror)

js

```
try {
  throw new SyntaxError("Hello", "someFile.js", 10);
} catch (e) {
  console.error(e instanceof SyntaxError); // true
  console.error(e.message); // Hello
  console.error(e.name); // SyntaxError
  console.error(e.fileName); // someFile.js
  console.error(e.lineNumber); // 10
  console.error(e.columnNumber); // 0
  console.error(e.stack); // @debugger eval code:3:9
}
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-native-error-types-used-in-this-standard-syntaxerror](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-native-error-types-used-in-this-standard-syntaxerror) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError/contributors.txt)更新。
