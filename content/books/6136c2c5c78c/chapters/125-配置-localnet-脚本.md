**localnet**脚本的一部分工作是设置系统的主机名，这需要在 /etc/sysconfig/network 文件里配置。

运行下面的命令创建 /etc/sysconfig/network 文件并设置主机名：

echo "HOSTNAME=_<lfs>_" > /etc/sysconfig/network

_<lfs>_ 请用您的计算机名替换 _\[lfs\]_ ，不要在这里输入全限定域名(Fully Qualified Domain Name)，FQDN 的信息稍后将放在 /etc/hosts 文件里。
