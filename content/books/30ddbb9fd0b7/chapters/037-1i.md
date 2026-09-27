**源代码：** [Lib/fractions.py](https://github.com/python/cpython/tree/3.14/Lib/fractions.py)

* * *

`fractions` 模块提供了对有理数算术的支持。

Fraction 实例可以由一对有理数、一个单独数字或一个字符串构建而成。

_class_ fractions.Fraction(_numerator\=0_, _denominator\=1_)[¶](#fractions.Fraction "Link to this definition")

_class_ fractions.Fraction(_number_)

_class_ fractions.Fraction(_string_)

第一个版本要求 _numerator_ 和 _denominator_ 是 [`numbers.Rational`](https://docs.python.org/zh-cn/3/library/numbers.html#numbers.Rational "numbers.Rational") 的实例并返回一个新的 [`Fraction`](#fractions.Fraction "fractions.Fraction") 实例且其值等于 `numerator/denominator`。如果 _denominator_ 为零，则会引发 [`ZeroDivisionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ZeroDivisionError "ZeroDivisionError")。

第二个版本要求 _number_ 是 [`numbers.Rational`](https://docs.python.org/zh-cn/3/library/numbers.html#numbers.Rational "numbers.Rational") 的实例，或有 `as_integer_ratio()` 方法 (这包括 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 和 [`decimal.Decimal`](https://docs.python.org/zh-cn/3/library/decimal.html#decimal.Decimal "decimal.Decimal"))。它返回一个具有完全相同值的 [`Fraction`](#fractions.Fraction "fractions.Fraction") 实例。假设 `as_integer_ratio()` 方法返回一对互质整数，后一个是正整数。请注意，由于二进制浮点数的常见问题 (参见 [浮点算术：问题和限制](https://docs.python.org/zh-cn/3/tutorial/floatingpoint.html#tut-fp-issues))，`Fraction(1.1)` 的参数并不完全等于 11/10，因此 `Fraction(1.1)` 不会像人们所期望的那样返回 `Fraction(11, 10)`。 （但请参阅下面的 [`limit_denominator()`](#fractions.Fraction.limit_denominator "fractions.Fraction.limit_denominator") 方法的文档。）

构造器的最后一个版本需要一个字符串。此实例的常见形式是:

\[sign\] numerator \['/' denominator\]

其中的可选项 `sign` 可能为 '+' 或 '-' 且 `numerator` 和 `denominator` (如果存在) 是十进制数码的字符串 (可以如代码中的整数字面值一样使用下划线来分隔数码)。此外，[`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 构造器所接受的任何代表一个有限值的字符串也都为 [`Fraction`](#fractions.Fraction "fractions.Fraction") 构造器所接受。不论哪 种形式的输入字符串也都可以带有开头和/或末尾空格符。这里是一些示例:

\>>> from fractions import Fraction
\>>> Fraction(16, \-10)
Fraction(-8, 5)
\>>> Fraction(123)
Fraction(123, 1)
\>>> Fraction()
Fraction(0, 1)
\>>> Fraction('3/7')
Fraction(3, 7)
\>>> Fraction(' -3/7 ')
Fraction(-3, 7)
\>>> Fraction('1.414213 \\t\\n')
Fraction(1414213, 1000000)
\>>> Fraction('-.125')
Fraction(-1, 8)
\>>> Fraction('7e-6')
Fraction(7, 1000000)
\>>> Fraction(2.25)
Fraction(9, 4)
\>>> Fraction(1.1)
Fraction(2476979795053773, 2251799813685248)
\>>> from decimal import Decimal
\>>> Fraction(Decimal('1.1'))
Fraction(11, 10)

[`Fraction`](#fractions.Fraction "fractions.Fraction") 类继承自抽象基类 [`numbers.Rational`](https://docs.python.org/zh-cn/3/library/numbers.html#numbers.Rational "numbers.Rational")，并实现了该类的所有方法和操作。 `Fraction` 实例是 [hashable](https://docs.python.org/zh-cn/3/glossary.html#term-hashable) 对象，并应当被视为不可变对象。此外，`Fraction` 还具有以下特征属性和方法：

在 3.9 版本发生变更: 现在会使用 [`math.gcd()`](https://docs.python.org/zh-cn/3/library/math.html#math.gcd "math.gcd") 函数来正规化 _numerator_ 和 _denominator_。 `math.gcd()` 总是返回 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 类型。在之前版本中，GCD 的类型取决于 _numerator_ 和 _denominator_ 的类型。

在 3.11 版本发生变更: 现在当使用字符串创建 [`Fraction`](#fractions.Fraction "fractions.Fraction") 实例时已允许使用下划线，遵循 [**PEP 515**](https://peps.python.org/pep-0515/) 规则。

在 3.11 版本发生变更: [`Fraction`](#fractions.Fraction "fractions.Fraction") 现在实现了 `__int__` 以满足 `typing.SupportsInt` 实例检测。

在 3.12 版本发生变更: 允许字符串输入在斜杠两边添加空格: `Fraction('2 / 3')`。

在 3.12 版本发生变更: [`Fraction`](#fractions.Fraction "fractions.Fraction") 实例现在支持浮点风格的格式化，使用 `"e"`, `"E"`, `"f"`, `"F"`, `"g"`, `"G"` 和 `"%""` 等表示类型。

在 3.13 版本发生变更: 没有表示类型的 [`Fraction`](#fractions.Fraction "fractions.Fraction") 实例的格式化现在支持填充、对齐、正负号处理、最小宽度和分组。

在 3.14 版本发生变更: [`Fraction`](#fractions.Fraction "fractions.Fraction") 构造器现在接受任何有 `as_integer_ratio()` 方法的对象。

numerator[¶](#fractions.Fraction.numerator "Link to this definition")

最简分数形式的分子。

denominator[¶](#fractions.Fraction.denominator "Link to this definition")

最简分数形式的分母。保证为正数。

as\_integer\_ratio()[¶](#fractions.Fraction.as_integer_ratio "Link to this definition")

返回由两个整数组成的元组，两数之比等于原 Fraction 的值，为最简形式且其分母为正数。

Added in version 3.8.

is\_integer()[¶](#fractions.Fraction.is_integer "Link to this definition")

如果 Fraction 为整数则返回 `True`。

Added in version 3.12.

_classmethod_ from\_float(_f_)[¶](#fractions.Fraction.from_float "Link to this definition")

只接受 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 或 [`numbers.Integral`](https://docs.python.org/zh-cn/3/library/numbers.html#numbers.Integral "numbers.Integral") 实例的替代性构造器。请注意 `Fraction.from_float(0.3)` 与 `Fraction(3, 10)` 的值是不同的。

备注

从 Python 3.2 开始，在构造 [`Fraction`](#fractions.Fraction "fractions.Fraction") 实例时可以直接使用 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")。

_classmethod_ from\_decimal(_dec_)[¶](#fractions.Fraction.from_decimal "Link to this definition")

只接受 [`decimal.Decimal`](https://docs.python.org/zh-cn/3/library/decimal.html#decimal.Decimal "decimal.Decimal") 或 [`numbers.Integral`](https://docs.python.org/zh-cn/3/library/numbers.html#numbers.Integral "numbers.Integral") 实例的替代性构造器。

_classmethod_ from\_number(_number_)[¶](#fractions.Fraction.from_number "Link to this definition")

另一种构造器，只接受 [`numbers.Integral`](https://docs.python.org/zh-cn/3/library/numbers.html#numbers.Integral "numbers.Integral")、[`numbers.Rational`](https://docs.python.org/zh-cn/3/library/numbers.html#numbers.Rational "numbers.Rational")、[`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 或 [`decimal.Decimal`](https://docs.python.org/zh-cn/3/library/decimal.html#decimal.Decimal "decimal.Decimal") 的实例，以及带有 `as_integer_ratio()` 方法但不是字符串的对象。

Added in version 3.14.

limit\_denominator(_max\_denominator\=1000000_)[¶](#fractions.Fraction.limit_denominator "Link to this definition")

找到并返回一个 [`Fraction`](#fractions.Fraction "fractions.Fraction") 使得其值最接近 `self` 并且分母不大于 max\_denominator。 此方法适用于找出给定浮点数的有理数近似值：

\>>> from fractions import Fraction
\>>> Fraction('3.1415926535897932').limit\_denominator(1000)
Fraction(355, 113)

或是用来恢复被表示为一个浮点数的有理数：

\>>> from math import pi, cos
\>>> Fraction(cos(pi/3))
Fraction(4503599627370497, 9007199254740992)
\>>> Fraction(cos(pi/3)).limit\_denominator()
Fraction(1, 2)
\>>> Fraction(1.1).limit\_denominator()
Fraction(11, 10)

\_\_floor\_\_()[¶](#fractions.Fraction.__floor__ "Link to this definition")

返回最大的 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") `<= self`。此方法也可通过 [`math.floor()`](https://docs.python.org/zh-cn/3/library/math.html#math.floor "math.floor") 函数来使用：

\>>> from math import floor
\>>> floor(Fraction(355, 113))
3

\_\_ceil\_\_()[¶](#fractions.Fraction.__ceil__ "Link to this definition")

返回最小的 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") `>= self`。此方法也可通过 [`math.ceil()`](https://docs.python.org/zh-cn/3/library/math.html#math.ceil "math.ceil") 函数来使用。

\_\_round\_\_()[¶](#fractions.Fraction.__round__ "Link to this definition")

\_\_round\_\_(_ndigits_)

第一个版本返回一个 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 使得其值最接近 `self`，位值为二分之一时只对偶数舍入。第二个版本会将 `self` 舍入到最接近 `Fraction(1, 10**ndigits)` 的倍数（逻辑上，如果 `ndigits` 为负值），位值为二分之一时同样只对偶数舍入。此方法也可通过 [`round()`](https://docs.python.org/zh-cn/3/builtins/functions.html#round "round") 函数来使用。

\_\_format\_\_(_format\_spec_, _/_)[¶](#fractions.Fraction.__format__ "Link to this definition")

通过 [`str.format()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str.format "str.format") 方法、[`format()`](https://docs.python.org/zh-cn/3/builtins/functions.html#format "format") 内置函数或 [格式化字符串字面值](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#f-strings) 提供对 [`Fraction`](#fractions.Fraction "fractions.Fraction") 实例格式化的支持。

如果 `format_spec` 格式说明字符串末尾不带表示类型 `'e'`, `'E'`, `'f'`, `'F'`, `'g'`, `'G'` 或 `'%'` 之一则格式化操作将遵循在 [格式说明微语言](https://docs.python.org/zh-cn/3/library/string.html#formatspec) 中描述的有关填充、对齐、正负号处理、最小宽度和分组的一般规则。 “替代形式”旗标 `'#'` 也是受支持的：如果提供，将强制输出字符串始终包括一个显式的分母，即使被格式化的值恰好为整数也是如此。表示填充零值的旗标 `'0'` 是不被支持的。

如果 `format_spec` 格式说明字符串末尾带有表示类型 `'e'`, `'E'`, `'f'`, `'F'`, `'g'`, `'G'` 或 `'%'` 之一那么格式化操作将遵循在 [Format specification mini-language](https://docs.python.org/zh-cn/3/library/string.html#formatspec) 小节中针对 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 类型所描述的规则。

这是一些例子:

\>>> from fractions import Fraction
\>>> format(Fraction(103993, 33102), '\_')
'103\_993/33\_102'
\>>> format(Fraction(1, 7), '.^+10')
'...+1/7...'
\>>> format(Fraction(3, 1), '')
'3'
\>>> format(Fraction(3, 1), '#')
'3/1'
\>>> format(Fraction(1, 7), '.40g')
'0.1428571428571428571428571428571428571429'
\>>> format(Fraction('1234567.855'), '\_.2f')
'1\_234\_567.86'
\>>> f"{Fraction(355, 113):\*>20.6e}"
'\*\*\*\*\*\*\*\*3.141593e+00'
\>>> old\_price, new\_price \= 499, 672
\>>> "{:.2%} price increase".format(Fraction(new\_price, old\_price) \- 1)
'34.67% price increase'
