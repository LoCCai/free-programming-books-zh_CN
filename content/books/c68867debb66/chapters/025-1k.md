Miscellaneous network utility code.

`tornado.netutil.``bind_sockets`(_port_, _address=None_, _family=<AddressFamily.AF\_UNSPEC: 0>_, _backlog=128_, _flags=None_, _reuse\_port=False_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#bind_sockets)[¶](#tornado.netutil.bind_sockets "永久链接至目标")

Creates listening sockets bound to the given port and address.

Returns a list of socket objects (multiple sockets are returned if the given address maps to multiple IP addresses, which is most common for mixed IPv4 and IPv6 use).

Address may be either an IP address or hostname. If it’s a hostname, the server will listen on all IP addresses associated with the name. Address may be an empty string or None to listen on all available interfaces. Family may be set to either [`socket.AF_INET`](https://docs.python.org/3.4/library/socket.html#socket.AF_INET "(在 Python v3.4)") or [`socket.AF_INET6`](https://docs.python.org/3.4/library/socket.html#socket.AF_INET6 "(在 Python v3.4)") to restrict to IPv4 or IPv6 addresses, otherwise both will be used if available.

The `backlog` argument has the same meaning as for [`socket.listen()`](https://docs.python.org/3.4/library/socket.html#socket.socket.listen "(在 Python v3.4)").

`flags` is a bitmask of AI\_\* flags to [`getaddrinfo`](https://docs.python.org/3.4/library/socket.html#socket.getaddrinfo "(在 Python v3.4)"), like `socket.AI_PASSIVE | socket.AI_NUMERICHOST`.

`resuse_port` option sets `SO_REUSEPORT` option for every socket in the list. If your platform doesn’t support this option ValueError will be raised.

`tornado.netutil.``bind_unix_socket`(_file_, _mode=384_, _backlog=128_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#bind_unix_socket)[¶](#tornado.netutil.bind_unix_socket "永久链接至目标")

Creates a listening unix socket.

If a socket with the given name already exists, it will be deleted. If any other file with that name exists, an exception will be raised.

Returns a socket object (not a list of socket objects like [`bind_sockets`](#tornado.netutil.bind_sockets "tornado.netutil.bind_sockets"))

`tornado.netutil.``add_accept_handler`(_sock_, _callback_, _io\_loop=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#add_accept_handler)[¶](#tornado.netutil.add_accept_handler "永久链接至目标")

Adds an [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") event handler to accept new connections on `sock`.

When a connection is accepted, `callback(connection, address)` will be run (`connection` is a socket object, and `address` is the address of the other end of the connection). Note that this signature is different from the `callback(fd, events)` signature used for [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") handlers.

在 4.1 版更改: The `io_loop` argument is deprecated.

`tornado.netutil.``is_valid_ip`(_ip_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#is_valid_ip)[¶](#tornado.netutil.is_valid_ip "永久链接至目标")

Returns true if the given string is a well-formed IP address.

Supports IPv4 and IPv6.

_class_ `tornado.netutil.``Resolver`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#Resolver)[¶](#tornado.netutil.Resolver "永久链接至目标")

Configurable asynchronous DNS resolver interface.

By default, a blocking implementation is used (which simply calls [`socket.getaddrinfo`](https://docs.python.org/3.4/library/socket.html#socket.getaddrinfo "(在 Python v3.4)")). An alternative implementation can be chosen with the [`Resolver.configure`](https://tornado-zh.readthedocs.io/zh/latest/util.html#tornado.util.Configurable.configure "tornado.util.Configurable.configure") class method:

Resolver.configure('tornado.netutil.ThreadedResolver')

The implementations of this interface included with Tornado are

-   [`tornado.netutil.BlockingResolver`](#tornado.netutil.BlockingResolver "tornado.netutil.BlockingResolver")
-   [`tornado.netutil.ThreadedResolver`](#tornado.netutil.ThreadedResolver "tornado.netutil.ThreadedResolver")
-   [`tornado.netutil.OverrideResolver`](#tornado.netutil.OverrideResolver "tornado.netutil.OverrideResolver")
-   [`tornado.platform.twisted.TwistedResolver`](https://tornado-zh.readthedocs.io/zh/latest/twisted.html#tornado.platform.twisted.TwistedResolver "tornado.platform.twisted.TwistedResolver")
-   [`tornado.platform.caresresolver.CaresResolver`](https://tornado-zh.readthedocs.io/zh/latest/caresresolver.html#tornado.platform.caresresolver.CaresResolver "tornado.platform.caresresolver.CaresResolver")

`resolve`(_host_, _port_, _family=<AddressFamily.AF\_UNSPEC: 0>_, _callback=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#Resolver.resolve)[¶](#tornado.netutil.Resolver.resolve "永久链接至目标")

Resolves an address.

The `host` argument is a string which may be a hostname or a literal IP address.

Returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") whose result is a list of (family, address) pairs, where address is a tuple suitable to pass to [`socket.connect`](https://docs.python.org/3.4/library/socket.html#socket.socket.connect "(在 Python v3.4)") (i.e. a `(host, port)` pair for IPv4; additional fields may be present for IPv6). If a `callback` is passed, it will be run with the result as an argument when it is complete.

`close`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#Resolver.close)[¶](#tornado.netutil.Resolver.close "永久链接至目标")

Closes the [`Resolver`](#tornado.netutil.Resolver "tornado.netutil.Resolver"), freeing any resources used.

3.1 新版功能.

_class_ `tornado.netutil.``ExecutorResolver`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#ExecutorResolver)[¶](#tornado.netutil.ExecutorResolver "永久链接至目标")

Resolver implementation using a [`concurrent.futures.Executor`](https://docs.python.org/3.4/library/concurrent.futures.html#concurrent.futures.Executor "(在 Python v3.4)").

Use this instead of [`ThreadedResolver`](#tornado.netutil.ThreadedResolver "tornado.netutil.ThreadedResolver") when you require additional control over the executor being used.

The executor will be shut down when the resolver is closed unless `close_resolver=False`; use this if you want to reuse the same executor elsewhere.

在 4.1 版更改: The `io_loop` argument is deprecated.

_class_ `tornado.netutil.``BlockingResolver`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#BlockingResolver)[¶](#tornado.netutil.BlockingResolver "永久链接至目标")

Default [`Resolver`](#tornado.netutil.Resolver "tornado.netutil.Resolver") implementation, using [`socket.getaddrinfo`](https://docs.python.org/3.4/library/socket.html#socket.getaddrinfo "(在 Python v3.4)").

The [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") will be blocked during the resolution, although the callback will not be run until the next [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") iteration.

_class_ `tornado.netutil.``ThreadedResolver`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#ThreadedResolver)[¶](#tornado.netutil.ThreadedResolver "永久链接至目标")

Multithreaded non-blocking [`Resolver`](#tornado.netutil.Resolver "tornado.netutil.Resolver") implementation.

Requires the [`concurrent.futures`](https://docs.python.org/3.4/library/concurrent.futures.html#module-concurrent.futures "(在 Python v3.4)") package to be installed (available in the standard library since Python 3.2, installable with `pip install futures` in older versions).

The thread pool size can be configured with:

Resolver.configure('tornado.netutil.ThreadedResolver',
                   num\_threads\=10)

在 3.1 版更改: All `ThreadedResolvers` share a single thread pool, whose size is set by the first one to be created.

_class_ `tornado.netutil.``OverrideResolver`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#OverrideResolver)[¶](#tornado.netutil.OverrideResolver "永久链接至目标")

Wraps a resolver with a mapping of overrides.

This can be used to make local DNS changes (e.g. for testing) without modifying system-wide settings.

The mapping can contain either host strings or host-port pairs.

`tornado.netutil.``ssl_options_to_context`(_ssl\_options_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#ssl_options_to_context)[¶](#tornado.netutil.ssl_options_to_context "永久链接至目标")

Try to convert an `ssl_options` dictionary to an [`SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") object.

The `ssl_options` dictionary contains keywords to be passed to [`ssl.wrap_socket`](https://docs.python.org/3.4/library/ssl.html#ssl.wrap_socket "(在 Python v3.4)"). In Python 2.7.9+, [`ssl.SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") objects can be used instead. This function converts the dict form to its [`SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") equivalent, and may be used when a component which accepts both forms needs to upgrade to the [`SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") version to use features like SNI or NPN.

`tornado.netutil.``ssl_wrap_socket`(_socket_, _ssl\_options_, _server\_hostname=None_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/netutil.html#ssl_wrap_socket)[¶](#tornado.netutil.ssl_wrap_socket "永久链接至目标")

Returns an `ssl.SSLSocket` wrapping the given socket.

`ssl_options` may be either an [`ssl.SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") object or a dictionary (as accepted by [`ssl_options_to_context`](#tornado.netutil.ssl_options_to_context "tornado.netutil.ssl_options_to_context")). Additional keyword arguments are passed to `wrap_socket` (either the [`SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") method or the [`ssl`](https://docs.python.org/3.4/library/ssl.html#module-ssl "(在 Python v3.4)") module function as appropriate).
