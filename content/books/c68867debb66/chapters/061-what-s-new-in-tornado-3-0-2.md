-   [Docs](https://tornado-zh.readthedocs.io/zh/latest/index.html) »
-   [版本记录](https://tornado-zh.readthedocs.io/zh/latest/releases.html) »
-   What’s new in Tornado 3.0.2
-   [Edit on GitHub](https://github.com/tao12345666333/tornado-zh/blob/master/docs/releases/v3.0.2.rst)

* * *

## Jun 2, 2013[¶](#jun-2-2013 "永久链接至标题")

-   [`tornado.auth.TwitterMixin`](https://tornado-zh.readthedocs.io/zh/latest/auth.html#tornado.auth.TwitterMixin "tornado.auth.TwitterMixin") now defaults to version 1.1 of the Twitter API, instead of version 1.0 which is being [discontinued on June 11](https://dev.twitter.com/calendar). It also now uses HTTPS when talking to Twitter.
-   Fixed a potential memory leak with a long chain of [`gen.coroutine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.coroutine "tornado.gen.coroutine") or [`gen.engine`](https://tornado-zh.readthedocs.io/zh/latest/gen.html#tornado.gen.engine "tornado.gen.engine") functions.
