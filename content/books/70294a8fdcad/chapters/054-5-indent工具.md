`indent`工具可以把代码格式化成某种风格，例如把[例 9.1 “缺少缩进和空白的代码”](http://akaedu.github.io/book/ch09s01.html#codingstyle.badcode)格式化成内核编码风格：

$ indent -kr -i8 main.c 
$ cat main.c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
int main(void)
{
	char gesture\[3\]\[10\] = { "scissor", "stone", "cloth" };
	int man, computer, result, ret;
	srand(time(NULL));
	while (1) {
		computer = rand() % 3;
		printf
		    ("\\nInput your gesture (0-scissor 1-stone 2-cloth):\\n");
		ret = scanf("%d", &man);
		if (ret != 1 || man < 0 || man > 2) {
			printf("Invalid input! Please input 0, 1 or 2.\\n");
			continue;
		}
		printf("Your gesture: %s\\tComputer's gesture: %s\\n",
		       gesture\[man\], gesture\[computer\]);
		result = (man - computer + 4) % 3 - 1;
		if (result > 0)
			printf("You win!\\n");
		else if (result == 0)
			printf("Draw!\\n");
		else
			printf("You lose!\\n");
	}
	return 0;
}

`-kr`选项表示K&R风格，`-i8`表示缩进8个空格的长度。如果没有指定`-nut`选项，则每8个缩进空格会自动用一个Tab代替。注意`indent`命令会直接修改原文件，而不是打印到屏幕上或者输出到另一个文件，这一点和很多UNIX命令不同。可以看出，`-kr -i8`两个选项格式化出来的代码已经很符合本章介绍的代码风格了，添加了必要的缩进和空白，较长的代码行也会自动折行。美中不足的是没有添加适当的空行，因为`indent`工具也不知道哪几行代码在逻辑上是一组的，空行还是要自己动手添，当然原有的空行肯定不会被`indent`删去的。

如果你采纳本章介绍的内核编码风格，基本上`-kr -i8`这两个参数就够用了。`indent`工具也有支持其它编码风格的选项，具体请参考Man Page。有时候`indent`工具的确非常有用，比如某个项目中途决定改变编码风格（这很少见），或者往某个项目中添加的几个代码文件来自另一个编码风格不同的项目，但绝不能因为有了`indent`工具就肆无忌惮，一开始把代码写得乱七八糟，最后再依靠`indent`去清理。
