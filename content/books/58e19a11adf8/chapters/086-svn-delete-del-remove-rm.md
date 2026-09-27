This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn delete (del, remove, rm) — 从工作副本或仓库中删除文件.

## 大纲

``svn delete _`PATH`_...``

``svn delete _`URL`_...``

## 描述

由 _`PATH`_ 指定的文件将在提交时从仓库中 删除. 执行完命令后, 文件和未被提交的目录会马上从工作副本中删除, 除非 指定了选项 `--keep-local`. 命令不会删除未被版本控制或 含有本地修改的文件, 除非指定了选项 `--force`. 如果目录 内含有未被版本控制的文件, 或者文件含有本地修改, 这个目录就不会被删除, 除非指定了选项 `--force`.

由 URL 指定的文件会马上触发一个提交操作, 然后直接从仓库中删除. 如果指定了多个 URL, 它们将在同一个提交中完成删除.

## 示例

**svn delete** 会删除工作副本里的文件, 但要等到 提交后才会从仓库中删除.

$ svn delete myfile
D         myfile

$ svn commit -m "Deleted file 'myfile'."
Deleting       myfile
Transmitting file data .
Committed revision 14.

删除由 URL 指定的文件会马上触发一个提交操作, 所以用户需要提供 提交日志:

$ svn delete -m "Deleting file 'yourfile'" \\
             file:///var/svn/repos/test/yourfile

Committed revision 15.

下面的例子展示了如何强制删除含有本地修改的文件:

$ svn delete over-there 
svn: E195006: Use --force to override this restriction (local modifications m\\
ay be lost)
svn: E195006: '/home/sally/project/over-there' has local modifications -- com\\
mit or revert them first
$ svn delete --force over-there 
D         over-there
$

加上选项 `--keep-local` 后, 被 **svn delete** 删除的文件将保留在本地. 这个选项在处理下面这种 情况时很有用: 用户不小心把一个本不应该提交的文件提交到了仓库中, 现在他想从仓库中删除该文件, 但又想把它留在工作副本里.

$ svn delete --keep-local conf/program.conf
D         conf/program.conf

$ svn commit -m "Remove accidentally-added configuration file."
Deleting       conf/program.conf
Transmitting file data .
Committed revision 21.
$ svn status
?       conf/program.conf
$

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>选项 <code>--keep-local</code> 的效果不会扩展到其他工作 副本, 也就是说如果用户提交了删除操作, 这些文件虽然会保留在你的 工作副本里, 但是在更新其他工作副本里, 其他工作副本里的文件仍然会 被删除.</p></td></tr></tbody></table>
