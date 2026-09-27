This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnlook changed — 打印发生变化的路径.

## 大纲

``svnlook changed _`REPOS_PATH`_``

## 描述

把版本号或事务中发生变化的路径打印出来, 同时在每一行的前两列打印 状态字符, 这些状态字符和 **svn update** 的意义相同.

`'A '`

项目是新增的

`'D '`

项目被删除了

`'U '`

文件的内容被修改了

`'_U'`

项目的属性被修改了, 注意左边有个下划线

`'UU'`

文件的内容和属性都被修改了

区别目录路径与文件路径的方法是看路径末尾有没有字符 “`/`”, 末尾带 “`/`” 的路径是目录路径.

## 示例

下面的命令把版本号 39 中发生变化的所有文件和路径都打印出来. 输出中 的第一行是一个目录路径, 因为该路径以 `/` 结尾:

$ svnlook changed -r 39 /var/svn/repos
A   trunk/vendors/deli/
A   trunk/vendors/deli/chips.txt
A   trunk/vendors/deli/sandwich.txt
A   trunk/vendors/deli/pickle.txt
U   trunk/vendors/baker/bagel.txt
\_U  trunk/vendors/baker/croissant.txt
UU  trunk/vendors/baker/pretzel.txt
D   trunk/vendors/baker/baguette.txt

在下面的版本号中, 有一个文件被重命名了:

$ svnlook changed -r 64 /var/svn/repos
A   trunk/vendors/baker/toast.txt
D   trunk/vendors/baker/bread.txt

不幸的是, 上面的输出并没有阐明被删除的文件和被添加的文件之间的 关系, 加上选项 `--copy-info` 后就清楚多了:

$ svnlook changed -r 64 --copy-info /var/svn/repos
A + trunk/vendors/baker/toast.txt
    (from trunk/vendors/baker/bread.txt:r63)
D   trunk/vendors/baker/bread.txt
