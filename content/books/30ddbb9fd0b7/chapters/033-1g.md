**源代码：** [Lib/numbers.py](https://github.com/python/cpython/tree/3.14/Lib/numbers.py)

* * *

`numbers` 模块 ([**PEP 3141**](https://peps.python.org/pep-3141/)) 定义了数字 [抽象基类](https://docs.python.org/zh-cn/3/glossary.html#term-abstract-base-class) 的层级结构，其中逐级定义了更多的操作。 此模块中定义的类型都不可被实例化。

_class_ numbers.Number[¶](#numbers.Number "Link to this definition")

数字的层次结构的基础。 如果你只想确认参数 _x_ 是不是数字而不关心其类型，则使用 `isinstance(x, Number)`。

## 数字的层次[¶](#the-numeric-tower "Link to this heading")

_class_ numbers.Complex[¶](#numbers.Complex "Link to this definition")

这个类型的子类描述了复数并包括了适用于内置 [`complex`](https://docs.python.org/zh-cn/3/builtins/functions.html#complex "complex") 类型的操作。 这些操作有: 转换为 `complex` 和 [`bool`](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool"), [`real`](#numbers.Complex.real "numbers.Complex.real"), [`imag`](#numbers.Complex.imag "numbers.Complex.imag"), `+`, `-`, `*`, `/`, `**`, [`abs()`](https://docs.python.org/zh-cn/3/builtins/functions.html#abs "abs"), [`conjugate()`](#numbers.Complex.conjugate "numbers.Complex.conjugate"), `==` 以及 `!=`。 除 `-` 和 `!=` 之外所有操作都是抽象的。

real[¶](#numbers.Complex.real "Link to this definition")

抽象的。得到该数字的实数部分。

imag[¶](#numbers.Complex.imag "Link to this definition")

抽象的。得到该数字的虚数部分。

_abstractmethod_ conjugate()[¶](#numbers.Complex.conjugate "Link to this definition")

抽象的。返回共轭复数。例如 `(1+3j).conjugate() == (1-3j)`。

_class_ numbers.Real[¶](#numbers.Real "Link to this definition")

相对于 [`Complex`](#numbers.Complex "numbers.Complex")，`Real` 加入了只适用于实数的操作。

简单的说，它们是：转化至 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")，[`math.trunc()`](https://docs.python.org/zh-cn/3/library/math.html#math.trunc "math.trunc")、 [`round()`](https://docs.python.org/zh-cn/3/builtins/functions.html#round "round")、 [`math.floor()`](https://docs.python.org/zh-cn/3/library/math.html#math.floor "math.floor")、 [`math.ceil()`](https://docs.python.org/zh-cn/3/library/math.html#math.ceil "math.ceil")、 [`divmod()`](https://docs.python.org/zh-cn/3/builtins/functions.html#divmod "divmod")、 `//`、 `%`、 `<`、 `<=`、 `>`、 和 `>=`。

实数同样默认支持 [`complex()`](https://docs.python.org/zh-cn/3/builtins/functions.html#complex "complex")、 [`real`](#numbers.Complex.real "numbers.Complex.real")、 [`imag`](#numbers.Complex.imag "numbers.Complex.imag") 和 [`conjugate()`](#numbers.Complex.conjugate "numbers.Complex.conjugate")。

_class_ numbers.Rational[¶](#numbers.Rational "Link to this definition")

子类型 [`Real`](#numbers.Real "numbers.Real") 并加入 [`numerator`](#numbers.Rational.numerator "numbers.Rational.numerator") 和 [`denominator`](#numbers.Rational.denominator "numbers.Rational.denominator") 两种特征属性。 它还为 [`float()`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 提供了默认值。

[`numerator`](#numbers.Rational.numerator "numbers.Rational.numerator") 和 [`denominator`](#numbers.Rational.denominator "numbers.Rational.denominator") 值应为 [`Integral`](#numbers.Integral "numbers.Integral") 的实例并且应当是最简分数形式，且 `denominator` 为正值。

numerator[¶](#numbers.Rational.numerator "Link to this definition")

抽象的。 该有理数的分子。

denominator[¶](#numbers.Rational.denominator "Link to this definition")

抽象的。 该有理数的分母。

_class_ numbers.Integral[¶](#numbers.Integral "Link to this definition")

子类型 [`Rational`](#numbers.Rational "numbers.Rational") 还增加了到 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 的转换操作。 为 [`float()`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float"), [`numerator`](#numbers.Rational.numerator "numbers.Rational.numerator") 和 [`denominator`](#numbers.Rational.denominator "numbers.Rational.denominator") 提供了默认支持。 为带模数的 [`pow()`](https://docs.python.org/zh-cn/3/builtins/functions.html#pow "pow") 和位运算增加了抽象方法: `<<`, `>>`, `&`, `^`, `|`, `~`。

## 给类型实现者的说明[¶](#notes-for-type-implementers "Link to this heading")

Implementers should be careful to make equal numbers equal and hash them to the same values. This may be subtle if there are two different extensions of the real numbers. See also [Hashing of numeric types](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#numeric-hash).

### 加入更多数字的ABC[¶](#adding-more-numeric-abcs "Link to this heading")

当然，这里有更多支持数字的ABC，如果不加入这些，就将缺少层次感。你可以用如下方法在 [`Complex`](#numbers.Complex "numbers.Complex") 和 [`Real`](#numbers.Real "numbers.Real") 中加入 `MyFoo`:

class MyFoo(Complex): ...
MyFoo.register(Real)

### 实现算术运算[¶](#implementing-the-arithmetic-operations "Link to this heading")

我们想要实现算术运算，因此混合模式运算要么调用一个开发者知道两个参数类型的实现，要么将两个参数转换为最接近的内置类型再执行运算。 对于 [`Integral`](#numbers.Integral "numbers.Integral") 的子类，这意味着 [`__add__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__add__ "object.__add__") 和 [`__radd__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__radd__ "object.__radd__") 应当被定义为:

class MyIntegral(Integral):

    def \_\_add\_\_(self, other):
        if isinstance(other, MyIntegral):
            return do\_my\_adding\_stuff(self, other)
        elif isinstance(other, OtherTypeIKnowAbout):
            return do\_my\_other\_adding\_stuff(self, other)
        else:
            return NotImplemented

    def \_\_radd\_\_(self, other):
        if isinstance(other, MyIntegral):
            return do\_my\_adding\_stuff(other, self)
        elif isinstance(other, OtherTypeIKnowAbout):
            return do\_my\_other\_adding\_stuff(other, self)
        elif isinstance(other, Integral):
            return int(other) + int(self)
        elif isinstance(other, Real):
            return float(other) + float(self)
        elif isinstance(other, Complex):
            return complex(other) + complex(self)
        else:
            return NotImplemented

对于 [`Complex`](#numbers.Complex "numbers.Complex") 的子类，混合类型运算有 5 种不同的情况。我将上面所有不涉及 `MyIntegral` 和 `OtherTypeIKnowAbout` 的代码称为"模板"。`a` 是 `Complex` 的子类型 `A` 的实例 (`a : A <: Complex`)，同时 `b : B <: Complex`。我将考虑 `a + b`:

1.  如果 `A` 定义了接受 `b` 的 [`__add__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__add__ "object.__add__")，一切都没有问题。
    
2.  如果 `A` 回退至模板代码，而如果它从 [`__add__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__add__ "object.__add__") 返回了一个值，我们就会失去 `B` 定义更加智能的 [`__radd__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__radd__ "object.__radd__") 的可能性，因此模板代码应当从 `__add__()` 返回 [`NotImplemented`](https://docs.python.org/zh-cn/3/builtins/constants.html#NotImplemented "NotImplemented")。 （或者 `A` 可能完全不实现 `__add__()`。）
    
3.  那么 `B` 的 [`__radd__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__radd__ "object.__radd__") 将有机会发挥作用。 如果它接受 `a`，一切都没有问题。
    
4.  如果它也回退到了模板，就没有更多的方法可以去尝试，因此默认实现就应当在此处生效。
    
5.  如果 `B <: A` ， Python 在 `A.__add__` 之前尝试 `B.__radd__` 。 这是可行的，是通过对 `A` 的认识实现的，因此这可以在交给 [`Complex`](#numbers.Complex "numbers.Complex") 处理之前处理这些实例。
    

如果 `A <: Complex` 和 `B <: Real` 没有共享任何其他信息，那么内置 [`complex`](https://docs.python.org/zh-cn/3/builtins/functions.html#complex "complex") 的共享操作就是最适当的，两个 [`__radd__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__radd__ "object.__radd__") 都将应用该操作，因此 `a+b == b+a`。

由于对任何一种类型的大部分操作是十分相似的，可以定义一个辅助函数来生成任何给定运算符的正向和反向版本。例如，[`fractions.Fraction`](https://docs.python.org/zh-cn/3/library/fractions.html#fractions.Fraction "fractions.Fraction") 使用了如下方式：

def \_operator\_fallbacks(monomorphic\_operator, fallback\_operator):
    def forward(a, b):
        if isinstance(b, (int, Fraction)):
            return monomorphic\_operator(a, b)
        elif isinstance(b, float):
            return fallback\_operator(float(a), b)
        elif isinstance(b, complex):
            return fallback\_operator(complex(a), b)
        else:
            return NotImplemented
    forward.\_\_name\_\_ \= '\_\_' + fallback\_operator.\_\_name\_\_ + '\_\_'
    forward.\_\_doc\_\_ \= monomorphic\_operator.\_\_doc\_\_

    def reverse(b, a):
        if isinstance(a, Rational):
            \# Includes ints.
            return monomorphic\_operator(a, b)
        elif isinstance(a, Real):
            return fallback\_operator(float(a), float(b))
        elif isinstance(a, Complex):
            return fallback\_operator(complex(a), complex(b))
        else:
            return NotImplemented
    reverse.\_\_name\_\_ \= '\_\_r' + fallback\_operator.\_\_name\_\_ + '\_\_'
    reverse.\_\_doc\_\_ \= monomorphic\_operator.\_\_doc\_\_

    return forward, reverse

def \_add(a, b):
    """a + b"""
    return Fraction(a.numerator \* b.denominator +
                    b.numerator \* a.denominator,
                    a.denominator \* b.denominator)

\_\_add\_\_, \_\_radd\_\_ \= \_operator\_fallbacks(\_add, operator.add)

\# ...
