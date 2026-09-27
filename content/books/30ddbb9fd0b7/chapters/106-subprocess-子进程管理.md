**源代码:** [Lib/subprocess.py](https://github.com/python/cpython/tree/3.14/Lib/subprocess.py)

* * *

`subprocess` 模块允许你生成新的进程，连接到它们的输入/输出/错误管道，并获取它们的返回代码。 此模块的目标是替代多个老旧的模块与函数:

os.system
os.spawn\*

有关如何使用 `subprocess` 模块来替代这些模块和函数的信息可以在后续的章节中找到。

参见

[**PEP 324**](https://peps.python.org/pep-0324/) -- 提出 subprocess 模块的 PEP

## 使用 `subprocess` 模块[¶](#using-the-subprocess-module "Link to this heading")

推荐的调用子进程的方式是在任何它支持的用例中使用 [`run()`](#subprocess.run "subprocess.run") 函数。对于更进阶的用例，也可以使用底层的 [`Popen`](#subprocess.Popen "subprocess.Popen") 接口。

subprocess.run(_args_, _\*_, _stdin\=None_, _input\=None_, _stdout\=None_, _stderr\=None_, _capture\_output\=False_, _shell\=False_, _cwd\=None_, _timeout\=None_, _check\=False_, _encoding\=None_, _errors\=None_, _text\=None_, _env\=None_, _universal\_newlines\=None_, _\*\*other\_popen\_kwargs_)[¶](#subprocess.run "Link to this definition")

运行被 _args_ 描述的指令。等待指令完成，然后返回一个 [`CompletedProcess`](#subprocess.CompletedProcess "subprocess.CompletedProcess") 实例。

以上显示的参数仅仅是最简单的一些，下面 [常用参数](#frequently-used-arguments) 描述（因此在缩写签名中使用仅关键字标示）。完整的函数头和 [`Popen`](#subprocess.Popen "subprocess.Popen") 的构造函数一样，此函数接受的大多数参数都被传递给该接口。（_timeout_, _input_, _check_ 和 _capture\_output_ 除外）。

如果 _capture\_output_ 为真值，则 stdout 和 stderr 将被捕获。当被使用时，内部 [`Popen`](#subprocess.Popen "subprocess.Popen") 对象将自动创建并把 _stdout_ 和 _stderr_ 均设为 [`PIPE`](#subprocess.PIPE "subprocess.PIPE")。 _stdout_ 和 _stderr_ 参数不可与 _capture\_output_ 同时提供。如果你希望捕获并将两个流合并在一起，请将 _stdout_ 设为 `PIPE` 并将 _stderr_ 设为 [`STDOUT`](#subprocess.STDOUT "subprocess.STDOUT")，而不是使用 _capture\_output_.

可以指定以秒为单位的 _timeout_，它会在内部传递给 [`Popen.communicate()`](#subprocess.Popen.communicate "subprocess.Popen.communicate")。 如果达到超时限制，子进程将被杀掉并等待。 [`TimeoutExpired`](#subprocess.TimeoutExpired "subprocess.TimeoutExpired") 异常将在子进程终结后重新被引发。在许多平台 API 上初始进程创建本身不可以被打断因此不保证你能看到超时异常直到至少进程创建花费的时间结束后。

_input_ 参数将被传递给 [`Popen.communicate()`](#subprocess.Popen.communicate "subprocess.Popen.communicate") 以及子进程的 stdin。 如果使用此参数则它必须是一个字节序列，或者如果指定了 _encoding_ 或 _errors_ 或 _text_ 为真值则可以是一个字符串。 当使用此参数时，将自动创建内部的 [`Popen`](#subprocess.Popen "subprocess.Popen") 对象并将其 _stdin_ 设为 [`PIPE`](#subprocess.PIPE "subprocess.PIPE")，并且不可同时使用 _stdin_ 参数。

如果 _check_ 设为 True, 并且进程以非零状态码退出，一个 [`CalledProcessError`](#subprocess.CalledProcessError "subprocess.CalledProcessError") 异常将被抛出。这个异常的属性将设置为参数，退出码，以及标准输出和标准错误，如果被捕获到。

如果指定了 _encoding_ 或 _errors_，或者 _text_ 被设为真值，标准输入、标准输出和标准错误的文件对象将使用指定的 _encoding_ 和 _errors_ 或者 [`io.TextIOWrapper`](https://docs.python.org/zh-cn/3/library/io.html#io.TextIOWrapper "io.TextIOWrapper") 默认值以文本模式打开。 _universal\_newlines_ 参数等同于 _text_ 并且提供了向后兼容性。默认情况下，文件对象是以二进制模式打开的。

如果 _env_ 不为 `None`，则它必须是一个为新进程定义环境变量的映射；它们将顶替继承当前进程环境的默认行为被使用。它会被直接传递给 [`Popen`](#subprocess.Popen "subprocess.Popen")。这个映射在任何平台上均可以是字符串到字符串的映射或者在 POSIX 平台上也可以是字节串到字节串的映射，就像是 [`os.environ`](https://docs.python.org/zh-cn/3/library/os.html#os.environ "os.environ") 或者 [`os.environb`](https://docs.python.org/zh-cn/3/library/os.html#os.environb "os.environb")。

示例:

\>>> subprocess.run(\["ls", "-l"\])  \# 不捕获输出
CompletedProcess(args=\['ls', '-l'\], returncode=0)

\>>> subprocess.run("exit 1", shell\=True, check\=True)
Traceback (most recent call last):
  ...
subprocess.CalledProcessError: Command 'exit 1' returned non-zero exit status 1

\>>> subprocess.run(\["ls", "-l", "/dev/null"\], capture\_output\=True)
CompletedProcess(args=\['ls', '-l', '/dev/null'\], returncode=0,
stdout=b'crw-rw-rw- 1 root root 1, 3 Jan 23 16:23 /dev/null\\n', stderr=b'')

Added in version 3.5.

在 3.6 版本发生变更: 添加了 _encoding_ 和 _errors_ 形参。

在 3.7 版本发生变更: 添加了 _text_ 形参，作为 _universal\_newlines_ 的一个更好理解的别名。添加了 _capture\_output_ 形参。

在 3.12 版本发生变更: 针对 `shell=True` 改变的 Windows shell 搜索顺序。当前目录和 `%PATH%` 会被替换为 `%COMSPEC%` 和 `%SystemRoot%\\System32\\cmd.exe`。因此，在当前目录中投放一个命名为 `cmd.exe` 的恶意程序不会再起作用。

_class_ subprocess.CompletedProcess[¶](#subprocess.CompletedProcess "Link to this definition")

[`run()`](#subprocess.run "subprocess.run") 的返回值，代表一个进程已经结束。

args[¶](#subprocess.CompletedProcess.args "Link to this definition")

被用作启动进程的参数。可能是一个列表或字符串。

returncode[¶](#subprocess.CompletedProcess.returncode "Link to this definition")

子进程的退出状态码。通常来说，一个为 0 的退出码表示进程运行正常。

一个负值 `-N` 表示子进程被信号 `N` 中断 (仅 POSIX).

stdout[¶](#subprocess.CompletedProcess.stdout "Link to this definition")

从子进程捕获到的标准输出。 一个字节序列，或者如果 [`run()`](#subprocess.run "subprocess.run") 是设置了 _encoding_, _errors_ 或者 `text=True` 来运行的则为一个字符串。 如果标准输出未被捕获则该值为 `None`。

如果你通过 `stderr=subprocess.STDOUT` 运行进程，标准输出和标准错误将被组合在这个属性中，并且 [`stderr`](#subprocess.CompletedProcess.stderr "subprocess.CompletedProcess.stderr") 将为 `None`。

stderr[¶](#subprocess.CompletedProcess.stderr "Link to this definition")

捕获到的子进程的标准错误。 一个字节序列，或者如果 [`run()`](#subprocess.run "subprocess.run") 是设置了参数 _encoding_, _errors_ 或者 `text=True` 运行的则为一个字符串。 如果标准错误未被捕获则该值为 `None`。

check\_returncode()[¶](#subprocess.CompletedProcess.check_returncode "Link to this definition")

如果 [`returncode`](#subprocess.CompletedProcess.returncode "subprocess.CompletedProcess.returncode") 非零，则会抛出 [`CalledProcessError`](#subprocess.CalledProcessError "subprocess.CalledProcessError") 异常。

Added in version 3.5.

subprocess.DEVNULL[¶](#subprocess.DEVNULL "Link to this definition")

可被 [`Popen`](#subprocess.Popen "subprocess.Popen") 的 _stdin_, _stdout_ 或者 _stderr_ 参数使用的特殊值，表示使用特殊文件 [`os.devnull`](https://docs.python.org/zh-cn/3/library/os.html#os.devnull "os.devnull").

Added in version 3.3.

subprocess.PIPE[¶](#subprocess.PIPE "Link to this definition")

可被 [`Popen`](#subprocess.Popen "subprocess.Popen") 的 _stdin_, _stdout_ 或者 _stderr_ 参数使用的特殊值，表示打开标准流的管道。常用于 [`Popen.communicate()`](#subprocess.Popen.communicate "subprocess.Popen.communicate").

subprocess.STDOUT[¶](#subprocess.STDOUT "Link to this definition")

可被 [`Popen`](#subprocess.Popen "subprocess.Popen") 的 _stderr_ 参数使用的特殊值，表示标准错误与标准输出使用同一句柄。

_exception_ subprocess.SubprocessError[¶](#subprocess.SubprocessError "Link to this definition")

此模块的其他异常的基类。

Added in version 3.3.

_exception_ subprocess.TimeoutExpired[¶](#subprocess.TimeoutExpired "Link to this definition")

[`SubprocessError`](#subprocess.SubprocessError "subprocess.SubprocessError") 的子类，等待子进程的过程中发生超时时被抛出。

cmd[¶](#subprocess.TimeoutExpired.cmd "Link to this definition")

用于创建子进程的指令。

timeout[¶](#subprocess.TimeoutExpired.timeout "Link to this definition")

超时秒数。

output[¶](#subprocess.TimeoutExpired.output "Link to this definition")

当被 [`run()`](#subprocess.run "subprocess.run") 或 [`check_output()`](#subprocess.check_output "subprocess.check_output") 捕获时的子进程的输出。在其它情况下将为 `None`。当有任何输出被捕获时这将始终为 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 而不考虑是否设置了 `text=True`。 当未检测到输出时它可能会保持为 `None` 而不是 `b''`。

stdout[¶](#subprocess.TimeoutExpired.stdout "Link to this definition")

对 output 的别名，对应的有 [`stderr`](#subprocess.TimeoutExpired.stderr "subprocess.TimeoutExpired.stderr")。

stderr[¶](#subprocess.TimeoutExpired.stderr "Link to this definition")

当被 [`run()`](#subprocess.run "subprocess.run") 捕获时的标准错误输出。在其它情况下将为 `None`。当有标准错误输出被捕获时这将始终为 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 而不考虑是否设置了 `text=True`。当未检测到标准错误输出时它可能会保持为 `None` 而不是 `b''`。

Added in version 3.3.

在 3.5 版本发生变更: 添加了 _stdout_ 和 _stderr_ 属性。

_exception_ subprocess.CalledProcessError[¶](#subprocess.CalledProcessError "Link to this definition")

[`SubprocessError`](#subprocess.SubprocessError "subprocess.SubprocessError") 的子类，当一个由 [`check_call()`](#subprocess.check_call "subprocess.check_call"), [`check_output()`](#subprocess.check_output "subprocess.check_output") 或 [`run()`](#subprocess.run "subprocess.run") (附带 `check=True`) 运行的进程返回了非零退出状态码时将被引发。

returncode[¶](#subprocess.CalledProcessError.returncode "Link to this definition")

Exit status of the child process, an integer. If the process exited due to a signal, this will be the negative signal number.

cmd[¶](#subprocess.CalledProcessError.cmd "Link to this definition")

用于创建子进程的指令。

output[¶](#subprocess.CalledProcessError.output "Link to this definition")

子进程的输出，如果被 [`run()`](#subprocess.run "subprocess.run") 或 [`check_output()`](#subprocess.check_output "subprocess.check_output") 捕获。否则为 `None`。

stdout[¶](#subprocess.CalledProcessError.stdout "Link to this definition")

对 output 的别名，对应的有 [`stderr`](#subprocess.CalledProcessError.stderr "subprocess.CalledProcessError.stderr")。

stderr[¶](#subprocess.CalledProcessError.stderr "Link to this definition")

子进程的标准错误输出，如果被 [`run()`](#subprocess.run "subprocess.run") 捕获。否则为 `None`。

在 3.5 版本发生变更: 添加了 _stdout_ 和 _stderr_ 属性。

### 常用参数[¶](#frequently-used-arguments "Link to this heading")

为了支持丰富的使用案例， [`Popen`](#subprocess.Popen "subprocess.Popen") 的构造函数（以及方便的函数）接受大量可选的参数。对于大多数典型的用例，许多参数可以被安全地留以它们的默认值。通常需要的参数有：

> _args_ 被所有调用需要，应当为一个字符串，或者一个程序参数序列。 提供一个参数序列通常更好，它可以更小心地使用参数中的转义字符以及引用（例如允许文件名中的空格）。 如果传递一个简单的字符串，则 _shell_ 参数必须为 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True") (见下文) 或者该字符串中将被运行的程序名必须用简单的命名而不指定任何参数。
> 
> _stdin_, _stdout_ 和 _stderr_ 分别指定被执行程序的标准输入、标准输出和标准错误文件句柄。合法的值包括 `None`, [`PIPE`](#subprocess.PIPE "subprocess.PIPE"), [`DEVNULL`](#subprocess.DEVNULL "subprocess.DEVNULL"), 现存的文件描述符（一个正整数），现存的具有合法文件描述符的 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)。当使用默认设置 `None` 时，将不会进行任何重定向。 `PIPE` 表示应当新建一个连接子进程的管道。 `DEVNULL` 表示将使用特殊文件 [`os.devnull`](https://docs.python.org/zh-cn/3/library/os.html#os.devnull "os.devnull")。此外，_stderr_ 还可以为 [`STDOUT`](#subprocess.STDOUT "subprocess.STDOUT")，这表示来自子进程的 stderr 数据应当被捕获到与 _stdout_ 相同的文件句柄中。
> 
> 如果指定了 _encoding_ 或 _errors_，或者 _text_ (也称 _universal\_newlines_) 为真，则文件对象 _stdin_、 _stdout_ 与 _stderr_ 将会使用在此次调用中指定的 _encoding_ 和 _errors_ 或者 [`io.TextIOWrapper`](https://docs.python.org/zh-cn/3/library/io.html#io.TextIOWrapper "io.TextIOWrapper") 的默认值以文本模式打开。
> 
> 当构造函数的 _newline_ 参数为 `None` 时。对于 _stdin_，输入的换行符 `'\\n'` 将被转换为默认的换行符 [`os.linesep`](https://docs.python.org/zh-cn/3/library/os.html#os.linesep "os.linesep")。对于 _stdout_ 和 _stderr_，所有输出的换行符都被转换为 `'\\n'`。更多信息，查看 [`io.TextIOWrapper`](https://docs.python.org/zh-cn/3/library/io.html#io.TextIOWrapper "io.TextIOWrapper") 类的文档。
> 
> 如果文本模式未被使用， _stdin_， _stdout_ 和 _stderr_ 将会以二进制流模式打开。没有编码与换行符转换发生。
> 
> 在 3.6 版本发生变更: 增加了 _encoding_ 和 _errors_ 形参。
> 
> 在 3.7 版本发生变更: 添加了 _text_ 形参作为 _universal\_newlines_ 的别名。
> 
> 备注
> 
> 文件对象 [`Popen.stdin`](#subprocess.Popen.stdin "subprocess.Popen.stdin")、 [`Popen.stdout`](#subprocess.Popen.stdout "subprocess.Popen.stdout") 和 [`Popen.stderr`](#subprocess.Popen.stderr "subprocess.Popen.stderr") 的换行符属性不会被 [`Popen.communicate()`](#subprocess.Popen.communicate "subprocess.Popen.communicate") 方法更新。
> 
> 如果 _shell_ 设为 `True`，则使用 shell 执行指定的指令。如果您主要使用 Python 增强的控制流（它比大多数系统 shell 提供的强大），并且仍然希望方便地使用其他 shell 功能，如 shell 管道、文件通配符、环境变量展开以及 `~` 展开到用户家目录，这将非常有用。但是，注意 Python 自己也实现了许多类似 shell 的特性 (例如 [`glob`](https://docs.python.org/zh-cn/3/library/glob.html#module-glob "glob: Unix shell style pathname pattern expansion."), [`fnmatch`](https://docs.python.org/zh-cn/3/library/fnmatch.html#module-fnmatch "fnmatch: Unix shell style filename pattern matching."), [`os.walk()`](https://docs.python.org/zh-cn/3/library/os.html#os.walk "os.walk"), [`os.path.expandvars()`](https://docs.python.org/zh-cn/3/library/os.path.html#os.path.expandvars "os.path.expandvars"), [`os.path.expanduser()`](https://docs.python.org/zh-cn/3/library/os.path.html#os.path.expanduser "os.path.expanduser") 和 [`shutil`](https://docs.python.org/zh-cn/3/library/shutil.html#module-shutil "shutil: High-level file operations, including copying."))。
> 
> 备注
> 
> 在使用 `shell=True` 之前，请阅读 [Security Considerations](#security-considerations) 段落。

这些选项以及所有其他选项在 [`Popen`](#subprocess.Popen "subprocess.Popen") 构造函数文档中有更详细的描述。

### Popen 构造函数[¶](#popen-constructor "Link to this heading")

此模块的底层的进程创建与管理由 [`Popen`](#subprocess.Popen "subprocess.Popen") 类处理。它提供了很大的灵活性，因此开发者能够处理未被便利函数覆盖的不常见用例。

_class_ subprocess.Popen(_args_, _bufsize\=\-1_, _executable\=None_, _stdin\=None_, _stdout\=None_, _stderr\=None_, _preexec\_fn\=None_, _close\_fds\=True_, _shell\=False_, _cwd\=None_, _env\=None_, _universal\_newlines\=None_, _startupinfo\=None_, _creationflags\=0_, _restore\_signals\=True_, _start\_new\_session\=False_, _pass\_fds\=()_, _\*_, _group\=None_, _extra\_groups\=None_, _user\=None_, _umask\=\-1_, _encoding\=None_, _errors\=None_, _text\=None_, _pipesize\=\-1_, _process\_group\=None_)[¶](#subprocess.Popen "Link to this definition")

在一个新的进程中执行子程序。在 POSIX 上，该类会使用类似于 [`os.execvpe()`](https://docs.python.org/zh-cn/3/library/os.html#os.execvpe "os.execvpe") 的行为来执行子程序。在 Windows 上，该类会使用 Windows `CreateProcess()` 函数。 [`Popen`](#subprocess.Popen "subprocess.Popen") 的参数如下。

_args_ 应当是一个程序参数的序列或者是一个单独的字符串或 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object)。默认情况下，如果 _args_ 是序列则要运行的程序为 _args_ 中的第一项。如果 _args_ 是字符串，则其解读依赖于具体平台，如下所述。请查看 _shell_ 和 _executable_ 参数了解其与默认行为的其他差异。除非另有说明，否则推荐以序列形式传入 _args_。

警告

为了最大化可靠性，请使用可执行文件的完整限定路径。要在 `PATH` 中搜索一个非限定名称，请使用 [`shutil.which()`](https://docs.python.org/zh-cn/3/library/shutil.html#shutil.which "shutil.which")。在所有平台上，传入 [`sys.executable`](https://docs.python.org/zh-cn/3/library/sys.html#sys.executable "sys.executable") 是再次启动当前 Python 解释器的推荐方式，并请使用 `-m` 命令行格式来启动已安装的模块。

对 _executable_ (或 _args_ 的第一项) 路径的解析方式依赖于具体平台。对于 POSIX，请参阅 [`os.execvpe()`](https://docs.python.org/zh-cn/3/library/os.html#os.execvpe "os.execvpe")，并要注意当解析或搜索可执行文件路径时，_cwd_ 会覆盖当前工作目录而 _env_ 可以覆盖 `PATH` 环境变量。对于 Windows，请参阅 `lpApplicationName` 的文档以及 `lpCommandLine` 形参 (传给 WinAPI `CreateProcess`)，并要注意当解析或搜索可执行文件路径时如果传入 `shell=False`，则 _cwd_ 不会覆盖当前工作目录而 _env_ 无法覆盖 `PATH` 环境变量。使用完整路径可避免所有这些变化情况。

向外部程序传入序列形式参数的一个例子如下:

Popen(\["/usr/bin/git", "commit", "-m", "Fixes a bug."\])

在 POSIX，如果 _args_ 是一个字符串，此字符串被作为将被执行的程序的命名或路径解释。但是，只有在不传递任何参数给程序的情况下才能这么做。

备注

将 shell 命令拆分为参数序列的方式可能并不很直观，特别是在复杂的情况下。 [`shlex.split()`](https://docs.python.org/zh-cn/3/library/shlex.html#shlex.split "shlex.split") 可以演示如何确定 _args_ 适当的拆分形式:

\>>> import shlex, subprocess
\>>> command\_line \= input()
/bin/vikings -input eggs.txt -output "spam spam.txt" -cmd "echo '$MONEY'"
\>>> args \= shlex.split(command\_line)
\>>> print(args)
\['/bin/vikings', '-input', 'eggs.txt', '-output', 'spam spam.txt', '-cmd', "echo '$MONEY'"\]
\>>> p \= subprocess.Popen(args) \# Success!

特别注意，由 shell 中的空格分隔的选项（例如 _\-input_）和参数（例如 _eggs.txt_ ）位于分开的列表元素中，而在需要时使用引号或反斜杠转义的参数在 shell（例如包含空格的文件名或上面显示的 _echo_ 命令）是单独的列表元素。

在 Windows，如果 _args_ 是一个序列，它将通过一个在 [在 Windows 上将参数列表转换为一个字符串](#converting-argument-sequence) 描述的方式被转换为一个字符串。这是因为底层的 `CreateProcess()` 只处理字符串。

在 3.6 版本发生变更: 在 POSIX 上如果 _shell_ 为 `False` 并且序列包含路径类对象则 _args_ 形参可以接受一个 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object).

在 3.8 版本发生变更: 如果在 Windows 上 _shell_ 为 `False` 并且序列包含字节串和路径类对象则 _args_ 形参可以接受一个 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object).

参数 _shell_ (默认为 `False`) 指定是否使用 shell 执行程序。 如果 _shell_ 为 `True`，更推荐将 _args_ 作为字符串传递而非序列。

在 POSIX，当 `shell=True`，shell 默认为 `/bin/sh`。如果 _args_ 是一个字符串，此字符串指定将通过 shell 执行的命令。这意味着字符串的格式必须和在命令提示符中所输入的完全相同。这包括，例如，引号和反斜杠转义包含空格的文件名。如果 _args_ 是一个序列，第一项指定了命令，另外的项目将作为传递给 shell（而非命令）的参数对待。也就是说， [`Popen`](#subprocess.Popen "subprocess.Popen") 等同于:

Popen(\['/bin/sh', '-c', args\[0\], args\[1\], ...\])

在 Windows，使用 `shell=True`，环境变量 `COMSPEC` 指定了默认 shell。在 Windows 你唯一需要指定 `shell=True` 的情况是你想要执行内置在 shell 中的命令 (例如 **dir** 或者 **copy**)。 在运行一个批处理文件或者基于控制台的可执行文件时，不需要 `shell=True`。

备注

在使用 `shell=True` 之前，请阅读 [Security Considerations](#security-considerations) 段落。

_bufsize_ 将在 [`open()`](https://docs.python.org/zh-cn/3/builtins/functions.html#open "open") 函数创建了 stdin/stdout/stderr 管道文件对象时作为对应的参数供应：

-   `0` 表示不使用缓冲区（读取与写入是一个系统调用并且可以返回短内容）
    
-   `1` 表示带有行缓冲（仅在 `text=True` 或 `universal_newlines=True` 时有用）
    
-   任何其他正值表示使用一个约为对应大小的缓冲区
    
-   负的 _bufsize_ （默认）表示使用系统默认的 io.DEFAULT\_BUFFER\_SIZE。
    

在 3.3.1 版本发生变更: _bufsize_ 现在默认为 -1 表示启用缓冲以符合大多数代码所期望的行为。在 Python 3.2.4 和 3.3.1 之前的版本中它错误地将默认值设为 `0` 即无缓冲并且允许短读取。这是无意的失误并且与大多数代码所期望的 Python 2 的行为不一致。

_executable_ 参数指定一个要执行的替换程序。这很少需要。当 `shell=False`， _executable_ 替换 _args_ 指定运行的程序。但是，原始的 _args_ 仍然被传递给程序。大多数程序将被 _args_ 指定的程序作为命令名对待，这可以与实际运行的程序不同。在 POSIX， _args_ 名作为实际调用程序中可执行文件的显示名称，例如 **ps**。如果 `shell=True`，在 POSIX， _executable_ 参数指定用于替换默认 shell `/bin/sh` 的 shell。

在 3.8 版本发生变更: 在 Windows 上 _executable_ 形参可以接受一个字节串和 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object)。

在 3.12 版本发生变更: 针对 `shell=True` 改变的 Windows shell 搜索顺序。当前目录和 `%PATH%` 会被替换为 `%COMSPEC%` 和 `%SystemRoot%\\System32\\cmd.exe`。因此，在当前目录中投放一个命名为 `cmd.exe` 的恶意程序不会再起作用。

_stdin_, _stdout_ 和 _stderr_ 分别指定被执行程序的标准输入、标准输出和标准错误文件句柄。合法的值包括 `None`, [`PIPE`](#subprocess.PIPE "subprocess.PIPE"), [`DEVNULL`](#subprocess.DEVNULL "subprocess.DEVNULL"), 现存的文件描述符（一个正整数），现存的具有合法文件描述符的 [file object](https://docs.python.org/zh-cn/3/glossary.html#term-file-object)。当使用默认设置 `None` 时，将不会进行任何重定向。 `PIPE` 表示应当新建一个连接子进程的管道。 `DEVNULL` 表示将使用特殊文件 [`os.devnull`](https://docs.python.org/zh-cn/3/library/os.html#os.devnull "os.devnull")。此外，_stderr_ 还可以为 [`STDOUT`](#subprocess.STDOUT "subprocess.STDOUT")，这表示来自子进程的 stderr 数据应当被捕获到与 _stdout_ 相同的文件句柄中。

如果 _preexec\_fn_ 被设为一个可调用对象，此对象将在子进程刚创建时被调用。（仅 POSIX）

警告

_preexec\_fn_ 形参在应用程序中存在多线程时是不安全的。子进程在 exec 被调用之前可能会死锁。

备注

如果你需要为子进程修改环境请使用 _env_ 形参而不要在 _preexec\_fn_ 中操作。 _start\_new\_session_ 和 _process\_group_ 形参应当代替使用 _preexec\_fn_ 的代码来在子进程中调用 [`os.setsid()`](https://docs.python.org/zh-cn/3/library/os.html#os.setsid "os.setsid") 或 [`os.setpgid()`](https://docs.python.org/zh-cn/3/library/os.html#os.setpgid "os.setpgid").

在 3.8 版本发生变更: _preexec\_fn_ 形参在子解释器中已不再受支持。在子解释器中使用此形参将引发 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")。 这个新限制可能会影响部署在 mod\_wsgi, uWSGI 和其他嵌入式环境中的应用。

如果 _close\_fds_ 为真值，则除 `0`, `1` 和 `2` 之外的所有文件描述符都将在子进程执行前被关闭。而当 _close\_fds_ 为假值时，文件描述符将遵循它们的可继承旗标，如 [文件描述符的继承](https://docs.python.org/zh-cn/3/library/os.html#fd-inheritance) 所描述的。

在 Windows，如果 _close\_fds_ 为真，则子进程不会继承任何句柄，除非在 [`STARTUPINFO.lpAttributeList`](#subprocess.STARTUPINFO.lpAttributeList "subprocess.STARTUPINFO.lpAttributeList") 的 `handle_list` 的键中显式传递，或者通过标准句柄重定向传递。

在 3.2 版本发生变更: _close\_fds_ 的默认值已经从 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False") 修改为上述值。

在 3.7 版本发生变更: 在 Windows，当重定向标准句柄时 _close\_fds_ 的默认值从 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False") 变为 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")。现在重定向标准句柄时有可能设置 _close\_fds_ 为 `True`。（标准句柄指三个 stdio 的句柄）

_pass\_fds_ 是一个可选的在父子进程间保持打开的文件描述符序列。提供任何 _pass\_fds_ 将强制 _close\_fds_ 为 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")。（仅 POSIX）

在 3.2 版本发生变更: 加入了 _pass\_fds_ 形参。

如果 _cwd_ 不为 `None`，此函数在执行子进程前会将当前工作目录改为 _cwd_。 _cwd_ 可以是一个字符串、字节串或 [路径类对象](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object)。在 POSIX 上，如果可执行文件路径为相对路径则此函数会相对于 _cwd_ 来查找 _executable_ (或 _args_ 的第一项)。

在 3.8 版本发生变更: 在 Windows 上 _cwd_ 形参接受一个字节串对象。

 如果 _restore\_signals_ 为 true（默认值），则 Python 设置为 SIG\_IGN 的所有信号将在 exec 之前的子进程中恢复为 SIG\_DFL。目前，这包括 SIGPIPE，SIGXFZ 和 SIGXFSZ 信号。 （仅 POSIX）

在 3.2 版本发生变更: _restore\_signals_ 被加入。

如果 _start\_new\_session_ 为真值则 `setsid()` 系统调用将在执行子进程之前在子进程中执行。

在 3.2 版本发生变更: _start\_new\_session_ 被添加。

如果 _process\_group_ 为非负整数，则 `setpgid(0, value)` 系统调用将在执行子进程之前在子进程中执行。

在 3.11 版本发生变更: 添加了 _process\_group_。

如果 _group_ 不为 `None`，则 setregid() 系统调用将在子进程执行之前在下级进程中进行。如果所提供的值是一个字符串，将通过 [`grp.getgrnam()`](https://docs.python.org/zh-cn/3/library/grp.html#grp.getgrnam "grp.getgrnam") 来查找它并将使用 `gr_gid` 中的值。如果该值是一个整数，它将被原样传递。 （POSIX 专属）

Added in version 3.9.

如果 _extra\_groups_ 不为 `None`，则 setgroups() 系统调用将在子进程执行之前在下级进程中进行。在 _extra\_groups_ 中提供的字符串将通过 [`grp.getgrnam()`](https://docs.python.org/zh-cn/3/library/grp.html#grp.getgrnam "grp.getgrnam") 来查找并将使用 `gr_gid` 中的值。 整数值将被原样传递。 （POSIX 专属）

Added in version 3.9.

如果 _user_ 不为 `None`，则 setreuid() 系统调用将在子进程执行之前 在下级进程中进行。如果所提供的值是一个字符串，将通过 [`pwd.getpwnam()`](https://docs.python.org/zh-cn/3/library/pwd.html#pwd.getpwnam "pwd.getpwnam") 来查找它并将使用 `pw_uid` 中的值。如果该值是一个整数，它将被原样传递。 （POSIX 专属）

备注

指明 _user_ 不会丢弃现有的补充分组成员！ 出于安全考虑调用方还必须传入 `extra_groups=()` 以缩减子进程的分组成员。

Added in version 3.9.

如果 _umask_ 不为负值，则 umask() 系统调用将在子进程执行之前在下级进程中进行。

Added in version 3.9.

如果 _env_ 不为 `None`，则它必须是一个为新进程定义环境变量的映射；它们将顶替继承当前环境的默认行为被使用。 这个映射在任何平台上均可以是字符串到字符串的映射或者在 POSIX 平台上也可以是字节串到字节串的映射，就像是 [`os.environ`](https://docs.python.org/zh-cn/3/library/os.html#os.environ "os.environ") 或者 [`os.environb`](https://docs.python.org/zh-cn/3/library/os.html#os.environb "os.environb")。

如果指定了 _encoding_ 或 _errors_，或者如果 _text_ 为真值，则文件对象 _stdin_, _stdout_ 和 _stderr_ 将使用指定的 _encoding_ 和 _errors_ 以文本模式打开，就如上文 [常用参数](#frequently-used-arguments) 中所描述的。 _universal\_newlines_ 参数等同于 _text_ 且是出于下向兼容性考虑而提供的。 在默认情况下，文件对象将以二进制模式打开。

Added in version 3.6: _encoding_ 和 _errors_ 被添加。

Added in version 3.7: _text_ 作为 _universal\_newlines_ 的一个更具可读性的别名被添加。

如果给出，_startupinfo_ 将是一个 [`STARTUPINFO`](#subprocess.STARTUPINFO "subprocess.STARTUPINFO") 对象，它会被传递给下层的 `CreateProcess` 函数。

如果给出，_creationflags_ 可以是下列旗标中的一个或多个：

-   [`CREATE_NEW_CONSOLE`](#subprocess.CREATE_NEW_CONSOLE "subprocess.CREATE_NEW_CONSOLE")
    
-   [`CREATE_NEW_PROCESS_GROUP`](#subprocess.CREATE_NEW_PROCESS_GROUP "subprocess.CREATE_NEW_PROCESS_GROUP")
    
-   [`ABOVE_NORMAL_PRIORITY_CLASS`](#subprocess.ABOVE_NORMAL_PRIORITY_CLASS "subprocess.ABOVE_NORMAL_PRIORITY_CLASS")
    
-   [`BELOW_NORMAL_PRIORITY_CLASS`](#subprocess.BELOW_NORMAL_PRIORITY_CLASS "subprocess.BELOW_NORMAL_PRIORITY_CLASS")
    
-   [`HIGH_PRIORITY_CLASS`](#subprocess.HIGH_PRIORITY_CLASS "subprocess.HIGH_PRIORITY_CLASS")
    
-   [`IDLE_PRIORITY_CLASS`](#subprocess.IDLE_PRIORITY_CLASS "subprocess.IDLE_PRIORITY_CLASS")
    
-   [`NORMAL_PRIORITY_CLASS`](#subprocess.NORMAL_PRIORITY_CLASS "subprocess.NORMAL_PRIORITY_CLASS")
    
-   [`REALTIME_PRIORITY_CLASS`](#subprocess.REALTIME_PRIORITY_CLASS "subprocess.REALTIME_PRIORITY_CLASS")
    
-   [`CREATE_NO_WINDOW`](#subprocess.CREATE_NO_WINDOW "subprocess.CREATE_NO_WINDOW")
    
-   [`DETACHED_PROCESS`](#subprocess.DETACHED_PROCESS "subprocess.DETACHED_PROCESS")
    
-   [`CREATE_DEFAULT_ERROR_MODE`](#subprocess.CREATE_DEFAULT_ERROR_MODE "subprocess.CREATE_DEFAULT_ERROR_MODE")
    
-   [`CREATE_BREAKAWAY_FROM_JOB`](#subprocess.CREATE_BREAKAWAY_FROM_JOB "subprocess.CREATE_BREAKAWAY_FROM_JOB")
    

当 [`PIPE`](#subprocess.PIPE "subprocess.PIPE") 被用作 _stdin_, _stdout_ 或 _stderr_ 时 _pipesize_ 可被用于改变管道的大小。 管道的大小仅会在受支持的平台上被改变（当撰写本文档时只有 Linux 支持）。其他平台将忽略此形参。

在 3.10 版本发生变更: 增加了 _pipesize_ 形参。

Popen 对象支持通过 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句作为上下文管理器，在退出时关闭文件描述符并等待进程:

with Popen(\["ifconfig"\], stdout\=PIPE) as proc:
    log.write(proc.stdout.read())

Popen 和此模块中用到它的其他函数会引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `subprocess.Popen`，附带参数 `executable`, `args`, `cwd` 和 `env`。`args` 的值可以是单个字符串或字符串列表，取决于具体的平台。

在 3.2 版本发生变更: 添加了上下文管理器支持。

在 3.6 版本发生变更: 现在，如果 Popen 析构时子进程仍然在运行，则析构器会发送一个 [`ResourceWarning`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ResourceWarning "ResourceWarning") 警告。

在 3.8 版本发生变更: 在某些情况下 Popen 可以使用 [`os.posix_spawn()`](https://docs.python.org/zh-cn/3/library/os.html#os.posix_spawn "os.posix_spawn") 以获得更好的性能。在适用于 Linux 的 Windows 子系统和 QEMU 用户模拟器上，使用 `os.posix_spawn()` 的 Popen 构造器不再会因找不到程序等错误而引发异常，而是子进程失败并返回一个非零的 [`returncode`](#subprocess.Popen.returncode "subprocess.Popen.returncode")。

### 异常[¶](#exceptions "Link to this heading")

在子进程中抛出的异常，在新的进程开始执行前，将会被再次在父进程中抛出。

被引发的最一般异常是 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError")。例如这会在尝试执行一个不存在的文件时发生。应用程序应当为 `OSError` 异常做好准备。请注意，如果 `shell=True`，则 `OSError` 仅会在未找到选定的 shell 本身时被引发。要确定 shell 是否未找到所请求的应用程序，必须检查来自子进程的返回码或输出。

如果 [`Popen`](#subprocess.Popen "subprocess.Popen") 调用时有无效的参数，则一个 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 将被抛出。

[`check_call()`](#subprocess.check_call "subprocess.check_call") 与 [`check_output()`](#subprocess.check_output "subprocess.check_output") 在调用的进程返回非零退出码时将抛出 [`CalledProcessError`](#subprocess.CalledProcessError "subprocess.CalledProcessError").

所有接受 _timeout_ 形参的函数与方法，例如 [`run()`](#subprocess.run "subprocess.run") 和 [`Popen.communicate()`](#subprocess.Popen.communicate "subprocess.Popen.communicate") 将会在进程退出前超时到期时引发 [`TimeoutExpired`](#subprocess.TimeoutExpired "subprocess.TimeoutExpired")。

此模块中定义的异常都继承自 [`SubprocessError`](#subprocess.SubprocessError "subprocess.SubprocessError")。

Added in version 3.3: 基类 [`SubprocessError`](#subprocess.SubprocessError "subprocess.SubprocessError") 被添加。

## 安全考量[¶](#security-considerations "Link to this heading")

不同于某些其他的 popen 函数，这个库将不会隐式地选择调用系统 shell。这意味着所有字符，包括 shell 元字符都可以被安全地传递给子进程。 如果 shell 是通过 `shell=True` 被显式地唤起的，则应用程序要负责确保所有空白符和元字符被适当地转义以避免 [shell 注入](https://en.wikipedia.org/wiki/Shell_injection#Shell_injection) 安全漏洞。在 [某些平台](https://docs.python.org/zh-cn/3/library/shlex.html#shlex-quote-warning) 上，可以使用 [`shlex.quote()`](https://docs.python.org/zh-cn/3/library/shlex.html#shlex.quote "shlex.quote") 来执行这种转义。

在 Windows 上，批处理文件 (`*.bat` 或 `*.cmd`) 可以在系统 shell 中通过操作系统调用来启动而忽略传给该库的参数。这可能导致根据 shell 规则来解析参数，而没有任何 Python 添加的转义。 如果你想要附带来自不受信任源的参数启动批处理文件，请考虑传入 `shell=True` 以允许 Python 转义特殊字符。请参阅 [gh-114539](https://github.com/python/cpython/issues/114539) 了解相关讨论。

## Popen 对象[¶](#popen-objects "Link to this heading")

[`Popen`](#subprocess.Popen "subprocess.Popen") 类的实例拥有以下方法：

Popen.poll()[¶](#subprocess.Popen.poll "Link to this definition")

检查子进程是否已被终止。设置并返回 [`returncode`](#subprocess.Popen.returncode "subprocess.Popen.returncode") 属性。否则返回 `None`。

Popen.wait(_timeout\=None_)[¶](#subprocess.Popen.wait "Link to this definition")

等待子进程被终止。设置并返回 [`returncode`](#subprocess.Popen.returncode "subprocess.Popen.returncode") 属性。

如果进程在 _timeout_ 秒后未中断，抛出一个 [`TimeoutExpired`](#subprocess.TimeoutExpired "subprocess.TimeoutExpired") 异常，可以安全地捕获此异常并重新等待。

备注

当 `stdout=PIPE` 或者 `stderr=PIPE` 并且子进程产生了足以阻塞 OS 管道缓冲区接收更多数据的输出到管道时，将会发生死锁。当使用管道时用 [`Popen.communicate()`](#subprocess.Popen.communicate "subprocess.Popen.communicate") 来规避它。

在 3.3 版本发生变更: _timeout_ 被添加

Popen.communicate(_input\=None_, _timeout\=None_)[¶](#subprocess.Popen.communicate "Link to this definition")

与进程交互：将数据发送到 stdin。从 stdout 和 stderr 读取数据，直到抵达文件结尾。等待进程终止并设置 [`returncode`](#subprocess.Popen.returncode "subprocess.Popen.returncode") 属性。可选的 _input_ 参数应为要发送到下级进程的数据，或者如果没有要发送到下级进程的数据则为 `None`。如果流是以文本模式打开的，则 _input_ 必须为字符串。 在其他情况下，它必须为字节串。

[`communicate()`](#subprocess.Popen.communicate "subprocess.Popen.communicate") 返回一个 `(stdout_data, stderr_data)` 元组。如果文件以文本模式打开则为字符串；否则字节。

注意如果你想要向进程的 stdin 传输数据，你需要通过 `stdin=PIPE` 创建此 Popen 对象。类似的，要从结果元组获取任何非 `None` 值，你同样需要设置 `stdout=PIPE` 或者 `stderr=PIPE`。

如果进程在 _timeout_ 秒后仍未终结，将会引发 [`TimeoutExpired`](#subprocess.TimeoutExpired "subprocess.TimeoutExpired") 异常。捕获此异常并重试通信将不会丢失任何输出。将 _input_ 提供给后续的已超时 [`communicate()`](#subprocess.Popen.communicate "subprocess.Popen.communicate") 调用是未定义的行为并可能在未来导致错误。

如果超时到期，子进程不会被杀死，所以为了正确清理一个行为良好的应用程序应该杀死子进程并完成通讯。

proc \= subprocess.Popen(...)
try:
    outs, errs \= proc.communicate(timeout\=15)
except TimeoutExpired:
    proc.kill()
    outs, errs \= proc.communicate()

在对 [`communicate()`](#subprocess.Popen.communicate "subprocess.Popen.communicate") 的调用引发 [`TimeoutExpired`](#subprocess.TimeoutExpired "subprocess.TimeoutExpired") 之后，不要调用 [`wait()`](#subprocess.Popen.wait "subprocess.Popen.wait")。请用一个额外的 `communicate()` 来结束处理管道并填充 [`returncode`](#subprocess.Popen.returncode "subprocess.Popen.returncode") 属性。

备注

内存里数据读取是缓冲的，所以如果数据尺寸过大或无限，不要使用此方法。

在 3.3 版本发生变更: _timeout_ 被添加

Popen.send\_signal(_signal_)[¶](#subprocess.Popen.send_signal "Link to this definition")

将信号 _signal_ 发送给子进程。

如果进程已完成则不做任何操作。

备注

在 Windows 上，SIGTERM 是 [`terminate()`](#subprocess.Popen.terminate "subprocess.Popen.terminate") 的别名。CTRL\_C\_EVENT 和 CTRL\_BREAK\_EVENT 可被发送给以包括 `CREATE_NEW_PROCESS_GROUP` 的 _creationflags_ 形参来启动的进程。

Popen.terminate()[¶](#subprocess.Popen.terminate "Link to this definition")

停止子进程。在 POSIX 操作系统上此方法会发送 [`SIGTERM`](https://docs.python.org/zh-cn/3/library/signal.html#signal.SIGTERM "signal.SIGTERM") 给子进程。在 Windows 上则会调用 Win32 API 函数 `TerminateProcess()` 来停止子进程。

Popen.kill()[¶](#subprocess.Popen.kill "Link to this definition")

杀死子进程。在 POSIX 操作系统上，此函数会发送 SIGKILL 给子进程。在 Windows 上 [`kill()`](#subprocess.Popen.kill "subprocess.Popen.kill") 则是 [`terminate()`](#subprocess.Popen.terminate "subprocess.Popen.terminate") 的别名。

下列属性也会通过类来设置以供你访问。将它们重赋新值是不受支持的：

Popen.args[¶](#subprocess.Popen.args "Link to this definition")

_args_ 参数传递给 [`Popen`](#subprocess.Popen "subprocess.Popen") -- 一个程序参数的序列或者一个简单字符串。

Added in version 3.3.

Popen.stdin[¶](#subprocess.Popen.stdin "Link to this definition")

如果 _stdin_ 参数为 [`PIPE`](#subprocess.PIPE "subprocess.PIPE")，此属性是一个类似 [`open()`](https://docs.python.org/zh-cn/3/builtins/functions.html#open "open") 所返回对象的可写流对象。如果指定了 _encoding_ 或 _errors_ 参数或者 _text_ 或 _universal\_newlines_ 参数为 `True`，则这个流将是一个文本流，否则将是一个字节流。如果 _stdin_ 参数不为 `PIPE`，则此属性将为 `None`.

Popen.stdout[¶](#subprocess.Popen.stdout "Link to this definition")

如果 _stdout_ 参数为 [`PIPE`](#subprocess.PIPE "subprocess.PIPE")，此属性是一个类似 [`open()`](https://docs.python.org/zh-cn/3/builtins/functions.html#open "open") 所返回对象的可读流对象。 从流中读取将会提供来自子进程的输出。如果 _encoding_ 或 _errors_ 参数被指定或者 _text_ 或 _universal\_newlines_ 参数为 `True`，则这个流将是一个文本流，否则将是一个字节流。如果 _stdout_ 参数不为 `PIPE`，则此属性将为 `None`。

Popen.stderr[¶](#subprocess.Popen.stderr "Link to this definition")

如果 _stderr_ 参数为 [`PIPE`](#subprocess.PIPE "subprocess.PIPE")，此属性是一个类似 [`open()`](https://docs.python.org/zh-cn/3/builtins/functions.html#open "open") 所返回对象的可读流对象。 从流中读取将会提供来自子进程的错误输出。如果 _encoding_ 或 _errors_ 参数被指定或者 _text_ 或 _universal\_newlines_ 参数为 `True`，则这个流将是一个文本流，否则将是一个字节流。如果 _stderr_ 参数不为 `PIPE`，则此属性将为 `None`。

警告

使用 [`communicate()`](#subprocess.Popen.communicate "subprocess.Popen.communicate") 而非 [`.stdin.write`](#subprocess.Popen.stdin "subprocess.Popen.stdin")， [`.stdout.read`](#subprocess.Popen.stdout "subprocess.Popen.stdout") 或者 [`.stderr.read`](#subprocess.Popen.stderr "subprocess.Popen.stderr") 来避免由于任意其他 OS 管道缓冲区被子进程填满阻塞而导致的死锁。

Popen.pid[¶](#subprocess.Popen.pid "Link to this definition")

子进程的进程号。

注意如果你设置了 _shell_ 参数为 `True`，则这是生成的子 shell 的进程号。

Popen.returncode[¶](#subprocess.Popen.returncode "Link to this definition")

子进程的返回码。初始为 `None`，[`returncode`](#subprocess.Popen.returncode "subprocess.Popen.returncode") 是通过在检测到进程终结时调用 [`poll()`](#subprocess.Popen.poll "subprocess.Popen.poll"), [`wait()`](#subprocess.Popen.wait "subprocess.Popen.wait") 或 [`communicate()`](#subprocess.Popen.communicate "subprocess.Popen.communicate") 等方法来设置的。

`None` 值表示在最近一次方法调用时进程尚未终结

一个负值 `-N` 表示子进程被信号 `N` 中断 (仅 POSIX).

When `shell=True`, the return code reflects the exit status of the shell itself (e.g. `/bin/sh`), which may map signals to codes such as `128+N`. See the documentation of the shell (for example, the Bash manual's Exit Status) for details.

## Windows Popen 助手[¶](#windows-popen-helpers "Link to this heading")

[`STARTUPINFO`](#subprocess.STARTUPINFO "subprocess.STARTUPINFO") 类和以下常数仅在 Windows 有效。

_class_ subprocess.STARTUPINFO(_\*_, _dwFlags\=0_, _hStdInput\=None_, _hStdOutput\=None_, _hStdError\=None_, _wShowWindow\=0_, _lpAttributeList\=None_)[¶](#subprocess.STARTUPINFO "Link to this definition")

在 [`Popen`](#subprocess.Popen "subprocess.Popen") 创建时部分支持 Windows 的 [STARTUPINFO](https://msdn.microsoft.com/en-us/library/ms686331\(v=vs.85\).aspx) 结构。接下来的属性仅能通过关键词参数设置。

在 3.7 版本发生变更: 仅关键词参数支持被加入。

dwFlags[¶](#subprocess.STARTUPINFO.dwFlags "Link to this definition")

一个位字段，用于确定进程在创建窗口时是否使用某些 [`STARTUPINFO`](#subprocess.STARTUPINFO "subprocess.STARTUPINFO") 属性。

si \= subprocess.STARTUPINFO()
si.dwFlags \= subprocess.STARTF\_USESTDHANDLES | subprocess.STARTF\_USESHOWWINDOW

hStdInput[¶](#subprocess.STARTUPINFO.hStdInput "Link to this definition")

如果 [`dwFlags`](#subprocess.STARTUPINFO.dwFlags "subprocess.STARTUPINFO.dwFlags") 被指定为 [`STARTF_USESTDHANDLES`](#subprocess.STARTF_USESTDHANDLES "subprocess.STARTF_USESTDHANDLES")，则此属性是进程的标准输入句柄，如果 `STARTF_USESTDHANDLES` 未指定，则默认的标准输入是键盘缓冲区。

hStdOutput[¶](#subprocess.STARTUPINFO.hStdOutput "Link to this definition")

如果 [`dwFlags`](#subprocess.STARTUPINFO.dwFlags "subprocess.STARTUPINFO.dwFlags") 被指定为 [`STARTF_USESTDHANDLES`](#subprocess.STARTF_USESTDHANDLES "subprocess.STARTF_USESTDHANDLES")，则此属性是进程的标准输出句柄。除此之外，此属性将被忽略并且默认标准输出是控制台窗口缓冲区。

hStdError[¶](#subprocess.STARTUPINFO.hStdError "Link to this definition")

如果 [`dwFlags`](#subprocess.STARTUPINFO.dwFlags "subprocess.STARTUPINFO.dwFlags") 被指定为 [`STARTF_USESTDHANDLES`](#subprocess.STARTF_USESTDHANDLES "subprocess.STARTF_USESTDHANDLES")，则此属性是进程的标准错误句柄。除此之外，此属性将被忽略并且默认标准错误为控制台窗口的缓冲区。

wShowWindow[¶](#subprocess.STARTUPINFO.wShowWindow "Link to this definition")

如果 [`dwFlags`](#subprocess.STARTUPINFO.dwFlags "subprocess.STARTUPINFO.dwFlags") 指定了 [`STARTF_USESHOWWINDOW`](#subprocess.STARTF_USESHOWWINDOW "subprocess.STARTF_USESHOWWINDOW")，此属性可为能被指定为 函数 [ShowWindow](https://msdn.microsoft.com/en-us/library/ms633548\(v=vs.85\).aspx) 的 nCmdShow 的形参的任意值，除了 `SW_SHOWDEFAULT`。如此之外，此属性被忽略。

[`SW_HIDE`](#subprocess.SW_HIDE "subprocess.SW_HIDE") 被提供给此属性。它在 [`Popen`](#subprocess.Popen "subprocess.Popen") 由 `shell=True` 调用时使用。

lpAttributeList[¶](#subprocess.STARTUPINFO.lpAttributeList "Link to this definition")

`STARTUPINFOEX` 给出的用于进程创建的额外属性字典，参阅 [UpdateProcThreadAttribute](https://msdn.microsoft.com/en-us/library/windows/desktop/ms686880\(v=vs.85\).aspx).

支持的属性：

**handle\_list**

将被继承的句柄的序列。如果非空， _close\_fds_ 必须为 true。

当传递给 [`Popen`](#subprocess.Popen "subprocess.Popen") 构造函数时，这些句柄必须暂时地能被 [`os.set_handle_inheritable()`](https://docs.python.org/zh-cn/3/library/os.html#os.set_handle_inheritable "os.set_handle_inheritable") 继承，否则 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 将以 Windows error `ERROR_INVALID_PARAMETER` (87) 抛出。

警告

在多线程进程中，请谨慎使用，以便在将此功能与对继承所有句柄的其他进程创建函数——例如 [`os.system()`](https://docs.python.org/zh-cn/3/library/os.html#os.system "os.system") 的并发调用——相结合时，避免泄漏标记为可继承的句柄。这也应用于临时性创建可继承句柄的标准句柄重定向。

Added in version 3.7.

### Windows 常数[¶](#windows-constants "Link to this heading")

`subprocess` 模块对外暴露了下列常量。

subprocess.STD\_INPUT\_HANDLE[¶](#subprocess.STD_INPUT_HANDLE "Link to this definition")

标准输入设备，这是控制台输入缓冲区 `CONIN$`。

subprocess.STD\_OUTPUT\_HANDLE[¶](#subprocess.STD_OUTPUT_HANDLE "Link to this definition")

标准输出设备。最初，这是活动控制台屏幕缓冲区 `CONOUT$`。

subprocess.STD\_ERROR\_HANDLE[¶](#subprocess.STD_ERROR_HANDLE "Link to this definition")

标准错误设备。最初，这是活动控制台屏幕缓冲区 `CONOUT$`。

subprocess.SW\_HIDE[¶](#subprocess.SW_HIDE "Link to this definition")

隐藏窗口。另一个窗口将被激活。

subprocess.STARTF\_USESTDHANDLES[¶](#subprocess.STARTF_USESTDHANDLES "Link to this definition")

指明 [`STARTUPINFO.hStdInput`](#subprocess.STARTUPINFO.hStdInput "subprocess.STARTUPINFO.hStdInput"), [`STARTUPINFO.hStdOutput`](#subprocess.STARTUPINFO.hStdOutput "subprocess.STARTUPINFO.hStdOutput") 和 [`STARTUPINFO.hStdError`](#subprocess.STARTUPINFO.hStdError "subprocess.STARTUPINFO.hStdError") 属性包含额外的信息。

subprocess.STARTF\_USESHOWWINDOW[¶](#subprocess.STARTF_USESHOWWINDOW "Link to this definition")

指明 [`STARTUPINFO.wShowWindow`](#subprocess.STARTUPINFO.wShowWindow "subprocess.STARTUPINFO.wShowWindow") 属性包含额外的信息。

subprocess.STARTF\_FORCEONFEEDBACK[¶](#subprocess.STARTF_FORCEONFEEDBACK "Link to this definition")

[`STARTUPINFO.dwFlags`](#subprocess.STARTUPINFO.dwFlags "subprocess.STARTUPINFO.dwFlags") 形参指明在进程启动时将显示一个 _正在后台操作_ 鼠标提示。这是 GUI 进程的默认行为。

Added in version 3.13.

subprocess.STARTF\_FORCEOFFFEEDBACK[¶](#subprocess.STARTF_FORCEOFFFEEDBACK "Link to this definition")

[`STARTUPINFO.dwFlags`](#subprocess.STARTUPINFO.dwFlags "subprocess.STARTUPINFO.dwFlags") 形参指明在启动进程时鼠标提示将不会改变。

Added in version 3.13.

subprocess.CREATE\_NEW\_CONSOLE[¶](#subprocess.CREATE_NEW_CONSOLE "Link to this definition")

新的进程将有新的控制台，而不是继承父进程的（默认）控制台。

subprocess.CREATE\_NEW\_PROCESS\_GROUP[¶](#subprocess.CREATE_NEW_PROCESS_GROUP "Link to this definition")

用于指明将创建一个新的进程组的 [`Popen`](#subprocess.Popen "subprocess.Popen") `creationflags` 形参。这个旗标对于在子进程上使用 [`os.kill()`](https://docs.python.org/zh-cn/3/library/os.html#os.kill "os.kill") 来说是必须的。

如果指定了 [`CREATE_NEW_CONSOLE`](#subprocess.CREATE_NEW_CONSOLE "subprocess.CREATE_NEW_CONSOLE") 则这个旗标会被忽略。

subprocess.ABOVE\_NORMAL\_PRIORITY\_CLASS[¶](#subprocess.ABOVE_NORMAL_PRIORITY_CLASS "Link to this definition")

用于指明一个新进程将具有高于平均的优先级的 [`Popen`](#subprocess.Popen "subprocess.Popen") `creationflags` 形参。

Added in version 3.7.

subprocess.BELOW\_NORMAL\_PRIORITY\_CLASS[¶](#subprocess.BELOW_NORMAL_PRIORITY_CLASS "Link to this definition")

用于指明一个新进程将具有低于平均的优先级的 [`Popen`](#subprocess.Popen "subprocess.Popen") `creationflags` 形参。

Added in version 3.7.

subprocess.HIGH\_PRIORITY\_CLASS[¶](#subprocess.HIGH_PRIORITY_CLASS "Link to this definition")

用于指明一个新进程将具有高优先级的 [`Popen`](#subprocess.Popen "subprocess.Popen") `creationflags` 形参。

Added in version 3.7.

subprocess.IDLE\_PRIORITY\_CLASS[¶](#subprocess.IDLE_PRIORITY_CLASS "Link to this definition")

用于指明一个新进程将具有空闲（最低）优先级的 [`Popen`](#subprocess.Popen "subprocess.Popen") `creationflags` 形参。

Added in version 3.7.

subprocess.NORMAL\_PRIORITY\_CLASS[¶](#subprocess.NORMAL_PRIORITY_CLASS "Link to this definition")

用于指明一个新进程将具有正常（默认）优先级的 [`Popen`](#subprocess.Popen "subprocess.Popen") `creationflags` 形参。

Added in version 3.7.

subprocess.REALTIME\_PRIORITY\_CLASS[¶](#subprocess.REALTIME_PRIORITY_CLASS "Link to this definition")

用于指明一个新进程将具有实时优先级的 [`Popen`](#subprocess.Popen "subprocess.Popen") `creationflags` 形参。你应当几乎永远不使用 REALTIME\_PRIORITY\_CLASS，因为这会中断管理鼠标输入、键盘输入以及后台磁盘刷新的系统线程。 这个类只适用于直接与硬件“对话”，或者执行短暂任务具有受限中断的应用。

Added in version 3.7.

subprocess.CREATE\_NO\_WINDOW[¶](#subprocess.CREATE_NO_WINDOW "Link to this definition")

指明一个新进程将不会创建窗口的 [`Popen`](#subprocess.Popen "subprocess.Popen") `creationflags` 形参。

Added in version 3.7.

subprocess.DETACHED\_PROCESS[¶](#subprocess.DETACHED_PROCESS "Link to this definition")

指明一个新进程将不会继承其父控制台的 [`Popen`](#subprocess.Popen "subprocess.Popen") `creationflags` 形参。这个值不能与 CREATE\_NEW\_CONSOLE 一同使用。

Added in version 3.7.

subprocess.CREATE\_DEFAULT\_ERROR\_MODE[¶](#subprocess.CREATE_DEFAULT_ERROR_MODE "Link to this definition")

指明一个新进程不会继承调用方进程的错误模式的 [`Popen`](#subprocess.Popen "subprocess.Popen") `creationflags` 形参。新进程会转为采用默认的错误模式。 这个特性特别适用于运行时禁用硬错误的多线程 shell 应用。

Added in version 3.7.

subprocess.CREATE\_BREAKAWAY\_FROM\_JOB[¶](#subprocess.CREATE_BREAKAWAY_FROM_JOB "Link to this definition")

指明一个新进程不会关联到任务的 [`Popen`](#subprocess.Popen "subprocess.Popen") `creationflags` 形参。

Added in version 3.7.

## 较旧的高阶 API[¶](#older-high-level-api "Link to this heading")

在 Python 3.5 之前，这三个函数组成了 subprocess 的高阶 API。现在你可以在许多情况下使用 [`run()`](#subprocess.run "subprocess.run")，但有大量现在代码仍会调用这些函数。

subprocess.call(_args_, _\*_, _stdin\=None_, _stdout\=None_, _stderr\=None_, _shell\=False_, _cwd\=None_, _timeout\=None_, _\*\*other\_popen\_kwargs_)[¶](#subprocess.call "Link to this definition")

运行由 _args_ 所描述的命令。等待命令完成，然后返回 [`returncode`](#subprocess.Popen.returncode "subprocess.Popen.returncode") 属性。

需要捕获 stdout 或 stderr 的代码应当改用 [`run()`](#subprocess.run "subprocess.run"):

run(...).returncode

要屏蔽 stdout 或 stderr，可提供 [`DEVNULL`](#subprocess.DEVNULL "subprocess.DEVNULL") 这个值。

上面显示的参数只是常见的一些。完整的函数签名与 [`Popen`](#subprocess.Popen "subprocess.Popen") 构造器的相同 —— 此函数会将所提供的 _timeout_ 之外的全部参数直接传递给目标接口。

备注

请不要在此函数中使用 `stdout=PIPE` 或 `stderr=PIPE`。如果子进程向管道生成了足以填满 OS 管道缓冲区的输出而管道还未被读取时它将会阻塞。

在 3.3 版本发生变更: _timeout_ 被添加

在 3.12 版本发生变更: 针对 `shell=True` 改变的 Windows shell 搜索顺序。当前目录和 `%PATH%` 会被替换为 `%COMSPEC%` 和 `%SystemRoot%\\System32\\cmd.exe`。因此，在当前目录中投放一个命名为 `cmd.exe` 的恶意程序不会再起作用。

subprocess.check\_call(_args_, _\*_, _stdin\=None_, _stdout\=None_, _stderr\=None_, _shell\=False_, _cwd\=None_, _timeout\=None_, _\*\*other\_popen\_kwargs_)[¶](#subprocess.check_call "Link to this definition")

附带参数运行命令。等待命令完成。如果返回码为零则正常返回，否则引发 [`CalledProcessError`](#subprocess.CalledProcessError "subprocess.CalledProcessError")。 `CalledProcessError` 对象将在 [`returncode`](#subprocess.CalledProcessError.returncode "subprocess.CalledProcessError.returncode") 属性中保存返回码。如果 [`check_call()`](#subprocess.check_call "subprocess.check_call") 无法开始进程则它将传播已被引发的异常。

需要捕获 stdout 或 stderr 的代码应当改用 [`run()`](#subprocess.run "subprocess.run"):

run(..., check\=True)

要屏蔽 stdout 或 stderr，可提供 [`DEVNULL`](#subprocess.DEVNULL "subprocess.DEVNULL") 这个值。

上面显示的参数只是常见的一些。完整的函数签名与 [`Popen`](#subprocess.Popen "subprocess.Popen") 构造器的相同 —— 此函数会将所提供的 _timeout_ 之外的全部参数直接传递给目标接口。

备注

请不要在此函数中使用 `stdout=PIPE` 或 `stderr=PIPE`。如果子进程向管道生成了足以填满 OS 管道缓冲区的输出而管道还未被读取时它将会阻塞。

在 3.3 版本发生变更: _timeout_ 被添加

在 3.12 版本发生变更: 针对 `shell=True` 改变的 Windows shell 搜索顺序。当前目录和 `%PATH%` 会被替换为 `%COMSPEC%` 和 `%SystemRoot%\\System32\\cmd.exe`。因此，在当前目录中投放一个命名为 `cmd.exe` 的恶意程序不会再起作用。

subprocess.check\_output(_args_, _\*_, _stdin\=None_, _stderr\=None_, _shell\=False_, _cwd\=None_, _encoding\=None_, _errors\=None_, _universal\_newlines\=None_, _timeout\=None_, _text\=None_, _\*\*other\_popen\_kwargs_)[¶](#subprocess.check_output "Link to this definition")

附带参数运行命令并返回其输出。

如果返回码非零则会引发 [`CalledProcessError`](#subprocess.CalledProcessError "subprocess.CalledProcessError")。 `CalledProcessError` 对象将在 [`returncode`](#subprocess.CalledProcessError.returncode "subprocess.CalledProcessError.returncode") 属性中保存返回码并在 [`output`](#subprocess.CalledProcessError.output "subprocess.CalledProcessError.output") 属性中保存所有输出。

这相当于：

run(..., check\=True, stdout\=PIPE).stdout

上面显示的参数只是常见的一些。完整的函数签名与 [`run()`](#subprocess.run "subprocess.run") 的大致相同 —— 大部分参数会通过该接口直接传递。存在一个与 `run()` 行为不同的 API 差异：传递 `input=None` 的行为将与 `input=b''` (或 `input=''`，具体取决于其他参数) 一样而不是使用父对象的标准输入文件处理。

默认情况下，此函数将把数据返回为已编码的字节串。输出数据的实际编码格式将取决于唤起的命令，因此解码为文本的操作往往需要在应用程序层级上进行处理。

此行为可以通过设置 _text_, _encoding_, _errors_ 或将 _universal\_newlines_ 设为 `True` 来重载，具体描述见 [常用参数](#frequently-used-arguments) 和 [`run()`](#subprocess.run "subprocess.run")。

要在结果中同时捕获标准错误，请使用 `stderr=subprocess.STDOUT`:

\>>> subprocess.check\_output(
...     "ls non\_existent\_file; exit 0",
...     stderr\=subprocess.STDOUT,
...     shell\=True)
'ls: non\_existent\_file: No such file or directory\\n'

Added in version 3.1.

在 3.3 版本发生变更: _timeout_ 被添加

在 3.4 版本发生变更: 增加了对 _input_ 关键字参数的支持。

在 3.6 版本发生变更: 增加了 _encoding_ 和 _errors_。详情参见 [`run()`](#subprocess.run "subprocess.run")。

Added in version 3.7: _text_ 作为 _universal\_newlines_ 的一个更具可读性的别名被添加。

在 3.12 版本发生变更: 针对 `shell=True` 改变的 Windows shell 搜索顺序。当前目录和 `%PATH%` 会被替换为 `%COMSPEC%` 和 `%SystemRoot%\\System32\\cmd.exe`。因此，在当前目录中投放一个命名为 `cmd.exe` 的恶意程序不会再起作用。

## 使用 `subprocess` 模块替代旧有函数[¶](#replacing-older-functions-with-the-subprocess-module "Link to this heading")

在这一节中，"a 改为 b" 意味着 b 可以被用作 a 的替代。

备注

在这一节中的所有 "a" 函数会在找不到被执行的程序时（差不多）静默地失败；"b" 替代函数则会改为引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError")。

此外，在使用 [`check_output()`](#subprocess.check_output "subprocess.check_output") 时如果替代函数所请求的操作产生了非零返回值则将失败并引发 [`CalledProcessError`](#subprocess.CalledProcessError "subprocess.CalledProcessError")。操作的输出仍能以所引发异常的 [`output`](#subprocess.CalledProcessError.output "subprocess.CalledProcessError.output") 属性的方式被访问。

In the following examples, we assume that the relevant functions have already been imported from the `subprocess` module.

### 替代 **/bin/sh** shell 命令替换[¶](#replacing-bin-sh-shell-command-substitution "Link to this heading")

output\=$(mycmd myarg)

改为:

output \= check\_output(\["mycmd", "myarg"\])

### 替代 shell 管道[¶](#replacing-shell-pipeline "Link to this heading")

output\=$(dmesg | grep hda)

改为:

p1 \= Popen(\["dmesg"\], stdout\=PIPE)
p2 \= Popen(\["grep", "hda"\], stdin\=p1.stdout, stdout\=PIPE)
p1.stdout.close()  \# 允许 p1 在 p2 退出时接收 SIGPIPE。
output \= p2.communicate()\[0\]

启动 p2 之后再执行 `p1.stdout.close()` 调用很重要，这是为了让 p1 能在 p2 先于 p1 退出时接收到 SIGPIPE。

另外，对于受信任的输入，shell 本身的管道支持仍然可被直接使用：

output\=$(dmesg | grep hda)

改为:

output \= check\_output("dmesg | grep hda", shell\=True)

### 替代 [`os.system()`](https://docs.python.org/zh-cn/3/library/os.html#os.system "os.system")[¶](#replacing-os-system "Link to this heading")

sts \= os.system("mycmd" + " myarg")
\# 变为
retcode \= call("mycmd" + " myarg", shell\=True)

注释：

-   通过 shell 来调用程序通常是不必要的。
    
-   [`call()`](#subprocess.call "subprocess.call") 返回值的编码方式与 [`os.system()`](https://docs.python.org/zh-cn/3/library/os.html#os.system "os.system") 的不同。
    
-   The [`os.system()`](https://docs.python.org/zh-cn/3/library/os.html#os.system "os.system") function ignores SIGINT and SIGQUIT signals while the command is running, but the caller must do this separately when using the `subprocess` module.
    

一个更现实的例子如下所示:

try:
    retcode \= call("mycmd" + " myarg", shell\=True)
    if retcode < 0:
        print("Child was terminated by signal", \-retcode, file\=sys.stderr)
    else:
        print("Child returned", retcode, file\=sys.stderr)
except OSError as e:
    print("Execution failed:", e, file\=sys.stderr)

### 替代 [`os.spawn`](https://docs.python.org/zh-cn/3/library/os.html#os.spawnl "os.spawnl") 函数族[¶](#replacing-the-os-spawn-family "Link to this heading")

P\_NOWAIT 示例:

pid \= os.spawnlp(os.P\_NOWAIT, "/bin/mycmd", "mycmd", "myarg")
\==>
pid \= Popen(\["/bin/mycmd", "myarg"\]).pid

P\_WAIT 示例:

retcode \= os.spawnlp(os.P\_WAIT, "/bin/mycmd", "mycmd", "myarg")
\==>
retcode \= call(\["/bin/mycmd", "myarg"\])

Vector 示例:

os.spawnvp(os.P\_NOWAIT, path, args)
\==>
Popen(\[path\] + args\[1:\])

Environment 示例:

os.spawnlpe(os.P\_NOWAIT, "/bin/mycmd", "mycmd", "myarg", env)
\==>
Popen(\["/bin/mycmd", "myarg"\], env\={"PATH": "/usr/bin"})

### 替代 [`os.popen()`](https://docs.python.org/zh-cn/3/library/os.html#os.popen "os.popen")[¶](#replacing-os-popen "Link to this heading")

返回码以如下方式处理转写:

pipe \= os.popen(cmd, 'w')
...
rc \= pipe.close()
if rc is not None and rc \>> 8:
    print("There were some errors")
\==>
process \= Popen(cmd, stdin\=PIPE)
...
process.stdin.close()
if process.wait() != 0:
    print("There were some errors")

## 旧式的 Shell 发起函数[¶](#legacy-shell-invocation-functions "Link to this heading")

此模块还提供了以下来自 2.x `commands` 模块的旧版函数。这些操作会隐式地唤起系统 shell 并且上文所描述的有关安全与异常处理一致性保证都不适用于这些函数。

subprocess.getstatusoutput(_cmd_, _\*_, _encoding\=None_, _errors\=None_)[¶](#subprocess.getstatusoutput "Link to this definition")

返回在 shell 中执行 _cmd_ 产生的 `(exitcode, output)`。

在 shell 中 附带 [`check_output()`](#subprocess.check_output "subprocess.check_output") 来执行字符串 _cmd_ 并返回一个 2 元组 `(exitcode, output)`。 _encoding_ 和 _errors_ 将被用于对输出进行解码；请参阅 [常用参数](#frequently-used-arguments) 中的说明来了解详情。

末尾的一个换行符会从输出中被去除。命令的退出码可被解读为子进程的返回码。例如:

\>>> subprocess.getstatusoutput('ls /bin/ls')
(0, '/bin/ls')
\>>> subprocess.getstatusoutput('cat /bin/junk')
(1, 'cat: /bin/junk: No such file or directory')
\>>> subprocess.getstatusoutput('/bin/junk')
(127, 'sh: /bin/junk: not found')
\>>> subprocess.getstatusoutput('/bin/kill $$')
(-15, '')

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): Unix, Windows.

在 3.3.4 版本发生变更: 添加了 Windows 支持。

此函数现在返回 (exitcode, output) 而不是像 Python 3.3.3 及更早的版本那样返回 (status, output)。 exitcode 的值与 [`returncode`](#subprocess.Popen.returncode "subprocess.Popen.returncode") 相同。

在 3.11 版本发生变更: 增加了 _encoding_ 和 _errors_ 形参。

subprocess.getoutput(_cmd_, _\*_, _encoding\=None_, _errors\=None_)[¶](#subprocess.getoutput "Link to this definition")

返回在 shell 中执行 _cmd_ 产生的输出（stdout 和 stderr）。

类似于 [`getstatusoutput()`](#subprocess.getstatusoutput "subprocess.getstatusoutput")，但退出码会被忽略并且返回值为包含命令输出的字符串。例如:

\>>> subprocess.getoutput('ls /bin/ls')
'/bin/ls'

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): Unix, Windows.

在 3.3.4 版本发生变更: 添加了 Windows 支持

在 3.11 版本发生变更: 增加了 _encoding_ 和 _errors_ 形参。

## 备注[¶](#notes "Link to this heading")

### 超时行为[¶](#timeout-behavior "Link to this heading")

当在 [`run()`](#subprocess.run "subprocess.run")、[`Popen.wait()`](#subprocess.Popen.wait "subprocess.Popen.wait") 或 [`Popen.communicate()`](#subprocess.Popen.communicate "subprocess.Popen.communicate") 等函数中使用 `timeout` 形参时，用户应该注意以下行为：

1.  **进程创建延迟**：在许多平台 API 上，初始进程创建本身不能被中断。这意味着，即使指定了超时，也不能保证在创建进程之前看到超时异常，无论创建进程花了多长时间。
    
2.  **非常小的超时值**: 设置非常小的超时值（比如几毫秒）可能会导致几乎立即出现 [`TimeoutExpired`](#subprocess.TimeoutExpired "subprocess.TimeoutExpired") 异常，因为进程创建和系统调度本身就需要时间。
    

### 在 Windows 上将参数列表转换为一个字符串[¶](#converting-an-argument-sequence-to-a-string-on-windows "Link to this heading")

在 Windows 上，_args_ 序列会被转换为可使用以下规则来解析的字符串（对应于 MS C 运行时所使用的规则）:

1.  参数以空白符分隔，即空格符或制表符。
    
2.  用双引号标示的字符串会被解读为单个参数，而不再考虑其中的空白符。一个参数可以嵌套用引号标示的字符串。
    
3.  带有一个反斜杠前缀的双引号会被解读为双引号字面值。
    
4.  反斜杠会按字面值解读，除非它是作为双引号的前缀。
    
5.  如果反斜杠被作为双引号的前缀，则每个反斜杠对会被解读为一个反斜杠字面值。如果反斜杠数量为奇数，则最后一个反斜杠会如规则 3 所描述的那样转义下一个双引号。
    

参见

[`shlex`](https://docs.python.org/zh-cn/3/library/shlex.html#module-shlex "shlex: Simple lexical analysis for Unix shell-like languages.")

此模块提供了用于解析和转义命令行的函数。

### 禁用 `posix_spawn()`[¶](#disable-use-of-posix-spawn "Link to this heading")

在 Linux 上，`subprocess` 默认只要能保证安全就在内部使用 `vfork()` 系统调用而不是 `fork()`。 这可以大幅提升性能。

subprocess.\_USE\_POSIX\_SPAWN \= False  \# 参见 CPython 程序问题 gh-NNNNNN。

在任何 Python 版本上将其设置为 false 都是安全的。它对不受支持的旧版本或新版本没有影响。不要假设该属性可以读取。除了名称之外，true 值并不表示将使用相应的函数，只是表示可能会使用。

当你不得不使用这些私有属性并遇到问题时请随时提交问题并附带你所看到的问题的重现方式。请从你代码中的某条注释链接到该问题。

Added in version 3.8: `_USE_POSIX_SPAWN`
