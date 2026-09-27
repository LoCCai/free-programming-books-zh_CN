**源代码** ： [Lib/trace.py](https://github.com/python/cpython/tree/3.14/Lib/trace.py)

* * *

`trace` 模块允许你跟踪程序执行，生成带注解的语句覆盖率列表，打印调用者/被调用者关系以及列出程序运行过程中执行的函数。 它可以在其他程序中使用或从命令行使用。

## 命令行用法[¶](#command-line-usage "Link to this heading")

`trace` 模块可以从命令行调用。 只需简单地

python \-m trace \--count \-C . somefile.py ...

上述命令将执行 `somefile.py` ，并在当前目录生成执行期间所有已导入 Python 模块的带注解列表。

\--help[¶](#cmdoption-trace-help "Link to this definition")

显示用法并退出。

\--version[¶](#cmdoption-trace-version "Link to this definition")

显示模块版本并退出。

Added in version 3.8: 增加了 `--module` 选项，它允许运行可执行的模块。

### 主要的可选参数[¶](#main-options "Link to this heading")

调用 `trace` 时必须至少指定以下选项之一。 [`--listfuncs`](#cmdoption-trace-l) 选项与 [`--trace`](#cmdoption-trace-t) 和 [`--count`](#cmdoption-trace-c) 选项互斥。 当提供了 `--listfuncs` 时，`--count` 和 `--trace` 都不可接受，反之亦然。

\-c, \--count[¶](#cmdoption-trace-c "Link to this definition")

在程序完成时生成一组带有注解的报表文件，显示每个语句被执行的次数。 参见下面的 [`--coverdir`](#cmdoption-trace-C)、[`--file`](#cmdoption-trace-f) 和 [`--no-report`](#cmdoption-trace-R)。

\-t, \--trace[¶](#cmdoption-trace-t "Link to this definition")

执行时显示每一行。

\-l, \--listfuncs[¶](#cmdoption-trace-l "Link to this definition")

显示程序运行时执行到的函数。

\-r, \--report[¶](#cmdoption-trace-r "Link to this definition")

由之前用了 [`--count`](#cmdoption-trace-c) 和 [`--file`](#cmdoption-trace-f) 运行的程序产生一个带有注解的报表。 不会执行代码。

\-T, \--trackcalls[¶](#cmdoption-trace-T "Link to this definition")

显示程序运行时暴露出来的调用关系。

### 修饰器[¶](#modifiers "Link to this heading")

\-f, \--file\=<file>[¶](#cmdoption-trace-f "Link to this definition")

用于累计多次跟踪运行计数的文件名。应与 [`--count`](#cmdoption-trace-c) 一起使用。

\-C, \--coverdir\=<dir>[¶](#cmdoption-trace-C "Link to this definition")

报表文件的所在目录。`package.module` 的覆盖率报表将被写入文件 `_dir_/_package_/_module_.cover`。

\-m, \--missing[¶](#cmdoption-trace-m "Link to this definition")

生成带注解的报表时，用 `>>>>>>` 标记未执行的行。

\-s, \--summary[¶](#cmdoption-trace-s "Link to this definition")

在用到 [`--count`](#cmdoption-trace-c) 或 [`--report`](#cmdoption-trace-r) 时，将每个文件的简短摘要输出到 stdout。

\-R, \--no-report[¶](#cmdoption-trace-R "Link to this definition")

不生成带注解的报表。如果打算用 [`--count`](#cmdoption-trace-c) 执行多次运行，然后在最后产生一组带注解的报表，该选项就很有用。

\-g, \--timing[¶](#cmdoption-trace-g "Link to this definition")

在每一行前面加上时间，自程序运行算起。只在跟踪时有用。

### 过滤器[¶](#filters "Link to this heading")

以下参数可重复多次。

\--ignore-module\=<mod>[¶](#cmdoption-trace-ignore-module "Link to this definition")

忽略给出的模块名及其子模块（若为包）。参数可为逗号分隔的名称列表。

\--ignore-dir\=<dir>[¶](#cmdoption-trace-ignore-dir "Link to this definition")

忽略指定目录及其子目录下的所有模块和包。参数可为 [`os.pathsep`](https://docs.python.org/zh-cn/3/library/os.html#os.pathsep "os.pathsep") 分隔的目录列表。

## 编程接口[¶](#programmatic-interface "Link to this heading")

_class_ trace.Trace(_count\=1_, _trace\=1_, _countfuncs\=0_, _countcallers\=0_, _ignoremods\=()_, _ignoredirs\=()_, _infile\=None_, _outfile\=None_, _timing\=False_)[¶](#trace.Trace "Link to this definition")

创建一个对象来跟踪单个语句或表达式的执行。所有参数均为选填。 _count_ 可对行号计数。 _trace_ 启用单行执行跟踪。 _countfuncs_ 可列出运行过程中调用的函数。 _countcallers_ 可跟踪调用关系。 _ignoremods_ 是要忽略的模块或包的列表。_ignoredirs_ 是要忽略的模块或包的目录列表。 _infile_ 是个文件名，从该文件中读取存储的计数信息。 _outfile_ 是用来写入最新计数信息的文件名。 _timing_ 可以显示相对于跟踪开始时间的时间戳。

run(_cmd_)[¶](#trace.Trace.run "Link to this definition")

执行命令，并根据当前跟踪参数从执行过程中收集统计数据。 _cmd_ 必须为字符串或 code 对象，可供传入 [`exec()`](https://docs.python.org/zh-cn/3/builtins/functions.html#exec "exec")。

runctx(_cmd_, _globals\=None_, _locals\=None_)[¶](#trace.Trace.runctx "Link to this definition")

在定义的全局和局部环境中，执行命令并收集当前跟踪参数下的执行统计数据。若没有定义 _globals_ 和 _locals_ ，则默认为空字典。

runfunc(_func_, _/_, _\*args_, _\*\*kwds_)[¶](#trace.Trace.runfunc "Link to this definition")

在 [`Trace`](#trace.Trace "trace.Trace") 对象的控制下，用给定的参数调用 _func_，并采用当前的跟踪参数。

results()[¶](#trace.Trace.results "Link to this definition")

返回一个 [`CoverageResults`](#trace.CoverageResults "trace.CoverageResults") 对象，包含之前对指定 [`Trace`](#trace.Trace "trace.Trace") 实例调用 `run`、`runctx` 和 `runfunc` 的累积结果。 累积的跟踪结果不会重置。

_class_ trace.CoverageResults[¶](#trace.CoverageResults "Link to this definition")

存放代码覆盖结果的容器，由 [`Trace.results()`](#trace.Trace.results "trace.Trace.results") 创建。用户不应直接去创建。

update(_other_)[¶](#trace.CoverageResults.update "Link to this definition")

从另一个 [`CoverageResults`](#trace.CoverageResults "trace.CoverageResults") 对象中合并代码覆盖数据。

write\_results(_show\_missing\=True_, _summary\=False_, _coverdir\=None_, _\*_, _ignore\_missing\_files\=False_)[¶](#trace.CoverageResults.write_results "Link to this definition")

写入代码覆盖结果。设置 _show\_missing_ 可显示未命中的行。设置 _summary_ 可在输出中包含每个模块的覆盖率摘要信息。 _coverdir_ 可指定覆盖率结果文件的输出目录，为 `None` 则结果将置于源文件所在目录中。

如果 _ignore\_missing\_files_ 为 `True`，则对于已不存在文件的覆盖计数将被静默地忽略。 在其他情况下，文件不存在将引发 [`FileNotFoundError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#FileNotFoundError "FileNotFoundError")。

在 3.13 版本发生变更: 增加了 _ignore\_missing\_files_ 形参。

以下例子简单演示了编程接口的用法：

import sys
import trace

\# 创建一个 Trace 对象，告诉它要忽略什么，
\# 及是否执行跟踪或行计数或者两者均执行。
tracer \= trace.Trace(
    ignoredirs\=\[sys.prefix, sys.exec\_prefix\],
    trace\=0,
    count\=1)

\# 使用给定的 tracer 运行新命令
tracer.run('main()')

\# 生成报告，将输出放入当前目录
r \= tracer.results()
r.write\_results(show\_missing\=True, coverdir\=".")
