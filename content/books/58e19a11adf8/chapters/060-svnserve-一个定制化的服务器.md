This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

**svnserve** 是一个轻量级的服务器程序, 基于 TCP/IP, 使用 一种定制化的, 有状态的协议与客户端通信, 客户端使用 `svn://` 或 `svn+ssh://` 形式的 URL 访问 **svnserve** 服务器. 本节介绍运行 **svnserve** 的多种方式, 服务器如何认证客户端, 以及如何为 仓库配置合适的访问权限.

### 调用服务器

运行程序 **svnserve** 有以下几种方式:

-   作为一个独立的守护进程运行 **svnserve**, 运行 过程中监听请求.
    
-   如果在特定的端口接收到了一个新请求, 就让 Unix 守护进程 **inetd** 临时派生 **svnserve**.
    
-   使用 SSH, 在加密的通道上调用一个临时的 **svnserve**.
    
-   作为 Microsoft Windows 服务, 运行 **svnserve**.
    
-   作为一个 launchd 作业, 运行 **svnserve**.
    

下面的几个小节详细介绍这些不同的 **svnserve** 部署方式.

#### svnserve 作为守护进程

最简单的方式, 就是把 **svnserve** 作为一个守护进程 运行, 执行时需要添加选项 `-d`:

$ svnserve -d
$               # svnserve is now running, listening on port 3690

以守护进程模式运行 **svnserve** 时, 可以使用 选项 `--listen-port` 和 `--listen-host` 修改进程所 “绑定” 的端口号和主机名.

**svnserve** 一旦成功启动, 服务器上的所有仓库 都能通过网络进行访问. 如果客户端需要访问仓库, 必须在仓库的 URL 参数中指定一个 _绝对_ 路径. 比如说某个仓库在 服务器上的位置是 `/var/svn/project1`, 那么客户 端访问仓库的 URL 参数就可以写成 `svn://host.example.com/var/svn/project1`. 为了增加安全 性, 可以为 **svnserve** 添加选项 `-r`, 使得只有指定路径下的仓库才会被导出, 例如:

$ svnserve -d -r /var/svn
…

使用选项 `-r` 等价于修改了 **svnserve** 的根目录, 客户端访问仓库的所使用的 URL 也能写得更加简短:

$ svn checkout svn://host.example.com/project1
…

#### 由 inetd 调用 svnserve

如果管理员希望由 **inetd** 启动进程, 就给 **svnserve** 添加选项 `-i` (`--inetd`). 在下面的例子里, 我们展示了在命令行上 执行 `svnserve -i` 的输出, 但要注意的是命令实际 上并没有启动进程; 例子后面的内容介绍了如何配置 **inetd**, 使得它能够启动 **svnserve**.

$ svnserve -i
( success ( 2 2 ( ) ( edit-pipeline svndiff1 absent-entries commit-revprops d\\
epth log-revprops atomic-revprops partial-replay ) ) )

如果使用选项 `--inetd` 调用 **svnserve**, 它会尝试使用定制化的协议, 通过 `stdin` 和 `stdout` 与 Subversion 通信, 这是由 **inetd** 所启动的程序的标准 行为. IANA 将端口 3690 保留给 Subversion 使用, 所以说在一个类 Unix 系统上, 管理员可以安全地在 `/etc/services` 中添 加以下内容 (如果原来没有的话):

svn           3690/tcp   # Subversion
svn           3690/udp   # Subversion

如果服务器使用的是经典的类 Unix **inetd** 守护 进程, 就在 `/etc/inetd.conf` 添加下面这一行:

svn stream tcp nowait svnowner /usr/bin/svnserve svnserve -i

确保用户 “svnowner” 对仓库具有适当的访问权限. 现在, 当客户在端口 3690 上连接服务服务器时, **inetd** 就会派生出一个 **svnserve**, 负责处理客户端发来的 请求. 当然, 管理员也可以在配置文件里为 **svnserve** 添加选项 `-r`, 从而限制被导出的仓库.

#### 由 xinetd 调用 svnserve

某些系统提供了 **xinetd** 作为 **inetd** 的替代品, 幸运的是, 管理员也可以配置 **svnserve** 由 **xinetd** 启动. 为了实现这点, 管理员创建一个配置 文件 **/etc/xinetd.d/svn**, 文件的内容是:

\# default: on
# description: Subversion server for the svn protocol
service svn
{
  disabled        = no
  port            = 3690
  socket\_type     = stream
  protocol        = tcp
  wait            = no
  user            = subversion
  server          = /usr/local/bin/svnserve
  server\_args     = -i -r _`/path/to/repositories`_
}

