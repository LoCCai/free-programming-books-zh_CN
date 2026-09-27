This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnlook diff — 打印被修改的文件和属性的差异.

## 大纲

``svnlook diff _`REPOS_PATH`_``

## 描述

按照标准差异格式, 打印被修改的文件和属性的差异.

## 示例

下面的例子展示了新增的 (空) 文件, 被修改的二进制文件和重命名 (重命名可以理解成复制和删除) 后又被修改的文件的差异比较输出:

$ svnlook diff -r 40 /var/svn/repos
Copied: trunk/relish.txt (from rev 39, trunk/vendors/deli/pickle.txt)
===================================================================
--- trunk/relish.txt	                        (rev 0)
+++ trunk/relish.txt	2013-01-29 20:39:17 UTC (rev 40)
@@ -0,0 +1 @@
+Pickle relish is mostly made from cucumbers.

Deleted: trunk/vendors/deli/pickle.txt
===================================================================
--- trunk/vendors/deli/pickle.txt	                        (rev 39)
+++ trunk/vendors/deli/pickle.txt	2013-01-29 20:39:17 UTC (rev 49)
@@ -1 +0,0 @@
-Pickles are mostly made from cucumbers.

Modified: trunk/vendors/deli/logo.jpg
===================================================================
(Binary files differ)

Added: trunk/vendors/deli/soda.txt
===================================================================
$

默认情况下, **svnlook diff** 把复制后的文件当成 新增的文件对待, 仅仅使用不同的标签来区分复制与新增的区别. 然而, 选项 `--diff-copy-from` 使得 **svnlook diff** 只会输出复制后的文件与源文件之间的差异:

$ svnlook diff -r 40 /var/svn/repos --diff-copy-from
Copied: trunk/relish.txt (from rev 39, trunk/vendors/deli/pickle.txt)
===================================================================
--- trunk/vendors/deli/pickle.txt	2013-01-29 20:39:17 UTC (rev 39)
+++ trunk/relish.txt	2013-01-29 20:47:40 UTC (rev 3)
@@ -1 +1 @@
-Pickles are mostly made from cucumbers.
+Pickle relish is mostly made from cucumbers.

Deleted: trunk/vendors/deli/pickle.txt
===================================================================
--- trunk/vendors/deli/pickle.txt	(rev 39)
+++ trunk/vendors/deli/pickle.txt	2013-01-29 20:39:17 UTC (rev 40)
@@ -1 +0,0 @@
-Pickles are mostly made from cucumbers.

Modified: trunk/vendors/deli/logo.jpg
===================================================================
(Binary files differ)

Added: trunk/vendors/deli/soda.txt
==============================================================================
$

选项 `--no-diff-deleted` 使得 **svnlook diff** 不再输出被删除的文件的差异:

$ svnlook diff -r 40 /var/svn/repos --no-diff-deleted
Copied: trunk/relish.txt (from rev 39, trunk/vendors/deli/pickle.txt)
===================================================================
--- trunk/relish.txt	                        (rev 0)
+++ trunk/relish.txt	2013-01-29 20:39:17 UTC (rev 40)
@@ -0,0 +1 @@
+Pickle relish is mostly made from cucumbers.

Modified: trunk/vendors/deli/logo.jpg
===================================================================
(Binary files differ)

Added: trunk/vendors/deli/soda.txt
==============================================================================
$

注意, 如果文件具有非文本化的 `svn:mime-type` 属性, 则 **svnlook diff** 不会输出文件的差异.
