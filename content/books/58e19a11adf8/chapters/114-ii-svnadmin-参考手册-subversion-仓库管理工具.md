**svnadmin** 是监控和修复 Subversion 仓库的管理工具. 关 于仓库管理的更多细节, 见 [“svnadmin”一节](https://svnbook.red-bean.com/nightly/zh/svn.reposadmin.maint.html#svn.reposadmin.maint.tk.svnadmin "svnadmin").

由于 **svnadmin** 只有直接访问仓库才能工作 (因 此它只能用在存放了仓库的主机中), 所以说在指定仓库时只能使用文件系统路径, 而不是 URL.

**svnadmin** 的选项都是全局的, 就像 **svn** 的全局选项:

**svnadmin 选项**

`--bdb-log-keep`

(特定于 Berkeley DB 的选项.) 禁止自动删除数据库的日志文件. 保留这些日志文件有助于从灾难性的仓库失败中恢复数据.

`--bdb-txn-nosync`

(特定于 Berkeley DB 的选项.) 在提交数据库事务时禁止调用 `fsync`. 该选项可以让 **svnadmin create** 创建一个开启了 `DB_TXN_NOSYNC`, 以 Berkeley DB 作为后端存储的仓库 (该选项可以提升性能, 但会带 来一定的风险).

`--bypass-hooks`

旁路掉仓库的钩子脚本.

`--bypass-prop-validation`

加载一个转储文件时, 禁止对属性值进行检查.

`--clean-logs`

删除无用的 Berkeley DB 日志.

`--compatible-version` _`ARG`_

使用与版本为 _`ARG`_ 的 Subversion 兼容的仓库格式.

`--config-dir` _`DIR`_

告诉 Subversion 从指定的目录内读取配置信息, 而不是从默认的目录 (用户家目录中的 `.subversion`) 中读取.

`--deltas`

在创建仓库的转储文件时, 把属性和文件内容上的修改指定成相对于 前一状态的修改.

`--file` (`-F`) _`FILENAME`_

为指定的子命令使用文件中的内容.

`--fs-type` _`ARG`_

创建一个仓库时, 使用 _`ARG`_ 指定的文件 系统类型, _`ARG`_ 可以是 `bdb` 或 `fsfs`.

`--force-uuid`

默认情况下, 为一个已经包含了版本号的仓库加载转储数据时, **svnadmin** 会忽略转储数据中的 UUID. 该选项使得 仓库的 UUID 被设置成转储数据中的 UUID.

`--ignore-uuid`

默认情况下, 往一个空仓库加载转储数据时, **svnadmin** 会把仓库的 UUID 设置成转储数据中的 UUID. 该选项使得 **svnadmin** 忽略转储数据中的 UUID.

`--incremental`

按照增量格式转储版本号.

`--memory-cache-size` (`-M`) _`ARG`_

配置额外的内存缓存大小 (以 MB 为单位), 这种缓存可以用来减少 重复操作, 但只能用于以 FSFS 作为后端存储的仓库. 默认值是 16.

`--parent-dir` _`DIR`_

加载一个转储文件时, 把根目录设置成 _`DIR`_, 而不是默认的 `/`.

`--pre-1.4-compatible`

_不再推荐使用_. 见选项 `--compatible-version`. 当创建一个新的仓库时, 仓库的格式要和 Subversion 1.4 之前的版本保持兼容.

`--pre-1.5-compatible`

_不再推荐使用_. 见选项 `--compatible-version`. 当创建一个新的仓库时, 仓库的格式要和 Subversion 1.5 之前的版本保持兼容.

`--pre-1.6-compatible`

_不再推荐使用_. 见选项 `--compatible-version`. 当创建一个新的仓库时, 仓库的格式要和 Subversion 1.6 之前的版本保持兼容.

`--revision` (`-r`) _`ARG`_

为后面的操作指定一个版本号.

`--quiet` (`-q`)

不要显示正常的输出—只显示与错误有关的输出.

`--use-post-commit-hook`

加载一个转储文件时, 每完成一个版本号的提交, 就执行一次仓库 的 post-commit 钩子脚本.

`--use-post-revprop-change-hook`

修改一个版本号属性时, 在修改完后执行仓库的 post-revprop-change 钩子脚本.

`--use-pre-commit-hook`

加载一个转储文件时, 在提交版本号之前, 执行仓库的 pre-commit 钩子脚本, 如果脚本返回错误, 则中止提交, 并结束整个加载 过程.

`--use-pre-revprop-change-hook`

在修改一个版本号属性之前, 执行仓库的 pre-revprop-change 钩子脚本, 如果脚本返回错误, 就中止修改操作并结束.

`--wait`

对于那些需要互斥访问仓库的操作来说, 如果仓库锁已经被他人获取, 则等待别人放锁, 而不是马上报错退出.
