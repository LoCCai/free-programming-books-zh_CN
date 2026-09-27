| 部分 III. Linux系统编程 |
| --- |
| [上一页](http://akaedu.github.io/book/ch27.html)  |   |  [下一页](http://akaedu.github.io/book/ch28.html) |

* * *

**目录**

[28\. 文件与I/O](http://akaedu.github.io/book/ch28.html)

[1\. 汇编程序的Hello world](http://akaedu.github.io/book/ch28s01.html)

[2\. C标准I/O库函数与Unbuffered I/O函数](http://akaedu.github.io/book/ch28s02.html)

[3\. open/close](http://akaedu.github.io/book/ch28s03.html)

[4\. read/write](http://akaedu.github.io/book/ch28s04.html)

[5\. lseek](http://akaedu.github.io/book/ch28s05.html)

[6\. fcntl](http://akaedu.github.io/book/ch28s06.html)

[7\. ioctl](http://akaedu.github.io/book/ch28s07.html)

[8\. mmap](http://akaedu.github.io/book/ch28s08.html)

[29\. 文件系统](http://akaedu.github.io/book/ch29.html)

[1\. 引言](http://akaedu.github.io/book/ch29s01.html)

[2\. ext2文件系统](http://akaedu.github.io/book/ch29s02.html)

[2.1. 总体存储布局](http://akaedu.github.io/book/ch29s02.html#id2857323)

[2.2. 实例剖析](http://akaedu.github.io/book/ch29s02.html#id2858019)

[2.3. 数据块寻址](http://akaedu.github.io/book/ch29s02.html#id2859212)

[2.4. 文件和目录操作的系统函数](http://akaedu.github.io/book/ch29s02.html#id2859394)

[3\. VFS](http://akaedu.github.io/book/ch29s03.html)

[3.1. 内核数据结构](http://akaedu.github.io/book/ch29s03.html#id2860264)

[3.2. dup和dup2函数](http://akaedu.github.io/book/ch29s03.html#id2860911)

[30\. 进程](http://akaedu.github.io/book/ch30.html)

[1\. 引言](http://akaedu.github.io/book/ch30s01.html)

[2\. 环境变量](http://akaedu.github.io/book/ch30s02.html)

[3\. 进程控制](http://akaedu.github.io/book/ch30s03.html)

[3.1. fork函数](http://akaedu.github.io/book/ch30s03.html#id2866212)

[3.2. exec函数](http://akaedu.github.io/book/ch30s03.html#id2866732)

[3.3. wait和waitpid函数](http://akaedu.github.io/book/ch30s03.html#id2867242)

[4\. 进程间通信](http://akaedu.github.io/book/ch30s04.html)

[4.1. 管道](http://akaedu.github.io/book/ch30s04.html#id2867812)

[4.2. 其它IPC机制](http://akaedu.github.io/book/ch30s04.html#id2868153)

[5\. 练习：实现简单的Shell](http://akaedu.github.io/book/ch30s05.html)

[31\. Shell脚本](http://akaedu.github.io/book/ch31.html)

[1\. Shell的历史](http://akaedu.github.io/book/ch31s01.html)

[2\. Shell如何执行命令](http://akaedu.github.io/book/ch31s02.html)

[2.1. 执行交互式命令](http://akaedu.github.io/book/ch31s02.html#id2872017)

[2.2. 执行脚本](http://akaedu.github.io/book/ch31s02.html#id2872211)

[3\. Shell的基本语法](http://akaedu.github.io/book/ch31s03.html)

[3.1. 变量](http://akaedu.github.io/book/ch31s03.html#id2872666)

[3.2. 文件名代换（Globbing）：\* ? \[\]](http://akaedu.github.io/book/ch31s03.html#id2872839)

[3.3. 命令代换：\`或 $()](http://akaedu.github.io/book/ch31s03.html#id2872936)

[3.4. 算术代换：$(())](http://akaedu.github.io/book/ch31s03.html#id2872971)

[3.5. 转义字符\\](http://akaedu.github.io/book/ch31s03.html#id2873001)

[3.6. 单引号](http://akaedu.github.io/book/ch31s03.html#id2873083)

[3.7. 双引号](http://akaedu.github.io/book/ch31s03.html#id2873112)

[4\. bash启动脚本](http://akaedu.github.io/book/ch31s04.html)

[4.1. 作为交互登录Shell启动，或者使用--login参数启动](http://akaedu.github.io/book/ch31s04.html#id2873231)

[4.2. 以交互非登录Shell启动](http://akaedu.github.io/book/ch31s04.html#id2873387)

[4.3. 非交互启动](http://akaedu.github.io/book/ch31s04.html#id2873571)

[4.4. 以sh命令启动](http://akaedu.github.io/book/ch31s04.html#id2873616)

[5\. Shell脚本语法](http://akaedu.github.io/book/ch31s05.html)

[5.1. 条件测试：test \[](http://akaedu.github.io/book/ch31s05.html#id2873722)

[5.2. if/then/elif/else/fi](http://akaedu.github.io/book/ch31s05.html#id2874121)

[5.3. case/esac](http://akaedu.github.io/book/ch31s05.html#id2874366)

[5.4. for/do/done](http://akaedu.github.io/book/ch31s05.html#id2874526)

[5.5. while/do/done](http://akaedu.github.io/book/ch31s05.html#id2874637)

[5.6. 位置参数和特殊变量](http://akaedu.github.io/book/ch31s05.html#id2874685)

[5.7. 函数](http://akaedu.github.io/book/ch31s05.html#id2874943)

[6\. Shell脚本的调试方法](http://akaedu.github.io/book/ch31s06.html)

[32\. 正则表达式](http://akaedu.github.io/book/ch32.html)

[1\. 引言](http://akaedu.github.io/book/ch32s01.html)

[2\. 基本语法](http://akaedu.github.io/book/ch32s02.html)

[3\. sed](http://akaedu.github.io/book/ch32s03.html)

[4\. awk](http://akaedu.github.io/book/ch32s04.html)

[5\. 练习：在C语言中使用正则表达式](http://akaedu.github.io/book/ch32s05.html)

[33\. 信号](http://akaedu.github.io/book/ch33.html)

[1\. 信号的基本概念](http://akaedu.github.io/book/ch33s01.html)

[2\. 产生信号](http://akaedu.github.io/book/ch33s02.html)

[2.1. 通过终端按键产生信号](http://akaedu.github.io/book/ch33s02.html#id2884244)

[2.2. 调用系统函数向进程发信号](http://akaedu.github.io/book/ch33s02.html#id2884400)

[2.3. 由软件条件产生信号](http://akaedu.github.io/book/ch33s02.html#id2884567)

[3\. 阻塞信号](http://akaedu.github.io/book/ch33s03.html)

[3.1. 信号在内核中的表示](http://akaedu.github.io/book/ch33s03.html#id2884694)

[3.2. 信号集操作函数](http://akaedu.github.io/book/ch33s03.html#id2884876)

[3.3. sigprocmask](http://akaedu.github.io/book/ch33s03.html#id2885022)

[3.4. sigpending](http://akaedu.github.io/book/ch33s03.html#id2885205)

[4\. 捕捉信号](http://akaedu.github.io/book/ch33s04.html)

[4.1. 内核如何实现信号的捕捉](http://akaedu.github.io/book/ch33s04.html#id2885289)

[4.2. sigaction](http://akaedu.github.io/book/ch33s04.html#id2885439)

[4.3. pause](http://akaedu.github.io/book/ch33s04.html#id2885627)

[4.4. 可重入函数](http://akaedu.github.io/book/ch33s04.html#id2885983)

[4.5. sig\_atomic\_t类型与volatile限定符](http://akaedu.github.io/book/ch33s04.html#id2886197)

[4.6. 竞态条件与sigsuspend函数](http://akaedu.github.io/book/ch33s04.html#id2886686)

[4.7. 关于SIGCHLD信号](http://akaedu.github.io/book/ch33s04.html#id2887260)

[34\. 终端、作业控制与守护进程](http://akaedu.github.io/book/ch34.html)

[1\. 终端](http://akaedu.github.io/book/ch34s01.html)

[1.1. 终端的基本概念](http://akaedu.github.io/book/ch34s01.html#id2890359)

[1.2. 终端登录过程](http://akaedu.github.io/book/ch34s01.html#id2891132)

[1.3. 网络登录过程](http://akaedu.github.io/book/ch34s01.html#id2891618)

[2\. 作业控制](http://akaedu.github.io/book/ch34s02.html)

[2.1. Session与进程组](http://akaedu.github.io/book/ch34s02.html#id2892071)

[2.2. 与作业控制有关的信号](http://akaedu.github.io/book/ch34s02.html#id2892541)

[3\. 守护进程](http://akaedu.github.io/book/ch34s03.html)

[35\. 线程](http://akaedu.github.io/book/ch35.html)

[1\. 线程的概念](http://akaedu.github.io/book/ch35s01.html)

[2\. 线程控制](http://akaedu.github.io/book/ch35s02.html)

[2.1. 创建线程](http://akaedu.github.io/book/ch35s02.html#id2895632)

[2.2. 终止线程](http://akaedu.github.io/book/ch35s02.html#id2896029)

[3\. 线程间同步](http://akaedu.github.io/book/ch35s03.html)

[3.1. mutex](http://akaedu.github.io/book/ch35s03.html#id2896462)

[3.2. Condition Variable](http://akaedu.github.io/book/ch35s03.html#id2895424)

[3.3. Semaphore](http://akaedu.github.io/book/ch35s03.html#id2897332)

[3.4. 其它线程间同步机制](http://akaedu.github.io/book/ch35s03.html#id2897423)

[4\. 编程练习](http://akaedu.github.io/book/ch35s04.html)

[36\. TCP/IP协议基础](http://akaedu.github.io/book/ch36.html)

[1\. TCP/IP协议栈与数据包封装](http://akaedu.github.io/book/ch36s01.html)

[2\. 以太网(RFC 894)帧格式](http://akaedu.github.io/book/ch36s02.html)

[3\. ARP数据报格式](http://akaedu.github.io/book/ch36s03.html)

[4\. IP数据报格式](http://akaedu.github.io/book/ch36s04.html)

[5\. IP地址与路由](http://akaedu.github.io/book/ch36s05.html)

[6\. UDP段格式](http://akaedu.github.io/book/ch36s06.html)

[7\. TCP协议](http://akaedu.github.io/book/ch36s07.html)

[7.1. 段格式](http://akaedu.github.io/book/ch36s07.html#id2900865)

[7.2. 通讯时序](http://akaedu.github.io/book/ch36s07.html#id2900917)

[7.3. 流量控制](http://akaedu.github.io/book/ch36s07.html#id2901189)

[37\. socket编程](http://akaedu.github.io/book/ch37.html)

[1\. 预备知识](http://akaedu.github.io/book/ch37s01.html)

[1.1. 网络字节序](http://akaedu.github.io/book/ch37s01.html#id2902826)

[1.2. socket地址的数据类型及相关函数](http://akaedu.github.io/book/ch37s01.html#id2902915)

[2\. 基于TCP协议的网络程序](http://akaedu.github.io/book/ch37s02.html)

[2.1. 最简单的TCP网络程序](http://akaedu.github.io/book/ch37s02.html#id2902690)

[2.2. 错误处理与读写控制](http://akaedu.github.io/book/ch37s02.html#id2903656)

[2.3. 把client改为交互式输入](http://akaedu.github.io/book/ch37s02.html#id2903862)

[2.4. 使用fork并发处理多个client的请求](http://akaedu.github.io/book/ch37s02.html#id2903959)

[2.5. setsockopt](http://akaedu.github.io/book/ch37s02.html#id2904007)

[2.6. 使用select](http://akaedu.github.io/book/ch37s02.html#id2904122)

[3\. 基于UDP协议的网络程序](http://akaedu.github.io/book/ch37s03.html)

[4\. UNIX Domain Socket IPC](http://akaedu.github.io/book/ch37s04.html)

[5\. 练习：实现简单的Web服务器](http://akaedu.github.io/book/ch37s05.html)

[5.1. 基本HTTP协议](http://akaedu.github.io/book/ch37s05.html#id2904532)

[5.2. 执行CGI程序](http://akaedu.github.io/book/ch37s05.html#id2904687)

* * *

<table summary="Navigation footer"><tbody><tr><td><a accesskey="p" href="http://akaedu.github.io/book/ch27.html">上一页</a>&nbsp;</td><td>&nbsp;</td><td>&nbsp;<a accesskey="n" href="http://akaedu.github.io/book/ch28.html">下一页</a></td></tr><tr><td>第&nbsp;27&nbsp;章&nbsp;本阶段总结&nbsp;</td><td><a accesskey="h" href="http://akaedu.github.io/book/index.html">起始页</a></td><td>&nbsp;第&nbsp;28&nbsp;章&nbsp;文件与I/O</td></tr></tbody></table>
