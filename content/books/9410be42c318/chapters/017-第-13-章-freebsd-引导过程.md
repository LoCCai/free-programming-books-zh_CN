### 13.3.1. The Boot Manager[](#boot-boot0)

在MBR或引导管理器中的代码有时被提为引导过程的 _阶段0_。这一小节便是前面提到引导器中的两种： boot0和LILO。

**boot0引导管理器：** 由 FreeBSD 的安装程序以及 boot0cfg(8) 所安装的 MBR， 默认基于 /boot/boot0。 (程序boot0非常简单， 由于在中的程序只能有446字节长， 分区表和MBR末端的`0x55AA`标识也要挤占一些空间。) 如果你已经安装boot0 并且有多个操作系统在你的硬盘上， 那么你如果您安装了 FreeBSD MBR 而且安装了多个操作系统， 则会在系统启动时看到类似下面的提示：

例 1. boot0 截屏

```
F1 DOS
F2 FreeBSD
F3 Linux
F4 ??
F5 Drive 1

Default: F2
```

目前已经知道一些其它操作系统，特别是 Windows® ， 会以自己的 MBR 覆盖现有 MBR。 如果发生了这种事情， 或者您想用 FreeBSD 的 MBR 覆盖现有的 MBR，您可以使用以下的命令：

```
# fdisk -B -b /boot/boot0 device
```

