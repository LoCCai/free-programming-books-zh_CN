Added in version 3.3.

**源代码：** [Lib/lzma.py](https://github.com/python/cpython/tree/3.14/Lib/lzma.py)

* * *

此模块提供了可以压缩和解压缩使用 LZMA 压缩算法的数据的类和便捷函数。 其中还包含支持 **xz** 工具所使用的 `.xz` 和旧式 `.lzma` 文件格式的文件接口，以及相应的原始压缩数据流。

此模块所提供的接口与 [`bz2`](https://docs.python.org/zh-cn/3/library/bz2.html#module-bz2 "bz2: Interfaces for bzip2 compression and decompression.") 模块的非常类似。 请注意 [`LZMAFile`](#lzma.LZMAFile "lzma.LZMAFile") 和 [`bz2.BZ2File`](https://docs.python.org/zh-cn/3/library/bz2.html#bz2.BZ2File "bz2.BZ2File") 都 _不是_ 线程安全的，因此如果你需要在多个线程中使用单个 `LZMAFile` 实例，则需要通过锁来保护它。

这是一个 [optional module](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module)。 如果它在你的 CPython 副本中缺失，请查看你的发行方（也就是说，向你提供 Python 的人）的文档。 如果你就是发行方，请参阅 [针对可选模块的要求](https://docs.python.org/zh-cn/3/using/configure.html#optional-module-requirements)。

_exception_ lzma.LZMAError[¶](#lzma.LZMAError "Link to this definition")

当在压缩或解压缩期间或是在初始化压缩器/解压缩器的状态期间发生错误时此异常会被引发。

## 读写压缩文件[¶](#reading-and-writing-compressed-files "Link to this heading")

lzma.open(_filename_, _mode\='rb'_, _\*_, _format\=None_, _check\=\-1_, _preset\=None_, _filters\=None_, _encoding\=None_, _errors\=None_, _newline\=None_)[¶](#lzma.open "Link to this definition")

以二进制或文本模式打开 LZMA 压缩文件，返回一个 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)。

_filename_ 参数可以是一个实际的文件名（以 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str"), [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 或 [路径类](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object) 对象的形式给出），在此情况下会打开指定名称的文件，或者可以是一个用于读写的现有文件对象。

_mode_ 参数可以是二进制模式的 `"r"`, `"rb"`, `"w"`, `"wb"`, `"x"`, `"xb"`, `"a"` 或 `"ab"`，或者文本模式的 `"rt"`, `"wt"`, `"xt"` 或 `"at"`。 默认值为 `"rb"`。

当打开一个文件用于读取时，_format_ 和 _filters_ 参数具有与 [`LZMADecompressor`](#lzma.LZMADecompressor "lzma.LZMADecompressor") 的参数相同的含义。 在此情况下，_check_ 和 _preset_ 参数不应被使用。

当打开一个文件用于写入时，_format_, _check_, _preset_ 和 _filters_ 参数具有与 [`LZMACompressor`](#lzma.LZMACompressor "lzma.LZMACompressor") 的参数相同的含义。

对于二进制模式，这个函数等价于 [`LZMAFile`](#lzma.LZMAFile "lzma.LZMAFile") 构造器: `LZMAFile(filename, mode, ...)`。 在这种情况下，不可提供 _encoding_, _errors_ 和 _newline_ 参数。

对于文本模式，将会创建一个 [`LZMAFile`](#lzma.LZMAFile "lzma.LZMAFile") 对象，并将它包装到一个 [`io.TextIOWrapper`](https://docs.python.org/zh-cn/3/library/io.html#io.TextIOWrapper "io.TextIOWrapper") 实例中，此实例带有指定的编码格式、错误处理行为和行结束符。

在 3.4 版本发生变更: 增加了对 `"x"`, `"xb"` 和 `"xt"` 模式的支持。

_class_ lzma.LZMAFile(_filename\=None_, _mode\='r'_, _\*_, _format\=None_, _check\=\-1_, _preset\=None_, _filters\=None_)[¶](#lzma.LZMAFile "Link to this definition")

以二进制模式打开一个 LZMA 压缩文件。

[`LZMAFile`](#lzma.LZMAFile "lzma.LZMAFile") 可以包装在一个已打开的 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) 中，或者是在给定名称的文件上直接操作。 _filename_ 参数指定所包装的文件对象，或是要打开的文件名称（类型为 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str"), [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 或 [路径类](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object) 对象）。 如果是包装现有的文件对象，被包装的文件在 `LZMAFile` 被关闭时将不会被关闭。

_mode_ 参数可以是表示读取的 `"r"` (默认值)，表示覆写的 `"w"`，表示单独创建的 `"x"`，或表示添加的 `"a"`。 这些模式还可以分别以 `"rb"`, `"wb"`, `"xb"` 和 `"ab"` 的等价形式给出。

如果 _filename_ 是一个文件对象（而不是实际的文件名），则 `"w"` 模式并不会截断文件，而会等价于 `"a"`。

当打开一个文件用于读取时，输入文件可以为多个独立压缩流的拼接。 它们会被作为单个逻辑流被透明地解码。

当打开一个文件用于读取时，_format_ 和 _filters_ 参数具有与 [`LZMADecompressor`](#lzma.LZMADecompressor "lzma.LZMADecompressor") 的参数相同的含义。 在此情况下，_check_ 和 _preset_ 参数不应被使用。

当打开一个文件用于写入时，_format_, _check_, _preset_ 和 _filters_ 参数具有与 [`LZMACompressor`](#lzma.LZMACompressor "lzma.LZMACompressor") 的参数相同的含义。

[`LZMAFile`](#lzma.LZMAFile "lzma.LZMAFile") 支持 [`io.BufferedIOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase "io.BufferedIOBase") 所指定的所有成员，但 [`detach()`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase.detach "io.BufferedIOBase.detach") 和 [`truncate()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.truncate "io.IOBase.truncate") 除外。 并支持迭代和 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句。

还提供了下列方法和属性：

peek(_size\=\-1_)[¶](#lzma.LZMAFile.peek "Link to this definition")

返回缓冲的数据而不前移文件位置。 至少将返回一个字节的数据，除非已经到达 EOF。 实际返回的字节数不确定（会忽略 _size_ 参数）。

备注

虽然调用 [`peek()`](#lzma.LZMAFile.peek "lzma.LZMAFile.peek") 不会改变 [`LZMAFile`](#lzma.LZMAFile "lzma.LZMAFile") 的文件位置，但它可能改变下层文件对象的位置（举例来说如果 `LZMAFile` 是通过传入一个文件对象作为 _filename_ 的话）。

mode[¶](#lzma.LZMAFile.mode "Link to this definition")

`'rb'` 表示可读而 `'wb'` 表示可写。

Added in version 3.13.

name[¶](#lzma.LZMAFile.name "Link to this definition")

lzma 文件名。 等价于下层 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) 的 [`name`](https://docs.python.org/zh-cn/3/library/io.html#io.FileIO.name "io.FileIO.name") 属性。

Added in version 3.13.

在 3.4 版本发生变更: 增加了对 `"x"` 和 `"xb"` 模式的支持。

在 3.5 版本发生变更: [`read()`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase.read "io.BufferedIOBase.read") 方法现在接受 `None` 作为参数。

## 在内存中压缩和解压缩数据[¶](#compressing-and-decompressing-data-in-memory "Link to this heading")

_class_ lzma.LZMACompressor(_format\=FORMAT\_XZ_, _check\=\-1_, _preset\=None_, _filters\=None_)[¶](#lzma.LZMACompressor "Link to this definition")

创建一个压缩器对象，此对象可被用来执行增量压缩。

压缩单个数据块的更便捷方式请参阅 [`compress()`](#lzma.compress "lzma.compress")。

The _format_ argument specifies what container format should be used. Possible values are [`FORMAT_XZ`](#lzma.FORMAT_XZ "lzma.FORMAT_XZ") (the default), [`FORMAT_ALONE`](#lzma.FORMAT_ALONE "lzma.FORMAT_ALONE") and [`FORMAT_RAW`](#lzma.FORMAT_RAW "lzma.FORMAT_RAW").

The _check_ argument specifies the type of integrity check to include in the compressed data. This check is used when decompressing, to ensure that the data has not been corrupted. Possible values are [`CHECK_NONE`](#lzma.CHECK_NONE "lzma.CHECK_NONE"), [`CHECK_CRC32`](#lzma.CHECK_CRC32 "lzma.CHECK_CRC32"), [`CHECK_CRC64`](#lzma.CHECK_CRC64 "lzma.CHECK_CRC64") (the default for [`FORMAT_XZ`](#lzma.FORMAT_XZ "lzma.FORMAT_XZ")) and [`CHECK_SHA256`](#lzma.CHECK_SHA256 "lzma.CHECK_SHA256").

如果指定的检查不受支持，则会引发 [`LZMAError`](#lzma.LZMAError "lzma.LZMAError")。

压缩设置可被指定为一个预设的压缩等级（通过 _preset_ 参数）或以自定义过滤器链来详细设置（通过 _filters_ 参数）。

_preset_ 参数（如果提供）应当为一个 `0` 到 `9` (包括边界) 之间的整数，可以选择与常数 [`PRESET_EXTREME`](#lzma.PRESET_EXTREME "lzma.PRESET_EXTREME") 进行 OR 运算。 如果 _preset_ 和 _filters_ 均未给出，则默认行为是使用 [`PRESET_DEFAULT`](#lzma.PRESET_DEFAULT "lzma.PRESET_DEFAULT") (预设等级 `6`)。 更高的预设等级会产生更小的输出，但会使得压缩过程更缓慢。

备注

除了更加 CPU 密集，使用更高的预设等级来压缩还需要更多的内存（并产生需要更多内存来解压缩的输出）。 例如使用预设等级 `9` 时，一个 [`LZMACompressor`](#lzma.LZMACompressor "lzma.LZMACompressor") 对象的开销可以高达 800 MiB。 出于这样的原因，通常最好是保持使用默认预设等级。

_filters_ 参数（如果提供）应当指定一个过滤器链。 详情参见 [指定自定义的过滤器链](#filter-chain-specs)。

compress(_data_)[¶](#lzma.LZMACompressor.compress "Link to this definition")

压缩 _data_ (一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") object)，返回包含针对输入的至少一部分已压缩数据的 `bytes` 对象。 一部分 _data_ 可能会被放入内部缓冲区，以便用于后续的 [`compress()`](#lzma.compress "lzma.compress") 和 [`flush()`](#lzma.LZMACompressor.flush "lzma.LZMACompressor.flush") 调用。 返回的数据应当与之前任何 `compress()` 调用的输出进行拼接。

flush()[¶](#lzma.LZMACompressor.flush "Link to this definition")

结束压缩过程，返回包含保存在压缩器的内部缓冲区中的任意数据的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象。

调用此方法之后压缩器将不可再被使用。

_class_ lzma.LZMADecompressor(_format\=FORMAT\_AUTO_, _memlimit\=None_, _filters\=None_)[¶](#lzma.LZMADecompressor "Link to this definition")

创建一个解压缩器对象，此对象可被用来执行增量解压缩。

一次性解压缩整个压缩数据流的更便捷方式请参阅 [`decompress()`](#lzma.decompress "lzma.decompress")。

_format_ 参数指定应当被使用的容器格式。 默认值为 [`FORMAT_AUTO`](#lzma.FORMAT_AUTO "lzma.FORMAT_AUTO")，它可以解压缩 `.xz` 和 `.lzma` 文件。 其他可能的值为 [`FORMAT_XZ`](#lzma.FORMAT_XZ "lzma.FORMAT_XZ"), [`FORMAT_ALONE`](#lzma.FORMAT_ALONE "lzma.FORMAT_ALONE") 和 [`FORMAT_RAW`](#lzma.FORMAT_RAW "lzma.FORMAT_RAW")。

_memlimit_ 参数指定解压缩器可以使用的内存上限（字节数）。 当使用此参数时，如果不可能在给定内存上限之内解压缩输入数据则解压缩将失败并引发 [`LZMAError`](#lzma.LZMAError "lzma.LZMAError")。

_filters_ 参数指定用于创建被解压缩数据流的过滤器链。 此参数在 _format_ 为 [`FORMAT_RAW`](#lzma.FORMAT_RAW "lzma.FORMAT_RAW") 时要求提供，但对于其他格式不应使用。 有关过滤器链的更多信息请参阅 [指定自定义的过滤器链](#filter-chain-specs)。

备注

这个类不会透明地处理包含多个已压缩数据流的输入，这不同于 [`decompress()`](#lzma.decompress "lzma.decompress") 和 [`LZMAFile`](#lzma.LZMAFile "lzma.LZMAFile")。 要通过 [`LZMADecompressor`](#lzma.LZMADecompressor "lzma.LZMADecompressor") 来解压缩多个数据流输入，你必须为每个数据流都创建一个新的解压缩器。

decompress(_data_, _max\_length\=\-1_)[¶](#lzma.LZMADecompressor.decompress "Link to this definition")

解压缩 _data_ (一个 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object))，返回字节串形式的解压缩数据。 某些 _data_ 可以在内部被缓冲，以便用于后续的 [`decompress()`](#lzma.decompress "lzma.decompress") 调用。 返回的数据应当与之前任何 `decompress()` 调用的输出进行拼接。

如果 _max\_length_ 为非负数，将返回至多 _max\_length_ 个字节的解压缩数据。 如果达到此限制并且可以产生后续输出，则 [`needs_input`](#lzma.LZMADecompressor.needs_input "lzma.LZMADecompressor.needs_input") 属性将被设为 `False`。 在这种情况下，下一次 [`decompress()`](#lzma.LZMADecompressor.decompress "lzma.LZMADecompressor.decompress") 调用提供的 _data_ 可以为 `b''` 以获取更多的输出。

如果所有输入数据都已被解压缩并返回（或是因为它少于 _max\_length_ 个字节，或是因为 _max\_length_ 为负数），则 [`needs_input`](#lzma.LZMADecompressor.needs_input "lzma.LZMADecompressor.needs_input") 属性将被设为 `True`。

在到达数据流末尾之后再尝试解压缩数据会引发 [`EOFError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#EOFError "EOFError")。 在数据流末尾之后获取的任何数据都会被忽略并存储至 [`unused_data`](#lzma.LZMADecompressor.unused_data "lzma.LZMADecompressor.unused_data") 属性。

在 3.5 版本发生变更: 添加了 _max\_length_ 形参。

check[¶](#lzma.LZMADecompressor.check "Link to this definition")

输入流使用的一致性检查的 ID。 这可能为 [`CHECK_UNKNOWN`](#lzma.CHECK_UNKNOWN "lzma.CHECK_UNKNOWN") 直到已解压了足够的输入数据来确定它所使用的一致性检查。

eof[¶](#lzma.LZMADecompressor.eof "Link to this definition")

若达到了数据流的末尾标记则为 `True`。

unused\_data[¶](#lzma.LZMADecompressor.unused_data "Link to this definition")

在压缩数据流的末尾之后获取的数据。

在达到数据流末尾之前，这个值将为 `b""`。

needs\_input[¶](#lzma.LZMADecompressor.needs_input "Link to this definition")

如果在要求新的未解压缩输入之前 [`decompress()`](#lzma.LZMADecompressor.decompress "lzma.LZMADecompressor.decompress") 方法可以提供更多的解压缩数据则为 `False`。

Added in version 3.5.

lzma.compress(_data_, _format\=FORMAT\_XZ_, _check\=\-1_, _preset\=None_, _filters\=None_)[¶](#lzma.compress "Link to this definition")

压缩 _data_ (一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象)，返回包含压缩数据的 `bytes` 对象。

参见上文的 [`LZMACompressor`](#lzma.LZMACompressor "lzma.LZMACompressor") 了解有关 _format_, _check_, _preset_ 和 _filters_ 参数的说明。

lzma.decompress(_data_, _format\=FORMAT\_AUTO_, _memlimit\=None_, _filters\=None_)[¶](#lzma.decompress "Link to this definition")

解压缩 _data_ (一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象)，返回包含解压缩数据的 `bytes` 对象。

如果 _data_ 是多个单独压缩数据流的拼接，则解压缩所有相应数据流，并返回结果的拼接。

参见上文的 [`LZMADecompressor`](#lzma.LZMADecompressor "lzma.LZMADecompressor") 了解有关 _format_, _memlimit_ 和 _filters_ 参数的说明。

## 杂项[¶](#miscellaneous "Link to this heading")

lzma.is\_check\_supported(_check_)[¶](#lzma.is_check_supported "Link to this definition")

如果本系统支持给定的一致性检查则返回 `True`。

[`CHECK_NONE`](#lzma.CHECK_NONE "lzma.CHECK_NONE") 和 [`CHECK_CRC32`](#lzma.CHECK_CRC32 "lzma.CHECK_CRC32") 总是受支持。 [`CHECK_CRC64`](#lzma.CHECK_CRC64 "lzma.CHECK_CRC64") 和 [`CHECK_SHA256`](#lzma.CHECK_SHA256 "lzma.CHECK_SHA256") 或许不可用，如果你正在使用基于受限制特性集编译的 **liblzma** 版本的话。

## 指定自定义的过滤器链[¶](#specifying-custom-filter-chains "Link to this heading")

过滤器链描述符是由字典组成的序列，其中每个字典包含单个过滤器的 ID 和选项。 每个字典必须包含键 `"id"`，并可能包含额外的键用来指定基于过滤器的选项。 有效的过滤器 ID 如下：

-   压缩过滤器：
    
    -   [`FILTER_LZMA1`](#lzma.FILTER_LZMA1 "lzma.FILTER_LZMA1") (配合 [`FORMAT_ALONE`](#lzma.FORMAT_ALONE "lzma.FORMAT_ALONE") 使用)
        
    -   [`FILTER_LZMA2`](#lzma.FILTER_LZMA2 "lzma.FILTER_LZMA2") (配合 [`FORMAT_XZ`](#lzma.FORMAT_XZ "lzma.FORMAT_XZ") 和 [`FORMAT_RAW`](#lzma.FORMAT_RAW "lzma.FORMAT_RAW") 使用)
        
-   Delta 过滤器：
    
    -   [`FILTER_DELTA`](#lzma.FILTER_DELTA "lzma.FILTER_DELTA")
        
-   Branch-Call-Jump (BCJ) 过滤器：
    
    -   `FILTER_X86`
        
    -   `FILTER_IA64`
        
    -   `FILTER_ARM`
        
    -   `FILTER_ARMTHUMB`
        
    -   `FILTER_POWERPC`
        
    -   `FILTER_SPARC`
        

一个过滤器链最多可由 4 个过滤器组成，并且不能为空。 过滤器链中的最后一个过滤器必须为压缩过滤器，其他过滤器必须为 Delta 或 BCJ 过滤器。

压缩过滤器支持下列选项（指定为表示过滤器的字典中的附加条目）：

-   `preset`: 压缩预设选项，用于作为未显式指定的选项的默认值的来源。
    
-   `dict_size`: 以字节表示的字典大小。 这应当在 4 KiB 和 1.5 GiB 之间（包含边界）。
    
-   `lc`: 字面值上下文的比特数。
    
-   `lp`: 字面值位置的比特数。 总计值 `lc + lp` 必须不大于 4。
    
-   `pb`: 位置的比特数；必须不大于 4。
    
-   `mode`: [`MODE_FAST`](#lzma.MODE_FAST "lzma.MODE_FAST") 或 [`MODE_NORMAL`](#lzma.MODE_NORMAL "lzma.MODE_NORMAL")。
    
-   `nice_len`: 对于一个匹配应当被视为“适宜长度”的值。 这应当小于或等于 273。
    
-   `mf`: 要使用的匹配查找器 -- [`MF_HC3`](#lzma.MF_HC3 "lzma.MF_HC3"), [`MF_HC4`](#lzma.MF_HC4 "lzma.MF_HC4"), [`MF_BT2`](#lzma.MF_BT2 "lzma.MF_BT2"), [`MF_BT3`](#lzma.MF_BT3 "lzma.MF_BT3") 或 [`MF_BT4`](#lzma.MF_BT4 "lzma.MF_BT4")。
    
-   `depth`: 匹配查找器使用的最大查找深度。 0 (默认值) 表示基于其他过滤器选项自动选择。
    

Delta 过滤器保存字节数据之间的差值，在特定环境下可产生更具重复性的输入。 它支持一个 `dist` 选项，指明要相减的字节之间的距离。 默认值为 1，即取相邻字节之间的差值。

BCJ 过滤器主要作用于机器码。 它们会转换机器码内的相对分支、调用和跳转以使用绝对寻址，其目标是提升冗余度以供压缩器利用。 这些过滤器支持一个 `start_offset` 选项，指明应当被映射到输入数据开头的地址。 默认值为 0。

## 常量[¶](#constants "Link to this heading")

下列模块级常量被提供用作上述类和函数的 _format_, _check_, _preset_ 和 _filters_ 参数。

容器格式：

lzma.FORMAT\_XZ[¶](#lzma.FORMAT_XZ "Link to this definition")

`.xz` 容器格式。

lzma.FORMAT\_ALONE[¶](#lzma.FORMAT_ALONE "Link to this definition")

The legacy `.lzma` container format. This format is more limited than `.xz` -- it does not support integrity checks or multiple filters.

lzma.FORMAT\_RAW[¶](#lzma.FORMAT_RAW "Link to this definition")

A raw data stream, not using any container format. This format specifier does not support integrity checks, and requires that you always specify a custom filter chain (for both compression and decompression). Additionally, data compressed in this manner cannot be decompressed using [`FORMAT_AUTO`](#lzma.FORMAT_AUTO "lzma.FORMAT_AUTO").

lzma.FORMAT\_AUTO[¶](#lzma.FORMAT_AUTO "Link to this definition")

Used for decompression only. The container format is detected automatically, so that both `.xz` and `.lzma` files can be decompressed.

Integrity checks:

lzma.CHECK\_NONE[¶](#lzma.CHECK_NONE "Link to this definition")

No integrity check. This is the default (and the only acceptable value) for [`FORMAT_ALONE`](#lzma.FORMAT_ALONE "lzma.FORMAT_ALONE") and [`FORMAT_RAW`](#lzma.FORMAT_RAW "lzma.FORMAT_RAW").

lzma.CHECK\_CRC32[¶](#lzma.CHECK_CRC32 "Link to this definition")

A 32-bit Cyclic Redundancy Check.

lzma.CHECK\_CRC64[¶](#lzma.CHECK_CRC64 "Link to this definition")

A 64-bit Cyclic Redundancy Check. This is the default for [`FORMAT_XZ`](#lzma.FORMAT_XZ "lzma.FORMAT_XZ").

lzma.CHECK\_SHA256[¶](#lzma.CHECK_SHA256 "Link to this definition")

A 256-bit Secure Hash Algorithm.

lzma.CHECK\_UNKNOWN[¶](#lzma.CHECK_UNKNOWN "Link to this definition")

The integrity check used by a stream could not yet be determined. This may be the value of the [`LZMADecompressor.check`](#lzma.LZMADecompressor.check "lzma.LZMADecompressor.check") attribute until enough of the input has been decoded.

lzma.CHECK\_ID\_MAX[¶](#lzma.CHECK_ID_MAX "Link to this definition")

The largest supported integrity-check ID.

Compression presets:

lzma.PRESET\_DEFAULT[¶](#lzma.PRESET_DEFAULT "Link to this definition")

The default compression preset, equivalent to preset level `6`.

lzma.PRESET\_EXTREME[¶](#lzma.PRESET_EXTREME "Link to this definition")

A flag that may be bitwise OR-ed with a preset level (`0` to `9`) to select a slower but more thorough variant of that preset.

Filter IDs and options:

lzma.FILTER\_LZMA1[¶](#lzma.FILTER_LZMA1 "Link to this definition")

lzma.FILTER\_LZMA2[¶](#lzma.FILTER_LZMA2 "Link to this definition")

The LZMA1 and LZMA2 compression filters. [`FILTER_LZMA1`](#lzma.FILTER_LZMA1 "lzma.FILTER_LZMA1") is for use with [`FORMAT_ALONE`](#lzma.FORMAT_ALONE "lzma.FORMAT_ALONE"), while [`FILTER_LZMA2`](#lzma.FILTER_LZMA2 "lzma.FILTER_LZMA2") is for use with [`FORMAT_XZ`](#lzma.FORMAT_XZ "lzma.FORMAT_XZ") and [`FORMAT_RAW`](#lzma.FORMAT_RAW "lzma.FORMAT_RAW").

lzma.FILTER\_DELTA[¶](#lzma.FILTER_DELTA "Link to this definition")

The delta filter.

lzma.MODE\_FAST[¶](#lzma.MODE_FAST "Link to this definition")

lzma.MODE\_NORMAL[¶](#lzma.MODE_NORMAL "Link to this definition")

Compression modes that may be used as the `mode` option of a filter specifier (see [指定自定义的过滤器链](#filter-chain-specs)).

lzma.MF\_HC3[¶](#lzma.MF_HC3 "Link to this definition")

lzma.MF\_HC4[¶](#lzma.MF_HC4 "Link to this definition")

lzma.MF\_BT2[¶](#lzma.MF_BT2 "Link to this definition")

lzma.MF\_BT3[¶](#lzma.MF_BT3 "Link to this definition")

lzma.MF\_BT4[¶](#lzma.MF_BT4 "Link to this definition")

Match finders that may be used as the `mf` option of a filter specifier (see [指定自定义的过滤器链](#filter-chain-specs)).

## 例子[¶](#examples "Link to this heading")

读取压缩文件:

import lzma
with lzma.open("file.xz") as f:
    file\_content \= f.read()

创建一个压缩文件:

import lzma
data \= b"Insert Data Here"
with lzma.open("file.xz", "w") as f:
    f.write(data)

在内存中压缩数据:

import lzma
data\_in \= b"Insert Data Here"
data\_out \= lzma.compress(data\_in)

增量压缩:

import lzma
lzc \= lzma.LZMACompressor()
out1 \= lzc.compress(b"Some data\\n")
out2 \= lzc.compress(b"Another piece of data\\n")
out3 \= lzc.compress(b"Even more data\\n")
out4 \= lzc.flush()
\# 拼接所有的结果部分：
result \= b"".join(\[out1, out2, out3, out4\])

写入已压缩数据到已打开的文件:

import lzma
with open("file.xz", "wb") as f:
    f.write(b"This data will not be compressed\\n")
    with lzma.open(f, "w") as lzf:
        lzf.write(b"This \*will\* be compressed\\n")
    f.write(b"Not compressed\\n")

使用自定义过滤器链创建一个已压缩文件:

import lzma
my\_filters \= \[
    {"id": lzma.FILTER\_DELTA, "dist": 5},
    {"id": lzma.FILTER\_LZMA2, "preset": 7 | lzma.PRESET\_EXTREME},
\]
with lzma.open("file.xz", "w", filters\=my\_filters) as f:
    f.write(b"blah blah blah")
