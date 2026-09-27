## **Rust** 常用设计模式

#### 创建型模式

![抽象工厂](https://refactoringguru.cn/images/patterns/cards/abstract-factory-mini.png?id=4c3927c446313a38ce77dfee38111e27)

#### 抽象工厂

让你能创建一系列相关的对象， 而无需指定其具体类。

![生成器](https://refactoringguru.cn/images/patterns/cards/builder-mini.png?id=19b95fd05e6469679752c0554b116815)

#### 生成器

使你能够分步骤创建复杂对象。 该模式允许你使用相同的创建代码生成不同类型和形式的对象。

![工厂方法](https://refactoringguru.cn/images/patterns/cards/factory-method-mini.png?id=72619e9527893374b98a5913779ac167)

#### 工厂方法

在父类中提供一个创建对象的接口以允许子类决定实例化对象的类型。

![原型](https://refactoringguru.cn/images/patterns/cards/prototype-mini.png?id=bc3046bb39ff36574c08d49839fd1c8e)

#### 原型

让你能够复制已有对象， 而又无需使代码依赖它们所属的类。

![单例](https://refactoringguru.cn/images/patterns/cards/singleton-mini.png?id=914e1565dfdf15f240e766163bd303ec)

#### 单例

让你能够保证一个类只有一个实例， 并提供一个访问该实例的全局节点。

#### 结构型模式

![适配器](https://refactoringguru.cn/images/patterns/cards/adapter-mini.png?id=b2ee4f681fb589be5a0685b94692aebb)

#### 适配器

让接口不兼容的对象能够相互合作。

![桥接](https://refactoringguru.cn/images/patterns/cards/bridge-mini.png?id=b389101d8ee8e23ffa1b534c704d0774)

#### 桥接

可将一个大类或一系列紧密相关的类拆分为抽象和实现两个独立的层次结构， 从而能在开发时分别使用。

![组合](https://refactoringguru.cn/images/patterns/cards/composite-mini.png?id=a369d98d18b417f255d04568fd0131b8)

#### 组合

你可以使用它将对象组合成树状结构， 并且能像使用独立对象一样使用它们。

![装饰](https://refactoringguru.cn/images/patterns/cards/decorator-mini.png?id=d30458908e315af195cb183bc52dbef9)

#### 装饰

允许你通过将对象放入包含行为的特殊封装对象中来为原对象绑定新的行为。

![外观](https://refactoringguru.cn/images/patterns/cards/facade-mini.png?id=71ad6fa98b168c11cb3a1a9517dedf78)

#### 外观

能为程序库、 框架或其他复杂类提供一个简单的接口。

![享元](https://refactoringguru.cn/images/patterns/cards/flyweight-mini.png?id=422ca8d2f90614dce810a8812c626698)

#### 享元

摒弃了在每个对象中保存所有数据的方式， 通过共享多个对象所共有的相同状态， 让你能在有限的内存容量中载入更多对象。

![代理](https://refactoringguru.cn/images/patterns/cards/proxy-mini.png?id=25890b11e7dc5af29625ccd0678b63a8)

#### 代理

让你能够提供对象的替代品或其占位符。 代理控制着对于原对象的访问， 并允许在将请求提交给对象前后进行一些处理。

#### 行为模式

![责任链](https://refactoringguru.cn/images/patterns/cards/chain-of-responsibility-mini.png?id=36d85eba8d14986f053123de17aac7a7)

#### 责任链

允许你将请求沿着处理者链进行发送。 收到请求后， 每个处理者均可对请求进行处理， 或将其传递给链上的下个处理者。

![命令](https://refactoringguru.cn/images/patterns/cards/command-mini.png?id=b149eda017c0583c1e92343b83cfb1eb)

#### 命令

它可将请求转换为一个包含与请求相关的所有信息的独立对象。 该转换让你能根据不同的请求将方法参数化、 延迟请求执行或将其放入队列中， 且能实现可撤销操作。

![迭代器](https://refactoringguru.cn/images/patterns/cards/iterator-mini.png?id=76c28bb48f997b36965983dd2b41f02e)

#### 迭代器

让你能在不暴露集合底层表现形式 （列表、 栈和树等） 的情况下遍历集合中所有的元素。

![中介者](https://refactoringguru.cn/images/patterns/cards/mediator-mini.png?id=a7e43ee8e17e4474737b1fcb3201d7ba)

#### 中介者

能让你减少对象之间混乱无序的依赖关系。 该模式会限制对象之间的直接交互， 迫使它们通过一个中介者对象进行合作。

![备忘录](https://refactoringguru.cn/images/patterns/cards/memento-mini.png?id=8b2ea4dc2c5d15775a654808cc9de099)

#### 备忘录

允许在不暴露对象实现细节的情况下保存和恢复对象之前的状态。

![观察者](https://refactoringguru.cn/images/patterns/cards/observer-mini.png?id=fd2081ab1cff29c60b499bcf6a62786a)

#### 观察者

允许你定义一种订阅机制， 可在对象事件发生时通知多个 “观察” 该对象的其他对象。

![状态](https://refactoringguru.cn/images/patterns/cards/state-mini.png?id=f4018837e0641d1dade756b6678fd4ee)

#### 状态

让你能在一个对象的内部状态变化时改变其行为， 使其看上去就像改变了自身所属的类一样。

![策略](https://refactoringguru.cn/images/patterns/cards/strategy-mini.png?id=d38abee4fb6f2aed909d262bdadca936)

#### 策略

能让你定义一系列算法， 并将每种算法分别放入独立的类中， 以使算法的对象能够相互替换。

![模板方法](https://refactoringguru.cn/images/patterns/cards/template-method-mini.png?id=9f200248d88026d8e79d0f3dae411ab4)

#### 模板方法

在超类中定义一个算法的框架， 允许子类在不修改结构的情况下重写算法的特定步骤。

![访问者](https://refactoringguru.cn/images/patterns/cards/visitor-mini.png?id=854a35a62963bec1d75eab996918989b)

#### 访问者

将算法与其所作用的对象隔离开来。
