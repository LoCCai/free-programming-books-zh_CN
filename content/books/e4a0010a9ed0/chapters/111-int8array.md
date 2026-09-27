基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`Int8Array`** 类型数组表示二进制补码 8 位有符号整数的数组。内容初始化为 0。一旦建立，你可以使用对象的方法引用数组中的元素，或使用标准数组索引语法 ( 即，使用括号注释)。

## [语法](#语法)

new Int8Array(length);
new Int8Array(typedArray);
new Int8Array(object);
new Int8Array(buffer \[, byteOffset \[, length\]\]);

有关构造函数语法和参数的更多信息，请访问 _[TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray#syntax)_.

## [静态属性](#静态属性)

[`Int8Array.BYTES_PER_ELEMENT`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT)

返回数组中每个元素的大小。在 `Int8Array` 中这个值为 1。

[Int8Array.length](#int8array.length)

此属性为固定值属性，值为 3。查看 [`Int8Array.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/length) 获得获取数组内元素个数方法。

[`Int8Array.prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

_TypedArray_ 对象的构造原型。

## [静态方法](#静态方法)

[`Int8Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from)

从类数组对象或迭代器生成 int8Array 数组对象。参照 [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

[`Int8Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of)

以多个参数构造 Int8Array 对象，参照 [`Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)

## [实例属性](#实例属性)

_还从其父接口 [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 继承实例属性。_

[`Int8Array.prototype.constructor`](#int8array.prototype.constructor)

这个方法会返回对象的构造原型。默认为`Int8Array` 构造函数。

[`Int8Array.prototype.buffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/buffer) 只读

Returns the [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) referenced by the `Int8Array` Fixed at construction time and thus **read only**.

[`Int8Array.prototype.byteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteLength) 只读

Returns the length (in bytes) of the `Int8Array` from the start of its [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer). Fixed at construction time and thus **read only.**

[`Int8Array.prototype.byteOffset`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteOffset) 只读

Returns the offset (in bytes) of the `Int8Array` from the start of its [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer). Fixed at construction time and thus **read only.**

[`Int8Array.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/length) 只读

Returns the number of elements hold in the `Int8Array`. Fixed at construction time and thus **read only.**

## [实例方法](#实例方法)

_从其父接口 [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 继承实例方法。_

## [示例](#示例)

js

```
// 以长度参数构造对象
var int8 = new Int8Array(2);
int8[0] = 42;
console.log(int8[0]); // 42
console.log(int8.length); // 2
console.log(int8.BYTES_PER_ELEMENT); // 1

// 以数组构造对象
var arr = new Int8Array([21, 31]);
console.log(arr[1]); // 31

// 从另一数组构造对象
var x = new Int8Array([21, 31]);
var y = new Int8Array(x);
console.log(y[0]); // 21

// 从 ArrayBuffer 构造对象
var buffer = new ArrayBuffer(8);
var z = new Int8Array(buffer, 1, 4);
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-typedarray-objects](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarray-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [兼容性说明](#兼容性说明)

自 ECMAScript 2015 (ES6) 施行，`Int8Array` 需要使用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 构造。从当前版本开始，不加 new 而便调用 `Int8Array` 构造器方法，将报出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 错误。

js

```
var dv = Int8Array([1, 2, 3]);
// TypeError: calling a builtin Int8Array constructor
// without new is forbidden
```

js

```
var dv = new Int8Array([1, 2, 3]);
```

## [参见](#参见)

-   [`core-js` 中 `Int8Array` 的 polyfill](https://github.com/zloirock/core-js#ecmascript-typed-arrays "外部链接（在新标签页中打开）")
-   [JavaScript 类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Typed_arrays)指南
-   [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
-   [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
-   [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年5月26日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int8Array/contributors.txt)更新。
