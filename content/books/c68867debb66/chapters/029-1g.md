`tornado.gen` is a generator-based interface to make it easier to work in an asynchronous environment. Code using the `gen` module is technically asynchronous, but it is written as a single generator instead of a collection of separate functions.

For example, the following asynchronous handler:

class AsyncHandler(RequestHandler):
    @asynchronous
    def get(self):
        http\_client \= AsyncHTTPClient()
        http\_client.fetch("http://example.com",
                          callback\=self.on\_fetch)

    def on\_fetch(self, response):
        do\_something\_with\_response(response)
        self.render("template.html")

could be written with `gen` as:

class GenAsyncHandler(RequestHandler):
    @gen.coroutine
    def get(self):
        http\_client \= AsyncHTTPClient()
        response \= yield http\_client.fetch("http://example.com")
        do\_something\_with\_response(response)
        self.render("template.html")

Most asynchronous functions in Tornado return a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future"); yielding this object returns its [`result`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future.result "tornado.concurrent.Future.result").

You can also yield a list or dict of `Futures`, which will be started at the same time and run in parallel; a list or dict of results will be returned when they are all finished:

@gen.coroutine
def get(self):
    http\_client \= AsyncHTTPClient()
    response1, response2 \= yield \[http\_client.fetch(url1),
                                  http\_client.fetch(url2)\]
    response\_dict \= yield dict(response3\=http\_client.fetch(url3),
                               response4\=http\_client.fetch(url4))
    response3 \= response\_dict\['response3'\]
    response4 \= response\_dict\['response4'\]

