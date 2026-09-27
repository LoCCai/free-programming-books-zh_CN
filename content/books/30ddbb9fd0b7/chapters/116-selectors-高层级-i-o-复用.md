Added in version 3.4.

**源码:** [Lib/selectors.py](https://github.com/python/cpython/tree/3.14/Lib/selectors.py)

* * *

## 概述[¶](#introduction "Link to this heading")

此模块允许高层级且高效率的 I/O 复用，它建立在 [`select`](https://docs.python.org/zh-cn/3/library/select.html#module-select "select: Wait for I/O completion on multiple streams.") 模块原型的基础之上。推荐用户改用此模块，除非他们希望对所使用的 OS 层级原型进行精确控制。

它定义了一个 [`BaseSelector`](#selectors.BaseSelector "selectors.BaseSelector") 抽象基类，以及多个具体实现 ([`KqueueSelector`](#selectors.KqueueSelector "selectors.KqueueSelector"), [`EpollSelector`](#selectors.EpollSelector "selectors.EpollSelector")...)，它们可被用于在多个文件对象上等待 I/O 就绪通知。在下文中，“文件对象”是指任何具有 [`fileno()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.fileno "io.IOBase.fileno") 方法的对象，或是一个原始文件描述符。参见 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)。

[`DefaultSelector`](#selectors.DefaultSelector "selectors.DefaultSelector") 是一个指向当前平台上可用的最高效实现的别名：这应为大多数用户的默认选择。

备注

受支持的文件对象类型取决于具体平台：在 Windows 上，支持套接字但不支持管道，而在 Unix 上两者均受支持（某些其他类型也可能受支持，例如 fifo 或特殊文件设备等）。

## 类[¶](#classes "Link to this heading")

类的层次结构:

BaseSelector
+-- SelectSelector
+-- PollSelector
+-- EpollSelector
+-- DevpollSelector
+-- KqueueSelector

在下文中，_events_ 是一个位掩码，它指明哪些 I/O 事件要在给定的文件对象上执行等待。 它可以是以下模块级常量的组合：

> | 
> 常量
> 
>  | 
> 
> 含义
> 
>  |
> | --- | --- |
> | 
> 
> selectors.EVENT\_READ[¶](#selectors.EVENT_READ "Link to this definition")
> 
> 
> 
>  | 
> 
> 可读
> 
>  |
> | 
> 
> selectors.EVENT\_WRITE[¶](#selectors.EVENT_WRITE "Link to this definition")
> 
> 
> 
>  | 
> 
> 可写
> 
>  |

_class_ selectors.SelectorKey[¶](#selectors.SelectorKey "Link to this definition")

[`SelectorKey`](#selectors.SelectorKey "selectors.SelectorKey") 是一个 [`namedtuple`](https://docs.python.org/zh-cn/3/library/collections.html#collections.namedtuple "collections.namedtuple")，用来将文件对象关联到其下层的文件描述符、选定事件掩码和附加数据等。它会被某些 [`BaseSelector`](#selectors.BaseSelector "selectors.BaseSelector") 方法返回。

fileobj[¶](#selectors.SelectorKey.fileobj "Link to this definition")

已注册的文件对象。

fd[¶](#selectors.SelectorKey.fd "Link to this definition")

下层的文件描述符。

events[¶](#selectors.SelectorKey.events "Link to this definition")

必须在此文件对象上被等待的事件。

data[¶](#selectors.SelectorKey.data "Link to this definition")

可选的关联到此文件对象的不透明数据：例如，这可被用来存储各个客户端的会话 ID。

_class_ selectors.BaseSelector[¶](#selectors.BaseSelector "Link to this definition")

一个 [`BaseSelector`](#selectors.BaseSelector "selectors.BaseSelector")，用来在多个文件对象上等待 I/O 事件就绪。它支持文件流注册、注销，以及在这些流上等待 I/O 事件的方法。它是一个抽象基类，因此不能被实例化。请改用 [`DefaultSelector`](#selectors.DefaultSelector "selectors.DefaultSelector")，或者 [`SelectSelector`](#selectors.SelectSelector "selectors.SelectSelector"), [`KqueueSelector`](#selectors.KqueueSelector "selectors.KqueueSelector") 等。 如果你想要指明使用某个实现，并且你的平台支持它的话。 `BaseSelector` 及其具体实现支持 [context manager](https://docs.python.org/zh-cn/3/glossary.html#term-context-manager) 协议。

_abstractmethod_ register(_fileobj_, _events_, _data\=None_)[¶](#selectors.BaseSelector.register "Link to this definition")

注册一个用于选择的文件对象，在其上监视 I/O 事件。

_fileobj_ 是要监视的文件对象。它可以是整数形式的文件描述符或者具有 `fileno()` 方法的对象。 _events_ 是要监视的事件的位掩码。 _data_ 是一个不透明对象。

这将返回一个新的 [`SelectorKey`](#selectors.SelectorKey "selectors.SelectorKey") 实例，或在出现无效事件掩码或文件描述符时引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")，或在文件对象已被注册时引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError")。

_abstractmethod_ unregister(_fileobj_)[¶](#selectors.BaseSelector.unregister "Link to this definition")

注销对一个文件对象的选择，移除对它的监视。在文件对象被关闭之前应当先将其注销。

_fileobj_ 必须是之前已注册的文件对象。

这将返回已关联的 [`SelectorKey`](#selectors.SelectorKey "selectors.SelectorKey") 实例，或者如果 _fileobj_ 未注册则会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError")。如果 _fileobj_ 无效（例如它没有 `fileno()` 方法或其 `fileno()` 方法返回无效值）则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError").

modify(_fileobj_, _events_, _data\=None_)[¶](#selectors.BaseSelector.modify "Link to this definition")

更改已注册文件对象所监视的事件或所附带的数据。

这等价于 `BaseSelector.unregister(fileobj)` 加 `BaseSelector.register(fileobj, events, data)`，区别在于它可以被更高效地实现。

这将返回一个新的 [`SelectorKey`](#selectors.SelectorKey "selectors.SelectorKey") 实例，或在出现无效事件掩码或文件描述符时引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")，或在文件对象未被注册时引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError")。

_abstractmethod_ select(_timeout\=None_)[¶](#selectors.BaseSelector.select "Link to this definition")

等待直到有已注册的文件对象就绪，或是超过时限。

如果 `timeout > 0`，这指定以秒数表示的最大等待时间。如果 `timeout <= 0`，调用将不会阻塞，并将报告当前就绪的文件对象。如果 _timeout_ 为 `None`，调用将阻塞直到某个被监视的文件对象就绪。

这将返回由 `(key, events)` 元组构成的列表，每项各表示一个就绪的文件对象。

_key_ 是对应于就绪文件对象的 [`SelectorKey`](#selectors.SelectorKey "selectors.SelectorKey") 实例。 _events_ 是在此文件对象上就绪的事件位掩码。

备注

如果当前进程收到一个信号，此方法可在任何文件对象就绪之前或超出时限时返回：在此情况下，将返回一个空列表。

在 3.5 版本发生变更: 现在当被某个信号中断时，如果信号处理程序没有引发异常，选择器会用重新计算的超时值进行重试（请查看 [**PEP 475**](https://peps.python.org/pep-0475/) 了解其理由），而不是在超时之前返回空的事件列表。

close()[¶](#selectors.BaseSelector.close "Link to this definition")

关闭选择器。

必须调用这个方法以确保下层资源会被释放。选择器被关闭后将不可再使用。

get\_key(_fileobj_)[¶](#selectors.BaseSelector.get_key "Link to this definition")

返回关联到某个已注册文件对象的键。

此方法将返回关联到文件对象的 [`SelectorKey`](#selectors.SelectorKey "selectors.SelectorKey") 实例，或在文件对象未注册时引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError")。

_abstractmethod_ get\_map()[¶](#selectors.BaseSelector.get_map "Link to this definition")

返回从文件对象到选择器键的映射。

这将返回一个将已注册文件对象映射到与其相关联的 [`SelectorKey`](#selectors.SelectorKey "selectors.SelectorKey") 实例的 [`Mapping`](https://docs.python.org/zh-cn/3/library/collections.abc.html#collections.abc.Mapping "collections.abc.Mapping") 实例。

_class_ selectors.DefaultSelector[¶](#selectors.DefaultSelector "Link to this definition")

默认的选择器类，使用当前平台上可用的最高效实现。这应为大多数用户的默认选择。

_class_ selectors.SelectSelector[¶](#selectors.SelectSelector "Link to this definition")

基于 [`select.select()`](https://docs.python.org/zh-cn/3/library/select.html#select.select "select.select") 的选择器。

_class_ selectors.PollSelector[¶](#selectors.PollSelector "Link to this definition")

基于 [`select.poll()`](https://docs.python.org/zh-cn/3/library/select.html#select.poll "select.poll") 的选择器。

_class_ selectors.EpollSelector[¶](#selectors.EpollSelector "Link to this definition")

基于 [`select.epoll()`](https://docs.python.org/zh-cn/3/library/select.html#select.epoll "select.epoll") 的选择器。

fileno()[¶](#selectors.EpollSelector.fileno "Link to this definition")

此方法将返回由下层 [`select.epoll()`](https://docs.python.org/zh-cn/3/library/select.html#select.epoll "select.epoll") 对象所使用的文件描述符。

_class_ selectors.DevpollSelector[¶](#selectors.DevpollSelector "Link to this definition")

基于 [`select.devpoll()`](https://docs.python.org/zh-cn/3/library/select.html#select.devpoll "select.devpoll") 的选择器。

fileno()[¶](#selectors.DevpollSelector.fileno "Link to this definition")

此方法将返回由下层 [`select.devpoll()`](https://docs.python.org/zh-cn/3/library/select.html#select.devpoll "select.devpoll") 对象所使用的文件描述符。

Added in version 3.5.

_class_ selectors.KqueueSelector[¶](#selectors.KqueueSelector "Link to this definition")

基于 [`select.kqueue()`](https://docs.python.org/zh-cn/3/library/select.html#select.kqueue "select.kqueue") 的选择器。

fileno()[¶](#selectors.KqueueSelector.fileno "Link to this definition")

此方法将返回由下层 [`select.kqueue()`](https://docs.python.org/zh-cn/3/library/select.html#select.kqueue "select.kqueue") 对象所使用的文件描述符。

## 例子[¶](#examples "Link to this heading")

下面是一个简单的回显服务器实现:

import selectors
import socket

sel \= selectors.DefaultSelector()

def accept(sock, mask):
    conn, addr \= sock.accept()  \# 应当已就绪
    print('accepted', conn, 'from', addr)
    conn.setblocking(False)
    sel.register(conn, selectors.EVENT\_READ, read)

def read(conn, mask):
    data \= conn.recv(1000)  \# 应当已就绪
    if data:
        print('echoing', repr(data), 'to', conn)
        conn.send(data)  \# 希望不会阻塞
    else:
        print('closing', conn)
        sel.unregister(conn)
        conn.close()

sock \= socket.socket()
sock.bind(('localhost', 1234))
sock.listen(100)
sock.setblocking(False)
sel.register(sock, selectors.EVENT\_READ, accept)

while True:
    events \= sel.select()
    for key, mask in events:
        callback \= key.data
        callback(key.fileobj, mask)
