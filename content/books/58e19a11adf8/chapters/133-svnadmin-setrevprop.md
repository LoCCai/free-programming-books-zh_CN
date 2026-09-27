This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin setrevprop — 在版本号上设置一个属性.

## 大纲

``svnadmin setrevprop _`REPOS_PATH`_ -r _`REVISION`_ _`NAME`_ _`FILE`_``

## 描述

把版本号 _`REVISION`_ 的属性 _`NAME`_ 的值设置成文件 `FILE` 的内容. 如果想要触发与版本号属性相关的 钩子脚本 (例如在钩子 post-revprop-change 里发送一封邮件, 通知大家 有属性被修改了).

## 示例

下面的例子把版本号属性 `repository-photo` 的值设置 成文件 `sandwich.png` 的内容:

$ svnadmin setrevprop /var/svn/repos -r 0 repository-photo sandwich.png

可以看到, **svnadmin setrevprop** 在执行成功时不会 输出任何信息.
