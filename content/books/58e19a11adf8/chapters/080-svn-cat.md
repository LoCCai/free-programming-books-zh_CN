This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn cat — 输出指定的文件的内容.

## 大纲

``svn cat _`TARGET`_[@_`REV`_]...``

## 描述

输出指定的文件的内容. 如果只是想看目录包含了哪些文件, 见本章后面的 **svn list**.

## 示例

如果你想查看仓库里的 `readme.txt` 文件, 但又不 想把它检出, 可以这样做:

$ svn cat http://svn.red-bean.com/repos/test/readme.txt
This is a README file.
Don't bother reading it.  The boss is a knucklehead.
 
INSTRUCTIONS
============

Step 1:  Do this.

Step 2:  Do that.
$

还可以查看文件在特定版本号下的内容:

$ svn cat -r 3 http://svn.red-bean.com/repos/test/readme.txt
This is a README file.
 
INSTRUCTIONS
============

Step 1:  Do this.

Step 2:  Do that.
$

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>你可能很自然地想到用 <span><strong>svn cat</strong></span> 查看工作副本中的 文件, 但是要注意的是 <span><strong>svn cat</strong></span> 用在工作副本文件上的 默认限定版本号是 <code>BASE</code>, 它是文件未修改时的基础版本 号, 所以如果在 <span><strong>svn cat</strong></span> 的输出中看不到本地修改时请 不会感到惊讶.</p></td></tr></tbody></table>

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>如果工作副本已经过期了 (或者含有本地修改), 而你想查看文件在 版本号 <code>HEAD</code> 的内容, 就加上选项 <code>--revision</code> (<code>-r</code>): <strong><code>svn cat -r HEAD <em><code>FILENAME</code></em></code></strong></p></td></tr></tbody></table>
