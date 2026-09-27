## 6.11.1. 安装 Binutils

现在我们测试一下在 chroot 环境中，你的伪终端(PTY)是否正常工作。运行下面的命令：

expect -c "spawn ls"

如果看到这样的输出：

The system has no more ptys.
Ask your system administrator to create more.

说明你的chroot环境还没有设置好 PTY，这时运行 Binutils 和 GCC 的测试套件就没有意义了，你必须先解决 PTY 设置。

Binutils 的文档推荐用一个新建的目录来编译它，而不是在源码目录中：

mkdir -v ../binutils-build
cd ../binutils-build

为编译 Binutils 做准备：

../binutils-2.16.1/configure --prefix=/usr \\
    --enable-shared

编译软件包：

make tooldir=/usr

**make 参数的含义：**

_tooldir=/usr_

通常情况下，tooldir(可执行文件的安装目录) 是 $(exec\_prefix)/$(target\_alias)。例如在 i686 机器上，将是 tt class="filename">/usr/i686-pc-linux-gnu 。因为我们只为自己的系统进行编译，就并不需要在 /usr 目录后面再存在特殊的后缀。$(exec\_prefix)/$(target\_alias) 只是在交叉编译时(比如在 Intel 机器上编译将要在 PowerPC 上执行的程序)才用到。

![\[Important\]](https://www.jinbuguo.com/lfs/lfs62/images/important.png)

### 重要

本节的 Binutils 测试套件很重要。在任何情况下都不要省略这一步。

对结果进行测试：

make check

安装软件包：

make tooldir=/usr install

安装某些软件包需要的 libiberty 头文件：

cp -v ../binutils-2.16.1/include/libiberty.h /usr/include

**安装的程序：** addr2line, ar, as, c++filt, gprof, ld, nm, objcopy, objdump, ranlib, readelf, size, strings, strip

**安装的库：** libiberty.a, libbfd.{a,so}, libopcodes.{a,so}

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="addr2line" name="addr2line"></a><span><span><strong>addr2line</strong></span></span></td><td><p>把程序地址转换为文件名和行号。在命令行中给它一个地址和一个可执行文件名，它就会使用这个可执行文件的调试信息指出在给出的地址上是哪个文件以及行号。</p></td></tr><tr><td><a id="ar" name="ar"></a><span><span><strong>ar</strong></span></span></td><td><p>建立、修改、提取归档文件。归档文件是包含多个文件内容的一个大文件，其结构保证了可以恢复原始文件内容。</p></td></tr><tr><td><a id="as" name="as"></a><span><span><strong>as</strong></span></span></td><td><p>一个汇编器，用来汇编 <span><strong>gcc</strong></span> 的输出，产生的目标文件然后由接器 ld 连接。</p></td></tr><tr><td><a id="c-filt" name="c-filt"></a><span><span><strong>c++filt</strong></span></span></td><td><p>连接器使用它来过滤 C++ 和 Java 符号，防止重载函数冲突。</p></td></tr><tr><td><a id="gprof" name="gprof"></a><span><span><strong>gprof</strong></span></span></td><td><p>显示程序调用段的各种数据。</p></td></tr><tr><td><a id="ld" name="ld"></a><span><span><strong>ld</strong></span></span></td><td><p>连接器，它把一些目标和归档文件结合为一个文件，重定位数据，并链接符号引用。通常，建立一个新编译程序的最后一步就是调用 ld 。</p></td></tr><tr><td><a id="nm" name="nm"></a><span><span><strong>nm</strong></span></span></td><td><p>列出出现在目标文件中的符号</p></td></tr><tr><td><a id="objcopy" name="objcopy"></a><span><span><strong>objcopy</strong></span></span></td><td><p>把一种目标文件中的内容复制到另一种类型的目标文件中</p></td></tr><tr><td><a id="objdump" name="objdump"></a><span><span><strong>objdump</strong></span></span></td><td><p>显示所给目标文件的信息。使用选项来控制其显示的信息。它所显示的信息通常只有编写编译工具的人才感兴趣。</p></td></tr><tr><td><a id="ranlib" name="ranlib"></a><span><span><strong>ranlib</strong></span></span></td><td><p>产生归档文件索引，并将其保存到这个归档文件中。在索引中列出了归档文件各成员所定义的可重分配目标文件。</p></td></tr><tr><td><a id="readelf" name="readelf"></a><span><span><strong>readelf</strong></span></span></td><td><p>显示 ELF 格式可执行文件的信息</p></td></tr><tr><td><a id="size" name="size"></a><span><span><strong>size</strong></span></span></td><td><p>列出目标文件每一段的大小以及总体的大小。默认情况下，对于每个目标文件或者一个归档文件中的每个模块只产生一行输出。</p></td></tr><tr><td><a id="strings" name="strings"></a><span><span><strong>strings</strong></span></span></td><td><p>打印某个文件的可打印字符串，这些字符串最少 4 个字符长，也可以使用选项"-n"设置字符串的最小长度。默认情况下，它只打印目标文件初始化和可加载段中的可打印字符；对于其它类型的文件它打印整个文件的可打印字符，这个程序对于了解非文本文件的内容很有帮助。</p></td></tr><tr><td><a id="strip" name="strip"></a><span><span><strong>strip</strong></span></span></td><td><p>删除目标文件中的全部或者特定符号</p></td></tr><tr><td><a id="libiberty" name="libiberty"></a><span><tt>libiberty</tt></span></td><td><p>包含许多GNU程序都会用到的函数，这些程序有： <span><strong>getopt</strong></span>， <span><strong>obstack</strong></span>， <span><strong>strerror</strong></span>， <span><strong>strtol</strong></span>， 和 <span><strong>strtoul</strong></span></p></td></tr><tr><td><a id="libbfd" name="libbfd"></a><span><tt>libbfd</tt></span></td><td><p>二进制文件描述库</p></td></tr><tr><td><a id="libopcodes" name="libopcodes"></a><span><tt>libopcodes</tt></span></td><td><p>用来处理 opcodes（"可读文本格式的"）处理器操作指令)的库，在生成一些应用程序的时候也会用到它，比如 <span><strong>objdump</strong></span> 。</p></td></tr></tbody></table>
