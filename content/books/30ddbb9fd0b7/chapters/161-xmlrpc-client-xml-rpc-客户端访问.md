**源代码:** [Lib/xmlrpc/client.py](https://github.com/python/cpython/tree/3.14/Lib/xmlrpc/client.py)

* * *

XML-RPC 是一种远程过程调用方法，它以使用 HTTP(S) 传递的 XML 作为载体。 通过它，客户端可以在远程服务器（服务器以 URI 指明）上调用带参数的方法并获取结构化的数据。 本模块支持编写 XML-RPC 客户端代码；它会处理在通用 Python 对象和 XML 之间进行线上转换的所有细节。

警告

`xmlrpc.client` 模块对于恶意构造的数据是不安全的。 如果你需要解析不受信任或未经验证的数据，请参阅 [XML 安全](https://docs.python.org/zh-cn/3/library/xml.html#xml-security)。

在 3.5 版本发生变更: 对于 HTTPS URI，`xmlrpc.client` 现在默认会执行所有必要的证书和主机名检查。

_class_ xmlrpc.client.ServerProxy(_uri_, _transport\=None_, _encoding\=None_, _verbose\=False_, _allow\_none\=False_, _use\_datetime\=False_, _use\_builtin\_types\=False_, _\*_, _headers\=()_, _context\=None_)[¶](#xmlrpc.client.ServerProxy "Link to this definition")

[`ServerProxy`](#xmlrpc.client.ServerProxy "xmlrpc.client.ServerProxy") 实例是管理与远程 XML-RPC 服务器通信的对象。 要求的第一个参数为 URI (统一资源标识符)，通常就是服务器的 URL。 可选的第二个参数为传输工厂实例；在默认情况下对于 https: URL 是一个内部 `SafeTransport` 实例，在其他情况下则是一个内部 HTTP `Transport` 实例。 可选的第三个参数为编码格式，默认为 UTF-8。 可选的第四个参数为调试旗标。

下列形参控制所返回代理实例的使用。 如果 _allow\_none_ 为真值，则 Python 常量 `None` 将被转写至 XML；默认行为是针对 `None` 引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。 这是对 XML-RPC 规格的一个常用扩展，但并不被所有客户端和服务器所支持；请参阅 [http://ontosys.com/xml-rpc/extensions.php](https://web.archive.org/web/20130120074804/http://ontosys.com/xml-rpc/extensions.php) 了解详情。 _use\_builtin\_types_ 旗标可被用来将日期/时间值表示为 [`datetime.datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.datetime "datetime.datetime") 对象而将二进制数据表示为 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象；此旗标默认为假值。 `datetime.datetime`, `bytes` 和 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 对象可以被传给调用操作。 _headers_ 形参为可选的随每次请求发送的 HTTP 标头序列，其形式为包含代表标头名称和值的 2 元组序列。 (例如 `[('Header-Name', 'value')]`)。 如果提供了 HTTPS URL，则 _context_ 可以为 [`ssl.SSLContext`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.SSLContext "ssl.SSLContext") 并配置底层 HTTPS 连接的 SSL 设置。 已过时的 _use\_datetime_ 旗标与 _use\_builtin\_types_ 类似但它只适用于日期/时间值。

在 3.3 版本发生变更: 增加了 _use\_builtin\_types_ 旗标。

在 3.8 版本发生变更: 增加了 _headers_ 形参。

HTTP 和 HTTPS 传输均支持用于 HTTP 基本身份验证的 URL 语法扩展: `http://user:pass@host:port/path`。 `user:pass` 部分将以 base64 编码为 HTTP 'Authorization' 标头，并在唤起 XML-RPC 方法时作为连接过程的一部分发送给远程服务器。 你只需要在远程服务器要求基本身份验证用户名和密码时使用此语法。

返回的实例是一个代理对象，具有可被用来在远程服务器上发起相应 RPC 调用的方法。 如果远程服务器支持内省 API，则也可使用该代理对象在远程服务器上查询它所支持的方法（服务发现）并获取其他服务器相关的元数据

适用的类型（即可通过 XML 进行编组），包括如下类型（除了已说明的例外，它们都会被反编组为同样的 Python 类型）:

| 
XML-RPC 类型

 | 

Python 类型

 |
| --- | --- |
| 

`boolean`

 | 

[`bool`](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")

 |
| 

`int`, `i1`, `i2`, `i4`, `i8` 或者 `biginteger`

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 的范围从 -2147483648 到 2147483647。值将获得 `<int>` 标志。

 |
| 

`double` 或 `float`

 | 

[`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")。值将获得 `<double>` 标志。

 |
| 

`string`

 | 

[`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")

 |
| 

`array`

 | 

[`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 或 [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple") 包含适用的元素。数组以 `lists` 形式返回。

 |
| 

`struct`

 | 

[`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict")。 键必须为字符串，值可以为任何适用的类型。 可以传入用户自定义类的对象；只有其 [`__dict__`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__dict__ "object.__dict__") 属性会被传输。

 |
| 

`dateTime.iso8601`

 | 

[`DateTime`](#xmlrpc.client.DateTime "xmlrpc.client.DateTime") 或 [`datetime.datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.datetime "datetime.datetime")。返回的类型取决于 _use\_builtin\_types_ 和 _use\_datetime_ 标志的值。

 |
| 

`base64`

 | 

[`Binary`](#xmlrpc.client.Binary "xmlrpc.client.Binary"), [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 或 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray")。返回的类型取决于 _use\_builtin\_types_ 标志的值。

 |
| 

`nil`

 | 

`None` 常量。仅当 _allow\_none_ 为真值时才允许传递。

 |
| 

`bigdecimal`

 | 

[`decimal.Decimal`](https://docs.python.org/zh-cn/3/library/decimal.html#decimal.Decimal "decimal.Decimal")。 仅返回类型。

 |

这是 XML-RPC 所支持数据类型的完整集合。 方法调用也可能引发一个特殊的 [`Fault`](#xmlrpc.client.Fault "xmlrpc.client.Fault") 实例，用来提示 XML-RPC 服务器错误，或是用 [`ProtocolError`](#xmlrpc.client.ProtocolError "xmlrpc.client.ProtocolError") 来提示 HTTP/HTTPS 传输层中的错误。 `Fault` 和 `ProtocolError` 都派生自名为 `Error` 的基类。 请注意 xmlrpc client 模块目前不可编组内置类型的子类的实例。

当传入字符串时，XML 中的特殊字符如 `<`, `>` 和 `&` 将被自动转义。 但是，调用方有责任确保字符串中没有 XML 中不允许的字符，例如 ASCII 值在 0 和 31 之间的控制字符（当然，制表、换行和回车除外）；不这样做将导致 XML-RPC 请求的 XML 格式不正确。 如果你必须通过 XML-RPC 传入任意字节数据，请使用 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 或 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 类或者下文描述的 [`Binary`](#xmlrpc.client.Binary "xmlrpc.client.Binary") 包装器类。

`Server` 被保留作为 [`ServerProxy`](#xmlrpc.client.ServerProxy "xmlrpc.client.ServerProxy") 的别名用于向下兼容。 新的代码应当使用 `ServerProxy`。

在 3.5 版本发生变更: 增加了 _context_ 参数。

在 3.6 版本发生变更: 增加了对带有前缀的类型标签的支持 (例如 `ex:nil`)。 增加了对反编组被 Apache XML-RPC 实现用于表示数值的附加类型的支持: `i1`, `i2`, `i8`, `biginteger`, `float` 和 `bigdecimal`。 请参阅 [https://ws.apache.org/xmlrpc/types.html](https://ws.apache.org/xmlrpc/types.html) 了解详情。

## ServerProxy 对象[¶](#serverproxy-objects "Link to this heading")

A [`ServerProxy`](#xmlrpc.client.ServerProxy "xmlrpc.client.ServerProxy") instance has a method corresponding to each remote procedure call accepted by the XML-RPC server. Calling the method performs an RPC, dispatched by both name and argument signature (e.g. the same method name can be overloaded with multiple argument signatures). The RPC finishes by returning a value, which may be either returned data in a conformant type or a [`Fault`](#xmlrpc.client.Fault "xmlrpc.client.Fault") or [`ProtocolError`](#xmlrpc.client.ProtocolError "xmlrpc.client.ProtocolError") object indicating an error.

支持 XML 内省 API 的服务器还支持一些以保留的 `system` 属性分组的通用方法:

ServerProxy.system.listMethods()[¶](#xmlrpc.client.ServerProxy.system.listMethods "Link to this definition")

此方法返回一个字符串列表，每个字符串都各自对应 XML-RPC 服务器所支持的（非系统）方法。

ServerProxy.system.methodSignature(_name_)[¶](#xmlrpc.client.ServerProxy.system.methodSignature "Link to this definition")

此方法接受一个形参，即某个由 XML-RPC 服务器所实现的方法名称。 它返回一个由此方法可能的签名组成的数组。 一个签名就是一个类型数组。 这些类型中的第一个是方法的返回类型，其余的均为形参。

由于允许多个签名（即重载），此方法是返回一个签名列表而非一个单例。

签名本身被限制为一个方法所期望的最高层级形参。 举例来说如果一个方法期望有一个结构体数组作为形参，并返回一个字符串，则其签名就是 "string, array"。 如果它期望有三个整数并返回一个字符串，则其签名是 "string, int, int, int"。

如果方法没有定义任何签名，则将返回一个非数组值。 在 Python 中这意味着返回值的类型为列表以外的类型。

ServerProxy.system.methodHelp(_name_)[¶](#xmlrpc.client.ServerProxy.system.methodHelp "Link to this definition")

此方法接受一个形参，即 XML-RPC 服务器所实现的某个方法的名称。 它返回描述相应方法用法的文档字符串。 如果没有可用的文档字符串，则返回空字符串。 文档字符串可以包含 HTML 标记。

以下是一个可运行的示例。 服务器端代码:

from xmlrpc.server import SimpleXMLRPCServer

def is\_even(n):
    return n % 2 \== 0

server \= SimpleXMLRPCServer(("localhost", 8000))
print("Listening on port 8000...")
server.register\_function(is\_even, "is\_even")
server.serve\_forever()

前述服务器的客户端代码:

import xmlrpc.client

with xmlrpc.client.ServerProxy("http://localhost:8000/") as proxy:
    print("3 is even: %s" % str(proxy.is\_even(3)))
    print("100 is even: %s" % str(proxy.is\_even(100)))

## DateTime 对象[¶](#datetime-objects "Link to this heading")

_class_ xmlrpc.client.DateTime[¶](#xmlrpc.client.DateTime "Link to this definition")

该类的初始化可以使用距离 Unix 纪元的秒数、时间元组、ISO 8601 时间/日期字符串或 [`datetime.datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.datetime "datetime.datetime") 实例。 它具有下列方法，主要是为编组和反编组代码的内部使用提供支持:

decode(_string_)[¶](#xmlrpc.client.DateTime.decode "Link to this definition")

接受一个字符串作为实例的新时间值。

encode(_out_)[¶](#xmlrpc.client.DateTime.encode "Link to this definition")

将此 [`DateTime`](#xmlrpc.client.DateTime "xmlrpc.client.DateTime") 条目的 XML-RPC 编码格式写入到 _out_ 流对象。

它还通过 [`富比较`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__lt__ "object.__lt__") 和 [`__repr__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__repr__ "object.__repr__") 方法来支持特定的 Python 内置运算符。

以下是一个可运行的示例。 服务器端代码:

import datetime as dt
from xmlrpc.server import SimpleXMLRPCServer
import xmlrpc.client

def today():
    today \= dt.datetime.today()
    return xmlrpc.client.DateTime(today)

server \= SimpleXMLRPCServer(("localhost", 8000))
print("Listening on port 8000...")
server.register\_function(today, "today")
server.serve\_forever()

前述服务器的客户端代码:

import xmlrpc.client
import datetime as dt

proxy \= xmlrpc.client.ServerProxy("http://localhost:8000/")

today \= proxy.today()
\# 将 ISO 8601 字符串转换为日期时间对象
converted \= dt.datetime.strptime(today.value, "%Y%m%dT%H:%M:%S")
print(f"Today: {converted.strftime('%d.%m.%Y, %H:%M')}")

## Binary 对象[¶](#binary-objects "Link to this heading")

_class_ xmlrpc.client.Binary[¶](#xmlrpc.client.Binary "Link to this definition")

该类的初始化可以使用字节数据（可包括 NUL）。 对 [`Binary`](#xmlrpc.client.Binary "xmlrpc.client.Binary") 对象内容的主要访问是由一个属性来提供的:

data[¶](#xmlrpc.client.Binary.data "Link to this definition")

被 [`Binary`](#xmlrpc.client.Binary "xmlrpc.client.Binary") 实例封装的二进制数据。 该数据以 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象的形式提供。

[`Binary`](#xmlrpc.client.Binary "xmlrpc.client.Binary") 对象具有下列方法，支持这些方法主要是供编组和反编组代码在内部使用:

decode(_bytes_)[¶](#xmlrpc.client.Binary.decode "Link to this definition")

接受一个 base64 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象并将其解码为实例的新数据。

encode(_out_)[¶](#xmlrpc.client.Binary.encode "Link to this definition")

将此二进制条目的 XML-RPC base 64 编码格式写入到 _out_ 流对象。

被编码数据将依据 [**RFC 2045 第 6.8 节**](https://datatracker.ietf.org/doc/html/rfc2045.html#section-6.8) 每 76 个字符换行一次，这是撰写 XML-RPC 规范说明时 base64 规范的事实标准。

它还通过 [`__eq__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__eq__ "object.__eq__") 和 [`__ne__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__ne__ "object.__ne__") 方法来支持特定的 Python 内置运算符。

该二进制对象的示例用法。 我们将通过 XMLRPC 来传输一张图片:

from xmlrpc.server import SimpleXMLRPCServer
import xmlrpc.client

def python\_logo():
    with open("python\_logo.jpg", "rb") as handle:
        return xmlrpc.client.Binary(handle.read())

server \= SimpleXMLRPCServer(("localhost", 8000))
print("Listening on port 8000...")
server.register\_function(python\_logo, 'python\_logo')

server.serve\_forever()

客户端会获取图片并将其保存为一个文件:

import xmlrpc.client

proxy \= xmlrpc.client.ServerProxy("http://localhost:8000/")
with open("fetched\_python\_logo.jpg", "wb") as handle:
    handle.write(proxy.python\_logo().data)

## Fault 对象[¶](#fault-objects "Link to this heading")

_class_ xmlrpc.client.Fault[¶](#xmlrpc.client.Fault "Link to this definition")

[`Fault`](#xmlrpc.client.Fault "xmlrpc.client.Fault") 对象封装了 XML-RPC fault 标签的内容。 Fault 对象具有下列属性:

faultCode[¶](#xmlrpc.client.Fault.faultCode "Link to this definition")

一个指明 fault 类型的整数。

faultString[¶](#xmlrpc.client.Fault.faultString "Link to this definition")

一个包含与 fault 相关联的诊断消息的字符串。

在接下来的示例中我们将通过返回一个复数类型的值来故意引发一个 [`Fault`](#xmlrpc.client.Fault "xmlrpc.client.Fault")。 服务器端代码:

from xmlrpc.server import SimpleXMLRPCServer

\# 将发生编组错误因为我们将返回一个复数
def add(x, y):
    return x+y+0j

server \= SimpleXMLRPCServer(("localhost", 8000))
print("Listening on port 8000...")
server.register\_function(add, 'add')

server.serve\_forever()

前述服务器的客户端代码:

import xmlrpc.client

proxy \= xmlrpc.client.ServerProxy("http://localhost:8000/")
try:
    proxy.add(2, 5)
except xmlrpc.client.Fault as err:
    print("A fault occurred")
    print("Fault code: %d" % err.faultCode)
    print("Fault string: %s" % err.faultString)

## ProtocolError 对象[¶](#protocolerror-objects "Link to this heading")

_class_ xmlrpc.client.ProtocolError[¶](#xmlrpc.client.ProtocolError "Link to this definition")

[`ProtocolError`](#xmlrpc.client.ProtocolError "xmlrpc.client.ProtocolError") 对象描述了下层传输层中的协议错误（例如当 URI 所指定的服务器不存在时的 404 'not found' 错误）。 它具有下列属性:

url[¶](#xmlrpc.client.ProtocolError.url "Link to this definition")

触发错误的 URI 或 URL。

errcode[¶](#xmlrpc.client.ProtocolError.errcode "Link to this definition")

错误代码。

errmsg[¶](#xmlrpc.client.ProtocolError.errmsg "Link to this definition")

错误消息或诊断字符串。

一个包含触发错误的 HTTP/HTTPS 请求的标头的字典。

在接下来的示例中我们将通过提供一个无效的 URI 来故意引发一个 [`ProtocolError`](#xmlrpc.client.ProtocolError "xmlrpc.client.ProtocolError"):

import xmlrpc.client

\# 创建一个 ServerProxy，所用 URI 不与 XMLRPC 请求对应
proxy \= xmlrpc.client.ServerProxy("http://google.com/")

try:
    proxy.some\_method()
except xmlrpc.client.ProtocolError as err:
    print("A protocol error occurred")
    print("URL: %s" % err.url)
    print("HTTP/HTTPS headers: %s" % err.headers)
    print("Error code: %d" % err.errcode)
    print("Error message: %s" % err.errmsg)

## MultiCall 对象[¶](#multicall-objects "Link to this heading")

[`MultiCall`](#xmlrpc.client.MultiCall "xmlrpc.client.MultiCall") 对象提供了一种将对远程服务器的多个调用封装为一个单独请求的方式 [\[1\]](#id6)。

_class_ xmlrpc.client.MultiCall(_server_)[¶](#xmlrpc.client.MultiCall "Link to this definition")

Create an object used to boxcar method calls. _server_ is the eventual target of the call. Calls can be made to the result object, but they will immediately return `None`, and only store the call name and parameters in the `MultiCall` object. Calling the object itself causes all stored calls to be transmitted as a single `system.multicall` request. The result of this call is a [generator](https://docs.python.org/zh-cn/3/glossary.html#term-generator); iterating over this generator yields the individual results.

以下是该类的用法示例。 服务器端代码:

from xmlrpc.server import SimpleXMLRPCServer

def add(x, y):
    return x + y

def subtract(x, y):
    return x \- y

def multiply(x, y):
    return x \* y

def divide(x, y):
    return x // y

\# 一个带有简单算术函数的简单服务器
server \= SimpleXMLRPCServer(("localhost", 8000))
print("Listening on port 8000...")
server.register\_multicall\_functions()
server.register\_function(add, 'add')
server.register\_function(subtract, 'subtract')
server.register\_function(multiply, 'multiply')
server.register\_function(divide, 'divide')
server.serve\_forever()

前述服务器的客户端代码:

import xmlrpc.client

proxy \= xmlrpc.client.ServerProxy("http://localhost:8000/")
multicall \= xmlrpc.client.MultiCall(proxy)
multicall.add(7, 3)
multicall.subtract(7, 3)
multicall.multiply(7, 3)
multicall.divide(7, 3)
result \= multicall()

print("7+3=%d, 7-3=%d, 7\*3=%d, 7//3=%d" % tuple(result))

## 便捷函数[¶](#convenience-functions "Link to this heading")

xmlrpc.client.dumps(_params_, _methodname\=None_, _methodresponse\=None_, _encoding\=None_, _allow\_none\=False_)[¶](#xmlrpc.client.dumps "Link to this definition")

将 _params_ 转换为一个 XML-RPC 请求，或者当 _methodresponse_ 为真值时转换为一个响应。 _params_ 可以是一个参数元组或一个 [`Fault`](#xmlrpc.client.Fault "xmlrpc.client.Fault") 异常类的实例。 如果 _methodresponse_ 为真值，则只能返回单个值，这意味着 _params_ 的长度必须为 1。 如果提供了 _encoding_，则会在生成的 XML 中使用该编码格式；默认值为 UTF-8。 Python 的 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None") 值不可在标准 XML-RPC 中使用；要通过扩展来允许使用它，请为 _allow\_none_ 提供真值。

xmlrpc.client.loads(_data_, _use\_datetime\=False_, _use\_builtin\_types\=False_)[¶](#xmlrpc.client.loads "Link to this definition")

将一个 XML-RPC 请求或响应转换为 Python 对象 `(params, methodname)`。 _params_ 是一个参数元组；_methodname_ 是一个字符串，或者如果数据包没有提供方法名则为 `None`。 如果 XML-RPC 数据包是代表一个故障条件，则此函数将引发一个 [`Fault`](#xmlrpc.client.Fault "xmlrpc.client.Fault") 异常。 _use\_builtin\_types_ 旗标可被用于将日期/时间值表示为 [`datetime.datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.datetime "datetime.datetime") 对象并将二进制数据表示为 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象；此旗标默认为假值。

已过时的 _use\_datetime_ 旗标与 _use\_builtin\_types_ 类似但只作用于日期/时间值。

在 3.3 版本发生变更: 增加了 _use\_builtin\_types_ 旗标。

## 客户端用法的示例[¶](#example-of-client-usage "Link to this heading")

\# 简单的测试程序（来自 XML-RPC 规范说明）
from xmlrpc.client import ServerProxy, Error

\# server = ServerProxy("http://localhost:8000") # 本地服务器
with ServerProxy("http://betty.userland.com") as proxy:

    print(proxy)

    try:
        print(proxy.examples.getStateName(41))
    except Error as v:
        print("ERROR", v)

要通过 HTTP 代理访问一个 XML-RPC 服务器，你必须自行定义一个传输。 下面的例子演示了具体做法:

import http.client
import xmlrpc.client

class ProxiedTransport(xmlrpc.client.Transport):

    def set\_proxy(self, host, port\=None, headers\=None):
        self.proxy \= host, port
        self.proxy\_headers \= headers

    def make\_connection(self, host):
        connection \= http.client.HTTPConnection(\*self.proxy)
        connection.set\_tunnel(host, headers\=self.proxy\_headers)
        self.\_connection \= host, connection
        return connection

transport \= ProxiedTransport()
transport.set\_proxy('proxy-server', 8080)
server \= xmlrpc.client.ServerProxy('http://betty.userland.com', transport\=transport)
print(server.examples.getStateName(41))

## 客户端与服务器用法的示例[¶](#example-of-client-and-server-usage "Link to this heading")

参见 [SimpleXMLRPCServer 示例](https://docs.python.org/zh-cn/3/library/xmlrpc.server.html#simplexmlrpcserver-example)。

备注
