基线

广泛可用

自 2017年4月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`AsyncFunction`** 对象为[异步函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)提供方法。在 JavaScript 中，每个异步函数实际上都是一个 `AsyncFunction` 对象。

注意，`AsyncFunction` _不是_全局对象。它可以通过以下代码获取：

js

```
const AsyncFunction = async function () {}.constructor;
```

`AsyncFunction` 是 [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 的子类。

## [构造函数](#构造函数)

[`AsyncFunction()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction/AsyncFunction)

创建一个新的 `AsyncFunction` 对象。

## [实例属性](#实例属性)

_同时也从它的父类 [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 继承实例属性_。

这些属性定义在 `AsyncFunction.prototype` 并且由所有 `AsyncFunction` 实例共享。

[`AsyncFunction.prototype.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

用于创建实例对象的构造函数。对于 `AsyncFunction` 实例，初始值是 [`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction/AsyncFunction) 构造函数。

[`AsyncFunction.prototype[Symbol.toStringTag]`](#asyncfunction.prototypesymbol.tostringtag)

[`[Symbol.toStringTag]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性的初始值是字符串 `"AsyncFunction"`。该属性在 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 中使用。

## [实例方法](#实例方法)

_同时也从它的父类 [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 继承方法_。

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-async-function-objects](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-async-function-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`async function` 声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)
-   [`async function` 表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/async_function)
-   [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
-   [`AsyncGeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction)
-   [`GeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction)
-   [函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction/contributors.txt)更新。
