Logging support for Tornado.

Tornado uses three logger streams:

-   `tornado.access`: Per-request logging for Tornado’s HTTP servers (and potentially other servers in the future)
-   `tornado.application`: Logging of errors from application code (i.e. uncaught exceptions from callbacks)
-   `tornado.general`: General-purpose logging, including any errors or warnings from Tornado itself.

These streams may be configured independently using the standard library’s [`logging`](https://docs.python.org/3.4/library/logging.html#module-logging "(在 Python v3.4)") module. For example, you may wish to send `tornado.access` logs to a separate file for analysis.

_class_ `tornado.log.``LogFormatter`(_color=True_, _fmt='%(color)s\[%(levelname)1.1s %(asctime)s %(module)s:%(lineno)d\]%(end\_color)s %(message)s'_, _datefmt='%y%m%d %H:%M:%S'_, _colors={40: 1_, _10: 4_, _20: 2_, _30: 3}_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/log.html#LogFormatter)[¶](#tornado.log.LogFormatter "永久链接至目标")

Log formatter used in Tornado.

Key features of this formatter are:

-   Color support when logging to a terminal that supports it.
-   Timestamps on every log line.
-   Robust against str/bytes encoding problems.

This formatter is enabled automatically by [`tornado.options.parse_command_line`](https://tornado-zh.readthedocs.io/zh/latest/options.html#tornado.options.parse_command_line "tornado.options.parse_command_line") (unless `--logging=none` is used).

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>color</strong> (<a href="https://docs.python.org/3.4/library/functions.html#bool" title="(在 Python v3.4)"><em>bool</em></a>) – Enables color support.</li><li><strong>fmt</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – Log message format. It will be applied to the attributes dict of log records. The text between <code><span>%(color)s</span></code> and <code><span>%(end_color)s</span></code> will be colored depending on the level if color support is on.</li><li><strong>colors</strong> (<a href="https://docs.python.org/3.4/library/stdtypes.html#dict" title="(在 Python v3.4)"><em>dict</em></a>) – color mappings from logging level to terminal color code</li><li><strong>datefmt</strong> (<a href="https://docs.python.org/3.4/library/string.html#module-string" title="(在 Python v3.4)"><em>string</em></a>) – Datetime format. Used for formatting <code><span>(asctime)</span></code> placeholder in <code><span>prefix_fmt</span></code>.</li></ul></td></tr></tbody></table>

在 3.2 版更改: Added `fmt` and `datefmt` arguments.

`tornado.log.``enable_pretty_logging`(_options=None_, _logger=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/log.html#enable_pretty_logging)[¶](#tornado.log.enable_pretty_logging "永久链接至目标")

Turns on formatted logging output as configured.

This is called automatically by [`tornado.options.parse_command_line`](https://tornado-zh.readthedocs.io/zh/latest/options.html#tornado.options.parse_command_line "tornado.options.parse_command_line") and [`tornado.options.parse_config_file`](https://tornado-zh.readthedocs.io/zh/latest/options.html#tornado.options.parse_config_file "tornado.options.parse_config_file").

`tornado.log.``define_logging_options`(_options=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/log.html#define_logging_options)[¶](#tornado.log.define_logging_options "永久链接至目标")

Add logging-related flags to `options`.

These options are present automatically on the default options instance; this method is only necessary if you have created your own [`OptionParser`](https://tornado-zh.readthedocs.io/zh/latest/options.html#tornado.options.OptionParser "tornado.options.OptionParser").

4.2 新版功能: This function existed in prior versions but was broken and undocumented until 4.2.
