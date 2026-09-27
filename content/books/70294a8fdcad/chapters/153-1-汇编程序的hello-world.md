之前我们学习了如何用C标准I/O库读写文件，本章详细讲解这些I/O操作是怎么实现的。所有I/O操作最终都是在内核中做的，以前我们用的C标准I/O库函数最终也是通过系统调用把I/O操作从用户空间传给内核，然后让内核去做I/O操作，本章和下一章会介绍内核中I/O子系统的工作原理。首先看一个打印Hello world的汇编程序，了解I/O操作是怎样通过系统调用传给内核的。

**例 28.1. 汇编程序的Hello world**

.data					# section declaration

msg:
	.ascii	"Hello, world!\\n"	# our dear string
	len = . - msg			# length of our dear string

.text					# section declaration

			# we must export the entry point to the ELF linker or
    .global \_start	# loader. They conventionally recognize \_start as their
			# entry point. Use ld -e foo to override the default.

\_start:

# write our string to stdout

	movl	$len,%edx	# third argument: message length
	movl	$msg,%ecx	# second argument: pointer to message to write
	movl	$1,%ebx		# first argument: file handle (stdout)
	movl	$4,%eax		# system call number (sys\_write)
	int	$0x80		# call kernel

# and exit

	movl	$0,%ebx		# first argument: exit code
	movl	$1,%eax		# system call number (sys\_exit)
	int	$0x80		# call kernel

像以前一样，汇编、链接、运行：

$ as -o hello.o hello.s
$ ld -o hello hello.o
$ ./hello
Hello, world!

这段汇编相当于以下C代码：

#include <unistd.h>

char msg\[14\] = "Hello, world!\\n";
#define len 14

int main(void)
{
	write(1, msg, len);
	\_exit(0);
}

`.data`段有一个标号`msg`，代表字符串`"Hello, world!\n"`的首地址，相当于C程序的一个全局变量。注意在C语言中字符串的末尾隐含有一个`'\0'`，而汇编指示`.ascii`定义的字符串末尾没有隐含的`'\0'`。汇编程序中的`len`代表一个常量，它的值由当前地址减去符号`msg`所代表的地址得到，换句话说就是字符串`"Hello, world!\n"`的长度。现在解释一下这行代码中的“.”，汇编器总是从前到后把汇编代码转换成目标文件，在这个过程中维护一个地址计数器，当处理到每个段的开头时把地址计数器置成0，然后每处理一条汇编指示或指令就把地址计数器增加相应的字节数，在汇编程序中用“.”可以取出当前地址计数器的值，该值是一个常量。

在`_start`中调了两个系统调用，第一个是`write`系统调用，第二个是以前讲过的`_exit`系统调用。在调`write`系统调用时，`eax`寄存器保存着`write`的系统调用号4，`ebx`、`ecx`、`edx`寄存器分别保存着`write`系统调用需要的三个参数。`ebx`保存着文件描述符，进程中每个打开的文件都用一个编号来标识，称为文件描述符，文件描述符1表示标准输出，对应于C标准I/O库的`stdout`。`ecx`保存着输出缓冲区的首地址。`edx`保存着输出的字节数。`write`系统调用把从`msg`开始的`len`个字节写到标准输出。

C代码中的`write`函数是系统调用的包装函数，其内部实现就是把传进来的三个参数分别赋给`ebx`、`ecx`、`edx`寄存器，然后执行`movl $4,%eax`和`int $0x80`两条指令。这个函数不可能完全用C代码来写，因为任何C代码都不会编译生成`int`指令，所以这个函数有可能是完全用汇编写的，也可能是用C内联汇编写的，甚至可能是一个宏定义（省了参数入栈出栈的步骤）。`_exit`函数也是如此，我们讲过这些系统调用的包装函数位于Man Page的第2个Section。
