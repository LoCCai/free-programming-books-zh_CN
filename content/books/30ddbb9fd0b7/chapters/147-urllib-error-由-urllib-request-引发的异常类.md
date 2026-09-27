**源代码：** [Lib/urllib/error.py](https://github.com/python/cpython/tree/3.14/Lib/urllib/error.py)

* * *

`urllib.error` 模块定义了由 [`urllib.request`](https://docs.python.org/zh-cn/3/library/urllib.request.html#module-urllib.request "urllib.request: Extensible library for opening URLs.") 引发的异常类。 基础异常类是 [`URLError`](#urllib.error.URLError "urllib.error.URLError")。

以下异常会由 `urllib.error` 在适当的时候引发：

_exception_ urllib.error.URLError[¶](#urllib.error.URLError "Link to this definition")

处理程序在遇到问题时会引发此异常（或其派生的异常）。 它是 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 的一个子类。

reason[¶](#urllib.error.URLError.reason "Link to this definition")

此错误的原因。 它可以是一个消息字符串或另一个异常实例。

_exception_ urllib.error.HTTPError(_url_, _code_, _msg_, _hdrs_, _fp_)[¶](#urllib.error.HTTPError "Link to this definition")

虽然是一个异常（[`URLError`](#urllib.error.URLError "urllib.error.URLError") 的一个子类），[`HTTPError`](#urllib.error.HTTPError "urllib.error.HTTPError") 也可以作为一个非异常的文件类返回值（与 [`urlopen()`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.urlopen "urllib.request.urlopen") 返回的对象相同）。 这适用于处理特殊 HTTP 错误例如作为认证请求的时候。

url[¶](#urllib.error.HTTPError.url "Link to this definition")

包含请求 URL。 是 _filename_ 属性的别名。

code[¶](#urllib.error.HTTPError.code "Link to this definition")

一个 HTTP 状态码，具体定义见 [**RFC 2616**](https://datatracker.ietf.org/doc/html/rfc2616.html)。 这个数字的值对应于存放在 [`http.server.BaseHTTPRequestHandler.responses`](https://docs.python.org/zh-cn/3/library/http.server.html#http.server.BaseHTTPRequestHandler.responses "http.server.BaseHTTPRequestHandler.responses") 代码字典中的某个值。

reason[¶](#urllib.error.HTTPError.reason "Link to this definition")

这通常是一个解释本次错误原因的字符串。 为 _msg_ 属性的别名。

导致 [`HTTPError`](#urllib.error.HTTPError "urllib.error.HTTPError") 的特定 HTTP 请求的 HTTP 响应头。 为 _hdrs_ 属性的别名。

Added in version 3.4.

fp[¶](#urllib.error.HTTPError.fp "Link to this definition")

可供读取 HTTP 错误消息体的文件型对象。

_exception_ urllib.error.ContentTooShortError(_msg_, _content_)[¶](#urllib.error.ContentTooShortError "Link to this definition")

此异常会在 [`urlretrieve()`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.urlretrieve "urllib.request.urlretrieve") 函数检测到已下载的数据量少于预期量（由 _Content-Length_ 标头给出）时被引发。

content[¶](#urllib.error.ContentTooShortError.content "Link to this definition")

已下载（并可能被截断）的数据。
