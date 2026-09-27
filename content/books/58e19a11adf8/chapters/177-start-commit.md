This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

start-commit — 开始一个新提交的通知.

## 大纲

``start-commit _`REPOS-PATH`_ _`USER`_ _`CAPABILITIES`_ _`TXN-NAME`_``

## 描述

提交事务创建完, 并且初始属性设置完成后, 紧接着就开始执行钩子 start-commit. 它的典型用法是作为早期的终止机制, 避免浪费大量的 时间等待一个已经确定最终会失败的提交结束, 提交失败的原因可能是用户 缺少提交权限, 或者是某些提交元数据验证失败.

如果钩子 start-commit 的退出值不为零, 提交过程就会中止, 提交 事务也会被销毁, 任何打印到 `stderr` 的信息 都会返回给客户端.

钩子 start-commit 并非是评价特定提交的实质内容的合适地方, 因为它在传送文件或目录的修改信息之前被调用, 此时管理员应该使用 钩子 pre-commit (见本章的 [pre-commit](https://svnbook.red-bean.com/nightly/zh/svn.ref.reposhooks.pre-commit.html "pre-commit")).

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>在 Subversion 1.8 之前, Subversion 是在创建提交事务 <span><em>之前</em></span> 调用钩子 start-commit, 如果钩子返回 失败, 提交事务就不会被创建. 从 Subversion 1.8 开始不再如此, 这是为了让钩子 start-commit 能够访问事务的属性, 事务的属性包括 提交的日志消息等.</p></td></tr></tbody></table>

## 输入参数

传递给钩子程序的命令行参数, 按照出现的顺序来说, 有:

1.  仓库路径
    
2.  尝试向仓库提交的已认证的用户名
    
3.  以冒号分隔的特性 (capabilities) 列表, 这些特性由客户端传递 给服务器, 包括 `depth`, `mergeinfo` 和 `log-revprops` (`log-revprops` 在 Subversion 1.5 引入)
    
4.  提交事务名 (在 Subversion 1.8 引入)
    

## 常见用法

访问控制 (例如临时禁止向仓库提交修改).

只允许支持某些特性的客户端向仓库提交修改.
