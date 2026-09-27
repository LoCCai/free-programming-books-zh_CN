* * *

该模块提供了各种与时间相关的函数。相关功能还可以参阅 [`datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#module-datetime "datetime: Basic date and time types.") 和 [`calendar`](https://docs.python.org/zh-cn/3/library/calendar.html#module-calendar "calendar: Functions for working with calendars, including some emulation of the Unix cal program.") 模块。

尽管所有平台皆可使用此模块，但模块内的函数并非所有平台都可用。此模块中定义的大多数函数的实现都是调用其所在平台的C语言库的同名函数。因为这些函数的语义可能因平台而异，所以使用时最好查阅对应平台的相关文档。

下面是一些术语和惯例的解释.

-   _epoch_ 是起始的时间点，即 `time.gmtime(0)` 的返回值。 这在所有平台上都是 1970-01-01, 00:00:00 (UTC)。
    

-   术语 _纪元秒数_ 是指自 epoch （纪元）时间点以来经过的总秒数，通常不包括 [闰秒](https://en.wikipedia.org/wiki/Leap_second)。 在所有符合 POSIX 标准的平台上，闰秒都不会记录在总秒数中。
    

-   此模块中的函数可能无法处理 [epoch](#epoch) 之前或遥远未来的日期和时间。 “遥远未来”的分界点是由 C 库确定的；对于 32 位系统，它通常是在 2038 年。
    

-   函数 [`strptime()`](#time.strptime "time.strptime") 在接收到 `%y` 格式代码时可以解析使用 2 位数表示的年份。当解析 2 位数年份时，函数会按照 POSIX 和 ISO C 标准进行年份转换：数值 69--99 被映射为 1969--1999；数值 0--68 被映射为 2000--2068。
    

-   UTC 即 [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)，它取代 [Greenwich Mean Time](https://en.wikipedia.org/wiki/Greenwich_Mean_Time) 即 GMT 作为国际时间计量的基准。 UTC 缩写并非笔误，而是遵循了更早的语言中立的时间标准命名方案如 UT0, UT1 和 UT2。
    

-   DST是夏令时（Daylight Saving Time）的缩写，在一年的某一段时间中将当地时间调整（通常）一小时。 DST的规则非常神奇（由当地法律确定），并且每年的起止时间都不同。C语言库中有一个表格，记录了各地的夏令时规则（实际上，为了灵活性，C语言库通常是从某个系统文件中读取这张表）。从这个角度而言，这张表是夏令时规则的唯一权威真理。
    
-   由于平台限制，各种实时函数的精度可能低于其值或参数所要求（或给定）的精度。例如，在大多数Unix系统上，时钟频率仅为每秒50或100次。
    
-   另一方面，[`time()`](#time.time "time.time") 和 [`sleep()`](#time.sleep "time.sleep") 的精度优于它们的 Unix 等价物：时间表示为浮点数，`time()` 返回可用的最准确时间 (如有可能将使用 Unix `gettimeofday()`)，并且 `sleep()` 将接受带有非零小数部分的时间 (如有可能将使用 Unix `select()` 来实现此功能)。
    
-   时间值由 [`gmtime()`](#time.gmtime "time.gmtime")，[`localtime()`](#time.localtime "time.localtime") 和 [`strptime()`](#time.strptime "time.strptime") 返回，并被 [`asctime()`](#time.asctime "time.asctime")， [`mktime()`](#time.mktime "time.mktime") 和 [`strftime()`](#time.strftime "time.strftime") 接受，是一个 9 个整数的序列。 `gmtime()`， `localtime()` 和 `strptime()` 的返回值还提供各个字段的属性名称。
    
    请参阅 [`struct_time`](#time.struct_time "time.struct_time") 以获取这些对象的描述。
    
    在 3.3 版本发生变更: 当平台支持相应的 `struct tm` 成员时 [`struct_time`](#time.struct_time "time.struct_time") 类型将被扩展以提供 [`tm_gmtoff`](#time.struct_time.tm_gmtoff "time.struct_time.tm_gmtoff") 和 [`tm_zone`](#time.struct_time.tm_zone "time.struct_time.tm_zone") 属性。
    
    在 3.6 版本发生变更: [`struct_time`](#time.struct_time "time.struct_time") 的属性 [`tm_gmtoff`](#time.struct_time.tm_gmtoff "time.struct_time.tm_gmtoff") 和 [`tm_zone`](#time.struct_time.tm_zone "time.struct_time.tm_zone") 现在可在所有平台上使用。
    
-   使用以下函数在时间表示之间进行转换：
    
    | 
    从
    
     | 
    
    到
    
     | 
    
    使用
    
     |
    | --- | --- | --- |
    | 
    
    自纪元以来的秒数
    
     | 
    
    UTC 的 [`struct_time`](#time.struct_time "time.struct_time")
    
     | 
    
    [`gmtime()`](#time.gmtime "time.gmtime")
    
     |
    | 
    
    自纪元以来的秒数
    
     | 
    
    本地时间的 [`struct_time`](#time.struct_time "time.struct_time")
    
     | 
    
    [`localtime()`](#time.localtime "time.localtime")
    
     |
    | 
    
    UTC 的 [`struct_time`](#time.struct_time "time.struct_time")
    
     | 
    
    自纪元以来的秒数
    
     | 
    
    [`calendar.timegm()`](https://docs.python.org/zh-cn/3/library/calendar.html#calendar.timegm "calendar.timegm")
    
     |
    | 
    
    本地时间的 [`struct_time`](#time.struct_time "time.struct_time")
    
     | 
    
    自纪元以来的秒数
    
     | 
    
    [`mktime()`](#time.mktime "time.mktime")
    
     |
    

## 函数[¶](#functions "Link to this heading")

time.asctime(\[_time\_tuple_\])[¶](#time.asctime "Link to this definition")

Convert a tuple or [`struct_time`](#time.struct_time "time.struct_time") representing a time as returned by [`gmtime()`](#time.gmtime "time.gmtime") or [`localtime()`](#time.localtime "time.localtime") to a string of the following form: `'Sun Jun 20 23:21:05 1993'`. The day field is two characters long and is space padded if the day is a single digit, for example: `'Wed Jun  9 04:26:40 1993'`.

If _time\_tuple_ is not provided, the current time as returned by [`localtime()`](#time.localtime "time.localtime") is used. Locale information is not used by [`asctime()`](#time.asctime "time.asctime").

备注

与同名的C函数不同， [`asctime()`](#time.asctime "time.asctime") 不添加尾随换行符。

time.pthread\_getcpuclockid(_thread\_id_, _/_)[¶](#time.pthread_getcpuclockid "Link to this definition")

返回指定的 _thread\_id_ 的特定于线程的CPU时间时钟的 _clk\_id_ 。

使用 [`threading.Thread`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Thread "threading.Thread") 对象的 [`threading.get_ident()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.get_ident "threading.get_ident") 或 [`ident`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Thread.ident "threading.Thread.ident") 属性为 _thread\_id_ 获取合适的值。

