-   模块：time
-   目的：操作times的函数
-   python版本：1.4+

time模块提供了操作日期和时间的函数

## 描述[¶](#id1 "Permalink to this headline")

time模块是利用了c函数来处理日期和时间, 也就是说它绑定了c的实现, 一些特定的细节(比如纪元的开始时间、日期的最大值)是和平台相关的, 具体可以参考 [这里](http://docs.python.org/lib/module-time.html) .

## Wall Clock Time[¶](#wall-clock-time "Permalink to this headline")

time模块的核心函数之一就是time.time()函数, 它返回一个自公元开始的总秒数(浮点型).

本工具包含三个文件:

import time
print 'The time is:', time.time()

虽然返回的值是浮点型, 但精度是依赖于不同的系统平台的.

$ python time\_time.py
The time is: 1205079300.54

当存储和比较日期时, 浮点型一般是很有用的, 但这种方式不易阅读, 为了更有用的记录和输出时间可以使用time.ctime().

import time
print 'The time is      :', time.ctime()
later \= time.time() + 15
print '15 secs from now :', time.ctime(later)

上面第二行示范了如何来利用ctime()函数对当前时间进行格式化.

$ python time\_ctime.py
The time is      : Sun Mar  9 12:18:02 2008
15 secs from now : Sun Mar  9 12:18:17 2008

## 处理器时钟[¶](#id3 "Permalink to this headline")

time()函数返回的是现实世界的时间, 而clock()函数返回的是cpu时钟. clock()函数返回值常用作性能测试, benchmarking等. 它们常常反映了程序运行的真实时间, 比time()函数返回的值要精确.

import hashlib
import time

\# Data to use to calculate md5 checksums
data \= open(\_\_file\_\_, 'rt').read()

for i in range(5):
    h \= hashlib.sha1()
    print time.ctime(), ': %0.3f %0.3f' % (time.time(), time.clock())
    for i in range(100000):
        h.update(data)
    cksum \= h.digest()

在这个例子中, ctime()把time()函数返回的浮点型表示转化为标准时间, 每个迭代循环使用了clock(). 如果想在机器上测试这个例子, 那么可以增加循环次数, 或者处理大一点的数据, 这样才能看到不同点.

$ python time\_clock.py
Sun Mar  9 12:41:53 2008 : 1205080913.260 0.030
Sun Mar  9 12:41:53 2008 : 1205080913.682 0.440
Sun Mar  9 12:41:54 2008 : 1205080914.103 0.860
Sun Mar  9 12:41:54 2008 : 1205080914.518 1.270
Sun Mar  9 12:41:54 2008 : 1205080914.932 1.680

一般, 如果程序没有做任何事情, 处理器时钟是不会计时.

import time

for i in range(6, 1, \-1):
    print '%s %0.2f %0.2f' % (time.ctime(), time.time(), time.clock())
    print 'Sleeping', i
    time.sleep(i)

在这个例子中, 每次迭代, 循环中处理了很少的任务就进入了sleep, 当进程在睡眠中时, time.time()函数的返回值依然会增加. 但是time.clock()是不会增加的.

$ python time\_clock\_sleep.py
Sun Mar  9 12:46:36 2008 1205081196.20 0.02
Sleeping 6
Sun Mar  9 12:46:42 2008 1205081202.20 0.02
Sleeping 5
Sun Mar  9 12:46:47 2008 1205081207.20 0.02
Sleeping 4
Sun Mar  9 12:46:51 2008 1205081211.20 0.02
Sleeping 3
Sun Mar  9 12:46:54 2008 1205081214.21 0.02
Sleeping 2

time.sleep函数控制当前的线程, 让它等待直到系统重新唤醒它, 如果应用中只有一个线程, 那么它会阻塞当前进程, 使其不做任何事情.

## struct\_time[¶](#struct-time "Permalink to this headline")

某些时候, 使用逝去的秒数来表示时间是很有用的. 有时候你需要获取日期的单独部分(如年、月等等), time模块定义了struct\_time来存储日期和时间值并作为其部分以便获取. 提供了多种函数将struct\_time转化为float.

import time

print 'gmtime   :', time.gmtime()
print 'localtime:', time.localtime()
print 'mktime   :', time.mktime(time.localtime())

print
t \= time.localtime()
print 'Day of month:', t.tm\_mday
print ' Day of week:', t.tm\_wday
print ' Day of year:', t.tm\_yday

gmtime()返回当前的UTC时间, localtime()返回当前时间域的当前时间, mktime()接收struct\_time参数并将其转化为浮点型来表示.

$ python time\_struct.py
gmtime   : (2008, 3, 9, 16, 58, 19, 6, 69, 0)
localtime: (2008, 3, 9, 12, 58, 19, 6, 69, 1)
mktime   : 1205081899.0

Day of month: 9
Day of week: 6
Day of year: 69

## 解析和格式化时间[¶](#id4 "Permalink to this headline")

函数strptime()和strftime()可以使struct\_time和时间值字符串相互转化. 有一个很长的格式化说明列表可以用来支持输入和输出不同的风格. 完整的列表在time模块的的库文档中有介绍.

下面示例把当前时间（字符串)转化为struct\_time实例, 然后再转化为字符串.

