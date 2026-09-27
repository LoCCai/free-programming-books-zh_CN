This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin setuuid — 重置仓库的 UUID.

## 大纲

``svnadmin setuuid _`REPOS_PATH`_ [_`NEW_UUID`_]``

## 描述

重置仓库 _`REPOS_PATH`_ 的 UUID. 如果提供了 _`NEW_UUID`_, 它将会是仓库的新 UUID; 否则的话, Subversion 将自动为仓库生成一个新的 UUID.

## 选项

无

## 示例

如果管理员已经用 **svnsyn** 把 `/var/svn/repos` 备份到了 `/var/svn/repos-new`, 现在想用 `repos-new` 作为新的官方仓库, 为了不麻烦用户再重新 检出新的工作副本, 管理员需要把 `repos-new` 的 UUID 设置成 `repos` 的 UUID:

$ svnadmin setuuid /var/svn/repos-new 2109a8dd-854f-0410-ad31-d604008985ab

可以看到, **svnadmin setuuid** 在执行成功时不会 输出任何信息.
