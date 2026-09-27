This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn unlock — 解锁工作副本路径或 URL.

## 大纲

``svn unlock _`TARGET`_...``

## 描述

解锁每一个 _`TARGET`_. 如果有任意一个 _`TARGET`_ 被其他用户加锁了, 或者在工作副本 中不存在有效的锁令牌, Subversion 就会打印一个警告, 然后继续解锁剩下 的 _`TARGET`_. 为了破坏属于其他用户或工作副本 的锁, 可以加上选项 `--force`.

## 示例

解锁工作副本中的两个文件:

$ svn unlock tree.jpg house.jpg
'tree.jpg' unlocked.
'house.jpg' unlocked.

解锁工作副本里的一个文件, 但是该文件已经被其他用户加锁了:

$ svn unlock tree.jpg
svn: E195013: 'tree.jpg' is not locked in this working copy
$ svn unlock --force tree.jpg
'tree.jpg' unlocked.

在没有工作副本的情况下解锁一个文件:

$ svn unlock http://svn.red-bean.com/repos/test/tree.jpg
'tree.jpg unlocked.

更多的内容, 见 [“锁”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.locking.html "锁").
