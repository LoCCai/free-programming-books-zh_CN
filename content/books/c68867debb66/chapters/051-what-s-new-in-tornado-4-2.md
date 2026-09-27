### Backwards-compatibility notes[¶](#backwards-compatibility-notes "永久链接至标题")

-   `SSLIOStream.connect` and [`IOStream.start_tls`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream.start_tls "tornado.iostream.IOStream.start_tls") now validate certificates by default.
-   Certificate validation will now use the system CA root certificates instead of `certifi` when possible (i.e. Python 2.7.9+ or 3.4+). This includes [`IOStream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#tornado.iostream.IOStream "tornado.iostream.IOStream") and `simple_httpclient`, but not `curl_httpclient`.
-   The default SSL configuration has become stricter, using [`ssl.create_default_context`](https://docs.python.org/3.4/library/ssl.html#ssl.create_default_context "(在 Python v3.4)") where available on the client side. (On the server side, applications are encouraged to migrate from the `ssl_options` dict-based API to pass an [`ssl.SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)") instead).
-   The deprecated classes in the [`tornado.auth`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#module-tornado.auth "tornado.auth") module, `GoogleMixin`, `FacebookMixin`, and `FriendFeedMixin` have been removed.

### New modules: [`tornado.locks`](https://tornado-zh.readthedocs.io/zh/latest/locks.html#module-tornado.locks "tornado.locks") and [`tornado.queues`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#module-tornado.queues "tornado.queues")[¶](#new-modules-tornado-locks-and-tornado-queues "永久链接至标题")

These modules provide classes for coordinating coroutines, merged from [Toro](http://toro.readthedocs.org).

To port your code from Toro’s queues to Tornado 4.2, import [`Queue`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue "tornado.queues.Queue"), [`PriorityQueue`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.PriorityQueue "tornado.queues.PriorityQueue"), or [`LifoQueue`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.LifoQueue "tornado.queues.LifoQueue") from [`tornado.queues`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#module-tornado.queues "tornado.queues") instead of from `toro`.

Use [`Queue`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue "tornado.queues.Queue") instead of Toro’s `JoinableQueue`. In Tornado the methods [`join`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue.join "tornado.queues.Queue.join") and [`task_done`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue.task_done "tornado.queues.Queue.task_done") are available on all queues, not on a special `JoinableQueue`.

Tornado queues raise exceptions specific to Tornado instead of reusing exceptions from the Python standard library. Therefore instead of catching the standard [`queue.Empty`](https://docs.python.org/3.4/library/queue.html#queue.Empty "(在 Python v3.4)") exception from [`Queue.get_nowait`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue.get_nowait "tornado.queues.Queue.get_nowait"), catch the special [`tornado.queues.QueueEmpty`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.QueueEmpty "tornado.queues.QueueEmpty") exception, and instead of catching the standard [`queue.Full`](https://docs.python.org/3.4/library/queue.html#queue.Full "(在 Python v3.4)") from [`Queue.get_nowait`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue.get_nowait "tornado.queues.Queue.get_nowait"), catch [`tornado.queues.QueueFull`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.QueueFull "tornado.queues.QueueFull").

To port from Toro’s locks to Tornado 4.2, import [`Condition`](https://tornado-zh.readthedocs.io/zh/latest/locks.html#tornado.locks.Condition "tornado.locks.Condition"), [`Event`](https://tornado-zh.readthedocs.io/zh/latest/locks.html#tornado.locks.Event "tornado.locks.Event"), [`Semaphore`](https://tornado-zh.readthedocs.io/zh/latest/locks.html#tornado.locks.Semaphore "tornado.locks.Semaphore"), [`BoundedSemaphore`](https://tornado-zh.readthedocs.io/zh/latest/locks.html#tornado.locks.BoundedSemaphore "tornado.locks.BoundedSemaphore"), or [`Lock`](https://tornado-zh.readthedocs.io/zh/latest/locks.html#tornado.locks.Lock "tornado.locks.Lock") from [`tornado.locks`](https://tornado-zh.readthedocs.io/zh/latest/locks.html#module-tornado.locks "tornado.locks") instead of from `toro`.

Toro’s `Semaphore.wait` allowed a coroutine to wait for the semaphore to be unlocked _without_ acquiring it. This encouraged unorthodox patterns; in Tornado, just use [`acquire`](https://tornado-zh.readthedocs.io/zh/latest/locks.html#tornado.locks.Semaphore.acquire "tornado.locks.Semaphore.acquire").

Toro’s `Event.wait` raised a `Timeout` exception after a timeout. In Tornado, [`Event.wait`](https://tornado-zh.readthedocs.io/zh/latest/locks.html#tornado.locks.Event.wait "tornado.locks.Event.wait") raises [`tornado.gen.TimeoutError`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.TimeoutError "tornado.gen.TimeoutError").

Toro’s `Condition.wait` also raised `Timeout`, but in Tornado, the [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") returned by [`Condition.wait`](https://tornado-zh.readthedocs.io/zh/latest/locks.html#tornado.locks.Condition.wait "tornado.locks.Condition.wait") resolves to False after a timeout:

@gen.coroutine
def await\_notification():
    if not (yield condition.wait(timeout\=timedelta(seconds\=1))):
        print('timed out')
    else:
        print('condition is true')

In lock and queue methods, wherever Toro accepted `deadline` as a keyword argument, Tornado names the argument `timeout` instead.

Toro’s `AsyncResult` is not merged into Tornado, nor its exceptions `NotReady` and `AlreadySet`. Use a [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") instead. If you wrote code like this:

from tornado import gen
import toro

result \= toro.AsyncResult()

@gen.coroutine
def setter():
    result.set(1)

@gen.coroutine
def getter():
    value \= yield result.get()
    print(value)  \# Prints "1".

Then the Tornado equivalent is:

from tornado import gen
from tornado.concurrent import Future

result \= Future()

@gen.coroutine
def setter():
    result.set\_result(1)

@gen.coroutine
def getter():
    value \= yield result
    print(value)  \# Prints "1".

### [`tornado.simple_httpclient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#module-tornado.simple_httpclient "tornado.simple_httpclient")[¶](#tornado-simple-httpclient "永久链接至标题")

-   Improved performance on Python 3 by reusing a single [`ssl.SSLContext`](https://docs.python.org/3.4/library/ssl.html#ssl.SSLContext "(在 Python v3.4)").
-   New constructor argument `max_body_size` controls the maximum response size the client is willing to accept. It may be bigger than `max_buffer_size` if `streaming_callback` is used.
