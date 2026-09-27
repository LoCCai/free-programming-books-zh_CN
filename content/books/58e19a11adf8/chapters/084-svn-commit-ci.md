This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn commit (ci) — 把工作副本里的修改发送到仓库中.

## 大纲

``svn commit [_`PATH`_...]``

## 描述

把工作副本里的修改发送到仓库中. 如果用户没有用选项 `--file` (`-F`) 或 `--message` (`-m`) 提供日志消息, **svn** 将打开一个文本编辑器供用户编写提交日志, 见 [“通用配置选项”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.confarea.html#svn.advanced.confarea.opts.config "通用配置选项").

如果没有带上选项 `--no-unlock`, **svn commit** 会把所有已提交的 _`PATH`_ 上的锁令牌 (如果有的话) 发送给仓库, 并在提交完成后解锁.

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>如果用户已经开始提交并且 Subversion 已经启动了一个文本编辑器 等待用户输入提交日志, 此时仍然可以中止提交. 如果用户希望中止提交, 只需要不保存提交日志并退出编辑器, 此时 Subversion 将会询问用户是 想中止提交, 还是不输入日志直接提交, 还是重新打开编辑器编写日志.</p></td></tr></tbody></table>

## 示例

把提交日志直接写在命令行上, 如果没有指定目标文件, 则默认提交的是 当前目录 (“`.`”) 下的所有修改:

$ svn commit -m "added howto section."
Sending        a
Transmitting file data .
Committed revision 3.

提交 `foo.c` 的修改, 并从文件 `msg` 读取提交日志:

$ svn commit -F msg foo.c
Sending        foo.c
Transmitting file data .
Committed revision 5.

如果选项 `--file` (`-F`) 所指定的 文件处于版本控制中, 而你的确想从该文件中读取提交日志, 就要额外加上 选项 `--force-log`:

$ svn commit -F file\_under\_vc.txt foo.c
svn: E205004: Log message file is a versioned file; use '--force-log' to override

$ svn commit --force-log -F file\_under\_vc.txt foo.c
Sending        foo.c
Transmitting file data .
Committed revision 6.

提交一个将被删除的文件:

$ svn commit -m "removed file 'c'."
Deleting       c

Committed revision 7.
