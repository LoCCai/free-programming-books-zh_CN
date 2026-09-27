**源代码:** [Lib/email/\_\_init\_\_.py](https://github.com/python/cpython/tree/3.14/Lib/email/__init__.py)

* * *

The `email` package is a library for managing email messages. It is specifically _not_ designed to do any sending of email messages to SMTP ([**RFC 2821**](https://datatracker.ietf.org/doc/html/rfc2821.html)), NNTP, or other servers; those are functions of modules such as [`smtplib`](https://docs.python.org/zh-cn/3/library/smtplib.html#module-smtplib "smtplib: SMTP protocol client (requires sockets)."). The `email` package attempts to be as RFC-compliant as possible, supporting [**RFC 5322**](https://datatracker.ietf.org/doc/html/rfc5322.html) and [**RFC 6532**](https://datatracker.ietf.org/doc/html/rfc6532.html), as well as such MIME-related RFCs as [**RFC 2045**](https://datatracker.ietf.org/doc/html/rfc2045.html), [**RFC 2046**](https://datatracker.ietf.org/doc/html/rfc2046.html), [**RFC 2047**](https://datatracker.ietf.org/doc/html/rfc2047.html), [**RFC 2183**](https://datatracker.ietf.org/doc/html/rfc2183.html), and [**RFC 2231**](https://datatracker.ietf.org/doc/html/rfc2231.html).

email 包的总体结构可以分为三个主要组件，另外还有第四个组件用于控制其他组件的行为。

这个包的中心组件是代表电子邮件消息的“对象模型”。应用程序主要通过在 [`message`](https://docs.python.org/zh-cn/3/library/email.message.html#module-email.message "email.message: The base class representing email messages.") 子模块中定义的对象模型接口与这个包进行交互。应用程序可以使用此 API 来询问有关现有电子邮件的问题、构造新的电子邮件，或者添加或移除自身也使用相同对象模型接口的电子邮件子组件。也就是说，遵循电子邮件消息及其 MIME 子组件的性质，电子邮件对象模型是所有提供 [`EmailMessage`](https://docs.python.org/zh-cn/3/library/email.message.html#email.message.EmailMessage "email.message.EmailMessage") API 的对象所构成的树状结构。

这个包的另外两个主要组件是 [`parser`](https://docs.python.org/zh-cn/3/library/email.parser.html#module-email.parser "email.parser: Parse flat text email messages to produce a message object structure.") 和 [`generator`](https://docs.python.org/zh-cn/3/library/email.generator.html#module-email.generator "email.generator: Generate flat text email messages from a message structure.")。parser 接受电子邮件消息的序列化版本（字节流）并将其转换为 [`EmailMessage`](https://docs.python.org/zh-cn/3/library/email.message.html#email.message.EmailMessage "email.message.EmailMessage") 对象树。 generator 接受 `EmailMessage` 并将其转回序列化的字节流。 (parser 和 generator 还能处理文本字符流，但不建议这种用法，因为这很容易导致某种形式的无效消息。)

控制组件是 [`policy`](https://docs.python.org/zh-cn/3/library/email.policy.html#module-email.policy "email.policy: Controlling the parsing and generating of messages") 模块。每一个 [`EmailMessage`](https://docs.python.org/zh-cn/3/library/email.message.html#email.message.EmailMessage "email.message.EmailMessage")、每一个 [`generator`](https://docs.python.org/zh-cn/3/library/email.generator.html#module-email.generator "email.generator: Generate flat text email messages from a message structure.") 和每一个 [`parser`](https://docs.python.org/zh-cn/3/library/email.parser.html#module-email.parser "email.parser: Parse flat text email messages to produce a message object structure.") 都有一个相关联的 `policy` 对象来控制其行为。通常应用程序只有在 `EmailMessage` 被创建时才需要指明控制策略，或者通过直接实例化 `EmailMessage` 来新建电子邮件，或者通过使用 `parser` 来解析输入流。但是策略也可以在使用 `generator` 序列化消息时被更改。 例如，这允许从磁盘解析通用电子邮件消息，而在将消息发送到电子邮件服务器时使用标准 SMTP 设置对其进行序列化。

The email package does its best to hide the details of the various governing RFCs from the application. Conceptually the application should be able to treat the email message as a structured tree of Unicode text and binary attachments, without having to worry about how these are represented when serialized. In practice, however, it is often necessary to be aware of at least some of the rules governing MIME messages and their structure, specifically the names and nature of the MIME "content types" and how they identify multipart documents. For the most part this knowledge should only be required for more complex applications, and even then it should only be the high level structure in question, and not the details of how those structures are represented. Since MIME content types are used widely in modern internet software (not just email), this will be a familiar concept to many programmers.

The following sections describe the functionality of the `email` package. We start with the [`message`](https://docs.python.org/zh-cn/3/library/email.message.html#module-email.message "email.message: The base class representing email messages.") object model, which is the primary interface an application will use, and follow that with the [`parser`](https://docs.python.org/zh-cn/3/library/email.parser.html#module-email.parser "email.parser: Parse flat text email messages to produce a message object structure.") and [`generator`](https://docs.python.org/zh-cn/3/library/email.generator.html#module-email.generator "email.generator: Generate flat text email messages from a message structure.") components. Then we cover the [`policy`](https://docs.python.org/zh-cn/3/library/email.policy.html#module-email.policy "email.policy: Controlling the parsing and generating of messages") controls, which completes the treatment of the main components of the library.

接下来的三个小节会介绍这个包可能引发的异常以及 [`parser`](https://docs.python.org/zh-cn/3/library/email.parser.html#module-email.parser "email.parser: Parse flat text email messages to produce a message object structure.") 可能检测到的缺陷（即与 RFC 不相符）。然后我们会介绍 [`headerregistry`](https://docs.python.org/zh-cn/3/library/email.headerregistry.html#module-email.headerregistry "email.headerregistry: Automatic Parsing of headers based on the field name") 和 [`contentmanager`](https://docs.python.org/zh-cn/3/library/email.contentmanager.html#module-email.contentmanager "email.contentmanager: Storing and Retrieving Content from MIME Parts") 子组件，它们分别提供了用于更精细地操纵标题和载荷的工具。这两个组件除了包含使用与生成非简单消息的相关特性，还记录了它们的可扩展性 API，这将是高级应用程序所感兴趣的内容。

在此之后是一组使用之前小节所介绍的 API 的基本部分的示例。

The foregoing represent the modern (Unicode friendly) API of the email package. The remaining sections, starting with the [`Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") class, cover the legacy [`compat32`](https://docs.python.org/zh-cn/3/library/email.policy.html#email.policy.compat32 "email.policy.compat32") API that deals much more directly with the details of how email messages are represented. The `compat32` API does _not_ hide the details of the RFCs from the application, but for applications that need to operate at that level, they can be useful tools. This documentation is also relevant for applications that are still using the [`compat32`](https://docs.python.org/zh-cn/3/library/email.policy.html#email.policy.compat32 "email.policy.compat32") API for backward compatibility reasons.

Contents of the `email` package documentation:

-   [`email.message`: 表示电子邮件消息](https://docs.python.org/zh-cn/3/library/email.message.html)
-   [`email.parser`: 解析电子邮件消息](https://docs.python.org/zh-cn/3/library/email.parser.html)
    -   [FeedParser API](https://docs.python.org/zh-cn/3/library/email.parser.html#feedparser-api)
    -   [Parser API](https://docs.python.org/zh-cn/3/library/email.parser.html#parser-api)
    -   [附加说明](https://docs.python.org/zh-cn/3/library/email.parser.html#additional-notes)
-   [`email.generator`: 生成 MIME 文档](https://docs.python.org/zh-cn/3/library/email.generator.html)
-   [`email.policy`: 策略对象](https://docs.python.org/zh-cn/3/library/email.policy.html)
-   [`email.errors`: 异常和缺陷类](https://docs.python.org/zh-cn/3/library/email.errors.html)
-   [`email.headerregistry`: 自定义标头对象](https://docs.python.org/zh-cn/3/library/email.headerregistry.html)
-   [`email.contentmanager`: 管理 MIME 内容](https://docs.python.org/zh-cn/3/library/email.contentmanager.html)
    -   [内容管理器实例](https://docs.python.org/zh-cn/3/library/email.contentmanager.html#content-manager-instances)
-   [`email`: 示例](https://docs.python.org/zh-cn/3/library/email.examples.html)

旧式 API:

-   [`email.message.Message`: 使用 `compat32` API 来表示电子邮件消息](https://docs.python.org/zh-cn/3/library/email.compat32-message.html)
-   [`email.mime`: 从头创建电子邮件和 MIME 对象](https://docs.python.org/zh-cn/3/library/email.mime.html)
-   [`email.header`: 国际化标头](https://docs.python.org/zh-cn/3/library/email.header.html)
-   [`email.charset`: 表示字符集](https://docs.python.org/zh-cn/3/library/email.charset.html)
-   [`email.encoders`: 编码器](https://docs.python.org/zh-cn/3/library/email.encoders.html)
-   [`email.utils`: 杂项工具](https://docs.python.org/zh-cn/3/library/email.utils.html)
-   [`email.iterators`: 迭代器](https://docs.python.org/zh-cn/3/library/email.iterators.html)
