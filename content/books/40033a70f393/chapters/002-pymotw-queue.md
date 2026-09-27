-   模块：Queue
-   目的：提供一个线程安全的FIFO功能.
-   python版本：1.4+

## 描述[¶](#id1 "Permalink to this headline")

Queue提供了FIFO功能, 一般常用于多线程编程, 它可以在生产者和消费者线程中安全的传递消息或者其他数据. 调用者会自动创建锁, 当使用Queue对象, 你可以根据需求创建多个线程. 一个Queue的大小(元素的个数)受可用内存的限制.

本文假设你已经了解基本的Queue特点, 如果你还不清楚, 可以阅读参考后继续后面内容:

-   [Queue data structures](http://en.wikipedia.org/wiki/Queue_%28data_structure)
-   [FIFO](http://en.wikipedia.org/wiki/FIFO)

## 示例[¶](#id2 "Permalink to this headline")

举例说明如何在多线程中使用Queue对象, 我们创建一个简单的 [podcasting](http://en.wikipedia.org/wiki/Podcasting) 客户端, 这个客户端读取一个或者多个RSS feeds, 依次将需下载的内容置于队列中, 然后采用多线程模式同时处理多个下载. 这比较简单, 也许没有多大实用价值, 但这个框架代码很好的说明了如何来利用Queue模块.

开始, 我们加载一些有用的模块:

from Queue import Queue

from threading import Thread
import time

import feedparser

首先, 需要创建一些运行参数, 通常这些来自用户输入(可以任何东西, 比如参数, 数据库), 在我们的例子中, 我们硬编码几个值.

\# Set up some global variables
num\_fetch\_threads \= 2
enclosure\_queue \= Queue()

\# A real app wouldn't use hard-coded data...
feed\_urls \= \[ 'http://www.castsampler.com/cast/feed/rss/guest',\]

接下来, 我们需要在工作线程中定义相应函数来处理下载. 再次, 这里为了便于说明模拟下载, 实际下载可以参考 [urllib](http://docs.python.org/lib/module-urllib.html) 模块(这再以后会介绍). 在这个示例中, 我们只根据线程id, 使其sleep一段时间.

def downloadEnclosures(i, q):
    """This is the worker thread function.
    It processes items in the queue one after another.
    These daemon threads go into an infinite loop,
    and only exit when the main thread ends.
    """

    while True:
        print '%s: Looking for the next enclosure' % i
        url \= q.get()
        print '%s: Downloading:' % i, url
        time.sleep(i + 2) \# instead of really downloading the URL, we just pretend

        q.task\_done()

一旦定义好目标函数, 我们就可以启动工作线程. 注意, 函数downloadEnclosures()在”url = q.get()”会阻塞, 直到队列有东西返回, 因此, 当队列中有东西时, 启动线程总是安全的.

\# Set up some threads to fetch the enclosures
for i in range(num\_fetch\_threads):
    worker \= Thread(target\=downloadEnclosures, args\=(i, enclosure\_queue,))
    worker.setDaemon(True)
    worker.start()

现在, 我们开始检索feed的内容(使用Mark Pilgrim的 [feedparser](http://www.feedparser.org/) 模块)和一个url集合. 当第一个url添加到队列后, 一个工作线程即可选择它并启动下载. 循环将继续运行并添加相应的feed, 直到全部加完, 工作线程将轮流取出url去下载它们.

\# Download the feed(s) and put the enclosure URLs into the queue.
for url in feed\_urls:
    response \= feedparser.parse(url, agent\='fetch\_podcasts.py')
    for entry in response\['entries'\]:
        for enclosure in entry.get('enclosures', \[\]):
            print 'Queuing:', enclosure\['url'\]
            enclosure\_queue.put(enclosure\['url'\])

剩下就可以等待队列为空.

\# Now wait for the queue to be empty, indicating that we have
\# processed all of the downloads.
print '\*\*\* Main thread waiting'
enclosure\_queue.join()
print '\*\*\* Done'

下载如下 [示例代码](http://www.doughellmann.com/PyMOTW/fetch_podcasts.py) , 运行即可看到如下输出:

0: Looking for the next enclosure
1: Looking for the next enclosure
Queuing: http://http.earthcache.net/htc-01.media.globix.net/COMP009996MOD1/Danny\_Meyer.mp3
Queuing: http://feeds.feedburner.com/~r/drmoldawer/~5/104445110/moldawerinthemorning\_show34\_032607.mp3
Queuing: http://www.podtrac.com/pts/redirect.mp3/twit.cachefly.net/MBW-036.mp3
Queuing: http://media1.podtech.net/media/2007/04/PID\_010848/Podtech\_calacaniscast22\_ipod.mp4
Queuing: http://media1.podtech.net/media/2007/03/PID\_010592/Podtech\_SXSW\_KentBrewster\_ipod.mp4
Queuing: http://media1.podtech.net/media/2007/02/PID\_010171/Podtech\_IDM\_ChrisOBrien2.mp3
Queuing: http://feeds.feedburner.com/~r/drmoldawer/~5/96188661/moldawerinthemorning\_show30\_022607.mp3
\*\*\* Main thread waiting
0: Downloading: http://http.earthcache.net/htc-01.media.globix.net/COMP009996MOD1/Danny\_Meyer.mp3
1: Downloading: http://feeds.feedburner.com/~r/drmoldawer/~5/104445110/moldawerinthemorning\_show34\_032607.mp3
0: Looking for the next enclosure
0: Downloading: http://www.podtrac.com/pts/redirect.mp3/twit.cachefly.net/MBW-036.mp3
1: Looking for the next enclosure
1: Downloading: http://media1.podtech.net/media/2007/04/PID\_010848/Podtech\_calacaniscast22\_ipod.mp4
0: Looking for the next enclosure
0: Downloading: http://media1.podtech.net/media/2007/03/PID\_010592/Podtech\_SXSW\_KentBrewster\_ipod.mp4
0: Looking for the next enclosure
0: Downloading: http://media1.podtech.net/media/2007/02/PID\_010171/Podtech\_IDM\_ChrisOBrien2.mp3
1: Downloading: http://feeds.feedburner.com/~r/drmoldawer/~5/96188661/moldawerinthemorning\_show30\_022607.mp3
1: Looking for the next enclosure
\*\*\* Done
