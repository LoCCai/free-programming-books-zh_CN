**源代码:** [Lib/plistlib.py](https://github.com/python/cpython/tree/3.14/Lib/plistlib.py)

* * *

此模块提供了可读写 Apple "property list" 文件的接口，它主要用于 macOS 和 iOS 系统。 此模块同时支持二进制和 XML plist 文件。

The property list (`.plist`) file format is a simple serialization supporting basic object types, like dictionaries, lists, numbers and strings. Usually the top level object is a dictionary.

要写入和解析 plist 文件，请使用 [`dump()`](#plistlib.dump "plistlib.dump") 和 [`load()`](#plistlib.load "plistlib.load") 函数。

要以字节串或字符串对象形式操作 plist 数据，请使用 [`dumps()`](#plistlib.dumps "plistlib.dumps") 和 [`loads()`](#plistlib.loads "plistlib.loads")。

值可以为字符串、整数、浮点数、布尔值、元组、列表、字典（但只允许用字符串作为键）、[`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")、[`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 或 [`datetime.datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.datetime "datetime.datetime") 对象。

在 3.4 版本发生变更: 新版 API，旧版 API 已被弃用。 添加了对二进制 plist 格式的支持。

在 3.8 版本发生变更: 添加了在二进制 plist 中读写 [`UID`](#plistlib.UID "plistlib.UID") 令牌的支持，例如用于 NSKeyedArchiver 和 NSKeyedUnarchiver。

在 3.9 版本发生变更: 旧 API 已被移除。

这个模块定义了以下函数：

plistlib.load(_fp_, _\*_, _fmt\=None_, _dict\_type\=dict_, _aware\_datetime\=False_)[¶](#plistlib.load "Link to this definition")

读取 plist 文件。 _fp_ 应当可读并且为二进制文件对象。 返回已解包的根对象（通常是一个字典）。

_fmt_ 为文件的格式，有效的值如下:

-   [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None"): 自动检测文件格式
    
-   [`FMT_XML`](#plistlib.FMT_XML "plistlib.FMT_XML"): XML 文件格式
    
-   [`FMT_BINARY`](#plistlib.FMT_BINARY "plistlib.FMT_BINARY"): 二进制 plist 格式
    

_dict\_type_ 为从 plist 文件读取的字典所使用的类型。

当 _aware\_datetime_ 为真值时，类型为 `datetime.datetime` 的字段将被创建为 [感知型对象](https://docs.python.org/zh-cn/3/library/datetime.html#datetime-naive-aware)，其 `tzinfo` 将设为 [`datetime.UTC`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.UTC "datetime.UTC")。

[`FMT_XML`](#plistlib.FMT_XML "plistlib.FMT_XML") 格式的 XML 数据 会使用来自 [`xml.parsers.expat`](https://docs.python.org/zh-cn/3/library/pyexpat.html#module-xml.parsers.expat "xml.parsers.expat: An interface to the Expat non-validating XML parser.") 的 Expat 解析器 -- 请参阅其文档了解错误格式 XML 可能引发的异常。 未知元素将被 plist 解析器直接略过。

当文件无法被解析时解析器将引发 [`InvalidFileException`](#plistlib.InvalidFileException "plistlib.InvalidFileException")。

Added in version 3.4.

在 3.13 版本发生变更: 增加了仅限关键字形参 _aware\_datetime_。

plistlib.loads(_data_, _\*_, _fmt\=None_, _dict\_type\=dict_, _aware\_datetime\=False_)[¶](#plistlib.loads "Link to this definition")

从一个字节串或字符串对象加载 plist。 请参阅 [`load()`](#plistlib.load "plistlib.load") 获取相应关键字参数的说明。

Added in version 3.4.

在 3.13 版本发生变更: 当 _fmt_ 等于 [`FMT_XML`](#plistlib.FMT_XML "plistlib.FMT_XML") 时 _data_ 可以为字符串。

plistlib.dump(_value_, _fp_, _\*_, _fmt\=FMT\_XML_, _sort\_keys\=True_, _skipkeys\=False_, _aware\_datetime\=False_)[¶](#plistlib.dump "Link to this definition")

将 _value_ 写入 plist 文件。 _fp_ 应当是一个可写的二进制文件对象。

_fmt_ 参数指定 plist 文件的格式，可以是以下值之一:

-   [`FMT_XML`](#plistlib.FMT_XML "plistlib.FMT_XML"): XML 格式的 plist 文件
    
-   [`FMT_BINARY`](#plistlib.FMT_BINARY "plistlib.FMT_BINARY"): 二进制格式的 plist 文件
    

当 _sort\_keys_ 为真值（默认）时字典的键将经过排序再写入 plist，否则将按字典的迭代顺序写入。

当 _skipkeys_ 为假值（默认）时该函数将在字典的键不为字符串时引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")，否则将跳过这样的键。

当 _aware\_datetime_ 为真值并且有任何类型为 `datetime.datetime` 的字段被设为 [感知型对象](https://docs.python.org/zh-cn/3/library/datetime.html#datetime-naive-aware)，它将在写入之前转换为 UTC 时区。

如果对象是不受支持的类型或者是包含不受支持类型的对象的容器则将引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。

对于无法在（二进制）plist 文件中表示的整数值，将会引发 [`OverflowError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OverflowError "OverflowError")。

Added in version 3.4.

在 3.13 版本发生变更: 增加了仅限关键字形参 _aware\_datetime_。

plistlib.dumps(_value_, _\*_, _fmt\=FMT\_XML_, _sort\_keys\=True_, _skipkeys\=False_, _aware\_datetime\=False_)[¶](#plistlib.dumps "Link to this definition")

将 _value_ 以 plist 格式字节串对象的形式返回。 参阅 [`dump()`](#plistlib.dump "plistlib.dump") 的文档获取此函数的关键字参数的说明。

Added in version 3.4.

可以使用以下的类:

_class_ plistlib.UID(_data_)[¶](#plistlib.UID "Link to this definition")

包装一个 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")。 该类将在读取或写入 NSKeyedArchiver 编码的数据时被使用，其中包含 UID（参见 PList 指南）。

data[¶](#plistlib.UID.data "Link to this definition")

UID 的整数值。 它必须在 `0 <= data < 2**64` 范围内。

Added in version 3.8.

可以使用以下的常量:

plistlib.FMT\_XML[¶](#plistlib.FMT_XML "Link to this definition")

用于 plist 文件的 XML 格式。

Added in version 3.4.

plistlib.FMT\_BINARY[¶](#plistlib.FMT_BINARY "Link to this definition")

用于 plist 文件的二进制格式。

Added in version 3.4.

此模块定义了下列异常：

_exception_ plistlib.InvalidFileException[¶](#plistlib.InvalidFileException "Link to this definition")

当文件无法被解析时将被引发。

Added in version 3.4.

## 例子[¶](#examples "Link to this heading")

生成一个 plist:

import datetime as dt
import plistlib

pl \= dict(
    aString \= "Doodah",
    aList \= \["A", "B", 12, 32.1, \[1, 2, 3\]\],
    aFloat \= 0.1,
    anInt \= 728,
    aDict \= dict(
        anotherString \= "<hello & hi there!>",
        aThirdString \= "M\\xe4ssig, Ma\\xdf",
        aTrueValue \= True,
        aFalseValue \= False,
    ),
    someData \= b"<binary gunk>",
    someMoreData \= b"<lots of binary gunk>" \* 10,
    aDate \= dt.datetime.now()
)
print(plistlib.dumps(pl).decode())

解析一个 plist:

import plistlib

plist \= b"""<plist version="1.0">
<dict>
    <key>foo</key>
    <string>bar</string>
</dict>
</plist>"""
pl \= plistlib.loads(plist)
print(pl\["foo"\])
