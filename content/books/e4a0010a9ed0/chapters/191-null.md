基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

`null` 值特指未不存在任何对象值。它是 JavaScript 的[原始值](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)之一，且在布尔运算中被视为[假值](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)。

## [尝试一下](#尝试一下)

```
function getVowels(str) {
  const m = str.match(/[aeiou]/gi);
  if (m === null) {
    return 0;
  }
  return m.length;
}

console.log(getVowels("sky"));
// Expected output: 0
```

## [语法](#语法)

js

```
null
```

## [描述](#描述)

值 `null` 被写作字面量：`null`。不像 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，`null` 不是全局对象的属性。相反，`null` 是表示缺少的标识，指示变量未指向任何对象。在 API 中，`null` 常在预期的值应是一个对象，但又没有关联的对象的地方使用。

js

```
// foo 不存在。它从未被定义或初始化：
foo; //ReferenceError: foo is not defined
```

js

```
// 已知 foo 现在已经存在，但它没有类型和值：
const foo = null;
foo; //null
```

## [示例](#示例)

### [`null` 与 `undefined` 的不同点](#null_与_undefined_的不同点)

当检查值是否为 `null` 或 `undefined` 时，请注意[相等（==）与全等（===）运算符的区别](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators)，前者会执行类型转换：

js

```
typeof null; // "object"（因历史原因而不是 "null"）
typeof undefined; // "undefined"
null === undefined; // false
null == undefined; // true
null === null; // true
null == null; // true
!null; // true
Number.isNaN(1 + null); // false
Number.isNaN(1 + undefined); // true
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-null-value](https://tc39.es/ecma262/multipage/overview.html#sec-null-value) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
-   [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
-   [`void`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年7月16日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null/contributors.txt)更新。
