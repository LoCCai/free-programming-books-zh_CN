经过俩周多的重构，终于一咬牙今天发布了Yaf 3.2.0 beta， 要不然一直在想各种可能的优化点，不停的写，没完了， 🙂

这次的重构的最初出发点是把原来的Yaf对象从PHP的原生对象，改成了自定义的对象:

[Yaf(Yet Another Framework)](https://laruence.com/manual)是我的第一个发布的PECL扩展，也是我走上PHP内核维护的开始，我一直对它比较有感情，Yaf在过去的8年多时间里，也得到了不少朋友的喜爱，当然Yaf还是有很多不足，但毕竟Yaf主要还是针对性能场景，不能满足所有的需求。

即然Yaf == 性能，借着疫情的在家时间，又花了一些时间对Yaf做了一轮优化，希望能对性能有进一步的提升。

这个算是一个比较有用的性能优化技巧吧，主要是刚刚在[重构Yaf\_Loader](https://github.com/laruence/yaf/commit/9a673c65e02f0342279ba10b9fa023319b59181d#diff-49531ca1ac47db0a9bf4935377bbe62bR228)的时候又用到，想着这个操作比较常见，就专门拎出来做个小分享...

我们在写代码的时候，在字符串处理的时候，可能会遇到这样的需求，就是把一个目标字符串中所有出现的某个字符a替换为另外一个字c....

自动加载器在一个大型PHP项目中，往往是最容易被忽视的性能点，因为它一般而言都很简单， 但是它的调用次数确实非常之大。[Yaf](https://github.com/laruence/yaf)也不例外，虽然[Yaf](https://github.com/laruence/yaf)是C语言写的扩展，但还是可能会占到一个复杂项目1%到3%的耗时，这俩天想了想，总不能天天开会写博客吧，还是写点代码吧？于是乎决定启动重构。：）

经过周末一番重构，我基本上重写了[Yaf\_Loader::autoload](https://www.laruence.com/manual/yaf.class.loader.autoload.html)整条生命期， 目的就是降低内存分配，具体的变化可以看：[Refactor Yaf\_Loader](https://github.com/laruence/yaf/commit/3c6937f5cc831c407913819a5a98e1d76aa2cba8?diff=split), 效果咋样? 我们来做个简单的测试：

Filed in [随笔](https://www.laruence.com/category/notes "View all posts in 随笔")
