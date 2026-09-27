-   [Docs](https://tornado-zh.readthedocs.io/zh/latest/index.html) »
-   [版本记录](https://tornado-zh.readthedocs.io/zh/latest/releases.html) »
-   What’s new in Tornado 3.1.1
-   [Edit on GitHub](https://github.com/tao12345666333/tornado-zh/blob/master/docs/releases/v3.1.1.rst)

* * *

## Sep 1, 2013[¶](#sep-1-2013 "永久链接至标题")

-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") no longer fails if the client requests a `Range` that is larger than the entire file (Facebook has a crawler that does this).
-   [`RequestHandler.on_connection_close`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.on_connection_close "tornado.web.RequestHandler.on_connection_close") now works correctly on subsequent requests of a keep-alive connection.
