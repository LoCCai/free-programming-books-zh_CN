This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn add — 添加文件, 目录或符号链接.

## 大纲

``svn add _`PATH`_...``

## 描述

计划将文件, 目录或符号链接添加到仓库中, 在下次提交时, 它们就 会被正式地上传并添加到仓库中. 如果用户已经添加了某些文件, 但后面又不 想要这些文件了, 可以使用 **svn rever** 取消未提交的 新增.

## 示例

往工作副本中添加一个新文件:

$ svn add foo.c 
A         foo.c

添加目录时, **svn add** 的默认行为是递归的:

$ svn add testdir
A         testdir
A         testdir/a
A         testdir/b
A         testdir/c
A         testdir/d

用户可以只添加目录, 而不添加目录里的子文件:

$ svn add --depth=empty otherdir
A         otherdir

如果用户试图添加一个已经被版本控制了的文件, 那么 **svn add** 将会报错. 这种行为会影响用户执行这种操作: 递归已经 被版本控制了的目录, 添加目录中所有未被版本控制的子文件. 为了迫使 Subversion 递归已被版本控制的目录, 需要加上选项 `--force`:

$ svn add versioned-dir
svn: warning: W150002: '/home/cmpilato/projects/subversion/site' is already un\\
der version control
$ svn add versioned-dir --force
A         versioned-dir/foo.c
A         versioned-dir/somedir/bar.c
A  (bin)  versioned-dir/otherdir/docs/baz.doc
…
