This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin rmlocks — 无条件地从仓库中移除一个或多个锁.

## 大纲

``svnadmin rmlocks _`REPOS_PATH`_ _`LOCKED_PATH`_...``

## 描述

从仓库中删除一个或多个锁.

## 选项

无

## 示例

下面的例子把仓库 `/var/svn/repos` 的文件 `tree.jpg` 和 `house.jpg` 上 的锁删除:

$ svnadmin rmlocks /var/svn/repos tree.jpg house.jpg
Removed lock on '/tree.jpg.
Removed lock on '/house.jpg.
