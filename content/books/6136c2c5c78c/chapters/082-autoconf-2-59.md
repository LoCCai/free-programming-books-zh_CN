## 6.25.1. 安装 Autoconf

为编译 Autoconf 做准备：

./configure --prefix=/usr

编译软件包：

make

要测试结果，请运行：**make check** 。这可能要花费比较长的时间，大约 3 SUB。另外，因为要用到 Automake 的原因，跳过测试二。为了全面测试，可以在 Auotomake 安装完后重新测试。

安装软件包：

make install

**安装的程序：** autoconf, autoheader, autom4te, autoreconf, autoscan, autoupdate, ifnames

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="autoconf" name="autoconf"></a><span><span><strong>autoconf</strong></span></span></td><td><p>一个产生可以自动配置源代码包，生成shell脚本的工具，以适应各种类 UNIX 系统的需要。<span><strong>autoconf</strong></span> 产生的配置脚本在运行时独立于 <span><strong>autoconf</strong></span> ，因此使用这些脚本的用户不需要安装 <span><strong>autoconf</strong></span> 。</p></td></tr><tr><td><a id="autoheader" name="autoheader"></a><span><span><strong>autoheader</strong></span></span></td><td><p>能够创建供 configure 脚本使用的 C <span><em>#define</em></span> 语句模板文件。</p></td></tr><tr><td><a id="autom4te" name="autom4te"></a><span><span><strong>autom4te</strong></span></span></td><td><p>一个 M4 宏处理器的包装</p></td></tr><tr><td><a id="autoreconf" name="autoreconf"></a><span><span><strong>autoreconf</strong></span></span></td><td><p>当 <span><strong>autoconf</strong></span> 和 <span><strong>automake</strong></span> 的模版文件被改变的时候，以正确的顺序自动运行 <span><strong>autoconf</strong></span>, <span><strong>autoheader</strong></span>, <span><strong>aclocal</strong></span>, span&gt;<strong>automake</strong>, <span><strong>gettextize</strong></span>, <span><strong>libtoolize</strong></span> 以节约时间。</p></td></tr><tr><td><a id="autoscan" name="autoscan"></a><span><span><strong>autoscan</strong></span></span></td><td><p>为软件包创建 <tt>configure.in</tt> 文件。它以命令行参数中指定的目录为根(如果未给定参数则以当前目录为根)的目录树中检查源文件，搜索其中的可移植性问题，为那个软件包创建一个 <tt>configure.scan</tt> 文件以充当一个预备性的 <tt>configure.in</tt> 文件。</p></td></tr><tr><td><a id="autoupdate" name="autoupdate"></a><span><span><strong>autoupdate</strong></span></span></td><td><p>将 <tt>configure.in</tt> 文件中 <span><strong>autoconf</strong></span> 宏的旧名称更新为当前名称</p></td></tr><tr><td><a id="ifnames" name="ifnames"></a><span><span><strong>ifnames</strong></span></span></td><td><p>为一个软件包写 <tt>configure.in</tt> 文件提供帮助，它打印软件包中那些在 C 预处理器中已经使用了的标识符。如果一个包已经设置成具有某些可移植属性，这个程序能够帮助指出它的 <span><strong>configure</strong></span> 脚本应该如何检查。它可以用来填补由 <tt>configure.in</tt> 产生的 <span><strong>autoscan</strong></span> 中的隔阂。</p></td></tr></tbody></table>
