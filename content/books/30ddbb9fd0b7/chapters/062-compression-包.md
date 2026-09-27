Added in version 3.14.

`compression` 包包含规范的压缩模块，其中包含几种不同压缩算法的接口。其中一些模块在历史上是作为单独的模块提供的；出于兼容性原因，它们将继续以其原始名称提供，并且在没有弃用周期的情况下不会被删除。在可行的情况下，鼓励在 `compression` 中使用模块。

-   `compression.bz2` -- 重新导出 [`bz2`](https://docs.python.org/zh-cn/3/library/bz2.html#module-bz2 "bz2: Interfaces for bzip2 compression and decompression.")
    
-   `compression.gzip` -- 重新导出 [`gzip`](https://docs.python.org/zh-cn/3/library/gzip.html#module-gzip "gzip: Interfaces for gzip compression and decompression using file objects.")
    
-   `compression.lzma` -- 重新导出 [`lzma`](https://docs.python.org/zh-cn/3/library/lzma.html#module-lzma "lzma: A Python wrapper for the liblzma compression library.")
    
-   `compression.zlib` -- 重新导出 [`zlib`](https://docs.python.org/zh-cn/3/library/zlib.html#module-zlib "zlib: Low-level interface to compression and decompression routines compatible with gzip.")
    
-   [`compression.zstd`](https://docs.python.org/zh-cn/3/library/compression.zstd.html#module-compression.zstd "compression.zstd: Low-level interface to compression and decompression routines in the zstd library.") -- Zstandard 压缩库的包装器
