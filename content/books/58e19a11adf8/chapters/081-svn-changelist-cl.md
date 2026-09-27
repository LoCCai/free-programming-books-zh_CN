This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn changelist (cl) — 为工作副本里的路径关联 (或解除关联) 一个变更列表.

## 大纲

``svn changelist _`CLNAME`_ _`TARGET`_...``

``svn changelist --remove _`TARGET`_...``

## 描述

将工作副本里的文件分组到一个变更列表 (命名的逻辑分组), 以便于用户 在一个工作副本中同时应付多个文件集合.

## 示例

编辑三个文件, 然后把它们关联到一个变更列表, 最后提交变更列表里的 文件:

$ svn changelist issue1729 foo.c bar.c baz.c
A \[issue1729\] foo.c
A \[issue1729\] bar.c
A \[issue1729\] baz.c
$ svn status
A       someotherfile.c
A       test/sometest.c

--- Changelist 'issue1729':
A       foo.c
A       bar.c
A       baz.c
$ svn commit --changelist issue1729 -m "Fixing Issue 1729."
Adding         bar.c
Adding         baz.c
Adding         foo.c
Transmitting file data ...
Committed revision 2.
$ svn status
A       someotherfile.c
A       test/sometest.c
$

注意在上面的例子里, 只有变更列表 `issue1729` 里的三个文件的修改被提交了.
