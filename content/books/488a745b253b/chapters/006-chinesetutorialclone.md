## 教程 - 克隆仓库

我们已经按照 [ChineseTutorialInstall](https://wiki.mercurial-scm.org/ChineseTutorialInstall) 安装了 [Mercurial](https://wiki.mercurial-scm.org/Mercurial)，对吗？很好！

[Mercurial](https://wiki.mercurial-scm.org/Mercurial) 中，我们在 [仓库](https://wiki.mercurial-scm.org/Repository) 里做我们所有的工作。[仓库](https://wiki.mercurial-scm.org/Repository)是一个目录，它包含所有我们希望保留历史的源代码和这些源代码的历史记录。

最简单开始 [Mercurial](https://wiki.mercurial-scm.org/Mercurial) 的方法是使用一个已经包含文件和一些历史记录的[仓库](https://wiki.mercurial-scm.org/Repository)。

我们使用 clone 命令来做这个事情。 这生产一个[仓库](https://wiki.mercurial-scm.org/Repository)的[克隆](https://wiki.mercurial-scm.org/Clone)，它生成一个完整的[仓库](https://wiki.mercurial-scm.org/Repository)复本，这样我们有一个本地私有的[仓库](https://wiki.mercurial-scm.org/Repository)来工作。

让我们克隆一个在 selenic.com 上的 "hello, world" 仓库：

$ hg clone http://www.selenic.com/repo/hello my-hello

如果所有都没问题，clone 命令输出：

requesting all changes
adding changesets
adding manifests
adding file changes
added 2 changesets with 2 changes to 2 files

我们应该在当前目录下发现一个目录叫 my-hello：

$ ls
my-hello

在 my-hello 目录中，我们应该发现这些文件：

$ ls my-hello
Makefile  hello.c

这些文件是我们刚[克隆](https://wiki.mercurial-scm.org/Clone)的[仓库](https://wiki.mercurial-scm.org/Repository)的精确复本。

**注：** 在 [Mercurial](https://wiki.mercurial-scm.org/Mercurial) 中， 每一个[仓库](https://wiki.mercurial-scm.org/Repository)是自包含的。当你[克隆](https://wiki.mercurial-scm.org/Clone)一个[仓库](https://wiki.mercurial-scm.org/Repository)后，新[仓库](https://wiki.mercurial-scm.org/Repository)变成[克隆](https://wiki.mercurial-scm.org/Clone)时它的精确复本， 但是后续的两个仓库当中任一方改变都不会在对方显示，除非你用 [Pull](https://wiki.mercurial-scm.org/Pull) 或 [Push](https://wiki.mercurial-scm.org/Push) 明确地传递改变。

现在我们可以检查新[仓库](https://wiki.mercurial-scm.org/Repository)的一些历史记录, 继续 [教程 - 检查仓库历史](https://wiki.mercurial-scm.org/ChineseTutorialHistory)。

* * *

[CategoryChinese](https://wiki.mercurial-scm.org/CategoryChinese)
