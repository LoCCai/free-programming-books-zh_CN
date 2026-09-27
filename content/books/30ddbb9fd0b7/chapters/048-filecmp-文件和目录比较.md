**源代码:** [Lib/filecmp.py](https://github.com/python/cpython/tree/3.14/Lib/filecmp.py)

* * *

`filecmp` 模块定义了用于比较文件及目录的函数，并且可以选取多种关于时间和准确性的折衷方案。 对于文件的比较，另见 [`difflib`](https://docs.python.org/zh-cn/3/library/difflib.html#module-difflib "difflib: Helpers for computing differences between objects.") 模块。

`filecmp` 模块定义了下列函数：

filecmp.cmp(_f1_, _f2_, _shallow\=True_)[¶](#filecmp.cmp "Link to this definition")

比较名为 _f1_ 和 _f2_ 的文件，如果它们似乎相等则返回 `True`，否则返回 `False`。

如果 _shallow_ 为真值且两个文件的 [`os.stat()`](https://docs.python.org/zh-cn/3/library/os.html#os.stat "os.stat") 签名信息（文件类型、大小和修改时间）一致，则文件会被视为相同。

在其他情况下，如果文件大小或内容不同则它们会被视为不同。

需要注意，没有外部程序被该函数调用，这赋予了该函数可移植性与效率。

该函数会缓存过去的比较及其结果，且在文件的 [`os.stat()`](https://docs.python.org/zh-cn/3/library/os.html#os.stat "os.stat") 信息变化后缓存条目失效。所有的缓存可以通过使用 [`clear_cache()`](#filecmp.clear_cache "filecmp.clear_cache") 来清除。

filecmp.cmpfiles(_a_, _b_, _common_, _shallow\=True_)[¶](#filecmp.cmpfiles "Link to this definition")

比较两个目录 _a_ 和 _b_ 中由 _common_ 所给定名字的文件。

返回三组文件名列表： _match_, _mismatch_, _errors_ 。 _match_ 含有相匹配的文件， _mismatch_ 含有那些不匹配的，然后 _errors_ 列出那些未被比较文件的名称。如果文件不存在于两目录中的任一个，或者用户缺少读取它们的权限，又或者因为其他的一些原因而无法比较，那么这些文件将会被列在 _errors_ 中。

参数 _shallow_ 具有同 [`filecmp.cmp()`](#filecmp.cmp "filecmp.cmp") 一致的含义与默认值。

例如，`cmpfiles('a', 'b', ['c', 'd/e'])` 将会比较 `a/c` 与 `b/c` 以及 `a/d/e` 与 `b/d/e`。`'c'` 和 `'d/e'` 将会各自出现在返回的三个列表里的某一个列表中。

filecmp.clear\_cache()[¶](#filecmp.clear_cache "Link to this definition")

清除 filecmp 缓存。当文件在修改后被过快地比较，以至于处于底层文件系统的 mtime 精度范围之内时，该函数可能会很有用。

Added in version 3.4.

## [`dircmp`](#filecmp.dircmp "filecmp.dircmp") 类[¶](#the-dircmp-class "Link to this heading")

_class_ filecmp.dircmp(_a_, _b_, _ignore\=None_, _hide\=None_, _\*_, _shallow\=True_)[¶](#filecmp.dircmp "Link to this definition")

构造一个新的目录比较对象，用来比较目录 _a_ 和 _b_。 _ignore_ 是要忽略的名称列表，且默认为 [`filecmp.DEFAULT_IGNORES`](#filecmp.DEFAULT_IGNORES "filecmp.DEFAULT_IGNORES")。 _hide_ 是要隐藏的名称列表，且默认为 `[os.curdir, os.pardir]`.

[`dircmp`](#filecmp.dircmp "filecmp.dircmp") 类如 [`filecmp.cmp()`](#filecmp.cmp "filecmp.cmp") 所描述的那样默认使用 _shallow_ 形参通过执行 _shallow_ 比较来比较文件。

在 3.13 版本发生变更: 增加了 _shallow_ 形参。

[`dircmp`](#filecmp.dircmp "filecmp.dircmp") 类提供以下方法：

report()[¶](#filecmp.dircmp.report "Link to this definition")

将 _a_ 与 _b_ 之间的比较结果打印 (到 [`sys.stdout`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stdout "sys.stdout"))。

report\_partial\_closure()[¶](#filecmp.dircmp.report_partial_closure "Link to this definition")

打印 _a_ 与 _b_ 及共同直接子目录的比较结果。

report\_full\_closure()[¶](#filecmp.dircmp.report_full_closure "Link to this definition")

打印 _a_ 与 _b_ 及共同子目录比较结果（递归地）。

[`dircmp`](#filecmp.dircmp "filecmp.dircmp") 类提供了一些有趣的属性，用以得到关于参与比较的目录树的各种信息。

请注意通过 [`__getattr__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__getattr__ "object.__getattr__") 钩子，所有的属性都将被惰性求值，因此如果只需使用那些计算简便的属性就不会有速度上的损失。

left[¶](#filecmp.dircmp.left "Link to this definition")

目录 _a_ 。

right[¶](#filecmp.dircmp.right "Link to this definition")

目录 _b_ 。

left\_list[¶](#filecmp.dircmp.left_list "Link to this definition")

经 _hide_ 和 _ignore_ 过滤，目录 _a_ 中的文件与子目录。

right\_list[¶](#filecmp.dircmp.right_list "Link to this definition")

经 _hide_ 和 _ignore_ 过滤，目录 _b_ 中的文件与子目录。

common[¶](#filecmp.dircmp.common "Link to this definition")

同时存在于目录 _a_ 和 _b_ 中的文件和子目录。

left\_only[¶](#filecmp.dircmp.left_only "Link to this definition")

仅在目录 _a_ 中的文件和子目录。

right\_only[¶](#filecmp.dircmp.right_only "Link to this definition")

仅在目录 _b_ 中的文件和子目录。

common\_dirs[¶](#filecmp.dircmp.common_dirs "Link to this definition")

同时存在于目录 _a_ 和 _b_ 中的子目录。

common\_files[¶](#filecmp.dircmp.common_files "Link to this definition")

同时存在于目录 _a_ 和 _b_ 中的文件。

common\_funny[¶](#filecmp.dircmp.common_funny "Link to this definition")

在目录 _a_ 和 _b_ 中类型不同的名字，或者那些 [`os.stat()`](https://docs.python.org/zh-cn/3/library/os.html#os.stat "os.stat") 报告错误的名字。

same\_files[¶](#filecmp.dircmp.same_files "Link to this definition")

在目录 _a_ 和 _b_ 中，使用类的文件比较操作符判定相等的文件。

diff\_files[¶](#filecmp.dircmp.diff_files "Link to this definition")

在目录 _a_ 和 _b_ 中，根据类的文件比较操作符判定内容不等的文件。

funny\_files[¶](#filecmp.dircmp.funny_files "Link to this definition")

在目录 _a_ 和 _b_ 中无法比较的文件。

subdirs[¶](#filecmp.dircmp.subdirs "Link to this definition")

一个将 [`common_dirs`](#filecmp.dircmp.common_dirs "filecmp.dircmp.common_dirs") 中的名称映射到 [`dircmp`](#filecmp.dircmp "filecmp.dircmp") 实例（或者 MyDirCmp 实例，如果该实例类型为 `dircmp` 的子类 MyDirCmp 的话）的字典。

在 3.10 版本发生变更: 在之前版本中字典条目总是为 [`dircmp`](#filecmp.dircmp "filecmp.dircmp") 实例。现在条目将与 _self_ 的类型相同，如果 _self_ 为 `dircmp` 的子类的话。

filecmp.DEFAULT\_IGNORES[¶](#filecmp.DEFAULT_IGNORES "Link to this definition")

Added in version 3.4.

默认被 [`dircmp`](#filecmp.dircmp "filecmp.dircmp") 忽略的目录列表。

下面是一个简单的例子，使用 `subdirs` 属性递归搜索两个目录以显示公共差异文件：

\>>> from filecmp import dircmp
\>>> def print\_diff\_files(dcmp):
...     for name in dcmp.diff\_files:
...         print("diff\_file %s found in %s and %s" % (name, dcmp.left,
...               dcmp.right))
...     for sub\_dcmp in dcmp.subdirs.values():
...         print\_diff\_files(sub\_dcmp)
...
\>>> dcmp \= dircmp('dir1', 'dir2')
\>>> print\_diff\_files(dcmp)
