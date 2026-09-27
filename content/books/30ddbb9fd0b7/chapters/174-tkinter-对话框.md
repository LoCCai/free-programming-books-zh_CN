## `tkinter.simpledialog` --- 标准 Tkinter 输入对话框[¶](#module-tkinter.simpledialog "Link to this heading")

**源码:** [Lib/tkinter/simpledialog.py](https://github.com/python/cpython/tree/3.14/Lib/tkinter/simpledialog.py)

* * *

`tkinter.simpledialog` 模块包含一些便捷类和函数可用来创建简单的模态对话框以便从用户获取值。

tkinter.simpledialog.askfloat(_title_, _prompt_, _\*_, _initialvalue\=None_, _minvalue\=None_, _maxvalue\=None_, _parent\=None_)[¶](#tkinter.simpledialog.askfloat "Link to this definition")

tkinter.simpledialog.askinteger(_title_, _prompt_, _\*_, _initialvalue\=None_, _minvalue\=None_, _maxvalue\=None_, _parent\=None_)[¶](#tkinter.simpledialog.askinteger "Link to this definition")

tkinter.simpledialog.askstring(_title_, _prompt_, _\*_, _initialvalue\=None_, _show\=None_, _parent\=None_)[¶](#tkinter.simpledialog.askstring "Link to this definition")

提示用户输入所要求类型的值并将其返回，或者如果对话框被取消则返回 `None`。

_title_ 为对话框标题而 _prompt_ 为显示在输入框上方的消息。 _initialvalue_ 是放在输入框内的初始值。_parent_ 是显示对话框的窗口。 [`askinteger()`](#tkinter.simpledialog.askinteger "tkinter.simpledialog.askinteger") 和 [`askfloat()`](#tkinter.simpledialog.askfloat "tkinter.simpledialog.askfloat") 还接受 _minvalue_ 和 _maxvalue_，用于设置可接受的值范围。 [`askstring()`](#tkinter.simpledialog.askstring "tkinter.simpledialog.askstring") 还接受 _show_，用作输入文本的屏蔽字符，例如用 `'*'` 来隐藏密码。

_class_ tkinter.simpledialog.Dialog(_parent_, _title\=None_)[¶](#tkinter.simpledialog.Dialog "Link to this definition")

自定义对话框的基类。 将其实例化将显示模态对话框并在用户关闭它时返回；输入的值将在 `result` 属性中可用。

result[¶](#tkinter.simpledialog.Dialog.result "Link to this definition")

由 [`apply()`](#tkinter.simpledialog.Dialog.apply "tkinter.simpledialog.Dialog.apply") 产生的值，或者如果对话框被取消则为 `None`。

body(_master_)[¶](#tkinter.simpledialog.Dialog.body "Link to this definition")

可以覆盖，用于构建对话框的界面，并返回初始焦点所在的部件。

buttonbox()[¶](#tkinter.simpledialog.Dialog.buttonbox "Link to this definition")

加入 OK 和 Cancel 按钮的默认行为。重写自定义按钮布局。

validate()[¶](#tkinter.simpledialog.Dialog.validate "Link to this definition")

Validate the data entered by the user. Return true if it is valid, in which case the dialog proceeds to [`apply()`](#tkinter.simpledialog.Dialog.apply "tkinter.simpledialog.Dialog.apply"); return false to keep the dialog open. The default implementation always returns true; override it to check the input.

apply()[¶](#tkinter.simpledialog.Dialog.apply "Link to this definition")

Process the data entered by the user, for example by storing it in the `result` attribute. Called after [`validate()`](#tkinter.simpledialog.Dialog.validate "tkinter.simpledialog.Dialog.validate") succeeds and just before the dialog is destroyed. The default implementation does nothing; override it to act on or store the result.

destroy()[¶](#tkinter.simpledialog.Dialog.destroy "Link to this definition")

Destroy the dialog window, clearing the reference to the widget that had the initial focus.

_class_ tkinter.simpledialog.SimpleDialog(_master_, _text\=''_, _buttons\=\[\]_, _default\=None_, _cancel\=None_, _title\=None_, _class\_\=None_)[¶](#tkinter.simpledialog.SimpleDialog "Link to this definition")

A simple modal dialog that displays the message _text_ above a row of push buttons whose labels are given by _buttons_, and returns the index of the button the user presses. _default_ is the index of the button activated by the Return key, _cancel_ the index returned when the window is closed through the window manager, _title_ the window title, and _class\__ the Tk class name of the window.

go()[¶](#tkinter.simpledialog.SimpleDialog.go "Link to this definition")

Display the dialog, wait until the user presses a button or closes the window, and return the index of the chosen button.

## `tkinter.filedialog` --- 文件选择对话框[¶](#module-tkinter.filedialog "Link to this heading")

**源码:** [Lib/tkinter/filedialog.py](https://github.com/python/cpython/tree/3.14/Lib/tkinter/filedialog.py)

* * *

`tkinter.filedialog` 模块提供了用于创建文件/目录选择窗口的类和工厂函数。

### 原生的载入/保存对话框[¶](#native-load-save-dialogs "Link to this heading")

以下类和函数提供了文件对话窗口，这些窗口带有原生外观，具备可定制行为的配置项。这些关键字参数适用于下列类和函数：

> _parent_ —— 将对话框置于其上方的窗口
> 
> _title_ —— 窗口的标题
> 
> _initialdir_ —— 对话框的启动目录
> 
> _initialfile_ —— 打开对话框时选中的文件
> 
> _filetypes_ —— （标签，匹配模式）元组构成的列表，允许使用“\*”通配符
> 
> _defaultextension_ —— 默认的扩展名，用于加到文件名后面（保存对话框）。
> 
> _multiple_ —— 为 True 则允许多选

**静态工厂函数**

The below functions when called create a modal, native look-and-feel dialog, wait for the user's selection, and return it. The exact return value depends on the function (see below); when the dialog is cancelled it is an empty string, an empty tuple or `None`. The precise type of this empty value may vary between platforms and Tk versions, so test the result for truth rather than comparing it with a specific value.

tkinter.filedialog.askopenfile(_mode\='r'_, _\*\*options_)[¶](#tkinter.filedialog.askopenfile "Link to this definition")

tkinter.filedialog.askopenfiles(_mode\='r'_, _\*\*options_)[¶](#tkinter.filedialog.askopenfiles "Link to this definition")

Create an [`Open`](#tkinter.filedialog.Open "tkinter.filedialog.Open") dialog. `askopenfile()` returns the opened file object, or `None` if the dialog is cancelled. `askopenfiles()` returns a list of the opened file objects, or an empty tuple if cancelled. The files are opened in mode _mode_ (read-only `'r'` by default).

tkinter.filedialog.asksaveasfile(_mode\='w'_, _\*\*options_)[¶](#tkinter.filedialog.asksaveasfile "Link to this definition")

Create a [`SaveAs`](#tkinter.filedialog.SaveAs "tkinter.filedialog.SaveAs") dialog and return the opened file object, or `None` if the dialog is cancelled. The file is opened in mode _mode_ (`'w'` by default).

tkinter.filedialog.askopenfilename(_\*\*options_)[¶](#tkinter.filedialog.askopenfilename "Link to this definition")

tkinter.filedialog.askopenfilenames(_\*\*options_)[¶](#tkinter.filedialog.askopenfilenames "Link to this definition")

Create an [`Open`](#tkinter.filedialog.Open "tkinter.filedialog.Open") dialog. `askopenfilename()` returns the selected filename as a string, or an empty string if the dialog is cancelled. `askopenfilenames()` returns a tuple of the selected filenames, or an empty tuple if cancelled.

tkinter.filedialog.asksaveasfilename(_\*\*options_)[¶](#tkinter.filedialog.asksaveasfilename "Link to this definition")

Create a [`SaveAs`](#tkinter.filedialog.SaveAs "tkinter.filedialog.SaveAs") dialog and return the selected filename as a string, or an empty string if the dialog is cancelled.

tkinter.filedialog.askdirectory(_\*\*options_)[¶](#tkinter.filedialog.askdirectory "Link to this definition")

Prompt the user to select a directory, and return its path as a string, or an empty string if the dialog is cancelled. Additional keyword option: _mustexist_ - if true, the user may only select an existing directory (false by default).

_class_ tkinter.filedialog.Open(_master\=None_, _\*\*options_)[¶](#tkinter.filedialog.Open "Link to this definition")

_class_ tkinter.filedialog.SaveAs(_master\=None_, _\*\*options_)[¶](#tkinter.filedialog.SaveAs "Link to this definition")

_class_ tkinter.filedialog.Directory(_master\=None_, _\*\*options_)[¶](#tkinter.filedialog.Directory "Link to this definition")

The above three classes provide native dialog windows for loading and saving files and for selecting a directory.

**便捷类**

以下类用于从头开始创建文件/目录窗口。不会模仿当前系统的原生外观。

备注

为了实现自定义的事件处理和行为，应继承 _FileDialog_ 类。

_class_ tkinter.filedialog.FileDialog(_master_, _title\=None_)[¶](#tkinter.filedialog.FileDialog "Link to this definition")

创建一个简单的文件选择对话框。

cancel\_command(_event\=None_)[¶](#tkinter.filedialog.FileDialog.cancel_command "Link to this definition")

触发对话窗口的终止。

dirs\_double\_event(_event_)[¶](#tkinter.filedialog.FileDialog.dirs_double_event "Link to this definition")

目录双击事件的处理程序。

dirs\_select\_event(_event_)[¶](#tkinter.filedialog.FileDialog.dirs_select_event "Link to this definition")

目录单击事件的处理程序。

files\_double\_event(_event_)[¶](#tkinter.filedialog.FileDialog.files_double_event "Link to this definition")

文件双击事件的处理程序。

files\_select\_event(_event_)[¶](#tkinter.filedialog.FileDialog.files_select_event "Link to this definition")

文件单击事件的处理程序。

filter\_command(_event\=None_)[¶](#tkinter.filedialog.FileDialog.filter_command "Link to this definition")

按目录筛选文件。

get\_filter()[¶](#tkinter.filedialog.FileDialog.get_filter "Link to this definition")

获取当前使用的文件筛选器。

get\_selection()[¶](#tkinter.filedialog.FileDialog.get_selection "Link to this definition")

获取当前选中项。

go(_dir\_or\_file\=os.curdir_, _pattern\='\*'_, _default\=''_, _key\=None_)[¶](#tkinter.filedialog.FileDialog.go "Link to this definition")

显示对话框并启动事件循环。

ok\_event(_event_)[¶](#tkinter.filedialog.FileDialog.ok_event "Link to this definition")

退出对话框并返回当前选中项。

ok\_command()[¶](#tkinter.filedialog.FileDialog.ok_command "Link to this definition")

Called when the user confirms the current selection. The base implementation accepts the selection and closes the dialog; [`LoadFileDialog`](#tkinter.filedialog.LoadFileDialog "tkinter.filedialog.LoadFileDialog") and [`SaveFileDialog`](#tkinter.filedialog.SaveFileDialog "tkinter.filedialog.SaveFileDialog") override it to check the selection first.

quit(_how\=None_)[¶](#tkinter.filedialog.FileDialog.quit "Link to this definition")

退出对话框并返回文件名。

set\_filter(_dir_, _pat_)[¶](#tkinter.filedialog.FileDialog.set_filter "Link to this definition")

设置文件筛选器。

set\_selection(_file_)[¶](#tkinter.filedialog.FileDialog.set_selection "Link to this definition")

将当前选中文件更新为 _file_。

_class_ tkinter.filedialog.LoadFileDialog(_master_, _title\=None_)[¶](#tkinter.filedialog.LoadFileDialog "Link to this definition")

FileDialog 的一个子类，创建用于选取已有文件的对话窗口。

ok\_command()[¶](#tkinter.filedialog.LoadFileDialog.ok_command "Link to this definition")

检测有否给出文件，以及选中的文件是否存在。

_class_ tkinter.filedialog.SaveFileDialog(_master_, _title\=None_)[¶](#tkinter.filedialog.SaveFileDialog "Link to this definition")

FileDialog 的一个子类，创建用于选择目标文件的对话窗口。

ok\_command()[¶](#tkinter.filedialog.SaveFileDialog.ok_command "Link to this definition")

检测选中项是否指向一个非目录的有效文件。如果选中了已存在的文件，则需要用户进行确认。

## `tkinter.commondialog` --- 对话框窗口模板Dialog window templates[¶](#module-tkinter.commondialog "Link to this heading")

**源码:** [Lib/tkinter/commondialog.py](https://github.com/python/cpython/tree/3.14/Lib/tkinter/commondialog.py)

* * *

The `tkinter.commondialog` module provides the [`Dialog`](#tkinter.commondialog.Dialog "tkinter.commondialog.Dialog") class that is the base class for dialogs defined in other supporting modules.

_class_ tkinter.commondialog.Dialog(_master\=None_, _\*\*options_)[¶](#tkinter.commondialog.Dialog "Link to this definition")

show(_\*\*options_)[¶](#tkinter.commondialog.Dialog.show "Link to this definition")

显示对话窗口。

## `tkinter.dialog` --- Classic Tk dialog boxes[¶](#module-tkinter.dialog "Link to this heading")

**Source code:** [Lib/tkinter/dialog.py](https://github.com/python/cpython/tree/3.14/Lib/tkinter/dialog.py)

* * *

The `tkinter.dialog` module provides a simple modal dialog box built on the classic (non-themed) Tk widgets.

tkinter.dialog.DIALOG\_ICON[¶](#tkinter.dialog.DIALOG_ICON "Link to this definition")

The name of a bitmap (`'questhead'`) suitable for use as the _bitmap_ of a [`Dialog`](#tkinter.dialog.Dialog "tkinter.dialog.Dialog").

_class_ tkinter.dialog.Dialog(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.dialog.Dialog "Link to this definition")

Display a modal dialog box built from the classic (non-themed) Tk widgets and wait for the user to press one of its buttons. The options, given through _cnf_ or as keyword arguments, are all required: _title_ (the window title), _text_ (the message), _bitmap_ (the name of a bitmap icon, such as [`DIALOG_ICON`](#tkinter.dialog.DIALOG_ICON "tkinter.dialog.DIALOG_ICON")), _default_ (the index of the default button) and _strings_ (the sequence of button labels). After construction, the `num` attribute holds the index of the button the user pressed.

destroy()[¶](#tkinter.dialog.Dialog.destroy "Link to this definition")

Do nothing. The dialog window is destroyed automatically before the constructor returns, so there is nothing left for this method to do.
