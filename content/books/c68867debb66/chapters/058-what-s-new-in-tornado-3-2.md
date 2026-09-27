## Jan 14, 2014[¶](#jan-14-2014 "永久链接至标题")

### Installation[¶](#installation "永久链接至标题")

-   Tornado now depends on the [backports.ssl\_match\_hostname](https://pypi.python.org/pypi/backports.ssl_match_hostname) when running on Python 2. This will be installed automatically when using `pip` or `easy_install`
-   Tornado now includes an optional C extension module, which greatly improves performance of websockets. This extension will be built automatically if a C compiler is found at install time.

### New modules[¶](#new-modules "永久链接至标题")

-   The [`tornado.platform.asyncio`](https://tornado-zh.readthedocs.io/zh/latest/asyncio.html#module-tornado.platform.asyncio "tornado.platform.asyncio") module provides integration with the `asyncio` module introduced in Python 3.4 (also available for Python 3.3 with `pip install asyncio`).

### [`tornado.auth`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#module-tornado.auth "tornado.auth")[¶](#tornado-auth "永久链接至标题")

-   Added [`GoogleOAuth2Mixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.GoogleOAuth2Mixin "tornado.auth.GoogleOAuth2Mixin") support authentication to Google services with OAuth 2 instead of OpenID and OAuth 1.
-   [`FacebookGraphMixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.FacebookGraphMixin "tornado.auth.FacebookGraphMixin") has been updated to use the current Facebook login URL, which saves a redirect.

### [`tornado.concurrent`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#module-tornado.concurrent "tornado.concurrent")[¶](#tornado-concurrent "永久链接至标题")

-   `TracebackFuture` now accepts a `timeout` keyword argument (although it is still incorrect to use a non-zero timeout in non-blocking code).

### `tornado.curl_httpclient`[¶](#tornado-curl-httpclient "永久链接至标题")

-   `tornado.curl_httpclient` now works on Python 3 with the soon-to-be-released pycurl 7.19.3, which will officially support Python 3 for the first time. Note that there are some unofficial Python 3 ports of pycurl (Ubuntu has included one for its past several releases); these are not supported for use with Tornado.

### [`tornado.escape`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#module-tornado.escape "tornado.escape")[¶](#tornado-escape "永久链接至标题")

-   [`xhtml_escape`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.xhtml_escape "tornado.escape.xhtml_escape") now escapes apostrophes as well.
-   [`tornado.escape.utf8`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.utf8 "tornado.escape.utf8"), [`to_unicode`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.to_unicode "tornado.escape.to_unicode"), and [`native_str`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.native_str "tornado.escape.native_str") now raise [`TypeError`](https://docs.python.org/3.4/library/exceptions.html#TypeError "(在 Python v3.4)") instead of [`AssertionError`](https://docs.python.org/3.4/library/exceptions.html#AssertionError "(在 Python v3.4)") when given an invalid value.

### [`tornado.gen`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#module-tornado.gen "tornado.gen")[¶](#tornado-gen "永久链接至标题")

-   Coroutines may now yield dicts in addition to lists to wait for multiple tasks in parallel.
-   Improved performance of [`tornado.gen`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#module-tornado.gen "tornado.gen") when yielding a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") that is already done.

### [`tornado.httpclient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#module-tornado.httpclient "tornado.httpclient")[¶](#tornado-httpclient "永久链接至标题")

-   [`tornado.httpclient.HTTPRequest`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.HTTPRequest "tornado.httpclient.HTTPRequest") now uses property setters so that setting attributes after construction applies the same conversions as `__init__` (e.g. converting the body attribute to bytes).

### [`tornado.httpserver`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#module-tornado.httpserver "tornado.httpserver")[¶](#tornado-httpserver "永久链接至标题")

-   Malformed `x-www-form-urlencoded` request bodies will now log a warning and continue instead of causing the request to fail (similar to the existing handling of malformed `multipart/form-data` bodies. This is done mainly because some libraries send this content type by default even when the data is not form-encoded.
-   Fix some error messages for unix sockets (and other non-IP sockets)

### [`tornado.ioloop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#module-tornado.ioloop "tornado.ioloop")[¶](#tornado-ioloop "永久链接至标题")

-   [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") now uses [`handle_callback_exception`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.handle_callback_exception "tornado.ioloop.IOLoop.handle_callback_exception") consistently for error logging.
-   [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") now frees callback objects earlier, reducing memory usage while idle.
-   [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") will no longer call [`logging.basicConfig`](https://docs.python.org/3.4/library/logging.html#logging.basicConfig "(在 Python v3.4)") if there is a handler defined for the root logger or for the `tornado` or `tornado.application` loggers (previously it only looked at the root logger).

### [`tornado.iostream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#module-tornado.iostream "tornado.iostream")[¶](#tornado-iostream "永久链接至标题")

-   [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") now recognizes `ECONNABORTED` error codes in more places (which was mainly an issue on Windows).
-   [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") now frees memory earlier if a connection is closed while there is data in the write buffer.
-   [`PipeIOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.PipeIOStream "tornado.iostream.PipeIOStream") now handles `EAGAIN` error codes correctly.
-   [`SSLIOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.SSLIOStream "tornado.iostream.SSLIOStream") now initiates the SSL handshake automatically without waiting for the application to try and read or write to the connection.
-   Swallow a spurious exception from `set_nodelay` when a connection has been reset.

### [`tornado.log`](https://tornado-zh.readthedocs.io/zh/latest/log.html#module-tornado.log "tornado.log")[¶](#tornado-log "永久链接至标题")

-   Fix an error from [`tornado.log.enable_pretty_logging`](https://tornado-zh.readthedocs.io/zh/latest/log.html#tornado.log.enable_pretty_logging "tornado.log.enable_pretty_logging") when [`sys.stderr`](https://docs.python.org/3.4/library/sys.html#sys.stderr "(在 Python v3.4)") does not have an `isatty` method.
-   [`tornado.log.LogFormatter`](https://tornado-zh.readthedocs.io/zh/latest/log.html#tornado.log.LogFormatter "tornado.log.LogFormatter") now accepts keyword arguments `fmt` and `datefmt`.

### [`tornado.netutil`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#module-tornado.netutil "tornado.netutil")[¶](#tornado-netutil "永久链接至标题")

-   [`is_valid_ip`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.is_valid_ip "tornado.netutil.is_valid_ip") (and therefore `HTTPRequest.remote_ip`) now rejects empty strings.
-   Synchronously using [`ThreadedResolver`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.ThreadedResolver "tornado.netutil.ThreadedResolver") at import time to resolve a unicode hostname no longer deadlocks.

### `tornado.simple_httpclient`[¶](#tornado-simple-httpclient "永久链接至标题")

-   `simple_httpclient` now applies the `connect_timeout` to requests that are queued and have not yet started.
-   On Python 2.6, `simple_httpclient` now uses TLSv1 instead of SSLv3.
-   `simple_httpclient` now enforces the connect timeout during DNS resolution.
-   The embedded `ca-certificates.crt` file has been updated with the current Mozilla CA list.

### [`tornado.web`](https://tornado-zh.readthedocs.io/zh/latest/web.html#module-tornado.web "tornado.web")[¶](#tornado-web "永久链接至标题")

-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") no longer fails if the client requests a `Range` that is larger than the entire file (Facebook has a crawler that does this).
-   [`RequestHandler.on_connection_close`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.on_connection_close "tornado.web.RequestHandler.on_connection_close") now works correctly on subsequent requests of a keep-alive connection.
-   New application setting `default_handler_class` can be used to easily set up custom 404 pages.
-   New application settings `autoreload`, `compiled_template_cache`, `static_hash_cache`, and `serve_traceback` can be used to control individual aspects of debug mode.
-   New methods [`RequestHandler.get_query_argument`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_query_argument "tornado.web.RequestHandler.get_query_argument") and [`RequestHandler.get_body_argument`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_body_argument "tornado.web.RequestHandler.get_body_argument") and new attributes `HTTPRequest.query_arguments` and `HTTPRequest.body_arguments` allow access to arguments without intermingling those from the query string with those from the request body.
-   [`RequestHandler.decode_argument`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.decode_argument "tornado.web.RequestHandler.decode_argument") and related methods now raise an `HTTPError(400)` instead of [`UnicodeDecodeError`](https://docs.python.org/3.4/library/exceptions.html#UnicodeDecodeError "(在 Python v3.4)") when the argument could not be decoded.
-   [`RequestHandler.clear_all_cookies`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.clear_all_cookies "tornado.web.RequestHandler.clear_all_cookies") now accepts `domain` and `path` arguments, just like [`clear_cookie`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.clear_cookie "tornado.web.RequestHandler.clear_cookie").
-   It is now possible to specify handlers by name when using the [`URLSpec`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.URLSpec "tornado.web.URLSpec") class.
-   [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") now accepts 4-tuples to specify the `name` parameter (which previously required constructing a [`URLSpec`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.URLSpec "tornado.web.URLSpec") object instead of a tuple).
-   Fixed an incorrect error message when handler methods return a value other than None or a Future.
-   Exceptions will no longer be logged twice when using both `@asynchronous` and `@gen.coroutine`

### [`tornado.websocket`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#module-tornado.websocket "tornado.websocket")[¶](#tornado-websocket "永久链接至标题")

-   [`WebSocketHandler.write_message`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler.write_message "tornado.websocket.WebSocketHandler.write_message") now raises [`WebSocketClosedError`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketClosedError "tornado.websocket.WebSocketClosedError") instead of [`AttributeError`](https://docs.python.org/3.4/library/exceptions.html#AttributeError "(在 Python v3.4)") when the connection has been closed.
-   [`websocket_connect`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.websocket_connect "tornado.websocket.websocket_connect") now accepts preconstructed `HTTPRequest` objects.
-   Fix a bug with [`WebSocketHandler`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler "tornado.websocket.WebSocketHandler") when used with some proxies that unconditionally modify the `Connection` header.
-   [`websocket_connect`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.websocket_connect "tornado.websocket.websocket_connect") now returns an error immediately for refused connections instead of waiting for the timeout.
-   [`WebSocketClientConnection`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketClientConnection "tornado.websocket.WebSocketClientConnection") now has a `close` method.
