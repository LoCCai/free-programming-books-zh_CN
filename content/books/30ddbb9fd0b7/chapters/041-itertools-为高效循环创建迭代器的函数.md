* * *

本模块实现一系列 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator)，这些迭代器受到 APL、Haskell 和 SML 的启发。为了适用于 Python，它们都被重新写过。

本模块标准化了一个快速、高效利用内存的核心工具集，这些工具本身或组合都很有用。它们一起形成了“迭代器代数”，这使得在纯 Python 中有可能创建简洁又高效的专用工具。

例如，SML 有一个制表工具 `tabulate(f)`，它可产生一个序列 `f(0), f(1), ...`。在 Python 中可以组合 [`map()`](https://docs.python.org/zh-cn/3/builtins/functions.html#map "map") 和 [`count()`](#itertools.count "itertools.count") 实现： `map(f, count())`。

**通用迭代器：**

| 
迭代器

 | 

实参

 | 

结果

 | 

示例

 |
| --- | --- | --- | --- |
| 

[`accumulate()`](#itertools.accumulate "itertools.accumulate")

 | 

p \[,func\]

 | 

p0, p0+p1, p0+p1+p2, ...

 | 

`accumulate([1,2,3,4,5]) → 1 3 6 10 15`

 |
| 

[`batched()`](#itertools.batched "itertools.batched")

 | 

p, n

 | 

(p0, p1, ..., p\_n-1), ...

 | 

`batched('ABCDEFG', n=3) → ABC DEF G`

 |
| 

[`chain()`](#itertools.chain "itertools.chain")

 | 

p, q, ...

 | 

p0, p1, ... plast, q0, q1, ...

 | 

`chain('ABC', 'DEF') → A B C D E F`

 |
| 

[`chain.from_iterable()`](#itertools.chain.from_iterable "itertools.chain.from_iterable")

 | 

iterable -- 可迭代对象

 | 

p0, p1, ... plast, q0, q1, ...

 | 

`chain.from_iterable(['ABC', 'DEF']) → A B C D E F`

 |
| 

[`compress()`](#itertools.compress "itertools.compress")

 | 

data, selectors

 | 

(d\[0\] if s\[0\]), (d\[1\] if s\[1\]), ...

 | 

`compress('ABCDEF', [1,0,1,0,1,1]) → A C E F`

 |
| 

[`count()`](#itertools.count "itertools.count")

 | 

\[start\[, step\]\]

 | 

start, start+step, start+2\*step, ...

 | 

`count(10) → 10 11 12 13 14 ...`

 |
| 

[`cycle()`](#itertools.cycle "itertools.cycle")

 | 

p

 | 

p0, p1, ... plast, p0, p1, ...

 | 

`cycle('ABCD') → A B C D A B C D ...`

 |
| 

[`dropwhile()`](#itertools.dropwhile "itertools.dropwhile")

 | 

predicate, seq

 | 

seq\[n\], seq\[n+1\], 从 predicate 未通过时开始

 | 

`dropwhile(lambda x: x<5, [1,4,6,3,8]) → 6 3 8`

 |
| 

[`filterfalse()`](#itertools.filterfalse "itertools.filterfalse")

 | 

predicate, seq

 | 

predicate(elem) 未通过的 seq 元素

 | 

`filterfalse(lambda x: x<5, [1,4,6,3,8]) → 6 8`

 |
| 

[`groupby()`](#itertools.groupby "itertools.groupby")

 | 

iterable\[, key\]

 | 

根据key(v)值分组的迭代器

 | 

`groupby(['A','B','DEF'], len) → (1, A B) (3, DEF)`

 |
| 

[`islice()`](#itertools.islice "itertools.islice")

 | 

seq, \[start,\] stop \[, step\]

 | 

seq\[start:stop:step\]中的元素

 | 

`islice('ABCDEFG', 2, None) → C D E F G`

 |
| 

[`pairwise()`](#itertools.pairwise "itertools.pairwise")

 | 

iterable -- 可迭代对象

 | 

(p\[0\], p\[1\]), (p\[1\], p\[2\])

 | 

`pairwise('ABCDEFG') → AB BC CD DE EF FG`

 |
| 

[`repeat()`](#itertools.repeat "itertools.repeat")

 | 

elem \[,n\]

 | 

elem, elem, elem, ... 重复无限次或n次

 | 

`repeat(10, 3) → 10 10 10`

 |
| 

[`starmap()`](#itertools.starmap "itertools.starmap")

 | 

func, seq

 | 

func(\*seq\[0\]), func(\*seq\[1\]), ...

 | 

`starmap(pow, [(2,5), (3,2), (10,3)]) → 32 9 1000`

 |
| 

[`takewhile()`](#itertools.takewhile "itertools.takewhile")

 | 

predicate, seq

 | 

seq\[0\], seq\[1\], 直到 predicate 未通过

 | 

`takewhile(lambda x: x<5, [1,4,6,3,8]) → 1 4`

 |
| 

[`tee()`](#itertools.tee "itertools.tee")

 | 

it, n

 | 

it1, it2, ... itn 将一个迭代器拆分为n个迭代器

 | 

`tee('ABC', 2) → A B C, A B C`

 |
| 

[`zip_longest()`](#itertools.zip_longest "itertools.zip_longest")

 | 

p, q, ...

 | 

(p\[0\], q\[0\]), (p\[1\], q\[1\]), ...

 | 

`zip_longest('ABCD', 'xy', fillvalue='-') → Ax By C- D-`

 |

**排列组合迭代器：**

| 
迭代器

 | 

实参

 | 

结果

 |
| --- | --- | --- |
| 

[`product()`](#itertools.product "itertools.product")

 | 

p, q, ... \[repeat=1\]

 | 

笛卡尔积，相当于嵌套的for循环

 |
| 

[`permutations()`](#itertools.permutations "itertools.permutations")

 | 

p\[, r\]

 | 

长度r元组，所有可能的排列，无重复元素

 |
| 

[`combinations()`](#itertools.combinations "itertools.combinations")

 | 

p, r

 | 

长度r元组，有序，无重复元素

 |
| 

[`combinations_with_replacement()`](#itertools.combinations_with_replacement "itertools.combinations_with_replacement")

 | 

p, r

 | 

长度r元组，有序，元素可重复

 |

| 
例子

 | 

结果

 |
| --- | --- |
| 

`product('ABCD', repeat=2)`

 | 

`AA AB AC AD BA BB BC BD CA CB CC CD DA DB DC DD`

 |
| 

`permutations('ABCD', 2)`

 | 

`AB AC AD BA BC BD CA CB CD DA DB DC`

 |
| 

`combinations('ABCD', 2)`

 | 

`AB AC AD BC BD CD`

 |
| 

`combinations_with_replacement('ABCD', 2)`

 | 

`AA AB AC AD BB BC BD CC CD DD`

 |

## Itertool 函数[¶](#itertool-functions "Link to this heading")

下列函数都是构造并返回迭代器。 有些会提供无限长度的流，所以它们应当只通过能截断流的函数或循环来访问。

itertools.accumulate(_iterable_\[, _function_, _\*_, _initial=None_\])[¶](#itertools.accumulate "Link to this definition")

创建一个返回累积汇总值或来自其他双目运算函数的累积结果的迭代器。

_function_ 默认为加法运算。 _function_ 应当接受两个参数，即一个累积汇总值和一个来自 _iterable_ 的值。

如果提供了 _initial_ 值，将从该值开始累积并且输出将比输入可迭代对象多一个元素。

大致相当于:

def accumulate(iterable, function\=operator.add, \*, initial\=None):
    'Return running totals'
    \# accumulate(\[1,2,3,4,5\]) → 1 3 6 10 15
    \# accumulate(\[1,2,3,4,5\], initial=100) → 100 101 103 106 110 115
    \# accumulate(\[1,2,3,4,5\], operator.mul) → 1 2 6 24 120

    iterator \= iter(iterable)
    total \= initial
    if initial is None:
        try:
            total \= next(iterator)
        except StopIteration:
            return

    yield total
    for element in iterator:
        total \= function(total, element)
        yield total

要计算运行最小值，则将 _function_ 设为 [`min()`](https://docs.python.org/zh-cn/3/builtins/functions.html#min "min")。 对于运行最大值，则将 _function_ 设为 [`max()`](https://docs.python.org/zh-cn/3/builtins/functions.html#max "max")。 或者对于运行乘积，则将 _function_ 设为 [`operator.mul()`](https://docs.python.org/zh-cn/3/library/operator.html#operator.mul "operator.mul")。 对于构建 [分期表](https://www.ramseysolutions.com/real-estate/amortization-schedule)，即累计利息并应用还款额：

\>>> data \= \[3, 4, 6, 2, 1, 9, 0, 7, 5, 8\]
\>>> list(accumulate(data, max))              \# 运行最大值
\[3, 4, 6, 6, 6, 9, 9, 9, 9, 9\]
\>>> list(accumulate(data, operator.mul))     \# 运行乘积
\[3, 12, 72, 144, 144, 1296, 0, 0, 0, 0\]

\# 以 10 次年付每次 90 分期偿还利率 5% 总额 1000 的贷款
\>>> update \= lambda balance, payment: round(balance \* 1.05) \- payment
\>>> list(accumulate(repeat(90, 10), update, initial\=1\_000))
\[1000, 960, 918, 874, 828, 779, 728, 674, 618, 559, 497\]

参考一个类似函数 [`functools.reduce()`](https://docs.python.org/zh-cn/3/library/functools.html#functools.reduce "functools.reduce") ，它只返回一个最终累积值。

Added in version 3.2.

在 3.3 版本发生变更: 添加了可选的 _function_ 形参。

在 3.8 版本发生变更: 添加了可选的 _initial_ 形参。

itertools.batched(_iterable_, _n_, _\*_, _strict\=False_)[¶](#itertools.batched "Link to this definition")

来自 _iterable_ 的长度为 _n_ 元组形式的批次数据。 最后一个批次可能短于 _n_。

如果 _strict_ 为真值，将在最终的批次短于 _n_ 时引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

Loops over the input iterable and accumulates data into tuples up to size _n_. The input is consumed lazily, just enough to fill a batch. The result is yielded as soon as the batch is full or when the input iterable is [exhausted](https://docs.python.org/zh-cn/3/glossary.html#term-exhausted):

\>>> flattened\_data \= \['roses', 'red', 'violets', 'blue', 'sugar', 'sweet'\]
\>>> unflattened \= list(batched(flattened\_data, 2))
\>>> unflattened
\[('roses', 'red'), ('violets', 'blue'), ('sugar', 'sweet')\]

大致相当于:

def batched(iterable, n, \*, strict\=False):
    \# batched('ABCDEFG', 3) → ABC DEF G
    if n < 1:
        raise ValueError('n must be at least one')
    iterator \= iter(iterable)
    while batch := tuple(islice(iterator, n)):
        if strict and len(batch) != n:
            raise ValueError('batched(): incomplete batch')
        yield batch

Added in version 3.12.

在 3.13 版本发生变更: 增加了 _strict_ 选项。

itertools.chain(_\*iterables_)[¶](#itertools.chain "Link to this definition")

Make an iterator that returns elements from the first iterable until it is [exhausted](https://docs.python.org/zh-cn/3/glossary.html#term-exhausted), then proceeds to the next iterable, until all of the iterables are exhausted. This combines multiple data sources into a single iterator. Roughly equivalent to:

def chain(\*iterables):
    \# chain('ABC', 'DEF') → A B C D E F
    for iterable in iterables:
        yield from iterable

_classmethod_ chain.from\_iterable(_iterable_)[¶](#itertools.chain.from_iterable "Link to this definition")

构建类似 [`chain()`](#itertools.chain "itertools.chain") 迭代器的另一个选择。从一个单独的可迭代参数中得到链式输入，该参数是延迟计算的。大致相当于:

def from\_iterable(iterables):
    \# chain.from\_iterable(\['ABC', 'DEF'\]) → A B C D E F
    for iterable in iterables:
        yield from iterable

itertools.combinations(_iterable_, _r_)[¶](#itertools.combinations "Link to this definition")

返回由输入 _iterable_ 中元素组成长度为 _r_ 的子序列。

输出结果是 [`product()`](#itertools.product "itertools.product") 的子序列其中只保留属于 _iterable_ 的子序列的条目。 输出的长度由 [`math.comb()`](https://docs.python.org/zh-cn/3/library/math.html#math.comb "math.comb") 给出，该函数在 `0 ≤ r ≤ n` 时计算 `n! / r! / (n - r)!` 而在 `r > n` 时为 0。

组合元组是根据输入的 _iterable_ 的顺序以词典排序方式发出的。 如果输入的 _iterable_ 是已排序的，则输出的元组将按排序后的顺序产生。

元素的唯一性是基于它们的位置，而不是它们的值。 如果输入的元素都是唯一的，则每个组合中将不会有重复的值。

大致相当于:

def combinations(iterable, r):
    \# combinations('ABCD', 2) → AB AC AD BC BD CD
    \# combinations(range(4), 3) → 012 013 023 123

    pool \= tuple(iterable)
    n \= len(pool)
    if r \> n:
        return
    indices \= list(range(r))

    yield tuple(pool\[i\] for i in indices)
    while True:
        for i in reversed(range(r)):
            if indices\[i\] != i + n \- r:
                break
        else:
            return
        indices\[i\] += 1
        for j in range(i+1, r):
            indices\[j\] \= indices\[j\-1\] + 1
        yield tuple(pool\[i\] for i in indices)

itertools.combinations\_with\_replacement(_iterable_, _r_)[¶](#itertools.combinations_with_replacement "Link to this definition")

返回由输入 _iterable_ 中元素组成的长度为 _r_ 的子序列，允许每个元素可重复出现。

输出是 [`product()`](#itertools.product "itertools.product") 的子序列，其中仅保留也属于 _iterable_ 的子序列的条目（可能有重复的元素）。 当 `n > 0` 时返回的子序列数量为 `(n + r - 1)! / r! / (n - 1)!`。

组合元组是根据输入的 _iterable_ 的顺序以词典排序方式发出的。 如果输入的 _iterable_ 是已排序的，则输出的元组将按已排序的顺序产生。

元素的唯一性是基于它们的位置，而不是它们的值。 如果输入的元素都是唯一的，则生成的组合也将是唯一的。

大致相当于:

def combinations\_with\_replacement(iterable, r):
    \# combinations\_with\_replacement('ABC', 2) → AA AB AC BB BC CC

    pool \= tuple(iterable)
    n \= len(pool)
    if not n and r:
        return
    indices \= \[0\] \* r

    yield tuple(pool\[i\] for i in indices)
    while True:
        for i in reversed(range(r)):
            if indices\[i\] != n \- 1:
                break
        else:
            return
        indices\[i:\] \= \[indices\[i\] + 1\] \* (r \- i)
        yield tuple(pool\[i\] for i in indices)

Added in version 3.1.

itertools.compress(_data_, _selectors_)[¶](#itertools.compress "Link to this definition")

Make an iterator that returns elements from _data_ where the corresponding element in _selectors_ is true. Stops when either the _data_ or _selectors_ iterables have been [exhausted](https://docs.python.org/zh-cn/3/glossary.html#term-exhausted). Roughly equivalent to:

def compress(data, selectors):
    \# compress('ABCDEF', \[1,0,1,0,1,1\]) → A C E F
    return (datum for datum, selector in zip(data, selectors) if selector)

Added in version 3.1.

itertools.count(_start\=0_, _step\=1_)[¶](#itertools.count "Link to this definition")

创建一个迭代器，它返回从 _start_ 开始的均匀间隔的值。 可与 [`map()`](https://docs.python.org/zh-cn/3/builtins/functions.html#map "map") 配合使用以生成连续的数据点或与 [`zip()`](https://docs.python.org/zh-cn/3/builtins/functions.html#zip "zip") 配合使用以添加序列数字。 大致相当于:

def count(start\=0, step\=1):
    \# count(10) → 10 11 12 13 14 ...
    \# count(2.5, 0.5) → 2.5 3.0 3.5 ...
    n \= start
    while True:
        yield n
        n += step

当对浮点数计数时，替换为乘法代码有时会有更高的精度，例如: `(start + step * i for i in count())`。

在 3.1 版本发生变更: 增加参数 _step_ ，允许非整型。

itertools.cycle(_iterable_)[¶](#itertools.cycle "Link to this definition")

Make an iterator returning elements from the _iterable_ and saving a copy of each. When the iterable is [exhausted](https://docs.python.org/zh-cn/3/glossary.html#term-exhausted), return elements from the saved copy. Repeats indefinitely. Roughly equivalent to:

def cycle(iterable):
    \# cycle('ABCD') → A B C D A B C D A B C D ...

    saved \= \[\]
    for element in iterable:
        yield element
        saved.append(element)

    while saved:
        for element in saved:
            yield element

这个迭代工具可能需要很大的辅助存储（取决于 iterable 的长度）。

itertools.dropwhile(_predicate_, _iterable_)[¶](#itertools.dropwhile "Link to this definition")

创建一个迭代器，它将丢弃来自 _iterable_ 中 _predicate_ 为真值的元素然后返回每个元素。 大致相当于:

def dropwhile(predicate, iterable):
    \# dropwhile(lambda x: x<5, \[1,4,6,3,8\]) → 6 3 8

    iterator \= iter(iterable)
    for x in iterator:
        if not predicate(x):
            yield x
            break

    for x in iterator:
        yield x

请注意它将不产生 _任何_ 输出直到 predicate 首次变为假值，所以此迭代工具可能具有很长的启动时间。

itertools.filterfalse(_predicate_, _iterable_)[¶](#itertools.filterfalse "Link to this definition")

创建一个迭代器，它过滤来自 _iterable_ 的元素从而只返回其中 _predicate_ 返回假值的元素。 如果 _predicate_ 为 `None`，则返回本身为假值的条目。 大致相当于:

def filterfalse(predicate, iterable):
    \# filterfalse(lambda x: x<5, \[1,4,6,3,8\]) → 6 8

    if predicate is None:
        predicate \= bool

    for x in iterable:
        if not predicate(x):
            yield x

itertools.groupby(_iterable_, _key\=None_)[¶](#itertools.groupby "Link to this definition")

创建一个迭代器，返回 _iterable_ 中连续的键和组。_key_ 是一个计算元素键值函数。如果未指定或为 `None`，_key_ 缺省为恒等函数（identity function），返回元素不变。一般来说，_iterable_ 需用同一个键值函数预先排序。

[`groupby()`](#itertools.groupby "itertools.groupby") 操作类似于Unix中的 `uniq`。当每次 _key_ 函数产生的键值改变时，迭代器会分组或生成一个新组（这就是为什么通常需要使用同一个键值函数先对数据进行排序）。这种行为与SQL的GROUP BY操作不同，SQL的操作会忽略输入的顺序将相同键值的元素分在同组中。

返回的组本身也是一个迭代器，它与 [`groupby()`](#itertools.groupby "itertools.groupby") 共享底层的可迭代对象。因为源是共享的，当 `groupby()` 对象向后迭代时，前一个组将消失。因此如果稍后还需要返回结果，可保存为列表：

groups \= \[\]
uniquekeys \= \[\]
data \= sorted(data, key\=keyfunc)
for k, g in groupby(data, keyfunc):
    groups.append(list(g))      \# 将 group 迭代器以列表形式保存
    uniquekeys.append(k)

[`groupby()`](#itertools.groupby "itertools.groupby") 大致相当于:

def groupby(iterable, key\=None):
    \# \[k for k, g in groupby('AAAABBBCCDAABBB')\] → A B C D A B
    \# \[list(g) for k, g in groupby('AAAABBBCCD')\] → AAAA BBB CC D

    keyfunc \= (lambda x: x) if key is None else key
    iterator \= iter(iterable)
    exhausted \= False

    def \_grouper(target\_key):
        nonlocal curr\_value, curr\_key, exhausted
        yield curr\_value
        for curr\_value in iterator:
            curr\_key \= keyfunc(curr\_value)
            if curr\_key != target\_key:
                return
            yield curr\_value
        exhausted \= True

    try:
        curr\_value \= next(iterator)
    except StopIteration:
        return
    curr\_key \= keyfunc(curr\_value)

    while not exhausted:
        target\_key \= curr\_key
        curr\_group \= \_grouper(target\_key)
        yield curr\_key, curr\_group
        if curr\_key \== target\_key:
            for \_ in curr\_group:
                pass

itertools.islice(_iterable_, _stop_)[¶](#itertools.islice "Link to this definition")

itertools.islice(_iterable_, _start_, _stop_\[, _step_\])

创建一个迭代器，它返回 iterable 的选定元素。 效果与序列切片类似但不支持负的 _start_, _stop_ 或 _step_ 值。

如果 _start_ 为零或为 `None`，迭代将从零开始。 在其他情况下，iterable 中的元素将被跳过直至到达 _start_。

If _stop_ is `None`, iteration continues until the input is [exhausted](https://docs.python.org/zh-cn/3/glossary.html#term-exhausted), if at all. Otherwise, it stops at the specified position.

如果 _step_ 为 `None`，则步长默认为一。 元素将被逐一返回除非 _step_ 被设为大于一的数，此情况将导致部分条目被跳过。

大致相当于:

def islice(iterable, \*args):
    \# islice('ABCDEFG', 2) → A B
    \# islice('ABCDEFG', 2, 4) → C D
    \# islice('ABCDEFG', 2, None) → C D E F G
    \# islice('ABCDEFG', 0, None, 2) → A C E G

    s \= slice(\*args)
    start \= 0 if s.start is None else s.start
    stop \= s.stop
    step \= 1 if s.step is None else s.step
    if start < 0 or (stop is not None and stop < 0) or step <= 0:
        raise ValueError

    indices \= count() if stop is None else range(max(start, stop))
    next\_i \= start
    for i, element in zip(indices, iterable):
        if i \== next\_i:
            yield element
            next\_i += step

如果输入是一个迭代器，则完全消耗 _islice_ 将使输入的迭代器向前执行 `max(start, stop)` 步而不管 _step_ 值是多少。

itertools.pairwise(_iterable_)[¶](#itertools.pairwise "Link to this definition")

返回从输入 _iterable_ 中获取的连续重叠对。

输出迭代器中 2 元组的数量将比输入的数量少一个。 如果输入可迭代对象中少于两个值则它将为空。

大致相当于:

def pairwise(iterable):
    \# pairwise('ABCDEFG') → AB BC CD DE EF FG

    iterator \= iter(iterable)
    a \= next(iterator, None)

    for b in iterator:
        yield a, b
        a \= b

Added in version 3.10.

itertools.permutations(_iterable_, _r\=None_)[¶](#itertools.permutations "Link to this definition")

根据 _iterable_ 返回连续的 _r_ 长度 [元素的排列](https://www.britannica.com/science/permutation)。

如果 _r_ 未指定或为 `None` ，_r_ 默认设置为 _iterable_ 的长度，这种情况下，生成所有全长排列。

输出结果是 [`product()`](#itertools.product "itertools.product") 的子序列并已过滤掉其中的重复元素。 输出的长度由 [`math.perm()`](https://docs.python.org/zh-cn/3/library/math.html#math.perm "math.perm") 给出，它在 `0 ≤ r ≤ n` 时计算 `n! / (n - r)!` 而在 `r > n` 时则为零。

排列元组是根据输入的 _iterable_ 的顺序以词典排序的形式发出的。 如果输入的 _iterable_ 是已排序的，则输出的元组将按已排序的顺序产生。

元素的唯一性是基于它们的位置，而不是它们的值。 如果输入的元素都是唯一的，则在排列中就不会有重复的元素。

大致相当于:

def permutations(iterable, r\=None):
    \# permutations('ABCD', 2) → AB AC AD BA BC BD CA CB CD DA DB DC
    \# permutations(range(3)) → 012 021 102 120 201 210

    pool \= tuple(iterable)
    n \= len(pool)
    r \= n if r is None else r
    if r \> n:
        return

    indices \= list(range(n))
    cycles \= list(range(n, n\-r, \-1))
    yield tuple(pool\[i\] for i in indices\[:r\])

    while n:
        for i in reversed(range(r)):
            cycles\[i\] \-= 1
            if cycles\[i\] \== 0:
                indices\[i:\] \= indices\[i+1:\] + indices\[i:i+1\]
                cycles\[i\] \= n \- i
            else:
                j \= cycles\[i\]
                indices\[i\], indices\[\-j\] \= indices\[\-j\], indices\[i\]
                yield tuple(pool\[i\] for i in indices\[:r\])
                break
        else:
            return

itertools.product(_\*iterables_, _repeat\=1_)[¶](#itertools.product "Link to this definition")

输入可迭代对象的 [笛卡尔乘积](https://en.wikipedia.org/wiki/Cartesian_product)。

大致相当于生成器表达式中的嵌套循环。例如， `product(A, B)` 和 `((x,y) for x in A for y in B)` 返回结果一样。

嵌套循环像里程表那样循环变动，每次迭代时将最右侧的元素向后迭代。这种模式形成了一种字典序，因此如果输入的可迭代对象是已排序的，笛卡尔积元组依次序发出。

要计算可迭代对象自身的笛卡尔积，将可选参数 _repeat_ 设定为要重复的次数。例如，`product(A, repeat=4)` 和 `product(A, A, A, A)` 是一样的。

该函数大致相当于下面的代码，只不过实际实现方案不会在内存中创建中间结果:

def product(\*iterables, repeat\=1):
    \# product('ABCD', 'xy') → Ax Ay Bx By Cx Cy Dx Dy
    \# product(range(2), repeat=3) → 000 001 010 011 100 101 110 111

    if repeat < 0:
        raise ValueError('repeat argument cannot be negative')
    pools \= \[tuple(pool) for pool in iterables\] \* repeat

    result \= \[\[\]\]
    for pool in pools:
        result \= \[x+\[y\] for x in result for y in pool\]

    for prod in result:
        yield tuple(prod)

在 [`product()`](#itertools.product "itertools.product") 运行之前，它会完全耗尽输入的可迭代对象，在内存中保留值的临时池以生成结果积。 相应地，它只适用于有限的输入。

itertools.repeat(_object_\[, _times_\])[¶](#itertools.repeat "Link to this definition")

创建一个持续地返回 _object_ 的迭代器。 将会无限期地运行除非指定了 _times_ 参数。

大致相当于:

def repeat(object, times\=None):
    \# repeat(10, 3) → 10 10 10
    if times is None:
        while True:
            yield object
    else:
        for i in range(times):
            yield object

_repeat_ 的一个常见用途是向 _map_ 或 _zip_ 提供一个常量值的流:

\>>> list(map(pow, range(10), repeat(2)))
\[0, 1, 4, 9, 16, 25, 36, 49, 64, 81\]

itertools.starmap(_function_, _iterable_)[¶](#itertools.starmap "Link to this definition")

创建一个迭代器，它使用从 _iterable_ 获取的参数来计算 _function_。 当参数形参已被“预先 zip”为元组时可代替 [`map()`](https://docs.python.org/zh-cn/3/builtins/functions.html#map "map") 来使用。

[`map()`](https://docs.python.org/zh-cn/3/builtins/functions.html#map "map") 和 [`starmap()`](#itertools.starmap "itertools.starmap") 之间的区别类似于 `function(a,b)` 和 `function(*c)` 之间的差异。 大致相当于:

def starmap(function, iterable):
    \# starmap(pow, \[(2,5), (3,2), (10,3)\]) → 32 9 1000
    for args in iterable:
        yield function(\*args)

itertools.takewhile(_predicate_, _iterable_)[¶](#itertools.takewhile "Link to this definition")

创建一个迭代器，它返回来自 _iterable_ 的 _predicate_ 为真值的元素。 大致相当于:

def takewhile(predicate, iterable):
    \# takewhile(lambda x: x<5, \[1,4,6,3,8\]) → 1 4
    for x in iterable:
        if not predicate(x):
            break
        yield x

Note, the element that first fails the predicate condition is consumed from the input iterator and there is no way to access it. This could be an issue if an application wants to further consume the input iterator after _takewhile_ has been run to [exhaustion](https://docs.python.org/zh-cn/3/glossary.html#term-exhausted). To work around this problem, consider using [more-itertools before\_and\_after()](https://more-itertools.readthedocs.io/en/stable/api.html#more_itertools.before_and_after) instead.

itertools.tee(_iterable_, _n\=2_)[¶](#itertools.tee "Link to this definition")

从一个可迭代对象中返回 _n_ 个独立的迭代器。

大致相当于:

def tee(iterable, n\=2):
    if n < 0:
        raise ValueError
    if n \== 0:
        return ()
    iterator \= \_tee(iterable)
    result \= \[iterator\]
    for \_ in range(n \- 1):
        result.append(\_tee(iterator))
    return tuple(result)

class \_tee:

    def \_\_init\_\_(self, iterable):
        it \= iter(iterable)
        if isinstance(it, \_tee):
            self.iterator \= it.iterator
            self.link \= it.link
        else:
            self.iterator \= it
            self.link \= \[None, None\]

    def \_\_iter\_\_(self):
        return self

    def \_\_next\_\_(self):
        link \= self.link
        if link\[1\] is None:
            link\[0\] \= next(self.iterator)
            link\[1\] \= \[None, None\]
        value, self.link \= link
        return value

当输入的 _iterable_ 已经是一个 tee 迭代器对象时，将会构造返回元组的所有成员就像它们已被上游的 [`tee()`](#itertools.tee "itertools.tee") 调用所产生那样。 这个“展平步骤”允许嵌套的 `tee()` 调用共享相同的下层数据链并仅使用一个更新步骤而非一个调用链。

展平的特征属性使得 tee 迭代器可被高效地查看：

def lookahead(tee\_iterator):
     "返回下一个值而不向前获取输入"
     \[forked\_iterator\] \= tee(tee\_iterator, 1)
     return next(forked\_iterator)

\>>> iterator \= iter('abcdef')
\>>> \[iterator\] \= tee(iterator, 1)   \# 使输入可被查看
\>>> next(iterator)                  \# 向前执行迭代器
'a'
\>>> lookahead(iterator)             \# 检查下一个值
'b'
\>>> next(iterator)                  \# 继续向前执行
'b'

`tee` 迭代器不是线程安全的。 当同时使用由同一个 [`tee()`](#itertools.tee "itertools.tee") 调用所返回的迭代器时可能引发 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")，即使原本的 _iterable_ 是线程安全的。

该迭代工具可能需要相当大的辅助存储空间（这取决于要保存多少临时数据）。通常，如果一个迭代器在另一个迭代器开始之前就要使用大部分或全部数据，使用 [`list()`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 会比 [`tee()`](#itertools.tee "itertools.tee") 更快。

itertools.zip\_longest(_\*iterables_, _fillvalue\=None_)[¶](#itertools.zip_longest "Link to this definition")

创建一个迭代器，它聚合了来自 _iterables_ 中每一项的对应元素。

如果 iterables 中每一项的长度不同，则缺失的值将以 _fillvalue_ 填充。 如果未指定，则 _fillvalue_ 默认为 `None`。

Iteration continues until the longest iterable is [exhausted](https://docs.python.org/zh-cn/3/glossary.html#term-exhausted).

大致相当于:

def zip\_longest(\*iterables, fillvalue\=None):
    \# zip\_longest('ABCD', 'xy', fillvalue='-') → Ax By C- D-

    iterators \= list(map(iter, iterables))
    num\_active \= len(iterators)
    if not num\_active:
        return

    while True:
        values \= \[\]
        for i, iterator in enumerate(iterators):
            try:
                value \= next(iterator)
            except StopIteration:
                num\_active \-= 1
                if not num\_active:
                    return
                iterators\[i\] \= repeat(fillvalue)
                value \= fillvalue
            values.append(value)
        yield tuple(values)

如果其中某个可迭代对象可能是无穷的，则 [`zip_longest()`](#itertools.zip_longest "itertools.zip_longest") 函数应当用限制调用次数的代码进行包装（例如 [`islice()`](#itertools.islice "itertools.islice") 或 [`takewhile()`](#itertools.takewhile "itertools.takewhile") 等）。

## itertools 配方[¶](#itertools-recipes "Link to this heading")

本节将展示如何使用现有的 itertools 作为基础构件来创建扩展的工具集。

这些 itertools 专题的主要目的是教学。 各个专题显示了对单个工具的各种思维方式 — 例如，`chain.from_iterable` 被关联到展平的概念。 这些专题还给出了有关这些工具的组合方式的想法 — 例如，`starmap()` 和 `repeat()` 应当如何一起工作。 这些专题还显示了 itertools 与 [`operator`](https://docs.python.org/zh-cn/3/library/operator.html#module-operator "operator: Functions corresponding to the standard operators.") 和 [`collections`](https://docs.python.org/zh-cn/3/library/collections.html#module-collections "collections: Container datatypes") 模块以及内置迭代工具如 `map()`, `filter()`, `reversed()` 和 `enumerate()` 相互配合的使用模式。

提供这些例程的次要目的是将其作为一个孵化器。 `accumulate()`, `compress()` 和 `pairwise()` 等迭代工具最初就是作为例程引入的。 目前 `sliding_window()`, `derangements()` 和 `sieve()` 例程正在被测试以确定它们是否堪当大任。

基本上所有这些配方和许许多多其他配方都可以通过 Python Package Index 上的 [more-itertools](https://pypi.org/project/more-itertools/) 项目来安装:

python \-m pip install more\-itertools

许多例程提供了与底层工具集相当的高性能。 更好的内存效率是通过每次只处理一个元素而不是将整个可迭代对象放入内存来保证的。 代码量的精简是通过以 [函数式风格](https://www.cs.kent.ac.uk/people/staff/dat/miranda/whyfp90.pdf) 来链接工具来实现的。 高速度是通过选择使用"矢量化"构件来取代会导致较大解释器开销的 for 循环和 [生成器](https://docs.python.org/zh-cn/3/glossary.html#term-generator) 来达成的。

from itertools import (accumulate, batched, chain, combinations, compress,
     count, cycle, filterfalse, groupby, islice, permutations, product,
     repeat, starmap, tee, zip\_longest)
from collections import Counter, deque
from contextlib import suppress
from functools import reduce
from heapq import heappush, heappushpop, heappush\_max, heappushpop\_max
from math import comb, isqrt, prod, sumprod
from operator import getitem, is\_not, itemgetter, mul, neg, truediv

\# ==== 基础的单行函数 ====

def take(n, iterable):
    "Return first n items of the iterable as a list."
    return list(islice(iterable, n))

def prepend(value, iterable):
    "Prepend a single value in front of an iterable."
    \# prepend(1, \[2, 3, 4\]) → 1 2 3 4
    return chain(\[value\], iterable)

def repeatfunc(function, times\=None, \*args):
    "Repeat calls to a function with specified arguments."
    if times is None:
        return starmap(function, repeat(args))
    return starmap(function, repeat(args, times))

def flatten(list\_of\_lists):
    "Flatten one level of nesting."
    return chain.from\_iterable(list\_of\_lists)

def ncycles(iterable, n):
    "Returns the sequence elements n times."
    return chain.from\_iterable(repeat(tuple(iterable), n))

def loops(n):
    "Loop n times. Like range(n) but without creating integers."
    \# for \_ in loops(100): ...
    return repeat(None, n)

def tail(n, iterable):
    "Return an iterator over the last n items."
    \# tail(3, 'ABCDEFG') → E F G
    return iter(deque(iterable, maxlen\=n))

def consume(iterator, n\=None):
    "Advance the iterator n-steps ahead. If n is None, consume entirely."
    \# 使用以 C 速度消耗迭代器的函数。
    if n is None:
        deque(iterator, maxlen\=0)
    else:
        next(islice(iterator, n, n), None)

def nth(iterable, n, default\=None):
    "Returns the nth item or a default value."
    return next(islice(iterable, n, None), default)

def quantify(iterable, predicate\=bool):
    "Given a predicate that returns True or False, count the True results."
    return sum(map(predicate, iterable))

def first\_true(iterable, default\=False, predicate\=None):
    "Returns the first true value or the \*default\* if there is no true value."
    \# first\_true(\[a, b, c\], x) → a or b or c or x
    \# first\_true(\[a, b\], x, f) → a if f(a) else b if f(b) else x
    return next(filter(predicate, iterable), default)

def all\_equal(iterable, key\=None):
    "Returns True if all the elements are equal to each other."
    \# all\_equal('4٤௪౪໔', key=int) → True
    return len(take(2, groupby(iterable, key))) <= 1

\# ==== 数据管线 ====

def unique\_justseen(iterable, key\=None):
    "Yield unique elements, preserving order. Remember only the element just seen."
    \# unique\_justseen('AAAABBBCCDAABBB') → A B C D A B
    \# unique\_justseen('ABBcCAD', str.casefold) → A B c A D
    if key is None:
        return map(itemgetter(0), groupby(iterable))
    return map(next, map(itemgetter(1), groupby(iterable, key)))

def unique\_everseen(iterable, key\=None):
    "Yield unique elements, preserving order. Remember all elements ever seen."
    \# unique\_everseen('AAAABBBCCDAABBB') → A B C D
    \# unique\_everseen('ABBcCAD', str.casefold) → A B c D
    seen \= set()
    if key is None:
        for element in filterfalse(seen.\_\_contains\_\_, iterable):
            seen.add(element)
            yield element
    else:
        for element in iterable:
            k \= key(element)
            if k not in seen:
                seen.add(k)
                yield element

def unique(iterable, key\=None, reverse\=False):
    "Yield unique elements in sorted order. Supports unhashable inputs."
    \# unique(\[\[1, 2\], \[3, 4\], \[1, 2\]\]) → \[1, 2\] \[3, 4\]
    sequenced \= sorted(iterable, key\=key, reverse\=reverse)
    return unique\_justseen(sequenced, key\=key)

def sliding\_window(iterable, n):
    "Collect data into overlapping fixed-length chunks or blocks."
    \# sliding\_window('ABCDEFG', 3) → ABC BCD CDE DEF EFG
    iterator \= iter(iterable)
    window \= deque(islice(iterator, n \- 1), maxlen\=n)
    for x in iterator:
        window.append(x)
        yield tuple(window)

def grouper(iterable, n, \*, incomplete\='fill', fillvalue\=None):
    "Collect data into non-overlapping fixed-length chunks or blocks."
    \# grouper('ABCDEFG', 3, fillvalue='x')       → ABC DEF Gxx
    \# grouper('ABCDEFG', 3, incomplete='strict') → ABC DEF ValueError
    \# grouper('ABCDEFG', 3, incomplete='ignore') → ABC DEF
    iterators \= \[iter(iterable)\] \* n
    match incomplete:
        case 'fill':
            return zip\_longest(\*iterators, fillvalue\=fillvalue)
        case 'strict':
            return zip(\*iterators, strict\=True)
        case 'ignore':
            return zip(\*iterators)
        case \_:
            raise ValueError('Expected fill, strict, or ignore')

def roundrobin(\*iterables):
    "Visit input iterables in a cycle until each is exhausted."
    \# roundrobin('ABC', 'D', 'EF') → A D E B F C
    \# 算法由 George Sakkis 创造
    iterators \= map(iter, iterables)
    for num\_active in range(len(iterables), 0, \-1):
        iterators \= cycle(islice(iterators, num\_active))
        yield from map(next, iterators)

def subslices(seq):
    "Return all contiguous non-empty subslices of a sequence."
    \# subslices('ABCD') → A AB ABC ABCD B BC BCD C CD D
    slices \= starmap(slice, combinations(range(len(seq) + 1), 2))
    return map(getitem, repeat(seq), slices)

def derangements(iterable, r\=None):
    "Produce r length permutations without fixed points."
    \# derangements('ABCD') → BADC BCDA BDAC CADB CDAB CDBA DABC DCAB DCBA
    \# Algorithm credited to Stefan Pochmann
    seq \= tuple(iterable)
    pos \= tuple(range(len(seq)))
    have\_moved \= map(map, repeat(is\_not), repeat(pos), permutations(pos, r\=r))
    valid\_derangements \= map(all, have\_moved)
    return compress(permutations(seq, r\=r), valid\_derangements)

def iter\_index(iterable, value, start\=0, stop\=None):
    "Return indices where a value occurs in a sequence or iterable."
    \# iter\_index('AABCADEAF', 'A') → 0 1 4 7
    seq\_index \= getattr(iterable, 'index', None)
    if seq\_index is None:
        iterator \= islice(iterable, start, stop)
        for i, element in enumerate(iterator, start):
            if element is value or element \== value:
                yield i
    else:
        stop \= len(iterable) if stop is None else stop
        i \= start
        with suppress(ValueError):
            while True:
                yield (i := seq\_index(value, i, stop))
                i += 1

def iter\_except(function, exception, first\=None):
    "Convert a call-until-exception interface to an iterator interface."
    \# iter\_except(d.popitem, KeyError) → 非阻塞的字典迭代器
    with suppress(exception):
        if first is not None:
            yield first()
        while True:
            yield function()

\# ==== 数学运算 ====

def multinomial(\*counts):
    "Number of distinct arrangements of a multiset."
    \# Counter('abracadabra').values() → 5 2 2 1 1
    \# multinomial(5, 2, 2, 1, 1) → 83160
    return prod(map(comb, accumulate(counts), counts))

def powerset(iterable):
    "Subsequences of the iterable from shortest to longest."
    \# powerset(\[1,2,3\]) → () (1,) (2,) (3,) (1,2) (1,3) (2,3) (1,2,3)
    s \= list(iterable)
    return chain.from\_iterable(combinations(s, r) for r in range(len(s)+1))

def sum\_of\_squares(iterable):
    "Add up the squares of the input values."
    \# sum\_of\_squares(\[10, 20, 30\]) → 1400
    return sumprod(\*tee(iterable))

\# ==== 矩阵运算 ====

def reshape(matrix, columns):
    "Reshape a 2-D matrix to have a given number of columns."
    \# reshape(\[(0, 1), (2, 3), (4, 5)\], 3) →  (0, 1, 2) (3, 4, 5)
    return batched(chain.from\_iterable(matrix), columns, strict\=True)

def transpose(matrix):
    "Swap the rows and columns of a 2-D matrix."
    \# transpose(\[(1, 2, 3), (11, 22, 33)\]) → (1, 11) (2, 22) (3, 33)
    return zip(\*matrix, strict\=True)

def matmul(m1, m2):
    "Multiply two matrices."
    \# matmul(\[(7, 5), (3, 5)\], \[(2, 5), (7, 9)\]) → (49, 80) (41, 60)
    n \= len(m2\[0\])
    return batched(starmap(sumprod, product(m1, transpose(m2))), n)

\# ==== 多项式算术 ====

def convolve(signal, kernel):
    """Discrete linear convolution of two iterables.
    Equivalent to polynomial multiplication.

    Convolutions are mathematically commutative; however, the inputs are
    evaluated differently.  The signal is consumed lazily and can be
    infinite. The kernel is fully consumed before the calculations begin.

    Article:  https://betterexplained.com/articles/intuitive-convolution/
    Video:    https://www.youtube.com/watch?v=KuXjwB4LzSA
    """
    \# convolve(\[1, -1, -20\], \[1, -3\]) → 1 -4 -17 60
    \# convolve(data, \[0.25, 0.25, 0.25, 0.25\]) → Moving average (blur)
    \# convolve(data, \[1/2, 0, -1/2\]) → 1st derivative estimate
    \# convolve(data, \[1, -2, 1\]) → 2nd derivative estimate
    kernel \= tuple(kernel)\[::\-1\]
    n \= len(kernel)
    padded\_signal \= chain(repeat(0, n\-1), signal, repeat(0, n\-1))
    windowed\_signal \= sliding\_window(padded\_signal, n)
    return map(sumprod, repeat(kernel), windowed\_signal)

def polynomial\_from\_roots(roots):
    """Compute a polynomial's coefficients from its roots.

       (x - 5) (x + 4) (x - 3)  expands to:   x³ -4x² -17x + 60
    """
    \# polynomial\_from\_roots(\[5, -4, 3\]) → \[1, -4, -17, 60\]
    factors \= zip(repeat(1), map(neg, roots))
    return list(reduce(convolve, factors, \[1\]))

def polynomial\_eval(coefficients, x):
    """Evaluate a polynomial at a specific value.

    Computes with better numeric stability than Horner's method.
    """
    \# Evaluate x³ -4x² -17x + 60 at x = 5
    \# polynomial\_eval(\[1, -4, -17, 60\], x=5) → 0
    n \= len(coefficients)
    if not n:
        return type(x)(0)
    powers \= map(pow, repeat(x), reversed(range(n)))
    return sumprod(coefficients, powers)

def polynomial\_derivative(coefficients):
    """Compute the first derivative of a polynomial.

       f(x)  =  x³ -4x² -17x + 60
       f'(x) = 3x² -8x  -17
    """
    \# polynomial\_derivative(\[1, -4, -17, 60\]) → \[3, -8, -17\]
    n \= len(coefficients)
    powers \= reversed(range(1, n))
    return list(map(mul, coefficients, powers))

\# ==== 数论 ====

def sieve(n):
    "Primes less than n."
    \# sieve(30) → 2 3 5 7 11 13 17 19 23 29
    if n \> 2:
        yield 2
    data \= bytearray((0, 1)) \* (n // 2)
    for p in iter\_index(data, 1, start\=3, stop\=isqrt(n) + 1):
        data\[p\*p : n : p+p\] \= bytes(len(range(p\*p, n, p+p)))
    yield from iter\_index(data, 1, start\=3)

def factor(n):
    "Prime factors of n."
    \# factor(99) → 3 3 11
    \# factor(1\_000\_000\_000\_000\_007) → 47 59 360620266859
    \# factor(1\_000\_000\_000\_000\_403) → 1000000000000403
    for prime in sieve(isqrt(n) + 1):
        while not n % prime:
            yield prime
            n //= prime
            if n \== 1:
                return
    if n \> 1:
        yield n

def is\_prime(n):
    "Return True if n is prime."
    \# is\_prime(1\_000\_000\_000\_000\_403) → True
    return n \> 1 and next(factor(n)) \== n

def totient(n):
    "Count of natural numbers up to n that are coprime to n."
    \# https://mathworld.wolfram.com/TotientFunction.html
    \# totient(12) → 4 因为 len(\[1, 5, 7, 11\]) == 4
    for prime in set(factor(n)):
        n \-= n // prime
    return n

\# ==== 运行统计 ====

def running\_mean(iterable):
    "Average of values seen so far."
    \# running\_mean(\[37, 33, 38, 28\]) → 37 35 36 34
    return map(truediv, accumulate(iterable), count(1))

def running\_min(iterable):
    "Smallest of values seen so far."
    \# running\_min(\[37, 33, 38, 28\]) → 37 33 33 28
    return accumulate(iterable, func\=min)

def running\_max(iterable):
    "Largest of values seen so far."
    \# running\_max(\[37, 33, 38, 28\]) → 37 37 38 38
    return accumulate(iterable, func\=max)

def running\_median(iterable):
    "Median of values seen so far."
    \# running\_median(\[37, 33, 38, 28\]) → 37 35 37 35
    read \= iter(iterable).\_\_next\_\_
    lo \= \[\]  \# 最大堆
    hi \= \[\]  \# 最小堆大小与 lo 相等或小一
    with suppress(StopIteration):
        while True:
            heappush\_max(lo, heappushpop(hi, read()))
            yield lo\[0\]
            heappush(hi, heappushpop\_max(lo, read()))
            yield (lo\[0\] + hi\[0\]) / 2

def running\_statistics(iterable):
    "Aggregate statistics for values seen so far."
    \# 生成元组:  (size, minimum, median, maximum, mean)
    t0, t1, t2, t3 \= tee(iterable, 4)
    return zip(
        count(1),
        running\_min(t0),
        running\_median(t1),
        running\_max(t2),
        running\_mean(t3),
    )