If the [`singledispatch`](https://docs.python.org/3.4/library/functools.html#functools.singledispatch "(在 Python v3.4)") library is available (standard in Python 3.4, available via the [singledispatch](https://pypi.python.org/pypi/singledispatch) package on older versions), additional types of objects may be yielded. Tornado includes support for `asyncio.Future` and Twisted’s `Deferred` class when `tornado.platform.asyncio` and `tornado.platform.twisted` are imported. See the [`convert_yielded`](#tornado.gen.convert_yielded "tornado.gen.convert_yielded") function to extend this mechanism.

在 3.2 版更改: Dict support added.

在 4.1 版更改: Support added for yielding `asyncio` Futures and Twisted Deferreds via `singledispatch`.

## Decorators[¶](#decorators "永久链接至标题")

`tornado.gen.``coroutine`(_func_, _replace\_callback=True_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#coroutine)[¶](#tornado.gen.coroutine "永久链接至目标")

Decorator for asynchronous generators.

Any generator that yields objects from this module must be wrapped in either this decorator or [`engine`](#tornado.gen.engine "tornado.gen.engine").

Coroutines may “return” by raising the special exception [`Return(value)`](#tornado.gen.Return "tornado.gen.Return"). In Python 3.3+, it is also possible for the function to simply use the `return value` statement (prior to Python 3.3 generators were not allowed to also return values). In all versions of Python a coroutine that simply wishes to exit early may use the `return` statement without a value.

Functions with this decorator return a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future"). Additionally, they may be called with a `callback` keyword argument, which will be invoked with the future’s result when it resolves. If the coroutine fails, the callback will not be run and an exception will be raised into the surrounding [`StackContext`](https://tornado-zh.readthedocs.io/zh/latest/stack_context.html#tornado.stack_context.StackContext "tornado.stack_context.StackContext"). The `callback` argument is not visible inside the decorated function; it is handled by the decorator itself.

From the caller’s perspective, `@gen.coroutine` is similar to the combination of `@return_future` and `@gen.engine`.

警告

When exceptions occur inside a coroutine, the exception information will be stored in the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") object. You must examine the result of the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") object, or the exception may go unnoticed by your code. This means yielding the function if called from another coroutine, using something like [`IOLoop.run_sync`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.run_sync "tornado.ioloop.IOLoop.run_sync") for top-level calls, or passing the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") to [`IOLoop.add_future`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_future "tornado.ioloop.IOLoop.add_future").

`tornado.gen.``engine`(_func_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#engine)[¶](#tornado.gen.engine "永久链接至目标")

Callback-oriented decorator for asynchronous generators.

This is an older interface; for new code that does not need to be compatible with versions of Tornado older than 3.0 the [`coroutine`](#tornado.gen.coroutine "tornado.gen.coroutine") decorator is recommended instead.

This decorator is similar to [`coroutine`](#tornado.gen.coroutine "tornado.gen.coroutine"), except it does not return a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") and the `callback` argument is not treated specially.

In most cases, functions decorated with [`engine`](#tornado.gen.engine "tornado.gen.engine") should take a `callback` argument and invoke it with their result when they are finished. One notable exception is the [`RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler") [HTTP verb methods](https://tornado-zh.readthedocs.io/zh/latest/web.html#verbs), which use `self.finish()` in place of a callback argument.

## Utility functions[¶](#utility-functions "永久链接至标题")

_exception_ `tornado.gen.``Return`(_value=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#Return)[¶](#tornado.gen.Return "永久链接至目标")

Special exception to return a value from a [`coroutine`](#tornado.gen.coroutine "tornado.gen.coroutine").

If this exception is raised, its value argument is used as the result of the coroutine:

@gen.coroutine
def fetch\_json(url):
    response \= yield AsyncHTTPClient().fetch(url)
    raise gen.Return(json\_decode(response.body))

In Python 3.3, this exception is no longer necessary: the `return` statement can be used directly to return a value (previously `yield` and `return` with a value could not be combined in the same function).

By analogy with the return statement, the value argument is optional, but it is never necessary to `raise gen.Return()`. The `return` statement can be used with no arguments instead.

`tornado.gen.``with_timeout`(_timeout_, _future_, _io\_loop=None_, _quiet\_exceptions=()_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#with_timeout)[¶](#tornado.gen.with_timeout "永久链接至目标")

Wraps a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") in a timeout.

Raises [`TimeoutError`](#tornado.gen.TimeoutError "tornado.gen.TimeoutError") if the input future does not complete before `timeout`, which may be specified in any form allowed by [`IOLoop.add_timeout`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout") (i.e. a [`datetime.timedelta`](https://docs.python.org/3.4/library/datetime.html#datetime.timedelta "(在 Python v3.4)") or an absolute time relative to [`IOLoop.time`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.time "tornado.ioloop.IOLoop.time"))

If the wrapped [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") fails after it has timed out, the exception will be logged unless it is of a type contained in `quiet_exceptions` (which may be an exception type or a sequence of types).

Currently only supports Futures, not other [`YieldPoint`](#tornado.gen.YieldPoint "tornado.gen.YieldPoint") classes.

4.0 新版功能.

在 4.1 版更改: Added the `quiet_exceptions` argument and the logging of unhandled exceptions.

_exception_ `tornado.gen.``TimeoutError`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#TimeoutError)[¶](#tornado.gen.TimeoutError "永久链接至目标")

Exception raised by `with_timeout`.

`tornado.gen.``sleep`(_duration_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#sleep)[¶](#tornado.gen.sleep "永久链接至目标")

Return a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") that resolves after the given number of seconds.

When used with `yield` in a coroutine, this is a non-blocking analogue to [`time.sleep`](https://docs.python.org/3.4/library/time.html#time.sleep "(在 Python v3.4)") (which should not be used in coroutines because it is blocking):

yield gen.sleep(0.5)

Note that calling this function on its own does nothing; you must wait on the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") it returns (usually by yielding it).

4.1 新版功能.

`tornado.gen.``moment`[¶](#tornado.gen.moment "永久链接至目标")

A special object which may be yielded to allow the IOLoop to run for one iteration.

This is not needed in normal use but it can be helpful in long-running coroutines that are likely to yield Futures that are ready instantly.

Usage: `yield gen.moment`

4.0 新版功能.

_class_ `tornado.gen.``WaitIterator`(_\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#WaitIterator)[¶](#tornado.gen.WaitIterator "永久链接至目标")

Provides an iterator to yield the results of futures as they finish.

Yielding a set of futures like this:

`results = yield [future1, future2]`

pauses the coroutine until both `future1` and `future2` return, and then restarts the coroutine with the results of both futures. If either future is an exception, the expression will raise that exception and all the results will be lost.

If you need to get the result of each future as soon as possible, or if you need the result of some futures even if others produce errors, you can use `WaitIterator`:

wait\_iterator \= gen.WaitIterator(future1, future2)
while not wait\_iterator.done():
    try:
        result \= yield wait\_iterator.next()
    except Exception as e:
        print("Error {} from {}".format(e, wait\_iterator.current\_future))
    else:
        print("Result {} received from {} at {}".format(
            result, wait\_iterator.current\_future,
            wait\_iterator.current\_index))

Because results are returned as soon as they are available the output from the iterator _will not be in the same order as the input arguments_. If you need to know which future produced the current result, you can use the attributes `WaitIterator.current_future`, or `WaitIterator.current_index` to get the index of the future from the input list. (if keyword arguments were used in the construction of the [`WaitIterator`](#tornado.gen.WaitIterator "tornado.gen.WaitIterator"), `current_index` will use the corresponding keyword).

On Python 3.5, [`WaitIterator`](#tornado.gen.WaitIterator "tornado.gen.WaitIterator") implements the async iterator protocol, so it can be used with the `async for` statement (note that in this version the entire iteration is aborted if any value raises an exception, while the previous example can continue past individual errors):

async for result in gen.WaitIterator(future1, future2):
    print("Result {} received from {} at {}".format(
        result, wait\_iterator.current\_future,
        wait\_iterator.current\_index))

4.1 新版功能.

在 4.3 版更改: Added `async for` support in Python 3.5.

`done`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#WaitIterator.done)[¶](#tornado.gen.WaitIterator.done "永久链接至目标")

Returns True if this iterator has no more results.

`next`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#WaitIterator.next)[¶](#tornado.gen.WaitIterator.next "永久链接至目标")

Returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") that will yield the next available result.

Note that this [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") will not be the same object as any of the inputs.

`tornado.gen.``multi`(_children_, _quiet\_exceptions=()_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#multi)[¶](#tornado.gen.multi "永久链接至目标")

Runs multiple asynchronous operations in parallel.

`children` may either be a list or a dict whose values are yieldable objects. `multi()` returns a new yieldable object that resolves to a parallel structure containing their results. If `children` is a list, the result is a list of results in the same order; if it is a dict, the result is a dict with the same keys.

That is, `results = yield multi(list_of_futures)` is equivalent to:

results \= \[\]
for future in list\_of\_futures:
    results.append(yield future)

If any children raise exceptions, `multi()` will raise the first one. All others will be logged, unless they are of types contained in the `quiet_exceptions` argument.

If any of the inputs are [`YieldPoints`](#tornado.gen.YieldPoint "tornado.gen.YieldPoint"), the returned yieldable object is a [`YieldPoint`](#tornado.gen.YieldPoint "tornado.gen.YieldPoint"). Otherwise, returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future"). This means that the result of [`multi`](#tornado.gen.multi "tornado.gen.multi") can be used in a native coroutine if and only if all of its children can be.

In a `yield`\-based coroutine, it is not normally necessary to call this function directly, since the coroutine runner will do it automatically when a list or dict is yielded. However, it is necessary in `await`\-based coroutines, or to pass the `quiet_exceptions` argument.

This function is available under the names `multi()` and `Multi()` for historical reasons.

在 4.2 版更改: If multiple yieldables fail, any exceptions after the first (which is raised) will be logged. Added the `quiet_exceptions` argument to suppress this logging for selected exception types.

在 4.3 版更改: Replaced the class `Multi` and the function `multi_future` with a unified function `multi`. Added support for yieldables other than [`YieldPoint`](#tornado.gen.YieldPoint "tornado.gen.YieldPoint") and [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future").

`tornado.gen.``multi_future`(_children_, _quiet\_exceptions=()_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#multi_future)[¶](#tornado.gen.multi_future "永久链接至目标")

Wait for multiple asynchronous futures in parallel.

This function is similar to [`multi`](#tornado.gen.multi "tornado.gen.multi"), but does not support [`YieldPoints`](#tornado.gen.YieldPoint "tornado.gen.YieldPoint").

4.0 新版功能.

在 4.2 版更改: If multiple `Futures` fail, any exceptions after the first (which is raised) will be logged. Added the `quiet_exceptions` argument to suppress this logging for selected exception types.

4.3 版后已移除: Use [`multi`](#tornado.gen.multi "tornado.gen.multi") instead.

`tornado.gen.``Task`(_func_, _\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#Task)[¶](#tornado.gen.Task "永久链接至目标")

Adapts a callback-based asynchronous function for use in coroutines.

Takes a function (and optional additional arguments) and runs it with those arguments plus a `callback` keyword argument. The argument passed to the callback is returned as the result of the yield expression.

在 4.0 版更改: `gen.Task` is now a function that returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future"), instead of a subclass of [`YieldPoint`](#tornado.gen.YieldPoint "tornado.gen.YieldPoint"). It still behaves the same way when yielded.

_class_ `tornado.gen.``Arguments`[¶](#tornado.gen.Arguments "永久链接至目标")

The result of a [`Task`](#tornado.gen.Task "tornado.gen.Task") or [`Wait`](#tornado.gen.Wait "tornado.gen.Wait") whose callback had more than one argument (or keyword arguments).

The [`Arguments`](#tornado.gen.Arguments "tornado.gen.Arguments") object is a [`collections.namedtuple`](https://docs.python.org/3.4/library/collections.html#collections.namedtuple "(在 Python v3.4)") and can be used either as a tuple `(args, kwargs)` or an object with attributes `args` and `kwargs`.

`tornado.gen.``convert_yielded`(_yielded_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#convert_yielded)[¶](#tornado.gen.convert_yielded "永久链接至目标")

Convert a yielded object into a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future").

The default implementation accepts lists, dictionaries, and Futures.

If the [`singledispatch`](https://docs.python.org/3.4/library/functools.html#functools.singledispatch "(在 Python v3.4)") library is available, this function may be extended to support additional types. For example:

@convert\_yielded.register(asyncio.Future)
def \_(asyncio\_future):
    return tornado.platform.asyncio.to\_tornado\_future(asyncio\_future)

4.1 新版功能.

`tornado.gen.``maybe_future`(_x_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#maybe_future)[¶](#tornado.gen.maybe_future "永久链接至目标")

Converts `x` into a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future").

If `x` is already a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future"), it is simply returned; otherwise it is wrapped in a new [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future"). This is suitable for use as `result = yield gen.maybe_future(f())` when you don’t know whether `f()` returns a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") or not.

4.3 版后已移除: This function only handles `Futures`, not other yieldable objects. Instead of [`maybe_future`](#tornado.gen.maybe_future "tornado.gen.maybe_future"), check for the non-future result types you expect (often just `None`), and `yield` anything unknown.

## Legacy interface[¶](#legacy-interface "永久链接至标题")

Before support for [`Futures`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") was introduced in Tornado 3.0, coroutines used subclasses of [`YieldPoint`](#tornado.gen.YieldPoint "tornado.gen.YieldPoint") in their `yield` expressions. These classes are still supported but should generally not be used except for compatibility with older interfaces. None of these classes are compatible with native (`await`\-based) coroutines.

_class_ `tornado.gen.``YieldPoint`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#YieldPoint)[¶](#tornado.gen.YieldPoint "永久链接至目标")

Base class for objects that may be yielded from the generator.

4.0 版后已移除: Use [`Futures`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") instead.

`start`(_runner_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#YieldPoint.start)[¶](#tornado.gen.YieldPoint.start "永久链接至目标")

Called by the runner after the generator has yielded.

No other methods will be called on this object before `start`.

`is_ready`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#YieldPoint.is_ready)[¶](#tornado.gen.YieldPoint.is_ready "永久链接至目标")

Called by the runner to determine whether to resume the generator.

Returns a boolean; may be called more than once.

`get_result`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#YieldPoint.get_result)[¶](#tornado.gen.YieldPoint.get_result "永久链接至目标")

Returns the value to use as the result of the yield expression.

This method will only be called once, and only after [`is_ready`](#tornado.gen.YieldPoint.is_ready "tornado.gen.YieldPoint.is_ready") has returned true.

_class_ `tornado.gen.``Callback`(_key_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#Callback)[¶](#tornado.gen.Callback "永久链接至目标")

Returns a callable object that will allow a matching [`Wait`](#tornado.gen.Wait "tornado.gen.Wait") to proceed.

The key may be any value suitable for use as a dictionary key, and is used to match `Callbacks` to their corresponding `Waits`. The key must be unique among outstanding callbacks within a single run of the generator function, but may be reused across different runs of the same function (so constants generally work fine).

The callback may be called with zero or one arguments; if an argument is given it will be returned by [`Wait`](#tornado.gen.Wait "tornado.gen.Wait").

4.0 版后已移除: Use [`Futures`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") instead.

_class_ `tornado.gen.``Wait`(_key_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#Wait)[¶](#tornado.gen.Wait "永久链接至目标")

Returns the argument passed to the result of a previous [`Callback`](#tornado.gen.Callback "tornado.gen.Callback").

4.0 版后已移除: Use [`Futures`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") instead.

_class_ `tornado.gen.``WaitAll`(_keys_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#WaitAll)[¶](#tornado.gen.WaitAll "永久链接至目标")

Returns the results of multiple previous [`Callbacks`](#tornado.gen.Callback "tornado.gen.Callback").

The argument is a sequence of [`Callback`](#tornado.gen.Callback "tornado.gen.Callback") keys, and the result is a list of results in the same order.

[`WaitAll`](#tornado.gen.WaitAll "tornado.gen.WaitAll") is equivalent to yielding a list of [`Wait`](#tornado.gen.Wait "tornado.gen.Wait") objects.

4.0 版后已移除: Use [`Futures`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") instead.

_class_ `tornado.gen.``MultiYieldPoint`(_children_, _quiet\_exceptions=()_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/gen.html#MultiYieldPoint)[¶](#tornado.gen.MultiYieldPoint "永久链接至目标")

Runs multiple asynchronous operations in parallel.

This class is similar to [`multi`](#tornado.gen.multi "tornado.gen.multi"), but it always creates a stack context even when no children require it. It is not compatible with native coroutines.

在 4.2 版更改: If multiple `YieldPoints` fail, any exceptions after the first (which is raised) will be logged. Added the `quiet_exceptions` argument to suppress this logging for selected exception types.

在 4.3 版更改: Renamed from `Multi` to `MultiYieldPoint`. The name `Multi` remains as an alias for the equivalent [`multi`](#tornado.gen.multi "tornado.gen.multi") function.

4.3 版后已移除: Use [`multi`](#tornado.gen.multi "tornado.gen.multi") instead.
