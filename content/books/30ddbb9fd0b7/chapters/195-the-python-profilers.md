**Source code:** [Lib/profile.py](https://github.com/python/cpython/tree/3.14/Lib/profile.py) and [Lib/pstats.py](https://github.com/python/cpython/tree/3.14/Lib/pstats.py)

* * *

## Introduction to the profilers[¶](#introduction-to-the-profilers "Link to this heading")

[`cProfile`](#module-cProfile "cProfile") and [`profile`](#module-profile "profile: Python source profiler.") provide _deterministic profiling_ of Python programs. A _profile_ is a set of statistics that describes how often and for how long various parts of the program executed. These statistics can be formatted into reports via the [`pstats`](#module-pstats "pstats: Statistics object for use with the profiler.") module.

The Python standard library provides two different implementations of the same profiling interface:

1.  [`cProfile`](#module-cProfile "cProfile") is recommended for most users; it's a C extension with reasonable overhead that makes it suitable for profiling long-running programs. Based on `lsprof`, contributed by Brett Rosen and Ted Czotter.
    
2.  [`profile`](#module-profile "profile: Python source profiler."), a pure Python module whose interface is imitated by [`cProfile`](#module-cProfile "cProfile"), but which adds significant overhead to profiled programs. If you're trying to extend the profiler in some way, the task might be easier with this module. Originally designed and written by Jim Roskind.
    

备注

The profiler modules are designed to provide an execution profile for a given program, not for benchmarking purposes (for that, there is [`timeit`](https://docs.python.org/zh-cn/3/library/timeit.html#module-timeit "timeit: Measure the execution time of small code snippets.") for reasonably accurate results). This particularly applies to benchmarking Python code against C code: the profilers introduce overhead for Python code, but not for C-level functions, and so the C code would seem faster than any Python one.

## Instant User's Manual[¶](#instant-user-s-manual "Link to this heading")

This section is provided for users that "don't want to read the manual." It provides a very brief overview, and allows a user to rapidly perform profiling on an existing application.

To profile a function that takes a single argument, you can do:

import cProfile
import re
cProfile.run('re.compile("foo|bar")')

(Use [`profile`](#module-profile "profile: Python source profiler.") instead of [`cProfile`](#module-cProfile "cProfile") if the latter is not available on your system.)

The above action would run [`re.compile()`](https://docs.python.org/zh-cn/3/library/re.html#re.compile "re.compile") and print profile results like the following:

      214 function calls (207 primitive calls) in 0.002 seconds

Ordered by: cumulative time

ncalls  tottime  percall  cumtime  percall filename:lineno(function)
     1    0.000    0.000    0.002    0.002 {built\-in method builtins.exec}
     1    0.000    0.000    0.001    0.001 <string\>:1(<module\>)
     1    0.000    0.000    0.001    0.001 \_\_init\_\_.py:250(compile)
     1    0.000    0.000    0.001    0.001 \_\_init\_\_.py:289(\_compile)
     1    0.000    0.000    0.000    0.000 \_compiler.py:759(compile)
     1    0.000    0.000    0.000    0.000 \_parser.py:937(parse)
     1    0.000    0.000    0.000    0.000 \_compiler.py:598(\_code)
     1    0.000    0.000    0.000    0.000 \_parser.py:435(\_parse\_sub)

The first line indicates that 214 calls were monitored. Of those calls, 207 were _primitive_, meaning that the call was not induced via recursion. The next line: `Ordered by: cumulative time` indicates the output is sorted by the `cumtime` values. The column headings include:

ncalls

for the number of calls.

tottime

for the total time spent in the given function (and excluding time made in calls to sub-functions)

percall

is the quotient of `tottime` divided by `ncalls`

cumtime

is the cumulative time spent in this and all subfunctions (from invocation till exit). This figure is accurate _even_ for recursive functions.

percall

is the quotient of `cumtime` divided by primitive calls

filename:lineno(function)

provides the respective data of each function

When there are two numbers in the first column (for example `3/1`), it means that the function recursed. The second value is the number of primitive calls and the former is the total number of calls. Note that when the function does not recurse, these two values are the same, and only the single figure is printed.

Instead of printing the output at the end of the profile run, you can save the results to a file by specifying a filename to the `run()` function:

import cProfile
import re
cProfile.run('re.compile("foo|bar")', 'restats')

The [`pstats.Stats`](#pstats.Stats "pstats.Stats") class reads profile results from a file and formats them in various ways.

The files [`cProfile`](#module-cProfile "cProfile") and [`profile`](#module-profile "profile: Python source profiler.") can also be invoked as a script to profile another script. For example:

python \-m cProfile \[\-o output\_file\] \[\-s sort\_order\] (\-m module | myscript.py)

\-o <output\_file>[¶](#cmdoption-cProfile-o "Link to this definition")

Writes the profile results to a file instead of to stdout.

\-s <sort\_order>[¶](#cmdoption-cProfile-s "Link to this definition")

Specifies one of the [`sort_stats()`](#pstats.Stats.sort_stats "pstats.Stats.sort_stats") sort values to sort the output by. This only applies when [`-o`](#cmdoption-cProfile-o) is not supplied.

\-m <module>[¶](#cmdoption-cProfile-m "Link to this definition")

Specifies that a module is being profiled instead of a script.

Added in version 3.7: Added the `-m` option to [`cProfile`](#module-cProfile "cProfile").

Added in version 3.8: Added the `-m` option to [`profile`](#module-profile "profile: Python source profiler.").

The [`pstats`](#module-pstats "pstats: Statistics object for use with the profiler.") module's [`Stats`](#pstats.Stats "pstats.Stats") class has a variety of methods for manipulating and printing the data saved into a profile results file:

import pstats
from pstats import SortKey
p \= pstats.Stats('restats')
p.strip\_dirs().sort\_stats(\-1).print\_stats()

The [`strip_dirs()`](#pstats.Stats.strip_dirs "pstats.Stats.strip_dirs") method removed the extraneous path from all the module names. The [`sort_stats()`](#pstats.Stats.sort_stats "pstats.Stats.sort_stats") method sorted all the entries according to the standard module/line/name string that is printed. The [`print_stats()`](#pstats.Stats.print_stats "pstats.Stats.print_stats") method printed out all the statistics. You might try the following sort calls:

p.sort\_stats(SortKey.NAME)
p.print\_stats()

The first call will actually sort the list by function name, and the second call will print out the statistics. The following are some interesting calls to experiment with:

p.sort\_stats(SortKey.CUMULATIVE).print\_stats(10)

This sorts the profile by cumulative time in a function, and then only prints the ten most significant lines. If you want to understand what algorithms are taking time, the above line is what you would use.

If you were looking to see what functions were looping a lot, and taking a lot of time, you would do:

p.sort\_stats(SortKey.TIME).print\_stats(10)

to sort according to time spent within each function, and then print the statistics for the top ten functions.

You might also try:

p.sort\_stats(SortKey.FILENAME).print\_stats('\_\_init\_\_')

This will sort all the statistics by file name, and then print out statistics for only the class init methods (since they are spelled with `__init__` in them). As one final example, you could try:

p.sort\_stats(SortKey.TIME, SortKey.CUMULATIVE).print\_stats(.5, 'init')

This line sorts statistics with a primary key of time, and a secondary key of cumulative time, and then prints out some of the statistics. To be specific, the list is first culled down to 50% (re: `.5`) of its original size, then only lines containing `init` are maintained, and that sub-sub-list is printed.

If you wondered what functions called the above functions, you could now (`p` is still sorted according to the last criteria) do:

p.print\_callers(.5, 'init')

and you would get a list of callers for each of the listed functions.

If you want more functionality, you're going to have to read the manual, or guess what the following functions do:

p.print\_callees()
p.add('restats')

Invoked as a script, the [`pstats`](#module-pstats "pstats: Statistics object for use with the profiler.") module is a statistics browser for reading and examining profile dumps. It has a simple line-oriented interface (implemented using [`cmd`](https://docs.python.org/zh-cn/3/library/cmd.html#module-cmd "cmd: Build line-oriented command interpreters.")) and interactive help.

## [`profile`](#module-profile "profile: Python source profiler.") and `cProfile` Module Reference[¶](#module-cProfile "Link to this heading")

Both the [`profile`](#module-profile "profile: Python source profiler.") and `cProfile` modules provide the following functions:

profile.run(_command_, _filename\=None_, _sort\=\-1_)[¶](#profile.run "Link to this definition")

此函数接受一个可被传递给 [`exec()`](https://docs.python.org/zh-cn/3/builtins/functions.html#exec "exec") 函数的单独参数，以及一个可选的文件名。在所有情况下这个例程都会执行:

exec(command, \_\_main\_\_.\_\_dict\_\_, \_\_main\_\_.\_\_dict\_\_)

并收集执行过程中的性能分析统计数据。如果未提供文件名，则此函数会自动创建一个 [`Stats`](#pstats.Stats "pstats.Stats") 实例并打印一个简单的性能分析报告。如果指定了 sort 值，则它会被传递给这个 `Stats` 实例以控制结果的排序方式。

profile.runctx(_command_, _globals_, _locals_, _filename\=None_, _sort\=\-1_)[¶](#profile.runctx "Link to this definition")

此函数类似于 [`run()`](#profile.run "profile.run")，带有为 _command_ 字符串提供 globals 和 locals 映射对象的附加参数。这个例程会执行:

exec(command, globals, locals)

并像在上述的 [`run()`](#profile.run "profile.run") 函数中一样收集性能分析数据。

_class_ profile.Profile(_timer\=None_, _timeunit\=0.0_, _subcalls\=True_, _builtins\=True_)[¶](#profile.Profile "Link to this definition")

This class is normally only used if more precise control over profiling is needed than what the `cProfile.run()` function provides.

可以通过 _timer_ 参数提供一个自定义计时器来测量代码运行花费了多长时间。它必须是一个返回代表当前时间的单个数字的函数。如果该数字为整数，则 _timeunit_ 指定一个表示每个时间单位持续时间的乘数。例如，如果定时器返回以千秒为计量单位的时间值，则时间单位将为 `.001`。

直接使用 [`Profile`](#profile.Profile "profile.Profile") 类将允许格式化性能分析结果而无需将性能分析数据写入到文件:

import cProfile, pstats, io
from pstats import SortKey
pr \= cProfile.Profile()
pr.enable()
\# ... do something ...
pr.disable()
s \= io.StringIO()
sortby \= SortKey.CUMULATIVE
ps \= pstats.Stats(pr, stream\=s).sort\_stats(sortby)
ps.print\_stats()
print(s.getvalue())

The `Profile` class can also be used as a context manager (supported only in `cProfile` module. see [Context Manager Types](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#typecontextmanager)):

import cProfile

with cProfile.Profile() as pr:
    \# ... do something ...

    pr.print\_stats()

在 3.8 版本发生变更: 添加了上下文管理器支持。

enable()[¶](#profile.Profile.enable "Link to this definition")

Start collecting profiling data. Only in `cProfile`.

disable()[¶](#profile.Profile.disable "Link to this definition")

Stop collecting profiling data. Only in `cProfile`.

create\_stats()[¶](#profile.Profile.create_stats "Link to this definition")

停止收集分析数据，并在内部将结果记录为当前 profile。

print\_stats(_sort\=\-1_)[¶](#profile.Profile.print_stats "Link to this definition")

根据当前性能分析数据创建一个 [`Stats`](#pstats.Stats "pstats.Stats") 对象并将结果打印到 stdout。

The _sort_ parameter specifies the sorting order of the displayed statistics. It accepts a single key or a tuple of keys to enable multi-level sorting, as in [`Stats.sort_stats`](#pstats.Stats.sort_stats "pstats.Stats.sort_stats").

Added in version 3.13: 现在 [`print_stats()`](#profile.Profile.print_stats "profile.Profile.print_stats") 可接受一个由键组成的元组。

dump\_stats(_filename_)[¶](#profile.Profile.dump_stats "Link to this definition")

将当前 profile 的结果写入 _filename_ 。

run(_cmd_)[¶](#profile.Profile.run "Link to this definition")

通过 [`exec()`](https://docs.python.org/zh-cn/3/builtins/functions.html#exec "exec") 对该命令进行性能分析。

runctx(_cmd_, _globals_, _locals_)[¶](#profile.Profile.runctx "Link to this definition")

通过 [`exec()`](https://docs.python.org/zh-cn/3/builtins/functions.html#exec "exec") 并附带指定的全局和局部环境对该命令进行性能分析。

runcall(_func_, _/_, _\*args_, _\*\*kwargs_)[¶](#profile.Profile.runcall "Link to this definition")

对 `func(*args, **kwargs)` 进行性能分析

请注意性能分析只有在被调用的命令/函数确实能返回时才可用。如果解释器被终结（例如在被调用的命令/函数执行期间通过 [`sys.exit()`](https://docs.python.org/zh-cn/3/library/sys.html#sys.exit "sys.exit") 调用）则将不会打印性能分析结果。

## The `Stats` Class[¶](#the-stats-class "Link to this heading")

Analysis of the profiler data is done using the [`Stats`](#pstats.Stats "pstats.Stats") class.

_class_ pstats.Stats(_\*filenames or profile_, _stream=sys.stdout_)[¶](#pstats.Stats "Link to this definition")

This class constructor creates an instance of a "statistics object" from a _filename_ (or list of filenames) or from a `Profile` instance. Output will be printed to the stream specified by _stream_.

The file selected by the above constructor must have been created by the corresponding version of [`profile`](#module-profile "profile: Python source profiler.") or [`cProfile`](#module-cProfile "cProfile"). To be specific, there is _no_ file compatibility guaranteed with future versions of this profiler, and there is no compatibility with files produced by other profilers, or the same profiler run on a different operating system. If several files are provided, all the statistics for identical functions will be coalesced, so that an overall view of several processes can be considered in a single report. If additional files need to be combined with data in an existing [`Stats`](#pstats.Stats "pstats.Stats") object, the [`add()`](#pstats.Stats.add "pstats.Stats.add") method can be used.

Instead of reading the profile data from a file, a `cProfile.Profile` or [`profile.Profile`](#profile.Profile "profile.Profile") object can be used as the profile data source.

`Stats` objects have the following methods:

strip\_dirs()[¶](#pstats.Stats.strip_dirs "Link to this definition")

This method for the `Stats` class removes all leading path information from file names. It is very useful in reducing the size of the printout to fit within (close to) 80 columns. This method modifies the object, and the stripped information is lost. After performing a strip operation, the object is considered to have its entries in a "random" order, as it was just after object initialization and loading. If [`strip_dirs()`](#pstats.Stats.strip_dirs "pstats.Stats.strip_dirs") causes two function names to be indistinguishable (they are on the same line of the same filename, and have the same function name), then the statistics for these two entries are accumulated into a single entry.

add(_\*filenames_)[¶](#pstats.Stats.add "Link to this definition")

This method of the `Stats` class accumulates additional profiling information into the current profiling object. Its arguments should refer to filenames created by the corresponding version of [`profile.run()`](#profile.run "profile.run") or `cProfile.run()`. Statistics for identically named (re: file, line, name) functions are automatically accumulated into single function statistics.

dump\_stats(_filename_)[¶](#pstats.Stats.dump_stats "Link to this definition")

Save the data loaded into the `Stats` object to a file named _filename_. The file is created if it does not exist, and is overwritten if it already exists. This is equivalent to the method of the same name on the [`profile.Profile`](#profile.Profile "profile.Profile") and `cProfile.Profile` classes.

sort\_stats(_\*keys_)[¶](#pstats.Stats.sort_stats "Link to this definition")

This method modifies the `Stats` object by sorting it according to the supplied criteria. The argument can be either a string or a SortKey enum identifying the basis of a sort (example: `'time'`, `'name'`, `SortKey.TIME` or `SortKey.NAME`). The SortKey enums argument have advantage over the string argument in that it is more robust and less error prone.

When more than one key is provided, then additional keys are used as secondary criteria when there is equality in all keys selected before them. For example, `sort_stats(SortKey.NAME, SortKey.FILE)` will sort all the entries according to their function name, and resolve all ties (identical function names) by sorting by file name.

For the string argument, abbreviations can be used for any key names, as long as the abbreviation is unambiguous.

The following are the valid string and SortKey:

| 
Valid String Arg

 | 

Valid enum Arg

 | 

Meaning

 |
| --- | --- | --- |
| 

`'calls'`

 | 

SortKey.CALLS

 | 

call count

 |
| 

`'cumulative'`

 | 

SortKey.CUMULATIVE

 | 

cumulative time

 |
| 

`'cumtime'`

 | 

N/A

 | 

cumulative time

 |
| 

`'file'`

 | 

N/A

 | 

file name

 |
| 

`'filename'`

 | 

SortKey.FILENAME

 | 

file name

 |
| 

`'module'`

 | 

N/A

 | 

file name

 |
| 

`'ncalls'`

 | 

N/A

 | 

call count

 |
| 

`'pcalls'`

 | 

SortKey.PCALLS

 | 

primitive call count

 |
| 

`'line'`

 | 

SortKey.LINE

 | 

line number

 |
| 

`'name'`

 | 

SortKey.NAME

 | 

function name

 |
| 

`'nfl'`

 | 

SortKey.NFL

 | 

name/file/line

 |
| 

`'stdname'`

 | 

SortKey.STDNAME

 | 

standard name

 |
| 

`'time'`

 | 

SortKey.TIME

 | 

internal time

 |
| 

`'tottime'`

 | 

N/A

 | 

internal time

 |

Note that all sorts on statistics are in descending order (placing most time consuming items first), where as name, file, and line number searches are in ascending order (alphabetical). The subtle distinction between `SortKey.NFL` and `SortKey.STDNAME` is that the standard name is a sort of the name as printed, which means that the embedded line numbers get compared in an odd way. For example, lines 3, 20, and 40 would (if the file names were the same) appear in the string order 20, 3 and 40. In contrast, `SortKey.NFL` does a numeric compare of the line numbers. In fact, `sort_stats(SortKey.NFL)` is the same as `sort_stats(SortKey.NAME, SortKey.FILENAME, SortKey.LINE)`.

For backward-compatibility reasons, the numeric arguments `-1`, `0`, `1`, and `2` are permitted. They are interpreted as `'stdname'`, `'calls'`, `'time'`, and `'cumulative'` respectively. If this old style format (numeric) is used, only one sort key (the numeric key) will be used, and additional arguments will be silently ignored.

Added in version 3.7: Added the SortKey enum.

reverse\_order()[¶](#pstats.Stats.reverse_order "Link to this definition")

This method for the `Stats` class reverses the ordering of the basic list within the object. Note that by default ascending vs descending order is properly selected based on the sort key of choice.

print\_stats(_\*restrictions_)[¶](#pstats.Stats.print_stats "Link to this definition")

This method for the `Stats` class prints out a report as described in the [`profile.run()`](#profile.run "profile.run") definition.

The order of the printing is based on the last [`sort_stats()`](#pstats.Stats.sort_stats "pstats.Stats.sort_stats") operation done on the object (subject to caveats in [`add()`](#pstats.Stats.add "pstats.Stats.add") and [`strip_dirs()`](#pstats.Stats.strip_dirs "pstats.Stats.strip_dirs")).

The arguments provided (if any) can be used to limit the list down to the significant entries. Initially, the list is taken to be the complete set of profiled functions. Each restriction is either an integer (to select a count of lines), or a decimal fraction between 0.0 and 1.0 inclusive (to select a percentage of lines), or a string that will be interpreted as a regular expression (to pattern match the standard name that is printed). If several restrictions are provided, then they are applied sequentially. For example:

print\_stats(.1, 'foo:')

would first limit the printing to first 10% of list, and then only print functions that were part of filename `.*foo:`. In contrast, the command:

print\_stats('foo:', .1)

would limit the list to all functions having file names `.*foo:`, and then proceed to only print the first 10% of them.

print\_callers(_\*restrictions_)[¶](#pstats.Stats.print_callers "Link to this definition")

This method for the `Stats` class prints a list of all functions that called each function in the profiled database. The ordering is identical to that provided by [`print_stats()`](#pstats.Stats.print_stats "pstats.Stats.print_stats"), and the definition of the restricting argument is also identical. Each caller is reported on its own line. The format differs slightly depending on the profiler that produced the stats:

-   With [`profile`](#module-profile "profile: Python source profiler."), a number is shown in parentheses after each caller to show how many times this specific call was made. For convenience, a second non-parenthesized number repeats the cumulative time spent in the function at the right.
    
-   With [`cProfile`](#module-cProfile "cProfile"), each caller is preceded by three numbers: the number of times this specific call was made, and the total and cumulative times spent in the current function while it was invoked by this specific caller.
    

print\_callees(_\*restrictions_)[¶](#pstats.Stats.print_callees "Link to this definition")

This method for the `Stats` class prints a list of all function that were called by the indicated function. Aside from this reversal of direction of calls (re: called vs was called by), the arguments and ordering are identical to the [`print_callers()`](#pstats.Stats.print_callers "pstats.Stats.print_callers") method.

get\_stats\_profile()[¶](#pstats.Stats.get_stats_profile "Link to this definition")

This method returns an instance of StatsProfile, which contains a mapping of function names to instances of FunctionProfile. Each FunctionProfile instance holds information related to the function's profile such as how long the function took to run, how many times it was called, etc...

Added in version 3.9: Added the following dataclasses: StatsProfile, FunctionProfile. Added the following function: get\_stats\_profile.

## What Is Deterministic Profiling?[¶](#what-is-deterministic-profiling "Link to this heading")

_Deterministic profiling_ is meant to reflect the fact that all _function call_, _function return_, and _exception_ events are monitored, and precise timings are made for the intervals between these events (during which time the user's code is executing). In contrast, _statistical profiling_ (which is not done by this module) randomly samples the effective instruction pointer, and deduces where time is being spent. The latter technique traditionally involves less overhead (as the code does not need to be instrumented), but provides only relative indications of where time is being spent.

在 Python 中，由于在执行过程中总有一个活动的解释器，因此执行确定性评测不需要插入指令的代码。Python 自动为每个事件提供一个 _钩子_ （可选回调）。此外，Python 的解释特性往往会给执行增加太多开销，以至于在典型的应用程序中，确定性分析往往只会增加很小的处理开销。结果是，确定性分析并没有那么代价高昂，但是它提供了有关 Python 程序执行的大量运行时统计信息。

调用计数统计信息可用于识别代码中的错误（意外计数），并识别可能的内联扩展点（高频调用）。内部时间统计可用于识别应仔细优化的 "热循环" 。累积时间统计可用于识别算法选择上的高级别错误。请注意，该分析器中对累积时间的异常处理，允许直接比较算法的递归实现与迭代实现的统计信息。

## 局限性[¶](#limitations "Link to this heading")

一个限制是关于时间信息的准确性。确定性性能分析存在一个涉及精度的基本问题。最明显的限制是，底层的 “时钟” 周期大约为 0.001 秒（通常）。因此，没有什么测量会比底层时钟更精确。如果进行了足够的测量，那么 “误差” 将趋于平均。不幸的是，消除第一个误差会引入第二个误差来源。

第二个问题是，从调度事件到分析器调用获取时间函数实际 _获取_ 时钟状态，这需要 "一段时间" 。类似地，从获取时钟值（然后保存）开始，直到再次执行用户代码为止，退出分析器事件句柄时也存在一定的延迟。因此，多次调用单个函数或调用多个函数通常会累积此错误。尽管这种方式的误差通常小于时钟的精度（小于一个时钟周期），但它 _可以_ 累积并变得非常可观。

The problem is more important with [`profile`](#module-profile "profile: Python source profiler.") than with the lower-overhead [`cProfile`](#module-cProfile "cProfile"). For this reason, `profile` provides a means of calibrating itself for a given platform so that this error can be probabilistically (on the average) removed. After the profiler is calibrated, it will be more accurate (in a least square sense), but it will sometimes produce negative numbers (when call counts are exceptionally low, and the gods of probability work against you :-). ) Do _not_ be alarmed by negative numbers in the profile. They should _only_ appear if you have calibrated your profiler, and the results are actually better than without calibration.

## 校准[¶](#calibration "Link to this heading")

The profiler of the [`profile`](#module-profile "profile: Python source profiler.") module subtracts a constant from each event handling time to compensate for the overhead of calling the time function, and socking away the results. By default, the constant is 0. The following procedure can be used to obtain a better constant for a given platform (see [局限性](#profile-limitations)).

import profile
pr \= profile.Profile()
for i in range(5):
    print(pr.calibrate(10000))

此方法将执行由参数所给定次数的 Python 调用，在性能分析器之下直接和再次地执行，并对两次执行计时。 它将随后计算每个性能分析器事件的隐藏开销，并将其以浮点数的形式返回。例如，在一台运行 macOS 的 1.8Ghz Intel Core i5 上，使用 Python 的 time.process\_time() 作为计时器，魔数大约为 4.04e-6。

此操作的目标是获得一个相当稳定的结果。如果你的计算机 _非常_ 快速，或者你的计时器函数的分辨率很差，你可能必须传入 100000，甚至 1000000，才能得到稳定的结果。

当你有一个一致的答案时，有三种方法可以使用:

import profile

\# 1. 将计算出的偏差应用于此后创建的所有 Profile 实例。
profile.Profile.bias \= your\_computed\_bias

\# 2. 将计算出的偏差应用于特定的 Profile 实例。
pr \= profile.Profile()
pr.bias \= your\_computed\_bias

\# 3. 在实例构造函数中指定计算出的偏差。
pr \= profile.Profile(bias\=your\_computed\_bias)

如果你可以选择，那么选择更小的常量会更好，这样你的结果将“更不容易”在性能分析统计中显示负值。

## 使用自定义计时器[¶](#using-a-custom-timer "Link to this heading")

如果你想要改变当前时间的确定方式（例如，强制使用时钟时间或进程持续时间），请向 `Profile` 类构造器传入你想要的计时函数:

pr \= profile.Profile(your\_time\_func)

The resulting profiler will then call `your_time_func`. Depending on whether you are using [`profile.Profile`](#profile.Profile "profile.Profile") or `cProfile.Profile`, `your_time_func`'s return value will be interpreted differently:

[`profile.Profile`](#profile.Profile "profile.Profile")

`your_time_func` 应当返回一个数字，或一个总和为当前时间的数字列表（如同 [`os.times()`](https://docs.python.org/zh-cn/3/library/os.html#os.times "os.times") 所返回的内容）。 如果该函数返回一个数字，或所返回的数字列表长度为 2，则你将得到一个特别快速的调度例程版本。

请注意你应当为你选择的计时器函数校准性能分析器类 (参见 [校准](#profile-calibration))。 对于大多数机器来说，一个返回长整数值的计时器在性能分析期间将提供在低开销方面的最佳结果。 ([`os.times()`](https://docs.python.org/zh-cn/3/library/os.html#os.times "os.times") 是 _相当_ 糟糕的，因为它返回一个浮点数值的元组)。 如果你想以最干净的方式替换一个更好的计时器，请派生一个类并硬连线一个能最佳地处理计时器调用的替换调度方法，并使用适当的校准常量。

`cProfile.Profile`

`your_time_func` 应当返回一个数字。如果它返回整数，你还可以通过第二个参数指定一个单位时间的实际持续长度来唤起类构造器。 举例来说，如果 `your_integer_time_func` 返回以千秒为单位的时间，则你应当以如下方式构造 `Profile` 实例:

pr \= cProfile.Profile(your\_integer\_time\_func, 0.001)

As the `cProfile.Profile` class cannot be calibrated, custom timer functions should be used with care and should be as fast as possible. For the best results with a custom timer, it might be necessary to hard-code it in the C source of the internal `_lsprof` module.

Python 3.3 在 [`time`](https://docs.python.org/zh-cn/3/library/time.html#module-time "time: Time access and conversions.") 中添加了几个可被用来精确测量进程或时钟时间的新函数。例如，参见 [`time.perf_counter()`](https://docs.python.org/zh-cn/3/library/time.html#time.perf_counter "time.perf_counter").
