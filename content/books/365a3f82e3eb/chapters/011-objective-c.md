分类:

《从 C++ 到 Objective-C》系列已经结束。再次重申一下，本系列不是一个完整的 Objective-C 的教学文档，只是方便熟悉 C++ 或者类 C++ 的开发人员（例如广大的 Java 程序员）能够很快的使用 Objective-C 进行简单的开发。当然，目前 Objective-C 的最广泛应用在于 Apple 系列的开发，MacOS X、iOS 等。本系列仅仅介绍的是 Objec ...

RTTI (Run-Time Type Information) RTTI 即运行时类型信息，能够在运行的时候知道需要的类型信息。C++ 有时被认为是一个“假的”面向对象语言。相比 Objective-C，C++ 显得非常静态。这有利于在运行时获得最好的性能。C++ 使用 typeinfo 库提供运行时信息，但这不是安全的，因为这个库依赖于编译器的实现。一般来说，查找对象的类型是一个很少见的请求， ...

属性的自定义实现 上一章中我们提到的代码中有两个关键字@synthesize和@dynamic。@dynamic意思是由开发人员提供相应的代码：对于只读属性需要提供 setter，对于读写属性需要提供 setter 和 getter。@synthesize意思是，除非开发人员已经做了，否则由编译器生成相应的代码，以满足属性声明。对于上次的例子，如果开发人员提供了-(NSString\*)regist ...

属性 使用属性 在定义类时有一个属性的概念。我们使用关键字@property来标记一个属性，告诉编译器自动生成访问代码。属性的主要意义在于节省开发代码量。

本章中心是两个能够让代码更简洁的特性。它们的目的截然不同：键值对编码可以通过选择第一个符合条件的实现而解决间接方法调用；属性则可以让编译器帮我们生成部分代码。键值对编码实际上是 Cocoa 引入的，而属性则是 Objective-C 2.0 语言新增加的。

C++ 标准库是其强大的一个原因。即使它还有一些不足，但是已经能够算作是比较完备的了。这并不是语言的一部分，而是属于一种扩展，其他语言也有类似的部分。在 Objective-C 中，你不得不在 Cocoa 里面寻找容器、遍历器或者其他一些真正可以使用的算法。

字符串 Objective-C 中唯一的 static 对象 在 C 语言中，字符串就是字符数组，使用char \*指针。处理这种数据非常困难，并且可能引起很多 bug。C++ 的string类是一种解脱。在 Objective-C 中，前面我们曾经介绍过，所有对象都不是自动的，都要在运行时分配内存。唯一不符合的就是 static 字符串。这导致可以使用 static 的 C 字符串作为NSStri ...

异常处理 比起 C++ 来，Objective-C 中的异常处理更像 Java，这主要是因为 Objective-C 有一个@finally关键字。Java 中也有一个类似的finally关键字，但 C++ 中则没有。finally 是 try()...catch() 块的一个可选附加块，其中的代码是必须执行的，不管有没有捕获到异常。这种设计可以很方便地写出简短干净的代码，比如资源释放等。除此之外 ...

Getters Objective-C 中，所有对象都是动态分配的，使用指针引用。一般的，getter 仅仅返回指针的值，而不应该复制对象。getter 的名字一般和数据成员的名字相同（这一点不同于 Java，JavaBean 规范要求以 get 开头），这并不会引起任何问题。如果是布尔变量，则使用 is 开头（类似 JavaBean 规范），这样可以让程序更具可读性。

Setters 如果不对 Objective-C 的内存管理机制有深刻的理解，是很难写出争取的 setter 的。假设一个类有一个名为 title 的NSString类型的属性，我们希望通过 setter 设置其值。这个例子虽然简单，但已经表现出 setter 所带来的主要问题：参数如何使用？不同于 C++，在 Objective-C 中，对象只能用指针引用，因此 setter 虽然只有一种原型， ...

-   1
-   [2](https://www.devbean.net/category/objective-c/page/2/)
-   [3](https://www.devbean.net/category/objective-c/page/3/)
-   [](https://www.devbean.net/category/objective-c/page/2/)
