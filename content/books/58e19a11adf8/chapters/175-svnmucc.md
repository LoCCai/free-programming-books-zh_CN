This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnmucc — 基于 URL, 对 Subversion 仓库执行一个或多个操作, 在一个版本 号中提交所有的修改.

## 大纲

``svnmucc _`ACTION...`_``

## 描述

利用 **svnmucc**, 用户可以在没有工作副本的情况下向 仓库提交修改. 它允许用户基于 URL 直接操作仓库. 每一次调用 **svnmucc** 都可以执行一个或多个 _`ACTION`_, 并且操作产生的所有修改都是在同一个 版本号中完成提交.

## 操作

**svnmucc** 支持的操作 (及其参数) 有以下这些, 它们 可以以各种组合出现在命令行上:

cp _`REV`_ _`SRC-URL`_ _`DST-URL`_

把版本号为 _`REV`_ 且位于 _`SRC-URL`_ 的文件或目录复制到 _`DST-URL`_.

mkdir _`URL`_

在 _`URL`_ 创建一个新目录. _`URL`_ 的父目录必须已经存在 (或者说 父目录将会被前面的 **svnmucc** 操作创建), 命令无法自动创建中间目录.

mv _`SRC-URL`_ _`DST-URL`_

把位于 _`SRC-URL`_ 的文件或目录移动到 _`DST-URL`_.

rm _`URL`_

删除位于 _`URL`_ 的文件或目录.

put _`SRC-FILE`_ _`URL`_

在 _`URL`_ 添加一个新文件, 或者修改 位于 _`URL`_ 的已经存在的文件, 命令把 本地文件 _`SRC-FILE`_ 的内容复制到新 文件或已有的文件上. 如果 _`SRC-FILE`_ 是单连字符 `-`, **svnmucc** 将从标准输入中读取文件内容.

propset _`NAME`_ _`VALUE`_ _`URL`_

把 _`URL`_ 的属性 _`NAME`_ 的值设置成 _`VALUE`_.

propsetf _`NAME`_ _`FILE`_ _`URL`_

把 _`URL`_ 的属性 _`NAME`_ 的值设置成文件 _`FILE`_ 的内容.

propdel _`NAME`_ _`URL`_

删除 _`URL`_ 上的属性 _`NAME`_.

## 选项

**svnmucc** 的选项都是全局的, 包括:

`--config-dir` _`DIR`_

告诉 **svnmucc** 从指定的目录中读取配置信息, 而不是从默认目录 (用户家目录里的 `.subversion`) 中读取.

`--config-option` _`CONFSPEC`_

在命令运行期间, 设置运行时配置选项的值. _`CONFSPEC`_ 是一个字符串, 指定了运行时 配置选项的名字空间, 选项名和选项值, 格式是 _`FILE`_:_`SECTION`_:_`OPTION`_\=\[_`VALUE`_\]. 其中, _`FILE`_ 和 _`SECTION`_ 分别是运行时配置文件 (`config` 或 `servers`) 和节, 它们包含了用户希望修改的选项. _`OPTION`_ 是选项名, _`VALUE`_ 是选项值 (如果有的话). 例如, 为了临时禁止 HTTP 压缩, 可以写成 `--config-option=servers:global:http-compression=no`. 选项 `--config-option` 可以在命令行上出现多次, 从而同时修改多个选项.

`--extra-args` (`-X`) _`ARGFILE`_

从文件 _`ARGFILE`_ 读取额外的命令行 参数, 每行一个. 如果 _`ARGFILE`_ 是 单连字符 `-`, **svnmucc** 将从标准输入中读取额外的命令行参数.

`--file` (`-F`) _`MSGFILE`_

从文件 _`MSGFILE`_ 中读取日志消息.

`--help` (`-h`, `-?`)

显示命令的帮助信息, 然后退出.

`--message` (`-m`) _`MSG`_

使用 _`MSG`_ 作为日志消息.

`--no-auth-cache`

禁止在 Subversion 运行时配置目录中缓存认证信息 (例如用户名和密码).

`--non-interactive`

禁止所有的交互性提示 (例如请求用户输入认证证书).

`--revision` (`-r`) _`REV`_

把版本号 _`REV`_ 作为 **svnmucc** 操作所导致的所有修改的基础版本号. 如果用户需要使用 **svnmucc** 修改已存在的版本 化数据, 那么你应该习惯性地使用该选项, 从而避免在无意间撤消 其他同事几乎在同一时间提交的修改.

`--root-url` (`-U`) _`ROOT-URL`_

把 _`ROOT-URL`_ 作为其他 URL 目标 的基础 URL, 其他 URL 目标将被看作是相对于 _`ROOT-URL`_ 的路径. _`ROOT-URL`_ 并不一定就是仓库的根 URL (例如由 **svn info** 输出的仓库根 URL), 它可以 是任意的 URL, 只要它是 **svnmucc** 命令行上所 指定的 URL 目标的公共前缀部分即可.

