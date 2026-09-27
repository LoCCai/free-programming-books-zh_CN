4.2 新版功能.

使用和标准库提供给线程相似的同步原语协调协程.

_(请注意, 这些原语不是线程安全的, 不能被用来代替标准库中的–它 们是为了协调在单线程app中的Tornado协程, 而不是为了在一个多线程 app中保护共享对象.)_

## Condition[¶](#condition "永久链接至标题")

_class_ `tornado.locks.``Condition`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Condition)[¶](#tornado.locks.Condition "永久链接至目标")

允许一个或多个协程等待直到被通知的条件.

就像标准的 [`threading.Condition`](https://docs.python.org/3.4/library/threading.html#threading.Condition "(在 Python v3.4)"), 但是不需要一个被获取和释放的底层锁.

通过 [`Condition`](#tornado.locks.Condition "tornado.locks.Condition"), 协程可以等待着被其他协程通知:

from tornado import gen
from tornado.ioloop import IOLoop
from tornado.locks import Condition

condition \= Condition()

@gen.coroutine
def waiter():
    print("I'll wait right here")
    yield condition.wait()  \# Yield a Future.
    print("I'm done waiting")

@gen.coroutine
def notifier():
    print("About to notify")
    condition.notify()
    print("Done notifying")

@gen.coroutine
def runner():
    \# Yield two Futures; wait for waiter() and notifier() to finish.
    yield \[waiter(), notifier()\]

IOLoop.current().run\_sync(runner)

I'll wait right here
About to notify
Done notifying
I'm done waiting

[`wait`](#tornado.locks.Condition.wait "tornado.locks.Condition.wait") 有一个可选参数 `timeout` , 要不然是一个绝对的时间戳:

io\_loop \= IOLoop.current()

\# Wait up to 1 second for a notification.
yield condition.wait(timeout\=io\_loop.time() + 1)

...或一个 [`datetime.timedelta`](https://docs.python.org/3.4/library/datetime.html#datetime.timedelta "(在 Python v3.4)") 相对于当前时间的一个延时:

\# Wait up to 1 second.
yield condition.wait(timeout\=datetime.timedelta(seconds\=1))

这个方法将抛出一个 [`tornado.gen.TimeoutError`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.TimeoutError "tornado.gen.TimeoutError") 如果在最后时间之前都 没有通知.

`wait`(_timeout=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Condition.wait)[¶](#tornado.locks.Condition.wait "永久链接至目标")

等待 [`notify`](#tornado.locks.Condition.notify "tornado.locks.Condition.notify").

返回一个 [`Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future") 对象, 如果条件被通知则为 `True` , 或者在超时之后为 `False` .

`notify`(_n=1_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Condition.notify)[¶](#tornado.locks.Condition.notify "永久链接至目标")

唤醒 `n` 个等待者(waiters) .

`notify_all`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Condition.notify_all)[¶](#tornado.locks.Condition.notify_all "永久链接至目标")

唤醒全部的等待者(waiters) .

## Event[¶](#event "永久链接至标题")

_class_ `tornado.locks.``Event`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Event)[¶](#tornado.locks.Event "永久链接至目标")

一个阻塞协程的事件直到它的内部标识设置为True.

类似于 [`threading.Event`](https://docs.python.org/3.4/library/threading.html#threading.Event "(在 Python v3.4)").

协程可以等待一个事件被设置. 一旦它被设置, 调用 `yield event.wait()` 将不会被阻塞除非该事件已经被清除:

from tornado import gen
from tornado.ioloop import IOLoop
from tornado.locks import Event

event \= Event()

@gen.coroutine
def waiter():
    print("Waiting for event")
    yield event.wait()
    print("Not waiting this time")
    yield event.wait()
    print("Done")

@gen.coroutine
def setter():
    print("About to set the event")
    event.set()

@gen.coroutine
def runner():
    yield \[waiter(), setter()\]

IOLoop.current().run\_sync(runner)

Waiting for event
About to set the event
Not waiting this time
Done

`is_set`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Event.is_set)[¶](#tornado.locks.Event.is_set "永久链接至目标")

如果内部标识是true将返回 `True` .

`set`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Event.set)[¶](#tornado.locks.Event.set "永久链接至目标")

设置内部标识为 `True`. 所有的等待者(waiters)都被唤醒.

一旦该标识被设置调用 [`wait`](#tornado.locks.Event.wait "tornado.locks.Event.wait") 将不会阻塞.

`clear`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Event.clear)[¶](#tornado.locks.Event.clear "永久链接至目标")

重置内部标识为 `False`.

调用 [`wait`](#tornado.locks.Event.wait "tornado.locks.Event.wait") 将阻塞直到 [`set`](#tornado.locks.Event.set "tornado.locks.Event.set") 被调用.

`wait`(_timeout=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Event.wait)[¶](#tornado.locks.Event.wait "永久链接至目标")

阻塞直到内部标识为true.

返回一个Future对象, 在超时之后会抛出一个 [`tornado.gen.TimeoutError`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.TimeoutError "tornado.gen.TimeoutError") 异常.

## Semaphore[¶](#semaphore "永久链接至标题")

_class_ `tornado.locks.``Semaphore`(_value=1_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Semaphore)[¶](#tornado.locks.Semaphore "永久链接至目标")

可以在阻塞之前获得固定次数的锁.

一个信号量管理着代表 [`release`](#tornado.locks.Semaphore.release "tornado.locks.Semaphore.release") 调用次数减去 [`acquire`](#tornado.locks.Semaphore.acquire "tornado.locks.Semaphore.acquire") 的 调用次数的计数器, 加一个初始值. 如果必要的话,\`.acquire\` 方 法将会阻塞, 直到它可以返回, 而不使该计数器成为负值.

信号量限制访问共享资源. 为了允许两个worker同时获得权限:

from tornado import gen
from tornado.ioloop import IOLoop
from tornado.locks import Semaphore

sem \= Semaphore(2)

@gen.coroutine
def worker(worker\_id):
    yield sem.acquire()
    try:
        print("Worker %d is working" % worker\_id)
        yield use\_some\_resource()
    finally:
        print("Worker %d is done" % worker\_id)
        sem.release()

@gen.coroutine
def runner():
    \# Join all workers.
    yield \[worker(i) for i in range(3)\]

IOLoop.current().run\_sync(runner)

Worker 0 is working
Worker 1 is working
Worker 0 is done
Worker 2 is working
Worker 1 is done
Worker 2 is done

Workers 0 和 1 允许并行运行, 但是worker 2将等待直到 信号量被worker 0释放.

[`acquire`](#tornado.locks.Semaphore.acquire "tornado.locks.Semaphore.acquire") 是一个上下文管理器, 所以 `worker` 可以被写为:

@gen.coroutine
def worker(worker\_id):
    with (yield sem.acquire()):
        print("Worker %d is working" % worker\_id)
        yield use\_some\_resource()

    \# Now the semaphore has been released.
    print("Worker %d is done" % worker\_id)

在 Python 3.5 中, 信号量自身可以作为一个异步上下文管理器:

async def worker(worker\_id):
    async with sem:
        print("Worker %d is working" % worker\_id)
        await use\_some\_resource()

    \# Now the semaphore has been released.
    print("Worker %d is done" % worker\_id)

在 4.3 版更改: 添加对 Python 3.5 `async with` 的支持.

`release`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Semaphore.release)[¶](#tornado.locks.Semaphore.release "永久链接至目标")

增加counter 并且唤醒一个waiter.

`acquire`(_timeout=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Semaphore.acquire)[¶](#tornado.locks.Semaphore.acquire "永久链接至目标")

递减计数器. 返回一个 Future 对象.

如果计数器(counter)为0将会阻塞, 等待 [`release`](#tornado.locks.Semaphore.release "tornado.locks.Semaphore.release"). 在超时之后 Future 对象将会抛出 [`TimeoutError`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.TimeoutError "tornado.gen.TimeoutError") .

## BoundedSemaphore[¶](#boundedsemaphore "永久链接至标题")

_class_ `tornado.locks.``BoundedSemaphore`(_value=1_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#BoundedSemaphore)[¶](#tornado.locks.BoundedSemaphore "永久链接至目标")

一个防止release() 被调用太多次的信号量.

如果 [`release`](#tornado.locks.BoundedSemaphore.release "tornado.locks.BoundedSemaphore.release") 增加信号量的值超过初始值, 它将抛出 [`ValueError`](https://docs.python.org/3.4/library/exceptions.html#ValueError "(在 Python v3.4)"). 信号量通常是通过限制容量来保护资源, 所以一个信号量释放太多次是 一个错误的标志.

`release`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#BoundedSemaphore.release)[¶](#tornado.locks.BoundedSemaphore.release "永久链接至目标")

增加counter 并且唤醒一个waiter.

`acquire`(_timeout=None_)[¶](#tornado.locks.BoundedSemaphore.acquire "永久链接至目标")

递减计数器. 返回一个 Future 对象.

如果计数器(counter)为0将会阻塞, 等待 [`release`](#tornado.locks.BoundedSemaphore.release "tornado.locks.BoundedSemaphore.release"). 在超时之后 Future 对象将会抛出 [`TimeoutError`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.TimeoutError "tornado.gen.TimeoutError") .

## Lock[¶](#lock "永久链接至标题")

_class_ `tornado.locks.``Lock`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Lock)[¶](#tornado.locks.Lock "永久链接至目标")

协程的锁.

一个Lock开始解锁, 然后它立即 [`acquire`](#tornado.locks.Lock.acquire "tornado.locks.Lock.acquire") 锁. 虽然它是锁着的, 一个协程yield [`acquire`](#tornado.locks.Lock.acquire "tornado.locks.Lock.acquire") 并等待, 直到另一个协程调用 [`release`](#tornado.locks.Lock.release "tornado.locks.Lock.release").

释放一个没锁住的锁将抛出 [`RuntimeError`](https://docs.python.org/3.4/library/exceptions.html#RuntimeError "(在 Python v3.4)").

在所有Python 版本中 [`acquire`](#tornado.locks.Lock.acquire "tornado.locks.Lock.acquire") 支持上下文管理协议:

\>>> from tornado import gen, locks
\>>> lock \= locks.Lock()
\>>>
\>>> @gen.coroutine
... def f():
...    with (yield lock.acquire()):
...        \# Do something holding the lock.
...        pass
...
...    \# Now the lock is released.

在Python 3.5, [`Lock`](#tornado.locks.Lock "tornado.locks.Lock") 也支持异步上下文管理协议(async context manager protocol). 注意在这种情况下没有 [`acquire`](#tornado.locks.Lock.acquire "tornado.locks.Lock.acquire"), 因为 `async with` 同时包含 `yield` 和 `acquire` (就像 [`threading.Lock`](https://docs.python.org/3.4/library/threading.html#threading.Lock "(在 Python v3.4)")):

\>>> async def f():  
...    async with lock:
...        \# Do something holding the lock.
...        pass
...
...    \# Now the lock is released.

在 3.5 版更改: 添加Python 3.5 的 `async with` 支持.

`acquire`(_timeout=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Lock.acquire)[¶](#tornado.locks.Lock.acquire "永久链接至目标")

尝试锁. 返回一个Future 对象.

返回一个Future 对象, 在超时之后将抛出 [`tornado.gen.TimeoutError`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.TimeoutError "tornado.gen.TimeoutError") .

`release`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locks.html#Lock.release)[¶](#tornado.locks.Lock.release "永久链接至目标")

Unlock.

在队列中等待 [`acquire`](#tornado.locks.Lock.acquire "tornado.locks.Lock.acquire") 的第一个 coroutine 获得锁.

如果没有锁, 将抛出 [`RuntimeError`](https://docs.python.org/3.4/library/exceptions.html#RuntimeError "(在 Python v3.4)").
