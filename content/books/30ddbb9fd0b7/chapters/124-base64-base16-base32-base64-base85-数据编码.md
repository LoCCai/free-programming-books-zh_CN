**源代码：** [Lib/base64.py](https://github.com/python/cpython/tree/3.14/Lib/base64.py)

* * *

This module provides functions for encoding binary data to printable ASCII characters and decoding such encodings back to binary data. This includes the [encodings specified in](#base64-rfc-4648) [**RFC 4648**](https://datatracker.ietf.org/doc/html/rfc4648.html) (Base64, Base32 and Base16), the [Base85 encoding](#base64-base-85) specified in [PDF 2.0](https://pdfa.org/resource/iso-32000-2/), and non-standard variants of Base85 used elsewhere.

此模块提供了两个接口。较新的接口支持将 [字节类对象](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 编码为 ASCII [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")，以及将 字节类对象 或包含 ASCII 的字符串解码为 `bytes`。在 [**RFC 4648**](https://datatracker.ietf.org/doc/html/rfc4648.html) 中定义的几种 base-64 字母表（普通的以及 URL 和文件系统安全的）都受到支持。

[旧式接口](#base64-legacy) 不支持对字符串的解码，但它提供了用于编码和解码 [文件对象](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) 的函数。它只支持 Base64 标准字符表，并且按照 [**RFC 2045**](https://datatracker.ietf.org/doc/html/rfc2045.html) 的规定会每 76 个字符增加一个换行符。 请注意如果你要找 [**RFC 2045**](https://datatracker.ietf.org/doc/html/rfc2045.html) 支持那么你可能应当改用 [`email`](https://docs.python.org/zh-cn/3/library/email.html#module-email "email: Package supporting the parsing, manipulating, and generating email messages.") 包。

在 3.3 版本发生变更: 新的接口提供的解码函数现在已经支持只包含 ASCII 的 Unicode 字符串。

在 3.4 版本发生变更: 所有 [类字节对象](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 现在已经被所有编码和解码函数接受。添加了对 Ascii85/Base85 的支持。

## RFC 4648 编码格式[¶](#rfc-4648-encodings "Link to this heading")

[**RFC 4648**](https://datatracker.ietf.org/doc/html/rfc4648.html) 中的编码格式适用于编码二进制数据以便它能安全地通过电子邮件发送、用作 URL 的组成部分，或者包括在 HTTP POST 请求当中。

base64.b64encode(_s_, _altchars\=None_)[¶](#base64.b64encode "Link to this definition")

对 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) _s_ 进行 Base64 编码，并返回编码后的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")。

可选项 _altchars_ 必须是一个长度为 2 的 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object)，它指定了用于替换 `+` 和 `/` 的字符表。这允许应用程序生成对 URL 或文件系统安全的 Base64 字符串。默认值为 `None`，即使用标准 Base64 字符表。

如果 _altchars_ 的长度不为 2 则可以断言或引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。如果 _altchars_ 不是 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 则会引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。

base64.b64decode(_s_, _altchars\=None_, _validate\=False_)[¶](#base64.b64decode "Link to this definition")

解码 Base64 编码过的 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 或 ASCII 字符串 _s_ 并返回解码过的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes").

可选项 _altchars_ 必须是一个长度为 2 的 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 或 ASCII 字符串，它指定了用于替换 `+` 和 `/` 的字符表。

如果 _s_ 被不正确地填充，将引发 [`binascii.Error`](https://docs.python.org/zh-cn/3/library/binascii.html#binascii.Error "binascii.Error")。

如果 _validate_ 值为 `False` (默认情况)，则在填充检查前，将丢弃既不在标准 base-64 字母表之中也不在备用字母表中的字符。如果 _validate_ 为 `True`，这些非 base64 字符将导致 [`binascii.Error`](https://docs.python.org/zh-cn/3/library/binascii.html#binascii.Error "binascii.Error")。

有关严格 base64 检查的详情，请参阅 [`binascii.a2b_base64()`](https://docs.python.org/zh-cn/3/library/binascii.html#binascii.a2b_base64 "binascii.a2b_base64")

如果 _altchars_ 的长度不为 2 则可以断言或引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

base64.standard\_b64encode(_s_)[¶](#base64.standard_b64encode "Link to this definition")

编码 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) _s_，使用标准 Base64 字母表并返回编码过的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")。

base64.standard\_b64decode(_s_)[¶](#base64.standard_b64decode "Link to this definition")

解码 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 或 ASCII 字符串 _s_，使用标准 Base64 字母表并返回解码过的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes").

base64.urlsafe\_b64encode(_s_)[¶](#base64.urlsafe_b64encode "Link to this definition")

编码 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) _s_，使用 URL 与文件系统安全的字母表，使用 `-` 以及 `_` 代替标准 Base64 字母表中的 `+` 和 `/`。返回编码过的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")。结果中可能包含 `=`。

base64.urlsafe\_b64decode(_s_)[¶](#base64.urlsafe_b64decode "Link to this definition")

解码 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 或 ASCII 字符串 _s_，使用 URL 与文件系统安全的字母表，使用 `-` 以及 `_` 代替标准 Base64 字母表中的 `+` 和 `/`。返回解码过的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")。

base64.b32encode(_s_)[¶](#base64.b32encode "Link to this definition")

用 Base32 编码 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) _s_ 并返回编码过的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")。

base64.b32decode(_s_, _casefold\=False_, _map01\=None_)[¶](#base64.b32decode "Link to this definition")

解码 Base32 编码过的 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 或 ASCII 字符串 _s_ 并返回解码过的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes").

可选的 _casefold_ 是一个指定小写字母是否可接受为输入的标志。为了安全考虑，默认值为 `False`。

[**RFC 4648**](https://datatracker.ietf.org/doc/html/rfc4648.html) 允许可以选择将数码 0 (zero) 映射为字母 O (oh)，并可以选择将数码 1 (one) 映射为字母 I (eye) 或字母 L (el)。可选参数 _map01_ 在不为 `None` 时，指定数码 1 应当映射为哪个字母 (当 _map01_ 不为 `None` 时，数码 0 总是被映射为字母 O)。出于安全考虑其默认值为 `None`，因而在输入中不允许 0 和 1。

如果 _s_ 被错误地填充或输入中存在字母表之外的字符，将引发 [`binascii.Error`](https://docs.python.org/zh-cn/3/library/binascii.html#binascii.Error "binascii.Error")。

base64.b32hexencode(_s_)[¶](#base64.b32hexencode "Link to this definition")

类似于 [`b32encode()`](#base64.b32encode "base64.b32encode") 但是使用 Extended Hex Alphabet，如 [**RFC 4648**](https://datatracker.ietf.org/doc/html/rfc4648.html) 所定义。

Added in version 3.10.

base64.b32hexdecode(_s_, _casefold\=False_)[¶](#base64.b32hexdecode "Link to this definition")

类似于 [`b32decode()`](#base64.b32decode "base64.b32decode") 但是使用 Extended Hex Alphabet，如 [**RFC 4648**](https://datatracker.ietf.org/doc/html/rfc4648.html) 所定义。

这个版本不允许数字 0（零）与字母 O（oh）和数字 1（一）与字母 I（eye）或字母 L （el）的映射，所有这些字符都包含在扩展的十六进制字母表中，不能互换。

Added in version 3.10.

base64.b16encode(_s_)[¶](#base64.b16encode "Link to this definition")

用 Base16 编码 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) _s_ 并返回编码过的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")。

base64.b16decode(_s_, _casefold\=False_)[¶](#base64.b16decode "Link to this definition")

解码 Base16 编码过的 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 或 ASCII 字符串 _s_ 并返回解码过的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes").

可选的 _casefold_ 是一个指定小写字母是否可接受为输入的标志。为了安全考虑，默认值为 `False`。

如果 _s_ 被错误地填充或输入中存在字母表之外的字符，将引发 [`binascii.Error`](https://docs.python.org/zh-cn/3/library/binascii.html#binascii.Error "binascii.Error")。

## Base85 编码格式[¶](#base85-encodings "Link to this heading")

Base85 encoding is a family of algorithms which represent four bytes using five ASCII characters. Originally implemented in the Unix `btoa(1)` utility, a version of it was later adopted by Adobe in the PostScript language and is standardized in PDF 2.0 (ISO 32000-2). This version, in both its `btoa` and PDF variants, is implemented by [`a85encode()`](#base64.a85encode "base64.a85encode").

A separate version, using a different output character set, was defined as an April Fool's joke in [**RFC 1924**](https://datatracker.ietf.org/doc/html/rfc1924.html) but is now used by Git and other software. This version is implemented by [`b85encode()`](#base64.b85encode "base64.b85encode").

Finally, a third version, using yet another output character set designed for safe inclusion in programming language strings, is defined by ZeroMQ and implemented here by [`z85encode()`](#base64.z85encode "base64.z85encode").

The functions present in this module differ in how they handle the following:

-   Whether to include and expect enclosing `<~` and `~>` markers.
    
-   Whether to fold the input into multiple lines.
    
-   The set of ASCII characters used for encoding.
    
-   Compact encodings of sequences of spaces and null bytes.
    
-   The encoding of zero-padding bytes applied to the input.
    

请参阅每个函数的文档了解详情。

base64.a85encode(_b_, _\*_, _foldspaces\=False_, _wrapcol\=0_, _pad\=False_, _adobe\=False_)[¶](#base64.a85encode "Link to this definition")

用 Ascii85 编码 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) _b_ 并返回编码过的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")。

_foldspaces_ is an optional flag that uses the special short sequence 'y' instead of 4 consecutive spaces (ASCII 0x20) as supported by 'btoa'. This feature is not supported by the standard encoding used in PDF.

_wrapcol_ 控制输出是否应当添加换行符 (`b'\n'`)。如其为非零值，则每个输出行将只有该值所限定长度的字符数量，不包括末尾换行符。

_pad_ controls whether zero-padding applied to the end of the input is fully retained in the output encoding, as done by `btoa`, producing an exact multiple of 5 bytes of output. This is not part of the standard encoding used in PDF, as it does not preserve the length of the data.

_adobe_ controls whether the encoded byte sequence is framed with `<~` and `~>`, as in a PostScript base-85 string literal. Note that while ASCII85Decode streams in PDF documents _must_ be terminated with `~>`, they _must not_ use a leading `<~`.

Added in version 3.4.

base64.a85decode(_b_, _\*_, _foldspaces\=False_, _adobe\=False_, _ignorechars\=b' \\t\\n\\r\\x0b'_)[¶](#base64.a85decode "Link to this definition")

解码 Ascii85 编码过的 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) 或 ASCII 字符串 _b_ 并返回解码过的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes").

_foldspaces_ is a flag that specifies whether the 'y' short sequence should be accepted as shorthand for 4 consecutive spaces (ASCII 0x20). This feature is not supported by the standard Ascii85 encoding used in PDF and PostScript.

_adobe_ controls whether the `<~` and `~>` markers are present. While the leading `<~` is not required, the input must end with `~>`, or a [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") is raised.

_ignorechars_ 应当是一个包含要从输入中忽略的字符的字节串。这应当只包含空白字符，并且默认包含 ASCII 中所有的空白字符。

Added in version 3.4.

base64.b85encode(_b_, _pad\=False_)[¶](#base64.b85encode "Link to this definition")

用 base85（如 git 风格的二进制 diff 数据所用格式）编码 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) _b_ 并返回编码后的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes").

The input is padded with `b'\0'` so its length is a multiple of 4 bytes before encoding. If _pad_ is true, all the resulting characters are retained in the output, which will always be a multiple of 5 bytes, and thus the length of the data may not be preserved on decoding.

Added in version 3.4.

base64.b85decode(_b_)[¶](#base64.b85decode "Link to this definition")

Decode the base85-encoded [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) or ASCII string _b_ and return the decoded [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes").

Added in version 3.4.

base64.z85encode(_s_)[¶](#base64.z85encode "Link to this definition")

Encode the [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) _s_ using Z85 (as used in ZeroMQ) and return the encoded [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes").

The [ZeroMQ specification](https://rfc.zeromq.org/spec/32/) requires the length of Z85-encoded data to be a multiple of 5 bytes. To produce compliant data frames, you must pad the input data to this function to a multiple of 4 bytes.

Added in version 3.13.

base64.z85decode(_s_)[¶](#base64.z85decode "Link to this definition")

Decode the Z85-encoded [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) or ASCII string _s_ and return the decoded [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes").

Added in version 3.13.

## 旧式接口[¶](#legacy-interface "Link to this heading")

base64.decode(_input_, _output_)[¶](#base64.decode "Link to this definition")

解码二进制 _input_ 文件的内容并将结果二进制数据写入 _output_ 文件。 _input_ 和 _output_ 必须为 [文件对象](https://docs.python.org/zh-cn/3/glossary.html#term-file-object). _input_ 将被读取直至 `input.readline()` 返回空字节串对象。

base64.decodebytes(_s_)[¶](#base64.decodebytes "Link to this definition")

解码 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) _s_，该对象必须包含一行或多行 base64 编码的数据，并返回已解码的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes").

Added in version 3.1.

base64.encode(_input_, _output_)[¶](#base64.encode "Link to this definition")

编码二进制 _input_ 文件的内容并将经 base64 编码的数据写入 _output_ 文件。 _input_ 和 _output_ 必须为 [文件对象](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)。 _input_ 将被读取直到 `input.read()` 返回空字节串对象。 [`encode()`](#base64.encode "base64.encode") 会在每输出 76 个字节之后插入一个换行符 (`b'\n'`)，并会确保输出总是以换行符来结束，如 [**RFC 2045**](https://datatracker.ietf.org/doc/html/rfc2045.html) (MIME) 所规定的那样。

base64.encodebytes(_s_)[¶](#base64.encodebytes "Link to this definition")

编码 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) _s_，其中可以包含任意二进制数据，并返回包含经 base64 编码数据的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")，每输出 76 个字节之后将带一个换行符 (`b'\n'`)，并会确保在末尾也有一个换行符，如 [**RFC 2045**](https://datatracker.ietf.org/doc/html/rfc2045.html) (MIME) 所规定的那样。

Added in version 3.1.

此模块的一个使用示例：

\>>> import base64
\>>> encoded \= base64.b64encode(b'data to be encoded')
\>>> encoded
b'ZGF0YSB0byBiZSBlbmNvZGVk'
\>>> data \= base64.b64decode(encoded)
\>>> data
b'data to be encoded'

## 安全考量[¶](#security-considerations "Link to this heading")

在 [**RFC 4648**](https://datatracker.ietf.org/doc/html/rfc4648.html) 中新增了安全事项部分（第 12 节）；对于要部署到生产环境的任何代码都建议充分考虑此安全事项部分。

参见

模块 [`binascii`](https://docs.python.org/zh-cn/3/library/binascii.html#module-binascii "binascii: Tools for converting between binary and various ASCII-encoded binary representations.")

支持模块，包含 ASCII 到二进制和二进制到 ASCII 转换。

[**RFC 1521**](https://datatracker.ietf.org/doc/html/rfc1521.html) - MIME (Multipurpose Internet Mail Extensions) 第一部分：规定并描述因特网消息体的格式的机制。

第 5.2 节，“Base64 内容转换编码格式”提供了 base64 编码格式的定义。

[ISO 32000-2 Portable document format - Part 2: PDF 2.0](https://pdfa.org/resource/iso-32000-2/)

Section 7.4.3, "ASCII85Decode Filter," provides the definition of the Ascii85 encoding used in PDF and PostScript, including the output character set and the details of data length preservation using zero-padding and partial output groups.

[ZeroMQ RFC 32/Z85](https://rfc.zeromq.org/spec/32/)

The "Formal Specification" section provides the character set used in Z85.
