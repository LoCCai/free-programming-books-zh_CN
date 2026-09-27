Ncurses 提供独立于终端的字符终端处理库，含有功能键定义(快捷键)、屏幕绘制以及基于文本终端的图形互动功能。

**预计编译时间：** 0.7 SBU

**所需磁盘空间：** 30 MB

## 5.13.1. 安装 Ncurses

为编译 Ncurses 做准备：

./configure --prefix=/tools --with-shared \\
    --without-debug --without-ada --enable-overwrite

**配置选项的含义：**

_\--without-ada_

这个选项让 Ncurses 在即使宿主系统上安装了 Ada 编译器的情况下也不要编译其 Ada 绑定。需要这样做的原因是一旦我们进入 **chroot** 环境，Ada 就不能使用了。

_\--enable-overwrite_

这个选项让 Ncurses 把它的头文件安装到 /tools/include 目录，而不是 /tools/include/ncurses 目录，以确保其它软件包可以顺利找到 Ncurses 的头文件。

编译软件包：

make

这个软件包没有附带测试程序。

安装软件包：

make install

关于这个软件包的详细资料位于[节 6.18.2, Ncurses 的内容](https://www.jinbuguo.com/lfs/lfs62/chapter06/ncurses.html#contents-ncurses "6.18.2. Ncurses 的内容")
