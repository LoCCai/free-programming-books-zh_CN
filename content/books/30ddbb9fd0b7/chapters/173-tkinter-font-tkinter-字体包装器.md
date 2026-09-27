**源代码:** [Lib/tkinter/font.py](https://github.com/python/cpython/tree/3.14/Lib/tkinter/font.py)

* * *

`tkinter.font` 模块提供了 [`Font`](#tkinter.font.Font "tkinter.font.Font") 类，用于创建和使用命名字体。

不同的字体粗细和倾斜是：

tkinter.font.NORMAL[¶](#tkinter.font.NORMAL "Link to this definition")

tkinter.font.BOLD[¶](#tkinter.font.BOLD "Link to this definition")

tkinter.font.ITALIC[¶](#tkinter.font.ITALIC "Link to this definition")

tkinter.font.ROMAN[¶](#tkinter.font.ROMAN "Link to this definition")

_class_ tkinter.font.Font(_root\=None_, _font\=None_, _name\=None_, _exists\=False_, _\*\*options_)[¶](#tkinter.font.Font "Link to this definition")

[`Font`](#tkinter.font.Font "tkinter.font.Font") 类表示命名字体。_Font_ 实例具有唯一的名称，可以通过其族、大小和样式配置进行指定。命名字体是 Tk 将字体创建和标识为单个对象的方法，而不是通过每次出现时的属性来指定字体。

在 3.10 版本发生变更: 现在两个字体相等 (`==`) 的条件是两者都是 [`Font`](#tkinter.font.Font "tkinter.font.Font") 实例并且具有属于相同 Tcl 解释器的相同名称。

参数：

> _font_ - 字体指示符元组 (family, size, options)
> 
> _name_ - 唯一的字体名
> 
> _exists_ - 指向现有命名字体（如果有）

其他关键字选项（如果指定了 _font_，则忽略）：

> _family_ - 实体族，例如 Courier, Times
> 
> _size_ - 字体大小
> 
> 如果 _size_ 为正数，则解释为以磅为单位的大小。
> 
> 如果 _size_ 是负数，则将其绝对值
> 
> 解释为以像素为单位的大小。
> 
> _weight_ - 字体强调 (NORMAL, BOLD)（普通，加粗）
> 
> _slant_ - ROMAN, ITALIC（正体，斜体）
> 
> _underline_ - 字体下划线（0 - 无下划线，1 - 有下划线）
> 
> _overstrike_ - 字体删除线（0 - 无删除线，1 - 有删除线）

actual(_option\=None_, _displayof\=None_)[¶](#tkinter.font.Font.actual "Link to this definition")

Return the actual attributes of the font, which may differ from the requested ones because of platform limitations. With no _option_, return a dictionary of all the attributes; if _option_ is given, return the value of that single attribute. The attributes are resolved on the display of the _displayof_ widget, or the main application window if it is not specified.

cget(_option_)[¶](#tkinter.font.Font.cget "Link to this definition")

检索字体的某一个属性值。

configure(_\*\*options_)[¶](#tkinter.font.Font.configure "Link to this definition")

Modify one or more attributes of the font. With no arguments, return a dictionary of the current attributes.

[`config()`](#tkinter.font.Font.config "tkinter.font.Font.config") 是 `configure()` 的别名。

copy()[¶](#tkinter.font.Font.copy "Link to this definition")

Return a distinct copy of the current font: a new named font with the same attributes but a different name, which can be reconfigured independently of the original. If the current font wraps a font description, the copy is instead a named font with its resolved attributes.

measure(_text_, _displayof\=None_)[¶](#tkinter.font.Font.measure "Link to this definition")

Return amount of space the text would occupy on the specified display when formatted in the current font, as an integer number of pixels. If no display is specified then the main application window is assumed.

metrics(_\*options_, _\*\*kw_)[¶](#tkinter.font.Font.metrics "Link to this definition")

Return font-specific data. With no options, return a dictionary mapping each metric name to its integer value; if one option name is given, return that metric's value as an integer. Options include:

_ascent_ - 基线和最高点之间的距离

（在该字体中的一个字符可以占用的空间中）

_descent_ - 基线和最低点之间的距离

（在该字体中的一个字符可以占用的空间中）

_linespace_ - 所需最小垂直间距（在两个

该字体的字符间，使得这两个字符在垂直方向上不重叠）。

_fixed_ - 如果该字体是等宽字体则为 1，否则为 0。

tkinter.font.families(_root\=None_, _displayof\=None_)[¶](#tkinter.font.families "Link to this definition")

Return a tuple of the names of the available font families.

tkinter.font.names(_root\=None_)[¶](#tkinter.font.names "Link to this definition")

Return a tuple of the names of all the defined fonts.

tkinter.font.nametofont(_name_, _root\=None_)[¶](#tkinter.font.nametofont "Link to this definition")

Return a [`Font`](#tkinter.font.Font "tkinter.font.Font") representation of the existing named font _name_. _root_ is the widget whose Tcl interpreter owns the font; if omitted, the default root window is used.

在 3.10 版本发生变更: 增加了 _root_ 形参。
