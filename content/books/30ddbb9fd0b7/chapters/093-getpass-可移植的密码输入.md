**源代码:** [Lib/getpass.py](https://github.com/python/cpython/tree/3.14/Lib/getpass.py)

* * *

`getpass` 模块提供了两个函数：

getpass.getpass(_prompt\='Password: '_, _stream\=None_, _\*_, _echo\_char\=None_)[¶](#getpass.getpass "Link to this definition")

提示用户输入一个密码且不会回显。用户会看到字符串 _prompt_ 作为提示，其默认值为 `'Password: '`。在 Unix 上，如有必要提示会使用替换错误句柄写入到文件型对象 _stream_。 _stream_ 默认指向控制终端 (`/dev/tty`)，如果不可用则指向 `sys.stderr` (此参数在 Windows 上会被忽略)。

_echo\_char_ 参数控制在按键时用户输入将如何显示。如果 _echo\_char_ 为 `None` (默认值)，输入将保持隐藏。 在其他情况下，_echo\_char_ 必须是一个可打印的 ASCII 字符而每个键入的字符将由它来替换。例如，`echo_char='*'` 将显示星号而不是实际输入内容。

如果无回显输入不可用，则 getpass() 将回退为向 _stream_ 打印一条警告消息，并从 `sys.stdin` 读取且发出 [`GetPassWarning`](#getpass.GetPassWarning "getpass.GetPassWarning").

备注

如果你从 IDLE 内部调用 getpass，输入可能是在你启动 IDLE 的终端中而非在 IDLE 窗口本身中完成。

备注

On Unix systems, when _echo\_char_ is set, the terminal will be configured to operate in _[noncanonical mode](https://manpages.debian.org/termios\(3\)#Canonical_and_noncanonical_mode)_. In particular, this means that line editing shortcuts such as Ctrl+U will not work and may insert unexpected characters into the input.

在 3.14 版本发生变更: 添加了 _echo\_char_ 形参用于键盘反馈。

_exception_ getpass.GetPassWarning[¶](#getpass.GetPassWarning "Link to this definition")

一个当密码输入可能被回显时发出的 [`UserWarning`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#UserWarning "UserWarning") 子类。

getpass.getuser()[¶](#getpass.getuser "Link to this definition")

返回用户的“登录名称”。

此函数会按顺序检查环境变量 `LOGNAME`, `USER`, `LNAME` 和 `USERNAME`，并返回其中第一个被设为非空字符串的值。如果全都未设置，则在支持 [`pwd`](https://docs.python.org/zh-cn/3/library/pwd.html#module-pwd "pwd: The password database (getpwnam() and friends).") 模块的系统上将返回来自密码数据库的登录名，在其他情况下，将会引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError")。

通常情况下，此函数应优先于 [`os.getlogin()`](https://docs.python.org/zh-cn/3/library/os.html#os.getlogin "os.getlogin")。

在 3.13 版本发生变更: 在之前版本中，除了 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 之外还会引发其他多种异常。
