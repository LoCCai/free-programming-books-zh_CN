Linux/Unix的用户对/etc目录都是再熟悉不过了，在这个最重要的目录中保存了大部分软件的配置信息，借以实现软件的配置以及整个系统的启动过程控制。对于Windows用户来说，可以把/etc目录视为Windows中的注册表，只不过文件化了，可管理了。

这么重要的/etc目录，如果其中的文件被错误编辑或者删除，将会损失惨重。etckeeper这个软件可以帮助实现/etc目录的持续备份，借用分布式版本控制工具，如：git、mercurial、bazaar、darcs。

那么etckeeper是如何实现的呢？以git作为etckeeper的后端为例进行说明，其他的分布式版本控制系统大同小异。

-   将/etc目录Git化。将会创建Git库于目录/etc/.git中，/etc目录作为工作区。
-   与系统的包管理器，如Debian/Ubuntu的apt，Redhat上的yum等整合。一旦有软件包安装或删除，对/etc目录下的改动执行提交操作。
-   除了能够记录/etc目录中的文件内容，还可以记录文件属性等元信息。因为/etc目录下的文件的权限设置往往是非常重要和致命的。
-   因为/etc目录已经是一个版本库了，可以用git命令对/etc下的文件进行操作：查看历史，回退到历史版本...
-   也可以将/etc克隆到另外的主机中，实现双机备份。

## 7.1.1. 安装etckeeper[¶](#id1 "永久链接至标题")

安装etckeeper是一个最简单的活，因为etckeeper在主流的Linux发行版都有对应的安装包。使用相应Linux平台的包管理器（apt、yum）即可安装。

在Debian/Ubuntu上安装etckeeper如下：

$ sudo aptitude install etckeeper

安装etckeeper软件包，会自动安装上一个分布式版本控制系统工具，除非已经安装了。这是因为etckeeper需要使用一个分布式版本控制系统作为存储管理后端。在Debian/Ubuntu上会依据下面的优先级进行安装：git > mercurial > bzr > darcs。

在Debian/Ubuntu上，使用**dpkg -s**命令查看etckeeper的软件包依赖，就会看到这个优先级。

$ dpkg -s etckeeper | grep "^Depends"
Depends: git-core (>= 1:1.5.4) | git (>= 1:1.7) | mercurial | bzr (>= 1.4~) | darcs, debconf (>= 0.5) | debconf-2.0

## 7.1.2. 配置etckeeper[¶](#id2 "永久链接至标题")

配置etckeeper首先要选择好某一分布式版本库控制工具，如Git，然后用相应的版本控制工具初始化/etc目录，并做一次提交。

-   编辑配置文件/etc/etckeeper/etckeeper.conf。
    
    只要有下面一条配置就够了。告诉etckeeper使用git作为数据管理后端。
    
    VCS\="git"
    
-   初始化/etc目录。即将其Git化。执行下面的命令（需要以root用户身份），会将/etc目录Git化。
    
    整个过程可能会比较慢，因为要对/etc下的文件执行**git add**，因为文件太多，会慢一些。
    
    $ sudo etckeeper init
    
-   执行第一次提交。注意使用etckeeper命令而非git命令进行提交。
    
    $ sudo etckeeper commit "this is the first etckeeper commit..."
    
    整个过程可能会比较慢，主要是因为etckeeper要扫描/etc下不属于root用户的文件以及特殊权限的文件并进行记录。这是为了弥补Git本身不能记录文件属主、权限信息等。
    

## 7.1.3. 使用etckeeper[¶](#id3 "永久链接至标题")

实际上由于etckeeper已经和系统的包管理工具进行了整合（如Debian/Ubuntu的apt，Redhat上的yum等），etckeeper可以免维护运行。即一旦有软件包安装或删除，对/etc目录下的改动会自动执行提交操作。

当然也可以随时以root用户身份调用**etckeeper commit**命令对/etc目录的改动手动进行提交。

剩下的工作就交给Git了。可以在/etc目录执行**git log**、**git show**等操作。但要注意以root用户身份运行，因为/etc/.git目录的权限不允许普通用户操作。
