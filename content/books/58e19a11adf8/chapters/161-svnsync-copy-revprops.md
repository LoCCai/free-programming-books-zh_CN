This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnsync copy-revprops — 把源仓库中的某个特定版本号或版本号范围上的所有版本号属性都 复制到镜像仓库中.

## 大纲

``svnsync copy-revprops _`DEST_URL`_ [_`SOURCE_URL`_]``

``svnsync copy-revprops _`DEST_URL`_ _`REV`_[:_`REV2`_]``

## 描述

由于 Subversion 的版本号属性可以在任意时刻发生变化, 因此在把版本 号属性复制到镜像仓库后, 源仓库中的版本号属性可能又发生了变化. 由于 **svnsync synchronize** 只能处理还未被同步的版本号 范围, 它不会注意到范围之外的版本号属性是否发生了变化, 这就造成了源 仓库和镜像仓库在版本号属性上出现了不一致. 命令 **svnsync copy-revprops** 正是这一问题的解决办法, 可以用它重新同步 某个版本号或版本号范围上的版本号属性.

如果指定了 _`SOURCE_URL`_, 它将作为 **svnsync** 的源仓库. 通常来说, _`SOURCE_URL`_ 和命令 **svnsync initialize** 中的源仓库 URL 是相同的. 如果省略了 _`SOURCE_URL`_, **svnsync** 将通过询问镜像仓库来确定源仓库的 URL.

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p>我们强烈建议在命令行上显式地指定源仓库的 URL, 尤其是当不受 信任的用户对版本号 0 的版本号属性具有写权限时, 这是因为 <span><strong>svnsync</strong></span> 通过版本号 0 的版本号属性来协调很多 工作.</p></td></tr></tbody></table>

## 示例

重新同步版本号 6 的版本号属性:

$ svnsync copy-revprops -r 6 file:///var/svn/repos-mirror \\
                             http://svn.example.com/repos
Copied properties for revision 6.
$