`--password` (`-p`) _`PASSWD`_

指定 Subversion 用户密码, 如果没有指定密码, 或者密码不正确, 在必要时 Subversion 将会提示用户再次输入密码.

`--username` _`NAME`_

指定 Subversion 用户名, 如果没有指定或用户名不正确, Subversion 在必要时会提示用户重新输入.

`--version`

输出程序的版本信息, 然后退出.

`--with-revprop` _`NAME`_\=_`VALUE`_

把版本号属性 _`NAME`_ 的值设置成 _`VALUE`_.

## 示例

为了在没有工作副本的情况下安全地修改文件, 我们可以这样做: 先用 **svn cat** 把文件的当前内容下载到本地, 然后再用 **svnmucc put** 把更新后的文件提交到仓库中.

$ # Calculate some convenience variables.
$ export FILEURL=http://svn.example.com/projects/sandbox/README
$ export BASEREV=\`svn info ${FILEURL} | \\
                  grep '^Last Changed Rev' | cut -d ' ' -f 2\`
$ # Get a copy of the file's current contents.
$ svn cat ${FILEURL}@${BASEREV} > /tmp/README.tmpfile
$ # Edit the (copied) file.
$ vi /tmp/README.tmpfile
$ # Commit the new content for our file.
$ svnmucc -r ${BASEREV} put README.tmpfile ${FILEURL} \\
          -m "Tweak the README file."
r24 committed by harry at 2013-01-21T16:21:23.100133Z
# Cleanup after ourselves.
$ rm /tmp/README.tmpfile

使用类似的思路修改文件或目录的属性, 只不过这次要把命令换成 **svn propget** 和 **svnmucc propsetf**.

$ # Calculate some convenience variables.
$ export PROJURL=http://svn.example.com/projects/sandbox
$ export BASEREV=\`svn info ${PROJURL} | \\
                  grep '^Last Changed Rev' | cut -d ' ' -f 2\`
$ # Get a copy of the directory's "license" property value.
$ svn -r ${BASEREV} propget license ${PROJURL} > /tmp/prop.tmpfile
$ # Tweak the property.
$ vi /tmp/prop.tmpfile
$ # Commit the new property value.
$ svnmucc -r ${BASEREV} propsetf prop.tmpfile ${PROJURL} \\
          -m "Tweak the project directory 'license' property."
r25 committed by harry at 2013-01-21T16:24:11.375936Z
# Cleanup after ourselves.
$ rm /tmp/prop.tmpfile

下面再看看如何在一次调用中完成多个操作.

为了实现 “移动标签” (重复使用同一个标签名, 指向 代码的不同版本, 例如总是指向当前最新的稳定版), 可以使用 **svnmucc rm** 和 **svnmucc cp**:

$ svnmucc -U http://svn.example.com/projects/doohickey \\
          rm tags/latest-stable \\
          cp HEAD trunk tags/latest-stable \\
          -m "Slide the 'latest-stable' tag forward."
r134 committed by harry at 2013-01-12T11:02:16.142536Z
$ 

在上面的例子里, 我们通过使用选项 `--root-url` (`-U`) 指定了一个基础 URL, 其他参数中的 URL 将被当 成相对 URL, 从而减少打字工作.

下面的例子展示了如何使用 **svnmucc** 创建一个新 标签, 这个标签删除了在发布版中不需要的一个目录, 同时还添加了一个 用于描述发布版的文件:

$ echo "This is the 1.2.0 release." | \\
       svnmucc -U http://svn.example.com/projects/doohickey \\
               -m "Tag the 1.2.0 release." \\
               -- \\
               cp HEAD trunk tags/1.2.0 \\
               rm tags/1.2.0/developer-notes \\
               put - tags/1.2.0/README.tag
r164 committed by cmpilato at 2013-01-22T05:26:15.563327Z
$ svn log -c 164 -v http://svn.example.com/projects/doohickey
------------------------------------------------------------------------
r164 | cmpilato | 2013-01-22 00:26:15 -0500 (Tue, 22 Jan 2013) | 1 line
Changed paths:
   A /tags/1.2.0 (from /trunk:163)
   A /tags/1.2.0/README.tag
   D /tags/1.2.0/developer-notes

Tag the 1.2.0 release.
$ 

上面的例子不仅展示了如何在 **svnmucc** 的一次调用 中完成多种不同的操作, 还展示了如何从标准输入读取文件的内容. 注意我 们还在命令行中使用了双连字符 `--`, 用于告诉 **svnmucc** 在 `--` 的右边已经没有 更多的选项了, 从而避免右边的单连字符 `-` 被 **svnmucc** 当成选项开始的标志.
