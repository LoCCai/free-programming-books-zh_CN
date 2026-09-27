**源代码:** [Lib/tkinter/ttk.py](https://github.com/python/cpython/tree/3.14/Lib/tkinter/ttk.py)

* * *

The `tkinter.ttk` module provides access to the Tk themed widget set, introduced in Tk 8.5. Its widgets adapt their appearance to the platform's native theme, giving an application a better and more consistent look and feel than the classic [`tkinter`](https://docs.python.org/zh-cn/3/library/tkinter.html#module-tkinter "tkinter: Interface to Tcl/Tk for graphical user interfaces") widgets, whose appearance is fixed.

`tkinter.ttk` 的基本思路是尽可能将实现控件行为的代码与实现其外观的代码分离开来。

Ttk widgets are used just like the classic [`tkinter`](https://docs.python.org/zh-cn/3/library/tkinter.html#module-tkinter "tkinter: Interface to Tcl/Tk for graphical user interfaces") widgets and share the same machinery: the widget hierarchy, the geometry managers, variable coupling and event binding. Those foundational concepts are covered in the `tkinter` documentation and are not repeated here.

Added in version 3.1.

## ttk 的用法[¶](#using-ttk "Link to this heading")

使用 ttk 之前，首先要导入模块：

from tkinter import ttk

为了覆盖基础的 Tk 控件，应该在 Tk 之后进行导入：

from tkinter import \*
from tkinter.ttk import \*

That code causes several `tkinter.ttk` widgets ([`Button`](#tkinter.ttk.Button "tkinter.ttk.Button"), [`Checkbutton`](#tkinter.ttk.Checkbutton "tkinter.ttk.Checkbutton"), [`Entry`](#tkinter.ttk.Entry "tkinter.ttk.Entry"), [`Frame`](#tkinter.ttk.Frame "tkinter.ttk.Frame"), [`Label`](#tkinter.ttk.Label "tkinter.ttk.Label"), [`LabelFrame`](#tkinter.ttk.LabelFrame "tkinter.ttk.LabelFrame"), [`Menubutton`](#tkinter.ttk.Menubutton "tkinter.ttk.Menubutton"), [`OptionMenu`](#tkinter.ttk.OptionMenu "tkinter.ttk.OptionMenu"), [`PanedWindow`](#tkinter.ttk.PanedWindow "tkinter.ttk.PanedWindow"), [`Radiobutton`](#tkinter.ttk.Radiobutton "tkinter.ttk.Radiobutton"), [`Scale`](#tkinter.ttk.Scale "tkinter.ttk.Scale"), [`Scrollbar`](#tkinter.ttk.Scrollbar "tkinter.ttk.Scrollbar") and [`Spinbox`](#tkinter.ttk.Spinbox "tkinter.ttk.Spinbox")) to automatically replace the Tk widgets.

备注

Overriding the classic widgets with `from tkinter.ttk import *` is convenient for adapting existing code, but new code is usually clearer if it imports the module as `from tkinter import ttk` and refers to the themed widgets explicitly, such as `ttk.Button`.

This has the direct benefit of using the new widgets which gives a better look and feel across platforms; however, the replacement widgets are not completely compatible. The main difference is that widget options such as `fg`, `bg` and others related to widget styling are no longer present in Ttk widgets. Instead, use the [`ttk.Style`](#tkinter.ttk.Style "tkinter.ttk.Style") class for improved styling effects.

## Ttk 控件[¶](#ttk-widgets "Link to this heading")

Ttk comes with 18 widgets, twelve of which already existed in tkinter: [`Button`](#tkinter.ttk.Button "tkinter.ttk.Button"), [`Checkbutton`](#tkinter.ttk.Checkbutton "tkinter.ttk.Checkbutton"), [`Entry`](#tkinter.ttk.Entry "tkinter.ttk.Entry"), [`Frame`](#tkinter.ttk.Frame "tkinter.ttk.Frame"), [`Label`](#tkinter.ttk.Label "tkinter.ttk.Label"), [`LabelFrame`](#tkinter.ttk.LabelFrame "tkinter.ttk.LabelFrame"), [`Menubutton`](#tkinter.ttk.Menubutton "tkinter.ttk.Menubutton"), [`PanedWindow`](#tkinter.ttk.PanedWindow "tkinter.ttk.PanedWindow"), [`Radiobutton`](#tkinter.ttk.Radiobutton "tkinter.ttk.Radiobutton"), [`Scale`](#tkinter.ttk.Scale "tkinter.ttk.Scale"), [`Scrollbar`](#tkinter.ttk.Scrollbar "tkinter.ttk.Scrollbar"), and [`Spinbox`](#tkinter.ttk.Spinbox "tkinter.ttk.Spinbox"). The other six are new: [`Combobox`](#tkinter.ttk.Combobox "tkinter.ttk.Combobox"), [`Notebook`](#tkinter.ttk.Notebook "tkinter.ttk.Notebook"), [`Progressbar`](#tkinter.ttk.Progressbar "tkinter.ttk.Progressbar"), [`Separator`](#tkinter.ttk.Separator "tkinter.ttk.Separator"), [`Sizegrip`](#tkinter.ttk.Sizegrip "tkinter.ttk.Sizegrip") and [`Treeview`](#tkinter.ttk.Treeview "tkinter.ttk.Treeview"). All of them are subclasses of [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

ttk 控件可以改善应用程序的外观。如上所述，修改样式的代码与 tk 控件存在差异。

Tk 代码:

l1 \= tkinter.Label(text\="Test", fg\="black", bg\="white")
l2 \= tkinter.Label(text\="Test", fg\="black", bg\="white")

Ttk 代码:

style \= ttk.Style()
style.configure("BW.TLabel", foreground\="black", background\="white")

l1 \= ttk.Label(text\="Test", style\="BW.TLabel")
l2 \= ttk.Label(text\="Test", style\="BW.TLabel")

有关 [TtkStyling](#ttkstyling) 的更多信息，请参阅 [`Style`](#tkinter.ttk.Style "tkinter.ttk.Style") 类文档。

## 控件[¶](#widget "Link to this heading")

[`ttk.Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget") defines standard options and methods supported by Tk themed widgets and is not supposed to be directly instantiated.

### 标准选项[¶](#standard-options "Link to this heading")

所有 `ttk` 控件均接受下列选项：

| 
属性

 | 

描述

 |
| --- | --- |
| 

class

 | 

指定窗口类。若要从参数库中查找窗口的其他属性，或确认窗口的默认绑定标签，或选择控件的默认布局和样式，会用到 class 属性。该属性只读，且只能在创建窗口时指定。

 |
| 

cursor

 | 

Specifies the mouse cursor to be used for the widget. See the _cursor_ option type under [Tk 选项数据类型](https://docs.python.org/zh-cn/3/library/tkinter.html#tk-option-data-types). If set to the empty string (the default), the cursor is inherited from the parent widget.

 |
| 

takefocus

 | 

决定了窗口是否可用键盘获得焦点。返回 0 、1 或空字符串。若返回 0，则表示在用键盘遍历时应该跳过该窗口。如果为 1，则表示只要窗口可见即应接收输入焦点。而空字符串则表示由遍历代码决定窗口是否接收焦点。

 |
| 

style

 | 

可用于指定自定义控件样式。

 |

### 可滚动控件选项[¶](#scrollable-widget-options "Link to this heading")

带滚动条的控件支持以下属性：

| 
属性

 | 

描述

 |
| --- | --- |
| 

xscrollcommand

 | 

用于与水平滚动条通讯.

When the view in the widget's window changes, the widget calls the _xscrollcommand_ callback.

Usually this option consists of the method [`Scrollbar.set`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Scrollbar.set "tkinter.Scrollbar.set") of some scrollbar. This will cause the scrollbar to be updated whenever the view in the window changes.

 |
| 

yscrollcommand

 | 

用于与垂直滚动条通讯，更多信息请参考上一条。

 |

### 标签选项[¶](#label-options "Link to this heading")

标签、按钮和类似按钮的控件支持以下属性。

| 
属性

 | 

描述

 |
| --- | --- |
| 

text

 | 

指定显示在控件内的文本。

 |
| 

textvariable

 | 

指定一个变量名，其值将用于设置 text 属性。

 |
| 

underline

 | 

设置文本字符串中带下划线字符的索引（基于0）。下划线字符用于激活快捷键。

 |
| 

image

 | 

指定一个用于显示的图片。这是一个由1个或多个元素组成的列表。第一个元素是默认的图片名称。列表的其余部分是由 [`Style.map()`](#tkinter.ttk.Style.map "tkinter.ttk.Style.map") 定义的“状态/值对”的序列，指定控件在某状态或状态组合时要采用的图片。列表中的所有图片应具备相同的尺寸。

 |
| 

compound

 | 

指定同时存在 text 和 image 属性时，应如何显示文本和对应的图片。合法的值包括：

-   text：只显示文本
    
-   image：只显示图片
    
-   top、bottom、left、right：分别在文本的上、下、左、右显示图片。
    
-   none：默认值。 如果给出了图片则显示，否则显示文本。
    

 |
| 

width

 | 

如果值大于零，指定文本标签留下多少空间，单位是字符数；如果值小于零，则指定最小宽度。如果等于零或未指定，则使用文本标签本身的宽度。

 |

### 兼容性选项[¶](#compatibility-options "Link to this heading")

| 
属性

 | 

描述

 |
| --- | --- |
| 

state

 | 

可以设为“normal”或“disabled”，以便控制“禁用”状态标志位。本属性只允许写入：用以改变控件的状态，但 [`Widget.state()`](#tkinter.ttk.Widget.state "tkinter.ttk.Widget.state") 方法不影响本属性。

 |

### 控件状态[¶](#widget-states "Link to this heading")

控件状态是多个相互独立的状态标志位的组合。

| 
标志位

 | 

描述

 |
| --- | --- |
| 

active

 | 

鼠标光标经过控件并按下鼠标按钮，将引发动作。

 |
| 

disabled

 | 

控件处于禁用状态，而由程序控制。

 |
| 

focus

 | 

控件接受键盘焦点。

 |
| 

pressed

 | 

控件已被按下。

 |
| 

selected

 | 

勾选或单选框之类的控件，表示启用、选中状态。

 |
| 

background

 | 

Windows 和 Mac 系统的窗口具有“激活”或前台窗口的概念。后台窗口中的控件会设置 _background_ 状态，而前台窗口中的控件则会清除此状态。

 |
| 

readonly

 | 

控件不允许用户修改。

 |
| 

alternate

 | 

控件的备选显示格式。

 |
| 

invalid

 | 

控件的值是无效的

 |

所谓的控件状态，就是一串状态名称的组合，可在某个名称前加上感叹号，表示该状态位是关闭的。

### ttk.Widget[¶](#ttk-widget "Link to this heading")

Besides the methods described below, the [`ttk.Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget") supports the methods [`tkinter.Widget.cget`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Misc.cget "tkinter.Misc.cget") and [`tkinter.Widget.configure`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Misc.configure "tkinter.Misc.configure").

_class_ tkinter.ttk.Widget[¶](#tkinter.ttk.Widget "Link to this definition")

identify(_x_, _y_)[¶](#tkinter.ttk.Widget.identify "Link to this definition")

返回位于 _x_ _y_ 的控件名称，如果该坐标点不属于任何控件，则返回空字符串。

_x_ 和 _y_ 是控件内的相对坐标，单位是像素。

instate(_statespec_, _callback\=None_, _\*args_, _\*\*kw_)[¶](#tkinter.ttk.Widget.instate "Link to this definition")

检测控件的状态。如果没有设置回调函数，那么当控件状态符合 _statespec_ 时返回 `True`，否则返回 `False`。如果指定了回调函数，那么当控件状态匹配 _statespec_ 时将会调用回调函数，且会带上后面的参数。

state(_statespec\=None_)[¶](#tkinter.ttk.Widget.state "Link to this definition")

修改或查询部件状态。 如果指定了 _statespec_，则会用它来设置部件状态并返回一个新的 _statespec_ 来指明哪些旗标做过改动。 如果未指定 _statespec_，则返回当前启用的状态旗标。

不要与 [`Wm.state`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Wm.state "tkinter.Wm.state") 相混淆。

_statespec_ 通常是个列表或元组。

## Combobox[¶](#combobox "Link to this heading")

[`ttk.Combobox`](#tkinter.ttk.Combobox "tkinter.ttk.Combobox") 控件是文本框和可选值下拉列表框的结合。 该控件是 [`Entry`](#tkinter.ttk.Entry "tkinter.ttk.Entry") 的子类。

Besides the methods inherited from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget"): [`cget()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Misc.cget "tkinter.Misc.cget"), [`configure()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Misc.configure "tkinter.Misc.configure"), [`identify()`](#tkinter.ttk.Widget.identify "tkinter.ttk.Widget.identify"), [`instate()`](#tkinter.ttk.Widget.instate "tkinter.ttk.Widget.instate") and [`state()`](#tkinter.ttk.Widget.state "tkinter.ttk.Widget.state"), and the following inherited from [`Entry`](#tkinter.ttk.Entry "tkinter.ttk.Entry"): [`bbox()`](#tkinter.ttk.Entry.bbox "tkinter.ttk.Entry.bbox"), [`delete()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Entry.delete "tkinter.Entry.delete"), [`icursor()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Entry.icursor "tkinter.Entry.icursor"), [`index()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Entry.index "tkinter.Entry.index"), [`insert()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Entry.insert "tkinter.Entry.insert"), [`selection*`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Entry.selection_adjust "tkinter.Entry.selection_adjust"), [`xview*`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.XView.xview "tkinter.XView.xview"), it has some other methods, described at [`ttk.Combobox`](#tkinter.ttk.Combobox "tkinter.ttk.Combobox").

### 属性[¶](#options "Link to this heading")

控件可设置以下属性：

| 
属性

 | 

描述

 |
| --- | --- |
| 

exportselection

 | 

Boolean value. If set, the widget selection is linked to the X selection (which can be returned by invoking Misc.selection\_get, for example).

 |
| 

justify

 | 

指定文本在控件中的对齐方式。可为 left、center、right 之一。

 |
| 

height

 | 

设置下拉列表框的高度。

 |
| 

postcommand

 | 

在显示之前将被调用的代码（可用 Misc.register 进行注册）。可用于选择要显示的值。

 |
| 

state

 | 

One of "normal", "readonly", or "disabled". In the "readonly" state, the value may not be edited directly, and the user can only select one of the values from the dropdown list. In the "normal" state, the text field is directly editable. In the "disabled" state, no interaction is possible.

 |
| 

textvariable

 | 

设置一个变量名，其值与控件的值关联。每当该变量对应的值发生变动时，控件值就会更新，反之亦然。参见 [`tkinter.StringVar`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.StringVar "tkinter.StringVar") 。

 |
| 

values

 | 

设置显示于下拉列表中的值。

 |
| 

width

 | 

设置为整数值，表示输入窗口的应有宽度，单位是字符单位（控件字体的平均字符宽度）。

 |

备注

Tk 9.1 added the _locale_ option, which selects the locale used to determine word and character boundaries within the text (`"C"` by default).

### 虚拟事件[¶](#virtual-events "Link to this heading")

当用户从下拉列表中选择某个元素时，控件会生成一条 **<<ComboboxSelected>>** 虚拟事件。

### ttk.Combobox[¶](#ttk-combobox "Link to this heading")

_class_ tkinter.ttk.Combobox[¶](#tkinter.ttk.Combobox "Link to this definition")

current(_newindex\=None_)[¶](#tkinter.ttk.Combobox.current "Link to this definition")

如果给出了 _newindex_，则把控件值设为 _newindex_ 位置的元素值。否则，返回当前值的索引，当前值未在列表中则返回 -1。

get()[¶](#tkinter.ttk.Combobox.get "Link to this definition")

返回控件的当前值。

set(_value_)[¶](#tkinter.ttk.Combobox.set "Link to this definition")

设置控件的值为 _value_ 。

## Spinbox[¶](#spinbox "Link to this heading")

The [`ttk.Spinbox`](#tkinter.ttk.Spinbox "tkinter.ttk.Spinbox") widget is a [`ttk.Entry`](#tkinter.ttk.Entry "tkinter.ttk.Entry") enhanced with increment and decrement arrows. It can be used for numbers or lists of string values. This widget is a subclass of `Entry`. Besides the methods inherited from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget"): [`cget()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Misc.cget "tkinter.Misc.cget"), [`configure()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Misc.configure "tkinter.Misc.configure"), [`identify()`](#tkinter.ttk.Widget.identify "tkinter.ttk.Widget.identify"), [`instate()`](#tkinter.ttk.Widget.instate "tkinter.ttk.Widget.instate") and [`state()`](#tkinter.ttk.Widget.state "tkinter.ttk.Widget.state"), and the following inherited from `Entry`: [`bbox()`](#tkinter.ttk.Entry.bbox "tkinter.ttk.Entry.bbox"), [`delete()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Entry.delete "tkinter.Entry.delete"), [`icursor()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Entry.icursor "tkinter.Entry.icursor"), [`index()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Entry.index "tkinter.Entry.index"), [`insert()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Entry.insert "tkinter.Entry.insert"), [`xview*`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.XView.xview "tkinter.XView.xview"), it has some other methods, described at `ttk.Spinbox`.

### 属性[¶](#id1 "Link to this heading")

控件可设置以下属性：

| 
属性

 | 

描述

 |
| --- | --- |
| 

from

 | 

浮点值。如若给出，则为递减按钮能够到达的最小值。作为参数使用时必须写成 `from_`，因为 `from` 是 Python 关键字。

 |
| 

to

 | 

浮点值。如若给出，则为递增按钮能够到达的最大值。

 |
| 

increment

 | 

浮点值。指定递增/递减按钮每次的修改量。默认值为 1.0。

 |
| 

values

 | 

字符串或浮点值构成的序列。如若给出，则递增/递减会在此序列元素间循环，而不是增减数值。

 |
| 

wrap

 | 

布尔值。若为 `True` ，则递增和递减按钮会由 `to` 值循环至 `from` 值，或由 `from` 值循环至 `to` 值。

 |
| 

format

 | 

字符串。指定递增/递减按钮的数字格式。必须以“%W.Pf”的格式给出，W 是填充的宽度，P 是小数精度，% 和 f 就是本身的含义。

 |
| 

command

 | 

Python 回调函数。只要递增或递减按钮按下之后，就会进行不带参数的调用。

 |

### 虚拟事件[¶](#id2 "Link to this heading")

用户若按下 <Up> ，则控件会生成 **<<Increment>>** 虚拟事件，若按下 <Down> 则会生成 **<<Decrement>>** 事件。

### ttk.Spinbox[¶](#ttk-spinbox "Link to this heading")

_class_ tkinter.ttk.Spinbox[¶](#tkinter.ttk.Spinbox "Link to this definition")

With a non-integer increment, see [numeric values and the locale](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter-numeric-locale).

Added in version 3.8.

get()[¶](#tkinter.ttk.Spinbox.get "Link to this definition")

返回控件的当前值。

set(_value_)[¶](#tkinter.ttk.Spinbox.set "Link to this definition")

设置控件值为 _value_。

## Notebook[¶](#notebook "Link to this heading")

Ttk Notebook 部件可管理由窗口组成的多项集并每次显示其中的某一个。 每个子窗口都与一个选项卡相关联，用户可以选择该选项卡来改变当前所显示的窗口。

### 属性[¶](#id3 "Link to this heading")

控件可设置以下属性：

| 
属性

 | 

描述

 |
| --- | --- |
| 

height

 | 

如若给出且大于 0，则指定面板的应有高度（不含内部 padding 或 tab）。否则会采用所有子窗口面板的最大高度。

 |
| 

padding

 | 

指定在控件外部添加的留白。padding 是最多包含四个值的列表，指定左顶右底的空间。如果给出的元素少于四个，底部值默认为顶部值，右侧值默认为左侧值，顶部值默认为左侧值。

 |
| 

width

 | 

若给出且大于 0，则设置面板的应有宽度（不含内部 padding）。否则将采用所有子窗口面板的最大宽度。

 |

### Tab 选项[¶](#tab-options "Link to this heading")

Tab 特有属性如下：

| 
属性

 | 

描述

 |
| --- | --- |
| 

state

 | 

可为 normal、disabled 或 hidden 之一。若为 disabled 则不能选中。若为 hidden 则不会显示。

 |
| 

sticky

 | 

Specifies how the child window is positioned within the pane area. Value is a string containing zero or more of the characters "n", "s", "e" or "w". Each letter refers to a side (north, south, east or west) that the child window will stick to, as per the [`grid`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Grid.grid "tkinter.Grid.grid") geometry manager.

 |
| 

padding

 | 

指定控件和面板之间的留白空间。格式与本控件的 padding 属性相同。

 |
| 

text

 | 

指定显示在 tab 上的文本。

 |
| 

image

 | 

指定显示在 tab 上的图片。参见 [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget") 的 image 属性。

 |
| 

compound

 | 

当文本和图片同时存在时，指定图片相对于文本的显示位置。合法的属性值参见 [Label Options](#label-options) 。

 |
| 

underline

 | 

指定下划线在文本字符串中的索引（基于0）。如果调用过了 [`Notebook.enable_traversal()`](#tkinter.ttk.Notebook.enable_traversal "tkinter.ttk.Notebook.enable_traversal")，带下划线的字符将用于激活快捷键。

 |

### Tab 标识符[¶](#tab-identifiers "Link to this heading")

The tab\_id present in several methods of [`ttk.Notebook`](#tkinter.ttk.Notebook "tkinter.ttk.Notebook") may take any of the following forms:

-   介于 0 和 tab 总数之间的整数值。
    
-   子窗口的名称。
    
-   以“@x,y”形式给出的位置，唯一标识了 tab 页。
    
-   字符串字面值 "current"，它标识当前被选中的选项卡
    
-   字符串字面值 "end"，它返回标签页的数量 (仅适用于 [`Notebook.index()`](#tkinter.ttk.Notebook.index "tkinter.ttk.Notebook.index"))
    

### 虚拟事件[¶](#id4 "Link to this heading")

当选中一个新 tab 页之后，控件会生成一条 **<<NotebookTabChanged>>** 虚拟事件。

### ttk.Notebook[¶](#ttk-notebook "Link to this heading")

_class_ tkinter.ttk.Notebook[¶](#tkinter.ttk.Notebook "Link to this definition")

add(_child_, _\*\*kw_)[¶](#tkinter.ttk.Notebook.add "Link to this definition")

添加一个新 tab 页。

如果窗口是由 Notebook 管理但处于隐藏状态，则会恢复到之前的位置。

可用属性请参见 [Tab Options](#tab-options) 。

forget(_tab\_id_)[¶](#tkinter.ttk.Notebook.forget "Link to this definition")

删除 _tab\_id_ 指定的 tab 页，对其关联的窗口不再作映射和管理。

This shadows the inherited geometry-manager `forget()`; use [`pack_forget()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Pack.pack_forget "tkinter.Pack.pack_forget"), [`grid_forget()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Grid.grid_forget "tkinter.Grid.grid_forget") or [`place_forget()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Place.place_forget "tkinter.Place.place_forget") to remove the widget itself from its manager.

hide(_tab\_id_)[¶](#tkinter.ttk.Notebook.hide "Link to this definition")

隐藏 _tab\_id_ 指定的 tab 页。

tab 页不会显示出来，但关联的窗口仍接受 Notebook 的管理，其配置属性会继续保留。隐藏的 tab 页可由 [`add()`](#tkinter.ttk.Notebook.add "tkinter.ttk.Notebook.add") 恢复。

identify(_x_, _y_)[¶](#tkinter.ttk.Notebook.identify "Link to this definition")

返回 tab 页内位置为 _x_、_y_ 的控件名称，若不存在则返回空字符串。

index(_tab\_id_)[¶](#tkinter.ttk.Notebook.index "Link to this definition")

返回 _tab\_id_ 指定 tab 页的索引值，如果 _tab\_id_ 为 end 则返回 tab 页的总数。

insert(_pos_, _child_, _\*\*kw_)[¶](#tkinter.ttk.Notebook.insert "Link to this definition")

在指定位置插入一个 tab。

_pos_ 可为字符串“end” 、整数索引值或子窗口名称。如果 _child_ 已由 Notebook 管理，则将其移至指定位置。

可用属性请参见 [Tab Options](#tab-options) 。

select(_tab\_id\=None_)[¶](#tkinter.ttk.Notebook.select "Link to this definition")

选中 _tab\_id_ 指定 tab。

关联的子窗口将被显示，而之前所选择的窗口（如果不同）将被取消映射关系。 如果省略 _tab\_id_，则返回当前被选中的面板的部件名称。

tab(_tab\_id_, _option\=None_, _\*\*kw_)[¶](#tkinter.ttk.Notebook.tab "Link to this definition")

查询或修改 _tab\_id_ 指定 tab 的属性。

如果未给出 _kw_ ，则返回由 tab 属性组成的字典。如果指定了 _option_，则返回其值。否则，设置属性值。

tabs()[¶](#tkinter.ttk.Notebook.tabs "Link to this definition")

Returns a tuple of windows managed by the notebook.

enable\_traversal()[¶](#tkinter.ttk.Notebook.enable_traversal "Link to this definition")

为包含 Notebook 的顶层窗口启用键盘遍历。

这将为包含 Notebook 的顶层窗口增加如下键盘绑定关系：

-   Control\-Tab ：选中当前 tab 之后的页。
    
-   Shift\-Control\-Tab ：选中当前 tab 之前的页。
    
-   Alt\-K ：这里 _K_ 是任意 tab 页的快捷键（带下划线）字符，将会直接选中该 tab。
    

Multiple notebooks in a single toplevel may be enabled for traversal, including nested notebooks. However, notebook traversal only works properly if all panes are direct children of the notebook.

## Progressbar[¶](#progressbar "Link to this heading")

The [`ttk.Progressbar`](#tkinter.ttk.Progressbar "tkinter.ttk.Progressbar") widget shows the status of a long-running operation. It can operate in two modes: 1) the determinate mode which shows the amount completed relative to the total amount of work to be done and 2) the indeterminate mode which provides an animated display to let the user know that work is progressing.

### 属性[¶](#id5 "Link to this heading")

控件可设置以下属性：

| 
属性

 | 

描述

 |
| --- | --- |
| 

orient

 | 

horizontal 或 vertical。指定进度条的显示方向。

 |
| 

length

 | 

指定进度条长轴的长度（横向为宽度，纵向则为高度）。

 |
| 

mode

 | 

determinate 或 indeterminate。

 |
| 

maximum

 | 

设定最大值。默认为 100。

 |
| 

value

 | 

进度条的当前值。在 determinate 模式下代表已完成的工作量。在 indeterminate 模式下，解释为 _maximum_ 的模；也就是说，当本值增至 _maximum_ 时，进度条完成了一个“周期”。

 |
| 

variable

 | 

与属性值关联的变量名。若给出，则当变量值变化时会自动设为进度条的值。

 |
| 

phase

 | 

只读属性。只要值大于 0 且在 determinate 模式下小于最大值，控件就会定期增大该属性值。当前主题可利用本属性提供额外的动画效果。

 |

### ttk.Progressbar[¶](#ttk-progressbar "Link to this heading")

_class_ tkinter.ttk.Progressbar[¶](#tkinter.ttk.Progressbar "Link to this definition")

start(_interval\=None_)[¶](#tkinter.ttk.Progressbar.start "Link to this definition")

开启自增模式：安排一个循环的定时器事件，每隔 _interval_ 毫秒调用一次 [`Progressbar.step()`](#tkinter.ttk.Progressbar.step "tkinter.ttk.Progressbar.step")。_interval_ 可省略，默认为 50毫秒。

step(_amount\=None_)[¶](#tkinter.ttk.Progressbar.step "Link to this definition")

将进度条的值增加 _amount_。

_amount_ 可省略，默认为 1.0。

stop()[¶](#tkinter.ttk.Progressbar.stop "Link to this definition")

停止自增模式：取消所有由 [`Progressbar.start()`](#tkinter.ttk.Progressbar.start "tkinter.ttk.Progressbar.start") 启动的循环定时器事件。

## Separator[¶](#separator "Link to this heading")

The [`ttk.Separator`](#tkinter.ttk.Separator "tkinter.ttk.Separator") widget displays a horizontal or vertical separator bar.

It has no other methods besides the ones inherited from [`ttk.Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

### 属性[¶](#id6 "Link to this heading")

属性如下：

| 
属性

 | 

描述

 |
| --- | --- |
| 

orient

 | 

horizontal 或 vertical。指定分隔条的方向。

 |

## Sizegrip[¶](#sizegrip "Link to this heading")

The [`ttk.Sizegrip`](#tkinter.ttk.Sizegrip "tkinter.ttk.Sizegrip") widget (also known as a grow box) allows the user to resize the containing toplevel window by pressing and dragging the grip.

This widget has neither specific options nor specific methods, besides the ones inherited from [`ttk.Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

### 与平台相关的注意事项[¶](#platform-specific-notes "Link to this heading")

-   在 macOS 上，顶层窗口默认自动包括了一个内置的大小控制柄。 再加一个 [`Sizegrip`](#tkinter.ttk.Sizegrip "tkinter.ttk.Sizegrip") 也没什么坏处，因为内置的控制柄会盖住该控件。
    

### Bug[¶](#bugs "Link to this heading")

-   If the containing toplevel's position was specified relative to the right or bottom of the screen (for example, ....), the [`Sizegrip`](#tkinter.ttk.Sizegrip "tkinter.ttk.Sizegrip") widget will not resize the window.
    
-   Sizegrip 仅支持往“东南”方向的缩放。
    

## Treeview[¶](#treeview "Link to this heading")

The [`ttk.Treeview`](#tkinter.ttk.Treeview "tkinter.ttk.Treeview") widget displays a hierarchical collection of items. Each item has a textual label, an optional image, and an optional list of data values. The data values are displayed in successive columns after the tree label.

数据值的显示顺序可用属性 `displaycolumns` 进行控制。树控件还可以显示列标题。数据列可通过数字或名称进行访问，各列的名称在属性 columns 中列出。参阅 [Column Identifiers](#column-identifiers)。

每个数据项都由唯一名称进行标识。如果调用者未提供数据项的 ID，树控件会自动生成。根有且只有一个，名为 `{}`。根本身不会显示出来；其子项将显示在顶层。

每个数据项均带有一个 tag 列表，可用于绑定事件及控制外观。

Treeview 组件支持水平和垂直滚动，滚动时会依据 [Scrollable Widget Options](#scrollable-widget-options) 描述的属性和 [`Treeview.xview()`](#tkinter.ttk.Treeview.xview "tkinter.ttk.Treeview.xview") 和 [`Treeview.yview()`](#tkinter.ttk.Treeview.yview "tkinter.ttk.Treeview.yview") 方法。

### 属性[¶](#id7 "Link to this heading")

控件可设置以下属性：

| 
属性

 | 

描述

 |
| --- | --- |
| 

columns

 | 

列标识的列表，定义了列的数量和名称。

 |
| 

displaycolumns

 | 

列标识的列表（索引可为符号或整数），指定要显示的数据列及显示顺序，或为字符串 “#all”。

 |
| 

height

 | 

指定可见的行数。注意：所需宽度由各列宽度之和决定。

 |
| 

padding

 | 

指定控件内部的留白。为不超过四个元素的长度列表。

 |
| 

selectmode

 | 

控制内部类如何进行选中项的管理。可为 extended、browse 或 none。若设为 extended（默认），则可选中多个项。若为 browse ，则每次只能选中一项。若为 none，则无法修改选中项。

请注意，代码和 tag 绑定可自由进行选中操作，不受本属性的限制。

 |
| 

show

 | 

由0个或下列值组成的列表，指定要显示树的哪些元素。

-   tree ：在 #0 列显示树的文本标签。
    
-   headings ：显示标题行。
    

The default is "tree headings", that is, show all elements.

**注意** ：第 #0 列一定是指 tree 列，即便未设置 show="tree" 也一样。

 |

备注

Tk 9.0 added several [`Treeview`](#tkinter.ttk.Treeview "tkinter.ttk.Treeview") features. The _selectmode_ option gained the values `"single"` and `"multiple"`; the new widget options _selecttype_ (`"item"` or `"cell"` selection), _striped_ (zebra-striped rows), and _titlecolumns_ / _titleitems_ (columns or rows frozen against scrolling) were introduced; the column _separator_ option was added; and items gained a _hidden_ option. Tk 9.1 added the _rowheight_ and _headingheight_ options.

### 条目选项[¶](#item-options "Link to this heading")

可在插入和数据项操作时设置以下属性。

| 
属性

 | 

描述

 |
| --- | --- |
| 

text

 | 

用于显示的文本标签。

 |
| 

image

 | 

Tk 图片对象，显示在文本标签左侧。

 |
| 

values

 | 

关联的数据值列表。

每个数据项关联的数据数量应与 columns 属性相同。如果比 columns 属性的少，剩下的值将视为空。如果多于 columns 属性的，多余数据将被忽略。

 |
| 

open

 | 

`True` 或 `False`，表明是否显示数据项的子树。

 |
| 

tags

 | 

与该数据项关联的 tag 列表。

 |

### Tag 选项[¶](#tag-options "Link to this heading")

tag 可定义以下属性：

| 
属性

 | 

描述

 |
| --- | --- |
| 

foreground

 | 

定义文本前景色。

 |
| 

background

 | 

定义单元格或数据项的背景色。

 |
| 

font

 | 

定义文本的字体。

 |
| 

image

 | 

定义数据项的图片，当 image 属性为空时使用。

 |

### 列标识符[¶](#column-identifiers "Link to this heading")

列标识可用以下格式给出：

-   由 columns 属性给出的符号名。
    
-   整数值 n，指定第 n 列。
    
-   #n 的字符串格式，n 是整数，指定第 n 个显示列。
    

注意：

-   数据项属性的显示顺序可能与存储顺序不一样。
    
-   #0 列一定是指 tree 列，即便未指定 show="tree" 也是一样。
    

数据列号是指属性值列表中的索引值，显示列号是指显示在树控件中的列号。树的文本标签将显示在 #0 列。如果未设置 displaycolumns 属性，则数据列 n 将显示在第 #n+1 列。再次强调一下，**#0 列一定是指 tree 列** 。

### 虚拟事件[¶](#id8 "Link to this heading")

Treeview 控件会生成以下虚拟事件。

| 
事件

 | 

描述

 |
| --- | --- |
| 

<<TreeviewSelect>>

 | 

当选中项发生变化时生成。

 |
| 

<<TreeviewOpen>>

 | 

当焦点所在项的 open= True 之前立即生成。

 |
| 

<<TreeviewClose>>

 | 

当焦点所在项的 open=False 之后立即生成。

 |

[`Treeview.focus()`](#tkinter.ttk.Treeview.focus "tkinter.ttk.Treeview.focus") 和 [`Treeview.selection()`](#tkinter.ttk.Treeview.selection "tkinter.ttk.Treeview.selection") 方法可用于确认涉及的数据项。

### ttk.Treeview[¶](#ttk-treeview "Link to this heading")

_class_ tkinter.ttk.Treeview[¶](#tkinter.ttk.Treeview "Link to this definition")

bbox(_item_, _column\=None_)[¶](#tkinter.ttk.Treeview.bbox "Link to this definition")

返回某 _数据项_ 的边界（相对于控件窗口的坐标），形式为 (x, y, width, height) 。

If _column_ is specified, returns the bounding box of that cell. If the _item_ is not visible (that is, if it is a descendant of a closed item or is scrolled offscreen), returns an empty string.

This shadows the inherited `Misc.bbox()`; use [`grid_bbox()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Misc.grid_bbox "tkinter.Misc.grid_bbox") for the grid bounding box.

get\_children(_item\=None_)[¶](#tkinter.ttk.Treeview.get_children "Link to this definition")

Returns a tuple of children belonging to _item_.

若未给出 _item_ ，则返回根的下属数据。

set\_children(_item_, _\*newchildren_)[¶](#tkinter.ttk.Treeview.set_children "Link to this definition")

Replaces _item_'s children with _newchildren_.

对于 _item_ 中存在而 _newchildren_ 中不存在的数据项，会从树中移除。_newchildren_ 中的数据不能是 _item_ 的上级。注意，未给出 _newchildren_ 会导致 _item_ 的子项被解除关联。

column(_column_, _option\=None_, _\*\*kw_)[¶](#tkinter.ttk.Treeview.column "Link to this definition")

查询或修改列 _column_ 的属性。

如果未给出 _kw_，则返回属性值的字典。若指定了 _option_，则会返回该属性值。否则将设置属性值。

合法的 属性/值 可为：

_id_

返回列名。这是只读属性。

_anchor_: 某个标准 Tk 锚点值。

指定该列的文本在单元格内的对齐方式。

_minwidth_: 宽度

列的最小宽度，单位是像素。在缩放控件或用户拖动某一列时，Treeview 会保证列宽不小于此值。

_separator_: `True`/`False`

Specifies whether a column separator should be drawn to the right of the column.

_stretch_: `True`/`False`

指明缩放控件时是否调整列宽。

_width_: 宽度

列宽，单位为像素数。

若要设置 tree 列，请带上参数 column = "#0" 进行调用。

delete(_\*items_)[¶](#tkinter.ttk.Treeview.delete "Link to this definition")

删除所有 _items_ 及其下属。

根不能删除。

detach(_\*items_)[¶](#tkinter.ttk.Treeview.detach "Link to this definition")

将所有 _items_ 与树解除关联。

数据项及其下属依然存在，后续可以重新插入，目前只是不显示出来。

根不能解除关联。

exists(_item_)[¶](#tkinter.ttk.Treeview.exists "Link to this definition")

Returns `True` if the specified _item_ is present in the tree, `False` otherwise.

focus(_item\=None_)[¶](#tkinter.ttk.Treeview.focus "Link to this definition")

如果给出 _item_ 则设为当前焦点。否则返回当前焦点所在数据项，若无则返回 ''。

This shadows the inherited `Misc.focus()`; use [`focus_set()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Misc.focus_set "tkinter.Misc.focus_set") to focus the widget itself.

heading(_column_, _option\=None_, _\*\*kw_)[¶](#tkinter.ttk.Treeview.heading "Link to this definition")

查询或修改某 _column_ 的标题。

若未给出 _kw_，则返回标题属性值的字典。若给出了 _option_ 则返回对应属性值。否则，设置属性值。

合法的 属性/值 可为：

_text_: 文本

显示为列标题的文本。

_image_: 图片名称

指定显示在列标题右侧的图片。

_anchor_: 锚点

指定列标题文本的对齐方式。应为标准的 Tk 锚点值。

_command_: 回调

点击列标题时执行的回调函数。

若要对 tree 列进行设置，请带上 column = "#0" 进行调用。

identify(_component_, _x_, _y_)[¶](#tkinter.ttk.Treeview.identify "Link to this definition")

返回 _x_、_y_ 位置上 _component_ 数据项的描述信息，如果此处没有该数据项，则返回空字符串。

identify\_row(_y_)[¶](#tkinter.ttk.Treeview.identify_row "Link to this definition")

返回 _y_ 位置上的数据项 ID。

identify\_column(_x_)[¶](#tkinter.ttk.Treeview.identify_column "Link to this definition")

Returns the display column identifier of the cell at position _x_.

tree 列的 ID 为 #0 。

identify\_region(_x_, _y_)[¶](#tkinter.ttk.Treeview.identify_region "Link to this definition")

返回以下值之一：

| 
区域

 | 

含义

 |
| --- | --- |
| 

heading

 | 

树的标题栏区域。

 |
| 

separator

 | 

两个列标题之间的间隔区域。

 |
| 

tree

 | 

树区域。

 |
| 

cell

 | 

数据单元格。

 |

可用性：Tk 8.6。

identify\_element(_x_, _y_)[¶](#tkinter.ttk.Treeview.identify_element "Link to this definition")

返回位于 _x_ 、_y_ 的数据项。

可用性：Tk 8.6。

index(_item_)[¶](#tkinter.ttk.Treeview.index "Link to this definition")

返回 _item_ 在父项的子项列表中的整数索引。

insert(_parent_, _index_, _iid\=None_, _\*\*kw_)[¶](#tkinter.ttk.Treeview.insert "Link to this definition")

新建一个数据项并返回其 ID。

_parent_ 是父项的 ID，若要新建顶级项则为空字符串。 _index_ 是整数或“end”，指明在父项的子项列表中的插入位置。如果 _index_ 小于等于0，则在开头插入新节点；如果 _index_ 大于或等于当前子节点数，则将其插入末尾。如果给出了 _iid_，则将其用作数据项 ID； _iid_ 不得存在于树中。否则会新生成一个唯一 ID。

可用的选项列表请参阅 [Item Options](#item-options)。

item(_item_, _option\=None_, _\*\*kw_)[¶](#tkinter.ttk.Treeview.item "Link to this definition")

查询或修改某 _item_ 的属性。

如果未给出 option，则返回属性/值构成的字典。如果给出了 _option_，则返回该属性的值。否则，将属性设为 _kw_ 给出的值。

move(_item_, _parent_, _index_)[¶](#tkinter.ttk.Treeview.move "Link to this definition")

将 _item_ 移至指定位置，父项为 _parent_ ，子项列表索引为 _index_ 。

将数据项移入其子项之下是非法的。如果 _index_ 小于等于0，_item_ 将被移到开头；如果大于等于子项的总数，则被移至最后。如果 _item_ 已解除关联，则会被重新关联。

[`reattach()`](#tkinter.ttk.Treeview.reattach "tkinter.ttk.Treeview.reattach") is an alias of `move()`.

next(_item_)[¶](#tkinter.ttk.Treeview.next "Link to this definition")

返回 _item_ 的下一个相邻项，如果 _item_ 是父项的最后一个子项，则返回 ''。

parent(_item_)[¶](#tkinter.ttk.Treeview.parent "Link to this definition")

返回 _item_ 的父项 ID，如果 _item_ 为顶级节点，则返回 ''。

prev(_item_)[¶](#tkinter.ttk.Treeview.prev "Link to this definition")

返回 _item_ 的前一个相邻项，若 _item_ 为父项的第一个子项，则返回 ''。

see(_item_)[¶](#tkinter.ttk.Treeview.see "Link to this definition")

确保 _item_ 可见。

将 _item_ 所有上级的 open 属性设为 `True`，必要时会滚动控件，让 _item_ 处于树的可见部分。

selection()[¶](#tkinter.ttk.Treeview.selection "Link to this definition")

返回由选中项构成的元组。

在 3.8 版本发生变更: `selection()` 不再接受参数了。若要改变选中的状态，请使用下面介绍的方法。

selection\_set(_\*items_)[¶](#tkinter.ttk.Treeview.selection_set "Link to this definition")

让 _items_ 成为新的选中项。

在 3.6 版本发生变更: _items_ 可作为多个单独的参数传递，而不只是作为一个元组。

selection\_add(_\*items_)[¶](#tkinter.ttk.Treeview.selection_add "Link to this definition")

将 _items_ 加入选中项。

在 3.6 版本发生变更: _items_ 可作为多个单独的参数传递，而不只是作为一个元组。

selection\_remove(_\*items_)[¶](#tkinter.ttk.Treeview.selection_remove "Link to this definition")

从选中项中移除 _items_ 。

在 3.6 版本发生变更: _items_ 可作为多个单独的参数传递，而不只是作为一个元组。

selection\_toggle(_\*items_)[¶](#tkinter.ttk.Treeview.selection_toggle "Link to this definition")

切换 _items_ 中各项的选中状态。

在 3.6 版本发生变更: _items_ 可作为多个单独的参数传递，而不只是作为一个元组。

set(_item_, _column\=None_, _value\=None_)[¶](#tkinter.ttk.Treeview.set "Link to this definition")

若带一个参数，则返回 _item_ 的列/值字典。若带两个参数，则返回 _column_ 的当前值。若带三个参数，则将 _item_ 的 _column_ 设为 _value_。

tag\_bind(_tagname_, _sequence\=None_, _callback\=None_)[¶](#tkinter.ttk.Treeview.tag_bind "Link to this definition")

为 tag 为 _tagname_ 的数据项绑定事件 _sequence_ 的回调函数。当事件分发给该数据项时，tag 参数为 _tagname_ 的全部数据项的回调都会被调用到。

tag\_configure(_tagname_, _option\=None_, _\*\*kw_)[¶](#tkinter.ttk.Treeview.tag_configure "Link to this definition")

查询或修改 _tagname_ 指定项的属性。

如果未给出 _kw_，则返回 _tagname_ 项的属性字典。如果给出了 _option_，则返回 _tagname_ 项的 _option_ 属性值。否则，设置 _tagname_ 项的属性值。

tag\_has(_tagname_, _item\=None_)[¶](#tkinter.ttk.Treeview.tag_has "Link to this definition")

If _item_ is specified, returns `True` if the specified _item_ has the given _tagname_ and `False` otherwise. Otherwise, returns a tuple of all items that have the specified tag.

可用性：Tk 8.6。

xview(_\*args_)[¶](#tkinter.ttk.Treeview.xview "Link to this definition")

查询或修改 Treeview 的横向位置。

yview(_\*args_)[¶](#tkinter.ttk.Treeview.yview "Link to this definition")

查询或修改 Treeview 的纵向位置。

## Ttk 样式[¶](#ttk-styling "Link to this heading")

Each widget in `ttk` is assigned a style, which specifies the set of elements making up the widget and how they are arranged, along with dynamic and default settings for element options. By default the style name is the same as the widget's class name, but it may be overridden by the widget's style option. If you don't know the class name of a widget, use the method [`Misc.winfo_class`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Misc.winfo_class "tkinter.Misc.winfo_class") (somewidget.winfo\_class()).

参见

[Introduction to the Tk theme engine](https://www.tcl-lang.org/man/tcl9.0/TkCmd/ttk_intro.html)

The `ttk::intro` man page explains how the theme engine works.

[The Tile Widget Set](https://tktable.sourceforge.net/tile/tile-tcl2004.pdf)

Joe English's 2004 paper introducing the theme engine (then the separate _Tile_ extension), with diagrams of how elements and layouts make up a widget's appearance.

_class_ tkinter.ttk.Style[¶](#tkinter.ttk.Style "Link to this definition")

用于操控样式数据库的类。

configure(_style_, _query\_opt\=None_, _\*\*kw_)[¶](#tkinter.ttk.Style.configure "Link to this definition")

查询或设置 _style_ 的默认属性值。

Each key in _kw_ is an option and each value is a string identifying the value for that option.

例如，要将默认按钮改为扁平样式，并带有留白和各种背景色：

from tkinter import ttk
import tkinter

root \= tkinter.Tk()

ttk.Style().configure("TButton", padding\=6, relief\="flat",
   background\="#ccc")

btn \= ttk.Button(text\="Sample")
btn.pack()

root.mainloop()

map(_style_, _query\_opt\=None_, _\*\*kw_)[¶](#tkinter.ttk.Style.map "Link to this definition")

查询或设置 _style_ 的指定属性的动态值。

_kw_ 的每个键都是一个属性，每个值通常应为列表或元组，其中包含以元组、列表或其他形式组合而成的状态标识（statespec）。状态标识是由一个或多个状态组合，加上一个值组成。

举个例子能更清晰些：

import tkinter
from tkinter import ttk

root \= tkinter.Tk()

style \= ttk.Style()
style.map("C.TButton",
    foreground\=\[('pressed', 'red'), ('active', 'blue')\],
    background\=\[('pressed', '!disabled', 'black'), ('active', 'white')\]
    )

colored\_btn \= ttk.Button(text\="Test", style\="C.TButton").pack()

root.mainloop()

请注意，要点是属性的（状态，值）序列的顺序，如果前景色属性的顺序改为 `[('active', 'blue'), ('pressed', 'red')]` ，则控件处于激活或按下状态时的前景色将为蓝色。

When called to query the map (without specifying values to set), it returns a dictionary mapping each option to its list of statespecs.

在 3.10 版本发生变更: The value returned when querying the map was corrected.

lookup(_style_, _option_, _state\=None_, _default\=None_)[¶](#tkinter.ttk.Style.lookup "Link to this definition")

返回 _style_ 中的 _option_ 属性值。

如果给出了 _state_ ，则应是一个或多个状态组成的序列。如果设置了 _default_ 参数，则在属性值缺失时会用作后备值。

若要检测按钮的默认字体，可以：

from tkinter import ttk

print(ttk.Style().lookup("TButton", "font"))

layout(_style_, _layoutspec\=None_)[¶](#tkinter.ttk.Style.layout "Link to this definition")

按照 _style_ 定义控件布局。如果省略了 _layoutspec_，则返回该样式的布局属性。

若给出了 _layoutspec_，则应为一个列表或其他的序列类型（不包括字符串），其中的数据项应为元组类型，第一项是布局名称，第二项的格式应符合 [Layouts](#layouts) 的描述。

以下示例有助于理解这种格式（这里并没有实际意义）：

from tkinter import ttk
import tkinter

root \= tkinter.Tk()

style \= ttk.Style()
style.layout("TMenubutton", \[
   ("Menubutton.background", None),
   ("Menubutton.button", {"children":
       \[("Menubutton.focus", {"children":
           \[("Menubutton.padding", {"children":
               \[("Menubutton.label", {"side": "left", "expand": 1})\]
           })\]
       })\]
   }),
\])

mbtn \= ttk.Menubutton(text\='Text')
mbtn.pack()
root.mainloop()

element\_create(_elementname_, _etype_, _\*args_, _\*\*kw_)[¶](#tkinter.ttk.Style.element_create "Link to this definition")

在当前主题中创建一个新元素，为给定的 _etype_，它应当是 "image", "from" 或 "vsapi"。 后者仅在 Windows 版 Tk 8.6 中可用。

如果用了 image，则 _args_ 应包含默认的图片名，后面跟着 状态标识/值（这里是 imagespec），_kw_ 可带有以下属性：

border=padding

padding 是由不超过四个整数构成的列表，分别定义了左、顶、右、底的边界。

height=height

定义了元素的最小高度。如果小于零，则默认采用图片本身的高度。

padding=padding

定义了元素的内部留白。若未指定则默认采用 border 值。

sticky=spec

定义了图片的对齐方式。spec 包含零个或多个 n、s、w、e 字符。

width=width

定义了元素的最小宽度。如果小于零，则默认采用图片本身的宽度。

示例:

img1 \= tkinter.PhotoImage(master\=root, file\='button.png')
img1 \= tkinter.PhotoImage(master\=root, file\='button-pressed.png')
img1 \= tkinter.PhotoImage(master\=root, file\='button-active.png')
style \= ttk.Style(root)
style.element\_create('Button.button', 'image',
                     img1, ('pressed', img2), ('active', img3),
                     border\=(2, 4), sticky\='we')

如果 _etype_ 的值用了 from，则 [`element_create()`](#tkinter.ttk.Style.element_create "tkinter.ttk.Style.element_create") 将复制一个现有的元素。 _args_ 应包含主题名和可选的要复制的元素。若未给出要克隆的元素，则采用空元素。 _kw_ 参数将被丢弃。

示例:

style \= ttk.Style(root)
style.element\_create('plain.background', 'from', 'default')

如果使用 "vsapi" 作为 _etype_ 的值，[`element_create()`](#tkinter.ttk.Style.element_create "tkinter.ttk.Style.element_create") 将在当前主题中创建一个新元素，其视觉外观将使用负责处理 Windows XP 和 Vista 上带主题风格的 Microsoft Visual Styles API 来绘制。 _args_ 应当包含 Microsoft 文档中给出的 Visual Styles 类和部件并带有由 ttk 状态及对应 Visual Styles API 状态值组成的元组的可选序列。 _kw_ 可能具有下列选项：

padding=padding

指定元素的内边距。 _padding_ 是由至多四个分别指定左、上、右、下边距值的整数组成的列表。 如果指定的元素少于四个，则下边距默认等于上边距，右边距默认等于左边距。 换句话说，由三个数字组成的列表将指定左边距、垂直边距和右边距；由两个数字组成的列表将指定水平边距和垂直边距；一个单独数字将为该部件的所有边指定相同的边距。 此选项不可与其他任何选项混用。

margins=padding

指定元素的外边距。 _padding_ 是由至多四个分别指定左、上、右、下边距值的整数组成的列表。 此选项不可与其他任何选项混用。

width=width

指定元素的宽度。 如果设置了此选项则不会查询 Visual Styles API 来获取推荐的大小或部件。 如果设置了此选项则还应当设置 _height_。 _width_ 和 _height_ 选项不可与 _padding_ 或 _margins_ 选项混用。

height=height

指定元素的高度。 参见 _width_ 的注释。

示例:

style \= ttk.Style(root)
style.element\_create('pin', 'vsapi', 'EXPLORERBAR', 3, \[
                     ('pressed', '!selected', 3),
                     ('active', '!selected', 2),
                     ('pressed', 'selected', 6),
                     ('active', 'selected', 5),
                     ('selected', 4),
                     ('', 1)\])
style.layout('Explorer.Pin',
             \[('Explorer.Pin.pin', {'sticky': 'news'})\])
pin \= ttk.Checkbutton(style\='Explorer.Pin')
pin.pack(expand\=True, fill\='both')

在 3.13 版本发生变更: 增加了对 "vsapi" 元素工厂的支持。

element\_names()[¶](#tkinter.ttk.Style.element_names "Link to this definition")

Returns a tuple of elements defined in the current theme.

element\_options(_elementname_)[¶](#tkinter.ttk.Style.element_options "Link to this definition")

Returns a tuple of _elementname_'s options.

theme\_create(_themename_, _parent\=None_, _settings\=None_)[¶](#tkinter.ttk.Style.theme_create "Link to this definition")

新建一个主题。

如果 _themename_ 已经存在，则会报错。如果给出了 _parent_，则新主题将从父主题继承样式、元素和布局。若给出了 _settings_ ，则语法应与 [`theme_settings()`](#tkinter.ttk.Style.theme_settings "tkinter.ttk.Style.theme_settings") 的相同。

theme\_settings(_themename_, _settings_)[¶](#tkinter.ttk.Style.theme_settings "Link to this definition")

将当前主题临时设为 _themename_，并应用 _settings_，然后恢复之前的主题。

_settings_ 中的每个键都是一种样式而每个值可能包含 'configure', 'map', 'layout' 和 'element create' 等键并且它们被预期具有与分别由 [`Style.configure()`](#tkinter.ttk.Style.configure "tkinter.ttk.Style.configure"), [`Style.map()`](#tkinter.ttk.Style.map "tkinter.ttk.Style.map"), [`Style.layout()`](#tkinter.ttk.Style.layout "tkinter.ttk.Style.layout") 和 [`Style.element_create()`](#tkinter.ttk.Style.element_create "tkinter.ttk.Style.element_create") 方法所指定的相符的格式。

以下例子会对 Combobox 的默认主题稍作修改：

from tkinter import ttk
import tkinter

root \= tkinter.Tk()

style \= ttk.Style()
style.theme\_settings("default", {
   "TCombobox": {
       "configure": {"padding": 5},
       "map": {
           "background": \[("active", "green2"),
                          ("!disabled", "green4")\],
           "fieldbackground": \[("!disabled", "green3")\],
           "foreground": \[("focus", "OliveDrab1"),
                          ("!disabled", "OliveDrab2")\]
       }
   }
})

combo \= ttk.Combobox().pack()

root.mainloop()

theme\_names()[¶](#tkinter.ttk.Style.theme_names "Link to this definition")

Returns a tuple of all known themes.

theme\_use(_themename\=None_)[¶](#tkinter.ttk.Style.theme_use "Link to this definition")

若未给出 _themename_，则返回正在使用的主题。否则，将当前主题设为 _themename_，刷新所有控件并引发 <<ThemeChanged>> 事件。

### 布局[¶](#layouts "Link to this heading")

布局可以为 `None`，如果未传入任何选项，或传入一个指明元素排列方式的字典的话。 布局机制使用简化版本的打包位置管理器：给定一个初始容器，并为每个元素分配一个区块。

合法的 属性/值 可为：

_side_: 边缘

指定元素置于容器的哪一侧； 顶、右、底或左。如果省略，则该元素将占据整个容器。

_sticky_: 方向

指定元素在已分配包装盒内的放置位置。

_unit_: 0 或 1

如果设为 1，则将元素及其所有后代均视作单个元素以供 [`Widget.identify()`](#tkinter.ttk.Widget.identify "tkinter.ttk.Widget.identify") 等使用。 它被用于滚动条之类带有控制柄的东西。

_children_: \[子布局... \]

指定要放置于元素内的元素列表。每个元素都是一个元组（或其他序列类型），其中第一项是布局名称，另一项是个 [Layout](#layouts) 。

## Additional widgets[¶](#additional-widgets "Link to this heading")

The following themed widgets complete the `tkinter.ttk` widget set. Each is the themed counterpart of the like-named classic [`tkinter`](https://docs.python.org/zh-cn/3/library/tkinter.html#module-tkinter "tkinter: Interface to Tcl/Tk for graphical user interfaces") widget and inherits the common methods of [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

_class_ tkinter.ttk.Button(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.Button "Link to this definition")

Ttk `Button` widget, displays a textual label and/or image, and evaluates a command when pressed. It is the themed counterpart of [`tkinter.Button`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Button "tkinter.Button") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

invoke()[¶](#tkinter.ttk.Button.invoke "Link to this definition")

Invoke the command associated with the button and return its result.

_class_ tkinter.ttk.Checkbutton(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.Checkbutton "Link to this definition")

Ttk `Checkbutton` widget, used to control a boolean variable that is toggled on and off. It is the themed counterpart of [`tkinter.Checkbutton`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Checkbutton "tkinter.Checkbutton") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

invoke()[¶](#tkinter.ttk.Checkbutton.invoke "Link to this definition")

Toggle the button between its selected and deselected states, invoke the command associated with the button, and return its result.

_class_ tkinter.ttk.Entry(_master\=None_, _widget\=None_, _\*\*kw_)[¶](#tkinter.ttk.Entry "Link to this definition")

Ttk `Entry` widget, displays a one-line text string and allows the user to edit it. It is the themed counterpart of [`tkinter.Entry`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Entry "tkinter.Entry") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget") as well as the editing methods from `tkinter.Entry`.

bbox(_index_)[¶](#tkinter.ttk.Entry.bbox "Link to this definition")

Return a tuple `(x, y, width, height)` giving the bounding box of the character at the given _index_.

This shadows the inherited `Misc.bbox()`; use [`grid_bbox()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Misc.grid_bbox "tkinter.Misc.grid_bbox") for the grid bounding box.

identify(_x_, _y_)[¶](#tkinter.ttk.Entry.identify "Link to this definition")

Return the name of the element under the point given by _x_ and _y_, or the empty string if no element is present at that location.

validate()[¶](#tkinter.ttk.Entry.validate "Link to this definition")

Force validation of the entry and return `True` if validation succeeded, and `False` otherwise.

_class_ tkinter.ttk.Frame(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.Frame "Link to this definition")

Ttk `Frame` widget, a container used to group and lay out other widgets. It is the themed counterpart of [`tkinter.Frame`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Frame "tkinter.Frame") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

_class_ tkinter.ttk.Label(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.Label "Link to this definition")

Ttk `Label` widget, displays a textual label and/or image. It is the themed counterpart of [`tkinter.Label`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Label "tkinter.Label") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

_class_ tkinter.ttk.Labelframe(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.Labelframe "Link to this definition")

Ttk `Labelframe` widget, a container that draws a border and a title label around its contents. It is the themed counterpart of [`tkinter.LabelFrame`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.LabelFrame "tkinter.LabelFrame") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

Ttk `Menubutton` widget, displays a textual label and/or image, and pops up a menu when pressed. It is the themed counterpart of [`tkinter.Menubutton`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Menubutton "tkinter.Menubutton") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

Ttk `OptionMenu` widget, a [`Menubutton`](#tkinter.ttk.Menubutton "tkinter.ttk.Menubutton") that pops up a menu of mutually exclusive choices. _variable_ is the variable that tracks the currently selected value, _default_ is the value to set initially, and _values_ are the entries to display in the menu. A _command_ keyword argument may be given to specify a callable that is invoked with the selected value whenever the selection changes; the _style_ keyword argument sets the style used by the underlying menubutton; the _direction_ keyword argument sets where the menu is posted relative to the menubutton (one of `'above'`, `'below'` (the default), `'left'`, `'right'` or `'flush'`); and the _name_ keyword argument sets the Tk widget name.

Replace the entries of the menu with _values_. If _default_ is given, also set it as the current value of the _variable_.

Destroy this widget and its associated menu.

在 3.14 版本发生变更: Added support for the _name_ keyword argument.

_class_ tkinter.ttk.Panedwindow(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.Panedwindow "Link to this definition")

Ttk `Panedwindow` widget, displays a number of subwindows stacked either vertically or horizontally. The user may adjust the relative sizes of the subwindows by dragging the sash between panes. It is the themed counterpart of [`tkinter.PanedWindow`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.PanedWindow "tkinter.PanedWindow") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget"), as well as the `add()` and `panes()` methods from `tkinter.PanedWindow`.

insert(_pos_, _child_, _\*\*kw_)[¶](#tkinter.ttk.Panedwindow.insert "Link to this definition")

Insert a pane containing _child_ at the position _pos_. _pos_ is either the string `'end'`, an integer index, or the name of a managed subwindow. If _child_ is already managed by the paned window, move it to the specified position. Any keyword arguments set pane options.

forget(_child_)[¶](#tkinter.ttk.Panedwindow.forget "Link to this definition")

Remove _child_, which may be either an integer index or the name of a managed subwindow, from the panes.

This shadows the inherited geometry-manager `forget()`; use [`pack_forget()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Pack.pack_forget "tkinter.Pack.pack_forget"), [`grid_forget()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Grid.grid_forget "tkinter.Grid.grid_forget") or [`place_forget()`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Place.place_forget "tkinter.Place.place_forget") to remove the widget itself from its manager.

pane(_pane_, _option\=None_, _\*\*kw_)[¶](#tkinter.ttk.Panedwindow.pane "Link to this definition")

Query or modify the options of the specified _pane_, where _pane_ is either an integer index or the name of a managed subwindow. If no arguments are given, return a dictionary of the pane option values. If _option_ is specified, return the value of that option. Otherwise, set the options given as keyword arguments to their corresponding values.

sashpos(_index_, _newpos\=None_)[¶](#tkinter.ttk.Panedwindow.sashpos "Link to this definition")

If _newpos_ is specified, set the position of sash number _index_ and return its new position. This may adjust the positions of adjacent sashes to ensure that positions are monotonically increasing; positions are also constrained to be between 0 and the total size of the widget. If _newpos_ is omitted, return the current position of the sash.

_class_ tkinter.ttk.Radiobutton(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.Radiobutton "Link to this definition")

Ttk `Radiobutton` widget, used as part of a group to control a single shared variable by selecting one of several mutually exclusive values. It is the themed counterpart of [`tkinter.Radiobutton`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Radiobutton "tkinter.Radiobutton") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

invoke()[¶](#tkinter.ttk.Radiobutton.invoke "Link to this definition")

Set the option variable to the button's value, select the button, invoke the command associated with the button, and return its result.

_class_ tkinter.ttk.Scale(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.Scale "Link to this definition")

Ttk `Scale` widget, displays a slider that lets the user select a numeric value from a range by moving the slider along a trough. It is the themed counterpart of [`tkinter.Scale`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Scale "tkinter.Scale") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

configure(_cnf\=None_, _\*\*kw_)[¶](#tkinter.ttk.Scale.configure "Link to this definition")

Modify or query the widget options, like [`Widget.configure`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Misc.configure "tkinter.Misc.configure"). In addition, this method clips the `from` and `to` values so that the current value stays within the range defined by them.

在 3.9 版本发生变更: Now returns the configuration value, like [`Widget.configure`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Misc.configure "tkinter.Misc.configure").

get(_x\=None_, _y\=None_)[¶](#tkinter.ttk.Scale.get "Link to this definition")

Return the current value of the scale. If _x_ and _y_ are given, return the value corresponding to the pixel coordinate _x_, _y_ instead.

_class_ tkinter.ttk.Scrollbar(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.Scrollbar "Link to this definition")

Ttk `Scrollbar` widget, controls the viewport of an associated scrollable widget such as a [`Treeview`](#tkinter.ttk.Treeview "tkinter.ttk.Treeview"), [`Entry`](#tkinter.ttk.Entry "tkinter.ttk.Entry") or [`tkinter.Text`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Text "tkinter.Text"). It is the themed counterpart of [`tkinter.Scrollbar`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Scrollbar "tkinter.Scrollbar") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget"), as well as the `set()` and `get()` methods from `tkinter.Scrollbar`.

_class_ tkinter.ttk.Separator(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.Separator "Link to this definition")

Ttk `Separator` widget, displays a horizontal or vertical separator line. It has no direct counterpart in [`tkinter`](https://docs.python.org/zh-cn/3/library/tkinter.html#module-tkinter "tkinter: Interface to Tcl/Tk for graphical user interfaces") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

_class_ tkinter.ttk.Sizegrip(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.Sizegrip "Link to this definition")

Ttk `Sizegrip` widget, displays a grip that allows the user to resize the containing toplevel window by pressing and dragging the grip, typically placed in the bottom-right corner. It has no direct counterpart in [`tkinter`](https://docs.python.org/zh-cn/3/library/tkinter.html#module-tkinter "tkinter: Interface to Tcl/Tk for graphical user interfaces") and inherits the common widget methods from [`Widget`](#tkinter.ttk.Widget "tkinter.ttk.Widget").

_class_ tkinter.ttk.LabeledScale(_master\=None_, _variable\=None_, _from\_\=0_, _to\=10_, _\*\*kw_)[¶](#tkinter.ttk.LabeledScale "Link to this definition")

A [`Frame`](#tkinter.ttk.Frame "tkinter.ttk.Frame") containing a [`Scale`](#tkinter.ttk.Scale "tkinter.ttk.Scale") and a [`Label`](#tkinter.ttk.Label "tkinter.ttk.Label") that shows the scale's current value. _variable_ is the [`IntVar`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.IntVar "tkinter.IntVar") tracked by the scale (one is created if it is not given), and _from\__ and _to_ define the range of the scale.

destroy()[¶](#tkinter.ttk.LabeledScale.destroy "Link to this definition")

Destroy this widget and remove the trace callback registered on the associated variable.

_class_ tkinter.ttk.LabelFrame(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.LabelFrame "Link to this definition")

Alias of [`Labelframe`](#tkinter.ttk.Labelframe "tkinter.ttk.Labelframe"), kept for naming compatibility with [`tkinter.LabelFrame`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.LabelFrame "tkinter.LabelFrame").

_class_ tkinter.ttk.PanedWindow(_master\=None_, _\*\*kw_)[¶](#tkinter.ttk.PanedWindow "Link to this definition")

Alias of [`Panedwindow`](#tkinter.ttk.Panedwindow "tkinter.ttk.Panedwindow"), kept for naming compatibility with [`tkinter.PanedWindow`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.PanedWindow "tkinter.PanedWindow").
