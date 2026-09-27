**源代码：** [Lib/http/server.py](https://github.com/python/cpython/tree/3.14/Lib/http/server.py)

* * *

这个模块定义了用于实现 HTTP 服务器的类。

警告

不建议将 `http.server` 用于生产环境。 它仅实现了 [基本安全检测](#http-server-security)。

[`HTTPServer`](#http.server.HTTPServer "http.server.HTTPServer") 是 [`socketserver.TCPServer`](https://docs.python.org/zh-cn/3/library/socketserver.html#socketserver.TCPServer "socketserver.TCPServer") 的一个子类。它会创建和侦听 HTTP 套接字，并将请求分发给处理程序。创建和运行 HTTP 服务器的代码类似如下所示:

def run(server\_class\=HTTPServer, handler\_class\=BaseHTTPRequestHandler):
    server\_address \= ('', 8000)
    httpd \= server\_class(server\_address, handler\_class)
    httpd.serve\_forever()

_class_ http.server.HTTPServer(_server\_address_, _RequestHandlerClass_)[¶](#http.server.HTTPServer "Link to this definition")

该类在 [`TCPServer`](https://docs.python.org/zh-cn/3/library/socketserver.html#socketserver.TCPServer "socketserver.TCPServer") 类之上通过将服务器地址保存至名为 [`server_name`](#http.server.HTTPServer.server_name "http.server.HTTPServer.server_name") 和 [`server_port`](#http.server.HTTPServer.server_port "http.server.HTTPServer.server_port") 的实例变量来构建。 服务器可通过处理器访问，通常是通过处理器的 [`server`](https://docs.python.org/zh-cn/3/library/socketserver.html#socketserver.BaseRequestHandler.server "socketserver.BaseRequestHandler.server") 实例变量。

server\_name[¶](#http.server.HTTPServer.server_name "Link to this definition")

HTTP 服务器的完整限定域名。

server\_port[¶](#http.server.HTTPServer.server_port "Link to this definition")

从 _server\_address_ 获取的 HTTP 服务器端口号。

_class_ http.server.ThreadingHTTPServer(_server\_address_, _RequestHandlerClass_)[¶](#http.server.ThreadingHTTPServer "Link to this definition")

该类与 HTTPServer 相同，只是会利用 [`ThreadingMixIn`](https://docs.python.org/zh-cn/3/library/socketserver.html#socketserver.ThreadingMixIn "socketserver.ThreadingMixIn") 对请求进行多线程处理。当需要对 Web 浏览器预先打开套接字进行处理时，这就很有用，这时 [`HTTPServer`](#http.server.HTTPServer "http.server.HTTPServer") 会一直等待请求。

Added in version 3.7.

_class_ http.server.HTTPSServer(_server\_address_, _RequestHandlerClass_, _bind\_and\_activate\=True_, _\*_, _certfile_, _keyfile\=None_, _password\=None_, _alpn\_protocols\=None_)[¶](#http.server.HTTPSServer "Link to this definition")

使用 [`ssl`](https://docs.python.org/zh-cn/3/library/ssl.html#module-ssl "ssl: TLS/SSL wrapper for socket objects") 模块的封装套接字的 [`HTTPServer`](#http.server.HTTPServer "http.server.HTTPServer") 子类。如果 `ssl` 模块不可用，实例化 `HTTPSServer` 对象将失败，并返回 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")。

_certfile_ 参数是 SSL 证书链文件的路径，而 _keyfile_ 是包含私钥的文件的路径。

可以为受PKCS#8保护和包装的文件指定 _password_ ，但要注意，这可能会以明文形式暴露硬编码的密码。

当指定时，_alpn\_protocols_ 参数必须是指定服务器支持的“应用层协议协商”（ALPN）协议的字符串序列。ALPN 允许服务器和客户端在 TLS 握手期间协商应用协议。

默认情况下，它将被设为 `["http/1.1"]`，表示服务器支持 HTTP/1.1。

Added in version 3.14.

_class_ http.server.ThreadingHTTPSServer(_server\_address_, _RequestHandlerClass_, _bind\_and\_activate\=True_, _\*_, _certfile_, _keyfile\=None_, _password\=None_, _alpn\_protocols\=None_)[¶](#http.server.ThreadingHTTPSServer "Link to this definition")

此类与 [`HTTPSServer`](#http.server.HTTPSServer "http.server.HTTPSServer") 相同，但通过继承 [`ThreadingMixIn`](https://docs.python.org/zh-cn/3/library/socketserver.html#socketserver.ThreadingMixIn "socketserver.ThreadingMixIn") 使用线程来处理请求。这类似于仅使用 `HTTPSServer` 的 [`ThreadingHTTPServer`](#http.server.ThreadingHTTPServer "http.server.ThreadingHTTPServer")。

Added in version 3.14.

实例化 [`HTTPServer`](#http.server.HTTPServer "http.server.HTTPServer")、 [`ThreadingHTTPServer`](#http.server.ThreadingHTTPServer "http.server.ThreadingHTTPServer")、[`HTTPSServer`](#http.server.HTTPSServer "http.server.HTTPSServer") 和 [`ThreadingHTTPSServer`](#http.server.ThreadingHTTPSServer "http.server.ThreadingHTTPSServer") 时，必须给出一个 _RequestHandlerClass_，该模块提供了三种不同的变体：

_class_ http.server.BaseHTTPRequestHandler(_request_, _client\_address_, _server_)[¶](#http.server.BaseHTTPRequestHandler "Link to this definition")

这个类用于处理到达服务器的 HTTP 请求。它本身无法响应任何实际的 HTTP 请求；它必须被子类化以处理每个请求方法 (例如 `'GET'` 或 `'POST'`)。 [`BaseHTTPRequestHandler`](#http.server.BaseHTTPRequestHandler "http.server.BaseHTTPRequestHandler") 提供了多个供子类使用的类和实例变量以及方法。

这个处理器将解析请求和标头，然后调用特定请求类型对应的方法。方法名称将根据请求来构造。例如，对于请求方法 `SPAM`，将不带参数地调用 `do_SPAM()` 方法。所有相关信息会被保存在该处理器的实例变量中。子类不应需要重写或扩展 `__init__()` 方法。

[`BaseHTTPRequestHandler`](#http.server.BaseHTTPRequestHandler "http.server.BaseHTTPRequestHandler") 具有下列实例变量：

client\_address[¶](#http.server.BaseHTTPRequestHandler.client_address "Link to this definition")

包含 `(host, port)` 形式的指向客户端地址的元组。

server[¶](#http.server.BaseHTTPRequestHandler.server "Link to this definition")

包含服务器实例。

close\_connection[¶](#http.server.BaseHTTPRequestHandler.close_connection "Link to this definition")

应当在 [`handle_one_request()`](#http.server.BaseHTTPRequestHandler.handle_one_request "http.server.BaseHTTPRequestHandler.handle_one_request") 返回之前设定的布尔值，指明是否要期待另一个请求，还是应当关闭连接。

requestline[¶](#http.server.BaseHTTPRequestHandler.requestline "Link to this definition")

包含 HTTP 请求行的字符串表示。末尾的 CRLF 会被去除。该属性应当由 [`handle_one_request()`](#http.server.BaseHTTPRequestHandler.handle_one_request "http.server.BaseHTTPRequestHandler.handle_one_request") 来设定。 如果无有效请求行被处理，则它应当被设为空字符串。

command[¶](#http.server.BaseHTTPRequestHandler.command "Link to this definition")

包含具体的命令（请求类型）。例如 `'GET'`。

path[¶](#http.server.BaseHTTPRequestHandler.path "Link to this definition")

包含请求路径。 如果 URL 的查询部分存在，则 `path` 会包括这个查询部分。 如果使用 [**RFC 3986**](https://datatracker.ietf.org/doc/html/rfc3986.html) 的术语，这里的 `path` 包括 `hier-part` 和 `query`。

request\_version[¶](#http.server.BaseHTTPRequestHandler.request_version "Link to this definition")

包含请求的版本字符串。例如 `'HTTP/1.0'`。

headers[¶](#http.server.BaseHTTPRequestHandler.headers "Link to this definition")

存放由 [`MessageClass`](#http.server.BaseHTTPRequestHandler.MessageClass "http.server.BaseHTTPRequestHandler.MessageClass") 类变量所指定的类的实例。该实例会解析并管理 HTTP 请求中的标头。 [`http.client`](https://docs.python.org/zh-cn/3/library/http.client.html#module-http.client "http.client: HTTP and HTTPS protocol client (requires sockets).") 中的 [`parse_headers()`](https://docs.python.org/zh-cn/3/library/http.client.html#http.client.parse_headers "http.client.parse_headers") 函数将被用来解析标头并且它需要 HTTP 请求提供有效的 [**RFC 5322**](https://datatracker.ietf.org/doc/html/rfc5322.html) 风格的标头。

rfile[¶](#http.server.BaseHTTPRequestHandler.rfile "Link to this definition")

一个 [`io.BufferedIOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase "io.BufferedIOBase") 输入流，准备从可选的输入数据的开头进行读取。

wfile[¶](#http.server.BaseHTTPRequestHandler.wfile "Link to this definition")

包含用于写入响应并发回给客户端的输出流。在写入流时必须正确遵守 HTTP 协议以便成功地实现与 HTTP 客户端的互操作。

[`BaseHTTPRequestHandler`](#http.server.BaseHTTPRequestHandler "http.server.BaseHTTPRequestHandler") 具有下列属性：

server\_version[¶](#http.server.BaseHTTPRequestHandler.server_version "Link to this definition")

指定服务器软件版本。你可能会想要重写该属性。该属性的格式为多个以空格分隔的字符串，其中每个字符串的形式为 name\[/version\]。例如 `'BaseHTTP/0.2'`.

sys\_version[¶](#http.server.BaseHTTPRequestHandler.sys_version "Link to this definition")

包含 Python 系统版本，采用 [`version_string`](#http.server.BaseHTTPRequestHandler.version_string "http.server.BaseHTTPRequestHandler.version_string") 方法和 [`server_version`](#http.server.BaseHTTPRequestHandler.server_version "http.server.BaseHTTPRequestHandler.server_version") 类变量所支持的形式。例如 `'Python/1.4'`。

error\_message\_format[¶](#http.server.BaseHTTPRequestHandler.error_message_format "Link to this definition")

Specifies a format string that should be used by [`send_error()`](#http.server.BaseHTTPRequestHandler.send_error "http.server.BaseHTTPRequestHandler.send_error") method for building an error response to the client. The string is filled by default with variables from [`responses`](#http.server.BaseHTTPRequestHandler.responses "http.server.BaseHTTPRequestHandler.responses") based on the status code passed to `send_error()`.

error\_content\_type[¶](#http.server.BaseHTTPRequestHandler.error_content_type "Link to this definition")

指定发送给客户端的错误响应的 Content-Type HTTP 标头。默认值为 `'text/html'`。

protocol\_version[¶](#http.server.BaseHTTPRequestHandler.protocol_version "Link to this definition")

指定服务器所符合的 HTTP 版本。它会在响应中发送以便让客户端知道服务器对于未来请求的通信能力。如果设置为 `'HTTP/1.1'`，服务器将允许 HTTP 持久连接；但是，你的服务器 _必须_ 在所有对客户端的响应中包括一个准确的 `Content-Length` 标头 (使用 [`send_header()`](#http.server.BaseHTTPRequestHandler.send_header "http.server.BaseHTTPRequestHandler.send_header"))。为了保持向下兼容性，该设置默认为 `'HTTP/1.0'`。

MessageClass[¶](#http.server.BaseHTTPRequestHandler.MessageClass "Link to this definition")

指定一个 [`email.message.Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") 这样的类来解析 HTTP 标头。通常该属性不会被重写，其默认值为 [`http.client.HTTPMessage`](https://docs.python.org/zh-cn/3/library/http.client.html#http.client.HTTPMessage "http.client.HTTPMessage").

responses[¶](#http.server.BaseHTTPRequestHandler.responses "Link to this definition")

该属性包含一个整数错误代码与由短消息和长消息组成的二元组的映射。例如，`{code: (shortmessage, longmessage)}`。 _shortmessage_ 通常是作为消息响应中的 _message_ 键，而 _longmessage_ 则是作为 _explain_ 键。 该属性会被 [`send_response_only()`](#http.server.BaseHTTPRequestHandler.send_response_only "http.server.BaseHTTPRequestHandler.send_response_only") 和 [`send_error()`](#http.server.BaseHTTPRequestHandler.send_error "http.server.BaseHTTPRequestHandler.send_error") 方法所使用。

[`BaseHTTPRequestHandler`](#http.server.BaseHTTPRequestHandler "http.server.BaseHTTPRequestHandler") 实例具有下列方法：

handle()[¶](#http.server.BaseHTTPRequestHandler.handle "Link to this definition")

调用 [`handle_one_request()`](#http.server.BaseHTTPRequestHandler.handle_one_request "http.server.BaseHTTPRequestHandler.handle_one_request") 一次（或者如果启用了永久连接则为多次）来处理传入的 HTTP 请求。 你应该永远不需要重写它；而是要实现适当的 `do_*()` 方法。

handle\_one\_request()[¶](#http.server.BaseHTTPRequestHandler.handle_one_request "Link to this definition")

此方法将解析请求并将其分配给适当的 `do_*()` 方法。你应该永远不需要重写它。

handle\_expect\_100()[¶](#http.server.BaseHTTPRequestHandler.handle_expect_100 "Link to this definition")

When an HTTP/1.1 conformant server receives an `Expect: 100-continue` request header it responds with a `100 Continue` followed by `200 OK` headers. This method can be overridden to raise an error if the server does not want the client to continue. For example, the server can choose to send `417 Expectation Failed` as a response header and `return False`.

Added in version 3.2.

send\_error(_code_, _message\=None_, _explain\=None_)[¶](#http.server.BaseHTTPRequestHandler.send_error "Link to this definition")

发送并记录回复给客户端的完整的错误信息。数字形式的 _code_ 指明 HTTP 错误代码，可选的 _message_ 为简短的易于人类阅读的错误描述。 _explain_ 参数可被用于提供更详细的错误信息；它将使用 [`error_message_format`](#http.server.BaseHTTPRequestHandler.error_message_format "http.server.BaseHTTPRequestHandler.error_message_format") 属性来进行格式化并在一组完整的标头之后作为响应体被发送。 [`responses`](#http.server.BaseHTTPRequestHandler.responses "http.server.BaseHTTPRequestHandler.responses") 属性保存了 _message_ 和 _explain_ 的默认值并将在未提供值时被使用；对于未知代码这两者的默认值均为字符串 `???`。 如果方法为 HEAD 或响应代码为下列值之一则响应体将为空：`1_xx_`, `204 No Content`, `205 Reset Content`, `304 Not Modified`.

在 3.4 版本发生变更: 错误响应包括一个 Content-Length 标头。增加了 _explain_ 参数。

send\_response(_code_, _message\=None_)[¶](#http.server.BaseHTTPRequestHandler.send_response "Link to this definition")

将一个响应标头添加到标头缓冲区并记录被接受的请求。HTTP 响应行会被写入到内部缓冲区，后面是 _Server_ 和 _Date_ 标头。 这两个标头的值将分别通过 [`version_string()`](#http.server.BaseHTTPRequestHandler.version_string "http.server.BaseHTTPRequestHandler.version_string") 和 [`date_time_string()`](#http.server.BaseHTTPRequestHandler.date_time_string "http.server.BaseHTTPRequestHandler.date_time_string") 方法获取。 如果服务器不打算使用 [`send_header()`](#http.server.BaseHTTPRequestHandler.send_header "http.server.BaseHTTPRequestHandler.send_header") 方法发送任何其他标头，则 [`send_response()`](#http.server.BaseHTTPRequestHandler.send_response "http.server.BaseHTTPRequestHandler.send_response") 后面应该跟一个 [`end_headers()`](#http.server.BaseHTTPRequestHandler.end_headers "http.server.BaseHTTPRequestHandler.end_headers") 调用。

在 3.3 版本发生变更: 标头会被存储到内部缓冲区并且需要显式地调用 [`end_headers()`](#http.server.BaseHTTPRequestHandler.end_headers "http.server.BaseHTTPRequestHandler.end_headers")。

send\_header(_keyword_, _value_)[¶](#http.server.BaseHTTPRequestHandler.send_header "Link to this definition")

将 HTTP 标头添加到内部缓冲区，它将在 [`end_headers()`](#http.server.BaseHTTPRequestHandler.end_headers "http.server.BaseHTTPRequestHandler.end_headers") 或 [`flush_headers()`](#http.server.BaseHTTPRequestHandler.flush_headers "http.server.BaseHTTPRequestHandler.flush_headers") 被调用时写入输出流。 _keyword_ 应当指定标头关键字，并以 _value_ 指定其值。请注意，在 send\_header 调用结束之后，必须调用 `end_headers()` 以便完成操作。

此方法不会拒绝包含 CRLF 序列的输入。

在 3.2 版本发生变更: 标头将被存入内部缓冲区。

send\_response\_only(_code_, _message\=None_)[¶](#http.server.BaseHTTPRequestHandler.send_response_only "Link to this definition")

Sends the response header only, used for the purposes when `100 Continue` response is sent by the server to the client. The headers are not buffered and sent directly the output stream. If the _message_ is not specified, the HTTP message corresponding the response _code_ is sent.

此方法不会拒绝包含 CRLF 序列的 _message_。

Added in version 3.2.

end\_headers()[¶](#http.server.BaseHTTPRequestHandler.end_headers "Link to this definition")

将一个空行（指明响应中 HTTP 标头的结束) 添加到标头缓冲区并调用 [`flush_headers()`](#http.server.BaseHTTPRequestHandler.flush_headers "http.server.BaseHTTPRequestHandler.flush_headers")。

在 3.2 版本发生变更: 已缓冲的标头会被写入到输出流。

flush\_headers()[¶](#http.server.BaseHTTPRequestHandler.flush_headers "Link to this definition")

最终将标头发送到输出流并清空内部标头缓冲区。

Added in version 3.3.

log\_request(_code\='-'_, _size\='-'_)[¶](#http.server.BaseHTTPRequestHandler.log_request "Link to this definition")

记录一次被接受（成功）的请求。 _code_ 应当指定与响应相关联的 HTTP 代码。如果响应的大小可用，则它应当作为 _size_ 形参传入。

log\_error(_..._)[¶](#http.server.BaseHTTPRequestHandler.log_error "Link to this definition")

当请求无法完成时记录一次错误。默认情况下，它会将消息传给 [`log_message()`](#http.server.BaseHTTPRequestHandler.log_message "http.server.BaseHTTPRequestHandler.log_message")，因此它接受同样的参数 (_format_ 和一些额外的值)。

log\_message(_format_, _..._)[¶](#http.server.BaseHTTPRequestHandler.log_message "Link to this definition")

Logs an arbitrary message to `sys.stderr`. This is typically overridden to create custom error logging mechanisms. The _format_ argument is a standard printf-style format string, where the additional arguments to `log_message()` are applied as inputs to the formatting. The client IP address and current date and time are prefixed to every message logged.

version\_string()[¶](#http.server.BaseHTTPRequestHandler.version_string "Link to this definition")

返回服务器软件的版本字符串。该值为 [`server_version`](#http.server.BaseHTTPRequestHandler.server_version "http.server.BaseHTTPRequestHandler.server_version") 与 [`sys_version`](#http.server.BaseHTTPRequestHandler.sys_version "http.server.BaseHTTPRequestHandler.sys_version") 属性的组合。

date\_time\_string(_timestamp\=None_)[¶](#http.server.BaseHTTPRequestHandler.date_time_string "Link to this definition")

返回由 _timestamp_ 所给定的日期和时间（参数应为 `None` 或为 [`time.time()`](https://docs.python.org/zh-cn/3/library/time.html#time.time "time.time") 所返回的格式），格式化为一个消息标头。如果省略 _timestamp_，则会使用当前日期和时间。

结果看起来像 `'Sun, 06 Nov 1994 08:49:37 GMT'`。

log\_date\_time\_string()[¶](#http.server.BaseHTTPRequestHandler.log_date_time_string "Link to this definition")

返回当前的日期和时间，为日志格式化。

address\_string()[¶](#http.server.BaseHTTPRequestHandler.address_string "Link to this definition")

返回客户端的地址。

在 3.3 版本发生变更: 在之前版本中，会执行一次名称查找。为了避免名称解析的时延，现在将总是返回 IP 地址。

_class_ http.server.SimpleHTTPRequestHandler(_request_, _client\_address_, _server_, _directory\=None_)[¶](#http.server.SimpleHTTPRequestHandler "Link to this definition")

这个类会为目录 _directory_ 及以下的文件提供发布服务，或者如果未提供 _directory_ 则为当前目录，直接将目录结构映射到 HTTP 请求。

在 3.7 版本发生变更: 增加了 _directory_ 形参。

诸如解析请求之类的大量工作都是由基类 [`BaseHTTPRequestHandler`](#http.server.BaseHTTPRequestHandler "http.server.BaseHTTPRequestHandler") 完成的。本类实现了 [`do_GET()`](#http.server.SimpleHTTPRequestHandler.do_GET "http.server.SimpleHTTPRequestHandler.do_GET") 和 [`do_HEAD()`](#http.server.SimpleHTTPRequestHandler.do_HEAD "http.server.SimpleHTTPRequestHandler.do_HEAD") 函数。

以下是 [`SimpleHTTPRequestHandler`](#http.server.SimpleHTTPRequestHandler "http.server.SimpleHTTPRequestHandler") 的类属性。

server\_version[¶](#http.server.SimpleHTTPRequestHandler.server_version "Link to this definition")

这会是 `"SimpleHTTP/" + __version__`，其中 `__version__` 定义于模块级别。

index\_pages[¶](#http.server.SimpleHTTPRequestHandler.index_pages "Link to this definition")

指定将会被当作目录索引页的文件名。

默认为 `("index.html", "index.htm")`。

Added in version 3.12.

extensions\_map[¶](#http.server.SimpleHTTPRequestHandler.extensions_map "Link to this definition")

将后缀映射为 MIME 类型的字典，其中包含了覆盖系统默认值的自定义映射关系。不区分大小写，因此字典键只应为小写值。

在 3.9 版本发生变更: 此字典不再填充默认的系统映射，而只包含覆盖值。

[`SimpleHTTPRequestHandler`](#http.server.SimpleHTTPRequestHandler "http.server.SimpleHTTPRequestHandler") 类定义了以下方法：

do\_HEAD()[¶](#http.server.SimpleHTTPRequestHandler.do_HEAD "Link to this definition")

本方法为 `'HEAD'` 请求提供服务：它将发送等同于 `GET` 请求的标头。关于可能的标头的更完整解释，请参阅 [`do_GET()`](#http.server.SimpleHTTPRequestHandler.do_GET "http.server.SimpleHTTPRequestHandler.do_GET") 方法。

do\_GET()[¶](#http.server.SimpleHTTPRequestHandler.do_GET "Link to this definition")

通过将请求解释为相对于当前工作目录的路径，将请求映射到某个本地文件。

If the request was mapped to a directory, the directory is checked for an index page as specified by [`index_pages`](#http.server.SimpleHTTPRequestHandler.index_pages "http.server.SimpleHTTPRequestHandler.index_pages"). If found, the file's contents are returned; otherwise a directory listing is generated by calling the [`list_directory()`](#http.server.SimpleHTTPRequestHandler.list_directory "http.server.SimpleHTTPRequestHandler.list_directory") method. This method uses [`os.listdir()`](https://docs.python.org/zh-cn/3/library/os.html#os.listdir "os.listdir") to scan the directory, and returns a `404` error response if the `listdir()` fails.

如果请求被映射到文件，则会打开该文件。打开文件时的任何 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 异常都会被映射为 `404`, `'File not found'` 错误。如果请求中带有 `'If-Modified-Since'` 标头，而在此时间点之后文件未作修改，则会发送 `304`, `'Not Modified'` 的响应。否则会调用 [`guess_type()`](#http.server.SimpleHTTPRequestHandler.guess_type "http.server.SimpleHTTPRequestHandler.guess_type") 方法猜测内容的类型，该方法会反过来用到 _extensions\_map_ 变量，并返回文件内容。

将会输出 `'Content-type:'` 头部信息，带上猜出的内容类型，然后是 `'Content-Length:'` 头部信息，带有文件的大小，以及 `'Last-Modified:'` 头部信息，带有文件的修改时间。

随后跟一个空行来指明标头的结束，再随后是输出文件内容。

示例用法请见在 [Lib/http/server.py](https://github.com/python/cpython/tree/3.14/Lib/http/server.py) 中 `test` 函数的实现。

在 3.7 版本发生变更: 为 `'If-Modified-Since'` 头部信息提供支持。

list\_directory(_path_)[¶](#http.server.SimpleHTTPRequestHandler.list_directory "Link to this definition")

Helper to list the contents of _path_ when no index page is present.

This returns either a [file-like object](https://docs.python.org/zh-cn/3/glossary.html#term-file-like-object) (which must be closed by the caller) or `None` to indicate an error, in which case the caller has nothing further to do. In either case, the headers are sent.

guess\_type(_path_)[¶](#http.server.SimpleHTTPRequestHandler.guess_type "Link to this definition")

Guess the type of the file at the given _path_.

This returns a string of the form `type/subtype`, usable for a MIME Content-type header.

The default implementation looks the file's extension up in [`extensions_map`](#http.server.SimpleHTTPRequestHandler.extensions_map "http.server.SimpleHTTPRequestHandler.extensions_map"), falling back to [`mimetypes.guess_file_type()`](https://docs.python.org/zh-cn/3/library/mimetypes.html#mimetypes.guess_file_type "mimetypes.guess_file_type") and then to `'application/octet-stream'`.

[`SimpleHTTPRequestHandler`](#http.server.SimpleHTTPRequestHandler "http.server.SimpleHTTPRequestHandler") 类可用于像下面这样创建一个非常基本的 Web 服务器以当前目录为相对基准来发布文件:

import http.server
import socketserver

PORT \= 8000

Handler \= http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve\_forever()

[`SimpleHTTPRequestHandler`](#http.server.SimpleHTTPRequestHandler "http.server.SimpleHTTPRequestHandler") can also be subclassed to enhance behavior, such as using different index file names by overriding the class attribute [`index_pages`](#http.server.SimpleHTTPRequestHandler.index_pages "http.server.SimpleHTTPRequestHandler.index_pages").

_class_ http.server.CGIHTTPRequestHandler(_request_, _client\_address_, _server_)[¶](#http.server.CGIHTTPRequestHandler "Link to this definition")

该类可为当前及以下目录中的文件或 CGI 脚本的输出提供服务。注意，把 HTTP 分层结构映射到本地目录结构，这与 [`SimpleHTTPRequestHandler`](#http.server.SimpleHTTPRequestHandler "http.server.SimpleHTTPRequestHandler") 完全一样。

备注

由 [`CGIHTTPRequestHandler`](#http.server.CGIHTTPRequestHandler "http.server.CGIHTTPRequestHandler") 类运行的 CGI 脚本不能进行重定向操作（HTTP 代码 302），因为在执行 CGI 脚本之前会发送代码 200（接下来就输出脚本）。这样状态码就冲突了。

然而，如果这个类猜测它是一个 CGI 脚本，那么就会运行该 CGI 脚本，而不是作为文件提供出去。只会识别基于目录的 CGI —— 另有一种常用的服务器设置，即标识 CGI 脚本是通过特殊的扩展名。

The [`do_GET()`](#http.server.SimpleHTTPRequestHandler.do_GET "http.server.SimpleHTTPRequestHandler.do_GET") and [`do_HEAD()`](#http.server.SimpleHTTPRequestHandler.do_HEAD "http.server.SimpleHTTPRequestHandler.do_HEAD") functions are modified to run CGI scripts and serve the output, instead of serving files, if the request leads to somewhere below the `cgi_directories` path.

[`CGIHTTPRequestHandler`](#http.server.CGIHTTPRequestHandler "http.server.CGIHTTPRequestHandler") 定义了以下数据成员：

cgi\_directories[¶](#http.server.CGIHTTPRequestHandler.cgi_directories "Link to this definition")

默认为 `['/cgi-bin', '/htbin']`，视作 CGI 脚本所在目录。

[`CGIHTTPRequestHandler`](#http.server.CGIHTTPRequestHandler "http.server.CGIHTTPRequestHandler") 定义了以下方法：

do\_POST()[¶](#http.server.CGIHTTPRequestHandler.do_POST "Link to this definition")

本方法服务于 `'POST'` 请求，仅用于 CGI 脚本。如果试图向非 CGI 网址发送 POST 请求，则会输出错误 501："Can only POST to CGI scripts"。

请注意，为了保证安全性，CGI 脚本将以用户 nobody 的 UID 运行。CGI 脚本运行错误将被转换为错误 403。

从 3.13 版起已弃用，将在 3.15 版中移除: [`CGIHTTPRequestHandler`](#http.server.CGIHTTPRequestHandler "http.server.CGIHTTPRequestHandler") 将在 3.15 中移除。早在十多年前 CGI 就已不被认为是一个好的解决方案。 目前此代码已长期未得到维护并且极少被实际使用。保留它可能导致进一步的 [安全考量](#http-server-security)。

## 命令行接口[¶](#command-line-interface "Link to this heading")

`http.server` can also be invoked directly using the [`-m`](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-m) switch of the interpreter. The following example illustrates how to serve files relative to the current directory:

python \-m http.server \[OPTIONS\] \[port\]

可以接受以下选项：

port[¶](#cmdoption-http.server-arg-port "Link to this definition")

服务器默认监听 8000 端口。 该默认值可以通过传入所需的端口号作为参数来覆盖：

python \-m http.server 9000

\-b, \--bind <address>[¶](#cmdoption-http.server-b "Link to this definition")

Specifies a specific address to which it should bind. Both IPv4 and IPv6 addresses are supported. By default, the server binds itself to all interfaces. For example, the following command causes the server to bind to localhost only:

python \-m http.server \--bind 127.0.0.1

Added in version 3.4.

在 3.8 版本发生变更: 在 `--bind` 选项中支持 IPv6。

\-d, \--directory <dir>[¶](#cmdoption-http.server-d "Link to this definition")

Specifies a directory to which it should serve the files. By default, the server uses the current directory. For example, the following command uses a specific directory:

python \-m http.server \--directory /tmp/

Added in version 3.7.

\-p, \--protocol <version>[¶](#cmdoption-http.server-p "Link to this definition")

指定服务器所采用的 HTTP 版本。 在默认情况下，服务器会采用 HTTP/1.0。 例如，以下命令将运行一个支持 HTTP/1.1 的服务器：

python \-m http.server \--protocol HTTP/1.1

Added in version 3.11.

\--cgi[¶](#cmdoption-http.server-cgi "Link to this definition")

通过在命令行传入 `--cgi` 参数，可以启用 [`CGIHTTPRequestHandler`](#http.server.CGIHTTPRequestHandler "http.server.CGIHTTPRequestHandler"):

python \-m http.server \--cgi

从 3.13 版起已弃用，将在 3.15 版中移除: `http.server` 命令行的 `--cgi` 支持已被移除因为 [`CGIHTTPRequestHandler`](#http.server.CGIHTTPRequestHandler "http.server.CGIHTTPRequestHandler") 也要被移除。

警告

[`CGIHTTPRequestHandler`](#http.server.CGIHTTPRequestHandler "http.server.CGIHTTPRequestHandler") 和 `--cgi` 命令行选项不适合不受信任的客户端使用且容易被恶意利用。 应当始终在安全的环境中使用。

\--tls-cert[¶](#cmdoption-http.server-tls-cert "Link to this definition")

为 HTTPS 连接指定一个 TLS 证书链：

python \-m http.server \--tls-cert fullchain.pem

Added in version 3.14.

\--tls-key[¶](#cmdoption-http.server-tls-key "Link to this definition")

为 HTTPS 连接指定一个私有密钥文件。

该选项要求已指定 `--tls-cert`。

Added in version 3.14.

\--tls-password-file[¶](#cmdoption-http.server-tls-password-file "Link to this definition")

为带密码保护的私钥指定密码文件：

python \-m http.server \\
       \--tls-cert cert.pem \\
       \--tls-key key.pem \\
       \--tls-password-file password.txt

该选项要求已指定 `--tls-cert`。

Added in version 3.14.

## 安全考量[¶](#security-considerations "Link to this heading")

[`SimpleHTTPRequestHandler`](#http.server.SimpleHTTPRequestHandler "http.server.SimpleHTTPRequestHandler") will follow symbolic links when handling requests which makes it possible for files outside of the specified directory to be served.

Methods [`BaseHTTPRequestHandler.send_header()`](#http.server.BaseHTTPRequestHandler.send_header "http.server.BaseHTTPRequestHandler.send_header") and [`BaseHTTPRequestHandler.send_response_only()`](#http.server.BaseHTTPRequestHandler.send_response_only "http.server.BaseHTTPRequestHandler.send_response_only") assume sanitized input and do not perform input validation such as checking for the presence of CRLF sequences. Untrusted input may result in HTTP header injection attacks.

较早版本的 Python 不会擦除从 `python -m http.server` 或默认的 [`BaseHTTPRequestHandler`](#http.server.BaseHTTPRequestHandler "http.server.BaseHTTPRequestHandler") `.log_message` 实现发送到 stderr 的日志消息中的控制字符。 这可能允许连接到你的服务器的远程客户端向你的终端发送恶意的控制代码。

在 3.12 版本发生变更: 控制字符会在 stderr 日志中被擦除。
