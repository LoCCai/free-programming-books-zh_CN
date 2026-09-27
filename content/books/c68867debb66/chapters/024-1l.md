Utility classes to write to and read from non-blocking files and sockets.

Contents:

-   [`BaseIOStream`](#tornado.iostream.BaseIOStream "tornado.iostream.BaseIOStream"): Generic interface for reading and writing.
-   [`IOStream`](#tornado.iostream.IOStream "tornado.iostream.IOStream"): Implementation of BaseIOStream using non-blocking sockets.
-   [`SSLIOStream`](#tornado.iostream.SSLIOStream "tornado.iostream.SSLIOStream"): SSL-aware version of IOStream.
-   [`PipeIOStream`](#tornado.iostream.PipeIOStream "tornado.iostream.PipeIOStream"): Pipe-based IOStream implementation.

## Base class[¶](#base-class "永久链接至标题")

_class_ `tornado.iostream.``BaseIOStream`(_io\_loop=None_, _max\_buffer\_size=None_, _read\_chunk\_size=None_, _max\_write\_buffer\_size=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream)[¶](#tornado.iostream.BaseIOStream "永久链接至目标")

A utility class to write to and read from a non-blocking file or socket.

We support a non-blocking `write()` and a family of `read_*()` methods. All of the methods take an optional `callback` argument and return a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") only if no callback is given. When the operation completes, the callback will be run or the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") will resolve with the data read (or `None` for `write()`). All outstanding `Futures` will resolve with a [`StreamClosedError`](#tornado.iostream.StreamClosedError "tornado.iostream.StreamClosedError") when the stream is closed; users of the callback interface will be notified via [`BaseIOStream.set_close_callback`](#tornado.iostream.BaseIOStream.set_close_callback "tornado.iostream.BaseIOStream.set_close_callback") instead.

When a stream is closed due to an error, the IOStream’s `error` attribute contains the exception object.

Subclasses must implement [`fileno`](#tornado.iostream.BaseIOStream.fileno "tornado.iostream.BaseIOStream.fileno"), [`close_fd`](#tornado.iostream.BaseIOStream.close_fd "tornado.iostream.BaseIOStream.close_fd"), [`write_to_fd`](#tornado.iostream.BaseIOStream.write_to_fd "tornado.iostream.BaseIOStream.write_to_fd"), [`read_from_fd`](#tornado.iostream.BaseIOStream.read_from_fd "tornado.iostream.BaseIOStream.read_from_fd"), and optionally [`get_fd_error`](#tornado.iostream.BaseIOStream.get_fd_error "tornado.iostream.BaseIOStream.get_fd_error").

[`BaseIOStream`](#tornado.iostream.BaseIOStream "tornado.iostream.BaseIOStream") constructor.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>io_loop</strong> – The <a href="https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop" title="tornado.ioloop.IOLoop"><code><span>IOLoop</span></code></a> to use; defaults to <a href="https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.current" title="tornado.ioloop.IOLoop.current"><code><span>IOLoop.current</span></code></a>. Deprecated since Tornado 4.1.</li><li><strong>max_buffer_size</strong> – Maximum amount of incoming data to buffer; defaults to 100MB.</li><li><strong>read_chunk_size</strong> – Amount of data to read at one time from the underlying transport; defaults to 64KB.</li><li><strong>max_write_buffer_size</strong> – Amount of outgoing data to buffer; defaults to unlimited.</li></ul></td></tr></tbody></table>

在 4.0 版更改: Add the `max_write_buffer_size` parameter. Changed default `read_chunk_size` to 64KB.

### Main interface[¶](#main-interface "永久链接至标题")

`BaseIOStream.``write`(_data_, _callback=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.write)[¶](#tornado.iostream.BaseIOStream.write "永久链接至目标")

Asynchronously write the given data to this stream.

If `callback` is given, we call it when all of the buffered write data has been successfully written to the stream. If there was previously buffered write data and an old write callback, that callback is simply overwritten with this new callback.

If no `callback` is given, this method returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") that resolves (with a result of `None`) when the write has been completed. If [`write`](#tornado.iostream.BaseIOStream.write "tornado.iostream.BaseIOStream.write") is called again before that [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") has resolved, the previous future will be orphaned and will never resolve.

在 4.0 版更改: Now returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") if no callback is given.

`BaseIOStream.``read_bytes`(_num\_bytes_, _callback=None_, _streaming\_callback=None_, _partial=False_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.read_bytes)[¶](#tornado.iostream.BaseIOStream.read_bytes "永久链接至目标")

Asynchronously read a number of bytes.

If a `streaming_callback` is given, it will be called with chunks of data as they become available, and the final result will be empty. Otherwise, the result is all the data that was read. If a callback is given, it will be run with the data as an argument; if not, this method returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future").

If `partial` is true, the callback is run as soon as we have any bytes to return (but never more than `num_bytes`)

在 4.0 版更改: Added the `partial` argument. The callback argument is now optional and a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") will be returned if it is omitted.

`BaseIOStream.``read_until`(_delimiter_, _callback=None_, _max\_bytes=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.read_until)[¶](#tornado.iostream.BaseIOStream.read_until "永久链接至目标")

Asynchronously read until we have found the given delimiter.

The result includes all the data read including the delimiter. If a callback is given, it will be run with the data as an argument; if not, this method returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future").

If `max_bytes` is not None, the connection will be closed if more than `max_bytes` bytes have been read and the delimiter is not found.

在 4.0 版更改: Added the `max_bytes` argument. The `callback` argument is now optional and a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") will be returned if it is omitted.

`BaseIOStream.``read_until_regex`(_regex_, _callback=None_, _max\_bytes=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.read_until_regex)[¶](#tornado.iostream.BaseIOStream.read_until_regex "永久链接至目标")

Asynchronously read until we have matched the given regex.

The result includes the data that matches the regex and anything that came before it. If a callback is given, it will be run with the data as an argument; if not, this method returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future").

If `max_bytes` is not None, the connection will be closed if more than `max_bytes` bytes have been read and the regex is not satisfied.

在 4.0 版更改: Added the `max_bytes` argument. The `callback` argument is now optional and a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") will be returned if it is omitted.

`BaseIOStream.``read_until_close`(_callback=None_, _streaming\_callback=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.read_until_close)[¶](#tornado.iostream.BaseIOStream.read_until_close "永久链接至目标")

Asynchronously reads all data from the socket until it is closed.

If a `streaming_callback` is given, it will be called with chunks of data as they become available, and the final result will be empty. Otherwise, the result is all the data that was read. If a callback is given, it will be run with the data as an argument; if not, this method returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future").

Note that if a `streaming_callback` is used, data will be read from the socket as quickly as it becomes available; there is no way to apply backpressure or cancel the reads. If flow control or cancellation are desired, use a loop with [`read_bytes(partial=True)`](#tornado.iostream.BaseIOStream.read_bytes "tornado.iostream.BaseIOStream.read_bytes") instead.

在 4.0 版更改: The callback argument is now optional and a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") will be returned if it is omitted.

`BaseIOStream.``close`(_exc\_info=False_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.close)[¶](#tornado.iostream.BaseIOStream.close "永久链接至目标")

Close this stream.

If `exc_info` is true, set the `error` attribute to the current exception from [`sys.exc_info`](https://docs.python.org/3.4/library/sys.html#sys.exc_info "(在 Python v3.4)") (or if `exc_info` is a tuple, use that instead of [`sys.exc_info`](https://docs.python.org/3.4/library/sys.html#sys.exc_info "(在 Python v3.4)")).

`BaseIOStream.``set_close_callback`(_callback_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.set_close_callback)[¶](#tornado.iostream.BaseIOStream.set_close_callback "永久链接至目标")

Call the given callback when the stream is closed.

This is not necessary for applications that use the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") interface; all outstanding `Futures` will resolve with a [`StreamClosedError`](#tornado.iostream.StreamClosedError "tornado.iostream.StreamClosedError") when the stream is closed.

`BaseIOStream.``closed`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.closed)[¶](#tornado.iostream.BaseIOStream.closed "永久链接至目标")

Returns true if the stream has been closed.

`BaseIOStream.``reading`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.reading)[¶](#tornado.iostream.BaseIOStream.reading "永久链接至目标")

Returns true if we are currently reading from the stream.

`BaseIOStream.``writing`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.writing)[¶](#tornado.iostream.BaseIOStream.writing "永久链接至目标")

Returns true if we are currently writing to the stream.

`BaseIOStream.``set_nodelay`(_value_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.set_nodelay)[¶](#tornado.iostream.BaseIOStream.set_nodelay "永久链接至目标")

Sets the no-delay flag for this stream.

By default, data written to TCP streams may be held for a time to make the most efficient use of bandwidth (according to Nagle’s algorithm). The no-delay flag requests that data be written as soon as possible, even if doing so would consume additional bandwidth.

This flag is currently defined only for TCP-based `IOStreams`.

3.1 新版功能.

### Methods for subclasses[¶](#methods-for-subclasses "永久链接至标题")

`BaseIOStream.``fileno`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.fileno)[¶](#tornado.iostream.BaseIOStream.fileno "永久链接至目标")

Returns the file descriptor for this stream.

`BaseIOStream.``close_fd`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.close_fd)[¶](#tornado.iostream.BaseIOStream.close_fd "永久链接至目标")

Closes the file underlying this stream.

`close_fd` is called by [`BaseIOStream`](#tornado.iostream.BaseIOStream "tornado.iostream.BaseIOStream") and should not be called elsewhere; other users should call [`close`](#tornado.iostream.BaseIOStream.close "tornado.iostream.BaseIOStream.close") instead.

`BaseIOStream.``write_to_fd`(_data_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.write_to_fd)[¶](#tornado.iostream.BaseIOStream.write_to_fd "永久链接至目标")

Attempts to write `data` to the underlying file.

Returns the number of bytes written.

`BaseIOStream.``read_from_fd`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.read_from_fd)[¶](#tornado.iostream.BaseIOStream.read_from_fd "永久链接至目标")

Attempts to read from the underlying file.

Returns `None` if there was nothing to read (the socket returned [`EWOULDBLOCK`](https://docs.python.org/3.4/library/errno.html#errno.EWOULDBLOCK "(在 Python v3.4)") or equivalent), otherwise returns the data. When possible, should return no more than `self.read_chunk_size` bytes at a time.

`BaseIOStream.``get_fd_error`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#BaseIOStream.get_fd_error)[¶](#tornado.iostream.BaseIOStream.get_fd_error "永久链接至目标")

Returns information about any error on the underlying file.

This method is called after the [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") has signaled an error on the file descriptor, and should return an Exception (such as [`socket.error`](https://docs.python.org/3.4/library/socket.html#socket.error "(在 Python v3.4)") with additional information, or None if no such information is available.

## Implementations[¶](#implementations "永久链接至标题")

_class_ `tornado.iostream.``IOStream`(_socket_, _\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#IOStream)[¶](#tornado.iostream.IOStream "永久链接至目标")

Socket-based [`IOStream`](#tornado.iostream.IOStream "tornado.iostream.IOStream") implementation.

This class supports the read and write methods from [`BaseIOStream`](#tornado.iostream.BaseIOStream "tornado.iostream.BaseIOStream") plus a [`connect`](#tornado.iostream.IOStream.connect "tornado.iostream.IOStream.connect") method.

The `socket` parameter may either be connected or unconnected. For server operations the socket is the result of calling [`socket.accept`](https://docs.python.org/3.4/library/socket.html#socket.socket.accept "(在 Python v3.4)"). For client operations the socket is created with [`socket.socket`](https://docs.python.org/3.4/library/socket.html#socket.socket "(在 Python v3.4)"), and may either be connected before passing it to the [`IOStream`](#tornado.iostream.IOStream "tornado.iostream.IOStream") or connected with [`IOStream.connect`](#tornado.iostream.IOStream.connect "tornado.iostream.IOStream.connect").

A very simple (and broken) HTTP client using this class:

import tornado.ioloop
import tornado.iostream
import socket

def send\_request():
    stream.write(b"GET / HTTP/1.0\\r\\nHost: friendfeed.com\\r\\n\\r\\n")
    stream.read\_until(b"\\r\\n\\r\\n", on\_headers)

def on\_headers(data):
    headers \= {}
    for line in data.split(b"\\r\\n"):
       parts \= line.split(b":")
       if len(parts) \== 2:
           headers\[parts\[0\].strip()\] \= parts\[1\].strip()
    stream.read\_bytes(int(headers\[b"Content-Length"\]), on\_body)

def on\_body(data):
    print(data)
    stream.close()
    tornado.ioloop.IOLoop.current().stop()

if \_\_name\_\_ \== '\_\_main\_\_':
    s \= socket.socket(socket.AF\_INET, socket.SOCK\_STREAM, 0)
    stream \= tornado.iostream.IOStream(s)
    stream.connect(("friendfeed.com", 80), send\_request)
    tornado.ioloop.IOLoop.current().start()

`connect`(_address_, _callback=None_, _server\_hostname=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#IOStream.connect)[¶](#tornado.iostream.IOStream.connect "永久链接至目标")

Connects the socket to a remote address without blocking.

May only be called if the socket passed to the constructor was not previously connected. The address parameter is in the same format as for [`socket.connect`](https://docs.python.org/3.4/library/socket.html#socket.socket.connect "(在 Python v3.4)") for the type of socket passed to the IOStream constructor, e.g. an `(ip, port)` tuple. Hostnames are accepted here, but will be resolved synchronously and block the IOLoop. If you have a hostname instead of an IP address, the [`TCPClient`](https://tornado-zh.readthedocs.io/zh/latest/tcpclient.html#tornado.tcpclient.TCPClient "tornado.tcpclient.TCPClient") class is recommended instead of calling this method directly. [`TCPClient`](https://tornado-zh.readthedocs.io/zh/latest/tcpclient.html#tornado.tcpclient.TCPClient "tornado.tcpclient.TCPClient") will do asynchronous DNS resolution and handle both IPv4 and IPv6.

If `callback` is specified, it will be called with no arguments when the connection is completed; if not this method returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") (whose result after a successful connection will be the stream itself).

In SSL mode, the `server_hostname` parameter will be used for certificate validation (unless disabled in the `ssl_options`) and SNI (if supported; requires Python 2.7.9+).

Note that it is safe to call [`IOStream.write`](#tornado.iostream.BaseIOStream.write "tornado.iostream.BaseIOStream.write") while the connection is pending, in which case the data will be written as soon as the connection is ready. Calling [`IOStream`](#tornado.iostream.IOStream "tornado.iostream.IOStream") read methods before the socket is connected works on some platforms but is non-portable.

在 4.0 版更改: If no callback is given, returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future").

在 4.2 版更改: SSL certificates are validated by default; pass `ssl_options=dict(cert_reqs=ssl.CERT_NONE)` or a suitably-configured [`ssl.SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") to the [`SSLIOStream`](#tornado.iostream.SSLIOStream "tornado.iostream.SSLIOStream") constructor to disable.

`start_tls`(_server\_side_, _ssl\_options=None_, _server\_hostname=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#IOStream.start_tls)[¶](#tornado.iostream.IOStream.start_tls "永久链接至目标")

Convert this [`IOStream`](#tornado.iostream.IOStream "tornado.iostream.IOStream") to an [`SSLIOStream`](#tornado.iostream.SSLIOStream "tornado.iostream.SSLIOStream").

This enables protocols that begin in clear-text mode and switch to SSL after some initial negotiation (such as the `STARTTLS` extension to SMTP and IMAP).

This method cannot be used if there are outstanding reads or writes on the stream, or if there is any data in the IOStream’s buffer (data in the operating system’s socket buffer is allowed). This means it must generally be used immediately after reading or writing the last clear-text data. It can also be used immediately after connecting, before any reads or writes.

The `ssl_options` argument may be either an [`ssl.SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") object or a dictionary of keyword arguments for the [`ssl.wrap_socket`](https://docs.python.org/3.4/library/ssl.html#ssl.wrap_socket "(在 Python v3.4)") function. The `server_hostname` argument will be used for certificate validation unless disabled in the `ssl_options`.

This method returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") whose result is the new [`SSLIOStream`](#tornado.iostream.SSLIOStream "tornado.iostream.SSLIOStream"). After this method has been called, any other operation on the original stream is undefined.

If a close callback is defined on this stream, it will be transferred to the new stream.

4.0 新版功能.

在 4.2 版更改: SSL certificates are validated by default; pass `ssl_options=dict(cert_reqs=ssl.CERT_NONE)` or a suitably-configured [`ssl.SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") to disable.

_class_ `tornado.iostream.``SSLIOStream`(_\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#SSLIOStream)[¶](#tornado.iostream.SSLIOStream "永久链接至目标")

A utility class to write to and read from a non-blocking SSL socket.

If the socket passed to the constructor is already connected, it should be wrapped with:

ssl.wrap\_socket(sock, do\_handshake\_on\_connect\=False, \*\*kwargs)

before constructing the [`SSLIOStream`](#tornado.iostream.SSLIOStream "tornado.iostream.SSLIOStream"). Unconnected sockets will be wrapped when [`IOStream.connect`](#tornado.iostream.IOStream.connect "tornado.iostream.IOStream.connect") is finished.

The `ssl_options` keyword argument may either be an [`ssl.SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") object or a dictionary of keywords arguments for [`ssl.wrap_socket`](https://docs.python.org/3.4/library/ssl.html#ssl.wrap_socket "(在 Python v3.4)")

`wait_for_handshake`(_callback=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#SSLIOStream.wait_for_handshake)[¶](#tornado.iostream.SSLIOStream.wait_for_handshake "永久链接至目标")

Wait for the initial SSL handshake to complete.

If a `callback` is given, it will be called with no arguments once the handshake is complete; otherwise this method returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") which will resolve to the stream itself after the handshake is complete.

Once the handshake is complete, information such as the peer’s certificate and NPN/ALPN selections may be accessed on `self.socket`.

This method is intended for use on server-side streams or after using [`IOStream.start_tls`](#tornado.iostream.IOStream.start_tls "tornado.iostream.IOStream.start_tls"); it should not be used with [`IOStream.connect`](#tornado.iostream.IOStream.connect "tornado.iostream.IOStream.connect") (which already waits for the handshake to complete). It may only be called once per stream.

4.2 新版功能.

_class_ `tornado.iostream.``PipeIOStream`(_fd_, _\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#PipeIOStream)[¶](#tornado.iostream.PipeIOStream "永久链接至目标")

Pipe-based [`IOStream`](#tornado.iostream.IOStream "tornado.iostream.IOStream") implementation.

The constructor takes an integer file descriptor (such as one returned by [`os.pipe`](https://docs.python.org/3.4/library/os.html#os.pipe "(在 Python v3.4)")) rather than an open file object. Pipes are generally one-way, so a [`PipeIOStream`](#tornado.iostream.PipeIOStream "tornado.iostream.PipeIOStream") can be used for reading or writing but not both.

## Exceptions[¶](#exceptions "永久链接至标题")

_exception_ `tornado.iostream.``StreamBufferFullError`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#StreamBufferFullError)[¶](#tornado.iostream.StreamBufferFullError "永久链接至目标")

Exception raised by [`IOStream`](#tornado.iostream.IOStream "tornado.iostream.IOStream") methods when the buffer is full.

_exception_ `tornado.iostream.``StreamClosedError`(_real\_error=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#StreamClosedError)[¶](#tornado.iostream.StreamClosedError "永久链接至目标")

Exception raised by [`IOStream`](#tornado.iostream.IOStream "tornado.iostream.IOStream") methods when the stream is closed.

Note that the close callback is scheduled to run _after_ other callbacks on the stream (to allow for buffered data to be processed), so you may see this error before you see the close callback.

The `real_error` attribute contains the underlying error that caused the stream to close (if any).

在 4.3 版更改: Added the `real_error` attribute.

_exception_ `tornado.iostream.``UnsatisfiableReadError`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/iostream.html#UnsatisfiableReadError)[¶](#tornado.iostream.UnsatisfiableReadError "永久链接至目标")

Exception raised when a read cannot be satisfied.

Raised by `read_until` and `read_until_regex` with a `max_bytes` argument.
