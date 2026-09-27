This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn blame (praise, annotate, ann) — 显示文件的每一行最近一次是被谁, 在什么时候被修改的.

## 大纲

``svn blame _`TARGET`_[@_`REV`_]...``

## 描述

显示文件的每一行最近一次被修改的作者与版本号信息, Subversion 在 每一行的开头都加上了最后最近一次修改该行的作者的用户名和版本号.

## 示例

如果用户想查看 `readme.txt` 的每一行的最近一次 修改都是谁, 在什么时候做的, 就执行:

$ svn blame http://svn.red-bean.com/repos/test/readme.txt
     3      sally This is a README file.
     5      harry Don't bother reading it.  The boss is a knucklehead.
     3      sally 
…

从 **svn blame** 的输出可以看到, `readme.txt` 最近一次是 Harry 在版本号 5 修改的, 用户还要理解 **svn blame** 对于修改的成立条件是很挑剔 的. 老板在责骂 Harry 之前, 应首先考虑 Harry 是不是只修改了这一行 里的某个字符, 甚至他只是删除了这一行里的一个多余的空格, 整句话一开始 可能并不是他写的. 为了不冤枉 Harry, 你需要认真地查看版本号 5 的日志和 Harry 所做的修改:

$ svn log -c 5 http://svn.red-bean.com/repos/test/readme.txt
------------------------------------------------------------------------
r5 | harry | 2008-05-29 07:26:12 -0600 (Thu, 29 May 2008) | 1 line

Commit the results of 'double-space-after-period.sh'.

------------------------------------------------------------------------
$ svn diff -c 5 http://svn.red-bean.com/repos/test/readme.txt
Index: http://svn.red-bean.com/repos/test/readme.txt
===================================================================
--- http://svn.red-bean.com/repos/test/readme.txt	(revision 4)
+++ http://svn.red-bean.com/repos/test/readme.txt	(revision 5)
@@ -1,5 +1,5 @@
 This is a README file.
-Don't bother reading it. The boss is a knucklehead.
+Don't bother reading it.  The boss is a knucklehead.
  
 INSTRUCTIONS
 ============
$

从版本号 5 的修改来看, 结果已经很清晰了, Harry 只是去掉了一个 多余的空格. 幸运的是, 选项 `--extensions` (`-x`) 可以帮助用户找出最近一次针对该行的 _有意义的_ 修改. 例如下面的例子在显示最近一 次修改时忽略了空白字符的变化:

$ svn blame -x -b http://svn.red-bean.com/repos/test/readme.txt
     3      sally This is a README file.
     4       jess Don't bother reading it.  The boss is a knucklehead.
     3      sally 
…

如果带上了选项 `--xml`, 用户就可以得到 XML 格式 的输出, 但不会出现行本身的内容:

$ svn blame --xml http://svn.red-bean.com/repos/test/readme.txt
<?xml version="1.0"?>
<blame>
<target
   path="readme.txt">
<entry
   line-number="1">
<commit
   revision="3">
<author>sally</author>
<date>2008-05-25T19:12:31.428953Z</date>
</commit>
</entry>
<entry
   line-number="2">
<commit
   revision="5">
<author>harry</author>
<date>2008-05-29T13:26:12.293121Z</date>
</commit>
</entry>
<entry
   line-number="3">
…
</entry>
</target>
</blame>
$
