基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

该 **`Int32Array`** 类型表示在平台顺序字节中一个双补码 32 位有符号的整型数组。如果需要控制字节顺序，请改用 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)。此内容的初始化为 `0`。一旦创建，你可以使用对象的方法或者标准数组索引的语法 (即使用括号表示法)。

## [语法](#语法)

new Int32Array(length);
new Int32Array(typedArray);
new Int32Array(object);
new Int32Array(buffer \[, byteOffset \[, length\]\]);

更多关于构造函数语法和参数的详细信息，请参阅\*[TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray#syntax)。\*

## [静态属性](#静态属性)

[`Int32Array.BYTES_PER_ELEMENT`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT)

Returns a number value of the element size. `4` in the case of an `Int32Array`.

[Int32Array.length](#int32array.length)

Static length property whose value is 3. For the actual length (number of elements), see [`Int32Array.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/length).

[`Int32Array.prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

Prototype for the _TypedArray_ objects.

## [静态方法](#静态方法)

[`Int32Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from)

从类似数组或者可迭代对象中创建一个新的 `Int32Array`。另见 [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

[`Int32Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of)

创建一个新的具有可变数量参数的 `Int32Array`。另见 [`Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)。

## [实例属性](#实例属性)

_还从其父接口 [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 继承实例属性。_

[`Int32Array.prototype.constructor`](#int32array.prototype.constructor)

返回创建实例原型的函数。默认情况下，它是 `Int32Array` 的构造函数。

[`Int32Array.prototype.buffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/buffer) 只读

返回在构造时被固定的 `Int32Array` 引用的 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)，因此只读。

[`Int32Array.prototype.byteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteLength) 只读

返回从其 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 开始的 `Int32Array` 长度的 (以字节为单位)。在构造时被固定，因此只读。

[`Int32Array.prototype.byteOffset`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteOffset) 只读

返回从其 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 开始的偏移量 (以字节为单位)。在构造时被固定，因此只读。

[`Int32Array.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/length) 只读

返回 `Int32ArrayInt32Array` 包含的元素个数。在构造时被固定，因此只读。

## [实例方法](#实例方法)

_从其父接口 [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 继承实例方法。_

## [示例](#示例)

不同的方式创建一个 `Int32Array`

js

```
// 从一个数字
var int32 = new Int32Array(2);
int32[0] = 42;
console.log(int32[0]); // 42
console.log(int32.length); // 2
console.log(int32.BYTES_PER_ELEMENT); // 4

// 从一个数组
var arr = new Int32Array([21, 31]);
console.log(arr[1]); // 31

// 从一个其他 TypedArray
var x = new Int32Array([21, 31]);
var y = new Int32Array(x);
console.log(y[0]); // 21

// 从一个 ArrayBuffer
var buffer = new ArrayBuffer(16);
var z = new Int32Array(buffer, 0, 4);
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-typedarray-objects](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarray-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [兼容性说明](#兼容性说明)

Starting with ECMAScript 2015 (ES6), `In32Array` constructors require to be constructed with a [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) operator. Calling a `Int32Array` constructor as a function without `new`, will throw a [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) from now on.

js

```
var dv = Int32Array([1, 2, 3]);
// TypeError: calling a builtin Int32Array constructor
// without new is forbidden
```

js

```
var dv = new Int32Array([1, 2, 3]);
```

## [参见](#参见)

-   [JavaScript typed arrays](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Typed_arrays)
-   [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
-   [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年5月26日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int32Array/contributors.txt)更新。
