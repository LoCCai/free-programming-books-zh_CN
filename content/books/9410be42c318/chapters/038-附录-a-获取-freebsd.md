### A.5.1. 概述[](#cvsup-intro)

CVSup 是一个用于从远程服务器主机上的主 CVS 仓库发布和升级源代码树的软件包。 FreeBSD 的源代码维护在加利福尼亚州一台主开发服务器的 CVS 仓库里。 有了 CVSup， FreeBSD 用户可以很容易的保持他们自己的源代码树更新。

CVSup 使用所谓的升级 _pull_ 模式。在 pull 模式下，客户端在需要的时候向服务器端请求更新。 服务器被动的等待客户端的升级请求。 因此所有的升级都是客户端发起的。 服务器决不会发送未请求的升级。用户必须手动运行 CVSup 客户端获取更新， 或者设置一个 `cron` 作业来让它以固定的规律自动运行。

术语 CVSup用大写字母写正是表示， 代表了完整的软件包。 它的主要组件是运行在每个用户机器上的客户端 `cvsup`， 和运行在每个 FreeBSD 镜像站点上的服务器端 `cvsupd`。

当您阅读 FreeBSD 文档和邮件列表时，您可能会看见 sup。 Sup 是 CVSup 的前身，有着相似的目的。 CVSup 使用很多和 sup 相同的方式， 而且， 它还是用使用和 `sup` 的兼容的配置文件。 Sup 已经不再被 FreeBSD 项目使用了， 因为 CVSup 既快又有更好的灵活性。

<table><tbody><tr><td><i title="Note"></i></td><td><p>csup 是用 C 语言对 CVSup 软件的重写。 它最大的好处是， 这个程序更快一些， 并且也不需要依赖于 Modula-3 语言， 因此也就不需要安装后者。 另外， 您可以直接使用它， 因为它是基本系统的一部分。 假如您决定使用 csup， 则可以跳过安装 CVSup 这一步， 并在文章中余下部分提到的 CVSup 改为 csup。</p></td></tr></tbody></table>

### A.5.3. CVSup 配置[](#cvsup-config)

supfile 中的信息解答了 CVSup 下面的几个问题：

