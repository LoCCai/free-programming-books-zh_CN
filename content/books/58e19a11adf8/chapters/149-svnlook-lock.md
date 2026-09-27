This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnlook lock — 如果仓库中的某一路径上存在锁, 则打印锁的相关信息.

## 大纲

``svnlook lock _`REPOS_PATH`_ _`PATH_IN_REPOS`_``

## 描述

如果仓库中的路径 _`PATH_IN_REPOS`_ 上面 存在锁, 则打印锁的相关信息; 否则的话什么都不打印.

## 选项

无

## 示例

下面的命令输出了文件 `tree.jpg` 上的锁的相关 信息:

$ svnlook lock /var/svn/repos tree.jpg
UUID Token: opaquelocktoken:ab00ddf0-6afb-0310-9cd0-dda813329753
Owner: harry
Created: 2005-07-08 17:27:36 -0500 (Fri, 08 Jul 2005)
Expires: 
Comment (1 line):
Rework the uppermost branches on the bald cypress in the foreground.
