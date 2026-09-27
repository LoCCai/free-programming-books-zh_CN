This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn diff (di) — 显示两个版本号或路径之间的差异.

## 大纲

``svn diff [-c _`M`_ | -r _`N`_[:_`M`_]] [_`TARGET`_[@_`REV`_]...]``

``svn diff [-r _`N`_[:_`M`_]] --old=_`OLD-TGT`_[@_`OLDREV`_] [--new=_`NEW-TGT`_[@_`NEWREV`_]] [_`PATH`_...]``

``svn diff _`OLD-URL`_[@_`OLDREV`_] _`NEW-URL`_[@_`NEWREV`_]``

## 描述

显示两个路径之间的差异, 用户可以按照如下方式使用 **svn diff**:

-   直接执行 **`svn diff`** 来查看工作副本的 本地修改.
    
-   显示限定版本号为 _`REV`_ 时, _`TARGET`_ 在两个版本号之间的变化. _`TARGET`_ 可以全是工作副本路径或 _`URL`_. 如果 _`TARGET`_ 是工作副本路径, 则 _`N`_ 默认是 `BASE`, _`M`_ 默认是工作副本. 如果 _`TARGET`_ 是 _`URL`_, 则用户必须指定 _`N`_, 而 _`M`_ 默认 是 `HEAD`. 选项 ``-c _`M`_`` 等价于 ``-r _`N`_:_`M`_``, 其中 ``_`N`_ = _`M`_-1``; 而 ``-c -_`M`_`` 正好相反, 它等价于 ``-r _`M`_:_`N`_``, 其中 ``_`N`_ = _`M`_-1``.
    
-   显示限定版本号为 _`OLDREV`_ 的 _`OLD-TGT`_ 和限定版本号 _`NEWREV`_ 的 _`NEW-TGT`_ 之间的差异. 如果指定了相对于 _`OLD-TGT`_ 和 _`NEW-TGT`_ 的 _`PATH`_, 那么输出的就是这些路径的差异. _`OLD-TGT`_ 和 _`NEW-TGT`_ 可以是工作副本路径或 _`URL[@REV]`_. 如果没有指定 _`NEW-TGT`_, 那么它默认就是 _`OLD-TGT`_. ``-r _`N`_`` 使得 _`OLDREV`_ 默认是 _`N`_; ``-r _`N`_:_`M`_`` 使得 _`OLDREV`_ 默认是 _`N`_, _`NEWREV`_ 默认是 _`M`_.
    

**``svn diff _`OLD-URL`_[@_`OLDREV`_] _`NEW-URL`_[@_`NEWREV`_]``** 是 **``svn diff --old=_`OLD-URL`_[@_`OLDREV`_] --new=_`NEW-URL`_[@_`NEWREV`_]``** 的缩写形式.

**``svn diff -r _`N`_:_`M`_ URL``** 是 **``svn diff -r _`N`_:_`M`_ --old=_`URL`_ --new=_`URL`_``** 的缩写形式.

**``svn diff [-r _`N`_[:_`M`_]] _`URL1`_[@_`N`_] _`URL2`_[@_`M`_]``** 是 **``svn diff [-r _`N`_[:_`M`_]] --old=_`URL1`_ --new=_`URL2`_``** 的缩写形式.

如果 _`TARGET`_ 是一个 URL, 那么 _`N`_ 和 _`M`_ 可以 用选项 `--revision` (`-r`) 指定, 或者用以前介绍过的 “@” 记号.

如果 _`TARGET`_ 是一个工作副本路径, 那么 命令的默认行为 (没有指定选项 `--revision` (`-r`)) 就是显示 _`TARGET`_ 的 `BASE` 与工作副本之间的差异. 如果指定了选项 `--revision` (`-r`), 这意味着:

``--revision _`N`_:_`M`_``

服务器将比较 ``_`TARGET`_@_`N`_`` 和 ``_`TARGET`_@_`M`_``.

``--revision _`N`_``

