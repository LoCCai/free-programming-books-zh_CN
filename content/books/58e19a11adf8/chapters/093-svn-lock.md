This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn lock — 根据工作副本路径或 URL, 为仓库里的文件加锁, 从而阻止其他 用户提交这些文件的修改.

## 大纲

``svn lock _`TARGET`_...``

## 描述

锁定每一个 _`TARGET`_. 如果存在 _`TARGET`_ 已经被其他用户锁定了, Subversion 将打印一个警告, 然后继续锁定剩下的 _`TARGET`_. 如果想要从其他用户或工作副本那儿窃取锁, 就加上选项 `--force`.

## 示例

锁定工作副本中的两个文件:

$ svn lock tree.jpg house.jpg
'tree.jpg' locked by user 'harry'.
'house.jpg' locked by user 'harry'.

锁定一个已经被其他用户锁定的文件:

$ svn lock tree.jpg
svn: warning: W160035: Path '/tree.jpg is already locked by user 'sally' in fi
lesystem '/var/svn/repos/db'
$ svn lock --force tree.jpg
'tree.jpg' locked by user 'harry'.

在没有工作副本的情况下锁定一个文件:

$ svn lock http://svn.red-bean.com/repos/test/tree.jpg
'tree.jpg' locked by user 'harry'.

更多的细节, 见 [“锁”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.locking.html "锁").
