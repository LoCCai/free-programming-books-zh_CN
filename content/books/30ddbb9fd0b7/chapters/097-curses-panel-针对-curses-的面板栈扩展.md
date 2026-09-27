* * *

面板是具有添加深度功能的窗口，因此它们可以从上至下堆叠为栈，只有显示每个窗口的可见部分会显示出来。 面板可以在栈中被添加、上移或下移，也可以被移除。

## 函数[¶](#functions "Link to this heading")

The module `curses.panel` defines the following exception:

_exception_ curses.panel.error[¶](#curses.panel.error "Link to this definition")

Exception raised when a curses panel library function returns an error.

`curses.panel` 模块定义了下列函数：

curses.panel.bottom\_panel()[¶](#curses.panel.bottom_panel "Link to this definition")

返回面板栈中的底部面板。

curses.panel.new\_panel(_win_)[¶](#curses.panel.new_panel "Link to this definition")

Returns a panel object, associating it with the given window _win_ and placing the new panel on top of the panel stack. Be aware that you need to keep the returned panel object referenced explicitly. If you don't, the panel object is garbage collected and removed from the panel stack.

curses.panel.top\_panel()[¶](#curses.panel.top_panel "Link to this definition")

返回面板栈中的顶部面板。

curses.panel.update\_panels()[¶](#curses.panel.update_panels "Link to this definition")

在面板栈发生改变后更新虚拟屏幕。 这不会调用 [`curses.doupdate()`](https://docs.python.org/zh-cn/3/library/curses.html#curses.doupdate "curses.doupdate")，因此你必须自己来调用。

## Panel objects[¶](#panel-objects "Link to this heading")

_class_ curses.panel.panel[¶](#curses.panel.panel "Link to this definition")

Panel objects, as returned by [`new_panel()`](#curses.panel.new_panel "curses.panel.new_panel") above, are windows with a stacking order. There's always a window associated with a panel which determines the content, while the panel methods are responsible for the window's depth in the panel stack.

Panel 对象具有以下方法:

panel.above()[¶](#curses.panel.panel.above "Link to this definition")

返回当前面板之上的面板。

panel.below()[¶](#curses.panel.panel.below "Link to this definition")

返回当前面板之下的面板。

panel.bottom()[¶](#curses.panel.panel.bottom "Link to this definition")

将面板推至栈底部。

panel.hidden()[¶](#curses.panel.panel.hidden "Link to this definition")

如果面板被隐藏（不可见）则返回 `True`，否则返回 `False`。

panel.hide()[¶](#curses.panel.panel.hide "Link to this definition")

隐藏面板。 这不会删除对象，它只是让窗口在屏幕上不可见。

panel.move(_y_, _x_)[¶](#curses.panel.panel.move "Link to this definition")

将面板移至屏幕坐标 `(y, x)`。

panel.replace(_win_)[¶](#curses.panel.panel.replace "Link to this definition")

将与面板相关联的窗口改为窗口 _win_。

panel.set\_userptr(_obj_)[¶](#curses.panel.panel.set_userptr "Link to this definition")

将面板的用户指针设为 _obj_。 这被用来将任意数据与面板相关联，数据可以是任何 Python 对象。

panel.show()[¶](#curses.panel.panel.show "Link to this definition")

Display the panel (which might have been hidden), placing it on top of the panel stack.

panel.top()[¶](#curses.panel.panel.top "Link to this definition")

将面板推至栈顶部。

panel.userptr()[¶](#curses.panel.panel.userptr "Link to this definition")

返回面板的用户指针。 这可以是任何 Python 对象。

panel.window()[¶](#curses.panel.panel.window "Link to this definition")

返回与面板相关联的窗口对象。
