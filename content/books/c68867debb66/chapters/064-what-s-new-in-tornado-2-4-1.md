-   [Docs](https://tornado-zh.readthedocs.io/zh/latest/index.html) »
-   [版本记录](https://tornado-zh.readthedocs.io/zh/latest/releases.html) »
-   What’s new in Tornado 2.4.1
-   [Edit on GitHub](https://github.com/tao12345666333/tornado-zh/blob/master/docs/releases/v2.4.1.rst)

* * *

## Nov 24, 2012[¶](#nov-24-2012 "永久链接至标题")

### Bug fixes[¶](#bug-fixes "永久链接至标题")

-   Fixed a memory leak in [`tornado.stack_context`](https://tornado-zh.readthedocs.io/zh/latest/stack_context.html#module-tornado.stack_context "tornado.stack_context") that was especially likely with long-running `@gen.engine` functions.
-   [`tornado.auth.TwitterMixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.TwitterMixin "tornado.auth.TwitterMixin") now works on Python 3.
-   Fixed a bug in which `IOStream.read_until_close` with a streaming callback would sometimes pass the last chunk of data to the final callback instead of the streaming callback.
