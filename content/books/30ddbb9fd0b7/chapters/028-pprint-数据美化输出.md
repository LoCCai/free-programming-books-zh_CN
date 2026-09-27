**源代码：** [Lib/pprint.py](https://github.com/python/cpython/tree/3.14/Lib/pprint.py)

* * *

`pprint` 模块提供了“美化打印”任意 Python 数据结构的功能，这种美化形式可用作对解释器的输入。 如果经格式化的结构包含非基本 Python 类型的对象，则其美化形式可能无法被加载。 包含文件、套接字或类对象，以及许多其他不能用 Python 字面值来表示的对象都有可能导致这样的结果。

The formatted representation keeps objects on a single line if it can, and breaks them onto multiple lines if they don't fit within the allowed width, adjustable by the _width_ parameter defaulting to 80 characters.

## 函数[¶](#functions "Link to this heading")

pprint.pp(_object_, _stream\=None_, _indent\=1_, _width\=80_, _depth\=None_, _\*_, _compact\=False_, _sort\_dicts\=False_, _underscore\_numbers\=False_)[¶](#pprint.pp "Link to this definition")

打印 _object_ 的格式化表示形式，末尾加一个换行符。此函数可以在交互式解释器中代替 [`print()`](https://docs.python.org/zh-cn/3/builtins/functions.html#print "print") 函数用于检查对象值。 提示：你可以执行重赋值 `print = pprint.pp` 以在指定作用域内使用。

参数:

-   **object** -- 要打印的对象。
    
-   **stream** ([file-like object](https://docs.python.org/zh-cn/3/glossary.html#term-file-like-object) | None) -- 一个文件型对象，可通过调用其 `write()` 方法将输出写入该对象。如为 `None` (默认值)，则使用 [`sys.stdout`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stdout "sys.stdout") 输出流。
    
-   **indent** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- 要为每个嵌套层级添加的缩进量。
    
-   **width** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- 输出中每行所允许的最大字符数。如果一个结构无法在宽度限制内被格式化，则将尽可能的接近。
    
-   **depth** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") _|_ _None_) -- 可被打印的嵌套层级数量。如果要打印的数据结构具有过深的层级，则其包含的下一层级将用 `...` 替换。如为 `None` (默认值)，则不会限制被格式化对象的层级深度。
    
-   **compact** ([_bool_](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")) -- Control the way long [sequences](https://docs.python.org/zh-cn/3/glossary.html#term-sequence) are formatted. If `False` (the default), each item of a sequence will be formatted on a separate line, otherwise as many items as will fit within the _width_ will be formatted on each output line.
    
-   **sort\_dicts** ([_bool_](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")) -- 如为 `True`，则在格式化字典时将基于键进行排序，否则将按插入顺序显示它们（默认）。
    
-   **underscore\_numbers** ([_bool_](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")) -- 如为 `True`，则在格式化整数时将使用 `_` 字符作为千位分隔符，否则将不显示下划线（默认）。
    

\>>> import pprint
\>>> stuff \= \['spam', 'eggs', 'lumberjack', 'knights', 'ni'\]
\>>> stuff.insert(0, stuff)
\>>> pprint.pp(stuff)
\[<Recursion on list with id=...>,
 'spam',
 'eggs',
 'lumberjack',
 'knights',
 'ni'\]

Added in version 3.8.

pprint.pprint(_object_, _stream\=None_, _indent\=1_, _width\=80_, _depth\=None_, _\*_, _compact\=False_, _sort\_dicts\=True_, _underscore\_numbers\=False_)[¶](#pprint.pprint "Link to this definition")

默认将 _sort\_dicts_ 设为 `True` 的 [`pp()`](#pprint.pp "pprint.pp") 的别名，它将自动按字典的键进行排序，你也可以选择使用该参数默认为 `False` 的 `pp()`。

pprint.pformat(_object_, _indent\=1_, _width\=80_, _depth\=None_, _\*_, _compact\=False_, _sort\_dicts\=True_, _underscore\_numbers\=False_)[¶](#pprint.pformat "Link to this definition")

将 _object_ 的格式化表示形式作为字符串返回。 _indent_, _width_, _depth_, _compact_, _sort\_dicts_ 和 _underscore\_numbers_ 将作为格式化形参传递给 [`PrettyPrinter`](#pprint.PrettyPrinter "pprint.PrettyPrinter") 构造器，它们的含义请参阅前面文档中的说明。

pprint.isreadable(_object_)[¶](#pprint.isreadable "Link to this definition")

确定 _object_ 的格式化表示是否“可读”，或是否可被用来通过 [`eval()`](https://docs.python.org/zh-cn/3/builtins/functions.html#eval "eval") 重新构建对象的值。此函数对于递归对象总是返回 `False` 值。

\>>> pprint.isreadable(stuff)
False

pprint.isrecursive(_object_)[¶](#pprint.isrecursive "Link to this definition")

确定 _object_ 是否需要递归的表示。此函数会受到下面 [`saferepr()`](#pprint.saferepr "pprint.saferepr") 所提及的同样限制的影响并可能在无法检测到递归对象时引发 [`RecursionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RecursionError "RecursionError") 异常。

pprint.saferepr(_object_)[¶](#pprint.saferepr "Link to this definition")

返回 _object_ 的字符串表示，并为某些通用数据结构提供防递归保护，包括 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict"), [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 和 [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple") 或其未重载 `__repr__` 的子类的实例。如果该对象表示形式公开了一个递归条目，该递归引用会被表示为 `<Recursion on typename with id=number>`。否则该表示形式将不会被格式化。

\>>> pprint.saferepr(stuff)
"\[<Recursion on list with id=...>, 'spam', 'eggs', 'lumberjack', 'knights', 'ni'\]"

## PrettyPrinter Objects[¶](#prettyprinter-objects "Link to this heading")

_class_ pprint.PrettyPrinter(_indent\=1_, _width\=80_, _depth\=None_, _stream\=None_, _\*_, _compact\=False_, _sort\_dicts\=True_, _underscore\_numbers\=False_)[¶](#pprint.PrettyPrinter "Link to this definition")

构造一个 [`PrettyPrinter`](#pprint.PrettyPrinter "pprint.PrettyPrinter") 实例。

参数的含义与 [`pp()`](#pprint.pp "pprint.pp") 的相同。注意它们的顺序有所不同，并且 _sort\_dicts_ 默认为 `True`。

\>>> import pprint
\>>> stuff \= \['spam', 'eggs', 'lumberjack', 'knights', 'ni'\]
\>>> stuff.insert(0, stuff\[:\])
\>>> pp \= pprint.PrettyPrinter(indent\=4)
\>>> pp.pprint(stuff)
\[   \['spam', 'eggs', 'lumberjack', 'knights', 'ni'\],
    'spam',
    'eggs',
    'lumberjack',
    'knights',
    'ni'\]
\>>> pp \= pprint.PrettyPrinter(width\=41, compact\=True)
\>>> pp.pprint(stuff)
\[\['spam', 'eggs', 'lumberjack',
  'knights', 'ni'\],
 'spam', 'eggs', 'lumberjack', 'knights',
 'ni'\]
\>>> tup \= ('spam', ('eggs', ('lumberjack', ('knights', ('ni', ('dead',
... ('parrot', ('fresh fruit',))))))))
\>>> pp \= pprint.PrettyPrinter(depth\=6)
\>>> pp.pprint(tup)
('spam', ('eggs', ('lumberjack', ('knights', ('ni', ('dead', (...)))))))

在 3.4 版本发生变更: 增加了 _compact_ 形参。

在 3.8 版本发生变更: 增加了 _sort\_dicts_ 形参。

在 3.10 版本发生变更: 添加了 _underscore\_numbers_ 形参。

在 3.11 版本发生变更: 如果 `sys.stdout` 为 `None` 则将不会尝试向其中写入。

[`PrettyPrinter`](#pprint.PrettyPrinter "pprint.PrettyPrinter") 的实例具有下列方法：

PrettyPrinter.pformat(_object_)[¶](#pprint.PrettyPrinter.pformat "Link to this definition")

返回 _object_ 格式化表示。这会将传给 [`PrettyPrinter`](#pprint.PrettyPrinter "pprint.PrettyPrinter") 构造器的选项纳入考虑。

PrettyPrinter.pprint(_object_)[¶](#pprint.PrettyPrinter.pprint "Link to this definition")

在所配置的流上打印 _object_ 的格式化表示，并附加一个换行符。

下列方法提供了与同名函数相对应的实现。在实例上使用这些方法效率会更高一些，因为不需要创建新的 [`PrettyPrinter`](#pprint.PrettyPrinter "pprint.PrettyPrinter") 对象。

PrettyPrinter.isreadable(_object_)[¶](#pprint.PrettyPrinter.isreadable "Link to this definition")

确定对象的格式化表示是否“可读”，或者是否可使用 [`eval()`](https://docs.python.org/zh-cn/3/builtins/functions.html#eval "eval") 重建对象值。请注意此方法对于递归对象将返回 `False`。 如果设置了 [`PrettyPrinter`](#pprint.PrettyPrinter "pprint.PrettyPrinter") 的 _depth_ 形参并且对象深度超出允许范围，此方法将返回 `False`。

PrettyPrinter.isrecursive(_object_)[¶](#pprint.PrettyPrinter.isrecursive "Link to this definition")

确定对象是否需要递归表示。

此方法作为一个钩子提供，允许子类修改将对象转换为字符串的方式。默认实现使用 [`saferepr()`](#pprint.saferepr "pprint.saferepr") 实现的内部方式。

PrettyPrinter.format(_object_, _context_, _maxlevels_, _level_)[¶](#pprint.PrettyPrinter.format "Link to this definition")

返回三个值：字符串形式的 _object_ 已格式化版本，指明结果是否可读的旗标，以及指明是否检测到递归的旗标。第一个参数是要表示的对象。 第二个是以对象 [`id()`](https://docs.python.org/zh-cn/3/builtins/functions.html#id "id") 为键的字典，这些对象是当前表示上下文的一部分（影响 _object_ 表示的直接和间接容器）；如果需要呈现一个已经在 _context_ 中表示的对象，则第三个返回值应当为 `True`。对 [`format()`](#pprint.PrettyPrinter.format "pprint.PrettyPrinter.format") 方法的递归调用应当将容器的附加条目添加到此字典中。第三个参数 _maxlevels_ 给出了对递归的请求限制；如果没有请求限制则其值将为 `0`。此参数应当不加修改地传给递归调用。第四个参数 _level_ 给出当前层级；传给递归调用的参数值应当小于当前调用的值。

## 示例[¶](#example "Link to this heading")

为了演示 [`pp()`](#pprint.pp "pprint.pp") 函数及其形参的几种用法，让我们从 [PyPI](https://pypi.org) 获取关于某个项目的信息:

\>>> import json
\>>> import pprint
\>>> from urllib.request import urlopen
\>>> with urlopen('https://pypi.org/pypi/sampleproject/1.2.0/json') as resp:
...     project\_info \= json.load(resp)\['info'\]

在其基本形式中，[`pp()`](#pprint.pp "pprint.pp") 会显示整个对象:

\>>> pprint.pp(project\_info)
{'author': 'The Python Packaging Authority',
 'author\_email': 'pypa-dev@googlegroups.com',
 'bugtrack\_url': None,
 'classifiers': \['Development Status :: 3 - Alpha',
                 'Intended Audience :: Developers',
                 'License :: OSI Approved :: MIT License',
                 'Programming Language :: Python :: 2',
                 'Programming Language :: Python :: 2.6',
                 'Programming Language :: Python :: 2.7',
                 'Programming Language :: Python :: 3',
                 'Programming Language :: Python :: 3.2',
                 'Programming Language :: Python :: 3.3',
                 'Programming Language :: Python :: 3.4',
                 'Topic :: Software Development :: Build Tools'\],
 'description': 'A sample Python project\\n'
                '=======================\\n'
                '\\n'
                'This is the description file for the project.\\n'
                '\\n'
                'The file should use UTF-8 encoding and be written using '
                'ReStructured Text. It\\n'
                'will be used to generate the project webpage on PyPI, and '
                'should be written for\\n'
                'that purpose.\\n'
                '\\n'
                'Typical contents for this file would include an overview of '
                'the project, basic\\n'
                'usage examples, etc. Generally, including the project '
                'changelog in here is not\\n'
                'a good idea, although a simple "What\\'s New" section for the '
                'most recent version\\n'
                'may be appropriate.',
 'description\_content\_type': None,
 'docs\_url': None,
 'download\_url': 'UNKNOWN',
 'downloads': {'last\_day': -1, 'last\_month': -1, 'last\_week': -1},
 'home\_page': 'https://github.com/pypa/sampleproject',
 'keywords': 'sample setuptools development',
 'license': 'MIT',
 'maintainer': None,
 'maintainer\_email': None,
 'name': 'sampleproject',
 'package\_url': 'https://pypi.org/project/sampleproject/',
 'platform': 'UNKNOWN',
 'project\_url': 'https://pypi.org/project/sampleproject/',
 'project\_urls': {'Download': 'UNKNOWN',
                  'Homepage': 'https://github.com/pypa/sampleproject'},
 'release\_url': 'https://pypi.org/project/sampleproject/1.2.0/',
 'requires\_dist': None,
 'requires\_python': None,
 'summary': 'A sample Python project',
 'version': '1.2.0'}

结果可以被限制到特定的 _depth_ (更深层的内容将使用省略号):

\>>> pprint.pp(project\_info, depth\=1)
{'author': 'The Python Packaging Authority',
 'author\_email': 'pypa-dev@googlegroups.com',
 'bugtrack\_url': None,
 'classifiers': \[...\],
 'description': 'A sample Python project\\n'
                '=======================\\n'
                '\\n'
                'This is the description file for the project.\\n'
                '\\n'
                'The file should use UTF-8 encoding and be written using '
                'ReStructured Text. It\\n'
                'will be used to generate the project webpage on PyPI, and '
                'should be written for\\n'
                'that purpose.\\n'
                '\\n'
                'Typical contents for this file would include an overview of '
                'the project, basic\\n'
                'usage examples, etc. Generally, including the project '
                'changelog in here is not\\n'
                'a good idea, although a simple "What\\'s New" section for the '
                'most recent version\\n'
                'may be appropriate.',
 'description\_content\_type': None,
 'docs\_url': None,
 'download\_url': 'UNKNOWN',
 'downloads': {...},
 'home\_page': 'https://github.com/pypa/sampleproject',
 'keywords': 'sample setuptools development',
 'license': 'MIT',
 'maintainer': None,
 'maintainer\_email': None,
 'name': 'sampleproject',
 'package\_url': 'https://pypi.org/project/sampleproject/',
 'platform': 'UNKNOWN',
 'project\_url': 'https://pypi.org/project/sampleproject/',
 'project\_urls': {...},
 'release\_url': 'https://pypi.org/project/sampleproject/1.2.0/',
 'requires\_dist': None,
 'requires\_python': None,
 'summary': 'A sample Python project',
 'version': '1.2.0'}

此外，还可以设置建议的最大字符 _width_。如果一个对象无法被拆分，则将超出指定宽度:

\>>> pprint.pp(project\_info, depth\=1, width\=60)
{'author': 'The Python Packaging Authority',
 'author\_email': 'pypa-dev@googlegroups.com',
 'bugtrack\_url': None,
 'classifiers': \[...\],
 'description': 'A sample Python project\\n'
                '=======================\\n'
                '\\n'
                'This is the description file for the '
                'project.\\n'
                '\\n'
                'The file should use UTF-8 encoding and be '
                'written using ReStructured Text. It\\n'
                'will be used to generate the project '
                'webpage on PyPI, and should be written '
                'for\\n'
                'that purpose.\\n'
                '\\n'
                'Typical contents for this file would '
                'include an overview of the project, '
                'basic\\n'
                'usage examples, etc. Generally, including '
                'the project changelog in here is not\\n'
                'a good idea, although a simple "What\\'s '
                'New" section for the most recent version\\n'
                'may be appropriate.',
 'description\_content\_type': None,
 'docs\_url': None,
 'download\_url': 'UNKNOWN',
 'downloads': {...},
 'home\_page': 'https://github.com/pypa/sampleproject',
 'keywords': 'sample setuptools development',
 'license': 'MIT',
 'maintainer': None,
 'maintainer\_email': None,
 'name': 'sampleproject',
 'package\_url': 'https://pypi.org/project/sampleproject/',
 'platform': 'UNKNOWN',
 'project\_url': 'https://pypi.org/project/sampleproject/',
 'project\_urls': {...},
 'release\_url': 'https://pypi.org/project/sampleproject/1.2.0/',
 'requires\_dist': None,
 'requires\_python': None,
 'summary': 'A sample Python project',
 'version': '1.2.0'}
