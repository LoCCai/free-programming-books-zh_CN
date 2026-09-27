**svn** 是 Subversion 官方的命令行客户端, 通过一 系列特定于任务的子命令向用户提供功能, 大多数子命令都接受很多参数, 用 于精细地控制程序的行为.

使用 **svn** 程序时, 子命令和非选项参数必须按照特定 的顺序出现在命令行上, 但是选项却可能以任意地顺序出现 (当然, 选项必须 出现在程序名之后), 通常情况下选项的顺序是无关紧要的. 例如, 下面的命令 都是 **svn status** 的有效使用形式, 而且都是按照相同的 方式进行解释:

$ svn -vq status myfile
$ svn status -v -q myfile
$ svn -q status -v myfile
$ svn status -vq myfile
$ svn status myfile -qv

下面几节介绍了各个子命令以及 **svn** 的命令行选项, 同时还展示了每个子命令的典型用法.

虽然各个子命令的选项不完全相同, 但所有的选项都在同一个名字空间内 —无论对于哪个子命令, 选项的意义是完全相同的. 例如无论用户执行 的是哪个子命令, 选项 `--verbose` (`-v`) 的意义总是 “详细输出”.

如果用户向 **svn** 传递了子命令不支持的选项, 那么 程序通常会马上报错退出, 但是从 Subversion 1.5 开始, 有几个选项可被 所有 (或者说几乎所有) 的子命令支持, 因此它们就被当成了可被所有的子命 令接受, 即使该选项对子命令不会产生任何效果. (这种行为主要是为了方便从 定制化的封装脚本中调用 **svn**.) 这些选项作为全局选项 出现在命令行客户端的帮助信息中, 可以用下面的命令看到它们:

$ svn help upgrade
upgrade: Upgrade the metadata storage format for a working copy.
usage: upgrade \[WCPATH...\]

  Local modifications are preserved.

Valid options:
  -q \[--quiet\]             : print nothing, or only summary information

Global options:
  --username ARG           : specify a username ARG
  --password ARG           : specify a password ARG
  --no-auth-cache          : do not cache authentication tokens
  --non-interactive        : do no interactive prompting (default is to prompt
                             only if standard input is a terminal device)
  --force-interactive      : do interactive prompting even if standard input
                             is not a terminal device
  --trust-server-cert      : accept SSL server certificates from unknown
                             certificate authorities without prompting (but only
                             with '--non-interactive')
  --config-dir ARG         : read user configuration files from directory ARG
  --config-option ARG      : set user configuration option in the format:
                                 FILE:SECTION:OPTION=\[VALUE\]
                             For example:
                                 servers:global:http-library=serf
$

**svn** 的子命令支持以下选项:

**svn 选项**

`--accept` _`ACTION`_

为自动的冲突解决指定处理措施, 当 Subversion 注意到冲突发生时不 会再询问用户如何处理. Subversion 支持的 _`ACTION`_ 如下所示, 但不同的子命令, 其可用 的 _`ACTION`_ 是不同的:

`postpone` (`p`)

对冲突不采取任何措施, 将冲突记录起来, 以便稍后再作处理.

`edit` (`e`)

在文本编辑器中打开每一个冲突文件, 由用户手工处理冲突.

`launch` (`l`)

为每一个冲突文件调用交互式的冲突合并工具.

`base`

在把服务器上的修改合并到工作副本之前, 把文件指定成版本 号为 `BASE`, 且未修改的版本.

`working`

将文件在工作副本中的当前版本作为冲突解决后的版本, 在这 之前用户应该手工处理了文件里的冲突.

`mine-full` (`mf`)

如果文件发生了冲突, 则保留文件里的所有本地修改, 丢弃 该文件从服务器接收到的所有修改.

`theirs-full` (`tf`)

如果文件发生了冲突, 则丢弃文件里的所有本地修改, 保留 从服务器接收到的所有修改.

`mine-conflict` (`mc`)

如果文件的某一区域发生了冲突, 则保留该区域的本地修改, 丢弃从服务器接收到的同一区域上的修改.

`theirs-conflict` (`tc`)

如果文件的某一区域发生了冲突, 则丢弃该区域的本地修改, 保留从服务器接收到的同一区域上的修改.

为了查看特定的子命令支持哪些 _`ACTION`_, 阅读 **svn help _`SUBCOMMAND`_** 的输出.

