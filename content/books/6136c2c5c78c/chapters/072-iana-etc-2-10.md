Iana-Etc 软件包提供了网络服务和协议的数据。

**预计编译时间：** 少于 0.1 SBU

**所需磁盘空间：** 2.1 MB

## 6.15.1. 安装 Iana-Etc

下面的命令将 IANA 的原始数据转换为 /etc/protocols 和 /etc/services 数据文件能够识别的格式：

make

这个软件包没有附带测试程序。

安装软件包：

make install

## 6.15.2. Iana-Etc 的内容

**安装的文件：** /etc/protocols, /etc/services

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="protocols" name="protocols"></a><span><tt>/etc/protocols</tt></span></td><td><p>描述 TCP/IP 子系统可用的各种 Internet 协议。</p></td></tr><tr><td><a id="services" name="services"></a><span><tt>/etc/services</tt></span></td><td><p>将 internet 服务映射到一个包含端口号和所使用协议的文本名称。</p></td></tr></tbody></table>
