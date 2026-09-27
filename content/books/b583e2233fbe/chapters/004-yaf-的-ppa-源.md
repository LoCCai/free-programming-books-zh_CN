[YAF](https://github.com/laruence/php-yaf "php-yaf") 是一个使用 C 编写的 PHP 框架。通过 PHP-YAF 项目，你可以轻松的使用 PPA 源将其部署在 Ubuntu 系统中。

首先需要向系统导入 PPA 密钥，并设置 sources.list。可以使用 add-apt-repository 完整该工作：

sudo add-apt-repository ppa:mikespook/php5-yaf

然后更新源列表：

sudo apt-get update

使用 apt-get 安装 YAF 包：

sudo apt-get install php5-yaf

安装完成后，必须手工重启 PHP 相关进程。

例如 PHP FPM：

sudo service php5-fpm restart

或 Apache 模块：

sudo service apache2 restart

PPA 源相关代码维护在 [Github](https://github.com/mikespook/php-yaf-ppa "php-yaf-ppa") 上；  
PPA 源维护在 [Launchpad](https://launchpad.net/~mikespook/+archive/ubuntu/php5-yaf "php5-yaf") 上。
