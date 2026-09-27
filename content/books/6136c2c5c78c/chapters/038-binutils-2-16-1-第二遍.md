## 5.12.1. 重新安装 Binutils

再次为编译创建一个单独目录：

mkdir -v ../binutils-build
cd ../binutils-build

为编译 Binutils 做准备：

../binutils-2.16.1/configure --prefix=/tools \\
    --disable-nls --with-lib-path=/tools/lib

**新配置选项的含义：**

_\--with-lib-path=/tools/lib_

这个选项指示 configure 脚本在 Binutils 编译过程中将传递给连接器的库搜索路径设为 /tools/lib ，以防止连接器搜索宿主系统的库目录。

编译软件包：

make

现在编译完成了，早先我们谈到过，本章中的临时工具的测试程序并不是必须运行的，如果您要运行 Binutils 的测试程序，请输入下面的命令：

make check

安装软件包：

make install

现在，为下一章的"再次调整工具链"阶段配置连接器：

make -C ld clean
make -C ld LIB\_PATH=/usr/lib:/lib
cp -v ld/ld-new /tools/bin
