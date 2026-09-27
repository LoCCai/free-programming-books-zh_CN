-   模块： asyncore
-   目的： 异步I/O操作
-   python版本： 1.5.2+

asyncore模块包含了使用I/O对象如sockets以方便我们异步的进行操作(可以代替例如线程). 他提供的主要类是dispatcher, 是一个封装了一个socket并提供了处理如连接, 读取, 写入等的事件钩子, 这些会在主循环函数loop()中被调用.

## 客户端[¶](#id1 "Permalink to this headline")

创建一个异步客户端，继承dispatcher并提供了创建, 读取和写入socket的实现. 让我们拿HTTP客户端来做示例, 它基于一个来自标准库文档的例子.

import asyncore
import logging
import socket
from cStringIO import StringIO
import urlparse

class HttpClient(asyncore.dispatcher):

    def \_\_init\_\_(self, url):
        self.url \= url
        self.logger \= logging.getLogger(self.url)
        self.parsed\_url \= urlparse.urlparse(url)
        asyncore.dispatcher.\_\_init\_\_(self)
        self.write\_buffer \= 'GET %s HTTP/1.0\\r\\n\\r\\n' % self.url
        self.read\_buffer \= StringIO()
        self.create\_socket(socket.AF\_INET, socket.SOCK\_STREAM)
        address \= (self.parsed\_url.netloc, 80)
        self.logger.debug('connecting to %s', address)
        self.connect(address)

    def handle\_connect(self):
        self.logger.debug('handle\_connect()')

    def handle\_close(self):
        self.logger.debug('handle\_close()')
        self.close()

    def writable(self):
        is\_writable \= (len(self.write\_buffer) \> 0)
        if is\_writable:
            self.logger.debug('writable() -> %s', is\_writable)
        return is\_writable

    def readable(self):
        self.logger.debug('readable() -> True')
        return True

    def handle\_write(self):
        sent \= self.send(self.write\_buffer)
        self.logger.debug('handle\_write() -> "%s"', self.write\_buffer\[:sent\])
        self.write\_buffer \= self.write\_buffer\[sent:\]

    def handle\_read(self):
        data \= self.recv(8192)
        self.logger.debug('handle\_read() -> %d bytes', len(data))
        self.read\_buffer.write(data)

if \_\_name\_\_ \== '\_\_main\_\_':
    logging.basicConfig(level\=logging.DEBUG,
      format\='%(name)s: %(message)s',
    )

    clients \= \[
      HttpClient('http://www.python.org/'),
      HttpClient('http://www.doughellmann.com/PyMOTW/contents.html'),
    \]

    logging.debug('LOOP STARTING')
    asyncore.loop()
    logging.debug('LOOP DONE')
    for c in clients:
        response\_body \= c.read\_buffer.getvalue()
        print c.url, 'got', len(response\_body), 'bytes'

首先，通过在 \_\_init\_\_() 中使用基类的 create\_socket() 方法创建socket. 当然还有其他的方法, 但在这个例子中. 我们创建的是一个TCP/IP socket. 因此使用基类已经可以满足需要了.

handle\_connect()钩子简单的显示了被调用的信息. 其他客户端还可以在 handle\_connect() 中进行一些握手或者协议交涉等类似的处理.

handle\_close()同样的显示了被调用的信息. 基类可以正确的关闭socket, 如果你不想作额外的工作可以交给函数来处理.

asyncore循环中, 使用 writeable() 和同属方法 readable() 决定什么样的操作来处理每个dispatcher. 实际上, sockets的 poll() 和 select() 方法或由每个dispatcher操作的文件描述符会在asyncore代码内部处理. 因此你不必自己来实现这些. 只需简单的指出某dispatcher是否是对读和写都要处理. 在这个HTTP client的例子中, 只要存在请求发送到服务器的数据, writable() 会返回True, 而 readable() 一直返回True, 因为我们想读取所有到来的数据.

在每次循环中, 当 writable() 正确响应, handle\_write() 会被调用. 在这个例子中, 在 \_\_init\_\_() 中创建的HTTP请求字符串会被发送到服务器, 写缓冲区会清除成功发送的数据.

类似地, 当 readable() 正确响应, 也就是有数据要读取了. 那么, handle\_read() 会被调用.

