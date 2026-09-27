> 地球人都知道，[Composer 2.0](https://www.phpcomposer.com/composer-2-0-is-now-available/) 已于 2020 年 10 月下旬发布。我们在发布公告中已经暗示 Composer 1.x 的生命周期即将结束，不过，今天我们将 Packagist.org 对 Composer 1.x 的支持期限（以前所设想的）稍做一下延长。

首先，我们在过去的几个月中意识到 Composer 1.x 可能要存在数年才能完全消失。 Composer 被安装在太多地方了，因此我们将必须长时间保持对 v1 版元数据的支持（以保证 Composer 1.x 正常运行），以防止干扰用户现有的工作流程。

但是，我们遇到的最大障碍是：由于 v1 版元数据所使用的格式的限制，因此要占用 packagist.org 的很多资源才能将其转储到静态 JSON 文件中。 因此，我们采取了两个步骤来减少其对我们的基础架构的负面影响：

## 从 2021 年 5 月开始降低 v1 版元数据 API 的更新频率

所有软件包（package）的新版本的更新频率将从当前的每分钟降低到每 15 分钟一次。这意味着新版本需要经过几分钟的时间才能用于 Composer 1.x 的安装。

从好的方面来看，降低 v1 版元数据的更新频率，意味着我们可以将 v2 版元数据的更新频率提升到秒级，而无须与 v1 版元数据的更新（分钟级）捆绑在一起。

## 从 2021 年 5 月开始，限制通过 v1 版元数据 API 访问未使用的软件包

我们面临的另一个问题是：我们目前需要处理 300,000 个软件包、2,700,000 个版本的同步，而 v1 格式使用了很长的文件列表，这意味着软件包的数量对处理流程的影响很大。

为了解决这个问题，我们将（滚动式）隐藏最近 4 个月内从未通过 v1 版元数据下载过的所有软件包。这将使软件包的数量减少约一半，而不会对实际使用产生重大影响。

这意味着新软件​​包和旧的未使用的软件包仅在 Composer 2 可见，直到有人安装它们，这时它们也将对 Composer 1 可见。

## API 用户：请立即联系我们！

如果您将 v1 版元数据当作 API 使用，而不是通过 Composer 来使用的话，请访问 [https://packagist.org/apidoc](https://packagist.org/apidoc) 以查看当前的 API 文档（现在包括 v2 格式）。请检查是否可以升级到这种新格式。如果您不能升级，请在我们进行上述变更之前与我们联系，以便我们能够为您提供所需的工具。

## 还未使用 Composer 2 吗？现在就升级吧！

你可以通过执行 `composer self-update --2` 命令进行版本迁移。如果中间遇到问题，可以随时通过 `composer self-update --1` 命令恢复先前版本。请阅读 [Composer 2](https://www.phpcomposer.com/composer-2-0-is-now-available/) 公告以了解更多信息。

* * *

文章出处：[https://blog.packagist.com/deprecating-composer-1-support/](https://blog.packagist.com/deprecating-composer-1-support/)

Composer 英文官网：[https://getcomposer.org/](https://getcomposer.org/)  
Composer 中文官网：[http://www.phpcomposer.com/](https://www.phpcomposer.com/)
