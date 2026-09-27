`do/while`语句的语法是：

语句 → do 语句 while (控制表达式);

`while`语句先测试控制表达式的值再执行循环体，而`do/while`语句先执行循环体再测试控制表达式的值。如果控制表达式的值一开始就是假，`while`语句的循环体一次都不执行，而`do/while`语句的循环体仍然要执行一次再跳出循环。其实只要有`while`循环就足够了，`do/while`循环和后面要讲的`for`循环都可以改写成`while`循环，只不过有些情况下用`do/while`或`for`循环写起来更简便，代码更易读。上面的`factorial`也可以改用`do/while`循环来写：

int factorial(int n)
{
	int result = 1;
	int i = 1;
	do {
		result = result \* i;
		i = i + 1;
	} while (i <= n);

	return result;
}

写循环一定要注意循环即将结束时控制表达式的临界条件是否准确，上面的循环结束条件如果写成`i < n`就错了，当`i == n`时跳出循环，最后的结果中就少乘了一个`n`。虽然变量名应该尽可能起得有意义一些，不过用`i`、`j`、`k`给循环变量起名是很常见的。
