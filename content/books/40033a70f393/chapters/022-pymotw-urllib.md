-   模块：urllib
-   目的：访问不需要认证的远程资源
-   python版本：1.4+

urllib模块提供了一个访问网络资源的简单接口. 虽然urllib可以与gopher和ftp协议一起使用, 但下面的例子都是用了http协议.

## HTTP GET[¶](#http-get "Permalink to this headline")

这些例子的测试服务器是在BaseHTTPServer\_GET.py中, 这个脚本在PyMOTW例子的BaseHTTPServer模块中. 在一个终端窗口中启动服务器, 然后在另一个窗口中运行以下这些例子.

HTTP GET 是urllib最简单的操作. 简单把URL传递给urlopen()来获取一个用于操作远程数据的类文件句柄.

import urllib

response \= urllib.urlopen('http://localhost:8080/')
print 'RESPONSE:', response
print 'URL :', response.geturl()

headers \= response.info()
print 'DATE :', headers\['date'\]
print 'HEADERS :'
print '---------'
print headers

data \= response.read()
print 'LENGTH :', len(data)
print 'DATA :'
print '---------'
print data

该示例服务器取得传入的值, 并且返回格式化的纯文本response. 从urlopen()返回的值通过info()方法给出HTTP服务器的headers的入口, 并且通过read()和readlines()等方法获得远程资源的数据.

$ python urllib\_urlopen.py
RESPONSE: <addinfourl at 10180248 whose fp = <socket.\_fileobject object at 0x935c30>>
URL : http://localhost:8080/
DATE : Sun, 30 Mar 2008 16:27:10 GMT
HEADERS :
---------
Server: BaseHTTP/0.3 Python/2.5.1
Date: Sun, 30 Mar 2008 16:27:10 GMT

LENGTH : 221
DATA :
---------
CLIENT VALUES:
client\_address=('127.0.0.1', 54354) (localhost)
command=GET
path=/
real path=/
query=
request\_version=HTTP/1.0

SERVER VALUES:
server\_version=BaseHTTP/0.3
sys\_version=Python/2.5.1
protocol\_version=HTTP/1.0

类文件对象也是可以迭代的:

import urllib

response \= urllib.urlopen('http://localhost:8080/')
for line in response:
    print line.rstrip()

因为返回的每一行都有换行符和完整的框架回车符, 所以在输出之前先去掉他们.

$ python urllib\_urlopen\_iterator.py
CLIENT VALUES:
client\_address=('127.0.0.1', 54380) (localhost)
command=GET
path=/
real path=/
query=
request\_version=HTTP/1.0

SERVER VALUES:
server\_version=BaseHTTP/0.3
sys\_version=Python/2.5.1
protocol\_version=HTTP/1.0

## 编码参数[¶](#id1 "Permalink to this headline")

将参数编码并且追加在URL之后, 传给服务器.

import urllib
query\_args \= { 'q':'query string', 'foo':'bar' }
encoded\_args \= urllib.urlencode(query\_args)
print 'Encoded:', encoded\_args

url \= 'http://localhost:8080/?' + encoded\_args
print urllib.urlopen(url).read()

注意query, 在客户端的值的列表中包含了已编码的参数query.

$ python urllib\_urlencode.py
Encoded: q=query+string&foo=bar
CLIENT VALUES:
client\_address=('127.0.0.1', 54415) (localhost)
command=GET
path=/?q=query+string&foo=bar
real path=/
query=q=query+string&foo=bar
request\_version=HTTP/1.0

SERVER VALUES:
server\_version=BaseHTTP/0.3
sys\_version=Python/2.5.1
protocol\_version=HTTP/1.0

在查询字符串中使用单独的变量来传递值序列时, 需传递doseq=True给urlencode().

import urllib
query\_args \= { 'foo':\['foo1', 'foo2'\] }
print 'Single :', urllib.urlencode(query\_args)
print 'Sequence:', urllib.urlencode(query\_args, doseq\=True)

$ python urllib\_urlencode\_doseq.py
Single : foo=%5B%27foo1%27%2C+%27foo2%27%5D
Sequence: foo=foo1&foo=foo2

为了解码查询字符串, 可查看cgi模块中的FieldStorage类.

在查询参数里的一些特别字符, 在传递给urlencode()后, 在服务器端可能和URL一起引起解析错误. 可以直接使用quote()或者quote\_plus()函数在本地引用他们以生成安全的字符串.

import urllib

url \= 'http://localhost:8080/~dhellmann/'
print 'urlencode() :', urllib.urlencode({'url':url})
print 'quote() :', urllib.quote(url)
print 'quote\_plus():', urllib.quote\_plus(url)

Note

quote\_plus()能够替换更多的特殊字符.

$ python urllib\_quote.py
urlencode() : url=http%3A%2F%2Flocalhost%3A8080%2F%7Edhellmann%2F
quote() : http%3A//localhost%3A8080/%7Edhellmann/
quote\_plus(): http%3A%2F%2Flocalhost%3A8080%2F%7Edhellmann%2F

视情况而定, 用unquote()或者unquote\_plus()来还原quote操作.

import urllib

print urllib.unquote('http%3A//localhost%3A8080/%7Edhellmann/')
print urllib.unquote\_plus('http%3A%2F%2Flocalhost%3A8080%2F%7Edhellmann%2F')

$ python urllib\_unquote.py
http://localhost:8080/~dhellmann/
http://localhost:8080/~dhellmann/

## HTTP POST[¶](#http-post "Permalink to this headline")

这些例子的测试服务器是在BaseHTTPServer\_POST.py中, 这个脚本在PyMOTW例子的BaseHTTPServer模块中. 在一个终端窗口中启动服务器, 然后在另一个窗口中运行以下这些例子.