_device_ 是要写入 MBR 的设备名，比如 ad0 代表第一个 IDE 磁盘，ad2 代表第二个 IDE 控制器上的第一个 IDE 磁盘， da0 代表第一个 SCSI 磁盘，等等。 抑或，如果你需要一个自行配置的MBR，请使用[boot0cfg(8)](https://man.freebsd.org/cgi/man.cgi?query=boot0cfg&sektion=8&format=html)。

**The LILO Boot Manager:** 要想安装这个引导管理器并也用来引导FreeBSD， 首先启动Linux，并将以下选项加入到已有的配置文件 /etc/lilo.conf：

other=/dev/hdXY
table=/dev/hdX
loader=/boot/chain.b
label=FreeBSD

在上面的内容里，使用Linux的标示符指定了FreeBSD的主分区和驱动器， 将_X_替换为Linux驱动器字母， 将_Y_替换为Linux主分区号。 如果您使用的是 SCSI 驱动器，您需要将 _/dev/hd_ 改成 _/dev/sd_， 这里再次使用了 _XY_ 的语法。 如果您安装的两个系统在同一驱动器上，`loader=/boot/chain.b` 选项可以去掉。现在您可以执行 `/sbin/lilo -v` 使修改生效；应检查屏幕上的消息确认修改。

### 13.3.2. 第一阶段，/boot/boot1，和第二阶段， /boot/boot2[](#boot-boot1)

概念上，第一，第二阶段同属于一个程序，处于磁盘的相同区域。但由于空间限制， 它们被分为两部分。可是您总是会一起安装它们。它们由安装器或 bsdlabel(见下文)复制自被组合而成的 /boot/boot。

它们位于文件系统外，引导分区的第一轨道，从第一扇区开始。在这里[boot0](#boot-boot0)，或者任何其它引导管理器， 期望找到一个程序运行，继续引导进程。 所使用的扇区数可由/boot/boot的大小确定。

boot1 非常简单，因为它再多也只能有 512 字节， 只能识别储存着分区信息的 _bsdlabel_， 及寻找执行 boot2。

boot2 稍微有点加强，能够理解 FreeBSD 的文件系统以便于寻找里面的文件， 能提供选择内核和加载器的简单界面。

因为 [loader](#boot-loader) 有着更强的功能， 提供了一套易于使用的引导配置，boot2 一般都执行 loader， 但以前它的任务是直接运行内核。

例 2. boot2 的屏幕输出

```
>> FreeBSD/i386 BOOT
Default: 0:ad(0,a)/boot/loader
boot:
```

```
# bsdlabel -B diskslice
```

_diskslice_ 是用于引导的磁盘和分区， 比如 ad0s1 代表第一个 IDE 磁盘上的第一个分区。

<table><tbody><tr><td><i title="Warning"></i></td><td><p>dangerously dedicated</p><p>如果您在 <a href="https://man.freebsd.org/cgi/man.cgi?query=bsdlabel&amp;sektion=8&amp;format=html">bsdlabel(8)</a> 命令中只使用了磁盘名，比如 <span>ad0</span>，就会破坏磁盘上的所有分区。 这当然不是您所希望的，所以在按下 <kbd>回车</kbd> 之前 一定要对命令进行多次确认。</p></td></tr></tbody></table>

### 13.3.3. 第三阶段，/boot/loader[](#boot-loader)

加载器 (loader) 是三个阶段中的最后阶段， 且是放置在文件系统之中的，一般是文件 /boot/loader。

loader 被作为一种友好的配置方式，使用了一组内建且易用的命令集。 这些命令由一个强大的多的解释器支持构建，其本身带有复杂得多的命令集。

#### 13.3.3.1. Loader 程序流程[](#boot-loader-flow)

初始时，loader 会探测控制台和磁盘，识别是从哪块盘引导的。 它会根据这些信息设置变量， 启动解释器以接受通过脚本或交互方式传来的用户命令。

loader 然后会读取并运行 /boot/loader.rc， 默认地读取 /boot/defaults/loader.conf 以设置可靠的默认变量，读取 /boot/loader.conf 对这些变量作本地修改。loader.rc 依据这些变量进行动作，加载任何被选择的模块和内核。

最后，默认地，loader 会停留 10 秒等待按键， 若没有发生中断，就开始引导内核。如果被中断，用户会得到一个命令行提示符， 在这里用户得更改变量、卸载所有模块、加载模块、最后引导 或重新引导。

#### 13.3.3.2. Loader 内建的命令[](#boot-loader-commands)

这些是最常用的 loader 命令.对所有可用命令的解释请参见 [loader(8)](https://man.freebsd.org/cgi/man.cgi?query=loader&sektion=8&format=html)。

autoboot_seconds_

在给定的时间内如果没有中断发生就引导内核。它显示一个倒数计时， 默认的时间范围是 10 秒。

boot \[-options\] \[kernelname\]

立即按指定的选项启动指定名字的内核 (如果有指定的话)。 只有首先执行过 _unload_ 命令之后指定的内核名字才会生效， 否则， 启动的将是先前已经加载的内核。

boot-conf

基于变量对各种模块进行自动配置 (和引导内核时发生的一样)。 您只须记住要先使用 `unload` 命令， 然后修改一些变量，比如 `kernel`。

help \[topic\]

显示从文件 /boot/loader.help 读取的帮助信息。如果给定的主题是 `index`， 那么列出来的是所有可用的主题。

include _filename_ …​

通过给定的文件名处理文件。文件被读入，然后被一行一行地解释。 任何错误都会立即中止 include 命令。

load \[-t type\] _filename_

加载内核、内核模块，或者是给定类型的文件 (通过给定的文件名)。 任何在文件名后面的参数都会被传给文件。

ls \[-l\] \[path\]

显示给定路径或者是根目录 (如果路径没有指定) 下面的文件列表。 如果指定了 `-l` 选项，文件大小也会显示。

lsdev \[-v\]

列出所有可以加载模块的设备。 如果指定了`-v` 选项，会显示出更多的细节。

lsmod \[-v\]

显示已被加载的模块。如果指明了 `-v` 选项， 会显示更多的细节。

more _filename_

显示指定的文件，每隔 `LINES` 停顿一次。

reboot

立即重启系统。

set _variable_

设置 loader 的环境变量。

unload

移除所有已被加载的模块。

#### 13.3.3.3. Loader 示例[](#boot-loader-examples)

这里有一些实际中 loader 用法的示例

-   只是简单的引导默认内核，不同的是进入单用户模式：
    
    ```
     boot -s
    ```
    
-   卸载默认内核和模块，然后加载旧的 (或者其它) 的内核：
    
    ```
     unload
    
     load kernel.old
    ```
    
    您可以使用被称为通用内核的 kernel.GENERIC， 或者您以前安装的内核 kernel.old (当您升级或配置了您自己的内核等时候)。
    
    <table><tbody><tr><td><i title="Note"></i></td><td><p>使用以下命令加载常用的模块和另一个内核：</p><div><pre><code data-lang="shell">unload
    <span>set </span><span>kernel</span><span>=</span><span>"kernel.old"</span>
    boot-conf</code></pre></div></td></tr></tbody></table>
    
-   加载内核配置脚本：
    
    ```
     load -t userconfig_script /boot/kernel.conf
    ```
    

#### 13.3.3.4. 启动时的 Splash 图像[](#boot-splash)

在启动时出现的 splash 图像比起原本的启动信息更加可视话。 这个图像将被始终显示在屏幕上直到出现控制台的登录提示或者 X 显示管理器提供了登录画面。

在 FreeBSD 系统中有两个基本的环境。 第一个是默认传统的控制台命令行环境。 在系统启动之后， 会在控制台上出现一个登录提示。 第二个环境是 X11 桌面图形环境。 在安装了 [X11](https://docs.freebsd.org/zh-cn/books/handbook/x11/#x-install) 和一种图形 [桌面环境](https://docs.freebsd.org/zh-cn/books/handbook/x11/#x11-wm)， 比如 GNOME， KDE， 或者 XFce， X11 桌面可以用 `startx` 命令运行。

比起传统基于字符的登录提示，有些用户可能更喜欢 X11 图形化的登录界面。 图形化的登录管理器像 Xorg 的 XDM， GNOME 的 gdm， KDE 的 kdm (还有其他 Port Collection 中的) 基本上都提供了一个图形化的登录界面代替控制台上的登录提示符。 在成功登录之后， 它们展现给用户一个图形化的桌面。

在命令行环境， splash 图像将在显示登录提示符之前隐藏所有启动时的监测与任务启动的消息。 在 X11 环境， 用户将会获得一个视觉上更加清爽启动体验， 类似于某些像 (Microsoft® Windows® 或者非 UNIX® 类型的系统) 用户所希望体验到的。

##### Splash 图像功能[](#boot-splash-function)

目前的 splash 图像的功能仅限于支持 256 色的位图 (.bmp) 或者 ZSoft PCX (.pcx) 文件。 此外， splash 图像文件的分辨率必须是 320x200 像素或者更少， 才够能在标准 VGA 适配器上使用。

要使用尺寸更大的图像， 达到最大分辨率 1024x768 像素， 则需开启 FreeBSD 的 VESA 支持。 这可以通过在系统启动时加载 VESA 模块完成， 或者在内核配置文件中加入 `VESA` 选项并编译 (参阅 [配置FreeBSD的内核](https://docs.freebsd.org/zh-cn/books/handbook/kernelconfig/#kernelconfig))。 VESA 支持给予了用户显示覆盖整个显示器的启动画面能力。

在启动的时候 splash 图像就会被显示在屏幕上， 它可以在任何时候都按任意键关闭。

Splash 图像同样也会是 X11 之外默认的屏幕保护。 在一段时间的闲置后，屏幕便会转为周期性的变换显示 splash 图像， 从明亮至暗淡， 周而复始。 默认的 splash 图像 (屏幕保护) 可由 /etc/rc.conf 中的 `saver=` 选项控制。 `saver=` 选项有一些内置的屏幕保护可供选择， 完整的列表可以再 [splash(4)](https://man.freebsd.org/cgi/man.cgi?query=splash&sektion=4&format=html) 手册页中找到。 默认的屏幕保护被称为 "warp"。 请注意在 /etc/rc.conf 中所指定 `saver=` 选项仅限应用于虚拟控制台。 对于 X11 图形化的登录管理器无效。

一些有关启动引导器的信息， 包括启动选项菜单和一个定时倒数提示符都会在启动时显示， 即是开启了 splash 图像功能。

##### 开启 Splash 图像功能[](#boot-splash-enable)

Splash 图像 (.bmp) 或者 (.pcx) 文件必须放置在 root 分区上， 比如 /boot 目录。

对于默认的显示分辨率 (256 色，320x200 像素或更少) 编辑 /boot/lodaer.conf， 添加如下的设置：

splash\_bmp\_load="YES"
bitmap\_load="YES"
bitmap\_name="/boot/splash.bmp"

对于更高的分辨率，最大至 1024x768 像素， 编辑 /boot/lodaer.conf， 添加如下的设置：

vesa\_load="YES"
splash\_bmp\_load="YES"
bitmap\_load="YES"
bitmap\_name="/boot/splash.bmp"

以上这些设置假设 /boot/splash.bmp 为需要被使用的 splash 图像。 当需要使用 PCX 文件的时候， 添加入下列设置， 根据分辨率的高低添加 `vesa_load="YES"`。

splash\_pcx\_load="YES"
bitmap\_load="YES"
bitmap\_name="/boot/splash.pcx"

文件名并不限于以上例子中的 "splash"。 它可以是任何名称，只要是 BMP 或者 PCX 类型的文件， 比如 splash\_640x400.bmp 或者 blue\_wave.pcx.

一些有趣的 loader.conf 选项：

`beastie_disable="YES"`

这将关闭显示启动选项菜单， 但是倒数记时仍然会出现。 即是在启动菜单选项被禁用的时候， 在倒数记时段键入相应的启动选项仍然有效。

`loader_logo="beastie"`

这将替换启动选项菜单右侧默认显示的 "FreeBSD" 为彩色的小魔鬼标志， 就像以往的发行版那样。
