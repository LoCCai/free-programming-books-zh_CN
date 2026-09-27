This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn copy (cp) — 在工作副本或仓库中复制一个文件或目录.

## 大纲

``svn copy _`SRC`_[@_`REV`_]... _`DST`_``

## 描述

在工作副本或仓库中复制一个或多个文件. _`SRC`_ 和 _`DST`_ 可以是一个工作副本 (WC) 路径或 URL. 当复制多个源文件时, 每个源文件 都将是 _`DST`_ (此时 _`DST`_ 必须是一个已存在的目录) 的直接子文件.

WC → WC

复制并添加一个工作副本路径 (包含历史).

WC → URL

立刻把 WC 的副本提交到 URL.

URL → WC

把 URL 检出到 WC, 并添加 WC.

URL → URL

执行一个服务器端的复制. 这通常用于创建分支和标签.

如果没有提供限定版本号 (即 ``@_`REV`_``), 那么在复制工作 副本路径时, 默认使用 `BASE` 版本号, 在复制 URL 时默认使用 `HEAD` 版本号.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>你只能在同一个仓库内复制文件, Subversion 不支持在不同的仓库之间 进行复制.</p></td></tr></tbody></table>

## 示例

复制工作副本里的一个文件, 并把它添加到需要被版本控制的列表里 (在提交之前, 这个复制操作丝毫不会影响到仓库):

$ svn copy foo.txt bar.txt
A         bar.txt
$ svn status
A  +    bar.txt

把工作副本里的多个文件复制到一个目录内:

$ svn copy bat.c baz.c qux.c src
A         src/bat.c
A         src/baz.c
A         src/qux.c

复制工作副本文件 `bat.c` 的版本号 8, 并重新 命名复制后的文件.

$ svn copy -r 8 bat.c ya-old-bat.c
A         ya-old-bat.c

把工作副本里的文件复制到仓库中 (这个复制会马上提交, 所以用户 需要提供提交日志消息):

$ svn copy near.txt file:///var/svn/repos/test/far-away.txt -m "Remote copy."

Committed revision 8.

从仓库复制一个文件到工作副本中 (在提交之前, 这个复制操作丝毫不会 影响到仓库):

$ svn copy file:///var/svn/repos/test/far-away -r 6 near-here
A         near-here

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>这是找回仓库中已被删除文件的推荐方式!</p></td></tr></tbody></table>

最后是从一个 URL 复制到另一个 URL:

$ svn copy file:///var/svn/repos/test/far-away \\
           file:///var/svn/repos/test/over-there -m "remote copy."

Committed revision 9.

$ svn copy file:///var/svn/repos/test/trunk \\
           file:///var/svn/repos/test/tags/0.6.32-prerelease -m "tag tree"

Committed revision 12.

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>这是打标签最简单的方法—只需要用 <span><strong>svn copy</strong></span> 把版本号 (通常是 <code>HEAD</code>) 复制到 <code>tags</code> 目录中.</p></td></tr></tbody></table>

即使忘记打标签也不需要担心—在任何时候, 你总是可以为一个较 老的版本号创建标签:

$ svn copy -r 11 file:///var/svn/repos/test/trunk \\
           file:///var/svn/repos/test/tags/0.6.32-prerelease \\
           -m "Forgot to tag at rev 11"

Committed revision 13.
