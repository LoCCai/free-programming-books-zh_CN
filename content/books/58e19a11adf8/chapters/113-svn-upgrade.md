This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn upgrade — 更新工作副本的元数据格式.

## 大纲

``svn upgrade [_`PATH`_...]``

## 描述

随着新版 Subversion 的发布, 为了适应新版所添加的特性或为了修复 问题, 工作副本的元数据格式可能会发生变化. 在 Subversion 1.7 之前, 新版 Subversion 在首次使用旧版 Subversion 所创建的工作副本时, 将会 自动升级工作副本的元数据格式. 但是从 Subversion 1.7 开始, 用户必须 通过执行命令 **svn upgrade** 来显式地请求 Subversion 去更新工作副本的元数据格式.

## 示例

如果你试图在一个版本较旧的工作副本中使用 Subversion 1.7, Subversion 将会报错:

$ svn status
svn: E155036: Please see the 'svn upgrade' command
svn: E155036: Working copy '/home/sally/project' is too old (format 10, create
d by Subversion 1.6)
$

这时候就需要执行 **svn upgrade** 把工作副本的元数据 格式升级到当前 Subversion 所支持的格式:

$ svn upgrade
Upgraded '.'
Upgraded 'A'
Upgraded 'A/B'
Upgraded 'A/B/E'
Upgraded 'A/B/F'
Upgraded 'A/C'
Upgraded 'A/D'
Upgraded 'A/D/G'
Upgraded 'A/D/H'
$ svn status
D       A/B/E/alpha
M       A/D/gamma
A       A/newfile
$

注意, **svn upgrade** 会保留工作副本的本地修改, 即使这些修改是由旧版 Subversion 引入的 (例如 **svn mv**).

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p>和过去自动升级工作副本元数据的行为相比, 显式地升级工作副本 元数据后, 旧的 Subversion 将不再支持升级后的工作副本.</p></td></tr></tbody></table>
