This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnlook info — 打印作者, 时间戳, 日志消息大小和日志消息内容.

## 大纲

``svnlook info _`REPOS_PATH`_``

## 描述

打印作者, 时间戳, 日志消息大小 (以字节为单位) 和日志消息内容, 每一条信息后面都会跟随一个换行符.

## 示例

下面的例子列出了与版本号 40 相关的提交信息:

$ svnlook info -r 40 /var/svn/repos
sally
2003-02-22 17:44:49 -0600 (Sat, 22 Feb 2003)
16
Rearrange lunch.
