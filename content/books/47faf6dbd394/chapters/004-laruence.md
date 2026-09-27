GPT-6 Astra 能否把真实住宅重建为可拆分的三维资产？我用[如视](https://www.realsee.com)伽罗华 P4 的全景、点云、深度图等数据实测：高质量空间数据如何让 AI 从“想象”走向“工程”。

Filed in [随笔](https://www.laruence.com/category/notes "View all posts in 随笔")

Yac 2.4.0 来了。起因是博客缓存被空数组挤爆：WordPress 的搜索负缓存和 Akismet 的 cron 会写入大量没人读的空数组，持续吃 values 内存还引发 recycle 误伤。这个版本最大的改动是 embedded values——小标量直接编码进 slot 的指针字，不再写 values 区；另有 LZ4 替换 FastLZ（解压快 ~3.5x）、get() 支持 $default、dump() 支持分页与逐条 hits/atime 统计。混合负载读取提升 70%，我的博客 values 内存从 23.5M 降到 12.4M。

WordPress 每次读取 Memcached 都要承担 localhost TCP 和协议处理成本。换成共享内存缓存 Yac 后，这个博客实测吞吐提升约 19%，同时减少了一个需要维护的缓存服务。

Wechatian 是一款 Obsidian 插件，直接双向打通微信和Obsidian知识库，不需要第三方服务：微信发来的文字、图片、文章链接自动剪藏进Obsidian知识库；往obsidian wechatian发件箱写文件即可经腾讯 ilink 网关发出微信消息。无任何第三方中转，任何会写文件的程序都能发微信给你。简单配置就可以让AI Agent 干完活直接微信通知你，再也不用守着电脑等待。

让 DeepSeek V4 Pro 给 yaconf 1.2.0 做 compact 存储：随机读快40%、内存省16%——但一次 git 操作弄丢了几百行核心代码。快很重要，稳更重要。

一小时搭建私人 AI 知识管理员的实操教程：Obsidian + Claudian + Claude Code + DeepSeek，让 AI 替你读资料、整理笔记、随时答疑，数据全部本地掌控，不写代码也能搭。

唯一因实现困难而放弃维护的项目 Taint，被 Qwen3.8 复活：2亿 Token、406 元、约5小时，完成这个 XSS/注入检测扩展的 PHP8 适配。

年前花了点时间，对Yar的性能做了一些做了一些提升，但是也遇到一个让我有点不舒服的当初没有良好设计遗留的问题，就是在并行调用RPC的时候，现在的方法原型是:

public static Yar\_Concurrent\_Client::call(string $uri, string $method, ?array $arguments = NULL, ?callable $callback = NULL, ?callable $error\_callback = NULL, ?array $options = NULL):null|int|bool {}

是不是一看就很头大？

从PHP8.0之后，我参与PHP开源就少了，从而博客也写的少了，不少朋友来问，所以觉得有必要用一篇文章说明下近况。

总的来说，本职工作发生了一些变化，导致工作上的事情，牵扯了太多的精力，从而没有办法有太多的精力投入PHP开源工作中。

而关于，工作的变化，我稍微详细的介绍下:

Filed in [随笔](https://www.laruence.com/category/notes "View all posts in 随笔")

PHP8 alpha2发布了，最近引入了一个新的关键字：match, 这个关键字的作用跟switch有点类似。

这个我觉得还是有点意思，match这个词也挺好看，那么它是干啥的呢？
