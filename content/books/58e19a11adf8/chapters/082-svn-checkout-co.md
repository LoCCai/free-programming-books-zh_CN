This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn checkout (co) — 从仓库中检出一个工作副本到本地.

## 大纲

``svn checkout _`URL`_[@_`REV`_]... [_`PATH`_]``

## 描述

从仓库中检出一个工作副本到本地. 如果忽略 _`PATH`_, 就使用 URL 的最后一个分量作为 _`PATH`_. 如果出现了多个 URL, 那么每个 URL 都会被检出到 _`PATH`_ 的一个子目录内, 子目录的 名字是 URL 的最后一个分量.

## 示例

将工作副本检出到名为 `mine` 的目录内:

$ svn checkout file:///var/svn/repos/test mine
A    mine/a
A    mine/b
A    mine/c
A    mine/d
Checked out revision 20.
$ ls
mine
$

把两个不同的目录检出到两个工作副本中:

$ svn checkout file:///var/svn/repos/test \\
               file:///var/svn/repos/quiz
A    test/a
A    test/b
A    test/c
A    test/d
Checked out revision 20.
A    quiz/l
A    quiz/m
Checked out revision 13.
$ ls
quiz  test
$

把两个不同的目录检出到两个工作副本中, 不过这两个工作副本都在 `working-copies` 目录里:

$ svn checkout file:///var/svn/repos/test \\
               file:///var/svn/repos/quiz \\
               working-copies
A    working-copies/test/a
A    working-copies/test/b
A    working-copies/test/c
A    working-copies/test/d
Checked out revision 20.
A    working-copies/quiz/l
A    working-copies/quiz/m
Checked out revision 13.
$ ls
working-copies

如果检出被中断 (例如被用户主动中断, 或者网络连接断开), 为了从 中断的地方继续往下执行, 你可以再次执行相同的检出命令, 或者在不完整的 工作副本里执行更新命令:

$ svn checkout file:///var/svn/repos/test mine
A    mine/a
A    mine/b
^C
svn: E200015: Caught signal
$ svn checkout file:///var/svn/repos/test mine
A    mine/c
^C
svn: E200015: Caught signal
$ svn update mine
Updating 'mine':
A    mine/d
Updated to revision 20.
$

如果你希望检出特定版本号的工作副本, 就为命令 **svn checkout** 加上选项 `--revision` (`-r`):

$ svn checkout -r 2 file:///var/svn/repos/test mine
A    mine/a
Checked out revision 2.
$

在 Subversion 1.7 之前, 如果检出命令将要创建的文件已经在目录中存 在了, 那么默认情况下 Subversion 将会发出抱怨. Subversion 1.7 对这种 情况采取了不同的处理方式, 它将继续执行检出操作, 同时把所有妨碍命令的 对象都标记成目录冲突, 除非带上了选项 `--force`. 如果 检出命令带上了选项 `--force`, 那么工作副本中未被版本 控制的文件如果和检出命令将要创建的文件重名, 那么这些文件仍然会变成 被版本控制了的文件, 但是 Subversion 不会去修改文件内容, 所以说如果这 些已有的文件和仓库里的文件内容不一样, 文件将会包含本地修改.

$ mkdir project
$ mkdir project/lib
$ touch project/lib/file.c
$ svn checkout file:///var/svn/repos/project/trunk project --force
E    project/lib
A    project/lib/subdir
E    project/lib/file.c
A    project/lib/anotherfile.c
A    project/include/header.h
Checked out revision 21.
$ svn status wc
M       project/lib/file.c
$ svn diff wc
Index: project/lib/file.c
===================================================================
--- project/lib/file.c	(revision 1)
+++ project/lib/file.c	(working copy)
@@ -3 +0,0 @@
-/\* file.c: Code for acting file-ishly. \*/
-#include <stdio.h>
-/\* Not feeling particularly creative today. \*/

$

现在, 你的选择有: 撤消全部或部分的本地 “修改”, 提交这些修改, 或继续修改你的工作副本.

这个特性很适合用来在位地导入未被版本控制的目录树. 首先把目录树 导入仓库中, 然后带上选项 `--force` 把工作副本检出到 一个未被版本控制的目录树中, 在效果上等价于把未被版本控制的目录树转换 成一个工作副本.

$ svn mkdir -m "Create newproject project root." \\
      file://var/svn/repos/newproject
$ svn import -m "Import initial newproject codebase." newproject \\
      file://var/svn/repos/newproject/trunk
Adding         newproject/include
Adding         newproject/include/newproject.h
Adding         newproject/lib
Adding         newproject/lib/helpers.c
Adding         newproject/lib/base.c
Adding         newproject/notes
Adding         newproject/notes/README

Committed revision 22.
$ svn checkout file://\`pwd\`/repos-1.6/newproject/trunk newproject --force
E    newproject/include
E    newproject/include/newproject.h
E    newproject/lib
E    newproject/lib/helpers.c
E    newproject/lib/base.c
E    newproject/notes
E    newproject/notes/README
Checked out revision 2.
$ svn status newproject
$
