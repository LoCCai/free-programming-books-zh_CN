This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn cleanup — 递归地清理工作副本

## 大纲

``svn cleanup [_`PATH`_...]``

## 描述

递归地清理工作副本, 删除所有的工作副本锁, 并恢复未完成的操作. 如果 用户看到了一个 `working copy locked` 错误, 就执行 **svn cleanup** 删除所有过期的锁, 然后工作副本就能恢复 到一个可用的状态.

假设由于某种原因 (例如用户输入或网络连接断开), **svn update** 在执行一个外部差异比较工具时报错退出, 那么我们可 以在执行 **svn cleanup** 时带上选项 `--diff3-cmd`, 此时 Subversion 在清理工作副本时就 会使用外部差异比较工具继续完成未完成的合并. 用户还可以用选项 `--config-dir` 为 **svn cleanup** 指定 任意的配置文件目录, 不过选项 `--config-dir` 和 `--diff3-cmd` 的使用频率应该会非常低.

## 示例

这里的例子不是很多, 因为 **svn cleanup** 不会产生 什么输出. 如果没有指定参数 _`PATH`_, 命令将会 使用当前目录 (“`.`”):

$ svn cleanup
$ svn cleanup /var/svn/working-copy
