**svnlook** 是一个命令行工具, 用于检查 Subversion 仓库的方方面面, 它不会对仓库做出任何修改—它仅仅是 “看一下” 仓库. **svnlook** 经常被仓库钩子 使用, 但管理员也可以用它来诊断仓库.

由于 **svnlook** 只有直接访问仓库才能工作 (因 此它只能用在存放了仓库的主机中), 所以说在指定仓库时只能使用文件系统路径, 而不是 URL.

如果没有指定版本号或事务, **svnlook** 默认使用仓库 最新的版本号.

**svnlook** 的选项都是全局的, 就像 **svn** 和 **svnadmin** 的全局选项, 但是大 多数选项只对一个子命令起作用, 因为 **svnlook** (有意地) 限制了功能的作用范围.

**svnlook 选项**

`--copy-info`

使得 **svnlook changed** 显示复制源的详细信息.

`--diff-cmd` _`CMD`_

指定用于显示文件差异的外部差异比较工具. 如果在执行 **svnlook diff** 时没有指定该选项, 它就使用 Subversion 内建的差异比较引擎, 默认按照标准差异格式打印输出. 用户 还可以用选项 `--extensions` (`-x`) 向外部差异比较工具传递额外的选项.

`--diff-copy-from`

显示被复制的项目与复制源之间的差异.

`--extensions` (`-x`) _`ARG`_

为 Subversion 的差异比较指定扩展选项, 有效的扩展选项有:

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

扩展选项的默认值是 `-u`.

需要注意的是, 如果差异比较引擎是一个外部的差异比较工具, 那么 选项 `--extensions` (`-x`) 的参数 不仅限于以上提到的这些, 而是可以设置成外部差异比较工具能够接受的 _任意_ 参数, 如果你希望传递多个参数, 必须把 它们用双引号包围起来.

`--full-paths`

使得 **svnlook tree** 显示完整的路径, 而不是 层次化的, 逐渐缩进的路径分量.

`--ignore-properties`

禁止 **svnlook diff** 显示属性的变化.

`--limit` (`-l`) _`ARG`_

把输出的项目个数限制在 _`ARG`_ 以内.

`--no-diff-deleted`

禁止 **svnlook diff** 为删除的文件显示差异 输出. 默认情况下, 如果文件在版本号或事务中被删除了, **svnlook diff** 在为该文件显示差异输出时, 其效果 就像是把文件的全部内容删除, 但不删除文件.

`--no-diff-added`

禁止 **svnlook diff** 为新增的文件显示差异输出. 默认情况下, 如果文件是新增的, 那么 **svnlook diff** 在为该文件显示差异输出时, 其效果就像是把所有的内容一下子都添加到一 个已有的空文件里.

`--non-recursive` (`-N`)

只对一个单独的目录进行操作.

`--properties-only`

使得 **svnlook diff** 只显示属性的变化.

`--revision` (`-r`) _`REV`_

指定待查看的版本号.

`--revprop`

针对版本号属性进行操作, 而不是文件或目录上的属性, 如果用到 了该选项, 则用户还必须用选项 `--revision` (`-r`) 指定一个版本号.

`--show-inherited-props`

使得 **svnlook propget** 和 **svnlook proplist** 显示继承而来的属性.

`--transaction` (`-t`) _`ID`_

指定待查看的事务 ID.

`--show-ids`

为文件系统树中的每一个路径, 显示文件系统节点的版本号 ID.

`--verbose` (`-v`)

显示更加详细的输出. 例如为 **svnlook proplist** 指定该选项时, 除了列出属性名, Subversion 还会把属性值打印出来.

`--xml`

按照 XML 格式打印输出.
