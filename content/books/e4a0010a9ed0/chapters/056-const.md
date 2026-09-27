基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`const`** 声明用于声明块作用域的局部变量。常量的值不能通过使用[赋值运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment)重新赋值来更改，但是如果常量是一个[对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Data_structures#objects)，它的属性可以被添加、更新或删除。

## [尝试一下](#尝试一下)

```
const number = 42;

try {
  number = 99;
} catch (err) {
  console.log(err);
  // Expected output: TypeError: invalid assignment to const 'number'
  // (Note: the exact output may be browser-dependent)
}

console.log(number);
// Expected output: 42
```

## [语法](#语法)

js

```
const name1 = value1;
const name1 = value1, name2 = value2;
const name1 = value1, name2 = value2, /* …, */ nameN = valueN;
```

[`nameN`](#namen)

要声明的变量的名称。每个变量名称必须是合法的 JavaScript [标识符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E6%A0%87%E8%AF%86%E7%AC%A6)或[解构绑定模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring)。

[`valueN`](#valuen)

变量的初始值。它可以是任何合法的表达式。

## [描述](#描述)

`const` 声明与 [`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 非常相似：

-   `const` 声明的作用域既可以是块级作用域，也可以是函数作用域。
    
-   `const` 声明只有在声明的位置之后才能访问（参见[暂时性死区](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let#%E6%9A%82%E6%97%B6%E6%80%A7%E6%AD%BB%E5%8C%BA)）。因此，`const` 声明通常被视为[非提升](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)的声明方式。
    
-   当在脚本的顶层声明时，`const` 声明不会在 [`globalThis`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis) 上创建属性。
    
-   在同一作用域中，`const` 声明不能被任何其他声明[重新声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let#%E9%87%8D%E6%96%B0%E5%A3%B0%E6%98%8E)。
    
-   `const` 是[_声明_而不是_语句_](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements#%E8%AF%AD%E5%8F%A5%E5%92%8C%E5%A3%B0%E6%98%8E%E7%9A%84%E5%8C%BA%E5%88%AB)。这意味着你不能将单独的 `const` 声明用作块的主体（这是合理的，因为无法访问变量）。
    
    js
    
    ```
    if (true) const a = 1; // SyntaxError: Lexical declaration cannot appear in a single-statement context
    ```
    

一个常量需要一个初始值。你必须在声明同时指定它的值。（这是合理的，因为它在声明后不能被改变。）

js

```
const FOO; // SyntaxError: Missing initializer in const declaration
```

`const` 声明创建了一个对值的不可变引用。它并_不_意味着它所持有的值是不可变的，只是变量标识符不能被重新赋值。例如，在内容是对象的情况下，这意味着对象的内容（例如属性）是可以被修改的。你应该将 `const` 声明理解为“创建一个_身份_保持不变”的标识符（变量），而不是“保持_值_不变的标识符”——换言之，是“创建不可变的[绑定](https://developer.mozilla.org/zh-CN/docs/Glossary/Binding)”，而不是“不可变的值”。

许多代码风格指南（包括 [MDN 的指南](https://developer.mozilla.org/zh-CN/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript#%E5%8F%98%E9%87%8F%E5%A3%B0%E6%98%8E)建议当变量在其作用域中不会重新赋值时使用 `const` 而不是 [`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)。这样可以清晰地表达变量的类型（或值，如果是原始类型的情况下）永远不会改变的意图。对非原始值可能改变的情况下其他人可能更喜欢使用 `let`。

紧跟在 `const` 关键字后面的列表被称为[_绑定_](https://developer.mozilla.org/zh-CN/docs/Glossary/Binding)_列表_，用逗号分隔，其中逗号_不是_[逗号运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comma_operator)，`=` 符号_不是_[赋值运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment)。后面变量的初始值可以引用处在列表前面的变量。

## [示例](#示例)

### [const 基本用法](#const_基本用法)

常量在声明的时候可以使用大小写，但通常情况下全部用大写字母，特别是对于原始值，因为它们确实是不可变的。

js

```
// 定义常量 MY_FAV 并赋值为 7
const MY_FAV = 7;

console.log(`我最喜欢的数字是：${MY_FAV}`);
```

js

```
// 对常量变量重新赋值会引发错误
MY_FAV = 20; // TypeError: Assignment to constant variable

// 重新声明常量会引发错误
const MY_FAV = 20; // SyntaxError: Identifier 'MY_FAV' has already been declared
var MY_FAV = 20; // SyntaxError: Identifier 'MY_FAV' has already been declared
let MY_FAV = 20; // SyntaxError: Identifier 'MY_FAV' has already been declared
```

### [块级作用域](#块级作用域)

请务必注意块作用域的特性。

js

```
const MY_FAV = 7;

if (MY_FAV === 7) {
  // 没有问题，因为它在新的块级作用域中
  const MY_FAV = 20;
  console.log(MY_FAV); // 20

  // var 声明的范围不限于块，因此会引发错误
  var MY_FAV = 20; // SyntaxError: Identifier 'MY_FAV' has already been declared
}

console.log(MY_FAV); // 7
```

### [定义对象和数组常量](#定义对象和数组常量)

`const` 也适用于对象和数组。尝试覆盖该对象会引发错误“Assignment to constant variable”。

js

```
const MY_OBJECT = { key: "值" };
MY_OBJECT = { OTHER_KEY: "值" };
```

然而，对象的键不受保护，因此以下语句可以正常执行。

js

```
MY_OBJECT.key = "其他值";
```

你可能需要使用 [`Object.freeze()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) 来使对象不可变。

这对数据同样适用。尝试覆盖该数组会引发错误“Assignment to constant variable”。

js

```
const MY_ARRAY = [];
MY_ARRAY = ["B"];
```

同样地，数组的元素不受保护，因此以下语句可以正常执行。

js

```
MY_ARRAY.push("A"); // ["A"]
```

### [带解构的声明](#带解构的声明)

每个 `=` 后面的左侧也可以是绑定模式。这允许一次创建多个变量。

js

```
const result = /(a+)(b+)(c+)/.exec("aaabcc");
const [, a, b, c] = result;
console.log(a, b, c); // "aaa" "b" "cc"
```

有关更多信息，请参阅[解构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring)。

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-let-and-const-declarations](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`var`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var)
-   [`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
-   [JavaScript 指南中的常量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#%E5%B8%B8%E9%87%8F)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年7月16日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const/contributors.txt)更新。
