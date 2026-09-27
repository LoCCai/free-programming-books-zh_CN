本来打算先写一篇python程序如何打包的文章，但是又不愿意测试打包的时候把那些demo程序安装到python的库以及usr的bin里。

因此先介绍下如何创建以虚拟的python运行环境，做完实验之后直接把虚拟环境删除即可。

这个工具叫virtualenv，是使用python开发的一个创建虚拟环境的工具，源码官网地址：https://github.com/pypa/virtualenv

刚用到这个东西时，会联想到虚拟机和影子系统，不过相比于后两者，virtualenv更为便捷。不需要重启系统进入影子模式，也不需要启动虚拟机拖慢你的系统。你只需要通过命令创建一个虚拟环境，不用的时候通过命令退出，甚至删除，均可。

有了大概的了解之后，看下具体的安装，只是介绍ubuntu下的安装：

通过命令：sudo apt-get install python-virtualenv或者 sudo pip install virtualenv

然后建立一个测试目录：

mkdir testvirtual

cd testvirtual

然后创建一个虚拟环境：virtualenv env1

cd切换到该目录下，执行命令：source bin/activate

你会发现在shell提示符前面多了(env1)这个提示，这就说明你已经是在虚拟环境中，在这个里面你可以安装任意的python库，而不用担心会把系统自带的python库搞乱。

另外有一个工具，封装了创建虚拟环境的过程，不需要再使用source ［路径］来创建，只需使用一个命令，不需考虑路径。

这个额外的工具就是：virtualenvwrapper。\[感谢@koonkai指正\]

通过 pip install virtualenvwrapper 安装。

安装完成之后，需要在用户根目录下（即/home/\[username\]）的.bashrc末尾加入：  
source /usr/local/bin/virtualenvwrapper.sh

有的人写是在.bash\_profile文件中加入，不过我测试没有成功。

设置好之后，你就可以通过下面的命令来操作虚拟环境了：

创建并进入环境：mkvirtualenv env1  
退出环境：deactivate  
进入已存在的环境或者切换环境：workon env1或者env2  
删除环境： rmvirtualenv env1

基本使用就是这些了。
