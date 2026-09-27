shell 程序 **/bin/bash** (在此之后以“shell”称呼)使用了一个启动文件集全，来帮助创造一个运行的环境。每一个文件都有特定的用处，有的文件还能使登入与交互环境有所不同。放在 /etc 目录下的一些文件提供了全局设置。如果相类似的设置文件出现在某个用户起始文件夹下(~/)，那么在登入该用户时，它将替代该全局设置。

使用 **/bin/login** 读取 /etc/passwd 文件成功登录后，启动了一个交互登录 shell 。用命令行可以启动一个交互非登录 shell(例如 \[prompt\]$**/bin/bash**)。非交互 shell 通常出现在 shell 脚本运行的时候，之所以称为非交互的，因为它正在运行一个脚本，而且命令与命令之间并不等待用户的输入。

要获得更多信息，请运行 **info bash** 以参考 _Bash Startup Files and Interactive Shells_ 小节。

当以交互登录方式运行 shell 的时候，会读取 /etc/profile 和 ~/.bash\_profile 文件。

下面是一个基本的 /etc/profile 文件，设置了本地语言支持所必需的环境变量，适当设置这些变量会导致：

-   程序将产生翻译成本地语言的输出
    
-   正确的将字符分类为字母、数字和其它类，这样做是必要的，可以让 **bash** 在非英语 locale 下正确接收命令行输入的非 ASCII 字符。
    
-   为指定的国家设置正确的字母排序
    
-   适当的默认页面大小
    
-   为货币、时间和日期值设置正确的格式
    

这个脚本还设置了 INPUTRC 环境变量，让 Bash 和 Readline 使用我们先前创建的 /etc/inputrc 文件。

把下面的 _\[ll\]_ 换成您想要设置的两个字母的语言代码(例如"en")，把 _\[CC\]_ 换成适当的两个字母的国家代码(例如"GB")，把 _\[charmap\]_ 换成规范的字符映射表。

Glibc 支持的所有 locales 列表可以使用下列命令获得：

locale -a

很多 locale 有许多别名，比如"ISO-8859-1"也被称为"iso8859-1"和"iso88591"。一些应用程序不能正确的处理这些别名，所以安全的做法是使用 locale 的规范名称。要确定正确的规范名称，运行下面的命令，并把其中的 _\[locale name\]_ 替换成 **locale -a** 命令的输出中你感兴趣的 locale (在这个例子中是"en\_GB.iso88591")。

LC\_ALL=_\[locale name\]_ locale charmap

对于"en\_GB.iso88591" locale ，上面的命令将会打印：

ISO-8859-1

这样你就得到了正确的 locale 设置是"en\_GB.ISO-8859-1"。将使用上述试探方法得到的 locale 在添加进 Bash 启动文件前做充分的测试是很重要的。

LC\_ALL=\[locale name\] locale country
LC\_ALL=\[locale name\] locale language
LC\_ALL=\[locale name\] locale charmap
LC\_ALL=\[locale name\] locale int\_curr\_symbol
LC\_ALL=\[locale name\] locale int\_prefix

上述命令将会打印与 _\[locale name\]_ 对应的国家和语言名称、使用的字符编码、货币符号、国际长途电话号码前缀。如果上述命令中的任意一个出现了类似下面的错误信息，则表明你该 locale 要么在 Chapter 6 中没有安装，要么不被 Glibc 的默认安装支持。

locale: Cannot set LC\_\* to default locale: No such file or directory

在这种情况下，你应当要么使用 **localedef** 命令安装相应的 locale ，要么选择一个其他的 locale 。接下来的指令都将假定 Glibc 没有出现上述错误信息。

一些 LFS 基本系统之外的软件包可能并不支持你选择的 locale 。一个例子就是 X 库(X Window System 的一部分)，它会输出如下信息：

Warning: locale not supported by Xlib, locale set to C

有时可以通过移除该 locale 的字符映射(charmap)定义部分来解决这个问题——只要这样做不会改变 Glibc 中与该 locale 关联的字符映射关系(这个可以通过对两个 locale 运行 **locale charmap** 命令来检查)。例如将"de\_DE.ISO-8859-15@euro"修改为"de\_DE@euro"即可让这个 locale 被 Xlib 正确识别。

其他一些软件包在你选择的 locale 出乎其意料的情况下可能即使运行异常也不会显示错误信息。在这种情况下，研究一下其他 Linux 发行版是如何支持你选择的 locale 可能会得到更加有用的信息。

一旦确定了正确的 locale 设置，创建 /etc/profile 文件：

cat > /etc/profile << "EOF"
\# Begin /etc/profile

export LANG=_<ll>_\__<CC>_._<charmap>__<@modifiers>_
export INPUTRC=/etc/inputrc

# End /etc/profile
EOF

"C"(默认)和"en\_US"(美国英语用户的推荐值)这两个 locale 是不同的。

设置键盘布局、屏幕字体和 locale 相关的环境变量，是使用一般的单字节编码和从左至右书写方式地区所需的国际化步骤。更复杂的情况(包括基于 UTF-8 的 locale)需要更多的步骤和补丁，因为这种情况下许多程序可能工作不正常。这些步骤和补丁没有包含在本书里，因此 LFS 无法支持这些 locale 。
