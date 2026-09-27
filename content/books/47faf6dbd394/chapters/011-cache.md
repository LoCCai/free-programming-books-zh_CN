Yac 2.4.0 来了。起因是博客缓存被空数组挤爆：WordPress 的搜索负缓存和 Akismet 的 cron 会写入大量没人读的空数组，持续吃 values 内存还引发 recycle 误伤。这个版本最大的改动是 embedded values——小标量直接编码进 slot 的指针字，不再写 values 区；另有 LZ4 替换 FastLZ（解压快 ~3.5x）、get() 支持 $default、dump() 支持分页与逐条 hits/atime 统计。混合负载读取提升 70%，我的博客 values 内存从 23.5M 降到 12.4M。

WordPress 每次读取 Memcached 都要承担 localhost TCP 和协议处理成本。换成共享内存缓存 Yac 后，这个博客实测吞吐提升约 19%，同时减少了一个需要维护的缓存服务。

Yac (Yet Another cache)也是之前我在微博的时候开发的一个为PHP使用的，Lock-free, Shared Memory, User Data Cache，用来替代当时微博在PHP机器上装的本地Memcache， 因为当时的需求特点，最初做了完全无锁的设计，但是这样有一个隐患就是用户有可能获得“错误”的数据，虽然之前的测试概率非常非常低。 关于Yac的设计，可以参考我7年前写的[Yac (Yet Another Cache) - 无锁共享内存Cache](https://www.laruence.com/2013/03/18/2846.html)。

作为我的Ya全家桶的重要一员， 在我优化完一轮Yaf, Yar, Yaconf以后，Yac当然也不能少了。
