基线

广泛可用

自 2015年9月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`Object.is()`** 静态方法确定两个值是否为[相同值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness#%E4%BD%BF%E7%94%A8_object.is_%E8%BF%9B%E8%A1%8C%E5%90%8C%E5%80%BC%E7%9B%B8%E7%AD%89%E6%AF%94%E8%BE%83)。

## [尝试一下](#尝试一下)

```
console.log(Object.is("1", 1));
// 期望输出：false

console.log(Object.is(NaN, NaN));
// 期望输出：true

console.log(Object.is(-0, 0));
// 期望输出：false

const obj = {};
console.log(Object.is(obj, {}));
// 期望输出：false
```

## [语法](#语法)

js

```
Object.is(value1, value2)
```

### [参数](#参数)

[`value1`](#value1)

要比较的第一个值。

[`value2`](#value2)

要比较的第二个值。

### [返回值](#返回值)

一个布尔值，指示两个参数是否为相同的值。

## [描述](#描述)

`Object.is()` 确定两个值是否为[相同值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness#%E4%BD%BF%E7%94%A8_object.is_%E8%BF%9B%E8%A1%8C%E5%90%8C%E5%80%BC%E7%9B%B8%E7%AD%89%E6%AF%94%E8%BE%83)。如果以下其中一项成立，则两个值相同：

-   都是 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)
-   都是 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)
-   都是 `true` 或者都是 `false`
-   都是长度相同、字符相同、顺序相同的字符串
-   都是相同的对象（意味着两个值都引用了内存中的同一对象）
-   都是 [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 且具有相同的数值
-   都是 [symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 且引用相同的 symbol 值
-   都是数字且
    -   都是 `+0`
    -   都是 `-0`
    -   都是 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
    -   都有相同的值，非零且都不是 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)

`Object.is()` 与 [`==`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Equality) 运算符并不等价。`==` 运算符在测试相等性之前，会对两个操作数进行类型转换（如果它们不是相同的类型），这可能会导致一些非预期的行为，例如 `"" == false` 的结果是 `true`，但是 `Object.is()` 不会对其操作数进行类型转换。

`Object.is()` 也_不_等价于 [`===`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Strict_equality) 运算符。`Object.is()` 和 `===` 之间的唯一区别在于它们处理带符号的 0 和 `NaN` 值的时候。`===` 运算符（和 `==` 运算符）将数值 `-0` 和 `+0` 视为相等，但是会将 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 视为彼此不相等。

## [示例](#示例)

### [使用 Object.is()](#使用_object.is)

js

```
// 案例 1：评估结果和使用 === 相同
Object.is(25, 25); // true
Object.is("foo", "foo"); // true
Object.is("foo", "bar"); // false
Object.is(null, null); // true
Object.is(undefined, undefined); // true
Object.is(window, window); // true
Object.is([], []); // false
const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
Object.is(foo, foo); // true
Object.is(foo, bar); // false
Object.is(foo, sameFoo); // true

// 案例 2: 带符号的 0
Object.is(0, -0); // false
Object.is(+0, -0); // false
Object.is(-0, -0); // true

// 案例 3: NaN
Object.is(NaN, 0 / 0); // true
Object.is(NaN, Number.NaN); // true
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-object.is](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.is) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`core-js` 中 `Object.is` 的 Polyfill](https://github.com/zloirock/core-js#ecmascript-object "外部链接（在新标签页中打开）")
-   [`Object.is` 的 es-shims polyfill](https://www.npmjs.com/package/object.is "外部链接（在新标签页中打开）")
-   [JavaScript 中的相等性判断](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness)——三种内置相等性工具的比较

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月22日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is/contributors.txt)更新。
