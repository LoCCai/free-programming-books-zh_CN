## Sep 20, 2011[¶](#sep-20-2011 "永久链接至标题")

### Backwards-incompatible changes[¶](#backwards-incompatible-changes "永久链接至标题")

-   Support for secure cookies written by pre-1.0 releases of Tornado has been removed. The [`RequestHandler.get_secure_cookie`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_secure_cookie "tornado.web.RequestHandler.get_secure_cookie") method no longer takes an `include_name` parameter.
-   The `debug` application setting now causes stack traces to be displayed in the browser on uncaught exceptions. Since this may leak sensitive information, debug mode is not recommended for public-facing servers.

### Security fixes[¶](#security-fixes "永久链接至标题")

-   Diginotar has been removed from the default CA certificates file used by `SimpleAsyncHTTPClient`.

### New modules[¶](#new-modules "永久链接至标题")

-   [`tornado.gen`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#module-tornado.gen "tornado.gen"): A generator-based interface to simplify writing asynchronous functions.
-   [`tornado.netutil`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#module-tornado.netutil "tornado.netutil"): Parts of [`tornado.httpserver`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#module-tornado.httpserver "tornado.httpserver") have been extracted into a new module for use with non-HTTP protocols.
-   [`tornado.platform.twisted`](https://tornado-zh.readthedocs.io/zh/latest/twisted.html#module-tornado.platform.twisted "tornado.platform.twisted"): A bridge between the Tornado IOLoop and the Twisted Reactor, allowing code written for Twisted to be run on Tornado.
-   [`tornado.process`](https://tornado-zh.readthedocs.io/zh/latest/process.html#module-tornado.process "tornado.process"): Multi-process mode has been improved, and can now restart crashed child processes. A new entry point has been added at [`tornado.process.fork_processes`](https://tornado-zh.readthedocs.io/zh/latest/process.html#tornado.process.fork_processes "tornado.process.fork_processes"), although `tornado.httpserver.HTTPServer.start` is still supported.

### `tornado.web`[¶](#tornado-web "永久链接至标题")

-   [`tornado.web.RequestHandler.write_error`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.write_error "tornado.web.RequestHandler.write_error") replaces `get_error_html` as the preferred way to generate custom error pages (`get_error_html` is still supported, but deprecated)
-   In [`tornado.web.Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application"), handlers may be specified by (fully-qualified) name instead of importing and passing the class object itself.
-   It is now possible to use a custom subclass of `StaticFileHandler` with the `static_handler_class` application setting, and this subclass can override the behavior of the `static_url` method.
-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") subclasses can now override `get_cache_time` to customize cache control behavior.
-   [`tornado.web.RequestHandler.get_secure_cookie`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_secure_cookie "tornado.web.RequestHandler.get_secure_cookie") now has a `max_age_days` parameter to allow applications to override the default one-month expiration.
-   [`set_cookie`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.set_cookie "tornado.web.RequestHandler.set_cookie") now accepts a `max_age` keyword argument to set the `max-age` cookie attribute (note underscore vs dash)
-   [`tornado.web.RequestHandler.set_default_headers`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.set_default_headers "tornado.web.RequestHandler.set_default_headers") may be overridden to set headers in a way that does not get reset during error handling.
-   [`RequestHandler.add_header`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.add_header "tornado.web.RequestHandler.add_header") can now be used to set a header that can appear multiple times in the response.
-   [`RequestHandler.flush`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.flush "tornado.web.RequestHandler.flush") can now take a callback for flow control.
-   The `application/json` content type can now be gzipped.
-   The cookie-signing functions are now accessible as static functions `tornado.web.create_signed_value` and `tornado.web.decode_signed_value`.

### `tornado.httpserver`[¶](#tornado-httpserver "永久链接至标题")

-   To facilitate some advanced multi-process scenarios, `HTTPServer` has a new method `add_sockets`, and socket-opening code is available separately as [`tornado.netutil.bind_sockets`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.bind_sockets "tornado.netutil.bind_sockets").
-   The `cookies` property is now available on `tornado.httpserver.HTTPRequest` (it is also available in its old location as a property of [`RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler"))
-   `tornado.httpserver.HTTPServer.bind` now takes a backlog argument with the same meaning as `socket.listen`.
-   [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") can now be run on a unix socket as well as TCP.
-   Fixed exception at startup when `socket.AI_ADDRCONFIG` is not available, as on Windows XP

### `IOLoop` and `IOStream`[¶](#ioloop-and-iostream "永久链接至标题")

-   [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") performance has been improved, especially for small synchronous requests.
-   New methods `tornado.iostream.IOStream.read_until_close` and `tornado.iostream.IOStream.read_until_regex`.
-   `IOStream.read_bytes` and `IOStream.read_until_close` now take a `streaming_callback` argument to return data as it is received rather than all at once.
-   [`IOLoop.add_timeout`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout") now accepts [`datetime.timedelta`](https://docs.python.org/3.4/library/datetime.html#datetime.timedelta "(在 Python v3.4)") objects in addition to absolute timestamps.
-   [`PeriodicCallback`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.PeriodicCallback "tornado.ioloop.PeriodicCallback") now sticks to the specified period instead of creeping later due to accumulated errors.
-   [`tornado.ioloop.IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") and [`tornado.httpclient.HTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.HTTPClient "tornado.httpclient.HTTPClient") now have `close()` methods that should be used in applications that create and destroy many of these objects.
-   [`IOLoop.install`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.install "tornado.ioloop.IOLoop.install") can now be used to use a custom subclass of IOLoop as the singleton without monkey-patching.
-   [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") should now always call the close callback instead of the connect callback on a connection error.
-   The [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") close callback will no longer be called while there are pending read callbacks that can be satisfied with buffered data.

### `tornado.simple_httpclient`[¶](#tornado-simple-httpclient "永久链接至标题")

-   Now supports client SSL certificates with the `client_key` and `client_cert` parameters to [`tornado.httpclient.HTTPRequest`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.HTTPRequest "tornado.httpclient.HTTPRequest")
-   Now takes a maximum buffer size, to allow reading files larger than 100MB
-   Now works with HTTP 1.0 servers that don’t send a Content-Length header
-   The `allow_nonstandard_methods` flag on HTTP client requests now permits methods other than `POST` and `PUT` to contain bodies.
-   Fixed file descriptor leaks and multiple callback invocations in `SimpleAsyncHTTPClient`
-   No longer consumes extra connection resources when following redirects.
-   Now works with buggy web servers that separate headers with `\n` instead of `\r\n\r\n`.
-   Now sets `response.request_time` correctly.
-   Connect timeouts now work correctly.

### Other modules[¶](#other-modules "永久链接至标题")

-   [`tornado.auth.OpenIdMixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.OpenIdMixin "tornado.auth.OpenIdMixin") now uses the correct realm when the callback URI is on a different domain.
-   [`tornado.autoreload`](https://tornado-zh.readthedocs.io/zh/latest/autoreload.html#module-tornado.autoreload "tornado.autoreload") has a new command-line interface which can be used to wrap any script. This replaces the `--autoreload` argument to [`tornado.testing.main`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.main "tornado.testing.main") and is more robust against syntax errors.
-   [`tornado.autoreload.watch`](https://tornado-zh.readthedocs.io/zh/latest/autoreload.html#tornado.autoreload.watch "tornado.autoreload.watch") can be used to watch files other than the sources of imported modules.
-   `tornado.database.Connection` has new variants of `execute` and `executemany` that return the number of rows affected instead of the last inserted row id.
-   [`tornado.locale.load_translations`](https://tornado-zh.readthedocs.io/zh/latest/locale.html#tornado.locale.load_translations "tornado.locale.load_translations") now accepts any properly-formatted locale name, not just those in the predefined `LOCALE_NAMES` list.
-   [`tornado.options.define`](https://tornado-zh.readthedocs.io/zh/latest/options.html#tornado.options.define "tornado.options.define") now takes a `group` parameter to group options in `--help` output.
-   Template loaders now take a `namespace` constructor argument to add entries to the template namespace.
-   [`tornado.websocket`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#module-tornado.websocket "tornado.websocket") now supports the latest (“hybi-10”) version of the protocol (the old version, “hixie-76” is still supported; the correct version is detected automatically).
-   [`tornado.websocket`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#module-tornado.websocket "tornado.websocket") now works on Python 3

### Bug fixes[¶](#bug-fixes "永久链接至标题")

-   Windows support has been improved. Windows is still not an officially supported platform, but the test suite now passes and [`tornado.autoreload`](https://tornado-zh.readthedocs.io/zh/latest/autoreload.html#module-tornado.autoreload "tornado.autoreload") works.
-   Uploading files whose names contain special characters will now work.
-   Cookie values containing special characters are now properly quoted and unquoted.
-   Multi-line headers are now supported.
-   Repeated Content-Length headers (which may be added by certain proxies) are now supported in [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer").
-   Unicode string literals now work in template expressions.
-   The template `{% module %}` directive now works even if applications use a template variable named `modules`.
-   Requests with “Expect: 100-continue” now work on python 3
