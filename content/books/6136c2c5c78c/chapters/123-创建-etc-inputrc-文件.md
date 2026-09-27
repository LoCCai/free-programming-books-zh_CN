inputrc 文件为特定的情况处理键盘映射，这个文件被 Readline 用作启动文件，Readline 是 Bash 和其它大多数 shell 使用的与输入相关的库。

大多数人并不需要自定义键盘映射，所以下面的命令将创建一个适用于所有登陆用户的全局 /etc/inputrc 文件。如果你需要为某个用户覆盖默认的设置，你可以在该用户的主目录中创建一个包含自定义键盘映射的 .inputrc 文件。

要想了解更多关于如何编辑 inputrc 文件的信息，运行 **info bash** 以参考 bash 的 info 页的 _Readline Init File_ 这一节，运行 **info readline** 以参考readline 自己的 info 页也不错。

下面是一个基本的全局 inputrc 文件，那些选项的注释也一起包括在文件里。请注意，注释不能和命令放在同一行里。

cat > /etc/inputrc << "EOF"
\# Begin /etc/inputrc
# Modified by Chris Lynn <roryo@roryo.dynup.net>

# Allow the command prompt to wrap to the next line
set horizontal-scroll-mode Off

# Enable 8bit input
set meta-flag On
set input-meta On

# Turns off 8th bit stripping
set convert-meta Off

# Keep the 8th bit for display
set output-meta On

# none, visible or audible
set bell-style none

# All of the following map the escape sequence of the
# value contained inside the 1st argument to the
# readline specific functions

"\\eOd": backward-word
"\\eOc": forward-word

# for linux console
"\\e\[1~": beginning-of-line
"\\e\[4~": end-of-line
"\\e\[5~": beginning-of-history
"\\e\[6~": end-of-history
"\\e\[3~": delete-char
"\\e\[2~": quoted-insert

# for xterm
"\\eOH": beginning-of-line
"\\eOF": end-of-line

# for Konsole
"\\e\[H": beginning-of-line
"\\e\[F": end-of-line

# End /etc/inputrc
EOF
