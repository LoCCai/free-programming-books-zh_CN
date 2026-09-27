This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin upgrade — 把仓库升级到 Subversion 支持的最新格式.

## 大纲

``svnadmin upgrade _`REPOS_PATH`_``

## 描述

把仓库 _`REPOS_PATH`_ 升级到 Subversion 支持的最新格式.

命令的目标是为了让管理员方便地对仓库进行升级, 而不用通过麻烦的 转储和加载. 为了完成升级, **svnadmin upgrade** 只会 完成最小量的工作, 同时保证仓库的完整性. 虽然转储和随后的加载操作可以 保证得到一个处于最佳状态的仓库, 但 **svnadmin upgrade** 却无法保证这点.

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p>管理员在升级仓库前, 应该先对它进行备份.</p></td></tr></tbody></table>

## 选项

无

## 示例

升级仓库 `/var/repos/svn`:

$ svnadmin upgrade /var/repos/svn
Repository lock acquired.
Please wait; upgrading the repository may take some time...

Upgrade completed.
