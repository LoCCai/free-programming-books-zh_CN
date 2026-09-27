本节课将介绍如何使用specs —— 一个Scala行为驱动设计（BDD）框架，来进行测试。

-   [扩展规格](#example)
    -   nested examples
-   [执行模型](#scope)
-   [Setup and TearDown](#setup)
    -   doFirst
    -   doBefore
    -   doAfter
-   [Matchers 匹配器](#matchers)
    -   mustEqual
    -   contains
    -   sameSize?
    -   编写你自己的匹配器
-   [Mocks](#mocks)
-   [Spies](#spies)
-   [在sbt中运行](#sbt)

## 扩展规格

让我们直接开始。

import org.specs.\_

object ArithmeticSpec extends Specification {
  "Arithmetic" should {
    "add two numbers" in {
      1 + 1 mustEqual 2
    }
    "add three numbers" in {
      1 + 1 + 1 mustEqual 3
    }
  }
}

**Arithmetic（算术）** 是一个 **规范约束下的系统**

**add（加）** 是一个上下文。

**add two numbers（两个数相加）**，和 **add three numbers（三个数字相加）** 是例子。

`mustEqual` 表示 **预期**

`1 mustEqual 1` 是编写实际测试前使用的一种常见的 **预期** 占位符。所有的测试用例都应该至少有一个预期。

### 复制

注意到两个测试都是怎样将 `add` 加在其名称中的吗？我们可以通过 **嵌套** 预期摆脱这种重复。

import org.specs.\_

object ArithmeticSpec extends Specification {
  "Arithmetic" should {
    "add" in {
      "two numbers" in {
        1 + 1 mustEqual 2
      }
      "three numbers" in {
        1 + 1 + 1 mustEqual 3
      }
    }
  }
}

## 执行模型

object ExecSpec extends Specification {
  "Mutations are isolated" should {
    var x = 0
    "x equals 1 if we set it." in {
      x = 1
      x mustEqual 1
    }
    "x is the default value if we don't change it" in {
      x mustEqual 0
    }
  }
}

## Setup, Teardown

### doBefore & doAfter

"my system" should {
  doBefore { resetTheSystem() /\*\* user-defined reset function \*/ }
  "mess up the system" in {...}
  "and again" in {...}
  doAfter { cleanThingsUp() }
}

**注意** `doBefore`/`doAfter` 只能运行在叶子用例上。

### doFirst & doLast

`doFirst`/`doLast` 用来做一次性的设置。（需要例子，我不使用这个）

"Foo" should {
  doFirst { openTheCurtains() }
  "test stateless methods" in {...}
  "test other stateless methods" in {...}
  doLast { closeTheCurtains() }
}

## Matchers

你有数据，并且想要确保它是正确的。让我们看看最常用的匹配器是如何帮助你的。 （参考 [匹配器指南](https://code.google.com/p/specs/wiki/MatchersGuide) ）

### mustEqual

我们已经看到几个mustEqual的例子了。

1 mustEqual 1

"a" mustEqual "a"

引用相等，值相等。

### 序列中的元素

val numbers = List(1, 2, 3)

numbers must contain(1)
numbers must not contain(4)

numbers must containAll(List(1, 2, 3))
numbers must containInOrder(List(1, 2, 3))

List(1, List(2, 3, List(4)), 5) must haveTheSameElementsAs(List(5, List(List(4), 2, 3), 1))

### 映射中的元素

map must haveKey(k)
map must notHaveKey(k)

map must haveValue(v)
map must notHaveValue(v)

### 数字

a must beGreaterThan(b)
a must beGreaterThanOrEqualTo(b)

a must beLessThan(b)
a must beLessThanOrEqualTo(b)

a must beCloseTo(b, delta)

### Options

a must beNone

a must beSome\[Type\]

a must beSomething

a must beSome(value)

### throwA

a must throwA\[WhateverException\]

这是一个针对try\\catch块中有异常抛出的用例的简写。

您也可以期望一个特定的消息

a must throwA(WhateverException("message"))

您也可以匹配异常：

a must throwA(new Exception) like {
  case Exception(m) => m.startsWith("bad")
}

### 编写你自己的匹配器

import org.specs.matcher.Matcher

#### 作为一个不变量

"A matcher" should {
  "be created as a val" in {
    val beEven = new Matcher\[Int\] {
      def apply(n: => Int) = {
        (n % 2 == 0, "%d is even".format(n), "%d is odd".format(n))
      }
    }
    2 must beEven
  }
}

契约是返回一个包含三个值的元组，分别是期望是否为真、为真时的消息和为假时的消息。

#### 作为一个样本类

case class beEven(b: Int) extends Matcher\[Int\]() {
  def apply(n: => Int) =  (n % 2 == 0, "%d is even".format(n), "%d is odd".format(n))
}

使用样本类可以增加代码的重用性。

## Mocks

import org.specs.Specification
import org.specs.mock.Mockito

abstract class Foo\[T\] {
  def get(i: Int): T
}

object MockExampleSpec extends Specification with Mockito {
  val m = mock\[Foo\[String\]\]

  m.get(0) returns "one"

  m.get(0)

  there was one(m).get(0)

  there was no(m).get(1)
}

**参考** [Using Mockito](https://code.google.com/p/specs/wiki/UsingMockito)

## Spies

Spies（间谍）可以对真正的对象做一些“局部mocking”：

val list = new LinkedList\[String\]
val spiedList = spy(list)

// methods can be stubbed on a spy
spiedList.size returns 100

// other methods can also be used
spiedList.add("one")
spiedList.add("two")

// and verification can happen on a spy
there was one(spiedList).add("one")

然而，使用间谍可能会出现非常诡异的情况：

// if the list is empty, this will throws an IndexOutOfBoundsException
spiedList.get(0) returns "one"

这里必须使用 `doReturn` ：

doReturn("one").when(spiedList).get(0)

## 在sbt中运行单个specs

\> test-only com.twitter.yourservice.UserSpec

将只运行那个规范。

\> ~ test-only com.twitter.yourservice.UserSpec

将在一个循环中运行该测试，文件的每一次修改都将触发测试运行。
