**源代码：** [Lib/locale.py](https://github.com/python/cpython/tree/3.14/Lib/locale.py)

* * *

`locale` 模块开通了 POSIX 本地化数据库和功能的访问。 POSIX 本地化机制让程序员能够为应用程序处理某些本地化的问题，而不需要去了解运行软件的每个国家的全部语言习惯。

The `locale` module is implemented on top of the `_locale` module, which in turn uses an ANSI C locale implementation if available.

`locale` 模块定义了以下异常和函数：

_exception_ locale.Error[¶](#locale.Error "Link to this definition")

当传给 [`setlocale()`](#locale.setlocale "locale.setlocale") 的 locale 无法识别时，会触发异常。

locale.setlocale(_category_, _locale\=None_)[¶](#locale.setlocale "Link to this definition")

如果给定了 _locale_ 而不是 `None`，[`setlocale()`](#locale.setlocale "locale.setlocale") 会为 _category_ 修改语言区域设置。 可用的类别在下面的数据描述中列出。 _locale_ 可以是一个 [字符串](#locale-name)，或是一个表示语言代码和编码格式的字符串对。 空字符串表示用户的默认设置。 如果语言区域修改失败，会引发 [`Error`](#locale.Error "locale.Error") 异常。 如果成功，则返回新的语言区域设置。

如果 _locale_ 是一个元组，则会通过区域设置别名引擎将其转换为区域设置名称。其中语言代码的格式与 [区域设置名称](#locale-name) 相同，但不包含编码信息和以 @ 开头的修饰符。语言代码和编码都可以为 `None`。

如果省略 _locale_ 或为 `None`，将返回 _category_ 的当前设置。

示例:

\>>> import locale
\>>> loc \= locale.setlocale(locale.LC\_ALL)  \# 获取当前语言区域
\# 使用德语的语言区域；名称和可用性可能因平台而变化
\>>> locale.setlocale(locale.LC\_ALL, 'de\_DE.UTF-8')
\>>> locale.strcoll('f\\xe4n', 'foo')  \# 比较一个包含变音的字符串
\>>> locale.setlocale(locale.LC\_ALL, '')   \# 使用用户首选的语言区域
\>>> locale.setlocale(locale.LC\_ALL, 'C')  \# 使用默认的 (C) 语言区域
\>>> locale.setlocale(locale.LC\_ALL, loc)  \# 恢复已保存的语言区域

[`setlocale()`](#locale.setlocale "locale.setlocale") 在大多数系统上都不是线程安全的。 应用程序通常会以这样的调用作为开始:

import locale
locale.setlocale(locale.LC\_ALL, '')

这会把所有类别的 locale 都设为用户的默认设置（通常在 `LANG` 环境变量中指定）。如果后续 locale 没有改动，则使用多线程应该不会产生问题。

locale.localeconv()[¶](#locale.localeconv "Link to this definition")

以字典的形式返回本地约定的数据库。此字典具有以下字符串作为键：

| 
类别

 | 

键

 | 

含意

 |
| --- | --- | --- |
| 

[`LC_NUMERIC`](#locale.LC_NUMERIC "locale.LC_NUMERIC")

 | 

`'decimal_point'`

 | 

小数点字符。

 |
|  | 

`'grouping'`

 | 

数字列表，指定 `'thousands_sep'` 应该出现的位置。 如果列表以 [`CHAR_MAX`](#locale.CHAR_MAX "locale.CHAR_MAX") 结束，则不会作分组。如果列表以 `0` 结束，则重复使用最后的分组大小。

 |
|  | 

`'thousands_sep'`

 | 

组之间使用的字符。

 |
| 

[`LC_MONETARY`](#locale.LC_MONETARY "locale.LC_MONETARY")

 | 

`'int_curr_symbol'`

 | 

国际货币符号。

 |
|  | 

`'currency_symbol'`

 | 

当地货币符号。

 |
|  | 

`'p_cs_precedes/n_cs_precedes'`

 | 

货币符号是否在值之前（对于正值或负值）。

 |
|  | 

`'p_sep_by_space/n_sep_by_space'`

 | 

货币符号是否通过空格与值分隔（对于正值或负值）。

 |
|  | 

`'mon_decimal_point'`

 | 

用于货币金额的小数点。

 |
|  | 

`'frac_digits'`

 | 

货币值的本地格式中使用的小数位数。

 |
|  | 

`'int_frac_digits'`

 | 

货币价值的国际格式中使用的小数位数。

 |
|  | 

`'mon_thousands_sep'`

 | 

用于货币值的组分隔符。

 |
|  | 

`'mon_grouping'`

 | 

相当于 `'grouping'` ，用于货币价值。

 |
|  | 

`'positive_sign'`

 | 

用于标注正货币价值的符号。

 |
|  | 

`'negative_sign'`

 | 

用于注释负货币价值的符号。

 |
|  | 

`'p_sign_posn/n_sign_posn'`

 | 

符号的位置（对于正值或负值），见下文。

 |

可以将所有数值设置为 [`CHAR_MAX`](#locale.CHAR_MAX "locale.CHAR_MAX") ，以指示本 locale 中未指定任何值。

下面给出了 `'p_sign_posn'` 和 `'n_sign_posn'` 的可能值。

| 
值

 | 

说明

 |
| --- | --- |
| 

`0`

 | 

被括号括起来的货币和金额。

 |
| 

`1`

 | 

该标志应位于值和货币符号之前。

 |
| 

`2`

 | 

该标志应位于值和货币符号之后。

 |
| 

`3`

 | 

标志应该紧跟在值之前。

 |
| 

`4`

 | 

标志应该紧跟在值之后。

 |
| 

`CHAR_MAX`

 | 

该地区未指定内容。

 |

此函数可临时性地将 `LC_CTYPE` 语言区域设为 `LC_NUMERIC` 语言区域或者如果语言区域不同且数字或货币字符串是非 ASCII 的则设为 `LC_MONETARY` 语言区域。 这个临时性地改变会影响到其他线程。

在 3.7 版本发生变更: 现在此函数在某些情况下会临时性地将 `LC_CTYPE` 语言区域设为 `LC_NUMERIC` 语言区域。

locale.nl\_langinfo(_option_)[¶](#locale.nl_langinfo "Link to this definition")

以字符串形式返回一些地区相关的信息。本函数并非在所有系统都可用，而且可用的 option 在不同平台上也可能不同。可填的参数值为数值，在 locale 模块中提供了对应的符号常量。

[`nl_langinfo()`](#locale.nl_langinfo "locale.nl_langinfo") 函数可接受以下值。大部分含义都取自 GNU C 库。

locale.CODESET[¶](#locale.CODESET "Link to this definition")

获取一个字符串，代表所选地区采用的字符编码名称。

locale.D\_T\_FMT[¶](#locale.D_T_FMT "Link to this definition")

获取一个字符串，可用作 [`time.strftime()`](https://docs.python.org/zh-cn/3/library/time.html#time.strftime "time.strftime") 的格式串，以便以地区特定格式表示日期和时间。

locale.D\_FMT[¶](#locale.D_FMT "Link to this definition")

获取一个字符串，可用作 [`time.strftime()`](https://docs.python.org/zh-cn/3/library/time.html#time.strftime "time.strftime") 的格式串，以便以地区特定格式表示日期。

locale.T\_FMT[¶](#locale.T_FMT "Link to this definition")

获取一个字符串，可用作 [`time.strftime()`](https://docs.python.org/zh-cn/3/library/time.html#time.strftime "time.strftime") 的格式串，以便以地区特定格式表示时间。

locale.T\_FMT\_AMPM[¶](#locale.T_FMT_AMPM "Link to this definition")

获取一个字符串，可用作 [`time.strftime()`](https://docs.python.org/zh-cn/3/library/time.html#time.strftime "time.strftime") 的格式串，以便以 am/pm 的格式表示时间。

locale.DAY\_1[¶](#locale.DAY_1 "Link to this definition")

locale.DAY\_2[¶](#locale.DAY_2 "Link to this definition")

locale.DAY\_3[¶](#locale.DAY_3 "Link to this definition")

locale.DAY\_4[¶](#locale.DAY_4 "Link to this definition")

locale.DAY\_5[¶](#locale.DAY_5 "Link to this definition")

locale.DAY\_6[¶](#locale.DAY_6 "Link to this definition")

locale.DAY\_7[¶](#locale.DAY_7 "Link to this definition")

获取一周中第 n 天的名称。

备注

这里遵循美国惯例，即 [`DAY_1`](#locale.DAY_1 "locale.DAY_1") 是星期天，而不是国际惯例（ISO 8601），即星期一是一周的第一天。

locale.ABDAY\_1[¶](#locale.ABDAY_1 "Link to this definition")

locale.ABDAY\_2[¶](#locale.ABDAY_2 "Link to this definition")

locale.ABDAY\_3[¶](#locale.ABDAY_3 "Link to this definition")

locale.ABDAY\_4[¶](#locale.ABDAY_4 "Link to this definition")

locale.ABDAY\_5[¶](#locale.ABDAY_5 "Link to this definition")

locale.ABDAY\_6[¶](#locale.ABDAY_6 "Link to this definition")

locale.ABDAY\_7[¶](#locale.ABDAY_7 "Link to this definition")

获取一周中第 n 天的缩写名称。

locale.MON\_1[¶](#locale.MON_1 "Link to this definition")

locale.MON\_2[¶](#locale.MON_2 "Link to this definition")

locale.MON\_3[¶](#locale.MON_3 "Link to this definition")

locale.MON\_4[¶](#locale.MON_4 "Link to this definition")

locale.MON\_5[¶](#locale.MON_5 "Link to this definition")

locale.MON\_6[¶](#locale.MON_6 "Link to this definition")

locale.MON\_7[¶](#locale.MON_7 "Link to this definition")

locale.MON\_8[¶](#locale.MON_8 "Link to this definition")

locale.MON\_9[¶](#locale.MON_9 "Link to this definition")

locale.MON\_10[¶](#locale.MON_10 "Link to this definition")

locale.MON\_11[¶](#locale.MON_11 "Link to this definition")

locale.MON\_12[¶](#locale.MON_12 "Link to this definition")

获取第 n 个月的名称。

locale.ABMON\_1[¶](#locale.ABMON_1 "Link to this definition")

locale.ABMON\_2[¶](#locale.ABMON_2 "Link to this definition")

locale.ABMON\_3[¶](#locale.ABMON_3 "Link to this definition")

locale.ABMON\_4[¶](#locale.ABMON_4 "Link to this definition")

locale.ABMON\_5[¶](#locale.ABMON_5 "Link to this definition")

locale.ABMON\_6[¶](#locale.ABMON_6 "Link to this definition")

locale.ABMON\_7[¶](#locale.ABMON_7 "Link to this definition")

locale.ABMON\_8[¶](#locale.ABMON_8 "Link to this definition")

locale.ABMON\_9[¶](#locale.ABMON_9 "Link to this definition")

locale.ABMON\_10[¶](#locale.ABMON_10 "Link to this definition")

locale.ABMON\_11[¶](#locale.ABMON_11 "Link to this definition")

locale.ABMON\_12[¶](#locale.ABMON_12 "Link to this definition")

获取第 n 个月的缩写名称。

locale.RADIXCHAR[¶](#locale.RADIXCHAR "Link to this definition")

获取小数点字符（小数点、小数逗号等）。

locale.THOUSEP[¶](#locale.THOUSEP "Link to this definition")

获取千位数（三位数一组）的分隔符。

locale.YESEXPR[¶](#locale.YESEXPR "Link to this definition")

获取一个可供 regex 函数使用的正则表达式，用于识别需要回答是或否的问题的肯定回答。

locale.NOEXPR[¶](#locale.NOEXPR "Link to this definition")

获取一个可供 `regex(3)` 函数使用的正则表达式以识别对于是/否型问题的否定回答。

备注

针对 [`YESEXPR`](#locale.YESEXPR "locale.YESEXPR") 和 [`NOEXPR`](#locale.NOEXPR "locale.NOEXPR") 的正则表达式使用了适合来自 C 库的 `regex` 函数的语法，它与 [`re`](https://docs.python.org/zh-cn/3/library/re.html#module-re "re: Regular expression operations.") 中使用的语法会有所不同。

locale.CRNCYSTR[¶](#locale.CRNCYSTR "Link to this definition")

获取货币符号，如果符号应位于数字之前，则在其前面加上“-”；如果符号应位于数字之后，则前面加“+”；如果符号应取代小数点字符，则前面加“.”。

locale.ERA[¶](#locale.ERA "Link to this definition")

获取用来在某一语言区域中描述每个时代如何计算和显示年份的字符串。

大多数地区都没有定义该值。定义了该值的一个案例是日本。日本传统的日期表示方法中，包含了当时天皇统治朝代的名称。

通常没有必要直接使用该值。 在格式字符串中使用 `E` 说明符将会让 [`time.strftime()`](https://docs.python.org/zh-cn/3/library/time.html#time.strftime "time.strftime") 函数使用此信息。 被返回字符串的格式是在 _The Open Group Base Specifications Issue 8_, paragraph [7.3.5.2 LC\_TIME C-Language Access](https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap07.html#tag_07_03_05_02) 中指明的。

locale.ERA\_D\_T\_FMT[¶](#locale.ERA_D_T_FMT "Link to this definition")

获取一个字符串，可用作 [`time.strftime()`](https://docs.python.org/zh-cn/3/library/time.html#time.strftime "time.strftime") 的格式串，以便以地区特定格式表示带纪元的日期和时间。

locale.ERA\_D\_FMT[¶](#locale.ERA_D_FMT "Link to this definition")

获取一个字符串，可用作 [`time.strftime()`](https://docs.python.org/zh-cn/3/library/time.html#time.strftime "time.strftime") 的格式串，以便以地区特定格式表示带纪元的日期。

locale.ERA\_T\_FMT[¶](#locale.ERA_T_FMT "Link to this definition")

获取一个字符串，可用作 [`time.strftime()`](https://docs.python.org/zh-cn/3/library/time.html#time.strftime "time.strftime") 的格式串，以便以地区特定格式表示带纪元的时间。

locale.ALT\_DIGITS[¶](#locale.ALT_DIGITS "Link to this definition")

获取一个由至多 100 个以分号分隔的用于通过特定语言区域专属的方式表示数值 0 到 99 的符号名称组成的字符串。 在大多数语言区域中这都是一个空字符串。

如果语言区域不同并且结果字符串为非 ASCII 的则该函数会临时性地将 `LC_CTYPE` 语言区域设为决定所请求值 (`LC_TIME`, `LC_NUMERIC`, `LC_MONETARY` 或 `LC_MESSAGES`) 的类别的语言区域。 这个临时性修改会影响其他的线程。

在 3.14 版本发生变更: 现在该函数在某些情况下会临时性地设置 `LC_CTYPE` 语言区域。

locale.getdefaultlocale(\[_envvars_\])[¶](#locale.getdefaultlocale "Link to this definition")

尝试确定默认的地区设置，并以 `(language code, encoding)` 元组的形式返回。

根据 POSIX 的规范，未调用 `setlocale(LC_ALL, '')` 的程序采用可移植的 `'C'` 区域设置运行。 调用 `setlocale(LC_ALL, '')` 则可采用 `LANG` 变量定义的默认区域。 由于不想干扰当前的区域设置，因此就以上述方式进行了模拟。

为了维持与其他平台的兼容性，不仅需要检测 `LANG` 变量，还需要检测 envvars 参数给出的变量列表。首先发现的定义将被采用。 _envvars_ 默认为 GNU gettext 采用的搜索路径；必须包含 `'LANG'` 变量。 GNU gettext 的搜索路径依次包含了 `'LC_ALL'`、`'LC_CTYPE'`、`'LANG'` 和 `'LANGUAGE'`。

语言代码的格式与 [区域设置名称](#locale-name) 相同，但不包含编码和 `@` 修饰符。如果无法确定其值，语言代码和编码可以为 `None`。"C" 区域设置表示为 `(None, None)`。

locale.getlocale(_category\=LC\_CTYPE_)[¶](#locale.getlocale "Link to this definition")

返回指定区域设置类别的当前设置，结果以包含语言代码和编码格式的元组形式呈现。其中 _category_ 可以是除 [`LC_ALL`](#locale.LC_ALL "locale.LC_ALL") 外的任意 `LC_*` 常量值，默认使用 [`LC_CTYPE`](#locale.LC_CTYPE "locale.LC_CTYPE")。

语言代码的格式与 [区域设置名称](#locale-name) 相同，但不包含编码和 `@` 修饰符。如果无法确定其值，语言代码和编码可以为 `None`。"C" 区域设置表示为 `(None, None)`。

locale.getpreferredencoding(_do\_setlocale\=True_)[¶](#locale.getpreferredencoding "Link to this definition")

根据用户的偏好，返回用于文本数据的 [locale encoding](https://docs.python.org/zh-cn/3/glossary.html#term-locale-encoding)。用户偏好在不同的系统上有不同的表达方式，而且在某些系统上可能无法以编程方式获取到，所以本函数只是返回猜测结果。

某些系统必须调用 [`setlocale()`](#locale.setlocale "locale.setlocale") 才能获取用户偏好，所以本函数不是线程安全的。如果不需要或不希望调用 setlocale，_do\_setlocale_ 应设为 `False`。

在 Android 上或者如果启用了 [Python UTF-8 模式](https://docs.python.org/zh-cn/3/library/os.html#utf8-mode)，则将始终返回 `'utf-8'`，[locale encoding](https://docs.python.org/zh-cn/3/glossary.html#term-locale-encoding) 和 _do\_setlocale_ 参数将被忽略。

[Python preinitialization](https://docs.python.org/zh-cn/3/c-api/init_config.html#c-preinit) 用于配置 LC\_CTYPE 区域。还请参阅 [filesystem encoding and error handler](https://docs.python.org/zh-cn/3/glossary.html#term-filesystem-encoding-and-error-handler)。

在 3.7 版本发生变更: 目前在 Android 上或者如果启用了 [Python UTF-8 模式](https://docs.python.org/zh-cn/3/library/os.html#utf8-mode) 此函数将总是返回 `"utf-8"`。

locale.getencoding()[¶](#locale.getencoding "Link to this definition")

获取当前的 [locale encoding](https://docs.python.org/zh-cn/3/glossary.html#term-locale-encoding):

-   在 Android 和 VxWorks 上，将返回 `"utf-8"`。
    
-   在 Unix 上，将返回当前 [`LC_CTYPE`](#locale.LC_CTYPE "locale.LC_CTYPE") 语言区域的编码格式。 如果 `nl_langinfo(CODESET)` 返回空字符串则将返回 `"utf-8"`：举例来说，如果当前 LC\_CTYPE 语言区域不受支持。
    
-   在 Windows 上，返回 ANSI 代码页。
    

[Python preinitialization](https://docs.python.org/zh-cn/3/c-api/init_config.html#c-preinit) 用于配置 LC\_CTYPE 区域。还请参阅 [filesystem encoding and error handler](https://docs.python.org/zh-cn/3/glossary.html#term-filesystem-encoding-and-error-handler)。

此函数类似于 [`getpreferredencoding(False)`](#locale.getpreferredencoding "locale.getpreferredencoding")，区别是此函数会忽略 [Python UTF-8 模式](https://docs.python.org/zh-cn/3/library/os.html#utf8-mode)。

Added in version 3.11.

locale.normalize(_localename_)[¶](#locale.normalize "Link to this definition")

为给定的区域名称返回标准代码。返回的区域代码已经格式化，可供 [`setlocale()`](#locale.setlocale "locale.setlocale") 使用。 如果标准化操作失败，则返回原名称。

如果给出的编码无法识别，则本函数默认采用区域代码的默认编码，这正类似于 [`setlocale()`](#locale.setlocale "locale.setlocale")。

locale.strcoll(_string1_, _string2_)[¶](#locale.strcoll "Link to this definition")

根据当前的 [`LC_COLLATE`](#locale.LC_COLLATE "locale.LC_COLLATE") 设置，对两个字符串进行比较。与其他比较函数一样，根据 _string1_ 位于 _string2_ 之前、之后或是相同，返回负值、正值或者 `0`。

locale.strxfrm(_string_)[¶](#locale.strxfrm "Link to this definition")

将字符串转换为可用于本地化比较的字符串。例如 `strxfrm(s1) < strxfrm(s2)` 相当于 `strcoll(s1, s2) < 0`。在重复比较同一个字符串时，可能会用到本函数，比如整理字符串列表时。

locale.format\_string(_format_, _val_, _grouping\=False_, _monetary\=False_)[¶](#locale.format_string "Link to this definition")

根据当前的 [`LC_NUMERIC`](#locale.LC_NUMERIC "locale.LC_NUMERIC") 设置对数字 _val_ 进行格式化。 此格式将遵循 `%` 运算符的约定。 对于浮点数值，会根据具体情况修改小数点。 如果 _grouping_ 为 `True`，还会将分组纳入考虑。

若 _monetary_ 为 True，则会用到货币千位分隔符和分组字符串。

格式化符的处理类似 `format % val` ，但会考虑到当前的区域设置。

在 3.7 版本发生变更: 增加了关键字参数 _monetary_ 。

locale.currency(_val_, _symbol\=True_, _grouping\=False_, _international\=False_)[¶](#locale.currency "Link to this definition")

根据当前的 [`LC_MONETARY`](#locale.LC_MONETARY "locale.LC_MONETARY") 设置，对数字 _val_ 进行格式化。

如果 _symbol_ 为真值则返回的字符串将包括货币符号，该参数默认为真值。 如果 _grouping_ 为 `True` (非默认值)，则会对值进行分组。 如果 _international_ 为 `True` (非默认值)，则会使用国际货币符号。

备注

此函数将不适用于 'C' 语言区域，所以你必须先通过 [`setlocale()`](#locale.setlocale "locale.setlocale") 设置一个语言区域。

locale.str(_float_)[¶](#locale.str "Link to this definition")

对浮点数进行格式化，格式要求与内置函数 `str(float)` 相同，但会考虑小数点。

locale.delocalize(_string_)[¶](#locale.delocalize "Link to this definition")

根据 [`LC_NUMERIC`](#locale.LC_NUMERIC "locale.LC_NUMERIC") 的设置，将字符串转换为标准化的数字字符串。

Added in version 3.5.

locale.localize(_string_, _grouping\=False_, _monetary\=False_)[¶](#locale.localize "Link to this definition")

根据 [`LC_NUMERIC`](#locale.LC_NUMERIC "locale.LC_NUMERIC") 的设置，将标准化的数字字符串转换为格式化的字符串。

Added in version 3.10.

locale.atof(_string_, _func\=float_)[¶](#locale.atof "Link to this definition")

将一个字符串转换为数字，遵循 [`LC_NUMERIC`](#locale.LC_NUMERIC "locale.LC_NUMERIC") 设置，通过在 _string_ 上调用 [`delocalize()`](#locale.delocalize "locale.delocalize") 的结果上调用 _func_ 来实现。

locale.atoi(_string_)[¶](#locale.atoi "Link to this definition")

按照 [`LC_NUMERIC`](#locale.LC_NUMERIC "locale.LC_NUMERIC") 的约定，将字符串转换为整数。

locale.LC\_CTYPE[¶](#locale.LC_CTYPE "Link to this definition")

字符类型函数的语言区域类别。 最重要的是，该类别定义了文本编码格式，即如何将字节解读为 Unicode 码位点。 请参阅 [**PEP 538**](https://peps.python.org/pep-0538/) 和 [**PEP 540**](https://peps.python.org/pep-0540/) 了解如何将该变量自动强制转换为 `C.UTF-8` 以避免容器中的无效设置或通过远程 SSH 连接传递的不兼容设置所造成的问题。

Python 在内部并不使用来自 `ctype.h` 的依赖于语言区域的字符转换函数。 相反，`pyctype.h` 提供了独立于语言区域的等价形式如 [`Py_TOLOWER`](https://docs.python.org/zh-cn/3/c-api/conversion.html#c.Py_TOLOWER "Py_TOLOWER")。

locale.LC\_COLLATE[¶](#locale.LC_COLLATE "Link to this definition")

Locale category for sorting strings. The functions [`strcoll()`](#locale.strcoll "locale.strcoll") and [`strxfrm()`](#locale.strxfrm "locale.strxfrm") of the `locale` module are affected.

locale.LC\_TIME[¶](#locale.LC_TIME "Link to this definition")

格式化时间时会用到的区域类别。 [`time.strftime()`](https://docs.python.org/zh-cn/3/library/time.html#time.strftime "time.strftime") 函数会参考这些约定。

locale.LC\_MONETARY[¶](#locale.LC_MONETARY "Link to this definition")

格式化货币值时会用到的区域类别。可用值可由 [`localeconv()`](#locale.localeconv "locale.localeconv") 函数获取。

locale.LC\_MESSAGES[¶](#locale.LC_MESSAGES "Link to this definition")

显示消息时用到的区域类别。目前 Python 不支持应用定制的本地化消息。 由操作系统显示的消息，比如由 [`os.strerror()`](https://docs.python.org/zh-cn/3/library/os.html#os.strerror "os.strerror") 返回的消息可能会受到该类别的影响。

这个值在不符合 POSIX 标准的操作系统上可能不可用，最主要是指 Windows。

locale.LC\_NUMERIC[¶](#locale.LC_NUMERIC "Link to this definition")

Locale category for formatting numbers. The functions [`format_string()`](#locale.format_string "locale.format_string"), [`atoi()`](#locale.atoi "locale.atoi"), [`atof()`](#locale.atof "locale.atof") and [`str()`](#locale.str "locale.str") of the `locale` module are affected by that category. All other numeric formatting operations are not affected.

locale.LC\_ALL[¶](#locale.LC_ALL "Link to this definition")

混合所有的区域设置。如果在区域改动时使用该标志，将尝试设置所有类别的区域参数。只要有任何一个类别设置失败，就不会修改任何类别。在使用此标志获取区域设置时，会返回一个代表所有类别设置的字符串。之后可用此字符串恢复设置。

locale.CHAR\_MAX[¶](#locale.CHAR_MAX "Link to this definition")

一个符号常量， [`localeconv()`](#locale.localeconv "locale.localeconv") 返回多个值时将会用到。

## 背景、细节、提示、技巧和注意事项[¶](#background-details-hints-tips-and-caveats "Link to this heading")

C 语言标准将区域定义为程序级别的属性，修改的代价可能相对较高。此外，有某些实现代码写得不好，频繁改变区域可能会导致内核崩溃。于是要想正确使用区域就变得有些痛苦。

当程序第一次启动时，无论用户偏好定义成什么，区域值都是 `C`。不过有一个例外，就是在启动时修改 [`LC_CTYPE`](#locale.LC_CTYPE "locale.LC_CTYPE") 类别，设置当前区域编码为用户偏好编码。程序必须调用 `setlocale(LC_ALL, '')` 明确表示用户偏好区域将设为其他类别。

若要从库程序中调用 [`setlocale()`](#locale.setlocale "locale.setlocale") ，通常这不是个好主意，因为副作用是会影响整个程序。保存和恢复区域设置也几乎一样糟糕：不仅代价高昂，而且会影响到恢复之前运行的其他线程。

如果是要编写通用模块，需要有一种不受区域设置影响的操作方式（比如某些用到 [`time.strftime()`](https://docs.python.org/zh-cn/3/library/time.html#time.strftime "time.strftime") 的格式），将不得不寻找一种不用标准库的方案。更好的办法是说服自己，可以采纳区域设置。只有在万不得已的情况下，才能用文档标注出模块与非 `C` 区域设置不兼容。

根据语言区域执行数字运算的唯一方式就是使用本模块所定义的特殊函数: [`atof()`](#locale.atof "locale.atof"), [`atoi()`](#locale.atoi "locale.atoi"), [`format_string()`](#locale.format_string "locale.format_string"), [`str()`](#locale.str "locale.str")。

无法根据区域设置进行大小写转换和字符分类。对于（Unicode）文本字符串来说，这些操作都是根据字符值进行的；而对于字节符串来说，转换和分类则是根据字节的 ASCII 值进行的，高位被置位的字节（即非 ASCII 字节）永远不会被转换或被视作字母或空白符之类。

## 区域设置名称[¶](#locale-names "Link to this heading")

区域名称的格式取决于平台，且支持的区域设置集合可能因系统配置而异。

在 Posix 平台上，其格式通常为 [\[1\]](#id4):

  language \["\_" territory\] \["." charset\] \["@" modifier\]

其中 _language_ 是来自 [ISO 639](https://www.iso.org/iso-639-language-code) 的二或三字母语言代码，_territory_ 是来自 [ISO 3166](https://www.iso.org/iso-3166-country-codes.html) 的二字母国家或地区代码，_charset_ 是语言区域编码格式，而 _modifier_ 是脚本名称、语言子标签、排序顺序标识符或其他语言区域修饰符（例如 "latin", "valencia", "stroke" 和 "euro"）。

在 Windows 系统上，支持多种格式。[\[2\]](#id5) [\[3\]](#id6) [IETF BCP 47](https://www.rfc-editor.org/info/bcp47) 标准的子集标签：

  language \["-" script\] \["-" territory\] \["." charset\]
  language \["-" script\] "-" territory "-" modifier

其中，_language_ 和 _territory_ 的含义与 POSIX 系统中的定义相同；_script_ 是来自 [ISO 15924](https://www.unicode.org/iso15924/) 标准的四字母书写系统代码；而 _modifier_ 可以是语言子标签、排序顺序标识符或自定义修饰符（例如：“valencia”、“stroke”或“x-python”）。 系统同时支持连字符 (`'-'`) 和下划线 (`'_'`) 作为分隔符。 对于 BCP 47 标签，仅允许使用 UTF-8 编码格式。

Windows 还支持以下格式的区域设置名称：

  language \["\_" territory\] \["." charset\]

其中 _language_ 和 _territory_ 使用完整名称（如 "English" 和 "United States"），而 _charset_ 可以是代码页编号（例如 "1252"）或 UTF-8。此格式仅支持下划线作为分隔符。

所有平台均支持 "C" 区域设置。

## 针对扩展程序编写人员和嵌入 Python 运行的程序[¶](#for-extension-writers-and-programs-that-embed-python "Link to this heading")

除了要查询当前区域，扩展模块不应去调用 [`setlocale()`](#locale.setlocale "locale.setlocale")。但由于返回值只能用于恢复设置，所以也没什么用 (也许只能用于确认是否为 `C`)。

When Python code uses the `locale` module to change the locale, this also affects the embedding application. If the embedding application doesn't want this to happen, it should remove the `_locale` extension module (which does all the work) from the table of built-in modules in the `config.c` file, and make sure that the `_locale` module is not accessible as a shared library.

## 访问消息目录[¶](#access-to-message-catalogs "Link to this heading")

locale.gettext(_msg_)[¶](#locale.gettext "Link to this definition")

locale.dgettext(_domain_, _msg_)[¶](#locale.dgettext "Link to this definition")

locale.dcgettext(_domain_, _msg_, _category_)[¶](#locale.dcgettext "Link to this definition")

locale.textdomain(_domain_)[¶](#locale.textdomain "Link to this definition")

locale.bindtextdomain(_domain_, _dir_)[¶](#locale.bindtextdomain "Link to this definition")

locale.bind\_textdomain\_codeset(_domain_, _codeset_)[¶](#locale.bind_textdomain_codeset "Link to this definition")

locale 模块在提供了 C 库的 gettext 接口的系统上对外公开该接口。 它由 [`gettext()`](https://docs.python.org/zh-cn/3/library/gettext.html#module-gettext "gettext: Multilingual internationalization services."), [`dgettext()`](#locale.dgettext "locale.dgettext"), [`dcgettext()`](#locale.dcgettext "locale.dcgettext"), [`textdomain()`](#locale.textdomain "locale.textdomain"), [`bindtextdomain()`](#locale.bindtextdomain "locale.bindtextdomain") 和 [`bind_textdomain_codeset()`](#locale.bind_textdomain_codeset "locale.bind_textdomain_codeset") 等函数组成。 它们与 [`gettext`](https://docs.python.org/zh-cn/3/library/gettext.html#module-gettext "gettext: Multilingual internationalization services.") 模块中的同名函数类似，但使用了 C 库的二进制格式来表示消息目录，并使用 C 库的搜索算法来查找消息目录。

Python 应用程序通常不需要唤起这些函数，而应当改用 [`gettext`](https://docs.python.org/zh-cn/3/library/gettext.html#module-gettext "gettext: Multilingual internationalization services.")。 这条规则的一个已知例外是与附加 C 库相链接的应用程序，它们会在内部唤起 C 函数 `gettext` 或 `dcgettext`。 对于这些应用程序，可能有必要绑定文本域，以便库能够正确地找到它们的消息目录。
