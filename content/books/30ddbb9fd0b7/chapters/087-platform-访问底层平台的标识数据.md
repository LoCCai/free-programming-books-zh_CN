**源代码：** [Lib/platform.py](https://github.com/python/cpython/tree/3.14/Lib/platform.py)

* * *

备注

特定平台按字母顺序排列，Linux 包括在 Unix 小节之中。

## 跨平台[¶](#cross-platform "Link to this heading")

platform.architecture(_executable\=sys.executable_, _bits\=''_, _linkage\=''_)[¶](#platform.architecture "Link to this definition")

查询给定的可执行文件（默认为 Python 解释器二进制码文件）来获取各种架构信息。

返回一个元组 `(bits, linkage)`，其中包含可执行文件所使用的位架构和链接格式信息。 这两个值均以字符串形式返回。

无法确定的值将返回为形参预设所给出的值。 如果给出的位数为 `''`，则会使用 `sizeof(pointer)` (或者当 Python 版本 < 1.5.2 时为 `sizeof(long)`) 作为所支持的指针大小的提示。

此函数依赖于系统的 `file` 命令来执行实际的操作。 这在几乎所有 Unix 平台和某些非 Unix 平台上只有当可执行文件指向 Python 解释器时才可用。 当以上要求不满足时将会使用合理的默认值。

备注

在 macOS (也许还有其他平台) 上，可执行文件可能是包含多种架构的通用文件。

要获取当前解释器的“64 位性”，更可靠的做法是查询 [`sys.maxsize`](https://docs.python.org/zh-cn/3/library/sys.html#sys.maxsize "sys.maxsize") 属性:

is\_64bits \= sys.maxsize \> 2\*\*32

platform.machine()[¶](#platform.machine "Link to this definition")

返回机器类型，例如 `'AMD64'` 。 如果该值无法确定则会返回一个空字符串。

输出内容依赖于具体平台并可能在大小写和命名惯例方面存在差异。

platform.node()[¶](#platform.node "Link to this definition")

返回计算机的网络名称（可能不是完整限定名称！）。 如果该值无法确定则会返回一个空字符串。

platform.platform(_aliased\=False_, _terse\=False_)[¶](#platform.platform "Link to this definition")

返回一个标识底层平台的字符串，其中带有尽可能多的有用信息。

输出信息的目标是“人类易读”而非机器易解析。 它在不同平台上可能看起来不一致，这是有意为之的。

如果 _aliased_ 为真值，此函数将针对各种系统名称与其通常名称不同的平台使用别名来报告，例如 SunOS 将被报告为 Solaris。 [`system_alias()`](#platform.system_alias "platform.system_alias") 函数将被用于实现此功能。

将 _terse_ 设为真值将导致此函数只返回标识平台所必须的最小量信息。

在 3.8 版本发生变更: 在 macOS 上，此函数现在会在 [`mac_ver()`](#platform.mac_ver "platform.mac_ver") 返回的发布版字符串非空时使用它，以便获取 macOS 版本而非 darwin 版本。

platform.processor()[¶](#platform.processor "Link to this definition")

返回（真实的）处理器名称，例如 `'amdk6'`。

如果该值无法确定则将返回空字符串。 请注意许多平台都不提供此信息或是简单地返回与 [`machine()`](#platform.machine "platform.machine") 相同的值。 NetBSD 则会提供此信息。

platform.python\_build()[¶](#platform.python_build "Link to this definition")

返回一个元组 `(buildno, builddate)`，以字符串表示的 Python 编译编号和日期。

platform.python\_compiler()[¶](#platform.python_compiler "Link to this definition")

返回一个标识用于编译 Python 的编译器的字符串。

platform.python\_branch()[¶](#platform.python_branch "Link to this definition")

返回一个标识 Python 实现的 SCM 分支的字符串。

platform.python\_implementation()[¶](#platform.python_implementation "Link to this definition")

返回一个标识 Python 实现的字符串。 可能的返回值有: 'CPython', 'IronPython', 'Jython', 'PyPy'。

platform.python\_revision()[¶](#platform.python_revision "Link to this definition")

返回一个标识 Python 实现的 SCM 修订版的字符串。

platform.python\_version()[¶](#platform.python_version "Link to this definition")

将 Python 版本以字符串 `'major.minor.patchlevel'` 形式返回。

请注意此返回值不同于 Python `sys.version`，它将总是包括 patchlevel (默认为 0)。

platform.python\_version\_tuple()[¶](#platform.python_version_tuple "Link to this definition")

将 Python 版本以字符串元组 `(major, minor, patchlevel)` 形式返回。

请注意此返回值不同于 Python `sys.version`，它将总是包括 patchlevel (默认为 `'0'`)。

platform.release()[¶](#platform.release "Link to this definition")

返回系统的发布版本，例如 `'2.2.0'` 或 `'NT'`，如果该值无法确定则将返回一个空字符串。

在 iOS 和 Android 上，这将是面向用户的 OS 发布版本号。 要获取 Darwin 或 Linux 内核发布版本，请使用 [`os.uname()`](https://docs.python.org/zh-cn/3/library/os.html#os.uname "os.uname")。

platform.system()[¶](#platform.system "Link to this definition")

返回系统平台/OS的名称，例如 `'Linux'`, `'Darwin'`, `'Java'`, `'Windows'`。 如果该值无法确定则将返回一个空字符串。

在 iOS 和 Android 上，这将返回面向用户的 OS 名称 (即 `'iOS`, `'iPadOS'` 或 `'Android'`)。 要获取内核名称 (`'Darwin'` 或 `'Linux'`)，请使用 [`os.uname()`](https://docs.python.org/zh-cn/3/library/os.html#os.uname "os.uname")。

platform.system\_alias(_system_, _release_, _version_)[¶](#platform.system_alias "Link to this definition")

返回别名为某些系统所使用的常见营销名称的 `(system, release, version)`。 它还会在可能导致混淆的情况下对信息进行一些重排序操作。

platform.version()[¶](#platform.version "Link to this definition")

返回系统的发布版本信息，例如 `'#3 on degas'`。 如果该值无法确定则将返回一个空字符串。

platform.uname()[¶](#platform.uname "Link to this definition")

具有高可移植性的 uname 接口。 返回包含六个属性的 [`namedtuple()`](https://docs.python.org/zh-cn/3/library/collections.html#collections.namedtuple "collections.namedtuple"): [`system`](#platform.system "platform.system"), [`node`](#platform.node "platform.node"), [`release`](#platform.release "platform.release"), [`version`](#platform.version "platform.version"), [`machine`](#platform.machine "platform.machine") 和 [`processor`](#platform.processor "platform.processor")。

[`processor`](#platform.processor "platform.processor") 将根据需要延后获取。

注意：前两个属性名称与 [`os.uname()`](https://docs.python.org/zh-cn/3/library/os.html#os.uname "os.uname") 所提供的名称不同，后者是被命名为 `sysname` 和 `nodename`。

无法确定的条目会被设为 `''`。

在 3.9 版本发生变更: [`processor`](#platform.processor "platform.processor") 将延后而不是立即被获取。

platform.invalidate\_caches()[¶](#platform.invalidate_caches "Link to this definition")

清除信息的内部缓存，例如 [`uname()`](#platform.uname "platform.uname")。 当平台的 [`node()`](#platform.node "platform.node") 被外部进程更改并且需要检索更新的值时，这通常很有用。

Added in version 3.14.

## Java 平台[¶](#java-platform "Link to this heading")

platform.java\_ver(_release\=''_, _vendor\=''_, _vminfo\=('', '', '')_, _osinfo\=('', '', '')_)[¶](#platform.java_ver "Link to this definition")

Jython 的版本接口

返回一个元组 `(release, vendor, vminfo, osinfo)`，其中 _vminfo_ 为元组 `(vm_name, vm_release, vm_vendor)` 而 _osinfo_ 为元组 `(os_name, os_version, os_arch)`。 无法确定的值将设为由形参所给出的默认值 (默认均为 `''`)。

从 3.13 版起已弃用，将在 3.15 版中移除: 它基本上未经测试，具有令人迷惑的 API，并且仅适用于 Jython 支持。

## Windows 平台[¶](#windows-platform "Link to this heading")

platform.win32\_ver(_release\=''_, _version\=''_, _csd\=''_, _ptype\=''_)[¶](#platform.win32_ver "Link to this definition")

从 Windows 注册表获取额外的版本信息并返回一个元组 `(release, version, csd, ptype)` 表示 OS 发行版, 版本号, CSD 级别 (Service Pack) 和 OS 类型 (多个/单个处理器)。无法确定的值被设置为作为参数给出的默认值（这些参数都默认为一个空字符串）。

一点提示: _ptype_ 在单处理器的 NT 机器上为 `'Uniprocessor Free'` 而在多处理器的机器上则为 `'Multiprocessor Free'`。 `'Free'` 是指该 OS 版本不包含调试代码。 它还可能包含 `'Checked'` 表示该 OS 版本使用了调试代码，即检测参数、范围等的代码。

platform.win32\_edition()[¶](#platform.win32_edition "Link to this definition")

返回一个代表当前 Windows 版本的字符串，或者在该值无法确定时返回 `None` 。 可能的值包括但不限于 `'Enterprise'`, `'IoTUAP'`, `'ServerStandard'` 和 `'nanoserver'`。

Added in version 3.8.

platform.win32\_is\_iot()[¶](#platform.win32_is_iot "Link to this definition")

如果 [`win32_edition()`](#platform.win32_edition "platform.win32_edition") 返回的 Windows 版本被识别为 IoT 版则返回 `True`。

Added in version 3.8.

## macOS 平台[¶](#macos-platform "Link to this heading")

platform.mac\_ver(_release\=''_, _versioninfo\=('', '', '')_, _machine\=''_)[¶](#platform.mac_ver "Link to this definition")

获取 macOS 版本信息并将其返回为元组 `(release, versioninfo, machine)`，其中 _versioninfo_ 是一个元组 `(version, dev_stage, non_release_version)`。

无法确定的条目会被设为 `''`。 所有元组条目均为字符串。

## iOS 平台[¶](#ios-platform "Link to this heading")

platform.ios\_ver(_system\=''_, _release\=''_, _model\=''_, _is\_simulator\=False_)[¶](#platform.ios_ver "Link to this definition")

获取 iOS 版本信息并将其以具有下列属性的 [`namedtuple()`](https://docs.python.org/zh-cn/3/library/collections.html#collections.namedtuple "collections.namedtuple") 形式返回：

-   `system` 为 OS 名称；为 `'iOS'` 或 `'iPadOS'`。
    
-   `release` 为字符串形式的 iOS 版本号 (例如 `'17.2'`)。
    
-   `model` 为设备型号标识符；这对物理设备来说将是如 `'iPhone13,2'` 形式的字符串，或者对于模拟器来说则为 `'iPhone'`。
    
-   `is_simulator` 是一个描述 app 是运行在模拟器上还是物理设备上的布尔值。
    

无法确定的条目会被设为由形参所给出的默认值。

## Unix 平台[¶](#unix-platforms "Link to this heading")

platform.libc\_ver(_executable\=sys.executable_, _lib\=''_, _version\=''_, _chunksize\=16384_)[¶](#platform.libc_ver "Link to this definition")

尝试确定可执行文件（默认为 Python 解释器）所链接到的 libc 版本。 返回一个字符串元组 `(lib, version)`，当查找失败时其默认值将设为给定的形参值。

请注意此函数对于不同 libc 版本向可执行文件添加符号的方式有深层的关联，可能仅适用于使用 **gcc** 编译出来的可执行文件。

文件将按 _chunksize_ 个字节的分块来读取和扫描。

## Linux 平台[¶](#linux-platforms "Link to this heading")

platform.freedesktop\_os\_release()[¶](#platform.freedesktop_os_release "Link to this definition")

从 `os-release` 文件获取操作系统标识并将其作为一个字典返回。 `os-release` 文件是 [freedesktop.org 标准](https://www.freedesktop.org/software/systemd/man/os-release.html) 并在大多数 Linux 发行版上可用。 一个重要的例外是 Android 和基于 Android 的发行版。

当 `/etc/os-release` 或 `/usr/lib/os-release` 均无法读取时将引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 或其子类。

成功时，该函数将返回一个字典，其中键和值均为字符串。 值当中的特殊字符例如 `"` 和 `$` 会被复原。 字段 `NAME`, `ID` 和 `PRETTY_NAME` 总是会按照标准来定义。 所有其他字段都是可选的。 厂商可能会包括额外的字段。

请注意 `NAME`, `VERSION` 和 `VARIANT` 等字段是适用于向用户展示的字符串。 程序应当使用 `ID`, `ID_LIKE`, `VERSION_ID` 或 `VARIANT_ID` 等字段来标识 Linux 发行版。

示例:

def get\_like\_distro():
    info \= platform.freedesktop\_os\_release()
    ids \= \[info\["ID"\]\]
    if "ID\_LIKE" in info:
        \# ids 以空格分隔并按优先级排序
        ids.extend(info\["ID\_LIKE"\].split())
    return ids

Added in version 3.10.

## Android 平台[¶](#android-platform "Link to this heading")

platform.android\_ver(_release\=''_, _api\_level\=0_, _manufacturer\=''_, _model\=''_, _device\=''_, _is\_emulator\=False_)[¶](#platform.android_ver "Link to this definition")

获取 Android 设备信息。 返回一个具有下列属性的 [`namedtuple()`](https://docs.python.org/zh-cn/3/library/collections.html#collections.namedtuple "collections.namedtuple")。 无法确定的值会被设为由形参给出的默认值 。

-   `release` - 为字符串形式的 Android 版本 (例如 `"14"`)。
    
-   `api_level` - 正在运行的设备的 API 级别，为整数形式 (例如 `34` 对应 Android 14)。 要获取构建 Python 所使用的 API 级别，参见 [`sys.getandroidapilevel()`](https://docs.python.org/zh-cn/3/library/sys.html#sys.getandroidapilevel "sys.getandroidapilevel")。
    
-   `manufacturer` - [厂商名称](https://developer.android.com/reference/android/os/Build#MANUFACTURER)。
    
-   `model` - [型号名称](https://developer.android.com/reference/android/os/Build#MODEL) – 通常为商业名称或型号编号。
    
-   `device` - [设备名称](https://developer.android.com/reference/android/os/Build#DEVICE) – 通常为型号编号或代号名。
    
-   `is_emulator` - 如果设备为模拟器则为 `True`，如果为物理设备则为 `False`。
    

Google 维护了一个 [已知型号和设备名称列表](https://storage.googleapis.com/play_public/supported_devices.html)。

Added in version 3.13.

## 命令行用法[¶](#command-line-usage "Link to this heading")

`platform` 也可通过解释器的 [`-m`](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-m) 开关来直接唤起:

python \-m platform \[\--terse\] \[\--nonaliased\] \[{nonaliased,terse} ...\]

可以接受以下选项：

\--terse[¶](#cmdoption-platform-terse "Link to this definition")

打印关于平台的简洁信息。 这相当于调用 [`platform.platform()`](#platform.platform "platform.platform")，并将 _terse_ 参数设置为 `True`。

\--nonaliased[¶](#cmdoption-platform-nonaliased "Link to this definition")

打印平台信息，不使用系统/操作系统名称别名。 这相当于调用 [`platform.platform()`](#platform.platform "platform.platform")，并将 _aliased_ 参数设置为 `True`。

你还可以传递一个或多个位置参数 (`terse`、`nonaliased`) 来显式控制输出格式。 它们的行为与相应的选项相似。
