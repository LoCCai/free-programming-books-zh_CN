基线

广泛可用

自 2021年9月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`BigInt64Array`** 类型的数组代表由 64 位有符号整数组成的数组。如果需要控制字节顺序的话，请使用 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView) 代替。内容初始化为 `0n`。一旦建立，就可以使用对象的方法或使用标准数组索引语法（即使用中括号表示法）引用数组中的元素。

## [构造函数](#构造函数)

[`BigInt64Array()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array/BigInt64Array)

创建一个新的 `BigInt64Array` 对象。

## [静态属性](#静态属性)

[`BigInt64Array.BYTES_PER_ELEMENT`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT)

返回一个元素大小的数字值。`BigInt64Array` 返回 `8` 。

## [静态方法](#静态方法)

[`BigInt64Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from)

从类数组或者可迭代对象创建一个新的 `BigInt64Array`，另请参见 [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)。

[`BigInt64Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of)

从可变数量的参数创建一个新的 `BigInt64Array`，另请参见 [`Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)。

## [实例属性](#实例属性)

[`BigInt64Array.prototype.buffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/buffer)

返回被 `BigInt64Array` 引用的 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)。这在 `BigInt64Array` 对象构建时期就被锁定了，所以是**只读的**。

[`BigInt64Array.prototype.byteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteLength)

返回 `BigInt64Array` 从 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 开始的长度（以字节为单位）。这在 `BigInt64Array` 对象构建时期就被锁定了，所以是**只读的**。

[`BigInt64Array.prototype.byteOffset`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteOffset)

返回 `BigInt64Array` 从 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 开始的偏移量（以字节为单位）。这在 `BigInt64Array` 对象构建时期就被锁定了，所以是**只读的**。

[`BigInt64Array.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/length)

返回 `BigInt64Array` 中被保留的元素个数。这在 `BigInt64Array` 对象构建时期就被锁定了，所以是**只读的**。

## [实例方法](#实例方法)

_从其父接口 [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 继承实例方法。_

## [示例](#示例)

### [不同的方法去创建一个 `BigInt64Array`](#不同的方法去创建一个_bigint64array)

js

```
// From a length
var bigint64 = new BigInt64Array(2);
bigint64[0] = 42n;
console.log(bigint64[0]); // 42n
console.log(bigint64.length); // 2
console.log(bigint64.BYTES_PER_ELEMENT); // 8

// From an array
var arr = new BigInt64Array([21n, 31n]);
console.log(arr[1]); // 31n

// From another TypedArray
var x = new BigInt64Array([21n, 31n]);
var y = new BigInt64Array(x);
console.log(y[0]); // 21n

// From an ArrayBuffer
var buffer = new ArrayBuffer(32);
var z = new BigInt64Array(buffer, 0, 4);

// From an iterable
var iterable = (function* () {
  yield* [1n, 2n, 3n];
})();
var bigint64 = new BigInt64Array(iterable);
// BigInt64Array[1n, 2n, 3n]
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-typedarray-objects](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarray-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [JavaScript typed arrays](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Typed_arrays)
-   [`BigUint64Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array)
-   [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array/contributors.txt)更新。
