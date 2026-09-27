This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnlook propget (pget, pg) — 打印仓库中某一路径上的属性值.

## 大纲

``svnlook propget _`REPOS_PATH`_ _`PROPNAME`_ [_`PATH_IN_REPOS`_]``

## 描述

打印仓库中某一路径上的属性值.

## 示例

下面的命令展示了在仓库 `/var/svn/repos` 中, 文件 `/trunk/sandwich` 在版本号 `HEAD` 时, 属性 `seasonings` 的值:

$ svnlook pg /var/svn/repos seasonings /trunk/sandwich
mustard

下面的命令展示了 `/trunk` 在版本号 14 时, 属性 `svn:auto-props` 的值:

$ svnlook pg repos svn:auto-props trunk --show-inherited-props -v -r14
Inherited properties on '/trunk',
from '/':
  svn:auto-props
    \*.py = svn:eol-style=native
    \*.c = svn:eol-style=native
    \*.h = svn:eol-style=native
