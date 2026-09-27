基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`if...else`** 语句会在指定的条件为[真](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)时执行一个语句。如果条件为[假](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)，则会执行可选的 `else` 子句中的另一个语句。

## [尝试一下](#尝试一下)

```
function testNum(a) {
  let result;
  if (a > 0) {
    result = "positive";
  } else {
    result = "NOT positive";
  }
  return result;
}

console.log(testNum(-5));
// Expected output: "NOT positive"
```

## [语法](#语法)

js

```
if (condition)
  statement1

// 带有 else 子句
if (condition)
  statement1
else
  statement2
```

[`condition`](#condition)

值为[真](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)或[假](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)的[表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_operators#%E8%A1%A8%E8%BE%BE%E5%BC%8F)

[`statement1`](#statement1)

当_条件_为[真](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)时执行的语句。可为任意语句，包括嵌套了 `if` 的语句。要执行多条语句，使用[块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/block)语句（`{ /* ... */ }`）将这些语句分组；若不想执行语句，则使用[空](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/Empty)语句。

[`statement2`](#statement2)

如果 `condition` 为[假](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)且 `else` 从句存在时执行的语句。可为任意语句，包括块语句和嵌套的 `if` 语句。

## [描述](#描述)

可以嵌套多个 `if...else` 语句以创建 `else if` 子句。请注意，JavaScript 中没有 `elseif`（单个词）关键字。

js

```
if (condition1)
  statement1
else if (condition2)
  statement2
else if (condition3)
  statement3
// …
else
  statementN
```

要看看它如何工作，可以调整下嵌套的缩进：

js

```
if (condition1)
  statement1
else
  if (condition2)
    statement2
  else
    if (condition3)
      statement3
// …
```

要在一个子句中执行多条语句，可使用块语句（`{ /* ... */ }`）来组织这些语句。

js

```
if (condition) {
  statements1
} else {
  statements2
}
```

不使用块可能会导致令人困惑的行为，尤其是在代码是手动格式化的情况下。例如：

js

```
function checkValue(a, b) {
  if (a === 1)
    if (b === 2)
      console.log("a 是 1 并且 b 是 2");
  else
    console.log("a 不是 1");
}
```

这段代码看上去没什么问题，但是，执行 `checkValue(1, 3)` 会输出“a 不是 1”。这是因为在[悬空 else](https://en.wikipedia.org/wiki/Dangling_else "外部链接（在新标签页中打开）") 的情况下，`else` 子句会连接到最近的 `if` 子句。因此，上述代码在缩进适当的情况下看起来会是这样的：

js

```
function checkValue(a, b) {
  if (a === 1)
    if (b === 2)
      console.log("a 是 1 并且 b 是 2");
    else
      console.log("a 不是 1");
}
```

通常情况下，始终使用块语句是种很好的做法，特别是在涉及嵌套 `if` 语句的代码中。

js

```
function checkValue(a, b) {
  if (a === 1) {
    if (b === 2) {
      console.log("a 是 1 并且 b 是 2");
    }
  } else {
    console.log("a 不是 1");
  }
}
```

不要将原始的布尔值 `true` 和 `false` 与 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 对象的真或假混淆。任何不是 `false`、`undefined`、`null`、`0`、`-0`、`NaN` 或空字符串（`""`）的值，以及任何对象（包括值为 `false` 的布尔对象），在用作条件时都被视为[真](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)。例如：

js

```
const b = new Boolean(false);
if (b) {
  console.log("b 为真"); // “b 为真”
}
```

## [示例](#示例)

### [使用 if...else](#使用_if...else)

js

```
if (cipherChar === fromChar) {
  result += toChar;
  x++;
} else {
  result += clearChar;
}
```

### [使用 else if](#使用_else_if)

请注意，JavaScript 中没有 `elseif` 关键字。但是，你可以在 `else` 和 `if` 之间加上一个空格：

js

```
if (x > 50) {
  /* 做一些事情 */
} else if (x > 5) {
  /* 做一些事情 */
} else {
  /* 做一些事情 */
}
```

### [使用赋值作为条件](#使用赋值作为条件)

你几乎不应该在 `if...else` 语句中使用像 `x = y` 这样的赋值作为条件：

js

```
if ((x = y)) {
  // …
}
```

因为与 [`while`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/while) 循环不同，条件只会被求值一次，所以赋值操作只会被执行一次。上述代码等价于：

js

```
x = y;
if (x) {
  // …
}
```

这更加清晰。然而，在极少数情况下，你可能需要这样做，[`while`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/while) 文档有[使用赋值作为条件](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/while#%E4%BD%BF%E7%94%A8%E8%B5%8B%E5%80%BC%E4%BD%9C%E4%B8%BA%E6%9D%A1%E4%BB%B6)一节，其中包含我们的建议。

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-if-statement](https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-if-statement) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`block`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/block)
-   [`switch`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/switch)
-   [条件（三元）运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_operator)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年7月16日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/if...else/contributors.txt)更新。