-   [您想接收 哪些文件？](#cvsup-config-files)
    
-   [您想要它们的 哪个版本？](#cvsup-config-vers)
    
-   [您想从哪里 获取它们？](#cvsup-config-where)
    
-   [您想把它们 放在您自己机器的什么地方？](#cvsup-config-dest)
    
-   [您想把 您的状态文件放在哪？](#cvsup-config-status)
    

在下面的章节里，我们通过依次回答这些问题来创建一个典型的 supfile 文件。首先，我们描述一下 supfile 的整体构成。

supfile 是个文本文件。注释用 `#` 开头，至行尾有效。 空行和只包含注释的行会被忽略。

每个保留行描述一批用户希望接收的文件。 每行以 "collection"， 由服务器端定义的合理的文件分组，的名字开头。 collection 的名字告诉服务器您想要的文件。 collection 名字结束或者有更多的字段，用空格分隔。 这些字段回答了上面列出的问题。 字段类型有两种：标记字段和值字段。 标记字段由独立的关键字组成，比如， `delete` 或者 `compress`。值字段也用关键字开头， 关键字后面跟 `=` 和第二个词而没有空格。 例如，`release=cvs` 是一个值字段。

一个典型的 supfile 往往接收多于一个的 collection。创建 supfile 的一种方式是明确的为每一个 collection 指定相关的字段。然而，这样使得 supfile 的行变得特别长，很不方便， 因为 supfile 中的所有 collection 的大部分 字段都是相同的。 CVSup 提供了一个默认机制来避免 这些问题。用特定的伪 collection 名 `*default` 开头的行可以被用来设置标记和值为 supfile 中随后的 collection 中的默认值。 默认值可以通过为这个 collection 自身指定不同的值来对单个的 collection 覆盖设置， 也可以在 mid-supfile 中通过附加的 `*default` 行改变或扩充。

知道了这些，我们现在就可以开始创建一个 用于接收和升级 [FreeBSD-CURRENT](https://docs.freebsd.org/zh-cn/books/handbook/cutting-edge/#current) 主源代码树的 supfile 文件了。

-   您想接收哪些文件？
    
    通过 CVSup 可用的文件组织成叫做 "collections" 的名称组。 这些可用的 collection 在 [随后的章节](#cvsup-collec) 中描述。 在这个例子里， 我们希望接收 FreeBSD 系统的完整的主代码树。 有一个单独的大的 collection `src-all` 让我们完成这个。 创建我们的 supfile 的第一步， 我们简单的列出这些 collection，每个一行(在这个例子里， 只有一行)：
    
    src-all
    
-   您想要他们的 哪个版本？
    
    通过 CVSup，您实际上可以接收 曾经存在的源代码的任何版本。 这是有可能的，因为 cvsupd 服务器直接通过 CVS 仓库工作，那包含了所有的版本。您可以 用 `tag=` 和 `date=` 值字段 指定一个您想要的版本。
    
    <table><tbody><tr><td><i title="Warning"></i></td><td><p>仔细的正确指定任何 <code>tag=</code> 字段。有一些 tag 只对特定的 collection 文件合法。 如果您指定了一个不正确的或者 拼写错误的 tag，CVSup 会删除您可能不想删除的文件。 特别地，对 <code>ports-*</code> collection <em>只</em>使用 <code>tag=.</code>。</p></td></tr></tbody></table>
    
    `tag=` 字段在仓库中表示为一个符号标签。 有两种标签，修订标签和分支标签。 修订标签代表一个特定的修订版本。 它的含义是一成不变的。 分支标签，另一方面，代表给定开发线上给定时间的最新修订。 因为分支标签不代表一个特定的修订版本， 它明天的含义就可能和今天的有所不同。
    
    [CVS 标签](#cvs-tags) 包含了用户可能感兴趣的分支标签。 当在 CVSup 的配置文件中指定标签的时候，必须用 `tag=` 开头 (`RELENG_8` 会变成 `tag=RELENG_8`)。 记住只有 `tag=.` 可以用于 Ports Collection。
    
    <table><tbody><tr><td><i title="Warning"></i></td><td><p>注意像看到的那样正确的输入标签名。 CVSup 不能辨别合法和不合法标签。 如果您拼写错了标签名， CVSup 会像您指定了一个没有任何文件的合法标签一样工作， 那会删除您已经存在的代码。</p></td></tr></tbody></table>
    
    当您指定一个分支标签的时候，您通常会收到开发线上文件的最新版本。 如果您希望接收一些过时的版本，您可以通过用 `date=` 值字段指定一个日期来做到。 [cvsup(1)](https://man.freebsd.org/cgi/man.cgi?query=cvsup&sektion=1&format=html) 手册页解释了如何来做。
    
    对于我们的示例来说，我们希望接收 FreeBSD-CURRENT。 我们在我们的 supfile 的开头添加这行：
    
    \*default tag=.
    
    有一个重要的特例， 如果您既没指定 `tag=` 字段也没指定 `date=` 字段的情况。这种情况下， 您会收到直接来自于服务器 CVS 仓库的真实的 RCS 文件， 而不是某一特定版本。 开发人员一般喜欢这种操作模式。 通过在他们的系统上维护一份仓库自身的副本， 他们可以浏览修订历史以及检查文件过去的版本。 然而，这个好处是以大量的磁盘空间为代价的。
    
-   您想从哪里获取他们？
    
    我们使用 `host=` 字段来告诉 `cvsup` 从哪里获取更新。 任何一个 [CVSup 镜像站点](#cvsup-mirrors)都可以， 虽然您应该选择一个离您比较近的站点。 在这个例子里我们将使用一个虚拟的 FreeBSD 发布站点， `cvsup99.FreeBSD.org`：
    
    \*default host=cvsup99.FreeBSD.org
    
    您需要在运行 CVSup 之前把这个改成一个实际存在的站点。 在任何 `cvsup` 运行的特定时刻， 您都可以在命令行上使用 `-h _hostname_` 选项来覆盖主机设置。
    
-   您想把它们放在 您自己机器的什么地方？
    
    `prefix=` 字段告诉 `cvsup` 把接收的文件放在哪里。 在这个例子里，我们把源代码文件直接放进我们的主源代码树， /usr/src。 src 目录已经隐含在我们选择接收的 collection 里了， 所以正确的写法是：
    
    \*default prefix=/usr
    
-   `cvsup` 在哪里维护它的状态文件？
    
    CVSup 客户端在被叫做 "base" 的目录里维护了几个状态文件。 这些文件帮助 CVSup 更有效的工作， 通过跟踪您已经接收到哪些更新的方式。 我们将使用标准的 base 目录， /var/db：
    
    \*default base=/var/db
    
    如果您的 base 目录还不存在，现在最好创建它。 如果 base 目录不存在，`cvsup` 客户端会拒绝工作。
    
-   其他的 supfile 设置：
    
    在 supfile 中有一些其他选项需要介绍一下：
    
    \*default release=cvs delete use-rel-suffix compress
    
    `release=cvs` 显示服务器应该从 FreeBSD 的主 CVS 仓库中获取信息。 事实上总是这样的，但是也有可能会超出这个讨论的范围。
    
    `delete` 给 CVSup 权限删除文件。 您应该总是指定这个，这样 CVSup 可以保证您的源代码树完全更新。CVSup 很小心的只删除那些不再依赖的文件。 您拥有的任何额外的文件会被严格的保留。
    
    `use-rel-suffix` 是 …​ 不可思议的。 如果您真的想了解它，查看 [cvsup(1)](https://man.freebsd.org/cgi/man.cgi?query=cvsup&sektion=1&format=html) 手册页。 否则，就指定而不用担心这个。
    
    `compress` 启用 gzip 风格的信道压缩。 如果您的网络连接是 T1 或者更快， 您可能不想使用压缩。 否则，它非常有帮助。
    
-   把它们放在一起：
    
    这是我们的示例的完整 supfile 文件：
    
    \*default tag=.
    \*default host=cvsup99.FreeBSD.org
    \*default prefix=/usr
    \*default base=/var/db
    \*default release=cvs delete use-rel-suffix compress
    
    src-all
    

#### A.5.3.1. refuse 文件[](#cvsup-refuse-file)

像上面提到的，CVSup 使用一种 _pull 方法_。基本上，这意味着您要连接到 CVSup 服务器，服务器说， "这有些您能下载的东西 …​"，然后您的客户端反应"好，我要这个， 这个，这个，还有这个。"在默认的配置中， CVSup 客户端会取回您在配置文件中选定的 collection 和标签的每个文件。 然而，并不总是您想要的， 尤其是您在同步 doc，ports，或者 www 树 - 大部分人都不能阅读四种或者五种 语言，因此他们不需要下载特定语言的文件。 如果您在 CVSup Ports Collection，您 可以通过单独指定每个 collection 来避免这个 (比如，_ports-astrology_， _ports-biology_，等等取代简单的说明 _ports-all_)。然而，因为 doc 和 www 树没有特定语言的 collection，您必须 使用 CVSup 许多极好的特性之一： refuse 文件。

refuse 文件本质上是告诉 CVSup 它不应该从 collection 中取得某些文件；换句话说，它告诉客户端 _拒绝_ 来自服务器的特定的文件。 refuse 文件可以在 base/sup/ 中找到(或者，如果您没有，应该创建一个)。 _base_ 在您的 supfile 中定义； 默认情况下，_base_ 就是 /var/db， 这意味着默认的 refuse 文件就是 /var/db/sup/refuse。

refuse 文件的格式很简单； 它仅仅包含您不希望下载的文件和目录名。 例如，如果您除了英语和德语之外不会讲其他语言， 而且也不打算阅读德文的文档翻译版本， 则可以把下面这些放在您的 refuse 文件里：

```
doc/bn_*
doc/da_*
doc/de_*
doc/el_*
doc/es_*
doc/fr_*
doc/hu_*
doc/it_*
doc/ja_*
doc/mn_*
doc/nl_*
doc/no_*
doc/pl_*
doc/pt_*
doc/ru_*
doc/sr_*
doc/tr_*
doc/zh_*
```

有这个非常有用的特性，那些慢速连接或者要为他们的 Internet 连接按时付费的用户就可以节省宝贵的时间因为他们不再需要 下载那些从来不用的文件。要了解 refuse 文件的更多信息以及其它 CVSup 的优雅的特性，请浏览它的 手册页。

### A.5.4. 运行 CVSup[](#_运行_cvsup)

您现在准备尝试升级了。命令很简单：

```
# cvsup supfile
```

supfile 的位置当然就是您刚刚创建的 supfile 文件名啦。 如果您在 X11 下面运行，`cvsup` 会显示一个有一些可以做平常事情的按钮的 GUI 窗口。 按 **go** 按钮，然后看着它运行。

在这个例子里您将要升级您目前的 /usr/src 树，您将需要 用 `root` 来运行程序，这样 `cvsup` 有需要的权限来更新您的文件。 刚刚创建了您的配置文件，又从来没有使用过这个程序， 紧张不安是可以理解的。有一个简单的方法不改变您当前的文件 来做一次试验性的运行。只要在方便的地方创建一个 空目录，并在命令行上作为一个额外的参数说明：

```
# mkdir /var/tmp/dest
# cvsup supfile /var/tmp/dest
```

您指定的目录会作为所有文件更新的目的路径。 CVSup 会检查您在 /usr/src 中的文件，但是不会修改或 删除。任何文件更新都会被放到 /var/tmp/dest/usr/src 里了。 在这种方式下运行 CVSup 也会把它的 base 目录状态文件保持原样。这些文件的新版本 会被写到指定的目录。 因为您有 /usr/src 目录的读权限，所以执行这种试验性的运行 甚至不需要使用 `root` 用户。

如果您没有运行 X11 或者不喜欢 GUI， 当您运行 `cvsup` 的时候需要在命令行添加 两个选项：

```
# cvsup -g -L 2 supfile
```

`-g` 告诉 CVSup 不要使用 GUI。如果您 没在运行 X11 这个是自动的，否则您必须指定它。

`-L 2` 告诉 CVSup 输出所有正在升级的文件的细节。 有三个等级可以选择，从 `-L 0` 到 `-L 2`。默认是 0，意味着除了错误消息 什么都不输出。

还有许多其它的选项可用。想要一个简短的列表， 输入 `cvsup -H`。要查看更详细的描述， 请查看手册页。

一旦您对升级工作的方式满意了，您就 可以使用 [cron(8)](https://man.freebsd.org/cgi/man.cgi?query=cron&sektion=8&format=html) 来安排规则的运行 CVSup。 很显然的，您不应该让 CVSup 通过 [cron(8)](https://man.freebsd.org/cgi/man.cgi?query=cron&sektion=8&format=html) 运行的时候使用它的 GUI。

### A.5.5. CVSup 文件 collection[](#cvsup-collec)

CVSup 可用的文件 collection 是分级组织的。 有几个大的 collection，然后它们有分成更小的子 collection。接收一个大的 collection 等同于 接收它的每一个子 collection。 collection 的等级关系在下面列表中通过缩进的使用 反映出来。

最常用的 collection 是 `src-all`，和 `ports-all`。其它的 collection 只被有着特定 目的的小部分人使用， 有些站点可能不全部支持。

`cvs-all release=cvs`

FreeBSD 主 CVS 仓库，包含 密码系统的代码。

`distrib release=cvs`

FreeBSD 发行版本和镜像相关的 文件。

`doc-all release=cvs`

FreeBSD 使用手册和其它文档的源代码。 其中不包含 FreeBSD web 站点的文件。

`ports-all release=cvs`

FreeBSD Ports Collection。

<table><tbody><tr><td><i title="Important"></i></td><td><p>如果您不想升级全部的 <code>ports-all</code>(整个 ports 树)， 而只是使用下面列出的一个子集， 请确保您<em>总是</em>升级了 <code>ports-base</code> 子 collection！ 无论何时在 ports 构建下层构造有所改变的时候都会通过 <code>ports-base</code> 表现出来，事实上某些 改变会很快的被"实际的" ports 使用，因此，如果您只升级了 "实际的" ports 而他们使用了一些新的特性， 就有极大的可能编译会因一些神秘的错误信息而失败。 这种情况下<em>非常快速的</em>要做的事情 就是确保您的 <code>ports-base</code> 子 collection 更新到 最新。</p></td></tr></tbody></table>

<table><tbody><tr><td><i title="Important"></i></td><td><p>要自行构建 <span>ports/INDEX</span>， 您 <em>必须</em> 接受 <code>ports-all</code> (完整的 ports tree)。 在部分 ports tree 上构建 <span>ports/INDEX</span> 是不被支持的。 请参见 <a href="https://docs.freebsd.org/en/books/faq/#MAKE-INDEX">FAQ</a>。</p></td></tr></tbody></table>

`ports-accessibility release=cvs`

用以帮助残疾用户的软件。

`ports-arabic release=cvs`

阿拉伯语支持。

`ports-archivers release=cvs`

存档工具。

`ports-astro release=cvs`

天文相关的 ports。

`ports-audio release=cvs`

声音支持。

`ports-base release=cvs`

Ports Collection 构建下部构造 - 位于 /usr/ports 的 Mk/ 和 Tools/ 子目录的 各种各样的文件。

<table><tbody><tr><td><i title="Note"></i></td><td><p>请查看<a href="#cvsup-collec-pbase-warn">重要警告</a>：您应该 <em>总是</em>更新这个 子 collection，无论您更新 FreeBSD Ports Collection 的任何部分的时候！</p></td></tr></tbody></table>

`ports-benchmarks release=cvs`

基准。

`ports-biology release=cvs`

生物学。

`ports-cad release=cvs`

计算机辅助设计工具。

`ports-chinese release=cvs`

中文语言支持。

`ports-comms release=cvs`

通信软件。

`ports-converters release=cvs`

字符编码转换。

`ports-databases release=cvs`

数据库

`ports-deskutils release=cvs`

计算机发明前常出现在桌面上的东西。

`ports-devel release=cvs`

开发工具。

`ports-dns release=cvs`

DNS 相关软件。

`ports-editors release=cvs`

编辑器

`ports-emulators release=cvs`

其它操作系统的模拟器

`ports-finance release=cvs`

货币，金融相关应用程序。

`ports-ftp release=cvs`

FTP 客户端和服务器端工具。

`ports-games release=cvs`

游戏

`ports-german release=cvs`

德语支持。

`ports-graphics release=cvs`

图形图像工具。

`ports-hebrew release=cvs`

希伯来语支持。

`ports-hungarian release=cvs`

匈牙利语言支持。

`ports-irc release=cvs`

Internet 多线交谈(IRC)工具。

`ports-japanese release=cvs`

日语支持。

`ports-java release=cvs`

Java™ 工具。

`ports-korean release=cvs`

韩国语言支持。

`ports-lang release=cvs`

编程语言。

`ports-mail release=cvs`

邮件软件。

`ports-math release=cvs`

数值计算软件。

`ports-misc release=cvs`

杂样工具。

`ports-multimedia release=cvs`

多媒体软件。

`ports-net release=cvs`

网络软件。

`ports-net-im release=cvs`

即时消息软件。

`ports-net-mgmt release=cvs`

网管软件。

`ports-net-p2p release=cvs`

对等网 (peer to peer network) 应用。

`ports-news release=cvs`

USENET 新闻软件。

`ports-palm release=cvs`

Palm™ 系列软件支持。

`ports-polish release=cvs`

波兰语支持。

`ports-ports-mgmt release=cvs`

用于管理 ports 和预编译包的工具。

`ports-portuguese release=cvs`

葡萄牙语支持。

`ports-print release=cvs`

打印软件。

`ports-russian release=cvs`

俄语支持。

`ports-science release=cvs`

科学计算。

`ports-security release=cvs`

安全工具。

`ports-shells release=cvs`

命令行 shell。

`ports-sysutils release=cvs`

系统实用工具。

`ports-textproc release=cvs`

文本处理工具(不 包含桌面出版)。

`ports-ukrainian release=cvs`

乌克兰语支持。

`ports-vietnamese release=cvs`

越南语支持。

`ports-www release=cvs`

万维网(WWW)相关软件。

`ports-x11 release=cvs`

支持 X window 系统的 ports。

`ports-x11-clocks release=cvs`

X11 时钟。

`ports-x11-drivers release=cvs`

X11 驱动程序。

`ports-x11-fm release=cvs`

X11 文件管理器。

`ports-x11-fonts release=cvs`

X11 字体和字体工具。

`ports-x11-toolkits release=cvs`

X11 工具包。

`ports-x11-servers release=cvs`

X11 服务器。

`ports-x11-themes release=cvs`

X11 主题。

`ports-x11-wm release=cvs`

X11 窗口管理器。

`projects-all release=cvs`

FreeBSD 内部项目的代码库。

`src-all release=cvs`

FreeBSD 主代码，包含密码系统的代码。

`src-base release=cvs`

/usr/src 顶层的各式各样的文件。

`src-bin release=cvs`

单用户模式下可能用到的用户工具 (/usr/src/bin)。

`src-cddl release=cvs`

采用了 CDDL 授权的实用工具和函数库 (/usr/src/cddl)。

`src-contrib release=cvs`

FreeBSD 项目之外的工具和库，通常在 FreeBSD 中不作修改 (/usr/src/contrib)。

`src-crypto release=cvs`

FreeBSD 项目之外的 密码系统工具和库，通常在 FreeBSD 中不作修改 (/usr/src/crypto)。

`src-eBones release=cvs`

Kerberos 和 DES (/usr/src/eBones)。 目前的 FreeBSD 中不再使用使用。

`src-etc release=cvs`

系统配置文件 (/usr/src/etc)。

`src-games release=cvs`

游戏 (/usr/src/games)。

`src-gnu release=cvs`

GNU 公共许可协议的工具 (/usr/src/gnu)。

`src-include release=cvs`

头文件 (/usr/src/include)。

`src-kerberos5 release=cvs`

Kerberos5 安全包 (/usr/src/kerberos5)。

`src-kerberosIV release=cvs`

KerberosIV 安全包 (/usr/src/kerberosIV)。

`src-lib release=cvs`

库 (/usr/src/lib)。

`src-libexec release=cvs`

通常被其它程序调用的系统程序 (/usr/src/libexec)。

`src-release release=cvs`

生成 FreeBSD 版本必需的文件 (/usr/src/release)。

`src-rescue release=cvs`

用于紧急修复的静态联编的程序； 请参见 [rescue(8)](https://man.freebsd.org/cgi/man.cgi?query=rescue&sektion=8&format=html) (/usr/src/rescue)。

`src-sbin release=cvs`

单用户模式的系统工具 (/usr/src/sbin)。

`src-secure release=cvs`

密码相关库和命令 (/usr/src/secure)。

`src-share release=cvs`

跨多个平台的共享的文件 (/usr/src/share)。

`src-sys release=cvs`

内核 (/usr/src/sys)。

`src-sys-crypto release=cvs`

内核密码系统代码 (/usr/src/sys/crypto)。

`src-tools release=cvs`

维护 FreeBSD 的各种各样的工具 (/usr/src/tools)。

`src-usrbin release=cvs`

用户工具 (/usr/src/usr.bin)。

`src-usrsbin release=cvs`

系统工具 (/usr/src/usr.sbin)。

`www release=cvs`

FreeBSD WWW 站点的源代码。

`distrib release=self`

CVSup 服务器的 配置文件。用于 CVSup 镜像站点。

`gnats release=current`

GNATS bug 跟踪数据库。

`mail-archive release=current`

FreeBSD 邮件列表存档。

`www release=current`

预处理过的 FreeBSD WWW 站点文件(不是源文件)。 用于 WWW 镜像站点。

### A.5.6. 更多信息[](#_更多信息)

CVSup FAQ 以及关于 CVSup 的其他信息， 请查看 [CVSup 主页](http://www.cvsup.org)。

如果对于 CVSup 有任何问题， 或希望提交 bug 报告， 请参阅 [CVSup FAQ](http://www.cvsup.org/faq.html#bugreports)。

### A.5.7. CVSup 站点[](#cvsup-mirrors)

FreeBSD 的 [CVSup](#cvsup) 服务器运行于 下列站点：
