**Fortran77****和****90/95****编程入门**

（中国科技大学天文与应用物理系，丁泽军编）

[此文挡打包下载](http://micro.ustc.edu.cn/Fortran/ZJDing/Fortran.rar)

前言

Fortran语言为科大理学院本科课程。编者自2000年起对天文与应用物理系本科生讲授，由于国内尚没有一本完整综合了Fortran90与Fortran77的教材，故编写了此教程用于教学，主要内容源自于如下国内外最新Fortran90和经典Fortran77教材，并参考了Internet上诸多网页，在此向各位原作者(恕不详列)致谢。编者感谢研究生李会民的帮助。请留意本教程限于校内教学目的使用。

2001年10月

参考书目：**（１＆２为本课程的主要参考书）**

**1****《****Fortran90****教程》****(****浙江大学出版社****)(****潘在元、张素素****)**

**2****《****Fortran****语言****—Fortran77****结构化程序设计》****(****清华大学出版社****)(****谭浩强、田淑清****)**

**3****《****Visual Fortran****编程指南》****(****人民邮电出版社****)(****邓巍巍、王越男****)**

**4 “Fortran90****编程****”([http://www.media.kyoto-u.ac.jp\\htomita\\index.html](http://www.media.kyoto-u.ac.jp/htomita/index.html))(****日本京都大学福田博之****)**

**5****《****Fortran PowerStation4.0****使用与编程》****(****北京航空航天大学出版社****)(****桂良进、王军、董波****)**

**6 “[Fortran90 Course Notes](http://micro.ustc.edu.cn/Fortran/ZJDing/pages/CourseNotes.pdf)” (Univ. Liverpool, AC Marshell)**

**7****《****Introduction to FORTRAN90****》****(Larry Nyhoff & Sanford Leestma)**

[课程安排](http://micro.ustc.edu.cn/Fortran/ZJDing/Schedule.htm)

目录

**第一章****: Fortran****语言程序设计初步**

**1.1**    **[Fortran语言发展概况](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-1.htm)**

**1.1.1**    **[Fortran的历史](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-1.htm#%E7%AC%AC1_1_1)**

**a)**          **[FortranIªFortranIV](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-1.htm#%E7%AC%AC1_1_1a)**

**b)**          **[Fortran77ªFortran90](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-1.htm#%E7%AC%AC1_1_1b)**

**1.1.2**    **[学习Fortran的意义](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-1.htm#%E7%AC%AC1_1_2)**

**a)**          **[Fortran77？](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-1.htm#%E7%AC%AC1_1_2a)[](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-1.htm#%E7%AC%AC1_1_1a)**

**b)**          **[Fortran90！](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-1.htm#%E7%AC%AC1_1_2b)[](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-1.htm#%E7%AC%AC1_1_1b)**

**1.2**    **[Fortran程序简例](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-2.htm)**

**1.2.1**    **[编程实例](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-2.htm#%E7%AC%AC1_2_1)**

**a)**          **[基本语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-2.htm#%E7%AC%AC1_2_1a)**

**b)**          **[输出字符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-2.htm#%E7%AC%AC1_2_1b)**

**1.2.2**    **[Fortran程序的特点](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-2.htm#%E7%AC%AC1_2_2)**

**1.3**    **[Fortran程序的基本组成](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.htm)**

**1.3.1**    **[字符集](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.htm#%E7%AC%AC1_3_1)**

**1.3.2**    **[源码格式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.htm#%E7%AC%AC1_3_2)**

**a)**          **[固定格式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.htm#%E7%AC%AC1_3_2a)**

**b)**          **[自由格式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.htm#%E7%AC%AC1_3_2b)**

**c)**          **[文件名](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.htm#%E7%AC%AC1_3_2c)**

**1.3.3**    **[程序组成](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.htm#%E7%AC%AC1_3_3)**

**a)**          **[程序总体构造](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.htm#%E7%AC%AC1_3_3a)**

**b)**          **[程序单位](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.htm#%E7%AC%AC1_3_3b)**

**c)**          **[程序体和语句顺序](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.htm#%E7%AC%AC1_3_3c)**

**d)**          **[英文名](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.htm#%E7%AC%AC1_3_3d)**

**e)**          **[标号和标签](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-3.htm#%E7%AC%AC1_3_3e)**

**1.4**    **[数学运算](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm)**

**1.4.1**    **[常量和变量类型](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm#%E7%AC%AC1_4_1)**

**a)**          **[常量](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm#%E7%AC%AC1_4_1a)**

**b)**          **[变量](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm#%E7%AC%AC1_4_1b)**

**1.4.2**    **[内在函数](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm#%E7%AC%AC1_4_2)**

**1.4.3**    **[算术表达式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm#%E7%AC%AC1_4_3)**

**a)**          **[算术运算符和运算优先级](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm#%E7%AC%AC1_4_3a)**

**b)**          **[算术表达式的含义和表示方法](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm#%E7%AC%AC1_4_3b)**

**c)**          **[表达式运算中的类型](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm#%E7%AC%AC1_4_3c)**

**d)**          **[运算的误差](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm#%E7%AC%AC1_4_3d)**

**1.4.4**    **[赋值语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm#%E7%AC%AC1_4_4)**

**a)**          **[算术赋值语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm#%E7%AC%AC1_4_4a)**

**b)**          **[执行时的类型转换](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-4.htm#%E7%AC%AC1_4_4b)**

**1.5**    **[Compaq Visual Fortran软件的使用](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.htm)**

**1.5.1**    **[版本介绍](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.htm#%E7%AC%AC1_5_1)**

**1.5.2**    **[安装和运行](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec1-5.htm#%E7%AC%AC1_5_2)**

**第二章****:** **改变程序流程**

**2.1**    **[算法和流程图](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-1.htm)**

**2.1.1**    **[算法](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-1.htm#%E7%AC%AC2_1_1)**

**2.1.2**    **[流程图](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-1.htm#%E7%AC%AC2_1_2)**

**a)**          **[传统流程图](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-1.htm#%E7%AC%AC2_1_2a)**

**b)**          **[三种基本结构](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-1.htm#%E7%AC%AC2_1_2b)**

**c)**          **[结构流程图](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-1.htm#%E7%AC%AC2_1_2c)**

**d)**          **[伪代码表示的算法](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-1.htm#%E7%AC%AC2_1_2d)**

**2.2**    **[逻辑运算](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-2.htm)**

**2.2.1**     **[关系表达式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-2.htm#%E7%AC%AC2_2_1)**

**a)**          **[关系运算符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-2.htm#%E7%AC%AC2_2_1a)**

**b)**          **[关系表达式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-2.htm#%E7%AC%AC2_2_1b)**

**2.2.2**     **[逻辑表达式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-2.htm#%E7%AC%AC2_2_2)**

**a)**          **[逻辑量](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-2.htm#%E7%AC%AC2_2_2a)**

**b)**          **[逻辑运算符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-2.htm#%E7%AC%AC2_2_2b)**

**c)**          **[逻辑表达式的运算](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-2.htm#%E7%AC%AC2_2_2c)**

**2.2.3**     **[逻辑IF语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-2.htm#%E7%AC%AC2_2_3)**

**2.3**    **[选择结构](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-3.htm)**

**2.3.1**                  **[块IF构造](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-3.htm#%E7%AC%AC2_3_1)**

**a)**          **[块IF的组成和执行](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-3.htm#%E7%AC%AC2_3_1a)**

**b)**          **[ELSE IF语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-3.htm#%E7%AC%AC2_3_1b)**

**c)**          **[IF块构造](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-3.htm#%E7%AC%AC2_3_1c)**

**d)**          **[IF构造的缺省形式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-3.htm#%E7%AC%AC2_3_1d)**

**e)**          **[IF构造的嵌套](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-3.htm#%E7%AC%AC2_3_1e)**

**2.3.2**                  **[多重选择和CASE构造](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-3.htm#%E7%AC%AC2_3_2)**

**a)**          **[整型](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-3.htm#%E7%AC%AC2_3_2a)**

**b)**          **[字符型](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-3.htm#%E7%AC%AC2_3_2b)**

**c)**          **[逻辑型](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec2-3.htm#%E7%AC%AC2_3_2c)**

**第三章****:** **循环结构**

**3.1**    **[单纯循环](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-1.htm)**

**3.1.1**                  **[GOTO语句实现循环](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-1.htm#%E7%AC%AC3_1_1)**

**3.1.2**                  **[有循环变量的DO构造](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-1.htm#%E7%AC%AC3_1_2)**

**a)**          **[DO语句和循环次数](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-1.htm#%E7%AC%AC3_1_2a)**

**b)**          **[DO循环执行步骤](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-1.htm#%E7%AC%AC3_1_2b)**

**c)**          **[循环终端语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-1.htm#%E7%AC%AC3_1_2c)**

**d)**          **[停止语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-1.htm#%E7%AC%AC3_1_2d)**

**e)**          **[DO循环嵌套](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-1.htm#%E7%AC%AC3_1_2e)**

**f)**          **[DO循环规则](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-1.htm#%E7%AC%AC3_1_2f)**

**g)**          **[隐DO循环](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-1.htm#%E7%AC%AC3_1_2g)**

**3.2**    **[条件循环](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-2.htm)**

**3.2.1**                  **[无循环变量的DO构造](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-2.htm#%E7%AC%AC3_2_1)[](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-2.htm#%E7%AC%AC3_2_2)**

**a)**           **[一般形式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-2.htm#%E7%AC%AC3_2_1a)**

**b)**           **[EXIT语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-2.htm#%E7%AC%AC3_2_1b)**

**c)**           **[CYCLE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-2.htm#%E7%AC%AC3_2_1c)**

**3.2.2**                  **[DO WHILE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec3-2.htm#%E7%AC%AC3_2_2)**

**第四章****:** **数据结构**

**4.1**    **[数据类型和属性](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1)**

**4.1.1**    **[类型说明语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_1)**

**a)**          **[一般形式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_1a)**

**b)**          **[类型说明](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_1b)**

**c)**          **[赋初值](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_1c)**

**d)**          **[DATA语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_1d)**

**4.1.2**                  **[种别说明](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_2)**

**a)**          **[种别说明方法](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_2a)**

**b)**          **[种别值](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_2b)**

**c)**          **[种别函数](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_2c)**

**d)**          **[常数种别](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_2d)**

**e)**          **[整数的其他进制](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_2e)**

**4.1.3**                  **[属性说明](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm)**

**a)**          **[属性](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_3a)**

**b)**          **[PARAMETER属性](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_3b)**

**c)**          **[DIMENSION属性](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-1.htm#%E7%AC%AC4_1_3c)**

**4.2**    **[非数值型数据](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-2.htm#%E7%AC%AC4_2)**

**4.2.1**    **[逻辑型数据](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-2.htm#%E7%AC%AC4_2_1)**

**a)**          **[逻辑型变量](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-2.htm#%E7%AC%AC4_2_1a)**

**b)**          **[逻辑赋值](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-2.htm#%E7%AC%AC4_2_1b)**

**4.2.2**    **[字符型数据](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-2.htm#%E7%AC%AC4_2_2)**

**a)**          **[字符变量](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-2.htm#%E7%AC%AC4_2_2a)**

**b)**          **[字符子串](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-2.htm#%E7%AC%AC4_2_2b)**

**c)**          **[字符操作与赋值](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-2.htm#%E7%AC%AC4_2_2c)**

**d)**          **[字符比较](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-2.htm#%E7%AC%AC4_2_2d)**

**e)**          **[字符函数](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-2.htm#%E7%AC%AC4_2_2e)**

**4.3**    **[派生数据类型](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-3.htm#%E7%AC%AC4_3)**

**4.3.1**                  **[数据结构](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-3.htm#%E7%AC%AC4_3_1)**

**4.3.2**                  **[派生类型](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-3.htm#%E7%AC%AC4_3_2)**

**a)**          **[派生类型定义](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-3.htm#%E7%AC%AC4_3_2a)**

**b)**          **[缺省初始化](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-3.htm#%E7%AC%AC4_3_2b)**

**c)**          **[结构构造函数](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-3.htm#%E7%AC%AC4_3_2c)**

**d)**          **[应用](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec4-3.htm#%E7%AC%AC4_3_2d)**

**第五章****:** **数组**

**5.1**    **[数组定义与类型](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm)**

**5.1.1**                  **[定义数组](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_1)**

**a)**          **[数组的描述](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_1a)**

**b)**          **[数组元素](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_1b)**

**c)**          **[数组片段](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_1c)**

**d)**          **[三元下标](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_1d)**

**e)**          **[向量下标](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_1e)**

**5.1.2**                  **[数组类型](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_2)**

**a)**          **[显示形状数组](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_2a)**

**b)**          **[自动数组](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_2b)**

**c)**          **[可调数组](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_2c)**

**d)**          **[假定形状数组](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_2d)**

**e)**          **[假定大小数组](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_2e)**

**f)**          **[延迟形状数组](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-1.htm#%E7%AC%AC5_1_2f)**

**5.2**    **[数组赋值与运算](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm)**

**5.2.1**                  **[赋值](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_1)**

**a)**          **[赋值方式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_1a)**

**b)**          **[数组的存储顺序](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_1b)**

**c)**          **[与DO循环的差异](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_1c)**

**d)**          **[RESHAPE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_1d)**

**e)**          **[WHERE构造](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_1e)**

**f)**          **[FORALL屏蔽赋值](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_1f)**

**5.2.2**                  **[运算](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_2)**

**a)**          **[基本运算](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_2a)**

**b)**          **[数组与数组](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_2b)**

**c)**          **[数组与标量](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_2c)**

**d)**          **[数组内在函数](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_2d)**

**e)**          **[数组的输入输出](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_2e)**

**5.2.3**                  **[数组的动态分配](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_3)**

**a)**          **[可分配数组](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_3a)**

**b)**          **[ALLOCATE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_3b)**

**c)**          **[DEALLOCATE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec5-2.htm#%E7%AC%AC5_2_3c)**

**第六章****:** **过程和模块**

**6.1**    **[程序单元结构](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-1.htm)**

**6.1.1**                  **[概述](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-1.htm#%E7%AC%AC6_1_1)**

**6.1.2**                  **[主程序](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-1.htm#%E7%AC%AC6_1_2)**

**6.1.3**                  **[过程](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-1.htm#%E7%AC%AC6_1_3)**

**a)**          **[外部过程](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-1.htm#%E7%AC%AC6_1_3a)**

**b)**          **[内部过程](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-1.htm#%E7%AC%AC6_1_3b)**

**c)**          **[内在过程](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-1.htm#%E7%AC%AC6_1_3c)**

**6.1.4**                  **[块数据](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-1.htm#%E7%AC%AC6_1_4)**

**6.2**    **[过程](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm)**

**6.2.1**                  **[什么是过程](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_1)**

**a)**          **[分类](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_1a)**

**b)**          **[特性](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_1b)**

**6.2.2**    **[外部过程](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_2)**

**a)**          **[子程序](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_2a)**

**b)**          **[函数](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_2b)**

**c)**          **[EXTERNAL属性和哑过程](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_2c)**

