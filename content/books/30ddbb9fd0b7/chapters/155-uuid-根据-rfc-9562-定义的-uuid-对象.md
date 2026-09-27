**源代码：** [Lib/uuid.py](https://github.com/python/cpython/tree/3.14/Lib/uuid.py)

* * *

此模块提供不可变的 [`UUID`](#uuid.UUID "uuid.UUID") 对象 (`UUID` 类) 和 [函数](#uuid-factory-functions) 用于生成与 [**RFC 9562**](https://datatracker.ietf.org/doc/html/rfc9562.html) (取代 [**RFC 4122**](https://datatracker.ietf.org/doc/html/rfc4122.html)) 中指定的特定 UUID 版本对应的 UUID，例如 [`uuid1()`](#uuid.uuid1 "uuid.uuid1") 用于 UUID 版本 1，[`uuid3()`](#uuid.uuid3 "uuid.uuid3") 用于 UUID 版本 3，依此类推。 注意，UUID 版本 2 被故意省略了，因为它超出了 RFC 的范围。

如果你想要的只是一个唯一的ID，你可能应该调用 [`uuid1()`](#uuid.uuid1 "uuid.uuid1") 或 [`uuid4()`](#uuid.uuid4 "uuid.uuid4")。 注意 `uuid1()` 可能会损害隐私，因为它创建了一个包含计算机网络地址的UUID。 `uuid4()` 可以创建一个随机UUID。

根据底层平台的支持情况，[`uuid1()`](#uuid.uuid1 "uuid.uuid1") 可能会也可能不会返回“安全”的 UUID。 安全的 UUID 是指使用同步方法生成的 UUID，此方法可确保没有两个进程能获得相同的 UUID。 [`UUID`](#uuid.UUID "uuid.UUID") 的所有实例都有一个能够中转关于 UUID 安全性的任何信息的 [`is_safe`](#uuid.UUID.is_safe "uuid.UUID.is_safe") 属性，它可使用下列枚举：

_class_ uuid.SafeUUID[¶](#uuid.SafeUUID "Link to this definition")

Added in version 3.7.

safe[¶](#uuid.SafeUUID.safe "Link to this definition")

该UUID是由平台以多进程安全的方式生成的。

unsafe[¶](#uuid.SafeUUID.unsafe "Link to this definition")

UUID不是以多进程安全的方式生成的。

unknown[¶](#uuid.SafeUUID.unknown "Link to this definition")

该平台不提供UUID是否安全生成的信息。

_class_ uuid.UUID(_hex\=None_, _bytes\=None_, _bytes\_le\=None_, _fields\=None_, _int\=None_, _version\=None_, _\*_, _is\_safe\=SafeUUID.unknown_)[¶](#uuid.UUID "Link to this definition")

用一串 32 个十六进制数字、一串大端序 16 个字节作为 _bytes_ 参数、一串 16 个小端序字节作为 _bytes\_le_ 参数、一个由六个整数组成的元组（32 位 _time\_low_，16 位 _time\_mid_，16 位 _time\_hi\_version_，8 位 _clock\_seq\_hi\_variant_，8 位 _clock\_seq\_low_，48 位 _node_）作为 _fields_ 参数，或者一个 128 位整数作为 _int_ 参数创建一个 UUID。当给出一串十六进制数字时，大括号、连字符和 URN 前缀都是可选的。 例如，这些表达式都产生相同的 UUID:

UUID('{12345678-1234-5678-1234-567812345678}')
UUID('12345678123456781234567812345678')
UUID('urn:uuid:12345678-1234-5678-1234-567812345678')
UUID(bytes\=b'\\x12\\x34\\x56\\x78'\*4)
UUID(bytes\_le\=b'\\x78\\x56\\x34\\x12\\x34\\x12\\x78\\x56' +
              b'\\x12\\x34\\x56\\x78\\x12\\x34\\x56\\x78')
UUID(fields\=(0x12345678, 0x1234, 0x5678, 0x12, 0x34, 0x567812345678))
UUID(int\=0x12345678123456781234567812345678)

必须给出 _hex_、_bytes_、_bytes\_le_、_fields_ 或 _int_ 中的唯一一个。 _version_ 参数是可选的；如果给定，产生的UUID将根据 [**RFC 9562**](https://datatracker.ietf.org/doc/html/rfc9562.html) 设置其变体和版本号，覆盖给定的 _hex_、_bytes_、_bytes\_le_、_fields_ 或 _int_ 中的位。

UUID 对象的比较是通过比较它们的 [`UUID.int`](#uuid.UUID.int "uuid.UUID.int") 属性进行的。 与非 UUID 对象的比较会引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。

`str(uuid)` 返回一个 `12345678-1234-5678-1234-567812345678` 形式的字符串，其中 32 个十六进制数字代表 UUID。

[`UUID`](#uuid.UUID "uuid.UUID") 实例有这些只读的属性:

UUID.bytes[¶](#uuid.UUID.bytes "Link to this definition")

UUID是一个16字节的字符串（包含6个大端字节序的整数字段）。

UUID.bytes\_le[¶](#uuid.UUID.bytes_le "Link to this definition")

UUID 是一个 16 字节的字符串（其中 _time\_low_、_time\_mid_ 和 _time\_hi\_version_ 为小端字节顺序）。

UUID.fields[¶](#uuid.UUID.fields "Link to this definition")

以元组形式存放的UUID的6个整数域，有六个单独的属性和两个派生属性：

<table><tbody><tr><td><p>域</p></td><td><p>含义</p></td></tr><tr><td><dl><dt id="uuid.UUID.time_low"><span><span>UUID.</span></span><span><span>time_low</span></span><a href="#uuid.UUID.time_low" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>UUID 的前 32 位。 仅与版本 1 相关联。</p></td></tr><tr><td><dl><dt id="uuid.UUID.time_mid"><span><span>UUID.</span></span><span><span>time_mid</span></span><a href="#uuid.UUID.time_mid" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>UUID 接下来的 16 位。 仅与版本 1 相关联。</p></td></tr><tr><td><dl><dt id="uuid.UUID.time_hi_version"><span><span>UUID.</span></span><span><span>time_hi_version</span></span><a href="#uuid.UUID.time_hi_version" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>UUID 接下来的 16 位。 仅与版本 1 相关联。</p></td></tr><tr><td><dl><dt id="uuid.UUID.clock_seq_hi_variant"><span><span>UUID.</span></span><span><span>clock_seq_hi_variant</span></span><a href="#uuid.UUID.clock_seq_hi_variant" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>UUID 接下来的 8 位。 仅与版本 1 和 6 相关联。</p></td></tr><tr><td><dl><dt id="uuid.UUID.clock_seq_low"><span><span>UUID.</span></span><span><span>clock_seq_low</span></span><a href="#uuid.UUID.clock_seq_low" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>UUID 接下来的 8 位。 仅与版本 1 和 6 相关联。</p></td></tr><tr><td><dl><dt id="uuid.UUID.node"><span><span>UUID.</span></span><span><span>node</span></span><a href="#uuid.UUID.node" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>UUID 的最后 48 位。 仅与版本 1 相关联。</p></td></tr><tr><td><dl><dt id="uuid.UUID.time"><span><span>UUID.</span></span><span><span>time</span></span><a href="#uuid.UUID.time" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>对于版本1和版本6，60位时间戳表示自公历纪元（1582-10-15 00:00:00）以来的100纳秒间隔计数，或者对于版本7，48位时间戳表示自Unix纪元（1970-01-01 00:00:00）以来的毫秒数。</p></td></tr><tr><td><dl><dt id="uuid.UUID.clock_seq"><span><span>UUID.</span></span><span><span>clock_seq</span></span><a href="#uuid.UUID.clock_seq" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>14 位序列号。仅与版本 1 和 6 相关。</p></td></tr></tbody></table>

UUID.hex[¶](#uuid.UUID.hex "Link to this definition")

UUID 是一个 32 字符的小写十六进制数码字符串。

UUID.int[¶](#uuid.UUID.int "Link to this definition")

UUID是一个128位的整数。

UUID.urn[¶](#uuid.UUID.urn "Link to this definition")

在 [**RFC 9562**](https://datatracker.ietf.org/doc/html/rfc9562.html) 中规定的 URN 形式的 UUID。

UUID.variant[¶](#uuid.UUID.variant "Link to this definition")

UUID 的变体，它决定了 UUID 的内部布局。 这将是 [`RESERVED_NCS`](#uuid.RESERVED_NCS "uuid.RESERVED_NCS"), [`RFC_4122`](#uuid.RFC_4122 "uuid.RFC_4122"), [`RESERVED_MICROSOFT`](#uuid.RESERVED_MICROSOFT "uuid.RESERVED_MICROSOFT") 或 [`RESERVED_FUTURE`](#uuid.RESERVED_FUTURE "uuid.RESERVED_FUTURE") 中的一个。

UUID.version[¶](#uuid.UUID.version "Link to this definition")

UUID 版本号（1 到 8，只有当变体为 [`RFC_4122`](#uuid.RFC_4122 "uuid.RFC_4122") 时才有意义）。

在 3.14 版本发生变更: 增加了UUID版本6、7和8。

UUID.is\_safe[¶](#uuid.UUID.is_safe "Link to this definition")

一个 [`SafeUUID`](#uuid.SafeUUID "uuid.SafeUUID") 的枚举，表示平台是否以多进程安全的方式生成 UUID。

Added in version 3.7.

`uuid` 模块定义了以下函数：

uuid.getnode()[¶](#uuid.getnode "Link to this definition")

获取 48 位正整数形式的硬件地址。 第一次运行时，它可能会启动一个单独的程序，这可能会相当慢。 如果所有获取硬件地址的尝试都失败了，我们会按照 [**RFC 4122**](https://datatracker.ietf.org/doc/html/rfc4122.html) 中的建议，选择一个随机的 48 位数字，其多播位 (第一个八位组的最低有效位) 设置为 1。 “硬件地址”是指一个网络接口的 MAC 地址。 在一台有多个网络接口的机器上，全局管理的 MAC 地址 (即第一个八位组的第二个最低有效位是 _未设置的_) 将比本地管理的 MAC 地址优先，但没有其他排序保证。

在 3.7 版本发生变更: 全局管理的 MAC 地址优于本地管理的 MAC 地址，因为前者保证是全球唯一的，而后者则不是。

uuid.uuid1(_node\=None_, _clock\_seq\=None_)[¶](#uuid.uuid1 "Link to this definition")

根据 [**RFC 9562 §5.1**](https://datatracker.ietf.org/doc/html/rfc9562.html#section-5.1) ，从主机ID、序列号和当前时间生成一个UUID。

当不指定 _node_ 时，使用 [`getnode()`](#uuid.getnode "uuid.getnode") 获取 48 位正整数形式的硬件地址。 当不指定序列号 _clock\_seq_ 时，将生成一个伪随机的 14 位正整数。

如果 _node_ 或 _clock\_seq_ 超过了它们预期的位数，则只保留它们的最低有效位。

uuid.uuid3(_namespace_, _name_)[¶](#uuid.uuid3 "Link to this definition")

根据 [**RFC 9562, §5.3**](https://datatracker.ietf.org/doc/html/rfc9562.html#section-5.3)，基于命名空间标识符（这是一个 UUID）和名称（这是一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象或将使用 UTF-8 进行编码的字符串）的 MD5 哈希值来生成一个 UUID。

uuid.uuid4()[¶](#uuid.uuid4 "Link to this definition")

根据 [**RFC 9562 §5.4**](https://datatracker.ietf.org/doc/html/rfc9562.html#section-5.4) ，以加密安全的方法生成一个随机的UUID。

uuid.uuid5(_namespace_, _name_)[¶](#uuid.uuid5 "Link to this definition")

根据 [**RFC 9562, §5.5**](https://datatracker.ietf.org/doc/html/rfc9562.html#section-5.5)，基于命名空间标识符（这是一个 UUID）和名称（这是一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象或将使用 UTF-8 进行编码的字符串）的 SHA-1 哈希值来生成一个 UUID。

uuid.uuid6(_node\=None_, _clock\_seq\=None_)[¶](#uuid.uuid6 "Link to this definition")

根据 [**RFC 9562, §5.6**](https://datatracker.ietf.org/doc/html/rfc9562.html#section-5.6) ，从序列号和当前时间生成一个UUID。

这是 [`uuid1()`](#uuid.uuid1 "uuid.uuid1") 的替代方案，可以提高数据库的本地性。

当不指定 _node_ 时，使用 [`getnode()`](#uuid.getnode "uuid.getnode") 获取 48 位正整数形式的硬件地址。 当不指定序列号 _clock\_seq_ 时，将生成一个伪随机的 14 位正整数。

如果 _node_ 或 _clock\_seq_ 超过了它们预期的位数，则只保留它们的最低有效位。

Added in version 3.14.

uuid.uuid7()[¶](#uuid.uuid7 "Link to this definition")

根据 [**RFC 9562, §5.7**](https://datatracker.ietf.org/doc/html/rfc9562.html#section-5.7) ，生成一个基于时间的UUID。

为了在缺乏亚毫秒精度的平台之间实现可移植性，该函数生成的UUID嵌入了一个48位时间戳，并使用一个42位计数器来保证毫秒内的单调性。

Added in version 3.14.

uuid.uuid8(_a\=None_, _b\=None_, _c\=None_)[¶](#uuid.uuid8 "Link to this definition")

根据 [**RFC 9562, §5.8**](https://datatracker.ietf.org/doc/html/rfc9562.html#section-5.8) ，生成一个伪随机UUID。

当指定时，参数 _a_、_b_ 和 _c_ 预计分别为48、12和62位的正整数。如果它们超过了预期的位数，则只保留最低有效位；未指定参数被替换为适当大小的伪随机整数。

默认情况下，_a_、_b_ 和 _c_ 不是由加密安全伪随机数生成器（CSPRNG）生成的。当 UUID 需要在安全敏感的上下文中使用时，请使用 [`uuid4()`](#uuid.uuid4 "uuid.uuid4")。

Added in version 3.14.

`uuid` 模块定义了以下命名空间标识符，供 [`uuid3()`](#uuid.uuid3 "uuid.uuid3") 或 [`uuid5()`](#uuid.uuid5 "uuid.uuid5") 使用。

uuid.NAMESPACE\_DNS[¶](#uuid.NAMESPACE_DNS "Link to this definition")

当指定这个命名空间时，_name_ 字符串是一个完全限定的域名。

uuid.NAMESPACE\_URL[¶](#uuid.NAMESPACE_URL "Link to this definition")

当指定这个命名空间时，_name_ 字符串是一个 URL。

uuid.NAMESPACE\_OID[¶](#uuid.NAMESPACE_OID "Link to this definition")

当指定这个命名空间时，_name_ 字符串是一个 ISO OID。

uuid.NAMESPACE\_X500[¶](#uuid.NAMESPACE_X500 "Link to this definition")

当指定这个命名空间时，_name_ 字符串是 DER 或文本输出格式的 X.500 DN。

`uuid` 模块定义了以下常量作为 [`variant`](#uuid.UUID.variant "uuid.UUID.variant") 属性的可能取值：

uuid.RESERVED\_NCS[¶](#uuid.RESERVED_NCS "Link to this definition")

为NCS兼容性保留。

uuid.RFC\_4122[¶](#uuid.RFC_4122 "Link to this definition")

指定在 [**RFC 4122**](https://datatracker.ietf.org/doc/html/rfc4122.html) 中给出的 UUID 布局。即使 [**RFC 4122**](https://datatracker.ietf.org/doc/html/rfc4122.html) 已被 [**RFC 9562**](https://datatracker.ietf.org/doc/html/rfc9562.html) 取代，也保留该常量以保持向后兼容性。

uuid.RESERVED\_MICROSOFT[¶](#uuid.RESERVED_MICROSOFT "Link to this definition")

为微软的兼容性保留。

uuid.RESERVED\_FUTURE[¶](#uuid.RESERVED_FUTURE "Link to this definition")

保留给未来的定义。

`uuid` 模块定义了特殊的 Nil 和 Max UUID 值：

uuid.NIL[¶](#uuid.NIL "Link to this definition")

一种特殊形式的UUID，根据 [**RFC 9562, §5.9**](https://datatracker.ietf.org/doc/html/rfc9562.html#section-5.9) ，它被指定为将所有128位设置为零。

Added in version 3.14.

uuid.MAX[¶](#uuid.MAX "Link to this definition")

一种特殊形式的UUID，根据 [**RFC 9562, §5.10**](https://datatracker.ietf.org/doc/html/rfc9562.html#section-5.10) ，它被指定为将所有128位设置为1。

Added in version 3.14.

参见

[**RFC 9562**](https://datatracker.ietf.org/doc/html/rfc9562.html) - 通用唯一标识符（UUID）URN命名空间

本规范定义了UUID的统一资源名称空间，UUID的内部格式，以及生成UUID的方法。

## 命令行用法[¶](#command-line-usage "Link to this heading")

Added in version 3.12.

`uuid` 模块可以从命令行作为脚本执行。

python \-m uuid \[\-h\] \[\-u {uuid1,uuid3,uuid4,uuid5,uuid6,uuid7,uuid8}\] \[\-n NAMESPACE\] \[\-N NAME\]

可以接受以下选项：

\-h, \--help[¶](#cmdoption-uuid-h "Link to this definition")

显示帮助信息并退出。

\-u <uuid>[¶](#cmdoption-uuid-u "Link to this definition")

\--uuid <uuid>[¶](#cmdoption-uuid-uuid "Link to this definition")

指定要用于生成 uuid 的函数名称。 默认会使用 [`uuid4()`](#uuid.uuid4 "uuid.uuid4")。

在 3.14 版本发生变更: 允许生成UUID版本6、7和8。

\-n <namespace>[¶](#cmdoption-uuid-n "Link to this definition")

\--namespace <namespace>[¶](#cmdoption-uuid-namespace "Link to this definition")

该命名空间是一个 `UUID` 或者 `@ns` 其中 `ns` 是一个以命名空间名称来定位的知名预定义 UUID。 例如 `@dns`, `@url`, `@oid` 和 `@x500`。 仅对于 [`uuid3()`](#uuid.uuid3 "uuid.uuid3") / [`uuid5()`](#uuid.uuid5 "uuid.uuid5") 等函数是必需的。

\-N <name>[¶](#cmdoption-uuid-N "Link to this definition")

\--name <name>[¶](#cmdoption-uuid-name "Link to this definition")

用作生成 uuid 的一部分的名称。 仅对于 [`uuid3()`](#uuid.uuid3 "uuid.uuid3") / [`uuid5()`](#uuid.uuid5 "uuid.uuid5") 等函数是必需的。

\-C <num>[¶](#cmdoption-uuid-C "Link to this definition")

\--count <num>[¶](#cmdoption-uuid-count "Link to this definition")

生成 _num_ 个新的UUID。

Added in version 3.14.

## 示例[¶](#example "Link to this heading")

以下是 `uuid` 模块的一些典型用法示例:

\>>> import uuid

\>>> \# make a UUID based on the host ID and current time
\>>> uuid.uuid1()
UUID('a8098c1a-f86e-11da-bd1a-00112444be1e')

\>>> \# make a UUID using an MD5 hash of a namespace UUID and a name
\>>> uuid.uuid3(uuid.NAMESPACE\_DNS, 'python.org')
UUID('6fa459ea-ee8a-3ca4-894e-db77e160355e')

\>>> \# make a random UUID
\>>> uuid.uuid4()
UUID('16fd2706-8baf-433b-82eb-8c7fada847da')

\>>> \# make a UUID using a SHA-1 hash of a namespace UUID and a name
\>>> uuid.uuid5(uuid.NAMESPACE\_DNS, 'python.org')
UUID('886313e1-3b8a-5372-9b90-0c9aee199e5d')

\>>> \# make a UUID from a string of hex digits (braces and hyphens ignored)
\>>> x \= uuid.UUID('{00010203-0405-0607-0809-0a0b0c0d0e0f}')

\>>> \# convert a UUID to a string of hex digits in standard form
\>>> str(x)
'00010203-0405-0607-0809-0a0b0c0d0e0f'

\>>> \# get the raw 16 bytes of the UUID
\>>> x.bytes
b'\\x00\\x01\\x02\\x03\\x04\\x05\\x06\\x07\\x08\\t\\n\\x0b\\x0c\\r\\x0e\\x0f'

\>>> \# make a UUID from a 16-byte string
\>>> uuid.UUID(bytes\=x.bytes)
UUID('00010203-0405-0607-0809-0a0b0c0d0e0f')

\>>> \# get the Nil UUID
\>>> uuid.NIL
UUID('00000000-0000-0000-0000-000000000000')

\>>> \# get the Max UUID
\>>> uuid.MAX
UUID('ffffffff-ffff-ffff-ffff-ffffffffffff')

\>>> \# same as UUIDv1 but with fields reordered to improve DB locality
\>>> uuid.uuid6()
UUID('1f0799c0-98b9-62db-92c6-a0d365b91053')

\>>> \# get UUIDv7 creation (local) time as a timestamp in milliseconds
\>>> u \= uuid.uuid7()
\>>> u.time
1743936859822

\>>> \# get UUIDv7 creation (local) time as a datetime object
\>>> import datetime as dt
\>>> dt.datetime.fromtimestamp(u.time / 1000)
datetime.datetime(...)

\>>> \# make a UUID with custom blocks
\>>> uuid.uuid8(0x12345678, 0x9abcdef0, 0x11223344)
UUID('00001234-5678-8ef0-8000-000011223344')

## 命令行示例[¶](#command-line-example "Link to this heading")

以下是 `uuid` 命令行接口的一些典型用法示例：

\# 生成一个随机UUID - 默认情况下使用uuid4()
$ python \-m uuid

\# 使用uuid1()生成一个UUID
$ python \-m uuid \-u uuid1

\# 使用uuid5生成一个UUID
$ python \-m uuid \-u uuid5 \-n @url \-N example.com

\# 生成42个随机UUID
$ python \-m uuid \-C 42
