先前我们以`read`终端设备为例介绍了非阻塞I/O，为什么我们不直接对`STDIN_FILENO`做非阻塞`read`，而要重新`open`一遍`/dev/tty`呢？因为`STDIN_FILENO`在程序启动时已经被自动打开了，而我们需要在调用`open`时指定`O_NONBLOCK`标志。这里介绍另外一种办法，可以用`fcntl`函数改变一个已打开的文件的属性，可以重新设置读、写、追加、非阻塞等标志（这些标志称为File Status Flag），而不必重新`open`文件。

#include <unistd.h>
#include <fcntl.h>

int fcntl(int fd, int cmd);
int fcntl(int fd, int cmd, long arg);
int fcntl(int fd, int cmd, struct flock \*lock);

这个函数和`open`一样，也是用可变参数实现的，可变参数的类型和个数取决于前面的`cmd`参数。下面的例子使用`F_GETFL`和`F_SETFL`这两种`fcntl`命令改变`STDIN_FILENO`的属性，加上`O_NONBLOCK`选项，实现和[例 28.3 “非阻塞读终端”](http://akaedu.github.io/book/ch28s04.html#io.nonblockread)同样的功能。

**例 28.5. 用fcntl改变File Status Flag**

#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <string.h>
#include <stdlib.h>

#define MSG\_TRY "try again\\n"

int main(void)
{
	char buf\[10\];
	int n;
	int flags;
	flags = fcntl(STDIN\_FILENO, F\_GETFL);
	flags |= O\_NONBLOCK;
	if (fcntl(STDIN\_FILENO, F\_SETFL, flags) == -1) {
		perror("fcntl");
		exit(1);
	}
tryagain:
	n = read(STDIN\_FILENO, buf, 10);
	if (n < 0) {
		if (errno == EAGAIN) {
			sleep(1);
			write(STDOUT\_FILENO, MSG\_TRY, strlen(MSG\_TRY));
			goto tryagain;
		}
		perror("read stdin");
		exit(1);
	}
	write(STDOUT\_FILENO, buf, n);
	return 0;
}

以下程序通过命令行的第一个参数指定一个文件描述符，同时利用Shell的重定向功能在该描述符上打开文件，然后用`fcntl`的`F_GETFL`命令取出File Status Flag并打印。

#include <sys/types.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char \*argv\[\])
{
	int val;
	if (argc != 2) {
		fputs("usage: a.out <descriptor#>\\n", stderr);
		exit(1);
	}
	if ((val = fcntl(atoi(argv\[1\]), F\_GETFL)) < 0) {
		printf("fcntl error for fd %d\\n", atoi(argv\[1\]));
		exit(1);
	}
	switch(val & O\_ACCMODE) {
	case O\_RDONLY:
		printf("read only");
		break;
	case O\_WRONLY:
		printf("write only");
		break;
	case O\_RDWR:            
		printf("read write");
		break;
	default:
		fputs("invalid access mode\\n", stderr);
		exit(1);
	}
	if (val & O\_APPEND)  
		printf(", append");
	if (val & O\_NONBLOCK)           
		printf(", nonblocking");
	putchar('\\n');
	return 0;
}

运行该程序的几种情况解释如下。

$ ./a.out 0 < /dev/tty
read only

Shell在执行`a.out`时将它的标准输入重定向到`/dev/tty`，并且是只读的。`argv[1]`是0，因此取出文件描述符0（也就是标准输入）的File Status Flag，用掩码`O_ACCMODE`取出它的读写位，结果是`O_RDONLY`。注意，Shell的重定向语法不属于程序的命令行参数，这个命行只有两个参数，`argv[0]`是"./a.out"，`argv[1]`是"0"，重定向由Shell解释，在启动程序时已经生效，程序在运行时并不知道标准输入被重定向了。

$ ./a.out 1 > temp.foo
$ cat temp.foo
write only

Shell在执行`a.out`时将它的标准输出重定向到文件`temp.foo`，并且是只写的。程序取出文件描述符1的File Status Flag，发现是只写的，于是打印`write only`，但是打印不到屏幕上而是打印到`temp.foo`这个文件中了。

$ ./a.out 2 2>>temp.foo
write only, append

Shell在执行`a.out`时将它的标准错误输出重定向到文件`temp.foo`，并且是只写和追加方式。程序取出文件描述符2的File Status Flag，发现是只写和追加方式的。

$ ./a.out 5 5<>temp.foo
read write

Shell在执行`a.out`时在它的文件描述符5上打开文件`temp.foo`，并且是可读可写的。程序取出文件描述符5的File Status Flag，发现是可读可写的。

我们看到一种新的Shell重定向语法，如果在<、>、>>、<>前面添一个数字，该数字就表示在哪个文件描述符上打开文件，例如2>>temp.foo表示将标准错误输出重定向到文件temp.foo并且以追加方式写入文件，注意2和>>之间不能有空格，否则2就被解释成命令行参数了。文件描述符数字还可以出现在重定向符号右边，例如：

$ command > /dev/null 2>&1

首先将某个命令command的标准输出重定向到`/dev/null`，然后将该命令可能产生的错误信息（标准错误输出）也重定向到和标准输出（用&1标识）相同的文件，即`/dev/null`，如下图所示。

**图 28.3. 重定向之后的文件描述符表**

![重定向之后的文件描述符表](http://akaedu.github.io/book/images/io.fdredirect.png)

`/dev/null`设备文件只有一个作用，往它里面写任何数据都被直接丢弃。因此保证了该命令执行时屏幕上没有任何输出，既不打印正常信息也不打印错误信息，让命令安静地执行，这种写法在Shell脚本中很常见。注意，文件描述符数字写在重定向符号右边需要加&号，否则就被解释成文件名了，2>&1其中的>左右两边都不能有空格。

除了`F_GETFL`和`F_SETFL`命令之外，`fcntl`还有很多命令做其它操作，例如设置文件记录锁等。可以通过`fcntl`设置的都是当前进程如何访问设备或文件的访问控制属性，例如读、写、追加、非阻塞、加锁等，但并不设置文件或设备本身的属性，例如文件的读写权限、串口波特率等。下一节要介绍的`ioctl`函数用于设置某些设备本身的属性，例如串口波特率、终端窗口大小，注意区分这两个函数的作用。
