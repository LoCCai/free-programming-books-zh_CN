This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnsync info — 打印目标仓库中, 与同步有关的信息.

## 大纲

``svnsync info _`DEST_URL`_``

## 描述

打印的信息有源仓库的 URL, 源仓库的 UUID, 以及最后一个被同步的 版本号.

## 示例

打印镜像仓库中, 与同步有关的信息:

$ svnsync info file:///var/svn/repos-mirror
Source URL: http://svn.example.com/repos
Source Repository UUID: e7fe1b91-8cd5-0310-98dd-2f12e793c5e8
Last Merged Revision: 47
$
