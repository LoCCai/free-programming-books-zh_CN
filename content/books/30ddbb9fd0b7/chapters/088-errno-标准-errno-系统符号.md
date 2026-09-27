* * *

该模块提供了标准的 `errno` 系统符号。每个符号的值都是相应的整数值。名称和描述借用自 `linux/include/errno.h`，它应该是全包含的。

errno.errorcode[¶](#errno.errorcode "Link to this definition")

提供从 errno 值到底层系统中字符串名称的映射的字典。例如，`errno.errorcode[errno.EPERM]` 映射为 `'EPERM'` .

如果要将数字的错误代码转换为错误信息，请使用 [`os.strerror()`](https://docs.python.org/zh-cn/3/library/os.html#os.strerror "os.strerror")。

在下面的列表中，当前平台上没有使用的符号没有被本模块定义。已定义的符号的具体列表可参见 `errno.errorcode.keys()`。 可用的符号包括：

errno.EPERM[¶](#errno.EPERM "Link to this definition")

操作不允许。这个错误被映射到异常 [`PermissionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#PermissionError "PermissionError")。

errno.ENOENT[¶](#errno.ENOENT "Link to this definition")

没有这样的文件或目录。这个错误被映射到异常 [`FileNotFoundError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#FileNotFoundError "FileNotFoundError")。

errno.ESRCH[¶](#errno.ESRCH "Link to this definition")

没有这样的进程。这个错误被映射到异常 [`ProcessLookupError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ProcessLookupError "ProcessLookupError")。

errno.EINTR[¶](#errno.EINTR "Link to this definition")

系统调用中断。这个错误被映射到异常 [`InterruptedError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#InterruptedError "InterruptedError")。

errno.EIO[¶](#errno.EIO "Link to this definition")

I/O 错误

errno.ENXIO[¶](#errno.ENXIO "Link to this definition")

无此设备或地址

errno.E2BIG[¶](#errno.E2BIG "Link to this definition")

参数列表过长

errno.ENOEXEC[¶](#errno.ENOEXEC "Link to this definition")

执行格式错误

errno.EBADF[¶](#errno.EBADF "Link to this definition")

错误的文件号

errno.ECHILD[¶](#errno.ECHILD "Link to this definition")

没有子进程。这个错误被映射到异常 [`ChildProcessError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ChildProcessError "ChildProcessError")。

errno.EAGAIN[¶](#errno.EAGAIN "Link to this definition")

再试一次。这个错误被映射到异常 [`BlockingIOError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#BlockingIOError "BlockingIOError")。

errno.ENOMEM[¶](#errno.ENOMEM "Link to this definition")

内存不足

errno.EACCES[¶](#errno.EACCES "Link to this definition")

权限被拒绝。这个错误被映射到异常 [`PermissionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#PermissionError "PermissionError")。

errno.EFAULT[¶](#errno.EFAULT "Link to this definition")

错误的地址

errno.ENOTBLK[¶](#errno.ENOTBLK "Link to this definition")

需要块设备

errno.EBUSY[¶](#errno.EBUSY "Link to this definition")

设备或资源忙

errno.EEXIST[¶](#errno.EEXIST "Link to this definition")

文件存在。这个错误被映射到异常 [`FileExistsError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#FileExistsError "FileExistsError")。

errno.EXDEV[¶](#errno.EXDEV "Link to this definition")

跨设备链接

errno.ENODEV[¶](#errno.ENODEV "Link to this definition")

无此设备

errno.ENOTDIR[¶](#errno.ENOTDIR "Link to this definition")

不是一个目录。这个错误被映射到异常 [`NotADirectoryError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#NotADirectoryError "NotADirectoryError")。

errno.EISDIR[¶](#errno.EISDIR "Link to this definition")

是一个目录。这个错误被映射到异常 [`IsADirectoryError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#IsADirectoryError "IsADirectoryError")。

errno.EINVAL[¶](#errno.EINVAL "Link to this definition")

无效的参数

errno.ENFILE[¶](#errno.ENFILE "Link to this definition")

文件表溢出

errno.EMFILE[¶](#errno.EMFILE "Link to this definition")

打开的文件过多

errno.ENOTTY[¶](#errno.ENOTTY "Link to this definition")

不是打字机

errno.ETXTBSY[¶](#errno.ETXTBSY "Link to this definition")

文本文件忙

errno.EFBIG[¶](#errno.EFBIG "Link to this definition")

文件过大

errno.ENOSPC[¶](#errno.ENOSPC "Link to this definition")

设备已无可用空间

errno.ESPIPE[¶](#errno.ESPIPE "Link to this definition")

非法查找

errno.EROFS[¶](#errno.EROFS "Link to this definition")

只读文件系统

errno.EMLINK[¶](#errno.EMLINK "Link to this definition")

链接过多

errno.EPIPE[¶](#errno.EPIPE "Link to this definition")

管道中断。这个错误被映射到异常 [`BrokenPipeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#BrokenPipeError "BrokenPipeError")。

errno.EDOM[¶](#errno.EDOM "Link to this definition")

数学参数超出函数范围

errno.ERANGE[¶](#errno.ERANGE "Link to this definition")

数学运算结果无法表示

errno.EDEADLK[¶](#errno.EDEADLK "Link to this definition")

将发生资源死锁

errno.ENAMETOOLONG[¶](#errno.ENAMETOOLONG "Link to this definition")

文件名过长

errno.ENOLCK[¶](#errno.ENOLCK "Link to this definition")

没有可用的记录锁

errno.ENOSYS[¶](#errno.ENOSYS "Link to this definition")

功能未实现

errno.ENOTEMPTY[¶](#errno.ENOTEMPTY "Link to this definition")

目录非空

errno.ELOOP[¶](#errno.ELOOP "Link to this definition")

遇到过多的符号链接

errno.EWOULDBLOCK[¶](#errno.EWOULDBLOCK "Link to this definition")

操作会阻塞。这个错误被映射到异常 [`BlockingIOError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#BlockingIOError "BlockingIOError")。

errno.ENOMSG[¶](#errno.ENOMSG "Link to this definition")

没有所需类型的消息

errno.EIDRM[¶](#errno.EIDRM "Link to this definition")

标识符被移除

errno.ECHRNG[¶](#errno.ECHRNG "Link to this definition")

信道编号超出范围

errno.EL2NSYNC[¶](#errno.EL2NSYNC "Link to this definition")

级别 2 未同步

errno.EL3HLT[¶](#errno.EL3HLT "Link to this definition")

级别 3 已停止

errno.EL3RST[¶](#errno.EL3RST "Link to this definition")

级别 3 重置

errno.ELNRNG[¶](#errno.ELNRNG "Link to this definition")

链接编号超出范围

errno.EUNATCH[¶](#errno.EUNATCH "Link to this definition")

未附加协议驱动

errno.ENOCSI[¶](#errno.ENOCSI "Link to this definition")

没有可用的 CSI 结构

errno.EL2HLT[¶](#errno.EL2HLT "Link to this definition")

级别 2 已停止

errno.EBADE[¶](#errno.EBADE "Link to this definition")

无效的交换

errno.EBADR[¶](#errno.EBADR "Link to this definition")

无效的请求描述符

errno.EXFULL[¶](#errno.EXFULL "Link to this definition")

交换已满

errno.ENOANO[¶](#errno.ENOANO "Link to this definition")

没有阳极

errno.EBADRQC[¶](#errno.EBADRQC "Link to this definition")

无效的请求码

errno.EBADSLT[¶](#errno.EBADSLT "Link to this definition")

无效的槽位

errno.EDEADLOCK[¶](#errno.EDEADLOCK "Link to this definition")

文件锁定死锁错误

errno.EBFONT[¶](#errno.EBFONT "Link to this definition")

错误的字体文件格式

errno.ENOSTR[¶](#errno.ENOSTR "Link to this definition")

设备不是流

errno.ENODATA[¶](#errno.ENODATA "Link to this definition")

没有可用的数据

errno.ETIME[¶](#errno.ETIME "Link to this definition")

计时器已到期

errno.ENOSR[¶](#errno.ENOSR "Link to this definition")

流资源不足

errno.ENONET[¶](#errno.ENONET "Link to this definition")

机器不在网络上

errno.ENOPKG[¶](#errno.ENOPKG "Link to this definition")

包未安装

errno.EREMOTE[¶](#errno.EREMOTE "Link to this definition")

对象是远程的

errno.ENOLINK[¶](#errno.ENOLINK "Link to this definition")

链接已被切断

errno.EADV[¶](#errno.EADV "Link to this definition")

广告错误

errno.ESRMNT[¶](#errno.ESRMNT "Link to this definition")

挂载错误

errno.ECOMM[¶](#errno.ECOMM "Link to this definition")

发送时通讯错误

errno.EPROTO[¶](#errno.EPROTO "Link to this definition")

协议错误

errno.EMULTIHOP[¶](#errno.EMULTIHOP "Link to this definition")

已尝试多跳

errno.EDOTDOT[¶](#errno.EDOTDOT "Link to this definition")

RFS 专属错误

errno.EBADMSG[¶](#errno.EBADMSG "Link to this definition")

非数据消息

errno.EOVERFLOW[¶](#errno.EOVERFLOW "Link to this definition")

值相对于已定义数据类型过大

errno.ENOTUNIQ[¶](#errno.ENOTUNIQ "Link to this definition")

名称在网络上不唯一

errno.EBADFD[¶](#errno.EBADFD "Link to this definition")

文件描述符处于错误状态

errno.EREMCHG[¶](#errno.EREMCHG "Link to this definition")

远端地址已改变

errno.ELIBACC[¶](#errno.ELIBACC "Link to this definition")

无法访问所需的共享库

errno.ELIBBAD[¶](#errno.ELIBBAD "Link to this definition")

访问已损坏的共享库

errno.ELIBSCN[¶](#errno.ELIBSCN "Link to this definition")

a.out 中的 .lib 部分已损坏

errno.ELIBMAX[¶](#errno.ELIBMAX "Link to this definition")

尝试链接过多的共享库

errno.ELIBEXEC[¶](#errno.ELIBEXEC "Link to this definition")

无法直接执行共享库

errno.EILSEQ[¶](#errno.EILSEQ "Link to this definition")

非法字节序列

errno.ERESTART[¶](#errno.ERESTART "Link to this definition")

已中断系统调用需要重启

errno.ESTRPIPE[¶](#errno.ESTRPIPE "Link to this definition")

流管道错误

errno.EUSERS[¶](#errno.EUSERS "Link to this definition")

用户过多

errno.ENOTSOCK[¶](#errno.ENOTSOCK "Link to this definition")

在非套接字上执行套接字操作

errno.EDESTADDRREQ[¶](#errno.EDESTADDRREQ "Link to this definition")

需要目标地址

errno.EMSGSIZE[¶](#errno.EMSGSIZE "Link to this definition")

消息过长

errno.EPROTOTYPE[¶](#errno.EPROTOTYPE "Link to this definition")

套接字的协议类型错误

errno.ENOPROTOOPT[¶](#errno.ENOPROTOOPT "Link to this definition")

协议不可用

errno.EPROTONOSUPPORT[¶](#errno.EPROTONOSUPPORT "Link to this definition")

协议不受支持

errno.ESOCKTNOSUPPORT[¶](#errno.ESOCKTNOSUPPORT "Link to this definition")

套接字类型不受支持

errno.EOPNOTSUPP[¶](#errno.EOPNOTSUPP "Link to this definition")

操作在传输端点上不受支持

errno.ENOTSUP[¶](#errno.ENOTSUP "Link to this definition")

操作不受支持

Added in version 3.2.

errno.EPFNOSUPPORT[¶](#errno.EPFNOSUPPORT "Link to this definition")

协议族不受支持

errno.EAFNOSUPPORT[¶](#errno.EAFNOSUPPORT "Link to this definition")

地址族不受协议支持

errno.EADDRINUSE[¶](#errno.EADDRINUSE "Link to this definition")

地址已被使用

errno.EADDRNOTAVAIL[¶](#errno.EADDRNOTAVAIL "Link to this definition")

无法分配要求的地址

errno.ENETDOWN[¶](#errno.ENETDOWN "Link to this definition")

网络已断开

errno.ENETUNREACH[¶](#errno.ENETUNREACH "Link to this definition")

网络不可达

errno.ENETRESET[¶](#errno.ENETRESET "Link to this definition")

网络因重置而断开连接

errno.ECONNABORTED[¶](#errno.ECONNABORTED "Link to this definition")

软件导致连接中止。这个错误被映射到异常 [`ConnectionAbortedError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ConnectionAbortedError "ConnectionAbortedError")。

errno.ECONNRESET[¶](#errno.ECONNRESET "Link to this definition")

连接被对方重置。这个错误被映射到异常 [`ConnectionResetError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ConnectionResetError "ConnectionResetError")。

errno.ENOBUFS[¶](#errno.ENOBUFS "Link to this definition")

没有可用的缓冲区空间

errno.EISCONN[¶](#errno.EISCONN "Link to this definition")

传输端点已连接

errno.ENOTCONN[¶](#errno.ENOTCONN "Link to this definition")

传输端点未连接

errno.ESHUTDOWN[¶](#errno.ESHUTDOWN "Link to this definition")

在传输端点关闭后无法发送。这个错误被映射到异常 [`BrokenPipeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#BrokenPipeError "BrokenPipeError")。

errno.ETOOMANYREFS[¶](#errno.ETOOMANYREFS "Link to this definition")

引用过多：无法拼接

errno.ETIMEDOUT[¶](#errno.ETIMEDOUT "Link to this definition")

连接超时。这个错误被映射到异常 [`TimeoutError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TimeoutError "TimeoutError")。

errno.ECONNREFUSED[¶](#errno.ECONNREFUSED "Link to this definition")

连接被拒绝。这个错误被映射到异常 [`ConnectionRefusedError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ConnectionRefusedError "ConnectionRefusedError")。

errno.EHOSTDOWN[¶](#errno.EHOSTDOWN "Link to this definition")

主机已关闭

errno.EHOSTUNREACH[¶](#errno.EHOSTUNREACH "Link to this definition")

没有到主机的路由

errno.EHWPOISON[¶](#errno.EHWPOISON "Link to this definition")

内存页存在硬件错误。

Added in version 3.14.

errno.EALREADY[¶](#errno.EALREADY "Link to this definition")

操作已经在进行中。这个错误被映射到异常 [`BlockingIOError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#BlockingIOError "BlockingIOError")。

errno.EINPROGRESS[¶](#errno.EINPROGRESS "Link to this definition")

操作现在正在进行中。这个错误被映射到异常 [`BlockingIOError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#BlockingIOError "BlockingIOError")。

errno.ESTALE[¶](#errno.ESTALE "Link to this definition")

过期的 NFS 文件句柄

errno.EUCLEAN[¶](#errno.EUCLEAN "Link to this definition")

结构需要清理

errno.ENOTNAM[¶](#errno.ENOTNAM "Link to this definition")

不是 XENIX 命名类型文件

errno.ENAVAIL[¶](#errno.ENAVAIL "Link to this definition")

没有可用的 XENIX 信号量

errno.EISNAM[¶](#errno.EISNAM "Link to this definition")

是命名类型文件

errno.EREMOTEIO[¶](#errno.EREMOTEIO "Link to this definition")

远程 I/O 错误

errno.EDQUOT[¶](#errno.EDQUOT "Link to this definition")

超出配额

errno.EQFULL[¶](#errno.EQFULL "Link to this definition")

接口输出队列已满

Added in version 3.11.

errno.ENOMEDIUM[¶](#errno.ENOMEDIUM "Link to this definition")

未找到媒介

errno.EMEDIUMTYPE[¶](#errno.EMEDIUMTYPE "Link to this definition")

错误的媒介类型

errno.ENOKEY[¶](#errno.ENOKEY "Link to this definition")

需要的密钥不可用

errno.EKEYEXPIRED[¶](#errno.EKEYEXPIRED "Link to this definition")

密钥已到期

errno.EKEYREVOKED[¶](#errno.EKEYREVOKED "Link to this definition")

密钥已被撤销

errno.EKEYREJECTED[¶](#errno.EKEYREJECTED "Link to this definition")

密钥被服务拒绝

errno.ERFKILL[¶](#errno.ERFKILL "Link to this definition")

操作因 RF-kill 而无法执行

errno.ELOCKUNMAPPED[¶](#errno.ELOCKUNMAPPED "Link to this definition")

锁定的锁未被映射

errno.ENOTACTIVE[¶](#errno.ENOTACTIVE "Link to this definition")

功能未被激活

errno.EAUTH[¶](#errno.EAUTH "Link to this definition")

认证错误

Added in version 3.2.

errno.EBADARCH[¶](#errno.EBADARCH "Link to this definition")

可执行文件中有错误的 CPU 类型

Added in version 3.2.

errno.EBADEXEC[¶](#errno.EBADEXEC "Link to this definition")

错误的可执行文件（或共享库）

Added in version 3.2.

errno.EBADMACHO[¶](#errno.EBADMACHO "Link to this definition")

畸形的 Mach-o 文件

Added in version 3.2.

errno.EDEVERR[¶](#errno.EDEVERR "Link to this definition")

设备错误

Added in version 3.2.

errno.EFTYPE[¶](#errno.EFTYPE "Link to this definition")

不正确的文件类型或格式

Added in version 3.2.

errno.ENEEDAUTH[¶](#errno.ENEEDAUTH "Link to this definition")

需要认证

Added in version 3.2.

errno.ENOATTR[¶](#errno.ENOATTR "Link to this definition")

属性未找到

Added in version 3.2.

errno.ENOPOLICY[¶](#errno.ENOPOLICY "Link to this definition")

策略未找到

Added in version 3.2.

errno.EPROCLIM[¶](#errno.EPROCLIM "Link to this definition")

进程过多

Added in version 3.2.

errno.EPROCUNAVAIL[¶](#errno.EPROCUNAVAIL "Link to this definition")

错误的程序步骤

Added in version 3.2.

errno.EPROGMISMATCH[¶](#errno.EPROGMISMATCH "Link to this definition")

程序版本错误

Added in version 3.2.

errno.EPROGUNAVAIL[¶](#errno.EPROGUNAVAIL "Link to this definition")

RPC 程序不可用

Added in version 3.2.

errno.EPWROFF[¶](#errno.EPWROFF "Link to this definition")

设备电源关闭

Added in version 3.2.

errno.EBADRPC[¶](#errno.EBADRPC "Link to this definition")

RPC 结构错误

Added in version 3.2.

errno.ERPCMISMATCH[¶](#errno.ERPCMISMATCH "Link to this definition")

RPC 版本错误

Added in version 3.2.

errno.ESHLIBVERS[¶](#errno.ESHLIBVERS "Link to this definition")

共享库版本不匹配

Added in version 3.2.

errno.ENOTCAPABLE[¶](#errno.ENOTCAPABLE "Link to this definition")

功能不足。此错误被映射到异常 [`PermissionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#PermissionError "PermissionError")。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): WASI, FreeBSD

Added in version 3.11.1.

errno.ECANCELED[¶](#errno.ECANCELED "Link to this definition")

操作已被取消

Added in version 3.2.

errno.EOWNERDEAD[¶](#errno.EOWNERDEAD "Link to this definition")

所有者已不存在

Added in version 3.2.

errno.ENOTRECOVERABLE[¶](#errno.ENOTRECOVERABLE "Link to this definition")

状态无法恢复

Added in version 3.2.