**d)**          **[ENTRY语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_2d)**

**6.2.3**    **[变元的性质](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_3)**

**a)**           **[INTENT属性](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_3a)**

**b)**          **[SAVE属性](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_3b)**

**c)**           **[关键字变元](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_3c)**

**d)**           **[可选择变元与OPTIONAL属性](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_3d)**

**e)**           **[哑元改名](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_3e)**

**f)**           **[INTRINSIC属性](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_3f)**

**6.2.4**                  **[其它过程](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_4)**

**a)**          **[内部过程](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_4a)**

**b)**          **[递归过程](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_4b)**

**c)**          **[类属过程](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_4c)**

**d)**          **[多层调用](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_4d)**

**6.2.5**    **[过程接口](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_5)**

**a)**          **[接口形式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_5a)**

**b)**          **[INTERFACE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_5b)**

**c)**          **[必需接口](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_5c)**

**d)**          **[超载操作符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_5d)**

**e)**          **[自定义操作符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_5e)**

**f)**          **[超载赋值号](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_5f)**

**6.2.6**    **[作用域](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_6)[](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_6)**

**a)**          **[作用域单元](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_6a)**

**b)**          **[名称的作用域](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-2.htm#%E7%AC%AC6_2_6b)**

**6.3**    **[模块](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm)**

**6.3.1**                  **[数据共享](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_1)**

**a)**          **[共享方式](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_1a)**

