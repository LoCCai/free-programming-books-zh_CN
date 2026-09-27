## [尝试一下](#尝试一下)

```
// Create a TypedArray with a size in bytes
const typedArray1 = new Int8Array(8);
typedArray1[0] = 32;

const typedArray2 = new Int8Array(typedArray1);
typedArray2[1] = 42;

console.log(typedArray1);
// Expected output: Int8Array [32, 0, 0, 0, 0, 0, 0, 0]

console.log(typedArray2);
// Expected output: Int8Array [32, 42, 0, 0, 0, 0, 0, 0]
```

## [描述](#描述)

`TypedArray` 构造函数（通常归类为 `%TypedArray%`，表示它的“内在性”，因为它与任何 JavaScript 程序暴露出的全局对象不对应）是所有 `TypedArray` 子类的通用父类。将 `%TypedArray%` 作为一个“抽象类”，其为所有类型化数组的子类提供了实用方法的通用接口。该构造函数没有直接暴露：没有全局的 `TypedArray` 属性。它只能通过`Object.getPrototypeOf(Int8Array)` 及类似方式访问。

当创建 `TypedArray` 子类（例如 `Int8Array`）的实例时，在内存的中会创建数组缓冲区，或者，如果将 `ArrayBuffer` 对象作为构造参数，则使用该 `ArrayBuffer`。缓冲区地址被保存为实例的内部属性并且所有的 `%TypedArray%.prototype` 方法都将基于数组缓冲区地址设置和获取值。

### [TypedArray 对象](#typedarray_对象)

