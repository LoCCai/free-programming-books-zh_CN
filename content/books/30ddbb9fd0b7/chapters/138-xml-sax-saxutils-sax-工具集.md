**源代码:** [Lib/xml/sax/saxutils.py](https://github.com/python/cpython/tree/3.14/Lib/xml/sax/saxutils.py)

* * *

`xml.sax.saxutils` 模块包含一些在创建 SAX 应用时常用的类和函数，它们可以直接使用，也可以作为基类。

xml.sax.saxutils.escape(_data_, _entities\={}_)[¶](#xml.sax.saxutils.escape "Link to this definition")

对数据字符串中的 `'&'`, `'<'` 和 `'>'` 进行转义。

你可以通过传入一个字典作为可选的 _entities_ 形参来对其他字符串数据进行转义。 字典的键和值必须为字符串；每个键将被替换为其所对应的值。 字符 `'&'`, `'<'` 和 `'>'` 总是会被转义，即使提供了 _entities_。

备注

此函数应当仅用于对无法直接在 XML 中使用的字符进行转义。 请不要将此函数用作通用的字符串转换函数。

xml.sax.saxutils.unescape(_data_, _entities\={}_)[¶](#xml.sax.saxutils.unescape "Link to this definition")

对字符串数据中的 `'&amp;'`, `'&lt;'` 和 `'&gt;'` 进行反转义。

你可以通过传入一个字典作为可选的 _entities_ 形参来对其他数据字符串进行反转义；字典的键和值必须都为字符串；每个键将被替换为其对应的值。 `'&amp;'`, `'&lt;'` 和 `'&gt;'` 将总是被反转义，即使提供了 _entities_。

xml.sax.saxutils.quoteattr(_data_, _entities\={}_)[¶](#xml.sax.saxutils.quoteattr "Link to this definition")

类似于 [`escape()`](#xml.sax.saxutils.escape "xml.sax.saxutils.escape")，但还会对 _data_ 进行处理以将其用作属性值。 返回值是 _data_ 加上任何额外要求的替换的带引号版本。 [`quoteattr()`](#xml.sax.saxutils.quoteattr "xml.sax.saxutils.quoteattr") 将基于 _data_ 的内容选择一个引号字符，以尽量避免在字符串中编码任何引号字符。 如果单双引号字符在 _data_ 中都存在，则双引号字符将被编码并且 _data_ 将使用双引号来标记。 结果字符串可被直接用作属性值:

\>>> print("<element attr=%s\>" % quoteattr("ab ' cd \\" ef"))
<element attr="ab ' cd &quot; ef">

此函数适用于为 HTML 或任何使用引用具体语法的 SGML 生成属性值。

_class_ xml.sax.saxutils.XMLGenerator(_out\=None_, _encoding\='iso-8859-1'_, _short\_empty\_elements\=False_)[¶](#xml.sax.saxutils.XMLGenerator "Link to this definition")

这个类通过将 SAX 事件写回到 XML 文档来实现 [`ContentHandler`](https://docs.python.org/zh-cn/3/library/xml.sax.handler.html#xml.sax.handler.ContentHandler "xml.sax.handler.ContentHandler") 接口。 换句话说，使用 [`XMLGenerator`](#xml.sax.saxutils.XMLGenerator "xml.sax.saxutils.XMLGenerator") 作为内容处理程序将重新产生所解析的原始文档。 _out_ 应当为一个文件型对象，它默认将为 _sys.stdout_。 _encoding_ 为输出流的编码格式，它默认将为 `'iso-8859-1'`。 _short\_empty\_elements_ 控制不包含内容的元素的格式化：如为 `False` (默认值) 则它们会以开始/结束标记对的形式被发送，如果设为 `True` 则它们会以单个自结束标记的形式被发送。

在 3.2 版本发生变更: 增加了 _short\_empty\_elements_ 形参。

_class_ xml.sax.saxutils.XMLFilterBase(_base_)[¶](#xml.sax.saxutils.XMLFilterBase "Link to this definition")

这个类被设计用来分隔 [`XMLReader`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.XMLReader "xml.sax.xmlreader.XMLReader") 和客户端应用的事件处理程序。 在默认情况下，它除了将请求传送给读取器并将事件传送给处理程序之外什么都不做，但其子类可以重载特定的方法以在传送它们的时候修改事件流或配置请求。

getParent()[¶](#xml.sax.saxutils.XMLFilterBase.getParent "Link to this definition")

Return the parent reader, or `None` if it is not set.

setParent(_parent_)[¶](#xml.sax.saxutils.XMLFilterBase.setParent "Link to this definition")

Set the parent reader, which the events are read from.

xml.sax.saxutils.prepare\_input\_source(_source_, _base\=''_)[¶](#xml.sax.saxutils.prepare_input_source "Link to this definition")

此函数接受一个输入源和一个可选的基准 URL 并返回一个经过完整解析可供读取的 [`InputSource`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.InputSource "xml.sax.xmlreader.InputSource") 对象。 输入源的给出形式可以是字符串、文件型对象或 `InputSource` 对象；解析器将使用此函数来针对它们的 [`parse()`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.XMLReader.parse "xml.sax.xmlreader.XMLReader.parse") 方法实现多态 _source_ 参数。
