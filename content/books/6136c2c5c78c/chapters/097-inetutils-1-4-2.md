## 6.40.1. 安装 Inetutils

应用一个patch，使其能够在GCC-4.0.3下编译：

patch -Np1 -i ../inetutils-1.4.2-gcc4\_fixes-3.patch

我们并不安装 Inetutils 的全部程序，然而，它默认会把所有程序的 man 文档都装上。下面的补丁能解决这个问题：

patch -Np1 -i ../inetutils-1.4.2-no\_server\_man\_pages-1.patch

为编译 Inetutils 做准备：

./configure --prefix=/usr --libexecdir=/usr/sbin \\
    --sysconfdir=/etc --localstatedir=/var \\
    --disable-logger --disable-syslogd \\
    --disable-whois --disable-servers

**配置选项的含义：**

_\--disable-logger_

阻止 inetutils 安装 **logger** 程序，脚本利用这个程序向系统日志守护进程传递消息。我们不安装它是因为 Util-linux 包含一个更好的版本。

_\--disable-syslogd_

这个参数阻止 inetutils 安装 System Log Daemon(系统日志守护进程)，我们将在后面的 Sysklogd 软件包中安装它。

_\--disable-whois_

阻止 inetutils 编译 **whois** 客户端，因为它已经很陈旧了。在 BLFS book 里面有安装更好的 **whois** 客户端的指导。

_\--disable-servers_

阻止安装几种网络服务器。这些服务器对于基本的 LFS 系统是不合适的，有的还不安全，很多服务器都有更好的替代者。参见 [_http://www.linuxfromscratch.org/blfs/view/svn/basicnet/inetutils.html_](http://www.linuxfromscratch.org/blfs/view/svn/basicnet/inetutils.html) 。

编译软件包：

make

这个软件包没有附带测试程序。

安装软件包：

make install

把 **ping** 程序移动到符合 FHS 标准的位置：

mv -v /usr/bin/ping /bin

**安装的程序：** ftp, ping, rcp, rlogin, rsh, talk, telnet, tftp

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="ftp" name="ftp"></a><span><span><strong>ftp</strong></span></span></td><td><p>文件传输协议程序</p></td></tr><tr><td><a id="ping" name="ping"></a><span><span><strong>ping</strong></span></span></td><td><p>向网络主机发送请求应答包，并报告回复所需的时间。</p></td></tr><tr><td><a id="rcp" name="rcp"></a><span><span><strong>rcp</strong></span></span></td><td><p>远程文件拷贝</p></td></tr><tr><td><a id="rlogin" name="rlogin"></a><span><span><strong>rlogin</strong></span></span></td><td><p>远程登陆</p></td></tr><tr><td><a id="rsh" name="rsh"></a><span><span><strong>rsh</strong></span></span></td><td><p>运行远程 shell</p></td></tr><tr><td><a id="talk" name="talk"></a><span><span><strong>talk</strong></span></span></td><td><p>与另一个用户交谈</p></td></tr><tr><td><a id="telnet" name="telnet"></a><span><span><strong>telnet</strong></span></span></td><td><p>TELNET 协议接口</p></td></tr><tr><td><a id="tftp" name="tftp"></a><span><span><strong>tftp</strong></span></span></td><td><p>小文件传输程序</p></td></tr></tbody></table>
