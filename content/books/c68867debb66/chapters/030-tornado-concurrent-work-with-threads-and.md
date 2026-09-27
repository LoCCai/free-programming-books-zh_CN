Utilities for working with threads and `Futures`.

`Futures` are a pattern for concurrent programming introduced in Python 3.2 in the [`concurrent.futures`](https://docs.python.org/3.4/library/concurrent.futures.html#module-concurrent.futures "(在 Python v3.4)") package. This package defines a mostly-compatible [`Future`](#tornado.concurrent.Future "tornado.concurrent.Future") class designed for use from coroutines, as well as some utility functions for interacting with the [`concurrent.futures`](https://docs.python.org/3.4/library/concurrent.futures.html#module-concurrent.futures "(在 Python v3.4)") package.

_class_ `tornado.concurrent.``Future`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#Future)[¶](#tornado.concurrent.Future "永久链接至目标")

Placeholder for an asynchronous result.

A `Future` encapsulates the result of an asynchronous operation. In synchronous applications `Futures` are used to wait for the result from a thread or process pool; in Tornado they are normally used with [`IOLoop.add_future`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_future "tornado.ioloop.IOLoop.add_future") or by yielding them in a [`gen.coroutine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.coroutine "tornado.gen.coroutine").

[`tornado.concurrent.Future`](#tornado.concurrent.Future "tornado.concurrent.Future") is similar to [`concurrent.futures.Future`](https://docs.python.org/3.4/library/concurrent.futures.html#concurrent.futures.Future "(在 Python v3.4)"), but not thread-safe (and therefore faster for use with single-threaded event loops).

In addition to `exception` and `set_exception`, methods `exc_info` and `set_exc_info` are supported to capture tracebacks in Python 2. The traceback is automatically available in Python 3, but in the Python 2 futures backport this information is discarded. This functionality was previously available in a separate class `TracebackFuture`, which is now a deprecated alias for this class.

在 4.0 版更改: [`tornado.concurrent.Future`](#tornado.concurrent.Future "tornado.concurrent.Future") is always a thread-unsafe `Future` with support for the `exc_info` methods. Previously it would be an alias for the thread-safe [`concurrent.futures.Future`](https://docs.python.org/3.4/library/concurrent.futures.html#concurrent.futures.Future "(在 Python v3.4)") if that package was available and fall back to the thread-unsafe implementation if it was not.

在 4.1 版更改: If a [`Future`](#tornado.concurrent.Future "tornado.concurrent.Future") contains an error but that error is never observed (by calling `result()`, `exception()`, or `exc_info()`), a stack trace will be logged when the [`Future`](#tornado.concurrent.Future "tornado.concurrent.Future") is garbage collected. This normally indicates an error in the application, but in cases where it results in undesired logging it may be necessary to suppress the logging by ensuring that the exception is observed: `f.add_done_callback(lambda f: f.exception())`.

## Consumer methods[¶](#consumer-methods "永久链接至标题")

`Future.``result`(_timeout=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#Future.result)[¶](#tornado.concurrent.Future.result "永久链接至目标")

If the operation succeeded, return its result. If it failed, re-raise its exception.

This method takes a `timeout` argument for compatibility with [`concurrent.futures.Future`](https://docs.python.org/3.4/library/concurrent.futures.html#concurrent.futures.Future "(在 Python v3.4)") but it is an error to call it before the [`Future`](#tornado.concurrent.Future "tornado.concurrent.Future") is done, so the `timeout` is never used.

`Future.``exception`(_timeout=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#Future.exception)[¶](#tornado.concurrent.Future.exception "永久链接至目标")

If the operation raised an exception, return the [`Exception`](https://docs.python.org/3.4/library/exceptions.html#Exception "(在 Python v3.4)") object. Otherwise returns None.

This method takes a `timeout` argument for compatibility with [`concurrent.futures.Future`](https://docs.python.org/3.4/library/concurrent.futures.html#concurrent.futures.Future "(在 Python v3.4)") but it is an error to call it before the [`Future`](#tornado.concurrent.Future "tornado.concurrent.Future") is done, so the `timeout` is never used.

`Future.``exc_info`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#Future.exc_info)[¶](#tornado.concurrent.Future.exc_info "永久链接至目标")

Returns a tuple in the same format as [`sys.exc_info`](https://docs.python.org/3.4/library/sys.html#sys.exc_info "(在 Python v3.4)") or None.

4.0 新版功能.

`Future.``add_done_callback`(_fn_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#Future.add_done_callback)[¶](#tornado.concurrent.Future.add_done_callback "永久链接至目标")

Attaches the given callback to the [`Future`](#tornado.concurrent.Future "tornado.concurrent.Future").

It will be invoked with the [`Future`](#tornado.concurrent.Future "tornado.concurrent.Future") as its argument when the Future has finished running and its result is available. In Tornado consider using [`IOLoop.add_future`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_future "tornado.ioloop.IOLoop.add_future") instead of calling [`add_done_callback`](#tornado.concurrent.Future.add_done_callback "tornado.concurrent.Future.add_done_callback") directly.

`Future.``done`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#Future.done)[¶](#tornado.concurrent.Future.done "永久链接至目标")

Returns True if the future has finished running.

`Future.``running`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#Future.running)[¶](#tornado.concurrent.Future.running "永久链接至目标")

Returns True if this operation is currently running.

`Future.``cancel`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#Future.cancel)[¶](#tornado.concurrent.Future.cancel "永久链接至目标")

Cancel the operation, if possible.

Tornado `Futures` do not support cancellation, so this method always returns False.

`Future.``cancelled`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#Future.cancelled)[¶](#tornado.concurrent.Future.cancelled "永久链接至目标")

Returns True if the operation has been cancelled.

Tornado `Futures` do not support cancellation, so this method always returns False.

## Producer methods[¶](#producer-methods "永久链接至标题")

`Future.``set_result`(_result_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#Future.set_result)[¶](#tornado.concurrent.Future.set_result "永久链接至目标")

Sets the result of a `Future`.

It is undefined to call any of the `set` methods more than once on the same object.

`Future.``set_exception`(_exception_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#Future.set_exception)[¶](#tornado.concurrent.Future.set_exception "永久链接至目标")

Sets the exception of a `Future.`

`Future.``set_exc_info`(_exc\_info_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#Future.set_exc_info)[¶](#tornado.concurrent.Future.set_exc_info "永久链接至目标")

Sets the exception information of a `Future.`

Preserves tracebacks on Python 2.

4.0 新版功能.

`tornado.concurrent.``run_on_executor`(_\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#run_on_executor)[¶](#tornado.concurrent.run_on_executor "永久链接至目标")

Decorator to run a synchronous method asynchronously on an executor.

The decorated method may be called with a `callback` keyword argument and returns a future.

The [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") and executor to be used are determined by the `io_loop` and `executor` attributes of `self`. To use different attributes, pass keyword arguments to the decorator:

@run\_on\_executor(executor\='\_thread\_pool')
def foo(self):
    pass

在 4.2 版更改: Added keyword arguments to use alternative attributes.

`tornado.concurrent.``return_future`(_f_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#return_future)[¶](#tornado.concurrent.return_future "永久链接至目标")

Decorator to make a function that returns via callback return a [`Future`](#tornado.concurrent.Future "tornado.concurrent.Future").

The wrapped function should take a `callback` keyword argument and invoke it with one argument when it has finished. To signal failure, the function can simply raise an exception (which will be captured by the [`StackContext`](https://tornado-zh.readthedocs.io/zh/latest/stack_context.html#tornado.stack_context.StackContext "tornado.stack_context.StackContext") and passed along to the `Future`).

From the caller’s perspective, the callback argument is optional. If one is given, it will be invoked when the function is complete with [`Future.result()`](#tornado.concurrent.Future.result "tornado.concurrent.Future.result") as an argument. If the function fails, the callback will not be run and an exception will be raised into the surrounding [`StackContext`](https://tornado-zh.readthedocs.io/zh/latest/stack_context.html#tornado.stack_context.StackContext "tornado.stack_context.StackContext").

If no callback is given, the caller should use the `Future` to wait for the function to complete (perhaps by yielding it in a [`gen.engine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.engine "tornado.gen.engine") function, or passing it to [`IOLoop.add_future`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_future "tornado.ioloop.IOLoop.add_future")).

Usage:

@return\_future
def future\_func(arg1, arg2, callback):
    \# Do stuff (possibly asynchronous)
    callback(result)

@gen.engine
def caller(callback):
    yield future\_func(arg1, arg2)
    callback()

Note that `@return_future` and `@gen.engine` can be applied to the same function, provided `@return_future` appears first. However, consider using `@gen.coroutine` instead of this combination.

`tornado.concurrent.``chain_future`(_a_, _b_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/concurrent.html#chain_future)[¶](#tornado.concurrent.chain_future "永久链接至目标")

Chain two futures together so that when one completes, so does the other.

The result (success or failure) of `a` will be copied to `b`, unless `b` has already been completed or cancelled by the time `a` finishes.
