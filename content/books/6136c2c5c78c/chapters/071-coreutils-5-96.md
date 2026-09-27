## 6.14.1. 安装 Coreutils

通常 **uname** 程序总是有点毛病的，比如 _\-p_unknown 的结果。下面的补丁对 Intel 平台的机器能修正这个问题：

patch -Np1 -i ../coreutils-5.96-uname-1.patch

阻止 Coreutils 安装后面将由别的包安装的程序：

patch -Np1 -i ../coreutils-5.96-suppress\_uptime\_kill\_su-1.patch

POSIX 要求 Coreutils 的程序即使在多字节环境下也能够识别出字符的边界。下面的这个patch能够解决这个问题以及其他的一些国际化相关的问题：

patch -Np1 -i ../coreutils-5.96-i18n-1.patch

为了测试应用的patch能够运行，修改文件的权限：

chmod +x tests/sort/sort-mb-tests

![\[Note\]](https://www.jinbuguo.com/lfs/lfs62/images/note.png)

### 注意

过去，在这个patch里面发现了很多bug。当你向 Coreutils 的维护者发送错误报告的时候，首先确认不应用这个patch错误会不会出现。

现在已经发现在使用**who -Hu**时，转换的信息有时会导致缓冲区溢出。增大缓冲区大小：

sed -i 's/\_LEN 6/\_LEN 20/' src/who.c

为编译 Coreutils 做准备：

./configure --prefix=/usr

编译软件包：

make

Coreutils 软件包的测试套件对系统进行了某些假设，比如要求有非 root 用户和组，但是我们目前的系统中尚不存在。如果你不想运行测试套件，就直接跳过下面将要进行的测试，直接从"安装软件包"那里继续。

下面的命令为我们做测试前的准备，创建两个 dummy(伪) 组和一个 dummy(伪) 用户：

echo "dummy1:x:1000:" >> /etc/group
echo "dummy2:x:1001:dummy" >> /etc/group
echo "dummy:x:1000:1000::/root:/bin/bash" >> /etc/passwd

现在已经准备好可以运行测试套件了，首先运行那些需要以 root 运行的测试：

make NON\_ROOT\_USERNAME=dummy check-root

然后以 dummy 用户运行剩余的测试：

src/su dummy -c "make RUN\_EXPENSIVE\_TESTS=yes check"

测试结束后，删除 dummy 组和用户：

sed -i '/dummy/d' /etc/passwd /etc/group

安装软件包：

make install

把一些程序移动到合适的位置以符合 FHS 标准：

mv -v /usr/bin/{cat,chgrp,chmod,chown,cp,date,dd,df,echo} /bin
mv -v /usr/bin/{false,hostname,ln,ls,mkdir,mknod,mv,pwd,rm} /bin
mv -v /usr/bin/{rmdir,stty,sync,true,uname} /bin
mv -v /usr/bin/chroot /usr/sbin

一些 LFS-Bootscripts 包中的脚本依赖于 **head**， **sleep**，和 **nice** 。由于 /usr 目录有可能在系统启动过程的早期不可用(比如尚未挂载)，所以这些二进制程序需要放置在根分区上：

mv -v /usr/bin/{head,sleep,nice} /bin

**安装的程序：** basename, cat, chgrp, chmod, chown, chroot, cksum, comm, cp, csplit, cut, date, dd, df, dir, dircolors, dirname, du, echo, env, expand, expr, factor, false, fmt, fold, groups, head, hostid, hostname, id, install, join, link, ln, logname, ls, md5sum, mkdir, mkfifo, mknod, mv, nice, nl, nohup, od, paste, pathchk, pinky, pr, printenv, printf, ptx, pwd, readlink, rm, rmdir, seq, sha1sum, shred, sleep, sort, split, stat, stty, sum, sync, tac, tail, tee, test, touch, tr, true, tsort, tty, uname, unexpand, uniq, unlink, users, vdir, wc, who, whoami, yes

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="basename" name="basename"></a><span><span><strong>basename</strong></span></span></td><td><p>去掉文件名中的目录和后缀</p></td></tr><tr><td><a id="cat" name="cat"></a><span><span><strong>cat</strong></span></span></td><td><p>把文本文件的内容发送到标准输出</p></td></tr><tr><td><a id="chgrp" name="chgrp"></a><span><span><strong>chgrp</strong></span></span></td><td><p>改变文件和目录属组，属组可以使用组名或者组识别号表示</p></td></tr><tr><td><a id="chmod" name="chmod"></a><span><span><strong>chmod</strong></span></span></td><td><p>改变文件和目录的权限，权限可以使用符号或者八进制两种表达方式</p></td></tr><tr><td><a id="chown" name="chown"></a><span><span><strong>chown</strong></span></span></td><td><p>改变文件和目录的所有权(包括用户和/或组)</p></td></tr><tr><td><a id="chroot" name="chroot"></a><span><span><strong>chroot</strong></span></span></td><td><p>使用特定的目录作为执行某个命令或者交互 shell 的根目录(/)。在多数系统中，只有 root 用户能运行这个命令</p></td></tr><tr><td><a id="cksum" name="cksum"></a><span><span><strong>cksum</strong></span></span></td><td><p>输出指定的每个文件的CRC(循环冗余校验)校验和与字节数</p></td></tr><tr><td><a id="comm" name="comm"></a><span><span><strong>comm</strong></span></span></td><td><p>一行一行对两个已经排序的文件进行比较，在第三列中显示同一行是否相同</p></td></tr><tr><td><a id="cp" name="cp"></a><span><span><strong>cp</strong></span></span></td><td><p>复制文件</p></td></tr><tr><td><a id="csplit" name="csplit"></a><span><span><strong>csplit</strong></span></span></td><td><p>把一个文件按照给定的模式或者行号分成几块</p></td></tr><tr><td><a id="cut" name="cut"></a><span><span><strong>cut</strong></span></span></td><td><p>从指定的文件中提取特定的列送到标准输出</p></td></tr><tr><td><a id="date" name="date"></a><span><span><strong>date</strong></span></span></td><td><p>以特定的格式显示当前时间，或者设置系统日期</p></td></tr><tr><td><a id="dd" name="dd"></a><span><span><strong>dd</strong></span></span></td><td><p>以可选块长度复制文件，默认情况下从标准输入设备输出到标准输出设备。复制过程中，还可以对文件进行一些转换</p></td></tr><tr><td><a id="df" name="df"></a><span><span><strong>df</strong></span></span></td><td><p>显示参数中的文件所在分区磁盘空间的使用情况，如果没有给出文件参数就显示所有已经安装的文件系统的可用空间数量。</p></td></tr><tr><td><a id="dir" name="dir"></a><span><span><strong>dir</strong></span></span></td><td><p>列出给定目录的内容 (同 <span><strong>ls</strong></span> 命令)</p></td></tr><tr><td><a id="dircolors" name="dircolors"></a><span><span><strong>dircolors</strong></span></span></td><td><p>设置 LS_COLOR 环境变量(用来改变 <span><strong>ls</strong></span> 及相关工具默认颜色组合)</p></td></tr><tr><td><a id="dirname" name="dirname"></a><span><span><strong>dirname</strong></span></span></td><td><p>显示从文件名去掉非目录后缀之后的内容</p></td></tr><tr><td><a id="du" name="du"></a><span><span><strong>du</strong></span></span></td><td><p>显示参数使用的磁盘空间的数量，对于参数为目录还会列出每个子目录磁盘空间占用情况。</p></td></tr><tr><td><a id="echo" name="echo"></a><span><span><strong>echo</strong></span></span></td><td><p>显示给定字符串或变量值</p></td></tr><tr><td><a id="env" name="env"></a><span><span><strong>env</strong></span></span></td><td><p>在一个被修改的环境中运行一个程序</p></td></tr><tr><td><a id="expand" name="expand"></a><span><span><strong>expand</strong></span></span></td><td><p>把 tab 转换为空格符</p></td></tr><tr><td><a id="expr" name="expr"></a><span><span><strong>expr</strong></span></span></td><td><p>执行表达式计算</p></td></tr><tr><td><a id="factor" name="factor"></a><span><span><strong>factor</strong></span></span></td><td><p>输出所有指定整数的质因数</p></td></tr><tr><td><a id="false" name="false"></a><span><span><strong>false</strong></span></span></td><td><p>返回一个不成功或者逻辑假的结果</p></td></tr><tr><td><a id="fmt" name="fmt"></a><span><span><strong>fmt</strong></span></span></td><td><p>重新格式化指定文件的段落</p></td></tr><tr><td><a id="fold" name="fold"></a><span><span><strong>fold</strong></span></span></td><td><p>断开指定文件(默认是标准输入)较长的行，在屏幕上显示</p></td></tr><tr><td><a id="groups" name="groups"></a><span><span><strong>groups</strong></span></span></td><td><p>显示一个用户所在的组</p></td></tr><tr><td><a id="head" name="head"></a><span><span><strong>head</strong></span></span></td><td><p>显示每个指定文件的前几行(默认是10)</p></td></tr><tr><td><a id="hostid" name="hostid"></a><span><span><strong>hostid</strong></span></span></td><td><p>以16进制方式，显示当前主机的数字标志符</p></td></tr><tr><td><a id="hostname" name="hostname"></a><span><span><strong>hostname</strong></span></span></td><td><p>显示或设置主机名</p></td></tr><tr><td><a id="id" name="id"></a><span><span><strong>id</strong></span></span></td><td><p>显示某个用户或者当前用户的真实和有效的 UID、GID 。</p></td></tr><tr><td><a id="install" name="install"></a><span><span><strong>install</strong></span></span></td><td><p>复制文件，设置它们的权限，如果可能还设置拥有它们的用户和组</p></td></tr><tr><td><a id="join" name="join"></a><span><span><strong>join</strong></span></span></td><td><p>合并两个文件的行</p></td></tr><tr><td><a id="link" name="link"></a><span><span><strong>link</strong></span></span></td><td><p>创建从指定文件到指定名称的硬链接</p></td></tr><tr><td><a id="ln" name="ln"></a><span><span><strong>ln</strong></span></span></td><td><p>创建文件之间的硬/软(符号)连接</p></td></tr><tr><td><a id="logname" name="logname"></a><span><span><strong>logname</strong></span></span></td><td><p>显示当前用户的登录名</p></td></tr><tr><td><a id="ls" name="ls"></a><span><span><strong>ls</strong></span></span></td><td><p>列出指定目录的所有内容。缺省是将文件和子目录按字母顺序排列。</p></td></tr><tr><td><a id="md5sum" name="md5sum"></a><span><span><strong>md5sum</strong></span></span></td><td><p>显示或者校验 MD5 校验码。</p></td></tr><tr><td><a id="mkdir" name="mkdir"></a><span><span><strong>mkdir</strong></span></span></td><td><p>建立目录，使用给定的参数作为目录名。</p></td></tr><tr><td><a id="mkfifo" name="mkfifo"></a><span><span><strong>mkfifo</strong></span></span></td><td><p>以给定的参数作为名字建立FIFO(又叫"命名管道")文件。</p></td></tr><tr><td><a id="mknod" name="mknod"></a><span><span><strong>mknod</strong></span></span></td><td><p>使用给出的文件名，建立一个设备节点，也就是：FIFO、字符特殊文件(special file)或者块特殊文件(special file)。</p></td></tr><tr><td><a id="mv" name="mv"></a><span><span><strong>mv</strong></span></span></td><td><p>根据所给参数的不同，把文件或者目录移动到另外的目录或者将其改名</p></td></tr><tr><td><a id="nice" name="nice"></a><span><span><strong>nice</strong></span></span></td><td><p>修改某个进程的调度优先级</p></td></tr><tr><td><a id="nl" name="nl"></a><span><span><strong>nl</strong></span></span></td><td><p>把每个指定文件的内容写到标准输出，在每行加上行号</p></td></tr><tr><td><a id="nohup" name="nohup"></a><span><span><strong>nohup</strong></span></span></td><td><p>使某个命令不被挂起，并将输出重定向到一个日志文件。</p></td></tr><tr><td><a id="od" name="od"></a><span><span><strong>od</strong></span></span></td><td><p>以数字方式显示指定文件的内容，默认为八进制。</p></td></tr><tr><td><a id="paste" name="paste"></a><span><span><strong>paste</strong></span></span></td><td><p>将字段连接在一起，在字段之间自动插入分割符，默认的分割符是 Tab 。</p></td></tr><tr><td><a id="pathchk" name="pathchk"></a><span><span><strong>pathchk</strong></span></span></td><td><p>检查文件名是否是有效的或者是可移植的</p></td></tr><tr><td><a id="pinky" name="pinky"></a><span><span><strong>pinky</strong></span></span></td><td><p>一个轻量级的 finger 客户端，用来得到某个用户的信息。</p></td></tr><tr><td><a id="pr" name="pr"></a><span><span><strong>pr</strong></span></span></td><td><p>将文件分成适当大小的页送到打印机</p></td></tr><tr><td><a id="printenv" name="printenv"></a><span><span><strong>printenv</strong></span></span></td><td><p>显示环境变量</p></td></tr><tr><td><a id="printf" name="printf"></a><span><span><strong>printf</strong></span></span></td><td><p>根据给定的参数格式化输出数据，与 C 语言中的该函数相似。</p></td></tr><tr><td><a id="ptx" name="ptx"></a><span><span><strong>ptx</strong></span></span></td><td><p>为指定的文件提供一个排序索引</p></td></tr><tr><td><a id="pwd" name="pwd"></a><span><span><strong>pwd</strong></span></span></td><td><p>显示当前工作目录</p></td></tr><tr><td><a id="readlink" name="readlink"></a><span><span><strong>readlink</strong></span></span></td><td><p>显示指定符号链接的值</p></td></tr><tr><td><a id="rm" name="rm"></a><span><span><strong>rm</strong></span></span></td><td><p>删除文件或者目录</p></td></tr><tr><td><a id="rmdir" name="rmdir"></a><span><span><strong>rmdir</strong></span></span></td><td><p>删除目录(目录必需为空)</p></td></tr><tr><td><a id="seq" name="seq"></a><span><span><strong>seq</strong></span></span></td><td><p>以指定的步长输出一个数列</p></td></tr><tr><td><a id="sha1sum" name="sha1sum"></a><span><span><strong>sha1sum</strong></span></span></td><td><p>显示或校验 160 位的 SHA1 校验码</p></td></tr><tr><td><a id="shred" name="shred"></a><span><span><strong>shred</strong></span></span></td><td><p>安全删除一个文件，重写其占用的磁盘空间，使其无法恢复。</p></td></tr><tr><td><a id="sleep" name="sleep"></a><span><span><strong>sleep</strong></span></span></td><td><p>延迟一段时间</p></td></tr><tr><td><a id="sort" name="sort"></a><span><span><strong>sort</strong></span></span></td><td><p>对文件进行排序</p></td></tr><tr><td><a id="split" name="split"></a><span><span><strong>split</strong></span></span></td><td><p>把文件分成固定大小(字节或行数)的片断</p></td></tr><tr><td><a id="stat" name="stat"></a><span><span><strong>stat</strong></span></span></td><td><p>显示文件或者文件系统的状态</p></td></tr><tr><td><a id="stty" name="stty"></a><span><span><strong>stty</strong></span></span></td><td><p>改变和显示终端行的设置</p></td></tr><tr><td><a id="sum" name="sum"></a><span><span><strong>sum</strong></span></span></td><td><p>显示指定文件的校验和及块数</p></td></tr><tr><td><a id="sync" name="sync"></a><span><span><strong>sync</strong></span></span></td><td><p>刷新文件系统缓冲区，使磁盘和内存的数据同步。</p></td></tr><tr><td><a id="tac" name="tac"></a><span><span><strong>tac</strong></span></span></td><td><p>逆向显示指定的文件，最后一行在最前。</p></td></tr><tr><td><a id="tail" name="tail"></a><span><span><strong>tail</strong></span></span></td><td><p>显示每个指定文件的最后几行(默认是10)。</p></td></tr><tr><td><a id="tee" name="tee"></a><span><span><strong>tee</strong></span></span></td><td><p>从标准输入读取数据，输出到标准输出和指定的文件。</p></td></tr><tr><td><a id="test" name="test"></a><span><span><strong>test</strong></span></span></td><td><p>检查文件类型，以及进行变量的比较。</p></td></tr><tr><td><a id="touch" name="touch"></a><span><span><strong>touch</strong></span></span></td><td><p>把参数指定的文件的访问和修改时间改为当前的时间。如果文件不存在，它就建立一个空文件。</p></td></tr><tr><td><a id="tr" name="tr"></a><span><span><strong>tr</strong></span></span></td><td><p>从标准输入读入正文，对字符进行转换、压缩或者删除，然后写到标准输出</p></td></tr><tr><td><a id="true" name="true"></a><span><span><strong>true</strong></span></span></td><td><p>返回一个成功或者逻辑真的结果</p></td></tr><tr><td><a id="tsort" name="tsort"></a><span><span><strong>tsort</strong></span></span></td><td><p>对给定的文件进行拓扑排序</p></td></tr><tr><td><a id="tty" name="tty"></a><span><span><strong>tty</strong></span></span></td><td><p>显示标准输出设备连接终端的文件名</p></td></tr><tr><td><a id="uname" name="uname"></a><span><span><strong>uname</strong></span></span></td><td><p>打印系统信息</p></td></tr><tr><td><a id="unexpand" name="unexpand"></a><span><span><strong>unexpand</strong></span></span></td><td><p>把空格符转换成 tab</p></td></tr><tr><td><a id="uniq" name="uniq"></a><span><span><strong>uniq</strong></span></span></td><td><p>抛弃指定文件或者标准输入中内容重复的行</p></td></tr><tr><td><a id="unlink" name="unlink"></a><span><span><strong>unlink</strong></span></span></td><td><p>删除指定文件</p></td></tr><tr><td><a id="users" name="users"></a><span><span><strong>users</strong></span></span></td><td><p>显示在当前主机登录的用户名</p></td></tr><tr><td><a id="vdir" name="vdir"></a><span><span><strong>vdir</strong></span></span></td><td><p>同 <span><strong>ls -l</strong></span></p></td></tr><tr><td><a id="wc" name="wc"></a><span><span><strong>wc</strong></span></span></td><td><p>统计文件中包含的字节数、单词数、行数</p></td></tr><tr><td><a id="who" name="who"></a><span><span><strong>who</strong></span></span></td><td><p>显示有哪些用户登录</p></td></tr><tr><td><a id="whoami" name="whoami"></a><span><span><strong>whoami</strong></span></span></td><td><p>打印当前用户的有效用户标志符</p></td></tr><tr><td><a id="yes" name="yes"></a><span><span><strong>yes</strong></span></span></td><td><p>重复输出"<span>y</span>"字符，直到被杀死。</p></td></tr></tbody></table>
