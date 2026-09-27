This text is a work in progress—highly subject to change—and may not accurately describe any released version of the Apache™ Subversion® software. Bookmarking or otherwise referring others to this page is probably not such a smart idea. Please visit [http://www.svnbook.com/](http://www.svnbook.com/) for stable versions of this book.

## 名称

svn merge — 把两个源的差异应用到工作副本上.

## 大纲

``svn merge _`SOURCE`_[@_`REV`_] [_`TARGET_WCPATH`_]``

``svn merge [-c _`M`_[,_`N`_...] | -r _`N`_:_`M`_ ...] _`SOURCE`_[@_`REV`_] [_`TARGET_WCPATH`_]``

``svn merge _`SOURCE1`_[@_`N`_] _`SOURCE2`_[@_`M`_] [_`TARGET_WCPATH`_]``

## 描述

在上面的三种形式中, _`TARGET_WCPATH`_ 都是一个接收差异的工作副本路径. 如果省略了 _`TARGET_WCPATH`_, 接收差异的将是当前工作目录, 如果源的最后一个分量和当前工作目录内的某个文件名相同, 则接收差异的将 会是这个文件.

在前两种形式中, _`SOURCE`_ 是一个 URL 或 工作副本路径 (此时 Subversion 将自动使用工作副本路径对应的 URL). 如果没有指定限定版本号 _`REV`_, 就默认使用 `HEAD`. 对于第三种形式, 相同的规则同样适用于 _`SOURCE1`_, _`SOURCE2`_, _`M`_ 和 _`N`_, 唯一的 不同点是如果 _`SOURCE1`_ 或 _`SOURCE2`_ 是一个工作副本路径, 则必须 _显式地_ 指定限定版本号.

-   自动合并
    
    第一种形式称为 “自动合并”, 它用于执行 “同步” 合并和 “再整合” 合并. “同步” 合并把祖先分支 (_`SOURCE`_) 中可以合并的修改合并到 目标分支 (_`TARGET_WCPATH`_) 上. “可以合并的” 修改指的是那些还没有从 _`SOURCE`_ 合并到 _`TARGET_WCPATH`_ 的修改, 见 [“保持分支同步”一节](https://svnbook.red-bean.com/nightly/zh/svn.branchmerge.basicmerging.html#svn.branchmerge.basicmerging.stayinsync "保持分支同步"). “再整合” 合并是把特性分支的修改 (_`SOURCE`_) 合并到祖先分支 (_`TARGET_WCPATH`_) 上, 见 [“重新整合分支”一节](https://svnbook.red-bean.com/nightly/zh/svn.branchmerge.basicmerging.html#svn.branchmerge.basicmerging.reintegrate "重新整合分支") 和 [“特性分支”一节](https://svnbook.red-bean.com/nightly/zh/svn.branchmerge.commonpatterns.html#svn.branchmerge.commonpatterns.feature "特性分支").
    
-   精选合并
    
    第二种形式称为 “精选” 合并, 用于合并特定的修改, 修改来自 _`SOURCE`_ (限定版本号为 _`REV`_) 的版本号 _`N`_ 和 _`M`_ 的 比较. 更多的信息见 [“精选”一节](https://svnbook.red-bean.com/nightly/zh/svn.branchmerge.advanced.html#svn.branchmerge.cherrypicking "精选").
    
    <table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p><code>-c</code> 或 <code>-r</code> 可以出现多次, 也可以混合正向和反向的版本号范围—在合并开始前, Subversion 自动地把版本号范围压缩成最简的表示形式 (这可能会导致空合并或 冲突, 从而导致合并中止).</p></td></tr></tbody></table>
    
-   二路 URL 合并
    
    第三种形式称为 “二路 URL 合并”, 限定版本号为 _`N`_ 的 _`SOURCE1`_ 和限定版本号为 _`M`_ 的 _`SOURCE2`_ 之间的差异将被应用到 _`TARGET_WCPATH`_ 上. 如果省略了限定版本号, 则使用 `HEAD`.
    

当两个合并的源路径具有祖先关系时—第一个源路径是另一个源路径 的祖先, 或反之 (自动合并总是符合这一条件—如果 [合并跟踪](https://svnbook.red-bean.com/nightly/zh/svn.branchmerge.basicmerging.html#svn.branchmerge.basicmerging.mergetracking "合并跟踪") 是可用的, 则 Subversion 会在内部更新合并操作的元数据. 在判断需要合并哪些版本号 时, Subversion 还会把工作副本目标路径上已存在的合并元数据考虑进来, 从而避免重复的合并和不必要的冲突.

和 **svn diff** 不一样的是, **svn merge** 在执行合并时还会考虑到文件的祖先, 这在处理下面这种 情况时非常有用: 把一个分支上的修改合并到另一个分支中, 而在其中一个分 支中文件被重命名了.

<table summary="Tip"><tbody><tr><td rowspan="2"><img alt="[提示]" src="https://svnbook.red-bean.com/nightly/zh/images/tip.png"></td><th>提示</th></tr><tr><td><p>选项 <code>--ignore-ancestry</code> 将禁止 <a href="https://svnbook.red-bean.com/nightly/zh/svn.branchmerge.basicmerging.html#svn.branchmerge.basicmerging.mergetracking" title="合并跟踪">合并跟踪</a>, 使得 <span><strong>svn merge</strong></span> 在合并时不考虑祖先关系, 就像 <span><strong>svn diff</strong></span> 那样工作.</p></td></tr></tbody></table>

## 示例

把分支重新整合到主干上—假设你已经有了一个处于最新状态 下的主干工作副本 (选项 `--verbose` 使得 **svn merge** 在应用差异前打印额外的信息, 这些信息指出了现在 正在执行什么合并. 如果命令的运行时间比较长, 那么打印一些信息就会 很有帮助):

$ svn merge ^/branches/feature-branch-calc-enhancements trunk --verbose
checking branch relationship...
calculating automatic merge...
merging...
--- Merging r12 through r37 into 'trunk':
U    trunk/calc/brush.c
--- Recording mergeinfo for merge of r12 through r37 into 'trunk':
 U   trunk

$ # build, test, verify, ...

$ svn commit trunk -m "Reintegrate the calc enhancements back to trunk!"
Sending        trunk
Sending        trunk/calc/brush.c
Transmitting file data .
Committed revision 38.

为文件合并一个单独的修改 (精选合并):

$ svn merge ^/trunk/calc/brush.c branches/1.x/calc/brush.c -c38
--- Merging r38 into 'branches/1.x/calc/brush.c':
U    branches/1.x/calc/brush.c
--- Recording mergeinfo for merge of r38 into 'branches/1.x/calc/brush.c':
 G   branches/1.x/calc/brush.c

把两个不相关的分支间的差异合并到第三个分支上:

$ svn merge ^/vendor-drop/vendor-1.0 ^/vendor-drop/vendor-1.1 \\
            trunk --ignore-ancestry
--- Merging differences between repository URLs into 'trunk':
U    trunk/draw/draw.py
