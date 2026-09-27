-   [Docs](https://tornado-zh.readthedocs.io/zh/latest/index.html) »
-   [版本记录](https://tornado-zh.readthedocs.io/zh/latest/releases.html) »
-   What’s new in Tornado 4.2.1
-   [Edit on GitHub](https://github.com/tao12345666333/tornado-zh/blob/master/docs/releases/v4.2.1.rst)

* * *

## Jul 17, 2015[¶](#jul-17-2015 "永久链接至标题")

### Security fix[¶](#security-fix "永久链接至标题")

-   This release fixes a path traversal vulnerability in [`StaticFileHandler`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.StaticFileHandler "tornado.web.StaticFileHandler"), in which files whose names _started with_ the `static_path` directory but were not actually _in_ that directory could be accessed.
