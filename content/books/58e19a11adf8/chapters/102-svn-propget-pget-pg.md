This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn propget (pget, pg) — 打印属性的值.

## 大纲

``svn propget _`PROPNAME`_ [_`TARGET`_[@_`REV`_]...]``

``svn propget _`PROPNAME`_ --revprop -r _`REV`_ [_`URL`_]``

## 描述

打印文件, 目录或版本号上的属性值. 命令的第一种形式打印工作副本 里的一个或多个项目的属性值; 第二种形式打印版本号上的属性值. 关于属性 的更多信息, 见 [“属性”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.props.html "属性").

## 示例

查看工作副本中某个文件的属性值:

$ svn propget svn:keywords foo.c
Author
Date
Rev

查看一个版本号的属性值:

$ svn propget svn:log --revprop -r 20 
Began journal.

为了获得更加结构化的输出, 可以加上选项 `--verbose` (`-v`):

$ svn propget svn:keywords foo.c --verbose
Properties on 'foo.c':
  svn:keywords
    Author
    Date
    Rev

为了查看继承而来的属性, 可以加上选项 `--show-inherited-props`:

$ svn pg svn:global-ignores --verbose --show-inherited-props ^/branches/1.x
Inherited properties on 'http://svn.example.com/repos/branches/1.x',
from 'http://svn.example.com/repos':
  svn:global-ignores
    \*.diff
    \*.patch

默认情况下, **svn propget** 在打印完属性值后会额外 打印一个换行符, 在大多数情况下这是一种比较合理的行为, 但有时候用户 可能想精确地打印属性值, 比如属性值根本就不是纯文本, 例如 JPEG 缩略 图. 为了禁止打印额外的换行符, 可以加上选项 `--strict`.

最后, 为了让 **svn propget** 以 XML 格式显示输出, 可以加上选项 `--xml`:

$ svn propget --xml svn:ignore .
<?xml version="1.0"?>
<properties>
<target
   path="">
<property
   name="svn:ignore">\*.o
</property>
</target>
</properties>
