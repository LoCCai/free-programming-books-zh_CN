一个非阻塞, 单线程 TCP 服务.

_class_ `tornado.tcpserver.``TCPServer`(_io\_loop=None_, _ssl\_options=None_, _max\_buffer\_size=None_, _read\_chunk\_size=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/tcpserver.html#TCPServer)[¶](#tornado.tcpserver.TCPServer "永久链接至目标")

一个非阻塞, 单线程的 TCP 服务.

想要使用 [`TCPServer`](#tornado.tcpserver.TCPServer "tornado.tcpserver.TCPServer"), 只需要定义一个子类, 复写 [`handle_stream`](#tornado.tcpserver.TCPServer.handle_stream "tornado.tcpserver.TCPServer.handle_stream") 方法即可. 例如, 一个简单的 echo server 可以做如下定义:

from tornado.tcpserver import TCPServer
from tornado.iostream import StreamClosedError
from tornado import gen

class EchoServer(TCPServer):
    @gen.coroutine
    def handle\_stream(self, stream, address):
        while True:
            try:
                data \= yield stream.read\_until(b"\\n")
                yield stream.write(data)
            except StreamClosedError:
                break

为了使该服务提供 SSL 传输, 通过一个名为\`\`ssl\_options\`\` 的关键字参数 传递进去 [`ssl.SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") 对象即可. 为了兼容旧版本的 Python, `ssl_options` 也可以是一个字典, 作为\`ssl.wrap\_socket\` 方法的关键字 参数.:

ssl\_ctx \= ssl.create\_default\_context(ssl.Purpose.CLIENT\_AUTH)
ssl\_ctx.load\_cert\_chain(os.path.join(data\_dir, "mydomain.crt"),
                        os.path.join(data\_dir, "mydomain.key"))
TCPServer(ssl\_options\=ssl\_ctx)

[`TCPServer`](#tornado.tcpserver.TCPServer "tornado.tcpserver.TCPServer") 初始化可以是以下三种模式之一:

1.  [`listen`](#tornado.tcpserver.TCPServer.listen "tornado.tcpserver.TCPServer.listen"): 简单的单进程模式:
    
    server \= TCPServer()
    server.listen(8888)
    IOLoop.current().start()
    
2.  [`bind`](#tornado.tcpserver.TCPServer.bind "tornado.tcpserver.TCPServer.bind")/[`start`](#tornado.tcpserver.TCPServer.start "tornado.tcpserver.TCPServer.start"): 简单的多进程模式:
    
    server \= TCPServer()
    server.bind(8888)
    server.start(0)  \# Forks multiple sub-processes
    IOLoop.current().start()
    
    当使用这个接口, [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") 一定 _不能_ 被传递给 [`TCPServer`](#tornado.tcpserver.TCPServer "tornado.tcpserver.TCPServer") 构造器. [`start`](#tornado.tcpserver.TCPServer.start "tornado.tcpserver.TCPServer.start") 总是会在默认单一的 [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") 上启动服务.
    
3.  [`add_sockets`](#tornado.tcpserver.TCPServer.add_sockets "tornado.tcpserver.TCPServer.add_sockets"): 高级多进程模式:
    
    sockets \= bind\_sockets(8888)
    tornado.process.fork\_processes(0)
    server \= TCPServer()
    server.add\_sockets(sockets)
    IOLoop.current().start()
    
    [`add_sockets`](#tornado.tcpserver.TCPServer.add_sockets "tornado.tcpserver.TCPServer.add_sockets") 接口更加复杂, 但是它可以和 [`tornado.process.fork_processes`](https://tornado-zh.readthedocs.io/zh/latest/process.html#tornado.process.fork_processes "tornado.process.fork_processes") 一起被使用, 当 fork 发生的时候给你更多灵活性. [`add_sockets`](#tornado.tcpserver.TCPServer.add_sockets "tornado.tcpserver.TCPServer.add_sockets") 也可以被用于 单进程服务中, 如果你想要使用 [`bind_sockets`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.bind_sockets "tornado.netutil.bind_sockets") 以外的方式 创建你监听的 socket.
    

3.1 新版功能: `max_buffer_size` 参数.

`listen`(_port_, _address=''_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/tcpserver.html#TCPServer.listen)[¶](#tornado.tcpserver.TCPServer.listen "永久链接至目标")

开始在给定的端口接收连接.

这个方法可能不只被调用一次, 可能会在多个端口上被调用多次. [`listen`](#tornado.tcpserver.TCPServer.listen "tornado.tcpserver.TCPServer.listen") 方法将立即生效, 所以它没必要在 [`TCPServer.start`](#tornado.tcpserver.TCPServer.start "tornado.tcpserver.TCPServer.start") 之后调用. 然而, 必须要启动 [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") 才可以.

`add_sockets`(_sockets_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/tcpserver.html#TCPServer.add_sockets)[¶](#tornado.tcpserver.TCPServer.add_sockets "永久链接至目标")

使服务开始接收给定端口的连接.

`sockets` 参数是一个 socket 对象的列表, 例如那些被 [`bind_sockets`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.bind_sockets "tornado.netutil.bind_sockets") 所返回的对象. [`add_sockets`](#tornado.tcpserver.TCPServer.add_sockets "tornado.tcpserver.TCPServer.add_sockets") 通常和 [`tornado.process.fork_processes`](https://tornado-zh.readthedocs.io/zh/latest/process.html#tornado.process.fork_processes "tornado.process.fork_processes") 相结合使用, 以便于在一个多进程服务初始化时提供更多控制.

`add_socket`(_socket_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/tcpserver.html#TCPServer.add_socket)[¶](#tornado.tcpserver.TCPServer.add_socket "永久链接至目标")

单数版本的 [`add_sockets`](#tornado.tcpserver.TCPServer.add_sockets "tornado.tcpserver.TCPServer.add_sockets"). 接受一个单一的 socket 对象.

`bind`(_port_, _address=None_, _family=<AddressFamily.AF\_UNSPEC: 0>_, _backlog=128_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/tcpserver.html#TCPServer.bind)[¶](#tornado.tcpserver.TCPServer.bind "永久链接至目标")

绑定该服务到指定的地址的指定端口上.

要启动该服务, 调用 [`start`](#tornado.tcpserver.TCPServer.start "tornado.tcpserver.TCPServer.start"). 如果你想要在一个单进程上运行该服务, 你可以调用 [`listen`](#tornado.tcpserver.TCPServer.listen "tornado.tcpserver.TCPServer.listen") 作为顺序调用 [`bind`](#tornado.tcpserver.TCPServer.bind "tornado.tcpserver.TCPServer.bind") 和 [`start`](#tornado.tcpserver.TCPServer.start "tornado.tcpserver.TCPServer.start") 的一个快捷方式.

address 参数可以是 IP 地址或者主机名. 如果它是主机名, 该服务将监听在和该名称有关的所有 IP 地址上. 地址也可以是空字符串或者 None, 服务将监听所有可用的接口. family 可以被设置为 [`socket.AF_INET`](https://docs.python.org/3.4/library/socket.html#socket.AF_INET "(在 Python v3.4)") 或 [`socket.AF_INET6`](https://docs.python.org/3.4/library/socket.html#socket.AF_INET6 "(在 Python v3.4)") 用来限定是 IPv4 或 IPv6 地址, 否则如果可用的话, 两者 都将被使用.

`backlog` 参数和 [`socket.listen`](https://docs.python.org/3.4/library/socket.html#socket.socket.listen "(在 Python v3.4)") 是相同含义.

这个方法可能在 [`start`](#tornado.tcpserver.TCPServer.start "tornado.tcpserver.TCPServer.start") 之前被调用多次来监听在多个端口或接口上.

`start`(_num\_processes=1_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/tcpserver.html#TCPServer.start)[¶](#tornado.tcpserver.TCPServer.start "永久链接至目标")

在 [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") 中启动该服务.

默认情况下, 我们在该进程中运行服务, 并且不会 fork 出任何额外 的子进程.

如果 num\_processes 为 `None` 或 <= 0, 我们检测这台机器上可用的 核心数并 fork 相同数量的子进程. 如果给定了 num\_processes 并且 > 1, 我们 fork 指定数量的子进程.

因为我们使用进程而不是线程, 在任何服务代码之间没有共享内存.

注意多进程模式和 autoreload 模块不兼容(或者是当 `debug=True` 时 [`tornado.web.Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") 的 `autoreload=True` 选项默认为 True). 当使用多进程模式时, 直到 `TCPServer.start(n)` 调用后, 才能创建或者 引用 IOLoops .

`stop`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/tcpserver.html#TCPServer.stop)[¶](#tornado.tcpserver.TCPServer.stop "永久链接至目标")

停止对新连接的监听.

正在进行的请求可能仍然会继续在服务停止之后.

`handle_stream`(_stream_, _address_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/tcpserver.html#TCPServer.handle_stream)[¶](#tornado.tcpserver.TCPServer.handle_stream "永久链接至目标")

通过复写这个方法以处理一个来自传入连接的新 [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") .

这个方法可能是一个协程; 如果是这样, 异步引发的任何异常都将被记录. 接受传入连接不会被该协程阻塞.

如果这个 [`TCPServer`](#tornado.tcpserver.TCPServer "tornado.tcpserver.TCPServer") 被配置为 SSL, `handle_stream` 将在 SSL 握手完成前被调用. 如果你需要验证客户端的证书或使用 NPN/ALPN 请使用 [`SSLIOStream.wait_for_handshake`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.SSLIOStream.wait_for_handshake "tornado.iostream.SSLIOStream.wait_for_handshake") .

在 4.2 版更改: 给这个方法添加了选项, 可以为协程.
