* * *

`binascii` 模块包含多个方法用来在二进制数据和多种 ASCII 编码的二进制数据表示形式之间进行转换。 在通常情况下，你不会直接使用这些函数而是使用 [`base64`](https://docs.python.org/zh-cn/3/library/base64.html#module-base64 "base64: RFC 4648: Base16, Base32, Base64 Data Encodings; Base85 and Ascii85") 这样的包装器模块作为替代。 `binascii` 模块包含用 C 语言编写的供这些高层级模块使用的低层级函数以获得更快的运行速度。

备注

`a2b_*` 函数接受只含有 ASCII 码的 Unicode 字符串。其他函数只接受 [字节型对象](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) (如 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")，[`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 和其他支持缓冲区协议的对象)。

在 3.3 版本发生变更: ASCII-only unicode strings are now accepted by the `a2b_*` functions.

`binascii` 模块定义了下列函数：

binascii.a2b\_uu(_string_)[¶](#binascii.a2b_uu "Link to this definition")

将单行 uu 编码数据转换成二进制数据并返回。uu 编码每行的数据通常包含 45 个（二进制）字节，最后一行除外。每行数据后面可能跟有空格。

binascii.b2a\_uu(_data_, _\*_, _backtick\=False_)[¶](#binascii.b2a_uu "Link to this definition")

将二进制数据转换为 ASCII 编码字符，返回值是转换后的行数据，包括换行符。 _data_ 的长度最多为 45。如果 _backtick_ 为 true，则零由 ``'`'`` 而不是空格表示。

在 3.7 版本发生变更: 增加 _backtick_ 形参。

binascii.a2b\_base64(_string_, _/_, _\*_, _strict\_mode\=False_)[¶](#binascii.a2b_base64 "Link to this definition")

将 base64 数据块转换成二进制并以二进制数据形式返回。一次可以传递多行数据。

如果 _strict\_mode_ 为真值，则将只转换有效的 base64 数据。无效的 base64 数据将会引发 [`binascii.Error`](#binascii.Error "binascii.Error").

有效的 base64:

-   遵循 [**RFC 3548**](https://datatracker.ietf.org/doc/html/rfc3548.html)。
    
-   仅包含来自 base64 字符表的字符。
    
-   不包含填充后的额外数据（包括冗余填充、换行符等）。
    
-   不以填充符打头。
    

在 3.11 版本发生变更: 增加了 _strict\_mode_ 形参。

binascii.b2a\_base64(_data_, _\*_, _newline\=True_)[¶](#binascii.b2a_base64 "Link to this definition")

将二进制数据转换为一行用 base64 编码的 ASCII 字符串。返回值是转换后的行数据，如果 _newline_ 为 true，则返回值包括换行符。该函数的输出符合 [**RFC 3548**](https://datatracker.ietf.org/doc/html/rfc3548.html)。

在 3.6 版本发生变更: 增加 _newline_ 形参。

binascii.a2b\_qp(_data_, _header\=False_)[¶](#binascii.a2b_qp "Link to this definition")

将一个引号可打印的数据块转换成二进制数据并返回。一次可以转换多行。如果可选参数 _header_ 存在且为 true，则数据中的下划线将被解码成空格。

binascii.b2a\_qp(_data_, _quotetabs\=False_, _istext\=True_, _header\=False_)[¶](#binascii.b2a_qp "Link to this definition")

将二进制数据转换为一行或多行带引号可打印编码的 ASCII 字符串。返回值是转换后的行数据。如果可选参数 _quotetabs_ 存在且为真值，则对所有制表符和空格进行编码。如果可选参数 _istext_ 存在且为真值，则不对新行进行编码，但将对尾随空格进行编码。如果可选参数 _header_ 存在且为 true，则空格将被编码为下划线 [**RFC 1522**](https://datatracker.ietf.org/doc/html/rfc1522.html)。如果可选参数 _header_ 存在且为假值，则也会对换行符进行编码;不进行换行转换编码可能会破坏二进制数据流。

binascii.crc\_hqx(_data_, _value_)[¶](#binascii.crc_hqx "Link to this definition")

以 _value_ 作为初始 CRC 计算 _data_ 的 16 位 CRC 值，返回其结果。这里使用 CRC-CCITT 生成多项式 _x_16 + _x_12 + _x_5 + 1，通常表示为 0x1021。该 CRC 被用于 binhex4 格式。

binascii.crc32(_data_\[, _value_\])[¶](#binascii.crc32 "Link to this definition")

计算 CRC-32，即 _data_ 的无符号 32 位校验和，初始 CRC 值为 _value_。默认的初始 CRC 值为零。该算法与 ZIP 文件校验和算法一致。由于该算法被设计用作校验和算法，因此不适合用作通用哈希算法。使用方式如下:

print(binascii.crc32(b"hello world"))
\# 或者，分成两块：
crc \= binascii.crc32(b"hello")
crc \= binascii.crc32(b" world", crc)
print('crc32 = {:#010x}'.format(crc))

在 3.0 版本发生变更: 结果将总是不带符号的。

binascii.b2a\_hex(_data_\[, _sep_\[, _bytes\_per\_sep=1_\]\])[¶](#binascii.b2a_hex "Link to this definition")

binascii.hexlify(_data_\[, _sep_\[, _bytes\_per\_sep=1_\]\])[¶](#binascii.hexlify "Link to this definition")

返回二进制数据 _data_ 的十六进制表示形式。 _data_ 的每个字节都被转换为相应的 2 位十六进制表示形式。因此返回的字节对象的长度是 _data_ 的两倍。

使用 [`bytes.hex()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes.hex "bytes.hex") 方法也可以方便地实现相似的功能（但仅返回文本字符串）。

如果指定了 _sep_，它必须为单字符 str 或 bytes 对象。它将被插入每个 _bytes\_per\_sep_ 输入字节之后。 分隔符位置默认从输出的右端开始计数，如果你希望从左端开始计数，请提供一个负的 _bytes\_per\_sep_ 值。

\>>> import binascii
\>>> binascii.b2a\_hex(b'\\xb9\\x01\\xef')
b'b901ef'
\>>> binascii.hexlify(b'\\xb9\\x01\\xef', '-')
b'b9-01-ef'
\>>> binascii.b2a\_hex(b'\\xb9\\x01\\xef', b'\_', 2)
b'b9\_01ef'
\>>> binascii.b2a\_hex(b'\\xb9\\x01\\xef', b' ', \-2)
b'b901 ef'

在 3.8 版本发生变更: 添加了 _sep_ 和 _bytes\_per\_sep_ 形参。

binascii.a2b\_hex(_hexstr_)[¶](#binascii.a2b_hex "Link to this definition")

binascii.unhexlify(_hexstr_)[¶](#binascii.unhexlify "Link to this definition")

返回由十六进制字符串 _hexstr_ 表示的二进制数据。此函数功能与 [`b2a_hex()`](#binascii.b2a_hex "binascii.b2a_hex") 相反。 _hexstr_ 必须包含偶数个十六进制数字（可以是大写或小写），否则会引发 [`Error`](#binascii.Error "binascii.Error") 异常。

Similar functionality (but more liberal towards whitespace) is also accessible using the [`bytes.fromhex()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes.fromhex "bytes.fromhex") class method.

_exception_ binascii.Error[¶](#binascii.Error "Link to this definition")

通常是因为编程错误引发的异常。

_exception_ binascii.Incomplete[¶](#binascii.Incomplete "Link to this definition")

数据不完整引发的异常。通常不是编程错误导致的，可以通过读取更多的数据并再次尝试来处理该异常。

参见

模块 [`base64`](https://docs.python.org/zh-cn/3/library/base64.html#module-base64 "base64: RFC 4648: Base16, Base32, Base64 Data Encodings; Base85 and Ascii85")

支持符合 RFC 规范的 base16、base32、base64 和 base85 编码。

模块 [`quopri`](https://docs.python.org/zh-cn/3/library/quopri.html#module-quopri "quopri: Encode and decode files using the MIME quoted-printable encoding.")

支持在 MIME 版本电子邮件中使用引号可打印编码。
