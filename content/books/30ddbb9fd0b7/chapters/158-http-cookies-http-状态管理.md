**源代码:** [Lib/http/cookies.py](https://github.com/python/cpython/tree/3.14/Lib/http/cookies.py)

* * *

The `http.cookies` module defines classes for abstracting the concept of cookies, an HTTP state management mechanism. It supports both simple string-only cookies, and provides an abstraction for having any serializable data-type as cookie value.

之前该模块严格应用了 [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html) 和 [**RFC 2068**](https://datatracker.ietf.org/doc/html/rfc2068.html) 规范中描述的解析规则。后来人们发现 MSIE 3.0x 并未遵循这些规范中描述的字符规则；目前各种浏览器和服务器在处理 cookie 时也放宽了解析规则。因此，该模块目前使用的解析规则也没有以前那么严格了。

字符集 [`string.ascii_letters`](https://docs.python.org/zh-cn/3/library/string.html#string.ascii_letters "string.ascii_letters"), [`string.digits`](https://docs.python.org/zh-cn/3/library/string.html#string.digits "string.digits") 和 ``!#$%&'*+-.^_`|~:`` 标明了本模块允许在 cookie 名称中出现的有效字符 (如 [`key`](#http.cookies.Morsel.key "http.cookies.Morsel.key"))。

在 3.3 版本发生变更: 允许 ':' 作为有效的 cookie 名称字符。

备注

当遇到无效 cookie 时会触发 [`CookieError`](#http.cookies.CookieError "http.cookies.CookieError")，所以若 cookie 数据来自浏览器，一定要做好应对无效数据的准备，并在解析时捕获 `CookieError`。

_exception_ http.cookies.CookieError[¶](#http.cookies.CookieError "Link to this definition")

出现异常的原因，可能是不符合 [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html)：属性不正确、 头部信息不正确等等。

_class_ http.cookies.BaseCookie(\[_input_\])[¶](#http.cookies.BaseCookie "Link to this definition")

类似字典的对象，字典键为字符串，字典值是 [`Morsel`](#http.cookies.Morsel "http.cookies.Morsel") 实例。请注意，在将键值关联时，首先会把值转换为包含键和值的 `Morsel` 对象。

若给出 _input_ ，将会传给 [`load()`](#http.cookies.BaseCookie.load "http.cookies.BaseCookie.load") 方法。

_class_ http.cookies.SimpleCookie(\[_input_\])[¶](#http.cookies.SimpleCookie "Link to this definition")

该类派生自 [`BaseCookie`](#http.cookies.BaseCookie "http.cookies.BaseCookie") 并重写了 [`value_decode()`](#http.cookies.BaseCookie.value_decode "http.cookies.BaseCookie.value_decode") 和 [`value_encode()`](#http.cookies.BaseCookie.value_encode "http.cookies.BaseCookie.value_encode")。 `SimpleCookie` 支持用字符串作为 cookie 值。 在设置值时，`SimpleCookie` 会调用内置 [`str()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 将值转换为字符串。从 HTTP 接收的值仍然保持为字符串。

## Cookie 对象[¶](#cookie-objects "Link to this heading")

BaseCookie.value\_decode(_val_)[¶](#http.cookies.BaseCookie.value_decode "Link to this definition")

由字符串返回元组 `(real_value, coded_value)`。`real_value` 可为任意类型。[`BaseCookie`](#http.cookies.BaseCookie "http.cookies.BaseCookie") 中的此方法未实现任何解码工作——只为能被子类重写。

BaseCookie.value\_encode(_val_)[¶](#http.cookies.BaseCookie.value_encode "Link to this definition")

返回元组 `(real_value, coded_value)`。_val_ 可为任意类型，`coded_value` 则会转换为字符串。 [`BaseCookie`](#http.cookies.BaseCookie "http.cookies.BaseCookie") 中的此方法未实现任何编码工作——只为能被子类重写。

通常在 _value\_decode_ 的取值范围内，[`value_encode()`](#http.cookies.BaseCookie.value_encode "http.cookies.BaseCookie.value_encode") 和 [`value_decode()`](#http.cookies.BaseCookie.value_decode "http.cookies.BaseCookie.value_decode") 应为可互逆操作。

BaseCookie.output(_attrs\=None_, _header\='Set-Cookie:'_, _sep\='\\r\\n'_)[¶](#http.cookies.BaseCookie.output "Link to this definition")

返回可作为 HTTP 标头信息发送的字符串表示。 _attrs_ 和 _header_ 会发给每个 [`Morsel`](#http.cookies.Morsel "http.cookies.Morsel") 的 [`output()`](#http.cookies.Morsel.output "http.cookies.Morsel.output") 方法。 _sep_ 用来将标头连接在一起，默认为 `'\r\n'` (CRLF) 组合。

BaseCookie.js\_output(_attrs\=None_)[¶](#http.cookies.BaseCookie.js_output "Link to this definition")

返回一段可供嵌入的 JavaScript 代码，若在支持 JavaScript 的浏览器上运行，其作用如同发送 HTTP 头部信息一样。

_attrs_ 的含义与 [`output()`](#http.cookies.BaseCookie.output "http.cookies.BaseCookie.output") 的相同。

BaseCookie.load(_rawdata_)[¶](#http.cookies.BaseCookie.load "Link to this definition")

若 _rawdata_ 为字符串，则会作为 `HTTP_COOKIE` 进行解析，并将找到的值添加为 [`Morsel`](#http.cookies.Morsel "http.cookies.Morsel")。 如果是字典值，则等价于:

for k, v in rawdata.items():
    cookie\[k\] \= v

## Morsel 对象[¶](#morsel-objects "Link to this heading")

_class_ http.cookies.Morsel[¶](#http.cookies.Morsel "Link to this definition")

对键/值对的抽象，带有 [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html) 的部分属性。

morsel 对象类似于字典，它的键是一组常量 --- 即有效的 [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html) 属性，包括：

> expires[¶](#http.cookies.Morsel.expires "Link to this definition")
> 
> path[¶](#http.cookies.Morsel.path "Link to this definition")
> 
> domain[¶](#http.cookies.Morsel.domain "Link to this definition")
> 
> max-age
> 
> secure[¶](#http.cookies.Morsel.secure "Link to this definition")
> 
> version[¶](#http.cookies.Morsel.version "Link to this definition")
> 
> httponly[¶](#http.cookies.Morsel.httponly "Link to this definition")
> 
> samesite[¶](#http.cookies.Morsel.samesite "Link to this definition")
> 
> partitioned[¶](#http.cookies.Morsel.partitioned "Link to this definition")

[`httponly`](#http.cookies.Morsel.httponly "http.cookies.Morsel.httponly") 属性指明了该 cookie 仅在 HTTP 请求中传输，且不能通过 JavaScript 访问。这是为了减轻某些跨站脚本攻击的危害。

属性 [`samesite`](#http.cookies.Morsel.samesite "http.cookies.Morsel.samesite") 控制浏览器在跨站请求中何时发送 Cookie，这有助于缓解 CSRF（跨站请求伪造）攻击。有效取值包括 "Strict"（严格模式）：仅在同站请求中发送 Cookie、"Lax"（宽松模式）：在同站请求和顶层导航（如链接跳转）中发送 Cookie，以及 "None"（无限制模式）：在同站和跨站请求中均发送 Cookie。当设置为 "None" 时，必须同时设置 "secure" 属性（要求 Cookie 仅通过 HTTPS 传输），这是现代浏览器的强制要求。

属性 [`partitioned`](#http.cookies.Morsel.partitioned "http.cookies.Morsel.partitioned") 提示用户代理这些跨站点 cookie _应当_ 仅在首次设置 cookie 所在的同一最高层级上下文中可用。要让它被用户代理所接受，你还 **必须** 设置 `Secure`。

此外，还建议在设置分块 cookie 时使用 `__Host` 前缀以使其绑定到主机名而非可注册域。请参阅 [CHIPS (Cookies Having Independent Partitioned State)](https://github.com/privacycg/CHIPS/blob/main/README.md) 获取完整说明和示例。

键不区分大小写，默认值为 `''`。

在 3.5 版本发生变更: 现在 `__eq__()` 会同时考虑 [`key`](#http.cookies.Morsel.key "http.cookies.Morsel.key") 和 [`value`](#http.cookies.Morsel.value "http.cookies.Morsel.value")。

在 3.7 版本发生变更: [`key`](#http.cookies.Morsel.key "http.cookies.Morsel.key")、 [`value`](#http.cookies.Morsel.value "http.cookies.Morsel.value") 和 [`coded_value`](#http.cookies.Morsel.coded_value "http.cookies.Morsel.coded_value") 是只读属性。可用 [`set()`](#http.cookies.Morsel.set "http.cookies.Morsel.set") 进行设置。

在 3.8 版本发生变更: 增加对 [`samesite`](#http.cookies.Morsel.samesite "http.cookies.Morsel.samesite") 属性的支持。

在 3.14 版本发生变更: 增加对 [`partitioned`](#http.cookies.Morsel.partitioned "http.cookies.Morsel.partitioned") 属性的支持。

Morsel.value[¶](#http.cookies.Morsel.value "Link to this definition")

Cookie 的值。

Morsel.coded\_value[¶](#http.cookies.Morsel.coded_value "Link to this definition")

编码后的 cookie 值——也即要发送的内容。

Morsel.key[¶](#http.cookies.Morsel.key "Link to this definition")

cookie 名称。

Morsel.set(_key_, _value_, _coded\_value_)[¶](#http.cookies.Morsel.set "Link to this definition")

设置 _key_、_value_ 和 _coded\_value_ 属性。

Morsel.isReservedKey(_K_)[¶](#http.cookies.Morsel.isReservedKey "Link to this definition")

判断 _K_ 是否属于 [`Morsel`](#http.cookies.Morsel "http.cookies.Morsel") 的键。

Morsel.output(_attrs\=None_, _header\='Set-Cookie:'_)[¶](#http.cookies.Morsel.output "Link to this definition")

返回 morsel 的字符串形式，适用于作为 HTTP 头部信息进行发送。默认包含所有属性，除非给出 _attrs_ 属性列表。_header_ 默认为 `"Set-Cookie:"`。

Morsel.js\_output(_attrs\=None_)[¶](#http.cookies.Morsel.js_output "Link to this definition")

返回一段可供嵌入的 JavaScript 代码，若在支持 JavaScript 的浏览器上运行，其作用如同发送 HTTP 头部信息一样。

_attrs_ 的含义与 [`output()`](#http.cookies.Morsel.output "http.cookies.Morsel.output") 的相同。

Morsel.OutputString(_attrs\=None_)[¶](#http.cookies.Morsel.OutputString "Link to this definition")

返回 morsel 的字符串形式，不含 HTTP 或 JavaScript 数据。

_attrs_ 的含义与 [`output()`](#http.cookies.Morsel.output "http.cookies.Morsel.output") 的相同。

Morsel.update(_values_)[¶](#http.cookies.Morsel.update "Link to this definition")

用字典 _values_ 中的值更新 morsel 字典中的值。若有 _values_ 字典中的键不是有效的 [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html) 属性，则会触发错误。

在 3.5 版本发生变更: 无效键会触发错误。

Morsel.copy(_value_)[¶](#http.cookies.Morsel.copy "Link to this definition")

返回 morsel 对象的浅拷贝。

在 3.5 版本发生变更: 返回一个 morsel 对象，而非字典。

Morsel.setdefault(_key_, _value\=None_)[¶](#http.cookies.Morsel.setdefault "Link to this definition")

若 key 不是有效的 [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html) 属性则触发错误，否则与 [`dict.setdefault()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict.setdefault "dict.setdefault") 相同。

## 示例[¶](#example "Link to this heading")

The following example demonstrates how to use the `http.cookies` module.

\>>> from http import cookies
\>>> C \= cookies.SimpleCookie()
\>>> C\["fig"\] \= "newton"
\>>> C\["sugar"\] \= "wafer"
\>>> print(C) \# 生成 HTTP 标头
Set-Cookie: fig=newton
Set-Cookie: sugar=wafer
\>>> print(C.output()) \# 同样的内容
Set-Cookie: fig=newton
Set-Cookie: sugar=wafer
\>>> C \= cookies.SimpleCookie()
\>>> C\["rocky"\] \= "road"
\>>> C\["rocky"\]\["path"\] \= "/cookie"
\>>> print(C.output(header\="Cookie:"))
Cookie: rocky=road; Path=/cookie
\>>> print(C.output(attrs\=\[\], header\="Cookie:"))
Cookie: rocky=road
\>>> C \= cookies.SimpleCookie()
\>>> C.load("chips=ahoy; vienna=finger") \# 从字符串加载 (HTTP 标头)
\>>> print(C)
Set-Cookie: chips=ahoy
Set-Cookie: vienna=finger
\>>> C \= cookies.SimpleCookie()
\>>> C.load('keebler="E=everybody; L=\\\\"Loves\\\\"; fudge=;";')
\>>> print(C)
Set-Cookie: keebler="E=everybody; L=\\"Loves\\"; fudge=;"
\>>> C \= cookies.SimpleCookie()
\>>> C\["oreo"\] \= "doublestuff"
\>>> C\["oreo"\]\["path"\] \= "/"
\>>> print(C)
Set-Cookie: oreo=doublestuff; Path=/
\>>> C \= cookies.SimpleCookie()
\>>> C\["twix"\] \= "none for you"
\>>> C\["twix"\].value
'none for you'
\>>> C \= cookies.SimpleCookie()
\>>> C\["number"\] \= 7 \# 等价于 C\["number"\] = str(7)
\>>> C\["string"\] \= "seven"
\>>> C\["number"\].value
'7'
\>>> C\["string"\].value
'seven'
\>>> print(C)
Set-Cookie: number=7
Set-Cookie: string=seven
