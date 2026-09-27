如果要开始新工作或加入使用 C# 的团队，本文可帮助你快速提高工作效率。 它突出显示了 Java 中熟悉的内容以及 C# 中的新增功能。

C# 和 Java 有许多相似之处。 学习 C# 时，可以应用许多已经掌握的 Java 编程知识：

1.  类似的语法：Java 和 C# 都属于 C 语言系列。 这种相似性意味着你已经可以阅读并理解 C#。 虽然存在一些差异，但大部分语法与 Java 和 C 相同。大括号和分号的用法类似。 `if`、`else`、`switch` 等控制语句相同。 循环语句 `for`、`while` 和 `do`...`while` 相同。 在两种语言中，`class` 和 `interface` 的关键字相同。 `public` 到 `private` 的访问修饰符是相同的。 即使是许多内置类型也使用相同的关键字： `int`， `string`和 `double`。
2.  面向对象的范例：Java 和 C# 都是面向对象的语言。 多形性、抽象和封装的概念在这两种语言中都适用。 两种语言都添加了新构造，但核心功能仍然相关。
3.  强类型化：Java 和 C# 都是强类型化语言。 可以显式或隐式声明变量的数据类型。 编译器会强制执行类型安全性。 在运行代码之前，编译器会捕获代码中与类型相关的错误。
4.  跨平台：Java 和 C# 都是跨平台语言。 你可以在喜欢的平台上运行开发工具。 应用程序可以在多个平台上运行。 开发平台不需要与目标平台匹配。
5.  异常处理：Java 和 C# 都通过引发异常来指示错误。 两者都使用 `try` - `catch` - `finally` 块来处理异常。 异常类具有类似的名称和继承层次结构。 一个区别是，C# 没有“已检查的异常”的概念。 在理论上，任何函数都可能引发任何异常。
6.  标准库：.NET 运行时和 Java 标准库 (JSL) 支持常见任务。 两者都有适用于其他开源包的广泛生态系统。 在 C# 中，包管理器是 [NuGet](https://www.nuget.org)。 它类似于 Maven。
7.  垃圾回收：这两种语言都通过垃圾回收来应用自动内存管理功能。 运行时从不再被引用的对象中回收内存。 一个区别在于，C# 支持创建值类型，就像 `struct` 类型一样。

## 语法一目了然

以下示例并排显示了一些常见模式。 这些比较并不详尽，但它们可让你快速了解语法差异。

**变量声明和类型推理：**

```
// Java
var name = "Hello";
final int count = 5;
```

```
// C#
var name = "Hello";
const int count = 5;
```

**字符串内插：**

```
// Java
var message = "Hello, " + name + "! Count: " + count;
```

```
// C#
var message = $"Hello, {name}! Count: {count}";
```

了解详细信息： [字符串内插](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/tokens/interpolated)

**Lambda 表达式：**

```
// Java
list.stream().filter(x -> x > 5).collect(Collectors.toList());
```

```
// C#
var result = list.Where(x => x > 5).ToList();
```

了解详细信息： [LINQ 概述](https://learn.microsoft.com/zh-cn/dotnet/csharp/linq/)

**空值处理：**

```
// Java
String value = optional.orElse("default");
```

```
// C#
string value = input ?? "default";
```

了解详细信息：[可空引用类型](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/null-safety/nullable-reference-types)

## 熟悉的事物

由于相似性，几乎可以立即在 C# 中高效工作。 在进阶过程中，了解 C# 中存在而 Java 中没有的功能和惯用法：

1.  [模式匹配](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/patterns/pattern-matching)：模式匹配可以根据复杂数据结构的形状提供简洁的条件语句和表达式。 [`is` 语句](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/is)检查变量“是否”为某种模式。 基于模式的 [`switch` 表达式](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/operators/switch-expression)提供了丰富的语法来检查变量并根据其特征做出决策。
2.  [字符串插值](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/tokens/interpolated)和[原始字符串字面量](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/reference-types#string-literals)：字符串插值使你能够在字符串中插入已评估的表达式，而不是使用位置标识符。 原始字符串字面量可用于最小化文本中的转义序列。
3.  [_**可以为 null 的类型和不可为 null 的类型**_](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/null-safety/nullable-reference-types)：C# 支持_可以为 null 的值类型_和_可以为 null 的引用类型_，方法是在类型后附加 `?` 后缀。 对于可以为 null 的类型，如果在取消引用表达式之前不检查是否有 `null`，编译器会发出警告。 对于不可为 null 的类型，如果向该变量分配 `null` 值，编译器会发出警告。 不可为 null 的引用类型可最大程度减少引发 [System.NullReferenceException](https://learn.microsoft.com/zh-cn/dotnet/api/system.nullreferenceexception) 的编程错误。
4.  [_**扩展**_](https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/extension-methods)：在 C# 中，可以创建 _扩展_ 类或接口的成员。 扩展为库中的类型或实现给定接口的所有类型提供新行为。
5.  [LINQ](https://learn.microsoft.com/zh-cn/dotnet/csharp/linq/)：语言集成查询 (LINQ) 提供了一种通用语法来查询和转换数据，无论其存储方式如何。
6.  [本地函数](https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/local-functions)：在 C# 中，可以在方法或其他本地函数内嵌套函数。 本地函数提供另一层封装。

小窍门

若要详细了解 C# 的类型系统（包括 `struct` 与 `class`、记录和接口），请访问“基础知识 [”部分中的类型系统](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/types/) 概述。

C# 中还有一些 Java 中没有的功能。 特性比如使用顺序语法对异步操作进行[`async` 和 `await`](https://learn.microsoft.com/zh-cn/dotnet/csharp/asynchronous-programming/) 建模。 该 [`using`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/statements/using) 语句自动释放非内存资源。

C# 和 Java 之间还有一些类似的功能存在细微但重要的差异：

1.  [属性](https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/properties)和[索引器](https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/indexers)：属性和索引器（将类视为数组或字典）都具有语言支持。 在 Java 中，它们是以 `get` 和 `set` 开头的方法命名约定。
2.  [记录](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/types/records)：在 C# 中，记录可以是 `class`（引用）类型，也可以是 `struct`（值）类型。 C# 记录可以是不可变的，但并非必须是不可变的。
3.  [_**元组**_](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/value-tuples)在 C# 和 Java 中具有不同的语法。
4.  [属性](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/attributes/general)类似于 Java 注释。

最后，有一些 Java 语言功能在 C# 中不可用：

1.  已检查的异常：在 C# 中，理论上任何方法都可能引发任何异常。
2.  已检查的数组协变：在 C# 中，数组不是安全协变的。 如果需要协变结构，则应使用泛型集合类和接口。

总的来说，有 Java 经验的开发者学习 C# 应该会很顺利。 C# 有足够的熟悉的成语，让你在学习新的成语时保持高效。

## 后续步骤

-   [C# 教程](https://learn.microsoft.com/zh-cn/dotnet/csharp/tour-of-csharp/overview)：大致了解所有 C# 功能。
-   [初学者教程](https://learn.microsoft.com/zh-cn/dotnet/csharp/tour-of-csharp/tutorials/)：使用交互式课程逐步学习 C# 。
-   [可以使用 C# 生成的内容](https://learn.microsoft.com/zh-cn/dotnet/csharp/tour-of-csharp/what-you-can-build)：探索可以使用 C# 创建的应用程序类型。
-   [C# 基础知识](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/program-structure/)：深入了解类型系统、面向对象的编程等。
