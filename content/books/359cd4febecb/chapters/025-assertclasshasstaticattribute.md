> ## assertClassHasStaticAttribute(string $attributeName, string $className\[, string $message = ''\])

当 `$className::attributeName` 不存在时报告错误，错误讯息由 `$message` 指定。

`assertClassNotHasStaticAttribute()` 是与之相反的断言，接受相同的参数。

**Example A.4. assertClassHasStaticAttribute() 的用法**

```
<?php
class ClassHasStaticAttributeTest extends PHPUnit_Framework_TestCase
{
    public function testFailure()
    {
        $this->assertClassHasStaticAttribute('foo', 'stdClass');
    }
}
?>
```

```
phpunit ClassHasStaticAttributeTest

PHPUnit 5.0.0 by Sebastian Bergmann and contributors.

F

Time: 0 seconds, Memory: 4.75Mb

There was 1 failure:

1) ClassHasStaticAttributeTest::testFailure
Failed asserting that class "stdClass" has static attribute "foo".

/home/sb/ClassHasStaticAttributeTest.php:6

FAILURES!
Tests: 1, Assertions: 1, Failures: 1.
```
