**源代码:** [Lib/tkinter/messagebox.py](https://github.com/python/cpython/tree/3.14/Lib/tkinter/messagebox.py)

* * *

The `tkinter.messagebox` module provides a template base class as well as a variety of convenience methods for commonly used configurations. The message boxes are modal: each blocks until the user responds, then returns a value that depends on the function. The `show*` functions and [`Message.show()`](#tkinter.messagebox.Message.show "tkinter.messagebox.Message.show") return the symbolic name of the button the user pressed, as a string (such as [`OK`](#tkinter.messagebox.OK "tkinter.messagebox.OK") or [`YES`](#tkinter.messagebox.YES "tkinter.messagebox.YES")). Common message box styles and layouts include but are not limited to:

![../\_images/tk\_msg.png](https://docs.python.org/zh-cn/3/_images/tk_msg.png)

_class_ tkinter.messagebox.Message(_master\=None_, _\*\*options_)[¶](#tkinter.messagebox.Message "Link to this definition")

创建一个带有应用专属消息、图标和按钮组的消息窗口。 消息窗口中的每个按钮均以唯一符号名称进行标识（参见 _type_ 选项）。

支持以下选项：

> _command_
> 
> 指定当用户关闭对话框时要唤起的函数。 用户关闭对话框所点击的按钮名称将作为参数传入。 此选项仅在 macOS 上可用。
> 
> _default_
> 
> 指定消息窗口默认按钮的 [符号名称](#messagebox-buttons) ([`OK`](#tkinter.messagebox.OK "tkinter.messagebox.OK"), [`CANCEL`](#tkinter.messagebox.CANCEL "tkinter.messagebox.CANCEL") 等等)。 如果未指定此选项，则对话框中的第一个按钮将成为默认。
> 
> _detail_
> 
> 为由 _message_ 选项给出的主消息指定一条辅助消息。 消息详情将在主消息之下展示，并且在操作系统支持的情况下，会使用次于主消息的字体。
> 
> _icon_
> 
> 指定一个要显示的 [图标](#messagebox-icons)。 如果未指定此选项，则将显示 [`INFO`](#tkinter.messagebox.INFO "tkinter.messagebox.INFO") 图标。
> 
> _message_
> 
> 指定要在此消息框中显示的消息。 默认值为空字符串。
> 
> _parent_
> 
> 将指定的窗口设为该消息框的逻辑上级。 消息框将在其上级窗口之前显示。
> 
> _title_
> 
> 指定要作为消息框标题的字符串。 此选项在 macOS 上会被忽略，因为该平台的设计指导禁止在这种对话框中使用标题。
> 
> _type_
> 
> 安排显示一个 [预定义的按钮集合](#messagebox-types)。

备注

Tk 8.6 added the _command_ option.

show(_\*\*options_)[¶](#tkinter.messagebox.Message.show "Link to this definition")

显示一个消息窗口并等待用户选择某一个按钮。 然后返回所选择按钮的符号名称。 关键字参数可以覆盖在构造器中指定的选项。

**信息消息框**

tkinter.messagebox.showinfo(_title\=None_, _message\=None_, _\*\*options_)[¶](#tkinter.messagebox.showinfo "Link to this definition")

创建并显示一个具有指定标题和消息的信息消息框。

**警告消息框**

tkinter.messagebox.showwarning(_title\=None_, _message\=None_, _\*\*options_)[¶](#tkinter.messagebox.showwarning "Link to this definition")

创建并显示一个具有指定标题和消息的警告消息框。

tkinter.messagebox.showerror(_title\=None_, _message\=None_, _\*\*options_)[¶](#tkinter.messagebox.showerror "Link to this definition")

创建并显示一个具有指定标题和消息的错误消息框。

**疑问消息框**

tkinter.messagebox.askquestion(_title\=None_, _message\=None_, _\*_, _type\=YESNO_, _\*\*options_)[¶](#tkinter.messagebox.askquestion "Link to this definition")

提出一个问题。 在默认情况下显示 [`YES`](#tkinter.messagebox.YES "tkinter.messagebox.YES") 和 [`NO`](#tkinter.messagebox.NO "tkinter.messagebox.NO") 按钮。 返回所选择按钮的符号名称。

tkinter.messagebox.askokcancel(_title\=None_, _message\=None_, _\*\*options_)[¶](#tkinter.messagebox.askokcancel "Link to this definition")

询问操作是否要继续。 显示 [`OK`](#tkinter.messagebox.OK "tkinter.messagebox.OK") 和 [`CANCEL`](#tkinter.messagebox.CANCEL "tkinter.messagebox.CANCEL") 按钮。 如果选择确定将返回 `True` 否则返回 `False`。

tkinter.messagebox.askretrycancel(_title\=None_, _message\=None_, _\*\*options_)[¶](#tkinter.messagebox.askretrycancel "Link to this definition")

Ask if operation should be retried. Shows buttons [`RETRY`](#tkinter.messagebox.RETRY "tkinter.messagebox.RETRY") and [`CANCEL`](#tkinter.messagebox.CANCEL "tkinter.messagebox.CANCEL"). Return `True` if the answer is retry and `False` otherwise.

tkinter.messagebox.askyesno(_title\=None_, _message\=None_, _\*\*options_)[¶](#tkinter.messagebox.askyesno "Link to this definition")

提出一个问题。 显示 [`YES`](#tkinter.messagebox.YES "tkinter.messagebox.YES") 和 [`NO`](#tkinter.messagebox.NO "tkinter.messagebox.NO") 按钮。 如果选择是则返回 `True` 否则返回 `False`。

tkinter.messagebox.askyesnocancel(_title\=None_, _message\=None_, _\*\*options_)[¶](#tkinter.messagebox.askyesnocancel "Link to this definition")

提出一个问题。 显示 [`YES`](#tkinter.messagebox.YES "tkinter.messagebox.YES"), [`NO`](#tkinter.messagebox.NO "tkinter.messagebox.NO") 和 [`CANCEL`](#tkinter.messagebox.CANCEL "tkinter.messagebox.CANCEL") 按钮。 如果选择是则返回 `True`，取消则返回 `None`，否则返回 `False`。

按钮的符号名称：

tkinter.messagebox.ABORT _\= 'abort'_[¶](#tkinter.messagebox.ABORT "Link to this definition")

tkinter.messagebox.RETRY _\= 'retry'_[¶](#tkinter.messagebox.RETRY "Link to this definition")

tkinter.messagebox.IGNORE _\= 'ignore'_[¶](#tkinter.messagebox.IGNORE "Link to this definition")

tkinter.messagebox.OK _\= 'ok'_[¶](#tkinter.messagebox.OK "Link to this definition")

tkinter.messagebox.CANCEL _\= 'cancel'_[¶](#tkinter.messagebox.CANCEL "Link to this definition")

tkinter.messagebox.YES _\= 'yes'_[¶](#tkinter.messagebox.YES "Link to this definition")

tkinter.messagebox.NO _\= 'no'_[¶](#tkinter.messagebox.NO "Link to this definition")

预定义的按钮集合：

tkinter.messagebox.ABORTRETRYIGNORE _\= 'abortretryignore'_[¶](#tkinter.messagebox.ABORTRETRYIGNORE "Link to this definition")

显示符号名称为 [`ABORT`](#tkinter.messagebox.ABORT "tkinter.messagebox.ABORT"), [`RETRY`](#tkinter.messagebox.RETRY "tkinter.messagebox.RETRY") 和 [`IGNORE`](#tkinter.messagebox.IGNORE "tkinter.messagebox.IGNORE") 的三个按钮。

tkinter.messagebox.OK _\= 'ok'_

显示符号名称为 [`OK`](#tkinter.messagebox.OK "tkinter.messagebox.OK") 的一个按钮。

tkinter.messagebox.OKCANCEL _\= 'okcancel'_[¶](#tkinter.messagebox.OKCANCEL "Link to this definition")

显示符号名称为 [`OK`](#tkinter.messagebox.OK "tkinter.messagebox.OK") 和 [`CANCEL`](#tkinter.messagebox.CANCEL "tkinter.messagebox.CANCEL") 的两个按钮。

tkinter.messagebox.RETRYCANCEL _\= 'retrycancel'_[¶](#tkinter.messagebox.RETRYCANCEL "Link to this definition")

显示符号名称为 [`RETRY`](#tkinter.messagebox.RETRY "tkinter.messagebox.RETRY") 和 [`CANCEL`](#tkinter.messagebox.CANCEL "tkinter.messagebox.CANCEL") 的两个按钮。

tkinter.messagebox.YESNO _\= 'yesno'_[¶](#tkinter.messagebox.YESNO "Link to this definition")

显示符号名称为 [`YES`](#tkinter.messagebox.YES "tkinter.messagebox.YES") 和 [`NO`](#tkinter.messagebox.NO "tkinter.messagebox.NO") 的两个按钮。

tkinter.messagebox.YESNOCANCEL _\= 'yesnocancel'_[¶](#tkinter.messagebox.YESNOCANCEL "Link to this definition")

显示符号名称为 [`YES`](#tkinter.messagebox.YES "tkinter.messagebox.YES"), [`NO`](#tkinter.messagebox.NO "tkinter.messagebox.NO") 和 [`CANCEL`](#tkinter.messagebox.CANCEL "tkinter.messagebox.CANCEL") 的三个按钮。

图标图像：

tkinter.messagebox.ERROR _\= 'error'_[¶](#tkinter.messagebox.ERROR "Link to this definition")

tkinter.messagebox.INFO _\= 'info'_[¶](#tkinter.messagebox.INFO "Link to this definition")

tkinter.messagebox.QUESTION _\= 'question'_[¶](#tkinter.messagebox.QUESTION "Link to this definition")

tkinter.messagebox.WARNING _\= 'warning'_[¶](#tkinter.messagebox.WARNING "Link to this definition")
