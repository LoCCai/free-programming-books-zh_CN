让 DeepSeek V4 Pro 给 yaconf 1.2.0 做 compact 存储：随机读快40%、内存省16%——但一次 git 操作弄丢了几百行核心代码。快很重要，稳更重要。

唯一因实现困难而放弃维护的项目 Taint，被 Qwen3.8 复活：2亿 Token、406 元、约5小时，完成这个 XSS/注入检测扩展的 PHP8 适配。

随着PHP7.4而来的有一个我认为非常有用的一个扩展:PHP FFI(Foreign Function interface), 引用一段PHP FFI RFC中的一段描述:

> For PHP, FFI opens a way to write PHP extensions and bindings to C libraries in pure PHP.

是的，FFI提供了高级语言直接的互相调用，而对于PHP来说，FFI让我们可以方便的调用C语言写的各种库。

最近有个感觉, 越来越多的人开始从事PHP扩展开发的工作(越来越多的人来问问题了, 呵呵)  
在这里先说声抱歉, 有的时候, 有的同学的邮件进了垃圾邮件没有办法及时回复.  
为了方便大家, 我在这里罗列一些可能用到的资源.

Filed in [随笔](https://www.laruence.com/category/notes "View all posts in 随笔")

上周的时候, 搞mysql proxy, 发现要用lua写服务器脚本, 加之以前配置lighttpd的时候, 配置也可以用lua来写, 就想彻底学习和研究下lua.  
本着学习Lua的态度, 写了一个PHP扩展Plua, 把Lua解析器嵌入了PHP.  
Lua的堆栈式传参, 很值得借鉴, 这点上, 感觉比PHP用一个结构体表示弱类型, 要来的更严格, 更可靠一些.  
目前可以想到的应用场景, 是可以实现一种编写(Lua), 多处调用(C, PHP, Java等).  
不废话了, 项目主页: [Plua](http://www.laruence.com/plua/)  
代码在Google code上:[http://code.google.com/p/plua/](http://code.google.com/p/plua/)

快有一个月没有更新Blog了, 一来是最近项目比较紧张, 二来就是在忙着开发[Yaf(Yet another Framework)](https://pecl.php.net/yaf)

一直以来, 我研究PHP的内核, 虽然有文章不少, 但却鲜有一些借助这些研究成果而来的, 实际的东西, 也就无法让更多人学习到对Zend API的实际运用.

我思考了一段时间, 觉得有必要写一个扩展出来, 这个扩展要用到很多Zend API, 要用到很多在网上的PHP扩展开发中,鲜有叙及的部分(比如, 实现类/接口, 继承, 自动加载,等等), 让更多的PHP扩展开发者可以借鉴.

cyj网友提到, 如果俩个PHP扩展模块之间有互相依赖关系, 那么该如何保证正确的加载顺序呢?  
也就是说, 如何保证模块的依赖关系?  
关于这个问题, 可以从如下俩点入手展开:  
1\. 扩展的加载顺序是和它出现在配置文件中的先后顺序相关的, 也就是说, 如果在配置文件中的顺序如下,

extension=mysql.so
extension=pdo.so
    

那么, mysql扩展就会比pdo扩展先载入.  
2\. 那么如果顺序出错, 我们又要怎么保证正确的加载, 或者告诉Zend此时出错了呢?......

PHP取得成功的一个主要原因之一是她拥有大量的可用扩展。web开发者无论有何种需求，这种需求最有可能在PHP发行包里找到。PHP发行包包括支持各种数据库，图形文件格式，压缩，XML技术扩展在内的许多扩展。  
本文就用C/C++在Unix下编写PHP扩展所需的各种知识,做一个详尽的说明....
