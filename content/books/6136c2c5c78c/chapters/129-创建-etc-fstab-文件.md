一些程序用 /etc/fstab 文件来确定哪一些文件系统是默认被加载了，加载顺序情况，哪些必须被检查的(完整性错误校验)。创建一个新的文件系统表大致如下所示：

cat > /etc/fstab << "EOF"
\# Begin /etc/fstab

# file system  mount-point  type   options         dump  fsck
#                                                        order

/dev/_<xxx>_     /            _<fff>_  defaults        1     1
/dev/_<yyy>_     swap         swap   pri=1           0     0
proc           /proc        proc   defaults        0     0
sysfs          /sys         sysfs  defaults        0     0
devpts         /dev/pts     devpts gid=4,mode=620  0     0
shm            /dev/shm     tmpfs  defaults        0     0
# End /etc/fstab
EOF

在你的系统上替换 _<xxx>_，_<yyy>_，和 _<fff>_ 为适当的值，例如， hda2, hda5，and ext3。 关于文件中六个字段的详细信息，可通过**man 5 fstab**获取。

这个 /dev/shm 挂载点是为 tmpfs (虚拟内存文件系统)能包括启用POSIX共享内存。这需要内核必须在构建的时候支持这个选项才能起作用(更多相关信息在下一个章节)。请注意，目前很少软件使用POSIX共享内存。 所以，认为 /dev/shm mount 挂载点选项是可选择的，更多信息请查看内核源码树里的 Documentation/filesystems/tmpfs.txt。

文件系统有 MS-DOS 或 Windows 血统(i.e.: vfat，ntfs，smbfs, cifs，iso9660，udf)需要有"iocharset" 加载选项载，以使文件名称的非ASCII(美国信息交换标准代码)特征被适当解释。这个选项和你的所处位置特征是一样的，用这个方式调整内核支持它。如果需要操作相关的特征定义(在 File systems -> Native Language Support下可找到)，可以编译进内核里或编译成模块。 "codepage" 选项同样也是为 vfat 和 smbfs 文件系统所需要. 它应该被设置为 MS-DOS 在你的国家里使用的 codepage 数字号。举个例子，为了挂在 USB flash 设备，ru\_RU.KOI8-R 的使用者需要在 /etc/fstab 里的以下行:

/dev/sda1    /media/flash vfat
    noauto,user,quiet,showexec,iocharset=koi8r,codepage=866 0 0

ru\_RU.UTF-8 使用者的相应行：

/dev/sda1    /media/flash vfat
    noauto,user,quiet,showexec,iocharset=utf8,codepage=866 0 0

![\[Note\]](https://www.jinbuguo.com/lfs/lfs62/images/note.png)

### 注意

在后面的例子里，内核发出如下信息：

FAT: utf8 is not a recommended IO charset for FAT filesystems,
    filesystem will be case sensitive!

这个否定的建议应该可以被忽略，因为所有的其他"iocharset" 值选项造成UTF-8 locales文件名的错误显示。

它也可能是在内核构造的时候为一些文件系统指定默认的 codepage 和 iocharset。相关的参数是指定的 "默认NLS选项" (CONFIG\_NLS\_DEFAULT)，"默认远程NLS选项" (CONFIG\_SMB\_NLS\_DEFAULT)，"默认的FAT的codepage " (CONFIG\_FAT\_DEFAULT\_CODEPAGE)，和 "默认FAT的iocharset" (CONFIG\_FAT\_DEFAULT\_IOCHARSET)。在这里不叙述在内核编译时为 ntfs 文件的系统设置。
