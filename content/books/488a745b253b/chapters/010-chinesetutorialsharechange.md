## 教程 - 与别的仓库分享改变

在 [第一次改变](https://wiki.mercurial-scm.org/ChineseTutorialFirstChange)的教程中，我们在my-hello-new-output [仓库](https://wiki.mercurial-scm.org/Repository)中创建了一个[变更集](https://wiki.mercurial-scm.org/ChangeSet)。现在我们希望在其它地方扩展那个变化。

遵循 [Mercurial](https://wiki.mercurial-scm.org/Mercurial) 好的风格，我们首先[克隆](https://wiki.mercurial-scm.org/Clone)我们原始的[仓库](https://wiki.mercurial-scm.org/Repository).

$ cd ..
$ hg clone my-hello my-hello-share

我们可以使用 tip 命令来找出每一个[仓库](https://wiki.mercurial-scm.org/Repository)的[Tip](https://wiki.mercurial-scm.org/Tip)。(记住， [Tip](https://wiki.mercurial-scm.org/Tip) 是最后一个[变更集](https://wiki.mercurial-scm.org/ChangeSet)。) 我们在这用了一个 \-q ("保持安静") 参数来让 [Mercurial](https://wiki.mercurial-scm.org/Mercurial) 不要输出 [Tip](https://wiki.mercurial-scm.org/Tip) 的完整描述。

$ cd my-hello-share
$ hg -q tip
1:82e55d328c8c
$ cd ../my-hello-new-output
$ hg -q tip
2:a58809af174d

我们可以看到， [Tip](https://wiki.mercurial-scm.org/Tip) 在各个仓库中是不同的。让我们回到 my-hello-share 并在那里扩展我们的新[变更集](https://wiki.mercurial-scm.org/ChangeSet)。要达到这个目的，我们用 pull 命令，这个命令所有在别的仓库中有而在本仓库中没有的 [变更集](https://wiki.mercurial-scm.org/ChangeSet) 从别的仓库 [拉](https://wiki.mercurial-scm.org/Pull) 到本仓库。

$ cd ../my-hello-share
$ hg pull ../my-hello-new-output
pulling from ../my-hello-new-output
searching for changes
adding changesets
adding manifests
adding file changes
added 1 changesets with 1 changes to 1 files
(run 'hg update' to get a working copy)

不像其它普通的 [Mercurial](https://wiki.mercurial-scm.org/ChineseMercurial) 命令，pull 有点罗嗦。在这点上 [Pull](https://wiki.mercurial-scm.org/Pull) 是成功的。

最近一行输出是重要的。在 [Pull](https://wiki.mercurial-scm.org/Pull) 后，缺省情况下 [Mercurial](https://wiki.mercurial-scm.org/ChineseMercurial) 不更新[工作目录](https://wiki.mercurial-scm.org/WorkingDirectory)。这意味着虽然 [仓库](https://wiki.mercurial-scm.org/Repository) 现在有[变更集](https://wiki.mercurial-scm.org/ChangeSet)， 但在[工作目录](https://wiki.mercurial-scm.org/WorkingDirectory)中的 hello.c 文件仍然是[Pull](https://wiki.mercurial-scm.org/Pull) 之前老的内容。

我们可以用以下[Mercurial](https://wiki.mercurial-scm.org/ChineseMercurial)的提醒来 [Update](https://wiki.mercurial-scm.org/Update) 这个文件 (也包括所有其它 [Pull](https://wiki.mercurial-scm.org/Pull) 时改变的文件）。

$ hg update

现在，我们可以检查并看到 my-hello-share 和 my-hello-new-output 有同样的内容和版本历史记录。

为确保与仓库是相同的，我们可以进入my-hello-share路径，然后做一个

$ hg pull ../my-hello-new-output
$ hg push ../my-hello-new-output

如果这两个命令都返回'no changes found'，那意味着两个仓库是一致的，反之亦然，用'my-hello-new-output'代替'my-hello-share'。

为了和别人分享改变，我们继续[导出](https://wiki.mercurial-scm.org/ChineseTutorialExport)。

* * *

[CategoryChinese](https://wiki.mercurial-scm.org/CategoryChinese)
