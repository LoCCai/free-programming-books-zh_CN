配置文件的格式是非常简单的。 每一行都包括一个关键词， 以及一个或多个参数。 实际上， 绝大多数行都只包括一个参数。 在 `\#` 之后的内容会被认为是注释而忽略掉。 接下来几节, 将以 GENERIC 中的顺序介绍所有关键字。 如果需要与平台有关的选项和设备的详细列表， 请参考与 GENERIC 文件在同一个目录中的那个 NOTES， 而平台无关的选项， 则可以在 /usr/src/sys/conf/NOTES 找到。

配置文件中还可以使用 `include` 语句。 这个语句能够在内核配置文件中直接引用其他配置文件的内容， 使得您能够使用较小的、 仅包含相对于现存配置的变动而减少维护所需的工作。 例如， 如果您只需对 GENERIC 内核进行少量定制， 在其中添加几个驱动程序和附加选项， 则只要维护相对于 GENERIC 的变化就可以了：

include GENERIC
ident MYKERNEL

options         IPFIREWALL
options         DUMMYNET
options         IPFIREWALL\_DEFAULT\_TO\_ACCEPT
options         IPDIVERT

许多系统管理员会发现， 这种方法与先前从头开始写配置文件的方法相比， 可以带开相当多的好处： 本地采用的配置文件只表达与 GENERIC 内核的差异， 这样， 在升级的时候往往就不需要做任何改动， 而新加入 GENERIC 的功能就会自动加入到本地的内核， 除非使用 `nooptions` 或 `nodevice` 语句将其排除。 这一章余下的部分将着重介绍典型的配置文件， 以及内核选项和设备的作用。

<table><tbody><tr><td><i title="Note"></i></td><td><p>如果您需要一份包含所有选项的文件， 例如用于测试目的， 则应以 <code>root</code> 身份执行下列命令：</p><div><pre><code data-lang="shell"><span># cd /usr/src/sys/i386/conf &amp;&amp; make LINT</span></code></pre></div></td></tr></tbody></table>

下面是一个 GENERIC 内核配置文件的例子， 它包括了一些需要解释的注释。 这个例子应该和您复制的 /usr/src/sys/i386/conf/GENERIC 非常接近。

machine		i386

这是机器的架构， 它只能是 `amd64`, `i386`, `ia64`, `pc98`, `powerpc`, 或 `sparc64` 中的一种。

cpu          I486\_CPU
cpu          I586\_CPU
cpu          I686\_CPU

上面的选项指定了您系统中所使用的 CPU 类型。 您可以使用多个 CPU 类型 (例如， 您不确定是应该指定 `I586_CPU` 或 `I686_CPU`)。 然而对于定制的内核， 最好能够只指定您使用的那种 CPU。 如果您对于自己使用的 CPU 类型没有把握， 可以通过查看 /var/run/dmesg.boot 中的启动信息来了解。

ident          GENERIC

这是内核的名字。 您应该取一个自己的名字， 例如取名叫 `MYKERNEL`， 如果您一直在按照前面的说明做的话。 您放在 `ident` 后面的字符串在启动内核时会显示出来， 因此如果希望能够容易区分常用的内核和刚刚定制的内核， 就应该采取不同的名字 (例如， 您想定制一个试验性的内核)。

#To statically compile in device wiring instead of /boot/device.hints
#hints          "GENERIC.hints"         # Default places to look for devices.

