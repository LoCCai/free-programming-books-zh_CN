[![PHP Composer](https://www.phpcomposer.com/assets/img/phpcomposer.png)](https://www.phpcomposer.com/)

## **Composer** 是 PHP 用来管理依赖（dependency）关系的工具。你可以在自己的项目中声明所依赖的外部工具库（libraries），Composer 会帮你安装这些依赖的库文件。

其实，Packagist/Composer 中国全量镜像一个月前就已经脱胎换骨、重装上阵了，经过这一个月来的洗礼（内测 + 开放测试），目前每日数据流量接近 10G，日均 IP 2500+。截至目前，各服务器运行平稳，感谢 [又拍云](https://www.upyun.com/) 提供的 CDN 支持，和 [UCloud](http://ucloud.cn/) 提供的云服务器。

对于现代语言而言，包管理器基本上是标配。Java 有 Maven，Python 有 pip，Ruby 有 gem，Nodejs 有 npm。PHP 的则是 [PEAR](http://pear.php.net/)，不过 PEAR 坑不少：

Composer 是新一代的PHP依赖管理工具。其介绍和基本用法可以看这篇《[Composer PHP依赖管理的新时代](https://www.phpcomposer.com/page/2/composer-the-new-age-of-dependency-manager-for-php)》。本文介绍使用Composer的五个小技巧，希望能给你的PHP开发带来方便。

## [Composer 是什么](https://www.phpcomposer.com/what-is-composer/)

作者： [王赛](http://www.bootcss.com/) • 2014-08-28

简单来说，Composer 是一个新的安装包管理工具，服务于 PHP 生态系统。它实际上包含了两个部分：[Composer](https://getcomposer.org/) 和 [Packagist](https://packagist.org/)。下面我们就简单说一下他们各自的用途。

[](#)
