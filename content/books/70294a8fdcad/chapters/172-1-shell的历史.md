Shell的作用是解释执行用户的命令，用户输入一条命令，Shell就解释执行一条，这种方式称为交互式（Interactive），Shell还有一种执行命令的方式称为批处理（Batch），用户事先写一个Shell脚本（Script），其中有很多条命令，让Shell一次把这些命令执行完，而不必一条一条地敲命令。Shell脚本和编程语言很相似，也有变量和流程控制语句，但Shell脚本是解释执行的，不需要编译，Shell程序从脚本中一行一行读取并执行这些命令，相当于一个用户把脚本中的命令一行一行敲到Shell提示符下执行。

由于历史原因，UNIX系统上有很多种Shell：

1.  `sh`（Bourne Shell）：由Steve Bourne开发，各种UNIX系统都配有`sh`。
    
2.  `csh`（C Shell）：由Bill Joy开发，随BSD UNIX发布，它的流程控制语句很像C语言，支持很多Bourne Shell所不支持的功能：作业控制，命令历史，命令行编辑。
    
3.  `ksh`（Korn Shell）：由David Korn开发，向后兼容`sh`的功能，并且添加了`csh`引入的新功能，是目前很多UNIX系统标准配置的Shell，在这些系统上`/bin/sh`往往是指向`/bin/ksh`的符号链接。
    
4.  `tcsh`（TENEX C Shell）：是`csh`的增强版本，引入了命令补全等功能，在FreeBSD、Mac OS X等系统上替代了`csh`。
    
5.  `bash`（Bourne Again Shell）：由GNU开发的Shell，主要目标是与POSIX标准保持一致，同时兼顾对`sh`的兼容，`bash`从`csh`和`ksh`借鉴了很多功能，是各种Linux发行版标准配置的Shell，在Linux系统上`/bin/sh`往往是指向`/bin/bash`的符号链接\[[38](#ftn.id2871814)\]。虽然如此，`bash`和`sh`还是有很多不同的，一方面，`bash`扩展了一些命令和参数，另一方面，`bash`并不完全和`sh`兼容，有些行为并不一致，所以`bash`需要模拟`sh`的行为：当我们通过`sh`这个程序名启动`bash`时，`bash`可以假装自己是`sh`，不认扩展的命令，并且行为与`sh`保持一致。
    

文件`/etc/shells`给出了系统中所有已知（不一定已安装）的Shell，除了上面提到的Shell之外还有很多变种。

\# /etc/shells: valid login shells
/bin/csh
/bin/sh
/usr/bin/es
/usr/bin/ksh
/bin/ksh
/usr/bin/rc
/usr/bin/tcsh
/bin/tcsh
/usr/bin/esh
/bin/dash
/bin/bash
/bin/rbash
/usr/bin/screen

用户的默认Shell设置在`/etc/passwd`文件中，例如下面这行对用户mia的设置:

mia:L2NOfqdlPrHwE:504:504:Mia Maya:/home/mia:/bin/bash

用户mia从字符终端登录或者打开图形终端窗口时就会自动执行`/bin/bash`。如果要切换到其它Shell，可以在命令行输入程序名，例如：

~$ sh（在bash提示符下输入sh命令）
$（出现sh的提示符）
$（按Ctrl-d或者输入exit命令）
~$（回到bash提示符）
~$（再次按Ctrl-d或者输入exit命令会退出登录或者关闭图形终端窗口）

本章只介绍`bash`和`sh`的用法和相关语法，不介绍其它Shell。所以下文提到Shell都是指`bash`或`sh`。

  

* * *

\[[38](#id2871814)\] 最新的发行版有一些变化，例如Ubuntu 7.10的`/bin/sh`是指向`/bin/dash`的符号链接，`dash`也是一种类似`bash`的Shell。

$ ls /bin/sh /bin/dash -l
-rwxr-xr-x 1 root root 79988 2008-03-12 19:22 /bin/dash
lrwxrwxrwx 1 root root     4 2008-07-04 05:58 /bin/sh -> dash
