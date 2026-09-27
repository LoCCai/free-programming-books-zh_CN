This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin freeze — 在执行某个程序期间, 禁止向仓库提交.

## 大纲

``svnadmin freeze _`REPOS_PATH`_ _`PROGRAM`_ [_`ARG`_...]``

``svnadmin freeze --file _`FILENAME`_ _`PROGRAM`_ [_`ARG`_...]``

## 描述

**svnadmin freeze** 禁止在程序 _`PROGRAM`_ (带有参数 _`ARG`_) 运行期间, 向仓库 _`REPOS_PATH`_ 提交修改 (即冻结仓库). 如果客户 端在仓库冻结期间向仓库提交修改, 提交将会阻塞, 直到仓库解除冻结. **svnadmin freeze** 的目的是让第三方备份工具 (例如 **rsync**) 可以安全地对在线仓库进行备份.

如果添加了选项 `--file`, 文件 _`FILENAME`_ 中列出的所有仓库都会被冻结. 文件 的格式是每行一个 _`REPOS_PATH`_, 仓库被冻结的 顺序和它们在文件中的顺序相同.

## 示例

冻结仓库, 然后执行 **rsync** 对仓库进行备份:

$ svnadmin freeze /var/svn/repos -- rsync -av /var/svn/repos /backup/repos
