> ## assertArraySubset(array $subset, array $array\[, bool $strict = '', string $message = ''\])

当 `$array` 不包含 `$subset` 时报告错误，错误讯息由 `$message` 指定。

`$strict` 是一个标志，用于表明是否需要对数组中的对象进行全等判定。

**Example A.3. assertArraySubset() 的用法**

```
<?php
class ArraySubsetTest extends PHPUnit_Framework_TestCase
{
    public function testFailure()
    {
        $this->assertArraySubset(['config' => ['key-a', 'key-b']], ['config' => ['key-a']]);
    }
}
?>
```

```
phpunit ArrayHasKeyTest

PHPUnit 4.4.0 by Sebastian Bergmann.

F

Time: 0 seconds, Memory: 5.00Mb

There was 1 failure:

1) Epilog\EpilogTest::testNoFollowOption
Failed asserting that an array has the subset Array &0 (
    'config' => Array &1 (
        0 => 'key-a'
        1 => 'key-b'
    )
).

/home/sb/ArraySubsetTest.php:6

FAILURES!
Tests: 1, Assertions: 1, Failures: 1.
```
