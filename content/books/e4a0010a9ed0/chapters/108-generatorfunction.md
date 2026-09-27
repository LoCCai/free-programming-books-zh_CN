基线

广泛可用

自 2016年9月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`GeneratorFunction`** 对象为[生成器函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)提供了方法。在 JavaScript 中，每个生成器函数实际上都是一个 `GeneratorFunction` 对象。

请注意，`GeneratorFunction` _不是_全局对象。可以通过以下代码来获取它：

js

```
const GeneratorFunction = function* () {}.constructor;
```

`GeneratorFunction` 是 [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 的子类。

## [尝试一下](#尝试一下)

```
const GeneratorFunction = function* () {}.constructor;

const foo = new GeneratorFunction(`
  yield 'a';
  yield 'b';
  yield 'c';
`);

let str = "";
for (const val of foo()) {
  str = str + val;
}

console.log(str);
// Expected output: "abc"
```

## [构造函数](#构造函数)

[`GeneratorFunction()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction/GeneratorFunction)

创建一个新的 `GeneratorFunction` 对象。

## [实例属性](#实例属性)

_也从其父类 [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 继承实例属性_。

这些属性定义于 `GeneratorFunction.prototype` 并由所有 `GeneratorFunction` 实例所共享。

[`GeneratorFunction.prototype.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

创建实例对象的构造函数。对于 `GeneratorFunction` 实例，其初始值是 [`GeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction/GeneratorFunction) 构造函数。

[`GeneratorFunction.prototype.prototype`](#generatorfunction.prototype.prototype)

所有生成器函数共享同一个 [`prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype) 属性，即 [`Generator.prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)。每个生成器函数实例也有自己的 `prototype` 属性。当生成器函数被调用时，返回的生成器对象从生成器函数继承 `prototype` 属性，而该属性又继承自 `GeneratorFunction.prototype.prototype`。

[`GeneratorFunction.prototype[Symbol.toStringTag]`](#generatorfunction.prototypesymbol.tostringtag)

[`[Symbol.toStringTag]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性的初始值是字符串 `"GeneratorFunction"`。该属性被 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 使用。

## [实例方法](#实例方法)

_从其父类 [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 继承实例方法_。

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-generatorfunction-objects](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-generatorfunction-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`function*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)
-   [`function*` 表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function*)
-   [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
-   [`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)
-   [`AsyncGeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction)
-   [函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction/contributors.txt)更新。
