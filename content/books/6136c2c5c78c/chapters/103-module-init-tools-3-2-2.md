## 6.47.1. 安装 Module-Init-Tools

首先更正一个当模块被指定使用正则表达式时会出现的潜在问题：

patch -Np1 -i ../module-init-tools-3.2.2-modprobe-1.patch

执行下面的命令进行测试（注意 **make distclean** 命令需要清理源码树，因为作为测试过程的一部分，源码会重新编译：

./configure &&
make check &&
make distclean

为编译 Module-Init-Tools 做准备：

./configure --prefix=/ --enable-zlib

编译软件包：

make

安装软件包：

make INSTALL=install install

**make 参数的含义：**

_INSTALL=install_

正常情况下，如果二进制文件已经存在了，**make install** 就不会安装它们。 这个选项是调用 **install** 而不是使用默认封装的脚本。

**安装的程序：** depmod, generate-modprobe.conf, insmod, insmod.static, lsmod, modinfo, modprobe, rmmod

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="depmod" name="depmod"></a><span><span><strong>depmod</strong></span></span></td><td><p>创建一个可加载内核模块的依赖关系文件，<span><strong>modprobe</strong></span> 用它来自动加载模块。</p></td></tr><tr><td><a id="generate-modprobe.conf" name="generate-modprobe.conf"></a><span><span><strong>generate-modprobe.conf</strong></span></span></td><td><p>从一个现存的2.2 或者 2.4版本内核的模块设置中创建一个 modprobe.conf 文件</p></td></tr><tr><td><a id="insmod" name="insmod"></a><span><span><strong>insmod</strong></span></span></td><td><p>向正在运行的内核加载模块</p></td></tr><tr><td><a id="insmod.static" name="insmod.static"></a><span><span><strong>insmod.static</strong></span></span></td><td><p><span><strong>insmod</strong></span> 的静态编译版本</p></td></tr><tr><td><a id="lsmod" name="lsmod"></a><span><span><strong>lsmod</strong></span></span></td><td><p>显示当前已加载的内核模块信息</p></td></tr><tr><td><a id="modinfo" name="modinfo"></a><span><span><strong>modinfo</strong></span></span></td><td><p>检查与内核模块相关联的目标文件，并打印出所有能得到的信息。</p></td></tr><tr><td><a id="modprobe" name="modprobe"></a><span><span><strong>modprobe</strong></span></span></td><td><p>利用 <span><strong>depmod</strong></span> 创建的依赖关系文件来自动加载相关的模块</p></td></tr><tr><td><a id="rmmod" name="rmmod"></a><span><span><strong>rmmod</strong></span></span></td><td><p>从当前运行的内核中卸载模块</p></td></tr></tbody></table>
