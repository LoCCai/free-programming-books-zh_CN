-   [Docs](https://tornado-zh.readthedocs.io/zh/latest/index.html) »
-   [异步网络](https://tornado-zh.readthedocs.io/zh/latest/networking.html) »
-   `tornado.tcpclient` — `IOStream` connection factory
-   [Edit on GitHub](https://github.com/tao12345666333/tornado-zh/blob/master/docs/tcpclient.rst)

* * *

A non-blocking TCP connection factory.

_class_ `tornado.tcpclient.``TCPClient`(_resolver=None_, _io\_loop=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/tcpclient.html#TCPClient)[¶](#tornado.tcpclient.TCPClient "永久链接至目标")

A non-blocking TCP connection factory.

在 4.1 版更改: The `io_loop` argument is deprecated.

`connect`(_host_, _port_, _af=<AddressFamily.AF\_UNSPEC: 0>_, _ssl\_options=None_, _max\_buffer\_size=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/tcpclient.html#TCPClient.connect)[¶](#tornado.tcpclient.TCPClient.connect "永久链接至目标")

Connect to the given host and port.

Asynchronously returns an [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") (or [`SSLIOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.SSLIOStream "tornado.iostream.SSLIOStream") if `ssl_options` is not None).
