## 6.26.1. 安装 Automake

为编译 Automake 做准备：

./configure --prefix=/usr

编译软件包：

make

要测试结果，请运行：**make check** 。 This takes a long time, about 10 SUB.

安装软件包：

make install

**安装的程序：** acinstall, aclocal, aclocal-1.9.6, automake, automake-1.9.6, compile, config.guess, config.sub, depcomp, elisp-comp, install-sh, mdate-sh, missing, mkinstalldirs, py-compile, symlink-tree, ylwrap

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="acinstall" name="acinstall"></a><span><span><strong>acinstall</strong></span></span></td><td><p>用来安装 aclocal 风格的 M4文件的脚本</p></td></tr><tr><td><a id="aclocal" name="aclocal"></a><span><span><strong>aclocal</strong></span></span></td><td><p>根据 <tt>configure.in</tt> 文件的内容，自动生成 <tt>aclocal.m4</tt> 文件</p></td></tr><tr><td><a id="aclocal-version" name="aclocal-version"></a><span><span><strong>aclocal-1.9.6</strong></span></span></td><td><p><span><strong>aclocal</strong></span>的硬链接</p></td></tr><tr><td><a id="automake" name="automake"></a><span><span><strong>automake</strong></span></span></td><td><p>根据 <tt>Makefile.am</tt> 文件的内容，自动生成 <tt>Makefile.in</tt> 文件。在目录的顶层运行该命令，可以为一个包建立所有的 <tt>Makefile.in</tt> 文件。通过扫描 <tt>configure.in</tt> 文件，它可以自动找到每一个合适的 <tt>Makefile.am</tt> 文件并且产生相应的 <tt>Makefile.in</tt> 文件。</p></td></tr><tr><td><a id="automake-version" name="automake-version"></a><span><span><strong>automake-1.9.6</strong></span></span></td><td><p><span><strong>automake</strong></span>的一个硬链接</p></td></tr><tr><td><a id="compile" name="compile"></a><span><span><strong>compile</strong></span></span></td><td><p>包装了编译器的脚本</p></td></tr><tr><td><a id="config.guess" name="config.guess"></a><span><span><strong>config.guess</strong></span></span></td><td><p>用来为特定的 build, host, target 尝试猜测标准的系统名称的脚本</p></td></tr><tr><td><a id="config.sub" name="config.sub"></a><span><span><strong>config.sub</strong></span></span></td><td><p>配置验证子脚本</p></td></tr><tr><td><a id="depcomp" name="depcomp"></a><span><span><strong>depcomp</strong></span></span></td><td><p>在编译程序的同时产生其依赖信息的脚本</p></td></tr><tr><td><a id="elisp-comp" name="elisp-comp"></a><span><span><strong>elisp-comp</strong></span></span></td><td><p>按字节编译 Emacs Lisp 代码</p></td></tr><tr><td><a id="install-sh" name="install-sh"></a><span><span><strong>install-sh</strong></span></span></td><td><p>能安装程序、脚本、数据文件的脚本</p></td></tr><tr><td><a id="mdate-sh" name="mdate-sh"></a><span><span><strong>mdate-sh</strong></span></span></td><td><p>打印程序和目录更改时间的脚本</p></td></tr><tr><td><a id="missing" name="missing"></a><span><span><strong>missing</strong></span></span></td><td><p>一个用来填充在安装过程检查出的缺失的 GNU 程序空位的脚本</p></td></tr><tr><td><a id="mkinstalldirs" name="mkinstalldirs"></a><span><span><strong>mkinstalldirs</strong></span></span></td><td><p>产生目录树结构的脚本</p></td></tr><tr><td><a id="py-compile" name="py-compile"></a><span><span><strong>py-compile</strong></span></span></td><td><p>编译 Python 程序</p></td></tr><tr><td><a id="symlink-tree" name="symlink-tree"></a><span><span><strong>symlink-tree</strong></span></span></td><td><p>为整个目录创建符号链接的脚本</p></td></tr><tr><td><a id="ylwrap" name="ylwrap"></a><span><span><strong>ylwrap</strong></span></span></td><td><p>包装了 <span><strong>lex</strong></span> 和 <span><strong>yacc</strong></span> 的脚本</p></td></tr></tbody></table>
