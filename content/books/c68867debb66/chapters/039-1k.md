Bridges between the Twisted reactor and Tornado IOLoop.

This module lets you run applications and libraries written for Twisted in a Tornado application. It can be used in two modes, depending on which library’s underlying event loop you want to use.

This module has been tested with Twisted versions 11.0.0 and newer.

## Twisted on Tornado[¶](#twisted-on-tornado "永久链接至标题")

_class_ `tornado.platform.twisted.``TornadoReactor`(_io\_loop=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/platform/twisted.html#TornadoReactor)[¶](#tornado.platform.twisted.TornadoReactor "永久链接至目标")

Twisted reactor built on the Tornado IOLoop.

[`TornadoReactor`](#tornado.platform.twisted.TornadoReactor "tornado.platform.twisted.TornadoReactor") implements the Twisted reactor interface on top of the Tornado IOLoop. To use it, simply call [`install`](#tornado.platform.twisted.install "tornado.platform.twisted.install") at the beginning of the application:

import tornado.platform.twisted
tornado.platform.twisted.install()
from twisted.internet import reactor

When the app is ready to start, call `IOLoop.current().start()` instead of `reactor.run()`.

It is also possible to create a non-global reactor by calling `tornado.platform.twisted.TornadoReactor(io_loop)`. However, if the [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") and reactor are to be short-lived (such as those used in unit tests), additional cleanup may be required. Specifically, it is recommended to call:

reactor.fireSystemEvent('shutdown')
reactor.disconnectAll()

before closing the [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop").

在 4.1 版更改: The `io_loop` argument is deprecated.

`tornado.platform.twisted.``install`(_io\_loop=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/platform/twisted.html#install)[¶](#tornado.platform.twisted.install "永久链接至目标")

Install this package as the default Twisted reactor.

`install()` must be called very early in the startup process, before most other twisted-related imports. Conversely, because it initializes the [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), it cannot be called before [`fork_processes`](https://tornado-zh.readthedocs.io/zh/latest/process.html#tornado.process.fork_processes "tornado.process.fork_processes") or multi-process [`start`](https://tornado-zh.readthedocs.io/zh/latest/tcpserver.html#tornado.tcpserver.TCPServer.start "tornado.tcpserver.TCPServer.start"). These conflicting requirements make it difficult to use [`TornadoReactor`](#tornado.platform.twisted.TornadoReactor "tornado.platform.twisted.TornadoReactor") in multi-process mode, and an external process manager such as `supervisord` is recommended instead.

在 4.1 版更改: The `io_loop` argument is deprecated.

## Tornado on Twisted[¶](#tornado-on-twisted "永久链接至标题")

_class_ `tornado.platform.twisted.``TwistedIOLoop`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/platform/twisted.html#TwistedIOLoop)[¶](#tornado.platform.twisted.TwistedIOLoop "永久链接至目标")

IOLoop implementation that runs on Twisted.

[`TwistedIOLoop`](#tornado.platform.twisted.TwistedIOLoop "tornado.platform.twisted.TwistedIOLoop") implements the Tornado IOLoop interface on top of the Twisted reactor. Recommended usage:

from tornado.platform.twisted import TwistedIOLoop
from twisted.internet import reactor
TwistedIOLoop().install()
\# Set up your tornado application as usual using \`IOLoop.instance\`
reactor.run()

Uses the global Twisted reactor by default. To create multiple `TwistedIOLoops` in the same process, you must pass a unique reactor when constructing each one.

Not compatible with [`tornado.process.Subprocess.set_exit_callback`](https://tornado-zh.readthedocs.io/zh/latest/process.html#tornado.process.Subprocess.set_exit_callback "tornado.process.Subprocess.set_exit_callback") because the `SIGCHLD` handlers used by Tornado and Twisted conflict with each other.

## Twisted DNS resolver[¶](#twisted-dns-resolver "永久链接至标题")

_class_ `tornado.platform.twisted.``TwistedResolver`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/platform/twisted.html#TwistedResolver)[¶](#tornado.platform.twisted.TwistedResolver "永久链接至目标")

Twisted-based asynchronous resolver.

This is a non-blocking and non-threaded resolver. It is recommended only when threads cannot be used, since it has limitations compared to the standard `getaddrinfo`\-based [`Resolver`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.Resolver "tornado.netutil.Resolver") and [`ThreadedResolver`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.ThreadedResolver "tornado.netutil.ThreadedResolver"). Specifically, it returns at most one result, and arguments other than `host` and `family` are ignored. It may fail to resolve when `family` is not `socket.AF_UNSPEC`.

Requires Twisted 12.1 or newer.

在 4.1 版更改: The `io_loop` argument is deprecated.
