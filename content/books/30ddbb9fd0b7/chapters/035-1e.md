* * *

本模块提供了一些适用于复数的数学函数。 本模块中的函数接受整数、浮点数或复数作为参数。 它们也接受任意具有 [`__complex__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__complex__ "object.__complex__") 或 [`__float__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__float__ "object.__float__") 方法的 Python 对象：这些方法分别用于将对象转换为复数或浮点数，然后再将函数应用于转换后的结果。

备注

对于涉及分支切割的函数，我们会有确定如何在切割本身上定义这些函数的问题。 根据 Kahan 的论文 "Branch cuts for complex elementary functions"，以及 C99 的附录 G 和之后的 C 标准，我们使用零符号来区别分支切割的一侧和另一侧：对于沿实轴（一部分）的分支切割我们要看虚部的符号，而对于沿虚轴的分支切割我们则要看实部的符号。

例如，[`cmath.sqrt()`](#cmath.sqrt "cmath.sqrt") 函数有一个沿着负实轴的支割线。 参数 `-2-0j` 会被当作位于支割线的 _下方_ 来处理，因而将给出一个负虚轴上的结果:

\>>> cmath.sqrt(\-2\-0j)
\-1.4142135623730951j

但是参数 `-2+0j` 则会被当作位于支割线的上方来处理:

\>>> cmath.sqrt(\-2+0j)
1.4142135623730951j

<table><tbody><tr><td colspan="2"><p><strong>针对极坐标的转换</strong></p></td></tr><tr><td><p><a href="#cmath.phase" title="cmath.phase"><code><span>phase(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的相位</p></td></tr><tr><td><p><a href="#cmath.polar" title="cmath.polar"><code><span>polar(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的极坐标表示形式</p></td></tr><tr><td><p><a href="#cmath.rect" title="cmath.rect"><code><span>rect(r,</span> <span>phi)</span></code></a></p></td><td><p>返回具有极坐标 <em>r</em> 和 <em>phi</em> 的复数 <em>z</em></p></td></tr><tr><td colspan="2"><p><strong>幂函数与对数函数</strong></p></td></tr><tr><td><p><a href="#cmath.exp" title="cmath.exp"><code><span>exp(z)</span></code></a></p></td><td><p>返回 <em>e</em> 的 <em>z</em> 次幂</p></td></tr><tr><td><p><a href="#cmath.log" title="cmath.log"><code><span>log(z[,</span> <span>base])</span></code></a></p></td><td><p>返回 <em>z</em> 的指定底数 <em>base</em> (默认为 <em>e</em>) 的对数</p></td></tr><tr><td><p><a href="#cmath.log10" title="cmath.log10"><code><span>log10(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的以 10 为底的对数</p></td></tr><tr><td><p><a href="#cmath.sqrt" title="cmath.sqrt"><code><span>sqrt(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的平方根</p></td></tr><tr><td colspan="2"><p><strong>三角函数</strong></p></td></tr><tr><td><p><a href="#cmath.acos" title="cmath.acos"><code><span>acos(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的反余弦</p></td></tr><tr><td><p><a href="#cmath.asin" title="cmath.asin"><code><span>asin(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的反正弦</p></td></tr><tr><td><p><a href="#cmath.atan" title="cmath.atan"><code><span>atan(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的反正切</p></td></tr><tr><td><p><a href="#cmath.cos" title="cmath.cos"><code><span>cos(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的余弦</p></td></tr><tr><td><p><a href="#cmath.sin" title="cmath.sin"><code><span>sin(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的正弦</p></td></tr><tr><td><p><a href="#cmath.tan" title="cmath.tan"><code><span>tan(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的正切</p></td></tr><tr><td colspan="2"><p><strong>双曲函数</strong></p></td></tr><tr><td><p><a href="#cmath.acosh" title="cmath.acosh"><code><span>acosh(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的反双曲余弦</p></td></tr><tr><td><p><a href="#cmath.asinh" title="cmath.asinh"><code><span>asinh(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的反双曲正弦</p></td></tr><tr><td><p><a href="#cmath.atanh" title="cmath.atanh"><code><span>atanh(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的反双曲正切</p></td></tr><tr><td><p><a href="#cmath.cosh" title="cmath.cosh"><code><span>cosh(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的双曲余弦</p></td></tr><tr><td><p><a href="#cmath.sinh" title="cmath.sinh"><code><span>sinh(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的双曲正弦</p></td></tr><tr><td><p><a href="#cmath.tanh" title="cmath.tanh"><code><span>tanh(z)</span></code></a></p></td><td><p>返回 <em>z</em> 的双曲正切</p></td></tr><tr><td colspan="2"><p><strong>分类函数</strong></p></td></tr><tr><td><p><a href="#cmath.isfinite" title="cmath.isfinite"><code><span>isfinite(z)</span></code></a></p></td><td><p>检测是否 <em>z</em> 的所有部分均为有限值</p></td></tr><tr><td><p><a href="#cmath.isinf" title="cmath.isinf"><code><span>isinf(z)</span></code></a></p></td><td><p>检测 <em>z</em> 的任一部分是否为无穷大</p></td></tr><tr><td><p><a href="#cmath.isnan" title="cmath.isnan"><code><span>isnan(z)</span></code></a></p></td><td><p>检测 <em>z</em> 的任一部分是否为 NaN</p></td></tr><tr><td><p><a href="#cmath.isclose" title="cmath.isclose"><code><span>isclose(a,</span> <span>b,</span> <span>*,</span> <span>rel_tol,</span> <span>abs_tol)</span></code></a></p></td><td><p>检查 <em>a</em> 和 <em>b</em> 的值是否彼此接近</p></td></tr><tr><td colspan="2"><p><strong>常量</strong></p></td></tr><tr><td><p><a href="#cmath.pi" title="cmath.pi"><code><span>pi</span></code></a></p></td><td><p><em>π</em> = 3.141592...</p></td></tr><tr><td><p><a href="#cmath.e" title="cmath.e"><code><span>e</span></code></a></p></td><td><p><em>e</em> = 2.718281...</p></td></tr><tr><td><p><a href="#cmath.tau" title="cmath.tau"><code><span>tau</span></code></a></p></td><td><p><em>τ</em> = 2<em>π</em> = 6.283185...</p></td></tr><tr><td><p><a href="#cmath.inf" title="cmath.inf"><code><span>inf</span></code></a></p></td><td><p>正无穷</p></td></tr><tr><td><p><a href="#cmath.infj" title="cmath.infj"><code><span>infj</span></code></a></p></td><td><p>纯虚部无穷</p></td></tr><tr><td><p><a href="#cmath.nan" title="cmath.nan"><code><span>nan</span></code></a></p></td><td><p>"非数字" (NaN)</p></td></tr><tr><td><p><a href="#cmath.nanj" title="cmath.nanj"><code><span>nanj</span></code></a></p></td><td><p>纯虚部 NaN</p></td></tr></tbody></table>

## 到极坐标和从极坐标的转换[¶](#conversions-to-and-from-polar-coordinates "Link to this heading")

Python 复数 `z` 是使用 _直角_ 或 _笛卡尔_ 坐标在内部存储的。 它完全由其 _实部_ `z.real` 和 _虚部_ `z.imag` 来确定。

_极坐标_ 提供了另一种复数的表示方法。在极坐标中，一个复数 _z_ 由模量 _r_ 和相位角 _phi_ 来定义。模量 _r_ 是从 _z_ 到坐标原点的距离，而相位角 _phi_ 是以弧度为单位的，逆时针的，从正X轴到连接原点和 _z_ 的线段间夹角的角度。

下面的函数可用于原生直角坐标与极坐标的相互转换。

cmath.phase(_z_)[¶](#cmath.phase "Link to this definition")

将 _z_ 的相位 (或称 _z_ 的 _参数_) 作为一个浮点数返回。 `phase(z)` 等价于 `math.atan2(z.imag, z.real)`。 结果将位于 \[-_π_, _π_\] 范围内，且此操作的支割线将位于负实轴上。 结果的正负号将与 `z.imag` 的正负号相同，即使 `z.imag` 值为零:

\>>> phase(\-1+0j)
3.141592653589793
\>>> phase(\-1\-0j)
\-3.141592653589793

备注

一个复数 _z_ 的模（绝对值）可以使用内置的 [`abs()`](https://docs.python.org/zh-cn/3/builtins/functions.html#abs "abs") 函数来计算。 没有针对此操作的单独 `cmath` 模块函数。

cmath.polar(_z_)[¶](#cmath.polar "Link to this definition")

返回在极坐标中 _z_ 的表示形式。 返回一个数值对 `(r, phi)` 其中 _r_ 是 _z_ 的模数而 _phi_ 是 _z_ 的相位。 `polar(z)` 等价于 `(abs(z), phase(z))`。

cmath.rect(_r_, _phi_)[¶](#cmath.rect "Link to this definition")

返回具有极坐标 _r_ 和 _phi_ 的复数 _z_。 等价于 `complex(r * math.cos(phi), r * math.sin(phi))`。

## 幂函数与对数函数[¶](#power-and-logarithmic-functions "Link to this heading")

cmath.exp(_z_)[¶](#cmath.exp "Link to this definition")

返回 _e_ 的 _z_ 次方，其中 _e_ 是自然对数的底数。

cmath.log(_z_\[, _base_\])[¶](#cmath.log "Link to this definition")

返回 _z_ 的以给定的 _base_ 为底的对数。 如果没有指定 _base_，则返回 _z_ 的自然对数。 存在一条支割线，即沿着负实轴从 0 到 -∞。

cmath.log10(_z_)[¶](#cmath.log10 "Link to this definition")

返回 _z_ 的以 10 为底的对数。 它具有与 [`log()`](#cmath.log "cmath.log") 相同的支割线。

cmath.sqrt(_z_)[¶](#cmath.sqrt "Link to this definition")

返回 _z_ 的平方根。 它具有与 [`log()`](#cmath.log "cmath.log") 相同的支割线。

## 三角函数[¶](#trigonometric-functions "Link to this heading")

cmath.acos(_z_)[¶](#cmath.acos "Link to this definition")

返回 _z_ 的反余弦。 存在两条支割线：一条沿着实轴从 1 到 ∞。 另一条沿着实轴从 -1 向左延伸到 -∞。

cmath.asin(_z_)[¶](#cmath.asin "Link to this definition")

返回 _z_ 的反正弦。 它具有与 [`acos()`](#cmath.acos "cmath.acos") 相同的支割线。

cmath.atan(_z_)[¶](#cmath.atan "Link to this definition")

返回 _z_ 的反正切。 存在两条支割线：一条沿着虚轴从 `1j` 到 `∞j`。 另一条沿着虚轴从 `-1j` 延伸到 `-∞j`。

cmath.cos(_z_)[¶](#cmath.cos "Link to this definition")

返回 _z_ 的余弦。

cmath.sin(_z_)[¶](#cmath.sin "Link to this definition")

返回 _z_ 的正弦。

cmath.tan(_z_)[¶](#cmath.tan "Link to this definition")

返回 _z_ 的正切。

## 双曲函数[¶](#hyperbolic-functions "Link to this heading")

cmath.acosh(_z_)[¶](#cmath.acosh "Link to this definition")

返回 _z_ 的反双曲余弦。 存在一条支割线，沿着实轴从 1 向左延伸到 -∞。

cmath.asinh(_z_)[¶](#cmath.asinh "Link to this definition")

返回 _z_ 的反双曲正弦。 存在两条支割线：一条沿着虚轴从 `1j` 延伸到 `∞j`。 另一条沿着虚轴从 `-1j` 延伸到 `-∞j`。

cmath.atanh(_z_)[¶](#cmath.atanh "Link to this definition")

返回 _z_ 的反双曲正切。 存在两条支割线：一条沿着实轴从 `1` 延伸到 `∞`。 另一条沿着实轴从 `-1` 延伸到 `-∞`。

cmath.cosh(_z_)[¶](#cmath.cosh "Link to this definition")

返回 _z_ 的双曲余弦。

cmath.sinh(_z_)[¶](#cmath.sinh "Link to this definition")

返回 _z_ 的双曲正弦。

cmath.tanh(_z_)[¶](#cmath.tanh "Link to this definition")

返回 _z_ 的双曲正切。

## 分类函数[¶](#classification-functions "Link to this heading")

cmath.isfinite(_z_)[¶](#cmath.isfinite "Link to this definition")

如果 _z_ 的实部和虚部均为有限值则返回 `True`，否则返回 `False`。

Added in version 3.2.

cmath.isinf(_z_)[¶](#cmath.isinf "Link to this definition")

如果 _z_ 的实部或虚部为无穷大则返回 `True`，否则返回 `False`。

cmath.isnan(_z_)[¶](#cmath.isnan "Link to this definition")

如果 _z_ 的实部或虚部为 NaN 则返回 `True`，否则返回 `False`。

cmath.isclose(_a_, _b_, _\*_, _rel\_tol\=1e-09_, _abs\_tol\=0.0_)[¶](#cmath.isclose "Link to this definition")

若 _a_ 和 _b_ 的值比较接近则返回 `True`，否则返回 `False`。

两个值是否会被视为相近是根据给定的绝对和相对容差来确定的。 如果未发生错误，结果将为: `abs(a-b) <= max(rel_tol * max(abs(a), abs(b)), abs_tol)`。

_rel\_tol_ 是相对容差 -- 它是 _a_ 和 _b_ 之间的最大允许差值，相对于 _a_ 或 _b_ 中绝对值较大的一个而言。 例如，要设置 5% 的容差，则传入 `rel_tol=0.05`。 默认的容差为 `1e-09`，这将确保两个值在大约 9 个十进制数位内是相同的。 _rel\_tol_ 必须为非负值并且小于 `1.0`。

_abs\_tol_ 是绝对容差；其默认值为 `0.0` 并且必须为非负值。 当将 `x` 与 `0.0` 比较时，`isclose(x, 0)` 将按 `abs(x) <= rel_tol  * abs(x)` 来计算，对于 `x` 和小于 `1.0` 的 rel\_tol 来说均为 `False`。 因此请为该调用添一个为适当正值的 abs\_tol。

IEEE 754特殊值 `NaN` ， `inf` 和 `-inf` 将根据IEEE规则处理。具体来说， `NaN` 不被认为接近任何其他值，包括 `NaN` 。 `inf` 和 `-inf` 只被认为接近自己。

Added in version 3.5.

## 常量[¶](#constants "Link to this heading")

cmath.pi[¶](#cmath.pi "Link to this definition")

数学常数 _π_ ，作为一个浮点数。

cmath.e[¶](#cmath.e "Link to this definition")

数学常数 _e_ ，作为一个浮点数。

cmath.tau[¶](#cmath.tau "Link to this definition")

数学常数 _τ_ ，作为一个浮点数。

Added in version 3.6.

cmath.inf[¶](#cmath.inf "Link to this definition")

浮点正无穷大。相当于 `float('inf')`。

Added in version 3.6.

cmath.infj[¶](#cmath.infj "Link to this definition")

具有零实部和正无穷虚部的复数。相当于 `complex(0.0, float('inf'))`。

Added in version 3.6.

cmath.nan[¶](#cmath.nan "Link to this definition")

浮点 "非数字" (NaN) 值。 相当于 `float('nan')`。 另请参阅 [`math.nan`](https://docs.python.org/zh-cn/3/library/math.html#math.nan "math.nan")。

Added in version 3.6.

cmath.nanj[¶](#cmath.nanj "Link to this definition")

具有零实部和 NaN 虚部的复数。相当于 `complex(0.0, float('nan'))`。

Added in version 3.6.

请注意函数的选择与模块 [`math`](https://docs.python.org/zh-cn/3/library/math.html#module-math "math: Mathematical functions (sin() etc.).") 中的相似，但不完全相同。 设置两个模块的理由在于某些用户对复数不感兴趣，也许根本不知道它们是什么。 他们宁愿让 `math.sqrt(-1)` 引发异常而不是返回一个复数。 另请注意在 `cmath` 中定义的函数将始终返回复数，即使结果可以表示为实数（在这种情况下该复数的虚部为零）。

关于支割线的注释：它们是沿着给定函数无法连续的曲线。它们是许多复变函数的必要特征。 假设您需要使用复变函数进行计算，您将会了解支割线的概念。 请参阅几乎所有关于复变函数的（不太基本）的书来获得启发。 对于如何正确地基于数值目的来选择支割线的相关信息，一个良好的参考如下：

参见

Kahan, W: Branch cuts for complex elementary functions; or, Much ado about nothing's sign bit. In Iserles, A., and Powell, M. (eds.), The state of the art in numerical analysis. Clarendon Press (1987) pp165--211.
