## 6.29.1. 安装 Diffutils

POSIX 要求 **diff** 命令能够根据当前的locale处理 whitespace（空白符）。 下面的patch可以解决这个问题：

patch -Np1 -i ../diffutils-2.8.1-i18n-1.patch

上面的这个patch将会导致用一个无效的程序**help2man**来重新编译 diff.1 man 帮助。结果导致 **diff** 的 man 不可读。我们可以通过改变 man/diff.1 的时间戳来避免这个问题：

touch man/diff.1

为编译 Diffutils 做准备：

./configure --prefix=/usr

编译软件包：

make

这个软件包没有附带测试程序。

安装软件包：

make install

**安装的程序：** cmp, diff, diff3, sdiff

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="cmp" name="cmp"></a><span><span><strong>cmp</strong></span></span></td><td><p>比较两个文件，并指出它们是否不同及不同的字节。</p></td></tr><tr><td><a id="diff" name="diff"></a><span><span><strong>diff</strong></span></span></td><td><p>比较两个文件或目录，并指出哪些文件的哪些行不同。</p></td></tr><tr><td><a id="diff3" name="diff3"></a><span><span><strong>diff3</strong></span></span></td><td><p>逐行比较三个文件</p></td></tr><tr><td><a id="sdiff" name="sdiff"></a><span><span><strong>sdiff</strong></span></span></td><td><p>合并两个文件，并以交互方式输出结果</p></td></tr></tbody></table>
