This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svndumpfilter exclude — 从转储流中删除含有指定前缀的路径.

## 大纲

``svndumpfilter exclude _`PATH_PREFIX`_...``

## 描述

从转储流中删除以 _`PATH_PREFIX`_ 开始的 路径. 可以指定多个 _`PATH_PREFIX`_.

## 示例

假设我们有了一个仓库的转储文件, 里面包含了与野餐有关的各种目录, 但是人们不喜欢吃三明治 (sandwiches), 因此我们打算删除以 `sandwiches` 开始的路径:

$ svndumpfilter exclude sandwiches < dumpfile > filtered-dumpfile
Excluding prefixes:
   '/sandwiches'

Revision 0 committed as 0.
Revision 1 committed as 1.
Revision 2 committed as 2.
Revision 3 committed as 3.
Revision 4 committed as 4.

Dropped 1 node(s):
   '/sandwiches'
$

从 Subversion 1.7 开始, **svndumpfilter** 不仅可以把 _`PATH_PREFIX`_ 看成显式的子字符串, 还能看成是文件通配符模式. 例如, 如果用户想排除所有以 `.OLD` 结尾的路径, 则可以写成:

$ svndumpfilter exclude --pattern "\*.OLD" < dumpfile > filtered-dumpfile
Excluding prefix patterns:
   '/\*.OLD'

Revision 0 committed as 0.
Revision 1 committed as 1.
Revision 2 committed as 2.
Revision 3 committed as 3.
Revision 4 committed as 4.

Dropped 3 node(s):
   '/condiments/salt.OLD'
   '/condiments/pepper.OLD'
   '/toppings/cheese.OLD'
$
