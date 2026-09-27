This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn propset (pset, ps) — 把文件, 目录或版本号上的属性 _`PROPNAME`_ 的值设置成 _`PROPVAL`_.

## 大纲

``svn propset _`PROPNAME`_ [_`PROPVAL`_ | -F _`VALFILE`_] _`PATH`_...``

``svn propset _`PROPNAME`_ --revprop -r _`REV`_ [_`PROPVAL`_ | -F _`VALFILE`_] [_`TARGET`_]``

## 描述

把文件, 目录或版本号上的属性 _`PROPNAME`_ 的值设置成 _`PROPVAL`_. 命令的第一种形式在工作 副本的项目上设置或修改一个属性; 第二种形式为版本号设置或修改一个属性 (可选参数 _`TARGET`_ 指定仓库的 URL).

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>Subversion 预定义了很多 <span>“<span>特殊</span>”</span> 属性, 见 <a href="https://svnbook.red-bean.com/nightly/zh/svn.advanced.props.html#svn.advanced.props.ref" title="Subversion 的保留属性">“Subversion 的保留属性”一节</a>.</p></td></tr></tbody></table>

## 示例

为一个文件设置 MIME 类型:

$ svn propset svn:mime-type image/jpeg foo.jpg 
property 'svn:mime-type' set on 'foo.jpg'

在 Unix 系统中, 如果你希望文件具有可执行权限, 可以这样做:

$ svn propset svn:executable ON somescript
property 'svn:executable' set on 'somescript'

为了方便协作, 你可能需要设置自定义属性:

$ svn propset owner sally foo.c
property 'owner' set on 'foo.c'

如果你不小心把一个版本号的日志写错了, 现在想把它改回来, 可以这样做:

$ svn propset --revprop -r 25 svn:log "Journaled about trip to New York."
property 'svn:log' set on repository revision '25'

如果你没有工作副本, 可以使用仓库的 URL:

$ svn propset --revprop -r 26 svn:log "Document nap." \\
              http://svn.red-bean.com/repos
property 'svn:log' set on repository revision '25'

最后, 还可以让 **svn propset** 从一个文件中获取属性 值, 可以利用这个特性把属性设置成二进制内容:

$ svn propset owner-pic -F sally.jpg moo.c 
property 'owner-pic' set on 'moo.c'

<table summary="Note"><tbody><tr><td rowspan="2"><img alt="[注意]" src="https://svnbook.red-bean.com/nightly/zh/images/note.png"></td><th>注意</th></tr><tr><td><p>默认情况下, Subversion 禁止用户修改版本号的属性, 为了允许修改, 仓库管理员必须通过创建钩子脚本 pre-revprop-change 来显式地允许 用户修改版本号的属性. 关于钩子脚本的更多信息, 见 <a href="https://svnbook.red-bean.com/nightly/zh/svn.reposadmin.create.html#svn.reposadmin.hooks" title="实现仓库钩子">“实现仓库钩子”一节</a>.</p></td></tr></tbody></table>
