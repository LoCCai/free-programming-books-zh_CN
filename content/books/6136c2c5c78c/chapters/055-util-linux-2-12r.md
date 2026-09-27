## 5.30.1. 安装 Util-linux

Util-linux 默认不使用刚才安装在 /tools 目录下的头文件和库文件，我们更改配置脚本来修正这个问题：

sed -i 's@/usr/include@/tools/include@g' configure

为编译 Util-linux 做准备：

./configure

编译一些支持例程：

make -C lib

我们只需要这个软件包中的少数几个工具，因此只需要编译这几个工具就可以了：

make -C mount mount umount
make -C text-utils more

这个软件包没有附带测试程序。

把这些程序复制到临时工具目录：

cp mount/{,u}mount text-utils/more /tools/bin
