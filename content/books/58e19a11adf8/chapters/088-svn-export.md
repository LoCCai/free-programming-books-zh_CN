This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn export — 导出一个干净的目录树.

## 大纲

``svn export [-r _`REV`_] _`URL`_[@_`PEGREV`_] [_`PATH`_]``

``svn export [-r _`REV`_] _`PATH1`_[@_`PEGREV`_] [_`PATH2`_]``

## 描述

命令的第一种形式从 _`URL`_ 所指定的仓库 导出一个干净的目录树到 _`PATH`_. 如果指定了 _`REV`_, 将导出仓库在版本号 _`REV`_ 时的目录树, 否则的话版本号默认就是 `HEAD`. 如果省略 _`PATH`_, 那么 _`URL`_ 的最后一个分量将作为导出后的 目录名.

命令的第二种形式从 _`PATH1`_ 指定的工作 副本导出一个干净的目录树到 _`PATH2`_. 所有的 本地修改都会保留在导出的目录中, 但不包括不被版本控制的文件.

## 示例

从工作副本导出 (被导出的文件或目录的名字不会打印出来):

$ svn export a-wc my-export
Export complete.

从仓库导出 (被导出的每一个文件或目录的名字都会打印出来):

$ svn export file:///var/svn/repos my-export
A    my-export/test
A    my-export/quiz
…
Exported revision 15.

在制作特定于操作系统的发行包时, 如果能为导出的目录树指定特定的 EOL, 那将会非常方便, 选项 `--native-eol` 就是用于这 个目的, 但是它只会影响设置了属性 `svn:eol-style=native` 的文件. 例如, 为 Windows 导出以 CRLF 作为 EOL 的目录树:

$ svn export file:///var/svn/repos my-export --native-eol CRLF
A    my-export/test
A    my-export/quiz
…
Exported revision 15.

选项 `--native-eol` 接受的参数有 `LR`, `CR` 和 `CRLF`.
