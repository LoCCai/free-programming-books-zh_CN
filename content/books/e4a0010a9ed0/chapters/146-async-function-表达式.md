基线

广泛可用

自 2020年1月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`async function*`** 关键字可用于在表达式中定义一个异步生成器函数。

你也可以使用 [`async function*` 声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function*)定义一个异步生成器函数。

## [尝试一下](#尝试一下)

```
async function* foo() {
  yield await Promise.resolve("a");
  yield await Promise.resolve("b");
  yield await Promise.resolve("c");
}

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

## [语法](#语法)

js

```
async function* (param0) {
  statements
}
async function* (param0, param1) {
  statements
}
async function* (param0, param1, /* … ,*/ paramN) {
  statements
}

async function* name(param0) {
  statements
}
async function* name(param0, param1) {
  statements
}
async function* name(param0, param1, /* … ,*/ paramN) {
  statements
}
```

**备注：**为了避免 [`async function*` 声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function*)所带来的歧义，[表达式语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/Expression_statement)不能以关键字 `async function` 开头。`async function` 关键字仅在上下文中无法接受语句时，才会被视为表达式的开头。

### [参数](#参数)

[`name` 可选](#name)

函数名。在这种情况下，函数名是_匿名的_，可以被省略。该名称仅在函数主体的内部有效。

[`paramN` 可选](#paramn)

传递给函数的参数名称。

[`statements` 可选](#statements)

构成函数主体的语句。

## [描述](#描述)

`async function*` 表达式与 [`async function*` 声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function*)非常相似，语法几乎相同。_函数名_是 `async function*` 表达式和 `async function*` 声明之间最主要的区别，在 `async function*` 表达式中，可以创建_匿名_函数去忽略函数名。`async function*` 表达式可以用作[立即调用函数表达式（IIFE）](https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE)，该表达式在被定义后立即运行，允许你去创建一个临时的[异步的可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%BC%82%E6%AD%A5%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%92%8C%E5%BC%82%E6%AD%A5%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE)。有关更多信息，请参见[函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)这个章节。

## [示例](#示例)

### [使用 async function\*](#使用_async_function)

以下示例定义了一个没有名称的异步生成器函数并将它分配给变量 `x`。这个函数产生它参数的平方。

js

```
const x = async function* (y) {
  yield Promise.resolve(y * y);
};
x(6)
  .next()
  .then((res) => console.log(res.value)); // 36
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-async-generator-function-definitions](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-async-generator-function-definitions) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`async function*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function*) 语句
-   [`AsyncGeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction) 对象
-   [迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)
-   [`GeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction) 对象
-   [`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)
-   [`yield*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*)
-   [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function) 对象
-   [函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年7月16日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/async_function*/contributors.txt)更新。
