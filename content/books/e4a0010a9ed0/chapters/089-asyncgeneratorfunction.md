基线

广泛可用

自 2020年1月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`AsyncGeneratorFunction`** 对象为[异步生成器函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function*)提供方法。在 JavaScript 中，每个异步生成器函数实际上都是一个 `AsyncGeneratorFunction` 对象。

注意，`AsyncGeneratorFunction` _不是_全局对象。它可以通过以下代码获取：

js

```
const AsyncGeneratorFunction = async function* () {}.constructor;
```

`AsyncGeneratorFunction` 是 [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 的一个子类。

## [尝试一下](#尝试一下)

```
const AsyncGeneratorFunction = async function* () {}.constructor;

const foo = new AsyncGeneratorFunction(`
  yield await Promise.resolve('a');
  yield await Promise.resolve('b');
  yield await Promise.resolve('c');
`);

let str = "";

async function generate() {
  for await (const val of foo()) {
    str = str + val;
  }
  console.log(str);
}

generate();
// Expected output: "abc"
```

## [构造函数](#构造函数)

[`AsyncGeneratorFunction()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction/AsyncGeneratorFunction)

创建一个新的 `AsyncGeneratorFunction` 对象。

## [实例属性](#实例属性)

_同时也从它的父类 [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 继承实例属性_。

这些属性定义在 `AsyncGeneratorFunction.prototype` 并且由所有 `AsyncGeneratorFunction` 实例共享。

[`AsyncGeneratorFunction.prototype.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

用于创建实例对象的构造函数。对于 `AsyncGeneratorFunction` 实例，初始值是 [`AsyncGeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction/AsyncGeneratorFunction) 构造函数。

[`AsyncGeneratorFunction.prototype.prototype`](#asyncgeneratorfunction.prototype.prototype)

所有异步生成器函数共享相同的 [`prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype) 属性，即 [`AsyncGenerator.prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)。每个异步生成器函数实例也都有它自己的 `prototype` 属性。当调用异步生成器函数时，返回的异步生成器对象继承自异步生成器函数的 `prototype` 属性，而 property 属性也继承自 `AsyncGeneratorFunction.prototype.prototype`。

[`AsyncGeneratorFunction.prototype[Symbol.toStringTag]`](#asyncgeneratorfunction.prototypesymbol.tostringtag)

[`[Symbol.toStringTag]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性的初始值是字符串 `"AsyncGeneratorFunction"`。该属性在 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 中使用。

## [实例方法](#实例方法)

_同时也从它的父类 [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 继承方法_。

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-asyncgeneratorfunction-objects](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-asyncgeneratorfunction-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`async function*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function*)
-   [`async function*` 表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/async_function*)
-   [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
-   [`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)
-   [`GeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction)
-   [函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction/contributors.txt)更新。
