#### 28.2.1.1. 前提条件[](#_前提条件)

本章假定您具备如下条件：

-   您有一个 ISP 提供的用于连接使用 PPP 的帐号。
    
-   您需要有连接在系统上， 并做了正确配置的 modem， 或其他能够连接您 ISP 的设备。
    
-   ISP 的拨号号码。
    
-   您的登录名称和密码 (可能是一般的 UNIX 风格的登录名和密码对， 也可能是 PAP 或 CHAP 登录名和密码对)。
    
-   一个或多个域名服务器 IP 地址。 通常， 您会从ISP处得到两个这样的IP地址。 如果您至少得到了一个， 就可以在文件 ppp.conf 中加入 `enable dns` 命令使 ppp 设置域名服务。 这个功能取决于 ISP 对支持 DNS 协商的具体实现。
    

下面的信息由您的 ISP 提供， 但不是必需的：

-   ISP的网关IP地址。 网关是您准备连接， 并设为 _默认路由_ 的主机。 如果您没有这个信息， 您可以虚构一个， 在连接时 ISP 的 PPP 服务器会自动告诉您正确的值。
    
    这个虚构的 IP 地址在 ppp 中记做 `HISADDR`。
    
-   准备使用的子网掩码。 如果ISP没有提供， 一般使用 `255.255.255.255` 是没有问题的。
    
-   如果 ISP 提供了静态的IP地址和主机名， 可以输入它们。 反之， 则应让对方主机指定它认为合适的 IP 地址。
    

如果您不知道这些信息， 请与您的 ISP 联系。

<table><tbody><tr><td><i title="Note"></i></td><td><p>在这节中， 所有作为例子展示的配置文件中都有行号。 这些行号只是为了使解释和讨论变得方便， 在真实的文件中并不存在。 此外， 在必要时应使用 Tab 和空格来进行缩进。</p></td></tr></tbody></table>

#### 28.2.1.2. PPP自动化配置[](#_ppp自动化配置)

`ppp`和`pppd`(PPP的内核级实现， 仅限 FreeBSD 7.X) 都使用 /etc/ppp 目录中的配置文件。 用户级 PPP 的例子可以在 /usr/shared/examples/ppp/ 中找到。

配置`ppp`要求根据您的需要编辑几个文件。 编辑哪几个文件取决于您的 IP 是静态分配 (每次都使用同一个地址) 还是动态分配的 (每次连接到 ISP 都会获得不同的 IP 地址)。

##### PPP和静态IP地址[](#userppp-staticIP)

您需要编辑配置文件/etc/ppp/ppp.conf， 如下所示。

<table><tbody><tr><td><i title="Note"></i></td><td><p>以冒号<code>:</code>结尾的行从第一列 (行首)开始， 其它所有的行都要使用空格或制表符 (Tab) 来缩进。</p></td></tr></tbody></table>

1     default:
2       set log Phase Chat LCP IPCP CCP tun command
3       ident user-ppp VERSION (built COMPILATIONDATE)
4       set device /dev/cuau0
5       set speed 115200
6       set dial "ABORT BUSY ABORT NO\\\\sCARRIER TIMEOUT 5 \\
7                 \\"\\" AT OK-AT-OK ATE1Q0 OK \\\\dATDT\\\\T TIMEOUT 40 CONNECT"
8       set timeout 180
9       enable dns
10
11    provider:
12      set phone "(123) 456 7890"
13      set authname foo
14      set authkey bar
15      set login "TIMEOUT 10 \\"\\" \\"\\" gin:--gin: \\\\U word: \\\\P col: ppp"
16      set timeout 300
17      set ifaddr x.x.x.x y.y.y.y 255.255.255.255 0.0.0.0
18      add default HISADDR

行1：

指定默认的项。 当PPP运行时这个项中的命令将自动执行。

行2：

启用登录参数。 工作正常后， 为避免产生过多的日志文件， 这行应该简化为：

set log phase tun

行 3：

