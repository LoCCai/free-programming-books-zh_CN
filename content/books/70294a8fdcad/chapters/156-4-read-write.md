`read`函数从打开的设备或文件中读取数据。

#include <unistd.h>

ssize\_t read(int fd, void \*buf, size\_t count);
返回值：成功返回读取的字节数，出错返回-1并设置errno，如果在调read之前已到达文件末尾，则这次read返回0

参数`count`是请求读取的字节数，读上来的数据保存在缓冲区`buf`中，同时文件的当前读写位置向后移。注意这个读写位置和使用C标准I/O库时的读写位置有可能不同，这个读写位置是记在内核中的，而使用C标准I/O库时的读写位置是用户空间I/O缓冲区中的位置。比如用`fgetc`读一个字节，`fgetc`有可能从内核中预读1024个字节到I/O缓冲区中，再返回第一个字节，这时该文件在内核中记录的读写位置是1024，而在`FILE`结构体中记录的读写位置是1。注意返回值类型是`ssize_t`，表示有符号的`size_t`，这样既可以返回正的字节数、0（表示到达文件末尾）也可以返回负值-1（表示出错）。`read`函数返回时，返回值说明了`buf`中前多少个字节是刚读上来的。有些情况下，实际读到的字节数（返回值）会小于请求读的字节数`count`，例如：

-   读常规文件时，在读到`count`个字节之前已到达文件末尾。例如，距文件末尾还有30个字节而请求读100个字节，则`read`返回30，下次`read`将返回0。
    
-   从终端设备读，通常以行为单位，读到换行符就返回了。
    
-   从网络读，根据不同的传输层协议和内核缓存机制，返回值可能小于请求的字节数，后面socket编程部分会详细讲解。
    

`write`函数向打开的设备或文件中写数据。

#include <unistd.h>

ssize\_t write(int fd, const void \*buf, size\_t count);
返回值：成功返回写入的字节数，出错返回-1并设置errno

写常规文件时，`write`的返回值通常等于请求写的字节数`count`，而向终端设备或网络写则不一定。

读常规文件是不会阻塞的，不管读多少字节，`read`一定会在有限的时间内返回。从终端设备或网络读则不一定，如果从终端输入的数据没有换行符，调用`read`读终端设备就会阻塞，如果网络上没有接收到数据包，调用`read`从网络读就会阻塞，至于会阻塞多长时间也是不确定的，如果一直没有数据到达就一直阻塞在那里。同样，写常规文件是不会阻塞的，而向终端设备或网络写则不一定。

现在明确一下阻塞（Block）这个概念。当进程调用一个阻塞的系统函数时，该进程被置于睡眠（Sleep）状态，这时内核调度其它进程运行，直到该进程等待的事件发生了（比如网络上接收到数据包，或者调用`sleep`指定的睡眠时间到了）它才有可能继续运行。与睡眠状态相对的是运行（Running）状态，在Linux内核中，处于运行状态的进程分为两种情况：

-   正在被调度执行。CPU处于该进程的上下文环境中，程序计数器（`eip`）里保存着该进程的指令地址，通用寄存器里保存着该进程运算过程的中间结果，正在执行该进程的指令，正在读写该进程的地址空间。
    
-   就绪状态。该进程不需要等待什么事件发生，随时都可以执行，但CPU暂时还在执行另一个进程，所以该进程在一个就绪队列中等待被内核调度。系统中可能同时有多个就绪的进程，那么该调度谁执行呢？内核的调度算法是基于优先级和时间片的，而且会根据每个进程的运行情况动态调整它的优先级和时间片，让每个进程都能比较公平地得到机会执行，同时要兼顾用户体验，不能让和用户交互的进程响应太慢。
    

下面这个小程序从终端读数据再写回终端。

**例 28.2. 阻塞读终端**

#include <unistd.h>
#include <stdlib.h>

int main(void)
{
	char buf\[10\];
	int n;
	n = read(STDIN\_FILENO, buf, 10);
	if (n < 0) {
		perror("read STDIN\_FILENO");
		exit(1);
	}
	write(STDOUT\_FILENO, buf, n);
	return 0;
}

执行结果如下：

$ ./a.out 
hello（回车）
hello
$ ./a.out 
hello world（回车）
hello worl$ d
bash: d: command not found

第一次执行`a.out`的结果很正常，而第二次执行的过程有点特殊，现在分析一下：

1.  Shell进程创建`a.out`进程，`a.out`进程开始执行，而Shell进程睡眠等待`a.out`进程退出。
    
2.  `a.out`调用`read`时睡眠等待，直到终端设备输入了换行符才从`read`返回，`read`只读走10个字符，剩下的字符仍然保存在内核的终端设备输入缓冲区中。
    
