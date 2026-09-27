This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn status (stat, st) — 打印工作副本中文件或目录的状态.

## 大纲

``svn status [_`PATH`_...]``

## 描述

打印工作副本中文件或目录的状态. 如果没有指定任何选项, **svn status** 将只打印本地已修改的项目 (不会访问仓库). 如果添加了 选项 `--show-updates` (`-u`), 命令还会 打印与服务器上的最新数据相比, 工作副本中已过时的项目及其版本号. 如果添加了选项 `--verbose` (`-v`), 它将打印每一项的 完整的版本号信息. 如果添加了选项 `--quiet` (`-q`), 它就只打印与本地已修改项目有关的总结信息.

输出中每一行的前 7 列包含了描述项目状态的字符, 每一列都从不同 的角度描述项目的状态.

第一列指出项目是新增的, 被删除的, 还是已修改的:

`' '`

没有任何变化.

`'A'`

该项是新增的.

`'D'`

该项已被删除.

`'M'`

该项已被修改.

`'R'`

该项被工作副本中的其他项目替换了. 这意味着原来的项目已被删除, 然后在原来的位置上添加了一个新项目.

`'C'`

项目在工作副本中的内容 (不包含属性) 和从服务器上接收到的 更新有冲突.

`'X'`

项目是通过外部定义创建的.

`'I'`

项目是被忽略的 (例如由于属性 `svn:ignore`).

`'?'`

项目不被版本控制.

`'!'`

项目失踪了 (例如用户没有使用 **svn** 提供的 命令来移动或删除项目). 这同时也意味着目录是不完整的 (例如检出或 更新操作被中断了).

`'~'`

项目是作为一种文件类型 (例如普通文件, 目录文件或符号链接) 存放到仓库中, 但是现在工作副本中的项目已经被另一种文件类型所 取代.

第二列指出文件或目录的属性的状态:

`' '`

没有变化.

`'M'`

属性被修改了.

`'C'`

属性的修改含有冲突.

第三列指出工作副本目录是否被锁定了 (见 [“有时候你需要的只是清理一下”一节](https://svnbook.red-bean.com/nightly/zh/svn.tour.cleanup.html "有时候你需要的只是清理一下")):

`' '`

项目未被锁定.

`'L'`

项目已被锁定.

第四列指出被添加的项目是否含有历史:

`' '`

被添加的项目不含有历史.

`'+'`

被添加的项目含有历史.

第五列指出项目是否相对于父目录进行了切换 (见 [“遍历分支”一节](https://svnbook.red-bean.com/nightly/zh/svn.branchmerge.switchwc.html "遍历分支")):

`' '`

项目是父目录的子文件.

`'S'`

项目被切换过了.

第六列指出了关于锁的信息:

`' '`

如果指定了选项 `--show-updates` (`-u`), 则说明文件未被锁定. 如果没有指定选项 `--show-updates` (`-u`), 则说明 文件在工作副本中未被锁定.

`'K'`

文件在工作副本中被锁定.

`'O'`

文件被另一个用户或者在另一个工作副本中被锁定, 仅当指定选项 `--show-updates` (`-u`) 时才会出 现该状态.

`'T'`

文件在工作副本中被锁定, 但是锁已经被 “窃取”, 并 且不再有效. 文件当前在仓库中是处于被锁定的状态. 只有指定选项 `--show-updates` (`-u`) 时才会显示 该状态.

`'B'`

文件在工作副本中被锁定, 但是锁已经被 “破坏” 了, 并且不再有效. 文件当前在仓库中未被锁定. 只有指定选项 `--show-updates` (`-u`) 时才会显示 该状态.

第七列指出项目是否是目录冲突的受害者:

`' '`

项目不是目录冲突的受害者.

`'C'`

项目是目录冲突的受害者.

第八列总是一个空格.

第九列指出仓库中是否有更新的版本 (只有指定选项 `--show-updates` (`-u`) 时才会显示该 状态):

`' '`

仓库中没有更新的版本.

`'*'`

仓库中有更新的版本.

剩下的字段长度不一, 字段之间用空格分开. 如果指定了选项 `--show-updates` (`-u`) 或 `--verbose` (`-v`), 则下一个字段是 工作版本号.

如果指定了选项 `--verbose` (`-v`), 则下一个字段是最后一次提交的版本号和作者.

因为项目的工作副本路径总是最后一个字段, 因此路径内可以包含空格.

## 示例

如果你想检查工作副本包含了哪些修改, 最方便的做法是:

$ svn status wc
 M      wc/bar.c
A  +    wc/qax.c

如果你想查看工作副本中的哪些文件已经过时了, 就加上选项 `--show-updates` (`-u`) (这个选项 _不会_ 对工作副本作出任何修改). 下面的例子说明 仓库中的 `wc/foo.c` 比工作副本中的更新:

$ svn status -u wc
 M            965    wc/bar.c
        \*     965    wc/foo.c
A  +          965    wc/qax.c
Status against revision:    981

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>选项 <code>--show-updates</code> (<code>-u</code>) <span><em>只会</em></span> 在项目旁边打印一个星号 (意思是说仓库中 有更新的版本). 选项 <code>--show-updates</code> (<code>-u</code>) <span><em>不会</em></span> 打印该项目在仓库中 的版本号 (但你仍然可以用选项 <code>--verbose</code> (<code>-v</code>) 查看项目在仓库中的版本号).</p></td></tr></tbody></table>

在最详细的情况下, **svn status** 打印的信息如下:

$ svn status -u -v wc
 M            965       938 sally        wc/bar.c
        \*     965       922 harry        wc/foo.c
A  +          965       687 harry        wc/qax.c
              965       687 harry        wc/zig.c
Status against revision:   981

最后, 如果指定了选项 `--xml`, 则 **svn status** 将以 XML 格式打印输出:

$ svn status --xml wc
<?xml version="1.0"?>
<status>
<target
   path="wc">
<entry
   path="qax.c">
<wc-status
   props="none"
   item="added"
   revision="0">
</wc-status>
</entry>
<entry
   path="bar.c">
<wc-status
   props="normal"
   item="modified"
   revision="965">
<commit
   revision="965">
<author>sally</author>
<date>2008-05-28T06:35:53.048870Z</date>
</commit>
</wc-status>
</entry>
</target>
</status>

关于 **svn status** 的更多例子, 见 [“查看修改的整体概述”一节](https://svnbook.red-bean.com/nightly/zh/svn.tour.cycle.html#svn.tour.cycle.examine.status "查看修改的整体概述").
