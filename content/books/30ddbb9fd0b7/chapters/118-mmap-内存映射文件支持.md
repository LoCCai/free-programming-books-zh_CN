* * *

内存映射文件对象的行为既像 [`bytearray`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytearray "bytearray") 又像 [文件对象](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)。 你可以在大部分接受 `bytearray` 的地方使用 mmap 对象；例如，你可以使用 [`re`](https://docs.python.org/zh-cn/3/library/re.html#module-re "re: Regular expression operations.") 模块来搜索一个内存映射文件。 你也可以通过执行 `obj[index] = 97` 来修改单个字节，或者通过对切片赋值来修改一个子序列: `obj[i1:i2] = b'...'`。 你还可以在文件的当前位置开始读取和写入数据，并使用 `seek()` 前往另一个位置。

内存映射文件是由 [`mmap`](#mmap.mmap "mmap.mmap") 构造器创建的，它在 Unix 和在 Windows 上会有所不同。 无论在哪种情况下你都必须为一个打开用于更新的文件提供文件描述符。 如果你想要映射一个已有的 Python 文件对象，请使用其 [`fileno()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.fileno "io.IOBase.fileno") 方法来为 _fileno_ 形参获取正确的值。 否则，你可以使用 [`os.open()`](https://docs.python.org/zh-cn/3/library/os.html#os.open "os.open") 函数来打开这个文件，它会直接返回一个文件描述符（结束时仍然需要关闭该文件）。

备注

如果要为可写的缓冲文件创建内存映射，则应当首先 [`flush()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.flush "io.IOBase.flush") 该文件。 这确保了对缓冲区的本地修改在内存映射中可用。

对于 Unix 和 Windows 版本的构造函数，可以将 _access_ 指定为可选的关键字参数。 _access_ 接受以下四个值之一： `ACCESS_READ` ， `ACCESS_WRITE` 或 `ACCESS_COPY` 分别指定只读，直写或写时复制内存，或 `ACCESS_DEFAULT` 推迟到 _prot_ 。 _access_ 可以在 Unix 和 Windows 上使用。如果未指定 _access_ ，则 Windows mmap 返回直写映射。这三种访问类型的初始内存值均取自指定的文件。向 `ACCESS_READ` 内存映射赋值会引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError") 异常。 向 `ACCESS_WRITE` 内存映射赋值会影响内存和底层的文件。 向 `ACCESS_COPY` 内存映射赋值会影响内存，但不会更新底层的文件。

在 3.7 版本发生变更: 添加了 `ACCESS_DEFAULT` 常量。

要映射匿名内存，应将 -1 作为 fileno 和 length 一起传递。

_class_ mmap.mmap(_fileno_, _length_, _tagname\=None_, _access\=ACCESS\_DEFAULT_, _offset\=0_)[¶](#mmap.mmap "Link to this definition")

**(Windows version)** Maps _length_ bytes from the file specified by the file handle _fileno_, and creates a mmap object. If _length_ is larger than the current size of the file, the file is extended to contain _length_ bytes. If _length_ is `0`, the maximum length of the map is the current size of the file, except that if the file is empty Windows raises an exception (you cannot create an empty mapping on Windows).

如果指定了 _tagname_ 并且不为 `None`，则将是一个为映射提供标签名称的字符串。 Windows 允许对同一文件设置许多不同的映射。 如果指定一个现有标签的名称，则将打开该标签，否则将创建一个具有该名称的新标签。 如果此形参被省略或为 `None`，则创建的映射将不带名称。 避免使用 _tagname_ 形参将有助于使你的代码在 Unix 和 Windows 之间可移植。

_offset_ 可以被指定为非负整数偏移量。 mmap 引用将相对于从文件开头的偏移。 _offset_ 默认为 0。 _offset_ 必须是 `ALLOCATIONGRANULARITY` 的倍数。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `mmap.__new__` 并附带参数 `fileno`, `length`, `access`, `offset`。

_class_ mmap.mmap(_fileno_, _length_, _flags\=MAP\_SHARED_, _prot\=PROT\_WRITE | PROT\_READ_, _access\=ACCESS\_DEFAULT_, _offset\=0_, _\*_, _trackfd\=True_)

**(Unix 版本)** 映射文件描述符 _fileno_ 指定的文件的 _length_ 个字节，并返回一个 mmap 对象。如果 _length_ 为 `0` ，则当调用 [`mmap`](#mmap.mmap "mmap.mmap") 时，映射的最大长度将为文件的当前大小。

_flags_ 指明映射的性质。 [`MAP_PRIVATE`](#mmap.MAP_PRIVATE "mmap.MAP_PRIVATE") 会创建私有的写入时拷贝映射，因此对 mmap 对象内容的修改将为该进程所私有。 而 [`MAP_SHARED`](#mmap.MAP_SHARED "mmap.MAP_SHARED") 会创建与其他映射同一文件区域的进程所共享的映射。 默认值为 `MAP_SHARED`。 某些系统还具有额外的可用旗标，完整列表会在 [MAP\_\* 常量](#map-constants) 中指明。

如果指明了 _prot_，它将给出所需的内存保护方式；最有用的两个值是 `PROT_READ` 和 `PROT_WRITE`，分别指明页面为可读或可写。 _prot_ 默认为 `PROT_READ | PROT_WRITE`。

可以指定 _access_ 作为替代 _flags_ 和 _prot_ 的可选关键字形参。 同时指定 _flags_, _prot_ 和 _access_ 将导致错误。 请参阅上文中 _access_ 的描述了解有关如何使用此形参的信息。

_offset_ 可以被指定为非负整数偏移量。 mmap 引用将相对于从文件开头的偏移。 _offset_ 默认为 0。 _offset_ 必须是 `ALLOCATIONGRANULARITY` 的倍数，它在 Unix 系统上等价于 `PAGESIZE`。

如果 _trackfd_ 为 `False`，则由 _fileno_ 指定的文件描述符将不会被复制，而结果 `mmap` 对象将不会被关联到映射的下层文件。 这意味着 [`size()`](#mmap.mmap.size "mmap.mmap.size") 和 [`resize()`](#mmap.mmap.resize "mmap.mmap.resize") 方法将会失败。 此模式适用于限制打开文件描述符的数量。

为了确保已创建内存映射的有效性，描述符 _fileno_ 所指定的文件在 macOS 上会与物理后备存储进行内部自动同步。

在 3.13 版本发生变更: 增加了 _trackfd_ 形参。

这个例子演示了使用 [`mmap`](#mmap.mmap "mmap.mmap") 的简单方式:

import mmap

\# 写入一个简单的示例文件
with open("hello.txt", "wb") as f:
    f.write(b"Hello Python!\\n")

with open("hello.txt", "r+b") as f:
    \# 对文件进行内存映射，大小为 0 表示整个文件
    mm \= mmap.mmap(f.fileno(), 0)
    \# 通过标准文件方法读取内容
    print(mm.readline())  \# 打印 b"Hello Python!\\n"
    \# 通过切片标记方式读取内容
    print(mm\[:5\])  \# 打印 b"Hello"
    \# 使用切片标记方式更新内容；
    \# 请注意新内容必须为相同的大小
    mm\[6:\] \= b" world!\\n"
    \# ... 并使用标准文件方法再次读取
    mm.seek(0)
    print(mm.readline())  \# 打印 b"Hello  world!\\n"
    \# 关闭映射
    mm.close()

[`mmap`](#mmap.mmap "mmap.mmap") 也可以在 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句中被用作上下文管理器:

import mmap

with mmap.mmap(\-1, 13) as mm:
    mm.write(b"Hello world!")

Added in version 3.2: 上下文管理器支持。

下面的例子演示了如何创建一个匿名映射并在父进程和子进程之间交换数据:

import mmap
import os

mm \= mmap.mmap(\-1, 13)
mm.write(b"Hello world!")

pid \= os.fork()

if pid \== 0:  \# 在子进程中
    mm.seek(0)
    print(mm.readline())

    mm.close()

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `mmap.__new__` 并附带参数 `fileno`, `length`, `access`, `offset`。

内存映射文件对象支持以下方法:

close()[¶](#mmap.mmap.close "Link to this definition")

关闭 mmap。 后续调用该对象的其他方法将导致引发 ValueError 异常。 此方法将不会关闭打开的文件。

closed[¶](#mmap.mmap.closed "Link to this definition")

如果文件已关闭则返回 `True`。

Added in version 3.2.

find(_sub_\[, _start_\[, _end_\]\])[¶](#mmap.mmap.find "Link to this definition")

返回子序列 _sub_ 在对象内被找到的最小索引号，使得 _sub_ 被包含在 \[_start_, _end_\] 范围中。 可选参数 _start_ 和 _end_ 会被解读为切片表示法。 如果未找到则返回 `-1`。

在 3.5 版本发生变更: 现在接受可写的 [字节类对象](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object)。

flush()[¶](#mmap.mmap.flush "Link to this definition")

flush(_offset_, _size_, _/_)

将对文件的内存副本的修改刷新至磁盘。 如果不使用此调用则无法保证在对象被销毁前将修改写回存储。 如果指定了 _offset_ 和 _size_，则只将对指定范围内字节的修改刷新至磁盘；在其他情况下，映射的全部范围都会被刷新。 _offset_ 必须为 `PAGESIZE` 或 `ALLOCATIONGRANULARITY` 的倍数。

返回 `None` 以表示成功。 当调用失败时将引发异常。

在 3.8 版本发生变更: 在之前版本中，成功时将返回非零值；在 Windows 下当发生错误时将返回零。 在 Unix 下成功时将返回零值；当发生错误时将引发异常。

madvise(_option_\[, _start_\[, _length_\]\])[¶](#mmap.mmap.madvise "Link to this definition")

将有关内存区域的建议 _option_ 发送至内核，从 _start_ 开始扩展 _length_ 个字节。 _option_ 必须为系统中可用的 [MADV\_\* 常量](#madvise-constants) 之一。 如果省略 _start_ 和 _length_，则会包含整个映射。 在某些系统中（包括 Linux），_start_ 必须为 `PAGESIZE` 的倍数。

可用性: 具有 `madvise()` 系统调用的系统。

Added in version 3.8.

move(_dest_, _src_, _count_)[¶](#mmap.mmap.move "Link to this definition")

将从偏移量 _src_ 开始的 _count_ 个字节拷贝到目标索引号 _dest_。 如果 mmap 创建时设置了 `ACCESS_READ`，则调用 move 将引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError") 异常。

read(\[_n_\])[¶](#mmap.mmap.read "Link to this definition")

返回一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")，其中包含从当前文件位置开始的至多 _n_ 个字节。 如果参数省略，为 `None` 或负数，则返回从当前文件位置开始直至映射结尾的所有字节。 文件位置会被更新为返回字节数据之后的位置。

在 3.3 版本发生变更: 参数可被省略或为 `None`。

read\_byte()[¶](#mmap.mmap.read_byte "Link to this definition")

将当前文件位置上的一个字节以整数形式返回，并让文件位置前进 1。

readline()[¶](#mmap.mmap.readline "Link to this definition")

返回一个单独的行，从当前文件位置开始直到下一个换行符。 文件位置会被更新为返回字节数据之后的位置。

resize(_newsize_)[¶](#mmap.mmap.resize "Link to this definition")

改变映射和下层文件的大小，如果存在的话。

改变具有 `ACCESS_READ` 或 `ACCESS_COPY` _访问权限_ 的已创建映射的大小，将引发一个 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError") 异常。 改变 _trackfd_ 被设为 `False` 的已创建映射的大小，将引发一个 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 异常。

**在 Windows 上**: 如果存在其他针对相同名称文件的映射则改变映射大小将引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError")。 改变匿名映射（即针对分页文件）的大小将静默地创建一个新映射并将原始数据复制到对应新大小的长度。

在 3.11 版本发生变更: 当持有另一个映射时尝试改变大小将正确地报告失败。允许在 Windows 上对匿名映射改变大小

rfind(_sub_\[, _start_\[, _end_\]\])[¶](#mmap.mmap.rfind "Link to this definition")

返回子序列 _sub_ 在对象内被找到的最大索引号，使得 _sub_ 被包含在 \[_start_, _end_\] 范围中。 可选参数 _start_ 和 _end_ 会被解读为切片表示法。 如果未找到则返回 `-1`。

在 3.5 版本发生变更: 现在接受可写的 [字节类对象](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object)。

seek(_pos_\[, _whence_\])[¶](#mmap.mmap.seek "Link to this definition")

设置文件的当前位置。 _whence_ 参数为可选项并且默认为 `os.SEEK_SET` 或 `0` (绝对文件定位)；其他值还有 `os.SEEK_CUR` 或 `1` (相对当前位置查找) 和 `os.SEEK_END` 或 `2` (相对文件末尾查找)。

在 3.13 版本发生变更: 返回一个新的绝对位置值而非 `None`。

seekable()[¶](#mmap.mmap.seekable "Link to this definition")

返回文件是否支持定位，返回值将始终为 `True`。

Added in version 3.13.

size()[¶](#mmap.mmap.size "Link to this definition")

Return the length of the file, which can be larger than the size of the memory-mapped area.

tell()[¶](#mmap.mmap.tell "Link to this definition")

返回文件指针的当前位置。

write(_bytes_)[¶](#mmap.mmap.write "Link to this definition")

将 _bytes_ 中的字节数据写入文件指针当前位置的内存并返回写入的字节总数 (一定不小于 `len(bytes)`，因为如果写入失败，将会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError"))。 在字节数据被写入后文件位置将会更新。 如果 mmap 创建时设置了 `ACCESS_READ`，则向其写入将引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError") 异常。

在 3.5 版本发生变更: 现在接受可写的 [字节类对象](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object)。

在 3.6 版本发生变更: 现在会返回写入的字节总数。

write\_byte(_byte_)[¶](#mmap.mmap.write_byte "Link to this definition")

将整数值 _byte_ 写入文件指针当前位置的内存；文件位置前进 `1`。 如果 mmap 创建时设置了 `ACCESS_READ`，则向其写入将引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError") 异常。

## MADV\_\* 常量[¶](#madv-constants "Link to this heading")

mmap.MADV\_NORMAL[¶](#mmap.MADV_NORMAL "Link to this definition")

mmap.MADV\_RANDOM[¶](#mmap.MADV_RANDOM "Link to this definition")

mmap.MADV\_SEQUENTIAL[¶](#mmap.MADV_SEQUENTIAL "Link to this definition")

mmap.MADV\_WILLNEED[¶](#mmap.MADV_WILLNEED "Link to this definition")

mmap.MADV\_DONTNEED[¶](#mmap.MADV_DONTNEED "Link to this definition")

mmap.MADV\_REMOVE[¶](#mmap.MADV_REMOVE "Link to this definition")

mmap.MADV\_DONTFORK[¶](#mmap.MADV_DONTFORK "Link to this definition")

mmap.MADV\_DOFORK[¶](#mmap.MADV_DOFORK "Link to this definition")

mmap.MADV\_HWPOISON[¶](#mmap.MADV_HWPOISON "Link to this definition")

mmap.MADV\_MERGEABLE[¶](#mmap.MADV_MERGEABLE "Link to this definition")

mmap.MADV\_UNMERGEABLE[¶](#mmap.MADV_UNMERGEABLE "Link to this definition")

mmap.MADV\_SOFT\_OFFLINE[¶](#mmap.MADV_SOFT_OFFLINE "Link to this definition")

mmap.MADV\_HUGEPAGE[¶](#mmap.MADV_HUGEPAGE "Link to this definition")

mmap.MADV\_NOHUGEPAGE[¶](#mmap.MADV_NOHUGEPAGE "Link to this definition")

mmap.MADV\_DONTDUMP[¶](#mmap.MADV_DONTDUMP "Link to this definition")

mmap.MADV\_DODUMP[¶](#mmap.MADV_DODUMP "Link to this definition")

mmap.MADV\_FREE[¶](#mmap.MADV_FREE "Link to this definition")

mmap.MADV\_NOSYNC[¶](#mmap.MADV_NOSYNC "Link to this definition")

mmap.MADV\_AUTOSYNC[¶](#mmap.MADV_AUTOSYNC "Link to this definition")

mmap.MADV\_NOCORE[¶](#mmap.MADV_NOCORE "Link to this definition")

mmap.MADV\_CORE[¶](#mmap.MADV_CORE "Link to this definition")

mmap.MADV\_PROTECT[¶](#mmap.MADV_PROTECT "Link to this definition")

mmap.MADV\_FREE\_REUSABLE[¶](#mmap.MADV_FREE_REUSABLE "Link to this definition")

mmap.MADV\_FREE\_REUSE[¶](#mmap.MADV_FREE_REUSE "Link to this definition")

这些选项可被传给 [`mmap.madvise()`](#mmap.mmap.madvise "mmap.mmap.madvise")。 不是每个选项都存在于每个系统中。

可用性: 具有 madvise() 系统调用的系统。

Added in version 3.8.

## MAP\_\* 常量[¶](#map-constants "Link to this heading")

mmap.MAP\_SHARED[¶](#mmap.MAP_SHARED "Link to this definition")

mmap.MAP\_PRIVATE[¶](#mmap.MAP_PRIVATE "Link to this definition")

mmap.MAP\_32BIT[¶](#mmap.MAP_32BIT "Link to this definition")

mmap.MAP\_ALIGNED\_SUPER[¶](#mmap.MAP_ALIGNED_SUPER "Link to this definition")

mmap.MAP\_ANON[¶](#mmap.MAP_ANON "Link to this definition")

mmap.MAP\_ANONYMOUS[¶](#mmap.MAP_ANONYMOUS "Link to this definition")

mmap.MAP\_CONCEAL[¶](#mmap.MAP_CONCEAL "Link to this definition")

mmap.MAP\_DENYWRITE[¶](#mmap.MAP_DENYWRITE "Link to this definition")

mmap.MAP\_EXECUTABLE[¶](#mmap.MAP_EXECUTABLE "Link to this definition")

mmap.MAP\_HASSEMAPHORE[¶](#mmap.MAP_HASSEMAPHORE "Link to this definition")

mmap.MAP\_JIT[¶](#mmap.MAP_JIT "Link to this definition")

mmap.MAP\_NOCACHE[¶](#mmap.MAP_NOCACHE "Link to this definition")

mmap.MAP\_NOEXTEND[¶](#mmap.MAP_NOEXTEND "Link to this definition")

mmap.MAP\_NORESERVE[¶](#mmap.MAP_NORESERVE "Link to this definition")

mmap.MAP\_POPULATE[¶](#mmap.MAP_POPULATE "Link to this definition")

mmap.MAP\_RESILIENT\_CODESIGN[¶](#mmap.MAP_RESILIENT_CODESIGN "Link to this definition")

mmap.MAP\_RESILIENT\_MEDIA[¶](#mmap.MAP_RESILIENT_MEDIA "Link to this definition")

mmap.MAP\_STACK[¶](#mmap.MAP_STACK "Link to this definition")

mmap.MAP\_TPRO[¶](#mmap.MAP_TPRO "Link to this definition")

mmap.MAP\_TRANSLATED\_ALLOW\_EXECUTE[¶](#mmap.MAP_TRANSLATED_ALLOW_EXECUTE "Link to this definition")

mmap.MAP\_UNIX03[¶](#mmap.MAP_UNIX03 "Link to this definition")

以下是可被传给 [`mmap.mmap()`](#mmap.mmap "mmap.mmap") 的各种旗标。 [`MAP_ALIGNED_SUPER`](#mmap.MAP_ALIGNED_SUPER "mmap.MAP_ALIGNED_SUPER") 仅在 FreeBSD 上可用而 [`MAP_CONCEAL`](#mmap.MAP_CONCEAL "mmap.MAP_CONCEAL") 仅在 OpenBSD 上可用。 请注意某些选项在某些系统上可能不存在。

在 3.10 版本发生变更: 增加了 [`MAP_POPULATE`](#mmap.MAP_POPULATE "mmap.MAP_POPULATE") 常量。

Added in version 3.11: 增加了 [`MAP_STACK`](#mmap.MAP_STACK "mmap.MAP_STACK") 常量。

Added in version 3.12: 增加了 [`MAP_ALIGNED_SUPER`](#mmap.MAP_ALIGNED_SUPER "mmap.MAP_ALIGNED_SUPER") 和 [`MAP_CONCEAL`](#mmap.MAP_CONCEAL "mmap.MAP_CONCEAL") 常量。

Added in version 3.13: 增加了 [`MAP_32BIT`](#mmap.MAP_32BIT "mmap.MAP_32BIT"), [`MAP_HASSEMAPHORE`](#mmap.MAP_HASSEMAPHORE "mmap.MAP_HASSEMAPHORE"), [`MAP_JIT`](#mmap.MAP_JIT "mmap.MAP_JIT"), [`MAP_NOCACHE`](#mmap.MAP_NOCACHE "mmap.MAP_NOCACHE"), [`MAP_NOEXTEND`](#mmap.MAP_NOEXTEND "mmap.MAP_NOEXTEND"), [`MAP_NORESERVE`](#mmap.MAP_NORESERVE "mmap.MAP_NORESERVE"), [`MAP_RESILIENT_CODESIGN`](#mmap.MAP_RESILIENT_CODESIGN "mmap.MAP_RESILIENT_CODESIGN"), [`MAP_RESILIENT_MEDIA`](#mmap.MAP_RESILIENT_MEDIA "mmap.MAP_RESILIENT_MEDIA"), [`MAP_TPRO`](#mmap.MAP_TPRO "mmap.MAP_TPRO"), [`MAP_TRANSLATED_ALLOW_EXECUTE`](#mmap.MAP_TRANSLATED_ALLOW_EXECUTE "mmap.MAP_TRANSLATED_ALLOW_EXECUTE") 和 [`MAP_UNIX03`](#mmap.MAP_UNIX03 "mmap.MAP_UNIX03") 等常量。
