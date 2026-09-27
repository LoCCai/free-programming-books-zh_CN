**svndumpfilter** 是一个命令行工具, 用于从 Subversion 的转储文件中移除某些历史 (即版本号), 方法是排除或包含具有给定前缀的路径, 关于 **svndumpfilter** 的更多信息, 见 [“svndumpfilter”一节](https://svnbook.red-bean.com/nightly/zh/svn.reposadmin.maint.html#svn.reposadmin.maint.tk.svndumpfilter "svndumpfilter").

**svndumpfilter** 的选项都是全局的:

**svndumpfilter 选项**

`--drop-empty-revs`

如果当前的 **svndumpfilter** 调用导致某个 版本号为空 (即版本号不会对仓库产生修改), 则从最终的转储文件中 删除该版本号.

`--drop-all-empty-revs`

从最终的转储文件中删除所有的空版本号 (除了版本号 0).

`--pattern`

把命令行上所指定的路径前缀看成是文件名通配符模式, 而不是显式的 路径子字符串.

`--renumber-revs`

对过滤后的版本号进行重新编号.

`--skip-missing-merge-sources`

忽略由于过滤而被删除的合并源. 如果没有加上这个选项, 并且保留 下来的路径的合并源由于过滤被删除了, 那么 **svndumpfilter** 就会报错退出.

`--preserve-revprops`

如果版本号内的所有路径都由于过滤而被删除了, 并且没有指定 选项 `--drop-empty-revs`, 则 **svndumpfilter** 的默认行为是删除除了日期和日志 消息外的所有版本号属性 (仅仅是为了表明该版本号是空的). 添加 选项 `--preserve-revprops` 后, **svndumpfilter** 将会保留所有已存在的版本号属性 (由于与版本号相关的路径已经从转储文件中删除了, 所以这样做可能没 什么意义).

`--targets` _`FILENAME`_

告诉 **svndumpfilter** 从文件 _`FILENAME`_ 内读取额外的路径前缀— 每行一个. 如果过滤操作非常复杂, 复杂到难以在命令行上直接写出 全部的路径前缀, 那么这个选项将会非常有用.

`--quiet`

不要打印与过滤有关的统计信息.
