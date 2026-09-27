* * *

备注

如果你需要解析不受信任或未经身份验证的数据，请参阅 [XML 安全](https://docs.python.org/zh-cn/3/library/xml.html#xml-security)。

The `xml.parsers.expat` module is a Python interface to the Expat non-validating XML parser. The module provides a single extension type, `xmlparser`, that represents the current state of an XML parser. After an `xmlparser` object has been created, various attributes of the object can be set to handler functions. When an XML document is then fed to the parser, the handler functions are called for the character data and markup in the XML document.

此模块使用 `pyexpat` 模块来提供对 Expat 解析器的访问。直接使用 `pyexpat` 模块的方式已被弃用。

This module provides the following exception, type object and data items:

_exception_ xml.parsers.expat.ExpatError[¶](#xml.parsers.expat.ExpatError "Link to this definition")

此异常会在 Expat 报错时被引发。请参阅 [ExpatError 异常](#expaterror-objects) 一节了解有关解读 Expat 错误的更多信息。

_exception_ xml.parsers.expat.error[¶](#xml.parsers.expat.error "Link to this definition")

[`ExpatError`](#xml.parsers.expat.ExpatError "xml.parsers.expat.ExpatError") 的别名。

xml.parsers.expat.XMLParserType[¶](#xml.parsers.expat.XMLParserType "Link to this definition")

来自 [`ParserCreate()`](#xml.parsers.expat.ParserCreate "xml.parsers.expat.ParserCreate") 函数的返回值的类型。

xml.parsers.expat.EXPAT\_VERSION[¶](#xml.parsers.expat.EXPAT_VERSION "Link to this definition")

The version string of the Expat library loaded by the interpreter, like `'expat_2.8.4'`.

xml.parsers.expat.version\_info[¶](#xml.parsers.expat.version_info "Link to this definition")

The version of the Expat library loaded by the interpreter, as a tuple of three integers: major, minor and micro version.

xml.parsers.expat.features[¶](#xml.parsers.expat.features "Link to this definition")

The list of the features with which the loaded Expat library was compiled, as `(name, value)` pairs. The value is only meaningful for features which have one, like `'XML_CONTEXT_BYTES'` or the default protection limits `'XML_BLAP_ACT_THRES'` and `'XML_AT_MAX_AMP'`; for other features, like `'XML_DTD'` and `'XML_NS'`, the value is `0` and only the presence of the name is significant.

`xml.parsers.expat` 模块包含两个函数：

xml.parsers.expat.ErrorString(_errno_)[¶](#xml.parsers.expat.ErrorString "Link to this definition")

返回给定错误号 _errno_ 的解释性字符串。

xml.parsers.expat.ParserCreate(_encoding\=None_, _namespace\_separator\=None_, _intern\=None_)[¶](#xml.parsers.expat.ParserCreate "Link to this definition")

创建并返回一个新的 `xmlparser` 对象。如果指定了 _encoding_，它必须为指定 XML 数据所使用的编码格式名称的字符串。Expat 支持的编码格式没有 Python 那样多，而且它的编码格式库也不能被扩展；它支持 UTF-8, UTF-16, ISO-8859-1 (Latin1) 和 ASCII。如果给出了 _encoding_ [\[1\]](#id3) 则它将覆盖隐式或显式指定的文档编码格式。

通过 `ParserCreate()` 创建的解析器称为“根”解析器，就是说它们没有关联任何父解析器。非根解析器则是由 [`parser.ExternalEntityParserCreate`](#xml.parsers.expat.xmlparser.ExternalEntityParserCreate "xml.parsers.expat.xmlparser.ExternalEntityParserCreate") 创建的。

可以选择让 Expat 为你做 XML 命名空间处理，这是通过提供 _namespace\_separator_ 值来启用的。 该值必须是一个单字符的字符串；如果字符串的长度不合法则将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") (`None` 被视为等同于省略)。 当命名空间处理被启用时，属于特定命名空间的元素类型名称和属性名称将被展开。传递给元素处理器 `StartElementHandler` 和 `EndElementHandler` 的元素名称将为命名空间 URI，命名空间分隔符和名称的本地部分的拼接。 如果命名空间分隔符是一个零字节 (`chr(0)`) 则命名空间 URI 和本地部分将被直接拼接而不带任何分隔符。

举例来说，如果 _namespace\_separator_ 被设为空格符 (`' '`) 并对以下文档进行解析：

<?xml version="1.0"?>
<root xmlns    = "http://default-namespace.org/"
      xmlns:py = "http://www.python.org/ns/"\>
  <py:elem1 />
  <elem2 xmlns="" />
</root>

`StartElementHandler` 将为每个元素获取以下字符串:

http://default\-namespace.org/ root
http://www.python.org/ns/ elem1
elem2

_intern_, if given, must be a dictionary. It is used to intern the names of elements and attributes, and is available as the [`intern`](#xml.parsers.expat.xmlparser.intern "xml.parsers.expat.xmlparser.intern") attribute. By default a new empty dictionary is created for every parser.

由于 `pyexpat` 所使用的 `Expat` 库的限制，被返回的 `xmlparser` 实例只能被用来解析单个 XML 文档。请为每个文档调用 `ParserCreate` 来提供单独的解析器实例。

## XMLParser 对象[¶](#xmlparser-objects "Link to this heading")

`xmlparser` 对象具有以下方法：

xmlparser.Parse(_data_\[, _isfinal_\])[¶](#xml.parsers.expat.xmlparser.Parse "Link to this definition")

Parses the contents of _data_, calling the appropriate handler functions to process the parsed data. _data_ can be a [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) or a string. If it is a string, the encoding declaration in the XML data is ignored, and the data is parsed as already decoded text. _isfinal_ must be true on the final call to this method; it allows the parsing of a single file in fragments, not the submission of multiple files. _data_ can be empty at any time.

xmlparser.ParseFile(_file_)[¶](#xml.parsers.expat.xmlparser.ParseFile "Link to this definition")

Parse XML data reading from the object _file_. _file_ only needs to provide the `read(nbytes)` method, which returns bytes, and an empty bytes object when there's no more data. Text files are not supported; use [`Parse()`](#xml.parsers.expat.xmlparser.Parse "xml.parsers.expat.xmlparser.Parse") for data which is already decoded.

xmlparser.SetBase(_base_)[¶](#xml.parsers.expat.xmlparser.SetBase "Link to this definition")

设置要用于解析声明中的系统标识符的相对 URI 的基准。解析相对标识符的任务会留给应用程序进行：这个值将作为 _base_ 参数传递给 [`ExternalEntityRefHandler()`](#xml.parsers.expat.xmlparser.ExternalEntityRefHandler "xml.parsers.expat.xmlparser.ExternalEntityRefHandler"), [`NotationDeclHandler()`](#xml.parsers.expat.xmlparser.NotationDeclHandler "xml.parsers.expat.xmlparser.NotationDeclHandler") 和 [`UnparsedEntityDeclHandler()`](#xml.parsers.expat.xmlparser.UnparsedEntityDeclHandler "xml.parsers.expat.xmlparser.UnparsedEntityDeclHandler") 函数。

xmlparser.GetBase()[¶](#xml.parsers.expat.xmlparser.GetBase "Link to this definition")

返回包含之前调用 [`SetBase()`](#xml.parsers.expat.xmlparser.SetBase "xml.parsers.expat.xmlparser.SetBase") 所设置的基准位置的字符串，或者如果未调用 `SetBase()` 则返回 `None`。

xmlparser.GetInputContext()[¶](#xml.parsers.expat.xmlparser.GetInputContext "Link to this definition")

Returns the input data which generated the current event as a [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") object. The data is in the encoding of the entity which contains the text. It extends to the end of the currently buffered input, therefore it can contain also the data of the following events, and if the event was generated by a large amount of text, not all of it may be available. When called while an event handler is not active, the return value is `None`.

xmlparser.ExternalEntityParserCreate(_context_\[, _encoding_\])[¶](#xml.parsers.expat.xmlparser.ExternalEntityParserCreate "Link to this definition")

创建一个“子”解析器，可被用来解析由父解析器解析的内容所引用的外部解析实体。 _context_ 形参应当是传递给 [`ExternalEntityRefHandler()`](#xml.parsers.expat.xmlparser.ExternalEntityRefHandler "xml.parsers.expat.xmlparser.ExternalEntityRefHandler") 处理函数的字符串，具体如下所述。子解析器创建时 [`ordered_attributes`](#xml.parsers.expat.xmlparser.ordered_attributes "xml.parsers.expat.xmlparser.ordered_attributes") 和 [`specified_attributes`](#xml.parsers.expat.xmlparser.specified_attributes "xml.parsers.expat.xmlparser.specified_attributes") 会被设为此解析器的值。

xmlparser.SetParamEntityParsing(_flag_)[¶](#xml.parsers.expat.xmlparser.SetParamEntityParsing "Link to this definition")

控制参数实体（包括外部 DTD 子集）的解析。可能的 _flag_ 值有 `XML_PARAM_ENTITY_PARSING_NEVER`, `XML_PARAM_ENTITY_PARSING_UNLESS_STANDALONE` 和 `XML_PARAM_ENTITY_PARSING_ALWAYS`。如果该旗标设置成功则返回真值。

xmlparser.UseForeignDTD(\[_flag_\])[¶](#xml.parsers.expat.xmlparser.UseForeignDTD "Link to this definition")

调用时将 _flag_ 设为真值（默认）将导致 Expat 调用 [`ExternalEntityRefHandler`](#xml.parsers.expat.xmlparser.ExternalEntityRefHandler "xml.parsers.expat.xmlparser.ExternalEntityRefHandler") 时将所有参数设为 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None") 以允许加载替代的 DTD。如果文档不包含文档类型声明，`ExternalEntityRefHandler` 仍然会被调用，但 [`StartDoctypeDeclHandler`](#xml.parsers.expat.xmlparser.StartDoctypeDeclHandler "xml.parsers.expat.xmlparser.StartDoctypeDeclHandler") 和 [`EndDoctypeDeclHandler`](#xml.parsers.expat.xmlparser.EndDoctypeDeclHandler "xml.parsers.expat.xmlparser.EndDoctypeDeclHandler") 将不会被调用。

为 _flag_ 传入假值将撤消之前传入真值的调用，除此之外没有其他影响。

此方法只能在调用 [`Parse()`](#xml.parsers.expat.xmlparser.Parse "xml.parsers.expat.xmlparser.Parse") 或 [`ParseFile()`](#xml.parsers.expat.xmlparser.ParseFile "xml.parsers.expat.xmlparser.ParseFile") 方法之前被调用；在已调用过这两个方法之后调用它会导致引发 [`ExpatError`](#xml.parsers.expat.ExpatError "xml.parsers.expat.ExpatError") 且 [`code`](https://docs.python.org/zh-cn/3/library/code.html#module-code "code: Facilities to implement read-eval-print loops.") 属性被设为 `errors.codes[errors.XML_ERROR_CANT_CHANGE_FEATURE_ONCE_PARSING]`.

xmlparser.SetReparseDeferralEnabled(_enabled_)[¶](#xml.parsers.expat.xmlparser.SetReparseDeferralEnabled "Link to this definition")

警告

调用 `SetReparseDeferralEnabled(False)` 会对安全产生影响，详情见下文；在使用 `SetReparseDeferralEnabled` 方法之前请务必了解这些后果。

Expat 2.6.0 引入了一种名为"重新解析延迟"的安全机制，这种机制可避免因重新解析大量词元的二次方运行时间而导致的拒绝服务，而是会在默认情况下延迟对未完成词元的重新解析直至达到足够的输入量。 由于这种延迟，已注册的处理器有可能 — 具体取决于推送到 Expat 的输入块大小 — 不会在向解析器推送新输入后立即被调用。 如果希望获得即时反馈并接管防止因大量词元导致的拒绝服务的责任，可以调用 `SetReparseDeferralEnabled(False)` 暂时或完全禁用当前 Expat 解析器实例的重新解析延迟。调用 `SetReparseDeferralEnabled(True)` 可以再次启用重新解析延迟。

请注意 [`SetReparseDeferralEnabled()`](#xml.parsers.expat.xmlparser.SetReparseDeferralEnabled "xml.parsers.expat.xmlparser.SetReparseDeferralEnabled") 已作为安全修正被向下移植到一些较早的 CPython 发布版。 如果在运行于多个 Python 版本的代码中要用到 `SetReparseDeferralEnabled()` 请使用 [`hasattr()`](https://docs.python.org/zh-cn/3/builtins/functions.html#hasattr "hasattr") 来检查其可用性。

Added in version 3.13.

xmlparser.GetReparseDeferralEnabled()[¶](#xml.parsers.expat.xmlparser.GetReparseDeferralEnabled "Link to this definition")

返回当前是否为给定的 Expat 解析器实例启用了重新解析延迟。

Added in version 3.13.

`xmlparser` objects have the following methods to tune protections against some common XML vulnerabilities.

xmlparser.SetBillionLaughsAttackProtectionActivationThreshold(_threshold_, _/_)[¶](#xml.parsers.expat.xmlparser.SetBillionLaughsAttackProtectionActivationThreshold "Link to this definition")

Sets the number of output bytes needed to activate protection against [billion laughs](https://en.wikipedia.org/wiki/Billion_laughs_attack) attacks.

The number of output bytes includes amplification from entity expansion and reading DTD files.

Parser objects usually have a protection activation threshold of 8 MiB, but the actual default value depends on the underlying Expat library.

如果此方法是在 [non-root](#xmlparser-non-root) 解析器上调用则会引发 [`ExpatError`](#xml.parsers.expat.ExpatError "xml.parsers.expat.ExpatError")。对应的 [`lineno`](#xml.parsers.expat.ExpatError.lineno "xml.parsers.expat.ExpatError.lineno") 和 [`offset`](#xml.parsers.expat.ExpatError.offset "xml.parsers.expat.ExpatError.offset") 不应被使用因为它们可能没有特别意义。

备注

Activation thresholds below 4 MiB are known to break support for DITA 1.3 payload and are hence not recommended.

Added in version 3.14.6.

xmlparser.SetBillionLaughsAttackProtectionMaximumAmplification(_max\_factor_, _/_)[¶](#xml.parsers.expat.xmlparser.SetBillionLaughsAttackProtectionMaximumAmplification "Link to this definition")

Sets the maximum tolerated amplification factor for protection against [billion laughs](https://en.wikipedia.org/wiki/Billion_laughs_attack) attacks.

The amplification factor is calculated as `(direct + indirect) / direct` while parsing, where `direct` is the number of bytes read from the primary document in parsing and `indirect` is the number of bytes added by expanding entities and reading of external DTD files.

The _max\_factor_ value must be a non-NaN [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") value greater than or equal to 1.0. Peak amplifications of factor 15,000 for the entire payload and of factor 30,000 in the middle of parsing have been observed with small benign files in practice. In particular, the activation threshold should be carefully chosen to avoid false positives.

Parser objects usually have a maximum amplification factor of 100, but the actual default value depends on the underlying Expat library.

如果此方法是在 [non-root](#xmlparser-non-root) 解析器上调用或者如果 _max\_factor_ 是在有效范围之外则会引发 [`ExpatError`](#xml.parsers.expat.ExpatError "xml.parsers.expat.ExpatError")。对应的 [`lineno`](#xml.parsers.expat.ExpatError.lineno "xml.parsers.expat.ExpatError.lineno") 和 [`offset`](#xml.parsers.expat.ExpatError.offset "xml.parsers.expat.ExpatError.offset") 不应被使用因为它们可能没有特别意义。

备注

The maximum amplification factor is only considered if the threshold that can be adjusted by [`SetBillionLaughsAttackProtectionActivationThreshold()`](#xml.parsers.expat.xmlparser.SetBillionLaughsAttackProtectionActivationThreshold "xml.parsers.expat.xmlparser.SetBillionLaughsAttackProtectionActivationThreshold") is exceeded.

Added in version 3.14.6.

xmlparser.SetAllocTrackerActivationThreshold(_threshold_, _/_)[¶](#xml.parsers.expat.xmlparser.SetAllocTrackerActivationThreshold "Link to this definition")

设置动态内存的分配字节数以激活对不适当地使用 RAM 的保护机制。

Parser objects usually have an allocation activation threshold of 64 MiB, but the actual default value depends on the underlying Expat library.

如果此方法是在 [non-root](#xmlparser-non-root) 解析器上调用则会引发 [`ExpatError`](#xml.parsers.expat.ExpatError "xml.parsers.expat.ExpatError")。对应的 [`lineno`](#xml.parsers.expat.ExpatError.lineno "xml.parsers.expat.ExpatError.lineno") 和 [`offset`](#xml.parsers.expat.ExpatError.offset "xml.parsers.expat.ExpatError.offset") 不应被使用因为它们可能没有特别意义。

Added in version 3.14.1.

xmlparser.SetAllocTrackerMaximumAmplification(_max\_factor_, _/_)[¶](#xml.parsers.expat.xmlparser.SetAllocTrackerMaximumAmplification "Link to this definition")

设置直接输入与已分配动态内存字节数量之间的最大放大系数。

该放大系数在解析时将被计算为 `allocated / direct`，其中 `direct` 是在解析中从原始文档读取的字节数量而 `allocated` 是在解析器层级结构中已分配的动态内存字节数量。

_max\_factor_ 值必须是一个大于等于 1.0 的非 NaN [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 值。在实践中大于 100.0 的放大系数可能出现于解析开始的时候，即使是良性的文件也不能避免。具体而言，激活阈值应当谨慎选择以避免假阳性结果。

Parser objects usually have a maximum amplification factor of 100, but the actual default value depends on the underlying Expat library.

如果此方法是在 [non-root](#xmlparser-non-root) 解析器上调用或者如果 _max\_factor_ 是在有效范围之外则会引发 [`ExpatError`](#xml.parsers.expat.ExpatError "xml.parsers.expat.ExpatError")。对应的 [`lineno`](#xml.parsers.expat.ExpatError.lineno "xml.parsers.expat.ExpatError.lineno") 和 [`offset`](#xml.parsers.expat.ExpatError.offset "xml.parsers.expat.ExpatError.offset") 不应被使用因为它们可能没有特别意义。

备注

最大放大系数只有在超出了可由 [`SetAllocTrackerActivationThreshold()`](#xml.parsers.expat.xmlparser.SetAllocTrackerActivationThreshold "xml.parsers.expat.xmlparser.SetAllocTrackerActivationThreshold") 调整的阈值时才会被纳入考虑。

Added in version 3.14.1.

`xmlparser` 对象具有下列属性：

xmlparser.buffer\_size[¶](#xml.parsers.expat.xmlparser.buffer_size "Link to this definition")

当 [`buffer_text`](#xml.parsers.expat.xmlparser.buffer_text "xml.parsers.expat.xmlparser.buffer_text") 为真值时所使用的缓冲区大小。可以通过将此属性赋一个新的整数值来设置一个新的缓冲区大小。 当大小发生改变时，缓冲区将被刷新。

xmlparser.buffer\_text[¶](#xml.parsers.expat.xmlparser.buffer_text "Link to this definition")

将此属性设为真值会使得 `xmlparser` 对象缓冲 Expat 所返回的文本内容以尽可能地避免多次调用 [`CharacterDataHandler()`](#xml.parsers.expat.xmlparser.CharacterDataHandler "xml.parsers.expat.xmlparser.CharacterDataHandler") 回调。这可以显著地提升性能，因为 Expat 通常会将字符数据在每个行结束的位置上进行分块。 此属性默认为假值，并可在任何时候被更改。请注意当其为假值时，不包含换行符的数据也可能被分块。

xmlparser.buffer\_used[¶](#xml.parsers.expat.xmlparser.buffer_used "Link to this definition")

当 [`buffer_text`](#xml.parsers.expat.xmlparser.buffer_text "xml.parsers.expat.xmlparser.buffer_text") 被启用时，缓冲区中存储的字节数。这些字节数据表示以 UTF-8 编码的文本。当 `buffer_text` 为假值时此属性没有任何实际意义。

xmlparser.ordered\_attributes[¶](#xml.parsers.expat.xmlparser.ordered_attributes "Link to this definition")

将该属性设为非零整数会使得各个属性被报告为列表而非字典。各个属性会按照在文档文本中的出现顺序显示。对于每个属性，将显示两个列表条目：属性名和属性值。 （该模块的较旧版本也使用了此格式。）默认情况下，该属性为假值；它可以在任何时候被更改。

xmlparser.specified\_attributes[¶](#xml.parsers.expat.xmlparser.specified_attributes "Link to this definition")

如果设为非零整数，解析器将只报告在文档实例中指明的属性而不报告来自属性声明的属性。设置此属性的应用程序需要特别小心地使用从声明中获得的附加信息以符合 XML 处理程序的行为标准。默认情况下，该属性为假值；它可以在任何时候被更改。

xmlparser.intern[¶](#xml.parsers.expat.xmlparser.intern "Link to this definition")

The dictionary used to intern the names of elements and attributes. It is either the dictionary passed as the _intern_ argument of [`ParserCreate()`](#xml.parsers.expat.ParserCreate "xml.parsers.expat.ParserCreate"), or a new dictionary created for this parser.

xmlparser.namespace\_prefixes[¶](#xml.parsers.expat.xmlparser.namespace_prefixes "Link to this definition")

If set to a true value, and namespace processing is enabled, the namespace prefix is reported as the third part of the expanded name, separated by the namespace separator. Names which have no prefix are not affected. By default, this attribute is false; it may be changed at any time.

下列属性包含与 `xmlparser` 对象遇到的最近发生的错误有关联的值，并且一旦对 `Parse()` 或 `ParseFile()` 的调用引发了 [`xml.parsers.expat.ExpatError`](#xml.parsers.expat.ExpatError "xml.parsers.expat.ExpatError") 异常就将只包含正确的值。

xmlparser.ErrorByteIndex[¶](#xml.parsers.expat.xmlparser.ErrorByteIndex "Link to this definition")

错误发生位置的字节索引号。

xmlparser.ErrorCode[¶](#xml.parsers.expat.xmlparser.ErrorCode "Link to this definition")

指明问题的数字代码。该值可被传给 [`ErrorString()`](#xml.parsers.expat.ErrorString "xml.parsers.expat.ErrorString") 函数，或是与在 `errors` 对象中定义的常量之一进行比较。

xmlparser.ErrorColumnNumber[¶](#xml.parsers.expat.xmlparser.ErrorColumnNumber "Link to this definition")

错误发生位置的列号。

xmlparser.ErrorLineNumber[¶](#xml.parsers.expat.xmlparser.ErrorLineNumber "Link to this definition")

错误发生位置的行号。

下列属性包含 `xmlparser` 对象中关联到当前解析位置的值。 在回调报告解析事件期间它们将指示生成事件的字符序列的第一个字符的位置。 当在回调的外部被调用时，所指示的位置将恰好位于最后的解析事件之后（无论是否存在关联的回调）。

xmlparser.CurrentByteIndex[¶](#xml.parsers.expat.xmlparser.CurrentByteIndex "Link to this definition")

解析器输入的当前字节索引号。

xmlparser.CurrentColumnNumber[¶](#xml.parsers.expat.xmlparser.CurrentColumnNumber "Link to this definition")

解析器输入的当前列号。

xmlparser.CurrentLineNumber[¶](#xml.parsers.expat.xmlparser.CurrentLineNumber "Link to this definition")

解析器输入的当前行号。

可被设置的处理器列表。要在一个 `xmlparser` 对象 _o_ 上设置处理器，请使用 `o.handlername = func`。 _handlername_ 必须从下面的列表中获取，而 _func_ 必须为接受正确数量参数的可调用对象。 所有参数均为字符串，除非另外指明。

xmlparser.XmlDeclHandler(_version_, _encoding_, _standalone_)[¶](#xml.parsers.expat.xmlparser.XmlDeclHandler "Link to this definition")

Called when the XML declaration is parsed. The XML declaration is the (optional) declaration of the applicable version of the XML recommendation, the encoding of the document text, and an optional "standalone" declaration. _version_ and _encoding_ will be strings, and _standalone_ will be `1` if the document is declared standalone, `0` if it is declared not to be standalone, or `-1` if the standalone clause was omitted.

xmlparser.StartDoctypeDeclHandler(_doctypeName_, _systemId_, _publicId_, _has\_internal\_subset_)[¶](#xml.parsers.expat.xmlparser.StartDoctypeDeclHandler "Link to this definition")

Called when Expat begins parsing the document type declaration (`<!DOCTYPE ...`). The _doctypeName_ is provided exactly as presented. The _systemId_ and _publicId_ parameters give the system and public identifiers if specified, or `None` if omitted. _has\_internal\_subset_ will be true if the document contains an internal document declaration subset.

xmlparser.EndDoctypeDeclHandler()[¶](#xml.parsers.expat.xmlparser.EndDoctypeDeclHandler "Link to this definition")

Called when Expat is done parsing the document type declaration.

xmlparser.ElementDeclHandler(_name_, _model_)[¶](#xml.parsers.expat.xmlparser.ElementDeclHandler "Link to this definition")

为每个元素类型声明调用一次。 _name_ 为元素类型名称，而 _model_ 为内容模型的表示形式。

xmlparser.AttlistDeclHandler(_elname_, _attname_, _type_, _default_, _required_)[¶](#xml.parsers.expat.xmlparser.AttlistDeclHandler "Link to this definition")

Called for each declared attribute for an element type. If an attribute list declaration declares three attributes, this handler is called three times, once for each attribute. _elname_ is the name of the element to which the declaration applies and _attname_ is the name of the attribute declared. The The attribute type is a string passed as _type_: `'CDATA'`, `'ID'`, `'IDREF'`, `'IDREFS'`, `'ENTITY'`, `'ENTITIES'`, `'NMTOKEN'` or `'NMTOKENS'`, an enumeration like `'(x|y)'`, or a notation list like `'NOTATION(n1|n2)'`. _default_ gives the default value for the attribute used when the attribute is not specified by the document instance, or `None` if there is no default value (`#IMPLIED` values). If the attribute is required to be given in the document instance, _required_ will be true.

xmlparser.StartElementHandler(_name_, _attributes_)[¶](#xml.parsers.expat.xmlparser.StartElementHandler "Link to this definition")

在每个元素开始时调用。 _name_ 是包含元素名称的字符串，而 _attributes_ 是元素的属性。如果 [`ordered_attributes`](#xml.parsers.expat.xmlparser.ordered_attributes "xml.parsers.expat.xmlparser.ordered_attributes") 为真值，则属性为列表形式 (完整描述参见 `ordered_attributes`)。 否则为将名称映射到值的字典。

xmlparser.EndElementHandler(_name_)[¶](#xml.parsers.expat.xmlparser.EndElementHandler "Link to this definition")

在每个元素结束时调用。

xmlparser.ProcessingInstructionHandler(_target_, _data_)[¶](#xml.parsers.expat.xmlparser.ProcessingInstructionHandler "Link to this definition")

在每次处理指令时调用。

xmlparser.CharacterDataHandler(_data_)[¶](#xml.parsers.expat.xmlparser.CharacterDataHandler "Link to this definition")

针对字符数据调用。此方法将被用于普通字符数据、CDATA 标记的内容以及可忽略的空白符。需要区别这几种情况的应用程序可以使用 [`StartCdataSectionHandler`](#xml.parsers.expat.xmlparser.StartCdataSectionHandler "xml.parsers.expat.xmlparser.StartCdataSectionHandler"), [`EndCdataSectionHandler`](#xml.parsers.expat.xmlparser.EndCdataSectionHandler "xml.parsers.expat.xmlparser.EndCdataSectionHandler") 和 [`ElementDeclHandler`](#xml.parsers.expat.xmlparser.ElementDeclHandler "xml.parsers.expat.xmlparser.ElementDeclHandler") 回调来收集必要的信息。请注意字符数据即使很短可能会被分块并且你可能会收到多个对 [`CharacterDataHandler()`](#xml.parsers.expat.xmlparser.CharacterDataHandler "xml.parsers.expat.xmlparser.CharacterDataHandler") 的调用。请将 [`buffer_text`](#xml.parsers.expat.xmlparser.buffer_text "xml.parsers.expat.xmlparser.buffer_text") 实例属性设为 `True` 来避免此情况。

xmlparser.UnparsedEntityDeclHandler(_entityName_, _base_, _systemId_, _publicId_, _notationName_)[¶](#xml.parsers.expat.xmlparser.UnparsedEntityDeclHandler "Link to this definition")

Called for unparsed (NDATA) entity declarations. If this handler is not set, such declarations are reported by [`EntityDeclHandler`](#xml.parsers.expat.xmlparser.EntityDeclHandler "xml.parsers.expat.xmlparser.EntityDeclHandler"), which is preferred for new code. (The underlying function in the Expat library has been declared obsolete.)

xmlparser.EntityDeclHandler(_entityName_, _is\_parameter\_entity_, _value_, _base_, _systemId_, _publicId_, _notationName_)[¶](#xml.parsers.expat.xmlparser.EntityDeclHandler "Link to this definition")

Called for all entity declarations. For parameter and internal entities, _value_ will be a string giving the declared contents of the entity; this will be `None` for external entities. The _notationName_ parameter will be `None` for parsed entities, and the name of the notation for unparsed entities. _is\_parameter\_entity_ will be true if the entity is a parameter entity or false for general entities (most applications only need to be concerned with general entities).

xmlparser.NotationDeclHandler(_notationName_, _base_, _systemId_, _publicId_)[¶](#xml.parsers.expat.xmlparser.NotationDeclHandler "Link to this definition")

针对标注声明被调用。 _notationName_, _base_, _systemId_ 和 _publicId_ 如果给出则均应为字符串。 如果省略公有标识符，则 _publicId_ 将为 `None`。

xmlparser.StartNamespaceDeclHandler(_prefix_, _uri_)[¶](#xml.parsers.expat.xmlparser.StartNamespaceDeclHandler "Link to this definition")

当一个元素包含命名空间声明时被调用。命名空间声明会在为声明所在的元素调用 [`StartElementHandler`](#xml.parsers.expat.xmlparser.StartElementHandler "xml.parsers.expat.xmlparser.StartElementHandler") 之前被处理。

xmlparser.EndNamespaceDeclHandler(_prefix_)[¶](#xml.parsers.expat.xmlparser.EndNamespaceDeclHandler "Link to this definition")

当到达包含命名空间声明的元素的关闭标记时被调用。此方法会按照调用 [`StartNamespaceDeclHandler`](#xml.parsers.expat.xmlparser.StartNamespaceDeclHandler "xml.parsers.expat.xmlparser.StartNamespaceDeclHandler") 以指明每个命名空间作用域的开始的逆顺序为元素上的每个命名空间声明调用一次。对这个处理器的调用是在相应的 [`EndElementHandler`](#xml.parsers.expat.xmlparser.EndElementHandler "xml.parsers.expat.xmlparser.EndElementHandler") 之后针对元素的结束而进行的。

xmlparser.CommentHandler(_data_)[¶](#xml.parsers.expat.xmlparser.CommentHandler "Link to this definition")

针对注释被调用。 _data_ 是注释的文本，不包括开头的 `'<!-``-'` 和末尾的 `'-``->'`。

xmlparser.StartCdataSectionHandler()[¶](#xml.parsers.expat.xmlparser.StartCdataSectionHandler "Link to this definition")

在一个 CDATA 节的开头被调用。需要此方法和 [`EndCdataSectionHandler`](#xml.parsers.expat.xmlparser.EndCdataSectionHandler "xml.parsers.expat.xmlparser.EndCdataSectionHandler") 以便能够标识 CDATA 节的语法开始和结束。

xmlparser.EndCdataSectionHandler()[¶](#xml.parsers.expat.xmlparser.EndCdataSectionHandler "Link to this definition")

在一个 CDATA 节的末尾被调用。

xmlparser.DefaultHandler(_data_)[¶](#xml.parsers.expat.xmlparser.DefaultHandler "Link to this definition")

针对 XML 文档中没有指定适用处理器的任何字符被调用。这包括了所有属于可被报告的结构的一部分，但未提供处理器的字符。

xmlparser.DefaultHandlerExpand(_data_)[¶](#xml.parsers.expat.xmlparser.DefaultHandlerExpand "Link to this definition")

This is the same as the [`DefaultHandler`](#xml.parsers.expat.xmlparser.DefaultHandler "xml.parsers.expat.xmlparser.DefaultHandler"), but doesn't inhibit expansion of internal entities. The entity reference will not be passed to the default handler.

xmlparser.NotStandaloneHandler()[¶](#xml.parsers.expat.xmlparser.NotStandaloneHandler "Link to this definition")

当 XML 文档未被声明为独立文档时被调用。这种情况发生在出现外部子集或对参数实体的引用，但 XML 声明没有在 XML 声明中将 standalone 设为 `yes` 的时候。如果这个处理器返回 `0`，那么解析器将引发 `XML_ERROR_NOT_STANDALONE` 错误。如果这个处理器没有被设置，那么解析器就不会为这个条件引发任何异常。

xmlparser.ExternalEntityRefHandler(_context_, _base_, _systemId_, _publicId_)[¶](#xml.parsers.expat.xmlparser.ExternalEntityRefHandler "Link to this definition")

警告

如果 `xmlparser` 被用于用户提供的 XML 内容则实现一个访问本地文件和/或网络的处理器可能导致面对 [外部实体攻击](https://en.wikipedia.org/wiki/XML_external_entity_attack) 时存在缺陷。 请在实现此处理器之前仔细考虑你的 [威胁模型](https://en.wikipedia.org/wiki/Threat_model)。

为对外部实体的引用执行调用。 _base_ 为当前的基准，由之前对 [`SetBase()`](#xml.parsers.expat.xmlparser.SetBase "xml.parsers.expat.xmlparser.SetBase") 的调用设置。公有和系统标识符 _systemId_ 和 _publicId_ 如果给出则均为字符串；如果公有标识符未给出，则 _publicId_ 将为 `None`。 _context_ 是仅根据以下说明来使用的不透明值。

对于要解析的外部实体，这个处理器必须被实现。它负责使用 `ExternalEntityParserCreate(context)` 来创建子解析器，通过适当的回调将其初始化，并对实体进行解析。这个处理器应当返回一个整数；如果它返回 `0`，则解析器将引发 `XML_ERROR_EXTERNAL_ENTITY_HANDLING` 错误，否则解析将会继续。

如果未提供这个处理器，外部实体会由 [`DefaultHandler`](#xml.parsers.expat.xmlparser.DefaultHandler "xml.parsers.expat.xmlparser.DefaultHandler") 回调来报告，如果提供了该回调的话。

xmlparser.SkippedEntityHandler(_entityName_, _is\_parameter\_entity_)[¶](#xml.parsers.expat.xmlparser.SkippedEntityHandler "Link to this definition")

Called for entity references which are not expanded, because the parser did not read the declaration of the entity. This happens when the external DTD subset or an external parameter entity is not parsed. _is\_parameter\_entity_ is true for a parameter entity and false for a general entity.

## ExpatError 异常[¶](#expaterror-exceptions "Link to this heading")

[`ExpatError`](#xml.parsers.expat.ExpatError "xml.parsers.expat.ExpatError") 异常包含几个有趣的属性：

ExpatError.code[¶](#xml.parsers.expat.ExpatError.code "Link to this definition")

Expat 对于指定错误的内部错误号。 [`errors.messages`](#xml.parsers.expat.errors.messages "xml.parsers.expat.errors.messages") 字典会将这些错误号映射到 Expat 的错误消息。例如:

from xml.parsers.expat import ParserCreate, ExpatError, errors

p \= ParserCreate()
try:
    p.Parse(some\_xml\_document)
except ExpatError as err:
    print("Error:", errors.messages\[err.code\])

[`errors`](#module-xml.parsers.expat.errors "xml.parsers.expat.errors") 模块也提供了一些错误消息常量和一个将这些消息映射回错误码的字典 [`codes`](#xml.parsers.expat.errors.codes "xml.parsers.expat.errors.codes")，参见下文。

ExpatError.lineno[¶](#xml.parsers.expat.ExpatError.lineno "Link to this definition")

检测到错误所在的行号。首行的行号为 `1`。

ExpatError.offset[¶](#xml.parsers.expat.ExpatError.offset "Link to this definition")

错误发生在行中的字符偏移量。首列的列号为 `0`。

## 示例[¶](#example "Link to this heading")

以下程序定义了三个处理器，会简单地打印出它们的参数。:

import xml.parsers.expat

\# 3 处理器函数
def start\_element(name, attrs):
    print('Start element:', name, attrs)
def end\_element(name):
    print('End element:', name)
def char\_data(data):
    print('Character data:', repr(data))

p \= xml.parsers.expat.ParserCreate()

p.StartElementHandler \= start\_element
p.EndElementHandler \= end\_element
p.CharacterDataHandler \= char\_data

p.Parse("""<?xml version="1.0"?>
<parent id="top"><child1 name="paul">Text goes here</child1>
<child2 name="fred">More text</child2>
</parent>""", 1)

来自这个程序的输出是:

Start element: parent {'id': 'top'}
Start element: child1 {'name': 'paul'}
Character data: 'Text goes here'
End element: child1
Character data: '\\n'
Start element: child2 {'name': 'fred'}
Character data: 'More text'
End element: child2
Character data: '\\n'
End element: parent

## 内容模型描述[¶](#module-xml.parsers.expat.model "Link to this heading")

内容模型是使用嵌套的元组来描述的。每个元组包含四个值：类型、限定符、名称和一个子元组。子元组就是附加的内容模型描述。

The values of the first two fields are constants defined in the `xml.parsers.expat.model` module. These constants can be collected in two groups: the model type group and the quantifier group.

模型类型组中的常量有：

xml.parsers.expat.model.XML\_CTYPE\_ANY[¶](#xml.parsers.expat.model.XML_CTYPE_ANY "Link to this definition")

模型名称所指定的元素被声明为具有 `ANY` 内容模型。

xml.parsers.expat.model.XML\_CTYPE\_CHOICE[¶](#xml.parsers.expat.model.XML_CTYPE_CHOICE "Link to this definition")

命名元素允许从几个选项中选择；这被用于 `(A | B | C)` 形式的内容模型。

xml.parsers.expat.model.XML\_CTYPE\_EMPTY[¶](#xml.parsers.expat.model.XML_CTYPE_EMPTY "Link to this definition")

被声明为 `EMPTY` 的元素具有此模型类型。

xml.parsers.expat.model.XML\_CTYPE\_MIXED[¶](#xml.parsers.expat.model.XML_CTYPE_MIXED "Link to this definition")

The named element allows character data, optionally interspersed with the named children; this is used for content models such as `(#PCDATA)` and `(#PCDATA | A | B)*`.

xml.parsers.expat.model.XML\_CTYPE\_NAME[¶](#xml.parsers.expat.model.XML_CTYPE_NAME "Link to this definition")

The model names a single element, as for `A`.

xml.parsers.expat.model.XML\_CTYPE\_SEQ[¶](#xml.parsers.expat.model.XML_CTYPE_SEQ "Link to this definition")

代表彼此相连的一系列模型的模型用此模型类型来指明。这被用于 `(A, B, C)` 形式的模型。

限定符组中的常量有：

xml.parsers.expat.model.XML\_CQUANT\_NONE[¶](#xml.parsers.expat.model.XML_CQUANT_NONE "Link to this definition")

未给出限定符，这样它可以只出现一次，例如 `A`。

xml.parsers.expat.model.XML\_CQUANT\_OPT[¶](#xml.parsers.expat.model.XML_CQUANT_OPT "Link to this definition")

模型是可选的：它可以出现一次或完全不出现，例如 `A?`。

xml.parsers.expat.model.XML\_CQUANT\_PLUS[¶](#xml.parsers.expat.model.XML_CQUANT_PLUS "Link to this definition")

模型必须出现一次或多次 (例如 `A+`)。

xml.parsers.expat.model.XML\_CQUANT\_REP[¶](#xml.parsers.expat.model.XML_CQUANT_REP "Link to this definition")

模型必须出现零次或多次，例如 `A*`。

## Expat 错误常量[¶](#module-xml.parsers.expat.errors "Link to this heading")

The following constants are provided in the `xml.parsers.expat.errors` module. These constants are useful in interpreting some of the attributes of the `ExpatError` exception objects raised when an error has occurred. Since for backwards compatibility reasons, the constants' value is the error _message_ and not the numeric error _code_, you do this by comparing its [`code`](https://docs.python.org/zh-cn/3/library/code.html#module-code "code: Facilities to implement read-eval-print loops.") attribute with `errors.codes[errors.XML_ERROR__CONSTANT_NAME_]`.

`errors` 模块具有以下属性：

xml.parsers.expat.errors.codes[¶](#xml.parsers.expat.errors.codes "Link to this definition")

将字符串描述映射到其错误代码的字典。

Added in version 3.2.

xml.parsers.expat.errors.messages[¶](#xml.parsers.expat.errors.messages "Link to this definition")

将数字形式的错误代码映射到其字符串描述的字典。

Added in version 3.2.

xml.parsers.expat.errors.XML\_ERROR\_ASYNC\_ENTITY[¶](#xml.parsers.expat.errors.XML_ERROR_ASYNC_ENTITY "Link to this definition")

xml.parsers.expat.errors.XML\_ERROR\_ATTRIBUTE\_EXTERNAL\_ENTITY\_REF[¶](#xml.parsers.expat.errors.XML_ERROR_ATTRIBUTE_EXTERNAL_ENTITY_REF "Link to this definition")

属性值中指向一个外部实体而非内部实体的实体引用。

xml.parsers.expat.errors.XML\_ERROR\_BAD\_CHAR\_REF[¶](#xml.parsers.expat.errors.XML_ERROR_BAD_CHAR_REF "Link to this definition")

指向一个在 XML 不合法的字符的字符引用 (例如，字符 `0` 或 '`&#0;`')。

xml.parsers.expat.errors.XML\_ERROR\_BINARY\_ENTITY\_REF[¶](#xml.parsers.expat.errors.XML_ERROR_BINARY_ENTITY_REF "Link to this definition")

指向一个使用标注声明，因而无法被解析的实体的实体引用。

xml.parsers.expat.errors.XML\_ERROR\_DUPLICATE\_ATTRIBUTE[¶](#xml.parsers.expat.errors.XML_ERROR_DUPLICATE_ATTRIBUTE "Link to this definition")

一个属性在一个开始标记中被使用超过一次。

xml.parsers.expat.errors.XML\_ERROR\_INCORRECT\_ENCODING[¶](#xml.parsers.expat.errors.XML_ERROR_INCORRECT_ENCODING "Link to this definition")

xml.parsers.expat.errors.XML\_ERROR\_INVALID\_TOKEN[¶](#xml.parsers.expat.errors.XML_ERROR_INVALID_TOKEN "Link to this definition")

当一个输入字节无法被正确分配给一个字符时引发；例如，在 UTF-8 输入流中的 NUL 字节 (值为 `0`)。

xml.parsers.expat.errors.XML\_ERROR\_JUNK\_AFTER\_DOC\_ELEMENT[¶](#xml.parsers.expat.errors.XML_ERROR_JUNK_AFTER_DOC_ELEMENT "Link to this definition")

在文档元素之后出现空白符以外的内容。

xml.parsers.expat.errors.XML\_ERROR\_MISPLACED\_XML\_PI[¶](#xml.parsers.expat.errors.XML_ERROR_MISPLACED_XML_PI "Link to this definition")

在输入数据开始位置以外的地方发现 XML 声明。

xml.parsers.expat.errors.XML\_ERROR\_NO\_ELEMENTS[¶](#xml.parsers.expat.errors.XML_ERROR_NO_ELEMENTS "Link to this definition")

The document contains no elements (XML requires all documents to contain exactly one top-level element).

xml.parsers.expat.errors.XML\_ERROR\_NO\_MEMORY[¶](#xml.parsers.expat.errors.XML_ERROR_NO_MEMORY "Link to this definition")

Expat 无法在内部分配内存。

xml.parsers.expat.errors.XML\_ERROR\_PARAM\_ENTITY\_REF[¶](#xml.parsers.expat.errors.XML_ERROR_PARAM_ENTITY_REF "Link to this definition")

在不被允许的位置发现一个参数实体引用。

xml.parsers.expat.errors.XML\_ERROR\_PARTIAL\_CHAR[¶](#xml.parsers.expat.errors.XML_ERROR_PARTIAL_CHAR "Link to this definition")

在输入中发现一个不完整的字符。

xml.parsers.expat.errors.XML\_ERROR\_RECURSIVE\_ENTITY\_REF[¶](#xml.parsers.expat.errors.XML_ERROR_RECURSIVE_ENTITY_REF "Link to this definition")

一个实体引用包含了对同一实体的另一个引用；可能是通过不同的名称，并可能是间接的引用。

xml.parsers.expat.errors.XML\_ERROR\_SYNTAX[¶](#xml.parsers.expat.errors.XML_ERROR_SYNTAX "Link to this definition")

遇到了某个未指明的语法错误。

xml.parsers.expat.errors.XML\_ERROR\_TAG\_MISMATCH[¶](#xml.parsers.expat.errors.XML_ERROR_TAG_MISMATCH "Link to this definition")

一个结束标记不能匹配到最内层的未关闭开始标记。

xml.parsers.expat.errors.XML\_ERROR\_UNCLOSED\_TOKEN[¶](#xml.parsers.expat.errors.XML_ERROR_UNCLOSED_TOKEN "Link to this definition")

某些记号（例如开始标记）在流结束或遇到下一个记号之前还未关闭。

xml.parsers.expat.errors.XML\_ERROR\_UNDEFINED\_ENTITY[¶](#xml.parsers.expat.errors.XML_ERROR_UNDEFINED_ENTITY "Link to this definition")

对一个未定义的实体进行了引用。

xml.parsers.expat.errors.XML\_ERROR\_UNKNOWN\_ENCODING[¶](#xml.parsers.expat.errors.XML_ERROR_UNKNOWN_ENCODING "Link to this definition")

文档编码格式不被 Expat 所支持。

xml.parsers.expat.errors.XML\_ERROR\_UNCLOSED\_CDATA\_SECTION[¶](#xml.parsers.expat.errors.XML_ERROR_UNCLOSED_CDATA_SECTION "Link to this definition")

一个 CDATA 标记节还未关闭。

xml.parsers.expat.errors.XML\_ERROR\_EXTERNAL\_ENTITY\_HANDLING[¶](#xml.parsers.expat.errors.XML_ERROR_EXTERNAL_ENTITY_HANDLING "Link to this definition")

xml.parsers.expat.errors.XML\_ERROR\_NOT\_STANDALONE[¶](#xml.parsers.expat.errors.XML_ERROR_NOT_STANDALONE "Link to this definition")

解析器确定文档不是“独立的”但它却在 XML 声明中声明自己是独立的，并且 `NotStandaloneHandler` 被设置为返回 `0`。

xml.parsers.expat.errors.XML\_ERROR\_UNEXPECTED\_STATE[¶](#xml.parsers.expat.errors.XML_ERROR_UNEXPECTED_STATE "Link to this definition")

xml.parsers.expat.errors.XML\_ERROR\_ENTITY\_DECLARED\_IN\_PE[¶](#xml.parsers.expat.errors.XML_ERROR_ENTITY_DECLARED_IN_PE "Link to this definition")

xml.parsers.expat.errors.XML\_ERROR\_FEATURE\_REQUIRES\_XML\_DTD[¶](#xml.parsers.expat.errors.XML_ERROR_FEATURE_REQUIRES_XML_DTD "Link to this definition")

请求了一个需要已编译 DTD 支持的操作，但 Expat 被配置为不带 DTD 支持。 此错误绝不应被 `xml.parsers.expat` 模块的标准构建版所报告。

xml.parsers.expat.errors.XML\_ERROR\_CANT\_CHANGE\_FEATURE\_ONCE\_PARSING[¶](#xml.parsers.expat.errors.XML_ERROR_CANT_CHANGE_FEATURE_ONCE_PARSING "Link to this definition")

在解析开始之后请求一个只能在解析开始之前执行的行为改变。此错误（目前）只能由 `UseForeignDTD()` 所引发。

xml.parsers.expat.errors.XML\_ERROR\_UNBOUND\_PREFIX[¶](#xml.parsers.expat.errors.XML_ERROR_UNBOUND_PREFIX "Link to this definition")

当命名空间处理被启用时发现一个未声明的前缀。

xml.parsers.expat.errors.XML\_ERROR\_UNDECLARING\_PREFIX[¶](#xml.parsers.expat.errors.XML_ERROR_UNDECLARING_PREFIX "Link to this definition")

文档试图移除与某个前缀相关联的命名空间声明。

xml.parsers.expat.errors.XML\_ERROR\_INCOMPLETE\_PE[¶](#xml.parsers.expat.errors.XML_ERROR_INCOMPLETE_PE "Link to this definition")

一个参数实体包含不完整的标记。

xml.parsers.expat.errors.XML\_ERROR\_XML\_DECL[¶](#xml.parsers.expat.errors.XML_ERROR_XML_DECL "Link to this definition")

There was an error parsing the XML declaration.

xml.parsers.expat.errors.XML\_ERROR\_TEXT\_DECL[¶](#xml.parsers.expat.errors.XML_ERROR_TEXT_DECL "Link to this definition")

解析一个外部实体中的文本声明时出现错误。

xml.parsers.expat.errors.XML\_ERROR\_PUBLICID[¶](#xml.parsers.expat.errors.XML_ERROR_PUBLICID "Link to this definition")

在公有 id 中发现不被允许的字符。

xml.parsers.expat.errors.XML\_ERROR\_SUSPENDED[¶](#xml.parsers.expat.errors.XML_ERROR_SUSPENDED "Link to this definition")

在挂起的解析器上请求执行操作，但未获得允许。这包括提供额外输入或停止解析器的尝试。

xml.parsers.expat.errors.XML\_ERROR\_NOT\_SUSPENDED[¶](#xml.parsers.expat.errors.XML_ERROR_NOT_SUSPENDED "Link to this definition")

在解析器未被挂起的时候执行恢复解析器的尝试。

xml.parsers.expat.errors.XML\_ERROR\_ABORTED[¶](#xml.parsers.expat.errors.XML_ERROR_ABORTED "Link to this definition")

此错误不应当被报告给 Python 应用程序。

xml.parsers.expat.errors.XML\_ERROR\_FINISHED[¶](#xml.parsers.expat.errors.XML_ERROR_FINISHED "Link to this definition")

在一个已经完成解析输入的解析器上请求执行操作，但未获得允许。这包括提供额外输入或停止解析器的尝试。

xml.parsers.expat.errors.XML\_ERROR\_SUSPEND\_PE[¶](#xml.parsers.expat.errors.XML_ERROR_SUSPEND_PE "Link to this definition")

xml.parsers.expat.errors.XML\_ERROR\_RESERVED\_PREFIX\_XML[¶](#xml.parsers.expat.errors.XML_ERROR_RESERVED_PREFIX_XML "Link to this definition")

有人试图撤销保留的命名空间前缀 `xml` 或将其绑定到另一个命名空间 URI。

xml.parsers.expat.errors.XML\_ERROR\_RESERVED\_PREFIX\_XMLNS[¶](#xml.parsers.expat.errors.XML_ERROR_RESERVED_PREFIX_XMLNS "Link to this definition")

有人试图声明或撤销保留的命名空间前缀 `xmlns`。

xml.parsers.expat.errors.XML\_ERROR\_RESERVED\_NAMESPACE\_URI[¶](#xml.parsers.expat.errors.XML_ERROR_RESERVED_NAMESPACE_URI "Link to this definition")

有人试图将一个保留的命名空间前缀 `xml` 和 `xmlns` 的 URI 绑定到另一个命名空间前缀。

xml.parsers.expat.errors.XML\_ERROR\_INVALID\_ARGUMENT[¶](#xml.parsers.expat.errors.XML_ERROR_INVALID_ARGUMENT "Link to this definition")

此错误不应当被报告给 Python 应用程序。

xml.parsers.expat.errors.XML\_ERROR\_NO\_BUFFER[¶](#xml.parsers.expat.errors.XML_ERROR_NO_BUFFER "Link to this definition")

此错误不应当被报告给 Python 应用程序。

xml.parsers.expat.errors.XML\_ERROR\_AMPLIFICATION\_LIMIT\_BREACH[¶](#xml.parsers.expat.errors.XML_ERROR_AMPLIFICATION_LIMIT_BREACH "Link to this definition")

输入放大系数的限制（来自 DTD 和实体）已被突破。

xml.parsers.expat.errors.XML\_ERROR\_NOT\_STARTED[¶](#xml.parsers.expat.errors.XML_ERROR_NOT_STARTED "Link to this definition")

在解析器启动之前尝试停止或挂起它。

Added in version 3.14.

备注
