[Example 2.1, “用 PHPUnit 测试数组操作”](#)展示了如何用 PHPUnit 编写测试来对 PHP 数组操作进行测试。本例介绍了用 PHPUnit 编写测试的基本惯例与步骤：

1.  针对类 `Class` 的测试写在类 `ClassTest`中。
    
2.  `ClassTest`（通常）继承自 `PHPUnit_Framework_TestCase`。
    
3.  测试都是命名为 `test*` 的公用方法。

也可以在方法的文档注释块(docblock)中使用 `@test` 标注将其标记为测试方法。

1.  在测试方法内，类似于 `assertEquals()`（参见 [Appendix A, _断言_](#)）这样的断言方法用来对实际值与预期值的匹配做出断言。

**Example 2.1. 用 PHPUnit 测试数组操作**

```
<?php
class StackTest extends PHPUnit_Framework_TestCase
{
    public function testPushAndPop()
    {
        $stack = array();
        $this->assertEquals(0, count($stack));

        array_push($stack, 'foo');
        $this->assertEquals('foo', $stack[count($stack)-1]);
        $this->assertEquals(1, count($stack));

        $this->assertEquals('foo', array_pop($stack));
        $this->assertEquals(0, count($stack));
    }
}
?>
```

> 当你想把一些东西写到 print 语句或者调试表达式中时，别这么做，将其写成一个测试来代替。  
> \--Martin Fowler
