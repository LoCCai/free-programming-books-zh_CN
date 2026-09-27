This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn resolved — _不再推荐使用_. 删除工作副本项目上的 “冲突” 状态.

## 大纲

``svn resolved _`PATH`_...``

## 描述

已不再推荐使用该命令, 而应该使用 **``svn resolve --accept working _`PATH`_``**. 关于 **svn resolve**, 见前面的 [svn resolve](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.resolve.html "svn resolve").

**svn resolved** 删除工作副本项目上的 “冲突” 状态. 命令不会从语义上解决冲突标记, 它仅仅是删除 与冲突有关的辅助文件, 并允许 _`PATH`_ 被提交 到仓库中, 也就是告诉 Subversion 冲突已经被 “解决了”. 关于冲突解决的更多信息, 见 [“解决冲突”一节](https://svnbook.red-bean.com/nightly/zh/svn.tour.cycle.html#svn.tour.cycle.resolve "解决冲突").

## 示例

如果你在更新 `foo.c` 时发生了冲突, 工作副本里 将会出现 3 个新文件:

$ svn update
Updating '.':
C    foo.c
Updated to revision 31.
Summary of conflicts:
  Text conflicts: 1
$ ls foo.c\*
foo.c
foo.c.mine
foo.c.r30
foo.c.r31
$

一旦你已经解决了冲突, 文件 `foo.c` 就已经 准备好提交, 执行 **svn resolved** 告诉 Subversion 你 已经处理好了所有问题.

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p>用户 <span><em>可以</em></span> 直接删除与冲突有关的辅助文件, 然后提交, 但是 <span><strong>svn resolved</strong></span> 还会在工作副本管理区 内更新一些薄记数据, 所以我们建议用户使用命令, 而不是手工操作.</p></td></tr></tbody></table>
