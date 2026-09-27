本站覆盖了 Fabric 的用法和 API 文档，包括变更历史和维护信息等 Fabric 基本信息见 [Fabric 官方网站](http://fabfile.org/) 。

## 入门教程[¶](#tutorial "永久链接至标题")

对于新用户，以及/或想大概了解 Fabric 基本功能的同学，请访问 [_概览 & 教程_](https://fabric-chs.readthedocs.io/zh-cn/chs/tutorial.html) 。本文档的其它部分将假设你至少已经大概熟悉其中的内容。

## 使用文档[¶](#usage-documentation "永久链接至标题")

下面的列表包含了 Fabric （非 API 部分）文档的主要章节。这些内容对 [_概览 & 教程_](https://fabric-chs.readthedocs.io/zh-cn/chs/tutorial.html) 中提到的概念进行了扩展，同时还覆盖了一些高级主题。

-   [环境字典 `env`](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/env.html)
    -   [运行环境即设置](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/env.html#environment-as-configuration)
    -   [环境即状态共享](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/env.html#environment-as-shared-state)
    -   [其他考虑](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/env.html#other-considerations)
    -   [环境变量完整列表](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/env.html#full-list-of-env-vars)
-   [Execution model](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/execution.html)
    -   [Execution strategy](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/execution.html#execution-strategy)
    -   [Defining tasks](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/execution.html#defining-tasks)
    -   [Defining host lists](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/execution.html#defining-host-lists)
    -   [Intelligently executing tasks with `execute`](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/execution.html#intelligently-executing-tasks-with-execute)
    -   [Failure handling](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/execution.html#failure-handling)
    -   [Connections](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/execution.html#connections)
    -   [Password management](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/execution.html#password-management)
    -   [Leveraging native SSH config files](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/execution.html#leveraging-native-ssh-config-files)
-   [`fab` 选项和参数](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/fab.html)
    -   [基本应用](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/fab.html#basic-use)
    -   [直接执行远程命令](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/fab.html#arbitrary-remote-shell-commands)
    -   [命令行参数](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/fab.html#command-line-options)
    -   [Per-task arguments](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/fab.html#per-task-arguments)
    -   [配置文件](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/fab.html#settings-files)
-   [Fabfile 文件的结构和使用](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/fabfiles.html)
    -   [指定 fabfile](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/fabfiles.html#fabfile-discovery)
    -   [引用 Fabric](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/fabfiles.html#importing-fabric)
    -   [定义任务并导入 callable 任务](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/fabfiles.html#defining-tasks-and-importing-callables)
-   [与远程程序集成](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/interactivity.html)
    -   [合并 stdout 和 stderr](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/interactivity.html#combining-stdout-and-stderr)
    -   [伪终端](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/interactivity.html#pseudottys)
    -   [两者结合](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/interactivity.html#combining-the-two)
-   [作为库使用](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/library.html)
    -   [连接服务器](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/library.html#connections)
    -   [断开连接](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/library.html#disconnecting)
    -   [最后注意](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/library.html#final-note)
-   [输出管理](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/output_controls.html)
    -   [输出等级](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/output_controls.html#output-levels)
    -   [隐藏和／或显示输出级别](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/output_controls.html#hiding-and-or-showing-output-levels)
-   [并行执行](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/parallel.html)
    -   [它是如何运转的](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/parallel.html#what-it-does)
    -   [如何使用](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/parallel.html#how-to-use-it)
    -   [bubble 大小](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/parallel.html#bubble-size)
    -   [行级输出 vs 比特级输出](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/parallel.html#linewise-vs-bytewise-output)
-   [SSH 行为](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/ssh.html)
    -   [未知主机](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/ssh.html#unknown-hosts)
    -   [已知主机但更换了密钥](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/ssh.html#known-hosts-with-changed-keys)
-   [定义任务](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/tasks.html)
    -   [新式任务](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/tasks.html#new-style-tasks)
    -   [传统任务](https://fabric-chs.readthedocs.io/zh-cn/chs/usage/tasks.html#classic-tasks)

## API 文档[¶](#api-documentation "永久链接至标题")

Fabric 维护了两套根据代码中 docstring 自动生成的 API 文档（它们都十分详尽）。

### 扩展 API[¶](#contrib-api "永久链接至标题")

Fabric 的 **扩展包** 包括常用而有用的工具（通常是从用户的 fabfile 中合并进来的），可用于用户 I/O、修改远程文件等任务中。核心 API 倾向于保持小巧、不随意变更，扩展包则会随着更多的用户案例被解决并添加进来，而不断成长进化（同时尽量保持向后兼容）。

-   [终端输出工具](https://fabric-chs.readthedocs.io/zh-cn/chs/api/contrib/console.html)
-   [与 Django 集成](https://fabric-chs.readthedocs.io/zh-cn/chs/api/contrib/django.html)
-   [文件和目录管理](https://fabric-chs.readthedocs.io/zh-cn/chs/api/contrib/files.html)
-   [项目工具](https://fabric-chs.readthedocs.io/zh-cn/chs/api/contrib/project.html)

## 参与 & 测试[¶](#contributing-running-tests "永久链接至标题")

我们欢迎高级用户 & 开发者提交并帮助修复 bug，或者帮助开发新功能。
