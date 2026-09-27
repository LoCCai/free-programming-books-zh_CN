* * *

该模块提供了对通用数学函数和常量的访问，包括由 C 标准所定义的。

这些函数不适用于复数；如果你需要计算复数，请使用 [`cmath`](https://docs.python.org/zh-cn/3/library/cmath.html#module-cmath "cmath: Mathematical functions for complex numbers.") 模块中的同名函数。将支持计算复数的函数区分开的目的，在于大多数用户并不愿意为了理解复数而去学习太多数学知识。得到一个异常而不是一个复数结果能让复数当作参数的情况更早被监测到，进而程序员可以第一时间调查其产生的原因。

该模块提供了以下函数。除非另有明确说明，否则所有返回值均为浮点数。

<table><tbody><tr><td colspan="2"><p><strong>数论函数</strong></p></td></tr><tr><td><p><a href="#math.comb" title="math.comb"><code><span>comb(n,</span> <span>k)</span></code></a></p></td><td><p>不重复且无顺序地从 <em>n</em> 项中选择 <em>k</em> 项的方式总数</p></td></tr><tr><td><p><a href="#math.factorial" title="math.factorial"><code><span>factorial(n)</span></code></a></p></td><td><p><em>n</em> 的阶乘</p></td></tr><tr><td><p><a href="#math.gcd" title="math.gcd"><code><span>gcd(*integers)</span></code></a></p></td><td><p>整数参数的最大公约数</p></td></tr><tr><td><p><a href="#math.isqrt" title="math.isqrt"><code><span>isqrt(n)</span></code></a></p></td><td><p>非负整数 <em>n</em> 的整数平方根</p></td></tr><tr><td><p><a href="#math.lcm" title="math.lcm"><code><span>lcm(*integers)</span></code></a></p></td><td><p>整数参数的最小公倍数</p></td></tr><tr><td><p><a href="#math.perm" title="math.perm"><code><span>perm(n,</span> <span>k)</span></code></a></p></td><td><p>无重复且有顺序地从 <em>n</em> 项中选择 <em>k</em> 项的方式总数</p></td></tr><tr><td colspan="2"><p><strong>浮点算术</strong></p></td></tr><tr><td><p><a href="#math.ceil" title="math.ceil"><code><span>ceil(x)</span></code></a></p></td><td><p><em>x</em> 向上取整，即大于等于 <em>x</em> 的最小整数。</p></td></tr><tr><td><p><a href="#math.fabs" title="math.fabs"><code><span>fabs(x)</span></code></a></p></td><td><p><em>x</em> 的绝对值</p></td></tr><tr><td><p><a href="#math.floor" title="math.floor"><code><span>floor(x)</span></code></a></p></td><td><p><em>x</em> 向下取整，即小于等于 <em>x</em> 的最大整数。</p></td></tr><tr><td><p><a href="#math.fma" title="math.fma"><code><span>fma(x,</span> <span>y,</span> <span>z)</span></code></a></p></td><td><p>合并乘法加法运算: <code><span>(x</span> <span>*</span> <span>y)</span> <span>+</span> <span>z</span></code></p></td></tr><tr><td><p><a href="#math.fmod" title="math.fmod"><code><span>fmod(x,</span> <span>y)</span></code></a></p></td><td><p>除法运算 <code><span>x</span> <span>/</span> <span>y</span></code> 的余数</p></td></tr><tr><td><p><a href="#math.modf" title="math.modf"><code><span>modf(x)</span></code></a></p></td><td><p><em>x</em> 的小数和整数部分</p></td></tr><tr><td><p><a href="#math.remainder" title="math.remainder"><code><span>remainder(x,</span> <span>y)</span></code></a></p></td><td><p><em>x</em> 对于 <em>y</em> 的余数</p></td></tr><tr><td><p><a href="#math.trunc" title="math.trunc"><code><span>trunc(x)</span></code></a></p></td><td><p><em>x</em> 的整数部分</p></td></tr><tr><td colspan="2"><p><strong>浮点操作函数</strong></p></td></tr><tr><td><p><a href="#math.copysign" title="math.copysign"><code><span>copysign(x,</span> <span>y)</span></code></a></p></td><td><p>带有 <em>y</em> 的符号的 <em>x</em> 的绝对值</p></td></tr><tr><td><p><a href="#math.frexp" title="math.frexp"><code><span>frexp(x)</span></code></a></p></td><td><p><em>x</em> 的尾数和指数</p></td></tr><tr><td><p><a href="#math.isclose" title="math.isclose"><code><span>isclose(a,</span> <span>b,</span> <span>rel_tol,</span> <span>abs_tol)</span></code></a></p></td><td><p>检查 <em>a</em> 和 <em>b</em> 的值是否彼此接近</p></td></tr><tr><td><p><a href="#math.isfinite" title="math.isfinite"><code><span>isfinite(x)</span></code></a></p></td><td><p>检查 <em>x</em> 是否不为无穷大也不为 NaN</p></td></tr><tr><td><p><a href="#math.isinf" title="math.isinf"><code><span>isinf(x)</span></code></a></p></td><td><p>检查 <em>x</em> 是否为正或负无穷大</p></td></tr><tr><td><p><a href="#math.isnan" title="math.isnan"><code><span>isnan(x)</span></code></a></p></td><td><p>检查 <em>x</em> 是否为 NaN (非数字)</p></td></tr><tr><td><p><a href="#math.ldexp" title="math.ldexp"><code><span>ldexp(x,</span> <span>i)</span></code></a></p></td><td><p><code><span>x</span> <span>*</span> <span>(2**i)</span></code>，即函数 <a href="#math.frexp" title="math.frexp"><code><span>frexp()</span></code></a> 的反函数</p></td></tr><tr><td><p><a href="#math.nextafter" title="math.nextafter"><code><span>nextafter(x,</span> <span>y,</span> <span>steps)</span></code></a></p></td><td><p>从 <em>x</em> 朝向 <em>y</em> 的第 <em>steps</em> 步浮点值</p></td></tr><tr><td><p><a href="#math.ulp" title="math.ulp"><code><span>ulp(x)</span></code></a></p></td><td><p><em>x</em> 的最小有效比特位的值</p></td></tr><tr><td colspan="2"><p><strong>幂、指数和对数函数</strong></p></td></tr><tr><td><p><a href="#math.cbrt" title="math.cbrt"><code><span>cbrt(x)</span></code></a></p></td><td><p><em>x</em> 的立方根</p></td></tr><tr><td><p><a href="#math.exp" title="math.exp"><code><span>exp(x)</span></code></a></p></td><td><p><em>e</em> 的 <em>x</em> 次幂</p></td></tr><tr><td><p><a href="#math.exp2" title="math.exp2"><code><span>exp2(x)</span></code></a></p></td><td><p><em>2</em> 的 <em>x</em> 次幂</p></td></tr><tr><td><p><a href="#math.expm1" title="math.expm1"><code><span>expm1(x)</span></code></a></p></td><td><p><em>e</em> 的 <em>x</em> 次幂，减 1</p></td></tr><tr><td><p><a href="#math.log" title="math.log"><code><span>log(x,</span> <span>base)</span></code></a></p></td><td><p><em>x</em> 的指定底数 (默认为 <em>e</em>) 的对数</p></td></tr><tr><td><p><a href="#math.log1p" title="math.log1p"><code><span>log1p(x)</span></code></a></p></td><td><p><em>1+x</em> 的自然对数 (以 <em>e</em> 为底)</p></td></tr><tr><td><p><a href="#math.log2" title="math.log2"><code><span>log2(x)</span></code></a></p></td><td><p><em>x</em> 的以 2 为底的对数</p></td></tr><tr><td><p><a href="#math.log10" title="math.log10"><code><span>log10(x)</span></code></a></p></td><td><p><em>x</em> 的以 10 为底的对数</p></td></tr><tr><td><p><a href="#math.pow" title="math.pow"><code><span>pow(x,</span> <span>y)</span></code></a></p></td><td><p><em>x</em> 的 <em>y</em> 次幂</p></td></tr><tr><td><p><a href="#math.sqrt" title="math.sqrt"><code><span>sqrt(x)</span></code></a></p></td><td><p><em>x</em> 的平方根</p></td></tr><tr><td colspan="2"><p><strong>加总和乘积函数</strong></p></td></tr><tr><td><p><a href="#math.dist" title="math.dist"><code><span>dist(p,</span> <span>q)</span></code></a></p></td><td><p>以坐标的可迭代对象形式给出的 <em>p</em> 和 <em>q</em> 两点之间的欧几里得距离</p></td></tr><tr><td><p><a href="#math.fsum" title="math.fsum"><code><span>fsum(iterable)</span></code></a></p></td><td><p>输入的 <em>iterable</em> 值的总计</p></td></tr><tr><td><p><a href="#math.hypot" title="math.hypot"><code><span>hypot(*coordinates)</span></code></a></p></td><td><p>坐标的可迭代对象的欧几里得范数</p></td></tr><tr><td><p><a href="#math.prod" title="math.prod"><code><span>prod(iterable,</span> <span>start)</span></code></a></p></td><td><p>具有 <em>start</em> 值的输入 <em>iterable</em> 中元素的积</p></td></tr><tr><td><p><a href="#math.sumprod" title="math.sumprod"><code><span>sumprod(p,</span> <span>q)</span></code></a></p></td><td><p>来自两个可迭代对象 <em>p</em> 和 <em>q</em> 的值的乘积的总计值。</p></td></tr><tr><td colspan="2"><p><strong>角度转换</strong></p></td></tr><tr><td><p><a href="#math.degrees" title="math.degrees"><code><span>degrees(x)</span></code></a></p></td><td><p>将角度 <em>x</em> 从弧度转换为度数</p></td></tr><tr><td><p><a href="#math.radians" title="math.radians"><code><span>radians(x)</span></code></a></p></td><td><p>将角度 <em>x</em> 从度数转换为弧度</p></td></tr><tr><td colspan="2"><p><strong>三角函数</strong></p></td></tr><tr><td><p><a href="#math.acos" title="math.acos"><code><span>acos(x)</span></code></a></p></td><td><p><em>x</em> 的反余弦</p></td></tr><tr><td><p><a href="#math.asin" title="math.asin"><code><span>asin(x)</span></code></a></p></td><td><p><em>x</em> 的反正弦</p></td></tr><tr><td><p><a href="#math.atan" title="math.atan"><code><span>atan(x)</span></code></a></p></td><td><p><em>x</em> 的反正切</p></td></tr><tr><td><p><a href="#math.atan2" title="math.atan2"><code><span>atan2(y,</span> <span>x)</span></code></a></p></td><td><p><code><span>atan(y</span> <span>/</span> <span>x)</span></code></p></td></tr><tr><td><p><a href="#math.cos" title="math.cos"><code><span>cos(x)</span></code></a></p></td><td><p><em>x</em> 的余弦</p></td></tr><tr><td><p><a href="#math.sin" title="math.sin"><code><span>sin(x)</span></code></a></p></td><td><p><em>x</em> 的正弦</p></td></tr><tr><td><p><a href="#math.tan" title="math.tan"><code><span>tan(x)</span></code></a></p></td><td><p><em>x</em> 的正切</p></td></tr><tr><td colspan="2"><p><strong>双曲函数</strong></p></td></tr><tr><td><p><a href="#math.acosh" title="math.acosh"><code><span>acosh(x)</span></code></a></p></td><td><p><em>x</em> 的反双曲余弦</p></td></tr><tr><td><p><a href="#math.asinh" title="math.asinh"><code><span>asinh(x)</span></code></a></p></td><td><p><em>x</em> 的反双曲正弦</p></td></tr><tr><td><p><a href="#math.atanh" title="math.atanh"><code><span>atanh(x)</span></code></a></p></td><td><p><em>x</em> 的反双曲正切</p></td></tr><tr><td><p><a href="#math.cosh" title="math.cosh"><code><span>cosh(x)</span></code></a></p></td><td><p><em>x</em> 的双曲余弦</p></td></tr><tr><td><p><a href="#math.sinh" title="math.sinh"><code><span>sinh(x)</span></code></a></p></td><td><p><em>x</em> 的双曲正弦</p></td></tr><tr><td><p><a href="#math.tanh" title="math.tanh"><code><span>tanh(x)</span></code></a></p></td><td><p><em>x</em> 的双曲正切</p></td></tr><tr><td colspan="2"><p><strong>特殊函数</strong></p></td></tr><tr><td><p><a href="#math.erf" title="math.erf"><code><span>erf(x)</span></code></a></p></td><td><p>在 <em>x</em> 处的 <a href="https://en.wikipedia.org/wiki/Error_function">误差函数</a></p></td></tr><tr><td><p><a href="#math.erfc" title="math.erfc"><code><span>erfc(x)</span></code></a></p></td><td><p>在 <em>x</em> 处的 <a href="https://en.wikipedia.org/wiki/Error_function">互补误差函数</a></p></td></tr><tr><td><p><a href="#math.gamma" title="math.gamma"><code><span>gamma(x)</span></code></a></p></td><td><p>在 <em>x</em> 处的 <a href="https://en.wikipedia.org/wiki/Gamma_function">伽马函数</a></p></td></tr><tr><td><p><a href="#math.lgamma" title="math.lgamma"><code><span>lgamma(x)</span></code></a></p></td><td><p>在 <em>x</em> 处的 <a href="https://en.wikipedia.org/wiki/Gamma_function">伽马函数</a> 的绝对值的自然对数</p></td></tr><tr><td colspan="2"><p><strong>常量</strong></p></td></tr><tr><td><p><a href="#math.pi" title="math.pi"><code><span>pi</span></code></a></p></td><td><p><em>π</em> = 3.141592...</p></td></tr><tr><td><p><a href="#math.e" title="math.e"><code><span>e</span></code></a></p></td><td><p><em>e</em> = 2.718281...</p></td></tr><tr><td><p><a href="#math.tau" title="math.tau"><code><span>tau</span></code></a></p></td><td><p><em>τ</em> = 2<em>π</em> = 6.283185...</p></td></tr><tr><td><p><a href="#math.inf" title="math.inf"><code><span>inf</span></code></a></p></td><td><p>正无穷</p></td></tr><tr><td><p><a href="#math.nan" title="math.nan"><code><span>nan</span></code></a></p></td><td><p>"非数字" (NaN)</p></td></tr></tbody></table>

## 数论函数[¶](#number-theoretic-functions "Link to this heading")

math.comb(_n_, _k_)[¶](#math.comb "Link to this definition")

返回不重复且无顺序地从 _n_ 项中选择 _k_ 项的方式总数。

当 `k <= n` 时取值为 `n! / (k! * (n - k)!)`；当 `k > n` 时取值为零。

也称为二项式系数，因为它等价于 `(1 + x)ⁿ` 的多项式展开中第 k 项的系数。

如果任一参数不为整数则会引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。 如果任一参数为负数则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

Added in version 3.8.

math.factorial(_n_)[¶](#math.factorial "Link to this definition")

返回非负整数 _n_ 的阶乘。

在 3.10 版本发生变更: 具有整数值的浮点数 (如 `5.0`) 将不再被接受。

math.gcd(_\*integers_)[¶](#math.gcd "Link to this definition")

返回给定的整数参数的最大公约数。 如果有一个参数非零，则返回值将是能同时整除所有参数的最大正整数。 如果所有参数为零，则返回值为 `0`。 不带参数的 `gcd()` 返回 `0`。

Added in version 3.5.

在 3.9 版本发生变更: 添加了对任意数量的参数的支持。 之前的版本只支持两个参数。

math.isqrt(_n_)[¶](#math.isqrt "Link to this definition")

返回非负整数 _n_ 的整数平方根。 这就是对 _n_ 的实际平方根向下取整，或者相当于使得 _a_² ≤ _n_ 的最大整数 _a_。

对于某些应用来说，可以更适合取值为使得 _n_ ≤ _a_² 的最小整数 _a_ ，或者换句话说就是 _n_ 的实际平方根向上取整。 对于正数 _n_，这可以使用 `a = 1 + isqrt(n - 1)` 来计算。

Added in version 3.8.

math.lcm(_\*integers_)[¶](#math.lcm "Link to this definition")

返回给定的整数参数的最小公倍数。 如果所有参数均非零，则返回值将是为所有参数的整数倍的最小正整数。 如果参数之一为零，则返回值为 `0`。 不带参数的 `lcm()` 返回 `1`。

Added in version 3.9.

math.perm(_n_, _k\=None_)[¶](#math.perm "Link to this definition")

返回不重复且有顺序地从 _n_ 项中选择 _k_ 项的方式总数。

当 `k <= n` 时取值为 `n! / (n - k)!`；当 `k > n` 时取值为零。

如果 _k_ 未指定或为 `None`，则 _k_ 默认值为 _n_ 并且函数将返回 `n!`。

如果任一参数不为整数则会引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。 如果任一参数为负数则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

Added in version 3.8.

## 浮点算术[¶](#floating-point-arithmetic "Link to this heading")

math.ceil(_x_)[¶](#math.ceil "Link to this definition")

返回 _x_ 的向上取整，即大于或等于 _x_ 的最小的整数。如果 _x_ 不是浮点数，委托给 [`x.__ceil__`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__ceil__ "object.__ceil__") ，它应该返回一个 [`Integral`](https://docs.python.org/zh-cn/3/library/numbers.html#numbers.Integral "numbers.Integral") 的值。

math.fabs(_x_)[¶](#math.fabs "Link to this definition")

返回 _x_ 的绝对值。

math.floor(_x_)[¶](#math.floor "Link to this definition")

返回 _x_ 的向下取整，小于或等于 _x_ 的最大整数。如果 _x_ 不是浮点数，则委托给 [`x.__floor__`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__floor__ "object.__floor__") ，它应返回一个 [`Integral`](https://docs.python.org/zh-cn/3/library/numbers.html#numbers.Integral "numbers.Integral") 值。

math.fma(_x_, _y_, _z_)[¶](#math.fma "Link to this definition")

融合的乘法-加法运算。 返回 `(x * y) + z`，类似于使用无限精度和取值范围进行计算然后执行一次舍入到 `float` 格式。 此运算往往可提供比直接使用表达式 `(x * y) + z` 更高的精确度。

此函数遵循在 IEEE 754 标准中描述的 fusedMultiplyAdd 运算规范。 该标准将一种情况留为由实现定义，即 `fma(0, inf, nan)` 和 `fma(inf, 0, nan)` 的结果。 在这些情况中，`math.fma` 将返回 NaN，且不会引发任何异常。

Added in version 3.13.

math.fmod(_x_, _y_)[¶](#math.fmod "Link to this definition")

返回 `x / y` 的以浮点表示的余数，如平台的 C 库函数 `fmod(x, y)` 所定义的。 请注意 Python 表达式 `x % y` 可能不会返回相同的结果。 C 标准的目的是 `fmod(x, y)` 完全地（在数学概念中；精度无限）等于 `x - n*y` 对于整数 _n_ 使得结果具有与 _x_ 相同的正负号和小于 `abs(y)` 的量级。 Python 的 `x % y` 则返回与具有 _y_ 相同的正负号的结果，而对浮点参数来说可能不是完全可计算的。 例如，`fmod(-1e-100, 1e100)` 是 `-1e-100`，但 Python 的 `-1e-100 % 1e100` 则是 `1e100-1e-100`，它不能准确表示为一个浮点数，并会舍入为令人惊讶的 `1e100`。 出于这个原因，函数 [`fmod()`](#math.fmod "math.fmod") 在处理浮点数时通常都是首选，而 Python 的 `x % y` 则在处理整数时是首选。

math.modf(_x_)[¶](#math.modf "Link to this definition")

返回 _x_ 的小数和整数部分。两个结果都带有 _x_ 的符号并且是浮点数。

请注意 [`modf()`](#math.modf "math.modf") 具有与它的 C 对应物不同的调用/返回模式：它接受单个参数并返回一对值，而不是通过 '输出形参' 返回它的第二个返回值 (Python 中没有这个概念)。

math.remainder(_x_, _y_)[¶](#math.remainder "Link to this definition")

返回 IEEE 754 风格的 _x_ 相对于 _y_ 的余数。对于有限 _x_ 和有限非零 _y_ ，这是差异 `x - n*y` ，其中 `n` 是与商 `x / y` 的精确值最接近的整数。如果 `x / y` 恰好位于两个连续整数之间，则将最接近的 _偶数_ 用作 `n` 。 余数 `r = remainder(x, y)` 因此总是满足 `abs(r) <= 0.5 * abs(y)`。

特殊情况遵循 IEEE 754：特别是 `remainder(x, math.inf)` 对于任何有限 _x_ 都是 _x_，而 `remainder(x, 0)` 和 `remainder(math.inf, x)` 对于任何非 NaN 的 _x_ 会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。如果余数运算的结果为零，则该零将具有与 _x_ 相同的符号。

在使用IEEE 754二进制浮点的平台上，此操作的结果始终可以完全表示：不会引入舍入错误。

Added in version 3.7.

math.trunc(_x_)[¶](#math.trunc "Link to this definition")

返回去除小数部分的 _x_ ，只留下整数部分。 这会向 0 舍入： `trunc()` 对于正的 _x_ 相当于 [`floor()`](#math.floor "math.floor") ，对于负的 _x_ 相当于 [`ceil()`](#math.ceil "math.ceil") 。如果 _x_ 不是浮点数，委托给 [`x.__trunc__`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__trunc__ "object.__trunc__") ，它应该返回一个 [`Integral`](https://docs.python.org/zh-cn/3/library/numbers.html#numbers.Integral "numbers.Integral") 值。

对于 [`ceil()`](#math.ceil "math.ceil") ， [`floor()`](#math.floor "math.floor") 和 [`modf()`](#math.modf "math.modf") 函数，请注意 _所有_ 足够大的浮点数都是精确整数。Python 浮点数通常不超过53位的精度（与平台 C double 类型相同），在这种情况下，任何满足 `abs(x) >= 2**52` 的浮点数 _x_ 必然没有小数位。

## 浮点操作函数[¶](#floating-point-manipulation-functions "Link to this heading")

math.copysign(_x_, _y_)[¶](#math.copysign "Link to this definition")

返回一个基于 _x_ 的绝对值和 _y_ 的符号的浮点数。在支持带符号零的平台上，`copysign(1.0, -0.0)` 返回 _\-1.0_。

math.frexp(_x_)[¶](#math.frexp "Link to this definition")

Return the mantissa and exponent of _x_ as the pair `(m, e)`. If _x_ is a finite nonzero number, then _m_ is a float with `0.5 <= abs(m) < 1.0` and an integer _e_ is such that `x == m * 2**e` exactly. Else, return `(x, 0)`. This is used to "pick apart" the internal representation of a float in a portable way.

注意 [`frexp()`](#math.frexp "math.frexp") 具有与它的 C 对应物不同的调用/返回模式：它接受单个参数并返回一对值，而不是通过 '输出形参' 返回它的第二个返回值 (Python 中没有这个概念)。

math.isclose(_a_, _b_, _\*_, _rel\_tol\=1e-09_, _abs\_tol\=0.0_)[¶](#math.isclose "Link to this definition")

若 _a_ 和 _b_ 的值比较接近则返回 `True`，否则返回 `False`。

两个值是否会被视为相近是根据给定的绝对和相对可接受差异度来确定的。 如果未发生错误，结果将为: `abs(a-b) <= max(rel_tol * max(abs(a), abs(b)), abs_tol)`。

_rel\_tol_ 是相对容差 -- 它是 _a_ 和 _b_ 之间的最大允许差值，相对于 _a_ 或 _b_ 中绝对值较大的一个而言。 例如，要设置 5% 的容差，则传入 `rel_tol=0.05`。 默认的容差为 `1e-09`，这将确保两个值在大约 9 个十进制数位内是相同的。 _rel\_tol_ 必须为非负值并且小于 `1.0`。

_abs\_tol_ 是绝对容差；其默认值为 `0.0` 且必须为非负数。 当将 `x` 与 `0.0` 比较时，`isclose(x, 0)` 将按 `abs(x) <= rel_tol  * abs(x)` 来计算，对于任何非零的 `x` 和小于 `1.0` 的 _rel\_tol_ 来说均为 `False`。 因此请为该调用添加一个适当的正数 _abs\_tol_ 参数。

IEEE 754特殊值 `NaN` ， `inf` 和 `-inf` 将根据IEEE规则处理。具体来说， `NaN` 不被认为接近任何其他值，包括 `NaN` 。 `inf` 和 `-inf` 只被认为接近自己。

Added in version 3.5.

math.isfinite(_x_)[¶](#math.isfinite "Link to this definition")

如果 _x_ 既不是无穷大也不是NaN，则返回 `True` ，否则返回 `False` 。 （注意 `0.0` 被认为 _是_ 有限的。）

Added in version 3.2.

math.isinf(_x_)[¶](#math.isinf "Link to this definition")

如果 _x_ 是正或负无穷大，则返回 `True` ，否则返回 `False` 。

math.isnan(_x_)[¶](#math.isnan "Link to this definition")

如果 _x_ 是 NaN（不是数字），则返回 `True` ，否则返回 `False` 。

math.ldexp(_x_, _i_)[¶](#math.ldexp "Link to this definition")

返回 `x * (2**i)` 。 这基本上是函数 [`frexp()`](#math.frexp "math.frexp") 的反函数。

math.nextafter(_x_, _y_, _steps\=1_)[¶](#math.nextafter "Link to this definition")

返回从 _x_ 朝向 _y_ 的第 _steps_ 步浮点值。

如果 _x_ 等于 _y_，则返回 _y_，除非 _steps_ 值为零。

示例：

-   `math.nextafter(x, math.inf)` 的方向朝上：趋向于正无穷。
    
-   `math.nextafter(x, -math.inf)` 的方向朝下：趋向于负无穷。
    
-   `math.nextafter(x, 0.0)` 趋向于零。
    
-   `math.nextafter(x, math.copysign(math.inf, x))` 趋向于零的反方向。
    

另请参阅 [`math.ulp()`](#math.ulp "math.ulp")。

Added in version 3.9.

在 3.12 版本发生变更: 增加了 _steps_ 参数。

math.ulp(_x_)[¶](#math.ulp "Link to this definition")

返回浮点数 _x_ 的最小有效比特位的值:

-   如果 _x_ 是 NaN (非数字)，则返回 _x_。
    
-   如果 _x_ 为负数，则返回 `ulp(-x)`。
    
-   如果 _x_ 为正无穷，则返回 _x_。
    
-   如果 _x_ 等于零，则返回 _去正规化的_ 可表示最小正浮点数 (小于 _正规化的_ 最小正浮点数 [`sys.float_info.min`](https://docs.python.org/zh-cn/3/library/sys.html#sys.float_info "sys.float_info"))。
    
-   如果 _x_ 等于可表示最大正浮点数，则返回 _x_ 的最低有效比特位的值，使得小于 _x_ 的第一个浮点数为 `x - ulp(x)`。
    
-   在其他情况下 (_x_ 是一个有限的正数)，则返回 _x_ 的最低有效比特位的值，使得大于 _x_ 的第一个浮点数为 `x + ulp(x)`。
    

ULP 即 "Unit in the Last Place" 的缩写。

另请参阅 [`math.nextafter()`](#math.nextafter "math.nextafter") 和 [`sys.float_info.epsilon`](https://docs.python.org/zh-cn/3/library/sys.html#sys.float_info "sys.float_info")。

Added in version 3.9.

## 幂、指数和对数函数[¶](#power-exponential-and-logarithmic-functions "Link to this heading")

math.cbrt(_x_)[¶](#math.cbrt "Link to this definition")

返回 _x_ 的立方根。

Added in version 3.11.

math.exp(_x_)[¶](#math.exp "Link to this definition")

返回 _e_ 的 _x_ 次幂，其中 _e_ = 2.718281... 是自然对数的基数。这通常比 `math.e ** x` 或 `pow(math.e, x)` 更精确。

math.exp2(_x_)[¶](#math.exp2 "Link to this definition")

返回 _2_ 的 _x_ 次幂。

Added in version 3.11.

math.expm1(_x_)[¶](#math.expm1 "Link to this definition")

返回 _e_ 的 _x_ 次方减 1。 这里 _e_ 是自然对数的底。 对于小浮点数 _x_，在 `exp(x) - 1` 中的减法运算可能导致 [明显的精度损失](https://en.wikipedia.org/wiki/Loss_of_significance)； [`expm1()`](#math.expm1 "math.expm1") 函数提供了一种以完整精度计算此数量的办法：

\>>> from math import exp, expm1
\>>> exp(1e-5) \- 1  \# gives result accurate to 11 places
1.0000050000069649e-05
\>>> expm1(1e-5)    \# result accurate to full precision
1.0000050000166668e-05

Added in version 3.2.

math.log(_x_\[, _base_\])[¶](#math.log "Link to this definition")

使用一个参数，返回 _x_ 的自然对数（底为 _e_ ）。

使用两个参数，返回以给定的 _base_ 为底的 _x_ 的对数，计算为 `log(x)/log(base)`。

math.log1p(_x_)[¶](#math.log1p "Link to this definition")

返回 _1+x_ 的自然对数（以 _e_ 为底）。 以对于接近零的 _x_ 精确的方式计算结果。

math.log2(_x_)[¶](#math.log2 "Link to this definition")

返回 _x_ 以2为底的对数。这通常比 `log(x, 2)` 更准确。

Added in version 3.3.

math.log10(_x_)[¶](#math.log10 "Link to this definition")

返回 _x_ 以 10 为底的对数。这通常比 `log(x, 10)` 更准确。

math.pow(_x_, _y_)[¶](#math.pow "Link to this definition")

返回 _x_ 的 _y_ 次幂。 特殊情况将尽可能遵循 IEEE 754 标准。 具体来说，`pow(1.0, x)` 和 `pow(x, 0.0)` 总是返回 `1.0`，即使当 _x_ 为零或 NaN 时也是如此。 如果 _x_ 和 _y_ 均为有限值，_x_ 是负数，而 _y_ 不是整数则 `pow(x, y)` 将是未定义的，并会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

与内置的 `**` 运算符不同， [`math.pow()`](#math.pow "math.pow") 将其参数转换为 [`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float") 类型。使用 `**` 或内置的 [`pow()`](https://docs.python.org/zh-cn/3/builtins/functions.html#pow "pow") 函数来计算精确的整数幂。

在 3.11 版本发生变更: 特殊情况 `pow(0.0, -inf)` 和 `pow(-0.0, -inf)` 已改为返回 `inf` 而不是引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")，以便同 IEEE 754 保持一致。

math.sqrt(_x_)[¶](#math.sqrt "Link to this definition")

返回 _x_ 的平方根。

## 加总和乘积函数[¶](#summation-and-product-functions "Link to this heading")

math.dist(_p_, _q_)[¶](#math.dist "Link to this definition")

返回 _p_ 与 _q_ 两点之间的欧几里得距离，以一个坐标序列（或可迭代对象）的形式给出。 两个点必须具有相同的维度。

大致相当于:

sqrt(sum((px \- qx) \*\* 2.0 for px, qx in zip(p, q)))

Added in version 3.8.

math.fsum(_iterable_)[¶](#math.fsum "Link to this definition")

返回可迭代对象中的值的精确浮点总计值。 通过跟踪多个中间部分和来避免精度损失。

该算法的准确性取决于 IEEE-754 算术保证和舍入模式为半偶的典型情况。在某些非 Windows 构建中，底层 C 库使用扩展精度加法，偶尔可能会对中间部分和进行双重舍入，导致其最低有效位产生偏差。

有关进一步的讨论和两种替代方式，请参阅 [ASPN cookbook recipes for accurate floating-point summation](https://code.activestate.com/recipes/393090-binary-floating-point-summation-accurate-to-full-p/)。

math.hypot(_\*coordinates_)[¶](#math.hypot "Link to this definition")

返回欧几里得范数，`sqrt(sum(x**2 for x in coordinates))`。 这是从原点到坐标给定点的向量长度。

对于一个二维点 `(x, y)`，这等价于使用毕达哥拉斯定理 `sqrt(x*x + y*y)` 计算一个直角三角形的斜边。

在 3.8 版本发生变更: 添加了对 n 维点的支持。 之前的版本只支持二维点。

在 3.10 版本发生变更: 改进了算法的精确性，使得最大误差在 1 ulp (最后一位的单位数值) 以下。 更为常见的情况是，结果几乎总是能正确地舍入到 1/2 ulp 范围之内。

math.prod(_iterable_, _\*_, _start\=1_)[¶](#math.prod "Link to this definition")

计算输入的 _iterable_ 中所有元素的积。 积的默认 _start_ 值为 `1`。

当可迭代对象为空时，返回起始值。 此函数特别针对数字值使用，并会拒绝非数字类型。

Added in version 3.8.

math.sumprod(_p_, _q_)[¶](#math.sumprod "Link to this definition")

返回两个可迭代对象 _p_ 和 _q_ 中的值的乘积的总计值。

如果输入值的长度不相等则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

大致相当于:

sum(map(operator.mul, p, q, strict\=True))

对于浮点数或混合整数/浮点数的输入，中间的乘积和总计值将使用扩展精度来计算。

Added in version 3.12.

## 角度转换[¶](#angular-conversion "Link to this heading")

math.degrees(_x_)[¶](#math.degrees "Link to this definition")

将角度 _x_ 从弧度转换为度数。

math.radians(_x_)[¶](#math.radians "Link to this definition")

将角度 _x_ 从度数转换为弧度。

## 三角函数[¶](#trigonometric-functions "Link to this heading")

math.acos(_x_)[¶](#math.acos "Link to this definition")

返回以弧度为单位的 _x_ 的反余弦值。 结果范围在 `0` 到 `pi` 之间。

math.asin(_x_)[¶](#math.asin "Link to this definition")

返回以弧度为单位的 _x_ 的反正弦值。 结果范围在 `-pi/2` 到 `pi/2` 之间。

math.atan(_x_)[¶](#math.atan "Link to this definition")

返回以弧度为单位的 _x_ 的反正切值。 结果范围在 `-pi/2` 到 `pi/2` 之间。

math.atan2(_y_, _x_)[¶](#math.atan2 "Link to this definition")

以弧度为单位返回 `atan(y / x)`。结果范围在 `-pi` 到 `pi` 之间。从原点到点 `(x, y)` 的平面向量与正 X 轴形成此角度。 [`atan2()`](#math.atan2 "math.atan2") 的要点在于它已知两个输入的符号，因此它可以计算角度的正确象限。 例如， `atan(1)` 和 `atan2(1, 1)` 都是 `pi/4`，但 `atan2(-1, -1)` 是 `-3*pi/4`。

math.cos(_x_)[¶](#math.cos "Link to this definition")

返回 _x_ 弧度的余弦值。

math.sin(_x_)[¶](#math.sin "Link to this definition")

返回 _x_ 弧度的正弦值。

math.tan(_x_)[¶](#math.tan "Link to this definition")

返回 _x_ 弧度的正切值。

## 双曲函数[¶](#hyperbolic-functions "Link to this heading")

[双曲函数](https://en.wikipedia.org/wiki/Hyperbolic_functions) 是基于双曲线而非圆来对三角函数进行的模拟。

math.acosh(_x_)[¶](#math.acosh "Link to this definition")

返回 _x_ 的反双曲余弦值。

math.asinh(_x_)[¶](#math.asinh "Link to this definition")

返回 _x_ 的反双曲正弦值。

math.atanh(_x_)[¶](#math.atanh "Link to this definition")

返回 _x_ 的反双曲正切值。

math.cosh(_x_)[¶](#math.cosh "Link to this definition")

返回 _x_ 的双曲余弦值。

math.sinh(_x_)[¶](#math.sinh "Link to this definition")

返回 _x_ 的双曲正弦值。

math.tanh(_x_)[¶](#math.tanh "Link to this definition")

返回 _x_ 的双曲正切值。

## 特殊函数[¶](#special-functions "Link to this heading")

math.erf(_x_)[¶](#math.erf "Link to this definition")

返回 _x_ 处的 [误差函数](https://en.wikipedia.org/wiki/Error_function) 。

可以使用 [`erf()`](#math.erf "math.erf") 函数来计算传统的统计函数如 [累积标准正态分布](https://en.wikipedia.org/wiki/Cumulative_distribution_function):

def phi(x):
    '标准正态分布的累积分布函数'
    return (1.0 + erf(x / sqrt(2.0))) / 2.0

Added in version 3.2.

math.erfc(_x_)[¶](#math.erfc "Link to this definition")

返回 _x_ 处的互补误差函数。 [互补误差函数](https://en.wikipedia.org/wiki/Error_function) 定义为 `1.0 - erf(x)`。 它用于大的 _x_ 取值，以避免直接用 1 减其误差函数值导致的 [有效位数损失](https://en.wikipedia.org/wiki/Loss_of_significance)。

Added in version 3.2.

math.gamma(_x_)[¶](#math.gamma "Link to this definition")

返回 _x_ 处的 [伽马函数](https://en.wikipedia.org/wiki/Gamma_function) 值。

Added in version 3.2.

math.lgamma(_x_)[¶](#math.lgamma "Link to this definition")

返回 _x_ 处的 Gamma 函数绝对值的自然对数。

Added in version 3.2.

## 常量[¶](#constants "Link to this heading")

math.pi[¶](#math.pi "Link to this definition")

数学常数 _π_ = 3.141592...，精确到可用精度。

math.e[¶](#math.e "Link to this definition")

数学常数 _e_ = 2.718281...，精确到可用精度。

math.tau[¶](#math.tau "Link to this definition")

数学常数 _τ_ = 6.283185...，精确到可用精度。Tau 是一个圆周常数，等于 2_π_，圆的周长与半径之比。更多关于 Tau 的信息可参考 Vi Hart 的视频 [圆周率仍然是错误的](https://vimeo.com/147792667)。吃两倍多的派来庆祝 [Tau 日](https://tauday.com/) 吧！

Added in version 3.6.

math.inf[¶](#math.inf "Link to this definition")

浮点正无穷大。 （对于负无穷大，使用 `-math.inf` 。）相当于 `float('inf')` 的输出。

Added in version 3.5.

math.nan[¶](#math.nan "Link to this definition")

一个浮点数值 "Not a Number" (NaN)。 相当于 `float('nan')` 的输出。 根据 [IEEE-754 标准](https://en.wikipedia.org/wiki/IEEE_754) 要求，`math.nan` 和 `float('nan')` 不会被视为等于任何其他数值，包括其本身。 要检查一个数字是否为 NaN，请使用 [`isnan()`](#math.isnan "math.isnan") 函数来测试 NaN 而不能使用 `is` 或 `==`。 例如:

\>>> import math
\>>> math.nan \== math.nan
False
\>>> float('nan') \== float('nan')
False
\>>> math.isnan(math.nan)
True
\>>> math.isnan(float('nan'))
True

Added in version 3.5.

在 3.11 版本发生变更: 该常量现在总是可用。

`math` 模块主要由针对系统平台 C math 库函数的简单包装器组成。 特殊情况下的行为遵循 C99 标准附录 F 的规范做法。 当前实现对无效操作如 `sqrt(-1.0)` 或 `log(0.0)` (C99 附件 F 建议发出无效操作或除零错误信号) 会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")，而对溢出的结果 (例如 `exp(1000.0)`) 则会引发 [`OverflowError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OverflowError "OverflowError")。 不会从上述任何函数返回 NaN 除非有一个或多个输入参数为 NaN；在这种情况下，大部分函数将返回 NaN，但是（仍然遵循 C99 附录 F）这个规则有一些例外，例如 `pow(float('nan'), 0.0)` 或 `hypot(float('nan'), float('inf'))`。

请注意，Python 不会将信号 NaN 与静默 NaN 区分开来，并且信号 NaN 的行为仍未明确。典型的行为是将所有 NaN 视为静默的。
