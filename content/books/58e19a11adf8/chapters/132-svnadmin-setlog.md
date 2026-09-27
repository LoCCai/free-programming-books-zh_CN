This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin setlog — 设置版本号的日志消息.

## 大纲

``svnadmin setlog _`REPOS_PATH`_ -r _`REVISION`_ _`FILE`_``

## 描述

把版本号 _`REVISION`_ 的日志消息设置成 文件 _`FILE`_ 的内容.

这个命令类似于用带有选项 `--revprop` 的命令 **svn propset** 设置版本号的 `svn:log` 属性, 不同点是在使用 **svnadmin setlog** 可以利用选项 `--bypass-hooks` 旁路掉 pre-commit 或 post-commit 钩子 脚本, 这对于没有在钩子 pre-revprop-change 中开启版本号修改的情景非常 方便.

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p>Subversion 不会对版本号属性进行版本控制, 所以 <span><strong>svnadmin setlog</strong></span> 会永久性地覆盖掉之前的日志消息.</p></td></tr></tbody></table>

## 示例

把版本号 19 的日志消息设置成文件 `msg` 的 内容:

$ svnadmin setlog /var/svn/repos/ -r 19 msg
