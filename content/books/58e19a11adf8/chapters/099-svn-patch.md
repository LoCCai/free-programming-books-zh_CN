This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn patch — 把一个标准差异格式的补丁应用到工作副本中.

## 大纲

``svn patch _`PATCHFILE`_ [_`WCPATH`_]``

## 描述

该命令把标准差异格式的补丁 _`PATCHFILE`_ 应用到工作副本路径 _`WCPATH`_ 上. 和大多数 操作工作副本的子命令一样, 如果省略了 _`WCPATH`_, 应用补丁的将会是当前工作目录. 有很多工具都能生成标准差异格式的补丁, 例如 **svn diff** 和 Unix 命令 **diff**. **svn patch** 会忽略补丁中不是标准差异的内容.

补丁中的修改要么被接受, 要么被拒绝. 如果没办法在准确的位置上 匹配一个修改, 那么 Subversion 将会在更前或更后的位置进行匹配. 还 可以 _模糊地_ (_fuzz_) 应用修改—也就是在尝试匹配应用修改的位置时, 忽略上下文中的一 行或更多的行. 如果无法为一个修改找到匹配的位置, 该修改将被认为发生 了冲突, 并被写到一个扩展名为 `.svnpatch.rej` 的 文件中.

**svn patch** 为每一个打了补丁的文件或目录打印一 行状态, 状态用一个字母表示, 和 **svn update** 非常类似. 用来表示状态的字母有:

`A`

新增 (Added)

`D`

删除 (Deleted)

`C`

冲突 (Conflicted)

`G`

合并 (Merged)

`U`

更新 (Updated)

如果修改是在调整了偏移后应用的, 或者是被模糊应用的, 那么 Subversion 将报告这一情况, 相关的信息在输出时以字符 `>` 开始, 用户应该认真审查这些修改.

如果补丁把文件的所有内容都删除了, 该文件将被自动删除. 类似的, 如果补丁创建了新文件, 那么该文件将被自动添加. 命令 **svn revert** 可以撤消所有不需要的删除或添加.

## 示例

应用一个由 **svn diff** 生成的补丁, 该补丁删除了 一个文件, 创建了另一个新文件, 并修改了第三个文件的内容和属性. 下面是 补丁的内容 (假设该补丁的文件名就是 `PATCH`):

Index: deleted-file
===================================================================
--- deleted-file	(revision 3)
+++ deleted-file	(working copy)
@@ -1 +0,0 @@
-This file will be deleted.
Index: changed-file
===================================================================
--- changed-file	(revision 4)
+++ changed-file	(working copy)
@@ -1,6 +1,6 @@
 The letters in a line of text
 Could make your day much better.
 But expanded into paragraphs,
-I'd tell of kangaroos and calves
+I'd tell of monkeys and giraffes
 Until you were all smiles and laughs
 From my letter made of letters.

Property changes on: changed-file
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
Added: propname
## -0,0 +1 ##
+propvalue
Index: added-file
===================================================================
--- added-file	(revision 0)
+++ added-file	(working copy)
@@ -0,0 +1 @@
+This is an added file.

下面我们将在工作副本中应用该补丁, 然后再用 **svn diff** 检查 **svn patch** 的执行结果是否正确:

$ cd /some/other/workingcopy
$ svn patch /path/to/PATCH
D         deleted-file
UU        changed-file
A         added-file
$ svn diff
Index: deleted-file
===================================================================
--- deleted-file	(revision 3)
+++ deleted-file	(working copy)
@@ -1 +0,0 @@
-This file will be deleted.
Index: changed-file
===================================================================
--- changed-file	(revision 4)
+++ changed-file	(working copy)
@@ -1,6 +1,6 @@
 The letters in a line of text
 Could make your day much better.
 But expanded into paragraphs,
-I'd tell of kangaroos and calves
+I'd tell of monkeys and giraffes
 Until you were all smiles and laughs
 From my letter made of letters.

Property changes on: changed-file
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
Added: propname
## -0,0 +1 ##
+propvalue
Index: added-file
===================================================================
--- added-file	(revision 0)
+++ added-file	(working copy)
@@ -0,0 +1 @@
+This is an added file.
$

有时候, 用户可能想 “逆向” 应用补丁— 删除新增的 行, 添加被删除的行. 选项 `--reverse-diff` 就是用来完成 这一操作. 在下面的例子中, 我们先把工作副本的修改存放到一个补丁文件中, 然后再通过逆向应用补丁来撤消工作副本的修改.

$ svn status
M       foo.c
$ svn diff > PATCH
$ cat PATCH
Index: foo.c
===================================================================
--- foo.c	(revision 128)
+++ foo.c	(working copy)
@@ -1003,7 +1003,7 @@
     return ERROR\_ON\_THE\_G\_STRING;
 
   /\* Do something in a loop. \*/
-  for (i = 0; i < txns->nelts; i++)
+  for (i = 0; i < txns->nelts; i--)
     {
       status = do\_something(i);
       if (status)
$ svn patch --reverse-diff PATCH
U         foo.c
$ svn status
$
