This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin verify — 验证仓库里的数据的完整性.

## 大纲

``svnadmin verify _`REPOS_PATH`_``

## 描述

命令的目标是验证仓库的完整性. 基本上讲, 命令做的工作就是转储 所有的版本号, 并丢弃输出—为了检测潜在的硬盘错误和位衰减 (bitrot), 最好定期执行 **svnadmin verify**. 如果命令 报错, 说明仓库内至少含有一个出错的版本号, 这时候管理员应该从备份 恢复出错的版本号 (你备份过, 对吧?).

## 示例

验证一个挂起的仓库:

$ svnadmin verify /var/svn/repos/ 
\* Verified revision 1729.
