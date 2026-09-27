**源代码:** [Lib/tarfile.py](https://github.com/python/cpython/tree/3.14/Lib/tarfile.py)

* * *

`tarfile` 模块使得读写 tar 归档，包括使用 gzip, bz2 和 lzma 压缩的归档文件成为可能。 请使用 [`zipfile`](https://docs.python.org/zh-cn/3/library/zipfile.html#module-zipfile "zipfile: Read and write ZIP-format archive files.") 模块读写 `.zip` 文件，或者 [shutil](https://docs.python.org/zh-cn/3/library/shutil.html#archiving-operations) 中的高层级函数。

一些事实和数字：

-   在相应的模块可用时读写 [`gzip`](https://docs.python.org/zh-cn/3/library/gzip.html#module-gzip "gzip: Interfaces for gzip compression and decompression using file objects."), [`bz2`](https://docs.python.org/zh-cn/3/library/bz2.html#module-bz2 "bz2: Interfaces for bzip2 compression and decompression."), [`compression.zstd`](https://docs.python.org/zh-cn/3/library/compression.zstd.html#module-compression.zstd "compression.zstd: Low-level interface to compression and decompression routines in the zstd library.") 和 [`lzma`](https://docs.python.org/zh-cn/3/library/lzma.html#module-lzma "lzma: A Python wrapper for the liblzma compression library.") 压缩的归档。
    
    如果这些 [可选模块](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module) 中的任何一个在你的 CPython 副本中缺失，请查看你的发行方（也就是说，向你提供 Python 的人）。如果你就是发行方，请参阅 [针对可选模块的要求](https://docs.python.org/zh-cn/3/using/configure.html#optional-module-requirements).
    
-   支持读取 / 写入 POSIX.1-1988 (ustar) 格式。
    
-   对 GNU tar 格式的读/写支持，包括 _longname_ 和 _longlink_ 扩展，对所有种类 _sparse_ 扩展的只读支持，包括 sparse 文件的恢复。
    
-   对 POSIX.1-2001 (pax) 格式的读/写支持。
    
-   处理目录、正常文件、硬链接、符号链接、fifo 管道、字符设备和块设备，并且能够获取和恢复文件信息例如时间戳、访问权限和所有者等。
    

在 3.3 版本发生变更: 添加了对 [`lzma`](https://docs.python.org/zh-cn/3/library/lzma.html#module-lzma "lzma: A Python wrapper for the liblzma compression library.") 压缩的支持。

在 3.12 版本发生变更: 归档文件使用 [过滤器](#tarfile-extraction-filter) 来提取，这将可以限制令人惊讶/危险的特性，或确认它们符合预期并且归档文档受到完全信任。

在 3.14 版本发生变更: 将默认的提取过滤器设置为 [`data`](#tarfile.data_filter "tarfile.data_filter")，这将禁止一些危险的特性，比如链接到绝对路径或目的地之外的路径。以前，过滤器策略相当于 [`fully_trusted`](#tarfile.fully_trusted_filter "tarfile.fully_trusted_filter").

tarfile.open(_name\=None_, _mode\='r'_, _fileobj\=None_, _bufsize\=10240_, _\*\*kwargs_)[¶](#tarfile.open "Link to this definition")

针对路径名 _name_ 返回 [`TarFile`](#tarfile.TarFile "tarfile.TarFile") 对象。有关 `TarFile` 对象以及所允许的关键字参数的详细信息请参阅 [TarFile 对象](#tarfile-objects)。

_mode_ 必须是 `'filemode[:compression]'` 形式的字符串，其默认值为 `'r'`。以下是模式组合的完整列表：

| 
模式

 | 

动作

 |
| --- | --- |
| 

`'r'` 或 `'r:*'`

 | 

打开和读取使用透明压缩（推荐）。

 |
| 

`'r:'`

 | 

打开和读取不使用压缩。

 |
| 

`'r:gz'`

 | 

打开和读取使用 gzip 压缩。

 |
| 

`'r:bz2'`

 | 

打开和读取使用 bzip2 压缩。

 |
| 

`'r:xz'`

 | 

打开和读取使用 lzma 压缩。

 |
| 

`'r:zst'`

 | 

打开以使用 Zstandard 压缩格式进行读取。

 |
| 

`'x'` 或 `'x:'`

 | 

单独创建一个 tarfile 而不带压缩。如果它已经存在则会引发 [`FileExistsError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#FileExistsError "FileExistsError") 异常。

 |
| 

`'x:gz'`

 | 

使用 gzip 压缩创建一个 tarfile。如果它已经存在则会引发 [`FileExistsError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#FileExistsError "FileExistsError") 异常。

 |
| 

`'x:bz2'`

 | 

使用 bzip2 压缩创建一个 tarfile。如果它已经存在则会引发 [`FileExistsError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#FileExistsError "FileExistsError") 异常。

 |
| 

`'x:xz'`

 | 

使用 lzma 压缩创建一个 tarfile。如果它已经存在则会引发 [`FileExistsError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#FileExistsError "FileExistsError") 异常。

 |
| 

`'x:zst'`

 | 

创建一个使用 Zstandard 压缩的 tar 文件。如果它已经存在则会引发 [`FileExistsError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#FileExistsError "FileExistsError") 异常。

 |
| 

`'a'` 或 `'a:'`

 | 

打开以便在没有压缩的情况下追加。如果文件不存在，则创建该文件。

 |
| 

`'w'` 或 `'w:'`

 | 

打开用于未压缩的写入。

 |
| 

`'w:gz'`

 | 

打开用于 gzip 压缩的写入。

 |
| 

`'w:bz2'`

 | 

打开用于 bzip2 压缩的写入。

 |
| 

`'w:xz'`

 | 

打开用于 lzma 压缩的写入。

 |
| 

`'w:zst'`

 | 

打开以使用 Zstandard 压缩格式进行写入。

 |

请注意 `'a:gz'`, `'a:bz2'` 或 `'a:xz'` 是不可能的组合。如果 _mode_ 不适用于打开特定（压缩的）文件用于读取，则会引发 [`ReadError`](#tarfile.ReadError "tarfile.ReadError")。请使用 _mode_ `'r'` 来避免这种情况。 如果某种压缩方法不受支持，则会引发 [`CompressionError`](#tarfile.CompressionError "tarfile.CompressionError")。

如果指定了 _fileobj_，它会被用作对应于 _name_ 的以二进制模式打开的 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) 的替代。 它会被设定为处在位置 0。

对于 `'w:gz'`, `'x:gz'`, `'w|gz'`, `'w:bz2'`, `'x:bz2'`, `'w|bz2'` 等模式，[`tarfile.open()`](#tarfile.open "tarfile.open") 接受关键字参数 _compresslevel_ (默认值为 `9`) 用于指定文件的压缩等级。

对于 `'w:xz'`, `'x:xz'` 和 `'w|xz'` 等模式，[`tarfile.open()`](#tarfile.open "tarfile.open") 接受关键字参数 _preset_ 来指定文件的压缩等级。

对于 `'w:zst'`, `'x:zst'` 和 `'w|zst'` 模式，[`tarfile.open()`](#tarfile.open "tarfile.open") 接受关键字参数 _level_ 以指定文件的压缩级别。还可以传入关键字参数 _options_，它提供由 [`CompressionParameter`](https://docs.python.org/zh-cn/3/library/compression.zstd.html#compression.zstd.CompressionParameter "compression.zstd.CompressionParameter") 描述的高级 Zstandard 压缩形参。 还可以传入关键字参数 _zstd\_dict_ 以提供 [`ZstdDict`](https://docs.python.org/zh-cn/3/library/compression.zstd.html#compression.zstd.ZstdDict "compression.zstd.ZstdDict")，这是用于提升较小量数据压缩效率的 Zstandard 字典。

针对特殊的目的，还存在第二种 _mode_ 格式: `'filemode|[compression]'`。 [`tarfile.open()`](#tarfile.open "tarfile.open") 将返回一个将其数据作为数据块流来处理的 [`TarFile`](#tarfile.TarFile "tarfile.TarFile") 对象。对此文件将不能执行随机查找。如果给定了 _fileobj_，它可以是任何具有 [`read()`](https://docs.python.org/zh-cn/3/library/io.html#io.RawIOBase.read "io.RawIOBase.read") 或 [`write()`](https://docs.python.org/zh-cn/3/library/io.html#io.RawIOBase.write "io.RawIOBase.write") 方法（由 _mode_ 确定）的对象。 _bufsize_ 指定块大小，默认为 `20 * 512` 字节。可与此格式组合使用的有 `sys.stdin.buffer`、套接字 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) 或磁带设备等。但是，这样的 `TarFile` 对象存在不允许随机访问的限制，参见 [例子](#tar-examples)。当前可用的模式有：

| 
模式

 | 

动作

 |
| --- | --- |
| 

`'r|*'`

 | 

打开 tar 块的 _流_ 以进行透明压缩读取。

 |
| 

`'r|'`

 | 

打开一个未压缩的 tar 块的 _stream_ 用于读取。

 |
| 

`'r|gz'`

 | 

打开一个 gzip 压缩的 _stream_ 用于读取。

 |
| 

`'r|bz2'`

 | 

打开一个 bzip2 压缩的 _stream_ 用于读取。

 |
| 

`'r|xz'`

 | 

打开一个 lzma 压缩 _stream_ 用于读取。

 |
| 

`'r|zst'`

 | 

打开一个 Zstandard 压缩的 _stream_ 用于读取。

 |
| 

`'w|'`

 | 

打开一个未压缩的 _stream_ 用于写入。

 |
| 

`'w|gz'`

 | 

打开一个 gzip 压缩的 _stream_ 用于写入。

 |
| 

`'w|bz2'`

 | 

打开一个 bzip2 压缩的 _stream_ 用于写入。

 |
| 

`'w|xz'`

 | 

打开一个 lzma 压缩的 _stream_ 用于写入。

 |
| 

`'w|zst'`

 | 

打开一个 Zstandard 压缩的 _stream_ 用于写入。

 |

在 3.5 版本发生变更: 添加了 `'x'` (单独创建) 模式。

在 3.12 版本发生变更: _compresslevel_ 关键字参数也适用于流式数据。

在 3.14 版本发生变更: _preset_ 关键字参数也适用于流式数据。

_class_ tarfile.TarFile

用于读取和写入 tar 归档的类。请不要直接使用这个类：而要使用 [`tarfile.open()`](#tarfile.open "tarfile.open")。参见 [TarFile 对象](#tarfile-objects).

tarfile.is\_tarfile(_name_)[¶](#tarfile.is_tarfile "Link to this definition")

Return [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True") if _name_ is a tar archive file, that the `tarfile` module can read. _name_ may be a [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str"), file, or file-like object.

在 3.9 版本发生变更: 支持文件或类文件对象。

`tarfile` 模块定义了下列异常：

_exception_ tarfile.TarError[¶](#tarfile.TarError "Link to this definition")

所有 `tarfile` 异常的基类。

_exception_ tarfile.ReadError[¶](#tarfile.ReadError "Link to this definition")

Is raised when a tar archive is opened, that either cannot be handled by the `tarfile` module or is somehow invalid.

_exception_ tarfile.CompressionError[¶](#tarfile.CompressionError "Link to this definition")

当一个压缩方法不受支持或者当数据无法被正确解码时将被引发。

_exception_ tarfile.StreamError[¶](#tarfile.StreamError "Link to this definition")

当达到流式 [`TarFile`](#tarfile.TarFile "tarfile.TarFile") 对象的典型限制时将被引发。

当使用 [`TarFile.extract()`](#tarfile.TarFile.extract "tarfile.TarFile.extract") 时针对 _non-fatal_ 所引发的异常，但是仅限 [`TarFile.errorlevel`](#tarfile.TarFile.errorlevel "tarfile.TarFile.errorlevel")`== 2`.

如果获取的缓冲区无效则会由 [`TarInfo.frombuf()`](#tarfile.TarInfo.frombuf "tarfile.TarInfo.frombuf") 引发的异常。

_exception_ tarfile.FilterError[¶](#tarfile.FilterError "Link to this definition")

被过滤器 [拒绝](#tarfile-extraction-refuse) 的成员的基类。

tarinfo[¶](#tarfile.FilterError.tarinfo "Link to this definition")

关于过滤器拒绝提取的成员的信息，为 [TarInfo](#tarinfo-objects) 类型。

_exception_ tarfile.AbsolutePathError[¶](#tarfile.AbsolutePathError "Link to this definition")

在拒绝提取具有绝对路径的成员时引发。

_exception_ tarfile.OutsideDestinationError[¶](#tarfile.OutsideDestinationError "Link to this definition")

在拒绝提取目标目录以外的成员时引发。

_exception_ tarfile.SpecialFileError[¶](#tarfile.SpecialFileError "Link to this definition")

在拒绝提取特殊文件（例如设备或管道）时引发。

_exception_ tarfile.AbsoluteLinkError[¶](#tarfile.AbsoluteLinkError "Link to this definition")

在拒绝提取具有绝对路径的符号链接时引发。

_exception_ tarfile.LinkOutsideDestinationError[¶](#tarfile.LinkOutsideDestinationError "Link to this definition")

在拒绝提取指向目标目录以外的符号链接时引发。

_exception_ tarfile.LinkFallbackError[¶](#tarfile.LinkFallbackError "Link to this definition")

在要拒绝通过提取其他归档成员来模拟一个链接（硬链接或符号链接），而该成员会被过滤位置丢弃时被引发。被引发以丢弃替换成员的异常可作为 `BaseException.__context__` 被访问。

Added in version 3.14.

以下常量在模块层级上可用：

tarfile.ENCODING[¶](#tarfile.ENCODING "Link to this definition")

默认的字符编码格式：在 Windows 上为 `'utf-8'`，其他系统上则为 [`sys.getfilesystemencoding()`](https://docs.python.org/zh-cn/3/library/sys.html#sys.getfilesystemencoding "sys.getfilesystemencoding") 所返回的值。

tarfile.REGTYPE[¶](#tarfile.REGTYPE "Link to this definition")

tarfile.AREGTYPE[¶](#tarfile.AREGTYPE "Link to this definition")

常规文件 [`type`](#tarfile.TarInfo.type "tarfile.TarInfo.type")。

tarfile.LNKTYPE[¶](#tarfile.LNKTYPE "Link to this definition")

（tar 文件中的）链接 [`type`](#tarfile.TarInfo.type "tarfile.TarInfo.type")。

tarfile.SYMTYPE[¶](#tarfile.SYMTYPE "Link to this definition")

符号链接 [`type`](#tarfile.TarInfo.type "tarfile.TarInfo.type")。

tarfile.CHRTYPE[¶](#tarfile.CHRTYPE "Link to this definition")

字符特殊设备 [`type`](#tarfile.TarInfo.type "tarfile.TarInfo.type")。

tarfile.BLKTYPE[¶](#tarfile.BLKTYPE "Link to this definition")

块特殊设备 [`type`](#tarfile.TarInfo.type "tarfile.TarInfo.type")。

tarfile.DIRTYPE[¶](#tarfile.DIRTYPE "Link to this definition")

目录 [`type`](#tarfile.TarInfo.type "tarfile.TarInfo.type")。

tarfile.FIFOTYPE[¶](#tarfile.FIFOTYPE "Link to this definition")

FIFO 特殊设备 [`type`](#tarfile.TarInfo.type "tarfile.TarInfo.type")。

tarfile.CONTTYPE[¶](#tarfile.CONTTYPE "Link to this definition")

连续文件 [`type`](#tarfile.TarInfo.type "tarfile.TarInfo.type")。

tarfile.GNUTYPE\_LONGNAME[¶](#tarfile.GNUTYPE_LONGNAME "Link to this definition")

GNU tar 长名称 [`type`](#tarfile.TarInfo.type "tarfile.TarInfo.type")。

tarfile.GNUTYPE\_LONGLINK[¶](#tarfile.GNUTYPE_LONGLINK "Link to this definition")

GNU tar 长链接 [`type`](#tarfile.TarInfo.type "tarfile.TarInfo.type")。

tarfile.GNUTYPE\_SPARSE[¶](#tarfile.GNUTYPE_SPARSE "Link to this definition")

GNU tar 离散文件 [`type`](#tarfile.TarInfo.type "tarfile.TarInfo.type")。

Each of the following constants defines a tar archive format that the `tarfile` module is able to create. See section [受支持的 tar 格式](#tar-formats) for details.

tarfile.USTAR\_FORMAT[¶](#tarfile.USTAR_FORMAT "Link to this definition")

POSIX.1-1988 (ustar) 格式。

tarfile.GNU\_FORMAT[¶](#tarfile.GNU_FORMAT "Link to this definition")

GNU tar 格式。

tarfile.PAX\_FORMAT[¶](#tarfile.PAX_FORMAT "Link to this definition")

POSIX.1-2001 (pax) 格式。

tarfile.DEFAULT\_FORMAT[¶](#tarfile.DEFAULT_FORMAT "Link to this definition")

用于创建归档的默认格式。目前为 [`PAX_FORMAT`](#tarfile.PAX_FORMAT "tarfile.PAX_FORMAT")。

在 3.8 版本发生变更: 新归档的默认格式已更改为 [`PAX_FORMAT`](#tarfile.PAX_FORMAT "tarfile.PAX_FORMAT") 而不再是 [`GNU_FORMAT`](#tarfile.GNU_FORMAT "tarfile.GNU_FORMAT")。

## TarFile 对象[¶](#tarfile-objects "Link to this heading")

[`TarFile`](#tarfile.TarFile "tarfile.TarFile") 对象提供了一个 tar 归档的接口。一个 tar 归档就是数据块的序列。 一个归档成员（被保存文件）是由一个标头块加多个数据块组成的。一个文件可以在一个 tar 归档中多次被保存。每个归档成员都由一个 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象来代表，详情参见 [TarInfo 对象](#tarinfo-objects)。

[`TarFile`](#tarfile.TarFile "tarfile.TarFile") 对象可在 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句中作为上下文管理器使用。当语句块结束时它将自动被关闭。 请注意在发生异常事件时被打开用于写入的归档将不会被终结；只有内部使用的文件对象将被关闭。相关用例请参见 [例子](#tar-examples)。

Added in version 3.2: 添加了对上下文管理器协议的支持。

_class_ tarfile.TarFile(_name\=None_, _mode\='r'_, _fileobj\=None_, _format\=DEFAULT\_FORMAT_, _tarinfo\=TarInfo_, _dereference\=False_, _ignore\_zeros\=False_, _encoding\=ENCODING_, _errors\='surrogateescape'_, _pax\_headers\=None_, _debug\=0_, _errorlevel\=1_, _stream\=False_)[¶](#tarfile.TarFile "Link to this definition")

下列所有参数都是可选项并且也可作为实例属性来访问。

_name_ 是归档的路径名。 _name_ 可以是一个 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object)。如果给定了 _fileobj_ 则它可以被省略。在此情况下，如果对象存在 `name` 属性则将使用它。

_mode_ 可以为 `'r'` 表示从现有归档读取，`'a'` 表示将数据追加到现有文件，`'w'` 表示创建新文件覆盖现有文件，或者 `'x'` 表示仅在文件不存在时创建新文件。

如果给定了 _fileobj_，它会被用于读取或写入数据。如果可以被确定，则 _mode_ 会被 _fileobj_ 的模式所覆盖。 _fileobj_ 的使用将从位置 0 开始。

备注

当 [`TarFile`](#tarfile.TarFile "tarfile.TarFile") 被关闭时，_fileobj_ 不会被关闭。

_format_ 控制用于写入的归档格式。它必须为在模块层级定义的常量 [`USTAR_FORMAT`](#tarfile.USTAR_FORMAT "tarfile.USTAR_FORMAT"), [`GNU_FORMAT`](#tarfile.GNU_FORMAT "tarfile.GNU_FORMAT") 或 [`PAX_FORMAT`](#tarfile.PAX_FORMAT "tarfile.PAX_FORMAT") 中的一个。 当读取时，格式将被自动检测，即使单个归档中存在不同的格式。

_tarinfo_ 参数可以被用来将默认的 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 类替换为另一个。

如果 _dereference_ 为 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False")，则会将符号链接和硬链接添加到归档中。如果为 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")，则会将目标文件的内容添加到归档中。在不支持符号链接的系统上参数将不起作用。

如果 _ignore\_zeros_ 为 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False")，则会将空的数据块当作归档的末尾来处理。如果为 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")，则会跳过空的（和无效的）数据块并尝试获取尽可能多的成员。此参数仅适用于读取拼接的或损坏的归档。

_debug_ 可设为从 `0` (无调试消息) 到 `3` (全部调试消息)。消息会被写入到 `sys.stderr`。

_errorlevel_ 控制如何处理解压错误，参见 [`相应的属性`](#tarfile.TarFile.errorlevel "tarfile.TarFile.errorlevel")。

_encoding_ 和 _errors_ 参数定义了读取或写入归档所使用的字符编码格式以及要如何处理转换错误。默认设置将适用于大多数用户。 要深入了解详情可参阅 [Unicode 问题](#tar-unicode) 小节。

可选的 _pax\_headers_ 参数是字符串的字典，如果 _format_ 为 [`PAX_FORMAT`](#tarfile.PAX_FORMAT "tarfile.PAX_FORMAT") 它将被作为 pax 全局标头被添加。

如果 _stream_ 被设为 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True") 则在读取时有关归档中文件的归档信息不会被缓存，以节省内存消耗。

在 3.2 版本发生变更: 使用 `'surrogateescape'` 作为 _errors_ 参数的默认值。

在 3.5 版本发生变更: 添加了 `'x'` (单独创建) 模式。

在 3.13 版本发生变更: 增加了 _stream_ 形参。

_classmethod_ TarFile.open(_..._)[¶](#tarfile.TarFile.open "Link to this definition")

作为替代的构造器。 [`tarfile.open()`](#tarfile.open "tarfile.open") 函数实际上是这个类方法的快捷方式。

TarFile.getmember(_name_)[¶](#tarfile.TarFile.getmember "Link to this definition")

返回成员 _name_ 的 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象。如果 _name_ 在归档中找不到，则会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError")。

备注

如果一个成员在归档中出现超过一次，它的最后一次出现会被视为是最新的版本。

TarFile.getmembers()[¶](#tarfile.TarFile.getmembers "Link to this definition")

以 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象列表的形式返回归档的成员。列表的顺序与归档中成员的顺序一致。

TarFile.getnames()[¶](#tarfile.TarFile.getnames "Link to this definition")

以名称列表的形式返回成员。它的顺序与 [`getmembers()`](#tarfile.TarFile.getmembers "tarfile.TarFile.getmembers") 所返回列表的顺序一致。

TarFile.list(_verbose\=True_, _\*_, _members\=None_)[¶](#tarfile.TarFile.list "Link to this definition")

将内容清单打印到 `sys.stdout`。如果 _verbose_ 为 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False")，则将只打印成员名称。如果为 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")，则输出将类似于 **ls -l** 的输出效果。如果给定了可选的 _members_，它必须为 [`getmembers()`](#tarfile.TarFile.getmembers "tarfile.TarFile.getmembers") 所返回的列表的一个子集。

在 3.5 版本发生变更: 添加了 _members_ 形参。

TarFile.next()[¶](#tarfile.TarFile.next "Link to this definition")

当 [`TarFile`](#tarfile.TarFile "tarfile.TarFile") 被打开用于读取时，以 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象的形式返回归档的下一个成员。如果不再有可用对象则返回 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None").

将归档中的所有成员提取到当前工作目录或 _path_ 目录。如果给定了可选的 _members_，则它必须为 [`getmembers()`](#tarfile.TarFile.getmembers "tarfile.TarFile.getmembers") 所返回的列表的一个子集。目录信息例如所有者、修改时间和权限会在所有成员提取完毕后被设置。 这样做是为了避免两个问题：目录的修改时间会在每当在其中创建文件时被重置。并且如果目录的权限不允许写入，提取文件到目录的操作将失败。

如果 _numeric\_owner_ 为 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")，则将使用来自 tarfile 的 uid 和 gid 数值来设置被提取文件的所有者/用户组。在其他情况下，则会使用来自 tarfile 的名称值。

_filter_ 参数指定在提取成员之前如何修改或拒绝 `members`。详细信息请参见 [解压缩过滤器](#tarfile-extraction-filter)。建议仅在需要特定的 _tar_ 特性时才显式设置此值，或者设置 `filter='data'` 以支持默认安全性较低的 Python 版本（3.13 及以下）。

警告

绝不要在没有预先检查的情况下从不受信任的来源提取归档文件。

从 Python 3.14 起，默认的 ([`data`](#tarfile.data_filter "tarfile.data_filter")) 将能防止最危险的安全问题。不过，它不能防止 _所有_ 非故意或不安全的行为。请参阅 [解压缩过滤器](#tarfile-extraction-filter) 一节了解详情。

在 3.5 版本发生变更: 添加了 _numeric\_owner_ 形参。

在 3.12 版本发生变更: 添加了 _filter_ 形参。

在 3.14 版本发生变更: 现在 _filter_ 形参的默认值为 `'data'`。

从归档中提取出一个成员放入当前工作目录，将使用其完整名称。成员的文件信息会尽可能精确地被提取。 _member_ 可以是一个文件名或 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象。你可以使用 _path_ 指定一个不同的目录。 _path_ 可以是一个 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object)。将会设置文件属性 (owner, mtime, mode) 除非 _set\_attrs_ 为假值。

_numeric\_owner_ 和 _filter_ 参数与 [`extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 中的相同。

备注

[`extract()`](#tarfile.TarFile.extract "tarfile.TarFile.extract") 方法不会处理某些提取问题。在大多数情况下你应当考虑使用 [`extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 方法。

警告

绝不要在没有预先检查的情况下从不受信任的来源提取归档文件。请参阅 [`extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 的警告信息了解详情。

在 3.2 版本发生变更: 添加了 _set\_attrs_ 形参。

在 3.5 版本发生变更: 添加了 _numeric\_owner_ 形参。

在 3.12 版本发生变更: 添加了 _filter_ 形参。

将归档中的一个成员提取为文件对象。 _member_ 可以是一个文件名或 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象。如果 _member_ 是一个常规文件或链接，则会返回一个 [`io.BufferedReader`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedReader "io.BufferedReader") 对象。对于所有其他现有成员，则都将返回 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")。如果 _member_ 未在归档中出现，则会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError")。

TarFile.errorlevel_: [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")_[¶](#tarfile.TarFile.errorlevel "Link to this definition")

如果 _errorlevel_ 为 `0`，则在使用 [`TarFile.extract()`](#tarfile.TarFile.extract "tarfile.TarFile.extract") 和 [`TarFile.extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 时错误会被忽略。不过，当 _debug_ 大于 0 时它们将会作为错误消息在调试输出中出现。 如果 _errorlevel\*为 \`\`1\`\` (默认值)，则所有 \*fatal_ 错误都会作为 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 或 [`FilterError`](#tarfile.FilterError "tarfile.FilterError") 异常被引发。如果为 `2`，则所有 _non-fatal_ 错误也会作为 [`TarError`](#tarfile.TarError "tarfile.TarError") 异常被引发。

某些异常，如参数类型错误或数据损坏导致的异常，总是会被触发。

自定义 [提取过滤器](#tarfile-extraction-filter) 应针对 _fatal_ 错误引发 [`FilterError`](#tarfile.FilterError "tarfile.FilterError")，针对 _non-fatal_ 错误引发 [`ExtractError`](#tarfile.ExtractError "tarfile.ExtractError")。

请注意，当出现异常时，存档可能会被部分提取。需要用户负责进行清理。

Added in version 3.12.

被用作 [`extract()`](#tarfile.TarFile.extract "tarfile.TarFile.extract") 和 [`extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 的 _filter_ 参数的默认值的 [提取过滤器](#tarfile-extraction-filter)。

该属性可以为 `None` 或是一个可调用对象。与 [`extract()`](#tarfile.TarFile.extract "tarfile.TarFile.extract") 的 _filter_ 参数不同，该属性不允许使用字符串名称。

如果 `extraction_filter` 为 `None` (默认值)，则提取方法默认将使用 [`data`](#tarfile.data_filter "tarfile.data_filter") 过滤器。

The attribute may be set on instances or overridden in subclasses. It also is possible to set it on the `TarFile` class itself to set a global default, although, since it affects all uses of _tarfile_, it is best practice to only do so in top-level applications or [`site configuration`](https://docs.python.org/zh-cn/3/library/site.html#module-site "site: Module responsible for site-specific configuration."). To set a global default this way, a filter function needs to be wrapped in [`@staticmethod`](https://docs.python.org/zh-cn/3/builtins/functions.html#staticmethod "staticmethod") to prevent injection of a `self` argument.

在 3.14 版本发生变更: 默认的提取过滤器是设置为 [`data`](#tarfile.data_filter "tarfile.data_filter")，这将禁止一些危险的特性，比如链接到绝对路径或目的地之外的路径。以前，默认的过滤器相当于 [`fully_trusted`](#tarfile.fully_trusted_filter "tarfile.fully_trusted_filter").

TarFile.add(_name_, _arcname\=None_, _recursive\=True_, _\*_, _filter\=None_)[¶](#tarfile.TarFile.add "Link to this definition")

将文件 _name_ 添加到归档。 _name_ 可以为任意类型的文件（目录、fifo、符号链接等等）。如果给出 _arcname_ 则它将为归档中的文件指定一个替代名称。默认情况下会递归地添加目录。这可以通过将 _recursive_ 设为 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False") 来避免。 递归操作会按排序顺序添加条目。如果给定了 _filter_，它应当为一个接受 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象并返回已修改 `TarInfo` 对象的函数。如果它返回 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None") 则 `TarInfo` 对象将从归档中被排除。 具体示例参见 [例子](#tar-examples)。

在 3.2 版本发生变更: 添加了 _filter_ 形参。

在 3.7 版本发生变更: 递归操作按排序顺序添加条目。

TarFile.addfile(_tarinfo_, _fileobj\=None_)[¶](#tarfile.TarFile.addfile "Link to this definition")

将 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象 _tarinfo_ 添加到归档中。如果 _tarinfo_ 代表一个大小不为零的常规文件，则 _fileobj_ 参数应为一个 [binary file](https://docs.python.org/zh-cn/3/glossary.html#term-binary-file)，且会从中读取 `tarinfo.size` 个字节并添加到归档中。 你可以直接创建 `TarInfo` 对象，或者也可以使用 [`gettarinfo()`](#tarfile.TarFile.gettarinfo "tarfile.TarFile.gettarinfo")。

在 3.13 版本发生变更: 对于大小不为零的常规文件必须给出 _fileobj_。

TarFile.gettarinfo(_name\=None_, _arcname\=None_, _fileobj\=None_)[¶](#tarfile.TarFile.gettarinfo "Link to this definition")

基于 [`os.stat()`](https://docs.python.org/zh-cn/3/library/os.html#os.stat "os.stat") 的结果或者现有文件的相同数据创建一个 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo")。文件或者是命名为 _name_，或者是使用文件描述符指定为一个 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) _fileobj_。 _name_ 可以是一个 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object)。如果给定了 _arcname_，则它将为归档中的文件指定一个替代名称，在其他情况下，名称将从 _fileobj_ 的 [`name`](https://docs.python.org/zh-cn/3/library/io.html#io.FileIO.name "io.FileIO.name") 属性或 _name_ 参数获取。名称应当是一个文本字符串。

你可以在使用 [`addfile()`](#tarfile.TarFile.addfile "tarfile.TarFile.addfile") 添加 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 的某些属性之前修改它们。 如果文件对象不是从文件开头进行定位的普通文件对象，[`size`](#tarfile.TarInfo.size "tarfile.TarInfo.size") 之类的属性就可能需要修改。例如 [`GzipFile`](https://docs.python.org/zh-cn/3/library/gzip.html#gzip.GzipFile "gzip.GzipFile") 之类的文件就属于这种情况。 [`name`](#tarfile.TarInfo.name "tarfile.TarInfo.name") 也可以被修改，在这种情况下 _arcname_ 可以是一个占位字符串。

TarFile.close()[¶](#tarfile.TarFile.close "Link to this definition")

关闭 [`TarFile`](#tarfile.TarFile "tarfile.TarFile")。在写入模式下，会向归档添加两个表示结束的零数据块。

一个包含 pax 全局标头的键值对的字典。

## TarInfo 对象[¶](#tarinfo-objects "Link to this heading")

[`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象代表 [`TarFile`](#tarfile.TarFile "tarfile.TarFile") 中的一个文件。 除了会存储所有必要的文件属性（例如文件类型、大小、时间、权限、所有者等），它还提供了一些确定文件类型的有用方法。此对象 _并不_ 包含文件数据本身。

[`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象可通过 [`TarFile`](#tarfile.TarFile "tarfile.TarFile") 的方法 [`getmember()`](#tarfile.TarFile.getmember "tarfile.TarFile.getmember"), [`getmembers()`](#tarfile.TarFile.getmembers "tarfile.TarFile.getmembers") 和 [`gettarinfo()`](#tarfile.TarFile.gettarinfo "tarfile.TarFile.gettarinfo") 返回。

修改 [`getmember()`](#tarfile.TarFile.getmember "tarfile.TarFile.getmember") 或 [`getmembers()`](#tarfile.TarFile.getmembers "tarfile.TarFile.getmembers") 返回的对象会影响归档上的所有后续操作。对于不想要这样的场景，你可以使用 [`copy.copy()`](https://docs.python.org/zh-cn/3/library/copy.html#module-copy "copy: Shallow and deep copy operations.") 或调用 [`replace()`](#tarfile.TarInfo.replace "tarfile.TarInfo.replace") 方法一次性创建修改后的副本。

部分属性可以设为 `None` 以表示一些元数据未被使用或未知。不同的 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 方法会以不同的方式处理 `None`:

-   [`extract()`](#tarfile.TarFile.extract "tarfile.TarFile.extract") 或 [`extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 方法会忽略相应的元数据，让其保持默认设置。
    
-   [`addfile()`](#tarfile.TarFile.addfile "tarfile.TarFile.addfile") 将会失败。
    
-   [`list()`](#tarfile.TarFile.list "tarfile.TarFile.list") 将打印一个占位字符串。
    

_class_ tarfile.TarInfo(_name\=''_)[¶](#tarfile.TarInfo "Link to this definition")

创建一个 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象。

_classmethod_ TarInfo.frombuf(_buf_, _encoding_, _errors_)[¶](#tarfile.TarInfo.frombuf "Link to this definition")

基于字符串缓冲区 _buf_ 创建并返回一个 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象。

如果缓冲区无效则会引发 [`HeaderError`](#tarfile.HeaderError "tarfile.HeaderError")。

_classmethod_ TarInfo.fromtarfile(_tarfile_)[¶](#tarfile.TarInfo.fromtarfile "Link to this definition")

从 [`TarFile`](#tarfile.TarFile "tarfile.TarFile") 对象 _tarfile_ 读取下一个成员并将其作为 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象返回。

TarInfo.tobuf(_format\=DEFAULT\_FORMAT_, _encoding\=ENCODING_, _errors\='surrogateescape'_)[¶](#tarfile.TarInfo.tobuf "Link to this definition")

基于 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象创建一个字符串缓冲区。有关参数的信息请参见 [`TarFile`](#tarfile.TarFile "tarfile.TarFile") 类的构造器。

在 3.2 版本发生变更: 使用 `'surrogateescape'` 作为 _errors_ 参数的默认值。

`TarInfo` 对象具有以下公有数据属性：

TarInfo.name_: [str](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")_[¶](#tarfile.TarInfo.name "Link to this definition")

归档成员的名称。

TarInfo.size_: [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")_[¶](#tarfile.TarInfo.size "Link to this definition")

以字节表示的大小。

TarInfo.mtime_: [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") | [float](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")_[¶](#tarfile.TarInfo.mtime "Link to this definition")

以 [Unix 纪元](https://docs.python.org/zh-cn/3/library/time.html#epoch) 秒数表示的最近修改时间，与 [`os.stat_result.st_mtime`](https://docs.python.org/zh-cn/3/library/os.html#os.stat_result.st_mtime "os.stat_result.st_mtime") 相同。

在 3.12 版本发生变更: 对于 [`extract()`](#tarfile.TarFile.extract "tarfile.TarFile.extract") 和 [`extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 可设为 `None`，以使解压缩操作跳过应用此属性。

TarInfo.mode_: [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")_[¶](#tarfile.TarInfo.mode "Link to this definition")

权限比特位，与 [`os.chmod()`](https://docs.python.org/zh-cn/3/library/os.html#os.chmod "os.chmod") 相同。

在 3.12 版本发生变更: 对于 [`extract()`](#tarfile.TarFile.extract "tarfile.TarFile.extract") 和 [`extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 可设为 `None`，以使解压缩操作跳过应用此属性。

TarInfo.type[¶](#tarfile.TarInfo.type "Link to this definition")

文件类型。 _type_ 通常为以下常量之一：[`REGTYPE`](#tarfile.REGTYPE "tarfile.REGTYPE"), [`AREGTYPE`](#tarfile.AREGTYPE "tarfile.AREGTYPE"), [`LNKTYPE`](#tarfile.LNKTYPE "tarfile.LNKTYPE"), [`SYMTYPE`](#tarfile.SYMTYPE "tarfile.SYMTYPE"), [`DIRTYPE`](#tarfile.DIRTYPE "tarfile.DIRTYPE"), [`FIFOTYPE`](#tarfile.FIFOTYPE "tarfile.FIFOTYPE"), [`CONTTYPE`](#tarfile.CONTTYPE "tarfile.CONTTYPE"), [`CHRTYPE`](#tarfile.CHRTYPE "tarfile.CHRTYPE"), [`BLKTYPE`](#tarfile.BLKTYPE "tarfile.BLKTYPE"), [`GNUTYPE_SPARSE`](#tarfile.GNUTYPE_SPARSE "tarfile.GNUTYPE_SPARSE")。要更方便地确定一个 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象的类型，请使用下述的 `is*()` 方法。

TarInfo.linkname_: [str](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")_[¶](#tarfile.TarInfo.linkname "Link to this definition")

目标文件名的名称，该属性仅在类型为 [`LNKTYPE`](#tarfile.LNKTYPE "tarfile.LNKTYPE") 和 [`SYMTYPE`](#tarfile.SYMTYPE "tarfile.SYMTYPE") 的 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象中存在。

对于符号链接 (`SYMTYPE`)，_linkname_ 是相对于包含链接的目录的。对于硬链接 (`LNKTYPE`)，_linkname_ 则是相对于存档根目录的。

TarInfo.uid_: [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")_[¶](#tarfile.TarInfo.uid "Link to this definition")

最初保存该成员的用户的用户 ID。

在 3.12 版本发生变更: 对于 [`extract()`](#tarfile.TarFile.extract "tarfile.TarFile.extract") 和 [`extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 可设为 `None`，以使解压缩操作跳过应用此属性。

TarInfo.gid_: [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")_[¶](#tarfile.TarInfo.gid "Link to this definition")

最初保存该成员的用户的分组 ID。

在 3.12 版本发生变更: 对于 [`extract()`](#tarfile.TarFile.extract "tarfile.TarFile.extract") 和 [`extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 可设为 `None`，以使解压缩操作跳过应用此属性。

TarInfo.uname_: [str](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")_[¶](#tarfile.TarInfo.uname "Link to this definition")

用户名。

在 3.12 版本发生变更: 对于 [`extract()`](#tarfile.TarFile.extract "tarfile.TarFile.extract") 和 [`extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 可设为 `None`，以使解压缩操作跳过应用此属性。

TarInfo.gname_: [str](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")_[¶](#tarfile.TarInfo.gname "Link to this definition")

分组名。

在 3.12 版本发生变更: 对于 [`extract()`](#tarfile.TarFile.extract "tarfile.TarFile.extract") 和 [`extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 可设为 `None`，以使解压缩操作跳过应用此属性。

TarInfo.chksum_: [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")_[¶](#tarfile.TarInfo.chksum "Link to this definition")

标头校验和。

TarInfo.devmajor_: [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")_[¶](#tarfile.TarInfo.devmajor "Link to this definition")

设备主编号。

TarInfo.devminor_: [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")_[¶](#tarfile.TarInfo.devminor "Link to this definition")

设备次编号。

TarInfo.offset_: [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")_[¶](#tarfile.TarInfo.offset "Link to this definition")

tar 标头从这里开始。

TarInfo.offset\_data_: [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")_[¶](#tarfile.TarInfo.offset_data "Link to this definition")

文件的数据从这里开始。

TarInfo.sparse[¶](#tarfile.TarInfo.sparse "Link to this definition")

离散的成员信息。

一个包含所关联的 pax 扩展标头的键值对的字典。

TarInfo.replace(_name\=..._, _mtime\=..._, _mode\=..._, _linkname\=..._, _uid\=..._, _gid\=..._, _uname\=..._, _gname\=..._, _deep\=True_)[¶](#tarfile.TarInfo.replace "Link to this definition")

Added in version 3.12.

返回修改了给定属性的 `TarInfo` 对象的 _新_ 副本。例如，要返回组名设为 `'staff'` 的 `TarInfo`，请使用:

new\_tarinfo \= old\_tarinfo.replace(gname\='staff')

在默认情况下，将执行深拷贝。如果 _deep_ 为假值，则执行浅拷贝，即 `pax_headers` 及任何自定义属性都与原始 `TarInfo` 对象共享。

[`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象还提供了一些便捷查询方法：

TarInfo.isfile()[¶](#tarfile.TarInfo.isfile "Link to this definition")

如果 [`TarInfo`](#tarfile.TarInfo "tarfile.TarInfo") 对象为普通文件则返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")。

TarInfo.isreg()[¶](#tarfile.TarInfo.isreg "Link to this definition")

与 [`isfile()`](#tarfile.TarInfo.isfile "tarfile.TarInfo.isfile") 相同。

TarInfo.isdir()[¶](#tarfile.TarInfo.isdir "Link to this definition")

如果为目录则返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")。

TarInfo.issym()[¶](#tarfile.TarInfo.issym "Link to this definition")

如果为符号链接则返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")。

TarInfo.islnk()[¶](#tarfile.TarInfo.islnk "Link to this definition")

如果为硬链接则返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")。

TarInfo.ischr()[¶](#tarfile.TarInfo.ischr "Link to this definition")

如果为字符设备则返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")。

TarInfo.isblk()[¶](#tarfile.TarInfo.isblk "Link to this definition")

如果为块设备则返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")。

TarInfo.isfifo()[¶](#tarfile.TarInfo.isfifo "Link to this definition")

如果为 FIFO 则返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")。

TarInfo.isdev()[¶](#tarfile.TarInfo.isdev "Link to this definition")

如果为字符设备、块设备或 FIFO 之一则返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")。

## 命令行接口[¶](#command-line-interface "Link to this heading")

Added in version 3.4.

The `tarfile` 模块提供了简单的命令行接口用于同 tar 归档的交互。

如果你想要创建一个新的 tar 归档，请在 [`-c`](#cmdoption-tarfile-c) 选项后指定其名称然后列出应当被包含的文件名：

$ python \-m tarfile \-c monty.tar  spam.txt eggs.txt

传入一个目录也是可接受的：

$ python \-m tarfile \-c monty.tar life-of-brian\_1979/

如果你想要将一个 tar 归档提取到当前目录，请使用 [`-e`](#cmdoption-tarfile-e) 选项：

$ python \-m tarfile \-e monty.tar

你也可以通过传入目录名称将一个 tar 归档提取到不同的目录：

$ python \-m tarfile \-e monty.tar  other-dir/

要获取一个 tar 归档中文件的列表，请使用 [`-l`](#cmdoption-tarfile-l) 选项：

$ python \-m tarfile \-l monty.tar

### 命令行选项[¶](#command-line-options "Link to this heading")

\-l <tarfile>[¶](#cmdoption-tarfile-l "Link to this definition")

\--list <tarfile>[¶](#cmdoption-tarfile-list "Link to this definition")

列出一个 tarfile 中的文件名。

\-c <tarfile> <source1> ... <sourceN>[¶](#cmdoption-tarfile-c "Link to this definition")

\--create <tarfile> <source1> ... <sourceN>[¶](#cmdoption-tarfile-create "Link to this definition")

基于源文件创建 tarfile。

\-e <tarfile> \[<output\_dir>\][¶](#cmdoption-tarfile-e "Link to this definition")

如果未指定 _output\_dir_ 则会将 tarfile 提取到当前目录。

\-t <tarfile>[¶](#cmdoption-tarfile-t "Link to this definition")

\--test <tarfile>[¶](#cmdoption-tarfile-test "Link to this definition")

检测 tarfile 是否有效。

\-v, \--verbose[¶](#cmdoption-tarfile-v "Link to this definition")

更详细地输出结果。

\--filter <filtername>[¶](#cmdoption-tarfile-filter "Link to this definition")

为 `--extract` 指定 _filter_。详情参见 [解压缩过滤器](#tarfile-extraction-filter)。只接受字符串名称 (包括 `fully_trusted`, `tar` 和 `data`)。

## 例子[¶](#examples "Link to this heading")

### 读取示例[¶](#reading-examples "Link to this heading")

如何将整个 tar 归档提取到当前工作目录:

import tarfile
tar \= tarfile.open("sample.tar.gz")
tar.extractall(filter\='data')
tar.close()

如何通过 [`TarFile.extractall()`](#tarfile.TarFile.extractall "tarfile.TarFile.extractall") 使用生成器函数而非列表来提取一个 tar 归档的子集:

import os
import tarfile

def py\_files(members):
    for tarinfo in members:
        if os.path.splitext(tarinfo.name)\[1\] \== ".py":
            yield tarinfo

tar \= tarfile.open("sample.tar.gz")
tar.extractall(members\=py\_files(tar))
tar.close()

如何读取一个 gzip 压缩的 tar 归档并显示一些成员信息:

import tarfile
tar \= tarfile.open("sample.tar.gz", "r:gz")
for tarinfo in tar:
    print(tarinfo.name, "is", tarinfo.size, "bytes in size and is ", end\="")
    if tarinfo.isreg():
        print("a regular file.")
    elif tarinfo.isdir():
        print("a directory.")
    else:
        print("something else.")
tar.close()

### 写入示例[¶](#writing-examples "Link to this heading")

如何基于一个文件名列表创建未压缩的 tar 归档:

import tarfile
tar \= tarfile.open("sample.tar", "w")
for name in \["foo", "bar", "quux"\]:
    tar.add(name)
tar.close()

使用 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句的同一个示例:

import tarfile
with tarfile.open("sample.tar", "w") as tar:
    for name in \["foo", "bar", "quux"\]:
        tar.add(name)

如何使用 [`sys.stdout.buffer`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stdout "sys.stdout") 作为 [`TarFile.add()`](#tarfile.TarFile.add "tarfile.TarFile.add") 方法中 _fileobj_ 形参的值，从而创建归档文件并将其写到标准输出:

import sys
import tarfile
with tarfile.open("sample.tar.gz", "w|gz", fileobj\=sys.stdout.buffer) as tar:
    for name in \["foo", "bar", "quux"\]:
        tar.add(name)

如何创建一个归档并使用 [`TarFile.add()`](#tarfile.TarFile.add "tarfile.TarFile.add") 中的 _filter_ 形参来重置用户信息:

import tarfile
def reset(tarinfo):
    tarinfo.uid \= tarinfo.gid \= 0
    tarinfo.uname \= tarinfo.gname \= "root"
    return tarinfo
tar \= tarfile.open("sample.tar.gz", "w:gz")
tar.add("foo", filter\=reset)
tar.close()

## 受支持的 tar 格式[¶](#supported-tar-formats "Link to this heading")

There are three tar formats that can be created with the `tarfile` module:

-   POSIX.1-1988 ustar 格式 ([`USTAR_FORMAT`](#tarfile.USTAR_FORMAT "tarfile.USTAR_FORMAT"))。它支持最多 256 个字符的文件名长度和最多 100 个字符的链接名长度。文件大小上限为 8 GiB。这是一种老旧但广受支持的格式。
    
-   The GNU tar format ([`GNU_FORMAT`](#tarfile.GNU_FORMAT "tarfile.GNU_FORMAT")). It supports long filenames and linknames, files bigger than 8 GiB and sparse files. It is the de facto standard on GNU/Linux systems. `tarfile` fully supports the GNU tar extensions for long names, sparse file support is read-only.
    
-   POSIX.1-2001 pax 格式 ([`PAX_FORMAT`](#tarfile.PAX_FORMAT "tarfile.PAX_FORMAT"))。它是几乎无限制的最灵活格式。 它支持长文件名和链接名，大文件以及使用可移植方式存储路径名。现代的 tar 实现，包括 GNU tar, bsdtar/libarchive 和 star，都完全支持扩展的 _pax_ 特性；某些老旧或不再维护的库可能不支持，但应当会将 _pax_ 归档视为广受支持的 _ustar_ 格式。 它是当前新建归档的默认格式。
    
    它扩展了现有的 _ustar_ 格式，包括用于无法以其他方式存储的附加标头。存在两种形式的 pax 标头：扩展标头只影响后续的文件标头，全局标头则适用于完整归档并会影响所有后续的文件。为了便于移植，在 pax 标头中的所有数据均以 _UTF-8_ 编码。
    

还有一些 tar 格式的其他变种，它们可以被读取但不能被创建：

-   古老的 V7 格式。这是来自 Unix 第七版的第一个 tar 格式，它只存储常规文件和目录。名称长度不能超过 100 个字符，并且没有用户/分组名信息。某些归档在带有非 ASCII 字符字段的情况下会产生计算错误的标头校验和。
    
-   SunOS tar 扩展格式。此格式是 POSIX.1-2001 pax 格式的一个变种，但并不保持兼容。
    

## Unicode 问题[¶](#unicode-issues "Link to this heading")

最初 tar 格式被设计用来在磁带机上生成备份，主要关注于保存文件系统信息。现在 tar 归档通常用于文件分发和在网络上交换归档。 最初格式（它是所有其他格式的基础）的一个问题是它没有支持不同字符编码格式的概念。例如，一个在 _UTF-8_ 系统上创建的普通 tar 归档如果包含非 _ASCII_ 字符则将无法在 _Latin-1_ 系统上被正确读取。文本元数据（例如文件名，链接名，用户/分组名）将变为损坏状态。 不幸的是，没有什么办法能够自动检测一个归档的编码格式。pax 格式被设计用来解决这个问题。它使用通用字符编码格式 _UTF-8_ 来存储非 ASCII 元数据。

The details of character conversion in `tarfile` are controlled by the _encoding_ and _errors_ keyword arguments of the [`TarFile`](#tarfile.TarFile "tarfile.TarFile") class.

_encoding_ 定义了用于归档中元数据的字符编码格式。默认值为 [`sys.getfilesystemencoding()`](https://docs.python.org/zh-cn/3/library/sys.html#sys.getfilesystemencoding "sys.getfilesystemencoding") 或是回退选项 `'ascii'`。根据归档是被读取还是被写入，元数据必须被解码或编码。如果没有正确设置 _encoding_，转换可能会失败。

_errors_ 参数定义了不能被转换的字符将如何处理。可能的取值在 [错误处理方案](https://docs.python.org/zh-cn/3/library/codecs.html#error-handlers) 小节列出。默认方案为 `'surrogateescape'`，它也被 Python 用于文件系统调用，参见 [文件名，命令行参数，以及环境变量。](https://docs.python.org/zh-cn/3/library/os.html#os-filenames)。

对于 [`PAX_FORMAT`](#tarfile.PAX_FORMAT "tarfile.PAX_FORMAT") 归档（默认格式），_encoding_ 通常是不必要的，因为所有元数据都使用 _UTF-8_ 来存储。 _encoding_ 仅在解码二进制 pax 标头或存储带有替代字符的字符串等少数场景下会被使用。
