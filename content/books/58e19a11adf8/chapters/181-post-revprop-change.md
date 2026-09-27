This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

post-revprop-change — 版本号属性被成功修改的通知.

## 大纲

``post-revprop-change _`REPOS-PATH`_ _`REVISION`_ _`USER`_ _`PROPNAME`_ _`ACTION`_``

## 描述

钩子 post-revprop-change 在版本号属性被修改完成后立即执行, 这 里所说的版本号修改不是通常提交的一部分. 从前面对钩子 pre-revprop-change 的介绍读者应该可以很容易推断出, 除非提供了 pre-revprop-change, 否则的话 post-revprop-change 根本没机会执行. 这个钩子的典型用途是发邮件通知版本号属性被修改了.

如果钩子 post-revprop-change 的退出值不为零, 那么针对版本号属性 的修改将 _不会_ 被中止, 因为这时候修改已经完成了. 但是, 钩子打印到 `stderr` 的信息都会返回给客户端, 以便分析钩子失败的原因.

## 输入参数

传递给钩子程序的命令行参数, 按照出现的顺序来说, 有:

1.  仓库路径
    
2.  属性即将被修改的版本号的整数编号
    
3.  修改版本号属性的已认证的用户名
    
4.  被修改的版本号属性的名字
    
5.  用于描述修改类型的字符: `A` (新增的), `D` (被删除的), 或 `M` (被修改的)
    

此外, Subversion 还会把版本号属性的旧值通过标准输入 `stdin` 传递给钩子程序.

## 常见用法

通知人们有版本号属性被修改了
