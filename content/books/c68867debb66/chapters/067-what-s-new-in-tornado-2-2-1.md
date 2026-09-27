-   [Docs](https://tornado-zh.readthedocs.io/zh/latest/index.html) »
-   [版本记录](https://tornado-zh.readthedocs.io/zh/latest/releases.html) »
-   What’s new in Tornado 2.2.1
-   [Edit on GitHub](https://github.com/tao12345666333/tornado-zh/blob/master/docs/releases/v2.2.1.rst)

* * *

## Apr 23, 2012[¶](#apr-23-2012 "永久链接至标题")

### Security fixes[¶](#security-fixes "永久链接至标题")

-   [`tornado.web.RequestHandler.set_header`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.set_header "tornado.web.RequestHandler.set_header") now properly sanitizes input values to protect against header injection, response splitting, etc. (it has always attempted to do this, but the check was incorrect). Note that redirects, the most likely source of such bugs, are protected by a separate check in [`RequestHandler.redirect`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.RequestHandler.redirect "tornado.web.RequestHandler.redirect").

### Bug fixes[¶](#bug-fixes "永久链接至标题")

-   Colored logging configuration in [`tornado.options`](https://tornado-zh.readthedocs.io/zh/latest/options.html#module-tornado.options "tornado.options") is compatible with Python 3.2.3 (and 3.3).
