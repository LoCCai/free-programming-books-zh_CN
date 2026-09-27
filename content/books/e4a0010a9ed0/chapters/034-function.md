基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`Function`** 对象提供了用于处理[函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)的方法。在 JavaScript 中，每个函数实际上都是一个 `Function` 对象。

## [构造函数](#构造函数)

[`Function()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/Function)

创建一个新的 `Function` 对象。直接调用此构造函数可以动态创建函数，但会遇到和 [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 类似的安全问题和（相对较小的）性能问题。然而，与 `eval()` 不同的是，`Function` 构造函数创建的函数只能在全局作用域中运行。

## [实例属性](#实例属性)

以下属性定义在 `Function.prototype` 上，并且被所有 `Function` 实例共享。

[`Function.prototype.arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/arguments)

表示传递给该函数的参数。对于[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)、箭头函数、异步函数和生成器函数，访问 `arguments` 属性会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常。请改为在函数闭包内使用 [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments) 对象。

[`Function.prototype.caller`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/caller)

表示调用该函数的函数。对于[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)、箭头函数、异步函数和生成器函数，访问 `caller` 属性会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常。

[`Function.prototype.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

创建实例对象的构造函数。对于 `Function` 实例来说，初始值是 [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/Function) 构造函数。

以下属性是每个 `Function` 实例的自有属性。

[`displayName`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/displayName) 可选

函数的显示名称。

[`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/length)

指定函数期望的参数个数。

[`name`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/name)

函数的名称。

[`prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)

在使用 `function` 作为构造函数与 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 运算符一起使用时，用作新对象的原型。

## [实例方法](#实例方法)

[`Function.prototype.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

使用给定的 `this` 值和可选的参数数组（或[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#%E4%BD%BF%E7%94%A8%E7%B1%BB%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1)）作为参数来调用一个函数。

[`Function.prototype.bind()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

创建一个新的函数，在调用时，其 `this` 关键字被设置为提供的值，可选地在调用新函数时在提供的参数之前加上一系列给定的参数。

[`Function.prototype.call()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

使用给定的 `this` 值和可选参数调用一个函数。

[`Function.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/toString)

返回表示函数源代码的字符串。重写了 [`Object.prototype.toString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法。

[`Function.prototype[Symbol.hasInstance]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/Symbol.hasInstance)

指定确定构造函数是否将对象识别为其实例的默认过程。由 [`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 运算符调用。

## [示例](#示例)

### [Function 构造函数与函数声明之间的不同](#function_构造函数与函数声明之间的不同)

由 `Function` 构造函数创建的函数不会创建当前环境的闭包，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 `Function` 构造函数创建时所在的作用域的变量。这一点与使用 [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 执行创建函数的代码不同。

js

```
// 使用 `var` 创建一个全局属性
var x = 10;

function createFunction1() {
  const x = 20;
  return new Function("return x;"); // 这个 `x` 指的是全局 `x`
}

function createFunction2() {
  const x = 20;
  function f() {
    return x; // 这个 `x` 指的是上面的局部 `x`
  }
  return f;
}

const f1 = createFunction1();
console.log(f1()); // 10
const f2 = createFunction2();
console.log(f2()); // 20
```

虽然这段代码可以在浏览器中正常运行，但在 Node.js 中 `f1()` 会产生一个“找不到变量 `x`”的 `ReferenceError`。这是因为在 Node 中顶级作用域不是全局作用域，而 `x` 其实是在当前模块的作用域之中。

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-function-objects](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-function-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [函数声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function)
-   [函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function)
-   [`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)
-   [`AsyncGeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncGeneratorFunction)
-   [`GeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction)
-   [函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年5月26日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/contributors.txt)更新。
