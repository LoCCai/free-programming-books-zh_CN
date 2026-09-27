[Skip to main content](#main-content)

目前，想从 Subversion 过渡到 Git 其实并不困难，只要你不把 Git 和 Subversion 混淆就行。一旦你明白了两者在概念上的区别，这个改变的过程就会变得容易。

## 分布式与集中式

Subversion 是一个\_集中式（centralized）\_的版本控制系统。所有的开发团队成员都工作在单一的远程中央仓库上，当在这个中央仓库上进行 “签出（checkout）” 操作时，它就会在你的本地计算机上设置一个 “工作副本（working copy）”。这就是一个存储在你本地计算机上的一个特定版本的快照。

![Centralized and distributed VCS](https://www.git-tower.com/learn/media/pages/git/ebook/cn/command-line/appendix/from-subversion-to-git/fa84648b79-1787825536/centralized-vs-distributed.png "Centralized and distributed VCS")

Git 是一个\_分部式（distributed）\_的版本控制系统，它有着一个不同的工作方式。相对于 Subversion 的 “签出（checkout）”，每一个 Git 用户会从远程仓库 “克隆（clone）” 出一个本地仓库。反过来说，一个用户会得到一个完整的仓库，而不仅仅只是一个工作副本。用户在本地计算机上拥有自己的仓库，并且包含所有的项目历史记录。  
用户可以在自己的本地计算机上做任何想要操作，例如提交（commit），历史检查（inspect history），恢复到一个旧的版本等等。只有当你想要共享你的工作结果时，你才需要连接到远程服务器上。

## 仓库结构和 URLs

一个 Subversion 的仓库通常都是由几个目录组织起来的。“trunk” 目录对应你的开发主线，“branches” 目录对应那些特定的工作背景下的开发，而 “tags” 目录则用来标记一个特定的版本。它们都要通过自己的 URL 来指向到它在中央仓库中的具体位置：

```
svn+ssh://svn@example.com/svn/trunk
```

Git 仓库就完全不一样了，它的组成完全就是一个在项目根目录下的 “.git” 文件夹。对分支和标记的查找完全依靠命令，而不是通过 URLs。Git 的 URL 只指向仓库的位置。

```
ssh://git@example.com/path/to/git-repo.git
```

## 分支

正如刚才提到的， Subversion 的分支仅仅是一些有特殊含义的目录。在创建一个新的分支时，你只是把项目的当前状态完完整整地拷贝到这个新的分支目录中。

Git 的分支技术是它的设计核心，因此它拥有一个完全不同的概念。一个在 Git 中的分支就是一个指向一个特定版本的指针：不拷贝任何文件；不创建任何目录；没有任何额外的操作。  
在 Git 中你 _永远_ 工作在一个分支上，至少工作在那个系统默认创建的 “master” 分支上。在你的工作副本上只包括你当前的活动分支中的文件（ Git 称之为 “HEAD”）。 所有其他的版本和分支都被保存在你的本地仓库中， 并且随时都可以非常快速地恢复到一个旧的版本。  
一定要记住 Git 的分布式特性：分支可以被发布到在远程服务器上，但是本地上的分支对于日常的工作更加重要。

## 提交

当你想要在 Subversion 中提交一个改动，有如下的一些规则：

-   你必须确保与中央仓库的连接。你不能进行离线提交。
-   提交的内容要立即存储在中央仓库中。
-   它会被分配一个递增版本号。

提交在 Git 中就是完全另外一种情况：

-   你没有必要连接到任何一个 “中央” 仓库，因为在你的计算机中就拥有一个完整的本地仓库。因此提交仅仅只记录在本地仓库上。它们不会自动地传递到远程仓库中，除非你自己决定共享这个改动。
-   文件的改动并不意味着它会被自动地包含在下一次提交中。你必须指明哪些改动你想要提交，并把它添加的所谓的 “暂存区（Staging Area）”中。你甚至可以只对文件的部分修改或是特定的几行代码进行提交，而其他部分则稍后提交。
-   “commit hashes” 替代了版本号码。由于提交都发生在开发人员的本地计算机上，你不可能给某个提交分配一个号码 #5，而另外一个分配 #6，这就产生了个问题，在分布式系统下谁是第一个提交呢？在 Git 中，每一个提交必须拥有一个唯一的ID，因此一个哈希字符串就代替了那个依次递增的版本号。

## 分享工作

在 Subversion 中，在提交之后，你的工作会被自动地转移到中央仓库上去。只有在你连接到这个中央服务器时你才可以进行提交。

Git 不会自动上传任何东西。你可以自己决定，你的那些分支（也可能是所有分支）需要共享给你其他的团队成员。除此之外共享工作也是十分安全的。冲突只会出现在你的本地上，它决不可能发生在远程服务器上。这会让你有信心来解决冲突，因为你不会破坏远程仓库。

## Get our popular **Git Cheat Sheet** for free!

You'll find the most important commands on the front and helpful best practice tips on the back. Over 100,000 developers have downloaded it to make Git a little bit easier.

![Get our popular Git Cheat Sheet for free!](https://www.git-tower.com/learn/assets/img/popups/cheat-sheet-illu-huge.svg)

## About Us

As the makers of [Tower, the best Git client for Mac and Windows](https://www.git-tower.com/?utm_source=learn-website&utm_medium=about-us&utm_campaign=learn-git), we help over 100,000 users in companies like Apple, Google, Amazon, Twitter, and Ebay get the most out of Git.

Just like with Tower, our mission with this platform is to help people become better professionals.

That's why we provide our guides, videos, and cheat sheets (about version control with Git and lots of other topics) for free.

[![Tower icon](https://www.git-tower.com/learn/assets/img/tower-icon.1787825536.svg)](https://www.git-tower.com/?utm_source=learn-website&utm_medium=about-us&utm_campaign=learn-git)

## Updates, Courses & Content via Email

## Want to win one of our awesome Tower shirts?  
**Tell your friends about Tower!**

We'll pick 4 winners every month who share this tweet!  
Follow [@gittower](https://x.com/gittower) to be notified if you win!
