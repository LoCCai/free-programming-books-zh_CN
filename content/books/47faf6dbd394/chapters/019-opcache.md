PHP8 alpha1已经在昨天发布，相信关于JIT是大家最关心的，它到底怎么用，有什么要注意的，以及性能提升到底咋样？[![](https://www.laruence.com/medias/2020/06/CAEC7B6B-3265-4355-AFCD-53343B4F00ED.jpeg)](https://www.laruence.com/medias/2020/06/CAEC7B6B-3265-4355-AFCD-53343B4F00ED.jpeg)

PHP7已经发布了, 作为PHP10年来最大的版本升级, 最大的性能升级, PHP7在多放的测试中都表现出很明显的性能提升, 然而, 为了让它能发挥出最大的性能, 我还是有几件事想提醒下.

这个是我上周末在"阿里PHP技术沙龙"临时分享的一个主题的PPT, 主要是介绍一下Zend Optimizer Plus(简称O+).  
O+是由Zend公司开发的一个PHP性能提升工具, 在PHP5.5开始, 已经随着PHP的源代码一起发布了, 并且也改名为:Opcache.  
不同于APC, O+除了是Opcodes Cache以外, 还做了很多的Opcodes优化, 这个PPT就是主要列举了一下主要的优化们.  
也不同于eacc, O+做的优化更多一些.

这个PPT以前已经在微盘上分享过了, 今天突然想起来, 上传到了slideshare上, 顺便也在博客上留个纪念吧.  
这个PPT介绍了过去一年我在微博的工作成果, 包括Yaf的改, 以及新东西Yar, Yac等  
通过一系列的努力(整体方针是, 先提速, 降成本, 清晰架构, SOA), 我们让微博首页的响应时间下降了一倍多, 同时还降低了整体的成本.
