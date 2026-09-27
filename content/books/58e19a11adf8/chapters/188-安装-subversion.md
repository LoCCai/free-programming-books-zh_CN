This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

Subversion 构建在一个可移植函数库之上, 这个函数库叫做 APR (Apache Portable Runtime, Apache 可移植运行库). APR 提供了 Subversion 在不同操作系统平台上运行所需的各种接口: 磁盘访问, 网络访问, 内存管理等. 利用 APR 提供的抽象层, 只要是能运行基于 APR 的应用程序的 操作系统—例如 Windows, Linux, 所有的 BSD, Mac OS X 和 NetWare 等 —都能运行 Subversion.

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>虽然 APR 函数库是 Apache HTTP 服务器 (即 <span><strong>httpd</strong></span>) 的一部分, 并且 <span><strong>httpd</strong></span> 也可以作为 Subversion 仓库的托管服务器, 但 <span><strong>httpd</strong></span> 并不是 Subversion 的 必要组件, 即使你没有 <span><strong>httpd</strong></span>, 仍然可以安装 Subversion.</p></td></tr></tbody></table>

获取 Subversion 最方便的方式就是下载你所用的操作系统对应的 二进制安装包. 在 Subversion 官网 ([http://subversion.apache.org](http://subversion.apache.org)) 经常能够看到由志愿者提供的 安装包, 还包括针对 Windows 的图形化安装包. 如果你的操作系统是类 Unix 系统, 还可以用操作系统自带的软件包管理器 (Yum, APT 等) 下载安装 Subversion.

当然, 你也可以自己从源代码编译安装 Subversion, 虽然这通常不是一件 很容易的事. (如果你没有构建开源软件包的经验, 那么最好还是直接下载已 经编译好的二进制安装包) 构建的第一步是从 Subversion 官网下载最新的源 码包, 把源码包解压后, 按照文件 `INSTALL` 列出的 步骤来编译和安装 Subversion.

如果你是一个追求新技术的极客, 还可以自己从 Subversion 源码的托管 站点下载源代码, 当然, 在下载之前你必须已经有了一个 Subversion 客户端. 一旦有了客户端, 你就可以从 [http://svn.apache.org/repos/asf/subversion](http://svn.apache.org/repos/asf/subversion) 检出 Subversion 的 工作副本[\[79\]](#ftn.id17838):

$ svn checkout http://svn.apache.org/repos/asf/subversion/trunk subversion
A    subversion/HACKING
A    subversion/INSTALL
A    subversion/README
A    subversion/autogen.sh
A    subversion/build.conf
…

上面的命令在当前工作目录中创建了一个工作副本目录 `subversion`, 工作副本里存放的是当前最新 (未发布) 的 Subversion 源代码, 你可以按照自己的需求修改检出后的工作副本目录名. 检出 后, 无论你的工作副本目录叫什么名字, 你都拥有了一份最新的 Subversion 源代码. 当然, 为了构建 Subversion, 你还要下载一些函数库 (例如 apr, apr-util 等)—具体的细节见工作副本顶层目录中的 `INSTALL` 文件.

  

* * *

[\[79\]](#id17838) 注意在下面的例子中, URL 的最后一个路径分量是 `trunk`, 而不是 `subversion`, 这背后的原因可以看一下我们关于 Subversion 分支与标签模型的讨论.
