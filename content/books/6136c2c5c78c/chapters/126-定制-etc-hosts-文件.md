要在 /etc/hosts 文件里配置网卡的 IP 地址、FQDN 和可能会用的别名，语法如下：

<IP address> myhost.example.org aliases

除非您的计算机在 Internet 上是可访问的(例如，有一个注册的域名并分配到了一个合法的 IP 地址(块)(大多数用户没有))，请确保 IP 地址在私有网络 IP 地址范围内，正确的范围是：

类别     网络
        A     10.0.0.0
        B     172.16.0.0 到 172.31.0.255
        C     192.168.0.0 到 192.168.255.255

一个合法的 IP 地址可能是 192.168.1.1 ，这个 IP 的合法 FQDN 可能是 www.linuxfromscratch.org(不推荐，因为这是个已合法注册的域名，这样做可能会造成域名服务器的问题)。

即使您没有网卡，仍然需要一个 FQDN，某些程序需要这个才能正常工作。

运行下面的命令创建 /etc/hosts 文件：

cat > /etc/hosts << "EOF"
\# Begin /etc/hosts (network card version)

127.0.0.1 localhost
_<192.168.1.1>_ _<HOSTNAME.example.org>_ _\[alias1\] \[alias2 ...\]_

# End /etc/hosts (network card version)
EOF

把 _\[192.168.1.1\]_ 和 _\[<HOSTNAME>.example.org\]_ 更改为特定用户或特别要求所需要的值(如果这台机器要连入一个已存在的网络，并且网络/系统管理员已经给您分配了一个 IP 地址)。

如果您不打算配置网卡，运行下面的命令创建 /etc/hosts 文件：

cat > /etc/hosts << "EOF"
\# Begin /etc/hosts (no network card version)

127.0.0.1 _<HOSTNAME.example.org>_ _<HOSTNAME>_ localhost

# End /etc/hosts (no network card version)
EOF
