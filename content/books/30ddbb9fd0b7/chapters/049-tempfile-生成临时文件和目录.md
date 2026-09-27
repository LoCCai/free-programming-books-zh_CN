**源代码：** [Lib/tempfile.py](https://github.com/python/cpython/tree/3.14/Lib/tempfile.py)

* * *

该模块可以创建临时文件和目录。它适用于所有受支持的平台。 [`TemporaryFile`](#tempfile.TemporaryFile "tempfile.TemporaryFile"), [`NamedTemporaryFile`](#tempfile.NamedTemporaryFile "tempfile.NamedTemporaryFile"), [`TemporaryDirectory`](#tempfile.TemporaryDirectory "tempfile.TemporaryDirectory") 和 [`SpooledTemporaryFile`](#tempfile.SpooledTemporaryFile "tempfile.SpooledTemporaryFile") 是提供自动清理功能的高层级接口并可用作 [上下文管理器](https://docs.python.org/zh-cn/3/glossary.html#term-context-manager)。 [`mkstemp()`](#tempfile.mkstemp "tempfile.mkstemp") 和 [`mkdtemp()`](#tempfile.mkdtemp "tempfile.mkdtemp") 是需要执行手动清理的低层级函数。

所有由用户调用的函数和构造函数都带有参数，这些参数可以设置临时文件和临时目录的路径和名称。该模块生成的文件名包括一串随机字符，在公共的临时目录中，这些字符可以让创建文件更加安全。为了保持向后兼容性，参数的顺序有些奇怪。所以为了代码清晰，建议使用关键字参数。

这个模块定义了以下内容供用户调用：

tempfile.TemporaryFile(_mode\='w+b'_, _buffering\=\-1_, _encoding\=None_, _newline\=None_, _suffix\=None_, _prefix\=None_, _dir\=None_, _\*_, _errors\=None_)[¶](#tempfile.TemporaryFile "Link to this definition")

返回一个 [file-like object](https://docs.python.org/zh-cn/3/glossary.html#term-file-like-object) 作为临时存储区域。创建该文件使用了与 [`mkstemp()`](#tempfile.mkstemp "tempfile.mkstemp") 相同的安全规则。它将在关闭后立即销毁（包括垃圾回收机制关闭该对象时）。在 Unix 下，该文件在目录中的条目根本不创建，或者创建文件后立即就被删除了，其他平台不支持此功能。您的代码不应依赖使用此功能创建的临时文件名称，因为它在文件系统中的名称可能是可见的，也可能是不可见的。

结果对象可以用作 [context manager](https://docs.python.org/zh-cn/3/glossary.html#term-context-manager) (参见 [例子](#tempfile-examples))。 上下文结束或文件对象销毁后会将临时文件从文件系统中移除。

_mode_ 参数默认值为 `'w+b'`，所以创建的文件不用关闭，就可以读取或写入。因为用的是二进制模式，所以无论存的是什么数据，它在所有平台上都表现一致。_buffering_、_encoding_、_errors_ 和 _newline_ 的含义与 [`open()`](https://docs.python.org/zh-cn/3/builtins/functions.html#open "open") 中的相同。

参数 _dir_、_prefix_ 和 _suffix_ 的含义和默认值都与它们在 [`mkstemp()`](#tempfile.mkstemp "tempfile.mkstemp") 中的相同。

在 POSIX 平台上，它返回的对象是真实的文件对象。在其他平台上，它是一个文件型对象，它的 `file` 属性是底层的真实文件对象。

在可用且有效时将使用 [`os.O_TMPFILE`](https://docs.python.org/zh-cn/3/library/os.html#os.O_TMPFILE "os.O_TMPFILE") 旗标（Linux 专属，需要 Linux 内核版本为 3.11 或更高）。

在 Posix 或 Cygwin 以外的平台上，TemporaryFile 是 NamedTemporaryFile 的别名。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `tempfile.mkstemp` 并附带参数 `fullpath`。

在 3.8 版本发生变更: 添加了 _errors_ 参数。

tempfile.NamedTemporaryFile(_mode\='w+b'_, _buffering\=\-1_, _encoding\=None_, _newline\=None_, _suffix\=None_, _prefix\=None_, _dir\=None_, _delete\=True_, _\*_, _errors\=None_, _delete\_on\_close\=True_)[¶](#tempfile.NamedTemporaryFile "Link to this definition")

此函数的操作与 [`TemporaryFile()`](#tempfile.TemporaryFile "tempfile.TemporaryFile") 所做的完全相同，除了存在下列差异：

-   此函数将返回一个肯定具有在文件系统中的可见名称的文件。
    
-   为管理指定名称的文件，它将为 [`TemporaryFile()`](#tempfile.TemporaryFile "tempfile.TemporaryFile") 扩展 _delete_ 和 _delete\_on\_close_ 形参来确定指定名称的文件是否要被自动删除以及要如何执行删除。
    

返回的对象将总是一个 [file-like object](https://docs.python.org/zh-cn/3/glossary.html#term-file-like-object) 并且其 `file` 属性为底层的实际文件对象。 这个文件型对象可在 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句中使用，就像普通的文件一样。该临时文件的文件名可从被返回的文件型对象的 `name` 属性中提取。在 Unix 上，不同于 [`TemporaryFile()`](#tempfile.TemporaryFile "tempfile.TemporaryFile")，其目录项不会在创建文件之后立即被取消链接。

如果 _delete_ 为（默认的）真值且 _delete\_on\_close_ 也为（默认的）真值，则文件将在关闭后立即被删除。如果 _delete_ 为真值而 _delete\_on\_close_ 为假值，则文件将在退出上下文管理器，或者当 [file-like object](https://docs.python.org/zh-cn/3/glossary.html#term-file-like-object) 被终结时才会被删除。在此情况下将不保证总是能删除文件（参见 [`object.__del__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__del__ "object.__del__") 文档）。如果 _delete_ 为假值，则 _delete\_on\_close_ 的值将被忽略。

因此要使用该临时文件的名称在关闭文件之后重新打开它，那么注意在关闭时不要删除文件（将 _delete_ 形参设为假值），或者如果该临时文件是在 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句中创建的，则要将 _delete\_on\_close_ 形参设为假值。 更推荐后一种方式因为它在上下文管理器退出时提供了自动清理协助。

临时文件仍然打开时使用其名称再次打开它的操作如下所示：

-   在 POSIX 上该文件总是可以被再次打开。
    
-   在 Windows 上，要确保至少满足下列条件之一：
    
    -   _delete_ 为假值
        
    -   额外的打开将共享删除操作（例如调用 [`os.open()`](https://docs.python.org/zh-cn/3/library/os.html#os.open "os.open") 时附带了 `O_TEMPORARY` 旗标）
        
    -   _delete_ 为真值但 _delete\_on\_close_ 为假值。注意，在此情况下没有共享删除操作的额外的打开（例如通过内置的 [`open()`](https://docs.python.org/zh-cn/3/builtins/functions.html#open "open") 创建）必须在退出上下文管理器之前被关闭，否则在退出上下文管理器时的 [`os.unlink()`](https://docs.python.org/zh-cn/3/library/os.html#os.unlink "os.unlink") 调用将失败并引发 [`PermissionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#PermissionError "PermissionError").
        

在 Windows 上，如果 _delete\_on\_close_ 为假值，并且文件是在用户没有删除权限的目录中创建的，则退出上下文管理器时的 [`os.unlink()`](https://docs.python.org/zh-cn/3/library/os.html#os.unlink "os.unlink") 调用将失败并引发 [`PermissionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#PermissionError "PermissionError")。这在 _delete\_on\_close_ 为真值时不会发生因为删除权限是由打开操作所请求的，如果未获得所请求的权限此操作将立即失败。

（只有）在 POSIX 上，一个用 SIGKILL 突然终止的进程无法自动删除它所创建的任何 NamedTemporaryFiles。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `tempfile.mkstemp` 并附带参数 `fullpath`。

在 3.8 版本发生变更: 添加了 _errors_ 参数。

在 3.12 版本发生变更: 增加了 _delete\_on\_close_ 形参。

_class_ tempfile.SpooledTemporaryFile(_max\_size\=0_, _mode\='w+b'_, _buffering\=\-1_, _encoding\=None_, _newline\=None_, _suffix\=None_, _prefix\=None_, _dir\=None_, _\*_, _errors\=None_)[¶](#tempfile.SpooledTemporaryFile "Link to this definition")

这个类执行的操作与 [`TemporaryFile()`](#tempfile.TemporaryFile "tempfile.TemporaryFile") 完全相同，但会将数据放入内存池直到文件大小超过 _max\_size_，或者直到文件的 [`fileno()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.fileno "io.IOBase.fileno") 方法被调用，这时文件内容会被写入磁盘并如使用 `TemporaryFile()` 时一样执行后续操作。

rollover()[¶](#tempfile.SpooledTemporaryFile.rollover "Link to this definition")

结果文件有一个额外的方法 `rollover()`，它可以忽略文件大小将其立即写入到磁盘文件。

返回的对象是一个文件型对象，它的 `_file` 属性是 [`io.BytesIO`](https://docs.python.org/zh-cn/3/library/io.html#io.BytesIO "io.BytesIO") 或 [`io.TextIOWrapper`](https://docs.python.org/zh-cn/3/library/io.html#io.TextIOWrapper "io.TextIOWrapper") 对象（这取决于所指定的 _mode_ 是二进制还是文本）或真实的文件对象，这取决于 [`rollover()`](#tempfile.SpooledTemporaryFile.rollover "tempfile.SpooledTemporaryFile.rollover") 是否已被调用。这个文件型对象可以像普通文件一样在 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句中使用。

在 3.3 版本发生变更: 现在 truncate 方法可接受一个 _size_ 参数。

在 3.8 版本发生变更: 添加了 _errors_ 参数。

_class_ tempfile.TemporaryDirectory(_suffix\=None_, _prefix\=None_, _dir\=None_, _ignore\_cleanup\_errors\=False_, _\*_, _delete\=True_)[¶](#tempfile.TemporaryDirectory "Link to this definition")

这个类会使用与 [`mkdtemp()`](#tempfile.mkdtemp "tempfile.mkdtemp") 相同的规则安全地创建一个临时目录。结果对象可以被用作 [context manager](https://docs.python.org/zh-cn/3/glossary.html#term-context-manager) (参见 [例子](#tempfile-examples))。在完成上下文或销毁临时目录对象时，新创建的临时目录及其所有内容会从文件系统中被移除。

name[¶](#tempfile.TemporaryDirectory.name "Link to this definition")

可以从所返回对象的 `name` 属性中提取目录名称。当返回的对象被用作 [context manager](https://docs.python.org/zh-cn/3/glossary.html#term-context-manager) 时，这个 `name` 将被作为 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句中 `as` 子句的目标，如果存在该子句的话。

cleanup()[¶](#tempfile.TemporaryDirectory.cleanup "Link to this definition")

此目录可通过调用 `cleanup()` 方法来显式地清理。如果 _ignore\_cleanup\_errors_ 为真值，则在显式或隐式清理（例如在 Windows 上 [`PermissionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#PermissionError "PermissionError") 移除打开的文件）期间出现的未处理异常将被忽略，并且剩余的可移除条目会被“尽可能”地删除。在其他情况下，错误将在任何上下文清理发生时被引发（如 `cleanup()` 调用，退出上下文管理器、对象被作为垃圾回收或解释器关闭等情况）。

_delete_ 可被用于禁止在退出上下文时清理目录树。 虽然在退出上下文时禁止此操作看起来可能很不常见，但这在进行调试或在你的清理行为需要以其他逻辑为条件时将会很有用处。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `tempfile.mkdtemp` 并附带参数 `fullpath`。

Added in version 3.2.

在 3.10 版本发生变更: 添加了 _ignore\_cleanup\_errors_ 形参。

在 3.12 版本发生变更: 增加了 _delete_ 形参。

tempfile.mkstemp(_suffix\=None_, _prefix\=None_, _dir\=None_, _text\=False_)[¶](#tempfile.mkstemp "Link to this definition")

以尽可能安全的方式创建一个临时文件。假设平台正确地为 [`os.open()`](https://docs.python.org/zh-cn/3/library/os.html#os.open "os.open") 实现了 [`os.O_EXCL`](https://docs.python.org/zh-cn/3/library/os.html#os.O_EXCL "os.O_EXCL") 旗标，则文件的创建不会导致竞争条件。该文件只能由创建它的用户 ID 来读写。如果平台使用权限位来指明文件是否可执行，则文件对任何人均不可执行。

文件描述符 [不会被子进程继承](https://docs.python.org/zh-cn/3/library/os.html#fd-inheritance)。

与 [`TemporaryFile()`](#tempfile.TemporaryFile "tempfile.TemporaryFile") 不同，[`mkstemp()`](#tempfile.mkstemp "tempfile.mkstemp") 的用户要负责关闭文件描述符 (例如使用 [`os.close()`](https://docs.python.org/zh-cn/3/library/os.html#os.close "os.close")) 并删除临时文件 (例如使用 [`os.remove()`](https://docs.python.org/zh-cn/3/library/os.html#os.remove "os.remove"))。

如果 _suffix_ 不是 `None` 则文件名将以该后缀结尾，是 `None` 则没有后缀。[`mkstemp()`](#tempfile.mkstemp "tempfile.mkstemp") 不会在文件名和后缀之间加点，如果需要加一个点号，请将其放在 _suffix_ 的开头。

如果 _prefix_ 不是 `None`，则文件名将以该前缀开头，是 `None` 则使用默认前缀。默认前缀是 [`gettempprefix()`](#tempfile.gettempprefix "tempfile.gettempprefix") 或 [`gettempprefixb()`](#tempfile.gettempprefixb "tempfile.gettempprefixb") 函数的返回值（自动调用合适的函数）。

如果 _dir_ 不为 `None`，则在指定的目录创建文件，是 `None` 则使用默认目录。默认目录是从一个列表中选择出来的，这个列表不同平台不一样，但是用户可以设置 _TMPDIR_、_TEMP_ 或 _TMP_ 环境变量来设置目录的位置。因此，不能保证生成的临时文件路径很规范，比如，通过 `os.popen()` 将路径传递给外部命令时仍需要加引号。

如果 _suffix_、_prefix_ 和 _dir_ 中的任何一个不是 `None`，就要保证它们是同一数据类型。如果它们是 bytes，则返回的名称的类型就是 bytes 而不是 str。如果确实要用默认参数，但又想要返回值是 bytes 类型，请传入 `suffix=b''`.

如果指定了 _text_ 且为真值，文件会以文本模式打开。否则，文件（默认）会以二进制模式打开。

[`mkstemp()`](#tempfile.mkstemp "tempfile.mkstemp") 返回一个元组，元组中第一个元素是句柄，它是一个系统级句柄，指向一个打开的文件（等同于 [`os.open()`](https://docs.python.org/zh-cn/3/library/os.html#os.open "os.open") 的返回值），第二元素是该文件的绝对路径。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `tempfile.mkstemp` 并附带参数 `fullpath`。

在 3.5 版本发生变更: 现在，_suffix_、_prefix_ 和 _dir_ 可以以 bytes 类型按顺序提供，以获得 bytes 类型的返回值。之前只允许使用 str。_suffix_ 和 _prefix_ 现在可以接受 `None`，并且默认为 `None` 以使用合适的默认值。

tempfile.mkdtemp(_suffix\=None_, _prefix\=None_, _dir\=None_)[¶](#tempfile.mkdtemp "Link to this definition")

以最安全的方式创建一个临时目录，创建该目录时不会有竞争的情况。该目录只能由创建者读取、写入和搜索。

[`mkdtemp()`](#tempfile.mkdtemp "tempfile.mkdtemp") 用户用完临时目录后需要自行将其删除。

_prefix_、_suffix_ 和 _dir_ 的含义与它们在 [`mkstemp()`](#tempfile.mkstemp "tempfile.mkstemp") 中的相同。

[`mkdtemp()`](#tempfile.mkdtemp "tempfile.mkdtemp") 返回新目录的绝对路径。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `tempfile.mkdtemp` 并附带参数 `fullpath`。

在 3.5 版本发生变更: 现在，_suffix_、_prefix_ 和 _dir_ 可以以 bytes 类型按顺序提供，以获得 bytes 类型的返回值。之前只允许使用 str。_suffix_ 和 _prefix_ 现在可以接受 `None`，并且默认为 `None` 以使用合适的默认值。

在 3.12 版本发生变更: [`mkdtemp()`](#tempfile.mkdtemp "tempfile.mkdtemp") 现在将始终返回绝对路径，即使 _dir_ 为相对路径。

tempfile.gettempdir()[¶](#tempfile.gettempdir "Link to this definition")

返回放置临时文件的目录的名称。这个方法的返回值就是本模块所有函数的 _dir_ 参数的默认值。

Python 搜索标准目录列表，以找到调用者可以在其中创建文件的目录。这个列表是：

1.  `TMPDIR` 环境变量指向的目录。
    
2.  `TEMP` 环境变量指向的目录。
    
3.  `TMP` 环境变量指向的目录。
    
4.  与平台相关的位置：
    
    -   在 Windows 上，目录为 `%USERPROFILE%\AppData\Local\Temp`, `%SYSTEMROOT%\Temp`, `C:\TEMP`, `C:\TMP`, `\TEMP` 和 `\TMP`，按以上顺序。
        
    -   在所有其他平台上，依次为 `/tmp`、`/var/tmp` 和 `/usr/tmp`。
        
5.  不得已时，使用当前工作目录。
    

搜索的结果会缓存起来，参见下面 [`tempdir`](#tempfile.tempdir "tempfile.tempdir") 的描述。

在 3.10 版本发生变更: 总是返回一个字符串。在之前的版本中它会返回任意 [`tempdir`](#tempfile.tempdir "tempfile.tempdir") 值而不考虑它的类型，只要它不为 `None`。

tempfile.gettempdirb()[¶](#tempfile.gettempdirb "Link to this definition")

与 [`gettempdir()`](#tempfile.gettempdir "tempfile.gettempdir") 相同，但返回值为字节类型。

Added in version 3.5.

tempfile.gettempprefix()[¶](#tempfile.gettempprefix "Link to this definition")

返回用于创建临时文件的文件名前缀，它不包含目录部分。

tempfile.gettempprefixb()[¶](#tempfile.gettempprefixb "Link to this definition")

与 [`gettempprefix()`](#tempfile.gettempprefix "tempfile.gettempprefix") 相同，但返回值为字节类型。

Added in version 3.5.

本模块使用一个全局变量来存储由 [`gettempdir()`](#tempfile.gettempdir "tempfile.gettempdir") 返回的临时文件使用的目录路径。它可被直接设置以覆盖选择过程，但不建议这样做。 本模块中的所有函数都接受一个 _dir_ 参数，它可被用于指定目录。这是不会通过改变全局 API 行为对其他无准备代码造成影响的推荐做法。

tempfile.tempdir[¶](#tempfile.tempdir "Link to this definition")

当设为 `None` 以外的值时，此变量会为本模块中定义的函数的 _dir_ 参数定义默认值，包括确定其类型为字节串还是字符串。它不可以为 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object).

如果在调用除 [`gettempprefix()`](#tempfile.gettempprefix "tempfile.gettempprefix") 外的上述任何函数时 `tempdir` 为 `None` (默认值) 则它会按照 [`gettempdir()`](#tempfile.gettempdir "tempfile.gettempdir") 中所描述的算法来初始化。

备注

请注意如果你将 `tempdir` 设为字节串值，会有一个麻烦的副作用：[`mkstemp()`](#tempfile.mkstemp "tempfile.mkstemp") 和 [`mkdtemp()`](#tempfile.mkdtemp "tempfile.mkdtemp") 的全局默认返回类型会在没有显式提供字符串类型的 `prefix`、`suffix` 或 `dir` 的时候被改为字节串。 请不要编写预期或依赖于此行为的代码。这个笨拙行为是为了保持与历史实现的兼容性。

## 例子[¶](#examples "Link to this heading")

以下是 `tempfile` 模块的一些典型用法示例:

\>>> import tempfile

\# 创建一个临时文件并向其写入一些数据
\>>> fp \= tempfile.TemporaryFile()
\>>> fp.write(b'Hello world!')
\# 从文件读取数据
\>>> fp.seek(0)
\>>> fp.read()
b'Hello world!'
\# 关闭文件，它将被移除
\>>> fp.close()

\# 使用上下文管理器创建一个临时文件
\>>> with tempfile.TemporaryFile() as fp:
...     fp.write(b'Hello world!')
...     fp.seek(0)
...     fp.read()
b'Hello world!'
\>>>
\# 现在文件已被关闭并移除

\# 使用上下文管理器创建一个临时文件
\# 关闭该文件，再使用文件名再次打开该文件
\>>> with tempfile.NamedTemporaryFile(delete\_on\_close\=False) as fp:
...     fp.write(b'Hello world!')
...     fp.close()
... \# 文件已被关闭，但未被移除
... \# 使用文件名再次打开该文件
...     with open(fp.name, mode\='rb') as f:
...         f.read()
b'Hello world!'
\>>>
\# 现在文件已被移除

\# 使用上下文管理器创建一个临时目录
\>>> with tempfile.TemporaryDirectory() as tmpdirname:
...     print('created temporary directory', tmpdirname)
\>>>
\# 目录及其内容已被移除

## 已弃用的函数和变量[¶](#deprecated-functions-and-variables "Link to this heading")

创建临时文件有一种历史方法，首先使用 [`mktemp()`](#tempfile.mktemp "tempfile.mktemp") 函数生成一个文件名，然后使用该文件名创建文件。不幸的是，这是不安全的，因为在调用 `mktemp()` 与随后尝试创建文件的进程之间的时间里，其他进程可能会使用该名称创建文件。解决方案是将两个步骤结合起来，立即创建文件。这个方案目前被 [`mkstemp()`](#tempfile.mkstemp "tempfile.mkstemp") 和上述其他函数所采用。

tempfile.mktemp(_suffix\=''_, _prefix\='tmp'_, _dir\=None_)[¶](#tempfile.mktemp "Link to this definition")

自 2.3 版本弃用: 使用 [`mkstemp()`](#tempfile.mkstemp "tempfile.mkstemp") 来代替。

返回一个绝对路径，这个路径指向的文件在调用本方法时不存在。_prefix_、_suffix_ 和 _dir_ 参数与 [`mkstemp()`](#tempfile.mkstemp "tempfile.mkstemp") 中的同名参数类似，不同之处在于不支持字节类型的文件名，不支持 `suffix=None` 和 `prefix=None`。

警告

使用此功能可能会在程序中引入安全漏洞。当你开始使用本方法返回的文件执行任何操作时，可能有人已经捷足先登了。[`mktemp()`](#tempfile.mktemp "tempfile.mktemp") 的功能可以很轻松地用 [`NamedTemporaryFile()`](#tempfile.NamedTemporaryFile "tempfile.NamedTemporaryFile") 代替，当然需要传递 `delete=False` 参数:

\>>> f \= NamedTemporaryFile(delete\=False)
\>>> f.name
'/tmp/tmptjujjt'
\>>> f.write(b"Hello World!\\n")
13
\>>> f.close()
\>>> os.unlink(f.name)
\>>> os.path.exists(f.name)
False
