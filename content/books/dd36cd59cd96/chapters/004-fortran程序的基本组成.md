**Fortran****程序的基本组成**

1.3.1字符集

不是任何一种外文字母或数字符号都能被某一计算机语言接受。每一种计算机的高级语言分别规定了它允许使用的字符。

Fortran允许使用的字符如下：

英文字母   ：A B C D E F G H I J K L M N O P Q R S T U V W X Y Z

阿拉伯数字 ：0 1 2 3 4 5 6 7 8 9

特殊符号   ：空格 = + - \* / ( ) , . ': " ! % & ; < > $ ? \_ (F90中新增的字符)

其中“$”和“?”号在程序中没有确切意义。应当注意，在F77语句中不区分大小写字母，例如写READ和read或Read是一样的，其它变量名和函数名中，大、小写字母也是等价的。但早期的Fortran卡片不允许小写，故老的程序代码都是大写的，很多人也养成了大写的习惯。

在每一种计算机系统所用的Fortran编译器中，可能对字符集或其功能作某些扩充。因此在使用某一具体的计算机时，应了解它的规定。例如“$”号可用于从屏幕上连接输出输入字符于同一行。标准还允许F90扩充进各国文字，各种专业用符号，这要看厂商装入的编译系统是否支持这些字符的使用。某些系统还可以用这些字符作为字符常数或注释，注意这类字符是2字节长度，在计算字符串长时要加倍。

1.3.2源码格式

a)    固定格式

Fortran作为历史上第一种高级语言，其程序编写的规则与当时使用的计算机系统有很大的关系。早期的计算机系统须用卡片将源程序输入，一张卡片相应于源程序的一行。由于卡片物理宽度的限制，因此一行程序允许的字符数也是有限的。由此决定了F77的格式，既为F90/95中的固定格式。

图1-1 Fortran卡片。

 

![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image011.jpg)

一张卡片有12行80列。其中有10行分别印有0，l，2，3，4，5，6，7，8，9十个数字。第O行上面的第一行作为第11行，再上面一行为第12行。一个字符由相应一列上的1—3个孔个孔来代表。如源程序某行第11列为字符“A”，则在该列上第12行和第l行上各穿一个方孔。注意此卡片允许的特殊字符只有十一个。

图1-2 卡片输入机。

 

图1-3 卡片穿孔机。

 

 ![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image012.jpg) ![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image013.jpg)

实际操作时利用卡片穿孔机，按下卡片穿孔机上某一个字符，则机器就会自动将卡片相应列中的相应位置穿上孔。如果一个源程序有100行，则需要100张卡片。在上机算题时，将穿好孔的卡片按顺序放入卡片输入机，启动机器，就将卡片上的信息输入计算机了。

![](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image014.jpg)

早期编写F77程序使用如上图的F77程序纸，一行有80列，每行一条程序语句。这80列分为四个区，分别书写不同的内容：

        ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image001.gif)标号区：第l—5列

可以写l至5位整数。也可以没有标号。标号区中的空格不起作用。如lOO与100  或1 0 0作用相同。标号应是无符号整数(无正负号或小数点)。标号大小顺序没有任何要求。假如第二行的标号为1000，第三行的标号可以是10，也可以是99999。

标号区内不得出现标号以外的内容，但注释行例外。注释行的内容可以写在标号区内，一行中第一列为C或\*的，该行即被认为注释行，编译时对该行内容不作翻译，对程序运行不产生任何影响。如果在第一列上出现的不是数字、空格或C和\*的字符，编译时按出错处理。

        ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image001.gif)续行区：第6列

