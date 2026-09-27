## 实现 PHPUnit\_Framework\_Test

`PHPUnit_Framework_Test` 接口是比较狭义的，十分容易实现。举例来说，你可以自行为 `PHPUnit_Framework_Test` 编写一个类似于 `PHPUnit_Framework_TestCase` 的实现来运行_数据驱动测试_。

[Example 14.6, “一个数据驱动的测试”](#)展示了一个数据驱动的测试用例类，对来自 CSV 文件内的值进行比较。这个文件内的每个行看起来类似于 `foo;bar`，第一个值是期望值，第二个值则是实际值。

**Example 14.6. 一个数据驱动的测试**

```
<?php
class DataDrivenTest implements PHPUnit_Framework_Test
{
    private $lines;

    public function __construct($dataFile)
    {
        $this->lines = file($dataFile);
    }

    public function count()
    {
        return 1;
    }

    public function run(PHPUnit_Framework_TestResult $result = NULL)
    {
        if ($result === NULL) {
            $result = new PHPUnit_Framework_TestResult;
        }

        foreach ($this->lines as $line) {
            $result->startTest($this);
            PHP_Timer::start();
            $stopTime = NULL;

            list($expected, $actual) = explode(';', $line);

            try {
                PHPUnit_Framework_Assert::assertEquals(
                  trim($expected), trim($actual)
                );
            }

            catch (PHPUnit_Framework_AssertionFailedError $e) {
                $stopTime = PHP_Timer::stop();
                $result->addFailure($this, $e, $stopTime);
            }

            catch (Exception $e) {
                $stopTime = PHP_Timer::stop();
                $result->addError($this, $e, $stopTime);
            }

            if ($stopTime === NULL) {
                $stopTime = PHP_Timer::stop();
            }

            $result->endTest($this, $stopTime);
        }

        return $result;
    }
}

$test = new DataDrivenTest('data_file.csv');
$result = PHPUnit_TextUI_TestRunner::run($test);
?>
```

```
PHPUnit 5.0.0 by Sebastian Bergmann and contributors.

.F

Time: 0 seconds

There was 1 failure:

1) DataDrivenTest
Failed asserting that two strings are equal.
expected string <bar>
difference      <  x>
got string      <baz>
/home/sb/DataDrivenTest.php:32
/home/sb/DataDrivenTest.php:53

FAILURES!
Tests: 2, Failures: 1.
```
