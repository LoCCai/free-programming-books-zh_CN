This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnserve — 通过 Subversion 定制化的网络协议向仓库提供网络访问服务.

## 大纲

``svnserve [-d | -i | -t | -X] _`OPTIONS`_...``

## 描述

**svnserve** 允许客户端使用 Subversion 定制化的 网络协议访问仓库.

**svnserve** 可以作为一个独立进程运行 (客户端 将使用 `svn://` 形式的 URL), 也可以在需要时通过 **inetd** 或 **xinetd** 调用 **svnserve** (此时客户端还是使用 `svn://`); 还可以在需要时通过 **sshd** 调用 **svnserve** (此时客户端用的是 `svn+ssh://` 形式的 URL).

除非添加了选项 `--config-file`, 否则的话一旦客户 端通过 URL 选择了一个仓库, **svnserve** 将从仓库目录 内的 `conf/svnserve.conf` 文件读取仓库的配置信息, 例如认证数据库文件的位置和授权策略. 关于 `svnserve.conf` 的详细信息, 见 [“svnserve, 一个定制化的服务器”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.svnserve.html "svnserve, 一个定制化的服务器").

## 选项

和前面介绍的命令有所不同, **svnserve** 没有子命令, 只有选项.

`--cache-fulltexts` _`ARG`_

开启或关闭文件内容的全文本缓存 (只支持以 FSFS 作为后端存储 的仓库).

`--cache-txdeltas` _`ARG`_

开启或关闭文件内容的差异缓存 (只支持以 FSFS 作为后端存储 的仓库).

`--compression` _`LEVEL`_

指定网络传输时的压缩级别, 在 0 到 9 之间. `9` 提供最大的压缩比, `5` 是默认值, `0` 将禁止压缩.

`--config-file` _`FILENAME`_

如果添加了该选项, **svnserve** 将在启动时 读取一次 `FILENAME`, 并把配置信息缓存到内存 中. 来自文件的密码和授权配置在 **svnserve** 收到 一个新的连接时, 都会从文件中读取一次. 指定该选项后, **svnserve** 将不会再去读取仓库目录内的 `conf/svnserve.conf`. 关于 `FILENAME` 的格式, 见 [“svnserve, 一个定制化的服务器”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.svnserve.html "svnserve, 一个定制化的服务器").

`--daemon` (`-d`)

使得 **svnserve** 以守护进程模式运行. **svnserve** 把自己放到后台运行, 接受从端口 3690 (默认端口) 到来的 TCP/IP 连接请求.

`--foreground`

和选项 `--daemon` (`-d`) 一起 使用时, **svnserve** 将保持在前台运行, 通常情况 下是为了调试.

`--inetd` (`-i`)

使用 **inetd** 模式, 在这种模式下 **svnserve** 将会被 **inetd** 调用运行.

`--help` (`-h`)

输出帮助信息.

`--listen-host` _`HOST`_

使得 **svnserve** 只接受来自 主机 _`HOST`_ 的请求, _`HOST`_ 可以是一个 IP 地址或主机名.

`--listen-once` (`-X`)

使得 **svnserve** 在服务完一次连接后就 退出, 这主要用于调试.

`--listen-port` _`PORT`_

当 **svnserve** 以守护进程模式运行时, 让它 监听端口 _`PORT`_. (如果是 FreeBSD 系统, 则 **svnserve** 默认只监听 tcp6 的端口, 加上该 选择后, **svnserve** 还会同时监听 tcp4 的端口)

`--log-file` _`FILENAME`_

告诉 **svnserve** 在必要时创建文件 _`FILENAME`_, 并把 Subversion 的 操作性日志输出到此文件中, 这些日志和 **mod\_dav\_svn** 所生成的日志属于同一类型. 更 多的信息见 [“高层日志记录”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.operational-logging.html "高层日志记录").

`--memory-cache-size` (`-M`) _`ARG`_

配置额外的内存缓存大小 (以 MB 为单位), 这些缓存用于减少 冗余操作, 默认值是 `16` (该选项只适用于以 FSFS 作为后端存储的仓库).

`--pid-file` _`FILENAME`_

告诉 **svnserve** 把进程 ID 写到文件 _`FILENAME`_ 里, 进程 **svnserve** 的用户必须对文件具有写权限.

`--prefer-ipv6` (`-6`)

在解析监听的主机名时, 优先使用 IPv6, 默认情况下是优先使用 IPv4.

`--quiet`

只输出与错误有关的信息.

`--root` (`-r`) _`ROOT`_

为仓库设置一个虚拟根目录, 设置后, 由客户端在 URL 中指定的 路径将被解释成相对于根目录的路径, 并且不能超出根目录所限定的 文件系统范围.

`--threads` (`-T`)

以守护进程模式运行时, 告诉 **svnserve** 为每一个连接创建一个线程, 而不是创建一个进程. 但是 **svnserve** 进程本身仍然会在启动时把自己放 到后台运行.

`--tunnel` (`-t`)

使得 **svnserve** 以隧道模式运行, 和 **inetd** 模式基本相同 (两种模式都是在 `stdin`/`stdout` 上为新 连接提供服务, 服务完成后退出), 唯一的不同点是在隧道模式下, 新连接会预先用当前 UID 的用户名进行认证. 如果 **svnserve** 运行在一个隧道代理 (例如 **ssh**) 之上, 那么客户端会自动添加该选项, 也 就是说用户几乎不用亲自为 **svnserve** 添加选项 `--tunnel` (`-t`). 如果你发现自己 自己在命令行输入了 `svnserve --tunnel`, 并且想 知道接下来该做什么, 见 [“SSH 隧道”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.svnserve.html#svn.serverconfig.svnserve.sshauth "SSH 隧道").

`--tunnel-user` _`NAME`_

该选项和 `--tunnel` (`-t`) 一起使用, 告诉 **svnserve** 使用用户 _`NAME`_ 作为认证用户, 而不是进程 **svnserve** 的用户. 如果管理员希望共享同一 SSH 系统账户, 而且单独管理提交用户的身份, 那么这个选项就会很 有用.

`--version`

显示版本信息, 以及支持的后端存储模块.
