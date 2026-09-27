**源代码:** [Lib/xml/dom/pulldom.py](https://github.com/python/cpython/tree/3.14/Lib/xml/dom/pulldom.py)

* * *

`xml.dom.pulldom` 模块提供了一个“拉取式解析器”，它也可以在必要时生成文档中可通过 DOM 访问的片段。基本概念涉及从传入的 XML 流中拉取“事件”并对其进行处理。 与同样采用事件驱动处理模型并结合回调的 SAX 不同，拉取式解析器的使用者需要负责显式地从流中拉取事件，循环遍历这些事件直到处理完成或出现错误条件。

备注

如果你需要解析不受信任或未经身份验证的数据，请参阅 [XML 安全](https://docs.python.org/zh-cn/3/library/xml.html#xml-security)。

在 3.7.1 版本发生变更: SAX 解析器默认不再处理一般外部实体以提升在默认情况下的安全性。 要启用外部实体处理，请传入一个自定义的解析器实例:

from xml.dom.pulldom import parse
from xml.sax import make\_parser
from xml.sax.handler import feature\_external\_ges

parser \= make\_parser()
parser.setFeature(feature\_external\_ges, True)
parse(filename, parser\=parser)

示例:

from xml.dom import pulldom

doc \= pulldom.parse('sales\_items.xml')
for event, node in doc:
    if event \== pulldom.START\_ELEMENT and node.tagName \== 'item':
        if int(node.getAttribute('price')) \> 50:
            doc.expandNode(node)
            print(node.toxml())

`event` is one of the following constants, and `node` is the node which the event is about. The nodes implement the [`xml.dom`](https://docs.python.org/zh-cn/3/library/xml.dom.html#module-xml.dom "xml.dom: Document Object Model API for Python.") interfaces; they are created by the DOM implementation given to [`PullDOM`](#xml.dom.pulldom.PullDOM "xml.dom.pulldom.PullDOM"), which is [`xml.dom.minidom`](https://docs.python.org/zh-cn/3/library/xml.dom.minidom.html#module-xml.dom.minidom "xml.dom.minidom: Minimal Document Object Model (DOM) implementation.") by default.

xml.dom.pulldom.START\_DOCUMENT[¶](#xml.dom.pulldom.START_DOCUMENT "Link to this definition")

xml.dom.pulldom.END\_DOCUMENT[¶](#xml.dom.pulldom.END_DOCUMENT "Link to this definition")

The start and the end of the document. _node_ is the [`Document`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.Document "xml.dom.Document").

xml.dom.pulldom.START\_ELEMENT[¶](#xml.dom.pulldom.START_ELEMENT "Link to this definition")

xml.dom.pulldom.END\_ELEMENT[¶](#xml.dom.pulldom.END_ELEMENT "Link to this definition")

The start tag and the end tag of an element. _node_ is the [`Element`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.Element "xml.dom.Element").

xml.dom.pulldom.CHARACTERS[¶](#xml.dom.pulldom.CHARACTERS "Link to this definition")

字符数据。 _node_ 是 [`Text`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.Text "xml.dom.Text") 节点。

xml.dom.pulldom.IGNORABLE\_WHITESPACE[¶](#xml.dom.pulldom.IGNORABLE_WHITESPACE "Link to this definition")

元素内容中的空白符，见 DTD 中的声明。 _node_ 是 [`Text`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.Text "xml.dom.Text") 节点。

注释。 _node_ 是 [`Comment`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.Comment "xml.dom.Comment") 节点。

xml.dom.pulldom.PROCESSING\_INSTRUCTION[¶](#xml.dom.pulldom.PROCESSING_INSTRUCTION "Link to this definition")

处理指令。 _node_ 是 [`ProcessingInstruction`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.ProcessingInstruction "xml.dom.ProcessingInstruction") 节点。

由于文档是被当作“展平”的事件流来处理的，文档“树”会被隐式地遍历并且无论所需元素在树中的深度如何都会被找到。 换句话说，不需要考虑层级问题，例如文档节点的递归搜索等，但是如果元素的上下文很重要，则有必要保留一些上下文相关的状态（例如记住任意给定点在文档中的位置）或者使用 [`DOMEventStream.expandNode()`](#xml.dom.pulldom.DOMEventStream.expandNode "xml.dom.pulldom.DOMEventStream.expandNode") 方法并切换到 DOM 相关的处理过程。

_class_ xml.dom.pulldom.PullDOM(_documentFactory\=None_)[¶](#xml.dom.pulldom.PullDOM "Link to this definition")

Subclass of [`xml.sax.handler.ContentHandler`](https://docs.python.org/zh-cn/3/library/xml.sax.handler.html#xml.sax.handler.ContentHandler "xml.sax.handler.ContentHandler") which turns SAX events into the events of the pull parser. The nodes are created, but they are not added to the tree, unless [`expandNode()`](#xml.dom.pulldom.DOMEventStream.expandNode "xml.dom.pulldom.DOMEventStream.expandNode") is called. _documentFactory_, if given, is a DOM implementation used to create the document; by default the implementation of [`xml.dom.minidom`](https://docs.python.org/zh-cn/3/library/xml.dom.minidom.html#module-xml.dom.minidom "xml.dom.minidom: Minimal Document Object Model (DOM) implementation.") is used.

_class_ xml.dom.pulldom.SAX2DOM(_documentFactory\=None_)[¶](#xml.dom.pulldom.SAX2DOM "Link to this definition")

Subclass of [`PullDOM`](#xml.dom.pulldom.PullDOM "xml.dom.pulldom.PullDOM") which also adds every created node to the tree, so that the complete document is built.

xml.dom.pulldom.parse(_stream\_or\_string_, _parser\=None_, _bufsize\=None_)[¶](#xml.dom.pulldom.parse "Link to this definition")

基于给定的输入返回一个 [`DOMEventStream`](#xml.dom.pulldom.DOMEventStream "xml.dom.pulldom.DOMEventStream")。 _stream\_or\_string_ 可以是一个文件名，或是一个文件型对象。 _parser_ 如果给出，则必须是一个 [`XMLReader`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.XMLReader "xml.sax.xmlreader.XMLReader") 对象。 此函数将改变解析器的文档处理程序并激活命名空间支持；其他解析器配置（例如设置实体解析器）必须在之前已完成。

如果你将 XML 存放为字符串形式，则可以改用 [`parseString()`](#xml.dom.pulldom.parseString "xml.dom.pulldom.parseString") 函数:

xml.dom.pulldom.parseString(_string_, _parser\=None_)[¶](#xml.dom.pulldom.parseString "Link to this definition")

Return a [`DOMEventStream`](#xml.dom.pulldom.DOMEventStream "xml.dom.pulldom.DOMEventStream") that represents the _string_. _string_ must be a [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") instance; to parse bytes, pass a binary file object to [`parse()`](#xml.dom.pulldom.parse "xml.dom.pulldom.parse").

xml.dom.pulldom.default\_bufsize[¶](#xml.dom.pulldom.default_bufsize "Link to this definition")

[`parse()`](#xml.dom.pulldom.parse "xml.dom.pulldom.parse") 的 _bufsize_ 形参的默认值。

此变量的值可在调用 [`parse()`](#xml.dom.pulldom.parse "xml.dom.pulldom.parse") 之前修改并使新值生效。

## DOMEventStream 对象[¶](#domeventstream-objects "Link to this heading")

_class_ xml.dom.pulldom.DOMEventStream(_stream_, _parser_, _bufsize_)[¶](#xml.dom.pulldom.DOMEventStream "Link to this definition")

Produce the events for the data read from the file object _stream_ by the [`XMLReader`](https://docs.python.org/zh-cn/3/library/xml.sax.reader.html#xml.sax.xmlreader.XMLReader "xml.sax.xmlreader.XMLReader") _parser_. The data is read by _bufsize_ bytes, or characters for a text stream, at a time.

getEvent()[¶](#xml.dom.pulldom.DOMEventStream.getEvent "Link to this definition")

Return the next `(event, node)` tuple, or `None` at the end of the document. See above for the events and the corresponding nodes. The current node does not contain information about its children, unless [`expandNode()`](#xml.dom.pulldom.DOMEventStream.expandNode "xml.dom.pulldom.DOMEventStream.expandNode") is called.

expandNode(_node_)[¶](#xml.dom.pulldom.DOMEventStream.expandNode "Link to this definition")

将 _node_ 的所有子节点扩展到 _node_ 中。 例如:

from xml.dom import pulldom

xml \= '<html><title>Foo</title> <p>Some text <div>and more</div></p> </html>'
doc \= pulldom.parseString(xml)
for event, node in doc:
    if event \== pulldom.START\_ELEMENT and node.tagName \== 'p':
        \# 以下语句只打印 '<p/>'
        print(node.toxml())
        doc.expandNode(node)
        \# 以下语句将打印节点所有的子节点 '<p>Some text <div>and more</div></p>'
        print(node.toxml())

reset()[¶](#xml.dom.pulldom.DOMEventStream.reset "Link to this definition")

Discard the events which are not read yet and prepare the object for parsing a new document.

clear()[¶](#xml.dom.pulldom.DOMEventStream.clear "Link to this definition")

Release the parser and the document. The stream is not closed, and the object can no longer be used.
