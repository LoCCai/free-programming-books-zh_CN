**源代码:** [Lib/tkinter/dnd.py](https://github.com/python/cpython/tree/3.14/Lib/tkinter/dnd.py)

* * *

备注

此模块是实验性的且在为 Tk DND 所替代后将被弃用。

The `tkinter.dnd` module provides drag-and-drop support for objects within a single application, within the same window or between windows. To enable an object to be dragged, you must create an event binding for it that starts the drag-and-drop process. Typically, you bind a ButtonPress event to a callback function that you write (see [绑定和事件](https://docs.python.org/zh-cn/3/library/tkinter.html#bindings-and-events)). The function should call [`dnd_start()`](#tkinter.dnd.dnd_start "tkinter.dnd.dnd_start"), where _source_ is the object to be dragged, and _event_ is the event that invoked the call (the argument to your callback function).

目标对象的选择方式如下:

1.  从顶至底地在鼠标之下区域中搜索目标控件：
    
    -   目标控件应当具有一个指向可调用对象的 _dnd\_accept_ 属性；
        
    -   if _dnd\_accept_ is not present or returns `None`, the search moves to the parent widget;
        
    -   if no target widget is found, the target object is `None`.
        
2.  Call to `<old_target>.dnd_leave(source, event)`.
    
3.  Call to `<new_target>.dnd_enter(source, event)`.
    
4.  Call to `<target>.dnd_commit(source, event)` to notify of the drop.
    
5.  Call to `<source>.dnd_end(target, event)` to signal the end of drag-and-drop.
    

_class_ tkinter.dnd.DndHandler(_source_, _event_)[¶](#tkinter.dnd.DndHandler "Link to this definition")

_DndHandler_ 类处理拖放事件，在事件控件的根对象上跟踪 Motion 和 ButtonRelease 事件。

cancel(_event\=None_)[¶](#tkinter.dnd.DndHandler.cancel "Link to this definition")

取消拖放进程。

finish(_event_, _commit\=0_)[¶](#tkinter.dnd.DndHandler.finish "Link to this definition")

执行结束拖放函数。

on\_motion(_event_)[¶](#tkinter.dnd.DndHandler.on_motion "Link to this definition")

Inspect area below mouse for target objects while a drag is performed.

on\_release(_event_)[¶](#tkinter.dnd.DndHandler.on_release "Link to this definition")

当释放模式被触发时表明拖动的结束。

tkinter.dnd.dnd\_start(_source_, _event_)[¶](#tkinter.dnd.dnd_start "Link to this definition")

Factory function for the drag-and-drop process. Return the [`DndHandler`](#tkinter.dnd.DndHandler "tkinter.dnd.DndHandler") instance managing the drag, or `None` if a drag could not be started.
