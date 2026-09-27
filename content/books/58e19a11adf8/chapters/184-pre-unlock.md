This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

pre-unlock — 有人试图解锁某一路径的通知.

## 大纲

``pre-unlock _`REPOS-PATH`_ _`PATH`_ _`USER`_ _`TOKEN`_ _`BREAK-UNLOCK`_``

## 描述

如果有人试图解决某一路径, 就会触发钩子 pre-unlock. 它可以用于 决定哪些用户可以解锁特定的路径, 尤其是决定锁的破坏策略, 例如当用户 A 已经锁定了一个文件时, 这时候是否应该允许用户 B 破坏锁? 如果锁已经 持有一周了呢? 这些考虑都可以放在钩子 pre-unlock 里实现.

如果钩子 pre-unlock 的退出值不为零, 解锁操作将被中止, 任何打印到 `stderr` 的信息都会返回给客户端.

## 输入参数

传递给钩子程序的命令行参数, 按照出现的顺序来说, 有:

1.  仓库路径
    
2.  将被解锁的路径
    
3.  试图解锁路径的已认证的用户名
    
4.  与锁有关的锁令牌
    
5.  `1` (如果用户试图破坏锁); `0` (用户不想破坏锁)
    

## 常见用法

访问控制
