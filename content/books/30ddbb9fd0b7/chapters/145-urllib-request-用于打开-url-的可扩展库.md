**源码：** [Lib/urllib/request.py](https://github.com/python/cpython/tree/3.14/Lib/urllib/request.py)

* * *

`urllib.request` 模块定义了在复杂环境下打开 URL（主要是 HTTP）的函数和类——包括基本和摘要认证、重定向、cookie 等。

警告

在 macOS 将此模块用于包含 [`os.fork()`](https://docs.python.org/zh-cn/3/library/os.html#os.fork "os.fork") 的程序是不安全的，因为 macOS 的 [`getproxies()`](#urllib.request.getproxies "urllib.request.getproxies") 实现使用了高层级的系统 API。 可将环境变量 `no_proxy` 设为 `*` 以避免此问题 (即 `os.environ["no_proxy"] = "*"`)。

`urllib.request` 模块定义了以下函数：

urllib.request.urlopen(_url_, _data=None_, \[_timeout_, \]_\*_, _context=None_)[¶](#urllib.request.urlopen "Link to this definition")

打开 _url_，它可以是一个包含有效的、被正确编码的 URL 的字符串，或是一个 [`Request`](#urllib.request.Request "urllib.request.Request") 对象。

_data_ 必须是一个对象，用于给出要发送到服务器的附加数据，若不需要发送数据则为 `None`。详情请参阅 [`Request`](#urllib.request.Request "urllib.request.Request") 。

urllib.request 模块采用 HTTP/1.1 协议，并且在其 HTTP 请求中包含 `Connection:close` 头部信息。

_timeout_ 为可选参数，用于指定阻塞操作（如连接尝试）的超时时间，单位为秒（如未指定，将使用全局默认超时参数）。本参数实际仅对 HTTP、HTTPS 和 FTP 连接有效。

如果给定了 _context_ 参数，则必须是一个 [`ssl.SSLContext`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.SSLContext "ssl.SSLContext") 实例，用于描述各种 SSL 参数。更多详情请参阅 [`HTTPSConnection`](https://docs.python.org/zh-cn/3/library/http.client.html#http.client.HTTPSConnection "http.client.HTTPSConnection") 。

本函数总会返回一个对象，该对象可作为 [context manager](https://docs.python.org/zh-cn/3/glossary.html#term-context-manager) 使用，带有 _url_、_headers_ 和 _status_ 属性。有关这些属性的更多详细信息，请参阅 [`urllib.response.addinfourl`](#urllib.response.addinfourl "urllib.response.addinfourl") 。

对于 HTTP 和 HTTPS 的 URL 而言，本函数将返回一个稍经修改的 [`http.client.HTTPResponse`](https://docs.python.org/zh-cn/3/library/http.client.html#http.client.HTTPResponse "http.client.HTTPResponse") 对象。除了上述 3 个新的方法之外，还有 msg 属性包含了与 [`reason`](https://docs.python.org/zh-cn/3/library/http.client.html#http.client.HTTPResponse.reason "http.client.HTTPResponse.reason") 属性相同的信息---服务器返回的原因描述文字，而不是 `HTTPResponse` 的文档所述的响应头部信息。

对于 FTP、文件和数据URL，本函数返回一个 [`urllib.response.addinfourl`](#urllib.response.addinfourl "urllib.response.addinfourl") 对象。

协议发生错误时，将会引发 [`URLError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.URLError "urllib.error.URLError") 。

请注意，如果没有处理函数对请求进行处理，则有可能会返回 `None` 。尽管默认安装的全局 [`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 会用 [`UnknownHandler`](#urllib.request.UnknownHandler "urllib.request.UnknownHandler") 来确保不会发生这种情况。

另外，如果检测到设置了代理（例如，当设置了 `http_proxy` 之类的 `*_proxy` 环境变量时），将默认安装 [`ProxyHandler`](#urllib.request.ProxyHandler "urllib.request.ProxyHandler") 并确保通过代理来处理请求。

Python 2.6 以下版本中留存的 `urllib.urlopen` 函数已停止使用了； [`urllib.request.urlopen()`](#urllib.request.urlopen "urllib.request.urlopen") 对应于传统的 `urllib2.urlopen` 。对代理服务的处理是通过将字典参数传给 `urllib.urlopen` 来完成的，可以用 [`ProxyHandler`](#urllib.request.ProxyHandler "urllib.request.ProxyHandler") 对象获取到代理处理函数。

默认会为 `urllib.Request` 引发一条 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing)，其参数 `fullurl`、`data`、`headers`、`method` 均取自请求对象。

在 3.2 版本发生变更: 增加了 _cafile_ 与 _capath_。

现在将在可能的情况下支持 HTTPS 虚拟主机（也就是说，如果 [`ssl.HAS_SNI`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.HAS_SNI "ssl.HAS_SNI") 为真值）。

_data_ 可以是一个可迭代对象。

在 3.3 版本发生变更: 增加了 _cadefault_。

在 3.4.3 版本发生变更: 增加了 _context_。

在 3.10 版本发生变更: 当未给出 _context_ 时 HTTPS 连接现在会发送一个带有 `http/1.1` 协议指示符的 ALPN 扩展。 自定义 _context_ 应当使用 [`set_alpn_protocols()`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.SSLContext.set_alpn_protocols "ssl.SSLContext.set_alpn_protocols") 来设置 ALPN 协议。

在 3.13 版本发生变更: 移除了 _cafile_, _capath_ 和 _cadefault_ 形参：请改用 _context_ 形参。

urllib.request.install\_opener(_opener_)[¶](#urllib.request.install_opener "Link to this definition")

安装一个 [`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 实例，作为默认的全局打开函数。仅当 urlopen 用到该打开函数时才需要安装；否则，只需调用 [`OpenerDirector.open()`](#urllib.request.OpenerDirector.open "urllib.request.OpenerDirector.open") 而不是 [`urlopen()`](#urllib.request.urlopen "urllib.request.urlopen")。代码不会检查是否真的属于 `OpenerDirector` 类，所有具备适当接口的类都能适用。

urllib.request.build\_opener(\[_handler_, _..._\])[¶](#urllib.request.build_opener "Link to this definition")

返回一个 [`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 实例，以给定顺序把处理函数串联起来。处理函数可以是 [`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") 的实例，也可以是 `BaseHandler` 的子类（这时构造函数必须允许不带任何参数的调用）。以下类的实例将位于 _处理函数_ 之前，除非 _处理函数_ 已包含这些类、其实例或其子类： [`ProxyHandler`](#urllib.request.ProxyHandler "urllib.request.ProxyHandler") （如果检测到代理设置）、[`UnknownHandler`](#urllib.request.UnknownHandler "urllib.request.UnknownHandler") 、[`HTTPHandler`](#urllib.request.HTTPHandler "urllib.request.HTTPHandler") 、[`HTTPDefaultErrorHandler`](#urllib.request.HTTPDefaultErrorHandler "urllib.request.HTTPDefaultErrorHandler") 、[`HTTPRedirectHandler`](#urllib.request.HTTPRedirectHandler "urllib.request.HTTPRedirectHandler") 、 [`FTPHandler`](#urllib.request.FTPHandler "urllib.request.FTPHandler") 、 [`FileHandler`](#urllib.request.FileHandler "urllib.request.FileHandler") 、[`HTTPErrorProcessor`](#urllib.request.HTTPErrorProcessor "urllib.request.HTTPErrorProcessor") 。

若 Python 安装时已带了 SSL 支持（指可以导入 [`ssl`](https://docs.python.org/zh-cn/3/library/ssl.html#module-ssl "ssl: TLS/SSL wrapper for socket objects") 模块），则还会加入 [`HTTPSHandler`](#urllib.request.HTTPSHandler "urllib.request.HTTPSHandler") 。

A [`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") subclass may also change its `handler_order` attribute to modify its position in the handlers list.

urllib.request.pathname2url(_path_, _\*_, _add\_scheme\=False_)[¶](#urllib.request.pathname2url "Link to this definition")

将给定的本地路径转换为 `file:` URL。这个函数使用 [`quote()`](https://docs.python.org/zh-cn/3/library/urllib.parse.html#urllib.parse.quote "urllib.parse.quote") 函数对路径进行编码。

如果 _add\_scheme_ 为 false（默认值），返回值将省略 `file:` 方案前缀。 设置 _add\_scheme_ 为 true 返回完整的 URL。

这个例子显示了在Windows上使用该函数的情况:

\>>> from urllib.request import pathname2url
\>>> path \= 'C:\\\\Program Files'
\>>> pathname2url(path, add\_scheme\=True)
'file:///C:/Program%20Files'

在 3.14 版本发生变更: Windows 盘符不再转换为大写，并且盘符后面的 `:` 字符不再导致在 Windows 上引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 异常。

在 3.14 版本发生变更: 以斜杠开头的路径将转换为带有权限节的 URL。 例如，路径 `/etc/hosts` 被转换为 URL `///etc/hosts`。

在 3.14 版本发生变更: 增加了 _add\_scheme_ 形参。

urllib.request.url2pathname(_url_, _\*_, _require\_scheme\=False_, _resolve\_host\=False_)[¶](#urllib.request.url2pathname "Link to this definition")

将给定的 `file:` URL 转换为本地路径。 这个函数使用 [`unquote()`](https://docs.python.org/zh-cn/3/library/urllib.parse.html#urllib.parse.unquote "urllib.parse.unquote") 函数对 URL 进行解码。

如果 _require\_scheme_ 为 false（默认值），则给定的值应该省略 `file:` 方案前缀。如果 _require\_scheme_ 被设置为 true，那么给定的值应该包含前缀；如果没有前缀，将引发 [`URLError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.URLError "urllib.error.URLError")。

如果 URL 权限为空、`localhost` 或本地主机名，则丢弃该 URL 权限。 否则，如果 _resolve\_host_ 设置为 true，则使用 [`socket.gethostbyname()`](https://docs.python.org/zh-cn/3/library/socket.html#socket.gethostbyname "socket.gethostbyname") 解析权限，如果它匹配本地 IP 地址（根据 [**RFC 8089§3**](https://datatracker.ietf.org/doc/html/rfc8089.html#section-3) 确定）则丢弃权限。 如果权限仍然未处理，则在 Windows 上返回 UNC 路径，在其他平台上引发 [`URLError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.URLError "urllib.error.URLError")。

这个例子显示了在Windows上使用该函数的情况:

\>>> from urllib.request import url2pathname
\>>> url \= 'file:///C:/Program%20Files'
\>>> url2pathname(url, require\_scheme\=True)
'C:\\\\Program Files'

在 3.14 版本发生变更: Windows 盘符不再转换为大写，并且盘符后面的 `:` 字符不再导致在 Windows 上引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 异常。

在 3.14 版本发生变更: 如果与本地主机名匹配，则丢弃 URL 权限。否则，如果权限不是空的或 `localhost`，那么在 Windows 上返回 UNC 路径（和以前一样），在其他平台上引发 [`URLError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.URLError "urllib.error.URLError")。

在 3.14 版本发生变更: URL 查询和片段组件如果存在则会被丢弃。

在 3.14 版本发生变更: 增加了 _require\_scheme_ 和 _resolve\_host_ 形参。

urllib.request.getproxies()[¶](#urllib.request.getproxies "Link to this definition")

此辅助函数将返回一个将各个方案映射到代理服务器 URL 的字典。 它会先为所有操作系统以大小写不敏感的方式扫描名为 `<scheme>_proxy` 的环境变量，当无法找到时，则会在 macOS 上从系统配置中而在 Windows 上从 Windows 系统注册表中查找代理信息。 如果同时存在小写和大写形式的环境变量（且内容不一致），则会首选小写形式。

备注

如果存在环境变量 `REQUEST_METHOD` ，通常表示脚本运行于 CGI 环境中，则环境变量 `HTTP_PROXY` (大写的 `_PROXY`) 将会被忽略。 这是因其可以由客户端用 HTTP 头部信息 “Proxy:”注入。若要在 CGI 环境中使用 HTTP 代理，请显式使用 `ProxyHandler` ，或确保变量名称为小写（或至少是 `_proxy` 后缀）。

提供了以下类：

_class_ urllib.request.Request(_url_, _data\=None_, _headers\={}_, _origin\_req\_host\=None_, _unverifiable\=False_, _method\=None_)[¶](#urllib.request.Request "Link to this definition")

URL 请求对象的抽象类。

_url_ 应为一个包含有效的、被正确编码的 URL 的字符串。

_data_ 必须是一个对象，用于给定发往服务器的附加数据，若无需此类数据则为 `None` 。 目前 唯一用到 _data_ 的只有 HTTP 请求。支持的对象类型包括字节串、类文件对象和可遍历的类字节串对象。如果没有提供 `Content-Length` 和 `Transfer-Encoding` 头部字段， [`HTTPHandler`](#urllib.request.HTTPHandler "urllib.request.HTTPHandler") 会根据 _data_ 的类型设置这些头部字段。`Content-Length` 将用于发送字节对象，而 [**RFC 7230**](https://datatracker.ietf.org/doc/html/rfc7230.html) 第 3.3.1 节中定义的 `Transfer-Encoding: chunked` 将用于发送文件和其他可遍历对象。

对于 HTTP POST 请求方法而言，_data_ 应该是标准 _application/x-www-form-urlencoded_ 格式的缓冲区。 [`urllib.parse.urlencode()`](https://docs.python.org/zh-cn/3/library/urllib.parse.html#urllib.parse.urlencode "urllib.parse.urlencode") 函数的参数为映射对象或二元组序列，并返回一个该编码格式的 ASCII 字符串。在用作 _data_ 参数之前，应将其编码为字节串。

_headers_ 应当是一个字典，并将被视同附带了每个键和值作为参数去调用 [`add_header()`](#urllib.request.Request.add_header "urllib.request.Request.add_header")。 这通常被用于 "伪装" `User-Agent` 标头值，浏览器会使用标头值来标识自己 -- 某些 HTTP 服务器只允许来自普通浏览器的请求而不允许来自脚本的请求。 例如，Mozilla Firefox 可能将自己标识为 `"Mozilla/5.0 (X11; U; Linux i686) Gecko/20071127 Firefox/2.0.0.11"`，而 [`urllib`](https://docs.python.org/zh-cn/3/library/urllib.html#module-urllib "urllib") 的默认用户代理字符串则是 `"Python-urllib/2.6"` (在 Python 2.6 中)。 所有发送的标头键都使用驼峰命名法。

如果给出了 _data_ 参数则应当包括一个合适的 `Content-Type` 标头。 如果未提供此标头并且 _data_ 不为 `None`，则会添加 `Content-Type: application/x-www-form-urlencoded` 作为默认值。

接下来的两个参数，只对第三方 HTTP cookie 的处理才有用：

_origin\_req\_host_ 应为发起初始会话的请求主机，定义参见 [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) 。默认指为 `http.cookiejar.request_host(self)` 。这是用户发起初始请求的主机名或 IP 地址。假设请求是针对 HTML 文档中的图片数据发起的，则本属性应为对包含图像的页面发起请求的主机。

_unverifiable_ 应该标示出请求是否无法验证，定义参见 [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) 。默认值为 `False` 。所谓无法验证的请求，是指用户没有机会对请求的 URL 做验证。例如，如果请求是针对 HTML 文档中的图像，用户没有机会去许可能自动读取图像，则本参数应为 True。

_method_ 应为一个指明要使用的 HTTP 请求方法的字符串 (例如 `'HEAD'`)。 如果提供，其值将存储在 [`method`](#urllib.request.Request.method "urllib.request.Request.method") 属性中并由 [`get_method()`](#urllib.request.Request.get_method "urllib.request.Request.get_method") 使用。 如果 _data_ 为 `None` 则默认为 `'GET'`，否则为 `'POST'`。 子类可以通过在类自身设置 `method` 属性来指明不同的默认方法。

备注

如果 data 对象无法分多次传递其内容（比如文件或只能生成一次内容的可迭代对象）并且由于 HTTP 重定向或身份验证而发生请求重试行为，则该请求不会正常工作。 _data_ 是紧挨着头部信息发送给 HTTP 服务器的。现有库不支持 HTTP 100-continue 的征询。

在 3.3 版本发生变更: Request 类增加了 [`Request.method`](#urllib.request.Request.method "urllib.request.Request.method") 参数。

在 3.4 版本发生变更: 默认 [`Request.method`](#urllib.request.Request.method "urllib.request.Request.method") 可以在类中标明。

在 3.6 版本发生变更: 如果未给出 `Content-Length` ，且 _data_ 既不为 `None` 也不是字节串对象，则不会触发错误。而会退而求其次采用分块传输的编码格式。

_class_ urllib.request.OpenerDirector[¶](#urllib.request.OpenerDirector "Link to this definition")

[`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 类通过串接在一起的 [`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") 打开 URL，并负责管理 handler 链及从错误中恢复。

_class_ urllib.request.BaseHandler[¶](#urllib.request.BaseHandler "Link to this definition")

这是所有已注册 handler 的基类，只做了简单的注册机制。

_class_ urllib.request.HTTPDefaultErrorHandler[¶](#urllib.request.HTTPDefaultErrorHandler "Link to this definition")

为 HTTP 错误响应定义的默认 handler，所有出错响应都会转为 [`HTTPError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.HTTPError "urllib.error.HTTPError") 异常。

_class_ urllib.request.HTTPRedirectHandler[¶](#urllib.request.HTTPRedirectHandler "Link to this definition")

一个用于处理重定向的类。

_class_ urllib.request.HTTPCookieProcessor(_cookiejar\=None_)[¶](#urllib.request.HTTPCookieProcessor "Link to this definition")

一个用于处理 HTTP Cookies 的类。

_class_ urllib.request.ProxyHandler(_proxies\=None_)[¶](#urllib.request.ProxyHandler "Link to this definition")

让请求转往代理服务。 如果给出了 _proxies_，则它必须是一个将协议名称映射到代理 URL 的字典。 默认是从环境变量 `<protocol>_proxy` 中读取代理列表。 如果没有设置代理服务的环境变量，则在 Windows 环境下代理设置会从注册表的 Internet Settings 部分获取，而在 macOS 环境下代理信息会从 System Configuration Framework 获取。

若要禁用自动检测出来的代理，请传入空的字典对象。

环境变量 `no_proxy` 可用于指定不必通过代理访问的主机；应为逗号分隔的主机名后缀列表，可加上 `:port` ，例如 `cern.ch,ncsa.uiuc.edu,some.host:8080` 。

备注

如果设置了 `REQUEST_METHOD` 变量，则会忽略 `HTTP_PROXY` ；参阅 [`getproxies()`](#urllib.request.getproxies "urllib.request.getproxies") 文档。

_class_ urllib.request.HTTPPasswordMgr[¶](#urllib.request.HTTPPasswordMgr "Link to this definition")

维护 `(realm, uri) -> (user, password)` 映射数据库。

_class_ urllib.request.HTTPPasswordMgrWithDefaultRealm[¶](#urllib.request.HTTPPasswordMgrWithDefaultRealm "Link to this definition")

维护 `(realm, uri) -> (user, password)` 映射数据库。realm 为 `None` 视作全匹配，若没有其他合适的安全区域就会检索它。

_class_ urllib.request.HTTPPasswordMgrWithPriorAuth[¶](#urllib.request.HTTPPasswordMgrWithPriorAuth "Link to this definition")

[`HTTPPasswordMgrWithDefaultRealm`](#urllib.request.HTTPPasswordMgrWithDefaultRealm "urllib.request.HTTPPasswordMgrWithDefaultRealm") 的一个变体，也带有 `uri -> is_authenticated` 映射数据库。可被 BasicAuth 处理函数用于确定立即发送身份认证凭据的时机，而不是先等待 `401` 响应。

Added in version 3.5.

_class_ urllib.request.AbstractBasicAuthHandler(_password\_mgr\=None_)[¶](#urllib.request.AbstractBasicAuthHandler "Link to this definition")

这是一个帮助完成 HTTP 身份认证的混合类，对远程主机和代理都适用。参数 _password\_mgr_ 应与 [`HTTPPasswordMgr`](#urllib.request.HTTPPasswordMgr "urllib.request.HTTPPasswordMgr") 兼容；关于必须支持哪些接口，请参阅 [HTTPPasswordMgr 对象](#http-password-mgr) 对象的章节。如果 _password\_mgr_ 还提供 `is_authenticated` 和 `update_authenticated` 方法（请参阅 [HTTPPasswordMgrWithPriorAuth 对象](#http-password-mgr-with-prior-auth) 对象），则 handler 将对给定 URI 用到 `is_authenticated` 的结果，来确定是否随请求发送身份认证凭据。如果该 URI 的 `is_authenticated` 返回 `True`，则发送凭据。如果 `is_authenticated` 为 `False` ，则不发送凭据，然后若收到 `401` 响应，则使用身份认证凭据重新发送请求。如果身份认证成功，则调用 `update_authenticated` 设置该 URI 的 `is_authenticated` 为 `True`，这样后续对该 URI 或其所有父 URI 的请求将自动包含该身份认证凭据。

Added in version 3.5: 增加了对 `is_authenticated` 的支持。

_class_ urllib.request.HTTPBasicAuthHandler(_password\_mgr\=None_)[¶](#urllib.request.HTTPBasicAuthHandler "Link to this definition")

处理远程主机的身份认证。 _password\_mgr_ 应与 [`HTTPPasswordMgr`](#urllib.request.HTTPPasswordMgr "urllib.request.HTTPPasswordMgr") 兼容；有关哪些接口是必须支持的，请参阅 [HTTPPasswordMgr 对象](#http-password-mgr) 章节。如果给出错误的身份认证方式， HTTPBasicAuthHandler 将会触发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 。

_class_ urllib.request.ProxyBasicAuthHandler(_password\_mgr\=None_)[¶](#urllib.request.ProxyBasicAuthHandler "Link to this definition")

处理有代理服务时的身份认证。 _password\_mgr_ 应与 [`HTTPPasswordMgr`](#urllib.request.HTTPPasswordMgr "urllib.request.HTTPPasswordMgr") 兼容；有关哪些接口是必须支持的，请参阅 [HTTPPasswordMgr 对象](#http-password-mgr) 章节。

_class_ urllib.request.AbstractDigestAuthHandler(_password\_mgr\=None_)[¶](#urllib.request.AbstractDigestAuthHandler "Link to this definition")

这是一个帮助完成 HTTP 身份认证的混合类，对远程主机和代理都适用。参数 _password\_mgr_ 应与 [`HTTPPasswordMgr`](#urllib.request.HTTPPasswordMgr "urllib.request.HTTPPasswordMgr") 兼容；关于必须支持哪些接口，请参阅 [HTTPPasswordMgr 对象](#http-password-mgr) 的章节。

在 3.14 版本发生变更: 增加了对 HTTP 摘要认证算法 `SHA-256` 的支持。

_class_ urllib.request.HTTPDigestAuthHandler(_password\_mgr\=None_)[¶](#urllib.request.HTTPDigestAuthHandler "Link to this definition")

处理远程主机的身份认证。 _password\_mgr_ 应与 [`HTTPPasswordMgr`](#urllib.request.HTTPPasswordMgr "urllib.request.HTTPPasswordMgr") 兼容；有关哪些接口是必须支持的，请参阅 [HTTPPasswordMgr 对象](#http-password-mgr) 章节。如果同时添加了 digest 身份认证 handler 和basic 身份认证 handler，则会首先尝试 digest 身份认证。如果 digest 身份认证再返回 40x 响应，会再发送到 basic 身份验证 handler 进行处理。如果给出 Digest 和 Basic 之外的身份认证方式， 本 handler 方法将会触发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 。

在 3.3 版本发生变更: 碰到不支持的认证方式时，将会触发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 。

_class_ urllib.request.ProxyDigestAuthHandler(_password\_mgr\=None_)[¶](#urllib.request.ProxyDigestAuthHandler "Link to this definition")

处理有代理服务时的身份认证。 _password\_mgr_ 应与 [`HTTPPasswordMgr`](#urllib.request.HTTPPasswordMgr "urllib.request.HTTPPasswordMgr") 兼容；有关哪些接口是必须支持的，请参阅 [HTTPPasswordMgr 对象](#http-password-mgr) 章节。

_class_ urllib.request.HTTPHandler[¶](#urllib.request.HTTPHandler "Link to this definition")

用于打开 HTTP URL 的 handler 类。

_class_ urllib.request.HTTPSHandler(_debuglevel\=0_, _context\=None_, _check\_hostname\=None_)[¶](#urllib.request.HTTPSHandler "Link to this definition")

用于打开 HTTPS URL 的 handler 类。_context_ 和 _check\_hostname_ 的含义与 [`http.client.HTTPSConnection`](https://docs.python.org/zh-cn/3/library/http.client.html#http.client.HTTPSConnection "http.client.HTTPSConnection") 的一样。

在 3.2 版本发生变更: 添加 _context_ 和 _check\_hostname_ 参数。

_class_ urllib.request.FileHandler[¶](#urllib.request.FileHandler "Link to this definition")

打开本地文件。

_class_ urllib.request.DataHandler[¶](#urllib.request.DataHandler "Link to this definition")

打开数据 URL。

Added in version 3.4.

_class_ urllib.request.FTPHandler[¶](#urllib.request.FTPHandler "Link to this definition")

打开 FTP URL。

_class_ urllib.request.CacheFTPHandler[¶](#urllib.request.CacheFTPHandler "Link to this definition")

打开 FTP URL，并将打开的 FTP 连接存入缓存，以便最大程度减少延迟。

_class_ urllib.request.UnknownHandler[¶](#urllib.request.UnknownHandler "Link to this definition")

处理所有未知类型 URL 的兜底类。

_class_ urllib.request.HTTPErrorProcessor[¶](#urllib.request.HTTPErrorProcessor "Link to this definition")

处理出错的 HTTP 响应。

## Request 对象[¶](#request-objects "Link to this heading")

以下方法介绍了 [`Request`](#urllib.request.Request "urllib.request.Request") 的公开接口，因此子类可以覆盖所有这些方法。这里还定义了几个公开属性，客户端可以利用这些属性了解经过解析的请求。

Request.full\_url[¶](#urllib.request.Request.full_url "Link to this definition")

传给构造函数的原始 URL。

在 3.4 版本发生变更.

Request.full\_url 是一个带有 setter、getter 和 deleter 的属性。读取 [`full_url`](#urllib.request.Request.full_url "urllib.request.Request.full_url") 属性将会返回附带片段（fragment）的初始请求 URL。

Request.type[¶](#urllib.request.Request.type "Link to this definition")

URI 方案。

Request.host[¶](#urllib.request.Request.host "Link to this definition")

URI 权限，通常是整个主机，但也有可能带有冒号分隔的端口号。

Request.origin\_req\_host[¶](#urllib.request.Request.origin_req_host "Link to this definition")

请求的原始主机，不含端口。

Request.selector[¶](#urllib.request.Request.selector "Link to this definition")

URI 路径。若 [`Request`](#urllib.request.Request "urllib.request.Request") 使用代理，selector 将会是传给代理的完整 URL。

Request.data[¶](#urllib.request.Request.data "Link to this definition")

请求的数据体，未给出则为 `None` 。

在 3.4 版本发生变更: 现在如果修改 [`Request.data`](#urllib.request.Request.data "urllib.request.Request.data") 的值，则会删除之前设置或计算过的“Content-Length”头部信息。

Request.unverifiable[¶](#urllib.request.Request.unverifiable "Link to this definition")

布尔值，标识本请求是否属于 [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) 中定义的无法验证的情况。

Request.method[¶](#urllib.request.Request.method "Link to this definition")

要采用的 HTTP 请求方法。默认为 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")，表示 [`get_method()`](#urllib.request.Request.get_method "urllib.request.Request.get_method") 将对方法进行正常处理。设置本值可以覆盖 `get_method()` 中的默认处理过程，设置方式可以是在 [`Request`](#urllib.request.Request "urllib.request.Request") 的子类中给出默认值，也可以通过 _method_ 参数给 `Request` 构造函数传入一个值。

Added in version 3.3.

在 3.4 版本发生变更: 现在可以在子类中设置默认值；而之前只能通过构造函数的实参进行设置。

Request.get\_method()[¶](#urllib.request.Request.get_method "Link to this definition")

返回表示 HTTP 请求方法的字符串。如果 [`Request.method`](#urllib.request.Request.method "urllib.request.Request.method") 不为 `None` ，则返回其值。否则若 [`Request.data`](#urllib.request.Request.data "urllib.request.Request.data") 为 `None` 则返回 `'GET'`，不为 `None` 则返回 `'POST'` 。只对 HTTP 请求有效。

在 3.3 版本发生变更: 现在 get\_method 会兼顾 [`Request.method`](#urllib.request.Request.method "urllib.request.Request.method") 的值。

向请求添加一个标头。 标头目前会被所有处理器忽略但只有 HTTP 处理器是例外，该处理器会将它们加入发给服务器的标头列表中。 请注意同名的标头只能有一个，当 _key_ 发生冲突时后续的调用将会覆盖之前的调用。 目前，这并不会造成 HTTP 功能的损失，因为所有可多次使用而仍有意义的标头都有（特定标头专属的）方式来获得与仅使用一个标头时相同的功能。 请注意使用此方法添加的标头也会被添加到重定向的请求中。

添加一项不会被加入重定向请求的头部信息。

返回本实例是否带有命名头部信息（对常规数据和非重定向数据都会检测）。

从本请求实例中移除指定命名的头部信息（对常规数据和非重定向数据都会检测）。

Added in version 3.4.

Request.get\_full\_url()[¶](#urllib.request.Request.get_full_url "Link to this definition")

返回构造器中给定的 URL。

在 3.4 版本发生变更.

返回 [`Request.full_url`](#urllib.request.Request.full_url "urllib.request.Request.full_url")

Request.set\_proxy(_host_, _type_)[¶](#urllib.request.Request.set_proxy "Link to this definition")

连接代理服务器，为当前请求做准备。 _host_ 和 _type_ 将会取代本实例中的对应值，selector 将会是构造函数中给出的初始 URL。

返回给定头部信息的数据。如果该头部信息不存在，返回默认值。

返回头部信息，形式为（名称, 数据）的元组列表。

在 3.4 版本发生变更: 自 3.3 起已弃用的下列方法已被删除：add\_data、has\_data、get\_data、get\_type、get\_host、get\_selector、get\_origin\_req\_host 和 is\_unverifiable 。

## OpenerDirector 对象[¶](#openerdirector-objects "Link to this heading")

[`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 实例有以下方法：

OpenerDirector.add\_handler(_handler_)[¶](#urllib.request.OpenerDirector.add_handler "Link to this definition")

_handler_ 应为 [`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") 的实例。将检索以下类型的方法，并将其添加到对应的处理链中（注意 HTTP 错误是特殊情况）。请注意，下文中的 _protocol_ 应替换为要处理的实际协议，例如 `http_response()` 将是 HTTP 协议响应处理函数。并且 _type_ 也应替换为实际的 HTTP 代码，例如 `http_error_404()` 将处理 HTTP 404 错误。

-   `<protocol>_open()` --- 表明该处理器知道如何打开 _protocol_ URL。
    
    更多信息请参阅 [`BaseHandler.<protocol>_open()`](#protocol-open) 。
    
-   `http_error_<type>()` --- 表明该处理器知道如何处理 HTTP 错误代码 _type_ 对应的 HTTP 错误。
    
    更多信息请参阅 [`BaseHandler.http_error_<nnn>()`](#http-error-nnn) 。
    
-   `<protocol>_error()` --- 表明该处理器知道如何处理来自 (非 `http`) _protocol_ 的错误。
    
-   `<protocol>_request()` --- 表明该处理器知道如何预处理 _protocol_ 请求。
    
    更多信息请参阅 [`BaseHandler.<protocol>_request()`](#protocol-request) 。
    
-   `<protocol>_response()` --- 表明该处理器知道如何后继处理 _protocol_ 响应。
    
    更多信息请参阅 [`BaseHandler.<protocol>_response()`](#protocol-response) 。
    

OpenerDirector.open(_url_, _data=None_\[, _timeout_\])[¶](#urllib.request.OpenerDirector.open "Link to this definition")

打开给定的 _url_ (可以是一个请求对象或一个字符串），可以选择传入给定的 _data_。 参数、返回值和被引发的异常均与 [`urlopen()`](#urllib.request.urlopen "urllib.request.urlopen") 的相同 (它只是简单地在当前安装的全局 [`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 上调用 [`open()`](https://docs.python.org/zh-cn/3/builtins/functions.html#open "open") 方法)。 可选的 _timeout_ 形参指定了针对阻塞操作例如连接尝试的超时值 (如果未指明，则将使用全局默认的超时设置)。 超时特性仅适用于 HTTP, HTTPS 和 FTP 连接。

OpenerDirector.error(_proto_, _\*args_)[¶](#urllib.request.OpenerDirector.error "Link to this definition")

处理一个给定协议的错误。 这将调用针对给定协议的已注册错误处理器并附带给定的参数（这是协议专属的）。 HTTP 协议是一种特殊情况，它使用 HTTP 响应码来确定具体的错误处理器；请参阅错误处理器类的 `http_error_<type>()` 方法。

返回值和异常均与 [`urlopen()`](#urllib.request.urlopen "urllib.request.urlopen") 相同。

OpenerDirector 对象分 3 个阶段打开 URL：

每个阶段中调用这些方法的次序取决于 handler 实例的顺序。

1.  每个具有名称为 `<protocol>_request()` 的方法的处理器都会调用该方法来对请求进行预处理。
    
2.  具有名称为 `<protocol>_open()` 的方法的处理器将被调用以处理请求。 这一阶段将在处理器返回非 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None") 值 (即一个响应) 或者引发异常 (通常为 [`URLError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.URLError "urllib.error.URLError")) 时结束。 异常将被允许传播。
    
    实际上，以上算法会先尝试名为 [`default_open()`](#urllib.request.BaseHandler.default_open "urllib.request.BaseHandler.default_open") 的方法。 如果这些方法全都返回 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")，则会对名为 `<protocol>_open()` 的方法重复此算法。 如果这些方法也全都返回 `None`，则会继续对名为 [`unknown_open()`](#urllib.request.BaseHandler.unknown_open "urllib.request.BaseHandler.unknown_open") 的方法重复此算法。
    
    请注意，这些方法的代码可能会调用 [`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 父实例的 [`open()`](#urllib.request.OpenerDirector.open "urllib.request.OpenerDirector.open") 和 [`error()`](#urllib.request.OpenerDirector.error "urllib.request.OpenerDirector.error") 方法。
    
3.  每个具有名称为 `<protocol>_response()` 的方法的处理器都会调用该方法来对响应进行后续处理。
    

## BaseHandler 对象[¶](#basehandler-objects "Link to this heading")

[`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") 对象提供了一些直接可用的方法，以及其他一些可供派生类使用的方法。以下是可供直接使用的方法：

BaseHandler.add\_parent(_director_)[¶](#urllib.request.BaseHandler.add_parent "Link to this definition")

将 director 加为父 OpenerDirector。

BaseHandler.close()[¶](#urllib.request.BaseHandler.close "Link to this definition")

移除所有父 OpenerDirector。

以下属性和方法仅供 [`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") 的子类使用：

备注

以下约定已被采纳：定义 `<protocol>_request()` 或 `<protocol>_response()` 方法的子类应当命名为 `*Processor`；所有其他子类应当命名为 `*Handler`。

BaseHandler.parent[¶](#urllib.request.BaseHandler.parent "Link to this definition")

一个可用的 [`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector")，可用于以其他协议打开 URI，或处理错误。

BaseHandler.default\_open(_req_)[¶](#urllib.request.BaseHandler.default_open "Link to this definition")

本方法在 [`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") 中 _未_ 予定义，但其子类若要捕获所有 URL 则应进行定义。

如果实现了本方法，则它将被上级 [`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 所调用。 它应当返回一个如 `OpenerDirector` 的 [`open()`](#urllib.request.OpenerDirector.open "urllib.request.OpenerDirector.open") 方法的返回值所描述的文件型对象，或是返回 `None`。 它应当引发 [`URLError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.URLError "urllib.error.URLError")，除非发生真正的异常 (例如，[`MemoryError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#MemoryError "MemoryError") 就不应被映射为 `URLError`)。

本方法将会在所有协议的 open 方法之前被调用。

BaseHandler.<protocol>\_open(req)

本方法在 [`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") 中 _未_ 予定义，但其子类若要处理给定协议的 URL 则应进行定义。

此方法如果被定义，它将被上级 [`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 调用。 返回值应当与 [`default_open()`](#urllib.request.BaseHandler.default_open "urllib.request.BaseHandler.default_open") 的相同。

BaseHandler.unknown\_open(_req_)[¶](#urllib.request.BaseHandler.unknown_open "Link to this definition")

本方法在 [`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") 中 _未_ 予定义，但其子类若要捕获并打开所有未注册 handler 的 URL，则应进行定义。

若实现了本方法，将会被 [`parent`](#urllib.request.BaseHandler.parent "urllib.request.BaseHandler.parent") 属性指向的父 [`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 调用。返回值和 [`default_open()`](#urllib.request.BaseHandler.default_open "urllib.request.BaseHandler.default_open") 的一样。

BaseHandler.http\_error\_default(_req_, _fp_, _code_, _msg_, _hdrs_)[¶](#urllib.request.BaseHandler.http_error_default "Link to this definition")

本方法在 [`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") 中 _未_ 予定义，但其子类若要为所有未定义 handler 的 HTTP 错误提供一个兜底方法，则应进行重写。[`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 会自动调用本方法，获取错误信息，而通常在其他时候不应去调用。

[`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 将附带五个位置参数调用此方法：

1.  一个 [`Request`](#urllib.request.Request "urllib.request.Request") 对象，
    
2.  一个包含 HTTP 错误消息体的文件型对象，
    
3.  字符串形式的三位错误代码，
    
4.  字符串形式的用户可见的代码说明，以及
    
5.  映射对象形式的错误标头。
    

返回值和触发的异常应与 [`urlopen()`](#urllib.request.urlopen "urllib.request.urlopen") 的相同。

BaseHandler.http\_error\_<nnn>(req, fp, code, msg, hdrs)

_nnn_ 应为三位数的 HTTP 错误码。本方法在 [`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") 中也未予定义，但当子类的实例发生代码为 _nnn_ 的 HTTP 错误时，若方法存在则会被调用。

子类应该重写本方法，以便能处理相应的 HTTP 错误。

参数、返回值和被引发的异常应当与 [`http_error_default()`](#urllib.request.BaseHandler.http_error_default "urllib.request.BaseHandler.http_error_default") 的相同。

BaseHandler.<protocol>\_request(req)

本方法在 [`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") 中 _未_ 予定义，但其子类若要对给定协议的请求进行预处理，则应进行定义。

若实现了本方法，将会被父 [`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 调用。_req_ 将为 [`Request`](#urllib.request.Request "urllib.request.Request") 对象。返回值应为 `Request` 对象。

BaseHandler.<protocol>\_response(req, response)

本方法在 [`BaseHandler`](#urllib.request.BaseHandler "urllib.request.BaseHandler") 中 _未_ 予定义，但其子类若要对给定协议的请求进行后处理，则应进行定义。

若实现了本方法，将会被父 [`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 调用。_req_ 将为 [`Request`](#urllib.request.Request "urllib.request.Request") 对象。_response_ 应实现与 [`urlopen()`](#urllib.request.urlopen "urllib.request.urlopen") 返回值相同的接口。返回值应实现与 `urlopen()` 返回值相同的接口。

## HTTPRedirectHandler 对象[¶](#httpredirecthandler-objects "Link to this heading")

备注

某些 HTTP 重定向操作需要本模块的客户端代码提供的功能。这时会触发 [`HTTPError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.HTTPError "urllib.error.HTTPError")。有关各种重定向代码的确切含义，请参阅 [**RFC 2616**](https://datatracker.ietf.org/doc/html/rfc2616.html) 。

如果发给 HTTPRedirectHandler 的重定向 URL 不是 HTTP, HTTPS 或 FTP URL 则出于安全考虑将会引发 [`HTTPError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.HTTPError "urllib.error.HTTPError") 异常。

HTTPRedirectHandler.redirect\_request(_req_, _fp_, _code_, _msg_, _hdrs_, _newurl_)[¶](#urllib.request.HTTPRedirectHandler.redirect_request "Link to this definition")

返回一个 [`Request`](#urllib.request.Request "urllib.request.Request") 或 `None` 作为对重定向的响应。 此方法将在服务器接收到重定向请求时由 `http_error_30*()` 方法的默认实现执行调用。 如果确实应当发生重定向，则返回一个新的 `Request` 以允许 `http_error_30*()` 重定向到 _newurl_。 在其他情况下，如果没有其他处理器来处理此 URL 则会引发 [`HTTPError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.HTTPError "urllib.error.HTTPError")，或者如果此方法不能处理但或许还有其他处理器会处理则返回 `None`。

备注

本方法的默认实现代码并未严格遵循 [**RFC 2616**](https://datatracker.ietf.org/doc/html/rfc2616.html)，即 `POST` 请求的 301 和 302 响应不得在未经用户确认的情况下自动进行重定向。现实情况下，浏览器确实允许自动重定向这些响应，将 POST 更改为 `GET` ，于是默认实现代码就复现了这种处理方式。

HTTPRedirectHandler.http\_error\_301(_req_, _fp_, _code_, _msg_, _hdrs_)[¶](#urllib.request.HTTPRedirectHandler.http_error_301 "Link to this definition")

重定向到 `Location:` 或 `URI:` URL。 当得到 HTTP 'moved permanently' 响应时，本方法会被父级 [`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 调用。

HTTPRedirectHandler.http\_error\_302(_req_, _fp_, _code_, _msg_, _hdrs_)[¶](#urllib.request.HTTPRedirectHandler.http_error_302 "Link to this definition")

与 [`http_error_301()`](#urllib.request.HTTPRedirectHandler.http_error_301 "urllib.request.HTTPRedirectHandler.http_error_301") 相同，不过是发生“found”响应时的调用。

HTTPRedirectHandler.http\_error\_303(_req_, _fp_, _code_, _msg_, _hdrs_)[¶](#urllib.request.HTTPRedirectHandler.http_error_303 "Link to this definition")

与 [`http_error_301()`](#urllib.request.HTTPRedirectHandler.http_error_301 "urllib.request.HTTPRedirectHandler.http_error_301") 相同，不过是发生“see other”响应时的调用。

HTTPRedirectHandler.http\_error\_307(_req_, _fp_, _code_, _msg_, _hdrs_)[¶](#urllib.request.HTTPRedirectHandler.http_error_307 "Link to this definition")

与 [`http_error_301()`](#urllib.request.HTTPRedirectHandler.http_error_301 "urllib.request.HTTPRedirectHandler.http_error_301") 一样，但是针对 '临时重定向' 响应进行调用。 它不允许将请求方法从 `POST` 改为 `GET`。

HTTPRedirectHandler.http\_error\_308(_req_, _fp_, _code_, _msg_, _hdrs_)[¶](#urllib.request.HTTPRedirectHandler.http_error_308 "Link to this definition")

与 [`http_error_301()`](#urllib.request.HTTPRedirectHandler.http_error_301 "urllib.request.HTTPRedirectHandler.http_error_301") 一样，但是针对 '永久重定向' 响应进行调用。 它不允许将请求方法从 `POST` 改为 `GET`。

Added in version 3.11.

## HTTPCookieProcessor 对象[¶](#httpcookieprocessor-objects "Link to this heading")

[`HTTPCookieProcessor`](#urllib.request.HTTPCookieProcessor "urllib.request.HTTPCookieProcessor") 的实例具备一个属性：

HTTPCookieProcessor.cookiejar[¶](#urllib.request.HTTPCookieProcessor.cookiejar "Link to this definition")

cookie 存放在 [`http.cookiejar.CookieJar`](https://docs.python.org/zh-cn/3/library/http.cookiejar.html#http.cookiejar.CookieJar "http.cookiejar.CookieJar") 中。

## ProxyHandler 对象[¶](#proxyhandler-objects "Link to this heading")

ProxyHandler.<protocol>\_open(request)

[`ProxyHandler`](#urllib.request.ProxyHandler "urllib.request.ProxyHandler") 将有对应每种 _protocol_ 的 `<protocol>_open()` 方法，在构造函数给出的 _proxies_ 字典中包含相应的代理。 通过调用 `request.set_proxy()`，本方法将把请求修改为通过代理，并调用链中的下一个处理器来实际执行协议。

## HTTPPasswordMgr 对象[¶](#httppasswordmgr-objects "Link to this heading")

以下方法 [`HTTPPasswordMgr`](#urllib.request.HTTPPasswordMgr "urllib.request.HTTPPasswordMgr") 和 [`HTTPPasswordMgrWithDefaultRealm`](#urllib.request.HTTPPasswordMgrWithDefaultRealm "urllib.request.HTTPPasswordMgrWithDefaultRealm") 对象均有提供。

HTTPPasswordMgr.add\_password(_realm_, _uri_, _user_, _passwd_)[¶](#urllib.request.HTTPPasswordMgr.add_password "Link to this definition")

_uri_ can be either a single URI, or a sequence of URIs. _realm_, _user_ and _passwd_ must be strings. This causes `(user, passwd)` to be used as authentication tokens when authentication for _realm_ and a super-URI of any of the given URIs is given. If a URI includes a scheme, its credentials only match authentication URIs with the same scheme or no scheme. A URI without a scheme matches authentication URIs with any scheme.

在 3.14.7 (unreleased) 版本发生变更: Authentication credentials for URIs with a scheme are now scoped by that scheme.

HTTPPasswordMgr.find\_user\_password(_realm_, _authuri_)[¶](#urllib.request.HTTPPasswordMgr.find_user_password "Link to this definition")

为给定 realm 和 URI 获取用户名和密码。如果没有匹配的用户名和密码，本方法将会返回 `(None, None)` 。

对于 [`HTTPPasswordMgrWithDefaultRealm`](#urllib.request.HTTPPasswordMgrWithDefaultRealm "urllib.request.HTTPPasswordMgrWithDefaultRealm") 对象，如果给定 _realm_ 没有匹配的用户名和密码，将搜索 realm `None`。

## HTTPPasswordMgrWithPriorAuth 对象[¶](#httppasswordmgrwithpriorauth-objects "Link to this heading")

这是 [`HTTPPasswordMgrWithDefaultRealm`](#urllib.request.HTTPPasswordMgrWithDefaultRealm "urllib.request.HTTPPasswordMgrWithDefaultRealm") 的扩展，以便对那些需要一直发送认证凭证的 URI 进行跟踪。

HTTPPasswordMgrWithPriorAuth.add\_password(_realm_, _uri_, _user_, _passwd_, _is\_authenticated\=False_)[¶](#urllib.request.HTTPPasswordMgrWithPriorAuth.add_password "Link to this definition")

_realm_、_uri_、_user_、_passwd_ 的含义与 [`HTTPPasswordMgr.add_password()`](#urllib.request.HTTPPasswordMgr.add_password "urllib.request.HTTPPasswordMgr.add_password") 的相同。_is\_authenticated_ 为给定 URI 或 URI 列表设置 `is_authenticated` 标志的初始值。如果 _is\_authenticated_ 设为 `True` ，则会忽略 _realm_。

HTTPPasswordMgrWithPriorAuth.find\_user\_password(_realm_, _authuri_)[¶](#urllib.request.HTTPPasswordMgrWithPriorAuth.find_user_password "Link to this definition")

与 [`HTTPPasswordMgrWithDefaultRealm`](#urllib.request.HTTPPasswordMgrWithDefaultRealm "urllib.request.HTTPPasswordMgrWithDefaultRealm") 对象的相同。

HTTPPasswordMgrWithPriorAuth.update\_authenticated(_self_, _uri_, _is\_authenticated\=False_)[¶](#urllib.request.HTTPPasswordMgrWithPriorAuth.update_authenticated "Link to this definition")

更新给定 _uri_ 或 URI 列表的 `is_authenticated` 标志。

HTTPPasswordMgrWithPriorAuth.is\_authenticated(_self_, _authuri_)[¶](#urllib.request.HTTPPasswordMgrWithPriorAuth.is_authenticated "Link to this definition")

返回给定 URI `is_authenticated` 标志的当前状态。

## AbstractBasicAuthHandler 对象[¶](#abstractbasicauthhandler-objects "Link to this heading")

AbstractBasicAuthHandler.http\_error\_auth\_reqed(_authreq_, _host_, _req_, _headers_)[¶](#urllib.request.AbstractBasicAuthHandler.http_error_auth_reqed "Link to this definition")

通过获取用户名和密码并重新尝试请求，以处理身份认证请求。 _authreq_ 应该是请求中包含 realm 的头部信息名称，_host_ 指定了需要进行身份认证的 URL 和路径，_req_ 应为 (已失败的) [`Request`](#urllib.request.Request "urllib.request.Request") 对象 , _headers_ 应该是出错的头部信息。

_headers_ must be a mapping-like object with case-insensitive lookup that implements the `get_all()` method, such as [`email.message.Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") or [`wsgiref.headers.Headers`](https://docs.python.org/zh-cn/3/library/wsgiref.html#wsgiref.headers.Headers "wsgiref.headers.Headers").

_host_ 是一个授权名 (例如 `"python.org"`) 或包含授权名部分的 URL (例如 `"https://python.org/"`)。 在两种情况下，授权名都不可包含用户信息部分（因此，`"python.org"` 和 `"python.org:80"` 可以，而 `"joe:password@python.org"` 不可以）。

## HTTPBasicAuthHandler 对象[¶](#httpbasicauthhandler-objects "Link to this heading")

HTTPBasicAuthHandler.http\_error\_401(_req_, _fp_, _code_, _msg_, _hdrs_)[¶](#urllib.request.HTTPBasicAuthHandler.http_error_401 "Link to this definition")

如果可用的话，请用身份认证信息重试请求。

## ProxyBasicAuthHandler 对象[¶](#proxybasicauthhandler-objects "Link to this heading")

ProxyBasicAuthHandler.http\_error\_407(_req_, _fp_, _code_, _msg_, _hdrs_)[¶](#urllib.request.ProxyBasicAuthHandler.http_error_407 "Link to this definition")

如果可用的话，请用身份认证信息重试请求。

## AbstractDigestAuthHandler 对象[¶](#abstractdigestauthhandler-objects "Link to this heading")

AbstractDigestAuthHandler.http\_error\_auth\_reqed(_authreq_, _host_, _req_, _headers_)[¶](#urllib.request.AbstractDigestAuthHandler.http_error_auth_reqed "Link to this definition")

_authreq_ 应为请求中有关 realm 的头部信息名称，_host_ 应为需要进行身份认证的主机，_req_ 应为（已失败的） [`Request`](#urllib.request.Request "urllib.request.Request") 对象， _headers_ 则应为出错的头部信息。

_headers_ must be a mapping-like object with case-insensitive lookup, such as [`email.message.Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") or [`wsgiref.headers.Headers`](https://docs.python.org/zh-cn/3/library/wsgiref.html#wsgiref.headers.Headers "wsgiref.headers.Headers").

## HTTPDigestAuthHandler 对象[¶](#httpdigestauthhandler-objects "Link to this heading")

HTTPDigestAuthHandler.http\_error\_401(_req_, _fp_, _code_, _msg_, _hdrs_)[¶](#urllib.request.HTTPDigestAuthHandler.http_error_401 "Link to this definition")

如果可用的话，请用身份认证信息重试请求。

## ProxyDigestAuthHandler 对象[¶](#proxydigestauthhandler-objects "Link to this heading")

ProxyDigestAuthHandler.http\_error\_407(_req_, _fp_, _code_, _msg_, _hdrs_)[¶](#urllib.request.ProxyDigestAuthHandler.http_error_407 "Link to this definition")

如果可用的话，请用身份认证信息重试请求。

## HTTPHandler 对象[¶](#httphandler-objects "Link to this heading")

HTTPHandler.http\_open(_req_)[¶](#urllib.request.HTTPHandler.http_open "Link to this definition")

发送一个HTTP请求，可以是GET或POST，取决于 `req.data`。

## HTTPSHandler 对象[¶](#httpshandler-objects "Link to this heading")

HTTPSHandler.https\_open(_req_)[¶](#urllib.request.HTTPSHandler.https_open "Link to this definition")

发送一个HTTPS请求，可以是GET或POST，取决于 `req.data`。

## FileHandler 对象[¶](#filehandler-objects "Link to this heading")

FileHandler.file\_open(_req_)[¶](#urllib.request.FileHandler.file_open "Link to this definition")

若无主机名或主机名为 `'localhost'` ，则打开本地文件。

在 3.2 版本发生变更: 本方法仅适用于本地主机名。 当给出一个远程主机名时，将会引发 [`URLError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.URLError "urllib.error.URLError")。

## DataHandler 对象[¶](#datahandler-objects "Link to this heading")

DataHandler.data\_open(_req_)[¶](#urllib.request.DataHandler.data_open "Link to this definition")

读取一个数据 URL。 这种 URL 在 URL 本身就包含了已编码内容。 数据 URL 语法是在 [**RFC 2397**](https://datatracker.ietf.org/doc/html/rfc2397.html) 中规定的。 当前的实现会忽略 base64 编码的数据 URL 中的空格以便 URL 可以被包装在任何其所在的源文件中。 但是即使某些浏览器不会在意 base64 编码的数据 URL 末尾缺失的填充字符，当前的实现仍会在此情况下引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

## FTPHandler 对象[¶](#ftphandler-objects "Link to this heading")

FTPHandler.ftp\_open(_req_)[¶](#urllib.request.FTPHandler.ftp_open "Link to this definition")

打开由 _req_ 给出的 FTP 文件。登录时的用户名和密码总是为空。

## CacheFTPHandler 对象[¶](#cacheftphandler-objects "Link to this heading")

[`CacheFTPHandler`](#urllib.request.CacheFTPHandler "urllib.request.CacheFTPHandler") 对象即为加入以下方法的 [`FTPHandler`](#urllib.request.FTPHandler "urllib.request.FTPHandler") 对象：

CacheFTPHandler.setTimeout(_t_)[¶](#urllib.request.CacheFTPHandler.setTimeout "Link to this definition")

设置连接超时为 _t_ 秒。

CacheFTPHandler.setMaxConns(_m_)[¶](#urllib.request.CacheFTPHandler.setMaxConns "Link to this definition")

设置已缓存的最大连接数为 _m_ 。

## UnknownHandler 对象[¶](#unknownhandler-objects "Link to this heading")

UnknownHandler.unknown\_open()[¶](#urllib.request.UnknownHandler.unknown_open "Link to this definition")

触发 [`URLError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.URLError "urllib.error.URLError") 异常。

## HTTPErrorProcessor 对象[¶](#httperrorprocessor-objects "Link to this heading")

HTTPErrorProcessor.http\_response(_request_, _response_)[¶](#urllib.request.HTTPErrorProcessor.http_response "Link to this definition")

处理出错的 HTTP 响应。

对于 200 错误码，响应对象会立即返回。

对于除 200 以外的错误代码，会仅通过 [`OpenerDirector.error()`](#urllib.request.OpenerDirector.error "urllib.request.OpenerDirector.error") 将任务传给 `http_error_<type>()` 处理器方法。 最终，如果没有其他处理器来处理该错误则 [`HTTPDefaultErrorHandler`](#urllib.request.HTTPDefaultErrorHandler "urllib.request.HTTPDefaultErrorHandler") 将引发 [`HTTPError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.HTTPError "urllib.error.HTTPError")。

HTTPErrorProcessor.https\_response(_request_, _response_)[¶](#urllib.request.HTTPErrorProcessor.https_response "Link to this definition")

HTTPS 出错响应的处理。

与 [`http_response()`](#urllib.request.HTTPErrorProcessor.http_response "urllib.request.HTTPErrorProcessor.http_response") 方法相同。

## 例子[¶](#examples "Link to this heading")

[如何利用 urllib 包获取网络资源](https://docs.python.org/zh-cn/3/howto/urllib2.html#urllib-howto) 中给出了更多的示例。

以下示例将抓取 python.org 主页并显示前 300 个字节的内容:

\>>> import urllib.request
\>>> with urllib.request.urlopen('https://www.python.org/') as f:
...     \# 响应可能被压缩 (例如使用 'gzip')。
...     print(f.headers.get('Content-Encoding'))
...     data \= f.read()
...     if f.headers.get('Content-Encoding') \== 'gzip':
...         import gzip
...         data \= gzip.decompress(data)
...     print(data\[:300\].decode('utf-8', errors\='replace'))

请注意，urlopen 将返回字节对象。这是因为 urlopen 无法自动确定由 HTTP 服务器收到的字节流的编码。通常，只要能确定或猜出编码格式，就应将返回的字节对象解码为字符串。

以下 HTML 规范文档 [https://html.spec.whatwg.org/#charset](https://html.spec.whatwg.org/#charset) 列出了 HTML 或 XML 文档可用来指明其编码格式信息的多种方式。

要了解更多信息，请参阅 W3C 文档: [https://www.w3.org/International/questions/qa-html-encoding-declarations](https://www.w3.org/International/questions/qa-html-encoding-declarations).

由于 python.org 网站如 meta 标记所指明的那样是使用 _utf-8_ 编码格式，我们将用它来解码字节串对象:

\>>> with urllib.request.urlopen('https://www.python.org/') as f:
...     \# Check for compression and decode appropriately.
...     enc \= f.headers.get('Content-Encoding')
...     data \= f.read()
...     if enc \== 'gzip':
...         import gzip
...         data \= gzip.decompress(data)
...     print(data\[:100\].decode('utf-8', errors\='replace'))
...

不使用 [context manager](https://docs.python.org/zh-cn/3/glossary.html#term-context-manager) 方式也可以获得同样的结果:

\>>> import urllib.request
\>>> f \= urllib.request.urlopen('https://www.python.org/')
\>>> try:
...     enc \= f.headers.get('Content-Encoding')
...     data \= f.read()
...     if enc \== 'gzip':
...         import gzip
...         data \= gzip.decompress(data)
...     print(data\[:100\].decode('utf-8', errors\='replace'))
... finally:
...     f.close()

以下示例将会把数据流发送给某 CGI 的 stdin，并读取返回数据。请注意，该示例只能工作于 Python 装有 SSL 支持的环境。

\>>> import urllib.request
\>>> req \= urllib.request.Request(url\='https://localhost/cgi-bin/test.cgi',
...                       data\=b'This data is passed to stdin of the CGI')
\>>> with urllib.request.urlopen(req) as f:
...     print(f.read().decode('utf-8'))
...
Got Data: "This data is passed to stdin of the CGI"

上述示例中的 CGI 代码如下所示：

#!/usr/bin/env python
import sys
data \= sys.stdin.read()
print('Content-type: text/plain\\n\\nGot Data: "%s"' % data)

下面是利用 [`Request`](#urllib.request.Request "urllib.request.Request") 发送 `PUT` 请求的示例：

import urllib.request
DATA \= b'some data'
req \= urllib.request.Request(url\='http://localhost:8080', data\=DATA, method\='PUT')
with urllib.request.urlopen(req) as f:
    pass
print(f.status)
print(f.reason)

基本 HTTP 认证示例：

import urllib.request
\# 创建一个带有 Basic HTTP Authentication 支持的 OpenerDirector...
auth\_handler \= urllib.request.HTTPBasicAuthHandler()
auth\_handler.add\_password(realm\='PDQ Application',
                          uri\='https://mahler:8092/site-updates.py',
                          user\='klem',
                          passwd\='kadidd!ehopper')
opener \= urllib.request.build\_opener(auth\_handler)
\# ...并全局安装以便其能配合 urlopen 使用。
urllib.request.install\_opener(opener)
with urllib.request.urlopen('http://www.example.com/login.html') as f:
    print(f.read().decode('utf-8'))

[`build_opener()`](#urllib.request.build_opener "urllib.request.build_opener") 默认提供了许多处理器，包括 [`ProxyHandler`](#urllib.request.ProxyHandler "urllib.request.ProxyHandler")。 在默认情况下，`ProxyHandler` 会使用名为 `<scheme>_proxy` 的环境变量，其中 `<scheme>` 是对应的 URL 方案。 例如，读取 `http_proxy` 环境变量可获得 HTTP 代理的 URL。

这个示例将默认的 [`ProxyHandler`](#urllib.request.ProxyHandler "urllib.request.ProxyHandler") 替换为使用以编程方式提供的代理 URL，并通过 [`ProxyBasicAuthHandler`](#urllib.request.ProxyBasicAuthHandler "urllib.request.ProxyBasicAuthHandler") 添加代理认证支持。

proxy\_handler \= urllib.request.ProxyHandler({'http': 'http://www.example.com:3128/'})
proxy\_auth\_handler \= urllib.request.ProxyBasicAuthHandler()
proxy\_auth\_handler.add\_password('realm', 'host', 'username', 'password')

opener \= urllib.request.build\_opener(proxy\_handler, proxy\_auth\_handler)
\# 这次，我们不安装 OpenerDirector，而是直接使用它：
with opener.open('http://www.example.com/login.html') as f:
   print(f.read().decode('utf-8'))

添加 HTTP 头部信息：

可利用 [`Request`](#urllib.request.Request "urllib.request.Request") 构造函数的 _headers_ 参数，或者是：

import urllib.request
req \= urllib.request.Request('http://www.example.com/')
req.add\_header('Referer', 'https://www.python.org/')
\# Customize the default User-Agent header value:
req.add\_header('User-Agent', 'urllib-example/0.1 (Contact: . . .)')
with urllib.request.urlopen(req) as f:
    print(f.read().decode('utf-8'))

[`OpenerDirector`](#urllib.request.OpenerDirector "urllib.request.OpenerDirector") 自动会在每个 [`Request`](#urllib.request.Request "urllib.request.Request") 中加入一项 头部信息。若要修改，请参见以下语句：

import urllib.request
opener \= urllib.request.build\_opener()
opener.addheaders \= \[('User-agent', 'Mozilla/5.0')\]
with opener.open('http://www.example.com/') as f:
   print(f.read().decode('utf-8'))

另请记得，当 [`Request`](#urllib.request.Request "urllib.request.Request") 传给 [`urlopen()`](#urllib.request.urlopen "urllib.request.urlopen") (或 [`OpenerDirector.open()`](#urllib.request.OpenerDirector.open "urllib.request.OpenerDirector.open")) 时，会加入一些标准的头部信息 ( 、 和 )。

以下会话示例用 `GET` 方法读取包含参数的 URL。

\>>> import urllib.request
\>>> import urllib.parse
\>>> params \= urllib.parse.urlencode({'spam': 1, 'eggs': 2, 'bacon': 0})
\>>> url \= "https://www.python.org/?%s" % params
\>>> with urllib.request.urlopen(url) as f:
...     print(f.read().decode('utf-8'))
...

以下示例换用 `POST` 方法。请注意 urlencode 输出结果先被编码为字节串 data，再送入 urlopen。

\>>> import urllib.request
\>>> import urllib.parse
\>>> data \= urllib.parse.urlencode({'spam': 1, 'eggs': 2, 'bacon': 0})
\>>> data \= data.encode('ascii')
\>>> with urllib.request.urlopen("https://httpbin.org/post", data) as f:
...     print(f.read().decode('utf-8'))
...

以下示例显式指定了 HTTP 代理，以覆盖环境变量中的设置：

\>>> import urllib.request
\>>> proxies \= {'http': 'http://proxy.example.com:8080/'}
\>>> opener \= urllib.request.build\_opener(urllib.request.ProxyHandler(proxies))
\>>> with opener.open("https://www.python.org") as f:
...     f.read().decode('utf-8')
...

以下示例根本不用代理，也覆盖了环境变量中的设置：

\>>> import urllib.request
\>>> opener \= urllib.request.build\_opener(urllib.request.ProxyHandler({}))
\>>> with opener.open("https://www.python.org/") as f:
...     f.read().decode('utf-8')
...

## 已停用的接口[¶](#legacy-interface "Link to this heading")

以下函数和类是由 Python 2 模块 `urllib` （相对早于 `urllib2` ）移植过来的。将来某个时候可能会停用。

urllib.request.urlretrieve(_url_, _filename\=None_, _reporthook\=None_, _data\=None_)[¶](#urllib.request.urlretrieve "Link to this definition")

将一个 URL 形式的网络对象复制为本地文件。 如果 URL 指向一个本地文件，则必须提供文件名才会复制对象。 返回一个元组 `(filename, headers)` 其中 _filename_ 为保存该对象的本地文件名，而 _headers_ 是由 [`urlopen()`](#urllib.request.urlopen "urllib.request.urlopen") 返回的对象的 `info()` 方法的返回结果（对于远程对象）。 可引发的异常与 `urlopen()` 的相同。

第二个参数指定文件的保存位置（若未给出，则会是名称随机生成的临时文件）。第三个参数是个可调用对象，在建立网络连接时将会调用一次，之后每次读完数据块后会调用一次。该可调用对象将会传入 3 个参数：已传输的块数、块的大小（以字节为单位）和文件总的大小。如果面对的是老旧 FTP 服务器，文件大小参数可能会是 `-1` ，这些服务器响应读取请求时不会返回文件大小。

以下例子演示了大部分常用场景：

\>>> import urllib.request
\>>> local\_filename, headers \= urllib.request.urlretrieve('https://python.org/')
\>>> html \= open(local\_filename)
\>>> html.close()

如果 _url_ 使用 `http:` 方式的标识符，则可能给出可选的 _data_ 参数来指定一个 `POST` 请求 (通常的请求类型为 `GET`)。 _data_ 参数必须是标准 _application/x-www-form-urlencoded_ 格式的字节串对象；参见 [`urllib.parse.urlencode()`](https://docs.python.org/zh-cn/3/library/urllib.parse.html#urllib.parse.urlencode "urllib.parse.urlencode") 函数。

[`urlretrieve()`](#urllib.request.urlretrieve "urllib.request.urlretrieve") 在检测到可用数据少于预期大小（即由 _Content-Length_ 标头所报告的大小）时将引发 [`ContentTooShortError`](https://docs.python.org/zh-cn/3/library/urllib.error.html#urllib.error.ContentTooShortError "urllib.error.ContentTooShortError")。 例如，这可能会在下载被中断时发生。

_Content-Length_ 会被视为大小的下限：如果存在更多的可用数据，urlretrieve 会读取更多的数据，但是如果可用数据少于该值，则会引发异常。

在此情况下你仍然能够获取已下载的数据，它将保存在异常实例的 `content` 属性中。

如果未提供 _Content-Length_ 标头，urlretrieve 就无法检查它所下载的数据大小，只是简单地返回它。 在这种情况下你只能假定下载是成功的。

urllib.request.urlcleanup()[¶](#urllib.request.urlcleanup "Link to this definition")

Cleans up temporary files that may have been left behind by previous calls to [`urlretrieve()`](#urllib.request.urlretrieve "urllib.request.urlretrieve"). It also resets the default global opener installed by [`install_opener()`](#urllib.request.install_opener "urllib.request.install_opener").

## `urllib.request` 的限制[¶](#urllib-request-restrictions "Link to this heading")

-   目前，仅支持下列协议: HTTP (0.9 和 1.0 版), FTP, 本地文件, 以及数据 URL。
    
    在 3.4 版本发生变更: 增加了对数据URL 的支持。
    
-   [`urlretrieve()`](#urllib.request.urlretrieve "urllib.request.urlretrieve") 的缓存特性已被禁用，等待有人有时间去正确地解决过期时间标头的处理问题。
    
-   应当有一个函数来查询特定 URL 是否在缓存中。
    
-   为了保持向下兼容性，如果某个 URL 看起来是指向本地文件但该文件无法被打开，则该 URL 会使用 FTP 协议来重新解读。 这有时可能会导致令人迷惑的错误消息。
    
-   [`urlopen()`](#urllib.request.urlopen "urllib.request.urlopen") 和 [`urlretrieve()`](#urllib.request.urlretrieve "urllib.request.urlretrieve") 函数在等待网络连接建立时会导致任意长时间的延迟。 这意味着在不使用线程的情况下搭建一个可交互的 Web 客户端是非常困难的。
    
-   由 [`urlopen()`](#urllib.request.urlopen "urllib.request.urlopen") 或 [`urlretrieve()`](#urllib.request.urlretrieve "urllib.request.urlretrieve") 返回的数据就是服务器所返回的原始数据。 这可以是二进制数据（如图片）、纯文本或 HTML 代码等。 HTTP 协议在响应标头中提供了类型信息，这可以通过读取 标头来查看。 如果返回的数据是 HTML，你可以使用 [`html.parser`](https://docs.python.org/zh-cn/3/library/html.parser.html#module-html.parser "html.parser: A simple parser that can handle HTML and XHTML.") 模块来解析它。
    
-   处理 FTP 协议的代码无法区分文件和目录。 这在尝试读取指向不可访问的 URL 时可能导致意外的行为。 如果 URL 以一个 `/` 结束，它会被认为指向一个目录并将作相应的处理。 但是如果读取一个文件的尝试导致了 550 错误（表示 URL 无法找到或不可访问，这常常是由于权限原因），则该路径会被视为一个目录以便处理 URL 是指定一个目录但略去了末尾 `/` 的情况。 这在你尝试获取一个因其设置了读取权限因而无法访问的文件时会造成误导性的结果；FTP 代码将尝试读取它，因 550 错误而失败，然后又为这个不可读取的文件执行目录列表操作。 如果需要细粒度的控制，请考虑使用 [`ftplib`](https://docs.python.org/zh-cn/3/library/ftplib.html#module-ftplib "ftplib: FTP protocol client (requires sockets).") 模块。
    

## `urllib.response` --- urllib 使用的响应类[¶](#module-urllib.response "Link to this heading")

`urllib.response` 模块定义了具有最小文件型接口 (包括 `read()` 和 `readline()`) 的函数和类。 该模块中定义的函数在 `urllib.request` 模块内部使用。 典型的响应对象是一个 [`urllib.response.addinfourl`](#urllib.response.addinfourl "urllib.response.addinfourl") 实例：

_class_ urllib.response.addinfourl[¶](#urllib.response.addinfourl "Link to this definition")

url[¶](#urllib.response.addinfourl.url "Link to this definition")

已读取资源的 URL，通常用于确定是否进行了重定向。

以 [`EmailMessage`](https://docs.python.org/zh-cn/3/library/email.message.html#email.message.EmailMessage "email.message.EmailMessage") 实例的形式返回响应的标头。

status[¶](#urllib.response.addinfourl.status "Link to this definition")

Added in version 3.9.

由服务器返回的状态码。

geturl()[¶](#urllib.response.addinfourl.geturl "Link to this definition")

自 3.9 版本弃用: 已弃用，建议改用 [`url`](#urllib.response.addinfourl.url "urllib.response.addinfourl.url")。

info()[¶](#urllib.response.addinfourl.info "Link to this definition")

自 3.9 版本弃用: 已弃用，建议改用 [`headers`](#urllib.response.addinfourl.headers "urllib.response.addinfourl.headers")。

code[¶](#urllib.response.addinfourl.code "Link to this definition")

自 3.9 版本弃用: 已弃用，建议改用 [`status`](#urllib.response.addinfourl.status "urllib.response.addinfourl.status")。

getcode()[¶](#urllib.response.addinfourl.getcode "Link to this definition")

自 3.9 版本弃用: 已弃用，建议改用 [`status`](#urllib.response.addinfourl.status "urllib.response.addinfourl.status")。
