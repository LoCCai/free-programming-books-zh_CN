**源代码:** [Lib/tkinter/colorchooser.py](https://github.com/python/cpython/tree/3.14/Lib/tkinter/colorchooser.py)

* * *

`tkinter.colorchooser` 模块提供了 [`Chooser`](#tkinter.colorchooser.Chooser "tkinter.colorchooser.Chooser") 类作为原生颜色选取器对话框的接口。`Chooser` 实现了一个模态颜色选择对话框窗口。`Chooser` 类继承自 [`Dialog`](https://docs.python.org/zh-cn/3/library/dialog.html#tkinter.commondialog.Dialog "tkinter.commondialog.Dialog") 类。

_class_ tkinter.colorchooser.Chooser(_master\=None_, _\*\*options_)[¶](#tkinter.colorchooser.Chooser "Link to this definition")

The class implementing the modal color-choosing dialog. Most applications use the [`askcolor()`](#tkinter.colorchooser.askcolor "tkinter.colorchooser.askcolor") convenience function rather than instantiating this class directly.

tkinter.colorchooser.askcolor(_color\=None_, _\*\*options_)[¶](#tkinter.colorchooser.askcolor "Link to this definition")

Show a modal color-choosing dialog and return the chosen color. _color_ is the color selected when the dialog opens. The return value is a tuple `((r, g, b), hexstr)`, where `r`, `g` and `b` are the red, green and blue components as integers in the range 0–255 and _hexstr_ is the equivalent Tk color string, such as `'#ff8000'`. If the user cancels the dialog, `(None, None)` is returned.

在 3.10 版本发生变更: The RGB values in the returned color are now integers in the range 0–255 instead of floats.
