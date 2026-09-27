上周的时候Dmitry突然在5.4发布在即的时候, 引入了一个新的配置项:

Added max\_input\_vars directive to prevent attacks based on hash collisions

这个预防的攻击, 就是"通过调用Hash冲突实现各种语言的拒绝服务攻击漏洞"(multiple implementations denial-of-service via hash algorithm collision).

说是, 在Apache的Access Log中会看到很多如下的访问日志:

127.0.0.1 - - \[05/May/2011:10:54:07 +0800\] "OPTIONS \* HTTP/1.0" 200 -
127.0.0.1 - - \[05/May/2011:10:54:08 +0800\] "OPTIONS \* HTTP/1.0" 200 -
127.0.0.1 - - \[05/May/2011:10:54:09 +0800\] "OPTIONS \* HTTP/1.0" 200 -
127.0.0.1 - - \[05/May/2011:10:54:10 +0800\] "OPTIONS \* HTTP/1.0" 200 -

这是什么意思呢?

对于Apache来说, 如果URL和PATH\_INFO中出现%2f(/)或者%5c(\\), 会被认为这是个不合法的请求, Apache将会直接返回404结束.  
对于使用mod\_rewrite做URL改写的情况来说, 可能会比较容易遇到这个问题.  
解决的办法有两种.

1\. 进行俩次encode, /变为%252f
2. 在apache的配置中增加: AllowEncodedSlashes On

具体可以参看:[http://httpd.apache.org/docs/2.2/mod/core.html#allowencodedslashes](http://httpd.apache.org/docs/2.2/mod/core.html#allowencodedslashes)

Filed in [随笔](https://www.laruence.com/category/notes "View all posts in 随笔")

一封通信记录。关于Apache的启动过程的分析。

这个问题已经遇到过俩次了，就是页面中明确指明了编码是UTF8,但是显示是乱码。  
虽然知道解决方法，也知道是Apache的原因，但是一直没有去找其所以然，今天趁机，就研究了一下。  
首先, 关闭PHP配置文件php.ini中的default\_charset:  
1\. 页面没有指定charset ， Apache配置defaultcharst gbk , 页面文件编码是utf-8.....

还是和论文相关，要编写一个Apache的模块，挂在post read\_request阶段，在第一时间，判断一个链接是否是而已连接请求，并在第一时间拒绝恶意连接请求。  
首先遇到的第一个问题，就是需要从http.conf中读取配置信息，提供俩个配置指令，MaxNumber, TimeRange.指定在一段时间内的连接次数上限。  
编写的时候，遇到的第一个问题就是，moudule申明，不能通过编译，编译器提示重复定义。查了N遍手边的apache源码分析，也没有找到原因,如： ........
