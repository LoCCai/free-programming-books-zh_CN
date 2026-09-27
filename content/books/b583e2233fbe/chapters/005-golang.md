-   ## [How to persist goRBAC instance](https://mikespook.com/2017/04/how-to-persist-gorbac-instance/)
    
    ## Introduction
    
    [goRBAC](https://github.com/mikespook/gorbac) provides a lightweight role-based access control (RBAC) implementation in Golang. Normally, the privilege information (roles, parents, and permissions) are saved in the persistent storage, e.g. Database, Files, or Cloud Storage. This post will briefly discuss the technical details of how to load the goRBAC instance from persistent storage and how to save the instance back. In order to make things simple, I will use the JSON file as the persistent storage.  
    [(more…)](https://mikespook.com/2017/04/how-to-persist-gorbac-instance/#more-2256)
    
-   ## [Thoughs on goRBAC](https://mikespook.com/2016/02/thoughs-on-gorbac/)
    
    Code refactoring is not an easy job, but it has to be done in most of the times. I just completed the lightweight role based access control library: goRBAC’s refactoring. There are some feedbacks and questions about the design and usage. I think it would be better writing something to share some design ideas and practice principles which will make things easier.
    
    ![rbac](https://mikespook.com/wp-content/uploads/2016/02/rbac-300x165.jpg)
    
    The [master branch](https://github.com/mikespook/gorbac) of current goRBAC’s source code is intended to be Version 2. While the previous version has been tagged as [Version 1](https://github.com/mikespook/gorbac/tree/v1.0) with the [v1.dev branch](https://github.com/mikespook/gorbac/tree/v1.dev) on Github. And this article will only discuss Version 2 (the master branch).
    
    [(more…)](https://mikespook.com/2016/02/thoughs-on-gorbac/#more-2212)
    
-   ## [如何从源代码构建 Go 1.5 开发环境](https://mikespook.com/2015/06/%e5%a6%82%e4%bd%95%e4%bb%8e%e6%ba%90%e4%bb%a3%e7%a0%81%e6%9e%84%e5%bb%ba-go-1-5-%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83/)
    
    _请注意，本文正文含有大量链接。如果是转载或者使用某些不支持超链接的阅读器，就请自行脑补吧。_
    
    近期，Go Team 连续放出了几个大招来介绍即将在八月问世的 Go 1.5 这个划时代的版本。Rob 和 Andrew 分别在《[Go in Go](https://talks.golang.org/2015/gogo.slide#1)》和《[The State of Go](https://talks.golang.org/2015/state-of-go.slide#1)》中详细说明了出现在 Go 1.5 中的重要特性和细节变化。在这个版本中最主要的变化是[移除了所有 C 代码](https://talks.golang.org/2015/state-of-go.slide#10)，不论是 runtime 还是编译器都使用 Go 语言和一小部分的汇编来实现——也就是人们常说的自举。但是这样做也就意味着，Go 在 1.5 和以后的版本中，使用源代码构建 Go  
    开发环境将面临“鸡生蛋，蛋生鸡”的麻烦（当然了，如果你直接“买鸡蛋”——使用[二进制安装包](https://golang.org/dl/)——是没有这个问题的）。  
    [(more…)](https://mikespook.com/2015/06/%e5%a6%82%e4%bd%95%e4%bb%8e%e6%ba%90%e4%bb%a3%e7%a0%81%e6%9e%84%e5%bb%ba-go-1-5-%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83/#more-2053)
    
-   ## [\[翻译\]理解 Go 语言的内存使用](https://mikespook.com/2014/12/%e7%90%86%e8%a7%a3-go-%e8%af%ad%e8%a8%80%e7%9a%84%e5%86%85%e5%ad%98%e4%bd%bf%e7%94%a8/)
    
    许多人在刚开始接触 Go 语言时，经常会有的疑惑就是“为什么一个 Hello world 会占用如此之多的内存？”。[Understanding Go Lang Memory Usage](https://deferpanic.com/blog/understanding-golang-memory-usage/ "Understanding Go Lang Memory Usage") 很好的解释了这个问题。不过“简介”就是“简介”，更加深入的内容恐怕要读者自己去探索了。另外，文章写到最后，作者飘了，估计引起了一些公愤，于是又自己给自己补刀，左一刀，右一刀……
    
    ————翻译分隔线————
    
    ## 理解 Go 语言的内存使用
    
    _2014年12月22日，星期一_
    
    **温馨提示**：这仅是关于 Go 语言内存的简介，俗话说不入虎穴、焉得虎子，读者可以进行更加深入的探索。
    
    大多数 Go 开发者都会尝试像这样简单的 hello world 程序：
    
    package main
    
    import (
    "fmt"
    "time"
    )
    
    func main() {
    fmt.Println("hi")
    
    time.Sleep(30 \* time.Second)
    }
    
    然后他们就完全崩溃了。
    
    [(more…)](https://mikespook.com/2014/12/%e7%90%86%e8%a7%a3-go-%e8%af%ad%e8%a8%80%e7%9a%84%e5%86%85%e5%ad%98%e4%bd%bf%e7%94%a8/#more-1999)
    
-   ## [\[翻译\] channel 独木难支](https://mikespook.com/2014/09/%e7%bf%bb%e8%af%91-channel-%e7%8b%ac%e6%9c%a8%e9%9a%be%e6%94%af/)
    
    原文[在此](https://gist.github.com/kachayev/21e7fe149bc5ae0bd878 "Channels are not Enough")。遗憾的是文章只提出了问题，并没明确提供如何解决这些问题。但无论如何，对于这种可以引起反思的文章，是不能放过的。另外，我得承认，似乎高层次的分布式系统的抽象，用函数式语言的范式来表述更容易一些（实现上其实未必）。
    
    ————翻译分隔线————
    
    ## channel 独木难支  
    或者说为什么流水线作业没那么容易
    
    勇敢和聪明的 [Golang](https://talks.golang.org/2012/concurrency.slide#1) [并发](https://blog.golang.org/advanced-go-concurrency-patterns)[模型](https://blog.golang.org/pipelines)。
    
    [@kachayev](https://twitter.com/kachayev) 撰写
    
    ## 概述
    
    Go 被设计用于更容易的构建并发系统，因此它有运行独立的计算的 goroutine 和用于它们之间通讯的 channel。我们之前都听过这个故事。所有的例子和指南看起来都挺好的：我们可以创建一个新的 channel，可以向这个 channel 发送数据，可以从 channel 读取，甚至还有漂亮和优雅的 select 语句（顺便提一下，为什么 21 世纪了我们还在用语句？），阻塞读和缓存……  
    ![A magical unicorn](https://camo.githubusercontent.com/07fd64e7b8339e0e2d1d2d6812b16641afcc8788/68747470733a2f2f7062732e7477696d672e636f6d2f6d656469612f427642534a4a5143414141574838652e6a7067)
    
    主旨：**99% 的情况下，我其实并不关心响应是由 channel 传递的，还是一只魔法独角兽从它的角上带来的。**
    
    [(more…)](https://mikespook.com/2014/09/%e7%bf%bb%e8%af%91-channel-%e7%8b%ac%e6%9c%a8%e9%9a%be%e6%94%af/#more-1951)
    
-   ## [\[翻译\]十条有用的 Go 技术](https://mikespook.com/2014/07/%e5%8d%81%e6%9d%a1%e6%9c%89%e7%94%a8%e7%9a%84-go-%e6%8a%80%e6%9c%af/)
    
    原文在此，实用总结。  
    ————翻译分隔线————
    
    ## 十条有用的 Go 技术
    
    这里是我过去几年中编写的大量 Go 代码的经验总结而来的自己的最佳实践。我相信它们具有弹性的。这里的弹性是指：  
    某个应用需要适配一个灵活的环境。你不希望每过 3 到 4 个月就不得不将它们全部重构一遍。添加新的特性应当很容易。许多人参与开发该应用，它应当可以被理解，且维护简单。许多人使用该应用，bug 应该容易被发现并且可以快速的修复。我用了很长的时间学到了这些事情。其中的一些很微小，但对于许多事情都会有影响。所有这些都仅仅是建议，具体情况具体对待，并且如果有帮助的话务必告诉我。随时留言:)
    
    [(more…)](https://mikespook.com/2014/07/%e5%8d%81%e6%9d%a1%e6%9c%89%e7%94%a8%e7%9a%84-go-%e6%8a%80%e6%9c%af/#more-1894)
    

-   ## [\[翻译\]编译器(10)-编译到 C](https://mikespook.com/2014/05/%e7%bf%bb%e8%af%91%e7%bc%96%e8%af%91%e5%99%a810-%e7%bc%96%e8%af%91%e5%88%b0-c/)
    
    原文[在此](https://noeffclue.blogspot.com/2014/05/compiler-part-10-compiling-to-c.html "Compiler Part 10: Compiling to C")。
    
    ————翻译分隔线————
    
    ## 编译器(10)-编译到 C
    
    [第一部分](https://mikespook.com/2014/05/%e7%bf%bb%e8%af%91%e7%bc%96%e8%af%91%e5%99%a81-%e4%bd%bf%e7%94%a8-go-%e5%bc%80%e5%8f%91%e7%bc%96%e8%af%91%e5%99%a8%e7%9a%84%e4%bb%8b%e7%bb%8d/ "编译器(1)-使用 GO 开发编译器")：介绍  
    [第二部分](https://mikespook.com/2014/05/%e7%bf%bb%e8%af%91%e7%bc%96%e8%af%91%e5%99%a82-%e7%bc%96%e8%af%91%e3%80%81%e8%bd%ac%e8%af%91%e5%92%8c%e8%a7%a3%e9%87%8a/ "编译器(2)-编译、转译和解释")：编译、转译和解释  
    [第三部分](https://mikespook.com/2014/05/%e7%bf%bb%e8%af%91%e7%bc%96%e8%af%91%e5%99%a83-%e7%bc%96%e8%af%91%e5%99%a8%e8%ae%be%e8%ae%a1%e6%a6%82%e8%a7%88/ "编译器(3)-编译器设计概览")：编译器设计概览  
    [第四部分](https://mikespook.com/2014/05/%e7%bf%bb%e8%af%91%e7%bc%96%e8%af%91%e5%99%a84-%e8%af%ad%e8%a8%80%e8%ae%be%e8%ae%a1/ "[翻译]编译器(4)-语言设计")：语言设计概述  
    [第五部分](https://mikespook.com/2014/05/%e7%bf%bb%e8%af%91%e7%bc%96%e8%af%91%e5%99%a85-%e8%af%ad%e8%a8%80%e8%a7%84%e6%a0%bc%e8%af%b4%e6%98%8e%e4%b9%a6/ "编译器(5)-语言规格说明书")：Calc 1 语言规格说明书  
    [第六部分](https://mikespook.com/2014/05/%e7%bf%bb%e8%af%91%e7%bc%96%e8%af%91%e5%99%a86-%e6%a0%87%e8%af%86%e7%ac%a6/ "编译器(6)-标识符")：标识符  
    [第七部分](https://mikespook.com/2014/05/%e7%bf%bb%e8%af%91%e7%bc%96%e8%af%91%e5%99%a87-%e6%89%ab%e6%8f%8f/ "编译器(7)-扫描")：扫描  
    [第八部分](https://mikespook.com/2014/05/%e7%bf%bb%e8%af%91%e7%bc%96%e8%af%91%e5%99%a88-%e6%8a%bd%e8%b1%a1%e8%af%ad%e6%b3%95%e6%a0%91/ "编译器(8)-抽象语法树")：抽象语法树  
    [第九部分](https://mikespook.com/2014/05/%e7%bf%bb%e8%af%91%e7%bc%96%e8%af%91%e5%99%a89-%e8%a7%a3%e6%9e%90/ "编译器(9)-解析")：解析
    
    终于到最后一个步骤了！
    
    我们的语言规格说明书如此简单，其实可以跳过 C 直接输出汇编。我有两个不这么做的原因。首先，移植性。在这个指引中，我无须编写任何特定架构的 C 代码。C 已经被移植到各种不同的系统中去了，因此可以让 C 编译器为我们做这个工作。
    
    其次，对于许多程序员来说，汇编比起 C 来说要陌生得多。即使你从未使用 C 编写任何东西，它也比汇编要容易理解得多。 [(more…)](https://mikespook.com/2014/05/%e7%bf%bb%e8%af%91%e7%bc%96%e8%af%91%e5%99%a810-%e7%bc%96%e8%af%91%e5%88%b0-c/#more-1876)
