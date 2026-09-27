`const`限定符和指针结合起来常见的情况有以下几种。

const int \*a;
int const \*a;

这两种写法是一样的，`a`是一个指向`const int`型的指针，`a`所指向的内存单元不可改写，所以`(*a)++`是不允许的，但`a`可以改写，所以`a++`是允许的。

int \* const a;

`a`是一个指向`int`型的`const`指针，`*a`是可以改写的，但`a`不允许改写。

int const \* const a;

`a`是一个指向`const int`型的`const`指针，因此`*a`和`a`都不允许改写。

指向非`const`变量的指针或者非`const`变量的地址可以传给指向`const`变量的指针，编译器可以做隐式类型转换，例如：

char c = 'a';
const char \*pc = &c;

但是，指向`const`变量的指针或者`const`变量的地址不可以传给指向非`const`变量的指针，以免透过后者意外改写了前者所指向的内存单元，例如对下面的代码编译器会报警告：

const char c = 'a';
char \*pc = &c;

即使不用`const`限定符也能写出功能正确的程序，但良好的编程习惯应该尽可能多地使用`const`，因为：

1.  `const`给读代码的人传达非常有用的信息。比如一个函数的参数是`const char *`，你在调用这个函数时就可以放心地传给它`char *`或`const char *`指针，而不必担心指针所指的内存单元被改写。
    
2.  尽可能多地使用`const`限定符，把不该变的都声明成只读，这样可以依靠编译器检查程序中的Bug，防止意外改写数据。
    
3.  `const`对编译器优化是一个有用的提示，编译器也许会把`const`变量优化成常量。
    

在[第 3 节 “变量的存储布局”](http://akaedu.github.io/book/ch19s03.html#asmc.layout)我们看到，字符串字面值通常分配在`.rodata`段，而在[第 4 节 “字符串”](http://akaedu.github.io/book/ch08s04.html#array.string)提到，字符串字面值类似于数组名，做右值使用时自动转换成指向首元素的指针，这种指针应该是`const char *`型。我们知道`printf`函数原型的第一个参数是`const char *`型，可以把`char *`或`const char *`指针传给它，所以下面这些调用都是合法的：

const char \*p = "abcd";
const char str1\[5\] = "abcd";
char str2\[5\] = "abcd";
printf(p);
printf(str1);
printf(str2);
printf("abcd");

注意上面第一行，如果要定义一个指针指向字符串字面值，这个指针应该是`const char *`型，如果写成`char *p = "abcd";`就不好了，有隐患，例如：

int main(void)
{
	char \*p = "abcd";
...
	\*p = 'A';
...
}

`p`指向`.rodata`段，不允许改写，但编译器不会报错，在运行时会出现段错误。
