### urlclassifier3.sqlite

urlclassifier3.sqlite文件用于记录Firefox从Google抓取的反钓鱼网站和恶意站点数据的,但是这个文件大小在默认情况下会不断地增长,通过设置"urlclassifier.updatecachemax"可以限制urlclassifier3.sqlite的大小.

在Linux版本下"urlclassifier.updatecachemax"默认为104857600 (100 MB)

在地址栏输入about:config，出现一个警告，点击同意后进行高级设置。在过滤器中输入上面字串，改它的值为20971520（20m）。删除urlclassifier3.sqlite重新启动Firefox就可以了