通过POST代替GET方式传递数据给远程服务器, 仅仅是把已编码的查询参数当作数据传递给urlopen().

import urllib
query\_args \= { 'q':'query string', 'foo':'bar' }
encoded\_args \= urllib.urlencode(query\_args)
url \= 'http://localhost:8080/'
print urllib.urlopen(url, encoded\_args).read()

$ python urllib\_urlopen\_post.py
Client: ('127.0.0.1', 54545)
Path: /
Form data:
     q=query string
     foo=bar

如果服务器需要的不是已编码url形式的参数, 你可以传递任一字节字符串作为发送的数据.

## Paths vs. URLs:[¶](#paths-vs-urls "Permalink to this headline")

一些操作系统使用不同的方法分离本地文件路径和URL. 为了使代码简捷, 你应该反复地使用函数pathname2url()和url2pathname(). 因为我在Mac上工作, 我必须明确引入Windows上的函数版本. 使用由urllib导出的函数版本可以让你默认在正确平台下, 因此就不用自己做了.

import os

from urllib import pathname2url, url2pathname

print '== Default =='
path \= '/a/b/c'
print 'Original:', path
print 'URL :', pathname2url(path)
print 'Path :', url2pathname('/d/e/f')
print

from nturl2path import pathname2url, url2pathname

print '== Windows, without drive letter =='
path \= path.replace('/', '\\\\')
print 'Original:', path
print 'URL :', pathname2url(path)
print 'Path :', url2pathname('/d/e/f')
print

print '== Windows, with drive letter =='
path \= 'C:\\\\' + path.replace('/', '\\\\')
print 'Original:', path
print 'URL :', pathname2url(path)
print 'Path :', url2pathname('/d/e/f')

有两个Windows例子, 分别是路径的前缀中有和没有驱动器名.

$ python urllib\_pathnames.py
== Default ==
Original: /a/b/c
URL : /a/b/c
Path : /d/e/f

== Windows, without drive letter ==
Original: \\a\\b\\c
URL : /a/b/c
Path : \\d\\e\\f

== Windows, with drive letter ==
Original: C:\\\\a\\b\\c
URL : ///C|/a/b/c
Path : \\d\\e\\f

## 带Cache简单检索[¶](#cache "Permalink to this headline")

检索数据是常见的操作, urllib包括urlretrieve()函数, 因此你不用自己写它. urlretrieve()带有URL中的参数, 一个用于存储数据的临时文件, 一个用于报告下载进度的函数, 和URL中要POST数据. 如果没有给定文件名, urlretrieve()就建立一个临时文件. 你自己能删除它, 或者把它看作一个cache, 可以用urlcleanup()移除它.

这个例子使用GET从web服务器中检索数据.

import urllib
import os

def reporthook(blocks\_read, block\_size, total\_size):
    if not blocks\_read:
        print 'Connection opened'
        return
    if total\_size < 0:
        \# Unknown size 未知大小
        print 'Read %d blocks' % blocks\_read
    else:
        amount\_read \= blocks\_read \* block\_size
        print 'Read %d blocks, or %d/%d' % (blocks\_read, amount\_read, total\_size)
        return

try:
    filename, msg \= urllib.urlretrieve('http://blog.doughellmann.com/', reporthook\=reporthook)
    print
    print 'File:', filename
    print 'Headers:'
    print msg
    print 'File exists before cleanup:', os.path.exists(filename)
finally:
    urllib.urlcleanup()
    print 'File still exists:', os.path.exists(filename)

由于服务器没有返回header中的Content-length, urlretrieve()不知道数据应该有多大, 所以将-1传给reporthook()中的参数total\_size.

$ python urllib\_urlretrieve.py
Connection opened
Read 1 blocks
Read 2 blocks
Read 3 blocks
Read 4 blocks
Read 5 blocks
Read 6 blocks
Read 7 blocks
Read 8 blocks
Read 9 blocks
Read 10 blocks
Read 11 blocks
Read 12 blocks
Read 13 blocks
Read 14 blocks
Read 15 blocks
Read 16 blocks
Read 17 blocks
Read 18 blocks
Read 19 blocks

File: /var/folders/9R/9R1t+tR02Raxzk+F71Q50U+++Uw/-Tmp-/tmp3HRpZP
Headers:
Content-Type: text/html; charset=UTF-8
Last-Modified: Tue, 25 Mar 2008 23:09:10 GMT
Cache-Control: max-age=0 private
ETag: "904b02e0-c7ff-47f6-9f35-cc6de5d2a2e5"
Server: GFE/1.3
Date: Sun, 30 Mar 2008 17:36:48 GMT
Connection: Close

File exists before cleanup: True
File still exists: False

## URLopener[¶](#urlopener "Permalink to this headline")

urllib提供了一个URLopener基类, 并且默认使用FancyURLopener处理支持的协议. 如果你想要改变其行为, 你可能需要查看Python2.1中新加的urllib2模块(PyMOTW将会阐述).

## 参考[¶](#id2 "Permalink to this headline")

-   [RFC 2616 - HTTP Specification](http://www.faqs.org/rfcs/rfc2616.html)
-   [cgi - For decoding query arguments](http://docs.python.org/lib/module-cgi.html)
-   [PyMOTW: BaseHTTPServer](http://blog.doughellmann.com/2007/12/pymotw-basehttpserver.html)
-   [urllib2 - For more complex URL access needs](http://docs.python.org/lib/module-urllib2.html)
-   [Python Module of the Week Home](http://www.doughellmann.com/projects/PyMOTW/)
