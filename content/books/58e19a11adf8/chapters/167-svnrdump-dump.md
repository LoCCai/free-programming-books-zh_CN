This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnrdump dump

## 大纲

``svnrdump dump _`SOURCE_URL`_``

## 描述

把位于 _`SOURCE_URL`_ 的仓库的版本号 转储到标准输出中. 除非用选项 `--revision` (`-r`) 指定了待转储的版本号或版本号范围, 否则的话, **svnrdump dump** 将转储全部的版本号.

## 示例

下面的例子展示了如何转储一个远程仓库的全部历史 (假设执行该 命令的用户对仓库的全部路径都具有读取权限).

$ svnrdump dump http://svn.example.com/repos/calc > full.dump
\* Dumped revision 0.
\* Dumped revision 1.
\* Dumped revision 2.
…

仍然是同一个仓库, 但这次是增量地转储一个单独的版本号:

$ svnrdump dump http://svn.example.com/repos/calc \\
           -r 21 --incremental > inc.dump
\* Dumped revision 21.
$
