## @runInSeparateProcess

2018-02-24 15:42 更新

## @runInSeparateProcess

明某个测试要运行在独立的 PHP 进程中。

```
class MyTest extends PHPUnit_Framework_TestCase
{
    /**
     * @runInSeparateProcess
     */
    public function testInSeparateProcess()
    {
        // ...
    }
}
```

**注意：**[the section called “@preserveGlobalState”](#) 默认情况下，PHPUnit 会尝试通过在父进程序列化全局状态然后在子进程反序列化的方式在子进程中保持来自父进程的全局状态。这当父进程包含非可序列化的全局内容时可能会导致问题。关于如何修正此问题的信息参见[the section called “@preserveGlobalState”](#)。

以上内容是否对您有帮助：
