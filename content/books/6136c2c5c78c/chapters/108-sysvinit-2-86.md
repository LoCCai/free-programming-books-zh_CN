## 6.52.1. 安装 Sysvinit

当运行级别被改变(比如，正在关闭系统)，**init** 向那些由 **init** 自身开启的，并且将不会在新的运行级别里运行的线程发送终端信号。当 **init** 做上面这些事情时，会输出像"Sending processes the TERM signal"这样的信息，这看起来就像它正在向那些系统正在运行的程序发送上面这些信息一样。要避免错误地理解这个信息，可以修改源码以便可以代替为读起来像"Sending processes started by init the TERM signal"的信息，可以用下面命令：

sed -i 's@Sending processes@& started by init@g' \\
    src/init.c

编译软件包：

make -C src

这个软件包没有附带测试程序。

安装软件包：

make -C src install

运行下面命令，创建一个新的 /etc/inittab 文件：

cat > /etc/inittab << "EOF"
\# Begin /etc/inittab

id:3:initdefault:

si::sysinit:/etc/rc.d/init.d/rc sysinit

l0:0:wait:/etc/rc.d/init.d/rc 0
l1:S1:wait:/etc/rc.d/init.d/rc 1
l2:2:wait:/etc/rc.d/init.d/rc 2
l3:3:wait:/etc/rc.d/init.d/rc 3
l4:4:wait:/etc/rc.d/init.d/rc 4
l5:5:wait:/etc/rc.d/init.d/rc 5
l6:6:wait:/etc/rc.d/init.d/rc 6

ca:12345:ctrlaltdel:/sbin/shutdown -t1 -a -r now

su:S016:once:/sbin/sulogin

1:2345:respawn:/sbin/agetty tty1 9600
2:2345:respawn:/sbin/agetty tty2 9600
3:2345:respawn:/sbin/agetty tty3 9600
4:2345:respawn:/sbin/agetty tty4 9600
5:2345:respawn:/sbin/agetty tty5 9600
6:2345:respawn:/sbin/agetty tty6 9600

# End /etc/inittab
EOF

**安装的程序：** bootlogd, halt, init, killall5, last, lastb(→last), mesg, mountpoint, pidof(→killall5), poweroff(→halt), reboot(→halt), runlevel, shutdown, sulogin, telinit(→init), utmpdump, wall

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="bootlogd" name="bootlogd"></a><span><span><strong>bootlogd</strong></span></span></td><td><p>把启动信息记录到一个日志文件</p></td></tr><tr><td><a id="halt" name="halt"></a><span><span><strong>halt</strong></span></span></td><td><p>正常情况下等效于 <span><strong>shutdown</strong></span> 加上 <em><tt>-h</tt></em> 参数(当前系统运行级别是 0 时除外)。它将告诉内核去中止系统，并在系统正在关闭的过程中将日志记录到 <tt>/var/log/wtmp</tt> 文件里。</p></td></tr><tr><td><a id="init" name="init"></a><span><span><strong>init</strong></span></span></td><td><p>当内核已经初始化硬件，接管引导程序，开启指令线程时，init 会被第一个启动。</p></td></tr><tr><td><a id="killall5" name="killall5"></a><span><span><strong>killall5</strong></span></span></td><td><p>发送一个信号到所有进程，但那些在它自己设定级别的进程将不会被这个运行的脚本所中断。</p></td></tr><tr><td><a id="last" name="last"></a><span><span><strong>last</strong></span></span></td><td><p>给出哪一个用户最后一次登录(或退出登录)，它搜索 <tt>/var/log/wtmp</tt> 文件，出给出系统引导、关闭、运行级别改变等信息。</p></td></tr><tr><td><a id="lastb" name="lastb"></a><span><span><strong>lastb</strong></span></span></td><td><p>给出登失败的尝试，并写入日志 <tt>/var/log/btmp</tt></p></td></tr><tr><td><a id="mesg" name="mesg"></a><span><span><strong>mesg</strong></span></span></td><td><p>控制是否允许其他用户也有向系统所有用户发送信息的权限</p></td></tr><tr><td><a id="mountpoint" name="mountpoint"></a><span><span><strong>mountpoint</strong></span></span></td><td><p>检查给定的目录是否是一个挂载点</p></td></tr><tr><td><a id="pidof" name="pidof"></a><span><span><strong>pidof</strong></span></span></td><td><p>报告给定程序的PID号</p></td></tr><tr><td><a id="poweroff" name="poweroff"></a><span><span><strong>poweroff</strong></span></span></td><td><p>告诉内核中止系统并且关闭系统(参见 <span><strong>halt</strong></span>)</p></td></tr><tr><td><a id="reboot" name="reboot"></a><span><span><strong>reboot</strong></span></span></td><td><p>告诉内核重启系统(参见 <span><strong>halt</strong></span>)</p></td></tr><tr><td><a id="runlevel" name="runlevel"></a><span><span><strong>runlevel</strong></span></span></td><td><p>告前一个和当前的系统运行级别，并且将最后一些运行级别写入 <tt>/var/run/utmp</tt></p></td></tr><tr><td><a id="shutdown" name="shutdown"></a><span><span><strong>shutdown</strong></span></span></td><td><p>使系统安全关闭，向所有线程发送关闭信号并且通知所有已经登录的系统用户系统即将关闭。</p></td></tr><tr><td><a id="sulogin" name="sulogin"></a><span><span><strong>sulogin</strong></span></span></td><td><p>允许 <span><em>root</em></span> 登录，它通常情况下是在系统在单用户模式下运行时，由 <span><strong>init</strong></span> 所派生。</p></td></tr><tr><td><a id="telinit" name="telinit"></a><span><span><strong>telinit</strong></span></span></td><td><p>告诉 <span><strong>init</strong></span> 将切换到那一个运行级</p></td></tr><tr><td><a id="utmpdump" name="utmpdump"></a><span><span><strong>utmpdump</strong></span></span></td><td><p>以一个多用户友好的方式列出已经给出的登录文件的目录</p></td></tr><tr><td><a id="wall" name="wall"></a><span><span><strong>wall</strong></span></span></td><td><p>向所有已经登录的用户写入一个信息</p></td></tr></tbody></table>
