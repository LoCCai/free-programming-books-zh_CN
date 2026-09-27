* * *

对于需要数据压缩的应用程序，此模块中的函数可以执行压缩和解压缩操作，使用 [zlib 库](https://www.zlib.net)。

这是一个 [optional module](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module)。 如果它在你的 CPython 副本中缺失，请查看你的发行方（也就是说，向你提供 Python 的人）的文档。 如果你就是发行方，请参阅 [针对可选模块的要求](https://docs.python.org/zh-cn/3/using/configure.html#optional-module-requirements)。

zlib 的函数有很多选项并且往往需要按特定顺序来使用。 本文档不试图覆盖所有使用组合；请参看 [zlib 手册](https://www.zlib.net/manual.html) 来获取权威信息。

要读写 `.gz` 格式的文件，请参考 [`gzip`](https://docs.python.org/zh-cn/3/library/gzip.html#module-gzip "gzip: Interfaces for gzip compression and decompression using file objects.") 模块。

此模块中可用的异常和函数如下：

_exception_ zlib.error[¶](#zlib.error "Link to this definition")

在压缩或解压缩过程中发生错误时的异常。

zlib.adler32(_data_, _value\=1_, _/_)[¶](#zlib.adler32 "Link to this definition")

计算 _data_ 的 Adler-32 校验值。(Adler-32 校验的可靠性与 CRC32 基本相当，但比计算 CRC32 更高效。) 计算的结果是一个无符号 32 位的整数。参数 _value_ 是校验时的起始值，其默认值为 1。借助参数 _value_ 可为分段的输入计算校验值。此算法没有加密强度，不应用于身份验证和数字签名。此算法的目的仅为验证数据的正确性，不适合作为通用散列算法。

在 3.0 版本发生变更: 结果将总是不带符号的。

zlib.compress(_data_, _/_, _level\=Z\_DEFAULT\_COMPRESSION_, _wbits\=MAX\_WBITS_)[¶](#zlib.compress "Link to this definition")

压缩 _data_ 中的字节，返回包含已压缩数据的字节串对象。 _level_ 是一个用于控制压缩级别的 `0` 到 `9` 之间的整数或 `-1`；请参阅 [`Z_BEST_SPEED`](#zlib.Z_BEST_SPEED "zlib.Z_BEST_SPEED") (`1`), [`Z_BEST_COMPRESSION`](#zlib.Z_BEST_COMPRESSION "zlib.Z_BEST_COMPRESSION") (`9`), [`Z_NO_COMPRESSION`](#zlib.Z_NO_COMPRESSION "zlib.Z_NO_COMPRESSION") (`0`) 及默认值 [`Z_DEFAULT_COMPRESSION`](#zlib.Z_DEFAULT_COMPRESSION "zlib.Z_DEFAULT_COMPRESSION") (`-1`) 了解有关这些值的详情。

参数 _wbits_ 控制压缩数据时所使用的历史缓冲区大小（或称“窗口大小”），以及输出中是否包括头部和尾部。 它可以接受几个范围内的值，默认值为 `15` ([`MAX_WBITS`](#zlib.MAX_WBITS "zlib.MAX_WBITS")):

-   +9 至 +15：窗口大小以二为底的对数。 即这些值对应着 512 至 32768 的窗口大小。 更大的值会提供更好的压缩，同时内存开销也会更大。 压缩输出会包含 zlib 特定格式的头部和尾部。
    
-   −9 至 −15：绝对值为窗口大小以二为底的对数。 压缩输出仅包含压缩数据，没有头部和尾部。
    
-   +25 至 +31 = 16 + (9 至 15)：后 4 个比特位为窗口大小以二为底的对数。 压缩输出包含一个基本的 **gzip** 头部，并以校验和为尾部。
    

如果发生任何错误则将引发 [`error`](#zlib.error "zlib.error") 异常。

在 3.6 版本发生变更: 现在，_level_ 可作为关键字参数。

在 3.11 版本发生变更: 现在可以用 _wbits_ 形参来设置窗口位和压缩类型。

zlib.compressobj(_level=Z\_DEFAULT\_COMPRESSION_, _method=DEFLATED_, _wbits=MAX\_WBITS_, _memLevel=DEF\_MEM\_LEVEL_, _strategy=Z\_DEFAULT\_STRATEGY_\[, _zdict_\])[¶](#zlib.compressobj "Link to this definition")

返回一个压缩对象，用来压缩内存中难以容下的数据流。

_level_ 为压缩级别 -- 一个 `0` 到 `9` 之间的整数或 `-1`。 请参阅 [`Z_BEST_SPEED`](#zlib.Z_BEST_SPEED "zlib.Z_BEST_SPEED") (`1`), [`Z_BEST_COMPRESSION`](#zlib.Z_BEST_COMPRESSION "zlib.Z_BEST_COMPRESSION") (`9`), [`Z_NO_COMPRESSION`](#zlib.Z_NO_COMPRESSION "zlib.Z_NO_COMPRESSION") (`0`) 及默认值 [`Z_DEFAULT_COMPRESSION`](#zlib.Z_DEFAULT_COMPRESSION "zlib.Z_DEFAULT_COMPRESSION") (`-1`) 了解有关这些值的详情。

_method_ 表示压缩算法。现在只支持 [`DEFLATED`](#zlib.DEFLATED "zlib.DEFLATED") 这个算法。

_wbits_ 形参控制历史缓冲区的大小（或称“窗口大小”），以及将要使用的头部和尾部格式。 它的含义与 [对 compress() 的描述](#compress-wbits) 相同。

参数 _memLevel_ 指定内部压缩操作时所占用内存大小。参数取 `1` 到 `9`。更大的值占用更多的内存，同时速度也更快输出也更小。

_strategy_ 用于调节压缩算法。 可能的值为 [`Z_DEFAULT_STRATEGY`](#zlib.Z_DEFAULT_STRATEGY "zlib.Z_DEFAULT_STRATEGY"), [`Z_FILTERED`](#zlib.Z_FILTERED "zlib.Z_FILTERED"), [`Z_HUFFMAN_ONLY`](#zlib.Z_HUFFMAN_ONLY "zlib.Z_HUFFMAN_ONLY"), [`Z_RLE`](#zlib.Z_RLE "zlib.Z_RLE") 和 [`Z_FIXED`](#zlib.Z_FIXED "zlib.Z_FIXED")。

参数 _zdict_ 指定预定义的压缩字典。它是一个字节序列 (如 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象)，其中包含用户认为要压缩的数据中可能频繁出现的子序列。频率高的子序列应当放在字典的尾部。

在 3.3 版本发生变更: 添加关键字参数 _zdict_。

zlib.crc32(_data_, _value\=0_, _/_)[¶](#zlib.crc32 "Link to this definition")

计算 _data_ 的 CRC (循环冗余校验) 值。计算的结果是一个无符号 32 位的整数。参数 _value_ 是校验时的起始值，其默认值为 0。借助参数 _value_ 可为分段的输入计算校验值。此算法没有加密强度，不应用于身份验证和数字签名。此算法的目的仅为验证数据的正确性，不适合作为通用散列算法。

在 3.0 版本发生变更: 结果将总是不带符号的。

zlib.decompress(_data_, _/_, _wbits\=MAX\_WBITS_, _bufsize\=DEF\_BUF\_SIZE_)[¶](#zlib.decompress "Link to this definition")

解压 _data_ 中的字节，返回含有已解压内容的 bytes 对象。参数 _wbits_ 取决于 _data_ 的格式，具体参见下边的说明。_bufsize_ 为输出缓冲区的起始大小。函数发生错误时抛出 [`error`](#zlib.error "zlib.error") 异常。

_wbits_ 形参控制历史缓冲区的大小（或称“窗口大小”）以及所期望的头部和尾部格式。 它类似于 [`compressobj()`](#zlib.compressobj "zlib.compressobj") 的形参，但可接受更大范围的值：

-   +8 至 +15：窗口尺寸以二为底的对数。 输入必须包含 zlib 头部和尾部。
    
-   0：根据 zlib 头部自动确定窗口大小。 只从 zlib 1.2.3.5 版起受支持。
    
-   −8 至 −15：使用 _wbits_ 的绝对值作为窗口大小以二为底的对数。 输入必须为原始数据流，没有头部和尾部。
    
-   +24 至 +31 = 16 + (8 至 15)：使用后 4 个比特位作为窗口大小以二为底的对数。 输入必须包括 gzip 头部和尾部。
    
-   +40 至 +47 = 32 + (8 至 15)：使用后 4 个比特位作为窗口大小以二为底的对数，并且自动接受 zlib 或 gzip 格式。
    

当解压缩一个数据流时，窗口大小必须不小于用于压缩数据流的原始窗口大小；使用太小的值可能导致 [`error`](#zlib.error "zlib.error") 异常。 默认 _wbits_ 值对应于最大的窗口大小并且要求包括 zlib 头部和尾部。

_bufsize_ 是用于存放解压数据的缓冲区初始大小。 如果需要更大空间，缓冲区大小将按需增加，因此你不需要让这个值完全精确；对其进行调整仅会节省一点对 `malloc()` 的调用次数。

在 3.6 版本发生变更: _wbits_ 和 _bufsize_ 可用作关键字参数。

zlib.decompressobj(_wbits\=MAX\_WBITS_, _zdict\=b''_)[¶](#zlib.decompressobj "Link to this definition")

返回一个解压对象，用来解压无法被一次性放入内存的数据流。

_wbits_ 形参控制历史缓冲区的大小（或称“窗口大小”）以及所期望的头部和尾部格式。 它的含义与 [对 decompress() 的描述](#decompress-wbits) 相同。

_zdict_ 形参指定一个预定义的压缩字典。 如果提供了此形参，它必须与产生将解压数据的压缩器所使用的字典相同。

备注

如果 _zdict_ 是一个可变对象 (例如 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray"))，则你不可在对 [`decompressobj()`](#zlib.decompressobj "zlib.decompressobj") 的调用和对解压器的 `decompress()` 方法的调用之间修改其内容。

在 3.3 版本发生变更: 增加了 _zdict_ 形参。

压缩对象支持以下方法：

Compress.compress(_data_, _/_)[¶](#zlib.Compress.compress "Link to this definition")

压缩 _data_ 并返回 bytes 对象，这个对象含有 _data_ 的部分或全部内容的已压缩数据。所得的对象必须拼接在上一次调用 [`compress()`](#zlib.compress "zlib.compress") 方法所得数据的后面。缓冲区中可能留存部分输入以供下一次调用。

Compress.flush(_mode\=Z\_FINISH_, _/_)[¶](#zlib.Compress.flush "Link to this definition")

所有待处理的输入将被处理，并返回一个包含剩余已压缩输出的字节串对象。 _mode_ 可从常量 [`Z_NO_FLUSH`](#zlib.Z_NO_FLUSH "zlib.Z_NO_FLUSH"), [`Z_PARTIAL_FLUSH`](#zlib.Z_PARTIAL_FLUSH "zlib.Z_PARTIAL_FLUSH"), [`Z_SYNC_FLUSH`](#zlib.Z_SYNC_FLUSH "zlib.Z_SYNC_FLUSH"), [`Z_FULL_FLUSH`](#zlib.Z_FULL_FLUSH "zlib.Z_FULL_FLUSH"), [`Z_BLOCK`](#zlib.Z_BLOCK "zlib.Z_BLOCK") 或 [`Z_FINISH`](#zlib.Z_FINISH "zlib.Z_FINISH") 中选取，默认值为 `Z_FINISH`。 除了 `Z_FINISH`，所有常量都允许继续压缩数据字节串，而 `Z_FINISH` 将关闭已压缩流并阻止再压缩更多数据。 在调用 [`flush()`](#zlib.Compress.flush "zlib.Compress.flush") 并将 _mode_ 设为 `Z_FINISH` 之后，[`compress()`](#zlib.compress "zlib.compress") 方法将无法被再次调用；唯一可做的操作就是删除该对象。

Compress.copy()[¶](#zlib.Compress.copy "Link to this definition")

返回此压缩对象的一个拷贝。它可以用来高效压缩一系列拥有相同前缀的数据。

解压缩对象支持以下方法和属性：

Decompress.unused\_data[¶](#zlib.Decompress.unused_data "Link to this definition")

一个 bytes 对象，其中包含压缩数据结束之后的任何字节数据。 也就是说，它将为 `b""` 直到包含压缩数据的末尾字节可用。 如果整个结果字节串都包含压缩数据，它将为一个空的 bytes 对象 `b""`。

Decompress.unconsumed\_tail[¶](#zlib.Decompress.unconsumed_tail "Link to this definition")

一个 bytes 对象，其中包含未被上一次 [`decompress()`](#zlib.decompress "zlib.decompress") 调用所消耗的任何数据。 此数据不能被 zlib 机制看到，因此你必须将其送回（可能要附带额外的数据拼接）到后续的 `decompress()` 方法调用以获得正确的输出。

Decompress.eof[¶](#zlib.Decompress.eof "Link to this definition")

一个布尔值，指明是否已到达压缩数据流的末尾。

这使得区分正确构造的压缩数据流和不完整或被截断的流成为可能。

Added in version 3.3.

Decompress.decompress(_data_, _/_, _max\_length\=0_)[¶](#zlib.Decompress.decompress "Link to this definition")

解压缩 _data_ 并返回 bytes 对象，其中包含对应于 _string_ 中至少一部分数据的解压缩数据。 此数据应当被拼接到之前任何对 [`decompress()`](#zlib.decompress "zlib.decompress") 方法的调用所产生的输出。 部分输入数据可能会被保留在内部缓冲区以供后续处理。

If the optional parameter _max\_length_ is non-zero then the return value will be no longer than _max\_length_. This may mean that not all of the compressed input can be processed; and unconsumed data will be stored in the attribute [`unconsumed_tail`](#zlib.Decompress.unconsumed_tail "zlib.Decompress.unconsumed_tail"). This bytestring must be passed to a subsequent call to `decompress()` if decompression is to continue. If _max\_length_ is zero then the whole input is decompressed, and `unconsumed_tail` is empty.

在 3.6 版本发生变更: _max\_length_ 可用作关键字参数。

Decompress.flush(_length\=DEF\_BUF\_SIZE_, _/_)[¶](#zlib.Decompress.flush "Link to this definition")

所有挂起的输入会被处理，并且返回包含剩余未压缩输出的 bytes 对象。 在调用 [`flush()`](#zlib.Decompress.flush "zlib.Decompress.flush") 之后，[`decompress()`](#zlib.decompress "zlib.decompress") 方法将无法被再次调用；唯一可行的操作是删除该对象。

可选的形参 _length_ 设置输出缓冲区的初始大小。

Decompress.copy()[¶](#zlib.Decompress.copy "Link to this definition")

返回解压缩对象的一个拷贝。 它可以用来在数据流的中途保存解压缩器的状态以便加快随机查找数据流后续位置的速度。

下列常量可被用于配置压缩和解压缩行为：

zlib.DEFLATED[¶](#zlib.DEFLATED "Link to this definition")

紧凑压缩方法。

zlib.MAX\_WBITS[¶](#zlib.MAX_WBITS "Link to this definition")

最大窗口尺寸，表示为 2 的幂。 例如，如果 `MAX_WBITS` 为 `15` 则窗口尺寸将为 `32 KiB`。

zlib.DEF\_MEM\_LEVEL[¶](#zlib.DEF_MEM_LEVEL "Link to this definition")

用于压缩对象的默认内存级别。

zlib.DEF\_BUF\_SIZE[¶](#zlib.DEF_BUF_SIZE "Link to this definition")

用于解压缩操作的默认缓冲区大小。

zlib.Z\_NO\_COMPRESSION[¶](#zlib.Z_NO_COMPRESSION "Link to this definition")

压缩级别 `0`；无压缩。

Added in version 3.6.

zlib.Z\_BEST\_SPEED[¶](#zlib.Z_BEST_SPEED "Link to this definition")

压缩级别 `1`；速度最快而压缩率最低。

zlib.Z\_BEST\_COMPRESSION[¶](#zlib.Z_BEST_COMPRESSION "Link to this definition")

压缩级别 `9`；速度最慢而压缩率最高。

zlib.Z\_DEFAULT\_COMPRESSION[¶](#zlib.Z_DEFAULT_COMPRESSION "Link to this definition")

默认压缩级别 (`-1`)；平衡速度和压缩率。 目前等价于压缩级别 `6`。

zlib.Z\_DEFAULT\_STRATEGY[¶](#zlib.Z_DEFAULT_STRATEGY "Link to this definition")

默认压缩策略，针对普通数据。

zlib.Z\_FILTERED[¶](#zlib.Z_FILTERED "Link to this definition")

针对过滤器（或预测器）所产生数据的压缩策略。

zlib.Z\_HUFFMAN\_ONLY[¶](#zlib.Z_HUFFMAN_ONLY "Link to this definition")

强制仅使用 Huffman 代码的压缩策略。

zlib.Z\_RLE[¶](#zlib.Z_RLE "Link to this definition")

限制匹配距离为一的压缩策略（游程编码）。

此常量仅在 Python 编译时使用了 zlib 1.2.0.1 或更高版本的情况下可用。

Added in version 3.6.

zlib.Z\_FIXED[¶](#zlib.Z_FIXED "Link to this definition")

避免使用动态 Huffman 代码的压缩策略。

此常量仅在 Python 编译时启用了 zlib 1.2.2.2 或更高版本的情况下可用。

Added in version 3.6.

zlib.Z\_NO\_FLUSH[¶](#zlib.Z_NO_FLUSH "Link to this definition")

刷新模式 `0`。 没有特殊的刷新行为。

Added in version 3.6.

zlib.Z\_PARTIAL\_FLUSH[¶](#zlib.Z_PARTIAL_FLUSH "Link to this definition")

刷新模式 `1`。 尽可能多地刷新输出。

zlib.Z\_SYNC\_FLUSH[¶](#zlib.Z_SYNC_FLUSH "Link to this definition")

刷新模式 `2`。 刷新所有输出并将输出对齐到字节边界。

zlib.Z\_FULL\_FLUSH[¶](#zlib.Z_FULL_FLUSH "Link to this definition")

刷新模式 `3`。 刷新所有输出并重置压缩状态。

zlib.Z\_FINISH[¶](#zlib.Z_FINISH "Link to this definition")

刷新模式 `4`。 处理所有待处理输入，不再接受输入。

zlib.Z\_BLOCK[¶](#zlib.Z_BLOCK "Link to this definition")

刷新模式 `5`。 完成并发送一个收缩块。

此常量仅在 Python 编译时启用了 zlib 1.2.2.2 或更高版本的情况下可用。

Added in version 3.6.

zlib.Z\_TREES[¶](#zlib.Z_TREES "Link to this definition")

刷新模式 `6`，用于膨胀操作。 指令膨胀操作在其达到下一个收缩块边界时返回。

此常量仅在 Python 编译时启用了 zlib 1.2.3.4 或更高版本的情况下可用。

Added in version 3.6.

通过下列常量可获取模块所使用的 zlib 库的版本信息：

zlib.ZLIB\_VERSION[¶](#zlib.ZLIB_VERSION "Link to this definition")

构建此模块时所用的 zlib 库的版本字符串。它的值可能与运行时所加载的 zlib 不同。运行时加载的 zlib 库的版本字符串为 [`ZLIB_RUNTIME_VERSION`](#zlib.ZLIB_RUNTIME_VERSION "zlib.ZLIB_RUNTIME_VERSION")。

zlib.ZLIB\_RUNTIME\_VERSION[¶](#zlib.ZLIB_RUNTIME_VERSION "Link to this definition")

解释器所加载的 zlib 库的版本字符串。

Added in version 3.3.

zlib.ZLIBNG\_VERSION[¶](#zlib.ZLIBNG_VERSION "Link to this definition")

如果使用了 zlib-ng，则为用于构建该模块的 zlib-ng 库的版本字符串。 当存在时，[`ZLIB_VERSION`](#zlib.ZLIB_VERSION "zlib.ZLIB_VERSION") 和 [`ZLIB_RUNTIME_VERSION`](#zlib.ZLIB_RUNTIME_VERSION "zlib.ZLIB_RUNTIME_VERSION") 常量将反映由 zlib-ng 提供的 zlib API 版本。

如果 zlib-ng 未被用于构建该模块，此常量将不存在。

Added in version 3.14.
