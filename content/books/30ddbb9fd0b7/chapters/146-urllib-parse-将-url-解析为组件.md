**源代码:** [Lib/urllib/parse.py](https://github.com/python/cpython/tree/3.14/Lib/urllib/parse.py)

* * *

该模块定义了一个标准接口，用于将统一资源定位符（URL）字符串拆分为不同部分（协议、网络位置、路径等），或将各个部分组合回 URL 字符串，并将“相对 URL”转换为基于给定的“基准 URL”的绝对 URL。

该模块被设计为匹配针对相对统一资源定位符的互联网 RFC。 它支持下列 URL 方案: `file`, `ftp`, `gopher`, `hdl`, `http`, `https`, `imap`, `itms-services`, `mailto`, `mms`, `news`, `nntp`, `prospero`, `rsync`, `rtsp`, `rtsps`, `rtspu`, `sftp`, `shttp`, `sip`, `sips`, `snews`, `svn`, `svn+ssh`, `telnet`, `wais`, `ws`, `wss`。

包含 `itms-services` URL 方案可能会导致应用无法通过 Apple 针对 macOS 和 iOS App Store 的审核流程。 对 `itms-services` 方案的处理在 iOS 上总是会被移除；在 macOS 上，如果 CPython 编译时附带了 [`--with-app-store-compliance`](https://docs.python.org/zh-cn/3/using/configure.html#cmdoption-with-app-store-compliance) 选项则它 _可能_ 会被移除。

`urllib.parse` 模块定义的函数分为两大类：URL 解析和 URL 转码。 下面几节将详细介绍它们。

本模块的函数使用已弃用的术语 `netloc` (或 `net_loc`)，它是在 [**RFC 1808**](https://datatracker.ietf.org/doc/html/rfc1808.html) 中引入的。 但是，此术语在 [**RFC 3986**](https://datatracker.ietf.org/doc/html/rfc3986.html) 引入术语 `authority` 作为其替代后已过时。 `netloc` 仅为向下兼容而继续被使用。

## URL 解析[¶](#url-parsing "Link to this heading")

URL 解析函数用于将一个 URL 字符串分割成其组成部分，或者将 URL 的多个部分组合成一个 URL 字符串。

urllib.parse.urlsplit(_urlstring_, _scheme\=None_, _allow\_fragments\=True_)[¶](#urllib.parse.urlsplit "Link to this definition")

Parse a URL into five components, returning a 5-item [named tuple](https://docs.python.org/zh-cn/3/glossary.html#term-named-tuple) [`SplitResult`](#urllib.parse.SplitResult "urllib.parse.SplitResult") or [`SplitResultBytes`](#urllib.parse.SplitResultBytes "urllib.parse.SplitResultBytes"). This corresponds to the general structure of a URL: `scheme://netloc/path?query#fragment`. Each tuple item is a string, possibly empty.

The delimiters as shown above are not part of the result, except for a leading slash in the _path_ component, which is retained if present.

此外，netloc 属性被拆分至添加到所返回对象的附加属性中：username, password, hostname 和 port。

使用百分号编码的序列将不会被解码。

例如：

\>>> from urllib.parse import urlsplit
\>>> urlsplit("scheme://netloc/path?query#fragment")
SplitResult(scheme='scheme', netloc='netloc', path='/path',
            query='query', fragment='fragment')
\>>> o \= urlsplit("http://docs.python.org:80/3/library/urllib.parse.html?"
...              "highlight=params#url-parsing")
\>>> o
SplitResult(scheme='http', netloc='docs.python.org:80',
            path='/3/library/urllib.parse.html',
            query='highlight=params', fragment='url-parsing')
\>>> o.scheme
'http'
\>>> o.netloc
'docs.python.org:80'
\>>> o.hostname
'docs.python.org'
\>>> o.port
80
\>>> o.\_replace(fragment\="").geturl()
'http://docs.python.org:80/3/library/urllib.parse.html?highlight=params'

根据 [**RFC 1808**](https://datatracker.ietf.org/doc/html/rfc1808.html) 中的语法规范，`urlsplit()` 仅在 netloc 由 '//' 正确引入时才会识别它。 否则输入将被视为相对 URL，并因此以路径部分为开头。

\>>> from urllib.parse import urlsplit
\>>> urlsplit('//www.cwi.nl:80/%7Eguido/Python.html')
SplitResult(scheme='', netloc='www.cwi.nl:80', path='/%7Eguido/Python.html',
            query='', fragment='')
\>>> urlsplit('www.cwi.nl/%7Eguido/Python.html')
SplitResult(scheme='', netloc='', path='www.cwi.nl/%7Eguido/Python.html',
            query='', fragment='')
\>>> urlsplit('help/Python.html')
SplitResult(scheme='', netloc='', path='help/Python.html',
            query='', fragment='')

_scheme_ 参数给出了默认的协议，只有在 URL 未指定协议的情况下才会被使用。 它应该是与 _urlstring_ 相同的类型（文本或字节串），除此之外默认值 `''` 也总是被允许，并会在适当情况下自动转换为 `b''`。

如果 _allow\_fragments_ 参数为假值，则片段标识符不会被识别。 它们会被解析为路径、参数或查询部分，在返回值中 `fragment` 会被设为空字符串。

返回值是一个 [named tuple](https://docs.python.org/zh-cn/3/glossary.html#term-named-tuple)，这意味着它的条目可以通过索引或作为命名属性来访问，这些属性是：

| 
属性

 | 

索引

 | 

值

 | 

值（如果不存在）

 |
| --- | --- | --- | --- |
| 

`scheme`

 | 

0

 | 

URL 协议说明符

 | 

_scheme_ 参数

 |
| 

`netloc`

 | 

1

 | 

网络位置部分

 | 

空字符串

 |
| 

`path`

 | 

2

 | 

分层路径

 | 

空字符串

 |
| 

`query`

 | 

3

 | 

查询组件

 | 

空字符串

 |
| 

`fragment`

 | 

4

 | 

片段标识符

 | 

空字符串

 |
| 

`username`

 |  | 

用户名

 | 

[`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")

 |
| 

`password`

 |  | 

密码

 | 

[`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")

 |
| 

`hostname`

 |  | 

主机名（小写）

 | 

[`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")

 |
| 

`port`

 |  | 

端口号为整数（如果存在）

 | 

[`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")

 |

如果在 URL 中指定了无效的端口，读取 `port` 属性将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。 有关结果对象的更多信息请参阅 [结构化解析结果](#urlparse-result-object) 一节。

在 `netloc` 属性中不匹配的方括号将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

如果 `netloc` 属性中的字符在 NFKC 规范化下（如 IDNA 编码格式所使用的）被分解成 `/`, `?`, `#`, `@` 或 `:` 则将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。 如果在解析之前 URL 就被分解，则不会引发错误。

遵循更新了 [**RFC 3986**](https://datatracker.ietf.org/doc/html/rfc3986.html) 的部分 [WHATWG spec](https://url.spec.whatwg.org/#concept-basic-url-parser)，打头的 C0 控制字符和空格字符会从 URL 中被去除。 `\n`、`\r` 和制表符 `\t` 会在 URL 中的任意位置被移除。

和所有命名元组一样，该子类有一些特别有用的额外方法和属性。 其中一个方法是 `_replace()`。 `_replace()` 方法将返回一个新的 [`SplitResult`](#urllib.parse.SplitResult "urllib.parse.SplitResult") 对象，用新值替换指定的字段。

\>>> from urllib.parse import urlsplit
\>>> u \= urlsplit('//www.cwi.nl:80/%7Eguido/Python.html')
\>>> u
SplitResult(scheme='', netloc='www.cwi.nl:80', path='/%7Eguido/Python.html',
            query='', fragment='')
\>>> u.\_replace(scheme\='http')
SplitResult(scheme='http', netloc='www.cwi.nl:80', path='/%7Eguido/Python.html',
            query='', fragment='')

警告

[`urlsplit()`](#urllib.parse.urlsplit "urllib.parse.urlsplit") 不会执行验证。 请参阅 [URL 解析安全](#url-parsing-security) 了解详情。

在 3.2 版本发生变更: 添加了 IPv6 URL 解析功能。

在 3.3 版本发生变更: 现在会针对所有 URL 方案解析此片段（除非 _allow\_fragments_ 为假值），以符合 [**RFC 3986**](https://datatracker.ietf.org/doc/html/rfc3986.html) 规范。 在之前版本中，存在一个支持片段的方案的允许名单。

在 3.8 版本发生变更: 在 NFKC 规范化下会影响 netloc 解析的字符现在将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

在 3.10 版本发生变更: ASCII 换行符和制表符会从 URL 中被去除。

在 3.12 版本发生变更: 打头的 WHATWG C0 控制符和空格符将从 URL 中去除。

urllib.parse.parse\_qs(_qs_, _keep\_blank\_values\=False_, _strict\_parsing\=False_, _encoding\='utf-8'_, _errors\='replace'_, _max\_num\_fields\=None_, _separator\='&'_)[¶](#urllib.parse.parse_qs "Link to this definition")

解析以字符串参数形式（类型为 _application/x-www-form-urlencoded_ 的数据）给出的查询字符串。 返回字典形式的数据。 结果字典的键为唯一的查询变量名而值为每个变量名对应的值列表。

可选参数 _keep\_blank\_values_ 是一个旗标，指明是否要将以百分号转码的空值作为空字符串处理。 真值表示空值应当被保留作为空字符串。 默认的假值表示空值会被忽略并将其视作未包括的值。

可选参数 _strict\_parsing_ 是一个旗标，指明要如何处理解析错误。 如为假值（默认），错误会被静默地忽略。 如为真值，错误会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 异常。

可选的 _encoding_ 和 _errors_ 形参指定如何将以百分号编码的序列解码为 Unicode 字符，即作为 [`bytes.decode()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes.decode "bytes.decode") 方法所接受的数据。

可选参数 _max\_num\_fields_ 是要读取的最大字段数量。 如果设置，则如果读取的字段超过 _max\_num\_fields_ 会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

可选参数 _separator_ 是用来分隔查询参数的符号。 默认为 `&`。

使用 [`urllib.parse.urlencode()`](#urllib.parse.urlencode "urllib.parse.urlencode") 函数 (并将 `doseq` 形参设为 `True`) 将这样的字典转换为查询字符串。

在 3.2 版本发生变更: 增加了 _encoding_ 和 _errors_ 形参。

在 3.8 版本发生变更: 增加了 _max\_num\_fields_ 形参。

在 3.10 版本发生变更: 增加了 _separator_ 形参，默认值为 `&`。 Python 在早于 Python 3.10 的版本中允许使用 `;` 和 `&` 作为查询参数分隔符。 此设置已被改为只允许单个分隔符键，并以 `&` 作为默认的分隔符。

自 3.14 版本弃用: 接受具有假值的对象 (如 `0` 和 `[]`) 但空字符串、字节型对象和 `None` 除外的做法现已被弃用。

urllib.parse.parse\_qsl(_qs_, _keep\_blank\_values\=False_, _strict\_parsing\=False_, _encoding\='utf-8'_, _errors\='replace'_, _max\_num\_fields\=None_, _separator\='&'_)[¶](#urllib.parse.parse_qsl "Link to this definition")

解析以字符串参数形式（类型为 _application/x-www-form-urlencoded_ 的数据）给出的查询字符串。 数据以字段名和字段值对列表的形式返回。

可选参数 _keep\_blank\_values_ 是一个旗标，指明是否要将以百分号转码的空值作为空字符串处理。 真值表示空值应当被保留作为空字符串。 默认的假值表示空值会被忽略并将其视作未包括的值。

可选参数 _strict\_parsing_ 是一个旗标，指明要如何处理解析错误。 如为假值（默认），错误会被静默地忽略。 如为真值，错误会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 异常。

可选的 _encoding_ 和 _errors_ 形参指定如何将以百分号编码的序列解码为 Unicode 字符，即作为 [`bytes.decode()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes.decode "bytes.decode") 方法所接受的数据。

可选参数 _max\_num\_fields_ 是要读取的最大字段数量。 如果设置，则如果读取的字段超过 _max\_num\_fields_ 会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

可选参数 _separator_ 是用来分隔查询参数的符号。 默认为 `&`。

使用 [`urllib.parse.urlencode()`](#urllib.parse.urlencode "urllib.parse.urlencode") 函数将这样的名值对列表转换为查询字符串。

在 3.2 版本发生变更: 增加了 _encoding_ 和 _errors_ 形参。

在 3.8 版本发生变更: 增加了 _max\_num\_fields_ 形参。

在 3.10 版本发生变更: 增加了 _separator_ 形参，默认值为 `&`。 Python 在早于 Python 3.10 的版本中允许使用 `;` 和 `&` 作为查询参数分隔符。 此设置已被改为只允许单个分隔符键，并以 `&` 作为默认的分隔符。

urllib.parse.urlunsplit(_parts_)[¶](#urllib.parse.urlunsplit "Link to this definition")

从 `urlsplit()` 返回的元组中构造一个 URL。 _parts_ 参数可以是任何包含五个条目的可迭代对象。 如果最初解析的 URL 具有不必要的分隔符（例如，带有空查询的 `?`；RFC 声明这些是等价的），则结果可能是一个略有不同但等价的 URL。

urllib.parse.urlparse(_urlstring_, _scheme\=None_, _allow\_fragments\=True_)[¶](#urllib.parse.urlparse "Link to this definition")

类似于 [`urlsplit()`](#urllib.parse.urlsplit "urllib.parse.urlsplit")，但还会将 _path_ 组成部分拆分为 _path_ 和 _params_。 该函数返回一个包含 6 个条目的 [named tuple](https://docs.python.org/zh-cn/3/glossary.html#term-named-tuple) [`ParseResult`](#urllib.parse.ParseResult "urllib.parse.ParseResult") 或 [`ParseResultBytes`](#urllib.parse.ParseResultBytes "urllib.parse.ParseResultBytes")。 其条目与 `urlsplit()` 的结果相同，区别在于 _params_ 被插入到索引 3 的位置，即 _path_ 和 _query_ 之间。

该函数基于已过时的 [**RFC 1738**](https://datatracker.ietf.org/doc/html/rfc1738.html) 和 [**RFC 1808**](https://datatracker.ietf.org/doc/html/rfc1808.html)，它们将 _params_ 列为主要的 URL 组成部分。 较新的 URL 语法允许将参数应用到 URL 的 _path_ 部分的每个分段上 (参见 [**RFC 3986**](https://datatracker.ietf.org/doc/html/rfc3986.html))。 通常应当使用 [`urlsplit()`](#urllib.parse.urlsplit "urllib.parse.urlsplit") 而非 [`urlparse()`](#urllib.parse.urlparse "urllib.parse.urlparse")。 需要一个单独的函数来分隔路径分段和参数。

urllib.parse.urlunparse(_parts_)[¶](#urllib.parse.urlunparse "Link to this definition")

将 [`urlparse()`](#urllib.parse.urlparse "urllib.parse.urlparse") 所返回的元组中的元素合并为一个完整 URL 字符串。 _parts_ 参数可以是任何包含六个条目的可迭代对象。 如果最初解析的 URL 具有不必要的分隔符（例如，带有空查询的 ?；RFC 声明这些是等价的），则结果可能是一个略有不同但等价的 URL。

urllib.parse.urljoin(_base_, _url_, _allow\_fragments\=True_)[¶](#urllib.parse.urljoin "Link to this definition")

通过合并一个 "基准 URL" (_base_) 和另一个 URL (_url_) 来构造一个完整 ("absolute") URL。 在非正式情况下，这将使用基准 URL 的各部分，特别是地址协议、网络位置和 (一部分) 路径来提供相对 URL 中缺失的部分。 例如:

\>>> from urllib.parse import urljoin
\>>> urljoin('http://www.cwi.nl/%7Eguido/Python.html', 'FAQ.html')
'http://www.cwi.nl/%7Eguido/FAQ.html'

_allow\_fragments_ 参数的含义和默认值与 [`urlsplit()`](#urllib.parse.urlsplit "urllib.parse.urlsplit") 中的相同。

备注

如果 _url_ 为绝对 URL (即以 `//` 或 `scheme://` 打头)，则 _url_ 的主机名和/或协议将出现在结果中。 例如:

\>>> urljoin('http://www.cwi.nl/%7Eguido/Python.html',
...         '//www.python.org/%7Eguido')
'http://www.python.org/%7Eguido'

如果你不想要那样的行为，请使用 [`urlsplit()`](#urllib.parse.urlsplit "urllib.parse.urlsplit") 和 [`urlunsplit()`](#urllib.parse.urlunsplit "urllib.parse.urlunsplit") 对 _url_ 进行预处理，移除可能存在的 _scheme_ 和 _netloc_ 部分。

警告

因为可以将一个绝对 URL 作为 `url` 形参传入，对由攻击者控制的 `url` 使用 `urljoin` 通常是 **不安全的**。 例如，在 `urljoin("https://website.com/users/", username)` 中，如果 `username` 可以包含一个绝对 URL，`urljoin` 的结果也将为绝对 URL。

在 3.5 版本发生变更: 更新行为以匹配 [**RFC 3986**](https://datatracker.ietf.org/doc/html/rfc3986.html) 中定义的语义。

urllib.parse.urldefrag(_url_)[¶](#urllib.parse.urldefrag "Link to this definition")

如果 _url_ 包含片段标识符，则返回不带片段标识符的 _url_ 修改版本，以及作为单独字符串的片段标识符。 如果 _url_ 中没有片段标识符，则返回未经修改的 _url_ 和一个空字符串。

返回值是一个 [named tuple](https://docs.python.org/zh-cn/3/glossary.html#term-named-tuple)，它的条目可以通过索引或作为命名属性来访问:

| 
属性

 | 

索引

 | 

值

 | 

值（如果不存在）

 |
| --- | --- | --- | --- |
| 

`url`

 | 

0

 | 

不带片段的 URL

 | 

空字符串

 |
| 

`fragment`

 | 

1

 | 

片段标识符

 | 

空字符串

 |

请参阅 [结构化解析结果](#urlparse-result-object) 一节了解有关结果对象的更多信息。

在 3.2 版本发生变更: 结果为已构造好的对象而不是一个简单的 2 元组。

urllib.parse.unwrap(_url_)[¶](#urllib.parse.unwrap "Link to this definition")

从已包装的 URL (即被格式化为 `<URL:scheme://host/path>`, `<scheme://host/path>`, `URL:scheme://host/path` 或 `scheme://host/path` 的字符串) 中提取 URL。 如果 _url_ 不是一个已包装的 URL，它将被原样返回。

## URL 解析安全[¶](#url-parsing-security "Link to this heading")

[`urlsplit()`](#urllib.parse.urlsplit "urllib.parse.urlsplit") 和 [`urlparse()`](#urllib.parse.urlparse "urllib.parse.urlparse") API 不会对输入进行 **验证**。 它们可能不会因其他应用程序认为不合法的输入而引发错误。 它们还可能在其他地方认为不是 URL 的输入上成功运行。 它们的目标是达成实际的功能而不是保持纯净。

它们在非正常的输入上可能不会引发异常，而是以空字符串的形式返回某些部分。 或者可能会包含某些不应包含的部分。

我们建议这些 API 的用户在任何使用的值具有安全意义的地方应用防御性代码。 在你的代码中进行某些验证之后再信任被返回的组件。 这个 `scheme` 合理吗？那个 `path` 正确吗？ 那个 `hostname` 是否存在怪异之处？等等。

一个 URL 由哪些内容组成并没有通用的良好定义。 不同应用程序有不同的需求和想要的约束。 举例来说现有的 [WHATWG spec](https://url.spec.whatwg.org/#concept-basic-url-parser) 描述了面向用户的 web 客户端如 web 浏览器的需求。 而 [**RFC 3986**](https://datatracker.ietf.org/doc/html/rfc3986.html) 则更为通用化。 这些函数涵盖了这两种领域的某些方面，但称不上能兼容任何一种。 这些 API 和早于这两个标准的现有用户代码对于其他特定行为的期望使得我们对 API 行为的更改变得非常谨慎。

## 解析 ASCII 编码字节[¶](#parsing-ascii-encoded-bytes "Link to this heading")

这些 URL 解析函数最初设计只用于操作字符串。 但在实践中，它也能够操作经过正确转码和编码的 ASCII 字节序列形式的 URL。 相应地，此模块中的 URL 解析函数既可以操作 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 对象也可以操作 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 和 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 对象。

如果传入 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 数据，结果将只包含 `str` 数据。 如果传入 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 或 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 数据，则结果也将只包含 `bytes` 数据。

试图在单个函数调用中混用 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 数据和 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 或 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 数据将导致引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")，而试图传入非 ASCII 字节值则将引发 [`UnicodeDecodeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#UnicodeDecodeError "UnicodeDecodeError")。

为了支持结果对象在 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 和 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 之间方便地转换，所有来自 URL 解析函数的返回值都会提供 `encode()` 方法 (当结果包含 `str` 数据) 或 `decode()` 方法 (当结果包含 `bytes` 数据)。 这些方法的签名与 `str` 和 `bytes` 的对应方法相匹配 (不同之处在于其默认编码格式是 `'ascii'` 而非 `'utf-8'`)。 每个方法会输出包含相应类型的 `bytes` 数据 (对于 `encode()` 方法) 或 `str` 数据 (对于 `decode()` 方法) 的值。

对于某些需要在有可能不正确地转码的包含非 ASCII 数据的 URL 上进行操作的应用程序来说，在唤起 URL 解析方法之前必须自行将字节串解码为字符。

在本节中描述的行为仅适用于 URL 解析函数。 URL 转码函数在产生和消耗字节序列时使用它们自己的规则，详情参见单独 URL 转码函数的文档。

在 3.2 版本发生变更: URL 解析函数现在接受 ASCII 编码的字节序列

## 结构化解析结果[¶](#structured-parse-results "Link to this heading")

来自 [`urlsplit()`](#urllib.parse.urlsplit "urllib.parse.urlsplit")、[`urlparse()`](#urllib.parse.urlparse "urllib.parse.urlparse") 和 [`urldefrag()`](#urllib.parse.urldefrag "urllib.parse.urldefrag") 函数的结果对象是 [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple") 类型的子类。 这些子类添加了各函数文档中列出的属性、在前一节中描述的编解码支持，以及一个额外的方法:

urllib.parse.SplitResult.geturl()[¶](#urllib.parse.urllib.parse.SplitResult.geturl "Link to this definition")

以字符串形式返回原始 URL 的重合并版本。 这可能与原始 URL 有所不同，例如协议的名称可能被正规化为小写字母、空的组成部分可能被丢弃。 特别地，空的参数、查询和片段标识符将会被移除。

对于 [`urldefrag()`](#urllib.parse.urldefrag "urllib.parse.urldefrag") 的结果，只有空的片段标识符会被移除。 对于 [`urlsplit()`](#urllib.parse.urlsplit "urllib.parse.urlsplit") 和 [`urlparse()`](#urllib.parse.urlparse "urllib.parse.urlparse") 的结果，所有被记录的改变都会被应用到此方法所返回的 URL 上。

如果是通过原始的解析方法传回则此方法的结果会保持不变:

\>>> from urllib.parse import urlsplit
\>>> url \= 'HTTP://www.Python.org/doc/#'
\>>> r1 \= urlsplit(url)
\>>> r1.geturl()
'http://www.Python.org/doc/'
\>>> r2 \= urlsplit(r1.geturl())
\>>> r2.geturl()
'http://www.Python.org/doc/'

下面的类提供了当在 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 对象上操作时对结构化解析结果的实现:

_class_ urllib.parse.DefragResult(_url_, _fragment_)[¶](#urllib.parse.DefragResult "Link to this definition")

用于 [`urldefrag()`](#urllib.parse.urldefrag "urllib.parse.urldefrag") 结果的实体类，包含有 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 数据。 `encode()` 方法会返回一个 [`DefragResultBytes`](#urllib.parse.DefragResultBytes "urllib.parse.DefragResultBytes") 实例。

Added in version 3.2.

_class_ urllib.parse.ParseResult(_scheme_, _netloc_, _path_, _params_, _query_, _fragment_)[¶](#urllib.parse.ParseResult "Link to this definition")

用于 [`urlparse()`](#urllib.parse.urlparse "urllib.parse.urlparse") 结果的实体类，包含有 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 数据。 `encode()` 方法会返回一个 [`ParseResultBytes`](#urllib.parse.ParseResultBytes "urllib.parse.ParseResultBytes") 实例。

_class_ urllib.parse.SplitResult(_scheme_, _netloc_, _path_, _query_, _fragment_)[¶](#urllib.parse.SplitResult "Link to this definition")

用于 [`urlsplit()`](#urllib.parse.urlsplit "urllib.parse.urlsplit") 结果的实体类，包含有 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 数据。 `encode()` 方法会返回一个 [`SplitResultBytes`](#urllib.parse.SplitResultBytes "urllib.parse.SplitResultBytes") 实例。

下面的类提供了当在 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 或 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 对象上操作时对解析结果的实现:

_class_ urllib.parse.DefragResultBytes(_url_, _fragment_)[¶](#urllib.parse.DefragResultBytes "Link to this definition")

用于 [`urldefrag()`](#urllib.parse.urldefrag "urllib.parse.urldefrag") 结果的实体类，包含有 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 数据。 `decode()` 方法会返回一个 [`DefragResult`](#urllib.parse.DefragResult "urllib.parse.DefragResult") 实例。

Added in version 3.2.

_class_ urllib.parse.ParseResultBytes(_scheme_, _netloc_, _path_, _params_, _query_, _fragment_)[¶](#urllib.parse.ParseResultBytes "Link to this definition")

用于 [`urlparse()`](#urllib.parse.urlparse "urllib.parse.urlparse") 结果的实体类，包含有 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 数据。 `decode()` 方法会返回一个 [`ParseResult`](#urllib.parse.ParseResult "urllib.parse.ParseResult") 实例。

Added in version 3.2.

_class_ urllib.parse.SplitResultBytes(_scheme_, _netloc_, _path_, _query_, _fragment_)[¶](#urllib.parse.SplitResultBytes "Link to this definition")

用于 [`urlsplit()`](#urllib.parse.urlsplit "urllib.parse.urlsplit") 结果的实体类，包含有 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 数据。 `decode()` 方法会返回一个 [`SplitResult`](#urllib.parse.SplitResult "urllib.parse.SplitResult") 实例。

Added in version 3.2.

## URL 转码[¶](#url-quoting "Link to this heading")

URL 转码函数的功能是接收程序数据并通过对特殊字符进行转码并正确编码非 ASCII 文本来将其转为可以安全地用作 URL 组成部分的形式。 它们还支持逆转此操作以便从作为 URL 组成部分的内容中重建原始数据，如果上述的 URL 解析函数还未覆盖此功能的话。

urllib.parse.quote(_string_, _safe\='/'_, _encoding\=None_, _errors\=None_)[¶](#urllib.parse.quote "Link to this definition")

使用 `%_xx_` 转义符替换 _string_ 中的特殊字符。 字母、数字和 `'_.-~'` 等字符一定不会被转码。 在默认情况下，此函数只对 URL 的路径部分进行转码。 可选的 _safe_ 形参额外指定不应被转码的 ASCII 字符 --- 其默认值为 `'/'`。

_string_ 可以是 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 或 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象。

在 3.7 版本发生变更: 从 [**RFC 2396**](https://datatracker.ietf.org/doc/html/rfc2396.html) 迁移到 [**RFC 3986**](https://datatracker.ietf.org/doc/html/rfc3986.html) 以转码 URL 字符串。 "~" 现在已被包括在非保留字符集中。

The optional _encoding_ and _errors_ parameters specify how to deal with non-ASCII characters, as accepted by the [`str.encode()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str.encode "str.encode") method. Although these parameters default to `None` in the function signature, when processing [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") inputs, _encoding_ effectively defaults to `'utf-8'` and _errors_ to `'strict'`, meaning unsupported characters raise a [`UnicodeEncodeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#UnicodeEncodeError "UnicodeEncodeError"). _encoding_ and _errors_ must not be supplied if _string_ is a [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes"), or a [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError") is raised.

请注意 `quote(string, safe, encoding, errors)` 等价于 `quote_from_bytes(string.encode(encoding, errors), safe)`。

例如: `quote('/El Niño/')` 将产生 `'/El%20Ni%C3%B1o/'`。

urllib.parse.quote\_plus(_string_, _safe\=''_, _encoding\=None_, _errors\=None_)[¶](#urllib.parse.quote_plus "Link to this definition")

类似于 [`quote()`](#urllib.parse.quote "urllib.parse.quote")，但还会使用加号来替换空格，如在构建放入 URL 的查询字符串时对于转码 HTML 表单值时所要求的那样。 原始字符串中的加号会被转义，除非它们已包括在 _safe_ 中。 它也不会将 _safe_ 的默认值设为 `'/'`。

例如: `quote_plus('/El Niño/')` 将产生 `'%2FEl+Ni%C3%B1o%2F'`。

urllib.parse.quote\_from\_bytes(_bytes_, _safe\='/'_)[¶](#urllib.parse.quote_from_bytes "Link to this definition")

类似于 [`quote()`](#urllib.parse.quote "urllib.parse.quote")，但是接受 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象而非 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")，并且不执行从字符串到字节串的编码。

例如: `quote_from_bytes(b'a&\xef')` 将产生 `'a%26%EF'`。

urllib.parse.unquote(_string_, _encoding\='utf-8'_, _errors\='replace'_)[¶](#urllib.parse.unquote "Link to this definition")

将 `%_xx_` 转义符替换为等效的单字符。 可选的 _encoding_ 和 _errors_ 形参指定如何将以百分号编码的序列解码为 Unicode 字符，即 [`bytes.decode()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes.decode "bytes.decode") 方法所接受的形式。

_string_ 可以是 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 或 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象。

_encoding_ 默认为 `'utf-8'`。 _errors_ 默认为 `'replace'`，表示无效的序列将被替换为占位字符。

例如: `unquote('/El%20Ni%C3%B1o/')` 将产生 `'/El Niño/'`。

在 3.9 版本发生变更: _string_ 形参支持 bytes 和 str 对象（之前仅支持 str）。

urllib.parse.unquote\_plus(_string_, _encoding\='utf-8'_, _errors\='replace'_)[¶](#urllib.parse.unquote_plus "Link to this definition")

类似于 [`unquote()`](#urllib.parse.unquote "urllib.parse.unquote")，但还会将加号替换为空格，如反转码表单值所要求的。

_string_ 必须为 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")。

例如: `unquote_plus('/El+Ni%C3%B1o/')` 将产生 `'/El Niño/'`。

urllib.parse.unquote\_to\_bytes(_string_)[¶](#urllib.parse.unquote_to_bytes "Link to this definition")

用等价的单八位形式替换 `%_xx_` 转义码，并返回一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象。

_string_ 可以是 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 或 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象。

如果它是 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")，则 _string_ 中未转义的非 ASCII 字符会被编码为 UTF-8 字节串。

例如: `unquote_to_bytes('a%26%EF')` 将产生 `b'a&\xef'`。

urllib.parse.urlencode(_query_, _doseq\=False_, _safe\=''_, _encoding\=None_, _errors\=None_, _quote\_via\=quote\_plus_)[¶](#urllib.parse.urlencode "Link to this definition")

将一个包含有 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 或 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象的映射对象或二元组序列转换为以百分号编码的 ASCII 文本字符串。 如果所产生的字符串要被用作 [`urlopen()`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.urlopen "urllib.request.urlopen") 函数的 POST 操作的 _data_，则它应当被编码为字节串，否则它将导致 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。

结果字符串是一系列 `key=value` 对，由 `'&'` 字符进行分隔，其中 _key_ 和 _value_ 都已使用 _quote\_via_ 函数转码。 在默认情况下，会使用 [`quote_plus()`](#urllib.parse.quote_plus "urllib.parse.quote_plus") 来转码值，这意味着空格会被转码为 `'+'` 字符而 '/' 字符会被转码为 `%2F`，即遵循 GET 请求的标准 (`application/x-www-form-urlencoded`)。 另一个可以作为 _quote\_via_ 传入的替代函数是 [`quote()`](#urllib.parse.quote "urllib.parse.quote")，它将把空格转码为 `%20` 并且不编码 '/' 字符。 为了最大程度地控制要转码的内容，请使用 `quote` 并指定 _safe_ 的值。

当使用二元组序列作为 _query_ 参数时，每个元组的第一个元素为键而第二个元素为值。 值元素本身也可以为一个序列，在那种情况下，如果可选的形参 _doseq_ 的值为 `True`，则每个键的值序列元素生成单个 `key=value` 对（以 `'&'` 分隔）。 被编码的字符串中的参数顺序将与序列中的形参元素顺序相匹配。

_safe_, _encoding_ 和 _errors_ 形参会被传递给 _quote\_via_ (_encoding_ 和 _errors_ 形参仅在查询元素为 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 时会被传递)。

为了反向执行这个编码过程，此模块提供了 [`parse_qs()`](#urllib.parse.parse_qs "urllib.parse.parse_qs") 和 [`parse_qsl()`](#urllib.parse.parse_qsl "urllib.parse.parse_qsl") 来将查询字符串解析为 Python 数据结构。

请参考 [urllib 示例](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib-examples) 来了解如何使用 [`urllib.parse.urlencode()`](#urllib.parse.urlencode "urllib.parse.urlencode") 方法来生成 URL 的查询字符串或 POST 请求的数据。

在 3.2 版本发生变更: _query_ 支持字节和字符串对象。

在 3.5 版本发生变更: 增加了 _quote\_via_ 形参。

自 3.14 版本弃用: 接受具有假值的对象 (如 `0` 和 `[]`) 但空字符串、字节型对象和 `None` 除外的做法现已被弃用。

参见

[WHATWG](https://url.spec.whatwg.org/) - URL 现有标准

定义 URL、域名、IP 地址、application/x-www-form-urlencoded 格式及其 API 的工作组。

[**RFC 3986**](https://datatracker.ietf.org/doc/html/rfc3986.html) - 统一资源标识符

这是当前的标准 (STD66)。 任何对于 urllib.parse 模块的修改都必须遵循该标准。 某些偏离也可能会出现，这大都是出于向下兼容的目的以及特定的经常存在于各主要浏览器上的实际解析需求。

[**RFC 2732**](https://datatracker.ietf.org/doc/html/rfc2732.html) - URL 中的 IPv6 地址字面显示格式。

这指明了 IPv6 URL 的解析要求。

[**RFC 2396**](https://datatracker.ietf.org/doc/html/rfc2396.html) - 统一资源标识符（URI）：通用语法

描述统一资源名称 (URN) 和统一资源定位符 (URL) 通用语法要求的文档。

[**RFC 2368**](https://datatracker.ietf.org/doc/html/rfc2368.html) - mailto URL 模式。

mailto URL 模式的解析要求。

[**RFC 1808**](https://datatracker.ietf.org/doc/html/rfc1808.html) - 相对统一资源定位符

这个请求注释包括联结绝对和相对 URL 的规则，其中包括大量控制边界情况处理的 "异常示例"。

[**RFC 1738**](https://datatracker.ietf.org/doc/html/rfc1738.html) - 统一资源定位符 (URL)

这指明了绝对 URL 的正式语义和句法。
