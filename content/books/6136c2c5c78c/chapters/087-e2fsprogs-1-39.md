## 6.30.1. 安装 E2fsprogs

**配置选项的含义：**

_\--with-root-prefix=""_

有的程序(如 **e2fsck** )对系统来说是非常重要的，例如，在 /usr 没有挂载的情况下。这些程序和库就应放在像 /lib 和 /sbin 这些目录中。如果没有把上面的参数传递给 E2fsprogs 的 configure 脚本，它就会把程序放在 /usr 目录下。

_\--enable-elf-shlibs_

这会创建共享的库，供 E2fsprogs 包中的一些程序使用。

_\--disable-evms_

这个选项禁止了企业卷管理系统(EVMS)插件的支持。因为这个插件并没有更新到适合最新的 EVMS 接口并且 EVMS 并不是基本 LFS 系统的一部分，所以我们并不需要这个插件。请参考 EVMS 网站 [_http://evms.sourceforge.net/_](http://evms.sourceforge.net/) 以获得更多信息。

编译软件包：

make

要测试结果，请运行：**make check** 。

E2fsprogs 的一个测试会尝试分配 256 MB 内存。如果你没有充足的RAM空间，推荐打开足够的交换分区。参见[节 2.3, "在新分区上创建文件系统"](https://www.jinbuguo.com/lfs/lfs62/chapter02/creatingfilesystem.html "2.3. 在新分区上创建文件系统") 和 [节 2.4, "挂载新分区"](https://www.jinbuguo.com/lfs/lfs62/chapter02/mounting.html "2.4. 挂载新分区") 获取关于创建和激活交换分区的细节。

安装二进制文件和文档：

make install

安装共享库：

make install-libs

**安装的程序：** badblocks, blkid, chattr, compile\_et, debugfs, dumpe2fs, e2fsck, e2image, e2label, filefrag, findfs, fsck, fsck.ext2, fsck.ext3, logsave, lsattr, mk\_cmds, mke2fs, mkfs.ext2, mkfs.ext3, mklost+found, resize2fs, tune2fs, uuidgen.

**安装的库：** libblkid.{a,so}, libcom\_err.{a,so}, libe2p.{a,so}, libext2fs.{a,so}, libss.{a,so}, libuuid.{a,so}

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="badblocks" name="badblocks"></a><span><span><strong>badblocks</strong></span></span></td><td><p>用来检查设备(通常是硬盘分区)上的坏块</p></td></tr><tr><td><a id="blkid" name="blkid"></a><span><span><strong>blkid</strong></span></span></td><td><p>定位并打印出块设备属性的命令行工具</p></td></tr><tr><td><a id="chattr" name="chattr"></a><span><span><strong>chattr</strong></span></span></td><td><p>在 <tt>ext2</tt> 和 <tt>ext3</tt> 文件系统上改变文件属性</p></td></tr><tr><td><a id="compile_et" name="compile_et"></a><span><span><strong>compile_et</strong></span></span></td><td><p>用来将错误代码(error-code)和相关出错信息的列表 转化为适用于 <tt>com_err</tt> 库的 C 语言文件</p></td></tr><tr><td><a id="debugfs" name="debugfs"></a><span><span><strong>debugfs</strong></span></span></td><td><p>文件系统调试器。能用来检查和改变 <tt>ext2</tt> 文件系统的状态</p></td></tr><tr><td><a id="dumpe2fs" name="dumpe2fs"></a><span><span><strong>dumpe2fs</strong></span></span></td><td><p>打印特定设备上现存的文件系统的超级块(super block)和块群(blocks group)的信息</p></td></tr><tr><td><a id="e2fsck" name="e2fsck"></a><span><span><strong>e2fsck</strong></span></span></td><td><p>用来检查和修复 <tt>ext2</tt> 和 <tt>ext3</tt> 文件系统</p></td></tr><tr><td><a id="e2image" name="e2image"></a><span><span><strong>e2image</strong></span></span></td><td><p>将关键的 <tt>ext2</tt> 文件系统数据保存到一个文件中</p></td></tr><tr><td><a id="e2label" name="e2label"></a><span><span><strong>e2label</strong></span></span></td><td><p>显示或者改变指定设备上的 <tt>ext2</tt> 文件系统标识</p></td></tr><tr><td><a id="filefrag" name="filefrag"></a><span><span><strong>filefrag</strong></span></span></td><td><p>报告一个文件的碎片情况</p></td></tr><tr><td><a id="findfs" name="findfs"></a><span><span><strong>findfs</strong></span></span></td><td><p>通过卷标或通用唯一标识符(UUID)寻找文件系统</p></td></tr><tr><td><a id="fsck" name="fsck"></a><span><span><strong>fsck</strong></span></span></td><td><p>用来检查或者修理文件系统</p></td></tr><tr><td><a id="fsck.ext2" name="fsck.ext2"></a><span><span><strong>fsck.ext2</strong></span></span></td><td><p>默认检查 <tt>ext2</tt> 文件系统</p></td></tr><tr><td><a id="fsck.ext3" name="fsck.ext3"></a><span><span><strong>fsck.ext3</strong></span></span></td><td><p>默认检查 <tt>ext3</tt> 文件系统</p></td></tr><tr><td><a id="logsave" name="logsave"></a><span><span><strong>logsave</strong></span></span></td><td><p>把一个命令的输出保存在日志文件中</p></td></tr><tr><td><a id="lsattr" name="lsattr"></a><span><span><strong>lsattr</strong></span></span></td><td><p>列出 ext2 文件系统上的文件属性</p></td></tr><tr><td><a id="mk_cmds" name="mk_cmds"></a><span><span><strong>mk_cmds</strong></span></span></td><td><p>将一个包含命令列表的文件转化为适用于子系统库 <tt>libss</tt> 的 C 源文件</p></td></tr><tr><td><a id="mke2fs" name="mke2fs"></a><span><span><strong>mke2fs</strong></span></span></td><td><p>用来创建 ext2 或 ext3 文件系统</p></td></tr><tr><td><a id="mkfs.ext2" name="mkfs.ext2"></a><span><span><strong>mkfs.ext2</strong></span></span></td><td><p>默认创建 <tt>ext2</tt> 文件系统</p></td></tr><tr><td><a id="mkfs.ext3" name="mkfs.ext3"></a><span><span><strong>mkfs.ext3</strong></span></span></td><td><p>默认创建 <tt>ext3</tt> 文件系统</p></td></tr><tr><td><a id="mklost-found" name="mklost-found"></a><span><span><strong>mklost+found</strong></span></span></td><td><p>在 <tt>ext2</tt> 文件系统上创建一个 <tt>lost+found</tt> 目录，并给该目录预分配磁盘数据块，以减轻 <span><strong>e2fsck</strong></span> 命令的负担。</p></td></tr><tr><td><a id="resize2fs" name="resize2fs"></a><span><span><strong>resize2fs</strong></span></span></td><td><p>可以用来增大或缩小 <tt>ext2</tt> 文件系统</p></td></tr><tr><td><a id="tune2fs" name="tune2fs"></a><span><span><strong>tune2fs</strong></span></span></td><td><p>调整 <tt>ext2</tt> 文件系统的可调参数</p></td></tr><tr><td><a id="uuidgen" name="uuidgen"></a><span><span><strong>uuidgen</strong></span></span></td><td><p>创建一个新的通用唯一标识符(UUID)。这个新 UUID 可以被认为是在所有已创建的 UUID 中独一无二的，不论是在本地的系统或者别的系统，过去还是将来。</p></td></tr><tr><td><a id="libblkid" name="libblkid"></a><span><tt>libblkid</tt></span></td><td><p>包含设备识别和节点释放的库函数</p></td></tr><tr><td><a id="libcom_err" name="libcom_err"></a><span><tt>libcom_err</tt></span></td><td><p>通用错误显示库</p></td></tr><tr><td><a id="libe2p" name="libe2p"></a><span><tt>libe2p</tt></span></td><td><p>用于 <span><strong>dumpe2fs</strong></span>, <span><strong>chattr</strong></span>, <span><strong>lsattr</strong></span></p></td></tr><tr><td><a id="libext2fs" name="libext2fs"></a><span><tt>libext2fs</tt></span></td><td><p>允许用户级的程序操作 <tt>ext2</tt> 文件系统</p></td></tr><tr><td><a id="libss" name="libss"></a><span><tt>libss</tt></span></td><td><p>用于 <span><strong>debugfs</strong></span></p></td></tr><tr><td><a id="libuuid" name="libuuid"></a><span><tt>libuuid</tt></span></td><td><p>用来给对象产生通用唯一标识符(UUID)使之可以在本地系统之外引用</p></td></tr></tbody></table>
