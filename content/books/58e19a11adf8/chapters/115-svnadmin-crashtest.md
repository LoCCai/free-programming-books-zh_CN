This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin crashtest — 模拟一个崩溃的进程.

## 大纲

``svnadmin crashtest _`REPOS_PATH`_``

## 描述

打开路径为 _`REPOS_PATH`_ 的仓库, 然后模拟进程在持有一个打开的仓库句柄时崩溃. 该命令用于测试仓库的自动 复原 (Berkeley DB 4.4 引入的新特性). 用户应该不会用到该命令.

## 选项

无

## 示例

$ svnadmin crashtest /var/svn/repos
Aborted

很刺激, 是不是?