**b)**          **[COMMON语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_1b)**

**c)**          **[EQUIVALENCE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_1c)**

**d)**          **[INCLUDE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_1d)**

**e)**          **[模块](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_1e)**

**6.3.2**    **[模块的用法](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_2)**

**a)**          **[定义模块](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_2a)**

**b)**          **[引用模块](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_2b)**

**6.3.3**    **[模块的应用](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_3)**

**a)**          **[全局数据](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_3a)**

**b)**          **[过程共享](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_3b)**

**c)**          **[公用派生类型](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_3c)**

**d)**          **[全局可分配数组](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_3d)**

**e)**          **[抽象数据类型和超载运算](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec6-3.htm#%E7%AC%AC6_3_3e)**

**第七章****:** **输入输出和文件**

**7.1**    **[输入输出编辑](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm)**

**7.1.1**    **[输入输出语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_1)**

**a)**          **[相关语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_1a)**

**b)**          **[WRITE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_1b)**

**c)**          **[PRINT和TYPE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_1c)**

**d)**          **[READ语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_1d)**

**7.1.2**    **[I/O列表](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_2)**

**a)**          **[NAMELIST语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_2a)**

**b)**          **[I/O列表实体](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_2b)**

**7.1.3**    **[非格式输入输出编辑](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_3)**

