基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`parseFloat()`** 函数解析一个参数（必要时先转换为字符串）并返回一个浮点数。

## [尝试一下](#尝试一下)

```
function circumference(r) {
  return parseFloat(r) * 2.0 * Math.PI;
}

console.log(circumference(4.567));
// Expected output: 28.695307297889173

console.log(circumference("4.567abcdefgh"));
// Expected output: 28.695307297889173

console.log(circumference("abcdefgh"));
// Expected output: NaN
```

## [语法](#语法)

js

```
parseFloat(string)
```

### [参数](#参数)

[`string`](#string)

需要被解析成为浮点数的值。

### [返回值](#返回值)

给定值被解析成浮点数。如果给定值不能被转换成数值，则会返回 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)。

## [描述](#描述)

`parseFloat` 是个全局函数，不属于任何对象。

-   如果 `parseFloat` 在解析过程中遇到了正号（`+`）、负号（`-` U+002D HYPHEN-MINUS）、数字（`0`\-`9`）、小数点（`.`）、或者科学记数法中的指数（e 或 E）以外的字符，则它会忽略该字符以及之后的所有字符，返回当前已经解析到的浮点数。
-   第二个小数点的出现也会使解析停止（在这之前的字符都会被解析）。
-   参数首位和末位的空白符会被忽略。
-   如果参数字符串的第一个字符不能被解析成为数字，则 `parseFloat` 返回 `NaN`。
-   `parseFloat` 也可以解析并返回 [`Infinity`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Infinity)。
-   `parseFloat` 解析 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 为 [`Numbers`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number), 丢失精度。因为末位 `n` 字符被丢弃。

考虑使用 [`Number(_value_)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 进行更严谨的解析，只要参数带有无效字符就会被转换为 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 。

`parseFloat` 也可以转换一个已经定义了 `toString` 或者 `valueOf` 方法的对象，它返回的值和在调用该方法的结果上调用 `parseFloat` 值相同。

## [示例](#示例)

### [示例：`parseFloat`返回正常数字](#示例：parsefloat返回正常数字)

下面的例子都返回 **3.14**

js

```
parseFloat(3.14);
parseFloat("3.14");
parseFloat("  3.14  ");
parseFloat("314e-2");
parseFloat("0.0314E+2");
parseFloat("3.14some non-digit characters");
parseFloat({
  toString: function () {
    return "3.14";
  },
});
```

### [`parseFloat` 返回 NaN](#parsefloat_返回_nan)

下面的例子将返回`NaN`

js

```
parseFloat("FF2");
```

### [parseFloat 和 BigInt](#parsefloat_和_bigint)

以下例子均返回 `900719925474099300`，当整数太大以至于不能被转换时将失去精度。

js

```
parseFloat(900719925474099267n);
parseFloat("900719925474099267n");
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-parsefloat-string](https://tc39.es/ecma262/multipage/global-object.html#sec-parsefloat-string) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`parseInt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
-   [`Number.parseFloat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat)
-   [`Number.parseInt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)
-   [`isNaN()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年7月16日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat/contributors.txt)更新。