要确保 `/etc/services` 包含了 `svn` 协议所使用的端口 (见 [“由 inetd 调用 svnserve”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.svnserve.html#svn.serverconfig.svnserve.invoking.inetd "由 inetd 调用 svnserve")), 否则的话, 守护进程将无法正常启动.

如果是基于 Redhat 的 Linux 发行版, 管理员需要使用 **chkconfig --add svn** 激活新的服务, 后面就可以用图 形化配置工具禁止或允许服务器程序.

#### 基于隧道的 svnserve

另一种启动方式是通过添加选项 `-t`, 以隧道模式启动 **svnserve**. 隧道模式假设有一个远程服务程序 (例如 **rsh** 或 **ssh** 已经成功地授权了 一个用户, 并且以该 _用户的身份_ 启动了一个私有 的 **svnserve** 进程. (用户几乎没有必要在命令行 启动带有选项 `-t` 的 **svnserve**, 相反, SSH 守护进程会替用户执行这个操作) 程序 **svnserve** 像往常一样运行 (通过 `stdin` 和 `stdout` 与其他 进程通信), 它还假设网络数据可以通过某种隧道, 被自动重定向回客户端. 当隧道代理 以这种方式启动 **svnserve** 时, 要确保被授权的用户 对仓库数据库文件具有读写权限, 在本质上它和本地用户通过 `file://` URL 访问仓库的情况是一样的.

更多的细节见 [“SSH 隧道”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.svnserve.html#svn.serverconfig.svnserve.sshauth "SSH 隧道").

#### svnserve 作为 Windows 服务

如果服务器所用的 Windows 系统是 Windows NT 的后代 (Windows 2000 或 更新的版本), 管理员就能把 **svnserve** 作为一个标准 的 Windows 服务启动, 和独立的守护进程启动方式 (添加选项 `--daemon` (`-d`)) 相比, 这通常能带 来更好的体验. 为了以守护进程的方式启动 **svnserve**, 我们需要打开一个控制台, 输入命令, 然后任由控制台永远地运行下去. 然而, 在后台运行的 Windows 服务可以在系统引导时自动启动, 可以使用和其他 Windows 服务一样的管理接口来启动或停止服务.

为了定义一个新的 Windows 服务, 需要用到命令行工具 **SC.EXE**. 类似于 **inetd** 的配置 文件, 管理员必须准确地指定 **svnserve** 的启动方式, 以便 Windows 在开机时启动相应的服务:

C:\\> sc create svn
        binpath= "C:\\svn\\bin\\svnserve.exe --service -r C:\\repos"
        displayname= "Subversion Server"
        depend= Tcpip
        start= auto

上面的命令行定义了一个新的, 名为 `svn` 的 Windows 服务, 当服务启动时, 它将执行程序 **svnserve.exe**. 在这个例子里有很多需要注意的地方.

首先, 启动 **svnserve.exe** 时必须带上参数 `--service`, 其他选项必须出现在同一行, 不能再添加 会引起冲突的选项, 例如 `--daemon` (`-d`), `--tunnel` 或 `--inetd` (`-i`), 但可以添加选项 `-r` 或 `--listen-port`. 第二, 注意命令行里的空格: 模式 `key= value` 中, `key` 和 `=` 之间不能有空格, 而 `key=` 和 `value` 之间有且仅有 一个空格. 最后, 要注意被调用的命令行里的空格. 如果目录名含有空格 (或其他需要转义的字符), 就把 `binpath` 内的路径 包裹在一对双引号中, 但要对双引号进行转义:

C:\\> sc create svn
        binpath= "\\"C:\\program files\\svn\\bin\\svnserve.exe\\" --service -r C:\\repos"
        displayname= "Subversion Server"
        depend= Tcpip
        start= auto

还要注意 `binpath` 容易让人产生误解— 它的值是一个 _命令行_, 而不是可执行文件的路径. 因此, 如果它的值含有内嵌的空格, 就要用双引号包围起来.

服务定义完成后, 可以使用标准的 GUI 工具 (服务管理控制面板) 来 停止, 启动或查询服务, 也要以使用命令行工具:

C:\\> net stop svn
C:\\> net start svn

服务还能被卸载, 方法是删除它的定义: **`sc delete svn`**, 但在这之前记得先停止服务! 程序 **SC.EXE** 还有很多子命令和选项, 执行 **`sc /?`** 查看完整的命令帮助信息.

#### svnserve 作为 launchd 作业

Mac OS X (10.4 及更新的版本) 使用 **launchd**, 在 系统范围和用户范围内管理进程 (包括守护进程). 一个 **launchd** 由 XML 文件内的参数指定, 命令 **launchctl** 用于管理作业的生命周期.

如果 **svnserve** 被配置成作为一个 **launchd** 作业, 那么当有 `svn://` 网络流量需要处理时, 将自动启动 **svnserve**. 这要比 手动地启动 **svnserve** 并把它作为长时间运行的后台 进程要方便得多.

为了把 **svnserve** 配置成一个 **launchd** 作业, 首先创建一个名为 `/Library/LaunchDaemons/org.apache.subversion.svnserve.plist` 的作业定义文件, [例 6.1 “svnserve 的 launchd 作业定义的一个示例”](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.svnserve.html#svn.serverconfig.svnserve.invoking.launchd.ex-1 "例 6.1. svnserve 的 launchd 作业定义的一个示例") 展示 了该文件的一个例子.

**例 6.1. svnserve 的 launchd 作业定义的一个示例**

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
    "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>Label</key>
        <string>org.apache.subversion.svnserve</string>
        <key>ServiceDescription</key>
        <string>Host Subversion repositories using svn:// scheme</string>
        <key>ProgramArguments</key>
        <array>
            <string>/usr/bin/svnserve</string>
            <string>--inetd</string>
            <string>--root=/var/svn</string>
        </array>
        <key>UserName</key>
        <string>svn</string>
        <key>GroupName</key>
        <string>svn</string>
        <key>inetdCompatibility</key>
        <dict>
            <key>Wait</key>
            <false/>
        </dict>
        <key>Sockets</key>
        <dict>
            <key>Listeners</key>
            <array>
                <dict>
                    <key>SockServiceName</key>
                    <string>svn</string>
                    <key>Bonjour</key>
                    <true/>
                </dict>
            </array>
        </dict>
    </dict>
</plist>

  

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p><span><strong>launchd</strong></span> 系统学习起来有一定的困难, 幸运的是 本节所介绍的 <span><strong>launchd</strong></span> 命令都有相关的文档可供 参考, 例如执行 <strong><code>man launchd</code></strong> 查看 <span><strong>launchd</strong></span> 的手册页, 执行 <strong><code>man launchd.plist</code></strong> 查看作业定义文件的格式.</p></td></tr></tbody></table>

作业定义文件创建完毕后, 就可以用 **launchctl load** 激活作业:

$ sudo launchctl load \\
       -w /Library/LaunchDaemons/org.apache.subversion.svnserve.plist

需要澄清的是, 上面的命令并没有启动 **svnserve**, 它只是告诉 **launchd** 当网络端口 `svn` 有网络数据到达时如何启动 **svnserve**, 当网络数据处理完毕后, **svnserve** 进程就会终止.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>因为我们希望 <span><strong>svnserve</strong></span> 成为整个系统范围内 的守护进程, 所以要用 <span><strong>sudo</strong></span> 命令, 作为系统管理员 去管理作业. 定义文件内的 <code>UserName</code> 和 <code>GroupName</code> 是可选的—如果忽略它们, 作业的 所有者将是加载该作业的用户.</p></td></tr></tbody></table>

禁用作业的方法也很简单—使用 **launchctl unload**:

$ sudo launchctl unload \\
       -w /Library/LaunchDaemons/org.apache.subversion.svnserve.plist

**launchctl** 也提供了查询作业状态的命令, 如果 作业已加载, 那么作业定义文件中, `Label` 所指定的 内容将会出现在命令的输出中:

$ sudo launchctl list | grep org.apache.subversion.svnserve
-       0       org.apache.subversion.svnserve
$

### 内建的认证与授权

当客户端连接到 **svnserve** 进程时, 将会发生以下事件:

-   客户端选择一个特定的仓库.
    
-   服务器读取仓库的 `conf/svnserve.conf`, 施加文件所描述的认证与授权策略.
    
-   取决于具体的策略, 可能会发生下面几件事中的一件:
    
    -   允许客户端以匿名的方式提出请求, 不会收到任何认证要求.
        
    -   客户端可能在任意时刻收到认证要求.
        
    -   如果操作是在隧道模式下进行, 客户端将声明它已经在外部认证 过了 (通常是 SSH).
        
    

默认情况下, **svnserve** 只知道如何发送一个 CRAM-MD5[\[57\]](#ftn.id8416) 授权请求, 在本质上, 就是服务器向客户端发送了一小段数据. 客户端使用 MD5 散列算法 为数据和密码的混合物创建指纹, 然后发送该指纹, 作为认证请求的响应. 服 务器对存放在本地的密码进行同样的计算, 以验证它们是否相同. _在 任何情况下都不会在网络上传输明文密码_.

如果 **svnserve** 支持 SASL, 除了知道如何发送 CRAM-MD5 请求外, **svnserve** 还能使用其他几种认证 机制, 本章后面的 [“svnserve 使用 SASL”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.svnserve.html#svn.serverconfig.svnserve.sasl "svnserve 使用 SASL") 将会介绍如何配置 SASL 认证和加密.

当然, 客户端也可以通过一个隧道代理 (例如 **ssh**), 实现外部认证. 在这种情况下, 服务器只是简单地检查自己的用户身份, 然后 使用该用户名作为已认证的用户. 更多的相关内容, 见 [“SSH 隧道”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.svnserve.html#svn.serverconfig.svnserve.sshauth "SSH 隧道").

读者可能已经猜到了, 仓库里的 `svnserve.conf` 正是控制认证和授权策略的关键. 当它和本节所描述的其他附加文件配合工作 时, `svnserve.conf` 向管理员提供了用于控制用户认证 和授权策略的完整方案. 我们将要讨论的每个文件所使用的格式, 与其他配置 文件的格式相同 (见 [“运行时配置区域”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.confarea.html "运行时配置区域")): 节名用一对方括号标记 (`[` 和 `]`), 注释由井号 (`#`) 开始, 每一节都包含了可被赋值的特定变量 (`variable = value`). 下面介绍各个文件并学习如何 使用它们.

#### 创建一个用户文件和认证域

现在, 你所需要的所有变量都在 `svnserve.conf` 的 `[general]` 部分. 先从修改这些变量的值开始: 为存放用户名和密码的文件选择一个名字, 以及选择一个认证域:

\[general\]
password-db = userfile
realm = example realm

`realm` 的值是你自己定义的一个名字, 它告诉 客户端它们正在连接的是哪一个 “认证空间”; Subversion 客户端在认证的提示信息里显示 `realm` 的值, 并 用它 (再加上服务器的主机名和端口号) 作为缓存在磁盘上的证书的键 (见 [“缓存证书”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.netmodel.html#svn.serverconfig.netmodel.credcache "缓存证书")). 变量 `password-db` 指向一个单独的文件, 它包含了 一连串的用户名和密码, 文件的格式和 `svnserve.conf` 是相同的, 例如:

\[users\]
harry = foopassword
sally = barpassword

变量 `password-db` 的值可以是指向用户文件 的绝对路径或相对路径, 管理员很容易就能把用户文件设置到仓库的 `conf/` 目录内, 和 `svnserve.conf` 放在一起. 另外, 多个仓库还能 共享同一个用户文件, 在这种情况下, 文件应该放在更加开放的位置. 共享同一用户文件的仓库还要配置相同的认证域, 因为用户名列表在本质上 就已经定义了一个认证域. 无论用户文件放在何处, 都要设置好它的 读写权限. 如果管理员知道 **svnserve** 将以哪些用户 身份运行, 在必要时可限制用户文件的读取权限.

#### 设置访问控制

还有两个变量可以在 `svnserve.conf` 里设置: 它们决定了未验证 (匿名) 的用户和已验证的用户可以做哪些事情. 变量 `anon-access` 和 `auth-access` 可被设置的值有 `none`, `read` 和 `write`. 设置为 `none` 将 禁止读和写; `read` 允许以只读方式访问仓库; `write` 允许对仓库进行完全的读写访问. 例如:

\[general\]
password-db = userfile
realm = example realm

# anonymous users can only read the repository
anon-access = read

# authenticated users can both read and write
auth-access = write

例子所展示的其实就是变量的默认值, 以免管理员忘记设置它们. 如 果管理员需要更加保守的设置, 可以完全禁止匿名访问:

\[general\]
password-db = userfile
realm = example realm

# anonymous users aren't allowed
anon-access = none

# authenticated users can both read and write
auth-access = write

服务器进程不仅可以理解施加到仓库上的全局的访问控制, 还能理解 施加到文件或目录上的更细粒度的访问控制. 为了利用后者, 管理员创建一 个文件, 文件包含了更细致的规则, 然后让变量 `authz-db` 指向该文件:

\[general\]
password-db = userfile
realm = example realm

# Specific access rules for specific locations
authz-db = authzfile

我们在 [“基于路径的授权”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.pathbasedauthz.html "基于路径的授权") 详细 介绍 `authzfile` 的语法. 注意, 变量 `authz-db` 与 `anon-access`, `auth-access` 并非互不相容, 如果同时定义了这三个 变量, 则只有在 _所有_ 规则都被满足的情况下, 才能允许访问.

### svnserve 使用 SASL

对于许多团队而言, 使用 **svnserve** 内建的 CRAM-MD5 认证就已足够. 然而, 如果服务器和 Subversion 客户端支持 SASL (Cyrus Simple Authentication and Security Layer) 函数库, 那么管理员就有了 大量的认证和加密选项可供选择.

正常情况下, 当 Subversion 客户端连接到 **svnserve** 时, 服务器以宣告它所支持的功能作为响应. 如果服务器的配置要求认证, 服务器将向客户端发起认证请求, 并列出它所支持的认证机制, 客户端从中选择 一种认证机制, 通过几个往返消息携带认证信息. 即使 SASL 不可用, 客户端 和服务器也能使用内建的 CRAM-MD5 和 ANONYMOUS 认证机制 (见 [“内建的认证与授权”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.svnserve.html#svn.serverconfig.svnserve.auth "内建的认证与授权")). 如果服务器和客户端 支持 SASL, 那么可供选择的认证机制就比较多, 但是管理员必须在服务器 端显式地配置 SASL, 服务端才能向客户端宣告这些认证机制是可用的.

#### 使用 SASL 进行认证

为了在服务器上激活 SASL, 管理员要做两件事. 首先, 在仓库的 `svnserve.conf` 里创建 `[sasl]` 节, 并为变量 `use-sasl` 赋值:

\[sasl\]
use-sasl = true

然后, 在 SASL 库函数能够找到的位置创建一个名为 `svn.conf` 的配置文件—最典型的位置就是 SASL 插件所处的位置, 因此管理员需要定位 SASL 插件在系统中的位置, 例如 `/usr/lib/sasl2/` 或 `/etc/sasl2/`. (注意, 本段所说的配置文件是 `svn.conf`, 不是仓库中的 `svnserve.conf`!).

如果服务器的系统是 Windows, 你需要编辑系统注册表 (使用工具 **regedit**), 以便告诉 SASL 去哪里搜索所需要的 文件. 在系统注册表中添加一个新的注册表项, 表项的名字是 `[HKEY_LOCAL_MACHINE\SOFTWARE\CarnegieMellon\Project Cyrus\SASL Library]`, 并在其中新增两项: 一项是 `SearchPath` (它的值是一个 指向目录的路径, 目录包含了 SASL 动态链接库), 另一项是 `ConfFile` (它的值是一个指向目录的路径, 目录内含有 管理员创建的 `svn.conf` 文件).

因为 SASL 提供了多种不同的认证机制, 描述每一种可能的服务器端 配置是不切实际的 (而且也超出了本书的范围), 所以我们建议读者自己去 阅读 SASL 源代码目录内, `doc` 子目录内的文档, 文档详细介绍了每一种认证机制, 以及如何正确地配置服务器, 以便使用 这些认证机制. 为了方便讨论, 我们将介绍一个配置 DIGEST-MD5 的简单 示例. 如果你的 `svn.conf` 含有以下内容:

pwcheck\_method: auxprop
auxprop\_plugin: sasldb
sasldb\_path: /etc/my\_sasldb
mech\_list: DIGEST-MD5

上面的配置向客户端宣告了 DIGEST-MD5 认证机制, 使用存放在 `/etc/my_sasldb` 里的私有密码数据库检查用户 输入的密码的正确性. 管理员可以使用 **saslpasswd2** 向密码数据库添加或修改用户名和密码:

$ saslpasswd2 -c -f /etc/my\_sasldb -u realm username

有些地方需要注意: 首先要确保 **saslpasswd2** 的 “认证域” 参数和定义在 `svnserve.conf` 里的认证域是一致的, 如果它们不一致, 认证将会失败. 另外, 受限于 SASL, 认证域必须是不带空格的字符串. 最后, 如果你决定使用标准的 SASL 密码数据 库, 需要确保进程 **svnserve** 对数据库文件具有读 权限 (某些认证机制—例如 OTP—还会要求写权限).

这只是一种配置 SASL 的简单方式. 还有其他多种认证机制可供选择, 密码也能以其他格式存在, 例如 LDAP 或 SQL 数据库, 具体的细节请参考 SASL 文档.

注意, 如果管理员将服务器配置成仅允许使用 SASL 认证机制, 这同时 也在要求所有连接到服务器的客户端必须支持 SASL, 不支持 SASL 的客户 端 (包括 1.5 版之前的所有客户端) 将无法完成认证, 但是另一个方面, 这种配置也正是你所想要的效果 (“所有的客户端都必须使用 Kerberos!”). 然而, 如果仍然存在不支持 SASL 的客户端需要 连接服务器, 就要确保 CRAM-MD5 认证机制是可用的, 因为所有的客户端 都支持 CRAM-MD5.

#### SASL 加密

如果特定的机制支持, 那么 SASL 也能实现数据加密. 内建的 CRAM-MD5 不支持加密, 但 DIGEST-MD5 支持, 有些机制 (例如 SRP) 还会用到 OpenSSL 函数库. 为了开启或禁止加密的不同级别, 你需要在仓库的 `svnserve.conf` 里定义两个值:

\[sasl\]
use-sasl = true
min-encryption = 128
max-encryption = 256

变量 `min-encryption` 和 `max-encryption` 决定加密的级别. 为了完全禁止加密, 就把两个变量都设为 0. 为了开启简单的数据检验 (即防止数据被篡改, 保证数据的完整性, 但没有对数据进行加密), 把两个变量都设为 1. 如果 管理员希望允许—但并非强制—加密, 就把 `min-encryption` 设为 0, 把 `max-encryption` 设为稍微大点的值. 为了强制要求 对数据进行加密, 把两个变量都设为大于 1 的数. 在上面的例子里, 我们 要求客户端的加密至少为 128 位, 但不多于 256 位.

### SSH 隧道

**svnserve** 内建的认证机制 (和 SASL) 使用起来 非常方便, 因为它避免了创建真正的系统账户. 但另一方面, 管理员可能 已经建立了一套完善的 SSH 认证框架, 项目所有的开发人员都拥有自己的 系统账户, 而且能够通过 SSH 登录到服务器.

结合使用 SSH 和 **svnserve** 比较简单, 客户端只要 用 `svn+ssh://` 形式的 URL 连接服务器即可:

$ whoami
harry

$ svn list svn+ssh://host.example.com/repos/project
harryssh@host.example.com's password:  \*\*\*\*\*

foo
bar
baz
…

在上面的例子里, Subversion 客户端唤起一个本地的 **ssh** 进程, 连接到 `host.example.com`, 作为用户 `harryssh` (根据 SSH 用户配置) 进行认证, 然后在远程的服务器中, 以用户 `harryssh` 的身份派生 一个私有的 **svnserve** 进程. 命令 **svnserve** 在隧道模式 (`-t`) 下执行, 它的网络协议行走在由 **ssh**—隧道代理—提供 的加密通道中. 如果客户端执行一个提交操作, 认证过的用户名 `harryssh` 将作为新版本号的作者.

这里需要强调的一点是 Subversion 客户端 _并没有_ 连接到运行着的 **svnserve** 守护进程, 这种访问方式不 要求 **svnserve** 守护进程存在, 即使存在也不会被注意 到. 它完全依赖 **ssh** 临时派生的 **svnserve** 进程, 当网络连接关闭时, **svnserve** 进程就会终止.

当使用 `svn+ssh://` URL 访问仓库时, 要记住提出 认证要求的程序是 **ssh**, 而 _不是_ 客户端程序 **svn**, 这就意味着不会出现密码缓存 (见 [“缓存证书”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.netmodel.html#svn.serverconfig.netmodel.credcache "缓存证书")). Subversion 客户端经常向仓库发起多个连接, 由于密码缓存, 用户通常不会注意到这点, 然而, 当用户使用 `svn+ssh://` 连接仓库时, 客户端每发起 一次连接, **ssh** 都会要求用户输入密码, 用户可能会对 此感到恼怒. 解决问题的办法是使用一个单独的 SSH 密码缓存工具, 例如 类 Unix 系统中的 **ssh-agent**, 或 Windows 系统中的 **pageant**.

在隧道模式下操作时, 授权主要由仓库数据文件的操作系统权限控制, 这和 Harry 使用 `file://` 直接访问仓库的情形基本 一致. 如果有多个系统用户会直接访问仓库, 管理员可能想把他们都放到 一个用户组里, 同时还要注意文件模式创建屏蔽字 (记得阅读本章后面的 [“支持多种仓库访问方法”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.multimethod.html "支持多种仓库访问方法")). 即使在隧道模式下, 你也可以使用 **svnserve.conf** 屏蔽特定的访问方式, 只需要设置 `auth-access = read` 或 `auth-access = none`.[\[58\]](#ftn.id8590)

读者可能以为关于 SSH 隧道的内容就此结束, 然而并没有. Subversion 允许用户在运行时配置文件 `config` (见 [“运行时配置区域”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.confarea.html "运行时配置区域")) 里创建定制化的隧道行为. 例如使用 RSH, 而不是 SSH, [\[59\]](#ftn.id8600) 具体的配置方式是在 `config` 的 `[tunnels]` 节添加如 下内容:

\[tunnels\]
rsh = rsh --

现在, 为了使用新的隧道配置, 把访问仓库的 URL 模式更改为 `svn+rsh://`, 例如 `svn+rsh://host/path`, 此时 Subversion 客户端相当于 在执行 **`rsh -- host svnserve -t`**. 如果用户在 URL 中包含了用户名 (例如 `svn+rsh://username@host/path`, 则客户端也会在待执行的命令中包含用户名 (**`rsh -- username@host svnserve -t`**).

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p>注意, 在定义基于 RSH 的隧道时, 我们在隧道命令行添加了选项结束 参数 <code>--</code>, 这是为了避免把一个错误的主机名当成隧道 命令的另一个选项, 使用其他隧道程序时也要考虑这个问题 (例如 SSH).</p></td></tr></tbody></table>

不过, 你也可以定义更加灵活的隧道方案:

\[tunnels\]
joessh = $JOESSH /opt/alternate/ssh -p 29934 --

这个例子有两点需要说明, 首先它展示了 Subversion 客户端如何启动 一个特定的隧道程序 (例子里是 `/opt/alternate/ssh`), 并带有特定的选项. 此时, 访问 URL `svn+joessh` 将启动 一个特定的 SSH 程序, 并带有参数 `-p 29934`—如果 你希望隧道程序连接到一个非标准的端口, 那么这种方法就比较方便.

第二, 例子展示了如何使用环境变量去覆盖隧道程序的名字. 通过设置 环境变量 `SVN_SSH` 来覆盖默认的 SSH 隧道代理是一种 方便的做法, 但是如果你希望不同的服务器使用不同的变量覆盖, 甚至在连接 每个服务器时, 其端口和选项也不尽相同, 这时候就要用到本例所介绍的方法. 如果用户设置了环境变量 `JOESSH`, 它的值将会覆盖掉 变量 `joessh` 原来的值—Subversion 客户端将会 执行 **$JOESSH**, 而不是 **`/opt/alternate/ssh -p 29934`**.

### SSH 配置技巧

除了可以控制客户端执行 **ssh** 的方式外, 还能 控制服务器上的 **sshd** 的行为. 本节我们将介绍如何 控制由 **sshd** 启动的 **svnserve**, 以及多个用户如何共享一个系统账号.

#### 初始化设置

首先, 先确定你将用来启动 **svnserve** 的账户 的家目录. 确保账户已经安装了 SSH 公钥与私钥, 并且用户可通过公钥 认证进行登录. 密码认证将无法工作, 因此下面将要介绍的 SSH 技巧 全都是在围绕 SSH `authorized_keys` 文件.

如果 `authorized_keys` 事先不存在, 直接创建 即可 (在 Unix 系统中, 它的典型位置是 `~/.ssh/authorized_keys` ). 文件的每一行都描述了一个允许连接的公钥, 行的典型样式为:

  ssh-dsa AAAABtce9euch… user@example.com

第一列描述密钥的类型, 第二列是 base64 编码的密钥, 第三列是注释. 除了这三列, 其实还可以添加一个 `command` 字段:

  command="program" ssh-dsa AAAABtce9euch… user@example.com

如果含有 `command` 字段, SSH 守护进程将会执行 该字段所指定的程序, 而不是 Subversion 客户端所请求的以隧道模式 启动的 **svnserve**. 这种行为允许我们实现多种服务器 端技巧, 在下面的例子里, 我们把 `authorized_keys` 的每一行简写为:

  command="program" TYPE KEY COMMENT

#### 控制被调用的命令

因为我们可以指定在服务器端被执行的命令, 所以很容易就能指定 一个特殊的 **svnserve** 程序, 并给它传递额外的参数:

  command="/path/to/svnserve -t -r /virtual/root" TYPE KEY COMMENT

在上面的例子里, `/path/to/svnserve` 可能是 一个定制化的 **svnserve** 包装脚本, 脚本将会重新 设置文件权限掩码 (见 [“支持多种仓库访问方法”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.multimethod.html "支持多种仓库访问方法")). 例子还展示了如何修改 **svnserve** 的文件系统根目录, 当以守护进程方式运行 **svnserve** 时, 修改进程的根 目录是很常见的操作, 这么做可以是为了限制用户对系统目录空间的访问, 也可以是为了在输入 `svn+ssh://` URL 的路径参数时, 减少用户打字的工作量.

多个用户共享同一个账户也是有可能的, 方法是为每一个用户生成一对 公钥与私钥, 然后把每个公钥的内容都写入文件 `authorized_keys` 内, 每行一个, 并使用选项 `--tunnel-user`:

  command="svnserve -t --tunnel-user=harry" TYPE1 KEY1 harry@example.com
  command="svnserve -t --tunnel-user=sally" TYPE2 KEY2 sally@example.com

上面的例子允许 Harry 和 Sally 使用相同的账户, 通过各自的公钥 认证来连接服务器. 每一行都指定了一条待执行的命令, 选项 `--tunnel-user` 告诉 **svnserve** 它的参数是已认证的用户, 如果没有加上 `--tunnel-user`, 那么 **svnserve** 会认为所有的提交都来自被共享的 账户.

最后一点需要提醒的是: 如果一个用户可通过共享账户的公钥访问 服务器, 即使在 `authorized_keys` 里设置了 `command`, 也可能仍然允许其他形式的 SSH 访问. 例如 用户仍然能够通过 SSH 获取 shell 访问权限, 或者 X11 窗口, 或者一般 性的端口转发. 为了使用户的权限尽可能得小, 在 `command` 后面添加一些限制选项:

  command="svnserve -t --tunnel-user=harry",no-port-forwarding,no-agent-forw
arding,no-X11-forwarding,no-pty TYPE1 KEY1 harry@example.com

注意上面的内容必须写在同一行内, 因为 `authorized_keys` 不支持通过反斜杠来实现行的 延续, 例子里的换行只是为了方便排版.

### svnserve 配置参考

上一节提到了 `svnserve.conf` 支持的众多选项, 利用这些选项, 当用户通过 **svnserve** 服务器访问 Subversion 时, 管理员就能够实现对 Subversion 行为的控制. 本节将对 **svnserve** 支持的 _所有_ 选项 进行一个总结.

配置文件 `svnserve.conf` 的格式是典型的 INI 风格, 选项是一对 名字/值, 通过带名字的节进行分组. (这种格式和 Subversion 客户端的运行时配置所使用的格式相同.) 这里将会介绍配置 文件里的每一节, 及其支持的各个选项.

默认情况下, **svnserve** 会查阅每个仓库的 `conf/svnserve.conf`, 为了让一个 **svnserve** 的运行实例访问到的所有仓库都使用同一个 配置文件, 就给它添加选项 `--config-file`.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>在下面的几节里, 我们将使用正式名称 <code>svnserve.conf</code> 指代 <span><strong>svnserve</strong></span> 配置文件, 实际上配置文件还可以取其他名字, 但我们相信读者不会感到 迷惑.</p></td></tr></tbody></table>

#### 通用配置

`[general]` 节包含了最常用到的 **svnserve** 配置选项.

`anon-access`

控制未认证的 (匿名的) 用户的访问权限, 有效值包括 `write`, `read`, 和 `none`, 其中 `read` 是 默认值.

`auth-access`

控制已认证的用户的访问权限, 有效值包括 `write`, `read` 和 `none`, 其中 `write` 是 默认值.

`authz-db`

指定仓库访问权限配置文件的路径 (见 [“基于路径的访问控制”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.pathbasedauthz.html#svn.serverconfig.pathbasedauthz.getting-started "基于路径的访问控制")). 如果是一个普通的本地路径, 除非路径以正斜杠 (`/`) 开始, 否则的话路径就看成是相对于包含 了 `svnserve.conf` 的目录的相对路径. 如果没 有指定路径, 将禁止基于路径的访问权限控制.

作为一种特殊的情况, 可以把 Subversion 仓库内的文件指定为 访问权限配置文件, 使用本地 URL (以 `file://` 开始) 指定文件的位置. 另外, 还可以用相对的仓库 URL (以 `^/` 开始), 使得 **svnserve** 根据相对 URL 访问仓库内的访问权限配置文件.

`force-username-case`

在和访问权限配置文件 (由选项 `authz-db` 指定) 里的规则比较之前, 指定用户名的大小写形式, 有效值包括 `upper` (用户名的大小写形式), `lower` (用户名的小写形式) 和 `none` (不改变用户名的大小写形式). 默认情况下, **svnserve** 不改变用户名的大小写形式.

`groups-db`

指定组文件的路径. 如果是一个普通的本地路径, 除非路径以正 斜杠 (`/`) 开始, 否则的话路径就看成是相对于 包含了 `svnserve.conf` 的目录的相对路径.

还可以把 Subversion 仓库内的文件指定为组文件. 使用本地 URL (以 `file://` 开始) 指定文件的位置. 另外, 还可以用相对的仓库 URL (以 `^/` 开始), 使得 **svnserve** 根据相对 URL 访问仓库内的组文件.

`hooks-env`

指定钩子脚本环境配置文件的路径. 该选项覆盖了文件在每个 仓库内的默认位置, 如果写成绝对路径, 就可以用同一个文件为多个 仓库的钩子脚本环境进行配置. 除非写成绝对路径, 否则的话就看成 是相对于包含了 `svnserve.conf` 的目录的 相对路径.

关于钩子环境配置文件的更多信息, 见 [“钩子脚本环境配置”一节](https://svnbook.red-bean.com/nightly/zh/svn.reposadmin.create.html#svn.reposadmin.hooks.configuration "钩子脚本环境配置").

`password-db`

指定密码文件的路径. 除非路径以正 斜杠 (`/`) 开始, 否则的话路径就看成是相对于 包含了 `svnserve.conf` 的目录的相对路径. 注意, 如果使用了 SASL 特性, 则该选项将被忽略.

`realm`

指定仓库的认证域. 该选项主要被客户端使用, 用来关联缓存的 认证证书和特定的某个或某些仓库, 正因为如此, 除非多个仓库使用 了相同的密码数据库, 否则的话, 最好把每个仓库的认证域都设置 成独一无二的值. 仓库认证域的默认值是它的 UUID.

#### Cyrus SASL 配置

`[sasl]` 节包含了专门针对 **svnserve** 可选特性 SASL (Cyrus Simple Authentication and Security Layer) 的配置, 关于 SASL 更详细的信息 以及它的益处, 见 [“svnserve 使用 SASL”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.svnserve.html#svn.serverconfig.svnserve.sasl "svnserve 使用 SASL").

`max-encryption`

指定安全层加密算法最大的期望长度—整数的二进制位数. `0` 表示 “不加密”, `1` 表示 “只检查完整性”, 默认值是 `256` (256 位加密).

`min-encryption`

指定安全层加密算法最小的期望长度—整数的二进制位数. 特殊值 `0` 表示 “不加密”, `1` 表示 “只检查完整性”, 默认值是 `0` (不加密).

`use-sasl`

指定是否开启 Cyrus SASL 特性 (`true` 或 `false`). 注意, 只有在编译 **svnserve** 时添加了对 SASL 的支持, 才能开启 该特性. 默认值是 `false`.

  

* * *

[\[57\]](#id8416) 见 RFC 2195.

[\[58\]](#id8590) 注意, **svnserve** 施加的访问限制只有在以下情况中才是 有效的: 用户无法旁路掉 **svnserve** 限制的条件, 并且没有使用其他工具 (例如 **cd** 和 **vi**) 直接访问仓库. 关于如何实现这些访问限制, 见 [“控制被调用的命令”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.svnserve.html#svn.serverconfig.svnserve.sshtricks.fixedcmd "控制被调用的命令").

[\[59\]](#id8600) 实际上我们不推荐使用 RSH, 因为它的安 全性远不如 SSH.
