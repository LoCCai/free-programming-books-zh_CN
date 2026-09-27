## 5.3.1. 安装 Binutils

首先安装的第一个软件包是 Binutils ，这非常重要，因为 Glibc 和 GCC 会针对可用的连接器和汇编器进行多种测试，以决定是否打开某些特性。

Binutils 的文档推荐用一个新建的目录来编译它，而不是在源码目录中：

mkdir -v ../binutils-build
cd ../binutils-build

![\[Note\]](https://www.jinbuguo.com/lfs/lfs62/images/note.png)

### 注意

如果你想使用本书余下部份列出的 SBU 值，那么现在就要测量一下编译本软件包的时间。你可以用类似下面这样的 **time** 命令：**time { ./configure ... && make && make install; }** 。

为编译 Binutils 做准备：

../binutils-2.16.1/configure --prefix=/tools --disable-nls

**配置选项的含义：**

_\--prefix=/tools_

这个参数告诉 configure 脚本，应该把 Binutils 软件包中的程序安装到 /tools 目录中。

_\--disable-nls_

这个参数禁止了国际化(通常简称i18n)，静态程序不需要国际化的特性。

接下来编译它：

make

现在编译完成了。通常我们会运行测试套件，但是目前测试套件(Tcl, Expect, DejaGNU)尚未安装。而且在这里运行测试也没什么用处，因为第一遍安装的程序很快就会被第二遍的程序所覆盖。

安装软件包：

make install

接下来为后面"调整工具链"步骤准备连接器：

make -C ld clean
make -C ld LIB\_PATH=/tools/lib
cp -v ld/ld-new /tools/bin

**make 参数的含义：**

_\-C ld clean_

告诉 make 程序删除所有 ld 子目录中编译生成的文件。

_\-C ld LIB\_PATH=/tools/lib_

这个选项重新编译 ld 子目录中的所有文件。在命令行中指定 Makefile 的 LIB\_PATH 变量值，使它明确指向临时工具目录，以覆盖默认值。这个变量的值指定了连接器的默认库搜索路径，它在这一章的稍后部分会用到。