`--allow-mixed-revisions`

在合并时, 禁止去核实目标及其子文件的版本号是否是相同的. 从 Subversion 1.7 开始, 默认都会去核实版本号是否相同. 虽然推荐的 做法是让待合并的工作副本处于一个相同的版本号下, 但必要时还是可以 用这个选项允许向版本号混合的工作副本执行合并.

`--auto-props`

允许自动属性设置, 它将覆盖运行时配置指令 `enable-auto-props` 的设置.

`--change` (`-c`) _`ARG`_

使用一个特定的 “修改” 执行所请求的操作. 通常来说, 这个选项是 **``-r _`ARG-1`_:_`ARG`_``** 的同义语. 某些子命令允许选项的参数是逗号分隔的版本号列表 (即 **``-c _`ARG1`_,_`ARG2`_,_`ARG3`_``**), 用户还可以用连字符分隔的两个版本号指定一个版本号范围 (即 **``-c _`ARG1`_-_`ARG2`_``** ), 范围包括起始与结束版本号. 最后, 如果版本号是一个负数, 则表示相反 的版本号范围, 例如 **`-c -45`** 等价于 **`-r 45:44`**.

`--changelist` (`--cl`) _`ARG`_

告诉 Subversion 只去操作属于变更列表 _`ARG`_ 的文件, 用户可以多次使用这个选项, 从而指定多个变更列表.

`--config-dir` _`DIR`_

告诉 Subversion 从指定的目录 (而不是默认的 `.subversion`) 中读取配置信息.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>所有的 <span><strong>svn</strong></span> 子命令都支持该选项.</p></td></tr></tbody></table>

`--config-option` _`CONFSPEC`_

在命令执行期间设置运行时配置选项. _`CONFSPEC`_ 是一个字符串, 指定了运行时配置 选项的名字空间, 选项名和选项值, 形式是 _`FILE`_:_`SECTION`_:_`OPTION`_\=\[_`VALUE`_\], 其中, _`FILE`_ 和 _`SECTION`_ 分别是选项所在的运行时配置文件 (`config` 或 `server`) 和配置 文件里的节. _`OPTION`_ 就是选项本身, 而 _`VALUE`_ (如果有的话) 就是选项的值. 比如 说用户想要临时禁止 HTTP 压缩, 那就可以把 `--config-option` 写成 `--config-option=servers:global:http-compression=no`. 该选项可以在命令行上出现多次.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>所有的 <span><strong>svn</strong></span> 子命令都支持该选项.</p></td></tr></tbody></table>

`--depth` _`ARG`_

告诉 Subversion 把命令的操作范围限制在一个指定的目录深度内. _`ARG`_ 可以是 `empty` (目标本身), 或 `files` (目标和目标的直接子文件, 不包括直接子目录), `immediates` (目标和目标的直接 子文件, 包括直接子目录), 或 `infinity` (目标和 目标的所有子孙—即完全递归).

`--diff`

告诉 **svn log** 输出版本号所包含的差异 (按照 **svn diff** 的方式进行输出).

`--diff-cmd` _`CMD`_

指定一个外部差异比较工具. 如果在执行 **svn diff** 时没有指定该选项, Subversion 将会使用它自己的差异比较引擎, 默认 按照标准差异格式进行输出. 如果用户希望使用一个外部的差异比较工具, 就可以用该选项实现, 然后还可以用选项 `--extensions` (`-x`) 为外部差异比较工具传递选项.

`--diff3-cmd` _`CMD`_

指定一个外部的三路差异比较工具 (用于合并文件的修改).

`--dry-run`

执行命令的所有过程, 除了做出实际的修改—无论是修改工作 副本还是仓库.

`--editor-cmd` _`CMD`_

