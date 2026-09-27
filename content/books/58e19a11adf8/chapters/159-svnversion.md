This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnversion — 输出工作副本的本地版本号总结信息.

## 大纲

``svnversion [_`OPTIONS`_] [_`WC_PATH`_ [_`TRAIL_URL`_]]``

## 描述

**svnversion** 用于输出工作副本的本地版本号总结 信息.

在程序的编译过程中, 人们经常用它来生成程序的版本号 (指的是软件 的版本号, 而不是 Subversion 提交日志的版本号).

参数 _`TRAIL_URL`_ 指的是 URL 中处于末尾 的分量, 如果指定了该参数, 它将被用于判断 _`WC_PATH`_ 是否是切换过的 (对于判断 _`WC_PATH`_ 中的路径是否是切换过的, 不依赖 于参数 _`TRAIL_URL`_).

如果没有显式指定 _`WC_PATH`_, 将默认使用当 前工作目录, 而且此时不能再指定参数 _`TRAIL_URL`_.

## 选项

和 **svnserve** 一样, **svnversion** 没有子命令, 只有选项:

`--no-newline` (`-n`)

不要打印换行符.

`--committed` (`-c`)

使用最近一次产生修改的版本号, 而不是当前版本号 (当前版本号是 本地可获得的, 值最大的版本号).

`--help` (`-h`)

输出帮助信息.

`--quiet` (`-q`)

只输出必要的信息.

`--version`

输出 **svnversion** 的版本信息.

## 示例

如果工作副本中每个路径的版本号都相同 (例如刚执行完 **svn update**), **svnversion** 就会输出这个 共同的版本号:

$ svnversion
4168

为了判断工作副本是否是切换过的, 就加上参数 _`TRAIL_URL`_, 注意这时候必须显式地指定 _`WC_PATH`_:

$ svnversion . /var/svn/trunk
4168

对于版本号混合的工作副本, 将会输出版本号的范围:

$ svnversion
4123:4168

如果工作副本含有本地修改, 就会在末尾添加字符 '`M`':

$ svnversion
4168M

如果工作副本是切换过的, 就会在末尾添加字符 '`S`':

$ svnversion
4168S

**svnversion** 还会指出工作副本是否是稀疏的 (见 [“稀疏目录”一节](https://svnbook.red-bean.com/nightly/zh/svn.advanced.sparsedirs.html "稀疏目录")), 方法是在末尾添加 字符 '`P`':

$ svnversion
4168P

如果有一个工作副本是稀疏的, 切换过的, 含有本地修改和混合的 版本号, 则 **svnversion** 的输出将会是:

$ svnversion
4123:4168MSP
