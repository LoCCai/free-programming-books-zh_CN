Ncurses 程序包提供字符终端处理库，包括面板和菜单。

**预计编译时间：** 0.7 SBU

**所需磁盘空间：** 31 MB

## 6.18.1. 安装 Ncurses

Ncurses-5.5 有一个内存泄漏和一些显示的bug被发现，并修正了。应用这些修正：

patch -Np1 -i ../ncurses-5.5-fixes-1.patch

为编译 Ncurses 做准备：

./configure --prefix=/usr --with-shared --without-debug --enable-widec

**配置选项的含义：**

_\--enable-widec_

这个选项导致宽字符库（例如，libncursesw.so.5.5）将会替换正常的（例如，libncurses.so.5.5）。这些宽字符库可以在 多字节和传统的8位 locale 下使用，然而正常的库一般只能在 8位 的locale环境下工作。宽字符和正常的库是源码兼容的，但不是二进制兼容的。

编译软件包：

make

这个软件包没有附带测试程序。

安装软件包：

make install

赋予 ncurses 库文件可执行权限：

chmod -v 755 /usr/lib/\*.5.5

修正一个不应该有可执行权限的库文件：

chmod -v 644 /usr/lib/libncurses++w.a

把库文件移到更合理的 /lib 目录里：

mv -v /usr/lib/libncursesw.so.5\* /lib

由于库文件移动了，所以有的符号链接就指向了不存在的文件。需要重新创建这些符号链接：

ln -sfv ../../lib/libncursesw.so.5 /usr/lib/libncursesw.so

许多的程序依然希望链接器能够发现非宽字符的 Ncurses 库。通过符号链接和链接器脚本来欺骗它使其链接宽字符的库：

for lib in curses ncurses form panel menu ; do \\
    rm -vf /usr/lib/lib${lib}.so ; \\
    echo "INPUT(-l${lib}w)" >/usr/lib/lib${lib}.so ; \\
    ln -sfv lib${lib}w.a /usr/lib/lib${lib}.a ; \\
done &&
ln -sfv libncurses++w.a /usr/lib/libncurses++.a

最后，确保一些在编译的时候寻找 \-lcurses 的老程序仍然可以编译：

echo "INPUT(-lncursesw)" >/usr/lib/libcursesw.so &&
ln -sfv libncurses.so /usr/lib/libcurses.so &&
ln -sfv libncursesw.a /usr/lib/libcursesw.a &&
ln -sfv libncurses.a /usr/lib/libcurses.a

![\[Note\]](https://www.jinbuguo.com/lfs/lfs62/images/note.png)

### 注意

上面的说明并没有创建非宽字符的 Ncurses 库，因为没有软件包编译后在运行时需要链接到它们的。如果你因为一些只有二进制文件的程序，必须安装这样的库的话，按照下面的命令进行编译：

make distclean &&
./configure --prefix=/usr --with-shared --without-normal \\
  --without-debug --without-cxx-binding &&
make sources libs &&
cp -av lib/lib\*.so.5\* /usr/lib

**安装的程序：** captoinfo(→tic), clear, infocmp, infotocap(→tic), reset(→tset), tack, tic, toe, tput, tset

**安装的库：** libcursesw.{a,so} (symlink and linker script to libncursesw.{a,so}), libformw.{a,so}, libmenuw.{a,so}, libncurses++w.a, libncursesw.{a,so}, libpanelw.{a,so} and their non-wide-character counterparts without "w" in the library names.

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="captoinfo" name="captoinfo"></a><span><span><strong>captoinfo</strong></span></span></td><td><p>将 termcap 描述转化成 terminfo 描述</p></td></tr><tr><td><a id="clear" name="clear"></a><span><span><strong>clear</strong></span></span></td><td><p>如果可能，就进行清屏操作</p></td></tr><tr><td><a id="infocmp" name="infocmp"></a><span><span><strong>infocmp</strong></span></span></td><td><p>比较或显示 terminfo 描述</p></td></tr><tr><td><a id="infotocap" name="infotocap"></a><span><span><strong>infotocap</strong></span></span></td><td><p>将 terminfo 描述转化成 termcat 描述</p></td></tr><tr><td><a id="reset" name="reset"></a><span><span><strong>reset</strong></span></span></td><td><p>重新初始化终端到默认值</p></td></tr><tr><td><a id="tack" name="tack"></a><span><span><strong>tack</strong></span></span></td><td><p>terminfo 动作检测器。主要用来测试 terminfo 数据库中某一条目的正确性。</p></td></tr><tr><td><a id="tic" name="tic"></a><span><span><strong>tic</strong></span></span></td><td><p>Tic 是 terminfo 项说明的编译器。这个程序通过 ncurses 库将源代码格式的 terminfo 文件转换成编译后格式(二进制)的文件。 Terminfo 文件包含终端能力的信息。</p></td></tr><tr><td><a id="toe" name="toe"></a><span><span><strong>toe</strong></span></span></td><td><p>列出所有可用的终端类型，分别列出名称和描述。</p></td></tr><tr><td><a id="tput" name="tput"></a><span><span><strong>tput</strong></span></span></td><td><p>利用 terminfo 数据库使与终端相关的能力和信息值对 shell 可用，初始化和重新设置终端，或返回所要求终端为类型的长名。</p></td></tr><tr><td><a id="tset" name="tset"></a><span><span><strong>tset</strong></span></span></td><td><p>可以用来初始化终端</p></td></tr><tr><td><a id="libcurses" name="libcurses"></a><span><tt>libcurses</tt></span></td><td><p>链接到 <tt>libncurses</tt></p></td></tr><tr><td><a id="libncurses" name="libncurses"></a><span><tt>libncurses</tt></span></td><td><p>用来在显示器上显示文本的库。一个例子就是在内核的 <span><strong>make menuconfig</strong></span> 进程中。</p></td></tr><tr><td><a id="libform" name="libform"></a><span><tt>libform</tt></span></td><td><p>在 ncurses 中使用表格</p></td></tr><tr><td><a id="libmenu" name="libmenu"></a><span><tt>libmenu</tt></span></td><td><p>在 ncurses 中使用菜单</p></td></tr><tr><td><a id="libpanel" name="libpanel"></a><span><tt>libpanel</tt></span></td><td><p>在 ncurses 中使用面板</p></td></tr></tbody></table>
