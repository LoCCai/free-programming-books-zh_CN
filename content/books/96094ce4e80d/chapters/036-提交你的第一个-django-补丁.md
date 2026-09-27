## 介绍[¶](#introduction "Permalink to this headline")

想为 Django 社区做一点贡献？也许是你发现了一个想修复的 bug，或者想添加一个新的功能。

回报 Django 这件事本身就是使你的顾虑得到解决的最好方式。一开始这可能会使你怯步，但这真的很简单。整个过程中我们会一步一步为你解说，所以你可以通过例子学习。

### 这个教程适合谁？[¶](#who-s-this-tutorial-for "Permalink to this headline")

使用教程前，我们希望你至少对于 Django 的运行方式有一定的认识。 这意味着你可以很容易地通读 [编写第一个 Django 应用](https://docs.djangoproject.com/zh-hans/2.0/intro/tutorial01/)。 除此之外，你应该对于 Python 有很好的理解。 如果不太熟悉 Python，我们为您推荐 [Dive Into Python](http://www.diveintopython3.net/)，对于初学Python的程序员来说这是一本很棒（而且免费）的在线电子书。

那些不熟悉版本控制系统及缺陷跟踪的朋友可以查看这个教程，这个链接包含了足够的信息。如果你打算定期地为 Django 做贡献，你可能期望阅读更多关于这些不同工具的资料。

当然对于此教程中的大部分内容，Django 会尽可能做出解释以帮助广大的读者。

### 这个指南涵盖哪些内容？[¶](#what-does-this-tutorial-cover "Permalink to this headline")

我们将指导你贡献你的第一个 Django 补丁，在本教程完毕时，你将对相关工具及流程有一个基本的认识。特别的，我们将覆盖以下内容：

-   安装 Git。
-   如何下载 Django 的开发版。
-   运行 Django 的测试套件。
-   为你的补丁写一个测试。
-   为你的补丁编写代码。
-   测试你的补丁。
-   提交一个 pull request（PR）。
-   在哪里查找更多的信息。

一旦你完成了这份教程，你可以浏览 [Django 贡献文档](https://docs.djangoproject.com/zh-hans/2.0/internals/contributing/) 的剩余部分。它包含了大量信息。任何想成为 Django 的正式贡献者的人都必须阅读它。如果你有问题，它也许会给你答案。

必须Python 3！

目前的 Django 版本不再支持 Python 2.7。你可以在 [Python 下载页](https://www.python.org/downloads/) 或通过操作系统的包管理器下载 Python 3。

对于 Windows 用户

在Windows上安装 Python 时，确保勾选在环境变量path中“添加 python.exe 的路径”，这样才可以让它在命令行下总是可用。

## 代码规范[¶](#code-of-conduct "Permalink to this headline")

作为一个贡献者, 你可以帮助我们保持 Django 的社区开放性和包容性。请仔细阅读并遵守我们的 [行为守则](https://www.djangoproject.com/conduct/)。

## 安装Git[¶](#installing-git "Permalink to this headline")

在本教程中，你需要安装好 Git，用 Git 下载 Django 的最新开发版本并且为你的修改生成补丁文件。

要检查你是否已经安装 Git，命令行输入 `git`。如果提示这个命令无法找到，你必须下载并安装它，参考 [Git's download page](https://git-scm.com/download)。

对于 Windows 用户

在 Windows 上安装 Git， 我们推荐勾选 "Git Bash" 选项， 以便 Git 能在它的独立 shell 下正常运行。本教程假定你这就是这样安装的。

如果你还不熟悉 Git, 你可以在命令行下输入 `git help` 了解更多关于 Git 命令的使用方法 (确保已安装)

## 获得一个 Django 开发版本的副本[¶](#getting-a-copy-of-django-s-development-version "Permalink to this headline")

为 Django 做贡献的第一步就是获取源代码副本。首先， fork Github 上的 Django 项目 <https://github.com/django/django/fork>。接下来，在命令行中，使用 `cd` 命令切换至某个你想存放 Django 源码的目录。

使用下面的命令来下载 Django 的源码库：

$ git clone git@github.com:YourGitHubName/django.git

现在，你有了 Django 的本地副本，你可以安装它，就像你用 `pip` 安装其它软件包一样。 最方便的方式是通过使用 _虚拟环境_ （或 virtualenv）， 这是 Python 的内置功能，可以将每个项目安装的软件包放在不同的目录内，确保它们不会互相干扰。

将你所有的 virtualenvs 保存在同一个地方是个不错的主意，例如你主目录下的 `.virtualenvs/`。如果这个文件夹不存在的话，创建它：

$ mkdir ~/.virtualenvs

现在创建新的虚拟运行环境

$ python3 -m venv ~/.virtualenvs/djangodev

该路径就是保存这个新的虚拟运行环境的地方。

对于 Windows 用户

如果你在 Windows 上使用 Git Bash shell，内置的 `venv` 模块将不会生效。因为激活脚本仅创建了系统 shell (`.bat`) 和 PowerShell (`.ps1`) 的版本。 转而使用下面安装的 `virtualenv` ：

$ pip install virtualenv
$ virtualenv ~/.virtualenvs/djangodev

Ubuntu 用户

在 Ubuntu 的某些版本使用以上命令可能会失败。可以换成 `virtualenv` 这个包名试试，不过，你要先确保已安装 `pip3`：

$ sudo apt-get install python3-pip
$ \# Prefix the next command with sudo if it gives a permission denied error
$ pip3 install virtualenv
$ virtualenv --python\=\`which python3\` ~/.virtualenvs/djangodev

最后一步是激活你的 virtualenv 设置：

$ source ~/.virtualenvs/djangodev/bin/activate

如果 `source` 命令不可用，你可以试试 . ：

$ . ~/.virtualenvs/djangodev/bin/activate

对于 Windows 用户

在 Windows 上激活你的 virtualenv，运行：

$ source ~/virtualenvs/djangodev/Scripts/activate

在你打开一个终端前，你必须先激活 virtualenv。 [virtualenvwrapper](https://virtualenvwrapper.readthedocs.io/en/latest/) 是个不错的工具，简化了此操作。

从现在开始你通过 `pip` 安装的软件包都将被安装在新的 virtualenv ，与其他环境和系统级包隔离。此外，命令行上显示了当前激活的 virtualenv 的名称，以帮助您跟踪您正在使用哪个环境。来吧，安装之前克隆的 Django 副本：

$ pip install -e /path/to/your/local/clone/django/

现在安装的 Django 版本就是你本地副本的版本。你将立刻见到任何你对它的修改，这对你编写第一个补丁很有帮助。

## 回滚至之前的 Django 版本[¶](#rolling-back-to-a-previous-revision-of-django "Permalink to this headline")

这个教程中，我们使用工单 [#24788](https://code.djangoproject.com/ticket/24788) 来作为学习用例，所以我们回顾 git 中 Django 的版本历史，找到一个这个问题的补丁没有提交之前的版本。 这样的话我们就可以参与到从草稿到完成补丁的全过程，包括运行 Django 的测试套件。

**请记住，我们将用 Django 的老版本来到达学习的目的，通常情况下你应当使用当前最新的开发版本来提交补丁并解决工单！**

首先打开 Django 源码的根目录（这个目录包含了 `django`， `docs`， `tests`， `AUTHORS`，等等）。然后你可以 check out 下面教程要用的较早版本的 Django ：

$ git checkout 4ccfc4439a7add24f8db4ef3960d02ef8ae09887

## 首先运行 Django 的测试套件[¶](#running-django-s-test-suite-for-the-first-time "Permalink to this headline")

当你贡献代码给 Django 的时候，你修改的代码千万不要给其它部分引入新的 bug。 有个办法可以在你更改代码之后检查 Django 是否能正常工作，就是运行 Django 的测试套件。如果所有的测试用例都通过，你就有理由相信你的改动完全没有破坏 Django。如果你从来没有运行过 Django 的测试套件，那么比较好的做法是事先运行一遍，熟悉下正常情况下应该输出什么结果。

运行测试套件之前，先 `cd` 进入 Django 的 `test/` 目录，安装其依赖，运行：

$ pip install -r requirements/py3.txt

如果安装过程中发生了错误，可能是你的系统缺少一个或多个 Python 依赖包。请参考安装失败的包的文档或者在网上搜索提示的错误信息。

现在你可以运行测试套件。如果你用的是 GNU/Linux， macOS 或者其它类 Unix 系统，运行：

$ ./runtests.py

现在坐下来放松一下。Django 完整的测试套件有超过 9600 种不同的测试，所以它需要运行 5 到 15 分钟，这取决于你的电脑的速度。

Django 的测试套件运行时，您将看到一个字符流代表每个测试的运行的状态。 `E` 表示测试中出现异常， `F` 表示断言失败。这两种情况都被认为测试失败， `x` 和 `s` 分别表示与期望结果不同和跳过测试，点表示测试通过。

缺失外部依赖库通常会导致测试被跳过；查看 [Running all the tests](https://docs.djangoproject.com/zh-hans/2.0/internals/contributing/writing-code/unit-tests/#running-unit-tests-dependencies) 获取依赖库列表，如果你修改了测试代码，请同时安装相关依赖库（本教程无需额外依赖库）。某些测试使用了特定的数据库后端，如果当前测试设置并未使用此数据库后端，那么这些相关的测试也会被跳过。SQLite 是默认的数据库后端。如果想使用其他后端进行测试，查看 [Using another settings module](https://docs.djangoproject.com/zh-hans/2.0/internals/contributing/writing-code/unit-tests/#running-unit-tests-settings)。

一旦测试完成，你将被告知测试通过与否。正因你尚未修改 Django 代码，整个测试套件 **应该** 成功通过。如果遇到失败或错误，请确认是否遵照了之前所有的步骤。查看 [Running the unit tests](https://docs.djangoproject.com/zh-hans/2.0/internals/contributing/writing-code/unit-tests/#running-unit-tests) 了解更多。如果你使用的是 Python 3.5+，可能会产生一些和 deprecation 警告相关的失败，可忽略。这些失败已在 Django 中得到修复。

注意最新版本 Django 分支不总是稳定的。当在分支上开发时，你可以查看代码持续集成构建页面的信息 [Django's continuous integration builds](https://djangoci.com) 来判断测试错误只在你指定的电脑上发生，还是官方版本中也存在该错误。如果点击某个构建信息，可以通过 "Configuration Matrix" 查看错误发生时 Python 以及后端数据库的信息。

Note

在本教程以及处理工单所用分支中，测试使用数据库 SQLite 即可，然而在某些情况下需要（有时需要） ，参考 :ref:[\`](#id1)run the tests using a different database [\`](#id3)。

## 为你的补丁创建一个分支[¶](#creating-a-branch-for-your-patch "Permalink to this headline")

在做出任何修改之前，为你的工单创建一个分支：

$ git checkout -b ticket\_24788

你可以选择任何名称来命名你的分支，"ticket\_24788" 是一个例子。所有在这个分支的修改只会对特定的工单生效，不会影响我们之前克隆的主分支。

## 为你的工单写一些测试用例[¶](#writing-some-tests-for-your-ticket "Permalink to this headline")

大多数情况下，Django 的补丁必需包含测试。Bug 修复补丁的测试是一个回归测试，确保该 Bug 不会再次在 Django 中出现。该测试应该在 Bug 存在时测试失败，在 Bug 已经修复后通过测试。新功能补丁的测试必须验证新功能是否正常运行。新功能的测试将在功能正常时通过测试，功能未执行时测试失败。

最好的方式是在修改代码之前写测试单元代码。这种开发风格叫做 [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) 被应用在项目开发和单一补丁开发过程中。单元测试编写完毕后，执行单元测试，此时测试失败（因为目前还没有修复 bug 或添加新功能），如果测试成功通过，你需要重新修改单元测试保证测试失败。因为单元测试并不能阻止 bug 发生。

现在看我们的操作示例。

### 为工单 #24788 写测试[¶](#writing-some-tests-for-ticket-24788 "Permalink to this headline")

工单 [#24788](https://code.djangoproject.com/ticket/24788) 提议增加小特性：为表单类指定类级别的属性 `prefix`，以便:

\[…\] forms which ship with apps could effectively namespace themselves such
that N overlapping form fields could be POSTed at once and resolved to the
correct form.

为解决此工单，我们为 `BaseForm` 类添加了 `prefix` 属性。当创建该类实例时， 向 `__init__()` 方法传递 prefix 时，设置的仍然是实例属性 prefix。当不传递 prefix（或者传递值为 `None`）时，将会使用类级别的 prefix。 在我们作出修改前，我们先写一些测试来验证我们修改的功能无误，进而确保它在将来也不会出现问题。

前往 Django 的 `tests/forms_tests/tests/` 目录并打开 `test_forms.py` 文件。在 1674 行附近的 `test_forms_with_null_boolean` 函数之前插入以下代码：

def test\_class\_prefix(self):
    \# Prefix can be also specified at the class level.
    class Person(Form):
        first\_name \= CharField()
        prefix \= 'foo'

    p \= Person()
    self.assertEqual(p.prefix, 'foo')

    p \= Person(prefix\='bar')
    self.assertEqual(p.prefix, 'bar')

这个新测试用来检查：按预想设定了类级别的 prefix，创建实例时传递 `prefix` 参数仍然有效。

### 运行你的新测试[¶](#running-your-new-test "Permalink to this headline")

事实上，我们还没有对 `BaseForm` 做出任何修改，所以我们的测试将会失败。让我们运行 `forms_tests` 下所有的测试来看看会发生什么。在命令行中使用 `cd` 进入 Django 的 `tests/` 目录并运行：

$ ./runtests.py forms\_tests

如果测试执行正确，你应该能看到一个错误，正好由我们刚添加的测试方法报告。如果所有测试都通过了，你应该确认下是否将上述新的测试代码加到了合适的文件夹和类里。

## 为你的工单编写代码[¶](#writing-the-code-for-your-ticket "Permalink to this headline")

下一步我们将把在工单 [#24788](https://code.djangoproject.com/ticket/24788) 中描述的功能添加进 Django。

### 为工单 #24788 编写代码[¶](#writing-the-code-for-ticket-24788 "Permalink to this headline")

进入 `django/django/forms/` 文件夹并打开 `forms.py` 文件。找到第 72 行的 `BaseForm` 类，在 `field_order` 属性之后添加 `prefix` 类属性:

class BaseForm:
    \# This is the main implementation of all the Form logic. Note that this
    \# class is different than Form. See the comments by the Form class for
    \# more information. Any improvements to the form API should be made to
    \# \*this\* class, not to the Form class.
    field\_order \= None
    prefix \= None

### 确保你的测试现在通过了[¶](#verifying-your-test-now-passes "Permalink to this headline")

修改 Django 源码后，我们通过之前编写的测试方法来验证源码修改是否工作正常。运行测试 `forms_tests` 目录下所有的测试方法， `cd` 进入 Django 的 `tests/` 目录然后运行：

$ ./runtests.py forms\_tests

哦，好消息是我们写了这些测试用例！不过，你仍收到一个异常:

AssertionError: None != 'foo'

我们忘了在 `__init__` 方法中添加条件语句。在 `django/forms/forms.py` 中，更改现在在第 87 行的代码 `self.prefix = prefix`，添加一个条件语句:

if prefix is not None:
    self.prefix \= prefix

重新运行测试方法会通过所有测试。如果没有通过测试，请重新确认是否按要求修改了上面提到的类 `BaseForm`，以及新添加的测试方法是否被正确复制到指定位置。

## 第二次运行 Django 测试套件[¶](#running-django-s-test-suite-for-the-second-time "Permalink to this headline")

如果已经确认补丁以及测试结果都正常，就运行 Django 的测试套件，验证你的修改是否导致 Django 的其它部分引入了新的 bug。 虽然测试用例帮助识别容易被人忽略的错误，但测试通过并不能保证完全没有 bug 存在。

运行 Django 完整的测试用例，`cd` 进入 Django下的 `tests/` 目录并运行：

$ ./runtests.py

只要没有看到测试异常，你就可以继续下一步。

## 书写文档[¶](#writing-documentation "Permalink to this headline")

这个新功能信息应该被记录成文档。在 `django/docs/ref/forms/api.txt` 第 1068 行（在文件末）添加以下部分内容:

The prefix can also be specified on the form class::

    >>> class PersonForm(forms.Form):
    ...     ...
    ...     prefix = 'person'

.. versionadded:: 1.9

    The ability to specify \`\`prefix\`\` on the form class was added.

由于一新功能将在未来的某个版本被加入，所以 Django 1.9 的发布说明里加入了相关内容，在文件 `docs/releases/1.9.txt` 第 164 行 "Forms" 部分:

\* A form prefix can be specified inside a form class, not only when
  instantiating a form. See :ref:\`form-prefix\` for details.

更多关于编写文档和 `versionadded` 的解释和信息，请参考 [编写文档](https://docs.djangoproject.com/zh-hans/2.0/internals/contributing/writing-documentation/)。这个页面还介绍了怎么在本地重新生成一份文档，方便你在本地预览文档。

## 预览你的修改[¶](#previewing-your-changes "Permalink to this headline")

现在让我们检查一下补丁里作出的修改。为列出当前 Django 副本（包含你的修改）和先前教程中签出的初始版本间的差异：

$ git diff

使用方向键上下移动

diff --git a/django/forms/forms.py b/django/forms/forms.py
index 509709f..d1370de 100644
\--- a/django/forms/forms.py
+++ b/django/forms/forms.py
@@ -75,6 +75,7 @@ class BaseForm:
     # information. Any improvements to the form API should be made to \*this\*
     # class, not to the Form class.
     field\_order = None
\+    prefix = None

     def \_\_init\_\_(self, data=None, files=None, auto\_id='id\_%s', prefix=None,
                  initial=None, error\_class=ErrorList, label\_suffix=None,
@@ -83,7 +84,8 @@ class BaseForm:
         self.data = data or {}
         self.files = files or {}
         self.auto\_id = auto\_id
\-        self.prefix = prefix
\+        if prefix is not None:
\+            self.prefix = prefix
         self.initial = initial or {}
         self.error\_class = error\_class
         # Translators: This is the default suffix added to form field labels
diff --git a/docs/ref/forms/api.txt b/docs/ref/forms/api.txt
index 3bc39cd..008170d 100644
\--- a/docs/ref/forms/api.txt
+++ b/docs/ref/forms/api.txt
@@ -1065,3 +1065,13 @@ You can put several Django forms inside one \`\`<form>\`\` tag. To give each
     >>> print(father.as\_ul())
     <li><label for="id\_father-first\_name">First name:</label> <input type="text" name="father-first\_name" id="id\_father-first\_name" /></li>
     <li><label for="id\_father-last\_name">Last name:</label> <input type="text" name="father-last\_name" id="id\_father-last\_name" /></li>
+
+The prefix can also be specified on the form class::
+
\+    >>> class PersonForm(forms.Form):
\+    ...     ...
\+    ...     prefix = 'person'
+
+.. versionadded:: 1.9
+
\+    The ability to specify \`\`prefix\`\` on the form class was added.
diff --git a/docs/releases/1.9.txt b/docs/releases/1.9.txt
index 5b58f79..f9bb9de 100644
\--- a/docs/releases/1.9.txt
+++ b/docs/releases/1.9.txt
@@ -161,6 +161,9 @@ Forms
   :attr:\`~django.forms.Form.field\_order\` attribute, the \`\`field\_order\`\`
   constructor argument , or the :meth:\`~django.forms.Form.order\_fields\` method.

+\* A form prefix can be specified inside a form class, not only when
\+  instantiating a form. See :ref:\`form-prefix\` for details.
+
 Generic Views
 ^^^^^^^^^^^^^

diff --git a/tests/forms\_tests/tests/test\_forms.py b/tests/forms\_tests/tests/test\_forms.py
index 690f205..e07fae2 100644
\--- a/tests/forms\_tests/tests/test\_forms.py
+++ b/tests/forms\_tests/tests/test\_forms.py
@@ -1671,6 +1671,18 @@ class FormsTestCase(SimpleTestCase):
         self.assertEqual(p.cleaned\_data\['last\_name'\], 'Lennon')
         self.assertEqual(p.cleaned\_data\['birthday'\], datetime.date(1940, 10, 9))

\+    def test\_class\_prefix(self):
\+        # Prefix can be also specified at the class level.
\+        class Person(Form):
\+            first\_name = CharField()
\+            prefix = 'foo'
+
\+        p = Person()
\+        self.assertEqual(p.prefix, 'foo')
+
\+        p = Person(prefix='bar')
\+        self.assertEqual(p.prefix, 'bar')
+
     def test\_forms\_with\_null\_boolean(self):
         # NullBooleanField is a bit of a special case because its presentation (widget)
         # is different than its data. This is handled transparently, though.

当你检查完补丁后，敲击 `q` 键返回到命令行。如果补丁内容看起来没问题，可以提交这些修改了。

## 提交补丁中的修改[¶](#committing-the-changes-in-the-patch "Permalink to this headline")

为了提交这些修改：

$ git commit -a

这会打开文本编辑器以便输入提交信息。参考 [commit message guidelines](https://docs.djangoproject.com/zh-hans/2.0/internals/contributing/committing-code/#committing-guidelines) 输入类似这样的信息：

Fixed #24788 -- Allowed Forms to specify a prefix at the class level.

## 推送这次提交并生成一个 pull 请求[¶](#pushing-the-commit-and-making-a-pull-request "Permalink to this headline")

提交补丁后，将它发送至你在 GitHub 上 fork 的仓库（用你的分支名替换 "ticket\_24788"，如果你的分支名不是遵照教程）：

$ git push origin ticket\_24788

你可以访问 [Django GitHub page](https://github.com/django/django/) 创建一个 pull 请求。 你会在“你最近推送的分支”下看到你的分支。 单击旁边的 "Compare & pull request"。

本教程中请不要这么做。不过，在接下来显示补丁预览的页面，你可以单击 "Create pull request"。

## 下一步[¶](#next-steps "Permalink to this headline")

恭喜，你已经学会了如何为 Django 创建 pull request！如需获知更多高级技巧，参考 [Working with Git and GitHub](https://docs.djangoproject.com/zh-hans/2.0/internals/contributing/writing-code/working-with-git/)。

现在你可以活用这些技能帮助改善 Django 的代码库。

### 针对新贡献者的更多注意事项[¶](#more-information-for-new-contributors "Permalink to this headline")

在你开始为 Django 编写补丁时，这里有些信息，你应该看一看：

-   确保你阅读了 Django 的参考文档 [创建工单和提交补丁](https://docs.djangoproject.com/zh-hans/2.0/internals/contributing/writing-code/submitting-patches/)。它涵盖了Trac 规则，如何创建自己的工单，补丁期望的代码风格和其他一些重要信息。
-   初次提交补丁应额外阅读 [首次贡献者文档](https://docs.djangoproject.com/zh-hans/2.0/internals/contributing/new-contributors/)。这里有很多对新手贡献者的建议。
-   接下来，如果你渴望更多关于为 Django 做贡献的信息，可以阅读余下的文档 [为 Django 文档上作出贡献](https://docs.djangoproject.com/zh-hans/2.0/internals/contributing/)。它包含了大量的有用信息，这里可以解决你可能遇到的所有问题。

### 创建完 pull request，下一步做什么呢？[¶](#what-s-next-after-creating-a-pull-request "Permalink to this headline")

工单有了补丁后，需要他人来复审。提交 pull 请求后，为工单打上如“有补丁”，“无需测试”之类的标签，如此他人便可查找到该工单以便复审。从头开始编写补丁固然是贡献的一种方式，但复审已有补丁同样能帮助 Django。 查看 [Triaging tickets](https://docs.djangoproject.com/zh-hans/2.0/internals/contributing/triaging-tickets/) 了解更多。
