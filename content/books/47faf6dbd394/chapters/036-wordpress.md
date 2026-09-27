Yac 2.4.0 来了。起因是博客缓存被空数组挤爆：WordPress 的搜索负缓存和 Akismet 的 cron 会写入大量没人读的空数组，持续吃 values 内存还引发 recycle 误伤。这个版本最大的改动是 embedded values——小标量直接编码进 slot 的指针字，不再写 values 区；另有 LZ4 替换 FastLZ（解压快 ~3.5x）、get() 支持 $default、dump() 支持分页与逐条 hits/atime 统计。混合负载读取提升 70%，我的博客 values 内存从 23.5M 降到 12.4M。

with [5 Comments](https://www.laruence.com/2026/08/26/6566.html#comments)

WordPress 每次读取 Memcached 都要承担 localhost TCP 和协议处理成本。换成共享内存缓存 Yac 后，这个博客实测吞吐提升约 19%，同时减少了一个需要维护的缓存服务。

with [11 Comments](https://www.laruence.com/2026/08/20/6420.html#comments)

博客迁移完腾讯云以后， 又配置好了ssl，一直在调优PHP的性能，中午调整了半天fpm和opcache, 晚上又突然想起来我之前在某个大会上分享过的使用tmpfs(把内存当成硬盘）来加速网站的做法，于是～搞！

with [14 Comments](https://www.laruence.com/2020/02/15/4982.html#comments)
