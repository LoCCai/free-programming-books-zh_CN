HTTP utility code shared by clients and servers.

This module also defines the [`HTTPServerRequest`](#tornado.httputil.HTTPServerRequest "tornado.httputil.HTTPServerRequest") class which is exposed via [`tornado.web.RequestHandler.request`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.request "tornado.web.RequestHandler.request").

A dictionary that maintains `Http-Header-Case` for all keys.

Supports multiple values per key via a pair of new methods, [`add()`](#tornado.httputil.HTTPHeaders.add "tornado.httputil.HTTPHeaders.add") and [`get_list()`](#tornado.httputil.HTTPHeaders.get_list "tornado.httputil.HTTPHeaders.get_list"). The regular dictionary interface returns a single value per key, with multiple values joined by a comma.

\>>> h \= HTTPHeaders({"content-type": "text/html"})
\>>> list(h.keys())
\['Content-Type'\]
\>>> h\["Content-Type"\]
'text/html'

\>>> h.add("Set-Cookie", "A=B")
\>>> h.add("Set-Cookie", "C=D")
\>>> h\["set-cookie"\]
'A=B,C=D'
\>>> h.get\_list("set-cookie")
\['A=B', 'C=D'\]

\>>> for (k,v) in sorted(h.get\_all()):
...    print('%s: %s' % (k,v))
...
Content-Type: text/html
Set-Cookie: A=B
Set-Cookie: C=D

Adds a new value for the given key.

Returns all values for the given header as a list.

Returns an iterable of all (name, value) pairs.

If a header has multiple values, multiple pairs will be returned with the same name.

Updates the dictionary with a single header line.

\>>> h \= HTTPHeaders()
\>>> h.parse\_line("Content-Type: text/html")
\>>> h.get('content-type')
'text/html'

Returns a dictionary from HTTP header text.

\>>> h \= HTTPHeaders.parse("Content-Type: text/html\\r\\nContent-Length: 42\\r\\n")
\>>> sorted(h.items())
\[('Content-Length', '42'), ('Content-Type', 'text/html')\]

_class_ `tornado.httputil.``HTTPServerRequest`(_method=None_, _uri=None_, _version='HTTP/1.0'_, _headers=None_, _body=None_, _host=None_, _files=None_, _connection=None_, _start\_line=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPServerRequest)[¶](#tornado.httputil.HTTPServerRequest "永久链接至目标")

A single HTTP request.

All attributes are type [`str`](https://docs.python.org/3.4/library/stdtypes.html#str "(在 Python v3.4)") unless otherwise noted.

`method`[¶](#tornado.httputil.HTTPServerRequest.method "永久链接至目标")

HTTP request method, e.g. “GET” or “POST”

`uri`[¶](#tornado.httputil.HTTPServerRequest.uri "永久链接至目标")

The requested uri.

`path`[¶](#tornado.httputil.HTTPServerRequest.path "永久链接至目标")

The path portion of [`uri`](#tornado.httputil.HTTPServerRequest.uri "tornado.httputil.HTTPServerRequest.uri")

`query`[¶](#tornado.httputil.HTTPServerRequest.query "永久链接至目标")

The query portion of [`uri`](#tornado.httputil.HTTPServerRequest.uri "tornado.httputil.HTTPServerRequest.uri")

`version`[¶](#tornado.httputil.HTTPServerRequest.version "永久链接至目标")

HTTP version specified in request, e.g. “HTTP/1.1”

[`HTTPHeaders`](#tornado.httputil.HTTPHeaders "tornado.httputil.HTTPHeaders") dictionary-like object for request headers. Acts like a case-insensitive dictionary with additional methods for repeated headers.

`body`[¶](#tornado.httputil.HTTPServerRequest.body "永久链接至目标")

Request body, if present, as a byte string.

`remote_ip`[¶](#tornado.httputil.HTTPServerRequest.remote_ip "永久链接至目标")

Client’s IP address as a string. If `HTTPServer.xheaders` is set, will pass along the real IP address provided by a load balancer in the `X-Real-Ip` or `X-Forwarded-For` header.

在 3.1 版更改: The list format of `X-Forwarded-For` is now supported.

`protocol`[¶](#tornado.httputil.HTTPServerRequest.protocol "永久链接至目标")

The protocol used, either “http” or “https”. If `HTTPServer.xheaders` is set, will pass along the protocol used by a load balancer if reported via an `X-Scheme` header.

`host`[¶](#tornado.httputil.HTTPServerRequest.host "永久链接至目标")

The requested hostname, usually taken from the `Host` header.

`arguments`[¶](#tornado.httputil.HTTPServerRequest.arguments "永久链接至目标")

GET/POST arguments are available in the arguments property, which maps arguments names to lists of values (to support multiple values for individual names). Names are of type [`str`](https://docs.python.org/3.4/library/stdtypes.html#str "(在 Python v3.4)"), while arguments are byte strings. Note that this is different from [`RequestHandler.get_argument`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_argument "tornado.web.RequestHandler.get_argument"), which returns argument values as unicode strings.

`query_arguments`[¶](#tornado.httputil.HTTPServerRequest.query_arguments "永久链接至目标")

Same format as `arguments`, but contains only arguments extracted from the query string.

3.2 新版功能.

`body_arguments`[¶](#tornado.httputil.HTTPServerRequest.body_arguments "永久链接至目标")

Same format as `arguments`, but contains only arguments extracted from the request body.

3.2 新版功能.

`files`[¶](#tornado.httputil.HTTPServerRequest.files "永久链接至目标")

File uploads are available in the files property, which maps file names to lists of [`HTTPFile`](#tornado.httputil.HTTPFile "tornado.httputil.HTTPFile").

`connection`[¶](#tornado.httputil.HTTPServerRequest.connection "永久链接至目标")

An HTTP request is attached to a single HTTP connection, which can be accessed through the “connection” attribute. Since connections are typically kept open in HTTP/1.1, multiple requests can be handled sequentially on a single connection.

在 4.0 版更改: Moved from `tornado.httpserver.HTTPRequest`.

`supports_http_1_1`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPServerRequest.supports_http_1_1)[¶](#tornado.httputil.HTTPServerRequest.supports_http_1_1 "永久链接至目标")

Returns True if this request supports HTTP/1.1 semantics.

4.0 版后已移除: Applications are less likely to need this information with the introduction of [`HTTPConnection`](#tornado.httputil.HTTPConnection "tornado.httputil.HTTPConnection"). If you still need it, access the `version` attribute directly.

`cookies`[¶](#tornado.httputil.HTTPServerRequest.cookies "永久链接至目标")

A dictionary of Cookie.Morsel objects.

`write`(_chunk_, _callback=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPServerRequest.write)[¶](#tornado.httputil.HTTPServerRequest.write "永久链接至目标")

Writes the given chunk to the response stream.

4.0 版后已移除: Use `request.connection` and the [`HTTPConnection`](#tornado.httputil.HTTPConnection "tornado.httputil.HTTPConnection") methods to write the response.

`finish`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPServerRequest.finish)[¶](#tornado.httputil.HTTPServerRequest.finish "永久链接至目标")

Finishes this HTTP request on the open connection.

4.0 版后已移除: Use `request.connection` and the [`HTTPConnection`](#tornado.httputil.HTTPConnection "tornado.httputil.HTTPConnection") methods to write the response.

`full_url`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPServerRequest.full_url)[¶](#tornado.httputil.HTTPServerRequest.full_url "永久链接至目标")

Reconstructs the full URL for this request.

`request_time`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPServerRequest.request_time)[¶](#tornado.httputil.HTTPServerRequest.request_time "永久链接至目标")

Returns the amount of time it took for this request to execute.

`get_ssl_certificate`(_binary\_form=False_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPServerRequest.get_ssl_certificate)[¶](#tornado.httputil.HTTPServerRequest.get_ssl_certificate "永久链接至目标")

Returns the client’s SSL certificate, if any.

To use client certificates, the HTTPServer’s [`ssl.SSLContext.verify_mode`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext.verify_mode "(在 Python v3.4)") field must be set, e.g.:

ssl\_ctx \= ssl.create\_default\_context(ssl.Purpose.CLIENT\_AUTH)
ssl\_ctx.load\_cert\_chain("foo.crt", "foo.key")
ssl\_ctx.load\_verify\_locations("cacerts.pem")
ssl\_ctx.verify\_mode \= ssl.CERT\_REQUIRED
server \= HTTPServer(app, ssl\_options\=ssl\_ctx)

By default, the return value is a dictionary (or None, if no client certificate is present). If `binary_form` is true, a DER-encoded form of the certificate is returned instead. See SSLSocket.getpeercert() in the standard library for more details. [http://docs.python.org/library/ssl.html#sslsocket-objects](http://docs.python.org/library/ssl.html#sslsocket-objects)

_exception_ `tornado.httputil.``HTTPInputError`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPInputError)[¶](#tornado.httputil.HTTPInputError "永久链接至目标")

Exception class for malformed HTTP requests or responses from remote sources.

4.0 新版功能.

_exception_ `tornado.httputil.``HTTPOutputError`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPOutputError)[¶](#tornado.httputil.HTTPOutputError "永久链接至目标")

Exception class for errors in HTTP output.

4.0 新版功能.

_class_ `tornado.httputil.``HTTPServerConnectionDelegate`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPServerConnectionDelegate)[¶](#tornado.httputil.HTTPServerConnectionDelegate "永久链接至目标")

Implement this interface to handle requests from [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer").

4.0 新版功能.

`start_request`(_server\_conn_, _request\_conn_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPServerConnectionDelegate.start_request)[¶](#tornado.httputil.HTTPServerConnectionDelegate.start_request "永久链接至目标")

This method is called by the server when a new request has started.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>server_conn</strong> – is an opaque object representing the long-lived (e.g. tcp-level) connection.</li><li><strong>request_conn</strong> – is a <a href="#tornado.httputil.HTTPConnection" title="tornado.httputil.HTTPConnection"><code><span>HTTPConnection</span></code></a> object for a single request/response exchange.</li></ul></td></tr></tbody></table>

This method should return a [`HTTPMessageDelegate`](#tornado.httputil.HTTPMessageDelegate "tornado.httputil.HTTPMessageDelegate").

`on_close`(_server\_conn_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPServerConnectionDelegate.on_close)[¶](#tornado.httputil.HTTPServerConnectionDelegate.on_close "永久链接至目标")

This method is called when a connection has been closed.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>server_conn</strong> – is a server connection that has previously been passed to <code><span>start_request</span></code>.</td></tr></tbody></table>

_class_ `tornado.httputil.``HTTPMessageDelegate`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPMessageDelegate)[¶](#tornado.httputil.HTTPMessageDelegate "永久链接至目标")

Implement this interface to handle an HTTP request or response.

4.0 新版功能.

Called when the HTTP headers have been received and parsed.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>start_line</strong> – a <a href="#tornado.httputil.RequestStartLine" title="tornado.httputil.RequestStartLine"><code><span>RequestStartLine</span></code></a> or <a href="#tornado.httputil.ResponseStartLine" title="tornado.httputil.ResponseStartLine"><code><span>ResponseStartLine</span></code></a> depending on whether this is a client or server message.</li><li><strong>headers</strong> – a <a href="#tornado.httputil.HTTPHeaders" title="tornado.httputil.HTTPHeaders"><code><span>HTTPHeaders</span></code></a> instance.</li></ul></td></tr></tbody></table>

Some [`HTTPConnection`](#tornado.httputil.HTTPConnection "tornado.httputil.HTTPConnection") methods can only be called during `headers_received`.

May return a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future"); if it does the body will not be read until it is done.

`data_received`(_chunk_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPMessageDelegate.data_received)[¶](#tornado.httputil.HTTPMessageDelegate.data_received "永久链接至目标")

Called when a chunk of data has been received.

May return a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") for flow control.

`finish`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPMessageDelegate.finish)[¶](#tornado.httputil.HTTPMessageDelegate.finish "永久链接至目标")

Called after the last chunk of data has been received.

`on_connection_close`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPMessageDelegate.on_connection_close)[¶](#tornado.httputil.HTTPMessageDelegate.on_connection_close "永久链接至目标")

Called if the connection is closed without finishing the request.

If `headers_received` is called, either `finish` or `on_connection_close` will be called, but not both.

_class_ `tornado.httputil.``HTTPConnection`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPConnection)[¶](#tornado.httputil.HTTPConnection "永久链接至目标")

Applications use this interface to write their responses.

4.0 新版功能.

Write an HTTP header block.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>start_line</strong> – a <a href="#tornado.httputil.RequestStartLine" title="tornado.httputil.RequestStartLine"><code><span>RequestStartLine</span></code></a> or <a href="#tornado.httputil.ResponseStartLine" title="tornado.httputil.ResponseStartLine"><code><span>ResponseStartLine</span></code></a>.</li><li><strong>headers</strong> – a <a href="#tornado.httputil.HTTPHeaders" title="tornado.httputil.HTTPHeaders"><code><span>HTTPHeaders</span></code></a> instance.</li><li><strong>chunk</strong> – the first (optional) chunk of data. This is an optimization so that small responses can be written in the same call as their headers.</li><li><strong>callback</strong> – a callback to be run when the write is complete.</li></ul></td></tr></tbody></table>

The `version` field of `start_line` is ignored.

Returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") if no callback is given.

`write`(_chunk_, _callback=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPConnection.write)[¶](#tornado.httputil.HTTPConnection.write "永久链接至目标")

Writes a chunk of body data.

The callback will be run when the write is complete. If no callback is given, returns a Future.

`finish`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPConnection.finish)[¶](#tornado.httputil.HTTPConnection.finish "永久链接至目标")

Indicates that the last body data has been written.

`tornado.httputil.``url_concat`(_url_, _args_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#url_concat)[¶](#tornado.httputil.url_concat "永久链接至目标")

Concatenate url and arguments regardless of whether url has existing query parameters.

`args` may be either a dictionary or a list of key-value pairs (the latter allows for multiple values with the same key.

\>>> url\_concat("http://example.com/foo", dict(c\="d"))
'http://example.com/foo?c=d'
\>>> url\_concat("http://example.com/foo?a=b", dict(c\="d"))
'http://example.com/foo?a=b&c=d'
\>>> url\_concat("http://example.com/foo?a=b", \[("c", "d"), ("c", "d2")\])
'http://example.com/foo?a=b&c=d&c=d2'

_class_ `tornado.httputil.``HTTPFile`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#HTTPFile)[¶](#tornado.httputil.HTTPFile "永久链接至目标")

Represents a file uploaded via a form.

For backwards compatibility, its instance attributes are also accessible as dictionary keys.

-   `filename`
-   `body`
-   `content_type`

`tornado.httputil.``parse_body_arguments`(_content\_type_, _body_, _arguments_, _files_, _headers=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#parse_body_arguments)[¶](#tornado.httputil.parse_body_arguments "永久链接至目标")

Parses a form request body.

Supports `application/x-www-form-urlencoded` and `multipart/form-data`. The `content_type` parameter should be a string and `body` should be a byte string. The `arguments` and `files` parameters are dictionaries that will be updated with the parsed contents.

`tornado.httputil.``parse_multipart_form_data`(_boundary_, _data_, _arguments_, _files_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#parse_multipart_form_data)[¶](#tornado.httputil.parse_multipart_form_data "永久链接至目标")

Parses a `multipart/form-data` body.

The `boundary` and `data` parameters are both byte strings. The dictionaries given in the arguments and files parameters will be updated with the contents of the body.

`tornado.httputil.``format_timestamp`(_ts_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#format_timestamp)[¶](#tornado.httputil.format_timestamp "永久链接至目标")

Formats a timestamp in the format used by HTTP.

The argument may be a numeric timestamp as returned by [`time.time`](https://docs.python.org/3.4/library/time.html#time.time "(在 Python v3.4)"), a time tuple as returned by [`time.gmtime`](https://docs.python.org/3.4/library/time.html#time.gmtime "(在 Python v3.4)"), or a [`datetime.datetime`](https://docs.python.org/3.4/library/datetime.html#datetime.datetime "(在 Python v3.4)") object.

\>>> format\_timestamp(1359312200)
'Sun, 27 Jan 2013 18:43:20 GMT'

_class_ `tornado.httputil.``RequestStartLine`[¶](#tornado.httputil.RequestStartLine "永久链接至目标")

RequestStartLine(method, path, version)

Create new instance of RequestStartLine(method, path, version)

`method`[¶](#tornado.httputil.RequestStartLine.method "永久链接至目标")

Alias for field number 0

`path`[¶](#tornado.httputil.RequestStartLine.path "永久链接至目标")

Alias for field number 1

`version`[¶](#tornado.httputil.RequestStartLine.version "永久链接至目标")

Alias for field number 2

`tornado.httputil.``parse_request_start_line`(_line_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#parse_request_start_line)[¶](#tornado.httputil.parse_request_start_line "永久链接至目标")

Returns a (method, path, version) tuple for an HTTP 1.x request line.

The response is a [`collections.namedtuple`](https://docs.python.org/3.4/library/collections.html#collections.namedtuple "(在 Python v3.4)").

\>>> parse\_request\_start\_line("GET /foo HTTP/1.1")
RequestStartLine(method='GET', path='/foo', version='HTTP/1.1')

_class_ `tornado.httputil.``ResponseStartLine`[¶](#tornado.httputil.ResponseStartLine "永久链接至目标")

ResponseStartLine(version, code, reason)

Create new instance of ResponseStartLine(version, code, reason)

`code`[¶](#tornado.httputil.ResponseStartLine.code "永久链接至目标")

Alias for field number 1

`reason`[¶](#tornado.httputil.ResponseStartLine.reason "永久链接至目标")

Alias for field number 2

`version`[¶](#tornado.httputil.ResponseStartLine.version "永久链接至目标")

Alias for field number 0

`tornado.httputil.``parse_response_start_line`(_line_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#parse_response_start_line)[¶](#tornado.httputil.parse_response_start_line "永久链接至目标")

Returns a (version, code, reason) tuple for an HTTP 1.x response line.

The response is a [`collections.namedtuple`](https://docs.python.org/3.4/library/collections.html#collections.namedtuple "(在 Python v3.4)").

\>>> parse\_response\_start\_line("HTTP/1.1 200 OK")
ResponseStartLine(version='HTTP/1.1', code=200, reason='OK')

`tornado.httputil.``split_host_and_port`(_netloc_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httputil.html#split_host_and_port)[¶](#tornado.httputil.split_host_and_port "永久链接至目标")

Returns `(host, port)` tuple from `netloc`.

Returned `port` will be `None` if not present.

4.1 新版功能.
