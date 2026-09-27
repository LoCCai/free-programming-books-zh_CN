**源代码：** [Lib/string/templatelib.py](https://github.com/python/cpython/tree/3.14/Lib/string/templatelib.py)

* * *

参见

-   [格式化字符串](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#f-strings)
    
-   [模板字符串字面值（t-字符串）语法](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#t-strings)
    
-   [**PEP 750**](https://peps.python.org/pep-0750/)
    

## 模板字符串[¶](#template-strings "Link to this heading")

Added in version 3.14.

模板字符串是一种用于自定义字符串处理的机制。它们具有 Python 的 [f-字符串](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#f-strings) 的全部灵活性，但返回一个 [`Template`](#string.templatelib.Template "string.templatelib.Template") 实例，它提供在将静态部分和（以花括号标记的）插值部分组合起来 _之前_ 对它们的访问。

要编写 t-字符串，使用 `'t'` 前缀而不是 `'f'`，如下所示：

\>>> pi \= 3.14
\>>> t't-strings are new in Python {pi!s}!'
Template(
   strings=('t-strings are new in Python ', '!'),
   interpolations=(Interpolation(3.14, 'pi', 's', ''),)
)

## 类型[¶](#types "Link to this heading")

_class_ string.templatelib.Template[¶](#string.templatelib.Template "Link to this definition")

`Template` 类描述了模板字符串的内容。它是不可变的，意味着模板的属性不能被重新赋值。

创建 `Template` 实例的最常见方式是使用 [模板字符串字面值语法](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#t-strings)。这种语法与 [f-字符串](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#f-strings) 的语法相同，只是它使用 `t` 前缀代替 `f`：

\>>> cheese \= 'Red Leicester'
\>>> template \= t"We're fresh out of {cheese}, sir."
\>>> type(template)
<class 'string.templatelib.Template'>

模板被存储为字面值 [`strings`](#string.templatelib.Template.strings "string.templatelib.Template.strings") 序列和动态 [`interpolations`](#string.templatelib.Template.interpolations "string.templatelib.Template.interpolations") 序列。一个 [`values`](#string.templatelib.Template.values "string.templatelib.Template.values") 属性保存插值的值：

\>>> cheese \= 'Camembert'
\>>> template \= t'Ah! We do have {cheese}.'
\>>> template.strings
('Ah! We do have ', '.')
\>>> template.interpolations
(Interpolation('Camembert', ...),)
\>>> template.values
('Camembert',)

`strings` 元组比 `interpolations` 和 `values` 多一个元素；插值“属于”字符串之间。当元组对齐时可能更容易理解

template.strings:  ('Ah! We do have ',              '.')
template.values:   (                   'Camembert',    )

属性

strings_: [tuple](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple")\[[str](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str"), ...\]_[¶](#string.templatelib.Template.strings "Link to this definition")

模板中静态字符串的 [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple")。

\>>> cheese \= 'Camembert'
\>>> template \= t'Ah! We do have {cheese}.'
\>>> template.strings
('Ah! We do have ', '.')

空字符串 _确实_ 包含在元组中：

\>>> response \= 'We do have '
\>>> cheese \= 'Camembert'
\>>> template \= t'Ah! {response}{cheese}.'
\>>> template.strings
('Ah! ', '', '.')

`strings` 元组从不为空，并且总是比 `interpolations` 和 `values` 元组多一个字符串：

\>>> t''.strings
('',)
\>>> t''.values
()
\>>> t'{'cheese'}'.strings
('', '')
\>>> t'{'cheese'}'.values
('cheese',)

interpolations_: [tuple](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple")\[[Interpolation](#string.templatelib.Interpolation "string.templatelib.Interpolation"), ...\]_[¶](#string.templatelib.Template.interpolations "Link to this definition")

模板中插值的 [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple")。

\>>> cheese \= 'Camembert'
\>>> template \= t'Ah! We do have {cheese}.'
\>>> template.interpolations
(Interpolation('Camembert', 'cheese', None, ''),)

`interpolations` 元组可能为空，并且总是比 `strings` 元组少一个值：

\>>> t'Red Leicester'.interpolations
()

values_: [tuple](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple")\[[object](https://docs.python.org/zh-cn/3/builtins/functions.html#object "object"), ...\]_[¶](#string.templatelib.Template.values "Link to this definition")

模板中所有插值值的元组。

\>>> cheese \= 'Camembert'
\>>> template \= t'Ah! We do have {cheese}.'
\>>> template.values
('Camembert',)

`values` 元组总是与 `interpolations` 元组长度相同。它总是等同于 `tuple(i.value for i in template.interpolations)`.

方法

\_\_new\_\_(_\*args: [str](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") | [Interpolation](#string.templatelib.Interpolation "string.templatelib.Interpolation")_)[¶](#string.templatelib.Template.__new__ "Link to this definition")

虽然字面值语法是创建 `Template` 的最常见方式，但也可以直接使用构造函数创建它们：

\>>> from string.templatelib import Interpolation, Template
\>>> cheese \= 'Camembert'
\>>> template \= Template(
...     'Ah! We do have ', Interpolation(cheese, 'cheese'), '.'
... )
\>>> list(template)
\['Ah! We do have ', Interpolation('Camembert', 'cheese', None, ''), '.'\]

如果连续传递多个字符串，它们将被连接成一个单一的值，存储在 [`strings`](#string.templatelib.Template.strings "string.templatelib.Template.strings") 属性中。例如，以下代码创建了一个 [`Template`](#string.templatelib.Template "string.templatelib.Template")，其最终字符串为单一值：

\>>> from string.templatelib import Template
\>>> template \= Template('Ah! We do have ', 'Camembert', '.')
\>>> template.strings
('Ah! We do have Camembert.',)

如果连续传递多个插值，它们将被视为独立的插值，并在它们之间插入一个空字符串。例如，以下代码创建了一个模板，在 [`strings`](#string.templatelib.Template.strings "string.templatelib.Template.strings") 属性中包含空占位符：

\>>> from string.templatelib import Interpolation, Template
\>>> template \= Template(
...     Interpolation('Camembert', 'cheese'),
...     Interpolation('.', 'punctuation'),
... )
\>>> template.strings
('', '', '')

iter(template)

遍历模板，按正确顺序生成每个非空字符串和 [`Interpolation`](#string.templatelib.Interpolation "string.templatelib.Interpolation")：

\>>> cheese \= 'Camembert'
\>>> list(t'Ah! We do have {cheese}.')
\['Ah! We do have ', Interpolation('Camembert', 'cheese', None, ''), '.'\]

小心

空字符串 **不** 包含在迭代中：

\>>> response \= 'We do have '
\>>> cheese \= 'Camembert'
\>>> list(t'Ah! {response}{cheese}.')
\['Ah! ',
 Interpolation('We do have ', 'response', None, ''),
 Interpolation('Camembert', 'cheese', None, ''),
 '.'\]

template + other

template += other

将此模板与另一个模板连接，返回一个新的 `Template` 实例：

\>>> cheese \= 'Camembert'
\>>> list(t'Ah! ' + t'We do have {cheese}.')
\['Ah! We do have ', Interpolation('Camembert', 'cheese', None, ''), '.'\]

连接一个 `Template` 和一个 `str` 是 **不** 支持的。 这是因为不清楚该字符串应被视为静态字符串还是插值。如果您想将 `Template` 与字符串连接，您应该要么直接将字符串包装在 `Template` 中 (将其视为静态字符串)，要么使用 `Interpolation` (将其视为动态字符串)：

\>>> from string.templatelib import Interpolation, Template
\>>> template \= t'Ah! '
\>>> \# Treat 'We do have ' as a static string
\>>> template += Template('We do have ')
\>>> \# Treat cheese as an interpolation
\>>> cheese \= 'Camembert'
\>>> template += Template(Interpolation(cheese, 'cheese'))
\>>> list(template)
\['Ah! We do have ', Interpolation('Camembert', 'cheese', None, '')\]

_class_ string.templatelib.Interpolation[¶](#string.templatelib.Interpolation "Link to this definition")

`Interpolation` 类型表示模板字符串内的一个表达式。它是不可变的，意味着插值的属性不能被重新赋值。

插值支持模式匹配，允许你使用 [match 语句](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#match) 匹配其属性：

\>>> from string.templatelib import Interpolation
\>>> interpolation \= t'{1. + 2.:.2f}'.interpolations\[0\]
\>>> interpolation
Interpolation(3.0, '1. + 2.', None, '.2f')
\>>> match interpolation:
...     case Interpolation(value, expression, conversion, format\_spec):
...         print(value, expression, conversion, format\_spec, sep\=' | ')
...
3.0 | 1. + 2. | None | .2f

Interpolation 是对应其值类型的 [泛型](https://docs.python.org/zh-cn/3/library/typing.html#generics) 对象。

属性

value_: [object](https://docs.python.org/zh-cn/3/builtins/functions.html#object "object")_[¶](#string.templatelib.Interpolation.value "Link to this definition")

插值的计算值。

\>>> t'{1 + 2}'.interpolations\[0\].value
3

expression_: [str](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")_[¶](#string.templatelib.Interpolation.expression "Link to this definition")

对于由 t-字符串字面值创建的插值，`expression` 是在花括号 (`{` & `}`) 以内的表达式文本，包括任何空白符，不包括花括号本身，并到可能存在的 `!`, `:` 或 `=` 前为止。 对于手动创建的插值，`expression` 是构造插值实例时提供的任意字符串。

我们建议使用有效的 Python 表达式或空字符串作为手动创建的 `Interpolation` 实例的 `expression` 字段，但这并不会在运行时强制要求。

\>>> t'{1 + 2}'.interpolations\[0\].expression
'1 + 2'

conversion_: [Literal](https://docs.python.org/zh-cn/3/library/typing.html#typing.Literal "typing.Literal")\['a', 'r', 's'\] | [None](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")_[¶](#string.templatelib.Interpolation.conversion "Link to this definition")

要应用于值的转换，或 `None`。

`conversion` 是应用于值的可选转换：

\>>> t'{1 + 2!a}'.interpolations\[0\].conversion
'a'

备注

与 f-字符串 不同，f-字符串 中的转换会自动应用，t-字符串 的预期行为是处理 `Template` 的代码将决定如何解释以及是否应用 `conversion`。为方便起见，可以使用 [`convert()`](#string.templatelib.convert "string.templatelib.convert") 函数来模拟 f-字符串 转换语义。

format\_spec_: [str](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")_[¶](#string.templatelib.Interpolation.format_spec "Link to this definition")

要应用于值的格式规范。

`format_spec` 是一个可选的、任意的字符串，用作格式规范来呈现值：

\>>> t'{1 + 2:.2f}'.interpolations\[0\].format\_spec
'.2f'

备注

与 f-字符串不同，f-字符串中的格式规范会通过 [`format()`](https://docs.python.org/zh-cn/3/builtins/functions.html#format "format") 协议自动应用，而 t-字符串的预期行为是处理插值的代码将决定如何解释以及是否应用格式规范。因此，插值中的 `format_spec` 值可以是任意字符串，包括那些不符合 `format()` 协议的字符串。

方法

\_\_new\_\_(_value: [object](https://docs.python.org/zh-cn/3/builtins/functions.html#object "object")_, _expression: [str](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")_, _conversion: [Literal](https://docs.python.org/zh-cn/3/library/typing.html#typing.Literal "typing.Literal")\['a', 'r', 's'\] | [None](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None") \= None_, _format\_spec: [str](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") \= ''_)[¶](#string.templatelib.Interpolation.__new__ "Link to this definition")

从组成部分创建一个新的 `Interpolation` 对象。

参数:

-   **value** -- 插值运算的评估结果（在作用域范围内）。
    
-   **expression** -- 一个有效 Python 表达式的文本，或一个空字符串。
    
-   **conversion** -- 要使用的 [转换](https://docs.python.org/zh-cn/3/library/string.html#formatstrings)，可以是 `None`、`'a'`、`'r'` 或 `'s'` 之一。
    
-   **format\_spec** -- 一个可选的、任意字符串，用作呈现值的 [格式规范](https://docs.python.org/zh-cn/3/library/string.html#formatspec)。
    

## 辅助函数[¶](#helper-functions "Link to this heading")

string.templatelib.convert(_obj_, _/_, _conversion_)[¶](#string.templatelib.convert "Link to this definition")

对给定对象 _obj_ 应用格式化字符串字面量 [转换](https://docs.python.org/zh-cn/3/library/string.html#formatstrings-conversion) 语义。这对于自定义模板字符串处理逻辑通常很有用。

目前支持三种转换标志：

-   `'s'` 调用 [`str()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 对值进行转换 (类似于 `!s`)，
    
-   `'r'` 调用 [`repr()`](https://docs.python.org/zh-cn/3/builtins/functions.html#repr "repr") (类似于 `!r`)，以及
    
-   `'a'` 调用 [`ascii()`](https://docs.python.org/zh-cn/3/builtins/functions.html#ascii "ascii") (就如 `!a`)。
    

如果转换标志为 `None`，则 _obj_ 不变返回。
