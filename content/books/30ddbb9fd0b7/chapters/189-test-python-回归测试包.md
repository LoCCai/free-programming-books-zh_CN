备注

`test` 包被设计为仅供 Python 内部使用。 将它写入文档是为了服务 Python 的核心开发者。 不建议在 Python 的标准库之外使用这个包因为这里涉及的代码可能在 Python 的不同发布版中被改变或移除而不预先通知。

* * *

在 `test` 包中包含所有针对 Python 的回归测试以及 [`test.support`](#module-test.support "test.support: Support for Python's regression test suite.") 和 [`test.regrtest`](#module-test.regrtest "test.regrtest: Drives the regression test suite.") 模块。 `test.support` 用于增强你的测试而 `test.regrtest` 用于驱动测试套件。

`test` 包中每个名字以 `test_` 开头的模块都是一个特定模块或功能的测试套件。 所有新的测试都应该使用 [`unittest`](https://docs.python.org/zh-cn/3/library/unittest.html#module-unittest "unittest: Unit testing framework for Python.") 或 [`doctest`](https://docs.python.org/zh-cn/3/library/doctest.html#module-doctest "doctest: Test pieces of code within docstrings.") 模块来编写。 一些较旧的测试是使用“传统”测试风格编写的，即比较打印到 `sys.stdout` 的输出；这种测试风格被视为已弃用。

## 为 `test` 编写单元测试[¶](#writing-unit-tests-for-the-test-package "Link to this heading")

使用 [`unittest`](https://docs.python.org/zh-cn/3/library/unittest.html#module-unittest "unittest: Unit testing framework for Python.") 模块的测试最好是遵循一些准则。其中一条是测试模块的名称要以 `test_` 打头并以被测试模块的名称结尾。 测试模块中的测试方法应当以 `test_` 打头并以该方法所测试的内容的说明结尾。这很有必要因为这样测试驱动程序就会将这些方法识别为测试方法。 此外，该方法不应当包括任何文档字符串。应当使用注释 (例如 `# Tests function returns only True or False`) 来为测试方法提供文档说明。这样做是因为文档字符串如果存在则会被打印出来因此无法指明正在运行哪个测试。

有一个基本模板经常会被使用:

import unittest
from test import support

class MyTestCase1(unittest.TestCase):

    \# 仅在需要时使用 setUp() 和 tearDown()

    def setUp(self):
        ... 为准备测试而执行的代码 ...

    def tearDown(self):
        ... 为测试后的清理而执行的代码 ...

    def test\_feature\_one(self):
        \# 测试特性一。
        ... 测试代码 ...

    def test\_feature\_two(self):
        \# 测试特性二。
        ... 测试代码 ...

    ... 更多的测试方法 ...

class MyTestCase2(unittest.TestCase):
    ... 与 MyTestCase1 的结构相同 ...

... 更多的测试类 ...

if \_\_name\_\_ \== '\_\_main\_\_':
    unittest.main()

这种代码模式允许测试套件由 [`test.regrtest`](#module-test.regrtest "test.regrtest: Drives the regression test suite.") 运行，作为支持 [`unittest`](https://docs.python.org/zh-cn/3/library/unittest.html#module-unittest "unittest: Unit testing framework for Python.") CLI 的脚本单独运行，或者通过 `python -m unittest` CLI 来运行。

回归测试的目标是尝试破坏代码。这引出了一些需要遵循的准则：

-   测试套件应当测试所有的类、函数和常量。这不仅包括要向外界展示的外部 API 也包括“私有”的代码。
    
-   白盒测试（在编写测试时检查被测试的代码）是最推荐的。黑盒测试（只测试已发布的用户接口）因不够完整而不能确保所有边界和边缘情况都被测试到。
    
-   确保所有可能的值包括无效的值都被测试到。这能确保不仅全部的有效值都可被接受而且不适当的值也能被正确地处理。
    
-   覆盖尽可能多的代码路径。测试发生分支的地方从而调整输入以确保通过代码采取尽可能多的不同路径。
    
-   为受测试的代码所发现的任何代码缺陷添加明确的测试。这将确保如果代码在将来被改变错误也不会再次出现。
    
-   确保在你的测试完成后执行清理（例如关闭并删除所有临时文件）。
    
-   如果某个测试依赖于操作系统上的特定条件那么要在尝试测试之前先验证该条件是否已存在。
    
-   尽可能少地导入模块并尽可能快地完成操作。这可以最大限度地减少测试的外部依赖性并且还可以最大限度地减少导入模块带来的附带影响所导致的异常行为。
    
-   尝试最大限度地重用代码。在某些情况下，测试结果会因使用不同类型的输入这样的小细节而变化。 可通过一个指定输入的类来子类化一个基本测试类来最大限度地减少重复代码:
    
    class TestFuncAcceptsSequencesMixin:
    
        func \= mySuperWhammyFunction
    
        def test\_func(self):
            self.func(self.arg)
    
    class AcceptLists(TestFuncAcceptsSequencesMixin, unittest.TestCase):
        arg \= \[1, 2, 3\]
    
    class AcceptStrings(TestFuncAcceptsSequencesMixin, unittest.TestCase):
        arg \= 'abc'
    
    class AcceptTuples(TestFuncAcceptsSequencesMixin, unittest.TestCase):
        arg \= (1, 2, 3)
    
    当使用这种模式时，请记住所有继承自 [`unittest.TestCase`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase "unittest.TestCase") 的类都会作为测试来运行。上面例子中的 `TestFuncAcceptsSequencesMixin` 类没有任何数据所以其本身是无法运行的，因此它不是继承自 `unittest.TestCase`.
    

参见

测试驱动的开发

Kent Beck 所著的阐述在实现代码之前编写测试的书。

## 使用命令行界面运行测试[¶](#module-test.regrtest "Link to this heading")

`test` 包可以作为脚本运行以驱动 Python 的回归测试套件，即使用 [`-m`](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-m) 选项: **python -m test**。 在内部，它会使用 `test.regrtest`；在之前的 Python 版本中使用的 **python -m test.regrtest** 调用仍然有效。 运行该脚本自身将自动开始运行 `test` 包中的所有回归测试。 它是通过在包中查找所有名称以 `test_` 打头的模块，导入它们，并在有 `test_main()` 函数时执行它或是在没有 `test_main` 时通过 unittest.TestLoader.loadTestsFromModule 载入测试完成此功能的。 要执行的测试的名称也可以被传递给脚本。 指定一个单独的回归测试 (**python -m test test\_spam**) 将使输出最小化并且只打印测试通过或失败的消息。

直接运行 `test` 将允许设置哪些资源可供测试使用。 你可以通过使用 `-u` 命令行选项来做到这一点。 指定 `all` 作为 `-u` 选项的值将启用所有可能的资源: **python -m test -uall**。 如果只需要一项资源（这是更为常见的情况），可以在 `all` 之后加一个以逗号分隔的列表来指明不需要的资源。 命令 **python -m test -uall,-audio,-largefile** 将运行 `test` 并使用除 `audio` 和 `largefile` 资源之外的所有资源。 要查看所有资源的列表和更多的命令行选项，请运行 **python -m test -h**。

另外一些执行回归测试的方式依赖于执行测试所在的系统平台。在 Unix 上，你可以在构建 Python 的最高层级目录中运行 **make test**。在 Windows 上，在你的 `PCbuild` 目录中执行 **rt.bat** 将运行所有的回归测试。

Added in version 3.14: 输出在默认情况下是彩色的并且可以 [使用环境变量控制](https://docs.python.org/zh-cn/3/using/cmdline.html#using-on-controlling-color)。

## `test.support` --- 针对 Python 测试套件的工具[¶](#module-test.support "Link to this heading")

`test.support` 模块提供了对 Python 的回归测试套件的支持。

备注

`test.support` 不是一个公用模块。 它被写入本文档是为了帮助 Python 开发者编写测试。 此模块的 API 可能被修改而不会考虑发布版之间的向下兼容性问题。

此模块定义了以下异常：

_exception_ test.support.TestFailed[¶](#test.support.TestFailed "Link to this definition")

当一个测试失败时将被引发的异常。此异常已被弃用而应改用基于 [`unittest`](https://docs.python.org/zh-cn/3/library/unittest.html#module-unittest "unittest: Unit testing framework for Python.") 的测试以及 [`unittest.TestCase`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase "unittest.TestCase") 的断言方法。

_exception_ test.support.ResourceDenied[¶](#test.support.ResourceDenied "Link to this definition")

[`unittest.SkipTest`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.SkipTest "unittest.SkipTest") 的子类。当一个资源（例如网络连接）不可用时将被引发。由 [`requires()`](#test.support.requires "test.support.requires") 函数所引发。

`test.support` 模块定义了下列常量：

test.support.verbose[¶](#test.support.verbose "Link to this definition")

当启用详细输出时为 `True`。当需要有关运行中的测试的更详细信息时应当被选择。 _verbose_ 是由 [`test.regrtest`](#module-test.regrtest "test.regrtest: Drives the regression test suite.") 来设置的。

test.support.is\_jython[¶](#test.support.is_jython "Link to this definition")

如果所运行的解释器是 Jython 时为 `True`。

test.support.is\_android[¶](#test.support.is_android "Link to this definition")

如果 `sys.platform` 是 `android` 则为 `True`。

test.support.is\_emscripten[¶](#test.support.is_emscripten "Link to this definition")

如果 `sys.platform` 是 `emscripten` 则为 `True`。

test.support.is\_wasi[¶](#test.support.is_wasi "Link to this definition")

如果 `sys.platform` 是 `wasi` 则为 `True`。

test.support.is\_apple\_mobile[¶](#test.support.is_apple_mobile "Link to this definition")

如果 `sys.platform` 是 `ios`, `tvos` 或 `watchos` 则为 `True`。

test.support.is\_apple[¶](#test.support.is_apple "Link to this definition")

如果 `sys.platform` 是 `darwin` 或者 `is_apple_mobile` 是 `True` 则为 `True`.

test.support.unix\_shell[¶](#test.support.unix_shell "Link to this definition")

如果系统不是 Windows 时则为 shell 的路径；否则为 `None`。

test.support.LOOPBACK\_TIMEOUT[¶](#test.support.LOOPBACK_TIMEOUT "Link to this definition")

使用网络服务器监听网络本地环回接口如 `127.0.0.1` 的测试的以秒为单位的超时值。

该超时长到足以防止测试失败：它要考虑客户端和服务器可能会在不同线程甚至不同进程中运行。

该超时应当对于 [`socket.socket`](https://docs.python.org/zh-cn/3/library/socket.html#socket.socket "socket.socket") 的 [`connect()`](https://docs.python.org/zh-cn/3/library/socket.html#socket.socket.connect "socket.socket.connect"), [`recv()`](https://docs.python.org/zh-cn/3/library/socket.html#socket.socket.recv "socket.socket.recv") 和 [`send()`](https://docs.python.org/zh-cn/3/library/socket.html#socket.socket.send "socket.socket.send") 方法都足够长。

其默认值为 10 秒。

参见 [`INTERNET_TIMEOUT`](#test.support.INTERNET_TIMEOUT "test.support.INTERNET_TIMEOUT")。

test.support.INTERNET\_TIMEOUT[¶](#test.support.INTERNET_TIMEOUT "Link to this definition")

发往互联网的网络请求的以秒为单位的超时值。

该超时短到足以避免测试在互联网请求因任何原因被阻止时等待太久。

通常使用 [`INTERNET_TIMEOUT`](#test.support.INTERNET_TIMEOUT "test.support.INTERNET_TIMEOUT") 的超时不应该将测试标记为失败，而是跳过测试：参见 [`transient_internet()`](#test.support.socket_helper.transient_internet "test.support.socket_helper.transient_internet").

其默认值是 1 分钟。

参见 [`LOOPBACK_TIMEOUT`](#test.support.LOOPBACK_TIMEOUT "test.support.LOOPBACK_TIMEOUT")。

test.support.SHORT\_TIMEOUT[¶](#test.support.SHORT_TIMEOUT "Link to this definition")

如果测试耗时“太长”而要将测试标记为失败的以秒为单位的超时值。

该超时值取决于 regrtest `--timeout` 命令行选项。

如果一个使用 [`SHORT_TIMEOUT`](#test.support.SHORT_TIMEOUT "test.support.SHORT_TIMEOUT") 的测试在慢速 buildbots 上开始随机失败，请使用 [`LONG_TIMEOUT`](#test.support.LONG_TIMEOUT "test.support.LONG_TIMEOUT") 来代替。

其默认值为 30 秒。

test.support.LONG\_TIMEOUT[¶](#test.support.LONG_TIMEOUT "Link to this definition")

用于检测测试何时挂起的以秒为单位的超时值。

它的长度足够在最慢的 Python buildbot 上降低测试失败的风险。如果测试耗时“过长”也不应当用它将该测试标记为失败。此超时值依赖于 regrtest `--timeout` 命令行选项。

其默认值为 5 分钟。

另请参见 [`LOOPBACK_TIMEOUT`](#test.support.LOOPBACK_TIMEOUT "test.support.LOOPBACK_TIMEOUT"), [`INTERNET_TIMEOUT`](#test.support.INTERNET_TIMEOUT "test.support.INTERNET_TIMEOUT") 和 [`SHORT_TIMEOUT`](#test.support.SHORT_TIMEOUT "test.support.SHORT_TIMEOUT").

test.support.PGO[¶](#test.support.PGO "Link to this definition")

当测试对 PGO 没有用处时设置是否要跳过测试。

test.support.PIPE\_MAX\_SIZE[¶](#test.support.PIPE_MAX_SIZE "Link to this definition")

一个通常大于下层 OS 管道缓冲区大小的常量，以产生写入阻塞。

test.support.Py\_DEBUG[¶](#test.support.Py_DEBUG "Link to this definition")

如果 Python 编译时定义了 [`Py_DEBUG`](https://docs.python.org/zh-cn/3/c-api/intro.html#c.Py_DEBUG "Py_DEBUG") 宏则为 `True`，也就是说，当 Python 是 [以调试模式编译](https://docs.python.org/zh-cn/3/using/configure.html#debug-build) 的时候。

Added in version 3.12.

test.support.SOCK\_MAX\_SIZE[¶](#test.support.SOCK_MAX_SIZE "Link to this definition")

一个通常大于下层 OS 套接字缓冲区大小的常量，以产生写入阻塞。

test.support.TEST\_SUPPORT\_DIR[¶](#test.support.TEST_SUPPORT_DIR "Link to this definition")

设为包含 `test.support` 的最高层级目录。

test.support.TEST\_HOME\_DIR[¶](#test.support.TEST_HOME_DIR "Link to this definition")

设为 test 包的最高层级目录。

test.support.TEST\_DATA\_DIR[¶](#test.support.TEST_DATA_DIR "Link to this definition")

设为 test 包中的 `data` 目录。

test.support.MAX\_Py\_ssize\_t[¶](#test.support.MAX_Py_ssize_t "Link to this definition")

设为大内存测试的 [`sys.maxsize`](https://docs.python.org/zh-cn/3/library/sys.html#sys.maxsize "sys.maxsize")。

test.support.max\_memuse[¶](#test.support.max_memuse "Link to this definition")

通过 [`set_memlimit()`](#test.support.set_memlimit "test.support.set_memlimit") 设为针对大内存测试的内存限制。受 [`MAX_Py_ssize_t`](#test.support.MAX_Py_ssize_t "test.support.MAX_Py_ssize_t") 的限制。

test.support.real\_max\_memuse[¶](#test.support.real_max_memuse "Link to this definition")

通过 [`set_memlimit()`](#test.support.set_memlimit "test.support.set_memlimit") 设为针对大内存测试的内存限制。不受 [`MAX_Py_ssize_t`](#test.support.MAX_Py_ssize_t "test.support.MAX_Py_ssize_t") 的限制。

test.support.MISSING\_C\_DOCSTRINGS[¶](#test.support.MISSING_C_DOCSTRINGS "Link to this definition")

如果 Python 编译时不带文档字符串（即未定义 `WITH_DOC_STRINGS` 宏）则设为 `True`。参见 [`configure --without-doc-strings`](https://docs.python.org/zh-cn/3/using/configure.html#cmdoption-without-doc-strings) 选项。

另请参阅 [`HAVE_DOCSTRINGS`](#test.support.HAVE_DOCSTRINGS "test.support.HAVE_DOCSTRINGS") 变量。

test.support.HAVE\_DOCSTRINGS[¶](#test.support.HAVE_DOCSTRINGS "Link to this definition")

如果函数带有文档字符串则设为 `True`。参见 [`python -OO`](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-O) 选项，该选项会去除在 Python 中实现的函数的文档字符串。

另请参阅 [`MISSING_C_DOCSTRINGS`](#test.support.MISSING_C_DOCSTRINGS "test.support.MISSING_C_DOCSTRINGS") 变量。

test.support.TEST\_HTTP\_URL[¶](#test.support.TEST_HTTP_URL "Link to this definition")

定义用于网络测试的专用 HTTP 服务器的 URL。

test.support.ALWAYS\_EQ[¶](#test.support.ALWAYS_EQ "Link to this definition")

等于任何对象的对象。用于测试混合类型比较。

test.support.NEVER\_EQ[¶](#test.support.NEVER_EQ "Link to this definition")

不等于任何对象的对象 (即使是 [`ALWAYS_EQ`](#test.support.ALWAYS_EQ "test.support.ALWAYS_EQ"))。用于测试混合类型比较。

test.support.LARGEST[¶](#test.support.LARGEST "Link to this definition")

大于任何对象的对象（除了其自身）。用于测试混合类型比较。

test.support.SMALLEST[¶](#test.support.SMALLEST "Link to this definition")

小于任何对象的对象（除了其自身）。用于测试混合类型比较。

`test.support` 模块定义了下列函数：

test.support.busy\_retry(_timeout_, _err\_msg\=None_, _/_, _\*_, _error\=True_)[¶](#test.support.busy_retry "Link to this definition")

运行循环体直到以 `break` 停止循环。

在 _timeout_ 秒后，如果 _error_ 为真值则引发 [`AssertionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#AssertionError "AssertionError")，或者如果 _error_ 为假值则只停止循环。

示例:

for \_ in support.busy\_retry(support.SHORT\_TIMEOUT):
    if check():
        break

error=False 的用法示例:

for \_ in support.busy\_retry(support.SHORT\_TIMEOUT, error\=False):
    if check():
        break
else:
    raise RuntimeError('my custom error')

test.support.sleeping\_retry(_timeout_, _err\_msg\=None_, _/_, _\*_, _init\_delay\=0.010_, _max\_delay\=1.0_, _error\=True_)[¶](#test.support.sleeping_retry "Link to this definition")

应用指数回退的等待策略。

运行循环体直到以 `break` 停止循环。在每次循环迭代时休眠，但第一次迭代时除外。每次迭代的休眠延时都将加倍（至多 _max\_delay_ 秒）。

请参阅 [`busy_retry()`](#test.support.busy_retry "test.support.busy_retry") 文档了解相关形参的用法。

在 SHORT\_TIMEOUT 秒后引发异常的示例:

for \_ in support.sleeping\_retry(support.SHORT\_TIMEOUT):
    if check():
        break

error=False 的用法示例:

for \_ in support.sleeping\_retry(support.SHORT\_TIMEOUT, error\=False):
    if check():
        break
else:
    raise RuntimeError('my custom error')

test.support.is\_resource\_enabled(_resource_)[¶](#test.support.is_resource_enabled "Link to this definition")

如果 _resource_ 已启用并可用则返回 `True`。可用资源列表只有当 [`test.regrtest`](#module-test.regrtest "test.regrtest: Drives the regression test suite.") 正在执行测试时才会被设置。

test.support.get\_resource\_value(_resource_)[¶](#test.support.get_resource_value "Link to this definition")

返回为 _resource_ 指定的值 (形式为 `-u _resource_=_value_`)。如果 _resource_ 被禁用或未指定值则返回 `None`。

test.support.python\_is\_optimized()[¶](#test.support.python_is_optimized "Link to this definition")

如果 Python 编译未使用 `-O0` 或 `-Og` 则返回 `True`。

test.support.with\_pymalloc()[¶](#test.support.with_pymalloc "Link to this definition")

返回 `_testcapi.WITH_PYMALLOC`。

test.support.requires(_resource_, _msg\=None_)[¶](#test.support.requires "Link to this definition")

如果 _resource_ 不可用则引发 [`ResourceDenied`](#test.support.ResourceDenied "test.support.ResourceDenied")。如果该异常被引发则 _msg_ 为传给 `ResourceDenied` 的参数。如果被 `__name__` 为 `'__main__'` 的函数调用则总是返回 `True`。在测试由 [`test.regrtest`](#module-test.regrtest "test.regrtest: Drives the regression test suite.") 执行时使用。

test.support.sortdict(_dict_)[¶](#test.support.sortdict "Link to this definition")

返回 _dict_ 按键排序的 repr。

test.support.findfile(_filename_, _subdir\=None_)[¶](#test.support.findfile "Link to this definition")

返回名为 _filename_ 的文件的路径。如果未找到匹配结果则返回 _filename_。这并不等于失败因为它也算是该文件的路径。

设置 _subdir_ 指明要用来查找文件的相对路径而不是直接在路径目录中查找。

test.support.get\_pagesize()[¶](#test.support.get_pagesize "Link to this definition")

获取以字节表示的分页大小。

Added in version 3.12.

test.support.setswitchinterval(_interval_)[¶](#test.support.setswitchinterval "Link to this definition")

将 [`sys.setswitchinterval()`](https://docs.python.org/zh-cn/3/library/sys.html#sys.setswitchinterval "sys.setswitchinterval") 设为给定的 _interval_。请为 Android 系统定义一个最小间隔以防止系统挂起。

test.support.check\_impl\_detail(_\*\*guards_)[¶](#test.support.check_impl_detail "Link to this definition")

使用此检测来保护 CPython 实现专属的测试或者仅在有这些参数保护的实现上运行它们。此函数将根据主机系统平台的不同返回 `True` 或 `False`。用法示例:

check\_impl\_detail()               \# 仅限 CPython (默认)。
check\_impl\_detail(jython\=True)    \# 仅限 Jython。
check\_impl\_detail(cpython\=False)  \# 除 CPython 以外的任何地方。

test.support.set\_memlimit(_limit_)[¶](#test.support.set_memlimit "Link to this definition")

针对大内存测试设置 [`max_memuse`](#test.support.max_memuse "test.support.max_memuse") 和 [`real_max_memuse`](#test.support.real_max_memuse "test.support.real_max_memuse") 的值。

test.support.record\_original\_stdout(_stdout_)[¶](#test.support.record_original_stdout "Link to this definition")

存放来自 _stdout_ 的值。它旨在保存回归测试开始时的 stdout。

test.support.get\_original\_stdout()[¶](#test.support.get_original_stdout "Link to this definition")

返回 [`record_original_stdout()`](#test.support.record_original_stdout "test.support.record_original_stdout") 所设置的原始 stdout 或者如果未设置则为 `sys.stdout`。

test.support.args\_from\_interpreter\_flags()[¶](#test.support.args_from_interpreter_flags "Link to this definition")

返回在 `sys.flags` 和 `sys.warnoptions` 中重新产生当前设置的命令行参数列表。

test.support.optim\_args\_from\_interpreter\_flags()[¶](#test.support.optim_args_from_interpreter_flags "Link to this definition")

返回在 `sys.flags` 中重新产生当前优化设置的命令行参数列表。

test.support.captured\_stdin()[¶](#test.support.captured_stdin "Link to this definition")

test.support.captured\_stdout()[¶](#test.support.captured_stdout "Link to this definition")

test.support.captured\_stderr()[¶](#test.support.captured_stderr "Link to this definition")

使用 [`io.StringIO`](https://docs.python.org/zh-cn/3/library/io.html#io.StringIO "io.StringIO") 对象临时替换指定流的上下文管理器。

使用输出流的示例:

with captured\_stdout() as stdout, captured\_stderr() as stderr:
    print("hello")
    print("error", file\=sys.stderr)
assert stdout.getvalue() \== "hello\\n"
assert stderr.getvalue() \== "error\\n"

使用输入流的示例:

with captured\_stdin() as stdin:
    stdin.write('hello\\n')
    stdin.seek(0)
    \# 调用接受 sys.stdin 的代码
    captured \= input()
self.assertEqual(captured, "hello")

test.support.disable\_faulthandler()[¶](#test.support.disable_faulthandler "Link to this definition")

临时禁用 [`faulthandler`](https://docs.python.org/zh-cn/3/library/faulthandler.html#module-faulthandler "faulthandler: Dump the Python traceback.") 的上下文管理器。

test.support.gc\_collect()[¶](#test.support.gc_collect "Link to this definition")

强制收集尽可能多的对象。这是有必要的因为垃圾回收器并不能保证及时回收资源。这意味着 `__del__` 方法的调用可能会晚于预期而弱引用的存活长于预期。

test.support.disable\_gc()[¶](#test.support.disable_gc "Link to this definition")

在进入时禁用垃圾回收器的上下文管理器。在退出时，垃圾回收器将恢复到先前状态。

test.support.swap\_attr(_obj_, _attr_, _new\_val_)[¶](#test.support.swap_attr "Link to this definition")

上下文管理器用一个新对象来交换一个属性。

用法：

with swap\_attr(obj, "attr", 5):
    ...

这将把 `obj.attr` 设为 5 并在 `with` 语句块内保持，在语句块结束时恢复旧值。如果 `attr` 不存在于 `obj` 中，它将被创建并在语句块结束时被删除。

旧值 (或者如果不存在旧值则为 `None`) 将被赋给 "as" 子句的目标，如果存在子句的话。

test.support.swap\_item(_obj_, _attr_, _new\_val_)[¶](#test.support.swap_item "Link to this definition")

上下文管理器用一个新对象来交换一个条目。

用法：

with swap\_item(obj, "item", 5):
    ...

这将把 `obj["item"]` 设为 5 并在 `with` 语句块内保持，在语句块结束时恢复旧值。如果 `item` 不存在于 `obj` 中，它将被创建并在语句块结束时被删除。

旧值 (或者如果不存在旧值则为 `None`) 将被赋给 "as" 子句的目标，如果存在子句的话。

test.support.flush\_std\_streams()[¶](#test.support.flush_std_streams "Link to this definition")

在 [`sys.stdout`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stdout "sys.stdout") 然后又在 [`sys.stderr`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stderr "sys.stderr") 上调用 `flush()` 方法。 它可被用来确保日志顺序在写入到 stderr 之前的一致性。

Added in version 3.11.

test.support.print\_warning(_msg_)[¶](#test.support.print_warning "Link to this definition")

打印一个警告到 [`sys.__stderr__`](https://docs.python.org/zh-cn/3/library/sys.html#sys.__stderr__ "sys.__stderr__")。将消息格式化为：`f"Warning -- {msg}"`。如果 _msg_ 包含多行，则为每行添加 `"Warning -- "` 前缀。

Added in version 3.9.

test.support.wait\_process(_pid_, _\*_, _exitcode_, _timeout\=None_)[¶](#test.support.wait_process "Link to this definition")

等待直到进程 _pid_ 结束并检查进程退出代码是否为 _exitcode_。

如果进程退出代码不等于 _exitcode_ 则引发 [`AssertionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#AssertionError "AssertionError")。

如果进程运行时长超过 _timeout_ 秒 (默认为 [`SHORT_TIMEOUT`](#test.support.SHORT_TIMEOUT "test.support.SHORT_TIMEOUT"))，则杀死进程并引发 [`AssertionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#AssertionError "AssertionError")。超时特性在 Windows 上不可用。

Added in version 3.9.

test.support.calcobjsize(_fmt_)[¶](#test.support.calcobjsize "Link to this definition")

返回 [`PyObject`](https://docs.python.org/zh-cn/3/c-api/structures.html#c.PyObject "PyObject") 的大小，其结构成员由 _fmt_ 定义。返回的值包括 Python 对象头的大小和对齐方式。

test.support.calcvobjsize(_fmt_)[¶](#test.support.calcvobjsize "Link to this definition")

返回 [`PyVarObject`](https://docs.python.org/zh-cn/3/c-api/structures.html#c.PyVarObject "PyVarObject") 的大小，其结构成员由 _fmt_ 定义。返回的值包括 Python 对象头的大小和对齐方式。

test.support.checksizeof(_test_, _o_, _size_)[¶](#test.support.checksizeof "Link to this definition")

对于测试用例 _test_，断言 _o_ 的 `sys.getsizeof` 加 GC 头的大小等于 _size_。

@test.support.anticipate\_failure(_condition_)[¶](#test.support.anticipate_failure "Link to this definition")

A decorator to conditionally mark tests with [`@unittest.expectedFailure`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.expectedFailure "unittest.expectedFailure"). Any use of this decorator should have an associated comment identifying the relevant tracker issue.

test.support.system\_must\_validate\_cert(_f_)[¶](#test.support.system_must_validate_cert "Link to this definition")

一个在 TLS 证书验证失败时跳过被装饰测试的装饰器。

@test.support.run\_with\_locale(_catstr_, _\*locales_)[¶](#test.support.run_with_locale "Link to this definition")

一个在不同语言区域下运行函数的装饰器，并在其结束后正确地重置语言区域。 _catstr_ 是字符串形式的语言区域类别 (例如 `"LC_ALL"`)。传入的 _locales_ 将依次被尝试，并将使用第一个有效的语言区域。

@test.support.run\_with\_tz(_tz_)[¶](#test.support.run_with_tz "Link to this definition")

一个在指定时区下运行函数的装饰器，并在其结束后正确地重置时区。

@test.support.requires\_freebsd\_version(_\*min\_version_)[¶](#test.support.requires_freebsd_version "Link to this definition")

当在 FreeBSD 上运行测试时指定最低版本的装饰器。如果 FreeBSD 版本号低于指定值，测试将被跳过。

@test.support.requires\_linux\_version(_\*min\_version_)[¶](#test.support.requires_linux_version "Link to this definition")

当在 Linux 上运行测试时指定最低版本的装饰器。如果 Linux 版本号低于指定值，测试将被跳过。

@test.support.requires\_mac\_version(_\*min\_version_)[¶](#test.support.requires_mac_version "Link to this definition")

当在 macOS 上运行测试时指定最低版本的装饰器。如果 macOS 版本号低于指定值，测试将被跳过。

@test.support.requires\_gil\_enabled[¶](#test.support.requires_gil_enabled "Link to this definition")

在自由线程编译版上跳过测试的装饰器。如果禁用了 [GIL](https://docs.python.org/zh-cn/3/glossary.html#term-GIL)，测试将被跳过。

@test.support.requires\_IEEE\_754[¶](#test.support.requires_IEEE_754 "Link to this definition")

用于在非 IEEE 754 平台上跳过测试的装饰器。

@test.support.requires\_zlib[¶](#test.support.requires_zlib "Link to this definition")

用于当 [`zlib`](https://docs.python.org/zh-cn/3/library/zlib.html#module-zlib "zlib: Low-level interface to compression and decompression routines compatible with gzip.") 不存在时跳过测试的装饰器。

@test.support.requires\_gzip[¶](#test.support.requires_gzip "Link to this definition")

用于当 [`gzip`](https://docs.python.org/zh-cn/3/library/gzip.html#module-gzip "gzip: Interfaces for gzip compression and decompression using file objects.") 不存在时跳过测试的装饰器。

@test.support.requires\_bz2[¶](#test.support.requires_bz2 "Link to this definition")

用于当 [`bz2`](https://docs.python.org/zh-cn/3/library/bz2.html#module-bz2 "bz2: Interfaces for bzip2 compression and decompression.") 不存在时跳过测试的装饰器。

@test.support.requires\_lzma[¶](#test.support.requires_lzma "Link to this definition")

用于当 [`lzma`](https://docs.python.org/zh-cn/3/library/lzma.html#module-lzma "lzma: A Python wrapper for the liblzma compression library.") 不存在时跳过测试的装饰器。

@test.support.requires\_resource(_resource_)[¶](#test.support.requires_resource "Link to this definition")

用于当 _resource_ 不可用时跳过测试的装饰器。

@test.support.requires\_docstrings[¶](#test.support.requires_docstrings "Link to this definition")

用于仅当 [`HAVE_DOCSTRINGS`](#test.support.HAVE_DOCSTRINGS "test.support.HAVE_DOCSTRINGS") 时才运行测试的装饰器。

@test.support.requires\_limited\_api[¶](#test.support.requires_limited_api "Link to this definition")

设置仅在 [受限 C API](https://docs.python.org/zh-cn/3/c-api/stable.html#limited-c-api) 可用时运行测试的装饰器。

@test.support.cpython\_only[¶](#test.support.cpython_only "Link to this definition")

表示仅适用于 CPython 的测试的装饰器。

@test.support.impl\_detail(_msg\=None_, _\*\*guards_)[¶](#test.support.impl_detail "Link to this definition")

用于在 _guards_ 上调用 [`check_impl_detail()`](#test.support.check_impl_detail "test.support.check_impl_detail") 的装饰器。如果调用返回 `False`，则使用 _msg_ 作为跳过测试的原因。

@test.support.thread\_unsafe(_reason\=None_)[¶](#test.support.thread_unsafe "Link to this definition")

用于将测试标记为线程不安全的装饰器。此测试即使在使用 `--parallel-threads` 调用时也总是会在一个线程中运行。

@test.support.no\_tracing[¶](#test.support.no_tracing "Link to this definition")

用于在测试期间临时关闭追踪的装饰器。

@test.support.refcount\_test[¶](#test.support.refcount_test "Link to this definition")

用于涉及引用计数的测试的装饰器。如果测试不是由 CPython 运行则该装饰器不会运行测试。 在测试期间会取消设置任何追踪函数以防止由追踪函数导致的意外引用计数。

@test.support.bigmemtest(_size_, _memuse_, _dry\_run\=True_)[¶](#test.support.bigmemtest "Link to this definition")

用于大内存测试的装饰器。

_size_ 是测试所请求的大小（以任意的，由测试解读的单位。） _memuse_ 是测试的每单元字节数，或是对它的良好估计。 例如，一个需要两个字节缓冲区，每个缓冲区 4 GiB，则可以用 `@bigmemtest(size=_4G, memuse=2)` 来装饰。

_size_ 参数通常作为额外参数传递给被测试的方法。如果 _dry\_run_ 为 `True`，则传给测试方法的值可能少于所请求的值。如果 _dry\_run_ 为 `False`，则意味着当未指定 `-M` 时测试将不支持虚拟运行。

@test.support.bigaddrspacetest[¶](#test.support.bigaddrspacetest "Link to this definition")

用于填充地址空间的测试的装饰器。

test.support.linked\_to\_musl()[¶](#test.support.linked_to_musl "Link to this definition")

如果没有证据表明解释器是使用 `musl` 编译则返回 `False`，在其他情况下返回版本号三元组，如果版本号未知则为 `(0, 0, 0)`，或者如果已知则为实际版本号。被设计用于 `skip` 装饰器。`emscripten` 和 `wasi` 被认为是使用 `musl` 编译；在其他情况下将检查 `platform.libc_ver`。

test.support.check\_syntax\_error(_testcase_, _statement_, _errtext\=''_, _\*_, _lineno\=None_, _offset\=None_)[¶](#test.support.check_syntax_error "Link to this definition")

用于通过尝试编译 _statement_ 来测试 _statement_ 中的语法错误。 _testcase_ 是测试的 [`unittest`](https://docs.python.org/zh-cn/3/library/unittest.html#module-unittest "unittest: Unit testing framework for Python.") 实例。 _errtext_ 是应当匹配所引发的 [`SyntaxError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#SyntaxError "SyntaxError") 的字符串表示形式的正则表达式。如果 _lineno_ 不为 `None`，则与异常所在的行进行比较。如果 _offset_ 不为 `None`，则与异常的偏移量进行比较。

test.support.open\_urlresource(_url_, _\*args_, _\*\*kw_)[¶](#test.support.open_urlresource "Link to this definition")

打开 _url_。如果打开失败，则引发 [`TestFailed`](#test.support.TestFailed "test.support.TestFailed")。

test.support.reap\_children()[¶](#test.support.reap_children "Link to this definition")

只要有子进程启动就在 `test_main` 的末尾使用此函数。这将有助于确保没有多余的子进程（僵尸）存在占用资源并在查找引用泄漏时造成问题。

test.support.get\_attribute(_obj_, _name_)[¶](#test.support.get_attribute "Link to this definition")

获取一个属性，如果引发了 [`AttributeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#AttributeError "AttributeError") 则会引发 [`unittest.SkipTest`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.SkipTest "unittest.SkipTest")。

test.support.catch\_unraisable\_exception()[¶](#test.support.catch_unraisable_exception "Link to this definition")

使用 [`sys.unraisablehook()`](https://docs.python.org/zh-cn/3/library/sys.html#sys.unraisablehook "sys.unraisablehook") 来捕获不可引发的异常的上下文管理器。

存储异常值 (`cm.unraisable.exc_value`) 会创建一个引用循环。引用循环将在上下文管理器退出时被显式地打破。

存储对象 (`cm.unraisable.object`) 如果被设置为一个正在最终化的对象则可以恢复它。退出上下文管理器将清除已存在对象。

用法：

with support.catch\_unraisable\_exception() as cm:
    \# 创建一个“不可引发的异常”的代码
    ...

    \# 检测这个不可引发的异常：使用 cm.unraisable
    ...

\# 此时 cm.unraisable 属性已不存在
\# （以打破循环引用）

Added in version 3.8.

test.support.load\_package\_tests(_pkg\_dir_, _loader_, _standard\_tests_, _pattern_)[¶](#test.support.load_package_tests "Link to this definition")

在测试包中使用的 [`unittest`](https://docs.python.org/zh-cn/3/library/unittest.html#module-unittest "unittest: Unit testing framework for Python.") `load_tests` 协议的通用实现。 _pkg\_dir_ 是包的根目录；_loader_, _standard\_tests_ 和 _pattern_ 是 `load_tests` 所期望的参数。在简单的情况下，测试包的 `__init__.py` 可以是下面这样的:

import os
from test.support import load\_package\_tests

def load\_tests(\*args):
    return load\_package\_tests(os.path.dirname(\_\_file\_\_), \*args)

test.support.detect\_api\_mismatch(_ref\_api_, _other\_api_, _\*_, _ignore\=()_)[¶](#test.support.detect_api_mismatch "Link to this definition")

返回未在 _other\_api_ 中找到的 _ref\_api_ 的属性、函数或方法的集合，除去在 _ignore_ 中指明的要在这个检查中忽略的已定义条目列表。

在默认情况下这将跳过以 '\_' 打头的私有属性但包括所有魔术方法，即以 '\_\_' 打头和结尾的方法。

Added in version 3.5.

test.support.patch(_test\_instance_, _object\_to\_patch_, _attr\_name_, _new\_value_)[¶](#test.support.patch "Link to this definition")

用 _new\_value_ 重载 _object\_to\_patch.attr\_name_。并向 _test\_instance_ 添加清理过程以便为 _attr\_name_ 恢复 _object\_to\_patch_。 _attr\_name_ 应当是 _object\_to\_patch_ 的一个有效属性。

test.support.run\_in\_subinterp(_code_)[¶](#test.support.run_in_subinterp "Link to this definition")

在子解释器中运行 _code_。如果启用了 [`tracemalloc`](https://docs.python.org/zh-cn/3/library/tracemalloc.html#module-tracemalloc "tracemalloc: Trace memory allocations.") 则会引发 [`unittest.SkipTest`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.SkipTest "unittest.SkipTest")。

@test.support.isolation.runInSubprocess(_\*_, _options\=()_, _env\=None_, _timeout\=None_)[¶](#test.support.isolation.runInSubprocess "Link to this definition")

Decorator that runs the decorated test in a fresh interpreter subprocess, in isolation, so that it does not share global or interpreter state with the rest of the test run. It can decorate a test method or a whole [`TestCase`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase "unittest.TestCase") subclass. Decorated methods must take no extra arguments. A failure, error or skip in the subprocess is reported for the corresponding test, and individual [`subtests`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.subTest "unittest.TestCase.subTest") that fail or are skipped are reported individually. A reported failure or error shows the original subprocess traceback as the cause of the exception.

When a **method** is decorated, only that method runs in a subprocess; all fixtures ([`setUp()`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.setUp "unittest.TestCase.setUp") / [`tearDown()`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.tearDown "unittest.TestCase.tearDown"), [`setUpClass()`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.setUpClass "unittest.TestCase.setUpClass") / [`tearDownClass()`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.tearDownClass "unittest.TestCase.tearDownClass") and `setUpModule()` / `tearDownModule()`) run both in the parent process (as usual) and in the subprocess around the method.

When a **class** is decorated, the whole class runs in a single subprocess, and [`setUpClass()`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.setUpClass "unittest.TestCase.setUpClass"), [`tearDownClass()`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.tearDownClass "unittest.TestCase.tearDownClass"), [`setUp()`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.setUp "unittest.TestCase.setUp") and [`tearDown()`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.tearDown "unittest.TestCase.tearDown") run once each in the subprocess and are skipped in the parent process. A failure or skip of `setUpClass()` in the subprocess is reported for the whole class. `setUpModule()` cannot be controlled by a class decorator, so it still runs in the parent process too; test it with [`runningInSubprocess`](#test.support.isolation.runningInSubprocess "test.support.isolation.runningInSubprocess") if needed.

The subprocess inherits the enabled resources (`-u`), memory limit (`-M`) and verbosity (`-v`) of the parent test run, so that [`requires_resource()`](#test.support.requires_resource "test.support.requires_resource"), [`requires()`](#test.support.requires "test.support.requires"), [`bigmemtest()`](#test.support.bigmemtest "test.support.bigmemtest") and the like behave consistently in both processes.

_options_ is a sequence of interpreter command line options to run the subprocess with, and _env_ is a mapping of environment variables to set in it, on top of the inherited environment. A value of `None` in _env_ unsets the variable. Note that [`-E`](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-E) and [`-I`](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-I) make the subprocess ignore the `PYTHON*` environment variables, including [`PYTHONPATH`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONPATH).

_timeout_ is the number of seconds to wait for the subprocess; the test is reported as an error if it does not complete in time. By default there is no timeout, and a hung test is left to the timeout of the test runner.

The test is skipped on platforms without subprocess support.

test.support.isolation.runningInSubprocess[¶](#test.support.isolation.runningInSubprocess "Link to this definition")

`True` while the code runs in the isolated subprocess spawned by [`runInSubprocess()`](#test.support.isolation.runInSubprocess "test.support.isolation.runInSubprocess"), and `False` otherwise (including in the parent process and in a normal, non-isolated test run). Fixtures such as [`setUp()`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.setUp "unittest.TestCase.setUp"), [`tearDown()`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.tearDown "unittest.TestCase.tearDown"), [`setUpClass()`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.setUpClass "unittest.TestCase.setUpClass"), [`tearDownClass()`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.TestCase.tearDownClass "unittest.TestCase.tearDownClass"), `setUpModule()` and `tearDownModule()` can test it to choose which code to run in the subprocess.

test.support.check\_free\_after\_iterating(_test_, _iter_, _cls_, _args\=()_)[¶](#test.support.check_free_after_iterating "Link to this definition")

断言 _cls_ 的实例在迭代后被释放。

test.support.missing\_compiler\_executable(_cmd\_names\=\[\]_)[¶](#test.support.missing_compiler_executable "Link to this definition")

检查在 _cmd\_names_ 中列出名称的或者当 _cmd\_names_ 为空时所有的编译器可执行文件是否存在并返回第一个丢失的可执行文件或者如果未发现任何丢失则返回 `None`。

test.support.check\_\_all\_\_(_test\_case_, _module_, _name\_of\_module\=None_, _extra\=()_, _not\_exported\=()_)[¶](#test.support.check__all__ "Link to this definition")

断言 _module_ 的 `__all__` 变量包含全部公共名称。

模块的公共名称（它的 API）是根据它们是否符合公共名称惯例并在 _module_ 中被定义来自动检测的。

_name\_of\_module_ 参数可以（用字符串或元组的形式）指定一个 API 可以被定义为什么模块以便被检测为一个公共 API。 一种这样的情况会在 _module_ 从其他模块，可能是一个 C 后端 (如 `csv` 和它的 `_csv`) 导入其公共 API 的某一组成部分时发生。

_extra_ 参数可以是一个在其他情况下不会被自动检测为 "public" 的名称的集合，例如没有适当的 [`__module__`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#definition.__module__ "definition.__module__") 属性的对象。如果提供该参数，它将被添加到被自动检测的对象中。

_not\_exported_ 参数可以是一个不可被当作公共 API 的一部分的名称集合，即使其名称没有显式指明这一点。

用法示例:

import bar
import foo
import unittest
from test import support

class MiscTestCase(unittest.TestCase):
    def test\_\_all\_\_(self):
        support.check\_\_all\_\_(self, foo)

class OtherTestCase(unittest.TestCase):
    def test\_\_all\_\_(self):
        extra \= {'BAR\_CONST', 'FOO\_CONST'}
        not\_exported \= {'baz'}  \# 未写入文档的名称。
        \# bar 从 \_bar 导入其 API 的一部分。
        support.check\_\_all\_\_(self, bar, ('bar', '\_bar'),
                             extra\=extra, not\_exported\=not\_exported)

Added in version 3.6.

test.support.skip\_if\_broken\_multiprocessing\_synchronize()[¶](#test.support.skip_if_broken_multiprocessing_synchronize "Link to this definition")

如果没有 `multiprocessing.synchronize` 模块，没有可用的 semaphore 实现，或者如果创建一个锁会引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 则跳过测试。

Added in version 3.10.

test.support.check\_disallow\_instantiation(_test\_case_, _tp_, _\*args_, _\*\*kwds_)[¶](#test.support.check_disallow_instantiation "Link to this definition")

断言类型 _tp_ 不能使用 _args_ 和 _kwds_ 来实例化。

Added in version 3.10.

test.support.adjust\_int\_max\_str\_digits(_max\_digits_)[¶](#test.support.adjust_int_max_str_digits "Link to this definition")

此函数返回一个将在上下文生效期间改变全局 [`sys.set_int_max_str_digits()`](https://docs.python.org/zh-cn/3/library/sys.html#sys.set_int_max_str_digits "sys.set_int_max_str_digits") 设置的上下文管理器以便允许执行当在整数和字符串之间进行转换时需要对位数有不同限制的测试代码。

Added in version 3.11.

`test.support` 模块定义了下列类：

_class_ test.support.SuppressCrashReport[¶](#test.support.SuppressCrashReport "Link to this definition")

一个用于在预期会使子进程崩溃的测试时尽量防止弹出崩溃对话框的上下文管理器。

在 Windows 上，它会使用 [SetErrorMode](https://msdn.microsoft.com/en-us/library/windows/desktop/ms680621.aspx) 来禁用 Windows 错误报告对话框。

在 UNIX 上，会使用 [`resource.setrlimit()`](https://docs.python.org/zh-cn/3/library/resource.html#resource.setrlimit "resource.setrlimit") 来将 [`resource.RLIMIT_CORE`](https://docs.python.org/zh-cn/3/library/resource.html#resource.RLIMIT_CORE "resource.RLIMIT_CORE") 的软限制设为 0 以防止创建核心转储文件。

在这两个平台上，旧值都可通过 [`__exit__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__exit__ "object.__exit__") 恢复。

_class_ test.support.SaveSignals[¶](#test.support.SaveSignals "Link to this definition")

用于保存和恢复由 Python 信号处理器所注册的信号处理程序。

save(_self_)[¶](#test.support.SaveSignals.save "Link to this definition")

将信号处理器保存到一个将信号编号映射到当前信号处理器的字典。

restore(_self_)[¶](#test.support.SaveSignals.restore "Link to this definition")

将来自 [`save()`](#test.support.SaveSignals.save "test.support.SaveSignals.save") 字典的信号编号设置到已保存的处理器上。

_class_ test.support.Matcher[¶](#test.support.Matcher "Link to this definition")

matches(_self_, _d_, _\*\*kwargs_)[¶](#test.support.Matcher.matches "Link to this definition")

尝试对单个字典与所提供的参数进行匹配。

match\_value(_self_, _k_, _dv_, _v_)[¶](#test.support.Matcher.match_value "Link to this definition")

尝试对单个已存储值 (_dv_) 与所提供的值 (_v_) 进行匹配。

## `test.support.socket_helper` --- 针对套接字测试的工具[¶](#module-test.support.socket_helper "Link to this heading")

`test.support.socket_helper` 模块提供了对套接字测试的支持。

Added in version 3.9.

test.support.socket\_helper.IPV6\_ENABLED[¶](#test.support.socket_helper.IPV6_ENABLED "Link to this definition")

如果此主机启用了 IPv6 则设为 `True`，否则为 `False`。

test.support.socket\_helper.find\_unused\_port(_family\=socket.AF\_INET_, _socktype\=socket.SOCK\_STREAM_)[¶](#test.support.socket_helper.find_unused_port "Link to this definition")

返回一个应当适合绑定的未使用端口。这是通过创建一个与 `sock` 形参相同协议族和类型的临时套接字来达成的 (默认为 [`AF_INET`](https://docs.python.org/zh-cn/3/library/socket.html#socket.AF_INET "socket.AF_INET"), [`SOCK_STREAM`](https://docs.python.org/zh-cn/3/library/socket.html#socket.SOCK_STREAM "socket.SOCK_STREAM"))，并将其绑定到指定的主机地址 (默认为 `0.0.0.0`) 并将端口设为 0，以从 OS 引出一个未使用的瞬时端口。这个临时套接字随后将被关闭并删除，然后返回该瞬时端口。

这个方法或 [`bind_port()`](#test.support.socket_helper.bind_port "test.support.socket_helper.bind_port") 应当被用于任何在测试期间需要绑定到特定端口的测试。具体使用哪个取决于调用方代码是否会创建 Python 套接字，或者是否需要在构造器中提供或向外部程序提供未使用的端口（例如传给 openssl 的 s\_server 模式的 `-accept` 参数）。在可能的情况下将总是优先使用 `bind_port()` 而非 [`find_unused_port()`](#test.support.socket_helper.find_unused_port "test.support.socket_helper.find_unused_port")。 不建议使用硬编码的端口因为将使测试的多个实例无法同时运行，这对 buildbot 来说是个问题。

test.support.socket\_helper.bind\_port(_sock_, _host\=HOST_)[¶](#test.support.socket_helper.bind_port "Link to this definition")

将套接字绑定到一个空闲端口并返回端口号。这依赖于瞬时端口以确保我们能使用一个未绑定端口。这很重要因为可能会有许多测试同时运行，特别是在 buildbot 环境中。如果 `sock.family` 为 [`AF_INET`](https://docs.python.org/zh-cn/3/library/socket.html#socket.AF_INET "socket.AF_INET") 而 `sock.type` 为 [`SOCK_STREAM`](https://docs.python.org/zh-cn/3/library/socket.html#socket.SOCK_STREAM "socket.SOCK_STREAM")，并且套接字上设置了 `SO_REUSEADDR` 或 `SO_REUSEPORT` 则此方法将引发异常。测试绝不应该为 TCP/IP 套接字设置这些套接字选项。 唯一需要设置这些选项的情况是通过多个 UDP 套接字来测试组播。

此外，如果 `SO_EXCLUSIVEADDRUSE` 套接字选项是可用的（例如在 Windows 上），它将在套接字上被设置。这将阻止其他任何人在测试期间绑定到我们的主机/端口。

test.support.socket\_helper.bind\_unix\_socket(_sock_, _addr_)[¶](#test.support.socket_helper.bind_unix_socket "Link to this definition")

绑定一个 Unix 套接字，如果 [`PermissionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#PermissionError "PermissionError") 被引发则会引发 [`unittest.SkipTest`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.SkipTest "unittest.SkipTest")。

@test.support.socket\_helper.skip\_unless\_bind\_unix\_socket[¶](#test.support.socket_helper.skip_unless_bind_unix_socket "Link to this definition")

一个用于运行需要 Unix 套接字 `bind()` 功能的测试的装饰器。

test.support.socket\_helper.transient\_internet(_resource\_name_, _\*_, _timeout\=30.0_, _errnos\=()_)[¶](#test.support.socket_helper.transient_internet "Link to this definition")

一个在互联网连接的各种问题以异常的形式表现出来时会引发 [`ResourceDenied`](#test.support.ResourceDenied "test.support.ResourceDenied") 的上下文管理器。

## `test.support.script_helper` --- 用于 Python 执行测试的工具[¶](#module-test.support.script_helper "Link to this heading")

`test.support.script_helper` 模块提供了对 Python 的脚本执行测试的支持。

test.support.script\_helper.interpreter\_requires\_environment()[¶](#test.support.script_helper.interpreter_requires_environment "Link to this definition")

如果 `sys.executable interpreter` 需要环境变量才能运行则返回 `True`。

这被设计用来配合 `@unittest.skipIf()` 以便标注需要使用 `assert_python*()` 函数来启动隔离模式 (`-I`) 或无环境模式 (`-E`) 子解释器进程的测试。

正常的编译和测试运行不会进入这种状况但它在尝试从一个使用 Python 的当前家目录查找逻辑找不到明确的家目录的解释器运行标准库测试套件时有可能发生。

设置 [`PYTHONHOME`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONHOME) 是一种能让大多数测试套件在这种情况下运行的办法。 [`PYTHONPATH`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONPATH) 或 `PYTHONUSERSITE` 是另外两个可影响解释器是否能启动的常见环境变量。

test.support.script\_helper.run\_python\_until\_end(_\*args_, _\*\*env\_vars_)[¶](#test.support.script_helper.run_python_until_end "Link to this definition")

基于 _env\_vars_ 设置环境以便在子进程中运行解释器。它的值可以包括 `__isolated`, `__cleanenv`, `__cwd` 和 `TERM`。

在 3.9 版本发生变更: 此函数不会再从 _stderr_ 去除空格符。

test.support.script\_helper.assert\_python\_ok(_\*args_, _\*\*env\_vars_)[¶](#test.support.script_helper.assert_python_ok "Link to this definition")

断言附带 _args_ 和可选的环境变量 _env\_vars_ 运行解释器会成功 (`rc == 0`) 并返回一个 `(return code, stdout, stderr)` 元组。

如果设置了 _\_\_cleanenv_ 仅限关键字形参，_env\_vars_ 会被用作一个全新的环境。

Python 是以隔离模式 (命令行选项 `-I`) 启动的，除非 _\_\_isolated_ 仅限关键字形参被设为 `False`。

在 3.9 版本发生变更: 此函数不会再从 _stderr_ 去除空格符。

test.support.script\_helper.assert\_python\_failure(_\*args_, _\*\*env\_vars_)[¶](#test.support.script_helper.assert_python_failure "Link to this definition")

断言附带 _args_ 和可选的环境变量 _env\_vars_ 运行解释器会失败 (`rc != 0`) 并返回一个 `(return code, stdout, stderr)` 元组。

更多选项请参阅 [`assert_python_ok()`](#test.support.script_helper.assert_python_ok "test.support.script_helper.assert_python_ok")。

在 3.9 版本发生变更: 此函数不会再从 _stderr_ 去除空格符。

test.support.script\_helper.spawn\_python(_\*args_, _stdout\=subprocess.PIPE_, _stderr\=subprocess.STDOUT_, _\*\*kw_)[¶](#test.support.script_helper.spawn_python "Link to this definition")

使用给定的参数运行一个 Python 子进程。

_kw_ 是要传给 [`subprocess.Popen()`](https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.Popen "subprocess.Popen") 的额外关键字参数。返回一个 [`subprocess.Popen`](https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.Popen "subprocess.Popen") 对象。

test.support.script\_helper.kill\_python(_p_)[¶](#test.support.script_helper.kill_python "Link to this definition")

运行给定的 [`subprocess.Popen`](https://docs.python.org/zh-cn/3/library/subprocess.html#subprocess.Popen "subprocess.Popen") 进程直至完成并返回 stdout。

test.support.script\_helper.make\_script(_script\_dir_, _script\_basename_, _source_, _omit\_suffix\=False_)[¶](#test.support.script_helper.make_script "Link to this definition")

在路径 _script\_dir_ 和 _script\_basename_ 中创建包含 _source_ 的脚本。如果 _omit\_suffix_ 为 `False`，则为名称添加 `.py`。返回完整的脚本路径。

test.support.script\_helper.make\_zip\_script(_zip\_dir_, _zip\_basename_, _script\_name_, _name\_in\_zip\=None_)[¶](#test.support.script_helper.make_zip_script "Link to this definition")

使用 _zip\_dir_ 和 _zip\_basename_ 创建扩展名为 `zip` 的 zip 文件，其中包含 _script\_name_ 中的文件。 _name\_in\_zip_ 为归档名。返回一个包含 `(full path, full path of archive name)` 的元组。

test.support.script\_helper.make\_pkg(_pkg\_dir_, _init\_source\=''_)[¶](#test.support.script_helper.make_pkg "Link to this definition")

创建一个名为 _pkg\_dir_ 的目录，其中包含一个 `__init__` 文件并以 _init\_source_ 作为其内容。

test.support.script\_helper.make\_zip\_pkg(_zip\_dir_, _zip\_basename_, _pkg\_name_, _script\_basename_, _source_, _depth\=1_, _compiled\=False_)[¶](#test.support.script_helper.make_zip_pkg "Link to this definition")

使用 _zip\_dir_ 和 _zip\_basename_ 创建一个 zip 包目录，其中包含一个空的 `__init__` 文件和一个包含 _source_ 的文件 _script\_basename_。如果 _compiled_ 为 `True`，则两个源文件将被编译并添加到 zip 包中。返回一个以完整 zip 路径和 zip 文件归档名为元素的元组。

## `test.support.bytecode_helper` --- 用于测试正确字节码生成的支持工具[¶](#module-test.support.bytecode_helper "Link to this heading")

`test.support.bytecode_helper` 模块提供了对测试和检查字节码生成的支持。

Added in version 3.9.

The module defines the following class:

_class_ test.support.bytecode\_helper.BytecodeTestCase(_unittest.TestCase_)[¶](#test.support.bytecode_helper.BytecodeTestCase "Link to this definition")

这个类具有用于检查字节码的自定义断言。

BytecodeTestCase.get\_disassembly\_as\_string(_co_)[¶](#test.support.bytecode_helper.BytecodeTestCase.get_disassembly_as_string "Link to this definition")

以字符串形式返回 _co_ 的反汇编码。

BytecodeTestCase.assertInBytecode(_x_, _opname_, _argval\=\_UNSPECIFIED_)[¶](#test.support.bytecode_helper.BytecodeTestCase.assertInBytecode "Link to this definition")

如果找到 _opname_ 则返回 instr，否则抛出 [`AssertionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#AssertionError "AssertionError")。

BytecodeTestCase.assertNotInBytecode(_x_, _opname_, _argval\=\_UNSPECIFIED_)[¶](#test.support.bytecode_helper.BytecodeTestCase.assertNotInBytecode "Link to this definition")

如果找到 _opname_ 则抛出 [`AssertionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#AssertionError "AssertionError")。

## `test.support.threading_helper` --- 用于线程测试的工具[¶](#module-test.support.threading_helper "Link to this heading")

`test.support.threading_helper` 模块提供了对线程测试的支持。

Added in version 3.10.

test.support.threading\_helper.join\_thread(_thread_, _timeout\=None_)[¶](#test.support.threading_helper.join_thread "Link to this definition")

在 _timeout_ 秒之内合并一个 _thread_。如果线程在 _timeout_ 秒后仍然存活则引发 [`AssertionError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#AssertionError "AssertionError").

@test.support.threading\_helper.reap\_threads[¶](#test.support.threading_helper.reap_threads "Link to this definition")

用于确保即使测试失败线程仍然会被清理的装饰器。

test.support.threading\_helper.start\_threads(_threads_, _unlock\=None_)[¶](#test.support.threading_helper.start_threads "Link to this definition")

启动 _threads_ 的上下文管理器，该参数为一个线程序列。 _unlock_ 是一个在所有线程启动之后被调用的函数，即使引发了异常也会执行；一个例子是 [`threading.Event.set()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Event.set "threading.Event.set")。 `start_threads` 将在退出时尝试合并已启动的线程。

test.support.threading\_helper.threading\_cleanup(_\*original\_values_)[¶](#test.support.threading_helper.threading_cleanup "Link to this definition")

清理未在 _original\_values_ 中指定的线程。被设计为如果有一个测试在后台离开正在运行的线程时会发出警告。

test.support.threading\_helper.threading\_setup()[¶](#test.support.threading_helper.threading_setup "Link to this definition")

返回当前线程计数和悬空线程的副本。

test.support.threading\_helper.wait\_threads\_exit(_timeout\=None_)[¶](#test.support.threading_helper.wait_threads_exit "Link to this definition")

等待直到 `with` 语句中所有已创建线程退出的上下文管理器。

test.support.threading\_helper.catch\_threading\_exception()[¶](#test.support.threading_helper.catch_threading_exception "Link to this definition")

使用 [`threading.excepthook()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.excepthook "threading.excepthook") 来捕获 [`threading.Thread`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Thread "threading.Thread") 异常的上下文管理器。

当异常被捕获时要设置的属性：

-   `exc_type`
    
-   `exc_value`
    
-   `exc_traceback`
    
-   `thread`
    

参见 [`threading.excepthook()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.excepthook "threading.excepthook") 文档。

这些属性在上下文管理器退出时将被删除。

用法：

with threading\_helper.catch\_threading\_exception() as cm:
    \# 生成一个引发异常的线程的代码
    ...

    \# 检测这个线程异常，使用 cm 的属性：
    \# exc\_type, exc\_value, exc\_traceback, thread
    ...

\# 此时 cm 的 exc\_type, exc\_value, exc\_traceback, thread 属性
\# 已不存在
\# （以避免循环引用）

Added in version 3.8.

test.support.threading\_helper.run\_concurrently(_worker\_func_, _nthreads_, _args\=()_, _kwargs\={}_)[¶](#test.support.threading_helper.run_concurrently "Link to this definition")

在多个线程中并发运行工作函数。若任一线程引发异常，将在所有线程执行完毕后重新引发该异常。

## `test.support.os_helper` --- 用于操作系统测试的工具[¶](#module-test.support.os_helper "Link to this heading")

`test.support.os_helper` 模块提供了对操作系统测试的支持。

Added in version 3.10.

test.support.os\_helper.FS\_NONASCII[¶](#test.support.os_helper.FS_NONASCII "Link to this definition")

一个可通过 [`os.fsencode()`](https://docs.python.org/zh-cn/3/library/os.html#os.fsencode "os.fsencode") 编码的非 ASCII 字符。

test.support.os\_helper.SAVEDCWD[¶](#test.support.os_helper.SAVEDCWD "Link to this definition")

设置为 [`os.getcwd()`](https://docs.python.org/zh-cn/3/library/os.html#os.getcwd "os.getcwd")。

test.support.os\_helper.TESTFN[¶](#test.support.os_helper.TESTFN "Link to this definition")

设置为一个可以安全地用作临时文件名的名称。任何被创建的临时文件都应当被关闭和撤销链接（移除）。

test.support.os\_helper.TESTFN\_NONASCII[¶](#test.support.os_helper.TESTFN_NONASCII "Link to this definition")

如果存在的话，设置为一个包含 [`FS_NONASCII`](#test.support.os_helper.FS_NONASCII "test.support.os_helper.FS_NONASCII") 字符的文件名。这会确保当文件名存在时，它可使用默认文件系统编码格式来编码和解码。 这允许需要非 ASCII 文件名的测试在其不可用的平台上被方便地跳过。

test.support.os\_helper.TESTFN\_UNENCODABLE[¶](#test.support.os_helper.TESTFN_UNENCODABLE "Link to this definition")

设置为一个应当在严格模式下不可使用文件系统编码格式来编码的文件名（str 类型）。如果无法生成这样的文件名则可以为 `None`。

test.support.os\_helper.TESTFN\_UNDECODABLE[¶](#test.support.os_helper.TESTFN_UNDECODABLE "Link to this definition")

设置为一个应当在严格模式下不可使用文件系统编码格式来编码的文件名（bytes 类型）。如果无法生成这样的文件名则可以为 `None`。

test.support.os\_helper.TESTFN\_UNICODE[¶](#test.support.os_helper.TESTFN_UNICODE "Link to this definition")

设置为用于临时文件的非 ASCII 名称。

_class_ test.support.os\_helper.EnvironmentVarGuard[¶](#test.support.os_helper.EnvironmentVarGuard "Link to this definition")

用于临时性地设置或取消设置环境变量的类。其实例可被用作上下文管理器并具有完整的字典接口用来查询/修改下层的 `os.environ`。 在从上下文管理器退出之后所有通过此实例对环境变量进行的修改都将被回滚。

在 3.1 版本发生变更: 增加了字典接口。

_class_ test.support.os\_helper.FakePath(_path_)[¶](#test.support.os_helper.FakePath "Link to this definition")

简单的 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object)。它实现了返回 _path_ 参数的 [`__fspath__()`](https://docs.python.org/zh-cn/3/library/os.html#os.PathLike.__fspath__ "os.PathLike.__fspath__") 方法。如果 _path_ 是一个异常，它将在 `__fspath__()` 中被引发。

EnvironmentVarGuard.set(_envvar_, _value_)[¶](#test.support.os_helper.EnvironmentVarGuard.set "Link to this definition")

临时性地将环境变量 `envvar` 的值设为 `value`。

EnvironmentVarGuard.unset(_envvar_, _\*others_)[¶](#test.support.os_helper.EnvironmentVarGuard.unset "Link to this definition")

临时性地取消一个或多个环境变量。

在 3.14 版本发生变更: 可以取消多个环境变量。

test.support.os\_helper.can\_symlink()[¶](#test.support.os_helper.can_symlink "Link to this definition")

如果操作系统支持符号链接则返回 `True`，否则返回 `False`。

test.support.os\_helper.can\_xattr()[¶](#test.support.os_helper.can_xattr "Link to this definition")

如果操作系统支持 xattr 则返回 `True`，否则返回 `False`。

test.support.os\_helper.change\_cwd(_path_, _quiet\=False_)[¶](#test.support.os_helper.change_cwd "Link to this definition")

一个临时性地将当前工作目录改为 _path_ 并输出该目录的上下文管理器。

如果 _quiet_ 为 `False`，此上下文管理器将在发生错误时引发一个异常。在其他情况下，它将只发出一个警告并将当前工作目录保持原状。

test.support.os\_helper.create\_empty\_file(_filename_)[¶](#test.support.os_helper.create_empty_file "Link to this definition")

创建一个名为 _filename_ 的空文件。如果文件已存在，则清空其内容。

test.support.os\_helper.fd\_count()[¶](#test.support.os_helper.fd_count "Link to this definition")

统计打开的文件描述符数量。

test.support.os\_helper.fs\_is\_case\_insensitive(_directory_)[¶](#test.support.os_helper.fs_is_case_insensitive "Link to this definition")

如果 _directory_ 的文件系统对大小写不敏感则返回 `True`。

test.support.os\_helper.make\_bad\_fd()[¶](#test.support.os_helper.make_bad_fd "Link to this definition")

通过打开并关闭临时文件来创建一个无效的文件描述符，并返回其描述符。

test.support.os\_helper.rmdir(_filename_)[¶](#test.support.os_helper.rmdir "Link to this definition")

在 _filename_ 上调用 [`os.rmdir()`](https://docs.python.org/zh-cn/3/library/os.html#os.rmdir "os.rmdir")。在 Windows 平台上，这将使用一个检测文件是否存在的等待循环来包装，需要这样做是因为反病毒程序会保持文件打开并阻止其被删除。

test.support.os\_helper.rmtree(_path_)[¶](#test.support.os_helper.rmtree "Link to this definition")

在 _path_ 上调用 [`shutil.rmtree()`](https://docs.python.org/zh-cn/3/library/shutil.html#shutil.rmtree "shutil.rmtree") 或者调用 [`os.lstat()`](https://docs.python.org/zh-cn/3/library/os.html#os.lstat "os.lstat") 和 [`os.rmdir()`](https://docs.python.org/zh-cn/3/library/os.html#os.rmdir "os.rmdir") 来移除一个路径及其内容。与 [`rmdir()`](#test.support.os_helper.rmdir "test.support.os_helper.rmdir") 一样，在 Windows 平台上这将使用一个检测文件是否存在的等待循环来包装。

@test.support.os\_helper.skip\_unless\_symlink[¶](#test.support.os_helper.skip_unless_symlink "Link to this definition")

一个用于运行需要符号链接支持的测试的装饰器。

@test.support.os\_helper.skip\_unless\_xattr[¶](#test.support.os_helper.skip_unless_xattr "Link to this definition")

一个用于运行需要 xattr 支持的测试的装饰器。

test.support.os\_helper.temp\_cwd(_name\='tempcwd'_, _quiet\=False_)[¶](#test.support.os_helper.temp_cwd "Link to this definition")

一个临时性地创建新目录并改变当前工作目录（CWD）的上下文管理器。

临时性地改变当前工作目录之前此上下文管理器会在当前目录下创建一个名为 _name_ 的临时目录。如果 _name_ 为 `None`，则会使用 [`tempfile.mkdtemp()`](https://docs.python.org/zh-cn/3/library/tempfile.html#tempfile.mkdtemp "tempfile.mkdtemp") 创建临时目录。

如果 _quiet_ 为 `False` 并且无法创建或修改 CWD，则会引发一个错误。在其他情况下，只会引发一个警告并使用原始 CWD。

test.support.os\_helper.temp\_dir(_path\=None_, _quiet\=False_)[¶](#test.support.os_helper.temp_dir "Link to this definition")

一个在 _path_ 上创建临时目录并输出该目录的上下文管理器。

如果 _path_ 为 `None`，则会使用 [`tempfile.mkdtemp()`](https://docs.python.org/zh-cn/3/library/tempfile.html#tempfile.mkdtemp "tempfile.mkdtemp") 来创建临时目录。如果 _quiet_ 为 `False`，则该上下文管理器在发生错误时会引发一个异常。在其他情况下，如果 _path_ 已被指定并且无法创建，则只会发出一个警告。

test.support.os\_helper.temp\_umask(_umask_)[¶](#test.support.os_helper.temp_umask "Link to this definition")

一个临时性地设置进程掩码的上下文管理器。

test.support.os\_helper.unlink(_filename_)[¶](#test.support.os_helper.unlink "Link to this definition")

在 _filename_ 上调用 [`os.unlink()`](https://docs.python.org/zh-cn/3/library/os.html#os.unlink "os.unlink")。与 [`rmdir()`](#test.support.os_helper.rmdir "test.support.os_helper.rmdir") 一样，在 Windows 平台上这将使用一个检测文件是否存在的等待循环来包装。

## `test.support.import_helper` --- 用于导入测试的工具Utilities for import tests[¶](#module-test.support.import_helper "Link to this heading")

`test.support.import_helper` 模块提供了对导入测试的支持。

Added in version 3.10.

test.support.import\_helper.forget(_module\_name_)[¶](#test.support.import_helper.forget "Link to this definition")

从 `sys.modules` 移除名为 _module\_name_ 的模块并删除该模块的已编译字节码文件。

test.support.import\_helper.import\_fresh\_module(_name_, _fresh\=()_, _blocked\=()_, _deprecated\=False_)[¶](#test.support.import_helper.import_fresh_module "Link to this definition")

此函数会在执行导入之前通过从 `sys.modules` 移除指定模块来导入并返回指定 Python 模块的新副本。请注意这不同于 `reload()`，原来的模块不会受到此操作的影响。

_fresh_ 是包含在执行导入之前还要从 `sys.modules` 缓存中移除的附加模块名称的可迭代对象。

_blocked_ 是包含模块名称的可迭代对象，导入期间在模块缓存中它会被替换为 `None` 以确保尝试导入将引发 [`ImportError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ImportError "ImportError").

指定名称的模块以及任何在 _fresh_ 和 _blocked_ 形参中指明的模块会在开始导入之前被保存并在全新导入完成时被重新插入到 `sys.modules` 中。

如果 _deprecated_ 为 `True` 则在此导入操作期间模块和包的弃用消息会被屏蔽。

如果指定名称的模块无法被导入则此函数将引发 [`ImportError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ImportError "ImportError")。

用法示例:

\# 获取 warnings 模块的副本用于测试而不会影响
\# 测试套件的其他部分所使用的版本。一个副本
\# 使用 C 实现，另一个被强制使用纯 Python 的
\# 回退实现
py\_warnings \= import\_fresh\_module('warnings', blocked\=\['\_warnings'\])
c\_warnings \= import\_fresh\_module('warnings', fresh\=\['\_warnings'\])

Added in version 3.1.

test.support.import\_helper.import\_module(_name_, _deprecated\=False_, _\*_, _required\_on\=()_)[¶](#test.support.import_helper.import_module "Link to this definition")

此函数会导入并返回指定名称的模块。不同于正常的导入，如果模块无法被导入则此函数将引发 [`unittest.SkipTest`](https://docs.python.org/zh-cn/3/library/unittest.html#unittest.SkipTest "unittest.SkipTest")。

如果 _deprecated_ 为 `True` 则在此导入操作期间模块和包的弃用消息会被屏蔽。 如果某个模块在特定平台上是必需的而在其他平台上是可选的，请为包含平台前缀的可迭代对象设置 _required\_on_，此对象将与 [`sys.platform`](https://docs.python.org/zh-cn/3/library/sys.html#sys.platform "sys.platform") 进行比对。

Added in version 3.1.

test.support.import\_helper.modules\_setup()[¶](#test.support.import_helper.modules_setup "Link to this definition")

返回 [`sys.modules`](https://docs.python.org/zh-cn/3/library/sys.html#sys.modules "sys.modules") 的副本。

test.support.import\_helper.modules\_cleanup(_oldmodules_)[¶](#test.support.import_helper.modules_cleanup "Link to this definition")

移除 _oldmodules_ 和 `encodings` 以外的模块以保留内部缓冲区。

test.support.import\_helper.unload(_name_)[¶](#test.support.import_helper.unload "Link to this definition")

从 `sys.modules` 中删除 _name_。

test.support.import\_helper.make\_legacy\_pyc(_source_)[¶](#test.support.import_helper.make_legacy_pyc "Link to this definition")

将 [**PEP 3147**](https://peps.python.org/pep-3147/)/[**PEP 488**](https://peps.python.org/pep-0488/) pyc 文件移至旧版 pyc 位置并返回该旧版 pyc 文件的文件系统路径。 _source_ 的值是源文件的文件系统路径。它不必真实存在，但是 PEP 3147/488 pyc 文件必须存在。

_class_ test.support.import\_helper.CleanImport(_\*module\_names_)[¶](#test.support.import_helper.CleanImport "Link to this definition")

强制导入以返回一个新的模块引用的上下文管理器。这适用于测试模块层级的行为，例如在导入时发出 [`DeprecationWarning`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#DeprecationWarning "DeprecationWarning")。 示例用法:

with CleanImport('foo'):
    importlib.import\_module('foo')  \# 新引用

_class_ test.support.import\_helper.DirsOnSysPath(_\*paths_)[¶](#test.support.import_helper.DirsOnSysPath "Link to this definition")

一个临时性地向 [`sys.path`](https://docs.python.org/zh-cn/3/library/sys.html#sys.path "sys.path") 添加目录的上下文管理器。

这将创建 [`sys.path`](https://docs.python.org/zh-cn/3/library/sys.html#sys.path "sys.path") 的一个副本，添加作为位置参数传入的任何目录，然后在上下文结束时将 `sys.path` 还原到副本的设置。

请注意该上下文管理器代码块中 _所有_ 对 [`sys.path`](https://docs.python.org/zh-cn/3/library/sys.html#sys.path "sys.path") 的修改，包括对象的替换，都将在代码块结束时被还原。

## `test.support.warnings_helper` --- 用于警告测试的工具Utilities for warnings tests[¶](#module-test.support.warnings_helper "Link to this heading")

`test.support.warnings_helper` 模块提供了对警告测试的支持。

Added in version 3.10.

test.support.warnings\_helper.ignore\_warnings(_\*_, _category_)[¶](#test.support.warnings_helper.ignore_warnings "Link to this definition")

抑制作为 _category_ 实例的警告，它必须为 [`Warning`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#Warning "Warning") 或其子类。大致等价于 [`warnings.catch_warnings()`](https://docs.python.org/zh-cn/3/library/warnings.html#warnings.catch_warnings "warnings.catch_warnings") 设置 [`warnings.simplefilter('ignore', category=category)`](https://docs.python.org/zh-cn/3/library/warnings.html#warnings.simplefilter "warnings.simplefilter")。例如:

@warning\_helper.ignore\_warnings(category\=DeprecationWarning)
def test\_suppress\_warning():
    \# 做些什么

Added in version 3.8.

test.support.warnings\_helper.check\_no\_resource\_warning(_testcase_)[¶](#test.support.warnings_helper.check_no_resource_warning "Link to this definition")

检测是否没有任何 [`ResourceWarning`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ResourceWarning "ResourceWarning") 被引发的上下文管理器。你必须在该上下文管理器结束之前移除可能发出 `ResourceWarning` 的对象。

test.support.warnings\_helper.check\_syntax\_warning(_testcase_, _statement_, _errtext\=''_, _\*_, _lineno\=1_, _offset\=None_)[¶](#test.support.warnings_helper.check_syntax_warning "Link to this definition")

用于通过尝试编译 _statement_ 来测试 _statement_ 中的语法警告。还会测试 [`SyntaxWarning`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#SyntaxWarning "SyntaxWarning") 是否只发出了一次，以及它在转成错误时是否将被转换为 [`SyntaxError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#SyntaxError "SyntaxError")。 _testcase_ 是用于测试的 [`unittest`](https://docs.python.org/zh-cn/3/library/unittest.html#module-unittest "unittest: Unit testing framework for Python.") 实例。 _errtext_ 是应当匹配所发出的 `SyntaxWarning` 以及所引发的 `SyntaxError` 的字符串表示形式的正则表达式。如果 _lineno_ 不为 `None`，则与警告和异常所在的行进行比较。 如果 _offset_ 不为 `None`，则与异常的偏移量进行比较。

Added in version 3.8.

test.support.warnings\_helper.check\_warnings(_\*filters_, _quiet\=True_)[¶](#test.support.warnings_helper.check_warnings "Link to this definition")

一个用于 [`warnings.catch_warnings()`](https://docs.python.org/zh-cn/3/library/warnings.html#warnings.catch_warnings "warnings.catch_warnings") 以更容易地测试特定警告是否被正确引发的便捷包装器。它大致等价于调用 `warnings.catch_warnings(record=True)` 并将 [`warnings.simplefilter()`](https://docs.python.org/zh-cn/3/library/warnings.html#warnings.simplefilter "warnings.simplefilter") 设为 `always` 并附带自动验证已记录结果的选项。

`check_warnings` 接受 `("message regexp", WarningCategory)` 形式的 2 元组作为位置参数。如果提供了一个或多个 _filters_，或者如果可选的关键字参数 _quiet_ 为 `False`，则它会检查确认警告是符合预期的：每个已指定的过滤器必须匹配至少一个被包围的代码或测试失败时引发的警告，并且如果有任何未能匹配已指定过滤器的警告被引发则测试将失败。 要禁用这些检查中的第一项，请将 _quiet_ 设为 `True`。

如果未指定任何参数，则默认为:

check\_warnings(("", Warning), quiet\=True)

在此情况下所有警告都会被捕获而不会引发任何错误。

在进入该上下文管理器时，将返回一个 `WarningRecorder` 实例。来自 [`catch_warnings()`](https://docs.python.org/zh-cn/3/library/warnings.html#warnings.catch_warnings "warnings.catch_warnings") 的下层警告列表可通过该记录器对象的 [`warnings`](https://docs.python.org/zh-cn/3/library/warnings.html#module-warnings "warnings: Issue warning messages and control their disposition.") 属性来访问。 作为一个便捷方式，该对象中代表最近的警告的属性也可通过该记录器对象来直接访问（参见以下示例）。 如果未引发任何警告，则在其他情况下预期代表一个警告的任何对象属性都将返回 `None`。

该记录器对象还有一个 `reset()` 方法，该方法会清空警告列表。

该上下文管理器被设计为像这样来使用:

with check\_warnings(("assertion is always true", SyntaxWarning),
                    ("", UserWarning)):
    exec('assert(False, "Hey!")')
    warnings.warn(UserWarning("Hide me!"))

在此情况下如果两个警告都未被引发，或是引发了其他的警告，则 [`check_warnings()`](#test.support.warnings_helper.check_warnings "test.support.warnings_helper.check_warnings") 将会引发一个错误。

当一个测试需要更深入地查看这些警告，而不是仅仅检查它们是否发生时，可以使用这样的代码:

with check\_warnings(quiet\=True) as w:
    warnings.warn("foo")
    assert str(w.args\[0\]) \== "foo"
    warnings.warn("bar")
    assert str(w.args\[0\]) \== "bar"
    assert str(w.warnings\[0\].args\[0\]) \== "foo"
    assert str(w.warnings\[1\].args\[0\]) \== "bar"
    w.reset()
    assert len(w.warnings) \== 0

在这里所有的警告都将被捕获，而测试代码会直接测试被捕获的警告。

在 3.2 版本发生变更: 新增可选参数 _filters_ 和 _quiet_。

_class_ test.support.warnings\_helper.WarningsRecorder[¶](#test.support.warnings_helper.WarningsRecorder "Link to this definition")

用于为单元测试记录警告的类。请参阅以上 [`check_warnings()`](#test.support.warnings_helper.check_warnings "test.support.warnings_helper.check_warnings") 的文档来了解详情。
