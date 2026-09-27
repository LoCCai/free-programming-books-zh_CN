基线

广泛可用

\*

自 2016年9月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`Iterator`** 对象是一个符合[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%8D%8F%E8%AE%AE)的对象，其提供了 `next()` 方法用以返回迭代器结果对象。所有内置迭代器都继承自 `Iterator` 类。`Iterator` 类提供了 [`[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/Symbol.iterator) 方法，该方法返回迭代器对象本身，使迭代器也[可迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE)。它还提供了一些使用迭代器的辅助方法。

## [描述](#描述)

以下都是内置的 JavaScript 迭代器：

-   _数组迭代器_，返回自 [`Array.prototype.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values)、[`Array.prototype.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)、[`Array.prototype.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)、[`Array.prototype[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Symbol.iterator)、[`TypedArray.prototype.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/values)、[`TypedArray.prototype.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/keys)、[`TypedArray.prototype.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/entries)、[`TypedArray.prototype[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/Symbol.iterator) 和 [`arguments[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments/Symbol.iterator)。
-   _字符串迭代器_，返回自 [`String.prototype[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Symbol.iterator)。
-   _Map 迭代器_，返回自 [`Map.prototype.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/values)、[`Map.prototype.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/keys)、[`Map.prototype.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) 和 [`Map.prototype[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/Symbol.iterator)。
-   _Set 迭代器_，返回自 [`Set.prototype.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/values)、[`Set.prototype.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/keys)、[`Set.prototype.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) 和 [`Set.prototype[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/Symbol.iterator)。
-   _正则表达式字符串迭代器_，返回自 [`RegExp.prototype[Symbol.matchAll]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.matchAll) 和 [`String.prototype.matchAll()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)。
-   [`Generator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator) 对象，返回自[生成器函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)。
-   _Segment 迭代器_，返回自 [`Intl.Segmenter.prototype.segment()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment) 返回的 [`Segments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment/Segments) 对象的 [`[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter/segment/Segments/Symbol.iterator) 方法。
-   _迭代器辅助方法_，返回自迭代器辅助方法例如 [`Iterator.prototype.filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter) 和 [`Iterator.prototype.map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map)。

每个迭代器都有一个不同的原型对象，它定义了特定迭代器使用的 `next()` 方法。例如，所有字符串迭代器对象都继承自隐藏对象 `StringIteratorPrototype`，该对象具有按码位迭代当前字符串的 `next()` 方法。`StringIteratorPrototype` 还有一个 [`[Symbol.toStringTag]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性，其初始值为字符串 `"String Iterator"`。该属性在 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 中使用。类似地，其他迭代器原型也有自己的 `[Symbol.toStringTag]` 值，这些值与上面给出的名称相同。

所有这些原型对象都继承自 `Iterator.prototype`，它提供了一个返回迭代器对象本身的 [`[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) 方法，这使迭代器也变得[可迭代](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E5%8F%AF%E8%BF%AD%E4%BB%A3%E5%8D%8F%E8%AE%AE)。

### [迭代器辅助方法](#迭代器辅助方法)

**备注：**这些方法是_迭代器_辅助方法，而不是_可迭代对象_辅助方法，因为可迭代对象的唯一要求就是具有 `[Symbol.iterator]()` 方法，因此它们没有共享的原型来安装这些方法。

`Iterator` 类本身提供了一些使用迭代器的辅助方法。例如，你可能想做以下事情：

js

```
const nameToDeposit = new Map([
  ["Anne", 1000],
  ["Bert", 1500],
  ["Carl", 2000],
]);

const totalDeposit = [...nameToDeposit.values()].reduce((a, b) => a + b);
```

这首先将 [`Map.prototype.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/values) 返回的迭代器器转换为数组，然后使用 [`Array.prototype.reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) 方法计算总和。然而，这既创建了一个中间数组，又重复了数组两次。相反，你可以使用迭代器本身的 `reduce()` 方法：

js

```
const totalDeposit = nameToDeposit.values().reduce((a, b) => a + b);
```

这种方法更加高效，因为它只迭代迭代器一次，而不需要保存任何中间值。迭代器辅助方法对于使用无限迭代器是必需的：

js

```
function* fibonacci() {
  let current = 1;
  let next = 1;
  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}

const seq = fibonacci();
const firstThreeDigitTerm = seq.find((n) => n >= 100);
```

你无法将 `seq` 转换为数组，因为它是无穷的。相反，你可以使用迭代器本身的 `find()` 方法，该方法仅需要迭代 `seq` 查找满足条件的第一个值。

你会发现许多迭代器方法类似于数组方法，例如：

| 迭代器方法 | 数组方法 |
| --- | --- |
| [`Iterator.prototype.every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/every) | [`Array.prototype.every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every) |
| [`Iterator.prototype.filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter) | [`Array.prototype.filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) |
| [`Iterator.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/find) | [`Array.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find) |
| [`Iterator.prototype.flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap) | [`Array.prototype.flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) |
| [`Iterator.prototype.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/forEach) | [`Array.prototype.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) |
| [`Iterator.prototype.map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map) | [`Array.prototype.map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) |
| [`Iterator.prototype.reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/reduce) | [`Array.prototype.reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) |
| [`Iterator.prototype.some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/some) | [`Array.prototype.some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some) |

[`Iterator.prototype.drop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/drop) 和 [`Iterator.prototype.take()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/take) 组合起来有点类似于 [`Array.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)。

在这些方法中，[`filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter)、[`flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap)、[`map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map)、[`drop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/drop) 和 [`take()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/take) 返回一个新的_迭代器辅助方法_对象。迭代器辅助方法也是一个 `Iterator` 实例，使辅助方法可链式调用。所有迭代器辅助方法对象都继承了一个通用的原型对象，该对象实现了迭代器协议：

[`next()`](#next)

调用底层迭代器的 `next()` 方法，将辅助方法应用于结果，并返回结果。

[`return()`](#return)

调用底层迭代器的 `return()` 方法，并返回结果。

迭代器辅助方法与底层迭代器共享相同的数据源，因此迭代迭代器辅助方法会导致底层迭代器也被迭代。没有办法“复刻”迭代器以允许它被多次迭代。

js

```
const it = [1, 2, 3].values();
const it2 = it.drop(0); // 本质上是一个副本
console.log(it.next().value); // 1
console.log(it2.next().value); // 2
console.log(it.next().value); // 3
```

### [恰当的迭代器](#恰当的迭代器)

有两种“迭代器”：符合[迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%8D%8F%E8%AE%AE)（必需且只需具有 `next()` 方法）的对象，以及继承自 `Iterator` 类的对象，后者可以使用辅助方法。两者互不包含——继承自 `Iterator` 的对象不会自动变成迭代器，因为 `Iterator` 类并未定义 `next()` 方法。相反，这些对象需要自己定义 `next()` 方法。_恰当的迭代器_指的是即符合迭代器协议，同时又继承自 `Iterator` 的迭代器。大多数代码所期望的迭代器都是恰当的迭代器并可以通过迭代返回恰当的迭代器。要创建恰当的迭代器，可以定义一个继承 [`Iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/Iterator) 的类，或使用 [`Iterator.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/from) 方法。

js

```
class MyIterator extends Iterator {
  next() {
    // …
  }
}

const myIterator = Iterator.from({
  next() {
    // …
  },
});
```

## [构造函数](#构造函数)

-   [`Iterator()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/Iterator)
    -   ：旨在被创建迭代器的其他类[继承](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends)。直接用于构建会抛出错误。

## [静态方法](#静态方法)

[`Iterator.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/from)

从一个迭代器或可迭代对象创建一个新的 `Iterator` 对象。

## [实例属性](#实例属性)

这些属性定义于 `Iterator.prototype` 并由所有 `Iterator` 实例所共享。

[`Iterator.prototype.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

创建实例对象的构造函数。对于 `Iterator` 实例，其初始值是 [`Iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/Iterator) 构造函数。

[`Iterator.prototype[Symbol.toStringTag]`](#iterator.prototypesymbol.tostringtag)

[`[Symbol.toStringTag]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性的初始值是字符串 `"Iterator"`。该属性在 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 中使用。

**备注：**与大多数内置类的 `[Symbol.toStringTag]` 不同，出于 web 兼容性原因，`Iterator.prototype[Symbol.toStringTag]` 是可写的。

## [实例方法](#实例方法)

[`Iterator.prototype.drop()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/drop)

返回一个新的迭代器辅助方法，其会跳过当前迭代器开头给定数量的元素。

[`Iterator.prototype.every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/every)

测试是否所有由迭代器产生的元素都能通过由提供的函数实现的测试。

[`Iterator.prototype.filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter)

返回一个新的迭代器辅助方法，其只产生迭代器中令提供的回调函数返回 `true` 的那些元素。

[`Iterator.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/find)

返回迭代器产生的第一个满足提供的测试函数的元素。如果没有满足测试函数的值，则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

[`Iterator.prototype.flatMap()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap)

返回一个新的迭代器辅助方法，其获取原始迭代器中的每个元素，通过映射函数进行映射，并产生映射函数返回的元素（包含在另一个迭代器或可迭代对象）。

[`Iterator.prototype.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/forEach)

为迭代器生成的每个元素执行一次提供的函数。

[`Iterator.prototype.map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map)

返回一个新的迭代器辅助方法，其生成的元素都由映射函数进行转换而来。

[`Iterator.prototype.reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/reduce)

对迭代器生成的每个元素执行用户提供的“reducer”回调函数，传入前一个元素计算的返回值。在所有元素上运行 reducer 的最终结果是单个值。

[`Iterator.prototype.some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/some)

测试迭代器中是否至少有一个能够的元素通过由提供的函数实现的测试。返回一个布尔值。

[`Iterator.prototype.take()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/take)

返回一个新的迭代器帮助方法，它生成当前迭代器中给定数量的元素，然后结束。

[`Iterator.prototype.toArray()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/toArray)

创建一个用迭代器产生的元素填充的新的 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) 实例。

[`Iterator.prototype[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/Symbol.iterator)

返回迭代器对象本身。这使迭代器对象也是可迭代的。

## [示例](#示例)

### [使用迭代器作为可迭代对象](#使用迭代器作为可迭代对象)

所有内置迭代器都是可迭代的，因此你可以在 `for...of` 循环中使用它们：

js

```
const arrIterator = [1, 2, 3].values();
for (const value of arrIterator) {
  console.log(value);
}
// 打印：1, 2, 3
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-iterator-objects](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-iterator-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`core-js` 中 `Iterator` 的 polyfill](https://github.com/zloirock/core-js#iterator-helpers "外部链接（在新标签页中打开）")
-   [`function*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)
-   [迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator/contributors.txt)更新。
