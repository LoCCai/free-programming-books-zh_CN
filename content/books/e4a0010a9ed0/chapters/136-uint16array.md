基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

`Uint16Array` 类型化数组表示 16 位无符号整数，按平台字节顺序排列。如果需要控制字节顺序，请使用 DataView 代替。内容被初始化为 0。建立后，就可以使用对象的方法或使用标准数组索引语法（即使用括号表示法）引用数组中的元素。

## [构造函数](#构造函数)

[`Uint16Array()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array/Uint16Array)

创建一个新的 `Uint16Array` 对象。

## [静态属性](#静态属性)

[`Uint16Array.BYTES_PER_ELEMENT`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT)

返回元素大小的数值。在 `Uint16Array` 情况下为 `2`。

## [静态方法](#静态方法)

[`Uint16Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from)

从类数组或可迭代对象创建一个新的 `Uint16Array`。可参阅 [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)。

[`Uint16Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of)

创建一个新的具有可变参数数目的 `Uint16Array`。可参阅 [`Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)。

## [实例属性](#实例属性)

_还从其父接口 [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 继承实例属性。_

[`Uint16Array.prototype.buffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/buffer)

返回 `Uint16Array` 在构造时固定引用的 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)。因此是**只读的**。

[`Uint16Array.prototype.byteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteLength)

返回 `Uint16Array` 从 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 开始的长度（以字节为单位）。在构建时固定，因此是**只读的**。

[`Uint16Array.prototype.byteOffset`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteOffset)

返回 `Uint16Array` 从 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 开始的偏移量（以字节为单位）。在构建时固定，因此是**只读的**。

[`Uint16Array.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/length)

返回 `Uint16Array` 中包含的元素数量。在构建时固定，因此是**只读的**。

## [实例方法](#实例方法)

_从其父接口 [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 继承实例方法。_

## [示例](#示例)

### [创建 Uint16Array 的不同方法](#创建_uint16array_的不同方法)

js

```
// 长度
var uint16 = new Uint16Array(2);
uint16[0] = 42;
console.log(uint16[0]); // 42
console.log(uint16.length); // 2
console.log(uint16.BYTES_PER_ELEMENT); // 2

// 数组
var arr = new Uint16Array([21, 31]);
console.log(arr[1]); // 31

// 另一个类型数组
var x = new Uint16Array([21, 31]);
var y = new Uint16Array(x);
console.log(y[0]); // 21

// 一个 ArrayBuffer
var buffer = new ArrayBuffer(8);
var z = new Uint16Array(buffer, 0, 4);

// 可迭代
var iterable = (function* () {
  yield* [1, 2, 3];
})();
var uint16 = new Uint16Array(iterable);
// Uint16Array[1, 2, 3]
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-typedarray-objects](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarray-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`core-js` 中 `Uint16Array` 的 polyfill](https://github.com/zloirock/core-js#ecmascript-typed-arrays "外部链接（在新标签页中打开）")
-   [JavaScript 类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Typed_arrays)指南
-   [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
-   [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
-   [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array/contributors.txt)更新。
