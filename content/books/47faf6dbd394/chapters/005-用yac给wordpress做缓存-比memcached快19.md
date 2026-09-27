-   本文地址: [https://www.laruence.com/2026/08/20/6420.html](https://www.laruence.com/2026/08/20/6420.html "Permanet Link to 用Yac给WordPress做缓存：比Memcached快19%")
-   转载请注明出处

这个博客用了很多年 Memcached。它一直很稳定，也没出过什么问题，但有件事始终绕不开：PHP 每读一次缓存，都要经过 localhost TCP。连接管理、协议编解码、数据往返，单次开销不算大，可 WordPress 渲染一个页面往往要读几十甚至上百次对象缓存，累积起来就很可观了。

更重要的是，这部分开销和缓存命中率无关。即使命中了，也得完整走一遍。

[Yac（Yet Another Cache）](https://www.laruence.com/2013/03/18/2846.html)走的是另一条路。它把缓存放在 PHP-FPM master 创建的共享内存里，worker 进程 fork 之后可以直接访问，不需要独立的缓存服务，也不需要经过 socket。

既然 WordPress 有标准的 Object Cache 接口，我就想试试看：把 Memcached 换成 Yac，实际能省下多少？

于是有了 [WP Yac Object Cache](https://github.com/laruence/wp-yac-cache)。它提供标准的 `object-cache.php` drop-in，激活后自动部署，同时带了一个后台面板，用来查看缓存命中率、内存占用和淘汰情况。

![WP Yac 后台面板：命中率与健康状态](https://www.laruence.com/medias/2026/08/wp-yac-dashboard-health.png)

图1：后台面板会直接显示命中率、健康状态和相关指标

## 实际能快多少？

测试直接使用这个博客的首页，没有另外准备空白站点或测试页面。服务器是 8 核 CPU、31GB 内存，运行 PHP 8.1 FPM 和 Nginx。Memcached 通过 localhost:11211 访问，Yac 使用 WP Yac v1.0.0。

为了让两组测试尽量对称，每轮都只替换 Object Cache drop-in，其他配置不动。测试前先执行 `wp cache flush`，重启 PHP-FPM，再用 500 个请求预热，最后分别以 20、50、100 并发持续压测 30 秒。

| 并发 | Yac RPS | Memcached RPS | 提升 | Yac p50 | Mem p50 | Yac p95 | Mem p95 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 20 | 141.6 | 118.7 | +19.3% | 139ms | 167ms | 192ms | 216ms |
| 50 | 140.6 | 118.5 | +18.6% | 353ms | 420ms | 407ms | 465ms |
| 100 | 142.1 | 118.4 | +20.1% | 699ms | 840ms | 754ms | 886ms |

每档测试都完成了 3500 到 4200 次完整页面渲染，返回码全部为 200，没有失败请求。

![Yac 与 Memcached 吞吐对比](https://www.laruence.com/medias/2026/08/wp-yac-rps-benchmark.png)

图2：三档并发下，Yac 的吞吐提升都稳定在 19% 左右

三档并发下，Yac 的吞吐量都在 140 RPS 左右，Memcached 则在 118 RPS 左右，差距很稳定。换成 `ab -n 10000 -c 100` 的固定请求数再测一轮，结果也差不多：Yac 为 141.8 RPS，Memcached 为 120.6 RPS，提升 17.6%。

这个结果当然不意味着所有 WordPress 站点换成 Yac 都会快 19%。主题、插件、数据库负载和每个请求访问缓存的次数不同，收益也会不同。但至少在这个博客上，差异可以稳定复现。

Yac 的优势不是命中率更高，而是命中以后，取回数据的路径更短。

Memcached 的调用路径大致是：

PHP → Socket → Memcached → Socket → PHP

Yac 则是：

PHP → Shared Memory

一次访问只省下一点时间，未必容易观察。但 WordPress 生成一个页面时，会反复读取 options、terms、post meta、comments 等对象。几十上百次访问累积起来，省掉的 socket 通信和协议处理成本就变成了一个可以测出的差距。

测试还说明了另一件事：Yac 到了大约 140 RPS 后，继续增加并发，吞吐量也没有再提高。此时的瓶颈已经转移到了 PHP 页面渲染和 MySQL。并发从 20 增加到 100，p50 延迟也从 139ms 增加到 699ms，基本就是吞吐饱和后的排队结果。

所以，这次优化解决的是每个请求里反复访问对象缓存的固定成本，而不是把站点的所有瓶颈都解决了。真要继续提高上限，下一步应该看 OPcache、页面缓存或多机部署，而不是继续调对象缓存。

## 安装

先安装 PHP 的 Yac 扩展，下面三种方式任选一种。

\# PECL
pecl install yac

# PIE（PHP Foundation 的 PECL 继任者，Yac 已在 Packagist）
pie install laruence/yac

# 源码编译
git clone https://github.com/laruence/yac.git && cd yac
phpize && ./configure && make && sudo make install

安装完成后，在 `php.ini` 中启用扩展：

extension=yac.so

然后重启 PHP-FPM。

### 安装 WordPress 插件

最简单的方式是在 WordPress 插件市场搜索 [`yac-object-cache`](https://wordpress.org/plugins/yac-object-cache/)，安装并激活。

![在 WordPress 插件市场安装 Yac Object Cache](https://www.laruence.com/medias/2026/08/截屏2026-09-02-18.48.56-300x142.png)

也可以使用 WP-CLI：

wp plugin install https://github.com/laruence/wp-yac-cache/releases/latest/download/yac-obj-cache.zip --activate

或者从 [GitHub Releases](https://github.com/laruence/wp-yac-cache/releases) 下载 `yac-obj-cache.zip`，再到 WordPress 后台上传安装。

插件激活后，会自动把 drop-in 部署到 `wp-content/object-cache.php`。然后在 `wp-config.php` 的 “That's all, stop editing!” 之前加入：

define( 'WP\_CACHE', true );
define( 'WP\_YAC\_KEY\_PREFIX', 'wp' );

如果同一个 PHP-FPM 池里运行了多个 WordPress 站点，每个站点都要使用不同的 `WP_YAC_KEY_PREFIX`，避免缓存键互相冲突。

插件还提供一个紧急开关：

define( 'WP\_YAC\_DISABLE', true );

启用后，插件会绕过 Yac，退回到单次请求内的缓存。如果上线后发现异常，可以先用它恢复站点，再排查问题。服务器没有安装 Yac 扩展时，drop-in 也会自动采用请求内缓存，站点仍然可以运行，只是得不到共享内存缓存的效果。

### Yac 配置

这是这个博客运行一段时间后采用的配置：

yac.enable=1
yac.keys\_memory\_size=16M
yac.values\_memory\_size=64M
yac.compress\_threshold=4096

Yac 的键空间和值空间是分开配置的。`yac.keys_memory_size` 决定可以容纳多少键，`yac.values_memory_size` 决定可以保存多少实际数据。发现淘汰时，要先判断是哪一块空间不足，而不是不加区分地一起扩大。

上面的 `16M/64M` 是这个大约 300 篇文章的博客实际运行后的配置。普通小站通常从 `8M/64M` 开始就够了，没有必要一上来分配很大的共享内存。

## 怎么看缓存是否正常？

插件激活后，可以从 WordPress 后台的 `Tools → Yac Object Cache` 打开状态面板。

刚安装时缓存还在预热，命中率低是正常的。只要键槽占用不到 90%，状态会保持为绿色。键槽接近满载后，面板才会结合命中率判断：

-   命中率高于 90%：绿色；
-   命中率在 70% 到 90%：黄色；
-   命中率低于 70%：红色。

如果键槽还没满，但值内存已经用完，状态也会显示为黄色。这时应该增加 `yac.values_memory_size`，或者启用 `yac.compress_threshold`，而不是扩大键空间。

面板里的 Hits 和 Misses 与其他缓存含义相同。另有两个 Yac 特有的指标：

-   **Kicks**：键槽淘汰次数。Yac 使用定长哈希表，插入时连续探测 4 次仍然找不到空槽，就会淘汰旧条目。少量 Kicks 属于正常现象，持续快速增长才说明键空间可能不足。
-   **Recycles**：值空间循环覆盖次数。值空间写满后会回到开头覆盖旧数据。Yac 没有 LRU，因此 Recycles 持续增加时，通常应该扩大值内存。

![Yac 共享内存内容统计](https://www.laruence.com/medias/2026/08/wp-yac-dashboard-contents.png)

图3：共享内存中的键分布、占用统计和最大条目

内容统计可以进一步回答“内存到底被谁占了”。饼图按 group 展示键的分布，Largest entries 则列出占用最大的条目。我的站点里，评论相关缓存约占键数量的 83%；较大的对象包括约 54.97KB 的 `wp:options:alloptions`，以及约 227KB 的 `wp:post_meta:23`。

这些数据能帮助判断问题究竟是键太多，还是某些值太大。面板中的键也尽量保持可读，格式是 `<前缀>:<group>:<key>`。超过 48 字节预算时会保留 group，只对 key 部分做哈希，这样仍然可以按 group 归因。

## 使用前需要注意

**首先，Yac 是本机共享内存缓存。**单机部署，或者节点之间不要求共享缓存时，Yac 很合适。但如果是多机集群，并且所有节点必须使用同一份缓存，那么 Memcached 或 Redis 的网络共享能力反而是必要特性。

**其次，`wp_cache_flush()` 的影响范围比较大。**它会清空这台机器上的整块 Yac 共享内存，其中可能包括同一个 PHP-FPM 池里其他 Yac 使用者的数据。多个站点共用 PHP-FPM 池时要特别注意。更稳妥的方式，是让不同站点使用独立的 PHP-FPM 池。

## 最后

对象缓存其实不是这个博客最大的瓶颈。压测结果已经很清楚：到了 140 RPS 左右以后，限制吞吐的是 PHP 页面渲染和 MySQL。

即便如此，把 Memcached 换成 Yac 后，仍然获得了接近 19% 的吞吐提升，延迟也有所降低。原因并不复杂：WordPress 每次生成页面都会大量访问对象缓存，Yac 把这些访问从 socket 通信变成了共享内存读写。每次只快一点，累积起来就是一个可以稳定测出的差距。

对单机 WordPress 来说，除了性能提升，还可以少运行和维护一个 Memcached 服务。如果服务器允许安装 PHP 扩展，值得试试看。

项目地址：[github.com/laruence/wp-yac-cache](https://github.com/laruence/wp-yac-cache)（GPLv2）
