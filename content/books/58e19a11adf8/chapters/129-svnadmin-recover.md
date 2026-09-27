This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin recover — 把仓库数据库恢复到一个一致的状态 (该命令只适用于以 `bdb` 作为后端存储的仓库). 另外, 如果 `repos/conf/passwd` 不存在, 命令将自动创建一个默认 的密码文件.

## 大纲

``svnadmin recover _`REPOS_PATH`_``

## 描述

如果你得到一条说明仓库需要复原的错误信息, 就执行这个命令.

## 示例

复原一个挂起的仓库:

$ svnadmin recover /var/svn/repos/ 
Repository lock acquired.
Please wait; recovering the repository may take some time...

Recovery completed.
The latest repos revision is 34.

复原数据库要求获得仓库的排斥性锁. (这是一个 “数据库锁”, 见 [“锁” 的多种涵义](https://svnbook.red-bean.com/nightly/zh/svn.advanced.locking.html#svn.advanced.locking.meanings "“锁” 的多种涵义")) 如果有其他进程正在访问 仓库, **svnadmin recover** 将会报错:

$ svnadmin recover /var/svn/repos
svn: E165000: Failed to get exclusive repository access; perhaps another proce
ss such as httpd, svnserve or svn has it open?
$

选项 `--wait` 使得 **svnadmin recover** 会一直等到其他进程不再访问仓库为止:

$ svnadmin recover /var/svn/repos --wait
Waiting on repository lock; perhaps another process has it open?

### time goes by…

Repository lock acquired.
Please wait; recovering the repository may take some time...

Recovery completed.
The latest repos revision is 34.
