## 6.54.1. 安装 Texinfo

**info** 程序假定一个字符串在屏幕上占据的字符单元树和在内存中的字节数是一样的。 在 UTF-8 的 locale 环境下，字符串就被拆散了。下面的patch可以在多字节的locale环境下将它们转回到英文信息：

patch -Np1 -i ../texinfo-4.8-multibyte-1.patch

Texinfo 允许本地用户通过位于临时文件中的符号连接改写任意文件，下面的补丁可以修正这个问题：

patch -Np1 -i ../texinfo-4.8-tempfile\_fix-2.patch

为编译 Texinfo 做准备：

./configure --prefix=/usr

编译软件包：

make

要测试结果，请运行：**make check** 。

安装软件包：

make install

安装 texinfo 组件中本应由 TeX 来安装的部份(可选操作)：

make TEXMF=/usr/share/texmf install-tex

**make 参数的含义：**

_TEXMF=/usr/share/texmf_

如果你以后打算安装 TeX 的话，makefile 中的 TEXMF 变量保存着你的 TeX 树的位置。

Info 文档系统使用一个纯文本文件来存放菜单条目的列表。这个文件位于 /usr/share/info/dir 。不幸的是，由于不同软件包中 Makefile 的偶然问题，有时候这个文件会与实际安装在系统里的 Info 文档不一致。如果你要再次创建 /usr/share/info/dir 文件，可以使用下面的命令：

cd /usr/share/info
rm dir
for f in \*
do install-info $f dir 2>/dev/null
done

**安装的程序：** info, infokey, install-info, makeinfo, texi2dvi, texi2pdf, texindex

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="info" name="info"></a><span><span><strong>info</strong></span></span></td><td><p>用于读取 Info 文档，它类似于 man 手册页，但是他们会给出更深入的解释而不是停留在解释程序参数上。例如你可以看看 <span><strong>man bison</strong></span> 和 <span><strong>info bison</strong></span> 的区别。</p></td></tr><tr><td><a id="infokey" name="infokey"></a><span><span><strong>infokey</strong></span></span></td><td><p>把包括 Info 设置的源文件编译成二进制格式</p></td></tr><tr><td><a id="install-info" name="install-info"></a><span><span><strong>install-info</strong></span></span></td><td><p>安装 info 文档，它会更新 <span><strong>info</strong></span> 的索引文件</p></td></tr><tr><td><a id="makeinfo" name="makeinfo"></a><span><span><strong>makeinfo</strong></span></span></td><td><p>将 Texinfo 源文档翻译成不同的格式，包括html、info文档、文本文档。</p></td></tr><tr><td><a id="texi2dvi" name="texi2dvi"></a><span><span><strong>texi2dvi</strong></span></span></td><td><p>把给定的 Texinfo 文档格式化成可打印的设备无关的文件</p></td></tr><tr><td><a id="texi2pdf" name="texi2pdf"></a><span><span><strong>texi2pdf</strong></span></span></td><td><p>将 Texinfo 文档转化成 PDF 文件</p></td></tr><tr><td><a id="texindex" name="texindex"></a><span><span><strong>texindex</strong></span></span></td><td><p>对 Texinfo 索引文件进行排序</p></td></tr></tbody></table>