例子中\_\_main\_\_之后的代码首先配置一个日志记录以便调试, 然后创建了两个客户端分别下载网页. 创建客户端需要在一个由asyncore内部保存的 _map_ 中注册. 随着主循环的开始, 客户端的下载也开始, 当一个客户端从可读socket中读取0个字节, 这会被解释成关闭连接然后.

下面是这个例子中客户端app运行出的可能结果:

$ python asyncore\_http\_client.py
http://www.python.org/: connecting to ('www.python.org', 80)
http://www.doughellmann.com/PyMOTW/contents.html: connecting to ('www.doughellmann.com', 80)
root: LOOP STARTING
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_connect()
http://www.doughellmann.com/PyMOTW/contents.html: handle\_write() -> "GET http://www.doughellmann.com/PyMOTW/contents.html HTTP/1.0

"
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 3163 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 1448 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 2896 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 2896 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 2896 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 2896 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 1448 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 1448 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 1448 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 1448 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 895 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_close()
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 0 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.python.org/: handle\_connect()
http://www.python.org/: handle\_write() -> "GET http://www.python.org/ HTTP/1.0

"
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1257 bytes
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_close()
http://www.python.org/: handle\_read() -> 0 bytes
root: LOOP DONE
http://www.python.org/ got 18009 bytes
http://www.doughellmann.com/PyMOTW/contents.html got 22882 bytes

## 服务器[¶](#id2 "Permalink to this headline")

下面的例子, 通过重新实现SocketServe中的EchoServer例子来说明如何在服务器上使用异步. 这里主要有3个类: EchoServer用于接收来自客户端的连接并创建各自的EchoHandler实例, EchoClient是类似于HTTPClient的异步dispatche.

import asyncore
import logging

class EchoServer(asyncore.dispatcher):
    """Receives connections and establishes handlers for each client.
    """

    def \_\_init\_\_(self, address):
        self.logger \= logging.getLogger('EchoServer')
        asyncore.dispatcher.\_\_init\_\_(self)
        self.create\_socket(socket.AF\_INET, socket.SOCK\_STREAM)
        self.bind(address)
        self.address \= self.socket.getsockname()
        self.logger.debug('binding to %s', self.address)
        self.listen(1)
        return

    def handle\_accept(self):
        \# Called when a client connects to our socket
        client\_info \= self.accept()
        self.logger.debug('handle\_accept() -> %s', client\_info\[1\])
        EchoHandler(sock\=client\_info\[0\])
        \# We only want to deal with one client at a time,
        \# so close as soon as we set up the handler.
        \# Normally you would not do this and the server
        \# would run forever or until it received instructions
        \# to stop.
        self.handle\_close()
        return

    def handle\_close(self):
        self.logger.debug('handle\_close()')
        self.close()
        return

class EchoHandler(asyncore.dispatcher):
    """Handles echoing messages from a single client.
    """

    def \_\_init\_\_(self, sock, chunk\_size\=256):
        self.chunk\_size \= chunk\_size
        self.logger \= logging.getLogger('EchoHandler%s' % str(sock.getsockname()))
        asyncore.dispatcher.\_\_init\_\_(self, sock\=sock)
        self.data\_to\_write \= \[\]
        return

    def writable(self):
        """We want to write if we have received data."""
        response \= bool(self.data\_to\_write)
        self.logger.debug('writable() -> %s', response)
        return response

    def handle\_write(self):
        """Write as much as possible of the most recent message we have received."""
        data \= self.data\_to\_write.pop()
        sent \= self.send(data\[:self.chunk\_size\])
        if sent < len(data):
            remaining \= data\[sent:\]
            self.data\_to\_write.append(remaining)
        self.logger.debug('handle\_write() -> (%d) "%s"', sent, data\[:sent\])
        if not self.writable():
            self.handle\_close()

    def handle\_read(self):
        """Read an incoming message from the client and put it into our outgoing queue."""
        data \= self.recv(self.chunk\_size)
        self.logger.debug('handle\_read() -> (%d) "%s"', len(data), data)
        self.data\_to\_write.insert(0, data)

    def handle\_close(self):
        self.logger.debug('handle\_close()')
        self.close()

