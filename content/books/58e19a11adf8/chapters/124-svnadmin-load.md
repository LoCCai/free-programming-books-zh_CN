This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin load — 从 `stdin` 读取仓库的转储流.

## 大纲

``svnadmin load _`REPOS_PATH`_ [-r _`LOWER`_[:_`UPPER`_]]``

## 描述

从 `stdin` 读取仓库的转储流, 把新的版本号提交 到仓库的文件系统中. 进度信息被打印到 `stdout`. 如果没有指定版本号, **svnadmin load** 将读取并提交所有 的版本号; 如果添加了选项 `--revision` (`-r`), **svnadmin load** 将只读取并 提交从 _`LOWER`_ 到 _`UPPER`_ 的版本号; 如果只指定了 _`LOWER`_, 则只加载这一个版本号.

在 Subversion 1.8 之前, **svnadmin load** 只能加 载转储流中包含的 _全部_ 版本号, 但是现在可以通过 选项 `--revision` (`-r`), 从转储流中 加载指定的版本号. 这就允许管理员从一个单一的转储流中增量地加载一段 版本号范围, 从而让仓库的维护任务变得更加轻松.

## 示例

下面的例子展示了把转储文件加载到仓库中的输出信息的开始部分 (当然, 转储文件是通过命令 **svnadmin dump** 创建的):

$ svnadmin load /var/svn/restored < repos-backup
<<< Started new txn, based on original revision 1
     \* adding path : test ... done.
     \* adding path : test/a ... done.
…

还可以把转储流加载到一个子目录内:

$ svnadmin load --parent-dir new/subdir/for/project \\
                /var/svn/restored < repos-backup
<<< Started new txn, based on original revision 1
     \* adding path : test ... done.
     \* adding path : test/a ... done.
…

新版 Subversion 对内建属性的值会提出越来越严格的格式要求, 当然, 由旧版 Subversion 创建的属性无法从这种严格的要求中得到任何好处, 却 有可能导致属性值被不正确地格式化. 转储流原模原样地保存属性值, 因此 Subversion 1.8 在加载属性值格式不正确的转储流时, 默认情况下会触发一 个验证性错误. 有几种办法可以避免出现这种问题, 第一种是在源仓库中手动 地修正格式不正确的属性值, 然后重新创建转储流; 或者是手动修改转储流文件 中的属性值; 最后, 如果你想在加载后再去修正属性值, 可以为 **svnadmin load** 添加选项 `--bypass-prop-validation`.
