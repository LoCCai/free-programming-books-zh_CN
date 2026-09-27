**源代码:** [Lib/xml/dom/\_\_init\_\_.py](https://github.com/python/cpython/tree/3.14/Lib/xml/dom/__init__.py)

* * *

文档对象模型“DOM”是一个来自万维网联盟（W3C）的跨语言 API，用于访问和修改 XML 文档。 DOM 的实现将 XML 文档以树结构表示，或者允许客户端代码从头构建这样的结构。 然后它会通过一组提供通用接口的对象赋予对结构的访问权。

DOM 特别适用于进行随机访问的应用。 SAX 仅允许你每次查看文档的一小部分。 如果你正在查看一个 SAX 元素，你将不能访问其他元素。 如果你正在查看一个文本节点，你将不能访问包含它的元素。 当你编写一个 SAX 应用时，你需要在你自己的代码的某个地方记住你的程序在文档中的位置。 SAX 不会帮你做这件事。 并且，如果你想要在 XML 文档中向前查看，你是绝对办不到的。

有些应用程序在不能访问树的事件驱动模型中是根本无法编写的。 当然你可以在 SAX 事件中自行构建某种树，但是 DOM 可以使你避免编写这样的代码。 DOM 是针对 XML 数据的标准树表示形式。

文档对象模型是由 W3C 分阶段定义的，在其术语中称为“层级”。 Python 中该 API 的映射大致是基于 DOM 第 2 层级的建议。

DOM 应用程序通常从将某些 XML 解析为 DOM 开始。 此操作如何实现完全未被 DOM 第 1 层级所涉及，而第 2 层级也只提供了有限的改进：有一个 [`DOMImplementation`](#xml.dom.DOMImplementation "xml.dom.DOMImplementation") 对象类，它提供对 [`Document`](#xml.dom.Document "xml.dom.Document") 创建方法的访问，但却没有办法以不依赖具体实现的方式访问 XML 读取器/解析器/文档创建器。 也没有当不存在 `Document` 对象的情况下访问这些方法的定义良好的方式。 在 Python 中，每个 DOM 实现将提供一个函数 [`getDOMImplementation()`](#xml.dom.getDOMImplementation "xml.dom.getDOMImplementation")。 DOM 第 3 层级增加了一个载入/存储规格说明，它定义了与读取器的接口，但这在 Python 标准库中尚不可用。

一旦你得到了 DOM 文档对象，你就可以通过 XML 文档的属性和方法访问它的各个部分。 这些属性定义在 DOM 规格说明当中；参考指南的这一部分描述了 Python 对此规格说明的解读。

W3C 提供的规格说明定义了适用于 Java, ECMAScript 和 OMG IDL 的 DOM API。 这里定义的 Python 映射很大程度上是基于此规格说明的 IDL 版本，但并不要求严格映射（但具体实现可以自由地支持对 IDL 的严格映射）。 请参阅 [一致性](#dom-conformance) 一节查看有关映射要求的详细讨论。

## 模块内容[¶](#module-contents "Link to this heading")

`xml.dom` 包含以下函数:

xml.dom.registerDOMImplementation(_name_, _factory_)[¶](#xml.dom.registerDOMImplementation "Link to this definition")

注册 _factory_ 函数并使用名称 _name_。 该工厂函数应当返回一个实现了 [`DOMImplementation`](#xml.dom.DOMImplementation "xml.dom.DOMImplementation") 接口的对象。 该工厂函数可每次都返回相同对象，或每次调用都返回新的对象，视具体实现的要求而定（例如该实现是否支持某些定制功能）。

xml.dom.getDOMImplementation(_name\=None_, _features\=()_)[¶](#xml.dom.getDOMImplementation "Link to this definition")

Return a suitable DOM implementation. The _name_ is either well-known, the module name of a DOM implementation, or `None`. If it is not `None`, imports the corresponding module and returns a [`DOMImplementation`](#xml.dom.DOMImplementation "xml.dom.DOMImplementation") object if the import succeeds. If no name is given, and if the environment variable `PYTHON_DOM` is set, this variable is used to find the implementation. The only well-known name in the standard library is `'minidom'`, for [`xml.dom.minidom`](https://docs.python.org/zh-cn/3/library/xml.dom.minidom.html#module-xml.dom.minidom "xml.dom.minidom: Minimal Document Object Model (DOM) implementation.").

If name is not given, this examines the available implementations to find one with the required feature set. If no implementation can be found, raise an [`ImportError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ImportError "ImportError"). The features list must be a sequence of `(feature, version)` pairs which are passed to the [`hasFeature()`](#xml.dom.DOMImplementation.hasFeature "xml.dom.DOMImplementation.hasFeature") method on available [`DOMImplementation`](#xml.dom.DOMImplementation "xml.dom.DOMImplementation") objects.

还提供了一些便捷常量:

xml.dom.EMPTY\_NAMESPACE[¶](#xml.dom.EMPTY_NAMESPACE "Link to this definition")

The value used to indicate that no namespace is associated with a node in the DOM. This is typically found as the [`namespaceURI`](#xml.dom.Node.namespaceURI "xml.dom.Node.namespaceURI") of a node, or used as the _namespaceURI_ parameter to a namespaces-specific method.

xml.dom.XML\_NAMESPACE[¶](#xml.dom.XML_NAMESPACE "Link to this definition")

关联到保留前缀 `xml` 的命名空间 URI，如 [XML 中的命名空间](https://www.w3.org/TR/REC-xml-names/) （第 4 节） 所定义的。

xml.dom.XMLNS\_NAMESPACE[¶](#xml.dom.XMLNS_NAMESPACE "Link to this definition")

命名空间声明的命名空间 URI，如 [文档对象模型 (DOM) 第 2 层级核心规格说明](https://www.w3.org/TR/DOM-Level-2-Core/core.html) (第 1.1.8节) 所定义的。

xml.dom.XHTML\_NAMESPACE[¶](#xml.dom.XHTML_NAMESPACE "Link to this definition")

XHTML 命名空间的 URI，如 [XHTML 1.0: 扩展超文本标记语言](https://www.w3.org/TR/xhtml1/) (第 3.1.1 节) 所定义的。

In addition, `xml.dom` contains a base [`Node`](#xml.dom.Node "xml.dom.Node") class and the DOM exception classes. The `Node` class provided by this module does not implement any of the methods or attributes defined by the DOM specification; concrete DOM implementations must provide those. The `Node` class provided as part of this module does provide the constants used for the [`nodeType`](#xml.dom.Node.nodeType "xml.dom.Node.nodeType") attribute on concrete `Node` objects; they are located within the class rather than at the module level to conform with the DOM specifications.

## DOM 中的对象[¶](#objects-in-the-dom "Link to this heading")

DOM 的权威文档是来自 W3C 的 DOM 规格描述。

The names documented in this section are DOM interfaces. With the exception of [`Node`](#xml.dom.Node "xml.dom.Node") and the exception classes, they are not provided by the `xml.dom` module itself, but by concrete DOM implementations, such as [`xml.dom.minidom`](https://docs.python.org/zh-cn/3/library/xml.dom.minidom.html#module-xml.dom.minidom "xml.dom.minidom: Minimal Document Object Model (DOM) implementation.").

请注意，DOM 属性也可以作为节点而不是简单的字符串进行操作。 然而，必须这样做的情况相当少见，所以这种用法还没有被写入文档。

| 
接口

 | 

小节

 | 

目的

 |
| --- | --- | --- |
| 

[`DOMImplementation`](#xml.dom.DOMImplementation "xml.dom.DOMImplementation")

 | 

[DOMImplementation 对象](#dom-implementation-objects)

 | 

底层实现的接口。

 |
| 

[`Node`](#xml.dom.Node "xml.dom.Node")

 | 

[节点对象](#dom-node-objects)

 | 

文档中大多数对象的基本接口。

 |
| 

[`NodeList`](#xml.dom.NodeList "xml.dom.NodeList")

 | 

[节点列表对象](#dom-nodelist-objects)

 | 

节点序列的接口。

 |
| 

[`DocumentType`](#xml.dom.DocumentType "xml.dom.DocumentType")

 | 

[文档类型对象](#dom-documenttype-objects)

 | 

有关处理文档所需声明的信息。

 |
| 

[`Document`](#xml.dom.Document "xml.dom.Document")

 | 

[Document 对象](#dom-document-objects)

 | 

表示整个文档的对象。

 |
| 

[`Element`](#xml.dom.Element "xml.dom.Element")

 | 

[元素对象](#dom-element-objects)

 | 

文档层次结构中的元素节点。

 |
| 

[`Attr`](#xml.dom.Attr "xml.dom.Attr")

 | 

[Attr 对象](#dom-attr-objects)

 | 

元素节点上的属性值节点。

 |
| 

[`Comment`](#xml.dom.Comment "xml.dom.Comment")

 | 

[注释对象](#dom-comment-objects)

 | 

源文档中注释的表示形式。

 |
| 

[`Text`](#xml.dom.Text "xml.dom.Text")

 | 

[Text 和 CDATASection 对象](#dom-text-objects)

 | 

包含文档中文本内容的节点。

 |
| 

[`ProcessingInstruction`](#xml.dom.ProcessingInstruction "xml.dom.ProcessingInstruction")

 | 

[ProcessingInstruction 对象](#dom-pi-objects)

 | 

处理指令表示形式。

 |

额外的小节描述了在 Python 中使用 DOM 所定义的异常。

### DOMImplementation 对象[¶](#domimplementation-objects "Link to this heading")

[`DOMImplementation`](#xml.dom.DOMImplementation "xml.dom.DOMImplementation") 接口提供了一种让应用程序确定他们所使用的 DOM 中某一特性可用性的方式。 DOM 第 2 级还添加了使用 `DOMImplementation` 来创建新的 [`Document`](#xml.dom.Document "xml.dom.Document") 和 [`DocumentType`](#xml.dom.DocumentType "xml.dom.DocumentType") 对象的能力。

DOMImplementation.hasFeature(_feature_, _version_)[¶](#xml.dom.DOMImplementation.hasFeature "Link to this definition")

如果字符串对 _feature_ 和 _version_ 所标识的特性已被实现则返回 `True`。

DOMImplementation.createDocument(_namespaceUri_, _qualifiedName_, _doctype_)[¶](#xml.dom.DOMImplementation.createDocument "Link to this definition")

返回一个新的 [`Document`](#xml.dom.Document "xml.dom.Document") 对象 (DOM 的根节点)，包含一个具有给定 _namespaceUri_ 和 _qualifiedName_ 的下级 [`Element`](#xml.dom.Element "xml.dom.Element") 对象。 _doctype_ 必须为由 [`createDocumentType()`](#xml.dom.DOMImplementation.createDocumentType "xml.dom.DOMImplementation.createDocumentType") 创建的 [`DocumentType`](#xml.dom.DocumentType "xml.dom.DocumentType") 对象，或者为 `None`。 在 Python DOM API 中，前两个参数也可为 `None` 以表示不要创建任何下级 `Element`。

DOMImplementation.createDocumentType(_qualifiedName_, _publicId_, _systemId_)[¶](#xml.dom.DOMImplementation.createDocumentType "Link to this definition")

返回一个新的封装了给定 _qualifiedName_, _publicId_ 和 _systemId_ 字符串的 [`DocumentType`](#xml.dom.DocumentType "xml.dom.DocumentType") 对象，它表示包含在 XML 文档类型声明中的信息。

### 节点对象[¶](#node-objects "Link to this heading")

XML 文档的所有组成部分都是 [`Node`](#xml.dom.Node "xml.dom.Node") 的子类。

Only nodes of the following types can have children, and only children of the listed types:

[`Document`](#xml.dom.Document "xml.dom.Document")

at most one [`Element`](#xml.dom.Element "xml.dom.Element"), at most one [`DocumentType`](#xml.dom.DocumentType "xml.dom.DocumentType"), [`ProcessingInstruction`](#xml.dom.ProcessingInstruction "xml.dom.ProcessingInstruction") and [`Comment`](#xml.dom.Comment "xml.dom.Comment")

[`DocumentFragment`](#xml.dom.DocumentFragment "xml.dom.DocumentFragment") and [`Element`](#xml.dom.Element "xml.dom.Element")

[`Element`](#xml.dom.Element "xml.dom.Element"), [`Text`](#xml.dom.Text "xml.dom.Text"), [`CDATASection`](#xml.dom.CDATASection "xml.dom.CDATASection"), [`ProcessingInstruction`](#xml.dom.ProcessingInstruction "xml.dom.ProcessingInstruction") and [`Comment`](#xml.dom.Comment "xml.dom.Comment")

[`Attr`](#xml.dom.Attr "xml.dom.Attr")

[`Text`](#xml.dom.Text "xml.dom.Text")

Nodes of other types cannot have children. Inserting a child of a not allowed type raises [`HierarchyRequestErr`](#xml.dom.HierarchyRequestErr "xml.dom.HierarchyRequestErr").

Node.nodeType[¶](#xml.dom.Node.nodeType "Link to this definition")

一个代表节点类型的整数。 类型的符号常量在 [`Node`](#xml.dom.Node "xml.dom.Node") 对象上。 这是个只读属性。

Node.ELEMENT\_NODE[¶](#xml.dom.Node.ELEMENT_NODE "Link to this definition")

Node.ATTRIBUTE\_NODE[¶](#xml.dom.Node.ATTRIBUTE_NODE "Link to this definition")

Node.TEXT\_NODE[¶](#xml.dom.Node.TEXT_NODE "Link to this definition")

Node.CDATA\_SECTION\_NODE[¶](#xml.dom.Node.CDATA_SECTION_NODE "Link to this definition")

Node.ENTITY\_REFERENCE\_NODE[¶](#xml.dom.Node.ENTITY_REFERENCE_NODE "Link to this definition")

Node.ENTITY\_NODE[¶](#xml.dom.Node.ENTITY_NODE "Link to this definition")

Node.PROCESSING\_INSTRUCTION\_NODE[¶](#xml.dom.Node.PROCESSING_INSTRUCTION_NODE "Link to this definition")

Node.DOCUMENT\_NODE[¶](#xml.dom.Node.DOCUMENT_NODE "Link to this definition")

Node.DOCUMENT\_TYPE\_NODE[¶](#xml.dom.Node.DOCUMENT_TYPE_NODE "Link to this definition")

Node.DOCUMENT\_FRAGMENT\_NODE[¶](#xml.dom.Node.DOCUMENT_FRAGMENT_NODE "Link to this definition")

Node.NOTATION\_NODE[¶](#xml.dom.Node.NOTATION_NODE "Link to this definition")

作为 [`nodeType`](#xml.dom.Node.nodeType "xml.dom.Node.nodeType") 属性的可能值的整数常量。

Node.parentNode[¶](#xml.dom.Node.parentNode "Link to this definition")

当前节点的上级，或者对于文档节点则为 `None`。 该值总是一个 [`Node`](#xml.dom.Node "xml.dom.Node") 对象或者 `None`。 对于 [`Element`](#xml.dom.Element "xml.dom.Element") 节点，这将为上级元素，但对于根元素例外，在此情况下它将为 [`Document`](#xml.dom.Document "xml.dom.Document") 对象。 对于 [`Attr`](#xml.dom.Attr "xml.dom.Attr") 节点，它将总是为 `None`。 这是个只读属性。

Node.attributes[¶](#xml.dom.Node.attributes "Link to this definition")

属性对象的 [`NamedNodeMap`](#xml.dom.NamedNodeMap "xml.dom.NamedNodeMap")。 这仅对元素才有实际值；其它对象会为该属性提供 `None` 值。 这是个只读属性。

Node.previousSibling[¶](#xml.dom.Node.previousSibling "Link to this definition")

在此节点之前具有相同上级的相邻节点。 例如结束标记紧接在 _self_ 元素的开始标记之前的元素。 当然，XML 文档并非只是由元素组成，因此之前相邻节点可以是文本、注释或者其他内容。 如果此节点是上级的第一个子节点，则该属性将为 `None`。 这是一个只读属性。

Node.nextSibling[¶](#xml.dom.Node.nextSibling "Link to this definition")

在此节点之后具有相同上级的相邻节点。 另请参见 [`previousSibling`](#xml.dom.Node.previousSibling "xml.dom.Node.previousSibling")。 如果此节点是上级的最后一个子节点，则该属性将为 `None`。 这是一个只读属性。

Node.childNodes[¶](#xml.dom.Node.childNodes "Link to this definition")

由该节点的子节点组成的 [`NodeList`](#xml.dom.NodeList "xml.dom.NodeList")。 如果节点没有子节点，则该列表为空。 这是个只读属性。

Node.firstChild[¶](#xml.dom.Node.firstChild "Link to this definition")

节点的第一个下级，如果有的话，否则为 `None`。 这是个只读属性。

Node.lastChild[¶](#xml.dom.Node.lastChild "Link to this definition")

节点的最后一个下级，如果有的话，否则为 `None`。 这是个只读属性。

Node.localName[¶](#xml.dom.Node.localName "Link to this definition")

The part of the [`tagName`](#xml.dom.Element.tagName "xml.dom.Element.tagName") following the colon if there is one, else the entire `tagName`. The value is a string.

Node.prefix[¶](#xml.dom.Node.prefix "Link to this definition")

The part of the [`tagName`](#xml.dom.Element.tagName "xml.dom.Element.tagName") preceding the colon if there is one, else the empty string. The value is a string, or `None`.

Node.namespaceURI[¶](#xml.dom.Node.namespaceURI "Link to this definition")

关联到元素名称的命名空间。 这将是一个字符串或为 `None`。 这是个只读属性。

Node.ownerDocument[¶](#xml.dom.Node.ownerDocument "Link to this definition")

The [`Document`](#xml.dom.Document "xml.dom.Document") object to which this node belongs, or `None` for a document itself. This is a read-only attribute.

Node.isSupported(_feature_, _version_)[¶](#xml.dom.Node.isSupported "Link to this definition")

Return whether the DOM implementation supports a particular _feature_, as [`DOMImplementation.hasFeature()`](#xml.dom.DOMImplementation.hasFeature "xml.dom.DOMImplementation.hasFeature") does.

Node.setUserData(_key_, _data_, _handler_)[¶](#xml.dom.Node.setUserData "Link to this definition")

Associate _data_ with _key_ on this node and return the data previously associated with _key_, or `None`. If _data_ is `None`, the association is removed. _handler_ is called when the node is cloned, imported, renamed or deleted; pass `None` if no notification is needed.

Node.getUserData(_key_)[¶](#xml.dom.Node.getUserData "Link to this definition")

Return the data associated with _key_ on this node by [`setUserData()`](#xml.dom.Node.setUserData "xml.dom.Node.setUserData"), or `None`.

Node.nodeName[¶](#xml.dom.Node.nodeName "Link to this definition")

The name of this node, depending on its type; see the table below. You can always get the information you would get here from another property such as the [`tagName`](#xml.dom.Element.tagName "xml.dom.Element.tagName") property for elements or the [`name`](#xml.dom.Attr.name "xml.dom.Attr.name") property for attributes. This is a read-only attribute.

Node.nodeValue[¶](#xml.dom.Node.nodeValue "Link to this definition")

The value of this node, depending on its type; see the table below. The value is a string or `None`.

The values of [`nodeName`](#xml.dom.Node.nodeName "xml.dom.Node.nodeName") and [`nodeValue`](#xml.dom.Node.nodeValue "xml.dom.Node.nodeValue") for each node type are:

| 
Node type

 | 

nodeName

 | 

nodeValue

 |
| --- | --- | --- |
| 

[`Attr`](#xml.dom.Attr "xml.dom.Attr")

 | 

[`name`](#xml.dom.Attr.name "xml.dom.Attr.name")

 | 

[`value`](#xml.dom.Attr.value "xml.dom.Attr.value")

 |
| 

[`CDATASection`](#xml.dom.CDATASection "xml.dom.CDATASection")

 | 

`'#cdata-section'`

 | 

the content

 |
| 

[`Comment`](#xml.dom.Comment "xml.dom.Comment")

 | 

`'#comment'`

 | 

the content

 |
| 

[`Document`](#xml.dom.Document "xml.dom.Document")

 | 

`'#document'`

 | 

`None`

 |
| 

[`DocumentFragment`](#xml.dom.DocumentFragment "xml.dom.DocumentFragment")

 | 

`'#document-fragment'`

 | 

`None`

 |
| 

[`DocumentType`](#xml.dom.DocumentType "xml.dom.DocumentType")

 | 

[`name`](#xml.dom.DocumentType.name "xml.dom.DocumentType.name")

 | 

`None`

 |
| 

[`Element`](#xml.dom.Element "xml.dom.Element")

 | 

[`tagName`](#xml.dom.Element.tagName "xml.dom.Element.tagName")

 | 

`None`

 |
| 

[`Entity`](#xml.dom.Entity "xml.dom.Entity")

 | 

实体名称

 | 

`None`

 |
| 

[`Notation`](#xml.dom.Notation "xml.dom.Notation")

 | 

标注名称

 | 

`None`

 |
| 

[`ProcessingInstruction`](#xml.dom.ProcessingInstruction "xml.dom.ProcessingInstruction")

 | 

[`target`](#xml.dom.ProcessingInstruction.target "xml.dom.ProcessingInstruction.target")

 | 

[`data`](#xml.dom.ProcessingInstruction.data "xml.dom.ProcessingInstruction.data")

 |
| 

[`Text`](#xml.dom.Text "xml.dom.Text")

 | 

`'#text'`

 | 

the content

 |

Node.hasAttributes()[¶](#xml.dom.Node.hasAttributes "Link to this definition")

如果该节点具有任何属性则返回 `True`。

Node.hasChildNodes()[¶](#xml.dom.Node.hasChildNodes "Link to this definition")

如果该节点具有任何子节点则返回 `True`。

Node.isSameNode(_other_)[¶](#xml.dom.Node.isSameNode "Link to this definition")

如果 _other_ 指向的节点就是此节点则返回 `True`。 这对于使用了任何代理架构的 DOM 实现来说特别有用（因为多个对象可能指向相同节点）。

备注

这是基于已提议的 DOM 第 3 层级 API，目前尚处于“起草”阶段，但这个特定接口看来并不存在争议。 来自 W3C 的修改将不会影响 Python DOM 接口中的这个方法（不过针对它的任何新 W3C API 也将受到支持）。

Node.appendChild(_newChild_)[¶](#xml.dom.Node.appendChild "Link to this definition")

在子节点列表末尾添加一个新的子节点，返回 _newChild_。 如果节点已存在于树结构中，它将先被移除。

Node.insertBefore(_newChild_, _refChild_)[¶](#xml.dom.Node.insertBefore "Link to this definition")

Insert a new child node before an existing child. It must be the case that _refChild_ is a child of this node; if not, [`NotFoundErr`](#xml.dom.NotFoundErr "xml.dom.NotFoundErr") is raised. _newChild_ is returned. If _refChild_ is `None`, it inserts _newChild_ at the end of the children's list.

Node.removeChild(_oldChild_)[¶](#xml.dom.Node.removeChild "Link to this definition")

Remove a child node. _oldChild_ must be a child of this node; if not, [`NotFoundErr`](#xml.dom.NotFoundErr "xml.dom.NotFoundErr") is raised. _oldChild_ is returned on success. If _oldChild_ will not be used further, its [`unlink()`](https://docs.python.org/zh-cn/3/library/xml.dom.minidom.html#xml.dom.minidom.Node.unlink "xml.dom.minidom.Node.unlink") method should be called.

Node.replaceChild(_newChild_, _oldChild_)[¶](#xml.dom.Node.replaceChild "Link to this definition")

Replace an existing node with a new node. It must be the case that _oldChild_ is a child of this node; if not, [`NotFoundErr`](#xml.dom.NotFoundErr "xml.dom.NotFoundErr") is raised.

Node.normalize()[¶](#xml.dom.Node.normalize "Link to this definition")

合并相邻的文本节点以便将所有文本段存储为单个 [`Text`](#xml.dom.Text "xml.dom.Text") 实例。 这可以简化许多应用程序处理来自 DOM 树文本的操作。

Node.cloneNode(_deep_)[¶](#xml.dom.Node.cloneNode "Link to this definition")

克隆此节点。 设置 _deep_ 表示也克隆所有子节点。 此方法将返回克隆的节点。

### 节点列表对象[¶](#nodelist-objects "Link to this heading")

A [`NodeList`](#xml.dom.NodeList "xml.dom.NodeList") represents a sequence of nodes. These objects are used in two ways in the DOM Core recommendation: an [`Element`](#xml.dom.Element "xml.dom.Element") object provides one as its list of child nodes, and the [`getElementsByTagName()`](#xml.dom.Element.getElementsByTagName "xml.dom.Element.getElementsByTagName") and [`getElementsByTagNameNS()`](#xml.dom.Element.getElementsByTagNameNS "xml.dom.Element.getElementsByTagNameNS") methods of [`Node`](#xml.dom.Node "xml.dom.Node") return objects with this interface to represent query results.

[`NodeList`](#xml.dom.NodeList "xml.dom.NodeList") does _not_ inherit from [`Node`](#xml.dom.Node "xml.dom.Node").

DOM 第 2 层级建议为这些对象定义一个方法和一个属性:

NodeList.item(_i_)[¶](#xml.dom.NodeList.item "Link to this definition")

Return the _i_'th item from the sequence, or `None` if _i_ is out of range. Negative indices are not supported.

NodeList.length[¶](#xml.dom.NodeList.length "Link to this definition")

序列中的节点数量。

此外，Python DOM 接口还要求提供一些额外支持来允许将 [`NodeList`](#xml.dom.NodeList "xml.dom.NodeList") 对象用作 Python 序列。 所有 `NodeList` 实现都必须包括对 [`__len__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__len__ "object.__len__") 和 [`__getitem__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__getitem__ "object.__getitem__") 的支持；这样 `NodeList` 就允许使用 [`for`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#for) 语句进行迭代并能正确地支持 [`len()`](https://docs.python.org/zh-cn/3/builtins/functions.html#len "len") 内置函数。

如果一个 DOM 实现支持文档的修改，则 [`NodeList`](#xml.dom.NodeList "xml.dom.NodeList") 实现还必须支持 [`__setitem__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__setitem__ "object.__setitem__") 和 [`__delitem__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__delitem__ "object.__delitem__") 方法。

### 文档类型对象[¶](#documenttype-objects "Link to this heading")

Information about the notations and entities declared by a document (including the external subset if the parser uses it and can provide the information) is available from a [`DocumentType`](#xml.dom.DocumentType "xml.dom.DocumentType") object. The `DocumentType` for a document is available from the [`Document`](#xml.dom.Document "xml.dom.Document") object's [`doctype`](#xml.dom.Document.doctype "xml.dom.Document.doctype") attribute; if there is no `DOCTYPE` declaration for the document, the document's `doctype` attribute will be set to `None` instead of an instance of this interface.

[`DocumentType`](#xml.dom.DocumentType "xml.dom.DocumentType") 是 [`Node`](#xml.dom.Node "xml.dom.Node") 的专门化，并增加了下列属性:

DocumentType.publicId[¶](#xml.dom.DocumentType.publicId "Link to this definition")

The public identifier for the external subset of the document type definition, or `None` if the `DOCTYPE` declaration does not specify it.

DocumentType.systemId[¶](#xml.dom.DocumentType.systemId "Link to this definition")

The system identifier, a URI, for the external subset of the document type definition, or `None` if the `DOCTYPE` declaration does not specify it.

DocumentType.internalSubset[¶](#xml.dom.DocumentType.internalSubset "Link to this definition")

一个给出来自文档的完整内部子集的字符串。 这不包括子集外面的方括号。 如果文档没有内部子集，则应为 `None`。

DocumentType.name[¶](#xml.dom.DocumentType.name "Link to this definition")

`DOCTYPE` 声明中给出的根元素名称，如果有的话。

DocumentType.entities[¶](#xml.dom.DocumentType.entities "Link to this definition")

This is a [`NamedNodeMap`](#xml.dom.NamedNodeMap "xml.dom.NamedNodeMap") of [`Entity`](#xml.dom.Entity "xml.dom.Entity") nodes giving the definitions of external entities. For entity names defined more than once, only the first definition is provided (others are ignored as required by the XML recommendation). This may be `None` if the information is not provided by the parser, or if no entities are defined.

DocumentType.notations[¶](#xml.dom.DocumentType.notations "Link to this definition")

This is a [`NamedNodeMap`](#xml.dom.NamedNodeMap "xml.dom.NamedNodeMap") of [`Notation`](#xml.dom.Notation "xml.dom.Notation") nodes giving the definitions of notations. For notation names defined more than once, only the first definition is provided (others are ignored as required by the XML recommendation). This may be `None` if the information is not provided by the parser, or if no notations are defined.

### Document 对象[¶](#document-objects "Link to this heading")

[`Document`](#xml.dom.Document "xml.dom.Document") 代表一个完整的 XML 文档，包括其组成元素、属性、处理指令和注释等。 请记住它会继承来自 [`Node`](#xml.dom.Node "xml.dom.Node") 的属性。

Document.documentElement[¶](#xml.dom.Document.documentElement "Link to this definition")

文档唯一的根元素。

Document.doctype[¶](#xml.dom.Document.doctype "Link to this definition")

The [`DocumentType`](#xml.dom.DocumentType "xml.dom.DocumentType") node of the document, or `None`. This is a read-only attribute.

Document.implementation[¶](#xml.dom.Document.implementation "Link to this definition")

The [`DOMImplementation`](#xml.dom.DOMImplementation "xml.dom.DOMImplementation") object which created this document. This is a read-only attribute.

Document.strictErrorChecking[¶](#xml.dom.Document.strictErrorChecking "Link to this definition")

Whether error checking is enforced.

Document.documentURI[¶](#xml.dom.Document.documentURI "Link to this definition")

The location of the document, or `None` if it is unknown.

Document.createDocumentFragment()[¶](#xml.dom.Document.createDocumentFragment "Link to this definition")

Create and return an empty [`DocumentFragment`](#xml.dom.DocumentFragment "xml.dom.DocumentFragment") node.

Document.createCDATASection(_data_)[¶](#xml.dom.Document.createCDATASection "Link to this definition")

Create and return a [`CDATASection`](#xml.dom.CDATASection "xml.dom.CDATASection") node containing _data_.

Document.importNode(_importedNode_, _deep_)[¶](#xml.dom.Document.importNode "Link to this definition")

Return a copy of _importedNode_ which belongs to this document. The original node is not removed from its document. If _deep_ is true, the descendants of the node are copied too.

Document.createElement(_tagName_)[¶](#xml.dom.Document.createElement "Link to this definition")

Create and return a new element node. The element is not inserted into the document when it is created. You need to explicitly insert it with one of the other methods such as [`insertBefore()`](#xml.dom.Node.insertBefore "xml.dom.Node.insertBefore") or [`appendChild()`](#xml.dom.Node.appendChild "xml.dom.Node.appendChild").

Document.createElementNS(_namespaceURI_, _tagName_)[¶](#xml.dom.Document.createElementNS "Link to this definition")

Create and return a new element with a namespace. The _tagName_ may have a prefix. The element is not inserted into the document when it is created. You need to explicitly insert it with one of the other methods such as [`insertBefore()`](#xml.dom.Node.insertBefore "xml.dom.Node.insertBefore") or [`appendChild()`](#xml.dom.Node.appendChild "xml.dom.Node.appendChild").

Document.createTextNode(_data_)[¶](#xml.dom.Document.createTextNode "Link to this definition")

创建并返回一个包含作为形参被传入的数据的文本节点。 与其他创建方法一样，此方法不会将节点插入到树中。

创建并返回一个包含作为形参被传入的数据的注释节点。 与其他创建方法一样，此方法不会将节点插入到树中。

Document.createProcessingInstruction(_target_, _data_)[¶](#xml.dom.Document.createProcessingInstruction "Link to this definition")

创建并返回一个包含作为形参被传入的 _target_ 和 _data_ 的处理指令节点。 与其他创建方法一样，此方法不会将节点插入到树中。

Document.createAttribute(_name_)[¶](#xml.dom.Document.createAttribute "Link to this definition")

Create and return an attribute node. This method does not associate the attribute node with any particular element. You must use [`setAttributeNode()`](#xml.dom.Element.setAttributeNode "xml.dom.Element.setAttributeNode") on the appropriate [`Element`](#xml.dom.Element "xml.dom.Element") object to use the newly created attribute instance.

Document.createAttributeNS(_namespaceURI_, _qualifiedName_)[¶](#xml.dom.Document.createAttributeNS "Link to this definition")

Create and return an attribute node with a namespace. The _tagName_ may have a prefix. This method does not associate the attribute node with any particular element. You must use [`setAttributeNode()`](#xml.dom.Element.setAttributeNode "xml.dom.Element.setAttributeNode") on the appropriate [`Element`](#xml.dom.Element "xml.dom.Element") object to use the newly created attribute instance.

Document.getElementById(_id_)[¶](#xml.dom.Document.getElementById "Link to this definition")

Return the element with the given ID, or `None`. Only attributes declared as being of type ID in the DTD or by [`Element.setIdAttribute()`](#xml.dom.Element.setIdAttribute "xml.dom.Element.setIdAttribute") are searched.

Document.getElementsByTagName(_tagName_)[¶](#xml.dom.Document.getElementsByTagName "Link to this definition")

搜索全部具有特定元素类型名称的后继元素（直接下级、下级的下级等等）。

Document.getElementsByTagNameNS(_namespaceURI_, _localName_)[¶](#xml.dom.Document.getElementsByTagNameNS "Link to this definition")

搜索全部具有特定命名空间 URI 和 localname 的后继元素（直接下级、下级的下级等等）。 localname 是命名空间在前缀之后的部分。

Document.renameNode(_n_, _namespaceURI_, _name_)[¶](#xml.dom.Document.renameNode "Link to this definition")

Rename the element or attribute node _n_ and return it. _namespaceURI_ is the new namespace URI, or [`EMPTY_NAMESPACE`](#xml.dom.EMPTY_NAMESPACE "xml.dom.EMPTY_NAMESPACE") if the node does not belong to a namespace. _name_ is the new qualified name.

Raise [`WrongDocumentErr`](#xml.dom.WrongDocumentErr "xml.dom.WrongDocumentErr") if _n_ was created by another document, and [`NotSupportedErr`](#xml.dom.NotSupportedErr "xml.dom.NotSupportedErr") if it is neither an element nor an attribute.

### 元素对象[¶](#element-objects "Link to this heading")

[`Element`](#xml.dom.Element "xml.dom.Element") 是 [`Node`](#xml.dom.Node "xml.dom.Node") 的子类，因此会继承该类的全部属性。

Element.tagName[¶](#xml.dom.Element.tagName "Link to this definition")

元素类型名称。 在使用命名空间的文档中它可能包含冒号。 该值是一个字符串。

Element.setIdAttribute(_name_)[¶](#xml.dom.Element.setIdAttribute "Link to this definition")

Declare that the attribute _name_ is of type ID, so that the element is found by [`Document.getElementById()`](#xml.dom.Document.getElementById "xml.dom.Document.getElementById"). Raise [`NotFoundErr`](#xml.dom.NotFoundErr "xml.dom.NotFoundErr") if the element has no such attribute.

Element.setIdAttributeNS(_namespaceURI_, _localName_)[¶](#xml.dom.Element.setIdAttributeNS "Link to this definition")

The same as [`setIdAttribute()`](#xml.dom.Element.setIdAttribute "xml.dom.Element.setIdAttribute"), but for an attribute specified by its namespace URI and local name.

Element.setIdAttributeNode(_idAttr_)[¶](#xml.dom.Element.setIdAttributeNode "Link to this definition")

The same as [`setIdAttribute()`](#xml.dom.Element.setIdAttribute "xml.dom.Element.setIdAttribute"), but for an already retrieved attribute node.

Element.getElementsByTagName(_tagName_)[¶](#xml.dom.Element.getElementsByTagName "Link to this definition")

与 [`Document`](#xml.dom.Document "xml.dom.Document") 类中的对应方法相同。

Element.getElementsByTagNameNS(_namespaceURI_, _localName_)[¶](#xml.dom.Element.getElementsByTagNameNS "Link to this definition")

与 [`Document`](#xml.dom.Document "xml.dom.Document") 类中的对应方法相同。

Element.hasAttribute(_name_)[¶](#xml.dom.Element.hasAttribute "Link to this definition")

如果元素带有名称为 _name_ 的属性则返回 `True`。

Element.hasAttributeNS(_namespaceURI_, _localName_)[¶](#xml.dom.Element.hasAttributeNS "Link to this definition")

如果元素带有名称为 _namespaceURI_ 加 _localName_ 的属性则返回 `True`。

Element.getAttribute(_name_)[¶](#xml.dom.Element.getAttribute "Link to this definition")

将名称为 _name_ 的属性的值作为字符串返回。 如果指定属性不存在，则返回空字符串，就像该属性没有对应的值一样。

Element.getAttributeNode(_attrname_)[¶](#xml.dom.Element.getAttributeNode "Link to this definition")

返回名称为 _attrname_ 的属性对应的 [`Attr`](#xml.dom.Attr "xml.dom.Attr") 节点。

Element.getAttributeNS(_namespaceURI_, _localName_)[¶](#xml.dom.Element.getAttributeNS "Link to this definition")

将名称为 _namespaceURI_ 加 _localName_ 的属性的值作为字符串返回。 如果指定属性不存在，则返回空字符串，就像该属性没有对应的值一样。

Element.getAttributeNodeNS(_namespaceURI_, _localName_)[¶](#xml.dom.Element.getAttributeNodeNS "Link to this definition")

将给定 _namespaceURI_ 加 _localName_ 的属性的值作为节点返回。

Element.removeAttribute(_name_)[¶](#xml.dom.Element.removeAttribute "Link to this definition")

Remove an attribute by name.

Element.removeAttributeNode(_oldAttr_)[¶](#xml.dom.Element.removeAttributeNode "Link to this definition")

从属性列表中移除并返回 _oldAttr_，如果该属性存在的话。 如果 _oldAttr_ 不存在，则会引发 [`NotFoundErr`](#xml.dom.NotFoundErr "xml.dom.NotFoundErr")。

Element.removeAttributeNS(_namespaceURI_, _localName_)[¶](#xml.dom.Element.removeAttributeNS "Link to this definition")

Remove an attribute by name. Note that it uses a localName, not a qname.

Element.setAttribute(_name_, _value_)[¶](#xml.dom.Element.setAttribute "Link to this definition")

将属性值设为指定的字符串。

Element.setAttributeNode(_newAttr_)[¶](#xml.dom.Element.setAttributeNode "Link to this definition")

Add a new attribute node to the element, replacing an existing attribute if necessary if the [`name`](#xml.dom.Attr.name "xml.dom.Attr.name") attribute matches. If a replacement occurs, the old attribute node will be returned. If _newAttr_ is already in use, [`InuseAttributeErr`](#xml.dom.InuseAttributeErr "xml.dom.InuseAttributeErr") will be raised.

Element.setAttributeNodeNS(_newAttr_)[¶](#xml.dom.Element.setAttributeNodeNS "Link to this definition")

Add a new attribute node to the element, replacing an existing attribute if necessary if the [`namespaceURI`](#xml.dom.Node.namespaceURI "xml.dom.Node.namespaceURI") and [`localName`](#xml.dom.Attr.localName "xml.dom.Attr.localName") attributes match. If a replacement occurs, the old attribute node will be returned. If _newAttr_ is already in use, [`InuseAttributeErr`](#xml.dom.InuseAttributeErr "xml.dom.InuseAttributeErr") will be raised.

Element.setAttributeNS(_namespaceURI_, _qname_, _value_)[¶](#xml.dom.Element.setAttributeNS "Link to this definition")

将属性值设为 _namespaceURI_ 和 _qname_ 所给出的字符串。 请注意 qname 是整个属性名称。 这与上面的方法不同。

### Attr 对象[¶](#attr-objects "Link to this heading")

[`Attr`](#xml.dom.Attr "xml.dom.Attr") 继承自 [`Node`](#xml.dom.Node "xml.dom.Node")，因此会继承其全部属性。

Attribute nodes are not part of the document tree. They are contained in the [`attributes`](#xml.dom.Node.attributes "xml.dom.Node.attributes") map of an element, not in its children, and their [`parentNode`](#xml.dom.Node.parentNode "xml.dom.Node.parentNode"), [`previousSibling`](#xml.dom.Node.previousSibling "xml.dom.Node.previousSibling") and [`nextSibling`](#xml.dom.Node.nextSibling "xml.dom.Node.nextSibling") are always `None`.

Attr.name[¶](#xml.dom.Attr.name "Link to this definition")

属性名称。 在使用命名空间的文档中可能会包括冒号。

Attr.localName[¶](#xml.dom.Attr.localName "Link to this definition")

名称在冒号之后的部分，如果有的话，否则为完整名称。 这是个只读属性。

Attr.prefix[¶](#xml.dom.Attr.prefix "Link to this definition")

名称在冒号之前的部分，如果有冒号的话，否则为空字符串。

Attr.isId[¶](#xml.dom.Attr.isId "Link to this definition")

Whether this attribute is of type ID, either because it is declared as such in the DTD or because [`Element.setIdAttribute()`](#xml.dom.Element.setIdAttribute "xml.dom.Element.setIdAttribute") was used. This is a read-only attribute.

Attr.ownerElement[¶](#xml.dom.Attr.ownerElement "Link to this definition")

The [`Element`](#xml.dom.Element "xml.dom.Element") node to which this attribute belongs, or `None` if it is not used. This is a read-only attribute.

Attr.specified[¶](#xml.dom.Attr.specified "Link to this definition")

Whether the value of the attribute was explicitly set in the document, as opposed to being defaulted from the DTD. This is a read-only attribute.

Attr.value[¶](#xml.dom.Attr.value "Link to this definition")

The text value of the attribute. This is a synonym for the [`nodeValue`](#xml.dom.Node.nodeValue "xml.dom.Node.nodeValue") attribute.

### NamedNodeMap 对象[¶](#namednodemap-objects "Link to this heading")

[`NamedNodeMap`](#xml.dom.NamedNodeMap "xml.dom.NamedNodeMap") _不是_ 继承自 [`Node`](#xml.dom.Node "xml.dom.Node")。

NamedNodeMap.length[¶](#xml.dom.NamedNodeMap.length "Link to this definition")

属性列表的长度。

NamedNodeMap.item(_index_)[¶](#xml.dom.NamedNodeMap.item "Link to this definition")

Return an attribute with a particular index. The order you get the attributes in is arbitrary but will be consistent for the life of a DOM. Each item is an attribute node. Get its value with the [`value`](#xml.dom.Attr.value "xml.dom.Attr.value") attribute.

NamedNodeMap.getNamedItem(_name_)[¶](#xml.dom.NamedNodeMap.getNamedItem "Link to this definition")

Return the node with the given [`name`](#xml.dom.Attr.name "xml.dom.Attr.name"), or `None` if there is no such node.

NamedNodeMap.getNamedItemNS(_namespaceURI_, _localName_)[¶](#xml.dom.NamedNodeMap.getNamedItemNS "Link to this definition")

Return the node with the given namespace URI and local name, or `None` if there is no such node.

NamedNodeMap.setNamedItem(_node_)[¶](#xml.dom.NamedNodeMap.setNamedItem "Link to this definition")

Add _node_ to the map, using its [`name`](#xml.dom.Attr.name "xml.dom.Attr.name") as the key. Return the node which it replaces, or `None` if it replaces no node.

NamedNodeMap.setNamedItemNS(_node_)[¶](#xml.dom.NamedNodeMap.setNamedItemNS "Link to this definition")

Add _node_ to the map, using its namespace URI and local name as the key. Return the node which it replaces, or `None` if it replaces no node.

NamedNodeMap.removeNamedItem(_name_)[¶](#xml.dom.NamedNodeMap.removeNamedItem "Link to this definition")

Remove and return the node with the given [`name`](#xml.dom.Attr.name "xml.dom.Attr.name"). Raise [`NotFoundErr`](#xml.dom.NotFoundErr "xml.dom.NotFoundErr") if there is no such node.

NamedNodeMap.removeNamedItemNS(_namespaceURI_, _localName_)[¶](#xml.dom.NamedNodeMap.removeNamedItemNS "Link to this definition")

Remove and return the node with the given namespace URI and local name. Raise [`NotFoundErr`](#xml.dom.NotFoundErr "xml.dom.NotFoundErr") if there is no such node.

You can also use the standardized `getAttribute*()` family of methods on the [`Element`](#xml.dom.Element "xml.dom.Element") objects.

### DocumentFragment Objects[¶](#documentfragment-objects "Link to this heading")

[`DocumentFragment`](#xml.dom.DocumentFragment "xml.dom.DocumentFragment") is a lightweight container of nodes. It is a subclass of [`Node`](#xml.dom.Node "xml.dom.Node"). When it is inserted into the document tree, its children are inserted instead of it, and it becomes empty.

### CharacterData Objects[¶](#characterdata-objects "Link to this heading")

[`CharacterData`](#xml.dom.CharacterData "xml.dom.CharacterData") represents text-like data in the XML document. It is a subclass of [`Node`](#xml.dom.Node "xml.dom.Node"), and the base class of [`Text`](#xml.dom.Text "xml.dom.Text"), [`CDATASection`](#xml.dom.CDATASection "xml.dom.CDATASection") and [`Comment`](#xml.dom.Comment "xml.dom.Comment"). Such nodes cannot have child nodes.

CharacterData.data[¶](#xml.dom.CharacterData.data "Link to this definition")

The content of the node as a string.

CharacterData.length[¶](#xml.dom.CharacterData.length "Link to this definition")

The number of characters in [`data`](#xml.dom.CharacterData.data "xml.dom.CharacterData.data"). This is a read-only attribute.

CharacterData.substringData(_offset_, _count_)[¶](#xml.dom.CharacterData.substringData "Link to this definition")

Return the substring of [`data`](#xml.dom.CharacterData.data "xml.dom.CharacterData.data") of _count_ characters starting at _offset_.

CharacterData.appendData(_arg_)[¶](#xml.dom.CharacterData.appendData "Link to this definition")

Append the string _arg_ to [`data`](#xml.dom.CharacterData.data "xml.dom.CharacterData.data").

CharacterData.insertData(_offset_, _arg_)[¶](#xml.dom.CharacterData.insertData "Link to this definition")

Insert the string _arg_ into [`data`](#xml.dom.CharacterData.data "xml.dom.CharacterData.data") at _offset_.

CharacterData.deleteData(_offset_, _count_)[¶](#xml.dom.CharacterData.deleteData "Link to this definition")

Remove _count_ characters from [`data`](#xml.dom.CharacterData.data "xml.dom.CharacterData.data") starting at _offset_.

CharacterData.replaceData(_offset_, _count_, _arg_)[¶](#xml.dom.CharacterData.replaceData "Link to this definition")

Replace _count_ characters of [`data`](#xml.dom.CharacterData.data "xml.dom.CharacterData.data") starting at _offset_ with the string _arg_.

### Text 和 CDATASection 对象[¶](#text-and-cdatasection-objects "Link to this heading")

The [`Text`](#xml.dom.Text "xml.dom.Text") interface represents text in the XML document. If the parser and DOM implementation support the DOM's XML extension, portions of the text enclosed in CDATA marked sections are stored in [`CDATASection`](#xml.dom.CDATASection "xml.dom.CDATASection") objects. These two interfaces are identical, but provide different values for the [`nodeType`](#xml.dom.Node.nodeType "xml.dom.Node.nodeType") attribute.

[`Text`](#xml.dom.Text "xml.dom.Text") extends the [`CharacterData`](#xml.dom.CharacterData "xml.dom.CharacterData") interface, and [`CDATASection`](#xml.dom.CDATASection "xml.dom.CDATASection") extends `Text`.

Text.data[¶](#xml.dom.Text.data "Link to this definition")

字符串形式的文本节点内容。

Text.wholeText[¶](#xml.dom.Text.wholeText "Link to this definition")

The text of all [`Text`](#xml.dom.Text "xml.dom.Text") nodes logically adjacent to this node, concatenated in document order. This is a read-only attribute.

Text.replaceWholeText(_content_)[¶](#xml.dom.Text.replaceWholeText "Link to this definition")

Replace the text of all [`Text`](#xml.dom.Text "xml.dom.Text") nodes logically adjacent to this node with _content_, removing the other nodes. Return this node, or `None` if _content_ is empty.

Text.splitText(_offset_)[¶](#xml.dom.Text.splitText "Link to this definition")

Split this node into two nodes at _offset_, keeping the first part in this node and returning a new sibling node with the rest.

备注

[`CDATASection`](#xml.dom.CDATASection "xml.dom.CDATASection") 节点的使用并不表示该节点代表一个完整的 CDATA 标记节，只是表示该节点的内容是 CDATA 节的一部分。 单个 CDATA 节可以由文档树中的多个节点来表示。 没有什么办法能确定两个相邻的 `CDATASection` 节点是否代表不同的 CDATA 标记节。

### ProcessingInstruction 对象[¶](#processinginstruction-objects "Link to this heading")

代表 XML 文档中的处理指令。 它继承自 [`Node`](#xml.dom.Node "xml.dom.Node") 接口并且不能拥有下级节点。

ProcessingInstruction.target[¶](#xml.dom.ProcessingInstruction.target "Link to this definition")

到第一个空格符为止的处理指令内容。 这是个只读属性。

ProcessingInstruction.data[¶](#xml.dom.ProcessingInstruction.data "Link to this definition")

在第一个空格符之后的处理指令内容。

### Entity Objects[¶](#entity-objects "Link to this heading")

[`Entity`](#xml.dom.Entity "xml.dom.Entity") represents a parsed or unparsed entity declared in the DTD. It is a subclass of [`Node`](#xml.dom.Node "xml.dom.Node"). Entity nodes are contained in [`DocumentType.entities`](#xml.dom.DocumentType.entities "xml.dom.DocumentType.entities") and cannot be inserted into the document tree. The name of the entity is its [`nodeName`](#xml.dom.Node.nodeName "xml.dom.Node.nodeName").

Entity.publicId[¶](#xml.dom.Entity.publicId "Link to this definition")

The public identifier of the entity, or `None` if it is not specified. This is a read-only attribute.

Entity.systemId[¶](#xml.dom.Entity.systemId "Link to this definition")

The system identifier of the entity, or `None` if it is not specified. This is a read-only attribute.

Entity.notationName[¶](#xml.dom.Entity.notationName "Link to this definition")

The name of the notation for an unparsed entity, or `None` for a parsed entity. This is a read-only attribute.

### Notation Objects[¶](#notation-objects "Link to this heading")

[`Notation`](#xml.dom.Notation "xml.dom.Notation") represents a notation declared in the DTD. It is a subclass of [`Node`](#xml.dom.Node "xml.dom.Node") and cannot have child nodes. Notation nodes are contained in [`DocumentType.notations`](#xml.dom.DocumentType.notations "xml.dom.DocumentType.notations") and cannot be inserted into the document tree. The name of the notation is its [`nodeName`](#xml.dom.Node.nodeName "xml.dom.Node.nodeName").

Notation.publicId[¶](#xml.dom.Notation.publicId "Link to this definition")

The public identifier of the notation, or `None` if it is not specified. This is a read-only attribute.

Notation.systemId[¶](#xml.dom.Notation.systemId "Link to this definition")

The system identifier of the notation, or `None` if it is not specified. This is a read-only attribute.

### 异常[¶](#exceptions "Link to this heading")

DOM 第 2 层级建议定义了一个异常 [`DOMException`](#xml.dom.DOMException "xml.dom.DOMException")，以及多个常量用来允许应用程序确定发生了何种错误。 `DOMException` 实例带有 [`code`](https://docs.python.org/zh-cn/3/library/code.html#module-code "code: Facilities to implement read-eval-print loops.") 属性用来提供特定异常所对应的值。

Python DOM 接口提供了一些常量，但还扩展了异常集以使 DOM 所定义的每个异常代码都存在特定的异常。 接口的具体实现必须引发正确的特定异常，它们各自带有正确的 [`code`](https://docs.python.org/zh-cn/3/library/code.html#module-code "code: Facilities to implement read-eval-print loops.") 属性值。

_exception_ xml.dom.DOMException[¶](#xml.dom.DOMException "Link to this definition")

所有特定 DOM 异常所使用的异常基类。 该异常类不可被直接实例化。

_exception_ xml.dom.DomstringSizeErr[¶](#xml.dom.DomstringSizeErr "Link to this definition")

当指定范围的文本不能适配一个字符串时被引发。 此异常不确定是否在 Python DOM 实现中被使用过，但可从不是以 Python 编写的 DOM 实现中接收。

_exception_ xml.dom.HierarchyRequestErr[¶](#xml.dom.HierarchyRequestErr "Link to this definition")

当尝试插入一个节点但该节点类型不被允许时被引发。

_exception_ xml.dom.IndexSizeErr[¶](#xml.dom.IndexSizeErr "Link to this definition")

当一个方法的索引或大小参数为负值或超出允许的值范围时被引发。

_exception_ xml.dom.InuseAttributeErr[¶](#xml.dom.InuseAttributeErr "Link to this definition")

当尝试插入一个 [`Attr`](#xml.dom.Attr "xml.dom.Attr") 节点但该节点已存在于文档中的某处时被引发。

_exception_ xml.dom.InvalidAccessErr[¶](#xml.dom.InvalidAccessErr "Link to this definition")

当某个参数或操作在底层对象中不受支持时被引发。

_exception_ xml.dom.InvalidCharacterErr[¶](#xml.dom.InvalidCharacterErr "Link to this definition")

当某个字符串参数包含的字符在使用它的上下文中不被 XML 1.0 标准建议所允许时引发。 例如，尝试创建一个元素类型名称中带有空格的 [`Element`](#xml.dom.Element "xml.dom.Element") 节点将导致此错误被引发。

_exception_ xml.dom.InvalidModificationErr[¶](#xml.dom.InvalidModificationErr "Link to this definition")

当尝试修改某个节点的类型时被引发。

_exception_ xml.dom.InvalidStateErr[¶](#xml.dom.InvalidStateErr "Link to this definition")

当尝试使用未定义或不再可用的对象时被引发。

_exception_ xml.dom.NamespaceErr[¶](#xml.dom.NamespaceErr "Link to this definition")

如果试图以 [XML 中的命名空间](https://www.w3.org/TR/REC-xml-names/) 建议所不允许的方式修改任何对象，则会引发此异常。

_exception_ xml.dom.NotFoundErr[¶](#xml.dom.NotFoundErr "Link to this definition")

当某个节点不存在于被引用的上下文中时引发的异常。 例如，[`NamedNodeMap.removeNamedItem()`](#xml.dom.NamedNodeMap.removeNamedItem "xml.dom.NamedNodeMap.removeNamedItem") 将在所传入的节点不存在于映射中时引发此异常。

_exception_ xml.dom.NotSupportedErr[¶](#xml.dom.NotSupportedErr "Link to this definition")

当具体实现不支持所请求的对象类型或操作时被引发。

_exception_ xml.dom.NoDataAllowedErr[¶](#xml.dom.NoDataAllowedErr "Link to this definition")

当为某个不支持数据的节点指定数据时被引发。

_exception_ xml.dom.NoModificationAllowedErr[¶](#xml.dom.NoModificationAllowedErr "Link to this definition")

当尝试修改某个不允许修改的对象（例如只读节点）时被引发。

_exception_ xml.dom.SyntaxErr[¶](#xml.dom.SyntaxErr "Link to this definition")

当指定了无效或非法的字符串时被引发。

_exception_ xml.dom.ValidationErr[¶](#xml.dom.ValidationErr "Link to this definition")

Raised when an operation would make the document invalid with respect to partial validity. This is not known to be used in the Python DOM implementations, but may be received from DOM implementations not written in Python.

_exception_ xml.dom.WrongDocumentErr[¶](#xml.dom.WrongDocumentErr "Link to this definition")

当将某个节点插入非其当前所属的另一个文档，并且具体实现不支持从一个文档向另一个文档迁移节点时被引发。

DOM 建议映射中针对上述异常而定义的异常代码如下表所示:

| 
常量

 | 

异常

 |
| --- | --- |
| 

xml.dom.DOMSTRING\_SIZE\_ERR[¶](#xml.dom.DOMSTRING_SIZE_ERR "Link to this definition")



 | 

[`DomstringSizeErr`](#xml.dom.DomstringSizeErr "xml.dom.DomstringSizeErr")

 |
| 

xml.dom.HIERARCHY\_REQUEST\_ERR[¶](#xml.dom.HIERARCHY_REQUEST_ERR "Link to this definition")



 | 

[`HierarchyRequestErr`](#xml.dom.HierarchyRequestErr "xml.dom.HierarchyRequestErr")

 |
| 

xml.dom.INDEX\_SIZE\_ERR[¶](#xml.dom.INDEX_SIZE_ERR "Link to this definition")



 | 

[`IndexSizeErr`](#xml.dom.IndexSizeErr "xml.dom.IndexSizeErr")

 |
| 

xml.dom.INUSE\_ATTRIBUTE\_ERR[¶](#xml.dom.INUSE_ATTRIBUTE_ERR "Link to this definition")



 | 

[`InuseAttributeErr`](#xml.dom.InuseAttributeErr "xml.dom.InuseAttributeErr")

 |
| 

xml.dom.INVALID\_ACCESS\_ERR[¶](#xml.dom.INVALID_ACCESS_ERR "Link to this definition")



 | 

[`InvalidAccessErr`](#xml.dom.InvalidAccessErr "xml.dom.InvalidAccessErr")

 |
| 

xml.dom.INVALID\_CHARACTER\_ERR[¶](#xml.dom.INVALID_CHARACTER_ERR "Link to this definition")



 | 

[`InvalidCharacterErr`](#xml.dom.InvalidCharacterErr "xml.dom.InvalidCharacterErr")

 |
| 

xml.dom.INVALID\_MODIFICATION\_ERR[¶](#xml.dom.INVALID_MODIFICATION_ERR "Link to this definition")



 | 

[`InvalidModificationErr`](#xml.dom.InvalidModificationErr "xml.dom.InvalidModificationErr")

 |
| 

xml.dom.INVALID\_STATE\_ERR[¶](#xml.dom.INVALID_STATE_ERR "Link to this definition")



 | 

[`InvalidStateErr`](#xml.dom.InvalidStateErr "xml.dom.InvalidStateErr")

 |
| 

xml.dom.NAMESPACE\_ERR[¶](#xml.dom.NAMESPACE_ERR "Link to this definition")



 | 

[`NamespaceErr`](#xml.dom.NamespaceErr "xml.dom.NamespaceErr")

 |
| 

xml.dom.NOT\_FOUND\_ERR[¶](#xml.dom.NOT_FOUND_ERR "Link to this definition")



 | 

[`NotFoundErr`](#xml.dom.NotFoundErr "xml.dom.NotFoundErr")

 |
| 

xml.dom.NOT\_SUPPORTED\_ERR[¶](#xml.dom.NOT_SUPPORTED_ERR "Link to this definition")



 | 

[`NotSupportedErr`](#xml.dom.NotSupportedErr "xml.dom.NotSupportedErr")

 |
| 

xml.dom.NO\_DATA\_ALLOWED\_ERR[¶](#xml.dom.NO_DATA_ALLOWED_ERR "Link to this definition")



 | 

[`NoDataAllowedErr`](#xml.dom.NoDataAllowedErr "xml.dom.NoDataAllowedErr")

 |
| 

xml.dom.NO\_MODIFICATION\_ALLOWED\_ERR[¶](#xml.dom.NO_MODIFICATION_ALLOWED_ERR "Link to this definition")



 | 

[`NoModificationAllowedErr`](#xml.dom.NoModificationAllowedErr "xml.dom.NoModificationAllowedErr")

 |
| 

xml.dom.SYNTAX\_ERR[¶](#xml.dom.SYNTAX_ERR "Link to this definition")



 | 

[`SyntaxErr`](#xml.dom.SyntaxErr "xml.dom.SyntaxErr")

 |
| 

xml.dom.VALIDATION\_ERR[¶](#xml.dom.VALIDATION_ERR "Link to this definition")



 | 

[`ValidationErr`](#xml.dom.ValidationErr "xml.dom.ValidationErr")

 |
| 

xml.dom.WRONG\_DOCUMENT\_ERR[¶](#xml.dom.WRONG_DOCUMENT_ERR "Link to this definition")



 | 

[`WrongDocumentErr`](#xml.dom.WrongDocumentErr "xml.dom.WrongDocumentErr")

 |

## 一致性[¶](#conformance "Link to this heading")

本节描述了 Python DOM API、W3C DOM 建议以及 Python 的 OMG IDL 映射之间的一致性要求和关系。

### 类型映射[¶](#type-mapping "Link to this heading")

DOM 规范中使用的 IDL 类型将根据下表映射为 Python 类型。

| 
IDL 类型

 | 

Python 类型

 |
| --- | --- |
| 

`boolean`

 | 

`bool` 或 `int`

 |
| 

`int`

 | 

`int`

 |
| 

`long int`

 | 

`int`

 |
| 

`unsigned int`

 | 

`int`

 |
| 

`DOMString`

 | 

`str` 或 `bytes`

 |
| 

`null`

 | 

`None`

 |

### 访问器方法[¶](#accessor-methods "Link to this heading")

从 OMG IDL 到 Python 的映射以类似于 Java 映射的方式定义了针对 IDL `attribute` 声明的访问器函数。 映射以下 IDL 声明

readonly attribute string someValue;
         attribute string anotherValue;

yields three accessor functions: a "get" method for `someValue` (`_get_someValue()`), and "get" and "set" methods for `anotherValue` (`_get_anotherValue()` and `_set_anotherValue()`). The mapping, in particular, does not require that the IDL attributes are accessible as normal Python attributes: `object.someValue` is _not_ required to work, and may raise an [`AttributeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#AttributeError "AttributeError").

但是，Python DOM API 则 _确实_ 要求普通属性访问可用。 这意味着由 Python IDL 解译器生成的典型代理有可能会不可用，如果 DOM 对象是通过 CORBA 来访问则在客户端可能需要有包装对象。 虽然这确实要求为 CORBA DOM 客户端进行额外的考虑，但具有从 Python 通过 CORBA 使用 DOM 经验的实现并不会认为这是个问题。 已经声明了 `readonly` 的属性不必在所有 DOM 实现中限制写入访问。

在 Python DOM API 中，访问器函数不是必须的。 如果提供，则它们应当采用由 Python IDL 映射所定义的形式，但这些方法会被认为不必要，因为这些属性可以从 Python 直接访问。 永远都不要为 `readonly` 属性提供 "set" 访问器。

The IDL definitions do not fully embody the requirements of the W3C DOM API, such as the notion of certain objects, such as the return value of [`getElementsByTagName()`](#xml.dom.Element.getElementsByTagName "xml.dom.Element.getElementsByTagName"), being "live". The Python DOM API does not require implementations to enforce such requirements.
