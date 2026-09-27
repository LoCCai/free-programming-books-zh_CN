This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin lslocks — 打印所有锁的描述.

## 大纲

``svnadmin lslocks _`REPOS_PATH`_ [_`PATH-IN-REPOS`_]``

## 描述

打印仓库 _`REPOS_PATH`_ 在路径 _`PATH-IN-REPOS`_ 下的所有锁的描述. 如果没有 指定 _`PATH-IN-REPOS`_, 默认是仓库的根目录.

## 选项

无

## 示例

列出仓库 `/var/svn/repos` 所有的锁 (只有一个):

$ svnadmin lslocks /var/svn/repos
Path: /tree.jpg
UUID Token: opaquelocktoken:ab00ddf0-6afb-0310-9cd0-dda813329753
Owner: harry
Created: 2005-07-08 17:27:36 -0500 (Fri, 08 Jul 2005)
Expires: 
Comment (1 line):
Rework the uppermost branches on the bald cypress in the foreground.
