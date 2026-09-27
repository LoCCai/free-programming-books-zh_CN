基线

广泛可用

自 2020年1月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

全局属性 `globalThis` 包含全局的 `this` 值，类似于全局对象（global object）。

## [尝试一下](#尝试一下)

```
function canMakeHTTPRequest() {
  return typeof globalThis.XMLHttpRequest === "function";
}

console.log(canMakeHTTPRequest());
// Expected output (in a browser): true
```

| `globalThis` 的属性特性 |
| --- |
| 可写 | 是 |
| 可枚举 | 否 |
| 可配置 | 是 |

## [语法](#语法)

globalThis

## [描述](#描述)

在以前，从不同的 JavaScript 环境中获取全局对象需要不同的语句。在 Web 中，可以通过 `window`、`self` 或者 `frames` 取到全局对象，但是在 [Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker) 中，只有 `self` 可以。在 Node.js 中，它们都无法获取，必须使用 `global`。

在松散模式下，可以在函数中返回 `this` 来获取全局对象，但是在严格模式和模块环境下，`this` 会返回 `undefined`。你也可以使用 `Function('return this')()`，但那些禁用[`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)的环境，如在浏览器中的[CSP](https://developer.mozilla.org/zh-CN/docs/Glossary/CSP)，不允许这样使用[`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)。

`globalThis` 提供了一个标准的方式来获取不同环境下的全局 `this` 对象（也就是全局对象自身）。不像 `window` 或者 `self` 这些属性，它确保可以在有无窗口的各种环境下正常工作。所以，你可以安心的使用 `globalThis`，不必担心它的运行环境。为便于记忆，你只需要记住，全局作用域中的 `this` 就是 `globalThis`。

### [HTML 与 WindowProxy](#html_与_windowproxy)

在很多引擎中， `globalThis` 被认为是真实的全局对象的引用，但是在浏览器中，由于 iframe 以及跨窗口安全性的考虑，它实际引用的是真实全局对象（不可以被直接访问）的 [`Proxy`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 代理。在通常的应用中，很少会涉及到代理与对象本身的区别，但是也需要加以注意。

### [命名](#命名)

并没有采用一些更常见的命名方式，如 `self` 和 `global`，这是为了避免影响现存代码的兼容性。更多相关信息可以查看 [language proposal's "naming" document](https://github.com/tc39/proposal-global/blob/master/NAMING.md "外部链接（在新标签页中打开）") 。

## [示例](#示例)

在 `globalThis` 之前，获取某个全局对象的唯一方式就是 `Function('return this')()`，但是这在某些情况下会违反 [CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CSP) 规则，所以，[es6-shim](https://github.com/paulmillr/es6-shim "外部链接（在新标签页中打开）") 使用了类似如下的方式：

js

```
var getGlobal = function () {
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
};

var globals = getGlobal();

if (typeof globals.setTimeout !== "function") {
  // 此环境中没有 setTimeout 方法！
}
```

但是有了 `globalThis` 之后，只需要：

js

```
if (typeof globalThis.setTimeout !== "function") {
  //  此环境中没有 setTimeout 方法！
}
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-globalthis](https://tc39.es/ecma262/multipage/global-object.html#sec-globalthis) |

## [浏览器兼容性](#浏览器兼容性)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年5月26日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis/contributors.txt)更新。
