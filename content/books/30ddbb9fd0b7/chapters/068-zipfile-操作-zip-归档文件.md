**源代码:** [Lib/zipfile/](https://github.com/python/cpython/tree/3.14/Lib/zipfile/)

* * *

ZIP 文件格式是一个常用的归档与压缩标准。 这个模块提供了创建、读取、写入、添加及列出 ZIP 文件的工具。 任何对此模块的进阶使用都将需要理解此格式，其定义参见 [PKZIP Application Note](https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT)。

此模块不能处理多部分 ZIP 文件。 它可以处理使用 ZIP64 扩展（即大小超过 4 GiB 的 ZIP 文件）的 ZIP 文件。 它支持解密 ZIP 归档中的加密文件，但它不能创建加密文件。 解密非常之慢因为它是用原生 Python 而非 C 来实现的。

处理压缩归档文件需要一些 [可选模块](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module) 如 [`zlib`](https://docs.python.org/zh-cn/3/library/zlib.html#module-zlib "zlib: Low-level interface to compression and decompression routines compatible with gzip."), [`bz2`](https://docs.python.org/zh-cn/3/library/bz2.html#module-bz2 "bz2: Interfaces for bzip2 compression and decompression."), [`lzma`](https://docs.python.org/zh-cn/3/library/lzma.html#module-lzma "lzma: A Python wrapper for the liblzma compression library.") 和 [`compression.zstd`](https://docs.python.org/zh-cn/3/library/compression.zstd.html#module-compression.zstd "compression.zstd: Low-level interface to compression and decompression routines in the zstd library.")。 如果它们当中的任何一个在你的 CPython 副本中缺失，请查看你的发行方（也就是说，向你提供 Python 的人）。 如果你就是发行方，请参阅 [针对可选模块的要求](https://docs.python.org/zh-cn/3/using/configure.html#optional-module-requirements)。

这个模块定义了以下内容：

_exception_ zipfile.BadZipFile[¶](#zipfile.BadZipFile "Link to this definition")

为损坏的 ZIP 文件抛出的错误。

Added in version 3.2.

_exception_ zipfile.BadZipfile[¶](#zipfile.BadZipfile "Link to this definition")

[`BadZipFile`](#zipfile.BadZipFile "zipfile.BadZipFile") 的别名，与旧版本 Python 保持兼容性。

自 3.2 版本弃用.

_exception_ zipfile.LargeZipFile[¶](#zipfile.LargeZipFile "Link to this definition")

当 ZIP 文件需要 ZIP64 功能但是未启用时会抛出此错误。

_class_ zipfile.ZipFile

用于读写 ZIP 文件的类。 欲了解构造函数的描述，参阅段落 [ZipFile 对象](#zipfile-objects)。

_class_ zipfile.Path

实现了 [`pathlib.Path`](https://docs.python.org/zh-cn/3/library/pathlib.html#pathlib.Path "pathlib.Path") 所提供接口的一个子集的类，包括完整的 [`importlib.resources.abc.Traversable`](https://docs.python.org/zh-cn/3/library/importlib.resources.abc.html#importlib.resources.abc.Traversable "importlib.resources.abc.Traversable") 接口。

Added in version 3.8.

_class_ zipfile.PyZipFile

用于创建包含 Python 库的 ZIP 归档的类。

_class_ zipfile.ZipInfo(_filename\='NoName'_, _date\_time\=(1980, 1, 1, 0, 0, 0)_)[¶](#zipfile.ZipInfo "Link to this definition")

用来表示归档中一个成员信息的类。 这个类的实例由 [`ZipFile`](#zipfile.ZipFile "zipfile.ZipFile") 对象的 [`getinfo()`](#zipfile.ZipFile.getinfo "zipfile.ZipFile.getinfo") 和 [`infolist()`](#zipfile.ZipFile.infolist "zipfile.ZipFile.infolist") 方法返回。 大多数 `zipfile` 模块的用户不需要创建这些实例，只需使用此模块所创建的实例即可。 _filename_ 应当是归档成员的完整名称，_date\_time_ 应当是一个包含六个字段的元组用来描述文件最后一次修改的时间；这些字段的描述见 [ZipInfo 对象](#zipinfo-objects) 章节。

在 3.13 版本发生变更: 增加了公有的 `compress_level` 属性来暴露之前被保护的 `_compresslevel`。 较旧的被保护名称可继续作为保持向下兼容性的特征属性使用。

\_for\_archive(_archive_)[¶](#zipfile.ZipInfo._for_archive "Link to this definition")

将日期时间、压缩属性和外部属性求解为 [`ZipFile.writestr()`](#zipfile.ZipFile.writestr "zipfile.ZipFile.writestr") 所使用的适当默认值。

返回自身用于链式操作。

Added in version 3.14.

zipfile.is\_zipfile(_filename_)[¶](#zipfile.is_zipfile "Link to this definition")

根据文件的 Magic Number，如果 _filename_ 是一个有效的 ZIP 文件则返回 `True`，否则返回 `False`。 _filename_ 也可能是一个文件或类文件对象。

在 3.1 版本发生变更: 支持文件或类文件对象。

zipfile.ZIP\_STORED[¶](#zipfile.ZIP_STORED "Link to this definition")

未被压缩的归档成员的数字常数。

zipfile.ZIP\_DEFLATED[¶](#zipfile.ZIP_DEFLATED "Link to this definition")

常用的 ZIP 压缩方法的数字常数。需要 [`zlib`](https://docs.python.org/zh-cn/3/library/zlib.html#module-zlib "zlib: Low-level interface to compression and decompression routines compatible with gzip.") 模块。

zipfile.ZIP\_BZIP2[¶](#zipfile.ZIP_BZIP2 "Link to this definition")

BZIP2 压缩方法的数字常数。需要 [`bz2`](https://docs.python.org/zh-cn/3/library/bz2.html#module-bz2 "bz2: Interfaces for bzip2 compression and decompression.") 模块。

Added in version 3.3.

zipfile.ZIP\_LZMA[¶](#zipfile.ZIP_LZMA "Link to this definition")

LZMA 压缩方法的数字常数。需要 [`lzma`](https://docs.python.org/zh-cn/3/library/lzma.html#module-lzma "lzma: A Python wrapper for the liblzma compression library.") 模块。

Added in version 3.3.

zipfile.ZIP\_ZSTANDARD[¶](#zipfile.ZIP_ZSTANDARD "Link to this definition")

Zstandard 压缩的数字常量。 需要 [`compression.zstd`](https://docs.python.org/zh-cn/3/library/compression.zstd.html#module-compression.zstd "compression.zstd: Low-level interface to compression and decompression routines in the zstd library.") 模块。

备注

在 APPNOTE 6.3.7 中，方法 ID `20` 被分配给 Zstandard 压缩。 这在 APPNOTE 6.3.8 中被改为方法 ID `93` 以避免冲突，方法 ID `20` 则被弃用。 为保持兼容性，`zipfile` 模块会同时读取这两个方法 ID 但将只以方法 ID `93` 写入数据。

Added in version 3.14.

备注

ZIP 文件格式规范包括自 2001 年起对 bzip2 压缩的支持，自 2006 年起对 LZMA 压缩的支持，以及自 2020 年起对 Zstandard 压缩的支持。 但是，一些工具（包括较旧的 Python 发布版）不支持这些压缩方法，并可能完全拒绝处理 ZIP 文件，或者无法提取单个文件。

## ZipFile 对象[¶](#zipfile-objects "Link to this heading")

_class_ zipfile.ZipFile(_file_, _mode\='r'_, _compression\=ZIP\_STORED_, _allowZip64\=True_, _compresslevel\=None_, _\*_, _strict\_timestamps\=True_, _metadata\_encoding\=None_)[¶](#zipfile.ZipFile "Link to this definition")

打开一个 ZIP 文件，_file_ 为一个指向文件的路径（字符串），一个类文件对象或者一个 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object)。

形参 _mode_ 应当为 `'r'` 来读取一个存在的文件，`'w'` 来截断并写入新的文件， `'a'` 来添加到一个存在的文件，或者 `'x'` 来仅新建并写入新的文件。如果 _mode_ 为 `'x'` 并且 _file_ 指向已经存在的文件，则抛出 [`FileExistsError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#FileExistsError "FileExistsError")。如果 _mode_ 为 `'a'` 且 _file_ 为已存在的文件，则额外的文件将被加入。如果 _file_ 不指向 ZIP 文件，之后一个新的 ZIP 归档将被追加为此文件。这是为了将 ZIP 归档添加到另一个文件 (例如 `python.exe`)。 如果 _mode_ 为 `'a'` 并且文件不存在， 则会新建。如果 _mode_ 为 `'r'` 或 `'a'`， 则文件应当可定位。

_compression_ 是在写入归档时要使用的 ZIP 压缩方法，应为 [`ZIP_STORED`](#zipfile.ZIP_STORED "zipfile.ZIP_STORED"), [`ZIP_DEFLATED`](#zipfile.ZIP_DEFLATED "zipfile.ZIP_DEFLATED"), [`ZIP_BZIP2`](#zipfile.ZIP_BZIP2 "zipfile.ZIP_BZIP2"), [`ZIP_LZMA`](#zipfile.ZIP_LZMA "zipfile.ZIP_LZMA") 或 [`ZIP_ZSTANDARD`](#zipfile.ZIP_ZSTANDARD "zipfile.ZIP_ZSTANDARD")；不可识别的值将导致引发 [`NotImplementedError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#NotImplementedError "NotImplementedError")。 如果指定了 `ZIP_DEFLATED`, `ZIP_BZIP2`, `ZIP_LZMA` 或 `ZIP_ZSTANDARD` 但相应的模块 ([`zlib`](https://docs.python.org/zh-cn/3/library/zlib.html#module-zlib "zlib: Low-level interface to compression and decompression routines compatible with gzip."), [`bz2`](https://docs.python.org/zh-cn/3/library/bz2.html#module-bz2 "bz2: Interfaces for bzip2 compression and decompression."), [`lzma`](https://docs.python.org/zh-cn/3/library/lzma.html#module-lzma "lzma: A Python wrapper for the liblzma compression library.") 或 [`compression.zstd`](https://docs.python.org/zh-cn/3/library/compression.zstd.html#module-compression.zstd "compression.zstd: Low-level interface to compression and decompression routines in the zstd library.")) 不可用，则会引发 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")。 默认值为 `ZIP_STORED`。

如果 _allowZip64_ 为 `True` (默认值) 则 zipfile 将在 zipfile 大于 4 GiB 时创建使用 ZIP64 扩展的 ZIP 文件。 如果为 `false` 则 `zipfile` 将在 ZIP 文件需要 ZIP64 扩展时引发异常。

_compresslevel_ 形参控制在将文件写入归档时要使用的压缩等级。 当使用 [`ZIP_STORED`](#zipfile.ZIP_STORED "zipfile.ZIP_STORED") 或 [`ZIP_LZMA`](#zipfile.ZIP_LZMA "zipfile.ZIP_LZMA") 该形参将无效。 当使用 [`ZIP_DEFLATED`](#zipfile.ZIP_DEFLATED "zipfile.ZIP_DEFLATED") 时接受整数 `0` 至 `9` (参见 [`zlib`](https://docs.python.org/zh-cn/3/library/zlib.html#zlib.compressobj "zlib.compressobj") 了解详情)。 当使用 [`ZIP_BZIP2`](#zipfile.ZIP_BZIP2 "zipfile.ZIP_BZIP2") 时接受整数 `1` 至 `9` (参见 [`bz2`](https://docs.python.org/zh-cn/3/library/bz2.html#bz2.BZ2File "bz2.BZ2File") 了解详情)。 当使用 [`ZIP_ZSTANDARD`](#zipfile.ZIP_ZSTANDARD "zipfile.ZIP_ZSTANDARD") 时通常接受整数 `-131072` 至 `22` (参见 [`CompressionParameter.compression_level`](https://docs.python.org/zh-cn/3/library/compression.zstd.html#compression.zstd.CompressionParameter.compression_level "compression.zstd.CompressionParameter.compression_level") 了解获取有效值及其含义的更多信息)。

_strict\_timestamps_ 参数在设为 `False` 时允许压缩早于 1980-01-01 的文件，代价是会将时间戳设为 1980-01-01。 类似的行为也会对晚于 2107-12-31 的文件发生，时间戳也会被设为该上限值。

当 mode 为 `'r'` 时，可以将 _metadata\_encoding_ 设为某个编解码器的名称，它将被用来解码元数据如成员名称和 ZIP 注释等等。

如果创建文件时使用 `'w'`, `'x'` 或 `'a'` 模式并且未向归档添加任何文件就执行了 [`closed`](#zipfile.ZipFile.close "zipfile.ZipFile.close")，则会将适当的空归档 ZIP 结构写入文件。

ZipFile 也是一个上下文管理器，因此支持 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句。 在这个示例中，_myzip_ 将在 `with` 语句块执行完成之后被关闭 --- 即使是发生了异常:

with ZipFile('spam.zip', 'w') as myzip:
    myzip.write('eggs.txt')

备注

_metadata\_encoding_ 是用于 ZipFile 的实例级设置。 不能在成员层级上设置此选项。

该属性是对旧式实现的变通处理，它产生的归档文件名会使用当前语言区域编码格式或代码页（主要是在 Windows 上）。 根据 .ZIP 标准，元数据的编码格式可以通过归档文件标头中的一个旗标指定为 IBM 代码页（默认）或 UTF-8。 该旗标优先于 _metadata\_encoding_，后者是一个 Python 专属的扩展。

在 3.2 版本发生变更: 添加了将 [`ZipFile`](#zipfile.ZipFile "zipfile.ZipFile") 用作上下文管理器的功能。

在 3.3 版本发生变更: 添加了对 [`bzip2`](https://docs.python.org/zh-cn/3/library/bz2.html#module-bz2 "bz2: Interfaces for bzip2 compression and decompression.") 和 [`lzma`](https://docs.python.org/zh-cn/3/library/lzma.html#module-lzma "lzma: A Python wrapper for the liblzma compression library.") 压缩的支持。

在 3.4 版本发生变更: 默认启用 ZIP64 扩展。

在 3.5 版本发生变更: 添加了对不可查找数据流的支持。 并添加了对 `'x'` 模式的支持。

在 3.6 版本发生变更: 在此之前，对于不可识别的压缩值将引发普通的 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")。

在 3.7 版本发生变更: 添加了 _compresslevel_ 形参。

在 3.8 版本发生变更: _strict\_timestamps_ 仅限关键字形参。

在 3.11 版本发生变更: 增加了对指定成员名称编码格式的支持以便在 ZIP 文件的目录和文件标头中读取元数据。

ZipFile.close()[¶](#zipfile.ZipFile.close "Link to this definition")

关闭归档文件。 你必须在退出程序之前调用 [`close()`](#zipfile.ZipFile.close "zipfile.ZipFile.close") 否则将不会写入关键记录数据。

ZipFile.getinfo(_name_)[¶](#zipfile.ZipFile.getinfo "Link to this definition")

返回一个 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 对象，其中包含有关归档成员 _name_ 的信息。 针对一个目前并不包含于归档中的名称调用 [`getinfo()`](#zipfile.ZipFile.getinfo "zipfile.ZipFile.getinfo") 将会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError")。

ZipFile.infolist()[¶](#zipfile.ZipFile.infolist "Link to this definition")

返回一个列表，其中包含每个归档成员的 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 对象。 如果是打开一个现有归档则这些对象的排列顺序与它们对应条目在磁盘上的实际 ZIP 文件中的顺序一致。

ZipFile.namelist()[¶](#zipfile.ZipFile.namelist "Link to this definition")

按名称返回归档成员的列表。

ZipFile.open(_name_, _mode\='r'_, _pwd\=None_, _\*_, _force\_zip64\=False_)[¶](#zipfile.ZipFile.open "Link to this definition")

以二进制文件型对象的形式访问一个归档成员。 _name_ 可以是归档内某个文件的名称或是某个 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 对象。 如果包括了 _mode_ 形参，则它必须为 `'r'` (默认值) 或 `'w'`。 _pwd_ 是用于解密 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象形式的已加密 ZIP 文件的密码。

[`open()`](#zipfile.ZipFile.open "zipfile.ZipFile.open") 也是一个上下文管理器，因此支持 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句:

with ZipFile('spam.zip') as myzip:
    with myzip.open('eggs.txt') as myfile:
        print(myfile.read())

如果 _mode_ 为 `'r'` 则文件型对象 (`ZipExtFile`) 将为只读并且提供下列方法: [`read()`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase.read "io.BufferedIOBase.read"), [`readline()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.readline "io.IOBase.readline"), [`readlines()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.readlines "io.IOBase.readlines"), [`seek()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.seek "io.IOBase.seek"), [`tell()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.tell "io.IOBase.tell"), [`__iter__()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#container.__iter__ "container.__iter__"), [`__next__()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#iterator.__next__ "iterator.__next__")。 这些对象可独立于 ZipFile 进行操作。

如果 `mode='w'` 则返回一个可写入的文件句柄，它将支持 [`write()`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase.write "io.BufferedIOBase.write") 方法。 当一个可写入的文件句柄被打开时，尝试读写 ZIP 文件中的其他文件将会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

在两种情况下该文件型对象还具有属性 `name`，它等价于归档内文件的名称，以及 `mode`，它根据输入模式的不同可能为 `'rb'` 或 `'wb'`。

当写入一个文件时，如果文件大小不能预先确定但是可能超过 2 GiB，可传入 `force_zip64=True` 以确保标头格式能够支持超大文件。 如果文件大小可以预先确定，则在构造 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 对象时应设置 [`file_size`](#zipfile.ZipInfo.file_size "zipfile.ZipInfo.file_size")，并将其用作 _name_ 形参。

备注

[`open()`](#zipfile.ZipFile.open "zipfile.ZipFile.open"), [`read()`](#zipfile.ZipFile.read "zipfile.ZipFile.read") 和 [`extract()`](#zipfile.ZipFile.extract "zipfile.ZipFile.extract") 方法可接受文件名或 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 对象。 当尝试读取一个包含重复名称成员的 ZIP 文件时你将发现此功能很有好处。

在 3.6 版本发生变更: 现在 [`ZipFile.open()`](#zipfile.ZipFile.open "zipfile.ZipFile.open") 可以被用来配合 `mode='w'` 选项将文件写入归档。

在 3.13 版本发生变更: 为可写文件型对象增加了属性 `name` 和 `mode`。 可读文件型对象的 `mode` 属性值由 `'r'` 改为 `'rb'`。

从归档中提取一个成员放入当前工作目录；_member_ 必须是一个成员的完整名称或 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 对象。 成员的文件信息会尽可能精确地被提取。 _path_ 指定一个要放入的不同目录。 _member_ 可以是一个文件名或 `ZipInfo` 对象。 _pwd_ 是 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象形式的用于解密已加密文件的密码。

返回所创建的经正规化的路径（对应于目录或新文件）。

备注

如果一个成员文件名为绝对路径，则将去掉驱动器/UNC共享点和前导的（反）斜杠，例如: `///foo/bar` 在 Unix 上将变为 `foo/bar`，而 `C:\foo\bar` 在 Windows 上将变为 `foo\bar`。 并且一个成员文件名中的所有 `".."` 都将被移除，例如: `../../foo../../ba..r` 将变为 `foo../ba..r`。 在 Windows 上非法字符 (`:`, `<`, `>`, `|`, `"`, `?`, and `*`) 会被替换为下划线 (`_`)。

从归档中提取出所有成员放入当前工作目录。 _path_ 指定一个要放入的不同目录。 _members_ 为可选项且必须为 [`namelist()`](#zipfile.ZipFile.namelist "zipfile.ZipFile.namelist") 所返回列表的一个子集。 _pwd_ 是 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象形式的用于解密已加密文件的密码。

警告

Never extract archives from untrusted sources without prior inspection. It is possible that files are created outside of _path_, for example, members that have absolute filenames or filenames with ".." components. This module attempts to prevent that. See [`extract()`](#zipfile.ZipFile.extract "zipfile.ZipFile.extract") note.

ZipFile.printdir()[¶](#zipfile.ZipFile.printdir "Link to this definition")

将归档的目录表打印到 `sys.stdout`。

ZipFile.setpassword(_pwd_)[¶](#zipfile.ZipFile.setpassword "Link to this definition")

将 _pwd_ (一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象) 设为用于提取已加密文件的默认密码。

ZipFile.read(_name_, _pwd\=None_)[¶](#zipfile.ZipFile.read "Link to this definition")

返回归档中文件 _name_ 的字节数据。 _name_ 是归档中文件的名称，或是一个 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 对象。 归档必须以读取或追加模式打开。 如果提供了 _pwd_，它应为 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象形式的用于解密已加密文件的密码，它会覆盖通过 [`setpassword()`](#zipfile.ZipFile.setpassword "zipfile.ZipFile.setpassword") 设置的默认密码。 在使用 [`ZIP_STORED`](#zipfile.ZIP_STORED "zipfile.ZIP_STORED"), [`ZIP_DEFLATED`](#zipfile.ZIP_DEFLATED "zipfile.ZIP_DEFLATED"), [`ZIP_BZIP2`](#zipfile.ZIP_BZIP2 "zipfile.ZIP_BZIP2"), [`ZIP_LZMA`](#zipfile.ZIP_LZMA "zipfile.ZIP_LZMA") 或 [`ZIP_ZSTANDARD`](#zipfile.ZIP_ZSTANDARD "zipfile.ZIP_ZSTANDARD") 以外的压缩方法的 ZipFile 上调用 [`read()`](#zipfile.ZipFile.read "zipfile.ZipFile.read") 将引发 [`NotImplementedError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#NotImplementedError "NotImplementedError")。 如果相应的压缩模块不可用也会引发错误。

ZipFile.testzip()[¶](#zipfile.ZipFile.testzip "Link to this definition")

读取归档中的所有文件并检查它们的 CRC 和文件头。 返回第一个已损坏文件的名称，在其他情况下则返回 `None`。

ZipFile.write(_filename_, _arcname\=None_, _compress\_type\=None_, _compresslevel\=None_)[¶](#zipfile.ZipFile.write "Link to this definition")

将名为 _filename_ 的文件写入归档，给予的归档名为 _arcname_ (默认情况下将与 _filename_ 一致，但是不带驱动器盘符并会移除开头的路径分隔符)。 _compress\_type_ 如果给出，它将覆盖作为构造器 _compression_ 形参对于新条目所给出的值。 类似地，_compresslevel_ 如果给出也将覆盖构造器。 归档必须使用 `'w'`, `'x'` 或 `'a'` 模式打开。

备注

ZIP 文件标准在历史上并未指定元数据编码格式，但是强烈建议使用 CP437（原始 IBM PC 编码格式）来实现互操作性。 最近的版本允许（仅）使用 UTF-8。 在这个模块中，如果成员名称包含任何非 ASCII 字符则将自动使用 UTF-8 来写入它们。 不可能用 ASCII 或 UTF-8 以外的任何其他编码格式来写入成员名称。

备注

归档名称应当是基于归档根目录的相对路径，也就是说，它们不应以路径分隔符开头。

备注

如果 `arcname` (或 `filename`，如果 `arcname` 未给出) 包含一个空字节，则归档中该文件的名称将在空字节位置被截断。

备注

文件名开头有一个斜杠可能导致存档文件无法在 Windows 系统上的某些 zip 程序中打开。

在 3.6 版本发生变更: 在使用 `'r'` 模式创建的 ZipFile 或已关闭的 ZipFile 上调用 [`write()`](#zipfile.ZipFile.write "zipfile.ZipFile.write") 将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。 在之前的版本中则会引发 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")。

ZipFile.writestr(_zinfo\_or\_arcname_, _data_, _compress\_type\=None_, _compresslevel\=None_)[¶](#zipfile.ZipFile.writestr "Link to this definition")

将一个文件写入归档。 内容为 _data_，它可以是一个 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 或 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 的实例；如果是 `str`，则会先使用 UTF-8 进行编码。 _zinfo\_or\_arcname_ 可以是它在归档中将被给予的名称，或者是 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 的实例。 如果它是一个实例，则至少必须给定文件名、日期和时间。 如果它是一个名称，则日期和时间会被设为当前日期和时间。 归档必须以 `'w'`, `'x'` 或 `'a'` 模式打开。

如果给定了 _compress\_type_，它将会覆盖作为新条目构造器的 _compression_ 形参或在 _zinfo\_or\_arcname_ (如果是一个 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 实例) 中所给出的值。 类似地，如果给定了 _compresslevel_，它将会覆盖构造器。

备注

当传入一个 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 实例作为 _zinfo\_or\_arcname_ 形参时，所使用的压缩方法将为在给定的 `ZipInfo` 实例的 _compress\_type_ 成员中指定的方法。 默认情况下，`ZipInfo` 构造器将此成员设为 [`ZIP_STORED`](#zipfile.ZIP_STORED "zipfile.ZIP_STORED")。

在 3.2 版本发生变更: _compress\_type_ 参数。

在 3.6 版本发生变更: 在使用 `'r'` 模式创建的 ZipFile 或已关闭的 ZipFile 上调用 [`writestr()`](#zipfile.ZipFile.writestr "zipfile.ZipFile.writestr") 将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。 在之前的版本中则会引发 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")。

在 3.14 版本发生变更: 现在将遵守 `SOURCE_DATE_EPOCH` 环境变量。 如果已设置，它将使用该值作为文件写入 ZIP 归档的修改时间戳，而不是使用当前时间。

ZipFile.mkdir(_zinfo\_or\_directory_, _mode\=511_)[¶](#zipfile.ZipFile.mkdir "Link to this definition")

在归档文件内创建一个目录。 如果 _zinfo\_or\_directory_ 是一个字符串，则会在归档文件中以 _mode_ 参数指定的模式创建目录。 但是，如果 _zinfo\_or\_directory_ 是一个 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 实例则 _mode_ 参数将被忽略。

归档文件必须以 `'w'`, `'x'` 或 `'a'` 模式打开。

Added in version 3.11.

以下数据属性也是可用的:

ZipFile.filename[¶](#zipfile.ZipFile.filename "Link to this definition")

ZIP 文件的名称。

ZipFile.debug[¶](#zipfile.ZipFile.debug "Link to this definition")

要使用的调试输出等级。 这可以设为从 `0` (默认无输出) 到 `3` (最多输出) 的值。 调试信息会被写入 `sys.stdout`。

关联到 ZIP 文件的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象形式的说明。 如果将说明赋给以 `'w'`, `'x'` 或 `'a'` 模式创建的 [`ZipFile`](#zipfile.ZipFile "zipfile.ZipFile") 实例，它的长度不应超过 65535 字节。 超过此长度的说明将被截断。

## Path 对象[¶](#path-objects "Link to this heading")

_class_ zipfile.Path(_root_, _at\=''_)[¶](#zipfile.Path "Link to this definition")

根据 `root` zipfile (它可以是一个 [`ZipFile`](#zipfile.ZipFile "zipfile.ZipFile") 实例或适合传给 `ZipFile` 构造器的 `file`) 构造一个 Path 对象。

`at` 指定此 Path 在 zipfile 中的位置，例如 'dir/file.txt', 'dir/' 或 ''。 默认为空字符串，即指定根目录。

备注

The `Path` class does not sanitize filenames within the ZIP archive. Unlike the [`ZipFile.extract()`](#zipfile.ZipFile.extract "zipfile.ZipFile.extract") and [`ZipFile.extractall()`](#zipfile.ZipFile.extractall "zipfile.ZipFile.extractall") methods, it is the caller's responsibility to validate or sanitize filenames to prevent path traversal vulnerabilities (for example, absolute paths or paths with ".." components). When handling untrusted archives, consider resolving filenames using [`os.path.abspath()`](https://docs.python.org/zh-cn/3/library/os.path.html#os.path.abspath "os.path.abspath") and checking against the target directory with [`os.path.commonpath()`](https://docs.python.org/zh-cn/3/library/os.path.html#os.path.commonpath "os.path.commonpath").

Path 对象会公开 [`pathlib.Path`](https://docs.python.org/zh-cn/3/library/pathlib.html#pathlib.Path "pathlib.Path") 对象的下列特性:

Path 对象可以使用 `/` 运算符或 `joinpath` 来进行遍历。

Path.name[¶](#zipfile.Path.name "Link to this definition")

最终的路径组成部分。

Path.open(_mode='r'_, _\*_, _pwd_, _\*\*_)[¶](#zipfile.Path.open "Link to this definition")

在当前路径上唤起 [`ZipFile.open()`](#zipfile.ZipFile.open "zipfile.ZipFile.open")。 允许通过支持的模式打开用于读取或写入文本或二进制数据: 'r', 'w', 'rb', 'wb'。 当以文本模式打开时位置和关键字参数会被传给 [`io.TextIOWrapper`](https://docs.python.org/zh-cn/3/library/io.html#io.TextIOWrapper "io.TextIOWrapper")，在其他情况下则会被忽略。 `pwd` 是要传给 `ZipFile.open()` 的 `pwd` 形参。

在 3.9 版本发生变更: 增加了对以文本和二进制模式打开的支持。 现在默认为文本模式。

在 3.11.2 版本发生变更: `encoding` 形参可以作为位置参数来提供而不会引起 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。 这种情况在 3.9 中是会发生的。 需要与未打补丁的 3.10 和 3.11 版保持兼容的代码必须将所有 [`io.TextIOWrapper`](https://docs.python.org/zh-cn/3/library/io.html#io.TextIOWrapper "io.TextIOWrapper") 参数，包括 `encoding` 作为关键字参数传入。

Path.iterdir()[¶](#zipfile.Path.iterdir "Link to this definition")

枚举当前目录的子项。

Path.is\_dir()[¶](#zipfile.Path.is_dir "Link to this definition")

如果当前上下文引用了一个目录则返回 `True`。

Path.is\_file()[¶](#zipfile.Path.is_file "Link to this definition")

如果当前上下文引用了一个文件则返回 `True`。

Path.is\_symlink()[¶](#zipfile.Path.is_symlink "Link to this definition")

如果当前上下文引用了一个符号链接则返回 `True`。

Added in version 3.12.

在 3.13 版本发生变更: 在之前版本中，`is_symlink` 将无条件地返回 `False`。

Path.exists()[¶](#zipfile.Path.exists "Link to this definition")

如果当前上下文引用了 zip 文件内的一个文件或目录则返回 `True`。

Path.suffix[¶](#zipfile.Path.suffix "Link to this definition")

最终组件末尾的以点号分隔的部分，如果存在的话。 这通常被称为文件扩展名。

Added in version 3.11: 添加了 [`Path.suffix`](#zipfile.Path.suffix "zipfile.Path.suffix") 特征属性。

Path.stem[¶](#zipfile.Path.stem "Link to this definition")

路径的末尾部分，不带文件后缀。

Added in version 3.11: 添加了 [`Path.stem`](#zipfile.Path.stem "zipfile.Path.stem") 特征属性。

Path.suffixes[¶](#zipfile.Path.suffixes "Link to this definition")

由路径后缀组成的列表，通常被称为文件扩展名。

Added in version 3.11: 添加了 [`Path.suffixes`](#zipfile.Path.suffixes "zipfile.Path.suffixes") 特征属性。

Path.read\_text(_\*_, _\*\*_)[¶](#zipfile.Path.read_text "Link to this definition")

读取当前文件为 unicode 文本。 位置和关键字参数会被传递给 [`io.TextIOWrapper`](https://docs.python.org/zh-cn/3/library/io.html#io.TextIOWrapper "io.TextIOWrapper") (`buffer` 除外，它将由上下文确定)。

在 3.11.2 版本发生变更: `encoding` 形参可以作为位置参数来提供而不会引起 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。 这种情况在 3.9 中是会发生的。 需要与未打补丁的 3.10 和 3.11 版保持兼容的代码必须将所有 [`io.TextIOWrapper`](https://docs.python.org/zh-cn/3/library/io.html#io.TextIOWrapper "io.TextIOWrapper") 参数，包括 `encoding` 作为关键字参数传入。

Path.read\_bytes()[¶](#zipfile.Path.read_bytes "Link to this definition")

读取当前文件为字节串。

Path.joinpath(_\*other_)[¶](#zipfile.Path.joinpath "Link to this definition")

返回一个新的 Path 对象，其中合并了每个 _other_ 参数。 以下代码是等价的:

\>>> Path(...).joinpath('child').joinpath('grandchild')
\>>> Path(...).joinpath('child', 'grandchild')
\>>> Path(...) / 'child' / 'grandchild'

在 3.10 版本发生变更: 在 3.10 之前，`joinpath` 未被写入文档并且只接受一个形参。

[zipp](https://pypi.org/project/zipp/) 项目向较旧版本的 Python 提供了最新路径对象功能的向下移植。 为尽早应用这些改变请使用 `zipp.Path` 来替代 `zipfile.Path`。

## PyZipFile 对象[¶](#pyzipfile-objects "Link to this heading")

[`PyZipFile`](#zipfile.PyZipFile "zipfile.PyZipFile") 构造器接受与 [`ZipFile`](#zipfile.ZipFile "zipfile.ZipFile") 构造器相同的形参，以及一个额外的形参 _optimize_。

_class_ zipfile.PyZipFile(_file_, _mode\='r'_, _compression\=ZIP\_STORED_, _allowZip64\=True_, _optimize\=\-1_)[¶](#zipfile.PyZipFile "Link to this definition")

在 3.2 版本发生变更: 增加了 _optimize_ 形参。

在 3.4 版本发生变更: 默认启用 ZIP64 扩展。

实例在 [`ZipFile`](#zipfile.ZipFile "zipfile.ZipFile") 对象所具有的方法以外还附加了一个方法:

writepy(_pathname_, _basename\=''_, _filterfunc\=None_)[¶](#zipfile.PyZipFile.writepy "Link to this definition")

查找 `*.py` 文件并将相应的文件添加到归档。

如果 [`PyZipFile`](#zipfile.PyZipFile "zipfile.PyZipFile") 的 _optimize_ 形参未给定或为 `-1`，则相应的文件为 `*.pyc` 文件，并在必要时进行编译。

如果 [`PyZipFile`](#zipfile.PyZipFile "zipfile.PyZipFile") 的 _optimize_ 形参为 `0`, `1` 或 `2`，则仅具有相应优化级别 (参见 [`compile()`](https://docs.python.org/zh-cn/3/builtins/functions.html#compile "compile")) 的文件会被添加到归档，并在必要时进行编译。

如果 _pathname_ 是文件，则文件名必须以 `.py` 为后缀，并且只有 (相应的 `*.pyc`) 文件会被添加到最高层级（不带路径信息）。 如果 _pathname_ 不是以 `.py` 为后缀的文件，则将引发 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")。 如果它是目录，并且该目录不是一个包目录，则所有的 `*.pyc` 文件会被添加到最高层级。 如果目录是一个包目录，则所有的 `*.pyc` 会被添加到包名所表示的文件路径下，并且如果有任何子目录为包目录，则会以排好的顺序递归地添加这些目录。

_basename_ 仅限在内部使用。

如果给定 _filterfunc_，则它必须是一个接受单个字符串参数的函数。 在将其添加到归档之前它将被传入每个路径（包括每个单独的完整路径）。 如果 _filterfunc_ 返回假值，则路径将不会被添加，而如果它是一个目录则其内容将被忽略。 例如，如果我们的测试文件全都位于 `test` 目录或以字符串 `test_` 打头，则我们可以使用一个 _filterfunc_ 来排除它们:

\>>> zf \= PyZipFile('myprog.zip')
\>>> def notests(s):
...     fn \= os.path.basename(s)
...     return (not (fn \== 'test' or fn.startswith('test\_')))
...
\>>> zf.writepy('myprog', filterfunc\=notests)

[`writepy()`](#zipfile.PyZipFile.writepy "zipfile.PyZipFile.writepy") 方法会产生带有这样一些文件名的归档:

string.pyc                   \# 最高层级名称
test/\_\_init\_\_.pyc            \# 包目录
test/testall.pyc             \# 模块 test.testall
test/bogus/\_\_init\_\_.pyc      \# 子包目录
test/bogus/myfile.pyc        \# 子模块 test.bogus.myfile

在 3.4 版本发生变更: 增加了 _filterfunc_ 形参。

在 3.7 版本发生变更: 递归排序目录条目。

## ZipInfo 对象[¶](#zipinfo-objects "Link to this heading")

[`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 类的实例会通过 [`getinfo()`](#zipfile.ZipFile.getinfo "zipfile.ZipFile.getinfo") 和 [`ZipFile`](#zipfile.ZipFile "zipfile.ZipFile") 对象的 [`infolist()`](#zipfile.ZipFile.infolist "zipfile.ZipFile.infolist") 方法返回。 每个对象将存储关于 ZIP 归档的一个成员的信息。

有一个类方法可以为文件系统文件创建 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 实例:

_classmethod_ ZipInfo.from\_file(_filename_, _arcname\=None_, _\*_, _strict\_timestamps\=True_)[¶](#zipfile.ZipInfo.from_file "Link to this definition")

为文件系统中的文件构造一个 [`ZipInfo`](#zipfile.ZipInfo "zipfile.ZipInfo") 实例，并准备将其添加到一个 zip 文件。

_filename_ 应为文件系统中某个文件或目录的路径。

如果指定了 _arcname_，它会被用作归档中的名称。 如果未指定 _arcname_，则所用名称与 _filename_ 相同，但将去除任何驱动器盘符和打头的路径分隔符。

_strict\_timestamps_ 参数在设为 `False` 时允许压缩早于 1980-01-01 的文件，代价是会将时间戳设为 1980-01-01。 类似的行为也会对晚于 2107-12-31 的文件发生，时间戳也会被设为该上限值。

Added in version 3.6.

在 3.8 版本发生变更: 增加了 _strict\_timestamps_ 仅限关键字形参。

实例具有下列方法和属性:

ZipInfo.is\_dir()[¶](#zipfile.ZipInfo.is_dir "Link to this definition")

如果此归档成员是一个目录则返回 `True`。

这会使用条目的名称：目录应当总是以 `/` 结尾。

Added in version 3.6.

ZipInfo.filename[¶](#zipfile.ZipInfo.filename "Link to this definition")

归档中的文件名称。

ZipInfo.date\_time[¶](#zipfile.ZipInfo.date_time "Link to this definition")

归档成员的最后修改时间和日期。这是一个包含六个值的元组，表示 ZIP 文件中央目录中的"最后\[修改\]文件时间"和"最后\[修改\]文件日期"字段。

该元组包含：

| 
索引

 | 

值

 |
| --- | --- |
| 

`0`

 | 

年 (>= 1980)

 |
| 

`1`

 | 

月（1为基数）

 |
| 

`2`

 | 

月份中的日期（1为基数）

 |
| 

`3`

 | 

小时（0为基数）

 |
| 

`4`

 | 

分钟（0为基数）

 |
| 

`5`

 | 

秒（0为基数）

 |

备注

ZIP 格式支持多个位于不同位置的时间戳字段（中央目录、NTFS/UNIX 系统的额外字段等）。此属性专门返回来自中央目录的时间戳。ZIP 文件中的中央目录时间戳格式不支持 1980 年之前的时间戳。虽然某些额外字段格式（如 UNIX 时间戳）可以表示更早的日期，但此属性仅返回中央目录时间戳。

中央目录时间戳被解释为表示本地时间而非 UTC 时间，以匹配其他 ZIP 工具的行为。

ZipInfo.compress\_type[¶](#zipfile.ZipInfo.compress_type "Link to this definition")

归档成员的压缩类型。

[`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象形式的单个归档成员的注释。

扩展字段数据。 [PKZIP Application Note](https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT) 包含一些保存于该 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象中的内部结构的注释。

ZipInfo.create\_system[¶](#zipfile.ZipInfo.create_system "Link to this definition")

创建 ZIP 归档所用的系统。

ZipInfo.create\_version[¶](#zipfile.ZipInfo.create_version "Link to this definition")

创建 ZIP 归档所用的 PKZIP 版本。

需要用来提取归档的 PKZIP 版本。

ZipInfo.reserved[¶](#zipfile.ZipInfo.reserved "Link to this definition")

必须为零。

ZipInfo.flag\_bits[¶](#zipfile.ZipInfo.flag_bits "Link to this definition")

ZIP 标志位。

ZipInfo.volume[¶](#zipfile.ZipInfo.volume "Link to this definition")

文件头的分卷号。

ZipInfo.internal\_attr[¶](#zipfile.ZipInfo.internal_attr "Link to this definition")

内部属性。

ZipInfo.external\_attr[¶](#zipfile.ZipInfo.external_attr "Link to this definition")

外部文件属性。

文件头的字节偏移量。

ZipInfo.CRC[¶](#zipfile.ZipInfo.CRC "Link to this definition")

未压缩文件的 CRC-32。

ZipInfo.compress\_size[¶](#zipfile.ZipInfo.compress_size "Link to this definition")

已压缩数据的大小。

ZipInfo.file\_size[¶](#zipfile.ZipInfo.file_size "Link to this definition")

未压缩文件的大小。

## 命令行接口[¶](#command-line-interface "Link to this heading")

`zipfile` 模块提供了简单的命令行接口用来与 ZIP 归档进行交互。

如果你想要创建一个新的 ZIP 归档，请在 [`-c`](#cmdoption-zipfile-c) 选项后指定其名称然后列出应当被包含的文件名:

$ python \-m zipfile \-c monty.zip spam.txt eggs.txt

传入一个目录也是可接受的:

$ python \-m zipfile \-c monty.zip life-of-brian\_1979/

如果你想要将一个 ZIP 归档提取到指定的目录，请使用 [`-e`](#cmdoption-zipfile-e) 选项:

$ python \-m zipfile \-e monty.zip target-dir/

要获取一个 ZIP 归档中的文件列表，请使用 [`-l`](#cmdoption-zipfile-l) 选项:

$ python \-m zipfile \-l monty.zip

### 命令行选项[¶](#command-line-options "Link to this heading")

\-l <zipfile>[¶](#cmdoption-zipfile-l "Link to this definition")

\--list <zipfile>[¶](#cmdoption-zipfile-list "Link to this definition")

列出一个 zipfile 中的文件名。

\-c <zipfile> <source1> ... <sourceN>[¶](#cmdoption-zipfile-c "Link to this definition")

\--create <zipfile> <source1> ... <sourceN>[¶](#cmdoption-zipfile-create "Link to this definition")

基于源文件创建 zipfile。

\-e <zipfile> <output\_dir>[¶](#cmdoption-zipfile-e "Link to this definition")

将 zipfile 提取到目标目录中。

\-t <zipfile>[¶](#cmdoption-zipfile-t "Link to this definition")

\--test <zipfile>[¶](#cmdoption-zipfile-test "Link to this definition")

检测 zipfile 是否有效。

\--metadata-encoding <encoding>[¶](#cmdoption-zipfile-metadata-encoding "Link to this definition")

为 [`-l`](#cmdoption-zipfile-l), [`-e`](#cmdoption-zipfile-e) 和 [`-t`](#cmdoption-zipfile-t) 指定成员名称的编码格式。

Added in version 3.11.

## 解压缩的障碍[¶](#decompression-pitfalls "Link to this heading")

zipfile 模块的提取操作可能会由于下面列出的障碍而失败。

### 由于文件本身[¶](#from-file-itself "Link to this heading")

解压缩可能由于不正确的密码 / CRC 校验和 / ZIP 格式或不受支持的压缩方法 / 解密而失败。

### 文件系统限制[¶](#file-system-limitations "Link to this heading")

超出特定文件系统上的限制可能会导致解压缩失败。 例如目录条目所允许的字符、文件名的长度、路径名的长度、单个文件的大小以及文件的数量等等。

### 资源限制[¶](#resources-limitations "Link to this heading")

缺乏内存或磁盘空间将会导致解压缩失败。 例如，作用于 zipfile 库的解压缩炸弹 (即 [ZIP bomb](https://en.wikipedia.org/wiki/Zip_bomb)) 就可能造成磁盘空间耗尽。

### 中断[¶](#interruption "Link to this heading")

在解压缩期间中断执行，例如按下 ctrl-C 或杀死解压缩进程可能会导致归档文件的解压缩不完整。
