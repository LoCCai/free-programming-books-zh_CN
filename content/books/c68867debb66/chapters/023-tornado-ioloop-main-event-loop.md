An I/O event loop for non-blocking sockets.

Typical applications will use a single [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") object, in the [`IOLoop.instance`](#tornado.ioloop.IOLoop.instance "tornado.ioloop.IOLoop.instance") singleton. The [`IOLoop.start`](#tornado.ioloop.IOLoop.start "tornado.ioloop.IOLoop.start") method should usually be called at the end of the `main()` function. Atypical applications may use more than one [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), such as one [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") per thread, or per [`unittest`](https://docs.python.org/3.4/library/unittest.html#module-unittest "(在 Python v3.4)") case.

In addition to I/O events, the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") can also schedule time-based events. [`IOLoop.add_timeout`](#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout") is a non-blocking alternative to [`time.sleep`](https://docs.python.org/3.4/library/time.html#time.sleep "(在 Python v3.4)").

## IOLoop objects[¶](#ioloop-objects "永久链接至标题")

_class_ `tornado.ioloop.``IOLoop`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop)[¶](#tornado.ioloop.IOLoop "永久链接至目标")

A level-triggered I/O loop.

We use `epoll` (Linux) or `kqueue` (BSD and Mac OS X) if they are available, or else we fall back on select(). If you are implementing a system that needs to handle thousands of simultaneous connections, you should use a system that supports either `epoll` or `kqueue`.

Example usage for a simple TCP server:

import errno
import functools
import tornado.ioloop
import socket

def connection\_ready(sock, fd, events):
    while True:
        try:
            connection, address \= sock.accept()
        except socket.error as e:
            if e.args\[0\] not in (errno.EWOULDBLOCK, errno.EAGAIN):
                raise
            return
        connection.setblocking(0)
        handle\_connection(connection, address)

if \_\_name\_\_ \== '\_\_main\_\_':
    sock \= socket.socket(socket.AF\_INET, socket.SOCK\_STREAM, 0)
    sock.setsockopt(socket.SOL\_SOCKET, socket.SO\_REUSEADDR, 1)
    sock.setblocking(0)
    sock.bind(("", port))
    sock.listen(128)

    io\_loop \= tornado.ioloop.IOLoop.current()
    callback \= functools.partial(connection\_ready, sock)
    io\_loop.add\_handler(sock.fileno(), callback, io\_loop.READ)
    io\_loop.start()

By default, a newly-constructed [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") becomes the thread’s current [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), unless there already is a current [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"). This behavior can be controlled with the `make_current` argument to the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") constructor: if `make_current=True`, the new [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") will always try to become current and it raises an error if there is already a current instance. If `make_current=False`, the new [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") will not try to become current.

在 4.2 版更改: Added the `make_current` keyword argument to the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") constructor.

### Running an IOLoop[¶](#running-an-ioloop "永久链接至标题")

_static_ `IOLoop.``current`(_instance=True_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.current)[¶](#tornado.ioloop.IOLoop.current "永久链接至目标")

Returns the current thread’s [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop").

If an [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") is currently running or has been marked as current by [`make_current`](#tornado.ioloop.IOLoop.make_current "tornado.ioloop.IOLoop.make_current"), returns that instance. If there is no current [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), returns [`IOLoop.instance()`](#tornado.ioloop.IOLoop.instance "tornado.ioloop.IOLoop.instance") (i.e. the main thread’s [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), creating one if necessary) if `instance` is true.

In general you should use [`IOLoop.current`](#tornado.ioloop.IOLoop.current "tornado.ioloop.IOLoop.current") as the default when constructing an asynchronous object, and use [`IOLoop.instance`](#tornado.ioloop.IOLoop.instance "tornado.ioloop.IOLoop.instance") when you mean to communicate to the main thread from a different one.

在 4.1 版更改: Added `instance` argument to control the fallback to [`IOLoop.instance()`](#tornado.ioloop.IOLoop.instance "tornado.ioloop.IOLoop.instance").

`IOLoop.``make_current`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.make_current)[¶](#tornado.ioloop.IOLoop.make_current "永久链接至目标")

Makes this the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") for the current thread.

An [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") automatically becomes current for its thread when it is started, but it is sometimes useful to call [`make_current`](#tornado.ioloop.IOLoop.make_current "tornado.ioloop.IOLoop.make_current") explicitly before starting the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), so that code run at startup time can find the right instance.

在 4.1 版更改: An [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") created while there is no current [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") will automatically become current.

_static_ `IOLoop.``instance`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.instance)[¶](#tornado.ioloop.IOLoop.instance "永久链接至目标")

Returns a global [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") instance.

Most applications have a single, global [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") running on the main thread. Use this method to get this instance from another thread. In most other cases, it is better to use [`current()`](#tornado.ioloop.IOLoop.current "tornado.ioloop.IOLoop.current") to get the current thread’s [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop").

_static_ `IOLoop.``initialized`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.initialized)[¶](#tornado.ioloop.IOLoop.initialized "永久链接至目标")

Returns true if the singleton instance has been created.

`IOLoop.``install`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.install)[¶](#tornado.ioloop.IOLoop.install "永久链接至目标")

Installs this [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") object as the singleton instance.

This is normally not necessary as [`instance()`](#tornado.ioloop.IOLoop.instance "tornado.ioloop.IOLoop.instance") will create an [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") on demand, but you may want to call [`install`](#tornado.ioloop.IOLoop.install "tornado.ioloop.IOLoop.install") to use a custom subclass of [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop").

_static_ `IOLoop.``clear_instance`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.clear_instance)[¶](#tornado.ioloop.IOLoop.clear_instance "永久链接至目标")

Clear the global [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") instance.

4.0 新版功能.

`IOLoop.``start`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.start)[¶](#tornado.ioloop.IOLoop.start "永久链接至目标")

Starts the I/O loop.

The loop will run until one of the callbacks calls [`stop()`](#tornado.ioloop.IOLoop.stop "tornado.ioloop.IOLoop.stop"), which will make the loop stop after the current event iteration completes.

`IOLoop.``stop`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.stop)[¶](#tornado.ioloop.IOLoop.stop "永久链接至目标")

Stop the I/O loop.

If the event loop is not currently running, the next call to [`start()`](#tornado.ioloop.IOLoop.start "tornado.ioloop.IOLoop.start") will return immediately.

To use asynchronous methods from otherwise-synchronous code (such as unit tests), you can start and stop the event loop like this:

ioloop \= IOLoop()
async\_method(ioloop\=ioloop, callback\=ioloop.stop)
ioloop.start()

`ioloop.start()` will return after `async_method` has run its callback, whether that callback was invoked before or after `ioloop.start`.

Note that even after [`stop`](#tornado.ioloop.IOLoop.stop "tornado.ioloop.IOLoop.stop") has been called, the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") is not completely stopped until [`IOLoop.start`](#tornado.ioloop.IOLoop.start "tornado.ioloop.IOLoop.start") has also returned. Some work that was scheduled before the call to [`stop`](#tornado.ioloop.IOLoop.stop "tornado.ioloop.IOLoop.stop") may still be run before the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") shuts down.

`IOLoop.``run_sync`(_func_, _timeout=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.run_sync)[¶](#tornado.ioloop.IOLoop.run_sync "永久链接至目标")

Starts the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), runs the given function, and stops the loop.

The function must return either a yieldable object or `None`. If the function returns a yieldable object, the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") will run until the yieldable is resolved (and [`run_sync()`](#tornado.ioloop.IOLoop.run_sync "tornado.ioloop.IOLoop.run_sync") will return the yieldable’s result). If it raises an exception, the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") will stop and the exception will be re-raised to the caller.

The keyword-only argument `timeout` may be used to set a maximum duration for the function. If the timeout expires, a [`TimeoutError`](https://docs.python.org/3.4/library/exceptions.html#TimeoutError "(在 Python v3.4)") is raised.

This method is useful in conjunction with [`tornado.gen.coroutine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.coroutine "tornado.gen.coroutine") to allow asynchronous calls in a `main()` function:

@gen.coroutine
def main():
    \# do stuff...

if \_\_name\_\_ \== '\_\_main\_\_':
    IOLoop.current().run\_sync(main)

在 4.3 版更改: Returning a non-`None`, non-yieldable value is now an error.

`IOLoop.``close`(_all\_fds=False_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.close)[¶](#tornado.ioloop.IOLoop.close "永久链接至目标")

Closes the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), freeing any resources used.

If `all_fds` is true, all file descriptors registered on the IOLoop will be closed (not just the ones created by the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") itself).

Many applications will only use a single [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") that runs for the entire lifetime of the process. In that case closing the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") is not necessary since everything will be cleaned up when the process exits. [`IOLoop.close`](#tornado.ioloop.IOLoop.close "tornado.ioloop.IOLoop.close") is provided mainly for scenarios such as unit tests, which create and destroy a large number of `IOLoops`.

An [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") must be completely stopped before it can be closed. This means that [`IOLoop.stop()`](#tornado.ioloop.IOLoop.stop "tornado.ioloop.IOLoop.stop") must be called _and_ [`IOLoop.start()`](#tornado.ioloop.IOLoop.start "tornado.ioloop.IOLoop.start") must be allowed to return before attempting to call [`IOLoop.close()`](#tornado.ioloop.IOLoop.close "tornado.ioloop.IOLoop.close"). Therefore the call to [`close`](#tornado.ioloop.IOLoop.close "tornado.ioloop.IOLoop.close") will usually appear just after the call to [`start`](#tornado.ioloop.IOLoop.start "tornado.ioloop.IOLoop.start") rather than near the call to [`stop`](#tornado.ioloop.IOLoop.stop "tornado.ioloop.IOLoop.stop").

在 3.1 版更改: If the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") implementation supports non-integer objects for “file descriptors”, those objects will have their `close` method when `all_fds` is true.

### I/O events[¶](#i-o-events "永久链接至标题")

`IOLoop.``add_handler`(_fd_, _handler_, _events_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.add_handler)[¶](#tornado.ioloop.IOLoop.add_handler "永久链接至目标")

Registers the given handler to receive the given events for `fd`.

The `fd` argument may either be an integer file descriptor or a file-like object with a `fileno()` method (and optionally a `close()` method, which may be called when the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") is shut down).

The `events` argument is a bitwise or of the constants `IOLoop.READ`, `IOLoop.WRITE`, and `IOLoop.ERROR`.

When an event occurs, `handler(fd, events)` will be run.

在 4.0 版更改: Added the ability to pass file-like objects in addition to raw file descriptors.

`IOLoop.``update_handler`(_fd_, _events_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.update_handler)[¶](#tornado.ioloop.IOLoop.update_handler "永久链接至目标")

Changes the events we listen for `fd`.

在 4.0 版更改: Added the ability to pass file-like objects in addition to raw file descriptors.

`IOLoop.``remove_handler`(_fd_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.remove_handler)[¶](#tornado.ioloop.IOLoop.remove_handler "永久链接至目标")

Stop listening for events on `fd`.

在 4.0 版更改: Added the ability to pass file-like objects in addition to raw file descriptors.

### Callbacks and timeouts[¶](#callbacks-and-timeouts "永久链接至标题")

`IOLoop.``add_callback`(_callback_, _\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.add_callback)[¶](#tornado.ioloop.IOLoop.add_callback "永久链接至目标")

Calls the given callback on the next I/O loop iteration.

It is safe to call this method from any thread at any time, except from a signal handler. Note that this is the **only** method in [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") that makes this thread-safety guarantee; all other interaction with the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") must be done from that [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop")‘s thread. [`add_callback()`](#tornado.ioloop.IOLoop.add_callback "tornado.ioloop.IOLoop.add_callback") may be used to transfer control from other threads to the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop")‘s thread.

To add a callback from a signal handler, see [`add_callback_from_signal`](#tornado.ioloop.IOLoop.add_callback_from_signal "tornado.ioloop.IOLoop.add_callback_from_signal").

`IOLoop.``add_callback_from_signal`(_callback_, _\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.add_callback_from_signal)[¶](#tornado.ioloop.IOLoop.add_callback_from_signal "永久链接至目标")

Calls the given callback on the next I/O loop iteration.

Safe for use from a Python signal handler; should not be used otherwise.

Callbacks added with this method will be run without any [`stack_context`](https://tornado-zh.readthedocs.io/zh/latest/stack_context.html#module-tornado.stack_context "tornado.stack_context"), to avoid picking up the context of the function that was interrupted by the signal.

`IOLoop.``add_future`(_future_, _callback_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.add_future)[¶](#tornado.ioloop.IOLoop.add_future "永久链接至目标")

Schedules a callback on the `IOLoop` when the given [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") is finished.

The callback is invoked with one argument, the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future").

`IOLoop.``add_timeout`(_deadline_, _callback_, _\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.add_timeout)[¶](#tornado.ioloop.IOLoop.add_timeout "永久链接至目标")

Runs the `callback` at the time `deadline` from the I/O loop.

Returns an opaque handle that may be passed to [`remove_timeout`](#tornado.ioloop.IOLoop.remove_timeout "tornado.ioloop.IOLoop.remove_timeout") to cancel.

`deadline` may be a number denoting a time (on the same scale as [`IOLoop.time`](#tornado.ioloop.IOLoop.time "tornado.ioloop.IOLoop.time"), normally [`time.time`](https://docs.python.org/3.4/library/time.html#time.time "(在 Python v3.4)")), or a [`datetime.timedelta`](https://docs.python.org/3.4/library/datetime.html#datetime.timedelta "(在 Python v3.4)") object for a deadline relative to the current time. Since Tornado 4.0, [`call_later`](#tornado.ioloop.IOLoop.call_later "tornado.ioloop.IOLoop.call_later") is a more convenient alternative for the relative case since it does not require a timedelta object.

Note that it is not safe to call [`add_timeout`](#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout") from other threads. Instead, you must use [`add_callback`](#tornado.ioloop.IOLoop.add_callback "tornado.ioloop.IOLoop.add_callback") to transfer control to the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop")‘s thread, and then call [`add_timeout`](#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout") from there.

Subclasses of IOLoop must implement either [`add_timeout`](#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout") or [`call_at`](#tornado.ioloop.IOLoop.call_at "tornado.ioloop.IOLoop.call_at"); the default implementations of each will call the other. [`call_at`](#tornado.ioloop.IOLoop.call_at "tornado.ioloop.IOLoop.call_at") is usually easier to implement, but subclasses that wish to maintain compatibility with Tornado versions prior to 4.0 must use [`add_timeout`](#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout") instead.

在 4.0 版更改: Now passes through `*args` and `**kwargs` to the callback.

`IOLoop.``call_at`(_when_, _callback_, _\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.call_at)[¶](#tornado.ioloop.IOLoop.call_at "永久链接至目标")

Runs the `callback` at the absolute time designated by `when`.

`when` must be a number using the same reference point as [`IOLoop.time`](#tornado.ioloop.IOLoop.time "tornado.ioloop.IOLoop.time").

Returns an opaque handle that may be passed to [`remove_timeout`](#tornado.ioloop.IOLoop.remove_timeout "tornado.ioloop.IOLoop.remove_timeout") to cancel. Note that unlike the [`asyncio`](https://docs.python.org/3.4/library/asyncio.html#module-asyncio "(在 Python v3.4)") method of the same name, the returned object does not have a `cancel()` method.

See [`add_timeout`](#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout") for comments on thread-safety and subclassing.

4.0 新版功能.

`IOLoop.``call_later`(_delay_, _callback_, _\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.call_later)[¶](#tornado.ioloop.IOLoop.call_later "永久链接至目标")

Runs the `callback` after `delay` seconds have passed.

Returns an opaque handle that may be passed to [`remove_timeout`](#tornado.ioloop.IOLoop.remove_timeout "tornado.ioloop.IOLoop.remove_timeout") to cancel. Note that unlike the [`asyncio`](https://docs.python.org/3.4/library/asyncio.html#module-asyncio "(在 Python v3.4)") method of the same name, the returned object does not have a `cancel()` method.

See [`add_timeout`](#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout") for comments on thread-safety and subclassing.

4.0 新版功能.

`IOLoop.``remove_timeout`(_timeout_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.remove_timeout)[¶](#tornado.ioloop.IOLoop.remove_timeout "永久链接至目标")

Cancels a pending timeout.

The argument is a handle as returned by [`add_timeout`](#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout"). It is safe to call [`remove_timeout`](#tornado.ioloop.IOLoop.remove_timeout "tornado.ioloop.IOLoop.remove_timeout") even if the callback has already been run.

`IOLoop.``spawn_callback`(_callback_, _\*args_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.spawn_callback)[¶](#tornado.ioloop.IOLoop.spawn_callback "永久链接至目标")

Calls the given callback on the next IOLoop iteration.

Unlike all other callback-related methods on IOLoop, `spawn_callback` does not associate the callback with its caller’s `stack_context`, so it is suitable for fire-and-forget callbacks that should not interfere with the caller.

4.0 新版功能.

`IOLoop.``time`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.time)[¶](#tornado.ioloop.IOLoop.time "永久链接至目标")

Returns the current time according to the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop")‘s clock.

The return value is a floating-point number relative to an unspecified time in the past.

By default, the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop")‘s time function is [`time.time`](https://docs.python.org/3.4/library/time.html#time.time "(在 Python v3.4)"). However, it may be configured to use e.g. [`time.monotonic`](https://docs.python.org/3.4/library/time.html#time.monotonic "(在 Python v3.4)") instead. Calls to [`add_timeout`](#tornado.ioloop.IOLoop.add_timeout "tornado.ioloop.IOLoop.add_timeout") that pass a number instead of a [`datetime.timedelta`](https://docs.python.org/3.4/library/datetime.html#datetime.timedelta "(在 Python v3.4)") should use this function to compute the appropriate time, so they can work no matter what time function is chosen.

_class_ `tornado.ioloop.``PeriodicCallback`(_callback_, _callback\_time_, _io\_loop=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#PeriodicCallback)[¶](#tornado.ioloop.PeriodicCallback "永久链接至目标")

Schedules the given callback to be called periodically.

The callback is called every `callback_time` milliseconds. Note that the timeout is given in milliseconds, while most other time-related functions in Tornado use seconds.

If the callback runs for longer than `callback_time` milliseconds, subsequent invocations will be skipped to get back on schedule.

[`start`](#tornado.ioloop.PeriodicCallback.start "tornado.ioloop.PeriodicCallback.start") must be called after the [`PeriodicCallback`](#tornado.ioloop.PeriodicCallback "tornado.ioloop.PeriodicCallback") is created.

在 4.1 版更改: The `io_loop` argument is deprecated.

`start`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#PeriodicCallback.start)[¶](#tornado.ioloop.PeriodicCallback.start "永久链接至目标")

Starts the timer.

`stop`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#PeriodicCallback.stop)[¶](#tornado.ioloop.PeriodicCallback.stop "永久链接至目标")

Stops the timer.

`is_running`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#PeriodicCallback.is_running)[¶](#tornado.ioloop.PeriodicCallback.is_running "永久链接至目标")

Return True if this [`PeriodicCallback`](#tornado.ioloop.PeriodicCallback "tornado.ioloop.PeriodicCallback") has been started.

4.1 新版功能.

### Debugging and error handling[¶](#debugging-and-error-handling "永久链接至标题")

`IOLoop.``handle_callback_exception`(_callback_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.handle_callback_exception)[¶](#tornado.ioloop.IOLoop.handle_callback_exception "永久链接至目标")

This method is called whenever a callback run by the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") throws an exception.

By default simply logs the exception as an error. Subclasses may override this method to customize reporting of exceptions.

The exception itself is not passed explicitly, but is available in [`sys.exc_info`](https://docs.python.org/3.4/library/sys.html#sys.exc_info "(在 Python v3.4)").

`IOLoop.``set_blocking_signal_threshold`(_seconds_, _action_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.set_blocking_signal_threshold)[¶](#tornado.ioloop.IOLoop.set_blocking_signal_threshold "永久链接至目标")

Sends a signal if the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") is blocked for more than `s` seconds.

Pass `seconds=None` to disable. Requires Python 2.6 on a unixy platform.

The action parameter is a Python signal handler. Read the documentation for the [`signal`](https://docs.python.org/3.4/library/signal.html#module-signal "(在 Python v3.4)") module for more information. If `action` is None, the process will be killed if it is blocked for too long.

`IOLoop.``set_blocking_log_threshold`(_seconds_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.set_blocking_log_threshold)[¶](#tornado.ioloop.IOLoop.set_blocking_log_threshold "永久链接至目标")

Logs a stack trace if the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") is blocked for more than `s` seconds.

Equivalent to `set_blocking_signal_threshold(seconds, self.log_stack)`

`IOLoop.``log_stack`(_signal_, _frame_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.log_stack)[¶](#tornado.ioloop.IOLoop.log_stack "永久链接至目标")

Signal handler to log the stack trace of the current thread.

For use with [`set_blocking_signal_threshold`](#tornado.ioloop.IOLoop.set_blocking_signal_threshold "tornado.ioloop.IOLoop.set_blocking_signal_threshold").

### Methods for subclasses[¶](#methods-for-subclasses "永久链接至标题")

`IOLoop.``initialize`(_make\_current=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.initialize)[¶](#tornado.ioloop.IOLoop.initialize "永久链接至目标")

`IOLoop.``close_fd`(_fd_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.close_fd)[¶](#tornado.ioloop.IOLoop.close_fd "永久链接至目标")

Utility method to close an `fd`.

If `fd` is a file-like object, we close it directly; otherwise we use [`os.close`](https://docs.python.org/3.4/library/os.html#os.close "(在 Python v3.4)").

This method is provided for use by [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") subclasses (in implementations of `IOLoop.close(all_fds=True)` and should not generally be used by application code.

4.0 新版功能.

`IOLoop.``split_fd`(_fd_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/ioloop.html#IOLoop.split_fd)[¶](#tornado.ioloop.IOLoop.split_fd "永久链接至目标")

Returns an (fd, obj) pair from an `fd` parameter.

We accept both raw file descriptors and file-like objects as input to [`add_handler`](#tornado.ioloop.IOLoop.add_handler "tornado.ioloop.IOLoop.add_handler") and related methods. When a file-like object is passed, we must retain the object itself so we can close it correctly when the [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") shuts down, but the poller interfaces favor file descriptors (they will accept file-like objects and call `fileno()` for you, but they always return the descriptor itself).

This method is provided for use by [`IOLoop`](#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") subclasses and should not generally be used by application code.

4.0 新版功能.
