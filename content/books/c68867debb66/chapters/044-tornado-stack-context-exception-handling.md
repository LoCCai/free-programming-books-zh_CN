[`StackContext`](#tornado.stack_context.StackContext "tornado.stack_context.StackContext") allows applications to maintain threadlocal-like state that follows execution as it moves to other execution contexts.

The motivating examples are to eliminate the need for explicit `async_callback` wrappers (as in [`tornado.web.RequestHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler "tornado.web.RequestHandler")), and to allow some additional context to be kept for logging.

This is slightly magic, but it’s an extension of the idea that an exception handler is a kind of stack-local state and when that stack is suspended and resumed in a new context that state needs to be preserved. [`StackContext`](#tornado.stack_context.StackContext "tornado.stack_context.StackContext") shifts the burden of restoring that state from each call site (e.g. wrapping each [`AsyncHTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") callback in `async_callback`) to the mechanisms that transfer control from one context to another (e.g. [`AsyncHTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient") itself, [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), thread pools, etc).

Example usage:

@contextlib.contextmanager
def die\_on\_error():
    try:
        yield
    except Exception:
        logging.error("exception in asynchronous operation",exc\_info\=True)
        sys.exit(1)

with StackContext(die\_on\_error):
    \# Any exception thrown here \*or in callback and its descendants\*
    \# will cause the process to exit instead of spinning endlessly
    \# in the ioloop.
    http\_client.fetch(url, callback)
ioloop.start()

Most applications shouldn’t have to work with [`StackContext`](#tornado.stack_context.StackContext "tornado.stack_context.StackContext") directly. Here are a few rules of thumb for when it’s necessary:

-   If you’re writing an asynchronous library that doesn’t rely on a stack\_context-aware library like [`tornado.ioloop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#module-tornado.ioloop "tornado.ioloop") or [`tornado.iostream`](https://tornado-zh.readthedocs.io/zh/latest/iostream.html#module-tornado.iostream "tornado.iostream") (for example, if you’re writing a thread pool), use [`stack_context.wrap()`](#tornado.stack_context.wrap "tornado.stack_context.wrap") before any asynchronous operations to capture the stack context from where the operation was started.
-   If you’re writing an asynchronous library that has some shared resources (such as a connection pool), create those shared resources within a `with stack_context.NullContext():` block. This will prevent `StackContexts` from leaking from one request to another.
-   If you want to write something like an exception handler that will persist across asynchronous calls, create a new [`StackContext`](#tornado.stack_context.StackContext "tornado.stack_context.StackContext") (or [`ExceptionStackContext`](#tornado.stack_context.ExceptionStackContext "tornado.stack_context.ExceptionStackContext")), and make your asynchronous calls in a `with` block that references your [`StackContext`](#tornado.stack_context.StackContext "tornado.stack_context.StackContext").

_class_ `tornado.stack_context.``StackContext`(_context\_factory_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/stack_context.html#StackContext)[¶](#tornado.stack_context.StackContext "永久链接至目标")

Establishes the given context as a StackContext that will be transferred.

Note that the parameter is a callable that returns a context manager, not the context itself. That is, where for a non-transferable context manager you would say:

with my\_context():

StackContext takes the function itself rather than its result:

with StackContext(my\_context):

The result of `with StackContext() as cb:` is a deactivation callback. Run this callback when the StackContext is no longer needed to ensure that it is not propagated any further (note that deactivating a context does not affect any instances of that context that are currently pending). This is an advanced feature and not necessary in most applications.

_class_ `tornado.stack_context.``ExceptionStackContext`(_exception\_handler_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/stack_context.html#ExceptionStackContext)[¶](#tornado.stack_context.ExceptionStackContext "永久链接至目标")

Specialization of StackContext for exception handling.

The supplied `exception_handler` function will be called in the event of an uncaught exception in this context. The semantics are similar to a try/finally clause, and intended use cases are to log an error, close a socket, or similar cleanup actions. The `exc_info` triple `(type, value, traceback)` will be passed to the exception\_handler function.

If the exception handler returns true, the exception will be consumed and will not be propagated to other exception handlers.

_class_ `tornado.stack_context.``NullContext`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/stack_context.html#NullContext)[¶](#tornado.stack_context.NullContext "永久链接至目标")

Resets the [`StackContext`](#tornado.stack_context.StackContext "tornado.stack_context.StackContext").

Useful when creating a shared resource on demand (e.g. an [`AsyncHTTPClient`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient "tornado.httpclient.AsyncHTTPClient")) where the stack that caused the creating is not relevant to future operations.

`tornado.stack_context.``wrap`(_fn_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/stack_context.html#wrap)[¶](#tornado.stack_context.wrap "永久链接至目标")

Returns a callable object that will restore the current [`StackContext`](#tornado.stack_context.StackContext "tornado.stack_context.StackContext") when executed.

Use this whenever saving a callback to be executed later in a different execution context (either in a different thread or asynchronously in the same thread).

`tornado.stack_context.``run_with_stack_context`(_context_, _func_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/stack_context.html#run_with_stack_context)[¶](#tornado.stack_context.run_with_stack_context "永久链接至目标")

Run a coroutine `func` in the given [`StackContext`](#tornado.stack_context.StackContext "tornado.stack_context.StackContext").

It is not safe to have a `yield` statement within a `with StackContext` block, so it is difficult to use stack context with [`gen.coroutine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.coroutine "tornado.gen.coroutine"). This helper function runs the function in the correct context while keeping the `yield` and `with` statements syntactically separate.

Example:

@gen.coroutine
def incorrect():
    with StackContext(ctx):
        \# ERROR: this will raise StackContextInconsistentError
        yield other\_coroutine()

@gen.coroutine
def correct():
    yield run\_with\_stack\_context(StackContext(ctx), other\_coroutine)

3.1 新版功能.
