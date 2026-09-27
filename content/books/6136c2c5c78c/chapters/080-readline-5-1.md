## 6.23.1. 安装 Readline

上游开发者已经修正了自从 Readline-5.1 之后版本的一些问题。应用这些修正：

patch -Np1 -i ../readline-5.1-fixes-3.patch

重新安装 Readline 会将老的库libraryname重命名为<libraryname>.old。然而着并不是一个问题。在某些情况下它会引发**ldconfig** 的一个链接bug。应用下面的两个sed命令可以避免这种情况：

sed -i '/MV.\*old/d' Makefile.in
sed -i '/{OLDSUFF}/c:' support/shlib-install

为编译 Readline 做准备：

./configure --prefix=/usr --libdir=/lib

编译软件包：

make SHLIB\_LIBS=-lncurses

**make 选项的含义：**

_SHLIB\_LIBS=-lncurses_

这个选项强制 Readline 链接到 libncurses 库。

这个软件包没有附带测试程序。

安装软件包：

make install

给 Readline 动态库更多恰当的权限：

chmod -v 755 /lib/lib{readline,history}.so\*

将静态库移动到一个更合理的位置：

mv -v /lib/lib{readline,history}.a /usr/lib

删除 /lib 中的 .so 文件，并将它们重新连接到 /usr/lib 中：

rm -v /lib/lib{readline,history}.so
ln -sfv ../../lib/libreadline.so.5 /usr/lib/libreadline.so
ln -sfv ../../lib/libhistory.so.5 /usr/lib/libhistory.so

**安装的库：** libhistory.{a,so}, libreadline.{a,so}

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="libhistory" name="libhistory"></a><span><tt>libhistory</tt></span></td><td><p>提供一个统一的调用历史行的用户接口</p></td></tr><tr><td><a id="libreadline" name="libreadline"></a><span><tt>libreadline</tt></span></td><td><p>应用于各种需要命令行接口的应用程序的统一的用户接口的辅助程序</p></td></tr></tbody></table>
