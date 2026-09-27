**源代码:** [Lib/wsgiref](https://github.com/python/cpython/tree/3.14/Lib/wsgiref)

* * *

警告

`wsgiref` 是一个参考实现，不建议用于生产环境。该模块仅实现了基本的安全检查。

Web 服务器网关接口（WSGI）是 Web 服务器软件和用 Python 编写的 Web 应用程序之间的标准接口。 具有标准接口能够让支持 WSGI 的应用程序与多种不同的 Web 服务器配合使用。

只有 Web 服务器和编程框架的开发者才需要了解 WSGI 设计的每个细节和边界情况。 你不需要了解 WSGI 的每个细节而只需要安装一个 WSGI 应用程序或编写使用现有框架的 Web 应用程序。

`wsgiref` 是 WSGI 规范的一个参考实现，可用来为 Web 服务器或框架添加 WSGI 支持。 它提供了操作 WSGI 环境变量和响应标头的工具、实现 WSGI 服务器的基类、发布 WSGI 应用程序的演示 HTTP 服务器、用于静态类型检查的类型，以及检查 WSGI 服务器和应用程序是否符合 WSGI 规范 ([**PEP 3333**](https://peps.python.org/pep-3333/)) 的验证工具。

参看 [wsgi.readthedocs.io](https://wsgi.readthedocs.io/) 获取有关 WSGI 的更多信息，以及教程和其他资源的链接。

## `wsgiref.util` -- WSGI 环境工具[¶](#module-wsgiref.util "Link to this heading")

本模块提供了多种工具函数配合 WSGI 环境使用。 WSGI 环境就是一个包含 [**PEP 3333**](https://peps.python.org/pep-3333/) 所描述的 HTTP 请求变量的字典。 所有接受 _environ_ 形参的函数都会预期得到一个符合 WSGI 规范的字典；请参阅 [**PEP 3333**](https://peps.python.org/pep-3333/) 来了解相关规范的细节并请参阅 [`WSGIEnvironment`](#wsgiref.types.WSGIEnvironment "wsgiref.types.WSGIEnvironment") 来了解可被用于类型标注的类型别名。

wsgiref.util.guess\_scheme(_environ_)[¶](#wsgiref.util.guess_scheme "Link to this definition")

返回对于 `wsgi.url_scheme` 应为 "http" 还是 "https" 的猜测，具体方式是在 _environ_ 中检查 `HTTPS` 环境变量。 返回值是一个字符串。

此函数适用于创建一个包装了 CGI 或 CGI 类协议例如 FastCGI 的网关。 通常，提供这种协议的服务器将包括一个 `HTTPS` 变量并会在通过 SSL 接收请求时将其值设为 "1", "yes" 或 "on"。 这样，此函数会在找到上述值时返回 "https"，否则返回 "http"。

wsgiref.util.request\_uri(_environ_, _include\_query\=True_)[¶](#wsgiref.util.request_uri "Link to this definition")

使用 [**PEP 3333**](https://peps.python.org/pep-3333/) 的 "URL Reconstruction" 一节中的算法返回完整的请求 URL，可能包括查询字符串。 如果 _include\_query_ 为假值，则结果 URI 中将不包括查询字符串。

wsgiref.util.application\_uri(_environ_)[¶](#wsgiref.util.application_uri "Link to this definition")

类似于 [`request_uri()`](#wsgiref.util.request_uri "wsgiref.util.request_uri")，区别在于 `PATH_INFO` 和 `QUERY_STRING` 变量会被忽略。 结果为请求所指定的应用程序对象的基准 URI。

wsgiref.util.shift\_path\_info(_environ_)[¶](#wsgiref.util.shift_path_info "Link to this definition")

将单个名称从 `PATH_INFO` 变换为 `SCRIPT_NAME` 并返回该名称。 _environ_ 字典将被原地 _修改_；如果你需要保留原始 `PATH_INFO` 或 `SCRIPT_NAME` 不变请使用一个副本。

如果 `PATH_INFO` 中没有剩余的路径节，则返回 `None`。

通常，此例程被用来处理请求 URI 路径的每个部分，比如说将路径当作是一系列字典键。 此例程会修改传入的环境以使其适合唤起位于目标 URI 上的其他 WSGI 应用程序，如果有一个 WSGI 应用程序位于 `/foo`，而请求 URI 路径为 `/foo/bar/baz`，且位于 `/foo` 的 WSGI 应用程序调用了 [`shift_path_info()`](#wsgiref.util.shift_path_info "wsgiref.util.shift_path_info")，它将获得字符串 "bar"，而环境将被更新以适合传递给位于 `/foo/bar` 的 WSGI 应用程序。 也就是说，`SCRIPT_NAME` 将由 `/foo` 变为 `/foo/bar`，而 `PATH_INFO` 将由 `/bar/baz` 变为 `/baz`。

当 `PATH_INFO` 只是 "/" 时，此例程会返回一个空字符串并在 `SCRIPT_NAME` 末尾添加一个斜杠，虽然空的路径节通常会被忽略，并且 `SCRIPT_NAME` 通常也不以斜杠作为结束。 此行为是有意为之的，用来确保应用程序在使用此例程执行对象遍历时能区分以 `/x` 结束的和以 `/x/` 结束的 URI。

wsgiref.util.setup\_testing\_defaults(_environ_)[¶](#wsgiref.util.setup_testing_defaults "Link to this definition")

以简短的默认值更新 _environ_ 用于测试目的。

此例程会添加 WSGI 所需要的各种参数，包括 `HTTP_HOST`, `SERVER_NAME`, `SERVER_PORT`, `REQUEST_METHOD`, `SCRIPT_NAME`, `PATH_INFO` 以及 [**PEP 3333**](https://peps.python.org/pep-3333/) 中定义的所有 `wsgi.*` 变量。 它只提供默认值，而不会替换这些变量的现有设置。

此例程的目的是让 WSGI 服务器的单元测试以及应用程序设置测试环境更为容易。 它不应该被实际的 WSGI 服务器或应用程序所使用，因为它用的是假数据！

用法示例 (另请参阅 [`demo_app()`](#wsgiref.simple_server.demo_app "wsgiref.simple_server.demo_app") 中的其他示例):

from wsgiref.util import setup\_testing\_defaults
from wsgiref.simple\_server import make\_server

\# 一个相对简单的 WSGI 应用程序。 它将打印出
\# 由 setup\_testing\_defaults 更新之后的环境字典
def simple\_app(environ, start\_response):
    setup\_testing\_defaults(environ)

    status \= '200 OK'
    headers \= \[('Content-type', 'text/plain; charset=utf-8')\]

    start\_response(status, headers)

    ret \= \[("%s: %s\\n" % (key, value)).encode("utf-8")
           for key, value in environ.items()\]
    return ret

with make\_server('', 8000, simple\_app) as httpd:
    print("Serving on port 8000...")
    httpd.serve\_forever()

In addition to the environment functions above, the `wsgiref.util` module also provides these miscellaneous utilities:

wsgiref.util.is\_hop\_by\_hop(_header\_name_)[¶](#wsgiref.util.is_hop_by_hop "Link to this definition")

如果 'header\_name' 是 [**RFC 2616**](https://datatracker.ietf.org/doc/html/rfc2616.html) 所定义的 HTTP/1.1 "Hop-by-Hop" 标头则返回 `True`。

_class_ wsgiref.util.FileWrapper(_filelike_, _blksize\=8192_)[¶](#wsgiref.util.FileWrapper "Link to this definition")

一个 [`wsgiref.types.FileWrapper`](#wsgiref.types.FileWrapper "wsgiref.types.FileWrapper") 协议的具体实现，被用来将文件型对象转换为 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator)。 结果对象将为 [iterable](https://docs.python.org/zh-cn/3/glossary.html#term-iterable)。 当对象被迭代时，可选的 _blksize_ 形参将被反复地传给 _filelike_ 对象的 `read()` 方法以获取字节串并产生输出。 当 `read()` 返回空字节串时，迭代将结束并且不可再恢复。

如果 _filelike_ 具有 `close()` 方法，返回的对象也将具有 `close()` 方法，并且它将在被调用时唤起 _filelike_ 对象的 `close()` 方法。

用法示例:

from io import StringIO
from wsgiref.util import FileWrapper

\# 我们使用一个 StringIO 缓冲区作为文件型对象
filelike \= StringIO("This is an example file-like object"\*10)
wrapper \= FileWrapper(filelike, blksize\=5)

for chunk in wrapper:
    print(chunk)

## `wsgiref.simple_server` -- a simple WSGI HTTP server[¶](#module-wsgiref.simple_server "Link to this heading")

此模块实现了一个简单的 HTTP 服务器 (基于 [`http.server`](https://docs.python.org/zh-cn/3/library/http.server.html#module-http.server "http.server: HTTP server and request handlers.")) 来发布 WSGI 应用程序。 每个服务器实例会在给定的主机名和端口号上发布一个 WSGI 应用程序。 如果你想在一个主机名和端口号上发布多个应用程序，你应当创建一个通过解析 `PATH_INFO` 来选择每个请求要唤起哪个应用程序的 WSGI 应用程序。 (例如，使用 [`wsgiref.util`](#module-wsgiref.util "wsgiref.util: WSGI environment utilities.") 中的 `shift_path_info()` 函数。)

wsgiref.simple\_server.make\_server(_host_, _port_, _app_, _server\_class\=WSGIServer_, _handler\_class\=WSGIRequestHandler_)[¶](#wsgiref.simple_server.make_server "Link to this definition")

创建一个新的 WSGI 服务器并在 _host_ 和 _port_ 上进行监听，接受对 _app_ 的连接。 返回值是所提供的 _server\_class_ 的实例，并将使用指定的 _handler\_class_ 来处理请求。 _app_ 必须是一个如 [**PEP 3333**](https://peps.python.org/pep-3333/) 所定义的 WSGI 应用程序对象。

用法示例:

from wsgiref.simple\_server import make\_server, demo\_app

with make\_server('', 8000, demo\_app) as httpd:
    print("Serving HTTP on port 8000...")

    \# 响应请求直到进程被杀死
    httpd.serve\_forever()

    \# 或者：服务一次请求，然后退出
    httpd.handle\_request()

wsgiref.simple\_server.demo\_app(_environ_, _start\_response_)[¶](#wsgiref.simple_server.demo_app "Link to this definition")

This function is a small but complete WSGI application that returns a text page containing the message "Hello world!" and a list of the key/value pairs provided in the _environ_ parameter. It's useful for verifying that a WSGI server (such as `wsgiref.simple_server`) is able to run a simple WSGI application correctly.

_start\_response_ 可调用对象必须遵循 [`StartResponse`](#wsgiref.types.StartResponse "wsgiref.types.StartResponse") 协议。

_class_ wsgiref.simple\_server.WSGIServer(_server\_address_, _RequestHandlerClass_)[¶](#wsgiref.simple_server.WSGIServer "Link to this definition")

创建一个 [`WSGIServer`](#wsgiref.simple_server.WSGIServer "wsgiref.simple_server.WSGIServer") 实例。 _server\_address_ 应当是一个 `(host,port)` 元组，而 _RequestHandlerClass_ 应当是 [`http.server.BaseHTTPRequestHandler`](https://docs.python.org/zh-cn/3/library/http.server.html#http.server.BaseHTTPRequestHandler "http.server.BaseHTTPRequestHandler") 的子类，它将被用来处理请求。

你通常不需要调用此构造器，因为 [`make_server()`](#wsgiref.simple_server.make_server "wsgiref.simple_server.make_server") 函数能为你处理所有的细节。

[`WSGIServer`](#wsgiref.simple_server.WSGIServer "wsgiref.simple_server.WSGIServer") 是 [`http.server.HTTPServer`](https://docs.python.org/zh-cn/3/library/http.server.html#http.server.HTTPServer "http.server.HTTPServer") 的子类，因此它所有的方法 (例如 `serve_forever()` 和 `handle_request()`) 都是可用的。 `WSGIServer` 还提供了以下 WSGI 专属的方法:

set\_app(_application_)[¶](#wsgiref.simple_server.WSGIServer.set_app "Link to this definition")

将可调用对象 _application_ 设为将要接受请求的 WSGI 应用程序。

get\_app()[¶](#wsgiref.simple_server.WSGIServer.get_app "Link to this definition")

返回当前设置的应用程序可调用对象。

但是，你通常不需要使用这些附加的方法，因为 [`set_app()`](#wsgiref.simple_server.WSGIServer.set_app "wsgiref.simple_server.WSGIServer.set_app") 通常会由 [`make_server()`](#wsgiref.simple_server.make_server "wsgiref.simple_server.make_server") 来调用，而 [`get_app()`](#wsgiref.simple_server.WSGIServer.get_app "wsgiref.simple_server.WSGIServer.get_app") 主要是针对请求处理器实例的。

_class_ wsgiref.simple\_server.WSGIRequestHandler(_request_, _client\_address_, _server_)[¶](#wsgiref.simple_server.WSGIRequestHandler "Link to this definition")

为给定的 _request_ (即一个套接字)、_client\_address_ (一个 `(host,port)` 元组) 以及 _server_ ([`WSGIServer`](#wsgiref.simple_server.WSGIServer "wsgiref.simple_server.WSGIServer") 实例) 创建一个 HTTP 处理器。

你不需要直接创建该类的实例；它们会根据 [`WSGIServer`](#wsgiref.simple_server.WSGIServer "wsgiref.simple_server.WSGIServer") 对象的需要自动创建。 但是，你可以子类化该类并将其作为 _handler\_class_ 提供给 [`make_server()`](#wsgiref.simple_server.make_server "wsgiref.simple_server.make_server") 函数。 一些可能在子类中重载的相关方法:

get\_environ()[¶](#wsgiref.simple_server.WSGIRequestHandler.get_environ "Link to this definition")

返回对应于一个请求的 [`WSGIEnvironment`](#wsgiref.types.WSGIEnvironment "wsgiref.types.WSGIEnvironment") 字典。 默认实现会拷贝 [`WSGIServer`](#wsgiref.simple_server.WSGIServer "wsgiref.simple_server.WSGIServer") 对象的 `base_environ` 字典属性的内容然后添加从 HTTP 请求获取的各种标头。 对此方法的每次调用都应当返回一个新的包含 [**PEP 3333**](https://peps.python.org/pep-3333/) 所规定的所有相关 CGI 环境变量的字典。

get\_stderr()[¶](#wsgiref.simple_server.WSGIRequestHandler.get_stderr "Link to this definition")

返回应被用作 `wsgi.errors` 流的对象。 默认实现将只返回 `sys.stderr`。

handle()[¶](#wsgiref.simple_server.WSGIRequestHandler.handle "Link to this definition")

处理 HTTP 请求。 默认的实现会使用 [`wsgiref.handlers`](#module-wsgiref.handlers "wsgiref.handlers: WSGI server/gateway base classes.") 类创建一个处理器实例来实现实际的 WSGI 应用程序接口。

## `wsgiref.validate` --- WSGI conformance checker[¶](#module-wsgiref.validate "Link to this heading")

When creating new WSGI application objects, frameworks, servers, or middleware, it can be useful to validate the new code's conformance using `wsgiref.validate`. This module provides a function that creates WSGI application objects that validate communications between a WSGI server or gateway and a WSGI application object, to check both sides for protocol conformance.

请注意这个工具并不保证完全符合 [**PEP 3333**](https://peps.python.org/pep-3333/)；此模块没有报告错误并不一定表示不存在错误。 但是，如果此模块确实报告了错误，那么几乎可以肯定服务器或应用程序不是 100% 符合要求的。

此模块是基于 Ian Bicking 的 "Python Paste" 库的 `paste.lint` 模块。

wsgiref.validate.validator(_application_)[¶](#wsgiref.validate.validator "Link to this definition")

包装 _application_ 并返回一个新的 WSGI 应用程序对象。 返回的应用程序将转发所有请求到原始的 _application_，并将检查 _application_ 和唤起它的服务器是否都符合 WSGI 规范和 [**RFC 2616**](https://datatracker.ietf.org/doc/html/rfc2616.html)。

任何被检测到的不一致性都会导致引发 [`AssertionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#AssertionError "AssertionError")；但是请注意，如何对待这些错误取决于具体服务器。 例如，[`wsgiref.simple_server`](#module-wsgiref.simple_server "wsgiref.simple_server: A simple WSGI HTTP server.") 和其他基于 [`wsgiref.handlers`](#module-wsgiref.handlers "wsgiref.handlers: WSGI server/gateway base classes.") 的服务器（它们没有重载错误处理方法来做其他操作）将简单地输出一条消息报告发生了错误，并将回溯转给 `sys.stderr` 或者其他错误数据流。

这个包装器也可能会使用 [`warnings`](https://docs.python.org/zh-cn/3/library/warnings.html#module-warnings "warnings: Issue warning messages and control their disposition.") 模块生成输出来指明存在问题但实际上未被 [**PEP 3333**](https://peps.python.org/pep-3333/) 所禁止的行为。 除非它们被 Python 命令行选项或 `warnings` API 所屏蔽，否则任何此类警告都将被写入到 `sys.stderr` (_不是_ `wsgi.errors`，除非它们恰好是同一个对象)。

用法示例:

from wsgiref.validate import validator
from wsgiref.simple\_server import make\_server

\# 我们的可调用对象与标准是故意不兼容的，
\# 因此验证器将会出错
def simple\_app(environ, start\_response):
    status \= '200 OK'  \# HTTP 状态
    headers \= \[('Content-type', 'text/plain')\]  \# HTTP 标头
    start\_response(status, headers)

    \# 这将会出错因为我们需要返回一个列表，
    \# 验证器将会提醒我们
    return b"Hello World"

\# 这是包装在验证器中的应用程序
validator\_app \= validator(simple\_app)

with make\_server('', 8000, validator\_app) as httpd:
    print("Listening on port 8000....")
    httpd.serve\_forever()

## `wsgiref.handlers` -- server/gateway base classes[¶](#module-wsgiref.handlers "Link to this heading")

此模块提供了用于实现 WSGI 服务器和网关的处理器基类。 这些基类可处理大部分与 WSGI 应用程序通信的工作，只要给予它们一个带有输入、输出和错误流的 CGI 类环境。

_class_ wsgiref.handlers.CGIHandler[¶](#wsgiref.handlers.CGIHandler "Link to this definition")

通过 `sys.stdin`, `sys.stdout`, `sys.stderr` 和 `os.environ` 发起基于 CGI 的调用。 这在当你有一个 WSGI 应用程序并想将其作为 CGI 脚本运行时很有用处。 只需唤起 `CGIHandler().run(app)`，其中 `app` 是你想要唤起的 WSGI 应用程序。

该类是 [`BaseCGIHandler`](#wsgiref.handlers.BaseCGIHandler "wsgiref.handlers.BaseCGIHandler") 的子类，它将设置 `wsgi.run_once` 为真值，`wsgi.multithread` 为假值，`wsgi.multiprocess` 为真值，并总是使用 [`sys`](https://docs.python.org/zh-cn/3/library/sys.html#module-sys "sys: Access system-specific parameters and functions.") 和 [`os`](https://docs.python.org/zh-cn/3/library/os.html#module-os "os: Miscellaneous operating system interfaces.") 来获取所需的 CGI 流和环境。

_class_ wsgiref.handlers.IISCGIHandler[¶](#wsgiref.handlers.IISCGIHandler "Link to this definition")

[`CGIHandler`](#wsgiref.handlers.CGIHandler "wsgiref.handlers.CGIHandler") 的一个专门化替代，用于在 Microsoft 的 IIS Web 服务器上部署，无需设置 config allowPathInfo 选项 (IIS>=7) 或 metabase allowPathInfoForScriptMappings (IIS<7)。

默认情况下，IIS 给出的 `PATH_INFO` 会与前面的 `SCRIPT_NAME` 重复，导致想要实现路由的 WSGI 应用程序出现问题。 这个处理器会去除任何这样的重复路径。

IIS 可被配置为传递正确的 `PATH_INFO`，但这会导致另一个 `PATH_TRANSLATED` 出错的问题。 幸运的是这个变量很少被使用并且不被 WSGI 所保证。 但是在 IIS<7 上，这个设置只能在 vhost 层级上进行，影响到所有其他脚本映射，其中许多在受 `PATH_TRANSLATED` 问题影响时都会中断运行。 因此 IIS<7 的部署几乎从不附带这样的修正（即使 IIS7 也很少使用它，因为它仍然不带 UI）。

CGI 代码没有办法确定该选项是否已设置，因此提供了一个单独的处理器类。 它的用法与 [`CGIHandler`](#wsgiref.handlers.CGIHandler "wsgiref.handlers.CGIHandler") 相同，即通过调用 `IISCGIHandler().run(app)`，其中 `app` 是你想要唤起的 WSGI 应用程序。

Added in version 3.2.

_class_ wsgiref.handlers.BaseCGIHandler(_stdin_, _stdout_, _stderr_, _environ_, _multithread\=True_, _multiprocess\=False_)[¶](#wsgiref.handlers.BaseCGIHandler "Link to this definition")

类似于 [`CGIHandler`](#wsgiref.handlers.CGIHandler "wsgiref.handlers.CGIHandler")，但不是使用 [`sys`](https://docs.python.org/zh-cn/3/library/sys.html#module-sys "sys: Access system-specific parameters and functions.") 和 [`os`](https://docs.python.org/zh-cn/3/library/os.html#module-os "os: Miscellaneous operating system interfaces.") 模块，而是显式地指定 CGI 环境和 I/O 流。 _multithread_ 和 _multiprocess_ 值被用来为处理器实例所运行的任何应用程序设置 `wsgi.multithread` 和 `wsgi.multiprocess` 旗标。

该类是 [`SimpleHandler`](#wsgiref.handlers.SimpleHandler "wsgiref.handlers.SimpleHandler") 的子类，旨在用于 HTTP "原始服务器" 以外的软件。 如果你在编写一个网关协议实现（例如 CGI, FastCGI, SCGI 等等），它使用 `Status:` 标头来发布 HTTP 状态，你可能会想要子类化该类而不是 `SimpleHandler`。

_class_ wsgiref.handlers.SimpleHandler(_stdin_, _stdout_, _stderr_, _environ_, _multithread\=True_, _multiprocess\=False_)[¶](#wsgiref.handlers.SimpleHandler "Link to this definition")

类似于 [`BaseCGIHandler`](#wsgiref.handlers.BaseCGIHandler "wsgiref.handlers.BaseCGIHandler")，但被设计用于 HTTP 原始服务器。 如果你在编写一个 HTTP 服务器实现，你可能会想要子类化该类而不是 `BaseCGIHandler`。

该类是 [`BaseHandler`](#wsgiref.handlers.BaseHandler "wsgiref.handlers.BaseHandler") 的子类。 它重载了 `__init__()`, [`get_stdin()`](#wsgiref.handlers.BaseHandler.get_stdin "wsgiref.handlers.BaseHandler.get_stdin"), [`get_stderr()`](#wsgiref.handlers.BaseHandler.get_stderr "wsgiref.handlers.BaseHandler.get_stderr"), [`add_cgi_vars()`](#wsgiref.handlers.BaseHandler.add_cgi_vars "wsgiref.handlers.BaseHandler.add_cgi_vars"), [`_write()`](#wsgiref.handlers.BaseHandler._write "wsgiref.handlers.BaseHandler._write") 和 [`_flush()`](#wsgiref.handlers.BaseHandler._flush "wsgiref.handlers.BaseHandler._flush") 方法以支持通过构造器显式地设置环境和流。 所提供的环境和流存储在 `stdin`, `stdout`, `stderr` 和 `environ` 属性中。

_stdout_ 的 [`write()`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase.write "io.BufferedIOBase.write") 方法应该完整写入每个数据块，与 [`io.BufferedIOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase "io.BufferedIOBase") 一样。

_class_ wsgiref.handlers.BaseHandler[¶](#wsgiref.handlers.BaseHandler "Link to this definition")

这是适用于运行 WSGI 应用程序的抽象基类。 每个实例将处理一个单独的 HTTP 请求，不过在原则上你也可以创建一个可针对多个请求重用的子类。

[`BaseHandler`](#wsgiref.handlers.BaseHandler "wsgiref.handlers.BaseHandler") 实例只有一个方法提供给外部使用:

run(_app_)[¶](#wsgiref.handlers.BaseHandler.run "Link to this definition")

运行指定的 WSGI 应用程序 _app_。

所有的 [`BaseHandler`](#wsgiref.handlers.BaseHandler "wsgiref.handlers.BaseHandler") 其他方法都是在运行应用程序过程中由该方法唤起的，因此主要是为了允许定制运行过程。

以下方法必须在子类中被重载:

\_write(_data_)[¶](#wsgiref.handlers.BaseHandler._write "Link to this definition")

缓冲字节数据 _data_ 以便传输给客户端。 如果此方法真的传输了数据也是可以的；[`BaseHandler`](#wsgiref.handlers.BaseHandler "wsgiref.handlers.BaseHandler") 只有在底层系统真有这样的区分时才会区分写入和刷新操作以提高效率。

\_flush()[¶](#wsgiref.handlers.BaseHandler._flush "Link to this definition")

强制将缓冲的数据传输给客户端。 如果此方法无任何操作也是可以的（例如，[`_write()`](#wsgiref.handlers.BaseHandler._write "wsgiref.handlers.BaseHandler._write") 实际上已发送了数据）。

get\_stdin()[¶](#wsgiref.handlers.BaseHandler.get_stdin "Link to this definition")

返回一个兼容 [`InputStream`](#wsgiref.types.InputStream "wsgiref.types.InputStream") 的适合用作当前所处理请求的 `wsgi.input` 的对象。

get\_stderr()[¶](#wsgiref.handlers.BaseHandler.get_stderr "Link to this definition")

返回一个兼容 [`ErrorStream`](#wsgiref.types.ErrorStream "wsgiref.types.ErrorStream") 的适合用作当前所处理请求的 `wsgi.errors` 的对象。

add\_cgi\_vars()[¶](#wsgiref.handlers.BaseHandler.add_cgi_vars "Link to this definition")

将当前请求的 CGI 变量插入到 `environ` 属性。

以下是一些你可能会想要重载的其他方法。 但这只是个简略的列表，它不包括每个可被重载的方法。 你应当在在尝试创建自定义的 [`BaseHandler`](#wsgiref.handlers.BaseHandler "wsgiref.handlers.BaseHandler") 子类之前参阅文档字符串和源代码来了解更多信息。

用于自定义 WSGI 环境的属性和方法:

wsgi\_multithread[¶](#wsgiref.handlers.BaseHandler.wsgi_multithread "Link to this definition")

用于 `wsgi.multithread` 环境变量的值。 它在 [`BaseHandler`](#wsgiref.handlers.BaseHandler "wsgiref.handlers.BaseHandler") 中默认为真值，但在其他子类中可能有不同的默认值（或是由构造器来设置）。

wsgi\_multiprocess[¶](#wsgiref.handlers.BaseHandler.wsgi_multiprocess "Link to this definition")

用于 `wsgi.multiprocess` 环境变量的值。 它在 [`BaseHandler`](#wsgiref.handlers.BaseHandler "wsgiref.handlers.BaseHandler") 中默认为真值，但在其他子类中可能有不同的默认值（或是由构造器来设置）。

wsgi\_run\_once[¶](#wsgiref.handlers.BaseHandler.wsgi_run_once "Link to this definition")

用于 `wsgi.run_once` 环境变量的值。 它在 [`BaseHandler`](#wsgiref.handlers.BaseHandler "wsgiref.handlers.BaseHandler") 中默认为假值，但在 [`CGIHandler`](#wsgiref.handlers.CGIHandler "wsgiref.handlers.CGIHandler") 中默认为真值。

os\_environ[¶](#wsgiref.handlers.BaseHandler.os_environ "Link to this definition")

The default environment variables to be included in every request's WSGI environment. By default, this is a copy of `os.environ` at the time that `wsgiref.handlers` was imported, but subclasses can either create their own at the class or instance level. Note that the dictionary should be considered read-only, since the default value is shared between multiple classes and instances.

server\_software[¶](#wsgiref.handlers.BaseHandler.server_software "Link to this definition")

如果设置了 [`origin_server`](#wsgiref.handlers.BaseHandler.origin_server "wsgiref.handlers.BaseHandler.origin_server") 属性，该属性的值会被用来设置默认的 `SERVER_SOFTWARE` WSGI 环境变量，并且还会被用来设置 HTTP 响应中默认的 `Server:` 标头。 它会被不是 HTTP 原始服务器的处理器所忽略 (例如 [`BaseCGIHandler`](#wsgiref.handlers.BaseCGIHandler "wsgiref.handlers.BaseCGIHandler") 和 [`CGIHandler`](#wsgiref.handlers.CGIHandler "wsgiref.handlers.CGIHandler"))。

在 3.3 版本发生变更: 名称 "Python" 会被替换为实现专属的名称如 "CPython", "Jython" 等等。

get\_scheme()[¶](#wsgiref.handlers.BaseHandler.get_scheme "Link to this definition")

返回当前请求所使用的 URL 方案。 默认的实现会使用来自 [`wsgiref.util`](#module-wsgiref.util "wsgiref.util: WSGI environment utilities.") 的 `guess_scheme()` 函数根据当前请求的 `environ` 变量来猜测方案应该是 "http" 还是 "https"。

setup\_environ()[¶](#wsgiref.handlers.BaseHandler.setup_environ "Link to this definition")

将 `environ` 属性设为填充了完整内容的 WSGI 环境。 默认的实现会使用上述的所有方法和属性，加上 [`get_stdin()`](#wsgiref.handlers.BaseHandler.get_stdin "wsgiref.handlers.BaseHandler.get_stdin"), [`get_stderr()`](#wsgiref.handlers.BaseHandler.get_stderr "wsgiref.handlers.BaseHandler.get_stderr") 和 [`add_cgi_vars()`](#wsgiref.handlers.BaseHandler.add_cgi_vars "wsgiref.handlers.BaseHandler.add_cgi_vars") 方法以及 [`wsgi_file_wrapper`](#wsgiref.handlers.BaseHandler.wsgi_file_wrapper "wsgiref.handlers.BaseHandler.wsgi_file_wrapper") 属性。 它还会在 `SERVER_SOFTWARE` 不存在时插入该键，只要 [`origin_server`](#wsgiref.handlers.BaseHandler.origin_server "wsgiref.handlers.BaseHandler.origin_server") 属性为真值并且设置了 [`server_software`](#wsgiref.handlers.BaseHandler.server_software "wsgiref.handlers.BaseHandler.server_software") 属性。

用于自定义异常处理的方法和属性:

log\_exception(_exc\_info_)[¶](#wsgiref.handlers.BaseHandler.log_exception "Link to this definition")

将 _exc\_info_ 元组记录到服务器日志。 _exc\_info_ 是一个 `(type, value, traceback)` 元组。 默认的实现会简单地将回溯信息写入请求的 `wsgi.errors` 流并刷新它。 子类可以重写此方法来修改格式或重设输出目标，通过邮件将回溯信息发给管理员，或执行任何其他符合要求的动作。

traceback\_limit[¶](#wsgiref.handlers.BaseHandler.traceback_limit "Link to this definition")

要包括在默认 [`log_exception()`](#wsgiref.handlers.BaseHandler.log_exception "wsgiref.handlers.BaseHandler.log_exception") 方法的回溯信息输出中的最大帧数。 如果为 `None`，则会包括所有的帧。

error\_output(_environ_, _start\_response_)[¶](#wsgiref.handlers.BaseHandler.error_output "Link to this definition")

此方法是一个为用户生成错误页面的 WSGI 应用程序。 它仅当将标头发送给客户端之前发生错误时会被唤起。

此方法可以使用 `sys.exception()` 来访问当前错误信息，并应当在调用它时将该信息传给 _start\_response_ (如 [**PEP 3333**](https://peps.python.org/pep-3333/) 的 "Error Handling" 一节所描述的)。 具体而言，_start\_response_ 可调用对象应当遵循 [`StartResponse`](#wsgiref.types.StartResponse "wsgiref.types.StartResponse") 协议。

默认的实现只是使用 [`error_status`](#wsgiref.handlers.BaseHandler.error_status "wsgiref.handlers.BaseHandler.error_status"), [`error_headers`](#wsgiref.handlers.BaseHandler.error_headers "wsgiref.handlers.BaseHandler.error_headers"), 和 [`error_body`](#wsgiref.handlers.BaseHandler.error_body "wsgiref.handlers.BaseHandler.error_body") 属性来生成一个输出页面。 子类可以重写此方法来产生更动态化的错误输出。

但是请注意，从安全角度看来是不建议将诊断信息暴露给任何用户的；理想的做法是你应当通过特别处理来启用诊断输出，因此默认的实现并不包括这样的内容。

error\_status[¶](#wsgiref.handlers.BaseHandler.error_status "Link to this definition")

用于错误响应的 HTTP 状态。 这应当是一个在 [**PEP 3333**](https://peps.python.org/pep-3333/) 中定义的状态字符串；它默认为代码 500 及相应的消息。

error\_headers[¶](#wsgiref.handlers.BaseHandler.error_headers "Link to this definition")

用于错误响应的 HTTP 标头。 这应当是由 WSGI 响应标头 (`(name, value)` 元组) 构成的列表，如 [**PEP 3333**](https://peps.python.org/pep-3333/) 所定义的。 默认的列表只是将内容类型设为 `text/plain`。

error\_body[¶](#wsgiref.handlers.BaseHandler.error_body "Link to this definition")

错误响应体。 这应当是一个 HTTP 响应体字节串。 它默认为纯文本 "A server error occurred. Please contact the administrator."

用于 [**PEP 3333**](https://peps.python.org/pep-3333/) 的 "可选的平台专属文件处理" 特性的方法和属性:

wsgi\_file\_wrapper[¶](#wsgiref.handlers.BaseHandler.wsgi_file_wrapper "Link to this definition")

一个 `wsgi.file_wrapper` 工厂对象，兼容 [`wsgiref.types.FileWrapper`](#wsgiref.types.FileWrapper "wsgiref.types.FileWrapper")，或者为 `None`。 该属性的默认值是 [`wsgiref.util.FileWrapper`](#wsgiref.util.FileWrapper "wsgiref.util.FileWrapper") 类。

sendfile()[¶](#wsgiref.handlers.BaseHandler.sendfile "Link to this definition")

重载以实现平台专属的文件传输。 此方法仅在应用程序的返回值是由 [`wsgi_file_wrapper`](#wsgiref.handlers.BaseHandler.wsgi_file_wrapper "wsgiref.handlers.BaseHandler.wsgi_file_wrapper") 属性指定的类的实例时会被调用。 如果它能够成功地传输文件则应当返回真值，以使得默认的传输代码将不会被执行。 此方法的默认实现只会返回假值。

杂项方法和属性:

origin\_server[¶](#wsgiref.handlers.BaseHandler.origin_server "Link to this definition")

该属性在处理器的 [`_write()`](#wsgiref.handlers.BaseHandler._write "wsgiref.handlers.BaseHandler._write") 和 [`_flush()`](#wsgiref.handlers.BaseHandler._flush "wsgiref.handlers.BaseHandler._flush") 被用于同客户端直接通信而不是通过需要 HTTP 状态为某种特殊 `Status:` 标头的 CGI 类网关协议时应当被设为真值。

该属性在 [`BaseHandler`](#wsgiref.handlers.BaseHandler "wsgiref.handlers.BaseHandler") 中默认为真值，但在 [`BaseCGIHandler`](#wsgiref.handlers.BaseCGIHandler "wsgiref.handlers.BaseCGIHandler") 和 [`CGIHandler`](#wsgiref.handlers.CGIHandler "wsgiref.handlers.CGIHandler") 中则为假值。

http\_version[¶](#wsgiref.handlers.BaseHandler.http_version "Link to this definition")

如果 [`origin_server`](#wsgiref.handlers.BaseHandler.origin_server "wsgiref.handlers.BaseHandler.origin_server") 为真值，则该字符串属性会被用来设置给客户端的响应的 HTTP 版本。 它的默认值为 `"1.0"`。

wsgiref.handlers.read\_environ()[¶](#wsgiref.handlers.read_environ "Link to this definition")

将来自 `os.environ` 的 CGI 变量转码为 [**PEP 3333**](https://peps.python.org/pep-3333/) "bytes in unicode" 字符串，返回一个新的字典。 此函数被 [`CGIHandler`](#wsgiref.handlers.CGIHandler "wsgiref.handlers.CGIHandler") 和 [`IISCGIHandler`](#wsgiref.handlers.IISCGIHandler "wsgiref.handlers.IISCGIHandler") 用来替代直接使用 `os.environ`，后者不一定在所有使用 Python 3 的平台和 Web 服务器上都符合 WSGI 标准 -- 特别是当 OS 的实际环境为 Unicode 时 (例如 Windows)，或者当环境为字节数据，但被 Python 用来解码它的系统编码格式不是 ISO-8859-1 时 (例如使用 UTF-8 的 Unix 系统)。

如果你要实现自己的基于 CGI 的处理器，你可能会想要使用此例程而不是简单地从 `os.environ` 直接拷贝值。

Added in version 3.2.

## `wsgiref.types` -- WSGI types for static type checking[¶](#module-wsgiref.types "Link to this heading")

本模块提供了多种用于 [**PEP 3333**](https://peps.python.org/pep-3333/) 中所描述的静态类型检查的类型。

Added in version 3.11.

_class_ wsgiref.types.StartResponse[¶](#wsgiref.types.StartResponse "Link to this definition")

一个描述 [**start\_response()**](https://peps.python.org/pep-3333/#the-start-response-callable) 可调用对象的 [`typing.Protocol`](https://docs.python.org/zh-cn/3/library/typing.html#typing.Protocol "typing.Protocol") ([**PEP 3333**](https://peps.python.org/pep-3333/))。

wsgiref.types.WSGIEnvironment[¶](#wsgiref.types.WSGIEnvironment "Link to this definition")

一个描述 WSGI 环境字典的类型别名。

wsgiref.types.WSGIApplication[¶](#wsgiref.types.WSGIApplication "Link to this definition")

一个描述 WSGI 应用程序可调用对象的类型别名。

_class_ wsgiref.types.InputStream[¶](#wsgiref.types.InputStream "Link to this definition")

一个描述 [**WSGI 输入流**](https://peps.python.org/pep-3333/#input-and-error-streams) 的 [`typing.Protocol`](https://docs.python.org/zh-cn/3/library/typing.html#typing.Protocol "typing.Protocol")。

_class_ wsgiref.types.ErrorStream[¶](#wsgiref.types.ErrorStream "Link to this definition")

一个描述 [**WSGI 错误流**](https://peps.python.org/pep-3333/#input-and-error-streams) 的 [`typing.Protocol`](https://docs.python.org/zh-cn/3/library/typing.html#typing.Protocol "typing.Protocol")。

_class_ wsgiref.types.FileWrapper[¶](#wsgiref.types.FileWrapper "Link to this definition")

一个描述 [**文件包装器**](https://peps.python.org/pep-3333/#optional-platform-specific-file-handling) 的 [`typing.Protocol`](https://docs.python.org/zh-cn/3/library/typing.html#typing.Protocol "typing.Protocol")。 请参阅 [`wsgiref.util.FileWrapper`](#wsgiref.util.FileWrapper "wsgiref.util.FileWrapper") 查看此协议的一个具体实现。

## 例子[¶](#examples "Link to this heading")

下面是一个可运行的 "Hello World" WSGI 应用程序，其中 _start\_response_ 可调用对象应当遵循 [`StartResponse`](#wsgiref.types.StartResponse "wsgiref.types.StartResponse") 协议:

"""
每个 WSGI 应用程序必须有一个应用程序对象 —— 即一个将接受
两个参数的可调用对象。 为达成此目的，我们准备使用一个函数
（请注意并非仅限使用函数，例如你也可以使用一个类）。
传给该函数的第一个参数是一个包含 CGI 风格的环境变量的字典
而第二个变量就是上述的可调用对象。
"""
from wsgiref.simple\_server import make\_server

def hello\_world\_app(environ, start\_response):
    status \= "200 OK"  \# HTTP Status
    headers \= \[("Content-type", "text/plain; charset=utf-8")\]  \# HTTP 标头
    start\_response(status, headers)

    \# 返回的对象将被打印出来
    return \[b"Hello World"\]

with make\_server("", 8000, hello\_world\_app) as httpd:
    print("Serving on port 8000...")

    \# 运行服务直到进程被杀掉
    httpd.serve\_forever()

一个发布当前目录的 WSGI 应用程序示例，接受通过命令行指定可选的目录和端口号 (默认值: 8000):

"""
基于 wsgiref 的小型 web 服务器。 接受一个服务路径和
一个可选的端口号 (默认为 8000)，然后尝试发布文件。
MIME 类型将根据文件名来猜测，如果文件未找到则会
引发 404 错误。
"""
import mimetypes
import os
import sys
from wsgiref import simple\_server, util

def app(environ, respond):
    \# 获取文件名和 MIME 类型
    fn \= os.path.join(path, environ\["PATH\_INFO"\]\[1:\])
    if "." not in fn.split(os.path.sep)\[\-1\]:
        fn \= os.path.join(fn, "index.html")
    mime\_type \= mimetypes.guess\_file\_type(fn)\[0\]

    \# 如果文件存在则返回 200 OK，否则返回 404 Not Found
    if os.path.exists(fn):
        respond("200 OK", \[("Content-Type", mime\_type)\])
        return util.FileWrapper(open(fn, "rb"))
    else:
        respond("404 Not Found", \[("Content-Type", "text/plain")\])
        return \[b"not found"\]

if \_\_name\_\_ \== "\_\_main\_\_":
    \# 从命令行参数获取路径和端口
    path \= sys.argv\[1\] if len(sys.argv) \> 1 else os.getcwd()
    port \= int(sys.argv\[2\]) if len(sys.argv) \> 2 else 8000

    \# 创建并启动服务直至被 control-c 中断
    httpd \= simple\_server.make\_server("", port, app)
    print(f"Serving {path} on port {port}, control-C to stop")
    try:
        httpd.serve\_forever()
    except KeyboardInterrupt:
        print("Shutting down.")
        httpd.server\_close()
