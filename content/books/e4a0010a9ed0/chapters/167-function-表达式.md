基线

广泛可用

自 2016年9月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`function*`** 关键字可以在表达式内部定义一个生成器函数。

## [尝试一下](#尝试一下)

```
const foo = function* () {
  yield "a";
  yield "b";
  yield "c";
};

let str = "";
for (const val of foo()) {
  str = str + val;
}

console.log(str);
// Expected output: "abc"
```

## [语法](#语法)

function\* \[name\](https://developer.mozilla.org/[param1/[, param2\[, ..., paramN\]\]\]) {
   statements
}

### [参数](#参数)

[`name`](#name)

函数名。在声明_匿名函数_时可以省略。函数名称只是函数体中的一个本地变量。

[`paramN`](#paramn)

传入函数的一个参数名。一个函数最多有 255 个参数。

[`statements`](#statements)

函数体。

## [描述](#描述)

`function*`表达式和[`function* 声明`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)比较相似，并具有几乎相同的语法。`function*`表达式和`function*`声明之间主要区别就是函数名，即在创建匿名函数时，`function*`表达式可以省略函数名。阅读[`函数`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)章节了解更多信息。

## [示例](#示例)

下面的示例定义了一个未命名的生成器函数并把它赋值给`x`。函数产出它的传入参数的平方：

js

```
var x = function* (y) {
  yield y * y;
};
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-generator-function-definitions](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-generator-function-definitions) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`function*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)
-   [`GeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction)
-   [迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)
-   [`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield)
-   [`yield*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield*)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年7月16日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function*/contributors.txt)更新。
