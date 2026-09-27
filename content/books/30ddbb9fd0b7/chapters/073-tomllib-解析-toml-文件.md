Added in version 3.11.

**源代码：** [Lib/tomllib](https://github.com/python/cpython/tree/3.14/Lib/tomllib)

* * *

This module provides an interface for parsing TOML 1.0.0 (Tom's Obvious Minimal Language, [https://toml.io](https://toml.io/en/)). This module does not support writing TOML.

警告

在解析不受信任来源的数据时要小心谨慎。 恶意的 TOML 字符串可能导致解码器消耗大量 CPU 和内存资源。 建议对要解析的数据大小进行限制。

参见

[TOML Kit 包](https://pypi.org/project/tomlkit/) 是一个兼具读取和写入功能的保留样式的 TOML 库。 它是用于编辑现有 TOML 文件的本模块的推荐替代品。

这个模块定义了以下函数：

tomllib.load(_fp_, _/_, _\*_, _parse\_float\=float_)[¶](#tomllib.load "Link to this definition")

读取一个 TOML 文件。第一个参数应该是一个可读的二进制文件对象。返回 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict")。使用 [转换表](#toml-to-py-table) 将 TOML 类型转换为 Python。

对每个要解析的 TOML 浮点数字符串调用 _parse\_float_。 默认情况下，这相当于 `float(num_str)`。这可以用于为 TOML 浮点数使用另一种数据类型或解析器 (例如 [`decimal.Decimal`](https://docs.python.org/zh-cn/3/library/decimal.html#decimal.Decimal "decimal.Decimal"))。 可调用对象不能返回 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict") 或 [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list")，否则将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

对无效的 TOML 文档将引发 [`TOMLDecodeError`](#tomllib.TOMLDecodeError "tomllib.TOMLDecodeError")。

tomllib.loads(_s_, _/_, _\*_, _parse\_float\=float_)[¶](#tomllib.loads "Link to this definition")

从 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 对象中加载 TOML。返回 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict")。使用 [转换表](#toml-to-py-table) 将 TOML 类型转换为 Python类型。参数 _parse\_float_ 与 [`load()`](#tomllib.load "tomllib.load") 中的意义相同。

对无效的 TOML 文档将引发 [`TOMLDecodeError`](#tomllib.TOMLDecodeError "tomllib.TOMLDecodeError")。

有以下几种异常：

_exception_ tomllib.TOMLDecodeError(_msg_, _doc_, _pos_)[¶](#tomllib.TOMLDecodeError "Link to this definition")

拥有以下附加属性的 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 的子类：

msg[¶](#tomllib.TOMLDecodeError.msg "Link to this definition")

未格式化的错误消息。

doc[¶](#tomllib.TOMLDecodeError.doc "Link to this definition")

正在解析的 TOML 文档。

pos[¶](#tomllib.TOMLDecodeError.pos "Link to this definition")

_doc_ 解析失败的索引位置。

lineno[¶](#tomllib.TOMLDecodeError.lineno "Link to this definition")

The line corresponding to _pos_.

colno[¶](#tomllib.TOMLDecodeError.colno "Link to this definition")

The column corresponding to _pos_.

在 3.14 版本发生变更: 增加了 _msg_, _doc_ 和 _pos_ 形参。 增加了 [`msg`](#tomllib.TOMLDecodeError.msg "tomllib.TOMLDecodeError.msg"), [`doc`](#tomllib.TOMLDecodeError.doc "tomllib.TOMLDecodeError.doc"), [`pos`](#tomllib.TOMLDecodeError.pos "tomllib.TOMLDecodeError.pos"), [`lineno`](#tomllib.TOMLDecodeError.lineno "tomllib.TOMLDecodeError.lineno") 和 [`colno`](#tomllib.TOMLDecodeError.colno "tomllib.TOMLDecodeError.colno") 属性。

自 3.14 版本弃用: 传入自由形式的位置形参的做法已被弃用。

## 例子[¶](#examples "Link to this heading")

解析 TOML 文件:

import tomllib

with open("pyproject.toml", "rb") as f:
    data \= tomllib.load(f)

解析 TOML 字符串:

import tomllib

toml\_str \= """
python-version = "3.11.0"
python-implementation = "CPython"
"""

data \= tomllib.loads(toml\_str)

## 转换表[¶](#conversion-table "Link to this heading")

| 
TOML

 | 

Python

 |
| --- | --- |
| 

TOML 文档

 | 

dict

 |
| 

string

 | 

str

 |
| 

integer

 | 

int

 |
| 

float

 | 

float（可用 _parse\_float_ 配置）

 |
| 

boolean

 | 

bool

 |
| 

offset date-time

 | 

datetime.datetime (`tzinfo` 属性设置为 `datetime.timezone` 的实例)

 |
| 

local date-time

 | 

datetime.datetime (`tzinfo` 属性设置为 `None`)

 |
| 

local date

 | 

datetime.date

 |
| 

local time

 | 

datetime.time

 |
| 

array

 | 

list

 |
| 

table

 | 

dict

 |
| 

内联表

 | 

dict

 |
| 

表数组

 | 

字典列表

 |
