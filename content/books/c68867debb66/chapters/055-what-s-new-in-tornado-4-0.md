## July 15, 2014[¶](#july-15-2014 "永久链接至标题")

### Highlights[¶](#highlights "永久链接至标题")

-   The [`tornado.web.stream_request_body`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.stream_request_body "tornado.web.stream_request_body") decorator allows large files to be uploaded with limited memory usage.
-   Coroutines are now faster and are used extensively throughout Tornado itself. More methods now return [`Futures`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future"), including most [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") methods and [`RequestHandler.flush`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.flush "tornado.web.RequestHandler.flush").
-   Many user-overridden methods are now allowed to return a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") for flow control.
-   HTTP-related code is now shared between the [`tornado.httpserver`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#module-tornado.httpserver "tornado.httpserver"), `tornado.simple_httpclient` and [`tornado.wsgi`](https://tornado-zh.readthedocs.io/zh/latest/wsgi.html#module-tornado.wsgi "tornado.wsgi") modules, making support for features such as chunked and gzip encoding more consistent. [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") now uses new delegate interfaces defined in [`tornado.httputil`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#module-tornado.httputil "tornado.httputil") in addition to its old single-callback interface.
-   New module [`tornado.tcpclient`](https://tornado-zh.readthedocs.io/zh/latest/tcpclient.html#module-tornado.tcpclient "tornado.tcpclient") creates TCP connections with non-blocking DNS, SSL handshaking, and support for IPv6.

### Backwards-compatibility notes[¶](#backwards-compatibility-notes "永久链接至标题")

-   [`tornado.concurrent.Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") is no longer thread-safe; use [`concurrent.futures.Future`](https://docs.python.org/3.4/library/concurrent.futures.html#concurrent.futures.Future "(在 Python v3.4)") when thread-safety is needed.
-   Tornado now depends on the [certifi](https://pypi.python.org/pypi/certifi) package instead of bundling its own copy of the Mozilla CA list. This will be installed automatically when using `pip` or `easy_install`.
-   This version includes the changes to the secure cookie format first introduced in version [3.2.1](https://tornado-zh.readthedocs.io/zh/latest/releases/v3.2.1.html), and the xsrf token change in version [3.2.2](https://tornado-zh.readthedocs.io/zh/latest/releases/v3.2.2.html). If you are upgrading from an earlier version, see those versions’ release notes.
-   WebSocket connections from other origin sites are now rejected by default. To accept cross-origin websocket connections, override the new method [`WebSocketHandler.check_origin`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler.check_origin "tornado.websocket.WebSocketHandler.check_origin").
-   [`WebSocketHandler`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler "tornado.websocket.WebSocketHandler") no longer supports the old `draft 76` protocol (this mainly affects Safari 5.x browsers). Applications should use non-websocket workarounds for these browsers.
-   Authors of alternative [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") implementations should see the changes to [`IOLoop.add_handler`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_handler "tornado.ioloop.IOLoop.add_handler") in this release.
-   The `RequestHandler.async_callback` and `WebSocketHandler.async_callback` wrapper functions have been removed; they have been obsolete for a long time due to stack contexts (and more recently coroutines).
-   `curl_httpclient` now requires a minimum of libcurl version 7.21.1 and pycurl 7.18.2.
-   Support for `RequestHandler.get_error_html` has been removed; override [`RequestHandler.write_error`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.write_error "tornado.web.RequestHandler.write_error") instead.

### Other notes[¶](#other-notes "永久链接至标题")

-   The git repository has moved to [https://github.com/tornadoweb/tornado](https://github.com/tornadoweb/tornado). All old links should be redirected to the new location.
-   An [announcement mailing list](http://groups.google.com/group/python-tornado-announce) is now available.
-   All Tornado modules are now importable on Google App Engine (although the App Engine environment does not allow the system calls used by [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") so many modules are still unusable).

### [`tornado.auth`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#module-tornado.auth "tornado.auth")[¶](#tornado-auth "永久链接至标题")

-   Fixed a bug in `.FacebookMixin` on Python 3.
-   When using the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") interface, exceptions are more reliably delivered to the caller.

### [`tornado.concurrent`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#module-tornado.concurrent "tornado.concurrent")[¶](#tornado-concurrent "永久链接至标题")

-   [`tornado.concurrent.Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") is now always thread-unsafe (previously it would be thread-safe if the [`concurrent.futures`](https://docs.python.org/3.4/library/concurrent.futures.html#module-concurrent.futures "(在 Python v3.4)") package was available). This improves performance and provides more consistent semantics. The parts of Tornado that accept Futures will accept both Tornado’s thread-unsafe Futures and the thread-safe [`concurrent.futures.Future`](https://docs.python.org/3.4/library/concurrent.futures.html#concurrent.futures.Future "(在 Python v3.4)").
-   [`tornado.concurrent.Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") now includes all the functionality of the old `TracebackFuture` class. `TracebackFuture` is now simply an alias for `Future`.

### `tornado.curl_httpclient`[¶](#tornado-curl-httpclient "永久链接至标题")

-   `curl_httpclient` now passes along the HTTP “reason” string in `response.reason`.

### [`tornado.gen`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#module-tornado.gen "tornado.gen")[¶](#tornado-gen "永久链接至标题")

-   Performance of coroutines has been improved.
-   Coroutines no longer generate `StackContexts` by default, but they will be created on demand when needed.
-   The internals of the [`tornado.gen`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#module-tornado.gen "tornado.gen") module have been rewritten to improve performance when using `Futures`, at the expense of some performance degradation for the older [`YieldPoint`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.YieldPoint "tornado.gen.YieldPoint") interfaces.
-   New function [`with_timeout`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.with_timeout "tornado.gen.with_timeout") wraps a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") and raises an exception if it doesn’t complete in a given amount of time.
-   New object [`moment`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.moment "tornado.gen.moment") can be yielded to allow the IOLoop to run for one iteration before resuming.
-   [`Task`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.Task "tornado.gen.Task") is now a function returning a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") instead of a [`YieldPoint`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.YieldPoint "tornado.gen.YieldPoint") subclass. This change should be transparent to application code, but allows [`Task`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.Task "tornado.gen.Task") to take advantage of the newly-optimized [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") handling.

### [`tornado.httpclient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#module-tornado.httpclient "tornado.httpclient")[¶](#tornado-httpclient "永久链接至标题")

-   The command-line HTTP client (`python -m tornado.httpclient $URL`) now works on Python 3.
-   Fixed a memory leak in [`AsyncHTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") shutdown that affected applications that created many HTTP clients and IOLoops.
-   New client request parameter `decompress_response` replaces the existing `use_gzip` parameter; both names are accepted.

### [`tornado.httpserver`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#module-tornado.httpserver "tornado.httpserver")[¶](#tornado-httpserver "永久链接至标题")

-   `tornado.httpserver.HTTPRequest` has moved to [`tornado.httputil.HTTPServerRequest`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerRequest "tornado.httputil.HTTPServerRequest").
-   HTTP implementation has been unified with `tornado.simple_httpclient` in [`tornado.http1connection`](https://tornado-zh.readthedocs.io/zh/latest/http1connection.html#module-tornado.http1connection "tornado.http1connection").
-   Now supports `Transfer-Encoding: chunked` for request bodies.
-   Now supports `Content-Encoding: gzip` for request bodies if `decompress_request=True` is passed to the [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") constructor.
-   The `connection` attribute of [`HTTPServerRequest`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerRequest "tornado.httputil.HTTPServerRequest") is now documented for public use; applications are expected to write their responses via the [`HTTPConnection`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPConnection "tornado.httputil.HTTPConnection") interface.
-   The [`HTTPServerRequest.write`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerRequest.write "tornado.httputil.HTTPServerRequest.write") and [`HTTPServerRequest.finish`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerRequest.finish "tornado.httputil.HTTPServerRequest.finish") methods are now deprecated. ([`RequestHandler.write`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.write "tornado.web.RequestHandler.write") and [`RequestHandler.finish`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.finish "tornado.web.RequestHandler.finish") are _not_ deprecated; this only applies to the methods on [`HTTPServerRequest`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerRequest "tornado.httputil.HTTPServerRequest"))
-   [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") now supports [`HTTPServerConnectionDelegate`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerConnectionDelegate "tornado.httputil.HTTPServerConnectionDelegate") in addition to the old `request_callback` interface. The delegate interface supports streaming of request bodies.
-   [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") now detects the error of an application sending a `Content-Length` error that is inconsistent with the actual content.
-   New constructor arguments `max_header_size` and `max_body_size` allow separate limits to be set for different parts of the request. `max_body_size` is applied even in streaming mode.
-   New constructor argument `chunk_size` can be used to limit the amount of data read into memory at one time per request.
-   New constructor arguments `idle_connection_timeout` and `body_timeout` allow time limits to be placed on the reading of requests.
-   Form-encoded message bodies are now parsed for all HTTP methods, not just `POST`, `PUT`, and `PATCH`.

### [`tornado.httputil`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#module-tornado.httputil "tornado.httputil")[¶](#tornado-httputil "永久链接至标题")

-   [`HTTPServerRequest`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerRequest "tornado.httputil.HTTPServerRequest") was moved to this module from [`tornado.httpserver`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#module-tornado.httpserver "tornado.httpserver").
-   New base classes [`HTTPConnection`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPConnection "tornado.httputil.HTTPConnection"), [`HTTPServerConnectionDelegate`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerConnectionDelegate "tornado.httputil.HTTPServerConnectionDelegate"), and [`HTTPMessageDelegate`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPMessageDelegate "tornado.httputil.HTTPMessageDelegate") define the interaction between applications and the HTTP implementation.

### [`tornado.ioloop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#module-tornado.ioloop "tornado.ioloop")[¶](#tornado-ioloop "永久链接至标题")

-   [`IOLoop.add_handler`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_handler "tornado.ioloop.IOLoop.add_handler") and related methods now accept file-like objects in addition to raw file descriptors. Passing the objects is recommended (when possible) to avoid a garbage-collection-related problem in unit tests.
-   New method [`IOLoop.clear_instance`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.clear_instance "tornado.ioloop.IOLoop.clear_instance") makes it possible to uninstall the singleton instance.
-   Timeout scheduling is now more robust against slow callbacks.
-   [`IOLoop.add_timeout`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout") is now a bit more efficient.
-   When a function run by the [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") and that [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") has an exception, the [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") will log the exception.
-   New method [`IOLoop.spawn_callback`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.spawn_callback "tornado.ioloop.IOLoop.spawn_callback") simplifies the process of launching a fire-and-forget callback that is separated from the caller’s stack context.
-   New methods [`IOLoop.call_later`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.call_later "tornado.ioloop.IOLoop.call_later") and [`IOLoop.call_at`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.call_at "tornado.ioloop.IOLoop.call_at") simplify the specification of relative or absolute timeouts (as opposed to [`add_timeout`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout"), which used the type of its argument).

### [`tornado.iostream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#module-tornado.iostream "tornado.iostream")[¶](#tornado-iostream "永久链接至标题")

-   The `callback` argument to most [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") methods is now optional. When called without a callback the method will return a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") for use with coroutines.
-   New method [`IOStream.start_tls`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream.start_tls "tornado.iostream.IOStream.start_tls") converts an [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") to an [`SSLIOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.SSLIOStream "tornado.iostream.SSLIOStream").
-   No longer gets confused when an `IOError` or `OSError` without an `errno` attribute is raised.
-   [`BaseIOStream.read_bytes`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.BaseIOStream.read_bytes "tornado.iostream.BaseIOStream.read_bytes") now accepts a `partial` keyword argument, which can be used to return before the full amount has been read. This is a more coroutine-friendly alternative to `streaming_callback`.
-   [`BaseIOStream.read_until`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.BaseIOStream.read_until "tornado.iostream.BaseIOStream.read_until") and `read_until_regex` now acept a `max_bytes` keyword argument which will cause the request to fail if it cannot be satisfied from the given number of bytes.
-   [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") no longer reads from the socket into memory if it does not need data to satisfy a pending read. As a side effect, the close callback will not be run immediately if the other side closes the connection while there is unconsumed data in the buffer.
-   The default `chunk_size` has been increased to 64KB (from 4KB)
-   The [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") constructor takes a new keyword argument `max_write_buffer_size` (defaults to unlimited). Calls to [`BaseIOStream.write`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.BaseIOStream.write "tornado.iostream.BaseIOStream.write") will raise [`StreamBufferFullError`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.StreamBufferFullError "tornado.iostream.StreamBufferFullError") if the amount of unsent buffered data exceeds this limit.
-   `ETIMEDOUT` errors are no longer logged. If you need to distinguish timeouts from other forms of closed connections, examine `stream.error` from a close callback.

### [`tornado.netutil`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#module-tornado.netutil "tornado.netutil")[¶](#tornado-netutil "永久链接至标题")

-   When [`bind_sockets`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.bind_sockets "tornado.netutil.bind_sockets") chooses a port automatically, it will now use the same port for IPv4 and IPv6.
-   TLS compression is now disabled by default on Python 3.3 and higher (it is not possible to change this option in older versions).

### [`tornado.options`](https://tornado-zh.readthedocs.io/zh/latest/options.html#module-tornado.options "tornado.options")[¶](#tornado-options "永久链接至标题")

-   It is now possible to disable the default logging configuration by setting `options.logging` to `None` instead of the string `"none"`.

### `tornado.simple_httpclient`[¶](#tornado-simple-httpclient "永久链接至标题")

-   `simple_httpclient` has better support for IPv6, which is now enabled by default.
-   Improved default cipher suite selection (Python 2.7+).
-   HTTP implementation has been unified with `tornado.httpserver` in [`tornado.http1connection`](https://tornado-zh.readthedocs.io/zh/latest/http1connection.html#module-tornado.http1connection "tornado.http1connection")
-   Streaming request bodies are now supported via the `body_producer` keyword argument to [`tornado.httpclient.HTTPRequest`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.HTTPRequest "tornado.httpclient.HTTPRequest").
-   The `expect_100_continue` keyword argument to [`tornado.httpclient.HTTPRequest`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.HTTPRequest "tornado.httpclient.HTTPRequest") allows the use of the HTTP `Expect: 100-continue` feature.
-   `simple_httpclient` now raises the original exception (e.g. an [`IOError`](https://docs.python.org/3.4/library/exceptions.html#IOError "(在 Python v3.4)")) in more cases, instead of converting everything to `HTTPError`.

### [`tornado.stack_context`](https://tornado-zh.readthedocs.io/zh/latest/stack_context.html#module-tornado.stack_context "tornado.stack_context")[¶](#tornado-stack-context "永久链接至标题")

-   The stack context system now has less performance overhead when no stack contexts are active.

### [`tornado.tcpclient`](https://tornado-zh.readthedocs.io/zh/latest/tcpclient.html#module-tornado.tcpclient "tornado.tcpclient")[¶](#tornado-tcpclient "永久链接至标题")

-   New module which creates TCP connections and IOStreams, including name resolution, connecting, and SSL handshakes.

### [`tornado.testing`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#module-tornado.testing "tornado.testing")[¶](#tornado-testing "永久链接至标题")

-   [`AsyncTestCase`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.AsyncTestCase "tornado.testing.AsyncTestCase") now attempts to detect test methods that are generators but were not run with `@gen_test` or any similar decorator (this would previously result in the test silently being skipped).
-   Better stack traces are now displayed when a test times out.
-   The `@gen_test` decorator now passes along `*args, **kwargs` so it can be used on functions with arguments.
-   Fixed the test suite when `unittest2` is installed on Python 3.

### [`tornado.web`](https://tornado-zh.readthedocs.io/zh/latest/web.html#module-tornado.web "tornado.web")[¶](#tornado-web "永久链接至标题")

-   It is now possible to support streaming request bodies with the [`stream_request_body`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.stream_request_body "tornado.web.stream_request_body") decorator and the new [`RequestHandler.data_received`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.data_received "tornado.web.RequestHandler.data_received") method.
-   [`RequestHandler.flush`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.flush "tornado.web.RequestHandler.flush") now returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") if no callback is given.
-   New exception [`Finish`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Finish "tornado.web.Finish") may be raised to finish a request without triggering error handling.
-   When gzip support is enabled, all `text/*` mime types will be compressed, not just those on a whitelist.
-   [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") now implements the [`HTTPMessageDelegate`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPMessageDelegate "tornado.httputil.HTTPMessageDelegate") interface.
-   `HEAD` requests in [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") no longer read the entire file.
-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") now streams response bodies to the client.
-   New setting `compress_response` replaces the existing `gzip` setting; both names are accepted.
-   XSRF cookies that were not generated by this module (i.e. strings without any particular formatting) are once again accepted (as long as the cookie and body/header match). This pattern was common for testing and non-browser clients but was broken by the changes in Tornado 3.2.2.

### [`tornado.websocket`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#module-tornado.websocket "tornado.websocket")[¶](#tornado-websocket "永久链接至标题")

-   WebSocket connections from other origin sites are now rejected by default. Browsers do not use the same-origin policy for WebSocket connections as they do for most other browser-initiated communications. This can be surprising and a security risk, so we disallow these connections on the server side by default. To accept cross-origin websocket connections, override the new method [`WebSocketHandler.check_origin`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler.check_origin "tornado.websocket.WebSocketHandler.check_origin").
-   [`WebSocketHandler.close`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler.close "tornado.websocket.WebSocketHandler.close") and [`WebSocketClientConnection.close`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketClientConnection.close "tornado.websocket.WebSocketClientConnection.close") now support `code` and `reason` arguments to send a status code and message to the other side of the connection when closing. Both classes also have `close_code` and `close_reason` attributes to receive these values when the other side closes.
-   The C speedup module now builds correctly with MSVC, and can support messages larger than 2GB on 64-bit systems.
-   The fallback mechanism for detecting a missing C compiler now works correctly on Mac OS X.
-   Arguments to [`WebSocketHandler.open`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler.open "tornado.websocket.WebSocketHandler.open") are now decoded in the same way as arguments to [`RequestHandler.get`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get "tornado.web.RequestHandler.get") and similar methods.
-   It is now allowed to override `prepare` in a [`WebSocketHandler`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler "tornado.websocket.WebSocketHandler"), and this method may generate HTTP responses (error pages) in the usual way. The HTTP response methods are still not allowed once the WebSocket handshake has completed.

### [`tornado.wsgi`](https://tornado-zh.readthedocs.io/zh/latest/wsgi.html#module-tornado.wsgi "tornado.wsgi")[¶](#tornado-wsgi "永久链接至标题")

-   New class [`WSGIAdapter`](https://tornado-zh.readthedocs.io/zh/latest/wsgi.html#tornado.wsgi.WSGIAdapter "tornado.wsgi.WSGIAdapter") supports running a Tornado [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") on a WSGI server in a way that is more compatible with Tornado’s non-WSGI [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer"). [`WSGIApplication`](https://tornado-zh.readthedocs.io/zh/latest/wsgi.html#tornado.wsgi.WSGIApplication "tornado.wsgi.WSGIApplication") is deprecated in favor of using [`WSGIAdapter`](https://tornado-zh.readthedocs.io/zh/latest/wsgi.html#tornado.wsgi.WSGIAdapter "tornado.wsgi.WSGIAdapter") with a regular [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application").
-   [`WSGIAdapter`](https://tornado-zh.readthedocs.io/zh/latest/wsgi.html#tornado.wsgi.WSGIAdapter "tornado.wsgi.WSGIAdapter") now supports gzipped output.
