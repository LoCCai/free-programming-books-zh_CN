Utilities for working with multiple processes, including both forking the server into multiple processes and managing subprocesses.

_exception_ `tornado.process.``CalledProcessError`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/subprocess.html#CalledProcessError)[¶](#tornado.process.CalledProcessError "永久链接至目标")

An alias for [`subprocess.CalledProcessError`](https://docs.python.org/3.4/library/subprocess.html#subprocess.CalledProcessError "(在 Python v3.4)").

`tornado.process.``cpu_count`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/process.html#cpu_count)[¶](#tornado.process.cpu_count "永久链接至目标")

Returns the number of processors on this machine.

`tornado.process.``fork_processes`(_num\_processes_, _max\_restarts=100_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/process.html#fork_processes)[¶](#tornado.process.fork_processes "永久链接至目标")

Starts multiple worker processes.

If `num_processes` is None or <= 0, we detect the number of cores available on this machine and fork that number of child processes. If `num_processes` is given and > 0, we fork that specific number of sub-processes.

Since we use processes and not threads, there is no shared memory between any server code.

Note that multiple processes are not compatible with the autoreload module (or the `autoreload=True` option to [`tornado.web.Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") which defaults to True when `debug=True`). When using multiple processes, no IOLoops can be created or referenced until after the call to `fork_processes`.

In each child process, `fork_processes` returns its _task id_, a number between 0 and `num_processes`. Processes that exit abnormally (due to a signal or non-zero exit status) are restarted with the same id (up to `max_restarts` times). In the parent process, `fork_processes` returns None if all child processes have exited normally, but will otherwise only exit by throwing an exception.

`tornado.process.``task_id`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/process.html#task_id)[¶](#tornado.process.task_id "永久链接至目标")

Returns the current task id, if any.

Returns None if this process was not created by [`fork_processes`](#tornado.process.fork_processes "tornado.process.fork_processes").

_class_ `tornado.process.``Subprocess`(_\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/process.html#Subprocess)[¶](#tornado.process.Subprocess "永久链接至目标")

Wraps `subprocess.Popen` with IOStream support.

The constructor is the same as `subprocess.Popen` with the following additions:

-   `stdin`, `stdout`, and `stderr` may have the value `tornado.process.Subprocess.STREAM`, which will make the corresponding attribute of the resulting Subprocess a [`PipeIOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.PipeIOStream "tornado.iostream.PipeIOStream").
-   A new keyword argument `io_loop` may be used to pass in an IOLoop.

在 4.1 版更改: The `io_loop` argument is deprecated.

`set_exit_callback`(_callback_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/process.html#Subprocess.set_exit_callback)[¶](#tornado.process.Subprocess.set_exit_callback "永久链接至目标")

Runs `callback` when this process exits.

The callback takes one argument, the return code of the process.

This method uses a `SIGCHLD` handler, which is a global setting and may conflict if you have other libraries trying to handle the same signal. If you are using more than one `IOLoop` it may be necessary to call [`Subprocess.initialize`](#tornado.process.Subprocess.initialize "tornado.process.Subprocess.initialize") first to designate one `IOLoop` to run the signal handlers.

In many cases a close callback on the stdout or stderr streams can be used as an alternative to an exit callback if the signal handler is causing a problem.

`wait_for_exit`(_raise\_error=True_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/process.html#Subprocess.wait_for_exit)[¶](#tornado.process.Subprocess.wait_for_exit "永久链接至目标")

Returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") which resolves when the process exits.

Usage:

ret \= yield proc.wait\_for\_exit()

This is a coroutine-friendly alternative to [`set_exit_callback`](#tornado.process.Subprocess.set_exit_callback "tornado.process.Subprocess.set_exit_callback") (and a replacement for the blocking [`subprocess.Popen.wait`](https://docs.python.org/3.4/library/subprocess.html#subprocess.Popen.wait "(在 Python v3.4)")).

By default, raises [`subprocess.CalledProcessError`](https://docs.python.org/3.4/library/subprocess.html#subprocess.CalledProcessError "(在 Python v3.4)") if the process has a non-zero exit status. Use `wait_for_exit(raise_error=False)` to suppress this behavior and return the exit status without raising.

4.2 新版功能.

_classmethod_ `initialize`(_io\_loop=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/process.html#Subprocess.initialize)[¶](#tornado.process.Subprocess.initialize "永久链接至目标")

Initializes the `SIGCHLD` handler.

The signal handler is run on an [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") to avoid locking issues. Note that the [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") used for signal handling need not be the same one used by individual Subprocess objects (as long as the `IOLoops` are each running in separate threads).

在 4.1 版更改: The `io_loop` argument is deprecated.

_classmethod_ `uninitialize`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/process.html#Subprocess.uninitialize)[¶](#tornado.process.Subprocess.uninitialize "永久链接至目标")

Removes the `SIGCHLD` handler.
