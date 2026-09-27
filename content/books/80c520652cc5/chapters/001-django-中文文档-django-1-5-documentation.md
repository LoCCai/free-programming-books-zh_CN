## Django 中文文档[¶](#django "Permalink to this headline")

这里有你需要知道的有关 Django 的一切。

## Getting help[¶](#getting-help "Permalink to this headline")

有问题吗？ 我们希望以下对大家有所帮助！

-   试试 [_常见问题_](https://django-chinese-docs.readthedocs.io/en/latest/faq/index.html) – 它对许多常见的问题作了解答。
-   寻找特定的信息？ 试试 [_文档索引_](https://django-chinese-docs.readthedocs.io/en/latest/genindex.html), [_模块索引_](https://django-chinese-docs.readthedocs.io/en/latest/py-modindex.html) 或者 [_文档目录_](https://django-chinese-docs.readthedocs.io/en/latest/contents.html) 。
-   搜索 [django-users邮件列表](https://django-chinese-docs.readthedocs.io/en/latest/archivesofthedjango-usersmailinglist),或者 [提交一个问题](https://django-chinese-docs.readthedocs.io/en/latest/postaquestion) 。
-   在 [#django IRC channel](irc://irc.freenode.net/django) 上提问, 或者搜索 [IRC logs](http://django-irc-logs.com/) 看下是否已经有人问过类似的问题。
-   在我们的 [ticket tracker](https://code.djangoproject.com/) 上报告 Django 的 bug 。

## 新手入门[¶](#id2 "Permalink to this headline")

初次接触 Django 或编程吗? 从这里开始吧!

-   **从零开始:** [_初探_](https://django-chinese-docs.readthedocs.io/en/latest/intro/overview.html) | [_安装_](https://django-chinese-docs.readthedocs.io/en/latest/intro/install.html)
-   **新手教程:** [_第1部分_](https://django-chinese-docs.readthedocs.io/en/latest/intro/tutorial01.html) | [_第2部分_](https://django-chinese-docs.readthedocs.io/en/latest/intro/tutorial02.html) | [_第3部分_](https://django-chinese-docs.readthedocs.io/en/latest/intro/tutorial03.html) | [_第4部分_](https://django-chinese-docs.readthedocs.io/en/latest/intro/tutorial04.html) | [_第5部分_](https://django-chinese-docs.readthedocs.io/en/latest/intro/tutorial05.html)
-   **进阶教程:** [_如何编写可重用的应用程序_](https://django-chinese-docs.readthedocs.io/en/latest/intro/reusable-apps.html) | [_为Django编写属于你的首个补丁_](https://django-chinese-docs.readthedocs.io/en/latest/intro/contributing.html)

## 模型层(model)[¶](#model "Permalink to this headline")

Django 提供了一个抽象层(the “models”),对您的 web 应用中的数据进行构建及操纵。通过以下内容来了解更多:

-   **模型(Models):** [_模型语法_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/models.html) | [_字段类型_](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html) | [_Meta选项_](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/options.html)
-   **查询集(QuerySets):** [_执行查询_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/queries.html) | [_QuerySet 方法参考_](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/querysets.html)
-   **模型实例(Model instances):** [_Instance 方法_](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/instances.html) | [_访问关联对象_](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/relations.html)
-   **进阶:** [_管理器(Managers)_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/managers.html) | [_SQL 语句查询_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/sql.html) | [_事务管理_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/transactions.html) | [_数据处理_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/aggregation.html) | [_自定义字段_](https://django-chinese-docs.readthedocs.io/en/latest/howto/custom-model-fields.html) | [_多数据库_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/multi-db.html)
-   **其他:** [_支持的数据库_](https://django-chinese-docs.readthedocs.io/en/latest/ref/databases.html) | [_遗留型旧数据库_](https://django-chinese-docs.readthedocs.io/en/latest/howto/legacy-databases.html) | [_为模型提供初始数据_](https://django-chinese-docs.readthedocs.io/en/latest/howto/initial-data.html) | [_优化数据库访问_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/optimization.html)

## 视图层(view)[¶](#view "Permalink to this headline")

Django 的视图是封装了处理用户的请求与返回响应的逻辑。通过以下链接来了解视图:

-   **基础:** [_URL配置(URLconfs)_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/urls.html) | [_视图定义_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/views.html) | [_快捷方法_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/shortcuts.html) | [_装饰器_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/decorators.html)
-   **参考:** [_Request/response 对象_](https://django-chinese-docs.readthedocs.io/en/latest/ref/request-response.html) | [_TemplateResponse 对象_](https://django-chinese-docs.readthedocs.io/en/latest/ref/template-response.html)
-   **文件上传:** [_概述_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/file-uploads.html) | [_File 对象_](https://django-chinese-docs.readthedocs.io/en/latest/ref/files/file.html) | [_存储 API_](https://django-chinese-docs.readthedocs.io/en/latest/ref/files/storage.html) | [_文件管理_](https://django-chinese-docs.readthedocs.io/en/latest/topics/files.html) | [_自定义存储_](https://django-chinese-docs.readthedocs.io/en/latest/howto/custom-file-storage.html)
-   **视图基类:** [_概述_](https://django-chinese-docs.readthedocs.io/en/latest/topics/class-based-views/index.html) | [_内置显示视图_](https://django-chinese-docs.readthedocs.io/en/latest/topics/class-based-views/generic-display.html) | [_内置编辑视图_](https://django-chinese-docs.readthedocs.io/en/latest/topics/class-based-views/generic-editing.html) | [_混合使用_](https://django-chinese-docs.readthedocs.io/en/latest/topics/class-based-views/mixins.html) | [_API 参考_](https://django-chinese-docs.readthedocs.io/en/latest/ref/class-based-views/index.html) | [_分类索引_](https://django-chinese-docs.readthedocs.io/en/latest/ref/class-based-views/flattened-index.html)
-   **进阶:** [_生成 CSV_](https://django-chinese-docs.readthedocs.io/en/latest/howto/outputting-csv.html) | [_生成 PDF_](https://django-chinese-docs.readthedocs.io/en/latest/howto/outputting-pdf.html)
-   **中间件:** [_概述_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/middleware.html) | [_内置中间件_](https://django-chinese-docs.readthedocs.io/en/latest/ref/middleware.html)

## 模板层(template)[¶](#template "Permalink to this headline")

模板层提供了设计友好的语法来展示信息给用户。了解语法可让设计师知道如何使用，让程序员知道如何扩展：

-   **For 设计师:** [_语法概述_](https://django-chinese-docs.readthedocs.io/en/latest/topics/templates.html) | [_内置 tags 和 filters_](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/builtins.html) | [_Web 设计助手_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/webdesign.html) | [_人性化_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/humanize.html)
-   **For 程序员:** [_模板 API_](https://django-chinese-docs.readthedocs.io/en/latest/ref/templates/api.html) | [_自定义 tags 和 filters_](https://django-chinese-docs.readthedocs.io/en/latest/howto/custom-template-tags.html)

## 表单(Forms)[¶](#forms "Permalink to this headline")

Django 提供了一个丰富的框架可便利地创建表单及操作表单数据。

-   **基础:** [_概述_](https://django-chinese-docs.readthedocs.io/en/latest/topics/forms/index.html) | [_表单 API_](https://django-chinese-docs.readthedocs.io/en/latest/ref/forms/api.html) | [_内置字段_](https://django-chinese-docs.readthedocs.io/en/latest/ref/forms/fields.html) | [_内置小工具_](https://django-chinese-docs.readthedocs.io/en/latest/ref/forms/widgets.html)
-   **进阶:** [_模型表单_](https://django-chinese-docs.readthedocs.io/en/latest/topics/forms/modelforms.html) | [_表单外观_](https://django-chinese-docs.readthedocs.io/en/latest/topics/forms/media.html) | [_表单集_](https://django-chinese-docs.readthedocs.io/en/latest/topics/forms/formsets.html) | [_自定义验证_](https://django-chinese-docs.readthedocs.io/en/latest/ref/forms/validation.html)
-   **附加功能:** [_表单预览_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/formtools/form-preview.html) | [_表单向导_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/formtools/form-wizard.html)

## 开发流程[¶](#id3 "Permalink to this headline")

了解各种组件和工具来帮助你开发和测试 Django 应用：

-   **设置:** [_概述_](https://django-chinese-docs.readthedocs.io/en/latest/topics/settings.html) | [_全部设置列表_](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html)
-   **异常:** [_概述_](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html)
-   **django-admin.py 和 manage.py:** [_概述_](https://django-chinese-docs.readthedocs.io/en/latest/ref/django-admin.html) | [_添加自定义命令_](https://django-chinese-docs.readthedocs.io/en/latest/howto/custom-management-commands.html)
-   **测试:** [_介绍_](https://django-chinese-docs.readthedocs.io/en/latest/topics/testing/index.html) | [_编写和运行测试_](https://django-chinese-docs.readthedocs.io/en/latest/topics/testing/overview.html) | [_进阶主题_](https://django-chinese-docs.readthedocs.io/en/latest/topics/testing/advanced.html) | [_Doctests_](https://django-chinese-docs.readthedocs.io/en/latest/topics/testing/doctests.html)
-   **部署:** [_概述_](https://django-chinese-docs.readthedocs.io/en/latest/howto/deployment/index.html) | [_WSGI servers_](https://django-chinese-docs.readthedocs.io/en/latest/howto/deployment/wsgi/index.html) | [_FastCGI/SCGI/AJP_](https://django-chinese-docs.readthedocs.io/en/latest/howto/deployment/fastcgi.html) | [_处理静态文件_](https://django-chinese-docs.readthedocs.io/en/latest/howto/static-files.html) | [_通过电子邮件跟踪代码中的错误_](https://django-chinese-docs.readthedocs.io/en/latest/howto/error-reporting.html)

## 管理[¶](#id4 "Permalink to this headline")

你需要了解所有有关自动管理界面的信息，这是 Django 最流行的特性之一:

-   [_管理网站_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/admin/index.html)
-   [_管理操作_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/admin/actions.html)
-   [_管理文档生成器_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/admin/admindocs.html)

## 安全[¶](#id5 "Permalink to this headline")

开发 Web 应用时安全是最重要一个的主题，Django 提供了多重保护工具和机制:

-   [_安全概述_](https://django-chinese-docs.readthedocs.io/en/latest/topics/security.html)
-   [_Clickjacking 防护_](https://django-chinese-docs.readthedocs.io/en/latest/ref/clickjacking.html)
-   [_跨站请求伪造防护_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/csrf.html)
-   [_加密签名_](https://django-chinese-docs.readthedocs.io/en/latest/topics/signing.html)

## 国际化和本地化[¶](#id6 "Permalink to this headline")

Django 提供了一个强大的国际化和本地化框架，以协助您开发支持多国语言和世界各地区的应用：

-   [_概述_](https://django-chinese-docs.readthedocs.io/en/latest/topics/i18n/index.html) | [_国际化_](https://django-chinese-docs.readthedocs.io/en/latest/topics/i18n/translation.html) | [_本地化_](https://django-chinese-docs.readthedocs.io/en/latest/topics/i18n/translation.html#how-to-create-language-files)
-   [_“Local flavor”_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/localflavor.html)
-   [_时区_](https://django-chinese-docs.readthedocs.io/en/latest/topics/i18n/timezones.html)

## Python的兼容性[¶](#python "Permalink to this headline")

Django 目标是兼容多个不同特性和版本的 Python:

-   [_Jython 支持_](https://django-chinese-docs.readthedocs.io/en/latest/howto/jython.html)
-   [_Python 3 兼容性_](https://django-chinese-docs.readthedocs.io/en/latest/topics/python3.html)

## 地理框架[¶](#id7 "Permalink to this headline")

[_GeoDjango_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/gis/index.html) 打算做一个世界级的地理 Web 框架。 它的目标是尽可能轻松的构建 GIS Web 应用和应用空间数据的能力。

## 常用的web应用工具[¶](#web "Permalink to this headline")

Django 为开发 Web 应用的需要提供了多种常见的工具：

-   [_认证_](https://django-chinese-docs.readthedocs.io/en/latest/topics/auth/index.html)
-   [_缓存_](https://django-chinese-docs.readthedocs.io/en/latest/topics/cache.html)
-   [_日志_](https://django-chinese-docs.readthedocs.io/en/latest/topics/logging.html)
-   [_发送电子邮件_](https://django-chinese-docs.readthedocs.io/en/latest/topics/email.html)
-   [_聚合供稿(RSS/Atom)_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/syndication.html)
-   [_评论_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/comments/index.html), [_评论审核_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/comments/moderation.html) 和 [_自定义评论_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/comments/custom.html)
-   [_分页_](https://django-chinese-docs.readthedocs.io/en/latest/topics/pagination.html)
-   [_消息框架_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/messages.html)
-   [_序列化_](https://django-chinese-docs.readthedocs.io/en/latest/topics/serialization.html)
-   [_Sessions_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/sessions.html)
-   [_站点地图_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/sitemaps.html)
-   [_静态文件管理_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/staticfiles.html)
-   [_数据验证_](https://django-chinese-docs.readthedocs.io/en/latest/ref/validators.html)

## 其他核心功能[¶](#id8 "Permalink to this headline")

了解 Django 框架一些其他的核心功能：

-   [_按需处理内容_](https://django-chinese-docs.readthedocs.io/en/latest/topics/conditional-view-processing.html)
-   [_内容类型和泛型关系_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/contenttypes.html)
-   [_数据浏览_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/databrowse.html)
-   [_简单页面_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/flatpages.html)
-   [_重定向_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/redirects.html)
-   [_信号_](https://django-chinese-docs.readthedocs.io/en/latest/topics/signals.html)
-   [_sites 框架_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/sites.html)
-   [_在 Django 中使用 Unicode_](https://django-chinese-docs.readthedocs.io/en/latest/ref/unicode.html)

## Django 开源项目[¶](#id9 "Permalink to this headline")

了解 Django 项目本身的发展过程和你怎么做贡献：

-   **社区:** [_如何参与_](https://django-chinese-docs.readthedocs.io/en/latest/internals/contributing/index.html) | [_发布过程_](https://django-chinese-docs.readthedocs.io/en/latest/internals/release-process.html) | [_团队提交_](https://django-chinese-docs.readthedocs.io/en/latest/internals/committers.html) | [_Django 源码库_](https://django-chinese-docs.readthedocs.io/en/latest/internals/git.html) | [_安全策略_](https://django-chinese-docs.readthedocs.io/en/latest/internals/security.html)
-   **设计理念:** [_概述_](https://django-chinese-docs.readthedocs.io/en/latest/misc/design-philosophies.html)
-   **文档:** [_关于本文档_](https://django-chinese-docs.readthedocs.io/en/latest/internals/contributing/writing-documentation.html)
-   **第三方发行:** [_概述_](https://django-chinese-docs.readthedocs.io/en/latest/misc/distributions.html)
-   **Django 的过去:** [_API 稳定性_](https://django-chinese-docs.readthedocs.io/en/latest/misc/api-stability.html) | [_发行说明和升级说明_](https://django-chinese-docs.readthedocs.io/en/latest/releases/index.html) | [_功能弃用时间轴_](https://django-chinese-docs.readthedocs.io/en/latest/internals/deprecation.html)
