**源代码：** [Lib/html/parser.py](https://github.com/python/cpython/tree/3.14/Lib/html/parser.py)

* * *

这个模块定义了一个 [`HTMLParser`](#html.parser.HTMLParser "html.parser.HTMLParser") 类，为 HTML（超文本标记语言）和 XHTML 文本文件解析提供基础。

_class_ html.parser.HTMLParser(_\*_, _convert\_charrefs\=True_, _scripting\=False_)[¶](#html.parser.HTMLParser "Link to this definition")

创建一个能解析无效标记的解析器实例。

如果 _convert\_charrefs_ 为真值（默认），则所有字符引用（除了元素如 `script` 和 `style` 中的字符引用）都会自动转换为对应的 Unicode 字符。

如果 _scripting_ 为假值（默认），则 `noscript` 元素中的内容将被正常解析；如果为真值，它将不加解析地原样返回。

一个 [`HTMLParser`](#html.parser.HTMLParser "html.parser.HTMLParser") 类的实例用来接受 HTML 数据，并在标记开始、标记结束、文本、注释和其他元素标记出现的时候调用对应的方法。要实现具体的行为，请使用 `HTMLParser` 的子类并重写其方法。

这个解析器不检查结束标记是否与开始标记匹配，也不会因外层元素完毕而隐式关闭了的元素引发结束标记处理。

在 3.4 版本发生变更: _convert\_charrefs_ 关键字参数被添加。

在 3.5 版本发生变更: _convert\_charrefs_ 参数的默认值现在为 `True`。

在 3.14.1 版本发生变更: 增加了 _scripting_ 形参。

## HTML 解析器的示例程序[¶](#example-html-parser-application "Link to this heading")

下面的基本示例是一个简单的 HTML 解析器，它使用 [`HTMLParser`](#html.parser.HTMLParser "html.parser.HTMLParser") 类，会在遇到开始标记、结束标记和数据时将它们打印出来：

from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def handle\_starttag(self, tag, attrs):
        print("Encountered a start tag:", tag)

    def handle\_endtag(self, tag):
        print("Encountered an end tag :", tag)

    def handle\_data(self, data):
        print("Encountered some data  :", data)

parser \= MyHTMLParser()
parser.feed('<html><head><title>Test</title></head>'
            '<body><h1>Parse me!</h1></body></html>')

输出是：

Encountered a start tag: html
Encountered a start tag: head
Encountered a start tag: title
Encountered some data  : Test
Encountered an end tag : title
Encountered an end tag : head
Encountered a start tag: body
Encountered a start tag: h1
Encountered some data  : Parse me!
Encountered an end tag : h1
Encountered an end tag : body
Encountered an end tag : html

## [`HTMLParser`](#html.parser.HTMLParser "html.parser.HTMLParser") 方法[¶](#htmlparser-methods "Link to this heading")

[`HTMLParser`](#html.parser.HTMLParser "html.parser.HTMLParser") 实例有下列方法：

HTMLParser.feed(_data_)[¶](#html.parser.HTMLParser.feed "Link to this definition")

填充一些文本到解析器中。如果包含完整的元素，则被处理；如果数据不完整，将被缓冲直到更多的数据被填充，或者 [`close()`](#html.parser.HTMLParser.close "html.parser.HTMLParser.close") 被调用。_data_ 必须为 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 类型。

HTMLParser.close()[¶](#html.parser.HTMLParser.close "Link to this definition")

如同后面跟着一个文件结束标记一样，强制处理所有缓冲数据。这个方法能被派生类重新定义，用于在输入的末尾定义附加处理，但是重定义的版本应当始终调用基类 [`HTMLParser`](#html.parser.HTMLParser "html.parser.HTMLParser") 的 [`close()`](#html.parser.HTMLParser.close "html.parser.HTMLParser.close") 方法。

HTMLParser.reset()[¶](#html.parser.HTMLParser.reset "Link to this definition")

重置实例。丢失所有未处理的数据。在实例化阶段被隐式调用。

HTMLParser.getpos()[¶](#html.parser.HTMLParser.getpos "Link to this definition")

返回当前行号和偏移值。

HTMLParser.get\_starttag\_text()[¶](#html.parser.HTMLParser.get_starttag_text "Link to this definition")

返回最近打开的开始标记中的文本。结构化处理时通常应该不需要这个，但在处理“已部署”的 HTML 或是在以最小改变来重新生成输入时可能会有用处（例如可以保留属性间的空格等）。

下列方法将在遇到数据或者标记元素的时候被调用。它们需要在子类中重写。基类的实现中没有任何实际操作（除了 [`handle_startendtag()`](#html.parser.HTMLParser.handle_startendtag "html.parser.HTMLParser.handle_startendtag") ):

HTMLParser.handle\_starttag(_tag_, _attrs_)[¶](#html.parser.HTMLParser.handle_starttag "Link to this definition")

调用此方法来处理一个元素的开始标记 (例如 `<div id="main">`)。

The _tag_ argument is the name of the tag converted to lower case. The _attrs_ argument is a list of `(name, value)` pairs containing the attributes found inside the tag's `<>` brackets. The _name_ will be translated to lower case, and quotes in the _value_ have been removed, and character and entity references have been replaced. For empty attributes, _value_ is `None`.

例如，对于标签 `<A HREF="https://www.cwi.nl/">`，这个方法将以下列形式被调用 `handle_starttag('a', [('href', 'https://www.cwi.nl/')])`.

[`html.entities`](https://docs.python.org/zh-cn/3/library/html.entities.html#module-html.entities "html.entities: Definitions of HTML general entities.") 中的所有实体引用，会在属性值中被替换。

HTMLParser.handle\_endtag(_tag_)[¶](#html.parser.HTMLParser.handle_endtag "Link to this definition")

此方法被用来处理元素的结束标记 (例如 `</div>`)。

_tag_ 参数是小写的标签名。

HTMLParser.handle\_startendtag(_tag_, _attrs_)[¶](#html.parser.HTMLParser.handle_startendtag "Link to this definition")

类似于 [`handle_starttag()`](#html.parser.HTMLParser.handle_starttag "html.parser.HTMLParser.handle_starttag"), 只是在解析器遇到 XHTML 样式的空标记时被调用 (`<img ... />`)。这个方法能被需要这种特殊词法信息的子类重写；默认实现仅简单调用 `handle_starttag()` 和 [`handle_endtag()`](#html.parser.HTMLParser.handle_endtag "html.parser.HTMLParser.handle_endtag")。

HTMLParser.handle\_data(_data_)[¶](#html.parser.HTMLParser.handle_data "Link to this definition")

调用此方法来处理任意数据（例如文本节点和元素如 `script` 和 `style` 中的内容）。

HTMLParser.handle\_entityref(_name_)[¶](#html.parser.HTMLParser.handle_entityref "Link to this definition")

调用此方法来处理 `&name;` 形式的命名字符引用 (例如 `&gt;`)，其中 _name_ 是通用的实体引用 (例如 `'gt'`)。此方法仅在 _convert\_charrefs_ 为假值时会被调用。

HTMLParser.handle\_charref(_name_)[¶](#html.parser.HTMLParser.handle_charref "Link to this definition")

调用此方法来处理 `&#_NNN_;` 和 `&#x_NNN_;` 形式的十进制和十六进制数字字符引用。例如，`&gt;` 的等价十进制形式为 `&#62;`，而十六进制形式为 `&#x3E;`；在此情况下该方法将收到 `'62'` 或 `'x3E'`。 此方法仅在 _convert\_charrefs_ 为假值时会被调用。

HTMLParser.handle\_comment(_data_)[¶](#html.parser.HTMLParser.handle_comment "Link to this definition")

这个方法在遇到注释的时候被调用 (例如 `<!--comment-->`)。

例如，`<!-- comment -->` 这个注释会用 `' comment '` 作为参数调用此方法。

Internet Explorer 条件注释（condcoms）的内容也被发送到这个方法，因此，对于 `<!--[if IE 9]>IE9-specific content<![endif]-->`，这个方法将接收到 `'[if IE 9]>IE9-specific content<![endif]'`.

HTMLParser.handle\_decl(_decl_)[¶](#html.parser.HTMLParser.handle_decl "Link to this definition")

这个方法用来处理 HTML doctype 声明 (例如 `<!DOCTYPE html>`)。

_decl_ 形参为 `<!...>` 标记中的所有内容 (例如 `'DOCTYPE html'`)。

HTMLParser.handle\_pi(_data_)[¶](#html.parser.HTMLParser.handle_pi "Link to this definition")

此方法在遇到处理指令的时候被调用。_data_ 形参将包含整个处理指令。例如，对于处理指令 `<?proc color='red'>` ，这个方法将以 `handle_pi("proc color='red'")` 形式被调用。它旨在被派生类重写；基类实现中无任何实际操作。

备注

[`HTMLParser`](#html.parser.HTMLParser "html.parser.HTMLParser") 类使用 SGML 语法规则处理指令。使用 `'?'` 结尾的 XHTML 处理指令将导致 `'?'` 包含在 _data_ 中。

HTMLParser.unknown\_decl(_data_)[¶](#html.parser.HTMLParser.unknown_decl "Link to this definition")

当解析器读到无法识别的声明时，此方法被调用。

_data_ 形参为 `<![...]>` 标记中的所有内容。某些时候对派生类的重写很有用。基类实现中无任何实际操作。

## 例子[¶](#examples "Link to this heading")

下面的类实现了一个解析器，它将被用来演示更多的例子：

from html.parser import HTMLParser
from html.entities import name2codepoint

class MyHTMLParser(HTMLParser):
    def handle\_starttag(self, tag, attrs):
        print("Start tag:", tag)
        for attr in attrs:
            print("     attr:", attr)

    def handle\_endtag(self, tag):
        print("End tag  :", tag)

    def handle\_data(self, data):
        print("Data     :", data)

    def handle\_comment(self, data):
        print("Comment  :", data)

    def handle\_entityref(self, name):
        c \= chr(name2codepoint\[name\])
        print("Named ent:", c)

    def handle\_charref(self, name):
        if name.startswith('x'):
            c \= chr(int(name\[1:\], 16))
        else:
            c \= chr(int(name))
        print("Num ent  :", c)

    def handle\_decl(self, data):
        print("Decl     :", data)

parser \= MyHTMLParser()

解析一个 doctype:

\>>> parser.feed('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" '
...             '"http://www.w3.org/TR/html4/strict.dtd">')
Decl     : DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"

解析一个带有某些属性和标题的元素：

\>>> parser.feed('<img src="https://docs.python.org/zh-cn/3/library/python-logo.png" alt="The Python logo">')
Start tag: img
     attr: ('src', 'python-logo.png')
     attr: ('alt', 'The Python logo')
\>>>
\>>> parser.feed('<h1>Python</h1>')
Start tag: h1
Data     : Python
End tag  : h1

元素如 `script` 和 `style` 的内容将原样返回，而不会被进一步地解析：

\>>> parser.feed('<style type="text/css">#python { color: green }</style>')
Start tag: style
     attr: ('type', 'text/css')
Data     : #python { color: green }
End tag  : style

\>>> parser.feed('<script type="text/javascript">'
...             'alert("<strong>hello! &#9786;</strong>");</script>')
Start tag: script
     attr: ('type', 'text/javascript')
Data     : alert("<strong>hello! &#9786;</strong>");
End tag  : script

Attribute names are converted to lowercase, quotes from attribute values removed, and `None` is returned as _value_ for empty attributes (such as `checked`):

\>>> parser.feed("<input TYPE='checkbox' checked required='' disabled=disabled>")
Start tag: input
     attr: ('type', 'checkbox')
     attr: ('checked', None)
     attr: ('required', '')
     attr: ('disabled', 'disabled')

解析注释：

\>>> parser.feed('<!--a comment-->'
...             '<!--\[if IE 9\]>IE-specific content<!\[endif\]-->')
Comment  : a comment
Comment  : \[if IE 9\]>IE-specific content<!\[endif\]

解析命名或数字形式的字符引用并将它们转换为正确的字符 (注意：这 3 个引用都等价于 `'>'`)：

\>>> parser \= MyHTMLParser()
\>>> parser.feed('&gt;&#62;&#x3E;')
Data     : >>>

\>>> parser \= MyHTMLParser(convert\_charrefs\=False)
\>>> parser.feed('&gt;&#62;&#x3E;')
Named ent: >
Num ent  : >
Num ent  : >

可以将不完整的块喂给 [`feed()`](#html.parser.HTMLParser.feed "html.parser.HTMLParser.feed")，但如果 _convert\_charrefs_ 为假值则 [`handle_data()`](#html.parser.HTMLParser.handle_data "html.parser.HTMLParser.handle_data") 可能会被多次调用：

\>>> for chunk in \['<sp', 'an>buff', 'ered', ' text</s', 'pan>'\]:
...     parser.feed(chunk)
...
Start tag: span
Data     : buff
Data     : ered
Data     :  text
End tag  : span

解析无效的 HTML (例如有未带引号的属性) 也是可以的：

\>>> parser.feed('<p><a class=link href=#main>tag soup</p ></a>')
Start tag: p
Start tag: a
     attr: ('class', 'link')
     attr: ('href', '#main')
Data     : tag soup
End tag  : p
End tag  : a