如果在一行的第6列上写一个非空格和非零的字符，则该行作为其上一行的续行。注意在某些系统中，这个字符可以不限于上面所列的，如 @ } \] ~ 等字符均可使用\[[e\_132\_01.f](http://micro.ustc.edu.cn/Fortran/ZJDing/example/e_132_01.f)\]。F77允许一个语句有19个续行(即一个语句最多可以写成20行)。有的程序中第6列上用“l”，“2”，…表示该行是第1个或第2个续行，但用数字字符容易与第7列的数字形成连续的数字串而引起错觉，故最好使用固定的特殊字符。

        ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image001.gif)语句区：第7—72列

不要求一定从第7列开始写语句，可以从第7列以后（72列以前）的任何一列开始写，但一行只能写一个语句。如果写满了72列，一旦在终端上修改程序时在该行又插入了一些字符，就会使本行最后几个字符超出语句区而引起意料不到的错误。特别注意到语句最后的空格将可能溢出72列，在某些计算机系统上将导致难以查出的错误。应注意，引号内的字符串中所包括的空格是有效的，不能忽略\[[e\_132\_02.f](http://micro.ustc.edu.cn/Fortran/ZJDing/example/e_132_02.f)\]。

        ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image001.gif)注释区：第73—80列

在卡片输入法时代，程序员一般利用此8列为程序行编序号以便查找。注释区只对程序员提供辨别信息，不是语句的一部分，在编译时不对72—80列作处理\[[e\_132\_03.f](http://micro.ustc.edu.cn/Fortran/ZJDing/example/e_132_03.f)\]。

a)    自由格式

在F90中，用自由格式编写程序有很大的自由度。与固定格式相比，不易产生键入位置的错误，而且易读易懂。

行　　：一行为132列。可以有复数条程序语句，语句间用分号“;”分开。语句没有位置规定。

注释行：起始用注释符“!”号，此行其后的所有字符均作为注释（字符串中的!号除外，如 print \*,’help!!!!’ ）。

续行　：当一个语句非常长以至于132列都书写不下时，允许有39个续行。在语句行最后加上续行符“&”号。如果字符串跨2行以上,则在续行的开始位置也要加&号。注意语句的有效字符是从“&”前和续行符“&”之后的位置算起。\[[e\_132\_04.f90](http://micro.ustc.edu.cn/Fortran/ZJDing/example/e_132_04.f90)\]

空格　：在语句名和变量名中间不能有空格。需要空格的地方必须有一个以上空格（GOTO和GO TO，ELSEIF和ELSE IF，END构造名(构造名有：DO, PROGRAM, FUNCTION, MODULE, SUBROUTINE)等有两种写法的除外），如关系运算符 ==，<= 不能写成 = =，< =。这与F77有很大不同之处，因为F77的设计中将编译源程序的空格忽略\[[e\_132\_05.f](http://micro.ustc.edu.cn/Fortran/ZJDing/example/e_132_05.f)\]\[[e\_132\_05.f90](http://micro.ustc.edu.cn/Fortran/ZJDing/example/e_132_05.f90)\]\[[e\_132\_06.f](http://micro.ustc.edu.cn/Fortran/ZJDing/example/e_132_06.f)\]。

当程序员要将自己编写的F90程序与现有的用F77编写的子程序库在源码级结合起来的话，需要特别注意格式的差别。

b)    文件名

以上两种格式的源程序在编译时可以用选项来指定，对应的默认文件扩展名为：

        ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image002.gif)固定格式：　.for　或　.f　\[[fixed.for](http://micro.ustc.edu.cn/Fortran/ZJDing/example/Fixed.for)\]

        ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image002.gif)自由格式：　.f90 \[[free.f90](http://micro.ustc.edu.cn/Fortran/ZJDing/example/Free.f90)\]

1.3.3程序组成

a)    程序总体构造

Fortran90程序是一种分块形式的程序，整个程序由若干个程序模块组成。各模块都有相似的语句组织形式，其中主程序起整体控制作用，各辅程序模块各自完成问题中的一个算法。在解决一个比较复杂的问题时，先把求解的问题分解为若干相对独立的子算法，每一个子算法编为一个辅程序，然后按搭积木一样将各有关程序模块组成一个程序。主程序依次调用各辅程序模块，控制各子算法的实施，通过主程序对子程序的调用，形成程序的整体运行，完成问题的解。

若某一子程序算法仍复杂，可再把它分解为若干更小的算法，分别编写为更低一层次的辅程序，由其他辅程序分别去调用。这种情况可以类推到其它子程序或更低一层次。所以，Fortran程序＝n个程序单位＝1主程序单位＋(0～n-1)个子程序单位。在最简情况下, Fortran程序只由一个主程序构成而没有辅程序，所有算法都由主程序自身完成。按现代要求，即使功能比较简单的问题，也最好写成主程序调用辅程序的形式，以便于维护。

F77中定义的辅程序对所有其它辅程序都是公开的，即除自己本身以外都可以加以引用。而在F90中，辅程序可以被本身应用，且可以定义不能被其它辅程序应用的内部辅程序。

b)    程序单位

主程序

\[PROGRAM  程序名\]            ←语句可省略

.....

END \[PROGRAM \[程序名\]\]       ←END必须有

辅程序(过程)

SUBROUTINE 子程序

FUNCTION   函数

BLOCK DATA 块数据

MODULE     模块 (F90)

内部过程　  CONTAINS (F90)

程序单位是Fortran中的基本成分，包括主程序、辅程序、块数据单元和内部过程。辅程序可以是函数辅程序或子程序辅程序。模块中包含可由其他程序单位访问的各种实体。块数据单元用来对有名公用块的数据对象规定初始值。一个执行程序总是由一个主程序单位和任意个(可以为零)其他类型的程序单位组成，任何程序单位都不能调用主程序。在主程序中定义的内部过程必须跟在CONTAINS语句之后，主程序是它的内部程序的宿主。过程包括函数和子程序，对一个子程序的引用是通过CALL语句或定义的赋值语句来引用的。

MODULE过程在主程序中通过USE语句与之相联系。模块用于组装若干功能(如过程、类型定义、语义扩展等)为一集团，是F90中极具柔软性的程序单位，它取代了F77中的某些不安全的特性。

BLOCK DATA辅程序的用处是定义全局常数或全局初始化，在F90中是不推荐使用的，其功能已被MODULE和USE取代。

c)    程序体和语句顺序

各程序单位(除模块程序单位外)的程序体形式相同，共分两部分：前面是说明部分，后面是执行部分(模块程序单位只有说明部分)，两部分之间没有确切的分界，紧密衔接，但不准彼此穿插。即：程序单位＝单位起始语句＋程序体＋单位结束语句。程序体＝说明部分＋执行部分。

Fortran要求严格的语句顺序。在每个程序单位中，根据语句种类按如下的次序排列。F77中的顺序可简单归纳为：

        ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image002.gif)PROGRAM，FUNCTION，SUBROUTINE，BLOCK DATA等程序单位开始语句

        ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image002.gif)变量类型和语句函数等定义语句　　　　　(说明部分)

        ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image002.gif)执行语句，DATA语句，FORMAT语句　　 　(执行部分)

        ![\*](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.files/image002.gif)END语句

在F90中将新增加的语句功能综合后，其顺序为：

<table><tbody><tr><td colspan="3"><p><span lang="EN-US">PROGRAM, FUNCTION, SUBROUTINE, MODULE, BLOCK DATA<o:p></o:p></span></p></td></tr><tr><td colspan="3"><p><span lang="EN-US">USE<o:p></o:p></span></p></td></tr><tr><td rowspan="4"><p><span lang="EN-US">FORMAT</span><span lang="ZH-CN">　</span><span lang="EN-US">ENTRY<o:p></o:p></span></p></td><td colspan="2"><p><span lang="EN-US">IMPLICIT NONE<o:p></o:p></span></p></td></tr><tr><td><p><span lang="EN-US">PARAMETER<o:p></o:p></span></p></td><td><p><span lang="EN-US">IMPLICIT<o:p></o:p></span></p></td></tr><tr><td><p><span lang="EN-US">PARAMETER &amp; DATA<o:p></o:p></span></p></td><td><p><span lang="ZH-CN">定义：派生类型、接口块、</span><span lang="ZH-CN">变量类型、语句函数</span><span lang="EN-US"><o:p></o:p></span></p></td></tr><tr><td><p><span lang="EN-US">DATA<o:p></o:p></span></p></td><td><p><span lang="ZH-CN">执行结构</span><span lang="EN-US"><o:p></o:p></span></p></td></tr><tr><td colspan="3"><p><span lang="EN-US">CONTAINS<o:p></o:p></span></p></td></tr><tr><td colspan="3"><p><span lang="ZH-CN">内部过程或模块过程</span><span lang="EN-US"><o:p></o:p></span></p></td></tr><tr><td colspan="3"><p><span lang="EN-US">END<o:p></o:p></span></p></td></tr></tbody></table>

整个程序中只能有一个PROGRAM，一个BLOCK DATA，可以有多个各自命名的FUNCTION和SUBROUTINE辅程序。

d)    英文名

变量名和程序名等使用的英文名是由(F77：6；F90：31)个字符(包含英文字母A-Z、数字0-9、F90:下划线 \_)构成，且第一个字符必须是字母。其英文名的有效使用范围原则上限于一个程序单位之内（内部过程除外）。如下面的语句是错误的：

INTEGER :: 1A          ! 不是以字母开头

INTEGER :: A\_name\_made\_up\_of\_more\_than\_31\_letters  !　太长

INTEGER :: China:0     ! 含有不允许的字符

INTEGER :: A-3         ! 减号在此是无意义的

Fortran没有规定保留字，即可以用函数名或语句定义符作变量名。但为了避免混淆，建议不要使用Fortran中已有特定含义的字作变量名。如SIN是正弦函数的名字，如果有以下语句：

SIN＝3.5

PRINT \*，SIN

则语句中的SIN是变量名而不代表正弦函数。系统会根据它后面有无自变量而作出判断，又如：

READ \*，PRINT

此时PRINT是一个变量名而不代表“打印输出”的操作。系统会认定语句的第—个字READ为代表操作的语句定义符，而把PRINT作为READ语句中读数的变量。但在同一个程序单位(主程序或子程序分别是一个程序单位)中，变量名和函数名或语句定义符不能同名。以下是错误的：

SIN＝3.5

A＝SIN\*SIN(2.0)

PRINT \*，PRINT

e)    标号和标签

可在语句开头加上标号或标签，用于指定特定的语句。有效范围限于一个程序单位内。

标号：1-5位的10进制整数，且至少一位不为0，前导0不起作用。F90中，不可对空语句加上语句标号。

标签：英文名，后面接“:”（冒号） (F90)

例：

DO 10 k = 1,100

...

10    CONTINUE

注：不能使用整型变量来指定转向语句的标号。如下是错误的。

n = 10

GOTO n

例： (F90)

DO k = 1,100

loop2:    DO

....

END DO loop2  !已有标签名时不能省略标签名。

END DO
