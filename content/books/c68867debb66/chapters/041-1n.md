Automatically restart the server when a source file is modified.

Most applications should not access this module directly. Instead, pass the keyword argument `autoreload=True` to the [`tornado.web.Application`](https://tornado-zh.readthedocs.io/zh/latest/web.html#tornado.web.Application "tornado.web.Application") constructor (or `debug=True`, which enables this setting and several others). This will enable autoreload mode as well as checking for changes to templates and static resources. Note that restarting is a destructive operation and any requests in progress will be aborted when the process restarts. (If you want to disable autoreload while using other debug-mode features, pass both `debug=True` and `autoreload=False`).

This module can also be used as a command-line wrapper around scripts such as unit test runners. See the [`main`](#tornado.autoreload.main "tornado.autoreload.main") method for details.

The command-line wrapper and Application debug modes can be used together. This combination is encouraged as the wrapper catches syntax errors and other import-time failures, while debug mode catches changes once the server has started.

This module depends on [`IOLoop`](https://tornado-zh.readthedocs.io/zh/latest/ioloop.html#tornado.ioloop.IOLoop "tornado.ioloop.IOLoop"), so it will not work in WSGI applications and Google App Engine. It also will not work correctly when [`HTTPServer`](https://tornado-zh.readthedocs.io/zh/latest/httpserver.html#tornado.httpserver.HTTPServer "tornado.httpserver.HTTPServer")‘s multi-process mode is used.

Reloading loses any Python interpreter command-line arguments (e.g. `-u`) because it re-executes Python using `sys.executable` and `sys.argv`. Additionally, modifying these variables will cause reloading to behave incorrectly.

`tornado.autoreload.``start`(_io\_loop=None_, _check\_time=500_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/autoreload.html#start)[¶](#tornado.autoreload.start "永久链接至目标")

Begins watching source files for changes.

在 4.1 版更改: The `io_loop` argument is deprecated.

`tornado.autoreload.``wait`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/autoreload.html#wait)[¶](#tornado.autoreload.wait "永久链接至目标")

Wait for a watched file to change, then restart the process.

Intended to be used at the end of scripts like unit test runners, to run the tests again after any source file changes (but see also the command-line interface in [`main`](#tornado.autoreload.main "tornado.autoreload.main"))

`tornado.autoreload.``watch`(_filename_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/autoreload.html#watch)[¶](#tornado.autoreload.watch "永久链接至目标")

Add a file to the watch list.

All imported modules are watched by default.

`tornado.autoreload.``add_reload_hook`(_fn_)[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/autoreload.html#add_reload_hook)[¶](#tornado.autoreload.add_reload_hook "永久链接至目标")

Add a function to be called before reloading the process.

Note that for open file and socket handles it is generally preferable to set the `FD_CLOEXEC` flag (using [`fcntl`](https://docs.python.org/3.4/library/fcntl.html#module-fcntl "(在 Python v3.4)") or `tornado.platform.auto.set_close_exec`) instead of using a reload hook to close them.

`tornado.autoreload.``main`()[\[源代码\]](https://tornado-zh.readthedocs.io/zh/latest/_modules/tornado/autoreload.html#main)[¶](#tornado.autoreload.main "永久链接至目标")

Command-line wrapper to re-run a script whenever its source changes.

Scripts may be specified by filename or module name:

python \-m tornado.autoreload \-m tornado.test.runtests
python \-m tornado.autoreload tornado/test/runtests.py

Running a script with this wrapper is similar to calling [`tornado.autoreload.wait`](#tornado.autoreload.wait "tornado.autoreload.wait") at the end of the script, but this wrapper can catch import-time problems like syntax errors that would otherwise prevent the script from reaching its call to [`wait`](#tornado.autoreload.wait "tornado.autoreload.wait").