3.  `a.out`进程打印并退出，这时Shell进程恢复运行，Shell继续从终端读取用户输入的命令，于是读走了终端设备输入缓冲区中剩下的字符d和换行符，把它当成一条命令解释执行，结果发现执行不了，没有d这个命令。
    

如果在`open`一个设备时指定了`O_NONBLOCK`标志，`read`/`write`就不会阻塞。以`read`为例，如果设备暂时没有数据可读就返回-1，同时置`errno`为`EWOULDBLOCK`（或者`EAGAIN`，这两个宏定义的值相同），表示本来应该阻塞在这里（would block，虚拟语气），事实上并没有阻塞而是直接返回错误，调用者应该试着再读一次（again）。这种行为方式称为轮询（Poll），调用者只是查询一下，而不是阻塞在这里死等，这样可以同时监视多个设备：

while(1) {
	非阻塞read(设备1);
	if(设备1有数据到达)
		处理数据;
	非阻塞read(设备2);
	if(设备2有数据到达)
		处理数据;
	...
}

如果`read(设备1)`是阻塞的，那么只要设备1没有数据到达就会一直阻塞在设备1的`read`调用上，即使设备2有数据到达也不能处理，使用非阻塞I/O就可以避免设备2得不到及时处理。

非阻塞I/O有一个缺点，如果所有设备都一直没有数据到达，调用者需要反复查询做无用功，如果阻塞在那里，操作系统可以调度别的进程执行，就不会做无用功了。在使用非阻塞I/O时，通常不会在一个`while`循环中一直不停地查询（这称为Tight Loop），而是每延迟等待一会儿来查询一下，以免做太多无用功，在延迟等待的时候可以调度其它进程执行。

while(1) {
	非阻塞read(设备1);
	if(设备1有数据到达)
		处理数据;
	非阻塞read(设备2);
	if(设备2有数据到达)
		处理数据;
	...
	sleep(n);
}

这样做的问题是，设备1有数据到达时可能不能及时处理，最长需延迟n秒才能处理，而且反复查询还是做了很多无用功。以后要学习的`select(2)`函数可以阻塞地同时监视多个设备，还可以设定阻塞等待的超时时间，从而圆满地解决了这个问题。

以下是一个非阻塞I/O的例子。目前我们学过的可能引起阻塞的设备只有终端，所以我们用终端来做这个实验。程序开始执行时在0、1、2文件描述符上自动打开的文件就是终端，但是没有`O_NONBLOCK`标志。所以就像[例 28.2 “阻塞读终端”](http://akaedu.github.io/book/ch28s04.html#io.blockread)一样，读标准输入是阻塞的。我们可以重新打开一遍设备文件`/dev/tty`（表示当前终端），在打开时指定`O_NONBLOCK`标志。

**例 28.3. 非阻塞读终端**

#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <string.h>
#include <stdlib.h>

#define MSG\_TRY "try again\\n"

int main(void)
{
	char buf\[10\];
	int fd, n;
	fd = open("/dev/tty", O\_RDONLY|O\_NONBLOCK);
	if(fd<0) {
		perror("open /dev/tty");
		exit(1);
	}
tryagain:
	n = read(fd, buf, 10);
	if (n < 0) {
		if (errno == EAGAIN) {
			sleep(1);
			write(STDOUT\_FILENO, MSG\_TRY, strlen(MSG\_TRY));
			goto tryagain;
		}	
		perror("read /dev/tty");
		exit(1);
	}
	write(STDOUT\_FILENO, buf, n);
	close(fd);
	return 0;
}

以下是用非阻塞I/O实现等待超时的例子。既保证了超时退出的逻辑又保证了有数据到达时处理延迟较小。

**例 28.4. 非阻塞读终端和等待超时**

#include <unistd.h>
#include <fcntl.h>
#include <errno.h>
#include <string.h>
#include <stdlib.h>

#define MSG\_TRY "try again\\n"
#define MSG\_TIMEOUT "timeout\\n"

int main(void)
{
	char buf\[10\];
	int fd, n, i;
	fd = open("/dev/tty", O\_RDONLY|O\_NONBLOCK);
	if(fd<0) {
		perror("open /dev/tty");
		exit(1);
	}
	for(i=0; i<5; i++) {
		n = read(fd, buf, 10);
		if(n>=0)
			break;
		if(errno!=EAGAIN) {
			perror("read /dev/tty");
			exit(1);
		}
		sleep(1);
		write(STDOUT\_FILENO, MSG\_TRY, strlen(MSG\_TRY));
	}
	if(i==5)
		write(STDOUT\_FILENO, MSG\_TIMEOUT, strlen(MSG\_TIMEOUT));
	else
		write(STDOUT\_FILENO, buf, n);
	close(fd);
	return 0;
}
