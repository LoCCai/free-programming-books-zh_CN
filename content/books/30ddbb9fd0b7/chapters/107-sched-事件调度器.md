**源码：** [Lib/sched.py](https://github.com/python/cpython/tree/3.14/Lib/sched.py)

* * *

`sched` 模块定义了一个实现通用事件调度器的类：

_class_ sched.scheduler(_timefunc\=time.monotonic_, _delayfunc\=time.sleep_)[¶](#sched.scheduler "Link to this definition")

[`scheduler`](#sched.scheduler "sched.scheduler") 类定义了一个调度事件的通用接口。它需要两个函数来实际处理“外部世界” —— _timefunc_ 应当不带参数地调用，并返回一个数字（“时间”，可以为任意单位）。 _delayfunc_ 函数应当带一个参数调用，与 _timefunc_ 的输出相兼容，并且应当延迟其所指定的时间单位。每个事件运行后还将调用 _delayfunc_ 并传入参数 `0` 以允许其他线程有机会在多线程应用中运行。

在 3.3 版本发生变更: _timefunc_ 和 _delayfunc_ 参数是可选的。

在 3.3 版本发生变更: [`scheduler`](#sched.scheduler "sched.scheduler") 类可以安全地在多线程环境中使用。

示例:

\>>> import sched, time
\>>> s \= sched.scheduler(time.time, time.sleep)
\>>> def print\_time(a\='default'):
...     print("From print\_time", time.time(), a)
...
\>>> def print\_some\_times():
...     print(time.time())
...     s.enter(10, 1, print\_time)
...     s.enter(5, 2, print\_time, argument\=('positional',))
...     \# 虽然具有更高的优先级，'keyword' 将在 'positional' 之后运行，因为 enter() 是相对的
...     s.enter(5, 1, print\_time, kwargs\={'a': 'keyword'})
...     s.enterabs(1\_650\_000\_000, 10, print\_time, argument\=("first enterabs",))
...     s.enterabs(1\_650\_000\_000, 5, print\_time, argument\=("second enterabs",))
...     s.run()
...     print(time.time())
...
\>>> print\_some\_times()
1652342830.3640375
From print\_time 1652342830.3642538 second enterabs
From print\_time 1652342830.3643398 first enterabs
From print\_time 1652342835.3694863 positional
From print\_time 1652342835.3696074 keyword
From print\_time 1652342840.369612 default
1652342840.3697174

## 调度器对象[¶](#scheduler-objects "Link to this heading")

[`scheduler`](#sched.scheduler "sched.scheduler") 实例拥有以下方法和属性：

scheduler.enterabs(_time_, _priority_, _action_, _argument\=()_, _kwargs\={}_)[¶](#sched.scheduler.enterabs "Link to this definition")

安排一个新事件。 _time_ 参数应当是一个数字类型，与传递给构造函数的 _timefunc_ 函数的返回值兼容。计划在相同 _time_ 的事件将按其 _priority_ 的顺序执行。数字越小表示优先级越高。

执行事件意为执行 `action(*argument, **kwargs)`。 _argument_ 是包含有 _action_ 的位置参数的序列。 _kwargs_ 是包含 _action_ 的关键字参数的字典。

返回值是一个事件，可用于以后取消事件 (参见 [`cancel()`](#sched.scheduler.cancel "sched.scheduler.cancel"))。

在 3.3 版本发生变更: _argument_ 参数是可选的。

在 3.3 版本发生变更: 添加了 _kwargs_ 形参。

scheduler.enter(_delay_, _priority_, _action_, _argument\=()_, _kwargs\={}_)[¶](#sched.scheduler.enter "Link to this definition")

安排延后 _delay_ 时间单位的事件。除了时间是相对的，其他参数、效果和返回值与 [`enterabs()`](#sched.scheduler.enterabs "sched.scheduler.enterabs") 相同。

在 3.3 版本发生变更: _argument_ 参数是可选的。

在 3.3 版本发生变更: 添加了 _kwargs_ 形参。

scheduler.cancel(_event_)[¶](#sched.scheduler.cancel "Link to this definition")

从队列中删除事件。如果 _event_ 不是当前队列中的事件，则此方法将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

scheduler.empty()[¶](#sched.scheduler.empty "Link to this definition")

如果事件队列为空则返回 `True`。

scheduler.run(_blocking\=True_)[¶](#sched.scheduler.run "Link to this definition")

运行所有计划事件。此方法将等待（使用传递给构造函数的 _delayfunc_ 函数）下一个事件，然后执行它，依此类推直到没有更多的计划事件。

如果 _blocking_ 为假值，则立即执行队列中时间值小于等于当前 _timefunc_ 值的所有事件（如果有）并返回当前 _timefunc_ 值和 scheduler 的事件队列中下一个计划任务事件时间值之差。 如果队列为空，则返回 `None`。

_action_ 或 _delayfunc_ 都可以引发异常。在任何一种情况下，调度程序都将保持一致状态并传播异常。如果 _action_ 引发异常，则在将来调用 [`run()`](#sched.scheduler.run "sched.scheduler.run") 时不会尝试该事件。

如果一系列事件的运行时间大于下一个事件发生前的可用时间，那么调度程序只会保持落后。没有事件会被丢弃；调用代码负责取消不再相关的事件。

在 3.3 版本发生变更: 添加了 _blocking_ 形参。

scheduler.queue[¶](#sched.scheduler.queue "Link to this definition")

只读属性，按照计划运行的顺序返回即将发生的事件列表。每个事件都显示为 [named tuple](https://docs.python.org/zh-cn/3/glossary.html#term-named-tuple) ，包含以下字段：time、priority、action、argument、kwargs。
