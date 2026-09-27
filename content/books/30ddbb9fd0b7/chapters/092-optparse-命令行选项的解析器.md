**源代码：** [Lib/optparse.py](https://github.com/python/cpython/tree/3.14/Lib/optparse.py)

* * *

## 选择参数解析库[¶](#choosing-an-argument-parsing-library "Link to this heading")

标准库包括三个参数解析库：

-   [`getopt`](https://docs.python.org/zh-cn/3/library/getopt.html#module-getopt "getopt: Portable parser for command line options; support both short and long option names."): a module that closely mirrors the procedural C `getopt` API.
    
-   `optparse`: a declarative replacement for `getopt` that provides equivalent functionality without requiring each application to implement its own procedural option parsing logic.
    
-   [`argparse`](https://docs.python.org/zh-cn/3/library/argparse.html#module-argparse "argparse: Command-line option and argument parsing library."): a more opinionated alternative to `optparse` that provides more functionality by default, at the expense of reduced application flexibility in controlling exactly how arguments are processed.
    

在缺少更具体的参数解析设计约束的情况下，[`argparse`](https://docs.python.org/zh-cn/3/library/argparse.html#module-argparse "argparse: Command-line option and argument parsing library.") 是实现命令行应用程序的推荐选择，因为它能以最少的应用程序层级代码提供最高层级的基本功能。

[`getopt`](https://docs.python.org/zh-cn/3/library/getopt.html#module-getopt "getopt: Portable parser for command line options; support both short and long option names.") 被保留几乎完全是出于向下兼容性理由。 不过，它也适合在基于 `getopt` 的 C 应用程序中作为命令行参数处理原型搭建和测试场景中的工具。

`optparse` 应当在下列场景中被作为 [`argparse`](https://docs.python.org/zh-cn/3/library/argparse.html#module-argparse "argparse: Command-line option and argument parsing library.") 的替代物：

-   一个应用程序已在使用 `optparse` 并且不想再冒当迁移至 [`argparse`](https://docs.python.org/zh-cn/3/library/argparse.html#module-argparse "argparse: Command-line option and argument parsing library.") 可能引发的微妙行为改变的风险
    
-   这个应用程序需要对命令行中选项和位置形参的交错方式进行额外的控制（包括完全禁用交错特性的能力）
    
-   这个应用程序需要对命令行元素进行渐进式解析的过程施加更多控制（虽然 `argparse` 确实支持这个功能，但实际运作的方式在某些情况下并非理想）
    
-   这个应用程序需要对某些可能接受以 `-` 开头的参数值的命令行选项施行特殊的控制（例如程序本身调用另一个程序，而这些选项是要原样传给被调用的子程序的）
    
-   这个应用程序需要其他一些 `argparse` 不支持，但是可利用 `optparse` 提供之底层接口实现的特殊的命令行参数处理行为
    

这些考量也意味着 `optparse` 可以为函数库作者编写第三方命令行参数解析库时提供更好的基础。

以下提供一个具体的例子。请见下方两段命令行参数解析代码，其中第一段使用 `optparse` 实现；第二段使用 `argparse` 实现：

import optparse

if \_\_name\_\_ \== '\_\_main\_\_':
    parser \= optparse.OptionParser()
    parser.add\_option('-o', '--output')
    parser.add\_option('-v', dest\='verbose', action\='store\_true')
    opts, args \= parser.parse\_args()
    process(args, output\=opts.output, verbose\=opts.verbose)

import argparse

if \_\_name\_\_ \== '\_\_main\_\_':
    parser \= argparse.ArgumentParser()
    parser.add\_argument('-o', '--output')
    parser.add\_argument('-v', dest\='verbose', action\='store\_true')
    parser.add\_argument('rest', nargs\='\*')
    args \= parser.parse\_args()
    process(args.rest, output\=args.output, verbose\=args.verbose)

最明显的差异就是在 `optparse` 版本中，无选项参数是在选项处理完成后由应用程序单独处理的。 在 `argparse` 版本中，位置参数则是以与带名称的选项相同的方式声明和处理的。

不过，`argparse` 版本还会以与 `optparse` 版本不同的方式处理某些形参组合。 例如（除其他差异之外）：

-   当使用 `optparse` 时 `-o -v` 是指定 `output="-v"` 和 `verbose=False`，但对于 `argparse` 则为错误用法（将报告没有为 `-o/--output` 提供值，因为 `-v` 会被解读为代表 verbosity 旗标）
    
-   类似地，当使用 `optparse` 时提供 `-o --` 是指定 `output="--"` 和 `args=()`，但对于 `argparse` 则为错误用法（同样将报告没有为 `-o/--output` 提供值，因为 `--` 会被解读为结束选项处理并将所有剩余的值视为位置参数）
    
-   当使用 `optparse` 时提供 `-o=foo` 是指定 `output="=foo"`，但对于 `argparse` 则为 `output="foo"` (因为 `=` 是被作为选项形参值的替代分隔符的特例)。
    

这些在 `argparse` 版本中存在差异的行为是有必要的还是有问题的将取决于特定命令行应用程序的使用场景。

参见

[click](https://pypi.org/project/click/) 是一个第三方参数处理库（最初是以 `optparse` 为基础），它允许命令行应用程序以一组被装饰的命令实现函数的方式来开发。

其他的第三方库，例如 [typer](https://pypi.org/project/typer/) 或 [msgspec-click](https://pypi.org/project/msgspec-click/)，允许命令行界面以更有效率地集成 Python 类型标注静态检查的方式来指定。

## 概述[¶](#introduction "Link to this heading")

`optparse` 是一个比极简的 [`getopt`](https://docs.python.org/zh-cn/3/library/getopt.html#module-getopt "getopt: Portable parser for command line options; support both short and long option names.") 模块更方便、灵活和强大的命令行选项解析库。 `optparse` 使用更趋声明式的命令行解析风格：你将创建一个 [`OptionParser`](#optparse.OptionParser "optparse.OptionParser") 的实例，用选项来填充它，然后解析命令行。 `optparse` 允许用户以传统的 GNU/POSIX 语法来指定稳定项，并会额外为你生成用法和帮助消息。

下面是在一个简单脚本中使用 `optparse` 的示例:

from optparse import OptionParser
...
parser \= OptionParser()
parser.add\_option("-f", "--file", dest\="filename",
                  help\="write report to FILE", metavar\="FILE")
parser.add\_option("-q", "--quiet",
                  action\="store\_false", dest\="verbose", default\=True,
                  help\="don't print status messages to stdout")

(options, args) \= parser.parse\_args()

通过这几行代码，你的脚本的用户可以在命令行上完成“常见任务”，例如:

<yourscript\> \--file\=outfile \-q

在解析命令行时，`optparse` 会根据用户提供的命令行值设置 [`parse_args()`](#optparse.OptionParser.parse_args "optparse.OptionParser.parse_args") 所返回的 `options` 对象的属性。 当 `parse_args()` 从解析此命令行返回时，`options.filename` 将为 `"outfile"` 而 `options.verbose` 将为 `False`。 `optparse` 支持长短两种选项，允许将多个短选项合并到一起，并允许选项以多种方式与其参数相关联。 因此，下面的命令行与上面的示例都是等价的:

<yourscript\> \-f outfile \--quiet
<yourscript\> \--quiet \--file outfile
<yourscript\> \-q \-foutfile
<yourscript\> \-qfoutfile

此外，用户还可以运行以下命令之一

<yourscript\> \-h
<yourscript\> \--help

这样 `optparse` 将打印出你的脚本选项的简明概要：

Usage: <yourscript> \[options\]

Options:
  -h, --help            show this help message and exit
  -f FILE, --file=FILE  write report to FILE
  -q, --quiet           don't print status messages to stdout

其中 _yourscript_ 的值是在运行时确定的 (通常来自 `sys.argv[0]`)。

## 背景[¶](#background "Link to this heading")

`optparse` 被显式地设计为鼓励创建带有遵循 C 开发者所用的 `getopt()` 函数族的惯例的简明直观的命令行接口的程序。 为了这个目标，它仅支持最常见的命令行语法和在 Unix 下使用的规范语义。 如果你不熟悉这些惯例，阅读本节将使你开始了解它们。. If you are unfamiliar with these conventions, reading this section will allow you to acquaint yourself with them.

### 术语[¶](#terminology "Link to this heading")

argument -- 参数

在命令行中输入的字符串，并会被 shell 传给 `execl()` 或 `execv()`。 在 Python 中，参数将是 `sys.argv[1:]` 的元素 (`sys.argv[0]` 是被执行的程序的名称)。 Unix shell 也使用术语 "word" 来指代参数。

有时替换 `sys.argv[1:]` 以外的参数列表也是必要的，所以你应当将 "参数" 当作是 "`sys.argv[1:]` 的一个元素，或者是作为 `sys.argv[1:]` 的替代的其他列表"。

选项

一个用来提供额外信息以指导或定制程序的执行的参数。 对于选项有许多不同的语法：传统的 Unix 语法是一个连字符 ("-") 后面跟单个字母，例如 `-x` 或 `-F`。 此外，传统的 Unix 语法允许将多个选项合并为一个参数，例如 `-x -F` 等价于 `-xF`。 GNU 项目引入了 `--` 后面跟一串以连字符分隔的单词，例如 `--file` 或 `--dry-run`。 它们是 `optparse` 所提供的仅有的两种选项语法。

存在于世上的其他一些选项语法包括:

-   一个连字符后面跟几个字母，例如 `-pf` (这与多个选项合并成单个参数 _并不_ 一样)
    
-   一个连字符后面跟一个完整单词，例如 `-file` (这在技术上等同于前面的语法，但它们通常不在同一个程序中出现)
    
-   一个加号后面跟一个字母，或几个字母，或一个单词，例如 `+f`, `+rgb`
    
-   一个斜杠后面跟一个字母，或几个字母，或一个单词，例如 `/f`, `/file`
    

这些选项语法都不被 `optparse` 所支持，也永远不会支持。 这是有意为之的：前三种在任何环境下都是非标准的，而最后一种只在你专门针对 Windows 或某些旧平台（例如 VMS, MS-DOS）时才有意义。

选项参数

一个跟在特定选项之后的参数，与该选项紧密相关，并会在该选项被消耗时从参数列表中被消耗。 使用 `optparse`，选项参数可以是其对应选项以外的一个单独参数：

\-f foo
--file foo

或是包括在同一个参数中:

\-ffoo
--file=foo

通常，一个给定的选项将接受一个参数或是不接受。 许多人想要“可选的可选参数”特性，即某些选项将在看到特定参数时接受它，而如果没看到特定参数则不接受。 在某种程度上说这一特性是存在争议的，因它它将使解析发生歧义：如果 `-a` 接受一个可选参数而 `-b` 完全不同的另一个选项，那我们该如何解读 `-ab` 呢？ 由于这会存在歧义，因此 `optparse` 不支持这一特性。

positional argument -- 位置参数

在解析选项之后，即在选项及其参数解析完成并从参数列表中移除后参数列表中余下的内容。

必选选项

必须在命令行中提供的选项；请注意在英文中 "required option" 这个短语是自相矛盾的。 `optparse` 不会阻止你实现必须选项，但也不会在这方面给你什么帮助。

例如，考虑这个假设的命令行:

prog \-v \--report report.txt foo bar

`-v` 和 `--report` 都是选项。 假定 `--report` 接受一个参数，`report.txt` 是一个选项参数。 `foo` 和 `bar` 是位置参数。

### 选项的作用是什么？[¶](#what-are-options-for "Link to this heading")

选项被用来提供额外信息以便微调或定制程序的执行。 需要明确的一点是，选项通常都是 _可选的_。 一个程序应当能在没有设置任何选项的情况下正常运行。 （从 Unix 或 GNU 工具集中随机挑选一个程序。 它是否能在未设置任何选项的情况下运行并且仍然得到有意义的结果？ 主要的例外有 `find`, `tar` 和 `dd` --- 它们都是些因为语法不标准和界面混乱而受到公正抨击的变异奇行种。）

有很多人希望他们的程序具有“必需选项”。 请再思考一下。 如果某个项是必需的，那么它就 _不是可选的_！ 如果你的程序必需要有某项信息才能成功运行，则它更适合作为位置参数。

作为良好的命令行界面设计的一个例子，请看基本的用于拷贝文件的 `cp` 工具。 试图拷贝文件而不提供一个目标和至少一个源是没有什么意义的。 因此，如果你不带参数地运行 `cp` 它将会报错。 不过，它具有一个完全不需要任何选项的灵活、易用的语法:

cp SOURCE DEST
cp SOURCE ... DEST\-DIR

你只使用这个语法就能畅行无阻。 大多数 `cp` 实现还提供了许多精确调整文件拷贝方式的选项：你可以保留模式和修改时间，避免跟随符号链接，覆盖现有文件之前先询问，诸如此类。 但这些都不会破坏 `cp` 的核心任务，即将一个文件拷贝为另一个文件，或将多个文件拷贝到另一个目录。

### 位置参数有什么用？[¶](#what-are-positional-arguments-for "Link to this heading")

位置参数是对于你的程序运行来说绝对、肯定需要的信息片段。

一个好的用户界面应当尽可能少地设置绝对必需提供的信息。 如果你的程序必需提供 17 项不同的信息片段才能成功运行，那么你要 _如何_ 从用户获取这些信息将不是问题的关键 --- 大多数人会在他们成功运行此程序之前放弃并离开。 无论用户界面是命令行、配置文件还是 GUI 都一样适用：如果你对你的用户提出如此多的要求，他们大多将会直接放弃。

简而言之，请尽量最小化绝对要求用户提供的信息量 --- 只要有可能就使用合理的默认值。 当然，你希望程序足够灵活也是合理的。 这就是选项的作用。 同样，选项是配置文件中的条目，GUI 中的“首选项”对话框中的控件，还是命令行选项不是问题的关键 --- 你实现的选项越多，你的程序就越灵活，它的具体实现也会变得更为复杂。 当然，太大的灵活性也存在缺点；过多的选项会让用户更难掌握并使你的代码更难维护。

## 教程[¶](#tutorial "Link to this heading")

虽然 `optparse` 非常灵活和强大，但在大多数情况下它也很简明易用。 本小节介绍了任何基于 `optparse` 的程序中常见的代码模式。

首先，你需要导入 OptionParser 类；然后在主程序的开头部分，创建一个 OptionParser 实例:

from optparse import OptionParser
...
parser \= OptionParser()

然后你可以开始定义选项。 基本语法如下:

parser.add\_option(opt\_str, ...,
                  attr\=value, ...)

每个选项有一个或多个选项字符串，如 `-f` 或 `--file`，以及一些选项属性用来告诉 `optparse` 当它在命令行中遇到该选项时将得到什么和需要做什么。

通常，每个选项都会有一个短选项字符串和一个长选项字符串，例如

parser.add\_option("-f", "--file", ...)

你可以随你的喜好自由定义任意数量的短选项字符串和任意数量的长选项字符串（包括零个），只要总计至少有一个选项字符串。

传给 [`OptionParser.add_option()`](#optparse.OptionParser.add_option "optparse.OptionParser.add_option") 的选项字符串实际上是特定调用所定义的选项的标签。 为了表述简单，我们将经常会说在命令行中 _遇到一个选项_ ；而实际上，`optparse` 是遇到了 _选项字符串_ 并根据它们来查找选项。

一旦你定义好所有的选项，即可指令 `optparse` 来解析你的程序的命令行:

(options, args) \= parser.parse\_args()

（如果你愿意，可以将自定义的参数列表传给 [`parse_args()`](#optparse.OptionParser.parse_args "optparse.OptionParser.parse_args")，但很少有必要这样做：默认它将使用 `sys.argv[1:]`。）

[`parse_args()`](#optparse.OptionParser.parse_args "optparse.OptionParser.parse_args") 返回两个值:

-   `options`，一个包含你所有的选项的值的对象 --- 举例来说，如果 `--file` 接受一个字符串参数，则 `options.file` 将为用户所提供的文件名，或者如果用户未提供该选项则为 `None`
    
-   `args`，由解析选项之后余下的位置参数组成的列表
    

本教学章节只介绍了四个最重要的选项属性: [`action`](#optparse.Option.action "optparse.Option.action"), [`type`](#optparse.Option.type "optparse.Option.type"), [`dest`](#optparse.Option.dest "optparse.Option.dest") (destination) 和 [`help`](#optparse.Option.help "optparse.Option.help")。 其中，`action` 是最基本的一个。

### 理解选项动作[¶](#understanding-option-actions "Link to this heading")

动作是告诉 `optparse` 当它在命令行中遇到某个选项时要做什么。 有一个固定的动作集被硬编码到 `optparse` 内部；添加新的动作是将在 [扩展 optparse](#optparse-extending-optparse) 一节中介绍的进阶内容。 大多数动作都是告诉 `optparse` 将特定的值存储到某个变量中 --- 例如，从命令行接收一个字符串并将其存储到 `options` 的某个选项中。

如果你没有指定一个选项动作，`optparse` 将默认选择 `store`。

### store 动作[¶](#the-store-action "Link to this heading")

最常用的选项动作是 `store`，它告诉 `optparse` 接收下一个参数（或当前参数的剩余部分），确认其为正确的类型，并将其保存至你选择的目标。

例如：

parser.add\_option("-f", "--file",
                  action\="store", type\="string", dest\="filename")

现在让我们编一个虚假的命令行并让 `optparse` 来解析它:

args \= \["-f", "foo.txt"\]
(options, args) \= parser.parse\_args(args)

当 `optparse` 看到选项字符串 `-f` 时，它将获取下一个参数 `foo.txt`，并将其保存到 `options.filename` 中。 因此，在这个对 [`parse_args()`](#optparse.OptionParser.parse_args "optparse.OptionParser.parse_args") 的调用之后，`options.filename` 将为 `"foo.txt"`。

其他几种被 `optparse` 所支持的选项类型有 `int` 和 `float`。 下面是一个接受整数参数的选项:

parser.add\_option("-n", type\="int", dest\="num")

请注意这个选项没有长选项字符串，这是完全可接受的。 而且，它也没有显式的动作，因为使用默认的 `store`。

让我们解析另一个虚假的命令行。 这一次，我们将让选项参数与选项紧贴在一起：因为 `-n42` (一个参数) 与 `-n 42` (两个参数) 是等价的，以下代码

(options, args) \= parser.parse\_args(\["-n42"\])
print(options.num)

将会打印 `42`。

如果你没有指明类型，`optparse` 将假定其为 `string`。 结合默认动作为 `store` 这一事实，就意味着我们的第一个示例可以变得更加简短:

parser.add\_option("-f", "--file", dest\="filename")

如果你没有提供目标，`optparse` 会从选项字符串推断出一个合理的默认目标：如果第一个长选项字符串为 `--foo-bar`，则默认目标为 `foo_bar`。 如果没有长选项字符串，则 `optparse` 会查找第一个短选项字符串：针对 `-f` 的默认目标将为 `f`。

`optparse` 还包括了内置的 `complex` 类型。 添加类型的方式将在 [扩展 optparse](#optparse-extending-optparse) 一节中介绍。

### 处理布尔值（旗标）选项[¶](#handling-boolean-flag-options "Link to this heading")

旗标选项 --- 当看到特定选项时将某个变量设为真值或假值 --- 是相当常见的。 `optparse` 通过两个单独的动作支持它们，`store_true` 和 `store_false`。 例如你可能会有一个 `verbose` 旗标，它将通过 `-v` 启用并通过 `-q` 禁用:

parser.add\_option("-v", action\="store\_true", dest\="verbose")
parser.add\_option("-q", action\="store\_false", dest\="verbose")

这里我们有两个相同目标的不同选项，这是完全可行的。 （只是这意味着在设置默认值时你必须更加小心 --- 见下文所述。）

当 `optparse` 遇到命令行中的 `-v` 时，它会将 `options.verbose` 设为 `True`；当它遇到 `-q` 时，`options.verbose` 将被设为 `False`。

### 其他动作[¶](#other-actions "Link to this heading")

其他几种被 `optparse` 所支持的动作有：

`"store_const"`

存储一个常量值，通过 [`Option.const`](#optparse.Option.const "optparse.Option.const") 预设

`"append"`

将此选项的参数添加到一个列表

`"count"`

让指定的计数器加一

`"callback"`

调用指定函数

这些在 [参考指南](#optparse-reference-guide)，以及 [选项回调](#optparse-option-callbacks) 等章节中有说明。

### 默认值[¶](#default-values "Link to this heading")

上述示例全都涉及当看到特定命令行选项时设置某些变量（即“目标”）的操作。 如果从未看到这些选项那么会发生什么呢？ 由于我们没有提供任何默认值，它们全都会被设为 `None`。 这通常是可以的，但有时你会想要更多的控制。 `optparse` 允许你为每个目标提供默认值，它们将在解析命令行之前被赋值。

首先，考虑这个 verbose/quiet 示例。 如果我们希望 `optparse` 将 `verbose` 设为 `True` 除非看到了 `-q`，那么我们可以这样做:

parser.add\_option("-v", action\="store\_true", dest\="verbose", default\=True)
parser.add\_option("-q", action\="store\_false", dest\="verbose")

由于默认值将应用到 _destination_ 而不是任何特定选项，并且这两个选项正好具有相同的目标，因此这是完全等价的:

parser.add\_option("-v", action\="store\_true", dest\="verbose")
parser.add\_option("-q", action\="store\_false", dest\="verbose", default\=True)

考虑一下：

parser.add\_option("-v", action\="store\_true", dest\="verbose", default\=False)
parser.add\_option("-q", action\="store\_false", dest\="verbose", default\=True)

同样地，`verbose` 的默认值将为 `True`: 最终生效的将是最后提供给任何特定目标的默认值。

一种更清晰的默认值指定方式是使用 OptionParser 的 `set_defaults()` 方法，你可以在调用 [`parse_args()`](#optparse.OptionParser.parse_args "optparse.OptionParser.parse_args") 之前的任何时候调用它:

parser.set\_defaults(verbose\=True)
parser.add\_option(...)
(options, args) \= parser.parse\_args()

如前面一样，最终生效的将是最后为特定选项目标指定的值。 为清楚起见，请使用一种或另外一种设置默认值的方法，而不要同时使用。

### 生成帮助[¶](#generating-help "Link to this heading")

`optparse` 自动生成帮助和用法文本的功能适用于创建用户友好的命令行界面。 你所要做的只是为每个选项提供 [`help`](#optparse.Option.help "optparse.Option.help") 值，并可选项为你的整个程序提供一条简短的用法消息。 下面是一个填充了用户友好的（文档）选项的 OptionParser:

usage \= "usage: %prog \[options\] arg1 arg2"
parser \= OptionParser(usage\=usage)
parser.add\_option("-v", "--verbose",
                  action\="store\_true", dest\="verbose", default\=True,
                  help\="make lots of noise \[default\]")
parser.add\_option("-q", "--quiet",
                  action\="store\_false", dest\="verbose",
                  help\="be vewwy quiet (I'm hunting wabbits)")
parser.add\_option("-f", "--filename",
                  metavar\="FILE", help\="write output to FILE")
parser.add\_option("-m", "--mode",
                  default\="intermediate",
                  help\="interaction mode: novice, intermediate, "
                       "or expert \[default: %default\]")

如果 `optparse` 在命令行中遇到了 `-h` 或 `--help`，或者如果你调用了 `parser.print_help()`，它会把以下内容打印到标准输出：

Usage: <yourscript> \[options\] arg1 arg2

Options:
  -h, --help            show this help message and exit
  -v, --verbose         make lots of noise \[default\]
  -q, --quiet           be vewwy quiet (I'm hunting wabbits)
  -f FILE, --filename=FILE
                        write output to FILE
  -m MODE, --mode=MODE  interaction mode: novice, intermediate, or
                        expert \[default: intermediate\]

（如果帮助输出是由 help 选项触发的，`optparse` 将在打印帮助文本后退出。）

在这里为帮助 `optparse` 生成尽可能完善的帮助消息做了很多工作：

-   该脚本定义了自己的用法消息:
    
    usage \= "usage: %prog \[options\] arg1 arg2"
    
    `optparse` 会将用法字符串中的 `%prog` 扩展为当前程序的名称，即 `os.path.basename(sys.argv[0])`。 随后将在详细选项帮助之前打印经过扩展的字符串。
    
    如果你没有提供用法字符串，`optparse` 将使用一个直白而合理的默认值: `"Usage: %prog [options]"`，这在你的脚本不接受任何位置参数时是可以的。
    
-   每个选项都定义了帮助字符串，并且不用担心换行问题 --- `optparse` 会负责处理换行并使帮助输出具有良好的格式。
    
-   需要接受值的选项会在它们自动生成的帮助消息中提示这一点，例如对于 "mode" 选项:
    
    \-m MODE, \--mode\=MODE
    
    在这里，"MODE" 被称为元变量：它代表预期用户会提供给 `-m`/`--mode` 的参数。 在默认情况下，`optparse` 会将目标变量名转换为大写形式并将其用作元变量。 有时，这并不是你所希望的 --- 例如，`--filename` 选项显式地设置了 `metavar="FILE"`，结果将自动生成这样的选项描述:
    
    \-f FILE, \--filename\=FILE
    
    不过，这具有比节省一点空间更重要的作用：手动编写的帮助文本使用元变量 `FILE` 来提示用户在半正式的语法 `-f FILE` 和非正式的描述 "write output to FILE" 之间存在联系。 这是一种使你的帮助文本更清晰并对最终用户来说更易用的简单而有效的方式。
    
-   具有默认值的选项可以在帮助字符串中包括 `%default` --- `optparse` 将用该选项的默认值的 [`str()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 来替代它。 如果一个选项没有默认值 (或默认值为 `None`)，则 `%default` 将扩展为 `none`。
    

#### 选项分组[¶](#grouping-options "Link to this heading")

在处理大量选项时，可以方便地将选项进行分组以提供更好的帮助输出。 [`OptionParser`](#optparse.OptionParser "optparse.OptionParser") 可以包含多个选项分组，每个分组可以包含多个选项。

选项分组是使用 [`OptionGroup`](#optparse.OptionGroup "optparse.OptionGroup") 类来生成的:

_class_ optparse.OptionGroup(_parser_, _title_, _description\=None_)[¶](#optparse.OptionGroup "Link to this definition")

其中

-   parser 是分组将被插入的 [`OptionParser`](#optparse.OptionParser "optparse.OptionParser") 实例
    
-   title 是分组的标题
    
-   description，可选项，是分组的长描述文本
    

[`OptionGroup`](#optparse.OptionGroup "optparse.OptionGroup") 继承自 `OptionContainer` (类似 [`OptionParser`](#optparse.OptionParser "optparse.OptionParser")) 因此 `add_option()` 方法可被用来向分组添加选项。

一旦声明了所有选项，使用 [`OptionParser`](#optparse.OptionParser "optparse.OptionParser") 方法 `add_option_group()` 即可将分组添加到之前定义的解析器。

继续使用前一节定义的解析器，很容易将 [`OptionGroup`](#optparse.OptionGroup "optparse.OptionGroup") 添加到解析器中:

group \= OptionGroup(parser, "Dangerous Options",
                    "Caution: use these options at your own risk.  "
                    "It is believed that some of them bite.")
group.add\_option("-g", action\="store\_true", help\="Group option.")
parser.add\_option\_group(group)

这将产生以下帮助输出:

Usage: <yourscript> \[options\] arg1 arg2

Options:
  -h, --help            show this help message and exit
  -v, --verbose         make lots of noise \[default\]
  -q, --quiet           be vewwy quiet (I'm hunting wabbits)
  -f FILE, --filename=FILE
                        write output to FILE
  -m MODE, --mode=MODE  interaction mode: novice, intermediate, or
                        expert \[default: intermediate\]

  Dangerous Options:
    Caution: use these options at your own risk.  It is believed that some
    of them bite.

    -g                  Group option.

更完整一些的示例可能涉及使用多个分组：继续扩展之前的例子:

group \= OptionGroup(parser, "Dangerous Options",
                    "Caution: use these options at your own risk.  "
                    "It is believed that some of them bite.")
group.add\_option("-g", action\="store\_true", help\="Group option.")
parser.add\_option\_group(group)

group \= OptionGroup(parser, "Debug Options")
group.add\_option("-d", "--debug", action\="store\_true",
                 help\="Print debug information")
group.add\_option("-s", "--sql", action\="store\_true",
                 help\="Print all SQL statements executed")
group.add\_option("-e", action\="store\_true", help\="Print every action done")
parser.add\_option\_group(group)

这会产生以下输出:

Usage: <yourscript> \[options\] arg1 arg2

Options:
  -h, --help            show this help message and exit
  -v, --verbose         make lots of noise \[default\]
  -q, --quiet           be vewwy quiet (I'm hunting wabbits)
  -f FILE, --filename=FILE
                        write output to FILE
  -m MODE, --mode=MODE  interaction mode: novice, intermediate, or expert
                        \[default: intermediate\]

  Dangerous Options:
    Caution: use these options at your own risk.  It is believed that some
    of them bite.

    -g                  Group option.

  Debug Options:
    -d, --debug         Print debug information
    -s, --sql           Print all SQL statements executed
    -e                  Print every action done

另一个有趣的方法，特别适合在编程处理选项分组时使用:

OptionParser.get\_option\_group(_opt\_str_)[¶](#optparse.OptionParser.get_option_group "Link to this definition")

返回短或长选项字符串 _opt\_str_ (例如 `'-o'` 或 `'--option'`) 所属的 [`OptionGroup`](#optparse.OptionGroup "optparse.OptionGroup")。 如果没有对应的 `OptionGroup`，则返回 `None`。

### 打印版本字符串[¶](#printing-a-version-string "Link to this heading")

与简短用法字符串类似，`optparse` 还可以打印你的程序的版本字符串。 你必须将该字符串作为 `version` 参数提供给 OptionParser:

parser \= OptionParser(usage\="%prog \[-f\] \[-q\]", version\="%prog 1.0")

`%prog` 会像在 `usage` 中那样被扩展。 除了这一点，`version` 可以包含你想放的任何东西。 当你提供它时，`optparse` 会自动向你的解析器添加一个 `--version` 选项。 如果它在命令行中遇到了该选项，它将扩展你的 `version` 字符串（通过对 `%prog` 进行替换），将其打印到标准输出，然后退出。), prints it to stdout, and exits.

举例来说，如果你的脚本是 `/usr/bin/foo`:

$ /usr/bin/foo \--version
foo 1.0

下列两个方法可被用来打印和获取 `version` 字符串:

OptionParser.print\_version(_file\=None_)[¶](#optparse.OptionParser.print_version "Link to this definition")

将当前程序的版本消息 (`self.version`) 打印到 _file_ (默认为 stdout)。 就像 [`print_usage()`](#optparse.OptionParser.print_usage "optparse.OptionParser.print_usage") 一样，任何在 `self.version` 中出现的 `%prog` 将被替换为当前程序的名称。 如果 `self.version` 为空或未定义则不做任何操作。

OptionParser.get\_version()[¶](#optparse.OptionParser.get_version "Link to this definition")

与 [`print_version()`](#optparse.OptionParser.print_version "optparse.OptionParser.print_version") 相似但是会返回版本字符串而不是打印它。

### `optparse` 如何处理错误[¶](#how-optparse-handles-errors "Link to this heading")

`optparse` 需要考虑两种宽泛的错误类：程序员错误和用户错误。 程序员错误通常是对 [`OptionParser.add_option()`](#optparse.OptionParser.add_option "optparse.OptionParser.add_option") 的错误调用，例如无效的选项字符串，未知的选项属性，缺失的选项属性等等。 这些错误将以通常的方式来处理：引发一个异常 ([`optparse.OptionError`](#optparse.OptionError "optparse.OptionError") 或 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")) 并让程序崩溃。

处理用户错误更为重要，因为无论你的代码有多稳定他们都肯定会发生。 `optparse` 可以自动检测部分用户错误，例如错误的选项参数（像是传入 `-n 4x` 而 `-n` 接受整数参数），缺失参数（像是 `-n` 位于命令行末尾，而 `-n` 接受任意类型的参数）。 此外，你还可以调用 `OptionParser.error()` 来指明应用程序所定义的错误条件:

(options, args) \= parser.parse\_args()
...
if options.a and options.b:
    parser.error("options -a and -b are mutually exclusive")

不论是哪种情况，`optparse` 都以相同的方式处理错误：它会将程序的用法消息和错误消息打印到标准错误并限制错误状态码 2 退出。

考虑上面的第一个示例，当用户向一个接受整数的选项传入了 `4x`:

$ /usr/bin/foo \-n 4x
Usage: foo \[options\]

foo: error: option -n: invalid integer value: '4x'

或者，当用户未传入任何值:

$ /usr/bin/foo \-n
Usage: foo \[options\]

foo: error: -n option requires an argument

`optparse` 生成的错误消息总是会提示在错误中涉及的选项；请确保在从你的程序代码调用 `OptionParser.error()` 时也做同样的事。

如果 `optparse` 的默认错误行为不适合你的需求，你需要子类化 OptionParser 并重写它的 `exit()` 和/或 `error()` 方法。

### 合并所有代码[¶](#putting-it-all-together "Link to this heading")

下面是基于 `optparse` 的脚本通常的结构:

from optparse import OptionParser
...
def main():
    usage \= "usage: %prog \[options\] arg"
    parser \= OptionParser(usage)
    parser.add\_option("-f", "--file", dest\="filename",
                      help\="read data from FILENAME")
    parser.add\_option("-v", "--verbose",
                      action\="store\_true", dest\="verbose")
    parser.add\_option("-q", "--quiet",
                      action\="store\_false", dest\="verbose")
    ...
    (options, args) \= parser.parse\_args()
    if len(args) != 1:
        parser.error("incorrect number of arguments")
    if options.verbose:
        print("reading %s..." % options.filename)
    ...

if \_\_name\_\_ \== "\_\_main\_\_":
    main()

## 参考指南[¶](#reference-guide "Link to this heading")

### 创建解析器[¶](#creating-the-parser "Link to this heading")

使用 `optparse` 的第一步是创建 OptionParser 实例。

_class_ optparse.OptionParser(_..._)[¶](#optparse.OptionParser "Link to this definition")

OptionParser 构造器没有必需的参数，只有一些可选的关键字参数。 你应当始终以关键字参数形式传入它们，即不要依赖于声明参数所在位置的顺序。

`usage` (默认: `"%prog [options]"`)

当你的程序不正确地运行或附带 help 选项运行时将打印的用法说明。 当 `optparse` 打印用法字符串时，它会将 `%prog` 扩展为 `os.path.basename(sys.argv[0])` (或者如果你传入了 `prog` 则为该关键字参数值)。 要屏蔽用法说明，请传入特殊值 `optparse.SUPPRESS_USAGE`。

`option_list` (默认: `[]`)

一个用于填充解析器的由 Option 对象组成的列表。 `option_list` 中的选项将添加在 `standard_option_list` (一个可由 OptionParser 的子类设置的类属性) 中的任何选项之后，以及任何版本或帮助选项之前。 已被弃用；请改为在创建解析器之后使用 [`add_option()`](#optparse.OptionParser.add_option "optparse.OptionParser.add_option")。

`option_class` (默认: optparse.Option)

当在 [`add_option()`](#optparse.OptionParser.add_option "optparse.OptionParser.add_option") 中向解析器添加选项时要使用的类。

`version` (默认: `None`)

当用户提供了 version 选项时将会打印的版本字符串。 如果你提供一个真值作为 `version`，`optparse` 将自动添加单个选项字符串 `--version` 形式的 version 选项。 子字符串 `%prog` 会以与 `usage` 相同的方式扩展。

`conflict_handler` (默认: `"error"`)

指定当有相互冲突的选项字符串的选项被添加到解析器时要如何做；参见 [选项之间的冲突](#optparse-conflicts-between-options) 一节。

`description` (默认: `None`)

一段为你的程序给出简短介绍的文本 `optparse` 会重格式化段落以适合当前终端宽度并在用户请求帮助时打印其内容（在 `usage` 之前，选项列表之前）。

`formatter` (默认: 一个新的 `IndentedHelpFormatter`)

一个将被用于打印帮助文本的 optparse.HelpFormatter 实例。 `optparse` 为此目的提供了两个实体类: IndentedHelpFormatter 和 TitledHelpFormatter。

`add_help_option` (默认: `True`)

如为真值，`optparse` 将向解析器添加一个 help 选项（使用 `-h` 和 `--help` 选项字符串）。

`prog`

当在 `usage` 和 `version` 中用于代替 `os.path.basename(sys.argv[0])` 来扩展 `%prog` 的字符串。

`epilog` (默认: `None`)

一段将在选项帮助之后打印的帮助文本。

### 填充解析器[¶](#populating-the-parser "Link to this heading")

有几种方式可以为解析器填充选项。 最推荐的方式是使用 [`OptionParser.add_option()`](#optparse.OptionParser.add_option "optparse.OptionParser.add_option")，如 [教程](#optparse-tutorial) 一节所演示的。 `add_option()` 可以通过两种方式来调用:

-   传入一个 Option 实例（即 `make_option()` 所返回的对象）
    
-   传入 `make_option()` 可接受的（即与 Option 构造器相同的）任意位置和关键字参数组合，它将为你创建 Option 实例
    

另一种方式是将由预先构造的 Option 实例组成的列表传给 OptionParser 构造器，如下所示:

option\_list \= \[
    make\_option("-f", "--filename",
                action\="store", type\="string", dest\="filename"),
    make\_option("-q", "--quiet",
                action\="store\_false", dest\="verbose"),
    \]
parser \= OptionParser(option\_list\=option\_list)

(`make_option()` 是一个用于创建 Option 实例的工厂函数；目前它是 Option 构造器的一个别名。 未来的 `optparse` 版本可能会将 Option 拆分为多个类，而 `make_option()` 将选择适当的类来实例化。 请不要直接实例化 Option。)

### 定义选项[¶](#defining-options "Link to this heading")

每个 Option 实例代表一组同义的命令行选项字符串，例如 `-f` 和 `--file`。 你可以指定任意数量的短和长选项字符串，但你必须指定总计至少一个选项字符串。

创建 [`Option`](#optparse.Option "optparse.Option") 的正规方式是使用 [`OptionParser`](#optparse.OptionParser "optparse.OptionParser") 的 `add_option()` 方法。

OptionParser.add\_option(_option_)[¶](#optparse.OptionParser.add_option "Link to this definition")

OptionParser.add\_option(_\*opt\_str_, _attr=value_, _..._)

定义只有一个短选项字符串的选项:

parser.add\_option("-f", attr\=value, ...)

以及定义只有一个长选项字符串的选项:

parser.add\_option("--foo", attr\=value, ...)

该关键字参数定义新 Option 对象的属性。 最重要的选项属性是 [`action`](#optparse.Option.action "optparse.Option.action")，它主要负责确定其他的属性是相关的还是必须的。 如果你传入了不相关的选项属性，或是未能传入必须的属性，`optparse` 将引发 [`OptionError`](#optparse.OptionError "optparse.OptionError") 异常来说明你的错误。

选项的 _action_ 决定当 `optparse` 在命令行中遇到该选项时要做什么。 硬编码在 `optparse` 中的标准选项动作有：

`"store"`

存储此选项的参数（默认）

`"store_const"`

存储一个常量值，通过 [`Option.const`](#optparse.Option.const "optparse.Option.const") 预设

`"store_true"`

存储 `True`

`"store_false"`

存储 `False`

`"append"`

将此选项的参数添加到一个列表

`"append_const"`

将指定常量值添加到一个列表，可通过 [`Option.const`](#optparse.Option.const "optparse.Option.const") 预设

`"count"`

让指定的计数器加一

`"callback"`

调用指定函数

`"help"`

打印用法消息，包括所有选项和它们的文档

（如果你没有提供动作，则默认为 `"store"`。 对于此动作，你还可以提供 [`type`](#optparse.Option.type "optparse.Option.type") 和 [`dest`](#optparse.Option.dest "optparse.Option.dest") 选项属性；参见 [标准选项动作](#optparse-standard-option-actions)。）

如你所见，大多数动作都在某处保存或更新一个值。 `optparse` 总是会为此创建一个特殊对象，它被恰当地称为 `options`，是 [`optparse.Values`](#optparse.Values "optparse.Values") 的实例。.

_class_ optparse.Values[¶](#optparse.Values "Link to this definition")

一个将被解析的参数名和值作为属性保存的对象。 一般是通过调用 [`OptionParser.parse_args()`](#optparse.OptionParser.parse_args "optparse.OptionParser.parse_args") 来创建，并可被传给 `OptionParser.parse_args()` 的 _values_ 参数的自定义子类所覆盖（如在 [解析参数](#optparse-parsing-arguments) 中描述的那样）。

Option 参数（以及各种其他的值）将根据 [`dest`](#optparse.Option.dest "optparse.Option.dest") (目标) 选项属性被保存为此对象的属性。

例如，当你调用

parser.parse\_args()

`optparse` 首先会做的一件事情是创建 `options` 对象:

options \= Values()

如果该解析器中的某个选项定义带有

parser.add\_option("-f", "--file", action\="store", type\="string", dest\="filename")

并且被解析的命令行包括以下任意一项:

\-ffoo
\-f foo
\--file\=foo
\--file foo

那么 `optparse` 在看到此选项时，将会这样做:

options.filename \= "foo"

[`type`](#optparse.Option.type "optparse.Option.type") 和 [`dest`](#optparse.Option.dest "optparse.Option.dest") 选项属性几乎与 [`action`](#optparse.Option.action "optparse.Option.action") 一样重要，但 `action` 是唯一对 _所有_ 选项都有意义的。

### 选项属性[¶](#option-attributes "Link to this heading")

_class_ optparse.Option[¶](#optparse.Option "Link to this definition")

一个单独的命令行参数，带有以关键字参数形式传给构造器的各种属性。 通常使用 [`OptionParser.add_option()`](#optparse.OptionParser.add_option "optparse.OptionParser.add_option") 创建而不是直接创建，并可被作为 [`OptionParser`](#optparse.OptionParser "optparse.OptionParser") 的 _option\_class_ 参数传入的自定义类来重写。

下列选项属性可以作为关键字参数传给 [`OptionParser.add_option()`](#optparse.OptionParser.add_option "optparse.OptionParser.add_option")。 如果你传入一个与特定选项无关的选项属性，或是未能传入必要的选项属性，`optparse` 将会引发 [`OptionError`](#optparse.OptionError "optparse.OptionError")。

Option.action[¶](#optparse.Option.action "Link to this definition")

(默认: `"store"`)

用于在命令行中遇到该选项时确定 `optparse` 的行为；可用的选项记录在 [此处](#optparse-standard-option-actions)。

Option.type[¶](#optparse.Option.type "Link to this definition")

(默认: `"string"`)

此选项所接受的参数类型 (例如 `"string"` 或 `"int"`)；可用的选项类型记录在 [这里](#optparse-standard-option-types)。

Option.dest[¶](#optparse.Option.dest "Link to this definition")

(默认: 获取自选项字符串)

如果选项的动作涉及在某处写入或修改一个值，该属性将告诉 `optparse` 将它写入到哪里: [`dest`](#optparse.Option.dest "optparse.Option.dest") 指定 `optparse` 在解析命令时要构建的 `options` 对象的某个属性。

Option.default[¶](#optparse.Option.default "Link to this definition")

当未在命令行中遇到此选项时将被用作此选项的目标的值。 另请参阅 [`OptionParser.set_defaults()`](#optparse.OptionParser.set_defaults "optparse.OptionParser.set_defaults")。

Option.nargs[¶](#optparse.Option.nargs "Link to this definition")

(默认: 1)

当遇到该选项时应当读取多少个 [`type`](#optparse.Option.type "optparse.Option.type") 类型的参数。 如果 > 1，`optparse` 会将由多个值组成的元组保存到 [`dest`](#optparse.Option.dest "optparse.Option.dest")。

Option.const[¶](#optparse.Option.const "Link to this definition")

对于保存常量值的动作，指定要保存的常量值。

Option.choices[¶](#optparse.Option.choices "Link to this definition")

对于 `"choice"` 类型的选项，由用户可选择的字符串组成的列表。

Option.callback[¶](#optparse.Option.callback "Link to this definition")

对于使用 `"callback"` 动作的选项，当遇到此选项时要调用的可调用对象。 请参阅 [选项回调](#optparse-option-callbacks) 一节了解关于传给可调用对象的参数的详情。

Option.callback\_args[¶](#optparse.Option.callback_args "Link to this definition")

Option.callback\_kwargs[¶](#optparse.Option.callback_kwargs "Link to this definition")

将在四个标准回调参数之后传给 `callback` 的额外的位置和关键字参数。

Option.help[¶](#optparse.Option.help "Link to this definition")

当用户提供 [`help`](#optparse.Option.help "optparse.Option.help") 选项 (如 `--help`) 之后将在列出所有可用选项时针对此选项打印的文本。 如果没有提供帮助文本，则列出选项时将不附带帮助文本。 要隐藏此选项，请使用特殊值 `optparse.SUPPRESS_HELP`。

Option.metavar[¶](#optparse.Option.metavar "Link to this definition")

(默认: 获取自选项字符串)

当打印帮助文本时要使用的代表选项参数的名称。 请参阅 [教程](#optparse-tutorial) 一节查看相应示例。

### 标准选项动作[¶](#standard-option-actions "Link to this heading")

各种选项动作具有略微不同的要求和效果。 大多数动作都具有几个可被你指定的独步选项属性用来控制 `optparse` 的行为；少数动作还具有一些必需属性，你必须为任何使用该动作的选项指定这些属性。

-   `"store"` \[关联: [`type`](#optparse.Option.type "optparse.Option.type"), [`dest`](#optparse.Option.dest "optparse.Option.dest"), [`nargs`](#optparse.Option.nargs "optparse.Option.nargs"), [`choices`](#optparse.Option.choices "optparse.Option.choices")\]
    
    该选项后必须跟一个参数，它将根据 [`type`](#optparse.Option.type "optparse.Option.type") 被转换为相应的值并保存至 [`dest`](#optparse.Option.dest "optparse.Option.dest")。 如果 [`nargs`](#optparse.Option.nargs "optparse.Option.nargs") > 1，则将从命令行读取多个参数；它们将全部根据 `type` 被转换并以元组形式保存至 `dest`。 参见 [标准选项类型](#optparse-standard-option-types) 一节。
    
    如果提供了 [`choices`](#optparse.Option.choices "optparse.Option.choices") (由字符串组成的列表或元组)，则类型默认为 `"choice"`。
    
    如果未提供 [`type`](#optparse.Option.type "optparse.Option.type")，则默认为 `"string"`。
    
    如果未提供 [`dest`](#optparse.Option.dest "optparse.Option.dest")，`optparse` 会从第一个长选项字符串派生出目标 (例如 `--foo-bar` 对应 `foo_bar`)。 如果不存在长选项字符串，`optparse` 会从第一个短选项字符串派生出目标 (例如 `-f` 对应 `f`)。
    
    示例:
    
    parser.add\_option("-f")
    parser.add\_option("-p", type\="float", nargs\=3, dest\="point")
    
    当它解析命令行
    
    \-f foo.txt \-p 1 \-3.5 4 \-fbar.txt
    
    `optparse` 将设置
    
    options.f \= "foo.txt"
    options.point \= (1.0, \-3.5, 4.0)
    options.f \= "bar.txt"
    
-   `"store_const"` \[要求: [`const`](#optparse.Option.const "optparse.Option.const"); 关联: [`dest`](#optparse.Option.dest "optparse.Option.dest")\]
    
    值 [`const`](#optparse.Option.const "optparse.Option.const") 将存放到 [`dest`](#optparse.Option.dest "optparse.Option.dest") 中。
    
    示例:
    
    parser.add\_option("-q", "--quiet",
                      action\="store\_const", const\=0, dest\="verbose")
    parser.add\_option("-v", "--verbose",
                      action\="store\_const", const\=1, dest\="verbose")
    parser.add\_option("--noisy",
                      action\="store\_const", const\=2, dest\="verbose")
    
    如果看到了 `--noisy`，`optparse` 将设置
    
    options.verbose \= 2
    
-   `"store_true"` \[关联: [`dest`](#optparse.Option.dest "optparse.Option.dest")\]
    
    将 `True` 存放到 [`dest`](#optparse.Option.dest "optparse.Option.dest") 中的 `"store_const"` 的特例。
    
-   `"store_false"` \[关联: [`dest`](#optparse.Option.dest "optparse.Option.dest")\]
    
    类似于 `"store_true"`，但是存放 `False`。
    
    示例:
    
    parser.add\_option("--clobber", action\="store\_true", dest\="clobber")
    parser.add\_option("--no-clobber", action\="store\_false", dest\="clobber")
    
-   `"append"` \[关联: [`type`](#optparse.Option.type "optparse.Option.type"), [`dest`](#optparse.Option.dest "optparse.Option.dest"), [`nargs`](#optparse.Option.nargs "optparse.Option.nargs"), [`choices`](#optparse.Option.choices "optparse.Option.choices")\]
    
    该选项必须跟一个参数，该参数将被添加到 [`dest`](#optparse.Option.dest "optparse.Option.dest") 列表中。 如果未提供 `dest` 的默认值，那么当 `optparse` 首次在命令行中遇到该选项时将自动创建一个空列表。 如果 [`nargs`](#optparse.Option.nargs "optparse.Option.nargs") > 1，则会读取多个参数，并将一个长度为 `nargs` 的元组添加到 `dest`。
    
    [`type`](#optparse.Option.type "optparse.Option.type") 和 [`dest`](#optparse.Option.dest "optparse.Option.dest") 的默认值与 `"store"` 动作的相同。
    
    示例:
    
    parser.add\_option("-t", "--tracks", action\="append", type\="int")
    
    如果在命令行中遇到 `-t3`，`optparse` 将会这样做:
    
    options.tracks \= \[\]
    options.tracks.append(int("3"))
    
    如果，在稍后的时候，再遇到 `--tracks=4`，它将执行:
    
    options.tracks.append(int("4"))
    
    `append` 动作会在选项的当前值上调用 `append` 方法。 这意味着任何被指定的默认值必须具有 `append` 方法。 这还意味着如果默认值非空，则其中的默认元素将存在于选项的已解析值中，而任何来自命令行的值将被添加到这些默认值之后:
    
    \>>> parser.add\_option("--files", action\="append", default\=\['~/.mypkg/defaults'\])
    \>>> opts, args \= parser.parse\_args(\['--files', 'overrides.mypkg'\])
    \>>> opts.files
    \['~/.mypkg/defaults', 'overrides.mypkg'\]
    
-   `"append_const"` \[需要: [`const`](#optparse.Option.const "optparse.Option.const"); 关联: [`dest`](#optparse.Option.dest "optparse.Option.dest")\]
    
    与 `"store_const"` 类似，但 [`const`](#optparse.Option.const "optparse.Option.const") 值将被添加到 [`dest`](#optparse.Option.dest "optparse.Option.dest")；与 `"append"` 一样，`dest` 默认为 `None`，并且当首次遇到该选项时将自动创建一个空列表。
    
-   `"count"` \[关联: [`dest`](#optparse.Option.dest "optparse.Option.dest")\]
    
    对保存在 [`dest`](#optparse.Option.dest "optparse.Option.dest") 的整数执行递增。 如果未提供默认值，则 `dest` 会在第一次执行递增之前被设为零。
    
    示例:
    
    parser.add\_option("-v", action\="count", dest\="verbosity")
    
    当在命令中首次遇到 `-v`，`optparse` 将会这样做:
    
    options.verbosity \= 0
    options.verbosity += 1
    
    后续每次出现 `-v` 都将导致
    
    options.verbosity += 1
    
-   `"callback"` \[需要: [`callback`](#optparse.Option.callback "optparse.Option.callback"); 关联: [`type`](#optparse.Option.type "optparse.Option.type"), [`nargs`](#optparse.Option.nargs "optparse.Option.nargs"), [`callback_args`](#optparse.Option.callback_args "optparse.Option.callback_args"), [`callback_kwargs`](#optparse.Option.callback_kwargs "optparse.Option.callback_kwargs")\]
    
    调用 [`callback`](#optparse.Option.callback "optparse.Option.callback") 所指定的函数，它将以如下形式被调用
    
    func(option, opt\_str, value, parser, \*args, \*\*kwargs)
    
    请参阅 [选项回调](#optparse-option-callbacks) 一节了解详情。
    
-   `"help"`
    
    为当前选项解析器中所有的选项打印完整帮助消息。 该帮助消息是由传给 OptionParser 的构造器的 `usage` 字符串和传给每个选项的 [`help`](#optparse.Option.help "optparse.Option.help") 字符串构造而成的。
    
    如果没有为某个选项提供 [`help`](#optparse.Option.help "optparse.Option.help") 字符串，它仍将在帮助消息中列出。 要完全略去某个选项，请使用特殊值 `optparse.SUPPRESS_HELP`。
    
    `optparse` 会自动为所有 OptionParsers 添加 [`help`](#optparse.Option.help "optparse.Option.help") 选项，因此你通常不需要创建它。
    
    示例:
    
    from optparse import OptionParser, SUPPRESS\_HELP
    
    \# 通常，help 选项会自动添加，但可以
    \# 使用 add\_help\_option 参数来屏蔽
    parser \= OptionParser(add\_help\_option\=False)
    
    parser.add\_option("-h", "--help", action\="help")
    parser.add\_option("-v", action\="store\_true", dest\="verbose",
                      help\="Be moderately verbose")
    parser.add\_option("--file", dest\="filename",
                      help\="Input file to read data from")
    parser.add\_option("--secret", help\=SUPPRESS\_HELP)
    
    如果 `optparse` 在命令行中遇到 `-h` 或 `--help`，它将打印下面这样的帮助消息到 stdout (假设 `sys.argv[0]` 为 `"foo.py"`):
    
    Usage: foo.py \[options\]
    
    Options:
      -h, --help        Show this help message and exit
      -v                Be moderately verbose
      --file=FILENAME   Input file to read data from
    
    在打印帮助消息之后，`optparse` 将使用 `sys.exit(0)` 终结你的进程。
    
-   `"version"`
    
    将提供给 OptionParser 的版本号打印到 stdout 并退出。 该版本号实际上是由 OptionParser 的 `print_version()` 方法进行格式化并打印的。 这通常只在向 OptionParser 构造器提供了 `version` 参数时才有意义。 与 [`help`](#optparse.Option.help "optparse.Option.help") 选项类似，你很少会创建 `version` 选项，因为 `optparse` 会在需要时自动添加它们。
    

### 标准选项类型[¶](#standard-option-types "Link to this heading")

`optparse` 有五种内置选项类型: `"string"`, `"int"`, `"choice"`, `"float"` 和 `"complex"`。 如果你需要添加新的选项类型，请参阅 [扩展 optparse](#optparse-extending-optparse) 一节。

传给 string 类型选项的参数不会以任何方式进行检查或转换：命令行中的文本将被原样保存至目标（或传给回调）。

整数参数 (`"int"` 类型) 将以如下方式解析:

-   如果数字开头为 `0x`，它将被解析为十六进制数
    
-   如果数字开头为 `0`，它将被解析为八进制数
    
-   如果数字开头为 `0b`，它将被解析为二进制数
    
-   在其他情况下，数字将被解析为十进制数
    

转换操作是通过调用 [`int()`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 并传入适当的 base 值 (2, 8, 10 或 16)。 如果转换失败，`optparse` 也将失败，不过它会附带更有用的错误消息。

`"float"` 和 `"complex"` 选项参数会直接通过 [`float()`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 和 [`complex()`](https://docs.python.org/zh-cn/3/builtins/functions.html#complex "complex") 来转换，使用类似的错误处理。

`"choice"` 选项是 `"string"` 选项的子类型。 [`choices`](#optparse.Option.choices "optparse.Option.choices") 选项属性（由字符串组成的序列）定义了允许的选项参数的集合。 `optparse.check_choice()` 将用户提供的选项参数与这个主列表进行比较并会在给出无效的字符串时引发 [`OptionValueError`](#optparse.OptionValueError "optparse.OptionValueError")。

### 解析参数[¶](#parsing-arguments "Link to this heading")

创建和填充 OptionParser 的基本目的是调用其 [`parse_args()`](#optparse.OptionParser.parse_args "optparse.OptionParser.parse_args") 方法。

OptionParser.parse\_args(_args\=None_, _values\=None_)[¶](#optparse.OptionParser.parse_args "Link to this definition")

解析 _args_ 中的命令行选项。

输入形参为

`args`

要处理的参数列表 (默认: `sys.argv[1:]`)

`values`

要用于存储选项参数的 [`Values`](#optparse.Values "optparse.Values") 对象（默认值：一个新的 `Values` 实例） -- 如果你给出一个现有对象，则不会基于它来初始化选项的默认值。

并且返回值是一个 `(options, args)` 对，其中

`options`

与作为 _values_ 传入的是同一个对象，或是由 `optparse` 创建的 `optparse.Values` 实例。

`args`

在所有选项被处理完毕后余下的位置参数

最常见的用法是不提供任何关键字参数。 如果你提供了 `values`，它将通过重复的 [`setattr()`](https://docs.python.org/zh-cn/3/builtins/functions.html#setattr "setattr") 调用来修改（大致为每个存储到指定选项目标的选项参数调用一次）并由 [`parse_args()`](#optparse.OptionParser.parse_args "optparse.OptionParser.parse_args") 返回。

如果 [`parse_args()`](#optparse.OptionParser.parse_args "optparse.OptionParser.parse_args") 在参数列表中遇到任何错误，它将调用 OptionParser 的 `error()` 方法并附带适当的最终用户错误消息。 这会完全终结你的进程并将退出状态设为 2 (传统的针对命令行错误的 Unix 退出状态)。

### 查询和操纵你的选项解析器[¶](#querying-and-manipulating-your-option-parser "Link to this heading")

选项解析器的默认行为可被轻度地定制，并且你还可以调整你的选项解析器查看实际效果如何。 OptionParser 提供了一些方法来帮助你进行定制:

OptionParser.disable\_interspersed\_args()[¶](#optparse.OptionParser.disable_interspersed_args "Link to this definition")

设置解析在第一个非选项处停止。 举例来说，如果 `-a` 和 `-b` 都是不接受参数的简单选项，则 `optparse` 通常会接受这样的语法:

prog \-a arg1 \-b arg2

并会这样处理它

prog \-a \-b arg1 arg2

要禁用此特性，则调用 [`disable_interspersed_args()`](#optparse.OptionParser.disable_interspersed_args "optparse.OptionParser.disable_interspersed_args")。 这将恢复传统的 Unix 语法，其中选项解析会在第一个非选项参数处停止。

如果你用一个命令处理程序来运行另一个拥有它自己的选项的命令而你希望确保这些选项不会被混淆就可以使用此方法。 例如，每个命令可能具有不同的选项集合。

OptionParser.enable\_interspersed\_args()[¶](#optparse.OptionParser.enable_interspersed_args "Link to this definition")

设置解析不在第一个非选项处停止，允许多个命令行参数的插入相互切换。 这是默认的行为。

OptionParser.get\_option(_opt\_str_)[¶](#optparse.OptionParser.get_option "Link to this definition")

返回具有选项字符串 _opt\_str_ 的 Option 实例，或者如果不存在具有该选项字符串的选项则返回 `None`。

OptionParser.has\_option(_opt\_str_)[¶](#optparse.OptionParser.has_option "Link to this definition")

如果 OptionParser 包含一个具有选项字符串 _opt\_str_ 的选项 (例如 `-q` 或 `--verbose`) 则返回 `True`。

OptionParser.remove\_option(_opt\_str_)[¶](#optparse.OptionParser.remove_option "Link to this definition")

如果 [`OptionParser`](#optparse.OptionParser "optparse.OptionParser") 包含一个对应于 _opt\_str_ 的选项，则移除该选项。 如果该选项提供了任何其他选项字符串，这些选项字符串将全部不可用。 如果 _opt\_str_ 不存在于任何属于此 `OptionParser` 的选项之中，则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

### 选项之间的冲突[¶](#conflicts-between-options "Link to this heading")

如果你不够小心，很容易会定义具有相互冲突的选项字符串的多个选项:

parser.add\_option("-n", "--dry-run", ...)
...
parser.add\_option("-n", "--noisy", ...)

（当你自定义具有某些标准选项的 OptionParser 时特别容易发生这种情况。）

每当你添加一个选项时，`optparse` 会检查是否与现有选项相冲突。 如果发现任何冲突，它将唤起当前的冲突处理机制。 你可以选择在构造器中设置冲突处理机制:

parser \= OptionParser(..., conflict\_handler\=handler)

或是在单独调用中设置:

parser.set\_conflict\_handler(handler)

可用的冲突处理器有:

> `"error"` (默认)
> 
> 将选项冲突视为编程错误并引发 [`OptionConflictError`](#optparse.OptionConflictError "optparse.OptionConflictError")
> 
> `"resolve"`
> 
> 智能地解决选项冲突（见下文）

举例来说，让我们定义一个智能地解决冲突的 [`OptionParser`](#optparse.OptionParser "optparse.OptionParser") 并向其添加相互冲突的选项:

parser \= OptionParser(conflict\_handler\="resolve")
parser.add\_option("-n", "--dry-run", ..., help\="do no harm")
parser.add\_option("-n", "--noisy", ..., help\="be noisy")

这时，`optparse` 会检测到之前添加的选项已经在使用 `-n` 选项字符串了。 由于 `conflict_handler` 为 `"resolve"`，它将通过从之前选项的选项字符串列表中移除 `-n` 来解决冲突。 现在 `--dry-run` 将是用户激活该选项的唯一方式。 如果用户请求帮助，帮助消息将会反映此情况:

Options:
  \--dry\-run     do no harm
  ...
  \-n, \--noisy   be noisy

之前添加的选项有可能被不断移除直到一个都不剩，这样用户将无法再从命令行唤起相应选项。 在这种情况下，`optparse` 将完全移除该选项，使它不会在帮助文本中或任何其他地方显示。 让我们继续修改现有的 OptionParser:

parser.add\_option("--dry-run", ..., help\="new dry-run option")

这时，原来的 `-n`/`--dry-run` 选项将不再可用，因此 `optparse` 会移除它，留下这样的帮助文本:

Options:
  ...
  \-n, \--noisy   be noisy
  \--dry\-run     new dry\-run option

### 清理[¶](#cleanup "Link to this heading")

OptionParser 实例存在一些循环引用。 这对 Python 的垃圾回收器来说应该不是问题，但你可能希望在你完成对 OptionParser 的使用后通过调用其 `destroy()` 来显式地中断循环引用。 这在可以从你的 OptionParser 访问大型对象图的长期运行应用程序中特别有用。

### 其他方法[¶](#other-methods "Link to this heading")

OptionParser 还支持其他一些公有方法:

OptionParser.set\_usage(_usage_)[¶](#optparse.OptionParser.set_usage "Link to this definition")

根据上述的规则为 `usage` 构造器关键字参数设置用法字符串。 传入 `None` 将设置默认的用法字符串；使用 `optparse.SUPPRESS_USAGE` 将屏蔽用法说明。

OptionParser.print\_usage(_file\=None_)[¶](#optparse.OptionParser.print_usage "Link to this definition")

将当前程序的用法消息 (`self.usage`) 打印到 _file_ (默认为 stdout)。 出现在 `self.usage` 中的字符串 `%prog` 将全部被替换为当前程序的名称。 如果 `self.usage` 为空或未定义则不做任何事情。

OptionParser.get\_usage()[¶](#optparse.OptionParser.get_usage "Link to this definition")

与 [`print_usage()`](#optparse.OptionParser.print_usage "optparse.OptionParser.print_usage") 类似但是将返回用法字符串而不是打印它。

OptionParser.set\_defaults(_dest=value_, _..._)[¶](#optparse.OptionParser.set_defaults "Link to this definition")

一次性地为多个选项目标设置默认值。 使用 [`set_defaults()`](#optparse.OptionParser.set_defaults "optparse.OptionParser.set_defaults") 是为选项设置默认值的推荐方式，因为多个选项可以共享同一个目标。 举例来说，如果几个 "mode" 选项全部设置了相同的目标，则它们中的任何一个都可以设置默认值，而最终生效的将是最后一次设置的默认值:

parser.add\_option("--advanced", action\="store\_const",
                  dest\="mode", const\="advanced",
                  default\="novice")    \# 被下面的设置覆盖
parser.add\_option("--novice", action\="store\_const",
                  dest\="mode", const\="novice",
                  default\="advanced")  \# 覆盖上面的设置

为避免混淆，请使用 [`set_defaults()`](#optparse.OptionParser.set_defaults "optparse.OptionParser.set_defaults"):

parser.set\_defaults(mode\="advanced")
parser.add\_option("--advanced", action\="store\_const",
                  dest\="mode", const\="advanced")
parser.add\_option("--novice", action\="store\_const",
                  dest\="mode", const\="novice")

## 选项回调[¶](#option-callbacks "Link to this heading")

当 `optparse` 的内置动作和类型不能满足你的需要时，你有两个选择：扩展 `optparse` 或者定义一个回调选项。 扩展 `optparse` 的方式更为通用，但对许多简单场景来说有点用力过猛。 你需要的常常只是一个简单的回调。

定义一个回调选项分为两步:

-   使用 `"callback"` 动作定义选项本身
    
-   编写回调；它是一个接受至少四个参数的函数（或方法），如下所述
    

### 定义回调选项[¶](#defining-a-callback-option "Link to this heading")

一般来说，定义回调选项的最简单方式是使用 [`OptionParser.add_option()`](#optparse.OptionParser.add_option "optparse.OptionParser.add_option") 方法。 在 [`action`](#optparse.Option.action "optparse.Option.action") 之外，你必须指定的唯一选项属性是 `callback`，即要调用的函数:

parser.add\_option("-c", action\="callback", callback\=my\_callback)

`callback` 是一个函数（或其他可调用对象），因此当你创建这个回调选项时你必须已经定义了 `my_callback()`。 在这个简单场景中，`optparse` 甚至不用知道 `-c` 是否接受任何参数，这通常意味着该选项不接受任何参数 --- 它需要知道的就只是 `-c` 存在于命令行中。 不过，在某些情况下，你可能希望你的回调接受任意数量的命令行参数。 这是编写回调开始变复杂的起点；这将在本小节稍后部分进行讲解。

`optparse` 总是会向你的回调传递四个特定参数，并且它只会在你通过 [`callback_args`](#optparse.Option.callback_args "optparse.Option.callback_args") 和 [`callback_kwargs`](#optparse.Option.callback_kwargs "optparse.Option.callback_kwargs") 指定额外参数时才传入它们。 因此，最小化的回调函数签名如下:

def my\_callback(option, opt, value, parser):

对传给回调的四个参数的说明见下文。

当你定义回调选项时还可以提供一些其他的选项属性:

[`type`](#optparse.Option.type "optparse.Option.type")

具有其通常的含义：与在 `"store"` 或 `"append"` 动作中一样，它指示 `optparse` 读取一个参数并将其转换为 [`type`](#optparse.Option.type "optparse.Option.type")。 但是，`optparse` 并不会将所转换的值保存到某个地方，而是将其传给你的回调函数。

[`nargs`](#optparse.Option.nargs "optparse.Option.nargs")

also has its usual meaning: if it is supplied and > 1, `optparse` will consume [`nargs`](#optparse.Option.nargs "optparse.Option.nargs") arguments, each of which must be convertible to [`type`](#optparse.Option.type "optparse.Option.type"). It then passes a tuple of converted values to your callback.

[`callback_args`](#optparse.Option.callback_args "optparse.Option.callback_args")

一个要传给回调的由额外位置参数组成的元组

[`callback_kwargs`](#optparse.Option.callback_kwargs "optparse.Option.callback_kwargs")

一个要传给回调的由额外关键字参数组成的字典

### 回调应当如何调用[¶](#how-callbacks-are-called "Link to this heading")

所有回调都将使用以下方式调用:

func(option, opt\_str, value, parser, \*args, \*\*kwargs)

其中

`option`

是调用该回调的 Option 实例

`opt_str`

是在触发回调的命令行参数中出现的选项字符串。 （如果使用了长选项的缩写形式，则 `opt_str` 将为完整规范的选项字符串 --- 举例来说，如果用户在命令行中将 `--foo` 作为 `--foobar` 的缩写形式，则 `opt_str` 将为 `"--foobar"`。）

`value`

is the argument to this option seen on the command-line. `optparse` will only expect an argument if [`type`](#optparse.Option.type "optparse.Option.type") is set; the type of `value` will be the type implied by the option's type. If `type` for this option is `None` (no argument expected), then `value` will be `None`. If [`nargs`](#optparse.Option.nargs "optparse.Option.nargs") > 1, `value` will be a tuple of values of the appropriate type.

`parser`

是驱动选项解析过程的 OptionParser 实例，主要作用在于你可以通过其实例属性访问其他一些相关数据:

`parser.largs`

当前的剩余参数列表，即已被读取但不属于选项或选项参数的参数。 可以任意修改 `parser.largs`，例如通过向其添加更多的参数。 （该列表将成为 `args`，即 [`parse_args()`](#optparse.OptionParser.parse_args "optparse.OptionParser.parse_args") 的第二个返回值。）

`parser.rargs`

当前的保留参数列表，即移除了 `opt_str` 和 `value` (如果可用)，并且只有在它们之后的参数才会被保留。 可以任意修改 `parser.rargs`，例如通过读取更多的参数。

`parser.values`

the object where option values are by default stored (an instance of optparse.OptionValues). This lets callbacks use the same mechanism as the rest of `optparse` for storing option values; you don't need to mess around with globals or closures. You can also access or modify the value(s) of any options already encountered on the command-line.

`args`

是一个由通过 [`callback_args`](#optparse.Option.callback_args "optparse.Option.callback_args") 选项属性提供的任意位置参数组成的元组。

`kwargs`

是一个由通过 [`callback_kwargs`](#optparse.Option.callback_kwargs "optparse.Option.callback_kwargs") 提供的任意关键字参数组成的字典。

### 在回调中引发错误[¶](#raising-errors-in-a-callback "Link to this heading")

The callback function should raise [`OptionValueError`](#optparse.OptionValueError "optparse.OptionValueError") if there are any problems with the option or its argument(s). `optparse` catches this and terminates the program, printing the error message you supply to stderr. Your message should be clear, concise, accurate, and mention the option at fault. Otherwise, the user will have a hard time figuring out what they did wrong.

### 回调示例 1：最简回调[¶](#callback-example-1-trivial-callback "Link to this heading")

下面是一个不接受任何参数，只是简单地记录所遇见的选项的回调选项示例:

def record\_foo\_seen(option, opt\_str, value, parser):
    parser.values.saw\_foo \= True

parser.add\_option("--foo", action\="callback", callback\=record\_foo\_seen)

当然，你也可以使用 `"store_true"` 动作做到这一点。

### 回调示例 2：检查选项顺序[¶](#callback-example-2-check-option-order "Link to this heading")

下面是一个更有趣些的示例：当看到 `-a` 出现时将会记录，而如果它在命令行中出现于 `-b` 之后则将报告错误。

def check\_order(option, opt\_str, value, parser):
    if parser.values.b:
        raise OptionValueError("can't use -a after -b")
    parser.values.a \= 1
...
parser.add\_option("-a", action\="callback", callback\=check\_order)
parser.add\_option("-b", action\="store\_true", dest\="b")

### 回调示例 3：检查选项顺序（通用）[¶](#callback-example-3-check-option-order-generalized "Link to this heading")

如果你希望为多个类似的选项重用此回调（设置旗标，并在 `-b` 已经出现时触发），则需要一些额外工作：它设置的错误消息和旗标必须进行通用化。

def check\_order(option, opt\_str, value, parser):
    if parser.values.b:
        raise OptionValueError("can't use %s after -b" % opt\_str)
    setattr(parser.values, option.dest, 1)
...
parser.add\_option("-a", action\="callback", callback\=check\_order, dest\='a')
parser.add\_option("-b", action\="store\_true", dest\="b")
parser.add\_option("-c", action\="callback", callback\=check\_order, dest\='c')

### 回调示例 4：检查任意条件[¶](#callback-example-4-check-arbitrary-condition "Link to this heading")

当然，你可以设置任何条件 --- 并不限于检查已定义选项的值。 举例来说，如果你有一个不应当在满月时被调用的选项，你就可以这样做:

def check\_moon(option, opt\_str, value, parser):
    if is\_moon\_full():
        raise OptionValueError("%s option invalid when moon is full"
                               % opt\_str)
    setattr(parser.values, option.dest, 1)
...
parser.add\_option("--foo",
                  action\="callback", callback\=check\_moon, dest\="foo")

（定义 `is_moon_full()` 的任务将作为留给读者的练习。）

### 回调示例 5：固定的参数[¶](#callback-example-5-fixed-arguments "Link to this heading")

当你定义接受固定数量参数的 callback 选项时情况会变得更有趣一点。 指定一个 callback 选项接受参数的操作类似于定义一个 `"store"` 或 `"append"` 选项：如果你定义 [`type`](#optparse.Option.type "optparse.Option.type")，那么该选项将接受一个必须可被转换为相应类型的参数；如果你进一步定义 [`nargs`](#optparse.Option.nargs "optparse.Option.nargs")，那么该选项将接受 `nargs` 个参数。

下面是一个模拟了标准 `"store"` 动作的示例:

def store\_value(option, opt\_str, value, parser):
    setattr(parser.values, option.dest, value)
...
parser.add\_option("--foo",
                  action\="callback", callback\=store\_value,
                  type\="int", nargs\=3, dest\="foo")

Note that `optparse` takes care of consuming 3 arguments and converting them to integers for you; all you have to do is store them. (Or whatever; obviously you don't need a callback for this example.)

### 回调示例 6：可变的参数[¶](#callback-example-6-variable-arguments "Link to this heading")

Things get hairy when you want an option to take a variable number of arguments. For this case, you must write a callback, as `optparse` doesn't provide any built-in capabilities for it. And you have to deal with certain intricacies of conventional Unix command-line parsing that `optparse` normally handles for you. In particular, callbacks should implement the conventional rules for bare `--` and `-` arguments:

-   `--` 或 `-` 都可以作为选项参数
    
-   单个 `--` (如果不是某个选项的参数): 停止命令行处理并丢弃该 `--`
    
-   单个 `-` (如果不是某个选项的参数): 停止命令行处理但保留 `-` (将其添加到 `parser.largs`)
    

If you want an option that takes a variable number of arguments, there are several subtle, tricky issues to worry about. The exact implementation you choose will be based on which trade-offs you're willing to make for your application (which is why `optparse` doesn't support this sort of thing directly).

无论如何，下面是一个对于接受可变参数的选项的回调的尝试:

def vararg\_callback(option, opt\_str, value, parser):
    assert value is None
    value \= \[\]

    def floatable(str):
        try:
            float(str)
            return True
        except ValueError:
            return False

    for arg in parser.rargs:
        \# stop on --foo like options
        if arg\[:2\] \== "--" and len(arg) \> 2:
            break
        \# stop on -a, but not on -3 or -3.0
        if arg\[:1\] \== "-" and len(arg) \> 1 and not floatable(arg):
            break
        value.append(arg)

    del parser.rargs\[:len(value)\]
    setattr(parser.values, option.dest, value)

...
parser.add\_option("-c", "--callback", dest\="vararg\_attr",
                  action\="callback", callback\=vararg\_callback)

## 扩展 `optparse`[¶](#extending-optparse "Link to this heading")

由于控制 `optparse` 如何读取命令行选项的两个主要因子是每个选项的动作和类型，所以扩展最可能的方向就是添加新的动作和新的类型。

### 添加新的类型[¶](#adding-new-types "Link to this heading")

要添加新的类型，你必须自定义 `optparse` 的 [`Option`](#optparse.Option "optparse.Option") 类的子类。 这个类包含几个用来定义 `optparse` 的类型的属性: [`TYPES`](#optparse.Option.TYPES "optparse.Option.TYPES") 和 [`TYPE_CHECKER`](#optparse.Option.TYPE_CHECKER "optparse.Option.TYPE_CHECKER")。

Option.TYPES[¶](#optparse.Option.TYPES "Link to this definition")

一个由类型名称组成的元组；在你的子类中，简单地定义一个在标准元组基础上构建的新元组 [`TYPES`](#optparse.Option.TYPES "optparse.Option.TYPES")。

Option.TYPE\_CHECKER[¶](#optparse.Option.TYPE_CHECKER "Link to this definition")

一个将类型名称映射到类型检查函数的字典。 类型检查函数具有如下签名:

def check\_mytype(option, opt, value)

其中 `option` 是一个 [`Option`](#optparse.Option "optparse.Option") 实例，`opt` 是一个选项字符串 (例如 `-f`)，而 `value` 是来自命令行的必须被检查并转换为你想要的类型的字符串。 `check_mytype()` 应当返回假设的类型 `mytype` 的对象。 类型检查函数所返回的值将最终出现在 [`OptionParser.parse_args()`](#optparse.OptionParser.parse_args "optparse.OptionParser.parse_args") 所返回的 OptionValues 实例中，或是作为 `value` 形参传给一个回调。

如果你的类型检查函数遇到任何问题则应当引发 [`OptionValueError`](#optparse.OptionValueError "optparse.OptionValueError")。 `OptionValueError` 接受一个字符串参数，该参数将被原样传递给 [`OptionParser`](#optparse.OptionParser "optparse.OptionParser") 的 `error()` 方法，该方法将随后附加程序名称和字符串 `"error:"` 并在终结进程之前将所有信息打印到 stderr。

Here's a silly example that demonstrates adding a `"complex"` option type to parse Python-style complex numbers on the command line. (This is even sillier than it used to be, because `optparse` 1.3 added built-in support for complex numbers, but never mind.)

首先，必要的导入操作:

from copy import copy
from optparse import Option, OptionValueError

你必须先定义自己的类型检查器，因为以后它会被引用（在你的 Option 子类的 [`TYPE_CHECKER`](#optparse.Option.TYPE_CHECKER "optparse.Option.TYPE_CHECKER") 类属性中）:

def check\_complex(option, opt, value):
    try:
        return complex(value)
    except ValueError:
        raise OptionValueError(
            "option %s: invalid complex value: %r" % (opt, value))

最后，是 Option 子类:

class MyOption (Option):
    TYPES \= Option.TYPES + ("complex",)
    TYPE\_CHECKER \= copy(Option.TYPE\_CHECKER)
    TYPE\_CHECKER\["complex"\] \= check\_complex

(If we didn't make a [`copy()`](https://docs.python.org/zh-cn/3/library/copy.html#module-copy "copy: Shallow and deep copy operations.") of [`Option.TYPE_CHECKER`](#optparse.Option.TYPE_CHECKER "optparse.Option.TYPE_CHECKER"), we would end up modifying the `TYPE_CHECKER` attribute of `optparse`'s Option class. This being Python, nothing stops you from doing that except good manners and common sense.)

就是这样！ 现在你可以编写一个脚本以与其他基于 `optparse` 的脚本相同的方式使用新的选项类型，不同之处仅有你必须指示你的 OptionParser 使用 MyOption 而不是 Option:

parser \= OptionParser(option\_class\=MyOption)
parser.add\_option("-c", type\="complex")

作为替代选择，你可以构建你自己的选项列表并将它传给 OptionParser；如果你不是以上述方式使用 `add_option()`，则你不需要告诉 OptionParser 使用哪个选项类:

option\_list \= \[MyOption("-c", action\="store", type\="complex", dest\="c")\]
parser \= OptionParser(option\_list\=option\_list)

### 添加新的动作[¶](#adding-new-actions "Link to this heading")

添加新动作要更复杂一些，因为你必须理解 `optparse` 对于动作有几种分类：

"store" 类动作

会使得 `optparse` 将某个值保存到当前 OptionValues 实例的特定属性中的动作；这些选项要求向 Option 构造器提供一个 [`dest`](#optparse.Option.dest "optparse.Option.dest") 属性。

"typed" 类动作

从命令行接受某个值并预期它是一个特定类型；或者更准确地说，是可被转换为一个特定类型的字符串的动作。 这些选项要求向 Option 构造器提供一个 [`type`](#optparse.Option.type "optparse.Option.type") 属性。

这些是相互重叠的集合：默认的 "store" 类动作有 `"store"`, `"store_const"`, `"append"` 和 `"count"`，而默认的 "typed" 类动作有 `"store"`, `"append"` 和 `"callback"`。

当你添加一个动作时，你需要将它列在 Option 的以下类属性的至少一个当中以对它进行分类（全部为字符串列表）:

Option.ACTIONS[¶](#optparse.Option.ACTIONS "Link to this definition")

所有动作必须在 ACTIONS 中列出。

Option.STORE\_ACTIONS[¶](#optparse.Option.STORE_ACTIONS "Link to this definition")

"store" 类动作要额外地在此列出。

Option.TYPED\_ACTIONS[¶](#optparse.Option.TYPED_ACTIONS "Link to this definition")

"typed" 类动作要额外地在此列出。

Option.ALWAYS\_TYPED\_ACTIONS[¶](#optparse.Option.ALWAYS_TYPED_ACTIONS "Link to this definition")

总是会接受一个类型的动作（即其选项总是会接受一个值）要额外地在此列出。 它带来的唯一影响是 `optparse` 会将默认类型 `"string"` 赋值给在 [`ALWAYS_TYPED_ACTIONS`](#optparse.Option.ALWAYS_TYPED_ACTIONS "optparse.Option.ALWAYS_TYPED_ACTIONS") 中列出动作而未显式指定类型的选项。

为了真正实现你的新动作，你必须重写 Option 的 `take_action()` 方法并添加一个识别你的动作的分支。

例如，让我们添加一个 `"extend"` 动作。 它类似于标准的 `"append"` 动作，但 `"extend"` 不是从命令行接受单个值并将其添加到现有列表，而是接受形式为以单个逗号分隔的多个值的字符串，并用这些值来扩展现有列表。 也就是说，如果 `--names` 是一个类型为 `"string"` 的 `"extend"` 选项，则命令行

\--names\=foo,bar \--names blah \--names ding,dong

将得到一个列表

\["foo", "bar", "blah", "ding", "dong"\]

我们再定义一个 Option 的子类:

class MyOption(Option):

    ACTIONS \= Option.ACTIONS + ("extend",)
    STORE\_ACTIONS \= Option.STORE\_ACTIONS + ("extend",)
    TYPED\_ACTIONS \= Option.TYPED\_ACTIONS + ("extend",)
    ALWAYS\_TYPED\_ACTIONS \= Option.ALWAYS\_TYPED\_ACTIONS + ("extend",)

    def take\_action(self, action, dest, opt, value, values, parser):
        if action \== "extend":
            lvalue \= value.split(",")
            values.ensure\_value(dest, \[\]).extend(lvalue)
        else:
            Option.take\_action(
                self, action, dest, opt, value, values, parser)

应注意的特性:

-   `"extend"` 既预期在命令行接受一个值又会将该值保存到某处，因此它同时被归类于 [`STORE_ACTIONS`](#optparse.Option.STORE_ACTIONS "optparse.Option.STORE_ACTIONS") 和 [`TYPED_ACTIONS`](#optparse.Option.TYPED_ACTIONS "optparse.Option.TYPED_ACTIONS")。
    
-   为确保 `optparse` 将默认类型 `"string"` 赋值给 `"extend"` 动作，我们还会将 `"extend"` 动作归类于 [`ALWAYS_TYPED_ACTIONS`](#optparse.Option.ALWAYS_TYPED_ACTIONS "optparse.Option.ALWAYS_TYPED_ACTIONS")。
    
-   `MyOption.take_action()` 只实现了这一个新动作，并将控制权回传给 `Option.take_action()` 以执行标准的 `optparse` 动作。
    
-   `values` 是 optparse\_parser.Values 类的一个实例，该类提供了非常有用的 `ensure_value()` 方法。 `ensure_value()` 实际就是一个带有安全阀的 [`getattr()`](https://docs.python.org/zh-cn/3/builtins/functions.html#getattr "getattr")；它的调用形式为
    
    values.ensure\_value(attr, value)
    
    如果 `values` 的 `attr` 属性不存在或为 `None`，则 ensure\_value() 会先将其设为 `value`，然后返回 `value`。 这非常适用于 `"extend"`, `"append"` 和 `"count"` 等动作，它们会将数据累积在一个变量中并预期该变量属于特定的类型（前两项是一个列表，后一项是一个整数）。 使用 `ensure_value()` 意味着使用你的动作的脚本无需关心为相应的选项目标设置默认值；可以简单地保持默认的 `None` 而 `ensure_value()` 将在必要时负责为其设置适当的值。
    

## 异常[¶](#exceptions "Link to this heading")

_exception_ optparse.OptionError[¶](#optparse.OptionError "Link to this definition")

当使用无效或不一致的参数创建 [`Option`](#optparse.Option "optparse.Option") 实例时将被引发。

_exception_ optparse.OptionConflictError[¶](#optparse.OptionConflictError "Link to this definition")

当向 [`OptionParser`](#optparse.OptionParser "optparse.OptionParser") 添加相互冲突的选项时将被引发。

_exception_ optparse.OptionValueError[¶](#optparse.OptionValueError "Link to this definition")

当在命令行中遇到无效的选项值时将被引发。

_exception_ optparse.BadOptionError[¶](#optparse.BadOptionError "Link to this definition")

当在命令行中传入无效的选项时将被引发。

_exception_ optparse.AmbiguousOptionError[¶](#optparse.AmbiguousOptionError "Link to this definition")

当在命令行中传入有歧义的选项时将被引发。
