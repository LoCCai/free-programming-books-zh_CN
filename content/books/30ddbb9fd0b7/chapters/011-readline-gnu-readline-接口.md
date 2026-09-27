* * *

`readline` 模块定义了许多方便从 Python 解释器完成和读取/写入历史文件的函数。 此模块可以直接使用，或通过支持在交互提示符下完成 Python 标识符的 [`rlcompleter`](https://docs.python.org/zh-cn/3/library/rlcompleter.html#module-rlcompleter "rlcompleter: Python identifier completion, suitable for the GNU readline library.") 模块使用。 使用此模块进行的设置会同时影响解释器的交互提示符以及内置 [`input()`](https://docs.python.org/zh-cn/3/builtins/functions.html#input "input") 函数提供的提示符。

Readline 的按键绑定可以通过一个初始化文件来配置，通常是你的用户目录中的 `.inputrc`。请参阅 GNU Readline 手册中的 [Readline 初始化文件](https://tiswww.cwru.edu/php/chet/readline/rluserman.html#Readline-Init-File) 来了解有关该文件的格式和允许的结构，以及 Readline 库的一般功能。

这是一个 [optional module](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module)。如果它在你的 CPython 副本中缺失，请查看你的发行方（也就是说，向你提供 Python 的人）的文档。如果你就是发行方，请参阅 [针对可选模块的要求](https://docs.python.org/zh-cn/3/using/configure.html#optional-module-requirements)。

备注

下层的 Readline 库 API 可能是使用 `editline` (`libedit`) 库而不是 GNU readline 来实现的。 在 macOS 上 `readline` 模块会在运行时检测所使用的是哪个库。

用于 `editline` 的配置文件与 GNU readline 的不同。如果你要在程序中载入配置字符串你可以使用 [`backend`](#readline.backend "readline.backend") 来确定正在使用的是哪个库。

如果你是在 macOS 上使用 `editline`/`libedit` readline 模拟，则位于你的主目录中的初始化文件的名称为 `.editrc`。例如，`~/.editrc` 中的以下内容将开启 _vi_ 按键绑定和 TAB 补全:

python:bind \-v
python:bind ^I rl\_complete

另外请注意不同的库可能使用不同的历史文件格式。当切换下层的库时，现有的历史文件可能会无法使用。

readline.backend[¶](#readline.backend "Link to this definition")

被使用的下层 Readline 库的名称，可以是 `"readline"` 或 `"editline"`。

Added in version 3.13.

## 初始化文件[¶](#init-file "Link to this heading")

下列函数与初始化文件和用户配置有关：

readline.parse\_and\_bind(_string_)[¶](#readline.parse_and_bind "Link to this definition")

执行在 _string_ 参数中提供的初始化行。这将调用底层库中的 `rl_parse_and_bind()`。

readline.read\_init\_file(\[_filename_\])[¶](#readline.read_init_file "Link to this definition")

执行 readline 初始化文件。默认文件名是最后使用的文件名。这将调用底层库中的 `rl_read_init_file()`。 无论库解析的是哪个文件，它都会引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `open`，如果给定文件名，则使用文件名，否则使用 `"<readline_init_file>"`。

在 3.14 版本发生变更: 已添加审计事件。

## 行缓冲区[¶](#line-buffer "Link to this heading")

下列函数会在行缓冲区上操作。

readline.get\_line\_buffer()[¶](#readline.get_line_buffer "Link to this definition")

返回行缓冲区的当前内容 (底层库中的 `rl_line_buffer`)。

readline.insert\_text(_string_)[¶](#readline.insert_text "Link to this definition")

将文本插入到行缓冲区的当前游标位置。该函数会调用底层库中的 `rl_insert_text()`，但会忽略其返回值。

readline.redisplay()[¶](#readline.redisplay "Link to this definition")

改变屏幕的显示以反映行缓冲区的当前内容。该函数会调用底层库中的 `rl_redisplay()`。

## 历史文件[¶](#history-file "Link to this heading")

下列函数会在历史文件上操作：

readline.read\_history\_file(\[_filename_\])[¶](#readline.read_history_file "Link to this definition")

载入一个 readline 历史文件，并将其添加到历史列表。默认文件名为 `~/.history`。此函数会调用底层库中的 `read_history()` 并引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `open`，如果给定了文件名就使用文件名，否则使用 `"~/.history"`。

在 3.14 版本发生变更: 已添加审计事件。

readline.write\_history\_file(\[_filename_\])[¶](#readline.write_history_file "Link to this definition")

将历史列表保存到一个 readline 历史文件，覆盖任何已存在的文件。默认文件名为 `~/.history`。此函数会调用底层库的 `write_history()`，并引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `open`，如果给定了文件名就使用文件名，否则使用 `"~/.history"`。

在 3.14 版本发生变更: 已添加审计事件。

readline.append\_history\_file(_nelements_\[, _filename_\])[¶](#readline.append_history_file "Link to this definition")

将历史列表的最后 _nelements_ 项添加到历史文件。默认文件名为 `~/.history`。该文件必须已存在。 此函数会调用底层库中的 `append_history()`。此函数仅当 Python 是针对支持该功能的库版本编译时才会存在。 这会引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `open`，如果给定了文件名就使用文件名，否则使用 `"~/.history"`。

Added in version 3.5.

在 3.14 版本发生变更: 已添加审计事件。

readline.get\_history\_length()[¶](#readline.get_history_length "Link to this definition")

readline.set\_history\_length(_length_)[¶](#readline.set_history_length "Link to this definition")

设置或返回需要保存到历史文件的条目行数。 [`write_history_file()`](#readline.write_history_file "readline.write_history_file") 函数会通过调用底层库中的 `history_truncate_file()` 以使用该值来截取历史文件。负值意味着不限制历史文件的大小。

## 历史列表[¶](#history-list "Link to this heading")

以下函数会在全局历史列表上操作：

readline.clear\_history()[¶](#readline.clear_history "Link to this definition")

清空当前历史。此函数会调用底层库中的 `clear_history()`。此 Python 函数仅当 Python 是针对支持该功能的库版本编译时才会存在。

readline.get\_current\_history\_length()[¶](#readline.get_current_history_length "Link to this definition")

返回历史列表的当前项数。 （此函数不同于 [`get_history_length()`](#readline.get_history_length "readline.get_history_length")，后者是返回将被写入历史文件的最大行数。）

readline.get\_history\_item(_index_)[¶](#readline.get_history_item "Link to this definition")

返回 _index_ 号位置上的历史条目的当前内容。条目索引从一开始。此函数会调用底层库中的 `history_get()`。

readline.remove\_history\_item(_pos_)[¶](#readline.remove_history_item "Link to this definition")

从历史列表中移除指定位置上的历史条目。条目位置从零开始。此函数会调用底层库中的 `remove_history()`。

readline.replace\_history\_item(_pos_, _line_)[¶](#readline.replace_history_item "Link to this definition")

将指定位置上的历史条目替换为 _line_。条目位置是从零开始的。此函数会调用底层库中的 `replace_history_entry()`.

readline.add\_history(_line_)[¶](#readline.add_history "Link to this definition")

将 _line_ 添加到历史缓冲区，就像它是最近输入的一行。此函数会调用底层库中的 `add_history()`。

readline.set\_auto\_history(_enabled_)[¶](#readline.set_auto_history "Link to this definition")

启用或禁用当通过 readline 读取输入时对 `add_history()` 的自动调用。 _enabled_ 参数应为一个布尔值，当其为真值时启用自动历史，当其为假值时则禁用自动历史。

Added in version 3.6.

自动历史将默认启用，对此设置的改变不会在多个会话中保持。

## 启动钩子[¶](#startup-hooks "Link to this heading")

readline.set\_startup\_hook(\[_function_\])[¶](#readline.set_startup_hook "Link to this definition")

设置或移除底层库的 `rl_startup_hook` 回调所唤起的函数。如果指定了 _function_，它将被用作新的钩子函数；如果省略或为 `None`，则任何已安装的函数将被移除。钩子函数将在 readline 打印第一个提示之前不带参数地被调用。

readline.set\_pre\_input\_hook(\[_function_\])[¶](#readline.set_pre_input_hook "Link to this definition")

设置或移除底层库的 `rl_pre_input_hook` 回调所唤起的函数。如果指定了 _function_，它将被用作新的钩子函数；如果省略或为 `None`，则任何已安装的函数将被移除。钩子函数将在打印第一个提示之后 readline 开始读取输入字符之前不带参数地被调用。此函数仅当 Python 为针对支持此功能的库编译时才会存在。

## 补全[¶](#completion "Link to this heading")

The following functions relate to implementing a custom word completion function. This is typically operated by the Tab key, and can suggest and automatically complete a word being typed. By default, Readline is set up to be used by [`rlcompleter`](https://docs.python.org/zh-cn/3/library/rlcompleter.html#module-rlcompleter "rlcompleter: Python identifier completion, suitable for the GNU readline library.") to complete Python identifiers for the interactive interpreter. If the `readline` module is to be used with a custom completer, a different set of word delimiters should be set.

readline.set\_completer(\[_function_\])[¶](#readline.set_completer "Link to this definition")

设置或移除补全函数。如果指定了 _function_，它将被用作新的补全函数；如果省略或为 `None`，任何已安装的补全函数将被移除。 补全函数的调用形式为 `function(text, state)`，其中 _state_ 为 `0`, `1`, `2`, ..., 直至其返回一个非字符串值。它应当返回下一个以 _text_ 开头的候选补全内容。

已安装的补全函数将由传递给底层库中 `rl_completion_matches()` 的 _entry\_func_ 回调来唤起。 _text_ 字符串来自于底层库中 `rl_attempted_completion_function` 回调的第一个形参。

readline.get\_completer()[¶](#readline.get_completer "Link to this definition")

获取补全函数，如果没有设置补全函数则返回 `None`。

readline.get\_completion\_type()[¶](#readline.get_completion_type "Link to this definition")

获取正在尝试的补全的类型。此函数会将底层库中的 `rl_completion_type` 变量作为一个整数返回。

readline.get\_begidx()[¶](#readline.get_begidx "Link to this definition")

readline.get\_endidx()[¶](#readline.get_endidx "Link to this definition")

获取补全域的开始和结束索引。这些索引就是传递给下层库的 `rl_attempted_completion_function` 回调的 _start_ 和 _end_ 参数。具体值在同一输入编辑场景中根据下层的 C readline 实现的不同可能会不一样。例如：已知 libedit 的行为就不同于 libreadline。

readline.set\_completer\_delims(_string_)[¶](#readline.set_completer_delims "Link to this definition")

readline.get\_completer\_delims()[¶](#readline.get_completer_delims "Link to this definition")

设置或获取补全的单词分隔符。这些分隔符确定了要考虑补全的单词的开始和结束位置（即补全域）。这些函数会访问底层库中的 `rl_completer_word_break_characters` 变量。

readline.set\_completion\_display\_matches\_hook(\[_function_\])[¶](#readline.set_completion_display_matches_hook "Link to this definition")

设置或移除补全显示函数。如果指定了 _function_，它将被用作新的补全显示函数；如果省略或为 `None`，任何已安装的补全显示函数将被移除。此函数会设置或清除底层库中的 `rl_completion_display_matches_hook` 回调。补全显示函数会在每次需要显示匹配项时以 `function(substitution, [matches], longest_match_length)` 的形式被调用。

## 示例[¶](#example "Link to this heading")

The following example demonstrates how to use the `readline` module's history reading and writing functions to automatically load and save a history file named `.python_history` from the user's home directory. The code below would normally be executed automatically during interactive sessions from the user's [`PYTHONSTARTUP`](https://docs.python.org/zh-cn/3/using/cmdline.html#envvar-PYTHONSTARTUP) file.

import atexit
import os
import readline

histfile \= os.path.join(os.path.expanduser("~"), ".python\_history")
try:
    readline.read\_history\_file(histfile)
    \# 默认的历史长度为 -1 (无限)，这可能导致增长失控
    readline.set\_history\_length(1000)
except FileNotFoundError:
    pass

atexit.register(readline.write\_history\_file, histfile)

此代码实际上会在 Python 运行于 [交互模式](https://docs.python.org/zh-cn/3/tutorial/interpreter.html#tut-interactive) 时自动运行 (参见 [Readline 配置](https://docs.python.org/zh-cn/3/library/site.html#rlcompleter-config)).

以下示例实现了同样的目标，但是通过只添加新历史的方式来支持并发的交互会话。

import atexit
import os
import readline
histfile \= os.path.join(os.path.expanduser("~"), ".python\_history")

try:
    readline.read\_history\_file(histfile)
    h\_len \= readline.get\_current\_history\_length()
except FileNotFoundError:
    open(histfile, 'wb').close()
    h\_len \= 0

def save(prev\_h\_len, histfile):
    new\_h\_len \= readline.get\_current\_history\_length()
    readline.set\_history\_length(1000)
    readline.append\_history\_file(new\_h\_len \- prev\_h\_len, histfile)
atexit.register(save, h\_len, histfile)

以下示例扩展了 [`code.InteractiveConsole`](https://docs.python.org/zh-cn/3/library/code.html#code.InteractiveConsole "code.InteractiveConsole") 类以支持历史保存/恢复。

import atexit
import code
import os
import readline

class HistoryConsole(code.InteractiveConsole):
    def \_\_init\_\_(self, locals\=None, filename\="<console>",
                 histfile\=os.path.expanduser("~/.console-history")):
        code.InteractiveConsole.\_\_init\_\_(self, locals, filename)
        self.init\_history(histfile)

    def init\_history(self, histfile):
        readline.parse\_and\_bind("tab: complete")
        if hasattr(readline, "read\_history\_file"):
            try:
                readline.read\_history\_file(histfile)
            except FileNotFoundError:
                pass
            atexit.register(self.save\_history, histfile)

    def save\_history(self, histfile):
        readline.set\_history\_length(1000)
        readline.write\_history\_file(histfile)
