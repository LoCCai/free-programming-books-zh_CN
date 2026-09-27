基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`Math`** 命名空间对象包含用于数学常量和函数的静态属性与方法。

`Math` 用于 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 类型。它不支持 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。

## [描述](#描述)

与其他全局对象不同的是，`Math` 不是构造函数，不可以与 [`new` 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)一起使用，也不可以将 `Math` 对象作为函数调用。`Math` 的所有属性与方法都是静态的。

**备注：**`Math` 的许多函数的精度是_取决于具体实现的_。

这意味着不同浏览器可能会给出不同的结果。即使是同一款 JavaScript 引擎，在不同的操作系统或架构上运行时，也可能产生不同的结果！

## [静态属性](#静态属性)

[`Math.E`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/E)

欧拉数，即自然对数的底数，约等于 `2.718`。

[`Math.LN10`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/LN10)

`10` 的自然对数，约等于 `2.303`。

[`Math.LN2`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/LN2)

`2` 的自然对数，约等于 `0.693`。

[`Math.LOG10E`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/LOG10E)

以 10 为底的 `E` 的对数，约等于 `0.434`。

[`Math.LOG2E`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/LOG2E)

以 2 为底的 `E` 的对数，约等于 `1.443`。

[`Math.PI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/PI)

一个圆的周长和直径之比，约等于 `3.14159`。

[`Math.SQRT1_2`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT1_2)

½（二分之一）的平方根，约等于 `0.707`。

[`Math.SQRT2`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/SQRT2)

`2` 的平方根，约等于 `1.414`。

[`Math[Symbol.toStringTag]`](#mathsymbol.tostringtag)

[`[Symbol.toStringTag]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性的初始值为字符串 `"Math"`。该属性使用于 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)。

## [静态方法](#静态方法)

[`Math.abs()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)

返回一个数的绝对值。

[`Math.acos()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/acos)

返回一个数的反余弦值。

[`Math.acosh()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh)

返回一个数的反双曲余弦值。

[`Math.asin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/asin)

返回一个数的反正弦值。

[`Math.asinh()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh)

返回一个数的反双曲正弦值。

[`Math.atan()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/atan)

返回一个数的反正切值。

[`Math.atan2()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2)

返回其两个参数之商的反正切值。

[`Math.atanh()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh)

返回一个数的反双曲正切值。

[`Math.cbrt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt)

返回一个数的立方根。

[`Math.ceil()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)

返回大于等于一个数的最小整数。

[`Math.clz32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32)

返回一个 32 位整数的前导零的数量。

[`Math.cos()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/cos)

返回一个数的余弦值。

[`Math.cosh()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh)

返回一个数的双曲余弦值。

[`Math.exp()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/exp)

返回 ex，其中 `x` 为参数，`e` 是欧拉常数（`2.718`...，自然对数的底数）。

[`Math.expm1()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1)

返回 `exp(x) - 1` 的值。

[`Math.floor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)

返回小于等于一个数的最大整数。

[`Math.f16round()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/f16round)

返回最接近一个数的[半精度浮点型](https://zh.wikipedia.org/wiki/半精度浮点数 "外部链接（在新标签页中打开）")表示。

[`Math.fround()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/fround)

返回最接近一个数的[单精度浮点型](https://zh.wikipedia.org/wiki/單精度浮點數 "外部链接（在新标签页中打开）")表示。

[`Math.hypot()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot)

返回其所有参数平方和的平方根。

[`Math.imul()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/imul)

返回 32 位整数乘法的结果。

[`Math.log()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log)

返回一个数的自然对数（㏒e，即 ㏑）。

[`Math.log10()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log10)

返回一个数以 10 为底数的对数。

[`Math.log1p()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log1p)

返回 `1 + x` 的和的 `x` 的自然对数（㏒e，即 ㏑）。

[`Math.log2()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log2)}

返回一个数以 2 为底数的对数。

[`Math.max()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max)

返回零到多个数值中最大值。

[`Math.min()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/min)

返回零到多个数值中最小值。

[`Math.pow()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/pow)

返回 `x` 的 y 次幂（也就是 `x``y`）。

[`Math.random()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

返回一个 `0` 到 `1` 之间的伪随机数。

[`Math.round()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round)

返回四舍五入后的整数。

[`Math.sign()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sign)

返回一个数的符号，表示它是正数、负数还是 0。

[`Math.sin()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sin)

返回一个数的正弦值。

[`Math.sinh()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh)

返回一个数的双曲正弦值。

[`Math.sqrt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt)

返回一个数的平方根。

[`Math.sumPrecise()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sumPrecise)

返回传入的可迭代数字集合的和，同时避免中间结果出现浮点精度损失。

[`Math.tan()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/tan)

返回一个数的正切值。

[`Math.tanh()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh)

返回一个数的双曲正切值。

[`Math.trunc()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc)

返回一个数的整数部分，直接去除其小数点及之后的部分。

## [示例](#示例)

### [在角度与弧度之间转换](#在角度与弧度之间转换)

三角函数 `sin()`、`cos()`、`tan()`、`asin()`、`acos()`、`atan()` 和 `atan2()` 期望（并返回）以_弧度_为单位的角。

由于人们习惯以角度为单位进行思考，且某些函数（如 CSS 变换）可以接受角度为单位，因此准备一些用于在两种单位之间进行转换的函数是个好主意：

js

```
function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function radToDeg(rad) {
  return rad / (Math.PI / 180);
}
```

### [计算等边三角形的高](#计算等边三角形的高)

如果我们要计算等边三角形的高，且已知其边长为 100，我们可以使用公式：_邻边的长度乘以该角的正切等于对边的长度_。

![一个等边三角形，其中从对边顶点向该边作垂线，形成一个直角三角形，其三条边分别标注为“邻边”、“对边”和“斜边”。“邻边”与“斜边”之间的夹角为 60 度。](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trigonometry.png)

在 JavaScript 中，我们可以这样实现：

js

```
50 * Math.tan(degToRad(60));
```

我们使用 `degToRad()` 函数将 60 度转换为弧度，因为 [`Math.tan()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/tan) 期望输入值以弧度为单位。

### [返回两端之间的随机整数](#返回两端之间的随机整数)

可以使用 [`Math.random()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random) 和 [`Math.floor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) 组合实现：

js

```
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

random(1, 10);
```

## [规范](#规范)

| 规范 |
| --- |
| [ECMAScript® 2027 Language Specification  
\# sec-math-object](https://tc39.es/ecma262/multipage/numbers-and-dates.html#sec-math-object) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月2日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/contributors.txt)更新。
