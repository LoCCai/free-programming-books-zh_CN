基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`Float64Array`** 类型数组代表的是平台字节顺序为 64 位的浮点数型数组 (对应于 C 浮点数据类型) 。如果需要控制字节顺序，使用 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView) 替代。其内容初始化为`0`。一旦建立起来，你可以使用这个对象的方法对其元素进行操作，或者使用标准数组索引语法 (使用方括号)。

## [语法](#语法)

new Float64Array(length);
new Float64Array(typedArray);
new Float64Array(object);
new Float64Array(buffer \[, byteOffset \[, length\]\]);

更多的语法信息和参数，参见 _[TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray#syntax)_.

## [静态属性](#静态属性)

[`Float64Array.BYTES_PER_ELEMENT`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT)

返回元素字节数。在 `Float64Array` 的情况下返回 8。

[Float64Array.length](#float64array.length)

长度属性的值为 3。关于其实际长度 (元素数量) 参见 [`Float64Array.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/length)。

[`Float64Array.prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

_TypedArray_对象的原型。

## [静态方法](#静态方法)

[`Float64Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from)

从一个类数组对象或可遍历对象创建一个新的 Float64Array。参见 [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)。

[`Float64Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of)

用可变数量的参数创建一个新的 Float64Array。参见 [`Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)。

## [实例属性](#实例属性)

_还从其父接口 [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 继承实例属性。_

[`Float64Array.prototype.constructor`](#float64array.prototype.constructor)

返回创建这个实例原型的函数。这是 `Float64Array` 默认的构造函数。

[`Float64Array.prototype.buffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/buffer) 只读

返回这个`Float64Array 引用的` [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)。构造时已固定，所以是**只读**的。

[`Float64Array.prototype.byteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteLength) 只读

返回从`Float64Array 的`[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)开头开始`的`长度 (以字节为单位) 。构造时已固定，所以是**只读**的。

[`Float64Array.prototype.byteOffset`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteOffset) 只读

返回从`Float64Array 的`[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)开头开始`的偏移量` (以字节为单位) 。构造时已固定，所以是**只读**的。

[`Float64Array.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/length) 只读

返回 `Float64Array` 中的元素个数。构造时已固定，所以是**只读**的。

## [实例方法](#实例方法)

_从其父接口 [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 继承实例方法。_

## [示例](#示例)

js

```
// From a length
var float64 = new Float64Array(2);
float64[0] = 42;
console.log(float64[0]); // 42
console.log(float64.length); // 2
console.log(float64.BYTES_PER_ELEMENT); // 8

// From an array
var arr = new Float64Array([21, 31]);
console.log(arr[1]); // 31

// From another TypedArray
var x = new Float64Array([21, 31]);
var y = new Float64Array(x);
console.log(y[0]); // 21

// From an ArrayBuffer
var buffer = new ArrayBuffer(32);
var z = new Float64Array(buffer, 0, 4);
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-typedarray-objects](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarray-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [一致性提示](#一致性提示)

从 ECMAScript 2015 (ES6) 开始，`Float32Array` 构造函数需要用一个 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符来构造。现在直接把 `Float32Array` 构造函数当函数调用而不使用 new，会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

js

```
var dv = Float64Array([1, 2, 3]);
// TypeError: calling a builtin Float64Array constructor
// 不允许不使用 new
```

js

```
var dv = new Float64Array([1, 2, 3]);
```

## [参见](#参见)

-   [JavaScript typed arrays](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Typed_arrays)
-   [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
-   [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年5月26日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Float64Array/contributors.txt)更新。
