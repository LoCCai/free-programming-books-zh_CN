`open`函数可以打开或创建一个文件。

#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int open(const char \*pathname, int flags);
int open(const char \*pathname, int flags, mode\_t mode);
返回值：成功返回新分配的文件描述符，出错返回-1并设置errno

在Man Page中`open`函数有两种形式，一种带两个参数，一种带三个参数，其实在C代码中`open`函数是这样声明的：

int open(const char \*pathname, int flags, ...);

最后的可变参数可以是0个或1个，由`flags`参数中的标志位决定，见下面的详细说明。

`pathname`参数是要打开或创建的文件名，和`fopen`一样，`pathname`既可以是相对路径也可以是绝对路径。`flags`参数有一系列常数值可供选择，可以同时选择多个常数用按位或运算符连接起来，所以这些常数的宏定义都以`O_`开头，表示or。

必选项：以下三个常数中必须指定一个，且仅允许指定一个。

-   `O_RDONLY` 只读打开
    
-   `O_WRONLY` 只写打开
    
-   `O_RDWR` 可读可写打开
    

以下可选项可以同时指定0个或多个，和必选项按位或起来作为`flags`参数。可选项有很多，这里只介绍一部分，其它选项可参考`open(2)`的Man Page：

-   `O_APPEND` 表示追加。如果文件已有内容，这次打开文件所写的数据附加到文件的末尾而不覆盖原来的内容。
    
-   `O_CREAT` 若此文件不存在则创建它。使用此选项时需要提供第三个参数`mode`，表示该文件的访问权限。
    
-   `O_EXCL` 如果同时指定了`O_CREAT`，并且文件已存在，则出错返回。
    
-   `O_TRUNC` 如果文件已存在，并且以只写或可读可写方式打开，则将其长度截断（Truncate）为0字节。
    
-   `O_NONBLOCK` 对于设备文件，以`O_NONBLOCK`方式打开可以做非阻塞I/O（Nonblock I/O），非阻塞I/O在下一节详细讲解。
    

注意`open`函数与C标准I/O库的`fopen`函数有些细微的区别：

-   以可写的方式`fopen`一个文件时，如果文件不存在会自动创建，而`open`一个文件时必须明确指定`O_CREAT`才会创建文件，否则文件不存在就出错返回。
    
-   以`w`或`w+`方式`fopen`一个文件时，如果文件已存在就截断为0字节，而`open`一个文件时必须明确指定`O_TRUNC`才会截断文件，否则直接在原来的数据上改写。
    

第三个参数`mode`指定文件权限，可以用八进制数表示，比如0644表示`-rw-r--r--`，也可以用`S_IRUSR`、`S_IWUSR`等宏定义按位或起来表示，详见`open(2)`的Man Page。要注意的是，文件权限由`open`的`mode`参数和当前进程的`umask`掩码共同决定。

补充说明一下Shell的`umask`命令。Shell进程的`umask`掩码可以用`umask`命令查看：

$ umask
0022

用`touch`命令创建一个文件时，创建权限是0666，而`touch`进程继承了Shell进程的`umask`掩码，所以最终的文件权限是0666&~022=0644。

$ touch file123
$ ls -l file123
-rw-r--r-- 1 akaedu akaedu 0 2009-03-08 15:07 file123

同样道理，用`gcc`编译生成一个可执行文件时，创建权限是0777，而最终的文件权限是0777&~022=0755。

$ gcc main.c
$ ls -l a.out
-rwxr-xr-x 1 akaedu akaedu 6483 2009-03-08 15:07 a.out

我们看到的都是被`umask`掩码修改之后的权限，那么如何证明`touch`或`gcc`创建文件的权限本来应该是0666和0777呢？我们可以把Shell进程的`umask`改成0，再重复上述实验：

$ umask 0
$ touch file123
$ rm file123 a.out
$ touch file123
$ ls -l file123
-rw-rw-rw- 1 akaedu akaedu 0 2009-03-08 15:09 file123
$ gcc main.c
$ ls -l a.out
-rwxrwxrwx 1 akaedu akaedu 6483 2009-03-08 15:09 a.out

现在我们自己写一个程序，在其中调用`open("somefile", O_WRONLY|O_CREAT, 0664);`创建文件，然后在Shell中运行并查看结果：

$ umask 022
$ ./a.out
$ ls -l somefile
-rw-r--r-- 1 akaedu akaedu 6483 2009-03-08 15:11 somefile

不出所料，文件`somefile`的权限是0664&~022=0644。有几个问题现在我没有解释：为什么被Shell启动的进程可以继承Shell进程的`umask`掩码？为什么`umask`命令可以读写Shell进程的`umask`掩码？这些问题将在[第 1 节 “引言”](http://akaedu.github.io/book/ch30s01.html#process.intro)解释。

`close`函数关闭一个已打开的文件：

#include <unistd.h>

int close(int fd);
返回值：成功返回0，出错返回-1并设置errno

参数`fd`是要关闭的文件描述符。需要说明的是，当一个进程终止时，内核对该进程所有尚未关闭的文件描述符调用`close`关闭，所以即使用户程序不调用`close`，在终止时内核也会自动关闭它打开的所有文件。但是对于一个长年累月运行的程序（比如网络服务器），打开的文件描述符一定要记得关闭，否则随着打开的文件越来越多，会占用大量文件描述符和系统资源。

由`open`返回的文件描述符一定是该进程尚未使用的最小描述符。由于程序启动时自动打开文件描述符0、1、2，因此第一次调用`open`打开文件通常会返回描述符3，再调用`open`就会返回4。可以利用这一点在标准输入、标准输出或标准错误输出上打开一个新文件，实现重定向的功能。例如，首先调用`close`关闭文件描述符1，然后调用`open`打开一个常规文件，则一定会返回文件描述符1，这时候标准输出就不再是终端，而是一个常规文件了，再调用`printf`就不会打印到屏幕上，而是写到这个文件中了。后面要讲的`dup2`函数提供了另外一种办法在指定的文件描述符上打开文件。

### 习题

1、在系统头文件中查找`flags`和`mode`参数用到的这些宏定义的值是多少。把这些宏定义按位或起来是什么效果？为什么必选项只能选一个而可选项可以选多个？

2、请按照下述要求分别写出相应的`open`调用。

-   打开文件`/home/akae.txt`用于写操作，以追加方式打开
    
-   打开文件`/home/akae.txt`用于写操作，如果该文件不存在则创建它
    
-   打开文件`/home/akae.txt`用于写操作，如果该文件已存在则截断为0字节，如果该文件不存在则创建它
    
-   打开文件`/home/akae.txt`用于写操作，如果该文件已存在则报错退出，如果该文件不存在则创建它
