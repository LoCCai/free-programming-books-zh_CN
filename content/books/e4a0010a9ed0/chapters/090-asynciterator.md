基线

广泛可用

\*

自 2020年1月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`AsyncIterator`** 对象是符合[异步迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%BC%82%E6%AD%A5%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%92%8C%E5%BC%82%E6%AD%A5%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE)的对象，其提供了 `next()` 方法用以返回一个兑现为迭代器结果对象的 promise。`AsyncIterator.prototype` 对象是一个隐藏的全局对象，所有内置的异步迭代器都继承自它。其提供了 [`[Symbol.asyncIterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator/Symbol.asyncIterator) 方法，该方法返回异步迭代器对象本身，使异步迭代器也[异步可迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%BC%82%E6%AD%A5%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%92%8C%E5%BC%82%E6%AD%A5%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE)。

注意，`AsyncIterator` _不是_全局对象，尽管将来会出现[异步迭代器辅助方法提案](https://github.com/tc39/proposal-async-iterator-helpers "外部链接（在新标签页中打开）")。所有内置异步迭代器共享的 `AsyncIterator.prototype` 对象可以通过以下代码获得：

js

```
const AsyncIteratorPrototype = Object.getPrototypeOf(
  Object.getPrototypeOf(Object.getPrototypeOf((async function* () {})())),
);
```

## [描述](#描述)

目前，唯一内置的 JavaScript 异步迭代器是由[异步生成器函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function*)返回的 [`AsyncGenerator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator) 对象。还有一些其他的内置异步迭代器存在于 web API 中，例如 [`ReadableStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 的异步迭代器。

每个异步迭代器都有一个不同的原型对象，它定义了特定异步迭代器使用的 `next()` 方法。所有这些原型对象都继承自 `AsyncIterator.prototype`，它提供了一个 [`[Symbol.asyncIterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator) 方法，该方法返回异步迭代器对象本身，使异步迭代器也[可异步迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%BC%82%E6%AD%A5%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%92%8C%E5%BC%82%E6%AD%A5%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE)。

## [实例方法](#实例方法)

[`AsyncIterator.prototype[Symbol.asyncIterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator/Symbol.asyncIterator)

返回异步迭代器对象本身。这使异步迭代器对象也可以异步迭代。

## [示例](#示例)

### [使用异步迭代器作为异步可迭代对象](#使用异步迭代器作为异步可迭代对象)

所有内置异步迭代器都可以异步迭代，因此你可以在 `for await...of` 循环中使用它们：

js

```
const asyncIterator = (async function* () {
  yield 1;
  yield 2;
  yield 3;
})();
(async () => {
  for await (const value of asyncIterator) {
    console.log(value);
  }
})();
// 输出：1，2，3
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-asynciteratorprototype](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-asynciteratorprototype) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`async function*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function*)
-   [迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator/contributors.txt)更新。
