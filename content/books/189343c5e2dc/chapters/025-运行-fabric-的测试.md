Fabric 保持着 100% 的测试通过率，提交的补丁也应该尽可能包括相应的测试，以便于检验 & 合并。

开发 Fabric 时，最好建立一个独立的 [virtualenv](https://virtualenv.pypa.io/en/latest/) 环境来安装依赖并运行测试。

## 初次设置[¶](#first-time-setup "永久链接至标题")

-   在 GitHub 上 fork [repository](https://github.com/fabric/fabric)
    
-   把你 fork 出来的代码库 clone 到本地（例如： `git clone git@github.com:<your_username>/fabric.git`)
    
-   `cd fabric`
-   `virtualenv env`
-   `. env/bin/activate`
-   `pip install -r requirements.txt`
-   `python setup.py develop`

## 运行测试[¶](#running-tests "永久链接至标题")

激活 virtualenv（ `. env/bin/activate` ）并安装好依赖后可以这样运行测试：

nosetests tests/

你需要在 `master` （或者正处理的 release 分支）运行测试，来保证自己的修改/测试没有问题。

如果你已经在 Fabric 代码库中运行过 `python setup.py develop` ，也可以执行：

fab test

它会额外执行 doctest，并提供彩色输出结果。
