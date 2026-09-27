4.2 新版功能.

## Classes[¶](#classes "永久链接至标题")

### Queue[¶](#queue "永久链接至标题")

_class_ `tornado.queues.``Queue`(_maxsize=0_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/queues.html#Queue)[¶](#tornado.queues.Queue "永久链接至目标")

协调生产者消费者协程.

如果maxsize 是0(默认配置)意味着队列的大小是无限的.

from tornado import gen
from tornado.ioloop import IOLoop
from tornado.queues import Queue

q \= Queue(maxsize\=2)

@gen.coroutine
def consumer():
    while True:
        item \= yield q.get()
        try:
            print('Doing work on %s' % item)
            yield gen.sleep(0.01)
        finally:
            q.task\_done()

@gen.coroutine
def producer():
    for item in range(5):
        yield q.put(item)
        print('Put %s' % item)

@gen.coroutine
def main():
    \# Start consumer without waiting (since it never finishes).
    IOLoop.current().spawn\_callback(consumer)
    yield producer()     \# Wait for producer to put all tasks.
    yield q.join()       \# Wait for consumer to finish all tasks.
    print('Done')

IOLoop.current().run\_sync(main)

Put 0
Put 1
Doing work on 0
Put 2
Doing work on 1
Put 3
Doing work on 2
Put 4
Doing work on 3
Doing work on 4
Done

在Python 3.5, [`Queue`](#tornado.queues.Queue "tornado.queues.Queue") 实现了异步迭代器协议, 所以 `consumer()` 可以被重写为:

async def consumer():
    async for item in q:
        try:
            print('Doing work on %s' % item)
            yield gen.sleep(0.01)
        finally:
            q.task\_done()

在 4.3 版更改: 为Python 3.5添加 `async for` 支持 in Python 3.5.

`maxsize`[¶](#tornado.queues.Queue.maxsize "永久链接至目标")

队列中允许的最大项目数.

`qsize`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/queues.html#Queue.qsize)[¶](#tornado.queues.Queue.qsize "永久链接至目标")

当前队列中的项目数.

`put`(_item_, _timeout=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/queues.html#Queue.put)[¶](#tornado.queues.Queue.put "永久链接至目标")

将一个项目放入队列中, 可能需要等待直到队列中有空间.

返回一个Future对象, 如果超时会抛出 [`tornado.gen.TimeoutError`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.TimeoutError "tornado.gen.TimeoutError") .

`put_nowait`(_item_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/queues.html#Queue.put_nowait)[¶](#tornado.queues.Queue.put_nowait "永久链接至目标")

非阻塞的将一个项目放入队列中.

如果没有立即可用的空闲插槽, 则抛出 [`QueueFull`](#tornado.queues.QueueFull "tornado.queues.QueueFull").

`get`(_timeout=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/queues.html#Queue.get)[¶](#tornado.queues.Queue.get "永久链接至目标")

从队列中删除并返回一个项目.

返回一个Future对象, 当项目可用时resolve, 或者在超时后抛出 [`tornado.gen.TimeoutError`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.TimeoutError "tornado.gen.TimeoutError") .

`get_nowait`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/queues.html#Queue.get_nowait)[¶](#tornado.queues.Queue.get_nowait "永久链接至目标")

非阻塞的从队列中删除并返回一个项目.

如果有项目是立即可用的则返回该项目, 否则抛出 [`QueueEmpty`](#tornado.queues.QueueEmpty "tornado.queues.QueueEmpty").

`task_done`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/queues.html#Queue.task_done)[¶](#tornado.queues.Queue.task_done "永久链接至目标")

表明前面排队的任务已经完成.

被消费者队列使用. 每个 [`get`](#tornado.queues.Queue.get "tornado.queues.Queue.get") 用来获取一个任务, 随后(subsequent) 调用 [`task_done`](#tornado.queues.Queue.task_done "tornado.queues.Queue.task_done") 告诉队列正在处理的任务已经完成.

如果 [`join`](#tornado.queues.Queue.join "tornado.queues.Queue.join") 正在阻塞, 它会在所有项目都被处理完后调起; 即当每个 [`put`](#tornado.queues.Queue.put "tornado.queues.Queue.put") 都被一个 [`task_done`](#tornado.queues.Queue.task_done "tornado.queues.Queue.task_done") 匹配.

如果调用次数超过 [`put`](#tornado.queues.Queue.put "tornado.queues.Queue.put") 将会抛出 [`ValueError`](https://docs.python.org/3.4/library/exceptions.html#ValueError "(在 Python v3.4)") .

`join`(_timeout=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/queues.html#Queue.join)[¶](#tornado.queues.Queue.join "永久链接至目标")

阻塞(block)直到队列中的所有项目都处理完.

返回一个Future对象, 超时后会抛出 [`tornado.gen.TimeoutError`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.TimeoutError "tornado.gen.TimeoutError") 异常.

### PriorityQueue[¶](#priorityqueue "永久链接至标题")

_class_ `tornado.queues.``PriorityQueue`(_maxsize=0_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/queues.html#PriorityQueue)[¶](#tornado.queues.PriorityQueue "永久链接至目标")

一个有优先级的 [`Queue`](#tornado.queues.Queue "tornado.queues.Queue") 最小的最优先.

写入的条目通常是元组, 类似 `(priority number, data)`.

from tornado.queues import PriorityQueue

q \= PriorityQueue()
q.put((1, 'medium-priority item'))
q.put((0, 'high-priority item'))
q.put((10, 'low-priority item'))

print(q.get\_nowait())
print(q.get\_nowait())
print(q.get\_nowait())

(0, 'high-priority item')
(1, 'medium-priority item')
(10, 'low-priority item')

### LifoQueue[¶](#lifoqueue "永久链接至标题")

_class_ `tornado.queues.``LifoQueue`(_maxsize=0_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/queues.html#LifoQueue)[¶](#tornado.queues.LifoQueue "永久链接至目标")

一个后进先出(Lifo)的 [`Queue`](#tornado.queues.Queue "tornado.queues.Queue").

from tornado.queues import LifoQueue

q \= LifoQueue()
q.put(3)
q.put(2)
q.put(1)

print(q.get\_nowait())
print(q.get\_nowait())
print(q.get\_nowait())

1
2
3

## Exceptions[¶](#exceptions "永久链接至标题")

### QueueEmpty[¶](#queueempty "永久链接至标题")

_exception_ `tornado.queues.``QueueEmpty`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/queues.html#QueueEmpty)[¶](#tornado.queues.QueueEmpty "永久链接至目标")

当队列中没有项目时, 由 [`Queue.get_nowait`](#tornado.queues.Queue.get_nowait "tornado.queues.Queue.get_nowait") 抛出.

### QueueFull[¶](#queuefull "永久链接至标题")

_exception_ `tornado.queues.``QueueFull`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/queues.html#QueueFull)[¶](#tornado.queues.QueueFull "永久链接至目标")

当队列为最大size时, 由 [`Queue.put_nowait`](#tornado.queues.Queue.put_nowait "tornado.queues.Queue.put_nowait") 抛出.
