This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

post-commit — 成功提交的通知.

## 大纲

``post-commit _`REPOS-PATH`_ _`REVISION`_ _`TXN-NAME`_``

## 描述

事务提交并且新的版本号生成后, Subversion 就会执行钩子 post-commit. 大多数管理员都会利用 post-commit 向团队成员发送关 于新提交的邮件, 或者通知其他工具 (例如一个问题跟踪系统) 有新的提交 生成. 有些管理员还会用 post-commit 触发备份操作.

如果钩子 post-commit 的退出值不为零, 提交过程将 _不会_ 中止, 因为这时候提交已经完成了. 但是, 钩子打印到 `stderr` 的信息都会返回给客户端, 以 便分析钩子失败的原因.

## 输入参数

传递给钩子程序的命令行参数, 按照出现的顺序来说, 有:

1.  仓库路径
    
2.  新版号的整数编号
    
3.  已经变成版本号的事务名, 正是该版本号触发了本次钩子的运行.
    

## 常见用法

提交通知; 工具集成
