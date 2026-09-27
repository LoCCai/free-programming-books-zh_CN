随着PHP7.4而来的有一个我认为非常有用的一个扩展:PHP FFI(Foreign Function interface), 引用一段PHP FFI RFC中的一段描述:

> For PHP, FFI opens a way to write PHP extensions and bindings to C libraries in pure PHP.

是的，FFI提供了高级语言直接的互相调用，而对于PHP来说，FFI让我们可以方便的调用C语言写的各种库。

最近我们的服务在升级php使用的libcurl, 期望新版本的libcurl支持毫秒级的超时, 从而可以更加精细的控制后端的接口超时, 从而提高整体响应时间.  
但是, 我们却发现, 在我们的CentOS服务器上, 当你设置了小于1000ms的超时以后, curl不会发起任何请求, 而直接返回超时错误(Timeout reached 28).  
原来, 这里面有一个坑, CURL默认的, 在Linux系统上, 如果使用了系统标准的DNS解析, 则会使用SIGALARM来提供控制域名解析超时的功能, 但是SIGALARM不支持小于1s的超时, 于是在libcurl 7.28.1的代码中...

在使用curl做POST的时候, 当要POST的数据大于1024字节的时候, curl并不会直接就发起POST请求, 而是会分为俩步,

  1. 发送一个请求, 包含一个Expect:100-continue, 询问Server使用愿意接受数据
  2. 接收到Server返回的100-continue应答以后, 才把数据POST给Server
