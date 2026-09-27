Added in version 3.3.

* * *

本模块包含当发生故障、超时或收到用户信号时可转储 Python 回溯信息的函数。调用 [`faulthandler.enable()`](#faulthandler.enable "faulthandler.enable") 可安装针对 [`SIGSEGV`](https://docs.python.org/zh-cn/3/library/signal.html#signal.SIGSEGV "signal.SIGSEGV"), [`SIGFPE`](https://docs.python.org/zh-cn/3/library/signal.html#signal.SIGFPE "signal.SIGFPE"), [`SIGABRT`](https://docs.python.org/zh-cn/3/library/signal.html#signal.SIGABRT "signal.SIGABRT"), [`SIGBUS`](https://docs.python.org/zh-cn/3/library/signal.html#signal.SIGBUS "signal.SIGBUS") 和 [`SIGILL`](https://docs.python.org/zh-cn/3/library/signal.html#signal.SIGILL "signal.SIGILL") 信号的故障处理器。你还可以在启动时通过设置 [`PYTHONFAULTHANDLER`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONFAULTHANDLER) 环境变量或使用 [`-X`](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-X) `faulthandler` 命令行选项来启用它们。

故障处理器可兼容系统故障处理器如 Apport 或 Windows 故障处理器。本模块会在 `sigaltstack()` 函数可用时为信号处理器使用备用栈。这允许它即使在栈溢出的情况下也能转储回溯信息。

故障处理程序将在灾难性场合调用，因此只能使用信号安全的函数（比如不能在堆上分配内存）。由于这一限制，与正常的 Python 回溯相比，转储量是最小的：

-   只支持 ASCII 码。编码时会用到 `backslashreplace` 错误处理程序。
    
-   每个字符串限制在 500 个字符以内。
    
-   只会显示文件名、函数名和行号。（不显示源代码）
    
-   It is limited to 100 frames and 100 threads.
    
-   反序排列：最近的调用最先显示。
    

默认情况下，Python 的跟踪信息会写入 [`sys.stderr`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stderr "sys.stderr")。为了能看到跟踪信息，应用程序必须运行于终端中。日志文件也可以传给 [`faulthandler.enable()`](#faulthandler.enable "faulthandler.enable").

本模块是用 C 语言实现的，所以才能在崩溃或 Python 死锁时转储跟踪信息。

在 Python 启动时， [Python 开发模式](https://docs.python.org/zh-cn/3/library/devmode.html#devmode) 会调用 [`faulthandler.enable()`](#faulthandler.enable "faulthandler.enable")。

参见

模块 [`pdb`](https://docs.python.org/zh-cn/3/library/pdb.html#module-pdb "pdb: The Python debugger for interactive interpreters.")

用于 Python 程序的交互式源代码调试器。

模块 [`traceback`](https://docs.python.org/zh-cn/3/library/traceback.html#module-traceback "traceback: Print or retrieve a stack traceback.")

提取、格式化和打印 Python 程序的栈回溯信息的标准接口。

## 转储跟踪信息[¶](#dumping-the-traceback "Link to this heading")

faulthandler.dump\_traceback(_file\=sys.stderr_, _all\_threads\=True_)[¶](#faulthandler.dump_traceback "Link to this definition")

Dump the tracebacks of all threads into _file_. If _all\_threads_ is `False`, dump only the current thread.

在 3.5 版本发生变更: 增加了向本函数传入文件描述符的支持。

## 对 C 栈进行转储[¶](#dumping-the-c-stack "Link to this heading")

Added in version 3.14.

faulthandler.dump\_c\_stack(_file\=sys.stderr_)[¶](#faulthandler.dump_c_stack "Link to this definition")

将当前线程的 C 栈追踪转储到 _file_ 中。

如果 Python 构建版不支持或者操作系统没有提供栈追踪，那么此函数将打印一条错误消息而不是已转储的 C 栈。

### C 栈兼容性[¶](#c-stack-compatibility "Link to this heading")

如果系统不支持 C 层级的 _[backtrace(3)](https://manpages.debian.org/backtrace\(3\))_ 或 _[dladdr1(3)](https://manpages.debian.org/dladdr1\(3\))_，则 C 栈转储将不会执行。 将打印一条错误消息而不是打印栈。

此外，某些编译器不支持 [CPython](https://docs.python.org/zh-cn/3/glossary.html#term-CPython) 的 C 栈转储实现。 因此，可能会打印不同的错误消息而不是打印栈，即使操作系统支持转储栈。

备注

转储 C 栈可能会相当慢，具体取决于调用栈中的二进制数据的 DWARF 级别。

## 故障处理程序的状态[¶](#fault-handler-state "Link to this heading")

faulthandler.enable(_file\=sys.stderr_, _all\_threads\=True_, _c\_stack\=True_)[¶](#faulthandler.enable "Link to this definition")

启用默认的处理器：为 [`SIGSEGV`](https://docs.python.org/zh-cn/3/library/signal.html#signal.SIGSEGV "signal.SIGSEGV"), [`SIGFPE`](https://docs.python.org/zh-cn/3/library/signal.html#signal.SIGFPE "signal.SIGFPE"), [`SIGABRT`](https://docs.python.org/zh-cn/3/library/signal.html#signal.SIGABRT "signal.SIGABRT"), [`SIGBUS`](https://docs.python.org/zh-cn/3/library/signal.html#signal.SIGBUS "signal.SIGBUS") 和 [`SIGILL`](https://docs.python.org/zh-cn/3/library/signal.html#signal.SIGILL "signal.SIGILL") 信号安装处理器来转储 Python 回溯信息。如果 _all\_threads_ 为 `True`，则会为每个运行中的线程产生回溯信息。 在其他情况下，将只转储当前线程。

_file_ 必须保持打开状态，直至停用故障处理程序为止：参见 [文件描述符相关话题](#faulthandler-fd)。

如果 _c\_stack_ 为 `True`，则 C 栈追踪将在 Python 回溯之后打印，除非系统不支持它。请参阅 [`dump_c_stack()`](#faulthandler.dump_c_stack "faulthandler.dump_c_stack") 了解有关兼容性的更多信息。

在 3.5 版本发生变更: 增加了向本函数传入文件描述符的支持。

在 3.6 版本发生变更: 在 Windows 系统中，同时会安装一个 Windows 异常处理程序。

在 3.10 版本发生变更: 现在如果 _all\_threads_ 为 True，则转储信息会包含垃圾收集器是否正在运行。

在 3.14 版本发生变更: 如果禁用了 [GIL](https://docs.python.org/zh-cn/3/glossary.html#term-GIL)，则只有当前线程会被转储，以防止数据竞争风险。

在 3.14 版本发生变更: 现在如果 _c\_stack_ 为真值，则转储将显示 C 栈追踪。

faulthandler.disable()[¶](#faulthandler.disable "Link to this definition")

停用故障处理程序：卸载由 [`enable()`](#faulthandler.enable "faulthandler.enable") 安装的信号处理程序。

faulthandler.is\_enabled()[¶](#faulthandler.is_enabled "Link to this definition")

检查故障处理程序是否被启用。

## 一定时间后转储跟踪数据[¶](#dumping-the-tracebacks-after-a-timeout "Link to this heading")

faulthandler.dump\_traceback\_later(_timeout_, _repeat\=False_, _file\=sys.stderr_, _exit\=False_)[¶](#faulthandler.dump_traceback_later "Link to this definition")

Dump the tracebacks of all threads, after a timeout of _timeout_ seconds, or every _timeout_ seconds if _repeat_ is `True`. If _exit_ is `True`, call `_exit()` with status=1 after dumping the tracebacks. (Note `_exit()` exits the process immediately, which means it doesn't do any cleanup like flushing file buffers.) If the function is called twice, the new call replaces previous parameters and resets the timeout. The timer has a sub-second resolution.

_file_ 必须保持打开状态，直至跟踪信息转储完毕，或调用了 [`cancel_dump_traceback_later()`](#faulthandler.cancel_dump_traceback_later "faulthandler.cancel_dump_traceback_later"): 参见 [文件描述符相关话题](#faulthandler-fd)。

本函数用一个看门狗线程实现。

在 3.5 版本发生变更: 增加了向本函数传入文件描述符的支持。

在 3.7 版本发生变更: 该函数现在总是可用。

faulthandler.cancel\_dump\_traceback\_later()[¶](#faulthandler.cancel_dump_traceback_later "Link to this definition")

取消 [`dump_traceback_later()`](#faulthandler.dump_traceback_later "faulthandler.dump_traceback_later") 的最后一次调用。

## 转储用户信号的跟踪信息[¶](#dumping-the-traceback-on-a-user-signal "Link to this heading")

faulthandler.register(_signum_, _file\=sys.stderr_, _all\_threads\=True_, _chain\=False_)[¶](#faulthandler.register "Link to this definition")

Register a user signal: install a handler for the _signum_ signal to dump the traceback of all threads, or of the current thread if _all\_threads_ is `False`, into _file_. Call the previous handler if chain is `True`.

_file_ 必须保持打开状态，直至该信号被 [`unregister()`](#faulthandler.unregister "faulthandler.unregister") 注销：参见 [文件描述符相关话题](#faulthandler-fd).

Windows 中不可用。

在 3.5 版本发生变更: 增加了向本函数传入文件描述符的支持。

faulthandler.unregister(_signum_)[¶](#faulthandler.unregister "Link to this definition")

注销一个用户信号：卸载由 [`register()`](#faulthandler.register "faulthandler.register") 安装的 _signum_ 信号处理程序。如果信号已注册，返回 `True`，否则返回 `False`.

Windows 中不可用。

## 文件描述符相关话题[¶](#issue-with-file-descriptors "Link to this heading")

[`enable()`](#faulthandler.enable "faulthandler.enable")、[`dump_traceback_later()`](#faulthandler.dump_traceback_later "faulthandler.dump_traceback_later") 和 [`register()`](#faulthandler.register "faulthandler.register") 保留其 _file_ 参数给出的文件描述符。如果文件关闭，文件描述符将被一个新文件重新使用；或者用 [`os.dup2()`](https://docs.python.org/zh-cn/3/library/os.html#os.dup2 "os.dup2") 替换了文件描述符，则跟踪信息将被写入另一个文件。每次文件被替换时，请再次调用这些函数。

## 示例[¶](#example "Link to this heading")

在 Linux 中启用和停用内存段故障的默认处理程序：

$ python \-c "import ctypes; ctypes.string\_at(0)"
Segmentation fault

$ python \-q \-X faulthandler
\>>> import ctypes
\>>> ctypes.string\_at(0)
Fatal Python error: Segmentation fault

Current thread 0x00007fb899f39700 (most recent call first):
  File "/opt/python/Lib/ctypes/\_\_init\_\_.py", line 486 in string\_at
  File "<stdin>", line 1 in <module>

Current thread's C stack trace (most recent call first):
  Binary file "/opt/python/python", at \_Py\_DumpStack+0x42 \[0x5b27f7d7147e\]
  Binary file "/opt/python/python", at +0x32dcbd \[0x5b27f7d85cbd\]
  Binary file "/opt/python/python", at +0x32df8a \[0x5b27f7d85f8a\]
  Binary file "/usr/lib/libc.so.6", at +0x3def0 \[0x77b73226bef0\]
  Binary file "/usr/lib/libc.so.6", at +0x17ef9c \[0x77b7323acf9c\]
  Binary file "/opt/python/build/lib.linux-x86\_64-3.14/\_ctypes.cpython-314d-x86\_64-linux-gnu.so", at +0xcdf6 \[0x77b7315dddf6\]
  Binary file "/usr/lib/libffi.so.8", at +0x7976 \[0x77b73158f976\]
  Binary file "/usr/lib/libffi.so.8", at +0x413c \[0x77b73158c13c\]
  Binary file "/usr/lib/libffi.so.8", at ffi\_call+0x12e \[0x77b73158ef0e\]
  Binary file "/opt/python/build/lib.linux-x86\_64-3.14/\_ctypes.cpython-314d-x86\_64-linux-gnu.so", at +0x15a33 \[0x77b7315e6a33\]
  Binary file "/opt/python/build/lib.linux-x86\_64-3.14/\_ctypes.cpython-314d-x86\_64-linux-gnu.so", at +0x164fa \[0x77b7315e74fa\]
  Binary file "/opt/python/build/lib.linux-x86\_64-3.14/\_ctypes.cpython-314d-x86\_64-linux-gnu.so", at +0xc624 \[0x77b7315dd624\]
  Binary file "/opt/python/python", at \_PyObject\_MakeTpCall+0xce \[0x5b27f7b73883\]
  Binary file "/opt/python/python", at +0x11bab6 \[0x5b27f7b73ab6\]
  Binary file "/opt/python/python", at PyObject\_Vectorcall+0x23 \[0x5b27f7b73b04\]
  Binary file "/opt/python/python", at \_PyEval\_EvalFrameDefault+0x490c \[0x5b27f7cbb302\]
  Binary file "/opt/python/python", at +0x2818e6 \[0x5b27f7cd98e6\]
  Binary file "/opt/python/python", at +0x281aab \[0x5b27f7cd9aab\]
  Binary file "/opt/python/python", at PyEval\_EvalCode+0xc5 \[0x5b27f7cd9ba3\]
  Binary file "/opt/python/python", at +0x255957 \[0x5b27f7cad957\]
  Binary file "/opt/python/python", at +0x255ab4 \[0x5b27f7cadab4\]
  Binary file "/opt/python/python", at \_PyEval\_EvalFrameDefault+0x6c3e \[0x5b27f7cbd634\]
  Binary file "/opt/python/python", at +0x2818e6 \[0x5b27f7cd98e6\]
  Binary file "/opt/python/python", at +0x281aab \[0x5b27f7cd9aab\]
  Binary file "/opt/python/python", at +0x11b6e1 \[0x5b27f7b736e1\]
  Binary file "/opt/python/python", at +0x11d348 \[0x5b27f7b75348\]
  Binary file "/opt/python/python", at +0x11d626 \[0x5b27f7b75626\]
  Binary file "/opt/python/python", at PyObject\_Call+0x20 \[0x5b27f7b7565e\]
  Binary file "/opt/python/python", at +0x32a67a \[0x5b27f7d8267a\]
  Binary file "/opt/python/python", at +0x32a7f8 \[0x5b27f7d827f8\]
  Binary file "/opt/python/python", at +0x32ac1b \[0x5b27f7d82c1b\]
  Binary file "/opt/python/python", at Py\_RunMain+0x31 \[0x5b27f7d82ebe\]
  <truncated rest of calls>
Segmentation fault
