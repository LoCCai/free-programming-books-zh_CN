`switch`语句可以产生具有多个分支的控制流程。它的格式是：

switch (控制表达式) {  
case 常量表达式： 语句列表  
case 常量表达式： 语句列表  
...  
default： 语句列表  
}

例如以下程序根据传入的参数1~7分别打印Monday~Sunday：

**例 4.1. switch语句**

![](http://akaedu.github.io/book/images/cond.switch1.png)

如果传入的参数是2，则从`case 2`分支开始执行，先是打印相应的信息，然后遇到`break`语句，它的作用是跳出整个`switch`语句块。C语言规定各`case`分支的常量表达式必须互不相同，如果控制表达式不等于任何一个常量表达式，则从`default`分支开始执行，通常把`default`分支写在最后，但不是必须的。使用`switch`语句要注意几点：

1.  `case`后面跟表达式的必须是常量表达式，这个值和全局变量的初始值一样必须在编译时计算出来。
    
2.  [第 2 节 “if/else语句”](http://akaedu.github.io/book/ch04s02.html#cond.ifelse)讲过浮点型不适合做精确比较，所以C语言规定`case`后面跟的必须是整型常量表达式。
    
3.  进入`case`后如果没有遇到`break`语句就会一直往下执行，后面其它`case`或`default`分支的语句也会被执行到，直到遇到`break`，或者执行到整个`switch`语句块的末尾。通常每个`case`后面都要加上`break`语句，但有时会故意不加`break`来利用这个特性，例如：
    
    **例 4.2. 缺break的switch语句**
    
    ![](http://akaedu.github.io/book/images/cond.switch2.png)
    
      
    

`switch`语句不是必不可缺的，显然可以用一组`if ... else if ... else if ... else ...`代替，但是一方面用`switch`语句会使代码更清晰，另一方面，有时候编译器会对`switch`语句进行整体优化，使它比等价的`if/else`语句所生成的指令效率更高。
