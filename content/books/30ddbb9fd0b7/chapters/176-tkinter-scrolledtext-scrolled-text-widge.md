**源代码：** [Lib/tkinter/scrolledtext.py](https://github.com/python/cpython/tree/3.14/Lib/tkinter/scrolledtext.py)

* * *

`tkinter.scrolledtext` 模块提供了一个同名类，实现了一个基本的文本控件并带有配置好的垂直滚动条。使用 [`ScrolledText`](#tkinter.scrolledtext.ScrolledText "tkinter.scrolledtext.ScrolledText") 类比直接设置文本控件和滚动条要容易得多。

The text widget and scrollbar are packed together in a [`Frame`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Frame "tkinter.Frame"), and the methods of the [`Pack`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Pack "tkinter.Pack"), [`Grid`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Grid "tkinter.Grid") and [`Place`](https://docs.python.org/zh-cn/3/library/tkinter.html#tkinter.Place "tkinter.Place") geometry managers are acquired from the `Frame` object. This allows the [`ScrolledText`](#tkinter.scrolledtext.ScrolledText "tkinter.scrolledtext.ScrolledText") widget to be used directly to achieve most normal geometry management behavior.

如果需要更具体的控制，可以使用以下属性：

_class_ tkinter.scrolledtext.ScrolledText(_master\=None_, _\*\*kw_)[¶](#tkinter.scrolledtext.ScrolledText "Link to this definition")

frame[¶](#tkinter.scrolledtext.ScrolledText.frame "Link to this definition")

围绕文本和滚动条控件的框架。

vbar[¶](#tkinter.scrolledtext.ScrolledText.vbar "Link to this definition")

滚动条控件。
