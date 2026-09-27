This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn move (mv) — 移动一个文件或目录.

## 大纲

``svn move _`SRC`_... _`DST`_``

## 描述

该命令用于在工作副本或仓库中移动文件或目录.

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>这个命令等价于先执行 <span><strong>svn copy</strong></span>, 再执行 <span><strong>svn delete</strong></span>.</p></td></tr></tbody></table>

如果 _`SRC`_ 出现了多次, 它们将被移动 到 _`DST`_ 内, 这就意味着 _`DST`_ 必须是一个目录.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>Subversion 不支持在工作副本和 URL 之间移动, 而且只能在同一仓库 内移动—即 Subversion 不支持在不同的仓库之间移动. 在同一仓库 内, Subversion 支持以下类型的移动:</p></td></tr></tbody></table>

WC → WC

在工作副本内移动文件, 但还未提交到仓库中.

URL → URL

在仓库内完成移动, 会马上触发一个提交操作.

如果被移动的文件较多, 那么用户应该使用更轻量的 URL → URL, 在工作副本内移动文件不仅仅是修改目录列表 (还要复制文件, 管理临时文件 和扩展关键字), 可能会耗费较多的时间.

还要注意的是 WC → WC 移动版本号混合的工作副本可能会产生无法 预知的后果 (见 [“版本号混合的工作副本”一节](https://svnbook.red-bean.com/nightly/zh/svn.basic.in-action.html#svn.basic.in-action.mixedrevs "版本号混合的工作副本")).

## 示例

移动工作副本里的一个文件:

$ svn move foo.c bar.c
A         bar.c
D         foo.c

把工作副本里的几个文件移动到一个目录内:

$ svn move baz.c bat.c qux.c src
A         src/baz.c
D         baz.c
A         src/bat.c
D         bat.c
A         src/qux.c
D         qux.c

在仓库内移动一个文件 (这会产生一个提交操作, 所以需要提供提交日志 消息):

$ svn move -m "Move a file" http://svn.red-bean.com/repos/foo.c \\
                            http://svn.red-bean.com/repos/bar.c

Committed revision 27.
