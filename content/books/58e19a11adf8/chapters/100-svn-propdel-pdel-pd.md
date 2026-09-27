This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn propdel (pdel, pd) — 删除一个属性.

## 大纲

``svn propdel _`PROPNAME`_ [_`PATH`_...]``

``svn propdel _`PROPNAME`_ --revprop -r _`REV`_ [_`TARGET`_]``

## 描述

该命令将从文件, 目录或版本号上删除一个属性. 命令的第一种形式在 工作副本中删除一个版本化的属性; 第二种形式在仓库的版本号上删除一个 非版本化的属性 (可选参数 _`TARGET`_ 指定仓库 的 URL).

## 示例

删除文件上的一个属性, 该文件是在工作副本中.

$ svn propdel svn:mime-type some-script
property 'svn:mime-type' deleted from 'some-script'.

删除一个版本号上的属性:

$ svn propdel --revprop -r 26 release-date 
property 'release-date' deleted from repository revision '26'
