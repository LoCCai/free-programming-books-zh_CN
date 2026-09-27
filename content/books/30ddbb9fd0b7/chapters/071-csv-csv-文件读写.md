**源代码：** [Lib/csv.py](https://github.com/python/cpython/tree/3.14/Lib/csv.py)

* * *

CSV (Comma Separated Values) 格式是电子表格和数据库中最常见的输入、输出文件格式。在 [**RFC 4180**](https://datatracker.ietf.org/doc/html/rfc4180.html) 规范推出的很多年前，CSV 格式就已经被开始使用了，由于当时并没有合理的标准，不同应用程序读写的数据会存在细微的差别。这种差别让处理多个来源的 CSV 文件变得困难。但尽管分隔符会变化，此类文件的大致格式是相似的，所以编写一个单独的模块以高效处理此类数据，将程序员从读写数据的繁琐细节中解放出来是有可能的。

`csv` 模块实现了 CSV 格式表单数据的读写。其提供了诸如“以兼容 Excel 的方式输出数据文件”或“读取 Excel 程序输出的数据文件”的功能，程序员无需知道 Excel 所采用 CSV 格式的细节。 此模块同样可以用于定义其他应用程序可用的 CSV 格式或定义特定需求的 CSV 格式。

`csv` 模块的 [`reader`](#csv.reader "csv.reader") 和 [`writer`](#csv.writer "csv.writer") 对象可读写序列。 程序员也可以使用 [`DictReader`](#csv.DictReader "csv.DictReader") 和 [`DictWriter`](#csv.DictWriter "csv.DictWriter") 类读写字典形式的数据。

参见

[**PEP 305**](https://peps.python.org/pep-0305/) - CSV 文件 API

《Python 增强提议》提出了对 Python 的这一补充。

## 模块内容[¶](#module-contents "Link to this heading")

`csv` 模块定义了下列函数：

csv.reader(_csvfile_, _/_, _dialect\='excel'_, _\*\*fmtparams_)[¶](#csv.reader "Link to this definition")

返回一个 [reader 对象](#reader-objects)，该对象将处理给定 _csvfile_ 中的行。 csvfile 必须是一个包含字符串的可迭代对象，使用 reader 所定义的 csv 格式。 csvfile 通常是一个文件型对象或列表。 如果 _csvfile_ 是一个文件对象，则打开它时应设置 `newline=''`. [\[1\]](#id4) 给定可选 _dialect_ 形参将被用于定义一组专属于特定 CSV 变种的形参。 它可以是 [`Dialect`](#csv.Dialect "csv.Dialect") 类的子类的实例，或是 [`list_dialects()`](#csv.list_dialects "csv.list_dialects") 函数所返回的字符串之一。 另一个可选关键字形参 _fmtparams_ 可被用来覆盖当前变种中的单个格式形参。 有关变种和格式设置形参的完整细节，请参阅 [变种与格式参数](#csv-fmt-params) 一节。

从 csv 文件读取的每一行都将返回为一个字符串列表。 除非指定了 [`QUOTE_NONNUMERIC`](#csv.QUOTE_NONNUMERIC "csv.QUOTE_NONNUMERIC") 格式选项（在这种情况下未加引号的字段会被转换为浮点数），否则不会执行自动数据类型转换。

一个简短的用法示例:

\>>> import csv
\>>> with open('eggs.csv', newline\='') as csvfile:
...     spamreader \= csv.reader(csvfile, delimiter\=' ', quotechar\='|')
...     for row in spamreader:
...         print(', '.join(row))
Spam, Spam, Spam, Spam, Spam, Baked Beans
Spam, Lovely Spam, Wonderful Spam

其中 `eggs.csv` 包含：

Spam Spam Spam Spam Spam |Baked Beans|
Spam |Lovely Spam| |Wonderful Spam|

csv.writer(_csvfile_, _/_, _dialect\='excel'_, _\*\*fmtparams_)[¶](#csv.writer "Link to this definition")

返回一个 writer 对象，该对象负责将用户的数据在给定的文件型对象上转换为带分隔符的字符串。 _csvfile_ 可以是任何具有 [`write()`](https://docs.python.org/zh-cn/3/library/io.html#io.TextIOBase.write "io.TextIOBase.write") 方法的对象。 如果 _csvfile_ 是一个文件对象，则打开它时应使用 `newline=''` [\[1\]](#id4)。 可以给出可选的 _dialect_ 形参用来定义一组特定 CSV 变种专属的形参。 它可以是 [`Dialect`](#csv.Dialect "csv.Dialect") 类的某个子类的实例或是 [`list_dialects()`](#csv.list_dialects "csv.list_dialects") 函数所返回的字符串之一。 还可以给出另一个可选的 _fmtparams_ 关键字参数来覆盖当前变种中的单个格式化形参。 有关各个变种和格式化形参的完整细节，请参阅 [变种与格式参数](#csv-fmt-params) 部分。 为了尽量简化与实现 DB API 的模块之间的接口，可以将 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None") 作为空字符串写入。 虽然这个转换是不可逆的，但它可以简化 SQL NULL 数据值到 CSV 文件的转储而无需预处理从 `cursor.fetch*` 调用返回的数据。 在被写入之前所有其他非字符串数据都会先用 [`str()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 来转换为字符串。

一个简短的用法示例:

import csv
with open('eggs.csv', 'w', newline\='') as csvfile:
    spamwriter \= csv.writer(csvfile, delimiter\=' ',
                            quotechar\='|', quoting\=csv.QUOTE\_MINIMAL)
    spamwriter.writerow(\['Spam'\] \* 5 + \['Baked Beans'\])
    spamwriter.writerow(\['Spam', 'Lovely Spam', 'Wonderful Spam'\])

这将写入 `eggs.csv` 其中包含：

Spam Spam Spam Spam Spam |Baked Beans|
Spam |Lovely Spam| |Wonderful Spam|

csv.register\_dialect(_name_, _/_, _dialect\='excel'_, _\*\*fmtparams_)[¶](#csv.register_dialect "Link to this definition")

将 _dialect_ 与 _name_ 关联起来。 _name_ 必须是字符串。 变种的指定可以通过传入一个 [`Dialect`](#csv.Dialect "csv.Dialect") 的子类，或通过 _fmtparams_ 关键字参数，或是两者同时传入，此时关键字参数会覆盖 dialect 形参。 有关变种和格式化形参的完整细节，请参阅 [变种与格式参数](#csv-fmt-params) 部分。

csv.unregister\_dialect(_name_)[¶](#csv.unregister_dialect "Link to this definition")

从变种注册表中删除 _name_ 对应的变种。如果 _name_ 不是已注册的变种名称，则抛出 [`Error`](#csv.Error "csv.Error") 异常。

csv.get\_dialect(_name_)[¶](#csv.get_dialect "Link to this definition")

返回 _name_ 对应的变种。如果 _name_ 不是已注册的变种名称，则抛出 [`Error`](#csv.Error "csv.Error") 异常。该函数返回的是不可变的 [`Dialect`](#csv.Dialect "csv.Dialect") 对象。

csv.list\_dialects()[¶](#csv.list_dialects "Link to this definition")

返回所有已注册变种的名称。

csv.field\_size\_limit()[¶](#csv.field_size_limit "Link to this definition")

csv.field\_size\_limit(_new\_limit_)

返回解析器当前允许的最大字段大小。如果指定了 _new\_limit_，则它将成为新的最大字段大小。

`csv` 模块定义了下列类：

_class_ csv.DictReader(_f_, _fieldnames\=None_, _restkey\=None_, _restval\=None_, _dialect\='excel'_, _\*args_, _\*\*kwds_)[¶](#csv.DictReader "Link to this definition")

创建一个对象，该对象在操作上类似于常规 reader，但是将每行中的信息映射到一个 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict")，该 dict 的键由 _fieldnames_ 可选参数给出。

_fieldnames_ 形参是一个 [sequence](https://docs.python.org/zh-cn/3/glossary.html#term-sequence)。 如果省略 _fieldnames_，则文件 _f_ 第一行中的值将用作字段名并将从结果中去除。 如果提供了 _fieldnames_，它们将被使用而第一行将包括在结果中。 无论字段名是如何确定的，字典都将保留其原始顺序。

如果某一行中的字段多于字段名，则剩余数据会被放入一个列表，并与 _restkey_ 所指定的字段名 (默认为 `None`) 一起保存。 如果某个非空白行的字段少于字段名，则缺失的值会使用 _restval_ 的值来填充 (默认为 `None`)。

所有其他可选或关键字参数都传递给底层的 [`reader`](#csv.reader "csv.reader") 实例。

如果传给 _fieldnames_ 的参数是一个迭代器，它将被强制转换为 [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list")。

在 3.6 版本发生变更: 返回的行现在的类型是 `OrderedDict`。

在 3.8 版本发生变更: 现在，返回的行是 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict") 类型。

一个简短的用法示例:

\>>> import csv
\>>> with open('names.csv', newline\='') as csvfile:
...     reader \= csv.DictReader(csvfile)
...     for row in reader:
...         print(row\['first\_name'\], row\['last\_name'\])
...
Eric Idle
John Cleese

\>>> print(row)
{'first\_name': 'John', 'last\_name': 'Cleese'}

其中 `names.csv` 包含：

first\_name,last\_name
Eric,Idle
John,Cleese

_class_ csv.DictWriter(_f_, _fieldnames_, _restval\=''_, _extrasaction\='raise'_, _dialect\='excel'_, _\*args_, _\*\*kwds_)[¶](#csv.DictWriter "Link to this definition")

创建一个对象，该对象在操作上类似常规 writer，但会将字典映射到输出行。 _fieldnames_ 形参是一个由键组成的 [`序列`](https://docs.python.org/zh-cn/3/library/collections.abc.html#module-collections.abc "collections.abc: Abstract base classes for containers")，它指定字典中要传给 [`writerow()`](#csv.csvwriter.writerow "csv.csvwriter.writerow") 方法并写入文件 _f_ 的值的顺序。 如果字典没有 _fieldnames_ 中的键，则可选的 _restval_ 形参将指明要写入的值。 如果传递给 `writerow()` 方法包含的键在 _fieldnames_ 中找不到，则可选的 _extrasaction_ 形参将指明要执行的操作。 如果将其设为默认值 `'raise'`，则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。 如果将其设为 `'ignore'`，则字典中额外的值将被忽略。 任何其他可选或关键字参数都将被传递给下层的 [`writer`](#csv.writer "csv.writer") 实例。

注意，与 [`DictReader`](#csv.DictReader "csv.DictReader") 类不同，[`DictWriter`](#csv.DictWriter "csv.DictWriter") 类的 _fieldnames_ 参数不是可选参数。

如果传给 _fieldnames_ 的参数是一个迭代器，它将被强制转换为 [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list")。

一个简短的用法示例:

import csv

with open('names.csv', 'w', newline\='') as csvfile:
    fieldnames \= \['first\_name', 'last\_name'\]
    writer \= csv.DictWriter(csvfile, fieldnames\=fieldnames)

    writer.writeheader()
    writer.writerow({'first\_name': 'Baked', 'last\_name': 'Beans'})
    writer.writerow({'first\_name': 'Lovely', 'last\_name': 'Spam'})
    writer.writerow({'first\_name': 'Wonderful', 'last\_name': 'Spam'})

which writes `names.csv` containing:

first\_name,last\_name
Baked,Beans
Lovely,Spam
Wonderful,Spam

_class_ csv.Dialect[¶](#csv.Dialect "Link to this definition")

[`Dialect`](#csv.Dialect "csv.Dialect") 类是一个容器类，其属性包含有如何处理双引号、空白符、分隔符等的信息。 由于缺少严格的 CSV 规格描述，不同的应用程序会产生略有差别的 CSV 数据。 `Dialect` 实例定义了 [`reader`](#csv.reader "csv.reader") 和 [`writer`](#csv.writer "csv.writer") 实例将具有怎样的行为。

所有可用的 [`Dialect`](#csv.Dialect "csv.Dialect") 名称会由 [`list_dialects()`](#csv.list_dialects "csv.list_dialects") 返回，并且它们可由特定的 [`reader`](#csv.reader "csv.reader") 和 [`writer`](#csv.writer "csv.writer") 类通过它们的初始化函数 (`__init__`) 来注册，例如:

import csv

with open('students.csv', 'w', newline\='') as csvfile:
    writer \= csv.writer(csvfile, dialect\='unix')

_class_ csv.excel[¶](#csv.excel "Link to this definition")

[`excel`](#csv.excel "csv.excel") 类定义了 Excel 生成的 CSV 文件的常规属性。它在变种注册表中的名称是 `'excel'`。

_class_ csv.excel\_tab[¶](#csv.excel_tab "Link to this definition")

[`excel_tab`](#csv.excel_tab "csv.excel_tab") 类定义了 Excel 生成的、制表符分隔的 CSV 文件的常规属性。它在变种注册表中的名称是 `'excel-tab'`。

_class_ csv.unix\_dialect[¶](#csv.unix_dialect "Link to this definition")

[`unix_dialect`](#csv.unix_dialect "csv.unix_dialect") 类定义了在 UNIX 系统上生成的 CSV 文件的常规属性，即使用 `'\n'` 作为换行符，且所有字段都有引号包围。它在变种注册表中的名称是 `'unix'`。

Added in version 3.2.

_class_ csv.Sniffer[¶](#csv.Sniffer "Link to this definition")

[`Sniffer`](#csv.Sniffer "csv.Sniffer") 类用于推断 CSV 文件的格式。

[`Sniffer`](#csv.Sniffer "csv.Sniffer") 类提供了两个方法：

sniff(_sample_, _delimiters\=None_)[¶](#csv.Sniffer.sniff "Link to this definition")

分析给定的 _sample_ 并返回一个 [`Dialect`](#csv.Dialect "csv.Dialect") 子类，该子类中包含了分析出的格式参数。如果给出可选的 _delimiters_ 参数，则该参数会被解释为字符串，该字符串包含了可能的有效定界符。

If several delimiters fit the sample equally well --- for example if both `','` and `';'` split every row consistently --- the delimiters listed in the [`preferred`](#csv.Sniffer.preferred "csv.Sniffer.preferred") attribute are preferred, in that order, no matter how many times each of them occurs.

分析 sample 文本（假定为 CSV 格式），如果发现其首行为一组列标题则返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")。 在检查每一列时，将考虑是否满足两个关键标准之一来估计 sample 是否包含标题:

-   第二至第 n 行包含数字值
    
-   第二至第 n 行包含字符串值，其中至少有一个值的长度与该列预期标题的长度不同。
    

对标题行之后的 21 行进行采样；如果超过半数的列和行满足条件，则返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")。

备注

此方法是一个粗略的启发式方式，有可能产生假正例和假反例。

The `Sniffer` class has the following attribute:

preferred[¶](#csv.Sniffer.preferred "Link to this definition")

The list of the delimiters preferred for breaking ties, in the order of preference. It can be modified. Its initial value is `[',', '\t', ';', ' ', ':']`.

使用 [`Sniffer`](#csv.Sniffer "csv.Sniffer") 的示例:

with open('example.csv', newline\='') as csvfile:
    dialect \= csv.Sniffer().sniff(csvfile.read(1024))
    csvfile.seek(0)
    reader \= csv.reader(csvfile, dialect)
    \# ... 在此处理 CSV 文件内容 ...

The `csv` module defines the following constants:

csv.QUOTE\_ALL[¶](#csv.QUOTE_ALL "Link to this definition")

指示 [`writer`](#csv.writer "csv.writer") 对象给所有字段加上引号。

csv.QUOTE\_MINIMAL[¶](#csv.QUOTE_MINIMAL "Link to this definition")

Instructs [`writer`](#csv.writer "csv.writer") objects to only quote those fields which contain special characters such as _delimiter_, _quotechar_, `'\r'`, `'\n'` or any of the characters in _lineterminator_. If _doublequote_ is [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False") and _escapechar_ is set, the _quotechar_ is escaped instead of causing the field to be quoted.

csv.QUOTE\_NONNUMERIC[¶](#csv.QUOTE_NONNUMERIC "Link to this definition")

指示 [`writer`](#csv.writer "csv.writer") 对象为所有非数字字段加上引号。

指示 [`reader`](#csv.reader "csv.reader") 对象将所有未加引号的字段转换为 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 类型。

csv.QUOTE\_NONE[¶](#csv.QUOTE_NONE "Link to this definition")

指示 [`writer`](#csv.writer "csv.writer") 对象不对字段加引号。 在现有的 _delimiter_, _quotechar_, _escapechar_, `'\r'`, `'\n'` 或 _lineterminator_ 中的任何字符出现在输出数据中的时候它前面会添加当前的 _escapechar_。 如果未设置\*escapechar\*，则在遇到任何需要转义的字符时 writer 都会引发 [`Error`](#csv.Error "csv.Error")。 将 _quotechar_ 设为 `None` 以避免进行转义。

指示 [`reader`](#csv.reader "csv.reader") 对象不对引号字符执行特殊处理。

csv.QUOTE\_NOTNULL[¶](#csv.QUOTE_NOTNULL "Link to this definition")

指示 [`writer`](#csv.writer "csv.writer") 对象为所有不为 `None` 的字段加引号。 这类似于 [`QUOTE_ALL`](#csv.QUOTE_ALL "csv.QUOTE_ALL")，区别是如果一个字段值为 `None` 则会写入一个（不带引号的）空字符串。

指示 [`reader`](#csv.reader "csv.reader") 对象将（不带引号的）空字段解读为 `None` 并在其他情况下采取与 [`QUOTE_ALL`](#csv.QUOTE_ALL "csv.QUOTE_ALL") 相同的行为。

Added in version 3.12.

csv.QUOTE\_STRINGS[¶](#csv.QUOTE_STRINGS "Link to this definition")

指示 [`writer`](#csv.writer "csv.writer") 对象总是为字符串字段加引号。 这类似于 [`QUOTE_NONNUMERIC`](#csv.QUOTE_NONNUMERIC "csv.QUOTE_NONNUMERIC")，区别是如果一个字段值为 `None` 则会写入一个（不带引号的）空字符串。

指示 [`reader`](#csv.reader "csv.reader") 对象将（不带引号的）空字符串解读为 `None` 并在其他情况下采取与 [`QUOTE_NONNUMERIC`](#csv.QUOTE_NONNUMERIC "csv.QUOTE_NONNUMERIC") 相同的行为。

Added in version 3.12.

`csv` 模块定义了以下异常：

_exception_ csv.Error[¶](#csv.Error "Link to this definition")

该异常可能由任何发生错误的函数抛出。

## 变种与格式参数[¶](#dialects-and-formatting-parameters "Link to this heading")

为了更容易地指定输入和输出记录的格式，特定的多个格式化形参将组合成为不同的 dialect。 特定的 dialect 是 [`Dialect`](#csv.Dialect "csv.Dialect") 类的一个子类，它包含多个用于描述 CSV 文件的格式的属性。 当创建 [`reader`](#csv.reader "csv.reader") 或 [`writer`](#csv.writer "csv.writer") 对象时，程序员可以指定一个字符串或 `Dialect` 类的子类作为 dialect 形参。 作为对 _dialect_ 形参的补充或替代，程序员还可以指定单独的格式化形参，它们的名称与 `Dialect` 类所定义的以下属性相同。

Dialect 类支持以下属性：

Dialect.delimiter[¶](#csv.Dialect.delimiter "Link to this definition")

一个用于分隔字段的单字符，默认为 `','`。

Dialect.doublequote[¶](#csv.Dialect.doublequote "Link to this definition")

控制出现在字段中的 _引号字符_ 本身应如何被引出。当该属性为 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True") 时，双写引号字符。如果该属性为 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False")，则在 _引号字符_ 的前面放置 _转义符_。默认值为 `True`。

在输出时，如果 _doublequote_ 是 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False")，且 _转义符_ 未指定，且在字段中发现 _引号字符_ 时，会抛出 [`Error`](#csv.Error "csv.Error") 异常。

Dialect.escapechar[¶](#csv.Dialect.escapechar "Link to this definition")

被 writer 用来对需要转义的字符进行转义的单字符字符串：

> -   如果 _quoting_ 被设为 [`QUOTE_NONE`](#csv.QUOTE_NONE "csv.QUOTE_NONE") 则 _delimiter_, _quotechar_, `'\r'`, `'\n'` 以及 _lineterminator_ 中的任何字符都会被转义；
>     
> -   如果 _doublequote_ 为 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False") 则 _quotechar_ 会被转义；
>     
> -   _escapechar_ 本身。
>     

在读取时，_escapechar_ 将从以下字符中去除任何特殊含义。 它默认为 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")，表示禁用转义。

在 3.10 版本发生变更: Previously the _escapechar_ itself was not escaped, which lost it on reading.

在 3.11 版本发生变更: 不允许空的 _escapechar_。

Dialect.lineterminator[¶](#csv.Dialect.lineterminator "Link to this definition")

放在 [`writer`](#csv.writer "csv.writer") 产生的行的结尾，默认为 `'\r\n'`。

备注

[`reader`](#csv.reader "csv.reader") 经过硬编码，会识别 `'\r'` 或 `'\n'` 作为行尾，并忽略 _lineterminator_。未来可能会更改这一行为。

Dialect.quotechar[¶](#csv.Dialect.quotechar "Link to this definition")

一个单字符，用于对包含特殊字符的字段加引号，这样的特殊字符有 _delimiter_ 或 _quotechar_，或者包含换行符 (`'\r'`, `'\n'` 或 _lineterminator_ 中的任意字符)。 默认值为 `'"'`。 当 _quoting_ 设为 [`QUOTE_NONE`](#csv.QUOTE_NONE "csv.QUOTE_NONE") 时可被设为 `None` 以防止转义 `'"'`。

在 3.11 版本发生变更: 不允许空的 _quotechar_。

Dialect.quoting[¶](#csv.Dialect.quoting "Link to this definition")

控制引号何时应由 writer 生成并由 reader 识别。 它可以接受任意 [QUOTE\_\* 常量](#csv-constants) 并且如果 _quotechar_ 不为 `None` 则默认为 [`QUOTE_MINIMAL`](#csv.QUOTE_MINIMAL "csv.QUOTE_MINIMAL")，否则为 [`QUOTE_NONE`](#csv.QUOTE_NONE "csv.QUOTE_NONE")。

Dialect.skipinitialspace[¶](#csv.Dialect.skipinitialspace "Link to this definition")

当 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True") 时，紧跟在 _delimiter_ 后的空格将被忽略。默认值为 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False")。当同时使用 `delimiter=' '` 和 `skipinitialspace=True` 时，不允许出现未加引号的空字段。

Dialect.strict[¶](#csv.Dialect.strict "Link to this definition")

如果为 `True`，则在输入错误的 CSV 时抛出 [`Error`](#csv.Error "csv.Error") 异常。默认值为 `False`。

## Reader 对象[¶](#reader-objects "Link to this heading")

Reader 对象（[`DictReader`](#csv.DictReader "csv.DictReader") 实例和 [`reader()`](#csv.reader "csv.reader") 函数返回的对象）具有以下公开方法：

csvreader.\_\_next\_\_()[¶](#csv.csvreader.__next__ "Link to this definition")

返回 reader 的可迭代对象的下一行，它可以是一个列表（如果对象是由 [`reader()`](#csv.reader "csv.reader") 返回）或字典（如果是一个 [`DictReader`](#csv.DictReader "csv.DictReader") 实例），根据当前 [`Dialect`](#csv.Dialect "csv.Dialect") 来解析。 通常你应当以 `next(reader)` 的形式来调用它。

Reader 对象具有以下公开属性：

csvreader.dialect[¶](#csv.csvreader.dialect "Link to this definition")

变种描述，只读，供解析器使用。

csvreader.line\_num[¶](#csv.csvreader.line_num "Link to this definition")

源迭代器已经读取了的行数。它与返回的记录数不同，因为记录可能跨越多行。

DictReader 对象具有以下公开属性：

DictReader.fieldnames[¶](#csv.DictReader.fieldnames "Link to this definition")

字段名称。如果在创建对象时未传入字段名称，则首次访问时或从文件中读取第一条记录时会初始化此属性。

## Writer 对象[¶](#writer-objects "Link to this heading")

[`writer`](#csv.writer "csv.writer") 对象 ([`DictWriter`](#csv.DictWriter "csv.DictWriter") 实例和 [`writer()`](#csv.writer "csv.writer") 函数所返回的对象 ) 具有以下公共方法。 对于 `writer` 对象，_row_ 必须是字符串或数字的可迭代对象，而对于 `DictWriter` 对象则是一个将字段名映射到字符串或数字 (会先将其传给 [`str()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) 的字典。 请注意在写入复数时会用圆括号括起来。 这可能会给其他读取 CSV 文件的程序带来一些问题 (假定它们确实支持复数)。

csvwriter.writerow(_row_, _/_)[¶](#csv.csvwriter.writerow "Link to this definition")

将 _row_ 形参写入到 writer 的文件对象，根据当前 [`Dialect`](#csv.Dialect "csv.Dialect") 进行格式化。 返回对下层文件对象的 _write_ 方法的调用的返回值。

在 3.5 版本发生变更: 开始支持任意类型的迭代器。

csvwriter.writerows(_rows_, _/_)[¶](#csv.csvwriter.writerows "Link to this definition")

将 _rows\*（即能迭代出多个上述 \*row_ 对象的迭代器）中的所有元素写入 writer 的文件对象，并根据当前设置的变种进行格式化。

Writer 对象具有以下公开属性：

csvwriter.dialect[¶](#csv.csvwriter.dialect "Link to this definition")

变种描述，只读，供 writer 使用。

DictWriter 对象具有以下公开方法：

在 writer 的文件对象中，写入一行字段名称（字段名称在构造函数中指定），并根据当前设置的变种进行格式化。本方法的返回值就是内部使用的 [`csvwriter.writerow()`](#csv.csvwriter.writerow "csv.csvwriter.writerow") 方法的返回值。

Added in version 3.2.

在 3.8 版本发生变更: 现在 [`writeheader()`](#csv.DictWriter.writeheader "csv.DictWriter.writeheader") 也返回其内部使用的 [`csvwriter.writerow()`](#csv.csvwriter.writerow "csv.csvwriter.writerow") 方法的返回值。

## 例子[¶](#examples "Link to this heading")

读取 CSV 文件最简单的一个例子:

import csv
with open('some.csv', newline\='') as f:
    reader \= csv.reader(f)
    for row in reader:
        print(row)

读取其他格式的文件:

import csv
with open('passwd', newline\='') as f:
    reader \= csv.reader(f, delimiter\=':', quoting\=csv.QUOTE\_NONE)
    for row in reader:
        print(row)

相应最简单的写入示例是:

import csv
with open('some.csv', 'w', newline\='') as f:
    writer \= csv.writer(f)
    writer.writerows(someiterable)

由于 [`open()`](https://docs.python.org/zh-cn/3/builtins/functions.html#open "open") 被用来打开 CSV 文件供读取，因此在默认情况下将使用系统默认编码格式 (参见 [`locale.getencoding()`](https://docs.python.org/zh-cn/3/library/locale.html#locale.getencoding "locale.getencoding")) 把文件解码至 unicode。 要使用其他编码格式来解码文件，请使用 open 的 `encoding` 参数:

import csv
with open('some.csv', newline\='', encoding\='utf-8') as f:
    reader \= csv.reader(f)
    for row in reader:
        print(row)

这同样适用于写入非系统默认编码的内容：打开输出文件时，指定 encoding 参数。

注册一个新的变种:

import csv
csv.register\_dialect('unixpwd', delimiter\=':', quoting\=csv.QUOTE\_NONE)
with open('passwd', newline\='') as f:
    reader \= csv.reader(f, 'unixpwd')

Reader 的更高级用法——捕获并报告错误:

import csv, sys
filename \= 'some.csv'
with open(filename, newline\='') as f:
    reader \= csv.reader(f)
    try:
        for row in reader:
            print(row)
    except csv.Error as e:
        sys.exit(f'file {filename}, line {reader.line\_num}: {e}')

尽管该模块不直接支持解析字符串，但仍可如下轻松完成:

import csv
for row in csv.reader(\['one,two,three'\]):
    print(row)

备注
