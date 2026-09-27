**源代码:** [Lib/rlcompleter.py](https://github.com/python/cpython/tree/3.14/Lib/rlcompleter.py)

* * *

`rlcompleter` 模块定义了一个适合被传给 [`readline`](https://docs.python.org/zh-cn/3/library/readline.html#module-readline "readline: GNU readline support for Python.") 模块中 [`set_completer()`](https://docs.python.org/zh-cn/3/library/readline.html#readline.set_completer "readline.set_completer") 的补全函数。

当此模块在具有 [`readline`](https://docs.python.org/zh-cn/3/library/readline.html#module-readline "readline: GNU readline support for Python.") 模块的 Unix 平台上被导入时，会自动创建一个 [`Completer`](#rlcompleter.Completer "rlcompleter.Completer") 实例并将其 [`complete()`](#rlcompleter.Completer.complete "rlcompleter.Completer.complete") 方法设为 [readline completer](https://docs.python.org/zh-cn/3/library/readline.html#readline-completion)。该方法提供了对有效的 Python [标识符和关键字](https://docs.python.org/zh-cn/3/reference/lexical_analysis.html#identifiers) 的补全功能。

示例:

\>>> import rlcompleter
\>>> import readline
\>>> readline.parse\_and\_bind("tab: complete")
\>>> readline. <TAB PRESSED\>
readline.\_\_doc\_\_          readline.get\_line\_buffer(  readline.read\_init\_file(
readline.\_\_file\_\_         readline.insert\_text(      readline.set\_completer(
readline.\_\_name\_\_         readline.parse\_and\_bind(
\>>> readline.

`rlcompleter` 模块是为 Python 的 [交互模式](https://docs.python.org/zh-cn/3/tutorial/interpreter.html#tut-interactive) 而设计的。除非 Python 是附带 [`-S`](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-S) 选项运行的，这个模块总是会被自动地导入并配置 (参见 [Readline 配置](https://docs.python.org/zh-cn/3/library/site.html#rlcompleter-config)).

在没有 [`readline`](https://docs.python.org/zh-cn/3/library/readline.html#module-readline "readline: GNU readline support for Python.") 的平台上，此模块定义的 [`Completer`](#rlcompleter.Completer "rlcompleter.Completer") 类仍然可以用于自定义目的。

_class_ rlcompleter.Completer[¶](#rlcompleter.Completer "Link to this definition")

Completer 对象具有以下方法：

complete(_text_, _state_)[¶](#rlcompleter.Completer.complete "Link to this definition")

返回针对 _text_ 的下一个可能的补全项。

当被 [`readline`](https://docs.python.org/zh-cn/3/library/readline.html#module-readline "readline: GNU readline support for Python.") 模块调用时，此方法将被连续调用并附带 `state == 0, 1, 2, ...` 直到该方法返回 `None`.

如果指定的 _text_ 不包含句点字符 (`'.'`)，它将根据当前 [`__main__`](https://docs.python.org/zh-cn/3/library/__main__.html#module-__main__ "__main__: The environment where top-level code is run. Covers command-line interfaces, import-time behavior, and ``__name__ == '__main__'``."), [`builtins`](https://docs.python.org/zh-cn/3/library/builtins.html#module-builtins "builtins: The module that provides the built-in namespace.") 和保留关键字（定义于 [`keyword`](https://docs.python.org/zh-cn/3/library/keyword.html#module-keyword "keyword: Test whether a string is a keyword in Python.") 模块）所定义的名称进行补全。

如果为带有点号的名称执行调用，它将尝试对没有明显附带影响的内容进行求值，直到最后一部分为止（函数不会被求值，但它可以生成对 [`__getattr__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__getattr__ "object.__getattr__") 的调用），并通过 [`dir()`](https://docs.python.org/zh-cn/3/builtins/functions.html#dir "dir") 函数来匹配剩余部分。 在对表达式求值期间引发的任何异常都会被捕获、静默处理并返回 [`None`](https://docs.python.org/zh-cn/3/builtins/constants.html#None "None")。
