`ioctl`用于向设备发控制和配置命令，有些命令也需要读写一些数据，但这些数据是不能用`read`/`write`读写的，称为Out-of-band数据。也就是说，`read`/`write`读写的数据是in-band数据，是I/O操作的主体，而`ioctl`命令传送的是控制信息，其中的数据是辅助的数据。例如，在串口线上收发数据通过`read`/`write`操作，而串口的波特率、校验位、停止位通过`ioctl`设置，A/D转换的结果通过`read`读取，而A/D转换的精度和工作频率通过`ioctl`设置。

#include <sys/ioctl.h>

int ioctl(int d, int request, ...);

`d`是某个设备的文件描述符。`request`是`ioctl`的命令，可变参数取决于`request`，通常是一个指向变量或结构体的指针。若出错则返回-1，若成功则返回其他值，返回值也是取决于`request`。

以下程序使用`TIOCGWINSZ`命令获得终端设备的窗口大小。

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/ioctl.h>

int main(void)
{
	struct winsize size;
	if (isatty(STDOUT\_FILENO) == 0)
		exit(1);
	if(ioctl(STDOUT\_FILENO, TIOCGWINSZ, &size)<0) {
		perror("ioctl TIOCGWINSZ error");
		exit(1);
	}
	printf("%d rows, %d columns\\n", size.ws\_row, size.ws\_col);
	return 0;
}

在图形界面的终端里多次改变终端窗口的大小并运行该程序，观察结果。
