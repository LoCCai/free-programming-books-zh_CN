**Compaq Visual Fortran****软件的使用**

1.5.1 版本介绍

近些年来，个人计算机性能迅速提高，价格不断降低，PC+Windows已成为应用计算机系统的主流。因此，如何充分利用PC系统资源进行计算工作显得十分重要。以往PC平台上的Fortran语言开发工具大多为16位的，不能充分利用系统资源，而少数可以较好利用系统资源的开发工具，如MicroWay公司的NDP，也因为是在DOS平台工作且和很多应用软件相冲突而不便使用。现在有许多运行在不同操作环境下的商业软件，可在一些[软件公司](http://micro.ustc.edu.cn/Fortran/ZJDing/pages/The%20Fortran%20Market.htm)的网页上找到。

Microsoft Fortran PowerStation 4.0是第一个在Win95/NT操作系统下的32位Fortran语言开发工具，它因为有以下的优点而使以往的Fortran开发工具无法与之相媲美。

          ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image001.gif)具有集成开发环境Developer Studio，程序设计者可以在集成开发环境中方便地进行编辑、编译、连接和调试。

          ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image001.gif)生成的是Windows操作系统下的32位应用程序，提高了代码的执行效率，突破了原先PC系统下Fortran程序64KB寻址空间的限制，更加充分的利用了系统资源。

          ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image001.gif)支持Fortran90标准，并在Fortran90基础上进行了扩充，增添了许多有利有程序设计的功能。

          ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image001.gif)在集成开发环境中，可以可视化地进行Windows用户图形界面设计、设置编译连接选项和编译连接。

          ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image001.gif)Fortran PowerStation的调试(Debug)功能使程序设计者可以在集成开发环境中方便地跟踪和控制程序的执行、查看或修改变量和表达式的值，查看反汇编代码或查看堆栈情况。

          ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image001.gif)不仅可以开发传统的控制台应用程序和图形界面程序，还可以使用QuickWin库在不必深入了解Windows系统的情况下简便地开发出具有Windows图形界面特点应用程序，甚至可以更进一步地利用Windows API函数接口进行Windows程序设计。

          ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image001.gif)可以方便地与Visual C/C++、MASM和Visual Basic进行混合语言编程，以充分利用各个语言所具有的优点。

          ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image001.gif)所建立的动态链接库可以被Excel中的VBA调用，使开发出的应用程序与Excel相结合。

