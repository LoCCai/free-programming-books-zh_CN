This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 大纲

``svn mergeinfo _`SOURCE_URL`_[@_`REV`_] [_`TARGET`_[@_`REV`_]]``

## 描述

查询 _`SOURCE-URL`_ 和 _`TARGET`_ 之间与合并 (或潜在的合并) 相关的 信息. 如果没有添加选项 `--show-revs`, 命令会把已合并 的版本号以图形化的方式打印出来; 否则的话, 命令将会列出已合并或可以 合并 (但还未合并) 的版本号.

## 示例

以图形化的方式总结从一个分支合并到另一个分支上的修改:

$ svn mergeinfo ^/trunk feature-branch
    youngest  last               repos.
    common    full     tip of    path of
    ancestor  merge    branch    branch

    11        16       33
    |         |        |
  -------| |------------         trunk
     \\         \\
      \\         \\
       --| |------------         feature-branch
                       |
                       33

列出某个分支上已经合并到另一个分支的所有版本号:

$ svn mergeinfo ^/trunk feature-branch --show-revs merged
r15
r16

列出某个分支上可以合并 (但还未合并) 到另一个分支的版本号:

$ svn mergeinfo ^/trunk feature-branch --show-revs eligible
r28
r30
