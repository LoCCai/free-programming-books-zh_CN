生成本地化字符串的翻译方法.

要加载区域设置并生成一个翻译后的字符串:

user\_locale \= tornado.locale.get("es\_LA")
print user\_locale.translate("Sign out")

[`tornado.locale.get()`](#tornado.locale.get "tornado.locale.get") 返回最匹配的语言环境, 不一定是你请求的特定的语言 环境. 你可以用额外的参数来支持多元化给 [`translate()`](#tornado.locale.Locale.translate "tornado.locale.Locale.translate"), e.g.:

people \= \[...\]
message \= user\_locale.translate(
    "%(list)s is online", "%(list)s are online", len(people))
print message % {"list": user\_locale.list(people)}

如果 `len(people) == 1` 则选择第一个字符串, 否则选择第二个字符串.

应用程序应该调用 [`load_translations`](#tornado.locale.load_translations "tornado.locale.load_translations") (它使用一个简单的CSV 格式) 或 [`load_gettext_translations`](#tornado.locale.load_gettext_translations "tornado.locale.load_gettext_translations") (它通过使用 [`gettext`](https://docs.python.org/3.4/library/gettext.html#module-gettext "(在 Python v3.4)") 和相关工具支持 `.mo` 格式) 其中之一. 如果没有方法被调用, [`Locale.translate`](#tornado.locale.Locale.translate "tornado.locale.Locale.translate") 方法将会直接的返回原本的字符串.

`tornado.locale.``get`(_\*locale\_codes_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#get)[¶](#tornado.locale.get "永久链接至目标")

返回给定区域代码的最近匹配.

我们按顺序遍历所有给定的区域代码. 如果我们有一个确定的或模糊的匹配 代码(e.g., “en” 匹配 “en\_US”), 则我们返回该区域. 否则我们移动到列表 中的下一个代码.

默认情况下我们返回 `en_US` 如果没有发现任何对指定区域的翻译. 你可以改变默认区域通过 [`set_default_locale()`](#tornado.locale.set_default_locale "tornado.locale.set_default_locale").

`tornado.locale.``set_default_locale`(_code_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#set_default_locale)[¶](#tornado.locale.set_default_locale "永久链接至目标")

设置默认区域.

默认语言环境被假定为用于系统中所有的字符串的语言. 从磁盘加载的翻译 是从默认的语言环境到目标区域的映射. 因此, 你不需要为默认的语言环境 创建翻译文件.

`tornado.locale.``load_translations`(_directory_, _encoding=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#load_translations)[¶](#tornado.locale.load_translations "永久链接至目标")

从目录中的CSV 文件加载翻译.

翻译是带有任意的Python 风格指定的占位符的字符串(e.g., `My name is %(name)s`) 及其相关翻译.

该目录应该有以下形式的翻译文件 `LOCALE.csv`, e.g. `es_GT.csv`. 该CSV 文件应该有两列或三列: 字符串, 翻译, 和可选的多个指标. 复数的指标 应该是”plural” 或 “singular” 其中之一. 一个给定的字符串可以同时有单数和 复数形式. 例如 `%(name)s liked this` 可能有一个不同的动词组合, 这取决于 %(name)s 是一个名字还是一个名字列表. 在CSV文件里应该有两个针对于该字符串 的行, 一个用指示器指示”singular” (奇数), 一个指示”plural” (复数). 对于没有动词的字符串，将改变翻译, 简单的使用”unknown” 或空字符串 (或者不包括在所有列中的).

这个文件默认使用 [`csv`](https://docs.python.org/3.4/library/csv.html#module-csv "(在 Python v3.4)") 模块的”excel”进行读操作. 这种格式在逗号后面不 应该包含空格.

如果没有给定 `encoding` 参数, 如果该文件包含一个 byte-order marker (BOM), 编码格式将会自动检测(在UTF-8 和UTF-16 之间), 如果没有BOM将默认为UTF-8.

例如翻译 `es_LA.csv`:

"I love you","Te amo"
"%(name)s liked this","A %(name)s les gustó esto","plural"
"%(name)s liked this","A %(name)s le gustó esto","singular"

在 4.3 版更改: 添加 `encoding` 参数. 添加对BOM-based 的编码检测, UTF-16, 和 UTF-8-with-BOM.

`tornado.locale.``load_gettext_translations`(_directory_, _domain_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#load_gettext_translations)[¶](#tornado.locale.load_gettext_translations "永久链接至目标")

从 [`gettext`](https://docs.python.org/3.4/library/gettext.html#module-gettext "(在 Python v3.4)") 的区域树加载翻译

区域树和系统的 `/usr/share/locale` 很类似, 例如:

{directory}/{lang}/LC\_MESSAGES/{domain}.mo

让你的应用程序翻译有三步是必须的:

1.  生成POT翻译文件:
    
    xgettext \--language\=Python \--keyword\=\_:1,2 \-d mydomain file1.py file2.html etc
    
2.  合并现有的POT文件:
    
    msgmerge old.po mydomain.po \> new.po
    
3.  编译:
    
    msgfmt mydomain.po \-o {directory}/pt\_BR/LC\_MESSAGES/mydomain.mo
    

`tornado.locale.``get_supported_locales`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#get_supported_locales)[¶](#tornado.locale.get_supported_locales "永久链接至目标")

返回所有支持的语言代码列表.

_class_ `tornado.locale.``Locale`(_code_, _translations_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#Locale)[¶](#tornado.locale.Locale "永久链接至目标")

对象代表一个区域.

在调用 [`load_translations`](#tornado.locale.load_translations "tornado.locale.load_translations") 或 [`load_gettext_translations`](#tornado.locale.load_gettext_translations "tornado.locale.load_gettext_translations") 之后, 调用 [`get`](#tornado.locale.get "tornado.locale.get") 或 [`get_closest`](#tornado.locale.Locale.get_closest "tornado.locale.Locale.get_closest") 以得到一个Locale对象.

_classmethod_ `get_closest`(_\*locale\_codes_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#Locale.get_closest)[¶](#tornado.locale.Locale.get_closest "永久链接至目标")

返回给定区域代码的最近匹配.

_classmethod_ `get`(_code_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#Locale.get)[¶](#tornado.locale.Locale.get "永久链接至目标")

返回给定区域代码的Locale.

如果这个方法不支持, 我们将抛出一个异常.

`translate`(_message_, _plural\_message=None_, _count=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#Locale.translate)[¶](#tornado.locale.Locale.translate "永久链接至目标")

返回给定信息在当前区域环境下的翻译.

如果给定了 `plural_message` , 你也必须有提供 `count`. 当 `count != 1` 时, 我们返回 `plural_message` 并且当 `count == 1` 时, 我们返回给定消息的单数形式.

`format_date`(_date_, _gmt\_offset=0_, _relative=True_, _shorter=False_, _full\_format=False_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#Locale.format_date)[¶](#tornado.locale.Locale.format_date "永久链接至目标")

格式化给定的日期(应该是GMT时间).

默认情况下, 我们返回一个相对时间(e.g., “2 minutes ago”). 你 可以返回一个绝对日期字符串通过 `relative=False` 参数.

你可以强制使用一个完整的格式化日期(“July 10, 1980”) 通过 `full_format=True` 参数.

这个方法主要用于过去的日期. 对于将来的日期, 我们退回到 全格式.

`format_day`(_date_, _gmt\_offset=0_, _dow=True_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#Locale.format_day)[¶](#tornado.locale.Locale.format_day "永久链接至目标")

将给定日期格式化为一周的某一天.

例如: “Monday, January 22”. 你可以移除星期几通过 `dow=False`.

`list`(_parts_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#Locale.list)[¶](#tornado.locale.Locale.list "永久链接至目标")

返回给定列表的一个由逗号分隔的部分.

格式是, e.g., “A, B and C”, “A and B” 或者”A”当列表长度为1.

`friendly_number`(_value_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#Locale.friendly_number)[¶](#tornado.locale.Locale.friendly_number "永久链接至目标")

返回给定整数的一个由逗号分隔的字符串.

_class_ `tornado.locale.``CSVLocale`(_code_, _translations_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#CSVLocale)[¶](#tornado.locale.CSVLocale "永久链接至目标")

区域设置使用tornado 的CSV翻译格式.

_class_ `tornado.locale.``GettextLocale`(_code_, _translations_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#GettextLocale)[¶](#tornado.locale.GettextLocale "永久链接至目标")

使用 [`gettext`](https://docs.python.org/3.4/library/gettext.html#module-gettext "(在 Python v3.4)") 模块实现Locale.

`pgettext`(_context_, _message_, _plural\_message=None_, _count=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/locale.html#GettextLocale.pgettext)[¶](#tornado.locale.GettextLocale.pgettext "永久链接至目标")

允许为翻译设置上下文, 接受复数形式.

使用示例:

pgettext("law", "right")
pgettext("good", "right")

复数信息示例:

pgettext("organization", "club", "clubs", len(clubs))
pgettext("stick", "club", "clubs", len(clubs))

为了使用上下文生成POT文件, 给第1步添加下面的选项到 [`load_gettext_translations`](#tornado.locale.load_gettext_translations "tornado.locale.load_gettext_translations") 序列:

xgettext \[basic options\] \--keyword\=pgettext:1c,2 \--keyword\=pgettext:1c,2,3

4.2 新版功能.
