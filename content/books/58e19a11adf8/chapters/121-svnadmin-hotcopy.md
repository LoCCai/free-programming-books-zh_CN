This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svnadmin hotcopy — 对仓库进行在线备份.

## 大纲

``svnadmin hotcopy _`REPOS_PATH`_ _`NEW_REPOS_PATH`_``

## 描述

**svnadmin hotcopy** 为仓库生成一份 “在线” 副本, 包括所有的钩子, 配置文件和数据库文件. 你可以 在任何时候执行这个命令, 而不用担心是否还有其他进程在访问仓库.

在 Subversion 1.8 之前, **svnadmin hotcopy** 总是 生成一份完整的仓库在线副本. 从 Subversion 1.8 开始, **svnadmin hotcopy** 开始支持增量备份. 添加选项 `--incremental` 后, Subversion 将只复制新的版本号和 大小或时间戳发生变化的版本号. 目标仓库的 UUID 和源仓库的 UUID 必须 完全相同. 增量的在线备份只支持使用 FSFS 作为后端存储的仓库.

如果添加了选项 `--clean-logs`, **svnadmin hotcopy** 在执行完在线备份后, 将会删除源仓库中不再使用的 Berkeley DB 日志.

## 选项

<table summary="Warning"><tbody><tr><td rowspan="2"><img alt="[警告]" src="https://svnbook.red-bean.com/nightly/zh/images/warning.png"></td><th>警告</th></tr><tr><td><p>在 <a href="https://svnbook.red-bean.com/nightly/zh/svn.berkeleydb.limitations.html#svn.berkeleydb.limitations.architectural" title="体系结构上的限制">“体系结构上的限制”一节</a> 提到, 在线备份的, 以 Berkeley DB 作为后端存储的仓库在不同的操作系统之间 是不可移植的, 在大小端不同的系统之间也不可移植.</p></td></tr></tbody></table>
