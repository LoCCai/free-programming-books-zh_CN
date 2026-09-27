This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

pre-commit — 提交即将完成的通知.

## 大纲

``pre-commit _`REPOS-PATH`_ _`TXN-NAME`_``

## 描述

钩子 pre-commit 在提交事务即将生成一个新的版本号之前被调用. 它的典型用法是禁止内容不符合要求的提交 (例如你的公司可能要求所有 的提交日志消息都要包含来自问题跟踪系统的单号, 或者要求日志消息不 能为空).

如果钩子 pre-commit 的退出值不为零, 提交过程就会中止, 提交事务 也会被销毁, 任何打印到 `stderr` 的信息都会返回 给客户端.

## 输入参数

传递给钩子程序的命令行参数, 按照出现的顺序来说, 有:

1.  仓库路径
    
2.  提交事务名
    

此外, Subversion 还会把客户端可能提供的所有锁令牌通过标准输入 `stdin` 传递给钩子程序. 如果提供了锁令牌, 它们 的格式将会是这样: 首先是一行 `LOCK-TOKENS`, 接下 来是锁令牌, 每个锁令牌占据单独的一行. 每个锁令牌行都包含了以下这 信息: 与锁有关的仓库文件系统路径, 这些路径已经是经过转码后的 URI; 然后是管道符 (`|`); 最后是锁令牌字符串.

## 常见用法

控制和检查修改
