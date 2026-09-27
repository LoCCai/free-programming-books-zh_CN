## Feb 7, 2015[¶](#feb-7-2015 "永久链接至标题")

### Highlights[¶](#highlights "永久链接至标题")

-   If a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") contains an exception but that exception is never examined or re-raised (e.g. by yielding the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future")), a stack trace will be logged when the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") is garbage-collected.
-   New class [`tornado.gen.WaitIterator`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.WaitIterator "tornado.gen.WaitIterator") provides a way to iterate over `Futures` in the order they resolve.
-   The [`tornado.websocket`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#module-tornado.websocket "tornado.websocket") module now supports compression via the “permessage-deflate” extension. Override [`WebSocketHandler.get_compression_options`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler.get_compression_options "tornado.websocket.WebSocketHandler.get_compression_options") to enable on the server side, and use the `compression_options` keyword argument to [`websocket_connect`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.websocket_connect "tornado.websocket.websocket_connect") on the client side.
-   When the appropriate packages are installed, it is possible to yield [`asyncio.Future`](https://docs.python.org/3.4/library/asyncio-task.html#asyncio.Future "(在 Python v3.4)") or Twisted `Defered` objects in Tornado coroutines.

### Backwards-compatibility notes[¶](#backwards-compatibility-notes "永久链接至标题")

-   [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") now calls `start_request` with the correct arguments. This change is backwards-incompatible, afffecting any application which implemented [`HTTPServerConnectionDelegate`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerConnectionDelegate "tornado.httputil.HTTPServerConnectionDelegate") by following the example of [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") instead of the documented method signatures.

### [`tornado.concurrent`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#module-tornado.concurrent "tornado.concurrent")[¶](#tornado-concurrent "永久链接至标题")

-   If a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") contains an exception but that exception is never examined or re-raised (e.g. by yielding the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future")), a stack trace will be logged when the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") is garbage-collected.
-   [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") now catches and logs exceptions in its callbacks.

### `tornado.curl_httpclient`[¶](#tornado-curl-httpclient "永久链接至标题")

-   `tornado.curl_httpclient` now supports request bodies for `PATCH` and custom methods.
-   `tornado.curl_httpclient` now supports resubmitting bodies after following redirects for methods other than `POST`.
-   `curl_httpclient` now runs the streaming and header callbacks on the IOLoop.
-   `tornado.curl_httpclient` now uses its own logger for debug output so it can be filtered more easily.

### [`tornado.gen`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#module-tornado.gen "tornado.gen")[¶](#tornado-gen "永久链接至标题")

-   New class [`tornado.gen.WaitIterator`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.WaitIterator "tornado.gen.WaitIterator") provides a way to iterate over `Futures` in the order they resolve.
-   When the [`singledispatch`](https://docs.python.org/3.4/library/functools.html#functools.singledispatch "(在 Python v3.4)") library is available (standard on Python 3.4, available via `pip install singledispatch` on older versions), the [`convert_yielded`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.convert_yielded "tornado.gen.convert_yielded") function can be used to make other kinds of objects yieldable in coroutines.
-   New function [`tornado.gen.sleep`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.sleep "tornado.gen.sleep") is a coroutine-friendly analogue to [`time.sleep`](https://docs.python.org/3.4/library/time.html#time.sleep "(在 Python v3.4)").
-   [`gen.engine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.engine "tornado.gen.engine") now correctly captures the stack context for its callbacks.

### [`tornado.httpserver`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#module-tornado.httpserver "tornado.httpserver")[¶](#tornado-httpserver "永久链接至标题")

-   [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") now calls `start_request` with the correct arguments. This change is backwards-incompatible, afffecting any application which implemented [`HTTPServerConnectionDelegate`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerConnectionDelegate "tornado.httputil.HTTPServerConnectionDelegate") by following the example of [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") instead of the documented method signatures.
-   [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") now tolerates extra newlines which are sometimes inserted between requests on keep-alive connections.
-   [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") can now use keep-alive connections after a request with a chunked body.
-   [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") now always reports `HTTP/1.1` instead of echoing the request version.

### [`tornado.httputil`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#module-tornado.httputil "tornado.httputil")[¶](#tornado-httputil "永久链接至标题")

-   New function [`tornado.httputil.split_host_and_port`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.split_host_and_port "tornado.httputil.split_host_and_port") for parsing the `netloc` portion of URLs.
-   The `context` argument to [`HTTPServerRequest`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerRequest "tornado.httputil.HTTPServerRequest") is now optional, and if a context is supplied the `remote_ip` attribute is also optional.
-   [`HTTPServerRequest.body`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerRequest.body "tornado.httputil.HTTPServerRequest.body") is now always a byte string (previously the default empty body would be a unicode string on python 3).
-   Header parsing now works correctly when newline-like unicode characters are present.
-   Header parsing again supports both CRLF and bare LF line separators.
-   Malformed `multipart/form-data` bodies will always be logged quietly instead of raising an unhandled exception; previously the behavior was inconsistent depending on the exact error.

### [`tornado.ioloop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#module-tornado.ioloop "tornado.ioloop")[¶](#tornado-ioloop "永久链接至标题")

-   The `kqueue` and `select` IOLoop implementations now report writeability correctly, fixing flow control in IOStream.
-   When a new [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") is created, it automatically becomes “current” for the thread if there is not already a current instance.
-   New method [`PeriodicCallback.is_running`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.PeriodicCallback.is_running "tornado.ioloop.PeriodicCallback.is_running") can be used to see whether the [`PeriodicCallback`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.PeriodicCallback "tornado.ioloop.PeriodicCallback") has been started.

### [`tornado.iostream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#module-tornado.iostream "tornado.iostream")[¶](#tornado-iostream "永久链接至标题")

-   [`IOStream.start_tls`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream.start_tls "tornado.iostream.IOStream.start_tls") now uses the `server_hostname` parameter for certificate validation.
-   [`SSLIOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.SSLIOStream "tornado.iostream.SSLIOStream") will no longer consume 100% CPU after certain error conditions.
-   [`SSLIOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.SSLIOStream "tornado.iostream.SSLIOStream") no longer logs `EBADF` errors during the handshake as they can result from nmap scans in certain modes.

### `tornado.platform.asyncio`[¶](#tornado-platform-asyncio "永久链接至标题")

-   It is now possible to yield `asyncio.Future` objects in coroutines when the [`singledispatch`](https://docs.python.org/3.4/library/functools.html#functools.singledispatch "(在 Python v3.4)") library is available and `tornado.platform.asyncio` has been imported.
-   New methods [`tornado.platform.asyncio.to_tornado_future`](https://tornado-zh.readthedocs.io/zh/latest/asyncio.html#tornado.platform.asyncio.to_tornado_future "tornado.platform.asyncio.to_tornado_future") and [`to_asyncio_future`](https://tornado-zh.readthedocs.io/zh/latest/asyncio.html#tornado.platform.asyncio.to_asyncio_future "tornado.platform.asyncio.to_asyncio_future") convert between the two libraries’ [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") classes.

### `tornado.platform.twisted`[¶](#tornado-platform-twisted "永久链接至标题")

-   It is now possible to yield `Deferred` objects in coroutines when the [`singledispatch`](https://docs.python.org/3.4/library/functools.html#functools.singledispatch "(在 Python v3.4)") library is available and `tornado.platform.twisted` has been imported.

### [`tornado.testing`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#module-tornado.testing "tornado.testing")[¶](#tornado-testing "永久链接至标题")

-   [`AsyncTestCase`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.AsyncTestCase "tornado.testing.AsyncTestCase") has better support for multiple exceptions. Previously it would silently swallow all but the last; now it raises the first and logs all the rest.
-   [`AsyncTestCase`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.AsyncTestCase "tornado.testing.AsyncTestCase") now cleans up [`Subprocess`](https://tornado-zh.readthedocs.io/zh/latest/process.html#tornado.process.Subprocess "tornado.process.Subprocess") state on `tearDown` when necessary.

### [`tornado.web`](https://tornado-zh.readthedocs.io/zh/latest/web.html#module-tornado.web "tornado.web")[¶](#tornado-web "永久链接至标题")

-   The [`asynchronous`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.asynchronous "tornado.web.asynchronous") decorator now understands [`concurrent.futures.Future`](https://docs.python.org/3.4/library/concurrent.futures.html#concurrent.futures.Future "(在 Python v3.4)") in addition to [`tornado.concurrent.Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future").
-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") no longer logs a stack trace if the connection is closed while sending the file.
-   [`RequestHandler.send_error`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.send_error "tornado.web.RequestHandler.send_error") now supports a `reason` keyword argument, similar to [`tornado.web.HTTPError`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.HTTPError "tornado.web.HTTPError").
-   [`RequestHandler.locale`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.locale "tornado.web.RequestHandler.locale") now has a property setter.
-   [`Application.add_handlers`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application.add_handlers "tornado.web.Application.add_handlers") hostname matching now works correctly with IPv6 literals.
-   Redirects for the [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") `default_host` setting now match the request protocol instead of redirecting HTTPS to HTTP.
-   Malformed `_xsrf` cookies are now ignored instead of causing uncaught exceptions.
-   `Application.start_request` now has the same signature as [`HTTPServerConnectionDelegate.start_request`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerConnectionDelegate.start_request "tornado.httputil.HTTPServerConnectionDelegate.start_request").

### [`tornado.websocket`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#module-tornado.websocket "tornado.websocket")[¶](#tornado-websocket "永久链接至标题")

-   The [`tornado.websocket`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#module-tornado.websocket "tornado.websocket") module now supports compression via the “permessage-deflate” extension. Override [`WebSocketHandler.get_compression_options`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler.get_compression_options "tornado.websocket.WebSocketHandler.get_compression_options") to enable on the server side, and use the `compression_options` keyword argument to [`websocket_connect`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.websocket_connect "tornado.websocket.websocket_connect") on the client side.
-   [`WebSocketHandler`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler "tornado.websocket.WebSocketHandler") no longer logs stack traces when the connection is closed.
-   [`WebSocketHandler.open`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler.open "tornado.websocket.WebSocketHandler.open") now accepts `*args, **kw` for consistency with `RequestHandler.get` and related methods.
-   The `Sec-WebSocket-Version` header now includes all supported versions.
-   [`websocket_connect`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.websocket_connect "tornado.websocket.websocket_connect") now has a `on_message_callback` keyword argument for callback-style use without `read_message()`.
