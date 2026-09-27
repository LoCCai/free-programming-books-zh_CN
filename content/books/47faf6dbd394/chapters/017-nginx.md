现在普遍的Nginx + PHP cgi的做法是在配置文件中,　通过正则匹配(Nginx(PHP/fastcgi)的PATH\_INFO问题)设置SCRIPT\_FILENAME, 今天[小顿](http://www.80sec.com/)发现了一个这种方式的安全漏洞.  
比如, 有http://www.laruence.com/fake.jpg, 那么通过构造如下的URL, 就可以看到fake.jpg的二进制内容:

http://www.laruence.com/fake.jpg/foo.php

为什么会这样呢?

通过[在nginx.conf中模拟PATH\_INFO](http://www.laruence.com/2009/11/13/1138.html)的方法会有一个bug. 那就是PATH\_INFO不会被urldecode.  
对于Apache+PHP(php2handler)来说, PATH\_INFO来自Apache, 不会有问题, 对于Apache fastcgi也应该没有问题, 因为PATH\_INFO也是由Apache生成.  
但是对于nginx+fastcgi, 因为对于cgi来说PATH\_INFO来自于ENV(fastcgi\_params), 而php-cgi中的import\_environment\_variables不会对ENV中的变量做urldecode.  
这样, nginx看到的url是urlencode以后的, 从url中分离出来的PATH\_INFO也是urlencode后的, forward给php proxy以后, PHP看到的PATH\_INFO也是urlencode的了.  
所以, 如果在PATH\_INFO中包含一些宽字符, 或者是"+", 那就要注意了, 需要我们主动的urldecode一下再使用.

PATH\_INFO是一个CGI 1.1的标准，经常用来做为传参载体.  
在Apache中, 当不加配置的时候, 对于PHP脚本, AcceptPathInfo是默认接受的, 也就是说:  
如果在服务器在存在一个/laruence/info.php  
那么, 对于如下请求, Apache都接受:

/laruence/info.php/dummy
/laruence/info.php/pathinfo

而对于Nginx下, 默认Nginx是不支持PATH INFO的, 也就是说, 对于上面的访问, 会是404, 提示找不到文件出错.

Nginx是俄罗斯人编写的十分轻量级的HTTP服务器，以事件驱动的方式编写，所以有非常好的性能，同时也是一个非常高效的反向代理、负载平衡。其拥有匹配Lighttpd的性能，同时还没有Lighttpd的内存泄漏问题，而且Lighttpd的mod\_proxy也有一些问题并且很久没有更新。  
因此我打算用其替代Apache应用于Linux服务器上。但是Nginx并不支持cgi方式运行，原因是可以减少因此带来的一些程序上的漏洞。那么我们必须使用FastCGI方式来执行PHP程序。  
下面是我成功地配置Nginx + PHP5 FastCGI的过程
