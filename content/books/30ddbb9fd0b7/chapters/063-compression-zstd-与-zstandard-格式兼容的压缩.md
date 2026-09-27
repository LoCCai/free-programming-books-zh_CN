Added in version 3.14.

**源代码:** [Lib/compression/zstd/\_\_init\_\_.py](https://github.com/python/cpython/tree/3.14/Lib/compression/zstd/__init__.py)

* * *

本模块提供了有关使用 Zstandard (或称 _zstd_) 压缩算法压缩和解压缩数据的类和函数。 [zstd 指南](https://facebook.github.io/zstd/doc/api_manual_latest.html) 将 Zstandard 描述为“一种快速的无损压缩算法，针对在 zlib 层级和更高压缩率的实时压缩应用场景。” 本模块还包括了一个支持读写由 **zstd** 工具创建的 `.zst` 文件以及原始 zstd 压缩流内容的文件接口。

`compression.zstd` 模块包含：

-   [`open()`](#compression.zstd.open "compression.zstd.open") 函数和 [`ZstdFile`](#compression.zstd.ZstdFile "compression.zstd.ZstdFile") 类用于读写压缩文件。
    
-   用于增量（解）压缩的 [`ZstdCompressor`](#compression.zstd.ZstdCompressor "compression.zstd.ZstdCompressor") 和 [`ZstdDecompressor`](#compression.zstd.ZstdDecompressor "compression.zstd.ZstdDecompressor") 类。
    
-   用于一次性压缩和解压的 [`compress()`](#compression.zstd.compress "compression.zstd.compress") 和 [`decompress()`](#compression.zstd.decompress "compression.zstd.decompress") 函数。
    
-   [`train_dict()`](#compression.zstd.train_dict "compression.zstd.train_dict") 和 [`finalize_dict()`](#compression.zstd.finalize_dict "compression.zstd.finalize_dict") 函数以及 [`ZstdDict`](#compression.zstd.ZstdDict "compression.zstd.ZstdDict") 类用于训练和管理 Zstandard 字典。
    
-   [`CompressionParameter`](#compression.zstd.CompressionParameter "compression.zstd.CompressionParameter"), [`DecompressionParameter`](#compression.zstd.DecompressionParameter "compression.zstd.DecompressionParameter") 和 [`Strategy`](#compression.zstd.Strategy "compression.zstd.Strategy") 类用于设置高级的（解）压缩参数。
    

这是一个 [optional module](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module)。 如果它在你的 CPython 副本中缺失，请查看你的发行方（也就是说，向你提供 Python 的人）的文档。 如果你就是发行方，请参阅 [针对可选模块的要求](https://docs.python.org/zh-cn/3/using/configure.html#optional-module-requirements)。

## 异常[¶](#exceptions "Link to this heading")

_exception_ compression.zstd.ZstdError[¶](#compression.zstd.ZstdError "Link to this definition")

当在压缩或解压缩期间或是在初始化（解）压缩器状态期间发生错误时此异常会被引发。

## 读写压缩文件[¶](#reading-and-writing-compressed-files "Link to this heading")

compression.zstd.open(_file_, _/_, _mode\='rb'_, _\*_, _level\=None_, _options\=None_, _zstd\_dict\=None_, _encoding\=None_, _errors\=None_, _newline\=None_)[¶](#compression.zstd.open "Link to this definition")

以二进制或文本模式打开一个 Zstandard 压缩文件，返回一个 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)。

_file_ 参数可以是一个文件名（以 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str"), [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 或 [路径型](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object) 对象的形式给出），在此情况下会打开指定名称的文件，或者可以是一个用于读写的现有文件对象。

mode 参数可以是表示读取的 `'rb'` (默认值)，表示覆写的 `'wb'`，表示追加的 `'ab'`，或者表示独占创建的 `'xb'`。 这些模式还可分别以 `'r'`, `'w'`, `'a'` 和 `'x'` 的等价形式给出。 你还可以分别使用 `'rt'`, `'wt'`, `'at'` 和 `'xt'` 以文本模式打开。

在读取时，_options_ 参数可以是一个提供高级解压缩参数的字典；请参阅 [`DecompressionParameter`](#compression.zstd.DecompressionParameter "compression.zstd.DecompressionParameter") 获取有关受支持参数的详情。 _zstd\_dict_ 参数是一个将在解压缩期间使用的 [`ZstdDict`](#compression.zstd.ZstdDict "compression.zstd.ZstdDict") 实例。 在读取时，如果 _level_ 参数不为 None，则会引发 `TypeError`。

在写入时，_options_ 参数可以是一个提供高级压缩参数的字典；请参阅 [`CompressionParameter`](#compression.zstd.CompressionParameter "compression.zstd.CompressionParameter") 获取有关受支持参数的详情。 _level_ 参数是一个将在写入压缩数据时使用的压缩级别。 _level_ 或 _options_ 只能有一个不为 None。 _zstd\_dict_ 参数是一个将在压缩期间使用的 [`ZstdDict`](#compression.zstd.ZstdDict "compression.zstd.ZstdDict") 实例。

在二进制模式下，此函数等同于 [`ZstdFile`](#compression.zstd.ZstdFile "compression.zstd.ZstdFile") 构造器: `ZstdFile(file, mode, ...)`。在这种情况下，不得提供 _encoding_、_errors_ 和 _newline_ 参数。

在文本模式下，创建一个 [`ZstdFile`](#compression.zstd.ZstdFile "compression.zstd.ZstdFile") 对象，并将其包装在一个 [`io.TextIOWrapper`](https://docs.python.org/zh-cn/3/library/io.html#io.TextIOWrapper "io.TextIOWrapper") 实例中，该实例具有指定的编码、错误处理行为和行结束符。

_class_ compression.zstd.ZstdFile(_file_, _/_, _mode\='rb'_, _\*_, _level\=None_, _options\=None_, _zstd\_dict\=None_)[¶](#compression.zstd.ZstdFile "Link to this definition")

以二进制模式打开一个 Zstandard 压缩文件。

一个 [`ZstdFile`](#compression.zstd.ZstdFile "compression.zstd.ZstdFile") 可以包装一个已经打开的 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)，或者直接操作一个命名文件。_file_ 参数指定要包装的文件对象，或者要打开的文件名（作为 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")、[`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 或 [路径类](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object) 对象）。如果包装现有的文件对象，当 `ZstdFile` 关闭时，包装的文件不会被关闭。

_mode_ 参数可以是 `'rb'` 用于读取（默认），`'wb'` 用于覆盖，`'xb'` 用于独占创建，或者 `'ab'` 用于追加。上述模式也可简写为对应的单字符形式: `'r'`、`'w'`、`'x'` 和 `'a'` （功能等价）。

如果 _file_ 是文件对象（而不是实际的文件名），`'w'` 模式不会截断文件，而是等同于 `'a'`。

在读取时，_options_ 参数可以是一个提供高级解压缩参数的字典；请参阅 [`DecompressionParameter`](#compression.zstd.DecompressionParameter "compression.zstd.DecompressionParameter") 获取有关受支持参数的详情。 _zstd\_dict_ 参数是一个将在解压缩期间使用的 [`ZstdDict`](#compression.zstd.ZstdDict "compression.zstd.ZstdDict") 实例。 在读取时，如果 _level_ 参数不为 None，则会引发 `TypeError`。

在写入时，_options_ 参数可以是一个提供高级压缩参数的字典；请参阅 [`CompressionParameter`](#compression.zstd.CompressionParameter "compression.zstd.CompressionParameter") 获取有关受支持参数的详情。 _level_ 参数是写入压缩数据时要使用的压缩级别。 只能传入 _level_ 或 _options_ 中的一个。 _zstd\_dict_ 参数是一个将在压缩期间使用的 [`ZstdDict`](#compression.zstd.ZstdDict "compression.zstd.ZstdDict") 实例。

`ZstdFile` 支持由 [`io.BufferedIOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase "io.BufferedIOBase") 指定的所有成员，除了 [`detach()`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase.detach "io.BufferedIOBase.detach") 和 [`truncate()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.truncate "io.IOBase.truncate")。支持迭代和 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句。

还提供了下列方法和属性：

peek(_size\=\-1_)[¶](#compression.zstd.ZstdFile.peek "Link to this definition")

返回缓冲的数据而不前移文件位置。 至少将返回一个字节的数据，除非已经到达 EOF。 实际返回的字节数不确定（会忽略 _size_ 参数）。

备注

调用 [`peek()`](#compression.zstd.ZstdFile.peek "compression.zstd.ZstdFile.peek") 不会改变 [`ZstdFile`](#compression.zstd.ZstdFile "compression.zstd.ZstdFile") 的文件位置，但它可能会改变底层文件对象的位置（例如，如果 `ZstdFile` 是通过传递一个文件对象作为 _file_ 参数来构造的）。

mode[¶](#compression.zstd.ZstdFile.mode "Link to this definition")

`'rb'` 用于读取而 `'wb'` 用于写入。

name[¶](#compression.zstd.ZstdFile.name "Link to this definition")

Zstandard 文件的名称。等同于底层 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) 的 [`name`](https://docs.python.org/zh-cn/3/library/io.html#io.FileIO.name "io.FileIO.name") 属性。

## 在内存中压缩和解压缩数据[¶](#compressing-and-decompressing-data-in-memory "Link to this heading")

compression.zstd.compress(_data_, _level\=None_, _options\=None_, _zstd\_dict\=None_)[¶](#compression.zstd.compress "Link to this definition")

压缩 _data_ (一个 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object))，返回压缩后的数据作为一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象。

_level_ 参数是一个控制压缩级别的整数。_level_ 是设置 _options_ 中 [`CompressionParameter.compression_level`](#compression.zstd.CompressionParameter.compression_level "compression.zstd.CompressionParameter.compression_level") 的替代方案。使用 `compression_level` 上的 [`bounds()`](#compression.zstd.CompressionParameter.bounds "compression.zstd.CompressionParameter.bounds") 方法获取可以传递给 _level_ 的值。如果需要高级压缩选项，必须省略 _level_ 参数，并在 _options_ 字典中设置 `CompressionParameter.compression_level` 参数。

_options_ 参数是一个包含高级压缩参数的 Python 字典。压缩参数的有效键和值在 [`CompressionParameter`](#compression.zstd.CompressionParameter "compression.zstd.CompressionParameter") 文档中有说明。

_zstd\_dict_ 参数是一个 [`ZstdDict`](#compression.zstd.ZstdDict "compression.zstd.ZstdDict") 实例，包含训练数据以提升压缩效率。可以使用 [`train_dict()`](#compression.zstd.train_dict "compression.zstd.train_dict") 函数生成一个 Zstandard 字典。

compression.zstd.decompress(_data_, _zstd\_dict\=None_, _options\=None_)[¶](#compression.zstd.decompress "Link to this definition")

解压缩 _data_ (一个 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object))，返回解压缩后的数据作为一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象。

_options_ 参数是一个包含高级解压缩参数的 Python 字典。解压缩参数的有效键和值在 [`DecompressionParameter`](#compression.zstd.DecompressionParameter "compression.zstd.DecompressionParameter") 文档中有说明。

_zstd\_dict_ 参数是一个 [`ZstdDict`](#compression.zstd.ZstdDict "compression.zstd.ZstdDict") 实例，包含在压缩过程中使用的训练数据。这必须是与压缩时使用的相同的 Zstandard 字典。

如果 _data_ 参数是由多个独立压缩帧拼接而成的数据，则会解压所有这些帧，并返回解压结果的拼接串。

_class_ compression.zstd.ZstdCompressor(_level\=None_, _options\=None_, _zstd\_dict\=None_)[¶](#compression.zstd.ZstdCompressor "Link to this definition")

创建一个压缩器对象，此对象可被用来执行增量压缩。

有关压缩单个数据块的更便捷方法，请参阅模块级函数 [`compress()`](#compression.zstd.compress "compression.zstd.compress")。

_level_ 参数是一个控制压缩级别的整数。_level_ 是设置 _options_ 中 [`CompressionParameter.compression_level`](#compression.zstd.CompressionParameter.compression_level "compression.zstd.CompressionParameter.compression_level") 的替代方案。使用 `compression_level` 上的 [`bounds()`](#compression.zstd.CompressionParameter.bounds "compression.zstd.CompressionParameter.bounds") 方法获取可以传递给 _level_ 的值。如果需要高级压缩选项，必须省略 _level_ 参数，并在 _options_ 字典中设置 `CompressionParameter.compression_level` 参数。

_options_ 参数是一个包含高级压缩参数的 Python 字典。压缩参数的有效键和值在 [`CompressionParameter`](#compression.zstd.CompressionParameter "compression.zstd.CompressionParameter") 文档中有说明。

_zstd\_dict_ 参数是可选的 [`ZstdDict`](#compression.zstd.ZstdDict "compression.zstd.ZstdDict") 实例，包含训练数据以改进压缩效率。可以使用函数 [`train_dict()`](#compression.zstd.train_dict "compression.zstd.train_dict") 生成 Zstandard 字典。

compress(_data_, _mode\=ZstdCompressor.CONTINUE_)[¶](#compression.zstd.ZstdCompressor.compress "Link to this definition")

压缩 _data_ (一个 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object))，如果可能，返回包含压缩数据的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象，否则返回一个空的 `bytes` 对象。_data_ 的一部分可能会在内部缓冲，用于后续调用 `compress()` 和 [`flush()`](#compression.zstd.ZstdCompressor.flush "compression.zstd.ZstdCompressor.flush")。返回的数据应与之前任何对 [`compress()`](#compression.zstd.ZstdCompressor.compress "compression.zstd.ZstdCompressor.compress") 的调用的输出连接起来。

_mode_ 参数是 [`ZstdCompressor`](#compression.zstd.ZstdCompressor "compression.zstd.ZstdCompressor") 属性，可以是 [`CONTINUE`](#compression.zstd.ZstdCompressor.CONTINUE "compression.zstd.ZstdCompressor.CONTINUE")、[`FLUSH_BLOCK`](#compression.zstd.ZstdCompressor.FLUSH_BLOCK "compression.zstd.ZstdCompressor.FLUSH_BLOCK") 或 [`FLUSH_FRAME`](#compression.zstd.ZstdCompressor.FLUSH_FRAME "compression.zstd.ZstdCompressor.FLUSH_FRAME")。

当所有数据都已提供给压缩器时，调用 [`flush()`](#compression.zstd.ZstdCompressor.flush "compression.zstd.ZstdCompressor.flush") 方法以完成压缩过程。如果 [`compress()`](#compression.zstd.ZstdCompressor.compress "compression.zstd.ZstdCompressor.compress") 被调用且 _mode_ 设置为 [`FLUSH_FRAME`](#compression.zstd.ZstdCompressor.FLUSH_FRAME "compression.zstd.ZstdCompressor.FLUSH_FRAME")，则不应调用 `flush()`，因为它会写入一个新的空帧。

flush(_mode\=ZstdCompressor.FLUSH\_FRAME_)[¶](#compression.zstd.ZstdCompressor.flush "Link to this definition")

结束压缩过程，返回包含压缩器内部缓冲区中剩余数据的 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象。

_mode_ 参数是 [`ZstdCompressor`](#compression.zstd.ZstdCompressor "compression.zstd.ZstdCompressor") 属性，可以是 [`FLUSH_BLOCK`](#compression.zstd.ZstdCompressor.FLUSH_BLOCK "compression.zstd.ZstdCompressor.FLUSH_BLOCK") 或 [`FLUSH_FRAME`](#compression.zstd.ZstdCompressor.FLUSH_FRAME "compression.zstd.ZstdCompressor.FLUSH_FRAME")。

set\_pledged\_input\_size(_size_)[¶](#compression.zstd.ZstdCompressor.set_pledged_input_size "Link to this definition")

指定将为下一个帧提供的未压缩数据 _size_。除非 [`CompressionParameter.content_size_flag`](#compression.zstd.CompressionParameter.content_size_flag "compression.zstd.CompressionParameter.content_size_flag") 为 `False` 或 `0`，否则 _size_ 将写入下一个帧的帧头。大小为 `0` 表示帧为空。如果 _size_ 为 `None`，帧头将省略帧大小。包含未压缩数据大小的帧在解压缩时需要更少的内存，尤其是在更高的压缩级别下。

如果 [`last_mode`](#compression.zstd.ZstdCompressor.last_mode "compression.zstd.ZstdCompressor.last_mode") 不是 [`FLUSH_FRAME`](#compression.zstd.ZstdCompressor.FLUSH_FRAME "compression.zstd.ZstdCompressor.FLUSH_FRAME")，则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")，因为压缩器未处于帧的开始位置。如果承诺的大小与提供给 [`compress()`](#compression.zstd.ZstdCompressor.compress "compression.zstd.ZstdCompressor.compress") 的实际数据大小不匹配，未来的对 `compress()` 或 [`flush()`](#compression.zstd.ZstdCompressor.flush "compression.zstd.ZstdCompressor.flush") 的调用可能会引发 [`ZstdError`](#compression.zstd.ZstdError "compression.zstd.ZstdError")，并且最后一个数据块可能会丢失。

在以 [`FLUSH_FRAME`](#compression.zstd.ZstdCompressor.FLUSH_FRAME "compression.zstd.ZstdCompressor.FLUSH_FRAME") 模式调用 [`flush()`](#compression.zstd.ZstdCompressor.flush "compression.zstd.ZstdCompressor.flush") 或 [`compress()`](#compression.zstd.ZstdCompressor.compress "compression.zstd.ZstdCompressor.compress") 后，除非再次调用 `set_pledged_input_size()`，否则下一个帧的头部将不包括帧大小。

CONTINUE[¶](#compression.zstd.ZstdCompressor.CONTINUE "Link to this definition")

收集更多数据进行压缩，这可能立即生成输出，也可能不立即生成。此模式通过最大化每个块和帧的数据量来优化压缩率。

FLUSH\_BLOCK[¶](#compression.zstd.ZstdCompressor.FLUSH_BLOCK "Link to this definition")

完成并写入一个块到数据流。至此返回的数据可以立即解压缩。过去的数据仍然可以在通过调用 [`compress()`](#compression.zstd.ZstdCompressor.compress "compression.zstd.ZstdCompressor.compress") 生成的未来块中被引用，从而提高压缩效果。

FLUSH\_FRAME[¶](#compression.zstd.ZstdCompressor.FLUSH_FRAME "Link to this definition")

完成并写出帧。提供给 [`compress()`](#compression.zstd.ZstdCompressor.compress "compression.zstd.ZstdCompressor.compress") 的未来数据将被写入新帧，并且 _不能_ 引用过去的数据。

last\_mode[¶](#compression.zstd.ZstdCompressor.last_mode "Link to this definition")

最后一个传递给 [`compress()`](#compression.zstd.ZstdCompressor.compress "compression.zstd.ZstdCompressor.compress") 或 [`flush()`](#compression.zstd.ZstdCompressor.flush "compression.zstd.ZstdCompressor.flush") 的模式。值可以是 [`CONTINUE`](#compression.zstd.ZstdCompressor.CONTINUE "compression.zstd.ZstdCompressor.CONTINUE")、[`FLUSH_BLOCK`](#compression.zstd.ZstdCompressor.FLUSH_BLOCK "compression.zstd.ZstdCompressor.FLUSH_BLOCK") 或 [`FLUSH_FRAME`](#compression.zstd.ZstdCompressor.FLUSH_FRAME "compression.zstd.ZstdCompressor.FLUSH_FRAME")。初始值为 `FLUSH_FRAME`，表示压缩器处于新帧的开始位置。

_class_ compression.zstd.ZstdDecompressor(_zstd\_dict\=None_, _options\=None_)[¶](#compression.zstd.ZstdDecompressor "Link to this definition")

创建一个解压缩器对象，此对象可被用来执行增量解压缩。

要一次性解压缩整个压缩流，请参阅模块级函数 [`decompress()`](#compression.zstd.decompress "compression.zstd.decompress")。

_options_ 参数是一个包含高级解压缩参数的 Python 字典。解压缩参数的有效键和值在 [`DecompressionParameter`](#compression.zstd.DecompressionParameter "compression.zstd.DecompressionParameter") 文档中有说明。

_zstd\_dict_ 参数是一个 [`ZstdDict`](#compression.zstd.ZstdDict "compression.zstd.ZstdDict") 实例，包含在压缩过程中使用的训练数据。这必须是与压缩时使用的相同的 Zstandard 字典。

备注

此类不会透明地处理包含多个压缩帧的输入，与 [`decompress()`](#compression.zstd.decompress "compression.zstd.decompress") 函数和 [`ZstdFile`](#compression.zstd.ZstdFile "compression.zstd.ZstdFile") 类不同。要解压缩多帧输入，您应使用 `decompress()`，如果处理的是 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)，则使用 `ZstdFile` 类，或者使用多个 `ZstdDecompressor` 实例分别处理。

decompress(_data_, _max\_length\=\-1_)[¶](#compression.zstd.ZstdDecompressor.decompress "Link to this definition")

解压缩 _data_ (一个 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object))，返回未压缩的数据作为字节。部分 _data_ 可能会在内部缓冲，以便在后续调用 `decompress()` 时使用。返回的数据应与之前调用 `decompress()` 的输出连接起来。

如果 _max\_length_ 参数为非负值，该方法最多返回 _max\_length_ 字节的解压数据。当达到此限制但仍有可输出数据时，[`needs_input`](#compression.zstd.ZstdDecompressor.needs_input "compression.zstd.ZstdDecompressor.needs_input") 属性将被设为 `False`。此时，下次调用 [`decompress()`](#compression.zstd.ZstdDecompressor.decompress "compression.zstd.ZstdDecompressor.decompress") 方法时可传入 _data_ 为 `b''` 以获取更多输出数据。

如果所有输入数据都已被解压缩并返回（或是因为它少于 _max\_length_ 个字节，或是因为 _max\_length_ 为负数），则 [`needs_input`](#compression.zstd.ZstdDecompressor.needs_input "compression.zstd.ZstdDecompressor.needs_input") 属性将被设为 `True`。

Attempting to decompress data after the end of a frame will raise a [`EOFError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#EOFError "EOFError"). Any data found after the end of the frame is ignored and saved in the [`unused_data`](#compression.zstd.ZstdDecompressor.unused_data "compression.zstd.ZstdDecompressor.unused_data") attribute.

eof[¶](#compression.zstd.ZstdDecompressor.eof "Link to this definition")

若达到了数据流的末尾标记则为 `True`。

unused\_data[¶](#compression.zstd.ZstdDecompressor.unused_data "Link to this definition")

在压缩数据流的末尾之后获取的数据。

在达到流的末尾之前，这将始终为 `b''`。

needs\_input[¶](#compression.zstd.ZstdDecompressor.needs_input "Link to this definition")

如果 [`decompress()`](#compression.zstd.ZstdDecompressor.decompress "compression.zstd.ZstdDecompressor.decompress") 方法在需要新的压缩输入之前可以提供更多解压缩数据，则为 `False`。

## Zstandard 字典[¶](#zstandard-dictionaries "Link to this heading")

compression.zstd.train\_dict(_samples_, _dict\_size_)[¶](#compression.zstd.train_dict "Link to this definition")

训练一个 Zstandard 字典，返回一个 [`ZstdDict`](#compression.zstd.ZstdDict "compression.zstd.ZstdDict") 实例。Zstandard 字典能够更有效地压缩较小规模的数据，这些数据由于重复较少而传统上难以压缩。如果您正在压缩多个相似的数据组（例如相似文件），Zstandard 字典可以显著提高压缩率和速度。

参数 _samples_ （一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象的可迭代对象）是用于训练 Zstandard 字典的样本集。

参数 _dict\_size_，一个整数，是 Zstandard 字典应达到的最大大小（以字节为单位）。Zstandard 文档建议绝对最大值不超过 100 KB，但最大值通常取决于数据，可能会更小。较大的字典通常会减慢压缩速度，但提高压缩率。较小的字典导致更快的压缩，但降低压缩率。

compression.zstd.finalize\_dict(_zstd\_dict_, _/_, _samples_, _dict\_size_, _level_)[¶](#compression.zstd.finalize_dict "Link to this definition")

一个高级函数，用于将"原始内容" Zstandard 字典转换为常规 Zstandard 字典。"原始内容"字典是一系列字节，不需要遵循正常 Zstandard 字典的结构。

_zstd\_dict_ 参数是一个 [`ZstdDict`](#compression.zstd.ZstdDict "compression.zstd.ZstdDict") 实例，其 [`dict_content`](#compression.zstd.ZstdDict.dict_content "compression.zstd.ZstdDict.dict_content") 包含原始字典内容。

_samples_ 参数（一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象的可迭代集合），包含用于生成Zstandard字典的样本数据。

_dict\_size_ 参数，一个整数，是Zstandard字典应达到的最大大小（以字节为单位）。参见 [`train_dict()`](#compression.zstd.train_dict "compression.zstd.train_dict") 以获取关于最大字典大小的建议。

_level_ 参数（一个整数）是预期传递给使用此字典的压缩器的压缩级别。每个压缩级别的字典信息不同，因此针对适当的压缩级别进行调整可以使压缩更高效。

_class_ compression.zstd.ZstdDict(_dict\_content_, _/_, _\*_, _is\_raw\=False_)[¶](#compression.zstd.ZstdDict "Link to this definition")

Zstandard字典的包装器。字典可用于提高许多小数据块的压缩效果。如果需要从样本数据训练新字典，请使用 [`train_dict()`](#compression.zstd.train_dict "compression.zstd.train_dict")。

_dict\_content_ 参数 (一个 [bytes-like object](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object))，是已经训练好的字典信息。

_is\_raw_ 参数，一个布尔值，是一个高级参数，控制 _dict\_content_ 的含义。`True` 表示 _dict\_content_ 是一个“原始内容”字典，没有任何格式限制。`False` 表示 _dict\_content_ 是一个普通的Zstandard字典，由Zstandard函数例如 [`train_dict()`](#compression.zstd.train_dict "compression.zstd.train_dict") ，或外部 **zstd** CLI创建。

当将一个 `ZstdDict` 传递给函数时，可以通过传递 `as_digested_dict` 和 `as_undigested_dict` 属性作为 `zstd_dict` 参数来控制字典的加载方式，例如，`compress(data, zstd_dict=zd.as_digested_dict)`。 消化字典是一个成本较高的操作，它在加载Zstandard字典时发生。 在进行多次压缩或解压缩调用时，传递已消化的字典将减少加载字典的开销。

> 压缩差异[¶](#id1 "Link to this table")   
> |  | 
> 已消化字典
> 
>  | 
> 
> 未消化字典
> 
>  |
> | --- | --- | --- |
> | 
> 
> 压缩器的高级参数，可能会被字典的参数覆盖
> 
>  | 
> 
> `window_log`, `hash_log`, `chain_log`, `search_log`, `min_match`, `target_length`, `strategy`, `enable_long_distance_matching`, `ldm_hash_log`, `ldm_min_match`, `ldm_bucket_size_log`, `ldm_hash_rate_log`，以及一些非公开参数。
> 
>  | 
> 
> None
> 
>  |
> | 
> 
> `ZstdDict` 类会在内部缓存字典数据。
> 
>  | 
> 
> 是的。在再次加载相同压缩级别的已消化字典时，速度更快。
> 
>  | 
> 
> 否。如果希望多次加载未消化字典，考虑重用压缩器对象。
> 
>  |

如果传递一个不带任何属性的 `ZstdDict`，则在压缩时默认传递未消化字典，在解压缩时如果需要会生成并默认传递已消化字典。

> dict\_content[¶](#compression.zstd.ZstdDict.dict_content "Link to this definition")
> 
> Zstandard字典的内容，一个 `bytes` 对象。它与 `__init__` 方法中的 _dict\_content_ 参数相同。它可以与其他程序一起使用，例如 `zstd` CLI程序。
> 
> dict\_id[¶](#compression.zstd.ZstdDict.dict_id "Link to this definition")
> 
> Zstandard字典的标识符，一个非负整数值。
> 
> 非零表示字典是普通的，由Zstandard函数创建并遵循Zstandard格式。
> 
> `0` 表示一个“原始内容”字典，没有任何格式限制，供高级用户使用。
> 
> 备注
> 
> 对于 `ZstdDict.dict_id`，`0` 的含义与 [`get_frame_info()`](#compression.zstd.get_frame_info "compression.zstd.get_frame_info") 函数的 `dictionary_id` 属性不同。
> 
> as\_digested\_dict[¶](#compression.zstd.ZstdDict.as_digested_dict "Link to this definition")
> 
> 作为已消化的字典加载。
> 
> as\_undigested\_dict[¶](#compression.zstd.ZstdDict.as_undigested_dict "Link to this definition")
> 
> 作为未消化的字典加载。

## 高级参数控制[¶](#advanced-parameter-control "Link to this heading")

_class_ compression.zstd.CompressionParameter[¶](#compression.zstd.CompressionParameter "Link to this definition")

一个 [`IntEnum`](https://docs.python.org/zh-cn/3/library/enum.html#enum.IntEnum "enum.IntEnum")，包含在压缩数据时可以使用的高级压缩参数键。

可以使用 [`bounds()`](#compression.zstd.CompressionParameter.bounds "compression.zstd.CompressionParameter.bounds") 方法在任何属性上获取该参数的有效值。

Parameters are optional; any omitted parameter will have its value selected automatically.

获取 [`compression_level`](#compression.zstd.CompressionParameter.compression_level "compression.zstd.CompressionParameter.compression_level") 的下界和上界的示例:

lower, upper \= CompressionParameter.compression\_level.bounds()

将 [`window_log`](#compression.zstd.CompressionParameter.window_log "compression.zstd.CompressionParameter.window_log") 设置为最大值的示例:

\_lower, upper \= CompressionParameter.window\_log.bounds()
options \= {CompressionParameter.window\_log: upper}
compress(b'venezuelan beaver cheese', options\=options)

bounds()[¶](#compression.zstd.CompressionParameter.bounds "Link to this definition")

返回压缩参数的整型边界元组 `(lower, upper)`。此方法应调用在你希望获取边界的属性上。例如，要获取 [`compression_level`](#compression.zstd.CompressionParameter.compression_level "compression.zstd.CompressionParameter.compression_level") 的有效值，可以检查 `CompressionParameter.compression_level.bounds()` 的结果。

下界和上界都是包含在内的。

compression\_level[¶](#compression.zstd.CompressionParameter.compression_level "Link to this definition")

一种高级方法，用于设置其他影响数据压缩速度和比例的压缩参数。

常规压缩等级需大于 `0`。当等级值超过 `20` 时，将被视为"极致"压缩级别，该级别需要比其他等级消耗更多内存。负数值可用于以牺牲压缩率为代价换取更快的压缩速度。

将级别设置为零使用 [`COMPRESSION_LEVEL_DEFAULT`](#compression.zstd.COMPRESSION_LEVEL_DEFAULT "compression.zstd.COMPRESSION_LEVEL_DEFAULT")。

window\_log[¶](#compression.zstd.CompressionParameter.window_log "Link to this definition")

压缩器在压缩数据时可以使用的最大允许后向引用距离，表示为二的幂，`1 << window_log` 字节。此参数极大地影响压缩的内存使用。更高的值需要更多内存，但可以获得更好的压缩值。

值为零会导致自动选择该值。

hash\_log[¶](#compression.zstd.CompressionParameter.hash_log "Link to this definition")

初始探测表的大小为2的幂次方。实际内存占用为 `1 << (hash_log+2)` 字节。较大的探测表能提升 <= [`dfast`](#compression.zstd.Strategy.dfast "compression.zstd.Strategy.dfast") 策略的压缩率，并加快 > `dfast` 策略的压缩速度。

值为零会导致自动选择该值。

chain\_log[¶](#compression.zstd.CompressionParameter.chain_log "Link to this definition")

多探测搜索表的大小，以2的幂表示。由此产生的内存使用量为 `1 << (chain_log+2)` 字节。较大的表会导致更好的但更慢的压缩。此参数对 [`fast`](#compression.zstd.Strategy.fast "compression.zstd.Strategy.fast") 策略无效。在使用 [`dfast`](#compression.zstd.Strategy.dfast "compression.zstd.Strategy.dfast") 策略时仍然有用，在这种情况下，它定义了一个二级探测表。

值为零会导致自动选择该值。

search\_log[¶](#compression.zstd.CompressionParameter.search_log "Link to this definition")

搜索尝试的次数，以2的幂表示。更多的尝试会导致更好的但更慢的压缩。此参数对 [`fast`](#compression.zstd.Strategy.fast "compression.zstd.Strategy.fast") 和 [`dfast`](#compression.zstd.Strategy.dfast "compression.zstd.Strategy.dfast") 策略无用。

值为零会导致自动选择该值。

min\_match[¶](#compression.zstd.CompressionParameter.min_match "Link to this definition")

搜索匹配的最小大小。较大的值会增加压缩和解压速度，但会降低压缩率。请注意，Zstandard 仍然可以找到较小大小的匹配，它只是调整其搜索算法以查找此大小及更大的匹配。对于所有策略 < [`btopt`](#compression.zstd.Strategy.btopt "compression.zstd.Strategy.btopt")，有效最小值为 `4`；对于所有策略 > [`fast`](#compression.zstd.Strategy.fast "compression.zstd.Strategy.fast")，有效最大值为 `6`。

值为零会导致自动选择该值。

target\_length[¶](#compression.zstd.CompressionParameter.target_length "Link to this definition")

此字段的影响取决于所选的 [`Strategy`](#compression.zstd.Strategy "compression.zstd.Strategy")。

对于策略 [`btopt`](#compression.zstd.Strategy.btopt "compression.zstd.Strategy.btopt")、[`btultra`](#compression.zstd.Strategy.btultra "compression.zstd.Strategy.btultra") 和 [`btultra2`](#compression.zstd.Strategy.btultra2 "compression.zstd.Strategy.btultra2")，该值被视为“足够好”的匹配长度以停止搜索。较大的值会提高压缩率，但压缩速度较慢。

对于策略 [`fast`](#compression.zstd.Strategy.fast "compression.zstd.Strategy.fast")，它是匹配采样的间隔距离。较大的值会使压缩更快，但压缩率较差。

值为零会导致自动选择该值。

strategy[¶](#compression.zstd.CompressionParameter.strategy "Link to this definition")

所选策略的值越高，zstd 使用的压缩技术越复杂，导致压缩率更高但压缩速度更慢。

enable\_long\_distance\_matching[¶](#compression.zstd.CompressionParameter.enable_long_distance_matching "Link to this definition")

长距离匹配可以通过在更远距离找到大匹配来提高大输入的压缩效果。这会增加内存使用和窗口大小。

`True` 或 `1` 启用长距离匹配，而 `False` 或 `0` 禁用长距离匹配。

启用此参数会将默认的 [`window_log`](#compression.zstd.CompressionParameter.window_log "compression.zstd.CompressionParameter.window_log") 增加到 128 MiB，除非明确设置为其他值。如果 `window_log` >= 128 MiB 且压缩策略 >= [`btopt`](#compression.zstd.Strategy.btopt "compression.zstd.Strategy.btopt") (压缩级别 16+)，此设置默认启用。

ldm\_hash\_log[¶](#compression.zstd.CompressionParameter.ldm_hash_log "Link to this definition")

长距离匹配表的尺寸，以二的幂表示。较大的值会增加内存使用和压缩率，但会降低压缩速度。

值为零会导致自动选择该值。

ldm\_min\_match[¶](#compression.zstd.CompressionParameter.ldm_min_match "Link to this definition")

长距离匹配器的最小匹配大小。过大或过小的值通常会降低压缩率。

值为零会导致自动选择该值。

ldm\_bucket\_size\_log[¶](#compression.zstd.CompressionParameter.ldm_bucket_size_log "Link to this definition")

长距离匹配器哈希表中每个桶大小的对数值，用于冲突解决。较大的值会改善冲突解决，但会降低压缩速度。

值为零会导致自动选择该值。

ldm\_hash\_rate\_log[¶](#compression.zstd.CompressionParameter.ldm_hash_rate_log "Link to this definition")

向长距离匹配器哈希表插入/查找条目的频率。较大的值会提高压缩速度。偏离默认值过远可能会降低压缩率。

值为零会导致自动选择该值。

content\_size\_flag[¶](#compression.zstd.CompressionParameter.content_size_flag "Link to this definition")

若在压缩前已知待压缩数据的大小，则将该数据大小写入Zstandard帧头。

此标志仅在以下情况下生效：

-   调用 [`compress()`](#compression.zstd.compress "compression.zstd.compress") 进行一次性压缩
    
-   在单次 [`ZstdCompressor.compress()`](#compression.zstd.ZstdCompressor.compress "compression.zstd.ZstdCompressor.compress") 调用中提供所有待压缩数据，并使用 [`ZstdCompressor.FLUSH_FRAME`](#compression.zstd.ZstdCompressor.FLUSH_FRAME "compression.zstd.ZstdCompressor.FLUSH_FRAME") 模式。
    
-   在调用 [`ZstdCompressor.compress()`](#compression.zstd.ZstdCompressor.compress "compression.zstd.ZstdCompressor.compress") 压缩当前帧的任何数据之前，使用 [`ZstdCompressor.set_pledged_input_size()`](#compression.zstd.ZstdCompressor.set_pledged_input_size "compression.zstd.ZstdCompressor.set_pledged_input_size") 设置将提供给压缩器的确切数据量。每个新帧都必须调用 `ZstdCompressor.set_pledged_input_size()`。
    

所有其他压缩调用可能不会将大小信息写入帧头。

`True` 或 `1` 启用内容大小标志，而 `False` 或 `0` 禁用它。

checksum\_flag[¶](#compression.zstd.CompressionParameter.checksum_flag "Link to this definition")

使用 XXHash64 的四字节校验和写入每个帧的末尾。Zstandard 的解压缩代码会验证校验和。如果校验和不匹配，则会引发 [`ZstdError`](#compression.zstd.ZstdError "compression.zstd.ZstdError") 异常。

`True` 或 `1` 启用校验和生成，而 `False` 或 `0` 禁用它。

dict\_id\_flag[¶](#compression.zstd.CompressionParameter.dict_id_flag "Link to this definition")

使用 [`ZstdDict`](#compression.zstd.ZstdDict "compression.zstd.ZstdDict") 压缩时，字典的 ID 会被写入帧头部。

`True` 或 `1` 启用存储字典 ID，而 `False` 或 `0` 禁用它。

nb\_workers[¶](#compression.zstd.CompressionParameter.nb_workers "Link to this definition")

选择将启动多少线程以并行压缩。当 `nb_workers` > 0 时，启用多线程压缩，值为 `1` 表示“单线程多线程模式”。更多工作线程可以提高速度，但也会增加内存使用并略微降低压缩率。

值为零禁用多线程。

job\_size[¶](#compression.zstd.CompressionParameter.job_size "Link to this definition")

压缩任务的大小，以字节为单位。此值仅在 [`nb_workers`](#compression.zstd.CompressionParameter.nb_workers "compression.zstd.CompressionParameter.nb_workers") >= 1 时生效。每个压缩任务并行完成，因此此值可以间接影响活动线程的数量。

值为零会导致自动选择该值。

overlap\_log[¶](#compression.zstd.CompressionParameter.overlap_log "Link to this definition")

设置压缩过程中，新任务可从先前任务（线程）重新加载多少数据供后向参考窗口使用。该参数仅在 [`nb_workers`](#compression.zstd.CompressionParameter.nb_workers "compression.zstd.CompressionParameter.nb_workers") ≥ 1 时生效。有效取值范围为0到9。

> -   0 表示动态设置重叠量。
>     
> -   1 表示无重叠。
>     
> -   9 表示使用上一个任务的全窗口大小。
>     

每个增量将重叠大小减半/加倍。"8"表示重叠 `window_size/2`，"7"表示重叠 `window_size/4`，等等。

_class_ compression.zstd.DecompressionParameter[¶](#compression.zstd.DecompressionParameter "Link to this definition")

An [`IntEnum`](https://docs.python.org/zh-cn/3/library/enum.html#enum.IntEnum "enum.IntEnum") containing the advanced decompression parameter keys that can be used when decompressing data. Parameters are optional; any omitted parameter will have its value selected automatically.

可以使用 [`bounds()`](#compression.zstd.DecompressionParameter.bounds "compression.zstd.DecompressionParameter.bounds") 方法在任何属性上获取该参数的有效值。

例如，将 [`window_log_max`](#compression.zstd.DecompressionParameter.window_log_max "compression.zstd.DecompressionParameter.window_log_max") 设置为最大大小:

data \= compress(b'Some very long buffer of bytes...')

\_lower, upper \= DecompressionParameter.window\_log\_max.bounds()

options \= {DecompressionParameter.window\_log\_max: upper}
decompress(data, options\=options)

bounds()[¶](#compression.zstd.DecompressionParameter.bounds "Link to this definition")

返回解压缩参数的整型边界元组 `(lower, upper)`。此方法应调用在您希望检索边界的属性上。

下界和上界都是包含在内的。

window\_log\_max[¶](#compression.zstd.DecompressionParameter.window_log_max "Link to this definition")

解压缩期间使用的最大窗口大小的以 2 为底的对数。这有助于限制解压缩数据时使用的内存量。较大的最大窗口大小会带来更快的解压缩速度。

值为零会导致自动选择该值。

_class_ compression.zstd.Strategy[¶](#compression.zstd.Strategy "Link to this definition")

一个包含压缩策略的 [`IntEnum`](https://docs.python.org/zh-cn/3/library/enum.html#enum.IntEnum "enum.IntEnum")。编号较高的策略对应更复杂和更慢的压缩。

备注

`Strategy` 属性的值在不同版本的 zstd 中不一定稳定。只能依赖属性的顺序。以下按顺序列出属性。

以下策略可用：

fast[¶](#compression.zstd.Strategy.fast "Link to this definition")

dfast[¶](#compression.zstd.Strategy.dfast "Link to this definition")

greedy[¶](#compression.zstd.Strategy.greedy "Link to this definition")

lazy[¶](#compression.zstd.Strategy.lazy "Link to this definition")

lazy2[¶](#compression.zstd.Strategy.lazy2 "Link to this definition")

btlazy2[¶](#compression.zstd.Strategy.btlazy2 "Link to this definition")

btopt[¶](#compression.zstd.Strategy.btopt "Link to this definition")

btultra[¶](#compression.zstd.Strategy.btultra "Link to this definition")

btultra2[¶](#compression.zstd.Strategy.btultra2 "Link to this definition")

## 杂项[¶](#miscellaneous "Link to this heading")

compression.zstd.get\_frame\_info(_frame\_buffer_)[¶](#compression.zstd.get_frame_info "Link to this definition")

检索包含有关 Zstandard 帧元数据的 [`FrameInfo`](#compression.zstd.FrameInfo "compression.zstd.FrameInfo") 对象。帧包含与其持有的压缩数据相关的元数据。

_class_ compression.zstd.FrameInfo[¶](#compression.zstd.FrameInfo "Link to this definition")

与 Zstandard 帧相关的元数据。

decompressed\_size[¶](#compression.zstd.FrameInfo.decompressed_size "Link to this definition")

帧中解压缩内容的大小。

dictionary\_id[¶](#compression.zstd.FrameInfo.dictionary_id "Link to this definition")

表示解压缩帧所需的 Zstandard 字典 ID 的整数。`0` 表示字典 ID 未记录在帧头中。这可能意味着不需要 Zstandard 字典，或者所需的字典 ID 未记录。

compression.zstd.COMPRESSION\_LEVEL\_DEFAULT[¶](#compression.zstd.COMPRESSION_LEVEL_DEFAULT "Link to this definition")

Zstandard 的默认压缩级别: `3`。

compression.zstd.zstd\_version\_info[¶](#compression.zstd.zstd_version_info "Link to this definition")

运行时 zstd 库的版本号，作为整数元组 (major, minor, release)。

## 示例[¶](#examples "Link to this heading")

读取压缩文件：

from compression import zstd

with zstd.open("file.zst") as f:
    file\_content \= f.read()

创建压缩文件：

from compression import zstd

data \= b"Insert Data Here"
with zstd.open("file.zst", "w") as f:
    f.write(data)

在内存中压缩数据：

from compression import zstd

data\_in \= b"Insert Data Here"
data\_out \= zstd.compress(data\_in)

增量压缩：

from compression import zstd

comp \= zstd.ZstdCompressor()
out1 \= comp.compress(b"Some data\\n")
out2 \= comp.compress(b"Another piece of data\\n")
out3 \= comp.compress(b"Even more data\\n")
out4 \= comp.flush()
\# 将所有部分结果拼接起来：
result \= b"".join(\[out1, out2, out3, out4\])

写入已压缩数据到一个已打开的文件：

from compression import zstd

with open("myfile", "wb") as f:
    f.write(b"This data will not be compressed\\n")
    with zstd.open(f, "w") as zstf:
        zstf.write(b"This \*will\* be compressed\\n")
    f.write(b"Not compressed\\n")

使用压缩参数创建压缩文件：

from compression import zstd

options \= {
   zstd.CompressionParameter.checksum\_flag: 1
}
with zstd.open("file.zst", "w", options\=options) as f:
    f.write(b"Mind if I squeeze in?")
