This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn update (up) — 更新工作副本.

## 大纲

``svn update [_`PATH`_...]``

## 描述

**svn update** 把仓库里的更新应用到工作副本里. 如果没有指定版本号, 则默认是 `HEAD`, 否则的话, **svn update** 把工作副本更新到由选项 `--revision` (`-r`) 所指定的版本号. 作为更新操作的一部分, **svn update** 还会删除工作副本 中已过时的锁 (见 [“有时候你需要的只是清理一下”一节](https://svnbook.red-bean.com/nightly/zh/svn.tour.cleanup.html "有时候你需要的只是清理一下")).

对每一个被更新的项目, Subversion 都会打印一行信息, 信息的开头是 一个字符, 用于表示对项目所采取的动作, 这些字符有:

`A`

新增

`B`

被破坏的锁 (只出现在第 3 列)

`D`

被删除

`U`

被更新

`C`

发生冲突

`G`

被合并

`E`

已存在

出现在第一列的状态字符描述的是文件内容的更新, 出现在第二列的 状态字符描述的是文件属性的更新, 出现在第三列的状态字符则描述的是 关于锁的信息.

和大多数子命令一样, 你可以通过选项 `--depth`, 把更新操作的作用范围限制在一定的范围内. 同样地, 还可以用选项 `--set-depth` 为目标路径设置新的 “粘着” 深度.

## 示例

把仓库中最新的内容更新到本地:

$ svn update
Updating '.':
A    newdir/toggle.c
A    newdir/disclose.c
A    newdir/launch.c
D    newdir/README
Updated to revision 32.

还可以把工作副本 “更新” 一个更旧的版本 (与 CVS 相比, Subversion 没有 “粘着” 文件的概念, 见 [附录 B, _针对 CVS 用户的 Subversion 介绍_](https://svnbook.red-bean.com/nightly/zh/svn.forcvs.html "附录 B. 针对 CVS 用户的 Subversion 介绍")):

$ svn update -r30
Updating '.':
A    newdir/README
D    newdir/toggle.c
D    newdir/disclose.c
D    newdir/launch.c
U    foo.c
Updated to revision 30.

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>如果你只是想看看某个文件在老版本时的内容, 更方便的做法是使用 命令 <span><strong>svn cat</strong></span>—它不会修改工作副本.</p></td></tr></tbody></table>

**svn update** 还是配置稀疏工作副本的主要命令. 如果指定了选项 `--set-depth`, 命令将会把工作副本路径 的周围深度修改成用户指定的深度, 从而忽略或延伸工作副本路径 (必要时 将从仓库中抓取数据). 关于稀疏目录的更多信息, 见 [“稀疏目录”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.sparsedirs.html "稀疏目录").

用户可以只调用一次 **svn update** 就能更新多个 目录, Subversion 不仅会忽略不被版本控制的目标, 如果是 Subversion 1.7, 它还会在最后打印一段总结信息:

$ cd my-projects
$ svn update \*
Updating 'calc':
U    button.c
U    integer.c
Updated to revision 394.
Skipped 'tempfile.tmp'
Updating 'paint':
A    palettes.c
U    brushes.c
Updated to revision 60.
Updating 'ziptastic':
At revision 43.
Summary of updates:
  Updated 'calc' to r394.
  Updated 'paint' to r60.
  Updated 'ziptastic' to r43.
Summary of conflicts:
  Skipped paths: 1
$
