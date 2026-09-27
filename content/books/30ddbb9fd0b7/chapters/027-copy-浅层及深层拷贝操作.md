**源代码:** [Lib/copy.py](https://github.com/python/cpython/tree/3.14/Lib/copy.py)

* * *

Python 的赋值语句不复制对象，而是创建目标和对象的绑定关系。对于自身可变，或包含可变项的集合，有时要生成副本用于改变操作，而不必改变原始对象。本模块提供了通用的浅层复制和深层复制操作，（如下所述）。

接口摘要：

copy.copy(_obj_)[¶](#copy.copy "Link to this definition")

返回 _obj_ 的浅拷贝。

copy.deepcopy(_obj_\[, _memo_\])[¶](#copy.deepcopy "Link to this definition")

返回 _obj_ 的深拷贝。

copy.replace(_obj_, _/_, _\*\*changes_)[¶](#copy.replace "Link to this definition")

新建一个与 _obj_ 类型相同的对象，使用来自 _changes_ 的值替换字段。

Added in version 3.13.

_exception_ copy.Error[¶](#copy.Error "Link to this definition")

针对模块特定错误引发。

浅层与深层复制的区别仅与复合对象（即包含列表或类的实例等其他对象的对象）相关：

-   _浅层复制_ 构造一个新的复合对象，然后（在尽可能的范围内）将原始对象中找到的对象的 _引用_ 插入其中。
    
-   _深层复制_ 构造一个新的复合对象，然后，递归地将在原始对象里找到的对象的 _副本_ 插入其中。
    

深层复制操作通常存在两个问题, 而浅层复制操作并不存在这些问题：

-   递归对象 (直接或间接包含对自身引用的复合对象) 可能会导致递归循环。
    
-   由于深层复制会复制所有内容，因此可能会过多复制（例如本应该在副本之间共享的数据）。
    

[`deepcopy()`](#copy.deepcopy "copy.deepcopy") 函数用以下方式避免了这些问题：

-   保留在当前复制过程中已复制的对象的 "备忘录" (`memo`) 字典；以及
    
-   允许用户定义的类重写复制操作或复制的组件集合。
    

此模块不会复制模块、方法、栈追踪、栈帧、文件、套接字、窗口以及任何相似的类型。 它会通过不加修改地返回原始对象来（浅层或深层地）“复制”函数和类；这与 [`pickle`](https://docs.python.org/zh-cn/3/library/pickle.html#module-pickle "pickle: Convert Python objects to streams of bytes and back.") 模块处理这类问题的方式是兼容的。

生成各种多项集的浅拷贝可以使用相应的 `copy()` 方法 (如 [`list.copy()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list.copy "list.copy"), [`dict.copy()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict.copy "dict.copy") 或 [`set.copy()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#set.copy "set.copy"))，对于序列（如列表或字节数组）可以通过对整个序列进行切片 (`sequence[:]`)。 不过，这些方法和切片可以在拷贝子类实例时创建基类型的实例，而 [`copy.copy()`](#copy.copy "copy.copy") 通常返回相同类型的实例。

类可以使用与控制 pickle 操作相同的接口来控制拷贝操作。 关于这些方法的描述信息请参考 [`pickle`](https://docs.python.org/zh-cn/3/library/pickle.html#module-pickle "pickle: Convert Python objects to streams of bytes and back.") 模块。 实际上，`copy` 模块就是使用从 [`copyreg`](https://docs.python.org/zh-cn/3/library/copyreg.html#module-copyreg "copyreg: Register pickle support functions.") 模块中注册的 pickle 函数。

为了让一个类能够定义它自己的拷贝实现，它可以定义特殊方法 [`__copy__()`](#object.__copy__ "object.__copy__") 和 [`__deepcopy__()`](#object.__deepcopy__ "object.__deepcopy__")。

object.\_\_copy\_\_(_self_)[¶](#object.__copy__ "Link to this definition")

调用以实现浅拷贝操作；无须传入任何额外参数。

object.\_\_deepcopy\_\_(_self_, _memo_)[¶](#object.__deepcopy__ "Link to this definition")

调用以实现深拷贝操作；它将传入一个参数，即 _memo_ 字典。 如果 `__deepcopy__` 实现需要创建一个组件的深拷贝，它应当调用 [`deepcopy()`](#copy.deepcopy "copy.deepcopy") 函数并将该组件作为第一个参数而将 _memo_ 字典作为第二个参数。 _memo_ 字典应当被当作不透明对象来处理。

函数 `copy.replace()` 相比 [`copy()`](#copy.copy "copy.copy") 和 [`deepcopy()`](#copy.deepcopy "copy.deepcopy") 受到更多的限制，并且仅支持由 [`namedtuple()`](https://docs.python.org/zh-cn/3/library/collections.html#collections.namedtuple "collections.namedtuple") 创建的命名元组, [`dataclasses`](https://docs.python.org/zh-cn/3/library/dataclasses.html#module-dataclasses "dataclasses: Generate special methods on user-defined classes.") 及其他定义了 [`__replace__()`](#object.__replace__ "object.__replace__") 方法的类。

object.\_\_replace\_\_(_self_, _/_, _\*\*changes_)[¶](#object.__replace__ "Link to this definition")

此方法应当新建一个具有相同类型的对象，使用来自 _changes_ 的值替换字段。

Added in version 3.13.

参见

模块 [`pickle`](https://docs.python.org/zh-cn/3/library/pickle.html#module-pickle "pickle: Convert Python objects to streams of bytes and back.")

讨论了支持对象状态检索和恢复的特殊方法。
