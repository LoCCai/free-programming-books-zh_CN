* * *

asyncio 是用来编写 **并发** 代码的库，使用 **async/await** 语法。

asyncio 被用作多个 Python 异步框架的基础，这些框架提供高性能网络和网站服务，数据库连接库，分布式任务队列等等。

asyncio 往往是构建 IO 密集型和高层级 **结构化** 网络代码的最佳选择。

asyncio 提供一组 **高层级** API 用于：

-   并发地 [运行 Python 协程](https://docs.python.org/zh-cn/3/library/asyncio-task.html#coroutine) 并对其执行过程实现完全控制;
    
-   执行 [网络 IO 和 IPC](https://docs.python.org/zh-cn/3/library/asyncio-stream.html#asyncio-streams);
    
-   控制 [子进程](https://docs.python.org/zh-cn/3/library/asyncio-subprocess.html#asyncio-subprocess);
    
-   通过 [队列](https://docs.python.org/zh-cn/3/library/asyncio-queue.html#asyncio-queues) 分发任务;
    
-   [同步](https://docs.python.org/zh-cn/3/library/asyncio-sync.html#asyncio-sync) 并发代码;
    

For **introspection**, asyncio provides APIs and tools for:

-   inspecting the [async call graph](https://docs.python.org/zh-cn/3/library/asyncio-graph.html#asyncio-graph) of tasks and futures;
    
-   inspecting tasks in another running Python process with [command-line tools](https://docs.python.org/zh-cn/3/library/asyncio-tools.html#asyncio-introspection-tools);
    

此外，还有一些 **低层级** API 以支持 _库和框架的开发者_ 实现：

-   创建和管理 [事件循环](https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html#asyncio-event-loop)，它提供用于 [连接网络](https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html#loop-create-server), 运行 [子进程](https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html#loop-subprocess-exec), 处理 [OS 信号](https://docs.python.org/zh-cn/3/library/asyncio-eventloop.html#loop-add-signal-handler) 等功能的异步 API；
    
-   使用 [transports](https://docs.python.org/zh-cn/3/library/asyncio-protocol.html#asyncio-transports-protocols) 实现高效率协议;
    
-   通过 async/await 语法 [桥接](https://docs.python.org/zh-cn/3/library/asyncio-future.html#asyncio-futures) 基于回调的库和代码。
    

asyncio REPL

你可以在 [REPL](https://docs.python.org/zh-cn/3/glossary.html#term-REPL) 中尝试使用 `asyncio` 并发上下文：

$ python -m asyncio
asyncio REPL ...
Use "await" directly instead of "asyncio.run()".
Type "help", "copyright", "credits" or "license" for more information.
\>>> import asyncio
\>>> await asyncio.sleep(10, result\='hello')
'hello'

这个 REPL 提供了与 [`PYTHON_BASIC_REPL`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHON_BASIC_REPL) 的有限兼容性。推荐使用默认的 REPL 以获得完整功能和最新特性。

引发一个不带参数的 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `cpython.run_stdin`。

在 3.12.5 版本发生变更: （还有 3.11.10, 3.10.15, 3.9.20 和 3.8.20）将发出审计事件。

在 3.13 版本发生变更: 如果可能则使用 PyREPL，在此情况下 [`PYTHONSTARTUP`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONSTARTUP) 也会被执行。将发出审计事件。

参考

指南与教程

-   [高层级 API 索引](https://docs.python.org/zh-cn/3/library/asyncio-api-index.html)
-   [低层级 API 索引](https://docs.python.org/zh-cn/3/library/asyncio-llapi-index.html)
-   [用 asyncio 开发](https://docs.python.org/zh-cn/3/library/asyncio-dev.html)
-   [asyncio and free-threaded Python](https://docs.python.org/zh-cn/3/library/asyncio-threading.html)
