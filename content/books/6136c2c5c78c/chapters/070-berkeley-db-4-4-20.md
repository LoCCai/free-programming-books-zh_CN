## 6.13.1. 安装 Berkeley DB

修补软件包来防止一些潜在的陷井时间：

patch -Np1 -i ../db-4.4.20-fixes-1.patch

为编译 Berkeley DB 做准备：

cd build\_unix &&
../dist/configure --prefix=/usr --enable-compat185 --enable-cxx

**配置选项的含义：**

_\--enable-compat185_

这个选项指定编译 Berkeley DB 1.85 向上兼容性API。

_\--enable-cxx_

这个选项指定编译 C++ API 库。

编译软件包：

make

现在测试软件包是没有意义的，因为这将会导致 TCL 捆绑编译。TCL不能被准确的编译，因为 TCL 还是链接到 /tools 下的 Glibc，而不是 /usr 目录下的Glibc。

安装软件包：

make docdir=/usr/share/doc/db-4.4.20 install

**make 参数的含义：**

_docdir=..._

这条安装命令将db的文档安装到正确的位置。/p>

修改安装文件的属主：

chown -v root:root /usr/bin/db\_\* \\
    /usr/lib/libdb\* /usr/include/db\* &&
chown -Rv root:root /usr/share/doc/db-4.4.20

**安装的程序：** db\_archive, db\_checkpoint, db\_deadlock, db\_dump, db\_hotbackup, db\_load, db\_printlog, db\_recover, db\_stat, db\_upgrade, db\_verify

**安装的库：** libdb.{so,ar}and libdb\_cxx.r{o,ar}

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="db_archive" name="db_archive"></a><span><span><strong>db_archive</strong></span></span></td><td><p>打印出不再使用的日志文件路径名</p></td></tr><tr><td><a id="db_checkpoint" name="db_checkpoint"></a><span><span><strong>db_checkpoint</strong></span></span></td><td><p>监视和检查数据库日志的守护进程</p></td></tr><tr><td><a id="db_deadlock" name="db_deadlock"></a><span><span><strong>db_deadlock</strong></span></span></td><td><p>当死锁发生时，退出锁定要求</p></td></tr><tr><td><a id="db_dump" name="db_dump"></a><span><span><strong>db_dump</strong></span></span></td><td><p>把数据库文件转换成 <span><strong>db_load</strong></span> 能认出的文本文件</p></td></tr><tr><td><a id="db_hotbackup" name="db_hotbackup"></a><span><span><strong>db_hotbackup</strong></span></span></td><td><p>创建 "<span>hot backup</span>" 或者是 "<span>hot failover</span>" 的 Berkeley DB 数据库镜像。</p></td></tr><tr><td><a id="db_load" name="db_load"></a><span><span><strong>db_load</strong></span></span></td><td><p>从db_dump产生的文本文件中创建出数据库文件</p></td></tr><tr><td><a id="db_printlog" name="db_printlog"></a><span><span><strong>db_printlog</strong></span></span></td><td><p>把数据库日志文件转换成人能读懂的文本</p></td></tr><tr><td><a id="db_recover" name="db_recover"></a><span><span><strong>db_recover</strong></span></span></td><td><p>在发生错误后，把数据库恢复到一致的状态</p></td></tr><tr><td><a id="db_stat" name="db_stat"></a><span><span><strong>db_stat</strong></span></span></td><td><p>显示数据库环境统计</p></td></tr><tr><td><a id="db_upgrade" name="db_upgrade"></a><span><span><strong>db_upgrade</strong></span></span></td><td><p>把数据库文件转换成新版本的Berkley DB格式</p></td></tr><tr><td><a id="db_verify" name="db_verify"></a><span><span><strong>db_verify</strong></span></span></td><td><p>对数据库文件进行一致性检查</p></td></tr><tr><td><a id="libdb" name="libdb"></a><span><tt>libdb.{so,a}</tt></span></td><td><p>包含db处理相关函数的C库</p></td></tr><tr><td><a id="libdb_cxx" name="libdb_cxx"></a><span><tt>libdb_cxx.{so,a}</tt></span></td><td><p>包含db处理相关函数的C++库</p></td></tr></tbody></table>