[device.hints(5)](https://man.freebsd.org/cgi/man.cgi?query=device.hints&sektion=5&format=html) 可以用来配置设备驱动选项。 在启动的时候 [loader(8)](https://man.freebsd.org/cgi/man.cgi?query=loader&sektion=8&format=html) 将会检查缺省位置 /boot/devicehints。 使用 `hints` 选项您就可以把这些 hints 静态编译进内核。 这样就没有必要在 /boot下创建devicehints。

makeoptions     DEBUG=-g          # Build kernel with gdb(1) debug symbols

一般的 FreeBSD 联编过程， 在所联编的内核指定了 `-g` 选项时， 由于此选项将传递给 [gcc(1)](https://man.freebsd.org/cgi/man.cgi?query=gcc&sektion=1&format=html) 表示加入调试信息， 因此会将调试符号也包含进来。

options          SCHED\_ULE         # ULE scheduler

这是 FreeBSD 上使用的默认系统调度器。 请保留此选项。

options          PREEMPTION         # Enable kernel thread preemption

允许内核线程根据优先级的抢占调度。 这有助于改善交互性， 并可以让中断线程更早地执行， 而无须等待。

options          INET              # InterNETworking

网络支持，即使您不打算连网，也请保留它，大部分的程序至少需要回环网络（就是和本机进行网络连接），所以强烈要求保留它。

options          INET6             # IPv6 communications protocols

这将打开IPv6连接协议。

options          FFS               # Berkeley Fast Filesystem

这是最基本的硬盘文件系统，如果打算从本地硬盘启动，请保留它。

options          SOFTUPDATES       # Enable FFS Soft Updates support

这个选项会启用内核中的 Soft Updates 支持， 它会显著地提高磁盘的写入速度。 尽管这项功能是由内核直接提供的， 但仍然需要在每个磁盘上启用它。 请检查 [mount(8)](https://man.freebsd.org/cgi/man.cgi?query=mount&sektion=8&format=html) 的输出， 以了解您系统中的磁盘上是否已经启用了 Soft Updates。 如果没有看到 `soft-updates` 选项， 则需要使用 [tunefs(8)](https://man.freebsd.org/cgi/man.cgi?query=tunefs&sektion=8&format=html) (对于暨存系统) 或 [newfs(8)](https://man.freebsd.org/cgi/man.cgi?query=newfs&sektion=8&format=html) (对于新系统) 命令来激活它。

options          UFS\_ACL           # Support for access control lists

这个选项将启用内核中的访问控制表的支持。 这依赖于扩展属性以及 UFS2， 以及在 [文件系统访问控制表](https://docs.freebsd.org/zh-cn/books/handbook/security/#fs-acl) 中所介绍的那些特性。 ACL 默认是启用的， 并且如果已经在文件系统上使用了这一特性， 就不应再关掉它， 因为这会去掉文件的访问控制表， 并以不可预期的方式改变受保护的文件的访问方式。

options          UFS\_DIRHASH       # Improve performance on big directories

通过使用额外的内存，这个选项可以加速在大目录上的磁盘操作。 您应该在大型服务器和频繁使用的工作站上打开这个选项，而在磁盘操作不是很重要的 小型系统上关闭它，比如防火墙。

options          MD\_ROOT           # MD is a potential root device

这个选项将打开以基于内存的虚拟磁盘作为根设备的支持。

options          NFSCLIENT         # Network Filesystem Client
options          NFSSERVER         # Network Filesystem Server
options          NFS\_ROOT          # NFS usable as /, requires NFSCLIENT

网络文件系统。 如果您不打算通过 TCP/IP 挂接 UNIX® 文件服务器的分区， 就可以注释掉它。

options          MSDOSFS           # MSDOS Filesystem

MS-DOS® 文件系统。 只要您不打算在启动时挂接由 DOS 格式化的硬盘分区， 就可以把它注释掉。 如前面所介绍的那样， 在您第一次挂接 DOS 分区时， 内核会自动加载需要的模块。 此外， [emulators/mtools](https://cgit.freebsd.org/ports/tree/emulators/mtools/) 软件提供了一个很方便的功能， 通过它您可以直接访问 DOS 软盘而无需挂接或卸下它们 (而且也完全不需要 `MSDOSFS`)。

options          CD9660            # ISO 9660 Filesystem

用于 CDROM 的 ISO 9660 文件系统。 如果没有 CDROM 驱动器或很少挂接光盘数据 (因为在首次使用数据 CD 时会自动加载)， 就可以把它注释掉。 音乐 CD 并不需要这个选项。

options          PROCFS            # Process filesystem (requires PSEUDOFS)

进程文件系统。 这是一个挂接在 /proc 的一个 "假扮的" 文件系统， 其作用是允许类似 [ps(1)](https://man.freebsd.org/cgi/man.cgi?query=ps&sektion=1&format=html) 这样的程序给出正在运行的进程的进一步信息。 多数情况下， 并不需要使用 `PROCFS`， 因为绝大多数调试和监控工具， 已经进行了一系列修改， 使之不再依赖 `PROCFS`： 默认安装的系统中并不会挂接这一文件系统。

options          PSEUDOFS          # Pseudo-filesystem framework

如果希望使用 `PROCFS`， 就必须加入 `PSEUDOFS` 的支持。

options          GEOM\_GPT          # GUID Partition Tables.

这个选项提供了在磁盘上使用大量的分区的能力。

options          COMPAT\_43         # Compatible with BSD 4.3 \[KEEP THIS!\]

使系统兼容4.3BSD。不要去掉这一行，不然有些程序将无法正常运行。

options          COMPAT\_FREEBSD4   # Compatible with FreeBSD4

如果希望支持在旧版 FreeBSD 上编译的使用旧式接口的应用程序， 就需要加入这一选项。 一般来说， 推荐在所有的 i386™ 系统上启用这个选项， 因为难免可能会用到一些旧的应用； 到 5.X 才开始支持的平台， 如 ia64 和 sparc64， 则不需要这个选项。

options          COMPAT\_FREEBSD5   # Compatible with FreeBSD5

如果希望支持在 FreeBSD 5.X 版本上编译， 且使用 FreeBSD 5.X 系统调用接口的应用程序， 则应加上这个选项。

options          COMPAT\_FREEBSD6   # Compatible with FreeBSD6

如果希望支持在 FreeBSD 6.X 版本上编译， 且使用 FreeBSD 6.X 系统调用接口的应用程序， 则应加上这个选项。

options          COMPAT\_FREEBSD7   # Compatible with FreeBSD7

如果希望支持在 FreeBSD 8 以上版本的操作系统中运行在 FreeBSD 7.X 版本上编译， 且使用 FreeBSD 7.X 系统调用接口的应用程序， 则应加上这个选项。

options          SCSI\_DELAY=5000  # Delay (in ms) before probing SCSI

这将让内核在探测每个 SCSI 设备之前等待 5 秒。 如果您只有 IDE 硬盘驱动器， 就可以不管它， 反之您可能会希望尝试降低这个数值以加速启动过程。 当然， 如果您这么做之后 FreeBSD 在识别您的 SCSI 设备时遇到问题， 则您还需要再把它改回去。

options          KTRACE            # ktrace(1) support

这个选项打开内核进程跟踪，在调试时很有用。

options          SYSVSHM           # SYSV-style shared memory

提供System V共享内存(SHM)的支持，最常用到SHM的应该是X Window的XSHM延伸， 不少绘图相关程序会自动使用SHM来提供额外的速度。如果您要使用X Window，您最好加入这个选项。

options          SYSVMSG           # SYSV-style message queues

支持 System V 消息。 这只会在内核中增加数百字节的空间占用。

options          SYSVSEM           # SYSV-style semaphores

支持System V 信号量， 不常用到， 但只在kernel中占用几百个字节的空间。

<table><tbody><tr><td><i title="Note"></i></td><td><p><a href="https://man.freebsd.org/cgi/man.cgi?query=ipcs&amp;sektion=1&amp;format=html">ipcs(1)</a> 命令的 <code>-p</code> 选项可以显示出任何用到这些 System V 机制的进程。</p></td></tr></tbody></table>

options 	     \_KPOSIX\_PRIORITY\_SCHEDULING # POSIX P1003\_1B real-time extensions

在 1993 年 POSIX® 添加的实时扩展。 在 Ports Collection 中某些应用程序会用到这些 （比如StarOffice™）。

options          KBD\_INSTALL\_CDEV  # install a CDEV entry in /dev

这个选项是在 /dev下建立键盘设备节点必需的。

options          ADAPTIVE\_GIANT    # Giant mutex is adaptive.

内核全局锁 (Giant) 是一种互斥机制 (休眠互斥体) 的名字， 它用于保护许多内核资源。 现在， 这已经成为了一种无法接受的性能瓶颈， 它已经被越来越多地使用保护单个资源的锁代替。 `ADAPTIVE_GIANT` 选项将使得内核全局锁作为一种自适应自旋锁。 这意味着， 当有线程希望锁住内核全局锁互斥体， 但互斥体已经被另一个 CPU 上的线程锁住的时候， 它将继续运行， 直到那个线程释放锁为止。 一般情况下， 另一个线程将进入休眠状态并等待下一次调度。 如果您不确定是否应该这样做的话， 一般应该打开它。

<table><tbody><tr><td><i title="Note"></i></td><td><p>请注意在 FreeBSD 8.0-RELEASE 及以后的版本，所有的互斥体默认都是自适应的， 除非在编译时使用 <code>NO_ADAPTIVE_MUTEXES</code> 选项， 明确的指定为非自适应。因此，内核全局锁（Giant）目前默认也是自适应的, 而且 <code>ADAPTIVE_GIANT</code> 选项已经从内核配置文件中移出。</p></td></tr></tbody></table>

device          apic               # I/O APIC

apic 设备将启用使用 I/O APIC 作为中断发送设备的能力。 apic 设备可以被 UP 和 SMP 内核使用， 但 SMP 内核必须使用它。 要支持多处理器， 还需要加上 `options SMP`。

<table><tbody><tr><td><i title="Note"></i></td><td><p>只有在 i386 和 amd64 平台上才存在 apic 设备， 在其他硬件平台上不应使用它。</p></td></tr></tbody></table>

device          eisa

如果您的主机板上有EISA总线，加入这个设置。使用这个选项可以自动扫描并设置所有连接在EISA总线上的设备。

device          pci

如果您的主板有PCI总线，就加入这个选项。使用这个选项可以自动扫描PCI卡，并在PCI到ISA之间建立通路。

\# Floppy drives
device          fdc

这是软驱控制器。

\# ATA and ATAPI devices
device          ata

这个驱动器支持所有ATA和ATAPI设备。您只要在内核中加入`device ata`选项， 就可以让内核支持现代计算机上的所有PCI ATA/ATAPI设备。

device          atadisk                 # ATA disk drives

这个是使用 ATAPI 硬盘驱动器时必须加入的选项。

device          ataraid                 # ATA RAID drives

这个选项需要 `device ata`， 它用于 ATA RAID 驱动。

device          atapicd                 # ATAPI CDROM drives

这个是ATAPI CDROM驱动器所必须的。

device          atapifd                 # ATAPI floppy drives

这个是ATAPI 软盘驱动器所必须的。

device          atapist                 # ATAPI tape drives

这个是ATAPI 磁带机驱动器所必须的.

options         ATA\_STATIC\_ID           # Static device numbering

这指定对控制器使用其静态的编号； 如果没有这个选项， 则会动态地分配设备的编号。

\# SCSI Controllers
device          ahb        # EISA AHA1742 family
device          ahc        # AHA2940 and onboard AIC7xxx devices
options         AHC\_REG\_PRETTY\_PRINT    # Print register bitfields in debug
                                        # output.  Adds ~128k to driver.
device          ahd        # AHA39320/29320 and onboard AIC79xx devices
options         AHD\_REG\_PRETTY\_PRINT    # Print register bitfields in debug
                                        # output.  Adds ~215k to driver.
device          amd        # AMD 53C974 (Teckram DC-390(T))
device          isp        # Qlogic family
#device         ispfw      # Firmware for QLogic HBAs- normally a module
device          mpt        # LSI-Logic MPT-Fusion
#device         ncr        # NCR/Symbios Logic
device          sym        # NCR/Symbios Logic (newer chipsets + those of \`ncr')
device          trm        # Tekram DC395U/UW/F DC315U adapters

device          adv        # Advansys SCSI adapters
device          adw        # Advansys wide SCSI adapters
device          aha        # Adaptec 154x SCSI adapters
device          aic        # Adaptec 15\[012\]x SCSI adapters, AIC-6\[23\]60.
device          bt         # Buslogic/Mylex MultiMaster SCSI adapters

device          ncv        # NCR 53C500
device          nsp        # Workbit Ninja SCSI-3
device          stg        # TMC 18C30/18C50

SCSI控制器。可以注释掉您系统中没有的设备。 如果您只有IDE设备，您可以把这些一起删掉。 `*_REG_PRETTY_PRINT` 这样的配置， 则是对应驱动程序的调试选项。

\# SCSI peripherals
device          scbus      # SCSI bus (required for SCSI)
device          ch         # SCSI media changers
device          da         # Direct Access (disks)
device          sa         # Sequential Access (tape etc)
device          cd         # CD
device          pass       # Passthrough device (direct SCSI access)
device          ses        # SCSI Environmental Services (and SAF-TE)

SSCSI外围设备。也可以像上面一样操作。

<table><tbody><tr><td><i title="Note"></i></td><td><p>目前系统提供的 USB <a href="https://man.freebsd.org/cgi/man.cgi?query=umass&amp;sektion=4&amp;format=html">umass(4)</a> 以及少量其它驱动使用了 SCSI 子系统， 尽管它们并不是真的 SCSI 设备。 因此， 如果在内核配置使用了这类驱动程序， 请务必不要删除 SCSI 支持。</p></td></tr></tbody></table>

\# RAID controllers interfaced to the SCSI subsystem
device          amr        # AMI MegaRAID
device          arcmsr     # Areca SATA II RAID
device          asr        # DPT SmartRAID V, VI and Adaptec SCSI RAID
device          ciss       # Compaq Smart RAID 5\*
device          dpt        # DPT Smartcache III, IV - See NOTES for options
device          hptmv      # Highpoint RocketRAID 182x
device          rr232x     # Highpoint RocketRAID 232x
device          iir        # Intel Integrated RAID
device          ips        # IBM (Adaptec) ServeRAID
device          mly        # Mylex AcceleRAID/eXtremeRAID
device          twa        # 3ware 9000 series PATA/SATA RAID

# RAID controllers
device          aac        # Adaptec FSA RAID
device          aacp       # SCSI passthrough for aac (requires CAM)
device          ida        # Compaq Smart RAID
device          mfi        # LSI MegaRAID SAS
device          mlx        # Mylex DAC960 family
device          pst        # Promise Supertrak SX6000
device          twe        # 3ware ATA RAID

支持RAID控制器。如果您没有这些，可以把它们注释掉或是删掉。

\# atkbdc0 controls both the keyboard and the PS/2 mouse
device          atkbdc     # AT keyboard controller

键盘控制器（`atkbdc`）提供AT键盘输入以及PS/2指针设备的I/O服务。 键盘驱动程序（`atkbd`）与PS/2鼠标驱动程序（`psm`）需要这个控制器，所以不要删除它。

device          atkbd      # AT keyboard

`atkbd`驱动程序，与`atkbdc`控制器一起使用， 提供连接到AT键盘控制器的AT 84键盘与AT加强型键盘的访问服务。

device          psm        # PS/2 mouse

如果您的鼠标连接到PS/2鼠标端口，就使用这个设备驱动程序。

device          kbdmux        # keyboard multiplexer

针对键盘多路选择器的基本支持。 如果您不打算使用多个键盘， 则可以放心地删除这一行。

device          vga        # VGA video card driver

显卡驱动。

device          splash     # Splash screen and screen saver support

启动时的 splash 画面！ 屏幕保护程序也需要这一选项。

\# syscons is the default console driver, resembling an SCO console
device          sc

`sc` 是默认的控制台驱动程序， 类似 SCO 控制台。 由于绝大部分全屏幕程序都通过类似 termcap 这样的终端数据库函数库赖访问控制台， 因此无论您使用这个或与 `VT220` 兼容的 `vt` 都没有什么关系。 如果您在运行这种控制台时使用全屏幕程序时发生问题， 请在登录之后将 `TERM` 变量设置为 `scoansi`。

\# Enable this for the pcvt (VT220 compatible) console driver
#device          vt
#options         XSERVER          # support for X server on a vt console
#options         FAT\_CURSOR       # start with block cursor

这是一个兼容 VT220 的控制台驱动， 它同时能够向下兼容 VT100/102。 在同 `sc` 硬件不兼容的一些笔记本上它能够运行的很好。 当然， 登录系统时请把 `TERM` 变量设置为 `vt100` 或 `vt220`。 此驱动在连接网络上大量不同的机器时也被证明非常有用， 因为此时 termcap 或 terminfo 通常没有可用的 `sc` 设备 - 而 `vt100` 则几乎每种平台都支持。

device          agp

如果您的机器使用 AGP 卡， 请把上面一行加入配置。 这将启用 AGP， 以及某些卡上的 AGP GART 支持。

\# 电源管理支持 (参见 NOTES 了解更多选项)
#device          apm

高级电源管理支持。对笔记本有用，不过在 GENERIC 里默认禁用。

\# 增加 i8254 的 挂起/恢复 支持。
device           pmtimer

用于电源管理事件， 例如 APM 和 ACPI 的时钟设备驱动。

\# PCCARD (PCMCIA) support
# PCMCIA and cardbus bridge support
device          cbb               # cardbus (yenta) bridge
device          pccard            # PC Card (16-bit) bus
device          cardbus           # CardBus (32-bit) bus

PCMCIA支持。如果您使用膝上型计算机，您需要这个。

\# Serial (COM) ports
device          sio               # 8250, 16\[45\]50 based serial ports

这些串口在 MS-DOS®/Windows® 的世界中称为 COM 口。

<table><tbody><tr><td><i title="Note"></i></td><td><p>如果使用内置式的调制解调器， 并占用 <span>COM4</span> 而您另有一个串口在 <span>COM2</span>， 则必须把调制解调器的 IRQ 改为 2 (由于晦涩的技术原因， IRQ2 = IRQ 9) 才能够在 FreeBSD 中访问它。 如果有多口的串口卡， 请参考 <a href="https://man.freebsd.org/cgi/man.cgi?query=sio&amp;sektion=4&amp;format=html">sio(4)</a> 以了解需要在 <span>/boot/device.hints</span> 中进行的设置。 某些显卡 (特别是基于 S3 芯片的卡) 使用形如 <code>0x*2e8</code> 的 IO 地址， 而许多廉价的串口卡不能够正确地对 16-位 IO 地址空间进行解码， 因此它们会产生冲突， 并造成 <span>COM4</span> 实际上无法使用。</p><p>每一个串口都需要有一个唯一的 IRQ (除非您使用支持中断分享的串口卡)， 因此默认的 <span>COM3</span> 和 <span>COM4</span> IRQ 是不能使用的。</p></td></tr></tbody></table>

\# Parallel port
device          ppc

ISA-bus并行接口。

device          ppbus      # Parallel port bus (required)

提供并行总线的支持。

device          lpt        # Printer

提供并口打印机的支持。

<table><tbody><tr><td><i title="Note"></i></td><td><p>要使用并口打印机，就必须同时加入上面三行设置。</p></td></tr></tbody></table>

device          plip       # TCP/IP over parallel

这是针对并行网络接口的驱动器。

device          ppi        # Parallel port interface device

普通用途的I/O ("geek port") + IEEE1284 I/O.

#device         vpo        # Requires scbus and da

这是针对Iomega Zip驱动器的。它要求`scbus`和`da`的支持。 最好的执行效果是工作在EPP 1.9模式。

#device         puc

如果您有由 [puc(4)](https://man.freebsd.org/cgi/man.cgi?query=puc&sektion=4&format=html) 支持的 "哑" 串行或并行 PCI 卡， 则应去掉这一行的注释。

\# PCI Ethernet NICs.
device          de         # DEC/Intel DC21x4x (Tulip)
device          em         # Intel PRO/1000 adapter Gigabit Ethernet Card
device          ixgb       # Intel PRO/10GbE Ethernet Card
device          txp        # 3Com 3cR990 (Typhoon)
device          vx         # 3Com 3c590, 3c595 (Vortex)

多种PCI网卡驱动器。注释或删除您系统中没有的设备.

\# PCI Ethernet NICs that use the common MII bus controller code.
# NOTE: Be sure to keep the 'device miibus' line in order to use these NICs!
device          miibus     # MII bus support

MII总线支持对于一些PCI 10/100 Ethernet NIC来说是必需的。

device          bce        # Broadcom BCM5706/BCM5708 Gigabit Ethernet
device          bfe        # Broadcom BCM440x 10/100 Ethernet
device          bge        # Broadcom BCM570xx Gigabit Ethernet
device          dc         # DEC/Intel 21143 and various workalikes
device          fxp        # Intel EtherExpress PRO/100B (82557, 82558)
device          lge        # Level 1 LXT1001 gigabit ethernet
device          msk        # Marvell/SysKonnect Yukon II Gigabit Ethernet
device          nge        # NatSemi DP83820 gigabit ethernet
device          nve        # nVidia nForce MCP on-board Ethernet Networking
device          pcn        # AMD Am79C97x PCI 10/100 (precedence over 'lnc')
device          re         # RealTek 8139C+/8169/8169S/8110S
device          rl         # RealTek 8129/8139
device          sf         # Adaptec AIC-6915 (Starfire)
device          sis        # Silicon Integrated Systems SiS 900/SiS 7016
device          sk         # SysKonnect SK-984x & SK-982x gigabit Ethernet
device          ste        # Sundance ST201 (D-Link DFE-550TX)
device          stge       # Sundance/Tamarack TC9021 gigabit Ethernet
device          ti         # Alteon Networks Tigon I/II gigabit Ethernet
device          tl         # Texas Instruments ThunderLAN
device          tx         # SMC EtherPower II (83c170 EPIC)
device          vge        # VIA VT612x gigabit ethernet
device          vr         # VIA Rhine, Rhine II
device          wb         # Winbond W89C840F
device          xl         # 3Com 3c90x (Boomerang, Cyclone)

使用MII总线控制器代码的驱动器。

\# ISA Ethernet NICs.  pccard NICs included.
device          cs         # Crystal Semiconductor CS89x0 NIC
# 'device ed' requires 'device miibus'
device          ed         # NE\[12\]000, SMC Ultra, 3c503, DS8390 cards
device          ex         # Intel EtherExpress Pro/10 and Pro/10+
device          ep         # Etherlink III based cards
device          fe         # Fujitsu MB8696x based cards
device          ie         # EtherExpress 8/16, 3C507, StarLAN 10 etc.
device          lnc        # NE2100, NE32-VL Lance Ethernet cards
device          sn         # SMC's 9000 series of Ethernet chips
device          xe         # Xircom pccard Ethernet

# ISA devices that use the old ISA shims
#device         le

ISA 以太网卡驱动。 参见 /usr/src/sys/i386/conf/NOTES 以了解关于哪个驱动程序能够驱动您的网卡的细节。

\# Wireless NIC cards
device          wlan            # 802.11 support

通用 802.11 支持。 这行配置是无线网络所必需的。

device          wlan\_wep        # 802.11 WEP support
device          wlan\_ccmp       # 802.11 CCMP support
device          wlan\_tkip       # 802.11 TKIP support

针对 802.11 设备的加密支持。 如果希望使用加密和 802.11i 安全协议， 就需要这些配置行。

device          an         # Aironet 4500/4800 802.11 wireless NICs.
device          ath             # Atheros pci/cardbus NIC's
device          ath\_hal         # Atheros HAL (Hardware Access Layer)
device          ath\_rate\_sample # SampleRate tx rate control for ath
device          awi        # BayStack 660 and others
device          ral        # Ralink Technology RT2500 wireless NICs.
device          wi         # WaveLAN/Intersil/Symbol 802.11 wireless NICs.
#device         wl         # Older non 802.11 Wavelan wireless NIC.

用以支持多种无线网卡。

\# Pseudo devices
device   loop          # Network loopback

这是 TCP/IP 的通用回环设备。 如果您 telnet 或 FTP 到 `localhost` (也就是 `127.0.0.1`) 则将通过这个设备回到本机。 这个设备是 _必需的_。

device   random        # Entropy device

Cryptographically secure random number generator.

device   ether         # Ethernet support

`ether` 只有在使用以太网卡时才需要。 它包含了通用的以太网协议代码。

device   sl            # Kernel SLIP

`sl` 用以提供 SLIP 支持。 目前它几乎已经完全被 PPP 取代了， 因为后者更容易配置， 而且更适合调制解调器之间的连接， 并提供了更强大的功能。

device   ppp           # Kernel PPP

这一选项用以提供内核级的 PPP 支持， 用于拨号连接。 也有以用户模式运行的 PPP 实现， 使用 `tun` 并提供包括按需拨号在内的更为灵活的功能。

device   tun           # Packet tunnel.

它会被用户模式的 PPP 软件用到。 参考本书的 [PPP](https://docs.freebsd.org/zh-cn/books/handbook/ppp-and-slip/#userppp) 以了解更多的细节。

device   pty           # Pseudo-ttys (telnet etc)

这是一个 "pseudo-terminal" 或模拟登入端口。 它用来接收连入的 `telnet` 以及 `rlogin` 会话、 xterm， 以及一些其它程序如 Emacs 等。

device   md            # Memory disks

内存盘伪设备。

device   gif           # IPv6 and IPv4 tunneling

它实现了在 IPv4 上的 IPv6 隧道、 IPv6 上的 IPv4 隧道、 IPv4 上的 IPv4 隧道、 以及IPv6 上的 IPv6隧道。 `gif` 设备是 "自动克隆" 的， 它会根据需要自动创建设备节点。

device   faith         # IPv6-to-IPv4 relaying (translation)

这个伪设备能捕捉发给它的数据包，并把它们转发给 IPv4/IPv6 翻译服务程序。

\# The \`bpf' device enables the Berkeley Packet Filter.
# Be aware of the administrative consequences of enabling this!
# Note that 'bpf' is required for DHCP.
device   bpf           # Berkeley packet filter

这是 Berkeley 包过滤器。这个伪设备允许网络接口被置于混杂模式， 从而，截获广播网 (例如，以太网) 上的每一个数据包。 截获的数据报可以保存到磁盘上，也可以使用 [tcpdump(1)](https://man.freebsd.org/cgi/man.cgi?query=tcpdump&sektion=1&format=html) 程序来分析。

\# USB support
device          uhci          # UHCI PCI->USB interface
device          ohci          # OHCI PCI->USB interface
device          ehci          # EHCI PCI->USB interface (USB 2.0)
device          usb           # USB Bus (required)
#device         udbp          # USB Double Bulk Pipe devices
device          ugen          # Generic
device          uhid          # Human Interface Devices
device          ukbd          # Keyboard
device          ulpt          # Printer
device          umass         # Disks/Mass storage - Requires scbus and da
device          ums           # Mouse
device          ural          # Ralink Technology RT2500USB wireless NICs
device          urio          # Diamond Rio 500 MP3 player
device          uscanner      # Scanners
# USB Ethernet, requires mii
device          aue           # ADMtek USB Ethernet
device          axe           # ASIX Electronics USB Ethernet
device          cdce          # Generic USB over Ethernet
device          cue           # CATC USB Ethernet
device          kue           # Kawasaki LSI USB Ethernet
device          rue           # RealTek RTL8150 USB Ethernet

支持各类 USB 设备。

\# FireWire support
device          firewire      # FireWire bus code
device          sbp           # SCSI over FireWire (Requires scbus and da)
device          fwe           # Ethernet over FireWire (non-standard!)

支持各类火线设备。

要了解 FreeBSD 所支持的设备的其他情况， 请参考 /usr/src/sys/i386/conf/NOTES。

### 9.6.1. 大内存支持(PAE)[](#_大内存支持pae)

大内存配置的机器需要超过４GB的虚拟地址。 因为4GB的限制，Intel在Pentium®及后续的CPUs上增加了36位物理地址的支持。

物理地址扩展 (PAE) 是 Intel® Pentium® Pro和后续的 CPU 提供的一种允许将内存地址扩展到 64GB 的功能， FreeBSD 的所有最新版本均支持此功能， 并通过 `PAE` 选项来启用这个能力。 因为Intel架构的限制， 高于或低于 4GB 都没有什么区别， 超过 4GB 的内存分配只是简单地添加到可用内存池中。

为了让内核支持PAE，只要增加下面这一行到配置文件：

options		    PAE

<table><tbody><tr><td><i title="Note"></i></td><td><p>PAE在FreeBSD里面现在只能支持 Intel® IA-32处理器。 同时，还应该注意，FreeBSD的PAE支持没有经过广泛的测试， 和其他稳定的特性相比只能当作是beta版。</p></td></tr></tbody></table>

PAE在FreeBSD下有如下的一些限制：

-   进程不能接触大于4GB的VM空间。
    
-   没有使用 [bus\_dma(9)](https://man.freebsd.org/cgi/man.cgi?query=bus_dma&sektion=9&format=html) 接口的设备驱动程序在打开了 PAE 支持的内核中会导致数据损坏。 因为这个原因， PAE 内核配置文件 会把所有在打开了 PAE 的内核上不能工作的驱动程序排除在外。
    
-   一些系统打开了探测系统内存资源使用能力的功能，因为打开了 PAE支持，这些功能可能会被覆盖掉。 其中一个例子就是内核参数`kern.maxvnodes`，它是控制 内核能使用的最大vnodes数目的，建议重新调整它及其他类似参数到合适的值。
    
-   为了避免KVA的消耗，很有必要增加系统的内核虚拟地址， 或者减少很耗系统资源的内核选项的总量（看上面）。`KVA_PAGES`选项 可以用来增加KVA空间。
