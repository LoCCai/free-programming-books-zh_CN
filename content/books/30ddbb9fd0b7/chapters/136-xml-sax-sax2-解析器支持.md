**源代码:** [Lib/xml/sax/\_\_init\_\_.py](https://github.com/python/cpython/tree/3.14/Lib/xml/sax/__init__.py)

* * *

`xml.sax` 包提供了许多实现 XML 简单 API (SAX) 接口的模块供 Python 使用。 这个包本身提供了 SAX 异常和 SAX API 用户最常使用的便捷函数。

备注

如果你需要解析不受信任或未经身份验证的数据，请参阅 [XML 安全](https://docs.python.org/zh-cn/3/library/xml.html#xml-security)。

在 3.7.1 版本发生变更: SAX 解析器默认不会再处理通用外部实体以便提升安全性。 在此之前，解析器会创建网络连接来获取远程文件或是从文件系统加载本地文件以处理 DTD 和实体。 此特性可通过在解析器对象上调用 [`setFeature()`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.XMLReader.setFeature "xml.sax.xmlreader.XMLReader.setFeature") 方法并传入参数 [`feature_external_ges`](https://docs.python.org/zh-cn/3/library/xml.sax.handler.html#xml.sax.handler.feature_external_ges "xml.sax.handler.feature_external_ges") 来重新启用。

The convenience functions and data are:

xml.sax.make\_parser(_parser\_list\=()_)[¶](#xml.sax.make_parser "Link to this definition")

创建并返回一个 SAX [`XMLReader`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.XMLReader "xml.sax.xmlreader.XMLReader") 对象。 将返回第一个被找到的解析器。 如果提供了 _parser\_list_，它必须为一个包含字符串的可迭代对象，这些字符串指定了具有名为 `create_parser()` 函数的模块。 在 _parser\_list_ 中列出的模块将在默认解析器列表中的模块之前被使用。

在 3.8 版本发生变更: _parser\_list_ 参数可以是任意可迭代对象，而不一定是列表。

xml.sax.parse(_filename\_or\_stream_, _handler_, _errorHandler\=handler.ErrorHandler()_)[¶](#xml.sax.parse "Link to this definition")

Create a SAX parser and use it to parse a document. The document, passed in as _filename\_or\_stream_, can be a system identifier (a string identifying the input source -- typically a file name or a URL), a [path-like](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object) object, or a file object. A system identifier which does not refer to an existing file is opened with [`urllib.request.urlopen()`](https://docs.python.org/zh-cn/3/library/urllib.request.html#urllib.request.urlopen "urllib.request.urlopen"). The _handler_ parameter needs to be a SAX [`ContentHandler`](https://docs.python.org/zh-cn/3/library/xml.sax.handler.html#xml.sax.handler.ContentHandler "xml.sax.handler.ContentHandler") instance. If _errorHandler_ is given, it must be a SAX [`ErrorHandler`](https://docs.python.org/zh-cn/3/library/xml.sax.handler.html#xml.sax.handler.ErrorHandler "xml.sax.handler.ErrorHandler") instance; if omitted, [`SAXParseException`](#xml.sax.SAXParseException "xml.sax.SAXParseException") will be raised on all errors. There is no return value; all work must be done by the _handler_ passed in.

xml.sax.parseString(_string_, _handler_, _errorHandler\=handler.ErrorHandler()_)[¶](#xml.sax.parseString "Link to this definition")

类似于 [`parse()`](#xml.sax.parse "xml.sax.parse")，但解析对象是作为形参传入的缓冲区 _string_。 _string_ 必须为 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 实例或者 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object)。

在 3.5 版本发生变更: 增加了对 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 实例的支持。

xml.sax.default\_parser\_list[¶](#xml.sax.default_parser_list "Link to this definition")

The list of the names of modules which are tried by [`make_parser()`](#xml.sax.make_parser "xml.sax.make_parser") after the modules named in its _parser\_list_ argument. It contains `'xml.sax.expatreader'`, or, if the `PY_SAX_PARSER` environment variable is set and the environment is not ignored, the comma-separated list of module names taken from it.

典型的 SAX 应用程序会使用三种对象：读取器、处理器和输入源。 “读取器”在此上下文中与解析器同义，即某个从输入源读取字节或字符，并产生事件序列的代码段。 事件随后将被分发给处理器对象，即由读取器调用处理器上的某个方法。 因此 SAX 应用程序必须获取一个读取器对象，创建或打开输入源，创建处理器，并将这些对象连接到一起。 作为准备工作的最后一步，将调用读取器来解析输入内容。 在解析过程中，会根据来自输入数据的结构化和语法化事件来调用处理器对象上的方法。

对于这些对象，只有接口才是重要的；它们通常不由应用程序本身来实例化。 由于 Python 没有显式的接口概念，它们在形式上被表示为类，但应用程序可以使用不继承自所提供的类的具体实现。 [`InputSource`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.InputSource "xml.sax.xmlreader.InputSource")、[`Locator`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.Locator "xml.sax.xmlreader.Locator")、`Attributes`、`AttributesNS` 和 [`XMLReader`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.XMLReader "xml.sax.xmlreader.XMLReader") 接口是在 [`xml.sax.xmlreader`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#module-xml.sax.xmlreader "xml.sax.xmlreader: Interface which SAX-compliant XML parsers must implement.") 模块中定义的。 处理器接口是在 [`xml.sax.handler`](https://docs.python.org/zh-cn/3/library/xml.sax.handler.html#module-xml.sax.handler "xml.sax.handler: Base classes for SAX event handlers.") 中定义的。 为方便起见，`InputSource` (通常会被直接实例化) 和处理器类也可以从 `xml.sax` 获取。 下面将介绍这些接口。

除了这些类之外，`xml.sax` 还提供了以下异常类。

_exception_ xml.sax.SAXException(_msg_, _exception\=None_)[¶](#xml.sax.SAXException "Link to this definition")

封装某个 XML 错误或警告。 这个类可以包含来自 XML 解析器或应用程序的基本错误或警告信息：它可以被子类化以提供额外的功能或是添加本地化信息。 请注意虽然在 [`ErrorHandler`](https://docs.python.org/zh-cn/3/library/xml.sax.handler.html#xml.sax.handler.ErrorHandler "xml.sax.handler.ErrorHandler") 接口中定义的处理器可以接收该异常的实例，但是并不要求实际引发该异常 --- 它也可以被用作信息的容器。

当实例化时，_msg_ 应当是适合人类阅读的错误描述。 如果给出了可选的 _exception_ 形参，它应当为 `None` 或者是被解析代码所捕获并将作为信息传递的异常。

这是其他 SAX 异常类的基类。

_exception_ xml.sax.SAXParseException(_msg_, _exception_, _locator_)[¶](#xml.sax.SAXParseException "Link to this definition")

[`SAXException`](#xml.sax.SAXException "xml.sax.SAXException") 的子类，针对解析错误引发。 这个类的实例会被传递给 SAX [`ErrorHandler`](https://docs.python.org/zh-cn/3/library/xml.sax.handler.html#xml.sax.handler.ErrorHandler "xml.sax.handler.ErrorHandler") 接口的方法来提供关于解析错误的信息。 这个类支持 SAX [`Locator`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.Locator "xml.sax.xmlreader.Locator") 接口以及 [`SAXException`](#xml.sax.SAXException "xml.sax.SAXException") 接口。

_exception_ xml.sax.SAXNotRecognizedException(_msg_, _exception\=None_)[¶](#xml.sax.SAXNotRecognizedException "Link to this definition")

[`SAXException`](#xml.sax.SAXException "xml.sax.SAXException") 的子类，当 SAX [`XMLReader`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.XMLReader "xml.sax.xmlreader.XMLReader") 遇到不可识别的特性或属性时引发。 SAX 应用程序和扩展可能会出于类似目的而使用这个类。

_exception_ xml.sax.SAXNotSupportedException(_msg_, _exception\=None_)[¶](#xml.sax.SAXNotSupportedException "Link to this definition")

[`SAXException`](#xml.sax.SAXException "xml.sax.SAXException") 的子类，当 SAX [`XMLReader`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.XMLReader "xml.sax.xmlreader.XMLReader") 被要求启用某个不受支持的特性，或者将某个属性设为具体实现不支持的值时引发。 SAX 应用程序和扩展可能会出于类似目的而使用这个类。

_exception_ xml.sax.SAXReaderNotAvailable(_msg_, _exception\=None_)[¶](#xml.sax.SAXReaderNotAvailable "Link to this definition")

Subclass of [`SAXNotSupportedException`](#xml.sax.SAXNotSupportedException "xml.sax.SAXNotSupportedException") raised when no parser is available. A parser module raises it when it is imported or during parsing if the parser it provides cannot be used, and [`make_parser()`](#xml.sax.make_parser "xml.sax.make_parser") raises it if no module from the tried ones provides a usable parser.

## SAXException 对象[¶](#saxexception-objects "Link to this heading")

[`SAXException`](#xml.sax.SAXException "xml.sax.SAXException") 异常类支持下列方法:

SAXException.getMessage()[¶](#xml.sax.SAXException.getMessage "Link to this definition")

返回描述错误条件的适合人类阅读的消息。

SAXException.getException()[¶](#xml.sax.SAXException.getException "Link to this definition")

返回一个封装的异常对象或者 `None`。
