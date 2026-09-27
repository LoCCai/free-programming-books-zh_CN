## [PPA source for PHP-YAF](https://mikespook.com/2013/09/ppa-source-for-php-yaf/)

[PHP-YAF](https://github.com/laruence/php-yaf) is a PHP framework extension likes [Zend Framework](http://framework.zend.com/), but much more lighter, more faster and better extendability. It is developed by [laruence](https://github.com/laruence). PHP-YAF could work with PEAR, Zend Framework and many others libraries.

YAF supported [PECL](http://pecl.php.net/package/yaf) good. It is convenient using PECL to install YAF on Ubuntu box. There is a saying that “When in Rome, do as the Romans do”. Thus why we are here: a [PPA source for PHP-YAF](https://launchpad.net/~mikespook/+archive/php5-yaf).

I have put all dependences on the [github](https://github.com/mikespook/php-yaf-ppa).

[(more…)](https://mikespook.com/2013/09/ppa-source-for-php-yaf/#more-1730)

## [如何采集部分内容图片化的网站](https://mikespook.com/2012/06/%e5%a6%82%e4%bd%95%e9%87%87%e9%9b%86%e9%83%a8%e5%88%86%e5%86%85%e5%ae%b9%e5%9b%be%e7%89%87%e5%8c%96%e7%9a%84%e7%bd%91%e7%ab%99/)

首先要声明：虽然这是互联网行业的一个普遍现象，但本文讨论的内容，**与我所在的公司和所从事的行业无关。**

事情的起因是在一个讨论 yaf 的 qq 群有人问如何抓取某网站内容，比如[这里](http://www.haodf.com/jibing/shuimianzhangai/jieshao.htm "好大夫")。我得说，这个网站在防采集和防抓取方面一直做得很出色。当然更出色的是他们运营的内容的价值。

在几年之前，我就探索过这个问题。对内容的数字、标点进行部分图片化，并且不是固定图片。URL 甚至 md5 值都是变化的。那么最基本的思路就是图像内容的识别。  
例如这是其中一个放大了 5 倍的数字：![](https://mikespook.com/wp-content/uploads/2012/06/1083.gif "1083")。蓝色背景是我手工加上去的，因为还有这样一个图：![](https://mikespook.com/wp-content/uploads/2012/06/10250.gif "10250")，你会发现原来同样的内容的图中还会有干扰点和偏移量的存在。那么难道真得要祭出像 opencv 这样的神器吗？其实，用一个采样/阈值匹配的办法，用 php 和 gd 库就可以实现一个简单的图像识别。  
[(more…)](https://mikespook.com/2012/06/%e5%a6%82%e4%bd%95%e9%87%87%e9%9b%86%e9%83%a8%e5%88%86%e5%86%85%e5%ae%b9%e5%9b%be%e7%89%87%e5%8c%96%e7%9a%84%e7%bd%91%e7%ab%99/#more-1331)

## [关于 QQ OAuth 封装出现 T\_PAAMAYIM\_NEKUDOTAYIM 的解决办法](https://mikespook.com/2011/01/%e5%85%b3%e4%ba%8e-oauth-%e5%b0%81%e8%a3%85%e5%87%ba%e7%8e%b0-t_paamayim_nekudotayim-%e7%9a%84%e4%b8%80%e4%ba%9b%e8%a7%a3%e5%86%b3%e5%8a%9e%e6%b3%95/)

许多网友在使用我的 OAuth 的腾讯微博封装（[腾讯微博开放平台的PECL的OAuth封装](https://mikespook.com/index.php/archives/813)）时都遇到了 T\_PAAMAYIM\_NEKUDOTAYIM 的错误。为了方便大家，干脆这里统一说明一下吧。

这个错误的责任在我。  
由于我使用的开发和部署环境都是 Ubuntu 环境，PHP 版本 5.3.3。我在编码的时候使用了一个 5.2.x 不支持的特性。在 XY/QQ/Store.php 的 28 行：

$class::setParams($params);

经不完全验证在 5.2.x 及以下版本会报 T\_PAAMAYIM\_NEKUDOTAYIM 错误。

解决办法其实很简单，将 28 行代码替换为：

call\_user\_func(array($class, 'setParams'), $params);

仅此即可。

真是抱歉了！同时感谢 [ahu](http://52q.net/)、[sjolzy](http://sjolzy.cn/) 提供的关键信息！

## [腾讯微博开放平台的PECL的OAuth封装](https://mikespook.com/2011/01/%e8%85%be%e8%ae%af%e5%be%ae%e5%8d%9a%e5%bc%80%e6%94%be%e5%b9%b3%e5%8f%b0%e7%9a%84pecl%e7%9a%84oauth%e5%b0%81%e8%a3%85/)

这是腾讯微博开放平台使用 PECL OAuth 扩展例子，我在“[微博擂台](http://xxiyy.com/qqt/vs/)”中已经使用的。现在抽取出来作为一个独立的库。

Token 的存储提供了 Session 和 Memcache 两种方式。Session 方式是默认方式，也就是说不进行任何设置默认使用 Session 存储 OAuth 的 Token。

如果想用后台进程，例如 Gearman 之类的异步调用腾讯的 API ，建议使用 Memcache。当然，也可以自己扩展存储接口，实现 Mysql 之类的存储方式。

[下载代码](https://mikespook.com/wp-content/uploads/2011/01/QQ-OAuth.zip)

## [使用 PECL 的 OAuth 访问腾讯微薄 API 的一点麻烦](https://mikespook.com/2010/12/%e4%bd%bf%e7%94%a8-pecl-%e7%9a%84-oauth-%e8%ae%bf%e9%97%ae%e8%85%be%e8%ae%af%e5%be%ae%e8%96%84api/)

尝试用 PECL 的 OAuth 访问腾讯微薄，到 Access Token 那步总是有问题。 5％ 的成功率。在 Request Token 的时候，也总有不成功的情况发生。

捕捉到异常：“Invalid auth/bad request (got a 401, expected HTTP/1.1 20X or a redirect)”，服务器返回“Invalid / expired Token”。

奇怪的是同样的代码，那 5％ 的成功率是哪里来的。上 Q 一问，腾讯某大牛提示检查检查 nonce 或者 timestamp 是不是正确。于是乎，检查了一下 [OAuth 的代码](http://svn.php.net/viewvc/pecl/oauth/trunk/oauth.c?view=co&content-type=text/plain)：

	if (soo->nonce) {
		nonce = estrdup(soo->nonce);
	} else {
		struct timeval tv;
		int sec, usec;
		/\* XXX maybe find a better way to generate a nonce... \*/
		gettimeofday((struct timeval \*) &tv, (struct timezone \*) NULL);
		sec = (int) tv.tv\_sec;
		usec = (int) (tv.tv\_usec % 0x100000);
		spprintf(&nonce, 0, "%ld%08x%05x%.8f", php\_rand(TSRMLS\_C), sec, usec, php\_combined\_lcg(TSRMLS\_C) \* 10);
	}

看到“spprintf(&nonce, 0, “%ld%08x%05x%.8f”, php\_rand(TSRMLS\_C), sec, usec, php\_combined\_lcg(TSRMLS\_C) \* 10);”了吗？！悲剧啊！

现在明白腾讯文档上那句“随机串（32个字符长度）”是什么意思了，RFC 5849 完全没提 nonce 需要 32 字符长度。腾讯自己说自己复合 OAuth 1.0a 标准，然后在标准上搞出了小标准⋯⋯

我比较懒，简单搞掂：

$oauth->setNonce(md5(rand()));

## [Web编程异步模型的 Gearman 实现（残）](https://mikespook.com/2010/06/web%e7%bc%96%e7%a8%8b%e5%bc%82%e6%ad%a5%e6%a8%a1%e5%9e%8b%e7%9a%84-gearman-%e5%ae%9e%e7%8e%b0%ef%bc%88%e6%ae%8b%ef%bc%89/)

写了 PHP 原生的二段式异步模型的实现，我就想着用 Gearman 实现一个 callback 方式的异步。还没准备好怎么去写，就看到了靓文一篇[《Gearman 心得》](http://www.jaceju.net/blog/?p=1211)。

看过之后，甚感压力：**好文！！**于是，弃笔不写，洗洗睡罢了……

补充一下，在“心得”文中仅仅说明了不阻塞的后台作业。对于异步获取数据并未说明。所以我这里罗嗦一下……

worker 如果用 php 来实现，并且不用[《Web编程异步模型的PHP 原生实现》](https://mikespook.com/index.php/archives/587)中的异步方式，是无法实现 php 的 client 的异步的。比较好的实现方式是 worker 不使用 php，用 python、perl 或者 c，实现一个线程池来执行 job。当然，私下觉得用 stackless python 可能是更好的选择。

2010年07月18日补充：  
好吧，终于有人撰文，正好可以补充完整这个异步思路：  
[淺談coroutine與gevent](http://blog.ez2learn.com/2010/07/17/talk-about-coroutine-and-gevent/)  
就他了，太棒了！

## [Web编程异步模型的PHP原生实现](https://mikespook.com/2010/06/web%e7%bc%96%e7%a8%8b%e5%bc%82%e6%ad%a5%e6%a8%a1%e5%9e%8b%e7%9a%84php%e5%8e%9f%e7%94%9f%e5%ae%9e%e7%8e%b0/)

这是基于上一篇随笔：[关于Web编程异步模型的白日梦](https://mikespook.com/index.php/archives/580)的实现。这一思路我记得在 05 年还是 07 年的时候就在 ChinaUnix 上有高人所讨论，只是自己当时愚钝未能明晰本质，纠结于 PHP 的多线程之中……

这个实现写好有段时间了，最近琐碎的事情很多，一直没有整理出来。今日得闲记录下来。

利用PHP自带的 stream\_select 函数实现异步，利用这个函数使得 PHP 原生支持的异步调用实现，无须第三方服务或库。不过只能实现二段式异步调用，就是说会有明显的 Begin 和 End 两个阶段。  
[(more…)](https://mikespook.com/2010/06/web%e7%bc%96%e7%a8%8b%e5%bc%82%e6%ad%a5%e6%a8%a1%e5%9e%8b%e7%9a%84php%e5%8e%9f%e7%94%9f%e5%ae%9e%e7%8e%b0/#more-587)
