This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnrdump load

## 大纲

``svnrdump load _`DEST_URL`_``

## 描述

从标准输入读取转储流, 并加载到位于 _`DEST_URL`_ 的仓库中.

## 示例

在转储一个本地仓库的同时, 用 **svnrdump load** 把转储流加载到一个远程仓库中:

$ svnadmin dump -q /var/svn/repos/new-project | \\
      svnrdump load http://svn.example.com/repos/new-project
\* Loaded revision 0
\* Loaded revision 1.
\* Loaded revision 2.
…

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>为了保证 <span><strong>svnrdump load</strong></span> 能正常运行, 要求 目标仓库允许修改版本号属性, 这要通过钩子脚本 pre-revprop-change 加以实现, 关于钩子脚本 pre-revprop-change 的更多信息, 见 <a href="https://svnbook.red-bean.com/nightly/zh/svn.ref.reposhooks.pre-revprop-change.html" title="pre-revprop-change">pre-revprop-change</a>.</p></td></tr></tbody></table>
