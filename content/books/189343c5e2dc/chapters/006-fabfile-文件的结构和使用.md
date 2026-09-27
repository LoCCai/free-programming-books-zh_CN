本文档介绍了 fabfile 的使用，以及各式各样的 fabfile 示例，其中不乏最佳实践和反面教材。

## 指定 fabfile[¶](#fabfile-discovery "永久链接至标题")

Fabric 能够加载 Python 模块（如： `fabfile.py` ）和包（如 `fabfile/` ），默认情况下，它会根据 Python 包的导入机制加载 `fabfile` －可以是 `fabfile/` 也可以是 `fabfile.py` 。

根据 fabfile 的搜寻机制，Fabric 会依次查找用户当前目录以及其上层目录，因此在项目中使用时，可以把 `fabfile.py` 置于项目的根目录，这样无论进入项目中的任何目录时，调用 `fab` 命令都可以找到这个 `fabfile` 配置。

你要可以在命令行中通过 [`-f`](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/fab.html#cmdoption-f) 参数，或者在 [fabricrc](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/fab.html#fabricrc) 中指定 `fabfile` 文件名。例如，想要使用 `fab_tasks.py` 作为 fabfile 的文件名，你只需要在创建它后输入 `fab -f fab_tasks.py <task name>` ，或者在 `~/.fabricrc` 中添加 `fabfile = fab_tasks.py` 。

如果指定的 fabfile 文件名中包含了路径元素（比如： `../fabfile.py` 或者 `/dir1/dir2/custom_fabfile`），而不只是文件名，Fabric 将直接找到该文件，不做任何搜索。这种情况下同样接受波浪线表达式，也就是说你可以这样指定： `~/personal_fabfile.py` 。

注解

Fabric 通过 `import` （实际上是 `__import__`）来获取配置文件内容——而不是 `eval` 或者类似的方式。它的实现方式是，将 fabfile 所在目录加入 Python 的加载目录（当然之后会将它删去）。

在 0.9.2 版更改: 支持加载 fabfile 包。

## 引用 Fabric[¶](#importing-fabric "永久链接至标题")

Fabric 本质上依然是 Python，因此你 _可以_ 随意地调用它的组件。不过，处于封装和便捷性（以及 Fabric 脚本的易用性）考虑，Fabric 的公开 API 由 `fabric.api` 模块维护。

Fabric 的 [_业务（Operation）_](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/operations.html) 、[_上下文管理器_](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/context_managers.html) 、 [_装饰器_](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/decorators.html) 以及 [_实用工具_](https://fabric-chs.readthedocs.io/zh-cn/chs/api/core/utils.html) 都是本模块的名字空间，为 fabfile 提供了一套简单并且统一的接口。你可以像这样使用：

from fabric.api import \*

\# call run(), sudo(), etc etc

严格来说，这样并不符合最佳实践（因为 [a number of reasons](http://python.net/~goodger/projects/pycon/2007/idiomatic/handout.html#importing) ），如果你只需要使用少数几个 Fab API，_务必_ 明确导入： :: `from fabric.api import env, run` 。但是在大多数 fabfile 中，都使用了其中大多数 API，这时 `import *`

from fabric.api import \*

比下面的写法要更易于读写：

from fabric.api import abort, cd, env, get, hide, hosts, local, prompt, \\
    put, require, roles, run, runs\_once, settings, show, sudo, warn

在上面的例子中，相比最优范式，我们可以更加实用主义一些。

## 定义任务并导入 callable 任务[¶](#defining-tasks-and-importing-callables "永久链接至标题")

对于 Fabric 来说怎样才算是任务，以及 Fabric 何时导入 fabfile ，请阅读 [_Execution model_](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/execution.html) 文档的 [_定义任务_](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/tasks.html) 章节。
