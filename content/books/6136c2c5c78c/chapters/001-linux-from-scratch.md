## 版本 6.2

* * *

谨以本书献给 [LinuxSir.org](http://www.linuxsir.org/) 以及所有热爱 Linux 的人们。  
译者： [金步国](https://www.jinbuguo.com/)(0-5章) ipconfigme(6-7章) bobkey(8-9章)  
发布日期：2008年3月1日 \[最终正式版\]  

［致谢］感谢之前的 LFS 5.0 和 6.0 翻译小组，没有他们之前辛勤工作积累的资料单靠我们3个人是不可能完成这项工作的。同样也要感谢所有指出预览版中错误的朋友以及对中译本提出建议与期望的朋友(随机顺序)：fisow Robot5 tonytop cnhnln youbest leiv d00m3d asdmusic crandyworld juwen\_zhong 晨想 alexlee1216 sonic\_yq kikiwarm shooter x\_crdjn ilptt linlin911911 ，是你们让中文版更加完美。

［版权声明］本手册译者皆是开源理念的坚定支持者，所以本手册虽然不是软件，但是遵照开源的精神发布。

-   无担保：本文译者不保证作品内容准确无误，亦不承担任何由于使用此文档所导致的损失。
-   自由使用：任何人都可以自由的阅读/链接/打印此文档，无需任何附加条件。
-   名誉权：任何人都可以自由的转载/引用/再分发此文档，但必须保留译者署名并注明出处。

* * *

［题外话］大部分 LFSer 都认为学习 LFS 需要有熟练使用 Linux 的基础，并且大部分听说过 LFS 的人都有一个印象：那是高手的玩具，不是我等菜鸟玩得了的……我不完全赞同，我认为**基础如何并非关键，契而不舍的精神和强烈的求知欲才更加重要**。想想自己接触 Linux 一个月左右的时候就有了和 Gerard 一样的想法，因为在学习 RedHat / Fedora / Debian 甚至是 Gentoo 的时候，我感觉到自己并不是在学习 Linux 而是在学习这些发行版各自的专有特性，他们把 Linux 本来的面貌层层包裹起来，让我不能深入理解背后的机制。并且这些版本各自有自己的优点和缺点，不能完全满足我的要求。其实那时候我的 Linux 水平仅仅限于会在控制台上敲几个 ls 之类的命令，从未编译过软件，连 make 都没听说过呢。但是我迫切想知道如何定制一个完全适合自己的 Linux 系统，问了好多 Linuxer ，把 Google 搜了个底朝天，也未能得到完整性的答案，唯一让我印象深刻的就是能够容纳在一张软盘上的 babyLinux ，但是它显然太简单，不能满足我的要求。一直郁闷了很久，好不容易机缘巧合，Qoo 兄弟叫我来 LinuxSir.Org 论坛的 LFS 版看看，当时论坛上只有一份不完整的 LFS 6.0 中文版，看完序言后，我激动的跳了起来，欢呼不已！这就是我梦寐以求的东西啊！于是在尚未安装过 LFS 的情况下，静下心来花了十多天时间先完整的翻译了 LFS 6.1 ，又花了5-6天时间，一行命令一行命令地完成了 LFS 的全过程。在学习 LFS 的20天里，我对 Linux 的理解发生了质的飞跃。大约没有人赞同学习 Linux 可以从 LFS 开始，这确实有一定的道理，但是 LFS 教给你的都是真正的 Linux "基础知识"，并且这些知识可以为将来的进一步学习打下绝对扎实的基础。所以我要用自己的亲身经历鼓励那些刚刚接触 Linux 的新生牛犊勇敢的从 LFS 开始：没有基础不要紧，缺什么补什么！当你把 LFS 做完了，也就脱离"菜鸟"的行列了，用 LFS 给你的强大翅膀，勇敢地继续飞翔吧！

* * *

译者十分愿意与他人共享劳动成果，如果你对我的其他翻译作品或者技术文章有兴趣，可以在如下位置查看现有作品的集：

-   [金步国作品集](https://www.jinbuguo.com/) \[ [https://www.jinbuguo.com/](https://www.jinbuguo.com/) \]

### 目录

-   #### 序言
    
    -   [前言](https://www.jinbuguo.com/lfs/lfs62/prologue/preface.html#pre-foreword)
    -   [目标读者](https://www.jinbuguo.com/lfs/lfs62/prologue/audience.html)
    -   [先决条件](https://www.jinbuguo.com/lfs/lfs62/prologue/prerequisites.html)
    -   [对宿主系统的要求](https://www.jinbuguo.com/lfs/lfs62/prologue/hostreqs.html)
    -   [排版约定](https://www.jinbuguo.com/lfs/lfs62/prologue/typography.html)
    -   [本书的组织结构](https://www.jinbuguo.com/lfs/lfs62/prologue/organization.html)
    -   [勘误表](https://www.jinbuguo.com/lfs/lfs62/prologue/errata.html)
-   ### I. 简介
    
    -   #### 1\. 简介
        
        -   [如何构建一个 LFS 系统?](https://www.jinbuguo.com/lfs/lfs62/chapter01/chapter01.html#ch-intro-how)
        -   [与上一版本有何不同?](https://www.jinbuguo.com/lfs/lfs62/chapter01/whatsnew.html)
        -   [更新日志](https://www.jinbuguo.com/lfs/lfs62/chapter01/changelog.html)
        -   [资源](https://www.jinbuguo.com/lfs/lfs62/chapter01/resources.html)
        -   [帮助](https://www.jinbuguo.com/lfs/lfs62/chapter01/askforhelp.html)
-   ### II. 构建前的准备工作
    
    -   #### 2\. 准备一个新分区
        
        -   [简介](https://www.jinbuguo.com/lfs/lfs62/chapter02/chapter02.html#space-introduction)
        -   [创建一个新分区](https://www.jinbuguo.com/lfs/lfs62/chapter02/creatingpartition.html)
        -   [在新分区上创建文件系统](https://www.jinbuguo.com/lfs/lfs62/chapter02/creatingfilesystem.html)
        -   [挂载新分区](https://www.jinbuguo.com/lfs/lfs62/chapter02/mounting.html)
    -   #### 3\. 软件包和补丁
        
        -   [简介](https://www.jinbuguo.com/lfs/lfs62/chapter03/chapter03.html#materials-introduction)
        -   [全部软件包](https://www.jinbuguo.com/lfs/lfs62/chapter03/packages.html)
        -   [需要的补丁](https://www.jinbuguo.com/lfs/lfs62/chapter03/patches.html)
    -   #### 4\. 最后的准备工作
        
        -   [关于环境变量 $LFS](https://www.jinbuguo.com/lfs/lfs62/chapter04/chapter04.html#prepare-aboutlfs)
        -   [创建 $LFS/tools 目录](https://www.jinbuguo.com/lfs/lfs62/chapter04/creatingtoolsdir.html)
        -   [添加 LFS 用户](https://www.jinbuguo.com/lfs/lfs62/chapter04/addinguser.html)
        -   [设置工作环境](https://www.jinbuguo.com/lfs/lfs62/chapter04/settingenvironment.html)
        -   [关于 SBU](https://www.jinbuguo.com/lfs/lfs62/chapter04/aboutsbus.html)
        -   [关于软件包测试套件](https://www.jinbuguo.com/lfs/lfs62/chapter04/abouttestsuites.html)
    -   #### 5\. 构建临时编译环境
        
        -   [简介](https://www.jinbuguo.com/lfs/lfs62/chapter05/chapter05.html#ch-tools-introduction)
        -   [工具链技术说明](https://www.jinbuguo.com/lfs/lfs62/chapter05/toolchaintechnotes.html)
        -   [Binutils-2.16.1 - 第一遍](https://www.jinbuguo.com/lfs/lfs62/chapter05/binutils-pass1.html)
        -   [GCC-4.0.3 - 第一遍](https://www.jinbuguo.com/lfs/lfs62/chapter05/gcc-pass1.html)
        -   [Linux-Libc-Headers-2.6.12.0](https://www.jinbuguo.com/lfs/lfs62/chapter05/linux-libc-headers.html)
        -   [Glibc-2.3.6](https://www.jinbuguo.com/lfs/lfs62/chapter05/glibc.html)
        -   [调整工具链](https://www.jinbuguo.com/lfs/lfs62/chapter05/adjusting.html)
        -   [Tcl-8.4.13](https://www.jinbuguo.com/lfs/lfs62/chapter05/tcl.html)
        -   [Expect-5.43.0](https://www.jinbuguo.com/lfs/lfs62/chapter05/expect.html)
        -   [DejaGNU-1.4.4](https://www.jinbuguo.com/lfs/lfs62/chapter05/dejagnu.html)
        -   [GCC-4.0.3 - 第二遍](https://www.jinbuguo.com/lfs/lfs62/chapter05/gcc-pass2.html)
        -   [Binutils-2.16.1 - 第二遍](https://www.jinbuguo.com/lfs/lfs62/chapter05/binutils-pass2.html)
        -   [Ncurses-5.5](https://www.jinbuguo.com/lfs/lfs62/chapter05/ncurses.html)
        -   [Bash-3.1](https://www.jinbuguo.com/lfs/lfs62/chapter05/bash.html)
        -   [Bzip2-1.0.3](https://www.jinbuguo.com/lfs/lfs62/chapter05/bzip2.html)
        -   [Coreutils-5.96](https://www.jinbuguo.com/lfs/lfs62/chapter05/coreutils.html)
        -   [Diffutils-2.8.1](https://www.jinbuguo.com/lfs/lfs62/chapter05/diffutils.html)
        -   [Findutils-4.2.27](https://www.jinbuguo.com/lfs/lfs62/chapter05/findutils.html)
        -   [Gawk-3.1.5](https://www.jinbuguo.com/lfs/lfs62/chapter05/gawk.html)
        -   [Gettext-0.14.5](https://www.jinbuguo.com/lfs/lfs62/chapter05/gettext.html)
        -   [Grep-2.5.1a](https://www.jinbuguo.com/lfs/lfs62/chapter05/grep.html)
        -   [Gzip-1.3.5](https://www.jinbuguo.com/lfs/lfs62/chapter05/gzip.html)
        -   [M4-1.4.4](https://www.jinbuguo.com/lfs/lfs62/chapter05/m4.html)
        -   [Make-3.80](https://www.jinbuguo.com/lfs/lfs62/chapter05/make.html)
        -   [Patch-2.5.4](https://www.jinbuguo.com/lfs/lfs62/chapter05/patch.html)
        -   [Perl-5.8.8](https://www.jinbuguo.com/lfs/lfs62/chapter05/perl.html)
        -   [Sed-4.1.5](https://www.jinbuguo.com/lfs/lfs62/chapter05/sed.html)
        -   [Tar-1.15.1](https://www.jinbuguo.com/lfs/lfs62/chapter05/tar.html)
        -   [Texinfo-4.8](https://www.jinbuguo.com/lfs/lfs62/chapter05/texinfo.html)
        -   [Util-linux-2.12r](https://www.jinbuguo.com/lfs/lfs62/chapter05/util-linux.html)
        -   [清理系统](https://www.jinbuguo.com/lfs/lfs62/chapter05/stripping.html)
        -   [改变所有者](https://www.jinbuguo.com/lfs/lfs62/chapter05/changingowner.html)
-   ### III. 构建 LFS 系统
    
    -   #### 第六章 安装系统基础软件
        
        -   [简介](https://www.jinbuguo.com/lfs/lfs62/chapter06/chapter06.html#ch-system-introduction)
        -   [挂载虚拟内核文件系统](https://www.jinbuguo.com/lfs/lfs62/chapter06/kernfs.html)
        -   [包管理](https://www.jinbuguo.com/lfs/lfs62/chapter06/pkgmgt.html)
        -   [进入 Chroot 环境](https://www.jinbuguo.com/lfs/lfs62/chapter06/chroot.html)
        -   [创建系统目录结构](https://www.jinbuguo.com/lfs/lfs62/chapter06/creatingdirs.html)
        -   [创建必需的文件与符号连接](https://www.jinbuguo.com/lfs/lfs62/chapter06/createfiles.html)
        -   [Linux-Libc-Headers-2.6.12.0](https://www.jinbuguo.com/lfs/lfs62/chapter06/linux-libc-headers.html)
        -   [Man-pages-2.34](https://www.jinbuguo.com/lfs/lfs62/chapter06/man-pages.html)
        -   [Glibc-2.3.6](https://www.jinbuguo.com/lfs/lfs62/chapter06/glibc.html)
        -   [再次调整工具链](https://www.jinbuguo.com/lfs/lfs62/chapter06/readjusting.html)
        -   [Binutils-2.16.1](https://www.jinbuguo.com/lfs/lfs62/chapter06/binutils.html)
        -   [GCC-4.0.3](https://www.jinbuguo.com/lfs/lfs62/chapter06/gcc.html)
        -   [Berkeley DB-4.4.20](https://www.jinbuguo.com/lfs/lfs62/chapter06/db.html)
        -   [Coreutils-5.96](https://www.jinbuguo.com/lfs/lfs62/chapter06/coreutils.html)
        -   [Iana-Etc-2.10](https://www.jinbuguo.com/lfs/lfs62/chapter06/iana-etc.html)
        -   [M4-1.4.4](https://www.jinbuguo.com/lfs/lfs62/chapter06/m4.html)
        -   [Bison-2.2](https://www.jinbuguo.com/lfs/lfs62/chapter06/bison.html)
        -   [Ncurses-5.5](https://www.jinbuguo.com/lfs/lfs62/chapter06/ncurses.html)
        -   [Procps-3.2.6](https://www.jinbuguo.com/lfs/lfs62/chapter06/procps.html)
        -   [Sed-4.1.5](https://www.jinbuguo.com/lfs/lfs62/chapter06/sed.html)
        -   [Libtool-1.5.22](https://www.jinbuguo.com/lfs/lfs62/chapter06/libtool.html)
        -   [Perl-5.8.8](https://www.jinbuguo.com/lfs/lfs62/chapter06/perl.html)
        -   [Readline-5.1](https://www.jinbuguo.com/lfs/lfs62/chapter06/readline.html)
        -   [Zlib-1.2.3](https://www.jinbuguo.com/lfs/lfs62/chapter06/zlib.html)
        -   [Autoconf-2.59](https://www.jinbuguo.com/lfs/lfs62/chapter06/autoconf.html)
        -   [Automake-1.9.6](https://www.jinbuguo.com/lfs/lfs62/chapter06/automake.html)
        -   [Bash-3.1](https://www.jinbuguo.com/lfs/lfs62/chapter06/bash.html)
        -   [Bzip2-1.0.3](https://www.jinbuguo.com/lfs/lfs62/chapter06/bzip2.html)
        -   [Diffutils-2.8.1](https://www.jinbuguo.com/lfs/lfs62/chapter06/diffutils.html)
        -   [E2fsprogs-1.39](https://www.jinbuguo.com/lfs/lfs62/chapter06/e2fsprogs.html)
        -   [File-4.17](https://www.jinbuguo.com/lfs/lfs62/chapter06/file.html)
        -   [Findutils-4.2.27](https://www.jinbuguo.com/lfs/lfs62/chapter06/findutils.html)
        -   [Flex-2.5.33](https://www.jinbuguo.com/lfs/lfs62/chapter06/flex.html)
        -   [GRUB-0.97](https://www.jinbuguo.com/lfs/lfs62/chapter06/grub.html)
        -   [Gawk-3.1.5](https://www.jinbuguo.com/lfs/lfs62/chapter06/gawk.html)
        -   [Gettext-0.14.5](https://www.jinbuguo.com/lfs/lfs62/chapter06/gettext.html)
        -   [Grep-2.5.1a](https://www.jinbuguo.com/lfs/lfs62/chapter06/grep.html)
        -   [Groff-1.18.1.1](https://www.jinbuguo.com/lfs/lfs62/chapter06/groff.html)
        -   [Gzip-1.3.5](https://www.jinbuguo.com/lfs/lfs62/chapter06/gzip.html)
        -   [Inetutils-1.4.2](https://www.jinbuguo.com/lfs/lfs62/chapter06/inetutils.html)
        -   [IPRoute2-2.6.16-060323](https://www.jinbuguo.com/lfs/lfs62/chapter06/iproute2.html)
        -   [Kbd-1.12](https://www.jinbuguo.com/lfs/lfs62/chapter06/kbd.html)
        -   [Less-394](https://www.jinbuguo.com/lfs/lfs62/chapter06/less.html)
        -   [Make-3.80](https://www.jinbuguo.com/lfs/lfs62/chapter06/make.html)
        -   [Man-DB-2.4.3](https://www.jinbuguo.com/lfs/lfs62/chapter06/man-db.html)
        -   [Mktemp-1.5](https://www.jinbuguo.com/lfs/lfs62/chapter06/mktemp.html)
        -   [Module-Init-Tools-3.2.2](https://www.jinbuguo.com/lfs/lfs62/chapter06/module-init-tools.html)
        -   [Patch-2.5.4](https://www.jinbuguo.com/lfs/lfs62/chapter06/patch.html)
        -   [Psmisc-22.2](https://www.jinbuguo.com/lfs/lfs62/chapter06/psmisc.html)
        -   [Shadow-4.0.15](https://www.jinbuguo.com/lfs/lfs62/chapter06/shadow.html)
        -   [Sysklogd-1.4.1](https://www.jinbuguo.com/lfs/lfs62/chapter06/sysklogd.html)
        -   [Sysvinit-2.86](https://www.jinbuguo.com/lfs/lfs62/chapter06/sysvinit.html)
        -   [Tar-1.15.1](https://www.jinbuguo.com/lfs/lfs62/chapter06/tar.html)
        -   [Texinfo-4.8](https://www.jinbuguo.com/lfs/lfs62/chapter06/texinfo.html)
        -   [Udev-096](https://www.jinbuguo.com/lfs/lfs62/chapter06/udev.html)
        -   [Util-linux-2.12r](https://www.jinbuguo.com/lfs/lfs62/chapter06/util-linux.html)
        -   [Vim-7.0](https://www.jinbuguo.com/lfs/lfs62/chapter06/vim.html)
        -   [关于调试符号](https://www.jinbuguo.com/lfs/lfs62/chapter06/aboutdebug.html)
        -   [再次清理系统](https://www.jinbuguo.com/lfs/lfs62/chapter06/strippingagain.html)
        -   [最终的清理](https://www.jinbuguo.com/lfs/lfs62/chapter06/revisedchroot.html)
    -   #### 7\. 配置系统启动脚本
        
        -   [简介](https://www.jinbuguo.com/lfs/lfs62/chapter07/chapter07.html#ch-scripts-introduction)
        -   [LFS-Bootscripts-6.2](https://www.jinbuguo.com/lfs/lfs62/chapter07/bootscripts.html)
        -   [启动脚本是如何工作的?](https://www.jinbuguo.com/lfs/lfs62/chapter07/usage.html)
        -   [LFS 系统的设备和模块处理](https://www.jinbuguo.com/lfs/lfs62/chapter07/udev.html)
        -   [配置 setclock 脚本](https://www.jinbuguo.com/lfs/lfs62/chapter07/setclock.html)
        -   [配置 Linux 控制台](https://www.jinbuguo.com/lfs/lfs62/chapter07/console.html)
        -   [配置 sysklogd 脚本](https://www.jinbuguo.com/lfs/lfs62/chapter07/sysklogd.html)
        -   [创建 /etc/inputrc 文件](https://www.jinbuguo.com/lfs/lfs62/chapter07/inputrc.html)
        -   [Bash Shell 启动文件](https://www.jinbuguo.com/lfs/lfs62/chapter07/profile.html)
        -   [配置 localnet 脚本](https://www.jinbuguo.com/lfs/lfs62/chapter07/hostname.html)
        -   [定制 /etc/hosts 文件](https://www.jinbuguo.com/lfs/lfs62/chapter07/hosts.html)
        -   [为设备创建惯用符号连接](https://www.jinbuguo.com/lfs/lfs62/chapter07/symlinks.html)
        -   [配置网络脚本](https://www.jinbuguo.com/lfs/lfs62/chapter07/network.html)
    -   #### 8\. 使 LFS 系统能够启动
        
        -   [简介](https://www.jinbuguo.com/lfs/lfs62/chapter08/chapter08.html#ch-bootable-introduction)
        -   [创建 /etc/fstab 文件](https://www.jinbuguo.com/lfs/lfs62/chapter08/fstab.html)
        -   [Linux-2.6.16.27](https://www.jinbuguo.com/lfs/lfs62/chapter08/kernel.html)
        -   [使 LFS 系统能够启动](https://www.jinbuguo.com/lfs/lfs62/chapter08/grub.html)
    -   #### 9\. 结束
        
        -   [结束](https://www.jinbuguo.com/lfs/lfs62/chapter09/chapter09.html#ch-finish-theend)
        -   [看看你是第几个?](https://www.jinbuguo.com/lfs/lfs62/chapter09/getcounted.html)
        -   [重启系统](https://www.jinbuguo.com/lfs/lfs62/chapter09/reboot.html)
        -   [现在做什么?](https://www.jinbuguo.com/lfs/lfs62/chapter09/whatnow.html)
-   ### IV. 附录
    
    -   [A. 缩写和名词](https://www.jinbuguo.com/lfs/lfs62/appendices/acronymlist.html)
    -   [B. 致谢](https://www.jinbuguo.com/lfs/lfs62/appendices/acknowledgements.html)
    -   [C. 依赖关系](https://www.jinbuguo.com/lfs/lfs62/appendices/dependencies.html)
-   ### [长索引](https://www.jinbuguo.com/lfs/lfs62/longindex.html)
