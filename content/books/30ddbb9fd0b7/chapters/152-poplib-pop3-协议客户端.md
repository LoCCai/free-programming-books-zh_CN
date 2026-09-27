**源代码：** [Lib/poplib.py](https://github.com/python/cpython/tree/3.14/Lib/poplib.py)

* * *

本模块定义了一个 [`POP3`](#poplib.POP3 "poplib.POP3") 类，该类封装了到 POP3 服务器的连接过程，并实现了 [**RFC 1939**](https://datatracker.ietf.org/doc/html/rfc1939.html) 中定义的协议。`POP3` 类同时支持 [**RFC 1939**](https://datatracker.ietf.org/doc/html/rfc1939.html) 中最小的和可选的命令集。`POP3` 类还支持在 [**RFC 2595**](https://datatracker.ietf.org/doc/html/rfc2595.html) 中引入的 `STLS` 命令，用于在已建立的连接上启用加密通信。

本模块额外提供一个 [`POP3_SSL`](#poplib.POP3_SSL "poplib.POP3_SSL") 类，在连接到 POP3 服务器时，该类为使用 SSL 作为底层协议层提供了支持。

注意，尽管 POP3 具有广泛的支持，但它已经过时。POP3 服务器的实现质量差异很大，而且大多很糟糕。如果邮件服务器支持 IMAP，则最好使用 [`imaplib.IMAP4`](https://docs.python.org/zh-cn/3/library/imaplib.html#imaplib.IMAP4 "imaplib.IMAP4") 类，因为 IMAP 服务器一般实现得更好。

`poplib` 模块提供了两个类：

_class_ poplib.POP3(_host_, _port=POP3\_PORT_\[, _timeout_\])[¶](#poplib.POP3 "Link to this definition")

本类实现实际的 POP3 协议。实例初始化时，连接就会建立。如果省略 _port_，则使用标准 POP3 端口（110）。可选参数 _timeout_ 指定连接尝试的超时时间（以秒为单位，如果未指定超时，将使用全局默认超时设置）。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `poplib.connect` 并附带参数 `self`, `host`, `port`。

所有命令都会引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `poplib.putline`，附带参数 `self` 和 `line`，其中 `line` 是即将发送到远程主机的字节串。

在 3.9 版本发生变更: 如果 _timeout_ 参数设置为 0，创建非阻塞套接字时，它将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 来阻止该操作。

_class_ poplib.POP3\_SSL(_host_, _port\=POP3\_SSL\_PORT_, _\*_, _timeout\=None_, _context\=None_)[¶](#poplib.POP3_SSL "Link to this definition")

一个 [`POP3`](#poplib.POP3 "poplib.POP3") 的子类，它使用经 SSL 加密的套接字连接到服务器。如果端口 _port_ 未指定，则使用 995，它是标准的 POP3-over-SSL 端口。_timeout_ 的作用与 `POP3` 构造函数中的相同。_context_ 是一个可选的 [`ssl.SSLContext`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.SSLContext "ssl.SSLContext") 对象，该对象可以将 SSL 配置选项、证书和私钥打包放入一个单独的（可以长久存在的）结构中。请阅读 [安全考量](https://docs.python.org/zh-cn/3/library/ssl.html#ssl-security) 以获取最佳实践。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `poplib.connect` 并附带参数 `self`, `host`, `port`。

所有命令都会引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `poplib.putline`，附带参数 `self` 和 `line`，其中 `line` 是即将发送到远程主机的字节串。

在 3.2 版本发生变更: 添加了 _context_ 参数。

在 3.9 版本发生变更: 如果 _timeout_ 参数设置为 0，创建非阻塞套接字时，它将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 来阻止该操作。

在 3.12 版本发生变更: 已弃用的 _keyfile_ 和 _certfile_ 形参已被移除。

定义了一个异常作为 `poplib` 模块的属性：

_exception_ poplib.error\_proto[¶](#poplib.error_proto "Link to this definition")

此模块的所有错误都将引发本异常（来自 [`socket`](https://docs.python.org/zh-cn/3/library/socket.html#module-socket "socket: Low-level networking interface.") 模块的错误不会被捕获）。异常的原因将以字符串的形式传递给构造函数。

参见

[`imaplib`](https://docs.python.org/zh-cn/3/library/imaplib.html#module-imaplib "imaplib: IMAP4 protocol client (requires sockets).") 模块

标准的 Python IMAP 模块。

[有关 Fetchmail 的常见问题](http://www.catb.org/~esr/fetchmail/fetchmail-FAQ.html)

**fetchmail** POP/IMAP 客户端的“常见问题”收集了 POP3 服务器之间的差异和 RFC 不兼容的信息，如果要编写基于 POP 协议的应用程序，这可能会很有用。

## POP3 对象[¶](#pop3-objects "Link to this heading")

所有 POP3 命令均以同名的方法表示，使用小写形式；大多数方法返回的是服务器所发送的响应文本。

[`POP3`](#poplib.POP3 "poplib.POP3") 实例具有下列方法:

POP3.set\_debuglevel(_level_)[¶](#poplib.POP3.set_debuglevel "Link to this definition")

设置实例的调试级别，它控制着调试信息的数量。默认值 `0` 不产生调试信息。值 `1` 产生中等数量的调试信息，通常每个请求产生一行。大于或等于 `2` 的值产生的调试信息最多，控制连接上发送和接收的每一行都将被记录下来。

POP3.getwelcome()[¶](#poplib.POP3.getwelcome "Link to this definition")

返回 POP3 服务器发送的问候语字符串。

POP3.capa()[¶](#poplib.POP3.capa "Link to this definition")

查询服务器支持的功能，这些功能在 [**RFC 2449**](https://datatracker.ietf.org/doc/html/rfc2449.html) 中有说明。返回一个 `{'name': ['param'...]}` 形式的字典。

Added in version 3.4.

POP3.user(_username_)[¶](#poplib.POP3.user "Link to this definition")

发送 user 命令，返回的响应应该指示需要一个密码。

POP3.pass\_(_password_)[¶](#poplib.POP3.pass_ "Link to this definition")

发送密码，响应包括邮件消息计数和邮箱大小。 注意：服务器上的邮箱将被锁定直到 [`quit()`](#poplib.POP3.quit "poplib.POP3.quit") 被调用。

POP3.apop(_user_, _secret_)[¶](#poplib.POP3.apop "Link to this definition")

使用更安全的 APOP 身份验证登录到 POP3 服务器。

POP3.rpop(_user_)[¶](#poplib.POP3.rpop "Link to this definition")

使用 RPOP 身份验证（类似于 Unix r-命令）登录到 POP3 服务器。

POP3.stat()[¶](#poplib.POP3.stat "Link to this definition")

获取邮箱状态。结果为 2 个整数组成的元组: `(message count, mailbox size)`。

POP3.list(\[_which_\])[¶](#poplib.POP3.list "Link to this definition")

请求消息列表，结果的形式为 `(response, ['mesg_num octets', ...], octets)`。如果设置了 _which_，它表示需要列出的消息。

POP3.retr(_which_)[¶](#poplib.POP3.retr "Link to this definition")

检索编号为 _which_ 的整条消息，并设置其已读标志位。结果的形式为 `(response, ['line', ...], octets)`。

POP3.dele(_which_)[¶](#poplib.POP3.dele "Link to this definition")

将编号为 _which_ 的消息标记为待删除。在多数服务器上，删除操作直到 QUIT 才会实际执行（主要例外是 Eudora QPOP，它在断开连接时执行删除，故意违反了 RFC）。

POP3.rset()[¶](#poplib.POP3.rset "Link to this definition")

移除邮箱中的所有待删除标记。

POP3.noop()[¶](#poplib.POP3.noop "Link to this definition")

什么都不做。可以用于保持活动状态。

POP3.quit()[¶](#poplib.POP3.quit "Link to this definition")

登出：提交更改，解除邮箱锁定，断开连接。

POP3.top(_which_, _howmuch_)[¶](#poplib.POP3.top "Link to this definition")

检索编号为 _which_ 的消息，范围是消息头加上消息头往后数 _howmuch_ 行。结果的形式为 `(response, ['line', ...], octets)`。

本方法使用 POP3 TOP 命令，不同于 RETR 命令，它不设置邮件的已读标志位。不幸的是，TOP 在 RFC 中说明不清晰，且在小众的服务器软件中往往不可用。信任并使用它之前，请先手动对目标 POP3 服务器测试本方法。

POP3.uidl(_which\=None_)[¶](#poplib.POP3.uidl "Link to this definition")

返回消息摘要（唯一 ID）列表。如果指定了 _which_，那么结果将包含那条消息的唯一 ID，形式为 `'response mesgnum uid`，如果未指定，那么结果为列表 `(response, ['mesgnum uid', ...], octets)`。

POP3.utf8()[¶](#poplib.POP3.utf8 "Link to this definition")

尝试切换至 UTF-8 模式。成功则返回服务器的响应，失败则引发 [`error_proto`](#poplib.error_proto "poplib.error_proto") 异常。在 [**RFC 6856**](https://datatracker.ietf.org/doc/html/rfc6856.html) 中有说明。

Added in version 3.5.

POP3.stls(_context\=None_)[¶](#poplib.POP3.stls "Link to this definition")

在活动连接上开启 TLS 会话，在 [**RFC 2595**](https://datatracker.ietf.org/doc/html/rfc2595.html) 中有说明。仅在用户身份验证前允许这样做。

_context_ 参数是一个 [`ssl.SSLContext`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.SSLContext "ssl.SSLContext") 对象，该对象可以将 SSL 配置选项、证书和私钥打包放入一个单独的（可以长久存在的）结构中。请阅读 [安全考量](https://docs.python.org/zh-cn/3/library/ssl.html#ssl-security) 以获取最佳实践。

此方法支持通过 [`ssl.SSLContext.check_hostname`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.SSLContext.check_hostname "ssl.SSLContext.check_hostname") 和 _服务器名称指示_ (参见 [`ssl.HAS_SNI`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.HAS_SNI "ssl.HAS_SNI")) 进行主机名检测。

Added in version 3.4.

[`POP3_SSL`](#poplib.POP3_SSL "poplib.POP3_SSL") 实例没有额外方法。该子类的接口与其父类的相同。

## POP3 示例[¶](#pop3-example "Link to this heading")

以下是一个最短示例（不带错误检查），该示例将打开邮箱，检索并打印所有消息:

import getpass, poplib

M \= poplib.POP3('localhost')
M.user(getpass.getuser())
M.pass\_(getpass.getpass())
numMessages \= len(M.list()\[1\])
for i in range(numMessages):
    for j in M.retr(i+1)\[1\]:
        print(j)

模块的最后有一段测试，其中包含的用法示例更加广泛。
