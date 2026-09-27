## 5.5.1. 安装 Linux-Libc-Headers

多年来的公共惯例是使用 /usr/include 目录下"原始的"内核头文件(直接来自于内核源码包)，但是近年来，内核开发者强烈要求不要这样做，因此诞生了 Linux-Libc-Headers 项目，其目标是维护一个API(应用程序编程接口)版本稳定的 Linux 头文件。

安装这些头文件：

cp -Rv include/asm-i386 /tools/include/asm
cp -Rv include/linux /tools/include

如果您的机器不是 i386 兼容架构的，请相应的调整第一条命令。
