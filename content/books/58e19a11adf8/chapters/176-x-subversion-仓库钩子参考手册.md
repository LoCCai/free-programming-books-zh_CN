Subversion 仓库提供了很多事件钩子, 利用这些钩子, 管理员可以在 特定操作的特定时间点扩展 Subversion 的功能. 仓库钩子被实现成由 Subversion 在特定时间点执行的程序, 这些时间点包括在提交之前或之后, 用户锁定文件之前或之后, 等等.

对于每一种钩子, Subversion 都会尝试去执行以钩子命名的程序, 这些 程序文件位于仓库目录的 `hooks/` 子目录内. 例如, 在 一个 Unix 系统中, 钩子 start-commit 对应的程序文件是 ``_`REPOS_PATH`_/hooks/start-commit``, 它可以是一个二进制可执行程序, shell 脚本 或 Python 脚本等. 在 Windows 系统中, 钩子 start-commit 对应的程序文件仍然在相同的目录内, 但文件的名 字变成了 `START-COMMIT.EXE` 或 `START-COMMIT.BAT`, 而不是 Unix 中的 `start-commit`.

本章介绍 Subversion 提供的各种钩子, 包括这些钩子何时被调用, 钩子 的输入参数, 以及钩子的行为将会如何影响 Subversion 的工作流.
