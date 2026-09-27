* * *

此模块包含一些能以二进制格式来读写 Python 值的函数。 这种格式是 Python 专属的，但是独立于特定的机器架构（即你可以在一台 PC 上写入某个 Python 值，将文件传到一台 Mac 上并在那里读取它）。 这种格式的细节有意不带文档说明；它可能在不同 Python 版本之间发生改变（但这种情况极少发生）。[\[1\]](#id2)

这不是一个通用的“持久化”模块。 对于通用的持久化以及通过 RPC 调用传递 Python 对象，请参阅 [`pickle`](https://docs.python.org/zh-cn/3/library/pickle.html#module-pickle "pickle: Convert Python objects to streams of bytes and back.") 和 [`shelve`](https://docs.python.org/zh-cn/3/library/shelve.html#module-shelve "shelve: Python object persistence.") 等模块。 `marshal` 模块的存在主要是为了支持读写 Python 模块的 `.pyc` 文件形式的“伪编译”代码。 因此，Python 维护者保留在必要时以不向下兼容的方式修改 marshal 格式的权利。 代码对象的格式在 Python 版本之间不保证兼容，即使格式的版本是相同的。 在不正确的 Python 版本中反序列化代码对象是未定义的行为。 如果你要序列化和反序列化 Python 对象，请改用 `pickle` 模块 —— 具有类似的性能，保证版本独立性，并且 pickle 还支持比 marshal 更丰富种类的对象。

警告

The `marshal` 模块对于错误或恶意构建的数据来说是不安全的。 永远不要 unmarshal 来自不受信任的或未经验证的来源的数据。

有些函数可以读/写文件，还有些函数可以操作字节类对象。

并非所有 Python 对象类型都受支持；一般来说，只有其值独立于 Python 特定调用的对象才能被此模块写入和读取。支持以下类型：

-   数值类型：[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")、[`bool`](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")、[`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")、[`complex`](https://docs.python.org/zh-cn/3/builtins/functions.html#complex "complex")。
    
-   字符串 ([`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) 和 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")。 [字节型对象](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 如 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 被序列化为 `bytes`。
    
-   Containers: [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple"), [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list"), [`set`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#set "set"), [`frozenset`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#frozenset "frozenset"), and (since [`version`](#marshal.version "marshal.version") 5), [`slice`](https://docs.python.org/zh-cn/3/builtins/functions.html#slice "slice"). It should be understood that these are supported only if the values contained therein are themselves supported. Recursive containers are supported since `version` 3.
    
-   单例：[`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")、 [`Ellipsis`](https://docs.python.org/zh-cn/3/builtins/constants.html#Ellipsis "Ellipsis") 和 [`StopIteration`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#StopIteration "StopIteration")。
    
-   [`code`](https://docs.python.org/zh-cn/3/library/code.html#module-code "code: Facilities to implement read-eval-print loops.") 对象，如果 _allow\_code_ 为真值。 请参阅上面关于版本依赖性的说明。
    

在 3.4 版本发生变更:

-   增加了格式版本3，支持序列化递归列表、集合和字典。
    
-   增加了格式版本4，支持短字符串的有效表示。
    

在 3.14 版本发生变更: 增加了格式版本5，支持切片。

这个模块定义了以下函数：

marshal.dump(_value_, _file_, _version\=version_, _/_, _\*_, _allow\_code\=True_)[¶](#marshal.dump "Link to this definition")

向打开的文件写入值。 值必须为受支持的类型。 文件必须为可写的 [binary file](https://docs.python.org/zh-cn/3/glossary.html#term-binary-file)。

如果值具有（或其包含的对象具有）不受支持的类型，则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 异常 --- 但还是会向文件写入垃圾数据。 对象将不能使用 [`load()`](#marshal.load "marshal.load") 正确地重新读取。 [代码对象](https://docs.python.org/zh-cn/3/reference/datamodel.html#code-objects) 仅在 _allow\_code_ 为真值时受到支持。

_version_ 参数指明 `dump` 应当使用的数据格式（见下文）。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `marshal.dumps` 并附带参数 `value`, `version`。

在 3.13 版本发生变更: 增加了 _allow\_code_ 形参。

marshal.load(_file_, _/_, _\*_, _allow\_code\=True_)[¶](#marshal.load "Link to this definition")

从打开的文件读取一个值并返回它。 如果没有读取到有效的值（例如由于数据具有来自不同 Python 版本的不兼容的 marshal 格式），则会引发 [`EOFError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#EOFError "EOFError"), [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 或 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。 [代码对象](https://docs.python.org/zh-cn/3/reference/datamodel.html#code-objects) 仅在 _allow\_code_ 为真值时受到支持。 文件必须为可读的 [binary file](https://docs.python.org/zh-cn/3/glossary.html#term-binary-file)。

引发一个不带参数的 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `marshal.load`。

备注

如果通过 [`dump()`](#marshal.dump "marshal.dump") marshal 了一个包含不受支持类型的对象，[`load()`](#marshal.load "marshal.load") 将为不可 marshal 的类型替换 `None`。

在 3.10 版本发生变更: 此调用过去会为每个代码对象引发一个 `code.__new__` 审计事件。 现在它会为整个载入操作引发单个 `marshal.load` 事件。

在 3.13 版本发生变更: 增加了 _allow\_code_ 形参。

marshal.dumps(_value_, _version\=version_, _/_, _\*_, _allow\_code\=True_)[¶](#marshal.dumps "Link to this definition")

返回将通过 `dump(value, file)` 写入到文件的字节串对象。 值必须是受支持的类型。 如果值具有（或其包含的对象具有）不受支持的类型则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 异常。 [代码对象](https://docs.python.org/zh-cn/3/reference/datamodel.html#code-objects) 仅在 _allow\_code_ 为真值时受到支持。

_version_ 参数指明 `dumps` 应当使用的数据格式（见下文）。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `marshal.dumps` 并附带参数 `value`, `version`。

在 3.13 版本发生变更: 增加了 _allow\_code_ 形参。

marshal.loads(_bytes_, _/_, _\*_, _allow\_code\=True_)[¶](#marshal.loads "Link to this definition")

将 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 转换为一个值。 如果找不到有效的值，则会引发 [`EOFError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#EOFError "EOFError"), [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 或 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。 [代码对象](https://docs.python.org/zh-cn/3/reference/datamodel.html#code-objects) 仅在 _allow\_code_ 为真值时受支持。 输入的额外字节串会被忽略。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `marshal.loads` 并附带参数 `bytes`。

在 3.10 版本发生变更: 此调用过去会为每个代码对象引发一个 `code.__new__` 审计事件。 现在它会为整个载入操作引发单个 `marshal.loads` 事件。

在 3.13 版本发生变更: 增加了 _allow\_code_ 形参。

此外，还定义了以下常量：

marshal.version[¶](#marshal.version "Link to this definition")

指明该模块使用的格式。版本0是历史上的第一个版本；后续版本添加了新特性。通常，新版本在引入时就会成为默认版本。

| 
版本

 | 

起始可用版本

 | 

新的特性

 |
| --- | --- | --- |
| 

1

 | 

Python 2.4

 | 

共享驻留字符串

 |
| 

2

 | 

Python 2.5

 | 

浮点数的二进制表示

 |
| 

3

 | 

Python 3.4

 | 

支持对象实例化和递归

 |
| 

4

 | 

Python 3.4

 | 

短字符串的有效表示

 |
| 

5

 | 

Python 3.14

 | 

支持 [`slice`](https://docs.python.org/zh-cn/3/builtins/functions.html#slice "slice") 对象

 |

备注
