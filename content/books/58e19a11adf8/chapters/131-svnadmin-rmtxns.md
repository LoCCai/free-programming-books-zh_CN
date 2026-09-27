This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin rmtxns — 从仓库中删除事务.

## 大纲

``svnadmin rmtxns _`REPOS_PATH`_ _`TXN_NAME`_...``

## 示例

删除指定的事务:

$ svnadmin rmtxns /var/svn/repos/ 1w 1x

方便的是, 我们可以把 **lstxns** 的输出用作 **rmtxns** 的输入:

$ svnadmin rmtxns /var/svn/repos/  \`svnadmin lstxns /var/svn/repos/\`

上面的例子删除了仓库中所有未提交的事务.
