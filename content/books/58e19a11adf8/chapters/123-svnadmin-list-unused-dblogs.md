This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin list-unused-dblogs — 询问 Berkeley DB 哪些日志文件可以被安全地删除 (该子命令只 适用于以 `bdb` 作为后端存储的仓库).

## 大纲

``svnadmin list-unused-dblogs _`REPOS_PATH`_``

## 描述

Berkeley DB 为仓库的所有修改创建日志, 用于灾备恢复. 除非开启了 `DB_LOG_AUTOREMOVE`, 否则的话日志文件会不断累积, 即使它们中的大部分都不会再被用到, 把它们删除有助于节省硬盘空间. 更 多的信息见 [“管理磁盘空间”一节](https://svnbook.red-bean.com/nightly/zh/svn.reposadmin.maint.html#svn.reposadmin.maint.diskspace "管理磁盘空间").

## 示例

删除仓库中不会再被用到的日志文件:

$ svnadmin list-unused-dblogs /var/svn/repos
/var/svn/repos/log.0000000031
/var/svn/repos/log.0000000032
/var/svn/repos/log.0000000033

$ svnadmin list-unused-dblogs /var/svn/repos | xargs rm
## disk space reclaimed!
