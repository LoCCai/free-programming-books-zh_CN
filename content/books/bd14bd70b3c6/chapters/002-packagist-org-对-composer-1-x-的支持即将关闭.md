一直以来，Composer 1.x 为 PHP 社区提鞠躬尽瘁，但随着 Composer 2.0 于 4 年前的 2020 年 10 月份发布，是时候向前迈进了。截至目前，得益于 v2 版本在性能、内存使用和安全性方面的[显著改进](https://www.phpcomposer.com/composer-2-0-is-now-available/)，[超过 95% 的 Composer 更新都在使用 v2 版本](https://p.datadoghq.com/sb/x98w56x71erzshui-4a54c45f82bacc991e83302548934b6a)。

Composer 1.x 在架构上存在问题，并且很难管理一个拥有 40 万个软件包和 450 多万个版本的软件包仓库。因此，我们 [在 2021 年 2 月放弃了对 Composer 1.x 的支持](https://www.phpcomposer.com/deprecating-packagist-org-support-for-composer-1-x/)，并引入了元数据更新延迟和新软件包访问限制。为了集中力量支持和增强 Composer 2.x，现在，我们宣布将全面关闭 Packagist.org 上对 Composer 1.x 元数据的访问。

## 关键时间点：

-   2025 年 2 月 1 日： Composer 1.x 元数据将变为只读。在此日期之后，Composer 1.x 用户将无法更新到新软件包或新版本。
-   2025 年 8 月 1 日： Composer 1.x 元数据的访问将彻底关闭。无法再使用 Composer 1.x 更新软件包。

## 我们为什么要做出这样的改变？

由于 Composer 1.x 的架构的问题以及要处理大量软件包和版本，维护 Composer 1.x 变得越来越具有挑战性。通过停用 1.x，我们可以节省大量的宝贵资源，将更多时间用于改进 Composer 2.x，并且，后者已成为 PHP 软件包管理工具的标准。

## 您需要做什么

在 2025 年 2 月 1 日（元数据变为只读状态）之前升级到 Composer 2.x。升级非常简单，大多数项目都能在 2.x 中正常运行。您可以查看我们最初发布 2.0 版本时的博文，有详细的说明以及关于不向后兼容的说明：[https://www.phpcomposer.com/composer-2-0-is-now-available/](https://www.phpcomposer.com/composer-2-0-is-now-available/) 。

如需升级版本，请使用以下命令：

```
composer self-update --2
```

即使关闭了 1.x 版的元数据访问，您仍然可以使用现有的锁文件运行 `composer install` 命令。这些锁定文件包含所有必要的下载信息，除非你尝试更新依赖项，否则不需要从 Packagist.org 获取元数据。

## 目前仍然需要继续使用 Composer 1.x 该怎么办？

如果您仍然需要在 2025 年 8 月之后继续使用 Composer 1.x，请考虑使用付费的 Private Packagist（私有 Packagist）。Private Packagist 将至少在 2026 年 12 月 31 日之前与 Composer 1.x 保持兼容。我们的 Private Packagist 能够更轻松地支持 Composer 1.x，是因为每个账户的 Composer 存储库中所包含的软件包和版本要少很多。

如需我们的支持在 2026 年之后展期，请通过 [contact@packagist.com](mailto:contact@packagist.com) 联系 Private Packagist 客户支持。

* * *

文章出处： [https://blog.packagist.com/shutting-down-packagist-org-support-for-composer-1-x/](https://blog.packagist.com/shutting-down-packagist-org-support-for-composer-1-x/)
