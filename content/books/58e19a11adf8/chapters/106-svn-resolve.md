This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn resolve — 解决工作副本里的冲突.

## 大纲

``svn resolve [_`PATH`_...]``

## 描述

解决工作副本里的 “冲突” 状态. **svn resolve** 不会从语义上解决冲突标记, 而是把发生冲突的项目替换 成指定的版本 (交互式地或通过选项 `--accept` 指定), 然后再删除与冲突有关的辅助文件. **svn resolve** 将允许 _`PATH`_ 被提交, 也就是告诉 Subversion _`PATH`_ 上的冲突已经被 “解决” 了.

关于冲突解决的更多信息, 见 [“解决冲突”一节](https://svnbook.red-bean.com/nightly/zh/svn.tour.cycle.html#svn.tour.cycle.resolve "解决冲突").

## 示例

下面的例子推迟了冲突的解决, 然后 **svn resolve** 用用户的内容替换掉所有的冲突:

$ svn update
Updating '.':
Conflict discovered in 'foo.c'.
Select: (p) postpone, (df) diff-full, (e) edit,
        (mc) mine-conflict, (tc) theirs-conflict,
        (s) show all options: p
C    foo.c
Updated to revision 5.
Summary of conflicts:
  Text conflicts: 1
$ svn resolve --accept mine-full foo.c
Resolved conflicted state of 'foo.c'
$
