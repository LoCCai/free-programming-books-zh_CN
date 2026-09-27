This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnlook filesize — 输出文件的大小, 以字节为单位.

## 大纲

``svnlook filesize _`REPOS_PATH`_ _`PATH_IN_REPOS`_``

## 描述

以字节为单位输出文件的大小, 文件位于仓库 _`REPOS_PATH`_ 内, 且路径为 _`PATH_IN_REPOS`_. 输出的文件大小以 10 为 基数, 然后是一个换行符. 如果没有用选项 `--revision` (`-r`) 或 `--transaction` (`-t`) 指定版本号 或事务, 则默认使用 `HEAD`.

## 示例

下面的例子展示了如何查看文件 `trunk/vendors/deli/soda.txt` 在版本号 40 时的大小:

$ svnlook filesize -r 40 /var/svn/repos trunk/vendors/deli/soda.txt
23
$
