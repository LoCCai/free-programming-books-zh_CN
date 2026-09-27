This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnsync synchronize (sync) — 把源仓库中未同步过的版本号同步到镜像仓库中.

## 大纲

``svnsync synchronize _`DEST_URL`_ [_`SOURCE_URL`_]``

## 描述

命令 **svnsync syncronize** 负责镜像操作的大 部分工作. 命令首先询问镜像仓库已经复制了哪些版本号, 然后再从源 仓库复制那些还未被同步的版本号.

**svnsync synchronize** 可以被任意地中止或重启.

如果指定了 _`SOURCE_URL`_, **svnsync** 将把它作为源仓库的 URL. 通常来说, _`SOURCE_URL`_ 和命令 **svnsync initialize** 中的源仓库 URL 是相同的. 如果省略了 _`SOURCE_URL`_, **svnsync** 将通过询问镜像仓库来确定源仓库的 URL.

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p>我们强烈建议在命令行上显式地指定源仓库的 URL, 尤其是当不受 信任的用户对版本号 0 的版本号属性具有写权限时, 这是因为 <span><strong>svnsync</strong></span> 通过版本号 0 的版本号属性来协调很多 工作.</p></td></tr></tbody></table>

## 示例

把源仓库中未同步过的版本号同步到镜像仓库中:

$ svnsync synchronize file:///var/svn/repos-mirror \\
                      http://svn.example.com/repos
Committed revision 1.
Copied properties for revision 1.
Committed revision 2.
Copied properties for revision 2.
Committed revision 3.
Copied properties for revision 3.
…
Committed revision 45.
Copied properties for revision 45.
Committed revision 46.
Copied properties for revision 46.
Committed revision 47.
Copied properties for revision 47.
$
