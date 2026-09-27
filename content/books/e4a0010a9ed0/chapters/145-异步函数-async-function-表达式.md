基线

广泛可用

自 2017年4月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`async function`** 关键字可用于定义表达式中的异步函数。

你还可以使用[异步函数声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)。

## [语法](#语法)

js

```
async function (param0) {
  statements
}
async function (param0, param1) {
  statements
}
async function (param0, param1, /* … ,*/ paramN) {
  statements
}

async function name(param0) {
  statements
}
async function name(param0, param1) {
  statements
}
async function name(param0, param1, /* … ,*/ paramN) {
  statements
}
```

异步函数也可以使用[箭头语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)进行定义。

### [参数](#参数)

[`name` 可选](#name)

函数名称，可省略。如果省略则这个函数将成为_匿名_函数。该名称仅可在本函数中使用。

[`paramN` 可选](#paramn)

传入函数的形参名称。

[`statements` 可选](#statements)

构成函数主体的语句。

## [描述](#描述)

`async function` 表达式与[异步函数语句](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)非常相似，语法也基本相同。异步 `function` 表达式和异步 `function` 语句之间的主要区别在于_函数名称_，它可以在 `async function` 表达式中省略，从而创建一个_匿名_函数。`async function` 表达式可以用作 [IIFE](https://developer.mozilla.org/zh-CN/docs/Glossary/IIFE)（立即执行函数表达式，Immediately Invoked Function Expression），它在定义后立即运行。参见[函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)章节以获取更多信息。

## [示例](#示例)

### [简单示例](#简单示例)

js

```
function resolveAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

// 赋值给变量的异步函数表达式
const add = async function (x) {
  const a = await resolveAfter2Seconds(20);
  const b = await resolveAfter2Seconds(30);
  return x + a + b;
};

add(10).then((v) => {
  console.log(v); // 4 秒后打印 60
});

// 用作 IIFE 的异步函数表达式
(async function (x) {
  const p1 = resolveAfter2Seconds(20);
  const p2 = resolveAfter2Seconds(30);
  return x + (await p1) + (await p2);
})(10).then((v) => {
  console.log(v); // 2 秒后打印 60
});
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-async-function-definitions](https://tc39.es/ecma262/multipage/ecmascript-language-functions-and-classes.html#sec-async-function-definitions) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [异步函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)
-   [`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction) 对象
-   [`await`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年7月16日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/async_function/contributors.txt)更新。