**a)**          **[直接列表I/O](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_3a)**

**b)**          **[名称列表I/O](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_3b)**

**7.1.4**    **[格式化输出编辑](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4)**

**a)**          **[格式化I/O和ASSIGN语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4a)**

**b)**          **[输出规则](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4b)**

**c)**          **[可重复编辑描述符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4c)**

**d)**          **[I编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4d)**

**e)**          **[F编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4e)**

**f)**          **[可变格式输出](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4f)**

**g)**          **[E编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4g)**

**h)**          **[G编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4h)**

**i)**          **[D编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4i)**

**j)**          **[L编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4j)**

**k)**          **[A编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4k)**

**l)**          **[B、O、Z编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4l)**

**m)**          **[EN、ES编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4m)**

**n)**          **[不可重复编辑描述符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4n)**

**o)**          **[撇号编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4o)**

**p)**          **[H编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4p)**

**q)**          **[X编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4q)**

**r)**          **[纵向控制符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4r)**

**s)**          **[斜杠编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4s)**

**t)**          **[反斜杠编辑符和美元编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4t)**

**u)**          **[T,TL,TR编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4u)**

**v)**          **[冒号编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4v)**

**w)**          **[P编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4w)**

**x)**          **[SP,SS,S编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4x)**

**y)**          **[输出格式指定和I/O列表](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_4y)**

