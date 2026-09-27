## A2.5 附录 B: 在你的应用中嵌入 Git - Dulwich

## Dulwich

这还有一个纯-Python 的 Git 实现——Dulwich。 该项目托管在 [https://www.dulwich.io/](https://www.dulwich.io/)。 它旨在在提供一个与 Git 存储库(本地和远程)的接口，该接口不直接调用 git，而是使用纯 Python。 它有一个可选的 C 扩展，可以显著提高性能。

Dulwich 遵循 git 设计，将 API 分为两个基本级别：底层命令和上层命令。

下面是一个使用低级 API 获取上次提交的提交消息的例子：

```
from dulwich.repo import Repo
r = Repo('.')
r.head()
# '57fbe010446356833a6ad1600059d80b1e731e15'

c = r[r.head()]
c
# <Commit 015fc1267258458901a94d228e39f0a378370466>

c.message
# 'Add note about encoding.\n'
```

要使用高级上层命令 API 打印提交日志，可以使用：

```
from dulwich import porcelain
porcelain.log('.', max_entries=1)

#commit: 57fbe010446356833a6ad1600059d80b1e731e15
#Author: Jelmer Vernooĳ <jelmer@jelmer.uk>
#Date:   Sat Apr 29 2017 23:57:34 +0000
```
