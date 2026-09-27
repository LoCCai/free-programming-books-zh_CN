This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnlook tree — 打印目录树.

## 大纲

``svnlook tree _`REPOS_PATH`_ [_`PATH_IN_REPOS`_]``

## 描述

从 _`PATH_IN_REPOS`_ 开始打印目录 (如果 没有指定 _`PATH_IN_REPOS`_, 则命令仓库的根 目录), 还可以选择是否打印节点的版本号 ID.

## 示例

下面的命令输出了在版本号 13 时, 仓库的目录树:

$ svnlook tree -r 13 /var/svn/repos
/
 trunk/
  button.c
  Makefile
  integer.c
 branches/
  bookstore/
   button.c
   Makefile
   integer.c
…

如果添加了选项 `--show-ids`, 则还会输出节点的 版本号 ID (版本号 ID 是 Subversion 版本化文件系统内部的标识符, 用 于唯一地标识文件系统中的一个节点):

$ svnlook tree -r 13 /var/svn/repos --show-ids
/ <0.0.r13/811>
 trunk/ <1.0.r9/551>
  button.c <2.0.r9/238>
  Makefile <3.0.r7/41>
  integer.c <4.0.r6/98>
 branches/ <5.0.r13/593>
  bookstore/ <1.1.r13/390>
   button.c <2.1.r12/85>
   Makefile <3.0.r7/41>
   integer.c <4.1.r13/109>
…

为了能让第三方脚本更方便地解析命令的输出, 可以加上选项 `--full-paths`, 该选项将使得 **svnlook** 为每一项打印完整的仓库路径, 而且不会使用缩进来表示层次关系:

$ svnlook tree -r 13 /var/svn/repos --show-ids --full-paths
/ <0.0.r13/811>
trunk/ <1.0.r9/551>
trunk/button.c <2.0.r9/238>
trunk/Makefile <3.0.r7/41>
trunk/integer.c <4.0.r6/98>
branches/ <5.0.r13/593>
branches/bookstore/ <1.1.r13/390>
branches/bookstore/button.c <2.1.r12/85>
branches/bookstore/Makefile <3.0.r7/41>
branches/bookstore/integer.c <4.1.r13/109>
…
