应当在 fabfile 或者其他非核心代码中运行的函数，例如 run()/sudo()。

`fabric.operations.``get`(_\*args_, _\*\*kwargs_)[¶](#fabric.operations.get "永久链接至目标")

从远程主机下载一个或多个文件。

[`get`](#fabric.operations.get "fabric.operations.get") returns an iterable containing the absolute paths to all local files downloaded, which will be empty if `local_path` was a StringIO object (see below for more on using StringIO). This object will also exhibit a `.failed` attribute containing any remote file paths which failed to download, and a `.succeeded` attribute equivalent to `not .failed`.

`remote_path` is the remote file or directory path to download, which may contain shell glob syntax, e.g. `"/var/log/apache2/*.log"`, and will have tildes replaced by the remote home directory. Relative paths will be considered relative to the remote user’s home directory, or the current remote working directory as manipulated by [`cd`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.cd "fabric.context_managers.cd"). If the remote path points to a directory, that directory will be downloaded recursively.

`local_path` is the local file path where the downloaded file or files will be stored. If relative, it will honor the local current working directory as manipulated by [`lcd`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.lcd "fabric.context_managers.lcd"). It may be interpolated, using standard Python dict-based interpolation, with the following variables:

-   `host`: The value of `env.host_string`, eg `myhostname` or `user@myhostname-222` (the colon between hostname and port is turned into a dash to maximize filesystem compatibility)
-   `dirname`: The directory part of the remote file path, e.g. the `src/projectname` in `src/projectname/utils.py`.
-   `basename`: The filename part of the remote file path, e.g. the `utils.py` in `src/projectname/utils.py`
-   `path`：远程路径完整地址，例如： `src/projectname/utils.py`。
    

While the SFTP protocol (which [`get`](#fabric.operations.get "fabric.operations.get") uses) has no direct ability to download files from locations not owned by the connecting user, you may specify `use_sudo=True` to work around this. When set, this setting allows [`get`](#fabric.operations.get "fabric.operations.get") to copy (using sudo) the remote files to a temporary location on the remote end (defaults to remote user’s `$HOME`; this may be overridden via `temp_dir`), and then download them to `local_path`.

注解

When `remote_path` is an absolute directory path, only the inner directories will be recreated locally and passed into the above variables. So for example, `get('/var/log', '%(path)s')` would start writing out files like `apache2/access.log`, `postgresql/8.4/postgresql.log`, etc, in the local working directory. It would **not** write out e.g. `var/log/apache2/access.log`.

Additionally, when downloading a single file, `%(dirname)s` and `%(path)s` do not make as much sense and will be empty and equivalent to `%(basename)s`, respectively. Thus a call like `get('/var/log/apache2/access.log', '%(path)s')` will save a local file named `access.log`, not `var/log/apache2/access.log`.

这是为了与命令行程序 `scp` 保持一致。

If left blank, `local_path` defaults to `"%(host)s/%(path)s"` in order to be safe for multi-host invocations.

警告

If your `local_path` argument does not contain `%(host)s` and your [`get`](#fabric.operations.get "fabric.operations.get") call runs against multiple hosts, your local files will be overwritten on each successive run!

If `local_path` does not make use of the above variables (i.e. if it is a simple, explicit file path) it will act similar to `scp` or `cp`, overwriting pre-existing files if necessary, downloading into a directory if given (e.g. `get('/path/to/remote_file.txt', 'local_directory')` will create `local_directory/remote_file.txt`) and so forth.

`local_path` may alternately be a file-like object, such as the result of `open('path', 'w')` or a `StringIO` instance.

注解

Attempting to [`get`](#fabric.operations.get "fabric.operations.get") a directory into a file-like object is not valid and will result in an error.

注解

This function will use `seek` and `tell` to overwrite the entire contents of the file-like object, in order to be consistent with the behavior of [`put`](#fabric.operations.put "fabric.operations.put") (which also considers the entire file). However, unlike [`put`](#fabric.operations.put "fabric.operations.put"), the file pointer will not be restored to its previous location, as that doesn’t make as much sense here and/or may not even be possible.

注解

If a file-like object such as StringIO has a `name` attribute, that will be used in Fabric’s printed output instead of the default `<file obj>`

在 1.0 版更改: Now honors the remote working directory as manipulated by [`cd`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.cd "fabric.context_managers.cd"), and the local working directory as manipulated by [`lcd`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.lcd "fabric.context_managers.lcd").

在 1.0 版更改: Now allows file-like objects in the `local_path` argument.

在 1.0 版更改: `local_path` may now contain interpolated path- and host-related variables.

在 1.0 版更改: Directories may be specified in the `remote_path` argument and will trigger recursive downloads.

在 1.0 版更改: Return value is now an iterable of downloaded local file paths, which also exhibits the `.failed` and `.succeeded` attributes.

在 1.5 版更改: Allow a `name` attribute on file-like objects for log output

`fabric.operations.``local`(_command_, _capture=False_, _shell=None_)[¶](#fabric.operations.local "永久链接至目标")

Run a command on the local system.

[`local`](#fabric.operations.local "fabric.operations.local") is simply a convenience wrapper around the use of the builtin Python `subprocess` module with `shell=True` activated. If you need to do anything special, consider using the `subprocess` module directly.

`shell` is passed directly to [subprocess.Popen](http://docs.python.org/library/subprocess.html#subprocess.Popen)‘s `execute` argument (which determines the local shell to use.) As per the linked documentation, on Unix the default behavior is to use `/bin/sh`, so this option is useful for setting that value to e.g. `/bin/bash`.

[`local`](#fabric.operations.local "fabric.operations.local") is not currently capable of simultaneously printing and capturing output, as [`run`](#fabric.operations.run "fabric.operations.run")/[`sudo`](#fabric.operations.sudo "fabric.operations.sudo") do. The `capture` kwarg allows you to switch between printing and capturing as necessary, and defaults to `False`.

When `capture=False`, the local subprocess’ stdout and stderr streams are hooked up directly to your terminal, though you may use the global [_output controls_](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/output_controls.html) `output.stdout` and `output.stderr` to hide one or both if desired. In this mode, the return value’s stdout/stderr values are always empty.

When `capture=True`, you will not see any output from the subprocess in your terminal, but the return value will contain the captured stdout/stderr.

In either case, as with [`run`](#fabric.operations.run "fabric.operations.run") and [`sudo`](#fabric.operations.sudo "fabric.operations.sudo"), this return value exhibits the `return_code`, `stderr`, `failed`, `succeeded`, `command` and `real_command` attributes. See [`run`](#fabric.operations.run "fabric.operations.run") for details.

[`local`](#fabric.operations.local "fabric.operations.local") will honor the [`lcd`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.lcd "fabric.context_managers.lcd") context manager, allowing you to control its current working directory independently of the remote end (which honors [`cd`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.cd "fabric.context_managers.cd")).

在 1.0 版更改: Added the `succeeded` and `stderr` attributes.

在 1.0 版更改: Now honors the [`lcd`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.lcd "fabric.context_managers.lcd") context manager.

在 1.0 版更改: Changed the default value of `capture` from `True` to `False`.

1.9 新版功能: The return value attributes `.command` and `.real_command`.

`fabric.operations.``open_shell`(_\*args_, _\*\*kwargs_)[¶](#fabric.operations.open_shell "永久链接至目标")

Invoke a fully interactive shell on the remote end.

If `command` is given, it will be sent down the pipe before handing control over to the invoking user.

This function is most useful for when you need to interact with a heavily shell-based command or series of commands, such as when debugging or when fully interactive recovery is required upon remote program failure.

It should be considered an easy way to work an interactive shell session into the middle of a Fabric script and is _not_ a drop-in replacement for [`run`](#fabric.operations.run "fabric.operations.run"), which is also capable of interacting with the remote end (albeit only while its given command is executing) and has much stronger programmatic abilities such as error handling and stdout/stderr capture.

Specifically, [`open_shell`](#fabric.operations.open_shell "fabric.operations.open_shell") provides a better interactive experience than [`run`](#fabric.operations.run "fabric.operations.run"), but use of a full remote shell prevents Fabric from determining whether programs run within the shell have failed, and pollutes the stdout/stderr stream with shell output such as login banners, prompts and echoed stdin.

Thus, this function does not have a return value and will not trigger Fabric’s failure handling if any remote programs result in errors.

1.0 新版功能.

`fabric.operations.``prompt`(_text_, _key=None_, _default=''_, _validate=None_)[¶](#fabric.operations.prompt "永久链接至目标")

Prompt user with `text` and return the input (like `raw_input`).

A single space character will be appended for convenience, but nothing else. Thus, you may want to end your prompt text with a question mark or a colon, e.g. `prompt("What hostname?")`.

If `key` is given, the user’s input will be stored as `env.<key>` in addition to being returned by [`prompt`](#fabric.operations.prompt "fabric.operations.prompt"). If the key already existed in `env`, its value will be overwritten and a warning printed to the user.

If `default` is given, it is displayed in square brackets and used if the user enters nothing (i.e. presses Enter without entering any text). `default` defaults to the empty string. If non-empty, a space will be appended, so that a call such as `prompt("What hostname?", default="foo")` would result in a prompt of `What hostname? [foo]` (with a trailing space after the `[foo]`.)

The optional keyword argument `validate` may be a callable or a string:

-   If a callable, it is called with the user’s input, and should return the value to be stored on success. On failure, it should raise an exception with an exception message, which will be printed to the user.
-   If a string, the value passed to `validate` is used as a regular expression. It is thus recommended to use raw strings in this case. Note that the regular expression, if it is not fully matching (bounded by `^` and `$`) it will be made so. In other words, the input must fully match the regex.

Either way, [`prompt`](#fabric.operations.prompt "fabric.operations.prompt") will re-prompt until validation passes (or the user hits `Ctrl-C`).

注解

[`prompt`](#fabric.operations.prompt "fabric.operations.prompt") honors [env.abort\_on\_prompts](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/env.html#abort-on-prompts) and will call [`abort`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/utils.html#fabric.utils.abort "fabric.utils.abort") instead of prompting if that flag is set to `True`. If you want to block on user input regardless, try wrapping with [`settings`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.settings "fabric.context_managers.settings").

Examples:

\# Simplest form:
environment \= prompt('Please specify target environment: ')

\# With default, and storing as env.dish:
prompt('Specify favorite dish: ', 'dish', default\='spam & eggs')

\# With validation, i.e. requiring integer input:
prompt('Please specify process nice level: ', key\='nice', validate\=int)

\# With validation against a regular expression:
release \= prompt('Please supply a release name',
        validate\=r'^\\w+-\\d+(\\.\\d+)?$')

\# Prompt regardless of the global abort-on-prompts setting:
with settings(abort\_on\_prompts\=False):
    prompt('I seriously need an answer on this! ')

`fabric.operations.``put`(_\*args_, _\*\*kwargs_)[¶](#fabric.operations.put "永久链接至目标")

Upload one or more files to a remote host.

[`put`](#fabric.operations.put "fabric.operations.put") returns an iterable containing the absolute file paths of all remote files uploaded. This iterable also exhibits a `.failed` attribute containing any local file paths which failed to upload (and may thus be used as a boolean test.) You may also check `.succeeded` which is equivalent to `not .failed`.

`local_path` may be a relative or absolute local file or directory path, and may contain shell-style wildcards, as understood by the Python `glob` module (give `use_glob=False` to disable this behavior). Tilde expansion (as implemented by `os.path.expanduser`) is also performed.

`local_path` may alternately be a file-like object, such as the result of `open('path')` or a `StringIO` instance.

注解

In this case, [`put`](#fabric.operations.put "fabric.operations.put") will attempt to read the entire contents of the file-like object by rewinding it using `seek` (and will use `tell` afterwards to preserve the previous file position).

`remote_path` may also be a relative or absolute location, but applied to the remote host. Relative paths are relative to the remote user’s home directory, but tilde expansion (e.g. `~/.ssh/`) will also be performed if necessary.

An empty string, in either path argument, will be replaced by the appropriate end’s current working directory.

While the SFTP protocol (which [`put`](#fabric.operations.put "fabric.operations.put") uses) has no direct ability to upload files to locations not owned by the connecting user, you may specify `use_sudo=True` to work around this. When set, this setting causes [`put`](#fabric.operations.put "fabric.operations.put") to upload the local files to a temporary location on the remote end (defaults to remote user’s `$HOME`; this may be overridden via `temp_dir`), and then use [`sudo`](#fabric.operations.sudo "fabric.operations.sudo") to move them to `remote_path`.

In some use cases, it is desirable to force a newly uploaded file to match the mode of its local counterpart (such as when uploading executable scripts). To do this, specify `mirror_local_mode=True`.

Alternately, you may use the `mode` kwarg to specify an exact mode, in the same vein as `os.chmod` or the Unix `chmod` command.

[`put`](#fabric.operations.put "fabric.operations.put") will honor [`cd`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.cd "fabric.context_managers.cd"), so relative values in `remote_path` will be prepended by the current remote working directory, if applicable. Thus, for example, the below snippet would attempt to upload to `/tmp/files/test.txt` instead of `~/files/test.txt`:

with cd('/tmp'):
    put('/path/to/local/test.txt', 'files')

Use of [`lcd`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.lcd "fabric.context_managers.lcd") will affect `local_path` in the same manner.

Examples:

put('bin/project.zip', '/tmp/project.zip')
put('\*.py', 'cgi-bin/')
put('index.html', 'index.html', mode\=0755)

注解

If a file-like object such as StringIO has a `name` attribute, that will be used in Fabric’s printed output instead of the default `<file obj>`

在 1.0 版更改: Now honors the remote working directory as manipulated by [`cd`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.cd "fabric.context_managers.cd"), and the local working directory as manipulated by [`lcd`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.lcd "fabric.context_managers.lcd").

在 1.0 版更改: Now allows file-like objects in the `local_path` argument.

在 1.0 版更改: Directories may be specified in the `local_path` argument and will trigger recursive uploads.

在 1.0 版更改: Return value is now an iterable of uploaded remote file paths which also exhibits the `.failed` and `.succeeded` attributes.

在 1.5 版更改: Allow a `name` attribute on file-like objects for log output

在 1.7 版更改: Added `use_glob` option to allow disabling of globbing.

`fabric.operations.``reboot`(_\*args_, _\*\*kwargs_)[¶](#fabric.operations.reboot "永久链接至目标")

Reboot the remote system.

Will temporarily tweak Fabric’s reconnection settings ([timeout](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/env.html#timeout) and [connection\_attempts](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/env.html#connection-attempts)) to ensure that reconnection does not give up for at least `wait` seconds.

注解

As of Fabric 1.4, the ability to reconnect partway through a session no longer requires use of internal APIs. While we are not officially deprecating this function, adding more features to it will not be a priority.

Users who want greater control are encouraged to check out this function’s (6 lines long, well commented) source code and write their own adaptation using different timeout/attempt values or additional logic.

0.9.2 新版功能.

在 1.4 版更改: Changed the `wait` kwarg to be optional, and refactored to leverage the new reconnection functionality; it may not actually have to wait for `wait` seconds before reconnecting.

`fabric.operations.``require`(_\*keys_, _\*\*kwargs_)[¶](#fabric.operations.require "永久链接至目标")

Check for given keys in the shared environment dict and abort if not found.

Positional arguments should be strings signifying what env vars should be checked for. If any of the given arguments do not exist, Fabric will abort execution and print the names of the missing keys.

The optional keyword argument `used_for` may be a string, which will be printed in the error output to inform users why this requirement is in place. `used_for` is printed as part of a string similar to:

"Th(is|ese) variable(s) (are|is) used for %s"

so format it appropriately.

The optional keyword argument `provided_by` may be a list of functions or function names or a single function or function name which the user should be able to execute in order to set the key or keys; it will be included in the error output if requirements are not met.

Note: it is assumed that the keyword arguments apply to all given keys as a group. If you feel the need to specify more than one `used_for`, for example, you should break your logic into multiple calls to `require()`.

在 1.1 版更改: 支持可迭代变量 `provided_by` 而不再仅仅是单个值。

`fabric.operations.``run`(_\*args_, _\*\*kwargs_)[¶](#fabric.operations.run "永久链接至目标")

在远程主机上执行 shell 命令。

If `shell` is True (the default), [`run`](#fabric.operations.run "fabric.operations.run") will execute the given command string via a shell interpreter, the value of which may be controlled by setting `env.shell` (defaulting to something similar to `/bin/bash -l -c "<command>"`.) Any double-quote (`"`) or dollar-sign (`$`) characters in `command` will be automatically escaped when `shell` is True.

[`run`](#fabric.operations.run "fabric.operations.run") will return the result of the remote program’s stdout as a single (likely multiline) string. This string will exhibit `failed` and `succeeded` boolean attributes specifying whether the command failed or succeeded, and will also include the return code as the `return_code` attribute. Furthermore, it includes a copy of the requested & actual command strings executed, as `.command` and `.real_command`, respectively.

Any text entered in your local terminal will be forwarded to the remote program as it runs, thus allowing you to interact with password or other prompts naturally. For more on how this works, see [_与远程程序集成_](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/interactivity.html).

You may pass `pty=False` to forego creation of a pseudo-terminal on the remote end in case the presence of one causes problems for the command in question. However, this will force Fabric itself to echo any and all input you type while the command is running, including sensitive passwords. (With `pty=True`, the remote pseudo-terminal will echo for you, and will intelligently handle password-style prompts.) See [伪终端](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/interactivity.html#pseudottys) for details.

Similarly, if you need to programmatically examine the stderr stream of the remote program (exhibited as the `stderr` attribute on this function’s return value), you may set `combine_stderr=False`. Doing so has a high chance of causing garbled output to appear on your terminal (though the resulting strings returned by [`run`](#fabric.operations.run "fabric.operations.run") will be properly separated). For more info, please read [合并 stdout 和 stderr](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/interactivity.html#combine-streams).

To ignore non-zero return codes, specify `warn_only=True`. To both ignore non-zero return codes _and_ force a command to run silently, specify `quiet=True`.

To override which local streams are used to display remote stdout and/or stderr, specify `stdout` or `stderr`. (By default, the regular `sys.stdout` and `sys.stderr` Python stream objects are used.)

For example, `run("command", stderr=sys.stdout)` would print the remote standard error to the local standard out, while preserving it as its own distinct attribute on the return value (as per above.) Alternately, you could even provide your own stream objects or loggers, e.g. `myout = StringIO(); run("command", stdout=myout)`.

If you want an exception raised when the remote program takes too long to run, specify `timeout=N` where `N` is an integer number of seconds, after which to time out. This will cause `run` to raise a `CommandTimeout` exception.

If you want to disable Fabric’s automatic attempts at escaping quotes, dollar signs etc., specify `shell_escape=False`.

Examples:

run("ls /var/www/")
run("ls /home/myuser", shell\=False)
output \= run('ls /var/www/site1')
run("take\_a\_long\_time", timeout\=5)

1.0 新版功能: The `succeeded` and `stderr` return value attributes, the `combine_stderr` kwarg, and interactive behavior.

在 1.0 版更改: `pty` 默认值现在为 `True`。

在 1.0.2 版更改: The default value of `combine_stderr` is now `None` instead of `True`. However, the default _behavior_ is unchanged, as the global setting is still `True`.

1.5 新版功能: 关键字参数 `quiet`、`warn_only`、`stdout` 以及 `stderr`。

1.5 新版功能: The return value attributes `.command` and `.real_command`.

1.6 新版功能: `timeout` 参数。

1.7 新版功能: `shell_escape` 参数。

`fabric.operations.``sudo`(_\*args_, _\*\*kwargs_)[¶](#fabric.operations.sudo "永久链接至目标")

在远程主机上使用超级用户权限执行 shell 命令。

[`sudo`](#fabric.operations.sudo "fabric.operations.sudo") is identical in every way to [`run`](#fabric.operations.run "fabric.operations.run"), except that it will always wrap the given `command` in a call to the `sudo` program to provide superuser privileges.

[`sudo`](#fabric.operations.sudo "fabric.operations.sudo") accepts additional `user` and `group` arguments, which are passed to `sudo` and allow you to run as some user and/or group other than root. On most systems, the `sudo` program can take a string username/group or an integer userid/groupid (uid/gid); `user` and `group` may likewise be strings or integers.

You may set [env.sudo\_user](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/env.html#sudo-user) at module level or via [`settings`](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html#fabric.context_managers.settings "fabric.context_managers.settings") if you want multiple `sudo` calls to have the same `user` value. An explicit `user` argument will, of course, override this global setting.

Examples:

sudo("~/install\_script.py")
sudo("mkdir /var/www/new\_docroot", user\="www-data")
sudo("ls /home/jdoe", user\=1001)
result \= sudo("ls /tmp/")
with settings(sudo\_user\='mysql'):
    sudo("whoami") \# prints 'mysql'

在 1.0 版更改: 参见 [`run`](#fabric.operations.run "fabric.operations.run") 的变更。

1.5 新版功能: 关键字参数 `quiet`、`warn_only`、`stdout` 以及 `stderr`。

1.5 新版功能: The return value attributes `.command` and `.real_command`.

1.7 新版功能: `shell_escape` 参数。
