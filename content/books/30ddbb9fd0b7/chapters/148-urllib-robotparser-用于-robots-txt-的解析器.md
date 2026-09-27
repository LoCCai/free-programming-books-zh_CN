**源代码：** [Lib/urllib/robotparser.py](https://github.com/python/cpython/tree/3.14/Lib/urllib/robotparser.py)

* * *

此模块提供了一个单独的类 [`RobotFileParser`](#urllib.robotparser.RobotFileParser "urllib.robotparser.RobotFileParser")，它可以回答有关某个特定用户代理能否在发布了 `robots.txt` 文件的网站上获取某个 URL 的问题。 有关 `robots.txt` 文件结构的更多细节，请参阅 [**RFC 9309**](https://datatracker.ietf.org/doc/html/rfc9309.html)。

_class_ urllib.robotparser.RobotFileParser(_url\=''_)[¶](#urllib.robotparser.RobotFileParser "Link to this definition")

这个类提供了一些可以读取、解析和回答关于 _url_ 上的 `robots.txt` 文件的问题的方法。

set\_url(_url_)[¶](#urllib.robotparser.RobotFileParser.set_url "Link to this definition")

设置指向 `robots.txt` 文件的 URL。

read()[¶](#urllib.robotparser.RobotFileParser.read "Link to this definition")

读取 `robots.txt` URL 并将其输入解析器。

parse(_lines_)[¶](#urllib.robotparser.RobotFileParser.parse "Link to this definition")

解析行参数。

can\_fetch(_useragent_, _url_)[¶](#urllib.robotparser.RobotFileParser.can_fetch "Link to this definition")

如果允许 _useragent_ 按照被解析 `robots.txt` 文件中的规则来获取 _url_ 则返回 `True`。

mtime()[¶](#urllib.robotparser.RobotFileParser.mtime "Link to this definition")

返回最近一次获取 `robots.txt` 文件的时间。 这适用于需要定期检查 `robots.txt` 文件更新情况的长时间运行的网页爬虫。

modified()[¶](#urllib.robotparser.RobotFileParser.modified "Link to this definition")

将最近一次获取 `robots.txt` 文件的时间设置为当前时间。

crawl\_delay(_useragent_)[¶](#urllib.robotparser.RobotFileParser.crawl_delay "Link to this definition")

为指定的 _useragent_ 从 `robots.txt` 返回 `Crawl-delay` 参数的值。 如果此参数不存在或不适用于指定的 _useragent_ 或者此参数的 `robots.txt` 条目存在语法错误，则返回 `None`。

Added in version 3.6.

request\_rate(_useragent_)[¶](#urllib.robotparser.RobotFileParser.request_rate "Link to this definition")

以 [named tuple](https://docs.python.org/zh-cn/3/glossary.html#term-named-tuple) `RequestRate(requests, seconds)` 的形式从 `robots.txt` 返回 `Request-rate` 参数的内容。 如果此参数不存在或不适用于指定的 _useragent_ 或者此参数的 `robots.txt` 条目存在语法错误，则返回 `None`。

Added in version 3.6.

site\_maps()[¶](#urllib.robotparser.RobotFileParser.site_maps "Link to this definition")

以 [`list()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 的形式从 `robots.txt` 返回 `Sitemap` 参数的内容。 如果此参数不存在或者此参数的 `robots.txt` 条目存在语法错误，则返回 `None`。

Added in version 3.8.

下面的例子演示了 [`RobotFileParser`](#urllib.robotparser.RobotFileParser "urllib.robotparser.RobotFileParser") 类的基本用法:

\>>> import urllib.robotparser
\>>> rp \= urllib.robotparser.RobotFileParser()
\>>> rp.set\_url("http://www.pythontest.net/robots.txt")
\>>> rp.read()
\>>> rrate \= rp.request\_rate("\*")
\>>> rrate.requests
1
\>>> rrate.seconds
1
\>>> rp.crawl\_delay("\*")
6
\>>> rp.can\_fetch("\*", "http://www.pythontest.net/")
True
\>>> rp.can\_fetch("\*", "http://www.pythontest.net/no-robots-here/")
False
