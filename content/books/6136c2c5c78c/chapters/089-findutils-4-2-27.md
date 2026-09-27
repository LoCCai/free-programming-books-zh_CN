Findutils 包含查找文件的工具，既能即时查找(递归的搜索目录，并可以显示、创建和维护文件)，也能在数据库里查找(通常比递归查找快但是在数据库没有及时更新的情况下，结果并不可靠)。

**预计编译时间：** 0.2 SBU

**所需磁盘空间：** 12 MB

## 6.32.1. 安装 Findutils

为编译 Findutils 做准备：

./configure --prefix=/usr --libexecdir=/usr/lib/findutils \\
    --localstatedir=/var/lib/locate

**配置选项的含义：**

_\--localstatedir_

将 **locate** 数据库的位置指定为 /var/lib/locate ，以符合 FHS 标准。

编译软件包：

make

要测试结果，请运行：**make check** 。

安装软件包：

make install

LFS-Bootscripts 包中的一些脚本依赖于 **find**。因为在系统启动的前期，/usr 目录还是无法访问的（比如还没有挂载上），因此这个程序需要放在根分区上。 **updatedb** 脚本也需要用完全路径来修正：

mv -v /usr/bin/find /bin
sed -i -e 's/find:=${BINDIR}/find:=\\/bin/' /usr/bin/updatedb

**安装的程序：** bigram, code, find, frcode, locate, updatedb, xargs

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="bigram" name="bigram"></a><span><span><strong>bigram</strong></span></span></td><td><p>以前用来创建 <span><strong>locate</strong></span> 数据库。</p></td></tr><tr><td><a id="code" name="code"></a><span><span><strong>code</strong></span></span></td><td><p>以前用来创建 <span><strong>locate</strong></span> 数据库。它是 <span><strong>frcode</strong></span> 的前身。</p></td></tr><tr><td><a id="find" name="find"></a><span><span><strong>find</strong></span></span></td><td><p>在一个目录和其子目录里面找符合条件的文件</p></td></tr><tr><td><a id="frcode" name="frcode"></a><span><span><strong>frcode</strong></span></span></td><td><p>被 <span><strong>updatedb</strong></span> 调用来压缩文件名列表，它使用的是前端压缩(front-compression)，可以减小数据库4到5倍。</p></td></tr><tr><td><a id="locate" name="locate"></a><span><span><strong>locate</strong></span></span></td><td><p>扫描一个文件名称数据库，可以列出在数据库中符合条件的文件或者目录。</p></td></tr><tr><td><a id="updatedb" name="updatedb"></a><span><span><strong>updatedb</strong></span></span></td><td><p>更新 <span><strong>locate</strong></span> 数据库。它会扫描整个文件系统，包括所有挂载的文件系统(除非设定参数禁止)，并且把每一个找到的文件和目录放到 <span><strong>locate</strong></span> 数据库里面。</p></td></tr><tr><td><a id="xargs" name="xargs"></a><span><span><strong>xargs</strong></span></span></td><td><p>可以在一系列文件上运行同一个命令</p></td></tr></tbody></table>
