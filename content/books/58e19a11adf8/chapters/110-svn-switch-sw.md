This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn switch (sw) — 将工作副本更新到另一个 URL.

## 大纲

``svn switch _`URL`_[@_`PEGREV`_] [_`PATH`_]``

``svn switch --relocate _`FROM`_ _`TO`_ [_`PATH`_...]``

## 描述

命令的第一种形式 (不带有选项 `--relocate`) 把工作 副本更新到一个新的 URL. 这是 Subversion 提供的, 用于让工作副本跟踪一 个新分支的方式. 如果指定了 _`PEGREV`_, 则 _`PEGREV`_ 决定了 Subversion 在哪个版本号内 查找目标路径. 关于分支切换的更多信息, 见 [“遍历分支”一节](https://svnbook.red-bean.com/nightly/zh/svn.branchmerge.switchwc.html "遍历分支").

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>从 Subversion 1.7 开始, <span><strong>svn switch</strong></span> 要求新 的 URL 必须和工作副本当前的 URL 具有相同的祖先. 为了忽略这一要求, 可以指定选项 <code>--ignore-ancestry</code>.</p></td></tr></tbody></table>

如果指定了选项 `--force`, 那么 **svn switch** 在添加一个新路径时, 如果该路径在切换前是一个未 被版本控制的路径, 将不会产生一个错误. 如果未被版本控制的路径和 切换后的新路径类型相同 (文件或目录), 则路径将被纳入版本控制, 但原来 的内容保持不变, 这也意味着目录的子文件也可能被纳入版本控制. 对于文件 来说, 不同的部分将被当作本地修改. 来自仓库的所有属性都会被应用到路径 上.

和大多数子命令一样, 用户可以通过选项 `--depth` 限制 **svn switch** 的作用深度. 相应地, 用户还可以用 选项 `--set-depth` 为目标路径设置新的 “粘着” 深度.

从 Subversion 1.7 开始, 选项 `--relocate` 已不再 推荐使用, 而应直接使用 **svn relocate** (见 [svn relocate](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.relocate.html "svn relocate")) 完成工作副本仓库根 URL 的 更新.

## 示例

如果你现在正在目录 `vendors` 内, 而现在你想 让该目录指向分支 `vendors-with-fix`:

$ svn switch http://svn.red-bean.com/repos/branches/vendors-with-fix .
U    myproj/foo.txt
U    myproj/bar.txt
U    myproj/baz.c
U    myproj/qux.c
Updated to revision 31.

工作完成后, 可以再切换回分支 `vendors`:

$ svn switch http://svn.red-bean.com/repos/trunk/vendors .
U    myproj/foo.txt
U    myproj/bar.txt
U    myproj/baz.c
U    myproj/qux.c
Updated to revision 31.

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>用户 <span><em>可以</em></span> 只切换工作副本的一部分到一个 新的分支, 但这不是推荐的做法. 因为很容易忘记工作副本只是部分切换 的, 然后用户意外地同时修改并提交到已切换和未切换的目录树中.</p></td></tr></tbody></table>
