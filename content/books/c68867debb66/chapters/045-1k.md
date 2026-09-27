Support classes for automated testing.

-   [`AsyncTestCase`](#tornado.testing.AsyncTestCase "tornado.testing.AsyncTestCase") and [`AsyncHTTPTestCase`](#tornado.testing.AsyncHTTPTestCase "tornado.testing.AsyncHTTPTestCase"): Subclasses of unittest.TestCase with additional support for testing asynchronous ([`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") based) code.
-   [`ExpectLog`](#tornado.testing.ExpectLog "tornado.testing.ExpectLog") and [`LogTrapTestCase`](#tornado.testing.LogTrapTestCase "tornado.testing.LogTrapTestCase"): Make test logs less spammy.
-   [`main()`](#tornado.testing.main "tornado.testing.main"): A simple test runner (wrapper around unittest.main()) with support for the tornado.autoreload module to rerun the tests when code changes.

## Asynchronous test cases[¶](#asynchronous-test-cases "永久链接至标题")

_class_ `tornado.testing.``AsyncTestCase`(_methodName='runTest'_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#AsyncTestCase)[¶](#tornado.testing.AsyncTestCase "永久链接至目标")

[`TestCase`](https://docs.python.org/3.4/library/unittest.html#unittest.TestCase "(在 Python v3.4)") subclass for testing [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop")\-based asynchronous code.

The unittest framework is synchronous, so the test must be complete by the time the test method returns. This means that asynchronous code cannot be used in quite the same way as usual. To write test functions that use the same `yield`\-based patterns used with the [`tornado.gen`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#module-tornado.gen "tornado.gen") module, decorate your test methods with [`tornado.testing.gen_test`](#tornado.testing.gen_test "tornado.testing.gen_test") instead of [`tornado.gen.coroutine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.coroutine "tornado.gen.coroutine"). This class also provides the [`stop()`](#tornado.testing.AsyncTestCase.stop "tornado.testing.AsyncTestCase.stop") and [`wait()`](#tornado.testing.AsyncTestCase.wait "tornado.testing.AsyncTestCase.wait") methods for a more manual style of testing. The test method itself must call `self.wait()`, and asynchronous callbacks should call `self.stop()` to signal completion.

By default, a new [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") is constructed for each test and is available as `self.io_loop`. This [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") should be used in the construction of HTTP clients/servers, etc. If the code being tested requires a global [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), subclasses should override [`get_new_ioloop`](#tornado.testing.AsyncTestCase.get_new_ioloop "tornado.testing.AsyncTestCase.get_new_ioloop") to return it.

The [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop")‘s `start` and `stop` methods should not be called directly. Instead, use [`self.stop`](#tornado.testing.AsyncTestCase.stop "tornado.testing.AsyncTestCase.stop") and [`self.wait`](#tornado.testing.AsyncTestCase.wait "tornado.testing.AsyncTestCase.wait"). Arguments passed to `self.stop` are returned from `self.wait`. It is possible to have multiple `wait`/`stop` cycles in the same test.

Example:

\# This test uses coroutine style.
class MyTestCase(AsyncTestCase):
    @tornado.testing.gen\_test
    def test\_http\_fetch(self):
        client \= AsyncHTTPClient(self.io\_loop)
        response \= yield client.fetch("http://www.tornadoweb.org")
        \# Test contents of response
        self.assertIn("FriendFeed", response.body)

\# This test uses argument passing between self.stop and self.wait.
class MyTestCase2(AsyncTestCase):
    def test\_http\_fetch(self):
        client \= AsyncHTTPClient(self.io\_loop)
        client.fetch("http://www.tornadoweb.org/", self.stop)
        response \= self.wait()
        \# Test contents of response
        self.assertIn("FriendFeed", response.body)

\# This test uses an explicit callback-based style.
class MyTestCase3(AsyncTestCase):
    def test\_http\_fetch(self):
        client \= AsyncHTTPClient(self.io\_loop)
        client.fetch("http://www.tornadoweb.org/", self.handle\_fetch)
        self.wait()

    def handle\_fetch(self, response):
        \# Test contents of response (failures and exceptions here
        \# will cause self.wait() to throw an exception and end the
        \# test).
        \# Exceptions thrown here are magically propagated to
        \# self.wait() in test\_http\_fetch() via stack\_context.
        self.assertIn("FriendFeed", response.body)
        self.stop()

`get_new_ioloop`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#AsyncTestCase.get_new_ioloop)[¶](#tornado.testing.AsyncTestCase.get_new_ioloop "永久链接至目标")

Creates a new [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") for this test. May be overridden in subclasses for tests that require a specific [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") (usually the singleton [`IOLoop.instance()`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop.instance "tornado.ioloop.IOLoop.instance")).

`stop`(_\_arg=None_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#AsyncTestCase.stop)[¶](#tornado.testing.AsyncTestCase.stop "永久链接至目标")

Stops the [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), causing one pending (or future) call to [`wait()`](#tornado.testing.AsyncTestCase.wait "tornado.testing.AsyncTestCase.wait") to return.

Keyword arguments or a single positional argument passed to [`stop()`](#tornado.testing.AsyncTestCase.stop "tornado.testing.AsyncTestCase.stop") are saved and will be returned by [`wait()`](#tornado.testing.AsyncTestCase.wait "tornado.testing.AsyncTestCase.wait").

`wait`(_condition=None_, _timeout=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#AsyncTestCase.wait)[¶](#tornado.testing.AsyncTestCase.wait "永久链接至目标")

Runs the [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") until stop is called or timeout has passed.

In the event of a timeout, an exception will be thrown. The default timeout is 5 seconds; it may be overridden with a `timeout` keyword argument or globally with the `ASYNC_TEST_TIMEOUT` environment variable.

If `condition` is not None, the [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") will be restarted after [`stop()`](#tornado.testing.AsyncTestCase.stop "tornado.testing.AsyncTestCase.stop") until `condition()` returns true.

在 3.1 版更改: Added the `ASYNC_TEST_TIMEOUT` environment variable.

_class_ `tornado.testing.``AsyncHTTPTestCase`(_methodName='runTest'_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#AsyncHTTPTestCase)[¶](#tornado.testing.AsyncHTTPTestCase "永久链接至目标")

A test case that starts up an HTTP server.

Subclasses must override [`get_app()`](#tornado.testing.AsyncHTTPTestCase.get_app "tornado.testing.AsyncHTTPTestCase.get_app"), which returns the [`tornado.web.Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") (or other [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") callback) to be tested. Tests will typically use the provided `self.http_client` to fetch URLs from this server.

Example, assuming the “Hello, world” example from the user guide is in `hello.py`:

import hello

class TestHelloApp(AsyncHTTPTestCase):
    def get\_app(self):
        return hello.make\_app()

    def test\_homepage(self):
        response \= self.fetch('/')
        self.assertEqual(response.code, 200)
        self.assertEqual(response.body, 'Hello, world')

That call to `self.fetch()` is equivalent to

self.http\_client.fetch(self.get\_url('/'), self.stop)
response \= self.wait()

which illustrates how AsyncTestCase can turn an asynchronous operation, like `http_client.fetch()`, into a synchronous operation. If you need to do other asynchronous operations in tests, you’ll probably need to use `stop()` and `wait()` yourself.

`get_app`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#AsyncHTTPTestCase.get_app)[¶](#tornado.testing.AsyncHTTPTestCase.get_app "永久链接至目标")

Should be overridden by subclasses to return a [`tornado.web.Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") or other [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer") callback.

`fetch`(_path_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#AsyncHTTPTestCase.fetch)[¶](#tornado.testing.AsyncHTTPTestCase.fetch "永久链接至目标")

Convenience method to synchronously fetch a url.

The given path will be appended to the local server’s host and port. Any additional kwargs will be passed directly to [`AsyncHTTPClient.fetch`](https://tornado-zh.readthedocs.io/zh/latest/httpclient.html#tornado.httpclient.AsyncHTTPClient.fetch "tornado.httpclient.AsyncHTTPClient.fetch") (and so could be used to pass `method="POST"`, `body="..."`, etc).

`get_httpserver_options`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#AsyncHTTPTestCase.get_httpserver_options)[¶](#tornado.testing.AsyncHTTPTestCase.get_httpserver_options "永久链接至目标")

May be overridden by subclasses to return additional keyword arguments for the server.

`get_http_port`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#AsyncHTTPTestCase.get_http_port)[¶](#tornado.testing.AsyncHTTPTestCase.get_http_port "永久链接至目标")

Returns the port used by the server.

A new port is chosen for each test.

`get_url`(_path_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#AsyncHTTPTestCase.get_url)[¶](#tornado.testing.AsyncHTTPTestCase.get_url "永久链接至目标")

Returns an absolute url for the given path on the test server.

_class_ `tornado.testing.``AsyncHTTPSTestCase`(_methodName='runTest'_, _\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#AsyncHTTPSTestCase)[¶](#tornado.testing.AsyncHTTPSTestCase "永久链接至目标")

A test case that starts an HTTPS server.

Interface is generally the same as [`AsyncHTTPTestCase`](#tornado.testing.AsyncHTTPTestCase "tornado.testing.AsyncHTTPTestCase").

`get_ssl_options`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#AsyncHTTPSTestCase.get_ssl_options)[¶](#tornado.testing.AsyncHTTPSTestCase.get_ssl_options "永久链接至目标")

May be overridden by subclasses to select SSL options.

By default includes a self-signed testing certificate.

`tornado.testing.``gen_test`(_func=None_, _timeout=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#gen_test)[¶](#tornado.testing.gen_test "永久链接至目标")

Testing equivalent of `@gen.coroutine`, to be applied to test methods.

`@gen.coroutine` cannot be used on tests because the [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop") is not already running. `@gen_test` should be applied to test methods on subclasses of [`AsyncTestCase`](#tornado.testing.AsyncTestCase "tornado.testing.AsyncTestCase").

Example:

class MyTest(AsyncHTTPTestCase):
    @gen\_test
    def test\_something(self):
        response \= yield gen.Task(self.fetch('/'))

By default, `@gen_test` times out after 5 seconds. The timeout may be overridden globally with the `ASYNC_TEST_TIMEOUT` environment variable, or for each test with the `timeout` keyword argument:

class MyTest(AsyncHTTPTestCase):
    @gen\_test(timeout\=10)
    def test\_something\_slow(self):
        response \= yield gen.Task(self.fetch('/'))

3.1 新版功能: The `timeout` argument and `ASYNC_TEST_TIMEOUT` environment variable.

在 4.0 版更改: The wrapper now passes along `*args, **kwargs` so it can be used on functions with arguments.

## Controlling log output[¶](#controlling-log-output "永久链接至标题")

_class_ `tornado.testing.``ExpectLog`(_logger_, _regex_, _required=True_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#ExpectLog)[¶](#tornado.testing.ExpectLog "永久链接至目标")

Context manager to capture and suppress expected log output.

Useful to make tests of error conditions less noisy, while still leaving unexpected log entries visible. _Not thread safe._

The attribute `logged_stack` is set to true if any exception stack trace was logged.

Usage:

with ExpectLog('tornado.application', "Uncaught exception"):
    error\_response \= self.fetch("/some\_page")

在 4.3 版更改: Added the `logged_stack` attribute.

Constructs an ExpectLog context manager.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>logger</strong> – Logger object (or name of logger) to watch. Pass an empty string to watch the root logger.</li><li><strong>regex</strong> – Regular expression to match. Any log entries on the specified logger that match this regex will be suppressed.</li><li><strong>required</strong> – If true, an exeption will be raised if the end of the <code><span>with</span></code> statement is reached without matching any log entries.</li></ul></td></tr></tbody></table>

_class_ `tornado.testing.``LogTrapTestCase`(_methodName='runTest'_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#LogTrapTestCase)[¶](#tornado.testing.LogTrapTestCase "永久链接至目标")

A test case that captures and discards all logging output if the test passes.

Some libraries can produce a lot of logging output even when the test succeeds, so this class can be useful to minimize the noise. Simply use it as a base class for your test case. It is safe to combine with AsyncTestCase via multiple inheritance (`class MyTestCase(AsyncHTTPTestCase, LogTrapTestCase):`)

This class assumes that only one log handler is configured and that it is a [`StreamHandler`](https://docs.python.org/3.4/library/logging.handlers.html#logging.StreamHandler "(在 Python v3.4)"). This is true for both [`logging.basicConfig`](https://docs.python.org/3.4/library/logging.html#logging.basicConfig "(在 Python v3.4)") and the “pretty logging” configured by [`tornado.options`](https://tornado-zh.readthedocs.io/zh/latest/options.html#module-tornado.options "tornado.options"). It is not compatible with other log buffering mechanisms, such as those provided by some test runners.

4.1 版后已移除: Use the unittest module’s `--buffer` option instead, or [`ExpectLog`](#tornado.testing.ExpectLog "tornado.testing.ExpectLog").

Create an instance of the class that will use the named test method when executed. Raises a ValueError if the instance does not have a method with the specified name.

## Test runner[¶](#test-runner "永久链接至标题")

`tornado.testing.``main`(_\*\*kwargs_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#main)[¶](#tornado.testing.main "永久链接至目标")

A simple test runner.

This test runner is essentially equivalent to [`unittest.main`](https://docs.python.org/3.4/library/unittest.html#unittest.main "(在 Python v3.4)") from the standard library, but adds support for tornado-style option parsing and log formatting.

The easiest way to run a test is via the command line:

python \-m tornado.testing tornado.test.stack\_context\_test

See the standard library unittest module for ways in which tests can be specified.

Projects with many tests may wish to define a test script like `tornado/test/runtests.py`. This script should define a method `all()` which returns a test suite and then call [`tornado.testing.main()`](#tornado.testing.main "tornado.testing.main"). Note that even when a test script is used, the `all()` test suite may be overridden by naming a single test on the command line:

\# Runs all tests
python \-m tornado.test.runtests
\# Runs one test
python \-m tornado.test.runtests tornado.test.stack\_context\_test

Additional keyword arguments passed through to `unittest.main()`. For example, use `tornado.testing.main(verbosity=2)` to show many test details as they are run. See [http://docs.python.org/library/unittest.html#unittest.main](http://docs.python.org/library/unittest.html#unittest.main) for full argument list.

## Helper functions[¶](#helper-functions "永久链接至标题")

`tornado.testing.``bind_unused_port`(_reuse\_port=False_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#bind_unused_port)[¶](#tornado.testing.bind_unused_port "永久链接至目标")

Binds a server socket to an available port on localhost.

Returns a tuple (socket, port).

`tornado.testing.``get_unused_port`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#get_unused_port)[¶](#tornado.testing.get_unused_port "永久链接至目标")

Returns a (hopefully) unused port number.

This function does not guarantee that the port it returns is available, only that a series of get\_unused\_port calls in a single process return distinct ports.

Use 版后已移除: bind\_unused\_port instead, which is guaranteed to find an unused port.

`tornado.testing.``get_async_test_timeout`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/testing.html#get_async_test_timeout)[¶](#tornado.testing.get_async_test_timeout "永久链接至目标")

Get the global timeout setting for async tests.

Returns a float, the timeout in seconds.

3.1 新版功能.
