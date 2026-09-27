一个简单的模板系统, 将模板编译成Python代码.

基本用法如下:

t \= template.Template("<html>{{ myvalue }}</html>")
print t.generate(myvalue\="XXX")

[`Loader`](#tornado.template.Loader "tornado.template.Loader") 是一个从根目录加载模板并缓存编译过的模板的类:

loader \= template.Loader("/home/btaylor")
print loader.load("test.html").generate(myvalue\="XXX")

我们编译所有模板至原生的Python. 错误报告是目前... uh, 很有趣. 模板语法如下:

\### base.html
<html\>
  <head\>
    <title\>{% block title %}Default title{% end %}</title\>
  </head\>
  <body\>
    <ul\>
      {% for student in students %}
        {% block student %}
          <li\>{{ escape(student.name) }}</li\>
        {% end %}
      {% end %}
    </ul\>
  </body\>
</html\>

\### bold.html
{% extends "base.html" %}

{% block title %}A bolder title{% end %}

{% block student %}
  <li\><span style\="bold"\>{{ escape(student.name) }}</span\></li\>
{% end %}

与大多数其他模板系统不同, 我们没有在你的语句中可包含的表达式上放置任何约束. `if` 和 `for` 语句块完全翻译成了Python, 所以你可以写复杂的表达式例如:

{% for student in \[p for p in people if p.student and p.age \> 23\] %}
  <li\>{{ escape(student.name) }}</li\>
{% end %}

直接翻译成Python意味着你可以很简单的在表达式中使用函数, 就像在上面例子中的 `escape()` 函数. 你可以把函数传递到你的模板中就像其他任何变量一样(在一个 [`RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") 中, 复写 [`RequestHandler.get_template_namespace`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.get_template_namespace "tornado.web.RequestHandler.get_template_namespace")):

\### Python code
def add(x, y):
   return x + y
template.execute(add\=add)

\### The template
{{ add(1, 2) }}

默认情况下我们提供了 [`escape()`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.xhtml_escape "tornado.escape.xhtml_escape"), [`url_escape()`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.url_escape "tornado.escape.url_escape"), [`json_encode()`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.json_encode "tornado.escape.json_encode"), 和 [`squeeze()`](https://tornado-zh.readthedocs.io/zh/latest/escape.html#tornado.escape.squeeze "tornado.escape.squeeze") 函数给所有模板.

典型的应用程序不会手动创建 [`Template`](#tornado.template.Template "tornado.template.Template") 或 [`Loader`](#tornado.template.Loader "tornado.template.Loader") 实例, 而是使用 [`tornado.web.RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") 中的 [`render`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.render "tornado.web.RequestHandler.render") 和 [`render_string`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.render_string "tornado.web.RequestHandler.render_string") 方法, 这些方法自动的基于 `template_path` [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") 设置加载模板.

以 `_tt_` 为前缀命名的变量是模板系统保留的, 不应该被应用程序的 代码使用.

## 语法参考[¶](#id1 "永久链接至标题")

模板表达式被双花括号包围: `{{ ... }}`. 内容可以是任何python表达式, 会根据当前自动转义(autoescape)设置被转义并且插入到输出. 其他模板指令 使用 `{% %}`. 这些标签可以被转义作为 `{{!` 和 `{%!` 如果你需要 在输出中包含一个原义的 `{{` 或 `{%` .

为了注释掉一段让它从输出中省略, 使用 `{# ... #}` 包住它.

`{% apply *function* %}...{% end %}`

在 `apply` 和 `end` 之间应用一个函数到所有模板代码的输出:

{% apply linkify %}{{name}} said: {{message}}{% end %}

注意作为一个实现细节使用块会执行嵌套函数, 因此可能产生奇怪的 相互作用, 包括通过 `{% set %}` 设置的变量, 或者在循环中使用 `{% break %}` 或 `{% continue %}` .

`{% autoescape *function* %}`

为当前文件设置自动转义(autoescape)模式. 这不会影响其他文件, 即使 是那些通过 `{% include %}` 引用的文件. 注意自动转义也可以全局 设置, 在 [`Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") 或 [`Loader`](#tornado.template.Loader "tornado.template.Loader") 中.:

{% autoescape xhtml\_escape %}
{% autoescape None %}

`{% block *name* %}...{% end %}`

标明了一个已命名的, 可以使用 `{% extends %}` 被替换的块. 在父模板中的块将会被子模板中同名块的内容替换.:

<!-- base.html -->
<title>{% block title %}Default title{% end %}</title>

<!-- mypage.html -->
{% extends "base.html" %}
{% block title %}My page title{% end %}

`{% comment ... %}`

一个将会从模板的输出中移除的注释. 注意这里没有 `{% end %}` 标签; 该注释从 `comment` 这个词开始到 `%}` 标签关闭.

`{% extends *filename* %}`

从另一个模板继承. 使用 `extends` 的模板应该包含一个或多个 `block` 标签以替换父模板中的内容. 子模板内任何不包含在一个 `block` 标签中的内容都将被忽略. 例如, 参见 `{% block %}` 标签.

`{% for *var* in *expr* %}...{% end %}`

和python的 `for` 语句一样. `{% break %}` 和 `{% continue %}` 可以用在循环里.

`{% from *x* import *y* %}`

和python的 `import` 语句一样.

`{% if *condition* %}...{% elif *condition* %}...{% else %}...{% end %}`

条件语句 - 输出第一个条件为true 的部分. ( `elif` 和 `else` 部分是 可选的)

`{% import *module* %}`

和python的 `import` 语句一样.

`{% include *filename* %}`

包含另一个模板文件. 被包含的文件可以看到所有局部变量就像它被直接 复制到了该 `include` 指令的位置( `{% autoescape %}` 指令是一 个异常). 替代的, `{% module Template(filename, **kwargs) %}` 可能被用来包含另外的有独立命名空间的模板.

`{% module *expr* %}`

渲染一个 [`UIModule`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.UIModule "tornado.web.UIModule"). 该 `UIModule` 的输出没有 转义:

{% module Template("foo.html", arg\=42) %}

`UIModules` 是 [`tornado.web.RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") 类(尤其是它的 `render` 方法)的一个方法, 并且当模板系统在其他上下文中使用 时, 它将不工作.

`{% raw *expr* %}`

输出给定表达式的结果并且不会转义.

`{% set *x* = *y* %}`

设置一个局部变量.

`{% try %}...{% except %}...{% else %}...{% finally %}...{% end %}`

和python的 `try` 语句一样.

`{% while *condition* %}... {% end %}`

和python的 `while` 语句一样. `{% break %}` 和 `{% continue %}` 可以用在循环里.

`{% whitespace *mode* %}`

为当前文件的剩余部分设置空白模式(whitespace mode) (或直到下一个 `{% whitespace %}` 指令). 参见 [`filter_whitespace`](#tornado.template.filter_whitespace "tornado.template.filter_whitespace") 查看可用参数. Tornado 4.3中新增.

## Class reference[¶](#class-reference "永久链接至标题")

_class_ `tornado.template.``Template`(_template\_string_, _name="<string>"_, _loader=None_, _compress\_whitespace=None_, _autoescape="xhtml\_escape"_, _whitespace=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/template.html#Template)[¶](#tornado.template.Template "永久链接至目标")

编译模板.

我们从给定的template\_string编译到Python. 你可以使用generate() 用变量生成模板.

构造一个模板.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>template_string</strong> (<a href="https://docs.python.org/3.4/library/stdtypes.html#str" title="(在 Python v3.4)"><em>str</em></a>) – 模板文件的内容.</li><li><strong>name</strong> (<a href="https://docs.python.org/3.4/library/stdtypes.html#str" title="(在 Python v3.4)"><em>str</em></a>) – 被加载的模板文件名(用于错误信息).</li><li><strong>loader</strong> (<a href="#tornado.template.BaseLoader" title="tornado.template.BaseLoader"><em>tornado.template.BaseLoader</em></a>) – <a href="#tornado.template.BaseLoader" title="tornado.template.BaseLoader"><code><span>BaseLoader</span></code></a> 负责该模板, 用于解决 <code><span>{%</span> <span>include</span> <span>%}</span></code> 和 <code><span>{%</span> <span>extend</span> <span>%}</span></code> 指令.</li><li><strong>compress_whitespace</strong> (<a href="https://docs.python.org/3.4/library/functions.html#bool" title="(在 Python v3.4)"><em>bool</em></a>) – 自从Tornado 4.3过时了. 如果为true, 相当于 <code><span>whitespace="single"</span></code> , 如果为false, 相当于 <code><span>whitespace="all"</span></code> .</li><li><strong>autoescape</strong> (<a href="https://docs.python.org/3.4/library/stdtypes.html#str" title="(在 Python v3.4)"><em>str</em></a>) – 在模板命名空间中的函数名, 默认情况下为 <code><span>None</span></code> 以禁用转义.</li><li><strong>whitespace</strong> (<a href="https://docs.python.org/3.4/library/stdtypes.html#str" title="(在 Python v3.4)"><em>str</em></a>) – 一个指定处理whitespace 的字符串; 参见 <a href="#tornado.template.filter_whitespace" title="tornado.template.filter_whitespace"><code><span>filter_whitespace</span></code></a> 了解可选项.</li></ul></td></tr></tbody></table>

在 4.3 版更改: 增加 `whitespace` 参数; 弃用 `compress_whitespace`.

`generate`(_\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/template.html#Template.generate)[¶](#tornado.template.Template.generate "永久链接至目标")

用给定参数生成此模板.

_class_ `tornado.template.``BaseLoader`(_autoescape='xhtml\_escape'_, _namespace=None_, _whitespace=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/template.html#BaseLoader)[¶](#tornado.template.BaseLoader "永久链接至目标")

模板加载器的基类.

你必须使用一个模板加载器来使用模板的构造器例如 `{% extends %}` 和 `{% include %}`. 加载器在所有模板首次加载之后进行缓存.

构造一个模板加载器.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>autoescape</strong> (<a href="https://docs.python.org/3.4/library/stdtypes.html#str" title="(在 Python v3.4)"><em>str</em></a>) – 在模板命名空间中的函数名, 例如 “xhtml_escape”, 或默认情况下为 <code><span>None</span></code> 来禁用自动转义.</li><li><strong>namespace</strong> (<a href="https://docs.python.org/3.4/library/stdtypes.html#dict" title="(在 Python v3.4)"><em>dict</em></a>) – 一个被加入默认模板命名空间中的字典或 <code><span>None</span></code>.</li><li><strong>whitespace</strong> (<a href="https://docs.python.org/3.4/library/stdtypes.html#str" title="(在 Python v3.4)"><em>str</em></a>) – 一个指定模板中whitespace默认行为的字符串; 参见 <a href="#tornado.template.filter_whitespace" title="tornado.template.filter_whitespace"><code><span>filter_whitespace</span></code></a> 查看可选项. 默认是 “single” 对于 ”.html” 和 ”.js” 文件的结束, “all” 是为了其他文件.</li></ul></td></tr></tbody></table>

在 4.3 版更改: 添加 `whitespace` 参数.

`reset`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/template.html#BaseLoader.reset)[¶](#tornado.template.BaseLoader.reset "永久链接至目标")

重置已编译模板的缓存.

`resolve_path`(_name_, _parent\_path=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/template.html#BaseLoader.resolve_path)[¶](#tornado.template.BaseLoader.resolve_path "永久链接至目标")

转化一个可能相对的路径为绝对路径(内部使用).

`load`(_name_, _parent\_path=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/template.html#BaseLoader.load)[¶](#tornado.template.BaseLoader.load "永久链接至目标")

加载一个模板.

_class_ `tornado.template.``Loader`(_root\_directory_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/template.html#Loader)[¶](#tornado.template.Loader "永久链接至目标")

一个从单一根文件夹加载的模板加载器.

_class_ `tornado.template.``DictLoader`(_dict_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/template.html#DictLoader)[¶](#tornado.template.DictLoader "永久链接至目标")

一个从字典加载的模板加载器.

_exception_ `tornado.template.``ParseError`(_message_, _filename_, _lineno_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/template.html#ParseError)[¶](#tornado.template.ParseError "永久链接至目标")

抛出模板的语法错误.

`ParseError` 实例有 `filename` 和 `lineno` 属性指出错误所在位置.

在 4.3 版更改: 添加 `filename` 和 `lineno` 属性.

`tornado.template.``filter_whitespace`(_mode_, _text_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/template.html#filter_whitespace)[¶](#tornado.template.filter_whitespace "永久链接至目标")

根据 `mode` 转换空白到 `text` .

可用的模式有:

-   `all`: 返回所有未更改的空白.
-   `single`: 压缩连串的空白用一个空白字符代替, 保留换行符.
-   `oneline`: 压缩所有空白到一个空格字符, 在这个过程中移除所有换行符.

4.3 新版功能.
