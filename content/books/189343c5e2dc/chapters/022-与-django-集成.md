0.9.2 新版功能.

这些函数提高了初始化 Django 配置中环境变量的效率，运行后即可从 Django 项目或者 Django 本身中提取环境变量，而不需要每次使用 fabfile 时都亲自设置环境变量，或者使用 `manage.py` 插件。

目前，这些函数仅支持 Fabric 和 fabfile 以及它能引用到的 Django 库交互。听起来限制了你的使用，其实不然。在下面的例子中，你可以像在本地一样使用 Fabric 作为作为“构建”工具：

from fabric.api import run, local, hosts, cd
from fabric.contrib import django

django.project('myproject')
from myproject.myapp.models import MyModel

def print\_instances():
    for instance in MyModel.objects.all():
        print(instance)

@hosts('production-server')
def print\_production\_instances():
    with cd('/path/to/myproject'):
        run('fab print\_instances')

由于两边都安装了 Fabric，你在本地执行 `print_production_instances` 将在生产服务器上触发 `print_instances` 函数，而它将会和远程环境中的 Django 数据库交互。

在下面这个例子中，如果本地和远程使用相同的 settings，那么你可以把数据库等设置放在 fabfile 中，这样在远程（无 Fabric）命令中也能使用。这保证即使只有本地安装了 Fabric 也能灵活地使用：

from fabric.api import run
from fabric.contrib import django

django.settings\_module('myproject.settings')
from django.conf import settings

def dump\_production\_database():
    run('mysqldump -u %s -p=%s %s > /tmp/prod-db.sql' % (
        settings.DATABASE\_USER,
        settings.DATABASE\_PASSWORD,
        settings.DATABASE\_NAME
    ))

上面的代码片段可以在本地开发环境运行，将本地的 `settings.py` 镜像到远程以共享数据库连接信息。

`fabric.contrib.django.``project`(_name_)[¶](#fabric.contrib.django.project "永久链接至目标")

将 `DJANGO_SETTINGS_MODULE` 设置为 `'<name>.settings'` 。

该函数使用 Django 自带的 settings 文件或路径命名转换的功能提供了一个简便的常见问题解决方案。

使用 [`settings_module`](#fabric.contrib.django.settings_module "fabric.contrib.django.settings_module") —— 详细的使用和原理参见其文档。

`fabric.contrib.django.``settings_module`(_module_)[¶](#fabric.contrib.django.settings_module "永久链接至目标")

将 `DJANGO_SETTINGS_MODULE` 控制台环境变量设置为 `module` 。

由于 Django 的工作原理所限，从 Django 或者 Django 项目中导入对象必须保证 `DJANGO_SETTINGS_MODULE` 设置正确（参见 [Django 设置文档](http://docs.djangoproject.com/en/dev/topics/settings/) ）。

这个函数提供了一个简易的写法，只需要在 fabfile 或者 Fabric 调用的文件中调用它，之后从 Django 引用对象时便不再有问题。

注解

本函数通过修改 `os.environ` 来修改 **shell** 环境变量，并不会对 Fabric 的 `env` 带来任何影响。
