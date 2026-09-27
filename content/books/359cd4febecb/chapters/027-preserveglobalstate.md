## @preserveGlobalState

2018-02-24 15:42 更新

## @preserveGlobalState

在单独的进程中运行测试时，PHPUnit 会尝试保持来自父进程的全局状态（通过在父进程序列化全局状态然后在子进程反序列化的方式）。这当父进程包含非可序列化的全局内容时可能会导致问题。为了修正这种问题，可以用 `@preserveGlobalState` 标注来禁止 PHPUnit 保持全局状态。

```
class MyTest extends PHPUnit_Framework_TestCase
{
    /**
     * @runInSeparateProcess
     * @preserveGlobalState disabled
     */
    public function testInSeparateProcess()
    {
        // ...
    }
}
```

以上内容是否对您有帮助：
