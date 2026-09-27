尽管完整的 Windows 版 PostgreSQL 只能用 MinGW 或者 Cygwin 编译，C 客户端库(libpq)和交互终端(psql)还是可以使用其它工具编译。在 Postgres 里包含的 makefile 是为 Microsoft Visual C++ 和 Borland C++ 写的。在其它配置下手工编译这个库应该也是可能的。

> **【提示】**首选使用 MinGW 或者 Cygwin 。如果使用了其中一种工具集，请参阅[章14](https://www.jinbuguo.com/postgresql/manual/installation.html)。

要用 Microsoft Visual C++ 编译在 Windows 里所有可能编译的东西，切换到 src 目录，然后键入命令

nmake /f win32.mak

这里假设 Visual C++ 在路径里。

要使用 Borland C++ 编译所有东西，进入 src 目录然后敲入命令：

make -N -DCFG=Release /f bcc32.mak

编译将生成下面的文件：

interfaces\\libpq\\Release\\libpq.dll

动态链接的前端库

interfaces\\libpq\\Release\\libpqdll.lib

把你的程序和 libpq.dll 链接的输入库

interfaces\\libpq\\Release\\libpq.lib

前端库的静态库版本

bin\\pg\_config\\Release\\pg\_config.exe  
bin\\psql\\Release\\psql.exe  
bin\\pg\_dump\\Release\\pg\_dump.exe  
bin\\pg\_dump\\Release\\pg\_dumpall.exe  
bin\\pg\_dump\\Release\\pg\_restore.exe  
bin\\scripts\\Release\\clusterdb.exe  
bin\\scripts\\Release\\createdb.exe  
bin\\scripts\\Release\\createuser.exe  
bin\\scripts\\Release\\createlang.exe  
bin\\scripts\\Release\\dropdb.exe  
bin\\scripts\\Release\\dropuser.exe  
bin\\scripts\\Release\\droplang.exe  
bin\\scripts\\Release\\vacuumdb.exe  
bin\\scripts\\Release\\reindexdb.exe

PostgreSQL 客户端程序和工具

唯一需要安装的文件是 libpq.dll 库。这个文件在大多数情况下应该放在 WINDOWS\\SYSTEM 目录里。如果此文件是用一个 setup 程序安装的，那么它应该在安装前用文件里的 VERSIONINFO 资源检查版本，以确保现有新版本的库不会被覆盖。

如果你准备在这台机器上使用 libpq 进行开发，你要把 src\\include 和 src\\interfaces\\libpq 目录加入到编译器设置的包含路径里。

要使用库，你必须把 libpqdll.lib 文件增加到你的项目里(在 Visual C++ 里，只需要右键点击项目然后选择增加库)。

Microsoft 发布的免费的开发工具可以从 [http://msdn.microsoft.com/visualc/vctoolkit2003/](http://msdn.microsoft.com/visualc/vctoolkit2003/) 下载。你还需要从 [http://www.microsoft.com/msdownload/platformsdk/sdkupdate/](http://www.microsoft.com/msdownload/platformsdk/sdkupdate/) 下载平台 SDK 里面的 MSVCRT.lib 文件。你还需要从 [http://msdn.microsoft.com/netframework/downloads/updates/default.aspx](http://msdn.microsoft.com/netframework/downloads/updates/default.aspx) 下载 .NET 框架。安装完毕之后，工具箱的二进制文件必须在你的路径里，并且你可能需要增加一个 /lib:<libpath> 指向 MSVCRT.lib 。免费的 Borland C++ 编译工具可以从 [http://www.borland.com/products/downloads/download\_cbuilder.html#](http://www.borland.com/products/downloads/download_cbuilder.html#) 下载，并且也需要做类似的设置。
