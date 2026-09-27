**源代码:** [Lib/linecache.py](https://github.com/python/cpython/tree/3.14/Lib/linecache.py)

* * *

`linecache` 模块允许从一个 Python 源文件中获取任意的行，并会尝试使用缓存进行内部优化，常应用于从单个文件读取多行的场合。 此模块被 [`traceback`](https://docs.python.org/zh-cn/3/library/traceback.html#module-traceback "traceback: Print or retrieve a stack traceback.") 模块用来提取源码行以便包含在已格式化的回溯中。

[`tokenize.open()`](https://docs.python.org/zh-cn/3/library/tokenize.html#tokenize.open "tokenize.open") 函数被用于打开文件。 此函数使用 [`tokenize.detect_encoding()`](https://docs.python.org/zh-cn/3/library/tokenize.html#tokenize.detect_encoding "tokenize.detect_encoding") 来获取文件的编码格式；如果未指明编码格式，则默认编码为 UTF-8。

`linecache` 模块定义了下列函数：

linecache.getline(_filename_, _lineno_, _module\_globals\=None_)[¶](#linecache.getline "Link to this definition")

从名为 _filename_ 的文件中获取 _lineno_ 行，此函数绝不会引发异常 --- 出现错误时它将返回 `''` (所有找到的行都将包含换行符作为结束)。

如果 _filename_ 指向一个冻结模块（以 `'<frozen '` 打头），此函数将在 _module\_globals_ 不为 `None` 时尝试从 `module_globals['__file__']` 获取真实文件名。

如果找不到名为 _filename_ 的文件，此函数会先在 _module\_globals_ 中检查 [**PEP 302**](https://peps.python.org/pep-0302/) `__loader__`。 如果存在这样的加载器并且它定义了 `get_source` 方法，则由该方法来确定源行 (如果 `get_source()` 返回 `None`，则该函数返回 `''`)。 最后，如果 _filename_ 是一个相对路径文件名，则它会在模块搜索路径 `sys.path` 中按条目的相对位置进行查找。

在 3.14 版本发生变更: 支持已冻结模块的 _filename_。

linecache.clearcache()[¶](#linecache.clearcache "Link to this definition")

清空缓存。 如果你不再需要之前使用 [`getline()`](#linecache.getline "linecache.getline") 从文件读取的行即可使用此函数。

linecache.checkcache(_filename\=None_)[¶](#linecache.checkcache "Link to this definition")

检查缓存有效性。 如果缓存中的文件在磁盘上发生了改变，而你需要更新后的版本即可使用此函数。 如果省略了 _filename_，它会检查缓存中的所有条目。

linecache.lazycache(_filename_, _module\_globals_)[¶](#linecache.lazycache "Link to this definition")

捕获有关某个非基于文件的模块的足够细节信息，以允许稍后再通过 [`getline()`](#linecache.getline "linecache.getline") 来获取其中的行，即使当稍后调用时 _module\_globals_ 为 `None`。 这可以避免在实际需要读取行之前执行 I/O，也不必始终保持模块全局变量。

Added in version 3.5.

示例:

\>>> import linecache
\>>> linecache.getline(linecache.\_\_file\_\_, 8)
'import sys\\n'
