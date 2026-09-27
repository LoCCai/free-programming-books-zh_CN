**源代码:** [Lib/socketserver.py](https://github.com/python/cpython/tree/3.14/Lib/socketserver.py)

* * *

`socketserver` 模块简化了编写网络服务器的任务。

该模块具有四个基础实体服务器类：

_class_ socketserver.TCPServer(_server\_address_, _RequestHandlerClass_, _bind\_and\_activate\=True_)[¶](#socketserver.TCPServer "Link to this definition")

该类使用互联网 TCP 协议，它可以提供客户端与服务器之间的连续数据流。如果 _bind\_and\_activate_ 为真值，该类的构造器会自动尝试调用 [`server_bind()`](#socketserver.BaseServer.server_bind "socketserver.BaseServer.server_bind") 和 [`server_activate()`](#socketserver.BaseServer.server_activate "socketserver.BaseServer.server_activate")。其他形参会被传递给 [`BaseServer`](#socketserver.BaseServer "socketserver.BaseServer") 基类。

_class_ socketserver.UDPServer(_server\_address_, _RequestHandlerClass_, _bind\_and\_activate\=True_)[¶](#socketserver.UDPServer "Link to this definition")

该类使用数据包，即一系列离散的信息分包，它们可能会无序地到达或在传输中丢失。该类的形参与 [`TCPServer`](#socketserver.TCPServer "socketserver.TCPServer") 的相同。

_class_ socketserver.UnixStreamServer(_server\_address_, _RequestHandlerClass_, _bind\_and\_activate\=True_)[¶](#socketserver.UnixStreamServer "Link to this definition")

_class_ socketserver.UnixDatagramServer(_server\_address_, _RequestHandlerClass_, _bind\_and\_activate\=True_)[¶](#socketserver.UnixDatagramServer "Link to this definition")

这两个不太常用的类与 TCP 和 UDP 类相似，但使用 Unix 域套接字；它们在非 Unix 系统平台上不可用。它们的形参与 [`TCPServer`](#socketserver.TCPServer "socketserver.TCPServer") 的相同。

这四个类会 _同步地_ 处理请求；每个请求必须完成才能开始下一个请求。 这就不适用于每个请求要耗费很长时间来完成的情况，或者因为它需要大量的计算，又或者它返回了大量的数据而客户端处理起来很缓慢。 解决方案是创建单独的进程或线程来处理每个请求；[`ForkingMixIn`](#socketserver.ForkingMixIn "socketserver.ForkingMixIn") 和 [`ThreadingMixIn`](#socketserver.ThreadingMixIn "socketserver.ThreadingMixIn") 混合类可以被用于支持异步行为。

创建一个服务器需要分几个步骤进行。首先，你必须通过子类化 [`BaseRequestHandler`](#socketserver.BaseRequestHandler "socketserver.BaseRequestHandler") 类并重载其 [`handle()`](#socketserver.BaseRequestHandler.handle "socketserver.BaseRequestHandler.handle") 方法来创建一个请求处理器类；这个方法将处理传入的请求。 其次，你必须实例化某个服务器类，将服务器地址和请求处理器类传给它。建议在 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句中使用该服务器。然后再调用服务器对象的 [`handle_request()`](#socketserver.BaseServer.handle_request "socketserver.BaseServer.handle_request") 或 [`serve_forever()`](#socketserver.BaseServer.serve_forever "socketserver.BaseServer.serve_forever") 方法来处理一个或多个请求。最后，调用 [`server_close()`](#socketserver.BaseServer.server_close "socketserver.BaseServer.server_close") 来关闭套接字（除非你使用了 `with` 语句）。

当从 [`ThreadingMixIn`](#socketserver.ThreadingMixIn "socketserver.ThreadingMixIn") 继承线程连接行为时，你应当显式地声明你希望在突然关机时你的线程采取何种行为。 `ThreadingMixIn` 类定义了一个属性 _daemon\_threads_，它指明服务器是否应当等待线程终止。 如果你希望线程能自主行动你应当显式地设置这个旗标；默认值为 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False")，表示 Python 将不会在 `ThreadingMixIn` 所创建的所有线程都退出之前退出。

服务器类具有同样的外部方法和属性，无论它们使用哪种网络协议。

## 服务器创建的说明[¶](#server-creation-notes "Link to this heading")

在继承图中有五个类，其中四个代表四种类型的同步服务器:

+------------+
| BaseServer |
+------------+
      |
      v
+-----------+        +------------------+
| TCPServer |------->| UnixStreamServer |
+-----------+        +------------------+
      |
      v
+-----------+        +--------------------+
| UDPServer |------->| UnixDatagramServer |
+-----------+        +--------------------+

请注意 [`UnixDatagramServer`](#socketserver.UnixDatagramServer "socketserver.UnixDatagramServer") 是派生自 [`UDPServer`](#socketserver.UDPServer "socketserver.UDPServer")，而不是派生自 [`UnixStreamServer`](#socketserver.UnixStreamServer "socketserver.UnixStreamServer") --- IP 和 Unix 服务器的唯一区别是地址族。

_class_ socketserver.ForkingMixIn[¶](#socketserver.ForkingMixIn "Link to this definition")

_class_ socketserver.ThreadingMixIn[¶](#socketserver.ThreadingMixIn "Link to this definition")

每种服务器类型的分叉和线程版本都可以使用这些混合类来创建。例如，[`ThreadingUDPServer`](#socketserver.ThreadingUDPServer "socketserver.ThreadingUDPServer") 的创建方式如下:

class ThreadingUDPServer(ThreadingMixIn, UDPServer):
    pass

混合类先出现，因为它重载了 [`UDPServer`](#socketserver.UDPServer "socketserver.UDPServer") 中定义的一个方法。设置各种属性也会改变下层服务器机制的行为。

[`ForkingMixIn`](#socketserver.ForkingMixIn "socketserver.ForkingMixIn") 和下文提及的分叉类仅在支持 [`fork()`](https://docs.python.org/zh-cn/3/library/os.html#os.fork "os.fork") 的 POSIX 系统平台上可用。

block\_on\_close[¶](#socketserver.ThreadingMixIn.block_on_close "Link to this definition")

[`ForkingMixIn.server_close`](#socketserver.BaseServer.server_close "socketserver.BaseServer.server_close") 会等待直到所有子进程完成，除非 [`block_on_close`](#socketserver.ThreadingMixIn.block_on_close "socketserver.ThreadingMixIn.block_on_close") 属性为 `False`。

[`ThreadingMixIn.server_close`](#socketserver.BaseServer.server_close "socketserver.BaseServer.server_close") 会等待直到所有非守护线程完成，除非 [`block_on_close`](#socketserver.ThreadingMixIn.block_on_close "socketserver.ThreadingMixIn.block_on_close") 属性为 `False`。

max\_children[¶](#socketserver.ThreadingMixIn.max_children "Link to this definition")

指定将有多少子进程为 [`ForkingMixIn`](#socketserver.ForkingMixIn "socketserver.ForkingMixIn") 同时处理请求。如果达到此限制，新请求将等待直到某个子进程结束。

daemon\_threads[¶](#socketserver.ThreadingMixIn.daemon_threads "Link to this definition")

对于 [`ThreadingMixIn`](#socketserver.ThreadingMixIn "socketserver.ThreadingMixIn") 可通过将 [`ThreadingMixIn.daemon_threads`](#socketserver.ThreadingMixIn.daemon_threads "socketserver.ThreadingMixIn.daemon_threads") 设为 `True` 来使用守护线程从而无需等待线程完成。

在 3.7 版本发生变更: [`ForkingMixIn.server_close`](#socketserver.BaseServer.server_close "socketserver.BaseServer.server_close") 和 `ThreadingMixIn.server_close` 现在会等待直到所有子进程和非守护线程完成。新增了一个 [`ForkingMixIn.block_on_close`](#socketserver.ThreadingMixIn.block_on_close "socketserver.ThreadingMixIn.block_on_close") 类属性用来选择 3.7 版之前的行为。

_class_ socketserver.ForkingTCPServer[¶](#socketserver.ForkingTCPServer "Link to this definition")

_class_ socketserver.ForkingUDPServer[¶](#socketserver.ForkingUDPServer "Link to this definition")

_class_ socketserver.ThreadingTCPServer[¶](#socketserver.ThreadingTCPServer "Link to this definition")

_class_ socketserver.ThreadingUDPServer[¶](#socketserver.ThreadingUDPServer "Link to this definition")

_class_ socketserver.ForkingUnixStreamServer[¶](#socketserver.ForkingUnixStreamServer "Link to this definition")

_class_ socketserver.ForkingUnixDatagramServer[¶](#socketserver.ForkingUnixDatagramServer "Link to this definition")

_class_ socketserver.ThreadingUnixStreamServer[¶](#socketserver.ThreadingUnixStreamServer "Link to this definition")

_class_ socketserver.ThreadingUnixDatagramServer[¶](#socketserver.ThreadingUnixDatagramServer "Link to this definition")

这些类都是使用混合类来预定义的。

Added in version 3.12: 增加了 `ForkingUnixStreamServer` 和 `ForkingUnixDatagramServer` 类。

要实现一个服务，你必须从 [`BaseRequestHandler`](#socketserver.BaseRequestHandler "socketserver.BaseRequestHandler") 派生一个类并重定义其 [`handle()`](#socketserver.BaseRequestHandler.handle "socketserver.BaseRequestHandler.handle") 方法。然后你可以通过组合某种服务器类型与你的请求处理器类来运行各种版本的服务。 请求处理器类对于数据报和流服务必须是不相同的。这可以通过使用处理器子类 [`StreamRequestHandler`](#socketserver.StreamRequestHandler "socketserver.StreamRequestHandler") 或 [`DatagramRequestHandler`](#socketserver.DatagramRequestHandler "socketserver.DatagramRequestHandler") 来隐藏。

当然，你仍然需要动点脑筋！ 举例来说，如果服务包含可能被不同请求所修改的内存状态则使用分叉服务器是没有意义的，因为在子进程中的修改将永远不会触及保存在父进程中的初始状态并传递到各个子进程。 在这种情况下，你可以使用线程服务器，但你可能必须使用锁来保护共享数据的一致性。

另一方面，如果你是在编写一个所有数据保存在外部（例如文件系统）的 HTTP 服务器，同步类实际上将在正在处理某个请求的时候“失聪” -- 如果某个客户端在接收它所请求的所有数据时很缓慢这可能会是非常长的时间。这时线程或分叉服务器会更为适用。

在某些情况下，合适的做法是同步地处理请求的一部分，但根据请求数据在分叉的子进程中完成处理。这可以通过使用一个同步服务器并在请求处理器类 [`handle()`](#socketserver.BaseRequestHandler.handle "socketserver.BaseRequestHandler.handle") 中进行显式分叉来实现。

另一种可以在既不支持线程也不支持 [`fork()`](https://docs.python.org/zh-cn/3/library/os.html#os.fork "os.fork") 的环境（或者对于本服务来说这两者开销过大或不适用）中处理多个同时请求的方式是维护一个显式的部分完成的请求表并使用 [`selectors`](https://docs.python.org/zh-cn/3/library/selectors.html#module-selectors "selectors: High-level I/O multiplexing.") 来决定接下来要处理哪个请求（或者是否要处理一个新传入的请求）。 这对于流式服务来说特别重要，因为每个客户端可能会连接很长的时间（如果不能使用线程或子进程）。

## Server 对象[¶](#server-objects "Link to this heading")

_class_ socketserver.BaseServer(_server\_address_, _RequestHandlerClass_)[¶](#socketserver.BaseServer "Link to this definition")

这是本模块中所有 Server 对象的超类。它定义了下文给出的接口，但没有实现大部分的方法，它们应在子类中实现。两个形参存储在对应的 [`server_address`](#socketserver.BaseServer.server_address "socketserver.BaseServer.server_address") 和 [`RequestHandlerClass`](#socketserver.BaseServer.RequestHandlerClass "socketserver.BaseServer.RequestHandlerClass") 属性中。

fileno()[¶](#socketserver.BaseServer.fileno "Link to this definition")

返回服务器正在监听的套接字的以整数表示的文件描述符。此函数最常被传递给 [`selectors`](https://docs.python.org/zh-cn/3/library/selectors.html#module-selectors "selectors: High-level I/O multiplexing.")，以允许在同一进程中监控多个服务器。

handle\_request()[¶](#socketserver.BaseServer.handle_request "Link to this definition")

处理单个请求。此函数会依次调用下列方法：[`get_request()`](#socketserver.BaseServer.get_request "socketserver.BaseServer.get_request"), [`verify_request()`](#socketserver.BaseServer.verify_request "socketserver.BaseServer.verify_request") 和 [`process_request()`](#socketserver.BaseServer.process_request "socketserver.BaseServer.process_request")。如果用户提供的处理器类的 [`handle()`](#socketserver.BaseRequestHandler.handle "socketserver.BaseRequestHandler.handle") 方法引发了异常，则将调用服务器的 [`handle_error()`](#socketserver.BaseServer.handle_error "socketserver.BaseServer.handle_error") 方法。如果在 [`timeout`](#socketserver.BaseServer.timeout "socketserver.BaseServer.timeout") 秒内未接收到请求，将会调用 [`handle_timeout()`](#socketserver.BaseServer.handle_timeout "socketserver.BaseServer.handle_timeout") 且 [`handle_request()`](#socketserver.BaseServer.handle_request "socketserver.BaseServer.handle_request") 将返回。

serve\_forever(_poll\_interval\=0.5_)[¶](#socketserver.BaseServer.serve_forever "Link to this definition")

对请求进行处理直至收到显式的 [`shutdown()`](#socketserver.BaseServer.shutdown "socketserver.BaseServer.shutdown") 请求。每隔 _poll\_interval_ 秒对 shutdown 进行轮询。忽略 [`timeout`](#socketserver.BaseServer.timeout "socketserver.BaseServer.timeout") 属性。它还会调用 [`service_actions()`](#socketserver.BaseServer.service_actions "socketserver.BaseServer.service_actions")，这可被子类或混合类用来提供某个给定服务的专属操作。 例如，[`ForkingMixIn`](#socketserver.ForkingMixIn "socketserver.ForkingMixIn") 类使用 `service_actions()` 来清理僵尸子进程。

在 3.3 版本发生变更: 将 `service_actions` 调用添加到 `serve_forever` 方法。

service\_actions()[¶](#socketserver.BaseServer.service_actions "Link to this definition")

此方法会在 [`serve_forever()`](#socketserver.BaseServer.serve_forever "socketserver.BaseServer.serve_forever") 循环中被调用。此方法可被子类或混合类所重载以执行某个给定服务的专属操作，例如清理操作。

Added in version 3.3.

shutdown()[¶](#socketserver.BaseServer.shutdown "Link to this definition")

通知 [`serve_forever()`](#socketserver.BaseServer.serve_forever "socketserver.BaseServer.serve_forever") 循环停止并等待它完成。 [`shutdown()`](#socketserver.BaseServer.shutdown "socketserver.BaseServer.shutdown") 必须在 `serve_forever()` 运行于不同线程时被调用否则它将发生死锁。

server\_close()[¶](#socketserver.BaseServer.server_close "Link to this definition")

清理服务器。此方法可被重载。

address\_family[¶](#socketserver.BaseServer.address_family "Link to this definition")

服务器套接字所属的协议族。常见的例子有 [`socket.AF_INET`](https://docs.python.org/zh-cn/3/library/socket.html#socket.AF_INET "socket.AF_INET"), [`socket.AF_INET6`](https://docs.python.org/zh-cn/3/library/socket.html#socket.AF_INET6 "socket.AF_INET6") 和 [`socket.AF_UNIX`](https://docs.python.org/zh-cn/3/library/socket.html#socket.AF_UNIX "socket.AF_UNIX") 等。如果你想要 IPv6 服务器类请子类化此模块中的 TCP 或 UDP 服务器类并设置类属性 `address_family = AF_INET6`.

RequestHandlerClass[¶](#socketserver.BaseServer.RequestHandlerClass "Link to this definition")

用户提供的请求处理器类；将为每个请求创建该类的实例。

server\_address[¶](#socketserver.BaseServer.server_address "Link to this definition")

服务器所监听的地址。地址的格式因具体协议族而不同；请参阅 [`socket`](https://docs.python.org/zh-cn/3/library/socket.html#module-socket "socket: Low-level networking interface.") 模块的文档了解详情。 对于互联网协议，这将是一个元组，其中包含一个表示地址的字符串，和一个表示端口号的整数，例如: `('127.0.0.1', 80)`。

socket[¶](#socketserver.BaseServer.socket "Link to this definition")

将由服务器用于监听入站请求的套接字对象。

服务器类支持下列类变量：

allow\_reuse\_address[¶](#socketserver.BaseServer.allow_reuse_address "Link to this definition")

服务器是否要允许地址的重用。默认值为 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False")，并可在子类中设置以改变策略。

request\_queue\_size[¶](#socketserver.BaseServer.request_queue_size "Link to this definition")

请求队列的长度。如果处理单个请求要花费很长的时间，则当服务器正忙时到达的任何请求都会被加入队列，最多加入 [`request_queue_size`](#socketserver.BaseServer.request_queue_size "socketserver.BaseServer.request_queue_size") 个请求。一旦队列被加满，来自客户端的更多请求将收到 错误。默认值为 5，但可在子类中重载。

socket\_type[¶](#socketserver.BaseServer.socket_type "Link to this definition")

服务器使用的套接字类型；常见的有 [`socket.SOCK_STREAM`](https://docs.python.org/zh-cn/3/library/socket.html#socket.SOCK_STREAM "socket.SOCK_STREAM") 和 [`socket.SOCK_DGRAM`](https://docs.python.org/zh-cn/3/library/socket.html#socket.SOCK_DGRAM "socket.SOCK_DGRAM") 这两个值。

timeout[¶](#socketserver.BaseServer.timeout "Link to this definition")

超时限制，以秒数表示，或者如果不限制超时则为 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")。如果 [`handle_request()`](#socketserver.BaseServer.handle_request "socketserver.BaseServer.handle_request") 在超时限制期间没有收到传入请求，则会调用 [`handle_timeout()`](#socketserver.BaseServer.handle_timeout "socketserver.BaseServer.handle_timeout") 方法。

有多个服务器方法可被服务器基类的子类例如 [`TCPServer`](#socketserver.TCPServer "socketserver.TCPServer") 所重载；这些方法对服务器对象的外部用户来说并无用处。

finish\_request(_request_, _client\_address_)[¶](#socketserver.BaseServer.finish_request "Link to this definition")

通过实例化 [`RequestHandlerClass`](#socketserver.BaseServer.RequestHandlerClass "socketserver.BaseServer.RequestHandlerClass") 并调用其 [`handle()`](#socketserver.BaseRequestHandler.handle "socketserver.BaseRequestHandler.handle") 方法来实际处理请求。

get\_request()[¶](#socketserver.BaseServer.get_request "Link to this definition")

必须接受来自套接字的请求，并返回一个 2 元组，其中包含用来与客户端通信的 _新的_ 套接字对象，以及客户端的地址。

handle\_error(_request_, _client\_address_)[¶](#socketserver.BaseServer.handle_error "Link to this definition")

此函数会在 [`RequestHandlerClass`](#socketserver.BaseServer.RequestHandlerClass "socketserver.BaseServer.RequestHandlerClass") 实例的 [`handle()`](#socketserver.BaseRequestHandler.handle "socketserver.BaseRequestHandler.handle") 方法引发异常时被调用。默认行为是将回溯信息打印到标准错误并继续处理其他请求。

在 3.6 版本发生变更: 现在只针对派生自 [`Exception`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#Exception "Exception") 类的异常调用此方法。

handle\_timeout()[¶](#socketserver.BaseServer.handle_timeout "Link to this definition")

此函数会在 [`timeout`](#socketserver.BaseServer.timeout "socketserver.BaseServer.timeout") 属性被设为 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None") 以外的值并且在超出时限之后仍未收到请求时被调用。 分叉服务器的默认行为是收集任何已退出的子进程状态，而在线程服务器中此方法则不做任何操作。

process\_request(_request_, _client\_address_)[¶](#socketserver.BaseServer.process_request "Link to this definition")

调用 [`finish_request()`](#socketserver.BaseServer.finish_request "socketserver.BaseServer.finish_request") 来创建 [`RequestHandlerClass`](#socketserver.BaseServer.RequestHandlerClass "socketserver.BaseServer.RequestHandlerClass") 的实例。 如果需要，此函数可创建一个新的进程或线程来处理请求；[`ForkingMixIn`](#socketserver.ForkingMixIn "socketserver.ForkingMixIn") 和 [`ThreadingMixIn`](#socketserver.ThreadingMixIn "socketserver.ThreadingMixIn") 类能完成此任务。

server\_activate()[¶](#socketserver.BaseServer.server_activate "Link to this definition")

由服务器的构造器调用以激活服务器。TCP 服务器的默认行为只是在服务器的套接字上调用 [`listen()`](https://docs.python.org/zh-cn/3/library/socket.html#socket.socket.listen "socket.socket.listen")。 可以被重载。

server\_bind()[¶](#socketserver.BaseServer.server_bind "Link to this definition")

由服务器的构造器调用以将套接字绑定到所需的地址。可以被重载。

verify\_request(_request_, _client\_address_)[¶](#socketserver.BaseServer.verify_request "Link to this definition")

必须返回一个布尔值；如果值为 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")，请求将被处理。而如果值为 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False")，请求将被拒绝。 此函数可被重载以实现服务器的访问控制。默认实现总是返回 `True`。

## 请求处理器对象[¶](#request-handler-objects "Link to this heading")

_class_ socketserver.BaseRequestHandler[¶](#socketserver.BaseRequestHandler "Link to this definition")

这是所有请求处理器对象的超类。它定义了下文列出的接口。一个实体请求处理器子类必须定义新的 [`handle()`](#socketserver.BaseRequestHandler.handle "socketserver.BaseRequestHandler.handle") 方法，并可重载任何其他方法。 对于每个请求都会创建一个新的子类的实例。

setup()[¶](#socketserver.BaseRequestHandler.setup "Link to this definition")

会在 [`handle()`](#socketserver.BaseRequestHandler.handle "socketserver.BaseRequestHandler.handle") 方法之前被调用以执行任何必要的初始化操作。默认实现不执行任何操作。

handle()[¶](#socketserver.BaseRequestHandler.handle "Link to this definition")

此函数必须执行为请求提供服务所需的全部操作。默认实现不执行任何操作。它有几个可用的实例属性；请求为 [`request`](#socketserver.BaseRequestHandler.request "socketserver.BaseRequestHandler.request")；客户端地址为 [`client_address`](#socketserver.BaseRequestHandler.client_address "socketserver.BaseRequestHandler.client_address")；服务器实例为 [`server`](#socketserver.BaseRequestHandler.server "socketserver.BaseRequestHandler.server")，如果它需要访问特定服务器信息的话。

针对数据报或流服务的 [`request`](#socketserver.BaseRequestHandler.request "socketserver.BaseRequestHandler.request") 类型是不同的。对于流服务，`request` 是一个套接字对象；对于数据报服务，`request` 是一对字符串与套接字。

finish()[¶](#socketserver.BaseRequestHandler.finish "Link to this definition")

在 [`handle()`](#socketserver.BaseRequestHandler.handle "socketserver.BaseRequestHandler.handle") 方法之后调用以执行任何需要的清理操作。默认实现不执行任何操作。如果 [`setup()`](#socketserver.BaseRequestHandler.setup "socketserver.BaseRequestHandler.setup") 引发了异常，此函数将不会被调用。

request[¶](#socketserver.BaseRequestHandler.request "Link to this definition")

将被用于同客户端通信的 _新_ [`socket.socket`](https://docs.python.org/zh-cn/3/library/socket.html#socket.socket "socket.socket") 对象。

client\_address[¶](#socketserver.BaseRequestHandler.client_address "Link to this definition")

[`BaseServer.get_request()`](#socketserver.BaseServer.get_request "socketserver.BaseServer.get_request") 所返回的客户端地址。

server[¶](#socketserver.BaseRequestHandler.server "Link to this definition")

用于处理请求的 [`BaseServer`](#socketserver.BaseServer "socketserver.BaseServer") 对象。

_class_ socketserver.StreamRequestHandler[¶](#socketserver.StreamRequestHandler "Link to this definition")

_class_ socketserver.DatagramRequestHandler[¶](#socketserver.DatagramRequestHandler "Link to this definition")

这些 [`BaseRequestHandler`](#socketserver.BaseRequestHandler "socketserver.BaseRequestHandler") 子类重载了 [`setup()`](#socketserver.BaseRequestHandler.setup "socketserver.BaseRequestHandler.setup") 和 [`finish()`](#socketserver.BaseRequestHandler.finish "socketserver.BaseRequestHandler.finish") 方法，并提供了 [`rfile`](#socketserver.DatagramRequestHandler.rfile "socketserver.DatagramRequestHandler.rfile") 和 [`wfile`](#socketserver.DatagramRequestHandler.wfile "socketserver.DatagramRequestHandler.wfile") 属性。

rfile[¶](#socketserver.DatagramRequestHandler.rfile "Link to this definition")

用于读取所接受请求的文件对象。支持 [`io.BufferedIOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase "io.BufferedIOBase") 可读接口。

wfile[¶](#socketserver.DatagramRequestHandler.wfile "Link to this definition")

用于写入所回复内容的文件对象。支持 [`io.BufferedIOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase "io.BufferedIOBase") 可写接口。

## 例子[¶](#examples "Link to this heading")

### [`socketserver.TCPServer`](#socketserver.TCPServer "socketserver.TCPServer") 示例[¶](#socketserver-tcpserver-example "Link to this heading")

以下是服务端:

import socketserver

class MyTCPHandler(socketserver.BaseRequestHandler):
    """
    The request handler class for our server.

    It is instantiated once per connection to the server, and must
    override the handle() method to implement communication to the
    client.
    """

    def handle(self):
        \# self.request 是连接到客户端的 TCP 套接字
        pieces \= \[b''\]
        total \= 0
        while b'\\n' not in pieces\[\-1\] and total < 10\_000:
            pieces.append(self.request.recv(2000))
            total += len(pieces\[\-1\])
        self.data \= b''.join(pieces)
        print(f"Received from {self.client\_address\[0\]}:")
        print(self.data.decode("utf-8"))
        \# 发回同样的数据，但转为大写形式
        self.request.sendall(self.data.upper())
        \# 在我们返回后，套接字将被关闭。

if \_\_name\_\_ \== "\_\_main\_\_":
    HOST, PORT \= "localhost", 9999

    \# 创建服务器，绑定到 localhost 的 9999 端口
    with socketserver.TCPServer((HOST, PORT), MyTCPHandler) as server:
        \# 激活服务器；它将持续运行直到你
        \# 使用 Ctrl-C 中断程序
        server.serve\_forever()

一个使用流（通过提供标准文件接口来简化通信的文件型对象）的替代请求处理器类:

class MyTCPHandler(socketserver.StreamRequestHandler):

    def handle(self):
        \# self.rfile 是由该处理器创建的文件型对象。
        \# 我们现在可以使用 readline() 代替原始 recv() 调用
        \# 我们自己限制为 10000 字节以避免被发送方滥用。
        self.data \= self.rfile.readline(10000).rstrip()
        print(f"{self.client\_address\[0\]} wrote:")
        print(self.data.decode("utf-8"))
        \# 类似地，self.wfile 是用于写回到客户端的
        \# 文件型对象
        self.wfile.write(self.data.upper())

不同之处在于第二个处理器中的 `readline()` 调用将多次调用 `recv()` 直至遇到一个换行符，而第一个处理器必须使用一个 `recv()` 循环来累积数据直至遇到一个换行符。如果它只使用一个 `recv()` 而不带循环则将只返回当前已从客户端接收的内容。TCP 是基于流的：数据将按其发送顺序到达，但在客户端 `send()` 或 `sendall()` 调用和服务端需要接收它的 `recv()` 调用次数之间并没有关联。

以下是客户端:

import socket
import sys

HOST, PORT \= "localhost", 9999
data \= " ".join(sys.argv\[1:\])

\# 创建一个套接字 (SOCK\_STREAM 表示一个 TCP 套接字)
with socket.socket(socket.AF\_INET, socket.SOCK\_STREAM) as sock:
    \# 连接到服务器并发送数据
    sock.connect((HOST, PORT))
    sock.sendall(bytes(data, "utf-8"))
    sock.sendall(b"\\n")

    \# 从服务器接收数据并关闭
    received \= str(sock.recv(1024), "utf-8")

print("Sent:    ", data)
print("Received:", received)

这个示例程序的输出应该是像这样的：

服务器：

$ python TCPServer.py
127.0.0.1 wrote:
b'hello world with TCP'
127.0.0.1 wrote:
b'python is nice'

客户端：

$ python TCPClient.py hello world with TCP
Sent:     hello world with TCP
Received: HELLO WORLD WITH TCP
$ python TCPClient.py python is nice
Sent:     python is nice
Received: PYTHON IS NICE

### [`socketserver.UDPServer`](#socketserver.UDPServer "socketserver.UDPServer") 示例[¶](#socketserver-udpserver-example "Link to this heading")

以下是服务端:

import socketserver

class MyUDPHandler(socketserver.BaseRequestHandler):
    """
    This class works similar to the TCP handler class, except that
    self.request consists of a pair of data and client socket, and since
    there is no connection the client address must be given explicitly
    when sending data back via sendto().
    """

    def handle(self):
        data \= self.request\[0\].strip()
        socket \= self.request\[1\]
        print(f"{self.client\_address\[0\]} wrote:")
        print(data)
        socket.sendto(data.upper(), self.client\_address)

if \_\_name\_\_ \== "\_\_main\_\_":
    HOST, PORT \= "localhost", 9999
    with socketserver.UDPServer((HOST, PORT), MyUDPHandler) as server:
        server.serve\_forever()

以下是客户端:

import socket
import sys

HOST, PORT \= "localhost", 9999
data \= " ".join(sys.argv\[1:\])

\# SOCK\_DGRAM 是用于 UDP 套接字的套接字类型
sock \= socket.socket(socket.AF\_INET, socket.SOCK\_DGRAM)

\# 如你所见，没有 connect() 调用；UDP 没有连接。
\# 数据是通过 sendto() 直接发给接收方的。
sock.sendto(bytes(data + "\\n", "utf-8"), (HOST, PORT))
received \= str(sock.recv(1024), "utf-8")

print("Sent:    ", data)
print("Received:", received)

这个示例程序的输出应该是与 TCP 服务器示例相一致的。

### 异步混合类[¶](#asynchronous-mixins "Link to this heading")

要构建异步处理器，请使用 [`ThreadingMixIn`](#socketserver.ThreadingMixIn "socketserver.ThreadingMixIn") 和 [`ForkingMixIn`](#socketserver.ForkingMixIn "socketserver.ForkingMixIn") 类。

[`ThreadingMixIn`](#socketserver.ThreadingMixIn "socketserver.ThreadingMixIn") 类的示例:

import socket
import threading
import socketserver

class ThreadedTCPRequestHandler(socketserver.BaseRequestHandler):

    def handle(self):
        data \= str(self.request.recv(1024), 'ascii')
        cur\_thread \= threading.current\_thread()
        response \= bytes("{}: {}".format(cur\_thread.name, data), 'ascii')
        self.request.sendall(response)

class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    pass

def client(ip, port, message):
    with socket.socket(socket.AF\_INET, socket.SOCK\_STREAM) as sock:
        sock.connect((ip, port))
        sock.sendall(bytes(message, 'ascii'))
        response \= str(sock.recv(1024), 'ascii')
        print("Received: {}".format(response))

if \_\_name\_\_ \== "\_\_main\_\_":
    \# 端口 0 表示选择任意一个未使用的端口
    HOST, PORT \= "localhost", 0

    server \= ThreadedTCPServer((HOST, PORT), ThreadedTCPRequestHandler)
    with server:
        ip, port \= server.server\_address

        \# 启动一个服务器线程 -- 该线程将在此后
        \# 为每个请求再启动一个线程
        server\_thread \= threading.Thread(target\=server.serve\_forever)
        \# 在主线程终结时退出服务器线程
        server\_thread.daemon \= True
        server\_thread.start()
        print("Server loop running in thread:", server\_thread.name)

        client(ip, port, "Hello World 1")
        client(ip, port, "Hello World 2")
        client(ip, port, "Hello World 3")

        server.shutdown()

这个示例程序的输出应该是像这样的：

$ python ThreadedTCPServer.py
Server loop running in thread: Thread-1
Received: Thread-2: Hello World 1
Received: Thread-3: Hello World 2
Received: Thread-4: Hello World 3

[`ForkingMixIn`](#socketserver.ForkingMixIn "socketserver.ForkingMixIn") 类的使用方式是相同的，区别在于服务器将为每个请求产生一个新的进程。仅在支持 [`fork()`](https://docs.python.org/zh-cn/3/library/os.html#os.fork "os.fork") 的 POSIX 系统平台上可用。