import time

now \= time.ctime()
print now
parsed \= time.strptime(now)
print parsed
print time.strftime("%a %b %d %H:%M:%S %Y", parsed)

输出和输入字符串不是完全的一致, 主要表现在月份前加了一个0前缀.

$ python time\_strptime.py
Sun Mar  9 13:01:19 2008
(2008, 3, 9, 13, 1, 19, 6, 69, -1)
Sun Mar 09 13:01:19 2008

## 使用Time Zone(时区)[¶](#time-zone "Permalink to this headline")

无论是你的程序, 还是为系统使用一个默认的时区, 检测当前时间的函数依赖于当前Time Zone(时间域)的设置. 改变时区设置是不会改变实际时间, 只会改变表示时间的方法.

通过设置环境变量TZ可以改变时区, 然后调用tzset(). 环境变量TZ可以对时区来详细的设置, 比如白天保存时间的起始点. 通常使用时区名称是比较简单的, 如果需要了解更多信息可以参考库.

下面这个示例改变了time zone中的一些值, 展示了这种改变如何来影响time模块中的其它设置.

import time
import os

def show\_zone\_info():
    print '\\tTZ    :', os.environ.get('TZ', '(not set)')
    print '\\ttzname:', time.tzname
    print '\\tZone  : %d (%d)' % (time.timezone, (time.timezone / 3600))
    print '\\tDST   :', time.daylight
    print '\\tTime  :', time.ctime()
    print

print 'Default :'
show\_zone\_info()

for zone in \[ 'US/Eastern', 'US/Pacific', 'GMT', 'Europe/Amsterdam' \]:
    os.environ\['TZ'\] \= zone
    time.tzset()
    print zone, ':'
    show\_zone\_info()

我的时区是US/Eastern, 所以设置TZ不会起作用. 如果是其它时区, 则会改变tzname、daylight flag以及timezone偏移值.

$ python time\_timezone.py
Default :
  TZ    : (not set)
  tzname: ('EST', 'EDT')
  Zone  : 18000 (5)
  DST   : 1
  Time  : Sun Mar  9 13:06:53 2008

US/Eastern :
  TZ    : US/Eastern
  tzname: ('EST', 'EDT')
  Zone  : 18000 (5)
  DST   : 1
  Time  : Sun Mar  9 13:06:53 2008

US/Pacific :
  TZ    : US/Pacific
  tzname: ('PST', 'PDT')
  Zone  : 28800 (8)
  DST   : 1
  Time  : Sun Mar  9 10:06:53 2008

GMT :
  TZ    : GMT
  tzname: ('GMT', 'GMT')
  Zone  : 0 (0)
  DST   : 0
  Time  : Sun Mar  9 17:06:53 2008

Europe/Amsterdam :
  TZ    : Europe/Amsterdam
  tzname: ('CET', 'CEST')
  Zone  : -3600 (-1)
  DST   : 1
  Time  : Sun Mar  9 18:06:53 2008

## 参考[¶](#id5 "Permalink to this headline")

-   [datetime module](http://docs.python.org/lib/module-datetime.html)
-   [locale module](http://docs.python.org/lib/module-locale.html)
-   [calendar module](http://docs.python.org/lib/module-calendar.html)
