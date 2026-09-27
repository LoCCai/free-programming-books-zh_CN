This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

pre-lock — 有人试图锁定某一路径的通知.

## 大纲

``pre-lock _`REPOS-PATH`_ _`PATH`_ _`USER`_ _`COMMENT`_ _`STEAL`_``

## 描述

每当有人尝试对某个路径进行锁定时, 就会触发钩子 pre-lock. 它可以 用于禁止锁定, 或者根据策略来决定哪些用户可以锁定特定的路径. 如果钩子 发现路径已经被其他人锁定了, 它还可以决定用户是否可以 “窃取” 其他人的锁.

如果钩子 pre-lock 的退出值不为零, 锁定操作将被中止, 任何打印到 `stderr` 的信息都会返回给客户端.

钩子 pre-lock 可以口述锁令牌, 方法是把锁令牌打印到标准输出中, 这个锁令牌将会被分配给锁. 正因为如此, 在实现钩子 pre-lock 时, 注意 不要往标准输出中打印不必要的信息.

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p>如果钩子 pre-lock 往标准输出中打印了锁令牌, 那么钩子程序自己 要负责保证生成的锁令牌是 <span><em>独一无二</em></span> 的. 如果 不能生成独一无二的锁令牌, 那么将导致未定义的—很可能是不希望 看到的—行为.</p></td></tr></tbody></table>

## 输入参数

传递给钩子程序的命令行参数, 按照出现的顺序来说, 有:

1.  仓库路径
    
2.  将被锁定的路径
    
3.  尝试加锁的已认证的用户名
    
4.  由用户提供的锁注释
    
5.  `1` (如果用户试图窃取一个已存在的锁) 或 `0` (用户不想窃取锁)
    

## 常见用法

访问控制