客户端将比较 ``_`TARGET`_@_`N`_`` 和工作 副本.

如果使用了替代语法, 服务器将比较分别处于版本号 _`N`_ 和 _`M`_ 下 的 _`URL1`_ 和 _`URL2`_. 如果没有指定 _`N`_ 或 _`M`_, 将默认使用 `HEAD`.

默认情况下, **svn diff** 会忽略文件的祖先, 而只 比较文件的内容. 如果使用了选项 `--notice-ancestry`, 那么在比较版本号时就是考虑相关路径的祖先 (也就是说,如果你用 **svn diff** 比较了两个内容相同, 但祖先不同的文件, 你 将会看到文件的整个内容曾经被删除, 然后又被添加).

## 示例

比较 `BASE` 与工作副本 (**svn diff** 最常见的用途之一):

$ svn diff COMMITTERS 
Index: COMMITTERS
===================================================================
--- COMMITTERS	(revision 4404)
+++ COMMITTERS	(working copy)
…

查看 `COMMITTERS` 在版本号 9115 发生了哪些 变化:

$ svn diff -c 9115 COMMITTERS 
Index: COMMITTERS
===================================================================
--- COMMITTERS	(revision 3900)
+++ COMMITTERS	(working copy)
…

比较工作副本和更老的版本号:

$ svn diff -r 3900 COMMITTERS 
Index: COMMITTERS
===================================================================
--- COMMITTERS	(revision 3900)
+++ COMMITTERS	(working copy)
…

使用 “@” 语法比较版本号 3000 和 3500:

$ svn diff http://svn.collab.net/repos/svn/trunk/COMMITTERS@3000 \\
           http://svn.collab.net/repos/svn/trunk/COMMITTERS@3500
Index: COMMITTERS
===================================================================
--- COMMITTERS	(revision 3000)
+++ COMMITTERS	(revision 3500)
…

使用范围记号比较版本号 3000 与 3500 (这时候只需要一个 URL 参数):

$ svn diff -r 3000:3500 http://svn.collab.net/repos/svn/trunk/COMMITTERS
Index: COMMITTERS
===================================================================
--- COMMITTERS	(revision 3000)
+++ COMMITTERS	(revision 3500)
…

使用范围记号比较 `trunk` 内的所有文件在 版本号 3000 到 3500 之间的变化:

$ svn diff -r 3000:3500 http://svn.collab.net/repos/svn/trunk

使用范围记号比较 `trunk` 内的三个文件在版本 号 3000 到 3500 之间的变化:

$ svn diff -r 3000:3500 --old http://svn.collab.net/repos/svn/trunk \\
       COMMITTERS README HACKING

如果你已经有了一个工作副本, 就不用再输入冗长的 URL:

$ svn diff -r 3000:3500 COMMITTERS 
Index: COMMITTERS
===================================================================
--- COMMITTERS	(revision 3000)
+++ COMMITTERS	(revision 3500)
…

使用选项 `--diff-cmd` _`CMD`_ `--extensions` (`-x`) 向外部差异比较 工具传递参数:

$ svn diff --diff-cmd /usr/bin/diff -x "-i -b" COMMITTERS 
Index: COMMITTERS
===================================================================
0a1,2
> This is a test
> 
$

最后, 可以同时使用选项 `--xml` 和 `--summarize` 查看修改的 XML 描述, 修改的具体内容不 会显示出来:

$ svn diff --summarize --xml http://svn.red-bean.com/repos/test@r2 \\
           http://svn.red-bean.com/repos/test
<?xml version="1.0"?>
<diff>
<paths>
<path
   props="none"
   kind="file"
   item="modified">http://svn.red-bean.com/repos/test/sandwich.txt</path>
<path
   props="none"
   kind="file"
   item="deleted">http://svn.red-bean.com/repos/test/burrito.txt</path>
<path
   props="none"
   kind="dir"
   item="added">http://svn.red-bean.com/repos/test/snacks</path>
</paths>
</diff>
