**源码：** [Lib/html/\_\_init\_\_.py](https://github.com/python/cpython/tree/3.14/Lib/html/__init__.py)

* * *

该模块定义了操作 HTML 的工具。

html.escape(_s_, _quote\=True_)[¶](#html.escape "Link to this definition")

将字符串 _s_ 中的字符 `&`、`<` 和 `>` 转换为 HTML 安全序列。当需要在 HTML 中显示可能包含此类字符的文本时，应使用此方法。如果可选参数 _quote_ 为真值（默认），则字符 (`"`) 和 (`'`) 也会被转义，这有助于将其包含在用引号分隔的 HTML 属性值中，例如 `<a href="...">`。如果 _quote_ 设为假值，则字符 (`"`) 和 (`'`) 不会被转义。

Added in version 3.2.

html.unescape(_s_)[¶](#html.unescape "Link to this definition")

将字符串 _s_ 中的所有命名和数字字符引用 (例如 `&gt;`、`&#62;`、`&#x3e;`) 转换为相应的 Unicode 字符。 此函数使用 HTML 5 标准为有效和无效字符引用定义的规则，以及 [`HTML 5 命名字符引用列表`](https://docs.python.org/zh-cn/3/library/html.entities.html#html.entities.html5 "html.entities.html5")。

Added in version 3.4.

* * *

`html` 包中的子模块是：

-   [`html.parser`](https://docs.python.org/zh-cn/3/library/html.parser.html#module-html.parser "html.parser: A simple parser that can handle HTML and XHTML.") —— 具有宽松解析模式的 HTML/XHTML 解析器
    
-   [`html.entities`](https://docs.python.org/zh-cn/3/library/html.entities.html#module-html.entities "html.entities: Definitions of HTML general entities.") —— HTML 实体定义
