Added in version 3.3: 该模块曾是 [`collections`](https://docs.python.org/zh-cn/3/library/collections.html#module-collections "collections: Container datatypes") 模块的组成部分。

**源代码：** [Lib/\_collections\_abc.py](https://github.com/python/cpython/tree/3.14/Lib/_collections_abc.py)

* * *

本模块提供了一些 [抽象基类](https://docs.python.org/zh-cn/3/glossary.html#term-abstract-base-class)，它们可被用于测试一个类是否提供某个特定的接口；例如，它是否为 [hashable](https://docs.python.org/zh-cn/3/glossary.html#term-hashable) 或是否为 [mapping](https://docs.python.org/zh-cn/3/glossary.html#term-mapping) 等。

一个接口的 [`issubclass()`](https://docs.python.org/zh-cn/3/builtins/functions.html#issubclass "issubclass") 或 [`isinstance()`](https://docs.python.org/zh-cn/3/builtins/functions.html#isinstance "isinstance") 测试采用以下三种方式之一。

1.  新编写的类可以直接继承自某个抽象基类。 该类必须提供所需的抽象方法。 其余混入方法来自于继承并且可在需要时被重写。 其他方法可按需添加：
    
    class C(Sequence):                      \# 直接继承
        def \_\_init\_\_(self): ...             \# ABC 所不需要的额外方法
        def \_\_getitem\_\_(self, index):  ...  \# 需要的抽象方法
        def \_\_len\_\_(self):  ...             \# 需要的抽象方法
        def count(self, value): ...         \# 可选覆盖一个混入方法
    
    \>>> issubclass(C, Sequence)
    True
    \>>> isinstance(C(), Sequence)
    True
    
2.  已有的类和内置类可被注册为 ABC 的"虚拟子类"。 这些类应当定义完整的 API 包括所有抽象方法和所有混入方法。 这使得用户能依靠 [`issubclass()`](https://docs.python.org/zh-cn/3/builtins/functions.html#issubclass "issubclass") 或 [`isinstance()`](https://docs.python.org/zh-cn/3/builtins/functions.html#isinstance "isinstance") 测试来确定完整接口是否受到支持。 此规则的例外情况是那些从 API 的其他部分自动推断出来的方法：
    
    class D:                                 \# 无继承
        def \_\_init\_\_(self): ...              \# ABC 所不需要的额外方法
        def \_\_getitem\_\_(self, index):  ...   \# 抽象方法
        def \_\_len\_\_(self):  ...              \# 抽象方法
        def count(self, value): ...          \# 混入方法
        def index(self, value): ...          \# 混入方法
    
    Sequence.register(D)                     \# 注册而非继承
    
    \>>> issubclass(D, Sequence)
    True
    \>>> isinstance(D(), Sequence)
    True
    
    在这个例子中，`D` 类不需要定义 `__contains__`, `__iter__` 和 `__reversed__`，因为 [in 运算符](https://docs.python.org/zh-cn/3/reference/expressions.html#comparisons), [迭代](https://docs.python.org/zh-cn/3/glossary.html#term-iterable) 逻辑和 [`reversed()`](https://docs.python.org/zh-cn/3/builtins/functions.html#reversed "reversed") 函数会自动回退为使用 `__getitem__` 和 `__len__`。
    
3.  某些简单接口可以根据所需方法是否存在来直接识别 (除非这些方法已被设置为 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")):
    
    class E:
        def \_\_iter\_\_(self): ...
        def \_\_next\_\_(self): ...
    
    \>>> issubclass(E, Iterable)
    True
    \>>> isinstance(E(), Iterable)
    True
    
    复杂的接口不支持最后这种技术手段因为接口并不只是作为方法名称存在。 接口指明了方法之间的语义和关系，这些是无法根据特定方法名称的存在推断出来的。 例如，知道一个类提供了 `__getitem__`, `__len__` 和 `__iter__` 并不足以区分 [`Sequence`](#collections.abc.Sequence "collections.abc.Sequence") 和 [`Mapping`](#collections.abc.Mapping "collections.abc.Mapping")。
    

## 容器抽象基类[¶](#collections-abstract-base-classes "Link to this heading")

collections 模块提供了以下 [ABCs](https://docs.python.org/zh-cn/3/glossary.html#term-abstract-base-class):

| 
抽象基类

 | 

继承自

 | 

抽象方法

 | 

混入方法

 |
| --- | --- | --- | --- |
| 

[`Container`](#collections.abc.Container "collections.abc.Container") [\[1\]](#id18)

 |  | 

`__contains__`

 |  |
| 

[`Hashable`](#collections.abc.Hashable "collections.abc.Hashable") [\[1\]](#id18)

 |  | 

`__hash__`

 |  |
| 

[`Iterable`](#collections.abc.Iterable "collections.abc.Iterable") [\[1\]](#id18) [\[2\]](#id19)

 |  | 

`__iter__`

 |  |
| 

[`Iterator`](#collections.abc.Iterator "collections.abc.Iterator") [\[1\]](#id18)

 | 

[`Iterable`](#collections.abc.Iterable "collections.abc.Iterable")

 | 

`__next__`

 | 

`__iter__`

 |
| 

[`Reversible`](#collections.abc.Reversible "collections.abc.Reversible") [\[1\]](#id18)

 | 

[`Iterable`](#collections.abc.Iterable "collections.abc.Iterable")

 | 

`__reversed__`

 |  |
| 

[`Generator`](#collections.abc.Generator "collections.abc.Generator") [\[1\]](#id18)

 | 

[`Iterator`](#collections.abc.Iterator "collections.abc.Iterator")

 | 

`send`, `throw`

 | 

`close`, `__iter__`, `__next__`

 |
| 

[`Sized`](#collections.abc.Sized "collections.abc.Sized") [\[1\]](#id18)

 |  | 

`__len__`

 |  |
| 

[`Callable`](#collections.abc.Callable "collections.abc.Callable") [\[1\]](#id18)

 |  | 

`__call__`

 |  |
| 

[`Collection`](#collections.abc.Collection "collections.abc.Collection") [\[1\]](#id18)

 | 

[`Sized`](#collections.abc.Sized "collections.abc.Sized"), [`Iterable`](#collections.abc.Iterable "collections.abc.Iterable"), [`Container`](#collections.abc.Container "collections.abc.Container")

 | 

`__contains__`, `__iter__`, `__len__`

 |  |
| 

[`Sequence`](#collections.abc.Sequence "collections.abc.Sequence")

 | 

[`Reversible`](#collections.abc.Reversible "collections.abc.Reversible"), [`Collection`](#collections.abc.Collection "collections.abc.Collection")

 | 

`__getitem__`, `__len__`

 | 

`__contains__`, `__iter__`, `__reversed__`, `index` 和 `count`

 |
| 

[`MutableSequence`](#collections.abc.MutableSequence "collections.abc.MutableSequence")

 | 

[`Sequence`](#collections.abc.Sequence "collections.abc.Sequence")

 | 

`__getitem__`, `__setitem__`, `__delitem__`, `__len__`, `insert`

 | 

继承了 [`Sequence`](#collections.abc.Sequence "collections.abc.Sequence") 的方法以及 `append`, `clear`, `reverse`, `extend`, `pop`, `remove` 和 `__iadd__`

 |
| 

[`ByteString`](#collections.abc.ByteString "collections.abc.ByteString")

 | 

[`Sequence`](#collections.abc.Sequence "collections.abc.Sequence")

 | 

`__getitem__`, `__len__`

 | 

继承的 [`Sequence`](#collections.abc.Sequence "collections.abc.Sequence") 方法

 |
| 

[`Set`](#collections.abc.Set "collections.abc.Set")

 | 

[`Collection`](#collections.abc.Collection "collections.abc.Collection")

 | 

`__contains__`, `__iter__`, `__len__`

 | 

`__le__`, `__lt__`, `__eq__`, `__ne__`, `__gt__`, `__ge__`, `__and__`, `__or__`, `__sub__`, `__rsub__`, `__xor__`, `__rxor__` 和 `isdisjoint`

 |
| 

[`MutableSet`](#collections.abc.MutableSet "collections.abc.MutableSet")

 | 

[`Set`](#collections.abc.Set "collections.abc.Set")

 | 

`__contains__`, `__iter__`, `__len__`, `add`, `discard`

 | 

继承自 [`Set`](#collections.abc.Set "collections.abc.Set") 的方法以及 `clear`, `pop`, `remove`, `__ior__`, `__iand__`, `__ixor__`，和 `__isub__`

 |
| 

[`Mapping`](#collections.abc.Mapping "collections.abc.Mapping")

 | 

[`Collection`](#collections.abc.Collection "collections.abc.Collection")

 | 

`__getitem__`, `__iter__`, `__len__`

 | 

`__contains__`, `keys`, `items`, `values`, `get`, `__eq__` 和 `__ne__`

 |
| 

[`MutableMapping`](#collections.abc.MutableMapping "collections.abc.MutableMapping")

 | 

[`Mapping`](#collections.abc.Mapping "collections.abc.Mapping")

 | 

`__getitem__`, `__setitem__`, `__delitem__`, `__iter__`, `__len__`

 | 

继承自 [`Mapping`](#collections.abc.Mapping "collections.abc.Mapping") 的方法以及 `pop`, `popitem`, `clear`, `update`，和 `setdefault`

 |
| 

[`MappingView`](#collections.abc.MappingView "collections.abc.MappingView")

 | 

[`Sized`](#collections.abc.Sized "collections.abc.Sized")

 |  | 

`__init__`, `__len__` 和 `__repr__`

 |
| 

[`ItemsView`](#collections.abc.ItemsView "collections.abc.ItemsView")

 | 

[`MappingView`](#collections.abc.MappingView "collections.abc.MappingView"), [`Set`](#collections.abc.Set "collections.abc.Set")

 |  | 

`__contains__`, `__iter__`

 |
| 

[`KeysView`](#collections.abc.KeysView "collections.abc.KeysView")

 | 

[`MappingView`](#collections.abc.MappingView "collections.abc.MappingView"), [`Set`](#collections.abc.Set "collections.abc.Set")

 |  | 

`__contains__`, `__iter__`

 |
| 

[`ValuesView`](#collections.abc.ValuesView "collections.abc.ValuesView")

 | 

[`MappingView`](#collections.abc.MappingView "collections.abc.MappingView"), [`Collection`](#collections.abc.Collection "collections.abc.Collection")

 |  | 

`__contains__`, `__iter__`

 |
| 

[`Awaitable`](#collections.abc.Awaitable "collections.abc.Awaitable") [\[1\]](#id18)

 |  | 

`__await__`

 |  |
| 

[`Coroutine`](#collections.abc.Coroutine "collections.abc.Coroutine") [\[1\]](#id18)

 | 

[`Awaitable`](#collections.abc.Awaitable "collections.abc.Awaitable")

 | 

`send`, `throw`

 | 

`close`

 |
| 

[`AsyncIterable`](#collections.abc.AsyncIterable "collections.abc.AsyncIterable") [\[1\]](#id18)

 |  | 

`__aiter__`

 |  |
| 

[`AsyncIterator`](#collections.abc.AsyncIterator "collections.abc.AsyncIterator") [\[1\]](#id18)

 | 

[`AsyncIterable`](#collections.abc.AsyncIterable "collections.abc.AsyncIterable")

 | 

`__anext__`

 | 

`__aiter__`

 |
| 

[`AsyncGenerator`](#collections.abc.AsyncGenerator "collections.abc.AsyncGenerator") [\[1\]](#id18)

 | 

[`AsyncIterator`](#collections.abc.AsyncIterator "collections.abc.AsyncIterator")

 | 

`asend`, `athrow`

 | 

`aclose`, `__aiter__`, `__anext__`

 |
| 

[`Buffer`](#collections.abc.Buffer "collections.abc.Buffer") [\[1\]](#id18)

 |  | 

`__buffer__`

 |  |

附注

## 多项集抽象基类 -- 详细描述[¶](#collections-abstract-base-classes-detailed-descriptions "Link to this heading")

_class_ collections.abc.Container[¶](#collections.abc.Container "Link to this definition")

提供了 [`__contains__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__contains__ "object.__contains__") 方法的抽象基类。

_class_ collections.abc.Hashable[¶](#collections.abc.Hashable "Link to this definition")

提供了 [`__hash__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__hash__ "object.__hash__") 方法的抽象基类。

_class_ collections.abc.Sized[¶](#collections.abc.Sized "Link to this definition")

用于提供 [`__len__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__len__ "object.__len__") 方法的类的 ABC

_class_ collections.abc.Callable[¶](#collections.abc.Callable "Link to this definition")

用于提供 [`__call__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__call__ "object.__call__") 方法的类的 ABC

有关如何在类型标注中使用 `Callable` 的详细信息请参阅 [标注可调用对象](https://docs.python.org/zh-cn/3/library/typing.html#annotating-callables)。

_class_ collections.abc.Iterable[¶](#collections.abc.Iterable "Link to this definition")

用于提供 [`__iter__()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#container.__iter__ "container.__iter__") 方法的类的 ABC

`isinstance(obj, Iterable)` 检查能侦测到被注册为 [`Iterable`](#collections.abc.Iterable "collections.abc.Iterable") 或者具有 [`__iter__()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#container.__iter__ "container.__iter__") 方法的类，但它不能侦测到使用 [`__getitem__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__getitem__ "object.__getitem__") 方法进行迭代的类。 确定一个对象是否为 [iterable](https://docs.python.org/zh-cn/3/glossary.html#term-iterable) 的唯一可靠方式是调用 `iter(obj)`。

_class_ collections.abc.Collection[¶](#collections.abc.Collection "Link to this definition")

针对有大小的可迭代容器类的 ABC。

Added in version 3.6.

_class_ collections.abc.Iterator[¶](#collections.abc.Iterator "Link to this definition")

提供了 [`__iter__()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#iterator.__iter__ "iterator.__iter__") 和 [`__next__()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#iterator.__next__ "iterator.__next__") 方法的抽象基类。参见 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator) 的定义。

_class_ collections.abc.Reversible[¶](#collections.abc.Reversible "Link to this definition")

用于同时提供了 [`__reversed__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__reversed__ "object.__reversed__") 方法的可迭代类的 ABC

Added in version 3.6.

_class_ collections.abc.Generator[¶](#collections.abc.Generator "Link to this definition")

用于实现了 [**PEP 342**](https://peps.python.org/pep-0342/) 中定义的协议的 [generator](https://docs.python.org/zh-cn/3/glossary.html#term-generator) 类的 ABC，它通过 [`send()`](https://docs.python.org/zh-cn/3/reference/expressions.html#generator.send "generator.send"), [`throw()`](https://docs.python.org/zh-cn/3/reference/expressions.html#generator.throw "generator.throw") 和 [`close()`](https://docs.python.org/zh-cn/3/reference/expressions.html#generator.close "generator.close") 方法对 [迭代器](https://docs.python.org/zh-cn/3/glossary.html#term-iterator) 进行了扩展。

有关在类型标注中使用 `Generator` 的详细信息请参阅 [标注生成器和协程](https://docs.python.org/zh-cn/3/library/typing.html#annotating-generators-and-coroutines)。

Added in version 3.5.

_class_ collections.abc.Sequence[¶](#collections.abc.Sequence "Link to this definition")

_class_ collections.abc.MutableSequence[¶](#collections.abc.MutableSequence "Link to this definition")

_class_ collections.abc.ByteString[¶](#collections.abc.ByteString "Link to this definition")

只读的与可变的 [序列](https://docs.python.org/zh-cn/3/glossary.html#term-sequence) 的抽象基类。

实现注意事项：某些混入方法，如 [`__iter__()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#container.__iter__ "container.__iter__"), [`__reversed__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__reversed__ "object.__reversed__") 和 [`index()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#sequence.index "sequence.index")，会重复调用下层的 [`__getitem__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__getitem__ "object.__getitem__") 方法。 因此，如果 `__getitem__()` 被实现为常数级访问速度，则混入方法的性能将为线性级；但是，如果下层的方法是线性的（例如链表就是如此），则混入方法的性能将为平方级并可能需要被重写。

index(_value_, _start\=0_, _stop\=None_)[¶](#collections.abc.ByteString.index "Link to this definition")

返回首个 _value_ 的索引。

如果该值不存在则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

对 _start_ 和 _stop_ 参数的支持是可选项，但建议使用。

在 3.5 版本发生变更: [`index()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#sequence.index "sequence.index") 方法获得对 _stop_ 和 _start_ 参数的支持。

从 3.12 版起已弃用，将在 3.17 版中移除: [`ByteString`](#collections.abc.ByteString "collections.abc.ByteString") ABC 已被弃用。

使用 `isinstance(obj, collections.abc.Buffer)` 来测试 `obj` 是否在运行时实现了 [缓冲区协议](https://docs.python.org/zh-cn/3/c-api/buffer.html#bufferobjects)。 要用于类型标注，则使用 [`Buffer`](#collections.abc.Buffer "collections.abc.Buffer") 或是显式指明你的代码所支持的类型的并集 (例如 `bytes | bytearray | memoryview`)。

`ByteString` 原本是想作为 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 和 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 的超类型的抽象基类提供。 不过，由于该 ABC 从未有过任何方法，知道一个对象是 `ByteString` 的实例并不能真正告诉你有关该对象的任何有用信息。 其他常见缓冲区类型如 [`memoryview`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#memoryview "memoryview") 同样不能被当作是 `ByteString` 的子类型（无论是在运行时还是对于静态类型检查器）。

请参阅 [**PEP 688**](https://peps.python.org/pep-0688/#current-options) 了解详情。

_class_ collections.abc.Set[¶](#collections.abc.Set "Link to this definition")

_class_ collections.abc.MutableSet[¶](#collections.abc.MutableSet "Link to this definition")

用于只读和可变 [集合](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#types-set) 的 ABC。

_class_ collections.abc.Mapping[¶](#collections.abc.Mapping "Link to this definition")

_class_ collections.abc.MutableMapping[¶](#collections.abc.MutableMapping "Link to this definition")

只读的与可变的 [映射](https://docs.python.org/zh-cn/3/glossary.html#term-mapping) 的抽象基类。

_class_ collections.abc.MappingView[¶](#collections.abc.MappingView "Link to this definition")

_class_ collections.abc.ItemsView[¶](#collections.abc.ItemsView "Link to this definition")

_class_ collections.abc.KeysView[¶](#collections.abc.KeysView "Link to this definition")

_class_ collections.abc.ValuesView[¶](#collections.abc.ValuesView "Link to this definition")

映射、条目、键和值的 [视图](https://docs.python.org/zh-cn/3/glossary.html#term-dictionary-view) 的抽象基类。

_class_ collections.abc.Awaitable[¶](#collections.abc.Awaitable "Link to this definition")

针对 [awaitable](https://docs.python.org/zh-cn/3/glossary.html#term-awaitable) 对象的 ABC，它可被用于 [`await`](https://docs.python.org/zh-cn/3/reference/expressions.html#await) 表达式。 自定义实现必须提供 [`__await__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__await__ "object.__await__") 方法。

[协程](https://docs.python.org/zh-cn/3/glossary.html#term-coroutine) 对象和 [`Coroutine`](#collections.abc.Coroutine "collections.abc.Coroutine") ABC 的实例都是这个 ABC 的实例。

Added in version 3.5.

_class_ collections.abc.Coroutine[¶](#collections.abc.Coroutine "Link to this definition")

用于 [coroutine](https://docs.python.org/zh-cn/3/glossary.html#term-coroutine) 兼容类的 ABC。 实现了如下定义在 [协程对象](https://docs.python.org/zh-cn/3/reference/datamodel.html#coroutine-objects) 里的方法: [`send()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#coroutine.send "coroutine.send"), [`throw()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#coroutine.throw "coroutine.throw") 和 [`close()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#coroutine.close "coroutine.close")。 自定义实现还必须实现 [`__await__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__await__ "object.__await__")。 所有的 [`Coroutine`](#collections.abc.Coroutine "collections.abc.Coroutine") 实例同时也是 [`Awaitable`](#collections.abc.Awaitable "collections.abc.Awaitable") 的实例。

有关在类型标注中使用 `Coroutine` 的详细信息请参阅 [标注生成器和协程](https://docs.python.org/zh-cn/3/library/typing.html#annotating-generators-and-coroutines)。 类型形参的型变与顺序与 [`Generator`](#collections.abc.Generator "collections.abc.Generator") 的相对应。

Added in version 3.5.

_class_ collections.abc.AsyncIterable[¶](#collections.abc.AsyncIterable "Link to this definition")

针对提供了 `__aiter__` 方法的类的 ABC。 另请参阅 [asynchronous iterable](https://docs.python.org/zh-cn/3/glossary.html#term-asynchronous-iterable) 的定义。

Added in version 3.5.

_class_ collections.abc.AsyncIterator[¶](#collections.abc.AsyncIterator "Link to this definition")

提供了 `__aiter__` 和 `__anext__` 方法的抽象基类。参见 [asynchronous iterator](https://docs.python.org/zh-cn/3/glossary.html#term-asynchronous-iterator) 的定义。

Added in version 3.5.

_class_ collections.abc.AsyncGenerator[¶](#collections.abc.AsyncGenerator "Link to this definition")

针对实现了在 [**PEP 525**](https://peps.python.org/pep-0525/) 和 [**PEP 492**](https://peps.python.org/pep-0492/) 中定义的协议的 [asynchronous generator](https://docs.python.org/zh-cn/3/glossary.html#term-asynchronous-generator) 类的 ABC。

有关在类型标注中使用 `AsyncGenerator` 的详细信息请参阅 [标注生成器和协程](https://docs.python.org/zh-cn/3/library/typing.html#annotating-generators-and-coroutines)。

Added in version 3.6.

_class_ collections.abc.Buffer[¶](#collections.abc.Buffer "Link to this definition")

针对提供 [`__buffer__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__buffer__ "object.__buffer__") 方法的类的 ABC，实现了 [缓冲区协议](https://docs.python.org/zh-cn/3/c-api/buffer.html#bufferobjects)。 参见 [**PEP 688**](https://peps.python.org/pep-0688/)。

Added in version 3.12.

## 例子和配方[¶](#examples-and-recipes "Link to this heading")

ABC 允许我们询问类或实例是否提供特定的功能，例如:

size \= None
if isinstance(myvar, collections.abc.Sized):
    size \= len(myvar)

有些 ABC 还适用于作为混入类，这可以更容易地开发支持容器 API 的类。 例如，要写一个支持完整 [`Set`](#collections.abc.Set "collections.abc.Set") API 的类，只需要提供三个下层抽象方法: [`__contains__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__contains__ "object.__contains__"), [`__iter__()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#container.__iter__ "container.__iter__") 和 [`__len__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__len__ "object.__len__")。 ABC 会提供其余的方法如 `__and__()` 和 [`isdisjoint()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#frozenset.isdisjoint "frozenset.isdisjoint"):

class ListBasedSet(collections.abc.Set):
    ''' 空间重于速度并且不要求集合元素可哈希的
        替代性集合实现。 '''
    def \_\_init\_\_(self, iterable):
        self.elements \= lst \= \[\]
        for value in iterable:
            if value not in lst:
                lst.append(value)

    def \_\_iter\_\_(self):
        return iter(self.elements)

    def \_\_contains\_\_(self, value):
        return value in self.elements

    def \_\_len\_\_(self):
        return len(self.elements)

s1 \= ListBasedSet('abcdef')
s2 \= ListBasedSet('defghi')
overlap \= s1 & s2            \# 自动支持 \_\_and\_\_() 方法

当把 [`Set`](#collections.abc.Set "collections.abc.Set") 和 [`MutableSet`](#collections.abc.MutableSet "collections.abc.MutableSet") 用作混入类时需注意：

1.  由于某些集合操作会创建新的集合，默认的混入方法需要一种根据 [iterable](https://docs.python.org/zh-cn/3/glossary.html#term-iterable) 创建新实例的方式。 假定类构造器具有 `ClassName(iterable)` 形式的签名。 该假设被提取到一个名为 `_from_iterable()` 的内部 [`classmethod`](https://docs.python.org/zh-cn/3/builtins/functions.html#classmethod "classmethod") 中，该方法会调用 `cls(iterable)` 来产生一个新的集合。 如果 [`Set`](#collections.abc.Set "collections.abc.Set") 混入类在具有不同构造器签名的类中被使用，你将需要通过一个能根据可迭代对象参数构造新实例的类方法或常规方法来重写 `_from_iterable()`。
    
2.  要重写比较运算（应该是为了提高速度，因为其语义是固定的），请重新定义 [`__le__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__le__ "object.__le__") 和 [`__ge__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__ge__ "object.__ge__")，然后其他运算将自动跟进。
    
3.  [`Set`](#collections.abc.Set "collections.abc.Set") 混入类提供了一个 `_hash()` 方法为集合计算哈希值；不过，[`__hash__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__hash__ "object.__hash__") 没有被定义因为并非所有集合都是 [hashable](https://docs.python.org/zh-cn/3/glossary.html#term-hashable) 或不可变对象。 要使用混入类来添加集合可哈希性，请同时继承 `Set` 和 [`Hashable`](#collections.abc.Hashable "collections.abc.Hashable")，然后定义 `__hash__ = Set._hash`。
    

参见

-   [OrderedSet recipe](https://code.activestate.com/recipes/576694/) 是基于 [`MutableSet`](#collections.abc.MutableSet "collections.abc.MutableSet") 构建的一个示例。
    
-   有关 ABC 的更多信息，参见 [`abc`](https://docs.python.org/zh-cn/3/library/abc.html#module-abc "abc: Abstract base classes according to :pep:`3119`.") 模块和 [**PEP 3119**](https://peps.python.org/pep-3119/)。
