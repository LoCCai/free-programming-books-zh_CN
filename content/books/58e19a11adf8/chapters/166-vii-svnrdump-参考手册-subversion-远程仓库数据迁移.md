**svnrdump** 在 Subversion 1.7 引入, 它相当于 **svnadmin dump** 和 **svnadmin load** 的网络版, 作为一个单独的程序被发布出来. 我们在 [“迁移仓库数据”一节](https://svnbook.red-bean.com/nightly/zh/svn.reposadmin.maint.html#svn.reposadmin.maint.migrate "迁移仓库数据") 介绍了如何使用 **svnadmin** 和 **svnrdump** 转储和加载 仓库数据.

**svnrdump** 的选项都是全局的:

**svnrdump 选项**

`--config-dir` _`DIR`_

告诉 Subversion 从指定的目录内读取配置信息, 而不是从默认的目录 (用户家目录中的 `.subversion`) 中读取.

`--config-option` _`FILE`_:_`SECTION`_:_`OPTION`_\=\[_`VALUE`_\]

在命令运行期间, 设置运行时配置选项的值. _`CONFSPEC`_ 是一个字符串, 指定了运行时 配置选项的名字空间, 选项名和选项值, 格式是 _`FILE`_:_`SECTION`_:_`OPTION`_\=\[_`VALUE`_\]. 其中, _`FILE`_ 和 _`SECTION`_ 分别是运行时配置文件 (`config` 或 `servers`) 和节, 它们包含了用户希望修改的选项. _`OPTION`_ 是选项名, _`VALUE`_ 是选项值 (如果有的话). 例如, 为了临时禁止 HTTP 压缩, 可以写成 `--config-option=servers:global:http-compression=no`. 选项 `--config-option` 可以在命令行上出现多次, 从而同时修改多个选项.

`--incremental`

在转储版本号或版本号范围时, 对范围中的第一个版本号按照增量 格式进行转储, 而不是默认行为—转储第一个版本号的完整内容.

`--no-auth-cache`

禁止在 Subversion 运行时配置目录中缓存认证信息 (例如用户名和密码).

`--non-interactive`

如果认证失败, 或者证书不充分, 将不再提示输入证书 (例如 用户名和密码). 如果在一个自动化运行的脚本中使用 Subversion, 那么这个选项就会很有用, 当遇到错误时, 更好的做法是立刻失败退出, 而不是请求输入更多的数据.

`--password` _`PASSWD`_

指定 Subversion 用户密码, 如果没有指定密码, 或者密码不正确, 在必要时 Subversion 将会提示用户再次输入密码.

`--quiet` (`-q`)

在执行过程中, 只打印重要的信息.

`--revision` (`-r`) _`ARG`_

指定待操作的版本号或版本号范围.

`--trust-server-cert`

和 `--non-interactive` 一起使用, 告诉 Subversion 接受任意一个未知的 SSL 服务器证书, 不要向用户提示.

`--username` _`NAME`_

指定 Subversion 用户名, 如果没有指定或用户名不正确, Subversion 在必要时会提示用户重新输入.
