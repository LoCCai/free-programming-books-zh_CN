Added in version 3.2.

**源代码：** [Lib/argparse.py](https://github.com/python/cpython/tree/3.14/Lib/argparse.py)

备注

虽然 `argparse` 是默认推荐的用于实现基本命令行应用程序的标准库模块，但对于命令行应用程序的行为有更明确的要求的开发者可能会发现它并未提供所需层次的控制能力。 请参阅 [选择参数解析库](https://docs.python.org/zh-cn/3/library/optparse.html#choosing-an-argument-parser) 了解当 `argparse` 不支持特定应用程序需要的行为（例如完全禁用分散选项和位置参数，或接受以 `-` 开头的选项形参值即使它们对应了其它已定义的选项）时可以考虑的替代。

* * *

`argparse` 模块让编写用户友好的命令行接口变得容易。程序定义它需要哪些参数，`argparse` 将会知道如何从 [`sys.argv`](https://docs.python.org/zh-cn/3/library/sys.html#sys.argv "sys.argv") 解析它们。`argparse` 模块还能自动生成帮助和用法消息文本。该模块还会在用户向程序传入无效参数时发出错误提示。

`argparse` 模块对命令行界面的支持是围绕 [`argparse.ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 实例建立的。它是一个用于参数规格说明的容器并包含应用于解析器的一组选项:

parser \= argparse.ArgumentParser(
                    prog\='ProgramName',
                    description\='What the program does',
                    epilog\='Text at the bottom of help')

[`ArgumentParser.add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 方法将单个参数规格说明关联到解析器。它支持位置参数，接受各种值的选项，以及各种启用/禁用旗标:

parser.add\_argument('filename')           \# 位置参数
parser.add\_argument('-c', '--count')      \# 接受一个值的选项
parser.add\_argument('-v', '--verbose',
                    action\='store\_true')  \# 启用/禁用旗标

[`ArgumentParser.parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 方法运行解析器并将提取的数据放入 [`argparse.Namespace`](#argparse.Namespace "argparse.Namespace") 对象:

args \= parser.parse\_args()
print(args.filename, args.count, args.verbose)

## ArgumentParser 对象[¶](#argumentparser-objects "Link to this heading")

_class_ argparse.ArgumentParser(_prog\=None_, _usage\=None_, _description\=None_, _epilog\=None_, _parents\=\[\]_, _formatter\_class\=argparse.HelpFormatter_, _prefix\_chars\='-'_, _fromfile\_prefix\_chars\=None_, _argument\_default\=None_, _conflict\_handler\='error'_, _add\_help\=True_, _allow\_abbrev\=True_, _exit\_on\_error\=True_, _\*_, _suggest\_on\_error\=False_, _color\=True_)[¶](#argparse.ArgumentParser "Link to this definition")

创建一个新的 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 对象。所有的参数都应当作为关键字参数传入。每个参数在下面都有它更详细的描述，但简而言之，它们是：

-   [prog](#prog) - 程序的名称 (默认值：根据 `__main__` 模块属性和 `sys.argv[0]` 生成)
    
-   [usage](#usage) - 描述程序用途的字符串（默认值：从添加到解析器的参数生成）
    
-   [description](#description) - 要在参数帮助信息之前显示的文本（默认：无文本）
    
-   [epilog](#epilog) - 要在参数帮助信息之后显示的文本（默认：无文本）
    
-   [parents](#parents) - 一个 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 对象的列表，它们的参数也应包含在内
    
-   [formatter\_class](#formatter-class) - 用于自定义帮助文档输出格式的类
    
-   [prefix\_chars](#prefix-chars) - 可选参数的前缀字符集合（默认值： '-'）
    
-   [fromfile\_prefix\_chars](#fromfile-prefix-chars) - 当需要从文件中读取其他参数时，用于标识文件名的前缀字符集合 (默认值: `None`)
    
-   [argument\_default](#argument-default) - 参数的全局默认值 (默认值: `None`)
    
-   [conflict\_handler](#conflict-handler) - 解决冲突选项的策略（通常是不必要的）
    
-   [add\_help](#add-help) - 为解析器添加一个 `-h/--help` 选项 (默认值: `True`)
    
-   [allow\_abbrev](#allow-abbrev) - 如果缩写是无歧义的则允许对长选项进行缩写 (默认值: `True`)
    
-   [exit\_on\_error](#exit-on-error) - 确定当出现错误时，`ArgumentParser` 是否退出并显示错误信息。（默认值: `True`)
    
-   [suggest\_on\_error](#suggest-on-error) - 启用针对错误的参数选择和子解析器名称的提示 (默认值: `False`)
    
-   [color](#color) - 允许彩色输出 (默认值: `True`)
    

在 3.5 版本发生变更: 增加了 _allow\_abbrev_ 参数。

在 3.8 版本发生变更: 在之前的版本中，_allow\_abbrev_ 还会禁用短旗标分组，例如 `-vv` 表示为 `-v -v`。

在 3.9 版本发生变更: 添加了 _exit\_on\_error_ 形参。

在 3.14 版本发生变更: 增加了 _suggest\_on\_error_ 和 _color_ 形参。

以下部分描述这些参数如何使用。

### prog[¶](#prog "Link to this heading")

默认情况下，[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 根据 Python 解释器的运行方式，计算出要在帮助信息中显示的程序名称：

-   如果作为参数传递的是文件，则是 `sys.argv[0]` 的 [`basename`](https://docs.python.org/zh-cn/3/library/os.path.html#os.path.basename "os.path.basename")。
    
-   如果作为参数传递的是目录或 ZIP 文件，则是 Python 解释器名称，后接 `sys.argv[0]`。
    
-   如果使用 [`-m`](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-m) 选项则是在 Python 解释器名称后接 `-m` 再加模块或包的名称。
    

默认行为几乎总是符合需求因为它将使帮助消息与在命令行上唤起程序所用的字符串相匹配。不过，要更改此默认行为，可以将 `prog=` 参数传入 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 以提供另外的值:

\>>> parser \= argparse.ArgumentParser(prog\='myprogram')
\>>> parser.print\_help()
usage: myprogram \[-h\]

options:
 -h, --help  show this help message and exit

需要注意程序名称，无论是由 `sys.argv[0]`，由 `__main__` 模块属性还是由 `prog=` 参数来确定的，都可以在帮助消息中使用 `%(prog)s` 格式说明符来引用。

\>>> parser \= argparse.ArgumentParser(prog\='myprogram')
\>>> parser.add\_argument('--foo', help\='foo of the %(prog)s program')
\>>> parser.print\_help()
usage: myprogram \[-h\] \[--foo FOO\]

options:
 -h, --help  show this help message and exit
 --foo FOO   foo of the myprogram program

在 3.14 版本发生变更: 默认的 `prog` 值现在将反映出 `__main__` 实际是如何被执行的，而不是始终为 `os.path.basename(sys.argv[0])`。

### usage（用法）[¶](#usage "Link to this heading")

默认情况下，[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 会从它所包含的参数中计算出用法消息。默认消息可以通过 `usage=` 关键字参数进行覆盖:

\>>> parser \= argparse.ArgumentParser(prog\='PROG', usage\='%(prog)s \[options\]')
\>>> parser.add\_argument('--foo', nargs\='?', help\='foo help')
\>>> parser.add\_argument('bar', nargs\='+', help\='bar help')
\>>> parser.print\_help()
usage: PROG \[options\]

positional arguments:
 bar          bar help

options:
 -h, --help   show this help message and exit
 --foo \[FOO\]  foo help

在用法消息中可以使用 `%(prog)s` 格式说明符来填入程序名称。

当为主解析器指定了自定义用法消息时，你可能还需要考虑将 `prog` 参数传递给 [`add_subparsers()`](#argparse.ArgumentParser.add_subparsers "argparse.ArgumentParser.add_subparsers")，或将 `prog` 和 `usage` 参数传递给 `add_parser()`，以确保跨子解析器的命令前缀和用法信息一致。

### description（描述）[¶](#description "Link to this heading")

大多数对 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 构造器的调用都会使用 `description=` 关键字参数。这个参数简要描述这个程序做什么以及怎么做。在帮助消息中，这个描述会显示在命令行用法字符串和各种参数的帮助消息之间。

在默认情况下，description 将被换行以便适应给定的空间。如果想改变这种行为，见 [formatter\_class](#formatter-class) 参数。

### epilog[¶](#epilog "Link to this heading")

一些程序喜欢在参数帮助信息之后显示额外的对程序的描述。这种文字能够通过给 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 提供 `epilog=` 参数而被指定:

\>>> parser \= argparse.ArgumentParser(
...     description\='A foo that bars',
...     epilog\="And that's how you'd foo a bar")
\>>> parser.print\_help()
usage: argparse.py \[-h\]

A foo that bars

options:
 -h, --help  show this help message and exit

And that's how you'd foo a bar

和 [description](#description) 参数一样，`epilog=` 文本在默认情况下会换行，但是这种行为能够通过向 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 提供 [formatter\_class](#formatter-class) 参数来调整。

### parents[¶](#parents "Link to this heading")

有些时候，少数解析器会使用同一系列参数。单个解析器能够通过提供 `parents=` 参数给 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 而使用相同的参数而不是重复这些参数的定义。`parents=` 参数使用 `ArgumentParser` 对象的列表，从它们那里收集所有的位置和可选的行为，然后将这些行为加到正在构建的 `ArgumentParser` 对象。

\>>> parent\_parser \= argparse.ArgumentParser(add\_help\=False)
\>>> parent\_parser.add\_argument('--parent', type\=int)

\>>> foo\_parser \= argparse.ArgumentParser(parents\=\[parent\_parser\])
\>>> foo\_parser.add\_argument('foo')
\>>> foo\_parser.parse\_args(\['--parent', '2', 'XXX'\])
Namespace(foo='XXX', parent=2)

\>>> bar\_parser \= argparse.ArgumentParser(parents\=\[parent\_parser\])
\>>> bar\_parser.add\_argument('--bar')
\>>> bar\_parser.parse\_args(\['--bar', 'YYY'\])
Namespace(bar='YYY', parent=None)

请注意大多数父解析器会指定 `add_help=False`。否则，[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 将会看到两个 `-h/--help` 选项（一个在父参数中一个在子参数中）并且产生一个错误。

备注

你在通过 `parents=` 传递解析器之前必须完全初始化它们。如果你在子解析器之后改变父解析器，这些改变将不会反映在子解析器上。

### formatter\_class[¶](#formatter-class "Link to this heading")

[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 对象允许通过指定备用格式化类来自定义帮助格式。目前，有四种这样的类。

_class_ argparse.RawDescriptionHelpFormatter[¶](#argparse.RawDescriptionHelpFormatter "Link to this definition")

_class_ argparse.RawTextHelpFormatter[¶](#argparse.RawTextHelpFormatter "Link to this definition")

_class_ argparse.ArgumentDefaultsHelpFormatter[¶](#argparse.ArgumentDefaultsHelpFormatter "Link to this definition")

_class_ argparse.MetavarTypeHelpFormatter[¶](#argparse.MetavarTypeHelpFormatter "Link to this definition")

[`RawDescriptionHelpFormatter`](#argparse.RawDescriptionHelpFormatter "argparse.RawDescriptionHelpFormatter") 和 [`RawTextHelpFormatter`](#argparse.RawTextHelpFormatter "argparse.RawTextHelpFormatter") 在正文的描述和展示上给与了更多的控制。[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 对象会将 [description](#description) 和 [epilog](#epilog) 的文字在命令行中自动换行:

\>>> parser \= argparse.ArgumentParser(
...     prog\='PROG',
...     description\='''this description
...         was indented weird
...             but that is okay''',
...     epilog\='''
...             likewise for this epilog whose whitespace will
...         be cleaned up and whose words will be wrapped
...         across a couple lines''')
\>>> parser.print\_help()
usage: PROG \[-h\]

this description was indented weird but that is okay

options:
 -h, --help  show this help message and exit

likewise for this epilog whose whitespace will be cleaned up and whose words
will be wrapped across a couple lines

传 [`RawDescriptionHelpFormatter`](#argparse.RawDescriptionHelpFormatter "argparse.RawDescriptionHelpFormatter") 给 `formatter_class=` 表示 [description](#description) 和 [epilog](#epilog) 已经被正确的格式化了，不能在命令行中被自动换行:

\>>> parser \= argparse.ArgumentParser(
...     prog\='PROG',
...     formatter\_class\=argparse.RawDescriptionHelpFormatter,
...     description\=textwrap.dedent('''\\
...         Please do not mess up this text!
...         --------------------------------
...             I have indented it
...             exactly the way
...             I want it
...         '''))
\>>> parser.print\_help()
usage: PROG \[-h\]

Please do not mess up this text!
\--------------------------------
   I have indented it
   exactly the way
   I want it

options:
 -h, --help  show this help message and exit

[`RawTextHelpFormatter`](#argparse.RawTextHelpFormatter "argparse.RawTextHelpFormatter") 保留各种帮助文本的空白符，包括参数描述。但是，多个换行符会被替换为一个。如果你希望保留多个空行，请在换行符之间添加空格。

[`ArgumentDefaultsHelpFormatter`](#argparse.ArgumentDefaultsHelpFormatter "argparse.ArgumentDefaultsHelpFormatter") 自动添加默认的值的信息到每一个帮助信息的参数中:

\>>> parser \= argparse.ArgumentParser(
...     prog\='PROG',
...     formatter\_class\=argparse.ArgumentDefaultsHelpFormatter)
\>>> parser.add\_argument('--foo', type\=int, default\=42, help\='FOO!')
\>>> parser.add\_argument('bar', nargs\='\*', default\=\[1, 2, 3\], help\='BAR!')
\>>> parser.print\_help()
usage: PROG \[-h\] \[--foo FOO\] \[bar ...\]

positional arguments:
 bar         BAR! (default: \[1, 2, 3\])

options:
 -h, --help  show this help message and exit
 --foo FOO   FOO! (default: 42)

[`MetavarTypeHelpFormatter`](#argparse.MetavarTypeHelpFormatter "argparse.MetavarTypeHelpFormatter") 为它的值在每一个参数中使用 [type](#type) 的参数名当作它的显示名（而不是使用通常的格式 [dest](#dest) ):

\>>> parser \= argparse.ArgumentParser(
...     prog\='PROG',
...     formatter\_class\=argparse.MetavarTypeHelpFormatter)
\>>> parser.add\_argument('--foo', type\=int)
\>>> parser.add\_argument('bar', type\=float)
\>>> parser.print\_help()
usage: PROG \[-h\] \[--foo int\] float

positional arguments:
  float

options:
  -h, --help  show this help message and exit
  --foo int

### prefix\_chars[¶](#prefix-chars "Link to this heading")

大多数命令行选项会使用 `-` 作为前缀，例如 `-f/--foo`。如果解析器需要支持不同的或者额外的前缀字符，例如像 `+f` 或 `/foo` 之类的选项，可以在 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 构造器中使用 `prefix_chars=` 参数来指定它们:

\>>> parser \= argparse.ArgumentParser(prog\='PROG', prefix\_chars\='-+')
\>>> parser.add\_argument('+f')
\>>> parser.add\_argument('++bar')
\>>> parser.parse\_args('+f X ++bar Y'.split())
Namespace(bar='Y', f='X')

`prefix_chars=` 参数默认使用 `'-'`。提供一组不包括 `-` 的字符将导致 `-f/--foo` 选项不被允许。

### fromfile\_prefix\_chars[¶](#fromfile-prefix-chars "Link to this heading")

在某些时候，如在处理一个特别长的参数列表时，把参数列表保存在一个文件中而不是在命令行中打印出来会更有意义。如果提供 `fromfile_prefix_chars=` 参数给 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 构造器，则任何以指定字符打头的参数都将被当作文件来处理，并将被它们包含的参数所替代。举例来说:

\>>> with open('args.txt', 'w', encoding\=sys.getfilesystemencoding()) as fp:
...     fp.write('-f\\nbar')
...
\>>> parser \= argparse.ArgumentParser(fromfile\_prefix\_chars\='@')
\>>> parser.add\_argument('-f')
\>>> parser.parse\_args(\['-f', 'foo', '@args.txt'\])
Namespace(f='bar')

从文件读取的参数在默认情况下必须一个一行 (但是可参见 [`convert_arg_line_to_args()`](#argparse.ArgumentParser.convert_arg_line_to_args "argparse.ArgumentParser.convert_arg_line_to_args")) 并且它们被视为与命令行上的原始文件引用参数位于同一位置。所以在以上例子中，`['-f', 'foo', '@args.txt']` 的表达式和 `['-f', 'foo', '-f', 'bar']` 的表达式相同。

备注

每一行将被当作是单个参数，因此空白行将作为空字符串 (`''`) 被读取。

[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 使用 [filesystem encoding and error handler](https://docs.python.org/zh-cn/3/glossary.html#term-filesystem-encoding-and-error-handler) 来读取包含参数的文件。

`fromfile_prefix_chars=` 参数默认为 `None`，意味着参数不会被当作文件对待。

### argument\_default[¶](#argument-default "Link to this heading")

一般情况下，参数默认会通过设置一个默认到 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 或者调用带一组指定键值对的 [`ArgumentParser.set_defaults()`](#argparse.ArgumentParser.set_defaults "argparse.ArgumentParser.set_defaults") 方法。但是有些时候，为参数指定一个普遍适用的解析器会更有用。这能够通过传入 `argument_default=` 关键字参数给 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 来完成。例如，要全局禁止在 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 中创建属性，我们提供 `argument_default=SUPPRESS`:

\>>> parser \= argparse.ArgumentParser(argument\_default\=argparse.SUPPRESS)
\>>> parser.add\_argument('--foo')
\>>> parser.add\_argument('bar', nargs\='?')
\>>> parser.parse\_args(\['--foo', '1', 'BAR'\])
Namespace(bar='BAR', foo='1')
\>>> parser.parse\_args(\[\])
Namespace()

### allow\_abbrev[¶](#allow-abbrev "Link to this heading")

正常情况下，当你向 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 的 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 方法传入一个参数列表时，它会 [识别长选项的缩写](#prefix-matching)。

这个特性可以设置 `allow_abbrev` 为 `False` 来关闭:

\>>> parser \= argparse.ArgumentParser(prog\='PROG', allow\_abbrev\=False)
\>>> parser.add\_argument('--foobar', action\='store\_true')
\>>> parser.add\_argument('--foonley', action\='store\_false')
\>>> parser.parse\_args(\['--foon'\])
usage: PROG \[-h\] \[--foobar\] \[--foonley\]
PROG: error: unrecognized arguments: --foon

Added in version 3.5.

### conflict\_handler[¶](#conflict-handler "Link to this heading")

[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 对象不允许在相同选项字符串下有两种行为。默认情况下， `ArgumentParser` 对象会产生一个异常如果去创建一个正在使用的选项字符串参数:

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> parser.add\_argument('-f', '--foo', help\='old foo help')
\>>> parser.add\_argument('--foo', help\='new foo help')
Traceback (most recent call last):
 ..
ArgumentError: argument --foo: conflicting option string(s): --foo

有些时候（例如：使用 [parents](#parents)），重写旧的有相同选项字符串的参数会更有用。为了产生这种行为，`'resolve'` 值可以提供给 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 的 `conflict_handler=` 参数:

\>>> parser \= argparse.ArgumentParser(prog\='PROG', conflict\_handler\='resolve')
\>>> parser.add\_argument('-f', '--foo', help\='old foo help')
\>>> parser.add\_argument('--foo', help\='new foo help')
\>>> parser.print\_help()
usage: PROG \[-h\] \[-f FOO\] \[--foo FOO\]

options:
 -h, --help  show this help message and exit
 -f FOO      old foo help
 --foo FOO   new foo help

注意 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 对象只能在一个动作的所有选项字符串都被重写时才会移除它。所以，在上面的例子中，旧的 `-f/--foo` 动作会与 `-f` 动作保持一致，因为只有 `--foo` 选项字符串被重写。

### add\_help[¶](#add-help "Link to this heading")

在默认情况下，[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 对象会添加一个简单地显示解析器的帮助消息的选项。如果在命令行中提供了 `-h` 或 `--help`，则会打印 `ArgumentParser` 帮助消息。

有时候可能会需要关闭额外的帮助信息。这可以通过在 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 中设置 `add_help=` 参数为 `False` 来实现:

\>>> parser \= argparse.ArgumentParser(prog\='PROG', add\_help\=False)
\>>> parser.add\_argument('--foo', help\='foo help')
\>>> parser.print\_help()
usage: PROG \[--foo FOO\]

options:
 --foo FOO  foo help

帮助选项一般为 `-h/--help`。如果 `prefix_chars=` 被指定并且没有包含 `-` 字符，在这种情况下，`-h` `--help` 不是有效的选项。此时，`prefix_chars` 的第一个字符将用作帮助选项的前缀:

\>>> parser \= argparse.ArgumentParser(prog\='PROG', prefix\_chars\='+/')
\>>> parser.print\_help()
usage: PROG \[+h\]

options:
  +h, ++help  show this help message and exit

### exit\_on\_error[¶](#exit-on-error "Link to this heading")

通常，当你向 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 的 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 方法传入一个无效的参数列表时，它会将 _message_ 打印到 [`sys.stderr`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stderr "sys.stderr") 并附带状态码 2 退出程序。

如果用户想要手动捕获错误，可通过将 `exit_on_error` 设为 `False` 来启用该特性:

\>>> parser \= argparse.ArgumentParser(exit\_on\_error\=False)
\>>> parser.add\_argument('--integers', type\=int)
\_StoreAction(option\_strings=\['--integers'\], dest='integers', nargs=None, const=None, default=None, type=<class 'int'>, choices=None, help=None, metavar=None)
\>>> try:
...     parser.parse\_args('--integers a'.split())
... except argparse.ArgumentError:
...     print('Catching an argumentError')
...
Catching an argumentError

Added in version 3.9.

### suggest\_on\_error[¶](#suggest-on-error "Link to this heading")

默认情况下，当用户传递无效的参数选择或子解析器名称时，[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 将退出并显示错误信息，并列出允许的参数选择（如果指定）或子解析器名称作为错误消息的一部分。

如果用户希望启用对输入错误的参数选择和子解析器名称的建议，可以通过将 `suggest_on_error` 设置为 `True` 来启用该特性。注意，这只适用于指定的选择是字符串的参数:

\>>> parser \= argparse.ArgumentParser(suggest\_on\_error\=True)
\>>> parser.add\_argument('--action', choices\=\['debug', 'dryrun'\])
\>>> parser.parse\_args(\['--action', 'debugg'\])
usage: tester.py \[-h\] \[--action {debug,dryrun}\]
tester.py: error: argument --action: invalid choice: 'debugg', maybe you meant 'debug'? (choose from debug, dryrun)

如果你正在编写需要与旧版本的 Python 兼容的代码，并希望在可用时使用 `suggest_on_error`，你可以在初始化解析器后将其设置为属性，而不是使用关键字参数:

\>>> parser \= argparse.ArgumentParser(description\='Process some integers.')
\>>> parser.suggest\_on\_error \= True

Added in version 3.14.

### color[¶](#color "Link to this heading")

默认情况下，帮助信息会使用 [ANSI 转义序列](https://en.wikipedia.org/wiki/ANSI_escape_code) 以彩色形式输出。如果你需要纯文本格式的帮助信息，可以 [在你的本地环境中](https://docs.python.org/zh-cn/3/using/cmdline.html#using-on-controlling-color) 禁用此功能，或者在参数解析器中通过将 `color` 参数设置为 `False` 来实现:

\>>> parser \= argparse.ArgumentParser(description\='处理一些整数。',
...                                  color\=False)
\>>> parser.add\_argument('--action', choices\=\['sum', 'max'\])
\>>> parser.add\_argument('integers', metavar\='N', type\=int, nargs\='+',
...                     help\='一个用于累加器的整数值')
\>>> parser.parse\_args(\['--help'\])

请注意当 `color=True` 时，彩色输出效果同时取决于环境变量和终端功能。不过，如果 `color=False`，彩色输出将始终被禁用，即使设置了 `FORCE_COLOR` 等环境变量。

备注

在把 stderr 重定向到文件时错误消息将包括颜色代码。要避免此问题，可以设置 [`NO_COLOR`](https://no-color.org/) 或 [`PYTHON_COLORS`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHON_COLORS) 环境变量 (例如，`NO_COLOR=1 python script.py 2> errors.txt`).

Added in version 3.14.

## add\_argument() 方法[¶](#the-add-argument-method "Link to this heading")

ArgumentParser.add\_argument(_name or flags..._, _\*_\[, _action_\]\[, _nargs_\]\[, _const_\]\[, _default_\]\[, _type_\]\[, _choices_\]\[, _required_\]\[, _help_\]\[, _metavar_\]\[, _dest_\]\[, _deprecated_\])[¶](#argparse.ArgumentParser.add_argument "Link to this definition")

定义单个的命令行参数应当如何解析。每个形参都在下面有它自己更多的描述，长话短说有：

-   [name or flags](#name-or-flags) - 一个名称或是由选项字符串组成的列表，例如 `'foo'` 或 `'-f', '--foo'`。
    
-   [action](#action) - 当参数在命令行中出现时使用的动作基本类型。
    
-   [nargs](#nargs) - 命令行参数应当消耗的数目。
    
-   [const](#const) - 被一些 [action](#action) 和 [nargs](#nargs) 选择所需求的常数。
    
-   [default](#default) - 当参数未在命令行中出现并且也不存在于命名空间对象时所产生的值。
    
-   [type](#type) - 命令行参数应当被转换成的类型。
    
-   [choices](#choices) - 由允许作为参数的值组成的序列。
    
-   [required](#required) - 此命令行选项是否可省略（仅选项可用）。
    
-   [help](#help) - 一个此选项作用的简单描述。
    
-   [metavar](#metavar) - 在使用方法消息中使用的参数值示例。
    
-   [dest](#dest) - 被添加到 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 所返回对象上的属性名。
    
-   [deprecated](#deprecated) - 参数的使用是否已被弃用。
    

此方法将返回一个代表参数内容的 [`Action`](#argparse.Action "argparse.Action") 对象。

以下部分描述这些参数如何使用。

### name or flags[¶](#name-or-flags "Link to this heading")

[`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 方法必须知道是要接收一个可选参数，如 `-f` 或 `--foo`，还是一个位置参数，如由文件名组成的列表。因此首先传递给 `add_argument()` 的参数必须是一组旗标，或一个简单的参数名称。

例如，可以这样创建可选参数:

\>>> parser.add\_argument('-f', '--foo')

而位置参数可以这么创建:

\>>> parser.add\_argument('bar')

当 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 被调用，选项会以 `-` 前缀识别，剩下的参数则会被假定为位置参数:

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> parser.add\_argument('-f', '--foo')
\>>> parser.add\_argument('bar')
\>>> parser.parse\_args(\['BAR'\])
Namespace(bar='BAR', foo=None)
\>>> parser.parse\_args(\['BAR', '--foo', 'FOO'\])
Namespace(bar='BAR', foo='FOO')
\>>> parser.parse\_args(\['--foo', 'FOO'\])
usage: PROG \[-h\] \[-f FOO\] bar
PROG: error: the following arguments are required: bar

在默认情况下，`argparse` 会自动处理参数的内部命名和显示名称，简化相关过程而无需额外配置。 因此，你不需要指定 [dest](#dest) 和 [metavar](#metavar) 形参。 对于可选参数，[dest](#dest) 形参默认为参数名，用下划线 `_` 替换连字符 `-`。 [metavar](#metavar) 形参默认为大写的名称。 例如:

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> parser.add\_argument('--foo-bar')
\>>> parser.parse\_args(\['--foo-bar', 'FOO-BAR'\])
Namespace(foo\_bar='FOO-BAR')
\>>> parser.print\_help()
usage:  \[-h\] \[--foo-bar FOO-BAR\]

optional arguments:
 -h, --help  show this help message and exit
 --foo-bar FOO-BAR

### action[¶](#action "Link to this heading")

[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 对象将命令行参数与动作相关联。这些动作可以做与它们相关联的命令行参数的任何事，尽管大多数动作只是简单的向 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 返回的对象上添加属性。`action` 命名参数指定了这个命令行参数应当如何处理。可用的动作有：

-   `'store'` - 这用于存储参数的值。这是默认的动作。
    
-   `'store_const'` - 存储由 [const](#const) 关键字参数指定的值；请注意 [const](#const) 关键字参数默认为 `None`。`'store_const'` 动作最常被用于指定某类旗标的可选参数。例如:
    
    \>>> parser \= argparse.ArgumentParser()
    \>>> parser.add\_argument('--foo', action\='store\_const', const\=42)
    \>>> parser.parse\_args(\['--foo'\])
    Namespace(foo=42)
    
-   `'store_true'` 和 `'store_false'` - 这些是 `'store_const'` 分别用于存储 `True` 和 `False` 的特例，其默认值为 `False` 和 `True`:
    
    \>>> parser \= argparse.ArgumentParser()
    \>>> parser.add\_argument('--foo', action\='store\_true')
    \>>> parser.add\_argument('--bar', action\='store\_false')
    \>>> parser.add\_argument('--baz', action\='store\_false')
    \>>> parser.parse\_args('--foo --bar'.split())
    Namespace(foo=True, bar=False, baz=True)
    
-   `'append'` - 这会将各个参数值添加到列表。它适用于允许一个选项被多次指定的情况。如果默认值是一个非空列表，则被解析的值将以默认列表的元素打头而任何来自命令行的值将添加到这些默认值之后。示例用法:
    
    \>>> parser \= argparse.ArgumentParser()
    \>>> parser.add\_argument('--foo', action\='append', default\=\['0'\])
    \>>> parser.parse\_args('--foo 1 --foo 2'.split())
    Namespace(foo=\['0', '1', '2'\])
    
-   `'append_const'` - 这会将由 [const](#const) 关键字参数指定的值添加到一个列表；请注意 [const](#const) 关键字参数默认为 `None`。`'append_const'` 动作通常适用于多个参数需要将常量存储到同一个列表的场合。例如:
    
    \>>> parser \= argparse.ArgumentParser()
    \>>> parser.add\_argument('--str', dest\='types', action\='append\_const', const\=str)
    \>>> parser.add\_argument('--int', dest\='types', action\='append\_const', const\=int)
    \>>> parser.parse\_args('--str --int'.split())
    Namespace(types=\[<class 'str'>, <class 'int'>\])
    
-   `'extend'` - 这会将来自多值参数的每个条目添加到一个列表。`'extend'` 动作通常配合 [nargs](#nargs) 关键字参数值 `'+'` 或 `'*'` 使用。请注意当 [nargs](#nargs) 为 `None` (默认值) 或 `'?'` 时，参数字符串的每个字符都将被添加到列表。示例用法:
    
    \>>> parser \= argparse.ArgumentParser()
    \>>> parser.add\_argument("--foo", action\="extend", nargs\="+", type\=str)
    \>>> parser.parse\_args(\["--foo", "f1", "--foo", "f2", "f3", "f4"\])
    Namespace(foo=\['f1', 'f2', 'f3', 'f4'\])
    
    Added in version 3.8.
    
-   `'count'` - 这将统计一个参数出现的次数。例如，这适用于递增详情级别:
    
    \>>> parser \= argparse.ArgumentParser()
    \>>> parser.add\_argument('--verbose', '-v', action\='count', default\=0)
    \>>> parser.parse\_args(\['-vvv'\])
    Namespace(verbose=3)
    
    Unless explicitly set, the _default_ will be `None`. If the default value is a non-zero number, the count starts from that number rather than from zero.
    
-   `'help'` - 打印所有当前解析器中的选项和参数的完整帮助信息，然后退出。默认情况下，一个 help 动作会被自动加入解析器。关于输出是如何创建的，参阅 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser")。
    
-   `'version'` - 期望有一个 `version=` 命名参数在 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 调用中，并打印版本信息并在调用后退出:
    
    \>>> import argparse
    \>>> parser \= argparse.ArgumentParser(prog\='PROG')
    \>>> parser.add\_argument('--version', action\='version', version\='%(prog)s 2.0')
    \>>> parser.parse\_args(\['--version'\])
    PROG 2.0
    

你也可以通过传递一个 [`Action`](#argparse.Action "argparse.Action") 子类 (例如 [`BooleanOptionalAction`](#argparse.BooleanOptionalAction "argparse.BooleanOptionalAction")) 或实现相同接口的其他对象来指定任意操作。需要注意的是，只有那些会消耗命令行参数的操作（例如 `'store'`、`'append'`、`'extend'`，或是设置了非零 `nargs` 值的自定义操作）才能与位置参数一起使用。

创建自定义动作的推荐方式是扩展 [`Action`](#argparse.Action "argparse.Action")，重写 `__call__()` 方法以及可选的 `__init__()` 和 `format_usage()` 方法。你还可以使用 [`register()`](#argparse.ArgumentParser.register "argparse.ArgumentParser.register") 方法注册自定义动作并通过其注册名称来引用它们。

一个自定义动作的例子:

\>>> class FooAction(argparse.Action):
...     def \_\_init\_\_(self, option\_strings, dest, nargs\=None, \*\*kwargs):
...         if nargs is not None:
...             raise ValueError("nargs not allowed")
...         super().\_\_init\_\_(option\_strings, dest, \*\*kwargs)
...     def \_\_call\_\_(self, parser, namespace, values, option\_string\=None):
...         print('%r %r %r' % (namespace, values, option\_string))
...         setattr(namespace, self.dest, values)
...
\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo', action\=FooAction)
\>>> parser.add\_argument('bar', action\=FooAction)
\>>> args \= parser.parse\_args('1 --foo 2'.split())
Namespace(bar=None, foo=None) '1' None
Namespace(bar='1', foo=None) '2' '--foo'
\>>> args
Namespace(bar='1', foo='2')

更多描述，见 [`Action`](#argparse.Action "argparse.Action")。

### nargs[¶](#nargs "Link to this heading")

[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 对象通常会将一个单独的命令行参数关联到一个单独的要执行的动作。`nargs` 关键字参数会将不同数量的命令行参数关联到一个单独的动作。另请参阅 [指定有歧义的参数](https://docs.python.org/zh-cn/3/howto/argparse.html#specifying-ambiguous-arguments)。受支持的值有：

-   `N` (一个整数)。命令行中的 `N` 个参数会被聚集到一个列表中。 例如:
    
    \>>> parser \= argparse.ArgumentParser()
    \>>> parser.add\_argument('--foo', nargs\=2)
    \>>> parser.add\_argument('bar', nargs\=1)
    \>>> parser.parse\_args('c --foo a b'.split())
    Namespace(bar=\['c'\], foo=\['a', 'b'\])
    
    注意 `nargs=1` 会产生一个单元素列表。这和默认的元素本身是不同的。
    

-   `'?'`。如果可能的话，会从命令行中消耗一个参数，并产生一个单独项。如果当前没有命令行参数，将会产生 [default](#default) 值。注意对于可选参数来说，还有一个额外情况 —— 出现了选项字符串但没有跟随命令行参数，在此情况下将会产生 [const](#const) 值。一些说明这种情况的例子如下:
    
    \>>> parser \= argparse.ArgumentParser()
    \>>> parser.add\_argument('--foo', nargs\='?', const\='c', default\='d')
    \>>> parser.add\_argument('bar', nargs\='?', default\='d')
    \>>> parser.parse\_args(\['XX', '--foo', 'YY'\])
    Namespace(bar='XX', foo='YY')
    \>>> parser.parse\_args(\['XX', '--foo'\])
    Namespace(bar='XX', foo='c')
    \>>> parser.parse\_args(\[\])
    Namespace(bar='d', foo='d')
    
    `nargs='?'` 的一个更普遍用法是允许可选的输入或输出文件:
    
    \>>> parser \= argparse.ArgumentParser()
    \>>> parser.add\_argument('infile', nargs\='?')
    \>>> parser.add\_argument('outfile', nargs\='?')
    \>>> parser.parse\_args(\['input.txt', 'output.txt'\])
    Namespace(infile='input.txt', outfile='output.txt')
    \>>> parser.parse\_args(\['input.txt'\])
    Namespace(infile='input.txt', outfile=None)
    \>>> parser.parse\_args(\[\])
    Namespace(infile=None, outfile=None)
    

-   `'*'`。所有当前命令行参数被聚集到一个列表中。注意通过 `nargs='*'` 来实现多个位置参数通常没有意义，但是多个选项是可能的。例如:
    
    \>>> parser \= argparse.ArgumentParser()
    \>>> parser.add\_argument('--foo', nargs\='\*')
    \>>> parser.add\_argument('--bar', nargs\='\*')
    \>>> parser.add\_argument('baz', nargs\='\*')
    \>>> parser.parse\_args('a b --foo x y --bar 1 2'.split())
    Namespace(bar=\['1', '2'\], baz=\['a', 'b'\], foo=\['x', 'y'\])
    

-   `'+'`。和 `'*'` 类似，所有当前命令行参数被聚集到一个列表中。另外，如果不存在至少一个命令行参数则会生成一条错误消息。例如:
    
    \>>> parser \= argparse.ArgumentParser(prog\='PROG')
    \>>> parser.add\_argument('foo', nargs\='+')
    \>>> parser.parse\_args(\['a', 'b'\])
    Namespace(foo=\['a', 'b'\])
    \>>> parser.parse\_args(\[\])
    usage: PROG \[-h\] foo \[foo ...\]
    PROG: error: the following arguments are required: foo
    

如果未提供 `nargs` 关键字参数，则消耗参数的数量将由 [action](#action) 来确定。通常这意味着消耗一个命令行参数并产生一个条目（而非列表）。不消耗命令行参数的动作 (例如 `'store_const'`) 则要设置 `nargs=0`.

### const[¶](#const "Link to this heading")

[`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 的 `const` 参数用于保存不从命令行中读取但被各种 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 动作需求的常数值。最常用的两例为：

-   当 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 附带 `action='store_const'` 或 `action='append_const'` 被调用时。这些动作会把 `const` 值添加到 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 所返回的对象的属性中。请查看 [action](#action) 的示例描述。如果未将 `const` 提供给 `add_argument()`，它将接收一个 `None` 的默认值。
    
-   当 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 附带选项字符串 (如 `-f` 或 `--foo`) 和 `nargs='?'` 被调用的时候。这会创建一个可以跟随零至一个命令行参数的选项参数。当解析该命令行时，如果选项字符串没有跟随任何命令行参数，将使用来自 `const` 的值。请参阅 [nargs](#nargs) 描述中的示例。
    

在 3.11 版本发生变更: 在默认情况下 `const=None`，包括 `action='append_const'` 或 `action='store_const'` 的时候。

### 默认值[¶](#default "Link to this heading")

所有选项和一些位置参数可能在命令行中被忽略。[`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 的命名参数 `default`，默认值为 `None`，指定了在命令行参数未出现时应当使用的值。对于选项，`default` 值在选项未在命令行中出现时使用:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo', default\=42)
\>>> parser.parse\_args(\['--foo', '2'\])
Namespace(foo='2')
\>>> parser.parse\_args(\[\])
Namespace(foo=42)

如果目标命名空间已经有一个属性集，则 _default_ 动作不会覆盖它:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo', default\=42)
\>>> parser.parse\_args(\[\], namespace\=argparse.Namespace(foo\=101))
Namespace(foo=101)

如果 `default` 值是一个字符串，解析器解析此值就像一个命令行参数。特别是，在将属性设置在 [`Namespace`](#argparse.Namespace "argparse.Namespace") 的返回值之前，解析器应用任何提供的 [type](#type) 转换参数。否则解析器使用原值:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--length', default\='10', type\=int)
\>>> parser.add\_argument('--width', default\=10.5, type\=int)
\>>> parser.parse\_args()
Namespace(length=10, width=10.5)

对于 [nargs](#nargs) 等于 `?` 或 `*` 的位置参数，`default` 值在没有命令行参数出现时使用:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('foo', nargs\='?', default\=42)
\>>> parser.parse\_args(\['a'\])
Namespace(foo='a')
\>>> parser.parse\_args(\[\])
Namespace(foo=42)

Because `nargs='*'` gathers any supplied values into a list, an absent positional argument yields an empty list (`[]`). Only a non-`None` _default_ overrides this (so `default=None` still gives `[]`).

对于 [required](#required) 参数，`default` 值将被忽略。例如，这将适用于带有 `?` 和 `*` 以外的 [nargs](#nargs) 值的位置参数，或者被标记为 `required=True` 的可选参数。

提供 `default=argparse.SUPPRESS` 导致命令行参数未出现时没有属性被添加:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo', default\=argparse.SUPPRESS)
\>>> parser.parse\_args(\[\])
Namespace()
\>>> parser.parse\_args(\['--foo', '1'\])
Namespace(foo='1')

### type -- 类型[¶](#type "Link to this heading")

默认情况下，解析器会将命令行参数当作简单字符串读入。然而，命令行字符串经常应当被解读为其他类型，例如 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 或 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")。[`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 的 `type` 关键字允许执行任何必要的类型检查和类型转换。

如果 [type](#type) 关键字使用了 [default](#default) 关键字，则类型转换器仅会在默认值为字符串时被应用。

传给 `type` 的参数可以是接受一个字符串或一个已注册类型名称 (参见 [`register()`](#argparse.ArgumentParser.register "argparse.ArgumentParser.register")) 的可调用对象。如果该函数引发了 [`ArgumentTypeError`](#argparse.ArgumentTypeError "argparse.ArgumentTypeError"), [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError") 或 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")，异常将被捕获并显示经良好格式化的错误消息。其他异常类型则不会被处理。

普通内置类型和函数可被用作类型转换器：

import argparse
import pathlib

parser \= argparse.ArgumentParser()
parser.add\_argument('count', type\=int)
parser.add\_argument('distance', type\=float)
parser.add\_argument('street', type\=ascii)
parser.add\_argument('code\_point', type\=ord)
parser.add\_argument('datapath', type\=pathlib.Path)

用户自定义的函数也可以被使用：

\>>> def hyphenated(string):
...     return '-'.join(\[word\[:4\] for word in string.casefold().split()\])
...
\>>> parser \= argparse.ArgumentParser()
\>>> \_ \= parser.add\_argument('short\_title', type\=hyphenated)
\>>> parser.parse\_args(\['"The Tale of Two Cities"'\])
Namespace(short\_title='"the-tale-of-two-citi')

The [`bool()`](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool") function is not recommended as a type converter. All it does is convert empty strings to `False` and non-empty strings to `True`. This is usually not what is desired:

\>>> parser \= argparse.ArgumentParser()
\>>> \_ \= parser.add\_argument('--verbose', type\=bool)
\>>> parser.parse\_args(\['--verbose', 'False'\])
Namespace(verbose=True)

请参阅 [`BooleanOptionalAction`](#argparse.BooleanOptionalAction "argparse.BooleanOptionalAction") 或 `action='store_true'` 了解常见替代选项。

通常，`type` 关键字是仅应被用于只会引发上述三种被支持的异常的简单转换的便捷选项。任何具有更复杂错误处理或资源管理的转换都应当在参数被解析后由下游代码来完成。

例如，JSON 或 YAML 转换具有复杂的错误情况，需要能给出比 `type` 关键字所能给出的更好的报告。[`JSONDecodeError`](https://docs.python.org/zh-cn/3/library/json.html#json.JSONDecodeError "json.JSONDecodeError") 将不会被良好地格式化而 [`FileNotFoundError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#FileNotFoundError "FileNotFoundError") 异常则完全不会被处理。

甚至 [`FileType`](#argparse.FileType "argparse.FileType") 在用于 `type` 关键字时也是有限制的。如果一个参数使用了 `FileType` 并且有一个后续参数出错，则将报告错误但文件并不会被自动关闭。在此情况下，更好的做法是等待直到解析器运行完毕再使用 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句来管理文件。

对于简单地检查一组固定值的类型检查器，请考虑改用 [choices](#choices) 关键字。

### choices[¶](#choices "Link to this heading")

某些命令行参数应当从一组受限的值中选择。这可以通过将一个序列对象作为 _choices_ 关键字参数传给 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 来处理。当执行命令行解析时，参数值将被检查，如果参数不是可接受的值之一就将显示错误消息:

\>>> parser \= argparse.ArgumentParser(prog\='game.py')
\>>> parser.add\_argument('move', choices\=\['rock', 'paper', 'scissors'\])
\>>> parser.parse\_args(\['rock'\])
Namespace(move='rock')
\>>> parser.parse\_args(\['fire'\])
usage: game.py \[-h\] {rock,paper,scissors}
game.py: error: argument move: invalid choice: 'fire' (choose from 'rock',
'paper', 'scissors')

任何序列都可作为 _choices_ 值传入，因此 [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 对象、[`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple") 对象以及自定义序列都是受支持的。

不建议使用 [`enum.Enum`](https://docs.python.org/zh-cn/3/library/enum.html#enum.Enum "enum.Enum")，因为要控制其在用法、帮助和错误消息中的外观是很困难的。

请注意 _choices_ 会在执行任何 [type](#type) 转换后被检查，因此 _choices_ 中的对象应当与指定的 [type](#type) 相匹配。这可能使得 _choices_ 在使用、帮助或错误消息中显示异常。

要保持 _choices_ 显示对用户友好，可考虑使用转换和格式化值的自定义类型包装器，或省略 [type](#type) 并在你的应用代码中处理转换。

已格式化的选项会覆盖默认的 _metavar_，该值一般是派生自 _dest_。这通常就是你所需要的，因为用户永远不会看到 _dest_ 形参。如果不想要这样的显示（或许因为有很多选择），只需指定一个显式的 [metavar](#metavar)。

### required[¶](#required "Link to this heading")

通常，`argparse` 模块会假定像 `-f` 和 `--bar` 这样的旗标是表示 _可选_ 参数，它们总是可以在命令行中被省略。要让一个选项成为 _必需_，则可以将 `True` 作为 `required=` 关键字参数传给 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument"):

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo', required\=True)
\>>> parser.parse\_args(\['--foo', 'BAR'\])
Namespace(foo='BAR')
\>>> parser.parse\_args(\[\])
usage: \[-h\] --foo FOO
: error: the following arguments are required: --foo

如这个例子所示，如果一个选项被标记为 `required`，则当该选项未在命令行中出现时，[`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 将会报告一个错误。

备注

必需的选项通常被认为是不适宜的，因为用户会预期 _options_ 都是 _可选的_，因此在可能的情况下应当避免使用它们。

### help[¶](#help "Link to this heading")

`help` 值是一个包含参数的简短描述的字符串。当用户请求帮助时（一般是通过在命令行中使用 `-h` 或 `--help` 的方式），这些 `help` 描述信息将随每个参数一同显示。

`help` 字符串可包括各种格式描述符以避免重复使用程序名称或参数 [default](#default) 等文本。有效的描述符包括程序名称 `%(prog)s` 和传给 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 的大部分关键字参数，例如 `%(default)s`, `%(type)s` 等等:

\>>> parser \= argparse.ArgumentParser(prog\='frobble')
\>>> parser.add\_argument('bar', nargs\='?', type\=int, default\=42,
...                     help\='the bar to %(prog)s (default: %(default)s)')
\>>> parser.print\_help()
usage: frobble \[-h\] \[bar\]

positional arguments:
 bar     the bar to frobble (default: 42)

options:
 -h, --help  show this help message and exit

由于帮助字符串支持 %-formatting，如果你希望在帮助字符串中显示 `%` 字面值，你必须将其转义为 `%%`。

`argparse` 支持静默特定选项的帮助条目，具体方式是将 `help` 值设为 `argparse.SUPPRESS`:

\>>> parser \= argparse.ArgumentParser(prog\='frobble')
\>>> parser.add\_argument('--foo', help\=argparse.SUPPRESS)
\>>> parser.print\_help()
usage: frobble \[-h\]

options:
  -h, --help  show this help message and exit

### metavar[¶](#metavar "Link to this heading")

当 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 生成帮助消息时，它需要用某种方式来引用每个预期的参数。默认情况下，`ArgumentParser` 对象使用 [dest](#dest) 值作为每个对象的“名字”。默认情况下，对于位置参数动作，[dest](#dest) 值将被直接使用，而对于可选参数动作，[dest](#dest) 值将被转为大写形式。因此，对于 `dest='bar'` 位置参数的引用形式将为 `bar`。带有单个命令行参数的可选参数 `--foo` 的引用形式将为 `FOO`。一个样例:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo')
\>>> parser.add\_argument('bar')
\>>> parser.parse\_args('X --foo Y'.split())
Namespace(bar='X', foo='Y')
\>>> parser.print\_help()
usage:  \[-h\] \[--foo FOO\] bar

positional arguments:
 bar

options:
 -h, --help  show this help message and exit
 --foo FOO

可以使用 `metavar` 来指定一个替代名称:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo', metavar\='YYY')
\>>> parser.add\_argument('bar', metavar\='XXX')
\>>> parser.parse\_args('X --foo Y'.split())
Namespace(bar='X', foo='Y')
\>>> parser.print\_help()
usage:  \[-h\] \[--foo YYY\] XXX

positional arguments:
 XXX

options:
 -h, --help  show this help message and exit
 --foo YYY

请注意 `metavar` 仅改变 _显示的_ 名称 - [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 对象的属性名称仍然会由 [dest](#dest) 值确定。

不同的 `nargs` 值可能导致 metavar 被多次使用。提供一个元组给 `metavar` 即为每个参数指定不同的显示信息:

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> parser.add\_argument('-x', nargs\=2)
\>>> parser.add\_argument('--foo', nargs\=2, metavar\=('bar', 'baz'))
\>>> parser.print\_help()
usage: PROG \[-h\] \[-x X X\] \[--foo bar baz\]

options:
 -h, --help     show this help message and exit
 -x X X
 --foo bar baz

### dest[¶](#dest "Link to this heading")

大多数 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 动作会添加一些值作为 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 所返回对象的一个属性。该属性的名称由 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 的 `dest` 关键字参数确定。 对于位置参数动作，`dest` 通常会作为 `add_argument()` 的第一个参数提供:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('bar')
\>>> parser.parse\_args(\['XXX'\])
Namespace(bar='XXX')

对于可选参数动作，`dest` 的值通常取自选项字符串。[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 会通过接受第一个长选项字符串并去掉开头的 `--` 字符串来生成 `dest` 的值。如果没有提供长选项字符串，则 `dest` 将通过接受第一个短选项字符串并去掉开头的 `-` 字符来获得。任何内部的 `-` 字符都将被转换为 `_` 字符以确保字符串是有效的属性名称。下面的例子显示了这种行为:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('-f', '--foo-bar', '--foo')
\>>> parser.add\_argument('-x', '-y')
\>>> parser.parse\_args('-f 1 -x 2'.split())
Namespace(foo\_bar='1', x='2')
\>>> parser.parse\_args('--foo 1 -y 2'.split())
Namespace(foo\_bar='1', x='2')

`dest` 允许提供自定义属性名称:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo', dest\='bar')
\>>> parser.parse\_args('--foo XXX'.split())
Namespace(bar='XXX')

Multiple arguments may share the same `dest`. By default, the value from the last such argument given on the command line wins. Use `action='append'` to collect values from all of them into a list instead. For conflicting _option strings_ rather than `dest` names, see [conflict\_handler](#conflict-handler).

### deprecated[¶](#deprecated "Link to this heading")

在一个项目的生命期内，某些命令行参数可能需要被移除。在移除它们之前，你应当通知你的用户这些参数已被弃用并将被移除。[`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 的 `deprecated` 关键字参数指明参数已被弃用并将在未来被移除，其默认值为 `False`。对于每个参数，如果 `deprecated` 为 `True`，那么当该参数被使用时会打印一条警告到 [`sys.stderr`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stderr "sys.stderr"):

\>>> import argparse
\>>> parser \= argparse.ArgumentParser(prog\='snake.py')
\>>> parser.add\_argument('--legs', default\=0, type\=int, deprecated\=True)
\>>> parser.parse\_args(\[\])
Namespace(legs=0)
\>>> parser.parse\_args(\['--legs', '4'\])
snake.py: warning: option '--legs' is deprecated
Namespace(legs=4)

Added in version 3.13.

### Action 类[¶](#action-classes "Link to this heading")

`Action` 类实现了 Action API，是一个返回可调用对象的可调用对象，它返回的可调用对象将处理来自命令行的参数。任何遵循此 API 的对象均可作为 `action` 形参传给 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument")。

_class_ argparse.Action(_option\_strings_, _dest_, _nargs\=None_, _const\=None_, _default\=None_, _type\=None_, _choices\=None_, _required\=False_, _help\=None_, _metavar\=None_)[¶](#argparse.Action "Link to this definition")

`Action` 对象会被 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 用来代表从命令行中的一个或多个字符串中解析出单个参数所必须的信息。`Action` 类必须接受两个位置参数加上传给 [`ArgumentParser.add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 的除了 `action` 本身的任何关键字参数。

`Action` 的实例（或作为 `action` 形参的任何可调用对象的返回值）应当定义 `dest`, `option_strings`, `default`, `type`, `required`, `help` 等属性。确定这些属性的最容易的方式是调用 `Action.__init__()`。

\_\_call\_\_(_parser_, _namespace_, _values_, _option\_string\=None_)[¶](#argparse.Action.__call__ "Link to this definition")

`Action` 的实例应当为可调用对象，因此所有子类都必须重写 `__call__()` 方法，它应当接受四个形参：

-   _parser_ - 包含此动作的 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 对象。
    
-   _namespace_ - 将由 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 返回的 [`Namespace`](#argparse.Namespace "argparse.Namespace") 对象。大多数动作会使用 [`setattr()`](https://docs.python.org/zh-cn/3/builtins/functions.html#setattr "setattr") 为此对象添加一个属性。
    
-   _values_ - 关联的命令行参数，已应用了所有的类型转换。类型转换是由传给 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 的 [type](#type) 关键字参数指定的。
    
-   _option\_string_ - 被用于唤起此动作的选项字符串。`option_string` 参数是可选的，并且在动作被关联到位置参数时将被略去。
    

`__call__()` 方法可以执行任意动作，但通常将基于 `dest` 和 `values` 来设置 `namespace` 的属性。

format\_usage()[¶](#argparse.Action.format_usage "Link to this definition")

`Action` 子类可以定义 `format_usage()` 方法，该方法不接受任何参数并返回一个将被用于打印程序的用法说明的字符串。如果未提供此方法，则将使用适当的默认值。

_class_ argparse.BooleanOptionalAction[¶](#argparse.BooleanOptionalAction "Link to this definition")

一个继承自 [`Action`](#argparse.Action "argparse.Action") 的子类，专门用于处理带有正负选项的布尔标志。当添加类似 `--foo` 的单个参数时，该子类会自动同时创建 `--foo` 和 `--no-foo` 两个选项，并分别存储 `True` 和 `False` 值:

\>>> import argparse
\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo', action\=argparse.BooleanOptionalAction)
\>>> parser.parse\_args(\['--no-foo'\])
Namespace(foo=False)

Added in version 3.9.

## parse\_args() 方法[¶](#the-parse-args-method "Link to this heading")

ArgumentParser.parse\_args(_args\=None_, _namespace\=None_)[¶](#argparse.ArgumentParser.parse_args "Link to this definition")

将参数字符串转换为对象并将其设为命名空间的属性。返回带有成员的命名空间。

之前对 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 的调用决定了哪些对象会被创建以及它们如何被赋值。请参阅 `add_argument()` 的文档了解详情。

-   [args](#args) - 要解析的字符串列表。默认值是从 [`sys.argv`](https://docs.python.org/zh-cn/3/library/sys.html#sys.argv "sys.argv") 获取。
    
-   [namespace](#namespace) - 用于获取属性的对象。默认值是一个新的空 [`Namespace`](#argparse.Namespace "argparse.Namespace") 对象。
    

### 选项值语法[¶](#option-value-syntax "Link to this heading")

[`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 方法支持多种指定选项值的方式（如果它接受选项的话）。在最简单的情况下，选项和它的值是作为两个单独参数传入的:

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> parser.add\_argument('-x')
\>>> parser.add\_argument('--foo')
\>>> parser.parse\_args(\['-x', 'X'\])
Namespace(foo=None, x='X')
\>>> parser.parse\_args(\['--foo', 'FOO'\])
Namespace(foo='FOO', x=None)

对于长选项（名称长度超过一个字符的选项），选项和值也可以作为单个命令行参数传入，使用 `=` 分隔它们即可:

\>>> parser.parse\_args(\['--foo=FOO'\])
Namespace(foo='FOO', x=None)

对于短选项（长度只有一个字符的选项），选项和它的值可以拼接在一起:

\>>> parser.parse\_args(\['-xX'\])
Namespace(foo=None, x='X')

有些短选项可以使用单个 `-` 前缀来进行合并，如果仅有最后一个选项（或没有任何选项）需要值的话:

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> parser.add\_argument('-x', action\='store\_true')
\>>> parser.add\_argument('-y', action\='store\_true')
\>>> parser.add\_argument('-z')
\>>> parser.parse\_args(\['-xyzZ'\])
Namespace(x=True, y=True, z='Z')

### 无效的参数[¶](#invalid-arguments "Link to this heading")

在解析命令行时，[`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 会检测多种错误，包括有歧义的选项、无效的类型、无效的选项、错误的位置参数个数等等。当遇到这种错误时，它将退出并打印出错误文本同时附带用法消息:

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> parser.add\_argument('--foo', type\=int)
\>>> parser.add\_argument('bar', nargs\='?')

\>>> \# invalid type
\>>> parser.parse\_args(\['--foo', 'spam'\])
usage: PROG \[-h\] \[--foo FOO\] \[bar\]
PROG: error: argument --foo: invalid int value: 'spam'

\>>> \# invalid option
\>>> parser.parse\_args(\['--bar'\])
usage: PROG \[-h\] \[--foo FOO\] \[bar\]
PROG: error: unrecognized arguments: --bar

\>>> \# wrong number of arguments
\>>> parser.parse\_args(\['spam', 'badger'\])
usage: PROG \[-h\] \[--foo FOO\] \[bar\]
PROG: error: unrecognized arguments: badger

### 包含 `-` 的参数[¶](#arguments-containing "Link to this heading")

[`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 方法会在用户明显出错时尝试给出错误信息，但某些情况本身就存在歧义。例如，命令行参数 `-1` 可能是尝试指定一个选项也可能是尝试提供一个位置参数。`parse_args()` 方法在此会谨慎行事：位置参数只有在它们看起来像负数并且解析器中没有任何选项看起来像负数时才能以 `-` 打头。:

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> parser.add\_argument('-x')
\>>> parser.add\_argument('foo', nargs\='?')

\>>> \# no negative number options, so -1 is a positional argument
\>>> parser.parse\_args(\['-x', '-1'\])
Namespace(foo=None, x='-1')

\>>> \# no negative number options, so -1 and -5 are positional arguments
\>>> parser.parse\_args(\['-x', '-1', '-5'\])
Namespace(foo='-5', x='-1')

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> parser.add\_argument('-1', dest\='one')
\>>> parser.add\_argument('foo', nargs\='?')

\>>> \# negative number options present, so -1 is an option
\>>> parser.parse\_args(\['-1', 'X'\])
Namespace(foo=None, one='X')

\>>> \# negative number options present, so -2 is an option
\>>> parser.parse\_args(\['-2'\])
usage: PROG \[-h\] \[-1 ONE\] \[foo\]
PROG: error: unrecognized arguments: -2

\>>> \# negative number options present, so both -1s are options
\>>> parser.parse\_args(\['-1', '-1'\])
usage: PROG \[-h\] \[-1 ONE\] \[foo\]
PROG: error: argument -1: expected one argument

如果你有必须以 `-` 打头的位置参数并且看起来不像负数，你可以插入伪参数 `'--'` 以告诉 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 在那之后的内容是一个位置参数:

\>>> parser.parse\_args(\['--', '-f'\])
Namespace(foo='-f', one=None)

另请参阅 [针对有歧义参数的 argparse 指引](https://docs.python.org/zh-cn/3/howto/argparse.html#specifying-ambiguous-arguments) 来了解更多细节。

在 3.14 版本发生变更: Negative-number matching was expanded to include numbers in scientific notation (`-2.5e-6`), numbers containing underscores (`-1_234.5`), and complex numbers (`-1.2e-3j`).

### 参数缩写（前缀匹配）[¶](#argument-abbreviations-prefix-matching "Link to this heading")

[`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 方法 [在默认情况下](#allow-abbrev) 允许将长选项缩写为前缀，如果缩写无歧义（即前缀与一个特定选项相匹配）的话:

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> parser.add\_argument('-bacon')
\>>> parser.add\_argument('-badger')
\>>> parser.parse\_args('-bac MMM'.split())
Namespace(bacon='MMM', badger=None)
\>>> parser.parse\_args('-bad WOOD'.split())
Namespace(bacon=None, badger='WOOD')
\>>> parser.parse\_args('-ba BA'.split())
usage: PROG \[-h\] \[-bacon BACON\] \[-badger BADGER\]
PROG: error: ambiguous option: -ba could match -badger, -bacon

可产生一个以上选项的参数会引发错误。此特性可通过将 [allow\_abbrev](#allow-abbrev) 设为 `False` 来禁用。

### 在 `sys.argv` 以外[¶](#beyond-sys-argv "Link to this heading")

有时在 [`sys.argv`](https://docs.python.org/zh-cn/3/library/sys.html#sys.argv "sys.argv") 以外增加 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 解析参数也很有用处。这可以通过将一个字符串列表传给 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 来实现。它适用于在交互提示符下进行测试:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument(
...     'integers', metavar\='int', type\=int, choices\=range(10),
...     nargs\='+', help\='an integer in the range 0..9')
\>>> parser.add\_argument(
...     '--sum', dest\='accumulate', action\='store\_const', const\=sum,
...     default\=max, help\='sum the integers (default: find the max)')
\>>> parser.parse\_args(\['1', '2', '3', '4'\])
Namespace(accumulate=<built-in function max>, integers=\[1, 2, 3, 4\])
\>>> parser.parse\_args(\['1', '2', '3', '4', '--sum'\])
Namespace(accumulate=<built-in function sum>, integers=\[1, 2, 3, 4\])

### 命名空间对象[¶](#the-namespace-object "Link to this heading")

_class_ argparse.Namespace[¶](#argparse.Namespace "Link to this definition")

由 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 默认使用的简单类，可创建一个存放属性的对象并将其返回。

这个类被有意做得很简单，只是一个具有可读字符串表示形式的 [`object`](https://docs.python.org/zh-cn/3/builtins/functions.html#object "object") 子类。如果你更喜欢类似字典的属性视图，你可以使用标准 Python 中惯常的 [`vars()`](https://docs.python.org/zh-cn/3/builtins/functions.html#vars "vars"):

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo')
\>>> args \= parser.parse\_args(\['--foo', 'BAR'\])
\>>> vars(args)
{'foo': 'BAR'}

另一个用处是让 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 为一个已存在对象而不是为一个新的 [`Namespace`](#argparse.Namespace "argparse.Namespace") 对象的属性赋值。 这可以通过指定 `namespace=` 关键字参数来实现:

\>>> class C:
...     pass
...
\>>> c \= C()
\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo')
\>>> parser.parse\_args(args\=\['--foo', 'BAR'\], namespace\=c)
\>>> c.foo
'BAR'

## 其它实用工具[¶](#other-utilities "Link to this heading")

### 子命令[¶](#subcommands "Link to this heading")

ArgumentParser.add\_subparsers(_\*_\[, _title_\]\[, _description_\]\[, _prog_\]\[, _parser\_class_\]\[, _action_\]\[, _dest_\]\[, _required_\]\[, _help_\]\[, _metavar_\])[¶](#argparse.ArgumentParser.add_subparsers "Link to this definition")

许多程序都将其功能拆分为一系列子命令，例如，`svn` 程序可唤起像 `svn checkout`, `svn update` 和 `svn commit` 等子命令。当一个程序执行的多种不同功能需要不同类型的命令行参数时，这种拆分功能的方式是一个非常好的主意。[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 通过 `add_subparsers()` 方法支持创建这样的子命令。`add_subparsers()` 方法通常不带参数地调用并返回一个特殊的动作对象。该对象只有一个方法 `add_parser()`，它接受一个命令名称和任意多个 `ArgumentParser` 构造器参数，并返回一个可以通常方式进行修改的 `ArgumentParser` 对象。

形参的描述

-   _title_ - 帮助输出中子解析器分组的标题；如果提供了描述则默认为 "subcommands"，否则使用位置参数的标题
    
-   _description_ - 帮助输出中对子解析器组的描述，默认为 `None`
    
-   _prog_ - 将与子命令帮助一同显示的用法信息，默认为程序名和子解析器参数之前的任何位置参数
    
-   _parser\_class_ - 将被用于创建子解析器实例的类，默认为当前解析器类 (例如 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser"))
    
-   [action](#action) - 当此参数在命令行中出现时要执行动作的基本类型
    
-   [dest](#dest) - 将被用于保存子命令名称的属性名；默认为 `None` 即不保存任何值
    
-   [required](#required) - 是否必须要提供子命令，默认为 `False` (在 3.7 中新增)
    
-   [help](#help) - 在输出帮助中的子解析器分组帮助信息，默认为 `None`
    
-   [metavar](#metavar) - 帮助信息中表示可用子命令的字符串；默认为 `None` 并以 {cmd1, cmd2, ..} 的形式表示子命令
    

一些使用示例:

\>>> \# 创建一个最高层级解析器
\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> parser.add\_argument('--foo', action\='store\_true', help\='foo help')
\>>> subparsers \= parser.add\_subparsers(help\='subcommand help')
\>>>
\>>> \# 创建一个针对 "a" 命令的解析器
\>>> parser\_a \= subparsers.add\_parser('a', help\='a help')
\>>> parser\_a.add\_argument('bar', type\=int, help\='bar help')
\>>>
\>>> \# 创建一个针对 "b" 命令的解析器
\>>> parser\_b \= subparsers.add\_parser('b', help\='b help')
\>>> parser\_b.add\_argument('--baz', choices\=('X', 'Y', 'Z'), help\='baz help')
\>>>
\>>> \# 解析一些参数列表
\>>> parser.parse\_args(\['a', '12'\])
Namespace(bar=12, foo=False)
\>>> parser.parse\_args(\['--foo', 'b', '--baz', 'Z'\])
Namespace(baz='Z', foo=True)

请注意 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 返回的对象将只包含主解析器和由命令行所选择的子解析器的属性（而没有任何其他子解析器）。因此在上面的例子中，当指定了 `a` 命令时，将只存在 `foo` 和 `bar` 属性，而当指定了 `b` 命令时，则只存在 `foo` 和 `baz` 属性。

If a subparser defines an argument with the same `dest` as the parent parser, the two share a single namespace attribute, so the parent's value won't be retained. Users should give them distinct `dest` values to keep both.

类似地，当一个子解析器请求帮助消息时，只有该特定解析器的帮助消息会被打印出来。帮助消息将不包括父解析器或同级解析器的消息。（每个子解析器命令一条帮助消息，但是，也可以像上面那样通过将 `help=` 参数传入 `add_parser()` 来给出。）

\>>> parser.parse\_args(\['--help'\])
usage: PROG \[-h\] \[--foo\] {a,b} ...

positional arguments:
  {a,b}   subcommand help
    a     a help
    b     b help

options:
  -h, --help  show this help message and exit
  --foo   foo help

\>>> parser.parse\_args(\['a', '--help'\])
usage: PROG a \[-h\] bar

positional arguments:
  bar     bar help

options:
  -h, --help  show this help message and exit

\>>> parser.parse\_args(\['b', '--help'\])
usage: PROG b \[-h\] \[--baz {X,Y,Z}\]

options:
  -h, --help     show this help message and exit
  --baz {X,Y,Z}  baz help

[`add_subparsers()`](#argparse.ArgumentParser.add_subparsers "argparse.ArgumentParser.add_subparsers") 方法也支持 `title` 和 `description` 关键字参数。当其中任意一个存在时，子解析器的命令将出现在输出帮助消息中它们自己的分组内。例如:

\>>> parser \= argparse.ArgumentParser()
\>>> subparsers \= parser.add\_subparsers(title\='subcommands',
...                                    description\='valid subcommands',
...                                    help\='additional help')
\>>> subparsers.add\_parser('foo')
\>>> subparsers.add\_parser('bar')
\>>> parser.parse\_args(\['-h'\])
usage:  \[-h\] {foo,bar} ...

options:
  -h, --help  show this help message and exit

subcommands:
  valid subcommands

  {foo,bar}   additional help

此外，`add_parser()` 还支持附加的 _aliases_ 参数，它允许多个字符串指向同一个子解析器。下面的例子，类似于 `svn`，将别名 `co` 设为 `checkout` 的缩写形式:

\>>> parser \= argparse.ArgumentParser()
\>>> subparsers \= parser.add\_subparsers()
\>>> checkout \= subparsers.add\_parser('checkout', aliases\=\['co'\])
\>>> checkout.add\_argument('foo')
\>>> parser.parse\_args(\['co', 'bar'\])
Namespace(foo='bar')

`add_parser()` 也支持附加的 _deprecated_ 参数，它允许弃用子解析器。

\>>> import argparse
\>>> parser \= argparse.ArgumentParser(prog\='chicken.py')
\>>> subparsers \= parser.add\_subparsers()
\>>> run \= subparsers.add\_parser('run')
\>>> fly \= subparsers.add\_parser('fly', deprecated\=True)
\>>> parser.parse\_args(\['fly'\])
chicken.py: warning: command 'fly' is deprecated
Namespace()

Added in version 3.13.

一个特别有效的处理子命令的方式是将 [`add_subparsers()`](#argparse.ArgumentParser.add_subparsers "argparse.ArgumentParser.add_subparsers") 方法与对 [`set_defaults()`](#argparse.ArgumentParser.set_defaults "argparse.ArgumentParser.set_defaults") 的调用结合起来使用以便每个子解析器能知道应当执行哪个 Python 函数。例如:

\>>> \# 子命令函数
\>>> def foo(args):
...     print(args.x \* args.y)
...
\>>> def bar(args):
...     print('((%s))' % args.z)
...
\>>> \# 创建最高层级解析器
\>>> parser \= argparse.ArgumentParser()
\>>> subparsers \= parser.add\_subparsers(required\=True)
\>>>
\>>> \# 创建针对 "foo" 命令的解析器
\>>> parser\_foo \= subparsers.add\_parser('foo')
\>>> parser\_foo.add\_argument('-x', type\=int, default\=1)
\>>> parser\_foo.add\_argument('y', type\=float)
\>>> parser\_foo.set\_defaults(func\=foo)
\>>>
\>>> \# 创建针对 "bar" 命令的解析器
\>>> parser\_bar \= subparsers.add\_parser('bar')
\>>> parser\_bar.add\_argument('z')
\>>> parser\_bar.set\_defaults(func\=bar)
\>>>
\>>> \# 解析参数并调用被选定的任何函数
\>>> args \= parser.parse\_args('foo 1 -x 2'.split())
\>>> args.func(args)
2.0
\>>>
\>>> \# 解析参数并调用被选定的任何函数
\>>> args \= parser.parse\_args('bar XYZYX'.split())
\>>> args.func(args)
((XYZYX))

通过这种方式，你可以在参数解析结束后让 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 执行调用适当函数的任务。像这样将函数关联到动作通常是你处理每个子解析器的不同动作的最简便方式。但是，如果有必要检查被唤起的子解析器的名称，则 [`add_subparsers()`](#argparse.ArgumentParser.add_subparsers "argparse.ArgumentParser.add_subparsers") 调用的 `dest` 关键字参数将可实现:

\>>> parser \= argparse.ArgumentParser()
\>>> subparsers \= parser.add\_subparsers(dest\='subparser\_name')
\>>> subparser1 \= subparsers.add\_parser('1')
\>>> subparser1.add\_argument('-x')
\>>> subparser2 \= subparsers.add\_parser('2')
\>>> subparser2.add\_argument('y')
\>>> parser.parse\_args(\['2', 'frobble'\])
Namespace(subparser\_name='2', y='frobble')

在 3.7 版本发生变更: 新增 _required_ 仅限关键字形参。

在 3.14 版本发生变更: 子解析器的 _prog_ 将不再受主解析器中自定义用法说明消息的影响。

### FileType 对象[¶](#filetype-objects "Link to this heading")

_class_ argparse.FileType(_mode\='r'_, _bufsize\=\-1_, _encoding\=None_, _errors\=None_)[¶](#argparse.FileType "Link to this definition")

[`FileType`](#argparse.FileType "argparse.FileType") 工厂类用于创建可作为 [`ArgumentParser.add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 的 type 参数传入的对象。以 `FileType` 对象作为其类型的参数将使用命令行参数以所请求模式、缓冲区大小、编码格式和错误处理方式打开文件（请参阅 [`open()`](https://docs.python.org/zh-cn/3/builtins/functions.html#open "open") 函数了解详情）:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--raw', type\=argparse.FileType('wb', 0))
\>>> parser.add\_argument('out', type\=argparse.FileType('w', encoding\='UTF-8'))
\>>> parser.parse\_args(\['--raw', 'raw.dat', 'file.txt'\])
Namespace(out=<\_io.TextIOWrapper name='file.txt' mode='w' encoding='UTF-8'>, raw=<\_io.FileIO name='raw.dat' mode='wb'>)

FileType 对象能理解伪参数 `'-'` 并会自动将其转换为 [`sys.stdin`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stdin "sys.stdin") 用于可读的 [`FileType`](#argparse.FileType "argparse.FileType") 对象以及 [`sys.stdout`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stdout "sys.stdout") 用于可写的 `FileType` 对象:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('infile', type\=argparse.FileType('r'))
\>>> parser.parse\_args(\['-'\])
Namespace(infile=<\_io.TextIOWrapper name='<stdin>' encoding='UTF-8'>)

备注

如果一个参数使用 _FileType_，然后随后的参数失败，则报告错误，但文件不会自动关闭。这也会破坏输出文件。在这种情况下，最好等到解析器运行之后，然后使用 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句来管理文件。

在 3.4 版本发生变更: 增加了 _encoding_ 和 _errors_ 形参。

自 3.14 版本弃用.

### 参数组[¶](#argument-groups "Link to this heading")

ArgumentParser.add\_argument\_group(_title=None_, _description=None_, _\*_\[, _argument\_default_\]\[, _conflict\_handler_\])[¶](#argparse.ArgumentParser.add_argument_group "Link to this definition")

在默认情况下，[`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 会在显示帮助消息时将命令行参数分为“位置参数”和“选项”两组。当存在比默认更好的分组概念时，可以使用 `add_argument_group()` 方法来创建适当的分组:

\>>> parser \= argparse.ArgumentParser(prog\='PROG', add\_help\=False)
\>>> group \= parser.add\_argument\_group('group')
\>>> group.add\_argument('--foo', help\='foo help')
\>>> group.add\_argument('bar', help\='bar help')
\>>> parser.print\_help()
usage: PROG \[--foo FOO\] bar

group:
  bar    bar help
  --foo FOO  foo help

[`add_argument_group()`](#argparse.ArgumentParser.add_argument_group "argparse.ArgumentParser.add_argument_group") 方法返回一个具有 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 方法的参数分组对象，这与常规的 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 一样。当一个参数被加入分组时，解析器会将它视为一个正常的参数，但是会在单独的帮助消息分组中显示该参数。`add_argument_group()` 方法接受 _title_ 和 _description_ 参数以使用它们来定制显示内容:

\>>> parser \= argparse.ArgumentParser(prog\='PROG', add\_help\=False)
\>>> group1 \= parser.add\_argument\_group('group1', 'group1 description')
\>>> group1.add\_argument('foo', help\='foo help')
\>>> group2 \= parser.add\_argument\_group('group2', 'group2 description')
\>>> group2.add\_argument('--bar', help\='bar help')
\>>> parser.print\_help()
usage: PROG \[--bar BAR\] foo

group1:
  group1 description

  foo    foo help

group2:
  group2 description

  --bar BAR  bar help

可选的仅限关键字形参 [argument\_default](#argument-default) 和 [conflict\_handler](#conflict-handler) 允许对参数分组行为进行更细粒度的控制。这些形参具有与 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 构造器中相同的含义，但是专门应用于参数分组而不是整个解析器。

请注意任意不在你的自定义分组中的参数最终都将回到通常的“位置参数”和“可选参数”分组中。

Within each argument group, arguments are displayed in help output in the order in which they are added.

从 3.11 版起已弃用，已在 3.14 版中移除: 在参数分组上调用 [`add_argument_group()`](#argparse.ArgumentParser.add_argument_group "argparse.ArgumentParser.add_argument_group") 现在会引发异常。这样的嵌套从未受到支持，经常无法正确工作，并且是由于继承而在无意中对外公开的。

自 3.14 版本弃用: 将 [prefix\_chars](#prefix-chars) 传给 [`add_argument_group()`](#argparse.ArgumentParser.add_argument_group "argparse.ArgumentParser.add_argument_group") 的做法现在已被弃用。

### 互斥[¶](#mutual-exclusion "Link to this heading")

ArgumentParser.add\_mutually\_exclusive\_group(_required\=False_)[¶](#argparse.ArgumentParser.add_mutually_exclusive_group "Link to this definition")

创建一个互斥分组。`argparse` 将会确保互斥分组中只有一个参数在命令行中可用:

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> group \= parser.add\_mutually\_exclusive\_group()
\>>> group.add\_argument('--foo', action\='store\_true')
\>>> group.add\_argument('--bar', action\='store\_false')
\>>> parser.parse\_args(\['--foo'\])
Namespace(bar=True, foo=True)
\>>> parser.parse\_args(\['--bar'\])
Namespace(bar=False, foo=False)
\>>> parser.parse\_args(\['--foo', '--bar'\])
usage: PROG \[-h\] \[--foo | --bar\]
PROG: error: argument --bar: not allowed with argument --foo

[`add_mutually_exclusive_group()`](#argparse.ArgumentParser.add_mutually_exclusive_group "argparse.ArgumentParser.add_mutually_exclusive_group") 方法也接受一个 _required_ 参数，表示在互斥组中至少有一个参数是需要的:

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> group \= parser.add\_mutually\_exclusive\_group(required\=True)
\>>> group.add\_argument('--foo', action\='store\_true')
\>>> group.add\_argument('--bar', action\='store\_false')
\>>> parser.parse\_args(\[\])
usage: PROG \[-h\] (--foo | --bar)
PROG: error: one of the arguments --foo --bar is required

请注意当前互斥的参数组不支持 [`add_argument_group()`](#argparse.ArgumentParser.add_argument_group "argparse.ArgumentParser.add_argument_group") 的 _title_ 和 _description_ 参数。但是，互斥的参数组可以被添加到具有 title 和 description 的参数组中。例如:

\>>> parser \= argparse.ArgumentParser(prog\='PROG')
\>>> group \= parser.add\_argument\_group('Group title', 'Group description')
\>>> exclusive\_group \= group.add\_mutually\_exclusive\_group(required\=True)
\>>> exclusive\_group.add\_argument('--foo', help\='foo help')
\>>> exclusive\_group.add\_argument('--bar', help\='bar help')
\>>> parser.print\_help()
usage: PROG \[-h\] (--foo FOO | --bar BAR)

options:
  -h, --help  show this help message and exit

Group title:
  Group description

  --foo FOO   foo help
  --bar BAR   bar help

从 3.11 版起已弃用，已在 3.14 版中移除: 在互斥组上调用 [`add_argument_group()`](#argparse.ArgumentParser.add_argument_group "argparse.ArgumentParser.add_argument_group") 或 [`add_mutually_exclusive_group()`](#argparse.ArgumentParser.add_mutually_exclusive_group "argparse.ArgumentParser.add_mutually_exclusive_group") 现在会引发异常。这种嵌套从未得到支持，经常不能正确工作，并在无意中通过继承暴露出来。

### 解析器默认值[¶](#parser-defaults "Link to this heading")

ArgumentParser.set\_defaults(_\*\*kwargs_)[¶](#argparse.ArgumentParser.set_defaults "Link to this definition")

在大多数时候，[`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 所返回对象的属性将完全通过检查命令行参数和参数动作来确定。[`set_defaults()`](#argparse.ArgumentParser.set_defaults "argparse.ArgumentParser.set_defaults") 则允许加入一些无须任何命令行检查的额外属性:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('foo', type\=int)
\>>> parser.set\_defaults(bar\=42, baz\='badger')
\>>> parser.parse\_args(\['736'\])
Namespace(bar=42, baz='badger', foo=736)

请注意默认值可以使用 [`set_defaults()`](#argparse.ArgumentParser.set_defaults "argparse.ArgumentParser.set_defaults") 在解析器层级设置也可以使用 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 在参数层级设置。如果为同一个参数同时调用这两者，则会使用该参数的最后一次默认值设置:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo', default\='bar')
\>>> parser.set\_defaults(foo\='spam')
\>>> parser.parse\_args(\[\])
Namespace(foo='spam')

解析器层级默认值在需要多解析器时会特别有用。请参阅 [`add_subparsers()`](#argparse.ArgumentParser.add_subparsers "argparse.ArgumentParser.add_subparsers") 方法了解此类型的一个示例。

ArgumentParser.get\_default(_dest_)[¶](#argparse.ArgumentParser.get_default "Link to this definition")

获取一个命名空间属性的默认值，该值是由 [`add_argument()`](#argparse.ArgumentParser.add_argument "argparse.ArgumentParser.add_argument") 或 [`set_defaults()`](#argparse.ArgumentParser.set_defaults "argparse.ArgumentParser.set_defaults") 设置的:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo', default\='badger')
\>>> parser.get\_default('foo')
'badger'

### 打印帮助[¶](#printing-help "Link to this heading")

在大多数典型应用中，[`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 将负责任何用法和错误消息的格式化和打印。但是，也可使用某些其他格式化方法：

ArgumentParser.print\_usage(_file\=None_)[¶](#argparse.ArgumentParser.print_usage "Link to this definition")

打印一段简短描述，说明应当如何在命令行中唤起 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser")。如果 _file_ 为 `None`，则默认使用 [`sys.stdout`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stdout "sys.stdout").

ArgumentParser.print\_help(_file\=None_)[¶](#argparse.ArgumentParser.print_help "Link to this definition")

打印一条帮助消息，包括程序用法和通过 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 注册的相关参数信息。如果 _file_ 为 `None`，则默认使用 [`sys.stdout`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stdout "sys.stdout")。

还存在这些方法的几个变化形式，它们只返回字符串而不打印消息：

ArgumentParser.format\_usage()[¶](#argparse.ArgumentParser.format_usage "Link to this definition")

返回一个包含简短描述的字符串，说明应当如何在命令行中唤起 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser")。

ArgumentParser.format\_help()[¶](#argparse.ArgumentParser.format_help "Link to this definition")

返回一个包含帮助消息的字符串，包括程序用法和通过 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 注册的相关参数信息。

### 部分解析[¶](#partial-parsing "Link to this heading")

ArgumentParser.parse\_known\_args(_args\=None_, _namespace\=None_)[¶](#argparse.ArgumentParser.parse_known_args "Link to this definition")

有时一个脚本只需要处理特定的命令行参数集合，把不能识别的参数留给其他脚本或程序。在这种情况下，[`parse_known_args()`](#argparse.ArgumentParser.parse_known_args "argparse.ArgumentParser.parse_known_args") 方法就会很有用处。

此方法的运作方式与 [`parse_args()`](#argparse.ArgumentParser.parse_args "argparse.ArgumentParser.parse_args") 类似，但它不会针对额外的不能识别的参数引发错误。它会解析已知参数并返回一个包含已填充命名空间和不能识别的参数列表的二元组。

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo', action\='store\_true')
\>>> parser.add\_argument('bar')
\>>> parser.parse\_known\_args(\['--foo', '--badger', 'BAR', 'spam'\])
(Namespace(bar='BAR', foo=True), \['--badger', 'spam'\])

警告

[前缀匹配](#prefix-matching) 规则应用于 [`parse_known_args()`](#argparse.ArgumentParser.parse_known_args "argparse.ArgumentParser.parse_known_args")。一个解析器即使在某个选项只是已知选项的前缀时也能读取该选项，而不是将其放入剩余参数列表。

### 自定义文件解析[¶](#customizing-file-parsing "Link to this heading")

ArgumentParser.convert\_arg\_line\_to\_args(_arg\_line_)[¶](#argparse.ArgumentParser.convert_arg_line_to_args "Link to this definition")

从文件读取的参数（见 [`ArgumentParser`](#argparse.ArgumentParser "argparse.ArgumentParser") 的 _fromfile\_prefix\_chars_ 关键字参数）将是一行读取一个参数。[`convert_arg_line_to_args()`](#argparse.ArgumentParser.convert_arg_line_to_args "argparse.ArgumentParser.convert_arg_line_to_args") 可被重写以使用更复杂的读取方式。

此方法接受从参数文件读取的字符串形式的单个参数 _arg\_line_。它返回从该字符串解析出的参数列表。此方法将在每次按顺序从参数文件读取一行时被调用一次。

此方法的一个有用的重写是将每个以空格分隔的单词视为一个参数。下面的例子演示了如何实现这一点:

class MyArgumentParser(argparse.ArgumentParser):
    def convert\_arg\_line\_to\_args(self, arg\_line):
        return arg\_line.split()

Note that with this override an argument can no longer contain spaces, since each space-separated word becomes a separate argument.

### 退出方法[¶](#exiting-methods "Link to this heading")

ArgumentParser.exit(_status\=0_, _message\=None_)[¶](#argparse.ArgumentParser.exit "Link to this definition")

此方法将终结程序，退出时附带指定的 _status_，并且如果给出了 _message_ 则会在退出前将其打印到 [`sys.stderr`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stderr "sys.stderr")。 用户可重写此方法以不同方式来处理这些步骤:

class ErrorCatchingArgumentParser(argparse.ArgumentParser):
    def exit(self, status\=0, message\=None):
        if status:
            raise Exception(f'Exiting because of an error: {message}')
        exit(status)

ArgumentParser.error(_message_)[¶](#argparse.ArgumentParser.error "Link to this definition")

此方法将把用法消息包括 _message_ 打印到 [`sys.stderr`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stderr "sys.stderr") 并附带状态码 2 终结程序。

### 混合解析[¶](#intermixed-parsing "Link to this heading")

ArgumentParser.parse\_intermixed\_args(_args\=None_, _namespace\=None_)[¶](#argparse.ArgumentParser.parse_intermixed_args "Link to this definition")

ArgumentParser.parse\_known\_intermixed\_args(_args\=None_, _namespace\=None_)[¶](#argparse.ArgumentParser.parse_known_intermixed_args "Link to this definition")

许多 Unix 命令允许用户混用可选参数与位置参数。[`parse_intermixed_args()`](#argparse.ArgumentParser.parse_intermixed_args "argparse.ArgumentParser.parse_intermixed_args") 和 [`parse_known_intermixed_args()`](#argparse.ArgumentParser.parse_known_intermixed_args "argparse.ArgumentParser.parse_known_intermixed_args") 方法均支持这种解析风格。

这些解析器并不支持所有的 `argparse` 特性，并且当不受支持的特性被使用时将会引发异常。具体来说，子解析器以及同时包括可选参数和位置参数的互斥分组是不受支持的。

下面的例子显示了 [`parse_known_args()`](#argparse.ArgumentParser.parse_known_args "argparse.ArgumentParser.parse_known_args") 与 [`parse_intermixed_args()`](#argparse.ArgumentParser.parse_intermixed_args "argparse.ArgumentParser.parse_intermixed_args") 之间的差异：前者会将 `['2', '3']` 返回为未解析的参数，而后者会将所有位置参数收集至 `rest` 中。:

\>>> parser \= argparse.ArgumentParser()
\>>> parser.add\_argument('--foo')
\>>> parser.add\_argument('cmd')
\>>> parser.add\_argument('rest', nargs\='\*', type\=int)
\>>> parser.parse\_known\_args('doit 1 --foo bar 2 3'.split())
(Namespace(cmd='doit', foo='bar', rest=\[1\]), \['2', '3'\])
\>>> parser.parse\_intermixed\_args('doit 1 --foo bar 2 3'.split())
Namespace(cmd='doit', foo='bar', rest=\[1, 2, 3\])

[`parse_known_intermixed_args()`](#argparse.ArgumentParser.parse_known_intermixed_args "argparse.ArgumentParser.parse_known_intermixed_args") 返回由两个条目组成的元组，其中包含带成员的命名空间以及剩余参数字符串列表。当存在任何剩余的未解析参数字符串时 [`parse_intermixed_args()`](#argparse.ArgumentParser.parse_intermixed_args "argparse.ArgumentParser.parse_intermixed_args") 将引发一个错误。

Added in version 3.7.

### 注册自定义的类型或动作[¶](#registering-custom-types-or-actions "Link to this heading")

ArgumentParser.register(_registry\_name_, _value_, _object_)[¶](#argparse.ArgumentParser.register "Link to this definition")

在某些时候有必要在错误消息中使用自定义的字符串以提供对用户更友好的输出。在这种情况下，可以使用 `register()` 来注册带有解析器的自定义动作或类型并允许你按其注册名称而非其可调用对象名称来引用该类型。

`register()` 方法接受三个参数 —— _registry\_name_，指定将要存储对象的内部注册表 (例如 `action`, `type`)，_value_，将要注册对象对应的键，以及 object，将要注册的可调用对象。

下面的例子演示了如何注册一个带解析器的自定义类型:

\>>> import argparse
\>>> parser \= argparse.ArgumentParser()
\>>> parser.register('type', 'hexadecimal integer', lambda s: int(s, 16))
\>>> parser.add\_argument('--foo', type\='hexadecimal integer')
\_StoreAction(option\_strings=\['--foo'\], dest='foo', nargs=None, const=None, default=None, type='hexadecimal integer', choices=None, required=False, help=None, metavar=None, deprecated=False)
\>>> parser.parse\_args(\['--foo', '0xFA'\])
Namespace(foo=250)
\>>> parser.parse\_args(\['--foo', '1.2'\])
usage: PROG \[-h\] \[--foo FOO\]
PROG: error: argument --foo: invalid 'hexadecimal integer' value: '1.2'

## 异常[¶](#exceptions "Link to this heading")

_exception_ argparse.ArgumentError[¶](#argparse.ArgumentError "Link to this definition")

来自创建或使用某个参数的错误（可选或位置参数）。

此异常的字符串值即异常消息，并附带有导致该异常的参数的相关信息。

_exception_ argparse.ArgumentTypeError[¶](#argparse.ArgumentTypeError "Link to this definition")

当从一个命令行字符串到特定类型的转换出现问题时引发。

指南与教程

-   [argparse 教程](https://docs.python.org/zh-cn/3/howto/argparse.html)
-   [将 `optparse` 代码迁移至 `argparse`](https://docs.python.org/zh-cn/3/howto/argparse-optparse.html)
