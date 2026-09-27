**源代码:** [Lib/glob.py](https://github.com/python/cpython/tree/3.14/Lib/glob.py)

* * *

`glob` 模块会使用与 Unix shell 类似的模式匹配规则来查找路径名称。波浪号扩展不会生效，但 `*`, `?` 以及用 `[]` 表示的字符范围将被正确地匹配。这是通过配合使用 [`os.scandir()`](https://docs.python.org/zh-cn/3/library/os.html#os.scandir "os.scandir") 和 [`fnmatch.fnmatch()`](https://docs.python.org/zh-cn/3/library/fnmatch.html#fnmatch.fnmatch "fnmatch.fnmatch") 函数完成的，而不是通过实际唤起子 shell。

备注

路径名称不会以特定的顺序返回。如果你需要特定的顺序，请对结果进行排序。

By default, files beginning with a dot (`.`) can only be matched by patterns that also start with a dot, unlike [`fnmatch.fnmatch()`](https://docs.python.org/zh-cn/3/library/fnmatch.html#fnmatch.fnmatch "fnmatch.fnmatch") or [`pathlib.Path.glob()`](https://docs.python.org/zh-cn/3/library/pathlib.html#pathlib.Path.glob "pathlib.Path.glob"). For tilde and shell variable expansion, use [`os.path.expanduser()`](https://docs.python.org/zh-cn/3/library/os.path.html#os.path.expanduser "os.path.expanduser") and [`os.path.expandvars()`](https://docs.python.org/zh-cn/3/library/os.path.html#os.path.expandvars "os.path.expandvars").

对于字面值匹配，请将元字符用方括号括起来。例如，`'[?]'` 将匹配字符 `'?'`。

`glob` 模块定义了下列函数：

glob.glob(_pathname_, _\*_, _root\_dir\=None_, _dir\_fd\=None_, _recursive\=False_, _include\_hidden\=False_)[¶](#glob.glob "Link to this definition")

返回一个匹配 _pathname_ 的可能为空的路径名列表，其中的元素必须为包含路径信息的字符串。 _pathname_ 可以是绝对路径 (如 `/usr/src/Python-1.5/Makefile`) 或相对路径 (如 `../../Tools/*/*.gif`)，并可包含 shell 风格的通配符。无效的符号链接也将包括在结果中 (如像在 shell 中一样)。结果是否排序取决于具体文件系统。如果某个符合条件的文件在调用此函数期间被移除或添加，是否包括该文件的路径是没有规定的。

如果 _root\_dir_ 不为 `None`，则它应当是一个指明要搜索的根目录的 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object)。它在 `glob()` 上与在调用它之前改变当前目录有相同的效果。如果 _pathname_ 为相对路径，结果将包含相对于 _root\_dir_ 的路径。

本函数带有 _dir\_fd_ 参数，支持 [基于目录描述符的相对路径](https://docs.python.org/zh-cn/3/library/os.html#dir-fd)。

If _recursive_ is true, the pattern "`**`" will match any files and zero or more directories, subdirectories and symbolic links to directories. If the pattern is followed by an [`os.sep`](https://docs.python.org/zh-cn/3/library/os.html#os.sep "os.sep") or [`os.altsep`](https://docs.python.org/zh-cn/3/library/os.html#os.altsep "os.altsep") then files will not match.

If _include\_hidden_ is true, wildcards can match path segments that begin with a dot (`.`).

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `glob.glob` 并附带参数 `pathname`, `recursive`。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `glob.glob/2` 并附带参数 `pathname`, `recursive`, `root_dir`, `dir_fd`.

备注

在一个较大的目录树中使用 "`**`" 模式可能会消耗非常多的时间。

备注

如果 _pathname_ 包含多个 "`**`" 模式并且 _recursive_ 为真值则此函数可能返回重复的路径名。

在 3.5 版本发生变更: 支持使用 "`**`" 的递归 glob。

在 3.10 版本发生变更: 添加了 _root\_dir_ 和 _dir\_fd_ 形参。

在 3.11 版本发生变更: 增加了 _include\_hidden_ 形参。

glob.iglob(_pathname_, _\*_, _root\_dir\=None_, _dir\_fd\=None_, _recursive\=False_, _include\_hidden\=False_)[¶](#glob.iglob "Link to this definition")

返回一个 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator)，它会产生与 [`glob()`](#module-glob "glob: Unix shell style pathname pattern expansion.") 相同的结果，但不会实际地同时保存它们。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `glob.glob` 并附带参数 `pathname`, `recursive`。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `glob.glob/2` 并附带参数 `pathname`, `recursive`, `root_dir`, `dir_fd`.

备注

如果 _pathname_ 包含多个 "`**`" 模式并且 _recursive_ 为真值则此函数可能返回重复的路径名。

在 3.5 版本发生变更: 支持使用 "`**`" 的递归 glob。

在 3.10 版本发生变更: 添加了 _root\_dir_ 和 _dir\_fd_ 形参。

在 3.11 版本发生变更: 增加了 _include\_hidden_ 形参。

glob.escape(_pathname_)[¶](#glob.escape "Link to this definition")

Escape all special characters (`'?'`, `'*'` and `'['`). This is useful if you want to match an arbitrary literal string that may have special characters in it. Special characters in drive/UNC sharepoints are not escaped, for example on Windows `escape('//?/c:/Quo vadis?.txt')` returns `'//?/c:/Quo vadis[?].txt'`.

Added in version 3.4.

glob.translate(_pathname_, _\*_, _recursive\=False_, _include\_hidden\=False_, _seps\=None_)[¶](#glob.translate "Link to this definition")

将给定的路径规格说明转换为一个正则表达式供 [`re.match()`](https://docs.python.org/zh-cn/3/library/re.html#re.match "re.match") 使用。路径规格说明可以包含 shell 风格的通配符。

例如：

\>>> import glob, re
\>>>
\>>> regex \= glob.translate('\*\*/\*.txt', recursive\=True, include\_hidden\=True)
\>>> regex
'(?s:(?:.+/)?\[^/\]\*\\\\.txt)\\\\z'
\>>> reobj \= re.compile(regex)
\>>> reobj.match('foo/bar/baz.txt')
<re.Match object; span=(0, 15), match='foo/bar/baz.txt'>

路径分隔符与部件对该函数是有意义的，这与 [`fnmatch.translate()`](https://docs.python.org/zh-cn/3/library/fnmatch.html#fnmatch.translate "fnmatch.translate") 不同。在默认情况下通配符不会匹配路径分隔符，而 `*` 模式部件将精确匹配一个路径部件。

如果 _recursive_ 为真值，则模式部件 "`**`" 将匹配任意数量的路径部件。

如果 _include\_hidden_ 为真值，则通配符可以匹配以点号 (`.`) 打头的路径部件。

可以向 _seps_ 参数提供一个由路径分隔符组成的序列。如果未给出，则将使用 [`os.sep`](https://docs.python.org/zh-cn/3/library/os.html#os.sep "os.sep") 和 [`altsep`](https://docs.python.org/zh-cn/3/library/os.html#os.altsep "os.altsep") (如果可用)。

Added in version 3.13.

## 例子[¶](#examples "Link to this heading")

考虑一个包含以下文件的目录：`1.gif`, `2.txt`, `card.gif` 以及一个子目录 `sub` 且其中只包含一个文件 `3.txt`。 [`glob()`](#module-glob "glob: Unix shell style pathname pattern expansion.") 将产生如下结果。 请注意路径的任何开头部件都将被保留。

\>>> import glob
\>>> glob.glob('./\[0-9\].\*')
\['./1.gif', './2.txt'\]
\>>> glob.glob('\*.gif')
\['1.gif', 'card.gif'\]
\>>> glob.glob('?.gif')
\['1.gif'\]
\>>> glob.glob('\*\*/\*.txt', recursive\=True)
\['2.txt', 'sub/3.txt'\]
\>>> glob.glob('./\*\*/', recursive\=True)
\['./', './sub/'\]

如果目录包含以 `.` 打头的文件，它们默认将不会被匹配。例如，考虑一个包含 `card.gif` 和 `.card.gif` 的目录:

\>>> import glob
\>>> glob.glob('\*.gif')
\['card.gif'\]
\>>> glob.glob('.c\*')
\['.card.gif'\]

参见

[`fnmatch`](https://docs.python.org/zh-cn/3/library/fnmatch.html#module-fnmatch "fnmatch: Unix shell style filename pattern matching.") 模块提供了 shell 风格的文件名（而非路径）扩展。
