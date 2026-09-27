**源代码:** [Lib/xml/dom/minidom.py](https://github.com/python/cpython/tree/3.14/Lib/xml/dom/minidom.py)

* * *

`xml.dom.minidom` 是文档对象模型接口的最小化实现，其 API 与其他语言中的类似。 它被设计为比完整的 DOM 更简单，同时也明显更小。 对 DOM 还不熟练的用户应当考虑改用 [`xml.etree.ElementTree`](https://docs.python.org/zh-cn/3/library/xml.etree.elementtree.html#module-xml.etree.ElementTree "xml.etree.ElementTree: Implementation of the ElementTree API.") 模块来进行 XML 处理。

备注

如果你需要解析不受信任或未经身份验证的数据，请参阅 [XML 安全](https://docs.python.org/zh-cn/3/library/xml.html#xml-security)。

DOM 应用程序通常会从将某些 XML 解析为一个 DOM 开始。 使用 `xml.dom.minidom` 时，这可通过解析函数来完成:

from xml.dom.minidom import parse, parseString

dom1 \= parse('c:\\\\temp\\\\mydata.xml')  \# 解析指定名称的 XML 文件

datasource \= open('c:\\\\temp\\\\mydata.xml')
dom2 \= parse(datasource)  \# 解析打开的文件

dom3 \= parseString('<myxml>Some data<empty/> some more data</myxml>')

[`parse()`](#xml.dom.minidom.parse "xml.dom.minidom.parse") 函数可接受一个文件名或者打开的文件对象。

xml.dom.minidom.parse(_filename\_or\_file_, _parser\=None_, _bufsize\=None_)[¶](#xml.dom.minidom.parse "Link to this definition")

根据给定的输入返回一个 `Document`。 _filename\_or\_file_ 可以是一个文件名，或是一个文件型对象。 如果给定 _parser_ 则它必须是一个 SAX2 解析器对象。 此函数将修改解析器的处理程序并激活命名空间支持；其他解析器配置（例如设置一个实体解析器）必须已经提前完成。

如果你将 XML 存放为字符串形式，则可以改用 [`parseString()`](#xml.dom.minidom.parseString "xml.dom.minidom.parseString") 函数:

xml.dom.minidom.parseString(_string_, _parser\=None_)[¶](#xml.dom.minidom.parseString "Link to this definition")

返回一个代表 _string_ 的 `Document`。 此方法会为指定字符串创建一个 [`io.StringIO`](https://docs.python.org/zh-cn/3/library/io.html#io.StringIO "io.StringIO") 对象并将其传递给 [`parse()`](#xml.dom.minidom.parse "xml.dom.minidom.parse")。

两个函数均返回一个代表文档内容的 `Document` 对象。

[`parse()`](#xml.dom.minidom.parse "xml.dom.minidom.parse") 和 [`parseString()`](#xml.dom.minidom.parseString "xml.dom.minidom.parseString") 函数所做的是将 XML 解析器连接到一个“DOM 构建器”，它可以从任意 SAX 解析器接收解析事件并将其转换为 DOM 树结构。 这两个函数的名称可能有些误导性，但在学习此接口时是很容易掌握的。 文档解析操作将在这两个函数返回之前完成；简单地说这两个函数本身并不提供解析器实现。

你也可以通过在 "DOM Implementation" 对象上调用方法来创建一个 `Document`。 你可以通过调用 [`xml.dom`](https://docs.python.org/zh-cn/3/library/xml.dom.html#module-xml.dom "xml.dom: Document Object Model API for Python.") 包或 `xml.dom.minidom` 模块中的 `getDOMImplementation()` 函数来获取此对象。 一旦你得到了 `Document`，你就可以向它添加子节点来填充 DOM:

from xml.dom.minidom import getDOMImplementation

impl \= getDOMImplementation()

newdoc \= impl.createDocument(None, "some\_tag", None)
top\_element \= newdoc.documentElement
text \= newdoc.createTextNode('Some textual content.')
top\_element.appendChild(text)

一旦你得到了 DOM 文档对象，你就可以通过其属性和方法访问对应 XML 文档的各个部分。 这些属性定义在 DOM 规格说明当中；文档对象的主要特征属性是 `documentElement`。 它给出了 XML 文档中的主元素：即包含了所有其他元素的元素。 以下是一个示例程序:

dom3 \= parseString("<myxml>Some data</myxml>")
assert dom3.documentElement.tagName \== "myxml"

当你处理完 DOM 树后，你可以选择调用 `unlink()` 方法来促使不再需要的对象被尽早清理。 `unlink()` 是 `xml.dom.minidom`对 DOM API 的专属扩展，它会使节点及其后代节点变得基本不可用。 否则，Python 的垃圾回收器最终将处理树中的对象。

## DOM 对象[¶](#dom-objects "Link to this heading")

Python 的 DOM API 定义是作为 [`xml.dom`](https://docs.python.org/zh-cn/3/library/xml.dom.html#module-xml.dom "xml.dom: Document Object Model API for Python.") 模块文档的一部分给出的。 本节列出了该 API 与 `xml.dom.minidom` 之间的差异。

Node.unlink()[¶](#xml.dom.minidom.Node.unlink "Link to this definition")

破坏 DOM 的内部引用以便它能在没有循环 GC 的 Python 版本上被垃圾回收器回收。 即使在循环 GC 可用的时候，使用此方法也可让大量内存更快变为可用，因此当 DOM 对象不再被需要时尽早调用它们的这个方法是很好的做法。 此方法只须在 `Document` 对象上调用，但也可以在下级节点上调用以丢弃该节点的下级节点。

你可以通过使用 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句来避免显式调用此方法。 以下代码会在 `with` 代码块退出时自动取消链接 _dom_:

with xml.dom.minidom.parse(datasource) as dom:
    ... \# 操作 dom。

Node.writexml(_writer_, _indent\=''_, _addindent\=''_, _newl\=''_, _encoding\=None_, _standalone\=None_)[¶](#xml.dom.minidom.Node.writexml "Link to this definition")

将 XML 写入到写入器对象。 写入器接受文本而非字节串作为输入，它应当具有与文件对象接口相匹配的 `write()` 方法。 _indent_ 形参是当前节点的缩进层级。 _addindent_ 形参是用于当前节点的下级节点的缩进量。 _newl_ 形参指定用于一行结束的字符串。

对于 `Document` 节点，可以使用附加的关键字参数 _encoding_ 来指定 XML 标头的编码格式字段。

类似地，显式指明 _standalone_ 参数将会使单独的文档声明被添加到 XML 文档的开头部分。 如果将该值设为 `True`，则会添加 `standalone="yes"`，否则它会被设为 `"no"`。 未指明该参数将使文档声明被省略。

在 3.8 版本发生变更: [`writexml()`](#xml.dom.minidom.Node.writexml "xml.dom.minidom.Node.writexml") 方法现在会保留用户指定的属性顺序。

在 3.9 版本发生变更: 增加了 _standalone_ 形参。

Node.toxml(_encoding\=None_, _standalone\=None_)[¶](#xml.dom.minidom.Node.toxml "Link to this definition")

返回一个包含 XML DOM 节点所代表的 XML 的字符串或字节串。

带有显式的 _encoding_ [\[1\]](#id3) 参数时，结果为使用指定编码格式的字节串。 没有 _encoding_ 参数时，结果为 Unicode 字符串，并且结果字符串中的 XML 声明将不指定编码格式。 使用 UTF-8 以外的编码格式对此字符串进行编码通常是不正确的，因为 UTF-8 是 XML 的默认编码格式。

_standalone_ 参数的行为与 [`writexml()`](#xml.dom.minidom.Node.writexml "xml.dom.minidom.Node.writexml") 中的完全一致。

在 3.8 版本发生变更: [`toxml()`](#xml.dom.minidom.Node.toxml "xml.dom.minidom.Node.toxml") 方法现在会保留用户指定的属性顺序。

在 3.9 版本发生变更: 增加了 _standalone_ 形参。

Node.toprettyxml(_indent\='\\t'_, _newl\='\\n'_, _encoding\=None_, _standalone\=None_)[¶](#xml.dom.minidom.Node.toprettyxml "Link to this definition")

返回文档的美化打印版本。 _indent_ 指定缩进字符串并默认为制表符；_newl_ 指定标示每行结束的字符串并默认为 `\n`。

_encoding_ 参数的行为类似于 [`toxml()`](#xml.dom.minidom.Node.toxml "xml.dom.minidom.Node.toxml") 的对应参数。

_standalone_ 参数的行为与 [`writexml()`](#xml.dom.minidom.Node.writexml "xml.dom.minidom.Node.writexml") 中的完全一致。

在 3.8 版本发生变更: [`toprettyxml()`](#xml.dom.minidom.Node.toprettyxml "xml.dom.minidom.Node.toprettyxml") 方法现在会保留用户指定的属性顺序。

在 3.9 版本发生变更: 增加了 _standalone_ 形参。

## DOM 示例[¶](#dom-example "Link to this heading")

此示例程序是个相当实际的简单程序示例。 在这个特定情况中，我们没有过多地利用 DOM 的灵活性。

import xml.dom.minidom

document \= """\\
<slideshow>
<title>Demo slideshow</title>
<slide><title>Slide title</title>
<point>This is a demo</point>
<point>Of a program for processing slides</point>
</slide>

<slide><title>Another demo slide</title>
<point>It is important</point>
<point>To have more than</point>
<point>one slide</point>
</slide>
</slideshow>
"""

dom \= xml.dom.minidom.parseString(document)

def getText(nodelist):
    rc \= \[\]
    for node in nodelist:
        if node.nodeType \== node.TEXT\_NODE:
            rc.append(node.data)
    return ''.join(rc)

def handleSlideshow(slideshow):
    print("<html>")
    handleSlideshowTitle(slideshow.getElementsByTagName("title")\[0\])
    slides \= slideshow.getElementsByTagName("slide")
    handleToc(slides)
    handleSlides(slides)
    print("</html>")

def handleSlides(slides):
    for slide in slides:
        handleSlide(slide)

def handleSlide(slide):
    handleSlideTitle(slide.getElementsByTagName("title")\[0\])
    handlePoints(slide.getElementsByTagName("point"))

def handleSlideshowTitle(title):
    print(f"<title>{getText(title.childNodes)}</title>")

def handleSlideTitle(title):
    print(f"<h2>{getText(title.childNodes)}</h2>")

def handlePoints(points):
    print("<ul>")
    for point in points:
        handlePoint(point)
    print("</ul>")

def handlePoint(point):
    print(f"<li>{getText(point.childNodes)}</li>")

def handleToc(slides):
    for slide in slides:
        title \= slide.getElementsByTagName("title")\[0\]
        print(f"<p>{getText(title.childNodes)}</p>")

handleSlideshow(dom)

## minidom 和 DOM 标准[¶](#minidom-and-the-dom-standard "Link to this heading")

`xml.dom.minidom` 模块本质上是一个兼容 DOM 1.0 的 DOM，附带某些 DOM 2 特性（主要是命名空间特性）。

Python 中 DOM 接口的用法十分直观。 会应用下列映射规则:

-   接口是通过实例对象来访问的。 应用程序不应实例化这些类本身；它们应当使用 `Document` 对象提供的创建器函数。 派生的接口支持上级接口的所有操作（和属性），并添加了新的操作。
    
-   操作以方法的形式使用。 由于 DOM 只使用 [`in`](https://docs.python.org/zh-cn/3/reference/expressions.html#in) 形参，参数是以正常顺序传入的（从左至右）。 不存在可选参数。 `void` 操作返回 `None`。
    
-   IDL 属性会映射到实例属性。 为了兼容针对 Python 的 OMG IDL 语言映射，属性 `foo` 也可通过访问器方法 `_get_foo()` 和 `_set_foo()` 来访问。 `readonly` 属性不可被修改；运行时并不强制要求这一点。
    
-   `short int`, `unsigned int`, `unsigned long long` 和 `boolean` 类型都会映射为 Python 整数类型。
    
-   `DOMString` 类型会映射为 Python 字符串。 `xml.dom.minidom` 支持字节串或字符串，但通常会产生字符串。 在 W3C 的 DOM 规格说明允许使用 IDL `null` 值的地方，`DOMString` 类型的值也可以为 `None`。
    
-   `const` 声明会映射为它们各自的作用域内的变量 (例如 `xml.dom.minidom.Node.PROCESSING_INSTRUCTION_NODE`)；它们不可被修改。
    
-   `DOMException` 目前在 `xml.dom.minidom` 中未被支持。 `xml.dom.minidom` 转而使用标准的 Python 异常，例如 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError") 和 [`AttributeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#AttributeError "AttributeError")。
    
-   Each of the [`NodeList`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.NodeList "xml.dom.NodeList") and [`NamedNodeMap`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.NamedNodeMap "xml.dom.NamedNodeMap") interfaces has two implementations, which provide additional methods and operations.
    
    [`childNodes`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.Node.childNodes "xml.dom.Node.childNodes") is a subclass of [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list"), or, for nodes which cannot have children, a subclass of [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple"). It supports iteration, concatenation, indexing and slicing.
    
    [`attributes`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.Node.attributes "xml.dom.Node.attributes") supports `len()`, the [`in`](https://docs.python.org/zh-cn/3/reference/expressions.html#in) operator, subscription by a name or by a `(namespaceURI, localName)` tuple, assignment and deletion, and the methods `get()`, `keys()`, `keysNS()`, `values()`, `items()` and `itemsNS()`. [`entities`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.DocumentType.entities "xml.dom.DocumentType.entities") and [`notations`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.DocumentType.notations "xml.dom.DocumentType.notations") are read-only and support only `len()` and subscription by a name.
    
-   [`strictErrorChecking`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.Document.strictErrorChecking "xml.dom.Document.strictErrorChecking") and [`specified`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.Attr.specified "xml.dom.Attr.specified") are always `False`.
    
-   [`removeAttribute()`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.Element.removeAttribute "xml.dom.Element.removeAttribute") and [`removeAttributeNS()`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.Element.removeAttributeNS "xml.dom.Element.removeAttributeNS") raise [`NotFoundErr`](https://docs.python.org/zh-cn/3/library/xml.dom.html#xml.dom.NotFoundErr "xml.dom.NotFoundErr") if there is no matching attribute, while the DOM specifies that this has no effect.
    

以下接口在 `xml.dom.minidom` 中没有实现：

-   `DOMTimeStamp`
    
-   `EntityReference`
    

这些接口所反映的 XML 文档信息对于大多数 DOM 用户来说没有什么帮助。

脚注