告诉 PPP 怎样向对方标识自己。 如果在建立或使用连接时遇到任何麻烦， PPP就会向对方主机自我标识。 对方主机管理员在处理这个问题时， 这些信息会有用。

行 4：

标明modem要连接的端口号。 COM1 对应的设备是 /dev/cuau0 而 COM2 对应的则是 /dev/cuau1。

行 5：

设置连接的速度。 如果 115200 有问题， 试试 38400。

行 6 & 7：

拨号字符串。 用户级 PPP 使用一种与 [chat(8)](https://man.freebsd.org/cgi/man.cgi?query=chat&sektion=8&format=html)程序相似的语法。 请参考联机手册了解这种语言的相关信息。

注意， 为了便于阅读此命令进行了换行。 任何 ppp.conf 里的命令都可以这样做， 前提是行的最后一个字符必须是 `\`。

行 8：

设置连接的时间间隔。 默认是 180 秒， 所以这一行是多余的。

行 9：

告诉PPP向对方主机确认本地域名解析设置。 如果您运行了本地的域名服务器， 要注释或删除掉这一行。

行 10：

为了可读性的需要设置一个空行。 空行会被PPP忽略。

行 11：

为 "provider"指定一个项。 可以改成 ISP的名字， 这样您以后就可以使用 `load _ISP_` 来开启连接。

行 12：

设置提供商的电话号码。 多个电话号码可以使用冒号 (`:`) 或管道符号 (`|`) 隔开。 这两个字符的区别在[ppp(8)](https://man.freebsd.org/cgi/man.cgi?query=ppp&sektion=8&format=html)的联机手册中有介绍。 总的来讲， 如果您要循环使用这些号码， 可以使用冒号。 如果您想使用第一个号码， 当第一个号码失败了再用第二个号码， 就使用管道符号。 如所示的那样， 要给整个电话号码加上引号(")。

如果电话号码里有空格， 必须用引号(`"`)将其括起来。 否则会造成简单却难以察觉的错误。

行 13 & 14：

指定用户名和密码。 当使用 UNIX® 风格的命令提示符登录时， 这些值可以用带有 \\U \\P 参数的 `set login` 命令进行修改。 当使用PAP或CHAP进行连接时， 这些值在验证使用。

行 15：

如果您使用的是PAP或者CHAP， 在这里就不会有登录。 要注释或删除掉这一行。 请参考 [PAP 和 CHAP认证](#userppp-PAPnCHAP) 以了解更多细节。

登录命令是的语法是chat类型的。 在这个例子中是这样的：

```
J. Random Provider
login: foo
password: bar
protocol: ppp
```

您需要改变这个脚本以适合您自己的需要。 当您第一次写这个脚本时， 应当确保已经启用 "chat" 并处于登录状态， 这样您才能确认通信是否正在按计划进行。

行16：

设置默认的超时时间。 这里， 连接若在 300 秒内无响应将被断开。如果您不想设置成超时， 将这个值设置成0， 或在命令行使用 `-ddial` 选项。

行 17：

设置接口地址。 您需要用 ISP 提供给您的 IP 地址替换字符串 _x.x.x.x_， 用 ISP 的网关 IP 地址 (即您要连接的主机) 替换字符串 _y.y.y.y_。 如果ISP没有给您提供网关地址， 可以使用 `10.0.0.2/0`。 如果您需要使用一个 "猜到"的地址， 请确保在 /etc/ppp/ppp.linkup 中为每个 [PPP和动态IP地址](#userppp-dynamicIP) 指令创建了这一项。 如果没有这一行， `ppp` 将无法以 `-auto` 模式运行。

第18行：

添加一个到ISP网关的默认路由。 `HISADDR`这个关键字会被第17行所指定的网关地址替换。 这行必须出现在第17行之后，以免在 `HISADDR` 初始化之前使用它的值。

如果您不想使用 `-auto` 的 PPP，则这行应挪到 ppp.linkup 文件中。

若您有一个静态IP地址， 且使用`-auto` 模式运行ppp(因为在连接之前已经正确设置了路由表项)， 那就不需要再向ppp.linkup 添加项。 您可能希望在连接以后创建一个项来调用程序。 这在以后的sendmail的例子中会解释。

示例配置文件可以在目录 /usr/shared/examples/ppp/ 中找到。

##### PPP和动态IP地址[](#userppp-dynamicIP)

如果ISP没给您指定静态的IP地址， `ppp`要被配置成能够与对方协商确定本地和远程地址。 要完成这项工作， 先要"猜"一个IP地址， 然后允许 `ppp`在连接后使用IP配置协议(IPCP)进行正确配置。 ppp.conf的配置是与 [PPP和静态IP地址](#userppp-staticIP)一样的， 除了以下的改变：

17      set ifaddr 10.0.0.1/0 10.0.0.2/0 255.255.255.255 0.0.0.0

再次强调， 不要包括行号， 它只是一个引用标记。 缩排一个空格是必需的。

行17：

`/` 字符后面是 PPP 所要求的地址掩码。 您可以根据需要使用不同 IP 地址， 但以上的例子永远是可行的。

最后的参数(`0.0.0.0`)告诉 PPP从`0.0.0.0` 而不是 `10.0.0.1` 开始协商地址， 对于有些ISP， 这是必需的。 不要将 `0.0.0.0` 作为 `set ifaddr` 的第一个参数， 因为这使得 PPP 在 `-auto` 模式时不能设置初始路由。

如果您不运行`-auto`模式， 就需要在/etc/ppp/ppp.linkup中创建一个项。 连接建立之后， ppp.linkup被启用。 这时候， `ppp`将指派接口地址， 接着再添加路由表项：

1     provider:
2        add default HISADDR

行 1：

为了建立连接， `ppp` 会按照如下规则在 ppp.linkup寻找项:首先， 试图寻找相同的标签 (如同在ppp.conf一样）。 如果失败了， 寻找作为网关 IP 地址的项， 此项是四个八位字节的风格。 如果依旧没有找到， 就寻找 `MYADDR` 项

行 2：

这行告诉 `ppp`添加指向 `HISADDR`的默认路由。 `HISADDR`由通过IPCP协商得到的IP号替换。

参考/usr/shared/examples/ppp/ppp.conf.sample 和/usr/shared/examples/ppp/ppp.linkup.sample 中的`pmdemand`项以获取细节化的例子。

##### 接收拨入[](#_接收拨入)

当要配置 ppp接受来自LAN上的 拨入时， 您需要决定是否将包转给LAN。 如果是的话， 您就必须从 LAN 子网中给对方分配一个IP， 需要在文件 /etc/ppp/ppp.conf 中使用命令 `enable proxy`。 您还应该确定文件 /etc/rc.conf 中包含以下内容：

gateway\_enable="YES"

##### 使用哪个getty？[](#_使用哪个getty)

使用 `mgetty` 的好处是它能积极地与 modem 进行 _会话_， 这就意味着如果在/etc/ttys中的端口被关闭， 您的moderm就不会回应拨入。

较新版本的 `mgetty` (从 0.99beta 起) 也支持自动检测 PPP 数据流， 这样即便客户端不使用脚本也能访问服务器了。

参考[Mgetty 和 AutoPPP](#userppp-mgetty)的联机手册了解更多信息。

##### PPP 权限[](#_ppp_权限)

`ppp` 命令通常必须以 `root` 用户的身份运行。 如果希望以普通用户的身份启动 `ppp` 服务 (就像下面描述的那样)， 就必须把此用户加入 `network` 组， 使其获得运行 `ppp` 的权限。

您还需要使用`allow`命令使用户能访问配置文 件的一个或多个部分：

allow users fred mary

如果这个命令被用在 `default` 部分中， 您可以让指定的用户访问任何东西。

##### 动态IP用户的PPP Shell[](#_动态ip用户的ppp_shell)

创建一个名为/etc/ppp/ppp-shell文件， 加入以下内容：

#!/bin/sh
IDENT=\`echo $0 | sed -e 's/^.\*-\\(.\*\\)$/\\1/'\`
CALLEDAS="$IDENT"
TTY=\`tty\`

if \[ x$IDENT = xdialup \]; then
        IDENT=\`basename $TTY\`
fi

echo "PPP for $CALLEDAS on $TTY"
echo "Starting PPP for $IDENT"

exec /usr/sbin/ppp -direct $IDENT

这个脚本要有可执行属性。 然后通过如下命令创建一个指向此脚本且名为 ppp-dialup的符号链接：

```
# ln -s ppp-shell /etc/ppp/ppp-dialup
```

您应该将这个脚本作为所有拨入用户的 _shell_。 以下是在文件 /etc/passwd 中关于 PPP 用户 `pchilds` 的例子 (切记， 不要直接修改这个密码文件， 用 [vipw(8)](https://man.freebsd.org/cgi/man.cgi?query=vipw&sektion=8&format=html) 来修改它)。

pchilds:\*:1011:300:Peter Childs PPP:/home/ppp:/etc/ppp/ppp-dialup

创建一个名为 /home/ppp 的目录作为拨入用户的主目录， 其中包含以下这些空文件：

```
-r--r--r--   1 root     wheel           0 May 27 02:23 .hushlogin
-r--r--r--   1 root     wheel           0 May 27 02:22 .rhosts
```

这样就可以防止/etc/motd被显示出来。

##### 静态IP用户的Shell[](#_静态ip用户的shell)

像上面那样创建ppp-shell文件， 为每个静态分配IP用户创建一个到 ppp-shell的 符号链接。

例如， 如果您希望为三个拨号用户， `fred`， `sam`， 和 `mary` 路由 /24 CIDR 的网络， 则需要键入以下内容：

```
# ln -s /etc/ppp/ppp-shell /etc/ppp/ppp-fred
# ln -s /etc/ppp/ppp-shell /etc/ppp/ppp-sam
# ln -s /etc/ppp/ppp-shell /etc/ppp/ppp-mary
```

每个用户的Shell必须被设成一个符号链接(例如用户 `mary`的Shell应该是/etc/ppp/ppp-mary)。

##### 为动态IP用户设置ppp.conf[](#_为动态ip用户设置ppp_conf)

/etc/ppp/ppp.conf文件应该包含下面 这些行：

default:
  set debug phase lcp chat
  set timeout 0

ttyu0:
  set ifaddr 203.14.100.1 203.14.100.20 255.255.255.255
  enable proxy

ttyu1:
  set ifaddr 203.14.100.1 203.14.100.21 255.255.255.255
  enable proxy

<table><tbody><tr><td><i title="Note"></i></td><td><p>缩进得必须的。</p></td></tr></tbody></table>

`default:`项在每次会话时都会加载。 每个在 /etc/ttys 中启用的行都必须为其创建一个相似于 `ttyu0:` 的项。 每一行应该从动态 IP 地址池中取得唯一的IP地址。

##### 为静态 IP 用户配置 ppp.conf[](#_为静态_ip_用户配置_ppp_conf)

根据上面 /usr/shared/examples/ppp/ppp.conf 文件的内容， 您必须为每个静态拨号用户添加一个项。 我们继续以 `fred`、 `sam` 以及 `mary`为例。

fred:
  set ifaddr 203.14.100.1 203.14.101.1 255.255.255.255

sam:
  set ifaddr 203.14.100.1 203.14.102.1 255.255.255.255

mary:
  set ifaddr 203.14.100.1 203.14.103.1 255.255.255.255

如果需要， /etc/ppp/ppp.linkup 也应该包括每个静态IP用户的的路由信息。 下面这一行为客户连接添加了到 `203.14.101.0/24` 网络的路由。

fred:
  add 203.14.101.0 netmask 255.255.255.0 HISADDR

sam:
  add 203.14.102.0 netmask 255.255.255.0 HISADDR

mary:
  add 203.14.103.0 netmask 255.255.255.0 HISADDR

##### `mgetty`和AutoPPP[](#userppp-mgetty)

默认情况下， [comms/mgetty+sendfax](https://cgit.freebsd.org/ports/tree/comms/mgetty+sendfax/) port 在编译时启用了 `AUTO_PPP` 选项， 它使 `mgetty` 能够检测 PPP 连接的 LCP 状态， 并自动产生 PPP shell。 不过， 由于在默认配置中的 login/password 序列并不出现， 因此， 就必须使用 PAP 或 CHAP 来严重用户身份。

确认您的 /usr/local/etc/mgetty+sendfax/login.config 文件中包含以下内容：

/AutoPPP/ -     -		      /etc/ppp/ppp-pap-dialup

这行告诉`mgetty`运行 ppp-pap-dialup脚本来侦听PPP连接。

创建/etc/ppp/ppp-pap-dialup文件写入以下内容 (此文件应该是可执行的)：

#!/bin/sh
exec /usr/sbin/ppp -direct pap$IDENT

对应于每个在/etc/ttys的启用行， 都要在/etc/ppp/ppp.conf 中创建相应的项。 这和上面的定义是相同的。

pap:
  enable pap
  set ifaddr 203.14.100.1 203.14.100.20-203.14.100.40
  enable proxy

每个以这种方式登录的用户， 都必须在 /etc/ppp/ppp.secret 文件中给出用户名/口令， 或者使用以下选项， 来通过 PAP 方式以 /etc/passwd 文件提供的信息来完成身份验证。

enable passwdauth

如果您想为某些用户分配静态IP， 可以在 /etc/ppp/ppp.secret 中将IP号作为第三个参数指定。 请参见 /usr/shared/examples/ppp/ppp.secret.sample 中的例子。

##### MS Extensions[](#_ms_extensions)

可以配置PPP以提供DNS和NetBIOS域名服务器地址。

要在 PPP 1.x 版本中启用这些扩展， 需要在 /etc/ppp/ppp.conf 的对应项中加入下列配置：

enable msext
set ns 203.14.100.1 203.14.100.2
set nbns 203.14.100.5

PPP版本2及以上：

accept dns
set dns 203.14.100.1 203.14.100.2
set nbns 203.14.100.5

这将告诉客户端首选域名服务器和备用域名服务器。

在版本2及以上版本中， 如果省略了 `set dns`， PPP会使用 /etc/resolv.conf中的值。

##### PAP 和 CHAP 验证[](#userppp-PAPnCHAP)

一些 ISP 将系统配置为使用 PAP 或 CHAP 机制来完成连接验证。 如果遇到这种情况， 在您连接时 ISP 就不会看到 `login:` 提示符， 而是立即开始 PPP 对话。

PAP 安全性要比 CHAP 差一些， 但在这里安全性并不是问题， 因为密码 (即使用明文传送) 只是通过串行线传送， 攻击者并没有太多机会去 "窃听" 它。

参考 [PPP 与静态 IP 地址](#userppp-staticIP) 或 [PPP 与动态 IP 地址](#userppp-dynamicIP) 小节， 并完成下列改动：

13      set authname MyUserName
14      set authkey MyPassword
15      set login

第 13 行：

这一行指明您的PAP/CHAP用户名。 您需要为\_MyUserName\_输入正确的值。

第 14 行：

这一行指明您的 PAP/CHAP password密码。 您需要为 _MyPassword_ 输入正确的值。 另外，您可能希望加入一些额外的选项，例如：

16      accept PAP

或

16      accept CHAP

以明确您的意图， 不过， 默认情况下 PAP 和 CHAP 都会被接受。

行 15：

如果您使用的是 PAP 或 CHAP， 一般来说 ISP 就不会要求您登录服务器了。 这时， 就必须禁用 "set login" 设置。

##### 即时改变您的`ppp` 配置[](#_即时改变您的ppp_配置)

与后台运行的`ppp`程序进行对话是可能的， 前提是设置了一个合适的诊断端口。 做到这一点， 需要把下面的行加入到您的配置中：

set server /var/run/ppp-tun%d DiagnosticPassword 0177

这行告诉 PPP在指定的UNIX®域socket中侦听， 当用户连接时需要给出指定的密码。 `%d`用tun设备号替换。

一旦启用了socket， 就可以在脚本中调用程序[pppctl(8)](https://man.freebsd.org/cgi/man.cgi?query=pppctl&sektion=8&format=html)来处理正在运行的 的PPP。

#### 28.2.1.3. 使用PPP网络地址翻译[](#userppp-nat)

PPP 可以使用内建的 NAT， 而无需内核支持。 您可以在 /etc/ppp/ppp.conf 中加入如下配置来启用它：

nat enable yes

PPP NAT也可以使用命令行选项 `-nat`启动。 在 /etc/rc.conf 文件中也有 `ppp_nat` 项， 并默认启用。

如果您使用了这个特性， 您还会发现在 /etc/ppp/ppp.conf中以下 选项对于启用incoming connections forwarding是有用的：

nat port tcp 10.0.0.2:ftp ftp
nat port tcp 10.0.0.2:http http

或者完全不信任外来的请求

nat deny\_incoming yes

#### 28.2.1.4. 最后的系统配置[](#userppp-final)

现在您已配置了`ppp`， 但在真正工作之前还有一些事情要做。 即修改 /etc/rc.conf。

从上依次往下看， 确认已经正确地配置了 `hostname=`， 例如：

hostname="foo.example.com"

如果您的ISP提供给您一个静态的IP和名字， 将这个名字设为hostname是最合适的。

寻找 `network_interfaces` 变量。 如果要配置系统通过拨号连入ISP， 一定要将tun0设备加入这个列表， 否则就删除它。

network\_interfaces="lo0 tun0"
ifconfig\_tun0=

<table><tbody><tr><td><i title="Note"></i></td><td><p><code>ifconfig_tun0</code>变量应该是空的， 且要创建一个名为 <span>/etc/start_if.tun0</span>的文件。 这个文件应该包含这一行：</p><div><pre>ppp -auto mysystem</pre></div><p>此脚本在网络配置时被执行， 开启PPP守护进程进入自动模式。 如果这台机子充当一个LAN的网关， 您可能希望使用 <code>-alias</code>。 参考相关联机手册了解更多细节。</p></td></tr></tbody></table>

务必在 /etc/rc.conf 中， 把路由程序设置为 `NO`：

router\_enable="NO"

不启动 `routed` 服务程序非常重要， 因为 `routed` 总会删掉由 `ppp` 所建立的默认路由。

此外， 我们建议您确认一下 `sendmail_flags` 这一行中没有指定 `-q` 参数， 否则 `sendmail` 将会不断地尝试查找网络， 而这样做将会导致机器不断地进行拨号。 可以考虑：

sendmail\_flags="-bd"

替代的做法是当每次 PPP 连接建立时您必须通过键入以下命令强制 `sendmail` 重新检查邮件队列：

```
# /usr/sbin/sendmail -q
```

您也可以在ppp.linkup使用`!bg`命令自动完成这些工作：

1     provider:
2       delete ALL
3       add 0 0 HISADDR
4       !bg sendmail -bd -q30m

如果您不喜欢这样做， 可以设立一个 "dfilter" 以阻止 SMTP 传输。 参考相关文件了解更多细节。

现在您唯一要做的事是重新启动计算机。 重启之后，可以输入：

```
# ppp
```

然后是`dial provider`以开启 PPP会话。 或者如果您想让`ppp`自动建立会话， 因为您有一条广域网连接 (且没有创建 start\_if.tun0 脚本)， 键入：

```
# ppp -auto provider
```
