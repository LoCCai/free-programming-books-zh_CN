* * *

该模块提供了对 `select()` 和 `poll()` 函数的访问，这在大多数操作系统上都是可用的，`devpoll()` 在 Solaris 及其衍生系统上可用，`epoll()` 在 Linux 2.5+ 上可用，而 `kqueue()` 在大多数 BSD 上可用。注意在 Windows 上，它仅适用于套接字；在其他操作系统上，它还适用于其他文件类型（特别是在 Unix 上，它还适用于管道）。 它不能被用在常规文件上确定一个文件自其最后一次被读取后大小是否有增长。

备注

[`selectors`](https://docs.python.org/zh-cn/3/library/selectors.html#module-selectors "selectors: High-level I/O multiplexing.") 模块允许高层级且高效的 I/O 利用，它构建于 `select` 模块原语的基础之上。 推荐用户改用 `selectors` 模块，除非用户希望对所用的 OS 层级原语进行精确控制。

该模块定义以下内容：

_exception_ select.error[¶](#select.error "Link to this definition")

一个被弃用的 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 的别名。

select.devpoll()[¶](#select.devpoll "Link to this definition")

返回一个 `/dev/poll` 轮询对象；请参阅下面的 [/dev/poll polling objects](#devpoll-objects) 一节了解 devpoll 对象所支持的方法。

`devpoll()` 对象与实例化时允许的文件描述符数量相关联。如果你的程序减少该值，`devpoll()` 将会失败。 如果你的程序增加该值，`devpoll()` 可能会返回不完整的活动文件描述符列表。

新的文件描述符是 [不可继承的](https://docs.python.org/zh-cn/3/library/os.html#fd-inheritance)。

Added in version 3.3.

在 3.4 版本发生变更: 新的文件描述符现在是不可继承的。

select.epoll(_sizehint\=\-1_, _flags\=0_)[¶](#select.epoll "Link to this definition")

返回一个 edge 轮询对象，它可被用作 I/O 事件的 Edge 或 Level 触发接口。

_sizehint_ 通知 epoll 预计要注册的事件数量。该值必须为正数，或为 `-1` 以使用默认值。它仅在 `epoll_create1()` 不可用的旧系统上会被使用，在其他情况下它没有任何作用（尽管仍会检查其值）。

_flags_ 已经弃用且完全被忽略。但是，如果提供该值，则它必须是 `0` 或 `select.EPOLL_CLOEXEC`，否则会抛出 `OSError` 异常。

请参阅下方 [Edge and level trigger polling (epoll) objects](#epoll-objects) 获取 epoll 对象所支持的方法。

`epoll` 对象支持上下文管理器：当在 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句中使用时，新建的文件描述符会在运行至语句块结束时自动关闭。

新的文件描述符是 [不可继承的](https://docs.python.org/zh-cn/3/library/os.html#fd-inheritance)。

在 3.3 版本发生变更: 增加了 _flags_ 参数。

在 3.4 版本发生变更: 增加了对 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句的支持。新的文件描述符现在是不可继承的。

自 3.4 版本弃用: _flags_ 参数。现在默认采用 `select.EPOLL_CLOEXEC` 标志。使用 [`os.set_inheritable()`](https://docs.python.org/zh-cn/3/library/os.html#os.set_inheritable "os.set_inheritable") 来让文件描述符可继承。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): Linux >= 2.5.44.

select.poll()[¶](#select.poll "Link to this definition")

返回一个轮询对象，它支持注册和注销文件描述符，然后轮询它们以获取 I/O 事件；请参阅下面的 [Polling objects](#poll-objects) 一节了解轮询对象支持的方法。

select.kqueue()[¶](#select.kqueue "Link to this definition")

返回一个内核队列对象；请参阅下面的 [Kqueue objects](#kqueue-objects) 一节了解 kqueue 对象支持的方法。

新的文件描述符是 [不可继承的](https://docs.python.org/zh-cn/3/library/os.html#fd-inheritance)。

在 3.4 版本发生变更: 新的文件描述符现在是不可继承的。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): BSD, macOS.

select.kevent(_ident_, _filter\=KQ\_FILTER\_READ_, _flags\=KQ\_EV\_ADD_, _fflags\=0_, _data\=0_, _udata\=0_)[¶](#select.kevent "Link to this definition")

Returns a kernel event object; see section [Kevent objects](#kevent-objects) below for the methods supported by kevent objects.

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): BSD, macOS.

select.select(_rlist_, _wlist_, _xlist_, _timeout\=None_)[¶](#select.select "Link to this definition")

这是一个明白直观的 Unix `select()` 系统调用接口。 前三个参数是产生“可等待对象”的可迭代对象：可以是代表文件描述符的整数，或是带有名为 [`fileno()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.fileno "io.IOBase.fileno") 的返回这样的整数的无形参方法的对象：

-   _rlist_：等待，直到可以开始读取
    
-   _wlist_：等待，直到可以开始写入
    
-   _xlist_：等待“异常情况”（请参阅当前系统的手册，以获取哪些情况称为异常情况）
    

允许空的可迭代对象，但是否接受三个空的可迭代对象则取决于具体平台。 （已知在 Unix 上可以但在 Windows 上不可以）。可选的 _timeout_ 参数以一个浮点数字表示超时秒数。当 _timeout_ 参数被省略或为 `None` 时，该函数将阻塞直到至少有一个文件描述符准备就绪。超时值为零表示执行轮询且永不阻塞。

返回值是三个列表，包含已就绪对象，返回的三个列表是前三个参数的子集。当超时时间已到且没有文件描述符就绪时，返回三个空列表。

可迭代对象中可接受的对象类型有 Python [文件对象](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) (例如 `sys.stdin` 以及 [`open()`](https://docs.python.org/zh-cn/3/builtins/functions.html#open "open") 或 [`os.popen()`](https://docs.python.org/zh-cn/3/library/os.html#os.popen "os.popen") 所返回的对象)，由 [`socket.socket()`](https://docs.python.org/zh-cn/3/library/socket.html#socket.socket "socket.socket") 返回的套接字对象等。 你也可以自定义一个 _wrapper_ 类，只要它具有适当的 [`fileno()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.fileno "io.IOBase.fileno") 方法（该方法要确实返回一个文件描述符，而不能只是一个随机整数）。

备注

在 Windows 上不接受文件对象，但可以接受套接字。在 Windows 上，底层的 `select()` 函数由 WinSock 库提供，且不会处理不是源自 WinSock 的文件描述符。

在 3.5 版本发生变更: 现在，当本函数被信号中断时，重试超时将从头开始计时，不会抛出 [`InterruptedError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#InterruptedError "InterruptedError") 异常。除非信号处理程序抛出异常 (相关原理请参阅 [**PEP 475**](https://peps.python.org/pep-0475/))。

select.PIPE\_BUF[¶](#select.PIPE_BUF "Link to this definition")

The minimum number of bytes which can be written without blocking to a pipe when the pipe has been reported as ready for writing by [`select()`](#select.select "select.select"), `poll()` or another interface in this module. This doesn't apply to other kinds of file-like objects such as sockets.

POSIX 上须保证该值不小于 512。

Added in version 3.2.

## `/dev/poll` polling objects[¶](#dev-poll-polling-objects "Link to this heading")

Solaris 及其衍生版本具有 `/dev/poll`。而 `select()` 为 _O_(_最高文件描述符_) 并且 `poll()` 为 _O_(_文件描述符数量_), `/dev/poll` 为 _O_(_活动的文件描述符_)。

`/dev/poll` 的行为非常接近标准 `poll()` 对象。

devpoll.close()[¶](#select.devpoll.close "Link to this definition")

关闭轮询对象的文件描述符。

Added in version 3.4.

devpoll.closed[¶](#select.devpoll.closed "Link to this definition")

如果轮询对象已关闭，则返回 `True`。

Added in version 3.4.

devpoll.fileno()[¶](#select.devpoll.fileno "Link to this definition")

返回轮询对象的文件描述符对应的数字。

Added in version 3.4.

devpoll.register(_fd_\[, _eventmask_\])[¶](#select.devpoll.register "Link to this definition")

在轮询对象中注册文件描述符。这样，将来调用 [`poll()`](#select.poll "select.poll") 方法时将检查文件描述符是否有未处理的 I/O 事件。_fd_ 可以是整数，也可以是带有 [`fileno()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.fileno "io.IOBase.fileno") 方法的对象（该方法返回一个整数）。文件对象已经实现了 `fileno()`，因此它们也可以用作参数。

_eventmask_ is an optional bitmask describing the type of events you want to check for. The constants are the same as with `poll()` object. The default value is a combination of the constants `POLLIN`, `POLLPRI`, and `POLLOUT`.

警告

注册已注册的文件描述符不会报错，但结果是未定义的。适当的做法是先注销或修改它。这是与 `poll()` 的一个重要区别。

devpoll.modify(_fd_\[, _eventmask_\])[¶](#select.devpoll.modify "Link to this definition")

This method does an [`unregister()`](#select.devpoll.unregister "select.devpoll.unregister") followed by a [`register()`](#select.devpoll.register "select.devpoll.register"). It is (a bit) more efficient than doing the same explicitly.

devpoll.unregister(_fd_)[¶](#select.devpoll.unregister "Link to this definition")

删除轮询对象正在跟踪的某个文件描述符。与 [`register()`](#select.devpoll.register "select.devpoll.register") 方法类似，_fd_ 可以是整数，也可以是带有 [`fileno()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.fileno "io.IOBase.fileno") 方法的对象（该方法返回一个整数）。

尝试删除从未注册过的文件描述符将被安全地忽略。

devpoll.poll(\[_timeout_\])[¶](#select.devpoll.poll "Link to this definition")

轮询已注册的文件描述符的集合，并返回一个列表，列表可能为空，也可能有多个 `(fd, event)` 2 元组，其中包含了要报告事件或错误的描述符。 _fd_ 是文件描述符，_event_ 是一个位掩码，表示该描述符所报告的事件 --- `POLLIN` 表示等待输入，`POLLOUT` 表示该描述符可以写入，依此类推。空列表表示调用超时，没有任何文件描述符报告事件。如果指定了 _timeout_，它将指定系统等待事件时，等待多长时间后返回（以毫秒为单位）。如果 _timeout_ 被省略、为 -1 或为 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")，则本调用将阻塞，直到轮询对象发生事件为止。

在 3.5 版本发生变更: 现在，当本函数被信号中断时，重试超时将从头开始计时，不会抛出 [`InterruptedError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#InterruptedError "InterruptedError") 异常。除非信号处理程序抛出异常 (相关原理请参阅 [**PEP 475**](https://peps.python.org/pep-0475/))。

## Edge and level trigger polling (epoll) objects[¶](#edge-and-level-trigger-polling-epoll-objects "Link to this heading")

> [https://linux.die.net/man/4/epoll](https://linux.die.net/man/4/epoll)
> 
> The _eventmask_ is a bit mask using the following constants:
> 
> | 
> 常量
> 
>  | 
> 
> 含意
> 
>  |
> | --- | --- |
> | 
> 
> `EPOLLIN`
> 
>  | 
> 
> Available for read.
> 
>  |
> | 
> 
> `EPOLLOUT`
> 
>  | 
> 
> Available for write.
> 
>  |
> | 
> 
> `EPOLLPRI`
> 
>  | 
> 
> Urgent data for read.
> 
>  |
> | 
> 
> `EPOLLERR`
> 
>  | 
> 
> Error condition happened on the associated fd.
> 
>  |
> | 
> 
> `EPOLLHUP`
> 
>  | 
> 
> Hang up happened on the associated fd.
> 
>  |
> | 
> 
> `EPOLLET`
> 
>  | 
> 
> Set Edge Trigger behavior, the default is Level Trigger behavior.
> 
>  |
> | 
> 
> `EPOLLONESHOT`
> 
>  | 
> 
> Set one-shot behavior. After one event is pulled out, the fd is internally disabled.
> 
>  |
> | 
> 
> `EPOLLEXCLUSIVE`
> 
>  | 
> 
> Wake only one epoll object when the associated fd has an event. The default (if this flag is not set) is to wake all epoll objects polling on an fd.
> 
>  |
> | 
> 
> `EPOLLRDHUP`
> 
>  | 
> 
> 流套接字的对侧关闭了连接或关闭了连接的写入方向。
> 
>  |
> | 
> 
> `EPOLLRDNORM`
> 
>  | 
> 
> 等同于 `EPOLLIN`
> 
>  |
> | 
> 
> `EPOLLRDBAND`
> 
>  | 
> 
> 可以读取优先数据带。
> 
>  |
> | 
> 
> `EPOLLWRNORM`
> 
>  | 
> 
> Equivalent to `EPOLLOUT`.
> 
>  |
> | 
> 
> `EPOLLWRBAND`
> 
>  | 
> 
> 可以写入优先级数据。
> 
>  |
> | 
> 
> `EPOLLMSG`
> 
>  | 
> 
> 忽略
> 
>  |
> | 
> 
> `EPOLLWAKEUP`
> 
>  | 
> 
> 防止在事件等待期间休眠。
> 
>  |
> 
> Added in version 3.6: 增加了 `EPOLLEXCLUSIVE`。仅支持 Linux Kernel 4.5 或更高版本。
> 
> Added in version 3.14: 增加了 `EPOLLWAKEUP`。仅受 Linux 3.5 或更新的内核支持。

epoll.close()[¶](#select.epoll.close "Link to this definition")

关闭用于控制 epoll 对象的文件描述符。

epoll.closed[¶](#select.epoll.closed "Link to this definition")

如果 epoll 对象已关闭，则返回 `True`。

epoll.fileno()[¶](#select.epoll.fileno "Link to this definition")

返回文件描述符对应的数字，该描述符用于控制 epoll 对象。

epoll.fromfd(_fd_)[¶](#select.epoll.fromfd "Link to this definition")

根据给定的文件描述符创建 epoll 对象。

epoll.register(_fd_\[, _eventmask_\])[¶](#select.epoll.register "Link to this definition")

Register a file descriptor _fd_ with the epoll object.

epoll.modify(_fd_, _eventmask_)[¶](#select.epoll.modify "Link to this definition")

Modify a registered file descriptor _fd_.

epoll.unregister(_fd_)[¶](#select.epoll.unregister "Link to this definition")

从 epoll 对象中删除一个已注册的文件描述符。

在 3.9 版本发生变更: 此方法不会再忽略 [`EBADF`](https://docs.python.org/zh-cn/3/library/errno.html#errno.EBADF "errno.EBADF") 错误。

epoll.poll(_timeout\=None_, _maxevents\=\-1_)[¶](#select.epoll.poll "Link to this definition")

等待事件发生，timeout 是浮点数，单位为秒。

在 3.5 版本发生变更: 现在，当本函数被信号中断时，重试超时将从头开始计时，不会抛出 [`InterruptedError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#InterruptedError "InterruptedError") 异常。除非信号处理程序抛出异常 (相关原理请参阅 [**PEP 475**](https://peps.python.org/pep-0475/))。

## Polling objects[¶](#polling-objects "Link to this heading")

大多数 Unix 系统都支持 `poll()` 系统调用，它为网络服务器提供了更好的可伸缩性，可以同时为大量客户端提供服务。 `poll()` 的可伸缩性更好是因为该系统只须列出要关注的文件描述符，而 `select()` 则会构建一个位映射表，打开这个要关注的描述符所对应的比特位，然后再次线性扫描整个位映射表。 `select()` 的复杂度为 _O_(_最高文件描述符_)，而 `poll()` 则为 _O_(_文件描述符的数量_)。

poll.register(_fd_\[, _eventmask_\])[¶](#select.poll.register "Link to this definition")

在轮询对象中注册文件描述符。这样，将来调用 [`poll()`](#select.poll "select.poll") 方法时将检查文件描述符是否有未处理的 I/O 事件。_fd_ 可以是整数，也可以是带有 [`fileno()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.fileno "io.IOBase.fileno") 方法的对象（该方法返回一个整数）。文件对象已经实现了 `fileno()`，因此它们也可以用作参数。

_eventmask_ 是可选的位掩码，用于指定要检查的事件类型，它可以是常量 `POLLIN`、`POLLPRI` 和 `POLLOUT` 的组合，如下表所述。如果未指定本参数，默认将会检查所有 3 种类型的事件。

| 
常量

 | 

含意

 |
| --- | --- |
| 

`POLLIN`

 | 

There is data to read.

 |
| 

`POLLPRI`

 | 

There is urgent data to read.

 |
| 

`POLLOUT`

 | 

Ready for output: writing will not block.

 |
| 

`POLLERR`

 | 

Error condition of some sort.

 |
| 

`POLLHUP`

 | 

Hung up.

 |
| 

`POLLRDHUP`

 | 

Stream socket peer closed connection, or shut down writing half of connection.

 |
| 

`POLLNVAL`

 | 

Invalid request: descriptor not open.

 |

注册已注册过的文件描述符不会报错，且等同于只注册一次该描述符。

poll.modify(_fd_, _eventmask_)[¶](#select.poll.modify "Link to this definition")

修改一个已注册的文件描述符，等同于 `register(fd, eventmask)`。尝试修改未注册的文件描述符会抛出 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 异常，错误码为 `ENOENT`。

poll.unregister(_fd_)[¶](#select.poll.unregister "Link to this definition")

删除轮询对象正在跟踪的某个文件描述符。与 [`register()`](#select.poll.register "select.poll.register") 方法类似，_fd_ 可以是整数，也可以是带有 [`fileno()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.fileno "io.IOBase.fileno") 方法的对象（该方法返回一个整数）。

尝试删除从未注册过的文件描述符会抛出 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError") 异常。

poll.poll(\[_timeout_\])[¶](#select.poll.poll "Link to this definition")

轮询已注册的文件描述符的集合，并返回一个列表，列表可能为空，也可能有多个 `(fd, event)` 2 元组，其中包含了要报告事件或错误的描述符。 _fd_ 是文件描述符，_event_ 是一个位掩码，表示该描述符所报告的事件 --- `POLLIN` 表示等待输入，`POLLOUT` 表示该描述符可以写入，依此类推。空列表表示调用超时，没有任何文件描述符报告事件。如果指定了 _timeout_，它将指定系统等待事件时，等待多长时间后返回（以毫秒为单位）。如果 _timeout_ 被省略、为负数或为 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")，则本调用将阻塞，直到轮询对象发生事件为止。

在 3.5 版本发生变更: 现在，当本函数被信号中断时，重试超时将从头开始计时，不会抛出 [`InterruptedError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#InterruptedError "InterruptedError") 异常。除非信号处理程序抛出异常 (相关原理请参阅 [**PEP 475**](https://peps.python.org/pep-0475/))。

## Kqueue objects[¶](#kqueue-objects "Link to this heading")

kqueue.close()[¶](#select.kqueue.close "Link to this definition")

关闭用于控制 kqueue 对象的文件描述符。

kqueue.closed[¶](#select.kqueue.closed "Link to this definition")

如果 kqueue 对象已关闭，则返回 `True`。

kqueue.fileno()[¶](#select.kqueue.fileno "Link to this definition")

返回文件描述符对应的数字，该描述符用于控制 epoll 对象。

kqueue.fromfd(_fd_)[¶](#select.kqueue.fromfd "Link to this definition")

根据给定的文件描述符创建 kqueue 对象。

kqueue.control(_changelist_, _max\_events_\[, _timeout_\]) → eventlist[¶](#select.kqueue.control "Link to this definition")

Kevent 的低级接口

-   changelist 必须是一个可迭代对象，迭代出 kevent 对象，否则置为 `None`。
    
-   max\_events 必须是 0 或一个正整数。
    
-   timeout 单位为秒（一般为浮点数），默认为 `None`，即永不超时。
    

在 3.5 版本发生变更: 现在，当本函数被信号中断时，重试超时将从头开始计时，不会抛出 [`InterruptedError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#InterruptedError "InterruptedError") 异常。除非信号处理程序抛出异常 (相关原理请参阅 [**PEP 475**](https://peps.python.org/pep-0475/))。

## Kevent objects[¶](#kevent-objects "Link to this heading")

[https://man.freebsd.org/cgi/man.cgi?query=kqueue&sektion=2](https://man.freebsd.org/cgi/man.cgi?query=kqueue&sektion=2)

kevent.ident[¶](#select.kevent.ident "Link to this definition")

用于区分事件的标识值。其解释取决于筛选器，但该值通常是文件描述符。在构造函数中，该标识值可以是整数或带有 [`fileno()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.fileno "io.IOBase.fileno") 方法的对象。kevent 在内部存储整数。

kevent.filter[¶](#select.kevent.filter "Link to this definition")

内核筛选器的名称。

| 
常量

 | 

含意

 |
| --- | --- |
| 

`KQ_FILTER_READ`

 | 

Takes a descriptor and returns whenever there is data available to read.

 |
| 

`KQ_FILTER_WRITE`

 | 

Takes a descriptor and returns whenever there is data available to write.

 |
| 

`KQ_FILTER_AIO`

 | 

AIO requests.

 |
| 

`KQ_FILTER_VNODE`

 | 

Returns when one or more of the requested events watched in _fflag_ occurs.

 |
| 

`KQ_FILTER_PROC`

 | 

Watch for events on a process ID.

 |
| 

`KQ_FILTER_NETDEV`

 | 

Watch for events on a network device (not available on macOS).

 |
| 

`KQ_FILTER_SIGNAL`

 | 

Returns whenever the watched signal is delivered to the process.

 |
| 

`KQ_FILTER_TIMER`

 | 

Establishes an arbitrary timer.

 |

kevent.flags[¶](#select.kevent.flags "Link to this definition")

筛选器操作。

| 
常量

 | 

含意

 |
| --- | --- |
| 

`KQ_EV_ADD`

 | 

Adds or modifies an event.

 |
| 

`KQ_EV_DELETE`

 | 

Removes an event from the queue.

 |
| 

`KQ_EV_ENABLE`

 | 

Permits control() to return the event.

 |
| 

`KQ_EV_DISABLE`

 | 

Disables event.

 |
| 

`KQ_EV_ONESHOT`

 | 

Removes event after first occurrence.

 |
| 

`KQ_EV_CLEAR`

 | 

Reset the state after an event is retrieved.

 |
| 

`KQ_EV_SYSFLAGS`

 | 

Internal event.

 |
| 

`KQ_EV_FLAG1`

 | 

Internal event.

 |
| 

`KQ_EV_EOF`

 | 

Filter-specific EOF condition.

 |
| 

`KQ_EV_ERROR`

 | 

See return values.

 |

kevent.fflags[¶](#select.kevent.fflags "Link to this definition")

Filter-specific flags.

`KQ_FILTER_READ` 和 `KQ_FILTER_WRITE` 筛选标志：

| 
常量

 | 

含意

 |
| --- | --- |
| 

`KQ_NOTE_LOWAT`

 | 

Low water mark of a socket buffer.

 |

`KQ_FILTER_VNODE` 筛选标志：

| 
常量

 | 

含意

 |
| --- | --- |
| 

`KQ_NOTE_DELETE`

 | 

_unlink()_ was called.

 |
| 

`KQ_NOTE_WRITE`

 | 

A write occurred.

 |
| 

`KQ_NOTE_EXTEND`

 | 

The file was extended.

 |
| 

`KQ_NOTE_ATTRIB`

 | 

An attribute was changed.

 |
| 

`KQ_NOTE_LINK`

 | 

The link count has changed.

 |
| 

`KQ_NOTE_RENAME`

 | 

The file was renamed.

 |
| 

`KQ_NOTE_REVOKE`

 | 

Access to the file was revoked.

 |

`KQ_FILTER_PROC` 筛选标志：

| 
常量

 | 

含意

 |
| --- | --- |
| 

`KQ_NOTE_EXIT`

 | 

The process has exited.

 |
| 

`KQ_NOTE_FORK`

 | 

The process has called _fork()_.

 |
| 

`KQ_NOTE_EXEC`

 | 

The process has executed a new process.

 |
| 

`KQ_NOTE_PCTRLMASK`

 | 

Internal filter flag.

 |
| 

`KQ_NOTE_PDATAMASK`

 | 

Internal filter flag.

 |
| 

`KQ_NOTE_TRACK`

 | 

Follow a process across _fork()_.

 |
| 

`KQ_NOTE_CHILD`

 | 

Returned on the child process for _NOTE\_TRACK_.

 |
| 

`KQ_NOTE_TRACKERR`

 | 

Unable to attach to a child.

 |

`KQ_FILTER_NETDEV` 筛选标志（在 macOS 上不可用）：

| 
常量

 | 

含意

 |
| --- | --- |
| 

`KQ_NOTE_LINKUP`

 | 

Link is up.

 |
| 

`KQ_NOTE_LINKDOWN`

 | 

Link is down.

 |
| 

`KQ_NOTE_LINKINV`

 | 

Link state is invalid.

 |

kevent.data[¶](#select.kevent.data "Link to this definition")

Filter-specific data.

kevent.udata[¶](#select.kevent.udata "Link to this definition")

User-defined value.
