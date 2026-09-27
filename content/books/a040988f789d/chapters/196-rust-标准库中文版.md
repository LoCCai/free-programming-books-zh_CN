## Crate [std](#)

1.0.0 · [source](https://rustwiki.org/zh-CN/src/std/lib.rs.html#1-687) ·

Expand description

Rust 标准库是可移植 Rust 软件的基础，这是一组针对 [更广泛的 Rust 生态系统](https://crates.io) 的最小且经过实战测试的共享抽象。 它提供了核心类型，例如 [`Vec<T>`](https://rustwiki.org/zh-CN/std/vec/struct.Vec.html "struct std::vec::Vec") 和 [`Option<T>`](https://rustwiki.org/zh-CN/std/option/enum.Option.html "enum std::option::Option")，库定义的对 [语言原语](#primitives) 的操作，[标准库宏](#macros)，[I/O](https://rustwiki.org/zh-CN/std/io/index.html "mod std::io") 和 [多线程](https://rustwiki.org/zh-CN/std/thread/index.html "mod std::thread")，以及许多 [其他](#what-is-in-the-standard-library-documentation) 东西。

默认情况下，`std` 可用于所有 Rust crates。因此，可以通过 [`use`](https://rustwiki.org/zh-CN/book/ch07-02-defining-modules-to-control-scope-and-privacy.html) 语句使用路径 `std` 来访问标准库，就像在 [`use std::env`](https://rustwiki.org/zh-CN/std/env/index.html) 中一样。

## [如何阅读本文档](#如何阅读本文档)

如果您已经知道要查找的内容的名称，找到它的最快方法是使用页面顶部的 [search bar](#)。

否则，您可能想跳转到以下有用的部分之一：

-   [`std::*` modules](#modules)
-   [Primitive types](#primitives)
-   [Standard macros](#macros)
-   [The Rust Prelude](https://rustwiki.org/zh-CN/std/prelude/index.html "mod std::prelude")

如果这是您第一次来，那么标准库的文档可以被随意的阅读。点击有趣的东西通常会把您带到有趣的地方。 尽管如此，您还是不想错过一些重要的内容，因此请继续阅读标准库及其文档！

一旦您熟悉了标准库的内容，您可能会发现冗长的描述会使人分心。在开发阶段，您可能需要按页面顶部附近的 `[-]` 按钮，将其折叠为更易于阅读的视图。

当您查看 `[-]` 按钮时，还请注意 `source` 链接。Rust 的 API 文档附带了源代码，我们鼓励您阅读它。 标准库的资源通常是高质量的，通常可以启发人们对幕后的了解。

## [标准库文档中有什么？](#标准库文档中有什么)

首先，Rust 标准库分为多个重点 [模块](#modules)，所有的这些模块都会在本页下方列出。这些模块是所有 Rust 锻造的基础，它们具有强大的名称，如 [`std::slice`](https://rustwiki.org/zh-CN/std/slice/index.html "mod std::slice") 和 [`std::cmp`](https://rustwiki.org/zh-CN/std/cmp/index.html "mod std::cmp")。 模块的文档通常包括模块的概述和示例，是开始熟悉库的好地方。

其次，此处记录了 [原始类型](https://rustwiki.org/zh-CN/book/ch03-02-data-types.html) 上的隐式方法。造成混淆的原因有两个：

1.  虽然原语是由编译器实现的，但标准库是直接在原始类型上实现方法 (而且它是唯一一个这样做的库)。在 [原语](#primitives) 部分中对此进行了说明。
2.  标准库导出了许多模块，这些模块的名称和原始类型的名称相同。它们定义了与原始类型有关的其他项，但没有定义所有重要的方法。

例如，有一个 [原始类型为 `i32`](https://rustwiki.org/zh-CN/std/primitive.i32.html "primitive i32") 的页面列出了可以调用的所有方法 32 位整数 (非常有用)，并且有一个 [`std::i32` 模块的页面](https://rustwiki.org/zh-CN/std/i32/index.html "mod std::i32") 记录了常量值 [`MIN`](https://rustwiki.org/zh-CN/std/i32/constant.MIN.html "constant std::i32::MIN") 和 [`MAX`](https://rustwiki.org/zh-CN/std/i32/constant.MAX.html "constant std::i32::MAX") (很少有用)。

请注意原始 [`str`](https://rustwiki.org/zh-CN/std/primitive.str.html "primitive str") 和 [`[T]`](https://rustwiki.org/zh-CN/std/primitive.slice.html "primitive slice") (也称为 ‘slice’) 的文档。[`String`](https://rustwiki.org/zh-CN/std/string/struct.String.html "struct std::string::String") 和 [`Vec<T>`](https://rustwiki.org/zh-CN/std/vec/struct.Vec.html "struct std::vec::Vec") 上许多方法的调用实际上都是通过 [解引用强制多态](https://rustwiki.org/zh-CN/book/ch15-02-deref.html#implicit-deref-coercions-with-functions-and-methods) 分别对 [`str`](https://rustwiki.org/zh-CN/std/primitive.str.html "primitive str") 和 [`[T]`](https://rustwiki.org/zh-CN/std/primitive.slice.html "primitive slice") 上的方法的调用。

第三，标准库还定义了 Rust [Prelude](https://rustwiki.org/zh-CN/std/prelude/index.html "mod std::prelude")，这是一小部分项目 - 主要是 traits - 导入到每个 crate 的每个模块中。 prelude 中的 traits 无处不在，这使 prelude 文档成为了解该库的一个很好的切入点。

最后，标准库导出了许多标准宏，并且在 [此页面](#macros) 上列出了它们 (从技术上讲，并不是所有的标准宏都由标准库定义的 - 有些是由编译器定义的 - 但它们在这里的文档是相同的)。

与 prelude 一样，默认情况下会将标准宏导入到所有 crates 中。

## [对文档的更改做出贡献](#对文档的更改做出贡献)

在 [这里](https://rustc-dev-guide.rust-lang.org/contributing.html#writing-documentation) 查看 Rust 贡献指南。 该文档的源代码可以在 [GitHub](https://github.com/rust-lang/rust) 上找到。 要贡献更改，请确保您先阅读指南，然后为您建议的更改提交拉取请求。

感谢您的贡献！ 如果您看到可以改进的部分文档，请提交 PR，或者先在 [Discord](https://discord.gg/rust-lang) #docs 上与我们聊天。

## [Rust 标准库之旅](#rust-标准库之旅)

crate 文档的其余部分致力于指出 Rust 标准库的显著特性。

### [容器和集合](#容器和集合)

[`option`](https://rustwiki.org/zh-CN/std/option/index.html "mod std::option") 和 [`result`](https://rustwiki.org/zh-CN/std/result/index.html "mod std::result") 模块定义了可选和错误处理类型 [`Option<T>`](https://rustwiki.org/zh-CN/std/option/enum.Option.html "enum std::option::Option") 和 [`Result<T, E>`](https://rustwiki.org/zh-CN/std/result/enum.Result.html "enum std::result::Result")。[`iter`](https://rustwiki.org/zh-CN/std/iter/index.html "mod std::iter") 模块定义了 Rust 的迭代器 [`Iterator`](https://rustwiki.org/zh-CN/std/iter/trait.Iterator.html "trait std::iter::Iterator") trait，它与 [`for`](https://rustwiki.org/zh-CN/book/ch03-05-control-flow.html#looping-through-a-collection-with-for) 循环一起工作来访问集合。

标准库公开了三种处理连续内存区域的常用方法：

-   [`Vec<T>`](https://rustwiki.org/zh-CN/std/vec/struct.Vec.html "struct std::vec::Vec") - 在运行时可调整大小的堆分配的 _vector_。
-   [`[T; N]`](https://rustwiki.org/zh-CN/std/primitive.array.html "primitive array") - 在编译时具有固定大小的内联数组。
-   [`[T]`](https://rustwiki.org/zh-CN/std/primitive.slice.html "primitive slice") - 一个动态大小的_切片_放入到任何其他类型的连续存储中，无论是否为堆分配。

切片只能通过某种 _指针_ 来处理，因此具有多种形式，例如：

-   `&[T]`\- _共享切片_
-   `&mut [T]`\- _可变切片_
-   [`Box<[T]>`](https://rustwiki.org/zh-CN/std/boxed/index.html "mod std::boxed") - _拥有所有权的切片_

[`str`](https://rustwiki.org/zh-CN/std/primitive.str.html "primitive str")，一个 UTF-8 字符串切片，是一种原始类型，标准库为它定义了很多方法。Rust [`str`](https://rustwiki.org/zh-CN/std/primitive.str.html "primitive str") 通常作为不可变引用来访问: `&str`。使用拥有所有权的 [`String`](https://rustwiki.org/zh-CN/std/string/struct.String.html "struct std::string::String") 来创建和修改字符串。

要转换为字符串，请使用 [`format!`](https://rustwiki.org/zh-CN/std/macro.format.html "macro std::format") 宏; 要从字符串转换，请使用 [`FromStr`](https://rustwiki.org/zh-CN/std/str/trait.FromStr.html "trait std::str::FromStr") trait。

可以通过将数据放在引用计数的 Box 或 [`Rc`](https://rustwiki.org/zh-CN/std/rc/struct.Rc.html "struct std::rc::Rc") 类型中来共享数据，并且，如果进一步包含在 [`Cell`](https://rustwiki.org/zh-CN/std/cell/struct.Cell.html "struct std::cell::Cell") 或 [`RefCell`](https://rustwiki.org/zh-CN/std/cell/struct.RefCell.html "struct std::cell::RefCell") 中，则可以对其进行可变的和共享。 同样，在并发设置中，通常将原子引用计数的 Box [`Arc`](https://rustwiki.org/zh-CN/std/sync/struct.Arc.html "struct std::sync::Arc") 与 [`Mutex`](https://rustwiki.org/zh-CN/std/sync/struct.Mutex.html "struct std::sync::Mutex") 配合以获得相同的效果。

[`collections`](https://rustwiki.org/zh-CN/std/collections/index.html "mod std::collections") 模块定义了 Map，Set，链表和其他典型的集合类型，包括常见的 [`HashMap<K, V>`](https://rustwiki.org/zh-CN/std/collections/hash_map/struct.HashMap.html "struct std::collections::hash_map::HashMap")。

### [平台抽象和 I/O](#平台抽象和-io)

除了基本的数据类型外，标准库还主要关注对通用平台差异的抽象 (尤其是 Windows 和 Unix 派生平台)。

I/O 的常见类型，包括 [files](https://rustwiki.org/zh-CN/std/fs/struct.File.html "struct std::fs::File")、[TCP](https://rustwiki.org/zh-CN/std/net/struct.TcpStream.html "struct std::net::TcpStream") 和 [UDP](https://rustwiki.org/zh-CN/std/net/struct.UdpSocket.html "struct std::net::UdpSocket")，在 [`io`](https://rustwiki.org/zh-CN/std/io/index.html "mod std::io")、[`fs`](https://rustwiki.org/zh-CN/std/fs/index.html "mod std::fs") 和 [`net`](https://rustwiki.org/zh-CN/std/net/index.html "mod std::net") 模块中定义。

[`thread`](https://rustwiki.org/zh-CN/std/thread/index.html "mod std::thread") 模块包含了 Rust 的线程抽象。[`sync`](https://rustwiki.org/zh-CN/std/sync/index.html "mod std::sync") 包含更多的原始共享内存类型，包括 [`atomic`](https://rustwiki.org/zh-CN/std/sync/atomic/index.html "mod std::sync::atomic") 和 [`mpsc`](https://rustwiki.org/zh-CN/std/sync/mpsc/index.html "mod std::sync::mpsc")，其中包含用于消息传递的通道类型。

-   `!` 类型，也称为 “never”。
    
-   一个固定大小的数组，表示为 `[T; N]`，用于元素类型 `T` 和非负编译时常量大小 `N`。
    
-   布尔类型。
    
-   一个字符类型。
    
-   32 位浮点类型 (特别是 IEEE 754-2008 中定义的 “binary32” 类型)。
    
-   64 位浮点类型 (特别是 IEEE 754-2008 中定义的 “binary64” 类型)。
    
-   函数指针，例如 `fn(usize) -> bool`。
    
-   8 位带符号整数类型。
    
-   16 位带符号整数类型。
    
-   32 位带符号整数类型。
    
-   64 位带符号整数类型。
    
-   128 位带符号整数类型。
    
-   指针大小的有符号整数类型。
    
-   原始的、不安全的指针 `*const T` 和 `*mut T`。
    
-   参考，`&T` 和 `&mut T`。
    
-   一个动态大小的视图到一个连续的序列，`[T]`。 这里的连续意味着元素的布局应使每个元素与其相邻元素之间的距离相同。
    
-   字符串切片。
    
-   一个有限异构序列，`(T, U, ..)`。
    
-   8 位无符号整数类型。
    
-   16 位无符号整数类型。
    
-   32 位无符号整数类型。
    
-   64 位无符号整数类型。
    
-   128 位无符号整数类型。
    
-   `()` 类型，也称为 “unit”。
    
-   指针大小的无符号整数类型。
    

-   Unstable 模块包含不稳定的 `assert_matches` 宏。
    
-   可组合的异步迭代。
    
-   编译器内部函数。
    
-   便携式 SIMD 模块。
    
-   内存分配 API。
    
-   用于动态类型或类型反射的实用工具。
    
-   SIMD 和供应商内部功能模块。
    
-   数组原始类型的实用工具。
    
-   对 ASCII 字符串和字符的操作。
    
-   支持捕获 OS 线程的栈回溯
    
-   用于处理借用数据的模块。
    
-   用于堆分配的 `Box<T>` 类型。
    
-   可共享的可变容器。
    
-   `char` 原始类型的实用工具。
    
-   不能隐式复制的类型的 `Clone` trait。
    
-   用于比较和排序值的实用工具。
    
-   集合类型。
    
-   用于类型之间的转换 traits。
    
-   `Default` trait 用于具有默认值的类型。
    
-   检查和操作进程的环境。
    
-   处理错误的接口。
    
-   `f32` 单精度浮点类型的常量。
    
-   `f64` 双精度浮点类型的常量。
    
-   与 FFI 绑定有关的实用工具。
    
-   用于格式化和打印 `String`s 的实用工具。
    
-   文件系统操作
    
-   异步基本功能。
    
-   通用哈希支持。
    
-   对编译器的提示，该提示会影响应如何发出或优化代码。 提示可能是编译时或运行时。
    
-   [i8](https://rustwiki.org/zh-CN/std/i8/index.html "mod std::i8")Deprecation planned
    
-   [i16](https://rustwiki.org/zh-CN/std/i16/index.html "mod std::i16")Deprecation planned
    
-   [i32](https://rustwiki.org/zh-CN/std/i32/index.html "mod std::i32")Deprecation planned
    
-   [i64](https://rustwiki.org/zh-CN/std/i64/index.html "mod std::i64")Deprecation planned
    
-   [i128](https://rustwiki.org/zh-CN/std/i128/index.html "mod std::i128")Deprecation planned
    
-   核心 I/O 功能的 Traits，帮助程序和类型定义。
    
-   [isize](https://rustwiki.org/zh-CN/std/isize/index.html "mod std::isize")Deprecation planned
    
-   可组合的外部迭代。
    
-   代表类型基本属性的原始 traits 和类型。
    
-   处理内存的基本函数。
    
-   TCP/UDP 通信的网络原语。
    
-   数字的附加功能。
    
-   可重载的运算符。
    
-   可选值。
    
-   特定于操作系统的功能。
    
-   标准库中的 Panic 支持。
    
-   跨平台路径操作。
    
-   键入将数据固定到其在内存中的位置的类型。
    
-   Rust Prelude
    
-   此模块重导出原始类型，以允许使用可能不会被其他声明的类型隐藏的类型。
    
-   用于处理进程的模块。
    
-   通过裸指针手动管理内存。
    
-   单线程引用计数指针。`Rc` 代表引用计数。
    
-   `Result` 类型的错误处理。
    
-   切片原始类型的实用工具。
    
-   `str` 原始类型的实用工具。
    
-   一个 UTF-8 编码的可增长字符串。
    
-   有用的同步原语。
    
-   类型和 Traits 用于处理异步任务。
    
-   原生线程。
    
-   时间量化。
    
-   [u8](https://rustwiki.org/zh-CN/std/u8/index.html "mod std::u8")Deprecation planned
    
-   [u16](https://rustwiki.org/zh-CN/std/u16/index.html "mod std::u16")Deprecation planned
    
-   [u32](https://rustwiki.org/zh-CN/std/u32/index.html "mod std::u32")Deprecation planned
    
-   [u64](https://rustwiki.org/zh-CN/std/u64/index.html "mod std::u64")Deprecation planned
    
-   [u128](https://rustwiki.org/zh-CN/std/u128/index.html "mod std::u128")Deprecation planned
    
-   [usize](https://rustwiki.org/zh-CN/std/usize/index.html "mod std::usize")Deprecation planned
    
-   具有堆已分配内容的连续可增长数组类型，写为 `Vec<T>`。
    

-   将字面量连接成字节切片。
    
-   将标识符串联为一个标识符。
    

-   将传递的 tokens 打印到标准输出中。
    
-   启用或禁用用于调试其他宏的跟踪功能。
    
-   声明在运行时布尔表达式为 `true`。
    

-   在编译时评估配置标志的布尔组合。
    
-   扩展到调用它的列号。
    
-   导致编译失败，并遇到给定的错误消息。
    
-   将字面量串联成一个静态字符串切片。
    
-   打印并返回给定表达式的值，以进行快速而肮脏的调试。
    
-   声明在运行时布尔表达式为 `true`。
    
-   断言两个表达式彼此相等。
    
-   断言两个表达式彼此不相等。
    
-   在编译时检查环境变量。
    
-   打印到标准错误。
    
-   使用换行符打印到标准错误。
    
-   扩展为调用该文件的文件名。
    
-   使用运行时表达式的插值创建 `String`。
    
-   构造其他字符串格式宏的参数。
    
-   根据上下文将文件解析为表达式或项。
    
-   包含一个文件作为对字节数组的引用。
    
-   包含 UTF-8 编码的文件作为字符串。
    
-   一个在运行时测试 x86/x86-64 平台上是否具有 CPU 特性的宏。
    
-   扩展为在其上被调用的行号。
    
-   返回给定表达式是否与任何给定模式匹配。
    
-   扩展为代表当前模块路径的字符串。
    
-   (可选) 在编译时检查环境变量。
    
-   让当前线程 panics。
    
-   打印到标准输出。
    
-   使用换行符打印到标准输出。
    
-   对其参数进行字符串化。
    

-   表示未完成的代码。
    
-   [try](https://rustwiki.org/zh-CN/std/macro.try.html "macro std::try")Deprecated
    
    解开结果或传播其错误。
    
-   通过 panic 并带有 “not implemented” 的消息来指示未实现的代码。
    
-   表示无法访问的代码。
    
-   创建一个包含参数的 [`Vec`](https://rustwiki.org/zh-CN/std/vec/struct.Vec.html "struct std::vec::Vec")。
    
-   将格式化的数据写入缓冲区。
    
-   将格式化的数据写入到缓冲区，并追加一个换行符。
    

-   在类型之间进行转换，或重命名导入。
    

-   暂停执行，直到 [`Future`](https://rustwiki.org/zh-CN/std/future/trait.Future.html "trait std::future::Future") 的结果准备就绪为止。
    
-   从循环中提前退出。
    
-   编译时常量、编译时可评估函数和裸指针。
    
-   跳到循环的下一个迭代。
    
-   Rust 二进制或库。
    

-   一种类型，可以是几种变体中的任何一种。
    
-   链接到或导入外部代码。
    
-   [`bool`](https://rustwiki.org/zh-CN/std/primitive.bool.html "primitive bool") 类型的值，表示逻辑 **false**。
    
-   一个函数或函数指针。
    

-   如果条件成立，则评估一个块。
    
-   为类型实现一些功能。
    
-   使用 [`for`](https://rustwiki.org/zh-CN/std/keyword.for.html) 迭代一系列值。
    
-   将值绑定到变量。
    
-   无限循环。
    
-   基于模式匹配的控制流。
    
-   将代码整理到 [模块](https://rustwiki.org/zh-CN/reference/items/modules.html) 中。
    
-   按值捕获 [闭包](https://rustwiki.org/zh-CN/book/ch13-01-closures.html) 的环境。
    
-   可变变量，引用或指针。
    
-   使项对其他人可见。
    
-   在模式匹配期间通过引用绑定。
    
-   从函数返回一个值。
    
-   方法的接收者，或当前模块。
    
-   静态项是在程序的整个持续时间内有效的值 (`'static` 生命周期)。
    
-   由其他类型组成的类型。
    
-   当前 [模块](https://rustwiki.org/zh-CN/reference/items/modules.html) 的父级。
    
-   一组类型的通用接口。
    
-   [`bool`](https://rustwiki.org/zh-CN/std/primitive.bool.html "primitive bool") 类型的值，表示逻辑 `true`。
    
-   为现有类型定义别名。
    

-   类型系统无法验证其 [内存安全](https://rustwiki.org/zh-CN/book/ch19-01-unsafe-rust.html) 的代码或接口。
    
-   从其他 crates 或模块导入或重命名项。
    
-   添加使用项必须坚持的约束。
    
-   保持条件时循环播放。
