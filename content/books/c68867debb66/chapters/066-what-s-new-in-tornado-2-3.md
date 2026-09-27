## May 31, 2012[¶](#may-31-2012 "永久链接至标题")

### HTTP clients[¶](#http-clients "永久链接至标题")

-   [`tornado.httpclient.HTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.HTTPClient "tornado.httpclient.HTTPClient") now supports the same constructor keyword arguments as [`AsyncHTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient").
-   The `max_clients` keyword argument to [`AsyncHTTPClient.configure`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient.configure "tornado.httpclient.AsyncHTTPClient.configure") now works.
-   `tornado.simple_httpclient` now supports the `OPTIONS` and `PATCH` HTTP methods.
-   `tornado.simple_httpclient` is better about closing its sockets instead of leaving them for garbage collection.
-   `tornado.simple_httpclient` correctly verifies SSL certificates for URLs containing IPv6 literals (This bug affected Python 2.5 and 2.6).
-   `tornado.simple_httpclient` no longer includes basic auth credentials in the `Host` header when those credentials are extracted from the URL.
-   `tornado.simple_httpclient` no longer modifies the caller-supplied header dictionary, which caused problems when following redirects.
-   `tornado.curl_httpclient` now supports client SSL certificates (using the same `client_cert` and `client_key` arguments as `tornado.simple_httpclient`)

### HTTP Server[¶](#http-server "永久链接至标题")

-   [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") now works correctly with paths starting with `//`
-   `HTTPHeaders.copy` (inherited from [`dict.copy`](https://docs.python.org/3.4/library/stdtypes.html#dict.copy "(在 Python v3.4)")) now works correctly.
-   `HTTPConnection.address` is now always the socket address, even for non-IP sockets. `HTTPRequest.remote_ip` is still always an IP-style address (fake data is used for non-IP sockets)
-   Extra data at the end of multipart form bodies is now ignored, which fixes a compatibility problem with an iOS HTTP client library.

### `IOLoop` and `IOStream`[¶](#ioloop-and-iostream "永久链接至标题")

-   [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") now has an `error` attribute that can be used to determine why a socket was closed.
-   `tornado.iostream.IOStream.read_until` and `read_until_regex` are much faster with large input.
-   `IOStream.write` performs better when given very large strings.
-   [`IOLoop.instance()`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.instance "tornado.ioloop.IOLoop.instance") is now thread-safe.

### `tornado.options`[¶](#tornado-options "永久链接至标题")

-   [`tornado.options`](https://tornado-zh.readthedocs.io/zh/latest/options.html#module-tornado.options "tornado.options") options with `multiple=True` that are set more than once now overwrite rather than append. This makes it possible to override values set in `parse_config_file` with `parse_command_line`.
-   [`tornado.options`](https://tornado-zh.readthedocs.io/zh/latest/options.html#module-tornado.options "tornado.options") `--help` output is now prettier.
-   [`tornado.options.options`](https://tornado-zh.readthedocs.io/zh/latest/options.html#tornado.options.options "tornado.options.options") now supports attribute assignment.

### `tornado.template`[¶](#tornado-template "永久链接至标题")

-   Template files containing non-ASCII (utf8) characters now work on Python 3 regardless of the locale environment variables.
-   Templates now support `else` clauses in `try`/`except`/`finally`/`else` blocks.

### `tornado.web`[¶](#tornado-web "永久链接至标题")

-   [`tornado.web.RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") now supports the `PATCH` HTTP method. Note that this means any existing methods named `patch` in `RequestHandler` subclasses will need to be renamed.
-   [`tornado.web.addslash`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.addslash "tornado.web.addslash") and `removeslash` decorators now send permanent redirects (301) instead of temporary (302).
-   [`RequestHandler.flush`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.flush "tornado.web.RequestHandler.flush") now invokes its callback whether there was any data to flush or not.
-   Repeated calls to [`RequestHandler.set_cookie`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.set_cookie "tornado.web.RequestHandler.set_cookie") with the same name now overwrite the previous cookie instead of producing additional copies.
-   `tornado.web.OutputTransform.transform_first_chunk` now takes and returns a status code in addition to the headers and chunk. This is a backwards-incompatible change to an interface that was never technically private, but was not included in the documentation and does not appear to have been used outside Tornado itself.
-   Fixed a bug on python versions before 2.6.5 when [`URLSpec`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.URLSpec "tornado.web.URLSpec") regexes are constructed from unicode strings and keyword arguments are extracted.
-   The `reverse_url` function in the template namespace now comes from the [`RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") rather than the [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application"). (Unless overridden, [`RequestHandler.reverse_url`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.reverse_url "tornado.web.RequestHandler.reverse_url") is just an alias for the [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") method).
-   The `Etag` header is now returned on 304 responses to an `If-None-Match` request, improving compatibility with some caches.
-   [`tornado.web`](https://tornado-zh.readthedocs.io/zh/latest/web.html#module-tornado.web "tornado.web") will no longer produce responses with status code 304 that also have entity headers such as `Content-Length`.

### Other modules[¶](#other-modules "永久链接至标题")

-   [`tornado.auth.FacebookGraphMixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.FacebookGraphMixin "tornado.auth.FacebookGraphMixin") no longer sends `post_args` redundantly in the url.
-   The `extra_params` argument to [`tornado.escape.linkify`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.linkify "tornado.escape.linkify") may now be a callable, to allow parameters to be chosen separately for each link.
-   [`tornado.gen`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#module-tornado.gen "tornado.gen") no longer leaks `StackContexts` when a `@gen.engine` wrapped function is called repeatedly.
-   [`tornado.locale.get_supported_locales`](https://tornado-zh.readthedocs.io/zh/latest/locale.html#tornado.locale.get_supported_locales "tornado.locale.get_supported_locales") no longer takes a meaningless `cls` argument.
-   [`StackContext`](https://tornado-zh.readthedocs.io/zh/latest/stack_context.html#tornado.stack_context.StackContext "tornado.stack_context.StackContext") instances now have a deactivation callback that can be used to prevent further propagation.
-   [`tornado.testing.AsyncTestCase.wait`](https://tornado-zh.readthedocs.io/zh/latest/testing.html#tornado.testing.AsyncTestCase.wait "tornado.testing.AsyncTestCase.wait") now resets its timeout on each call.
-   [`tornado.wsgi.WSGIApplication`](https://tornado-zh.readthedocs.io/zh/latest/wsgi.html#tornado.wsgi.WSGIApplication "tornado.wsgi.WSGIApplication") now parses arguments correctly on Python 3.
-   Exception handling on Python 3 has been improved; previously some exceptions such as [`UnicodeDecodeError`](https://docs.python.org/3.4/library/exceptions.html#UnicodeDecodeError "(在 Python v3.4)") would generate `TypeErrors`
