## 6.51.1. 安装 Sysklogd

下面的补丁修正了许多问题，包括在2.6系列的内核上编译 Sysklogd 会遇到的问题：

patch -Np1 -i ../sysklogd-1.4.1-fixes-1.patch

下面的patch使 sysklogd 逐字的对待日志信息中0x80--0x9f段的字符，而不是采用八进制进行替换。未打patch的sysklogd在UTF-8编码下会损害日志信息：

patch -Np1 -i ../sysklogd-1.4.1-8bit-1.patch

编译软件包：

make

这个软件包没有附带测试程序。

安装软件包：

make install

创建一个新的 /etc/syslog.conf 文件：

cat > /etc/syslog.conf << "EOF"
\# Begin /etc/syslog.conf

auth,authpriv.\* -/var/log/auth.log
\*.\*;auth,authpriv.none -/var/log/sys.log
daemon.\* -/var/log/daemon.log
kern.\* -/var/log/kern.log
mail.\* -/var/log/mail.log
user.\* -/var/log/user.log
\*.emerg \*

# End /etc/syslog.conf
EOF

**安装的程序：** klogd, syslogd

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="klogd" name="klogd"></a><span><span><strong>klogd</strong></span></span></td><td><p>一个系统守护进程，截获并且记录下 LINUX 内核日志信息。</p></td></tr><tr><td><a id="syslogd" name="syslogd"></a><span><span><strong>syslogd</strong></span></span></td><td><p>记录下系统里所有提供日志记录的程序给出的日志和信息内容。每一个被记录的消息至少包含时间戳和主机名(通常还包括程序名)。</p></td></tr></tbody></table>
