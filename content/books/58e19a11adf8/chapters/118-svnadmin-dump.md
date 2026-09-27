This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin dump — 把文件系统的内容转储到 `stdout`.

## 大纲

``svnadmin dump _`REPOS_PATH`_ [-r _`LOWER`_[:_`UPPER`_]] [--incremental] [--deltas]``

## 描述

按照可移植的 “转储文件” 格式, 把文件系统的内容转储 到 `stdout`, 把错误信息打印到 `stderr`. 按照从版本号 _`LOWER`_ 到 _`UPPER`_ 的顺序进行转储. 如果没有指定版本号, **svnadmin dump** 将会转储所有的版本号, 如果只指定了版本号 _`LOWER`_, 则只转储单个版本号. 关于 **svnadmin dump** 的实际用途, 见 [“迁移仓库数据”一节](https://svnbook.red-bean.com/nightly/zh/svn.reposadmin.maint.html#svn.reposadmin.maint.migrate "迁移仓库数据").

默认情况下, 转储流的第一个版本号 (即指定版本号范围的起始版本号) 相当于把该版本号下的所有文件和目录一次性添加到仓库中, 后面的版本号 (起始版本号之后的版本号) 只包含了在版本号内被修改的文件和目录. 对于 被修改的文件, 转储流保存了该文件的全文本内容和属性; 对于被修改的目录, 转储流保存了该目录的所有属性.

有 2 个选项可以修改 **svnadmin** 在生成转储文件时 的行为. 选项 `--incremental` 使得转储流的第一个版本号 只包含在该版本号内被修改的文件和目录, 而不是该版本号下的整个目录树, 联系上一段可以看到, 这和后面的版本号在转储流中的表示格式是完全相同的. 如果目标仓库已经包含了源仓库的文件与目录, 那么该选项就能生成相对更小 的转储文件.

第二个选项是 `--deltas`, 它使得 **svnadmin dump** 在转储每个版本号时, 只输出该版本号相对于前一个版本号 的差异部分, 而不是全文本的文件和属性. 这种做法可以减小 (在某些情况下 可以极大地减小) 转储文件的大小. 然而, 选项 `--deltas` 也有不好的地方—它会耗费更多的 CPU 资源, 而且使用第三方工具 (例如 **gzip** 和 **bzip2**) 对转储文件进行 压缩时, 和不加选项 `--deltas` 生成的转储文件相比, 其 压缩效果也不如它们.

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>从 Subversion 1.8 开始, <span><strong>svndumpfilter</strong></span> 开始支持通过选项 <code>--deltas</code> 创建的转储流.</p></td></tr></tbody></table>

## 示例

转储整个仓库:

$ svnadmin dump /var/svn/repos > full.dump
\* Dumped revision 0.
\* Dumped revision 1.
\* Dumped revision 2.
…

按照增量的格式转储一个单独的版本号:

$ svnadmin dump /var/svn/repos -r 21 --incremental > incr.dump
\* Dumped revision 21.
