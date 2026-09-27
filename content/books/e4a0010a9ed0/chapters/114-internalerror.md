**非标准:** 该特性尚未标准化。我们不建议在生产环境中使用非标准特性，因为它们在浏览器中的支持有限，且可能发生变化或被移除。不过，在没有标准选项的特定情况下，它们可以作为合适的替代方案。

**`InternalError` 对象**表示出现在 JavaScript 引擎内部的错误。通常描述某种数量过多的情况，例如：

-   "too many switch cases"（过多 `case` 子句）；
-   "too many parentheses in regular expression"（正则表达式中括号过多）；
-   "array initializer too large"（数组初始化器过大）；
-   "too much recursion"（递归过深）。

## [构造函数](#构造函数)

[`InternalError()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/InternalError/InternalError)

创建一个新的 `InternalError` 对象。

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

### [递归过深](#递归过深)

根据退出条件所述，以下递归函数运行 10 次。

js

```
function loop(x) {
  // "x >= 10" 是退出条件
  if (x >= 10) return;

  // 做一些事情
  loop(x + 1); // 递归调用
}
loop(0);
```

如果这个条件值太高，可能不会奏效：

js

```
function loop(x) {
  if (x >= 1000000000000) return;

  // 做一些事情
  loop(x + 1);
}
loop(0);

// InternalError: too much recursion
```

要获取更多信息，请参阅 [InternalError: too much recursion](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Too_much_recursion)。

## [规范](#规范)

尚未成为任何规范的一部分。

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)
-   [InternalError: too much recursion](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Too_much_recursion)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/InternalError/contributors.txt)更新。
