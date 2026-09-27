Client and server implementations of HTTP/1.x.

4.0 新版功能.

_class_ `tornado.http1connection.``HTTP1ConnectionParameters`(_no\_keep\_alive=False_, _chunk\_size=None_, _max\_header\_size=None_, _header\_timeout=None_, _max\_body\_size=None_, _body\_timeout=None_, _decompress=False_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/http1connection.html#HTTP1ConnectionParameters)[¶](#tornado.http1connection.HTTP1ConnectionParameters "永久链接至目标")

Parameters for [`HTTP1Connection`](#tornado.http1connection.HTTP1Connection "tornado.http1connection.HTTP1Connection") and [`HTTP1ServerConnection`](#tornado.http1connection.HTTP1ServerConnection "tornado.http1connection.HTTP1ServerConnection").

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>no_keep_alive</strong> (<a href="https://docs.python.org/3.4/library/functions.html#bool" title="(在 Python v3.4)"><em>bool</em></a>) – If true, always close the connection after one request.</li><li><strong>chunk_size</strong> (<a href="https://docs.python.org/3.4/library/functions.html#int" title="(在 Python v3.4)"><em>int</em></a>) – how much data to read into memory at once</li><li><strong>max_header_size</strong> (<a href="https://docs.python.org/3.4/library/functions.html#int" title="(在 Python v3.4)"><em>int</em></a>) – maximum amount of data for HTTP headers</li><li><strong>header_timeout</strong> (<a href="https://docs.python.org/3.4/library/functions.html#float" title="(在 Python v3.4)"><em>float</em></a>) – how long to wait for all headers (seconds)</li><li><strong>max_body_size</strong> (<a href="https://docs.python.org/3.4/library/functions.html#int" title="(在 Python v3.4)"><em>int</em></a>) – maximum amount of data for body</li><li><strong>body_timeout</strong> (<a href="https://docs.python.org/3.4/library/functions.html#float" title="(在 Python v3.4)"><em>float</em></a>) – how long to wait while reading body (seconds)</li><li><strong>decompress</strong> (<a href="https://docs.python.org/3.4/library/functions.html#bool" title="(在 Python v3.4)"><em>bool</em></a>) – if true, decode incoming <code><span>Content-Encoding:</span> <span>gzip</span></code></li></ul></td></tr></tbody></table>

_class_ `tornado.http1connection.``HTTP1Connection`(_stream_, _is\_client_, _params=None_, _context=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/http1connection.html#HTTP1Connection)[¶](#tornado.http1connection.HTTP1Connection "永久链接至目标")

Implements the HTTP/1.x protocol.

This class can be on its own for clients, or via [`HTTP1ServerConnection`](#tornado.http1connection.HTTP1ServerConnection "tornado.http1connection.HTTP1ServerConnection") for servers.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>stream</strong> – an <a href="https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream" title="tornado.iostream.IOStream"><code><span>IOStream</span></code></a></li><li><strong>is_client</strong> (<a href="https://docs.python.org/3.4/library/functions.html#bool" title="(在 Python v3.4)"><em>bool</em></a>) – client or server</li><li><strong>params</strong> – a <a href="#tornado.http1connection.HTTP1ConnectionParameters" title="tornado.http1connection.HTTP1ConnectionParameters"><code><span>HTTP1ConnectionParameters</span></code></a> instance or <code><span>None</span></code></li><li><strong>context</strong> – an opaque application-defined object that can be accessed as <code><span>connection.context</span></code>.</li></ul></td></tr></tbody></table>

`read_response`(_delegate_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/http1connection.html#HTTP1Connection.read_response)[¶](#tornado.http1connection.HTTP1Connection.read_response "永久链接至目标")

Read a single HTTP response.

Typical client-mode usage is to write a request using [`write_headers`](#tornado.http1connection.HTTP1Connection.write_headers "tornado.http1connection.HTTP1Connection.write_headers"), [`write`](#tornado.http1connection.HTTP1Connection.write "tornado.http1connection.HTTP1Connection.write"), and [`finish`](#tornado.http1connection.HTTP1Connection.finish "tornado.http1connection.HTTP1Connection.finish"), and then call `read_response`.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>delegate</strong> – a <a href="https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPMessageDelegate" title="tornado.httputil.HTTPMessageDelegate"><code><span>HTTPMessageDelegate</span></code></a></td></tr></tbody></table>

Returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") that resolves to None after the full response has been read.

`set_close_callback`(_callback_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/http1connection.html#HTTP1Connection.set_close_callback)[¶](#tornado.http1connection.HTTP1Connection.set_close_callback "永久链接至目标")

Sets a callback that will be run when the connection is closed.

`detach`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/http1connection.html#HTTP1Connection.detach)[¶](#tornado.http1connection.HTTP1Connection.detach "永久链接至目标")

Take control of the underlying stream.

Returns the underlying [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") object and stops all further HTTP processing. May only be called during [`HTTPMessageDelegate.headers_received`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPMessageDelegate.headers_received "tornado.httputil.HTTPMessageDelegate.headers_received"). Intended for implementing protocols like websockets that tunnel over an HTTP handshake.

`set_body_timeout`(_timeout_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/http1connection.html#HTTP1Connection.set_body_timeout)[¶](#tornado.http1connection.HTTP1Connection.set_body_timeout "永久链接至目标")

Sets the body timeout for a single request.

Overrides the value from [`HTTP1ConnectionParameters`](#tornado.http1connection.HTTP1ConnectionParameters "tornado.http1connection.HTTP1ConnectionParameters").

`set_max_body_size`(_max\_body\_size_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/http1connection.html#HTTP1Connection.set_max_body_size)[¶](#tornado.http1connection.HTTP1Connection.set_max_body_size "永久链接至目标")

Sets the body size limit for a single request.

Overrides the value from [`HTTP1ConnectionParameters`](#tornado.http1connection.HTTP1ConnectionParameters "tornado.http1connection.HTTP1ConnectionParameters").

Implements [`HTTPConnection.write_headers`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPConnection.write_headers "tornado.httputil.HTTPConnection.write_headers").

`write`(_chunk_, _callback=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/http1connection.html#HTTP1Connection.write)[¶](#tornado.http1connection.HTTP1Connection.write "永久链接至目标")

Implements [`HTTPConnection.write`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPConnection.write "tornado.httputil.HTTPConnection.write").

For backwards compatibility is is allowed but deprecated to skip [`write_headers`](#tornado.http1connection.HTTP1Connection.write_headers "tornado.http1connection.HTTP1Connection.write_headers") and instead call [`write()`](#tornado.http1connection.HTTP1Connection.write "tornado.http1connection.HTTP1Connection.write") with a pre-encoded header block.

`finish`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/http1connection.html#HTTP1Connection.finish)[¶](#tornado.http1connection.HTTP1Connection.finish "永久链接至目标")

Implements [`HTTPConnection.finish`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPConnection.finish "tornado.httputil.HTTPConnection.finish").

_class_ `tornado.http1connection.``HTTP1ServerConnection`(_stream_, _params=None_, _context=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/http1connection.html#HTTP1ServerConnection)[¶](#tornado.http1connection.HTTP1ServerConnection "永久链接至目标")

An HTTP/1.x server.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>stream</strong> – an <a href="https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream" title="tornado.iostream.IOStream"><code><span>IOStream</span></code></a></li><li><strong>params</strong> – a <a href="#tornado.http1connection.HTTP1ConnectionParameters" title="tornado.http1connection.HTTP1ConnectionParameters"><code><span>HTTP1ConnectionParameters</span></code></a> or None</li><li><strong>context</strong> – an opaque application-defined object that is accessible as <code><span>connection.context</span></code></li></ul></td></tr></tbody></table>

`close`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/http1connection.html#HTTP1ServerConnection.close)[¶](#tornado.http1connection.HTTP1ServerConnection.close "永久链接至目标")

Closes the connection.

Returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") that resolves after the serving loop has exited.

`start_serving`(_delegate_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/http1connection.html#HTTP1ServerConnection.start_serving)[¶](#tornado.http1connection.HTTP1ServerConnection.start_serving "永久链接至目标")

Starts serving requests on this connection.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><strong>delegate</strong> – a <a href="https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPServerConnectionDelegate" title="tornado.httputil.HTTPServerConnectionDelegate"><code><span>HTTPServerConnectionDelegate</span></code></a></td></tr></tbody></table>
