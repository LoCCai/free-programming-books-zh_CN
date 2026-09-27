* * *

此模块定义了一种对象类型，它可以紧凑地表示由基本值：字符、整数、浮点数组成的数组。数组属于可变的 [sequence](https://docs.python.org/zh-cn/3/glossary.html#term-sequence) 类型且其行为与列表非常相似，区别在于其中存储的对象类型是受约束的。具体类型是在对象创建时通过使用一个单字符 _类型码_ 来指定。 已定义的类型码如下：

| 
类型码

 | 

C 类型

 | 

Python 类型

 | 

最小字节数

 | 

备注

 |
| --- | --- | --- | --- | --- |
| 

`'b'`

 | 

signed char

 | 

int

 | 

1

 |  |
| 

`'B'`

 | 

unsigned char

 | 

int

 | 

1

 |  |
| 

`'u'`

 | 

wchar\_t

 | 

Unicode 字符

 | 

2

 | 

(1)

 |
| 

`'w'`

 | 

Py\_UCS4

 | 

Unicode 字符

 | 

4

 | 

(2)

 |
| 

`'h'`

 | 

signed short

 | 

int

 | 

2

 |  |
| 

`'H'`

 | 

unsigned short

 | 

int

 | 

2

 |  |
| 

`'i'`

 | 

signed int

 | 

int

 | 

2

 |  |
| 

`'I'`

 | 

unsigned int

 | 

int

 | 

2

 |  |
| 

`'l'`

 | 

signed long

 | 

int

 | 

4

 |  |
| 

`'L'`

 | 

unsigned long

 | 

int

 | 

4

 |  |
| 

`'q'`

 | 

signed long long

 | 

int

 | 

8

 |  |
| 

`'Q'`

 | 

unsigned long long

 | 

int

 | 

8

 |  |
| 

`'f'`

 | 

float

 | 

float

 | 

4

 |  |
| 

`'d'`

 | 

double

 | 

float

 | 

8

 |  |

备注：

1.  可能为 16 位或 32 位，取决于具体的平台。
    
    在 3.9 版本发生变更: `array('u')` 现在使用 `wchar_t` 作为 C 类型而不是已不建议使用的 `Py_UNICODE`。这个改变不会影响其行为，因为 `Py_UNICODE` 自 Python 3.3 起就是 `wchar_t` 的别名。
    
    从 3.3 版起已弃用，将在 3.16 版中移除: 请迁移到 `'w'` 类型码。
    
2.  Added in version 3.13.
    

参见

The [ctypes](https://docs.python.org/zh-cn/3/library/ctypes.html#ctypes-fundamental-data-types) and [struct](https://docs.python.org/zh-cn/3/library/struct.html#format-characters) modules, as well as third-party modules like [numpy](https://numpy.org/doc/stable/reference/arrays.interface.html#object.__array_interface__), use similar -- but slightly different -- type codes.

值的实际表示是由机器架构（严格说是由 C 实现）决定的。实际大小可以通过 [`array.itemsize`](#array.array.itemsize "array.array.itemsize") 属性来访问。

此模块定义了以下项目：

array.typecodes[¶](#array.typecodes "Link to this definition")

一个由所有可用的类型码组成的字符串。

此模块定义了以下类型：

_class_ array.array(_typecode_\[, _initializer_\])[¶](#array.array "Link to this definition")

一个由 _typecode_ 限定其条目的新数组，并能根据可选的 _initializer_ 值来初始化。_initializer_ 必须是 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 或 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 对象、Unicode 字符串或元素类型合适的可迭代对象。

如果给定了一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 或 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 对象，则将 _initializer_ 传给新数组的 [`frombytes()`](#array.array.frombytes "array.array.frombytes") 方法；如果给定了一个 Unicode 字符串，则将 _initializer_ 传给 [`fromunicode()`](#array.array.fromunicode "array.array.fromunicode") 方法；在其他情况下，则将 _initializer_ 的迭代器传给 [`extend()`](#array.array.extend "array.array.extend") 方法以向数组添加初始条目。

数组对象支持普通的 [可变](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#typesseq-mutable) [sequence](https://docs.python.org/zh-cn/3/glossary.html#term-sequence) 操作如索引、切片、拼接和重复等。 当使用切片赋值时，所赋的值必须为具有相同类型码的数组对象；在所有其他情况下，都将引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。 数组对象还实现了缓冲区接口，可以被用于所有支持 [字节型对象](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 的场合。

Array 是对应其内容类型的 [泛型](https://docs.python.org/zh-cn/3/library/typing.html#generics) 对象。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `array.__new__` 并附带参数 `typecode`, `initializer`.

typecode[¶](#array.array.typecode "Link to this definition")

在创建数组时使用的类型码字符。

itemsize[¶](#array.array.itemsize "Link to this definition")

内部表示中，单个数组项的长度。单位为字节。

append(_value_, _/_)[¶](#array.array.append "Link to this definition")

Append a new item with the specified value to the end of the array.

buffer\_info()[¶](#array.array.buffer_info "Link to this definition")

返回一个元组 `(address, length)` 给出存放数组内容的内存缓冲区的当前地址和长度（以元素个数为单位）。以字节为单位的内存缓冲区大小可通过 `array.buffer_info()[1] * array.itemsize` 来计算。工作在需要内存地址的底层（因此天然地不够安全）的 I/O 接口上时，这有时会有用，例如某些 `ioctl()` 操作。只要数组还存在，并且没有对其应用过改变长度的操作，则返回的数值就是有效的。

备注

只有在使用以 C 或 C++ 编写的代码中的数组对象时，才能有效利用该信息，但此时，更合理的是，使用数组对象支持的缓冲区接口。因此，该方法的存在仅仅是为了向后兼容性，应避免在新代码中使用。缓冲区接口的文档参见 [缓冲协议](https://docs.python.org/zh-cn/3/c-api/buffer.html#bufferobjects).

byteswap()[¶](#array.array.byteswap "Link to this definition")

“字节对调”所有数组项。此方法只支持大小为 1, 2, 4 或 8 字节的值；对于其它类型的值将引发 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")。当要从另一种字节顺序的机器生成的文件中读取数据时，它很有用。

count(_value_, _/_)[¶](#array.array.count "Link to this definition")

Return the number of occurrences of _value_ in the array.

extend(_iterable_, _/_)[¶](#array.array.extend "Link to this definition")

将来自 _iterable_ 的项添加到数组末尾。如果 _iterable_ 是另一个数组，它必须具有 _完全_ 相同的类型码；否则将引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。如果 _iterable_ 不是一个数组，则它必须为可迭代对象且其元素的类型须为可添加到数组的适当类型。

frombytes(_buffer_, _/_)[¶](#array.array.frombytes "Link to this definition")

添加来自 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 的条目，将其内容解读为由机器值组成的数组（就像是使用 [`fromfile()`](#array.array.fromfile "array.array.fromfile") 方法从文件中读取内容一样）。

Added in version 3.2: `fromstring()` 被重命名为含义更准确的 [`frombytes()`](#array.array.frombytes "array.array.frombytes")。

fromfile(_f_, _n_, _/_)[¶](#array.array.fromfile "Link to this definition")

从 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) _f_ 中读取 _n_ 项（视为机器值）并将它们添加到数组末尾。如果可用的项少于 _n_ 项，则会引发 [`EOFError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#EOFError "EOFError")，但可用的项仍然会被加进数组。

fromlist(_list_, _/_)[¶](#array.array.fromlist "Link to this definition")

将来自列表的项添加到数组末尾。等价于 `for x in list: a.append(x)`，而不同之处在于，若发生类型错误，数组则不会被改变。

fromunicode(_ustr_, _/_)[¶](#array.array.fromunicode "Link to this definition")

使用来自给定的 Unicode 字符串的数据扩展该数组。该数组的类型码必须为 `'u'` 或 `'w'`；否则将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。请使用 `array.frombytes(unicodestring.encode(enc))` 将 Unicode 数据添加到其他类型的数组。

index(_value_\[, _start_\[, _stop_\]\])[¶](#array.array.index "Link to this definition")

Return the smallest _i_ such that _i_ is the index of the first occurrence of _value_ in the array. The optional arguments _start_ and _stop_ can be specified to search for _value_ within a subsection of the array. Raise [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") if _value_ is not found.

在 3.10 版本发生变更: 添加了可选的 _start_ 和 _stop_ 形参。

insert(_index_, _value_, _/_)[¶](#array.array.insert "Link to this definition")

Insert a new item _value_ in the array before position _index_. Negative values are treated as being relative to the end of the array.

pop(_index\=\-1_, _/_)[¶](#array.array.pop "Link to this definition")

从数组中移除下标为 _i_ 的项并将其返回。可选参数默认值为 `-1`，因此默认移除并返回末项。

remove(_value_, _/_)[¶](#array.array.remove "Link to this definition")

从数组中移除第一个出现的 _value_。

clear()[¶](#array.array.clear "Link to this definition")

从数组中移除所有元素。

Added in version 3.13.

reverse()[¶](#array.array.reverse "Link to this definition")

反转数组中各项的顺序。

tobytes()[¶](#array.array.tobytes "Link to this definition")

将数组转换为一个由机器值组成的数组并返回其字节表示（和用 [`tofile()`](#array.array.tofile "array.array.tofile") 方法写入文件的字节序列相同）。

Added in version 3.2: `tostring()` 被重命名为含义更准确的 [`tobytes()`](#array.array.tobytes "array.array.tobytes")。

tofile(_f_, _/_)[¶](#array.array.tofile "Link to this definition")

将所有项（作为机器值）写入 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) _f_。

tolist()[¶](#array.array.tolist "Link to this definition")

将数组转换为由相同的项组成的普通列表。

tounicode()[¶](#array.array.tounicode "Link to this definition")

将数组转换为一个 Unicode 字符串。数组的类型必须为 `'u'` 或 `'w'`；否则将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。 请使用 `array.tobytes().decode(enc)` 来从其他类型的数组获取 Unicode 字符串。

数组对象的字符串表示形式是 `array(typecode, initializer)`。如果数组为空则 _initializer_ 将被省略，否则如果 _typecode_ 为 `'u'` 或 `'w'` 则为 Unicode 字符串，否则为由数字组成的列表。只要 [`array`](#array.array "array.array") 类是使用 `from array import array` 导入的，该字符串表示形式就保证能使用 [`eval()`](https://docs.python.org/zh-cn/3/builtins/functions.html#eval "eval") 转换回具有相同类型和值的数组。如果它包含相应的浮点数值则还必须定义变量 `inf` 和 `nan`。例如:

array('l')
array('w', 'hello \\u2641')
array('l', \[1, 2, 3, 4, 5\])
array('d', \[1.0, 2.0, 3.14, \-inf, nan\])
