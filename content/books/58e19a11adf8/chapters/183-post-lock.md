This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

post-lock — 路径被成功锁定的通知.

## 大纲

``post-lock _`REPOS-PATH`_ _`USER`_``

## 描述

钩子 post-lock 在一个或多个路径被成功锁定后执行, 它的典型用法 是发送路径被锁定的通知邮件.

如果钩子 post-lock 的退出值不为零, 那么锁定操作将 _不会_ 被中止, 因此这时候锁定操作已经完成了, 但是钩子程序打印到 `stderr` 的所有信息都会返回 给客户端, 以便分析钩子失败的原因.

## 输入参数

传递给钩子程序的命令行参数, 按照出现的顺序来说, 有:

1.  仓库路径
    
2.  锁定路径的已认证的用户名
    

另外, 被锁定的路径列表将通过标准输入传递给钩子程序, 每行一个.

## 常见用法

路径被锁定的通知
