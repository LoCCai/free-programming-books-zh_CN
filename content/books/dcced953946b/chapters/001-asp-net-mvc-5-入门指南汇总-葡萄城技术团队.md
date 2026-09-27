经过前一段时间的翻译和编辑，我们陆续发出12篇ASP.NET MVC 5的入门文章。其中大部分翻译自[ASP.NET MVC 5 官方教程](http://www.ASP.NET/mvc/tutorials/mvc-5/introduction)，由于本系列文章言简意赅，篇幅适中，从一个web网站示例开始讲解，全文最终完成了一个管理影片的小系统，非常适合新手入门ASP.NET MVC 5 (新增、删除、查询、更新) ，并由此开始开发工作。

![](http://i1.asp.net/images/ui/home-slideshow-asp.png?cdn_id=r16)

现将12篇文章汇总如下：

1\. [ASP.NET MVC 5 - 开始MVC 5之旅](http://www.cnblogs.com/powertoolsteam/p/aspnet-mvc5-getting-started.html)

2\. [ASP.NET MVC 5 - 控制器](http://www.cnblogs.com/powertoolsteam/p/aspnet-mvc5-controller.html)

3\. [ASP.NET MVC 5 - 视图](http://www.cnblogs.com/powertoolsteam/p/aspnet-mvc5-view.html)

4\. [ASP.NET MVC 5 - 将数据从控制器传递给视图](http://www.cnblogs.com/powertoolsteam/p/aspnet-mvc5-data-transfer-c2v.html)

5\. [ASP.NET MVC 5 - 添加一个模型](http://www.cnblogs.com/powertoolsteam/p/aspnet-mvc5-add-model.html)

6\. [ASP.NET MVC 5 - 创建连接字符串(Connection String)并使用SQL Server LocalDB](http://www.cnblogs.com/powertoolsteam/p/aspnet-mvc5-create-connection-string.html)

7\. [ASP.NET MVC 5 - 从控制器访问数据模型](http://www.cnblogs.com/powertoolsteam/p/aspnet-mvc5-access-data-model.html)

8\. [ASP.NET MVC 5 - 验证编辑方法(Edit method)和编辑视图(Edit view)](http://www.cnblogs.com/powertoolsteam/p/aspnet-mvc5-edit-method-edit-view.html)

9\. [ASP.NET MVC 5 - 给电影表和模型添加新字段](http://www.cnblogs.com/powertoolsteam/p/aspnet-mvc5-add-fields-to-movie.html)

10\. [ASP.NET MVC 5 - 给数据模型添加校验器](http://www.cnblogs.com/powertoolsteam/p/aspnet-mvc5-add-filter-to-model.html)

11\. [ASP.NET MVC 5 - 查询Details和Delete方法](http://www.cnblogs.com/powertoolsteam/p/3656203.html)

12\. [ASP.NET MVC 5 - 使用Wijmo MVC 5模板1分钟创建应用](http://www.cnblogs.com/powertoolsteam/p/create-mvc5-app-by-wijmo-template.html)

本教程将使用[Visual Studio 2013](http://www.microsoft.com/visualstudio/eng/2013-downloads)手把手教你构建一个入门的ASP.NET MVC 5 Web应用程序。本教程配套的C#源码工程可通过如下网址下载：[C#版本源码链接](http://archive.msdn.microsoft.com/Project/Download/FileDownload.aspx?ProjectName=aspnetmvcsamples&DownloadId=16400)。同时，请查阅 [Building the Chapter Downloads](http://www.asp.net/mvc/tutorials/getting-started-with-ef-using-mvc/building-the-ef5-mvc4-chapter-downloads) 来完成编译源码和配置数据库。

在本教程中的源码工程，您可在Visual Studio中可运行MVC 5应用程序。您也可以使Web应用程序部署到一个托管服务提供商上。微软提供免费的网络托管多达10个网站，[free Windows Azure trial account](http://www.windowsazure.com/en-us/pricing/free-trial/?WT.mc_id=A443DD604)。本教程由Scott Guthrie (twitter @scottgu ), Scott Hanselman (twitter: @shanselman ), and Rick Anderson ( @RickAndMSFT )共同写作完成，由[葡萄城控件技术团队](http://www.cnblogs.com/powertoolsteam/)（新浪微博 [@葡萄城控件](http://weibo.com/powertools)）翻译编辑发布。通过以上12篇MVC的入门文章的学习，相信大家会对MVC的理解深入很多。我们在进行MVC开发时，还可以借助一些开发工具来助力开发过程。使用 [ComponentOne Studio ASP.NET MVC](http://www.gcpowertools.com.cn/products/componentonemvc/) 这款轻量级控件，可以助力MVC开发过程。

希望这些文章对感兴趣的朋友有所帮助，另附上PDF版的汇总文档：

[ASP.NET MVC 5 入门指南](https://files.cnblogs.com/powertoolsteam/ASP.NET_MVC5_%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97.pdf)

**相关阅读：**

[微软 Build 2017 开发者大会：Azure 与 AI 的快速发展](http://www.cnblogs.com/powertoolsteam/p/Microsoft_2017_build.html)

[是什么让C＃成为最值得学习的编程语言](http://www.cnblogs.com/powertoolsteam/p/net_core_c_sharp.html)

[从Visual Studio看微软20年技术变迁](http://www.cnblogs.com/powertoolsteam/p/microsoft_20.html)

[C#开发人员应该知道的13件事情](http://www.cnblogs.com/powertoolsteam/p/csharp.html)

[Visual Studio 2017正式版发布全纪录](http://www.cnblogs.com/powertoolsteam/p/Visual_Studio_2017.html)
