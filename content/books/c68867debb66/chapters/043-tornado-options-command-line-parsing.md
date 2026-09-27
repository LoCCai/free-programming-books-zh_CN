A command line parsing module that lets modules define their own options.

Each module defines its own options which are added to the global option namespace, e.g.:

from tornado.options import define, options

define("mysql\_host", default\="127.0.0.1:3306", help\="Main user DB")
define("memcache\_hosts", default\="127.0.0.1:11011", multiple\=True,
       help\="Main user memcache servers")

def connect():
    db \= database.Connection(options.mysql\_host)
    ...

The `main()` method of your application does not need to be aware of all of the options used throughout your program; they are all automatically loaded when the modules are loaded. However, all modules that define options must have been imported before the command line is parsed.

Your `main()` method can parse the command line or parse a config file with either:

tornado.options.parse\_command\_line()
\# or
tornado.options.parse\_config\_file("/etc/server.conf")

Command line formats are what you would expect (`--myoption=myvalue`). Config files are just Python files. Global names become options, e.g.:

myoption \= "myvalue"
myotheroption \= "myothervalue"

We support [`datetimes`](https://docs.python.org/3.4/library/datetime.html#datetime.datetime "(在 Python v3.4)"), [`timedeltas`](https://docs.python.org/3.4/library/datetime.html#datetime.timedelta "(在 Python v3.4)"), ints, and floats (just pass a `type` kwarg to [`define`](#tornado.options.define "tornado.options.define")). We also accept multi-value options. See the documentation for [`define()`](#tornado.options.define "tornado.options.define") below.

[`tornado.options.options`](#tornado.options.options "tornado.options.options") is a singleton instance of [`OptionParser`](#tornado.options.OptionParser "tornado.options.OptionParser"), and the top-level functions in this module ([`define`](#tornado.options.define "tornado.options.define"), [`parse_command_line`](#tornado.options.parse_command_line "tornado.options.parse_command_line"), etc) simply call methods on it. You may create additional [`OptionParser`](#tornado.options.OptionParser "tornado.options.OptionParser") instances to define isolated sets of options, such as for subcommands.

注解

By default, several options are defined that will configure the standard [`logging`](https://docs.python.org/3.4/library/logging.html#module-logging "(在 Python v3.4)") module when [`parse_command_line`](#tornado.options.parse_command_line "tornado.options.parse_command_line") or [`parse_config_file`](#tornado.options.parse_config_file "tornado.options.parse_config_file") are called. If you want Tornado to leave the logging configuration alone so you can manage it yourself, either pass `--logging=none` on the command line or do the following to disable it in code:

from tornado.options import options, parse\_command\_line
options.logging \= None
parse\_command\_line()

在 4.3 版更改: Dashes and underscores are fully interchangeable in option names; options can be defined, set, and read with any mix of the two. Dashes are typical for command-line usage while config files require underscores.

## Global functions[¶](#global-functions "永久链接至标题")

`tornado.options.``define`(_name_, _default=None_, _type=None_, _help=None_, _metavar=None_, _multiple=False_, _group=None_, _callback=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#define)[¶](#tornado.options.define "永久链接至目标")

Defines an option in the global namespace.

See [`OptionParser.define`](#tornado.options.OptionParser.define "tornado.options.OptionParser.define").

`tornado.options.``options`[¶](#tornado.options.options "永久链接至目标")

Global options object. All defined options are available as attributes on this object.

`tornado.options.``parse_command_line`(_args=None_, _final=True_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#parse_command_line)[¶](#tornado.options.parse_command_line "永久链接至目标")

Parses global options from the command line.

See [`OptionParser.parse_command_line`](#tornado.options.OptionParser.parse_command_line "tornado.options.OptionParser.parse_command_line").

`tornado.options.``parse_config_file`(_path_, _final=True_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#parse_config_file)[¶](#tornado.options.parse_config_file "永久链接至目标")

Parses global options from a config file.

See [`OptionParser.parse_config_file`](#tornado.options.OptionParser.parse_config_file "tornado.options.OptionParser.parse_config_file").

`tornado.options.``print_help`(_file=sys.stderr_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#print_help)[¶](#tornado.options.print_help "永久链接至目标")

Prints all the command line options to stderr (or another file).

See [`OptionParser.print_help`](#tornado.options.OptionParser.print_help "tornado.options.OptionParser.print_help").

`tornado.options.``add_parse_callback`(_callback_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#add_parse_callback)[¶](#tornado.options.add_parse_callback "永久链接至目标")

Adds a parse callback, to be invoked when option parsing is done.

See [`OptionParser.add_parse_callback`](#tornado.options.OptionParser.add_parse_callback "tornado.options.OptionParser.add_parse_callback")

_exception_ `tornado.options.``Error`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#Error)[¶](#tornado.options.Error "永久链接至目标")

Exception raised by errors in the options module.

## OptionParser class[¶](#optionparser-class "永久链接至标题")

_class_ `tornado.options.``OptionParser`[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#OptionParser)[¶](#tornado.options.OptionParser "永久链接至目标")

A collection of options, a dictionary with object-like access.

Normally accessed via static functions in the [`tornado.options`](#module-tornado.options "tornado.options") module, which reference a global instance.

`items`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#OptionParser.items)[¶](#tornado.options.OptionParser.items "永久链接至目标")

A sequence of (name, value) pairs.

3.1 新版功能.

`groups`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#OptionParser.groups)[¶](#tornado.options.OptionParser.groups "永久链接至目标")

The set of option-groups created by `define`.

3.1 新版功能.

`group_dict`(_group_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#OptionParser.group_dict)[¶](#tornado.options.OptionParser.group_dict "永久链接至目标")

The names and values of options in a group.

Useful for copying options into Application settings:

from tornado.options import define, parse\_command\_line, options

define('template\_path', group\='application')
define('static\_path', group\='application')

parse\_command\_line()

application \= Application(
    handlers, \*\*options.group\_dict('application'))

3.1 新版功能.

`as_dict`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#OptionParser.as_dict)[¶](#tornado.options.OptionParser.as_dict "永久链接至目标")

The names and values of all options.

3.1 新版功能.

`define`(_name_, _default=None_, _type=None_, _help=None_, _metavar=None_, _multiple=False_, _group=None_, _callback=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#OptionParser.define)[¶](#tornado.options.OptionParser.define "永久链接至目标")

Defines a new command line option.

If `type` is given (one of str, float, int, datetime, or timedelta) or can be inferred from the `default`, we parse the command line arguments based on the given type. If `multiple` is True, we accept comma-separated values, and the option value is always a list.

For multi-value integers, we also accept the syntax `x:y`, which turns into `range(x, y)` - very useful for long integer ranges.

`help` and `metavar` are used to construct the automatically generated command line help string. The help message is formatted like:

\--name\=METAVAR      help string

`group` is used to group the defined options in logical groups. By default, command line options are grouped by the file in which they are defined.

Command line option names must be unique globally. They can be parsed from the command line with [`parse_command_line`](#tornado.options.parse_command_line "tornado.options.parse_command_line") or parsed from a config file with [`parse_config_file`](#tornado.options.parse_config_file "tornado.options.parse_config_file").

If a `callback` is given, it will be run with the new value whenever the option is changed. This can be used to combine command-line and file-based options:

define("config", type\=str, help\="path to config file",
       callback\=lambda path: parse\_config\_file(path, final\=False))

With this definition, options in the file specified by `--config` will override options set earlier on the command line, but can be overridden by later flags.

`parse_command_line`(_args=None_, _final=True_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#OptionParser.parse_command_line)[¶](#tornado.options.OptionParser.parse_command_line "永久链接至目标")

Parses all options given on the command line (defaults to [`sys.argv`](https://docs.python.org/3.4/library/sys.html#sys.argv "(在 Python v3.4)")).

Note that `args[0]` is ignored since it is the program name in [`sys.argv`](https://docs.python.org/3.4/library/sys.html#sys.argv "(在 Python v3.4)").

We return a list of all arguments that are not parsed as options.

If `final` is `False`, parse callbacks will not be run. This is useful for applications that wish to combine configurations from multiple sources.

`parse_config_file`(_path_, _final=True_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#OptionParser.parse_config_file)[¶](#tornado.options.OptionParser.parse_config_file "永久链接至目标")

Parses and loads the Python config file at the given path.

If `final` is `False`, parse callbacks will not be run. This is useful for applications that wish to combine configurations from multiple sources.

在 4.1 版更改: Config files are now always interpreted as utf-8 instead of the system default encoding.

`print_help`(_file=None_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#OptionParser.print_help)[¶](#tornado.options.OptionParser.print_help "永久链接至目标")

Prints all the command line options to stderr (or another file).

`add_parse_callback`(_callback_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#OptionParser.add_parse_callback)[¶](#tornado.options.OptionParser.add_parse_callback "永久链接至目标")

Adds a parse callback, to be invoked when option parsing is done.

`mockable`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/options.html#OptionParser.mockable)[¶](#tornado.options.OptionParser.mockable "永久链接至目标")

Returns a wrapper around self that is compatible with [`mock.patch`](https://docs.python.org/3.4/library/unittest.mock.html#unittest.mock.patch "(在 Python v3.4)").

The [`mock.patch`](https://docs.python.org/3.4/library/unittest.mock.html#unittest.mock.patch "(在 Python v3.4)") function (included in the standard library [`unittest.mock`](https://docs.python.org/3.4/library/unittest.mock.html#module-unittest.mock "(在 Python v3.4)") package since Python 3.3, or in the third-party `mock` package for older versions of Python) is incompatible with objects like `options` that override `__getattr__` and `__setattr__`. This function returns an object that can be used with [`mock.patch.object`](https://docs.python.org/3.4/library/unittest.mock.html#unittest.mock.patch.object "(在 Python v3.4)") to modify option values:

with mock.patch.object(options.mockable(), 'name', value):
    assert options.name \== value
