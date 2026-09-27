This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn relocate — 修改工作副本所映射的仓库的根 URL.

## 大纲

``svn relocate _`FROM-PREFIX`_ _`TO-PREFIX`_ [_`PATH`_...]``

``svn relocate _`TO-URL`_ [_`PATH`_]``

## 描述

有时候, 管理员可能会改变仓库的存放位置, 虽然仓库的内容并没有发生 变化, 但是它的根 URL 变了. 例如由于更换了托管服务器, 所以仓库的主机 名发生了变化, 又或者说修改了仓库的访问协议, 由原来的普通 HTTP (`http://` 改成了 SSL (`https://`). 导致仓库根 URL 发生变化的原因还有很多, 但是仓库位置的变化不应该导致 现有的工作副本失效, 幸运的是 Subversion 早就考虑到了这一问题. 当仓库 的根 URL 发生变化时, 用户不必再重新检出一份工作副本, 而是可以用命令 **svn relocate** “重写” 工作副本的元数据, 使其指向新的仓库根 URL.

命令的第一种形式本质上是在给工作副本中记录的仓库根 URL 做一次 “搜索并替换” 操作. Subversion 把 URL 中的子字符串 _`FROM-PREFIX`_ 替换成 _`TO-PREFIX`_. 这些 URL 子字符串可以任意地 长或任意地短, 只要能够把它们区分出来即可. 显然, 为了使用这种语法, 用户必须同时知道工作副本当前的仓库根 URL 和新的仓库根 URL. (可以使用 命令 **svn info** 得到工作副本当前的仓库根 URL.)

命令的第二种形式只要求用户知道新的仓库根 URL, 但一次只能更新一个 工作副本.

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p>用户常常搞不清楚 <span><strong>svn switch</strong></span> 和 <span><strong>svn relocate</strong></span> 之间的区别, 这里有 2 条经验规则:</p><div><ul><li><p>如果工作副本需要映射到 <span><em>仓库内</em></span> 另一个目录 上, 就用 <span><strong>svn switch</strong></span>.</p></li><li><p>如果工作副本仍然需要映射到相同的仓库目录, 但仓库的位置发生了 变化, 就用 <span><strong>svn relocate</strong></span>.</p></li></ul></div></td></tr></tbody></table>

## 示例

假设开始时工作副本是映射到一个本地仓库的 URL:

$ svn info | grep ^URL:
URL: file:///var/svn/repos/trunk
$

突然有一天, 管理员决定重命名本地的仓库目录, 但是他忘记把这件事 通知给大家, 于是我们在下一次更新工作副本时出错了.

$ svn up
Updating '.':
svn: E180001: Unable to connect to a repository at URL 'file:///var/svn/repos/trunk'

向管理员咨询后得知仓库已经更换了位置, 并得到了仓库新的 URL. 我们不 想重新检出工作副本, 而是让 Subversion 更新现有工作副本的元数据, 以便 映射到新的仓库根 URL.

$ svn relocate file:///var/svn/new-repos/trunk
$

在命令执行期间 Subversion 不会输出什么信息, 但我们要的不就是这 种不会出错的命令吗? 现在我们的工作副本已经准备好再次执行 **svn up**.

$ svn up
Updating '.':
A    lib/new.c
M    src/code.h
M    src/headers.h
…

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>再次强调, <span><strong>svn relocate</strong></span> 只会影响工作副本的 元数据, 不会修改任何被版本控制或不被版本控制的文件, 更不会执行 版本控制操作 (例如提交或更新).</p></td></tr></tbody></table>

几个月后, 我们又被告知公司将为代码托管设立单独的服务器, 开发人员 必须使用 HTTP 访问仓库, 于是我们又要更新工作副本的仓库根 URL.

$ svn relocate http://svn.company.com/repos/trunk
$

我们每次执行 **svn relocate** 时, Subversion 都 会使用新的 URL 与仓库通信, 以便确认以下几点:

首先, Subversion 将仓库的 UUID 和存放在工作副本中的仓库 UUID 进行比较, 如果这两个 UUID 不相同, Subversion 将禁止修改工作副本的 仓库根 URL. 这样做的考虑是避免工作副本映射到一个不同的仓库上.

第二, Subversion 需要确认元数据更新后的工作副本仍然映射到仓库 内的相同目录上. 这样做的考虑是避免用户不小心把工作副本映射到一个不 同的目录上 (这本是 **svn switch** 的工作, 见 [svn switch (sw)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.switch.html "svn switch (sw)")).

另外, Subversion 不允许对工作副本的子目录执行 **svn relocate**, 如果你想修改工作副本的仓库根目录, 就必须整个 工作副本一起修改. 这是为了保护工作副本元数据和行为的一致性. (而且 在实际工作中, 你很难找到一个信服的理由来为工作副本的子目录执行 **svn relocate**)

最后再介绍一个使用 **svn relocate** 的场景. 在使用 了 HTTP 一段时间后, 公司决定切换到 SSL. 而仓库 URL 唯一变化的部分是从 `http://` 变成了 `https://`, 更新工 作副本的仓库根 URL 的做法有两种, 第一种和之前的做法相同, 就直接让工作 副本指向新的仓库根 URL:

$ svn relocate https://svn.company.com/repos/trunk
$

第二种做法是中替换新旧 URL 中不同的部分:

$ svn relocate http https
$

上面两种做法中的任意一种都能让工作副本指向新的仓库:

默认情况下, **svn relocate** 将会遍历所有的外部 工作副本并更新它们的仓库根 URL, 选项 `--ignore-externals` 将禁止这一行为.
