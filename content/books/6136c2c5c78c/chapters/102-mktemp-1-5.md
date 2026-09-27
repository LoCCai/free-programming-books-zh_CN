## 6.46.1. 安装 Mktemp

许多脚本目前仍然使用被反对使用的类似于 **mktemp** 的 **tempfile** 程序，我们现在要给 Mktemp 打一个补丁，以使它包含 **tempfile** 包装：

patch -Np1 -i ../mktemp-1.5-add\_tempfile-3.patch

为编译 Mktemp 做准备：

./configure --prefix=/usr --with-libc

**配置选项的含义：**

_\--with-libc_

这个使得 **mktemp** 程序从系统的 C 库中使用 _mkstemp_ 和 _mkdtemp_ 的功能。

编译软件包：

make

这个软件包没有附带测试程序。

安装软件包：

make install
make install-tempfile

**安装的程序：** mktemp, tempfile

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="mktemp" name="mktemp"></a><span><span><strong>mktemp</strong></span></span></td><td><p>使用安全性较强的方式创建临时文件，用于脚本中。</p></td></tr><tr><td><a id="tempfile" name="tempfile"></a><span><span><strong>tempfile</strong></span></span></td><td><p>使用比 <span><strong>mktemp</strong></span> 安全性较弱的方式创建临时文件，但是能够满足向后的兼容性。</p></td></tr></tbody></table>
