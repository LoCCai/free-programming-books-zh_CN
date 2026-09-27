[第五章](https://www.jinbuguo.com/lfs/lfs62/chapter05/chapter05.html)中编译的所有程序都将安装到 $LFS/tools 目录下，以便与[第六章](https://www.jinbuguo.com/lfs/lfs62/chapter06/chapter06.html)中编译的程序隔离开来。这里编译的程序只是临时使用的工具，不是最终 LFS 系统的组成部分。把这些程序放到一个单独的目录下，在使用过之后简单的删除掉就可以了。这样做也可以防止这些程序与宿主系统中相同的程序混淆([第五章](https://www.jinbuguo.com/lfs/lfs62/chapter05/chapter05.html)中容易出现这样的事情)。

以 _root_ 用户运行下面的命令来创建所需的目录：

mkdir -v $LFS/tools

下一步是在宿主系统上创建一个 /tools 符号链接，指向 LFS 分区上新创建的目录，这个命令同样要作为 _root_ 用户运行：

ln -sv $LFS/tools /

![\[Note\]](https://www.jinbuguo.com/lfs/lfs62/images/note.png)

### 注意

上述命令是正确的，**ln** 命令的语法有了一点变化。如果您认为发现了一个错误，在报告它之前，先用 **info coreutils ln** 和 ln(1) 命令查看手册页。

所创建的符号链接使得将要编译的工具链总是位于 /tools 目录下，这意味着编译器、汇编器和连接器在本章(这时我们还在使用宿主系统的一些工具)和下一章(这时我们"chrooted"到了 LFS 分区)都可以使用。
