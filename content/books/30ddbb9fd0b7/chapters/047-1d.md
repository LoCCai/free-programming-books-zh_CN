**源代码：** [Lib/stat.py](https://github.com/python/cpython/tree/3.14/Lib/stat.py)

* * *

`stat` 模块定义了一些用于解读 [`os.stat()`](https://docs.python.org/zh-cn/3/library/os.html#os.stat "os.stat"), [`os.fstat()`](https://docs.python.org/zh-cn/3/library/os.html#os.fstat "os.fstat") 和 [`os.lstat()`](https://docs.python.org/zh-cn/3/library/os.html#os.lstat "os.lstat") (如果它们存在) 输出结果的常量和函数。 有关 `stat()`, `fstat()` 和 `lstat()` 调用的完整细节，请参阅你的系统文档。

在 3.4 版本发生变更: stat 模块是通过 C 实现来支持的。

`stat` 模块定义了下列函数来检测特定的文件类型：

stat.S\_ISDIR(_mode_)[¶](#stat.S_ISDIR "Link to this definition")

如果 mode 来自一个目录则返回非零值。

stat.S\_ISCHR(_mode_)[¶](#stat.S_ISCHR "Link to this definition")

如果 mode 来自一个字符特殊设备文件则返回非零值。

stat.S\_ISBLK(_mode_)[¶](#stat.S_ISBLK "Link to this definition")

如果 mode 来自一个块特殊设备文件则返回非零值。

stat.S\_ISREG(_mode_)[¶](#stat.S_ISREG "Link to this definition")

如果 mode 来自一个常规文件则返回非零值。

stat.S\_ISFIFO(_mode_)[¶](#stat.S_ISFIFO "Link to this definition")

如果 mode 来自一个 FIFO (命名管道) 则返回非零值。

stat.S\_ISLNK(_mode_)[¶](#stat.S_ISLNK "Link to this definition")

如果 mode 来自一个符号链接则返回非零值。

stat.S\_ISSOCK(_mode_)[¶](#stat.S_ISSOCK "Link to this definition")

如果 mode 来自一个套接字则返回非零值。

stat.S\_ISDOOR(_mode_)[¶](#stat.S_ISDOOR "Link to this definition")

如果 mode 来自一个门则返回非零值。

Added in version 3.4.

stat.S\_ISPORT(_mode_)[¶](#stat.S_ISPORT "Link to this definition")

如果 mode 来自一个事件端口则返回非零值。

Added in version 3.4.

stat.S\_ISWHT(_mode_)[¶](#stat.S_ISWHT "Link to this definition")

如果 mode 来自一个 whiteout 则返回非零值。

Added in version 3.4.

定义了两个附加函数用于对文件模式进行更一般化的操作：

stat.S\_IMODE(_mode_)[¶](#stat.S_IMODE "Link to this definition")

返回文件模式中可由 [`os.chmod()`](https://docs.python.org/zh-cn/3/library/os.html#os.chmod "os.chmod") 进行设置的部分 --- 即文件的 permission 位，加上 sticky 位、set-group-id 以及 set-user-id 位（在支持这些部分的系统上）。

stat.S\_IFMT(_mode_)[¶](#stat.S_IFMT "Link to this definition")

返回文件模式中描述文件类型的部分（供上面的 `S_IS*()` 函数使用）。

通常，你将使用 `os.path.is*()` 函数来检测文件的类型；这里提供的函数在你要对同一文件执行多项检测并且希望避免每项检测的 `stat()` 系统调用的开销时会很有用。这些函数也适用于检测有关未被 [`os.path`](https://docs.python.org/zh-cn/3/library/os.path.html#module-os.path "os.path: Operations on pathnames.") 处理的信息，如检测块和字符设备等。

示例:

import os, sys
from stat import \*

def walktree(top, callback):
    '''在根位于顶部的目录树中递归地下行，
       为每个常规文件调用回调函数'''

    for f in os.listdir(top):
        pathname \= os.path.join(top, f)
        mode \= os.lstat(pathname).st\_mode
        if S\_ISDIR(mode):
            \# 是个目录，递归进去
            walktree(pathname, callback)
        elif S\_ISREG(mode):
            \# 是个文件，调用回调函数
            callback(pathname)
        else:
            \# 未知文件类型，打印一条消息
            print('Skipping %s' % pathname)

def visitfile(file):
    print('visiting', file)

if \_\_name\_\_ \== '\_\_main\_\_':
    walktree(sys.argv\[1\], visitfile)

另外还提供了一个附加的辅助函数用来将文件模式转换为人类易读的字符串：

stat.filemode(_mode_)[¶](#stat.filemode "Link to this definition")

将文件模式转换为 '-rwxrwxrwx' 形式的字符串。

Added in version 3.3.

在 3.4 版本发生变更: 此函数支持 [`S_IFDOOR`](#stat.S_IFDOOR "stat.S_IFDOOR"), [`S_IFPORT`](#stat.S_IFPORT "stat.S_IFPORT") 和 [`S_IFWHT`](#stat.S_IFWHT "stat.S_IFWHT")。

以下所有变量是一些简单的符号索引，用于访问 [`os.stat()`](https://docs.python.org/zh-cn/3/library/os.html#os.stat "os.stat"), [`os.fstat()`](https://docs.python.org/zh-cn/3/library/os.html#os.fstat "os.fstat") 或 [`os.lstat()`](https://docs.python.org/zh-cn/3/library/os.html#os.lstat "os.lstat") 所返回的 10 条目元组。

stat.ST\_MODE[¶](#stat.ST_MODE "Link to this definition")

inode 保护模式。

stat.ST\_INO[¶](#stat.ST_INO "Link to this definition")

Inode 号

stat.ST\_DEV[¶](#stat.ST_DEV "Link to this definition")

Inode 所在的设备。

stat.ST\_NLINK[¶](#stat.ST_NLINK "Link to this definition")

Inode 拥有的链接数量。

stat.ST\_UID[¶](#stat.ST_UID "Link to this definition")

所有者的用户 ID。

stat.ST\_GID[¶](#stat.ST_GID "Link to this definition")

所有者的用户组 ID。

stat.ST\_SIZE[¶](#stat.ST_SIZE "Link to this definition")

以字节为单位的普通文件大小；对于某些特殊文件则是所等待的数据量。

stat.ST\_ATIME[¶](#stat.ST_ATIME "Link to this definition")

上次访问的时间。

stat.ST\_MTIME[¶](#stat.ST_MTIME "Link to this definition")

上次修改的时间。

stat.ST\_CTIME[¶](#stat.ST_CTIME "Link to this definition")

。在某些系统上（例如 Unix）是元数据的最后修改时间，而在其他系统上（例如 Windows）则是创建时间（请参阅系统平台的文档了解相关细节）。

对于“文件大小”的解析可因文件类型的不同而变化。对于普通文件就是文件的字节数。对于大部分种类的 Unix（特别包括 Linux）的 FIFO 和套接字来说，“大小”则是指在调用 [`os.stat()`](https://docs.python.org/zh-cn/3/library/os.html#os.stat "os.stat"), [`os.fstat()`](https://docs.python.org/zh-cn/3/library/os.html#os.fstat "os.fstat") 或 [`os.lstat()`](https://docs.python.org/zh-cn/3/library/os.html#os.lstat "os.lstat") 时等待读取的字节数；这在某些时候很有用处，特别是在一个非阻塞的打开后轮询这些特殊文件中的一个时。 其他字符和块设备的文件大小字段的含义还会有更多变化，具体取决于底层系统调用的实现方式。

以下变量定义了在 [`ST_MODE`](#stat.ST_MODE "stat.ST_MODE") 字段中使用的旗标。

使用上面的函数会比使用第一组旗标更容易移植：

stat.S\_IFSOCK[¶](#stat.S_IFSOCK "Link to this definition")

套接字。

stat.S\_IFLNK[¶](#stat.S_IFLNK "Link to this definition")

符号链接。

stat.S\_IFREG[¶](#stat.S_IFREG "Link to this definition")

普通文件。

stat.S\_IFBLK[¶](#stat.S_IFBLK "Link to this definition")

块设备。

stat.S\_IFDIR[¶](#stat.S_IFDIR "Link to this definition")

目录。

stat.S\_IFCHR[¶](#stat.S_IFCHR "Link to this definition")

字符设备。

stat.S\_IFIFO[¶](#stat.S_IFIFO "Link to this definition")

FIFO.

stat.S\_IFDOOR[¶](#stat.S_IFDOOR "Link to this definition")

门。

Added in version 3.4.

stat.S\_IFPORT[¶](#stat.S_IFPORT "Link to this definition")

事件端口。

Added in version 3.4.

stat.S\_IFWHT[¶](#stat.S_IFWHT "Link to this definition")

Whiteout.

Added in version 3.4.

备注

[`S_IFDOOR`](#stat.S_IFDOOR "stat.S_IFDOOR"), [`S_IFPORT`](#stat.S_IFPORT "stat.S_IFPORT") 或 [`S_IFWHT`](#stat.S_IFWHT "stat.S_IFWHT") 等文件类型在不受系统平台支持时会被定义为 0。

以下旗标还可以在 [`os.chmod()`](https://docs.python.org/zh-cn/3/library/os.html#os.chmod "os.chmod") 的 _mode_ 参数中使用：

stat.S\_ISUID[¶](#stat.S_ISUID "Link to this definition")

设置 UID 位。

stat.S\_ISGID[¶](#stat.S_ISGID "Link to this definition")

设置分组 ID 位。这个位有几种特殊用途。对于目录它表示该目录将使用 BSD 语义：在其中创建的文件将从目录继承其分组 ID，而不是从创建进程的有效分组 ID 继承，并且在其中创建的目录也将设置 [`S_ISGID`](#stat.S_ISGID "stat.S_ISGID") 位。对于没有设置分组执行位 ([`S_IXGRP`](#stat.S_IXGRP "stat.S_IXGRP")) 的文件，设置分组 ID 位表示强制性文件/记录锁定 (另请参见 [`S_ENFMT`](#stat.S_ENFMT "stat.S_ENFMT"))。

stat.S\_ISVTX[¶](#stat.S_ISVTX "Link to this definition")

固定位。当对目录设置该位时则意味着此目录中的文件只能由文件所有者、目录所有者或特权进程来重命名或删除。

stat.S\_IRWXU[¶](#stat.S_IRWXU "Link to this definition")

文件所有者权限的掩码。

stat.S\_IRUSR[¶](#stat.S_IRUSR "Link to this definition")

所有者具有读取权限。

stat.S\_IWUSR[¶](#stat.S_IWUSR "Link to this definition")

所有者具有写入权限。

stat.S\_IXUSR[¶](#stat.S_IXUSR "Link to this definition")

所有者具有执行权限。

stat.S\_IRWXG[¶](#stat.S_IRWXG "Link to this definition")

组权限的掩码。

stat.S\_IRGRP[¶](#stat.S_IRGRP "Link to this definition")

组具有读取权限。

stat.S\_IWGRP[¶](#stat.S_IWGRP "Link to this definition")

组具有写入权限。

stat.S\_IXGRP[¶](#stat.S_IXGRP "Link to this definition")

组具有执行权限。

stat.S\_IRWXO[¶](#stat.S_IRWXO "Link to this definition")

其他人（不在组中）的权限掩码。

stat.S\_IROTH[¶](#stat.S_IROTH "Link to this definition")

其他人具有读取权限。

stat.S\_IWOTH[¶](#stat.S_IWOTH "Link to this definition")

其他人具有写入权限。

stat.S\_IXOTH[¶](#stat.S_IXOTH "Link to this definition")

其他人具有执行权限。

stat.S\_ENFMT[¶](#stat.S_ENFMT "Link to this definition")

System V 执行文件锁定。此旗标是与 [`S_ISGID`](#stat.S_ISGID "stat.S_ISGID") 共享的：文件/记录锁定会针对未设置分组执行位 ([`S_IXGRP`](#stat.S_IXGRP "stat.S_IXGRP")) 的文件强制执行。

stat.S\_IREAD[¶](#stat.S_IREAD "Link to this definition")

Unix V7 中 [`S_IRUSR`](#stat.S_IRUSR "stat.S_IRUSR") 的同义词。

stat.S\_IWRITE[¶](#stat.S_IWRITE "Link to this definition")

Unix V7 中 [`S_IWUSR`](#stat.S_IWUSR "stat.S_IWUSR") 的同义词。

stat.S\_IEXEC[¶](#stat.S_IEXEC "Link to this definition")

Unix V7 中 [`S_IXUSR`](#stat.S_IXUSR "stat.S_IXUSR") 的同义词。

以下旗标可以在 [`os.chflags()`](https://docs.python.org/zh-cn/3/library/os.html#os.chflags "os.chflags") 的 _flags_ 参数中使用：

stat.UF\_SETTABLE[¶](#stat.UF_SETTABLE "Link to this definition")

所有用户可设置的旗标。

Added in version 3.13.

stat.UF\_NODUMP[¶](#stat.UF_NODUMP "Link to this definition")

不要转储文件。

stat.UF\_IMMUTABLE[¶](#stat.UF_IMMUTABLE "Link to this definition")

文件不能被更改。

stat.UF\_APPEND[¶](#stat.UF_APPEND "Link to this definition")

文件只能被附加。

stat.UF\_OPAQUE[¶](#stat.UF_OPAQUE "Link to this definition")

当通过联合堆栈查看时，目录是不透明的。

stat.UF\_NOUNLINK[¶](#stat.UF_NOUNLINK "Link to this definition")

文件不能重命名或删除。

stat.UF\_COMPRESSED[¶](#stat.UF_COMPRESSED "Link to this definition")

文件是压缩存储的（macOS 10.6+）。

stat.UF\_TRACKED[¶](#stat.UF_TRACKED "Link to this definition")

用于处理文档 ID (macOS)

Added in version 3.13.

stat.UF\_DATAVAULT[¶](#stat.UF_DATAVAULT "Link to this definition")

文件需要赋予读取或写入权限 (macOS 10.13+)

Added in version 3.13.

stat.UF\_HIDDEN[¶](#stat.UF_HIDDEN "Link to this definition")

文件不应在 GUI 中显示（macOS 10.5+）。

stat.SF\_SETTABLE[¶](#stat.SF_SETTABLE "Link to this definition")

所有超级用户可修改的旗标

Added in version 3.13.

stat.SF\_SUPPORTED[¶](#stat.SF_SUPPORTED "Link to this definition")

所有超级用户支持的旗标

Added in version 3.13.

stat.SF\_SYNTHETIC[¶](#stat.SF_SYNTHETIC "Link to this definition")

所有超级用户只读的合成旗标

Added in version 3.13.

stat.SF\_ARCHIVED[¶](#stat.SF_ARCHIVED "Link to this definition")

文件可以被存档。

stat.SF\_IMMUTABLE[¶](#stat.SF_IMMUTABLE "Link to this definition")

文件不能被更改。

stat.SF\_APPEND[¶](#stat.SF_APPEND "Link to this definition")

文件只能被附加。

stat.SF\_RESTRICTED[¶](#stat.SF_RESTRICTED "Link to this definition")

文件需要赋予写入权限 (macOS 10.13+)

Added in version 3.13.

stat.SF\_NOUNLINK[¶](#stat.SF_NOUNLINK "Link to this definition")

文件不能重命名或删除。

stat.SF\_SNAPSHOT[¶](#stat.SF_SNAPSHOT "Link to this definition")

文件是一个快照文件。

stat.SF\_FIRMLINK[¶](#stat.SF_FIRMLINK "Link to this definition")

文件是一个固定链接 (macOS 10.15+)

Added in version 3.13.

stat.SF\_DATALESS[¶](#stat.SF_DATALESS "Link to this definition")

文件是一个无数据对象 (macOS 10.15+)

Added in version 3.13.

请参阅 \*BSD 或 macOS 系统的指南页 _[chflags(2)](https://manpages.debian.org/chflags\(2\))_ 来了解详情。

在 Windows 上，以下文件属性常量可被用来检测 [`os.stat()`](https://docs.python.org/zh-cn/3/library/os.html#os.stat "os.stat") 所返回的 `st_file_attributes` 成员中的位。请参阅 [Windows API 文档](https://msdn.microsoft.com/en-us/library/windows/desktop/gg258117.aspx) 了解有关这些常量含义的详情。

stat.FILE\_ATTRIBUTE\_ARCHIVE[¶](#stat.FILE_ATTRIBUTE_ARCHIVE "Link to this definition")

stat.FILE\_ATTRIBUTE\_COMPRESSED[¶](#stat.FILE_ATTRIBUTE_COMPRESSED "Link to this definition")

stat.FILE\_ATTRIBUTE\_DEVICE[¶](#stat.FILE_ATTRIBUTE_DEVICE "Link to this definition")

stat.FILE\_ATTRIBUTE\_DIRECTORY[¶](#stat.FILE_ATTRIBUTE_DIRECTORY "Link to this definition")

stat.FILE\_ATTRIBUTE\_ENCRYPTED[¶](#stat.FILE_ATTRIBUTE_ENCRYPTED "Link to this definition")

stat.FILE\_ATTRIBUTE\_HIDDEN[¶](#stat.FILE_ATTRIBUTE_HIDDEN "Link to this definition")

stat.FILE\_ATTRIBUTE\_INTEGRITY\_STREAM[¶](#stat.FILE_ATTRIBUTE_INTEGRITY_STREAM "Link to this definition")

stat.FILE\_ATTRIBUTE\_NORMAL[¶](#stat.FILE_ATTRIBUTE_NORMAL "Link to this definition")

stat.FILE\_ATTRIBUTE\_NOT\_CONTENT\_INDEXED[¶](#stat.FILE_ATTRIBUTE_NOT_CONTENT_INDEXED "Link to this definition")

stat.FILE\_ATTRIBUTE\_NO\_SCRUB\_DATA[¶](#stat.FILE_ATTRIBUTE_NO_SCRUB_DATA "Link to this definition")

stat.FILE\_ATTRIBUTE\_OFFLINE[¶](#stat.FILE_ATTRIBUTE_OFFLINE "Link to this definition")

stat.FILE\_ATTRIBUTE\_READONLY[¶](#stat.FILE_ATTRIBUTE_READONLY "Link to this definition")

stat.FILE\_ATTRIBUTE\_REPARSE\_POINT[¶](#stat.FILE_ATTRIBUTE_REPARSE_POINT "Link to this definition")

stat.FILE\_ATTRIBUTE\_SPARSE\_FILE[¶](#stat.FILE_ATTRIBUTE_SPARSE_FILE "Link to this definition")

stat.FILE\_ATTRIBUTE\_SYSTEM[¶](#stat.FILE_ATTRIBUTE_SYSTEM "Link to this definition")

stat.FILE\_ATTRIBUTE\_TEMPORARY[¶](#stat.FILE_ATTRIBUTE_TEMPORARY "Link to this definition")

stat.FILE\_ATTRIBUTE\_VIRTUAL[¶](#stat.FILE_ATTRIBUTE_VIRTUAL "Link to this definition")

Added in version 3.5.

在 Windows 上，以下常量可被用来与 [`os.lstat()`](https://docs.python.org/zh-cn/3/library/os.html#os.lstat "os.lstat") 所返回的 `st_reparse_tag` 成员进行比较。 这些是最主要的常量，而不是详尽的清单。

stat.IO\_REPARSE\_TAG\_SYMLINK[¶](#stat.IO_REPARSE_TAG_SYMLINK "Link to this definition")

stat.IO\_REPARSE\_TAG\_MOUNT\_POINT[¶](#stat.IO_REPARSE_TAG_MOUNT_POINT "Link to this definition")

stat.IO\_REPARSE\_TAG\_APPEXECLINK[¶](#stat.IO_REPARSE_TAG_APPEXECLINK "Link to this definition")

Added in version 3.8.
