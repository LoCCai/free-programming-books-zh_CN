Linux-Libc-Headers 包含"纯净的"内核头文件。

**预计编译时间：** 少于 0.1 SBU

**所需磁盘空间：** 27 MB

## 6.7.1. 安装 Linux-Libc-Headers

多年来，通常的做法是直接从内核源代码中复制出"原始"内核头文件，放在 /usr/include 中使用。但是最近几年，内核开发人员强烈要求停止这种做法。因此诞生了 Linux-Libc-Headers 项目，其目的就是维护一个 API 版本稳定的内核头文件。

添加一个用户空间头文件和新内核对于inotify特性的系统调用支持:

patch -Np1 -i ../linux-libc-headers-2.6.12.0-inotify-3.patch

安装内核头文件：

install -dv /usr/include/asm
cp -Rv include/asm-i386/\* /usr/include/asm
cp -Rv include/linux /usr/include

确保这些头文件的所有者是 root ：

chown -Rv root:root /usr/include/{asm,linux}

确保用户可以读取这些头文件：

find /usr/include/{asm,linux} -type d -exec chmod -v 755 {} \\;
find /usr/include/{asm,linux} -type f -exec chmod -v 644 {} \\;

**安装的头文件：** /usr/include/{asm,linux}/\*.h

### 简要描述

<table><colgroup><col></colgroup><tbody><tr><td><a id="linux-libc-headers" name="linux-libc-headers"></a><span><tt>/usr/include/{asm,linux}/*.h</tt></span></td><td><p>内核头文件 API</p></td></tr></tbody></table>
