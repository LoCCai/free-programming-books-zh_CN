## Jun 15, 2013[¶](#jun-15-2013 "永久链接至标题")

### Multiple modules[¶](#multiple-modules "永久链接至标题")

-   Many reference cycles have been broken up throughout the package, allowing for more efficient garbage collection on CPython.
-   Silenced some log messages when connections are opened and immediately closed (i.e. port scans), or other situations related to closed connections.
-   Various small speedups: [`HTTPHeaders`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPHeaders "tornado.httputil.HTTPHeaders") case normalization, [`UIModule`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.UIModule "tornado.web.UIModule") proxy objects, precompile some regexes.

### [`tornado.auth`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#module-tornado.auth "tornado.auth")[¶](#tornado-auth "永久链接至标题")

-   [`OAuthMixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.OAuthMixin "tornado.auth.OAuthMixin") always sends `oauth_version=1.0` in its request as required by the spec.
-   [`FacebookGraphMixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.FacebookGraphMixin "tornado.auth.FacebookGraphMixin") now uses `self._FACEBOOK_BASE_URL` in [`facebook_request`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.FacebookGraphMixin.facebook_request "tornado.auth.FacebookGraphMixin.facebook_request") to allow the base url to be overridden.
-   The `authenticate_redirect` and `authorize_redirect` methods in the [`tornado.auth`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#module-tornado.auth "tornado.auth") mixin classes all now return Futures. These methods are asynchronous in [`OAuthMixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.OAuthMixin "tornado.auth.OAuthMixin") and derived classes, although they do not take a callback. The [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") these methods return must be yielded if they are called from a function decorated with [`gen.coroutine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.coroutine "tornado.gen.coroutine") (but not [`gen.engine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.engine "tornado.gen.engine")).
-   [`TwitterMixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.TwitterMixin "tornado.auth.TwitterMixin") now uses `/account/verify_credentials` to get information about the logged-in user, which is more robust against changing screen names.
-   The `demos` directory (in the source distribution) has a new `twitter` demo using [`TwitterMixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.TwitterMixin "tornado.auth.TwitterMixin").

### [`tornado.escape`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#module-tornado.escape "tornado.escape")[¶](#tornado-escape "永久链接至标题")

-   [`url_escape`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.url_escape "tornado.escape.url_escape") and [`url_unescape`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.url_unescape "tornado.escape.url_unescape") have a new `plus` argument (defaulting to True for consistency with the previous behavior) which specifies whether they work like [`urllib.parse.unquote`](https://docs.python.org/3.4/library/urllib.parse.html#urllib.parse.unquote "(在 Python v3.4)") or [`urllib.parse.unquote_plus`](https://docs.python.org/3.4/library/urllib.parse.html#urllib.parse.unquote_plus "(在 Python v3.4)").

### [`tornado.httpclient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#module-tornado.httpclient "tornado.httpclient")[¶](#tornado-httpclient "永久链接至标题")

-   [`tornado.httpclient.HTTPRequest`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.HTTPRequest "tornado.httpclient.HTTPRequest") takes a new argument `auth_mode`, which can be either `basic` or `digest`. Digest authentication is only supported with `tornado.curl_httpclient`.
-   `tornado.curl_httpclient` no longer goes into an infinite loop when pycurl returns a negative timeout.
-   `curl_httpclient` now supports the `PATCH` and `OPTIONS` methods without the use of `allow_nonstandard_methods=True`.
-   Worked around a class of bugs in libcurl that would result in errors from [`IOLoop.update_handler`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.update_handler "tornado.ioloop.IOLoop.update_handler") in various scenarios including digest authentication and socks proxies.
-   The `TCP_NODELAY` flag is now set when appropriate in `simple_httpclient`.
-   `simple_httpclient` no longer logs exceptions, since those exceptions are made available to the caller as `HTTPResponse.error`.

### [`tornado.httpserver`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#module-tornado.httpserver "tornado.httpserver")[¶](#tornado-httpserver "永久链接至标题")

-   [`tornado.httpserver.HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") handles malformed HTTP headers more gracefully.
-   [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") now supports lists of IPs in `X-Forwarded-For` (it chooses the last, i.e. nearest one).
-   Memory is now reclaimed promptly on CPython when an HTTP request fails because it exceeded the maximum upload size.
-   The `TCP_NODELAY` flag is now set when appropriate in [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer").
-   The [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") `no_keep_alive` option is now respected with HTTP 1.0 connections that explicitly pass `Connection: keep-alive`.
-   The `Connection: keep-alive` check for HTTP 1.0 connections is now case-insensitive.
-   The [`str`](https://docs.python.org/3.4/library/stdtypes.html#str "(在 Python v3.4)") and [`repr`](https://docs.python.org/3.4/library/functions.html#repr "(在 Python v3.4)") of `tornado.httpserver.HTTPRequest` no longer include the request body, reducing log spam on errors (and potential exposure/retention of private data).

### [`tornado.ioloop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#module-tornado.ioloop "tornado.ioloop")[¶](#tornado-ioloop "永久链接至标题")

-   Some [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") implementations (such as `pyzmq`) accept objects other than integer file descriptors; these objects will now have their `.close()` method called when the ```IOLoop` is closed with ``all_fds=True```.
-   The stub handles left behind by [`IOLoop.remove_timeout`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.remove_timeout "tornado.ioloop.IOLoop.remove_timeout") will now get cleaned up instead of waiting to expire.

### [`tornado.iostream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#module-tornado.iostream "tornado.iostream")[¶](#tornado-iostream "永久链接至标题")

-   Fixed a bug in [`BaseIOStream.read_until_close`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.BaseIOStream.read_until_close "tornado.iostream.BaseIOStream.read_until_close") that would sometimes cause data to be passed to the final callback instead of the streaming callback.
-   The [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") close callback is now run more reliably if there is an exception in `_try_inline_read`.
-   New method [`BaseIOStream.set_nodelay`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.BaseIOStream.set_nodelay "tornado.iostream.BaseIOStream.set_nodelay") can be used to set the `TCP_NODELAY` flag.
-   Fixed a case where errors in `SSLIOStream.connect` (and `SimpleAsyncHTTPClient`) were not being reported correctly.

### [`tornado.netutil`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#module-tornado.netutil "tornado.netutil")[¶](#tornado-netutil "永久链接至标题")

-   The default [`Resolver`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.Resolver "tornado.netutil.Resolver") implementation now works on Solaris.
-   [`Resolver`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.Resolver "tornado.netutil.Resolver") now has a [`close`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.Resolver.close "tornado.netutil.Resolver.close") method.
-   Fixed a potential CPU DoS when `tornado.netutil.ssl_match_hostname` is used on certificates with an abusive wildcard pattern.
-   All instances of [`ThreadedResolver`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.ThreadedResolver "tornado.netutil.ThreadedResolver") now share a single thread pool, whose size is set by the first one to be created (or the static `Resolver.configure` method).
-   [`ExecutorResolver`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.ExecutorResolver "tornado.netutil.ExecutorResolver") is now documented for public use.
-   [`bind_sockets`](https://tornado-zh.readthedocs.io/zh/latest/netutil.html#tornado.netutil.bind_sockets "tornado.netutil.bind_sockets") now works in configurations with incomplete IPv6 support.

### [`tornado.options`](https://tornado-zh.readthedocs.io/zh/latest/options.html#module-tornado.options "tornado.options")[¶](#tornado-options "永久链接至标题")

-   [`tornado.options.define`](https://tornado-zh.readthedocs.io/zh/latest/options.html#tornado.options.define "tornado.options.define") with `multiple=True` now works on Python 3.
-   [`tornado.options.options`](https://tornado-zh.readthedocs.io/zh/latest/options.html#tornado.options.options "tornado.options.options") and other [`OptionParser`](https://tornado-zh.readthedocs.io/zh/latest/options.html#tornado.options.OptionParser "tornado.options.OptionParser") instances support some new dict-like methods: [`items()`](https://tornado-zh.readthedocs.io/zh/latest/options.html#tornado.options.OptionParser.items "tornado.options.OptionParser.items"), iteration over keys, and (read-only) access to options with square braket syntax. [`OptionParser.group_dict`](https://tornado-zh.readthedocs.io/zh/latest/options.html#tornado.options.OptionParser.group_dict "tornado.options.OptionParser.group_dict") returns all options with a given group name, and [`OptionParser.as_dict`](https://tornado-zh.readthedocs.io/zh/latest/options.html#tornado.options.OptionParser.as_dict "tornado.options.OptionParser.as_dict") returns all options.

### [`tornado.process`](https://tornado-zh.readthedocs.io/zh/latest/process.html#module-tornado.process "tornado.process")[¶](#tornado-process "永久链接至标题")

-   [`tornado.process.Subprocess`](https://tornado-zh.readthedocs.io/zh/latest/process.html#tornado.process.Subprocess "tornado.process.Subprocess") no longer leaks file descriptors into the child process, which fixes a problem in which the child could not detect that the parent process had closed its stdin pipe.
-   [`Subprocess.set_exit_callback`](https://tornado-zh.readthedocs.io/zh/latest/process.html#tornado.process.Subprocess.set_exit_callback "tornado.process.Subprocess.set_exit_callback") now works for subprocesses created without an explicit `io_loop` parameter.

### [`tornado.stack_context`](https://tornado-zh.readthedocs.io/zh/latest/stack_context.html#module-tornado.stack_context "tornado.stack_context")[¶](#tornado-stack-context "永久链接至标题")

-   [`tornado.stack_context`](https://tornado-zh.readthedocs.io/zh/latest/stack_context.html#module-tornado.stack_context "tornado.stack_context") has been rewritten and is now much faster.
-   New function [`run_with_stack_context`](https://tornado-zh.readthedocs.io/zh/latest/stack_context.html#tornado.stack_context.run_with_stack_context "tornado.stack_context.run_with_stack_context") facilitates the use of stack contexts with coroutines.

### [`tornado.template`](https://tornado-zh.readthedocs.io/zh/latest/template.html#module-tornado.template "tornado.template")[¶](#tornado-template "永久链接至标题")

-   Some internal names used by the template system have been changed; now all “reserved” names in templates start with `_tt_`.

### [`tornado.testing`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#module-tornado.testing "tornado.testing")[¶](#tornado-testing "永久链接至标题")

-   [`tornado.testing.AsyncTestCase.wait`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.AsyncTestCase.wait "tornado.testing.AsyncTestCase.wait") now raises the correct exception when it has been modified by [`tornado.stack_context`](https://tornado-zh.readthedocs.io/zh/latest/stack_context.html#module-tornado.stack_context "tornado.stack_context").
-   [`tornado.testing.gen_test`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.gen_test "tornado.testing.gen_test") can now be called as `@gen_test(timeout=60)` to give some tests a longer timeout than others.
-   The environment variable `ASYNC_TEST_TIMEOUT` can now be set to override the default timeout for [`AsyncTestCase.wait`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.AsyncTestCase.wait "tornado.testing.AsyncTestCase.wait") and [`gen_test`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.gen_test "tornado.testing.gen_test").
-   [`bind_unused_port`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.bind_unused_port "tornado.testing.bind_unused_port") now passes `None` instead of `0` as the port to `getaddrinfo`, which works better with some unusual network configurations.

### [`tornado.util`](https://tornado-zh.readthedocs.io/zh/latest/util.html#module-tornado.util "tornado.util")[¶](#tornado-util "永久链接至标题")

-   [`tornado.util.import_object`](https://tornado-zh.readthedocs.io/zh/latest/util.html#tornado.util.import_object "tornado.util.import_object") now works with top-level module names that do not contain a dot.
-   [`tornado.util.import_object`](https://tornado-zh.readthedocs.io/zh/latest/util.html#tornado.util.import_object "tornado.util.import_object") now consistently raises [`ImportError`](https://docs.python.org/3.4/library/exceptions.html#ImportError "(在 Python v3.4)") instead of [`AttributeError`](https://docs.python.org/3.4/library/exceptions.html#AttributeError "(在 Python v3.4)") when it fails.

### [`tornado.web`](https://tornado-zh.readthedocs.io/zh/latest/web.html#module-tornado.web "tornado.web")[¶](#tornado-web "永久链接至标题")

-   The `handlers` list passed to the [`tornado.web.Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") constructor and [`add_handlers`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application.add_handlers "tornado.web.Application.add_handlers") methods can now contain lists in addition to tuples and [`URLSpec`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.URLSpec "tornado.web.URLSpec") objects.
-   [`tornado.web.StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") now works on Windows when the client passes an `If-Modified-Since` timestamp before 1970.
-   New method [`RequestHandler.log_exception`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.log_exception "tornado.web.RequestHandler.log_exception") can be overridden to customize the logging behavior when an exception is uncaught. Most apps that currently override `_handle_request_exception` can now use a combination of [`RequestHandler.log_exception`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.log_exception "tornado.web.RequestHandler.log_exception") and [`write_error`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.write_error "tornado.web.RequestHandler.write_error").
-   [`RequestHandler.get_argument`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_argument "tornado.web.RequestHandler.get_argument") now raises [`MissingArgumentError`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.MissingArgumentError "tornado.web.MissingArgumentError") (a subclass of [`tornado.web.HTTPError`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.HTTPError "tornado.web.HTTPError"), which is what it raised previously) if the argument cannot be found.
-   [`Application.reverse_url`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application.reverse_url "tornado.web.Application.reverse_url") now uses [`url_escape`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.url_escape "tornado.escape.url_escape") with `plus=False`, i.e. spaces are encoded as `%20` instead of `+`.
-   Arguments extracted from the url path are now decoded with [`url_unescape`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.url_unescape "tornado.escape.url_unescape") with `plus=False`, so plus signs are left as-is instead of being turned into spaces.
-   [`RequestHandler.send_error`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.send_error "tornado.web.RequestHandler.send_error") will now only be called once per request, even if multiple exceptions are caught by the stack context.
-   The [`tornado.web.asynchronous`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.asynchronous "tornado.web.asynchronous") decorator is no longer necessary for methods that return a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") (i.e. those that use the [`gen.coroutine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.coroutine "tornado.gen.coroutine") or [`return_future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.return_future "tornado.concurrent.return_future") decorators)
-   [`RequestHandler.prepare`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.prepare "tornado.web.RequestHandler.prepare") may now be asynchronous if it returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future"). The [`asynchronous`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.asynchronous "tornado.web.asynchronous") decorator is not used with `prepare`; one of the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future")\-related decorators should be used instead.
-   `RequestHandler.current_user` may now be assigned to normally.
-   [`RequestHandler.redirect`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.redirect "tornado.web.RequestHandler.redirect") no longer silently strips control characters and whitespace. It is now an error to pass control characters, newlines or tabs.
-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") has been reorganized internally and now has additional extension points that can be overridden in subclasses.
-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") now supports HTTP `Range` requests. [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") is still not suitable for files too large to comfortably fit in memory, but `Range` support is necessary in some browsers to enable seeking of HTML5 audio and video.
-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") now uses longer hashes by default, and uses the same hashes for `Etag` as it does for versioned urls.
-   [`StaticFileHandler.make_static_url`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler.make_static_url "tornado.web.StaticFileHandler.make_static_url") and [`RequestHandler.static_url`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.static_url "tornado.web.RequestHandler.static_url") now have an additional keyword argument `include_version` to suppress the url versioning.
-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") now reads its file in chunks, which will reduce memory fragmentation.
-   Fixed a problem with the `Date` header and cookie expiration dates when the system locale is set to a non-english configuration.

### [`tornado.websocket`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#module-tornado.websocket "tornado.websocket")[¶](#tornado-websocket "永久链接至标题")

-   [`WebSocketHandler`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler "tornado.websocket.WebSocketHandler") now catches [`StreamClosedError`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.StreamClosedError "tornado.iostream.StreamClosedError") and runs [`on_close`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler.on_close "tornado.websocket.WebSocketHandler.on_close") immediately instead of logging a stack trace.
-   New method [`WebSocketHandler.set_nodelay`](https://tornado-zh.readthedocs.io/zh/latest/websocket.html#tornado.websocket.WebSocketHandler.set_nodelay "tornado.websocket.WebSocketHandler.set_nodelay") can be used to set the `TCP_NODELAY` flag.
