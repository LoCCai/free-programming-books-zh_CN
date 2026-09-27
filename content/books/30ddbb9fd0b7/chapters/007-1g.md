**源代码:** [Lib/difflib.py](https://github.com/python/cpython/tree/3.14/Lib/difflib.py)

* * *

This module provides classes and functions for comparing sequences. Most of them compare sequences of text lines (for example lists of strings, or [file objects](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)) and produce _diffs_ -- reports on the differences. Diffs can be produced in various formats, including HTML and context and unified diffs -- formats produced by tools like _[diff](https://manpages.debian.org/diff\(1\))_ and _[git diff](https://manpages.debian.org/git-diff\(1\))_.

比较操作是使用在 [`SequenceMatcher`](#difflib.SequenceMatcher "difflib.SequenceMatcher") 中实现的匹配算法完成的 -- 这个灵活的类可用于比较任意类型的序列对，而不仅限于文本，只要序列元素是 [hashable](https://docs.python.org/zh-cn/3/glossary.html#term-hashable) 对象即可。

## junk 启发方式[¶](#junk-heuristic "Link to this heading")

`difflib` 会使用 _junk_ 启发方式：某些项会被视为 _junk_，并在搜索相似项时将被忽略。 在理想情况下，这些项是无价值的或常见的条目，比如空行或空白符等。

This heuristic can speed the algorithm up (because it reduces the number of possible combinations) and it can produce results that are more understandable for humans (typically breaking on whitespace). But it can also cause pathological cases:

-   Inappropriately chosen junk items can cause an unexpectedly **large** (but still correct) result.
    
-   The default heuristic is **asymmetric**: only the second sequence is inspected when determining what is considered junk, so comparing A to B can give different results than comparing B to A and reversing the result.
    

By default, if the second input sequence is at least 200 items long, items that account for more than 1% it are considered _junk_.

Depending on your data, you should consider turning this heuristic off (setting [`SequenceMatcher`](#difflib.SequenceMatcher "difflib.SequenceMatcher")'s _autojunk_ argument to `False`) or tuning it (using the _isjunk_ argument, perhaps to one of the [predefined functions](#difflib-isjunk-functions)).

## The `difflib` algorithm[¶](#the-difflib-algorithm "Link to this heading")

The algorithm used in [`SequenceMatcher`](#difflib.SequenceMatcher "difflib.SequenceMatcher") predates, and is a little fancier than, an algorithm published in the late 1980s by Ratcliff and Obershelp under the hyperbolic name "gestalt pattern matching." The idea is to find the longest contiguous subsequence common to both inputs, then recursively handle the pieces of the sequences to the left and to the right of the matching subsequence.

参见

[模式匹配：格式塔方法](https://jacobfilipp.com/DrDobbs/articles/DDJ/1988/8807/8807c/8807c.htm)

John W. Ratcliff 和 D. E. Metzener 对一种类似算法的讨论，该文章发表于 1988 年 7 月的《Dr. Dobb's Journal》杂志。

As an extension to the Ratcliff and Obershelp algorithm, `difflib` searches for the longest _junk-free_ contiguous subsequence. See the [junk 启发方式](#difflib-junk) section for details.

**CPython 实现细节：** Timing

The basic Ratcliff-Obershelp algorithm is cubic time in the worst case and quadratic time in the expected case. `difflib`'s algorithm is quadratic time for the worst case and has expected-case behavior dependent in a complicated way on how many elements the sequences have in common; best case time is linear.

## Diff 生成[¶](#diff-generation "Link to this heading")

_class_ difflib.Differ[¶](#difflib.Differ "Link to this definition")

这个类的作用是比较由文本行组成的序列，并产生可供人阅读的差异或增量信息。Differ 统一使用 [`SequenceMatcher`](#difflib.SequenceMatcher "difflib.SequenceMatcher") 来完成行序列的比较以及相似（接近匹配）行内部字符序列的比较。

[`Differ`](#difflib.Differ "difflib.Differ") 增量的每一行均以双字母代码打头：

| 
双字母代码

 | 

含意

 |
| --- | --- |
| 

`'- '`

 | 

行为序列 1 所独有

 |
| 

`'+ '`

 | 

行为序列 2 所独有

 |
| 

`'  '`

 | 

行在两序列中相同

 |
| 

`'? '`

 | 

行不存在于任一输入序列

 |

以 '`?`' 打头的行尝试将视线引导至行内差异，这些行不存在于任一输入序列中。 如果序列包含空白符，例如空格、制表或换行则这些行可能会令人感到迷惑。

Note that `Differ`\-generated deltas make no claim to be **minimal** diffs. To the contrary, minimal diffs are often counter-intuitive for humans, because they synch up anywhere possible, sometimes at accidental matches 100 pages apart. Restricting synch points to contiguous matches preserves some notion of locality, at the occasional cost of producing a longer diff.

[`Differ`](#difflib.Differ "difflib.Differ") 类具有这样的构造器：

\_\_init\_\_(_linejunk\=None_, _charjunk\=None_)[¶](#difflib.Differ.__init__ "Link to this definition")

可选关键字形参 _linejunk_ 和 _charjunk_ 均为过滤函数 (或为 `None`)：

_linejunk_: 接受单个字符串作为参数的函数，如果其为垃圾字符串则返回真值。默认值为 `None`，意味着没有任何行会被视为垃圾行。

_charjunk_: 接受单个字符（长度为 1 的字符串）作为参数的函数，如果其为垃圾字符则返回真值。默认值为 `None`，意味着没有任何字符会被视为垃圾字符。

这些垃圾过滤函数可加快查找差异的匹配速度，并且不会导致任何差异行或字符被忽略。请阅读 [`find_longest_match()`](#difflib.SequenceMatcher.find_longest_match "difflib.SequenceMatcher.find_longest_match") 方法的 _isjunk_ 形参的描述了解详情。

[`Differ`](#difflib.Differ "difflib.Differ") 对象是通过一个单独方法来使用（生成增量）的：

compare(_a_, _b_)[¶](#difflib.Differ.compare "Link to this definition")

比较两个由行组成的序列，并生成增量（一个由行组成的序列）。

Each sequence must contain individual single-line strings ending with newlines. Such sequences can be obtained from the [`readlines()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.readlines "io.IOBase.readlines") method of file-like objects. The generated delta also consists of newline-terminated strings, ready to be printed as-is via the [`writelines()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.writelines "io.IOBase.writelines") method of a file-like object.

_class_ difflib.HtmlDiff[¶](#difflib.HtmlDiff "Link to this definition")

这个类可用于创建 HTML 表格（或包含表格的完整 HTML 文件）以并排地逐行显示文本比较，行间与行内的更改将突出显示。 此表格可以基于完全或上下文差异模式来生成。

警告

The trailing newlines get stripped before the diff, so the result can be incomplete. See [gh-71896](https://github.com/python/cpython/issues/71896) for details.

这个类的构造函数：

\_\_init\_\_(_tabsize\=8_, _wrapcolumn\=None_, _linejunk\=None_, _charjunk\=IS\_CHARACTER\_JUNK_)[¶](#difflib.HtmlDiff.__init__ "Link to this definition")

初始化 [`HtmlDiff`](#difflib.HtmlDiff "difflib.HtmlDiff") 的实例。

_tabsize_ 是一个可选关键字参数，指定制表位的间隔，默认值为 `8`。

_wrapcolumn_ 是一个可选关键字参数，指定行文本自动打断并换行的列位置，默认值为 `None` 表示不自动换行。

_linejunk_ 和 _charjunk_ 均是可选关键字参数，会传入 [`ndiff()`](#difflib.ndiff "difflib.ndiff") (被 [`HtmlDiff`](#difflib.HtmlDiff "difflib.HtmlDiff") 用来生成并排显示的 HTML 差异)。 请参阅 `ndiff()` 文档了解参数默认值及其说明。

下列是公开的方法

make\_file(_fromlines_, _tolines_, _fromdesc\=''_, _todesc\=''_, _context\=False_, _numlines\=5_, _\*_, _charset\='utf-8'_)[¶](#difflib.HtmlDiff.make_file "Link to this definition")

比较 _fromlines_ 和 _tolines_ (字符串列表) 并返回一个字符串，表示一个完整 HTML 文件，其中包含各行差异的表格，行间与行内的更改将突出显示。

_fromdesc_ 和 _todesc_ 均是可选关键字参数，指定来源/目标文件的列标题字符串（默认均为空白字符串）。

_context_ 和 _numlines_ 均是可选关键字参数。当只要显示上下文差异时就将 _context_ 设为 `True`，否则默认值 `False` 为显示完整文件。 _numlines_ 默认为 `5`。当 _context_ 为 `True` 时 _numlines_ 将控制围绕突出显示差异部分的上下文行数。当 _context_ 为 `False` 时 _numlines_ 将控制在使用 "next" 超链接时突出显示差异部分之前所显示的行数（设为零则会导致 "next" 超链接将下一个突出显示差异部分放在浏览器顶端，不添加任何前导上下文）。

备注

_fromdesc_ 和 _todesc_ 会被当作未转义的 HTML 来解读，当接收不可信来源的输入时应该适当地进行转义。

在 3.5 版本发生变更: 增加了 _charset_ 关键字参数。HTML 文档的默认字符集从 `'ISO-8859-1'` 更改为 `'utf-8'`。

make\_table(_fromlines_, _tolines_, _fromdesc\=''_, _todesc\=''_, _context\=False_, _numlines\=5_)[¶](#difflib.HtmlDiff.make_table "Link to this definition")

比较 _fromlines_ 和 _tolines_ (字符串列表) 并返回一个字符串，表示一个包含各行差异的完整 HTML 表格，行间与行内的更改将突出显示。

此方法的参数与 [`make_file()`](#difflib.HtmlDiff.make_file "difflib.HtmlDiff.make_file") 方法的相同。

difflib.context\_diff(_a_, _b_, _fromfile\=''_, _tofile\=''_, _fromfiledate\=''_, _tofiledate\=''_, _n\=3_, _lineterm\='\\n'_)[¶](#difflib.context_diff "Link to this definition")

比较 _a_ 和 _b_ (字符串列表)；返回上下文差异格式的增量信息 (一个产生增量行的 [generator](https://docs.python.org/zh-cn/3/glossary.html#term-generator))。

所谓上下文差异是一种只显示有更改的行再加几个上下文行的紧凑形式。更改被显示为之前/之后的样式。上下文行数由 _n_ 设定，默认为三行。

默认情况下，差异控制行（以 `***` 或 `---` 表示）是通过末尾换行符来创建的。这样做的好处是从 [`io.IOBase.readlines()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.readlines "io.IOBase.readlines") 创建的输入将得到适用于 [`io.IOBase.writelines()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.writelines "io.IOBase.writelines") 的差异信息，因为输入和输出都带有末尾换行符。

对于没有末尾换行符的输入，应将 _lineterm_ 参数设为 `""`，这样输出内容将统一不带换行符。

上下文差异格式通常带有一个记录文件名和修改时间的标头。这些信息的部分或全部可以使用字符串 _fromfile_, _tofile_, _fromfiledate_ 和 _tofiledate_ 来指定。修改时间通常以 ISO 8601 格式表示。如果未指定，这些字符串默认为空。

\>>> import sys
\>>> from difflib import \*
\>>> s1 \= \['bacon\\n', 'eggs\\n', 'ham\\n', 'guido\\n'\]
\>>> s2 \= \['python\\n', 'eggy\\n', 'hamster\\n', 'guido\\n'\]
\>>> sys.stdout.writelines(context\_diff(s1, s2, fromfile\='before.py',
...                        tofile\='after.py'))
\*\*\* before.py
\--- after.py
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
\*\*\* 1,4 \*\*\*\*
! bacon
! eggs
! ham
  guido
\--- 1,4 ----
! python
! eggy
! hamster
  guido

请参阅 [difflib 的命令行接口](#difflib-interface) 获取更详细的示例。

difflib.get\_close\_matches(_word_, _possibilities_, _n\=3_, _cutoff\=0.6_)[¶](#difflib.get_close_matches "Link to this definition")

返回由最佳“近似”匹配构成的列表。 _word_ 为一个指定目标近似匹配的序列（通常为字符串），_possibilities_ 为一个由用于匹配 _word_ 的序列构成的列表（通常为字符串列表）。

可选参数 _n_ (默认为 `3`) 指定最多返回多少个近似匹配； _n_ 必须大于 `0`.

可选参数 _cutoff_ (默认为 `0.6`) 是一个 \[0, 1\] 范围内的浮点数。与 _word_ 相似度得分未达到该值的候选匹配将被忽略。

候选匹配中（不超过 _n_ 个）的最佳匹配将以列表形式返回，按相似度得分排序，最相似的排在最前面。

\>>> get\_close\_matches('appel', \['ape', 'apple', 'peach', 'puppy'\])
\['apple', 'ape'\]
\>>> import keyword
\>>> get\_close\_matches('wheel', keyword.kwlist)
\['while'\]
\>>> get\_close\_matches('pineapple', keyword.kwlist)
\[\]
\>>> get\_close\_matches('accept', keyword.kwlist)
\['except'\]

difflib.ndiff(_a_, _b_, _linejunk\=None_, _charjunk\=IS\_CHARACTER\_JUNK_)[¶](#difflib.ndiff "Link to this definition")

比较 _a_ 和 _b_ (字符串列表)；返回 [`Differ`](#difflib.Differ "difflib.Differ") 形式的增量信息 (一个产生增量行的 [generator](https://docs.python.org/zh-cn/3/glossary.html#term-generator)).

可选关键字形参 _linejunk_ 和 _charjunk_ 均为过滤函数 (或为 `None`)：

_linejunk_: 此函数接受单个字符串参数，如果其为垃圾字符串则返回真值，否则返回假值。默认值为 `None`。此外还有一个模块层级的函数 [`IS_LINE_JUNK()`](#difflib.IS_LINE_JUNK "difflib.IS_LINE_JUNK")，它会过滤掉没有可见字符的行，除非该行添加了至多一个井号符 (`'#'`) -- 不过下层的 [`SequenceMatcher`](#difflib.SequenceMatcher "difflib.SequenceMatcher") 类会动态分析哪些行的重复频繁到足以形成噪音，这通常会比使用此函数效果更好。

_charjunk_: 此函数接受一个字符（长度为 1 的字符串)，如果其为垃圾字符则返回真值，否则返回假值。默认为模块层级的函数 [`IS_CHARACTER_JUNK()`](#difflib.IS_CHARACTER_JUNK "difflib.IS_CHARACTER_JUNK")，它会过滤掉空白字符（空格符或制表符；但包含换行符可不是个好主意！）。

\>>> diff \= ndiff('one\\ntwo\\nthree\\n'.splitlines(keepends\=True),
...              'ore\\ntree\\nemu\\n'.splitlines(keepends\=True))
\>>> print(''.join(diff), end\="")
\- one
?  ^
\+ ore
?  ^
\- two
\- three
?  -
\+ tree
\+ emu

difflib.restore(_sequence_, _which_)[¶](#difflib.restore "Link to this definition")

返回两个序列中产生增量的那一个。

给出一个由 [`Differ.compare()`](#difflib.Differ.compare "difflib.Differ.compare") 或 [`ndiff()`](#difflib.ndiff "difflib.ndiff") 产生的 _序列_，提取出来自文件 1 或 2 (_which_ 形参) 的行，去除行前缀。

示例：

\>>> diff \= ndiff('one\\ntwo\\nthree\\n'.splitlines(keepends\=True),
...              'ore\\ntree\\nemu\\n'.splitlines(keepends\=True))
\>>> diff \= list(diff) \# materialize the generated delta into a list
\>>> print(''.join(restore(diff, 1)), end\="")
one
two
three
\>>> print(''.join(restore(diff, 2)), end\="")
ore
tree
emu

difflib.unified\_diff(_a_, _b_, _fromfile\=''_, _tofile\=''_, _fromfiledate\=''_, _tofiledate\=''_, _n\=3_, _lineterm\='\\n'_)[¶](#difflib.unified_diff "Link to this definition")

比较 _a_ 和 _b_ (字符串列表)；返回统一差异格式的增量信息 (一个产生增量行的 [generator](https://docs.python.org/zh-cn/3/glossary.html#term-generator))。

所谓统一差异是一种只显示有更改的行再加几个上下文行的紧凑形式。更改被显示为内联的样式（而不是分开的之前/之后文本块）。上下文行数由 _n_ 设定，默认为三行。

默认情况下，差异控制行 (以 `---`, `+++` 或 `@@` 表示) 是通过末尾换行符来创建的。这样做的好处是从 [`io.IOBase.readlines()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.readlines "io.IOBase.readlines") 创建的输入将得到适用于 [`io.IOBase.writelines()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.writelines "io.IOBase.writelines") 的差异信息，因为输入和输出都带有末尾换行符。

对于没有末尾换行符的输入，应将 _lineterm_ 参数设为 `""`，这样输出内容将统一不带换行符。

统一的差异格式通常带有一个记录文件名和修改时间的标头。这些信息的部分或全部可以使用字符串 _fromfile_, _tofile_, _fromfiledate_ 和 _tofiledate_ 来指定。修改时间通常以 ISO 8601 格式表示。如果未指定，这些字符串将默认为空。

\>>> s1 \= \['bacon\\n', 'eggs\\n', 'ham\\n', 'guido\\n'\]
\>>> s2 \= \['python\\n', 'eggy\\n', 'hamster\\n', 'guido\\n'\]
\>>> sys.stdout.writelines(unified\_diff(s1, s2, fromfile\='before.py', tofile\='after.py'))
\--- before.py
+++ after.py
@@ -1,4 +1,4 @@
\-bacon
\-eggs
\-ham
+python
+eggy
+hamster
 guido

请参阅 [difflib 的命令行接口](#difflib-interface) 获取更详细的示例。

difflib.diff\_bytes(_dfunc_, _a_, _b_, _fromfile\=b''_, _tofile\=b''_, _fromfiledate\=b''_, _tofiledate\=b''_, _n\=3_, _lineterm\=b'\\n'_)[¶](#difflib.diff_bytes "Link to this definition")

使用 _dfunc_ 比较 _a_ 和 _b_ (字节串对象列表)；产生以 _dfunc_ 所返回格式表示的差异行列表（也是字节串）。 _dfunc_ 必须是可调用对象，通常为 [`unified_diff()`](#difflib.unified_diff "difflib.unified_diff") 或 [`context_diff()`](#difflib.context_diff "difflib.context_diff")。

允许你比较编码未知或不一致的数据。除 _n_ 之外的所有输入都必须为字节串对象而非字符串。作用方式为无损地将所有输入 (除 _n_ 之外) 转换为字符串，并调用 `dfunc(a, b, fromfile, tofile, fromfiledate, tofiledate, n, lineterm)`。 _dfunc_ 的输出会被随即转换回字节串，这样你所得到的增量行将具有与 _a_ 和 _b_ 相同的未知/不一致编码。

Added in version 3.5.

## Junk definition functions[¶](#junk-definition-functions "Link to this heading")

difflib.IS\_LINE\_JUNK(_line_)[¶](#difflib.IS_LINE_JUNK "Link to this definition")

对于可忽略的行返回 `True`。如果 _line_ 为空行或只包含单个 `'#'` 则 _line_ 行就是可忽略的，否则就是不可忽略的。 此函数被用作较旧版本 [`ndiff()`](#difflib.ndiff "difflib.ndiff") 中 _linejunk_ 形参的默认值。

difflib.IS\_CHARACTER\_JUNK(_ch_)[¶](#difflib.IS_CHARACTER_JUNK "Link to this definition")

对于可忽略的字符返回 `True`。字符 _ch_ 如果为空格符或制表符则 _ch_ 就是可忽略的，否则就是不可忽略的。此函数被用作 [`ndiff()`](#difflib.ndiff "difflib.ndiff") 中 _charjunk_ 形参的默认值。

## SequenceMatcher objects[¶](#sequencematcher-objects "Link to this heading")

_class_ difflib.SequenceMatcher(_isjunk\=None_, _a\=''_, _b\=''_, _autojunk\=True_)[¶](#difflib.SequenceMatcher "Link to this definition")

可选参数 _isjunk_ 必须为 `None` (默认值) 或为接受一个序列元素并当且仅当其为应忽略的“垃圾”元素时返回真值的单参数函数。传入 `None` 作为 _isjunk_ 的值就相当于传入 `lambda x: False`；也就是说不忽略任何值。 例如，传入:

lambda x: x in " \\t"

如果你以字符序列的形式对行进行比较，并且不希望在空格符或硬制表符上进行同步。

可选参数 _a_ 和 _b_ 为要比较的序列；两者默认为空字符串。两个序列的元素都必须为 [hashable](https://docs.python.org/zh-cn/3/glossary.html#term-hashable)。

可选参数 _autojunk_ 可用于禁用自动垃圾启发式计算。

在 3.2 版本发生变更: 增加了 _autojunk_ 形参。

SequenceMatcher 对象接受三个数据属性：_bjunk_ 是 _b_ 当中 _isjunk_ 为 `True` 的元素集合；_bpopular_ 是被启发式计算（如果其未被禁用）视为热门候选的非垃圾元素集合；_b2j_ 是将 _b_ 当中剩余元素映射到一个它们出现位置列表的字典。所有三个数据属性将在 _b_ 通过 [`set_seqs()`](#difflib.SequenceMatcher.set_seqs "difflib.SequenceMatcher.set_seqs") 或 [`set_seq2()`](#difflib.SequenceMatcher.set_seq2 "difflib.SequenceMatcher.set_seq2") 重置时被重置。

Added in version 3.2: _bjunk_ 和 _bpopular_ 属性。

[`SequenceMatcher`](#difflib.SequenceMatcher "difflib.SequenceMatcher") 对象具有以下方法：

set\_seqs(_a_, _b_)[¶](#difflib.SequenceMatcher.set_seqs "Link to this definition")

设置要比较的两个序列。

[`SequenceMatcher`](#difflib.SequenceMatcher "difflib.SequenceMatcher") 计算并缓存有关第二个序列的详细信息，这样如果你想要将一个序列与多个序列进行比较，可使用 [`set_seq2()`](#difflib.SequenceMatcher.set_seq2 "difflib.SequenceMatcher.set_seq2") 一次性地设置该常用序列并重复地对每个其他序列各调用一次 [`set_seq1()`](#difflib.SequenceMatcher.set_seq1 "difflib.SequenceMatcher.set_seq1")。

set\_seq1(_a_)[¶](#difflib.SequenceMatcher.set_seq1 "Link to this definition")

设置要比较的第一个序列。要比较的第二个序列不会改变。

set\_seq2(_b_)[¶](#difflib.SequenceMatcher.set_seq2 "Link to this definition")

设置要比较的第二个序列。要比较的第一个序列不会改变。

find\_longest\_match(_alo\=0_, _ahi\=None_, _blo\=0_, _bhi\=None_)[¶](#difflib.SequenceMatcher.find_longest_match "Link to this definition")

找出 `a[alo:ahi]` 和 `b[blo:bhi]` 中的最长匹配块。

如果 _isjunk_ 被省略或为 `None`，[`find_longest_match()`](#difflib.SequenceMatcher.find_longest_match "difflib.SequenceMatcher.find_longest_match") 将返回 `(i, j, k)` 使得 `a[i:i+k]` 等于 `b[j:j+k]`，其中 `alo <= i <= i+k <= ahi` 并且 `blo <= j <= j+k <= bhi`。对于所有满足这些条件的 `(i', j', k')`，如果 `i == i'`, `j <= j'` 也被满足，则附加条件 `k >= k'`, `i <= i'`。换句话说，对于所有最长匹配块，返回在 _a_ 当中最先出现的一个，而对于在 _a_ 当中最先出现的所有最长匹配块，则返回在 _b_ 当中最先出现的一个。

\>>> s \= SequenceMatcher(None, " abcd", "abcd abcd")
\>>> s.find\_longest\_match(0, 5, 0, 9)
Match(a=0, b=4, size=5)

如果提供了 _isjunk_，将按上述规则确定第一个最长匹配块，但额外附加不允许块内出现垃圾元素的限制。 然后将通过（仅）匹配两边的垃圾元素来尽可能地扩展该块。这样结果块绝对不会匹配垃圾元素，除非同样的垃圾元素正好与有意义的匹配相邻。

这是与之前相同的例子，但是将空格符视为垃圾。这将防止 `' abcd'` 直接与第二个序列末尾的 `' abcd'` 相匹配。而只可以匹配 `'abcd'`，并且是匹配第二个序列最左边的 `'abcd'`：

\>>> s \= SequenceMatcher(lambda x: x\==" ", " abcd", "abcd abcd")
\>>> s.find\_longest\_match(0, 5, 0, 9)
Match(a=1, b=0, size=4)

如果未找到匹配块，此方法将返回 `(alo, blo, 0)`。

此方法将返回一个 [named tuple](https://docs.python.org/zh-cn/3/glossary.html#term-named-tuple) `Match(a, b, size)`。

在 3.9 版本发生变更: 加入默认参数。

get\_matching\_blocks()[¶](#difflib.SequenceMatcher.get_matching_blocks "Link to this definition")

返回描述非重叠匹配子序列的三元组列表。每个三元组的形式为 `(i, j, n)`，其含义为 `a[i:i+n] == b[j:j+n]`。 这些三元组按 _i_ 和 _j_ 单调递增排列。

最后一个三元组用于占位，其值为 `(len(a), len(b), 0)`。它是唯一 `n == 0` 的三元组。如果 `(i, j, n)` 和 `(i', j', n')` 是在列表中相邻的三元组，且后者不是列表中的最后一个三元组，则 `i+n < i'` 或 `j+n < j'`；换句话说，相邻的三元组总是描述非相邻的相等块。

\>>> s \= SequenceMatcher(None, "abxcd", "abcd")
\>>> s.get\_matching\_blocks()
\[Match(a=0, b=0, size=2), Match(a=3, b=2, size=2), Match(a=5, b=4, size=0)\]

get\_opcodes()[¶](#difflib.SequenceMatcher.get_opcodes "Link to this definition")

返回描述如何将 _a_ 变为 _b_ 的 5 元组列表，每个元组的形式为 `(tag, i1, i2, j1, j2)`。在第一个元组中 `i1 == j1 == 0`，而在其余的元组中 _i1_ 等于前一个元组的 _i2_，并且 _j1_ 也等于前一个元组的 _j2_。

_tag_ 值为字符串，其含义如下：

| 
值

 | 

含意

 |
| --- | --- |
| 

`'replace'`

 | 

`a[i1:i2]` 应由 `b[j1:j2]` 替换。

 |
| 

`'delete'`

 | 

`a[i1:i2]` 应被删除。请注意在此情况下 `j1 == j2`。

 |
| 

`'insert'`

 | 

`b[j1:j2]` 应插入到 `a[i1:i1]`。请注意在此情况下 `i1 == i2`。

 |
| 

`'equal'`

 | 

`a[i1:i2] == b[j1:j2]` (两个子序列相同)。

 |

例如：

\>>> a \= "qabxcd"
\>>> b \= "abycdf"
\>>> s \= SequenceMatcher(None, a, b)
\>>> for tag, i1, i2, j1, j2 in s.get\_opcodes():
...     print('{:7}   a\[{}:{}\] --> b\[{}:{}\] {!r:>8} --> {!r}'.format(
...         tag, i1, i2, j1, j2, a\[i1:i2\], b\[j1:j2\]))
delete    a\[0:1\] --> b\[0:0\]      'q' --> ''
equal     a\[1:3\] --> b\[0:2\]     'ab' --> 'ab'
replace   a\[3:4\] --> b\[2:3\]      'x' --> 'y'
equal     a\[4:6\] --> b\[3:5\]     'cd' --> 'cd'
insert    a\[6:6\] --> b\[5:6\]       '' --> 'f'

get\_grouped\_opcodes(_n\=3_)[¶](#difflib.SequenceMatcher.get_grouped_opcodes "Link to this definition")

返回一个带有最多 _n_ 行上下文的分组的 [generator](https://docs.python.org/zh-cn/3/glossary.html#term-generator)。

从 [`get_opcodes()`](#difflib.SequenceMatcher.get_opcodes "difflib.SequenceMatcher.get_opcodes") 所返回的组开始，此方法会拆分出较小的更改簇并消除没有更改的间隔区域。

这些分组以与 [`get_opcodes()`](#difflib.SequenceMatcher.get_opcodes "difflib.SequenceMatcher.get_opcodes") 相同的格式返回。

ratio()[¶](#difflib.SequenceMatcher.ratio "Link to this definition")

返回一个取值范围 \[0, 1\] 的浮点数作为序列相似性度量。

其中 T 是两个序列中元素的总数量，M 是匹配的数量，即 2.0\*M / T。请注意如果两个序列完全相同则该值为 `1.0`，如果两者完全不同则为 `0.0`。

如果 [`get_matching_blocks()`](#difflib.SequenceMatcher.get_matching_blocks "difflib.SequenceMatcher.get_matching_blocks") 或 [`get_opcodes()`](#difflib.SequenceMatcher.get_opcodes "difflib.SequenceMatcher.get_opcodes") 尚未被调用则此方法运算消耗较大，在此情况下你可能需要先调用 [`quick_ratio()`](#difflib.SequenceMatcher.quick_ratio "difflib.SequenceMatcher.quick_ratio") 或 [`real_quick_ratio()`](#difflib.SequenceMatcher.real_quick_ratio "difflib.SequenceMatcher.real_quick_ratio") 来获取一个上界。

quick\_ratio()[¶](#difflib.SequenceMatcher.quick_ratio "Link to this definition")

相对快速地返回一个 [`ratio()`](#difflib.SequenceMatcher.ratio "difflib.SequenceMatcher.ratio") 的上界。

real\_quick\_ratio()[¶](#difflib.SequenceMatcher.real_quick_ratio "Link to this definition")

非常快速地返回一个 [`ratio()`](#difflib.SequenceMatcher.ratio "difflib.SequenceMatcher.ratio") 的上界。

这三个返回匹配部分占总字符数之比的方法可能由于不同的近似级别而给出不同的结果，但是 [`quick_ratio()`](#difflib.SequenceMatcher.quick_ratio "difflib.SequenceMatcher.quick_ratio") 和 [`real_quick_ratio()`](#difflib.SequenceMatcher.real_quick_ratio "difflib.SequenceMatcher.real_quick_ratio") 总是会至少与 [`ratio()`](#difflib.SequenceMatcher.ratio "difflib.SequenceMatcher.ratio") 一样大：

\>>> s \= SequenceMatcher(None, "abcd", "bcde")
\>>> s.ratio()
0.75
\>>> s.quick\_ratio()
0.75
\>>> s.real\_quick\_ratio()
1.0

## 示例[¶](#examples "Link to this heading")

### SequenceMatcher examples[¶](#sequencematcher-examples "Link to this heading")

以下示例比较两个字符串，并将空格视为“垃圾”：

\>>> s \= SequenceMatcher(lambda x: x \== " ",
...                     "private Thread currentThread;",
...                     "private volatile Thread currentThread;")

[`ratio()`](#difflib.SequenceMatcher.ratio "difflib.SequenceMatcher.ratio") 返回一个 \[0, 1\] 范围内的浮点数，用来衡量序列的相似度。 根据经验，`ratio()` 值超过 0.6 就意味着两个序列非常接近匹配：

\>>> print(round(s.ratio(), 3))
0.866

如果您只对序列的匹配的位置感兴趣，则 [`get_matching_blocks()`](#difflib.SequenceMatcher.get_matching_blocks "difflib.SequenceMatcher.get_matching_blocks") 就很方便：

\>>> for block in s.get\_matching\_blocks():
...     print("a\[%d\] and b\[%d\] match for %d elements" % block)
a\[0\] and b\[0\] match for 8 elements
a\[8\] and b\[17\] match for 21 elements
a\[29\] and b\[38\] match for 0 elements

请注意 [`get_matching_blocks()`](#difflib.SequenceMatcher.get_matching_blocks "difflib.SequenceMatcher.get_matching_blocks") 返回的最后一个元组 `(len(a), len(b), 0)` 始终只用于占位，这也是元组的末尾元素（匹配的元素个数）为 `0` 的唯一情况。

如果你想要知道如何将第一个序列转成第二个序列，可以使用 [`get_opcodes()`](#difflib.SequenceMatcher.get_opcodes "difflib.SequenceMatcher.get_opcodes"):

\>>> for opcode in s.get\_opcodes():
...     print("%6s a\[%d:%d\] b\[%d:%d\]" % opcode)
 equal a\[0:8\] b\[0:8\]
insert a\[8:8\] b\[8:17\]
 equal a\[8:29\] b\[17:38\]

参见

-   此模块中的 [`get_close_matches()`](#difflib.get_close_matches "difflib.get_close_matches") 函数显示了如何基于 [`SequenceMatcher`](#difflib.SequenceMatcher "difflib.SequenceMatcher") 构建简单的代码来执行有用的功能。
    
-   针对使用 [`SequenceMatcher`](#difflib.SequenceMatcher "difflib.SequenceMatcher") 构建的小型应用程序的 [简易版本控制方案](https://code.activestate.com/recipes/576729-simple-version-control/).
    

### Differ example[¶](#differ-example "Link to this heading")

此示例比较两段文本。首先我们设置文本为以换行符结尾的单行字符串组成的序列（这样的序列也可以通过文件型对象的 [`readlines()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.readlines "io.IOBase.readlines") 方法来获取）：

\>>> text1 \= '''  1. Beautiful is better than ugly.
...   2. Explicit is better than implicit.
...   3. Simple is better than complex.
...   4. Complex is better than complicated.
... '''.splitlines(keepends\=True)
\>>> len(text1)
4
\>>> text1\[0\]\[\-1\]
'\\n'
\>>> text2 \= '''  1. Beautiful is better than ugly.
...   3.   Simple is better than complex.
...   4. Complicated is better than complex.
...   5. Flat is better than nested.
... '''.splitlines(keepends\=True)

接下来我们实例化一个 Differ 对象：

\>>> d \= Differ()

请注意在实例化 [`Differ`](#difflib.Differ "difflib.Differ") 对象时我们可以传入函数来过滤掉“垃圾”行和字符。详情参见 [`Differ()`](#difflib.Differ "difflib.Differ") 构造器说明。

最后，我们比较两个序列：

\>>> result \= list(d.compare(text1, text2))

`result` 是一个字符串列表，让我们将其美化打印出来：

\>>> from pprint import pprint
\>>> pprint(result)
\['    1. Beautiful is better than ugly.\\n',
 '-   2. Explicit is better than implicit.\\n',
 '-   3. Simple is better than complex.\\n',
 '+   3.   Simple is better than complex.\\n',
 '?     ++\\n',
 '-   4. Complex is better than complicated.\\n',
 '?            ^                     ---- ^\\n',
 '+   4. Complicated is better than complex.\\n',
 '?           ++++ ^                      ^\\n',
 '+   5. Flat is better than nested.\\n'\]

作为单独的多行字符串显示出来则是这样：

\>>> import sys
\>>> sys.stdout.writelines(result)
    1. Beautiful is better than ugly.
\-   2. Explicit is better than implicit.
\-   3. Simple is better than complex.
\+   3.   Simple is better than complex.
?     ++
\-   4. Complex is better than complicated.
?            ^                     ---- ^
\+   4. Complicated is better than complex.
?           ++++ ^                      ^
\+   5. Flat is better than nested.

### difflib 的命令行接口[¶](#a-command-line-interface-to-difflib "Link to this heading")

这个例子演示了如何使用 difflib 来创建类似 `diff` 的工具。

""" Command-line interface to difflib.py providing diffs in four formats:

\* ndiff:    lists every line and highlights interline changes.
\* context:  highlights clusters of changes in a before/after format.
\* unified:  highlights clusters of changes in an inline format.
\* html:     generates side by side comparison with change highlights.

"""

import sys, os, difflib, argparse
import datetime as dt

def file\_mtime(path):
    t \= dt.datetime.fromtimestamp(os.stat(path).st\_mtime,
                                  dt.timezone.utc)
    return t.astimezone().isoformat()

def main():

    parser \= argparse.ArgumentParser()
    parser.add\_argument('-c', action\='store\_true', default\=False,
                        help\='Produce a context format diff (default)')
    parser.add\_argument('-u', action\='store\_true', default\=False,
                        help\='Produce a unified format diff')
    parser.add\_argument('-m', action\='store\_true', default\=False,
                        help\='Produce HTML side by side diff '
                             '(can use -c and -l in conjunction)')
    parser.add\_argument('-n', action\='store\_true', default\=False,
                        help\='Produce a ndiff format diff')
    parser.add\_argument('-l', '--lines', type\=int, default\=3,
                        help\='Set number of context lines (default 3)')
    parser.add\_argument('fromfile')
    parser.add\_argument('tofile')
    options \= parser.parse\_args()

    n \= options.lines
    fromfile \= options.fromfile
    tofile \= options.tofile

    fromdate \= file\_mtime(fromfile)
    todate \= file\_mtime(tofile)
    with open(fromfile) as ff:
        fromlines \= ff.readlines()
    with open(tofile) as tf:
        tolines \= tf.readlines()

    if options.u:
        diff \= difflib.unified\_diff(fromlines, tolines, fromfile, tofile, fromdate, todate, n\=n)
    elif options.n:
        diff \= difflib.ndiff(fromlines, tolines)
    elif options.m:
        diff \= difflib.HtmlDiff().make\_file(fromlines,tolines,fromfile,tofile,context\=options.c,numlines\=n)
    else:
        diff \= difflib.context\_diff(fromlines, tolines, fromfile, tofile, fromdate, todate, n\=n)

    sys.stdout.writelines(diff)

if \_\_name\_\_ \== '\_\_main\_\_':
    main()

### ndiff 示例[¶](#ndiff-example "Link to this heading")

这个例子演示了如何使用 [`difflib.ndiff()`](#difflib.ndiff "difflib.ndiff")。

"""ndiff \[-q\] file1 file2
    或
ndiff (-r1 | -r2) < ndiff\_output > file1\_or\_file2

打印对人类友好的文件差异报告至标准输出。将会标明
行间与行内差异。在第二种形式下，会根据标准输入上的
ndiff 报告在标准输出上重建 file1 (-r1) 或 file2 (-r2)。

在第一种形式下，如果未指明 -q ("quiet")，则输出的
前两行为

\-: file1
+: file2

其余的每一行将以两个字符的代码打头：

    "- "    行为 file1 所独有
    "+ "    行为 file2 所独有
    "  "    行在两个文件中相同
    "? "    行不存在于某一个输入文件

以 "? " 打头的行会尝试关注行内差异，并且
不存在于某一个输入文件中。当源文件包含
制表符时这些行可能会令人迷惑。

第一个文件可通过只保留以" " 或 "- " 打头的行，
并删除那些 2 字符前缀来恢复；使用 ndiff 时传入 -r1。

第二个文件可通过类似方式来恢复，即只保留
" " 和 "+ " 打头的行；使用 ndiff 并传入 -r2；或者
在 Unix 上，第二个文件可通过管道操作来恢复

    sed -n '/^\[+ \] /s/^..//p'
"""

\_\_version\_\_ \= 1, 7, 0

import difflib, sys

def fail(msg):
    out \= sys.stderr.write
    out(msg + "\\n\\n")
    out(\_\_doc\_\_)
    return 0

\# 打开一个文件并返回文件对象；如无法打开文件
\# 则返回 0
def fopen(fname):
    try:
        return open(fname)
    except IOError as detail:
        return fail("couldn't open " + fname + ": " + str(detail))

\# 打开两个文件并报告差异至标准输出；如有问题则返回假值
def fcompare(f1name, f2name):
    f1 \= fopen(f1name)
    f2 \= fopen(f2name)
    if not f1 or not f2:
        return 0

    a \= f1.readlines(); f1.close()
    b \= f2.readlines(); f2.close()
    for line in difflib.ndiff(a, b):
        print(line, end\=' ')

    return 1

\# 解析参数 (sys.argv\[1:\] 正常) 并进行比较；
\# 如有问题则返回假值

def main(args):
    import getopt
    try:
        opts, args \= getopt.getopt(args, "qr:")
    except getopt.error as detail:
        return fail(str(detail))
    noisy \= 1
    qseen \= rseen \= 0
    for opt, val in opts:
        if opt \== "-q":
            qseen \= 1
            noisy \= 0
        elif opt \== "-r":
            rseen \= 1
            whichfile \= val
    if qseen and rseen:
        return fail("can't specify both -q and -r")
    if rseen:
        if args:
            return fail("no args allowed with -r option")
        if whichfile in ("1", "2"):
            restore(whichfile)
            return 1
        return fail("-r value must be 1 or 2")
    if len(args) != 2:
        return fail("need 2 filename args")
    f1name, f2name \= args
    if noisy:
        print('-:', f1name)
        print('+:', f2name)
    return fcompare(f1name, f2name)

\# 从标准输入读取 ndiff 输出，并打印 file1 (which=='1') 或
\# file2 (which=='2') 到标准输出

def restore(which):
    restored \= difflib.restore(sys.stdin.readlines(), which)
    sys.stdout.writelines(restored)

if \_\_name\_\_ \== '\_\_main\_\_':
    main(sys.argv\[1:\])
