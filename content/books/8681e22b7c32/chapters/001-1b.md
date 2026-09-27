### 译:Teach Yourself Scheme in Fixnum Days

[View On GitHub](https://github.com/songjinghe/TYS-zh-translation "markdown源码") | [下载中文翻译ZIP](https://github.com/songjinghe/TYS-zh-translation/archive/gh-pages.zip "HTML格式") | [英文原文online](http://www.ccs.neu.edu/home/dorai/t-y-scheme/t-y-scheme.html) | [反馈问题](https://github.com/songjinghe/TYS-zh-translation/issues "issue")

这是一本在国外比较有名的Scheme编程语言的入门教材。本教材适合任何对Scheme编程语言感兴趣的人阅读，尤其是有其他编程语言（特别是动态语言）编程经验，希望快速了解Scheme的不同点并且快速上手写点东西的人。然而希望系统学习Scheme编程的学生仍然是本文的读者之一。

该教程中的大部分内容都能在常见的Scheme入门教材中找到，本教材中比较有特色的是关于`continuation`和`call/cc`的内容，这也是Scheme的一大特点。第十三章很详细的讲解了`continuation`和`call/cc`，十四十五章是它们的应用。然而由于本人理解不够深入，这部分（其实整个文章都是）翻译得不堪卒读，所以有问题请对照英文原文理解，也欢迎大家的[反馈](https://github.com/songjinghe/TYS-zh-translation/issues "issue")！

2009年的时候[heros](http://www.cnblogs.com/heros/category/225196.html)翻译了这篇文章的一部分（至第六章未完）。2010年的时候[lispor](http://lispor.is-programmer.com/tag/Scheme%E7%AC%94%E8%AE%B0)写了一份本教程的读书笔记。2012年的时候又有人试图翻译这篇文章。不过后来貌似没有下文。Scheme的R5RS规范已经在2004年被译成了中文，而这篇实践性比较强的文章却没有完整的中文译版。所以自己翻译了一份（前六章基本是用的hero的版本），本人也是第一次接触Scheme，水平有限，大家多多包涵。

### 目 录

-   [【译者】关于本文](http://songjinghe.github.io/TYS-zh-translation/about.html)
-   [前言](http://songjinghe.github.io/TYS-zh-translation/000-preface.html)
-   [第一章：进入Scheme](http://songjinghe.github.io/TYS-zh-translation/010-enter-scheme.html)
-   [第二章：数据结构](http://songjinghe.github.io/TYS-zh-translation/020-data-types.html)
-   [第三章：代码结构](http://songjinghe.github.io/TYS-zh-translation/030-forms.html)
-   [第四章：条件语句](http://songjinghe.github.io/TYS-zh-translation/040-conditionals.html)
-   [第五章：词法变量](http://songjinghe.github.io/TYS-zh-translation/050-lexical-variables.html)
-   [第六章：递归](http://songjinghe.github.io/TYS-zh-translation/060-recursion.html)
-   [第七章：输入输出](http://songjinghe.github.io/TYS-zh-translation/070-io.html "多谢@何ufo的工作")
-   [第八章：宏](http://songjinghe.github.io/TYS-zh-translation/080-macros.html "多谢@何ufo的工作")
-   [第九章：结构](http://songjinghe.github.io/TYS-zh-translation/090-structures.html "多谢@何ufo的工作")
-   [第十章：关联列表和表格](http://songjinghe.github.io/TYS-zh-translation/100-alists-and-tables.html "多谢@何ufo的工作")
-   [第十一章：系统接口](http://songjinghe.github.io/TYS-zh-translation/110-system-interface.html "多谢@何ufo的工作")
-   [第十二章：对象和类](http://songjinghe.github.io/TYS-zh-translation/120-objects-and-classes.html "多谢@何ufo的工作")
-   [第十三章：跳转](http://songjinghe.github.io/TYS-zh-translation/130-jumps.html "这章纯粹是我自己翻译的，有看不明白的欢迎反馈")
-   [第十四章：不确定性](http://songjinghe.github.io/TYS-zh-translation/140-nondeterminism.html "translate on 20140722")
-   [第十五章：引擎](http://songjinghe.github.io/TYS-zh-translation/150-engines.html "translate on 20140724")
-   [第十六章：命令行脚本](http://songjinghe.github.io/TYS-zh-translation/160-shell-scripts.html "translate on 20140724")
-   [第十七章：CGI脚本](http://songjinghe.github.io/TYS-zh-translation/170-cgi-scripts.html "translate on 20140724")
-   [附录 A：Scheme方言](http://songjinghe.github.io/TYS-zh-translation/200-appendix-a-scheme-dialects.html "done on 20140725")
-   [附录 B：DOS批处理](http://songjinghe.github.io/TYS-zh-translation/300-appendix-b-dos-batch-file.html "done on 2014076")
-   [附录 C：数值运算](http://songjinghe.github.io/TYS-zh-translation/400-appendix-c-numerical-techniques.html "complete on 20140803")
-   [附录 D：可设为infinity的时钟](http://songjinghe.github.io/TYS-zh-translation/500-appendix-d-clock-for-infinity.html "done on 20140806")
-   [附录 E：参考文献](http://songjinghe.github.io/TYS-zh-translation/600-appendix-e-references.html "done on 14/08/09")
-   [附录 F：索引](http://songjinghe.github.io/TYS-zh-translation/700-appendix-f-index.html "done on 140809")
-   [无关的：论Java语言符号表设计时的一些问题](http://songjinghe.github.io/TYS-zh-translation/888-about-java-symbol-table.html "这个是在我毕设做Java符号表时给了我很多启发")

### 许可（License）

本译文的发布遵循与英文原文相同的LICENSE(即 [GNU Lesser General Public License](http://www.gnu.org/licenses/lgpl.html))。如有问题，请联系我。

This translated version is published under the same license(viz, the [LGPL license](http://www.gnu.org/licenses/lgpl.html)) of the orginal english version. If you have any question, please contact me.
