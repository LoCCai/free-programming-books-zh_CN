**源代码：** [Lib/calendar.py](https://github.com/python/cpython/tree/3.14/Lib/calendar.py)

* * *

这个模块让你可以输出像 Unix **cal** 那样的日历，它还提供了其它与日历相关的实用函数。 默认情况下，这些日历把星期一作为一周的第一天，星期天作为一周的最后一天（这是欧洲惯例）。可以使用 [`setfirstweekday()`](#calendar.setfirstweekday "calendar.setfirstweekday") 方法设置一周的第一天为星期天 (6) 或者其它任意一天。函数全部接收整数类型的参数用来指定日期。其它相关功能参见 [`datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#module-datetime "datetime: Basic date and time types.") 和 [`time`](https://docs.python.org/zh-cn/3/library/time.html#module-time "time: Time access and conversions.") 模块。

在这个模块中定义的函数和类都基于一个理想化的日历——向过去和未来两个方向无限扩展的现行公历。这与 Dershowitz 和 Reingold 的书“历法计算”中所有计算的基本日历 "proleptic Gregorian" 历的定义相符。0 和负数年份按照 ISO 8601 标准解释：0 年指公元前 1 年，-1 年指公元前 2 年，依此类推。

_class_ calendar.Calendar(_firstweekday\=0_)[¶](#calendar.Calendar "Link to this definition")

创建一个 [`Calendar`](#calendar.Calendar "calendar.Calendar") 对象。_firstweekday_ 是一个用来指定每星期第一天的整数。[`MONDAY`](#calendar.MONDAY "calendar.MONDAY") 是 `0` （默认值），[`SUNDAY`](#calendar.SUNDAY "calendar.SUNDAY") 是 `6`。

[`Calendar`](#calendar.Calendar "calendar.Calendar") 对象提供了一些可用于对日历数据进行格式化的准备的方法。这个类本身不执行任何格式化操作。 这部分任务应由子类来完成。

[`Calendar`](#calendar.Calendar "calendar.Calendar") 实例具有以下方法和属性：

firstweekday[¶](#calendar.Calendar.firstweekday "Link to this definition")

以整数 (0--6) 表示的每星期第一天。

该特征属性也可分别使用 [`setfirstweekday()`](#calendar.Calendar.setfirstweekday "calendar.Calendar.setfirstweekday") 和 [`getfirstweekday()`](#calendar.Calendar.getfirstweekday "calendar.Calendar.getfirstweekday") 来设置和读取。

getfirstweekday()[¶](#calendar.Calendar.getfirstweekday "Link to this definition")

返回一个 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 表示当前的每周第一天 (0--6)。

相当于读取 [`firstweekday`](#calendar.Calendar.firstweekday "calendar.Calendar.firstweekday") 特征属性。

setfirstweekday(_firstweekday_)[¶](#calendar.Calendar.setfirstweekday "Link to this definition")

将每周第一天设为 _firstweekday_，作为 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 传入 (0--6)。

相当于设置 [`firstweekday`](#calendar.Calendar.firstweekday "calendar.Calendar.firstweekday") 特征属性。

iterweekdays()[¶](#calendar.Calendar.iterweekdays "Link to this definition")

返回用于表示每周中的日序号的迭代器。 迭代器的第一个值将与 [`firstweekday`](#calendar.Calendar.firstweekday "calendar.Calendar.firstweekday") 属性的值相同。

itermonthdates(_year_, _month_)[¶](#calendar.Calendar.itermonthdates "Link to this definition")

为 _year_ 年 _month_ 月 (1-12) 返回一个迭代器。这个迭代器返回当月的所有日期（使用 [`datetime.date`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.date "datetime.date") 对象），日期包含了本月头尾用于组成完整一周的日期。

itermonthdays(_year_, _month_)[¶](#calendar.Calendar.itermonthdays "Link to this definition")

为 _year_ 年 _month_ 月返回一个与 [`itermonthdates()`](#calendar.Calendar.itermonthdates "calendar.Calendar.itermonthdates") 类似的迭代器，但不会受 [`datetime.date`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.date "datetime.date") 范围的限制。返回的日期只是月内日期序号。对于不在当月的日期，返回数字 `0`。

itermonthdays2(_year_, _month_)[¶](#calendar.Calendar.itermonthdays2 "Link to this definition")

返回 _year_ 年 _month_ 月中与 [`itermonthdates()`](#calendar.Calendar.itermonthdates "calendar.Calendar.itermonthdates") 类似的日期值的迭代器，但不会受 [`datetime.date`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.date "datetime.date") 范围的限制。 返回的日期值将是由本月的日序号和本周的日序号组成的元组。

itermonthdays3(_year_, _month_)[¶](#calendar.Calendar.itermonthdays3 "Link to this definition")

为 _year_ 年 _month_ 月返回一个与 [`itermonthdates()`](#calendar.Calendar.itermonthdates "calendar.Calendar.itermonthdates") 类似的迭代器，但不会受 [`datetime.date`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.date "datetime.date") 范围的限制。迭代器的元素为一个由年、月、日组成的元组。

Added in version 3.7.

itermonthdays4(_year_, _month_)[¶](#calendar.Calendar.itermonthdays4 "Link to this definition")

为 _year_ 年 _month_ 月返回一个与 [`itermonthdates()`](#calendar.Calendar.itermonthdates "calendar.Calendar.itermonthdates") 类似的迭代器，但不会受 [`datetime.date`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.date "datetime.date") 范围的限制。迭代器的元素为一个由年、月、日和代表星期几的数字组成的元组。

Added in version 3.7.

monthdatescalendar(_year_, _month_)[¶](#calendar.Calendar.monthdatescalendar "Link to this definition")

返回 _year_ 年 _month_ 月的周组成的列表。列表中的每一个周是由七个 [`datetime.date`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.date "datetime.date") 对象组成的列表。

monthdays2calendar(_year_, _month_)[¶](#calendar.Calendar.monthdays2calendar "Link to this definition")

返回 _year_ 年 _month_ 月的周组成的列表。列表中的每一个周是七个由日数和代表星期几的数字组成的元组的列表。

monthdayscalendar(_year_, _month_)[¶](#calendar.Calendar.monthdayscalendar "Link to this definition")

返回 _year_ 年 _month_ 月的周组成的列表。列表中的每一个周是由七个日数组成的列表。

yeardatescalendar(_year_, _width\=3_)[¶](#calendar.Calendar.yeardatescalendar "Link to this definition")

返回可以用来格式化的指定年月的数据。返回的值是一个列表，列表是月份组成的行。每一行包含了最多 _width_ 个月(默认为3)。每个月包含了4到6周，每周包含1--7天。每一天使用 [`datetime.date`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.date "datetime.date") 对象。

yeardays2calendar(_year_, _width\=3_)[¶](#calendar.Calendar.yeardays2calendar "Link to this definition")

返回可以用来格式化的指定年月的数据(与 [`yeardatescalendar()`](#calendar.Calendar.yeardatescalendar "calendar.Calendar.yeardatescalendar") 类似)。周列表的元素是由表示日期的数字和表示星期几的数字组成的元组。不在这个月的日子为0。

yeardayscalendar(_year_, _width\=3_)[¶](#calendar.Calendar.yeardayscalendar "Link to this definition")

返回可以用来格式化的指定年月的数据(与 [`yeardatescalendar()`](#calendar.Calendar.yeardatescalendar "calendar.Calendar.yeardatescalendar") 类似)。周列表的元素是表示日期的数字。不在这个月的日子为0。

_class_ calendar.TextCalendar(_firstweekday\=0_)[¶](#calendar.TextCalendar "Link to this definition")

可以使用这个类生成纯文本日历。

[`TextCalendar`](#calendar.TextCalendar "calendar.TextCalendar") 实例有以下方法：

formatday(_theday_, _weekday_, _width_)[¶](#calendar.TextCalendar.formatday "Link to this definition")

返回一个代表格式化为指定 _width_ 的单独日期的字符串表示形式。 如果 _theday_ 为 `0`，则返回指定宽度的空格字符串，代表一个空日期。 _weekday_ 形参未被使用。

formatweek(_theweek_, _w\=0_)[¶](#calendar.TextCalendar.formatweek "Link to this definition")

返回以不带换行符的字符串表示的单个星期。 如果提供了 _w_，它将指定日期列的宽度，日期列将居中对齐。 具体内容还依赖于构造器或 [`setfirstweekday()`](#calendar.setfirstweekday "calendar.setfirstweekday") 方法指定每周的星期几为第一天。

formatweekday(_weekday_, _width_)[¶](#calendar.TextCalendar.formatweekday "Link to this definition")

返回一个代表单个周日期名称的格式化为 _width_ 所指定宽度的字符串。 _weekday_ 形参是表示某个周日期的整数，其中 `0` 为星期一而 `6` 为星期日。

返回一个包含周日期名称标题行的字符串，其中每一列格式化为 _width_ 所给定的宽度。 这些名称依赖于语言区域设置并将被填充至指定的宽度。

formatmonth(_theyear_, _themonth_, _w\=0_, _l\=0_)[¶](#calendar.TextCalendar.formatmonth "Link to this definition")

返回指定月的用多行字符串表示的月历。_w_ 为日期列的宽度，日期列居中打印。_l_ 指定了周与周之间的行距。返回的日历还依赖于构造器或者 [`setfirstweekday()`](#calendar.setfirstweekday "calendar.setfirstweekday") 方法指定的每周的第一天是哪一天。

formatmonthname(_theyear_, _themonth_, _width\=0_, _withyear\=True_)[¶](#calendar.TextCalendar.formatmonthname "Link to this definition")

返回一个代表月份名称的在以 _width_ 指定的宽度内居中的字符串。 如果 _withyear_ 为 `True`，则会在输出中包括年份。 _theyear_ 和 _themonth_ 形参指定年份和月份以便其名称可以相应地被格式化。

prmonth(_theyear_, _themonth_, _w\=0_, _l\=0_)[¶](#calendar.TextCalendar.prmonth "Link to this definition")

调用 [`formatmonth()`](#calendar.TextCalendar.formatmonth "calendar.TextCalendar.formatmonth") 方法并打印返回的月历。

formatyear(_theyear_, _w\=2_, _l\=1_, _c\=6_, _m\=3_)[¶](#calendar.TextCalendar.formatyear "Link to this definition")

返回指定年的用多行字符串表示的 _m_ 列年历。可选参数 _w_、_l_ 和 _c_ 分别表示日期列宽，周的行距，和月与月之间的纵向间隔。同样依赖于构造器或者 [`setfirstweekday()`](#calendar.setfirstweekday "calendar.setfirstweekday") 方法指定的每周的第一天是哪一天。可以生成年历的最早的年是哪一年依赖于使用的平台。

pryear(_theyear_, _w\=2_, _l\=1_, _c\=6_, _m\=3_)[¶](#calendar.TextCalendar.pryear "Link to this definition")

调用 [`formatyear()`](#calendar.TextCalendar.formatyear "calendar.TextCalendar.formatyear") 方法并打印返回的年历。

_class_ calendar.HTMLCalendar(_firstweekday\=0_)[¶](#calendar.HTMLCalendar "Link to this definition")

可以使用这个类生成 HTML 日历。

`HTMLCalendar` 实例有以下方法：

formatmonth(_theyear_, _themonth_, _withyear\=True_)[¶](#calendar.HTMLCalendar.formatmonth "Link to this definition")

返回一个 HTML 表格作为指定年月的日历。 _withyear_ 为真，则年份将会包含在表头，否则只显示月份。

formatyear(_theyear_, _width\=3_)[¶](#calendar.HTMLCalendar.formatyear "Link to this definition")

返回一个 HTML 表格作为指定年份的日历。 _width_ (默认为3) 用于规定每一行显示月份的数量。

formatyearpage(_theyear_, _width\=3_, _css\='calendar.css'_, _encoding\=None_)[¶](#calendar.HTMLCalendar.formatyearpage "Link to this definition")

返回一个完整的 HTML 页面作为指定年份的日历。 _width\*(默认为3) 用于规定每一行显示的月份数量。 \*css_ 为层叠样式表的名字。如果不使用任何层叠样式表，可以使用 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None") 。 _encoding_ 为输出页面的编码 (默认为系统的默认编码)。

formatmonthname(_theyear_, _themonth_, _withyear\=True_)[¶](#calendar.HTMLCalendar.formatmonthname "Link to this definition")

将一个月份名称以 HTML 表格行的形式返回。 如果 _withyear_ 为真值则年份将被包括在行中，否则将只使用月份名称。

`HTMLCalendar` 有以下属性，你可以重写它们来自定义应用日历的样式。

cssclasses[¶](#calendar.HTMLCalendar.cssclasses "Link to this definition")

一个对应星期一到星期天的 CSS class 列表。默认列表为

cssclasses \= \["mon", "tue", "wed", "thu", "fri", "sat", "sun"\]

可以向每天加入其它样式

cssclasses \= \["mon text-bold", "tue", "wed", "thu", "fri", "sat", "sun red"\]

需要注意的是，列表的长度必须为7。

cssclass\_noday[¶](#calendar.HTMLCalendar.cssclass_noday "Link to this definition")

出现在上个月或下个月的工作日的 CSS 类。

Added in version 3.7.

cssclasses\_weekday\_head[¶](#calendar.HTMLCalendar.cssclasses_weekday_head "Link to this definition")

用于标题行中的工作日名称的 CSS 类列表。默认值与 [`cssclasses`](#calendar.HTMLCalendar.cssclasses "calendar.HTMLCalendar.cssclasses") 相同。

Added in version 3.7.

cssclass\_month\_head[¶](#calendar.HTMLCalendar.cssclass_month_head "Link to this definition")

月份的头 CSS 类（由 [`formatmonthname()`](#calendar.HTMLCalendar.formatmonthname "calendar.HTMLCalendar.formatmonthname") 使用）。默认值为 `"month"` 。

Added in version 3.7.

cssclass\_month[¶](#calendar.HTMLCalendar.cssclass_month "Link to this definition")

某个月的月历的 CSS 类（由 [`formatmonth()`](#calendar.HTMLCalendar.formatmonth "calendar.HTMLCalendar.formatmonth") 使用）。默认值为 `"month"` 。

Added in version 3.7.

cssclass\_year[¶](#calendar.HTMLCalendar.cssclass_year "Link to this definition")

某年的年历的 CSS 类（由 [`formatyear()`](#calendar.HTMLCalendar.formatyear "calendar.HTMLCalendar.formatyear") 使用）。默认值为 `"year"` 。

Added in version 3.7.

cssclass\_year\_head[¶](#calendar.HTMLCalendar.cssclass_year_head "Link to this definition")

年历的表头 CSS 类（由 [`formatyear()`](#calendar.HTMLCalendar.formatyear "calendar.HTMLCalendar.formatyear") 使用）。默认值为 `"year"` 。

Added in version 3.7.

需要注意的是，尽管上面命名的样式类都是单独出现的(如： `cssclass_month` `cssclass_noday`), 但我们可以使用空格将样式类列表中的多个元素分隔开，例如:

"text-bold text-red"

下面是一个如何自定义 `HTMLCalendar` 的示例

class CustomHTMLCal(calendar.HTMLCalendar):
    cssclasses \= \[style + " text-nowrap" for style in
                  calendar.HTMLCalendar.cssclasses\]
    cssclass\_month\_head \= "text-center month-head"
    cssclass\_month \= "text-center month"
    cssclass\_year \= "text-italic lead"

_class_ calendar.LocaleTextCalendar(_firstweekday\=0_, _locale\=None_)[¶](#calendar.LocaleTextCalendar "Link to this definition")

可以向这个 [`TextCalendar`](#calendar.TextCalendar "calendar.TextCalendar") 的子类的构造器传入一个语言区域名称并将返回指定语言区域下的月份和星期名称。

_class_ calendar.LocaleHTMLCalendar(_firstweekday\=0_, _locale\=None_)[¶](#calendar.LocaleHTMLCalendar "Link to this definition")

可以向这个 [`HTMLCalendar`](#calendar.HTMLCalendar "calendar.HTMLCalendar") 的子类的构造器传入一个语言区域名称并将返回指定语言区域下的月份和星期名称。

备注

这两个类的构造器、`formatweekday()` 和 `formatmonthname()` 方法会临时将 `LC_TIME` 语言区域更改为给定的 _locale_。 因为当前语言区域是进程级的设置，所以它们不是线程安全的。

这个模块为简单的文本日历提供了下列函数。

calendar.setfirstweekday(_firstweekday_)[¶](#calendar.setfirstweekday "Link to this definition")

设置每一周的开始 (`0` 表示星期一，`6` 表示星期天)。 提供了 [`MONDAY`](#calendar.MONDAY "calendar.MONDAY")、[`TUESDAY`](#calendar.TUESDAY "calendar.TUESDAY")、[`WEDNESDAY`](#calendar.WEDNESDAY "calendar.WEDNESDAY")、[`THURSDAY`](#calendar.THURSDAY "calendar.THURSDAY")、[`FRIDAY`](#calendar.FRIDAY "calendar.FRIDAY")、[`SATURDAY`](#calendar.SATURDAY "calendar.SATURDAY") 和 [`SUNDAY`](#calendar.SUNDAY "calendar.SUNDAY") 几个常量值作为方便。 例如，设置每周的第一天为星期天:

import calendar
calendar.setfirstweekday(calendar.SUNDAY)

calendar.firstweekday()[¶](#calendar.firstweekday "Link to this definition")

返回当前设置的每星期的第一天的数值。

calendar.isleap(_year_)[¶](#calendar.isleap "Link to this definition")

如果 _year_ 是闰年则返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True") ,否则返回 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False")。

calendar.leapdays(_y1_, _y2_)[¶](#calendar.leapdays "Link to this definition")

返回在范围 _y1_ 至 _y2_ （不包括 y2）之间的闰年的年数，其中 _y1_ 和 _y2_ 是年份。

此函数对于跨越世纪初的范围也适用。

calendar.weekday(_year_, _month_, _day_)[¶](#calendar.weekday "Link to this definition")

返回某年（ `1970` -- ...），某月（ `1` -- `12` ），某日（ `1` -- `31` ）是星期几（ `0` 是星期一）。

返回一个包含缩写星期名的表头。 _width_ 指定一个星期名的字符宽度。

calendar.monthrange(_year_, _month_)[¶](#calendar.monthrange "Link to this definition")

针对指定的 _year_ 和 _month_，返回该月份的第一天是星期几以及该月份的天数。

calendar.monthcalendar(_year_, _month_)[¶](#calendar.monthcalendar "Link to this definition")

返回表示一个月的日历的矩阵。 每一行代表一周；此月份外的日子由零表示。 每周从周一开始，除非使用 [`setfirstweekday()`](#calendar.setfirstweekday "calendar.setfirstweekday") 改变设置。

calendar.prmonth(_theyear_, _themonth_, _w\=0_, _l\=0_)[¶](#calendar.prmonth "Link to this definition")

打印由 [`month()`](#calendar.month "calendar.month") 返回的一个月的日历。

calendar.month(_theyear_, _themonth_, _w\=0_, _l\=0_)[¶](#calendar.month "Link to this definition")

使用 [`TextCalendar`](#calendar.TextCalendar "calendar.TextCalendar") 类的 [`formatmonth()`](#calendar.TextCalendar.formatmonth "calendar.TextCalendar.formatmonth") 返回多行字符串形式的月份日历。

calendar.prcal(_theyear_, _w\=0_, _l\=0_, _c\=6_, _m\=3_)[¶](#calendar.prcal "Link to this definition")

打印由 [`calendar()`](#module-calendar "calendar: Functions for working with calendars, including some emulation of the Unix cal program.") 返回的整年的日历。

calendar.calendar(_theyear_, _w\=2_, _l\=1_, _c\=6_, _m\=3_)[¶](#calendar.calendar "Link to this definition")

使用 [`TextCalendar`](#calendar.TextCalendar "calendar.TextCalendar") 类的 [`formatyear()`](#calendar.TextCalendar.formatyear "calendar.TextCalendar.formatyear") 返回一个整年的 3 列日历。

calendar.timegm(_tuple_)[¶](#calendar.timegm "Link to this definition")

一个不相关但很好用的函数，它接受一个时间元组像是由 [`time`](https://docs.python.org/zh-cn/3/library/time.html#module-time "time: Time access and conversions.") 模块中 [`gmtime()`](https://docs.python.org/zh-cn/3/library/time.html#time.gmtime "time.gmtime") 函数所返回的内容，并返回相应的 Unix 时间戳值，使用 1970 起始纪元，以及 POSIX 编码格式。 实际上，`time.gmtime()` 和 [`timegm()`](#calendar.timegm "calendar.timegm") 是彼此的反操作。

`calendar` 模块导出了下列数据属性：

calendar.day\_name[¶](#calendar.day_name "Link to this definition")

在当前语言区域下表示周内日期的序列，其中“星期一”为 0 号日。

\>>> import calendar
\>>> list(calendar.day\_name)
\['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'\]

calendar.day\_abbr[¶](#calendar.day_abbr "Link to this definition")

在当前语言区域下简写表示周内日期的序列，其中“一” 为 0 号日。

\>>> import calendar
\>>> list(calendar.day\_abbr)
\['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'\]

calendar.MONDAY[¶](#calendar.MONDAY "Link to this definition")

calendar.TUESDAY[¶](#calendar.TUESDAY "Link to this definition")

calendar.WEDNESDAY[¶](#calendar.WEDNESDAY "Link to this definition")

calendar.THURSDAY[¶](#calendar.THURSDAY "Link to this definition")

calendar.FRIDAY[¶](#calendar.FRIDAY "Link to this definition")

calendar.SATURDAY[¶](#calendar.SATURDAY "Link to this definition")

calendar.SUNDAY[¶](#calendar.SUNDAY "Link to this definition")

星期内每日序号的别名，其中 `MONDAY` 是 `0` 而 `SUNDAY` 是 `6`。

Added in version 3.12.

_class_ calendar.Day[¶](#calendar.Day "Link to this definition")

将星期内的每一天定义为整数常量的枚举。 该枚举的成员以 [`MONDAY`](#calendar.MONDAY "calendar.MONDAY") 至 [`SUNDAY`](#calendar.SUNDAY "calendar.SUNDAY") 的形式导出到模块作用域。

Added in version 3.12.

calendar.month\_name[¶](#calendar.month_name "Link to this definition")

在当前语言区域中表示一年中每个月份的序列。 这遵循一月的月序号为 1 的通常惯例，所以其长度为 13 且 `month_name[0]` 为空字符串。

\>>> import calendar
\>>> list(calendar.month\_name)
\['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'\]

calendar.month\_abbr[¶](#calendar.month_abbr "Link to this definition")

在当前语言区域下简写表示一年中月份的序列。 这遵循一月的月份序号为 1 的通常惯例，所以其长度为 13 且 `month_abbr[0]` 为空字符串。

\>>> import calendar
\>>> list(calendar.month\_abbr)
\['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'\]

calendar.JANUARY[¶](#calendar.JANUARY "Link to this definition")

calendar.FEBRUARY[¶](#calendar.FEBRUARY "Link to this definition")

calendar.MARCH[¶](#calendar.MARCH "Link to this definition")

calendar.APRIL[¶](#calendar.APRIL "Link to this definition")

calendar.MAY[¶](#calendar.MAY "Link to this definition")

calendar.JUNE[¶](#calendar.JUNE "Link to this definition")

calendar.JULY[¶](#calendar.JULY "Link to this definition")

calendar.AUGUST[¶](#calendar.AUGUST "Link to this definition")

calendar.SEPTEMBER[¶](#calendar.SEPTEMBER "Link to this definition")

calendar.OCTOBER[¶](#calendar.OCTOBER "Link to this definition")

calendar.NOVEMBER[¶](#calendar.NOVEMBER "Link to this definition")

calendar.DECEMBER[¶](#calendar.DECEMBER "Link to this definition")

一年中各个月份的别名，其中 `JANUARY` 是 `1` 而 `DECEMBER` 是 `12`。

Added in version 3.12.

_class_ calendar.Month[¶](#calendar.Month "Link to this definition")

将一年中各个月份定义为整数常量的枚举。 该枚举的成员以 [`JANUARY`](#calendar.JANUARY "calendar.JANUARY") 至 [`DECEMBER`](#calendar.DECEMBER "calendar.DECEMBER") 的形式导出到模块作用域。

Added in version 3.12.

`calendar` 模块定义了下列异常：

_exception_ calendar.IllegalMonthError(_month_)[¶](#calendar.IllegalMonthError "Link to this definition")

[`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 和 [`IndexError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#IndexError "IndexError") 的子类，当给定的月份数字超出 1-12 范围（包含边界值）时引发。

在 3.12 版本发生变更: `IllegalMonthError` is now also a subclass of [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError"). New code should avoid catching [`IndexError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#IndexError "IndexError").

month[¶](#calendar.IllegalMonthError.month "Link to this definition")

无效的月份数字。

_exception_ calendar.IllegalWeekdayError(_weekday_)[¶](#calendar.IllegalWeekdayError "Link to this definition")

[`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 的子类，当给定的星期数字超出 0-6 范围（包含边界值）时引发。

weekday[¶](#calendar.IllegalWeekdayError.weekday "Link to this definition")

无效的星期数字。

## 命令行用法[¶](#command-line-usage "Link to this heading")

Added in version 2.5.

The `calendar` module can be executed as a script from the command line to interactively print a calendar.

python \-m calendar \[\-h\] \[\-L LOCALE\] \[\-e ENCODING\] \[\-t {text,html}\]
                   \[\-w WIDTH\] \[\-l LINES\] \[\-s SPACING\] \[\-m MONTHS\] \[\-c CSS\]
                   \[\-f FIRST\_WEEKDAY\] \[year\] \[month\]

例如，打印 2000 年的日历：

$ python \-m calendar 2000
                                  2000

      January                   February                   March
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
                1  2          1  2  3  4  5  6             1  2  3  4  5
 3  4  5  6  7  8  9       7  8  9 10 11 12 13       6  7  8  9 10 11 12
10 11 12 13 14 15 16      14 15 16 17 18 19 20      13 14 15 16 17 18 19
17 18 19 20 21 22 23      21 22 23 24 25 26 27      20 21 22 23 24 25 26
24 25 26 27 28 29 30      28 29                     27 28 29 30 31
31

       April                      May                       June
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
                1  2       1  2  3  4  5  6  7                1  2  3  4
 3  4  5  6  7  8  9       8  9 10 11 12 13 14       5  6  7  8  9 10 11
10 11 12 13 14 15 16      15 16 17 18 19 20 21      12 13 14 15 16 17 18
17 18 19 20 21 22 23      22 23 24 25 26 27 28      19 20 21 22 23 24 25
24 25 26 27 28 29 30      29 30 31                  26 27 28 29 30

        July                     August                  September
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
                1  2          1  2  3  4  5  6                   1  2  3
 3  4  5  6  7  8  9       7  8  9 10 11 12 13       4  5  6  7  8  9 10
10 11 12 13 14 15 16      14 15 16 17 18 19 20      11 12 13 14 15 16 17
17 18 19 20 21 22 23      21 22 23 24 25 26 27      18 19 20 21 22 23 24
24 25 26 27 28 29 30      28 29 30 31               25 26 27 28 29 30
31

      October                   November                  December
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
                   1             1  2  3  4  5                   1  2  3
 2  3  4  5  6  7  8       6  7  8  9 10 11 12       4  5  6  7  8  9 10
 9 10 11 12 13 14 15      13 14 15 16 17 18 19      11 12 13 14 15 16 17
16 17 18 19 20 21 22      20 21 22 23 24 25 26      18 19 20 21 22 23 24
23 24 25 26 27 28 29      27 28 29 30               25 26 27 28 29 30 31
30 31

可以接受以下选项：

\--help, \-h[¶](#cmdoption-calendar-help "Link to this definition")

显示帮助信息并退出。

\--locale LOCALE, \-L LOCALE[¶](#cmdoption-calendar-locale "Link to this definition")

月份和星期名称所使用的语言区域。 默认为英语。

\--encoding ENCODING, \-e ENCODING[¶](#cmdoption-calendar-encoding "Link to this definition")

输出所使用的编码格式。 如果设置了 [`--locale`](#cmdoption-calendar-locale) 则 [`--encoding`](#cmdoption-calendar-encoding) 将是必须的。

\--type {text,html}, \-t {text,html}[¶](#cmdoption-calendar-type "Link to this definition")

将日历以文本或 HTML 文档的形式打印到终端。

\--first-weekday FIRST\_WEEKDAY, \-f FIRST\_WEEKDAY[¶](#cmdoption-calendar-first-weekday "Link to this definition")

每个星期的开始星期序号。 必须为 0 (星期一) 到 6 (星期日) 之间的数字。 默认为 0。

Added in version 3.13.

year[¶](#cmdoption-calendar-arg-year "Link to this definition")

要打印日历的年份。 默认为当前年份。

month[¶](#cmdoption-calendar-arg-month "Link to this definition")

指定 [`year`](#cmdoption-calendar-arg-year) 中要打印日历的月份。 必须是 1 到 12 之间的数字，且只能在文本模式下使用。 默认打印全年的日历。

_文本模式选项:_

\--width WIDTH, \-w WIDTH[¶](#cmdoption-calendar-width "Link to this definition")

以终端的列数表示的日期列宽度。 日期将打印在列中央。 小于 2 的值将被忽略。 默认为 2。

\--lines LINES, \-l LINES[¶](#cmdoption-calendar-lines "Link to this definition")

以终端的行数表示的每周的行数。 日期将顶端对齐打印。小于 1 的值将被忽略。 默认为 1。

\--spacing SPACING, \-s SPACING[¶](#cmdoption-calendar-spacing "Link to this definition")

列中的月份之间的空格。 小于 2 的值将被忽略。 默认为 6。

\--months MONTHS, \-m MONTHS[¶](#cmdoption-calendar-months "Link to this definition")

每行打印的月份数。 默认为 3。

在 3.14 版本发生变更: 在默认情况下，当天的日期将以彩色高亮并可以 [使用环境变量来控制](https://docs.python.org/zh-cn/3/using/cmdline.html#using-on-controlling-color)。

_HTML 模式选项:_

\--css CSS, \-c CSS[¶](#cmdoption-calendar-css "Link to this definition")

日历要使用的 CSS 样式表的路径。 该路径必须是相对于所生成的 HTML，或是一个绝对 HTTP 或 `file:///` URL。
