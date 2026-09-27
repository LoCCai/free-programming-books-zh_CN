## Sept 10, 2014[¶](#sept-10-2014 "永久链接至标题")

### Bug fixes[¶](#bug-fixes "永久链接至标题")

-   Fixed a bug that could sometimes cause a timeout to fire after being cancelled.
-   [`AsyncTestCase`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.AsyncTestCase "tornado.testing.AsyncTestCase") once again passes along arguments to test methods, making it compatible with extensions such as Nose’s test generators.
-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") can again compress its responses when gzip is enabled.
-   `simple_httpclient` passes its `max_buffer_size` argument to the underlying stream.
-   Fixed a reference cycle that can lead to increased memory consumption.
-   [`add_accept_handler`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.add_accept_handler "tornado.netutil.add_accept_handler") will now limit the number of times it will call [`accept`](https://docs.python.org/3.4/library/socket.html#socket.socket.accept "(在 Python v3.4)") per [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") iteration, addressing a potential starvation issue.
-   Improved error handling in [`IOStream.connect`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream.connect "tornado.iostream.IOStream.connect") (primarily for FreeBSD systems)
