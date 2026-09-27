## Jan 30, 2012[¶](#jan-30-2012 "永久链接至标题")

### Highlights[¶](#highlights "永久链接至标题")

-   Updated and expanded WebSocket support.
-   Improved compatibility in the Twisted/Tornado bridge.
-   Template errors now generate better stack traces.
-   Better exception handling in [`tornado.gen`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#module-tornado.gen "tornado.gen").

### Security fixes[¶](#security-fixes "永久链接至标题")

-   `tornado.simple_httpclient` now disables SSLv2 in all cases. Previously SSLv2 would be allowed if the Python interpreter was linked against a pre-1.0 version of OpenSSL.

### Backwards-incompatible changes[¶](#backwards-incompatible-changes "永久链接至标题")

-   [`tornado.process.fork_processes`](https://tornado-zh.readthedocs.io/zh/latest/process.html#tornado.process.fork_processes "tornado.process.fork_processes") now raises [`SystemExit`](https://docs.python.org/3.4/library/exceptions.html#SystemExit "(在 Python v3.4)") if all child processes exit cleanly rather than returning `None`. The old behavior was surprising and inconsistent with most of the documented examples of this function (which did not check the return value).
-   On Python 2.6, `tornado.simple_httpclient` only supports SSLv3. This is because Python 2.6 does not expose a way to support both SSLv3 and TLSv1 without also supporting the insecure SSLv2.
-   [`tornado.websocket`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#module-tornado.websocket "tornado.websocket") no longer supports the older “draft 76” version of the websocket protocol by default, although this version can be enabled by overriding `tornado.websocket.WebSocketHandler.allow_draft76`.

### `tornado.httpclient`[¶](#tornado-httpclient "永久链接至标题")

-   `SimpleAsyncHTTPClient` no longer hangs on `HEAD` requests, responses with no content, or empty `POST`/`PUT` response bodies.
-   `SimpleAsyncHTTPClient` now supports 303 and 307 redirect codes.
-   `tornado.curl_httpclient` now accepts non-integer timeouts.
-   `tornado.curl_httpclient` now supports basic authentication with an empty password.

### `tornado.httpserver`[¶](#tornado-httpserver "永久链接至标题")

-   [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") with `xheaders=True` will no longer accept `X-Real-IP` headers that don’t look like valid IP addresses.
-   [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") now treats the `Connection` request header as case-insensitive.

### `tornado.ioloop` and `tornado.iostream`[¶](#tornado-ioloop-and-tornado-iostream "永久链接至标题")

-   `IOStream.write` now works correctly when given an empty string.
-   `IOStream.read_until` (and `read_until_regex`) now perform better when there is a lot of buffered data, which improves peformance of `SimpleAsyncHTTPClient` when downloading files with lots of chunks.
-   [`SSLIOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.SSLIOStream "tornado.iostream.SSLIOStream") now works correctly when `ssl_version` is set to a value other than `SSLv23`.
-   Idle `IOLoops` no longer wake up several times a second.
-   [`tornado.ioloop.PeriodicCallback`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.PeriodicCallback "tornado.ioloop.PeriodicCallback") no longer triggers duplicate callbacks when stopped and started repeatedly.

### `tornado.template`[¶](#tornado-template "永久链接至标题")

-   Exceptions in template code will now show better stack traces that reference lines from the original template file.
-   `{#` and `#}` can now be used for comments (and unlike the old `{% comment %}` directive, these can wrap other template directives).
-   Template directives may now span multiple lines.

### `tornado.web`[¶](#tornado-web "永久链接至标题")

-   Now behaves better when given malformed `Cookie` headers
-   [`RequestHandler.redirect`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.redirect "tornado.web.RequestHandler.redirect") now has a `status` argument to send status codes other than 301 and 302.
-   New method [`RequestHandler.on_finish`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.on_finish "tornado.web.RequestHandler.on_finish") may be overridden for post-request processing (as a counterpart to [`RequestHandler.prepare`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.prepare "tornado.web.RequestHandler.prepare"))
-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") now outputs `Content-Length` and `Etag` headers on `HEAD` requests.
-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") now has overridable `get_version` and `parse_url_path` methods for use in subclasses.
-   [`RequestHandler.static_url`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.static_url "tornado.web.RequestHandler.static_url") now takes an `include_host` parameter (in addition to the old support for the `RequestHandler.include_host` attribute).

### `tornado.websocket`[¶](#tornado-websocket "永久链接至标题")

-   Updated to support the latest version of the protocol, as finalized in RFC 6455.
-   Many bugs were fixed in all supported protocol versions.
-   [`tornado.websocket`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#module-tornado.websocket "tornado.websocket") no longer supports the older “draft 76” version of the websocket protocol by default, although this version can be enabled by overriding `tornado.websocket.WebSocketHandler.allow_draft76`.
-   [`WebSocketHandler.write_message`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler.write_message "tornado.websocket.WebSocketHandler.write_message") now accepts a `binary` argument to send binary messages.
-   Subprotocols (i.e. the `Sec-WebSocket-Protocol` header) are now supported; see the [`WebSocketHandler.select_subprotocol`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler.select_subprotocol "tornado.websocket.WebSocketHandler.select_subprotocol") method for details.
-   `.WebSocketHandler.get_websocket_scheme` can be used to select the appropriate url scheme (`ws://` or `wss://`) in cases where `HTTPRequest.protocol` is not set correctly.

### Other modules[¶](#other-modules "永久链接至标题")

-   [`tornado.auth.TwitterMixin.authenticate_redirect`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.TwitterMixin.authenticate_redirect "tornado.auth.TwitterMixin.authenticate_redirect") now takes a `callback_uri` parameter.
-   [`tornado.auth.TwitterMixin.twitter_request`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.TwitterMixin.twitter_request "tornado.auth.TwitterMixin.twitter_request") now accepts both URLs and partial paths (complete URLs are useful for the search API which follows different patterns).
-   Exception handling in [`tornado.gen`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#module-tornado.gen "tornado.gen") has been improved. It is now possible to catch exceptions thrown by a `Task`.
-   [`tornado.netutil.bind_sockets`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.bind_sockets "tornado.netutil.bind_sockets") now works when `getaddrinfo` returns duplicate addresses.
-   [`tornado.platform.twisted`](https://tornado-zh.readthedocs.io/zh/latest/twisted.html#module-tornado.platform.twisted "tornado.platform.twisted") compatibility has been significantly improved. Twisted version 11.1.0 is now supported in addition to 11.0.0.
-   [`tornado.process.fork_processes`](https://tornado-zh.readthedocs.io/zh/latest/process.html#tornado.process.fork_processes "tornado.process.fork_processes") correctly reseeds the [`random`](https://docs.python.org/3.4/library/random.html#module-random "(在 Python v3.4)") module even when [`os.urandom`](https://docs.python.org/3.4/library/os.html#os.urandom "(在 Python v3.4)") is not implemented.
-   [`tornado.testing.main`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.main "tornado.testing.main") supports a new flag `--exception_on_interrupt`, which can be set to false to make `Ctrl-C` kill the process more reliably (at the expense of stack traces when it does so).
-   `tornado.version_info` is now a four-tuple so official releases can be distinguished from development branches.
