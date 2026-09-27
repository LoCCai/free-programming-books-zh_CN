**源代码：** [Lib/smtplib.py](https://github.com/python/cpython/tree/3.14/Lib/smtplib.py)

* * *

`smtplib` 模块定义了一个 SMTP 客户端会话对象，该对象可被用来向任何具有 SMTP 或 ESMTP 监听守护程序的互联网机器发送邮件。 有关 SMTP 和 ESMTP 操作的详情，请参阅 [**RFC 821**](https://datatracker.ietf.org/doc/html/rfc821.html) (简单邮件传输协议) 和 [**RFC 1869**](https://datatracker.ietf.org/doc/html/rfc1869.html) (SMTP 服务扩展)。

_class_ smtplib.SMTP(_host=''_, _port=0_, _local\_hostname=None_, \[_timeout_, \]_source\_address=None_)[¶](#smtplib.SMTP "Link to this definition")

An [`SMTP`](#smtplib.SMTP "smtplib.SMTP") instance encapsulates an SMTP connection. It has methods that support a full repertoire of SMTP and ESMTP operations. If the optional _host_ and _port_ parameters are given, the SMTP [`connect()`](#smtplib.SMTP.connect "smtplib.SMTP.connect") method is called with those parameters during initialization. If specified, _local\_hostname_ is used as the FQDN of the local host in the HELO/EHLO command. Otherwise, the local hostname is found using [`socket.getfqdn()`](https://docs.python.org/zh-cn/3/library/socket.html#socket.getfqdn "socket.getfqdn"). If the `connect()` call returns anything other than a success code, an [`SMTPConnectError`](#smtplib.SMTPConnectError "smtplib.SMTPConnectError") is raised. The optional _timeout_ parameter specifies a timeout in seconds for blocking operations like the connection attempt (if not specified, the global default timeout setting will be used). If the timeout expires, [`TimeoutError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TimeoutError "TimeoutError") is raised. The optional _source\_address_ parameter allows binding to some specific source address in a machine with multiple network interfaces, and/or to some specific source TCP port. It takes a 2-tuple `(host, port)`, for the socket to bind to as its source address before connecting. If omitted (or if _host_ or _port_ are `''` and/or `0` respectively) the OS default behavior will be used.

正常使用时，只需要初始化或 connect 方法，[`sendmail()`](#smtplib.SMTP.sendmail "smtplib.SMTP.sendmail") 方法，再加上 [`SMTP.quit()`](#smtplib.SMTP.quit "smtplib.SMTP.quit") 方法即可。下文包括了一个示例。

[`SMTP`](#smtplib.SMTP "smtplib.SMTP") 类支持 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句。当这样使用时，`with` 语句一退出就会自动发出 SMTP `QUIT` 命令。例如:

\>>> from smtplib import SMTP
\>>> with SMTP("domain.org") as smtp:
...     smtp.noop()
...
(250, b'Ok')
\>>>

所有命令都会引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `smtplib.SMTP.send`，附带参数 `self` 和 `data`，其中 `data` 是即将发送到远程主机的字节串。

在 3.3 版本发生变更: 添加了对 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句的支持。

在 3.3 版本发生变更: 添加了 _source\_address_ 参数。

Added in version 3.5: 现在已支持 SMTPUTF8 扩展 ([**RFC 6531**](https://datatracker.ietf.org/doc/html/rfc6531.html))。

在 3.9 版本发生变更: 如果 _timeout_ 参数设置为 0，创建非阻塞套接字时，它将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 来阻止该操作。

_class_ smtplib.SMTP\_SSL(_host=''_, _port=0_, _local\_hostname=None_, _\*_, \[_timeout_, \]_context=None_, _source\_address=None_)[¶](#smtplib.SMTP_SSL "Link to this definition")

An `SMTP_SSL` instance behaves exactly the same as instances of [`SMTP`](#smtplib.SMTP "smtplib.SMTP"). `SMTP_SSL` should be used for situations where SSL is required from the beginning of the connection and using [`starttls()`](#smtplib.SMTP.starttls "smtplib.SMTP.starttls") is not appropriate. If _host_ is not specified, the local host is used. If _port_ is zero, the standard SMTP-over-SSL port (465) is used. The optional arguments _local\_hostname_, _timeout_ and _source\_address_ have the same meaning as they do in the `SMTP` class. _context_, also optional, can contain a [`SSLContext`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.SSLContext "ssl.SSLContext") and allows configuring various aspects of the secure connection. Please read [安全考量](https://docs.python.org/zh-cn/3/library/ssl.html#ssl-security) for best practices.

在 3.3 版本发生变更: 增加了 _context_。

在 3.3 版本发生变更: 添加了 _source\_address_ 参数。

在 3.9 版本发生变更: 如果 _timeout_ 形参被设为零，则它将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 来阻止创建非阻塞的套接字

在 3.12 版本发生变更: 已弃用的 _keyfile_ 和 _certfile_ 形参已被移除。

_class_ smtplib.LMTP(_host=''_, _port=LMTP\_PORT_, _local\_hostname=None_, _source\_address=None_\[, _timeout_\])[¶](#smtplib.LMTP "Link to this definition")

LMTP 协议与 ESMTP 非常相似，它很大程度上基于标准 SMTP 客户端。将 Unix 套接字用于 LMTP 是很常见的，因此我们的 [`connect()`](#smtplib.SMTP.connect "smtplib.SMTP.connect") 方法必须支持它以及常规的 host:port 服务器。可选参数 _local\_hostname_ 和 _source\_address_ 的含义与它们在 [`SMTP`](#smtplib.SMTP "smtplib.SMTP") 类中的相同。要指定 Unix 套接字，你必须使用绝对路径作为 _host_，即以 '/' 打头。

支持使用常规的 SMTP 机制来进行认证。当使用 Unix 套接字时，LMTP 通常不支持或要求任何认证，但你的情况可能会有所不同。

在 3.9 版本发生变更: 添加了可选的 _timeout_ 形参。

同样地定义了一组精心选择的异常：

_exception_ smtplib.SMTPException[¶](#smtplib.SMTPException "Link to this definition")

[`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 的子类，它是本模块提供的所有其他异常的基类。

在 3.4 版本发生变更: SMTPException 已成为 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 的子类

_exception_ smtplib.SMTPServerDisconnected[¶](#smtplib.SMTPServerDisconnected "Link to this definition")

当服务器意外断开连接，或在 [`SMTP`](#smtplib.SMTP "smtplib.SMTP") 实例连接到服务器之前尝试使用它时将引发此异常。

_exception_ smtplib.SMTPResponseException[¶](#smtplib.SMTPResponseException "Link to this definition")

包括 SMTP 错误代码的所有异常的基类。这些异常会在某些情况下当 SMTP 服务器返回错误代码时生成。

smtp\_code[¶](#smtplib.SMTPResponseException.smtp_code "Link to this definition")

错误代码。

smtp\_error[¶](#smtplib.SMTPResponseException.smtp_error "Link to this definition")

错误消息。

_exception_ smtplib.SMTPSenderRefused[¶](#smtplib.SMTPSenderRefused "Link to this definition")

发送方地址被拒绝。除了在所有 [`SMTPResponseException`](#smtplib.SMTPResponseException "smtplib.SMTPResponseException") 异常上设置的属性，还会将 'sender' 设为 SMTP 服务器所拒绝的字符串。

_exception_ smtplib.SMTPRecipientsRefused[¶](#smtplib.SMTPRecipientsRefused "Link to this definition")

所有接收方地址已被拒绝。

recipients[¶](#smtplib.SMTPRecipientsRefused.recipients "Link to this definition")

一个字典，与 [`SMTP.sendmail()`](#smtplib.SMTP.sendmail "smtplib.SMTP.sendmail") 所返回的字典类型完全相同，包含关于每个收件人的错误。

_exception_ smtplib.SMTPDataError[¶](#smtplib.SMTPDataError "Link to this definition")

SMTP 服务器拒绝接收消息数据。

_exception_ smtplib.SMTPConnectError[¶](#smtplib.SMTPConnectError "Link to this definition")

在建立与服务器的连接期间发生了错误。

_exception_ smtplib.SMTPHeloError[¶](#smtplib.SMTPHeloError "Link to this definition")

服务器拒绝了我们的 `HELO` 消息。

_exception_ smtplib.SMTPNotSupportedError[¶](#smtplib.SMTPNotSupportedError "Link to this definition")

尝试的命令或选项不被服务器所支持。

Added in version 3.5.

_exception_ smtplib.SMTPAuthenticationError[¶](#smtplib.SMTPAuthenticationError "Link to this definition")

SMTP 认证出现问题。最大的可能是服务器不接受所提供的用户名/密码组合。

参见

[**RFC 821**](https://datatracker.ietf.org/doc/html/rfc821.html) - 简单邮件传输协议

SMTP 的协议定义。该文件涵盖了 SMTP 的模型、操作程序和协议细节。

[**RFC 1869**](https://datatracker.ietf.org/doc/html/rfc1869.html) - SMTP 服务扩展

定义了 SMTP 的 ESMTP 扩展。这描述了一个用新命令扩展 SMTP 的框架，支持动态发现服务器所提供的命令，并定义了一些额外的命令。

## SMTP 对象[¶](#smtp-objects "Link to this heading")

一个 [`SMTP`](#smtplib.SMTP "smtplib.SMTP") 实例拥有以下方法：

SMTP.set\_debuglevel(_level_)[¶](#smtplib.SMTP.set_debuglevel "Link to this definition")

设置调试输出级别。如果 _level_ 的值为 1 或 `True`，就会产生连接的调试信息，以及所有发送到服务器和从服务器接收的信息。如果 _level_ 的值为 2，则这些信息会被加上时间戳。

在 3.5 版本发生变更: 添加了调试级别 2。

SMTP.docmd(_cmd_, _args\=''_)[¶](#smtplib.SMTP.docmd "Link to this definition")

向服务器发送一条命令 _cmd_ 。可选的参数 _args_ 被简单地串联到命令中，用一个空格隔开。

这将返回一个由数字响应代码和实际响应行组成的 2 元组（多行响应被连接成一个长行）。

在正常操作中，应该没有必要明确地调用这个方法。它被用来实现其他方法，对于测试私有扩展可能很有用。

如果在等待回复的过程中，与服务器的连接丢失， [`SMTPServerDisconnected`](#smtplib.SMTPServerDisconnected "smtplib.SMTPServerDisconnected") 将被触发。

SMTP.connect(_host\='localhost'_, _port\=0_)[¶](#smtplib.SMTP.connect "Link to this definition")

连接到某个主机的某个端口。默认是连接到 localhost 的标准 SMTP 端口（25）上。如果主机名以冒号 (`':'`) 结尾，后跟数字，则该后缀将被删除，且数字将视作要使用的端口号。如果在实例化时指定了 host，则构造函数会自动调用本方法。返回包含响应码和响应消息的 2 元组，它们由服务器在其连接响应中发送。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `smtplib.connect` 并附带参数 `self`, `host`, `port`.

SMTP.helo(_name\=''_)[¶](#smtplib.SMTP.helo "Link to this definition")

使用 `HELO` 向 SMTP 服务器表明自己的身份。hostname 参数默认为本地主机的完全合格域名。服务器返回的消息被存储为对象的 [`helo_resp`](#smtplib.SMTP.helo_resp "smtplib.SMTP.helo_resp") 属性。

在正常操作中，应该没有必要明确调用这个方法。它将在必要时被 [`sendmail()`](#smtplib.SMTP.sendmail "smtplib.SMTP.sendmail") 隐式调用。

SMTP.ehlo(_name\=''_)[¶](#smtplib.SMTP.ehlo "Link to this definition")

使用 `EHLO` 向 ESMTP 服务器表明自己的身份。hostname 参数默认为本地主机的完全合格域名。检查 ESMTP 选项的响应，并存储它们供 [`has_extn()`](#smtplib.SMTP.has_extn "smtplib.SMTP.has_extn") 使用。同时设置几个信息属性：服务器返回的消息被存储为 [`ehlo_resp`](#smtplib.SMTP.ehlo_resp "smtplib.SMTP.ehlo_resp") 属性， [`does_esmtp`](#smtplib.SMTP.does_esmtp "smtplib.SMTP.does_esmtp") 根据服务器是否支持 ESMTP 被设置为 `True` 或 `False`，而 [`esmtp_features`](#smtplib.SMTP.esmtp_features "smtplib.SMTP.esmtp_features") 将是一个字典，包含这个服务器支持的 SMTP 服务扩展的名称，以及它们的参数（如果有）。

除非你想在发送邮件前使用 [`has_extn()`](#smtplib.SMTP.has_extn "smtplib.SMTP.has_extn")，否则应该没有必要明确调用这个方法。它将在必要时被 [`sendmail()`](#smtplib.SMTP.sendmail "smtplib.SMTP.sendmail") 隐式调用。

SMTP.ehlo\_or\_helo\_if\_needed()[¶](#smtplib.SMTP.ehlo_or_helo_if_needed "Link to this definition")

如果这个会话中没有先前的 `EHLO` 或 `HELO` 命令，该方法会调用 [`ehlo()`](#smtplib.SMTP.ehlo "smtplib.SMTP.ehlo") 和/或 [`helo()`](#smtplib.SMTP.helo "smtplib.SMTP.helo") 。它首先尝试 ESMTP `EHLO`。

[`SMTPHeloError`](#smtplib.SMTPHeloError "smtplib.SMTPHeloError")

服务器没有正确回复 `HELO` 问候。

SMTP.has\_extn(_name_)[¶](#smtplib.SMTP.has_extn "Link to this definition")

如果 _name_ 在服务器返回的 SMTP 服务扩展集合中，返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")，否则为 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False")。大小写被忽略。

SMTP.verify(_address_)[¶](#smtplib.SMTP.verify "Link to this definition")

使用 SMTP `VRFY` 检查此服务器上的某个地址是否有效。如果用户地址有效则返回一个由代码 250 和完整 [**RFC 822**](https://datatracker.ietf.org/doc/html/rfc822.html) 地址（包括人名）组成的元组。否则返回 400 或更大的 SMTP 错误代码以及一个错误字符串。

备注

许多网站都禁用 SMTP `VRFY` 以阻止垃圾邮件。

SMTP.login(_user_, _password_, _\*_, _initial\_response\_ok\=True_)[¶](#smtplib.SMTP.login "Link to this definition")

登录到一个需要认证的 SMTP 服务器。参数是用于认证的用户名和密码。如果会话在之前没有执行过 `EHLO` 或 `HELO` 命令，此方法会先尝试 ESMTP `EHLO`。如果认证成功则此方法将正常返回，否则可能引发以下异常：

[`SMTPHeloError`](#smtplib.SMTPHeloError "smtplib.SMTPHeloError")

服务器没有正确回复 `HELO` 问候。

[`SMTPAuthenticationError`](#smtplib.SMTPAuthenticationError "smtplib.SMTPAuthenticationError")

服务器不接受所提供的用户名/密码组合。

[`SMTPNotSupportedError`](#smtplib.SMTPNotSupportedError "smtplib.SMTPNotSupportedError")

服务器不支持 `AUTH` 命令。

[`SMTPException`](#smtplib.SMTPException "smtplib.SMTPException")

未找到适当的认证方法。

`smtplib` 支持的每种认证方法如果被服务器声明为支持，就会依次尝试。受支持的认证方法列表参见 [`auth()`](#smtplib.SMTP.auth "smtplib.SMTP.auth")。 _initial\_response\_ok_ 会被传递给 `auth()`。

可选的关键字参数 _initial\_response\_ok_ 指定对于支持它的认证方法，是否可以与 `AUTH` 命令一起发送 [**RFC 4954**](https://datatracker.ietf.org/doc/html/rfc4954.html) 中所规定的"初始响应"，而不是要求质询/响应。

在 3.5 版本发生变更: 可能会引发 [`SMTPNotSupportedError`](#smtplib.SMTPNotSupportedError "smtplib.SMTPNotSupportedError")，并添加 _initial\_response\_ok_ 形参。

SMTP.auth(_mechanism_, _authobject_, _\*_, _initial\_response\_ok\=True_)[¶](#smtplib.SMTP.auth "Link to this definition")

为指定的认证机制 _mechanism_ 发送 `SMTP` `AUTH` 命令，并通过 _authobject_ 处理质询响应。

_mechanism_ 指定要使用何种认证机制作为 `AUTH` 命令的参数；可用的值是在 [`esmtp_features`](#smtplib.SMTP.esmtp_features "smtplib.SMTP.esmtp_features") 的 `auth` 元素中列出的内容。

_authobject_ 必须为接受一个可选的单独参数的可调用对象:

data \= authobject(challenge\=None)

如果可选的关键字参数 _initial\_response\_ok_ 为真值，则将先不带参数地调用 `authobject()`。它可以返回 [**RFC 4954**](https://datatracker.ietf.org/doc/html/rfc4954.html) "初始响应" ASCII `str`，其内容将被编码并使用下述的 `AUTH` 命令来发送。如果 `authobject()` 不支持初始响应（例如由于要求一个质询），它应当将 `None` 作为附带 `challenge=None` 调用的返回值。如果 _initial\_response\_ok_ 为假值，则 `authobject()` 将不会附带 `None` 被首先调用。

如果初始响应检测返回了 `None`，或者如果 _initial\_response\_ok_ 为假值，则将调用 `authobject()` 来处理服务器的质询响应；传递给它的 _challenge_ 参数将为一个 `bytes`。它应当返回 ASCII `str` _data_，该数据将被 base64 编码后发送给服务器。

`SMTP` 类提供的 `authobjects` 针对 `CRAM-MD5`, `PLAIN` 和 `LOGIN` 等机制；它们的名称分别是 `SMTP.auth_cram_md5`, `SMTP.auth_plain` 和 `SMTP.auth_login`。它们都要求将 `user` 和 `password` 这两个 `SMTP` 实例属性设为适当的值。

用户代码通常不需要直接调用 `auth`，而是可以调用 [`login()`](#smtplib.SMTP.login "smtplib.SMTP.login") 方法，该方法将按照上述列出的顺序依次尝试每种机制。 `auth` 被公开出来是为了便于实现 `smtplib` 尚不（或尚未）直接支持的认证方法。

Added in version 3.5.

SMTP.starttls(_\*_, _context\=None_)[¶](#smtplib.SMTP.starttls "Link to this definition")

将 SMTP 连接设为 TLS (传输层安全) 模式。后续的所有 SMTP 命令都将被加密。你应当随即再次调用 [`ehlo()`](#smtplib.SMTP.ehlo "smtplib.SMTP.ehlo")。

如果提供了 _keyfile_ 和 _certfile_，它们会被用来创建 [`ssl.SSLContext`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.SSLContext "ssl.SSLContext")。

可选的 _context_ 形参是一个 [`ssl.SSLContext`](https://docs.python.org/zh-cn/3/library/ssl.html#ssl.SSLContext "ssl.SSLContext") 对象；它是使用密钥文件和证书的替代方式，如果指定了该形参则 _keyfile_ 和 _certfile_ 都应为 `None`。

如果这个会话中没有先前的 `EHLO` 或 `HELO` 命令，该方法会首先尝试 ESMTP `EHLO`。

在 3.12 版本发生变更: 已弃用的 _keyfile_ 和 _certfile_ 形参已被移除。

[`SMTPHeloError`](#smtplib.SMTPHeloError "smtplib.SMTPHeloError")

服务器没有正确回复 `HELO` 问候。

[`SMTPNotSupportedError`](#smtplib.SMTPNotSupportedError "smtplib.SMTPNotSupportedError")

服务器不支持 STARTTLS 扩展。

[`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")

SSL/TLS 支持在你的 Python 解释器上不可用。

在 3.3 版本发生变更: 增加了 _context_。

在 3.5 版本发生变更: 因缺少 STARTTLS 支持而引发的错误现在是 [`SMTPNotSupportedError`](#smtplib.SMTPNotSupportedError "smtplib.SMTPNotSupportedError") 子类而不是 [`SMTPException`](#smtplib.SMTPException "smtplib.SMTPException") 基类。

SMTP.sendmail(_from\_addr_, _to\_addrs_, _msg_, _mail\_options\=()_, _rcpt\_options\=()_)[¶](#smtplib.SMTP.sendmail "Link to this definition")

发送邮件。需要的参数包括一个 [**RFC 822**](https://datatracker.ietf.org/doc/html/rfc822.html) 发件地址字符串，一个 [**RFC 822**](https://datatracker.ietf.org/doc/html/rfc822.html) 收件地址字符串列表（单个字符串将被视为只有 1 个地址的列表），以及一个消息字符串。调用方可以传入一个 ESMTP 选项 (如 `"8bitmime"`) 的列表在 `MAIL FROM` 命令中用作 _mail\_options_。应当与所有 `RCPT` 命令一起使用的 ESMTP 选项 (如 `DSN` 命令) 可以作为 _rcpt\_options_ 传入。每个选项都应当以包含选项完整文本的字符串的形式传入，包括任何可能的键 (例如 `"NOTIFY=SUCCESS,FAILURE"`)。 （如果你需要对不同的收件人使用不同的 ESMTP 选项那么你必须使用低层级的方法如 `mail()`, `rcpt()` 和 `data()` 来发送消息。）

备注

_from\_addr_ 和 _to\_addrs_ 形参被用来构造传输代理所使用的消息封包。`sendmail` 不会以任何方式修改消息标头。

_msg_ 可以是一个包含 ASCII 范围内字符的字符串，或是一个字节串。字符串会使用 ascii 编解码器编码为字节串，并且单独的 `\r` 和 `\n` 字符会被转换为 `\r\n` 字符序列。字节串则不会被修改。

如果在此之前本会话没有执行过 `EHLO` 或 `HELO` 命令，此方法会先尝试 ESMTP `EHLO`。如果服务器执行了 ESMTP，消息大小和每个指定的选项将被传递给它（如果指定的选项属于服务器声明的特性集）。如果 `EHLO` 失败，则将尝试 `HELO` 并屏蔽 ESMTP 选项。

如果邮件被至少一个接收方接受则此方法将正常返回。在其他情况下它将引发异常。也就是说，如果此方法没有引发异常，则应当会有人收到你的邮件。 如果此方法没有引发异常，它将返回一个字典，其中的条目对应每个拒绝的接收方。每个条目均包含由服务器发送的 SMTP 错误代码和相应错误消息所组成的元组。

如果 `SMTPUTF8` 包括在 _mail\_options_ 中，并且被服务器所支持，则 _from\_addr_ 和 _to\_addrs_ 可能包含非 ASCII 字符。

此方法可能引发以下异常：

[`SMTPRecipientsRefused`](#smtplib.SMTPRecipientsRefused "smtplib.SMTPRecipientsRefused")

所有收件人均被拒绝。不会有人收到邮件。

[`SMTPHeloError`](#smtplib.SMTPHeloError "smtplib.SMTPHeloError")

服务器没有正确回复 `HELO` 问候。

[`SMTPSenderRefused`](#smtplib.SMTPSenderRefused "smtplib.SMTPSenderRefused")

服务器不接受 _from\_addr_。

[`SMTPDataError`](#smtplib.SMTPDataError "smtplib.SMTPDataError")

服务器回复了一个意外的错误代码（而不是拒绝收件人）。

[`SMTPNotSupportedError`](#smtplib.SMTPNotSupportedError "smtplib.SMTPNotSupportedError")

在 _mail\_options_ 中给出了 `SMTPUTF8` 但是不被服务器所支持。

除非另有说明，即使在引发异常之后连接仍将被打开。

在 3.2 版本发生变更: _msg_ 可以为字节串。

在 3.5 版本发生变更: 增加了 `SMTPUTF8` 支持，并且如果指定了 `SMTPUTF8` 但是不被服务器所支持则可能会引发 [`SMTPNotSupportedError`](#smtplib.SMTPNotSupportedError "smtplib.SMTPNotSupportedError").

SMTP.send\_message(_msg_, _from\_addr\=None_, _to\_addrs\=None_, _mail\_options\=()_, _rcpt\_options\=()_)[¶](#smtplib.SMTP.send_message "Link to this definition")

本方法是一种快捷方法，用于带着消息调用 [`sendmail()`](#smtplib.SMTP.sendmail "smtplib.SMTP.sendmail")，消息由 [`email.message.Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") 对象表示。参数的含义与 `sendmail()` 中的相同，除了 _msg_，它是一个 `Message` 对象。

如果 _from\_addr_ 为 `None` 或 _to\_addrs_ 为 `None`，那么 `send_message` 将根据 [**RFC 5322**](https://datatracker.ietf.org/doc/html/rfc5322.html)，从 _msg_ 头部提取地址填充下列参数：如果头部存在 字段，则用它填充 _from\_addr_，不存在则用 字段填充 _from\_addr_。_to\_addrs_ 组合了 _msg_ 中的 , 和 字段的值（字段存在的情况下）。如果一组 头部恰好出现在 message 中，那么就忽略常规的头部，改用 头部。如果 message 包含多组 头部，则引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")，因为无法明确检测出哪一组 头部是最新的。

`send_message` 使用 [`BytesGenerator`](https://docs.python.org/zh-cn/3/library/email.generator.html#email.generator.BytesGenerator "email.generator.BytesGenerator") 来序列化 _msg_ 并以 `\r\n` 作为 _linesep_，然后调用 [`sendmail()`](#smtplib.SMTP.sendmail "smtplib.SMTP.sendmail") 来传输结果消息。无论 _from\_addr_ 和 _to\_addrs_ 的值是什么，`send_message` 都不会传输 _msg_ 中可能出现的 或 标头。如果 _from\_addr_ 和 _to\_addrs_ 中的任何地址包含非 ASCII 字符并且服务器没有声明 `SMTPUTF8` 支持，则会引发 [`SMTPNotSupportedError`](#smtplib.SMTPNotSupportedError "smtplib.SMTPNotSupportedError")。在其他情况下 `Message` 将克隆其 [`policy`](https://docs.python.org/zh-cn/3/library/email.policy.html#module-email.policy "email.policy: Controlling the parsing and generating of messages") 来执行序列化并将 [`utf8`](https://docs.python.org/zh-cn/3/library/email.policy.html#email.policy.EmailPolicy.utf8 "email.policy.EmailPolicy.utf8") 属性设为 `True`，且会把 `SMTPUTF8` 和 `BODY=8BITMIME` 添加到 _mail\_options_ 中。

Added in version 3.2.

Added in version 3.5: 支持国际化地址 (`SMTPUTF8`)。

SMTP.quit()[¶](#smtplib.SMTP.quit "Link to this definition")

终结 SMTP 会话并关闭连接。返回 SMTP `QUIT` 命令的结果。

与标准 SMTP/ESMTP 命令 `HELP`, `RSET`, `NOOP`, `MAIL`, `RCPT` 和 `DATA` 对应的低层级方法也是受支持的。通常不需要直接调用这些方法，因此它们没有被写入本文档。相关细节请参看模块代码。

此外，SMTP 实例还具有以下属性：

SMTP.helo\_resp[¶](#smtplib.SMTP.helo_resp "Link to this definition")

对 `HELO` 命令的响应，参见 [`helo()`](#smtplib.SMTP.helo "smtplib.SMTP.helo")。

SMTP.ehlo\_resp[¶](#smtplib.SMTP.ehlo_resp "Link to this definition")

对 `EHLO` 命令的响应，参见 [`ehlo()`](#smtplib.SMTP.ehlo "smtplib.SMTP.ehlo")。

SMTP.does\_esmtp[¶](#smtplib.SMTP.does_esmtp "Link to this definition")

指明服务器是否支持 ESMTP 的布尔值，参见 [`ehlo()`](#smtplib.SMTP.ehlo "smtplib.SMTP.ehlo")。

SMTP.esmtp\_features[¶](#smtplib.SMTP.esmtp_features "Link to this definition")

由服务器所支持的 SMTP 服务扩展名称组成的字典，参见 [`ehlo()`](#smtplib.SMTP.ehlo "smtplib.SMTP.ehlo")。

## SMTP 示例[¶](#smtp-example "Link to this heading")

这个例子提示用户输入消息封包所需的地址 ('To' 和 'From' 地址)，以及要发送的消息。 请注意包括在消息中的标头必须包括在输入的消息中；这个例子不对 [**RFC 822**](https://datatracker.ietf.org/doc/html/rfc822.html) 标头进行任何处理。具体来说，'To' 和 'From' 地址必须显式地包括在消息标头中:

import smtplib

def prompt(title):
    return input(title).strip()

from\_addr \= prompt("From: ")
to\_addrs  \= prompt("To: ").split()
print("Enter message, end with ^D (Unix) or ^Z (Windows):")

\# 在开始时添加 From: 和 To: 标头！
lines \= \[f"From: {from\_addr}", f"To: {', '.join(to\_addrs)}", ""\]
while True:
    try:
        line \= input()
    except EOFError:
        break
    else:
        lines.append(line)

msg \= "\\r\\n".join(lines)
print("Message length is", len(msg))

server \= smtplib.SMTP("localhost")
server.set\_debuglevel(1)
server.sendmail(from\_addr, to\_addrs, msg)
server.quit()
