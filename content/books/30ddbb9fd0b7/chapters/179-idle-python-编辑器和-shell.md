**源代码：** [Lib/idlelib/](https://github.com/python/cpython/tree/3.14/Lib/idlelib/)

* * *

IDLE 是 Python 所内置的开发与学习环境。

IDLE 具有以下特性：

-   跨平台：在 Windows、Unix 和 macOS 上工作近似。
    
-   提供输入输出高亮和错误信息的 Python 命令行窗口 （交互解释器）
    
-   提供多次撤销操作、Python 语法高亮、智能缩进、函数调用提示、自动补全等功能的多窗口文本编辑器
    
-   在多个窗口中检索，在编辑器中替换文本，以及在多个文件中检索（通过 grep）
    
-   提供持久保存的断点调试、单步调试、查看本地和全局命名空间功能的调试器
    
-   配置、浏览以及其它对话框
    

IDLE 应用程序是在 [`idlelib`](#module-idlelib "idlelib: Implementation package for the IDLE shell/editor.") 包中实现的。

这是一个 [optional module](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module)。 如果它在你的 CPython 副本中缺失，请查看你的发行方（也就是说，向你提供 Python 的人）的文档。 如果你就是发行方，请参阅 [针对可选模块的要求](https://docs.python.org/zh-cn/3/using/configure.html#optional-module-requirements)。

## 编辑和导航[¶](#editing-and-navigation "Link to this heading")

### 编辑窗口[¶](#editor-windows "Link to this heading")

IDLE 可以在启动时打开编辑器窗口，这取决于选项设置和你启动 IDLE 的方式。 在此之后，请使用 File 菜单。 对于给定的文件只能打开一个编辑器窗口。

标题栏包含文件名称、完整路径，以及运行该窗口的 Python 和 IDLE 版本。 状态栏包含行号 ('Ln') 和列号 ('Col')。 行号从 1 开始；列号则从 0 开始。

IDLE 会假定扩展名为 .py\* 的文件包含 Python 代码而其他文件不包含。 可使用 Run 菜单来运行 Python 代码。

### 按键绑定[¶](#key-bindings "Link to this heading")

IDLE 插入光标是字符位置之间的一个细竖条。 当输入字符时，插入光标及其右侧的所有内容将右移一个字符并使新字符输入到新空位中。

某些非字符类按键会移动光标并可能会删除字符。 删除操作不会将文本放入剪贴板，但 IDLE 有一个撤销列表。 当本文档讨论到按键时，'C' 是指 Windows 和 Unix 上的 Control 键和 macOS 上的 Command 键。 （并且这样的讨论并假定这些按键没有被重新绑定到其他目标。）

-   方向键会使光标移动一个字符或一行。
    
-   C\-LeftArrow 和 C\-RightArrow 会左移或右移一个单词。
    
-   Home 和 End 会移至行的开头或末尾。
    
-   Page Up 和 Page Down 会上移或下移一屏。
    
-   C\-Home 和 C\-End 会移至文档的开头或末尾。
    
-   Backspace 和 Del (或 C\-d) 会删除上一个或下一个字符。
    
-   C\-Backspace 和 C\-Del 会向左或向右删除一个单词。
    
-   C\-k 会删除 ('杀掉') 右侧的所有内容。
    

标准的键绑定（例如 C\-c 复制和 C\-v 粘贴）仍会有效。 键绑定可在配置 IDLE 对话框中选择。

### 自动缩进[¶](#automatic-indentation "Link to this heading")

在一个代码块开头的语句之后，下一行会缩进 4 个空格符（在 Python Shell 窗口中是一个制表符）。 在特定关键字之后（break, return 等），下一行将不再缩进。 在开头的缩进中，按 Backspace 将会删除 4 个空格符。 Tab 则会插入空格符（在 Python Shell 窗口中是一个制表符），具体数量取决于缩进宽度。 目前，Tab 键按照 Tcl/Tk 的规定设置为四个空格符。

另请参阅 [Format 菜单](#format-menu) 的缩进/取消缩进区的命令。

### 搜索和替换[¶](#search-and-replace "Link to this heading")

任何选择都将成为搜索目标。 但是，只有在同一行内的选择才有效因为搜索只针对行进行并会移除换行符。 如果勾选了 `[x] Regular expression`，目标将按照 Python re 模块的规则来解读。

### 补全[¶](#completions "Link to this heading")

当被请求并且可用时，将为模块名、类属性、函数或文件名提供补全。 每次请求方法将显示包含现有名称的补全提示框。 （例外情况参见下文的 Tab 补全。） 对于任意提示框，要改变被补全的名称和提示框中被高亮的条目，可以通过输入和删除字符、按 Up, Down, PageUp, PageDown, Home 和 End 键；或是在提示框中单击。 要关闭补全提示框可以通过 Escape, Enter 或按两次 Tab 键或是在提示框外单击。 在提示框内双击则将执行选择并关闭。

有一种打开提示框的方式是输入一个关键字符并等待预设的一段间隔。 此间隔默认为 2 秒；这可以在设置对话框中定制。 （要防止自动弹出，可将时延设为一个很大的毫秒数值，例如 100000000。） 对于导入的模块名或者类和函数属性，请输入 '.'。 对于根目录下的文件名，请在开头引号之后立即输入 [`os.sep`](https://docs.python.org/zh-cn/3/library/os.html#os.sep "os.sep") 或 [`os.altsep`](https://docs.python.org/zh-cn/3/library/os.html#os.altsep "os.altsep")。 （在 Windows 下，可以先指定一个驱动器。） 可通过输入目录名和分隔符来进入子目录。

除了等待，或是在提示框关闭之后，可以使用 Edit 菜单的 Show Completions 来立即打开一个补全提示框。 默认的热键是 C\-space。 如果在打开提示框之前输入一某个名称的前缀，则将显示第一个匹配项或最接近的项。 结果将与在提示框已显示之后输入前缀时相同。 在一个引号之后执行 Show Completions 将会补全当前目录下的文件名而不是根目录下的。

在输入前缀后按 Tab 键的效果通常与 Show Completions 相同。 （如果未输入前缀则为缩进。） 但是，如果输入的前缀只有一个匹配项，则该匹配项会立即被添加到编辑器文本中而不打开补全提示框。

在字符串以外且开头不带 '.' 地输入前缀并执行 'Show Completions' 或按 Tab 键将打开一个包含关键字、内置名称和现有模块级名称的补全提示框。

当在编辑器（而非 Shell）中编辑代码时，可以通过运行你的代码并在此后不重启 Shell 来增加可用的模块级名称。 这在文件顶部添加了导入语句之后会特别有用。 这还会增加可用的属性补全。

补全提示框在初始时会排除以 '\_' 打头的名称，对于模块还会排除未包括在 '\_\_all\_\_' 中的名称。 这些隐藏名称可通过在 '.' 之后输入 '\_' 来访问，这在提示框打开之前或之后都是有效的。

### 提示[¶](#calltips "Link to this heading")

当在一个 _可用的_ 函数名称之后输入 ( 时将自动显示一个调用提示。 函数名称表达式可以包括点号和方括号索引操作。 调用提示将保持打开直到它被点击、光标移出参数区、或是输入了 )。 当光标位于某个定义的参数区时，可以在菜单中选择 Edit 的 "Show Call Tip" 或是输入其快捷键来显示调用提示。

调用提示是由函数的签名和文档字符串到第一个空行或第五个非空行为止的内容组成的。 （某些内置函数没有可访问的签名。） 签名中的 '/' 或 '\*' 指明其前面或后面的参数仅限以位置或名称（关键字）方式传入。 具体细节可能会改变。

在 Shell 中，可访问的函数取决于有哪些模块已被导入用户进程，包括由 IDLE 本身导入的模块，以及哪些定义已被运行，以上均从最近的重启动开始算起。

例如，重启动 Shell 并输入 `itertools.count(`。 将显示调用提示，因为 IDLE 出于自身需要已将 itertools 导入了用户进程。 （此行为可能会改变。） 输入 `turtle.write(` 则不显示任何提示。 因为 IDLE 本身不会导入 turtle。 菜单项和快捷键同样不会有任何反应。 输入 `import turtle`。 则在此之后，`turtle.write(` 将显示调用提示。

在编辑器中，import 语句在文件运行之前是没有效果的。 在输入 import 语句之后、添加函数定义之后，或是打开一个现有文件之后可以先运行一下文件。

### 格式化文本块[¶](#format-block "Link to this heading")

重新格式化段落将会重新排列一个连续的同级缩进的非空白注释，一个多行字符串中类似的文本块，或两者之中被选定的子集（‘段落’）。 如有必要，将添加一个空行以分隔字符串和代码。 选定的部分行将被扩展为完整的行。 结果行将有与之前相同的缩进但也将有 N 列（字符）的最大总长度。 修改在 IDLE 设置的 Window 选项卡中默认的 N 值 72。

### 代码上下文[¶](#code-context "Link to this heading")

在一个包含 Python 代码的编辑器窗口内部，可以切换代码上下文以便显示或隐藏窗口顶部的面板。 当显示时，此面板可以冻结代码块的开头行，例如以 `class`, `def` 或 `if` 关键字开头的行，这样的行在不显示时面板时可能离开视野。 此面板的大小将根据需要扩展和收缩以显示当前层级的全部上下文，直至达到配置 IDLE 对话框中所定义的最大行数（默认为 15）。 如果没有当前上下文行而此功能被启用，则将显示一个空行。 点击上下文面板中的某一行将把该行移至编辑器顶部。

上下文面板的文本和背景颜色可在配置 IDLE 对话框的 Highlights 选项卡中进行配置。

### Shell 窗口[¶](#shell-window "Link to this heading")

在 IDLE 的 Shell 中，输入、编辑和重新执行完整的语句。 （多数控制台和终端每次只能操作一个物理行）。

在光标位于行内任意位置的情况下按 Return 键来将单行语句提交执行。 如果带有强制换行的反斜杠 (\\)，则光标必须位于最后一个物理行。 对于包含多行的复合语句要通过在语句之后额外输入一个空行来提交执行。

当将代码粘贴到 Shell 中时，它并不会被编译并执行除非如上所述地再按下 Return 键。 可以先对粘贴的代码进行编辑。 如果将多条语句粘贴到 Shell 中，则多条语句被当作一条语句来编译并引发 [`SyntaxError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#SyntaxError "SyntaxError")。

包含 `RESTART` 的行表明用户执行进程已被重启。 这种情况会在用户执行进程崩溃、在 Shell 菜单中选择重启，或在编辑器窗口中运行代码时发生。

之前小节中介绍的编辑功能在交互式地输入代码时也适用。 IDLE 的 Shell 窗口还会响应以下按键：

-   C\-c 会尝试中断语句执行（但可能会失败）。
    
-   C\-d 如果是在 `>>>` 提示符后按下会关闭窗口。
    
-   Alt\-p 和 Alt\-n (在 macOS 上为 C\-p 和 C\-n) 将在当前提示符下恢复与已输入内容匹配的上一条或下一条之前输入的语句。
    
-   当光标位于任何之前的语句上时按下 Return 将把该语句添加到在提示符下已输入的内容之后。
    

### 文本颜色[¶](#text-colors "Link to this heading")

IDLE 文本默认为白底黑字，但有特殊含义的文本将以彩色显示。 对于 Shell 来说包括 Shell 输出，Shell 错误，用户输出和用户错误。 对于 Shell 提示符下或编辑器中的 Python 代码来说则包括关键字，内置类和函数名称，`class` 和 `def` 之后的名称，字符串和注释等。 对于任意文本窗口来说则包括光标（如果存在）、找到的文本（如果可能）和选定的文本。

IDLE 还会高亮显示模式匹配语句中的 [软关键字](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#soft-keywords) [`match`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#match), `case` 和 [`_`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#wildcard-patterns)。 但是，这种高亮显示并不完美，在某些极端情况下还会出现错误，包括 `_` 在 `case` 模式中出现的时候。

文本着色是在后台完成的，因此有时会看到未着色的文本。 要改变颜色方案，请使用配置 IDLE 对话框的高亮选项卡。 编辑器中的调试器断点行标记和弹出面板和对话框中的文本则是用户不可配置的。

## 启动和代码执行[¶](#startup-and-code-execution "Link to this heading")

在附带 `-s` 选项启动的情况下，IDLE 将会执行环境变量 `IDLESTARTUP` 或 [`PYTHONSTARTUP`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONSTARTUP) 所引用的文件。 IDLE 会先检查 `IDLESTARTUP`；如果 `IDLESTARTUP` 存在则会运行被引用的文件。 如果 `IDLESTARTUP` 不存在，则 IDLE 会检查 `PYTHONSTARTUP`。 这些环境变量所引用的文件是存放经常被 IDLE Shell 所使用的函数，或者执行导入常用模块的 import 语句的便捷场所。

此外，`Tk` 也会在存在启动文件时加载它。 请注意 Tk 文件会被无条件地加载。 此附加文件名为 `.Idle.py` 并且会在用户的家目录下查找。 此文件中的语句将在 Tk 的命名空间中执行，所以此文件不适用于导入要在 IDLE 的 Python Shell 中使用的函数。

### 命令行用法[¶](#command-line-usage "Link to this heading")

IDLE 可从命令行附带多种选项来唤起。 基本语法为：

python \-m idlelib \[options\] \[file ...\]

有以下几种选项：

\-c <command>[¶](#cmdoption-idle-c "Link to this definition")

在 shell 窗口中运行指定的 Python 命令。 例如，传入 `-c "print('Hello, World!')"`。 在 Windows 上，外面的引号如上面所显示的那样必须为双引号。

\-d[¶](#cmdoption-idle-d "Link to this definition")

启用调试器并打开 shell 窗口。

\-e[¶](#cmdoption-idle-e "Link to this definition")

打开一个 editor 窗口。

\-h[¶](#cmdoption-idle-h "Link to this definition")

打印一条带有一组合法选项的帮助消息框并退出。

\-i[¶](#cmdoption-idle-i "Link to this definition")

打开一个 shell 窗口。

\-r <file>[¶](#cmdoption-idle-r "Link to this definition")

在 shell 窗口中运行指定的文件。

\-s[¶](#cmdoption-idle-s "Link to this definition")

在打开 shell 窗口之前运行启动文件（由环境变量 `IDLESTARTUP` 或 [`PYTHONSTARTUP`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONSTARTUP) 定义）。

\-t <title>[¶](#cmdoption-idle-t "Link to this definition")

设置 shell 窗口的标题。

\-[¶](#cmdoption-idle-0 "Link to this definition")

读取并执行 shell 窗口中的标准输入。 此选项必须是位于其他参数之前的最后一项。

如果提供了参数：

-   如果使用了 `-`, `-c` 或 `-r`，则所有参数将放在 `sys.argv[1:]` 中，而 `sys.argv[0]` 将分别被设为 `''`, `'-c'` 或 `'-r'`。 不会打开任何 editor 窗口，即使这是在 _Options_ 对话框中的默认设置。
    
-   在其他情况下，参数将作为要被打开编辑的文件来处理，而 `sys.argv` 反映的则是传给 IDLE 本身的参数。
    

### 启动失败[¶](#startup-failure "Link to this heading")

IDLE 使用一个套接字在 IDLE GUI 进程和用户代码执行进程之间通信。 当 Shell 启动或重启动时必须建立一个连接。 （重启动会以一个内容为 'RESTART' 的分隔行来标示）。 如果用户进程无法连接到 GUI 进程，它通常会显示一个包含 'cannot connect' 消息的 `Tk` 错误提示框来引导用户。 随后将会退出程序。

有一个 Unix 系统专属的连接失败是由系统网络设置中错误配置的掩码规则导致的。 当从一个终端启动 IDLE 时，用户将看到一条以 `** Invalid host:` 开头的消息。 有效的值为 `127.0.0.1 (idlelib.rpc.LOCALHOST)`。 用户可以在一个终端窗口输入 `tcpconnect -irv 127.0.0.1 6543` 并在另一个终端窗口中输入 `tcplisten <same args>` 来进行诊断。

导致连接失败的一个常见原因是用户创建的文件与标准库模块同名，例如 _random.py_ 和 _tkinter.py_。 当这样的文件与要运行的文件位于同一目录中时，IDLE 将无法导入标准库模块。 可用的解决办法是重命名用户文件。

虽然现在已不太常见，但杀毒软件或防火墙程序也有可能会阻止连接。 如果无法将此类程序设为允许连接，那么为了运行 IDLE 就必须将其关闭。 允许这样的内部连接是安全的，因为数据在外部端口上不可见。 一个类似的问题是错误的网络配置阻止了连接。

Python 的安装问题有时会使 IDLE 退出：存在多个版本时可能导致程序崩溃，或者单独安装时可能需要管理员权限。 如果想要避免程序崩溃，或是不想以管理员身份运行，最简单的做法是完全卸载 Python 并重新安装。

有时会出现 pythonw.exe 僵尸进程问题。 在 Windows 上，可以使用任务管理器来检查并停止该进程。 有时由程序崩溃或键盘中断（control-C）所发起的重启动可能会出现连接失败。 关闭错误提示框或使用 Shell 菜单中的 Restart Shell 可能会修复此类临时性错误。

当 IDLE 首次启动时，它会尝试读取 `~/.idlerc/` 中的用户配置文件（~ 是用户的家目录）。 如果配置有问题，则应当显示一条错误消息。 除随机磁盘错误之外，此类错误均可通过不手动编辑这些文件来避免。 请使用 Options 菜单来打开配置对话框。 一旦用户配置文件出现错误，最好的解决办法就是删除它并使用配置对话框重新设置。

如果 IDLE 退出时没有发出任何错误消息，并且它不是通过控制台启动的，请尝试通过控制台或终端 (`python -m idlelib`) 来启动它以查看是否会出现错误消息。

在基于 Unix 的系统上使用 tcl/tk 低于 `8.6.11` 的版本 (查看 `About IDLE`) 时特定字体的特定字符可能导致终端提示 tk 错误消息。 这可能发生在启动 IDLE 编辑包此种字符的文件或是在之后输入此种字符的时候。 如果无法升级 tcl/tk，可以重新配置 IDLE 来使用其他的字体。

### 运行用户代码[¶](#running-user-code "Link to this heading")

除了少量例外，使用 IDLE 执行 Python 代码的结果应当与使用默认方法，即在文本模式的系统控制台或终端窗口中直接通过 Python 解释器执行同样的代码相同。 但是，不同的界面和操作有时会影响显示的结果。 例如，`sys.modules` 初始时具有更多条目，而 `threading.active_count()` 将返回 2 而不是 1。

在默认情况下，IDLE 会在单独的 OS 进程中运行用户代码而不是在运行 Shell 和编辑器的用户界面进程中运行。 在执行进程中，它会将 `sys.stdin`, `sys.stdout` 和 `sys.stderr` 替换为从 Shell 窗口获取输入并向其发送输出的对象。 保存在 `sys.__stdin__`, `sys.__stdout__` 和 `sys.__stderr__` 中的原始值不会被改变，但可能会为 `None`。

将打印输出从一个进程发送到另一个进程中的文本部件要比打印到同一个进程中的系统终端慢。 这在打印多个参数时将有更明显的影响，因为每个参数、每个分隔符和换行符对应的字符串都要单独发送。 在开发中，这通常不算是问题，但如果希望能在 IDLE 中更快地打印，可以将想要显示的所有内容先格式化并拼接到一起然后打印单个字符串。 格式字符串和 [`str.join()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str.join "str.join") 都可以被用于合并字段和文本行。

IDLE 的标准流替换不会被执行进程中创建的子进程所继承，不论它是由用户代码直接创建还是由 multiprocessing 之类的模块创建的。 如果这样的子进程使用了 `input` 从 sys.stdin 输入或者使用了 `print` 或 `write` 向 sys.stdout 或 sys.stderr 输出，则应当在命令行窗口中启动 IDLE。 （在 Windows 中，要使用 `python` 或 `py` 而不是 `pythonw` 或 `pyw`。） 这样二级子进程将会被附加到该窗口进行输入和输出。

如果 `sys` 被用户代码重置，例如使用了 `importlib.reload(sys)`，则 IDLE 的修改将丢失，来自键盘的输入和向屏幕的输出将无法正确运作。

当 Shell 获得焦点时，它将控制键盘与屏幕。 这通常会保持透明，但一些直接访问键盘和屏幕的函数将会不起作用。 这也包括那些确定是否有键被按下以及是哪个键被按下的系统专属函数。

在执行进程中运行的 IDLE 代码会向调用栈添加在其他情况下不存在的帧。 IDLE 包装了 `sys.getrecursionlimit` 和 `sys.setrecursionlimit` 以减少额外栈帧的影响。

当用户代码直接或者通过调用 sys.exit 引发 SystemExit 时，IDLE 将返回 Shell 提示符而非完全退出。

### Shell中的用户输出[¶](#user-output-in-shell "Link to this heading")

当一个程序输出文本时，结果将由相应的输出设备来确定。 当 IDLE 执行用户代码时，`sys.stdout` 和 `sys.stderr` 会被连接到 IDLE Shell 的显示区。 它的某些特性是从底层的 Tk Text 部件继承而来。 其他特性则是程序所添加的。 总之，Shell 被设计用于开发环境而非生产环境运行。

例如，Shell 绝不会丢弃输出。 一个向 Shell 发送无限输出的程序将最终占满内存，导致内存错误。 作为对比，某些系统文本模式窗口只会保留输出的最后 n 行。 例如，Windows 控制台可由用户设置保留 1 至 9999 行，默认为 300 行。

IDLE 的 Shell 所使用的 Tk Text 部件可显示的字符 (码位) 为 Unicode 的 BMP (基本多语言平面) 子集。 具体哪些字符会显示为正确的字形而哪些会以方框代替取决于操作系统和所安装的字体。 制表符会使之后的文本从下一个制表位开始。 (每 8 个 '字符' 对应一个制表位)。 换行符会使之后的文本开始新的一行。 其他控制符会被忽略或是显示为空格、方框或其他形式，具体取决于操作系统和字体。 (使用方向键在这样的输出中移动文本光标有可能让显示间距发生怪异的变化。)

\>>> s \= 'a\\tb\\a<\\x02\><\\r\>\\bc\\nd'  \# 输入 22 个字符。
\>>> len(s)
14
\>>> s  \# 显示 repr(s)
'a\\tb\\x07<\\x02><\\r>\\x08c\\nd'
\>>> print(s, end\='')  \# 原样显示 s。
\# 结果会因 OS 和字体而不同。 请试一下。

`repr` 函数会被用于表达式值的交互式回显。 它将返回输入字符串的一个修改版本，其中的控制代码、部分 BMP 码位以及所有非 BMP 码位都将被替换为转义代码。 如上面所演示的，它使用户可以辨识字符串中的字符，无论它们会如何显示。

普通的与错误的输出通常会在与代码输入和彼此之间保持区分 (显示于不同的行)。 它们也会分别使用不同的高亮颜色。

对于 SyntaxError 回溯信息，表示检测到错误位置的正常 '^' 标记被替换为带有代表错误的文本颜色高亮。 当从文件运行的代码导致了其他异常时，用户可以右击回溯信息行在 IDLE 编辑器中跳转到相应的行。 如有必要将打开相应的文件。

Shell 具有将输出行折叠为一个 'Squeezed text' 标签的特殊功能。 此功能将自动应用于超过 N 行的输出 (默认 N = 50)。 N 可以在设置对话框中 General 页的 PyShell 区域中修改。 行数更少的输出也可通过在输出上右击来折叠。 此功能适用于过多的输出行数导致滚动操作变慢的情况。

已折叠的输出可通过双击该标签来原地展开。 也可通过右击该标签将其发送到剪贴板或单独的查看窗口。

### 开发 tkinter 应用程序[¶](#developing-tkinter-applications "Link to this heading")

IDLE 有意与标准 Python 保持区别以方便 tkinter 程序的开发。 在标准 Python 中输入 `import tkinter as tk; root = tk.Tk()` 不会显示任何东西。 在 IDLE 中输入同样的代码则会显示一个 tk 窗口。 在标准 Python 中，还必须输入 `root.update()` 才会将窗口显示出来。 IDLE 会在幕后执行同样的方法，每秒大约 20 次，即每隔大约 50 毫秒。 下面输入 `b = tk.Button(root, text='button'); b.pack()`。 在标准 Python 中仍然不会有任何可见的变化，直到输入 `root.update()`。

大多数 tkinter 程序都会运行 `root.mainloop()`，它通常直到 tk 应用被销毁时才会返回。 如果程序是通过 `python -i` 或 IDLE 编辑器运行的，则 `>>>` Shell 提示符将直到 `mainloop()` 返回时才会出现，这时将结束程序的交互。

当通过 IDLE 编辑器运行 tkinter 程序时，可以注释掉 mainloop 调用。 这样将立即回到 Shell 提示符并可与正在运行的应用程序交互。 请记得当在标准 Python 中运行时重新启用 mainloop 调用。

### 在没有子进程的情况下运行[¶](#running-without-a-subprocess "Link to this heading")

在默认情况下，IDLE 是通过一个套接字在单独的子进程中执行用户代码，它将使用内部的环回接口。 这个连接在外部不可见并且不会在互联网上发送或接收数据。 如果防火墙仍然会报警，你完全可以忽略。

如果创建套接字连接的尝试失败，IDLE 将会通知你。 这样的失败可能是暂时性的，但是如果持续存在，问题可能是防火墙阻止了连接或某个系统配置错误。 在问题得到解决之前，可以使用 -n 命令行开关来运行 IDLE。

如果 IDLE 启动时使用了 -n 命令行开关则它将在单个进程中运行并且将不再创建运行 RPC Python 执行服务器的子进程。 这适用于 Python 无法在你的系统平台上创建子进程或 RPC 套接字接口的情况。 但是，在这种模式下用户代码没有与 IDLE 本身相隔离。 而且，当选择 Run/Run Module (F5) 时运行环境也不会重启。 如果你的代码已被修改，你必须为受影响的模块执行 reload() 并重新导入特定的条目 (例如 from foo import baz) 才能让修改生效。 出于这些原因，在可能的情况下最好还是使用默认的子进程来运行 IDLE。

自 3.4 版本弃用.

## 帮助和首选项[¶](#help-and-preferences "Link to this heading")

### 帮助源[¶](#help-sources "Link to this heading")

Help 菜单项 "IDLE Help" 会显示标准库参考中 IDLE 一章的带格式 HTML 版本。 这些内容放在只读的 tkinter 文本窗口中，与在浏览器中看到的内容类似。 可使用鼠标滚轮、滚动条或上下方向键来浏览文本。 或是点击 TOC (Table of Contents) 按钮并在打开的选项框中选择一个节标题。

Help 菜单项 "Python Docs" 会打开更丰富的帮助源，包括教程，通过 `docs.python.org/x.y` 来访问，其中 'x.y' 是当前运行的 Python 版本。 如果你的系统有此文档的离线副本 (这可能是一个安装选项)，则将打开这个副本。

选定的 URL 可以使用配置 IDLE 对话框的 General 选项卡随时在帮助菜单中添加或移除。

### 首选项设置[¶](#setting-preferences "Link to this heading")

字体首选项、高亮、按键和通用首选项可通过 Option 菜单的配置 IDLE 项来修改。 非默认的用户设置将保存在用户家目录下的 `.idlerc` 目录中。 用户配置文件错误导致的问题可通过编辑或删除 `.idlerc` 中的一个或多个文件来解决。

在 Font 选项卡中，可以查看使用多种语言的多个字符的示例文本来了解字体或字号效果。 可以编辑示例文本来添加想要的其他字符。 请使用示例文本选择等宽字体。 如果某些字符在 Shell 或编辑器中的显示有问题，可以将它们添加到示例文本的开头并尝试改变字号和字体。

在 Highlights 和 Keys 选项卡中，可以选择内置或自定义的颜色主题和按键集合。 要将更新的内置颜色主题或按键集合与旧版 IDLE 一起使用，可以将其保存为新的自定义主题或按键集合就将可在旧版 IDLE 中使用。

### macOS 上的 IDLE[¶](#idle-on-macos "Link to this heading")

在 System Preferences: Dock 中，可以将 "Prefer tabs when opening documents" 设为 "Always"。 但是该设置不能兼容 IDLE 所使用的 tk/tkinter GUI 框架，并会使得部分 IDLE 特性失效。

### 扩展[¶](#extensions "Link to this heading")

IDLE 可以包含扩展插件。 扩展插件的首选项可通过首选项对话框的 Extensions 选项卡来修改。 请查看 idlelib 目录下 config-extensions.def 的开头来了解详情。 目前唯一的扩展插件是 zzdummy，它也是一个测试用的示例。

## idlelib --- IDLE 应用程序的实现[¶](#module-idlelib "Link to this heading")

**源代码:** [Lib/idlelib](https://github.com/python/cpython/tree/3.14/Lib/idlelib)

* * *

Lib/idlelib 包实现了 IDLE 应用程序。 请查看本页面的其余的内容来了解如何使用 IDLE。

有关 idlelib 中文件的描述见 idlelib/README.txt。 可以在 idlelib 中或者在 IDLE 中点击 Help => About IDLE 来查看它。 此文件还将 IDLE 菜单条目映射到了实现这些条目的代码。 除了在 'Startup' 中列出的文件以外，idlelib 代码都是 '私有' 的意即特性的修改可以被向下移植 (参见 [**PEP 434**](https://peps.python.org/pep-0434/))。
