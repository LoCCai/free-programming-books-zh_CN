阻塞和非阻塞的 HTTP 客户端接口.

这个模块定义了一个被两种实现方式 `simple_httpclient` 和 `curl_httpclient` 共享的通用接口 . 应用程序可以选择直接实例化相对应的实现类, 或使用本模块提供的 [`AsyncHTTPClient`](#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") 类, 通过复写 [`AsyncHTTPClient.configure`](#tornado.httpclient.AsyncHTTPClient.configure "tornado.httpclient.AsyncHTTPClient.configure") 方法来选择一种实现 .

默认的实现是 `simple_httpclient`, 这可以能满足大多数用户的需要 . 然而, 一 些应用程序可能会因为以下原因想切换到 `curl_httpclient` :

-   `curl_httpclient` 有一些 `simple_httpclient` 不具有的功能特性, 包括对 HTTP 代理和使用指定网络接口能力的支持.
-   `curl_httpclient` 更有可能与不完全符合 HTTP 规范的网站兼容, 或者与 使用很少使用 HTTP 特性的网站兼容.
-   `curl_httpclient` 更快.
-   `curl_httpclient` 是 Tornado 2.0 之前的默认值.

注意, 如果你正在使用 `curl_httpclient`, 强力建议你使用最新版本的 `libcurl` 和 `pycurl`. 当前 libcurl 能被支持的最小版本是 7.21.1, pycurl 能被支持的最小版本是 7.18.2. 强烈建议你所安装的 `libcurl` 是和异步 DNS 解析器 (threaded 或 c-ares) 一起构建的, 否则你可能会遇到各种请求超时的问题 (更多信息请查看 [http://curl.haxx.se/libcurl/c/curl\_easy\_setopt.html#CURLOPTCONNECTTIMEOUTMS](http://curl.haxx.se/libcurl/c/curl_easy_setopt.html#CURLOPTCONNECTTIMEOUTMS) 和 curl\_httpclient.py 里面的注释).

为了选择 `curl_httpclient`, 只需要在启动的时候调用 [`AsyncHTTPClient.configure`](#tornado.httpclient.AsyncHTTPClient.configure "tornado.httpclient.AsyncHTTPClient.configure")

AsyncHTTPClient.configure("tornado.curl\_httpclient.CurlAsyncHTTPClient")

## HTTP 客户端接口[¶](#http "永久链接至标题")

_class_ `tornado.httpclient.``HTTPClient`(_async\_client\_class=None_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httpclient.html#HTTPClient)[¶](#tornado.httpclient.HTTPClient "永久链接至目标")

一个阻塞的 HTTP 客户端.

提供这个接口是为了方便使用和测试; 大多数运行于 IOLoop 的应用程序 会使用 [`AsyncHTTPClient`](#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") 来替代它. 一般的用法就像这样

http\_client \= httpclient.HTTPClient()
try:
    response \= http\_client.fetch("http://www.google.com/")
    print response.body
except httpclient.HTTPError as e:
    \# HTTPError is raised for non-200 responses; the response
    \# can be found in e.response.
    print("Error: " + str(e))
except Exception as e:
    \# Other errors are possible, such as IOError.
    print("Error: " + str(e))
http\_client.close()

`close`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httpclient.html#HTTPClient.close)[¶](#tornado.httpclient.HTTPClient.close "永久链接至目标")

关闭该 HTTPClient, 释放所有使用的资源.

`fetch`(_request_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httpclient.html#HTTPClient.fetch)[¶](#tornado.httpclient.HTTPClient.fetch "永久链接至目标")

执行一个请求, 返回一个 [`HTTPResponse`](#tornado.httpclient.HTTPResponse "tornado.httpclient.HTTPResponse") 对象.

该请求可以是一个 URL 字符串或是一个 [`HTTPRequest`](#tornado.httpclient.HTTPRequest "tornado.httpclient.HTTPRequest") 对象. 如果它是一个字符串, 我们会使用任意关键字参数构造一个 [`HTTPRequest`](#tornado.httpclient.HTTPRequest "tornado.httpclient.HTTPRequest") : `HTTPRequest(request, **kwargs)`

如果在 fetch 过程中发生错误, 我们将抛出一个 [`HTTPError`](#tornado.httpclient.HTTPError "tornado.httpclient.HTTPError") 除非 `raise_error` 关键字参数被设置为 False.

_class_ `tornado.httpclient.``AsyncHTTPClient`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httpclient.html#AsyncHTTPClient)[¶](#tornado.httpclient.AsyncHTTPClient "永久链接至目标")

一个非阻塞 HTTP 客户端.

使用示例:

def handle\_request(response):
    if response.error:
        print "Error:", response.error
    else:
        print response.body

http\_client \= AsyncHTTPClient()
http\_client.fetch("http://www.google.com/", handle\_request)

这个类的构造器有几个比较神奇的考虑: 它实际创建了一个基于特定实现的子 类的实例, 并且该实例被作为一种伪单例重用 (每一个 [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") ). 使用关键字参数 `force_instance=True` 可以用来限制这种单例行为. 只有使用了 `force_instance=True` 时候, 才可以传递 `io_loop` 以外其他 的参数给 [`AsyncHTTPClient`](#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") 构造器. 实现的子类以及它的构造器的参数可以通过静态方法 [`configure()`](#tornado.httpclient.AsyncHTTPClient.configure "tornado.httpclient.AsyncHTTPClient.configure") 设置.

所有 [`AsyncHTTPClient`](#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") 实现都支持一个 `defaults` 关键字参数, 可以被用来设置默认 [`HTTPRequest`](#tornado.httpclient.HTTPRequest "tornado.httpclient.HTTPRequest") 属性的值. 例如:

AsyncHTTPClient.configure(
    None, defaults\=dict(user\_agent\="MyUserAgent"))
\# or with force\_instance:
client \= AsyncHTTPClient(force\_instance\=True,
    defaults\=dict(user\_agent\="MyUserAgent"))

在 4.1 版更改: `io_loop` 参数被废弃.

`close`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httpclient.html#AsyncHTTPClient.close)[¶](#tornado.httpclient.AsyncHTTPClient.close "永久链接至目标")

销毁该 HTTP 客户端, 释放所有被使用的文件描述符.

因为 [`AsyncHTTPClient`](#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") 对象透明重用的方式, 该方法 **在正常使用时并不需要** . `close()` 一般只有在 [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") 也被关闭, 或在创建 [`AsyncHTTPClient`](#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") 的时候使用了 `force_instance=True` 参数才需要.

在 [`AsyncHTTPClient`](#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") 调用 `close()` 方法后, 其他方法就不能被调用 了.

`fetch`(_request_, _callback=None_, _raise\_error=True_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httpclient.html#AsyncHTTPClient.fetch)[¶](#tornado.httpclient.AsyncHTTPClient.fetch "永久链接至目标")

执行一个请求, 并且异步的返回 [`HTTPResponse`](#tornado.httpclient.HTTPResponse "tornado.httpclient.HTTPResponse").

request 参数可以是一个 URL 字符串也可以是一个 [`HTTPRequest`](#tornado.httpclient.HTTPRequest "tornado.httpclient.HTTPRequest") 对象. 如果是一个字符串, 我们将使用全部的关键字参数一起构造一个 [`HTTPRequest`](#tornado.httpclient.HTTPRequest "tornado.httpclient.HTTPRequest") 对象: `HTTPRequest(request, **kwargs)`

这个方法返回一个结果为 [`HTTPResponse`](#tornado.httpclient.HTTPResponse "tornado.httpclient.HTTPResponse") 的 [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") 对象. 默认情况下, 如果该请求返回一个非 200 的响应码, 这个 `Future` 将会抛出一个 [`HTTPError`](#tornado.httpclient.HTTPError "tornado.httpclient.HTTPError") 错误. 相反, 如果 `raise_error` 设置为 False, 则无论响应码如何, 都将返回该 response (响应).

如果给定了 `callback` , 它将被 [`HTTPResponse`](#tornado.httpclient.HTTPResponse "tornado.httpclient.HTTPResponse") 调用. 在回调接口中, [`HTTPError`](#tornado.httpclient.HTTPError "tornado.httpclient.HTTPError") 不会自动抛出. 相反你必须检查该响应的 `error` 属性或者调用它的 [`rethrow`](#tornado.httpclient.HTTPResponse.rethrow "tornado.httpclient.HTTPResponse.rethrow") 方法.

_classmethod_ `configure`(_impl_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httpclient.html#AsyncHTTPClient.configure)[¶](#tornado.httpclient.AsyncHTTPClient.configure "永久链接至目标")

配置要使用的 [`AsyncHTTPClient`](#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") 子类.

`AsyncHTTPClient()` 实际上是创建一个子类的实例. 此方法可以使用一个类对象或此类的完全限定名称(或为 `None` 则使用默认的, `SimpleAsyncHTTPClient`) 调用.

如果给定了额外的关键字参数, 它们将会被传递给创建的每个子类实例的 构造函数. 关键字参数 `max_clients` 确定了可以在每个 [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") 上 并行执行的 [`fetch()`](#tornado.httpclient.AsyncHTTPClient.fetch "tornado.httpclient.AsyncHTTPClient.fetch") 操作的最大数量. 根据使用的 实现类不同, 可能支持其他参数.

例如:

AsyncHTTPClient.configure("tornado.curl\_httpclient.CurlAsyncHTTPClient")

## Request 对象[¶](#request "永久链接至标题")

_class_ `tornado.httpclient.``HTTPRequest`(_url_, _method='GET'_, _headers=None_, _body=None_, _auth\_username=None_, _auth\_password=None_, _auth\_mode=None_, _connect\_timeout=None_, _request\_timeout=None_, _if\_modified\_since=None_, _follow\_redirects=None_, _max\_redirects=None_, _user\_agent=None_, _use\_gzip=None_, _network\_interface=None_, _streaming\_callback=None_, _header\_callback=None_, _prepare\_curl\_callback=None_, _proxy\_host=None_, _proxy\_port=None_, _proxy\_username=None_, _proxy\_password=None_, _allow\_nonstandard\_methods=None_, _validate\_cert=None_, _ca\_certs=None_, _allow\_ipv6=None_, _client\_key=None_, _client\_cert=None_, _body\_producer=None_, _expect\_100\_continue=False_, _decompress\_response=None_, _ssl\_options=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httpclient.html#HTTPRequest)[¶](#tornado.httpclient.HTTPRequest "永久链接至目标")

HTTP 客户端请求对象.

除了 `url` 以外所有参数都是可选的.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>url</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – fetch 的 URL</li><li><strong>method</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – HTTP 方法, e.g. “GET” or “POST”</li><li><strong>headers</strong> (<a href="https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPHeaders" title="tornado.httputil.HTTPHeaders"><code><span>HTTPHeaders</span></code></a> 或 <a href="https://docs.python.org/3.4/library/stdtypes.html#dict" title="(在 Python v3.4)"><code><span>dict</span></code></a>) – 额外的 HTTP 请求头</li><li><strong>body</strong> – HTTP 请求体字符串 (byte 或 unicode; 如果是 unicode 则使用 utf-8 编码)</li><li><strong>body_producer</strong> – 可以被用于延迟/异步请求体调用. 它可以被调用, 带有一个参数, 一个 <code><span>write</span></code> 函数, 并应该 返回一个 <a href="https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future" title="tornado.concurrent.Future"><code><span>Future</span></code></a> 对象. 它应该在新的数据可用时调用 write 函数. write 函数返回一个可用于流程控制的 <a href="https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future" title="tornado.concurrent.Future"><code><span>Future</span></code></a> 对象. 只能指定 <code><span>body</span></code> 和 <code><span>body_producer</span></code> 其中之一. <code><span>body_producer</span></code> 不被 <code><span>curl_httpclient</span></code> 支持. 当使用 <code><span>body_producer</span></code> 时, 建议传递一个 <code><span>Content-Length</span></code> 头, 否则将使用其他的分块编码, 并且很多服务断不支持请求的分块编码. Tornado 4.0 新增</li><li><strong>auth_username</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – HTTP 认证的用户名</li><li><strong>auth_password</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – HTTP 认证的密码</li><li><strong>auth_mode</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – 认证模式; 默认是 “basic”. 所允许的值是根据实现方式定义的; <code><span>curl_httpclient</span></code> 支持 “basic” 和 “digest”; <code><span>simple_httpclient</span></code> 只支持 “basic”</li><li><strong>connect_timeout</strong> (<a href="https://docs.python.org/3.4/library/functions.html#float" title="(在 Python v3.4)"><em>float</em></a>) – 初始化连接的超时时间</li><li><strong>request_timeout</strong> (<a href="https://docs.python.org/3.4/library/functions.html#float" title="(在 Python v3.4)"><em>float</em></a>) – 整个请求的超时时间</li><li><strong>if_modified_since</strong> (<a href="https://docs.python.org/3.4/library/datetime.html#module-datetime" title="(在 Python v3.4)"><code><span>datetime</span></code></a> 或 <a href="https://docs.python.org/3.4/library/functions.html#float" title="(在 Python v3.4)"><code><span>float</span></code></a>) – <code><span>If-Modified-Since</span></code> 头的时间戳</li><li><strong>follow_redirects</strong> (<a href="https://docs.python.org/3.4/library/functions.html#bool" title="(在 Python v3.4)"><em>bool</em></a>) – 是否应该自动跟随重定向还是返回 3xx 响应?</li><li><strong>max_redirects</strong> (<a href="https://docs.python.org/3.4/library/functions.html#int" title="(在 Python v3.4)"><em>int</em></a>) – <code><span>follow_redirects</span></code> 的最大次数限制</li><li><strong>user_agent</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – <code><span>User-Agent</span></code> 头</li><li><strong>decompress_response</strong> (<a href="https://docs.python.org/3.4/library/functions.html#bool" title="(在 Python v3.4)"><em>bool</em></a>) – 从服务器请求一个压缩过的响应, 在下载 后对其解压缩. 默认是 True. Tornado 4.0 新增.</li><li><strong>use_gzip</strong> (<a href="https://docs.python.org/3.4/library/functions.html#bool" title="(在 Python v3.4)"><em>bool</em></a>) – <code><span>decompress_response</span></code> 的别名从 Tornado 4.0 已弃用.</li><li><strong>network_interface</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – 请求所使用的网络接口. 只有 <code><span>curl_httpclient</span></code> ; 请看下面的备注.</li><li><strong>streaming_callback</strong> (<a href="https://docs.python.org/3.4/library/functions.html#callable" title="(在 Python v3.4)"><em>callable</em></a>) – 如果设置了, <code><span>streaming_callback</span></code> 将 用它接收到的数据块执行, 并且 <code><span>HTTPResponse.body</span></code> 和 <code><span>HTTPResponse.buffer</span></code> 在最后的响应中将为空.</li><li><strong>header_callback</strong> (<a href="https://docs.python.org/3.4/library/functions.html#callable" title="(在 Python v3.4)"><em>callable</em></a>) – 如果设置了, <code><span>header_callback</span></code> 将 在接收到每行头信息时运行(包括第一行, e.g. <code><span>HTTP/1.0</span> <span>200</span> <span>OK\r\n</span></code>, 最后一行只包含 <code><span>\r\n</span></code>. 所有行都包含结尾的换行符). <code><span>HTTPResponse.headers</span></code> 在最终响应中将为空. 这与 <code><span>streaming_callback</span></code> 结合是最有用的, 因为它是在请求正在进行时 访问头信息唯一的方法.</li><li><strong>prepare_curl_callback</strong> (<a href="https://docs.python.org/3.4/library/functions.html#callable" title="(在 Python v3.4)"><em>callable</em></a>) – 如果设置, 将使用 <code><span>pycurl.Curl</span></code> 对象调用, 以允许应用程序进行额外的 <code><span>setopt</span></code> 调用.</li><li><strong>proxy_host</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – HTTP 代理主机名. 如果想要使用代理, <code><span>proxy_host</span></code> 和 <code><span>proxy_port</span></code> 必须设置; <code><span>proxy_username</span></code> 和 <code><span>proxy_pass</span></code> 是可选项. 目前只有 <code><span>curl_httpclient</span></code> 支持代理.</li><li><strong>proxy_port</strong> (<a href="https://docs.python.org/3.4/library/functions.html#int" title="(在 Python v3.4)"><em>int</em></a>) – HTTP 代理端口</li><li><strong>proxy_username</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – HTTP 代理用户名</li><li><strong>proxy_password</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – HTTP 代理密码</li><li><strong>allow_nonstandard_methods</strong> (<a href="https://docs.python.org/3.4/library/functions.html#bool" title="(在 Python v3.4)"><em>bool</em></a>) – 允许 <code><span>method</span></code> 参数使用未知值?</li><li><strong>validate_cert</strong> (<a href="https://docs.python.org/3.4/library/functions.html#bool" title="(在 Python v3.4)"><em>bool</em></a>) – 对于 HTTPS 请求, 是否验证服务器的证书?</li><li><strong>ca_certs</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – PEM 格式的 CA 证书的文件名, 或者默认为 None. 当与 <code><span>curl_httpclient</span></code> 一起使用时参阅下面的注释.</li><li><strong>client_key</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – 客户端 SSL key 文件名(如果有). 当与 <code><span>curl_httpclient</span></code> 一起使用时参阅下面的注释.</li><li><strong>client_cert</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – 客户端 SSL 证书的文件名(如果有). 当与 <code><span>curl_httpclient</span></code> 一起使用时参阅下面的注释.</li><li><strong>ssl_options</strong> (<a href="https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext" title="(在 Python v3.4)"><em>ssl.SSLContext</em></a>) – 用在 <code><span>simple_httpclient</span></code> (<code><span>curl_httpclient</span></code> 不支持) 的 <a href="https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext" title="(在 Python v3.4)"><code><span>ssl.SSLContext</span></code></a> 对象. 覆写 <code><span>validate_cert</span></code>, <code><span>ca_certs</span></code>, <code><span>client_key</span></code>, 和 <code><span>client_cert</span></code>.</li><li><strong>allow_ipv6</strong> (<a href="https://docs.python.org/3.4/library/functions.html#bool" title="(在 Python v3.4)"><em>bool</em></a>) – 当 IPv6 可用时是否使用? 默认是 true.</li><li><strong>expect_100_continue</strong> (<a href="https://docs.python.org/3.4/library/functions.html#bool" title="(在 Python v3.4)"><em>bool</em></a>) – 如果为 true, 发送 <code><span>Expect:</span> <span>100-continue</span></code> 头并在发送请求体前等待继续响应. 只被 simple_httpclient 支持.</li></ul></td></tr></tbody></table>

3.1 新版功能: `auth_mode` 参数.

4.0 新版功能: `body_producer` 和 `expect_100_continue` 参数.

4.2 新版功能: `ssl_options` 参数.

## Response 对象[¶](#response "永久链接至标题")

_class_ `tornado.httpclient.``HTTPResponse`(_request_, _code_, _headers=None_, _buffer=None_, _effective\_url=None_, _error=None_, _request\_time=None_, _time\_info=None_, _reason=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httpclient.html#HTTPResponse)[¶](#tornado.httpclient.HTTPResponse "永久链接至目标")

HTTP 响应对象.

属性:

-   request: HTTPRequest 对象
-   code: HTTP 状态码数值, e.g. 200 或 404
-   reason: 人类可读的, 对状态码原因的简短描述
-   headers: [`tornado.httputil.HTTPHeaders`](https://tornado-zh.readthedocs.io/zh/latest/httputil.html#tornado.httputil.HTTPHeaders "tornado.httputil.HTTPHeaders") 对象
-   effective\_url: 跟随重定向后资源的最后位置
-   buffer: 响应体的 `cStringIO` 对象
-   body: string 化的响应体 (从 `self.buffer` 的需求创建)
-   error: 任何异常对象
-   request\_time: 请求开始到结束的时间(秒)
-   time\_info: 来自请求的诊断时间信息的字典. 可用数据可能会更改, 不过当前在用的时间信息是 [http://curl.haxx.se/libcurl/c/curl\_easy\_getinfo.html](http://curl.haxx.se/libcurl/c/curl_easy_getinfo.html), 加上 `queue`, 这是通过等待在 [`AsyncHTTPClient`](#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") 的 `max_clients` 设置下的插槽引入的延迟(如果有的话).

`rethrow`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httpclient.html#HTTPResponse.rethrow)[¶](#tornado.httpclient.HTTPResponse.rethrow "永久链接至目标")

如果请求中有错误发生, 将抛出一个 [`HTTPError`](#tornado.httpclient.HTTPError "tornado.httpclient.HTTPError").

## 异常[¶](#id1 "永久链接至标题")

_exception_ `tornado.httpclient.``HTTPError`(_code_, _message=None_, _response=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/httpclient.html#HTTPError)[¶](#tornado.httpclient.HTTPError "永久链接至目标")

一个 HTTP 请求失败后抛出的异常.

属性:

-   `code` - 整数的 HTTP 错误码, e.g. 404. 当没有接收到 HTTP 响应时 将会使用 599 错误码, e.g. 超时.
-   `response` - 全部的 [`HTTPResponse`](#tornado.httpclient.HTTPResponse "tornado.httpclient.HTTPResponse") 对象.

注意如果 `follow_redirects` 为 False, 重定向将导致 HTTPErrors, 并且你可以通过 `error.response.headers['Location']` 查看重定向的 描述.

## Command-line 接口[¶](#command-line "永久链接至标题")

This module provides a simple command-line interface to fetch a url using Tornado’s HTTP client. Example usage:

\# Fetch the url and print its body
python \-m tornado.httpclient http://www.google.com

\# Just print the headers
python \-m tornado.httpclient \--print\_headers \--print\_body\=false http://www.google.com

## Implementations[¶](#module-tornado.simple_httpclient "永久链接至标题")

_class_ `tornado.simple_httpclient.``SimpleAsyncHTTPClient`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/simple_httpclient.html#SimpleAsyncHTTPClient)[¶](#tornado.simple_httpclient.SimpleAsyncHTTPClient "永久链接至目标")

Non-blocking HTTP client with no external dependencies.

This class implements an HTTP 1.1 client on top of Tornado’s IOStreams. Some features found in the curl-based AsyncHTTPClient are not yet supported. In particular, proxies are not supported, connections are not reused, and callers cannot select the network interface to be used.

`initialize`(_io\_loop_, _max\_clients=10_, _hostname\_mapping=None_, _max\_buffer\_size=104857600_, _resolver=None_, _defaults=None_, _max\_header\_size=None_, _max\_body\_size=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/simple_httpclient.html#SimpleAsyncHTTPClient.initialize)[¶](#tornado.simple_httpclient.SimpleAsyncHTTPClient.initialize "永久链接至目标")

Creates a AsyncHTTPClient.

Only a single AsyncHTTPClient instance exists per IOLoop in order to provide limitations on the number of pending connections. `force_instance=True` may be used to suppress this behavior.

Note that because of this implicit reuse, unless `force_instance` is used, only the first call to the constructor actually uses its arguments. It is recommended to use the `configure` method instead of the constructor to ensure that arguments take effect.

`max_clients` is the number of concurrent requests that can be in progress; when this limit is reached additional requests will be queued. Note that time spent waiting in this queue still counts against the `request_timeout`.

`hostname_mapping` is a dictionary mapping hostnames to IP addresses. It can be used to make local DNS changes when modifying system-wide settings like `/etc/hosts` is not possible or desirable (e.g. in unittests).

`max_buffer_size` (default 100MB) is the number of bytes that can be read into memory at once. `max_body_size` (defaults to `max_buffer_size`) is the largest response body that the client will accept. Without a `streaming_callback`, the smaller of these two limits applies; with a `streaming_callback` only `max_body_size` does.

在 4.2 版更改: Added the `max_body_size` argument.

_class_ `tornado.curl_httpclient.``CurlAsyncHTTPClient`(_io\_loop_, _max\_clients=10_, _defaults=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/curl_httpclient.html#CurlAsyncHTTPClient)[¶](#tornado.curl_httpclient.CurlAsyncHTTPClient "永久链接至目标")

`libcurl`\-based HTTP client.
