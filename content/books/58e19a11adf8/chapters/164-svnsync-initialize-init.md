This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnsync initialize (init) — 初始化一个镜像仓库.

## 大纲

``svnsync initialize _`MIRROR_URL`_ _`SOURCE_URL`_``

## 描述

**svnsync initialize** 先检查目标仓库是否符合 作为镜像仓库的基本要求, 然后把初始的管理信息记录到镜像仓库中, 初始的管理信息把镜像仓库与源仓库 (由参数 _`SOURCE_URL`_ 指定) 关联起来. 这是针对 镜像仓库的第一步操作.

一般情况下, _`SOURCE_URL`_ 是源仓库 根目录的 URL. Subversion 1.5 及更新的版本允许用户针对仓库的子目录 进行同步—方法是把 _`SOURCE_URL`_ 写成欲同步的仓库子目录的 URL.

默认情况下, 上面提到的作为镜像仓库的基本要求指的是仓库 允许修改版本号属性, 并且不含有任何版本历史. 然而, 从 Subversion 1.7 开始, 用户可以通过选项 `--allow-non-empty` 来 允许含有版本历史的仓库作为镜像仓库. 但是用户不应该习惯性地使用该 选项 (因为它同时还会关掉保护机制), 而是只在这样一种情景下使用: 初始化一个已有的仓库副本, 用它作为源仓库的镜像仓库. 如果仓库已经 包含了大量的版本历史, 那么直接把它作为镜像仓库将会非常方便. 为了 创建一个镜像仓库, 比较普通的做法是先初始化一个空仓库, 然后再同步 全部的版本历史, 但是更好的做法是先复制出一个仓库副本 (例如使用命令 **svnadmin hotcopy**), 再用 **svnsync initialize --allow-non-empty** 把仓库副本 初始化成一个镜像仓库, 管理员将会看到后面这种做法会快得多.

## 示例

如果目标仓库禁止修改版本号属性, **svnsync initialize** 将会失败:

$ svnsync initialize file:///var/svn/repos-mirror \\
                     http://svn.example.com/repos
svnsync: Repository has not been enabled to accept revision propchanges;
ask the administrator to create a pre-revprop-change hook
$

把一个仓库初始化镜像仓库, 该仓库已经通过钩子脚本 pre-revprop-change 来允许修改版本号属性:

$ svnsync initialize file:///var/svn/repos-mirror \\
                     http://svn.example.com/repos
Copied properties for revision 0.
$
