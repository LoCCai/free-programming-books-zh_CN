This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnlook history — 打印仓库中某个路径的历史信息, 如果没有指定路径, 则默认是 仓库的根目录.

## 大纲

``svnlook history _`REPOS_PATH`_ [_`PATH_IN_REPOS`_]``

## 描述

打印仓库中某个路径的历史信息, 如果没有指定路径, 则默认是 仓库的根目录.

## 示例

下面的例子显示了仓库中 `/branches/bookstore` 到版本号 13 为止的历史信息:

$ svnlook history -r 13 /var/svn/repos /branches/bookstore --show-ids
REVISION   PATH <ID>
--------   ---------
      13   /branches/bookstore <1.1.r13/390>
      12   /branches/bookstore <1.1.r12/413>
      11   /branches/bookstore <1.1.r11/0>
       9   /trunk <1.0.r9/551>
       8   /trunk <1.0.r8/131357096>
       7   /trunk <1.0.r7/294>
       6   /trunk <1.0.r6/353>
       5   /trunk <1.0.r5/349>
       4   /trunk <1.0.r4/332>
       3   /trunk <1.0.r3/335>
       2   /trunk <1.0.r2/295>
       1   /trunk <1.0.r1/532>