class EchoClient(asyncore.dispatcher):
    """Sends messages to the server and receives responses.
    """

    def \_\_init\_\_(self, host, port, message, chunk\_size\=512):
        self.message \= message
        self.to\_send \= message
        self.received\_data \= \[\]
        self.chunk\_size \= chunk\_size
        self.logger \= logging.getLogger('EchoClient')
        asyncore.dispatcher.\_\_init\_\_(self)
        self.create\_socket(socket.AF\_INET, socket.SOCK\_STREAM)
        self.logger.debug('connecting to %s', (host, port))
        self.connect((host, port))
        return

    def handle\_connect(self):
        self.logger.debug('handle\_connect()')

    def handle\_close(self):
        self.logger.debug('handle\_close()')
        self.close()
        received\_message \= ''.join(self.received\_data)
        if received\_message \== self.message:
            self.logger.debug('RECEIVED COPY OF MESSAGE')
        else:
            self.logger.debug('ERROR IN TRANSMISSION')
            self.logger.debug('EXPECTED "%s"', self.message)
            self.logger.debug('RECEIVED "%s"', received\_message)
        return

    def writable(self):
        self.logger.debug('writable() -> %s', bool(self.to\_send))
        return bool(self.to\_send)

    def handle\_write(self):
        sent \= self.send(self.to\_send\[:self.chunk\_size\])
        self.logger.debug('handle\_write() -> (%d) "%s"', sent, self.to\_send\[:sent\])
        self.to\_send \= self.to\_send\[sent:\]

    def handle\_read(self):
        data \= self.recv(self.chunk\_size)
        self.logger.debug('handle\_read() -> (%d) "%s"', len(data), data)
        self.received\_data.append(data)

if \_\_name\_\_ \== '\_\_main\_\_':
    import socket
    import threading

    logging.basicConfig(level\=logging.DEBUG,
      format\='%(name)s: %(message)s',
    )

    address \= ('localhost', 0) \# let the kernel give us a port
    server \= EchoServer(address)
    ip, port \= server.address \# find out what port we were given
    client \= EchoClient(ip, port, message\=open('lorem.txt', 'r').read())
    asyncore.loop()

EchoServer和EchoHandler被定义在独立的类中因为他们各自处理不同的事情. 当EchoServer接收一个连接, 一个新的socket被建立. 一个利用socket map(这是由asyncore内部维护的)的EchoHandler被创建, 而不是在EchoServer内部进行各个客户端请求的分配.

