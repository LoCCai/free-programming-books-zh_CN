This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnlook proplist (plist, pl) — 打印文件和目录上的属性名和属性值.

## 大纲

``svnlook proplist _`REPOS_PATH`_ [_`PATH_IN_REPOS`_]``

## 描述

列出仓库中某一路径上的所有属性. 如果添加了选项 `--verbose` (`-v`), 则还会列出属性值.

## 示例

下面的命令列出了文件 `/trunk/README` 在版本号 `HEAD` 时的所有属性:

$ svnlook proplist /var/svn/repos /trunk/README
  original-author
  svn:mime-type

还是同样的命令, 但是这次添加了选项 `--verbose` (`-v`):

$ svnlook -v proplist /var/svn/repos /trunk/README
  original-author : harry
  svn:mime-type : text/plain

下面的命令还列出了继承而来的属性:

$ svnlook pl /var/svn/repos branches --show-inherited-props -v
Inherited properties on '/branches',
from '/':
  svn:auto-props
    \*.py = svn:eol-style=native
    \*.c = svn:eol-style=native
    \*.h = svn:eol-style=native

  svn:global-ignores
    \*.diff
    \*.patch

Properties on '/branches':