这个Fortran系统软件有多个版本和名称：Microsoft Fortran PowerStation → Digital Visual Fortran → Compaq Visual Fortran，最新的版本是2001年推出的Compaq Visual Fortran6.6，我们将使用6.1版。根据CPU芯片(x86和Alpha)和操作平台(Win,Unix)的不同[Compaq Fortran](http://micro.ustc.edu.cn/Fortran/ZJDing/pages/Compaq%20Fortran%20Home%20Page.htm)有[一系列版本](http://micro.ustc.edu.cn/Fortran/ZJDing/pages/Compaq%20Fortran%20Products.htm)。

1.5.2安装和运行

校内下载地址：ftp://202.38.68.153/Pub/Programming/Fortran/Compaq Visual Fortran 6.1 Professional.zip (209MB)，完全安装时占硬盘空间300MB左右，默认安装目录名是Microsoft Visual Studio。在网络中心3楼C区后排40台机子上已安装。

安装步骤：点击文件名，winzip打开原文件名目录后找到sn.txt，点击此文件打开并录下序列号，点击install按钮进行安装。

运行步骤：源程序的编译可以直接点击Developer Studio(DFDEV.EXE)界面上的Build按钮,或在DOS窗口下键入df filename，f77 filename(.f)和f90 filename(.f90)进行编译，扩展名可省略，df/?，f77/?，f90/? 是编译选项帮助。df /fixed filename或df /free filename是特别指定文件格式是固定或自由时的选项。

为了使用Developer Studio开发Fortran程序，需要先建立所要编写程序的工程(Project)，工程中存放了建立特定程序所要的全部信息，包括程序原文件名及相互关系、所需库文件清单、编译器、链接器和建立程序所用的其他信息。编译时先建立工程的workspace，产生 .dsw文件，点击此文件可重新打开此workspace和相关的源文件。编译另一个文件时需要将当前的workspace关闭，建立另一个文件的workspace。编译后产生的执行文件在默认的Debug目录下，还可再次选择Release选项进行编译，在默认的Release目录下产生运行速度快的执行文件。也可在DOS窗口下键入filename(.exe)，如果键入filename > text.txt可将输出到屏幕上的内容重定向到文件中。

使用DOS命令行也可建立图标，方法是：开始\->程序\->Visual Fortran6->Fortran Command Prompt，点击右键\->属性\->起始位置窗口中键入目录名，然后将Fortran Command Prompt发送到桌面快捷方式，运行时点击图标即可。

在用Win32 Debug选项编译后，可以在程序中设置断点进行跟踪和调试。方法是：光标放在程序中适当位置处，点击断点按钮（小手）以在程序行开头处加上断点，键入F5，在菜单条上将出现Debug栏目，按F11键开始自断点起追踪程序运行，将光标移动到变量名上会显现变量的取值，键入Shift＋F5将终止Debug，再点击断点按钮可取消断点。

【作业】

\[1.1\] 下面的程序形式不佳，将其改为简洁可读性强的形式。\[[q\_1\_1.f90](http://micro.ustc.edu.cn/Fortran/ZJDing/question/1.1.f90)\]

\[1.2\] 指出下列变量名是否是合法的F90变量名：

（1）FORTRAN90（2）FORTRAN/90（3）FORTRAN\_90（4）90\_FORTRAN（5）FORTRAN\_（6）.FORTRAN

\[1.3\] 下列各数在F90中作为常数是否合法，合法的指出其类型，不合法的说出理由。

28.7     287.    27.8E+03       .278E-15       278.00  \-287    E+14

27.E-08  E+00    1E-05          32              10\*\*2          π      lg1100

\[1.4\] 把下列各数分别写成小数型实数与指数型实数：

3.1416   31416   \-314000        \-0.0003141     105     10\-3     314.16  31.416x105

\[1.5\] 指出下列表达式的正确与否，错的更正：

数学式           表达式

           ![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image003.gif)X-Y\*\*3

            ![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image004.gif)            2A+5

             ![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image006.gif)             (A+B)/CD

     ![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image008.gif)     (1.5+A)(2+B)

           ![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image010.gif)           COS(3.0\*X)\*\*2

      ![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image012.gif)      (![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image014.gif))\*SIN(2\*![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image016.gif)+x)

         ![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image018.gif)         A\*B+C\*D

             ![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image020.gif)             EXPX\*(1/Y)

         ![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image022.gif)         1.0E-03\*EXP(X+2.0)

\[1.6\] 指出下列赋值语句的正确与否，错的指出原因。

(1) X=Y+COS(Y)/ALOG(2+Y)

(2) 1.2=(X+Y)/Z

(3) X+1.1=2.0

(4) Y=SIN(0.5)/SQRT(0.5)+FLOAT(I)

(5) K=K+2

(6) K+2=K

(7) X\*\*2-1.0=(X+1.0)\*(X-1.0)

(8) SIN(X)=Y

(9) M(3)=(I+J)\*(J+K)  （M(3)是一数组的第三个元素）

(10) PM=(X+Y)\*A\*\*2

(11) X=Y=3.2

\[1.7\] 对于给定扇形的半径![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image055.gif)及圆心角![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image057.gif)，弦长![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image059.gif)，拱高![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image061.gif)，弧度![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image063.gif)，

面积![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image065.gif)。编一程序，对任意给定的![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image055.gif)及![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image057.gif)，输出![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image068.gif)、![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image070.gif)及![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.files/image072.gif)值。
