## @group

测试可以用 `@group` 标注来标记为属于一个或多个组，就像这样：

```
class MyTest extends PHPUnit_Framework_TestCase
{
    /**
     * @group specification
     */
    public function testSomething()
    {
    }

    /**
     * @group regresssion
     * @group bug2204
     */
    public function testSomethingElse()
    {
    }
}
```

测试可以基于组来选择性的执行，使用命令行测试执行器的 `--group` and `--exclude-group` 选项，或者使用对应的 XML 配置文件指令。