指定一个外部文本编辑器, 用于编辑日志消息或属性值. 关于如何 指定一个默认文本编辑器, 见 [“通用配置选项”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.confarea.html#svn.advanced.confarea.opts.config "通用配置选项") 的 `editor-cmd` 节.

`--encoding` _`ENC`_

告诉 Subversion 你的提交消息是用该选项所指定的字符集编码编写的. 默认情况下, Subversion 根据操作系统的本地语言环境判断提交消息的 字符集编码, 如果你用了其他字符集编码, 就要用该选项显式地告诉 Subversion 你所用的字符集编码.

`--extensions` (`-x`) _`ARG`_

为 Subversion 的差异比较引擎指定扩展选项, 有效的扩展选项有:

`--ignore-space-change` (`-b`)

忽略空白字符在数量方面的变化.

`--ignore-all-space` (`-w`)

忽略所有的空白字符.

`--ignore-eol-style`

忽略 EOL (end-of-line, 行结束标记) 的变化.

`--show-c-function` (`-p`)

在差异比较输出中显示 C 程序的函数名.

`--unified` (`-u`)

显示宽度为 3 行的标准差异上下文.

_`ARG`_ 的默认值是 `-u`, 如果你希望指定多个扩展选项, 就把它们放在一 对双引号中.

需要注意的是, 如果差异比较引擎是一个外部的差异比较工具, 那么 选项 `--extensions` (`-x`) 的值 不仅限于以上提到的这些, 而是可以设置成 _任意_ 值.

`--file` (`-F`) _`FILENAME`_

将文件的内容传递给子命令, 不同的子命令将文件内容用于不同的目的, 例如 **svn commit** 把文件内容作为提交日志消息, 而 **svn propset** 把文件内容作为属性值.

`--force`

强迫命令或操作往下执行. 在正常使用时, Subversion 会阻止用户 执行某些操作, 但是用户可以用这个选项告诉 Subversion: “我 知道我正在做什么, 也知道这样做的可能后果, 所以请继续往下执行. ” 用这个选项就好像一个电工在未断电的情况下工作—如果 你不知道自己正在做什么, 你可能会对命令的执行结果感到震惊.

`--force-log`

迫使 Subversion 接受传递给 `--message` (`-m`) 或 `--file` (`-F`) 的可疑参数, 默认情况下, 如果传递给这两个 选项的参数看起来好像是子命令的目标参数, 那么 Subversion 将会报 错退出. 比如说用户向选项 `--file` (`-F`) 传递了一个处于版本控制下的文件路径, Subversion 将会认为用户犯了一个错误: 这个文件路径应该作为子命令 的目标参数, 选项 `--file` (`-F`) 的参数应该是一个未被版本控制的文件路径. 为了表明自己的意图, 并且 阻止 Subversion 进行这种检查, 用户就可以用选项 `--force-log` 迫使 Subversion 无条件地接受日志消息.

`--force-interactive`

如果标准输入不是一个终端设备, 强迫 **svn** 以 交互模式运行.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>所有的 <span><strong>svn</strong></span> 子命令都支持该选项.</p></td></tr></tbody></table>

`--git`

按照分布式版本控制系统 Git 的格式, 打印 **svn diff** 的标准差异输出.

`--help` (`-h`, `-?`)

如果在执行时带了一个或多个子命令, 则显示各个子命令的内建帮助 文档. 如果只是单独使用, 则显示客户端命令行工具的总体帮助文档.

`--ignore-ancestry`

告诉 Subversion 在计算差异时忽略祖先 (仅依赖路径上的内容), 对 **svn merge** 而言, 该选项还会禁止 [合并跟踪](https://svnbook.red-bean.com/nightly/zh/svn.branchmerge.basicmerging.html#svn.branchmerge.basicmerging.mergetracking "合并跟踪").

`--ignore-externals`

忽略外部定义和外部工作副本.

`--ignore-keywords`

禁止关键字替换.

`--ignore-properties`

告诉 **svn diff** 忽略属性的变化.

`--ignore-whitespace`

告诉 **svn patch** 在识别补丁上下文时忽略 空白字符.

`--incremental`

按照一种增量的格式打印输出, 该格式允许将本次输出级连到之前 的相同类型的输出.

`--internal-diff`

告诉 Subversion 始终使用内建的差异比较引擎, 无论用户是否在 运行时配置中指定了外部差异比较工具.

`--keep-changelists`

告诉 Subversion 在提交成功后不要把文件从变更列表中移除.

`--keep-local`

执行完 **svn delete** 后, 在工作副本中保留 文件.

`--limit` (`-l`) _`NUM`_

显示日志消息的前 _`NUM`_ 项.

`--message` (`-m`) _`MESSAGE`_

表示用户将在命令行上编写日志消息或锁的注释, 选项的后面即是 用户写的内容, 例如:

$ svn commit -m "They don't make Sunday."

`--native-eol` _`ARG`_

告诉 **svn export** 使用指定的行结束标记作为 系统的本地标记, 这将会影响那些 `svn:eol-style` 属性值为 `native` 的文件. _`ARG`_ 的有效值包括 `CR`, `LF` 和 `CRLF`.

`--new` _`ARG`_

使用 _`ARG`_ 作为较新的目标 (与 **svn diff** 配合使用).

`--no-auth-cache`

禁止在 Subversion 运行时配置目录里缓存认证信息 (例如用户名 和密码).

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>所有的 <span><strong>svn</strong></span> 子命令都支持该选项.</p></td></tr></tbody></table>

`--no-auto-props`

禁止自动属性设置, 该选项会覆盖运行时配置选项 `enable-auto-props`.

`--no-diff-added`

禁止为新增的文件输出差异. 默认情况下, 新文件的差异输出就像是 往一个已有的空文件内写入了全部内容后的差异输出效果.

`--no-diff-deleted`

禁止为删除了的文件输出差异. 默认情况下, 删除了的文件的差异 输出就像是删除了文件的所有内容 (但不删除文件) 后的差异输出效果.

`--no-ignore`

在显示工作副本状态, 添加文件或导入文件时不要忽略任何文件 (即使文件名与运行时配置选项 `global-ignores`, 属性 `svn:ignore` 或属性 `svn:global-ignores` 里的模式相匹配), 更多的 信息见 [“通用配置选项”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.confarea.html#svn.advanced.confarea.opts.config "通用配置选项") 和 [“忽略未被版本控制的项”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.props.special.ignore.html "忽略未被版本控制的项").

`--no-unlock`

告诉 Subversion 不要自动释放锁. (默认的提交行为会释放所有已 提交的文件上的锁.) 更多的信息见 [“锁”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.locking.html "锁").

`--non-interactive`

禁止所有的交互式提示. 交互式提示的例子包括向用户请求认证证书 和冲突解决. 如果你是在一个自动化的脚本中运行 Subversion, 那么比 起向用户发出交互式请求, 更方便的做法是报错退出.

从 Subversion 1.8 开始, 如果标准输入不是一个终端设备, 那么 **svn** 默认以非交互式模式运行. 为了强制 **svn** 以交互式模式运行, 可使用选项 `--force-interactive`.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>所有的 <span><strong>svn</strong></span> 子命令都支持该选项.</p></td></tr></tbody></table>

`--non-recursive` (`-N`)

_不再推荐使用该选项_. 禁止子命令递归执行到 子目录内. 大多数子命令默认都会递归执行到子目录内, 但有些不会. 用户 应该不再使用该选项, 而使用更精确的 `--depth`, 对于 大多数子命令而言, 选项 `--non-interactive` 等价于 `--depth=files`, 但是对于 **svn status** 来说, 与 `--non-recursive` 等价 的选项是 `--depth=immediates`, 对于 **svn revert**, **svn add** 和 **svn commit** 来说, 等价的选项则是 `--depth=empty`.

`--notice-ancestry`

在计算差异时要考虑祖先.

`--old` _`ARG`_

使用 _`ARG`_ 作为较旧的目标 (与 **svn diff** 配合使用).

`--parents`

作为操作的一部分, 在工作副本或仓库中自动创建不存在的父目录. 这个选项对于自动创建多级子目录非常方便, 如果目标是一个 URL, 那么 所有的目录都会在同一个提交中创建完成.

`--password` _`PASSWD`_

指定用于 Subversion 服务器认证的密码. 如果没有在命令行上指定 密码, 或者密码有误, 在需要时 Subversion 将提示用户输入密码.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>所有的 <span><strong>svn</strong></span> 子命令都支持该选项.</p></td></tr></tbody></table>

`--patch-compatible`

告诉 **svn diff** 的输出要和通用的第三方补丁 工具保持兼容. 该选项等价于 `--show-copies-as-adds --ignore-properties`.

`--properties-only`

告诉 **svn diff** 只输出属性上的变化.

`--quiet` (`-q`)

告诉 **svn** 在执行时只打印必要的信息.

`--record-only`

告诉 **svn merge** 只合并合并信息, 不合并文件 上的修改.

`--recursive` (`-R`)

告诉子命令要递归地执行到子目录内 (大多数子命令都会默认递归 执行).

`--reintegrate`

_不再推荐使用该选项_. 该选项用于 **svn merge** 把特性分支上的修改合并到特性分支的祖先分支上. 从 Subversion 1.8 开始, **svn merge** 能够自动检测这种合并场景并执行 恰当的合并操作, 更多的细节见 [“重新整合分支”一节](https://svnbook.red-bean.com/nightly/zh/svn.branchmerge.basicmerging.html#svn.branchmerge.basicmerging.reintegrate "重新整合分支").

`--relocate`

_不再推荐使用该选项_. 该选项用于 **svn switch** 改变工作副本所指向的仓库位置, 从 Subversion 1.7 开始, 更好的做法 是用命令 **svn relocate**, 更多的细节和示例见 [svn relocate](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.relocate.html "svn relocate").

`--remove`

用于 **svn changelist** 解除—而不是建立 (默认行为)—文件与变更列表之间的关联.

`--reverse-diff`

告诉 **svn patch** 反向应用补丁—把新增 的行看成是被删除的行, 把删除的行看成是新增的行.

`--revision` (`-r`) _`REV`_

指定待操作的版本号 (或版本号范围). 该选项接受的参数有整数, 关键字或日期 (日期被花括号包围). 如果你希望指定一个版本号范围, 就在起始版本号与终止版本号之间加个冒号, 例如:

$ svn log -r 1729
$ svn log -r 1729:HEAD
$ svn log -r 1729:1744
$ svn log -r {2001-12-04}:{2002-02-17}
$ svn log -r 1729:{2002-02-17}

更多的信息见 [“版本号关键字”一节](https://svnbook.red-bean.com/nightly/zh/svn.tour.revs.specifiers.html#svn.tour.revs.keywords "版本号关键字").

`--revprop`

针对版本号属性 (而不是文件或目录上的属性) 进行操作, 该选项 还要求你同时用选项 `--revision` (`-r`) 指定了一个版本号.

`--search` _`ARG`_

从日志消息中过滤出和模式 _`ARG`_ 匹配 的那些消息. 如果日志消息的作者, 日期, 消息的文本内容 (除非指定了 选项 `--quiet`) 或被修改的路径中的任意一条与模式 匹配, 该日志消息就被认为是匹配的. 如果选项 `--search` 出现了多次, 只要日志消息和其中的任意一 个 `--search` 匹配, 该日志消息就被认为是匹配的. 如果同时还指定了选项 `--limit`, 那么 `--limit` 限制的是被搜索的日志消息数量, 而不是匹配 的日志消息数量.

搜索模式 (也被叫作文件名模式或 Shell 通配符模式) 可以包含普通 字符和下面这些通配符:

`?`

匹配任意一个字符.

`*`

匹配任意一个字符串, 字符串的长度可以为零.

`[ABC]`

匹配方括号内的任意一个字符.

`--search-and` _`ARG`_

该选项的参数和前面的 `--search` 或 `--search-and` 的参数联合起来, 只有匹配 _所有_ 模式的日志消息才被认为是匹配的.

`--set-depth` _`ARG`_

把目录的粘着 (sticky) 深度设置成 `exclude`, `empty`, `files`, `immediates` 或 `infinity`, 关于这些参数的详细信息以及如何使用它们, 见 [“稀疏目录”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.sparsedirs.html "稀疏目录").

`--show-copies-as-adds`

告诉 **svn diff** 在显示通过复制得到的文件 的差异时, 不要显示它们与被复制的源文件之间的差异, 而是把它们当作 全新的文件 (就好像往一个空文件中写了内容后的差异输出).

`--show-inherited-props`

告诉 **svn propget** 和 **svn proplist** 显示继承到的版本化属性.

`--show-revs` _`ARG`_

告诉 **svn mergeinfo** 显示特定种类的合并跟踪 信息. _`ARG`_ 可以是 `merged` 或 `eligible`, 分别表示 已经合并的版本号和未来有资格被合并的版本号.

`--show-updates` (`-u`)

要求客户端显示关于文件是否过时的信息, 它不会更新工作副本中的 文件—它只是会告诉你在下一次执行 **svn update** 时, 哪些文件将被更新.

`--stop-on-copy`

该选项将导致 Subversion 子命令在遍历历史时, 如果遇到了复制 —即历史中某一位置上的资源是通过复制仓库中其他位置来得到的 —则不再往前遍历历史.

`--strict`

告诉 Subversion 使用更严格的语义, 在谈到 “更严格的语义” 时, 必须关联上特定的子命令 (即 **svn propget**) 才能解释清楚.

`--strip` _`NUM`_

用于 **svn patch** 忽略补丁文件中的前 _`NUM`_ 个路径分量.

`--summarize`

告诉子命令只显示总结性的信息.

`--targets` _`FILENAME`_

告诉子命令从文件 `FILENAME` 读取额外的目标 路径参数. `FILENAME` 的每一行都是一个路径, 路径 的编码和格式应该和把它们直接写在命令行上时相同.

`--trust-server-cert`

和选项 `--non-interactive` 一起使用时, 指示 Subversion 接受由未知的证书机构颁发的 SSL 服务器证书, 而不必提 示用户. 为了安全起见, 只有当远程服务器和网络路径的完整性很可靠 时才能使用该选项.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>所有的 <span><strong>svn</strong></span> 子命令都支持该选项.</p></td></tr></tbody></table>

`--use-merge-history` (`-g`)

使用或显示来自合并历史的额外信息.

`--username` _`NAME`_

指定用于向 Subversion 服务器认证的用户名, 如果没有指定用户名 或者指定的用户名不正确, Subversion 将会再次提示用户输入用户名.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>所有的 <span><strong>svn</strong></span> 子命令都支持该选项.</p></td></tr></tbody></table>

`--verbose` (`-v`)

要求子命令输出更详细的信息, 这可能会导致客户端输出额外的字段, 关于每个文件的详细信息, 或与操作有关的额外信息.

`--version`

打印客户端的版本信息. 版本信息不仅包括客户端的版本号 (这里的 版本号指的是软件的版本, 注意不要和 Subversion 的版本号 (revision) 混淆), 还有客户端支持的所有仓库访问模块. 如果加上了选项 `--quiet` (`-q`), 则只打印版本号.

`--with-all-revprops`

和选项 `--xml` 一起使用, 指示 Subversion 检索并 输出所有的版本号属性—包括 Subversion 保留给自己内部使用的属性 和用户的自定义属性—到日志中.

`--with-no-revprops`

和选项 `--xml` 一起用在命令 **svn log** 时, 指示 Subversion 在日志输出中忽略所有的版本号 属性—包括标准的日志消息, 作者和版本号时间戳属性.

`--with-revprop` _`ARG`_

如何该选项和其他需要向仓库写数据的命令一起使用时, 它可用于设置 版本号属性, 格式是 **``_`NAME`_=_`VALUE`_``**, 意思是把属性 _`NAME`_ 的值设置成 _`VALUE`_; 如果该选项和 `--xml` 一起用在命令 **svn log** 里, 那么 _`ARG`_ 的值将会显示在日志输出中.

`--xml`

按照 XML 格式打印输出. 输出所使用的 XML 模式 (使用 RELAX NG 格式) 的相关文件位于 Subversion 源代码树的 `subversion/svn/schema/` 目录内.

**目录**

[svn add](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.add.html)

[svn blame (praise, annotate, ann)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.blame.html)

[svn cat](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.cat.html)

[svn changelist (cl)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.changelist.html)

[svn checkout (co)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.checkout.html)

[svn cleanup](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.cleanup.html)

[svn commit (ci)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.commit.html)

[svn copy (cp)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.copy.html)

[svn delete (del, remove, rm)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.delete.html)

[svn diff (di)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.diff.html)

[svn export](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.export.html)

[svn help (h, ?)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.help.html)

[svn import](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.import.html)

[svn info](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.info.html)

[svn list (ls)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.list.html)

[svn lock](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.lock.html)

[svn log](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.log.html)

[svn merge](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.merge.html)

[svn mergeinfo](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.mergeinfo.html)

[svn mkdir](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.mkdir.html)

[svn move (mv)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.move.html)

[svn patch](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.patch.html)

[svn propdel (pdel, pd)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.propdel.html)

[svn propedit (pedit, pe)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.propedit.html)

[svn propget (pget, pg)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.propget.html)

[svn proplist (plist, pl)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.proplist.html)

[svn propset (pset, ps)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.propset.html)

[svn relocate](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.relocate.html)

[svn resolve](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.resolve.html)

[svn resolved](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.resolved.html)

[svn revert](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.revert.html)

[svn status (stat, st)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.status.html)

[svn switch (sw)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.switch.html)

[svn unlock](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.unlock.html)

[svn update (up)](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.update.html)

[svn upgrade](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.upgrade.html)