| 类型 | 值范围 | 字节大小 | 描述 | Web IDL 类型 | 等价的 C 类型 |
| --- | --- | --- | --- | --- | --- |
| [`Int8Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int8Array) | \-128 到 127 | 1 | 8 位有符号整型（补码） | `byte` | `int8_t` |
| [`Uint8Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | 0 到 255 | 1 | 8 位无符号整型 | `octet` | `uint8_t` |
| [`Uint8ClampedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray) | 0 到 255 | 1 | 8 位无符号整型（一定在 0 到 255 之间） | `octet` | `uint8_t` |
| [`Int16Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int16Array) | \-32768 到 32767 | 2 | 16 位有符号整型（补码） | `short` | `int16_t` |
| [`Uint16Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint16Array) | 0 到 65535 | 2 | 16 位无符号整型 | `unsigned short` | `uint16_t` |
| [`Int32Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int32Array) | \-2147483648 到 2147483647 | 4 | 32 位有符号整型（补码） | `long` | `int32_t` |
| [`Uint32Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint32Array) | 0 到 4294967295 | 4 | 32 位无符号整型 | `unsigned long` | `uint32_t` |
| [`Float32Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Float32Array) | `-3.4E38` 到 `3.4E38` 并且 `1.2E-38` 是最小的正数 | 4 | 32 位 IEEE 浮点数（7 位有效数字，例如 `1.234567`） | `unrestricted float` | `float` |
| [`Float64Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Float64Array) | `-1.8E308` 到 `1.8E308` 并且 `5E-324` 是最小的正数 | 8 | 64 位 IEEE 浮点数（16 位有效数字，例如 `1.23456789012345`） | `unrestricted double` | `double` |
| [`BigInt64Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array) | \-263 到 263 - 1 | 8 | 64 位有符号整型（补码） | `bigint` | `int64_t (signed long long)` |
| [`BigUint64Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array) | 0 到 264 - 1 | 8 | 64 位无符号整型 | `bigint` | `uint64_t (unsigned long long)` |

### [值编码与标准化](#值编码与标准化)

所有的类型化数组都是基于 `ArrayBuffer` 进行操作的，你可以借此观察到每个元素的确切字节表示，因此二进制格式中的数字编码方式具有重要意义。

-   无符号整数数组（`Uint8Array`、`Uint16Array`、`Uint32Array` 和 `BigUint64Array`）直接以二进制形式存储数字。
-   有符号整数数组（`Int8Array`、`Int16Array`、`Int32Array` 和 `BigInt64Array`）使用[二进制补码](https://zh.wikipedia.org/zh-cn/二補數 "外部链接（在新标签页中打开）")存储数字。
-   浮点数组（`Float32Array` 和 `Float64Array`）使用 [IEEE 754](https://zh.wikipedia.org/zh-cn/IEEE_754 "外部链接（在新标签页中打开）")浮点格式存储数字。[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#number_%E7%BC%96%E7%A0%81) 参考文档中有关于确切格式的更多信息。JavaScript 数字默认使用双精度浮点格式，这与 `Float64Array` 相同。`Float32Array` 将 23（而不是 52）位用于尾数，以及 8（而不是 11）位用于指数。请注意，规范要求所有的 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 值使用相同的位编码，但确切的位模式取决于实现。
-   `Uint8ClampedArray` 是一种特殊情况。它像 `Uint8Array` 一样以二进制形式存储数字，但是当你存储超出范围的数字时，它会将数字_钳制_（clamp）到 0 到 255 的范围内，而不是截断最高有效位。

除了 `Int8Array`、`Uint8Array` 和 `Uint8ClampedArray` 以外的其他类型数组都将每个元素存储为多个字节。这些字节可以按照从最高有效位到最低有效位（大端序）或从最低有效位到最高有效位（小端序）的顺序进行排序。请参阅[字节序](https://developer.mozilla.org/zh-CN/docs/Glossary/Endianness)以了解更多。类型化数组始终使用平台的本机字节顺序。如果要在缓冲区中写入和读取时指定字节顺序，应该使用 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)。

当向这些类型化数组写入时，超出可表示范围的值将被标准化。

-   所有整数数组（`Uint8ClampedArray` 除外）都使用[固定宽度数值转换](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number#%E5%9B%BA%E5%AE%9A%E5%AE%BD%E5%BA%A6%E6%95%B0%E5%80%BC%E8%BD%AC%E6%8D%A2)，首先截断数字的小数部分，然后取最低位。
-   `Uint8ClampedArray` 首先将数字钳制到 0 到 255 的范围内（大于 255 的值变为 255，小于 0 的值变为 0），然后使用银行家舍入法将结果_四舍五入_（而非向下取整）到最近的整数，也就是说，如果数字恰好在两个整数之间，它将四舍五入到最近的偶数。例如，`0.5` 变为 `0`，`1.5` 变为 `2`，`2.5` 变为 `2`。
-   `Float32Array` 使用“银行家舍入法”将 64 位浮点数转换为 32 位。这与 [`Math.fround()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/fround) 提供的算法相同。

### [底层为可变大小缓冲时的行为](#底层为可变大小缓冲时的行为)

当一个 `TypedArray` 被创建为一个[可变大小缓冲](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer#%E8%B0%83%E6%95%B4_arraybuffer_%E7%9A%84%E5%A4%A7%E5%B0%8F)的视图时，改变底层缓冲的大小会对 `TypedArray` 的大小产生不同的影响，这取决于 `TypedArray` 是否是长度跟踪的。

如果一个类型化数组是通过省略或传递 `undefined` 给第三个参数来创建的，那么它将_跟踪长度_，并且将自动调整大小以适应底层 `buffer` 的大小：

js

```
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
const float32 = new Float32Array(buffer);

console.log(float32.byteLength); // 8
console.log(float32.length); // 2

buffer.resize(12);

console.log(float32.byteLength); // 12
console.log(float32.length); // 3
```

如果一个类型化数组是通过使用第三个 `length` 参数指定大小创建时，则它的大小不会随着 `buffer` 大小的增长而改变：

js

```
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
const float32 = new Float32Array(buffer, 0, 2);

console.log(float32.byteLength); // 8
console.log(float32.length); // 2
console.log(float32[0]); // 0, 初始值

buffer.resize(12);

console.log(float32.byteLength); // 8
console.log(float32.length); // 2
console.log(float32[0]); // 0, 初始值
```

当 `buffer` 缩小时，其上的类型化数组可能会超出范围，在这种情况下，类型化数组的观测大小将减少为 0。这是非长度跟踪类型化数组唯一可能改变长度的情况。

js

```
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
const float32 = new Float32Array(buffer, 0, 2);

buffer.resize(7);

console.log(float32.byteLength); // 0
console.log(float32.length); // 0
console.log(float32[0]); // undefined
```

如果你随后再次增长 `buffer` 以使类型化数组回到范围内，类型化数组的大小将恢复到其原始值。

js

```
buffer.resize(8);

console.log(float32.byteLength); // 8
console.log(float32.length); // 2
console.log(float32[0]); // 0 - 又回到范围内了！
```

对于长度跟踪的类型化数组，如果 `buffer` 被缩小到小于 `byteOffset`，也会发生同样的事情。

js

```
const buffer = new ArrayBuffer(8, { maxByteLength: 16 });
const float32 = new Float32Array(buffer, 4);
// float32 是长度跟踪的，但它只从第 4 个字节开始，直到缓冲的结尾，
// 所以如果缓冲被缩小到小于 4 个字节，类型化数组就将超出范围
buffer.resize(3);
console.log(float32.byteLength); // 0
```

## [构造函数](#构造函数)

该对象不能被直接实例化——试图去使用 `new` 构造它将会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

js

```
new (Object.getPrototypeOf(Int8Array))();
// TypeError: Abstract class TypedArray not directly constructable
```

但是，你可以使用一个指定的类型化数组创建实例，例如 [`Int8Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int8Array) 或 [`BigInt64Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array)。这些对象的构造函数是通用的：

js

```
new TypedArray()
new TypedArray(length)
new TypedArray(typedArray)
new TypedArray(object)

new TypedArray(buffer)
new TypedArray(buffer, byteOffset)
new TypedArray(buffer, byteOffset, length)
```

其中，`TypedArray` 是一个具体的构造函数。

**备注：**所有 `TypedArray` 子类的构造函数只能使用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 构造。试图在没有 `new` 的情况下调用，会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。

### [参数](#参数)

[`typedArray`](#typedarray)

当使用 `TypedArray` 子类的实例调用时，`typedArray` 会被拷贝到一个新的类型数组中。对于非 [bigint](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) `TypeedArray` 构造函数，`typedArray` 参数仅可以是非 [bigint](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 类型（例如 [`Int32Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int32Array)）。同样，对于 [bigint](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) `TypedArray` 构造函数（[`BigInt64Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt64Array) 或 [`BigUint64Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigUint64Array)），`typedArray` 参数仅可以是 [bigint](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 类型。`typedArray` 中的每个值在拷贝到新数组之前都转换为构造函数的相应类型。新的类型化数组的长度与 `typedArray` 参数的长度相同。

[`object`](#object)

当使用的不是 `TypedArray` 实例的对象调用时，将以与 [`TypedArray.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from) 方法相同的方式创建一个新的类型化数组。

[`length` 可选](#length)

当使用非对象调用时，该参数将被视为指定类型化数组长度的数字。在内存中创建一个内部数组缓冲区，大小长度乘以 [`BYTES_PER_ELEMENT`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT) 字节，用 0 填充。省略所有参数，等同于使用 `0` 作为参数。

[`buffer`、`byteOffset` 可选、`length` 可选](#buffer)

当使用 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 或 [`SharedArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) 实例以及可选的 `byteOffset` 和 `length` 参数调用时，将创建一个新的指定缓冲区的类型化数组视图。`byteOffset` 和 `length` 参数指定类型化数组视图将暴露的内存范围。如果忽略这两个参数，则是整个视图的所有 `buffer`；如果仅忽略 `length`，则是从 `byteOffset` 开始的 `buffer` 剩余部分的视图。

### [异常](#异常)

所有 `TypeArray` 子类构造函数都以相同的方式运行。它们都会抛出以下异常：

[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)

抛出以下情况之一：

-   传递 `typedArray`，但它是 [bigint](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 类型，而当前构造函数不是，反之亦然。
-   传递 `typedArray`，但它的缓冲区被分离了，或者直接传递分离了视图的 `buffer`。

[`RangeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RangeError)

抛出以下情况之一：

-   新的类型化数组的长度太大。
-   `buffer` 的长度（如果 `length` 参数没有指定）或 `byteOffset` 不是新的类型化数组元素大小的整数倍。
-   `byteOffset` 不是有效的数组索引（0 和 253 - 1 之间的整数）。
-   当从一个缓冲区创建视图，边界在缓冲区之外。换句话说，`byteOffset + length * TypedArray.BYTES_PER_ELEMENT > buffer.byteLength`。

## [静态属性](#静态属性)

这些属性定义在 `TypedArray` 构造函数中，因此由所有 `TypedArray` 子类型共享。

[`TypedArray[Symbol.species]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/Symbol.species)

用于创建派生对象的构造函数。

所有 `TypedArray` 子类也有着以下静态属性：

[`TypedArray.BYTES_PER_ELEMENT`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT)

返回不同的 `TypedArray` 对象元素字节数的数值。

## [静态方法](#静态方法)

这些属性定义在 `TypedArray` 构造函数中，因此由所有 `TypedArray` 子类型共享。

[`TypedArray.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from)

从类数组或者可迭代对象创建新的 `TypedArray`。参见 [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)。

[`TypedArray.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of)

创建一个具有可变参数的 `TypedArray`。参见 [`Array.of()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)。

## [实例属性](#实例属性)

这些属性都是在 `TypedArray` 属性对象上定义的[访问器属性（getter）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get)，因此由所有 `TypedArray` 子类型共享。

[`TypedArray.prototype.buffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/buffer)

返回类型化数组引用的 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)。

[`TypedArray.prototype.byteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteLength)

返回类型化数组的长度（以字节为单位）。

[`TypedArray.prototype.byteOffset`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteOffset)

返回从类型化数组距离 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 起始位置的偏移量（以字节为单位）。

[`TypedArray.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/length)

返回类型化数组中保存的元素个数。

所有 `TypedArray` 子类也有以下实例属性：

[`TypedArray.prototype.BYTES_PER_ELEMENT`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT)

返回不同的 `TypedArray` 对象元素大小的数字值。

## [实例方法](#实例方法)

这些方法定义在 `TypedArray` 原型对象中，因此由所有 `TypedArray` 子类型共享。

[`TypedArray.prototype.at()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/at)

返回给定索引处的数组元素。接受从最后一项往回计算的负整数。

[`TypedArray.prototype.copyWithin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/copyWithin)

在数组内复制数组元素序列。参见 [`Array.prototype.copyWithin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)。

[`TypedArray.prototype.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/entries)

返回一个新的_数组迭代器_对象，其中包含数组中每个索引的键/值对。参见 [`Array.prototype.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)。

[`TypedArray.prototype.every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/every)

如果调用数组中的每个元素都满足测试函数，则返回 `true`。参见 [`Array.prototype.every()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)。

[`TypedArray.prototype.fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/fill)

用静态值填充数组中从开始索引到结束索引的所有元素。参见 [`Array.prototype.fill()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)。

[`TypedArray.prototype.filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/filter)

返回一个新数组，其中包含调用所提供的筛选函数返回为 `true` 的所有数组元素。参见 [`Array.prototype.filter()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)。

[`TypedArray.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/find)

返回数组中满足提供的测试函数的第一个元素的值，如果没有找到合适的元素，则返回 `undefined`。参见 [`Array.prototype.find()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)。

[`TypedArray.prototype.findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/findIndex)

返回数组中满足提供的测试函数的第一个元素的索引，如果没有找到合适的元素，则返回 `-1`。参见 [`Array.prototype.findIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)。

[`TypedArray.prototype.findLast()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/findLast)

回数组中满足提供的测试函数的最后一个元素的值，如果没有找到合适的元素，则返回 `undefined`。参见 [`Array.prototype.findLast()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast)。

[`TypedArray.prototype.findLastIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/findLastIndex)

返回数组中满足所提供测试函数的最后一个元素的索引，如果没有找到合适的元素，则返回 `-1`。参见 [`Array.prototype.findLastIndex()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex)。

[`TypedArray.prototype.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/forEach)

对调用数组中的每个元素调用函数。参见 [`Array.prototype.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)。

[`TypedArray.prototype.includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/includes)

根据类型化数组是否包含一个确定的元素，来决定返回 `true` 还是 `false` 参见 [`Array.prototype.includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)。

[`TypedArray.prototype.indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/indexOf)

返回在调用数组中可以找到给定元素的第一个（最小）索引，如果没有找到，则返回 `-1`。参见 [`Array.prototype.indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)。

[`TypedArray.prototype.join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/join)

将数组的所有元素连接为字符串。参见 [`Array.prototype.join()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)。

[`TypedArray.prototype.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/keys)

返回一个新的数组迭代器对象，该对象包含数组中每个索引的键。参见 [`Array.prototype.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)。

[`TypedArray.prototype.lastIndexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/lastIndexOf)

返回在调用数组中可以找到给定元素的最后一个（最大）索引，如果找不到，则返回 `-1`。参见 [`Array.prototype.lastIndexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)。

[`TypedArray.prototype.map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/map)

返回一个新数组，其中包含对调用数组中的每个元素调用函数的结果。参见 [`Array.prototype.map()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)。

[`TypedArray.prototype.reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduce)

对数组的每个元素（从左到右）执行用户提供的“reducer”回调函数，将其简化为单个值。参见 [`Array.prototype.reduce()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)。

[`TypedArray.prototype.reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduceRight)

对数组的每个元素（从右到左）执行用户提供的“reducer”回调函数，将其简化为单个值。参见 [`Array.prototype.reduceRight()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)。

[`TypedArray.prototype.reverse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reverse)

反转数组元素的顺序——第一个成为最后一个，最后一个成为第一个。参见 [`Array.prototype.reverse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)。

[`TypedArray.prototype.set()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set)

在类型化数组中存储多个值，从指定数组读取输入值。

[`TypedArray.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice)

提取调用数组的一部分并返回一个新数组。参见 [`Array.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)。

[`TypedArray.prototype.some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/some)

如果调用数组中至少有一个元素满足提供的测试函数，则返回 `true`。参见 [`Array.prototype.some()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)。

[`TypedArray.prototype.sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort)

对数组的元素进行排序并返回该数组。参见 [`Array.prototype.sort()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)。

[`TypedArray.prototype.subarray()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray)

从给定的开始和结束的元素索引返回一个新的 `TypedArray`。

[`TypedArray.prototype.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/values)

返回一个新的_数组迭代器_对象，该对象包含数组中每个索引的值。参见 [`Array.prototype.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values)。

[`TypedArray.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/toLocaleString)

返回一个表示调用数组及其元素的本地化字符串。参见 [`Array.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString)。

[`TypedArray.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/toString)

返回一个表示调用数组及其元素的字符串。参见 [`Array.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)。

[`TypedArray.prototype[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/Symbol.iterator)

返回一个新的_数组迭代器_对象，该对象包含数组中每个索引的值。

## [示例](#示例)

### [访问属性](#访问属性)

你可以使用标准数组索引语法（即使用括号符号）引用数组中的元素。但是，在类型数组上获取或设置索引属性不会在原型链中搜索此属性，即使索引已越界。索引属性将查询 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 并且永远不会查看对象属性。你仍然可以使用命名属性，就像所有对象一样。

js

```
// Setting and getting using standard array syntax
const int16 = new Int16Array(2);
int16[0] = 42;
console.log(int16[0]); // 42

// Indexed properties on prototypes are not consulted (Fx 25)
Int8Array.prototype[20] = "foo";
new Int8Array(32)[20]; // 0
// even when out of bound
Int8Array.prototype[20] = "foo";
new Int8Array(8)[20]; // undefined
// or with negative integers
Int8Array.prototype[-1] = "foo";
new Int8Array(8)[-1]; // undefined

// Named properties are allowed, though (Fx 30)
Int8Array.prototype.foo = "bar";
new Int8Array(32).foo; // "bar"
```

### [不能被冻结](#不能被冻结)

不是空的 `TypedArray` 不能被冻结，因为它们的底层 `ArrayBuffer` 可以通过缓冲区的另一个 `TypedArray` 视图进行变化。这意味着对象将从不会真正地冻结。

js

```
const i8 = Int8Array.of(1, 2, 3);
Object.freeze(i8);
// TypeError: Cannot freeze array buffer views with elements
```

### [byteOffset 必须对齐](#byteoffset_必须对齐)

当将 `TypedArray` 构建为 `ArrayBuffer` 的视图时，`byteOffset` 参数必须与其元素大小对齐；换句话说，偏移量必须是 `BYTES_PER_ELEMENT` 的倍数。

js

```
const i32 = new Int32Array(new ArrayBuffer(4), 1);
// RangeError: start offset of Int32Array should be a multiple of 4
```

js

```
const i32 = new Int32Array(new ArrayBuffer(4), 0);
```

### [byteLength 必须对齐](#bytelength_必须对齐)

类似于 `byteOffset` 参数，`ArrayBuffer` 传递给 `TypedArray` 构造函数的 `byteLength` 属性必须是构造函数 `BYTES_PER_ELEMENT` 的倍数。

js

```
const i32 = new Int32Array(new ArrayBuffer(3));
// RangeError: byte length of Int32Array should be a multiple of 4
```

js

```
const i32 = new Int32Array(new ArrayBuffer(4));
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-typedarray-objects](https://tc39.es/ecma262/multipage/indexed-collections.html#sec-typedarray-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`core-js` 中类型化数组的 polyfill](https://github.com/zloirock/core-js#ecmascript-typed-arrays "外部链接（在新标签页中打开）")
-   [JavaScript 类型化数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Typed_arrays)
-   [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
-   [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)
-   [TextDecoder](https://developer.mozilla.org/zh-CN/docs/Web/API/TextDecoder)——从数字数据中解码字符串的助手

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/contributors.txt)更新。
