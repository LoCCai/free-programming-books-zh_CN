**源代码:** [Lib/tkinter/\_\_init\_\_.py](https://github.com/python/cpython/tree/3.14/Lib/tkinter/__init__.py)

* * *

`tkinter` 包 ("Tk interface") 是针对 Tcl/Tk GUI 工具包的标准 Python 接口。 Tk 和 `tkinter` 在包括 macOS 在内的大多数 Unix 平台以及 Windows 系统上均可用。systems.

在命令行运行 `python -m tkinter` 会打开一个演示简单 simple Tk 界面的窗口，以表明 `tkinter` 在你的系统上安装正确，还会显示所安装的 Tcl/Tk 版本，以便你参阅对应版本的 Tcl/Tk 文档。

Tkinter supports a range of Tcl/Tk versions, built either with or without thread support. Tcl/Tk 8.5.12 is the minimum supported version; the official Python binary release bundles Tcl/Tk 8.6. See the source code for the [`_tkinter`](#module-_tkinter "_tkinter: A binary module that contains the low-level interface to Tcl/Tk.") module for more information about supported versions.

在 3.11 版本发生变更: 对早于 8.5.12 的 Tcl/Tk 版本的支持已被移除。

Tkinter 并不只是做了简单的封装，而是增加了相当多的代码逻辑，让使用体验更具 Python 风格（pythonic） 。本文将集中介绍这些增加和变化部分，关于未改动部分的细节，请参考 Tcl/Tk 官方文档。

备注

Tcl/Tk 8.5 (2007) 引入了一个带主题的现代风格用户界面组件集以及专用的新 API (参见 [`tkinter.ttk`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#module-tkinter.ttk "tkinter.ttk: Tk themed widget set"))。 旧版和新版 API 均保持可用。 你能找到的大多数在线文档仍然是使用旧版 API 因而可能已极其过时。

这是一个 [optional module](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module)。 如果它在你的 CPython 副本中缺失，请查看你的发行方（也就是说，向你提供 Python 的人）的文档。 如果你就是发行方，请参阅 [针对可选模块的要求](https://docs.python.org/zh-cn/3/using/configure.html#optional-module-requirements)。

参见

-   [TkDocs](https://tkdocs.com/)
    
    关于使用 Tkinter 创建用户界面的详细教程。 讲解了关键概念，并介绍了使用现代 API 的推荐方式。
    
-   [Tkinter 8.5 参考手册：一种 Python GUI](https://www.tkdocs.com/shipman/)
    
    详细讲解可用的类、方法和选项的 Tkinter 8.5 参考文档。
    

Tcl/Tk 资源:

-   [Tk 命令](https://www.tcl-lang.org/man/tcl9.0/TkCmd/index.html)
    
    有关 Tkinter 所使用的每个底层 Tcl/Tk 命令的完整参考文档。
    
-   [Tcl/Tk 主页](https://www.tcl.tk)
    
    额外的文档，以及 Tcl/Tk 核心开发相关链接。
    

书籍:

-   [Modern Tkinter for Busy Python Developers](https://tkdocs.com/book.html)
    
    Mark Roseman 著。 (ISBN 978-1999149567)
    
-   [Python GUI programming with Tkinter](https://www.packtpub.com/en-us/product/python-gui-programming-with-tkinter-9781788835886)
    
    Alan D. Moore 著。 (ISBN 978-1788835886)
    
-   [Programming Python](https://learning-python.com/about-pp4e.html)
    
    Mark Lutz 著；对 Tkinter 进行了精彩的讲解。 (ISBN 978-0596158101)
    
-   [Tcl and the Tk Toolkit (2nd edition)](https://www.amazon.com/exec/obidos/ASIN/032133633X)
    
    John Ousterhout ，Tcl/Tk 的创造者，与 Ken Jones 合著；未涉及 Tkinter。 (ISBN 978-0321336330)
    

## 架构[¶](#architecture "Link to this heading")

Tcl/Tk 不是只有单个库，而是由几个不同的模块组成的，每个模块都有各自的功能和各自的官方文档。 Python 的二进制发行版还会再附加一个模块。

Tcl

Tcl 是一种动态解释型编程语言，正如 Python 一样。尽管它可作为一种通用的编程语言单独使用，但最常见的用法还是作为脚本引擎或 Tk 工具包的接口嵌入到 C 程序中。Tcl 库有一个 C 接口，用于创建和管理一个或多个 Tcl 解释器实例，并在这些实例中运行 Tcl 命令和脚本，添加用 Tcl 或 C 语言实现的自定义命令。每个解释器都拥有一个事件队列，某些部件可向解释器发送事件交由其处理。与 Python 不同，Tcl 的执行模型是围绕协同多任务而设计的，Tkinter 协调了两者的差别（详见 [Threading model](#threading-model) ）。

Tk

Tk 是一个用 C 语言实现的 [Tcl 包](https://wiki.tcl-lang.org/37432)，它添加了用于创建和操纵 GUI 部件的自定义命令。 每个 [`Tk`](#tkinter.Tk "tkinter.Tk") 对象都嵌入了自己的 Tcl 解释器实例并将 Tk 加载到其中。 Tk 的部件是高度可定制的，但其代价则是过时的外观。 Tk 使用 Tcl 的事件队列来生成并处理 GUI 事件。

Ttk

带有主题的 Tk（Ttk）是较新加入的 Tk 部件，相比很多经典的 Tk 部件，在各平台提供的界面更加美观。自 Tk 8.5 版本开始，Ttk 作为 Tk 的成员进行发布。Python 则捆绑在一个单独的模块中， [`tkinter.ttk`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#module-tkinter.ttk "tkinter.ttk: Tk themed widget set")。

在内部，Tk 和 Ttk 使用下层操作系统的工具库，例如，在 Unix/X11 上是 Xlib，在 macOS 上是 Cocoa，在 Windows 上是 GDI。

当你的 Python 应用程序使用了 Tkinter 中的某个类，例如，创建一个控件时，`tkinter` 模块会先建立一个 Tcl/Tk 命令字符串。 它将这个 Tcl 命令字符串传给内部的 [`_tkinter`](#module-_tkinter "_tkinter: A binary module that contains the low-level interface to Tcl/Tk.") 二进制模块，后者将调用 Tcl 解释器来对其求值。 Tcl 解释器再调用 Tk 和/或 Ttk 包，它们又将继续对 Xlib, Cocoa 或 GDI 进行调用。

## Tkinter 模块[¶](#tkinter-modules "Link to this heading")

对 Tkinter 的支持分散于多个模块中。 大多数应用程序都会需要主 `tkinter` 模块，以及 [`tkinter.ttk`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#module-tkinter.ttk "tkinter.ttk: Tk themed widget set") 模块，后者提供了具有现代主题的控件集和相应的 API:

from tkinter import \*
from tkinter import ttk

提供 Tk 支持的模块包括:

`tkinter`

主 Tkinter 模块。

[`tkinter.colorchooser`](https://docs.python.org/zh-cn/3/library/tkinter.colorchooser.html#module-tkinter.colorchooser "tkinter.colorchooser: Color choosing dialog")

让用户选择颜色的对话框。

[`tkinter.commondialog`](https://docs.python.org/zh-cn/3/library/dialog.html#module-tkinter.commondialog "tkinter.commondialog: Tkinter base class for dialogs")

本文其他模块定义的对话框的基类。

[`tkinter.filedialog`](https://docs.python.org/zh-cn/3/library/dialog.html#module-tkinter.filedialog "tkinter.filedialog: Dialog classes for file selection")

允许用户指定文件的通用对话框，用于打开或保存文件。

[`tkinter.font`](https://docs.python.org/zh-cn/3/library/tkinter.font.html#module-tkinter.font "tkinter.font: Tkinter font-wrapping class")

帮助操作字体的工具。

[`tkinter.messagebox`](https://docs.python.org/zh-cn/3/library/tkinter.messagebox.html#module-tkinter.messagebox "tkinter.messagebox: Various types of alert dialogs")

访问标准的 Tk 对话框。

[`tkinter.scrolledtext`](https://docs.python.org/zh-cn/3/library/tkinter.scrolledtext.html#module-tkinter.scrolledtext "tkinter.scrolledtext: Text widget with a vertical scroll bar.")

内置纵向滚动条的文本组件。

[`tkinter.simpledialog`](https://docs.python.org/zh-cn/3/library/dialog.html#module-tkinter.simpledialog "tkinter.simpledialog: Simple dialog windows")

基础对话框和一些便捷功能。

[`tkinter.ttk`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#module-tkinter.ttk "tkinter.ttk: Tk themed widget set")

在 Tk 8.5 中引入的带主题的控件集，提供了与主 `tkinter` 模块中许多经典控件对应的现代化替代版本。

附加模块:

[`_tkinter`](#module-_tkinter "_tkinter: A binary module that contains the low-level interface to Tcl/Tk.")

一个包含低层级 Tcl/Tk 接口的二进制模块。 它会被主 `tkinter` 模块自动导入，而绝不应被应用程序编写者直接使用。 它通常是一个共享库（或 DLL），但在某些情况下也可能与 Python 解释器动态链接。

[`idlelib`](https://docs.python.org/zh-cn/3/library/idle.html#module-idlelib "idlelib: Implementation package for the IDLE shell/editor.")

Python 的集成开发与学习环境（IDLE）。 基于 `tkinter`。

`tkinter.constants`

当向 Tkinter 调用传入各种形参时可被用来代替字符串的符号常量。 由主 `tkinter` 模块自动导入。

[`tkinter.dnd`](https://docs.python.org/zh-cn/3/library/tkinter.dnd.html#module-tkinter.dnd "tkinter.dnd: Tkinter drag-and-drop interface")

针对 `tkinter` 的（实验性的）拖放支持。 当以 Tk DND 替代时它将被弃用。

[`turtle`](https://docs.python.org/zh-cn/3/library/turtle.html#module-turtle "turtle: An educational framework for simple graphics applications")

Tk 窗口中的海龟绘图库。

## Tkinter 重要提示[¶](#tkinter-life-preserver "Link to this heading")

这一章节的设计目的不是要编写有关 Tk 或 Tkinter 的冗长教程。 要获取教程，请参阅之前列出的外部资源之一。 相反地，这一章节提供了对于 Tkinter 应用程序大致样貌的快速指导，列出了基本的 Tk 概念，并解释了 Tkinter 包装器的构造是什么样的。

这一章节的剩余部分将帮助你识别在你的 Tkinter 应用程序中需要的类、方法和选项，以及在哪里可以找到有关它们的更详细文档，包括官方 Tcl/Tk 参考手册等。

### Hello World 程序[¶](#a-hello-world-program "Link to this heading")

让我们先来看一个 Tkinter 的 "Hello World" 应用程序。 这并不是我们所能写出的最简短版本，但也足够说明你所需要了解的一些关键概念。

from tkinter import \*
from tkinter import ttk
root \= Tk()
frm \= ttk.Frame(root, padding\=10)
frm.grid()
ttk.Label(frm, text\="Hello World!").grid(column\=0, row\=0)
ttk.Button(frm, text\="Quit", command\=root.destroy).grid(column\=1, row\=0)
root.mainloop()

在导入语句之后，下一行语句创建了一个 [`Tk`](#tkinter.Tk "tkinter.Tk") 类的实例，它会初始化 Tk 并创建与其关联的 Tcl 解释器。 它还会创建一个顶层窗口，名为 root 窗口，它将被作为应用程序的主窗口。

下一行创建了一个框架控件，在本示例中它会包含我们即将创建的一个标签和一个按钮。 框架被嵌在 root 窗口内部。

下一行创建了一个带有静态文本字符串的标签控件。 [`grid()`](#tkinter.Grid.grid "tkinter.Grid.grid") 方法被用来指明标签在包含它的框架控件中的相对布局（定位），其作用类似于 HTML 中的表格。

接下来创建了一个按钮控件，并放置到标签的右侧。 当被按下时，它将调用 root 窗口的 [`destroy()`](#tkinter.Misc.destroy "tkinter.Misc.destroy") 方法。

最后，[`mainloop()`](#tkinter.mainloop "tkinter.mainloop") 方法将所有控件显示出来，并响应用户输入直到程序终结。

### 重要的 Tk 概念[¶](#important-tk-concepts "Link to this heading")

即便是这样简单的程序也阐明了以下关键 Tk 概念:

控件

Tkinter 用户界面是由一个个 _控件_ 组成的。 每个控件都由相应的 Python 对象表示，由 [`ttk.Frame`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Frame "tkinter.ttk.Frame"), [`ttk.Label`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Label "tkinter.ttk.Label") 以及 [`ttk.Button`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Button "tkinter.ttk.Button") 这样的类来实例化。

控件层级结构

控件按 _层级结构_ 来组织。 标签和按钮包含在框架中，框架又包含在根窗口中。 当创建每个 _子_ 控件时，它的 _父_ 控件会作为控件构造器的第一个参数被传入。

配置选项

控件具有 _配置选项_，配置选项会改变控件的外观和行为，例如要在标签或按钮中显示的文本。 不同的控件类会具有不同的选项集。

几何管理

小部件在创建时不会自动添加到用户界面。一个像 `grid` 的 _几何管理器_ 控制这些小部件在用户界面的位置。

事件循环

只有主动运行一个 _事件循环_，Tkinter 才会对用户的输入做出反应，改变你的程序，以及刷新显示。如果你的程序没有运行事件循环，你的用户界面不会更新。

### 了解 Tkinter 如何对 Tcl/Tk 进行包装[¶](#understanding-how-tkinter-wraps-tcl-tk "Link to this heading")

当你的应用程序使用 Tkinter 的类和方法时，Tkinter 内部汇编代表 Tcl/Tk 命令的字符串，并在连接到你的应用程序的 [`Tk`](#tkinter.Tk "tkinter.Tk") 实例的 Tcl 解释器中执行这些命令。

无论是试图浏览参考文档，或是试图找到正确的方法或选项，调整一些现有的代码，亦或是调试 Tkinter 应用程序，有时候理解底层 Tcl/Tk 命令是什么样子的会很有用。

为了说明这一点，下面是 Tcl/Tk 等价于上面 Tkinter 脚本的主要部分。

ttk::frame .frm \-padding 10
grid .frm
grid \[ttk::label .frm.lbl \-text "Hello World!"\] \-column 0 \-row 0
grid \[ttk::button .frm.btn \-text "Quit" \-command "destroy ."\] \-column 1 \-row 0

Tcl 的语法类似于许多 shell 语言，其中第一个单词是要执行的命令，后面是该命令的参数，用空格分隔。不谈太多细节，请注意以下几点：

-   用于创建控件 (如 `ttk::frame`) 的命令对应于 Tkinter 中的 widget 类。
    
-   Tcl 控件选项 (如 `-text`) 对应于 Tkinter 中的关键字参数。
    
-   在 Tcl 中，控件是通过 _路径名_ 引用的 (例如 `.frm.btn`)，而 Tkinter 则不使用名称而使用对象引用。
    
-   控件在控件层次结构中的位置在其（层次结构）路径名中编码，该路径名使用一个 `.` （点）作为路径分隔符。根窗口的路径名是 `.` （点）。在 Tkinter 中，层次结构不是通过路径名定义的，而是通过在创建每个子控件时指定父控件来定义的。
    
-   在 Tcl 中被实现为单独 _命令_ 的操作 (如 `grid` 或 `destroy`) 在 Tkinter 控件对象上以 _方法_ 表示。 稍后你将看到，在其他时候 Tcl 会使用在控件对象上作为方法调用的操作，它与 Tkinter 上所使用的东西相互对应。
    

### 我该如何...？这个选项会做...？[¶](#how-do-i-what-option-does "Link to this heading")

如果您不确定如何在 Tkinter 中做一些事情，并且您不能立即在您正在使用的教程或参考文档中找到它，这里有一些策略可以帮助您。

首先，请记住，在不同版本的 Tkinter 和 Tcl/Tk 中，各个控件如何工作的细节可能会有所不同。如果您正在搜索文档，请确保它与安装在系统上的 Python 和 Tcl/Tk 版本相对应。

在搜索如何使用 API 时，知道正在使用的类、选项或方法的确切名称会有所帮助。内省，无论是在交互式 Python shell 中，还是在 [`print()`](https://docs.python.org/zh-cn/3/builtins/functions.html#print "print") 中，都可以帮助你确定你需要什么。

要找出控件上可用的配置选项，请调用其 [`configure()`](#tkinter.Misc.configure "tkinter.Misc.configure") 方法，它将返回包含每个对象的多种信息的字典，包括其默认值和当前值。 使用 [`keys()`](#tkinter.Misc.keys "tkinter.Misc.keys") 来获取每个选项的名称。

btn \= ttk.Button(frm, ...)
print(btn.configure().keys())

由于大多数控件都有许多共同的配置选项，因此找出特定于特定控件类的配置选项可能会很有用。将选项列表与更简单的控件（如框架）的列表进行比较是一种方法。

print(set(btn.configure().keys()) \- set(frm.configure().keys()))

类似地，你可以使用标准函数 [`dir()`](https://docs.python.org/zh-cn/3/builtins/functions.html#dir "dir") 来查找控件对象的可用方法。如果您尝试一下，您会发现有超过200种常见的控件方法，因此再次确认那些特定于控件类的方法是有帮助的。

print(dir(btn))
print(set(dir(btn)) \- set(dir(frm)))

### 浏览 Tcl/Tk 参考手册[¶](#navigating-the-tcl-tk-reference-manual "Link to this heading")

As noted, the official [Tk commands](https://www.tcl-lang.org/man/tcl9.0/TkCmd/index.html) reference manual (man pages) is often the most accurate description of what specific operations on widgets do. Even when you know the name of the option or method that you need, you may still have a few places to look.

While all operations in Tkinter are implemented as method calls on widget objects, you've seen that many Tcl/Tk operations appear as commands that take a widget pathname as its first parameter, followed by optional parameters, for example

destroy .
grid .frm.btn \-column 0 \-row 0

但是，其他方法看起来更像在控件对象上调用的方法（实际上，当您在 Tcl/Tk 中创建小部件时，它会使用控件路径名创建 Tcl 命令，该命令的第一个参数是要调用的方法名）。

.frm.btn invoke
.frm.lbl configure \-text "Goodbye"

In the official Tcl/Tk reference documentation, you'll find most operations that look like method calls on the man page for a specific widget (for example, you'll find the [`invoke()`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Button.invoke "tkinter.ttk.Button.invoke") method on the [ttk::button](https://www.tcl-lang.org/man/tcl9.0/TkCmd/ttk_button.html) man page), while functions that take a widget as a parameter often have their own man page (for example, [grid](https://www.tcl-lang.org/man/tcl9.0/TkCmd/grid.html)).

You'll find many common options and methods in the [options](https://www.tcl-lang.org/man/tcl9.0/TkCmd/options.html) or [ttk::widget](https://www.tcl-lang.org/man/tcl9.0/TkCmd/ttk_widget.html) man pages, while others are found in the man page for a specific widget class.

You'll also find that many Tkinter methods have compound names, for example, [`winfo_x()`](#tkinter.Misc.winfo_x "tkinter.Misc.winfo_x"), [`winfo_height()`](#tkinter.Misc.winfo_height "tkinter.Misc.winfo_height"), [`winfo_viewable()`](#tkinter.Misc.winfo_viewable "tkinter.Misc.winfo_viewable"). You'd find documentation for all of these in the [winfo](https://www.tcl-lang.org/man/tcl9.0/TkCmd/winfo.html) man page.

备注

有些令人困惑的是，所有 Tkinter 小部件上还有一些方法实际上并不在控件上操作，而是在全局范围内操作，独立于任何控件。例如访问剪贴板或系统响铃的方法。（它们恰好被实现为所有 Tkinter 小部件都继承自的基类 [`Widget`](#tkinter.Widget "tkinter.Widget") 中的方法）。

## 线程模型[¶](#threading-model "Link to this heading")

Python and Tcl/Tk have very different threading models, which `tkinter` tries to bridge. If you use threads, you may need to be aware of this.

一个 Python 解释器可能会关联很多线程。在 Tcl 中，可以创建多个线程，但每个线程都关联了单独的 Tcl 解释器实例。线程也可以创建一个以上的解释器实例，尽管每个解释器实例只能由创建它的那个线程使用。

Each [`Tk`](#tkinter.Tk "tkinter.Tk") object created by `tkinter` contains a Tcl interpreter. It also keeps track of which thread created that interpreter. Calls to `tkinter` can be made from any Python thread. Internally, if a call comes from a thread other than the one that created the `Tk` object, an event is posted to the interpreter's event queue, and when executed, the result is returned to the calling Python thread.

Tcl/Tk applications are normally event-driven, meaning that after initialization, the interpreter runs an event loop (that is, [`Tk.mainloop`](#tkinter.Misc.mainloop "tkinter.Misc.mainloop")) and responds to events. Because it is single-threaded, event handlers must respond quickly, otherwise they will block other events from being processed. To avoid this, any long-running computations should not run in an event handler, but are either broken into smaller pieces using timers, or run in another thread. This is different from many GUI toolkits where the GUI runs in a completely separate thread from all application code including event handlers.

If the Tcl interpreter is not running the event loop and processing events, any `tkinter` calls made from threads other than the one running the Tcl interpreter will fail.

存在一些特殊情况：

-   Tcl/Tk libraries built without thread support are now rare: the bundled Tcl/Tk 8.6 is built with thread support, so this case only arises with some older non-threaded builds. When the library is not thread-aware, `tkinter` calls the library from the originating Python thread, even if this is different than the thread that created the Tcl interpreter. A global lock ensures only one call occurs at a time.
    
-   While `tkinter` allows you to create more than one instance of a [`Tk`](#tkinter.Tk "tkinter.Tk") object (with its own interpreter), all interpreters that are part of the same thread share a common event queue, which gets ugly fast. In practice, don't create more than one instance of `Tk` at a time. Otherwise, it's best to create them in separate threads and ensure you're running a thread-aware Tcl/Tk build.
    
-   为了防止 Tcl 解释器重新进入事件循环，阻塞事件处理程序并不是唯一的做法。甚至可以运行多个嵌套的事件循环，或者完全放弃事件循环。如果在处理事件或线程时碰到棘手的问题，请小心这些可能的事情。
    
-   There are a few select `tkinter` functions that presently work only when called from the thread that created the Tcl interpreter.
    

## 快速参考[¶](#handy-reference "Link to this heading")

### 设置选项[¶](#setting-options "Link to this heading")

配置参数可以控制组件颜色和边框宽度等。可通过三种方式进行设置：

在对象创建时，使用关键字参数

fred \= Button(self, fg\="red", bg\="blue")

在对象创建后，将参数名用作字典索引

fred\["fg"\] \= "red"
fred\["bg"\] \= "blue"

利用 config() 方法修改对象的多个属性

fred.config(fg\="red", bg\="blue")

备注

The `fg` and `bg` options used here, and other options that control a widget's appearance, belong to the classic `tkinter` widgets. The themed [`tkinter.ttk`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#module-tkinter.ttk "tkinter.ttk: Tk themed widget set") widgets recommended in the introduction do not accept them; style a themed widget through the [`ttk.Style`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Style "tkinter.ttk.Style") class instead. The three ways of setting an option shown above apply to both widget sets.

关于这些参数及其表现的完整解释，请参阅 Tk 手册中有关组件的 man 帮助页。

请注意，man 手册页列出了每个部件的“标准选项”和“组件特有选项”。前者是很多组件通用的选项列表，后者是该组件特有的选项。标准选项在 _[options(3)](https://manpages.debian.org/options\(3\))_ man 手册中有文档。

本文没有区分标准选项和部件特有选项。有些选项不适用于某类组件。组件是否对某选项做出响应，取决于组件的类别；按钮组件有一个 `command` 选项，而标签组件就没有。

The options supported by a given widget are listed in that widget's man page, or can be queried at runtime by calling the [`config()`](#tkinter.Misc.config "tkinter.Misc.config") method without arguments, or by calling the [`keys()`](#tkinter.Misc.keys "tkinter.Misc.keys") method on that widget. The return value of these calls is a dictionary whose key is the name of the option as a string (for example, `'relief'`) and whose values are 5-tuples.

某些选项，比如 `bg`，是长名称普通选项的同义词 (`bg` 是 "background" 的缩写)。

| 
索引

 | 

含意

 | 

示例

 |
| --- | --- | --- |
| 

0

 | 

选项名称

 | 

`'relief'`

 |
| 

1

 | 

数据库查找的选项名称

 | 

`'relief'`

 |
| 

2

 | 

数据库查找的选项类

 | 

`'Relief'`

 |
| 

3

 | 

默认值

 | 

`'raised'`

 |
| 

4

 | 

当前值

 | 

`'groove'`

 |

示例:

\>>> print(fred.config())
{'relief': ('relief', 'relief', 'Relief', 'raised', 'groove')}

当然，输出的字典将包含所有可用选项及其值。这里只是举个例子。

### 几何管理[¶](#geometry-management "Link to this heading")

创建一个控件并不会让它显示出来。控件只有在交给几何管理器之后才会出现，几何管理器会计算它在其容器中的大小和位置，并在容器大小变化或内容更新时保持布局的实时更新。忘记调用几何管理器是初学者常犯的错误：控件虽然创建了，但界面上什么也不会显示。

Tk 提供了三种几何管理器。每个部件都继承了每一种几何管理器，因此任何部件都可以由其中任意一个来管理（但请参阅下文关于 grid 和 pack 不兼容的警告）。选择哪种管理器取决于你想要的布局类型。

[`grid`](#tkinter.Grid.grid_configure "tkinter.Grid.grid_configure")

Arranges widgets in a two-dimensional table of rows and columns. It is the most flexible manager and the one to reach for by default: layouts that would otherwise need several nested frames can often be expressed as a single grid, and rows and columns can be told how to absorb extra space.

ttk.Label(frm, text\="Name:").grid(column\=0, row\=0, sticky\="w")
ttk.Entry(frm).grid(column\=1, row\=0)
ttk.Button(frm, text\="OK").grid(column\=1, row\=1, sticky\="e")

[`pack`](#tkinter.Pack.pack_configure "tkinter.Pack.pack_configure")

Stacks widgets against one side of their container -- `"top"` (the default), `"bottom"`, `"left"` or `"right"` -- and can make them fill or expand into the space that is left. It is convenient for simple arrangements, such as a single row or column of widgets or a content area framed by a toolbar and a status bar.

toolbar.pack(side\="top", fill\="x")
status.pack(side\="bottom", fill\="x")
body.pack(side\="left", expand\=True, fill\="both")

[`place`](#tkinter.Place.place_configure "tkinter.Place.place_configure")

Positions each widget at an explicit spot, given either as absolute screen distances or as a fraction of the container's size. It offers the most control but the least automatic behavior, and is used the least; it suits special cases such as overlapping widgets or precise custom layouts.

background.place(x\=0, y\=0, relwidth\=1.0, relheight\=1.0)
badge.place(relx\=1.0, rely\=0.0, anchor\="ne")

Layouts are built up by nesting: grid or pack widgets, including frames, inside a frame or toplevel. Toplevels are managed by the OS window manager. Classic and themed [`tkinter.ttk`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#module-tkinter.ttk "tkinter.ttk: Tk themed widget set") widgets can be managed interchangeably.

警告

Do not apply `pack()` and `grid()` to two widgets that share the same container. The two managers negotiate sizes in incompatible ways, and the application can hang as they repeatedly resize the container against each other. To combine them, keep each manager's widgets in a separate frame.

The full set of options accepted by each manager, with their values and defaults, is documented under [`Grid.grid_configure()`](#tkinter.Grid.grid_configure "tkinter.Grid.grid_configure"), [`Pack.pack_configure()`](#tkinter.Pack.pack_configure "tkinter.Pack.pack_configure") and [`Place.place_configure()`](#tkinter.Place.place_configure "tkinter.Place.place_configure"); see also the _[grid(3tk)](https://manpages.debian.org/grid\(3tk\))_, _[pack(3tk)](https://manpages.debian.org/pack\(3tk\))_ and _[place(3tk)](https://manpages.debian.org/place\(3tk\))_ man pages.

### 关联控件变量[¶](#coupling-widget-variables "Link to this heading")

Some widgets can tie their current value directly to a program variable, so that the two stay in sync. Options such as `variable`, `textvariable`, `value`, `onvalue` and `offvalue` set up this connection: when the user changes the widget the variable is updated, and when the variable is set the widget redraws to match.

A widget can be linked only to a [`Variable`](#tkinter.Variable "tkinter.Variable") object, not to an ordinary Python variable. This is not a limitation of `tkinter` but a consequence of how the two languages differ: the link relies on Tcl being notified every time the value changes, and Python offers no way to react when a plain variable is reassigned. A `Variable` sidesteps this by keeping its value inside the Tcl interpreter and exposing it through explicit [`get()`](#tkinter.Variable.get "tkinter.Variable.get") and [`set()`](#tkinter.Variable.set "tkinter.Variable.set") methods.

Ready-made subclasses cover the common types: [`StringVar`](#tkinter.StringVar "tkinter.StringVar"), [`IntVar`](#tkinter.IntVar "tkinter.IntVar"), [`DoubleVar`](#tkinter.DoubleVar "tkinter.DoubleVar") and [`BooleanVar`](#tkinter.BooleanVar "tkinter.BooleanVar"). Pass one as a widget's `textvariable` (or `variable`) option, then read and update it with [`get()`](#tkinter.Variable.get "tkinter.Variable.get") and [`set()`](#tkinter.Variable.set "tkinter.Variable.set"); the widget tracks it with no further work on your part.

Keep a reference to the variable for as long as the widget uses it -- for example by storing it as an attribute. A [`Variable`](#tkinter.Variable "tkinter.Variable") that is garbage collected removes its underlying Tcl variable, breaking the connection to the widget (see `Variable`).

例如：

import tkinter as tk
from tkinter import ttk

root \= tk.Tk()

\# Create the application variable and give it an initial value.
contents \= tk.StringVar(value\="this is a variable")

\# Tell the entry widget to track the variable.
entry \= ttk.Entry(root, textvariable\=contents)
entry.pack()

\# Print the current value whenever the user presses Return.
def print\_contents(event):
    print("The current entry content is:", contents.get())

entry.bind("<Return>", print\_contents)

\# Setting the variable from the program updates the entry through the
\# same link.
def clear():
    contents.set("")

ttk.Button(root, text\="Clear", command\=clear).pack()

root.mainloop()

### 窗口管理器[¶](#the-window-manager "Link to this heading")

The _window manager_ is the part of the desktop responsible for the title bar, border and controls drawn around each top-level window, and for such things as its title, position, size and icon. Tk gives access to these through the [`Wm`](#tkinter.Wm "tkinter.Wm") mixin, which is inherited by the [`Tk`](#tkinter.Tk "tkinter.Tk") root window and by every [`Toplevel`](#tkinter.Toplevel "tkinter.Toplevel"). You therefore call the window-manager methods directly on a top-level window. Each has a short name and an equivalent `wm_`\-prefixed name, for example [`title()`](#tkinter.Wm.title "tkinter.Wm.title") and [`wm_title()`](#tkinter.Wm.wm_title "tkinter.Wm.wm_title").

These methods act on the top-level window whether its content is built from the classic widgets or the themed [`tkinter.ttk`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#module-tkinter.ttk "tkinter.ttk: Tk themed widget set") widgets. To reach the top-level window containing an arbitrary widget, call its [`winfo_toplevel()`](#tkinter.Misc.winfo_toplevel "tkinter.Misc.winfo_toplevel") method.

例如：

import tkinter as tk
from tkinter import ttk

root \= tk.Tk()
root.title("My Application")
root.geometry("640x480")
root.minsize(320, 240)

ttk.Label(root, text\="Hello").pack(padx\=20, pady\=20)

root.mainloop()

请参阅 [`Wm`](#tkinter.Wm "tkinter.Wm") 了解窗口管理器方法的完整集合。

### Tk 选项数据类型[¶](#tk-option-data-types "Link to this heading")

参考文档中的许多控件选项都接受小数字值形式的通用类型，具体描述见下。

anchor

合法值是罗盘的方位点：`"n"` 、`"ne"` 、`"e"` 、`"se"` 、`"s"` 、`"sw"` 、`"w"` 、`"nw"` 和 `"center"` 。

bitmap

There are ten built-in, named bitmaps: `'error'`, `'gray12'`, `'gray25'`, `'gray50'`, `'gray75'`, `'hourglass'`, `'info'`, `'questhead'`, `'question'`, `'warning'`. To specify an X bitmap filename, give the full path to the file, preceded with an `@`, as in `"@/usr/contrib/bitmap/gumby.bit"`.

boolean

可以传入整数 0 或 1，或是字符串 `"yes"` 或 `"no"`。

callback -- 回调

指任何无需调用参数的 Python 函数。 例如：

def print\_it():
    print("hi there")
fred\["command"\] \= print\_it

color

Colors can be given as the names of X colors in the rgb.txt file, or as strings representing RGB values in 4 bit: `"#RGB"`, 8 bit: `"#RRGGBB"`, 12 bit: `"#RRRGGGBBB"`, or 16 bit: `"#RRRRGGGGBBBB"` ranges, where R,G,B here represent any legal hex digit. See the _[colors(3tk)](https://manpages.debian.org/colors\(3tk\))_ man page for the list of named colors.

cursor

The name of the mouse cursor to display while the pointer is over the widget. Tk provides a portable set of cursor names available on all platforms (for example `"arrow"`, `"watch"`, `"cross"`, or `"hand2"`); the standard X cursor names from `cursorfont.h` may also be used, without the `XC_` prefix (so `XC_hand2` becomes `"hand2"`). The full list of names, including the platform-specific ones, is given in the _[cursors(3tk)](https://manpages.debian.org/cursors\(3tk\))_ manual page. You can also specify a bitmap and mask file of your own. On Windows a cursor file (`.cur` or `.ani`) may be used directly, giving its path preceded with an `@`, as in `"@C:/cursors/bart.ani"`.

distance

屏幕距离可以用像素或绝对距离来指定。像素是数字，绝对距离是字符串，后面的字符表示单位：`c` 是厘米，`i` 是英寸，`m` 是毫米，`p` 则表示打印机的点数。例如，3.5 英寸可表示为 `"3.5i"`。

font

Tk uses a font description such as `{courier 10 bold}`; in `tkinter` this is most naturally passed as a tuple of `(family, size, *styles)` (or as the equivalent string `"Courier 10 bold"`). Font sizes with positive numbers are measured in points; sizes with negative numbers are measured in pixels.

geometry

这是一个 `widthxheight` 形式的字符串，其中宽度和高度对于大多数部件来说是以像素为单位的（对于显示文本的部件来说是以字符为单位的）。例如：fred\["geometry"\] = "200x100"。

justify

合法的值为字符串: `"left"`, `"center"` 和 `"right"`。

region

这是包含四个元素的字符串，以空格分隔，每个元素是表示一个合法的距离值（见上文）。例如：`"2 3 4 5"` 、 `"3i 2i 4.5i 2i"` 和 `"3c 2c 4c 10.43c"` 都是合法的区域值。

relief

Determines what the border style of a widget will be. Legal values are: `"raised"`, `"sunken"`, `"flat"`, `"groove"`, `"ridge"`, and `"solid"`.

scrollcommand

这几乎就是带滚动条部件的 `set()` 方法，但也可是任一只有一个参数的部件方法。

wrap

只能是以下值之一：`"none"` 、 `"char"` 、 `"word"`。

### 绑定和事件[¶](#bindings-and-events "Link to this heading")

部件命令中的 bind 方法可觉察某些事件，并在事件发生时触发一个回调函数。bind 方法的形式是：

def bind(self, sequence, func, add\=''):

其中：

sequence

is a string that denotes the target kind of event. Physical events use the `<modifier-modifier-type-detail>` form (for example `"<Enter>"` or `"<Control-Button-1>"`); application-defined virtual events use double angle brackets, as in `"<<Paste>>"`. (See the _[bind(3tk)](https://manpages.debian.org/bind\(3tk\))_ man page for details.)

func

是带有一个参数的 Python 函数，发生事件时将会调用。传入的参数为一个 Event 实例。（以这种方式部署的函数通常称为 _回调函数_。）

add

可选项， `''` 或 `'+'` 。传入空字符串表示本次绑定将替换与此事件关联的其他所有绑定。传递 `'+'` 则意味着加入此事件类型已绑定函数的列表中。

例如：

def turn\_red(self, event):
    event.widget\["activeforeground"\] \= "red"

self.button.bind("<Enter>", self.turn\_red)

请注意，在 `turn_red()` 回调函数中如何访问事件的 widget 字段。该字段包含了捕获 X 事件的控件。下表列出了事件可供访问的其他字段，及其在 Tk 中的表示方式，这在查看 Tk 手册时很有用处。

| 
Tk

 | 

Tkinter 事件字段

 | 

Tk

 | 

Tkinter 事件字段

 |
| --- | --- | --- | --- |
| 

%f

 | 

focus

 | 

%A

 | 

char

 |
| 

%h

 | 

height

 | 

%E

 | 

send\_event

 |
| 

%k

 | 

keycode

 | 

%K

 | 

keysym

 |
| 

%s

 | 

state

 | 

%N

 | 

keysym\_num

 |
| 

%t

 | 

time

 | 

%T

 | 

type

 |
| 

%w

 | 

width

 | 

%W

 | 

widget

 |
| 

%x

 | 

x

 | 

%X

 | 

x\_root

 |
| 

%y

 | 

y

 | 

%Y

 | 

y\_root

 |
| 

%#

 | 

serial

 | 

%b

 | 

num

 |
| 

%d

 | 

detail

 | 

%D

 | 

delta

 |

The `add` parameter above only affects the bindings you make yourself. Every widget also inherits _class bindings_ that implement its standard behavior -- for example a [`Text`](#tkinter.Text "tkinter.Text") widget binds Control\-t to transpose two characters. These are described in the bindings section of the widget's Tk man page (such as _[text(3tk)](https://manpages.debian.org/text\(3tk\))_ or _[entry(3tk)](https://manpages.debian.org/entry\(3tk\))_).

Class bindings are processed separately from your own, so binding an event yourself does not replace the default; both run. To suppress an unwanted default binding, bind the event on the widget and return the string `"break"` from your callback.

### The index parameter[¶](#the-index-parameter "Link to this heading")

很多控件都需要传入 index 参数。该参数用于指明 Text 控件中的位置，或指明 Entry 控件中的字符，或指明 Menu 控件中的菜单项。

Entry 控件的索引（index、view index 等）

Entry widgets have methods and options that refer to character positions in the text being displayed. Anytime an index is needed, you may pass in:

-   an integer which refers to the numeric position of a character, counted from the beginning of the text, starting with 0;
    
-   the string `"anchor"`, which refers to the anchor point of the selection, set with the widget's selection methods;
    
-   the string `"end"`, which refers to the position just after the last character;
    
-   the string `"insert"`, which refers to the character just after the insertion cursor;
    
-   the strings `"sel.first"` and `"sel.last"`, which refer to the first character in the selection and the position just after the last (it is an error to use these if there is no selection);
    
-   a string consisting of `@` followed by an integer, as in `"@6"`, where the integer is interpreted as an x pixel coordinate in the entry's coordinate system, selecting the character spanning that point.
    

Text 控件的索引

Text 控件的索引语法非常复杂，最好还是在 Tk 手册中查看。

Menu 索引（menu.invoke()、menu.entryconfig() 等）

菜单的某些属性和方法可以操纵特定的菜单项。只要属性或参数需要用到菜单索引，就可用以下方式传入：

-   一个整数，指的是菜单项的数字位置，从顶部开始计数，从 0 开始；
    
-   字符串 `"active"`，指的是当前光标所在的菜单；
    
-   字符串 `"last"`，指的是上一个菜单项；
    
-   a string consisting of `@` followed by an integer, as in `"@6"`, where the integer is interpreted as a y pixel coordinate in the menu's coordinate system;
    
-   表示没有任何菜单条目的字符串 `"none"` 经常与 menu.activate() 一同被用来停用所有条目，以及 ——
    
-   与菜单项的文本标签进行模式匹配的文本串，从菜单顶部扫描到底部。请注意，此索引类型是在其他所有索引类型之后才会考虑的，这意味着文本标签为 `last`、`active` 或 `none` 的菜单项匹配成功后，可能会视为这些单词文字本身。
    

### 图片[¶](#images "Link to this heading")

通过 [`tkinter.Image`](#tkinter.Image "tkinter.Image") 的各种子类可以创建相应格式的图片：

-   [`BitmapImage`](#tkinter.BitmapImage "tkinter.BitmapImage") 对应 XBM 格式的图片。
    
-   [`PhotoImage`](#tkinter.PhotoImage "tkinter.PhotoImage") 对应 PGM、PPM、GIF 和 PNG 格式的图片。后者自 Tk 8.6 开始支持。
    

这两种图片可通过 `file` 或 `data` 属性创建的（也可能由其他属性创建）。

在 3.13 版本发生变更: 添加了 `PhotoImage` 方法 `copy_replace()` 以将一个图像的某个区域拷贝到另一个图像，可能带有像素缩放和/或子采样。 为 `PhotoImage` 方法 `copy()`, `zoom()` 和 `subsample()` 添加了 _from\_coords_ 形参。 为 `PhotoImage` 方法 `copy()` 添加了 _zoom_ 和 _subsample_ 形参。

The image object can then be used wherever an `image` option is supported by some widget (for example, labels, buttons, menus). In these cases, Tk will not keep a reference to the image. When the last Python reference to the image object is deleted, the image data is deleted as well, and Tk will display an empty box wherever the image was used.

参见

[Pillow](https://python-pillow.org/) 包增加了对 BMP, JPEG, TIFF 和 WebP 等多种格式的支持。

## 参考[¶](#reference "Link to this heading")

This section documents the classes, methods, functions and constants of the `tkinter` module. Most of them wrap Tcl/Tk commands; consult the official Tcl/Tk manual pages for the full list of widget options and further details.

_exception_ tkinter.TclError[¶](#tkinter.TclError "Link to this definition")

The exception raised when a call into the Tcl interpreter fails, for example when a widget is given an unknown option or an invalid value.

### Base and mixin classes[¶](#base-and-mixin-classes "Link to this heading")

_class_ tkinter.Misc[¶](#tkinter.Misc "Link to this definition")

The `Misc` class is a mix-in inherited by [`Tk`](#tkinter.Tk "tkinter.Tk") and, through [`BaseWidget`](#tkinter.BaseWidget "tkinter.BaseWidget"), by every widget. It provides the large set of methods common to all Tk objects: querying window information, managing event bindings and the event loop, controlling the keyboard focus and pointer grabs, accessing the selection, clipboard and option database, and assorted utility and introspection services. Because they are inherited, these methods are available on every widget and on the `Tk` application object, and are documented here once rather than repeated for each widget.

cget(_key_)[¶](#tkinter.Misc.cget "Link to this definition")

Return the current value of the configuration option named _key_ for this widget, as a string. The expression `widget[key]` is equivalent and may be used instead.

configure(_cnf\=None_, _\*\*kw_)[¶](#tkinter.Misc.configure "Link to this definition")

Query or modify the configuration options of the widget. With no arguments, return a dictionary mapping every available option name to a tuple describing it (its name, X resource name, X resource class, default value and current value). If a single option name is given as a string, return the tuple for just that option. If one or more keyword arguments are given, or a dictionary is passed as _cnf_, set each named option to the corresponding value; the expression `widget[key] = value` sets a single option in the same way.

[`config()`](#tkinter.Misc.config "tkinter.Misc.config") 是 `configure()` 的别名。

keys()[¶](#tkinter.Misc.keys "Link to this definition")

Return a list of the names of all configuration options of this widget.

getboolean(_s_)[¶](#tkinter.Misc.getboolean "Link to this definition")

Interpret the string _s_ as a Tcl boolean and return the corresponding [`bool`](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool"). Tcl accepts values such as `'1'`, `'0'`, `'yes'`, `'no'`, `'true'` and `'false'`. Raise [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") if _s_ is not a valid boolean.

getdouble(_s_)[¶](#tkinter.Misc.getdouble "Link to this definition")

Interpret the string _s_ as a Tcl floating-point number and return it as a [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float"). Raise [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") if _s_ is not a valid number.

Added in version 3.5.

getint(_s_)[¶](#tkinter.Misc.getint "Link to this definition")

Interpret the string _s_ as a Tcl integer and return it as an [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int"). Raise [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") if _s_ is not a valid integer.

getvar(_name_)[¶](#tkinter.Misc.getvar "Link to this definition")

Return the value of the Tcl global variable named _name_.

setvar(_name_, _value_)[¶](#tkinter.Misc.setvar "Link to this definition")

Set the Tcl global variable named _name_ to _value_.

The `getvar()` and `setvar()` methods give direct access to Tcl variables. In most code you will instead use a [`Variable`](#tkinter.Variable "tkinter.Variable") subclass such as [`StringVar`](#tkinter.StringVar "tkinter.StringVar") or [`IntVar`](#tkinter.IntVar "tkinter.IntVar"), which wraps a Tcl variable and converts its value to and from a Python type.

register(_func_, _subst\=None_, _needcleanup\=1_)[¶](#tkinter.Misc.register "Link to this definition")

Register the Python callable _func_ as a Tcl command and return the name of the new command as a string. Whenever Tcl invokes that command, _func_ is called; if _subst_ is given, it is applied to the command's arguments first. This is the mechanism used internally to turn Python callbacks into the command names passed to Tk options such as _command_. Unless _needcleanup_ is false, the command is deleted automatically when the widget is destroyed.

在 3.13 版本发生变更: The arguments passed to _func_ are no longer converted to strings.

deletecommand(_name_)[¶](#tkinter.Misc.deletecommand "Link to this definition")

Delete the Tcl command named _name_, such as one previously returned by [`register()`](#tkinter.Misc.register "tkinter.Misc.register").

nametowidget(_name_)[¶](#tkinter.Misc.nametowidget "Link to this definition")

Return the widget instance corresponding to the Tk pathname _name_.

send(_interp_, _cmd_, _\*args_)[¶](#tkinter.Misc.send "Link to this definition")

Send the Tcl command _cmd_, with the given _args_, to the Tcl interpreter registered under the name _interp_, and return its result. This is not available on all platforms.

destroy()[¶](#tkinter.Misc.destroy "Link to this definition")

Destroy this widget and all of its descendant widgets, and delete the Tcl commands associated with them.

tkraise(_aboveThis\=None_)[¶](#tkinter.Misc.tkraise "Link to this definition")

Raise this widget in the stacking order so that it is drawn on top of its siblings. If _aboveThis_ is given, the widget is moved to be just above it in the stacking order instead.

[`lift()`](#tkinter.Misc.lift "tkinter.Misc.lift") is an alias of `tkraise()`.

lower(_belowThis\=None_)[¶](#tkinter.Misc.lower "Link to this definition")

Lower this widget in the stacking order so that it is drawn beneath its siblings. If _belowThis_ is given, the widget is moved to be just below it in the stacking order instead.

[`tkraise()`](#tkinter.Misc.tkraise "tkinter.Misc.tkraise")/[`lift()`](#tkinter.Misc.lift "tkinter.Misc.lift") and `lower()` are overridden by the [`Canvas`](#tkinter.Canvas "tkinter.Canvas") widget, where they restack canvas items instead.

image\_names()[¶](#tkinter.Misc.image_names "Link to this definition")

Return the names of all images that currently exist in the Tcl interpreter.

This is overridden by the [`Text`](#tkinter.Text "tkinter.Text") widget, where `image_names()` returns the names of its embedded images instead.

image\_types()[¶](#tkinter.Misc.image_types "Link to this definition")

Return the available image types, such as `'photo'` and `'bitmap'`.

grid\_anchor(_anchor\=None_)[¶](#tkinter.Misc.grid_anchor "Link to this definition")

Set the anchor that controls where the grid is placed inside this container when the container is larger than the grid and no row or column has a non-zero weight. _anchor_ is one of the usual anchor strings, such as `'nw'` (the default) or `'center'`. Called with no argument, this method has no effect.

[`anchor()`](#tkinter.Misc.anchor "tkinter.Misc.anchor") is an alias of `grid_anchor()`.

Added in version 3.3.

grid\_bbox(_column\=None_, _row\=None_, _col2\=None_, _row2\=None_)[¶](#tkinter.Misc.grid_bbox "Link to this definition")

Return the bounding box, in pixels, of a region of the grid laid out in this container, as a 4-tuple `(xoffset, yoffset, width, height)`. With no arguments the bounding box of the whole grid is returned. If _column_ and _row_ are given, the box spans from the cell at row and column 0 to that cell; if _col2_ and _row2_ are also given, it spans from the cell (_column_, _row_) to the cell (_col2_, _row2_).

[`bbox()`](#tkinter.Misc.bbox "tkinter.Misc.bbox") is an alias of `grid_bbox()`, except on [`Canvas`](#tkinter.Canvas "tkinter.Canvas"), [`Listbox`](#tkinter.Listbox "tkinter.Listbox"), [`Spinbox`](#tkinter.Spinbox "tkinter.Spinbox"), [`Text`](#tkinter.Text "tkinter.Text"), [`ttk.Entry`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Entry "tkinter.ttk.Entry") and [`ttk.Treeview`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Treeview "tkinter.ttk.Treeview"), which provide their own `bbox()` method.

grid\_columnconfigure(_index_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Misc.grid_columnconfigure "Link to this definition")

Query or set the properties of the column (or columns) _index_ of the grid managed by this container. _index_ may be a column number; when setting options it may also be a list of column numbers, the string `'all'` to affect every column, or a child widget whose occupied columns are affected. The supported options are:

_minsize_

The column's minimum size, in pixels.

_weight_

An integer setting how much of any extra space is apportioned to the column. A weight of `0` keeps the column at its requested size, and a column of weight two grows twice as fast as a column of weight one.

_uniform_

The name of a uniform group. Columns sharing a non-empty group name are kept in sizes that are strictly proportional to their weights.

_pad_

Extra space, in pixels, added to the largest widget in the column when computing the column's size.

With a single option name, return that option's value; with no options, return a dictionary of all of them.

[`columnconfigure()`](#tkinter.Misc.columnconfigure "tkinter.Misc.columnconfigure") is an alias of `grid_columnconfigure()`.

grid\_rowconfigure(_index_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Misc.grid_rowconfigure "Link to this definition")

Query or set the properties of the row (or rows) _index_ of the grid managed by this container. _index_ is interpreted as for [`grid_columnconfigure()`](#tkinter.Misc.grid_columnconfigure "tkinter.Misc.grid_columnconfigure"), and the supported options (_minsize_, _weight_, _uniform_ and _pad_) are the same, applied to a row instead of a column.

[`rowconfigure()`](#tkinter.Misc.rowconfigure "tkinter.Misc.rowconfigure") is an alias of `grid_rowconfigure()`.

grid\_location(_x_, _y_)[¶](#tkinter.Misc.grid_location "Link to this definition")

Return the `(column, row)` of the grid cell that contains the pixel at position (_x_, _y_), given in pixels relative to this container. For locations above or to the left of the grid, `-1` is returned for the corresponding coordinate.

grid\_propagate()[¶](#tkinter.Misc.grid_propagate "Link to this definition")

grid\_propagate(_flag_)

Enable or disable geometry propagation for this container when it manages its children with the grid geometry manager. When _flag_ is true, the container resizes itself to fit the requested sizes of its children; when it is false, its size is left under your control. Called with no argument, return the current setting as a boolean.

grid\_size()[¶](#tkinter.Misc.grid_size "Link to this definition")

Return the size of the grid managed by this container as a `(columns, rows)` tuple.

[`size()`](#tkinter.Misc.size "tkinter.Misc.size") is an alias of `grid_size()`, except on the [`Listbox`](#tkinter.Listbox "tkinter.Listbox") widget, which provides its own `size()` method.

grid\_slaves(_row\=None_, _column\=None_)[¶](#tkinter.Misc.grid_slaves "Link to this definition")

Return a list of the child widgets managed in this container's grid, most recently managed first. If _row_ or _column_ is given, only the children in that row or column are returned.

pack\_propagate()[¶](#tkinter.Misc.pack_propagate "Link to this definition")

pack\_propagate(_flag_)

Enable or disable geometry propagation for this container when it manages its children with the pack geometry manager. When _flag_ is true, the container resizes itself to fit the requested sizes of its children; when it is false, its size is left under your control. Called with no argument, return the current setting as a boolean.

[`propagate()`](#tkinter.Misc.propagate "tkinter.Misc.propagate") is an alias of `pack_propagate()`.

pack\_slaves()[¶](#tkinter.Misc.pack_slaves "Link to this definition")

Return a list of the child widgets managed by this container with the pack geometry manager, in packing order.

[`slaves()`](#tkinter.Misc.slaves "tkinter.Misc.slaves") is an alias of `pack_slaves()`.

place\_slaves()[¶](#tkinter.Misc.place_slaves "Link to this definition")

Return a list of the child widgets managed by this container with the place geometry manager.

bind(_sequence\=None_, _func\=None_, _add\=None_)[¶](#tkinter.Misc.bind "Link to this definition")

Bind the event pattern _sequence_ on this widget to the callable _func_.

_sequence_ is an event pattern, such as `'<Button-1>'` (a mouse click) or `'<KeyPress-a>'`, optionally a concatenation of several such patterns that must occur shortly after one another. When the event occurs, _func_ is called with an [`Event`](#tkinter.Event "tkinter.Event") instance describing it as its only argument; if _func_ returns the string `'break'`, no further bindings for the event are invoked.

If _add_ is true, _func_ is added to any functions already bound to _sequence_; otherwise it replaces them. The binding applies only to this widget.

`bind()` returns a string identifier (a _funcid_) that can later be passed to [`unbind()`](#tkinter.Misc.unbind "tkinter.Misc.unbind") to remove the binding without leaking the associated Tcl command.

If _func_ is omitted, return the binding currently associated with _sequence_; if _sequence_ is also omitted, return a list of all the sequences for which bindings exist on this widget.

bind\_class(_className_, _sequence\=None_, _func\=None_, _add\=None_)[¶](#tkinter.Misc.bind_class "Link to this definition")

Like [`bind()`](#tkinter.Misc.bind "tkinter.Misc.bind"), but bind _func_ to the binding tag _className_ rather than to a single widget, so that the binding applies to every widget having that tag. _className_ is usually the name of a widget class, such as `'Button'`, in which case the binding affects all widgets of that class. The set of binding tags for a widget can be inspected and changed with [`bindtags()`](#tkinter.Misc.bindtags "tkinter.Misc.bindtags").

The remaining arguments and the return value are as for [`bind()`](#tkinter.Misc.bind "tkinter.Misc.bind").

bind\_all(_sequence\=None_, _func\=None_, _add\=None_)[¶](#tkinter.Misc.bind_all "Link to this definition")

Like [`bind()`](#tkinter.Misc.bind "tkinter.Misc.bind"), but bind _func_ to the special binding tag `'all'`, so that the binding applies to every widget in the application.

The remaining arguments and the return value are as for [`bind()`](#tkinter.Misc.bind "tkinter.Misc.bind").

unbind(_sequence_, _funcid\=None_)[¶](#tkinter.Misc.unbind "Link to this definition")

Remove bindings for the event pattern _sequence_ on this widget.

If _funcid_ is given, only the function identified by it (a value returned from a previous call to [`bind()`](#tkinter.Misc.bind "tkinter.Misc.bind")) is removed, and its associated Tcl command is deleted. Otherwise all bindings for _sequence_ are destroyed, leaving it unbound.

在 3.13 版本发生变更: If _funcid_ is given, only that callback is unbound; other callbacks bound to _sequence_ are kept.

unbind\_class(_className_, _sequence_)[¶](#tkinter.Misc.unbind_class "Link to this definition")

Remove all bindings for the event pattern _sequence_ from the binding tag _className_. See [`bind_class()`](#tkinter.Misc.bind_class "tkinter.Misc.bind_class").

unbind\_all(_sequence_)[¶](#tkinter.Misc.unbind_all "Link to this definition")

Remove all bindings for the event pattern _sequence_ from the special binding tag `'all'`. See [`bind_all()`](#tkinter.Misc.bind_all "tkinter.Misc.bind_all").

bindtags(_tagList\=None_)[¶](#tkinter.Misc.bindtags "Link to this definition")

If _tagList_ is omitted, return a tuple of the binding tags associated with this widget. When an event occurs in a widget, it is applied to each of the widget's binding tags in order, and for each tag the most specific matching binding is executed. By default a widget has four binding tags: its own pathname, its widget class, the pathname of its nearest toplevel ancestor, and `'all'`, in that order.

If _tagList_ is given, it must be a sequence of strings; the widget's binding tags are set to its elements, which determines the order in which bindings are evaluated.

The methods with the `event_` prefix define virtual events and generate events programmatically.

event\_add(_virtual_, _\*sequences_)[¶](#tkinter.Misc.event_add "Link to this definition")

Associate the virtual event _virtual_, whose name has the form `'<<Paste>>'`, with each of the physical event patterns given by _sequences_, so that the virtual event triggers whenever any of them occurs. If _virtual_ is already defined, the new sequences are added to its existing ones.

event\_delete(_virtual_, _\*sequences_)[¶](#tkinter.Misc.event_delete "Link to this definition")

Remove each of _sequences_ from those associated with the virtual event _virtual_. Sequences that are not currently associated with _virtual_ are ignored. If no _sequences_ are given, all physical event sequences are removed, so that _virtual_ no longer triggers.

event\_generate(_sequence_, _\*\*kw_)[¶](#tkinter.Misc.event_generate "Link to this definition")

Generate the event _sequence_ on this widget and arrange for it to be processed just as if it had come from the window system. _sequence_ must be a single event pattern, such as `'<Button-1>'` or `'<<Paste>>'`, not a concatenation of several. Keyword arguments specify additional fields of the event, for example _x_ and _y_ for the pointer position, or _when_ to control when the event is processed; refer to the Tk `event` manual page for the full list.

event\_info(_virtual\=None_)[¶](#tkinter.Misc.event_info "Link to this definition")

If _virtual_ is omitted, return a tuple of all the virtual events that are currently defined. If _virtual_ is given, return a tuple of the physical event sequences currently associated with it, or an empty tuple if it is not defined.

The methods with the `after` prefix schedule callbacks to run after a delay or when the application is idle.

after(_ms_, _func\=None_, _\*args_, _\*\*kw_)[¶](#tkinter.Misc.after "Link to this definition")

Schedule the callable _func_ to be called after _ms_ milliseconds, with _args_ and _kw_ passed to it as positional and keyword arguments. Return an identifier that can be passed to [`after_cancel()`](#tkinter.Misc.after_cancel "tkinter.Misc.after_cancel") to cancel the call.

If _func_ is omitted, sleep for _ms_ milliseconds instead, processing no events during that time, and return `None`.

在 3.10 版本发生变更: _func_ can now be any callable object, not only a function.

在 3.14 版本发生变更: Keyword arguments are now passed to _func_.

after\_cancel(_id_)[¶](#tkinter.Misc.after_cancel "Link to this definition")

Cancel a callback previously scheduled with [`after()`](#tkinter.Misc.after "tkinter.Misc.after") or [`after_idle()`](#tkinter.Misc.after_idle "tkinter.Misc.after_idle"). _id_ must be an identifier returned by one of those methods; passing a value that is not such an identifier raises [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError"). If the callback has already run or been cancelled, this has no effect.

在 3.7 版本发生变更: Passing `None` (or any false value) as _id_ now raises [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError").

after\_idle(_func_, _\*args_, _\*\*kw_)[¶](#tkinter.Misc.after_idle "Link to this definition")

Schedule the callable _func_ to be called, with _args_ and _kw_ passed to it, when the Tk main loop next becomes idle, that is, when it has no other events to process. Return an identifier that can be passed to [`after_cancel()`](#tkinter.Misc.after_cancel "tkinter.Misc.after_cancel") to cancel the call.

在 3.14 版本发生变更: Keyword arguments are now passed to _func_.

after\_info(_id\=None_)[¶](#tkinter.Misc.after_info "Link to this definition")

If _id_ is omitted, return a tuple of the identifiers of all callbacks currently scheduled with [`after()`](#tkinter.Misc.after "tkinter.Misc.after") and [`after_idle()`](#tkinter.Misc.after_idle "tkinter.Misc.after_idle") for this interpreter.

If _id_ is given, it must identify a callback that has not yet run or been cancelled, and the return value is a tuple `(script, type)`, where _script_ refers to the function to be called and _type_ is either `'idle'` or `'timer'`. A [`TclError`](#tkinter.TclError "tkinter.TclError") is raised if _id_ does not exist.

Added in version 3.13.

mainloop(_n\=0_)[¶](#tkinter.Misc.mainloop "Link to this definition")

Enter the Tk event loop, which processes events until all windows are destroyed. This is normally called once, on the root window, to run the application.

quit()[¶](#tkinter.Misc.quit "Link to this definition")

Quit the Tcl interpreter, causing [`mainloop()`](#tkinter.mainloop "tkinter.mainloop") to return.

update()[¶](#tkinter.Misc.update "Link to this definition")

Enter the event loop until all pending events, including idle callbacks, have been processed. This brings the display up to date and handles any events that are already queued, then returns.

update\_idletasks()[¶](#tkinter.Misc.update_idletasks "Link to this definition")

Enter the event loop until all pending idle callbacks have been called. This updates the display of windows, for example after geometry changes, but does not process events caused by the user.

wait\_variable(_name_)[¶](#tkinter.Misc.wait_variable "Link to this definition")

Wait until the Tcl variable _name_ is modified, continuing to process events in the meantime so that the application stays responsive. _name_ is usually a [`Variable`](#tkinter.Variable "tkinter.Variable") instance, such as an [`IntVar`](#tkinter.IntVar "tkinter.IntVar") or [`StringVar`](#tkinter.StringVar "tkinter.StringVar").

[`waitvar()`](#tkinter.Misc.waitvar "tkinter.Misc.waitvar") is an alias of `wait_variable()`.

wait\_window(_window\=None_)[¶](#tkinter.Misc.wait_window "Link to this definition")

Wait until _window_ is destroyed, continuing to process events in the meantime. If _window_ is omitted, this widget is used. This is typically used to wait for the user to finish interacting with a dialog box.

wait\_visibility(_window\=None_)[¶](#tkinter.Misc.wait_visibility "Link to this definition")

Wait until the visibility state of _window_ changes, for example when it first appears on the screen, continuing to process events in the meantime. If _window_ is omitted, this widget is used. This is typically used to wait for a newly created window to become visible before acting on it.

The methods with the `focus_` prefix manage the keyboard focus.

focus()[¶](#tkinter.Misc.focus "Link to this definition")

Direct the keyboard input focus for this widget's display to this widget. If the application does not currently have the input focus on this widget's display, the widget is remembered as the focus window for its top level, and the focus will be redirected to it the next time the window manager gives the focus to the top level. `focus()` is an alias of `focus_set()`, except on the [`Canvas`](#tkinter.Canvas "tkinter.Canvas") and [`ttk.Treeview`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Treeview "tkinter.ttk.Treeview") widgets, which provide their own `focus()` method.

focus\_force()[¶](#tkinter.Misc.focus_force "Link to this definition")

Direct the keyboard input focus to this widget even if the application does not currently have the input focus for the widget's display. This method should be used sparingly, if at all; normally an application should wait for the window manager to give it the focus rather than claiming it.

focus\_get()[¶](#tkinter.Misc.focus_get "Link to this definition")

Return the widget that currently has the keyboard focus in the application, or `None` if no widget in the application has the focus. Use [`focus_displayof()`](#tkinter.Misc.focus_displayof "tkinter.Misc.focus_displayof") to work correctly with several displays.

focus\_displayof()[¶](#tkinter.Misc.focus_displayof "Link to this definition")

Return the widget that currently has the keyboard focus on the display where this widget is located, or `None` if no widget in the application has the focus on that display.

focus\_lastfor()[¶](#tkinter.Misc.focus_lastfor "Link to this definition")

Return the most recent widget to have had the keyboard focus among all the widgets in the same top level as this widget; this is the widget that will receive the focus the next time the window manager gives the focus to the top level. If no widget in that top level has ever had the focus, or if the most recent focus widget has been deleted, the top level itself is returned.

tk\_focusFollowsMouse()[¶](#tkinter.Misc.tk_focusFollowsMouse "Link to this definition")

Reconfigure Tk to use an implicit focus model in which the focus is set to a widget whenever the mouse pointer enters it. This cannot easily be disabled once enabled.

tk\_focusNext()[¶](#tkinter.Misc.tk_focusNext "Link to this definition")

Return the next widget after this one in the keyboard traversal order, or `None` if there is none. The traversal order goes first to the next child, then recursively to the children of that child, and then to the next sibling higher in the stacking order. A widget is skipped if its `takefocus` option is set to `0`. This method is used in the default bindings for the Tab key.

tk\_focusPrev()[¶](#tkinter.Misc.tk_focusPrev "Link to this definition")

Return the previous widget before this one in the keyboard traversal order, or `None` if there is none. See [`tk_focusNext()`](#tkinter.Misc.tk_focusNext "tkinter.Misc.tk_focusNext") for how the order is defined. This method is used in the default bindings for the Shift\-Tab key.

The methods with the `grab_` prefix set and query the input grab, which directs all input events to a single widget.

grab\_set()[¶](#tkinter.Misc.grab_set "Link to this definition")

Set a local grab on this widget. A grab confines pointer events to this widget and its descendants: while the pointer is outside the widget's subtree, button presses and releases and pointer motion are reported to the grab widget, and windows outside the subtree become insensitive until the grab is released. A local grab affects only the grabbing application. Any grab previously set by this application on the widget's display is automatically released. Setting a grab is the usual way to make a dialog modal: while the grab is in effect the user cannot interact with the other windows of the application.

grab\_set\_global()[¶](#tkinter.Misc.grab_set_global "Link to this definition")

Set a global grab on this widget. A global grab is like the local grab set by [`grab_set()`](#tkinter.Misc.grab_set "tkinter.Misc.grab_set"), but it locks out all other applications on the screen, so that only this widget's subtree is sensitive to pointer events, and it also grabs the keyboard. Use with caution: it is easy to render a display unusable with a global grab, since other applications stop receiving events until it is released.

grab\_release()[¶](#tkinter.Misc.grab_release "Link to this definition")

Release the grab on this widget if there is one; otherwise do nothing.

grab\_current()[¶](#tkinter.Misc.grab_current "Link to this definition")

Return the widget that currently holds the grab in this application for this widget's display, or `None` if there is no such widget.

grab\_status()[¶](#tkinter.Misc.grab_status "Link to this definition")

Return `None` if no grab is currently set on this widget, `"local"` if a local grab is set, or `"global"` if a global grab is set.

The methods with the `selection_` prefix retrieve and manage the X selection.

selection\_clear(_\*\*kw_)[¶](#tkinter.Misc.selection_clear "Link to this definition")

Clear the X selection, so that no window owns it anymore. The selection to clear is given by the keyword argument _selection_, an atom name such as `'PRIMARY'` or `'CLIPBOARD'`; it defaults to `PRIMARY`. The _displayof_ keyword argument names a widget that determines the display on which to operate, and defaults to this widget.

This is overridden by the [`Entry`](#tkinter.Entry "tkinter.Entry"), [`Listbox`](#tkinter.Listbox "tkinter.Listbox") and [`Spinbox`](#tkinter.Spinbox "tkinter.Spinbox") widgets, where `selection_clear()` clears the widget's own selection instead.

selection\_get(_\*\*kw_)[¶](#tkinter.Misc.selection_get "Link to this definition")

Return the contents of the current X selection. The keyword argument _selection_ names the selection and defaults to `PRIMARY`. The keyword argument _type_ specifies the form in which the data is to be returned (the desired conversion target), an atom name such as `'STRING'` or `'FILE_NAME'`; it defaults to `STRING`, except on X11, where `UTF8_STRING` is tried first and `STRING` is used as a fallback. The _displayof_ keyword argument names a widget that determines the display from which to retrieve the selection, and defaults to this widget.

selection\_handle(_command_, _\*\*kw_)[¶](#tkinter.Misc.selection_handle "Link to this definition")

Register _command_ as a handler to supply the X selection owned by this widget when another application requests it. When the selection is retrieved, _command_ is called with two arguments, the starting character offset and the maximum number of characters to return, and must return at most that many characters of the selection starting at that offset; for very long selections it is called repeatedly with increasing offsets. The keyword argument _selection_ names the selection (default `PRIMARY`) and the keyword argument _type_ gives the form of the selection that the handler supplies (such as `'STRING'` or `'FILE_NAME'`, default `STRING`).

selection\_own(_\*\*kw_)[¶](#tkinter.Misc.selection_own "Link to this definition")

Make this widget the owner of the X selection on its display. The previous owner, if any, is notified that it has lost the selection. The keyword argument _selection_ names the selection and defaults to `PRIMARY`.

selection\_own\_get(_\*\*kw_)[¶](#tkinter.Misc.selection_own_get "Link to this definition")

Return the widget in this application that owns the X selection on the display containing this widget, or `None` if no widget in this application owns the selection. The keyword argument _selection_ names the selection and defaults to `PRIMARY`. The _displayof_ keyword argument names a widget that determines the display to query, and defaults to this widget.

The methods with the `clipboard_` prefix manage the clipboard.

clipboard\_append(_string_, _\*\*kw_)[¶](#tkinter.Misc.clipboard_append "Link to this definition")

Append _string_ to the Tk clipboard and claim ownership of the clipboard on this widget's display. Before appending, the clipboard should be emptied with [`clipboard_clear()`](#tkinter.Misc.clipboard_clear "tkinter.Misc.clipboard_clear"); all appends should be completed before returning to the event loop so that the clipboard is updated atomically. The keyword argument _type_ specifies the form of the data, an atom name such as `'STRING'` or `'FILE_NAME'` (default `STRING`), and the keyword argument _format_ specifies the representation used to transmit it (default `STRING`). The _displayof_ keyword argument names a widget that determines the target display, and defaults to this widget. The contents can be retrieved with [`clipboard_get()`](#tkinter.Misc.clipboard_get "tkinter.Misc.clipboard_get") or [`selection_get()`](#tkinter.Misc.selection_get "tkinter.Misc.selection_get").

clipboard\_clear(_\*\*kw_)[¶](#tkinter.Misc.clipboard_clear "Link to this definition")

Claim ownership of the clipboard on this widget's display and remove any previous contents. The _displayof_ keyword argument names a widget that determines the target display, and defaults to this widget.

clipboard\_get(_\*\*kw_)[¶](#tkinter.Misc.clipboard_get "Link to this definition")

Retrieve data from the clipboard on this widget's display. The keyword argument _type_ specifies the form in which the data is to be returned, an atom name such as `'STRING'` or `'FILE_NAME'`; it defaults to `STRING`, except on X11, where `UTF8_STRING` is tried first and `STRING` is used as a fallback. The _displayof_ keyword argument names a widget that determines the display, and defaults to the root window of the application. This is equivalent to `selection_get(selection='CLIPBOARD')`.

The methods with the `option_` prefix query and modify the Tk option database.

option\_add(_pattern_, _value_, _priority\=None_)[¶](#tkinter.Misc.option_add "Link to this definition")

Add an option to the Tk option database that associates _value_ with _pattern_. _pattern_ consists of names and/or classes separated by asterisks or dots, in the usual X format. _priority_ is an integer between 0 and 100, or one of the symbolic names `'widgetDefault'` (20), `'startupFile'` (40), `'userDefault'` (60), or `'interactive'` (80); it defaults to `interactive`.

option\_clear()[¶](#tkinter.Misc.option_clear "Link to this definition")

Clear the Tk option database. Default options from the `RESOURCE_MANAGER` property or the `.Xdefaults` file are reloaded automatically the next time an option is added to or removed from the database.

option\_get(_name_, _className_)[¶](#tkinter.Misc.option_get "Link to this definition")

Return the value of the option matching this widget under _name_ and _className_ from the Tk option database, or an empty string if there is no matching entry. When several entries match, the one with the highest priority is returned, and among entries of equal priority the most recently added one.

option\_readfile(_fileName_, _priority\=None_)[¶](#tkinter.Misc.option_readfile "Link to this definition")

Read the file named _fileName_, which should have the standard format for an X resource database such as `.Xdefaults`, and add all the options it specifies to the Tk option database. _priority_ is interpreted as for [`option_add()`](#tkinter.Misc.option_add "tkinter.Misc.option_add") and defaults to `interactive`.

bell(_displayof\=0_)[¶](#tkinter.Misc.bell "Link to this definition")

Ring the bell on the display for this widget, using the display's current bell-related settings, and reset the screen saver for the screen. If _displayof_ is given as a widget, the bell is rung on that widget's display instead.

tk\_setPalette(_background_, _/_)[¶](#tkinter.Misc.tk_setPalette "Link to this definition")

tk\_setPalette(_\*args_, _\*\*kw_)

Set a new color scheme for all Tk widget elements. Existing widgets are updated and the option database is changed so that future widgets use the new colors. A single color argument is taken as the normal background color, from which a complete palette is computed. Alternatively, the arguments may be given as keyword _name_/_value_ pairs naming individual options in the option database. The recognized option names are `activeBackground`, `activeForeground`, `background`, `disabledForeground`, `foreground`, `highlightBackground`, `highlightColor`, `insertBackground`, `selectColor`, `selectBackground`, `selectForeground`, and `troughColor`; reasonable defaults are computed for any that are not specified.

tk\_bisque()[¶](#tkinter.Misc.tk_bisque "Link to this definition")

Restore the application's colors to the light brown (bisque) color scheme used in Tk 3.6 and earlier versions. Provided for backward compatibility.

tk\_strictMotif(_boolean\=None_)[¶](#tkinter.Misc.tk_strictMotif "Link to this definition")

Query or set whether Tk's look and feel should strictly adhere to Motif. A true _boolean_ value enables strict Motif compliance (for example, no color change when the mouse passes over a slider). Return the resulting setting.

The methods with the `busy_` prefix manage the busy state of a window, which shows a busy cursor and ignores user input.

tk\_busy\_hold(_\*\*kw_)[¶](#tkinter.Misc.tk_busy_hold "Link to this definition")

Make this widget appear busy. A transparent window is placed in front of the widget, so that it and all of its descendants in the widget hierarchy are blocked from pointer events and display a busy cursor. Normally [`update()`](#tkinter.Misc.update "tkinter.Misc.update") should be called immediately afterwards to ensure that the hold operation is in effect before the application starts its processing.

The only supported configuration option is _cursor_, the cursor to be displayed while the widget is busy; it may have any of the values accepted by `configure()`.

[`busy_hold()`](#tkinter.Misc.busy_hold "tkinter.Misc.busy_hold"), [`busy()`](#tkinter.Misc.busy "tkinter.Misc.busy") and [`tk_busy()`](#tkinter.Misc.tk_busy "tkinter.Misc.tk_busy") are aliases of `tk_busy_hold()`.

Added in version 3.13.

tk\_busy\_configure(_cnf\=None_, _\*\*kw_)[¶](#tkinter.Misc.tk_busy_configure "Link to this definition")

Query or modify the configuration options of the busy window. The widget must have been previously made busy by [`tk_busy_hold()`](#tkinter.Misc.tk_busy_hold "tkinter.Misc.tk_busy_hold"). With no arguments, return a dictionary describing all of the available options; if _cnf_ is the name of an option, return a tuple describing that one option. Otherwise set the given options to the given values. Options may have any of the values accepted by `tk_busy_hold()`.

The option database is referenced through the widget name or class. For example, if a [`Frame`](#tkinter.Frame "tkinter.Frame") widget named `frame` is to be made busy, the busy cursor can be specified for it by either of the calls:

w.option\_add('\*frame.busyCursor', 'gumby')
w.option\_add('\*Frame.BusyCursor', 'gumby')

[`busy_configure()`](#tkinter.Misc.busy_configure "tkinter.Misc.busy_configure"), [`busy_config()`](#tkinter.Misc.busy_config "tkinter.Misc.busy_config") and [`tk_busy_config()`](#tkinter.Misc.tk_busy_config "tkinter.Misc.tk_busy_config") are aliases of `tk_busy_configure()`.

Added in version 3.13.

tk\_busy\_cget(_option_)[¶](#tkinter.Misc.tk_busy_cget "Link to this definition")

Return the current value of the busy configuration _option_. The widget must have been previously made busy by [`tk_busy_hold()`](#tkinter.Misc.tk_busy_hold "tkinter.Misc.tk_busy_hold"), and _option_ may have any of the values accepted by that method.

[`busy_cget()`](#tkinter.Misc.busy_cget "tkinter.Misc.busy_cget") is an alias of `tk_busy_cget()`.

Added in version 3.13.

tk\_busy\_forget()[¶](#tkinter.Misc.tk_busy_forget "Link to this definition")

Make this widget no longer busy, releasing the resources (including the transparent window) allocated when it was made busy. User events will again be received by the widget. These resources are also released when the widget is destroyed.

[`busy_forget()`](#tkinter.Misc.busy_forget "tkinter.Misc.busy_forget") is an alias of `tk_busy_forget()`.

Added in version 3.13.

tk\_busy\_status()[¶](#tkinter.Misc.tk_busy_status "Link to this definition")

Return `True` if the widget is currently busy, `False` otherwise.

[`busy_status()`](#tkinter.Misc.busy_status "tkinter.Misc.busy_status") is an alias of `tk_busy_status()`.

Added in version 3.13.

tk\_busy\_current(_pattern\=None_)[¶](#tkinter.Misc.tk_busy_current "Link to this definition")

Return a list of widgets that are currently busy. If _pattern_ is given, only busy widgets whose path names match the pattern are returned.

[`busy_current()`](#tkinter.Misc.busy_current "tkinter.Misc.busy_current") is an alias of `tk_busy_current()`.

Added in version 3.13.

The methods with the `winfo_` prefix retrieve information about windows managed by Tk.

winfo\_atom(_name_, _displayof\=0_)[¶](#tkinter.Misc.winfo_atom "Link to this definition")

Return the integer identifier for the atom whose name is _name_, creating a new atom if none exists. If _displayof_ is given, the atom is looked up on the display of that window; otherwise it is looked up on the display of the application's main window.

winfo\_atomname(_id_, _displayof\=0_)[¶](#tkinter.Misc.winfo_atomname "Link to this definition")

Return the textual name for the atom whose integer identifier is _id_. This is the inverse of [`winfo_atom()`](#tkinter.Misc.winfo_atom "tkinter.Misc.winfo_atom"). If _displayof_ is given, the identifier is looked up on the display of that window; otherwise it is looked up on the display of the application's main window.

winfo\_cells()[¶](#tkinter.Misc.winfo_cells "Link to this definition")

Return the number of cells in the colormap for the widget.

winfo\_children()[¶](#tkinter.Misc.winfo_children "Link to this definition")

Return a list containing the widgets that are children of the widget, in stacking order from lowest to highest. Toplevel windows are returned as children of their logical parents.

winfo\_class()[¶](#tkinter.Misc.winfo_class "Link to this definition")

Return the class name of the widget.

winfo\_colormapfull()[¶](#tkinter.Misc.winfo_colormapfull "Link to this definition")

Return `True` if the colormap for the widget is known to be full, `False` otherwise.

winfo\_containing(_rootX_, _rootY_, _displayof\=0_)[¶](#tkinter.Misc.winfo_containing "Link to this definition")

Return the widget containing the point given by _rootX_ and _rootY_, or `None` if no window in this application contains the point. The coordinates are in screen units in the coordinate system of the root window. If _displayof_ is given, the coordinates refer to the screen containing that window; otherwise they refer to the screen of the application's main window.

winfo\_depth()[¶](#tkinter.Misc.winfo_depth "Link to this definition")

Return the depth of the widget, that is, the number of bits per pixel.

winfo\_exists()[¶](#tkinter.Misc.winfo_exists "Link to this definition")

Return true if the widget exists, false otherwise.

winfo\_fpixels(_number_)[¶](#tkinter.Misc.winfo_fpixels "Link to this definition")

Return a floating-point value giving the number of pixels in the widget corresponding to the screen distance _number_ (for example, `"2.0c"` or `"1i"`). The result may be fractional; for a rounded integer value use [`winfo_pixels()`](#tkinter.Misc.winfo_pixels "tkinter.Misc.winfo_pixels").

winfo\_geometry()[¶](#tkinter.Misc.winfo_geometry "Link to this definition")

Return the geometry of the widget, in the form `widthxheight+x+y`. All dimensions are in pixels. An offset can be negative; see [`geometry()`](#tkinter.Wm.geometry "tkinter.Wm.geometry").

winfo\_height()[¶](#tkinter.Misc.winfo_height "Link to this definition")

Return the height of the widget in pixels. When a window is first created its height is 1 pixel; it is eventually changed by a geometry manager. See also [`winfo_reqheight()`](#tkinter.Misc.winfo_reqheight "tkinter.Misc.winfo_reqheight").

winfo\_id()[¶](#tkinter.Misc.winfo_id "Link to this definition")

Return a low-level platform-specific identifier for the widget. On Unix this is the X window identifier, and on Windows it is the window handle.

winfo\_interps(_displayof\=0_)[¶](#tkinter.Misc.winfo_interps "Link to this definition")

Return a tuple of the names of all Tcl interpreters currently registered for a particular display. If _displayof_ is given, the return value refers to the display of that window; otherwise it refers to the display of the application's main window.

winfo\_ismapped()[¶](#tkinter.Misc.winfo_ismapped "Link to this definition")

Return true if the widget is currently mapped, false otherwise.

winfo\_manager()[¶](#tkinter.Misc.winfo_manager "Link to this definition")

Return the name of the geometry manager currently responsible for the widget, or an empty string if it is not managed by any geometry manager.

winfo\_name()[¶](#tkinter.Misc.winfo_name "Link to this definition")

Return the widget's name within its parent, as opposed to its full path name.

winfo\_parent()[¶](#tkinter.Misc.winfo_parent "Link to this definition")

Return the path name of the widget's parent, or an empty string if the widget is the main window of the application.

winfo\_pathname(_id_, _displayof\=0_)[¶](#tkinter.Misc.winfo_pathname "Link to this definition")

Return the path name of the window whose identifier is _id_. If _displayof_ is given, the identifier is looked up on the display of that window; otherwise it is looked up on the display of the application's main window.

winfo\_pixels(_number_)[¶](#tkinter.Misc.winfo_pixels "Link to this definition")

Return the number of pixels in the widget corresponding to the screen distance _number_ (for example, `"2.0c"` or `"1i"`). The result is rounded to the nearest integer; for a fractional result use [`winfo_fpixels()`](#tkinter.Misc.winfo_fpixels "tkinter.Misc.winfo_fpixels").

winfo\_pointerx()[¶](#tkinter.Misc.winfo_pointerx "Link to this definition")

Return the pointer's _x_ coordinate, in pixels, relative to the screen's root window (or virtual root, if one is in use). Return `-1` if the pointer is not on the same screen as the widget.

winfo\_pointerxy()[¶](#tkinter.Misc.winfo_pointerxy "Link to this definition")

Return the pointer's coordinates as an `(x, y)` tuple, in pixels, relative to the screen's root window (or virtual root, if one is in use). Both coordinates are `-1` if the pointer is not on the same screen as the widget.

winfo\_pointery()[¶](#tkinter.Misc.winfo_pointery "Link to this definition")

Return the pointer's _y_ coordinate, in pixels, relative to the screen's root window (or virtual root, if one is in use). Return `-1` if the pointer is not on the same screen as the widget.

winfo\_reqheight()[¶](#tkinter.Misc.winfo_reqheight "Link to this definition")

Return the widget's requested height in pixels. This is the value used by the widget's geometry manager to compute its geometry.

winfo\_reqwidth()[¶](#tkinter.Misc.winfo_reqwidth "Link to this definition")

Return the widget's requested width in pixels. This is the value used by the widget's geometry manager to compute its geometry.

winfo\_rgb(_color_)[¶](#tkinter.Misc.winfo_rgb "Link to this definition")

Return an `(r, g, b)` tuple of the red, green, and blue intensities, in the range 0 to 65535, that correspond to _color_ in the widget. _color_ may be specified in any of the forms acceptable for a color option.

winfo\_rootx()[¶](#tkinter.Misc.winfo_rootx "Link to this definition")

Return the _x_ coordinate, in the root window of the screen, of the upper-left corner of the widget's border (or of the widget itself if it has no border).

winfo\_rooty()[¶](#tkinter.Misc.winfo_rooty "Link to this definition")

Return the _y_ coordinate, in the root window of the screen, of the upper-left corner of the widget's border (or of the widget itself if it has no border).

winfo\_screen()[¶](#tkinter.Misc.winfo_screen "Link to this definition")

Return the name of the screen associated with the widget, in the form `displayName.screenIndex`.

winfo\_screencells()[¶](#tkinter.Misc.winfo_screencells "Link to this definition")

Return the number of cells in the default colormap for the widget's screen.

winfo\_screendepth()[¶](#tkinter.Misc.winfo_screendepth "Link to this definition")

Return the depth of the root window of the widget's screen, that is, the number of bits per pixel.

winfo\_screenheight()[¶](#tkinter.Misc.winfo_screenheight "Link to this definition")

Return the height of the widget's screen in pixels.

winfo\_screenmmheight()[¶](#tkinter.Misc.winfo_screenmmheight "Link to this definition")

Return the height of the widget's screen in millimeters.

winfo\_screenmmwidth()[¶](#tkinter.Misc.winfo_screenmmwidth "Link to this definition")

Return the width of the widget's screen in millimeters.

winfo\_screenvisual()[¶](#tkinter.Misc.winfo_screenvisual "Link to this definition")

Return the default visual class for the widget's screen, one of `"directcolor"`, `"grayscale"`, `"pseudocolor"`, `"staticcolor"`, `"staticgray"`, or `"truecolor"`.

winfo\_screenwidth()[¶](#tkinter.Misc.winfo_screenwidth "Link to this definition")

Return the width of the widget's screen in pixels.

winfo\_server()[¶](#tkinter.Misc.winfo_server "Link to this definition")

Return a string containing information about the server for the widget's display. The exact format of this string may vary from platform to platform.

winfo\_toplevel()[¶](#tkinter.Misc.winfo_toplevel "Link to this definition")

Return the top-of-hierarchy window containing the widget. In standard Tk this is always a [`Toplevel`](#tkinter.Toplevel "tkinter.Toplevel") widget.

winfo\_viewable()[¶](#tkinter.Misc.winfo_viewable "Link to this definition")

Return true if the widget and all of its ancestors up through the nearest toplevel window are mapped, false otherwise.

winfo\_visual()[¶](#tkinter.Misc.winfo_visual "Link to this definition")

Return the visual class for the widget, one of `"directcolor"`, `"grayscale"`, `"pseudocolor"`, `"staticcolor"`, `"staticgray"`, or `"truecolor"`.

winfo\_visualid()[¶](#tkinter.Misc.winfo_visualid "Link to this definition")

Return the X identifier for the visual for the widget.

winfo\_visualsavailable(_includeids\=False_)[¶](#tkinter.Misc.winfo_visualsavailable "Link to this definition")

Return a list describing the visuals available for the widget's screen. Each item consists of a visual class (see [`winfo_visual()`](#tkinter.Misc.winfo_visual "tkinter.Misc.winfo_visual")) followed by an integer depth. If _includeids_ is true, the X identifier for the visual is also included.

winfo\_vrootheight()[¶](#tkinter.Misc.winfo_vrootheight "Link to this definition")

Return the height of the virtual root window associated with the widget if there is one; otherwise return the height of the widget's screen.

winfo\_vrootwidth()[¶](#tkinter.Misc.winfo_vrootwidth "Link to this definition")

Return the width of the virtual root window associated with the widget if there is one; otherwise return the width of the widget's screen.

winfo\_vrootx()[¶](#tkinter.Misc.winfo_vrootx "Link to this definition")

Return the _x_ offset of the virtual root window associated with the widget, relative to the root window of its screen. This is normally zero or negative, and is `0` if there is no virtual root window.

winfo\_vrooty()[¶](#tkinter.Misc.winfo_vrooty "Link to this definition")

Return the _y_ offset of the virtual root window associated with the widget, relative to the root window of its screen. This is normally zero or negative, and is `0` if there is no virtual root window.

winfo\_width()[¶](#tkinter.Misc.winfo_width "Link to this definition")

Return the width of the widget in pixels. When a window is first created its width is 1 pixel; it is eventually changed by a geometry manager. See also [`winfo_reqwidth()`](#tkinter.Misc.winfo_reqwidth "tkinter.Misc.winfo_reqwidth").

winfo\_x()[¶](#tkinter.Misc.winfo_x "Link to this definition")

Return the _x_ coordinate, in the widget's parent, of the upper-left corner of the widget's border (or of the widget itself if it has no border).

winfo\_y()[¶](#tkinter.Misc.winfo_y "Link to this definition")

Return the _y_ coordinate, in the widget's parent, of the upper-left corner of the widget's border (or of the widget itself if it has no border).

info\_patchlevel()[¶](#tkinter.Misc.info_patchlevel "Link to this definition")

Return the Tcl/Tk patch level as a named tuple with the same five fields as [`sys.version_info`](https://docs.python.org/zh-cn/3/library/sys.html#sys.version_info "sys.version_info"): _major_, _minor_, _micro_, _releaselevel_ and _serial_. _releaselevel_ is `'alpha'`, `'beta'` or `'final'`. Converting it to a string gives the version in the usual Tcl/Tk notation, for example `'9.0.3'` for a final release or `'9.1b2'` for a pre-release.

Added in version 3.11.

_class_ tkinter.Wm[¶](#tkinter.Wm "Link to this definition")

The `Wm` mixin provides access to the window manager, allowing an application to control such things as the title, geometry and icon of a top-level window, the way it is resized, and how it responds to window manager protocols. It is mixed into [`Tk`](#tkinter.Tk "tkinter.Tk") and [`Toplevel`](#tkinter.Toplevel "tkinter.Toplevel"), so its methods are available on every top-level window. Each method has two equivalent spellings: a short name and a `wm_`\-prefixed name (for example, [`title()`](#tkinter.Wm.title "tkinter.Wm.title") and [`wm_title()`](#tkinter.Wm.wm_title "tkinter.Wm.wm_title")). See also [窗口管理器](#tkinter-window-manager).

aspect(_minNumer\=None_, _minDenom\=None_, _maxNumer\=None_, _maxDenom\=None_)[¶](#tkinter.Wm.aspect "Link to this definition")

Constrain the aspect ratio (the ratio of width to height) of the window. If all four arguments are given, the window manager keeps the ratio between `minNumer/minDenom` and `maxNumer/maxDenom`; passing empty strings removes any existing restriction. With no arguments, return a tuple of the four current values, or `None` if no aspect restriction is in effect. [`wm_aspect()`](#tkinter.Wm.wm_aspect "tkinter.Wm.wm_aspect") is an alias of `aspect()`.

attributes(_\*args_, _return\_python\_dict\=False_, _\*\*kwargs_)[¶](#tkinter.Wm.attributes "Link to this definition")

Query or set platform-specific attributes of the window. With no arguments, return the platform-specific flags and their values; pass _return\_python\_dict_ as true to get them as a dictionary. A single option name such as `'alpha'` returns the value of that option, and options are set using keyword arguments (`alpha=0.5`).

The available attributes differ by platform. All platforms support:

_alpha_

The window's opacity, from `0.0` (fully transparent) to `1.0` (opaque). Where transparency is unsupported the value stays at `1.0`.

_appearance_

Whether the window is rendered in dark mode on Windows and macOS: `'auto'`, `'light'` or `'dark'` (this has no effect on X11).

_fullscreen_

Whether the window takes up the entire screen and has no borders.

_topmost_

Whether the window is displayed above all other windows.

Windows additionally supports:

_disabled_

Whether the window is in a disabled state.

_toolwindow_

Whether the window uses the tool window style.

_transparentcolor_

The color that is made fully transparent, or an empty string for none.

macOS additionally supports:

_class_

Whether the underlying Aqua window is an `nswindow` or an `nspanel`; this can only be set before the window is created.

_modified_

The modification state shown by the window's close button and proxy icon.

_notify_

Whether the application's dock icon bounces to request attention.

_stylemask_

The style mask of the underlying Aqua window, given as a list of bit names such as `titled` or `resizable`.

_tabbingid_

The identifier of the tab group that the window belongs to.

_tabbingmode_

Whether the window may be opened as a tab: `'auto'`, `'preferred'` or `'disallowed'`.

_titlepath_

The path of the file represented by the window's proxy icon.

_transparent_

Whether the content area is transparent and the window shadow is turned off.

X11 additionally supports:

_type_

The window type, or a list of types in order of preference, that the window manager should use to interpret the window, such as `'dialog'` or `'splash'`.

_zoomed_

Whether the window is maximized.

备注

Tk 8.6 added the _type_ attribute, and Tk 9.0 added the _appearance_, _class_, _stylemask_, _tabbingid_ and _tabbingmode_ attributes.

On X11 changes are applied asynchronously, so a queried value may not yet reflect the most recent request. [`wm_attributes()`](#tkinter.Wm.wm_attributes "tkinter.Wm.wm_attributes") is an alias of `attributes()`.

在 3.13 版本发生变更: A single attribute may now be queried by name without the leading `-`, and attributes may be set using keyword arguments. The _return\_python\_dict_ parameter was added.

自 3.13 版本弃用: Setting an attribute by passing the option name (with a leading `-`) and its value as two positional arguments, as in `w.attributes('-alpha', 0.5)`, is deprecated; use keyword arguments instead.

client(_name\=None_)[¶](#tkinter.Wm.client "Link to this definition")

Store _name_, which should be the name of the host on which the application is running, in the window's `WM_CLIENT_MACHINE` property for use by the window or session manager. An empty string deletes the property. With no argument, return the last name set, or an empty string. [`wm_client()`](#tkinter.Wm.wm_client "tkinter.Wm.wm_client") is an alias of `client()`.

colormapwindows(_\*wlist_)[¶](#tkinter.Wm.colormapwindows "Link to this definition")

Manipulate the `WM_COLORMAP_WINDOWS` property, which tells the window manager about windows that have private colormaps. If _wlist_ is given, overwrite the property with those windows (their order is a priority order for installing colormaps). With no arguments, return the list of windows currently named in the property. [`wm_colormapwindows()`](#tkinter.Wm.wm_colormapwindows "tkinter.Wm.wm_colormapwindows") is an alias of `colormapwindows()`.

command(_value\=None_)[¶](#tkinter.Wm.command "Link to this definition")

Store _value_ in the window's `WM_COMMAND` property for use by the window or session manager; it should be a list giving the words of the command used to invoke the application. An empty string deletes the property. With no argument, return the last value set, or an empty string. [`wm_command()`](#tkinter.Wm.wm_command "tkinter.Wm.wm_command") is an alias of `command()`.

deiconify()[¶](#tkinter.Wm.deiconify "Link to this definition")

Display the window in normal (non-iconified) form by mapping it. If the window has never been mapped, this ensures it appears de-iconified when it is first mapped. On Windows the window is also raised and given the focus. [`wm_deiconify()`](#tkinter.Wm.wm_deiconify "tkinter.Wm.wm_deiconify") is an alias of `deiconify()`.

focusmodel(_model\=None_)[¶](#tkinter.Wm.focusmodel "Link to this definition")

Set or query the focus model for the window. _model_ is either `'active'` (the window claims the input focus for itself or its descendants, even when the focus is in another application) or `'passive'` (the window relies on the window manager to give it the focus). With no argument, return the current model. The default is `'passive'`, which is what the `focus()` command assumes. [`wm_focusmodel()`](#tkinter.Wm.wm_focusmodel "tkinter.Wm.wm_focusmodel") is an alias of `focusmodel()`.

forget(_window_)[¶](#tkinter.Wm.forget "Link to this definition")

Unmap _window_ from the screen so that it is no longer managed by the window manager. A [`Toplevel`](#tkinter.Toplevel "tkinter.Toplevel") is then treated like a [`Frame`](#tkinter.Frame "tkinter.Frame"), although its `-menu` configuration is remembered and the menu reappears if the widget is managed again. [`wm_forget()`](#tkinter.Wm.wm_forget "tkinter.Wm.wm_forget") is an alias of `forget()`.

Not to be confused with [`Pack.forget()`](#tkinter.Pack.forget "tkinter.Pack.forget").

Added in version 3.3.

frame()[¶](#tkinter.Wm.frame "Link to this definition")

Return the platform-specific window identifier for the outermost decorative frame containing the window, if the window manager has reparented it into such a frame; otherwise return the identifier of the window itself. [`wm_frame()`](#tkinter.Wm.wm_frame "tkinter.Wm.wm_frame") is an alias of `frame()`.

geometry(_newGeometry\=None_)[¶](#tkinter.Wm.geometry "Link to this definition")

Set or query the geometry of the window. _newGeometry_ has the form `=widthxheight+x+y`, where any of `=`, `widthxheight` and the `+x+y` position may be omitted. _width_ and _height_ are in pixels (or grid units for a gridded window); a position preceded by `+` is measured from the left or top edge of the screen and one preceded by `-` from the right or bottom edge. An offset can be negative, as in `'200x100+-9+-8'`, when the window edge is positioned beyond the corresponding screen edge. An empty string cancels any user-specified geometry, letting the window revert to its natural size. With no argument, return the current geometry as a string of the form `'200x200+10+10'`. [`wm_geometry()`](#tkinter.Wm.wm_geometry "tkinter.Wm.wm_geometry") is an alias of `geometry()`.

grid(_baseWidth\=None_, _baseHeight\=None_, _widthInc\=None_, _heightInc\=None_)[¶](#tkinter.Wm.grid "Link to this definition")

Manage the window as a gridded window and define the relationship between grid units and pixels. _baseWidth_ and _baseHeight_ are the numbers of grid units for the window's internally requested size, and _widthInc_ and _heightInc_ are the pixel sizes of a horizontal and vertical grid unit. Empty strings turn off gridded management. With no arguments, return a tuple of the four current values, or `None` if the window is not gridded. [`wm_grid()`](#tkinter.Wm.wm_grid "tkinter.Wm.wm_grid") is an alias of `grid()`.

Not to be confused with the grid geometry manager [`Grid.grid()`](#tkinter.Grid.grid "tkinter.Grid.grid").

group(_pathName\=None_)[¶](#tkinter.Wm.group "Link to this definition")

Set or query the leader of a group of related windows. _pathName_ gives the path name of the group leader; the window manager may, for example, unmap all windows in the group when the leader is iconified. An empty string removes the window from any group. With no argument, return the path name of the current group leader, or an empty string. [`wm_group()`](#tkinter.Wm.wm_group "tkinter.Wm.wm_group") is an alias of `group()`.

iconbitmap(_bitmap\=None_, _default\=None_)[¶](#tkinter.Wm.iconbitmap "Link to this definition")

Set or query the bitmap used by the window manager for the window's icon. _bitmap_ names a bitmap in one of the standard forms accepted by Tk; an empty string cancels the current icon bitmap. With no argument, return the name of the current icon bitmap, or an empty string. On Windows the _default_ argument names an icon (for example an `.ico` file) applied to all top-level windows that have no icon of their own. [`wm_iconbitmap()`](#tkinter.Wm.wm_iconbitmap "tkinter.Wm.wm_iconbitmap") is an alias of `iconbitmap()`.

iconify()[¶](#tkinter.Wm.iconify "Link to this definition")

Iconify the window. If the window has not yet been mapped for the first time, arrange for it to appear in the iconified state when it is eventually mapped. [`wm_iconify()`](#tkinter.Wm.wm_iconify "tkinter.Wm.wm_iconify") is an alias of `iconify()`.

iconmask(_bitmap\=None_)[¶](#tkinter.Wm.iconmask "Link to this definition")

Set or query the bitmap used as a mask for the icon (see [`iconbitmap()`](#tkinter.Wm.iconbitmap "tkinter.Wm.iconbitmap")). Where the mask is zero no icon is displayed; where it is one, the corresponding bits of the icon bitmap are shown. An empty string cancels the current mask. With no argument, return the name of the current icon mask, or an empty string. [`wm_iconmask()`](#tkinter.Wm.wm_iconmask "tkinter.Wm.wm_iconmask") is an alias of `iconmask()`.

iconname(_newName\=None_)[¶](#tkinter.Wm.iconname "Link to this definition")

Set or query the name displayed by the window manager inside the window's icon. With no argument, return the current icon name, or an empty string if none has been set (in which case the window manager normally displays the window's title). [`wm_iconname()`](#tkinter.Wm.wm_iconname "tkinter.Wm.wm_iconname") is an alias of `iconname()`.

iconphoto(_default\=False_, _\*images_)[¶](#tkinter.Wm.iconphoto "Link to this definition")

Set the titlebar icon for the window from one or more [`PhotoImage`](#tkinter.PhotoImage "tkinter.PhotoImage") objects given in _images_. Several images of different sizes (for example 16x16 and 32x32) may be supplied so that the window manager can choose an appropriate one. The image data is taken as a snapshot at the time of the call; later changes to the images are not reflected. If _default_ is true, the icon is also applied to all top-level windows created in the future. On macOS only the first image is used. [`wm_iconphoto()`](#tkinter.Wm.wm_iconphoto "tkinter.Wm.wm_iconphoto") is an alias of `iconphoto()`.

Added in version 3.3.

iconposition(_x\=None_, _y\=None_)[¶](#tkinter.Wm.iconposition "Link to this definition")

Set or query a hint to the window manager about where the window's icon should be positioned. Empty strings cancel an existing hint. With no arguments, return a tuple of the two current values, or `None` if no hint is in effect. [`wm_iconposition()`](#tkinter.Wm.wm_iconposition "tkinter.Wm.wm_iconposition") is an alias of `iconposition()`.

iconwindow(_pathName\=None_)[¶](#tkinter.Wm.iconwindow "Link to this definition")

Set or query the window used as the icon for the window. When the window is iconified, _pathName_ is mapped to serve as its icon and unmapped again when it is de-iconified. An empty string cancels the association. With no argument, return the path name of the current icon window, or an empty string. Not all window managers support icon windows, and the concept is meaningless on non-X11 platforms. [`wm_iconwindow()`](#tkinter.Wm.wm_iconwindow "tkinter.Wm.wm_iconwindow") is an alias of `iconwindow()`.

manage(_widget_)[¶](#tkinter.Wm.manage "Link to this definition")

Make _widget_ a stand-alone top-level window, decorated by the window manager with a title bar and so on. Only [`Frame`](#tkinter.Frame "tkinter.Frame"), [`LabelFrame`](#tkinter.LabelFrame "tkinter.LabelFrame") and [`Toplevel`](#tkinter.Toplevel "tkinter.Toplevel") widgets may be used (the [`tkinter.ttk`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#module-tkinter.ttk "tkinter.ttk: Tk themed widget set") versions are **not** accepted); passing any other widget type raises an error. [`wm_manage()`](#tkinter.Wm.wm_manage "tkinter.Wm.wm_manage") is an alias of `manage()`.

Added in version 3.3.

maxsize(_width\=None_, _height\=None_)[¶](#tkinter.Wm.maxsize "Link to this definition")

Set or query the maximum permissible dimensions of the window, in pixels (or grid units for a gridded window). The window manager restricts the window to be no larger than _width_ and _height_. With no arguments, return a tuple of the current maximum width and height. The maximum size defaults to the size of the screen. [`wm_maxsize()`](#tkinter.Wm.wm_maxsize "tkinter.Wm.wm_maxsize") is an alias of `maxsize()`.

minsize(_width\=None_, _height\=None_)[¶](#tkinter.Wm.minsize "Link to this definition")

Set or query the minimum permissible dimensions of the window, in pixels (or grid units for a gridded window). The window manager restricts the window to be no smaller than _width_ and _height_. With no arguments, return a tuple of the current minimum width and height. The minimum size defaults to one pixel in each dimension. [`wm_minsize()`](#tkinter.Wm.wm_minsize "tkinter.Wm.wm_minsize") is an alias of `minsize()`.

overrideredirect(_boolean\=None_)[¶](#tkinter.Wm.overrideredirect "Link to this definition")

Set or query the override-redirect flag for the window. When this flag is set, the window is ignored by the window manager: it is not reparented into a decorative frame and the user cannot manipulate it through the usual window manager controls. With no argument, return a boolean indicating whether the flag is set, or `None` if it has not been set. The flag is reliably honored only when the window is first mapped or remapped from the withdrawn state. [`wm_overrideredirect()`](#tkinter.Wm.wm_overrideredirect "tkinter.Wm.wm_overrideredirect") is an alias of `overrideredirect()`.

positionfrom(_who\=None_)[¶](#tkinter.Wm.positionfrom "Link to this definition")

Set or query the source of the window's current position. _who_ is either `'program'` or `'user'` and indicates whether the position was requested by the program or by the user; an empty string cancels the current source. With no argument, return the current source, or an empty string if none has been set. Tk automatically sets the source to `'user'` when [`geometry()`](#tkinter.Wm.geometry "tkinter.Wm.geometry") is called, unless it has been set explicitly to `'program'`. [`wm_positionfrom()`](#tkinter.Wm.wm_positionfrom "tkinter.Wm.wm_positionfrom") is an alias of `positionfrom()`.

protocol(_name\=None_, _func\=None_)[¶](#tkinter.Wm.protocol "Link to this definition")

Register _func_ as the handler for the window manager protocol _name_, an atom such as `'WM_DELETE_WINDOW'`, `'WM_SAVE_YOURSELF'` or `'WM_TAKE_FOCUS'`; _func_ is then called whenever the window manager sends a message of that protocol. Tk installs a default `WM_DELETE_WINDOW` handler that destroys the window, which this method can replace. If _func_ is an empty string, the handler is removed. With only _name_, return the name of its registered handler command, or an empty string if none is set (the default `WM_DELETE_WINDOW` handler is not reported); with no arguments, return a tuple of the protocols that currently have handlers. [`wm_protocol()`](#tkinter.Wm.wm_protocol "tkinter.Wm.wm_protocol") is an alias of `protocol()`.

resizable(_width\=None_, _height\=None_)[¶](#tkinter.Wm.resizable "Link to this definition")

Control whether the user may interactively resize the window. _width_ and _height_ are boolean values that determine whether the window's width and height may be changed. With no arguments, return a tuple of two `0`/`1` values indicating whether each dimension is currently resizable. By default a window is resizable in both dimensions. [`wm_resizable()`](#tkinter.Wm.wm_resizable "tkinter.Wm.wm_resizable") is an alias of `resizable()`.

sizefrom(_who\=None_)[¶](#tkinter.Wm.sizefrom "Link to this definition")

Set or query the source of the window's current size. _who_ is either `'program'` or `'user'` and indicates whether the size was requested by the program or by the user; an empty string cancels the current source. With no argument, return the current source, or an empty string if none has been set. [`wm_sizefrom()`](#tkinter.Wm.wm_sizefrom "tkinter.Wm.wm_sizefrom") is an alias of `sizefrom()`.

state(_newstate\=None_)[¶](#tkinter.Wm.state "Link to this definition")

Set or query the state of the window. With no argument, return the current state: one of `'normal'`, `'iconic'`, `'withdrawn'`, `'icon'` or, on Windows and macOS only, `'zoomed'`. `'iconic'` refers to a window that has been iconified, while `'icon'` refers to a window serving as the icon for another window (see [`iconwindow()`](#tkinter.Wm.iconwindow "tkinter.Wm.iconwindow")); the `'icon'` state cannot be set. [`wm_state()`](#tkinter.Wm.wm_state "tkinter.Wm.wm_state") is an alias of `state()`.

Not to be confused with [`ttk.Widget.state`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Widget.state "tkinter.ttk.Widget.state").

title(_string\=None_)[¶](#tkinter.Wm.title "Link to this definition")

Set or query the title for the window, which the window manager should display in the window's title bar. With no argument, return the current title. The title defaults to the window's name. [`wm_title()`](#tkinter.Wm.wm_title "tkinter.Wm.wm_title") is an alias of `title()`.

transient(_master\=None_)[¶](#tkinter.Wm.transient "Link to this definition")

Mark the window as a transient window (such as a pull-down menu or dialog) working on behalf of _master_, the path name of another top-level window. An empty string clears the transient status. With no argument, return the path name of the current master, or an empty string. A transient window mirrors state changes in its master and may be decorated differently by the window manager; it is an error to make a window a transient of itself. [`wm_transient()`](#tkinter.Wm.wm_transient "tkinter.Wm.wm_transient") is an alias of `transient()`.

withdraw()[¶](#tkinter.Wm.withdraw "Link to this definition")

Withdraw the window from the screen, unmapping it and causing the window manager to forget about it. If the window has never been mapped, it is instead mapped in the withdrawn state. It is sometimes necessary to withdraw a window and then re-map it (for example with [`deiconify()`](#tkinter.Wm.deiconify "tkinter.Wm.deiconify")) to make some window managers notice changes to window attributes. [`wm_withdraw()`](#tkinter.Wm.wm_withdraw "tkinter.Wm.wm_withdraw") is an alias of `withdraw()`.

_class_ tkinter.Pack[¶](#tkinter.Pack "Link to this definition")

Geometry manager that arranges widgets by packing them against the sides of their container. The `Pack` mix-in is inherited by all widgets (through [`Widget`](#tkinter.Widget "tkinter.Widget")) and provides the methods for managing a widget with the _pack_ geometry manager. See also [几何管理](#tkinter-geometry-management).

备注

`Pack`, [`Place`](#tkinter.Place "tkinter.Place") and [`Grid`](#tkinter.Grid "tkinter.Grid") all define the short method names `forget()`, `info()`, `slaves()`, `content()` and `propagate()`. On a widget the bare names resolve to the _pack_ manager's versions, since `Pack` and [`Misc`](#tkinter.Misc "tkinter.Misc") precede `Place` and `Grid` in the method resolution order, whatever manager actually manages the widget; and `configure()`/`config()` configure the widget's options, not its geometry. Use the explicit `pack_*`, `grid_*` and `place_*` methods (and `pack`, `grid`, `place` for geometry configuration) to act on a specific geometry manager.

pack\_configure(_cnf\={}_, _\*\*kw_)[¶](#tkinter.Pack.pack_configure "Link to this definition")

pack(_cnf\={}_, _\*\*kw_)[¶](#tkinter.Pack.pack "Link to this definition")

Pack the widget inside its container, positioning it relative to the siblings already packed there. The supported options are:

_side_

Which side of the container to pack the widget against: `'top'` (the default), `'bottom'`, `'left'` or `'right'`.

_fill_

Whether to stretch the widget to fill its parcel: `'none'` (the default), `'x'`, `'y'` or `'both'`.

_expand_

Whether the widget should expand to consume any extra space in its container (a boolean, default false).

_anchor_

Where to position the widget in its parcel when the parcel is larger than the widget: an anchor such as `'n'` or `'sw'` (default `'center'`).

_ipadx_, _ipady_

Internal padding added on the left and right (_ipadx_) or top and bottom (_ipady_) of the widget, as a screen distance (default `0`).

_padx_, _pady_

External padding left on the left and right (_padx_) or top and bottom (_pady_) of the widget, as a screen distance or a pair of two distances for the two sides (default `0`).

_after_

Pack the widget after the given widget in the packing order, using the same container.

_before_

Pack the widget before the given widget in the packing order, using the same container.

_in\__

The container in which to pack the widget; it defaults to the parent widget.

`pack()`, [`configure()`](#tkinter.Pack.configure "tkinter.Pack.configure") and [`config()`](#tkinter.Pack.config "tkinter.Pack.config") are aliases of `pack_configure()`.

pack\_forget()[¶](#tkinter.Pack.pack_forget "Link to this definition")

Unmap the widget and remove it from the packing order, forgetting its packing options. It can be packed again later with [`pack_configure()`](#tkinter.Pack.pack_configure "tkinter.Pack.pack_configure"). [`forget()`](#tkinter.Pack.forget "tkinter.Pack.forget") is an alias of `pack_forget()`, except on [`PanedWindow`](#tkinter.PanedWindow "tkinter.PanedWindow"), [`ttk.Notebook`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Notebook "tkinter.ttk.Notebook") and [`ttk.PanedWindow`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.PanedWindow "tkinter.ttk.PanedWindow"), which provide their own `forget()` method.

Not to be confused with [`Wm.forget()`](#tkinter.Wm.forget "tkinter.Wm.forget").

pack\_info()[¶](#tkinter.Pack.pack_info "Link to this definition")

Return a dictionary of the widget's current packing options. [`info()`](#tkinter.Pack.info "tkinter.Pack.info") is an alias of `pack_info()`.

pack\_propagate()[¶](#tkinter.Pack.pack_propagate "Link to this definition")

pack\_propagate(_flag_)

Same as [`Misc.pack_propagate()`](#tkinter.Misc.pack_propagate "tkinter.Misc.pack_propagate"), treating this widget as a container: enable or disable geometry propagation. [`propagate()`](#tkinter.Pack.propagate "tkinter.Pack.propagate") is an alias of `pack_propagate()`.

pack\_slaves()[¶](#tkinter.Pack.pack_slaves "Link to this definition")

Same as [`Misc.pack_slaves()`](#tkinter.Misc.pack_slaves "tkinter.Misc.pack_slaves"): return the list of widgets packed in this widget. [`slaves()`](#tkinter.Pack.slaves "tkinter.Pack.slaves") is an alias of `pack_slaves()`.

_class_ tkinter.Place[¶](#tkinter.Place "Link to this definition")

Geometry manager that places widgets at explicit positions and sizes within their container. The `Place` mix-in is inherited by all widgets (through [`Widget`](#tkinter.Widget "tkinter.Widget")). See also [几何管理](#tkinter-geometry-management).

place\_configure(_cnf\={}_, _\*\*kw_)[¶](#tkinter.Place.place_configure "Link to this definition")

place(_cnf\={}_, _\*\*kw_)[¶](#tkinter.Place.place "Link to this definition")

Place the widget inside its container at an absolute or relative position. The supported options are:

_x_, _y_

The absolute horizontal and vertical position of the widget's anchor point, as a screen distance (default `0`).

_relx_, _rely_

The horizontal and vertical position of the widget's anchor point as a fraction of the container's width and height, where `0.0` is the left or top edge and `1.0` is the right or bottom edge. If both the absolute and the relative option are given, their values are summed.

_anchor_

Which point of the widget is placed at the given position: an anchor such as `'n'` or `'se'` (default `'nw'`).

_width_, _height_

The absolute width and height of the widget, as a screen distance. By default the widget's requested size is used.

_relwidth_, _relheight_

The width and height of the widget as a fraction of the container's width and height. If both the absolute and the relative option are given, their values are summed.

_bordermode_

How the container's border affects placement: `'inside'` (the default) measures the area inside the border, `'outside'` measures the area including the border, and `'ignore'` uses the official X area.

_in\__

The container relative to which the widget is placed; it must be the widget's parent or a descendant of the parent, and defaults to the parent.

`place()`, [`configure()`](#tkinter.Place.configure "tkinter.Place.configure") and [`config()`](#tkinter.Place.config "tkinter.Place.config") are aliases of `place_configure()`.

place\_forget()[¶](#tkinter.Place.place_forget "Link to this definition")

Unmap the widget and remove it from the placement, forgetting its place options.

place\_info()[¶](#tkinter.Place.place_info "Link to this definition")

Return a dictionary of the widget's current place options.

place\_slaves()[¶](#tkinter.Place.place_slaves "Link to this definition")

Same as [`Misc.place_slaves()`](#tkinter.Misc.place_slaves "tkinter.Misc.place_slaves"): return the list of widgets placed in this widget.

_class_ tkinter.Grid[¶](#tkinter.Grid "Link to this definition")

Geometry manager that arranges widgets in a two-dimensional grid of rows and columns within their container. The `Grid` mix-in is inherited by all widgets (through [`Widget`](#tkinter.Widget "tkinter.Widget")). See also [几何管理](#tkinter-geometry-management).

grid\_configure(_cnf\={}_, _\*\*kw_)[¶](#tkinter.Grid.grid_configure "Link to this definition")

grid(_cnf\={}_, _\*\*kw_)[¶](#tkinter.Grid.grid "Link to this definition")

Position the widget in a cell of its container's grid.

Not to be confused with [`Wm.grid()`](#tkinter.Wm.grid "tkinter.Wm.grid").

The supported options are:

_row_, _column_

The row and column of the cell to place the widget in, counting from `0`. _column_ defaults to the column after the previous widget placed in the same `grid_configure()` call (or `0`), and _row_ defaults to the next empty row.

_rowspan_, _columnspan_

The number of rows and columns the widget should span (default `1`).

_sticky_

How to position or stretch the widget when its cell is larger than the widget: a string containing zero or more of the characters `'n'`, `'s'`, `'e'` and `'w'`, naming the cell sides the widget sticks to. Specifying both `'n'` and `'s'` (or `'e'` and `'w'`) stretches the widget to fill the height (or width) of the cell. The default is `''`, which centers the widget at its requested size.

_ipadx_, _ipady_

Internal padding added on the left and right (_ipadx_) or top and bottom (_ipady_) of the widget, as a screen distance (default `0`).

_padx_, _pady_

External padding left on the left and right (_padx_) or top and bottom (_pady_) of the widget, as a screen distance or a pair of two distances for the two sides (default `0`).

_in\__

The container in whose grid to place the widget; it defaults to the parent widget.

`grid()`, [`configure()`](#tkinter.Grid.configure "tkinter.Grid.configure") and [`config()`](#tkinter.Grid.config "tkinter.Grid.config") are aliases of `grid_configure()`.

grid\_forget()[¶](#tkinter.Grid.grid_forget "Link to this definition")

Unmap the widget and remove it from the grid, forgetting its grid options.

grid\_remove()[¶](#tkinter.Grid.grid_remove "Link to this definition")

Unmap the widget and remove it from the grid, but remember its grid options so that it is restored to the same cell if it is gridded again.

grid\_info()[¶](#tkinter.Grid.grid_info "Link to this definition")

Return a dictionary of the widget's current grid options.

grid\_bbox(_column\=None_, _row\=None_, _col2\=None_, _row2\=None_)[¶](#tkinter.Grid.grid_bbox "Link to this definition")

Same as [`Misc.grid_bbox()`](#tkinter.Misc.grid_bbox "tkinter.Misc.grid_bbox"). [`bbox()`](#tkinter.Grid.bbox "tkinter.Grid.bbox") is an alias of `grid_bbox()`, except on [`Canvas`](#tkinter.Canvas "tkinter.Canvas"), [`Listbox`](#tkinter.Listbox "tkinter.Listbox"), [`Spinbox`](#tkinter.Spinbox "tkinter.Spinbox"), [`Text`](#tkinter.Text "tkinter.Text"), [`ttk.Entry`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Entry "tkinter.ttk.Entry") and [`ttk.Treeview`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Treeview "tkinter.ttk.Treeview"), which provide their own `bbox()` method.

grid\_columnconfigure(_index_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Grid.grid_columnconfigure "Link to this definition")

Same as [`Misc.grid_columnconfigure()`](#tkinter.Misc.grid_columnconfigure "tkinter.Misc.grid_columnconfigure"): query or set the options (such as _weight_, _minsize_, _pad_ and _uniform_) of a grid column. [`columnconfigure()`](#tkinter.Grid.columnconfigure "tkinter.Grid.columnconfigure") is an alias of `grid_columnconfigure()`.

grid\_rowconfigure(_index_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Grid.grid_rowconfigure "Link to this definition")

Same as [`Misc.grid_rowconfigure()`](#tkinter.Misc.grid_rowconfigure "tkinter.Misc.grid_rowconfigure"): query or set the options of a grid row. [`rowconfigure()`](#tkinter.Grid.rowconfigure "tkinter.Grid.rowconfigure") is an alias of `grid_rowconfigure()`.

grid\_location(_x_, _y_)[¶](#tkinter.Grid.grid_location "Link to this definition")

Same as [`Misc.grid_location()`](#tkinter.Misc.grid_location "tkinter.Misc.grid_location"): return the `(column, row)` of the cell that covers the pixel at _x_, _y_. [`location()`](#tkinter.Grid.location "tkinter.Grid.location") is an alias of `grid_location()`.

grid\_size()[¶](#tkinter.Grid.grid_size "Link to this definition")

Same as [`Misc.grid_size()`](#tkinter.Misc.grid_size "tkinter.Misc.grid_size"): return a `(columns, rows)` tuple giving the size of the grid. [`size()`](#tkinter.Grid.size "tkinter.Grid.size") is an alias of `grid_size()`, except on the [`Listbox`](#tkinter.Listbox "tkinter.Listbox") widget, which provides its own `size()` method.

grid\_propagate()[¶](#tkinter.Grid.grid_propagate "Link to this definition")

grid\_propagate(_flag_)

Same as [`Misc.grid_propagate()`](#tkinter.Misc.grid_propagate "tkinter.Misc.grid_propagate").

grid\_slaves(_row\=None_, _column\=None_)[¶](#tkinter.Grid.grid_slaves "Link to this definition")

Same as [`Misc.grid_slaves()`](#tkinter.Misc.grid_slaves "tkinter.Misc.grid_slaves"): return the widgets managed in the grid, optionally restricted to a _row_ and/or _column_.

_class_ tkinter.XView[¶](#tkinter.XView "Link to this definition")

Mix-in providing the horizontal-scrolling interface shared by widgets such as [`Entry`](#tkinter.Entry "tkinter.Entry"), [`Canvas`](#tkinter.Canvas "tkinter.Canvas"), [`Listbox`](#tkinter.Listbox "tkinter.Listbox"), [`Text`](#tkinter.Text "tkinter.Text") and [`Spinbox`](#tkinter.Spinbox "tkinter.Spinbox"). A widget's [`xview()`](#tkinter.XView.xview "tkinter.XView.xview") method is registered as the _command_ of a horizontal [`Scrollbar`](#tkinter.Scrollbar "tkinter.Scrollbar").

xview(_\*args_)[¶](#tkinter.XView.xview "Link to this definition")

Query or change the horizontal position of the view. With no arguments, return a tuple `(first, last)` of two fractions between 0 and 1 giving the portion of the document that is currently visible. Otherwise the arguments are passed to the Tk `xview` widget command and are usually generated by a scrollbar; [`xview_moveto()`](#tkinter.XView.xview_moveto "tkinter.XView.xview_moveto") and [`xview_scroll()`](#tkinter.XView.xview_scroll "tkinter.XView.xview_scroll") provide a more convenient interface.

xview\_moveto(_fraction_)[¶](#tkinter.XView.xview_moveto "Link to this definition")

Adjust the view so that _fraction_ of the total width of the document is off-screen to the left. _fraction_ is a number between 0 and 1.

xview\_scroll(_number_, _what_)[¶](#tkinter.XView.xview_scroll "Link to this definition")

Shift the view left or right by _number_ units. _what_ is either `'units'` or `'pages'`; a negative _number_ scrolls left and a positive one scrolls right.

_class_ tkinter.YView[¶](#tkinter.YView "Link to this definition")

Mix-in providing the vertical-scrolling interface shared by widgets such as [`Canvas`](#tkinter.Canvas "tkinter.Canvas"), [`Listbox`](#tkinter.Listbox "tkinter.Listbox") and [`Text`](#tkinter.Text "tkinter.Text"). A widget's [`yview()`](#tkinter.YView.yview "tkinter.YView.yview") method is registered as the _command_ of a vertical [`Scrollbar`](#tkinter.Scrollbar "tkinter.Scrollbar").

yview(_\*args_)[¶](#tkinter.YView.yview "Link to this definition")

Query or change the vertical position of the view. With no arguments, return a tuple `(first, last)` of two fractions between 0 and 1 giving the portion of the document that is currently visible. Otherwise the arguments are passed to the Tk `yview` widget command, usually generated by a scrollbar; [`yview_moveto()`](#tkinter.YView.yview_moveto "tkinter.YView.yview_moveto") and [`yview_scroll()`](#tkinter.YView.yview_scroll "tkinter.YView.yview_scroll") provide a more convenient interface.

yview\_moveto(_fraction_)[¶](#tkinter.YView.yview_moveto "Link to this definition")

Adjust the view so that _fraction_ of the total height of the document is off-screen above the top. _fraction_ is a number between 0 and 1.

yview\_scroll(_number_, _what_)[¶](#tkinter.YView.yview_scroll "Link to this definition")

Shift the view up or down by _number_ units. _what_ is either `'units'` or `'pages'`; a negative _number_ scrolls up and a positive one scrolls down.

_class_ tkinter.BaseWidget(_master_, _widgetName_, _cnf\={}_, _kw\={}_, _extra\=()_)[¶](#tkinter.BaseWidget "Link to this definition")

Internal base class for all widgets. It inherits from [`Misc`](#tkinter.Misc "tkinter.Misc") and adds the machinery that creates the underlying Tk widget; application code normally uses [`Widget`](#tkinter.Widget "tkinter.Widget") or a concrete widget class rather than instantiating `BaseWidget` directly.

destroy()[¶](#tkinter.BaseWidget.destroy "Link to this definition")

Destroy this widget and all of its children, removing the corresponding Tk widgets and deleting the associated Tcl commands.

_class_ tkinter.Widget(_master_, _widgetName_, _cnf\={}_, _kw\={}_, _extra\=()_)[¶](#tkinter.Widget "Link to this definition")

Internal base class for the standard widgets. It combines [`BaseWidget`](#tkinter.BaseWidget "tkinter.BaseWidget") with the geometry-manager mix-ins [`Pack`](#tkinter.Pack "tkinter.Pack"), [`Place`](#tkinter.Place "tkinter.Place") and [`Grid`](#tkinter.Grid "tkinter.Grid"), so that every widget can be managed by any of the three geometry managers. The concrete widget classes ([`Button`](#tkinter.Button "tkinter.Button"), [`Label`](#tkinter.Label "tkinter.Label"), and so on) derive from `Widget`.

### Toplevel widgets[¶](#toplevel-widgets "Link to this heading")

_class_ tkinter.Tk(_screenName\=None_, _baseName\=None_, _className\='Tk'_, _useTk\=True_, _sync\=False_, _use\=None_)[¶](#tkinter.Tk "Link to this definition")

Construct a toplevel Tk widget, which is usually the main window of an application, and initialize a Tcl interpreter for this widget. Each instance has its own associated Tcl interpreter. Inherits from [`Misc`](#tkinter.Misc "tkinter.Misc") and [`Wm`](#tkinter.Wm "tkinter.Wm").

To create a Tcl interpreter without initializing the Tk subsystem, use the [`Tcl()`](#tkinter.Tcl "tkinter.Tcl") factory function instead.

[`Tk`](#tkinter.Tk "tkinter.Tk") 类通常全部使用默认值来初始化。 不过，目前还可识别下列关键字参数:

_screenName_

当（作为字符串）给出时，设置 `DISPLAY` 环境变量。 （仅限 X11）

_baseName_

预置文件的名称。 在默认情况下，_baseName_ 是来自于程序名称 (`sys.argv[0]`)。

_className_

控件类的名称。 会被用作预置文件同时也作为 Tcl 唤起的名称 (_interp_ 中的 _argv0_)。

_useTk_

如果为 `True`，则初始化 Tk 子系统。 [`tkinter.Tcl()`](#tkinter.Tcl "tkinter.Tcl") 函数会将其设为 `False`。

_sync_

如果为 `True`，则同步执行所有 X 服务器命令，以便立即报告错误。 可被用于调试。 （仅限 X11）

_use_

Specifies the _id_ of the window in which to embed the application, instead of it being created as an independent toplevel window. _id_ must be specified in the same way as the value for the -use option for toplevel widgets (that is, it has a form like that returned by [`winfo_id()`](#tkinter.Misc.winfo_id "tkinter.Misc.winfo_id")).

请注意在某些平台上只有当 _id_ 是指向一个启用了 -container 选项的 Tk 框架或顶层窗口时此参数才能正确生效。

[`Tk`](#tkinter.Tk "tkinter.Tk") 读取并解释预置文件，其名称为 `._className_.tcl` 和 `._baseName_.tcl`，进入 Tcl 解释器并基于 `._className_.py` 和 `._baseName_.py` 的内容来调用 [`exec()`](https://docs.python.org/zh-cn/3/builtins/functions.html#exec "exec")。 预置文件的路径为 `HOME` 环境变量，或者如果它未被定义，则为 [`os.curdir`](https://docs.python.org/zh-cn/3/library/os.html#os.curdir "os.curdir")。

备注

On Windows, creating a Tcl interpreter (by instantiating `Tk` or calling [`Tcl()`](#tkinter.Tcl "tkinter.Tcl")) sets the `HOME` environment variable for the process, if it is not already set, to `%HOMEDRIVE%%HOMEPATH%` (or `USERPROFILE`, or `c:\`). This is done by Tcl and can affect other code that reads `HOME`.

tk[¶](#tkinter.Tk.tk "Link to this definition")

通过实例化 [`Tk`](#tkinter.Tk "tkinter.Tk") 创建的 Tk 应用程序对象。 这提供了对 Tcl 解释器的访问。 每个被附加到相同 `Tk` 实例的控件都具有相同的 [`tk`](#tkinter.Tk.tk "tkinter.Tk.tk") 属性值。

master[¶](#tkinter.Tk.master "Link to this definition")

The widget object that contains this widget. For `Tk`, the `master` is [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None") because it is the main window. The terms _master_ and _parent_ are similar and sometimes used interchangeably as argument names; however, calling [`winfo_parent()`](#tkinter.Misc.winfo_parent "tkinter.Misc.winfo_parent") returns a string of the widget name whereas `master` returns the object. _parent_/_child_ reflects the tree-like relationship while _master_ (or _container_)/_content_ reflects the container structure.

children[¶](#tkinter.Tk.children "Link to this definition")

以 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict") 表示的此控件的直接下级其中的键为子控件名称而值为子实例对象。

destroy()[¶](#tkinter.Tk.destroy "Link to this definition")

Destroy this and all descendant widgets and, for the main window, end the connection to the underlying Tcl interpreter.

loadtk()[¶](#tkinter.Tk.loadtk "Link to this definition")

Finish loading and initializing the Tk subsystem. This is needed only when the interpreter was created without Tk (for example through [`Tcl()`](#tkinter.Tcl "tkinter.Tcl")); it is called automatically when _useTk_ is true.

readprofile(_baseName_, _className_)[¶](#tkinter.Tk.readprofile "Link to this definition")

Read and source the user's profile files `._className_.tcl` and `._baseName_.tcl` into the Tcl interpreter, and execute the corresponding `._className_.py` and `._baseName_.py` files. This is called during initialization; see the description of the constructor above.

report\_callback\_exception(_exc_, _val_, _tb_)[¶](#tkinter.Tk.report_callback_exception "Link to this definition")

Report a callback exception. This is called when an exception propagates out of a Tkinter callback; _exc_, _val_ and _tb_ are the exception type, value and traceback as returned by [`sys.exc_info()`](https://docs.python.org/zh-cn/3/library/sys.html#sys.exc_info "sys.exc_info"). The default implementation prints a traceback to [`sys.stderr`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stderr "sys.stderr"). It can be overridden to customize error handling, for example to display the traceback in a dialog.

_class_ tkinter.Toplevel(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Toplevel "Link to this definition")

A `Toplevel` widget is a top-level window, similar to a [`Frame`](#tkinter.Frame "tkinter.Frame") except that its X parent is the root window of a screen rather than its logical parent. Its primary purpose is to serve as a container for dialog boxes and other collections of widgets; its only visible features are its background and an optional 3-D border. Notable options include _menu_, which installs a [`Menu`](#tkinter.Menu "tkinter.Menu") as the window's menubar. Inherits from [`BaseWidget`](#tkinter.BaseWidget "tkinter.BaseWidget") and [`Wm`](#tkinter.Wm "tkinter.Wm"), so a toplevel is managed by the window manager. Refer to the Tk `toplevel` manual page for the full list of options.

### Widget classes[¶](#widget-classes "Link to this heading")

_class_ tkinter.Button(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Button "Link to this definition")

A `Button` widget displays a textual string, bitmap or image and invokes a command when the user presses it (by clicking mouse button 1 over the button or, when the button has focus, by pressing the space key). Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget"). In addition to the standard widget options, a button accepts the options documented in the Tk `button` manual page, such as _command_ (the callback invoked when the button is pressed), _textvariable_, _state_ and _default_.

invoke()[¶](#tkinter.Button.invoke "Link to this definition")

Invoke the command associated with the button, if there is one, and return its result, or an empty string if no command is associated with the button. This is ignored if the button's state is `disabled`.

flash()[¶](#tkinter.Button.flash "Link to this definition")

Flash the button by redisplaying it several times, alternating between the active and normal colors. At the end of the flash the button is left in the same normal or active state as when the method was called. This is ignored if the button's state is `disabled`.

_class_ tkinter.Canvas(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Canvas "Link to this definition")

A `Canvas` widget implements structured graphics. It displays any number of _items_, such as arcs, lines, ovals, polygons, rectangles, text, bitmaps, images and embedded windows, which may be drawn, moved, re-colored and bound to events. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget"), [`XView`](#tkinter.XView "tkinter.XView") and [`YView`](#tkinter.YView "tkinter.YView"), so the view can be scrolled horizontally and vertically with [`xview()`](#tkinter.XView.xview "tkinter.XView.xview") and [`yview()`](#tkinter.YView.yview "tkinter.YView.yview"). Refer to the Tk `canvas` manual page for the full list of widget and item options.

Each item has a unique integer _id_, assigned when it is created, and zero or more string _tags_. A tag is an arbitrary string that does not have the form of an integer; the same tag may be shared by many items, which makes tags convenient for grouping items. The special tag `'all'` matches every item in the canvas, and `'current'` matches the topmost item under the mouse pointer. Most methods take a _tagOrId_ argument that may be an integer id naming a single item, or a tag naming zero or more items; as described in the Tk `canvas` manual page, a tag may also be a logical expression of tags combined with the operators `&&`, `||`, `^`, `!` and parentheses. When a method that operates on a single item is given a _tagOrId_ matching several items, it normally uses the lowest matching item in the display list.

The items are kept in a _display list_ that determines drawing order: items later in the list are drawn on top of earlier ones. A newly created item is placed at the top of the list; the order can be changed with [`tag_raise()`](#tkinter.Canvas.tag_raise "tkinter.Canvas.tag_raise") and [`tag_lower()`](#tkinter.Canvas.tag_lower "tkinter.Canvas.tag_lower").

create\_arc(_\*args_, _\*\*kw_)[¶](#tkinter.Canvas.create_arc "Link to this definition")

create\_bitmap(_\*args_, _\*\*kw_)[¶](#tkinter.Canvas.create_bitmap "Link to this definition")

create\_image(_\*args_, _\*\*kw_)[¶](#tkinter.Canvas.create_image "Link to this definition")

create\_line(_\*args_, _\*\*kw_)[¶](#tkinter.Canvas.create_line "Link to this definition")

create\_oval(_\*args_, _\*\*kw_)[¶](#tkinter.Canvas.create_oval "Link to this definition")

create\_polygon(_\*args_, _\*\*kw_)[¶](#tkinter.Canvas.create_polygon "Link to this definition")

create\_rectangle(_\*args_, _\*\*kw_)[¶](#tkinter.Canvas.create_rectangle "Link to this definition")

create\_text(_\*args_, _\*\*kw_)[¶](#tkinter.Canvas.create_text "Link to this definition")

create\_window(_\*args_, _\*\*kw_)[¶](#tkinter.Canvas.create_window "Link to this definition")

Create a new item of the corresponding type and return its integer id. Each method is called as `create_TYPE(coord..., **options)`: the leading positional arguments give the coordinates that define the item (as separate numbers, as a single sequence of numbers, or as coordinate pairs), and the keyword arguments set item-specific options. Coordinates and screen distances may be given as numbers (interpreted as pixels) or as strings with a unit suffix (`'m'`, `'c'`, `'i'` or `'p'` for millimetres, centimetres, inches or printer's points), but are always stored and returned in pixels.

The item types are: `arc` (an arc-shaped region that is a section of an oval, defined by two diagonally opposite corners `x1, y1, x2, y2` of the enclosing rectangle); `bitmap` (a two-color bitmap positioned at a point `x, y`); `image` (a Tk image positioned at a point `x, y`); `line` (a line or curve through the points `x1, y1, ..., xn, yn`); `oval` (a circle or ellipse inscribed in the rectangle `x1, y1, x2, y2`); `polygon` (a closed polygon through the points `x1, y1, ..., xn, yn`); `rectangle` (a rectangle with corners `x1, y1, x2, y2`); `text` (a string of text positioned at a point `x, y`); and `window` (a child widget embedded in the canvas at a point `x, y`, specified with the _window_ option).

Most item types accept a common set of _standard item options_, plus a few options specific to each type. Option names are passed as keyword arguments, without the leading hyphen.

The standard item options are:

_fill_

The color used to fill the item's interior, or to draw a _line_ item or the characters of a _text_ item. An empty string (the default for all types except _line_ and _text_) leaves the item unfilled.

_outline_

The color used to draw the item's outline. An empty string draws no outline.

_width_

The width of the outline, defaulting to `1.0`. Has no effect if _outline_ is empty.

_dash_

A dash pattern for the outline, given either as a sequence of segment lengths in pixels or as a string of the characters `'.'`, `','`, `'-'`, `'_'` and space. An empty pattern (the default) draws a solid outline.

_dashoffset_

The starting offset in pixels into the _dash_ pattern. Ignored if there is no _dash_ pattern.

_stipple_

A bitmap used as a stipple pattern when filling the item. Only well supported on X11.

_outlinestipple_

A bitmap used as a stipple pattern when drawing the outline. Has no effect if _outline_ is empty.

_offset_, _outlineoffset_

The offset of the fill and outline stipple patterns, given as `'x,y'` or as a side such as `'n'`, `'se'` or `'center'`. Stipple offsets are only supported on X11.

_state_

Overrides the canvas state for this item; one of `'normal'`, `'disabled'` or `'hidden'`.

_tags_

A single tag or a sequence of tags to associate with the item, replacing any existing tags.

Many of these options have _active..._ and _disabled..._ variants (such as _activefill_, _disabledfill_, _activewidth_, _disableddash_, _activeoutline_, _disabledstipple_) that override the base option when the item is the active item (under the mouse pointer) or is in the disabled state.

The following item types support additional options.

For `arc` items:

_start_

The start of the arc's angular range, in degrees measured counter-clockwise from the 3-o'clock position.

_extent_

The size of the angular range, in degrees counter-clockwise from _start_.

_style_

How the arc is drawn: `'pieslice'` (the default), `'chord'` or `'arc'`.

For `line` items:

_arrow_

Where to draw arrowheads: `'none'` (the default), `'first'`, `'last'` or `'both'`.

_arrowshape_

A sequence of three distances describing the shape of the arrowheads.

_capstyle_

How line ends are drawn: `'butt'` (the default), `'projecting'` or `'round'`.

_joinstyle_

How line vertices are drawn: `'round'` (the default), `'bevel'` or `'miter'`.

_smooth_

The smoothing method: a false value (the default) for no smoothing, or `'true'`/`'bezier'` or `'raw'` to draw the line as a curve.

_splinesteps_

The number of line segments approximating each spline when _smooth_ is enabled.

For `polygon` items:

_joinstyle_, _smooth_, _splinesteps_

As for `line` items, applied to the polygon's outline.

For `text` items:

_text_

The string to display; newline characters start new lines.

_font_

The font used for the text.

_justify_

How lines are justified: `'left'` (the default), `'right'` or `'center'`.

_anchor_

How the text is positioned relative to its point, defaulting to `'center'`.

_width_

The maximum line length; if non-zero, lines are wrapped at spaces.

_angle_

How many degrees to rotate the text counter-clockwise about its positioning point, from `0.0` to `360.0` (default `0.0`).

_underline_

The index of a character to underline, or `-1` for none.

For `bitmap` items:

_bitmap_

The bitmap to display.

_anchor_

How the bitmap is positioned relative to its point.

_background_, _foreground_

The colors used for the bitmap's `0` and `1` pixels; an empty _background_ makes the `0` pixels transparent. Both have _active..._ and _disabled..._ variants, and _bitmap_ has _activebitmap_ and _disabledbitmap_ variants.

For `image` items:

_image_

The Tk image to display, previously created with the image protocols.

_anchor_

How the image is positioned relative to its point.

Both options have _active..._ and _disabled..._ variants (_activeimage_, _disabledimage_) used in the active and disabled states.

For `window` items:

_window_

The widget to embed; it must be a child of the canvas or of one of its ancestors, and may not be a top-level window.

_anchor_

How the window is positioned relative to its point.

_width_, _height_

The size to assign to the window; if zero (the default), the window is given its requested size.

`oval` and `rectangle` items have no type-specific options; they use only the standard item options.

备注

Tk 8.6 added the _angle_ option and Tk 9.0 added the _underline_ option for `text` items.

coords(_tagOrId_)[¶](#tkinter.Canvas.coords "Link to this definition")

coords(_tagOrId_, _coordList_, _/_)

coords(_tagOrId_, _/_, _\*coordList_)

Query or modify the coordinates of an item. With only _tagOrId_, return a list of the floating-point coordinates of the item given by _tagOrId_ (the first matching item if it matches several). Given new coordinates, replace the coordinates of that item with them; like the `create_*` methods, the coordinates may be given as separate numbers, as a single sequence, or as coordinate pairs. The returned coordinates are always in pixels, regardless of the units used to specify them; for rectangles, ovals and arcs they are ordered left, top, right, bottom.

在 3.12 版本发生变更: The arguments are now flattened: the coordinates may be given as separate arguments, as a single sequence, or grouped in pairs, like the `create_*` methods.

move(_tagOrId_, _xAmount_, _yAmount_, _/_)[¶](#tkinter.Canvas.move "Link to this definition")

Move each of the items given by _tagOrId_ in the canvas coordinate space by adding _xAmount_ to every x-coordinate and _yAmount_ to every y-coordinate of the item.

moveto(_tagOrId_, _x\=''_, _y\=''_)[¶](#tkinter.Canvas.moveto "Link to this definition")

Move the items given by _tagOrId_ so that the first coordinate pair (the upper-left corner of the bounding box) of the lowest matching item is at position (_x_, _y_). _x_ or _y_ may be an empty string, in which case the corresponding coordinate is unchanged. All matching items keep their positions relative to each other.

Added in version 3.8.

scale(_tagOrId_, _xOrigin_, _yOrigin_, _xScale_, _yScale_, _/_)[¶](#tkinter.Canvas.scale "Link to this definition")

Rescale the coordinates of all items given by _tagOrId_ in canvas coordinate space. Each x-coordinate is adjusted so that its distance from _xOrigin_ changes by a factor of _xScale_, and each y-coordinate so that its distance from _yOrigin_ changes by a factor of _yScale_ (a factor of `1.0` leaves the coordinate unchanged).

delete(_\*tagOrIds_)[¶](#tkinter.Canvas.delete "Link to this definition")

Delete each of the items given by the _tagOrIds_ arguments.

dchars(_tagOrId_, _first_, _/_)[¶](#tkinter.Canvas.dchars "Link to this definition")

dchars(_tagOrId_, _first_, _last_, _/_)

Delete from each of the items given by _tagOrId_ the characters (for text items) or coordinates (for line and polygon items) in the range from _first_ to _last_ inclusive; _last_ defaults to _first_. Items that do not support indexing ignore this operation.

insert(_tagOrId_, _beforeThis_, _string_, _/_)[¶](#tkinter.Canvas.insert "Link to this definition")

Insert _string_ into each of the items given by _tagOrId_ just before the character or coordinate whose index is _beforeThis_. For line and polygon items _string_ must be a valid sequence of coordinates.

itemcget(_tagOrId_, _option_)[¶](#tkinter.Canvas.itemcget "Link to this definition")

Return the current value of the configuration option _option_ for the item given by _tagOrId_ (the lowest matching item if it matches several). This is like [`cget()`](#tkinter.Misc.cget "tkinter.Misc.cget") but applies to an individual item.

itemconfigure(_tagOrId_, _cnf\=None_, _\*\*kw_)[¶](#tkinter.Canvas.itemconfigure "Link to this definition")

Query or modify the configuration options of the items given by _tagOrId_. This mirrors [`configure()`](#tkinter.Misc.configure "tkinter.Misc.configure"), except that it applies to individual items rather than to the canvas as a whole. With no options, it returns a dictionary describing the current options of the first matching item; otherwise it sets the given options on every matching item. The legal options are those accepted by the corresponding `create_*` method. [`itemconfig()`](#tkinter.Canvas.itemconfig "tkinter.Canvas.itemconfig") is an alias of `itemconfigure()`.

type(_tagOrId_)[¶](#tkinter.Canvas.type "Link to this definition")

Return the type of the item given by _tagOrId_ (the first matching item if it matches several), such as `'rectangle'` or `'text'`, or `None` if _tagOrId_ does not match any item.

gettags(_tagOrId_, _/_)[¶](#tkinter.Canvas.gettags "Link to this definition")

Return a tuple of the tags associated with the item given by _tagOrId_ (the first matching item in display-list order if it matches several). Return an empty tuple if no item matches or the item has no tags.

dtag(_tagOrId_, _/_)[¶](#tkinter.Canvas.dtag "Link to this definition")

dtag(_tagOrId_, _tagToDelete_, _/_)

Remove the tag _tagToDelete_ (which defaults to _tagOrId_) from each of the items given by _tagOrId_. Items that do not have that tag are unaffected.

addtag(_newtag_, _searchSpec_, _/_, _\*args_)[¶](#tkinter.Canvas.addtag "Link to this definition")

Add the tag _newtag_ to each item selected by the search specification _searchSpec_ (and any further _args_). _searchSpec_ is one of `'above'`, `'all'`, `'below'`, `'closest'`, `'enclosed'`, `'overlapping'` or `'withtag'`; the `addtag_*` methods below are convenient wrappers that supply each of these forms.

addtag\_above(_newtag_, _tagOrId_)[¶](#tkinter.Canvas.addtag_above "Link to this definition")

Add the tag _newtag_ to the item just above (after) _tagOrId_ in the display list.

addtag\_all(_newtag_)[¶](#tkinter.Canvas.addtag_all "Link to this definition")

Add the tag _newtag_ to all items in the canvas.

addtag\_below(_newtag_, _tagOrId_)[¶](#tkinter.Canvas.addtag_below "Link to this definition")

Add the tag _newtag_ to the item just below (before) _tagOrId_ in the display list.

addtag\_closest(_newtag_, _x_, _y_, _halo\=None_, _start\=None_)[¶](#tkinter.Canvas.addtag_closest "Link to this definition")

Add the tag _newtag_ to the item closest to the point (_x_, _y_). If _halo_ is given, any item within that distance of the point is treated as overlapping it. If _start_ is given (a tag or id), select the topmost closest item that lies below _start_ in the display list, which can be used to step through all the closest items.

addtag\_enclosed(_newtag_, _x1_, _y1_, _x2_, _y2_)[¶](#tkinter.Canvas.addtag_enclosed "Link to this definition")

Add the tag _newtag_ to every item completely enclosed within the rectangle (_x1_, _y1_, _x2_, _y2_), where _x1_ <= _x2_ and _y1_ <= _y2_.

addtag\_overlapping(_newtag_, _x1_, _y1_, _x2_, _y2_)[¶](#tkinter.Canvas.addtag_overlapping "Link to this definition")

Add the tag _newtag_ to every item that overlaps or is enclosed within the rectangle (_x1_, _y1_, _x2_, _y2_), where _x1_ <= _x2_ and _y1_ <= _y2_.

addtag\_withtag(_newtag_, _tagOrId_)[¶](#tkinter.Canvas.addtag_withtag "Link to this definition")

Add the tag _newtag_ to every item given by _tagOrId_.

find(_searchSpec_, _/_, _\*args_)[¶](#tkinter.Canvas.find "Link to this definition")

Return a tuple of the ids of all items selected by the search specification _searchSpec_ (and any further _args_), in stacking order with the lowest item first. The search specification has any of the forms accepted by [`addtag()`](#tkinter.Canvas.addtag "tkinter.Canvas.addtag"). The `find_*` methods below are more convenient wrappers around it.

find\_above(_tagOrId_)[¶](#tkinter.Canvas.find_above "Link to this definition")

Return a tuple containing the id of the item just above _tagOrId_ in the display list.

find\_all()[¶](#tkinter.Canvas.find_all "Link to this definition")

Return a tuple of the ids of all items in the canvas, in stacking order.

find\_below(_tagOrId_)[¶](#tkinter.Canvas.find_below "Link to this definition")

Return a tuple containing the id of the item just below _tagOrId_ in the display list.

find\_closest(_x_, _y_, _halo\=None_, _start\=None_)[¶](#tkinter.Canvas.find_closest "Link to this definition")

Return a tuple containing the id of the item closest to the point (_x_, _y_). _halo_ and _start_ are interpreted as for [`addtag_closest()`](#tkinter.Canvas.addtag_closest "tkinter.Canvas.addtag_closest").

find\_enclosed(_x1_, _y1_, _x2_, _y2_)[¶](#tkinter.Canvas.find_enclosed "Link to this definition")

Return a tuple of the ids of all items completely enclosed within the rectangle (_x1_, _y1_, _x2_, _y2_).

find\_overlapping(_x1_, _y1_, _x2_, _y2_)[¶](#tkinter.Canvas.find_overlapping "Link to this definition")

Return a tuple of the ids of all items that overlap or are enclosed within the rectangle (_x1_, _y1_, _x2_, _y2_).

find\_withtag(_tagOrId_)[¶](#tkinter.Canvas.find_withtag "Link to this definition")

Return a tuple of the ids of all items given by _tagOrId_.

tag\_raise(_tagOrId_, _aboveThis\=None_, _/_)[¶](#tkinter.Canvas.tag_raise "Link to this definition")

Move all items given by _tagOrId_ to a new position in the display list just above the item given by _aboveThis_, or to the top of the display list if _aboveThis_ is omitted. When several items are moved their relative order is preserved. This has no effect on embedded window items, whose stacking order is controlled by [`Misc.tkraise()`](#tkinter.Misc.tkraise "tkinter.Misc.tkraise") and [`Misc.lower()`](#tkinter.Misc.lower "tkinter.Misc.lower") instead. [`lift()`](#tkinter.Canvas.lift "tkinter.Canvas.lift") and [`tkraise()`](#tkinter.Canvas.tkraise "tkinter.Canvas.tkraise") are aliases of `tag_raise()`.

tag\_lower(_tagOrId_, _belowThis\=None_, _/_)[¶](#tkinter.Canvas.tag_lower "Link to this definition")

Move all items given by _tagOrId_ to a new position in the display list just below the item given by _belowThis_, or to the bottom of the display list if _belowThis_ is omitted. When several items are moved their relative order is preserved. This has no effect on embedded window items. [`lower()`](#tkinter.Canvas.lower "tkinter.Canvas.lower") is an alias of `tag_lower()`.

备注

On a `Canvas`, [`tkraise()`](#tkinter.Canvas.tkraise "tkinter.Canvas.tkraise")/[`lift()`](#tkinter.Canvas.lift "tkinter.Canvas.lift") and [`lower()`](#tkinter.Canvas.lower "tkinter.Canvas.lower") restack canvas items, shadowing the inherited [`Misc.tkraise()`](#tkinter.Misc.tkraise "tkinter.Misc.tkraise")/[`Misc.lift()`](#tkinter.Misc.lift "tkinter.Misc.lift") and [`Misc.lower()`](#tkinter.Misc.lower "tkinter.Misc.lower") methods that restack the widget itself, which are therefore not available.

tag\_bind(_tagOrId_, _sequence\=None_, _func\=None_, _add\=None_)[¶](#tkinter.Canvas.tag_bind "Link to this definition")

Bind the callback _func_ to the event _sequence_ for all items given by _tagOrId_, so that _func_ is invoked whenever that event occurs for one of the items. This is like [`Widget.bind`](#tkinter.Misc.bind "tkinter.Misc.bind") but operates on canvas items rather than on whole widgets; only mouse, keyboard and virtual events may be bound. Mouse events are directed to the current item and keyboard events to the focus item (see [`focus()`](#tkinter.Canvas.focus "tkinter.Canvas.focus")). If _add_ is true the new binding is added to any existing bindings for the same sequence, rather than replacing them. Return the identifier of the bound function, which can be passed to [`tag_unbind()`](#tkinter.Canvas.tag_unbind "tkinter.Canvas.tag_unbind").

tag\_unbind(_tagOrId_, _sequence_, _funcid\=None_)[¶](#tkinter.Canvas.tag_unbind "Link to this definition")

Remove for all items given by _tagOrId_ the binding for the event _sequence_. If _funcid_ is given, only that callback (as returned by [`tag_bind()`](#tkinter.Canvas.tag_bind "tkinter.Canvas.tag_bind")) is unbound and deregistered.

在 3.13 版本发生变更: If _funcid_ is given, only that callback is unbound.

bbox(_tagOrId_, _/_, _\*tagOrIds_)[¶](#tkinter.Canvas.bbox "Link to this definition")

Return a 4-tuple `(x1, y1, x2, y2)` giving an approximate bounding box, in pixels, that encloses all the items given by _tagOrId_ and any further _tagOrIds_. The result may overestimate the true bounding box by a few pixels. Return `None` if no item matches or the matching items have nothing to display.

This shadows the inherited `Misc.bbox()`; use [`grid_bbox()`](#tkinter.Misc.grid_bbox "tkinter.Misc.grid_bbox") for the grid bounding box.

canvasx(_screenx_, _gridspacing\=None_)[¶](#tkinter.Canvas.canvasx "Link to this definition")

Given a window x-coordinate _screenx_, return the canvas x-coordinate displayed at that location. If _gridspacing_ is given, the result is rounded to the nearest multiple of _gridspacing_ units.

canvasy(_screeny_, _gridspacing\=None_)[¶](#tkinter.Canvas.canvasy "Link to this definition")

Given a window y-coordinate _screeny_, return the canvas y-coordinate displayed at that location. If _gridspacing_ is given, the result is rounded to the nearest multiple of _gridspacing_ units.

focus()[¶](#tkinter.Canvas.focus "Link to this definition")

focus(_tagOrId_, _/_)

With _tagOrId_, set the keyboard focus for the canvas to the first item given by _tagOrId_ that supports the insertion cursor; the focus is left unchanged if no such item exists. If _tagOrId_ is an empty string, reset the focus so that no item has it. With no argument, return the id of the item that currently has the focus, or an empty string if none does. An item only displays the insertion cursor when both it is the focus item and its canvas has the input focus.

This shadows the inherited `Misc.focus()`; use [`focus_set()`](#tkinter.Misc.focus_set "tkinter.Misc.focus_set") to focus the widget itself.

icursor(_tagOrId_, _index_, _/_)[¶](#tkinter.Canvas.icursor "Link to this definition")

Set the insertion cursor of the items given by _tagOrId_ to just before the character given by _index_. Items that do not support an insertion cursor are unaffected. The cursor is only displayed when the item has the focus, but its position may be set at any time.

index(_tagOrId_, _index_, _/_)[¶](#tkinter.Canvas.index "Link to this definition")

Return as an integer the numerical index within _tagOrId_ corresponding to _index_, which is a textual description of a position (for text items an index into the characters, for line and polygon items an index into the coordinates). If _tagOrId_ matches several items, the first one that supports indexing is used.

select\_adjust(_tagOrId_, _index_)[¶](#tkinter.Canvas.select_adjust "Link to this definition")

Adjust the end of the selection in _tagOrId_ nearest to _index_ so that it is at _index_, and make the other end the anchor point for future [`select_to()`](#tkinter.Canvas.select_to "tkinter.Canvas.select_to") calls. If the selection is not currently in _tagOrId_, this behaves like `select_to()`.

select\_clear()[¶](#tkinter.Canvas.select_clear "Link to this definition")

Clear the selection if it is in this canvas; otherwise do nothing.

select\_from(_tagOrId_, _index_)[¶](#tkinter.Canvas.select_from "Link to this definition")

Set the selection anchor point to just before the character given by _index_ in the item given by _tagOrId_. This does not change the selection itself; it sets the fixed end for future [`select_to()`](#tkinter.Canvas.select_to "tkinter.Canvas.select_to") calls.

select\_item()[¶](#tkinter.Canvas.select_item "Link to this definition")

Return the id of the item that holds the selection, or `None` if the selection is not in this canvas. Unlike [`find()`](#tkinter.Canvas.find "tkinter.Canvas.find") and the `find_*` methods, this returns the id as a string rather than an integer.

select\_to(_tagOrId_, _index_)[¶](#tkinter.Canvas.select_to "Link to this definition")

Set the selection to the characters of _tagOrId_ between the selection anchor point and _index_, inclusive of _index_. The anchor point is the one set by the most recent [`select_adjust()`](#tkinter.Canvas.select_adjust "tkinter.Canvas.select_adjust") or [`select_from()`](#tkinter.Canvas.select_from "tkinter.Canvas.select_from") call.

scan\_mark(_x_, _y_)[¶](#tkinter.Canvas.scan_mark "Link to this definition")

Record _x_, _y_ and the current view, for use with later [`scan_dragto()`](#tkinter.Canvas.scan_dragto "tkinter.Canvas.scan_dragto") calls. This is typically bound to a mouse button press in the widget.

scan\_dragto(_x_, _y_, _gain\=10_)[¶](#tkinter.Canvas.scan_dragto "Link to this definition")

Scroll the canvas by _gain_ times the difference between _x_, _y_ and the coordinates passed to the last [`scan_mark()`](#tkinter.Canvas.scan_mark "tkinter.Canvas.scan_mark") call. This is typically bound to mouse motion events in the widget, producing the effect of dragging the canvas at high speed through its window.

postscript(_cnf\={}_, _\*\*kw_)[¶](#tkinter.Canvas.postscript "Link to this definition")

Generate a PostScript (Encapsulated PostScript, version 3.0) representation of part or all of the canvas. If the _file_ or _channel_ option is given, the PostScript is written there and an empty string is returned; otherwise it is returned as a string. By default only the area currently visible in the window is generated, so it is usually necessary either to call [`update()`](#tkinter.Misc.update "tkinter.Misc.update") first or to use the _width_ and _height_ options. Supported options include _colormap_, _colormode_, _file_, _fontmap_, _height_, _pageanchor_, _pageheight_, _pagewidth_, _pagex_, _pagey_, _rotate_, _width_, _x_ and _y_.

_class_ tkinter.Checkbutton(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Checkbutton "Link to this definition")

A `Checkbutton` widget displays a textual string, bitmap or image together with a square indicator, and toggles a boolean selection when pressed. It has all the behavior of a simple button and, in addition, can be selected: when selected the indicator is drawn with a check mark and the associated variable is set to the `onvalue`, and when deselected the indicator is drawn empty and the variable is set to the `offvalue`. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget"). In addition to the standard widget options, a checkbutton accepts the options documented in the Tk `checkbutton` manual page, such as _variable_, _onvalue_, _offvalue_ and _command_.

invoke()[¶](#tkinter.Checkbutton.invoke "Link to this definition")

Do just what would happen if the user pressed the checkbutton with the mouse: toggle the selection state of the button and invoke the associated command, if there is one. Return the result of the command, or an empty string if no command is associated with the checkbutton. This is ignored if the checkbutton's state is `disabled`.

select()[¶](#tkinter.Checkbutton.select "Link to this definition")

Select the checkbutton and set the associated variable to its `onvalue`.

deselect()[¶](#tkinter.Checkbutton.deselect "Link to this definition")

Deselect the checkbutton and set the associated variable to its `offvalue`.

toggle()[¶](#tkinter.Checkbutton.toggle "Link to this definition")

Toggle the selection state of the button, redisplaying it and modifying its associated variable to reflect the new state.

flash()[¶](#tkinter.Checkbutton.flash "Link to this definition")

Flash the checkbutton by redisplaying it several times, alternating between the active and normal colors. At the end of the flash the checkbutton is left in the same normal or active state as when the method was called. This is ignored if the checkbutton's state is `disabled`.

_class_ tkinter.Entry(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Entry "Link to this definition")

An `Entry` widget displays a single line of text and lets the user edit it. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget") and [`XView`](#tkinter.XView "tkinter.XView"); since entries can hold strings too long to fit in the window, they support horizontal scrolling through [`xview()`](#tkinter.XView.xview "tkinter.XView.xview").

In addition to the standard widget options, an entry accepts the options documented in the Tk `entry` manual page. Notable ones are _textvariable_ (the name of a variable kept in sync with the entry's contents), _show_ (if set, each character is displayed as the given character rather than its true value, useful for password entry), _validate_ and _validatecommand_ (which together let a callback accept or reject edits), and _state_ (one of `'normal'`, `'disabled'` or `'readonly'`).

Many of the methods below take an _index_ argument that selects a character in the entry's string. As described in the Tk `entry` manual page, _index_ may be a number (counting from 0), `'insert'` (the character just after the insertion cursor), `'end'` (just after the last character), `'anchor'` (the selection anchor point), `'sel.first'` and `'sel.last'` (the ends of the selection), or `@x` (the character covering pixel x-coordinate _x_ in the window). Out-of-range indices are rounded to the nearest legal value.

delete(_first_, _last\=None_)[¶](#tkinter.Entry.delete "Link to this definition")

Delete the characters from index _first_ up to but not including index _last_. If _last_ is omitted, only the single character at _first_ is deleted.

get()[¶](#tkinter.Entry.get "Link to this definition")

Return the entry's current string.

insert(_index_, _string_)[¶](#tkinter.Entry.insert "Link to this definition")

Insert _string_ just before the character given by _index_.

icursor(_index_)[¶](#tkinter.Entry.icursor "Link to this definition")

Arrange for the insertion cursor to be displayed just before the character given by _index_.

index(_index_)[¶](#tkinter.Entry.index "Link to this definition")

Return the numerical index corresponding to _index_.

selection\_adjust(_index_)[¶](#tkinter.Entry.selection_adjust "Link to this definition")

Locate the end of the selection nearest to the character given by _index_, and adjust that end to be at _index_ (including but not going beyond it); the other end becomes the anchor point for future [`selection_to()`](#tkinter.Entry.selection_to "tkinter.Entry.selection_to") calls. If there is no selection in the entry, a new one is created between _index_ and the most recent anchor point, inclusive. [`select_adjust()`](#tkinter.Entry.select_adjust "tkinter.Entry.select_adjust") is an alias of `selection_adjust()`.

selection\_clear()[¶](#tkinter.Entry.selection_clear "Link to this definition")

Clear the selection if it is currently in this widget. If the selection is not in this widget the method has no effect. [`select_clear()`](#tkinter.Entry.select_clear "tkinter.Entry.select_clear") is an alias of `selection_clear()`.

备注

This shadows the inherited [`Misc.selection_clear()`](#tkinter.Misc.selection_clear "tkinter.Misc.selection_clear"), which clears the X selection; that method is not available on an `Entry`.

selection\_from(_index_)[¶](#tkinter.Entry.selection_from "Link to this definition")

Set the selection anchor point to just before the character given by _index_, without changing the selection. [`select_from()`](#tkinter.Entry.select_from "tkinter.Entry.select_from") is an alias of `selection_from()`.

selection\_present()[¶](#tkinter.Entry.selection_present "Link to this definition")

Return `True` if there are characters selected in the entry, `False` otherwise. [`select_present()`](#tkinter.Entry.select_present "tkinter.Entry.select_present") is an alias of `selection_present()`.

selection\_range(_start_, _end_)[¶](#tkinter.Entry.selection_range "Link to this definition")

Set the selection to include the characters starting with the one indexed by _start_ and ending with the one just before _end_. If _end_ refers to the same character as _start_ or an earlier one, the selection is cleared. [`select_range()`](#tkinter.Entry.select_range "tkinter.Entry.select_range") is an alias of `selection_range()`.

selection\_to(_index_)[¶](#tkinter.Entry.selection_to "Link to this definition")

Set the selection between the anchor point and _index_: if _index_ is before the anchor point, the selection runs from _index_ up to but not including the anchor; if _index_ is after it, from the anchor up to but not including _index_; if they coincide, nothing happens. The anchor point is the one set by the most recent [`selection_from()`](#tkinter.Entry.selection_from "tkinter.Entry.selection_from") or [`selection_adjust()`](#tkinter.Entry.selection_adjust "tkinter.Entry.selection_adjust") call. If there is no selection in the entry, a new one is created using the most recent anchor point. [`select_to()`](#tkinter.Entry.select_to "tkinter.Entry.select_to") is an alias of `selection_to()`.

scan\_mark(_x_)[¶](#tkinter.Entry.scan_mark "Link to this definition")

Record _x_ and the current view in the entry window, for use with later [`scan_dragto()`](#tkinter.Entry.scan_dragto "tkinter.Entry.scan_dragto") calls. Typically associated with a mouse button press in the widget.

scan\_dragto(_x_)[¶](#tkinter.Entry.scan_dragto "Link to this definition")

Compute the difference between _x_ and the _x_ given to the last [`scan_mark()`](#tkinter.Entry.scan_mark "tkinter.Entry.scan_mark") call, and adjust the view left or right by 10 times that difference. Typically associated with mouse motion events, to produce the effect of dragging the entry at high speed through the window.

_class_ tkinter.Frame(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Frame "Link to this definition")

A `Frame` widget is a simple container. Its primary purpose is to act as a spacer or container for complex window layouts; its only features are its background and an optional 3-D border to make the frame appear raised or sunken. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget"). Refer to the Tk `frame` manual page for the full list of options.

_class_ tkinter.Label(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Label "Link to this definition")

A `Label` widget displays a non-interactive textual string, bitmap or image. The displayed text is set with the _text_ option or linked to a variable through _textvariable_, and an image can be shown using the _image_ option. Text must all be in a single font but may occupy multiple lines, and one character may be underlined with the _underline_ option. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget"). Refer to the Tk `label` manual page for the full list of options.

_class_ tkinter.LabelFrame(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.LabelFrame "Link to this definition")

A `LabelFrame` widget is a container that has the features of a [`Frame`](#tkinter.Frame "tkinter.Frame") plus the ability to display a label. The label text is set with the _text_ option and positioned with _labelanchor_, or an arbitrary widget may be used as the label by giving it as the _labelwidget_ option. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget"). Refer to the Tk `labelframe` manual page for the full list of options.

_class_ tkinter.Listbox(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Listbox "Link to this definition")

A `Listbox` widget displays a list of single-line text items, one per line, of which the user can select one or more. The way the selection behaves is governed by the _selectmode_ option, which is one of `browse` (the default; at most one item, which may be dragged with the mouse), `single` (at most one item), `multiple` (any number of items, toggled individually), or `extended` (any number of items, including discontiguous ranges, selected by clicking and dragging). Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget"), [`XView`](#tkinter.XView "tkinter.XView") and [`YView`](#tkinter.YView "tkinter.YView"), so the view can be scrolled horizontally and vertically with [`xview()`](#tkinter.XView.xview "tkinter.XView.xview") and [`yview()`](#tkinter.YView.yview "tkinter.YView.yview"). Refer to the Tk `listbox` manual page for the full list of options.

Many of the methods take an _index_ argument identifying a particular item. As described in the Tk `listbox` manual page, _index_ may be a numeric index (counting from 0 at the top), `'active'` (the item with the location cursor, set with [`activate()`](#tkinter.Listbox.activate "tkinter.Listbox.activate")), `'anchor'` (the selection anchor, set with [`selection_anchor()`](#tkinter.Listbox.selection_anchor "tkinter.Listbox.selection_anchor")), `'end'` (the last item, or for [`index()`](#tkinter.Listbox.index "tkinter.Listbox.index") and [`insert()`](#tkinter.Listbox.insert "tkinter.Listbox.insert") the position just after it), or `@x,y` (the item covering pixel coordinates _x_, _y_ in the listbox window). Arguments named _first_ and _last_ are indices of the same forms.

insert(_index_, _\*elements_)[¶](#tkinter.Listbox.insert "Link to this definition")

Insert the given _elements_ as new items just before the item given by _index_. If _index_ is `'end'`, the new items are appended to the end of the list.

delete(_first_, _last\=None_)[¶](#tkinter.Listbox.delete "Link to this definition")

Delete the items in the range from _first_ to _last_ inclusive. If _last_ is omitted, it defaults to _first_, so that a single item is deleted.

get(_first_, _last\=None_)[¶](#tkinter.Listbox.get "Link to this definition")

If _last_ is omitted, return the contents of the item given by _first_, or an empty string if _first_ refers to a non-existent item. If _last_ is given, return a tuple of all the items in the range from _first_ to _last_ inclusive.

size()[¶](#tkinter.Listbox.size "Link to this definition")

Return the total number of items in the listbox.

This shadows the inherited `Misc.size()`; use [`grid_size()`](#tkinter.Misc.grid_size "tkinter.Misc.grid_size") for the grid size.

index(_index_)[¶](#tkinter.Listbox.index "Link to this definition")

Return the integer index value corresponding to _index_, or `None` if _index_ is out of range. If _index_ is `'end'`, the result is a count of the number of items in the listbox (not the index of the last item).

bbox(_index_)[¶](#tkinter.Listbox.bbox "Link to this definition")

Return a tuple `(x, y, width, height)` describing the bounding box, in pixels relative to the widget, of the text of the item given by _index_. Return `None` if no part of that item is visible on the screen, or if _index_ refers to a non-existent item; if the item is only partly visible, the result still gives the full area of the item, including the parts that are not visible.

This shadows the inherited `Misc.bbox()`; use [`grid_bbox()`](#tkinter.Misc.grid_bbox "tkinter.Misc.grid_bbox") for the grid bounding box.

nearest(_y_)[¶](#tkinter.Listbox.nearest "Link to this definition")

Given a y-coordinate within the listbox window, return the index of the visible item nearest to that y-coordinate.

see(_index_)[¶](#tkinter.Listbox.see "Link to this definition")

Adjust the view so that the item given by _index_ is visible. If the item is already visible the method has no effect; if it is near an edge of the window the listbox scrolls just enough to bring it into view at that edge, otherwise the listbox scrolls to center the item.

activate(_index_)[¶](#tkinter.Listbox.activate "Link to this definition")

Set the active item to the one given by _index_. If _index_ is outside the range of items, the closest item is activated instead. The active item is drawn as specified by the _activestyle_ option when the widget has the input focus, and its index may be retrieved with the `'active'` index.

curselection()[¶](#tkinter.Listbox.curselection "Link to this definition")

Return a tuple containing the numerical indices of all of the items that are currently selected, or an empty tuple if no items are selected.

selection\_anchor(_index_)[¶](#tkinter.Listbox.selection_anchor "Link to this definition")

Set the selection anchor to the item given by _index_. If _index_ refers to a non-existent item, the closest item is used. The selection anchor is the end of the selection that is fixed while dragging out a selection with the mouse, and may afterwards be referred to with the `'anchor'` index. [`select_anchor()`](#tkinter.Listbox.select_anchor "tkinter.Listbox.select_anchor") is an alias of `selection_anchor()`.

selection\_clear(_first_, _last\=None_)[¶](#tkinter.Listbox.selection_clear "Link to this definition")

Deselect any of the items in the range from _first_ to _last_ inclusive that are selected. The selection state of items outside this range is not changed. [`select_clear()`](#tkinter.Listbox.select_clear "tkinter.Listbox.select_clear") is an alias of `selection_clear()`.

备注

This shadows the inherited [`Misc.selection_clear()`](#tkinter.Misc.selection_clear "tkinter.Misc.selection_clear"), which clears the X selection; that method is not available on a `Listbox`.

selection\_includes(_index_)[¶](#tkinter.Listbox.selection_includes "Link to this definition")

Return `True` if the item given by _index_ is currently selected, `False` otherwise. [`select_includes()`](#tkinter.Listbox.select_includes "tkinter.Listbox.select_includes") is an alias of `selection_includes()`.

selection\_set(_first_, _last\=None_)[¶](#tkinter.Listbox.selection_set "Link to this definition")

Select all of the items in the range from _first_ to _last_ inclusive, without affecting the selection state of items outside that range. [`select_set()`](#tkinter.Listbox.select_set "tkinter.Listbox.select_set") is an alias of `selection_set()`.

itemcget(_index_, _option_)[¶](#tkinter.Listbox.itemcget "Link to this definition")

Return the current value of the configuration option _option_ for the item given by _index_.

itemconfigure(_index_, _cnf\=None_, _\*\*kw_)[¶](#tkinter.Listbox.itemconfigure "Link to this definition")

Query or modify the configuration options of the item given by _index_. This mirrors [`configure()`](#tkinter.Misc.configure "tkinter.Misc.configure"), except that it applies to an individual item rather than to the listbox as a whole. With no options, it returns a dictionary describing the current options of the item; otherwise it sets the given options. The supported item options are _background_, _foreground_, _selectbackground_ and _selectforeground_. [`itemconfig()`](#tkinter.Listbox.itemconfig "tkinter.Listbox.itemconfig") is an alias of `itemconfigure()`.

scan\_mark(_x_, _y_)[¶](#tkinter.Listbox.scan_mark "Link to this definition")

Record _x_, _y_ and the current view, for use with later [`scan_dragto()`](#tkinter.Listbox.scan_dragto "tkinter.Listbox.scan_dragto") calls. This is typically bound to a mouse button press in the widget.

scan\_dragto(_x_, _y_)[¶](#tkinter.Listbox.scan_dragto "Link to this definition")

Scroll the listbox by 10 times the difference between _x_, _y_ and the coordinates passed to the last [`scan_mark()`](#tkinter.Listbox.scan_mark "tkinter.Listbox.scan_mark") call. This is typically bound to mouse motion events in the widget, producing the effect of dragging the list at high speed through the window.

A `Menu` widget displays a column of entries, each of which may be a command, a checkbutton, a radiobutton, a cascade (which posts an associated submenu) or a separator. Menus are used as the menubar of a toplevel window, as pulldown menus posted from a cascade entry or menubutton, and as popup menus. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget").

Many of the entry methods take an _index_ argument that selects which entry to operate on. As described in the Tk `menu` manual page, _index_ may be a numeric index (counting from 0 at the top), `'active'` (the currently active entry), `'end'` or `'last'` (the bottommost entry), `'none'` (no entry at all, written `{}` in Tcl), `@y` (the entry covering pixel y-coordinate _y_ in the menu window), or a pattern matched against the labels of the entries from the top down.

Add a new entry to the bottom of the menu. _itemType_ is one of `'command'`, `'cascade'`, `'checkbutton'`, `'radiobutton'` or `'separator'` and determines the type of the new entry; the remaining options configure it. The `add_command()`, `add_cascade()`, `add_checkbutton()`, `add_radiobutton()` and `add_separator()` convenience methods call this method with the corresponding _itemType_.

The entry is configured by the following options, although not every option applies to every entry type (a separator accepts none of them):

_label_

The text to display in the entry.

_command_

The function to call when the entry is invoked (command, checkbutton and radiobutton entries).

_accelerator_

A string displayed at the right of the entry to advertise an accelerator keystroke; it does not itself create the binding.

_underline_

The index of a character in the label to underline for keyboard traversal.

_state_

One of `'normal'`, `'active'` or `'disabled'`.

_image_

An image to display instead of, or together with, the text label.

_compound_

Where to show the image relative to the text: `'none'` (the default), `'text'`, `'image'`, `'top'`, `'bottom'`, `'left'` or `'right'`.

_bitmap_

A bitmap to display instead of the text label.

_font_

The font to use for the text.

_background_, _foreground_

The entry's background and foreground colors in its normal state (ignored on macOS).

_activebackground_, _activeforeground_

The background and foreground colors used when the entry is active (ignored on macOS).

_columnbreak_

If true, the entry starts a new column instead of being placed below the previous entry.

_hidemargin_

If true, the standard margin around the entry is omitted, which is useful when a menu is used as a palette.

_menu_

The submenu posted by a cascade entry; it must be a child of this menu.

_variable_

The variable associated with a checkbutton or radiobutton entry.

_onvalue_, _offvalue_

The values stored in _variable_ when a checkbutton entry is selected or cleared.

_value_

The value stored in _variable_ when a radiobutton entry is selected.

_indicatoron_

Whether to display the indicator of a checkbutton or radiobutton entry.

_selectcolor_

The color of the indicator of a checkbutton or radiobutton entry when it is selected.

_selectimage_

The image displayed when a checkbutton or radiobutton entry is selected and _image_ is also given.

Add a new cascade entry to the bottom of the menu. A cascade entry has an associated submenu, given by its _menu_ option, which must be a child of this menu; posting the entry posts the submenu next to it.

Add a new checkbutton entry to the bottom of the menu. When invoked, a checkbutton entry toggles between its _onvalue_ and _offvalue_, storing the result in its associated _variable_, and displays an indicator showing whether it is selected.

add\_command(_cnf\={}_, _\*\*kw_)[¶](#tkinter.Menu.add_command "Link to this definition")

Add a new command entry to the bottom of the menu. A command entry behaves much like a button: when it is invoked, the callback given by its _command_ option is called.

Add a new radiobutton entry to the bottom of the menu. Radiobutton entries sharing the same _variable_ form a group of which only one may be selected at a time; selecting an entry stores its _value_ in the variable.

Add a separator to the bottom of the menu. A separator is displayed as a horizontal dividing line and cannot be activated or invoked.

Same as [`add()`](#tkinter.Menu.add "tkinter.Menu.add"), except that the new entry is inserted just before the entry given by _index_ instead of being appended to the end of the menu. _itemType_ is one of `'command'`, `'cascade'`, `'checkbutton'`, `'radiobutton'` or `'separator'`. The `insert_command()`, `insert_cascade()`, `insert_checkbutton()`, `insert_radiobutton()` and `insert_separator()` convenience methods call this method with the corresponding _itemType_.

Insert a new cascade entry before the entry given by _index_ (see [`add_cascade()`](#tkinter.Menu.add_cascade "tkinter.Menu.add_cascade")).

Insert a new checkbutton entry before the entry given by _index_ (see [`add_checkbutton()`](#tkinter.Menu.add_checkbutton "tkinter.Menu.add_checkbutton")).

insert\_command(_index_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Menu.insert_command "Link to this definition")

Insert a new command entry before the entry given by _index_ (see [`add_command()`](#tkinter.Menu.add_command "tkinter.Menu.add_command")).

Insert a new radiobutton entry before the entry given by _index_ (see [`add_radiobutton()`](#tkinter.Menu.add_radiobutton "tkinter.Menu.add_radiobutton")).

Insert a separator before the entry given by _index_ (see [`add_separator()`](#tkinter.Menu.add_separator "tkinter.Menu.add_separator")).

Delete all of the menu entries between _index1_ and _index2_ inclusive. If _index2_ is omitted, it defaults to _index1_, so that a single entry is deleted. Attempts to delete a tear-off entry are ignored; remove it by changing the _tearoff_ option instead.

Return the current value of the configuration option _option_ for the entry given by _index_.

Return the numerical index corresponding to _index_, or `None` if _index_ selects no entry.

Return the type of the entry given by _index_: one of `'command'`, `'cascade'`, `'checkbutton'`, `'radiobutton'`, `'separator'` or `'tearoff'` (for the tear-off entry).

Make the entry given by _index_ the active entry, redisplaying it with its active colors, and deactivate any previously active entry. If _index_ selects no entry, or the selected entry is disabled, the menu ends up with no active entry.

Invoke the action of the entry given by _index_, as if it had been clicked. Nothing happens if the entry is disabled. If the entry has a _command_ associated with it, the result of that command is returned; otherwise the result is an empty string.

Display the menu on the screen at the root-window coordinates _x_ and _y_, adjusting them if necessary so that the whole menu is visible. If the _postcommand_ option has been specified, it is evaluated before the menu is posted.

Post the menu as a popup at the root-window coordinates _x_ and _y_. If _entry_ is given, the menu is positioned so that this entry is displayed under the pointer.

Unmap the menu so that it is no longer displayed, also unposting any posted lower-level cascaded submenu. This has no effect on Windows and macOS, which manage the unposting of menus themselves.

Return the x-coordinate, within the menu window, of the leftmost pixel of the entry given by _index_.

Added in version 3.3.

Return the y-coordinate, within the menu window, of the topmost pixel of the entry given by _index_.

A `Menubutton` widget displays a textual string, bitmap or image and posts an associated [`Menu`](#tkinter.Menu "tkinter.Menu"), given by its _menu_ option, when the user presses it. Like a [`Label`](#tkinter.Label "tkinter.Label") it can show _text_, a _textvariable_, or an _image_, and the _direction_ option controls where the menu appears relative to the button. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget"). Refer to the Tk `menubutton` manual page for the full list of options.

_class_ tkinter.Message(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Message "Link to this definition")

A `Message` widget displays a non-interactive textual string, given by the _text_ option or linked to a variable through _textvariable_. Unlike a [`Label`](#tkinter.Label "tkinter.Label"), it breaks the string into multiple lines in order to produce a given aspect ratio, choosing line breaks at word boundaries, and it can justify the text left, centered or right. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget"). Refer to the Tk `message` manual page for the full list of options.

A helper subclass of [`Menubutton`](#tkinter.Menubutton "tkinter.Menubutton") that displays a pop-up menu of mutually exclusive choices. _variable_ is a [`Variable`](#tkinter.Variable "tkinter.Variable") kept in sync with the selection, _value_ is the initial choice, and _values_ are the remaining menu entries. The keyword argument _command_ may be given a callback that is invoked with the selected value, and the keyword argument _name_ sets the Tk widget name.

Destroy the widget, also cleaning up the associated pop-up menu.

在 3.14 版本发生变更: Added support for the _name_ keyword argument.

_class_ tkinter.PanedWindow(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.PanedWindow "Link to this definition")

A `PanedWindow` is a geometry-manager widget that arranges any number of child _panes_ in a row (when _orient_ is `'horizontal'`) or a column (when _orient_ is `'vertical'`). Each pane holds one widget, and each pair of adjacent panes is separated by a movable _sash_ that the user can drag with the mouse to resize the widgets on either side of it. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget").

The _orient_ option selects the layout direction, _sashwidth_ sets the width of each sash and _sashrelief_ its relief. When _showhandle_ is true a small handle is drawn on each sash that the user can grab to drag it. Refer to the Tk `panedwindow` manual page for the full list of options.

add(_child_, _\*\*kw_)[¶](#tkinter.PanedWindow.add "Link to this definition")

Add _child_ to the panedwindow as a new pane, placed after any existing panes. The keyword arguments specify per-pane management options for _child_; they may be any of the options accepted by [`paneconfigure()`](#tkinter.PanedWindow.paneconfigure "tkinter.PanedWindow.paneconfigure").

remove(_child_)[¶](#tkinter.PanedWindow.remove "Link to this definition")

Remove the pane containing _child_ from the panedwindow. All geometry management options for _child_ are forgotten. [`forget()`](#tkinter.PanedWindow.forget "tkinter.PanedWindow.forget") is an alias of `remove()`. This shadows the inherited geometry-manager `forget()`; use [`pack_forget()`](#tkinter.Pack.pack_forget "tkinter.Pack.pack_forget"), [`grid_forget()`](#tkinter.Grid.grid_forget "tkinter.Grid.grid_forget") or [`place_forget()`](#tkinter.Place.place_forget "tkinter.Place.place_forget") to remove the widget itself from its manager.

panes()[¶](#tkinter.PanedWindow.panes "Link to this definition")

Return a tuple of the widgets managed by the panedwindow, one per pane, in order.

panecget(_child_, _option_)[¶](#tkinter.PanedWindow.panecget "Link to this definition")

Return the current value of the management option _option_ for the pane containing _child_. _option_ may be any value allowed by [`paneconfigure()`](#tkinter.PanedWindow.paneconfigure "tkinter.PanedWindow.paneconfigure").

paneconfigure(_tagOrId_, _cnf\=None_, _\*\*kw_)[¶](#tkinter.PanedWindow.paneconfigure "Link to this definition")

Query or modify the management options of the pane containing the widget _tagOrId_. With no options, it returns a dictionary describing all of the available options for the pane; given a single option name as a string, it returns a description of that one option; otherwise it sets the given options. The supported options include _after_ and _before_ (insert the pane after or before another managed window), _height_ and _width_ (the outer dimensions of the window, including any border), _minsize_ (the minimum size in the paned dimension), _padx_ and _pady_ (extra space to leave on each side of the window), _sticky_ (position or stretch the window within an oversized pane, using a string of the characters `n`, `s`, `e` and `w`), _hide_ (hide the pane while keeping it in the list of panes) and _stretch_ (how extra space is allocated to the pane: one of `'always'`, `'first'`, `'last'`, `'middle'` or `'never'`). [`paneconfig()`](#tkinter.PanedWindow.paneconfig "tkinter.PanedWindow.paneconfig") is an alias of `paneconfigure()`.

identify(_x_, _y_)[¶](#tkinter.PanedWindow.identify "Link to this definition")

Identify the panedwindow component underneath the point given by _x_ and _y_, in window coordinates. If the point is over a sash or a sash handle, the result is a two-element tuple containing the index of the sash or handle and a word indicating whether it is over a sash or a handle, such as `(0, 'sash')` or `(2, 'handle')`. If the point is over any other part of the panedwindow, the result is an empty string.

sash(_\*args_)[¶](#tkinter.PanedWindow.sash "Link to this definition")

Query or change the position of the sashes in the panedwindow. This is a thin wrapper around the Tk `sash` subcommand; the convenience methods [`sash_coord()`](#tkinter.PanedWindow.sash_coord "tkinter.PanedWindow.sash_coord"), [`sash_mark()`](#tkinter.PanedWindow.sash_mark "tkinter.PanedWindow.sash_mark") and [`sash_place()`](#tkinter.PanedWindow.sash_place "tkinter.PanedWindow.sash_place") should normally be used instead.

sash\_coord(_index_)[¶](#tkinter.PanedWindow.sash_coord "Link to this definition")

Return the current x and y coordinate pair for the sash given by _index_, which must be an integer between 0 and one less than the number of panes in the panedwindow. The coordinates returned are those of the top left corner of the region containing the sash.

sash\_mark(_index_)[¶](#tkinter.PanedWindow.sash_mark "Link to this definition")

Record the current mouse position for the sash given by _index_, for use together with later sash-drag operations to move the sash.

sash\_place(_index_, _x_, _y_)[¶](#tkinter.PanedWindow.sash_place "Link to this definition")

Place the sash given by _index_ at the coordinates _x_ and _y_.

proxy(_\*args_)[¶](#tkinter.PanedWindow.proxy "Link to this definition")

Query or change the position of the sash proxy, the "ghost" sash shown while a sash is being dragged with non-opaque resizing. This is a thin wrapper around the Tk `proxy` subcommand; the convenience methods [`proxy_coord()`](#tkinter.PanedWindow.proxy_coord "tkinter.PanedWindow.proxy_coord"), [`proxy_forget()`](#tkinter.PanedWindow.proxy_forget "tkinter.PanedWindow.proxy_forget") and [`proxy_place()`](#tkinter.PanedWindow.proxy_place "tkinter.PanedWindow.proxy_place") should normally be used instead.

proxy\_coord()[¶](#tkinter.PanedWindow.proxy_coord "Link to this definition")

Return a tuple containing the x and y coordinates of the most recent proxy location.

proxy\_forget()[¶](#tkinter.PanedWindow.proxy_forget "Link to this definition")

Remove the proxy from the display.

proxy\_place(_x_, _y_)[¶](#tkinter.PanedWindow.proxy_place "Link to this definition")

Place the proxy at the coordinates _x_ and _y_.

_class_ tkinter.Radiobutton(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Radiobutton "Link to this definition")

A `Radiobutton` widget displays a textual string, bitmap or image together with a diamond or circular indicator, and selects one choice out of several. It has all the behavior of a simple button and, in addition, can be selected: typically several radiobuttons share a single _variable_, and selecting one sets that variable to the radiobutton's _value_; each radiobutton also monitors the variable and automatically selects or deselects itself when the variable changes. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget"). In addition to the standard widget options, a radiobutton accepts the options documented in the Tk `radiobutton` manual page, such as _variable_, _value_ and _command_.

invoke()[¶](#tkinter.Radiobutton.invoke "Link to this definition")

Do just what would happen if the user pressed the radiobutton with the mouse: select the button and invoke the associated command, if there is one. Return the result of the command, or an empty string if no command is associated with the radiobutton. This is ignored if the radiobutton's state is `disabled`.

select()[¶](#tkinter.Radiobutton.select "Link to this definition")

Select the radiobutton and set the associated variable to the value corresponding to this widget.

deselect()[¶](#tkinter.Radiobutton.deselect "Link to this definition")

Deselect the radiobutton and set the associated variable to an empty string. If this radiobutton was not currently selected, this has no effect.

flash()[¶](#tkinter.Radiobutton.flash "Link to this definition")

Flash the radiobutton by redisplaying it several times, alternating between the active and normal colors. At the end of the flash the radiobutton is left in the same normal or active state as when the method was called. This is ignored if the radiobutton's state is `disabled`.

_class_ tkinter.Scale(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Scale "Link to this definition")

A `Scale` widget lets the user select a numerical value by moving a slider along a trough. It can be oriented vertically or horizontally and can optionally display a label and the current value. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget").

In addition to the standard widget options, a scale accepts the options documented in the Tk `scale` manual page, such as _from\__, _to_, _resolution_, _orient_, _tickinterval_, _variable_ and _command_. As elsewhere in `tkinter`, the leading `-` of the Tk option name is dropped; _from_ is spelled `from_` because [`from`](https://docs.python.org/zh-cn/3/reference/simple_stmts.html#from) is a Python keyword.

With a non-integer _resolution_, see [numeric values and the locale](#tkinter-numeric-locale).

get()[¶](#tkinter.Scale.get "Link to this definition")

Return the current value of the scale. The result is an integer if the scale's _resolution_ yields whole numbers, and a float otherwise.

set(_value_)[¶](#tkinter.Scale.set "Link to this definition")

Set the scale to _value_, moving the slider accordingly. This has no effect if the scale is disabled.

coords(_value\=None_)[¶](#tkinter.Scale.coords "Link to this definition")

Return a tuple `(x, y)` giving the pixel coordinates, relative to the widget, of the point on the centerline of the trough that corresponds to _value_. If _value_ is omitted, the scale's current value is used.

identify(_x_, _y_)[¶](#tkinter.Scale.identify "Link to this definition")

Return a string describing the part of the scale at the pixel coordinates _x_, _y_: `'slider'`, `'trough1'` (the part of the trough above or to the left of the slider), `'trough2'` (below or to the right of the slider), or an empty string if the point is not over any of these elements.

_class_ tkinter.Scrollbar(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Scrollbar "Link to this definition")

A `Scrollbar` widget displays a slider and two arrows that let the user scroll an associated widget, such as a [`Listbox`](#tkinter.Listbox "tkinter.Listbox"), [`Text`](#tkinter.Text "tkinter.Text"), [`Canvas`](#tkinter.Canvas "tkinter.Canvas") or [`Entry`](#tkinter.Entry "tkinter.Entry"). It is connected to the scrolled widget by setting that widget's _xscrollcommand_ or _yscrollcommand_ option to the scrollbar's [`set()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#set "set") method, and the scrollbar's _command_ option to the scrolled widget's [`xview()`](#tkinter.XView.xview "tkinter.XView.xview") or [`yview()`](#tkinter.YView.yview "tkinter.YView.yview") method. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget").

get()[¶](#tkinter.Scrollbar.get "Link to this definition")

Return the current scrollbar settings as a tuple `(first, last)` of two fractions between 0 and 1, describing the portion of the document that is currently visible, as last passed to [`set()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#set "set").

set(_first_, _last_)[¶](#tkinter.Scrollbar.set "Link to this definition")

Set the scrollbar. _first_ and _last_ are fractions between 0 and 1 giving the positions of the start and end of the visible portion of the associated document. This method is normally registered as the scrolled widget's _xscrollcommand_ or _yscrollcommand_ and called by that widget.

activate(_index\=None_)[¶](#tkinter.Scrollbar.activate "Link to this definition")

Mark the element _index_ (one of `'arrow1'`, `'slider'` or `'arrow2'`) as active, displaying it according to the _activebackground_ and _activerelief_ options. If _index_ is omitted, return the name of the currently active element, or `None` if no element is active.

在 3.5 版本发生变更: The _index_ argument is now optional.

delta(_deltax_, _deltay_)[¶](#tkinter.Scrollbar.delta "Link to this definition")

Return a float indicating the fractional change in the scrollbar setting that corresponds to moving the slider by _deltax_ pixels horizontally (for horizontal scrollbars) or _deltay_ pixels vertically (for vertical scrollbars).

fraction(_x_, _y_)[¶](#tkinter.Scrollbar.fraction "Link to this definition")

Return a float between 0 and 1 indicating where the point at pixel coordinates _x_, _y_ lies in the trough: 0 corresponds to the top or left of the trough and 1 to the bottom or right.

identify(_x_, _y_)[¶](#tkinter.Scrollbar.identify "Link to this definition")

Return the name of the element under the pixel coordinates _x_, _y_ (such as `'arrow1'`), or an empty string if the point does not lie in any element of the scrollbar.

_class_ tkinter.Spinbox(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Spinbox "Link to this definition")

A `Spinbox` widget is an [`Entry`](#tkinter.Entry "tkinter.Entry")\-like widget with a pair of up/down arrow buttons that let the user step through a range of values in addition to editing the value directly. The set of values may be a numeric range given by the _from\__, _to_ and _increment_ options, or an explicit list of strings given by the _values_ option (which takes precedence over the range). Each time an arrow is invoked the _command_ callback, if any, is called; the _wrap_ option controls whether stepping past either end of the range wraps around to the other end; the _format_ option specifies how numeric values are formatted; and the _validate_ option enables validation of the entered text. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget") and [`XView`](#tkinter.XView "tkinter.XView").

With a non-integer _increment_, see [numeric values and the locale](#tkinter-numeric-locale).

Many of the methods take an _index_ argument identifying a character in the spinbox's string. As described in the Tk `spinbox` manual page, _index_ may be a numeric index (counting from 0), `'anchor'` (the selection anchor point), `'end'` (just after the last character), `'insert'` (the character just after the insertion cursor), `'sel.first'` or `'sel.last'` (the ends of the selection), or `@x` (the character covering pixel x-coordinate _x_ in the window).

get()[¶](#tkinter.Spinbox.get "Link to this definition")

Return the spinbox's string.

insert(_index_, _s_)[¶](#tkinter.Spinbox.insert "Link to this definition")

Insert the characters of the string _s_ just before the character given by _index_.

delete(_first_, _last\=None_)[¶](#tkinter.Spinbox.delete "Link to this definition")

Delete one or more characters of the spinbox. _first_ is the index of the first character to delete, and _last_ is the index of the character just after the last one to delete. If _last_ is omitted, a single character at _first_ is deleted.

icursor(_index_)[¶](#tkinter.Spinbox.icursor "Link to this definition")

Arrange for the insertion cursor to be displayed just before the character given by _index_.

index(_index_)[¶](#tkinter.Spinbox.index "Link to this definition")

Return the numerical index corresponding to _index_, as a string.

bbox(_index_)[¶](#tkinter.Spinbox.bbox "Link to this definition")

Return a tuple of four integers `(x, y, width, height)` describing the bounding box of the character given by _index_. _x_ and _y_ are the pixel coordinates of the upper-left corner of the character relative to the widget, and _width_ and _height_ are its size in pixels. The bounding box may refer to a region outside the visible area of the window.

This shadows the inherited `Misc.bbox()`; use [`grid_bbox()`](#tkinter.Misc.grid_bbox "tkinter.Misc.grid_bbox") for the grid bounding box.

identify(_x_, _y_)[¶](#tkinter.Spinbox.identify "Link to this definition")

Return the name of the window element at the pixel coordinates _x_, _y_: one of `'buttondown'`, `'buttonup'`, `'entry'` or `'none'`.

invoke(_element_)[¶](#tkinter.Spinbox.invoke "Link to this definition")

Invoke the spin button given by _element_, either `'buttonup'` or `'buttondown'`, triggering the action associated with it.

scan(_\*args_)[¶](#tkinter.Spinbox.scan "Link to this definition")

A thin wrapper around the Tk `scan` widget subcommand, used to implement fast dragging of the view: `scan('mark', x)` records _x_ and the current view, and `scan('dragto', x)` adjusts the view relative to that mark. The [`scan_mark()`](#tkinter.Spinbox.scan_mark "tkinter.Spinbox.scan_mark") and [`scan_dragto()`](#tkinter.Spinbox.scan_dragto "tkinter.Spinbox.scan_dragto") methods wrap the two forms.

scan\_mark(_x_)[¶](#tkinter.Spinbox.scan_mark "Link to this definition")

Record _x_ and the current view in the spinbox window, for use with a later [`scan_dragto()`](#tkinter.Spinbox.scan_dragto "tkinter.Spinbox.scan_dragto") call. This is typically associated with a mouse button press in the widget.

scan\_dragto(_x_)[¶](#tkinter.Spinbox.scan_dragto "Link to this definition")

Adjust the view by 10 times the difference between _x_ and the _x_ passed to the last [`scan_mark()`](#tkinter.Spinbox.scan_mark "tkinter.Spinbox.scan_mark") call. This is typically associated with mouse motion events, producing the effect of dragging the spinbox at high speed through the window.

selection(_\*args_)[¶](#tkinter.Spinbox.selection "Link to this definition")

A thin wrapper around the Tk `selection` widget subcommand, used to adjust the selection within the spinbox. It has several forms depending on the first argument, such as `selection('adjust', index)`, `selection('clear')`, `selection('element', ?elem?)`, `selection('from', index)`, `selection('present')`, `selection('range', start, end)` and `selection('to', index)`. The [`selection_adjust()`](#tkinter.Spinbox.selection_adjust "tkinter.Spinbox.selection_adjust"), [`selection_clear()`](#tkinter.Spinbox.selection_clear "tkinter.Spinbox.selection_clear"), [`selection_element()`](#tkinter.Spinbox.selection_element "tkinter.Spinbox.selection_element"), [`selection_from()`](#tkinter.Spinbox.selection_from "tkinter.Spinbox.selection_from"), [`selection_present()`](#tkinter.Spinbox.selection_present "tkinter.Spinbox.selection_present"), [`selection_range()`](#tkinter.Spinbox.selection_range "tkinter.Spinbox.selection_range") and [`selection_to()`](#tkinter.Spinbox.selection_to "tkinter.Spinbox.selection_to") methods wrap these forms.

selection\_adjust(_index_)[¶](#tkinter.Spinbox.selection_adjust "Link to this definition")

Locate the end of the selection nearest to the character given by _index_ and adjust that end of the selection to be at _index_ (including but not going beyond _index_). The other end becomes the anchor point for future [`selection_to()`](#tkinter.Spinbox.selection_to "tkinter.Spinbox.selection_to") calls. If the selection is not currently in the spinbox, a new selection is created to include the characters between _index_ and the most recent anchor point, inclusive.

selection\_clear()[¶](#tkinter.Spinbox.selection_clear "Link to this definition")

Clear the selection if it is currently in this widget. If the selection is not in this widget, the method has no effect.

备注

This shadows the inherited [`Misc.selection_clear()`](#tkinter.Misc.selection_clear "tkinter.Misc.selection_clear"), which clears the X selection; that method is not available on a `Spinbox`.

selection\_element(_element\=None_)[¶](#tkinter.Spinbox.selection_element "Link to this definition")

Set or get the currently selected element. If _element_ (one of `'buttonup'`, `'buttondown'` or `'none'`) is given, that spin button is selected and displayed depressed; otherwise the name of the currently selected element is returned.

selection\_from(_index_)[¶](#tkinter.Spinbox.selection_from "Link to this definition")

Set the selection anchor point to just before the character given by _index_, without changing the selection itself.

Added in version 3.8.

selection\_present()[¶](#tkinter.Spinbox.selection_present "Link to this definition")

Return `True` if there are characters selected in the spinbox, `False` otherwise.

Added in version 3.8.

selection\_range(_start_, _end_)[¶](#tkinter.Spinbox.selection_range "Link to this definition")

Set the selection to include the characters starting with the one indexed by _start_ and ending with the one just before _end_. If _end_ refers to the same character as _start_ or an earlier one, the selection is cleared.

Added in version 3.8.

selection\_to(_index_)[¶](#tkinter.Spinbox.selection_to "Link to this definition")

Set the selection between _index_ and the anchor point. If _index_ is before the anchor point, the selection runs from _index_ up to but not including the anchor point; if it is after, the selection runs from the anchor point up to but not including _index_; if it is the same, nothing happens. The anchor point is the one set by the most recent [`selection_from()`](#tkinter.Spinbox.selection_from "tkinter.Spinbox.selection_from") or [`selection_adjust()`](#tkinter.Spinbox.selection_adjust "tkinter.Spinbox.selection_adjust") call. If the selection is not in this widget, a new selection is created using the most recent anchor point.

Added in version 3.8.

_class_ tkinter.Text(_master\=None_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Text "Link to this definition")

A `Text` widget displays and edits multi-line text. Portions of the text may be styled with **tags**, particular positions may be annotated with floating **marks**, and arbitrary images and other widgets may be embedded in the text. The widget also provides an unlimited undo/redo mechanism and supports peer widgets that share the same underlying data. Inherits from [`Widget`](#tkinter.Widget "tkinter.Widget"), [`XView`](#tkinter.XView "tkinter.XView") and [`YView`](#tkinter.YView "tkinter.YView"), so the view can be scrolled horizontally and vertically with [`xview()`](#tkinter.XView.xview "tkinter.XView.xview") and [`yview()`](#tkinter.YView.yview "tkinter.YView.yview"). Refer to the Tk `text` manual page for the full list of options.

Most of the methods take one or more _index_ arguments that identify a position within the text. As described in the Tk `text` manual page, an index is a string consisting of a base, optionally followed by one or more modifiers. The base may be `'line.char'` (line _line_, character _char_, where lines are counted from 1 and characters within a line from 0; `'line.end'` refers to the newline ending the line), `'end'` (the position just after the last newline), the name of a mark, `'tag.first'` or `'tag.last'` (the first character tagged with _tag_, or the position just after the last such character), the name of an embedded image or window, or `@x,y` (the character covering pixel coordinates _x_, _y_ in the widget). A modifier such as `'+5 chars'`, `'-3 lines'`, `'linestart'`, `'lineend'`, `'wordstart'` or `'wordend'` adjusts the index relative to its base; several modifiers may be combined and are applied from left to right, for example `'insert wordstart - 1 c'`.

insert(_index_, _chars_, _\*args_)[¶](#tkinter.Text.insert "Link to this definition")

Insert the string _chars_ just before the character at _index_ (if _index_ is `'end'`, just before the final newline). By default the new text inherits any tags present on both sides of the insertion point. If _args_ is given, it consists of alternating _tagList_, _chars_ values: the preceding _chars_ receives exactly the tags listed (a tag list may be a single tag name or a sequence of names), overriding the surrounding tags.

delete(_index1_, _index2\=None_)[¶](#tkinter.Text.delete "Link to this definition")

Delete the range of characters from _index1_ up to but not including _index2_. If _index2_ is omitted, the single character at _index1_ is deleted. The widget always keeps a newline as its last character, so a deletion that would remove it is adjusted accordingly.

replace(_index1_, _index2_, _chars_, _\*args_)[¶](#tkinter.Text.replace "Link to this definition")

Replace the range of characters from _index1_ up to but not including _index2_ with _chars_. This is equivalent to a [`delete()`](#tkinter.Text.delete "tkinter.Text.delete") followed by an [`insert()`](#tkinter.Text.insert "tkinter.Text.insert") at _index1_; _args_ is interpreted as for `insert()`.

Added in version 3.3.

get(_index1_, _index2\=None_)[¶](#tkinter.Text.get "Link to this definition")

Return the text from _index1_ up to but not including _index2_ as a string. If _index2_ is omitted, return the single character at _index1_. Embedded images and windows are omitted from the result.

index(_index_)[¶](#tkinter.Text.index "Link to this definition")

Return the position corresponding to _index_ in the canonical `'line.char'` form.

compare(_index1_, _op_, _index2_)[¶](#tkinter.Text.compare "Link to this definition")

Compare the positions of _index1_ and _index2_ using the relational operator _op_, which must be one of `'<'`, `'<='`, `'=='`, `'>='`, `'>'` or `'!='`, and return the boolean result.

count(_index1_, _index2_, _\*options_, _return\_ints\=False_)[¶](#tkinter.Text.count "Link to this definition")

Count the number of items of the requested kinds between _index1_ and _index2_; the count is negative if _index1_ is after _index2_. Each of _options_ names a kind of item to count: `'chars'`, `'displaychars'`, `'displayindices'`, `'displaylines'`, `'indices'`, `'lines'`, `'xpixels'` or `'ypixels'` (the default, used when no option is given, is `'indices'`). The pseudo-option `'update'` forces any out-of-date layout information to be recalculated before the following options are evaluated. When _return\_ints_ is true and a single counting option is given, return a plain integer; otherwise return a tuple with one integer per counting option (or `None` if the result is empty).

Added in version 3.3.

在 3.13 版本发生变更: Added the _return\_ints_ parameter.

see(_index_)[¶](#tkinter.Text.see "Link to this definition")

Adjust the view so that the character given by _index_ is visible. If it is already visible the method has no effect; if it is a short distance out of view the widget scrolls just enough to bring it to the nearest edge, otherwise it scrolls to center _index_ in the window.

bbox(_index_)[¶](#tkinter.Text.bbox "Link to this definition")

Return a tuple `(x, y, width, height)` giving the bounding box, in pixels, of the visible part of the character at _index_, or `None` if that character is not visible on the screen.

This shadows the inherited `Misc.bbox()`; use [`grid_bbox()`](#tkinter.Misc.grid_bbox "tkinter.Misc.grid_bbox") for the grid bounding box.

dlineinfo(_index_)[¶](#tkinter.Text.dlineinfo "Link to this definition")

Return a tuple `(x, y, width, height, baseline)` describing the display line that contains _index_: the first four values give the bounding box of the line in pixels and _baseline_ gives the offset of the baseline measured down from the top of the area. Return `None` if that display line is not visible on the screen.

mark\_set(_markName_, _index_)[¶](#tkinter.Text.mark_set "Link to this definition")

Set the mark named _markName_ to the position just before the character at _index_, creating the mark if it does not already exist. A mark created this way has right gravity by default.

mark\_unset(_\*markNames_)[¶](#tkinter.Text.mark_unset "Link to this definition")

Remove each of the marks named in _markNames_. The special `insert` and `current` marks may not be removed.

mark\_names()[¶](#tkinter.Text.mark_names "Link to this definition")

Return a tuple of the names of all marks currently set in the widget.

mark\_gravity(_markName_, _direction\=None_)[¶](#tkinter.Text.mark_gravity "Link to this definition")

If _direction_ is omitted, return the gravity of mark _markName_, either `'left'` or `'right'`. Otherwise set its gravity to _direction_. The gravity determines on which side of the mark text inserted at the mark's position appears: a mark with right gravity (the default) stays to the right of such text.

mark\_next(_index_)[¶](#tkinter.Text.mark_next "Link to this definition")

Return the name of the first mark at or after _index_, or `None` if there is none. When _index_ is the name of a mark, the search starts just after that mark.

mark\_previous(_index_)[¶](#tkinter.Text.mark_previous "Link to this definition")

Return the name of the last mark at or before _index_, or `None` if there is none. When _index_ is the name of a mark, the search starts just before that mark.

tag\_add(_tagName_, _index1_, _\*args_)[¶](#tkinter.Text.tag_add "Link to this definition")

Add the tag _tagName_ to the range of characters from _index1_ up to but not including the next index in _args_. Further pairs of indices may follow in _args_ to tag additional ranges; a trailing single index tags just the character at that index.

tag\_remove(_tagName_, _index1_, _index2\=None_)[¶](#tkinter.Text.tag_remove "Link to this definition")

Remove the tag _tagName_ from the characters from _index1_ up to but not including _index2_ (or from the single character at _index1_ if _index2_ is omitted). The tag itself continues to exist even if no characters carry it.

tag\_delete(_\*tagNames_)[¶](#tkinter.Text.tag_delete "Link to this definition")

Delete each of the tags named in _tagNames_, removing them from all characters and discarding their options and bindings.

tag\_configure(_tagName_, _cnf\=None_, _\*\*kw_)[¶](#tkinter.Text.tag_configure "Link to this definition")

Query or modify the configuration options of the tag _tagName_. This mirrors [`configure()`](#tkinter.Misc.configure "tkinter.Misc.configure"), except that it applies to a tag rather than to the widget as a whole: with no options it returns a dictionary describing the current options, otherwise it sets the given options. Defining a tag this way also gives it a priority higher than any existing tag.

The supported tag options, all controlling the appearance of the tagged text, are:

_font_

The font to use for the text.

_foreground_

The color to use for the text.

_background_

The color to use for the area behind the text.

_fgstipple_, _bgstipple_

Bitmaps used to stipple the foreground (text) and the background; only well supported on X11.

_borderwidth_

The width of the border drawn around the text according to _relief_ (default `0`).

_relief_

The 3-D appearance of the text's border: `'flat'` (the default), `'raised'`, `'sunken'`, `'ridge'`, `'groove'` or `'solid'`.

_offset_

How far the text is raised above (or, if negative, lowered below) the baseline, for superscripts and subscripts.

_underline_

Whether to underline the text.

_underlinefg_

The color of the underline; it defaults to the text color.

_overstrike_

Whether to draw a line through the middle of the text.

_overstrikefg_

The color of the overstrike line; it defaults to the text color.

_elide_

Whether the text is elided (hidden).

_justify_

How to justify the first character of a display line: `'left'` (the default), `'right'` or `'center'`.

_wrap_

How to wrap lines that are too long: `'char'`, `'word'` or `'none'`.

_lmargin1_, _lmargin2_

The indentation, in pixels, of the first display line of a logical line and of the remaining display lines.

_lmargincolor_

The color of the left margin area.

_rmargin_

The right-hand margin, in pixels.

_rmargincolor_

The color of the right margin area.

_spacing1_, _spacing2_, _spacing3_

Extra space, in pixels, above the first display line of a logical line, between its display lines, and below its last display line.

_tabs_

The set of tab stops, in the same form as the widget's _tabs_ option.

_tabstyle_

How tab stops are interpreted: `'tabular'` or `'wordprocessor'`.

_selectbackground_, _selectforeground_

The background and foreground colors used for the text while it is selected.

备注

Tk 8.6 added the _lmargincolor_, _overstrikefg_, _rmargincolor_, _selectbackground_, _selectforeground_ and _underlinefg_ options.

[`tag_config()`](#tkinter.Text.tag_config "tkinter.Text.tag_config") is an alias of `tag_configure()`.

tag\_cget(_tagName_, _option_)[¶](#tkinter.Text.tag_cget "Link to this definition")

Return the current value of the configuration option _option_ for the tag _tagName_.

tag\_names(_index\=None_)[¶](#tkinter.Text.tag_names "Link to this definition")

If _index_ is omitted, return a tuple of the names of all tags defined in the widget; otherwise return only the names of the tags applied to the character at _index_. The names are ordered from lowest to highest priority.

tag\_ranges(_tagName_)[¶](#tkinter.Text.tag_ranges "Link to this definition")

Return a tuple of indices describing all ranges of text tagged with _tagName_. The result alternates start and end indices, so that elements `2*i` and `2*i+1` bound the _i_\-th range.

Search forward from _index1_ (up to _index2_ if given) for the first range of characters tagged with _tagName_, and return a two-element tuple of its start and end indices, or an empty tuple if there is no such range.

tag\_prevrange(_tagName_, _index1_, _index2\=None_)[¶](#tkinter.Text.tag_prevrange "Link to this definition")

Search backward from _index1_ (down to _index2_ if given) for the nearest preceding range of characters tagged with _tagName_, and return a two-element tuple of its start and end indices, or an empty tuple if there is no such range.

tag\_raise(_tagName_, _aboveThis\=None_)[¶](#tkinter.Text.tag_raise "Link to this definition")

Raise the priority of tag _tagName_ so that it is just above the priority of _aboveThis_, or to the highest priority of all tags if _aboveThis_ is omitted. When the display options of overlapping tags conflict, the higher-priority tag wins.

tag\_lower(_tagName_, _belowThis\=None_)[¶](#tkinter.Text.tag_lower "Link to this definition")

Lower the priority of tag _tagName_ so that it is just below the priority of _belowThis_, or to the lowest priority of all tags if _belowThis_ is omitted.

tag\_bind(_tagName_, _sequence_, _func_, _add\=None_)[¶](#tkinter.Text.tag_bind "Link to this definition")

Bind the event _sequence_ on characters tagged with _tagName_ to the callback _func_, so that _func_ is invoked when that event occurs over such a character. If _add_ is true the binding is added alongside any existing bindings for _sequence_, otherwise it replaces them. Works like [`bind()`](#tkinter.Misc.bind "tkinter.Misc.bind") and returns the identifier of the new binding.

tag\_unbind(_tagName_, _sequence_, _funcid\=None_)[¶](#tkinter.Text.tag_unbind "Link to this definition")

Remove the bindings of the event _sequence_ on characters tagged with _tagName_. If _funcid_ is given, only that binding (as returned by [`tag_bind()`](#tkinter.Text.tag_bind "tkinter.Text.tag_bind")) is removed and its callback is unregistered.

在 3.13 版本发生变更: If _funcid_ is given, only that callback is unbound.

image\_create(_index_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Text.image_create "Link to this definition")

Embed an image at _index_ and return the name assigned to this image instance, which may then be used as an index or passed to the other `image_*` methods. The options, given in _cnf_ and _kw_, include _image_ (the Tk image to display), _name_ (a base name for the instance), _align_, _padx_ and _pady_.

image\_cget(_index_, _option_)[¶](#tkinter.Text.image_cget "Link to this definition")

Return the current value of the configuration option _option_ for the embedded image at _index_.

image\_configure(_index_, _cnf\=None_, _\*\*kw_)[¶](#tkinter.Text.image_configure "Link to this definition")

Query or modify the configuration options of the embedded image at _index_, like [`configure()`](#tkinter.Misc.configure "tkinter.Misc.configure") but applied to that image.

image\_names()[¶](#tkinter.Text.image_names "Link to this definition")

Return a tuple of the names of all images embedded in the widget.

备注

This shadows the inherited [`Misc.image_names()`](#tkinter.Misc.image_names "tkinter.Misc.image_names"), which returns the names of all images in the Tcl interpreter; that method is not available on a `Text`.

window\_create(_index_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Text.window_create "Link to this definition")

Embed a window (any widget) at _index_. The options, given in _cnf_ and _kw_, include _window_ (the widget to embed), _create_ (a callback that creates the widget on demand), _align_, _stretch_, _padx_ and _pady_. The embedded widget must be a descendant of the text widget's parent.

window\_cget(_index_, _option_)[¶](#tkinter.Text.window_cget "Link to this definition")

Return the current value of the configuration option _option_ for the embedded window at _index_.

window\_configure(_index_, _cnf\=None_, _\*\*kw_)[¶](#tkinter.Text.window_configure "Link to this definition")

Query or modify the configuration options of the embedded window at _index_, like [`configure()`](#tkinter.Misc.configure "tkinter.Misc.configure") but applied to that window.

[`window_config()`](#tkinter.Text.window_config "tkinter.Text.window_config") is an alias of `window_configure()`.

window\_names()[¶](#tkinter.Text.window_names "Link to this definition")

Return a tuple of the names of all windows embedded in the widget.

edit(_\*args_)[¶](#tkinter.Text.edit "Link to this definition")

Low-level wrapper around the Tk `edit` widget command that controls the undo/redo mechanism and the modified flag; _args_ is the `edit` subcommand and its arguments. The `edit_*()` methods below are thin wrappers around it and are usually more convenient.

edit\_modified(_arg\=None_)[¶](#tkinter.Text.edit_modified "Link to this definition")

If _arg_ is omitted, return the current state of the modified flag as true or false; the flag is set automatically whenever the text is inserted or deleted. Otherwise set the flag to the boolean _arg_.

edit\_undo()[¶](#tkinter.Text.edit_undo "Link to this definition")

Undo the most recent edit action, that is, all the inserts and deletes recorded on the undo stack since the previous separator, and move it to the redo stack. Raises [`TclError`](#tkinter.TclError "tkinter.TclError") if the undo stack is empty. Has no effect unless the _undo_ option is true. Since Tk 9.0, returns a tuple of indices delimiting the ranges of text that were changed.

edit\_redo()[¶](#tkinter.Text.edit_redo "Link to this definition")

Reapply the most recently undone edit action, provided no further edits have been made since, and move it back to the undo stack. Raises [`TclError`](#tkinter.TclError "tkinter.TclError") if the redo stack is empty. Has no effect unless the _undo_ option is true. Since Tk 9.0, returns a tuple of indices delimiting the ranges of text that were changed.

edit\_reset()[¶](#tkinter.Text.edit_reset "Link to this definition")

Clear the undo and redo stacks.

edit\_separator()[¶](#tkinter.Text.edit_separator "Link to this definition")

Push a separator onto the undo stack, marking a boundary between edit actions for undo and redo. Has no effect unless the _undo_ option is true. Separators are inserted automatically when the _autoseparators_ option is true.

search(_pattern_, _index_, _stopindex\=None_, _forwards\=None_, _backwards\=None_, _exact\=None_, _regexp\=None_, _nocase\=None_, _count\=None_, _elide\=None_)[¶](#tkinter.Text.search "Link to this definition")

Search for _pattern_ starting at _index_ and return the index of the first character of the first match, or an empty string if there is no match. Searching stops at _stopindex_ if given; otherwise it wraps around the ends of the text until the starting position is reached again. The following boolean keyword flags control the search: _forwards_ or _backwards_ select the direction (forward is the default); _exact_ (the default) or _regexp_ select literal or regular-expression matching; _nocase_ makes the match case-insensitive; and _elide_ causes hidden text to be searched as well. If _count_ is a [`Variable`](#tkinter.Variable "tkinter.Variable"), the number of index positions in the match is stored in it.

scan\_mark(_x_, _y_)[¶](#tkinter.Text.scan_mark "Link to this definition")

Record _x_, _y_ and the current view, for use with later [`scan_dragto()`](#tkinter.Text.scan_dragto "tkinter.Text.scan_dragto") calls. This is typically bound to a mouse button press in the widget.

scan\_dragto(_x_, _y_)[¶](#tkinter.Text.scan_dragto "Link to this definition")

Scroll the widget by 10 times the difference between _x_, _y_ and the coordinates passed to the last [`scan_mark()`](#tkinter.Text.scan_mark "tkinter.Text.scan_mark") call. This is typically bound to mouse motion events, producing the effect of dragging the text at high speed through the window.

debug(_boolean\=None_)[¶](#tkinter.Text.debug "Link to this definition")

If _boolean_ is omitted, return whether internal consistency checks of the B-tree data structure are enabled. Otherwise enable or disable them. The setting is shared by all text widgets and may noticeably slow down widgets holding large amounts of text.

dump(_index1_, _index2\=None_, _command\=None_, _\*\*kw_)[¶](#tkinter.Text.dump "Link to this definition")

Return the contents of the widget from _index1_ up to but not including _index2_ (or just the segment at _index1_ if _index2_ is omitted), including text and information about marks, tags, images and windows. The result is a list of `(key, value, index)` triples, where _key_ is one of `'text'`, `'mark'`, `'tagon'`, `'tagoff'`, `'image'` or `'window'`. By default all kinds are reported; passing any of the keyword arguments _all_, _text_, _mark_, _tag_, _image_ or _window_ as true restricts the dump to the selected kinds. If _command_ is given, it is called once per triple with the three values as arguments and nothing is returned.

peer\_create(_newPathName_, _cnf\={}_, _\*\*kw_)[¶](#tkinter.Text.peer_create "Link to this definition")

Create a peer text widget with the path name _newPathName_ that shares this widget's underlying data (text, marks, tags, images and the undo stack). Changes made through any peer are reflected in all of them. By default the peer covers the same lines as this widget; standard text options, including _startline_ and _endline_, may be given to override this.

Added in version 3.3.

peer\_names()[¶](#tkinter.Text.peer_names "Link to this definition")

Return a tuple of the path names of this widget's peers, not including the widget itself.

Added in version 3.3.

yview\_pickplace(_\*what_)[¶](#tkinter.Text.yview_pickplace "Link to this definition")

Adjust the view so that the location given by _what_ is visible. This is an obsolete equivalent of [`see()`](#tkinter.Text.see "tkinter.Text.see"), which should be used instead.

### Variable classes[¶](#variable-classes "Link to this heading")

_class_ tkinter.Variable(_master\=None_, _value\=None_, _name\=None_)[¶](#tkinter.Variable "Link to this definition")

The base class for the Tk variable wrappers. A Tk variable is a value stored in the Tcl interpreter that can be linked to widgets through their _variable_ or _textvariable_ options (see [关联控件变量](#coupling-widget-variables)), so that changes propagate both ways: updating the variable updates every widget bound to it, and a user editing such a widget updates the variable.

_master_ is the widget whose Tcl interpreter owns the variable; if omitted, the default root window is used. _value_ is the initial value; if omitted, a type-specific default is used. _name_ is the name of the variable in the Tcl interpreter; if omitted, a unique name of the form `'PY_VARnum'` is generated. If _name_ matches an existing variable and _value_ is omitted, the existing value is retained.

In most cases you should use one of the typed subclasses below -- [`StringVar`](#tkinter.StringVar "tkinter.StringVar"), [`IntVar`](#tkinter.IntVar "tkinter.IntVar"), [`DoubleVar`](#tkinter.DoubleVar "tkinter.DoubleVar") or [`BooleanVar`](#tkinter.BooleanVar "tkinter.BooleanVar") -- rather than `Variable` directly.

备注

When a `Variable` is garbage collected, its Tcl variable is unset. Keep a reference to it for as long as a widget is linked to it, for example by storing it as an attribute rather than in a local variable. Otherwise Tk recreates the Tcl variable to keep the widget working, but it is never unset again, leaking one Tcl variable per dropped wrapper.

在 3.10 版本发生变更: Two variables now compare equal (`==`) only when they have the same name, are of the same class, and belong to the same Tcl interpreter.

get()[¶](#tkinter.Variable.get "Link to this definition")

Return the current value of the variable. For the base class the value is returned as a string; the typed subclasses convert it to the appropriate Python type.

set(_value_)[¶](#tkinter.Variable.set "Link to this definition")

Set the variable to _value_. [`initialize()`](#tkinter.Variable.initialize "tkinter.Variable.initialize") is an alias of `set()`.

Added in version 3.3: The _initialize_ spelling.

trace\_add(_mode_, _callback_)[¶](#tkinter.Variable.trace_add "Link to this definition")

Register _callback_ to be called when the variable is accessed according to _mode_. _mode_ is one of the strings `'array'`, `'read'`, `'write'` or `'unset'`, or a list or tuple of such strings.

When triggered, _callback_ is called with three arguments: the name of the Tcl variable, an index (or an empty string if the variable is not an element of an array), and the _mode_ that triggered the call.

Return the internal name of the registered callback, which can be passed to [`trace_remove()`](#tkinter.Variable.trace_remove "tkinter.Variable.trace_remove").

Added in version 3.6.

trace\_remove(_mode_, _cbname_)[¶](#tkinter.Variable.trace_remove "Link to this definition")

Remove a trace callback from the variable. _mode_ must match the _mode_ that was passed to [`trace_add()`](#tkinter.Variable.trace_add "tkinter.Variable.trace_add"), and _cbname_ is the callback name returned by `trace_add()`.

Added in version 3.6.

trace\_info()[¶](#tkinter.Variable.trace_info "Link to this definition")

Return a list of `(modes, cbname)` pairs describing all traces currently set on the variable, where _modes_ is a tuple of mode strings and _cbname_ is the internal callback name.

Added in version 3.6.

trace\_variable(_mode_, _callback_)[¶](#tkinter.Variable.trace_variable "Link to this definition")

Register _callback_ to be called when the variable is accessed according to _mode_. _mode_ is one of the strings `'r'`, `'w'` or `'u'`, for read, write or unset. Return the internal name of the registered callback. [`trace()`](https://docs.python.org/zh-cn/3/library/trace.html#module-trace "trace: Trace or track Python statement execution.") is an alias of `trace_variable()`.

自 3.6 版本弃用: Use [`trace_add()`](#tkinter.Variable.trace_add "tkinter.Variable.trace_add") instead. This method wraps a Tcl feature that was removed in Tcl 9.0.

trace\_vdelete(_mode_, _cbname_)[¶](#tkinter.Variable.trace_vdelete "Link to this definition")

Remove the trace callback named _cbname_ registered for _mode_ with [`trace_variable()`](#tkinter.Variable.trace_variable "tkinter.Variable.trace_variable").

自 3.6 版本弃用: Use [`trace_remove()`](#tkinter.Variable.trace_remove "tkinter.Variable.trace_remove") instead. This method wraps a Tcl feature that was removed in Tcl 9.0.

trace\_vinfo()[¶](#tkinter.Variable.trace_vinfo "Link to this definition")

Return a list of `(mode, cbname)` pairs for all traces set on the variable with [`trace_variable()`](#tkinter.Variable.trace_variable "tkinter.Variable.trace_variable").

自 3.6 版本弃用: Use [`trace_info()`](#tkinter.Variable.trace_info "tkinter.Variable.trace_info") instead. This method wraps a Tcl feature that was removed in Tcl 9.0.

_class_ tkinter.StringVar(_master\=None_, _value\=None_, _name\=None_)[¶](#tkinter.StringVar "Link to this definition")

A [`Variable`](#tkinter.Variable "tkinter.Variable") subclass that holds a string. The default value is `''`.

get()[¶](#tkinter.StringVar.get "Link to this definition")

Return the value of the variable as a [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str").

_class_ tkinter.IntVar(_master\=None_, _value\=None_, _name\=None_)[¶](#tkinter.IntVar "Link to this definition")

A [`Variable`](#tkinter.Variable "tkinter.Variable") subclass that holds an integer. The default value is `0`.

get()[¶](#tkinter.IntVar.get "Link to this definition")

Return the value of the variable as an [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int").

_class_ tkinter.DoubleVar(_master\=None_, _value\=None_, _name\=None_)[¶](#tkinter.DoubleVar "Link to this definition")

A [`Variable`](#tkinter.Variable "tkinter.Variable") subclass that holds a float. The default value is `0.0`.

get()[¶](#tkinter.DoubleVar.get "Link to this definition")

Return the value of the variable as a [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float").

备注

A floating-point value is always parsed with a period (`.`) as the decimal separator, but [`Spinbox`](#tkinter.Spinbox "tkinter.Spinbox"), [`Scale`](#tkinter.Scale "tkinter.Scale") and [`ttk.Spinbox`](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Spinbox "tkinter.ttk.Spinbox") format it according to the `LC_NUMERIC` locale. Under a locale that uses a comma they produce a value that [`get()`](#tkinter.DoubleVar.get "tkinter.DoubleVar.get") cannot read, raising [`TclError`](#tkinter.TclError "tkinter.TclError"). Set `LC_NUMERIC` to a locale that uses a period (such as `'C'`) to avoid this.

_class_ tkinter.BooleanVar(_master\=None_, _value\=None_, _name\=None_)[¶](#tkinter.BooleanVar "Link to this definition")

A [`Variable`](#tkinter.Variable "tkinter.Variable") subclass that holds a boolean. The default value is `False`.

get()[¶](#tkinter.BooleanVar.get "Link to this definition")

Return the value of the variable as a [`bool`](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool"). Raise a [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") if the value cannot be interpreted as a boolean.

set(_value_)[¶](#tkinter.BooleanVar.set "Link to this definition")

Set the variable to _value_, converting it to a boolean. [`initialize()`](#tkinter.BooleanVar.initialize "tkinter.BooleanVar.initialize") is an alias of `set()`.

Added in version 3.3: The _initialize_ spelling.

### Image classes[¶](#image-classes "Link to this heading")

_class_ tkinter.Image(_imgtype_, _name\=None_, _cnf\={}_, _master\=None_, _\*\*kw_)[¶](#tkinter.Image "Link to this definition")

Base class for Tk images. _imgtype_ is the Tk image type, one of `'photo'` or `'bitmap'`. An image is a named object that can be displayed by widgets through their _image_ option; deleting all references to the `Image` object deletes the underlying Tk image. Usually you create a [`PhotoImage`](#tkinter.PhotoImage "tkinter.PhotoImage") or [`BitmapImage`](#tkinter.BitmapImage "tkinter.BitmapImage") rather than an `Image` directly.

The image's configuration options are given by _cnf_ and _kw_ and may be queried and changed later with the mapping protocol (using `image[key]`) or with the [`configure()`](#tkinter.Image.configure "tkinter.Image.configure") method.

configure(_\*\*kw_)[¶](#tkinter.Image.configure "Link to this definition")

Modify one or more configuration options of the image. The valid options depend on the image type; see [`PhotoImage`](#tkinter.PhotoImage "tkinter.PhotoImage") and [`BitmapImage`](#tkinter.BitmapImage "tkinter.BitmapImage"). [`config()`](#tkinter.Image.config "tkinter.Image.config") is an alias of `configure()`.

height()[¶](#tkinter.Image.height "Link to this definition")

Return the height of the image, in pixels.

width()[¶](#tkinter.Image.width "Link to this definition")

Return the width of the image, in pixels.

type()[¶](#tkinter.Image.type "Link to this definition")

Return the type of the image, that is the value of _imgtype_ with which it was created (for example `'photo'` or `'bitmap'`).

_class_ tkinter.PhotoImage(_name\=None_, _cnf\={}_, _master\=None_, _\*\*kw_)[¶](#tkinter.PhotoImage "Link to this definition")

A full-color image (the Tk `photo` image type), stored internally with a varying degree of transparency per pixel. It can read and write GIF, PPM/PGM and (in Tk 8.6 and later) PNG files, read SVG files (in Tk 9.0 and later), and be drawn in widgets. Inherits from [`Image`](#tkinter.Image "tkinter.Image").

The configuration options include _data_ (the image contents as a string), _file_ (the name of a file to read the contents from), _format_ (the name of the file format handler), _width_ and _height_ (the size of the image, used when building it up piece by piece), _gamma_ and _palette_.

blank()[¶](#tkinter.PhotoImage.blank "Link to this definition")

Blank the image; that is, set the entire image to have no data, so that it is displayed as transparent and the background of whatever window it is displayed in shows through.

cget(_option_)[¶](#tkinter.PhotoImage.cget "Link to this definition")

Return the current value of the configuration option _option_.

copy(_\*_, _from\_coords\=None_, _zoom\=None_, _subsample\=None_)[¶](#tkinter.PhotoImage.copy "Link to this definition")

Return a new `PhotoImage` with a copy of this image.

_from\_coords_ specifies a rectangular sub-region of the source image to be copied. It must be a tuple or a list of 1 to 4 integers `(x1, y1, x2, y2)`. `(x1, y1)` and `(x2, y2)` specify diagonally opposite corners of the rectangle. If _x2_ and _y2_ are not specified, they default to the bottom-right corner of the source image. The pixels copied include the left and top edges of the rectangle but not the bottom or right edges. If _from\_coords_ is not given, the whole source image is copied.

If _zoom_ or _subsample_ are specified, the image is transformed as in the [`zoom()`](#tkinter.PhotoImage.zoom "tkinter.PhotoImage.zoom") or [`subsample()`](#tkinter.PhotoImage.subsample "tkinter.PhotoImage.subsample") methods. The value must be a single integer or a pair of integers.

在 3.13 版本发生变更: Added the _from\_coords_, _zoom_ and _subsample_ parameters.

copy\_replace(_sourceImage_, _\*_, _from\_coords\=None_, _to\=None_, _shrink\=False_, _zoom\=None_, _subsample\=None_, _compositingrule\=None_)[¶](#tkinter.PhotoImage.copy_replace "Link to this definition")

Copy a region from _sourceImage_ (which must be a `PhotoImage`) into this image, possibly with pixel zooming and/or subsampling. If no options are specified, the whole of _sourceImage_ is copied into this image, starting at coordinates `(0, 0)`.

_from\_coords_ specifies a rectangular sub-region of the source image to be copied, as in the [`copy()`](https://docs.python.org/zh-cn/3/library/copy.html#module-copy "copy: Shallow and deep copy operations.") method.

_to_ specifies a rectangular sub-region of the destination image to be affected. It must be a tuple or a list of 1 to 4 integers `(x1, y1, x2, y2)`. If _x2_ and _y2_ are not specified, they default to `(x1, y1)` plus the size of the source region (after subsampling and zooming, if specified). If _x2_ and _y2_ are specified, the source region is replicated if necessary to fill the destination region in a tiled fashion.

If _shrink_ is true, the size of the destination image is reduced, if necessary, so that the region being copied into is at the bottom-right corner of the image.

If _zoom_ or _subsample_ are specified, the image is transformed as in the [`zoom()`](#tkinter.PhotoImage.zoom "tkinter.PhotoImage.zoom") or [`subsample()`](#tkinter.PhotoImage.subsample "tkinter.PhotoImage.subsample") methods. The value must be a single integer or a pair of integers.

_compositingrule_ specifies how transparent pixels in the source image are combined with the destination image. With `'overlay'` (the default), the old contents of the destination image remain visible, as if the source image were printed on a piece of transparent film and placed over the top of the destination. With `'set'`, the old contents of the destination image are discarded and the source image is used as-is.

Added in version 3.13.

data(_format\=None_, _\*_, _from\_coords\=None_, _background\=None_, _grayscale\=False_)[¶](#tkinter.PhotoImage.data "Link to this definition")

Return the image data.

_format_ specifies the name of the image file format handler to use. If it is not given, the data is returned as a tuple (one element per row) of strings containing space-separated (one element per pixel/column) colors in `#RRGGBB` format.

_from\_coords_ specifies a rectangular region of the image to be returned. It must be a tuple or a list of 1 to 4 integers `(x1, y1, x2, y2)`. If only _x1_ and _y1_ are specified, the region extends from `(x1, y1)` to the bottom-right corner of the image. If all four coordinates are given, they specify diagonally opposite corners of the region, including `(x1, y1)` and excluding `(x2, y2)`. If _from\_coords_ is not given, the whole image is returned.

If _background_ is specified, the data does not contain any transparency information; in all transparent pixels the color is replaced by the specified color.

If _grayscale_ is true, the data does not contain color information; all pixel data is transformed into grayscale.

Added in version 3.13.

get(_x_, _y_)[¶](#tkinter.PhotoImage.get "Link to this definition")

Return the color of the pixel at coordinates (_x_, _y_) as an `(r, g, b)` tuple of three integers between 0 and 255, representing the red, green and blue components respectively.

put(_data_, _to\=None_)[¶](#tkinter.PhotoImage.put "Link to this definition")

Set pixels of the image to the colors given in _data_, which must be a string or a nested sequence of horizontal rows of pixel colors (for example `"{red green} {blue yellow}"`).

_to_ specifies the coordinates of the region of the image into which the data are copied. It must be a tuple or a list of 2 or 4 integers `(x1, y1)` or `(x1, y1, x2, y2)` giving the top-left corner, and optionally the bottom-right corner, of the region. The default position is `(0, 0)`.

read(_filename_, _format\=None_, _\*_, _from\_coords\=None_, _to\=None_, _shrink\=False_)[¶](#tkinter.PhotoImage.read "Link to this definition")

Read image data from the file named _filename_ into the image.

_format_ specifies the format of the image data in the file.

_from\_coords_ specifies a rectangular sub-region of the image file data to be copied to the destination image. It must be a tuple or a list of 1 to 4 integers `(x1, y1, x2, y2)`. If only _x1_ and _y1_ are specified, the region extends from `(x1, y1)` to the bottom-right corner of the image in the file. If all four coordinates are given, they specify diagonally opposite corners of the region. If _from\_coords_ is not given, the whole of the image in the file is read.

_to_ specifies the coordinates of the top-left corner of the region of the image into which the data are read. The default is `(0, 0)`.

If _shrink_ is true, the size of the image is reduced, if necessary, so that the region into which the file data are read is at the bottom-right corner of the image.

Added in version 3.13.

subsample(_x_, _y\=''_, _\*_, _from\_coords\=None_)[¶](#tkinter.PhotoImage.subsample "Link to this definition")

Return a new `PhotoImage` based on this image but using only every _x_\-th pixel in the X direction and every _y_\-th pixel in the Y direction. If _y_ is not given, it defaults to the same value as _x_.

_from\_coords_ specifies a rectangular sub-region of the source image to be copied, as in the [`copy()`](https://docs.python.org/zh-cn/3/library/copy.html#module-copy "copy: Shallow and deep copy operations.") method.

在 3.13 版本发生变更: Added the _from\_coords_ parameter.

transparency\_get(_x_, _y_)[¶](#tkinter.PhotoImage.transparency_get "Link to this definition")

Return `True` if the pixel at coordinates (_x_, _y_) is fully transparent, `False` otherwise.

Added in version 3.8.

transparency\_set(_x_, _y_, _boolean_)[¶](#tkinter.PhotoImage.transparency_set "Link to this definition")

Make the pixel at coordinates (_x_, _y_) fully transparent if _boolean_ is true, fully opaque otherwise.

Added in version 3.8.

write(_filename_, _format\=None_, _from\_coords\=None_, _\*_, _background\=None_, _grayscale\=False_)[¶](#tkinter.PhotoImage.write "Link to this definition")

Write image data from the image to the file named _filename_.

_format_ specifies the name of the image file format handler to use. If it is not given, the format is guessed from the file extension.

_from\_coords_ specifies a rectangular region of the image to be written. It must be a tuple or a list of 1 to 4 integers `(x1, y1, x2, y2)`. If only _x1_ and _y1_ are specified, the region extends from `(x1, y1)` to the bottom-right corner of the image. If all four coordinates are given, they specify diagonally opposite corners of the region. If _from\_coords_ is not given, the whole image is written.

If _background_ is specified, the data does not contain any transparency information; in all transparent pixels the color is replaced by the specified color.

If _grayscale_ is true, the data does not contain color information; all pixel data is transformed into grayscale.

在 3.13 版本发生变更: Added the _background_ and _grayscale_ parameters.

zoom(_x_, _y\=''_, _\*_, _from\_coords\=None_)[¶](#tkinter.PhotoImage.zoom "Link to this definition")

Return a new `PhotoImage` with this image magnified by a factor of _x_ in the X direction and _y_ in the Y direction. If _y_ is not given, it defaults to the same value as _x_.

_from\_coords_ specifies a rectangular sub-region of the source image to be copied, as in the [`copy()`](https://docs.python.org/zh-cn/3/library/copy.html#module-copy "copy: Shallow and deep copy operations.") method.

在 3.13 版本发生变更: Added the _from\_coords_ parameter.

_class_ tkinter.BitmapImage(_name\=None_, _cnf\={}_, _master\=None_, _\*\*kw_)[¶](#tkinter.BitmapImage "Link to this definition")

A two-color image (the Tk `bitmap` image type) created from an X11 bitmap. Each pixel displays a foreground color, a background color, or nothing (producing a transparent effect). Inherits from [`Image`](#tkinter.Image "tkinter.Image").

The configuration options are _data_ or _file_ (the source bitmap, given as a string in X11 bitmap format or as the name of a file in that format), _maskdata_ or _maskfile_ (the mask bitmap, in the same forms), and _foreground_ and _background_ (the two colors). For pixels where the mask is zero the image displays nothing; for other pixels it displays the foreground color where the source is one and the background color where the source is zero. If _background_ is set to an empty string, the background pixels are transparent.

`BitmapImage` has no methods of its own beyond those inherited from [`Image`](#tkinter.Image "tkinter.Image").

### Other classes[¶](#other-classes "Link to this heading")

_class_ tkinter.Event[¶](#tkinter.Event "Link to this definition")

A container for the attributes of an event passed to a callback bound with [`Misc.bind()`](#tkinter.Misc.bind "tkinter.Misc.bind"). An `Event` instance has the following attributes, each corresponding to a field of the underlying Tk event; depending on the event type, some attributes may be set to the string `'??'` to indicate that they are not meaningful. See [绑定和事件](#bindings-and-events).

serial[¶](#tkinter.Event.serial "Link to this definition")

The serial number of the event.

num[¶](#tkinter.Event.num "Link to this definition")

The mouse button that was pressed or released (for button events).

focus[¶](#tkinter.Event.focus "Link to this definition")

Whether the window has the focus (for `Enter` and `Leave` events).

height[¶](#tkinter.Event.height "Link to this definition")

width[¶](#tkinter.Event.width "Link to this definition")

The new height and width of the window (for `Configure` and `Expose` events).

keycode[¶](#tkinter.Event.keycode "Link to this definition")

The keycode of the key that was pressed or released.

state[¶](#tkinter.Event.state "Link to this definition")

The state of the event, as a number (for most events) or a string (for `Visibility` events).

time[¶](#tkinter.Event.time "Link to this definition")

The timestamp of the event, in milliseconds.

x[¶](#tkinter.Event.x "Link to this definition")

y[¶](#tkinter.Event.y "Link to this definition")

The pointer position relative to the widget, in pixels.

x\_root[¶](#tkinter.Event.x_root "Link to this definition")

y\_root[¶](#tkinter.Event.y_root "Link to this definition")

The pointer position relative to the top-left corner of the screen, in pixels.

char[¶](#tkinter.Event.char "Link to this definition")

The character typed, as a string (for key events).

send\_event[¶](#tkinter.Event.send_event "Link to this definition")

`True` if the event was sent by another application.

keysym[¶](#tkinter.Event.keysym "Link to this definition")

The symbolic name of the key that was pressed or released.

keysym\_num[¶](#tkinter.Event.keysym_num "Link to this definition")

The numeric value of [`keysym`](#tkinter.Event.keysym "tkinter.Event.keysym").

type[¶](#tkinter.Event.type "Link to this definition")

The [`EventType`](#tkinter.EventType "tkinter.EventType") of the event.

widget[¶](#tkinter.Event.widget "Link to this definition")

The widget on which the event occurred.

delta[¶](#tkinter.Event.delta "Link to this definition")

The amount the mouse wheel was rotated (for `MouseWheel` events).

_class_ tkinter.EventType(_\*values_)[¶](#tkinter.EventType "Link to this definition")

An [`enum.StrEnum`](https://docs.python.org/zh-cn/3/library/enum.html#enum.StrEnum "enum.StrEnum") enumerating the Tk event types, used as the value of [`Event.type`](#tkinter.Event.type "tkinter.Event.type"). Its members include, among others, `KeyPress`, `KeyRelease`, `ButtonPress`, `ButtonRelease`, `Motion`, `Enter`, `Leave`, `FocusIn`, `FocusOut`, `Configure`, `Map`, `Unmap`, `Expose`, `Destroy` and `MouseWheel`.

Added in version 3.6.

_class_ tkinter.CallWrapper(_func_, _subst_, _widget_)[¶](#tkinter.CallWrapper "Link to this definition")

Internal helper that wraps a Python callback so that it can be invoked from Tcl. _func_ is the Python function, _subst_ is an optional function that pre-processes the Tcl arguments, and _widget_ is the widget used for error reporting. Instances are created automatically by [`Misc.register()`](#tkinter.Misc.register "tkinter.Misc.register"); this class is not normally used directly.

### 模块级函数[¶](#module-level-functions "Link to this heading")

tkinter.Tcl(_screenName\=None_, _baseName\=None_, _className\='Tk'_, _useTk\=False_)[¶](#tkinter.Tcl "Link to this definition")

The `Tcl()` function is a factory function which creates an object much like that created by the [`Tk`](#tkinter.Tk "tkinter.Tk") class, except that it does not initialize the Tk subsystem. This is most often useful when driving the Tcl interpreter in an environment where one doesn't want to create extraneous toplevel windows, or where one cannot (such as Unix/Linux systems without an X server). An object created by the `Tcl()` object can have a Toplevel window created (and the Tk subsystem initialized) by calling its [`loadtk()`](#tkinter.Tk.loadtk "tkinter.Tk.loadtk") method.

tkinter.NoDefaultRoot()[¶](#tkinter.NoDefaultRoot "Link to this definition")

Inhibit the creation of an implicit default root window. Afterwards `tkinter` no longer creates a shared default root automatically, and operations that rely on one --- such as constructing a widget without an explicit _master_ --- raise a [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError"). Call this early in larger applications to make the root window explicit.

tkinter.mainloop(_n\=0_)[¶](#tkinter.mainloop "Link to this definition")

Run the Tk main event loop on the default root window until all windows are destroyed. Equivalent to calling [`Misc.mainloop()`](#tkinter.Misc.mainloop "tkinter.Misc.mainloop") on the default root.

tkinter.getboolean(_s_)[¶](#tkinter.getboolean "Link to this definition")

Convert the Tcl boolean string _s_ (one of `'1'`, `'true'`, `'yes'`, `'on'` and similar, or their false counterparts) to a Python [`bool`](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool"). Raise [`TclError`](#tkinter.TclError "tkinter.TclError") for an invalid value.

tkinter.getdouble(_s_)[¶](#tkinter.getdouble "Link to this definition")

Convert _s_ to a floating-point number. This is the built-in [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float").

tkinter.getint(_s_)[¶](#tkinter.getint "Link to this definition")

Convert _s_ to an integer. This is the built-in [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int").

tkinter.image\_names()[¶](#tkinter.image_names "Link to this definition")

Return the names of all existing images in the default root's interpreter.

tkinter.image\_types()[¶](#tkinter.image_types "Link to this definition")

Return the available image types (such as `'photo'` and `'bitmap'`) in the default root's interpreter.

### File handlers[¶](#file-handlers "Link to this heading")

Tk 允许为文件操作注册和注销一个回调函数，当对文件描述符进行 I/O 时，Tk 的主循环会调用该回调函数。每个文件描述符只能注册一个处理程序。示例代码如下：

import tkinter
widget \= tkinter.Tk()
mask \= tkinter.READABLE | tkinter.WRITABLE
widget.tk.createfilehandler(file, mask, callback)
...
widget.tk.deletefilehandler(file)

在 Windows 系统中不可用。

由于不知道可读取多少字节，你可能不希望使用 [`BufferedIOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase "io.BufferedIOBase") 或 [`TextIOBase`](https://docs.python.org/zh-cn/3/library/io.html#io.TextIOBase "io.TextIOBase") 的 [`read()`](https://docs.python.org/zh-cn/3/library/io.html#io.BufferedIOBase.read "io.BufferedIOBase.read") 或 [`readline()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.readline "io.IOBase.readline") 方法，因为这些方法必须读取预定数量的字节。 对于套接字，可使用 [`recv()`](https://docs.python.org/zh-cn/3/library/socket.html#socket.socket.recv "socket.socket.recv") 或 [`recvfrom()`](https://docs.python.org/zh-cn/3/library/socket.html#socket.socket.recvfrom "socket.socket.recvfrom") 方法；对于其他文件，可使用原始读取方法或 `os.read(file.fileno(), maxbytecount)`。

Widget.tk.createfilehandler(_file_, _mask_, _func_)[¶](#tkinter.Widget.tk.createfilehandler "Link to this definition")

注册文件处理程序的回调函数 _func_。 _file_ 参数可以是具备 [`fileno()`](https://docs.python.org/zh-cn/3/library/io.html#io.IOBase.fileno "io.IOBase.fileno") 方法的对象（例如文件或套接字对象），也可以是整数文件描述符。 _mask_ 参数是下述三个常量的逻辑“或”组合。回调函数将用以下格式调用：

callback(file, mask)

Widget.tk.deletefilehandler(_file_)[¶](#tkinter.Widget.tk.deletefilehandler "Link to this definition")

注销文件处理函数。

tkinter.READABLE[¶](#tkinter.READABLE "Link to this definition")

tkinter.WRITABLE[¶](#tkinter.WRITABLE "Link to this definition")

tkinter.EXCEPTION[¶](#tkinter.EXCEPTION "Link to this definition")

Constants used in the _mask_ arguments.

### 常量[¶](#constants "Link to this heading")

The following symbolic constants are available in both the `tkinter` and `tkinter.constants` namespaces.

tkinter.TRUE[¶](#tkinter.TRUE "Link to this definition")

tkinter.YES[¶](#tkinter.YES "Link to this definition")

tkinter.ON[¶](#tkinter.ON "Link to this definition")

Truthy values, all equal to the integer `1`.

tkinter.FALSE[¶](#tkinter.FALSE "Link to this definition")

tkinter.NO[¶](#tkinter.NO "Link to this definition")

tkinter.OFF[¶](#tkinter.OFF "Link to this definition")

Falsy values, all equal to the integer `0`.

tkinter.N[¶](#tkinter.N "Link to this definition")

tkinter.S[¶](#tkinter.S "Link to this definition")

tkinter.E[¶](#tkinter.E "Link to this definition")

tkinter.W[¶](#tkinter.W "Link to this definition")

tkinter.NE[¶](#tkinter.NE "Link to this definition")

tkinter.NW[¶](#tkinter.NW "Link to this definition")

tkinter.SE[¶](#tkinter.SE "Link to this definition")

tkinter.SW[¶](#tkinter.SW "Link to this definition")

tkinter.NS[¶](#tkinter.NS "Link to this definition")

tkinter.EW[¶](#tkinter.EW "Link to this definition")

tkinter.NSEW[¶](#tkinter.NSEW "Link to this definition")

tkinter.CENTER[¶](#tkinter.CENTER "Link to this definition")

Compass directions (`'n'`, `'s'`, `'e'`, `'w'` and the diagonals and edges) plus `CENTER` (`'center'`), used as values for the _anchor_ and _sticky_ options and by methods such as [`Misc.grid_anchor()`](#tkinter.Misc.grid_anchor "tkinter.Misc.grid_anchor").

tkinter.LEFT[¶](#tkinter.LEFT "Link to this definition")

tkinter.RIGHT[¶](#tkinter.RIGHT "Link to this definition")

tkinter.TOP[¶](#tkinter.TOP "Link to this definition")

tkinter.BOTTOM[¶](#tkinter.BOTTOM "Link to this definition")

Sides for the _side_ option of the packer (see [`Pack.pack_configure()`](#tkinter.Pack.pack_configure "tkinter.Pack.pack_configure")).

tkinter.X[¶](#tkinter.X "Link to this definition")

tkinter.Y[¶](#tkinter.Y "Link to this definition")

tkinter.BOTH[¶](#tkinter.BOTH "Link to this definition")

tkinter.NONE[¶](#tkinter.NONE "Link to this definition")

Values for the _fill_ option of the packer: `'x'`, `'y'`, `'both'` or `'none'`.

tkinter.RAISED[¶](#tkinter.RAISED "Link to this definition")

tkinter.SUNKEN[¶](#tkinter.SUNKEN "Link to this definition")

tkinter.FLAT[¶](#tkinter.FLAT "Link to this definition")

tkinter.RIDGE[¶](#tkinter.RIDGE "Link to this definition")

tkinter.GROOVE[¶](#tkinter.GROOVE "Link to this definition")

tkinter.SOLID[¶](#tkinter.SOLID "Link to this definition")

Values for the _relief_ option, which controls a widget's 3-D border.

tkinter.HORIZONTAL[¶](#tkinter.HORIZONTAL "Link to this definition")

tkinter.VERTICAL[¶](#tkinter.VERTICAL "Link to this definition")

Values for the _orient_ option of widgets such as [`Scale`](#tkinter.Scale "tkinter.Scale"), [`Scrollbar`](#tkinter.Scrollbar "tkinter.Scrollbar") and [`PanedWindow`](#tkinter.PanedWindow "tkinter.PanedWindow").

tkinter.CHAR[¶](#tkinter.CHAR "Link to this definition")

tkinter.WORD[¶](#tkinter.WORD "Link to this definition")

Values for the _wrap_ option of the [`Text`](#tkinter.Text "tkinter.Text") widget, selecting line wrapping on character or word boundaries.

tkinter.BASELINE[¶](#tkinter.BASELINE "Link to this definition")

The text-alignment value `'baseline'`.

tkinter.INSIDE[¶](#tkinter.INSIDE "Link to this definition")

tkinter.OUTSIDE[¶](#tkinter.OUTSIDE "Link to this definition")

Values for the _bordermode_ option of the placer (see [`Place.place_configure()`](#tkinter.Place.place_configure "tkinter.Place.place_configure")).

tkinter.INSERT[¶](#tkinter.INSERT "Link to this definition")

tkinter.CURRENT[¶](#tkinter.CURRENT "Link to this definition")

tkinter.END[¶](#tkinter.END "Link to this definition")

tkinter.ANCHOR[¶](#tkinter.ANCHOR "Link to this definition")

tkinter.SEL[¶](#tkinter.SEL "Link to this definition")

tkinter.SEL\_FIRST[¶](#tkinter.SEL_FIRST "Link to this definition")

tkinter.SEL\_LAST[¶](#tkinter.SEL_LAST "Link to this definition")

Symbolic indices used by the [`Text`](#tkinter.Text "tkinter.Text"), [`Entry`](#tkinter.Entry "tkinter.Entry"), [`Listbox`](#tkinter.Listbox "tkinter.Listbox") and [`Canvas`](#tkinter.Canvas "tkinter.Canvas") widgets, such as `'insert'` (the insertion cursor), `'current'`, `'end'`, `'anchor'` and the bounds of the selection (`'sel.first'` and `'sel.last'`).

tkinter.ALL[¶](#tkinter.ALL "Link to this definition")

The special tag `'all'`, which matches every item of a [`Canvas`](#tkinter.Canvas "tkinter.Canvas") or every character of a [`Text`](#tkinter.Text "tkinter.Text") (for example `canvas.delete(ALL)`).

tkinter.NORMAL[¶](#tkinter.NORMAL "Link to this definition")

tkinter.DISABLED[¶](#tkinter.DISABLED "Link to this definition")

tkinter.ACTIVE[¶](#tkinter.ACTIVE "Link to this definition")

tkinter.HIDDEN[¶](#tkinter.HIDDEN "Link to this definition")

Values for the _state_ option of various widgets and items.

tkinter.CASCADE[¶](#tkinter.CASCADE "Link to this definition")

tkinter.CHECKBUTTON[¶](#tkinter.CHECKBUTTON "Link to this definition")

tkinter.COMMAND[¶](#tkinter.COMMAND "Link to this definition")

tkinter.RADIOBUTTON[¶](#tkinter.RADIOBUTTON "Link to this definition")

tkinter.SEPARATOR[¶](#tkinter.SEPARATOR "Link to this definition")

Menu entry types, used as the _itemType_ argument of [`Menu.add()`](#tkinter.Menu.add "tkinter.Menu.add") and [`Menu.insert()`](#tkinter.Menu.insert "tkinter.Menu.insert").

tkinter.SINGLE[¶](#tkinter.SINGLE "Link to this definition")

tkinter.BROWSE[¶](#tkinter.BROWSE "Link to this definition")

tkinter.MULTIPLE[¶](#tkinter.MULTIPLE "Link to this definition")

tkinter.EXTENDED[¶](#tkinter.EXTENDED "Link to this definition")

Values for the _selectmode_ option of the [`Listbox`](#tkinter.Listbox "tkinter.Listbox") widget.

tkinter.PIESLICE[¶](#tkinter.PIESLICE "Link to this definition")

tkinter.CHORD[¶](#tkinter.CHORD "Link to this definition")

tkinter.ARC[¶](#tkinter.ARC "Link to this definition")

Values for the _style_ option of [`Canvas`](#tkinter.Canvas "tkinter.Canvas") arc items.

tkinter.BUTT[¶](#tkinter.BUTT "Link to this definition")

tkinter.PROJECTING[¶](#tkinter.PROJECTING "Link to this definition")

tkinter.ROUND[¶](#tkinter.ROUND "Link to this definition")

tkinter.BEVEL[¶](#tkinter.BEVEL "Link to this definition")

tkinter.MITER[¶](#tkinter.MITER "Link to this definition")

Values for the _capstyle_ (`'butt'`, `'projecting'`, `'round'`) and _joinstyle_ (`'round'`, `'bevel'`, `'miter'`) options of [`Canvas`](#tkinter.Canvas "tkinter.Canvas") line items.

tkinter.FIRST[¶](#tkinter.FIRST "Link to this definition")

tkinter.LAST[¶](#tkinter.LAST "Link to this definition")

Values for the _arrow_ option of [`Canvas`](#tkinter.Canvas "tkinter.Canvas") line items, indicating which ends have arrowheads.

tkinter.MOVETO[¶](#tkinter.MOVETO "Link to this definition")

tkinter.SCROLL[¶](#tkinter.SCROLL "Link to this definition")

The first argument passed by a [`Scrollbar`](#tkinter.Scrollbar "tkinter.Scrollbar") to the [`XView.xview()`](#tkinter.XView.xview "tkinter.XView.xview") or [`YView.yview()`](#tkinter.YView.yview "tkinter.YView.yview") method of the scrolled widget.

tkinter.UNITS[¶](#tkinter.UNITS "Link to this definition")

tkinter.PAGES[¶](#tkinter.PAGES "Link to this definition")

Values for the _what_ argument of [`XView.xview_scroll()`](#tkinter.XView.xview_scroll "tkinter.XView.xview_scroll") and [`YView.yview_scroll()`](#tkinter.YView.yview_scroll "tkinter.YView.yview_scroll").

tkinter.UNDERLINE[¶](#tkinter.UNDERLINE "Link to this definition")

tkinter.NUMERIC[¶](#tkinter.NUMERIC "Link to this definition")

tkinter.DOTBOX[¶](#tkinter.DOTBOX "Link to this definition")

其他选项值: `'underline'`, `'numeric'` 和 `'dotbox'`。
