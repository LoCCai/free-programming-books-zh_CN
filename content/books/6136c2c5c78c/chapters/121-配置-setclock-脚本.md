The **setclock**脚本从硬件时钟，也就是 BIOS 或 CMOS 时钟读取时间。如果硬件时钟设置为 UTC ，这个脚本会使用 /etc/localtime 文件(这个文件把用户所在的时区告诉 **hwclock** 程序)将硬件时钟的时间转换为本地时间。没有办法自动检测硬件时钟是否设置为 UTC 时间，因此需要手动设置。

如果您忘了硬件时钟是不是设置为 UTC 时间了，可以运行 **hwclock --localtime --show** 命令，这将显示硬件时钟当前的时间。如果显示的时间符合您的手表的时间，那么硬件时钟设置的是本地时间；如果 **hwclock** 显示的不是本地时间，就有可能设置的是 UTC 时间，可以通过在所显示的 **hwclock** 时间加上或减去您所在时区的小时数来验证。例如，如果您所在的时区是 MST(美国山区时区)，已知是 GMT -0700，在本地时间上加 7 小时。

如果你的硬件使用的_不是_ UTC 时间，就必须将下面的 UTC 变量值设为 _0_ (零)，而"UTC=1"表示使用的是UTC时间。

运行下面的命令新建一个 /etc/sysconfig/clock 文件：

cat > /etc/sysconfig/clock << "EOF"
\# Begin /etc/sysconfig/clock

UTC=1

# End /etc/sysconfig/clock
EOF

在 [_http://www.linuxfromscratch.org/hints/downloads/files/time.txt_](http://www.linuxfromscratch.org/hints/downloads/files/time.txt) 有一个很好的关于如何处理 LFS 时间的提示，说明了例如时区、UTC、TZ 环境变量等等问题。
