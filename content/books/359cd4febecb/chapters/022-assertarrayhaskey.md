> ## assertArrayHasKey(mixed $key, array $array\[, string $message = ''\])

当 `$array` 不包含 `$key` 时报告错误，错误讯息由 `$message` 指定。

`assertArrayNotHasKey()` 是与之相反的断言，接受相同的参数。

**Example A.1. assertArrayHasKey() 的用法**

```
<?php
class ArrayHasKeyTest extends PHPUnit_Framework_TestCase
{
    public function testFailure()
    {
        $this->assertArrayHasKey('foo', array('bar' => 'baz'));
    }
}
?>
```

```
phpunit ArrayHasKeyTest

PHPUnit 5.0.0 by Sebastian Bergmann and contributors.

F

Time: 0 seconds, Memory: 5.00Mb

There was 1 failure:

1) ArrayHasKeyTest::testFailure
Failed asserting that an array has the key 'foo'.

/home/sb/ArrayHasKeyTest.php:6

FAILURES!
Tests: 1, Assertions: 1, Failures: 1.
```
