基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`ArrayBuffer`** 对象用来表示通用的原始二进制数据缓冲区。

它是一个字节数组，通常在其他语言中称为“byte array”。你不能直接操作 `ArrayBuffer` 中的内容；而是要通过[类型化数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)或 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView) 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

[`ArrayBuffer()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/ArrayBuffer) 构造函数创建一个以字节为单位的给定长度的新 `ArrayBuffer`。你也可以从现有的数据（例如，从 [Base64](https://developer.mozilla.org/zh-CN/docs/Glossary/Base64) 字符串或者[从本地文件](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsArrayBuffer)）获取数组缓冲区。

`ArrayBuffer` 是一个[可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects)。

## [描述](#描述)

### [调整 ArrayBuffer 的大小](#调整_arraybuffer_的大小)

`ArrayBuffer` 对象可以通过在调用 [`ArrayBuffer()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/ArrayBuffer) 构造函数时包含 `maxByteLength` 选项来使其大小可变。你可以通过访问其 [`resizable`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/resizable) 和 [`maxByteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/maxByteLength) 属性来查询 `ArrayBuffer` 的大小是否可变以及其最大值。你可以通过调用 [`resize()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/resize) 为可变大小的 `ArrayBuffer` 分配一个新的大小。新的字节会被初始化为 0。

这些特性使得调整 `ArrayBuffer` 的大小更加高效——否则，你必须使用新的大小创建一个缓冲副本。这也使得 JavaScript 在这方面与 WebAssembly 相当（Wasm 线性内存可以使用 [`WebAssembly.Memory.prototype.grow()`](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory/grow) 调整大小）。

### [传输 ArrayBuffer](#传输_arraybuffer)

`ArrayBuffer` 对象可以在不同的执行上下文之间传输，就像 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 或 [Service Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) 那样，使用[结构化克隆算法](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)。这可以通过在 [`Worker.postMessage()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/postMessage) 或 [`ServiceWorker.postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/postMessage) 的调用中传入 `ArrayBuffer` 对象作为[可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects)来完成。在纯 JavaScript 中，也可以使用 [`transfer()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/transfer) 或 [`transferToFixedLength()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/transferToFixedLength) 方法来转移内存的所有权。

当一个 `ArrayBuffer` 对象被传输时，它原来的副本会被_分离（detached）_，这意味着它不再可用。在任何时候，只有一个 `ArrayBuffer` 的副本实际拥有底层内存。分离的缓冲区具有以下行为：

-   [`byteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/byteLength) 变为 0（在缓冲区和关联的类型化数组视图中）。
-   所有实例方法，比如 [`resize()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/resize) 和 [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/slice)，会在调用时抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。关联的类型化数组视图的方法也会抛出 `TypeError`。

你可以通过其 [`detached`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/detached) 属性来检查 `ArrayBuffer` 是否已分离。

## [构造函数](#构造函数)

[`ArrayBuffer()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/ArrayBuffer)

创建一个新的 `ArrayBuffer` 对象。

## [静态属性](#静态属性)

[`ArrayBuffer[Symbol.species]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/Symbol.species)

用于创建派生对象的构造函数。

## [静态方法](#静态方法)

[`ArrayBuffer.isView()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView)

如果 `arg` 是 ArrayBuffer 视图之一，则返回 `true`，例如[类型化数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)或者 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)。否则返回 `false`。

## [实例属性](#实例属性)

这些属性在 `ArrayBuffer.prototype` 上定义，并由所有 `ArrayBuffer` 实例共享。

[`ArrayBuffer.prototype.byteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/byteLength)

`ArrayBuffer` 的大小，以字节为单位。它在构造时确定，并且只有在 `ArrayBuffer` 可调整大小的情况下才能通过 [`ArrayBuffer.prototype.resize()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/resize) 方法进行改变。

[`ArrayBuffer.prototype.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

创建实例对象的构造函数。对于 `ArrayBuffer` 实例，初始值为 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/ArrayBuffer) 构造函数。

[`ArrayBuffer.prototype.detached`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/detached)

只读。如果 `ArrayBuffer` 已分离（传输），则返回 `true`，否则返回 `false`。

[`ArrayBuffer.prototype.maxByteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/maxByteLength)

只读，`ArrayBuffer` 可以调整到的最大字节长度。它在构造时确定，并且无法更改。

[`ArrayBuffer.prototype.resizable`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/resizable)

只读。如果 `ArrayBuffer` 可调整大小，则返回 `true`，否则返回 `false`。

[`ArrayBuffer.prototype[Symbol.toStringTag]`](#arraybuffer.prototypesymbol.tostringtag)

[`[Symbol.toStringTag]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性的初始值是字符串 `"ArrayBuffer"`。它用于 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)。

## [实例方法](#实例方法)

[`ArrayBuffer.prototype.resize()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/resize)

将 `ArrayBuffer` 调整为指定大小，以字节为单位。

[`ArrayBuffer.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/slice)

返回一个新的 `ArrayBuffer` 对象，其内容是从 `begin`（包含）到 `end`（不包含）的 `ArrayBuffer` 的字节内容的副本。如果 `begin` 或 `end` 为负数，则它将从数组的末尾开始计算索引，而非从数组的开头。

[`ArrayBuffer.prototype.transfer()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/transfer)

创建一个新的 `ArrayBuffer` 对象，其内容是与此缓冲区相同的字节内容，然后分离此缓冲区。

[`ArrayBuffer.prototype.transferToFixedLength()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/transferToFixedLength)

创建一个新的不可调整大小的 `ArrayBuffer` 对象，其内容与此缓冲区相同，然后分离此缓冲区。

## [示例](#示例)

### [创建 ArrayBuffer](#创建_arraybuffer)

下面的例子创建了一个 8 字节的缓冲区，并使用 [`Int32Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int32Array) 视图引用它。

js

```
const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-arraybuffer-objects](https://tc39.es/ecma262/multipage/structured-data.html#sec-arraybuffer-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`core-js` 中 `ArrayBuffer` 的 polyfill](https://github.com/zloirock/core-js#ecmascript-typed-arrays "外部链接（在新标签页中打开）")
-   [JavaScript 类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Typed_arrays)
-   [`SharedArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)
-   [RangeError: invalid array length](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Errors/Invalid_array_length)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/contributors.txt)更新。
