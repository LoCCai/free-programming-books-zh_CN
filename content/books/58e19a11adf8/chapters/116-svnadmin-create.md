This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin create — 创建一个新的空仓库.

## 大纲

``svnadmin create _`REPOS_PATH`_``

## 描述

在指定的路径下创建一个新的空仓库, 如果目录不存在, **svnadmin** 就会创建该目录. [\[77\]](#ftn.id14783) 从 Subversion 1.2 开始, **svnadmin** 默认使用 FSFS 作为新仓库的后端存储.

虽然 **svnadmin create** 会创建新仓库所在的目录, 但它并不会创建中间目录. 例如, 假设你有一个空目录 `/var/svn`, 那么创建仓库 `/var/svn/repos` 不会有任何问题, 但是试图创建 `/var/svn/subdirectory/repos` 则会报错. 另外, 取决于仓库的位置, 你可能需要切换到具有特权的用户 (例如超级用户 `root`) 才能执行 **svnadmin create**.

## 示例

在 `/var/svn` 目录下创建一个名为 `repos` 的新仓库:

$ cd /var/svn
$ svnadmin create repos
$

Subversion 1.0 总是使用 Berkeley DB 作为仓库的后端存储系统. Subversion 1.1 把 Berkeley DB 作为默认的仓库后端存储, 但可以用选项 `--fs-type` 把后端存储系统改成 FSFS:

$ cd /var/svn
$ svnadmin create repos --fs-type fsfs
$

  

* * *

[\[77\]](#id14783) 记住, **svnadmin** 只接受本地 _路径_, 不支持 _URL_.
