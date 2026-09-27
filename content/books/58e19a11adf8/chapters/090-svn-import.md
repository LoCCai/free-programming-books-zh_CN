This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn import — 把未被版本控制的文件或目录树提交到仓库中.

## 大纲

``svn import [_`PATH`_] _`URL`_``

## 描述

递归地把 _`PATH`_ 提交到 _`URL`_, 如果省略了 _`PATH`_, 将使用 “`.`”. 在必要时会在仓库中创建父目录. 即使添加了选项 `--force`, 无法被版本控制的文件 (例如 设备文件和命名管道) 也会被忽略.

## 示例

下面的命令把本地目录 `myproj` 导入到仓库的 `trunk/misc` 目录中. 在导入前不用事先创建 `trunk/misc`—**svn import** 会自动创建所需的目录.

$ svn import -m "New import" myproj \\
             http://svn.red-bean.com/repos/trunk/misc
Adding         myproj/sample.txt
…
Transmitting file data .........
Committed revision 16.

需要注意的是上面的命令 _不会_ 在仓库中创建目录 `myproj`, 但是如果你希望创建该目录, 就把 `myproj` 作为 URL 的最后一个分量:

$ svn import -m "New import" myproj \\
            http://svn.red-bean.com/repos/trunk/misc/myproj
Adding         myproj/sample.txt
…
Transmitting file data .........
Committed revision 16.

导入完成后, 被导入的本地目录 _不会_ 变成工作 副本, 用户还是需要使用 **svn checkout** 检出工作副本.
