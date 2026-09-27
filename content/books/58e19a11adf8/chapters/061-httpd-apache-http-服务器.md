This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

Apache HTTP 服务器是 Subversion 可使用的 “重型” 网络 服务器. 借助一个定制的模块, **httpd** 允许客户端通过 WebDAV/Delta 协议 [\[60\]](#ftn.id8822) 访问 Subversion 仓库, WebDAV/Delta 协议是 HTTP 1.1 的扩展. WebDAV/Delta 在万维网核心 协议 HTTP 的基础上, 增加了写功能—确切地说, 是版本化的写. 这样做的 结果是得到了一个标准化的, 健壮的软件系统, 可以方便地作为 Apache 2.0 软件的一部分进行打包, 受到多种操作系统和第三方软件的支持, 也不要求网络 管理员开通额外的端口.[\[61\]](#ftn.id8825) 因为 Apache-Subversion 服务器比 **svnserve** 拥有更多的特性, 因此设置起来会更加困难—灵活性往往伴随着复杂性.

下面将要介绍的很多内容都包含了关于 Apache 配置指令的引用, 虽然某些 例子用到了 Apache 的配置指令, 但完整地介绍它们已经超出了本章的范畴. Apache 团队维护了非常优秀的文档供用户参考, 可以到它的官网 [http://httpd.apache.org](http://httpd.apache.org) 获取, 例如, 关于 Apache 配置指令的 文档在 [http://httpd.apache.org/docs/current/mod/directives.html](http://httpd.apache.org/docs/current/mod/directives.html).

另外, 在管理员修改 Apache 设置的过程中, 有可能会有错误发生, 如果你 还不太熟悉 Apache 的日志子系统, 现在应该着手熟悉它. 文件 `httpd.conf` 可以指定 Apache 所生成的访问与错误 日志的存放位置 (配置指令分别是 `CustomLog` 和 `ErrorLog`). Subversion 的 **mod\_dav\_svn** 也用到了 Apache 的错误日志接口. 管理员 可以通过查看这些日志文件定位问题发生的原因.

### 先决条件

为了能让用户使用 HTTP 协议访问仓库, 你需要 4 项组件, 包含在 2 个 软件包里. 你需要 Apache **httpd** 2.0 或更新的版本, DAV 模块 **mod\_dav** (包含在 **httpd** 软件包里), Subversion, 以 及随 Subversion 软件包一起发布的 **mod\_dav\_svn** 模块. 这些组件一旦准备完毕, 为仓库添加 HTTP 网络访问能力的步骤就简单 了:

-   为 httpd 加载 **mod\_dav**, 并启动 httpd
    
-   安装 **mod\_dav\_svn**, 它将使用 Subversion 的 库函数来访问仓库
    
-   修改 `httpd.conf`, 以便导出 Subversion 仓库
    

前面两步你可以从源代码编译安装 **httpd** 和 Subversion, 或者安装它们的二进制包来完成. 关于如何编译 Subversion, 以便支持 Apache HTTP Server, 以及如何配置 Apache, 见 Subversion 源代码顶层目录下的 `INSTALL` 文件.

### Apache 基本配置

所有组件安装完毕后, 剩下的工作就是通过 `httpd.conf` 配置 Apache. 为了让 Apache 加载 **mod\_dav\_svn**, 要用到配置指令 `LoadModule`, 这条配置指令必须出现在任何与 Subversion 有关的配置项之前. 如果你是按照默认的布局来安装 Apache, 则 **mod\_dav\_svn** 会被安装到 Apache 安装目录 (通常是 `/usr/lib64/httpd/`) 的 `modules` 子目录内. 配置指令 `LoadModule` 的语法非常简单, 包含模块名及其共享库 文件的路径:

LoadModule dav\_svn\_module     modules/mod\_dav\_svn.so

Apache 将 `LoadModule` 共享库文件的路径解释成 相对于服务器进程根目录的路径. 对于上面的例子而言, Apache 将会在它的 `moduels/` 子目录内搜索 Subversion DAV 模块的 共享库文件. 取决于 Subversion 在系统中的安装方式, 你可能需要指定 不同的路径, 甚至像下面这样的绝对路径:

LoadModule dav\_svn\_module     C:/Subversion/libexec/mod\_dav\_svn.so

如果 **mod\_dav** 被编译成一个共享库文件 (而不是 被直接编译进 **httpd** 二进制文件里), 那么它也需要 一个类似的 `LoadModule` 指令, 注意, 它要出现在 **mod\_dav\_svn** 加载指令的前面:

LoadModule dav\_module         modules/mod\_dav.so
LoadModule dav\_svn\_module     modules/mod\_dav\_svn.so

在配置文件的后面, 你需要把 Subversion 仓库的位置告诉给 Apache. 指令 `Location` 具有与 XML 类似的格式, 它以开标签 开始, 以闭标签结束, 在开标签和闭标签之间可以包含多个配置指令. `Location` 的目的是在处理指定的 URL 及其子路径上 的请求时, 做一些特殊的操作. 对于 Subversion 而言, 就是希望 Apache 将指向 Subversion 仓库的请求交由 DAV 层进行处理. 下面的例子告诉 Apache, 如果 URL 的路径部分 (URL 中, 跟在服务器名和端口号后面的部分) 以 `/repos/` 开始, 就把请求交由 DAV 处理:

<Location /repos>
  DAV svn
  SVNPath /var/svn/repository
</Location>

如果你计划支持多个位于同一父目录下的 Subversion 仓库, 可以 使用指令 `SVNParentPath` 指明公共的父目录. 例如, 如果你将会在 `/var/svn` 目录下创建多个 Subversion 仓库, 访问这些仓库的 URL 是 `http://my.server.com/svn/repos1`, `http://my.server.com/svn/repos2` 等, 那你就可以在 `httpd.conf` 里这样写:

<Location /svn>
  DAV svn

  # Automatically map any "/svn/foo" URL to repository /var/svn/foo
  SVNParentPath /var/svn
</Location>

利用这种语法, Apache 将会把路径部分以 `/svn/` 开始的 URL 的处理代理给 Subversion DAV, 它将假设由 `SVNParentPath` 所指定的目录内的所有子目录都是 Subversion 仓库. 相对于 `SVNPath`, 使用 `SVNParentPath` 更加方便, 因为在添加或删除仓库 时不用重启 Apache.

需要注意的是在定义新的 `Location` 时, 不要和 其他已有的 `Location` 重叠. 比如说 `DocumentRoot` 被导出到 `/www`, 那就不要再导出 `<Location /www/repos>` 内的 Subversion 仓库, 因为如果 Apache 接到一个访问 `/www/repos/foo.c` 的请求, 它就没办法确认这是 `DocumentRoot` 内的 `repos/foo.c`, 还是代理给 **mod\_dav\_svn**, 并由它返回 Subversion 仓库内的 `foo.c`, 这种错误通常的结果是返回一个 `301 Moved Permanently` 响应.

现在, 你必须认真考虑与权限有关的问题. 如果 Apache 已经作为你的 网页服务器运行了一段时间, 服务器上可能积累了一定量的内容—网页, 脚本等, 这些文件的权限配置允许 Apache 对它们进行访问. 当 Apache 作为 Subversion 服务器时, 也要求 Subversion 仓库的读写权限配置正确.

你需要确定一种权限设置, 以便满足 Subversion 的需求, 而不影响已 有的网页或脚本. 这可能意味着修改 Subversion 仓库的权限, 以便与 Apache 提供的其他服务一致, 或者是使用 `httpd.conf` 的 `User` 与 `Group` 指令, 去指定 Apache 运行时的用户名与用户组, 这些用户名与用户组正是 Subversion 仓库的所有者. 正确设置权限的方法不是唯一的, 每一个管理员都可以选择一 种适合自己的方式, 只是需要注意的是, Subversion 搭配 Apache 的最常见 问题就是与权限有关的问题.

### 认证选项

到这里为止, 如果你的 `httpd.conf` 包含了类似 下面的内容:

<Location /svn>
  DAV svn
  SVNParentPath /var/svn
</Location>

那么你的仓库对于外界而言是 “匿名” 访问的. 除非你为 Subversion 仓库配置了认证与授权策略, 否则的话, 那些通过指令 `Location` 指定的仓库将对所有人开放. 换句话说就是:

-   任何人都可以用 Subversion 客户端, 根据仓库 (或者它的子目录) 的 URL 检出工作副本.
    
-   任何人都可以用网页浏览器浏览仓库的最新内容.
    
-   任何人都可以向仓库提交修改.
    

当然, 你可能已经设置好了一个 pre-commit 钩子, 以便阻止那些不符合 要求的提交 (见 [“实现仓库钩子”一节](https://svnbook.red-bean.com/nightly/zh/svn.reposadmin.create.html#svn.reposadmin.hooks "实现仓库钩子")). 但是如果你接 着读下去, 就会发现其实我们还可以使用 Apache 的内建机制, 以一种特定 的方式来限制访问.

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>认证可以阻止无效的用户直接访问仓库, 但是它无法保护有效用户 的网络流量的隐私. 为服务器配置 SSL 加密, 可以为用户添加额外的一层 保护, 关于如何配置 SSL 加密, 见 <a href="https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.httpd.html#svn.serverconfig.httpd.ssl" title="使用 SSL 保护网络流量">“使用 SSL 保护网络流量”一节</a>.</p></td></tr></tbody></table>

#### Basic 认证

对客户端进行认证的最简单的方式是使用 HTTP Basic 认证机制, 它 仅仅是使用用户名与密码验证用户的身份. Apache 提供了命令行工具 **htpasswd**[\[62\]](#ftn.id8953) 来管理包含用户名与密码的文件.

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p>Basic 认证 <span><em>非常</em></span> 不安全, 因为它以几乎明 文的方式在网络上传输密码, 建议使用更加安全的 Digest 认证机制, 具体的细节见 <a href="https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.httpd.html#svn.serverconfig.httpd.authn.digest" title="Digest 认证">“Digest 认证”一节</a>.</p></td></tr></tbody></table>

首先创建一个密码文件, 并为用户 Harry 和 Sally 授予访问权限.

$ ### First time: use -c to create the file
$ ### Use -m to use MD5 encryption of the password, which is more secure
$ htpasswd -c -m /etc/svn-auth.htpasswd harry
New password: \*\*\*\*\*
Re-type new password: \*\*\*\*\*
Adding password for user harry
$ htpasswd -m /etc/svn-auth.htpasswd sally
New password: \*\*\*\*\*\*\*
Re-type new password: \*\*\*\*\*\*\*
Adding password for user sally
$

然后, 确保 Apache 可以访问到提供 Basic 认证和相关功能的模块: **mod\_auth\_basic**, **mod\_authn\_file** 和 **mod\_authz\_user**. 在大部分情况下, 这些模块本来 就已经被编译进 `httpd`, 如果没有, 你可能需要显 式地使用配置指令 `LoadModule` 加载它们:

LoadModule auth\_basic\_module   modules/mod\_auth\_basic.so
LoadModule authn\_file\_module   modules/mod\_authn\_file.so
LoadModule authz\_user\_module   moduels/mod\_authz\_user.so

确定 Apache 具备必需的功能后, 接下来你就可以在 `<Location>` 块内添加必要的配置指令, 告诉 Apache 你想用哪一种认证类型, 例如:

<Location /svn>
  DAV svn
  SVNParentPath /var/svn

  # Authentication: Basic
  AuthName "Subversion repository"
  AuthType Basic
  AuthBasicProvider file
  AuthUserFile /etc/svn-auth.htpasswd
</Location>

这些配置指令的意义是:

-   `AuthName` 是你为认证域所选定的一个任意的 名字, 大多数浏览器会在提示用户输入用户名与密码的对话框上显示 这个名字.
    
-   `AuthType` 指定认证的类型.
    
-   `AuthBasicProvider` 指定由谁来提供 Basic 认证, 我们的例子里写得是一个本地密码文件.
    
-   `AuthUserFile` 指定密码文件的路径.
    

然而, 这个 `<Location>` 并没有做任何有 用的工作, 它仅仅是告诉 Apache _如果_ 授权是必须的, 它应该要求 Subversion 客户端提供用户名与密码. (如果有需要, Apache 自己也会要求认证.) 然而这里还有不完善的地方, 那就是告诉 Apache 哪些客户请求才需要授权, 当前的配置是所有的请求都不需要认证, 此时最 简单的配置就是通过添加 `Require valid-user` 要求 _所有的_ 客户端请求都需要认证:

<Location /svn>
  DAV svn
  SVNParentPath /var/svn

  # Authentication: Basic
  AuthName "Subversion repository"
  AuthType Basic
  AuthBasicProvider file
  AuthUserFile /etc/svn-auth.htpasswd

  # Authorization: Authenticated users only
  Require valid-user
</Location>

关于配置指令 `Require` 的更多细节, 以及设置 授权策略的其他方式, 请参考 [“授权选项”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.httpd.html#svn.serverconfig.httpd.authz "授权选项").

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p><code>AuthBasicProvider</code> 的默认值是 <code>file</code>, 所以我们不会在后面的例子里显式地写出 来. 但有一点需要注意, 如果在更广的上下文内你已经把 <code>AuthBasicProvider</code> 设置成了其他值, 那就需要在 Subversion 的 <code>&lt;Location&gt;</code> 内再显式地把 <code>AuthBasicProvider</code> 设置成 <code>file</code>.</p></td></tr></tbody></table>

#### Digest 认证

Digest 认证比 Basic 认证更加完善, 它允许服务器验证客户客户端 的身份, 而不会在网络上以明文的形式传输密码. 服务器和客户端会使用 不可逆的 MD5 算法计算敏感信息的散列值, 敏感信息包括用户名, 密码, 所请求的 URI, 由服务器生成的 _nonce_ (一次性数字, 每次认证时都会变化). 客户端把散列值发给服务器, 服务器 验证散列值是否正确.

为 Apache 配置 Digest 认证非常简单, 首先你要确保模块 **mod\_auth\_digest** (而不是 **mod\_auth\_basic**) 是可用的, 然后再在上面例子的基础 上做一些小改动:

<Location /svn>
  DAV svn
  SVNParentPath /var/svn

  # Authentication: Digest
  AuthName "Subversion repository"
  AuthType Digest
  AuthDigestProvider file
  AuthUserFile /etc/svn-auth.htdigest

  # Authorization: Authenticated users only
  Require valid-user
</Location>

注意到 `AuthType` 现在被设置成了 `Digest`, 而且为 `AuthUserFile` 指定了一个不同的路径. Digest 认证所使用的文件格式与 Basic 认证的 不同, 这种格式的文件使用 Apache 的命令行工具 **htdigest** [\[63\]](#ftn.id9021) 创建与管理, 而不是 **htpasswd**. Digest 认证也有 “认证域” 的概念, 它由配置指令 `AuthName` 指定.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>Digest 认证指定认证信息来源的配置指令是 <code>AuthDigestProvider</code>, <code>AuthDigestProvider</code> 的默认值是 <code>file</code>, 所以例子里的 <strong><code>AuthDigestProvider file</code></strong> 并不是必需的, 除非你要覆盖从更广的配置上下文继承而来的, 与 <code>file</code> 不同的值.</p></td></tr></tbody></table>

可以像下面这样创建密码文件:

$ ### First time: use -c to create the file
$ htdigest -c /etc/svn-auth.htdigest "Subversion repository" harry
Adding password for harry in realm Subversion repository.
New password: \*\*\*\*\*
Re-type new password: \*\*\*\*\*
$ htdigest /etc/svn-auth.htdigest "Subversion repository" sally
Adding user sally in realm Subversion repository
New password: \*\*\*\*\*\*\*
Re-type new password: \*\*\*\*\*\*\*
$

### 授权选项

到这里为止, 你已经知道了如何配置认证, 但还没有提到授权. Apache 可 以要求客户端认证他们的身份, 但 Apache 还不知道如何允许或限制客户端 的访问权限, 本节将介绍两种控制客户端对仓库的访问权限的策略.

#### 完全访问控制

访问控制最简单的形式是只授权特定的用户可以对仓库进行读取或读写.

你可以通过在 `<Location>` 添加 `Require valid-user`, 从而允许用户对仓库执行所有 可能的操作. 下面的例子只允许成功认证的客户端对 Subversion 仓库执行任意的操作:

<Location /svn>
  DAV svn
  SVNParentPath /var/svn

  # Authentication: Digest
  AuthName "Subversion repository"
  AuthType Digest
  AuthUserFile /etc/svn-auth.htdigest

  # Authorization: Authenticated users only
  Require valid-user
</Location>

有时候, 你并不需要这么严格的设置. 比如说托管 Subversion 源代码 的服务器 ([https://svn.apache.org/repos/asf/subversion/](https://svn.apache.org/repos/asf/subversion/)) 允许所有人 对仓库执行只读操作 (例如检出工作副本, 浏览仓库等), 但只允许认证 用户执行写操作. 配置指令 `Limit` 和 `LimitExcept` 可以实现这种有选择的访问限制, 和 配置指令 `Location` 一样, 前面两个配置指令也有开 标签和闭标签, 管理员需要把它们放在 `<Location>` 内部.

`Limit` 和 `LimitExcept` 内的参数是 HTTP 请求类型, 这些请求类型将会受到这两个配置指令的 影响. 比如说为了允许匿名的只读访问, 管理员需要使用配置指令 `LimitExcept` (为指令添加请求类型参数 `GET`, `PROPFIND`, `OPTIONS` 和 `REPORT`), 还要把 前面提到的配置指令 `Require valid-user` 写到 `<LimitExcept>` 内.

<Location /svn>
  DAV svn
  SVNParentPath /var/svn

  # Authentication: Digest
  AuthName "Subversion repository"
  AuthType Digest
  AuthUserFile /etc/svn-auth.htdigest

  # Authorization: Authenticated users only for non-read-only
  #                (write) operations; allow anonymous reads
  <LimitExcept GET PROPFIND OPTIONS REPORT>
    Require valid-user
  </LimitExcept>
</Location>

前面展示的只是一些很简单的例子, 如果想知道关于 Apache 访问控制和 配置指令 `Require` 的更多细节, 可以参考 Apache 文档的教程集合 ([http://httpd.apache.org/docs-2.0/misc/tutorials.html](http://httpd.apache.org/docs-2.0/misc/tutorials.html)) 中的 `Security` 部分.

#### 每个目录的访问控制

还可以使用 Apache 模块 **mod\_authz\_svn** 进行 更细致的权限设置, 该模块截取从客户端发往服务器的 URL, 然后请求 模块 **mod\_dav\_svn** 对 URL 进行解码, 根据定义在 配置文件里的访问策略, 可能会禁止客户端的请求.

如果你是自己从源代码编译安装的 Subversion, 那么默认情况下, 模块 **mod\_authz\_svn** 将和 **mod\_dav\_svn** 一起被编译安装, 许多二进制包也会自动安装这两个模块. 为了确认模块已 被正确地安装, 在 `httpd.conf` 里将 **mod\_authz\_svn** 的加载放到 **mod\_dav\_svn** 之后:

LoadModule dav\_module         modules/mod\_dav.so
LoadModule dav\_svn\_module     modules/mod\_dav\_svn.so
LoadModule authz\_svn\_module   modules/mod\_authz\_svn.so

为了激活 **mod\_authz\_svn**, 你需要在 `<Location>` 里, 用配置指令 `AuthzSVNAccessFile` 指定一个文件, 这个文件包含 了仓库内各个文件路径的权限策略. 从 Subversion 1.7 开始, 还可以用 配置指令 `AuthzSVNReposRelativeAccessFile` 指定 每个仓库各自的访问权限配置文件. (过一会儿, 我们就会讨论该文件的 格式.)

Apache 非常灵活, 所以你可以从 3 种通用模式中选择一种进行配置. 首先, 先选择一种基本配置模式. (下面介绍的例子非常简单, 关于 Apache 认证与授权选择的更多细节, 请参考 Apache 的文档.)

最开放的做法是允许所有人访问, 这意味着 Apache 从不会要求客户 端进行认证, 把所有的用户都当成 “匿名用户”. (见 [例 6.2 “匿名访问的配置示例”](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.httpd.html#svn.serverconfig.httpd.authz.perdir.ex-1 "例 6.2. 匿名访问的配置示例").)

**例 6.2. 匿名访问的配置示例**

<Location /repos>
  DAV svn
  SVNParentPath /var/svn

  # Authentication: None

  # Authorization: Path-based access control
  AuthzSVNAccessFile /path/to/access/file
</Location>

相反, 你可以要求 Apache 对所有的客户端进行认证, 下面的配置 使用配置指令 `Require valid-user` 无条件地要求 认证, 而且还指定了用户的认证方式. (见 [例 6.3 “认证访问的配置示例”](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.httpd.html#svn.serverconfig.httpd.authz.perdir.ex-2 "例 6.3. 认证访问的配置示例").)

**例 6.3. 认证访问的配置示例**

<Location /repos>
  DAV svn
  SVNParentPath /var/svn

  # Authentication: Digest
  AuthName "Subversion repository"
  AuthType Digest
  AuthUserFile /etc/svn-auth.htdigest

  # Authorization: Path-based access control; authenticated users only
  AuthzSVNAccessFile /path/to/access/file
  Require valid-user
</Location>

第三种常见的配置模式是同时允许认证与匿名访问. 比如说很多管理 员通常会允许匿名用户读取特定的仓库目录, 但较为敏感的区域仅允许 被认证用户访问. 在这种配置下, 所有用户首先以匿名身份访问仓库, 在 任意时刻, 如果你的访问控制策略要求使用真正的用户名, Apache 将向 客户端发起认证要求. 为了实现这种配置, 使用配置指令 `Satisfy Any` 和 `Require valid-user`. (见 [例 6.4 “匿名/认证混合访问的配置示例”](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.httpd.html#svn.serverconfig.httpd.authz.perdir.ex-3 "例 6.4. 匿名/认证混合访问的配置示例").)

**例 6.4. 匿名/认证混合访问的配置示例**

<Location /repos>
  DAV svn
  SVNParentPath /var/svn

  # Authentication: Digest
  AuthName "Subversion repository"
  AuthType Digest
  AuthUserFile /etc/svn-auth.htdigest

  # Authorization: Path-based access control; try anonymous access
  #                first, but authenticate if necessary
  AuthzSVNAccessFile /path/to/access/file
  Satisfy Any
  Require valid-user
</Location>

下一步就是创建授权文件, 文件内包含了访问仓库中特定路径的规则, 我们将在 [“基于路径的授权”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.pathbasedauthz.html "基于路径的授权") 介绍 如何编写授权文件.

#### 禁止基于路径的检查

模块 **mod\_dav\_svn** 会做大量的工作, 以便确保 被管理员标记为 “不可读” 的数据不会被意外地泄漏, 这意味着它需要仔细地监控由客户端命令 (例如 **svn checkout** 和 **svn update**) 返回的路径和文件内容. 如果客户端命令遇到了一个它不可读的路径, 该 路径就会被忽略. 对于历史或重命名追溯—例如对一个早就被重命名 过的文件执行 **`svn cat -r OLD foo.c`**— 如果其中一个对象以前的名字被禁止读取, 那么重命名追溯就会被终止.

有时候这些路径检查的代价将会非常高昂, 特别是对 **svn log** 而言. 当检索一个版本号列表时, 服务器查看每个版本号 内被修改的路径, 检查路径的可读性, 如果碰到一个不可读的路径, 它将不 会出现在版本号的修改路径列表里 (选项 `--verbose` (`-v`) 能够显示被版本号修改的路径), 整个日志消息也不 会显示出来. 不管怎么说, 如果被版本号影响的文件数量非常大, 那么这种 检查将会非常耗时. 这就是安全的代价: 即使你根本就没有配置像 **mod\_authz\_svn** 这样的模块, 模块 **mod\_dav\_svn** 仍然会要求 Apache **httpd** 对每一个路径执行授权检查. 模块 **mod\_dav\_svn** 无法知晓系统中已经安装了哪些授权模块, 所以它就要求 Apache 调用可能存在的任意模块.

另一方面, 管理员还可以牺牲部分安全, 以换取速度. 如果你没有实施 任意类型的每目录授权 (即没有使用 **mod\_authz\_svn** 或类似的模块), 就可以禁止这些路径检查, 禁止方式是在 `httpd.conf` 里使用配置指令 `SVNPathAuthz`, 见 [例 6.5 “完全禁止路径检查”](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.httpd.html#svn.serverconfig.httpd.authz.pathauthzoff.ex-1 "例 6.5. 完全禁止路径检查") 所示.

**例 6.5. 完全禁止路径检查**

<Location /repos>
  DAV svn
  SVNParentPath /var/svn

  SVNPathAuthz off
</Location>

配置指令 `SVNPathAuthz` 的默认值是 `on`, 当把它设置成 `off` 后, 所有基于路径的授权检查都会被禁止, **mod\_dav\_svn** 也不会再在每个发现的路径上唤起授权检查.

#### 存放在仓库内的访问权限配置文件

从 Subversion 1.8 开始, 访问权限配置文件可以存放在仓库内, 这个 仓库可以是应用了本文件的同一仓库, 或者是另一个完全不同的仓库. 这个 功能为 Subversion 基于路径的授权配置添加了版本控制的特性.

配置指令 `AuthzSVNAccessFile` 和 `AuthzSVNReposRelativeAccessFile` 都可以用来指定 仓库内的访问权限配置文件的位置. 配置指令的参数既可以是表示绝对路径 的 `file://`, 也可以是表示相对路径的 URL (以 `^/` 开始).

比如说, 可以像 [例 6.6 “为多个仓库指定同一个位于仓库内的访问配置文件”](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.httpd.html#svn.serverconfig.httpd.authz.inrepo-authz.ex-1 "例 6.6. 为多个仓库指定同一个位于仓库内的访问配置文件") 那样, 为仓库内的访问权限配置文件指定一个绝对路径.

**例 6.6. 为多个仓库指定同一个位于仓库内的访问配置文件**

<Location /repos>
  DAV svn
  SVNParentPath /var/svn
  AuthzSVNAccessFile file:///var/svn/authzrepo/authz
</Location>

还可以像 [例 6.7 “为每个仓库都指定一个仓库内的访问配置文件”](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.httpd.html#svn.serverconfig.httpd.authz.inrepo-authz.ex-2 "例 6.7. 为每个仓库都指定一个仓库内的访问配置文件") 那样 为仓库内的访问权限配置文件指定一个相对路径.

**例 6.7. 为每个仓库都指定一个仓库内的访问配置文件**

<Location /repos>
  DAV svn
  SVNParentPath /var/svn
  AuthzSVNReposRelativeAccessFile ^/authz
</Location>

  

### 使用 SSL 保护网络流量

通过 `http://` 连接仓库意味着 Subversion 所 有的活动都会在网络上暴露无遗, 也就是说像检出, 提交和更新这些操作 都有可能被未授权的网络嗅探工具所拦截. 使用 SSL 加密网络流量是保护 敏感数据不在网络上泄露的常用方法.

如果 Subversion 客户端工具在编译时开启了 OpenSSL, 它就可以使用 `https://` 形式的 URL 连接 Apache 服务器, 于是所有 的网络流量都会使用每连接会话密钥进行加密. Subversion 客户端所使用的 WebDAV 函数库不仅可以验证服务器的证书, 当服务器提出要求时, 它也可 以为客户端提供证书.

#### Subversion 服务器 SSL 证书配置

如何为客户端和服务器生成 SSL 证书, 以及如何配置 Apache 以便 使用这些证书, 已经超出了本书的范畴, 读者可参考 Apache 的文档 ([http://httpd.apache.org/docs/current/ssl/](http://httpd.apache.org/docs/current/ssl/)).

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>来自知名组织的 SSL 证书通常需要花钱购买, 但如果只需要满足最低 限度的要求, 你可以让 Apache 使用自签署的证书, 这种证书由 OpenSSL 生成.<a href="#ftn.id9169" id="id9169"><sup>[64]</sup></a></p></td></tr></tbody></table>

#### Subversion 客户端 SSL 证书管理

当使用 `https://` 形式的 URL 连接 Apache 时, Subversion 客户端将会收到两种类型的响应:

-   服务器证书
    
-   针对客户端证书的请求
    

##### 服务器证书

当客户端收到服务器证书时, 它需要验证服务器身份的真实性, OpenSSL 完成验证的方法是检查服务器证书的签发人, 也就是 _证书颁发机构_ (_certificate authority_, 简称 CA). 如果 OpenSSL 无法自动信任 CA, 或者是发生的错误 (例如认证超时或主机名不匹配), 那么 Subversion 客户端工具将询问用户是否要信任服务器的证书:

$ svn list https://host.example.com/repos/project

Error validating server certificate for 'https://host.example.com:443':
 - The certificate is not issued by a trusted authority.  Use the
   fingerprint to validate the certificate manually!
Certificate information:
 - Hostname: host.example.com
 - Valid: from Jan 30 19:23:56 2004 GMT until Jan 30 19:23:56 2006 GMT
 - Issuer: CA, example.com, Sometown, California, US
 - Fingerprint: 7d:e1:a9:34:33:39:ba:6a:e9:a5:c4:22:98:7b:76:5c:92:a0:9c:7b

(R)eject, accept (t)emporarily or accept (p)ermanently?

用户可能会在网页浏览器看到相同的对话框 (浏览器只是一个 HTTP 客户端), 如果选择 `p`, Subversion 将把 服务器证书缓存在本地的 `auth/` 目录内, 你的用户名和密码也缓存在这里 (见 [“缓存证书”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.netmodel.html#svn.serverconfig.netmodel.credcache "缓存证书")), 今后再次 连接服务器时, 将会自动信任证书.

运行时配置文件 `servers` 允许 Subversion 客户端自动信任特定的 CA, 信任既可以是全局的, 也可以是基于每个主 机的, 方法是用变量 `ssl-authority-files` 指定 PEM 编码的 CA 证书, 证书之间用分号分开:

\[global\]
ssl-authority-files = /path/to/CAcert1.pem;/path/to/CAcert2.pem

很多 OpenSSL 安装包预定义了一套 “默认的” CA, 这些 CA 得到了非常普遍的信任. 为了让 Subversion 客户端自动 信任 OpenSSL 的证书, 把变量 `ssl-trust-default-ca` 设置成 `true`.

##### 客户端证书盘问

如果客户端收到一个证书请求, 那便是服务器要求客户端提供它的 身份, 客户端必须提供由 CA 签名过的证书, 而该 CA 是服务器所信任 的, 除了证书, 还要发送一个 _回应_ (_challenge response_), 这个回应证明了客户 端拥有与证书关联的私钥. 私钥和证书通常被加密后存放在本地磁盘上, 被一个密码保护. 当 Subversion 客户端收到证书的盘问时, 它将询问 用户密钥与证书的存放路径, 以及对应的密码:

$ svn list https://host.example.com/repos/project

Authentication realm: https://host.example.com:443
Client certificate filename: /path/to/my/cert.p12
Passphrase for '/path/to/my/cert.p12':  \*\*\*\*\*\*\*\*

在上面的例子里, 客户端证书存放在一个 `.p12` 文件里. 为了让 Subversion 使用证书, 证书的格式必须是 PKCS#12, 这是一种可移植的标准格式, 大多数网页浏览器支持导入或导出这种 格式的证书, 除了浏览器, 还可以用 OpenSSL 命令行工具把已有的 证书转换成 PKCS#12 格式.

运行时配置文件 `servers` 允许用户基于 每个主机, 自动完成证书请求的响应. 如果用户设置了变量 `ssl-client-cert-file` 和 `ssl-client-cert-password`, Subversion 将自动 响应证书请求, 而不会提示用户:

\[groups\]
examplehost = host.example.com

\[examplehost\]
ssl-client-cert-file = /path/to/my/cert.p12
ssl-client-cert-password = somepassword

更注重安全的用户可能并不想设置变量 `ssl-client-cert-password`.

### 优化性能

Apache HTTP 服务器非常注重性能, 不过你仍然可以通过修改配置为 Subversion 服务争取更高的性能. 本节将介绍几种比较重要的配置修改, 但是需要注意的某些 `httpd.conf` 配置选项将会影响 Apache 服务器的整体表现, 而不仅仅是 Subversion 服务, 因此管理员在 修改配置时, 需要考虑对其他服务的影响.

#### KeepAlive

默认情况下, Apache HTTP 服务器允许为多个请求复用同一个连接, 这对于 Subversion 而言非常有好处, 因为 Subversion 在一个单独的 操作中, 很可能会快速产生成百上千个请求, 而重新打开一个服务器的 连接是一件颇费周张的事. 在连接被服务器关闭之前, Subversion 会在同 一个连接内发送尽可能多的请求. 配置指令 `KeepAlive` 用于开启或禁止连接重用功能, 它的默认值是 `On`.

但是还有另一个配置指令用于限制客户端在一个单独的连接内, 可以提交 的请求数量: `MaxKeepAliveRequests`, 它的默认值是 `100`. 对于版本较旧的 Subversion 而言, 它的默认值 已经足够了, 但是 Subversion 1.8 使用了不同的 HTTP 通信函数库 (称为 Serf), 为了获取特定的零碎信息, Serf 更倾向于发送若干个小请求, 而不是 请求服务器在一个单独的响应中, 传回一大块数据. 因此, 我们建议把 至少把 `MaxKeepAliveRequests` 设置为 `1000`.

#
# KeepAlive: Whether or not to allow persistent connections (more than
# one request per connection). Set to "Off" to deactivate.
#
KeepAlive On

#
# MaxKeepAliveRequests: The maximum number of requests to allow
# during a persistent connection. Set to 0 to allow an unlimited amount.
# We recommend you leave this number high, for maximum performance.
#
MaxKeepAliveRequests 1000

#### 批量更新

Subversion 1.8 客户端和它旧版之间最大的不同点在于更新操作 (**svn checkout**, **svn update**, **svn switch** 等) 的处理过程. 老版客户端使用 Neon HTTP 函数库实现通信, Neon 函数库更喜欢在一个单独的请求中, 向 服务器索要全部的信息. 管理员可能在他们的服务器日志里见到过这种日志: 先是一些握手操作, 然后是一个带有大量数据的 `REPORT` 请求, 这些数据就是整个的检出/更新数据集!

使用 Serf 函数库的 Subversion 客户端—版本大于或等于 Subversion 1.8—仍然会发送 `REPORT` 请求, 但在请求内会设置一些稍微不同的标志, 这些标志告诉服务器不用发送全 部的数据, 而是发送一个清单, 客户端随后根据清单向服务器请求更明确 的数据, 从而完成整个操作. 在服务器的 `access_log` 日志里, 这种 `REPORT` 请求后面会出现很多小块的 `GETS` 请求 (如果是旧版 Subversion, 则是 `PROPFIND` 请求).

上面的做法有好有坏. 批量更新的做法虽然在服务器上产生的日志更少, 但在操作运行的过程中, 被占用的 Apache HTTP 服务器子进程将无暇顾及 其他工作, 而当前操作可能还需要很长时间才能完成. 非批量更新提供了 设置内容缓存的机会 (缓存可用于提高性能), 但生成的服务器日志比批量 更新多得多. 无论是由于哪种原因, 管理员可能想对客户端施加更多的限制. Subversion 1.6 为 **mod\_dav\_svn** 添加了一个新的二 元配置指令 `SVNAllowBulkUpdates`, 用于配置服务器 是否允许批量更新. 在 Subversion 1.8, `SVNAllowBulkUpdates` 的值除了 `On` 和 `Off` 外, 还新增了 `Prefer`, 如果 `SVNAllowBulkUpdates` 被设置为 `Prefer`, 受支持的客户端 (1.8 或更新的版本) 将尝试 使用批量更新, 除非另有指定.

### 其他好处

关于 Apache 和 **mod\_dav\_svn** 的认证与授权, 我 们已经介绍了大部分, 不过 Apache 还提供了一些非常有效的特性.

#### 仓库浏览

Apache/WebDAV 最实用的功能之一是允许用户直接在网页浏览器上浏览 仓库内的文件与目录. 因为 Subversion 使用 URL 标识仓库内的文件, 基于 HTTP 的 URL 可以直接输入到网页浏览器的地址栏上, 然后浏览器 向服务器发送 HTTP `GET` 请求, 根据 URL 所指向的 资源是文件还是目录, **mod\_dav\_svn** 将返回目录内的 文件列表, 或文件的内容.

##### URL 语法

如果 URL 没有指定所请求的资源的版本, **mod\_dav\_svn** 将返回最新的版本, 这种做法最大的 好处是你可以把 Subversion URL (例如某篇文档的 URL) 发给其他同事, 而这些 URL 将始终指向文档的最新版. 当然, 你也可以把这些 URL 作 为超链接放到网站上.

从 Subversion 1.6 开始, **mod\_dav\_svn** 支持 一种用于查看旧版本文件与目录的 URL 语法. 这种语法使用 URL 的查询 字符串部分指定限定版本号和 (或) 实施版本号, Subversion 将会把这些 版本号对应的文件与目录显示到网页浏览器上. 为了指定限定版本号, 在 URL 的查询字符串部分添加 ``p=_`PEGREV`_`` 形式的 名字/值 对 (其中, _`PEGREV`_ 是一个版本号); 为了指定实施版本号, 在 URL 的查询字符串部分添加 ``r=_`REV`_`` 形式的 名字/值 对 (其中, _`REV`_ 是一个版本号).

比如说, 你想查看 `/trunk` 里的最新版的 `README.txt`, 就在网页浏览器的地址栏里输入类似 于下面的 URL:

http://host.example.com/repos/project/trunk/README.txt

如果你想查看该文件的旧版, 在 URL 的查询字符部分添加实施版本号:

http://host.example.com/repos/project/trunk/README.txt?r=1234

如果你想查看的文件在最新版中已经被删除了, 那又该怎么办? 这 时候就要用到限定版本号:

http://host.example.com/repos/project/trunk/deleted-thing.txt?p=321

当然, 你还可以结合使用限定版本号和实施版本号, 更精细地指定待 查看的项目:

http://host.example.com/repos/project/trunk/renamed-thing.txt?p=123&r=21

上面的 URL 将显示对象在版本号 21 时的内容, 这个对象在版本 号为 123 时, 位于 `/trunk/renamed-thing.txt`. 关于 “限定版本号” 和 “实施版本号” 的详细 介绍, 见 [“限定版本号与实施版本号”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.pegrevs.html "限定版本号与实施版本号"), 理解它们可能会 让你感到有点头晕.

从 Subversion 1.8 开始, **mod\_dav\_svn** 具有了 替换关键字的能力. 如果 **mod\_dav\_svn** 在文件的 URL 里发现了查询参数 `kw=1`, 它将在递送文件内容 时, 替换掉其中的关键字. 如果省略参数 `kw`, 或是 赋予了除 `1` 之外的其他值, 则 Subversion 将保持 默认行为, 即在递送文件内容时, 不替换其中的关键字.

通常情况下, 关键字替换是作为工作副本管理工作的一部分, 在客户 端执行, 所以说在不使用工作副本的情况下, 让服务器递送一份关键字被 替换后的文件是一件非常方便的事情.

比如说, 你想查看位于项目目录 `/trunk` 内, 最新版本的 `README.txt`, 而且还要求替换文件 内的关键字, 则在 URL 的后面添加查询参数 `kw=1`:

http://host.example.com/repos/project/trunk/README.txt?kw=1

和客户端的关键字展开一样, 只有在文件上设置属性 `svn:keywords` 后, 被指定的关键字才会被替换, 关于关键字替换的更多内容, 见 [“关键字替换”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.props.special.keywords.html "关键字替换").

作为提醒, **mod\_dav\_svn** 所能提供的仓库浏览 体验比较有限, 你只能看到目录列表和文件内容, 但无法看到版本号属性 (例如日志消息) 或文件/目录属性. 如果用户需要更强大的仓库浏览功能, 可以借助第三方软件, 例如 ViewVC ([http://viewvc.org](http://viewvc.org)), Trac ([http://trac.edgewall.org](http://trac.edgewall.org)) 和 WebSVN ([http://websvnphp.github.io](http://websvnphp.github.io)). 这些第三方软件不会影响 **mod\_dav\_svn** 的内建 “可浏览性”, 而且还提供了更强大的功能, 包括显示前面提到的属性, 显示文件的两个 版本号之间的差异等.

##### 合适的 MIME 类型

浏览一个 Subversion 仓库时, 网页浏览器通过查看 `Content-Type` 来判断如何提供文件的内容. `Content-Type` 是 Apache 答复 HTTP `GET` 请求的消息中的一段头部信息, 这段头部信息存 放 MIME 类型. 默认情况下, Apache 告诉浏览器所有的仓库文件的 MIME 类型都是默认值, 通常是 `text/plain`. 然而, 用户 有时候可能对这种处理不太满意, 因为他希望仓库里的文件能够以更有意义 的方式呈现—比如说把 `foo.html` 按照 HTML 的格式进行显示.

为了让文件在浏览器内以更加合适的方式呈现, 需要为文件设置 `svn:mime-type` 属性, 详细的内容在 [“文件内容类型”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.props.file-portability.html#svn.advanced.props.special.mime-type "文件内容类型"), 另外, 还可以配置客户端, 使得在第一次把文件存放到仓库是时, 自动地为文件 设置合适的 `svn:mime-type` 属性, 见 [“自动属性设置”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.props.html#svn.advanced.props.auto "自动属性设置").

继续我们的例子, 如果 `foo.html` 的 `svn:mime-type` 属性已经被设置为 `text/html`, Apache 将告诉浏览器按照 HTML 格式 来显示 `foo.html`. 用户还可以为图片文件的 `svn:mime-type` 属性设置合适的 `image/*`, 最终得到一个可以直接从仓库中浏览的 网站! 只要网站不包含任何动态生成的内容, 这是完全可以做到的.

##### 定制外观

通常来说, 用户更经常使用普通文件的 URL—毕竟文件的内容 才是人们感兴趣的东西. 不过, 在少数情况下用户仍然需要浏览 Subversion 的目录列表, 此时用户可能会觉得目录列表的外观过于简单, 缺乏美感 (或者说无法引起人们的兴趣). 为了允许对目录列表的外观进行修改, Subversion 提供了一个 XML 索引特性. 在仓库的 `httpd.conf` `Location` 配置块里, 如果增加一个配置指令 `SVNIndexXSLT`, **mod\_dav\_svn** 在显示目录列表时, 将生成一个 XML 输出, 并引用到用户所选择的 XSLT 样式表:

<Location /svn>
  DAV svn
  SVNParentPath /var/svn
  SVNIndexXSLT "/svnindex.xsl"
  …
</Location>

利用配置指令 `SVNIndexXSLT` 和一个优秀的 XSLT 样式表, 就可以让目录列表的显示风格与网站上的其他部分保持 一致. 如果用户愿意, 还可以使用 Subversion 提供的样式表示例, 样式表示例放在源码包的 `tools/xslt/` 目录内. 需要注意的是提供给配置指令 `SVNIndexXSLT` 的路径 实际上是一个 URL 路径—浏览器必须能够读取到样式表, 这样才能 使用它们!

##### 罗列仓库

如果你通过配置指令 `SVNParentPath`, 在一个 单独的 URL 上服务多个仓库, 那么 Apache 就有可能在浏览器上列出所有 的仓库, 你所需要做的就是激活配置指令 `SVNListParentPath`:

<Location /svn>
  DAV svn
  SVNParentPath /var/svn
  SVNListParentPath on
  …
</Location>

如果某个用户在浏览器上打开了 URL `http://host.example.com/svn/`, 他将会看所有的 位于 `/var/svn` 目录内的 Subversion 仓库. 这样 做显然不太安全, 所以 `SVNListParentPath` 的默认 值是 `off`.

#### Apache 日志

Apache 本质上是一个 HTTP 服务器, 它支持异常灵活的日志特性. 讨论 日志的所有配置方式已经超出了本书的范畴, 但我们必须指出的是即使是最 普通的 `httpd.conf` 也会让 Apache 生成两种日志: `error_log` 和 `access_log`. 这些日志可能会出现在不同的地方, 但通常都在 Apache 安装路径的日志 目录内. (如果是 Unix 系统, 它们通常在 `/usr/local/apache2/logs/`.)

文件 `error_log` 记录了 Apache 遇到的所有 内部错误, 文件 `access_log` 则记录了 Apache 收 到的每一个 HTTP 请求. 利用这些日志, 管理员就能很方便地看出 Subversion 客户端来自哪个 IP, 特定客户端访问服务器的频率高低, 哪些用户认证成功, 以及哪些请求成功或失败.

不幸的是, 由于 HTTP 是一种无状态的协议, 即使是最简单的 Subversion 客户端操作也会产生多个网络请求. 要想从 `access_log` 推论出客户端在做什么操作是一件非常困 难的工作—大多数操作看起来就像是一系列神秘的 `PROPPATCH`, `GET`, `PUT` 和 `REPORT` 请求. 更为严重 的是, 很多客户端操作发送的是几乎相同的请求序列, 这就使得分辨这些 请求变得更加困难.

还好, **mod\_dav\_svn** 可以帮到你. 为了激活特性 “操作日志” (operational logging), 管理员可以要求 **mod\_dav\_svn** 创建一个单独的日志文件, 文件从较 高的层次描述了客户端所执行的操作.

为了让 **mod\_dav\_svn** 从较高的层次描述客户端所 执行的操作, 管理员需要使用 Apache 的配置指令 `CustomLog` (关于该配置指令的详细信息可以参考 Apache 的文档). 注意, 该配置指令必须出现在 Subversion 配置块 `Location` 的 _外面_ :

<Location /svn>
  DAV svn
  …
</Location>

CustomLog logs/svn\_logfile "%t %u %{SVN-ACTION}e" env=SVN-ACTION

在上面的例子里, 我们请求 Apache 在标准的 `log` 目录下创建一个特殊的日志文件: `svn_logfile`. 变 量 `%t` 和 `%u` 分别被替换为请求 接到的时间和用户名, 但其中最需要关注的是出现两次的 `SVN-ACTION`.当 Apache 看见 `SVN-ACTION` 时, 它把该字符串替换为环境变量 `SVN-ACTION` 的值, 每当 **mod\_dav\_svn** 检测到一个客户端操作时, 它就自动设置 环境变量 `SVN-ACTION` 的值.

所以说, 我们不用面对像下面这样复杂的 `access_log`:

\[26/Jan/2007:22:25:29 -0600\] "PROPFIND /svn/calc/!svn/vcc/default HTTP/1.1" 207 398
\[26/Jan/2007:22:25:29 -0600\] "PROPFIND /svn/calc/!svn/bln/59 HTTP/1.1" 207 449
\[26/Jan/2007:22:25:29 -0600\] "PROPFIND /svn/calc HTTP/1.1" 207 647
\[26/Jan/2007:22:25:29 -0600\] "REPORT /svn/calc/!svn/vcc/default HTTP/1.1" 200 607
\[26/Jan/2007:22:25:31 -0600\] "OPTIONS /svn/calc HTTP/1.1" 200 188
\[26/Jan/2007:22:25:31 -0600\] "MKACTIVITY /svn/calc/!svn/act/e6035ef7-5df0-4ac0-b811-4be7c823f998 HTTP/1.1" 201 227
…

你完全可以追求更容易理解的 `svn_logfile`:

\[26/Jan/2007:22:24:20 -0600\] - get-dir /tags r1729 props
\[26/Jan/2007:22:24:27 -0600\] - update /trunk r1729 depth=infinity
\[26/Jan/2007:22:25:29 -0600\] - status /trunk/foo r1729 depth=infinity
\[26/Jan/2007:22:25:31 -0600\] sally commit r1730

除了环境变量 `SVN-ACTION`, **mod\_dav\_svn** 还会设置 `SVN-REPOS` 和 `SVN-REPOS-NAME`, 这两个环境变量分别存放仓库的 文件系统路径和路径的最后一个分量. 如果你想把多个仓库的日志写到同一 个日志文件里, 那么你可能需要把这两个环境变量包含到 `CustomLog` 格式字符串里. 可被日志记录的操作的详尽 列表, 见 [“高层日志记录”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.operational-logging.html "高层日志记录").

显示, Apache 为 Subversion 所记录的日志越多, 服务器上的磁盘消耗 也就越多, 对于非常活跃的 Subversion 服务器而言, 每天产生数兆大小的 日志并不少见. 只有当日志能被有效地处理时, 它才是有价值的, 而庞大的 日志文件很快就会让分析难以为继. 关于如何管理 Apache HTTP 服务器日志, 有很多标准的做法可供参考, 介绍它们已经超出了本书的范畴, 管理员应该 选择一种最适合他们的日志轮换与归档方式.

如果 Subversion 只是产生了太多没什么用的日志, 那又该怎么办? 比如说在 [“批量更新”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.httpd.html#svn.serverconfig.httpd.perf.bulk-updates "批量更新") 我们 说过 Subversion 客户端在执行检出和其他更新操作时, 所采取的特定 方式将会导致服务器快速产生大量日志, 因为请求每一段数据的日志都是 单独记录 (Subversion 以前的版本可能不会这样做). 在这种情况下, 管理 员可能需要配置 Apache, 以便静默某些日志.

Apache HTTP 模块 **mod\_setenvif** 提供了配置 指令 `SetEnvIf`, 可根据条件设置环境变量. 利用 `SetEnvIf`, 就可以让 `CustomLog` 根据环境变量的状态, 有条件地为请求记录日志. 下面的配置示例告诉 服务器不要为指向私有 Subversion URL 的 `GET` 和 `PROPFIND` 请求记录日志.

\# Matches everything, just to initialize the "in\_repos" variable.
SetEnvIf Request\_URI "^" in\_repos=0

# Set "in\_repos" if this is a request for a private Subversion URL.
SetEnvIf Request\_URI "/!svn/" in\_repos=1

# Set "do\_not\_log" for non-public request types we don't care to log.
SetEnvIf Request\_Method "GET" do\_not\_log
SetEnvIf Request\_Method "PROPFIND" do\_not\_log

# Unset "do\_not\_log" for URLs that aren't private Subversion URLs.
SetEnvIf in\_repos 0 !do\_not\_log

# Log requests, but only if "do\_not\_log" isn't set.
CustomLog logs/access\_log env=!do\_not\_log

利用上面的配置, **httpd** 仍然会为指向公开的 Subversion URL 的 `GET` 请求记录日志, 这些请求 有可能是用户在网页上浏览仓库时产生的. 对于指向私有 的 Subversion URL 的 `GET` 和 `PROPFIND` 请求—这些请求可能是检出操作所 产生的—将不会记录日志.

#### 直写代理

使用 Apache 作为 Subversion 服务器的一大好处是它可以用来实现简单的 副本备份. 比如说, 你的团队分布在全球的四个办公室内, 而 Subversion 仓库只能放在其中一个办公室中, 这就意味着其他三个办公室将享受不到好 的访问体验—当他们更新和提交代码时, 看到的很可能是缓慢的响应 时间. 对于这种问题, 最有效的解决方案是搭建一套系统, 该系统由一个 Apache _主_ (_master_) 服务器与若干个 _从_ (_slave_) 服务器组成. 如果在每一个办公室都放置 一个从服务器, 当用户检出工作副本时, 将从最近的服务器上检出—所 有的读操作都在本地的从服务器上完成, 写操作将被自动路由到主服务器. 当提交完成时, 主服务器自动地使用备份工具 **svnsync**, 把新版本号 “推送” 给其他所有的从服务器.

上面的方案可以极大地提高用户的访问速度, 因为 Subversion 客户端 所产生的网络流量中, 有 80–90% 都是读请求, 如果这些请求都由 _本地的_ 服务器进行处理, 将是一个很大的性能提升.

本节, 我们将介绍如何搭建一个标准的一主多从服务器系统, 注意, Apache 的版本至少是 2.2.0 (加载了模块 **mod\_proxy**), Subversion (**mod\_dav\_svn**) 至少是 1.5.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>我们这里所介绍的方案, 只是配置 Subversion 直写代理的众多方案 中的一种, 还有其他方案可供选择, 例如从服务器可以定期地从主服务器 上拉取修改, 而不是主服务器主动向从服务器推送修改. 又或者是主服务 器先将修改推送到某个从服务器, 这个从服务器再将相同的修改推送给下 一个从服务器, 依次类推. 管理员可以先通过本节理解当部署 Subversion WebDAV 代理时, 发生了哪些事情, 然后再实现一种最适合自己的方案.</p></td></tr></tbody></table>

##### 配置服务器

首先, 按照通常的方式修改主服务器的 `httpd.conf`, 使得仓库能在特定的 URI 位置被 访问到, 按照你自己的需求, 配置认证与授权. 主服务器配置完成后, 按照相同的步骤配置从服务器, 不过从服务器要额外配置一个 `SVNMasterURI` 配置指令:

<Location /svn>
  DAV svn
  SVNPath /var/svn/repos
  SVNMasterURI http://master.example.com/svn
  …
</Location>

配置指令 `SVNMasterURI` 告诉从服务器把所有 的写请求都重定向到主服务器 (写请求重定向由 Apache 模块 **mod\_proxy** 自动完成). 然而, 普通的读请求仍然由 从服务器处理. 一定要确保主服务器和从服务器都配置了相同的认证与 授权, 否则的话会非常让人头疼.

接下来, 我们需要解决无限递归的问题. 根据目前的配置, 想像一下 当客户端向主服务器提交一个修改时, 将会发生什么现象. 当提交完成后, 主服务器使用 **svnsync** 将新的版本号复制给每一个 从服务器, 但是在从服务器看来, **svnsync** 只不过是 提交修改的另一个客户端而已, 于是从服务器会马上把这个写请求重定向 给主服务器, 这就导致了无限递归.

解决办法是让主服务器把版本号复制到从服务器上与主服务器不同的 `<Location>`, 这个位置 _不_ 设置写请求代理, 但接受且只接受从主服务器 IP 地址发过来的提交:

<Location /svn-proxy-sync>
  DAV svn
  SVNPath /var/svn/repos
  Order deny,allow
  Deny from all
  # Only let the server's IP address access this Location:
  Allow from 10.20.30.40
  …
</Location>

##### 设置备份

主服务器和从服务器上的 `Location` 配置完毕后, 接下来需要配置主服务器将修改复制给所有的从服务器, 其中需要用到 **svnsync**, 关于该命令的详细介绍在 [“使用 svnsync 复制仓库”一节](https://svnbook.red-bean.com/nightly/zh/svn.reposadmin.maint.html#svn.reposadmin.maint.replication.svnsync "使用 svnsync 复制仓库").

首先要确保的是从服务器上的每一个仓库都含有钩子脚本 pre-revprop-change, 该脚本用于开启版本号属性修改 (修改版本号属性 是接收端接收到 **svnsync** 结束时的标准步骤). 然后 登录到主服务器, 将每一个从服务器的仓库配置为从主服务器本地磁盘上 的仓库接收数据:

$ svnsync init http://slave1.example.com/svn-proxy-sync \\
               file:///var/svn/repos
Copied properties for revision 0.
$ svnsync init http://slave2.example.com/svn-proxy-sync \\
               file:///var/svn/repos
Copied properties for revision 0.
$ svnsync init http://slave3.example.com/svn-proxy-sync \\
               file:///var/svn/repos
Copied properties for revision 0.

# Perform the initial replication

$ svnsync sync http://slave1.example.com/svn-proxy-sync \\
               file:///var/svn/repos
Transmitting file data ....
Committed revision 1.
Copied properties for revision 1.
Transmitting file data .......
Committed revision 2.
Copied properties for revision 2.
…

$ svnsync sync http://slave2.example.com/svn-proxy-sync \\
               file:///var/svn/repos
Transmitting file data ....
Committed revision 1.
Copied properties for revision 1.
Transmitting file data .......
Committed revision 2.
Copied properties for revision 2.
…

$ svnsync sync http://slave3.example.com/svn-proxy-sync \\
               file:///var/svn/repos
Transmitting file data ....
Committed revision 1.
Copied properties for revision 1.
Transmitting file data .......
Committed revision 2.
Copied properties for revision 2.
…

上面的命令执行完后, 修改主服务器的钩子脚本 post-commit, 使得在提交完成后, 调用 **svnsync** 将版本号复制 给每一个从服务器:

#!/bin/sh
# Post-commit script to replicate newly committed revision to slaves

svnsync sync http://slave1.example.com/svn-proxy-sync \\
             file:///var/svn/repos > /dev/null 2>&1 &
svnsync sync http://slave2.example.com/svn-proxy-sync \\
             file:///var/svn/repos > /dev/null 2>&1 &
svnsync sync http://slave3.example.com/svn-proxy-sync \\
             file:///var/svn/repos > /dev/null 2>&1 &

每一行末尾的 `&` 并非绝对必需, 添加它的 目的是为了让命令在后台执行, 于是 Subversion 客户端就不必等待 post-commit 脚本里的命令全部执行完毕. 除了 post-commit 钩子脚本, 管理员还要编写 post-revprop-change 钩子脚本, 以便在用户修改了版本 号属性 (例如日志消息) 后, 从服务器也能接收到这个修改:

#!/bin/sh
# Post-revprop-change script to replicate revprop-changes to slaves

REV=${2}
svnsync copy-revprops http://slave1.example.com/svn-proxy-sync \\
                      file:///var/svn/repos \\
                      -r ${REV} > /dev/null 2>&1 &
svnsync copy-revprops http://slave2.example.com/svn-proxy-sync \\
                      file:///var/svn/repos \\
                      -r ${REV} > /dev/null 2>&1 &
svnsync copy-revprops http://slave3.example.com/svn-proxy-sync \\
                      file:///var/svn/repos \\
                      -r ${REV} > /dev/null 2>&1 &

现在还未处理的就是用户级别的锁 (也就是与 **svn lock** 相关的锁), 在提交操作执行期间, 由主 服务器完成锁的施加, 但是关于锁的全部信息在读取操作 (例如由从服务器 负责处理的 **svn update** 和 **svn status**) 执行期间, 需要进行分发. 因此, 一个功能完善的代理设置需要把主服务器中与锁有关的信息复制到 从服务器上. 不幸的是, 该问题的大多数解决方案无论如何都达不到要求 [\[65\]](#ftn.id9501). 很多团队根本就不使用 Subversion 的锁, 所以这些解决方案存在的问题并不会给你带来麻烦. 不过对于那些确实要用到锁的团队而言, 我们目前也无法提供有用的建议.

##### 警告

主从副本系统现在就可以正式工作了, 不过有些事情需要提前注意. 这里介绍的副本策略不能抵抗服务器或网络崩溃的情况. 举例来说, 如果 其中一个 **svnsync** 由于某种原因失败了, 那么从 服务器就会悄无声息的失败, 即使有用户声称他们已经提交了版本号 100, 但是后面执行 **svn update** 时, 本地从服务器将告诉 他们版本号 100 并不存在! 当然, 如果又有新的提交发生, 并且随后的 **svnsync** 都执行成功了, 那么问题就会被自动地修复 —**svnsync** 会复制所以未复制的版本号. 不过 管理员仍然想设置某种带外的监控, 以便能够侦测到失败的同步, 并强制 运行 **svnsync**, 修正错误.

直写代理的另一个限制涉及到主服务器与从服务器的 Subversion 版本不匹配. 新发布的 Subversion 很可能为服务器与客户端之间所使用 的网络协议添加了新特性, 由于客户端只和从服务器进行特性协商, 因此 最终使用的协议版本和特性集合由从服务器的 Subversion 版本决定. 不过, 写操作是被逐字逐句地传递给主服务器, 因此, 如果主服务器的 Subversion 版本较旧, 从服务器在与客户端进行特性协商时, 可能会返回从服务器 支持, 而主服务器不支持的特性, 结果是客户端使用了主服务器不理解的 特性, 最终导致操作失败.

为了缓和上面的问题, Subversion 1.8 引入了一个新的 Apache 配置 指令—`SVNMasterVersion`. 在每个从服务器上, 把 `SVNMasterVersion` 都设置成主服务器的 Subversion 版本号, 这样从服务器在与客户端协商特性时, 就会考虑到主 服务器的 Subversion 版本.

不幸的是, Subversion 1.7 不支持配置指令 `SVNMasterVersion`, 如果从服务器的版本是 Subversion 1.7, 而主服务器的版本比 Subversion 1.7 旧, 那么管理员 就需要在从服务器的 `<Location>` 配置块里 加上配置指令 `SVNAdvertiseV2Protocol Off`.

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>为了尽量减少可能的麻烦, 最好在主服务器和从服务器上运行相 同版本的 Subversion.</p></td></tr></tbody></table>

#### Apache 的其他特性

作为一个优秀的网页服务器, Apache 提供的诸多特性同样也可以用于 提高 Subversion 的功能性与安全性. 如果 Subversion 客户端在编译时 打开了对 SSL (Secure Socket Layer, 安全套接字层, 前面我们已经介绍 过了) 的支持, 客户端就可以使用 `https://` 形式 的 URL 访问 Apache 服务器, 享受高质量的加密网络服务.

同样有用的特性还包括支持端口指定 (而不是使用默认的 HTTP 80 端口), 或者是为 Subversion 仓库指定一个虚拟域名, 或者是支持通过 HTTP 代理 访问仓库.

最后, 由于 **mod\_dav\_svn** 使用的是 WebDAV/DeltaV 协议的一个子集, 所以说我们还可以通过第三方的 DAV 客户访问仓库. 大多 数现代操作系统 (Win32, OS X 和 Linux) 都支持把 DAV 服务器作为一个 标准的网络 “共享目录” 挂载到本地. 这是一个比较复杂 的主题, 但是一旦实现就会觉得非常奇妙, 更多的细节见 [附录 C, _WebDAV 与自动版本控制_](https://svnbook.red-bean.com/nightly/zh/svn.webdav.html "附录 C. WebDAV 与自动版本控制").

注意, 除了我们这里介绍的之外, **mod\_dav\_svn** 还 有很多不常用的配置, 对于感兴趣的读者, 我们在 [“mod\_dav\_svn 配置指令”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.httpd.html#svn.serverconfig.httpd.ref.mod_dav_svn "mod_dav_svn 配置指令") 列出了可用 在 `httpd.conf` 中的所有 **mod\_dav\_svn** 配置指令.

### Subversion Apache HTTP 服务器配置参考

在上面一节, 我们介绍了很多配置指令, 通过在 `httpd.conf` 中使用这些配置指令, 管理员就可以 配置 Subversion 服务器的具体行为, 以及服务器所能提供的功能. 本节将 快速总结 Subversion 提供的 Apache HTTP 服务器模块的 _所有_ 配置指令.

#### mod\_dav\_svn 配置指令

下面是 Subversion 提供的 Apache HTTP 服务器模块 **mod\_dav\_svn** 支持的所有配置指令.

`DAV svn`

必须被包含在 Subversion 仓库的 `Directory` 或 `Location` 配置块内. `DAV svn` 告诉 **httpd** 使用 Subversion 提供的 **mod\_dav** 后端驱动 处理所有的请求.

``SVNActivitiesDB _`directory-path`_``

指定活动数据库的存放目录. 默认情况下, **mod\_dav\_svn** 使用仓库中的 `dav/activities.d` 作为活动数据库的存放 目录 (若没有则创建该目录). 该选项所指定的目录路径必须是绝对 路径.

如果定义了 `SVNParentPath`, **mod\_dav\_svn** 就会把仓库路径的最后一个分量 附加到 `SVNActivitiesDB` 所指定的路径上, 例如:

<Location /svn>
  DAV svn

  # any "/svn/foo" URL will map to a repository in 
  # /net/svn.nfs/repositories/foo
  SVNParentPath         "/net/svn.nfs/repositories"

  # any "/svn/foo" URL will map to an activities db in
  #  /var/db/svn/activities/foo
  SVNActivitiesDB       "/var/db/svn/activities"
</Location>

`SVNAdvertiseV2Protocol On|Off`

在 Subversion 1.7 引入, 该配置指令决定 **mod\_dav\_svn** 是否应该支持 1.7 引入的新版 HTTP 协议. 大多数管理员都会选择禁止 `SVNAdvertiseV2Protocol` (而默认值是 `On`). 如果选择打开 `SVNAdvertiseV2Protocol`, 就能享受到新版 协议带来的性能提升. 然而, 如果服务器被设置为另一个服务器的 直写代理, 而另一个服务器并不支持新版协议, 那就要设置成 `Off`.

`SVNAllowBulkUpdates On|Off|Prefer`

该配置指令决定, 对于更新类型的请求, 是否支持全包含 (all-inclusive) 的响应. Subversion 客户端通过发送请求 `REPORT` 向服务器索取关于目录检出和更新 的信息, 客户端可以请求服务器以两种方式之一返回信息: 在一个 单独的响应中携带全部的信息, 或者是只返回一段概略性的信息, 然后 Subversion 客户端再根据这段信息, 向服务器请求 _额外的_ 数据. 如果 `SVNAllowBulkUpdates` 被设置成 `Off`, **mod\_dav\_svn** 将 按照第二种方式响应 `REPORT` 请求, 无论客户 端所请求的是哪一种响应类型.

`SVNAllowBulkUpdates` 的默认值是 `On`, 也就是说服务器会根据客户端所请求的 响应类型来回复请求. 从 Subversion 1.8 开始, `SVNAllowBulkUpdates` 也可以被设置成 `Prefer`, 它和 `On` 类似, 但是服务器将向客户端宣告它 _更喜欢_ 按 照第一种方式处理更新请求.

大多数人根本就不会用到这个配置指令, 它的存在主要是为了满足 管理员的这种需要—为了安全或审计需要, 强迫 Subversion 客户端在更新或检出时, 单独地抓取文件与目录, 从而在 Apache 的 日志里留下请求 `GET` 和 `PROPFIND` 的审计记录.

`SVNAutoversioning On|Off`

如果配置指令的值是 `On`, 来自 WebDAV 的写请求将自动生成提交, 版本号的日志消息也是一条自动生成的 消息. 如果 `SVNAutoversioning` 的值是 `On`, 你可能还需要设置上 `ModMimeUsePathInfo On`, 于是 **mod\_mime** 就能自动地为文件设置正确的 `svn:mime-type` 属性 (当然, **mod\_mime** 也只能尽最大努力做到正确). 更多的 细节见 [附录 C, _WebDAV 与自动版本控制_](https://svnbook.red-bean.com/nightly/zh/svn.webdav.html "附录 C. WebDAV 与自动版本控制"). `SVNAutoversioning` 的默认值是 `Off`.

`SVNCacheFullTexts On|Off`

如果被设置成 `On`, 并且内存缓存足够, Subversion 将全文缓存文件的内容, 这可以极大地提升服务器的性能. (另请参阅 `SVNInMemoryCacheSize`) 默认值是 `Off`.

`SVNCacheTextDeltas On|Off`

如果被设置成 `On` 并且内存缓存足够, Subversion 将缓存文件内容的差异部分, 这可以极大地提升服务器 的性能. (另请参阅 `SVNInMemoryCacheSize`) 默认值是 `Off`.

``SVNCompressionLevel _`level`_``

指定在网络上传输文件内容时所用的压缩级别. 把 `SVNCompressionLevel` 设置成 `0` 将禁止压缩, 最大值是 `9`, 默认值是 `5`.

``SVNHooksEnv _`file-path`_``

指定 Subversion 仓库钩子脚本环境配置文件的路径, 这个配置文件 描述了钩子脚本运行时的初始环境, 更多的细节见 [“钩子脚本环境配置”一节](https://svnbook.red-bean.com/nightly/zh/svn.reposadmin.create.html#svn.reposadmin.hooks.configuration "钩子脚本环境配置").

``SVNIndexXSLT _`directory-path`_``

为目录索引指定一个 XML 变换规则的 URI, 该配置指令是可选的.

``SVNInMemoryCacheSize _`size`_``

指定 Subversion 每个进程的内存对象缓存的最大大小 (单位 KB). 默认值是 `16384`, 把 `SVNInMemoryCacheSize` 设置为 `0` 表示禁止缓存.

`SVNListParentPath On|Off`

如果设置为 `On`, 将允许客户端向 `SVNParentPath` 发送 `GET` 请求, 请求的结果是返回目录 `SVNParentPath` 下的所有仓库组成的列表. 默认值是 `Off`.

``SVNMasterURI _`url`_``

指定 Subversion 主仓库的 URI (用于设置直写代理).

``SVNMasterVersion _`X.Y`_``

指定主仓库的 Subversion 服务器的版本 (用于设置直写代理).

``SVNParentPath _`directory-path`_``

指定一个目录路径, 而该目录的子目录都是 Subversion 仓库. 在一个 Subversion 仓库的配置块内, 要么出现 `SVNParentPath`, 要么出现 `SVNPath`, 但这两个配置指令不能同时出现或都 不出现.

``SVNPath _`directory-path`_``

指定一个 Subversion 仓库的路径. 在一个 Subversion 仓库的 配置块内, 要么出现 `SVNPath`, 要么出现 `SVNParentPath`, 但这两个配置指令不能同时出 现或都不出现.

`SVNPathAuthz On|Off|short_circuit`

控制基于路径的授权检查, 控制方式包括允许子请求 ( `On`), 禁止子请求 (`Off`, 见 [“禁止基于路径的检查”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.httpd.html#svn.serverconfig.httpd.authz.pathauthzoff "禁止基于路径的检查")), 或者直接询问 **mod\_authz\_svn** ( `short_circuit`). 默认值是 `On`.

``SVNReposName _`name`_``

指定 Subversion 仓库在 `HTTP GET` 响应 中所使用的名字. 这个值将作为所有目录列表的标题 (使用网页浏览 器浏览 Subversion 仓库时将会看到该标题). 该配置指令是可选的.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>当 Subversion 尝试匹配访问控制文件里的规则时, 不会用到 <code>SVNReposName</code> 所指定的名字. 用于匹配访问 控制文件的仓库名总是来自仓库的 URL, 更多的细节见 <a href="https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.pathbasedauthz.html#svn.serverconfig.pathbasedauthz.getting-started" title="基于路径的访问控制">“基于路径的访问控制”一节</a>.</p></td></tr></tbody></table>

``SVNSpecialURI _`component`_``

为特殊的 Subversion 资源指定 URI 分量 (名字空间). 默认 值是 `!svn`, 绝大多数管理员从来不会用到这个 配置指令, 除非仓库中存在名为 `!svn` 的 文件. 如果你在服务器投入使用后再修改此值, 那么所有已存在的 工作副本都将无法正确工作, 用户也会把怒火发泄到你身上.

`SVNUseUTF8 On|Off`

如果设置为 `On`, **mod\_dav\_svn** 将使用 UTF-8 编码的仓库根目录 路径与钩子脚本通信, 并且期望脚本的输出 (例如错误消息) 也是使 用 UTF-8 编码. 默认值是 `Off`, 这意味着 **mod\_dav\_svn** 将使用 ASCII 编码的仓库根目录 路径与钩子脚本交互. 该配置指令在 Subversion 1.8 引进.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>管理员应该确保钩子脚本的字符集和编码方案与所有可能的调用 方式相匹配. 比如说, 某个仓库同时使用 <span><strong>httpd</strong></span> 和 <span><strong>svnserve</strong></span> 暴露给用户, 如果该配置指令 被设置为 <code>On</code>, 那么 <span><strong>svnserve</strong></span> 也要配置成使用 UTF-8 编码 (通过 在它的环境变量中设置合适的地区选项). 而且, 如果钩子脚本所 访问到的文件系统路径 (例如仓库根目录的路径) 包含了非 ASCII 码字符, 那么这些路径的编码也必须和脚本的编码方案相匹配.</p></td></tr></tbody></table>

#### mod\_authz\_svn 配置指令

以下的配置指令由 **mod\_authz\_svn** 提供, 它是 Subversion 基于路径授权的 Apache HTTP 服务器模块. 关于如何在 Subversion 中使用基于路径的授权, 见 [“基于路径的授权”一节](https://svnbook.red-bean.com/nightly/zh/svn.serverconfig.pathbasedauthz.html "基于路径的授权").

`AuthzForceUsernameCase Upper|Lower`

在检查授权之前, 把已认证的用户名转换成大写或小写形式. 当 用户名与授权规则文件中记录的用户名相比较时, 是区分大小写的, 这个配置指令可以把大小写混合的用户名转换成大小写一致的形式.

``AuthzSVNAccessFile _`file-path`_``

在路径为 `file-path` 的文件中查找访问 权限配置, 访问权限配置描述了 Subversion 仓库中的路径的 访问权限. 在 Subversion 仓库的配置块内, 可以出现这个配置指令或 `AuthzSVNReposRelativeAccessFile`, 但不能同 时出现.

从 Subversion 1.8 开始, `AuthzSVNAccessFile` 接受一个 URL 作为参数, 这个 URL 指向了 Subversion 仓库内的一个文件, 这个仓库可以是 应用规则文件的同一仓库或不同仓库.

`AuthzSVNAnonymous On|Off`

设置成 `Off`, 将禁止模块 **mod\_authz\_svn** 的两个特例行为: 与配置指令 `Satisfy Any` 的相互影响, 和强制实施授权策略 (即使没有出现配置指令 `Require`). 该配置指令的 默认值是 `On`.

`AuthzSVNAuthoritative On|Off`

设置成 `Off` 将允许把访问控制传递到下层 模块. 默认值是 `On`.

`AuthzSVNNoAuthWhenAnonymousAllowed On|Off`

设置成 `On` 将禁止匿名用户发来的请求的 认证与授权检查, 默认值是 `On`.

``AuthzSVNReposRelativeAccessFile _`file-path`_``

在路径为 `file-path` 的文件中查找访问 权限配置, 访问权限配置描述了 Subversion 仓库中的路径的 访问权限. 和 `AuthzSVNAccessFile` 不同的是, `AuthzSVNReposRelativeAccessFile` 定义的是相 对于仓库中的 `conf/` 目录的路径. 换句话说, 由 `file-path` 所指定的文件, 必须能让仓库 通过相对路径访问到. 在仓库的配置块内, 可以出现配置指令 `AuthzSVNReposRelativeAccessFile` 或 `AuthzSVNAccessFile`, 但两者不能同时出现. 该配置指令在 Subversion 1.7 引进.

从 Subversion 1.8 开始, `AuthzSVNReposRelativeAccessFile` 接受一个 URL 作为参数, 这个 URL 指向了 Subversion 仓库内的一个文件, 这个仓库可以是应用规则文件的同一仓库或不同仓库.

  

* * *

[\[61\]](#id8825) 他们真得很讨厌这样做.

[\[64\]](#id9169) 但是, 自签署的证书仍然无法抵御 “中间人 攻击” (在客户端首次见到证书之前), 和嗅探敏感数据相比, 这种攻击更难防范.
