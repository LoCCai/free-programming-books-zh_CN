## [描述](#描述)

字符串对于保存可以以文本形式表示的数据很有用。一些最常用的字符串操作是检查它们的[长度](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length)，使用 [\+ 和 += 字符串运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_operators#%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BF%90%E7%AE%97%E7%AC%A6)来构建和连接它们，使用 [`indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) 方法检查子字符串的存在或者位置，或使用 [`substring()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring) 方法提取子字符串。

### [创建字符串](#创建字符串)

字符串可以通过字符串字面量创建为原始值，也可以通过 [`String()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/String) 构造函数创建为字符串对象：

js

```
const string1 = "A string primitive";
const string2 = 'Also a string primitive';
const string3 = `Yet another string primitive`;
```

js

```
const string4 = new String("A String object");
```

字符串原始值和字符串对象共享很多行为，但也有其他重要的区别和注意事项。请参阅下面的“[字符串原始值和字符串对象](#字符串原始值和字符串对象)”。

字符串字面量可以使用单引号或者双引号指定，它们的处理方式相同，或者使用反引号字符 \`。最后一种形式指定了[模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)，你可以在其中插入表达式。有关字符串字面量语法的更多信息，请参见[词法语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%AD%97%E9%9D%A2%E9%87%8F)。

### [访问字符](#访问字符)

有两种方式访问字符串中的单个字符。首先是 [`charAt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charAt) 方法：

js

```
"cat".charAt(1); // gives value "a"
```

另一个方式是将字符串视为类数组对象，其中各个字符对应于一个数字索引：

js

```
"cat"[1]; // gives value "a"
```

当使用方括号表示法进行字符串访问时，尝试删除或为其赋值的行为将不成功。涉及的属性既不可写（writable）也不可配置（configurable）（更多细节，请参见 [`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)）。

### [比较字符串](#比较字符串)

使用[小于和大于运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators)来比较字符串：

js

```
const a = "a";
const b = "b";
if (a < b) {
  // true
  console.log(`${a} 小于 ${b}`);
} else if (a > b) {
  console.log(`${a} 大于 ${b}`);
} else {
  console.log(`${a} 和 ${b} 相等`);
}
```

注意，所有的比较运算符（包括 [`===`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Strict_equality) 和 [`==`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Equality)）在比较字符串时都区分大小写。不区分大小写地比较字符串的常见方式是在比较它们之前将它们转为相同的大小写（大写或者小写）。

js

```
function areEqualCaseInsensitive(str1, str2) {
  return str1.toUpperCase() === str2.toUpperCase();
}
```

通过 [`toUpperCase()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) 或 [`toLowerCase()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) 进行转换的选择大多是任意的，并且在扩展到拉丁字母之外时，两者都不是完全可靠的。例如，德语小写字母 `ß` 和 `ss` 都被 `toUpperCase()` 转换为 `SS`，而土耳其字母 `ı` 会被 `toLowerCase()` 错误地报告为不等于 `I`，除非使用 [`toLocaleLowerCase("tr")`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase)。

js

```
const areEqualInUpperCase = (str1, str2) =>
  str1.toUpperCase() === str2.toUpperCase();
const areEqualInLowerCase = (str1, str2) =>
  str1.toLowerCase() === str2.toLowerCase();

areEqualInUpperCase("ß", "ss"); // true；应该为 false
areEqualInLowerCase("ı", "I"); // false；应该为 true
```

用于测试不区分大小写的相等性的本地化（locale-aware）且可靠的解决方案是使用 [`Intl.Collator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator) API 或者字符串的 [`localeCompare()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) 方法——它们共享相同的接口——[`sensitivity`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#sensitivity) 选项设置为 `"accent"` 或 `"base"`。

js

```
const areEqual = (str1, str2, locale = "en-US") =>
  str1.localeCompare(str2, locale, { sensitivity: "accent" }) === 0;

areEqual("ß", "ss", "de"); // false
areEqual("ı", "I", "tr"); // true
```

`localeCompare()` 方法使字符串比较可以像 `strcmp()` 函数一样进行——它允许以本地化的方式对字符串进行排序。

### [字符串原始值和字符串对象](#字符串原始值和字符串对象)

注意，JavaScript 区分 `String` 对象和[原始字符串](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)值（[`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 和 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 也是如此）。

字符串字面量（使用单引号或者双引号表示）和从非构造函数上下文中的 `String` 调用返回的字符串（即在不使用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 关键字的情况下调用）是原始字符串。在需要调用原始字符串的方法或进行属性查找的上下文中，JavaScript 将自动包装原始字符串并在包装对象上调用方法或执行属性查找。

js

```
const strPrim = "foo"; // 字面量是一个字符串原始值
const strPrim2 = String(1); // 被强制转换为字符串原始值“1”
const strPrim3 = String(true); // 被强制转换为字符串原始值“true”
const strObj = new String(strPrim); // 使用 `new` 关键字调用 `String` 构造函数返回一个字符串包装对象。

console.log(typeof strPrim); // "string"
console.log(typeof strPrim2); // "string"
console.log(typeof strPrim3); // "string"
console.log(typeof strObj); // "object"
```

**警告：**你应该基本不会将 `String` 作为构造函数使用。

使用 [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 时，字符串原始值和 `String` 对象也会给出不同的结果。传递给 `eval` 的原始值被当作源代码处理；而 `String` 对象则被当作对象处理，返回对象。例如：

js

```
const s1 = "2 + 2"; // 创建一个字符串原始值
const s2 = new String("2 + 2"); // 创建一个 String 对象
console.log(eval(s1)); // 返回数字 4
console.log(eval(s2)); // 返回字符串“2 + 2”
```

因此，当一段代码在期望使用字符串原始值的时候却使用了 `String` 对象是，可能会导致执行失败，虽然一般情况下，我们并不需要考虑这样的问题。

`String` 对象始终可以使用 [`valueOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/valueOf) 方法将其转换为对应的原始值。

js

```
console.log(eval(s2.valueOf())); // 返回数字 4
```

### [字符串强制转换](#字符串强制转换)

许多内置操作首先将它们的参数强制转换为字符串（这就是为什么 `String` 对象的行为类似于字符串原始值的原因）。[这些操作](https://tc39.es/ecma262/#sec-tostring "外部链接（在新标签页中打开）")可以总结为以下几点：

-   字符串按原样返回。
-   [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 转换成 `"undefined"`。
-   [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 转换成 `"null"`。
-   `true` 转换成 `"true"`；`false` 转换成 `"false"`。
-   使用与 [`toString(10)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) 相同的算法转换数字。
-   使用与 [`toString(10)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt/toString) 相同的算法转换 [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。
-   [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)。
-   对于对象，首先，通过依次调用其 [`[Symbol.toPrimitive]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)（hint 为 `"string"`）、`toString()` 和 `valueOf()` 方法将其[转换为原始值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Data_structures#%E5%BC%BA%E5%88%B6%E5%8E%9F%E5%A7%8B%E5%80%BC%E8%BD%AC%E6%8D%A2)。然后将生成的原始值转换为一个字符串。

有几种方法可以在 JavaScript 中实现几乎相同的效果。

-   [模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)：`` `${x}` `` 为嵌入的表达式执行上面的字符串强制转换步骤。
-   [`String()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/String) 函数：`String(x)` 使用相同的算法去转换 `x`，只是 [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 不会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)，而是返回 `"Symbol(description)"`，其中 `description` 是对 Symbol 的[描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/description)。
-   使用 [`+` 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Addition)：`"" + x` 将其操作数强制转为_原始值_，而不是_字符串_，并且对于某些对象，其行为与普通字符串强制转换完全不同。有关更多细节，请参见其[参考页](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Addition)。

根据你使用的情况，你可能想要使用 `` `${x}` ``（模拟内置行为）或 `String(x)`（处理 symbol 值而不抛出错误），但你不应该使用 `"" + x`。

### [UTF-16 字符、Unicode 码位和字素簇](#utf-16_字符、unicode_码位和字素簇)

字符串基本上表示为 [UTF-16 码元](https://zh.wikipedia.org/wiki/UTF-16 "外部链接（在新标签页中打开）")的序列。在 UTF-16 编码中，每个码元都是 16 位长。这意味着最多有 216 个或 65536 个可能的字符可表示为单个 UTF-16 码元。该字符集称为[基本多语言平面（BMP）](https://zh.wikipedia.org/wiki/Unicode字符平面映射 "外部链接（在新标签页中打开）")，包含最常见的字符，如拉丁字母、希腊字母、西里尔字母以及许多东亚字符。每个码元都可以用以 `\u` 开头的 4 个十六进制数字写在一个字符串中。

然而，整个 Unicode 字符集比 65536 大得多。额外的字符以_代理对_（surrogate pair）的形式存储在 UTF-16 中，代理对是一对 16 位码元，表示一个单个字符。为了避免歧义，配对的两个部分必须介于 `0xD800` 和 `0xDFFF` 之间，并且这些码元不用于编码单码元字符。（更准确地说，前导代理，也称为高位代理，其值在 `0xD800` 和 `0xDBFF` 之间（含），而后尾代理，也称为低位代理，其值在 `0xDC00` 和 `0xDFFF` 之间（含）。）每个 Unicode 字符由一个或者两个 UTF-16 码元组成，也称为 _Unicode 码位_（code point）。每个 Unicode 码位都可以使用 `\u{xxxxxx}` 写成一个字符串，其中 `xxxxxx` 表示 1–6 个十六进制数字。

“单独代理项（lone surrogate）”是指满足以下描述之一的 16 位码元：

-   它在范围 `0xD800` 到 `0xDBFF` 内（含）（即为前导代理），但它是字符串中的最后一个码元，或者下一个码元不是后尾代理。
-   它在范围 `0xDC00` 到 `0xDFFF` 内（含）（即为后尾代理），但它是字符串中的第一个码元，或者前一个码元不是前导代理。

单独代理项不代表任何 Unicode 字符。尽管大多数 JavaScript 内置方法都可以正确处理它们，因为它们都是基于 UTF-16 码元工作的，但是在与其他系统交互时，单独代理项通常不是有效的值。例如，`encodeURI()` 会为单独代理项抛出 [`URIError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/URIError)，因为 URI 编码使用 UTF-8 编码，而 UTF-8 没有任何编码单独代理项的方法。不包含任何单独代理项的字符串称为_规范的_字符串，并且可以安全地与不处理 UTF-16 的函数一起使用，例如 `encodeURI()` 或 [`TextEncoder`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextEncoder) 。你可以使用 [`isWellFormed()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/isWellFormed) 方法检查字符串是否规范，或使用 [`toWellFormed()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toWellFormed) 方法清除单独代理项。

除了 Unicode 字符之外，还有某些 Unicode 字符序列应视为一个视觉单元，被称为_字素簇_（grapheme cluster）。最常见的情况是 emoji：许多具有多种变体的 emoji 实际上是由多个 emoji 组成的，通常由 <ZWJ>（`U+200D`）字符连接。

你必须小心迭代字符级别。例如，[`split("")`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split) 将按照 UTF-16 码元分割并将代理对分开。字符串索引也是指的每个 UTF-16 码元的索引。另一方面，[`[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Symbol.iterator) 按 Unicode 码位迭代。遍历字素簇将需要一些自定义代码。

js

```
"😄".split(""); // ['\ud83d', '\ude04']; splits into two lone surrogates

// "Backhand Index Pointing Right: Dark Skin Tone"
[..."👉🏿"]; // ['👉', '🏿']
// splits into the basic "Backhand Index Pointing Right" emoji and
// the "Dark skin tone" emoji

// "Family: Man, Boy"
[..."👨‍👦"]; // [ '👨', '‍', '👦' ]
// splits into the "Man" and "Boy" emoji, joined by a ZWJ

// The United Nations flag
[..."🇺🇳"]; // [ '🇺', '🇳' ]
// splits into two "region indicator" letters "U" and "N".
// All flag emojis are formed by joining two region indicator letters
```

## [构造函数](#构造函数)

[`String()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/String)

创建一个新的 `String` 对象。它在作为函数调用时执行类型转换，而不是作为构造函数调用，后者通常更有用。

## [静态方法](#静态方法)

[`String.fromCharCode()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)

返回使用指定的 Unicode 值序列创建的字符串。

[`String.fromCodePoint()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint)

返回使用指定的码位序列创建的字符串。

[`String.raw()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/raw)

返回从原始模板字符串创建的字符串。

## [实例属性](#实例属性)

这些属性在 `String.prototype` 上定义，由所有 `String` 实例共享。

[`String.prototype.constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

创建实例对象的构造函数。对于 `String` 实例，初始值是 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/String) 构造函数。

这些属性是每个 `String` 实例的自有属性。

[`String.prototype.length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length)

反映字符串的 `length`。只读。

## [实例方法](#实例方法)

[`String.prototype.at()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/at)

返回指定索引处的字符（正好是一个 UTF-16 码元）。接受负整数，从最后一个字符串字符开始倒数。

[`String.prototype.charAt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)

返回指定 `index` 处的字符（正好是一个 UTF-16 码元）。

[`String.prototype.charCodeAt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)

返回一个数字，它是给定 `index` 处的 UTF-16 码元值。

[`String.prototype.codePointAt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt)

返回一个非负整数值，它是从指定位置（`pos`）开始的 UTF-16 编码码位的码位值。

[`String.prototype.concat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/concat)

合并两个（或更多）字符串的文本并返回一个新字符串。

[`String.prototype.endsWith()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)

确定字符串是否以字符串 `searchString` 的字符结尾。

[`String.prototype.includes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes)

确定调用字符串是否包含 `searchString`。

[`String.prototype.indexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)

返回在调用 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象中第一次出现的 `searchValue` 的索引，如果未找到则返回 `-1`。

[`String.prototype.isWellFormed()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/isWellFormed)

返回一个布尔值，指示此字符串是否包含任何[单独代理项](#utf-16_字符、unicode_码位和字素簇)。

[`String.prototype.lastIndexOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf)

返回在调用 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 对象中最后一次出现的 `searchValue` 的索引，如果未找到则返回 `-1`。

[`String.prototype.localeCompare()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare)

返回一个数字，用于指示一个参考字符串 `compareString` 是否在排序顺序前面或之后或与给定字符串相同。

[`String.prototype.match()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)

用于将正则表达式 `regexp` 与字符串匹配。

[`String.prototype.matchAll()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll)

返回所有 `regexp` 的匹配项的迭代器。

[`String.prototype.normalize()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)

返回调用字符串值的 Unicode 规范化形式。

[`String.prototype.padEnd()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)

用给定字符串从末尾填充当前字符串并返回长度为 `targetLength` 的新字符串。

[`String.prototype.padStart()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

用给定字符串从开头填充当前字符串并返回长度为 `targetLength` 的新字符串。

[`String.prototype.repeat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)

返回由对象的元素重复 `count` 次组成的字符串。

[`String.prototype.replace()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

用于使用 `replaceWith` 替换出现的 `searchFor`。`searchFor` 可以是字符串或正则表达式，`replaceWith` 可以是字符串或函数。

[`String.prototype.replaceAll()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)

用于使用 `replaceWith` 替换所有出现的 `searchFor`。`searchFor` 可以是字符串或正则表达式，`replaceWith` 可以是字符串或函数。

[`String.prototype.search()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/search)

搜索正则表达式 `regexp` 和调用字符串之间的匹配项。

[`String.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice)

提取字符串的一部分并返回一个新字符串。

[`String.prototype.split()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)

返回一个由在出现子字符串 `sep` 时拆分调用的字符串然后填充的字符串数组。

[`String.prototype.startsWith()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)

确定调用字符串是否以字符串 `searchString` 的字符开头。

[`String.prototype.substring()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring)

返回一个新字符串，其中包含来自（或之间）指定索引（或多个索引）的调用字符串的字符。

[`String.prototype.toLocaleLowerCase()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase)

字符串中的字符将转换为小写，同时尊重当前语言环境。

对于大多数语言，这将返回与 [`toLowerCase()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) 相同的结果。

[`String.prototype.toLocaleUpperCase( [locale, ...locales])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase)

字符串中的字符将转换为大写，同时尊重当前语言环境。

对于大多数语言，这将返回与 [`toUpperCase()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) 相同的结果。

[`String.prototype.toLowerCase()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)

返回转换为小写的调用字符串值。

[`String.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toString)

返回表示指定对象的字符串。重写 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法。

[`String.prototype.toUpperCase()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)

返回转换为大写的调用字符串值。

[`String.prototype.toWellFormed()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toWellFormed)

返回一个字符串，其中包含的所有[单独代理项](##utf-16_字符、unicode_码位和字素簇)都替换为 Unicode 替换字符 U+FFFD。

[`String.prototype.trim()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trim)

修剪字符串开头和结尾的空格。

[`String.prototype.trimEnd()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd)

修剪字符串结尾的空格。

[`String.prototype.trimStart()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart)

修剪字符串开头的空格。

[`String.prototype.valueOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/valueOf)

返回指定对象的原始值。重写 [`Object.prototype.valueOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) 方法。

[`String.prototype[Symbol.iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Symbol.iterator)

返回一个新的迭代器对象，该对象迭代 String 值的码位，将每个码位作为 String 值返回。

## [HTML 包装器方法](#html_包装器方法)

[`String.prototype.anchor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/anchor)

[`<a name="name">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a#name)（超文本目标）

[`String.prototype.big()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/big)

[`<big>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/big)

[`String.prototype.blink()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/blink)

`<blink>`

[`String.prototype.bold()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/bold)

[`<b>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/b)

[`String.prototype.fixed()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fixed)

[`<tt>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/tt)

[`String.prototype.fontcolor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fontcolor)

[`<font color="color">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/font#color)

[`String.prototype.fontsize()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fontsize)

[`<font size="size">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/font#size)

[`String.prototype.italics()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/italics)

[`<i>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/i)

[`String.prototype.link()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/link)

[`<a href="url">`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/a#href)（链接 URL）

[`String.prototype.small()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/small)

[`<small>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/small)

[`String.prototype.strike()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/strike)

[`<strike>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/strike)

[`String.prototype.sub()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/sub)

[`<sub>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/sub)

[`String.prototype.sup()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/sup)

[`<sup>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/sup)

请注意，这些方法不会检查字符串本身是否包含 HTML 标记，因此可能会创建无效的 HTML：

js

```
"</b>".bold(); // <b></b></b>
```

它们所做的唯一转义是将属性值中的 `"`（例如 [`anchor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/anchor)、[`fontcolor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fontcolor)、[`fontsize()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fontsize) 和 [`link()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/link)）替换为 `&quot;`。

js

```
"foo".anchor('"Hello"'); // <a name="&quot;Hello&quot;">foo</a>
```

## [示例](#示例)

### [字符串转换](#字符串转换)

可以使用 `String` 作为 [`toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toString) 更可靠的代替方法，因为它在用于 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 和 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 时仍然有效。例如：

js

```
const nullVar = null;
nullVar.toString(); // TypeError: nullVar is null
String(nullVar); // "null"

const undefinedVar = undefined;
undefinedVar.toString(); // TypeError: undefinedVar is undefined
String(undefinedVar); // "undefined"
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-string-objects](https://tc39.es/ecma262/multipage/text-processing.html#sec-string-objects) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [数字与字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Numbers_and_strings)指南
-   [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年5月26日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/contributors.txt)更新。