**7.1.5**    **[格式化输入编辑](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_5)**

**a)**          **[输入规则](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_5a)**

**b)**          **[整数输入](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_5b)**

**c)**          **[实数、复数和双精度数的输入](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_5c)**

**d)**          **[逻辑型和字符型数据的输入](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_5d)**

**e)**          **[BN、BZ编辑符](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_5e)**

**f)**          **[Q编辑符和可变格式输入](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_5f)**

**g)**          **[输入格式指定和I/O列表](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-1.htm#%E7%AC%AC7_1_5g)**

**7.2**    **[文件的存取](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm)**

**7.2.1**     **[逻辑设备和文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_1)**

**a)**          **[逻辑设备](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_1a)**

**b)**          **[外部文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_1b)**

**c)**          **[内部文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_1c)**

**7.2.2**     **[外部文件分类](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_2)**

**a)**          **[格式化文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_2a)**

**b)**          **[无格式文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_2b)**

**c)**          **[二进制文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_2c)**

**d)**          **[顺序访问文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_2d)**

**e)**          **[直接访问文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_2e)**

**7.2.3**     **[文件记录的存取](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_3)**

**a)**          **[格式化顺序文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_3a)**

**b)**          **[格式化直接文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_3b)**

**c)**          **[无格式顺序文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_3c)**

**d)**          **[无格式直接文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_3d)**

**e)**          **[二进制顺序文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_3e)**

**f)**          **[二进制直接文件](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_3f)**

**7.2.4**     **[文件操作语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_4)**

**a)**          **[OPEN与DEFINE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_4a)**

**b)**          **[ENDFILE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_4b)**

**c)**          **[CLOSE语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_4c)**

**d)**          **[文件指针定位语句](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_4d)**

**7.2.5**     **[使用硬件设备](http://micro.ustc.edu.cn/Fortran/ZJDing/Sec7-2.htm#%E7%AC%AC7_2_5)**

考试内容
