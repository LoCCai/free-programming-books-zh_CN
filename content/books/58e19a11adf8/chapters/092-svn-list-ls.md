This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn list (ls) — 列出仓库中的目录项.

## 大纲

``svn list [_`TARGET`_[@_`REV`_]...]``

## 描述

列出仓库中的每一个 _`TARGET`_ 文件和 _`TARGET`_ 目录的内容. 如果 _`TARGET`_ 是一个工作副本路径, 命令将自动使用 工作路径的 URL.

_`TARGET`_ 的默认值是 “`.`”, 即当前工作副本目录在仓库中的 URL.

如果带上了选项 `--verbose` (`-v`), **svn list** 将额外显示项目的如下字段:

-   最近一次提交的版本号
    
-   最近一次提交的作者
    
-   如果文件被锁定了, 则显示字母 “O” (更多的细节 见前面的 [svn info](https://svnbook.red-bean.com/nightly/zh/svn.ref.svn.c.info.html "svn info")
    
-   大小 (以字节为单位)
    
-   最近一次提交的日期和时间
    

如果添加了选项 `--xml`, 输出将会是 XML 格式 (带有头部信息和封闭的文件元素, 除非还添加了选项 `--incremental`), 所有的信息都会被呈现出来, 但 此时不能再使用选项 `--verbose` (`-v`).

## 示例

如果你想查看仓库里有哪些文件, 但又不想检出工作副本, 那么 **svn list** 就显得很方便了:

$ svn list http://svn.red-bean.com/repos/test/support
README.txt
INSTALL
examples/
…

如果你想查看更多的信息, 就添加选项 `--verbose`, 就像 Unix 命令 **ls -l**:

$ svn list -v file:///var/svn/repos
     16 sally         28361 Jan 16 23:18 README.txt
     27 sally             0 Jan 18 15:27 INSTALL
     24 harry               Jan 18 11:27 examples/

添加选项 `--xml` 后, **svn list** 将以 XML 格式显示输出:

$ svn list --xml http://svn.red-bean.com/repos/test
<?xml version="1.0"?>
<lists>
<list
   path="http://svn.red-bean.com/repos/test">
<entry
   kind="dir">
<name>examples</name>
<size>0</size>
<commit
   revision="24">
<author>harry</author>
<date>2008-01-18T06:35:53.048870Z</date>
</commit>
</entry>
...
</list>
</lists>

更多的信息见 [“列出被版本控制的文件”一节](https://svnbook.red-bean.com/nightly/zh/svn.tour.history.html#svn.tour.history.browsing.list "列出被版本控制的文件").
