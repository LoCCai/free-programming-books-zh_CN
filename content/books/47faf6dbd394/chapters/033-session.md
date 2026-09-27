今天在我的微博([Laruence](http://t.sina.com.cn/laruence))上发出一个问题:

> 我在面试的时候, 经常会问一个问题: "如何设置一个30分钟过期的Session?", 大家不要觉得看似简单, 这里面包含的知识挺多, 特别适合考察基本功是否扎实, 谁来回答试试? 呵呵

为什么问这个问题呢? 1. 我在Twitter上看到了有人讨论这个[问题](http://stackoverflow.com/questions/520237/how-do-i-expire-a-php-session-after-30-minutes), 2 想起来我经常问这个问题, 所以~~  
在这里, 我来解答下这个题目.

文件上传进度反馈, 这个需求在当前是越来越普遍, 比如大附件邮件. 在PHP5.4以前, 我们可以通过[APC](http://www.php.net/manual/zh/apc.configuration.php#ini.apc.rfc1867)提供的功能来实现. 或者使用PECL扩展[uploadprogress](http://pecl.php.net/package/uploadprogress)来实现.  
虽然说, 它们能很好的解决现在的问题, 但是也有很明显的不足:

-   1\. 他们都需要额外安装(我们并没有打算把APC加入PHP5.4)
-   2\. 它们都使用本地机制来存储这些信息, APC使用共享内存, 而uploadprogress使用文件系统(不考虑NFS), 这在多台前端机的时候会造成麻烦.

从PHP的角度来说, 最好的储存这些信息的地方应该是SESSION, 首先它是PHP原生支持的机制. 其次, 它可以被配置到存放到任何地方(支持多机共享).  
正因为此, Arnaud Le Blanc提出了针对Session报告上传进度的[RFC](http://wiki.php.net/rfc/session_upload_progress), 并且现在实现也已经包含在了PHP5.4的主干中.

如果在ubuntu/Debian下, 采用apt安装的PHP, 那么在使用Session的时候, 就可能会有小概率遇到这个提示.

PHP Notice: session\_start(): ps\_files\_cleanup\_dir:
   opendir(/var/lib/php5) failed: Permission denied (13)
   in /home/laruence/www/htdocs/index.php on line 22

昨天环境迁移, 脚本出core, 因为之前的环境上运行正常, 所以初步认为是环境问题. 通过对core文件的分析, 初步发现原因和spl\_autoload相关, backtrace如下:

#0  zif\_spl\_autoload (ht=Variable "ht" is not available.)
at /home/huixinchen/package/php-5.2.11/ext/spl/php\_spl.c:310
310   if (active\_opline->opcode != ZEND\_FETCH\_CLASS) {
(gdb) bt
#0  zif\_spl\_autoload (ht=Variable "ht" is not available.
	) at /home/huixinchen/package/php-5.2.11/ext/spl/php\_spl.c:310
#1  0x00000000006a5da5 in zend\_call\_function (fci=0x7fbfffc100,
		fci\_cache=Variable "fci\_cache" is not available.)
at /home/huixinchen/package/php-5.2.11/Zend/zend\_execute\_API.c:1052
.....

脚本很简单, 通过session\_set\_save\_handler注册了一个类为session的user handler.  
去掉spl\_autoload以后, 不出core了, 但是每次都会抛出Class not found的异常, 可见core确实和spl\_autoload有关, 但是这个Class \*\* not found的fatal error问题又和什么相关呢, 这个fatal error是否是导致spl\_autoload core 的直接原因呢?  
代码本身并没有任何问题, 对环境做了对比以后, 初步认定为新环境启用了APC的缘故.  
在bug.php中找到了有人报告类似的bug([spl\_autoload crashes when called in write function of custom sessionSaveHandler](http://bugs.php.net/bug.php?id=49867&edit=2)), 但没有任何一个人给出原因,或者解决的办法.  
看来, 只能自己分析了....

警告全文如下:

	PHP Warning:  Unknown: Your script possibly relies on a session side-effect
which existed until PHP 4.2.3. Please be advised that the session extension does
not consider global variables as a source of data, unless register\_globals is enabled.
You can disable this functionality and this warning by setting session.bug\_compat\_42
or session.bug\_compat\_warn to off, respectively. in Unknown on

网上对这个问题的解决有很多办法, 但是都是不知所以然的解决之道. 本文从seesion出发, 分析了这个问题的成因, 继而让大家知道所以然...
