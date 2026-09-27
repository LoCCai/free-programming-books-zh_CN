## 教程 - 生成第一个\[变更\]

完成了[教程-历史](https://wiki.mercurial-scm.org/ChineseTutorialHistory) 的学习之后， 我们来到 my-hello \[仓库\]里面，就是我们在 [教程-克隆](https://wiki.mercurial-scm.org/ChineseTutorialClone)中 \[克隆\] 得到的。

在 [Mercurial](https://wiki.mercurial-scm.org/ChineseMercurial) 开发实践中一个好的做法是把每个变更隔离在各自的[仓库](https://wiki.mercurial-scm.org/Repository)里。这样可以避免把不相关的代码混杂起来， 并且便于一个接一个的测试每一部分工作。我们现在就开始采用这一模式。

我们的目标很简单，让“hello, world”程序打印另外一行输出。 首先， 我们给这个小项目创建一个新的仓库叫做 my-hello-new-output，方法是对my-hello做克隆。

$ cd ..
$ hg clone my-hello my-hello-new-output

updating to branch default 2 files updated, 0 files merged, 0 files removed, 0 files unresolved

**注:** 注意我们给新的 [仓库](https://wiki.mercurial-scm.org/Repository) 命名了一个描述性 的名字，基本上是说明这个[仓库](https://wiki.mercurial-scm.org/Repository)的目的。 在[Mercurial](https://wiki.mercurial-scm.org/ChineseMercurial)里面给一个[仓库](https://wiki.mercurial-scm.org/Repository)创建\[克隆\]很方便，我们会很快的积攒起很多稍微不同的仓库。如果我们不给他们描述性的命名， 很快就会没法分辨它们。

现在可以在新的仓库里面进行修改了 。 我们进入[工作目录](https://wiki.mercurial-scm.org/WorkingDirectory)，使用我们喜欢的编辑软件修改源文件。

$ cd my-hello-new-output
 \* Placed in the public domain by Bryan O'Sullivan
 \*
 \* This program is not covered by patents in the United States or other
 \* countries.
 \*/
#include <stdio.h>
int main(int argc, char \*\*argv)
{
        printf("hello, world!\\n");
        return 0;
}

我们要修改 main 让它再多打印一行输出：

(...)
int main(int argc, char \*\*argv)
{
        printf("hello, world!\\n");
        printf("sure am glad I'm using Mercurial!\\n");
        return 0;
}

完成之后退出我们喜欢的编辑器，任务完成。 有了刚才的修改我们就可以创建一个[变更集](https://wiki.mercurial-scm.org/ChangeSet)。

可是万一我们被别的事情打扰，在创建变更集之后忘记了它里面有哪些变更，怎么办呢？ 这时候我们要用到status命令。

$ hg status
M hello.c

输出很简短。总之以 M 开头的行意思就是hello.c文件修改过了，那么我们的变更已经可以加入一个变更集了。

使用 diff 命令我们可以检查文件实际的改变：

$ hg diff
diff -r 82e55d328c8c hello.c
\--- a/hello.c   Fri Aug 26 01:21:28 2005 -0700
+++ b/hello.c   Fri Sep 30 10:27:47 2005 +0800
@@ -12,5 +12,6 @@
 int main(int argc, char \*\*argv)
 {
        printf("hello, world!\\n");
\+       printf("sure am glad I'm using Mercurial!\\n");
        return 0;
 }

![<!>](https://wiki.mercurial-scm.org/moin-static/modernized/img/attention.png "<!>") 万一我们希望**放弃**我们的变更并重新开始，我们可以用revert命令来恢复hello.c到我们没有更改的状态(或者用\--all选项来恢复所有文件)。请确认你确实知道这是你真的希望做的(参见 [Revert](https://wiki.mercurial-scm.org/Revert))。

$ hg revert hello.c

revert重命名被编辑文件hello.c为hello.c.orig并恢复hello.c到它的未编辑状态。 status命令现在会将hello.c.orig视为不被追踪的(以"?"为前缀)。

$ hg st
? hello.c.orig

如果我们又改变主意想要重用我们做的修改，我们只需要移除未编辑状态的hello.c然后重命名我们改过的hello.c.orig为hello.c

$ rm hello.c
$ mv hello.c.orig hello.c
$ hg st
M hello.c

创建一个变更集的动作称为[提交](https://wiki.mercurial-scm.org/Commit)它。我们用commit命令来执行[提交](https://wiki.mercurial-scm.org/Commit)。

$ hg commit

这个命令把我们带到一个编辑器内，同时给我们展示了几行语焉不详的文字。

**注:** 缺省的编辑器是vi。这可以用环境变量EDITOR 或 [HGEDITOR](https://wiki.mercurial-scm.org/HGEDITOR) 来改变。同样，根据你怎样输入和保存文件，变更集记录哈希表可能不一样。

HG: Enter commit message.  Lines beginning with 'HG:' are removed.
HG: --
HG: user: mpm@selenic.com
HG: branch 'default'
HG: changed hello.c

第一行是空的，接下来的几行标明用户,分支名和哪些文件将进入本变更集。

默认的分支名是 "default" (参见[NamedBranches](https://wiki.mercurial-scm.org/NamedBranches)). "user"的默认值来自于~/.hgrc配置文件UI段下"username"属性的值(参见[hgrc(5)](http://www.selenic.com/mercurial/hgrc.5.html#ui)). 或者,用命令行选项-u来指定 (参见hg help ci或者[hg.1.html#commit](http://www.selenic.com/mercurial/hg.1.html#commit)).

为了[提交](https://wiki.mercurial-scm.org/Commit)变更集，我们必须描述它的原因(参见变更集注释)。让我们输入一些：

Express great joy at existence of Mercurial
HG: Enter commit message.  Lines beginning with 'HG:' are removed.
HG: --
HG: user: mpm@selenic.com
HG: branch 'default'
HG: changed hello.c

接着，我保存测试并退出编辑器，如果一切正常，commit命令将没有任何提示地退出。

![<!>](https://wiki.mercurial-scm.org/moin-static/modernized/img/attention.png "<!>") 如果你在没有保存文本的情况下退出编辑器，commit 将中断操作，这样你可以在提交前改变你的想法。

让我们看看status命令现在告诉我们什么？

$ hg status

什么也没有！我们的变更已经[提交](https://wiki.mercurial-scm.org/Commit)到变更集里了，那里没有修改的文件需要提交的。我们的[末端](https://wiki.mercurial-scm.org/Tip)现在和我们工作目录的内容一致了。

[par](https://wiki.mercurial-scm.org/Parent)命令向我们展示我们的仓库的工作路径现在与新提交的变更集同步了 (参见[更新](https://wiki.mercurial-scm.org/Update)) (这里，我们只有一个父修订版, 它即是每次提交之后的修订版。我们将在[TutorialMerge](https://wiki.mercurial-scm.org/TutorialMerge)里看到两个父修订版的情况):

$ hg par
changeset:   2:86794f718fb1
tag:         tip
user:        mpm@selenic.com
date:        Mon May 05 01:20:46 2008 +0200
summary:     Express great joy at existence of Mercurial

就是它了！我们已经[提交](https://wiki.mercurial-scm.org/Commit)了一个变更集。

我们现在可以为我们的新工作检查变更的历史：

$ hg log
changeset:   2:86794f718fb1
tag:         tip
user:        mpm@selenic.com
date:        Mon May 05 01:20:46 2008 +0200
summary:     Express great joy at existence of Mercurial
(...)

**注:** 用户，日期和[变更集号](https://wiki.mercurial-scm.org/ChangeSetID)当然和我的是不一样的。

正如我们在[教程--复制](https://wiki.mercurial-scm.org/ChineseTutorialClone)中讨论的，新的[变更集](https://wiki.mercurial-scm.org/ChangeSet)只存在于本仓库中。 这是[Mercurial](https://wiki.mercurial-scm.org/ChineseMercurial)关键的一部分工作方法。

如果要分享变更，我们必须继续[教程 - 与别的仓库分享改变](https://wiki.mercurial-scm.org/ChineseTutorialShareChange)。

* * *

[CategoryChinese](https://wiki.mercurial-scm.org/CategoryChinese)
