## 5.16.1. 安装 Coreutils

为编译 Coreutils 做准备：

./configure --prefix=/tools

编译软件包：

make

要测试结果，请运行：**make RUN\_EXPENSIVE\_TESTS=yes check** ，_RUN\_EXPENSIVE\_TESTS=yes_ 参数让测试程序运行几个附加的测试，在某些平台上这些测试会耗费更多的 CPU 和内存，不过一般在 Linux 上不是什么问题。

安装软件包：

make install
