非阻塞，单线程 HTTP server。

典型的应用很少与 [`HTTPServer`](#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") 类直接交互，除非在进程开始时开启server （尽管这经常间接的通过 [`tornado.web.Application.listen`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application.listen "tornado.web.Application.listen") 来完成）。

## HTTP Server[¶](#http-server "永久链接至标题")

_class_ `tornado.httpserver.``HTTPServer`(_\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httpserver.html#HTTPServer)[¶](#tornado.httpserver.HTTPServer "永久链接至目标")

非阻塞，单线程 HTTP server。

一个server可以由一个 [`HTTPServerConnectionDelegate`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerConnectionDelegate "tornado.httputil.HTTPServerConnectionDelegate") 的子类定义， 或者，为了向后兼容，由一个以 [`HTTPServerRequest`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerRequest "tornado.httputil.HTTPServerRequest") 为参数的callback定义。 它的委托对象(delegate)通常是 [`tornado.web.Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") 。

[`HTTPServer`](#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") 默认支持keep-alive链接（对于HTTP/1.1自动开启，而对于HTTP/1.0， 需要client发起 `Connection: keep-alive` 请求）。

如果 `xheaders` 是 `True` ，我们支持 `X-Real-Ip`/`X-Forwarded-For` 和 `X-Scheme`/`X-Forwarded-Proto` 首部字段，他们将会覆盖 所有请求的 remote IP 与 URI scheme/protocol 。 当Tornado运行在反向代理或者负载均衡(load balancer)之后时， 这些首部字段非常有用。如果Tornado运行在一个不设置任何一个支持的 `xheaders` 的SSL-decoding代理之后， `protocol` 参数也能设置为 `https` 。

要使server可以服务于SSL加密的流量，需要把 `ssl_option` 参数 设置为一个 [`ssl.SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") 对象。为了兼容旧版本的Python `ssl_options` 可能也是一个字典(dictionary)，其中包含传给 [`ssl.wrap_socket`](https://docs.python.org/3.4/library/ssl.html#ssl.wrap_socket "(在 Python v3.4)") 方法的关键 字参数。:

ssl\_ctx \= ssl.create\_default\_context(ssl.Purpose.CLIENT\_AUTH)
ssl\_ctx.load\_cert\_chain(os.path.join(data\_dir, "mydomain.crt"),
                        os.path.join(data\_dir, "mydomain.key"))
HTTPServer(applicaton, ssl\_options\=ssl\_ctx)

[`HTTPServer`](#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") 的初始化依照以下三种模式之一（初始化方法定义 在 [`tornado.tcpserver.TCPServer`](https://tornado-zh.readthedocs.io/zh/latest/tcpserver.html#tornado.tcpserver.TCPServer "tornado.tcpserver.TCPServer") ）：

1.  [`listen`](https://tornado-zh.readthedocs.io/zh/latest/tcpserver.html#tornado.tcpserver.TCPServer.listen "tornado.tcpserver.TCPServer.listen"): 简单的单进程:
    
    server \= HTTPServer(app)
    server.listen(8888)
    IOLoop.current().start()
    
    在很多情形下， [`tornado.web.Application.listen`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application.listen "tornado.web.Application.listen") 可以用来避免显式的 创建 [`HTTPServer`](#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") 。
    
2.  [`bind`](https://tornado-zh.readthedocs.io/zh/latest/tcpserver.html#tornado.tcpserver.TCPServer.bind "tornado.tcpserver.TCPServer.bind")/[`start`](https://tornado-zh.readthedocs.io/zh/latest/tcpserver.html#tornado.tcpserver.TCPServer.start "tornado.tcpserver.TCPServer.start"): 简单的多进程:
    
    server \= HTTPServer(app)
    server.bind(8888)
    server.start(0)  \# Fork 多个子进程
    IOLoop.current().start()
    
    当使用这个接口时，一个 [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") 不能被传给 [`HTTPServer`](#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") 的构造方法(constructor)。 [`start`](https://tornado-zh.readthedocs.io/zh/latest/tcpserver.html#tornado.tcpserver.TCPServer.start "tornado.tcpserver.TCPServer.start") 将默认 在单例 [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") 上开启server。
    
3.  [`add_sockets`](https://tornado-zh.readthedocs.io/zh/latest/tcpserver.html#tornado.tcpserver.TCPServer.add_sockets "tornado.tcpserver.TCPServer.add_sockets"): 高级多进程:
    
    sockets \= tornado.netutil.bind\_sockets(8888)
    tornado.process.fork\_processes(0)
    server \= HTTPServer(app)
    server.add\_sockets(sockets)
    IOLoop.current().start()
    
    [`add_sockets`](https://tornado-zh.readthedocs.io/zh/latest/tcpserver.html#tornado.tcpserver.TCPServer.add_sockets "tornado.tcpserver.TCPServer.add_sockets") 接口更加复杂， 但是，当fork发生的时候，它可以与 [`tornado.process.fork_processes`](https://tornado-zh.readthedocs.io/zh/latest/process.html#tornado.process.fork_processes "tornado.process.fork_processes") 一起使用来提供更好的灵活性。 如果你想使用其他的方法，而不是 [`tornado.netutil.bind_sockets`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.bind_sockets "tornado.netutil.bind_sockets") ， 来创建监听socket， [`add_sockets`](https://tornado-zh.readthedocs.io/zh/latest/tcpserver.html#tornado.tcpserver.TCPServer.add_sockets "tornado.tcpserver.TCPServer.add_sockets") 也可以被用在单进程server中。
    

在 4.0 版更改: 增加了 `decompress_request`, `chunk_size`, `max_header_size`, `idle_connection_timeout`, `body_timeout`, `max_body_size` 参数。支持 [`HTTPServerConnectionDelegate`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerConnectionDelegate "tornado.httputil.HTTPServerConnectionDelegate") 实例化为 `request_callback` 。
