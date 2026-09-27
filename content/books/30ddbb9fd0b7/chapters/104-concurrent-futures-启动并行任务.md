Added in version 3.2.

**源代码:** [Lib/concurrent/futures/thread.py](https://github.com/python/cpython/tree/3.14/Lib/concurrent/futures/thread.py), [Lib/concurrent/futures/process.py](https://github.com/python/cpython/tree/3.14/Lib/concurrent/futures/process.py) 和 [Lib/concurrent/futures/interpreter.py](https://github.com/python/cpython/tree/3.14/Lib/concurrent/futures/interpreter.py)

* * *

`concurrent.futures` 模块提供异步执行可调用对象的高层级接口。

异步执行可以使用线程来实现，即使用 [`ThreadPoolExecutor`](#concurrent.futures.ThreadPoolExecutor "concurrent.futures.ThreadPoolExecutor") 或 [`InterpreterPoolExecutor`](#concurrent.futures.InterpreterPoolExecutor "concurrent.futures.InterpreterPoolExecutor") 或者使用进程，即使用 [`ProcessPoolExecutor`](#concurrent.futures.ProcessPoolExecutor "concurrent.futures.ProcessPoolExecutor")。 每种方式实现了相同的接口，它是由抽象类 [`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") 来定义的。

[`concurrent.futures.Future`](#concurrent.futures.Future "concurrent.futures.Future") 不可与 [`asyncio.Future`](https://docs.python.org/zh-cn/3/library/asyncio-future.html#asyncio.Future "asyncio.Future") 混淆，后者被设计用于 [`asyncio`](https://docs.python.org/zh-cn/3/library/asyncio.html#module-asyncio "asyncio: Asynchronous I/O.") 任务和协程。 请参阅 [asyncio 的 Future](https://docs.python.org/zh-cn/3/library/asyncio-future.html) 文档查看两者的详细比较。

## Executor 对象[¶](#executor-objects "Link to this heading")

_class_ concurrent.futures.Executor[¶](#concurrent.futures.Executor "Link to this definition")

抽象类提供异步执行调用方法。要通过它的子类调用，而不是直接调用。

submit(_fn_, _/_, _\*args_, _\*\*kwargs_)[¶](#concurrent.futures.Executor.submit "Link to this definition")

调度可调用对象 _fn_，以 `fn(*args, **kwargs)` 方式执行并返回一个代表该可调用对象的执行的 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 对象。

with ThreadPoolExecutor(max\_workers\=1) as executor:
    future \= executor.submit(pow, 323, 1235)
    print(future.result())

map(_fn_, _\*iterables_, _timeout\=None_, _chunksize\=1_, _buffersize\=None_)[¶](#concurrent.futures.Executor.map "Link to this definition")

类似于 [`map(fn, *iterables)`](https://docs.python.org/zh-cn/3/builtins/functions.html#map "map") 但有以下差异：

-   _iterables_ 的收集是立即而非惰性的，除非指定了 _buffersize_ 来限制提交结果尚未产生的任务数量。 如果缓冲区已满，对 _iterables_ 的迭代将暂停直到缓冲区产生了一个结果。
    
-   _fn_ 是异步执行的并且可以并发对 _fn_ 的多个调用。
    

如果 [`__next__()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#iterator.__next__ "iterator.__next__") 被调用且从对 [`Executor.map()`](#concurrent.futures.Executor.map "concurrent.futures.Executor.map") 原始调用 _timeout_ 秒之后其结果还不可用则已返回的迭代器将引发 [`TimeoutError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TimeoutError "TimeoutError")。 _timeout_ 可以是整数或浮点数。 如果 _timeout_ 未指定或为 `None`，则不限制等待时间。

如果 _fn_ 调用引发了异常，那么当从迭代器获取其值时该异常将被引发。

当使用 [`ProcessPoolExecutor`](#concurrent.futures.ProcessPoolExecutor "concurrent.futures.ProcessPoolExecutor") 时，这个方法会将 _iterables_ 分块并作为单独的任务提交到执行池中。 这些分块的（近似）大小可通过将 _chunksize_ 设为一个正整数来指定。 对于非常长的迭代器来说，使用较大的 _chunksize_ 值相比默认大小 1 能显著地提升性能。 对于 [`ThreadPoolExecutor`](#concurrent.futures.ThreadPoolExecutor "concurrent.futures.ThreadPoolExecutor") 和 [`InterpreterPoolExecutor`](#concurrent.futures.InterpreterPoolExecutor "concurrent.futures.InterpreterPoolExecutor")，_chunksize_ 将没有效果。

在 3.5 版本发生变更: 增加了 _chunksize_ 形参。

在 3.14 版本发生变更: 增加了 _buffersize_ 形参。

shutdown(_wait\=True_, _\*_, _cancel\_futures\=False_)[¶](#concurrent.futures.Executor.shutdown "Link to this definition")

当待执行的 future 对象完成执行后向执行者发送信号，它就会释放正在使用的任何资源。 在关闭后调用 [`Executor.submit()`](#concurrent.futures.Executor.submit "concurrent.futures.Executor.submit") 和 [`Executor.map()`](#concurrent.futures.Executor.map "concurrent.futures.Executor.map") 将会引发 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")。

如果 _wait_ 为 `True` 则此方法只有在所有待执行的 future 对象完成执行且释放已分配的资源后才会返回。 如果 _wait_ 为 `False`，方法立即返回，所有待执行的 future 对象完成执行后会释放已分配的资源。 不管 _wait_ 的值是什么，整个 Python 程序将等到所有待执行的 future 对象完成执行后才退出。

如果 _cancel\_futures_ 为 `True`，此方法将取消所有执行器还未开始运行的挂起的 Future。无论 _cancel\_futures_ 的值是什么，任何已完成或正在运行的 Future 都不会被取消。

如果 _cancel\_futures_ 和 _wait_ 均为 `True`，则执行器已开始运行的所有 Future 将在此方法返回之前完成。 其余的 Future 会被取消。

若通过 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句将执行器作为 [context manager](https://docs.python.org/zh-cn/3/glossary.html#term-context-manager) 使用，则可避免显式调用此方法，因为该语句会自动关闭 [`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") (其等待行为等同于调用 [`Executor.shutdown()`](#concurrent.futures.Executor.shutdown "concurrent.futures.Executor.shutdown") 并将 _wait_ 参数设为 `True` 的情况):

import shutil
with ThreadPoolExecutor(max\_workers\=4) as e:
    e.submit(shutil.copy, 'src1.txt', 'dest1.txt')
    e.submit(shutil.copy, 'src2.txt', 'dest2.txt')
    e.submit(shutil.copy, 'src3.txt', 'dest3.txt')
    e.submit(shutil.copy, 'src4.txt', 'dest4.txt')

在 3.9 版本发生变更: 增加了 _cancel\_futures_。

## ThreadPoolExecutor[¶](#threadpoolexecutor "Link to this heading")

[`ThreadPoolExecutor`](#concurrent.futures.ThreadPoolExecutor "concurrent.futures.ThreadPoolExecutor") 是 [`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") 的子类，它使用线程池来异步执行调用。

当可调用对象已关联了一个 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 然后在等待另一个 `Future` 的结果时就会导致死锁情况。例如:

import time
def wait\_on\_b():
    time.sleep(5)
    print(b.result())  \# b 永远不会结束因为它在等待 a。
    return 5

def wait\_on\_a():
    time.sleep(5)
    print(a.result())  \# a 永远不会结束因为它在等待 b。
    return 6

executor \= ThreadPoolExecutor(max\_workers\=2)
a \= executor.submit(wait\_on\_b)
b \= executor.submit(wait\_on\_a)

以及:

def wait\_on\_future():
    f \= executor.submit(pow, 5, 2)
    \# 这将永远不会完成因为只有一个工作线程
    \# 并且它正在执行此函数
    print(f.result())

executor \= ThreadPoolExecutor(max\_workers\=1)
future \= executor.submit(wait\_on\_future)
\# 注意：调用 future.result() 也会导致死锁因为
\# 这个工作线程已经在等待 wait\_on\_future()。

_class_ concurrent.futures.ThreadPoolExecutor(_max\_workers\=None_, _thread\_name\_prefix\=''_, _initializer\=None_, _initargs\=()_)[¶](#concurrent.futures.ThreadPoolExecutor "Link to this definition")

[`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") 子类使用最多 _max\_workers_ 个线程的线程池来异步执行调用。

所有排入 `ThreadPoolExecutor` 的线程将在解释器退出之前被合并。 请注意执行此操作的退出处理器会在任何使用 `atexit` 添加的退出处理器 _之前_ 被执行。 这意味着主线程中的异常必须被捕获和处理以便向线程发出信号使其能够优雅地退出。 由于这个原因，建议不要将 `ThreadPoolExecutor` 用于长期运行的任务。

_initializer_ 是在每个工作者线程开始处调用的一个可选可调用对象。 _initargs_ 是传递给初始化器的元组参数。如果 _initializer_ 引发了异常，所有当前等待的任务以及任何向池提交更多任务的尝试都将引发 [`BrokenThreadPool`](#concurrent.futures.thread.BrokenThreadPool "concurrent.futures.thread.BrokenThreadPool")。

在 3.5 版本发生变更: 如果 _max\_workers_ 为 `None` 或没有指定，将默认为机器处理器的个数乘以 `5`，因为假定 [`ThreadPoolExecutor`](#concurrent.futures.ThreadPoolExecutor "concurrent.futures.ThreadPoolExecutor") 通常用来重叠 I/O 操作而非 CPU 运算，并且工作线程的数量应当高于 [`ProcessPoolExecutor`](#concurrent.futures.ProcessPoolExecutor "concurrent.futures.ProcessPoolExecutor") 的工作进程数量。

在 3.6 版本发生变更: 增加了 _thread\_name\_prefix_ 形参来允许用户控制由线程池创建的 [`threading.Thread`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Thread "threading.Thread") 工作线程名称以方便调试。

在 3.7 版本发生变更: 加入 _initializer_ 和 _initargs_ 参数。

在 3.8 版本发生变更: _max\_workers_ 的默认值已改为 `min(32, os.cpu_count() + 4)`。 这个默认值会保留至少 5 个工作线程用于 I/O 密集型任务。 对于那些释放了 GIL 的 CPU 密集型任务，它最多会使用 32 个 CPU 核心。这样能够避免在多核机器上不知不觉地使用大量资源。

现在 ThreadPoolExecutor 在启动 _max\_workers_ 个工作线程之前也会重用空闲的工作线程。

在 3.13 版本发生变更: _max\_workers_ 的默认值已改为 `min(32, (os.process_cpu_count() or 1) + 4)`。

### ThreadPoolExecutor 例子[¶](#threadpoolexecutor-example "Link to this heading")

import concurrent.futures
import urllib.request

URLS \= \['http://www.foxnews.com/',
        'http://www.cnn.com/',
        'http://europe.wsj.com/',
        'http://www.bbc.co.uk/',
        'http://nonexistent-subdomain.python.org/'\]

\# 获取一个页面并报告其 URL 和内容
def load\_url(url, timeout):
    with urllib.request.urlopen(url, timeout\=timeout) as conn:
        return conn.read()

\# 我们可以使用一个 with 语句来确保线程被迅速清理
with concurrent.futures.ThreadPoolExecutor(max\_workers\=5) as executor:
    \# 开始加载操作并以每个 Future 对象的 URL 对其进行标记
    future\_to\_url \= {executor.submit(load\_url, url, 60): url for url in URLS}
    for future in concurrent.futures.as\_completed(future\_to\_url):
        url \= future\_to\_url\[future\]
        try:
            data \= future.result()
        except Exception as exc:
            print('%r generated an exception: %s' % (url, exc))
        else:
            print('%r page is %d bytes' % (url, len(data)))

## InterpreterPoolExecutor[¶](#interpreterpoolexecutor "Link to this heading")

Added in version 3.14.

[`InterpreterPoolExecutor`](#concurrent.futures.InterpreterPoolExecutor "concurrent.futures.InterpreterPoolExecutor") 类使用一个解释器池来异步地执行调用。 它是 [`ThreadPoolExecutor`](#concurrent.futures.ThreadPoolExecutor "concurrent.futures.ThreadPoolExecutor") 的子类，这意味着每个工作解释器在它自己的线程中运行。 它与其父类的区别在于每个工作线程都具有自己的解释器，并使用该解释器运行每个任务。

使用解释器而非只用线程的最大好处是真正的多核心并行。 每个解释器都有自己的 [全局解释器锁](https://docs.python.org/zh-cn/3/glossary.html#term-global-interpreter-lock)，因此在一个解释器中运行的代码可以在一个 CPU 核心上运行，而在另一个解释器中运行的代码可以在不同的核心上无阻塞地运行。

作为交换的是编写用于多解释器的并发代码需要额外的考量。 不过，这是由于它会迫使你谨慎处理多解释器要怎样以及何时进行交互，并明确哪些数据要在解释器之间进行共享。 这导致几项有助于对额外的考量进行平衡的好处，包括真正的多核心并行。 例如，以这种方式编写的代码可以更容易地理顺并发过程。另一项重要的好处是你不必处理某些使用线程的关键痛点，比如竞争条件等。

每个工作线程的解释器都是与其他所有解释器隔离的。“隔离”意味着每个解释器都有自己的运行时状态，并且完全独立地运行。例如，如果你在一个解释器中重定向 [`sys.stdout`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stdout "sys.stdout") ，它不会自动重定向到任何其他解释器。如果你在一个解释器中导入了一个模块，它不会在其他解释器中自动导入。你需要在需要它的解释器中单独导入模块。事实上，在解释器中导入的每个模块都是与不同解释器中的相同模块完全独立的对象，包括 [`sys`](https://docs.python.org/zh-cn/3/library/sys.html#module-sys "sys: Access system-specific parameters and functions.")、[`builtins`](https://docs.python.org/zh-cn/3/library/builtins.html#module-builtins "builtins: The module that provides the built-in namespace.") 甚至 `__main__`。

隔离意味着可变对象或其他数据不能同时被多个解释器使用。这实际上意味着解释器实际上不能共享这些对象或数据。相反，每个解释器必须有自己的副本，并且必须手动同步副本之间的任何更改。不可变对象和数据，如不可变对象的内置单例、字符串和元组，就没有这些限制。

解释器之间的通信和同步使用专用工具是最有效的，就像在 [**PEP 734**](https://peps.python.org/pep-0734/) 中建议的那样。 一种效率较低的替代方法是使用 [`pickle`](https://docs.python.org/zh-cn/3/library/pickle.html#module-pickle "pickle: Convert Python objects to streams of bytes and back.") 进行序列化，然后通过共享的 [`套接字`](https://docs.python.org/zh-cn/3/library/socket.html#module-socket "socket: Low-level networking interface.") 或 [`管道`](https://docs.python.org/zh-cn/3/library/os.html#os.pipe "os.pipe") 发送字节。

_class_ concurrent.futures.InterpreterPoolExecutor(_max\_workers\=None_, _thread\_name\_prefix\=''_, _initializer\=None_, _initargs\=()_)[¶](#concurrent.futures.InterpreterPoolExecutor "Link to this definition")

一个 [`ThreadPoolExecutor`](#concurrent.futures.ThreadPoolExecutor "concurrent.futures.ThreadPoolExecutor") 子类，使用最多 _max\_workers_ 线程的池异步执行调用。 每个线程在自己的解释器中运行任务。 工作解释器彼此隔离，这意味着每个解释器都有自己的运行时状态，并且它们不能共享任何可变对象或其他数据。 每个解释器都有自己的 [全局解释器锁](https://docs.python.org/zh-cn/3/glossary.html#term-global-interpreter-lock)，这意味着使用该执行器运行的代码具有真正的多核并行性。

可选的 _initializer_ 和 _initargs_ 参数与 `ThreadPoolExecutor` 具有相同的含义：初始化器在每个工作线程被创建时运行，尽管在这种情况下它是在工作线程的解释器中运行的。 当执行器将 _initializer_ 和 _initargs_ 发送给工作线程的解释器时，使用 [`pickle`](https://docs.python.org/zh-cn/3/library/pickle.html#module-pickle "pickle: Convert Python objects to streams of bytes and back.") 对它们进行序列化。

来自 [`ThreadPoolExecutor`](#concurrent.futures.ThreadPoolExecutor "concurrent.futures.ThreadPoolExecutor") 的其他警告也适用于此。

[`submit()`](#concurrent.futures.Executor.submit "concurrent.futures.Executor.submit") 和 [`map()`](#concurrent.futures.Executor.map "concurrent.futures.Executor.map") 的工作方式与正常情况一样，只是工作线程在将可调用函数和参数发送到其解释器时使用 [`pickle`](https://docs.python.org/zh-cn/3/library/pickle.html#module-pickle "pickle: Convert Python objects to streams of bytes and back.") 对其进行序列化。 在发送返回值时，工作线程同样会对其进行序列化。

当一个工作线程的当前任务引发未捕获的异常时，工作线程总是会尝试原样保留异常。 如果成功则它还会将 `__cause__` 设为对应的 [`ExecutionFailed`](https://docs.python.org/zh-cn/3/library/concurrent.interpreters.html#concurrent.interpreters.ExecutionFailed "concurrent.interpreters.ExecutionFailed") 实例，该实例包含原始异常的概要信息。 在工作线程不能原样保留异常的少数情况下它会改为直接保留对应的 `ExecutionFailed` 实例。

## ProcessPoolExecutor[¶](#processpoolexecutor "Link to this heading")

[`ProcessPoolExecutor`](#concurrent.futures.ProcessPoolExecutor "concurrent.futures.ProcessPoolExecutor") 类是 [`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") 的子类，它使用进程池来异步地执行调用。 `ProcessPoolExecutor` 会使用 [`multiprocessing`](https://docs.python.org/zh-cn/3/library/multiprocessing.html#module-multiprocessing "multiprocessing: Process-based parallelism.") 模块，这允许它绕过 [全局解释器锁](https://docs.python.org/zh-cn/3/glossary.html#term-global-interpreter-lock) 但也意味着只可以处理和返回可封存的对象。

`__main__` 模块必须可以被工作者子进程导入。这意味着 [`ProcessPoolExecutor`](#concurrent.futures.ProcessPoolExecutor "concurrent.futures.ProcessPoolExecutor") 不可以工作在交互式解释器中。

从已提交给 [`ProcessPoolExecutor`](#concurrent.futures.ProcessPoolExecutor "concurrent.futures.ProcessPoolExecutor") 的可调用对象中调用 [`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") 或 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 的方法会导致死锁。

请注意，在 [`ProcessPoolExecutor`](#concurrent.futures.ProcessPoolExecutor "concurrent.futures.ProcessPoolExecutor") 上使用 [`submit()`](#concurrent.futures.Executor.submit "concurrent.futures.Executor.submit") 和 [`map()`](#concurrent.futures.Executor.map "concurrent.futures.Executor.map") 时函数和参数需要如 [`multiprocessing.Process`](https://docs.python.org/zh-cn/3/library/multiprocessing.html#multiprocessing.Process "multiprocessing.Process") 那样应用必要的限制条件以支持 pickle 操作。 在 REPL 或 lambda 中定义的函数不应被期望能正确工作。

_class_ concurrent.futures.ProcessPoolExecutor(_max\_workers\=None_, _mp\_context\=None_, _initializer\=None_, _initargs\=()_, _max\_tasks\_per\_child\=None_)[¶](#concurrent.futures.ProcessPoolExecutor "Link to this definition")

异步地执行调用的 [`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") 子类使用最多 _max\_workers_ 个进程的进程池。 如果 _max\_workers_ 为 `None` 或未给出，它将默认为 [`os.process_cpu_count()`](https://docs.python.org/zh-cn/3/library/os.html#os.process_cpu_count "os.process_cpu_count")。 如果 _max\_workers_ 小于等于 `0`，则将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。 在 Windows 上，_max\_workers_ 必须小于等于 `61`。 如果不是这样则将引发 `ValueError`。 如果 _max\_workers_ 为 `None`，则选择的默认值最多为 `61`，即使存在更多的处理器。 _mp\_context_ 可以是一个 [`multiprocessing`](https://docs.python.org/zh-cn/3/library/multiprocessing.html#module-multiprocessing "multiprocessing: Process-based parallelism.") 上下文或是 `None`。 它将被用来启动工作进程。 如果 _mp\_context_ 为 `None` 或未给出，则将使用默认的 `multiprocessing` 上下文。 参见 [上下文和启动方法](https://docs.python.org/zh-cn/3/library/multiprocessing.html#multiprocessing-start-methods)。

_initializer_ 是一个可选的可调用对象，它会在每个工作进程启动时被调用；_initargs_ 是传给 initializer 的参数元组。 如果 _initializer_ 引发了异常，则所有当前在等待的任务以及任何向进程池提交更多任务的尝试都将引发 [`BrokenProcessPool`](#concurrent.futures.process.BrokenProcessPool "concurrent.futures.process.BrokenProcessPool")。

_max\_tasks\_per\_child_ 是指定单个进程在其退出并替换为新工作进程之前可以执行的最大任务数量的可选参数。 在默认情况下 _max\_tasks\_per\_child_ 为 `None` 表示工作进程将存活与进程池一样长的时间。 当指定了最大数量时，则如果不存在 _mp\_context_ 形参则将默认使用 "spawn" 多进程启动方法。 此特性不能兼容 "fork" 启动方法。

在 3.3 版本发生变更: 当某个工作进程突然终止时，现在将引发 [`BrokenProcessPool`](#concurrent.futures.process.BrokenProcessPool "concurrent.futures.process.BrokenProcessPool")。 在之前版本中，它的行为是未定义的但在执行器上的操作或它的 future 对象往往会被冻结或死锁。

在 3.7 版本发生变更: 添加 _mp\_context_ 参数允许用户控制由进程池创建的工作者进程的启动方法。

加入 _initializer_ 和 _initargs_ 参数。

在 3.11 版本发生变更: 增加了 _max\_tasks\_per\_child_ 参数以允许用户控制进程池中工作进程的生命期。

在 3.12 版本发生变更: 在 POSIX 系统上，如果你的应用程序有多个线程而 [`multiprocessing`](https://docs.python.org/zh-cn/3/library/multiprocessing.html#module-multiprocessing "multiprocessing: Process-based parallelism.") 上下文使用了 `"fork"` 启动方法：内部调用的 [`os.fork()`](https://docs.python.org/zh-cn/3/library/os.html#os.fork "os.fork") 函数来生成工作进程可能会引发 [`DeprecationWarning`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#DeprecationWarning "DeprecationWarning")。 请传递配置为使用不同启动方法的 _mp\_context_。 进一步的解释请参阅 `os.fork()` 文档。

在 3.14 版本发生变更: 默认的进程启动方法 (参见 [上下文和启动方法](https://docs.python.org/zh-cn/3/library/multiprocessing.html#multiprocessing-start-methods)) 已改为不再使用 _fork_。 如果你需要为 [`ProcessPoolExecutor`](#concurrent.futures.ProcessPoolExecutor "concurrent.futures.ProcessPoolExecutor") 使用 _fork_ 启动方法你必须显式地传入 `mp_context=multiprocessing.get_context("fork")`。

在 3.14.7 版本发生变更: 修复当一个工作进程达到其 _max\_tasks\_per\_child_ 限制而退出之后如果仍有任务在队列中时执行器可能挂起而导致的死锁问题 ([gh-115634](https://github.com/python/cpython/issues/115634))。

terminate\_workers()[¶](#concurrent.futures.ProcessPoolExecutor.terminate_workers "Link to this definition")

尝试通过对每个存活的工作进程调用 [`Process.terminate`](https://docs.python.org/zh-cn/3/library/multiprocessing.html#multiprocessing.Process.terminate "multiprocessing.Process.terminate") 来立即终止它们。 在内部，它还将调用 [`Executor.shutdown()`](#concurrent.futures.Executor.shutdown "concurrent.futures.Executor.shutdown") 以确保所有与执行器相关联的其他资源被释放。

在调用此方法之后调用方不应再向执行器提交任务。

Added in version 3.14.

kill\_workers()[¶](#concurrent.futures.ProcessPoolExecutor.kill_workers "Link to this definition")

尝试通过对每个进程调用 [`Process.kill`](https://docs.python.org/zh-cn/3/library/multiprocessing.html#multiprocessing.Process.kill "multiprocessing.Process.kill") 来立即杀死所有存活的工作进程。 在内部，它还将调用 [`Executor.shutdown()`](#concurrent.futures.Executor.shutdown "concurrent.futures.Executor.shutdown") 来确保释放与执行器相关的所有其他资源。

在调用此方法之后调用方不应再向执行器提交任务。

Added in version 3.14.

### ProcessPoolExecutor 例子[¶](#processpoolexecutor-example "Link to this heading")

import concurrent.futures
import math

PRIMES \= \[
    112272535095293,
    112582705942171,
    112272535095293,
    115280095190773,
    115797848077099,
    1099726899285419\]

def is\_prime(n):
    if n < 2:
        return False
    if n \== 2:
        return True
    if n % 2 \== 0:
        return False

    sqrt\_n \= int(math.floor(math.sqrt(n)))
    for i in range(3, sqrt\_n + 1, 2):
        if n % i \== 0:
            return False
    return True

def main():
    with concurrent.futures.ProcessPoolExecutor() as executor:
        for number, prime in zip(PRIMES, executor.map(is\_prime, PRIMES)):
            print('%d is prime: %s' % (number, prime))

if \_\_name\_\_ \== '\_\_main\_\_':
    main()

## Future 对象[¶](#future-objects "Link to this heading")

[`Future`](#concurrent.futures.Future "concurrent.futures.Future") 类将可调用对象封装为异步执行。`Future` 实例由 [`Executor.submit()`](#concurrent.futures.Executor.submit "concurrent.futures.Executor.submit") 创建。

_class_ concurrent.futures.Future[¶](#concurrent.futures.Future "Link to this definition")

将可调用对象封装为异步执行。[`Future`](#concurrent.futures.Future "concurrent.futures.Future") 实例由 [`Executor.submit()`](#concurrent.futures.Executor.submit "concurrent.futures.Executor.submit") 创建，除非测试，不应直接创建。

cancel()[¶](#concurrent.futures.Future.cancel "Link to this definition")

尝试取消调用。 如果调用正在执行或已结束运行不能被取消则该方法将返回 `False`，否则调用会被取消并且该方法将返回 `True`。

cancelled()[¶](#concurrent.futures.Future.cancelled "Link to this definition")

如果调用成功取消返回 `True`。

running()[¶](#concurrent.futures.Future.running "Link to this definition")

如果调用正在执行而且不能被取消那么返回 `True` 。

done()[¶](#concurrent.futures.Future.done "Link to this definition")

如果调用已被取消或正常结束那么返回 `True`。

result(_timeout\=None_)[¶](#concurrent.futures.Future.result "Link to this definition")

返回调用所返回的值。 如果调用尚未完成则此方法将等待至多 _timeout_ 秒。 如果调用在 _timeout_ 秒内仍未完成，则将引发 [`TimeoutError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TimeoutError "TimeoutError")。 _timeout_ 可以为整数或浮点数。 如果 _timeout_ 未指定或为 `None`，则不限制等待时间。

如果 future 在完成前被取消则 [`CancelledError`](#concurrent.futures.CancelledError "concurrent.futures.CancelledError") 将被触发。

如果调用引发了一个异常，这个方法也会引发同样的异常。

exception(_timeout\=None_)[¶](#concurrent.futures.Future.exception "Link to this definition")

返回调用所引发的异常。 如果调用尚未完成则此方法将等待至多 _timeout_ 秒。 如果调用在 _timeout_ 秒内仍未完成，则将引发 [`TimeoutError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TimeoutError "TimeoutError")。 _timeout_ 可以为整数或浮点数。 如果 _timeout_ 未指定或为 `None`，则不限制等待时间。

如果 future 在完成前被取消则 [`CancelledError`](#concurrent.futures.CancelledError "concurrent.futures.CancelledError") 将被触发。

如果调用正常完成那么返回 `None`。

add\_done\_callback(_fn_)[¶](#concurrent.futures.Future.add_done_callback "Link to this definition")

附加可调用 _fn_ 到 future 对象。当 future 对象被取消或完成运行时，将会调用 _fn_，而这个 future 对象将作为它唯一的参数。

加入的可调用对象总被属于添加它们的进程中的线程按加入的顺序调用。如果可调用对象引发一个 [`Exception`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#Exception "Exception") 子类，它会被记录下来并被忽略掉。如果可调用对象引发一个 [`BaseException`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#BaseException "BaseException") 子类，这个行为没有定义。

如果 future 对象已经完成或已取消，_fn_ 会被立即调用。

下面这些 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 方法用于单元测试和 [`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") 实现。

set\_running\_or\_notify\_cancel()[¶](#concurrent.futures.Future.set_running_or_notify_cancel "Link to this definition")

这个方法只可以在执行关联 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 工作之前由 [`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") 实现调用或由单元测试调用。

如果此方法返回 `False` 则 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 已被取消，即 [`Future.cancel()`](#concurrent.futures.Future.cancel "concurrent.futures.Future.cancel") 已被调用并返回 `True`。 任何等待 `Future` 完成 (即通过 [`as_completed()`](#concurrent.futures.as_completed "concurrent.futures.as_completed") 或 [`wait()`](#concurrent.futures.wait "concurrent.futures.wait")) 的线程将被唤醒。

如果此方法返回 `True` 则 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 没有被取消并已被置为正在运行的状态，即对 [`Future.running()`](#concurrent.futures.Future.running "concurrent.futures.Future.running") 的调用将返回 `True`。

这个方法只可以被调用一次并且不能在调用 [`Future.set_result()`](#concurrent.futures.Future.set_result "concurrent.futures.Future.set_result") 或 [`Future.set_exception()`](#concurrent.futures.Future.set_exception "concurrent.futures.Future.set_exception") 之后再调用。

set\_result(_result_)[¶](#concurrent.futures.Future.set_result "Link to this definition")

将 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 关联工作的结果设为 _result_。

这个方法只可以由 [`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") 实现和单元测试使用。

在 3.8 版本发生变更: 如果 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 已经完成则此方法会引发 [`concurrent.futures.InvalidStateError`](#concurrent.futures.InvalidStateError "concurrent.futures.InvalidStateError")。

set\_exception(_exception_)[¶](#concurrent.futures.Future.set_exception "Link to this definition")

将 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 关联工作的异常设为 [`Exception`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#Exception "Exception") _exception_。

这个方法只可以由 [`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") 实现和单元测试使用。

在 3.8 版本发生变更: 如果 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 已经完成则此方法会引发 [`concurrent.futures.InvalidStateError`](#concurrent.futures.InvalidStateError "concurrent.futures.InvalidStateError")。

## 模块函数[¶](#module-functions "Link to this heading")

concurrent.futures.wait(_fs_, _timeout\=None_, _return\_when\=ALL\_COMPLETED_)[¶](#concurrent.futures.wait "Link to this definition")

等待由 _fs_ 指定的 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 实例（可能由不同的 [`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") 实例创建）完成。 重复传给 _fs_ 的 future 会被移除并将只返回一次。 返回一个由集合组成的具名 2 元组。 第一个集合的名称为 `done`，包含在等待完成之前已完成的 future（包括正常结束或被取消的 future）。 第二个集合的名称为 `not_done`，包含未完成的 future（包括挂起的或正在运行的 future）。

_timeout_ 可以用来控制返回前最大的等待秒数。 _timeout_ 可以为 int 或 float 类型。 如果 _timeout_ 未指定或为 `None` ，则不限制等待时间。

_return\_when_ 指定此函数应在何时返回。它必须为以下常数之一:

| 
常量

 | 

描述

 |
| --- | --- |
| 

concurrent.futures.FIRST\_COMPLETED[¶](#concurrent.futures.FIRST_COMPLETED "Link to this definition")



 | 

函数将在任意 future 对象结束或取消时返回。

 |
| 

concurrent.futures.FIRST\_EXCEPTION[¶](#concurrent.futures.FIRST_EXCEPTION "Link to this definition")



 | 

该函数将在任何 future 对象通过引发异常而结束时返回。 如果没有任何 future 对象引发异常那么它将等价于 [`ALL_COMPLETED`](#concurrent.futures.ALL_COMPLETED "concurrent.futures.ALL_COMPLETED")。

 |
| 

concurrent.futures.ALL\_COMPLETED[¶](#concurrent.futures.ALL_COMPLETED "Link to this definition")



 | 

函数将在所有 future 对象结束或取消时返回。

 |

concurrent.futures.as\_completed(_fs_, _timeout\=None_)[¶](#concurrent.futures.as_completed "Link to this definition")

返回一个迭代器，每当 _fs_ 所给出的 [`Future`](#concurrent.futures.Future "concurrent.futures.Future") 实例（可能由不同的 [`Executor`](#concurrent.futures.Executor "concurrent.futures.Executor") 实例创建）完成时这个迭代器会产生新的 future（包括正常结束或被取消的 future 对象）。 任何由 _fs_ 给出的重复的 future 对象将只被返回一次。 任何在 [`as_completed()`](#concurrent.futures.as_completed "concurrent.futures.as_completed") 被调用之前完成的 future 对象将优先被产生。 如果 [`__next__()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#iterator.__next__ "iterator.__next__") 被调用并且在最初调用 `as_completed()` 之后的 _timeout_ 秒内其结果仍不可用，这个迭代器将引发 [`TimeoutError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TimeoutError "TimeoutError")。 _timeout_ 可以为整数或浮点数。 如果 _timeout_ 未指定或为 `None`，则不限制等待时间。

参见

[**PEP 3148**](https://peps.python.org/pep-3148/) -- future 对象 - 异步执行指令。

该提案描述了将此特性纳入 Python 标准库。

## Exception 类[¶](#exception-classes "Link to this heading")

_exception_ concurrent.futures.CancelledError[¶](#concurrent.futures.CancelledError "Link to this definition")

future 对象被取消时会触发。

_exception_ concurrent.futures.TimeoutError[¶](#concurrent.futures.TimeoutError "Link to this definition")

[`TimeoutError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TimeoutError "TimeoutError") 的一个已被弃用的别名，会在 future 操作超出了给定的时限时被引发。

_exception_ concurrent.futures.BrokenExecutor[¶](#concurrent.futures.BrokenExecutor "Link to this definition")

派生自 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")，当执行器因某些原因而中断且不能用来提交或执行新任务时将被引发。

Added in version 3.7.

_exception_ concurrent.futures.InvalidStateError[¶](#concurrent.futures.InvalidStateError "Link to this definition")

当某个操作在一个当前状态所不允许的 future 上执行时将被引发。

Added in version 3.8.

_exception_ concurrent.futures.thread.BrokenThreadPool[¶](#concurrent.futures.thread.BrokenThreadPool "Link to this definition")

派生自 [`BrokenExecutor`](#concurrent.futures.BrokenExecutor "concurrent.futures.BrokenExecutor")，这个异常类会在 [`ThreadPoolExecutor`](#concurrent.futures.ThreadPoolExecutor "concurrent.futures.ThreadPoolExecutor") 的某个工作线程初始化失败时被引发。

Added in version 3.7.

_exception_ concurrent.futures.interpreter.BrokenInterpreterPool[¶](#concurrent.futures.interpreter.BrokenInterpreterPool "Link to this definition")

派生自 [`BrokenThreadPool`](#concurrent.futures.thread.BrokenThreadPool "concurrent.futures.thread.BrokenThreadPool")，这个异常类会在 [`InterpreterPoolExecutor`](#concurrent.futures.InterpreterPoolExecutor "concurrent.futures.InterpreterPoolExecutor") 的某个工作线程初始化失败时被引发。

Added in version 3.14.

_exception_ concurrent.futures.process.BrokenProcessPool[¶](#concurrent.futures.process.BrokenProcessPool "Link to this definition")

派生自 [`BrokenExecutor`](#concurrent.futures.BrokenExecutor "concurrent.futures.BrokenExecutor") (原为 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError"))，这个异常类会在 [`ProcessPoolExecutor`](#concurrent.futures.ProcessPoolExecutor "concurrent.futures.ProcessPoolExecutor") 的某个工作进程以不完整的方式终结（例如，从外部杀掉）时被引发。

Added in version 3.3.
