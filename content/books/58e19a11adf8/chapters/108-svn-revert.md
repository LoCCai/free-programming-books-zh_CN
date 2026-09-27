This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn revert — 撤消所有的本地修改.

## 大纲

``svn revert _`PATH`_...``

## 描述

撤消文件或目录上的本地修改, 并解决可能存在的冲突状态. **svn revert** 不仅撤消内容上的修改, 还会撤消属性上的修改. 最后, **svn revert** 还能撤消被添加, 删除或移动 (但还未提交) 的项目.

## 示例

撤消文件上的所有修改:

$ svn revert foo.c
Reverted foo.c

如果你希望递归地撤消一个目录内的所有修改, 就加上选项 `--depth=infinity`:

$ svn revert --depth=infinity .
Reverted newdir/afile
Reverted foo.c
Reverted bar.txt

最后, 你还可以撤消已添加的项目:

$ svn add mistake.txt whoops
A         mistake.txt
A         whoops
A         whoops/oopsie.c

$ svn revert mistake.txt whoops
Reverted mistake.txt
Reverted whoops

$ svn status
?       mistake.txt
?       whoops

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p>使用 <span><strong>svn revert</strong></span> 具有一定的危险性, 因为它会 丢弃所有的本地修改, 也就是用户未提交的修改. 这些本地修改一旦被撤消 了, Subversion <span><em>没有任何办法</em></span> 再把它们恢复回来.</p><p>如果用户没有为 <span><strong>svn revert</strong></span> 指定任何目标路径, 它将什么也不会做, 这是为了避免用户不小心丢失自己的本地修改, 因此 <span><strong>svn revert</strong></span> 要求用户必须显式地指定目标路径.</p></td></tr></tbody></table>
