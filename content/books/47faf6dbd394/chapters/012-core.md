以前, 我曾经介绍过如何通过PHP的Core文件获取信息:[如何调试PHP的Core之获取基本信息](http://www.laruence.com/2011/06/23/2057.html), 对于调用参数这块, 当时介绍的获取方法比较复杂.  
于是今天我为PHP 5.4的.gdbinit做了一个改进, 以后如果你遇到了PHP 5.4的core, 那么就可以简单的得到PHP 5.4发生Core时, 包括参数的函数调用栈的信息.

其实一直想写这个系列, 但是一想到这个话题的宽泛性, 我就有点感觉无法组织.  
今天我也不打算全部讲如何调试一个PHP的Core文件, 也不会介绍什么是Coredump, 选择一个相对比较简单的方向来介绍, 那就是如何从PHP的Core文件中获取一些对我们重演这个Core有帮助的信息.

一个同事forward过来一个, 公司某产品线遇到的一个低概率, 但长时间出现了几次的Core的bt信息, 找我帮忙分析下原因.  
bt栈如下(路径信息以\*代替):

#0  0x00000000004a75e5 in \_zend\_mm\_alloc\_int (heap=0xd61260, size=79)
at /\*/php-5.2.6/Zend/zend\_alloc.c:1879
#1  0x000000000048d3cd in vspprintf (pbuf=0x7fbffe9cd8, max\_len=1024, format=Variable "format" is not available.
)
    at /\*/php-5.2.6/main/spprintf.c:224
#2  0x0000000000489747 in php\_error\_cb (type=1, error\_filename=0x2a9a787ee8 "/\*/application/helpers/util.php",
    error\_lineno=1149, format=Variable "format" is not available.
) at /\*/php-5.2.6/main/main.c:799
#3  0x000000000061db35 in soap\_error\_handler (error\_num=1,
    error\_filename=0x2a9a787ee8 "/\*/application/helpers/util.php", error\_lineno=1149,
    format=0x7b9cb8 "Maximum execution time of %d second%s exceeded", args=0x7fbffea3b0)
    at /\*/php-5.2.6/ext/soap/soap.c:2178
#4  0x00000000004c2576 in zend\_error (type=1, format=0x7b9cb8 "Maximum execution time of %d second%s exceeded")
    at /\*/php-5.2.6/Zend/zend.c:976
#5  <signal handler called>
#6  0x00000000004a720f in \_zend\_mm\_free\_int (heap=0xd61260, p=Variable "p" is not available.
) at /\*/php-5.2.6/Zend/zend\_alloc.c:844
...以下省略

同事发现一个在使用set\_error\_handler的时候, 能100%重现的core, 提炼后的重现代码如下(**环境必须不能访问internet**):

<?php
function err\_handler(){
    exit;
    return true;
}
set\_error\_handler('err\_handler');
$client = file\_get\_contents("http://www.laruence.com/ServiceNoWse.asmx?WSDL");

这段代码, 放在webServer中, 第一次访问不会有事, 第二第三次的时候就会出core.

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

PHP是个脚本语言, 错误定位容易, 编写起来速度较快..但是, 如果遇到了PHP自身的一些问题,那就会让人很恼火.  
最近遇到一个很低概率的Core dump(大概是2年才出现一次), 经过和同事一起仔细分析,跟踪,终于找出了原因, 拿出来与大家分享.