警告

传递无效的或过期的 _thread\_id_ 可能会导致未定义的行为，例如段错误。

Added in version 3.7.

time.clock\_getres(_clk\_id_, _/_)[¶](#time.clock_getres "Link to this definition")

返回指定时钟 _clk\_id_ 的分辨率（精度）。有关 _clk\_id_ 的可接受值列表，请参阅 [Clock ID 常量](#time-clock-id-constants) 。

Added in version 3.3.

time.clock\_gettime(_clk\_id_, _/_) → [float](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")[¶](#time.clock_gettime "Link to this definition")

返回指定 _clk\_id_ 时钟的时间。有关 _clk\_id_ 的可接受值列表，请参阅 [Clock ID 常量](#time-clock-id-constants) 。

使用 [`clock_gettime_ns()`](#time.clock_gettime_ns "time.clock_gettime_ns") 以避免 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 类型导致的精度损失。

Added in version 3.3.

time.clock\_gettime\_ns(_clk\_id_, _/_) → [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")[¶](#time.clock_gettime_ns "Link to this definition")

与 [`clock_gettime()`](#time.clock_gettime "time.clock_gettime") 相似，但返回时间为纳秒。

Added in version 3.7.

time.clock\_settime(_clk\_id_, _time: [float](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")_, _/_)[¶](#time.clock_settime "Link to this definition")

设置指定 _clk\_id_ 时钟的时间。 目前， [`CLOCK_REALTIME`](#time.CLOCK_REALTIME "time.CLOCK_REALTIME") 是 _clk\_id_ 唯一可接受的值。

使用 [`clock_settime_ns()`](#time.clock_settime_ns "time.clock_settime_ns") 以避免 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 类型导致的精度损失。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): Unix, not Android, not iOS.

Added in version 3.3.

time.clock\_settime\_ns(_clk\_id_, _time: [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")_, _/_)[¶](#time.clock_settime_ns "Link to this definition")

与 [`clock_settime()`](#time.clock_settime "time.clock_settime") 相似，但设置时间为纳秒。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): Unix, not Android, not iOS.

Added in version 3.7.

time.ctime(_seconds\=None_, _/_)[¶](#time.ctime "Link to this definition")

Convert a time expressed in seconds since the [epoch](#epoch) to a string of a form: `'Sun Jun 20 23:21:05 1993'` representing local time. The day field is two characters long and is space padded if the day is a single digit, for example: `'Wed Jun  9 04:26:40 1993'`.

If _seconds_ is not provided or [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None"), the current time as returned by [`time()`](#time.time "time.time") is used. `ctime(seconds)` is equivalent to `asctime(localtime(seconds))`. Locale information is not used by `ctime()`.

time.get\_clock\_info(_name_, _/_)[¶](#time.get_clock_info "Link to this definition")

获取有关指定时钟的信息作为命名空间对象。 支持的时钟名称和读取其值的相应函数是：

-   `'monotonic'`: [`time.monotonic()`](#time.monotonic "time.monotonic")
    
-   `'perf_counter'`: [`time.perf_counter()`](#time.perf_counter "time.perf_counter")
    
-   `'process_time'`: [`time.process_time()`](#time.process_time "time.process_time")
    
-   `'thread_time'`: [`time.thread_time()`](#time.thread_time "time.thread_time")
    
-   `'time'`: [`time.time()`](#time.time "time.time")
    

结果具有以下属性：

-   _adjustable_: 如果时钟可被设为时间向前跳或向后退则为 `True`，否则为 `False`。 不是指渐进式 NTP 速率调整。
    
-   _implementation_ ： 用于获取时钟值的基础C函数的名称。有关可能的值，请参阅 [Clock ID 常量](#time-clock-id-constants) 。
    
-   _monotonic_ ：如果时钟不能倒退，则为 `True` ，否则为 `False` 。
    
-   _resolution_ ： 以秒为单位的时钟分辨率（ [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") ）
    

Added in version 3.3.

time.gmtime(_seconds\=None_, _/_)[¶](#time.gmtime "Link to this definition")

Convert a time expressed in seconds since the [epoch](#epoch) to a [`struct_time`](#time.struct_time "time.struct_time") in UTC in which the dst flag is always zero. If _seconds_ is not provided or [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None"), the current time as returned by [`time()`](#time.time "time.time") is used. Fractions of a second are ignored. See above for a description of the `struct_time` object. See [`calendar.timegm()`](https://docs.python.org/zh-cn/3/library/calendar.html#calendar.timegm "calendar.timegm") for the inverse of this function.

time.localtime(_seconds\=None_, _/_)[¶](#time.localtime "Link to this definition")

Like [`gmtime()`](#time.gmtime "time.gmtime") but converts to local time. If _seconds_ is not provided or [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None"), the current time as returned by [`time()`](#time.time "time.time") is used. The dst flag is set to `1` when DST applies to the given time.

[`localtime()`](#time.localtime "time.localtime") 可能会引发 [`OverflowError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OverflowError "OverflowError") ，如果时间戳超出平台 C `localtime()` 或 `gmtime()` 函数支持的范围，并会在 `localtime()` 或 `gmtime()` 失败时引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 。这通常被限制在1970至2038年之间。

time.mktime(_time\_tuple_, _/_)[¶](#time.mktime "Link to this definition")

这是 [`localtime()`](#time.localtime "time.localtime") 的反函数。它的参数是 [`struct_time`](#time.struct_time "time.struct_time") 或者完整的 9 元组（因为需要 dst 标志；如果它是未知的则使用 `-1` 作为dst标志），它表示 _local_ 的时间，而不是 UTC 。它返回一个浮点数，以便与 [`time()`](#time.time "time.time") 兼容。如果输入值不能表示为有效时间，则 [`OverflowError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OverflowError "OverflowError") 或 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 将被引发（这取决于 Python 或底层 C 库是否捕获到无效值）。它可以生成时间的最早日期取决于平台。

time.monotonic() → [float](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")[¶](#time.monotonic "Link to this definition")

（以小数表示的秒为单位）返回一个单调时钟的值，即不能倒退的时钟。 该时钟不受系统时钟更新的影响。 返回值的参考点未被定义，因此只有两次调用之间的差值才是有效的。

时钟：

-   在 Windows 上，调用 `QueryPerformanceCounter()` 和 `QueryPerformanceFrequency()`。
    
-   在 macOS 上，调用 `mach_absolute_time()` 和 `mach_timebase_info()`。
    
-   在 HP-UX 上，调用 `gethrtime()`。
    
-   如果可能则调用 `clock_gettime(CLOCK_HIGHRES)`。
    
-   在其他情况下，调用 `clock_gettime(CLOCK_MONOTONIC)`。
    

使用 [`monotonic_ns()`](#time.monotonic_ns "time.monotonic_ns") 以避免 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 类型导致的精度损失。

Added in version 3.3.

在 3.5 版本发生变更: 该函数现在总是可用并且时钟在所有进程上保持一致。

在 3.10 版本发生变更: 在 macOS 上，现在时钟在所有进程上保持一致。

time.monotonic\_ns() → [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")[¶](#time.monotonic_ns "Link to this definition")

与 [`monotonic()`](#time.monotonic "time.monotonic") 相似，但是返回时间为纳秒数。

Added in version 3.7.

time.perf\_counter() → [float](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")[¶](#time.perf_counter "Link to this definition")

（以小数表示的秒为单位）返回一个性能计数器的值，即用于测量较短持续时间的具有最高有效精度的时钟。 它会包括睡眠状态所消耗的时间。时钟对于所有进程来说都是相同的。 返回值的参考点未被定义，因此只有两次调用之间的差值才是有效的。

在 CPython 中，使用与 [`time.monotonic()`](#time.monotonic "time.monotonic") 相同的单调时钟，即无法回退的时钟。

使用 [`perf_counter_ns()`](#time.perf_counter_ns "time.perf_counter_ns") 以避免 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 类型导致的精度损失。

Added in version 3.3.

在 3.10 版本发生变更: 在 Windows 上，现在时钟在所有进程上保持一致。

在 3.13 版本发生变更: 使用与 [`time.monotonic()`](#time.monotonic "time.monotonic") 相同的时钟。

time.perf\_counter\_ns() → [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")[¶](#time.perf_counter_ns "Link to this definition")

与 [`perf_counter()`](#time.perf_counter "time.perf_counter") 相似，但是返回时间为纳秒。

Added in version 3.7.

time.process\_time() → [float](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")[¶](#time.process_time "Link to this definition")

（以小数表示的秒为单位）返回当前进程的系统和用户 CPU 时间的总计值。 它不包括睡眠状态所消耗的时间。 根据定义它只作用于进程范围。 返回值的参考点未被定义，因此只有两次调用之间的差值才是有效的。

使用 [`process_time_ns()`](#time.process_time_ns "time.process_time_ns") 以避免 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 类型导致的精度损失。

Added in version 3.3.

time.process\_time\_ns() → [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")[¶](#time.process_time_ns "Link to this definition")

与 [`process_time()`](#time.process_time "time.process_time") 相似，但是返回时间为纳秒。

Added in version 3.7.

time.sleep(_seconds_, _/_)[¶](#time.sleep "Link to this definition")

调用方线程暂停执行给定的秒数。 该参数可以为浮点数以指定一个更精确的休眠时间。

如果休眠被信号打断并且信号处理器未引发异常，休眠将基于重新计算的时延重新开始。

暂停时间有可能比请求的要长出一段不确定的时间，因为会受系统中的其他活动排期影响。

Windows 实现

On Windows, if _seconds_ is zero, the thread relinquishes the remainder of its time slice to any other thread that is ready to run. If there are no other threads ready to run, the function returns immediately, and the thread continues execution. On Windows 10 and newer the implementation uses a [high-resolution timer](https://learn.microsoft.com/windows/win32/api/synchapi/nf-synchapi-createwaitabletimerexw) which provides resolution of 100 nanoseconds. If _seconds_ is zero, `Sleep(0)` is used.

Unix 实现

-   如果可能则使用 `clock_nanosleep()` (精度: 1 纳秒);
    
-   或者如果可能则使用 `nanosleep()` (精度: 1 纳秒);
    
-   或者使用 `select()` (精度: 1 微秒).
    

Raises an [auditing event](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `time.sleep` with argument `seconds`.

在 3.5 版本发生变更: The function now sleeps at least _seconds_ even if the sleep is interrupted by a signal, except if the signal handler raises an exception (see [**PEP 475**](https://peps.python.org/pep-0475/) for the rationale).

在 3.11 版本发生变更: 在 Unix 上，现在将在可能的情况下使用 `clock_nanosleep()` 和 `nanosleep()` 函数。 在 Windows 上，现在将使用可等待的计时器。

在 3.13 版本发生变更: 引发一个审计事件。

time.strftime(_format_\[, _time\_tuple_\])[¶](#time.strftime "Link to this definition")

Convert a tuple or [`struct_time`](#time.struct_time "time.struct_time") representing a time as returned by [`gmtime()`](#time.gmtime "time.gmtime") or [`localtime()`](#time.localtime "time.localtime") to a string as specified by the _format_ argument. If _time\_tuple_ is not provided, the current time as returned by `localtime()` is used. _format_ must be a string. [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") is raised if any field in _time\_tuple_ is outside of the allowed range.

0是时间元组中任何位置的合法参数；如果它通常是非法的，则该值被强制改为正确的值。

以下指令可以嵌入 _format_ 字符串中。它们显示时没有可选的字段宽度和精度规范，并被 [`strftime()`](#time.strftime "time.strftime") 结果中的指示字符替换：

| 
指令

 | 

含意

 | 

备注

 |
| --- | --- | --- |
| 

`%a`

 | 

本地化的缩写星期中每日的名称。

 |  |
| 

`%A`

 | 

本地化的星期中每日的完整名称。

 |  |
| 

`%b`

 | 

本地化的月缩写名称。

 |  |
| 

`%B`

 | 

本地化的月完整名称。

 |  |
| 

`%c`

 | 

本地化的适当日期和时间表示。

 |  |
| 

`%d`

 | 

十进制数 \[01,31\] 表示的月中日。

 |  |
| 

`%f`

 | 

十进制表示的微秒数

\[000000,999999\].





 | 

(1)

 |
| 

`%H`

 | 

十进制数 \[00,23\] 表示的小时（24小时制）。

 |  |
| 

`%I`

 | 

十进制数 \[01,12\] 表示的小时（12小时制）。

 |  |
| 

`%j`

 | 

十进制数 \[001,366\] 表示的年中日。

 |  |
| 

`%m`

 | 

十进制数 \[01,12\] 表示的月。

 |  |
| 

`%M`

 | 

十进制数 \[00,59\] 表示的分钟。

 |  |
| 

`%p`

 | 

本地化的 AM 或 PM 。

 | 

(2)

 |
| 

`%S`

 | 

十进制数 \[00,61\] 表示的秒。

 | 

(3)

 |
| 

`%U`

 | 

十进制数 \[00,53\] 表示的一年中的周数（星期日作为一周的第一天）。 在第一个星期日之前的新年中的所有日子都被认为是在第 0 周。

 | 

(4)

 |
| 

`%u`

 | 

以十进制数 \[1, 7\] 表示的日期值（星期一为 1；星期日为 7）。

 |  |
| 

`%w`

 | 

十进制数 \[0(星期日),6\] 表示的周中日。

 |  |
| 

`%W`

 | 

十进制数 \[00,53\] 表示的一年中的周数（星期一作为一周的第一天）。 在第一个星期一之前的新年中的所有日子被认为是在第 0 周。

 | 

(4)

 |
| 

`%x`

 | 

本地化的适当日期表示。

 |  |
| 

`%X`

 | 

本地化的适当时间表示。

 |  |
| 

`%y`

 | 

十进制数 \[00,99\] 表示的没有世纪的年份。

 |  |
| 

`%Y`

 | 

十进制数表示的带世纪的年份。

 |  |
| 

`%z`

 | 

时区偏移以格式 +HHMM 或 -HHMM 形式的 UTC/GMT 的正或负时差指示，其中H表示十进制小时数字，M表示小数分钟数字 \[-23:59, +23:59\] 。[\[1\]](#id4)

 |  |
| 

`%Z`

 | 

时区名称（如果不存在时区，则不包含字符）。已弃用。 [\[1\]](#id4)

 |  |
| 

`%G`

 | 

ISO 8601 年份（类似于 `%Y` 但遵循针对 ISO 8601 日历年份的规则）。 此年份从包含日历年份的第一个星期四的星期开始。

 |  |
| 

`%V`

 | 

ISO 8601 星期序号（以十进制数 \[01,53\] 表示）。 每年的第一个星期是包含该年的第一个星期四的星期。 每星期的第一天为星期一。

 |  |
| 

`%%`

 | 

字面的 `'%'` 字符。

 |  |

注释：

1.  `%f` 格式指示符只应用于 [`strptime()`](#time.strptime "time.strptime")，而不应用于 [`strftime()`](#time.strftime "time.strftime")。 不过，请参看 [`datetime.datetime.strptime()`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.datetime.strptime "datetime.datetime.strptime") 和 [`datetime.datetime.strftime()`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.datetime.strftime "datetime.datetime.strftime")，在这里 `%f` 格式指示符 [应用于微秒数](https://docs.python.org/zh-cn/3/library/datetime.html#format-codes)。
    
2.  当与 [`strptime()`](#time.strptime "time.strptime") 函数一起使用时，如果使用 `%I` 指令来解析小时， `%p` 指令只影响输出小时字段。
    

3.  范围真的是 `0` 到 `61` ；值 `60` 在表示 [leap seconds](https://en.wikipedia.org/wiki/Leap_second) 的时间戳中有效，并且由于历史原因支持值 `61` 。
    
4.  当与 [`strptime()`](#time.strptime "time.strptime") 函数一起使用时， `%U` 和 `%W` 仅用于指定星期几和年份的计算。
    

下面是一个示例，一个与 [**RFC 5322**](https://datatracker.ietf.org/doc/html/rfc5322.html) Internet 电子邮件标准的规定相兼容的日期格式 [\[1\]](#id4)

\>>> from time import gmtime, strftime
\>>> strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())
'Thu, 28 Jun 2001 14:17:15 +0000'

某些平台可能支持其他指令，但只有此处列出的指令具有 ANSI C 标准化的含义。要查看平台支持的完整格式代码集，请参阅 _[strftime(3)](https://manpages.debian.org/strftime\(3\))_ 文档。

在某些平台上，可选的字段宽度和精度规范可以按照以下顺序紧跟在指令的初始 `'%'` 之后；这也不可移植。字段宽度通常为2，除了 `%j` ，它是3。

time.strptime(_string_\[, _format_\])[¶](#time.strptime "Link to this definition")

根据格式解析表示时间的字符串。 返回值为一个被 [`gmtime()`](#time.gmtime "time.gmtime") 或 [`localtime()`](#time.localtime "time.localtime") 返回的 [`struct_time`](#time.struct_time "time.struct_time") 。

_format_ 参数使用与 [`strftime()`](#time.strftime "time.strftime") 相同的指令。 它默认为匹配 [`ctime()`](#time.ctime "time.ctime") 所返回的格式 `"%a %b %d %H:%M:%S %Y"`。 如果 _string_ 不能根据 _format_ 来解析，或者解析后它有多余的数据，则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。 当无法推断出更准确的值时，用于填充任何缺失数据的默认值是 `(1900, 1, 1, 0, 0, 0, 0, 1, -1)` 。 _string_ 和 _format_ 都必须为字符串。

例如:

\>>> import time
\>>> time.strptime("30 Nov 00", "%d %b %y")
time.struct\_time(tm\_year=2000, tm\_mon=11, tm\_mday=30, tm\_hour=0, tm\_min=0,
                 tm\_sec=0, tm\_wday=3, tm\_yday=335, tm\_isdst=-1)

支持 `%Z` 指令是基于 `tzname` 中包含的值以及 `daylight` 是否为真。因此，它是特定于平台的，除了识别始终已知的 UTC 和 GMT （并且被认为是非夏令时时区）。

仅支持文档中指定的指令。因为每个平台都实现了 `strftime()` ，它有时会提供比列出的指令更多的指令。但是 `strptime()` 独立于任何平台，因此不一定支持所有未记录为支持的可用指令。

_class_ time.struct\_time[¶](#time.struct_time "Link to this definition")

由 [`gmtime()`](#time.gmtime "time.gmtime") 、 [`localtime()`](#time.localtime "time.localtime") 和 [`strptime()`](#time.strptime "time.strptime") 返回的时间值序列的类型。它是一个带有 [named tuple](https://docs.python.org/zh-cn/3/glossary.html#term-named-tuple) 接口的对象：可以通过索引和属性名访问值。 存在以下值：

<table><tbody><tr><td><p>索引</p></td><td><p>属性</p></td><td><p>值</p></td></tr><tr><td><p>0</p></td><td><dl><dt id="time.struct_time.tm_year"><span><span>tm_year</span></span><a href="#time.struct_time.tm_year" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>（例如，1993）</p></td></tr><tr><td><p>1</p></td><td><dl><dt id="time.struct_time.tm_mon"><span><span>tm_mon</span></span><a href="#time.struct_time.tm_mon" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>range [1, 12]</p></td></tr><tr><td><p>2</p></td><td><dl><dt id="time.struct_time.tm_mday"><span><span>tm_mday</span></span><a href="#time.struct_time.tm_mday" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>range [1, 31]</p></td></tr><tr><td><p>3</p></td><td><dl><dt id="time.struct_time.tm_hour"><span><span>tm_hour</span></span><a href="#time.struct_time.tm_hour" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>range [0, 23]</p></td></tr><tr><td><p>4</p></td><td><dl><dt id="time.struct_time.tm_min"><span><span>tm_min</span></span><a href="#time.struct_time.tm_min" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>range [0, 59]</p></td></tr><tr><td><p>5</p></td><td><dl><dt id="time.struct_time.tm_sec"><span><span>tm_sec</span></span><a href="#time.struct_time.tm_sec" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>range [0, 61]；参见 <a href="#time.strftime" title="time.strftime"><code><span>strftime()</span></code></a> 中的 <a href="#leap-second"><span>注释 (2)</span></a></p></td></tr><tr><td><p>6</p></td><td><dl><dt id="time.struct_time.tm_wday"><span><span>tm_wday</span></span><a href="#time.struct_time.tm_wday" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>取值范围 [0, 6]；周一为 0</p></td></tr><tr><td><p>7</p></td><td><dl><dt id="time.struct_time.tm_yday"><span><span>tm_yday</span></span><a href="#time.struct_time.tm_yday" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>range [1, 366]</p></td></tr><tr><td><p>8</p></td><td><dl><dt id="time.struct_time.tm_isdst"><span><span>tm_isdst</span></span><a href="#time.struct_time.tm_isdst" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>0, 1 或 -1；如下所示</p></td></tr><tr><td><p>N/A</p></td><td><dl><dt id="time.struct_time.tm_zone"><span><span>tm_zone</span></span><a href="#time.struct_time.tm_zone" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>时区名称的缩写</p></td></tr><tr><td><p>N/A</p></td><td><dl><dt id="time.struct_time.tm_gmtoff"><span><span>tm_gmtoff</span></span><a href="#time.struct_time.tm_gmtoff" title="Link to this definition">¶</a></dt><dd></dd></dl></td><td><p>以秒为单位的UTC以东偏离</p></td></tr></tbody></table>

请注意，与C结构不同，月份值是 \[1,12\] 的范围，而不是 \[0,11\] 。

在调用 [`mktime()`](#time.mktime "time.mktime") 时， [`tm_isdst`](#time.struct_time.tm_isdst "time.struct_time.tm_isdst") 可以在夏令时生效时设置为1，而在夏令时不生效时设置为0。 值-1表示这是未知的，并且通常会导致填写正确的状态。

当一个长度不正确的元组被传递给期望 [`struct_time`](#time.struct_time "time.struct_time") 的函数，或者具有错误类型的元素时，会引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError") 。

time.time() → [float](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")[¶](#time.time "Link to this definition")

返回以浮点数表示的从 [epoch](#epoch) 开始的秒数形式的时间。 对 [leap seconds](https://en.wikipedia.org/wiki/Leap_second) 的处理取决于具体平台。 在 Windows 和大多数 Unix 系统中，闰秒不会被计入从 [epoch](#epoch) 开始的秒数形式的时间中。 这通常被称为 [Unix 时间](https://en.wikipedia.org/wiki/Unix_time)。

请注意，即使时间总是作为浮点数返回，但并非所有系统都提供高于1秒的精度。虽然此函数通常返回非递减值，但如果在两次调用之间设置了系统时钟，则它可以返回比先前调用更低的值。

由 [`time()`](#time.time "time.time") 返回的数字可以通过将其传递给 [`gmtime()`](#time.gmtime "time.gmtime") 函数转换为 UTC 中更常见的时间格式（即年、月、日、小时等），或者通过将它传递给 [`localtime()`](#time.localtime "time.localtime") 函数获得本地时间。在这两种情况下都返回一个 [`struct_time`](#time.struct_time "time.struct_time") 对象，日历日期的各分量可以从中作为属性来访问。

时钟：

-   在 Windows 上，调用 `GetSystemTimePreciseAsFileTime()`。
    
-   如果可能则调用 `clock_gettime(CLOCK_REALTIME)`。
    
-   在其他情况下，调用 `gettimeofday()`。
    

使用 [`time_ns()`](#time.time_ns "time.time_ns") 以避免 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 类型导致的精度损失。

在 3.13 版本发生变更: 在 Windows 上，调用 `GetSystemTimePreciseAsFileTime()` 而不是 `GetSystemTimeAsFileTime()`。

time.time\_ns() → [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")[¶](#time.time_ns "Link to this definition")

与 [`time()`](#time.time "time.time") 相似，但返回时间为用整数表示的自 [epoch](#epoch) 以来所经过的纳秒数。

Added in version 3.7.

time.thread\_time() → [float](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")[¶](#time.thread_time "Link to this definition")

（以小数表示的秒为单位）返回当前线程的系统和用户 CPU 时间的总计值。 它不包括睡眠状态所消耗的时间。 根据定义它只作用于线程范围。 返回值的参考点未被定义，因此只有两次调用之间的差值才是有效的。

使用 [`thread_time_ns()`](#time.thread_time_ns "time.thread_time_ns") 以避免 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 类型导致的精度损失。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): Linux, Unix, Windows.

支持 `CLOCK_THREAD_CPUTIME_ID` 的 Unix 系统。

Added in version 3.7.

time.thread\_time\_ns() → [int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")[¶](#time.thread_time_ns "Link to this definition")

与 [`thread_time()`](#time.thread_time "time.thread_time") 相似，但返回纳秒时间。

Added in version 3.7.

time.tzset()[¶](#time.tzset "Link to this definition")

重置库例程使用的时间转换规则。环境变量 `TZ` 指定如何完成。它还将设置变量 `tzname` （来自 `TZ` 环境变量）， `timezone` （UTC的西部非DST秒）， `altzone` （UTC以西的DST秒）和 `daylight` （如果此时区没有任何夏令时规则则为0，如果有夏令时适用的时间，无论过去、现在或未来，则为非零）。

备注

虽然在很多情况下，更改 `TZ` 环境变量而不调用 [`tzset()`](#time.tzset "time.tzset") 可能会影响函数的输出，例如 [`localtime()`](#time.localtime "time.localtime") ，不应该依赖此行为。

`TZ` 不应该包含空格。

`TZ` 环境变量的标准格式是（为了清晰起见，添加了空格）:

std offset \[dst \[offset \[,start\[/time\], end\[/time\]\]\]\]

其中各组件是：

`std` 和 `dst`

三个或更多字母数字，给出时区缩写。这些将传到 time.tzname

`offset`

偏移量的形式为： `± hh[:mm[:ss]]` 。这表示添加到达UTC的本地时间的值。如果前面有 '-' ，则时区位于本初子午线的东边；否则，在它是西边。如果dst之后没有偏移，则假设夏令时比标准时间提前一小时。

`start[/time], end[/time]`

指示何时更改为DST和从DST返回。开始日期和结束日期的格式为以下之一：

`J_n_`

Julian日 _n_ （1 <= _n_ <= 365）。闰日不计算在内，因此在所有年份中，2月28日是第59天，3月1日是第60天。

`_n_`

从零开始的Julian日（0 <= _n_ <= 365）。 闰日计入，可以引用2月29日。

`M_m_._n_._d_`

一年中 _m_ 月的第 _n_ 周（1 <= _n_ <= 5 ，1 <= _m_ <= 12 ，第 5 周表示 “可能在 _m_ 月第 4 周或第 5 周出现的最后第 _d_ 日”）的第 _d_ 天（0 <= _d_ <= 6）。 第 1 周是第 _d_ 天发生的第一周。 第 0 天是星期天。

`time` 的格式与 `offset` 的格式相同，但不允许使用前导符号（ '-' 或 '+' ）。如果没有给出时间，则默认值为02:00:00。

\>>> os.environ\['TZ'\] \= 'EST+05EDT,M4.1.0,M10.5.0'
\>>> time.tzset()
\>>> time.strftime('%X %x %Z')
'02:07:36 05/08/03 EDT'
\>>> os.environ\['TZ'\] \= 'AEST-10AEDT-11,M10.5.0,M3.5.0'
\>>> time.tzset()
\>>> time.strftime('%X %x %Z')
'16:08:12 05/08/03 AEST'

在许多Unix系统（包括 \*BSD ， Linux ， Solaris 和 Darwin 上），使用系统的区域信息（ _[tzfile(5)](https://manpages.debian.org/tzfile\(5\))_ ）数据库来指定时区规则会更方便。为此，将 `TZ` 环境变量设置为所需时区数据文件的路径，相对于系统 'zoneinfo' 时区数据库的根目录，通常位于 `/usr/share/zoneinfo` 。 例如，`'US/Eastern'` 、 `'Australia/Melbourne'` 、 `'Egypt'` 或 `'Europe/Amsterdam'`。

\>>> os.environ\['TZ'\] \= 'US/Eastern'
\>>> time.tzset()
\>>> time.tzname
('EST', 'EDT')
\>>> os.environ\['TZ'\] \= 'Egypt'
\>>> time.tzset()
\>>> time.tzname
('EET', 'EEST')

## Clock ID 常量[¶](#clock-id-constants "Link to this heading")

这些常量用作 [`clock_getres()`](#time.clock_getres "time.clock_getres") 和 [`clock_gettime()`](#time.clock_gettime "time.clock_gettime") 的参数。

time.CLOCK\_BOOTTIME[¶](#time.CLOCK_BOOTTIME "Link to this definition")

与 [`CLOCK_MONOTONIC`](#time.CLOCK_MONOTONIC "time.CLOCK_MONOTONIC") 相同，除了它还包括系统暂停的任何时间。

这允许应用程序获得一个暂停感知的单调时钟，而不必处理 [`CLOCK_REALTIME`](#time.CLOCK_REALTIME "time.CLOCK_REALTIME") 的复杂性，如果使用 `settimeofday()` 或类似的时间更改时间可能会有不连续性。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): Linux >= 2.6.39.

Added in version 3.7.

time.CLOCK\_HIGHRES[¶](#time.CLOCK_HIGHRES "Link to this definition")

Solaris OS 有一个 `CLOCK_HIGHRES` 计时器，试图使用最佳硬件源，并可能提供接近纳秒的分辨率。 `CLOCK_HIGHRES` 是不可调节的高分辨率时钟。

Added in version 3.3.

time.CLOCK\_MONOTONIC[¶](#time.CLOCK_MONOTONIC "Link to this definition")

无法设置的时钟，表示自某些未指定的起点以来的单调时间。

Added in version 3.3.

time.CLOCK\_MONOTONIC\_RAW[¶](#time.CLOCK_MONOTONIC_RAW "Link to this definition")

类似于 [`CLOCK_MONOTONIC`](#time.CLOCK_MONOTONIC "time.CLOCK_MONOTONIC") ，但可以访问不受NTP调整影响的原始硬件时间。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): Linux >= 2.6.28, macOS >= 10.12.

Added in version 3.3.

time.CLOCK\_MONOTONIC\_RAW\_APPROX[¶](#time.CLOCK_MONOTONIC_RAW_APPROX "Link to this definition")

类似于 [`CLOCK_MONOTONIC_RAW`](#time.CLOCK_MONOTONIC_RAW "time.CLOCK_MONOTONIC_RAW")，但在上下文切换时将读取由系统缓存的值因此会不够精确。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): macOS >= 10.12.

Added in version 3.13.

time.CLOCK\_PROCESS\_CPUTIME\_ID[¶](#time.CLOCK_PROCESS_CPUTIME_ID "Link to this definition")

来自CPU的高分辨率每进程计时器。

Added in version 3.3.

time.CLOCK\_PROF[¶](#time.CLOCK_PROF "Link to this definition")

来自CPU的高分辨率每进程计时器。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): FreeBSD, NetBSD >= 7, OpenBSD.

Added in version 3.7.

time.CLOCK\_TAI[¶](#time.CLOCK_TAI "Link to this definition")

[国际原子时间](https://www.nist.gov/pml/time-and-frequency-division/how-utcnist-related-coordinated-universal-time-utc-international)

该系统必须有一个当前闰秒表以便能给出正确的回答。 PTP 或 NTP 软件可以用来维护闰秒表。

Added in version 3.9.

time.CLOCK\_THREAD\_CPUTIME\_ID[¶](#time.CLOCK_THREAD_CPUTIME_ID "Link to this definition")

特定于线程的CPU时钟。

Added in version 3.3.

time.CLOCK\_UPTIME[¶](#time.CLOCK_UPTIME "Link to this definition")

该时间的绝对值是系统运行且未暂停的时间，提供准确的正常运行时间测量，包括绝对值和间隔值。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): FreeBSD, OpenBSD >= 5.5.

Added in version 3.7.

time.CLOCK\_UPTIME\_RAW[¶](#time.CLOCK_UPTIME_RAW "Link to this definition")

单调递增的时钟，记录从一个任意起点开始的时间，不受频率或时间调整的影响，并且当系统休眠时将不会递增。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): macOS >= 10.12.

Added in version 3.8.

time.CLOCK\_UPTIME\_RAW\_APPROX[¶](#time.CLOCK_UPTIME_RAW_APPROX "Link to this definition")

类似于 [`CLOCK_UPTIME_RAW`](#time.CLOCK_UPTIME_RAW "time.CLOCK_UPTIME_RAW")，但该值在上下文切换时将由系统缓存因此会不够精确。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): macOS >= 10.12.

Added in version 3.13.

以下常量是唯一可以发送到 [`clock_settime()`](#time.clock_settime "time.clock_settime") 的参数。

time.CLOCK\_REALTIME[¶](#time.CLOCK_REALTIME "Link to this definition")

实时时钟。 设置此时钟需要有适当的权限。 该时钟在所有进程上保持一致。

Added in version 3.3.

## 时区常量[¶](#timezone-constants "Link to this heading")

time.altzone[¶](#time.altzone "Link to this definition")

本地DST时区的偏移量，以UTC为单位的秒数，如果已定义。如果当地DST时区在UTC以东（如在西欧，包括英国），则是负数。 只有当 `daylight` 非零时才使用它。 见下面的注释。

time.daylight[¶](#time.daylight "Link to this definition")

如果定义了DST时区，则为非零。 见下面的注释。

time.timezone[¶](#time.timezone "Link to this definition")

本地（非DST）时区的偏移量，UTC以西的秒数（西欧大部分地区为负，美国为正，英国为零）。 见下面的注释。

time.tzname[¶](#time.tzname "Link to this definition")

两个字符串的元组：第一个是本地非DST时区的名称，第二个是本地DST时区的名称。 如果未定义DST时区，则不应使用第二个字符串。 见下面的注释。

备注

对于上述时区常量 ([`altzone`](#time.altzone "time.altzone"), [`daylight`](#time.daylight "time.daylight"), [`timezone`](#time.timezone "time.timezone") 和 [`tzname`](#time.tzname "time.tzname"))，该值由当模块加载或 [`tzset()`](#time.tzset "time.tzset") 最后一次被调用时生效的时区规则确定并且对于已过去的时间可能不正确。 建议使用来自 [`localtime()`](#time.localtime "time.localtime") 结果的 [`tm_gmtoff`](#time.struct_time.tm_gmtoff "time.struct_time.tm_gmtoff") 和 [`tm_zone`](#time.struct_time.tm_zone "time.struct_time.tm_zone") 来获取时区信息。

备注
