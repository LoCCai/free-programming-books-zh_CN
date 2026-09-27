### 第一次印刷

-   第3章 - 3.4.2 - 52 页，感谢 @止沸 的指正
    
    -   拼写错误，少了个s，错误内容：
        
        ```
          MIDDLEWARE = [
              'student.middleware.TimeItMiddleware',
              # 省略其他
          ]
        ```
        
    -   修订为:
        
        ```
          MIDDLEWARE = [
              'student.middlewares.TimeItMiddleware',
        
              # 省略其他
          ]
        ```
        
-   第4章 - 4.2.1 小节 - 70页，感谢 @Yangzhedi 的指正
    
    -   拼写错误，错误内容： `$ source bin/activite`
    -   修订为： `$ source bin/activate`
-   第5章 - 5.4.5 - 106 页, 感谢 @jasonqiao36 的指正
    
    -   缩进问题，错误内容：
        
        ```
          from django.db.models import F
              post = Post.objects.get(id=1)
              post.pv = F('pv') + 1
              pos.save()
        ```
        
    -   修订为:
        
        ```
          from django.db.models import F
          post = Post.objects.get(id=1)
          post.pv = F('pv') + 1
          post.save()
        ```
        
-   第7章 - 7.2.2 小节 - 147页，感谢 @092113219，@faple 的指正
    
    -   缺少返回值，错误内容：
        
        ```
          @classmethod
          def latest_posts(cls):
              queryset = cls.objects.filter(status=cls.STATUS_NORMAL)| $ source bin/activate |
        ```
        
    -   修订为：
        
        ```
          @classmethod
          def latest_posts(cls):
              queryset = cls.objects.filter(status=cls.STATUS_NORMAL)
              return queryset
        ```
        

-   第9章 - 9.5.2 - 205 页，感谢 @moneys 的指正
    
    -   拼写错误，错误内容：
        
        ```
          if not cache.get(uv_key):
              increase_uv = True
              cache.set(pv_key, 1, 24*60*60)
        ```
        
    -   修订为:
        
        ```
          if not cache.get(uv_key):
              increase_uv = True
              cache.set(uv_key, 1, 24*60*60)
        ```
        

### 第二印

-   第 3 章 - 3.4.3 - 56 页 - 漏写括号， 感谢 @weixianshan 的指正
    
    -   错误内容：
        
        读者可以尝试把test.py文件中的 student.sex\_show 改为student.get\_sex\_display试试。
        
        -   修改为：
            
            读者可以尝试把test.py文件中的 student.sex\_show 改为student.get\_sex\_display()试试。
            
-   第 6 章 - 6.2.2 - 122 页 typo，感谢 图灵社区 @zerosail @PaperSheep 的指正
    
    -   错误内容：
        
        ```
        filter_horizontal = ('tags', )
        filter_vertical = ('tags', )
        ```
        
    -   应改为：
        
        ```
        filter_horizontal = ('tag', )
        filter_vertical = ('tag', )
        ```
        
-   第 6 章 - 6.3.1 - 130 页 - 重复，感谢 图灵社区 @zerosail 的指正
    
    -   错误内容： save\_on\_top = True
        
    -   该行代码与第129页的倒数第三行代码重复了
        
-   第8章 - 8.2.2 - 179 页，感谢「Django企业开发实战」 @秋 的指正
    
    -   拼写错误，错误内容：
        
        ```
          <span class="card-link">分类:<a href="{% url 'category-list' cate.id %}">{{ post.category.name }}</a></span>
        ```
        
    -   修订为:
        
        ```
          <span class="card-link">分类:<a href="{% url 'category-list' post.category.id %}">{{ post.category.name }}</a></span>
        ```
        
