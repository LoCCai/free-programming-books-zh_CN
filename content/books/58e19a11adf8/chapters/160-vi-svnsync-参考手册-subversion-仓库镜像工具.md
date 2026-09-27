**svnsync** 是 Subversion 的远程仓库镜像工具, 简单 地说, 它允许你在仓库中重放另一个仓库的版本号.

在做镜像时, 总是存在两个仓库: 源仓库和镜像仓库. **svnsync** 从源仓库获取版本号, 再到镜像仓库中重放版本 号. 任意一个仓库都可以是远程的或本地的—**svnsync** 只是通过 URL 对它们进行寻址.

**svnsync** 只要求对源仓库具有读取权限, 它不会试图 去修改源仓库的任何数据. 当然, **svnsync** 要求对镜像 仓库具有读写权限.

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p><span><strong>svnsync</strong></span> 对于不是由镜像操作产生的修改非常 敏感, 因此最好的做法是仅允许 <span><strong>svnsync</strong></span> 对镜像 仓库进行修改.</p></td></tr></tbody></table>

**svnsync** 的选项都是全局的:

**svnsync 选项**

`--allow-non-empty`

不去核实被初始化的仓库是否是一个版本历史为空的仓库 (默认情况下, **svnsync initialize** 会去核实).

`--config-dir` _`DIR`_

告诉 Subversion 从指定的目录中读取配置信息, 而不是从默认目录 (用户家目录里的 `.subversion`) 中读取.

`--config-option` _`CONFSPEC`_

在命令运行期间, 设置运行时配置选项的值. _`CONFSPEC`_ 是一个字符串, 指定了运行时 配置选项的名字空间, 选项名和选项值, 格式是 _`FILE`_:_`SECTION`_:_`OPTION`_\=\[_`VALUE`_\]. 其中, _`FILE`_ 和 _`SECTION`_ 分别是运行时配置文件 (`config` 或 `servers`) 和节, 它们包含了用户希望修改的选项. _`OPTION`_ 是选项名, _`VALUE`_ 是选项值 (如果有的话). 例如, 为了临时禁止 HTTP 压缩, 可以写成 `--config-option=servers:global:http-compression=no`. 选项 `--config-option` 可以在命令行上出现多次, 从而同时修改多个选项.

`--disable-locking`

告诉 **svnsync** 不要使用自己的互斥访问机制, 而是假定镜像仓库的互斥访问已经通过其他带外机制实现了.

`--no-auth-cache`

禁止在 Subversion 运行时配置目录中缓存认证信息 (例如用户名和密码).

`--non-interactive`

如果认证失败, 或者证书不充分, 将不再提示输入证书 (例如 用户名和密码). 如果在一个自动化运行的脚本中使用 Subversion, 那么这个选项就会很有用, 当遇到错误时, 更好的做法是立刻失败退出, 而不是请求输入更多的数据.

`--quiet` (`-q`)

只输出重要的信息.

`--revision` (`-r`) _`ARG`_

为 **svnsync copy-revprops** 指定版本号或 版本号范围.

`--source-password` _`PASSWD`_

指定源仓库的密码, 如果没有指定或者密码不正确, Subversion 在需要时会提示用户输入密码.

``--source-prop-encoding _`ARG`_``

告诉 **svnsync** 在源仓库发现的版本号属性, 如果它是可翻译的, 则假定属性使用的字符编码是 _`ARG`_, 把这些属性复制到镜像仓库时, 把字符编码转换成 UTF-8.

`--source-username` _`NAME`_

指定源仓库的用户名, 如果没有指定或用户名不正确, Subversion 在需要时会提示用户输入用户名.

`--steal-lock`

使得 **svnsync** 在必要时去窃取锁, 从而保证对 镜像仓库的互斥访问. (用户应该只在以下情况下才去使用该选项— 锁在镜像仓库中存在, 并且不再新鲜了, 即没有其他 **svnsync** 进程正在访问仓库.)

`--sync-password` _`PASSWD`_

指定镜像仓库的密码. 如果没有指定或者密码不正确, Subversion 在需要时会提示用户输入密码.

`--sync-username` _`NAME`_

指定镜像仓库的用户名, 如果没有指定或用户名不正确, Subversion 在需要时会提示用户输入用户名.

`--trust-server-cert`

和 `--non-interactive` 一起使用, 告诉 Subversion 接受任意一个未知的 SSL 服务器证书, 不要向用户提示.
