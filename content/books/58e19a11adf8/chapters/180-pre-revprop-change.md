This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

pre-revprop-change — 版本号属性即将被修改的通知.

## 大纲

``pre-revprop-change _`REPOS-PATH`_ _`REVISION`_ _`USER`_ _`PROPNAME`_ _`ACTION`_``

## 描述

钩子 pre-revprop-change 在版本号属性即将被修改之前调用, 这 里所说的版本号修改不是通常提交的一部分. 和其他钩子不同的是, pre-revprop-change 的默认行为是禁止修改版本号属性. 为了允许修改 版本号属性, pre-revprop-change 必须显式地以零作为退出值.

如果 pre-revprop-change 没有退出, 或者不可执行, 或者退出值不 为零, Subversion 将禁止修改版本号属性, 钩子打印到 `stderr` 的信息都会返回给客户端.

## 输入参数

传递给钩子程序的命令行参数, 按照出现的顺序来说, 有:

1.  仓库路径
    
2.  即将被修改的版本号的整数编号
    
3.  试图修改版本号属性的已认证的用户名
    
4.  即将被修改的版本号属性的名字
    
5.  用于描述修改类型的字符: `A` (新增的), `D` (被删除的), 或 `M` (被修改的)
    

此外, Subversion 还会把版本号属性的新值通过标准输入 `stdin` 传递给钩子程序.

## 常见用法

访问控制; 控制和检查修改
