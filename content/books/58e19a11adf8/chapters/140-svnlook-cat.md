This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnlook cat — 输出文件的内容.

## 大纲

``svnlook cat _`REPOS_PATH`_ _`PATH_IN_REPOS`_``

## 描述

输出文件的内容.

## 示例

下面的命令把文件 `/trunk/README` 在事务 `ax8` 时的内容打印出来:

$ svnlook cat -t ax8 /var/svn/repos /trunk/README

               Subversion, a version control system.
               =====================================

$LastChangedDate: 2003-07-17 10:45:25 -0500 (Thu, 17 Jul 2003) $

Contents:

     I. A FEW POINTERS
    II. DOCUMENTATION
   III. PARTICIPATING IN THE SUBVERSION COMMUNITY
…