$ python asyncore\_echo\_server.py
EchoServer: binding to ('127.0.0.1', 52235)
EchoClient: connecting to ('127.0.0.1', 52235)
EchoClient: writable() -> True
EchoServer: handle\_accept() -> ('127.0.0.1', 52236)
EchoServer: handle\_close()
EchoClient: handle\_connect()
EchoClient: handle\_write() -> (512) "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
egestas, enim et consectetuer ullamcorper, lectus ligula rutrum leo, a
elementum elit tortor eu quam. Duis tincidunt nisi ut ante. Nulla
facilisi. Sed tristique eros eu libero. Pellentesque vel arcu. Vivamus
purus orci, iaculis ac, suscipit sit amet, pulvinar eu,
lacus. Praesent placerat tortor sed nisl. Nunc blandit diam egestas
dui. Pellentesque habitant morbi tristique senectus et netus et
malesuada fames ac turpis egestas. Aliquam viverra f"
EchoClient: writable() -> True
EchoHandler('127.0.0.1', 52235): writable() -> False
EchoHandler('127.0.0.1', 52235): handle\_read() -> (256) "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
egestas, enim et consectetuer ullamcorper, lectus ligula rutrum leo, a
elementum elit tortor eu quam. Duis tincidunt nisi ut ante. Nulla
facilisi. Sed tristique eros eu libero. Pellentesque ve"
EchoClient: handle\_write() -> (225) "ringilla
leo. Nulla feugiat augue eleifend nulla. Vivamus mauris. Vivamus sed
mauris in nibh placerat egestas. Suspendisse potenti. Mauris massa. Ut
eget velit auctor tortor blandit sollicitudin. Suspendisse imperdiet
justo.
"
EchoClient: writable() -> False
EchoHandler('127.0.0.1', 52235): writable() -> True
EchoHandler('127.0.0.1', 52235): handle\_read() -> (256) "l arcu. Vivamus
purus orci, iaculis ac, suscipit sit amet, pulvinar eu,
lacus. Praesent placerat tortor sed nisl. Nunc blandit diam egestas
dui. Pellentesque habitant morbi tristique senectus et netus et
malesuada fames ac turpis egestas. Aliquam viverra f"
EchoHandler('127.0.0.1', 52235): handle\_write() -> (256) "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
egestas, enim et consectetuer ullamcorper, lectus ligula rutrum leo, a
elementum elit tortor eu quam. Duis tincidunt nisi ut ante. Nulla
facilisi. Sed tristique eros eu libero. Pellentesque ve"
EchoHandler('127.0.0.1', 52235): writable() -> True
EchoClient: writable() -> False
EchoHandler('127.0.0.1', 52235): writable() -> True
EchoClient: handle\_read() -> (256) "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
egestas, enim et consectetuer ullamcorper, lectus ligula rutrum leo, a
elementum elit tortor eu quam. Duis tincidunt nisi ut ante. Nulla
facilisi. Sed tristique eros eu libero. Pellentesque ve"
EchoHandler('127.0.0.1', 52235): handle\_read() -> (225) "ringilla
leo. Nulla feugiat augue eleifend nulla. Vivamus mauris. Vivamus sed
mauris in nibh placerat egestas. Suspendisse potenti. Mauris massa. Ut
eget velit auctor tortor blandit sollicitudin. Suspendisse imperdiet
justo.
"
EchoHandler('127.0.0.1', 52235): handle\_write() -> (256) "l arcu. Vivamus
purus orci, iaculis ac, suscipit sit amet, pulvinar eu,
lacus. Praesent placerat tortor sed nisl. Nunc blandit diam egestas
dui. Pellentesque habitant morbi tristique senectus et netus et
malesuada fames ac turpis egestas. Aliquam viverra f"
EchoHandler('127.0.0.1', 52235): writable() -> True
EchoClient: writable() -> False
EchoHandler('127.0.0.1', 52235): writable() -> True
EchoClient: handle\_read() -> (256) "l arcu. Vivamus
purus orci, iaculis ac, suscipit sit amet, pulvinar eu,
lacus. Praesent placerat tortor sed nisl. Nunc blandit diam egestas
dui. Pellentesque habitant morbi tristique senectus et netus et
malesuada fames ac turpis egestas. Aliquam viverra f"
EchoHandler('127.0.0.1', 52235): handle\_write() -> (225) "ringilla
leo. Nulla feugiat augue eleifend nulla. Vivamus mauris. Vivamus sed
mauris in nibh placerat egestas. Suspendisse potenti. Mauris massa. Ut
eget velit auctor tortor blandit sollicitudin. Suspendisse imperdiet
justo.
"
EchoHandler('127.0.0.1', 52235): writable() -> False
EchoHandler('127.0.0.1', 52235): handle\_close()
EchoClient: writable() -> False
EchoClient: handle\_read() -> (225) "ringilla
leo. Nulla feugiat augue eleifend nulla. Vivamus mauris. Vivamus sed
mauris in nibh placerat egestas. Suspendisse potenti. Mauris massa. Ut
eget velit auctor tortor blandit sollicitudin. Suspendisse imperdiet
justo.
"
EchoClient: writable() -> False
EchoClient: handle\_close()
EchoClient: RECEIVED COPY OF MESSAGE
EchoClient: handle\_read() -> (0) ""

在这个例子中, 服务器, 处理者, 客户端对象都被asyncore在一个单独进程中使用一相同的socket map维护. 将服务器和客户端分开, 简单的将相关代码分开, 并且在各自程序中运行 asyncore.loop(). 当一个dispatcher被关闭了, 会从map中删掉, 整个循环会在map为空时停下来.

## 其他循环事件的处理[¶](#id3 "Permalink to this headline")

有时候需必须在已有的应用事件中加入异步事件. 例如, 一个GUI应用不想在所有异步操作处理时阻断UI-这是违背了异步的目的. 为了使这种集成更方便, asycore.loop() 接收一个用于设置超时的参数和一个用于限制循环次数的参数, 重新使用第一个例子中的HttpClient, 我们可以看到他们各自的效果.

import asyncore
import logging

from asyncore\_http\_client import HttpClient

logging.basicConfig(level\=logging.DEBUG,
  format\='%(name)s: %(message)s',
)

clients \= \[
  HttpClient('http://www.doughellmann.com/PyMOTW/contents.html'),
  HttpClient('http://www.python.org/'),
\]

loop\_counter \= 0
while asyncore.socket\_map:
    loop\_counter += 1
    logging.debug('loop\_counter=%s', loop\_counter)
    asyncore.loop(timeout\=1, count\=1)

