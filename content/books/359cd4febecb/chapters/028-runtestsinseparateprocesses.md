阅读(43.4k) 书签 赞(0) [我要纠错](https://www.w3cschool.cn/edit/phpunit5/9n5c8ozt)

## @runTestsInSeparateProcesses

2018-02-24 15:42 更新

## @runTestsInSeparateProcesses

指明单个测试类内的所有测试要各自运行在独立的 PHP 进程中。

```
/**
 * @runTestsInSeparateProcesses
 */
class MyTest extends PHPUnit_Framework_TestCase
{
    // ...
}
```

**注意：**[the section called “@preserveGlobalState”](#) 默认情况下，PHPUnit 会尝试通过在父进程序列化全局状态然后在子进程反序列化的方式在子进程中保持来自父进程的全局状态。这当父进程包含非可序列化的全局内容时可能会导致问题。关于如何修正此问题的信息参见[the section called “@preserveGlobalState”](#)。

以上内容是否对您有帮助：

← [@requires](https://www.w3cschool.cn/phpunit5/4fmj9ozt.html "上一篇：@requires")

[@runInSeparateProcess](https://www.w3cschool.cn/phpunit5/1pnvmozt.html "下一篇：@runInSeparateProcess") →

写笔记

我要补充
