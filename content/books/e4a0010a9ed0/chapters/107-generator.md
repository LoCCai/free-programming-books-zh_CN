## [尝试一下](#尝试一下)

```
const foo = function* () {
  yield "a";
  yield "b";
  yield "c";
};

let str = "";
for (const val of foo()) {
  str = str + val;
}

console.log(str);
// Expected output: "abc"
```

## [构造函数](#构造函数)

`Generator` 构造函数并不是全局可用的。`Generator` 的实例必须从[生成器函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)返回：

js

```
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator(); // "Generator { }"

console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```

实际上，并没有对应 `Generator` 构造函数的 JavaScript 实体。只有一个隐藏对象，其是所有由生成器函数创建的对象所共享的原型对象。这个对象通常被风格化为 `Generator.prototype` 来使其看起来像是一个类，但它更恰当的称呼应该是 [`GeneratorFunction.prototype.prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction)，因为 `GeneratorFunction` 是一个实际的 JavaScript 实体。

## [实例属性](#实例属性)

这些属性定义于 `Generator.prototype` 并由所有 `Generator` 实例所共享。

[`Generator.prototype.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

创建实例对象的构造函数。对于 `Generator` 实例，其初始值是 [`GeneratorFunction.prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction)。

**备注：**`Generator` 对象不会存储创建它们的生成器函数的引用。

[`Generator.prototype[Symbol.toStringTag]`](#generator.prototypesymbol.tostringtag)

[`[Symbol.toStringTag]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性的初始值是字符串 `"Generator"`。该属性被 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 使用。

## [实例方法](#实例方法)

_同时也从其父类 [`Iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator) 继承实例方法_。

[`Generator.prototype.next()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator/next)

返回 [`yield`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/yield) 表达式生成的值。

[`Generator.prototype.return()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator/return)

类似于在当前的生成器主体的暂停位置插入 `return` 语句，该语句结束了生成器并且允许生成器与 [`try...finally`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch#finally_%E5%9D%97) 块相组合时，执行任何清理任务。

[`Generator.prototype.throw()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator/throw)

类似于在当前的生成器主体的暂停位置插入 `throw` 语句，该语句通知生成器有错误的情况并且允许其处理错误或执行清理并自行关闭。

## [示例](#示例)

### [无穷迭代器](#无穷迭代器)

通过生成器函数，值只有在其被需要时才会进行计算。因此，生成器允许我们定义一个潜在的无穷数据结构。

js

```
function* infinite() {
  let index = 0;

  while (true) {
    yield index++;
  }
}

const generator = infinite(); // "Generator { }"

console.log(generator.next().value); // 0
console.log(generator.next().value); // 1
console.log(generator.next().value); // 2
// …
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-generator-objects](https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-generator-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`function*`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*)
-   [`function*` 表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function*)
-   [`GeneratorFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction)
-   [迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年10月23日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator/contributors.txt)更新。
