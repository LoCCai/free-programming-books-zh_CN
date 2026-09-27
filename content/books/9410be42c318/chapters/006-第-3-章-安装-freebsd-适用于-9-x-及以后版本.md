<table><tbody><tr><td><i title="Important"></i></td><td><p>默认情况下， 在您看到下面这条信息之前， 安装程序不会对硬盘数据做任何修改：</p><div><pre>Your changes will now be written to disk.  If you
have chosen to overwrite existing data, it will
be PERMANENTLY ERASED. Are you sure you want to
commit your changes?</pre></div><p>在此之前均可安全退出， 抑或您担心进行了某些错误的配置， 也可以直接关闭电源。</p></td></tr></tbody></table>

### 3.4.1. 开机启动[](#bsdinstall-starting)

#### 3.4.1.1. 引导 i386™ 及 amd64 系统[](#bsdinstall-starting-i386)

1.  若要使用 [准备安装介质](#bsdinstall-installation-media) 所述的 USB 记忆棒引导， 则应在开机前将其插入计算机。
    
    若要使用 CDROM 引导， 则应在开机后立刻将其放入计算机。
    
2.  根据所使用的安装介质， 选择从 CDROM 或 USB启动。 在 BIOS 设置中， 可以选择特定的引导设备。 大多数系统还可以在启动时选择引导设备， 通常需要按 F10、 F11、 F12 或 Escape 键。
    
3.  如果您的计算机正常启动并加载了现有的操作系统， 那么请检查：
    
    1.  USB 记忆棒插入过晚或 CDROM 放入过晚， 请将其拔下或取出， 然后重新启动计算机并再次尝试。
        
    2.  BIOS 设置错误， 请重新设置。
        
    3.  BIOS 不支持从当前介质启动； 可以使用 [Plop Boot Manager](http://www.plop.at/en/bootmanager.html)， 它能够让老式计算机支持 CD 或 USB 启动。
        
    
4.  FreeBSD 将开始启动。 如果使用的是CDROM， 则会看到类似这样的显示（版本信息可以忽略）：
    
    ```
    Booting from CD-ROM...
    645MB medium detected
    CD Loader 1.2
    
    Building the boot loader arguments
    Looking up /BOOT/LOADER... Found
    Relocating the loader and the BTX
    Starting the BTX loader
    
    BTX loader 1.00 BTX version is 1.02
    Consoles: internal video/keyboard
    BIOS CD is cd0
    BIOS drive C: is disk0
    BIOS drive D: is disk1
    BIOS 636kB/261056kB available memory
    
    FreeBSD/i386 bootstrap loader, Revision 1.1
    
    Loading /boot/defaults/loader.conf
    /boot/kernel/kernel text=0x64daa0 data=0xa4e80+0xa9e40 syms=[0x4+0x6cac0+0x4+0x88e9d]
    \
    ```
    
5.  FreeBSD 引导加载器会显示：
    
    您可以等待十秒或按 Enter 键。
    

#### 3.4.1.2. 引导 Macintosh® PowerPC®[](#_引导_macintosh_powerpc)

在大多数机器上， 开机时按住 C 键可以从 CD 启动。 除此之外， 按住 Command+Option+O+F， 在非 Apple® 键盘上是 Windows+Alt+O+F， 然后在出现的提示符 `0 >` 下输入

```
 boot cd:,\ppc\loader cd:0
```

对于不带键盘的 Xserves 机器，请参考 [Apple® 支持网站](http://support.apple.com/kb/TA26930) 以了解如何引导至 Open Firmware。

#### 3.4.1.3. 引导 sparc64[](#_引导_sparc64)

多数 sparc64 系统均设置成了硬盘自启动。 若要安装 FreeBSD， 则应从网络或 CDROM 启动， 这就需要首先进入 PROM（OpenFirmware）。

重启系统后等待引导信息出现， 虽然其具体内容取决于机器型号， 但应该会类似：

```
Sun Blade 100 (UltraSPARC-IIe), Keyboard Present
Copyright 1998-2001 Sun Microsystems, Inc.  All rights reserved.
OpenBoot 4.2, 128 MB memory installed, Serial #51090132.
Ethernet address 0:3:ba:b:92:d4, Host ID: 830b92d4.
```

如果此时系统已经开始从硬盘启动， 那么请按下 L1+A 或 Stop+A 或在串口控制台发送 `BREAK`（在 [tip(1)](https://man.freebsd.org/cgi/man.cgi?query=tip&sektion=1&format=html) 或 [cu(1)](https://man.freebsd.org/cgi/man.cgi?query=cu&sektion=1&format=html) 中是 `~#`）以进入 PROM 提示符， 它应该如下所示：

```
ok        (1)
ok {0} (2)
```

<table><tbody><tr><td><i data-value="1"></i><b>1</b></td><td>这是在单 CPU 系统上的提示符。</td></tr><tr><td><i data-value="2"></i><b>2</b></td><td>这是在 SMP 系统上的提示符， 其中的数字表示可用的 CPU 个数。</td></tr></tbody></table>

现在， 放入 CDROM 并在 PROM 提示符后输入 `boot cdrom`。

### 3.4.2. 查看设备探测结果[](#bsdinstall-view-probe)

为了便于查阅， 屏幕上所显示的最后几百行字符会始终保存在缓冲区里。

若要浏览缓冲区， 可以按下 Scroll Lock 键来开启屏幕的滚动功能； 开启后即可使用方向键、 PageUp 键或 PageDown 键进行翻阅； 再次按下 Scroll Lock 键将关闭滚动功能。

浏览时将看到内核进行了设备探测， 其结果类似 [典型的设备探测结果](#bsdinstall-dev-probe) 中的文本， 但具体内容会因计算机中所包含的设备而有所不同。

典型的设备探测结果

```
Copyright (c) 1992-2011 The FreeBSD Project.
Copyright (c) 1979, 1980, 1983, 1986, 1988, 1989, 1991, 1992, 1993, 1994
        The Regents of the University of California. All rights reserved.
FreeBSD is a registered trademark of The FreeBSD Foundation.
FreeBSD 9.0-RELEASE #0 r225473M: Sun Sep 11 16:07:30 BST 2011
    root@psi:/usr/obj/usr/src/sys/GENERIC amd64
CPU: Intel(R) Core(TM)2 Duo CPU     T9400  @ 2.53GHz (2527.05-MHz K8-class CPU)
  Origin = "GenuineIntel"  Id = 0x10676  Family = 6  Model = 17  Stepping = 6
  Features=0xbfebfbff<FPU,VME,DE,PSE,TSC,MSR,PAE,MCE,CX8,APIC,SEP,MTRR,PGE,MCA,CMOV,PAT,PSE36,CLFLUSH,DTS,ACPI,MMX,FXSR,SSE,SSE2,SS,HTT,TM,PBE>
  Features2=0x8e3fd<SSE3,DTES64,MON,DS_CPL,VMX,SMX,EST,TM2,SSSE3,CX16,xTPR,PDCM,SSE4.1>
  AMD Features=0x20100800<SYSCALL,NX,LM>
  AMD Features2=0x1<LAHF>
  TSC: P-state invariant, performance statistics
real memory  = 3221225472 (3072 MB)
avail memory = 2926649344 (2791 MB)
Event timer "LAPIC" quality 400
ACPI APIC Table: <TOSHIB A0064   >
FreeBSD/SMP: Multiprocessor System Detected: 2 CPUs
FreeBSD/SMP: 1 package(s) x 2 core(s)
 cpu0 (BSP): APIC ID:  0
 cpu1 (AP): APIC ID:  1
ioapic0: Changing APIC ID to 1
ioapic0 <Version 2.0> irqs 0-23 on motherboard
kbd1 at kbdmux0
acpi0: <TOSHIB A0064> on motherboard
acpi0: Power Button (fixed)
acpi0: reservation of 0, a0000 (3) failed
acpi0: reservation of 100000, b6690000 (3) failed
Timecounter "ACPI-safe" frequency 3579545 Hz quality 850
acpi_timer0: <24-bit timer at 3.579545MHz> port 0xd808-0xd80b on acpi0
cpu0: <ACPI CPU> on acpi0
ACPI Warning: Incorrect checksum in table [ASF!] - 0xFE, should be 0x9A (20110527/tbutils-282)
cpu1: <ACPI CPU> on acpi0
pcib0: <ACPI Host-PCI bridge> port 0xcf8-0xcff on acpi0
pci0: <ACPI PCI bus> on pcib0
vgapci0: <VGA-compatible display> port 0xcff8-0xcfff mem 0xff400000-0xff7fffff,0xe0000000-0xefffffff irq 16 at device 2.0 on pci0
agp0: <Intel GM45 SVGA controller> on vgapci0
agp0: aperture size is 256M, detected 131068k stolen memory
vgapci1: <VGA-compatible display> mem 0xffc00000-0xffcfffff at device 2.1 on pci0
pci0: <simple comms> at device 3.0 (no driver attached)
em0: <Intel(R) PRO/1000 Network Connection 7.2.3> port 0xcf80-0xcf9f mem 0xff9c0000-0xff9dffff,0xff9fe000-0xff9fefff irq 20 at device 25.0 on pci0
em0: Using an MSI interrupt
em0: Ethernet address: 00:1c:7e:6a:ca:b0
uhci0: <Intel 82801I (ICH9) USB controller> port 0xcf60-0xcf7f irq 16 at device 26.0 on pci0
usbus0: <Intel 82801I (ICH9) USB controller> on uhci0
uhci1: <Intel 82801I (ICH9) USB controller> port 0xcf40-0xcf5f irq 21 at device 26.1 on pci0
usbus1: <Intel 82801I (ICH9) USB controller> on uhci1
uhci2: <Intel 82801I (ICH9) USB controller> port 0xcf20-0xcf3f irq 19 at device 26.2 on pci0
usbus2: <Intel 82801I (ICH9) USB controller> on uhci2
ehci0: <Intel 82801I (ICH9) USB 2.0 controller> mem 0xff9ff800-0xff9ffbff irq 19 at device 26.7 on pci0
usbus3: EHCI version 1.0
usbus3: <Intel 82801I (ICH9) USB 2.0 controller> on ehci0
hdac0: <Intel 82801I High Definition Audio Controller> mem 0xff9f8000-0xff9fbfff irq 22 at device 27.0 on pci0
pcib1: <ACPI PCI-PCI bridge> irq 17 at device 28.0 on pci0
pci1: <ACPI PCI bus> on pcib1
iwn0: <Intel(R) WiFi Link 5100> mem 0xff8fe000-0xff8fffff irq 16 at device 0.0 on pci1
pcib2: <ACPI PCI-PCI bridge> irq 16 at device 28.1 on pci0
pci2: <ACPI PCI bus> on pcib2
pcib3: <ACPI PCI-PCI bridge> irq 18 at device 28.2 on pci0
pci4: <ACPI PCI bus> on pcib3
pcib4: <ACPI PCI-PCI bridge> at device 30.0 on pci0
pci5: <ACPI PCI bus> on pcib4
cbb0: <RF5C476 PCI-CardBus Bridge> at device 11.0 on pci5
cardbus0: <CardBus bus> on cbb0
pccard0: <16-bit PCCard bus> on cbb0
isab0: <PCI-ISA bridge> at device 31.0 on pci0
isa0: <ISA bus> on isab0
ahci0: <Intel ICH9M AHCI SATA controller> port 0x8f58-0x8f5f,0x8f54-0x8f57,0x8f48-0x8f4f,0x8f44-0x8f47,0x8f20-0x8f3f mem 0xff9fd800-0xff9fdfff irq 19 at device 31.2 on pci0
ahci0: AHCI v1.20 with 4 3Gbps ports, Port Multiplier not supported
ahcich0: <AHCI channel> at channel 0 on ahci0
ahcich1: <AHCI channel> at channel 1 on ahci0
ahcich2: <AHCI channel> at channel 4 on ahci0
acpi_lid0: <Control Method Lid Switch> on acpi0
battery0: <ACPI Control Method Battery> on acpi0
acpi_button0: <Power Button> on acpi0
acpi_acad0: <AC Adapter> on acpi0
acpi_toshiba0: <Toshiba HCI Extras> on acpi0
acpi_tz0: <Thermal Zone> on acpi0
attimer0: <AT timer> port 0x40-0x43 irq 0 on acpi0
Timecounter "i8254" frequency 1193182 Hz quality 0
Event timer "i8254" frequency 1193182 Hz quality 100
atkbdc0: <Keyboard controller (i8042)> port 0x60,0x64 irq 1 on acpi0
atkbd0: <AT Keyboard> irq 1 on atkbdc0
kbd0 at atkbd0
atkbd0: [GIANT-LOCKED]
psm0: <PS/2 Mouse> irq 12 on atkbdc0
psm0: [GIANT-LOCKED]
psm0: model GlidePoint, device ID 0
atrtc0: <AT realtime clock> port 0x70-0x71 irq 8 on acpi0
Event timer "RTC" frequency 32768 Hz quality 0
hpet0: <High Precision Event Timer> iomem 0xfed00000-0xfed003ff on acpi0
Timecounter "HPET" frequency 14318180 Hz quality 950
Event timer "HPET" frequency 14318180 Hz quality 450
Event timer "HPET1" frequency 14318180 Hz quality 440
Event timer "HPET2" frequency 14318180 Hz quality 440
Event timer "HPET3" frequency 14318180 Hz quality 440
uart0: <16550 or compatible> port 0x3f8-0x3ff irq 4 flags 0x10 on acpi0
sc0: <System console> at flags 0x100 on isa0
sc0: VGA <16 virtual consoles, flags=0x300>
vga0: <Generic ISA VGA> at port 0x3c0-0x3df iomem 0xa0000-0xbffff on isa0
ppc0: cannot reserve I/O port range
est0: <Enhanced SpeedStep Frequency Control> on cpu0
p4tcc0: <CPU Frequency Thermal Control> on cpu0
est1: <Enhanced SpeedStep Frequency Control> on cpu1
p4tcc1: <CPU Frequency Thermal Control> on cpu1
Timecounters tick every 1.000 msec
hdac0: HDA Codec #0: Realtek ALC268
hdac0: HDA Codec #1: Lucent/Agere Systems (Unknown)
pcm0: <HDA Realtek ALC268 PCM #0 Analog> at cad 0 nid 1 on hdac0
pcm1: <HDA Realtek ALC268 PCM #1 Analog> at cad 0 nid 1 on hdac0
usbus0: 12Mbps Full Speed USB v1.0
usbus1: 12Mbps Full Speed USB v1.0
usbus2: 12Mbps Full Speed USB v1.0
usbus3: 480Mbps High Speed USB v2.0
ugen0.1: <Intel> at usbus0
uhub0: <Intel UHCI root HUB, class 9/0, rev 1.00/1.00, addr 1> on usbus0
ugen1.1: <Intel> at usbus1
uhub1: <Intel UHCI root HUB, class 9/0, rev 1.00/1.00, addr 1> on usbus1
ugen2.1: <Intel> at usbus2
uhub2: <Intel UHCI root HUB, class 9/0, rev 1.00/1.00, addr 1> on usbus2
ugen3.1: <Intel> at usbus3
uhub3: <Intel EHCI root HUB, class 9/0, rev 2.00/1.00, addr 1> on usbus3
uhub0: 2 ports with 2 removable, self powered
uhub1: 2 ports with 2 removable, self powered
uhub2: 2 ports with 2 removable, self powered
uhub3: 6 ports with 6 removable, self powered
ugen2.2: <vendor 0x0b97> at usbus2
uhub8: <vendor 0x0b97 product 0x7761, class 9/0, rev 1.10/1.10, addr 2> on usbus2
ugen1.2: <Microsoft> at usbus1
ada0 at ahcich0 bus 0 scbus1 target 0 lun 0
ada0: <Hitachi HTS543225L9SA00 FBEOC43C> ATA-8 SATA 1.x device
ada0: 150.000MB/s transfers (SATA 1.x, UDMA6, PIO 8192bytes)
ada0: Command Queueing enabled
ada0: 238475MB (488397168 512 byte sectors: 16H 63S/T 16383C)
ada0: Previously was known as ad4
ums0: <Microsoft Microsoft 3-Button Mouse with IntelliEyeTM, class 0/0, rev 1.10/3.00, addr 2> on usbus1
SMP: AP CPU #1 Launched!
cd0 at ahcich1 bus 0 scbus2 target 0 lun 0
cd0: <TEAC DV-W28S-RT 7.0C> Removable CD-ROM SCSI-0 device
cd0: 150.000MB/s transfers (SATA 1.x, ums0: 3 buttons and [XYZ] coordinates ID=0
UDMA2, ATAPI 12bytes, PIO 8192bytes)
cd0: cd present [1 x 2048 byte records]
ugen0.2: <Microsoft> at usbus0
ukbd0: <Microsoft Natural Ergonomic Keyboard 4000, class 0/0, rev 2.00/1.73, addr 2> on usbus0
kbd2 at ukbd0
uhid0: <Microsoft Natural Ergonomic Keyboard 4000, class 0/0, rev 2.00/1.73, addr 2> on usbus0
Trying to mount root from cd9660:/dev/iso9660/FREEBSD_INSTALL [ro]...
```

请仔细检查设备探测结果， 以确定 FreeBSD 找到了所有您希望使用的设备。 没有找到的设备并不会在这里列出， 因为默认的 GENERIC 内核中不包含它们； 可以通过 [内核模块](https://docs.freebsd.org/zh-cn/books/handbook/kernelconfig/#kernelconfig-modules) 对这些设备提供支持。

设备探测完成后， 您将看到 [选择安装介质的使用方式](#bsdinstall-choose-mode)， 表明安装介质共有三种用途： 安装 FreeBSD 、 作为"\`Live CD\`"或引导至 FreeBSD 的命令行界面。 请使用方向键选择一项后按 Enter 键确认。

![bsdinstall choose mode](https://docs.freebsd.org/images/books/handbook/bsdinstall/bsdinstall-choose-mode.png)

图 2. 选择安装介质的使用方式

在这里， 请选择 **Install** 以运行安装程序。
