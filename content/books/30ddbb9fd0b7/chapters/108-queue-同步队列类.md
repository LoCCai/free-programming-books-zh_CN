**源代码:** [Lib/queue.py](https://github.com/python/cpython/tree/3.14/Lib/queue.py)

* * *

`queue` 模块实现了多生产者、多消费者队列。 这特别适用于消息必须安全地在多线程间交换的线程编程。 模块中的 [`Queue`](#queue.Queue "queue.Queue") 类实现了所有需要的锁语义。

本模块实现了三种类型的队列，它们的区别仅仅是条目的提取顺序。在 FIFO 队列中，先添加的任务会先被提取。在 LIFO 队列中，最近添加的条目会先被提取 (类似于一个栈)。在优先级队列中，条目将保持已排序状态 (使用 [`heapq`](https://docs.python.org/zh-cn/3/library/heapq.html#module-heapq "heapq: Heap queue algorithm (a.k.a. priority queue).") 模块) 并且值最小的条目会先被提取。

在内部，这三个类型的队列使用锁来临时阻塞竞争线程；然而，它们并未被设计用于线程的重入性处理。

此外，模块实现了一个 "简单的" FIFO 队列类型， [`SimpleQueue`](#queue.SimpleQueue "queue.SimpleQueue")，其特定的实现以较少的功能为代价提供了额外的保障。

`queue` 模块定义了下列类和异常：

_class_ queue.Queue(_maxsize\=0_)[¶](#queue.Queue "Link to this definition")

Constructor for a FIFO queue. _maxsize_ is an integer that sets the upperbound limit on the number of items that can be placed in the queue. Insertion will block once this size has been reached, until queue items are consumed. If _maxsize_ is less than or equal to zero, the queue size is infinite.

_class_ queue.LifoQueue(_maxsize\=0_)[¶](#queue.LifoQueue "Link to this definition")

LIFO 队列构造函数。 _maxsize_ 是个整数，用于设置可以放入队列中的项目数的上限。当达到这个大小的时候，插入操作将阻塞至队列中的项目被消费掉。如果 _maxsize_ 小于等于零，队列尺寸为无限大。

_class_ queue.PriorityQueue(_maxsize\=0_)[¶](#queue.PriorityQueue "Link to this definition")

优先级队列构造函数。 _maxsize_ 是个整数，用于设置可以放入队列中的项目数的上限。当达到这个大小的时候，插入操作将阻塞至队列中的项目被消费掉。如果 _maxsize_ 小于等于零，队列尺寸为无限大。

值最小的条目会先被提取（值最小的条目即 `min(entries)` 所返回的条目）。 条目的典型模式是如下形式的元组: `(priority_number, data)`.

如果 _data_ 元素没有可比性，数据将被包装在一个类中，忽略数据值，仅仅比较优先级数字:

from dataclasses import dataclass, field
from typing import Any

@dataclass(order\=True)
class PrioritizedItem:
    priority: int
    item: Any\=field(compare\=False)

_class_ queue.SimpleQueue[¶](#queue.SimpleQueue "Link to this definition")

无界的 FIFO 队列构造函数。简单的队列，缺少任务跟踪等高级功能。

Simple queues are [generic](https://docs.python.org/zh-cn/3/library/typing.html#generics) over the type of their items.

Added in version 3.7.

_exception_ queue.Empty[¶](#queue.Empty "Link to this definition")

在空的 [`Queue`](#queue.Queue "queue.Queue") 对象上调用非阻塞的 [`get()`](#queue.Queue.get "queue.Queue.get") (或 [`get_nowait()`](#queue.Queue.get_nowait "queue.Queue.get_nowait")) 时引发的异常。

_exception_ queue.Full[¶](#queue.Full "Link to this definition")

对已满的 [`Queue`](#queue.Queue "queue.Queue") 对象调用非阻塞的 [`put()`](#queue.Queue.put "queue.Queue.put") (或 [`put_nowait()`](#queue.Queue.put_nowait "queue.Queue.put_nowait")) 时引发的异常。

_exception_ queue.ShutDown[¶](#queue.ShutDown "Link to this definition")

当在已被关闭的 [`Queue`](#queue.Queue "queue.Queue") 对象上调用 [`put()`](#queue.Queue.put "queue.Queue.put") 或 [`get()`](#queue.Queue.get "queue.Queue.get") 时引发的异常。

Added in version 3.13.

## Queue 对象[¶](#queue-objects "Link to this heading")

队列对象 ([`Queue`](#queue.Queue "queue.Queue"), [`LifoQueue`](#queue.LifoQueue "queue.LifoQueue"), 或者 [`PriorityQueue`](#queue.PriorityQueue "queue.PriorityQueue")) 提供下列描述的公共方法。

Queue.qsize()[¶](#queue.Queue.qsize "Link to this definition")

返回队列的大致大小。注意，qsize() > 0 不保证后续的 get() 不被阻塞，qsize() < maxsize 也不保证 put() 不被阻塞。

Queue.empty()[¶](#queue.Queue.empty "Link to this definition")

如果队列为空，返回 `True`，否则返回 `False`。如果 empty() 返回 `True`，不保证后续调用的 put() 不被阻塞。类似的，如果 empty() 返回 `False`，也不保证后续调用的 get() 不被阻塞。

Queue.full()[¶](#queue.Queue.full "Link to this definition")

如果队列是满的返回 `True`，否则返回 `False`。如果 full() 返回 `True` 不保证后续调用的 get() 不被阻塞。类似的，如果 full() 返回 `False` 也不保证后续调用的 put() 不被阻塞。

Queue.put(_item_, _block\=True_, _timeout\=None_)[¶](#queue.Queue.put "Link to this definition")

将 _item_ 加入队列。如果可选参数 _block_ 为真值并且 _timeout_ 为 `None` (默认值)，则会在必要时阻塞直到有空闲槽位可用。如为 _timeout_ 为正数，则将阻塞最多 _timeout_ 秒并会在没有可用的空闲槽位时引发 [`Full`](#queue.Full "queue.Full") 异常。在其他情况下 (_block_ 为假值)，则如果空闲槽位立即可用则将条目加入队列，否则将引发 `Full` 异常 (_timeout_ 在此情况下将被忽略)。

如果队列已被关闭则会引发 [`ShutDown`](#queue.ShutDown "queue.ShutDown")。

Queue.put\_nowait(_item_)[¶](#queue.Queue.put_nowait "Link to this definition")

相当于 `put(item, block=False)`。

Queue.get(_block\=True_, _timeout\=None_)[¶](#queue.Queue.get "Link to this definition")

从队列中移除并返回一个项目。如果可选参数 _block_ 是 true 并且 _timeout_ 是 `None` (默认值)，则在必要时阻塞至项目可得到。如果 _timeout_ 是个正数，将最多阻塞 _timeout_ 秒，如果在这段时间内项目不能得到，将引发 [`Empty`](#queue.Empty "queue.Empty") 异常。反之 (_block_ 是 false) , 如果一个项目立即可得到，则返回一个项目，否则引发 `Empty` 异常 (这种情况下，_timeout_ 将被忽略)。

POSIX 系统上在 3.0 之前，以及在 Windows 上的所有版本中，如果 _block_ 为真值并且 _timeout_ 为 `None`，此操作将进入在底层锁上的不可中断的等待。这意味着不会发生任何异常，特别是 SIGINT 将不会触发 [`KeyboardInterrupt`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyboardInterrupt "KeyboardInterrupt").

如果队列已被关闭并且为空，或者如果队列已被立即关闭则会引发 [`ShutDown`](#queue.ShutDown "queue.ShutDown")。

Queue.get\_nowait()[¶](#queue.Queue.get_nowait "Link to this definition")

相当于 `get(False)`。

提供了两个方法，用于支持跟踪 排队的任务 是否 被守护的消费者线程 完整的处理。

Queue.task\_done()[¶](#queue.Queue.task_done "Link to this definition")

表示前面排队的任务已经被完成。被队列的消费者线程使用。每个 [`get()`](#queue.Queue.get "queue.Queue.get") 被用于获取一个任务，后续调用 [`task_done()`](#queue.Queue.task_done "queue.Queue.task_done") 告诉队列，该任务的处理已经完成。

如果 [`join()`](#queue.Queue.join "queue.Queue.join") 当前正在阻塞，在所有条目都被处理后，将解除阻塞 (意味着每个 [`put()`](#queue.Queue.put "queue.Queue.put") 进队列的条目的 [`task_done()`](#queue.Queue.task_done "queue.Queue.task_done") 都被收到)。

如果被调用的次数多于放入队列中的项目数量，将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 异常。

Queue.join()[¶](#queue.Queue.join "Link to this definition")

阻塞至队列中所有的元素都被接收和处理完毕。

当一个条目被添加到队列的时候未完成任务的计数将会增加。每当一个消费者线程调用 [`task_done()`](#queue.Queue.task_done "queue.Queue.task_done") 来表明该条目已被提取且其上的所有工作已完成时未完成计数将会减少。当未完成计数降为零时，[`join()`](#queue.Queue.join "queue.Queue.join") 将解除阻塞。

### 等待任务完成[¶](#waiting-for-task-completion "Link to this heading")

如何等待排队的任务被完成的示例：

import threading
import queue

q \= queue.Queue()

def worker():
    while True:
        item \= q.get()
        print(f'Working on {item}')
        print(f'Finished {item}')
        q.task\_done()

\# 启动工作线程。
threading.Thread(target\=worker, daemon\=True).start()

\# 向工作线程发送三十个任务请求。
for item in range(30):
    q.put(item)

\# 阻塞直到所有任务完成。
q.join()
print('All work completed')

### 终结队列[¶](#terminating-queues "Link to this heading")

当不再需要时，[`Queue`](#queue.Queue "queue.Queue") 对象可被缩减直至为空或是通过硬关闭立即终结。

Queue.shutdown(_immediate\=False_)[¶](#queue.Queue.shutdown "Link to this definition")

将一个 [`Queue`](#queue.Queue "queue.Queue") 实例置为关闭模式。

该队列将不可再增长。未来对 [`put()`](#queue.Queue.put "queue.Queue.put") 的调用将引发 [`ShutDown`](#queue.ShutDown "queue.ShutDown")。当前被阻塞的 `put()` 调用方将被取消阻塞并会在之前被阻塞的线程中引发 `ShutDown`。

如果 _immediate_ 为假值（默认），则队列可通过 [`get()`](#queue.Queue.get "queue.Queue.get") 调用正常缩减以提取已被加载的任务。

而如果 [`task_done()`](#queue.Queue.task_done "queue.Queue.task_done") 针对每个剩余的任务被调用，则挂起的 [`join()`](#queue.Queue.join "queue.Queue.join") 将被正常取消阻塞。

一旦队列为空，未来对 [`get()`](#queue.Queue.get "queue.Queue.get") 的调用将会引发 [`ShutDown`](#queue.ShutDown "queue.ShutDown")。

如果 _immediate_ 为真值，则队列会被立即终结。队列将缩减至完全为空而未完成任务的计数将去除已缩减的任务数。如果未完成任务数为零，则 [`join()`](#queue.Queue.join "queue.Queue.join") 的调用方将被取消阻塞。此外，被阻塞的 [`get()`](#queue.Queue.get "queue.Queue.get") 调用方也将被取消阻塞并将引发 [`ShutDown`](#queue.ShutDown "queue.ShutDown") 因为队列已为空。

在 _immediate_ 设为真值的情况下使用 [`join()`](#queue.Queue.join "queue.Queue.join") 需要小心谨慎。 这会取消对已加入任务的阻塞即使任务尚未被执行，从而破坏通常的加入队列任务的不变性。

Added in version 3.13.

## SimpleQueue 对象[¶](#simplequeue-objects "Link to this heading")

[`SimpleQueue`](#queue.SimpleQueue "queue.SimpleQueue") 对象提供下列描述的公共方法。

SimpleQueue.qsize()[¶](#queue.SimpleQueue.qsize "Link to this definition")

返回队列的大致大小。注意，qsize() > 0 不保证后续的 get() 不被阻塞。

SimpleQueue.empty()[¶](#queue.SimpleQueue.empty "Link to this definition")

如果队列为空则返回 `True`，否则返回 `False`。如果 empty() 返回 `False` 则不保证后续对 get() 的调用将不会阻塞。

SimpleQueue.put(_item_, _block\=True_, _timeout\=None_)[¶](#queue.SimpleQueue.put "Link to this definition")

将 _item_ 放入队列。此方法永不阻塞，始终成功（除了潜在的低级错误，例如内存分配失败）。可选参数 _block_ 和 _timeout_ 仅仅是为了保持 [`Queue.put()`](#queue.Queue.put "queue.Queue.put") 的兼容性而提供，其值被忽略。

此方法具有一个可重入的 C 实现。也就是说，一个 `put()` 或 `get()` 调用可以被同一线程中的另一个 `put()` 调用打断而不会发生死锁或破坏队列内部的状态。这使得它适用于析构器如 `__del__` 方法或 [`weakref`](https://docs.python.org/zh-cn/3/library/weakref.html#module-weakref "weakref: Support for weak references and weak dictionaries.") 回调。

SimpleQueue.put\_nowait(_item_)[¶](#queue.SimpleQueue.put_nowait "Link to this definition")

相当于 `put(item, block=False)`，为保持与 [`Queue.put_nowait()`](#queue.Queue.put_nowait "queue.Queue.put_nowait") 的兼容性而提供。

SimpleQueue.get(_block\=True_, _timeout\=None_)[¶](#queue.SimpleQueue.get "Link to this definition")

从队列中移除并返回一个项目。如果可选参数 _block_ 是 true 并且 _timeout_ 是 `None` (默认值)，则在必要时阻塞至项目可得到。如果 _timeout_ 是个正数，将最多阻塞 _timeout_ 秒，如果在这段时间内项目不能得到，将引发 [`Empty`](#queue.Empty "queue.Empty") 异常。反之 (_block_ 是 false) , 如果一个项目立即可得到，则返回一个项目，否则引发 `Empty` 异常 (这种情况下，_timeout_ 将被忽略)。

SimpleQueue.get\_nowait()[¶](#queue.SimpleQueue.get_nowait "Link to this definition")

相当于 `get(False)`。
