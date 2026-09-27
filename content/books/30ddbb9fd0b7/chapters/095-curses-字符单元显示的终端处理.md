**源代码:** [Lib/curses](https://github.com/python/cpython/tree/3.14/Lib/curses)

* * *

`curses` 模块提供了 curses 库的接口，这是可移植高级终端处理的事实标准。

虽然 curses 在 Unix 环境中使用最为广泛，但也有适用于 Windows，DOS 以及其他可能的系统的版本。此扩展模块旨在匹配 ncurses 的 API，这是一个部署在 Linux 和 Unix 的 BSD 变体上的开源 curses 库。

这是一个 [optional module](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module)。 如果它在你的 CPython 副本中缺失，请查看你的发行方（也就是说，向你提供 Python 的人）的文档。 如果你就是发行方，请参阅 [针对可选模块的要求](https://docs.python.org/zh-cn/3/using/configure.html#optional-module-requirements)。

备注

Whenever the documentation mentions a _character_ it can be specified as an integer, a one-character Unicode string or a one-byte byte string. An integer is the code of a single encoded byte, optionally combined with attributes and a color pair, as returned by [`window.inch()`](#curses.window.inch "curses.window.inch").

每当此文档提到 **字符串** 时，它可以被指定为一个 Unicode 字符串或者一个字节字符串。

备注

Whether curses may be used from several threads depends on the underlying library and how it was built. In many implementations, including the default build of ncurses, the screen state is shared and not thread-safe; since the blocking and refresh methods (such as [`getch()`](#curses.window.getch "curses.window.getch") and [`refresh()`](#curses.window.refresh "curses.window.refresh")) release the [GIL](https://docs.python.org/zh-cn/3/glossary.html#term-GIL), unsynchronized use from several threads can then crash the interpreter. Serialize the calls.

## 函数[¶](#functions "Link to this heading")

`curses` 模块定义了以下异常：

_exception_ curses.error[¶](#curses.error "Link to this definition")

当 curses 库中函数返回一个错误时引发的异常。

备注

只要一个函数或方法的 _x_ 或 _y_ 参数是可选项，它们会默认为当前光标位置。 而当 _attr_ 是可选项时，它会默认为 [`A_NORMAL`](#curses.A_NORMAL "curses.A_NORMAL")。

`curses` 模块定义了以下函数：

curses.assume\_default\_colors(_fg_, _bg_, _/_)[¶](#curses.assume_default_colors "Link to this definition")

允许在支持此特性的终端上使用颜色的默认值。使用此功能可在您的应用程序中支持透明度。

-   将终端默认的前景色/背景色分配为颜色编号 `-1`。 因此，`init_pair(x, COLOR_RED, -1)` 将初始化颜色对 _x_ 为红色前景色和默认背景色，而 `init_pair(x, -1, COLOR_BLUE)` 将初始化颜色对 _x_ 为默认前景色和蓝色背景色。
    
-   将颜色对 `0` 的定义更改为 `(fg, bg)`。
    

这是一个 ncurses 扩展。

Added in version 3.14.

curses.baudrate()[¶](#curses.baudrate "Link to this definition")

以每秒比特数为单位返回终端输出速度。 在软件终端模拟器上它将具有一个固定的最高值。 此函数出于历史原因被包括；在以前，它被用于写输出循环以提供时间延迟，并偶尔根据线路速度来改变接口。

curses.beep()[¶](#curses.beep "Link to this definition")

发出短促的提醒声音。

curses.can\_change\_color()[¶](#curses.can_change_color "Link to this definition")

根据程序员能否改变终端显示的颜色返回 `True` 或 `False`。

curses.cbreak()[¶](#curses.cbreak "Link to this definition")

进入 cbreak 模式。 在 cbreak 模式（有时也称为“稀有”模式）通常的 tty 行缓冲会被关闭并且字符可以被一个一个地读取。 但是，与原始模式不同，特殊字符（中断、退出、挂起和流程控制）会在 tty 驱动和调用程序上保留其效果。 首先调用 [`raw()`](#curses.raw "curses.raw") 然后调用 [`cbreak()`](#curses.cbreak "curses.cbreak") 会将终端置于 cbreak 模式。

curses.color\_content(_color\_number_)[¶](#curses.color_content "Link to this definition")

Return the intensity of the red, green, and blue (RGB) components in the color _color\_number_, which must be between `0` and `COLORS - 1`. Return a 3-tuple, containing the R,G,B values for the given color, which will be between `0` (no component) and `1000` (maximum amount of component). Raise an exception if the color is not supported.

curses.color\_pair(_pair\_number_)[¶](#curses.color_pair "Link to this definition")

返回用于以指定颜色对显示文本的属性值。 仅支持前 256 个颜色对。 该属性值可与 [`A_STANDOUT`](#curses.A_STANDOUT "curses.A_STANDOUT"), [`A_REVERSE`](#curses.A_REVERSE "curses.A_REVERSE") 以及其他 `A_*` 属性组合使用。 [`pair_number()`](#curses.pair_number "curses.pair_number") 是此函数的对应操作。

curses.curs\_set(_visibility_)[¶](#curses.curs_set "Link to this definition")

设置光标状态。 _visibility_ 可设为 `0`, `1` 或 `2` 表示不可见、正常与高度可见。 如果终端支持所请求的可见性，则返回之前的光标状态；否则会引发异常。 在许多终端上，“正常可见”模式为下划线光标而“高度可见”模式为方块形光标。

curses.def\_prog\_mode()[¶](#curses.def_prog_mode "Link to this definition")

将当前终端模式保存为 "program" 模式，即正在运行的程序使用 curses 的模式。 （与其相对的是 "shell" 模式，即程序不使用 curses。） 对 [`reset_prog_mode()`](#curses.reset_prog_mode "curses.reset_prog_mode") 的后续调用将恢复此模式。

curses.def\_shell\_mode()[¶](#curses.def_shell_mode "Link to this definition")

将当前终端模式保存为 "shell" 模式，即正在运行的程序不使用 curses 的模式。 （与其相对的是 "program" 模式，即程序使用 功能。） 对 [`reset_shell_mode()`](#curses.reset_shell_mode "curses.reset_shell_mode") 的后续调用将恢复此模式。

curses.delay\_output(_ms_)[¶](#curses.delay_output "Link to this definition")

在输出中插入 _ms_ 毫秒的暂停。

curses.doupdate()[¶](#curses.doupdate "Link to this definition")

Update the physical screen. The curses library keeps two data structures, one representing the current physical screen contents and a virtual screen representing the desired next state. The [`doupdate()`](#curses.doupdate "curses.doupdate") function updates the physical screen to match the virtual screen.

虚拟屏幕可以通过在写入操作例如在一个窗口上执行 [`addstr()`](#curses.window.addstr "curses.window.addstr") 之后调用 [`noutrefresh()`](#curses.window.noutrefresh "curses.window.noutrefresh") 来刷新。 普通的 [`refresh()`](#curses.window.refresh "curses.window.refresh") 调用只是简单的 `noutrefresh()` 加 `doupdate()`；如果你需要更新多个窗口，你可以通过在所有窗口上发出 `noutrefresh()` 调用再加单次 `doupdate()` 来提升性能并可减少屏幕闪烁。

curses.echo()[¶](#curses.echo "Link to this definition")

进入 echo 模式。 在 echo 模式下，输入的每个字符都会在输入后回显到屏幕上。

curses.endwin()[¶](#curses.endwin "Link to this definition")

撤销库的初始化，使终端返回正常状态。

curses.erasechar()[¶](#curses.erasechar "Link to this definition")

将用户的当前擦除字符以单字节字节串对象的形式返回。 在 Unix 操作系统下这是 curses 程序用来控制 tty 的属性，而不是由 curses 库本身来设置的。

curses.filter()[¶](#curses.filter "Link to this definition")

The `filter()` routine, if used, must be called before [`initscr()`](#curses.initscr "curses.initscr") is called. The effect is that, during the initialization, `LINES` is set to `1`; the capabilities `clear`, `cup`, `cud`, `cud1`, `cuu1`, `cuu`, `vpa` are disabled; and the `home` string is set to the value of `cr`. The effect is that the cursor is confined to the current line, and so are screen updates. This may be used for enabling character-at-a-time line editing without touching the rest of the screen.

curses.flash()[¶](#curses.flash "Link to this definition")

闪烁屏幕。 也就是将其改为反显并在很短的时间内将其改回原状。 有些人更喜欢这样的‘视觉响铃’而非 [`beep()`](#curses.beep "curses.beep") 所产生的听觉提醒信号。

curses.flushinp()[¶](#curses.flushinp "Link to this definition")

刷新所有输入缓冲区。 这会丢弃任何已被用户输入但尚未被程序处理的预输入内容。

curses.getmouse()[¶](#curses.getmouse "Link to this definition")

在 [`getch()`](#curses.window.getch "curses.window.getch") 返回 [`KEY_MOUSE`](#curses.KEY_MOUSE "curses.KEY_MOUSE") 以发出鼠标事件信号之后，应当调用此方法来获取加入队列的鼠标事件，事件以一个 5 元组 `(id, x, y, z, bstate)` 来表示。 其中 _id_ 为用于区分多个设备的 ID 值，而 _x_, _y_, _z_ 为事件的坐标。 (_z_ 目前未被使用。) _bstate_ 为一个整数值，其各个比特位将被设置用来表示事件的类型，并将为下列常量中的一个或多个按位 OR 的结果，其中 _n_ 是以 1 到 5 表示的键号: [`BUTTONn_PRESSED`](#curses.BUTTONn_PRESSED "curses.BUTTONn_PRESSED"), [`BUTTONn_RELEASED`](#curses.BUTTONn_RELEASED "curses.BUTTONn_RELEASED"), [`BUTTONn_CLICKED`](#curses.BUTTONn_CLICKED "curses.BUTTONn_CLICKED"), [`BUTTONn_DOUBLE_CLICKED`](#curses.BUTTONn_DOUBLE_CLICKED "curses.BUTTONn_DOUBLE_CLICKED"), [`BUTTONn_TRIPLE_CLICKED`](#curses.BUTTONn_TRIPLE_CLICKED "curses.BUTTONn_TRIPLE_CLICKED"), [`BUTTON_SHIFT`](#curses.BUTTON_SHIFT "curses.BUTTON_SHIFT"), [`BUTTON_CTRL`](#curses.BUTTON_CTRL "curses.BUTTON_CTRL"), [`BUTTON_ALT`](#curses.BUTTON_ALT "curses.BUTTON_ALT")。

在 3.10 版本发生变更: 现在 `BUTTON5_*` 常量如果是由下层 curses 库提供的则会对外公开。

curses.getsyx()[¶](#curses.getsyx "Link to this definition")

将当前虚拟屏幕光标的坐标作为元组 `(y, x)` 返回。 如果 [`leaveok`](#curses.window.leaveok "curses.window.leaveok") 当前为 `True`，则返回 `(-1, -1)`。

curses.getwin(_file_)[¶](#curses.getwin "Link to this definition")

Read window-related data stored in the file by an earlier [`window.putwin()`](#curses.window.putwin "curses.window.putwin") call. The routine then creates and initializes a new window using that data, returning the new window object. The _file_ argument must be a file object opened for reading in binary mode.

curses.has\_colors()[¶](#curses.has_colors "Link to this definition")

如果终端能显示彩色则返回 `True`；否则返回 `False`。

curses.has\_extended\_color\_support()[¶](#curses.has_extended_color_support "Link to this definition")

Return `True` if the module supports extended colors; otherwise, return `False`. Extended color support allows more than 256 color pairs for terminals that support more than 16 colors (for example, xterm-256color).

扩展颜色支持要求 ncurses 版本为 6.1 或更新。

Added in version 3.10.

curses.has\_ic()[¶](#curses.has_ic "Link to this definition")

如果终端具有插入和删除字符的功能则返回 `True`。 此函数仅是出于历史原因而被包括的，因为所有现代软件终端模拟器都具有这些功能。

curses.has\_il()[¶](#curses.has_il "Link to this definition")

如果终端具有插入和删除行功能，或者能够使用滚动区域来模拟这些功能则返回 `True`。 此函数仅是出于历史原因而被包括的，因为所有现代软件终端模拟器都具有这些功能。

curses.has\_key(_ch_)[¶](#curses.has_key "Link to this definition")

接受一个键值 _ch_，并在当前终端类型能识别出具有该值的键时返回 `True`。

curses.halfdelay(_tenths_)[¶](#curses.halfdelay "Link to this definition")

用于半延迟模式，与 cbreak 模式的类似之处是用户所键入的字符会立即对程序可用。 但是，在阻塞 _tenths_ 个十分之一秒之后，如果还未输入任何内容则将引发异常。 _tenths_ 值必须为 `1` 和 `255` 之间的数字。 使用 [`nocbreak()`](#curses.nocbreak "curses.nocbreak") 可退出半延迟模式。

curses.init\_color(_color\_number_, _r_, _g_, _b_)[¶](#curses.init_color "Link to this definition")

更改某个颜色的定义，接受要更改的颜色编号以及三个 RGB 值（表示红绿蓝三个分量的强度）。 _color\_number_ 的值必须为 `0` 和 `COLORS - 1` 之间的数字。 每个 _r_, _g_, _b_ 值必须为 `0` 和 `1000` 之间的数字。 当使用 [`init_color()`](#curses.init_color "curses.init_color") 时，出现在屏幕上的对应颜色会立即按照新定义来更改。 此函数在大多数终端上都是无操作的；它仅会在 [`can_change_color()`](#curses.can_change_color "curses.can_change_color") 返回 `True` 时生效。

curses.init\_pair(_pair\_number_, _fg_, _bg_)[¶](#curses.init_pair "Link to this definition")

更改颜色对的定义。 它需要三个参数：要更改的颜色对的编号、前景色编号和背景色编号。 _pair\_number_ 的值必须介于 `1` 和 `COLOR_PAIRS - 1` 之间 (`0` 颜色对只能由 [`use_default_colors()`](#curses.use_default_colors "curses.use_default_colors") 和 [`assume_default_colors()`](#curses.assume_default_colors "curses.assume_default_colors") 更改)。 _fg_ 和 _bg_ 参数的值必须介于 `0` 和 `COLORS - 1` 之间，或者在调用 `use_default_colors()` 或 `assume_default_colors()` 时使用 `-1`。 如果该颜色对之前已被初始化，则屏幕将被刷新，该颜色对的所有出现都将更改为新定义。

curses.initscr()[¶](#curses.initscr "Link to this definition")

初始化库。 返回代表整个屏幕的 [窗口](#curses-window-objects) 对象。

请参阅 [`setupterm()`](#curses.setupterm "curses.setupterm") 了解关于在此函数之前调用它的注意事项。

备注

如果打开终端时发生错误，则下层的 curses 库可能会导致解释器退出。

curses.intrflush(_flag_)[¶](#curses.intrflush "Link to this definition")

If _flag_ is `True`, pressing an interrupt key (interrupt, break, or quit) will flush all output in the terminal driver queue. If _flag_ is `False`, no flushing is done.

curses.is\_term\_resized(_nlines_, _ncols_)[¶](#curses.is_term_resized "Link to this definition")

如果 [`resize_term()`](#curses.resize_term "curses.resize_term") 会修改窗口结构则返回 `True`，否则返回 `False`。

curses.isendwin()[¶](#curses.isendwin "Link to this definition")

如果 [`endwin()`](#curses.endwin "curses.endwin") 已经被调用（即 curses 库已经被撤销初始化）则返回 `True`。

curses.keyname(_k_)[¶](#curses.keyname "Link to this definition")

将编号为 _k_ 的键名称作为字节串对象返回。 生成可打印 ASCII 字符的键名称就是键所对应的字符。 Ctrl-键组合的键名称则是一个两字节的字节串对象，它由插入符 (`b'^'`) 加对应的可打印 ASCII 字符组成。 Alt-键组合 (128--255) 的键名称则是由前缀 `b'M-'` 加对应的可打印 ASCII 字符组成的字节串对象。

如果 _k_ 为负值则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

curses.killchar()[¶](#curses.killchar "Link to this definition")

将用户的当前行删除字符以单字节字节串对象的形式返回。 在 Unix 操作系统下这是 curses 程序用来控制 tty 的属性，而不是由 curses 库本身来设置的。

curses.longname()[¶](#curses.longname "Link to this definition")

返回一个字节串对象，其中包含描述当前终端的 terminfo 长名称字段。 详细描述的最大长度为 128 个字符。 它仅在调用 [`initscr()`](#curses.initscr "curses.initscr") 之后才会被定义。

curses.meta(_flag_)[¶](#curses.meta "Link to this definition")

如果 _flag_ 为 `True`，则允许输入 8 比特位的字符。 如果 _flag_ 为 `False`，则只允许 7 比特位的字符。

curses.mouseinterval(_interval_)[¶](#curses.mouseinterval "Link to this definition")

Set the maximum time in milliseconds that can elapse between press and release events in order for them to be recognized as a click, and return the previous interval value. The default value is 166 milliseconds, or one sixth of a second. Use a negative _interval_ to obtain the interval value without changing it.

curses.mousemask(_mousemask_)[¶](#curses.mousemask "Link to this definition")

Set the mouse events to be reported, and return a tuple `(availmask, oldmask)`. _availmask_ indicates which of the specified mouse events can be reported; on complete failure it returns `0`. _oldmask_ is the previous value of the mouse event mask. If this function is never called, no mouse events are ever reported.

curses.napms(_ms_)[¶](#curses.napms "Link to this definition")

休眠 _ms_ 毫秒。

curses.newpad(_nlines_, _ncols_)[¶](#curses.newpad "Link to this definition")

创建并返回一个指向具有给定行数和列数新的面板数据结构的指针。 将面板作为窗口对象返回。

A pad is like a window, except that it is not restricted by the screen size, and is not necessarily associated with a particular part of the screen. Pads can be used when a large window is needed, and only a part of the window will be on the screen at one time. Automatic refreshes of pads (such as from scrolling or echoing of input) do not occur. The [`refresh()`](#curses.window.refresh "curses.window.refresh") and [`noutrefresh()`](#curses.window.noutrefresh "curses.window.noutrefresh") methods of a pad require 6 arguments to specify the part of the pad to be displayed and the location on the screen to be used for the display. The arguments are _pminrow_, _pmincol_, _sminrow_, _smincol_, _smaxrow_, _smaxcol_; the _p_ arguments refer to the upper-left corner of the pad region to be displayed and the _s_ arguments define a clipping box on the screen within which the pad region is to be displayed.

curses.newwin(_nlines_, _ncols_)[¶](#curses.newwin "Link to this definition")

curses.newwin(_nlines_, _ncols_, _begin\_y_, _begin\_x_)

返回一个新的 [窗口](#curses-window-objects)，其左上角位于 `(begin_y, begin_x)`，并且其高度/宽度为 _nlines_/_ncols_。

默认情况下，窗口将从指定位置扩展到屏幕的右下角。

curses.nl(_flag\=True_)[¶](#curses.nl "Link to this definition")

进入 newline 模式。 此模式会在输入时将回车转换为换行符，并在输出时将换行符转换为回车加换行。 newline 模式会在初始时启用。

如果 _flag_ 为 `False`，则效果与调用 [`nonl()`](#curses.nonl "curses.nonl") 相同。

curses.nocbreak()[¶](#curses.nocbreak "Link to this definition")

退出 cbreak 模式。 返回具有行缓冲的正常 "cooked" 模式。

curses.noecho()[¶](#curses.noecho "Link to this definition")

退出 echo 模式。 关闭输入字符的回显。

curses.nonl()[¶](#curses.nonl "Link to this definition")

退出 newline 模式。 停止在输入时将回车转换为换行，并停止在输出时从换行到换行/回车的底层转换（但这不会改变 `addch('\n')` 的行为，此行为总是在虚拟屏幕上执行相当于回车加换行的操作）。 当停止转换时，curses 有时能使纵向移动加快一些；并且，它将能够在输入时检测回车键。

curses.noqiflush()[¶](#curses.noqiflush "Link to this definition")

当使用 `noqiflush()` 例程时，与 `INTR`, `QUIT` 和 `SUSP` 字符相关联的输入和输出队列的正常刷新将不会被执行。 如果你希望在处理程序退出后还能继续输出，就像没有发生过中断一样，你可能会想要在信号处理程序中调用 `noqiflush()`。

curses.noraw()[¶](#curses.noraw "Link to this definition")

退出 raw 模式。 返回具有行缓冲的正常 "cooked" 模式。

curses.pair\_content(_pair\_number_)[¶](#curses.pair_content "Link to this definition")

返回包含对应于所请求颜色对的元组 `(fg, bg)`。 _pair\_number_ 的值必须在 `0` 和 `COLOR_PAIRS - 1` 之间。

curses.pair\_number(_attr_)[¶](#curses.pair_number "Link to this definition")

返回通过属性值 _attr_ 所设置的颜色对的编号。 [`color_pair()`](#curses.color_pair "curses.color_pair") 是此函数的对应操作。

curses.putp(_str_)[¶](#curses.putp "Link to this definition")

Equivalent to `tputs(str, 1, putchar)`; emit the value of a specified terminfo capability, a bytes object, for the current terminal. Note that the output of [`putp()`](#curses.putp "curses.putp") always goes to standard output.

[`setupterm()`](#curses.setupterm "curses.setupterm") (或 [`initscr()`](#curses.initscr "curses.initscr")) 必须先被调用。

curses.qiflush(\[_flag_\])[¶](#curses.qiflush "Link to this definition")

如果 _flag_ 为 `False`，则效果与调用 [`noqiflush()`](#curses.noqiflush "curses.noqiflush") 相同。 如果 _flag_ 为 `True` 或未提供参数，则在读取这些控制字符时队列将被刷新。

curses.raw()[¶](#curses.raw "Link to this definition")

进入 raw 模式。 在 raw 模式下，正常的行缓冲和对中断、退出、挂起和流程控制键的处理会被关闭；字符会被逐个地提交给 curses 输入函数。

curses.reset\_prog\_mode()[¶](#curses.reset_prog_mode "Link to this definition")

将终端恢复到 "program" 模式，如之前由 [`def_prog_mode()`](#curses.def_prog_mode "curses.def_prog_mode") 所保存的一样。

curses.reset\_shell\_mode()[¶](#curses.reset_shell_mode "Link to this definition")

将终端恢复到 "shell" 模式，如之前由 [`def_shell_mode()`](#curses.def_shell_mode "curses.def_shell_mode") 所保存的一样。

curses.resetty()[¶](#curses.resetty "Link to this definition")

将终端模式恢复到最后一次调用 [`savetty()`](#curses.savetty "curses.savetty") 时的状态。

curses.resize\_term(_nlines_, _ncols_)[¶](#curses.resize_term "Link to this definition")

由 [`resizeterm()`](#curses.resizeterm "curses.resizeterm") 用来执行大部分工作的后端函数；当调整窗口大小时，[`resize_term()`](#curses.resize_term "curses.resize_term") 会以空白填充扩展区域。 调用方应用程序应当以适当的数据填充这些区域。 `resize_term()` 函数会尝试调整所有窗口的大小。 但是，由于面板的调用约定，在不与应用程序进行额外交互的情况下是无法调整其大小的。

curses.resizeterm(_nlines_, _ncols_)[¶](#curses.resizeterm "Link to this definition")

将标准窗口和当前窗口的大小调整为指定的尺寸，并调整由 curses 库所使用的记录窗口尺寸的其他记录数据（特别是 SIGWINCH 处理程序）。

curses.savetty()[¶](#curses.savetty "Link to this definition")

将终端模式的当前状态保存在缓冲区中，可供 [`resetty()`](#curses.resetty "curses.resetty") 使用。

curses.get\_escdelay()[¶](#curses.get_escdelay "Link to this definition")

提取通过 [`set_escdelay()`](#curses.set_escdelay "curses.set_escdelay") 设置的值。

Added in version 3.9.

curses.set\_escdelay(_ms_)[¶](#curses.set_escdelay "Link to this definition")

设置读取一个转义字符后要等待的毫秒数，以区分在键盘上输入的单个转义字符与通过光标和功能键发送的转义序列。

Added in version 3.9.

curses.get\_tabsize()[¶](#curses.get_tabsize "Link to this definition")

提取通过 [`set_tabsize()`](#curses.set_tabsize "curses.set_tabsize") 设置的值。

Added in version 3.9.

curses.set\_tabsize(_size_)[¶](#curses.set_tabsize "Link to this definition")

设置 curses 库在将制表符添加到窗口时将制表符转换为空格所使用的列数。

Added in version 3.9.

curses.setsyx(_y_, _x_)[¶](#curses.setsyx "Link to this definition")

将虚拟屏幕光标设置到 _y_, _x_。 如果 _y_ 和 _x_ 均为 `-1`，则 [`leaveok`](#curses.window.leaveok "curses.window.leaveok") 将设为 `True`。

curses.setupterm(_term\=None_, _fd\=\-1_)[¶](#curses.setupterm "Link to this definition")

初始化终端。 _term_ 为给出终端名称的字符串或为 `None`；如果省略或为 `None`，则将使用 `TERM` 环境变量的值。 _fd_ 是任何初始化序列将被发送到的文件描述符；如未指定或为 `-1`，则将使用 `sys.stdout` 的文件描述符。

Raise a [`curses.error`](#curses.error "curses.error") if the terminal could not be found or its terminfo database entry could not be read. If the terminal has already been initialized, this function has no effect.

备注

Calling [`initscr()`](#curses.initscr "curses.initscr") after `setupterm()` leaks the terminal that `setupterm()` allocated: the curses library keeps only a single current terminal and does not free the previously allocated one.

curses.start\_color()[¶](#curses.start_color "Link to this definition")

如果程序员想要使用颜色，则必须在任何其他颜色操作例程被调用之前调用它。 在 [`initscr()`](#curses.initscr "curses.initscr") 之后立即调用此例程是一个很好的做法。

`start_color()` initializes eight basic colors (black, red, green, yellow, blue, magenta, cyan, and white), and two global variables in the `curses` module, [`COLORS`](#curses.COLORS "curses.COLORS") and [`COLOR_PAIRS`](#curses.COLOR_PAIRS "curses.COLOR_PAIRS"), containing the maximum number of colors and color-pairs the terminal can support. It also restores the colors on the terminal to the values they had when the terminal was just turned on.

curses.termattrs()[¶](#curses.termattrs "Link to this definition")

返回终端所支持的所有视频属性逻辑 OR 的值。 此信息适用于当 curses 程序需要对屏幕外观进行完全控制的情况。

curses.termname()[¶](#curses.termname "Link to this definition")

将环境变量 `TERM` 的值截短至 14 个字节，作为字节串对象返回。

curses.tigetflag(_capname_)[¶](#curses.tigetflag "Link to this definition")

将与 terminfo 功能名称 _capname_ 相对应的布尔功能值以整数形式返回。 如果 _capname_ 不是一个布尔功能则返回 `-1`，如果其被取消或不存在于终端描述中则返回 `0`。

[`setupterm()`](#curses.setupterm "curses.setupterm") (或 [`initscr()`](#curses.initscr "curses.initscr")) 必须先被调用。

curses.tigetnum(_capname_)[¶](#curses.tigetnum "Link to this definition")

将与 terminfo 功能名称 _capname_ 相对应的数字功能值以整数形式返回。 如果 _capname_ 不是一个数字功能则返回 `-2`，如果其被取消或不存在于终端描述中则返回 `-1`。

[`setupterm()`](#curses.setupterm "curses.setupterm") (或 [`initscr()`](#curses.initscr "curses.initscr")) 必须先被调用。

curses.tigetstr(_capname_)[¶](#curses.tigetstr "Link to this definition")

将与 terminfo 功能名称 _capname_ 相对应的字符串功能值以字节串对象形式返回。 如果 _capname_ 不是一个 terminfo "字符串功能" 或者如果其被取消或不存在于终端描述中则返回 `None`。

[`setupterm()`](#curses.setupterm "curses.setupterm") (或 [`initscr()`](#curses.initscr "curses.initscr")) 必须先被调用。

curses.tparm(_str_\[, _..._\])[¶](#curses.tparm "Link to this definition")

Instantiate the bytes object _str_ with the supplied parameters, where _str_ should be a parameterized byte string obtained from the terminfo database. For example, `tparm(tigetstr("cup"), 5, 3)` could result in `b'\033[6;4H'`, the exact result depending on terminal type. Up to nine integer parameters may be supplied.

[`setupterm()`](#curses.setupterm "curses.setupterm") (或 [`initscr()`](#curses.initscr "curses.initscr")) 必须先被调用。

curses.typeahead(_fd_)[¶](#curses.typeahead "Link to this definition")

指定将被用于预输入检查的文件描述符 _fd_。 如果 _fd_ 为 `-1`，则不执行预输入检查。

curses 库会在更新屏幕时通过定期查找预输入来执行 "断行优化"。 如果找到了输入，并且输入是来自于 tty，则会将当前更新推迟至 refresh 或 doupdate 再次被调用的时候，以便允许更快地响应预先输入的命令。 此函数允许为预输入检查指定其他的文件描述符。

curses.unctrl(_ch_)[¶](#curses.unctrl "Link to this definition")

Return a bytes object which is a printable representation of the character _ch_; any attributes and color pair are ignored. Control characters are represented as a caret followed by the character, for example as `b'^C'`. Printing characters are left as they are.

curses.ungetch(_ch_)[¶](#curses.ungetch "Link to this definition")

推送 _ch_ 以便让下一个 [`getch()`](#curses.window.getch "curses.window.getch") 返回该字符。

_ch_ 可以是一个整数（键代码或已编码字符的代码）、字节或一个编码为单个字节的长度为的字节串。

备注

在 `getch()` 被调用之前只能推送一个 _ch_。

curses.update\_lines\_cols()[¶](#curses.update_lines_cols "Link to this definition")

更新 [`LINES`](#curses.LINES "curses.LINES") 和 [`COLS`](#curses.COLS "curses.COLS") 模块变量。 适用于检测手动调整屏幕大小。

Added in version 3.5.

curses.unget\_wch(_ch_)[¶](#curses.unget_wch "Link to this definition")

推送 _ch_ 以便让下一个 [`get_wch()`](#curses.window.get_wch "curses.window.get_wch") 返回该字符。

_ch_ 可以是一个整数（字符代码，不是键代码）或一个长度为 1 的字符串。

备注

在 `get_wch()` 被调用之前只能推送一个 _ch_。

Added in version 3.3.

curses.ungetmouse(_id_, _x_, _y_, _z_, _bstate_)[¶](#curses.ungetmouse "Link to this definition")

将 [`KEY_MOUSE`](#curses.KEY_MOUSE "curses.KEY_MOUSE") 事件推送到输入队列，将其与给定的状态数据进行关联。

curses.use\_env(_flag_)[¶](#curses.use_env "Link to this definition")

如果使用此函数，则应当在调用 [`initscr()`](#curses.initscr "curses.initscr") 或 newterm 之前调用它。 当 _flag_ 为 `False` 时，将会使用在 terminfo 数据库中指定的行和列的值，即使设置了环境变量 `LINES` 和 `COLUMNS` (默认使用)，或者如果 curses 是在窗口中运行（在此情况下如果未设置 `LINES` 和 `COLUMNS` 则默认行为将是使用窗口大小）。

curses.use\_default\_colors()[¶](#curses.use_default_colors "Link to this definition")

相当于 `assume_default_colors(-1, -1)`。

curses.wrapper(_func_, _/_, _\*args_, _\*\*kwargs_)[¶](#curses.wrapper "Link to this definition")

初始化 curses 并调用另一个可调用对象 _func_，该对象应当为你的使用 curses 的应用程序的其余部分。 如果应用程序引发了异常，此函数将在重新引发异常并生成回溯信息之前将终端恢复到正常状态。 随后可调用对象 _func_ 会被传入主窗口 'stdscr' 作为其第一个参数，再带上其他所有传给 `wrapper()` 的参数。 在调用 _func_ 之前，`wrapper()` 会启用 cbreak 模式，关闭回显，启用终端键盘，并在终端具有颜色支持的情况下初始化颜色。 在退出时（无论是正常退出还是异常退出）它会恢复 cooked 模式，打开回显，并禁用终端键盘。

## 窗口对象[¶](#window-objects "Link to this heading")

_class_ curses.window[¶](#curses.window "Link to this definition")

Window 对象会由上面的 [`initscr()`](#curses.initscr "curses.initscr") 和 [`newwin()`](#curses.newwin "curses.newwin") 返回，它具有以下方法和属性:

window.addch(_ch_\[, _attr_\])[¶](#curses.window.addch "Link to this definition")

window.addch(_y_, _x_, _ch_\[, _attr_\])

将带有属性 _attr_ 的字符 _ch_ 绘制到 `(y, x)`，覆盖之前在该位置上绘制的任何字符。 默认情况下，字符的位置和属性均为窗口对象的当前设置。

备注

Writing outside the window, subwindow, or pad raises a [`curses.error`](#curses.error "curses.error"). Attempting to write to the lower-right corner of a window, subwindow, or pad will cause an exception to be raised after the character is printed.

window.addnstr(_str_, _n_\[, _attr_\])[¶](#curses.window.addnstr "Link to this definition")

window.addnstr(_y_, _x_, _str_, _n_\[, _attr_\])

将带有属性 _attr_ 的字符串 _str_ 中的至多 _n_ 个字符绘制到 `(y, x)`，覆盖之前在屏幕上的任何内容。

window.addstr(_str_\[, _attr_\])[¶](#curses.window.addstr "Link to this definition")

window.addstr(_y_, _x_, _str_\[, _attr_\])

将带有属性 _attr_ 的字符串 _str_ 绘制到 `(y, x)`，覆盖之前在屏幕上的任何内容。

备注

-   Writing outside the window, subwindow, or pad raises [`curses.error`](#curses.error "curses.error"). Attempting to write to the lower-right corner of a window, subwindow, or pad will cause an exception to be raised after the string is printed.
    
-   A bug in ncurses, the backend for this Python module, could cause segfaults when resizing windows. This was fixed in ncurses-6.1-20190511. If you are stuck with an earlier ncurses, you can avoid triggering it by not calling `addstr()` with a _str_ that has embedded newlines; instead, call `addstr()` separately for each line.
    

window.attroff(_attr_)[¶](#curses.window.attroff "Link to this definition")

从应用于写入到当前窗口的 "background" 集中移除属性 _attr_。

window.attron(_attr_)[¶](#curses.window.attron "Link to this definition")

将属性 _attr_ 添加到应用于对当前窗口的所有写入的 "background" 集合。

window.attrset(_attr_)[¶](#curses.window.attrset "Link to this definition")

将 "background" 属性集设为 _attr_。 该集合初始时为 `0` (无属性)。

window.bkgd(_ch_\[, _attr_\])[¶](#curses.window.bkgd "Link to this definition")

将窗口 background 特征属性设为带有属性 _attr_ 的字符 _ch_。 随后此修改将应用于放置到该窗口中的每个字符。

-   窗口中每个字符的属性会被修改为新的 background 属性。
    
-   不论之前的 background 字符出现在哪里，它都会被修改为新的 background 字符。
    

window.bkgdset(_ch_\[, _attr_\])[¶](#curses.window.bkgdset "Link to this definition")

设置窗口的背景。 窗口的背景由字符和属性的任意组合构成。 背景的属性部分会与写入窗口的所有非空白字符合并（即 OR 运算）。 背景的字符和属性部分均会与空白字符合并。 背景将成为字符的特征属性并在任何滚动与插入/删除行/字符操作中与字符一起移动。

window.border(\[_ls_\[, _rs_\[, _ts_\[, _bs_\[, _tl_\[, _tr_\[, _bl_\[, _br_\]\]\]\]\]\]\]\])[¶](#curses.window.border "Link to this definition")

在窗口边缘绘制边框。每个参数指定用于边界特定部分的字符;请参阅下表了解更多详情。

备注

任何形参的值为 `0` 都将导致该形参使用默认字符。 关键字形参 _不可_ 被使用。 默认字符在下表中列出:

| 
参数

 | 

描述

 | 

默认值

 |
| --- | --- | --- |
| 

_ls_

 | 

左侧

 | 

[`ACS_VLINE`](#curses.ACS_VLINE "curses.ACS_VLINE")

 |
| 

_rs_

 | 

右侧

 | 

[`ACS_VLINE`](#curses.ACS_VLINE "curses.ACS_VLINE")

 |
| 

_ts_

 | 

顶部

 | 

[`ACS_HLINE`](#curses.ACS_HLINE "curses.ACS_HLINE")

 |
| 

_bs_

 | 

底部

 | 

[`ACS_HLINE`](#curses.ACS_HLINE "curses.ACS_HLINE")

 |
| 

_tl_

 | 

左上角

 | 

[`ACS_ULCORNER`](#curses.ACS_ULCORNER "curses.ACS_ULCORNER")

 |
| 

_tr_

 | 

右上角

 | 

[`ACS_URCORNER`](#curses.ACS_URCORNER "curses.ACS_URCORNER")

 |
| 

_bl_

 | 

左下角

 | 

[`ACS_LLCORNER`](#curses.ACS_LLCORNER "curses.ACS_LLCORNER")

 |
| 

_br_

 | 

右下角

 | 

[`ACS_LRCORNER`](#curses.ACS_LRCORNER "curses.ACS_LRCORNER")

 |

window.box(\[_vertch_, _horch_\])[¶](#curses.window.box "Link to this definition")

类似于 [`border()`](#curses.window.border "curses.window.border")，但 _ls_ 和 _rs_ 均为 _vertch_ 而 _ts_ 和 _bs_ 均为 _horch_。 此函数总是会使用默认的转角字符。

window.chgat(_attr_)[¶](#curses.window.chgat "Link to this definition")

window.chgat(_num_, _attr_)

window.chgat(_y_, _x_, _attr_)

window.chgat(_y_, _x_, _num_, _attr_)

在当前光标位置或是在所提供的位置 `(y, x)` 设置 _num_ 个字符的属性。 如果 _num_ 未给出或为 `-1`，则将属性设置到所有字符上直至行尾。 如果提供了位置 `(y, x)` 则此函数会将光标移至该位置。 修改过的行将使用 [`touchline()`](#curses.window.touchline "curses.window.touchline") 方法处理以便下次窗口刷新时内容会重新显示。

window.clear()[¶](#curses.window.clear "Link to this definition")

类似于 [`erase()`](#curses.window.erase "curses.window.erase")，但还会导致在下次调用 [`refresh()`](#curses.window.refresh "curses.window.refresh") 时整个窗口被重新绘制。

window.clearok(_flag_)[¶](#curses.window.clearok "Link to this definition")

如果 _flag_ 为 `True`，则在下次调用 [`refresh()`](#curses.window.refresh "curses.window.refresh") 时将完全清除窗口。

window.clrtobot()[¶](#curses.window.clrtobot "Link to this definition")

从光标位置开始擦除直至窗口末端：光标以下的所有行都会被删除，然后会执行 [`clrtoeol()`](#curses.window.clrtoeol "curses.window.clrtoeol") 的等效操作。

window.clrtoeol()[¶](#curses.window.clrtoeol "Link to this definition")

从光标位置开始擦除直至行尾。

window.cursyncup()[¶](#curses.window.cursyncup "Link to this definition")

更新窗口所有上级窗口的当前光标位置以反映窗口的当前光标位置。

window.delch(\[_y_, _x_\])[¶](#curses.window.delch "Link to this definition")

Delete the character under the cursor, or at `(y, x)` if specified. All characters to the right on the same line are shifted one position left.

window.deleteln()[¶](#curses.window.deleteln "Link to this definition")

删除在光标之下的行。 所有后续的行都会上移一行。

window.derwin(_begin\_y_, _begin\_x_)[¶](#curses.window.derwin "Link to this definition")

window.derwin(_nlines_, _ncols_, _begin\_y_, _begin\_x_)

"derive window" 的缩写，[`derwin()`](#curses.window.derwin "curses.window.derwin") 与调用 [`subwin()`](#curses.window.subwin "curses.window.subwin") 等效，不同之处在于 _begin\_y_ 和 _begin\_x_ 是相对于窗口的初始位置，而不是相对于整个屏幕。 返回代表所派生窗口的窗口对象。

window.echochar(_ch_\[, _attr_\])[¶](#curses.window.echochar "Link to this definition")

使用属性 _attr_ 添加字符 _ch_，并立即在窗口上调用 [`refresh()`](#curses.window.refresh "curses.window.refresh")。

window.enclose(_y_, _x_)[¶](#curses.window.enclose "Link to this definition")

检测给定的相对屏幕的字符-单元格坐标是否被给定的窗口所包围，返回 `True` 或 `False`。 它适用于确定是哪个屏幕窗口子集包围着某个鼠标事件的位置。

在 3.10 版本发生变更: 在之前版本中它会返回 `1` 或 `0` 而不是 `True` 或 `False`。

window.encoding[¶](#curses.window.encoding "Link to this definition")

Encoding used to encode the string arguments of the methods and to decode their results on a build without wide-character support. The encoding attribute is inherited from the parent window when a subwindow is created, for example with [`window.subwin()`](#curses.window.subwin "curses.window.subwin"). By default, current locale encoding is used (see [`locale.getencoding()`](https://docs.python.org/zh-cn/3/library/locale.html#locale.getencoding "locale.getencoding")).

Added in version 3.3.

window.erase()[¶](#curses.window.erase "Link to this definition")

清空窗口。

window.getbegyx()[¶](#curses.window.getbegyx "Link to this definition")

返回以左上角为原点的坐标元组 `(y, x)`。

window.getbkgd()[¶](#curses.window.getbkgd "Link to this definition")

Return the given window's current background character/attribute pair. Its components can be extracted like those of [`inch()`](#curses.window.inch "curses.window.inch").

window.getch(\[_y_, _x_\])[¶](#curses.window.getch "Link to this definition")

Read a key press, after moving the cursor to _y_, _x_ if specified, and return it as an integer. The window is refreshed first if it is not a pad and was modified since the last refresh. Wait until a key is pressed, or return `-1` if the read is non-blocking or times out (see [`nodelay()`](#curses.window.nodelay "curses.window.nodelay") and [`timeout()`](#curses.window.timeout "curses.window.timeout")).

An ordinary key is returned as the code of a single byte of its encoding in the current locale, so a character encoded with several bytes takes several calls. For example, in a UTF-8 locale `'é'` is read as `195`, then `169`. Use [`get_wch()`](#curses.window.get_wch "curses.window.get_wch") to read it as a single character.

In keypad mode (see [`keypad()`](#curses.window.keypad "curses.window.keypad")) function keys and other special keys are returned as one of the [KEY\_\* constants](#curses-key-constants), which cannot be mistaken for an ordinary key. Otherwise, or if their escape sequence does not arrive in time (see [`notimeout()`](#curses.window.notimeout "curses.window.notimeout") and [`set_escdelay()`](#curses.set_escdelay "curses.set_escdelay")), their bytes are returned one at a time.

In echo mode (see [`echo()`](#curses.echo "curses.echo")) the key is added to the window as by [`addch()`](#curses.window.addch "curses.window.addch"); special keys are not echoed.

window.get\_wch(\[_y_, _x_\])[¶](#curses.window.get_wch "Link to this definition")

Read a key press, after moving the cursor to _y_, _x_ if specified, and return it as a one-character [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str"). The window is refreshed first if it is not a pad and was modified since the last refresh. Wait until a key is pressed, or raise [`error`](#curses.error "curses.error") if the read is non-blocking or times out (see [`nodelay()`](#curses.window.nodelay "curses.window.nodelay") and [`timeout()`](#curses.window.timeout "curses.window.timeout")).

In keypad mode (see [`keypad()`](#curses.window.keypad "curses.window.keypad")) function keys and other special keys are returned as one of the [KEY\_\* constants](#curses-key-constants), an integer. Otherwise, or if their escape sequence does not arrive in time (see [`notimeout()`](#curses.window.notimeout "curses.window.notimeout") and [`set_escdelay()`](#curses.set_escdelay "curses.set_escdelay")), their characters are returned one at a time.

In echo mode (see [`echo()`](#curses.echo "curses.echo")) the key is added to the window as by [`addch()`](#curses.window.addch "curses.window.addch"); special keys are not echoed.

Added in version 3.3.

window.getkey(\[_y_, _x_\])[¶](#curses.window.getkey "Link to this definition")

Read a key press as [`getch()`](#curses.window.getch "curses.window.getch") does, but return it as a [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str"): an ordinary key as a one-character string, the byte decoded as Latin-1, and a special key as its name, such as `'KEY_UP'` (see [`keyname()`](#curses.keyname "curses.keyname")). Raise [`error`](#curses.error "curses.error") instead of returning `-1` if there is no input.

window.getmaxyx()[¶](#curses.window.getmaxyx "Link to this definition")

返回窗口高度和宽度的元组 `(y, x)`。

window.getparyx()[¶](#curses.window.getparyx "Link to this definition")

将此窗口相对于父窗口的起始坐标作为元组 `(y, x)` 返回。 如果此窗口没有父窗口则返回 `(-1, -1)`。

window.getstr()[¶](#curses.window.getstr "Link to this definition")

window.getstr(_n_)

window.getstr(_y_, _x_)

window.getstr(_y_, _x_, _n_)

Read a line of input from the user, with primitive line editing capacity, after moving the cursor to _y_, _x_ if specified. Return it as a bytes object, in the encoding of the current locale and without the terminating newline. At most _n_ bytes are read; _n_ defaults to and cannot exceed 2047.

在 3.14 版本发生变更: The maximum value for _n_ was increased from 1023 to 2047.

window.getyx()[¶](#curses.window.getyx "Link to this definition")

返回当前光标相对于窗口左上角的位置的元组 `(y, x)`。

window.hline(_ch_, _n_\[, _attr_\])[¶](#curses.window.hline "Link to this definition")

window.hline(_y_, _x_, _ch_, _n_\[, _attr_\])

Display a horizontal line starting at `(y, x)` with length _n_ consisting of the character _ch_ with attributes _attr_. The line stops at the right edge of the window if fewer than _n_ cells are available.

window.idcok(_flag_)[¶](#curses.window.idcok "Link to this definition")

如果 _flag_ 为 `False`，curses 将不再考虑使用终端的硬件插入/删除字符功能；如果 _flag_ 为 `True`，则会启用字符插入和删除。 当 curses 首次初始化时，默认会启用字符插入/删除。

window.idlok(_flag_)[¶](#curses.window.idlok "Link to this definition")

If _flag_ is `True`, `curses` will try to use hardware line editing facilities. Otherwise, curses will not use them.

window.immedok(_flag_)[¶](#curses.window.immedok "Link to this definition")

如果 _flag_ 为 `True`，窗口图像中的任何改变都会自动导致窗口被刷新；你不必再自己调用 [`refresh()`](#curses.window.refresh "curses.window.refresh")。 但是，这可能会由于重复调用 wrefresh 而显著降低性能。 此选项默认被禁用。

window.inch(\[_y_, _x_\])[¶](#curses.window.inch "Link to this definition")

Return the character at the given position in the window. The bottom 8 bits are the character proper and the upper bits are the attributes; extract them with the [`A_CHARTEXT`](#curses.A_CHARTEXT "curses.A_CHARTEXT") and [`A_ATTRIBUTES`](#curses.A_ATTRIBUTES "curses.A_ATTRIBUTES") bit-masks, and the color pair with [`pair_number()`](#curses.pair_number "curses.pair_number"). The character byte is the locale-encoded byte of the cell's character, consistent with [`instr()`](#curses.window.instr "curses.window.instr"). On a wide-character build, a character that does not fit in a single byte in the current locale has a character byte of `0`; use `instr()` to read such characters.

window.insch(_ch_\[, _attr_\])[¶](#curses.window.insch "Link to this definition")

window.insch(_y_, _x_, _ch_\[, _attr_\])

Insert character _ch_ with attributes _attr_ before the character under the cursor, or at `(y, x)` if specified. All characters to the right of the cursor are shifted one position right, with the rightmost character on the line being lost. The cursor position does not change.

window.insdelln(_nlines_)[¶](#curses.window.insdelln "Link to this definition")

在指定窗口的当前行上方插入 _nlines_ 行。 下面的 _nlines_ 行将丢失。 对于 _nlines_ 为负值的情况，则从光标下方的行开始删除 _nlines_ 行，并将其余的行向上移动。 下面的 _nlines_ 行会被清空。 当前光标位置将保持不变。

window.insertln()[¶](#curses.window.insertln "Link to this definition")

在光标下方插入一个空行。 所有后续的行都会下移一行。

window.insnstr(_str_, _n_\[, _attr_\])[¶](#curses.window.insnstr "Link to this definition")

window.insnstr(_y_, _x_, _str_, _n_\[, _attr_\])

在光标下方的字符之前插入一个至多为 _n_ 个字符的字符串（字符数量将与该行相匹配）。 如果 _n_ 为零或负数，则插入整个字符串。 光标右边的所有字符将被右移，该行右端的字符将丢失。 光标位置将保持不变（在移到可能指定的 _y_, _x_ 之后）。

window.insstr(_str_\[, _attr_\])[¶](#curses.window.insstr "Link to this definition")

window.insstr(_y_, _x_, _str_\[, _attr_\])

在光标下方的字符之前插入一个字符串（字符数量将与该行相匹配）。 光标右边的所有字符将被右移，该行右端的字符将丢失。 光标位置将保持不变（在移到可能指定的 _y_, _x_ 之后）。

window.instr(\[_n_\])[¶](#curses.window.instr "Link to this definition")

window.instr(_y_, _x_\[, _n_\])

Read the text of the window from the current cursor position, or from _y_, _x_ if specified, to the end of the line, and return it as a bytes object, in the encoding of the current locale. Attributes and color pairs are stripped. At most _n_ bytes are read; _n_ defaults to and cannot exceed 2047.

在 3.14 版本发生变更: The maximum value for _n_ was increased from 1023 to 2047.

window.is\_linetouched(_line_)[¶](#curses.window.is_linetouched "Link to this definition")

如果指定的行自上次调用 [`refresh()`](#curses.window.refresh "curses.window.refresh") 后发生了改变则返回 `True`；否则返回 `False`。 如果 _line_ 对于给定的窗口不可用则会引发 [`curses.error`](#curses.error "curses.error") 异常。

window.is\_wintouched()[¶](#curses.window.is_wintouched "Link to this definition")

如果指定的窗口自上次调用 [`refresh()`](#curses.window.refresh "curses.window.refresh") 后发生了改变则返回 `True`；否则返回 `False`。

window.keypad(_flag_)[¶](#curses.window.keypad "Link to this definition")

If _flag_ is `True`, escape sequences generated by some keys (keypad, function keys) will be interpreted by `curses`. If _flag_ is `False`, escape sequences will be left as is in the input stream. Keypad mode is disabled by default, but [`wrapper()`](#curses.wrapper "curses.wrapper") enables it for the main window.

window.leaveok(_flag_)[¶](#curses.window.leaveok "Link to this definition")

If _flag_ is `True`, cursor is left where it is on update, instead of being at "cursor position." This reduces cursor movement where possible.

如果 _flag_ 为 `False`，光标在更新后将总是位于“光标位置”。

window.move(_new\_y_, _new\_x_)[¶](#curses.window.move "Link to this definition")

将光标移至 `(new_y, new_x)`。

window.mvderwin(_y_, _x_)[¶](#curses.window.mvderwin "Link to this definition")

让窗口在其父窗口内移动。 窗口相对于屏幕的参数不会被更改。 此例程用于在屏幕的相同物理位置显示父窗口的不同部分。

window.mvwin(_new\_y_, _new\_x_)[¶](#curses.window.mvwin "Link to this definition")

移动窗口以使其左上角位于 `(new_y, new_x)`。

Moving the window so that any part of it would be off the screen is an error: the window is not moved and [`curses.error`](#curses.error "curses.error") is raised.

window.nodelay(_flag_)[¶](#curses.window.nodelay "Link to this definition")

如果 _flag_ 为 `True`，则 [`getch()`](#curses.window.getch "curses.window.getch") 将为非阻塞的。

window.notimeout(_flag_)[¶](#curses.window.notimeout "Link to this definition")

如果 _flag_ 为 `True`，则转义序列将不会发生超时。

如果 _flag_ 为 `False`，则在几毫秒之后，转义序列将不会被解析，并将保持在输入流中的原样。

window.noutrefresh()[¶](#curses.window.noutrefresh "Link to this definition")

window.noutrefresh(_pminrow_, _pmincol_, _sminrow_, _smincol_, _smaxrow_, _smaxcol_)

标记为刷新但保持等待。 此函数会更新代表预期窗口状态的数据结构，但并不强制更新物理屏幕。 要完成后者，请调用 [`doupdate()`](#curses.doupdate "curses.doupdate")。

The 6 arguments can only be specified, and are then required, when the window is a pad created with [`newpad()`](#curses.newpad "curses.newpad"); they have the same meaning as for [`refresh()`](#curses.window.refresh "curses.window.refresh").

window.overlay(_destwin_\[, _sminrow_, _smincol_, _dminrow_, _dmincol_, _dmaxrow_, _dmaxcol_\])[¶](#curses.window.overlay "Link to this definition")

将窗口覆盖在 _destwin_ 上方。 窗口的大小不必相同，只有重叠的区域会被复制。 此复制是非破坏性的，这意味着当前背景字符不会覆盖掉 _destwin_ 的旧内容。

为了获得对被复制区域的细粒度控制，可以使用 [`overlay()`](#curses.window.overlay "curses.window.overlay") 的第二种形式。 _sminrow_ 和 _smincol_ 是源窗口的左上角坐标，而其他变量则在目标窗口中标记出一个矩形。

window.overwrite(_destwin_\[, _sminrow_, _smincol_, _dminrow_, _dmincol_, _dmaxrow_, _dmaxcol_\])[¶](#curses.window.overwrite "Link to this definition")

将窗口覆盖在 _destwin_ 上方。 窗口的大小不必相同，此时只有重叠的区域会被复制。 此复制是破坏性的，这意味着当前背景字符会覆盖掉 _destwin_ 的旧内容。

为了获得对被复制区域的细粒度控制，可以使用 [`overwrite()`](#curses.window.overwrite "curses.window.overwrite") 的第二种形式。 _sminrow_ 和 _smincol_ 是源窗口的左上角坐标，而其他变量则在目标窗口中标记出一个矩形。

window.putwin(_file_)[¶](#curses.window.putwin "Link to this definition")

将关联到窗口的所有数据写入到所提供的文件对象。 此信息可在以后使用 [`getwin()`](#curses.getwin "curses.getwin") 函数来提取。

window.redrawln(_beg_, _num_)[¶](#curses.window.redrawln "Link to this definition")

指明从 _beg_ 行开始的 _num_ 个屏幕行已被破坏并且应当在下次 [`refresh()`](#curses.window.refresh "curses.window.refresh") 调用时完全重绘。

window.redrawwin()[¶](#curses.window.redrawwin "Link to this definition")

触碰整个窗口，以使其在下次 [`refresh()`](#curses.window.refresh "curses.window.refresh") 调用时完全重绘。

window.refresh(\[_pminrow_, _pmincol_, _sminrow_, _smincol_, _smaxrow_, _smaxcol_\])[¶](#curses.window.refresh "Link to this definition")

立即更新显示（将实际屏幕与之前的绘制/删除方法进行同步）。

The 6 arguments can only be specified, and are then required, when the window is a pad created with [`newpad()`](#curses.newpad "curses.newpad"). The additional parameters are needed to indicate what part of the pad and screen are involved. _pminrow_ and _pmincol_ specify the upper-left corner of the rectangle to be displayed in the pad. _sminrow_, _smincol_, _smaxrow_, and _smaxcol_ specify the edges of the rectangle to be displayed on the screen. The lower-right corner of the rectangle to be displayed in the pad is calculated from the screen coordinates, since the rectangles must be the same size. Both rectangles must be entirely contained within their respective structures. Negative values of _pminrow_, _pmincol_, _sminrow_, or _smincol_ are treated as if they were zero.

window.resize(_nlines_, _ncols_)[¶](#curses.window.resize "Link to this definition")

为 curses 窗口重新分配存储空间以将其尺寸调整为指定的值。 如果任一维度的尺寸大于当前值，则窗口的数据将以具有合并了当前背景渲染（由 [`bkgdset()`](#curses.window.bkgdset "curses.window.bkgdset") 设置）的空白来填充。

window.scroll(\[_lines=1_\])[¶](#curses.window.scroll "Link to this definition")

Scroll the screen or scrolling region. Scroll upward by _lines_ lines if _lines_ is positive, or downward if it is negative. Scrolling has no effect unless it has been enabled for the window with [`scrollok()`](#curses.window.scrollok "curses.window.scrollok").

window.scrollok(_flag_)[¶](#curses.window.scrollok "Link to this definition")

控制当一个窗口的光标移出窗口或滚动区域边缘时会发生什么，这可能是在底端行执行换行操作，或者在最后一行输入最后一个字符导致的结果。 如果 _flag_ 为 `False`，光标会留在底端行。 如果 _flag_ 为 `True`，窗口会向上滚动一行。 请注意为了在终端上获得实际的滚动效果，还需要调用 [`idlok()`](#curses.window.idlok "curses.window.idlok")。

window.setscrreg(_top_, _bottom_)[¶](#curses.window.setscrreg "Link to this definition")

设置从 _top_ 行至 _bottom_ 行的滚动区域。 所有滚动操作将在此区域中进行。

window.standend()[¶](#curses.window.standend "Link to this definition")

关闭 standout 属性。 在某些终端上此操作会有关闭所有属性的副作用。

window.standout()[¶](#curses.window.standout "Link to this definition")

启用属性 _A\_STANDOUT_。

window.subpad(_begin\_y_, _begin\_x_)[¶](#curses.window.subpad "Link to this definition")

window.subpad(_nlines_, _ncols_, _begin\_y_, _begin\_x_)

Return a sub-pad, whose upper-left corner is at `(begin_y, begin_x)`, and whose width/height is _ncols_/_nlines_. The coordinates are relative to the parent pad (unlike [`subwin()`](#curses.window.subwin "curses.window.subwin"), which uses screen coordinates). This method is only available for pads created with [`newpad()`](#curses.newpad "curses.newpad").

window.subwin(_begin\_y_, _begin\_x_)[¶](#curses.window.subwin "Link to this definition")

window.subwin(_nlines_, _ncols_, _begin\_y_, _begin\_x_)

Return a sub-window, whose upper-left corner is at the screen-relative coordinates `(begin_y, begin_x)`, and whose width/height is _ncols_/_nlines_.

默认情况下，子窗口将从指定位置扩展到窗口的右下角。

window.syncdown()[¶](#curses.window.syncdown "Link to this definition")

触碰已在上级窗口上被触碰的每个位置。 此例程由 [`refresh()`](#curses.window.refresh "curses.window.refresh") 调用，因此几乎从不需要手动调用。

window.syncok(_flag_)[¶](#curses.window.syncok "Link to this definition")

如果 _flag_ 为 `True`，则 [`syncup()`](#curses.window.syncup "curses.window.syncup") 会在窗口发生改变的任何时候自动被调用。

window.syncup()[¶](#curses.window.syncup "Link to this definition")

触碰已在窗口中被改变的此窗口的各个上级窗口中的所有位置。

window.timeout(_delay_)[¶](#curses.window.timeout "Link to this definition")

为窗口设置阻塞或非阻塞读取行为。 如果 _delay_ 为负值，则会使用阻塞读取（这将无限期地等待输入）。 如果 _delay_ 为零，则会使用非阻塞读取，并且当没有输入在等待时 [`getch()`](#curses.window.getch "curses.window.getch") 将返回 `-1`。 如果 _delay_ 为正值，则 `getch()` 将阻塞 _delay_ 毫秒，并且当此延时结束时仍无输入将返回 `-1`。

window.touchline(_start_, _count_\[, _changed_\])[¶](#curses.window.touchline "Link to this definition")

假定从行 _start_ 开始的 _count_ 行已被更改。 如果提供了 _changed_，它将指明是将受影响的行标记为已更改 (_changed_`=True`) 还是未更改 (_changed_`=False`)。

window.touchwin()[¶](#curses.window.touchwin "Link to this definition")

假定整个窗口已被更改，其目的是用于绘制优化。

window.untouchwin()[¶](#curses.window.untouchwin "Link to this definition")

将自上次调用 [`refresh()`](#curses.window.refresh "curses.window.refresh") 以来窗口中的所有行标记为未改变。

window.vline(_ch_, _n_\[, _attr_\])[¶](#curses.window.vline "Link to this definition")

window.vline(_y_, _x_, _ch_, _n_\[, _attr_\])

显示一行起始于 `(y, x)` 长度为 _n_ 的由具有属性 _attr_ 的字符 _ch_ 组成的垂直线。

## 常量[¶](#constants "Link to this heading")

`curses` 模块定义了下列数据成员：

curses.ERR[¶](#curses.ERR "Link to this definition")

一些返回整数的 curses 例程，例如 [`getch()`](#curses.window.getch "curses.window.getch")，在失败时将返回 [`ERR`](#curses.ERR "curses.ERR")。

curses.OK[¶](#curses.OK "Link to this definition")

一些返回整数的 curses 例程，例如 [`napms()`](#curses.napms "curses.napms")，在成功时将返回 [`OK`](#curses.OK "curses.OK")。

curses.version[¶](#curses.version "Link to this definition")

一个代表模块当前版本的字节串对象。

curses.ncurses\_version[¶](#curses.ncurses_version "Link to this definition")

一个具名元组，它包含构成 ncurses 库版本号的三个数字: _major_, _minor_ 和 _patch_。 三个值均为整数。 三个值也可通过名称来访问，因此 `curses.ncurses_version[0]` 等价于 `curses.ncurses_version.major`，依此类推。

可用性：如果使用了 ncurses 库。

Added in version 3.8.

curses.COLORS[¶](#curses.COLORS "Link to this definition")

终端可支持的最大颜色数。 它只有在调用 [`start_color()`](#curses.start_color "curses.start_color") 之后才会被定义。

curses.COLOR\_PAIRS[¶](#curses.COLOR_PAIRS "Link to this definition")

终端可支持的最大颜色对数。 它只有在调用 [`start_color()`](#curses.start_color "curses.start_color") 之后才会被定义。

curses.COLS[¶](#curses.COLS "Link to this definition")

The width of the screen, that is, the number of columns. It is defined only after the call to [`initscr()`](#curses.initscr "curses.initscr"). Updated by [`update_lines_cols()`](#curses.update_lines_cols "curses.update_lines_cols"), [`resizeterm()`](#curses.resizeterm "curses.resizeterm") and [`resize_term()`](#curses.resize_term "curses.resize_term").

curses.LINES[¶](#curses.LINES "Link to this definition")

The height of the screen, that is, the number of lines. It is defined only after the call to [`initscr()`](#curses.initscr "curses.initscr"). Updated by [`update_lines_cols()`](#curses.update_lines_cols "curses.update_lines_cols"), [`resizeterm()`](#curses.resizeterm "curses.resizeterm") and [`resize_term()`](#curses.resize_term "curses.resize_term").

有些常量可用于指定字符单元属性。 实际可用的常量取决于具体的系统。

| 
属性

 | 

含意

 |
| --- | --- |
| 

curses.A\_ALTCHARSET[¶](#curses.A_ALTCHARSET "Link to this definition")



 | 

备用字符集模式

 |
| 

curses.A\_BLINK[¶](#curses.A_BLINK "Link to this definition")



 | 

闪烁模式

 |
| 

curses.A\_BOLD[¶](#curses.A_BOLD "Link to this definition")



 | 

粗体模式

 |
| 

curses.A\_DIM[¶](#curses.A_DIM "Link to this definition")



 | 

暗淡模式

 |
| 

curses.A\_INVIS[¶](#curses.A_INVIS "Link to this definition")



 | 

不可见或空白模式

 |
| 

curses.A\_ITALIC[¶](#curses.A_ITALIC "Link to this definition")



 | 

斜体模式

 |
| 

curses.A\_NORMAL[¶](#curses.A_NORMAL "Link to this definition")



 | 

正常属性

 |
| 

curses.A\_PROTECT[¶](#curses.A_PROTECT "Link to this definition")



 | 

保护模式

 |
| 

curses.A\_REVERSE[¶](#curses.A_REVERSE "Link to this definition")



 | 

反转背景色和前景色

 |
| 

curses.A\_STANDOUT[¶](#curses.A_STANDOUT "Link to this definition")



 | 

突出模式

 |
| 

curses.A\_UNDERLINE[¶](#curses.A_UNDERLINE "Link to this definition")



 | 

下划线模式

 |
| 

curses.A\_HORIZONTAL[¶](#curses.A_HORIZONTAL "Link to this definition")



 | 

水平突出显示

 |
| 

curses.A\_LEFT[¶](#curses.A_LEFT "Link to this definition")



 | 

左高亮

 |
| 

curses.A\_LOW[¶](#curses.A_LOW "Link to this definition")



 | 

底部高亮

 |
| 

curses.A\_RIGHT[¶](#curses.A_RIGHT "Link to this definition")



 | 

右高亮

 |
| 

curses.A\_TOP[¶](#curses.A_TOP "Link to this definition")



 | 

顶部高亮

 |
| 

curses.A\_VERTICAL[¶](#curses.A_VERTICAL "Link to this definition")



 | 

垂直突出显示

 |

Added in version 3.7: 新增 `A_ITALIC`。

有几个常量可用于提取某些方法返回的相应属性。

| 
位掩码

 | 

含意

 |
| --- | --- |
| 

curses.A\_ATTRIBUTES[¶](#curses.A_ATTRIBUTES "Link to this definition")



 | 

用于提取属性的位掩码

 |
| 

curses.A\_CHARTEXT[¶](#curses.A_CHARTEXT "Link to this definition")



 | 

用于提取字符的位掩码

 |
| 

curses.A\_COLOR[¶](#curses.A_COLOR "Link to this definition")



 | 

用于提取颜色对字段信息的位掩码

 |

键由名称以 `KEY_` 开头的整数常量引用。确切的可用键取决于系统。

| 
键常量

 | 

键

 |
| --- | --- |
| 

curses.KEY\_MIN[¶](#curses.KEY_MIN "Link to this definition")



 | 

最小键值

 |
| 

curses.KEY\_BREAK[¶](#curses.KEY_BREAK "Link to this definition")



 | 

中断键（不可靠）

 |
| 

curses.KEY\_DOWN[¶](#curses.KEY_DOWN "Link to this definition")



 | 

向下箭头

 |
| 

curses.KEY\_UP[¶](#curses.KEY_UP "Link to this definition")



 | 

向上箭头

 |
| 

curses.KEY\_LEFT[¶](#curses.KEY_LEFT "Link to this definition")



 | 

向左箭头

 |
| 

curses.KEY\_RIGHT[¶](#curses.KEY_RIGHT "Link to this definition")



 | 

向右箭头

 |
| 

curses.KEY\_HOME[¶](#curses.KEY_HOME "Link to this definition")



 | 

Home 键 (上+左箭头)

 |
| 

curses.KEY\_BACKSPACE[¶](#curses.KEY_BACKSPACE "Link to this definition")



 | 

退格（不可靠）

 |
| 

curses.KEY\_F0[¶](#curses.KEY_F0 "Link to this definition")



 | 

功能键。 支持至多 64 个功能键。

 |
| 

curses.KEY\_Fn[¶](#curses.KEY_Fn "Link to this definition")



 | 

功能键 _n_ 的值

 |
| 

curses.KEY\_DL[¶](#curses.KEY_DL "Link to this definition")



 | 

删除行

 |
| 

curses.KEY\_IL[¶](#curses.KEY_IL "Link to this definition")



 | 

插入行

 |
| 

curses.KEY\_DC[¶](#curses.KEY_DC "Link to this definition")



 | 

删除字符

 |
| 

curses.KEY\_IC[¶](#curses.KEY_IC "Link to this definition")



 | 

插入字符或进入插入模式

 |
| 

curses.KEY\_EIC[¶](#curses.KEY_EIC "Link to this definition")



 | 

退出插入字符模式

 |
| 

curses.KEY\_CLEAR[¶](#curses.KEY_CLEAR "Link to this definition")



 | 

清空屏幕

 |
| 

curses.KEY\_EOS[¶](#curses.KEY_EOS "Link to this definition")



 | 

清空至屏幕底部

 |
| 

curses.KEY\_EOL[¶](#curses.KEY_EOL "Link to this definition")



 | 

清空至行尾

 |
| 

curses.KEY\_SF[¶](#curses.KEY_SF "Link to this definition")



 | 

向前滚动 1 行

 |
| 

curses.KEY\_SR[¶](#curses.KEY_SR "Link to this definition")



 | 

向后滚动 1 行 (反转)

 |
| 

curses.KEY\_NPAGE[¶](#curses.KEY_NPAGE "Link to this definition")



 | 

下一页

 |
| 

curses.KEY\_PPAGE[¶](#curses.KEY_PPAGE "Link to this definition")



 | 

上一页

 |
| 

curses.KEY\_STAB[¶](#curses.KEY_STAB "Link to this definition")



 | 

设置制表符

 |
| 

curses.KEY\_CTAB[¶](#curses.KEY_CTAB "Link to this definition")



 | 

清除制表符

 |
| 

curses.KEY\_CATAB[¶](#curses.KEY_CATAB "Link to this definition")



 | 

清除所有制表符

 |
| 

curses.KEY\_ENTER[¶](#curses.KEY_ENTER "Link to this definition")



 | 

回车或发送 (不可靠)

 |
| 

curses.KEY\_SRESET[¶](#curses.KEY_SRESET "Link to this definition")



 | 

软 (部分) 重置 (不可靠)

 |
| 

curses.KEY\_RESET[¶](#curses.KEY_RESET "Link to this definition")



 | 

重置或硬重置 (不可靠)

 |
| 

curses.KEY\_PRINT[¶](#curses.KEY_PRINT "Link to this definition")



 | 

打印

 |
| 

curses.KEY\_LL[¶](#curses.KEY_LL "Link to this definition")



 | 

Home 向下或到底 (左下)

 |
| 

curses.KEY\_A1[¶](#curses.KEY_A1 "Link to this definition")



 | 

键盘的左上角

 |
| 

curses.KEY\_A3[¶](#curses.KEY_A3 "Link to this definition")



 | 

键盘的右上角

 |
| 

curses.KEY\_B2[¶](#curses.KEY_B2 "Link to this definition")



 | 

键盘的中心

 |
| 

curses.KEY\_C1[¶](#curses.KEY_C1 "Link to this definition")



 | 

键盘左下方

 |
| 

curses.KEY\_C3[¶](#curses.KEY_C3 "Link to this definition")



 | 

键盘右下方

 |
| 

curses.KEY\_BTAB[¶](#curses.KEY_BTAB "Link to this definition")



 | 

回退制表符

 |
| 

curses.KEY\_BEG[¶](#curses.KEY_BEG "Link to this definition")



 | 

Beg (开始)

 |
| 

curses.KEY\_CANCEL[¶](#curses.KEY_CANCEL "Link to this definition")



 | 

取消

 |
| 

curses.KEY\_CLOSE[¶](#curses.KEY_CLOSE "Link to this definition")



 | 

关闭

 |
| 

curses.KEY\_COMMAND[¶](#curses.KEY_COMMAND "Link to this definition")



 | 

Cmd (命令行)

 |
| 

curses.KEY\_COPY[¶](#curses.KEY_COPY "Link to this definition")



 | 

复制

 |
| 

curses.KEY\_CREATE[¶](#curses.KEY_CREATE "Link to this definition")



 | 

创建

 |
| 

curses.KEY\_END[¶](#curses.KEY_END "Link to this definition")



 | 

End

 |
| 

curses.KEY\_EXIT[¶](#curses.KEY_EXIT "Link to this definition")



 | 

退出

 |
| 

curses.KEY\_FIND[¶](#curses.KEY_FIND "Link to this definition")



 | 

查找

 |
| 

curses.KEY\_HELP[¶](#curses.KEY_HELP "Link to this definition")



 | 

帮助

 |
| 

curses.KEY\_MARK[¶](#curses.KEY_MARK "Link to this definition")



 | 

标记

 |
| 

curses.KEY\_MESSAGE[¶](#curses.KEY_MESSAGE "Link to this definition")



 | 

消息

 |
| 

curses.KEY\_MOVE[¶](#curses.KEY_MOVE "Link to this definition")



 | 

移动

 |
| 

curses.KEY\_NEXT[¶](#curses.KEY_NEXT "Link to this definition")



 | 

下一个

 |
| 

curses.KEY\_OPEN[¶](#curses.KEY_OPEN "Link to this definition")



 | 

打开

 |
| 

curses.KEY\_OPTIONS[¶](#curses.KEY_OPTIONS "Link to this definition")



 | 

选项

 |
| 

curses.KEY\_PREVIOUS[¶](#curses.KEY_PREVIOUS "Link to this definition")



 | 

Prev (上一个)

 |
| 

curses.KEY\_REDO[¶](#curses.KEY_REDO "Link to this definition")



 | 

重做

 |
| 

curses.KEY\_REFERENCE[¶](#curses.KEY_REFERENCE "Link to this definition")



 | 

Ref (引用)

 |
| 

curses.KEY\_REFRESH[¶](#curses.KEY_REFRESH "Link to this definition")



 | 

刷新

 |
| 

curses.KEY\_REPLACE[¶](#curses.KEY_REPLACE "Link to this definition")



 | 

替换

 |
| 

curses.KEY\_RESTART[¶](#curses.KEY_RESTART "Link to this definition")



 | 

重启

 |
| 

curses.KEY\_RESUME[¶](#curses.KEY_RESUME "Link to this definition")



 | 

恢复

 |
| 

curses.KEY\_SAVE[¶](#curses.KEY_SAVE "Link to this definition")



 | 

保存

 |
| 

curses.KEY\_SBEG[¶](#curses.KEY_SBEG "Link to this definition")



 | 

Shift + Beg (开始)

 |
| 

curses.KEY\_SCANCEL[¶](#curses.KEY_SCANCEL "Link to this definition")



 | 

Shift + Cancel

 |
| 

curses.KEY\_SCOMMAND[¶](#curses.KEY_SCOMMAND "Link to this definition")



 | 

Shift + Command

 |
| 

curses.KEY\_SCOPY[¶](#curses.KEY_SCOPY "Link to this definition")



 | 

Shift + Copy

 |
| 

curses.KEY\_SCREATE[¶](#curses.KEY_SCREATE "Link to this definition")



 | 

Shift + Create

 |
| 

curses.KEY\_SDC[¶](#curses.KEY_SDC "Link to this definition")



 | 

Shift + 删除字符

 |
| 

curses.KEY\_SDL[¶](#curses.KEY_SDL "Link to this definition")



 | 

Shift + 删除行

 |
| 

curses.KEY\_SELECT[¶](#curses.KEY_SELECT "Link to this definition")



 | 

选择

 |
| 

curses.KEY\_SEND[¶](#curses.KEY_SEND "Link to this definition")



 | 

Shift + End

 |
| 

curses.KEY\_SEOL[¶](#curses.KEY_SEOL "Link to this definition")



 | 

Shift + 清空行

 |
| 

curses.KEY\_SEXIT[¶](#curses.KEY_SEXIT "Link to this definition")



 | 

Shift + 退出

 |
| 

curses.KEY\_SFIND[¶](#curses.KEY_SFIND "Link to this definition")



 | 

Shift + 查找

 |
| 

curses.KEY\_SHELP[¶](#curses.KEY_SHELP "Link to this definition")



 | 

Shift + 帮助

 |
| 

curses.KEY\_SHOME[¶](#curses.KEY_SHOME "Link to this definition")



 | 

Shift + Home

 |
| 

curses.KEY\_SIC[¶](#curses.KEY_SIC "Link to this definition")



 | 

Shift + 输入

 |
| 

curses.KEY\_SLEFT[¶](#curses.KEY_SLEFT "Link to this definition")



 | 

Shift + 向左箭头

 |
| 

curses.KEY\_SMESSAGE[¶](#curses.KEY_SMESSAGE "Link to this definition")



 | 

Shift + 消息

 |
| 

curses.KEY\_SMOVE[¶](#curses.KEY_SMOVE "Link to this definition")



 | 

Shift + 移动

 |
| 

curses.KEY\_SNEXT[¶](#curses.KEY_SNEXT "Link to this definition")



 | 

Shift + 下一个

 |
| 

curses.KEY\_SOPTIONS[¶](#curses.KEY_SOPTIONS "Link to this definition")



 | 

Shift + 选项

 |
| 

curses.KEY\_SPREVIOUS[¶](#curses.KEY_SPREVIOUS "Link to this definition")



 | 

Shift + 上一个

 |
| 

curses.KEY\_SPRINT[¶](#curses.KEY_SPRINT "Link to this definition")



 | 

Shift + 打印

 |
| 

curses.KEY\_SREDO[¶](#curses.KEY_SREDO "Link to this definition")



 | 

Shift + 重做

 |
| 

curses.KEY\_SREPLACE[¶](#curses.KEY_SREPLACE "Link to this definition")



 | 

Shift + 替换

 |
| 

curses.KEY\_SRIGHT[¶](#curses.KEY_SRIGHT "Link to this definition")



 | 

Shift + 向右箭头

 |
| 

curses.KEY\_SRSUME[¶](#curses.KEY_SRSUME "Link to this definition")



 | 

Shift + 恢复

 |
| 

curses.KEY\_SSAVE[¶](#curses.KEY_SSAVE "Link to this definition")



 | 

Shift + 保存

 |
| 

curses.KEY\_SSUSPEND[¶](#curses.KEY_SSUSPEND "Link to this definition")



 | 

Shift + 挂起

 |
| 

curses.KEY\_SUNDO[¶](#curses.KEY_SUNDO "Link to this definition")



 | 

Shift + 撤销

 |
| 

curses.KEY\_SUSPEND[¶](#curses.KEY_SUSPEND "Link to this definition")



 | 

挂起

 |
| 

curses.KEY\_UNDO[¶](#curses.KEY_UNDO "Link to this definition")



 | 

撤销操作

 |
| 

curses.KEY\_MOUSE[¶](#curses.KEY_MOUSE "Link to this definition")



 | 

鼠标事件已发生

 |
| 

curses.KEY\_RESIZE[¶](#curses.KEY_RESIZE "Link to this definition")



 | 

终端大小改变事件

 |
| 

curses.KEY\_MAX[¶](#curses.KEY_MAX "Link to this definition")



 | 

最大键值

 |

在 VT100s 及其软件模拟器，如 X 终端模拟器上，通常至少有四个功能键 ([`KEY_F1`](#curses.KEY_Fn "curses.KEY_Fn"), `KEY_F2`, `KEY_F3`, `KEY_F4`) 可用，并且方向键将明确地映射到 [`KEY_UP`](#curses.KEY_UP "curses.KEY_UP"), [`KEY_DOWN`](#curses.KEY_DOWN "curses.KEY_DOWN"), [`KEY_LEFT`](#curses.KEY_LEFT "curses.KEY_LEFT") 和 [`KEY_RIGHT`](#curses.KEY_RIGHT "curses.KEY_RIGHT")。 如果你的机器有一个 PC 键盘，则保证能使用方向键和十二个功能键 (老式的 PC 键盘可能只有十个功能键)；此外，还有以下的标准小键盘映射:

| 
键帽

 | 

常量

 |
| --- | --- |
| 

Insert

 | 

KEY\_IC

 |
| 

Delete

 | 

KEY\_DC

 |
| 

Home

 | 

KEY\_HOME

 |
| 

End

 | 

KEY\_END

 |
| 

Page Up

 | 

KEY\_PPAGE

 |
| 

Page Down

 | 

KEY\_NPAGE

 |

下表列出了替代字符集中的字符。 这些字符继承自 VT100 终端，在 X 终端等软件模拟器上通常均为可用。 当没有可用的图形时，curses 会回退为粗糙的可打印 ASCII 近似符号。

备注

只有在调用 [`initscr()`](#curses.initscr "curses.initscr") 之后才能使用它们

| 
ACS代码

 | 

含意

 |
| --- | --- |
| 

curses.ACS\_BBSS[¶](#curses.ACS_BBSS "Link to this definition")



 | 

右上角的别名

 |
| 

curses.ACS\_BLOCK[¶](#curses.ACS_BLOCK "Link to this definition")



 | 

实心方块

 |
| 

curses.ACS\_BOARD[¶](#curses.ACS_BOARD "Link to this definition")



 | 

正方形

 |
| 

curses.ACS\_BSBS[¶](#curses.ACS_BSBS "Link to this definition")



 | 

水平线的别名

 |
| 

curses.ACS\_BSSB[¶](#curses.ACS_BSSB "Link to this definition")



 | 

alternate name for upper-left corner

 |
| 

curses.ACS\_BSSS[¶](#curses.ACS_BSSS "Link to this definition")



 | 

顶部 T 型的别名

 |
| 

curses.ACS\_BTEE[¶](#curses.ACS_BTEE "Link to this definition")



 | 

底部 T 型

 |
| 

curses.ACS\_BULLET[¶](#curses.ACS_BULLET "Link to this definition")



 | 

正方形

 |
| 

curses.ACS\_CKBOARD[¶](#curses.ACS_CKBOARD "Link to this definition")



 | 

棋盘（点刻）

 |
| 

curses.ACS\_DARROW[¶](#curses.ACS_DARROW "Link to this definition")



 | 

向下箭头

 |
| 

curses.ACS\_DEGREE[¶](#curses.ACS_DEGREE "Link to this definition")



 | 

度数符号

 |
| 

curses.ACS\_DIAMOND[¶](#curses.ACS_DIAMOND "Link to this definition")



 | 

菱形

 |
| 

curses.ACS\_GEQUAL[¶](#curses.ACS_GEQUAL "Link to this definition")



 | 

大于或等于

 |
| 

curses.ACS\_HLINE[¶](#curses.ACS_HLINE "Link to this definition")



 | 

水平线

 |
| 

curses.ACS\_LANTERN[¶](#curses.ACS_LANTERN "Link to this definition")



 | 

灯形符号

 |
| 

curses.ACS\_LARROW[¶](#curses.ACS_LARROW "Link to this definition")



 | 

向左箭头

 |
| 

curses.ACS\_LEQUAL[¶](#curses.ACS_LEQUAL "Link to this definition")



 | 

小于或等于

 |
| 

curses.ACS\_LLCORNER[¶](#curses.ACS_LLCORNER "Link to this definition")



 | 

左下角

 |
| 

curses.ACS\_LRCORNER[¶](#curses.ACS_LRCORNER "Link to this definition")



 | 

右下角

 |
| 

curses.ACS\_LTEE[¶](#curses.ACS_LTEE "Link to this definition")



 | 

左侧 T 型

 |
| 

curses.ACS\_NEQUAL[¶](#curses.ACS_NEQUAL "Link to this definition")



 | 

不等号

 |
| 

curses.ACS\_PI[¶](#curses.ACS_PI "Link to this definition")



 | 

字母π

 |
| 

curses.ACS\_PLMINUS[¶](#curses.ACS_PLMINUS "Link to this definition")



 | 

正负号

 |
| 

curses.ACS\_PLUS[¶](#curses.ACS_PLUS "Link to this definition")



 | 

加号

 |
| 

curses.ACS\_RARROW[¶](#curses.ACS_RARROW "Link to this definition")



 | 

向右箭头

 |
| 

curses.ACS\_RTEE[¶](#curses.ACS_RTEE "Link to this definition")



 | 

右侧 T 型

 |
| 

curses.ACS\_S1[¶](#curses.ACS_S1 "Link to this definition")



 | 

扫描线 1

 |
| 

curses.ACS\_S3[¶](#curses.ACS_S3 "Link to this definition")



 | 

扫描线3

 |
| 

curses.ACS\_S7[¶](#curses.ACS_S7 "Link to this definition")



 | 

扫描线7

 |
| 

curses.ACS\_S9[¶](#curses.ACS_S9 "Link to this definition")



 | 

扫描线 9

 |
| 

curses.ACS\_SBBS[¶](#curses.ACS_SBBS "Link to this definition")



 | 

alternate name for lower-right corner

 |
| 

curses.ACS\_SBSB[¶](#curses.ACS_SBSB "Link to this definition")



 | 

垂直线的别名

 |
| 

curses.ACS\_SBSS[¶](#curses.ACS_SBSS "Link to this definition")



 | 

右侧 T 型的别名

 |
| 

curses.ACS\_SSBB[¶](#curses.ACS_SSBB "Link to this definition")



 | 

alternate name for lower-left corner

 |
| 

curses.ACS\_SSBS[¶](#curses.ACS_SSBS "Link to this definition")



 | 

底部 T 型的别名

 |
| 

curses.ACS\_SSSB[¶](#curses.ACS_SSSB "Link to this definition")



 | 

左侧 T 型的别名

 |
| 

curses.ACS\_SSSS[¶](#curses.ACS_SSSS "Link to this definition")



 | 

交叉或大加号的替代名称

 |
| 

curses.ACS\_STERLING[¶](#curses.ACS_STERLING "Link to this definition")



 | 

英镑

 |
| 

curses.ACS\_TTEE[¶](#curses.ACS_TTEE "Link to this definition")



 | 

顶部 T 型

 |
| 

curses.ACS\_UARROW[¶](#curses.ACS_UARROW "Link to this definition")



 | 

向上箭头

 |
| 

curses.ACS\_ULCORNER[¶](#curses.ACS_ULCORNER "Link to this definition")



 | 

upper-left corner

 |
| 

curses.ACS\_URCORNER[¶](#curses.ACS_URCORNER "Link to this definition")



 | 

upper-right corner

 |
| 

curses.ACS\_VLINE[¶](#curses.ACS_VLINE "Link to this definition")



 | 

垂线

 |

下面列出了 [`getmouse()`](#curses.getmouse "curses.getmouse") 所使用的鼠标按键常量:

| 
鼠标按键常量

 | 

含意

 |
| --- | --- |
| 

curses.BUTTONn\_PRESSED[¶](#curses.BUTTONn_PRESSED "Link to this definition")



 | 

鼠标按键 _n_ 被按下

 |
| 

curses.BUTTONn\_RELEASED[¶](#curses.BUTTONn_RELEASED "Link to this definition")



 | 

鼠标按键 _n_ 被释放

 |
| 

curses.BUTTONn\_CLICKED[¶](#curses.BUTTONn_CLICKED "Link to this definition")



 | 

鼠标按键 _n_ 被点击

 |
| 

curses.BUTTONn\_DOUBLE\_CLICKED[¶](#curses.BUTTONn_DOUBLE_CLICKED "Link to this definition")



 | 

鼠标按键 _n_ 被双击

 |
| 

curses.BUTTONn\_TRIPLE\_CLICKED[¶](#curses.BUTTONn_TRIPLE_CLICKED "Link to this definition")



 | 

鼠标按键 _n_ 被三击

 |
| 

curses.BUTTON\_SHIFT[¶](#curses.BUTTON_SHIFT "Link to this definition")



 | 

当按键状态改变时 Shift 被按下

 |
| 

curses.BUTTON\_CTRL[¶](#curses.BUTTON_CTRL "Link to this definition")



 | 

当按键状态改变时 Control 被按下

 |
| 

curses.BUTTON\_ALT[¶](#curses.BUTTON_ALT "Link to this definition")



 | 

Alt was down during button state change

 |

在 3.10 版本发生变更: 现在 `BUTTON5_*` 常量如果是由下层 curses 库提供的则会对外公开。

下表列出了预定义的颜色：

| 
常量

 | 

颜色

 |
| --- | --- |
| 

curses.COLOR\_BLACK[¶](#curses.COLOR_BLACK "Link to this definition")



 | 

黑色

 |
| 

curses.COLOR\_BLUE[¶](#curses.COLOR_BLUE "Link to this definition")



 | 

蓝色

 |
| 

curses.COLOR\_CYAN[¶](#curses.COLOR_CYAN "Link to this definition")



 | 

青色（浅绿蓝色）

 |
| 

curses.COLOR\_GREEN[¶](#curses.COLOR_GREEN "Link to this definition")



 | 

绿色

 |
| 

curses.COLOR\_MAGENTA[¶](#curses.COLOR_MAGENTA "Link to this definition")



 | 

洋红色（紫红色）

 |
| 

curses.COLOR\_RED[¶](#curses.COLOR_RED "Link to this definition")



 | 

红色

 |
| 

curses.COLOR\_WHITE[¶](#curses.COLOR_WHITE "Link to this definition")



 | 

白色

 |
| 

curses.COLOR\_YELLOW[¶](#curses.COLOR_YELLOW "Link to this definition")



 | 

黄色

 |

## `curses.textpad` --- Text input widget for curses programs[¶](#module-curses.textpad "Link to this heading")

The `curses.textpad` module provides a [`Textbox`](#curses.textpad.Textbox "curses.textpad.Textbox") class that handles elementary text editing in a curses window, supporting a set of keybindings resembling those of Emacs (thus, also of Netscape Navigator, BBedit 6.x, FrameMaker, and many other programs). The module also provides a rectangle-drawing function useful for framing text boxes or for other purposes.

The module `curses.textpad` defines the following function:

curses.textpad.rectangle(_win_, _uly_, _ulx_, _lry_, _lrx_)[¶](#curses.textpad.rectangle "Link to this definition")

Draw a rectangle. The first argument must be a window object; the remaining arguments are coordinates relative to that window. The second and third arguments are the y and x coordinates of the upper-left corner of the rectangle to be drawn; the fourth and fifth arguments are the y and x coordinates of the lower-right corner. The rectangle will be drawn using VT100/IBM PC forms characters on terminals that make this possible (including xterm and most other software terminal emulators). Otherwise it will be drawn with ASCII dashes, vertical bars, and plus signs.

## 文本框对象[¶](#textbox-objects "Link to this heading")

你可以通过如下方式实例化一个 [`Textbox`](#curses.textpad.Textbox "curses.textpad.Textbox"):

_class_ curses.textpad.Textbox(_win_, _insert\_mode\=False_)[¶](#curses.textpad.Textbox "Link to this definition")

Return a textbox widget object. The _win_ argument should be a curses [window](#curses-window-objects) object in which the textbox is to be contained. If _insert\_mode_ is true, the textbox inserts typed characters, shifting existing text to the right, rather than overwriting it. The edit cursor of the textbox is initially located at the upper-left corner of the containing window, with coordinates `(0, 0)`. The instance's [`stripspaces`](#curses.textpad.Textbox.stripspaces "curses.textpad.Textbox.stripspaces") flag is initially on.

[`Textbox`](#curses.textpad.Textbox "curses.textpad.Textbox") 对象具有以下方法:

edit(_validate\=None_)[¶](#curses.textpad.Textbox.edit "Link to this definition")

This is the entry point you will normally use. It accepts editing keystrokes until one of the termination keystrokes is entered. If _validate_ is supplied, it must be a function. It will be called for each keystroke entered with the keystroke as a parameter; command dispatch is done on the result. If it returns a false value, the keystroke is ignored. This method returns the window contents as a string; whether blanks in the window are included is affected by the [`stripspaces`](#curses.textpad.Textbox.stripspaces "curses.textpad.Textbox.stripspaces") attribute.

do\_command(_ch_)[¶](#curses.textpad.Textbox.do_command "Link to this definition")

Process a single command keystroke. Returns `1` to continue editing, or `0` if a termination keystroke was processed. Here are the supported special keystrokes:

| 
按键

 | 

动作

 |
| --- | --- |
| 

Control\-A

 | 

转到窗口的左边缘。

 |
| 

Control\-B

 | 

光标向左，如果可能，包含前一行。

 |
| 

Control\-D

 | 

删除光标下的字符。

 |
| 

Control\-E

 | 

前往右边缘（stripspaces 关闭时）或者行尾（stripspaces 启用时）。

 |
| 

Control\-F

 | 

向右移动光标，适当时换行到下一行。

 |
| 

Control\-G

 | 

终止，返回窗口内容。

 |
| 

Control\-H

 | 

向后删除字符。

 |
| 

Control\-J

 | 

Terminate if the window is 1 line, otherwise move to the start of the next line.

 |
| 

Control\-K

 | 

如果行为空，则删除它，否则清除到行尾。

 |
| 

Control\-L

 | 

刷新屏幕。

 |
| 

Control\-N

 | 

光标向下;向下移动一行。

 |
| 

Control\-O

 | 

在光标位置插入一个空行。

 |
| 

Control\-P

 | 

光标向上;向上移动一行。

 |

如果光标位于无法移动的边缘，则移动操作不执行任何操作。在可能的情况下，支持以下同义词：

| 
常量

 | 

按键

 |
| --- | --- |
| 

[`KEY_LEFT`](#curses.KEY_LEFT "curses.KEY_LEFT")

 | 

Control\-B

 |
| 

[`KEY_RIGHT`](#curses.KEY_RIGHT "curses.KEY_RIGHT")

 | 

Control\-F

 |
| 

[`KEY_UP`](#curses.KEY_UP "curses.KEY_UP")

 | 

Control\-P

 |
| 

[`KEY_DOWN`](#curses.KEY_DOWN "curses.KEY_DOWN")

 | 

Control\-N

 |
| 

[`KEY_BACKSPACE`](#curses.KEY_BACKSPACE "curses.KEY_BACKSPACE")

 | 

Control\-h

 |

所有其他按键将被视为插入给定字符并右移的命令（带有自动折行）。

gather()[¶](#curses.textpad.Textbox.gather "Link to this definition")

以字符串形式返回窗口内容；是否包括窗口中的空白将受到 [`stripspaces`](#curses.textpad.Textbox.stripspaces "curses.textpad.Textbox.stripspaces") 成员的影响。

stripspaces[¶](#curses.textpad.Textbox.stripspaces "Link to this definition")

此属性是控制窗口中空白解读方式的旗标。 当启用时，每一行的末尾空白会被忽略；任何将光标定位至末尾空白的光标动作都将改为前往该行末尾，并且在收集窗口内容时将去除末尾空白。
