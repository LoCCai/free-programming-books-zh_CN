**源代码：** [Lib/xml/etree/ElementTree.py](https://github.com/python/cpython/tree/3.14/Lib/xml/etree/ElementTree.py)

* * *

`xml.etree.ElementTree` 模块实现了一个简单高效的 API 用于解析和创建 XML 数据。

在 3.3 版本发生变更: 此模块将在可能的情况下使用快速实现。

自 3.3 版本弃用: 此模块的 `xml.etree.cElementTree` 别名已被弃用。

备注

如果你需要解析不受信任或未经身份验证的数据，请参阅 [XML 安全](https://docs.python.org/zh-cn/3/library/xml.html#xml-security)。

## 教程[¶](#tutorial "Link to this heading")

这是一个使用 `xml.etree.ElementTree` (简称 `ET`) 的简短教程。 目标是演示此模块的一些构建块和基本概念。

### XML 树和元素[¶](#xml-tree-and-elements "Link to this heading")

XML 是一种内在的分层数据格式，最自然的表示方法是使用树。 为此， `ET` 有两个类 -- [`ElementTree`](#xml.etree.ElementTree.ElementTree "xml.etree.ElementTree.ElementTree") 将整个XML文档表示为一个树， [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 表示该树中的单个节点。 与整个文档的交互（读写文件）通常在 `ElementTree` 级别完成。 与单个 XML 元素及其子元素的交互是在 `Element` 级别完成的。

### 解析 XML[¶](#parsing-xml "Link to this heading")

我们将使用虚构的 `country_data.xml` XML 文档作为本节的示例数据：

<?xml version="1.0"?>
<data>
    <country name="Liechtenstein"\>
        <rank>1</rank>
        <year>2008</year>
        <gdppc>141100</gdppc>
        <neighbor name="Austria" direction="E"/>
        <neighbor name="Switzerland" direction="W"/>
    </country>
    <country name="Singapore"\>
        <rank>4</rank>
        <year>2011</year>
        <gdppc>59900</gdppc>
        <neighbor name="Malaysia" direction="N"/>
    </country>
    <country name="Panama"\>
        <rank>68</rank>
        <year>2011</year>
        <gdppc>13600</gdppc>
        <neighbor name="Costa Rica" direction="W"/>
        <neighbor name="Colombia" direction="E"/>
    </country>
</data>

可以通过从文件中读取来导入此数据：

import xml.etree.ElementTree as ET
tree \= ET.parse('country\_data.xml')
root \= tree.getroot()

或直接从字符串中解析：

root \= ET.fromstring(country\_data\_as\_string)

[`fromstring()`](#xml.etree.ElementTree.fromstring "xml.etree.ElementTree.fromstring") 将 XML 从字符串直接解析为 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") ，该元素是已解析树的根元素。 其他解析函数可能会创建一个 [`ElementTree`](#xml.etree.ElementTree.ElementTree "xml.etree.ElementTree.ElementTree") 。 确切信息请查阅文档。

作为 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") ， `root` 具有标签和属性字典:

\>>> root.tag
'data'
\>>> root.attrib
{}

还有可以迭代的子节点：

\>>> for child in root:
...     print(child.tag, child.attrib)
...
country {'name': 'Liechtenstein'}
country {'name': 'Singapore'}
country {'name': 'Panama'}

子级是可以嵌套的，我们可以通过索引访问特定的子级节点：

\>>> root\[0\]\[1\].text
'2008'

备注

并非 XML 输入的所有元素都将作为解析树的元素结束。 目前，此模块跳过输入中的任何 XML 注释、处理指令和文档类型声明。 然而，使用这个模块的 API 而不是从 XML 文本解析构建的树可以包含注释和处理指令，生成 XML 输出时同样包含这些注释和处理指令。 可以通过将自定义 [`TreeBuilder`](#xml.etree.ElementTree.TreeBuilder "xml.etree.ElementTree.TreeBuilder") 实例传递给 [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") 构造器来访问文档类型声明。

### 用于非阻塞解析的拉取 API[¶](#pull-api-for-non-blocking-parsing "Link to this heading")

此模块所提供的大多数解析函数都要求在返回任何结果之前一次性读取整个文档。 可以使用 [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") 并以增量方式添加数据，但这是在回调目标上调用方法的推送式 API。 有时用户真正想要的是能够以增量方式解析 XML 而无需阻塞操作，同时享受完整的已构造 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 对象。

针对此需求的最强大工具是 [`XMLPullParser`](#xml.etree.ElementTree.XMLPullParser "xml.etree.ElementTree.XMLPullParser")。 它不要求通过阻塞式读取来获得 XML 数据，而是通过执行 [`XMLPullParser.feed()`](#xml.etree.ElementTree.XMLPullParser.feed "xml.etree.ElementTree.XMLPullParser.feed") 调用来增量式地添加数据。 要获得已解析的 XML 元素，应调用 [`XMLPullParser.read_events()`](#xml.etree.ElementTree.XMLPullParser.read_events "xml.etree.ElementTree.XMLPullParser.read_events")。 下面是一个示例:

\>>> parser \= ET.XMLPullParser(\['start', 'end'\])
\>>> parser.feed('<mytag>sometext')
\>>> list(parser.read\_events())
\[('start', <Element 'mytag' at 0x7fa66db2be58>)\]
\>>> parser.feed(' more text</mytag>')
\>>> for event, elem in parser.read\_events():
...     print(event)
...     print(elem.tag, 'text=', elem.text)
...
end
mytag text= sometext more text

常见的用例是针对以非阻塞方式进行的应用程序，其中 XML 是从套接字接收或从某些存储设备增量式读取的。 在这些用例中，阻塞式读取是不可接受的。

Because it's so flexible, [`XMLPullParser`](#xml.etree.ElementTree.XMLPullParser "xml.etree.ElementTree.XMLPullParser") can be inconvenient to use for simpler use-cases. If you don't mind your application blocking on reading XML data but would still like to have incremental parsing capabilities, take a look at [`iterparse()`](#xml.etree.ElementTree.iterparse "xml.etree.ElementTree.iterparse").

Note that both parsers build the tree incrementally: it is not freed incrementally, so every parsed element is kept until the whole document is read. To keep the memory usage low, get rid of the data which is not needed any more.

如果被处理的元素较大，清空它们就足够了。 无论它们在树的哪个位置都有效，但清空的元素将保留在树中:

for event, elem in ET.iterparse(source):
    if elem.tag \== 'record':
        process(elem)
        elem.clear()

If an element has a large number of children, remove the processed children from it:

for event, elem in ET.iterparse(source, events\=('start', 'end')):
    if event \== 'start' and elem.tag \== 'parent':
        parent \= elem
    elif event \== 'end' and elem.tag \== 'child':
        process(elem)
        parent.remove(elem)

These examples are not universal, they only give an idea for two common cases. If you do not need a tree at all, parse with [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") and a custom target instead; it is not built then, and nothing has to be removed.

在需要通过事件获得 _即时_ 反馈的场合中，调用方法 [`XMLPullParser.flush()`](#xml.etree.ElementTree.XMLPullParser.flush "xml.etree.ElementTree.XMLPullParser.flush") 将有助于减少延迟；请注意研究相关的安全说明。

### 查找感兴趣的元素[¶](#finding-interesting-elements "Link to this heading")

[`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 有一些很有效的方法，可帮助递归遍历其下的所有子树（包括子级，子级的子级，等等）。例如 [`Element.iter()`](#xml.etree.ElementTree.Element.iter "xml.etree.ElementTree.Element.iter"):

\>>> for neighbor in root.iter('neighbor'):
...     print(neighbor.attrib)
...
{'name': 'Austria', 'direction': 'E'}
{'name': 'Switzerland', 'direction': 'W'}
{'name': 'Malaysia', 'direction': 'N'}
{'name': 'Costa Rica', 'direction': 'W'}
{'name': 'Colombia', 'direction': 'E'}

[`Element.findall()`](#xml.etree.ElementTree.Element.findall "xml.etree.ElementTree.Element.findall") 仅查找当前元素的直接子元素中带有指定标签的元素。 [`Element.find()`](#xml.etree.ElementTree.Element.find "xml.etree.ElementTree.Element.find") 找带有特定标签的 _第一个_ 子级，然后可以用 [`Element.text`](#xml.etree.ElementTree.Element.text "xml.etree.ElementTree.Element.text") 访问元素的文本内容。 [`Element.get()`](#xml.etree.ElementTree.Element.get "xml.etree.ElementTree.Element.get") 访问元素的属性:

\>>> for country in root.findall('country'):
...     rank \= country.find('rank').text
...     name \= country.get('name')
...     print(name, rank)
...
Liechtenstein 1
Singapore 4
Panama 68

通过使用 [XPath](#elementtree-xpath) ，可以更精确地指定要查找的元素。

### 修改XML文件[¶](#modifying-an-xml-file "Link to this heading")

[`ElementTree`](#xml.etree.ElementTree.ElementTree "xml.etree.ElementTree.ElementTree") 提供了一种构建XML文档并将其写入文件的简单方法。调用 [`ElementTree.write()`](#xml.etree.ElementTree.ElementTree.write "xml.etree.ElementTree.ElementTree.write") 方法就可以实现。

创建后可以直接操作 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 对象。例如：使用 [`Element.text`](#xml.etree.ElementTree.Element.text "xml.etree.ElementTree.Element.text") 修改文本字段，使用 [`Element.set()`](#xml.etree.ElementTree.Element.set "xml.etree.ElementTree.Element.set") 方法添加和修改属性，以及使用 [`Element.append()`](#xml.etree.ElementTree.Element.append "xml.etree.ElementTree.Element.append") 添加新的子元素。

假设我们要为每个国家/地区的排名加一，并在排名元素中添加一个 `updated` 属性：

\>>> for rank in root.iter('rank'):
...     new\_rank \= int(rank.text) + 1
...     rank.text \= str(new\_rank)
...     rank.set('updated', 'yes')
...
\>>> tree.write('output.xml')

生成的XML现在看起来像这样：

<?xml version="1.0"?>
<data>
    <country name="Liechtenstein"\>
        <rank updated="yes"\>2</rank>
        <year>2008</year>
        <gdppc>141100</gdppc>
        <neighbor name="Austria" direction="E"/>
        <neighbor name="Switzerland" direction="W"/>
    </country>
    <country name="Singapore"\>
        <rank updated="yes"\>5</rank>
        <year>2011</year>
        <gdppc>59900</gdppc>
        <neighbor name="Malaysia" direction="N"/>
    </country>
    <country name="Panama"\>
        <rank updated="yes"\>69</rank>
        <year>2011</year>
        <gdppc>13600</gdppc>
        <neighbor name="Costa Rica" direction="W"/>
        <neighbor name="Colombia" direction="E"/>
    </country>
</data>

可以使用 [`Element.remove()`](#xml.etree.ElementTree.Element.remove "xml.etree.ElementTree.Element.remove") 删除元素。假设我们要删除排名高于50的所有国家/地区:

\>>> for country in root.findall('country'):
...     \# 使用 root.findall() 以避免在遍历期间执行移除
...     rank \= int(country.find('rank').text)
...     if rank \> 50:
...         root.remove(country)
...
\>>> tree.write('output.xml')

请注意在迭代时进行并发修改可能会导致问题，就像在迭代并修改 Python 列表或字典时那样。 因此，这个示例先通过 `root.findall()` 收集了所有匹配的元素，在此之后再对匹配项列表进行迭代。

生成的XML现在看起来像这样：

<?xml version="1.0"?>
<data>
    <country name="Liechtenstein"\>
        <rank updated="yes"\>2</rank>
        <year>2008</year>
        <gdppc>141100</gdppc>
        <neighbor name="Austria" direction="E"/>
        <neighbor name="Switzerland" direction="W"/>
    </country>
    <country name="Singapore"\>
        <rank updated="yes"\>5</rank>
        <year>2011</year>
        <gdppc>59900</gdppc>
        <neighbor name="Malaysia" direction="N"/>
    </country>
</data>

### 构建 XML 文档[¶](#building-xml-documents "Link to this heading")

[`SubElement()`](#xml.etree.ElementTree.SubElement "xml.etree.ElementTree.SubElement") 函数还提供了一种便捷方法来为给定元素创建新的子元素:

\>>> a \= ET.Element('a')
\>>> b \= ET.SubElement(a, 'b')
\>>> c \= ET.SubElement(a, 'c')
\>>> d \= ET.SubElement(c, 'd')
\>>> ET.dump(a)
<a><b /><c><d /></c></a>

### 解析带有命名空间的 XML[¶](#parsing-xml-with-namespaces "Link to this heading")

如果 XML 输入带有 [命名空间](https://en.wikipedia.org/wiki/XML_namespace)，则具有前缀的 `prefix:sometag` 形式的标记和属性将被扩展为 `{uri}sometag`，其中 _prefix_ 会被完整 _URI_ 所替换。 并且，如果存在 [默认命名空间](https://www.w3.org/TR/xml-names/#defaulting)，则完整 URI 会被添加到所有未加前缀的标记之前。

下面的 XML 示例包含两个命名空间，一个具有前缀 "fictional" 而另一个则作为默认命名空间:

<?xml version="1.0"?>
<actors xmlns:fictional="http://characters.example.com"
        xmlns="http://people.example.com"\>
    <actor>
        <name>John Cleese</name>
        <fictional:character>Lancelot</fictional:character>
        <fictional:character>Archie Leach</fictional:character>
    </actor>
    <actor>
        <name>Eric Idle</name>
        <fictional:character>Sir Robin</fictional:character>
        <fictional:character>Gunther</fictional:character>
        <fictional:character>Commander Clement</fictional:character>
    </actor>
</actors>

搜索和探查这个 XML 示例的一种方式是手动为 [`find()`](#xml.etree.ElementTree.Element.find "xml.etree.ElementTree.Element.find") 或 [`findall()`](#xml.etree.ElementTree.Element.findall "xml.etree.ElementTree.Element.findall") 的 xpath 中的每个标记或属性添加 URI:

root \= fromstring(xml\_text)
for actor in root.findall('{http://people.example.com}actor'):
    name \= actor.find('{http://people.example.com}name')
    print(name.text)
    for char in actor.findall('{http://characters.example.com}character'):
        print(' |-->', char.text)

一种更好的搜索带命名空间的 XML 示例的方式是创建一个字典来存放你自己的前缀并在搜索函数中使用它们:

ns \= {'real\_person': 'http://people.example.com',
      'role': 'http://characters.example.com'}

for actor in root.findall('real\_person:actor', ns):
    name \= actor.find('real\_person:name', ns)
    print(name.text)
    for char in actor.findall('role:character', ns):
        print(' |-->', char.text)

这两种方式都会输出:

John Cleese
 |--> Lancelot
 |--> Archie Leach
Eric Idle
 |--> Sir Robin
 |--> Gunther
 |--> Commander Clement

## XPath支持[¶](#xpath-support "Link to this heading")

此模块提供了对 [XPath 表达式](https://www.w3.org/TR/xpath) 的有限支持用于在树中定位元素。 其目标是支持一个简化语法的较小子集；完整的 XPath 引擎超出了此模块的适用范围。

### 示例[¶](#example "Link to this heading")

下面是一个演示此模块的部分 XPath 功能的例子。 我们将使用来自 [解析 XML](#elementtree-parsing-xml) 小节的 `countrydata` XML 文档:

import xml.etree.ElementTree as ET

root \= ET.fromstring(countrydata)

\# 最高层级的元素
root.findall(".")

\# 最高层级下的 'country' 子元素的所有 'neighbor' 孙子元素
root.findall("./country/neighbor")

\# 有一个 'year' 子元素的包含 name='Singapore' 的节点
root.findall(".//year/..\[@name='Singapore'\]")

\# 是包含 name='Singapore' 的节点的子元素的 'year' 节点
root.findall(".//\*\[@name='Singapore'\]/year")

\# 是其父元素的第二个子元素的所有 'neighbor' 节点
root.findall(".//neighbor\[2\]")

对于带有命名空间的 XML，应使用通常的限定 `{namespace}tag` 标记法:

\# 文档中所有的 dublin-core "title" 标签
root.findall(".//{http://purl.org/dc/elements/1.1/}title")

### 支持的XPath语法[¶](#supported-xpath-syntax "Link to this heading")

| 
语法

 | 

含义

 |
| --- | --- |
| 

`tag`

 | 

选择具有给定标记的所有子元素。 例如，`spam` 是选择名为 `spam` 的所有子元素，而 `spam/egg` 是在名为 `spam` 的子元素中选择所有名为 `egg` 的孙元素。 `{namespace}*` 是选择给定命名空间中的所有标记，`{*}spam` 是在任意（或无）命名空间中选择名为 `spam` 的标记，而 `{}*` 是只选择不在命名空间中的标记。

在 3.8 版本发生变更: 增加了对星号通配符的支持。

 |
| 

`*`

 | 

选择所有子元素，包括注释和处理说明。例如 `*/egg` 选择所有名为 `egg` 的孙元素。

 |
| 

`.`

 | 

选择当前节点。这在路径的开头非常有用，用于指示它是相对路径。

 |
| 

`//`

 | 

选择当前元素下所有层级中的所有子元素。 例如，`.//egg` 是在整个树中选择所有 `egg` 元素。

 |
| 

`..`

 | 

选择父元素。 如果路径试图前往起始元素的上级（元素的 `find` 被调用）则返回 `None`。

 |
| 

`[@attrib]`

 | 

选择具有给定属性的所有元素。

 |
| 

`[@attrib='value']`

 | 

选择给定属性具有给定值的所有元素。该值不能包含引号。

 |
| 

`[@attrib!='value']`

 | 

选择给定属性不具有给定值的所有元素。 该值不能包含引号。

Added in version 3.10.

 |
| 

`[tag]`

 | 

选择所有包含 `tag` 子元素的元素。只支持直系子元素。

 |
| 

`[.='text']`

 | 

选择完整文本内容等于 `text` 的所有元素（包括后代）。

Added in version 3.7.

 |
| 

`[.!='text']`

 | 

选择完整文本内容包括其下级内容不等于给定的 `text` 的所有元素。

Added in version 3.10.

 |
| 

`[tag='text']`

 | 

选择所有包含名为 `tag` 的子元素的元素，这些子元素（包括后代）的完整文本内容等于给定的 `text` 。

 |
| 

`[tag!='text']`

 | 

选择具有名为 `tag` 的子元素的所有元素，这些子元素包括其下级元素的完整文本内容不等于给定的 `text`。

Added in version 3.10.

 |
| 

`[position]`

 | 

选择位于给定位置的所有元素。 位置可以是一个整数 (1 表示首位)，表达式 `last()` (表示末位)，或者相对于末位的位置 (例如 `last()-1`)。

 |

谓词（方括号内的表达式）之前必须带有标签名称，星号或其他谓词。`position` 谓词前必须有标签名称。

## 参考[¶](#reference "Link to this heading")

### 函数[¶](#functions "Link to this heading")

xml.etree.ElementTree.canonicalize(_xml\_data\=None_, _\*_, _out\=None_, _from\_file\=None_, _\*\*options_)[¶](#xml.etree.ElementTree.canonicalize "Link to this definition")

[C14N 2.0](https://www.w3.org/TR/xml-c14n2/) 转换函数。

规整化是标准化 XML 输出的一种方式，它允许按字节比较和使用数字签名。 它降低了 XML 序列化器所具有的自由度并改为生成更受约束的 XML 表示形式。 主要限制涉及命名空间声明的位置、属性的顺序和可忽略的空白符等。

此函数接受一个 XML 数据字符串 (_xml\_data_) 或文件路径或者文件型对象 (_from\_file_) 作为输入，将其转换为规整形式，并在提供了 _out_ 文件（类）对象的情况下将其写入该对象，或者如果未提供则将其作为文本字符串返回。 输出文件接受文本而非字节数据。 因此它应当以使用 `utf-8` 编码格式的文本模式来打开。

典型使用:

xml\_data \= "<root>...</root>"
print(canonicalize(xml\_data))

with open("c14n\_output.xml", mode\='w', encoding\='utf-8') as out\_file:
    canonicalize(xml\_data, out\=out\_file)

with open("c14n\_output.xml", mode\='w', encoding\='utf-8') as out\_file:
    canonicalize(from\_file\="inputfile.xml", out\=out\_file)

配置选项 _options_ 如下:

-   _with\_comments_: 设为真值以包括注释 (默认为假值)
    
-   _strip\_text_: 设为真值以去除文本内容前后的空白符
    
    （默认值：否）
    
-   _rewrite\_prefixes_: 设为真值以使用 "n{number}" 来替换命名空间前缀
    
    （默认值：否）
    
-   _qname\_aware\_tags_: 一组可感知限定名称的标记名称，其中的前缀
    
    应当在文本内容中被替换 (默认为空值)
    
-   _qname\_aware\_attrs_: 一组可感知限定名称的属性名称，其中的前缀
    
    应当在文本内容中被替换 (默认为空值)
    
-   _exclude\_attrs_: 一组不应当被序列化的属性名称
    
-   _exclude\_tags_: 一组不应当被序列化的标记名称
    

在上面的选项列表中，"一组" 是指任意多项集或包含字符串的可迭代对象，排序是不必要的。

Added in version 3.8.

Comment element factory. This factory function creates a special element that will be serialized as an XML comment by the standard serializer. _text_ is a string containing the comment string. Returns an element instance representing a comment.

请注意 [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") 会跳过输入中的注释而不会为其创建注释对象。 [`ElementTree`](#xml.etree.ElementTree.ElementTree "xml.etree.ElementTree.ElementTree") 将只在当使用某个 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 方法向树插入了注释节点时才会包含注释节点。

xml.etree.ElementTree.dump(_elem_)[¶](#xml.etree.ElementTree.dump "Link to this definition")

将一个元素树或元素结构体写入到 sys.stdout。 此函数应当只被用于调试。

实际输出格式是依赖于具体实现的。 在这个版本中，它将以普通 XML 文件的格式写入。

_elem_ 是一个元素树或单独元素。

在 3.8 版本发生变更: [`dump()`](#xml.etree.ElementTree.dump "xml.etree.ElementTree.dump") 函数现在会保留用户指定的属性顺序。

xml.etree.ElementTree.fromstring(_text_, _parser\=None_)[¶](#xml.etree.ElementTree.fromstring "Link to this definition")

根据一个字符串常量解析 XML 的节。 与 [`XML()`](#xml.etree.ElementTree.XML "xml.etree.ElementTree.XML") 类似。 _text_ 是包含 XML 数据的字符串。 _parser_ 是可选的解析器实例。 如果未给出，则会使用标准 [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") 解析器。 返回一个 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 实例。

xml.etree.ElementTree.fromstringlist(_sequence_, _parser\=None_)[¶](#xml.etree.ElementTree.fromstringlist "Link to this definition")

根据一个字符串片段序列解析 XML 文档。 _sequence_ 是包含 XML 数据片段的列表或其他序列对象。 _parser_ 是可选的解析器实例。 如果未给出，则会使用标准的 [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") 解析器。 返回一个 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 实例。

Added in version 3.2.

xml.etree.ElementTree.indent(_tree_, _space\='  '_, _level\=0_)[¶](#xml.etree.ElementTree.indent "Link to this definition")

添加空格到子树来实现树的缩进效果。 这可以被用来生成美化打印的 XML 输出。 _tree_ 可以为 Element 或 ElementTree。 _space_ 是对应将被插入的每个缩进层级的空格字符串，默认为两个空格符。 要对已缩进的树的部分子树进行缩进，请传入初始缩进层级作为 _level_。

Added in version 3.9.

xml.etree.ElementTree.iselement(_element_)[¶](#xml.etree.ElementTree.iselement "Link to this definition")

检测一个对象是否为有效的元素对象。 _element_ 是一个元素实例。 如果对象是一个元素对象则返回 `True`。

xml.etree.ElementTree.iterparse(_source_, _events\=None_, _parser\=None_)[¶](#xml.etree.ElementTree.iterparse "Link to this definition")

Parses an XML section into an element tree incrementally, and reports what's going on to the user. _source_ is a filename or [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) containing XML data. _events_ is a sequence of events to report back. The supported events are the strings `"start"`, `"end"`, `"comment"`, `"pi"`, `"start-ns"` and `"end-ns"` (the "ns" events are used to get detailed namespace information). If _events_ is omitted, only `"end"` events are reported. _parser_ is an optional parser instance. If not given, the standard [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") parser is used. _parser_ must be an instance of `XMLParser` or its subclass and can only use the default [`TreeBuilder`](#xml.etree.ElementTree.TreeBuilder "xml.etree.ElementTree.TreeBuilder") as a target. Returns an [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator) providing `(event, elem)` pairs; it has a `root` attribute that references the root element of the resulting XML tree once _source_ is fully read. The iterator has the `close()` method that closes the internal file object if _source_ is a filename.

请注意虽然 [`iterparse()`](#xml.etree.ElementTree.iterparse "xml.etree.ElementTree.iterparse") 是以增量方式构建树，但它会对 _source_ (或其所指定的文件) 发出阻塞式读取。 因此，它不适用于不可执行阻塞式读取的应用。 对于完全非阻塞式的解析，请参看 [`XMLPullParser`](#xml.etree.ElementTree.XMLPullParser "xml.etree.ElementTree.XMLPullParser")。

The tree is only built incrementally, it is not freed incrementally: every parsed element is kept until the whole document is read. See [用于非阻塞解析的拉取 API](#elementtree-pull-parsing) for how to keep the memory usage low.

备注

[`iterparse()`](#xml.etree.ElementTree.iterparse "xml.etree.ElementTree.iterparse") 只会确保当发出 "start" 事件时看到了开始标记的 ">" 字符，因而在这个点上属性已被定义，但文本内容和末尾属性还未被定义。 这同样适用于元素的下级；它们可能存在也可能不存在。

如果你需要已完全填充的元素，请改为查找 "end" 事件。

自 3.4 版本弃用: _parser_ 参数。

在 3.8 版本发生变更: 增加了 `comment` 和 `pi` 事件。

在 3.13 版本发生变更: 增加了 `close()` 方法。

xml.etree.ElementTree.parse(_source_, _parser\=None_)[¶](#xml.etree.ElementTree.parse "Link to this definition")

将一个 XML 的节解析为元素树。 _source_ 是包含 XML 数据的文件名或文件对象。 _parser_ 是可选的解析器实例。 如果未给出，则会使用标准的 [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") 解析器。 返回一个 [`ElementTree`](#xml.etree.ElementTree.ElementTree "xml.etree.ElementTree.ElementTree") 实例。

xml.etree.ElementTree.ProcessingInstruction(_target_, _text\=None_)[¶](#xml.etree.ElementTree.ProcessingInstruction "Link to this definition")

PI 元素工厂函数。 这个工厂函数可创建一个特殊元素，它将被当作 XML 处理指令来进行序列化。 _target_ 是包含 PI 目标的字符串。 _text_ 如果给出则是包含 PI 内容的字符串。 返回一个表示处理指令的元素实例。

请注意 [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") 会跳过输入中的处理指令而不会为其创建 PI 对象。 [`ElementTree`](#xml.etree.ElementTree.ElementTree "xml.etree.ElementTree.ElementTree") 将只在当使用某个 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 方法向树插入了处理指令节点时才会包含它们。

xml.etree.ElementTree.register\_namespace(_prefix_, _uri_)[¶](#xml.etree.ElementTree.register_namespace "Link to this definition")

注册一个命名空间前缀。 这个注册表是全局的，并且任何对应给定前缀或命名空间 URI 的现有映射都会被移除。 _prefix_ 是命名空间前缀。 _uri_ 是命名空间 URI。 如果可能的话，这个命名空间中的标记和属性将附带给定的前缀来进行序列化。

Added in version 3.2.

xml.etree.ElementTree.SubElement(_parent_, _tag_, _attrib\={}_, _\*\*extra_)[¶](#xml.etree.ElementTree.SubElement "Link to this definition")

子元素工厂函数。 这个函数会创建一个元素实例，并将其添加到现有的元素。

_parent_ is the parent element. _tag_ is the subelement name. _attrib_ is an optional dictionary, containing element attributes. _extra_ contains additional attributes, given as keyword arguments. Returns an element instance.

xml.etree.ElementTree.tostring(_element_, _encoding\='us-ascii'_, _method\='xml'_, _\*_, _xml\_declaration\=None_, _default\_namespace\=None_, _short\_empty\_elements\=True_)[¶](#xml.etree.ElementTree.tostring "Link to this definition")

生成一个 XML 元素的字符串表示形式，包括所有子元素。 _element_ 是一个 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 实例。 _encoding_ [\[1\]](#id9) 是输出编码格式（默认为 US-ASCII）。 请使用 `encoding="unicode"` 来生成 Unicode 字符串（否则生成字节串）。 _method_ 是 `"xml"`, `"html"` 或 `"text"` (默认为 `"xml"`)。 _xml\_declaration_, _default\_namespace_ 和 _short\_empty\_elements_ 具有与 [`ElementTree.write()`](#xml.etree.ElementTree.ElementTree.write "xml.etree.ElementTree.ElementTree.write") 中一致的含义。 返回一个包含 XML 数据（可选）已编码的字符串。

在 3.4 版本发生变更: 增加了 _short\_empty\_elements_ 形参。

在 3.8 版本发生变更: 增加了 _xml\_declaration_ 和 _default\_namespace_ 形参。

在 3.8 版本发生变更: [`tostring()`](#xml.etree.ElementTree.tostring "xml.etree.ElementTree.tostring") 函数现在会保留用户指定的属性顺序。

xml.etree.ElementTree.tostringlist(_element_, _encoding\='us-ascii'_, _method\='xml'_, _\*_, _xml\_declaration\=None_, _default\_namespace\=None_, _short\_empty\_elements\=True_)[¶](#xml.etree.ElementTree.tostringlist "Link to this definition")

生成一个 XML 元素的字符串表示形式，包括所有子元素。 _element_ 是一个 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 实例。 _encoding_ [\[1\]](#id9) 是输出编码格式（默认为 US-ASCII）。 请使用 `encoding="unicode"` 来生成 Unicode 字符串（否则生成字节串）。 _method_ 是 `"xml"`, `"html"` 或 `"text"` (默认为 `"xml"`)。 _xml\_declaration_, _default\_namespace_ 和 _short\_empty\_elements_ 具有与 [`ElementTree.write()`](#xml.etree.ElementTree.ElementTree.write "xml.etree.ElementTree.ElementTree.write") 中一致的含义。 返回一个包含 XML 数据（可选）已编码字符串的列表。 它并不保证任何特定的序列，除了 `b"".join(tostringlist(element)) == tostring(element)`。

Added in version 3.2.

在 3.4 版本发生变更: 增加了 _short\_empty\_elements_ 形参。

在 3.8 版本发生变更: 增加了 _xml\_declaration_ 和 _default\_namespace_ 形参。

在 3.8 版本发生变更: [`tostringlist()`](#xml.etree.ElementTree.tostringlist "xml.etree.ElementTree.tostringlist") 函数现在会保留用户指定的属性顺序。

xml.etree.ElementTree.XML(_text_, _parser\=None_)[¶](#xml.etree.ElementTree.XML "Link to this definition")

根据一个字符串常量解析 XML 的节。 此函数可被用于在 Python 代码中嵌入“XML 字面值”。 _text_ 是包含 XML 数据的字符串。 _parser_ 是可选的解析器实例。 如果未给出，则会使用标准的 [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") 解析器。 返回一个 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 实例。

xml.etree.ElementTree.XMLID(_text_, _parser\=None_)[¶](#xml.etree.ElementTree.XMLID "Link to this definition")

根据一个字符串常量解析 XML 的节，并且还将返回一个将元素的 id:s 映射到元素的字典。 _text_ 是包含 XML 数据的字符串。 _parser_ 是可选的解析器实例。 如果未给出，则会使用标准的 [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") 解析器。 返回一个包含 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 实例和字典的元组。

## XInclude 支持[¶](#xinclude-support "Link to this heading")

此模块通过 [`xml.etree.ElementInclude`](#module-xml.etree.ElementInclude "xml.etree.ElementInclude") 辅助模块提供了对 [XInclude 指令](https://www.w3.org/TR/xinclude/) 的有限支持，这个模块可被用来根据元素树的信息在其中插入子树和文本字符串。

### 示例[¶](#id3 "Link to this heading")

以下是一个演示 XInclude 模块用法的例子。 要在当前文档中包括一个 XML 文档，请使用 `{http://www.w3.org/2001/XInclude}include` 元素并将 **parse** 属性设为 `"xml"`，并使用 **href** 属性来指定要包括的文档。

<?xml version="1.0"?>
<document xmlns:xi="http://www.w3.org/2001/XInclude"\>
  <xi:include href="source.xml" parse="xml" />
</document>

默认情况下，**href** 属性会被当作文件名来处理。 你可以使用自定义加载器来覆盖此行为。 还要注意标准辅助器不支持 XPointer 语法。

要处理此文件，请照常加载它，并将根元素传递给 `xml.etree.ElementTree` 模块:

from xml.etree import ElementTree, ElementInclude

tree \= ElementTree.parse("document.xml")
root \= tree.getroot()

ElementInclude.include(root)

ElementInclude 模块使用来自 **source.xml** 文档的根元素替代 `{http://www.w3.org/2001/XInclude}include` 元素。 结果看起来大概是这样:

<document xmlns:xi="http://www.w3.org/2001/XInclude"\>
  <para>This is a paragraph.</para>
</document>

如果省略了 **parse** 属性，它会取默认的 "xml"。 要求有 href 属性。

要包括文本文档，请使用 `{http://www.w3.org/2001/XInclude}include` 元素，并将 **parse** 属性设为 "text":

<?xml version="1.0"?>
<document xmlns:xi="http://www.w3.org/2001/XInclude"\>
  Copyright (c) <xi:include href="year.txt" parse="text" />.
</document>

结果可能如下所示：

<document xmlns:xi="http://www.w3.org/2001/XInclude"\>
  Copyright (c) 2003.
</document>

## 参考[¶](#id4 "Link to this heading")

### 函数[¶](#elementinclude-functions "Link to this heading")

xml.etree.ElementInclude.default\_loader(_href_, _parse_, _encoding\=None_)[¶](#xml.etree.ElementInclude.default_loader "Link to this definition")

默认的加载器。 这个默认的加载器会从磁盘读取所包括的资源。 _href_ 是一个 URL。 _parse_ 是取值为 "xml" 或 "text" 的解析模式。 _encoding_ 是可选的文本编码格式。 如果未给出，则编码格式为 `utf-8`。 返回已扩展的资源。 如果解析模式为 `"xml"`，则它是一个 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 实例。 如果解析模式为 `"text"`，则它是一个字符串。 如果加载器失败，它可以返回 `None` 或者引发异常。

xml.etree.ElementInclude.include(_elem_, _loader\=None_, _base\_url\=None_, _max\_depth\=6_)[¶](#xml.etree.ElementInclude.include "Link to this definition")

这个函数会在 _elem_ 指向的树上原地扩展 XInclude 指令。 _elem_ 是根 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 或用于查找相应元素的 [`ElementTree`](#xml.etree.ElementTree.ElementTree "xml.etree.ElementTree.ElementTree") 实例。 _loader_ 是可选的资源加载器。 如果省略，则它默认为 [`default_loader()`](#xml.etree.ElementInclude.default_loader "xml.etree.ElementInclude.default_loader")。 如果给出，则它应当是一个实现了与 `default_loader()` 相同接口的可调用对象。 _base\_url_ 是原始文件的基准 URL，用于求解相对的包括文件引用。 _max\_depth_ 是递归包括的最大数量。 此限制是为了减少恶意内容爆破的风险。 传入 `None` 可禁用此限制。

在 3.9 版本发生变更: 增加了 _base\_url_ 和 _max\_depth_ 形参。

### 元素对象[¶](#element-objects "Link to this heading")

_class_ xml.etree.ElementTree.Element(_tag_, _attrib\={}_, _\*\*extra_)[¶](#xml.etree.ElementTree.Element "Link to this definition")

元素类。 这个类定义了 Element 接口，并提供了这个接口的引用实现。

_tag_ is the element name. _attrib_ is an optional dictionary, containing element attributes. _extra_ contains additional attributes, given as keyword arguments.

The element name and the attribute names and values are strings or [`QName`](#xml.etree.ElementTree.QName "xml.etree.ElementTree.QName") instances, and the text and the tail are strings or `None`. The element name can also be [`Comment()`](#xml.etree.ElementTree.Comment "xml.etree.ElementTree.Comment") or [`ProcessingInstruction()`](#xml.etree.ElementTree.ProcessingInstruction "xml.etree.ElementTree.ProcessingInstruction"), which are used for special elements. If it is `None`, the element itself is not serialized: only its text and its children are written, and its attributes are ignored. This can be used for a fragment which contains several elements. With `method="html"` the attribute value can also be `None`, which produces an empty attribute (such as `checked`). Other objects can be stored in the tree, but they cannot be serialized.

tag[¶](#xml.etree.ElementTree.Element.tag "Link to this definition")

一个标识此元素意味着何种数据的字符串(换句话说，元素类型)。

text[¶](#xml.etree.ElementTree.Element.text "Link to this definition")

tail[¶](#xml.etree.ElementTree.Element.tail "Link to this definition")

这些属性可被用于存放与元素相关联的额外数据。 它们的值通常为字符串但也可以是任何应用专属的对象。 如果元素是基于 XML 文件创建的，_text_ 属性会存放元素的开始标记及其第一个子元素或结束标记之间的文本，或者为 `None`，而 _tail_ 属性会存放元素的结束标记及下一个标记之间的文本，或者为 `None`。 对于 XML 数据

<a><b>1<c>2<d/>3</c></b>4</a>

_a_ 元素的 _text_ 和 _tail_ 属性均为 `None`，_b_ 元素的 _text_ 为 `"1"` 而 _tail_ 为 `"4"`，_c_ 元素的 _text_ 为 `"2"` 而 _tail_ 为 `None`，_d_ 元素的 _text_ 为 `None` 而 _tail_ 为 `"3"`。

要获取一个元素的内部文本，请参阅 [`itertext()`](#xml.etree.ElementTree.Element.itertext "xml.etree.ElementTree.Element.itertext")，例如 `"".join(element.itertext())`。

应用程序可以将任意对象存入这些属性。

attrib[¶](#xml.etree.ElementTree.Element.attrib "Link to this definition")

一个包含元素属性的字典。 请注意虽然 _attrib_ 值总是一个真正可变的 Python 字典，但 ElementTree 实现可以选择其他内部表示形式，并只在有需要时才创建字典。 为了发挥这种实现的优势，请在任何可能情况下使用下列字典方法。

以下字典类方法作用于元素属性。

clear()[¶](#xml.etree.ElementTree.Element.clear "Link to this definition")

重设一个元素。 此方法会移除所有子元素，清空所有属性，并将 text 和 tail 属性设为 `None`。

get(_key_, _default\=None_)[¶](#xml.etree.ElementTree.Element.get "Link to this definition")

获取名为 _key_ 的元素属性。

返回属性的值，或者如果属性未找到则返回 _default_。

items()[¶](#xml.etree.ElementTree.Element.items "Link to this definition")

Returns the element attributes as (name, value) pairs.

keys()[¶](#xml.etree.ElementTree.Element.keys "Link to this definition")

Returns the element attribute names.

set(_key_, _value_)[¶](#xml.etree.ElementTree.Element.set "Link to this definition")

将元素的 _key_ 属性设为 _value_。

以下方法作用于元素的下级（子元素）。

append(_subelement_)[¶](#xml.etree.ElementTree.Element.append "Link to this definition")

将元素 _subelement_ 添加到此元素的子元素内部列表。 如果 _subelement_ 不是一个 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 则会引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。

extend(_subelements_)[¶](#xml.etree.ElementTree.Element.extend "Link to this definition")

基于一个包含多个元素的可迭代对象添加 _subelements_。 如果某个子元素不是 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 则会引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。

Added in version 3.2.

find(_match_, _namespaces\=None_)[¶](#xml.etree.ElementTree.Element.find "Link to this definition")

查找第一个匹配 _match_ 的子元素。 _match_ 可以是一个标记名称或者 [路径](#elementtree-xpath)。 返回一个元素实例或 `None`。 _namespaces_ 是可选的从命名空间前缀到完整名称的映射。 传入 `''` 作为前缀可将表达式中所有无前缀的标记名称移动到给定的命名空间。

findall(_match_, _namespaces\=None_)[¶](#xml.etree.ElementTree.Element.findall "Link to this definition")

根据标记名称或者 [路径](#elementtree-xpath) 查找所有匹配的子元素。 返回一个包含所有匹配元素按文档顺序排序的列表。 _namespaces_ 是可选的从命名空间前缀到完整名称的映射。 传入 `''` 作为前缀可将表达式中所有无前缀的标记名称移动到给定的命名空间。

findtext(_match_, _default\=None_, _namespaces\=None_)[¶](#xml.etree.ElementTree.Element.findtext "Link to this definition")

查找第一个匹配 _match_ 的子元素的文本。 _match_ 可以是一个标记名称或者 [路径](#elementtree-xpath)。 返回第一个匹配的元素的文本内容，或者如果元素未找到则返回 _default_。 请注意如果匹配的元素没有文本内容则会返回一个空字符串。 _namespaces_ 是可选的从命名空间前缀到完整名称的映射。 传入 `''` 作为前缀可将表达式中所有无前缀的标记名称移动到给定的命名空间。

insert(_index_, _subelement_)[¶](#xml.etree.ElementTree.Element.insert "Link to this definition")

将 _subelement_ 插入到此元素的给定位置中。 如果 _subelement_ 不是一个 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 则会引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。

iter(_tag\=None_)[¶](#xml.etree.ElementTree.Element.iter "Link to this definition")

创建一个以当前元素为根元素的树的 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator)。 该迭代器将以文档（深度优先）顺序迭代此元素及其所有下级元素。 如果 _tag_ 不为 `None` 或 `'*'`，则迭代器只返回标记为 _tag_ 的元素。 如果树结构在迭代期间被修改，则结果是未定义的。

Added in version 3.2.

iterfind(_match_, _namespaces\=None_)[¶](#xml.etree.ElementTree.Element.iterfind "Link to this definition")

根据标记名称或者 [路径](#elementtree-xpath) 查找所有匹配的子元素。 返回一个按文档顺序产生所有匹配元素的可迭代对象。 _namespaces_ 是可选的从命名空间前缀到完整名称的映射。

Added in version 3.2.

itertext()[¶](#xml.etree.ElementTree.Element.itertext "Link to this definition")

创建一个文本迭代器。 该迭代器将按文档顺序遍历此元素及其所有子元素，并返回所有内部文本。

Added in version 3.2.

makeelement(_tag_, _attrib_)[¶](#xml.etree.ElementTree.Element.makeelement "Link to this definition")

创建一个与此元素类型相同的新元素对象。 请不要调用此方法，而应改用 [`SubElement()`](#xml.etree.ElementTree.SubElement "xml.etree.ElementTree.SubElement") 工厂函数。

remove(_subelement_)[¶](#xml.etree.ElementTree.Element.remove "Link to this definition")

从元素中移除 _subelement_。 与 find\* 方法不同的是此方法会基于实例的标识来比较元素，而不是基于标记的值或内容。

[`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 对象还支持下列序列类型方法以配合子元素使用: [`__delitem__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__delitem__ "object.__delitem__"), [`__getitem__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__getitem__ "object.__getitem__"), [`__setitem__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__setitem__ "object.__setitem__"), [`__len__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__len__ "object.__len__")。

注意：没有子元素的元素测试结果将为 `False`。 在未来的 Python 发布版中，所有元素不论是否存在子元素测试结果都将为 `True`。 建议改用显式的 `len(elem)` 或 `elem is not None` 测试。:

element \= root.find('foo')

if not element:  \# careful!
    print("element not found, or element has no subelements")

if element is None:
    print("element not found")

在 Python 3.8 之前，元素的 XML 属性的序列化顺序会通过按其名称排序来强制使其可被预期。 由于现在字典已保证是有序的，这个强制重排序在 Python 3.8 中已被移除以保留原本由用户代码解析或创建的属性顺序。

通常，用户代码应当尽量不依赖于特定的属性顺序，因为 [XML 信息设定](https://www.w3.org/TR/xml-infoset/) 明确地排除了用属性顺序传递信息的做法。 代码应当准备好处理任何输入顺序。 对于要求确定性的 XML 输出的情况，例如加密签名或测试数据集等，可以通过 [`canonicalize()`](#xml.etree.ElementTree.canonicalize "xml.etree.ElementTree.canonicalize") 函数来进行规范化序列化。

对于规范化输出不可用但仍然要求输出特定属性顺序的情况，代码应当设法直接按要求的顺序来创建属性，以避免代码阅读者产生不匹配的感觉。 如果这一点是难以做到的，可以在序列化之前应用以下写法来强制实现顺序不依赖于元素的创建:

def reorder\_attributes(root):
    for el in root.iter():
        attrib \= el.attrib
        if len(attrib) \> 1:
            \# 调整属性顺序，例如通过排序操作
            attribs \= sorted(attrib.items())
            attrib.clear()
            attrib.update(attribs)

### ElementTree 对象[¶](#elementtree-objects "Link to this heading")

_class_ xml.etree.ElementTree.ElementTree(_element\=None_, _file\=None_)[¶](#xml.etree.ElementTree.ElementTree "Link to this definition")

ElementTree 包装器类。 这个类表示一个完整的元素层级结构，并添加了一些对于标准 XML 序列化的额外支持。

_element_ 是根元素。 如果给出 XML _file_ 则将使用其内容来初始化树结构。

\_setroot(_element_)[¶](#xml.etree.ElementTree.ElementTree._setroot "Link to this definition")

替换该树结构的根元素。 这将丢弃该树结构的当前内容，并将其替换为给定的元素。 请小心使用。 _element_ 是一个元素实例。

find(_match_, _namespaces\=None_)[¶](#xml.etree.ElementTree.ElementTree.find "Link to this definition")

与 [`Element.find()`](#xml.etree.ElementTree.Element.find "xml.etree.ElementTree.Element.find") 类似，从树的根节点开始。

findall(_match_, _namespaces\=None_)[¶](#xml.etree.ElementTree.ElementTree.findall "Link to this definition")

与 [`Element.findall()`](#xml.etree.ElementTree.Element.findall "xml.etree.ElementTree.Element.findall") 类似，从树的根节点开始。

findtext(_match_, _default\=None_, _namespaces\=None_)[¶](#xml.etree.ElementTree.ElementTree.findtext "Link to this definition")

与 [`Element.findtext()`](#xml.etree.ElementTree.Element.findtext "xml.etree.ElementTree.Element.findtext") 类似，从树的根节点开始。

getroot()[¶](#xml.etree.ElementTree.ElementTree.getroot "Link to this definition")

返回这个树的根元素。

iter(_tag\=None_)[¶](#xml.etree.ElementTree.ElementTree.iter "Link to this definition")

创建并返回根元素的树结构迭代器。 该迭代器会以节顺序遍历这个树的所有元素。 _tag_ 是要查找的标记（默认返回所有元素）。

iterfind(_match_, _namespaces\=None_)[¶](#xml.etree.ElementTree.ElementTree.iterfind "Link to this definition")

与 [`Element.iterfind()`](#xml.etree.ElementTree.Element.iterfind "xml.etree.ElementTree.Element.iterfind") 类似，从树的根节点开始。

Added in version 3.2.

parse(_source_, _parser\=None_)[¶](#xml.etree.ElementTree.ElementTree.parse "Link to this definition")

将一个外部 XML 节载入到此元素树。 _source_ 是一个文件名或 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)。 _parser_ 是可选的解析器实例。 如果未给出，则会使用标准的 [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") 解析器。 返回该节的根元素。

write(_file_, _encoding\='us-ascii'_, _xml\_declaration\=None_, _default\_namespace\=None_, _method\='xml'_, _\*_, _short\_empty\_elements\=True_)[¶](#xml.etree.ElementTree.ElementTree.write "Link to this definition")

将元素树以 XML 格式写入到文件。 _file_ 为文件名，或是以写入模式打开的 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)。 _encoding_ [\[1\]](#id9) 为输出编码格式 (默认为 US-ASCII)。 _xml\_declaration_ 控制是否要将 XML 声明添加到文件中。 使用 `False` 表示从不添加，`True` 表示总是添加，`None` 表示仅在非 US-ASCII 或 UTF-8 或 Unicode 时添加 (默认为 `None`)。 _default\_namespace_ 设置默认 XML 命名空间 (用于 "xmlns")。 _method_ 为 `"xml"`, `"html"` 或 `"text"` (默认为 `"xml"`)。 仅限关键字形参 _short\_empty\_elements_ 控制不包含内容的元素的格式。 如为 `True` (默认值)，它们会被输出为单个自结束标记，否则它们会被输出为一对开始/结束标记。

输出是一个字符串 ([`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) 或字节串 ([`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes"))。 由 _encoding_ 参数来控制。 如果 _encoding_ 为 `"unicode"`，则输出是一个字符串；否则为字节串；请注意这可能与 _file_ 的类型相冲突，如果它是一个打开的 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) 的话；请确保你不会试图写入字符串到二进制流或者反向操作。

在 3.4 版本发生变更: 增加了 _short\_empty\_elements_ 形参。

在 3.8 版本发生变更: [`write()`](#xml.etree.ElementTree.ElementTree.write "xml.etree.ElementTree.ElementTree.write") 方法现在会保留用户指定的属性顺序。

这是将要被操作的 XML 文件:

<html\>
    <head\>
        <title\>Example page</title\>
    </head\>
    <body\>
        <p\>Moved to <a href\="http://example.org/"\>example.org</a\>
        or <a href\="http://example.com/"\>example.com</a\>.</p\>
    </body\>
</html\>

修改第一段中的每个链接的 "target" 属性的示例:

\>>> from xml.etree.ElementTree import ElementTree
\>>> tree \= ElementTree()
\>>> tree.parse("index.xhtml")
<Element 'html' at 0xb77e6fac>
\>>> p \= tree.find("body/p")     \# 在 body 中找到首次出现的标签 p
\>>> p
<Element 'p' at 0xb77ec26c>
\>>> links \= list(p.iter("a"))   \# 返回所有链接的列表
\>>> links
\[<Element 'a' at 0xb77ec2ac>, <Element 'a' at 0xb77ec1cc>\]
\>>> for i in links:             \# 迭代所有已找到的链接
...     i.attrib\["target"\] \= "blank"
...
\>>> tree.write("output.xhtml")

### QName 对象[¶](#qname-objects "Link to this heading")

_class_ xml.etree.ElementTree.QName(_text\_or\_uri_, _tag\=None_)[¶](#xml.etree.ElementTree.QName "Link to this definition")

QName 包装器。 这可被用来包装 QName 属性值，以便在输出中获得适当的命名空间处理。 _text\_or\_uri_ 是一个包含 QName 值的字符串，其形式为 {uri}local，或者如果给出了 tag 参数，则为 QName 的 URI 部分。 如果给出了 _tag_，则第一个参数会被解读为 URI，而这个参数会被解读为本地名称。 [`QName`](#xml.etree.ElementTree.QName "xml.etree.ElementTree.QName") 实例是不透明的。

### TreeBuilder 对象[¶](#treebuilder-objects "Link to this heading")

_class_ xml.etree.ElementTree.TreeBuilder(_element\_factory\=None_, _\*_, _comment\_factory\=None_, _pi\_factory\=None_, _insert\_comments\=False_, _insert\_pis\=False_)[¶](#xml.etree.ElementTree.TreeBuilder "Link to this definition")

通用元素结构构建器。 此构建器会将包含 start, data, end, comment 和 pi 方法调用的序列转换为格式良好的元素结构。 你可以通过这个类使用一个自定义 XML 解析器或其他 XML 类格式的解析器来构建元素结构。

如果给出 _element\_factory_，它必须为接受两个位置参数的可调用对象：一个标记和一个属性字典。 它预期会返回一个新的元素实例。

如果给出 _comment\_factory_ 和 _pi\_factory_ 函数，它们的行为应当像 [`Comment()`](#xml.etree.ElementTree.Comment "xml.etree.ElementTree.Comment") 和 [`ProcessingInstruction()`](#xml.etree.ElementTree.ProcessingInstruction "xml.etree.ElementTree.ProcessingInstruction") 函数一样创建注释和处理指令。 如果未给出，则将使用默认工厂函数。 当 _insert\_comments_ 和/或 _insert\_pis_ 为真值时，如果 comments/pis 在根元素之中（但不在其之外）出现则它们将被插入到树中。

close()[¶](#xml.etree.ElementTree.TreeBuilder.close "Link to this definition")

刷新构建器缓存，并返回最高层级的文档元素。 返回一个 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 实例。

data(_data_)[¶](#xml.etree.ElementTree.TreeBuilder.data "Link to this definition")

Adds text to the current element. _data_ is a string.

end(_tag_)[¶](#xml.etree.ElementTree.TreeBuilder.end "Link to this definition")

关闭当前元素。 _tag_ 是元素名称。 返回已关闭的元素。

start(_tag_, _attrs_)[¶](#xml.etree.ElementTree.TreeBuilder.start "Link to this definition")

打开一个新元素。 _tag_ 是元素名称。 _attrs_ 是包含元素属性的字典。 返回打开的元素。

使用给定的 _text_ 创建一条注释。 如果 `insert_comments` 为真值，这还会将其添加到树结构中。

Added in version 3.8.

pi(_target_, _text_)[¶](#xml.etree.ElementTree.TreeBuilder.pi "Link to this definition")

使用给定的 _target_ 名称和 _text_ 创建一条处理指令。 如果 `insert_pis` 为真值，这还会将其添加到树中。

Added in version 3.8.

此外，自定义的 [`TreeBuilder`](#xml.etree.ElementTree.TreeBuilder "xml.etree.ElementTree.TreeBuilder") 对象还提供了以下方法:

doctype(_name_, _pubid_, _system_)[¶](#xml.etree.ElementTree.TreeBuilder.doctype "Link to this definition")

处理一条 doctype 声明。 _name_ 为 doctype 名称。 _pubid_ 为公有标识。 _system_ 为系统标识。 此方法不存在于默认的 [`TreeBuilder`](#xml.etree.ElementTree.TreeBuilder "xml.etree.ElementTree.TreeBuilder") 类中。

Added in version 3.2.

start\_ns(_prefix_, _uri_)[¶](#xml.etree.ElementTree.TreeBuilder.start_ns "Link to this definition")

在定义了 `start()` 回调的打开元素的该回调被调用之前，当解析器遇到新的命名空间声明时都会被调用。 _prefix_ 对于默认命名空间为 `''` 或者在其他情况下为被声明的命名空间前缀名称。 _uri_ 是命名空间 URI。

Added in version 3.8.

end\_ns(_prefix_)[¶](#xml.etree.ElementTree.TreeBuilder.end_ns "Link to this definition")

在声明了命名空间前缀映射的元素的 `end()` 回调之后被调用，附带超出作用域的 _prefix_ 的名称。

Added in version 3.8.

_class_ xml.etree.ElementTree.C14NWriterTarget(_write_, _\*_, _with\_comments\=False_, _strip\_text\=False_, _rewrite\_prefixes\=False_, _qname\_aware\_tags\=None_, _qname\_aware\_attrs\=None_, _exclude\_attrs\=None_, _exclude\_tags\=None_)[¶](#xml.etree.ElementTree.C14NWriterTarget "Link to this definition")

[C14N 2.0](https://www.w3.org/TR/xml-c14n2/) 写入器。 其参数与 [`canonicalize()`](#xml.etree.ElementTree.canonicalize "xml.etree.ElementTree.canonicalize") 函数的相同。 这个类并不会构建树结构而是使用 _write_ 函数将回调事件直接转换为序列化形式。

Added in version 3.8.

### XMLParser对象[¶](#xmlparser-objects "Link to this heading")

_class_ xml.etree.ElementTree.XMLParser(_\*_, _target\=None_, _encoding\=None_)[¶](#xml.etree.ElementTree.XMLParser "Link to this definition")

这个类是此模块的低层级构建单元。 它使用 [`xml.parsers.expat`](https://docs.python.org/zh-cn/3/library/pyexpat.html#module-xml.parsers.expat "xml.parsers.expat: An interface to the Expat non-validating XML parser.") 来实现高效、基于事件的 XML 解析。 它可以通过 [`feed()`](#xml.etree.ElementTree.XMLParser.feed "xml.etree.ElementTree.XMLParser.feed") 方法增量式地接收 XML 数据，并且解析事件会被转换为推送式 API —— 通过在 _target_ 对象上发起对回调的调用。 如果省略 _target_，则会使用标准的 [`TreeBuilder`](#xml.etree.ElementTree.TreeBuilder "xml.etree.ElementTree.TreeBuilder")。 如果给出了 _encoding_ [\[1\]](#id9) ，该值将覆盖在 XML 文件中指定的编码格式。

在 3.8 版本发生变更: 形参现在都是 [仅限关键字形参](https://docs.python.org/zh-cn/3/glossary.html#keyword-only-parameter)。 _html_ 参数不再受支持。

close()[¶](#xml.etree.ElementTree.XMLParser.close "Link to this definition")

结束向解析器提供数据。 返回调用在构造期间传入的 _target_ 的 `close()` 方法的结果；在默认情况下，这是最高层级的文档元素。

feed(_data_)[¶](#xml.etree.ElementTree.XMLParser.feed "Link to this definition")

Feeds data to the parser. _data_ is a string or encoded data ([`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") or a [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object)).

flush()[¶](#xml.etree.ElementTree.XMLParser.flush "Link to this definition")

触发对之前送入的未解析数据的解析，这可被用于确保更为实时的反馈，尤其是对于 Expat >=2.6.0 的情况。 [`flush()`](#xml.etree.ElementTree.XMLParser.flush "xml.etree.ElementTree.XMLParser.flush") 的实现会暂时禁用 Expat 的重新解析延迟（如果当前已启用）并触发重新解析。 禁用重新解析延迟会带来安全性的影响；请参阅 [`xml.parsers.expat.xmlparser.SetReparseDeferralEnabled()`](https://docs.python.org/zh-cn/3/library/pyexpat.html#xml.parsers.expat.xmlparser.SetReparseDeferralEnabled "xml.parsers.expat.xmlparser.SetReparseDeferralEnabled") 了解详情。

请注意 [`flush()`](#xml.etree.ElementTree.XMLParser.flush "xml.etree.ElementTree.XMLParser.flush") 已作为安全修正被向下移植到一些较早的 CPython 发布版。 如果在运行于多个 Python 版本的代码中要用到 `flush()` 请使用 [`hasattr()`](https://docs.python.org/zh-cn/3/builtins/functions.html#hasattr "hasattr") 来检查其可用性。

Added in version 3.13.

[`XMLParser.feed()`](#xml.etree.ElementTree.XMLParser.feed "xml.etree.ElementTree.XMLParser.feed") 会为每个打开的标记调用 _target_ 的 `start(tag, attrs_dict)` 方法，为每个关闭的标记调用它的 `end(tag)` 方法，并通过 `data(data)` 方法来处理数据。 有关更多受支持的回调方法，请参阅 [`TreeBuilder`](#xml.etree.ElementTree.TreeBuilder "xml.etree.ElementTree.TreeBuilder") 类。 [`XMLParser.close()`](#xml.etree.ElementTree.XMLParser.close "xml.etree.ElementTree.XMLParser.close") 会调用 _target_ 的 `close()` 方法。 [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") 不仅仅可被用来构建树结构。 下面是一个统计 XML 文件最大深度的示例:

\>>> from xml.etree.ElementTree import XMLParser
\>>> class MaxDepth:                     \# 解析器的目标对象
...     maxDepth \= 0
...     depth \= 0
...     def start(self, tag, attrib):   \# 针对每个开启标签执行调用。
...         self.depth += 1
...         if self.depth \> self.maxDepth:
...             self.maxDepth \= self.depth
...     def end(self, tag):             \# 针对每个关闭标签执行调用。
...         self.depth \-= 1
...     def data(self, data):
...         pass            \# 我们不需要对 data 做任何操作。
...     def close(self):    \# 当所有数据都已被解析时执行调用。
...         return self.maxDepth
...
\>>> target \= MaxDepth()
\>>> parser \= XMLParser(target\=target)
\>>> exampleXml \= """
... <a>
...   <b>
...   </b>
...   <b>
...     <c>
...       <d>
...       </d>
...     </c>
...   </b>
... </a>"""
\>>> parser.feed(exampleXml)
\>>> parser.close()
4

### XMLPullParser对象[¶](#xmlpullparser-objects "Link to this heading")

_class_ xml.etree.ElementTree.XMLPullParser(_events\=None_)[¶](#xml.etree.ElementTree.XMLPullParser "Link to this definition")

适用于非阻塞应用程序的拉取式解析器。 它的输入侧 API 与 [`XMLParser`](#xml.etree.ElementTree.XMLParser "xml.etree.ElementTree.XMLParser") 的类似，但不是向回调目标推送调用，[`XMLPullParser`](#xml.etree.ElementTree.XMLPullParser "xml.etree.ElementTree.XMLPullParser") 会收集一个解析事件的内部列表并让用户来读取它。 _events_ 是要报告的事件序列。 受支持的事件字符串有 `"start"`, `"end"`, `"comment"`, `"pi"`, `"start-ns"` 和 `"end-ns"` ("ns" 事件被用于获取详细的命名空间信息)。 如果 _events_ 被省略，则只报告 `"end"` 事件。

feed(_data_)[¶](#xml.etree.ElementTree.XMLPullParser.feed "Link to this definition")

Feed the given data to the parser. _data_ is a string or encoded data ([`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") or a [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object)).

flush()[¶](#xml.etree.ElementTree.XMLPullParser.flush "Link to this definition")

触发对之前送入的未解析数据的解析，这可被用于确保更为实时的反馈，尤其是对于 Expat >=2.6.0 的情况。 [`flush()`](#xml.etree.ElementTree.XMLPullParser.flush "xml.etree.ElementTree.XMLPullParser.flush") 的实现会暂时禁用 Expat 的重新解析延迟（如果当前已启用）并触发重新解析。 禁用重新解析延迟会带来安全性的影响；请参阅 [`xml.parsers.expat.xmlparser.SetReparseDeferralEnabled()`](https://docs.python.org/zh-cn/3/library/pyexpat.html#xml.parsers.expat.xmlparser.SetReparseDeferralEnabled "xml.parsers.expat.xmlparser.SetReparseDeferralEnabled") 了解详情。

请注意 [`flush()`](#xml.etree.ElementTree.XMLPullParser.flush "xml.etree.ElementTree.XMLPullParser.flush") 已作为安全修正被向下移植到一些较早的 CPython 发布版。 如果在运行于多个 Python 版本的代码中要用到 `flush()` 请使用 [`hasattr()`](https://docs.python.org/zh-cn/3/builtins/functions.html#hasattr "hasattr") 来检查其可用性。

Added in version 3.13.

close()[¶](#xml.etree.ElementTree.XMLPullParser.close "Link to this definition")

通知解析器数据流已终结。 不同于 [`XMLParser.close()`](#xml.etree.ElementTree.XMLParser.close "xml.etree.ElementTree.XMLParser.close")，此方法总是返回 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")。 当解析器被关闭时任何还未被获取的事件仍可通过 [`read_events()`](#xml.etree.ElementTree.XMLPullParser.read_events "xml.etree.ElementTree.XMLPullParser.read_events") 被读取。

read\_events()[¶](#xml.etree.ElementTree.XMLPullParser.read_events "Link to this definition")

返回包含在送入解析器的数据中遇到的事件的迭代器。 此迭代器会产生 `(event, elem)` 对，其中 _event_ 是代表事件类型的字符串 (例如 `"end"`) 而 _elem_ 是遇到的 [`Element`](#xml.etree.ElementTree.Element "xml.etree.ElementTree.Element") 对象，或者以下的其他上下文值。

-   `start`, `end`: 当前元素。
    
-   `comment`, `pi`: 当前注释 / 处理指令
    
-   `start-ns`: 一个指定所声明命名空间映射的元组 `(prefix, uri)`。
    
-   `end-ns`: [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None") (这可能在未来版本中改变)
    

在之前对 [`read_events()`](#xml.etree.ElementTree.XMLPullParser.read_events "xml.etree.ElementTree.XMLPullParser.read_events") 的调用中提供的事件将不会被再次产生。 事件仅当它们从迭代器中被取出时才会在内部队列中被消费，因此多个读取方对获取自 `read_events()` 的迭代器进行平行迭代将产生无法预料的结果。

备注

[`XMLPullParser`](#xml.etree.ElementTree.XMLPullParser "xml.etree.ElementTree.XMLPullParser") 只会确保当发出 "start" 事件时看到了开始标记的 ">" 字符，因而在这个点上属性已被定义，但文本内容和末尾属性还未被定义。 这同样适用于元素的下级；它们可能存在也可能不存在。

如果你需要已完全填充的元素，请改为查找 "end" 事件。

Added in version 3.4.

在 3.8 版本发生变更: 增加了 `comment` 和 `pi` 事件。

### 异常[¶](#exceptions "Link to this heading")

_class_ xml.etree.ElementTree.ParseError[¶](#xml.etree.ElementTree.ParseError "Link to this definition")

XML 解析器错误，由此模块中的多个解析方法在解析失败时引发。 此异常的实例的字符串表示将包含用户友好的错误消息。 此外，它将具有下列可用属性:

code[¶](#xml.etree.ElementTree.ParseError.code "Link to this definition")

来自 expat 解析器的数字错误代码。 请参阅 [`xml.parsers.expat`](https://docs.python.org/zh-cn/3/library/pyexpat.html#module-xml.parsers.expat "xml.parsers.expat: An interface to the Expat non-validating XML parser.") 的文档查看错误代码列表及它们的含义。

position[¶](#xml.etree.ElementTree.ParseError.position "Link to this definition")

一个包含 _line_, _column_ 数值的元组，指明错误发生的位置。

备注
