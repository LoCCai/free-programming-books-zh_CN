可以将测试用例或者测试套件包装在 `PHPUnit_Extensions_TestDecorator` 的子类中并运用 Decorator（修饰器）设计模式来在测试运行前后执行一些动作。

PHPUnit 了包含了一个具体的测试修饰器：`PHPUnit_Extensions_RepeatedTest`。它用于重复运行某个测试，并且只在全部循环中都成功时计为成功。

[Example 14.5, “RepeatedTest 修饰器”](#)展示了测试修饰器 `PHPUnit_Extensions_RepeatedTest` 的一个删减版本，用以说明如何编写你自己的测试修饰器。

**Example 14.5. RepeatedTest 修饰器**

```
<?php
require_once 'PHPUnit/Extensions/TestDecorator.php';

class PHPUnit_Extensions_RepeatedTest extends PHPUnit_Extensions_TestDecorator
{
    private $timesRepeat = 1;

    public function __construct(PHPUnit_Framework_Test $test, $timesRepeat = 1)
    {
        parent::__construct($test);

        if (is_integer($timesRepeat) &&
            $timesRepeat >= 0) {
            $this->timesRepeat = $timesRepeat;
        }
    }

    public function count()
    {
        return $this->timesRepeat * $this->test->count();
    }

    public function run(PHPUnit_Framework_TestResult $result = NULL)
    {
        if ($result === NULL) {
            $result = $this->createResult();
        }

        for ($i = 0; $i < $this->timesRepeat && !$result->shouldStop(); $i++) {
            $this->test->run($result);
        }

        return $result;
    }
}
?>
```