-   第11章 - 11.1.1 - 237 页，感谢 [@eat](https://github.com/eat-fan) 的指正
    
    -   djangorestframewrok 包错写为 django-rest-framework,错误内容:
        
        ```
          pip install django-rest-framework==3.8.2
        ```
        
    -   修订为:
        
        ```
          pip install djangorestframework==3.8.2
        ```
        
-   第 14 章 - 14.3.4 - 308 页 supervisor 已经支持 Python 3
    
    -   需要修改内容：
        
        ```
        对这些配置有了大概的了解后，需要先来安装: ``pip install supervisor``这里需要注意的是，我们对于目前的使用方式有两种，主要是在Python 2和Python 3项目中的差别，对于Python 2的项目，我们会在虚拟环境中安装supervisor。而在Python 3中会在系统上安装，虚拟环境使用系统（全局）的supervisor来管理进程。这么用的原因在于supervisor针对Python 3的版本还没有最终release。
        
        不过对于个人项目可以尝试直接从github安装最新的包: ``pip install git+https://github.com/Supervisor/supervisor``，使用基于兼容了Python3的版本。我们这里也是从github安装目前最新的supervisor（4.0.0dev0）。
        
        或者使用作者fork出来的分支做的release：
        
          pip install https://github.com/the5fire/supervisor/archive/4.0.0dev0.zip
        ```
        
    -   修改为：
        
        ```
        对这些配置有了大概的了解后，需要先来安装: ``pip install supervisor==4.0.2``。
        ```
        
-   第14章 - 14.3.6 - 312 页
    
    -   djangorestframewrok 包错写为 django-rest-framework,错误内容:
        
        ```
          django-rest-framework==0.1.0
        ```
        
    -   修订为:
        
        ```
          djangorestframework==3.8.2
        ```
        

### 第三印

-   第1章 - 1.4.1 - 10 页，数据库实体对象图中 datetime 字段类型错误，感谢 Github 网友：@panxingj 的反馈
    
    -   错误内容为：
        
        图中 SideBar 实体中的 created\_time 字段类型设置为 str
        
    -   修订为
        
        SideBar 中的 created\_time 字段类型应该为 datetime
        
-   第1章 - 1.4.2 - 11 页，脑图部分在线链接问题，感谢公众号读者：sky 的反馈
    
    -   短网址被新浪限频了，错误内容： 上图使用百度脑图工具制作，在线版：[http://t.cn/R14lkXe](http://t.cn/R14lkXe) 密码: GTDL
        
    -   修正为:
        
        上图使用百度脑图工具制作，在线版：[http://naotu.baidu.com/file/3f7f8238a936155341cac37aaac40a66?token=96dd1b636b4bc558](http://naotu.baidu.com/file/3f7f8238a936155341cac37aaac40a66?token=96dd1b636b4bc558) 密码: GTDL
        
-   第3章 - 3.4.2 - 52 页，感谢 图灵社区@hanshanjie 提醒
    
    -   英文语法错误，错误内容：
        
        ```
          print('request to response cose: {:.2f}s'.format(costed))
        ```
        
    -   修订为:
        
        ```
          print('request to response cost: {:.2f}s'.format(costed))
        ```
        
-   第5章 - 5.4.2 - 103页，感谢 Github 网友 @jpch89 的指正
    
    -   第二行代码少了缩进：
        
        ```
        try:
        post = Post.objects.get(id=1)
        # 其余代码省略
        ```
        
    -   修订为：
        
        ```
        try:
          post = Post.objects.get(id=1)
        # 其余代码省略
        ```
        
-   第6章 - 6.1.1 - 114 页, 感谢 Github 网友 @jpch89 的指正
    
    -   内容优化，原内容为：
        
        ```
        list_display_links: 用来配置哪些字段可以作为链接，点击它们，可以进入编辑页面。
        ```
        
    -   优化为
        
        ```
        list_display_links: 用来配置哪些字段可以作为链接，点击它们，可以进入编辑页面。如果设置为 None，则表示不配置任何可点击的字段。
        ```
        
-   第6章 - 6.2.1 - 119 页，感谢 图灵社区@limyel 提醒
    
    -   代码优化，待优化内容：
        
        ```
          def queryset(self, request, queryset):
              category_id = self.value()
              if category_id:
                  return queryset.filter(category_id=self.value())
              return queryset
        ```
        
    -   修订为:
        
        ```
          def queryset(self, request, queryset):
              category_id = self.value()
              if category_id:
                  return queryset.filter(category_id=category_id))
              return queryset
        ```
        
-   第6章 - 6.2.4 - 123 页, 感谢 Github 网友 @jpch89 的指正
    
    -   字段名写错，原内容：
        
        ```
        我们通过 Form 来定制 status 这个字段的展示：
        ```
        
    -   修订为：
        
        ```
        我们通过 Form 来定制 desc 这个字段的展示：
        ```
        
-   第6章 - 6.3 - 127 页, 感谢 Github 网友 @jpch89 的指正
    
    -   方法名写错
        
        ```
        之前我们在 PostAdmin 中重写了 save 方法
        ```
        
    -   修订为
        
        ```
        之前我们在 PostAdmin 中重写了 save_model 方法
        ```
        
-   第6章 - 6.3.1 - 129 页
    
    -   代码优化，待优化内容：
        
        ```
          def queryset(self, request, queryset):
              category_id = self.value()
              if category_id:
                  return queryset.filter(category_id=self.value())
              return queryset
        ```
        
    -   修订为:
        
        ```
          def queryset(self, request, queryset):
              category_id = self.value()
              if category_id:
                  return queryset.filter(category_id=category_id))
              return queryset
        ```
        

-   第8章 - 8.2.2 - 178 页, 感谢 Github 网友 @jpch89 的指正
    
    -   代码错误，action 修改为 method 原内容为：
        
        ```
        <form class="form-inline my-2 my-lg-0" action='GET'>
        ```
        
    -   修订为:
        
        ```
        <form class="form-inline my-2 my-lg-0" method='GET'>
        ```
        
-   第9章 - 9.1.1 - 185页, 感谢 Github 网友 [@jpch89](https://github.com/jpch89) 的指正
    
    -   SQL 字段写错，原内容为：
        
        ```
        SELECT * FROM post WHERE title ILIKE '%<keyword>%' or title ILIKE '%<keyword>%'
        ```
        
    -   修订为:
        
        ```
        SELECT * FROM post WHERE title ILIKE '%<keyword>%' or desc ILIKE '%<keyword>%'
        ```
        

未归类：

[https://github.com/the5fire/django-practice-book/issues/34](https://github.com/the5fire/django-practice-book/issues/34)

[https://github.com/the5fire/django-practice-book/issues/35](https://github.com/the5fire/django-practice-book/issues/35)

[https://github.com/the5fire/django-practice-book/issues/40](https://github.com/the5fire/django-practice-book/issues/40)

提交勘误渠道：

-   Github： [https://github.com/the5fire/django-practice-book/issues](https://github.com/the5fire/django-practice-book/issues)
-   图灵社区：[http://www.ituring.com.cn/book/2663](http://www.ituring.com.cn/book/2663)

《Django企业开发实战》购买地址：

-   京东：[https://item.jd.com/12537842.html](https://item.jd.com/12537842.html)
-   当当：[http://product.dangdang.com/26509799.html](http://product.dangdang.com/26509799.html)
