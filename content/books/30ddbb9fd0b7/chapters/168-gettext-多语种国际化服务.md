**源代码：** [Lib/gettext.py](https://github.com/python/cpython/tree/3.14/Lib/gettext.py)

* * *

The `gettext` module provides internationalization (I18N) and localization (L10N) services for your Python modules and applications. It supports both the GNU **gettext** message catalog API and a higher level, class-based API that may be more appropriate for Python files. The interface described below allows you to write your module and application messages in one natural language, and provide a catalog of translated messages for running under different natural languages.

同时还给出一些本地化 Python 模块及应用程序的小技巧。

## GNU **gettext** API[¶](#gnu-gettext-api "Link to this heading")

The `gettext` module defines the following API, which is very similar to the GNU **gettext** API. If you use this API you will affect the translation of your entire application globally. Often this is what you want if your application is monolingual, with the choice of language dependent on the locale of your user. If you are localizing a Python module, or if your application needs to switch languages on the fly, you probably want to use the class-based API instead.

gettext.bindtextdomain(_domain_, _localedir\=None_)[¶](#gettext.bindtextdomain "Link to this definition")

Bind the _domain_ to the locale directory _localedir_. More concretely, `gettext` will look for binary `.mo` files for the given domain using the path (on Unix): `_localedir_/_language_/LC_MESSAGES/_domain_.mo`, where _language_ is searched for in the environment variables `LANGUAGE`, `LC_ALL`, `LC_MESSAGES`, and `LANG` respectively.

如果遗漏了 _localedir_ 或者设置为 `None`，那么将返回当前 _domain_ 所绑定的值 [\[1\]](#id3)

gettext.textdomain(_domain\=None_)[¶](#gettext.textdomain "Link to this definition")

修改或查询当前的全局域。如果 _domain_ 为 `None`，则返回当前的全局域，不为 `None` 则将全局域设置为 _domain_，并返回它。

gettext.gettext(_message_, _/_)[¶](#gettext.gettext "Link to this definition")

返回 _message_ 的本地化翻译，依据当前的全局域、语言和语言区域目录。本函数在局部命名空间中通常包含别名 `_()` (参见下面的示例)。

gettext.dgettext(_domain_, _message_, _/_)[¶](#gettext.dgettext "Link to this definition")

与 [`gettext()`](#gettext.gettext "gettext.gettext") 类似，但在指定的 _domain_ 中查找消息。

gettext.ngettext(_singular_, _plural_, _n_, _/_)[¶](#gettext.ngettext "Link to this definition")

与 [`gettext()`](#gettext.gettext "gettext.gettext") 类似，但考虑了复数形式。如果找到了翻译，则将 _n_ 代入复数公式，然后返回得出的消息（某些语言具有两种以上的复数形式）。如果未找到翻译，则 _n_ 为 1 时返回 _singular_，为其他数时返回 _plural_.

复数公式取自编目头文件。它是 C 或 Python 表达式，有一个自变量 _n_，该表达式计算的是所需复数形式在编目中的索引号。关于在 `.po` 文件中使用的确切语法和各种语言的公式，请参阅 [GNU gettext 文档](https://www.gnu.org/software/gettext/manual/gettext.html).

gettext.dngettext(_domain_, _singular_, _plural_, _n_, _/_)[¶](#gettext.dngettext "Link to this definition")

与 [`ngettext()`](#gettext.ngettext "gettext.ngettext") 类似，但在指定的 _domain_ 中查找消息。

gettext.pgettext(_context_, _message_, _/_)[¶](#gettext.pgettext "Link to this definition")

gettext.dpgettext(_domain_, _context_, _message_, _/_)[¶](#gettext.dpgettext "Link to this definition")

gettext.npgettext(_context_, _singular_, _plural_, _n_, _/_)[¶](#gettext.npgettext "Link to this definition")

gettext.dnpgettext(_domain_, _context_, _singular_, _plural_, _n_, _/_)[¶](#gettext.dnpgettext "Link to this definition")

与前缀中没有 `p` 的相应函数类似 (即 [`gettext()`](#module-gettext "gettext: Multilingual internationalization services."), [`dgettext()`](#gettext.dgettext "gettext.dgettext"), [`ngettext()`](#gettext.ngettext "gettext.ngettext"), [`dngettext()`](#gettext.dngettext "gettext.dngettext"))，但翻译限定在给定的消息 _context_ 中。

Added in version 3.8.

请注意 GNU **gettext** 还定义了一个 `dcgettext()` 方法，但它被认为并不实用因此目前尚未实现它。

这是该 API 的典型用法示例:

import gettext
gettext.bindtextdomain('myapplication', '/path/to/my/language/directory')
gettext.textdomain('myapplication')
\_ \= gettext.gettext
\# ...
print(\_('This is a translatable string.'))

## 基于类的 API[¶](#class-based-api "Link to this heading")

The class-based API of the `gettext` module gives you more flexibility and greater convenience than the GNU **gettext** API. It is the recommended way of localizing your Python applications and modules. `gettext` defines a [`GNUTranslations`](#gettext.GNUTranslations "gettext.GNUTranslations") class which implements the parsing of GNU `.mo` format files, and has methods for returning strings. Instances of this class can also install themselves in the built-in namespace as the function `_()`.

gettext.find(_domain_, _localedir\=None_, _languages\=None_, _all\=False_)[¶](#gettext.find "Link to this definition")

本函数实现了标准的 `.mo` 文件搜索算法。它接受一个 _domain_，它与 [`textdomain()`](#gettext.textdomain "gettext.textdomain") 接受的域相同。可选参数 _localedir_ 与 [`bindtextdomain()`](#gettext.bindtextdomain "gettext.bindtextdomain") 中的相同。可选参数 _languages_ 是多条字符串的列表，其中每条字符串都是一种语言代码。

如果没有传入 _localedir_，则使用默认的系统语言环境目录。 [\[2\]](#id4) 如果没有传入 _languages_，则搜索以下环境变量：`LANGUAGE`、`LC_ALL`、`LC_MESSAGES` 和 `LANG`。从这些变量返回的第一个非空值将用作 _languages_ 变量。环境变量应包含一个语言列表，由冒号分隔，该列表会被按冒号拆分，以产生所需的语言代码字符串列表。

[`find()`](#gettext.find "gettext.find") 将扩展并规范化 language，然后遍历它们，搜索由这些组件构建的现有文件：

`_localedir_/_language_/LC_MESSAGES/_domain_.mo`

[`find()`](#gettext.find "gettext.find") 返回找到类似的第一个文件名。如果找不到这样的文件，则返回 `None`。如果传入了 _all_，它将返回一个列表，包含所有文件名，并按它们在语言列表或环境变量中出现的顺序排列。

gettext.translation(_domain_, _localedir\=None_, _languages\=None_, _class\_\=None_, _fallback\=False_)[¶](#gettext.translation "Link to this definition")

根据 _domain_, _localedir_ 和 _languages_ 返回一个 `*Translations` 实例，它们将首先被传给 [`find()`](#gettext.find "gettext.find") 以获取由所关联的 `.mo` 文件路径组成的列表。具有相同 `.mo` 文件名的实例会被缓存。 如果提供了 _class\__ 则它将是被实例化的类，否则将是 [`GNUTranslations`](#gettext.GNUTranslations "gettext.GNUTranslations")。该类的构造器必须接受一个 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) 参数。

如果找到多个文件，后找到的文件将用作先前文件的替补。为了设置替补，将使用 [`copy.copy()`](https://docs.python.org/zh-cn/3/library/copy.html#copy.copy "copy.copy") 从缓存中克隆每个 translation 对象。实际的实例数据仍在缓存中共享。

如果 `.mo` 文件未找到，且 _fallback_ 为 false（默认值），则本函数引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 异常，如果 _fallback_ 为 true，则返回一个 [`NullTranslations`](#gettext.NullTranslations "gettext.NullTranslations") 实例。

在 3.11 版本发生变更: _codeset_ 形参已被移除。

gettext.install(_domain_, _localedir\=None_, _\*_, _names\=None_)[¶](#gettext.install "Link to this definition")

这将在 Python 的内置命名空间中安装 `_()` 函数，基于传给 [`translation()`](#gettext.translation "gettext.translation") 函数的 _domain_ 和 _localedir_.

_names_ 参数的信息请参阅 translation 对象的 [`install()`](#gettext.NullTranslations.install "gettext.NullTranslations.install") 方法的描述。

如下所示，通常是将字符串包裹在对 `_()` 函数的调用中，以标记应用程序中待翻译的字符串，就像这样:

print(\_('This string will be translated.'))

为了方便，可将 `_()` 函数安装在 Python 的内置命名空间中，这样就可以在应用程序的所有模块中轻松地访问它。

在 3.11 版本发生变更: _names_ 现在是仅限关键字形参。

### [`NullTranslations`](#gettext.NullTranslations "gettext.NullTranslations") 类[¶](#the-nulltranslations-class "Link to this heading")

translation 类实际实现的是，将原始源文件消息字符串转换为已翻译的消息字符串。所有 translation 类使用的基类为 [`NullTranslations`](#gettext.NullTranslations "gettext.NullTranslations")，它提供了基本的接口，可用于编写自己定制的 translation 类。以下是 `NullTranslations` 的方法：

_class_ gettext.NullTranslations(_fp\=None_)[¶](#gettext.NullTranslations "Link to this definition")

接受一个可选参数 [文件对象](https://docs.python.org/zh-cn/3/glossary.html#term-file-object) _fp_，该参数会被基类忽略。初始化由派生类设置的 "protected" （受保护的）实例变量 _\_info_ 和 _\_charset_，以及 _\_fallback_，后者是通过 [`add_fallback()`](#gettext.NullTranslations.add_fallback "gettext.NullTranslations.add_fallback") 来设置的。如果 _fp_ 不为 `None`，就会调用 `self._parse(fp)`。

\_parse(_fp_)[¶](#gettext.NullTranslations._parse "Link to this definition")

在基类中没有操作，本方法接受文件对象 _fp_，从该文件读取数据，用来初始化消息编目。如果你手头的消息编目文件的格式不受支持，则应重写本方法来解析你的格式。

add\_fallback(_fallback_)[¶](#gettext.NullTranslations.add_fallback "Link to this definition")

添加 _fallback_ 为当前 translation 对象的替补对象。如果 translation 对象无法为指定消息提供翻译，则应向替补查询。

gettext(_message_, _/_)[¶](#gettext.NullTranslations.gettext "Link to this definition")

如果设置了替补，则转发 `gettext()` 给替补。否则返回 _message_。在派生类中被重写。

ngettext(_singular_, _plural_, _n_, _/_)[¶](#gettext.NullTranslations.ngettext "Link to this definition")

如果设置了替补，则转发 `ngettext()` 给替补。否则，_n_ 为 1 时返回 _singular_，为其他时返回 _plural_。在派生类中被重写。

pgettext(_context_, _message_, _/_)[¶](#gettext.NullTranslations.pgettext "Link to this definition")

如果设置了替补，则转发 [`pgettext()`](#gettext.pgettext "gettext.pgettext") 给替补。否则返回已翻译的消息。在派生类中被重写。

Added in version 3.8.

npgettext(_context_, _singular_, _plural_, _n_, _/_)[¶](#gettext.NullTranslations.npgettext "Link to this definition")

如果设置了替补，则转发 [`npgettext()`](#gettext.npgettext "gettext.npgettext") 给替补。否则返回已翻译的消息。在派生类中被重写。

Added in version 3.8.

info()[¶](#gettext.NullTranslations.info "Link to this definition")

返回一个包含在消息编目文件中找到的元数据的字典。

charset()[¶](#gettext.NullTranslations.charset "Link to this definition")

返回消息编目文件的编码。

install(_names\=None_)[¶](#gettext.NullTranslations.install "Link to this definition")

本方法将 [`gettext()`](#gettext.NullTranslations.gettext "gettext.NullTranslations.gettext") 安装至内建命名空间，并绑定为 `_`。

如果给出了 _names_ 形参，则它必须是一个包含除 `_()` 外需要在内置命名空间中安装的函数的名称的序列。受支持的名称有 `'gettext'`, `'ngettext'`, `'pgettext'` 和 `'npgettext'`。

请注意这只是将 `_()` 函数提供给应用程序的一种方式，尽管也是最方便的方式。 由于它会全局性地影响整个应用程序，特别是内置命名空间，因此本地化的模块绝不应安装 `_()`。作为替代，它们应使用以下代码使 `_()` 可用于它们的模块:

import gettext
t \= gettext.translation('mymodule', ...)
\_ \= t.gettext

这样只把 `_()` 放在模块的全局命名空间中所以只会影响该模块内的调用。

在 3.8 版本发生变更: 添加了 `'pgettext'` 和 `'npgettext'`。

### [`GNUTranslations`](#gettext.GNUTranslations "gettext.GNUTranslations") 类[¶](#the-gnutranslations-class "Link to this heading")

`gettext` 模块提供了一个派生自 [`NullTranslations`](#gettext.NullTranslations "gettext.NullTranslations") 的附加类：[`GNUTranslations`](#gettext.GNUTranslations "gettext.GNUTranslations")。该类重写了 `_parse()` 以同时支持以大端序和小端序格式读取 GNU **gettext** 格式的 `.mo` 文件。

[`GNUTranslations`](#gettext.GNUTranslations "gettext.GNUTranslations") 会从翻译编目中解析可选的元数据。根据惯例 GNU **gettext** 会以空字符串翻译的形式包括元数据。该元数据使用 [**RFC 822**](https://datatracker.ietf.org/doc/html/rfc822.html) 风格的 `key: value` 对，并且应当包含 `Project-Id-Version` 键。如果找到了 `Content-Type` 键，则将使用 `charset` 属性来初始化 `_charset` 实例变量，如未找到则默认为 `None`。如果指定了 charset 编码格式，则从编目中读取的所有消息 ID 和消息字符串都将使用该编码格式转换为 Unicode，否则会设定使用 ASCII。

由于消息 ID 也是以 Unicode 字符串的形式读取的，因此所有 `*gettext()` 方法都会假定消息 ID 为 Unicode 字符串，而不是字节串。

整个键/值对集合将被放入一个字典并设置为 "protected" `_info` 实例变量。

如果 `.mo` 文件的魔法值 (magic number) 无效，或遇到意外的主版本号，或在读取文件时发生其他问题，则实例化 [`GNUTranslations`](#gettext.GNUTranslations "gettext.GNUTranslations") 类会引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError")。

_class_ gettext.GNUTranslations[¶](#gettext.GNUTranslations "Link to this definition")

下列方法是根据基类实现重写的：

gettext(_message_, _/_)[¶](#gettext.GNUTranslations.gettext "Link to this definition")

在编目中查找 _message_ ID，并以 Unicode 字符串形式返回相应的消息字符串。如果在编目中没有 _message_ ID 条目，且配置了替补，则查找请求将被转发到替补的 [`gettext()`](#gettext.NullTranslations.gettext "gettext.NullTranslations.gettext") 方法。否则，返回 _message_ ID.

ngettext(_singular_, _plural_, _n_, _/_)[¶](#gettext.GNUTranslations.ngettext "Link to this definition")

查找消息 ID 的复数形式。_singular_ 用作消息 ID，用于在编目中查找，同时 _n_ 用于确定使用哪种复数形式。返回的消息字符串是 Unicode 字符串。

如果在编目中没有找到消息 ID，且配置了替补，则查找请求将被转发到替补的 [`ngettext()`](#gettext.NullTranslations.ngettext "gettext.NullTranslations.ngettext") 方法。否则，当 _n_ 为 1 时返回 _singular_，其他情况返回 _plural_。

例如：

n \= len(os.listdir('.'))
cat \= GNUTranslations(somefile)
message \= cat.ngettext(
    'There is %(num)d file in this directory',
    'There are %(num)d files in this directory',
    n) % {'num': n}

pgettext(_context_, _message_, _/_)[¶](#gettext.GNUTranslations.pgettext "Link to this definition")

在编目中查找 _context_ 和 _message_ ID，并以 Unicode 字符串形式返回相应的消息字符串。如果在编目中没有 _message_ ID 和 _context_ 条目，且配置了替补，则查找请求将被转发到替补的 [`pgettext()`](#gettext.pgettext "gettext.pgettext") 方法。否则，返回 _message_ ID.

Added in version 3.8.

npgettext(_context_, _singular_, _plural_, _n_, _/_)[¶](#gettext.GNUTranslations.npgettext "Link to this definition")

查找消息 ID 的复数形式。_singular_ 用作消息 ID，用于在编目中查找，同时 _n_ 用于确定使用哪种复数形式。

如果在编目中没有找到 _context_ 对应的消息 ID，且配置了替补，则查找请求将被转发到替补的 [`npgettext()`](#gettext.npgettext "gettext.npgettext") 方法。否则，当 _n_ 为 1 时返回 _singular_，其他情况返回 _plural_。

Added in version 3.8.

### Solaris 消息编目支持[¶](#solaris-message-catalog-support "Link to this heading")

Solaris 操作系统定义了自己的二进制 `.mo` 文件格式，但由于找不到该格式的文档，因此目前不支持该格式。

### 编目构造器[¶](#the-catalog-constructor "Link to this heading")

GNOME uses a version of the `gettext` module by James Henstridge, but this version has a slightly different API. Its documented usage was:

import gettext
cat \= gettext.Catalog(domain, localedir)
\_ \= cat.gettext
print(\_('hello world'))

为了与此模块的旧版本兼容，函数 `Catalog()` 是上述 [`translation()`](#gettext.translation "gettext.translation") 函数的别名。

本模块与 Henstridge 的模块有一个区别：他的编目对象支持通过映射 API 进行访问，但是该特性似乎从未使用过，因此目前不支持该特性。

## 国际化 (I18N) 你的程序和模块[¶](#internationalizing-your-programs-and-modules "Link to this heading")

国际化 (I18N) 是指使程序可切换多种语言的操作。本地化 (L10N) 是指程序的适配能力，一旦程序被国际化，就能适配当地的语言和文化习惯。为了向 Python 程序提供不同语言的消息，需要执行以下步骤：

1.  准备程序或模块，将可翻译的字符串特别标记起来
    
2.  在已标记的文件上运行一套工具，用来生成原始消息编目
    
3.  创建消息编目的不同语言的翻译
    
4.  use the `gettext` module so that message strings are properly translated
    

为了准备代码以实现 I18N，你需要查看文件中的所有字符串。任何需要翻译的字符串都应通过包裹在 `_('...')` 中来进行标记 --- 即调用函数 [`_`](#module-gettext "gettext: Multilingual internationalization services.")。例如:

filename \= 'mylog.txt'
message \= \_('writing a log message')
with open(filename, 'w') as fp:
    fp.write(message)

在这个例子中，字符串 `'writing a log message'` 被标记为待翻译，而字符串 `'mylog.txt'` 和 `'w'` 没有被标记。

有一些工具可以将待翻译的字符串提取出来。原版的 GNU **gettext** 仅支持 C 或 C++ 源代码，但其扩展版 **xgettext** 可以扫描多种语言的代码，包括 Python 在内，来找出标记为可翻译的字符串。[Babel](https://babel.pocoo.org/) 是一个包括了可用于提取并编译消息编目的 `pybabel` 脚本的 Python 国际化库。François Pinard 的 **xpot** 程序也能完成类似的工作并可在他的 [po-utils 包](https://github.com/pinard/po-utils) 中获取。

（Python 还包括了这些程序的纯 Python 版本，称为 **pygettext.py** 和 **msgfmt.py**，某些 Python 发行版已经安装了它们。**pygettext.py** 类似于 **xgettext**，但只能理解 Python 源代码，无法处理诸如 C 或 C++ 的其他编程语言。**pygettext.py** 支持的命令行界面类似于 **xgettext**，查看其详细用法请运行 `pygettext.py --help`。**msgfmt.py** 与 GNU **msgfmt** 是二进制兼容的。有了这两个程序，可以不需要 GNU **gettext** 包来国际化 Python 应用程序。）

**xgettext**、**pygettext** 或类似工具生成的 `.po` 文件就是消息编目。它们是结构化的人类可读文件，包含源代码中所有被标记的字符串，以及这些字符串的翻译的占位符。

Copies of these `.po` files are then handed over to the individual human translators who write translations for every supported natural language. They send back the completed language-specific versions as a `<language-name>.po` file that's compiled into a machine-readable `.mo` binary catalog file using the **msgfmt** program. The `.mo` files are used by the `gettext` module for the actual translation processing at run-time.

How you use the `gettext` module in your code depends on whether you are internationalizing a single module or your entire application. The next two sections will discuss each case.

### 本地化你的模块[¶](#localizing-your-module "Link to this heading")

如果要本地化模块，则切忌进行全局性的更改，如更改内建命名空间。不应使用 GNU **gettext** API，而应使用基于类的 API。

假设你的模块叫做 "spam"，并且该模块的各种自然语言翻译 `.mo` 文件存放于 `/usr/share/locale`，为 GNU **gettext** 格式。以下内容应放在模块顶部:

import gettext
t \= gettext.translation('spam', '/usr/share/locale')
\_ \= t.gettext

### 本地化你的应用程序[¶](#localizing-your-application "Link to this heading")

如果你正在本地化你的应用程序，你可以将 `_()` 函数全局安装到内置命名空间中，通常位于应用程序的主驱动文件内。 这样将让你的应用程序专属的所有文件都可以使用 `_('...')` 而无需在每个文件中显式安装它。

最简单的情况，就只需将以下代码添加到应用程序的主程序文件中:

import gettext
gettext.install('myapplication')

如果需要设置语言环境目录，可以将其传递给 [`install()`](#gettext.install "gettext.install") 函数:

import gettext
gettext.install('myapplication', '/usr/share/locale')

### 即时更改语言[¶](#changing-languages-on-the-fly "Link to this heading")

如果程序需要同时支持多种语言，则可能需要创建多个翻译实例，然后在它们之间进行显式切换，如下所示:

import gettext

lang1 \= gettext.translation('myapplication', languages\=\['en'\])
lang2 \= gettext.translation('myapplication', languages\=\['fr'\])
lang3 \= gettext.translation('myapplication', languages\=\['de'\])

\# 从使用语言 1 开始
lang1.install()

\# ... 过一段时间后，用户选择了语言 2
lang2.install()

\# ... 再过一段时间后，用户选择了语言 3
lang3.install()

### 延迟翻译[¶](#deferred-translations "Link to this heading")

在大多数代码中，字符串会在编写位置进行翻译。但偶尔需要将字符串标记为待翻译，实际翻译却推迟到后面。一个典型的例子是:

animals \= \['mollusk',
           'albatross',
           'rat',
           'penguin',
           'python', \]
\# ...
for a in animals:
    print(a)

此处希望将 `animals` 列表中的字符串标记为可翻译，但不希望在打印之前对它们进行翻译。

这是处理该情况的一种方式:

def \_(message): return message

animals \= \[\_('mollusk'),
           \_('albatross'),
           \_('rat'),
           \_('penguin'),
           \_('python'), \]

del \_

\# ...
for a in animals:
    print(\_(a))

这样做是因为 `_()` 的虚定义只是简单地原样返回字符串。并且这个虚定义将临时覆盖内置命名空间中任何的 `_()` 定义（直到 [`del`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#del) 命令）。但是如果之前你在局部命名空间中已有 `_()` 的定义，则需要特别注意。

请注意在第二次使用 `_()` 时将不会认为“a”可以由 **gettext** 程序去翻译，因为该形参不是字符串字面值。

解决该问题的另一种方法是下面这个例子:

def N\_(message): return message

animals \= \[N\_('mollusk'),
           N\_('albatross'),
           N\_('rat'),
           N\_('penguin'),
           N\_('python'), \]

\# ...
for a in animals:
    print(\_(a))

在这种情况下，你用函数 `N_()` 来标记可翻译的字符串，它与 `_()` 的任何定义都不会冲突。 不过，你需要让你的消息提取程序寻找用 `N_()` 标记的可翻译字符串。 **xgettext**, **pygettext**, `pybabel extract` 和 **xpot** 都通过使用 `-k` 命令行开关来支持此功能。这里选择用 `N_()` 完全是任意的；它也可以简单地改为 `MarkThisStringForTranslation()`.

## 致谢[¶](#acknowledgements "Link to this heading")

以下人员为创建此模块贡献了代码、反馈、设计建议、早期实现和宝贵的经验：

-   Peter Funk
    
-   James Henstridge
    
-   Juan David Ibáñez Palomar
    
-   Marc-André Lemburg
    
-   Martin von Löwis
    
-   François Pinard
    
-   Barry Warsaw
    
-   Gustavo Niemeyer
    

备注
