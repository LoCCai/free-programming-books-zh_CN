**源代码：** [Lib/imaplib.py](https://github.com/python/cpython/tree/3.14/Lib/imaplib.py)

* * *

本模块定义了三个类，[`IMAP4`](#imaplib.IMAP4 "imaplib.IMAP4"), [`IMAP4_SSL`](#imaplib.IMAP4_SSL "imaplib.IMAP4_SSL") 和 [`IMAP4_stream`](#imaplib.IMAP4_stream "imaplib.IMAP4_stream")，它们封装了与 IMAP4 服务器的连接并实现了 [**RFC 3501**](https://datatracker.ietf.org/doc/html/rfc3501.html) 中定义的 IMAP4rev1 客户端协议的一个大子集。 它可以向下兼容 IMAP4 ([**RFC 1730**](https://datatracker.ietf.org/doc/html/rfc1730.html)) 服务器，但要注意 `STATUS` 命令在 IMAP4 中不受支持。

`imaplib` 模块提供了三个类，其中 [`IMAP4`](#imaplib.IMAP4 "imaplib.IMAP4") 是基类：

_class_ imaplib.IMAP4(_host\=''_, _port\=IMAP4\_PORT_, _timeout\=None_)[¶](#imaplib.IMAP4 "Link to this definition")

这个类实现了实际的 IMAP4 协议。 当其实例被初始化时会创建连接并确定协议版本 (IMAP4 或 IMAP4rev1)。 如果未指明 _host_，则会使用 `''` (本地主机)。 如果省略 _port_，则会使用标准的 IMAP4 端口 (143)。 可选的 _timeout_ 形参指定连接尝试的超时秒数。 如果未指定超时或为 `None`，则会使用全局默认的套接字超时。

[`IMAP4`](#imaplib.IMAP4 "imaplib.IMAP4") 类支持 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句。 当这样使用时，IMAP4 `LOGOUT` 命令会在 `with` 语句退出时自动发出。 例如:

\>>> from imaplib import IMAP4
\>>> with IMAP4("domain.org") as M:
...     M.noop()
...
('OK', \[b'Nothing Accomplished. d25if65hy903weo.87'\])

在 3.5 版本发生变更: 添加了对 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句的支持。

在 3.9 版本发生变更: 添加了可选的 _timeout_ 形参。

有三个异常被定义为 [`IMAP4`](#imaplib.IMAP4 "imaplib.IMAP4") 类的属性:

_exception_ IMAP4.error[¶](#imaplib.IMAP4.error "Link to this definition")

任何错误都将引发该异常。 异常的原因会以字符串的形式传递给构造器。

_exception_ IMAP4.abort[¶](#imaplib.IMAP4.abort "Link to this definition")

IMAP4 服务器错误会导致引发该异常。 这是 [`IMAP4.error`](#imaplib.IMAP4.error "imaplib.IMAP4.error") 的子类。 请注意关闭此实例并实例化一个新实例通常将会允许从该异常中恢复。

_exception_ IMAP4.readonly[¶](#imaplib.IMAP4.readonly "Link to this definition")

当一个可写邮箱的状态被服务器修改时会引发此异常。 此异常是 [`IMAP4.error`](#imaplib.IMAP4.error "imaplib.IMAP4.error") 的子类。 某个其他客户端现在会具有写入权限，将需要重新打开该邮箱以重新获得写入权限。

另外还有一个针对安全连接的子类:

_class_ imaplib.IMAP4\_SSL(_host\=''_, _port\=IMAP4\_SSL\_PORT_, _\*_, _ssl\_context\=None_, _timeout\=None_)[¶](#imaplib.IMAP4_SSL "Link to this definition")

这是一个派生自 [`IMAP4`](#imaplib.IMAP4 "imaplib.IMAP4") 的子类，它使用经 SSL 加密的套接字进行连接 (为了使用这个类你需要编译时附带 SSL 支持的 socket 模块)。 如果未指定 _host_，则会使用 `''` (本地主机)。 如果省略了 _port_，则会使用标准的 IMAP4-over-SSL 端口 (993)。 _ssl\_context_ 是一个 [`ssl.SSLContext`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.SSLContext "ssl.SSLContext") 对象，它允许将 SSL 配置选项、证书和私钥打包放入一个单独的 (可以长久存在的) 结构体中。 请阅读 [安全考量](https://docs.python.org/zh-cn/3/library/ssl.html#ssl-security) 以获取最佳实践。

备注

With the default _ssl\_context_, the connection is encrypted but the server certificate and hostname are not verified. To verify them, pass a context created by [`ssl.create_default_context()`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.create_default_context "ssl.create_default_context").

可选的 _timeout_ 形参指明连接尝试的超时秒数。 如果超时值未给出或为 `None`，则会使用全局默认的套接字超时设置。

在 3.3 版本发生变更: 增加了 _ssl\_context_ 形参。

在 3.9 版本发生变更: 添加了可选的 _timeout_ 形参。

在 3.12 版本发生变更: 已弃用的 _keyfile_ 和 _certfile_ 形参已被移除。

第二个子类允许由子进程所创建的连接:

_class_ imaplib.IMAP4\_stream(_command_)[¶](#imaplib.IMAP4_stream "Link to this definition")

这是一个派生自 [`IMAP4`](#imaplib.IMAP4 "imaplib.IMAP4") 的子类，它可以连接 `stdin/stdout` 文件描述符，此种文件是通过向 `subprocess.Popen()` 传入 _command_ 来创建的。

定义了下列工具函数:

imaplib.Internaldate2tuple(_resp_)[¶](#imaplib.Internaldate2tuple "Link to this definition")

Parse a [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) containing an IMAP4 `INTERNALDATE` response and return the corresponding local time. The return value is a [`time.struct_time`](https://docs.python.org/zh-cn/3/library/time.html#time.struct_time "time.struct_time") tuple or `None` if the input has wrong format.

imaplib.Int2AP(_num_)[¶](#imaplib.Int2AP "Link to this definition")

将一个整数转换为使用字符集 \[`A` .. `P`\] 的字节串表示形式。

imaplib.ParseFlags(_resp_)[¶](#imaplib.ParseFlags "Link to this definition")

Converts a [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) containing an IMAP4 `FLAGS` response to a tuple of individual flags as [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes"). The return value is an empty tuple if the input has wrong format.

imaplib.Time2Internaldate(_date\_time_)[¶](#imaplib.Time2Internaldate "Link to this definition")

将 _date\_time_ 转换为 IMAP4 `INTERNALDATE` 表示形式。 返回值是以下形式的字符串: `"DD-Mmm-YYYY HH:MM:SS +HHMM"` (包括双引号)。 _date\_time_ 参数可以是一个代表距离纪元起始的秒数 (如 [`time.time()`](https://docs.python.org/zh-cn/3/library/time.html#time.time "time.time") 的返回值) 的数字 (整数或浮点数)，一个代表本地时间的 9 元组，一个 [`time.struct_time`](https://docs.python.org/zh-cn/3/library/time.html#time.struct_time "time.struct_time") 实例 (如 [`time.localtime()`](https://docs.python.org/zh-cn/3/library/time.html#time.localtime "time.localtime") 的返回值)，一个感知型的 [`datetime.datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.datetime "datetime.datetime") 实例，或一个双引号字符串。 在最后一种情况下，它会被假定已经具有正确的格式。

请注意 IMAP4 消息编号会随邮箱的改变而改变；特别是在使用 `EXPUNGE` 命令执行删除后剩余的消息会被重新编号。 因此高度建议通过 UID 命令来改用 UID。

模块的最后有一段测试，其中包含的用法示例更加广泛。

## IMAP4 对象[¶](#imap4-objects "Link to this heading")

所有 IMAP4rev1 命令都是以相同名称的方法来表示的，可以为大写或小写形式。

All arguments to commands are converted to strings, except for `AUTHENTICATE`, and the last argument to `APPEND` which is passed as an IMAP4 literal. If necessary (the string contains IMAP4 protocol-sensitive characters and isn't enclosed with either parentheses or double quotes) each string is quoted. However, the _password_ argument to the `LOGIN` command is always quoted. If you want to avoid having an argument string quoted (eg: the _flags_ argument to `STORE`) then enclose the string in parentheses (eg: `r'(\Deleted)'`). In general, pass arguments unquoted and let the module quote them as needed. An argument that is already enclosed in double quotes is left unchanged, so that code which quotes arguments itself keeps working.

大多数命令均返回一个元组: `(type, [data, ...])` 其中 _type_ 通常为 `'OK'` 或 `'NO'`，而 _data_ 为来自命令响应的文本，或为来自命令的规定结果。 每个 _data_ 均为 `bytes` 或者元组。 如果为元组，则其第一部分是响应的标头，而第二部分将包含数据（例如：'literal' 值）。

以下命令的 _message\_set_ 选项为指定要操作的一条或多条消息的字符串。 它可以是一个简单的消息编号 (`'1'`)，一段消息编号区间 (`'2:4'`)，或者一组以逗号分隔的非连续区间 (`'1:3,6:9'`)。 区间可以包含一个星号来表示无限的上界 (`'3:*'`)。

[`IMAP4`](#imaplib.IMAP4 "imaplib.IMAP4") 实例具有下列方法:

IMAP4.append(_mailbox_, _flags_, _date\_time_, _message_)[¶](#imaplib.IMAP4.append "Link to this definition")

将 _message_ 添加到指定的邮箱。

_flags_ may be `None` or a string of IMAP flag tokens. Multiple flags are separated by spaces, for example `r'\Seen \Answered'`. If _flags_ is not already enclosed in parentheses, parentheses are added automatically.

IMAP4.authenticate(_mechanism_, _authobject_)[¶](#imaplib.IMAP4.authenticate "Link to this definition")

认证命令 --- 要求对响应进行处理。

_mechanism_ 指明要使用哪种认证机制 —— 它应当在实例变量 `capabilities` 中以 `AUTH=mechanism` 的形式出现。

_authobject_ 必须是一个可调用对象:

data \= authobject(response)

它将被调用以便处理服务器连续响应；传给它的 _response_ 参数将为 `bytes` 类型。 它应当返回 base64 编码的 `bytes` _数据_ 并发送给服务器。 或者在客户端中止响应时返回 `None` 并应改为发送 `*`。

在 3.5 版本发生变更: 字符串形式的用户名和密码现在会被执行 `utf-8` 编码而不限于 ASCII 字符。

IMAP4.check()[¶](#imaplib.IMAP4.check "Link to this definition")

为服务器上的邮箱设置检查点。

IMAP4.close()[¶](#imaplib.IMAP4.close "Link to this definition")

关闭当前选定的邮箱。 已删除的消息会从可写邮箱中被移除。 在 `LOGOUT` 之前建议执行此命令。

IMAP4.copy(_message\_set_, _new\_mailbox_)[¶](#imaplib.IMAP4.copy "Link to this definition")

将 _message\_set_ 消息拷贝到 _new\_mailbox_ 的末尾。

IMAP4.create(_mailbox_)[¶](#imaplib.IMAP4.create "Link to this definition")

新建名为 _mailbox_ 的新邮箱。

IMAP4.delete(_mailbox_)[¶](#imaplib.IMAP4.delete "Link to this definition")

删除名为 _mailbox_ 的旧邮箱。

IMAP4.deleteacl(_mailbox_, _who_)[¶](#imaplib.IMAP4.deleteacl "Link to this definition")

删除邮箱上某人的 ACL (移除任何权限)。

IMAP4.enable(_capability_)[¶](#imaplib.IMAP4.enable "Link to this definition")

启用 _capability_ (参见 [**RFC 5161**](https://datatracker.ietf.org/doc/html/rfc5161.html))。 大多数功能都不需要被启用。 目前只有 `UTF8=ACCEPT` 功能受到支持 (参见 [**RFC 6855**](https://datatracker.ietf.org/doc/html/rfc6855.html))。

Added in version 3.5: [`enable()`](#imaplib.IMAP4.enable "imaplib.IMAP4.enable") 方法本身，以及 [**RFC 6855**](https://datatracker.ietf.org/doc/html/rfc6855.html) 支持。

IMAP4.expunge()[¶](#imaplib.IMAP4.expunge "Link to this definition")

从选定的邮箱中永久移除被删除的条目。 为每条被删除的消息各生成一个 `EXPUNGE` 响应。 返回包含按接收时间排序的 `EXPUNGE` 消息编号的列表。

IMAP4.fetch(_message\_set_, _message\_parts_)[¶](#imaplib.IMAP4.fetch "Link to this definition")

获取消息（的各个部分）。 _message\_parts_ 应为加圆括号的消息部分名称字符串，例如: `"(UID BODY[TEXT])"`。 返回的数据是由消息部分封包和数据组成的元组。

IMAP4.getacl(_mailbox_)[¶](#imaplib.IMAP4.getacl "Link to this definition")

获取 _mailbox_ 的 `ACL`。 此方法是非标准的，但是被 `Cyrus` 服务器所支持。

IMAP4.getannotation(_mailbox_, _entry_, _attribute_)[¶](#imaplib.IMAP4.getannotation "Link to this definition")

提取 _mailbox_ 的特定 `ANNOTATION`。 此方法是非标准的，但是被 `Cyrus` 服务器所支持。

IMAP4.getquota(_root_)[¶](#imaplib.IMAP4.getquota "Link to this definition")

获取 `quota` _root_ 的资源使用和限制。 此方法是 rfc2087 定义的 IMAP4 QUOTA 扩展的组成部分。

IMAP4.getquotaroot(_mailbox_)[¶](#imaplib.IMAP4.getquotaroot "Link to this definition")

获取指定 _mailbox_ 的 `quota` `roots` 列表。 此方法是 rfc2087 定义的 IMAP4 QUOTA 扩展的组成部分。

IMAP4.idle(_duration\=None_)[¶](#imaplib.IMAP4.idle "Link to this definition")

返回一个 `Idler`: 即实现了在 [**RFC 2177**](https://datatracker.ietf.org/doc/html/rfc2177.html) 中定义的 IMAP4 `IDLE` 命令的可迭代上下文管理器。

返回的对象将在被 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句激活时发送 `IDLE` 命令，通过 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator) 协议产生 IMAP 不带标签的响应，并在上下文退出时发送 `DONE`。

所有在发送 `IDLE` 命令之后到达的无标签响应（包括任何在服务器接受该命令之前已到达的）都可通过迭代来获取。 任何剩余的响应（未在 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 上下文中被迭代的）可在 `IDLE` 结束之后，使用 [`IMAP4.response()`](#imaplib.IMAP4.response "imaplib.IMAP4.response") 以通常的方式来获取。

响应表示为 `(type, [data, ...])` 元组，如 [IMAP4 对象](#imap4-objects) 中所述。

_duration_ 参数设置了保持空闲的最大持续时间（以秒为单位），在此之后任何正在进行的迭代都将停止。它可以是 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 或 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")，或者没有时间限制的 `None`。 希望避免服务器上的非活动超时的调用者应该最多保持 29 分钟（1740 秒）。 需要一个套接字连接；在 [`IMAP4_stream`](#imaplib.IMAP4_stream "imaplib.IMAP4_stream") 连接上，_duration_ 必须为 `None`。

\>>> with M.idle(duration\=29 \* 60) as idler:
...     for typ, data in idler:
...         print(typ, data)
...
EXISTS \[b'1'\]
RECENT \[b'1'\]

Idler.burst(_interval\=0.1_)[¶](#imaplib.IMAP4.Idler.burst "Link to this definition")

产生间隔不超过 _interval_ 秒的突发响应 (表示为 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 或 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float"))。

此 [generator](https://docs.python.org/zh-cn/3/glossary.html#term-generator) 是一次迭代一个响应的替代方法，旨在帮助高效的批处理。 它检索下一个响应以及任何立即可用的后续响应。（例如，在批量删除后的一系列快速 `EXPUNGE` 响应。）

需要一个套接字连接；在 [`IMAP4_stream`](#imaplib.IMAP4_stream "imaplib.IMAP4_stream") 连接上不起作用。

\>>> with M.idle() as idler:
...     \# 在小于0.1秒的时间内获得响应和其他后续
...     batch \= list(idler.burst())
...     print(f'正在处理 {len(batch)} 个响应...')
...     print(batch)
...
正在处理 3 个响应...
\[('EXPUNGE', \[b'2'\]), ('EXPUNGE', \[b'1'\]), ('RECENT', \[b'0'\])\]

小技巧

当等待突发中的第一个响应时，会遵守传递给 [`IMAP4.idle()`](#imaplib.IMAP4.idle "imaplib.IMAP4.idle") 的 `IDLE` 上下文最大持续时间。 因此，一个过期的 `Idler` 将导致此生成器立即返回而不产生任何东西。 如果在循环中使用它，调用者应该考虑这一点。

备注

[`IMAP4.idle()`](#imaplib.IMAP4.idle "imaplib.IMAP4.idle") 返回的迭代器仅在 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句中可用。 在该上下文之前或之后，当命令完成时，就会在内部收集未经请求的响应，并且可以使用 [`IMAP4.response()`](#imaplib.IMAP4.response "imaplib.IMAP4.response") 进行检索。

备注

`Idler` 类的名称和结构是内部接口，可能会发生变化。 调用代码可以依赖其上下文管理、迭代和公共方法来保持稳定，但不应该子类化、实例化、比较或以其他方式直接引用该类。

Added in version 3.14.

IMAP4.list(_directory\=''_, _pattern\='\*'_)[¶](#imaplib.IMAP4.list "Link to this definition")

列出 _directory_ 中与 _pattern_ 相匹配的邮箱名称。 _directory_ 默认为最高层级的电邮文件夹，而 _pattern_ 默认为匹配任何文本。 返回的数据包含 `LIST` 响应列表。

IMAP4.login(_user_, _password_)[¶](#imaplib.IMAP4.login "Link to this definition")

使用纯文本密码标识客户端。 _password_ 将被转码。

IMAP4.login\_cram\_md5(_user_, _password_)[¶](#imaplib.IMAP4.login_cram_md5 "Link to this definition")

在标识用户以保护密码时强制使用 `CRAM-MD5` 认证。 将只在服务器 `CAPABILITY` 响应包含 `AUTH=CRAM-MD5` 短语时才有效。

在 3.14 版本发生变更: 如果 MD5 支持不可用则会引发 [`IMAP4.error`](#imaplib.IMAP4.error "imaplib.IMAP4.error")。

IMAP4.logout()[¶](#imaplib.IMAP4.logout "Link to this definition")

关闭对服务器的连接。 返回服务器 `BYE` 响应。

在 3.8 版本发生变更: 此方法不会再静默地忽略任意异常。

IMAP4.lsub(_directory\=''_, _pattern\='\*'_)[¶](#imaplib.IMAP4.lsub "Link to this definition")

列出 _directory_ 中已订阅的与 _pattern_ 相匹配的邮箱名称。 _directory_ 默认为最高层级目录而 _pattern_ 默认为匹配任何邮箱。 返回的数据为消息部分封包和数据的元组。

IMAP4.myrights(_mailbox_)[¶](#imaplib.IMAP4.myrights "Link to this definition")

显示某个邮箱的本人 ACL (即本人在邮箱中的权限)。

IMAP4.namespace()[¶](#imaplib.IMAP4.namespace "Link to this definition")

返回 [**RFC 2342**](https://datatracker.ietf.org/doc/html/rfc2342.html) 中定义的 IMAP 命名空间。

IMAP4.noop()[¶](#imaplib.IMAP4.noop "Link to this definition")

将 `NOOP` 发送给服务器。

IMAP4.open(_host_, _port_, _timeout\=None_)[¶](#imaplib.IMAP4.open "Link to this definition")

打开连接到 _host_ 上 _port_ 的套接字。 可选的 _timeout_ 形参指定连接尝试的超时秒数。 如果超时值未给出或为 `None`，则会使用全局默认的套接字超时。 另外请注意如果 _timeout_ 形参被设为零，它将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 以拒绝创建非阻塞套接字。 此方法会由 [`IMAP4`](#imaplib.IMAP4 "imaplib.IMAP4") 构造器隐式地调用。 此方法所建立的连接对象将在 [`IMAP4.read()`](#imaplib.IMAP4.read "imaplib.IMAP4.read"), [`IMAP4.readline()`](#imaplib.IMAP4.readline "imaplib.IMAP4.readline"), [`IMAP4.send()`](#imaplib.IMAP4.send "imaplib.IMAP4.send") 和 [`IMAP4.shutdown()`](#imaplib.IMAP4.shutdown "imaplib.IMAP4.shutdown") 等方法中被使用。 你可以重写此方法。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `imaplib.open` 并附带参数 `self`, `host`, `port`。

在 3.9 版本发生变更: 加入 _timeout_ 参数。

IMAP4.partial(_message\_num_, _message\_part_, _start_, _length_)[¶](#imaplib.IMAP4.partial "Link to this definition")

获取消息被截断的部分。 返回的数据是由消息部分封包和数据组成的元组。

IMAP4.proxyauth(_user_)[¶](#imaplib.IMAP4.proxyauth "Link to this definition")

作为 _user_ 进行认证。 允许经权限的管理员通过代理进入任意用户的邮箱。

IMAP4.read(_size_)[¶](#imaplib.IMAP4.read "Link to this definition")

从远程服务器读取 _size_ 字节。 你可以重写此方法。

IMAP4.readline()[¶](#imaplib.IMAP4.readline "Link to this definition")

从远程服务器读取一行。 你可以重写此方法。

IMAP4.recent()[¶](#imaplib.IMAP4.recent "Link to this definition")

提示服务器进行更新。 如果没有新消息则返回的数据为 `None`，否则为 `RECENT` 响应的值。

IMAP4.rename(_oldmailbox_, _newmailbox_)[¶](#imaplib.IMAP4.rename "Link to this definition")

将名为 _oldmailbox_ 的邮箱重命名为 _newmailbox_。

IMAP4.response(_code_)[¶](#imaplib.IMAP4.response "Link to this definition")

如果收到响应 _code_ 则返回其数据，否则返回 `None`。 返回给定的代码，而不是普通的类型。

IMAP4.search(_charset_, _criterion_\[, _..._\])[¶](#imaplib.IMAP4.search "Link to this definition")

在邮箱中搜索匹配的消息。 _charset_ 可以为 `None`，在这种情况下在发给服务器的请求中将不指定 `CHARSET`。 IMAP 协议要求至少指定一个标准；当服务器返回错误时将会引发异常。 _charset_ 为 `None` 对应使用 [`enable()`](#imaplib.IMAP4.enable "imaplib.IMAP4.enable") 命令启用了 `UTF8=ACCEPT` 功能的情况。

示例:

\# M 是一个已连接的 IMAP4 实例...
typ, msgnums \= M.search(None, 'FROM', '"LDJ"')

\# 或者：
typ, msgnums \= M.search(None, '(FROM "LDJ")')

IMAP4.select(_mailbox\='INBOX'_, _readonly\=False_)[¶](#imaplib.IMAP4.select "Link to this definition")

选择一个邮箱。 返回的数据是 _mailbox_ 中消息的数量 (`EXISTS` 响应)。 默认的 _mailbox_ 为 `'INBOX'`。 如果设置了 _readonly_ 旗标，则不允许修改该邮箱。

IMAP4.send(_data_)[¶](#imaplib.IMAP4.send "Link to this definition")

将 `data` 发送给远程服务器。 你可以重写此方法。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `imaplib.send` 并附带参数 `self`, `data`。

IMAP4.setacl(_mailbox_, _who_, _what_)[¶](#imaplib.IMAP4.setacl "Link to this definition")

设置 _mailbox_ 的 `ACL`。 此方法是非标准的，但是被 `Cyrus` 服务器所支持。

IMAP4.setannotation(_mailbox_, _entry_, _attribute_\[, _..._\])[¶](#imaplib.IMAP4.setannotation "Link to this definition")

设置 _mailbox_ 的 `ANNOTATION`。 此方法是非标准的，但是被 `Cyrus` 服务器所支持。

IMAP4.setquota(_root_, _limits_)[¶](#imaplib.IMAP4.setquota "Link to this definition")

设置 `quota` _root_ 的资源限制为 _limits_。 此方法是 rfc2087 定义的 IMAP4 QUOTA 扩展的组成部分。

IMAP4.shutdown()[¶](#imaplib.IMAP4.shutdown "Link to this definition")

关闭在 `open` 中建立的连接。 此方法会由 [`IMAP4.logout()`](#imaplib.IMAP4.logout "imaplib.IMAP4.logout") 隐式地调用。 你可以重写此方法。

IMAP4.socket()[¶](#imaplib.IMAP4.socket "Link to this definition")

返回用于连接服务器的套接字实例。

IMAP4.sort(_sort\_criteria_, _charset_, _search\_criterion_\[, _..._\])[¶](#imaplib.IMAP4.sort "Link to this definition")

`sort` 命令是 `search` 的变化形式，带有结果排序语句。 返回的数据包含以空格分隔的匹配消息编号列表。

sort 命令在 _search\_criterion_ 参数之前还有两个参数；一个带圆括号的 _sort\_criteria_ 列表，和搜索的 _charset_。 请注意不同于 `search`，搜索的 _charset_ 参数是强制性的。 还有一个 `uid sort` 命令与 `sort` 对应，如同 `uid search` 与 `search` 对应一样。 `sort` 命令首先在邮箱中搜索匹配给定搜索条件的消息，使用 charset 参数来解读搜索条件中的字符串。 然后它将返回所匹配消息的编号。

这是一个 `IMAP4rev1` 扩展命令。

IMAP4.starttls(_ssl\_context\=None_)[¶](#imaplib.IMAP4.starttls "Link to this definition")

发送一个 `STARTTLS` 命令。 _ssl\_context_ 参数是可选的并且应为一个 [`ssl.SSLContext`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.SSLContext "ssl.SSLContext") 对象。 这将在 IMAP 连接上启用加密。 请阅读 [安全考量](https://docs.python.org/zh-cn/3/library/ssl.html#ssl-security) 来了解最佳实践。

备注

With the default _ssl\_context_, the connection is encrypted but the server certificate and hostname are not verified. To verify them, pass a context created by [`ssl.create_default_context()`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.create_default_context "ssl.create_default_context").

Added in version 3.2.

IMAP4.status(_mailbox_, _names_)[¶](#imaplib.IMAP4.status "Link to this definition")

针对 _mailbox_ 请求指定的状态条件。

IMAP4.store(_message\_set_, _command_, _flag\_list_)[¶](#imaplib.IMAP4.store "Link to this definition")

Alters flag dispositions for messages in mailbox. _command_ is specified by section 6.4.6 of [**RFC 3501**](https://datatracker.ietf.org/doc/html/rfc3501.html) as being one of "FLAGS", "+FLAGS", or "-FLAGS", optionally with a suffix of ".SILENT".

例如，要在所有消息上设置删除旗标:

typ, data \= M.search(None, 'ALL')
for num in data\[0\].split():
   M.store(num, '+FLAGS', '\\\\Deleted')
M.expunge()

备注

Creating flags containing '\]' (for example: "\[test\]") violates [**RFC 3501**](https://datatracker.ietf.org/doc/html/rfc3501.html) (the IMAP protocol). However, imaplib has historically allowed creation of such flags, and popular IMAP servers, such as Gmail, accept and produce such flags. There are non-Python programs which also create such flags. Although it is an RFC violation and IMAP clients and servers are supposed to be strict, imaplib still continues to allow such flags to be created for backward compatibility reasons, and as of Python 3.6, handles them if they are sent from the server, since this improves real-world compatibility.

IMAP4.subscribe(_mailbox_)[¶](#imaplib.IMAP4.subscribe "Link to this definition")

订阅新邮箱。

IMAP4.thread(_threading\_algorithm_, _charset_, _search\_criterion_\[, _..._\])[¶](#imaplib.IMAP4.thread "Link to this definition")

`thread` 命令是 `search` 的变化形式，带有针对结果的消息串句法。 返回的数据包含以空格分隔的消息串成员列表。

消息串成员由零个或多个消息编号组成，以空格分隔，标示了连续的上下级关系。

Thread 命令在 _search\_criterion_ 参数之前还有两个参数；一个 _threading\_algorithm_，以及搜索使用的 _charset_。 请注意不同于 `search`，搜索使用的 _charset_ 参数是强制性的。 还有一个 `uid thread` 命令与 `thread` 对应，如同 `uid search` 与 `search` 对应一样。 `thread` 命令首先在邮箱中搜索匹配给定搜索条件的消息，使用 _charset_ 参数来解读搜索条件中的字符串。 然后它将按照指定的消息串算法返回所匹配的消息串。

这是一个 `IMAP4rev1` 扩展命令。

IMAP4.uid(_command_, _arg_\[, _..._\])[¶](#imaplib.IMAP4.uid "Link to this definition")

执行 command arg 并附带用 UID 所标识的消息，而不是用消息编号。 返回与命令对应的响应。 必须至少提供一个参数；如果不提供任何参数，服务器将返回错误并引发异常。

IMAP4.unsubscribe(_mailbox_)[¶](#imaplib.IMAP4.unsubscribe "Link to this definition")

取消订阅原有邮箱。

IMAP4.unselect()[¶](#imaplib.IMAP4.unselect "Link to this definition")

[`imaplib.IMAP4.unselect()`](#imaplib.IMAP4.unselect "imaplib.IMAP4.unselect") 会释放关联到选定邮箱的服务器资源并将服务器返回到已认证状态。 此命令会执行与 [`imaplib.IMAP4.close()`](#imaplib.IMAP4.close "imaplib.IMAP4.close") 相同的动作，区别在于它不会从当前选定邮箱中永久性地移除消息。

Added in version 3.9.

IMAP4.xatom(_name_\[, _..._\])[¶](#imaplib.IMAP4.xatom "Link to this definition")

允许服务器在 `CAPABILITY` 响应中通知简单的扩展命令。

在 [`IMAP4`](#imaplib.IMAP4 "imaplib.IMAP4") 的实例上定义了下列属性:

IMAP4.capabilities[¶](#imaplib.IMAP4.capabilities "Link to this definition")

A tuple of the capabilities advertised by the server, in upper case.

It is set when the connection is established, and refreshed after a successful [`login()`](#imaplib.IMAP4.login "imaplib.IMAP4.login"), [`authenticate()`](#imaplib.IMAP4.authenticate "imaplib.IMAP4.authenticate") or [`starttls()`](#imaplib.IMAP4.starttls "imaplib.IMAP4.starttls"), because the server can advertise different capabilities in different connection states.

在 3.14.7 版本发生变更: Refreshed after [`login()`](#imaplib.IMAP4.login "imaplib.IMAP4.login") and [`authenticate()`](#imaplib.IMAP4.authenticate "imaplib.IMAP4.authenticate").

IMAP4.PROTOCOL\_VERSION[¶](#imaplib.IMAP4.PROTOCOL_VERSION "Link to this definition")

在服务器的 `CAPABILITY` 响应中最新的受支持协议。

IMAP4.debug[¶](#imaplib.IMAP4.debug "Link to this definition")

控制调试输出的整数值。 初始值会从模块变量 `Debug` 中获取。 大于三的值表示将追踪每一条命令。

IMAP4.utf8\_enabled[¶](#imaplib.IMAP4.utf8_enabled "Link to this definition")

通常为 `False` 的布尔值，但也可以被设为 `True`，如果成功地为 `UTF8=ACCEPT` 功能发送了 [`enable()`](#imaplib.IMAP4.enable "imaplib.IMAP4.enable") 命令的话。

Added in version 3.5.

## IMAP4 示例[¶](#imap4-example "Link to this heading")

以下是一个最短示例（不带错误检查），该示例将打开邮箱，检索并打印所有消息:

import getpass, imaplib

M \= imaplib.IMAP4(host\='example.org')
M.login(getpass.getuser(), getpass.getpass())
M.select()
typ, data \= M.search(None, 'ALL')
for num in data\[0\].split():
    typ, data \= M.fetch(num, '(RFC822)')
    print('Message %s\\n%s\\n' % (num, data\[0\]\[1\]))
M.close()
M.logout()

备注

A `FETCH` response may contain additional or unsolicited data (see [**RFC 3501**](https://datatracker.ietf.org/doc/html/rfc3501.html), section 7.4.2), so production code should inspect the whole response rather than rely on `data[0][1]`.