我们可以看到, 在 asyncore.loop() 中调用时, 客户端仅读或写数据一次, 替代我们自己的while循环. 我们可以在GUI工具包活其他需要这种功能机制的地方类似的调用 asyncore.loop() (ui不会忙于处理其他事件).

$ python asyncore\_loop.py

http://www.doughellmann.com/PyMOTW/contents.html: connecting to ('www.doughellmann.com', 80)
http://www.python.org/: connecting to ('www.python.org', 80)
root: loop\_counter=1
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: writable() -> True
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_connect()
http://www.doughellmann.com/PyMOTW/contents.html: handle\_write() -> "GET http://www.doughellmann.com/PyMOTW/contents.html HTTP/1.0

"
root: loop\_counter=2
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 267 bytes
root: loop\_counter=3
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 8192 bytes
root: loop\_counter=4
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 6288 bytes
root: loop\_counter=5
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 1448 bytes
root: loop\_counter=6
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 1448 bytes
root: loop\_counter=7
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 2896 bytes
root: loop\_counter=8
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 2343 bytes
root: loop\_counter=9
http://www.doughellmann.com/PyMOTW/contents.html: readable() -> True
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.doughellmann.com/PyMOTW/contents.html: handle\_close()
http://www.doughellmann.com/PyMOTW/contents.html: handle\_read() -> 0 bytes
root: loop\_counter=10
http://www.python.org/: readable() -> True
http://www.python.org/: writable() -> True
http://www.python.org/: handle\_connect()
http://www.python.org/: handle\_write() -> "GET http://www.python.org/ HTTP/1.0

"
root: loop\_counter=11
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
root: loop\_counter=12
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
root: loop\_counter=13
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
root: loop\_counter=14
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
root: loop\_counter=15
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
root: loop\_counter=16
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
root: loop\_counter=17
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
root: loop\_counter=18
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
root: loop\_counter=19
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
root: loop\_counter=20
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
root: loop\_counter=21
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
root: loop\_counter=22
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1396 bytes
root: loop\_counter=23
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_read() -> 1257 bytes
root: loop\_counter=24
http://www.python.org/: readable() -> True
http://www.python.org/: handle\_close()
http://www.python.org/: handle\_read() -> 0 bytes

## 文件处理[¶](#id4 "Permalink to this headline")

一般情况下, 你可能只想在sockets中使用asyncore, 但有时异步的读取文件也是有用的(当测试网络服务器而不需要网络设置使用文件，或者是部分读取, 写入大数据文件）在这些情况下, asyncore提供了file\_dispatcher和file\_wrapper类.

import asyncore
import os

class FileReader(asyncore.file\_dispatcher):

    def writable(self):
        return False

    def handle\_read(self):
        data \= self.recv(256)
        print 'READ: (%d) "%s"' % (len(data), data)

    def handle\_expt(self):
        \# Ignore events that look like out of band data
        pass

    def handle\_close(self):
        self.close()

lorem\_fd \= os.open('lorem.txt', os.O\_RDONLY)
reader \= FileReader(lorem\_fd)
asyncore.loop()

这个例子在Python2.5.2下进行测试, 我使用了 os.open() 获得文件描述符. 对于Python2.6之后, file\_dispatcher自动将所有具有 fileno() 方法的东西转换成一个文件描述符.

$ python asyncore\_file\_dispatcher.py
READ: (256) "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
egestas, enim et consectetuer ullamcorper, lectus ligula rutrum leo, a
elementum elit tortor eu quam. Duis tincidunt nisi ut ante. Nulla
facilisi. Sed tristique eros eu libero. Pellentesque ve"
READ: (256) "l arcu. Vivamus
purus orci, iaculis ac, suscipit sit amet, pulvinar eu,
lacus. Praesent placerat tortor sed nisl. Nunc blandit diam egestas
dui. Pellentesque habitant morbi tristique senectus et netus et
malesuada fames ac turpis egestas. Aliquam viverra f"
READ: (225) "ringilla
leo. Nulla feugiat augue eleifend nulla. Vivamus mauris. Vivamus sed
mauris in nibh placerat egestas. Suspendisse potenti. Mauris massa. Ut
eget velit auctor tortor blandit sollicitudin. Suspendisse imperdiet
justo.
"
READ: (0) ""
