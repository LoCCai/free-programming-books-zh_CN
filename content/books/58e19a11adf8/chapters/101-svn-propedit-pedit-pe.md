This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 大纲

``svn propedit _`PROPNAME`_ _`TARGET`_...``

``svn propedit _`PROPNAME`_ --revprop -r _`REV`_ [_`TARGET`_]``

## 描述

在编辑器中编辑一个或多个项目属性. 命令的第一种形式在工作副本中编辑 版本化的属性; 第二种形式在仓库的版本号上编辑非版本化的属性 (可选参数 _`TARGET`_ 指定仓库的 URL).

## 示例

**svn propedit** 非常适合编辑属性值比较复杂的属性.

$ svn propedit svn:keywords foo.c 

    # svn will open in your favorite text editor a temporary file
    # containing the current contents of the svn:keywords property.  You
    # can add multiple values to a property easily here by entering one
    # value per line.  When you save the temporary file and exit,
    # Subversion will re-read the temporary file and use its updated
    # contents as the new value of the property.

Set new value for property 'svn:keywords' on 'foo.c'
$
