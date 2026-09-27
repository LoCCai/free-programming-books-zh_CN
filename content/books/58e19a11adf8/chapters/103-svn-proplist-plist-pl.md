This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn proplist (plist, pl) — 列出所有的属性.

## 大纲

``svn proplist [_`TARGET`_[@_`REV`_]...]``

``svn proplist --revprop -r _`REV`_ [_`TARGET`_]``

## 描述

列出文件, 目录或版本号上的所有属性. 命令的第一种形式为工作副本里 的项目列出属性; 第二种形式列出版本号上的属性 (可选参数 _`TARGET`_ 指定仓库的 URL).

## 示例

显示工作副本中中的某个文件上已经设置了哪些属性:

$ svn proplist foo.c
Properties on 'foo.c':
  svn:mime-type
  svn:keywords
  owner

加上选项 `--verbose` (`-v`) 后, **svn proplist** 不仅会打印属性名, 还会打印属性值:

$ svn proplist -v foo.c
Properties on 'foo.c':
  svn:mime-type
    text/plain
  svn:keywords
    Author Date Rev
  owner
    sally

为了列出继承而来的属性, 可以加上选项 `--show-inherited-props`:

$ svn proplist --show-inherited-props foo.c
Inherited properties on 'foo.c',
from 'http://svn.example.com/repos':
  svn:auto-props
  svn:global-ignores
Inherited properties on 'foo.c',
from '/home/theob/svn/working-copies/baz-wc':
  svn:auto-props

最后, 为了让 **svn proplist** 以 XML 格式显示输出, 可以加上选项 `--xml`:

$ svn proplist --xml 
<?xml version="1.0"?>
<properties>
<target
   path=".">
<property
   name="svn:ignore"/>
</target>
</properties>
