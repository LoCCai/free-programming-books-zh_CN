Added in version 3.4.

**源代码：** [Lib/enum.py](https://github.com/python/cpython/tree/3.14/Lib/enum.py)

* * *

一个枚举：

-   是绑定到唯一值的符号名称（成员）集合
    
-   可以被执行迭代以按定义顺序返回其规范的（即非别名的）成员
    
-   使用 _调用_ 语法按值返回成员
    
-   使用 _索引_ 语法按名称返回成员
    

枚举是通过使用 [`class`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#class) 语法或是通过使用函数调用语法来创建的:

\>>> from enum import Enum

\>>> \# 类语法
\>>> class Color(Enum):
...     RED \= 1
...     GREEN \= 2
...     BLUE \= 3

\>>> \# 函数语法
\>>> Color \= Enum('Color', \[('RED', 1), ('GREEN', 2), ('BLUE', 3)\])

虽然我们可以使用 [`class`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#class) 语法来创建枚举，但枚举并不是常规的 Python 类。请参阅 [枚举有什么不同？](https://docs.python.org/zh-cn/3/howto/enum.html#enum-class-differences) 了解更多细节。

备注

命名法

-   类 `Color` 是一个 _枚举_ （或 _enum_ ）
    
-   属性 `Color.RED`、 `Color.GREEN` 等是 _枚举成员_ （或 _members_ ）并且在功能上是常量。
    
-   枚举成员有 _名称_ 和 _值_ (`Color.RED` 的名称是 `RED`，`Color.BLUE` 的值是 `3`，等等)
    

* * *

## 模块内容[¶](#module-contents "Link to this heading")

> [`EnumType`](#enum.EnumType "enum.EnumType")
> 
> > Enum 及其子类的 `type`。
> 
> [`Enum`](#enum.Enum "enum.Enum")
> 
> > 用于创建枚举常量的基类。
> 
> [`IntEnum`](#enum.IntEnum "enum.IntEnum")
> 
> > 用于创建枚举常量的基类，这些常量也是 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 的子类。 ([Notes](#notes))
> 
> [`StrEnum`](#enum.StrEnum "enum.StrEnum")
> 
> > 用于创建枚举常量的基类，这些常量也是 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 的子类。 ([Notes](#notes))
> 
> [`Flag`](#enum.Flag "enum.Flag")
> 
> > 创建可与位运算符搭配使用，又不会失去 [`Flag`](#enum.Flag "enum.Flag") 成员资格的枚举常量的基类。
> 
> [`IntFlag`](#enum.IntFlag "enum.IntFlag")
> 
> > 创建可与位运算符搭配使用，又不失去 [`IntFlag`](#enum.IntFlag "enum.IntFlag") 成员资格的枚举常量的基类。`IntFlag` 成员也是 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 的子类。 ([Notes](#notes))
> 
> [`ReprEnum`](#enum.ReprEnum "enum.ReprEnum")
> 
> [`EnumCheck`](#enum.EnumCheck "enum.EnumCheck")
> 
> > 具有值 `CONTINUOUS`、`NAMED_FLAGS` 和 `UNIQUE` 的枚举，用于 [`verify()`](#enum.verify "enum.verify") 以确保给定枚举满足各种约束。
> 
> [`FlagBoundary`](#enum.FlagBoundary "enum.FlagBoundary")
> 
> > 具有值 `STRICT`、`CONFORM`、`EJECT` 和 `KEEP` 的枚举，允许对枚举中无效值的处理方式进行更细粒度的控制。
> 
> [`EnumDict`](#enum.EnumDict "enum.EnumDict")
> 
> > 一个被用于子类化 [`EnumType`](#enum.EnumType "enum.EnumType") 的 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict") 子类。
> 
> [`auto`](#enum.auto "enum.auto")
> 
> > 实例被替换为枚举成员的适当值。 [`StrEnum`](#enum.StrEnum "enum.StrEnum") 默认为成员名称的小写版本，而其他枚举默认为 1 并由此递增。
> 
> [`@~enum.property`](#enum.property "enum.property")
> 
> > 允许 [`Enum`](#enum.Enum "enum.Enum") 成员拥有属性而不会与成员名称相冲突。`value` 和 `name` 属性都是以这样的方式实现的。
> 
> [`@unique`](#enum.unique "enum.unique")
> 
> > 确保一个名称只绑定一个值的 Enum 类装饰器。
> 
> [`@verify`](#enum.verify "enum.verify")
> 
> > 检查枚举的用户可选择约束的枚举类装饰器。
> 
> [`@member`](#enum.member "enum.member")
> 
> > 使 `obj` 成为成员。可以用作装饰器。
> 
> [`@nonmember`](#enum.nonmember "enum.nonmember")
> 
> > 使 `obj` 不为成员。可以用作装饰器。
> 
> [`@global_enum`](#enum.global_enum "enum.global_enum")
> 
> > 修改枚举的 [`str()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 和 [`repr()`](https://docs.python.org/zh-cn/3/builtins/functions.html#repr "repr") 以将其成员显示为属于模块而不是其类，并将枚举成员导出到全局命名空间。
> 
> [`show_flag_values()`](#enum.show_flag_values "enum.show_flag_values")
> 
> > 返回标志中包含的所有二次幂整数的列表。
> 
> [`enum.bin()`](#enum.bin "enum.bin")
> 
> > 与内置的 [`bin()`](https://docs.python.org/zh-cn/3/builtins/functions.html#bin "bin") 类似，区别在于负值将以补码表示，并且打头的比特位总是指明正负性 (`0` 表示正值，`1` 表示负值)。

Added in version 3.6: `Flag`, `IntFlag`, `auto`

Added in version 3.11: `StrEnum`, `EnumCheck`, `ReprEnum`, `FlagBoundary`, `property`, `member`, `nonmember`, `global_enum`, `show_flag_values`

Added in version 3.13: `EnumDict`

* * *

## 数据类型[¶](#data-types "Link to this heading")

_class_ enum.EnumType[¶](#enum.EnumType "Link to this definition")

_EnumType_ 是 _enum_ 枚举的 [metaclass](https://docs.python.org/zh-cn/3/glossary.html#term-metaclass)。可以对 _EnumType_ 进行子类化——有关详细信息，请参阅 [Subclassing EnumType](https://docs.python.org/zh-cn/3/howto/enum.html#enumtype-examples).

`EnumType` 负责在最终的 _enum_ 上设置正确的 `__repr__()`, `__str__()`, `__format__()` 和 `__reduce__()` 方法，以及创建枚举成员，正确处理重复项，提供对枚举类的迭代等。

Added in version 3.11: 在 3.11 之前 `EnumType` 被称为 `EnumMeta`，该名称作为别名仍然可用。

\_\_call\_\_(_cls_, _value_, _names\=None_, _\*_, _module\=None_, _qualname\=None_, _type\=None_, _start\=1_, _boundary\=None_)[¶](#enum.EnumType.__call__ "Link to this definition")

此方法以两种不同的方式调用：

-   查找现有成员：
    
    > cls:
    > 
    > 被调用的枚举类。
    > 
    > value:
    > 
    > 要查找的值。
    
-   使用 `cls` 枚举创建新枚举（仅当现有枚举没有任何成员时）：
    
    > cls:
    > 
    > 被调用的枚举类。
    > 
    > value:
    > 
    > 要创建的新枚举的名称。
    > 
    > names:
    > 
    > 新枚举成员的名称/值。
    > 
    > module -- 模块:
    > 
    > 在其中创建新枚举的模块的名称。
    > 
    > qualname:
    > 
    > 可以找到此枚举的模块中的实际位置。
    > 
    > type -- 类型:
    > 
    > 新枚举的混合类型。
    > 
    > start:
    > 
    > 枚举的第一个整数值（由 [`auto`](#enum.auto "enum.auto") 使用）。
    > 
    > 边界:
    > 
    > 如何处理来自位操作的超出范围的值 (仅限 [`Flag`](#enum.Flag "enum.Flag"))。
    

\_\_contains\_\_(_cls_, _member_)[¶](#enum.EnumType.__contains__ "Link to this definition")

如果成员属于 `cls` 则返回 `True`:

\>>> some\_var \= Color.RED
\>>> some\_var in Color
True
\>>> Color.RED.value in Color
True

在 3.12 版本发生变更: 在 Python 3.12 之前，如果在包含检测中使用了非枚举成员则会引发 `TypeError`。

\_\_dir\_\_(_cls_)[¶](#enum.EnumType.__dir__ "Link to this definition")

返回 `['__class__', '__doc__', '__members__', '__module__']` 和 _cls_ 中的成员名称

\>>> dir(Color)
\['BLUE', 'GREEN', 'RED', '\_\_class\_\_', '\_\_contains\_\_', '\_\_doc\_\_', '\_\_getitem\_\_', '\_\_init\_subclass\_\_', '\_\_iter\_\_', '\_\_len\_\_', '\_\_members\_\_', '\_\_module\_\_', '\_\_name\_\_', '\_\_qualname\_\_'\]

\_\_getitem\_\_(_cls_, _name_)[¶](#enum.EnumType.__getitem__ "Link to this definition")

返回 _cls_ 中匹配 _name_ 的 Enum 成员，或者引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError"):

\>>> Color\['BLUE'\]
<Color.BLUE: 3>

\_\_iter\_\_(_cls_)[¶](#enum.EnumType.__iter__ "Link to this definition")

按定义顺序返回 _cls_ 中的每个成员:

\>>> list(Color)
\[<Color.RED: 1>, <Color.GREEN: 2>, <Color.BLUE: 3>\]

\_\_len\_\_(_cls_)[¶](#enum.EnumType.__len__ "Link to this definition")

返回 _cls_ 中成员的数量:

\>>> len(Color)
3

\_\_members\_\_[¶](#enum.EnumType.__members__ "Link to this definition")

返回一个从每个枚举名称到其成员的映射，包括别名

\_\_reversed\_\_(_cls_)[¶](#enum.EnumType.__reversed__ "Link to this definition")

按定义的逆序返回 _cls_ 中的每个成员:

\>>> list(reversed(Color))
\[<Color.BLUE: 3>, <Color.GREEN: 2>, <Color.RED: 1>\]

_class_ enum.Enum[¶](#enum.Enum "Link to this definition")

_Enum_ 是所有 _enum_ 枚举的基类。

name[¶](#enum.Enum.name "Link to this definition")

用于定义 `Enum` 成员的名称:

\>>> Color.BLUE.name
'BLUE'

value[¶](#enum.Enum.value "Link to this definition")

赋给 `Enum` 成员的值:

\>>> Color.RED.value
1

成员的值，可在 [`__new__()`](#enum.Enum.__new__ "enum.Enum.__new__") 中设置。

备注

Enum 成员值

成员值可以为任意类型：[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int"), [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 等等。如果具体的值不重要则你可以使用 [`auto`](#enum.auto "enum.auto") 实例这将为你选择一个适当的值。详情参见 `auto`。

虽然可以使用可变/不可哈希的值，比如 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict"), [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 或是可变的 [`dataclass`](https://docs.python.org/zh-cn/3/library/dataclasses.html#dataclasses.dataclass "dataclasses.dataclass")，但它们在创建期间会产生基于枚举中可变/不可哈希的值总数量的二次方级性能影响。

\_name\_[¶](#enum.Enum._name_ "Link to this definition")

成员的名称。

\_value\_[¶](#enum.Enum._value_ "Link to this definition")

成员的值，可在 [`__new__()`](#enum.Enum.__new__ "enum.Enum.__new__") 中设置。

\_order\_[¶](#enum.Enum._order_ "Link to this definition")

已不再使用，保留以便向下兼容。 （类属性，在类创建期间移除）。

The `_order_` attribute can be provided to help keep Python 2 / Python 3 code in sync. It will be checked against the actual order of the enumeration and raise an error if the two do not match:

\>>> class Color(Enum):
...     \_order\_ \= 'RED GREEN BLUE'
...     RED \= 1
...     BLUE \= 3
...     GREEN \= 2
...
Traceback (most recent call last):
...
TypeError: member order does not match \_order\_:
   \['RED', 'BLUE', 'GREEN'\]
   \['RED', 'GREEN', 'BLUE'\]

备注

在 Python 2 代码中 [`_order_`](#enum.Enum._order_ "enum.Enum._order_") 属性是必须的，因为定义顺序在被记录之前就已丢失。

Added in version 3.6.

\_ignore\_[¶](#enum.Enum._ignore_ "Link to this definition")

`_ignore_` 仅在创建期间使用并会在创建完成后立即从枚举中移除。

`_ignore_` 是由不会被作为成员的名称组成的列表，并且这些名称还将从完成的枚举中移除。请参阅 [TimePeriod](https://docs.python.org/zh-cn/3/howto/enum.html#enum-time-period) 获取示例。

Added in version 3.7.

\_\_dir\_\_(_self_)[¶](#enum.Enum.__dir__ "Link to this definition")

返回 `['__class__', '__doc__', '__module__', 'name', 'value']` 以及在 _self.\_\_class\_\__ 上定义的任何公有方法:

\>>> from enum import Enum
\>>> import datetime as dt
\>>> class Weekday(Enum):
...     MONDAY \= 1
...     TUESDAY \= 2
...     WEDNESDAY \= 3
...     THURSDAY \= 4
...     FRIDAY \= 5
...     SATURDAY \= 6
...     SUNDAY \= 7
...     @classmethod
...     def today(cls):
...         print(f'today is {cls(dt.date.today().isoweekday()).name}')
...
\>>> dir(Weekday.SATURDAY)
\['\_\_class\_\_', '\_\_doc\_\_', '\_\_eq\_\_', '\_\_hash\_\_', '\_\_module\_\_', 'name', 'today', 'value'\]

\_generate\_next\_value\_(_name_, _start_, _count_, _last\_values_)[¶](#enum.Enum._generate_next_value_ "Link to this definition")

> name:
> 
> 定义的成员名称（例如 'RED'）。
> 
> start:
> 
> Enum 的起始值；默认为 1。
> 
> count:
> 
> 当前定义的成员数量，不包括这一个。
> 
> last\_values:
> 
> 由前面的值组成的列表。

A _staticmethod_ that is used to determine the next value returned by [`auto`](#enum.auto "enum.auto").

备注

对于标准的 [`Enum`](#enum.Enum "enum.Enum") 类来说下一个被选择的值将是已有的最高值加一。

对于 [`Flag`](#enum.Flag "enum.Flag") 类来说下一个选择的值将是下一个最高的二的幂数。

此函数可以被重写，例如:

\>>> from enum import auto, Enum
\>>> class PowersOfThree(Enum):
...     @staticmethod
...     def \_generate\_next\_value\_(name, start, count, last\_values):
...         return 3 \*\* (count + 1)
...     FIRST \= auto()
...     SECOND \= auto()
...
\>>> PowersOfThree.SECOND.value
9

Added in version 3.6.

在 3.13 版本发生变更: 在之前版本中将会使用最近的值而不是最高的值。

\_\_init\_\_(_self_, _\*args_, _\*\*kwds_)[¶](#enum.Enum.__init__ "Link to this definition")

在默认情况下，将不做任何事。如果在成员赋值时给出了多个值，这些值将成为传给 `__init__` 的单独参数；例如

\>>> from enum import Enum
\>>> class Weekday(Enum):
...     MONDAY \= 1, 'Mon'

`Weekday.__init__()` 将以 `Weekday.__init__(self, 1, 'Mon')` 的形式被调用

\_\_init\_subclass\_\_(_cls_, _\*\*kwds_)[¶](#enum.Enum.__init_subclass__ "Link to this definition")

一个用来进一步配置后续子类的 _类方法_。在默认情况下，将不做任何事。

\_missing\_(_cls_, _value_)[¶](#enum.Enum._missing_ "Link to this definition")

一个用来查找不存在于 _cls_ 中的值的 _类方法_。在默认情况下它将不做任何事，但可以被重写以实现自定义的搜索行为:

\>>> from enum import auto, StrEnum
\>>> class Build(StrEnum):
...     DEBUG \= auto()
...     OPTIMIZED \= auto()
...     @classmethod
...     def \_missing\_(cls, value):
...         value \= value.lower()
...         for member in cls:
...             if member.value \== value:
...                 return member
...         return None
...
\>>> Build.DEBUG.value
'debug'
\>>> Build('deBUG')
<Build.DEBUG: 'debug'>

Added in version 3.6.

\_\_new\_\_(_cls_, _\*args_, _\*\*kwds_)[¶](#enum.Enum.__new__ "Link to this definition")

在默认情况下，将不会存在。如果指定，则或是在枚举类定义中或是在混入类定义中 (比如 `int`)，在成员赋值时给出的所有值都将被传递；例如

\>>> from enum import Enum
\>>> class MyIntEnum(int, Enum):
...     TWENTYSIX \= '1a', 16

将导致调用 `int('1a', 16)` 并使该成员的值为 `26`。

备注

当编写自定义的 `__new__` 时，不要使用 `super().__new__` -- 而要调用适当的 `__new__`。

\_\_repr\_\_(_self_)[¶](#enum.Enum.__repr__ "Link to this definition")

返回用于 _repr()_ 调用的字符串。在默认情况下，将返回 _Enum_ 名称、成员名称和值，但也可以被重写:

\>>> from enum import auto, Enum
\>>> class OtherStyle(Enum):
...     ALTERNATE \= auto()
...     OTHER \= auto()
...     SOMETHING\_ELSE \= auto()
...     def \_\_repr\_\_(self):
...         cls\_name \= self.\_\_class\_\_.\_\_name\_\_
...         return f'{cls\_name}.{self.name}'
...
\>>> OtherStyle.ALTERNATE, str(OtherStyle.ALTERNATE), f"{OtherStyle.ALTERNATE}"
(OtherStyle.ALTERNATE, 'OtherStyle.ALTERNATE', 'OtherStyle.ALTERNATE')

\_\_str\_\_(_self_)[¶](#enum.Enum.__str__ "Link to this definition")

返回用于 _str()_ 调用的字符串。在默认情况下，返回 _Enum_ 名称和成员名称，但也可以被重写:

\>>> from enum import auto, Enum
\>>> class OtherStyle(Enum):
...     ALTERNATE \= auto()
...     OTHER \= auto()
...     SOMETHING\_ELSE \= auto()
...     def \_\_str\_\_(self):
...         return f'{self.name}'
...
\>>> OtherStyle.ALTERNATE, str(OtherStyle.ALTERNATE), f"{OtherStyle.ALTERNATE}"
(<OtherStyle.ALTERNATE: 1>, 'ALTERNATE', 'ALTERNATE')

\_\_format\_\_(_self_)[¶](#enum.Enum.__format__ "Link to this definition")

返回用于 _format()_ 和 _f-string_ 调用的字符串。在默认情况下，将返回 [`__str__()`](#enum.Enum.__str__ "enum.Enum.__str__") 的返回值，但也可以被重写:

\>>> from enum import auto, Enum
\>>> class OtherStyle(Enum):
...     ALTERNATE \= auto()
...     OTHER \= auto()
...     SOMETHING\_ELSE \= auto()
...     def \_\_format\_\_(self, spec):
...         return f'{self.name}'
...
\>>> OtherStyle.ALTERNATE, str(OtherStyle.ALTERNATE), f"{OtherStyle.ALTERNATE}"
(<OtherStyle.ALTERNATE: 1>, 'OtherStyle.ALTERNATE', 'ALTERNATE')

备注

将 [`auto`](#enum.auto "enum.auto") 用于 [`Enum`](#enum.Enum "enum.Enum") 将得到递增的整数值，从 `1` 开始。

在 3.12 版本发生变更: 增加了 [数据类支持](https://docs.python.org/zh-cn/3/howto/enum.html#enum-dataclass-support)

\_add\_alias\_()[¶](#enum.Enum._add_alias_ "Link to this definition")

添加一个新名称作为现有成员的别名:

\>>> Color.RED.\_add\_alias\_("ERROR")
\>>> Color.ERROR
<Color.RED: 1>

如果该名称已被分配给另一个成员则会引发 [`NameError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#NameError "NameError")。

Added in version 3.13.

\_add\_value\_alias\_()[¶](#enum.Enum._add_value_alias_ "Link to this definition")

添加一个新值作为现有成员的别名:

\>>> Color.RED.\_add\_value\_alias\_(42)
\>>> Color(42)
<Color.RED: 1>

Added in version 3.13.

_class_ enum.IntEnum[¶](#enum.IntEnum "Link to this definition")

_IntEnum_ 和 [`Enum`](#enum.Enum "enum.Enum") 是一样的，但其成员还属于整数并可被用在任何可以使用整数的地方。如果对一个 _IntEnum_ 成员执行整数运算，结果值将失去其枚举状态。

\>>> from enum import IntEnum
\>>> class Number(IntEnum):
...     ONE \= 1
...     TWO \= 2
...     THREE \= 3
...
\>>> Number.THREE
<Number.THREE: 3>
\>>> Number.ONE + Number.TWO
3
\>>> Number.THREE + 5
8
\>>> Number.THREE \== 3
True

备注

将 [`auto`](#enum.auto "enum.auto") 用于 [`IntEnum`](#enum.IntEnum "enum.IntEnum") 将得到递增的整数值，从 `1` 开始。

在 3.11 版本发生变更: [`__str__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__str__ "object.__str__") 现在是 `int.__str__()` 以更好地支持 _现有常量的替换_ 应用场景。 出于同样的原因 [`__format__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__format__ "object.__format__") 也已经是 `int.__format__()`。

_class_ enum.StrEnum[¶](#enum.StrEnum "Link to this definition")

_StrEnum_ 和 [`Enum`](#enum.Enum "enum.Enum") 是一样的，但其成员还属于字符串并可被用在任何可以使用字符串的地方。如果对一个 _StrEnum_ 成员执行字符串操作其结果值将不再是该枚举的一部分。

\>>> from enum import StrEnum, auto
\>>> class Color(StrEnum):
...     RED \= 'r'
...     GREEN \= 'g'
...     BLUE \= 'b'
...     UNKNOWN \= auto()
...
\>>> Color.RED
<Color.RED: 'r'>
\>>> Color.UNKNOWN
<Color.UNKNOWN: 'unknown'>
\>>> str(Color.UNKNOWN)
'unknown'

备注

在标准库中有些地方会检查是否是真正的 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 而不是 `str` 的子类 (例如使用 `type(unknown) == str` 而不是 `isinstance(unknown, str)`)，在这些地方你将需要使用 `str(MyStrEnum.MY_MEMBER)`.

备注

将 [`auto`](#enum.auto "enum.auto") 用于 [`StrEnum`](#enum.StrEnum "enum.StrEnum") 将得到小写形式的成员名称字符串值。

Added in version 3.11.

_class_ enum.Flag[¶](#enum.Flag "Link to this definition")

`Flag` 与 [`Enum`](#enum.Enum "enum.Enum") 的相同，但其成员支持按位运算符 `&` (_AND_), `|` (_OR_), `^` (_XOR_) 和 `~` (_INVERT_)；这些运算的结果都是枚举成员（的别名）。

\_\_contains\_\_(_self_, _value_)[¶](#enum.Flag.__contains__ "Link to this definition")

如果 value 在 self 之中则返回 _True_:

\>>> from enum import Flag, auto
\>>> class Color(Flag):
...     RED \= auto()
...     GREEN \= auto()
...     BLUE \= auto()
...
\>>> purple \= Color.RED | Color.BLUE
\>>> white \= Color.RED | Color.GREEN | Color.BLUE
\>>> Color.GREEN in purple
False
\>>> Color.GREEN in white
True
\>>> purple in white
True
\>>> white in purple
False

\_\_iter\_\_(_self_)[¶](#enum.Flag.__iter__ "Link to this definition")

返回所有包含的非别名成员:

\>>> list(Color.RED)
\[<Color.RED: 1>\]
\>>> list(purple)
\[<Color.RED: 1>, <Color.BLUE: 4>\]

Added in version 3.11.

\_\_len\_\_(_self_)[¶](#enum.Flag.__len__ "Link to this definition")

返回旗标中成员的数量:

\>>> len(Color.GREEN)
1
\>>> len(white)
3

Added in version 3.11.

\_\_bool\_\_(_self_)[¶](#enum.Flag.__bool__ "Link to this definition")

如果旗标中有成员则返回 _True_，否则返回 _False_:

\>>> bool(Color.GREEN)
True
\>>> bool(white)
True
\>>> black \= Color(0)
\>>> bool(black)
False

\_\_or\_\_(_self_, _other_)[¶](#enum.Flag.__or__ "Link to this definition")

返回当前旗标与另一个旗标执行二进制或运算的结果:

\>>> Color.RED | Color.GREEN
<Color.RED|GREEN: 3>

\_\_and\_\_(_self_, _other_)[¶](#enum.Flag.__and__ "Link to this definition")

返回当前旗标与另一个旗标执行二进制与运算的结果:

\>>> purple & white
<Color.RED|BLUE: 5>
\>>> purple & Color.GREEN
<Color: 0>

\_\_xor\_\_(_self_, _other_)[¶](#enum.Flag.__xor__ "Link to this definition")

返回当前旗标与另一个旗标执行二进制异或运算的结果:

\>>> purple ^ white
<Color.GREEN: 2>
\>>> purple ^ Color.GREEN
<Color.RED|GREEN|BLUE: 7>

\_\_invert\_\_(_self_)[¶](#enum.Flag.__invert__ "Link to this definition")

返回 _type(self)_ 中所有不在 _self_ 中的旗标:

\>>> ~white
<Color: 0>
\>>> ~purple
<Color.GREEN: 2>
\>>> ~Color.RED
<Color.GREEN|BLUE: 6>

\_numeric\_repr\_()[¶](#enum.Flag._numeric_repr_ "Link to this definition")

用于格式化任何其他未命名数字值的函数。默认为数字值的 repr；常见的选择有 [`hex()`](https://docs.python.org/zh-cn/3/builtins/functions.html#hex "hex") 和 [`oct()`](https://docs.python.org/zh-cn/3/builtins/functions.html#oct "oct")。

备注

将 [`auto`](#enum.auto "enum.auto") 用于 [`Flag`](#enum.Flag "enum.Flag") 将得到二的整数次方，从 `1` 开始。

在 3.11 版本发生变更: 零值旗标的 _repr()_ 已被修改。现在将是：

\>>> Color(0)
<Color: 0>

_class_ enum.IntFlag[¶](#enum.IntFlag "Link to this definition")

`IntFlag` 与 [`Flag`](#enum.Flag "enum.Flag") 相同，但其成员还属于整数类型并能被用于任何可以使用整数的地方。

\>>> from enum import IntFlag, auto
\>>> class Color(IntFlag):
...     RED \= auto()
...     GREEN \= auto()
...     BLUE \= auto()
...
\>>> Color.RED & 2
<Color: 0>
\>>> Color.RED | 2
<Color.RED|GREEN: 3>

如果对一个 _IntFlag_ 成员执行任何整数运算，结果将不再是一个 _IntFlag_:

\>>> Color.RED + 2
3

如果对一个 _IntFlag_ 成员执行 [`Flag`](#enum.Flag "enum.Flag") 操作并且：

-   结果是一个合法的 _IntFlag_: 将返回一个 _IntFlag_
    
-   其结果将不是合法的 _IntFlag_: 具体结果将取决于 [`FlagBoundary`](#enum.FlagBoundary "enum.FlagBoundary") 设置
    

未命名旗标的 [`repr()`](https://docs.python.org/zh-cn/3/builtins/functions.html#repr "repr") 已被修改。现在将是:

\>>> Color(0)
<Color: 0>

备注

将 [`auto`](#enum.auto "enum.auto") 用于 [`IntFlag`](#enum.IntFlag "enum.IntFlag") 将得到二的整数次方，从 `1` 开始。

在 3.11 版本发生变更: [`__str__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__str__ "object.__str__") 现在是 `int.__str__()` 以更好地支持 _现有常量的替换_ 应用场景。 出于同样的原因 [`__format__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__format__ "object.__format__") 也已经是 `int.__format__()`。

对一个 `IntFlag` 的反转现在将返回一个等于不在给定旗标中的所有旗标的并集的正值，而非一个负值。这与现有 [`Flag`](#enum.Flag "enum.Flag") 的行为相匹配。

_class_ enum.ReprEnum[¶](#enum.ReprEnum "Link to this definition")

`ReprEnum` 将使用 [`Enum`](#enum.Enum "enum.Enum") 的 [`repr()`](#enum.Enum.__repr__ "enum.Enum.__repr__")，但使用混入数据类型的 [`str()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str"):

-   `int.__str__()` 用于 [`IntEnum`](#enum.IntEnum "enum.IntEnum") 和 [`IntFlag`](#enum.IntFlag "enum.IntFlag")
    
-   `str.__str__()` 用于 [`StrEnum`](#enum.StrEnum "enum.StrEnum")
    

从 `ReprEnum` 继承以保留混入数据类型的 [`str()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") / [`format()`](https://docs.python.org/zh-cn/3/builtins/functions.html#format "format") 而不是使用 [`Enum`](#enum.Enum "enum.Enum") 默认的 [`str()`](#enum.Enum.__str__ "enum.Enum.__str__")。

Added in version 3.11.

_class_ enum.EnumCheck[¶](#enum.EnumCheck "Link to this definition")

_EnumCheck_ 包含由 [`verify()`](#enum.verify "enum.verify") 装饰器用来确保各种约束的选项；失败的约束将导致 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

UNIQUE[¶](#enum.EnumCheck.UNIQUE "Link to this definition")

确保每个值只有一个名称:

\>>> from enum import Enum, verify, UNIQUE
\>>> @verify(UNIQUE)
... class Color(Enum):
...     RED \= 1
...     GREEN \= 2
...     BLUE \= 3
...     CRIMSON \= 1
Traceback (most recent call last):
...
ValueError: aliases found in <enum 'Color'>: CRIMSON -> RED

CONTINUOUS[¶](#enum.EnumCheck.CONTINUOUS "Link to this definition")

确保在最低值成员和最高值成员之间没有缺失的值:

\>>> from enum import Enum, verify, CONTINUOUS
\>>> @verify(CONTINUOUS)
... class Color(Enum):
...     RED \= 1
...     GREEN \= 2
...     BLUE \= 5
Traceback (most recent call last):
...
ValueError: invalid enum 'Color': missing values 3, 4

NAMED\_FLAGS[¶](#enum.EnumCheck.NAMED_FLAGS "Link to this definition")

确保任何旗标分组/掩码只包含已命名的旗标 -- 在值是明确指定而不是由 [`auto()`](#enum.auto "enum.auto") 生成时将很有用处:

\>>> from enum import Flag, verify, NAMED\_FLAGS
\>>> @verify(NAMED\_FLAGS)
... class Color(Flag):
...     RED \= 1
...     GREEN \= 2
...     BLUE \= 4
...     WHITE \= 15
...     NEON \= 31
Traceback (most recent call last):
...
ValueError: invalid Flag 'Color': aliases WHITE and NEON are missing combined values of 0x18 \[use enum.show\_flag\_values(value) for details\]

备注

CONTINUOUS 和 NAMED\_FLAGS 被设计用于配合整数值成员。

Added in version 3.11.

_class_ enum.FlagBoundary[¶](#enum.FlagBoundary "Link to this definition")

`FlagBoundary` 控制在 [`Flag`](#enum.Flag "enum.Flag") 及其子类中如何处理超出范围的值。

STRICT[¶](#enum.FlagBoundary.STRICT "Link to this definition")

超出范围的值将导致引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。这是 [`Flag`](#enum.Flag "enum.Flag") 的默认设置:

\>>> from enum import Flag, STRICT, auto
\>>> class StrictFlag(Flag, boundary\=STRICT):
...     RED \= auto()
...     GREEN \= auto()
...     BLUE \= auto()
...
\>>> StrictFlag(2\*\*2 + 2\*\*4)
Traceback (most recent call last):
...
ValueError: <flag 'StrictFlag'> invalid value 20
    given 0b0 10100
  allowed 0b0 00111

CONFORM[¶](#enum.FlagBoundary.CONFORM "Link to this definition")

超出范围的值将导致无效的值被移除，保留有效的 [`Flag`](#enum.Flag "enum.Flag") 值:

\>>> from enum import Flag, CONFORM, auto
\>>> class ConformFlag(Flag, boundary\=CONFORM):
...     RED \= auto()
...     GREEN \= auto()
...     BLUE \= auto()
...
\>>> ConformFlag(2\*\*2 + 2\*\*4)
<ConformFlag.BLUE: 4>

EJECT[¶](#enum.FlagBoundary.EJECT "Link to this definition")

超出范围的值将失去其 [`Flag`](#enum.Flag "enum.Flag") 成员资格并转换为 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")。

\>>> from enum import Flag, EJECT, auto
\>>> class EjectFlag(Flag, boundary\=EJECT):
...     RED \= auto()
...     GREEN \= auto()
...     BLUE \= auto()
...
\>>> EjectFlag(2\*\*2 + 2\*\*4)
20

KEEP[¶](#enum.FlagBoundary.KEEP "Link to this definition")

超出范围的值将被保留，[`Flag`](#enum.Flag "enum.Flag") 成员资格也将被保留。这是 [`IntFlag`](#enum.IntFlag "enum.IntFlag") 的默认设置:

\>>> from enum import Flag, KEEP, auto
\>>> class KeepFlag(Flag, boundary\=KEEP):
...     RED \= auto()
...     GREEN \= auto()
...     BLUE \= auto()
...
\>>> KeepFlag(2\*\*2 + 2\*\*4)
<KeepFlag.BLUE|16: 20>

Added in version 3.11.

_class_ enum.EnumDict[¶](#enum.EnumDict "Link to this definition")

_EnumDict_ 是一个用作定义枚举类的命名空间的 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict") 子类 (参见 [准备类命名空间](https://docs.python.org/zh-cn/3/reference/datamodel.html#prepare))。 它被对外公开以允许 [`EnumType`](#enum.EnumType "enum.EnumType") 的子类具有高级行为如每个成员可包含多个值。 它在调用时应当传入被创建的枚举类的名称，否则私有名称和内部类将无法被正确地处理。

请注意只有 [`MutableMapping`](https://docs.python.org/zh-cn/3/library/collections.abc.html#collections.abc.MutableMapping "collections.abc.MutableMapping") 接口 ([`__setitem__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__setitem__ "object.__setitem__") 和 [`update()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict.update "dict.update")) 会被重写。有可能使用其他 `dict` 操作如 [`|=`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__ior__ "object.__ior__") 来绕过此项检查。

member\_names[¶](#enum.EnumDict.member_names "Link to this definition")

由成员名称组成的列表。

Added in version 3.13.

* * *

### 支持的 `__dunder__` 名称[¶](#supported-dunder-names "Link to this heading")

[`__members__`](#enum.EnumType.__members__ "enum.EnumType.__members__") 是由 `member_name`:`member` 条目组成的只读有序映射。 它只在类上可用。

[`__new__()`](#enum.Enum.__new__ "enum.Enum.__new__"), if specified, must create and return the enum members; it is also a very good idea to set the member's [`_value_`](#enum.Enum._value_ "enum.Enum._value_") appropriately. Once all the members are created it is no longer used.

### 支持的 `_sunder_` 名称[¶](#supported-sunder-names "Link to this heading")

-   [`_name_`](#enum.Enum._name_ "enum.Enum._name_") -- 成员的名称
    
-   [`_value_`](#enum.Enum._value_ "enum.Enum._value_") -- 成员的值；可在 `__new__` 中设置
    
-   [`_missing_()`](#enum.Enum._missing_ "enum.Enum._missing_") -- 当未找到某个值时所使用的查找函数；可被重写
    
-   [`_ignore_`](#enum.Enum._ignore_ "enum.Enum._ignore_") -- 一个名称列表，可以为 [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 或 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")，它不会被转化为成员，并将从最终类中移除
    
-   [`_order_`](#enum.Enum._order_ "enum.Enum._order_") -- 已不再使用，保留以便向下兼容（类属性，在类创建期间移除）
    
-   [`_generate_next_value_()`](#enum.Enum._generate_next_value_ "enum.Enum._generate_next_value_") -- 用于为枚举成员获取适当的值；可被重写
    
-   [`_add_alias_()`](#enum.Enum._add_alias_ "enum.Enum._add_alias_") -- 添加一个新名称作为现有成员的别名。
    
-   [`_add_value_alias_()`](#enum.Enum._add_value_alias_ "enum.Enum._add_value_alias_") -- 添加一个新值作为现有成员的别名。
    
-   虽然 `_sunder_` 名称通常被保留用于 [`Enum`](#enum.Enum "enum.Enum") 类的后续开发因而不可被使用，但有一些则被显式地允许：
    
    -   `_repr_*` (例如 `_repr_html_`)，用于 [IPython's rich display](https://ipython.readthedocs.io/en/stable/config/integrating.html#rich-display)
        

Added in version 3.6: `_missing_`, `_order_`, `_generate_next_value_`

Added in version 3.7: `_ignore_`

Added in version 3.13: `_add_alias_`, `_add_value_alias_`, `_repr_*`

* * *

## Utilities and decorators[¶](#utilities-and-decorators "Link to this heading")

_class_ enum.auto[¶](#enum.auto "Link to this definition")

_auto_ 可被用来替换某个值。如果使用，_Enum_ 机制将调用一个 [`Enum`](#enum.Enum "enum.Enum") 的 [`_generate_next_value_()`](#enum.Enum._generate_next_value_ "enum.Enum._generate_next_value_") 来获取适当的值。对于 `Enum` 和 [`IntEnum`](#enum.IntEnum "enum.IntEnum") 这个适当的值将为最后的值加一；对于 [`Flag`](#enum.Flag "enum.Flag") 和 [`IntFlag`](#enum.IntFlag "enum.IntFlag") 它将为首个大于最高值的二的整数次方；对于 [`StrEnum`](#enum.StrEnum "enum.StrEnum") 它将为成员名称的小写版本。如果将 _auto()_ 与手动指定的值混用则必须十分小心。

_auto_ 实例仅会在赋值操作的最高层级上作为本身或元组的一部分被解析。

-   `FIRST = auto()` 将是可用的 (auto() 会被替换为 `1`);
    
-   `SECOND = auto(), -2` 将是可用的 (auto 会被替换为 `2`，因此将使用 `2, -2` 来创建 `SECOND` 枚举成员；
    
-   `THREE = [auto(), -3]` 将 _不能_ 解析 (`[<auto instance>, -3]` 会被用来创建 `THREE` 枚举成员)
    

在 3.11.1 版本发生变更: 在之前的版本中，`auto()` 必须为赋值行中唯一的内容才是可用的。

`_generate_next_value_` 可以被重写以便自定义 _auto_ 所使用的值。

备注

在 3.13 中默认的 `_generate_next_value_` 将总是返回最高成员值递增 1 的结果，并且如果有任何成员为不兼容的类型则将失败。

@enum.property[¶](#enum.property "Link to this definition")

A decorator similar to the built-in [`@property`](https://docs.python.org/zh-cn/3/builtins/functions.html#property "property"), but specifically for enumerations. It allows member attributes to have the same names as members themselves.

备注

_property_ 和成员必须在单独的类中定义；例如 _value_ 和 _name_ 属性是在 _Enum_ 类中定义，而 _Enum_ 的子类可以定义名称为 `value` 和 `name` 的成员。

Added in version 3.11.

@enum.unique[¶](#enum.unique "Link to this definition")

一个专用于枚举的 [`class`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#class) 装饰器。它将搜索一个枚举的 [`__members__`](#enum.EnumType.__members__ "enum.EnumType.__members__")，收集它所找到的任何别名；如果找到了任何别名则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 并附带详情:

\>>> from enum import Enum, unique
\>>> @unique
... class Mistake(Enum):
...     ONE \= 1
...     TWO \= 2
...     THREE \= 3
...     FOUR \= 3
...
Traceback (most recent call last):
...
ValueError: duplicate values found in <enum 'Mistake'>: FOUR -> THREE

@enum.verify[¶](#enum.verify "Link to this definition")

一个专用于枚举的 [`class`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#class) 装饰器。将使用来自 [`EnumCheck`](#enum.EnumCheck "enum.EnumCheck") 的成员指明应当在被装饰的枚举上检查哪些约束。

Added in version 3.11.

@enum.member[¶](#enum.member "Link to this definition")

一个在枚举中使用的装饰器：它的目标将成为一个成员。

Added in version 3.11.

@enum.nonmember[¶](#enum.nonmember "Link to this definition")

一个在枚举中使用的装饰器：它的目标将不会成为一个成员。

Added in version 3.11.

@enum.global\_enum[¶](#enum.global_enum "Link to this definition")

一个修改枚举的 [`str()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 和 [`repr()`](https://docs.python.org/zh-cn/3/builtins/functions.html#repr "repr") 来将其成员显示为属于模块而不是类的装饰器。 应当仅在枚举成员被导出到模块全局命名空间时（请参看 [`re.RegexFlag`](https://docs.python.org/zh-cn/3/library/re.html#re.RegexFlag "re.RegexFlag") 获取示例）使用。

Added in version 3.11.

enum.show\_flag\_values(_value_)[¶](#enum.show_flag_values "Link to this definition")

返回旗标 _value_ 中包含的所有二的整数次幂的列表。

Added in version 3.11.

enum.bin(_num_, _max\_bits\=None_)[¶](#enum.bin "Link to this definition")

与内置的 [`bin()`](https://docs.python.org/zh-cn/3/builtins/functions.html#bin "bin") 类似，区别在于负值将以补码表示，并且打头的比特位总是指明正负性 (`0` 表示正值，`1` 表示负值)。

\>>> import enum
\>>> enum.bin(10)
'0b0 1010'
\>>> enum.bin(~10)   \# ~10 is -11
'0b1 0101'

Added in version 3.11.

* * *

## 备注[¶](#notes "Link to this heading")

[`IntEnum`](#enum.IntEnum "enum.IntEnum"), [`StrEnum`](#enum.StrEnum "enum.StrEnum") 和 [`IntFlag`](#enum.IntFlag "enum.IntFlag")

> 这三个枚举类型被设计用来快速替代现有的基于整数和字符串的值；为此，它们都有额外的限制：
> 
> -   `__str__` 使用枚举成员的值而不是名称
>     
> -   `__format__`，因为它使用了 `__str__`，也将使用枚举成员的值而不是其名称
>     
> 
> 如果你不需要/希望有这些限制，你可以通过自行混入 `int` 或 `str` 类型来创建你自己的基类:
> 
> \>>> from enum import Enum
> \>>> class MyIntEnum(int, Enum):
> ...     pass
> 
> 或者你也可以在你的枚举中重新赋值适当的 [`str()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 等:
> 
> \>>> from enum import Enum, IntEnum
> \>>> class MyIntEnum(IntEnum):
> ...     \_\_str\_\_ \= Enum.\_\_str\_\_
