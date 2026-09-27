Bridges between the [`asyncio`](https://docs.python.org/3.4/library/asyncio.html#module-asyncio "(在 Python v3.4)") module and Tornado IOLoop.

3.2 新版功能.

This module integrates Tornado with the `asyncio` module introduced in Python 3.4 (and available [as a separate download](https://pypi.python.org/pypi/asyncio) for Python 3.3). This makes it possible to combine the two libraries on the same event loop.

Most applications should use [`AsyncIOMainLoop`](#tornado.platform.asyncio.AsyncIOMainLoop "tornado.platform.asyncio.AsyncIOMainLoop") to run Tornado on the default `asyncio` event loop. Applications that need to run event loops on multiple threads may use [`AsyncIOLoop`](#tornado.platform.asyncio.AsyncIOLoop "tornado.platform.asyncio.AsyncIOLoop") to create multiple loops.

_class_ `tornado.platform.asyncio.``AsyncIOMainLoop`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/platform/asyncio.html#AsyncIOMainLoop)[¶](#tornado.platform.asyncio.AsyncIOMainLoop "永久链接至目标")

`AsyncIOMainLoop` creates an [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") that corresponds to the current `asyncio` event loop (i.e. the one returned by `asyncio.get_event_loop()`). Recommended usage:

from tornado.platform.asyncio import AsyncIOMainLoop
import asyncio
AsyncIOMainLoop().install()
asyncio.get\_event\_loop().run\_forever()

_class_ `tornado.platform.asyncio.``AsyncIOLoop`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/platform/asyncio.html#AsyncIOLoop)[¶](#tornado.platform.asyncio.AsyncIOLoop "永久链接至目标")

`AsyncIOLoop` is an [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") that runs on an `asyncio` event loop. This class follows the usual Tornado semantics for creating new `IOLoops`; these loops are not necessarily related to the `asyncio` default event loop. Recommended usage:

from tornado.ioloop import IOLoop
IOLoop.configure('tornado.platform.asyncio.AsyncIOLoop')
IOLoop.current().start()

Each `AsyncIOLoop` creates a new `asyncio.EventLoop`; this object can be accessed with the `asyncio_loop` attribute.

`tornado.platform.asyncio.``to_tornado_future`(_asyncio\_future_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/platform/asyncio.html#to_tornado_future)[¶](#tornado.platform.asyncio.to_tornado_future "永久链接至目标")

Convert an [`asyncio.Future`](https://docs.python.org/3.4/library/asyncio-task.html#asyncio.Future "(在 Python v3.4)") to a [`tornado.concurrent.Future`](https://tornado-zh.readthedocs.io/zh/latest/concurrent.html#tornado.concurrent.Future "tornado.concurrent.Future").

4.1 新版功能.

`tornado.platform.asyncio.``to_asyncio_future`(_tornado\_future_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/platform/asyncio.html#to_asyncio_future)[¶](#tornado.platform.asyncio.to_asyncio_future "永久链接至目标")

Convert a Tornado yieldable object to an [`asyncio.Future`](https://docs.python.org/3.4/library/asyncio-task.html#asyncio.Future "(在 Python v3.4)").

4.1 新版功能.
