## [`Queue`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue "tornado.queues.Queue") 示例 - 一个并发网络爬虫[¶](#queue "永久链接至标题")

Tornado的 [`tornado.queues`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#module-tornado.queues "tornado.queues") 模块实现了异步生产者/消费者模式的协程, 类似于 通过Python 标准库的 [`queue`](https://docs.python.org/3.4/library/queue.html#module-queue "(在 Python v3.4)") 实现线程模式.

一个yield [`Queue.get`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue.get "tornado.queues.Queue.get") 的协程直到队列中有值的时候才会暂停. 如果队列设置了最大长度 yield [`Queue.put`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue.put "tornado.queues.Queue.put") 的协程直到队列中有空间才会暂停.

一个 [`Queue`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue "tornado.queues.Queue") 从0开始对完成的任务进行计数. [`put`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue.put "tornado.queues.Queue.put") 加计数; [`task_done`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue.task_done "tornado.queues.Queue.task_done") 减少计数.

这里的网络爬虫的例子, 队列开始的时候只包含 base\_url. 当一个worker抓取到一个页面 它会解析链接并把它添加到队列中, 然后调用 [`task_done`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue.task_done "tornado.queues.Queue.task_done") 减少计数一次. 最后, 当一个worker抓取到的页面URL都是之前抓取到过的并且队列中没有任务了. 于是worker调用 [`task_done`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue.task_done "tornado.queues.Queue.task_done") 把计数减到0. 等待 [`join`](https://tornado-zh.readthedocs.io/zh/latest/queues.html#tornado.queues.Queue.join "tornado.queues.Queue.join") 的主协程取消暂停并且完成.

import time
from datetime import timedelta

try:
    from HTMLParser import HTMLParser
    from urlparse import urljoin, urldefrag
except ImportError:
    from html.parser import HTMLParser
    from urllib.parse import urljoin, urldefrag

from tornado import httpclient, gen, ioloop, queues

base\_url \= 'http://www.tornadoweb.org/en/stable/'
concurrency \= 10

@gen.coroutine
def get\_links\_from\_url(url):
    """Download the page at \`url\` and parse it for links.

    Returned links have had the fragment after \`#\` removed, and have been made
    absolute so, e.g. the URL 'gen.html#tornado.gen.coroutine' becomes
    'http://www.tornadoweb.org/en/stable/gen.html'.
    """
    try:
        response \= yield httpclient.AsyncHTTPClient().fetch(url)
        print('fetched %s' % url)

        html \= response.body if isinstance(response.body, str) \\
            else response.body.decode()
        urls \= \[urljoin(url, remove\_fragment(new\_url))
                for new\_url in get\_links(html)\]
    except Exception as e:
        print('Exception: %s %s' % (e, url))
        raise gen.Return(\[\])

    raise gen.Return(urls)

def remove\_fragment(url):
    pure\_url, frag \= urldefrag(url)
    return pure\_url

def get\_links(html):
    class URLSeeker(HTMLParser):
        def \_\_init\_\_(self):
            HTMLParser.\_\_init\_\_(self)
            self.urls \= \[\]

        def handle\_starttag(self, tag, attrs):
            href \= dict(attrs).get('href')
            if href and tag \== 'a':
                self.urls.append(href)

    url\_seeker \= URLSeeker()
    url\_seeker.feed(html)
    return url\_seeker.urls

@gen.coroutine
def main():
    q \= queues.Queue()
    start \= time.time()
    fetching, fetched \= set(), set()

    @gen.coroutine
    def fetch\_url():
        current\_url \= yield q.get()
        try:
            if current\_url in fetching:
                return

            print('fetching %s' % current\_url)
            fetching.add(current\_url)
            urls \= yield get\_links\_from\_url(current\_url)
            fetched.add(current\_url)

            for new\_url in urls:
                \# Only follow links beneath the base URL
                if new\_url.startswith(base\_url):
                    yield q.put(new\_url)

        finally:
            q.task\_done()

    @gen.coroutine
    def worker():
        while True:
            yield fetch\_url()

    q.put(base\_url)

    \# Start workers, then wait for the work queue to be empty.
    for \_ in range(concurrency):
        worker()
    yield q.join(timeout\=timedelta(seconds\=300))
    assert fetching \== fetched
    print('Done in %d seconds, fetched %s URLs.' % (
        time.time() \- start, len(fetched)))

if \_\_name\_\_ \== '\_\_main\_\_':
    import logging
    logging.basicConfig()
    io\_loop \= ioloop.IOLoop.current()
    io\_loop.run\_sync(main)
