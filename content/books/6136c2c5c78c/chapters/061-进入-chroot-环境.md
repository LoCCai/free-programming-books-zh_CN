现在将要进入 chroot 环境开始编译安装最终的 LFS 系统了，注意：在这里我们只使用临时构建的工具。以 root 身份运行以下命令进入构建环境：

chroot "$LFS" /tools/bin/env -i \\
    HOME=/root TERM="$TERM" PS1='\\u:\\w\\$ ' \\
    PATH=/bin:/usr/bin:/sbin:/usr/sbin:/tools/bin \\
    /tools/bin/bash --login +h

env 命令的参数 -i 的作用是清除所有 chroot 环境变量。后面是重新设定 HOME, TERM, PS1, PATH 等变量的值。TERM=$TERM 设定虚拟根环境中的 TERM 的值与 chroot 外面的一样。这个值是让像 vim 和 less 之类的程序可以正确操作。如果还需要重新设置其它的值，如 CFLAGS 或 CXXFLAGS ，这里是个不错的位置。

从这里开始，不再需要 LFS 环境变量了，因为所有的工作都被限制在 LFS 文件系统里面。这是由于已经告诉了 Bash shell $LFS 是现在的根目录(/)。

注意，这里 /tools/bin 位于 PATH 的最后面。也就是说当软件包的最终版本安装之后就不再使用临时工具了。为了使 shell 无法"记住"可执行二进制代码的位置，需要通过使用 +h 参数关闭 bash 的散列功能。

注意此时 bash 提示符会显示：I have no name! 这是正常的，因为 /etc/passwd 还没有创建。
