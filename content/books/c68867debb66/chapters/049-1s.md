## Nov 6, 2015[¶](#nov-6-2015 "永久链接至标题")

### Highlights[¶](#highlights "永久链接至标题")

-   The new async/await keywords in Python 3.5 are supported. In most cases, `async def` can be used in place of the `@gen.coroutine` decorator. Inside a function defined with `async def`, use `await` instead of `yield` to wait on an asynchronous operation. Coroutines defined with async/await will be faster than those defined with `@gen.coroutine` and `yield`, but do not support some features including [`Callback`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.Callback "tornado.gen.Callback")/[`Wait`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.Wait "tornado.gen.Wait") or the ability to yield a Twisted `Deferred`. See [the users’ guide](https://tornado-zh.readthedocs.io/zh/latest/guide/coroutines.html#native-coroutines) for more.
-   The async/await keywords are also available when compiling with Cython in older versions of Python.

### Deprecation notice[¶](#deprecation-notice "永久链接至标题")

-   This will be the last release of Tornado to support Python 2.6 or 3.2. Note that PyPy3 will continue to be supported even though it implements a mix of Python 3.2 and 3.3 features.

### Installation[¶](#installation "永久链接至标题")

-   Tornado has several new dependencies: `ordereddict` on Python 2.6, `singledispatch` on all Python versions prior to 3.4 (This was an optional dependency in prior versions of Tornado, and is now mandatory), and `backports_abc>=0.4` on all versions prior to 3.5. These dependencies will be installed automatically when installing with `pip` or `setup.py install`. These dependencies will not be required when running on Google App Engine.
-   Binary wheels are provided for Python 3.5 on Windows (32 and 64 bit).

### [`tornado.auth`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#module-tornado.auth "tornado.auth")[¶](#tornado-auth "永久链接至标题")

-   New method [`OAuth2Mixin.oauth2_request`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.OAuth2Mixin.oauth2_request "tornado.auth.OAuth2Mixin.oauth2_request") can be used to make authenticated requests with an access token.
-   Now compatible with callbacks that have been compiled with Cython.

### [`tornado.autoreload`](https://tornado-zh.readthedocs.io/zh/latest/autoreload.html#module-tornado.autoreload "tornado.autoreload")[¶](#tornado-autoreload "永久链接至标题")

-   Fixed an issue with the autoreload command-line wrapper in which imports would be incorrectly interpreted as relative.

### [`tornado.curl_httpclient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#module-tornado.curl_httpclient "tornado.curl_httpclient")[¶](#tornado-curl-httpclient "永久链接至标题")

-   Fixed parsing of multi-line headers.
-   `allow_nonstandard_methods=True` now bypasses body sanity checks, in the same way as in `simple_httpclient`.
-   The `PATCH` method now allows a body without `allow_nonstandard_methods=True`.

### [`tornado.gen`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#module-tornado.gen "tornado.gen")[¶](#tornado-gen "永久链接至标题")

-   [`WaitIterator`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.WaitIterator "tornado.gen.WaitIterator") now supports the `async for` statement on Python 3.5.
-   `@gen.coroutine` can be applied to functions compiled with Cython. On python versions prior to 3.5, the `backports_abc` package must be installed for this functionality.
-   `Multi` and [`multi_future`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.multi_future "tornado.gen.multi_future") are deprecated and replaced by a unified function [`multi`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.multi "tornado.gen.multi").

### [`tornado.httpserver`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#module-tornado.httpserver "tornado.httpserver")[¶](#tornado-httpserver "永久链接至标题")

-   Requests containing both `Content-Length` and `Transfer-Encoding` will be treated as an error.

### [`tornado.ioloop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#module-tornado.ioloop "tornado.ioloop")[¶](#tornado-ioloop "永久链接至标题")

-   `IOLoop(make_current=True)` now works as intended instead of raising an exception.
-   The Twisted and asyncio IOLoop implementations now clear `current()` when they exit, like the standard IOLoops.
-   [`IOLoop.add_callback`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_callback "tornado.ioloop.IOLoop.add_callback") is faster in the single-threaded case.
-   [`IOLoop.add_callback`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_callback "tornado.ioloop.IOLoop.add_callback") no longer raises an error when called on a closed IOLoop, but the callback will not be invoked.

### [`tornado.iostream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#module-tornado.iostream "tornado.iostream")[¶](#tornado-iostream "永久链接至标题")

-   Coroutine-style usage of [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") now converts most errors into [`StreamClosedError`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.StreamClosedError "tornado.iostream.StreamClosedError"), which has the effect of reducing log noise from exceptions that are outside the application’s control (especially SSL errors).
-   [`StreamClosedError`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.StreamClosedError "tornado.iostream.StreamClosedError") now has a `real_error` attribute which indicates why the stream was closed. It is the same as the `error` attribute of [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") but may be more easily accessible than the [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") itself.
-   Improved error handling in [`read_until_close`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.BaseIOStream.read_until_close "tornado.iostream.BaseIOStream.read_until_close").
-   Logging is less noisy when an SSL server is port scanned.
-   `EINTR` is now handled on all reads.

### [`tornado.locale`](https://tornado-zh.readthedocs.io/zh/latest/locale.html#module-tornado.locale "tornado.locale")[¶](#tornado-locale "永久链接至标题")

-   [`tornado.locale.load_translations`](https://tornado-zh.readthedocs.io/zh/latest/locale.html#tornado.locale.load_translations "tornado.locale.load_translations") now accepts encodings other than UTF-8. UTF-16 and UTF-8 will be detected automatically if a BOM is present; for other encodings [`load_translations`](https://tornado-zh.readthedocs.io/zh/latest/locale.html#tornado.locale.load_translations "tornado.locale.load_translations") has an `encoding` parameter.

### [`tornado.log`](https://tornado-zh.readthedocs.io/zh/latest/log.html#module-tornado.log "tornado.log")[¶](#tornado-log "永久链接至标题")

-   A new time-based log rotation mode is available with `--log_rotate_mode=time`, `--log-rotate-when`, and `log-rotate-interval`.

### [`tornado.options`](https://tornado-zh.readthedocs.io/zh/latest/options.html#module-tornado.options "tornado.options")[¶](#tornado-options "永久链接至标题")

-   Dashes and underscores are now fully interchangeable in option names.

### [`tornado.simple_httpclient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#module-tornado.simple_httpclient "tornado.simple_httpclient")[¶](#tornado-simple-httpclient "永久链接至标题")

-   When following redirects, `streaming_callback` and `header_callback` will no longer be run on the redirect responses (only the final non-redirect).
-   Responses containing both `Content-Length` and `Transfer-Encoding` will be treated as an error.

### [`tornado.template`](https://tornado-zh.readthedocs.io/zh/latest/template.html#module-tornado.template "tornado.template")[¶](#tornado-template "永久链接至标题")

-   [`tornado.template.ParseError`](https://tornado-zh.readthedocs.io/zh/latest/template.html#tornado.template.ParseError "tornado.template.ParseError") now includes the filename in addition to line number.
-   Whitespace handling has become more configurable. The [`Loader`](https://tornado-zh.readthedocs.io/zh/latest/template.html#tornado.template.Loader "tornado.template.Loader") constructor now has a `whitespace` argument, there is a new `template_whitespace` [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") setting, and there is a new `{% whitespace %}` template directive. All of these options take a mode name defined in the [`tornado.template.filter_whitespace`](https://tornado-zh.readthedocs.io/zh/latest/template.html#tornado.template.filter_whitespace "tornado.template.filter_whitespace") function. The default mode is `single`, which is the same behavior as prior versions of Tornado.
-   Non-ASCII filenames are now supported.

### [`tornado.testing`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#module-tornado.testing "tornado.testing")[¶](#tornado-testing "永久链接至标题")

-   [`ExpectLog`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.ExpectLog "tornado.testing.ExpectLog") objects now have a boolean `logged_stack` attribute to make it easier to test whether an exception stack trace was logged.

### [`tornado.web`](https://tornado-zh.readthedocs.io/zh/latest/web.html#module-tornado.web "tornado.web")[¶](#tornado-web "永久链接至标题")

-   The hard limit of 4000 bytes per outgoing header has been removed.
-   [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") returns the correct `Content-Type` for files with `.gz`, `.bz2`, and `.xz` extensions.
-   Responses smaller than 1000 bytes will no longer be compressed.
-   The default gzip compression level is now 6 (was 9).
-   Fixed a regression in Tornado 4.2.1 that broke [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler") with a `path` of `/`.
-   [`tornado.web.HTTPError`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.HTTPError "tornado.web.HTTPError") is now copyable with the [`copy`](https://docs.python.org/3.4/library/copy.html#module-copy "(在 Python v3.4)") module.
-   The exception [`Finish`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Finish "tornado.web.Finish") now accepts an argument which will be passed to the method [`RequestHandler.finish`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.finish "tornado.web.RequestHandler.finish").
-   New [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") setting `xsrf_cookie_kwargs` can be used to set additional attributes such as `secure` or `httponly` on the XSRF cookie.
-   [`Application.listen`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application.listen "tornado.web.Application.listen") now returns the [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") it created.
