## Sep 4, 2012[¶](#sep-4-2012 "永久链接至标题")

### HTTP clients[¶](#http-clients "永久链接至标题")

-   Removed `max_simultaneous_connections` argument from [`tornado.httpclient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#module-tornado.httpclient "tornado.httpclient") (both implementations). This argument hasn’t been useful for some time (if you were using it you probably want `max_clients` instead)
-   `tornado.simple_httpclient` now accepts and ignores HTTP 1xx status responses.

### [`tornado.ioloop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#module-tornado.ioloop "tornado.ioloop") and [`tornado.iostream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#module-tornado.iostream "tornado.iostream")[¶](#tornado-ioloop-and-tornado-iostream "永久链接至标题")

-   Fixed a bug introduced in 2.3 that would cause [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") close callbacks to not run if there were pending reads.
-   Improved error handling in [`SSLIOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.SSLIOStream "tornado.iostream.SSLIOStream") and SSL-enabled [`TCPServer`](https://tornado-zh.readthedocs.io/zh/latest/tcpserver.html#tornado.tcpserver.TCPServer "tornado.tcpserver.TCPServer").
-   `SSLIOStream.get_ssl_certificate` now has a `binary_form` argument which is passed to `SSLSocket.getpeercert`.
-   `SSLIOStream.write` can now be called while the connection is in progress, same as non-SSL [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") (but be careful not to send sensitive data until the connection has completed and the certificate has been verified).
-   [`IOLoop.add_handler`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_handler "tornado.ioloop.IOLoop.add_handler") cannot be called more than once with the same file descriptor. This was always true for `epoll`, but now the other implementations enforce it too.
-   On Windows, [`TCPServer`](https://tornado-zh.readthedocs.io/zh/latest/tcpserver.html#tornado.tcpserver.TCPServer "tornado.tcpserver.TCPServer") uses `SO_EXCLUSIVEADDRUSER` instead of `SO_REUSEADDR`.

### [`tornado.template`](https://tornado-zh.readthedocs.io/zh/latest/template.html#module-tornado.template "tornado.template")[¶](#tornado-template "永久链接至标题")

-   `{% break %}` and `{% continue %}` can now be used looping constructs in templates.
-   It is no longer an error for an if/else/for/etc block in a template to have an empty body.

### [`tornado.testing`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#module-tornado.testing "tornado.testing")[¶](#tornado-testing "永久链接至标题")

-   New class [`tornado.testing.AsyncHTTPSTestCase`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.AsyncHTTPSTestCase "tornado.testing.AsyncHTTPSTestCase") is like [`AsyncHTTPTestCase`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.AsyncHTTPTestCase "tornado.testing.AsyncHTTPTestCase"). but enables SSL for the testing server (by default using a self-signed testing certificate).
-   [`tornado.testing.main`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.main "tornado.testing.main") now accepts additional keyword arguments and forwards them to [`unittest.main`](https://docs.python.org/3.4/library/unittest.html#unittest.main "(在 Python v3.4)").

### [`tornado.web`](https://tornado-zh.readthedocs.io/zh/latest/web.html#module-tornado.web "tornado.web")[¶](#tornado-web "永久链接至标题")

-   New method [`RequestHandler.get_template_namespace`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_template_namespace "tornado.web.RequestHandler.get_template_namespace") can be overridden to add additional variables without modifying keyword arguments to `render_string`.
-   [`RequestHandler.add_header`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.add_header "tornado.web.RequestHandler.add_header") now works with [`WSGIApplication`](https://tornado-zh.readthedocs.io/zh/latest/wsgi.html#tornado.wsgi.WSGIApplication "tornado.wsgi.WSGIApplication").
-   [`RequestHandler.get_secure_cookie`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_secure_cookie "tornado.web.RequestHandler.get_secure_cookie") now handles a potential error case.
-   `RequestHandler.__init__` now calls `super().__init__` to ensure that all constructors are called when multiple inheritance is used.
-   Docs have been updated with a description of all available [`Application settings`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application.settings "tornado.web.Application.settings")

### Other modules[¶](#other-modules "永久链接至标题")

-   [`OAuthMixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.OAuthMixin "tornado.auth.OAuthMixin") now accepts `"oob"` as a `callback_uri`.
-   [`OpenIdMixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.OpenIdMixin "tornado.auth.OpenIdMixin") now also returns the `claimed_id` field for the user.
-   [`tornado.platform.twisted`](https://tornado-zh.readthedocs.io/zh/latest/twisted.html#module-tornado.platform.twisted "tornado.platform.twisted") shutdown sequence is now more compatible.
-   The logging configuration used in [`tornado.options`](https://tornado-zh.readthedocs.io/zh/latest/options.html#module-tornado.options "tornado.options") is now more tolerant of non-ascii byte strings.
