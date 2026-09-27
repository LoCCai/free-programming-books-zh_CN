**源代码：** [Lib/http/cookiejar.py](https://github.com/python/cpython/tree/3.14/Lib/http/cookiejar.py)

* * *

`http.cookiejar` 模块定义了用于自动处理 HTTP cookies 的类。 这适用于访问网站所需的小段数据 -- _cookies_ -- 它们由 Web 服务器的 HTTP 响应在客户端计算机上设置，并在随后的 HTTP 请求中返回给服务器。

Both the regular Netscape cookie protocol and the protocol defined by [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) are handled. RFC 2965 handling is switched off by default. [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html) cookies are parsed as Netscape cookies and subsequently treated either as Netscape or RFC 2965 cookies according to the 'policy' in effect. Note that the great majority of cookies on the internet are Netscape cookies. `http.cookiejar` attempts to follow the de-facto Netscape cookie protocol (which differs substantially from that set out in the original Netscape specification), including taking note of the `max-age` and `port` cookie-attributes introduced with RFC 2965.

备注

The various named parameters found in and headers (for example, `domain` and `expires`) are conventionally referred to as _attributes_. To distinguish them from Python attributes, the documentation for this module uses the term _cookie-attribute_ instead.

此模块定义了以下异常：

_exception_ http.cookiejar.LoadError[¶](#http.cookiejar.LoadError "Link to this definition")

[`FileCookieJar`](#http.cookiejar.FileCookieJar "http.cookiejar.FileCookieJar") 实例在从文件加载 cookies 出错时抛出这个异常。 [`LoadError`](#http.cookiejar.LoadError "http.cookiejar.LoadError") 是 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 的一个子类。

提供了以下类：

_class_ http.cookiejar.CookieJar(_policy\=None_)[¶](#http.cookiejar.CookieJar "Link to this definition")

_policy_ 是实现了 [`CookiePolicy`](#http.cookiejar.CookiePolicy "http.cookiejar.CookiePolicy") 接口的一个对象。

[`CookieJar`](#http.cookiejar.CookieJar "http.cookiejar.CookieJar") 类储存 HTTP cookies。它从 HTTP 请求提取 cookies，并在 HTTP 响应中返回它们。 `CookieJar` 实例在必要时自动处理包含 cookie 的到期情况。子类还负责储存和从文件或数据库中查找 cookies。

_class_ http.cookiejar.FileCookieJar(_filename\=None_, _delayload\=None_, _policy\=None_)[¶](#http.cookiejar.FileCookieJar "Link to this definition")

_policy_ 是实现了 [`CookiePolicy`](#http.cookiejar.CookiePolicy "http.cookiejar.CookiePolicy") 接口的一个对象。对于其他参数，参考相应属性的文档。

一个可以从硬盘中文件加载或保存 cookie 的 [`CookieJar`](#http.cookiejar.CookieJar "http.cookiejar.CookieJar")。Cookies **不** 会在 [`load()`](#http.cookiejar.FileCookieJar.load "http.cookiejar.FileCookieJar.load") 或 [`revert()`](#http.cookiejar.FileCookieJar.revert "http.cookiejar.FileCookieJar.revert") 方法调用前从命名的文件中加载。子类的文档位于段落 [FileCookieJar 的子类及其与 Web 浏览器的协同](#file-cookie-jar-classes)。

此类不应被直接初始化 —— 请改用它的下列子类。

_class_ http.cookiejar.CookiePolicy[¶](#http.cookiejar.CookiePolicy "Link to this definition")

此类负责确定是否应从服务器接受每个 cookie 或将其返回给服务器。

_class_ http.cookiejar.DefaultCookiePolicy(_blocked\_domains\=None_, _allowed\_domains\=None_, _netscape\=True_, _rfc2965\=False_, _rfc2109\_as\_netscape\=None_, _hide\_cookie2\=False_, _strict\_domain\=False_, _strict\_rfc2965\_unverifiable\=True_, _strict\_ns\_unverifiable\=False_, _strict\_ns\_domain\=DefaultCookiePolicy.DomainLiberal_, _strict\_ns\_set\_initial\_dollar\=False_, _strict\_ns\_set\_path\=False_, _secure\_protocols\=('https', 'wss')_)[¶](#http.cookiejar.DefaultCookiePolicy "Link to this definition")

Constructor arguments should be passed as keyword arguments only. _blocked\_domains_ is a sequence of domain names that we never accept cookies from, nor return cookies to. _allowed\_domains_ if not `None`, this is a sequence of the only domains for which we accept and return cookies. _secure\_protocols_ is a sequence of protocols for which secure cookies can be added to. By default _https_ and _wss_ (secure websocket) are considered secure protocols. For all other arguments, see the documentation for [`CookiePolicy`](#http.cookiejar.CookiePolicy "http.cookiejar.CookiePolicy") and `DefaultCookiePolicy` objects.

`DefaultCookiePolicy` implements the standard accept / reject rules for Netscape and [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) cookies. By default, [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html) cookies (that is, cookies received in a header with a version cookie-attribute of 1) are treated according to the RFC 2965 rules. However, if RFC 2965 handling is turned off or [`rfc2109_as_netscape`](#http.cookiejar.DefaultCookiePolicy.rfc2109_as_netscape "http.cookiejar.DefaultCookiePolicy.rfc2109_as_netscape") is `True`, RFC 2109 cookies are 'downgraded' by the [`CookieJar`](#http.cookiejar.CookieJar "http.cookiejar.CookieJar") instance to Netscape cookies, by setting the [`version`](#http.cookiejar.Cookie.version "http.cookiejar.Cookie.version") attribute of the [`Cookie`](#http.cookiejar.Cookie "http.cookiejar.Cookie") instance to 0. `DefaultCookiePolicy` also provides some parameters to allow some fine-tuning of policy.

_class_ http.cookiejar.Cookie[¶](#http.cookiejar.Cookie "Link to this definition")

This class represents Netscape, [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html) and [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) cookies. It is not expected that users of `http.cookiejar` construct their own `Cookie` instances. Instead, if necessary, call [`make_cookies()`](#http.cookiejar.CookieJar.make_cookies "http.cookiejar.CookieJar.make_cookies") on a [`CookieJar`](#http.cookiejar.CookieJar "http.cookiejar.CookieJar") instance.

## CookieJar 和 FileCookieJar 对象[¶](#cookiejar-and-filecookiejar-objects "Link to this heading")

[`CookieJar`](#http.cookiejar.CookieJar "http.cookiejar.CookieJar") 对象支持 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator) 协议，用于迭代包含的 [`Cookie`](#http.cookiejar.Cookie "http.cookiejar.Cookie") 对象。

[`CookieJar`](#http.cookiejar.CookieJar "http.cookiejar.CookieJar") 有以下方法：

在 _request_ 中添加正确的 头。

If policy allows (that is, the [`rfc2965`](#http.cookiejar.CookiePolicy.rfc2965 "http.cookiejar.CookiePolicy.rfc2965") and [`hide_cookie2`](#http.cookiejar.CookiePolicy.hide_cookie2 "http.cookiejar.CookiePolicy.hide_cookie2") attributes of the [`CookieJar`](#http.cookiejar.CookieJar "http.cookiejar.CookieJar")'s [`CookiePolicy`](#http.cookiejar.CookiePolicy "http.cookiejar.CookiePolicy") instance are true and false respectively), the header is also added when appropriate.

The _request_ object (usually a [`urllib.request.Request`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request "urllib.request.Request") instance) must support the methods [`get_full_url()`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.get_full_url "urllib.request.Request.get_full_url"), [`has_header()`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.has_header "urllib.request.Request.has_header"), [`get_header()`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.get_header "urllib.request.Request.get_header"), [`header_items()`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.header_items "urllib.request.Request.header_items"), [`add_unredirected_header()`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.add_unredirected_header "urllib.request.Request.add_unredirected_header") and the attributes [`host`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.host "urllib.request.Request.host"), [`type`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.type "urllib.request.Request.type"), [`unverifiable`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.unverifiable "urllib.request.Request.unverifiable") and [`origin_req_host`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.origin_req_host "urllib.request.Request.origin_req_host") as documented by [`urllib.request`](https://docs.python.org/zh-cn/3/library/urllib.request.html#module-urllib.request "urllib.request: Extensible library for opening URLs.").

在 3.3 版本发生变更: _request_ object needs [`origin_req_host`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.origin_req_host "urllib.request.Request.origin_req_host") attribute. Dependency on a deprecated method `get_origin_req_host()` has been removed.

从 HTTP _response_ 中提取 cookie，并在策略允许的情况下，将它们存储在 [`CookieJar`](#http.cookiejar.CookieJar "http.cookiejar.CookieJar") 中。

[`CookieJar`](#http.cookiejar.CookieJar "http.cookiejar.CookieJar") 将在 _response_ 参数中寻找允许的 和 头信息，并适当地存储 cookies（须经 [`CookiePolicy.set_ok()`](#http.cookiejar.CookiePolicy.set_ok "http.cookiejar.CookiePolicy.set_ok") 方法批准）。

The _response_ object (usually the result of a call to [`urllib.request.urlopen()`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.urlopen "urllib.request.urlopen"), or similar) should support an [`info()`](https://docs.python.org/zh-cn/3/library/http.client.html#http.client.HTTPResponse.info "http.client.HTTPResponse.info") method, which returns an [`email.message.Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") instance.

The _request_ object (usually a [`urllib.request.Request`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request "urllib.request.Request") instance) must support the method [`get_full_url()`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.get_full_url "urllib.request.Request.get_full_url") and the attributes [`host`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.host "urllib.request.Request.host"), [`unverifiable`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.unverifiable "urllib.request.Request.unverifiable") and [`origin_req_host`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.origin_req_host "urllib.request.Request.origin_req_host"), as documented by [`urllib.request`](https://docs.python.org/zh-cn/3/library/urllib.request.html#module-urllib.request "urllib.request: Extensible library for opening URLs."). The request is used to set default values for cookie-attributes as well as for checking that the cookie is allowed to be set.

在 3.3 版本发生变更: _request_ object needs [`origin_req_host`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.Request.origin_req_host "urllib.request.Request.origin_req_host") attribute. Dependency on a deprecated method `get_origin_req_host()` has been removed.

CookieJar.set\_policy(_policy_)[¶](#http.cookiejar.CookieJar.set_policy "Link to this definition")

设置要使用的 [`CookiePolicy`](#http.cookiejar.CookiePolicy "http.cookiejar.CookiePolicy") 实例。

CookieJar.make\_cookies(_response_, _request_)[¶](#http.cookiejar.CookieJar.make_cookies "Link to this definition")

返回从 _response_ 对象中提取的 [`Cookie`](#http.cookiejar.Cookie "http.cookiejar.Cookie") 对象的序列。

关于 _response_ 和 _request_ 参数所需的接口，请参见 [`extract_cookies()`](#http.cookiejar.CookieJar.extract_cookies "http.cookiejar.CookieJar.extract_cookies") 的文档。

CookieJar.set\_cookie\_if\_ok(_cookie_, _request_)[¶](#http.cookiejar.CookieJar.set_cookie_if_ok "Link to this definition")

如果策略规定可以这样做，就设置一个 [`Cookie`](#http.cookiejar.Cookie "http.cookiejar.Cookie")。

CookieJar.set\_cookie(_cookie_)[¶](#http.cookiejar.CookieJar.set_cookie "Link to this definition")

设置一个 [`Cookie`](#http.cookiejar.Cookie "http.cookiejar.Cookie")，不检查策略来确认该 cookie 是否应当被设置。

CookieJar.clear(\[_domain_\[, _path_\[, _name_\]\]\])[¶](#http.cookiejar.CookieJar.clear "Link to this definition")

清除一些 cookie。

如果调用时没有参数，则清除所有的 cookie。如果给定一个参数，只有属于该 _domain_ 的 cookies 将被删除。如果给定两个参数，那么属于指定的 _domain_ 和 URL _path_ 的 cookie 将被删除。 如果给定三个参数，那么属于指定的 _domain_ 、_path_ 和 _name_ 的 cookie 将被删除

如果不存在匹配的 cookie，则会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError")。

CookieJar.clear\_session\_cookies()[¶](#http.cookiejar.CookieJar.clear_session_cookies "Link to this definition")

丢弃所有的会话 cookie。

Discards all contained cookies that have a true [`discard`](#http.cookiejar.Cookie.discard "http.cookiejar.Cookie.discard") attribute (usually because they had either no `max-age` or `expires` cookie-attribute, or an explicit `discard` cookie-attribute). For interactive browsers, the end of a session usually corresponds to closing the browser window.

Note that the [`save()`](#http.cookiejar.FileCookieJar.save "http.cookiejar.FileCookieJar.save") method won't save session cookies anyway, unless you ask otherwise by passing a true _ignore\_discard_ argument.

[`FileCookieJar`](#http.cookiejar.FileCookieJar "http.cookiejar.FileCookieJar") 实现了下列附加方法：

FileCookieJar.save(_filename\=None_, _ignore\_discard\=False_, _ignore\_expires\=False_)[¶](#http.cookiejar.FileCookieJar.save "Link to this definition")

将 cookie 保存到文件。

基类会引发 [`NotImplementedError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#NotImplementedError "NotImplementedError")。子类可以继续不实现该方法。

_filename_ is the name of file in which to save cookies. If _filename_ is not specified, [`self.filename`](#http.cookiejar.FileCookieJar.filename "http.cookiejar.FileCookieJar.filename") is used (whose default is the value passed to the constructor, if any); if `self.filename` is `None`, [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") is raised.

_ignore\_discard_: 即使设定了丢弃 cookie 仍然保存它们。 _ignore\_expires_: 即使 cookie 已超期仍然保存它们

文件如果已存在则会被覆盖，这将清除其所包含的全部 cookie。已保存的 cookie 可以使用 [`load()`](#http.cookiejar.FileCookieJar.load "http.cookiejar.FileCookieJar.load") 或 [`revert()`](#http.cookiejar.FileCookieJar.revert "http.cookiejar.FileCookieJar.revert") 方法来恢复。

FileCookieJar.load(_filename\=None_, _ignore\_discard\=False_, _ignore\_expires\=False_)[¶](#http.cookiejar.FileCookieJar.load "Link to this definition")

从文件加载 cookie。

旧的 cookie 将被保留，除非是被新加载的 cookie 所覆盖。

其参数与 [`save()`](#http.cookiejar.FileCookieJar.save "http.cookiejar.FileCookieJar.save") 的相同。

指定的文件必须为该类所能理解的格式，否则将引发 [`LoadError`](#http.cookiejar.LoadError "http.cookiejar.LoadError")。也可能会引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError")，例如当文件不存在的时候。

FileCookieJar.revert(_filename\=None_, _ignore\_discard\=False_, _ignore\_expires\=False_)[¶](#http.cookiejar.FileCookieJar.revert "Link to this definition")

清除所有 cookie 并从保存的文件重新加载 cookie。

[`revert()`](#http.cookiejar.FileCookieJar.revert "http.cookiejar.FileCookieJar.revert") 可以引发与 [`load()`](#http.cookiejar.FileCookieJar.load "http.cookiejar.FileCookieJar.load") 相同的异常。如果执行失败，对象的状态将不会被改变。

[`FileCookieJar`](#http.cookiejar.FileCookieJar "http.cookiejar.FileCookieJar") 实例具有下列公有属性：

FileCookieJar.filename[¶](#http.cookiejar.FileCookieJar.filename "Link to this definition")

默认的保存 cookie 的文件的文件名。该属性可以被赋值。

FileCookieJar.delayload[¶](#http.cookiejar.FileCookieJar.delayload "Link to this definition")

如为真值，则惰性地从磁盘加载 cookie。该属性不应当被赋值。这只是一个提示，因为它只会影响性能，而不会影响行为（除非磁盘中的 cookie 被改变了）。 [`CookieJar`](#http.cookiejar.CookieJar "http.cookiejar.CookieJar") 对象可能会忽略它。任何包括在标准库中的 [`FileCookieJar`](#http.cookiejar.FileCookieJar "http.cookiejar.FileCookieJar") 类都不会惰性地加载 cookie。

## FileCookieJar 的子类及其与 Web 浏览器的协同[¶](#filecookiejar-subclasses-and-co-operation-with-web-browsers "Link to this heading")

提供了以下 [`CookieJar`](#http.cookiejar.CookieJar "http.cookiejar.CookieJar") 子类用于读取和写入。

_class_ http.cookiejar.MozillaCookieJar(_filename\=None_, _delayload\=None_, _policy\=None_)[¶](#http.cookiejar.MozillaCookieJar "Link to this definition")

一个能够以 Mozilla `cookies.txt` 文件格式（该格式也被 curl 和 Lynx 以及 Netscape 浏览器所使用）从硬盘加载和存储 cookie 的 [`FileCookieJar`](#http.cookiejar.FileCookieJar "http.cookiejar.FileCookieJar")。

备注

这会丢失有关 [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) cookie 的信息，以及有关较新或非标准的 cookie 属性例如 `port`。

警告

在存储之前备份你的 cookie，如果你的 cookie 丢失/损坏会造成麻烦的话（有一些微妙的因素可能导致文件在加载/保存的往返过程中发生细微的变化）。

还要注意在 Mozilla 运行期间保存的 cookie 将可能被 Mozilla 清除。

_class_ http.cookiejar.LWPCookieJar(_filename\=None_, _delayload\=None_, _policy\=None_)[¶](#http.cookiejar.LWPCookieJar "Link to this definition")

一个能够以 libwww-perl 库的 `Set-Cookie3` 文件格式从磁盘加载和存储 cookie 的 [`FileCookieJar`](#http.cookiejar.FileCookieJar "http.cookiejar.FileCookieJar")。这适用于当你想以人类可读的文件来保存 cookie 的情况。

## CookiePolicy 对象[¶](#cookiepolicy-objects "Link to this heading")

实现了 [`CookiePolicy`](#http.cookiejar.CookiePolicy "http.cookiejar.CookiePolicy") 接口的对象具有下列方法：

CookiePolicy.set\_ok(_cookie_, _request_)[¶](#http.cookiejar.CookiePolicy.set_ok "Link to this definition")

返回指明是否应当从服务器接受 cookie 的布尔值。

_cookie_ 是一个 [`Cookie`](#http.cookiejar.Cookie "http.cookiejar.Cookie") 实例。 _request_ 是一个实现了由 [`CookieJar.extract_cookies()`](#http.cookiejar.CookieJar.extract_cookies "http.cookiejar.CookieJar.extract_cookies") 的文档所定义的接口的对象。

CookiePolicy.return\_ok(_cookie_, _request_)[¶](#http.cookiejar.CookiePolicy.return_ok "Link to this definition")

返回指明是否应当将 cookie 返回给服务器的布尔值。

_cookie_ 是一个 [`Cookie`](#http.cookiejar.Cookie "http.cookiejar.Cookie") 实例。 _request_ 是一个实现了 [`CookieJar.add_cookie_header()`](#http.cookiejar.CookieJar.add_cookie_header "http.cookiejar.CookieJar.add_cookie_header") 的文档所定义的接口的对象。

CookiePolicy.domain\_return\_ok(_domain_, _request_)[¶](#http.cookiejar.CookiePolicy.domain_return_ok "Link to this definition")

对于给定的 cookie 域如果不应当返回 cookie 则返回 `False`。

此方法是一种优化操作。它消除了检查每个具有特定域的 cookie 的必要性（这可能会涉及读取许多文件）。从 [`domain_return_ok()`](#http.cookiejar.CookiePolicy.domain_return_ok "http.cookiejar.CookiePolicy.domain_return_ok") 和 [`path_return_ok()`](#http.cookiejar.CookiePolicy.path_return_ok "http.cookiejar.CookiePolicy.path_return_ok") 返回真值并将所有工作留给 [`return_ok()`](#http.cookiejar.CookiePolicy.return_ok "http.cookiejar.CookiePolicy.return_ok").

如果 [`domain_return_ok()`](#http.cookiejar.CookiePolicy.domain_return_ok "http.cookiejar.CookiePolicy.domain_return_ok") 为 cookie 域返回真值，则会为 cookie 路径调用 [`path_return_ok()`](#http.cookiejar.CookiePolicy.path_return_ok "http.cookiejar.CookiePolicy.path_return_ok")。在其他情况下，则不会为该 cookie 域调用 `path_return_ok()` 和 [`return_ok()`](#http.cookiejar.CookiePolicy.return_ok "http.cookiejar.CookiePolicy.return_ok")。如果 `path_return_ok()` 返回真值，则会调用 `return_ok()` 并附带 [`Cookie`](#http.cookiejar.Cookie "http.cookiejar.Cookie") 对象本身以进行全面检查。在其他情况下，都永远不会为该 cookie 路径调用 `return_ok()`。

请注意 [`domain_return_ok()`](#http.cookiejar.CookiePolicy.domain_return_ok "http.cookiejar.CookiePolicy.domain_return_ok") 会针对每个 _cookie_ 域被调用，而非只针对 _request_ 域。 例如，该函数会针对 `".example.com"` 和 `"www.example.com"` 被调用，如果 request 域为 `"www.example.com"` 的话。 对于 [`path_return_ok()`](#http.cookiejar.CookiePolicy.path_return_ok "http.cookiejar.CookiePolicy.path_return_ok") 也是如此。

_request_ 参数与 [`return_ok()`](#http.cookiejar.CookiePolicy.return_ok "http.cookiejar.CookiePolicy.return_ok") 的文档所说明的一致。

CookiePolicy.path\_return\_ok(_path_, _request_)[¶](#http.cookiejar.CookiePolicy.path_return_ok "Link to this definition")

对于给定的 cookie 路径如果不应当返回 cookie 则返回 `False`。

请参阅 [`domain_return_ok()`](#http.cookiejar.CookiePolicy.domain_return_ok "http.cookiejar.CookiePolicy.domain_return_ok") 的文档。

除了实现上述方法，[`CookiePolicy`](#http.cookiejar.CookiePolicy "http.cookiejar.CookiePolicy") 接口的实现还必须提供下列属性，指明应当使用哪种协议以及如何使用。 所有这些属性都可以被赋值。

CookiePolicy.netscape[¶](#http.cookiejar.CookiePolicy.netscape "Link to this definition")

实现 Netscape 协议。

CookiePolicy.rfc2965[¶](#http.cookiejar.CookiePolicy.rfc2965 "Link to this definition")

实现 [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) 协议。

CookiePolicy.hide\_cookie2[¶](#http.cookiejar.CookiePolicy.hide_cookie2 "Link to this definition")

不要向请求添加 标头（此标头是提示服务器请求方能识别 [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) cookie）。

定义 [`CookiePolicy`](#http.cookiejar.CookiePolicy "http.cookiejar.CookiePolicy") 类的最适用方式是通过子类化 [`DefaultCookiePolicy`](#http.cookiejar.DefaultCookiePolicy "http.cookiejar.DefaultCookiePolicy") 并重写部分或全部上述的方法。 `CookiePolicy` 本身可被用作 '空策略' 以允许设置和接收所有的 cookie（但这没有什么用处）。

## DefaultCookiePolicy 对象[¶](#defaultcookiepolicy-objects "Link to this heading")

实现接收和返回 cookie 的标准规则。

[**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) 和 Netscape cookie 均被涵盖。RFC 2965 处理默认关闭。

提供自定义策略的最容易方式是重写此类并在你重写的实现中添加你自己的额外检查之前调用其方法:

import http.cookiejar
class MyCookiePolicy(http.cookiejar.DefaultCookiePolicy):
    def set\_ok(self, cookie, request):
        if not http.cookiejar.DefaultCookiePolicy.set\_ok(self, cookie, request):
            return False
        if i\_dont\_want\_to\_store\_this\_cookie(cookie):
            return False
        return True

在实现 [`CookiePolicy`](#http.cookiejar.CookiePolicy "http.cookiejar.CookiePolicy") 接口所要求的特性之外，该类还允许你阻止和允许特定的域设置和接收 cookie。 还有一些严格性开关允许你将相当宽松的 Netscape 协议规则收紧一点（代价是可能会阻止某些无害的 cookie）。

A domain blocklist and allowlist is provided (both off by default). Only domains not in the blocklist and present in the allowlist (if the allowlist is active) participate in cookie setting and returning. Use the _blocked\_domains_ constructor argument, and [`blocked_domains()`](#http.cookiejar.DefaultCookiePolicy.blocked_domains "http.cookiejar.DefaultCookiePolicy.blocked_domains") and [`set_blocked_domains()`](#http.cookiejar.DefaultCookiePolicy.set_blocked_domains "http.cookiejar.DefaultCookiePolicy.set_blocked_domains") methods (and the corresponding argument and methods for _allowed\_domains_). If you set an allowlist, you can turn it off again by setting it to `None`.

阻止名单或允许名单中不以点号开头的域必须与要匹配的 cookie 域完全相等。 例如，`"example.com"` 将匹配阻止名单条目 `"example.com"`，但 `"www.example.com"` 则不匹配。 以点号开头的域也将与更明确的域相匹配。 例如，`"www.example.com"` 和 `"www.coyote.example.com"` 都将匹配 `".example.com"` (但 `"example.com"` 本身则不匹配)。 IP 地址则例外。 举例来说，如果 blocked\_domains 包含 `"192.168.1.2"` 和 `".168.1.2"`，则 192.168.1.2 会被阻止，但 193.168.1.2 不会被阻止。

[`DefaultCookiePolicy`](#http.cookiejar.DefaultCookiePolicy "http.cookiejar.DefaultCookiePolicy") 实现了下列附加方法：

DefaultCookiePolicy.blocked\_domains()[¶](#http.cookiejar.DefaultCookiePolicy.blocked_domains "Link to this definition")

返回被阻止域的序列（元组类型）。

DefaultCookiePolicy.set\_blocked\_domains(_blocked\_domains_)[¶](#http.cookiejar.DefaultCookiePolicy.set_blocked_domains "Link to this definition")

设置被阻止域的序列。

DefaultCookiePolicy.is\_blocked(_domain_)[¶](#http.cookiejar.DefaultCookiePolicy.is_blocked "Link to this definition")

如果 _domain_ 在设置或接受 cookie 的阻止列表中则返回 `True`。

DefaultCookiePolicy.allowed\_domains()[¶](#http.cookiejar.DefaultCookiePolicy.allowed_domains "Link to this definition")

返回 `None`，或者被允许域的序列（元组形式）。

DefaultCookiePolicy.set\_allowed\_domains(_allowed\_domains_)[¶](#http.cookiejar.DefaultCookiePolicy.set_allowed_domains "Link to this definition")

设置被允许域的序列，或者为 `None`。

DefaultCookiePolicy.is\_not\_allowed(_domain_)[¶](#http.cookiejar.DefaultCookiePolicy.is_not_allowed "Link to this definition")

如果 _domain_ 不在设置或接受 cookie 的允许列表中则返回 `True`。

[`DefaultCookiePolicy`](#http.cookiejar.DefaultCookiePolicy "http.cookiejar.DefaultCookiePolicy") 实例具有下列属性，它们都是基于同名的构造器参数来初始化的，并且都可以被赋值。

DefaultCookiePolicy.rfc2109\_as\_netscape[¶](#http.cookiejar.DefaultCookiePolicy.rfc2109_as_netscape "Link to this definition")

If true, request that the [`CookieJar`](#http.cookiejar.CookieJar "http.cookiejar.CookieJar") instance downgrade [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html) cookies (that is, cookies received in a header with a version cookie-attribute of 1) to Netscape cookies by setting the version attribute of the [`Cookie`](#http.cookiejar.Cookie "http.cookiejar.Cookie") instance to 0. The default value is `None`, in which case RFC 2109 cookies are downgraded if and only if [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) handling is turned off. Therefore, RFC 2109 cookies are downgraded by default.

通用严格性开关：

DefaultCookiePolicy.strict\_domain[¶](#http.cookiejar.DefaultCookiePolicy.strict_domain "Link to this definition")

不允许网站设置带国家码顶级域的包含两部分的域名例如 `.co.uk`, `.gov.uk`, `.co.nz` 等。 此开关尚未十分完善，并不保证有效！

[**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) 协议严格性开关：

DefaultCookiePolicy.strict\_rfc2965\_unverifiable[¶](#http.cookiejar.DefaultCookiePolicy.strict_rfc2965_unverifiable "Link to this definition")

遵循针对不可验证事务的 [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) 规则（不可验证事务通常是由重定向或请求发布在其它网站的图片导致的）。如果该属性为假值，则 _永远不会_ 基于可验证性而阻止 cookie。

Netscape 协议严格性开关：

DefaultCookiePolicy.strict\_ns\_unverifiable[¶](#http.cookiejar.DefaultCookiePolicy.strict_ns_unverifiable "Link to this definition")

即便是对 Netscape cookie 也要应用 [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) 规则。

DefaultCookiePolicy.strict\_ns\_domain[¶](#http.cookiejar.DefaultCookiePolicy.strict_ns_domain "Link to this definition")

指明针对 Netscape cookie 的域匹配规则的严格程度。可接受的值见下文。

DefaultCookiePolicy.strict\_ns\_set\_initial\_dollar[¶](#http.cookiejar.DefaultCookiePolicy.strict_ns_set_initial_dollar "Link to this definition")

忽略 Set-Cookie: 标头中名称以 `'$'` 开头的 cookie。

DefaultCookiePolicy.strict\_ns\_set\_path[¶](#http.cookiejar.DefaultCookiePolicy.strict_ns_set_path "Link to this definition")

不允许设置路径与请求 URL 路径不匹配的 cookie。

[`strict_ns_domain`](#http.cookiejar.DefaultCookiePolicy.strict_ns_domain "http.cookiejar.DefaultCookiePolicy.strict_ns_domain") 是一组旗标。 其值是通过或运算来构造的（例如，`DomainStrictNoDots|DomainStrictNonDomain` 表示同时设置两个旗标）。

DefaultCookiePolicy.DomainStrictNoDots[¶](#http.cookiejar.DefaultCookiePolicy.DomainStrictNoDots "Link to this definition")

When setting cookies, the 'host prefix' must not contain a dot (for example, `www.foo.bar.com` can't set a cookie for `.bar.com`, because `www.foo` contains a dot).

DefaultCookiePolicy.DomainStrictNonDomain[¶](#http.cookiejar.DefaultCookiePolicy.DomainStrictNonDomain "Link to this definition")

Cookies that did not explicitly specify a `domain` cookie-attribute can only be returned to a domain equal to the domain that set the cookie (for example, `spam.example.com` won't be returned cookies from `example.com` that had no `domain` cookie-attribute).

DefaultCookiePolicy.DomainRFC2965Match[¶](#http.cookiejar.DefaultCookiePolicy.DomainRFC2965Match "Link to this definition")

当设置 cookie 时，要求完整的 [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) 域匹配。

下列属性是为方便使用而提供的，是上述旗标的几种最常用组合：

DefaultCookiePolicy.DomainLiberal[¶](#http.cookiejar.DefaultCookiePolicy.DomainLiberal "Link to this definition")

Equivalent to 0 (that is, all of the above Netscape domain strictness flags switched off).

DefaultCookiePolicy.DomainStrict[¶](#http.cookiejar.DefaultCookiePolicy.DomainStrict "Link to this definition")

等价于 `DomainStrictNoDots|DomainStrictNonDomain`。

## Cookie objects[¶](#cookie-objects "Link to this heading")

[`Cookie`](#http.cookiejar.Cookie "http.cookiejar.Cookie") instances have Python attributes roughly corresponding to the standard cookie-attributes specified in the various cookie standards. The correspondence is not one-to-one, because there are complicated rules for assigning default values, because the `max-age` and `expires` cookie-attributes contain equivalent information, and because [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html) cookies may be 'downgraded' by `http.cookiejar` from version 1 to version 0 (Netscape) cookies.

对这些属性的赋值在 [`CookiePolicy`](#http.cookiejar.CookiePolicy "http.cookiejar.CookiePolicy") 方法的极少数情况以外应该都是不必要的。 该类不会强制内部一致性，因此如果这样做则你应当清楚自己在做什么。

Cookie.version[¶](#http.cookiejar.Cookie.version "Link to this definition")

Integer or `None`. Netscape cookies have [`version`](#http.cookiejar.Cookie.version "http.cookiejar.Cookie.version") 0. [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) and [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html) cookies have a `version` cookie-attribute of 1. However, note that `http.cookiejar` may 'downgrade' RFC 2109 cookies to Netscape cookies, in which case `version` is 0.

Cookie.name[¶](#http.cookiejar.Cookie.name "Link to this definition")

Cookie 名称（一个字符串）。

Cookie.value[¶](#http.cookiejar.Cookie.value "Link to this definition")

Cookie value (a string), or `None`.

Cookie.port[¶](#http.cookiejar.Cookie.port "Link to this definition")

String representing a port or a set of ports (for example, '80', or '80,8080'), or `None`.

Cookie.domain[¶](#http.cookiejar.Cookie.domain "Link to this definition")

Cookie 域（一个字符串）。

Cookie.path[¶](#http.cookiejar.Cookie.path "Link to this definition")

Cookie path (a string, for example, `'/acme/rocket_launchers'`).

Cookie.secure[¶](#http.cookiejar.Cookie.secure "Link to this definition")

如果 cookie 应当只能通过安全连接返回则为 `True`。

Cookie.expires[¶](#http.cookiejar.Cookie.expires "Link to this definition")

Integer expiry date in seconds since epoch, or `None`. See also the [`is_expired()`](#http.cookiejar.Cookie.is_expired "http.cookiejar.Cookie.is_expired") method.

Cookie.discard[¶](#http.cookiejar.Cookie.discard "Link to this definition")

如果是会话 cookie 则为 `True`。

String comment from the server explaining the function of this cookie, or `None`.

URL linking to a comment from the server explaining the function of this cookie, or `None`.

Cookie.rfc2109[¶](#http.cookiejar.Cookie.rfc2109 "Link to this definition")

`True` if this cookie was received as an [**RFC 2109**](https://datatracker.ietf.org/doc/html/rfc2109.html) cookie (that is, the cookie arrived in a header, and the value of the Version cookie-attribute in that header was 1). This attribute is provided because `http.cookiejar` may 'downgrade' RFC 2109 cookies to Netscape cookies, in which case [`version`](#http.cookiejar.Cookie.version "http.cookiejar.Cookie.version") is 0.

Cookie.port\_specified[¶](#http.cookiejar.Cookie.port_specified "Link to this definition")

如果服务器显式地指定了一个端口或一组端口（在 / 标头中）则为 `True`。

Cookie.domain\_specified[¶](#http.cookiejar.Cookie.domain_specified "Link to this definition")

如果服务器显式地指定了一个域则为 `True`。

Cookie.domain\_initial\_dot[¶](#http.cookiejar.Cookie.domain_initial_dot "Link to this definition")

该属性为 `True` 表示服务器显式地指定了以一个点号 (`'.'`) 打头的域。

Cookie 可能还有额外的非标准 cookie 属性。这些属性可以通过下列方法来访问：

Cookie.has\_nonstandard\_attr(_name_)[¶](#http.cookiejar.Cookie.has_nonstandard_attr "Link to this definition")

如果 cookie 具有相应名称的 cookie 属性则返回 `True`。

Cookie.get\_nonstandard\_attr(_name_, _default\=None_)[¶](#http.cookiejar.Cookie.get_nonstandard_attr "Link to this definition")

如果 cookie 具有相应名称的 cookie 属性，则返回其值。否则，返回 _default_。

Cookie.set\_nonstandard\_attr(_name_, _value_)[¶](#http.cookiejar.Cookie.set_nonstandard_attr "Link to this definition")

设置指定名称的 cookie 属性的值。

[`Cookie`](#http.cookiejar.Cookie "http.cookiejar.Cookie") 类还定义了下列方法：

Cookie.is\_expired(_now\=None_)[¶](#http.cookiejar.Cookie.is_expired "Link to this definition")

如果 cookie 已超过服务器所请求的过期时间则为 `True`。如果给出 _now_ 值（距离 Unix 纪元的秒数），则返回在指定的时间 cookie 是否已过期。

## 例子[¶](#examples "Link to this heading")

第一个例子显示了 `http.cookiejar` 的最常见用法:

import http.cookiejar, urllib.request
cj \= http.cookiejar.CookieJar()
opener \= urllib.request.build\_opener(urllib.request.HTTPCookieProcessor(cj))
r \= opener.open("http://example.com/")

这个例子演示了如何使用你的 Netscape, Mozilla 或 Lynx cookie 打开一个 URL (假定 cookie 文件位置采用 Unix/Netscape 惯例):

import os, http.cookiejar, urllib.request
cj \= http.cookiejar.MozillaCookieJar()
cj.load(os.path.join(os.path.expanduser("~"), ".netscape", "cookies.txt"))
opener \= urllib.request.build\_opener(urllib.request.HTTPCookieProcessor(cj))
r \= opener.open("http://example.com/")

下一个例子演示了 [`DefaultCookiePolicy`](#http.cookiejar.DefaultCookiePolicy "http.cookiejar.DefaultCookiePolicy") 的使用。启用 [**RFC 2965**](https://datatracker.ietf.org/doc/html/rfc2965.html) cookie，在设置和返回 Netscape cookie 时更严格地限制域，以及阻止某些域设置 cookie 或返回它们:

import urllib.request
from http.cookiejar import CookieJar, DefaultCookiePolicy
policy \= DefaultCookiePolicy(
    rfc2965\=True, strict\_ns\_domain\=Policy.DomainStrict,
    blocked\_domains\=\["ads.net", ".ads.net"\])
cj \= CookieJar(policy)
opener \= urllib.request.build\_opener(urllib.request.HTTPCookieProcessor(cj))
r \= opener.open("http://example.com/")
