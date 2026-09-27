Added in version 3.14.

**源代码：** [Lib/concurrent/interpreters](https://github.com/python/cpython/tree/3.14/Lib/concurrent/interpreters)

* * *

`concurrent.interpreters` 模块在低层级的 `_interpreters` 模块之上构造了更高层级的接口。

本模块的最初目标是提供一个基本 API 来管理解释器（也称“子解释器”）并在其中运行任务。 运行过程涉及（在当前线程中）切换解释器并在执行上下文中调用函数。

For concurrency, interpreters themselves (and this module) don't provide much more than isolation, which on its own isn't useful. Actual concurrency is available separately through [`threads`](https://docs.python.org/zh-cn/3/library/threading.html#module-threading "threading: Thread-based parallelism.") -- see [below](#interp-concurrency).

## 关键细节[¶](#key-details "Link to this heading")

在进一步深入之前，关于多解释器的使用需要注意以下几个要点：

-   默认情况下为 [解释器隔离](#interp-isolation)
    
-   没有隐式线程
    
-   并不是所有的PyPI包都支持在多个解释器中使用
    

## 概述[¶](#introduction "Link to this heading")

"解释器"本质上是 Python 运行时的执行上下文，它包含了运行时执行程序所需的所有状态，包括导入状态和内置对象等。（每个线程——即使只有主线程——除了当前解释器外，还拥有一些额外的运行时状态，这些状态与当前异常和字节码求值循环相关。）

解释器的概念和功能自 Python 2.2 版本起便已存在，但该特性此前仅能通过 C-API 使用且鲜为人知，同时 [隔离](#interp-isolation) 功能在 3.12 版本前相对不够完善。

### 多解释器与隔离[¶](#multiple-interpreters-and-isolation "Link to this heading")

Python 实现方案可能支持在同一进程中使用多个解释器，CPython 就具备此功能。每个解释器实际上都是相互隔离的（仅有少量经过严格管控的进程级全局例外情况）。

这种隔离机制的主要价值在于为程序的不同逻辑组件提供严格隔离，使开发者能够精准控制这些组件之间的交互方式。

备注

从技术上讲，同一进程中的解释器永远无法实现严格隔离，因为在同一进程内对内存访问几乎没有任何限制。Python 运行时会尽力确保隔离性，但扩展模块很容易破坏这种隔离。因此，在安全敏感场景下——当不同解释器之间本不应相互访问数据时——请勿使用多解释器模式。

### 在一个解释器中运行[¶](#running-in-an-interpreter "Link to this heading")

在另一个解释器中运行涉及两个步骤：首先在当前线程切换至目标解释器，然后调用目标函数。运行时将基于当前解释器的状态执行该函数。`concurrent.interpreters` 模块提供了一套基础API，用于创建和管理解释器，以及执行这种"切换-调用"操作。

该操作不会自动启动其他线程，但可通过 [一个辅助工具](#interp-call-in-thread) 实现此功能。此外还提供了专用辅助工具，用于在解释器中调用内置函数 [`exec()`](https://docs.python.org/zh-cn/3/builtins/functions.html#exec "exec")。

当在解释器中调用 [`exec()`](https://docs.python.org/zh-cn/3/builtins/functions.html#exec "exec") (或 [`eval()`](https://docs.python.org/zh-cn/3/builtins/functions.html#eval "eval")) 时，它们会使用该解释器的 `__main__` 模块作为"全局"命名空间来运行。对于未关联任何模块的函数也是如此。这与从命令行调用脚本时在 `__main__` 模块中运行的方式相同。

### 并发与并行[¶](#concurrency-and-parallelism "Link to this heading")

如前所述，解释器本身并不提供任何并发能力。它们严格代表了运行时 _在当前线程_ 中将使用的隔离执行上下文。这种隔离特性使解释器与进程相似，但同时又能像线程一样享受进程内的高效性。

尽管如此，解释器确实天然支持特定种类的并发。这是该隔离机制的强大附带效应。它启用了一种不同于异步或线程的并发方式。这是一种与 CSP 或 actor 模型类似的并发模型，该模型相对更容易理解。

开发者可以在单线程中利用这种并发模型，以无栈式风格在解释器之间来回切换。然而，当将多解释器与多线程结合使用时，该模型才更能体现其价值。这种结合主要涉及：启动新线程 → 切换至目标解释器 → 执行所需操作。

在Python中，每个实际线程（即使仅运行主线程）都拥有自己的 _当前_ 执行上下文。多个线程可以共享同一个解释器，也可以使用不同的解释器。

从高层次来看，可以将线程与解释器的组合理解为可选共享的线程模型。

一个重要优势是：解释器之间的隔离足够彻底，它们不共享 [GIL](https://docs.python.org/zh-cn/3/glossary.html#term-GIL)，这意味着将多线程与多解释器结合使用时，可以实现真正的多核并行处理。（该特性自 Python 3.12 起支持。）

### 解释器间通信[¶](#communication-between-interpreters "Link to this heading")

在实际应用中，多解释器模式的价值取决于是否存在有效的通信机制。通常采用消息传递方式实现交互，但在严格管控条件下也可共享数据。

基于此，`concurrent.interpreters` 模块提供了通过 [`create_queue()`](#concurrent.interpreters.create_queue "concurrent.interpreters.create_queue") 访问的 [`queue.Queue`](https://docs.python.org/zh-cn/3/library/queue.html#queue.Queue "queue.Queue") 实现。

### "共享"对象[¶](#sharing-objects "Link to this heading")

在解释器间实际共享的任何数据都会丧失由 [GIL](https://docs.python.org/zh-cn/3/glossary.html#term-GIL) 提供的线程安全性。扩展模块可通过多种方案处理此问题，但在纯Python代码中，由于缺乏线程安全机制，对象实际上无法真正共享（仅有少数例外）。这种情况下必须创建对象副本，意味着可变对象无法保持同步状态。

默认情况下，当对象传递给其他解释器时，多数对象会通过 [`pickle`](https://docs.python.org/zh-cn/3/library/pickle.html#module-pickle "pickle: Convert Python objects to streams of bytes and back.") 模块进行复制。几乎所有不可变内置对象要么直接共享，要么会高效复制。例如：

-   [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")
    
-   [`bool`](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool") ([`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True") 和 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False"))
    
-   [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")
    
-   [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")
    
-   [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")
    
-   [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")
    
-   [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple") (仅限包含同类可支持对象时)
    

There are a small number of Python types that actually share mutable data between interpreters:

-   [`memoryview`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#memoryview "memoryview")
    
-   [`Queue`](#concurrent.interpreters.Queue "concurrent.interpreters.Queue")
    

## 参考[¶](#reference "Link to this heading")

这个模块定义了以下函数：

concurrent.interpreters.list\_all()[¶](#concurrent.interpreters.list_all "Link to this definition")

返回一个 [`Interpreter`](#concurrent.interpreters.Interpreter "concurrent.interpreters.Interpreter") 对象的 [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list")，每个对象对应一个现有的解释器。

concurrent.interpreters.get\_current()[¶](#concurrent.interpreters.get_current "Link to this definition")

为当前运行的解释器返回一个 [`Interpreter`](#concurrent.interpreters.Interpreter "concurrent.interpreters.Interpreter") 对象。

concurrent.interpreters.get\_main()[¶](#concurrent.interpreters.get_main "Link to this definition")

返回主解释器的 [`Interpreter`](#concurrent.interpreters.Interpreter "concurrent.interpreters.Interpreter") 对象。该解释器是运行时为执行 [REPL](https://docs.python.org/zh-cn/3/glossary.html#term-REPL) 或命令行脚本而创建的，通常也是唯一存在的解释器实例。

concurrent.interpreters.create()[¶](#concurrent.interpreters.create "Link to this definition")

初始化一个新的（空闲的）Python解释器并为其返回一个 [`Interpreter`](#concurrent.interpreters.Interpreter "concurrent.interpreters.Interpreter") 对象。

concurrent.interpreters.create\_queue()[¶](#concurrent.interpreters.create_queue "Link to this definition")

初始化一个新的跨解释器队列，并返回其对应的 [`Queue`](#concurrent.interpreters.Queue "concurrent.interpreters.Queue") 对象。

### 解释器对象[¶](#interpreter-objects "Link to this heading")

_class_ concurrent.interpreters.Interpreter(_id_)[¶](#concurrent.interpreters.Interpreter "Link to this definition")

当前进程中的单个解释器。

一般来说，不应该直接调用 [`Interpreter`](#concurrent.interpreters.Interpreter "concurrent.interpreters.Interpreter")。 相反，使用 [`create()`](#concurrent.interpreters.create "concurrent.interpreters.create") 或其他模块函数之一。

id[¶](#concurrent.interpreters.Interpreter.id "Link to this definition")

（只读）

底层解释器的 ID。

whence[¶](#concurrent.interpreters.Interpreter.whence "Link to this definition")

（只读）

描述解释器来源的字符串。

is\_running()[¶](#concurrent.interpreters.Interpreter.is_running "Link to this definition")

如果解释器当前正在执行其 `__main__` 模块中的代码，则返回 `True`，否则返回 `False`。

close()[¶](#concurrent.interpreters.Interpreter.close "Link to this definition")

完成和销毁解释器。

prepare\_main(_ns\=None_, _\*\*kwargs_)[¶](#concurrent.interpreters.Interpreter.prepare_main "Link to this definition")

将对象绑定到解释器的 `__main__` 模块中。

部分对象会实际共享，部分对象可高效复制，但大多数对象仍需通过 [`pickle`](https://docs.python.org/zh-cn/3/library/pickle.html#module-pickle "pickle: Convert Python objects to streams of bytes and back.") 模块进行复制。具体参见 ["共享"对象](#interp-object-sharing) 。

exec(_code_, _/_, _dedent\=True_)[¶](#concurrent.interpreters.Interpreter.exec "Link to this definition")

在解释器中运行给定的源代码（在当前线程中）。

call(_callable_, _/_, _\*args_, _\*\*kwargs_)[¶](#concurrent.interpreters.Interpreter.call "Link to this definition")

Return the result of running the given function in the interpreter (in the current thread).

call\_in\_thread(_callable_, _/_, _\*args_, _\*\*kwargs_)[¶](#concurrent.interpreters.Interpreter.call_in_thread "Link to this definition")

在解释器中运行给定的函数（在一个新的线程中）。

### 异常[¶](#exceptions "Link to this heading")

_exception_ concurrent.interpreters.InterpreterError[¶](#concurrent.interpreters.InterpreterError "Link to this definition")

此异常是 [`Exception`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#Exception "Exception") 的子类，在发生解释器相关错误时引发。

_exception_ concurrent.interpreters.InterpreterNotFoundError[¶](#concurrent.interpreters.InterpreterNotFoundError "Link to this definition")

此异常是 [`InterpreterError`](#concurrent.interpreters.InterpreterError "concurrent.interpreters.InterpreterError") 的子类，当目标解释器不再存在时引发。

_exception_ concurrent.interpreters.ExecutionFailed[¶](#concurrent.interpreters.ExecutionFailed "Link to this definition")

此异常是 [`InterpreterError`](#concurrent.interpreters.InterpreterError "concurrent.interpreters.InterpreterError") 的子类，当运行的代码引发未捕获的异常时引发。

excinfo[¶](#concurrent.interpreters.ExecutionFailed.excinfo "Link to this definition")

在其他解释器中引发的异常的基本快照。

_exception_ concurrent.interpreters.NotShareableError[¶](#concurrent.interpreters.NotShareableError "Link to this definition")

此异常是 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError") 的子类，当一个对象无法发送到另一个解释器时引发。

### 解释器间通信[¶](#communicating-between-interpreters "Link to this heading")

_class_ concurrent.interpreters.Queue(_id_)[¶](#concurrent.interpreters.Queue "Link to this definition")

这是一个对底层跨解释器队列的封装，实现了标准的 [`queue.Queue`](https://docs.python.org/zh-cn/3/library/queue.html#queue.Queue "queue.Queue") 接口。底层队列只能通过 [`create_queue()`](#concurrent.interpreters.create_queue "concurrent.interpreters.create_queue") 函数创建。

部分对象会实际共享，部分对象可高效复制，但大多数对象仍需通过 [`pickle`](https://docs.python.org/zh-cn/3/library/pickle.html#module-pickle "pickle: Convert Python objects to streams of bytes and back.") 模块进行复制。具体参见 ["共享"对象](#interp-object-sharing) 。

id[¶](#concurrent.interpreters.Queue.id "Link to this definition")

（只读）

队列的ID。

_exception_ concurrent.interpreters.QueueEmptyError[¶](#concurrent.interpreters.QueueEmptyError "Link to this definition")

此异常继承自 [`queue.Empty`](https://docs.python.org/zh-cn/3/library/queue.html#queue.Empty "queue.Empty")，当队列为空时，会由 `Queue.get()` 和 `Queue.get_nowait()` 方法引发。

_exception_ concurrent.interpreters.QueueFullError[¶](#concurrent.interpreters.QueueFullError "Link to this definition")

此异常继承自 [`queue.Full`](https://docs.python.org/zh-cn/3/library/queue.html#queue.Full "queue.Full")，当队列已满时，会由 `Queue.put()` 和 `Queue.put_nowait()` 方法引发。

## 基本使用[¶](#basic-usage "Link to this heading")

创建一个解释器并在其中运行代码:

from concurrent import interpreters

interp \= interpreters.create()

\# 在当前操作系统线程中运行。

interp.exec('print("spam!")')

interp.exec("""if True:
    print('spam!')
    """)

from textwrap import dedent
interp.exec(dedent("""
    print('spam!')
    """))

def run(arg):
    return arg

res \= interp.call(run, 'spam!')
print(res)

def run():
    print('spam!')

interp.call(run)

\# 在新的操作系统线程中运行

t \= interp.call\_in\_thread(run)
t.join()
