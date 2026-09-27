**源代码:** [Lib/http/\_\_init\_\_.py](https://github.com/python/cpython/tree/3.14/Lib/http/__init__.py)

* * *

`http` 是一个集合了多个用于处理超文本传输协议的模块的包：

-   [`http.client`](https://docs.python.org/zh-cn/3/library/http.client.html#module-http.client "http.client: HTTP and HTTPS protocol client (requires sockets).") 是一个底层的 HTTP 协议客户端；对于高层级的 URL 访问请使用 [`urllib.request`](https://docs.python.org/zh-cn/3/library/urllib.request.html#module-urllib.request "urllib.request: Extensible library for opening URLs.")
    
-   [`http.server`](https://docs.python.org/zh-cn/3/library/http.server.html#module-http.server "http.server: HTTP server and request handlers.") 包含基于 [`socketserver`](https://docs.python.org/zh-cn/3/library/socketserver.html#module-socketserver "socketserver: A framework for network servers.") 的基本 HTTP 服务类
    
-   [`http.cookies`](https://docs.python.org/zh-cn/3/library/http.cookies.html#module-http.cookies "http.cookies: Support for HTTP state management (cookies).") 包含一些用来实现通过 cookies 进行状态管理的工具
    
-   [`http.cookiejar`](https://docs.python.org/zh-cn/3/library/http.cookiejar.html#module-http.cookiejar "http.cookiejar: Classes for automatic handling of HTTP cookies.") 提供了 cookies 的持久化
    

`http` 模块还定义了下列枚举来帮助你使用 http 相关的代码：related code:

_class_ http.HTTPStatus[¶](#http.HTTPStatus "Link to this definition")

Added in version 3.5.

[`enum.IntEnum`](https://docs.python.org/zh-cn/3/library/enum.html#enum.IntEnum "enum.IntEnum") 的子类，它定义了一组 HTTP 状态码、原因短语以及用英语书写的长描述文本。

用法:

\>>> from http import HTTPStatus
\>>> HTTPStatus.OK
HTTPStatus.OK
\>>> HTTPStatus.OK \== 200
True
\>>> HTTPStatus.OK.value
200
\>>> HTTPStatus.OK.phrase
'OK'
\>>> HTTPStatus.OK.description
'Request fulfilled, document follows'
\>>> list(HTTPStatus)
\[HTTPStatus.CONTINUE, HTTPStatus.SWITCHING\_PROTOCOLS, ...\]

## HTTP 状态码[¶](#http-status-codes "Link to this heading")

已支持的，[IANA 注册的状态码](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml) 在 [`http.HTTPStatus`](#http.HTTPStatus "http.HTTPStatus") 中可用的有：

| 
代码

 | 

枚举名

 | 

详情

 |
| --- | --- | --- |
| 

`100`

 | 

`CONTINUE`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.2.1

 |
| 

`101`

 | 

`SWITCHING_PROTOCOLS`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.2.2

 |
| 

`102`

 | 

`PROCESSING`

 | 

WebDAV [**RFC 2518**](https://datatracker.ietf.org/doc/html/rfc2518.html), Section 10.1

 |
| 

`103`

 | 

`EARLY_HINTS`

 | 

An HTTP Status Code for Indicating Hints [**RFC 8297**](https://datatracker.ietf.org/doc/html/rfc8297.html)

 |
| 

`200`

 | 

`OK`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.3.1

 |
| 

`201`

 | 

`CREATED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.3.2

 |
| 

`202`

 | 

`ACCEPTED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.3.3

 |
| 

`203`

 | 

`NON_AUTHORITATIVE_INFORMATION`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.3.4

 |
| 

`204`

 | 

`NO_CONTENT`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.3.5

 |
| 

`205`

 | 

`RESET_CONTENT`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.3.6

 |
| 

`206`

 | 

`PARTIAL_CONTENT`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.3.7

 |
| 

`207`

 | 

`MULTI_STATUS`

 | 

WebDAV [**RFC 4918**](https://datatracker.ietf.org/doc/html/rfc4918.html), Section 11.1

 |
| 

`208`

 | 

`ALREADY_REPORTED`

 | 

WebDAV Binding Extensions [**RFC 5842**](https://datatracker.ietf.org/doc/html/rfc5842.html), Section 7.1 (Experimental)

 |
| 

`226`

 | 

`IM_USED`

 | 

Delta Encoding in HTTP [**RFC 3229**](https://datatracker.ietf.org/doc/html/rfc3229.html), Section 10.4.1

 |
| 

`300`

 | 

`MULTIPLE_CHOICES`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.4.1

 |
| 

`301`

 | 

`MOVED_PERMANENTLY`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.4.2

 |
| 

`302`

 | 

`FOUND`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.4.3

 |
| 

`303`

 | 

`SEE_OTHER`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.4.4

 |
| 

`304`

 | 

`NOT_MODIFIED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.4.5

 |
| 

`305`

 | 

`USE_PROXY`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.4.6

 |
| 

`307`

 | 

`TEMPORARY_REDIRECT`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.4.8

 |
| 

`308`

 | 

`PERMANENT_REDIRECT`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.4.9

 |
| 

`400`

 | 

`BAD_REQUEST`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.1

 |
| 

`401`

 | 

`UNAUTHORIZED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.2

 |
| 

`402`

 | 

`PAYMENT_REQUIRED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.3

 |
| 

`403`

 | 

`FORBIDDEN`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.4

 |
| 

`404`

 | 

`NOT_FOUND`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.5

 |
| 

`405`

 | 

`METHOD_NOT_ALLOWED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.6

 |
| 

`406`

 | 

`NOT_ACCEPTABLE`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.7

 |
| 

`407`

 | 

`PROXY_AUTHENTICATION_REQUIRED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.8

 |
| 

`408`

 | 

`REQUEST_TIMEOUT`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.9

 |
| 

`409`

 | 

`CONFLICT`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.10

 |
| 

`410`

 | 

`GONE`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.11

 |
| 

`411`

 | 

`LENGTH_REQUIRED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.12

 |
| 

`412`

 | 

`PRECONDITION_FAILED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.13

 |
| 

`413`

 | 

`CONTENT_TOO_LARGE`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.14

 |
| 

`414`

 | 

`URI_TOO_LONG`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.15

 |
| 

`415`

 | 

`UNSUPPORTED_MEDIA_TYPE`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.16

 |
| 

`416`

 | 

`RANGE_NOT_SATISFIABLE`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.17

 |
| 

`417`

 | 

`EXPECTATION_FAILED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.18

 |
| 

`418`

 | 

`IM_A_TEAPOT`

 | 

HTCPCP/1.0 [**RFC 2324**](https://datatracker.ietf.org/doc/html/rfc2324.html), Section 2.3.2

 |
| 

`421`

 | 

`MISDIRECTED_REQUEST`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.20

 |
| 

`422`

 | 

`UNPROCESSABLE_CONTENT`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.21

 |
| 

`423`

 | 

`LOCKED`

 | 

WebDAV [**RFC 4918**](https://datatracker.ietf.org/doc/html/rfc4918.html), Section 11.3

 |
| 

`424`

 | 

`FAILED_DEPENDENCY`

 | 

WebDAV [**RFC 4918**](https://datatracker.ietf.org/doc/html/rfc4918.html), Section 11.4

 |
| 

`425`

 | 

`TOO_EARLY`

 | 

Using Early Data in HTTP [**RFC 8470**](https://datatracker.ietf.org/doc/html/rfc8470.html)

 |
| 

`426`

 | 

`UPGRADE_REQUIRED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.5.22

 |
| 

`428`

 | 

`PRECONDITION_REQUIRED`

 | 

Additional HTTP Status Codes [**RFC 6585**](https://datatracker.ietf.org/doc/html/rfc6585.html)

 |
| 

`429`

 | 

`TOO_MANY_REQUESTS`

 | 

Additional HTTP Status Codes [**RFC 6585**](https://datatracker.ietf.org/doc/html/rfc6585.html)

 |
| 

`431`

 | 

`REQUEST_HEADER_FIELDS_TOO_LARGE`

 | 

Additional HTTP Status Codes [**RFC 6585**](https://datatracker.ietf.org/doc/html/rfc6585.html)

 |
| 

`451`

 | 

`UNAVAILABLE_FOR_LEGAL_REASONS`

 | 

An HTTP Status Code to Report Legal Obstacles [**RFC 7725**](https://datatracker.ietf.org/doc/html/rfc7725.html)

 |
| 

`500`

 | 

`INTERNAL_SERVER_ERROR`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.6.1

 |
| 

`501`

 | 

`NOT_IMPLEMENTED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.6.2

 |
| 

`502`

 | 

`BAD_GATEWAY`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.6.3

 |
| 

`503`

 | 

`SERVICE_UNAVAILABLE`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.6.4

 |
| 

`504`

 | 

`GATEWAY_TIMEOUT`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.6.5

 |
| 

`505`

 | 

`HTTP_VERSION_NOT_SUPPORTED`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15.6.6

 |
| 

`506`

 | 

`VARIANT_ALSO_NEGOTIATES`

 | 

Transparent Content Negotiation in HTTP [**RFC 2295**](https://datatracker.ietf.org/doc/html/rfc2295.html), Section 8.1 (Experimental)

 |
| 

`507`

 | 

`INSUFFICIENT_STORAGE`

 | 

WebDAV [**RFC 4918**](https://datatracker.ietf.org/doc/html/rfc4918.html), Section 11.5

 |
| 

`508`

 | 

`LOOP_DETECTED`

 | 

WebDAV Binding Extensions [**RFC 5842**](https://datatracker.ietf.org/doc/html/rfc5842.html), Section 7.2 (Experimental)

 |
| 

`510`

 | 

`NOT_EXTENDED`

 | 

An HTTP Extension Framework [**RFC 2774**](https://datatracker.ietf.org/doc/html/rfc2774.html), Section 7 (Experimental)

 |
| 

`511`

 | 

`NETWORK_AUTHENTICATION_REQUIRED`

 | 

Additional HTTP Status Codes [**RFC 6585**](https://datatracker.ietf.org/doc/html/rfc6585.html), Section 6

 |

为了保持向后兼容性，枚举值也以常量形式出现在 [`http.client`](https://docs.python.org/zh-cn/3/library/http.client.html#module-http.client "http.client: HTTP and HTTPS protocol client (requires sockets).") 模块中。枚举名等于常量名（例如 `http.HTTPStatus.OK` 也可以用 `http.client.OK` 来访问）。

在 3.7 版本发生变更: 添加了 `421 MISDIRECTED_REQUEST` 状态码。

Added in version 3.8: 添加了 `451 UNAVAILABLE_FOR_LEGAL_REASONS` 状态码。

Added in version 3.9: 增加了 `103 EARLY_HINTS`, `418 IM_A_TEAPOT` 和 `425 TOO_EARLY` 状态码

在 3.13 版本发生变更: 实现了 RFC9110 状态常量命名。 旧的常量名称被保留用于向下兼容: `413 REQUEST_ENTITY_TOO_LARGE`, `414 REQUEST_URI_TOO_LONG`, `416 REQUESTED_RANGE_NOT_SATISFIABLE` 和 `422 UNPROCESSABLE_ENTITY`。

## HTTP 状态类别[¶](#http-status-category "Link to this heading")

Added in version 3.12.

这些枚举值具有一些用于指明 HTTP 状态类别的特征属性：

| 
特征属性

 | 

表示

 | 

详情

 |
| --- | --- | --- |
| 

`is_informational`

 | 

`100 <= status <= 199`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15

 |
| 

`is_success`

 | 

`200 <= status <= 299`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15

 |
| 

`is_redirection`

 | 

`300 <= status <= 399`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15

 |
| 

`is_client_error`

 | 

`400 <= status <= 499`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15

 |
| 

`is_server_error`

 | 

`500 <= status <= 599`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 15

 |

> 用法:
> 
> \>>> from http import HTTPStatus
> \>>> HTTPStatus.OK.is\_success
> True
> \>>> HTTPStatus.OK.is\_client\_error
> False

_class_ http.HTTPMethod[¶](#http.HTTPMethod "Link to this definition")

Added in version 3.11.

一个 [`enum.StrEnum`](https://docs.python.org/zh-cn/3/library/enum.html#enum.StrEnum "enum.StrEnum") 的子类，它定义了一组 HTTP 方法以及用英文书写的描述。

用法:

\>>> from http import HTTPMethod
\>>>
\>>> HTTPMethod.GET
<HTTPMethod.GET>
\>>> HTTPMethod.GET \== 'GET'
True
\>>> HTTPMethod.GET.value
'GET'
\>>> HTTPMethod.GET.description
'Retrieve the target.'
\>>> list(HTTPMethod)
\[<HTTPMethod.CONNECT>,
 <HTTPMethod.DELETE>,
 <HTTPMethod.GET>,
 <HTTPMethod.HEAD>,
 <HTTPMethod.OPTIONS>,
 <HTTPMethod.PATCH>,
 <HTTPMethod.POST>,
 <HTTPMethod.PUT>,
 <HTTPMethod.TRACE>\]

## HTTP 方法[¶](#http-methods "Link to this heading")

已支持的，[IANA 注册的方法](https://www.iana.org/assignments/http-methods/http-methods.xhtml) 在 [`http.HTTPMethod`](#http.HTTPMethod "http.HTTPMethod") 中可用的有：

| 
方法

 | 

枚举名

 | 

详情

 |
| --- | --- | --- |
| 

`GET`

 | 

`GET`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 9.3.1

 |
| 

`HEAD`

 | 

`HEAD`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 9.3.2

 |
| 

`POST`

 | 

`POST`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 9.3.3

 |
| 

`PUT`

 | 

`PUT`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 9.3.4

 |
| 

`DELETE`

 | 

`DELETE`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 9.3.5

 |
| 

`CONNECT`

 | 

`CONNECT`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 9.3.6

 |
| 

`OPTIONS`

 | 

`OPTIONS`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 9.3.7

 |
| 

`TRACE`

 | 

`TRACE`

 | 

HTTP Semantics [**RFC 9110**](https://datatracker.ietf.org/doc/html/rfc9110.html), Section 9.3.8

 |
| 

`PATCH`

 | 

`PATCH`

 | 

HTTP/1.1 [**RFC 5789**](https://datatracker.ietf.org/doc/html/rfc5789.html)

 |
