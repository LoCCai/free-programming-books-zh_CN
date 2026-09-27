This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn mkdir — 创建一个新目录.

## 大纲

``svn mkdir _`PATH`_...``

``svn mkdir _`URL`_...``

## 描述

创建一个新目录, 新目录的名字是 _`PATH`_ 或 _`URL`_ 的最后一个分量. 如果参数是工作副本 路径 _`PATH`_, 那么目录在创建后被自动置于版本 控制之下; 如果参数是 _`URL`_, 那么新目录会被 直接提交到仓库中, 如果出现了多个 _`URL`_, 则 它们都是在同一个版本号中提交. 除非添加了选项 `--parents`, 否则的话中间目录必须事先存在.

## 示例

在工作副本中创建新目录:

$ svn mkdir newdir
A         newdir

在仓库中创建目录 (这会马上产生一个提交操作, 所以必须提供日志消息):

$ svn mkdir -m "Making a new dir." http://svn.red-bean.com/repos/newdir

Committed revision 26.
