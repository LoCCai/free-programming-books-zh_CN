本节讨论如何配置 **console** 初始化脚本来设置键盘映射表和控制台字体。如果您不使用非 ASCII 字符(英镑和欧元符号就是非 ASCII 字符的例子)，并且是美式键盘，可以跳过这一节，没有配置文件的话，**console** 初始化脚本不会做任何事情。

**console** 使用 /etc/sysconfig/console 作为配置文件以决定使用什么键盘映射表和屏幕字体，各种特定语言的 HOWTO(参见 [_http://www.tldp.org/HOWTO/HOWTO-INDEX/other-lang.html_](http://www.tldp.org/HOWTO/HOWTO-INDEX/other-lang.html)) 能帮助您完成配置。LFS-Bootscripts 软件包安装了一个已为一些国家配置好了的预制的 /etc/sysconfig/console 文件，如果您所在的国家已经被支持了，您可以去掉相应部分的注释。如果您还有疑问，请在 /usr/share/kbd 目录下查找正确的键盘映射表和屏幕字体。 阅读 loadkeys(1) 和 setfont(8) 的手册，来确定这些程序的正确参数。  

/etc/sysconfig/console 文件中可能包含这样格式的行：VARIABLE ="value"。变量如下：

KEYMAP

这个变量指定 **loadkeys** 程序的参数。典型的像键盘映射的名字 "es"。 如果不设定参数，bootscript 就不会运行 **loadkeys** 程序, 而是使用默认的内核键盘映射。

KEYMAP\_CORRECTIONS

这个参数很少用到，它可被用来指定再次调用**loadkeys** 程序的参数。对于提供的键盘映射不是很领人满意时，做些调整。 例如，我们要把一些正常情况下不会出现的欧洲字符包含到在键盘映射中, 那我们就需要把这个参数设为 “euro2”。

FONT

这个变量是为 **setfont** 程序设定的. 通常情况下它要包括font的名字, “\-m”, 以及需要载入的application character map名. 比方., 要调用 “lat1-16” font 以及 “8859-1” application character map , 就把这个参数设为 “lat1-16 -m 8859-1”. 如果这个变量没有被设定，bootscript会加载默认的 **setfont** 程序, 以及默认的一大堆

UNICODE

此参数设成“1”, “yes” 或 “true” 会把控制台改为UTF-8模式。在 UTF-8 的 locale 下比较有用，其他情况都是有害的。  

LEGACY\_CHARSET

对于许多的键盘布局，在 Kbd 包中没有提供 Unicode 键盘映射。如果这个变量被设置为一个有效的非 UTF-8 编码的键盘映射，**console** bootscript 会把它转换成 UTF-8 编码。注意，无效键（例如，键位本身不能产生字符，而是对下一个键产生的字符限制 ;在标准美国键盘中没有无效键）和组合键（例如，为了产生字符按下 Ctrl+. A E）没有相应的内核 patch 在 UTF-8 模式下是不能工作的。这个变量只用在 UTF-8 模式下。

BROKEN\_COMPOSE

如果你应用第八章中的内核 patch ，把它设为 "0"。你不得不在 "-m" 开关之后，添加需要的字符集到 FONT 变量中。这个变量只用在 UTF-8 模式下。

对于把键盘映射直接编译进内核的支持，在内核中已经去掉了。因为这样会导致有一些错误的结果。

一些例子：

-   对于一个非 Unicode 的安装，只有 KEYMAP 和 FONT 变量是必需的。例如，在波兰语安装中，应当使用：
    
    cat > /etc/sysconfig/console << "EOF"  
    \# Begin /etc/sysconfig/console
    
    KEYMAP="pl2"  
    FONT="lat2a-16 -m 8859-2"
    
    \# End /etc/sysconfig/console
    
    EOF
    
-   正如上面的方法，有时需要对对提供的键盘映射进行稍微的调整。下面的例子在德国键盘映射中添加欧洲符号：
    
    cat > /etc/sysconfig/console << "EOF"  
    \# Begin /etc/sysconfig/console
    
    KEYMAP="de-latin1"  
    KEYMAP\_CORRECTIONS="euro2"  
    FONT="lat0-16 -m 8859-15"
    
    \# End /etc/sysconfig/console
    
    EOF
    
-   下面是一个保加利亚的 Unicode 例子，存在一个 UTF-8 键盘映射，并且没有定义无效键和组合键规则：
    
    cat > /etc/sysconfig/console << "EOF"  
    \# Begin /etc/sysconfig/console
    
    UNICODE="1"  
    KEYMAP="bg\_bds-utf8"  
    FONT="LatArCyrHeb-16"
    
    \# End /etc/sysconfig/console
    
    EOF
    
-   由于在前面的例子中使用了 512-字符 的 LatArCyrHeb-16 字体，在控制台上不能再显示明亮的颜色，除非使用 framebuffer。如果你想不利用 framebuffer 来显示明亮的颜色，并使用本语种字符，像下面的说明，通过使用相应语言的 256-字符 字体，这仍然是可能实现的。
    
    cat > /etc/sysconfig/console << "EOF"  
    \# Begin /etc/sysconfig/console
    
    UNICODE="1"  
    KEYMAP="bg\_bds-utf8"  
    FONT="cyr-sun16"
    
    \# End /etc/sysconfig/console
    
    EOF
    
-   下面的例子解释了键盘映射从 ISO-8859-15 到 UTF-8 的自动转变和在 Unicode 模式下打开无效键：
    
    cat > /etc/sysconfig/console << "EOF"  
    \# Begin /etc/sysconfig/console
    
    UNICODE="1"  
    KEYMAP="de-latin1"  
    KEYMAP\_CORRECTIONS="euro2"  
    LEGACY\_CHARSET="iso-8859-15"  
    BROKEN\_COMPOSE="0"  
    FONT="LatArCyrHeb-16 -m 8859-15"
    
    \# End /etc/sysconfig/console
    
    EOF
    
-   对于中文、日文、韩文等一些语言，Linux 的控制台不能显示需要的字符。这些语种的用户应当安装 X Window 系统，包含所需字符集的字体，以及合适的输入法（例如，SCIM 支持很多语言）。
    

![\[Note\]](https://www.jinbuguo.com/lfs/lfs62/images/note.png)

### 注意

/etc/sysconfig/console 文件只能控制 Linux 文本控制台。在 X Windows、SSH 会话以及串口控制台中，设置键盘布局和终端字体是没有用的。
