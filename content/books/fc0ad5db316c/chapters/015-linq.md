Language-Integrated 查询（LINQ）是基于将查询功能直接集成到 C# 语言的一组技术的名称。 传统上，针对数据的查询表示为简单字符串，无需在编译时进行类型检查或 IntelliSense 支持。 此外，必须了解每种数据源类型的不同查询语言：SQL 数据库、XML 文档、各种 Web 服务等。 使用 LINQ 时，查询是一流的语言构造，就像类、方法和事件一样。

编写查询时，LINQ 最明显的“语言集成”部分是查询表达式。 在声明性 _查询语法中编写查询表达式_。 通过使用查询语法，可以使用最少的代码对数据源执行筛选、排序和分组作。 使用相同的查询表达式模式从任何类型的数据源查询和转换数据。

以下示例演示完整的查询操作。 完整的作包括创建数据源、定义查询表达式，以及执行语句中的 [`foreach`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/statements/iteration-statements#the-foreach-statement) 查询。

```
// Specify the data source.
int[] scores = [97, 92, 81, 60];

// Define the query expression.
IEnumerable<int> scoreQuery =
    from score in scores
    where score > 80
    select score;

// Execute the query.
foreach (var i in scoreQuery)
{
    Console.Write(i + " ");
}

// Output: 97 92 81
```

可能需要为前面的示例添加 [`using`](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/using-directive) 指令 `using System.Linq;`，以便进行编译。 最新版本的 .NET 使用 [implicit usings](https://learn.microsoft.com/zh-cn/dotnet/core/project-sdk/overview#implicit-using-directives) 将此指令添加为 [global using](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/using-directive#the-global-modifier)。 旧版本要求您在源代码中添加它。

## 查询表达式概述

-   查询表达式检查和转换任何启用了 LINQ 的数据源中的数据。 例如，单个查询可以从 SQL 数据库检索数据，并生成 XML 流作为输出。
-   查询表达式使用许多熟悉的 C# 语言构造，这使得它们易于阅读。
-   查询表达式中的变量都是强类型。
-   直到你对查询变量进行迭代，例如在`foreach`语句中，查询不会执行。
-   在编译时，编译器根据 C# 规范中定义的规则将查询表达式转换为标准查询运算符方法调用。 可以使用方法语法表达使用查询语法的任何查询。 在某些情况下，查询语法更易于阅读和简洁。 其他方法语法更具可读性。 这两种不同形式之间没有语义或性能差异。 有关详细信息，请参阅 [C# 语言规范](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/language-specification/expressions#1223-query-expressions) 和 [标准查询运算符概述](https://learn.microsoft.com/zh-cn/dotnet/csharp/linq/standard-query-operators/)。
-   某些查询操作（如 [Count](https://learn.microsoft.com/zh-cn/dotnet/api/system.linq.enumerable.count) 或 [Max](https://learn.microsoft.com/zh-cn/dotnet/api/system.linq.enumerable.max)）没有等效的查询表达式子句，并且必须表示为方法调用。 可以通过多种方式将方法语法与查询语法相结合。
-   查询表达式可被编译成表达式树或委托，具体视应用查询的类型而定。 编译器会将 [IEnumerable<T>](https://learn.microsoft.com/zh-cn/dotnet/api/system.collections.generic.ienumerable-1) 查询编译为委托。 编译器将 [IQueryable](https://learn.microsoft.com/zh-cn/dotnet/api/system.linq.iqueryable) 和 [IQueryable<T>](https://learn.microsoft.com/zh-cn/dotnet/api/system.linq.iqueryable-1) 查询编译为表达式树。 有关详细信息，请参阅 [表达式树](https://learn.microsoft.com/zh-cn/dotnet/csharp/advanced-topics/expression-trees)。

## 如何启用数据源的 LINQ 查询

### 内存中数据

可以通过两种方式启用内存中数据的 LINQ 查询。 如果数据是实现 [IEnumerable<T>](https://learn.microsoft.com/zh-cn/dotnet/api/system.collections.generic.ienumerable-1)的类型，请使用 LINQ to Objects 查询数据。 如果通过实现 [IEnumerable<T>](https://learn.microsoft.com/zh-cn/dotnet/api/system.collections.generic.ienumerable-1) 接口来启用枚举没有意义，那么应该在该类型中定义 LINQ 标准查询运算符方法，或者将它们定义为该类型的 [扩展成员](https://learn.microsoft.com/zh-cn/dotnet/csharp/programming-guide/classes-and-structs/extension-methods)。 标准查询运算符的自定义实现应使用延迟执行返回结果。

### 远程数据

启用远程数据源 LINQ 查询的最佳选择是实现 [IQueryable<T>](https://learn.microsoft.com/zh-cn/dotnet/api/system.linq.iqueryable-1) 接口。

## IQueryable LINQ 提供程序

实现 [IQueryable<T>](https://learn.microsoft.com/zh-cn/dotnet/api/system.linq.iqueryable-1) 的 LINQ 提供程序在复杂性上可能会有所不同。

不太复杂的 `IQueryable` 提供程序可能会从 Web 服务访问单个方法。 这种类型的提供程序特定于数据源，因为它需要它处理的查询中的特定信息。 它具有封闭类型系统，可能公开单个结果类型。 大多数查询的执行发生在本地，例如，使用 [Enumerable](https://learn.microsoft.com/zh-cn/dotnet/api/system.linq.enumerable) 标准查询运算符的实现。 不太复杂的提供程序可能只检查表示查询的表达式树中的一个方法调用表达式，并允许在其他位置处理查询的剩余逻辑。

`IQueryable`中等复杂性的提供程序可能以具有部分表达性查询语言的数据源为目标。 如果它面向 Web 服务，它可能会访问 Web 服务的多个方法，并根据查询查找的信息选择要调用的方法。 中等复杂性的提供程序具有比简单提供程序更丰富的类型系统，但它仍然是固定类型系统。 例如，提供程序可能会公开具有可遍历的一对多关系的类型，但它不提供用户定义的类型的映射技术。

复杂的 `IQueryable` 提供程序（如 [Entity Framework Core](https://learn.microsoft.com/zh-cn/ef/core/) 提供程序）可能会将完整的 LINQ 查询翻译为表达性查询语言，例如 SQL。 复杂的提供程序更为普遍，因为它可以处理查询中更广泛的问题。 它还具有开放类型系统，因此必须包含广泛的基础结构来映射用户定义的类型。 开发一个复杂的服务提供商需要付出大量的努力。
