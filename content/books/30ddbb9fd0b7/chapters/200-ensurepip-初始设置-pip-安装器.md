Added in version 3.4.

**源代码:** [Lib/ensurepip](https://github.com/python/cpython/tree/3.14/Lib/ensurepip)

* * *

`ensurepip` 包为将 `pip` 安装程序引导至现有 Python 安装版或虚拟环境提供支持。 需要使用此引导方式这一事实反映出 `pip` 是一个具有自己的发布周期的独立项目，并且其最新可用稳定版本将捆绑至相应 CPython 解释器的维护版本和新增特性版本。

在大多数情况下，Python 的终端使用者不需要直接调用这个模块 (`pip` 默认应该已被引导)，不过，如果在安装 Python（或创建虚拟环境）之时跳过了安装 `pip` 步骤，或者日后特意卸载了 `pip`，则需要使用这个模块。

备注

这个模块 _无需_ 访问互联网。引导启动 `pip` 所需的全部组件均包含在包的内部。

这是一个 [optional module](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module)。如果它在你的 CPython 副本中缺失，请查看你的发行方（也就是说，向你提供 Python 的人）的文档。如果你就是发行方，请参阅 [针对可选模块的要求](https://docs.python.org/zh-cn/3/using/configure.html#optional-module-requirements)。

## 命令行接口[¶](#command-line-interface "Link to this heading")

使用解释器的 `-m` 参数调用命令行接口。

最简单的调用方式为:

python \-m ensurepip

该调用会在当前未安装 `pip` 的情况下安装 `pip`，如已安装则无事发生。如要确保安装的 `pip` 版本至少为 `ensurepip` 所提供的最新版本，传入 `--upgrade` 参数:

python \-m ensurepip \--upgrade

在默认情况下，`pip` 会被安装到当前虚拟环境（如果激活了虚拟环境）或系统的包目录（如果未激活虚拟环境）。 安装位置可通过两个额外的命令行选项来控制：

\--root <dir>[¶](#cmdoption-ensurepip-root "Link to this definition")

相对于给定的根目录而不是当前已激活虚拟环境（如果存在）的根目录或当前 Python 安装版的默认根目录来安装 `pip`。

\--user[¶](#cmdoption-ensurepip-user "Link to this definition")

将 `pip` 安装到用户的站点包目录而不是针对当前 Python 安装版的全局安装（此选项在激活的虚拟环境内部是不被允许的）。

在默认情况下，脚本 `pipX` 和 `pipX.Y` 将被安装（其中 X.Y 表示被用来调用 `ensurepip` 的 Python 的版本）。所安装的脚本可通过两个额外的命令行选项来控制：

\--altinstall[¶](#cmdoption-ensurepip-altinstall "Link to this definition")

如果请求了一个替代安装版，则 `pipX` 脚本将 _不会_ 被安装。

\--default-pip[¶](#cmdoption-ensurepip-default-pip "Link to this definition")

如果请求了一个 "默认的 pip" 安装版，则将在两个常规脚本的基础上额外安装 `pip` 脚本。

同时提供这两个脚本选择选项将会触发异常。

## 模块 API[¶](#module-api "Link to this heading")

`ensurepip` 对外暴露了两个函数供编程使用：

ensurepip.version()[¶](#ensurepip.version "Link to this definition")

返回一个指明在初始创建环境时将被安装的可用 pip 版本的字符串。

ensurepip.bootstrap(_root\=None_, _upgrade\=False_, _user\=False_, _altinstall\=False_, _default\_pip\=False_, _verbosity\=0_)[¶](#ensurepip.bootstrap "Link to this definition")

初始创建 `pip` 到当前的或指定的环境中。

_root_ 指明要作为相对安装路径的替代根目录。如果 _root_ 为 `None`，则安装会使用当前环境的默认安装位置。

_upgrade_ 指明是否要将一个现有的较早版本的 `pip` 的安装版升级到可用的新版本。

_user_ 指明是否使用针对用户的安装方案而不是全局安装。

在默认情况下，将会安装 `pipX` 和 `pipX.Y` 脚本（其中 X.Y 表示 Python 的当前版本）。

如果设置了 _altinstall_，则 `pipX` 将 _不会_ 被安装。

如果设置了 _default\_pip_，则除了两个常规脚本外还将安装 `pip`。

同时设置 _altinstall_ 和 _default\_pip_ 将触发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

_verbosity_ 控制初始创建操作对 [`sys.stdout`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stdout "sys.stdout") 的输出信息级别。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ensurepip.bootstrap` 并附带参数 `root`。

备注

初始创建过程对于 `sys.path` 和 `os.environ` 都会有附带影响。改为在子进程中调用命令行接口可以避免这些附带影响。

备注

初始创建过程可能会安装 `pip` 所需的额外模块，但其他软件不应假定这些依赖将总是会默认存在（因为这些依赖可能会在未来的 `pip` 版本中被移除）。
