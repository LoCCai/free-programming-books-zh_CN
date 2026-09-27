**源代码:** [Lib/operator.py](https://github.com/python/cpython/tree/3.14/Lib/operator.py)

* * *

The `operator` module exports a set of efficient functions corresponding to the intrinsic operators of Python. For example, `operator.add(x, y)` is equivalent to the expression `x+y`. Many function names are those used for special methods, without the double underscores. For backward compatibility, many of these have a variant with the double underscores kept. The variants without the double underscores are preferred for clarity.

函数包含的种类有：对象的比较运算、逻辑运算、数学运算以及序列运算。

对象比较函数适用于所有的对象，函数名根据它们对应的比较运算符命名。

operator.lt(_a_, _b_)[¶](#operator.lt "Link to this definition")

operator.le(_a_, _b_)[¶](#operator.le "Link to this definition")

operator.eq(_a_, _b_)[¶](#operator.eq "Link to this definition")

operator.ne(_a_, _b_)[¶](#operator.ne "Link to this definition")

operator.ge(_a_, _b_)[¶](#operator.ge "Link to this definition")

operator.gt(_a_, _b_)[¶](#operator.gt "Link to this definition")

operator.\_\_lt\_\_(_a_, _b_)[¶](#operator.__lt__ "Link to this definition")

operator.\_\_le\_\_(_a_, _b_)[¶](#operator.__le__ "Link to this definition")

operator.\_\_eq\_\_(_a_, _b_)[¶](#operator.__eq__ "Link to this definition")

operator.\_\_ne\_\_(_a_, _b_)[¶](#operator.__ne__ "Link to this definition")

operator.\_\_ge\_\_(_a_, _b_)[¶](#operator.__ge__ "Link to this definition")

operator.\_\_gt\_\_(_a_, _b_)[¶](#operator.__gt__ "Link to this definition")

在 _a_ 和 _b_ 之间进行全比较。具体的，`lt(a, b)` 与 `a < b` 相同， `le(a, b)` 与 `a <= b` 相同，`eq(a, b)` 与 `a == b` 相同，`ne(a, b)` 与 `a != b` 相同，`gt(a, b)` 与 `a > b` 相同，`ge(a, b)` 与 `a >= b` 相同。注意这些函数可以返回任何值，无论它是否可当作布尔值。关于全比较的更多信息请参考 [比较运算](https://docs.python.org/zh-cn/3/reference/expressions.html#comparisons) 。

逻辑运算通常也适用于所有对象，并且支持真值检测、标识检测和布尔运算：

operator.not\_(_obj_)[¶](#operator.not_ "Link to this definition")

operator.\_\_not\_\_(_obj_)[¶](#operator.__not__ "Link to this definition")

返回 [`not`](https://docs.python.org/zh-cn/3/reference/expressions.html#not) _obj_ 的结果。 （请注意对象实例并没有 `__not__()` 方法；只有解释器核心可定义此操作。 结果会受到 [`__bool__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__bool__ "object.__bool__") 和 [`__len__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__len__ "object.__len__") 方法的影响。）

operator.truth(_obj_)[¶](#operator.truth "Link to this definition")

如果 _obj_ 为真值则返回 [`True`](https://docs.python.org/zh-cn/3/builtins/constants.html#True "True")，否则返回 [`False`](https://docs.python.org/zh-cn/3/builtins/constants.html#False "False")。 这等价于使用 [`bool`](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool") 构造器。

operator.is\_(_a_, _b_)[¶](#operator.is_ "Link to this definition")

返回 `a is b`。 检测对象标识。

operator.is\_not(_a_, _b_)[¶](#operator.is_not "Link to this definition")

返回 `a is not b`。 检测对象标识。

operator.is\_none(_a_)[¶](#operator.is_none "Link to this definition")

返回 `a is None`。 检测对象标识。

Added in version 3.14.

operator.is\_not\_none(_a_)[¶](#operator.is_not_none "Link to this definition")

返回 `a is not None`。 检测对象标识。

Added in version 3.14.

数学和按位运算的种类是最多的：

operator.abs(_obj_)[¶](#operator.abs "Link to this definition")

operator.\_\_abs\_\_(_obj_)[¶](#operator.__abs__ "Link to this definition")

返回 _obj_ 的绝对值。

operator.add(_a_, _b_)[¶](#operator.add "Link to this definition")

operator.\_\_add\_\_(_a_, _b_)[¶](#operator.__add__ "Link to this definition")

对于数字 _a_ 和 _b_，返回 `a + b`。

operator.and\_(_a_, _b_)[¶](#operator.and_ "Link to this definition")

operator.\_\_and\_\_(_a_, _b_)[¶](#operator.__and__ "Link to this definition")

返回 `a & b`。

operator.floordiv(_a_, _b_)[¶](#operator.floordiv "Link to this definition")

operator.\_\_floordiv\_\_(_a_, _b_)[¶](#operator.__floordiv__ "Link to this definition")

返回 `a // b`。

operator.index(_a_)[¶](#operator.index "Link to this definition")

operator.\_\_index\_\_(_a_)[¶](#operator.__index__ "Link to this definition")

返回 _a_ 转换为整数的结果。 等价于 `a.__index__()`。

在 3.10 版本发生变更: 结果总是为 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 类型。 在之前版本中，结果可能为 `int` 的子类的实例。

operator.inv(_obj_)[¶](#operator.inv "Link to this definition")

operator.invert(_obj_)[¶](#operator.invert "Link to this definition")

operator.\_\_inv\_\_(_obj_)[¶](#operator.__inv__ "Link to this definition")

operator.\_\_invert\_\_(_obj_)[¶](#operator.__invert__ "Link to this definition")

返回 `~obj`。

operator.lshift(_a_, _b_)[¶](#operator.lshift "Link to this definition")

operator.\_\_lshift\_\_(_a_, _b_)[¶](#operator.__lshift__ "Link to this definition")

返回 `a << b`。

operator.mod(_a_, _b_)[¶](#operator.mod "Link to this definition")

operator.\_\_mod\_\_(_a_, _b_)[¶](#operator.__mod__ "Link to this definition")

返回 `a % b`。

operator.mul(_a_, _b_)[¶](#operator.mul "Link to this definition")

operator.\_\_mul\_\_(_a_, _b_)[¶](#operator.__mul__ "Link to this definition")

返回 `a * b`。

operator.matmul(_a_, _b_)[¶](#operator.matmul "Link to this definition")

operator.\_\_matmul\_\_(_a_, _b_)[¶](#operator.__matmul__ "Link to this definition")

返回 `a @ b`。

Added in version 3.5.

operator.neg(_obj_)[¶](#operator.neg "Link to this definition")

operator.\_\_neg\_\_(_obj_)[¶](#operator.__neg__ "Link to this definition")

返回 _obj_ 取负的结果 (`-obj`)。

operator.or\_(_a_, _b_)[¶](#operator.or_ "Link to this definition")

operator.\_\_or\_\_(_a_, _b_)[¶](#operator.__or__ "Link to this definition")

返回 `a | b`。

operator.pos(_obj_)[¶](#operator.pos "Link to this definition")

operator.\_\_pos\_\_(_obj_)[¶](#operator.__pos__ "Link to this definition")

返回 `+obj`。

operator.pow(_a_, _b_)[¶](#operator.pow "Link to this definition")

operator.\_\_pow\_\_(_a_, _b_)[¶](#operator.__pow__ "Link to this definition")

返回 `a ** b`。

operator.rshift(_a_, _b_)[¶](#operator.rshift "Link to this definition")

operator.\_\_rshift\_\_(_a_, _b_)[¶](#operator.__rshift__ "Link to this definition")

返回 `a >> b`。

operator.sub(_a_, _b_)[¶](#operator.sub "Link to this definition")

operator.\_\_sub\_\_(_a_, _b_)[¶](#operator.__sub__ "Link to this definition")

返回 `a - b`。

operator.truediv(_a_, _b_)[¶](#operator.truediv "Link to this definition")

operator.\_\_truediv\_\_(_a_, _b_)[¶](#operator.__truediv__ "Link to this definition")

返回 `a / b` 例如 2/3 将等于 .66 而不是 0。 这也被称为“真”除法。

operator.xor(_a_, _b_)[¶](#operator.xor "Link to this definition")

operator.\_\_xor\_\_(_a_, _b_)[¶](#operator.__xor__ "Link to this definition")

返回 `a ^ b`。

适用于序列的操作（其中一些也适用于映射）包括：

operator.concat(_a_, _b_)[¶](#operator.concat "Link to this definition")

operator.\_\_concat\_\_(_a_, _b_)[¶](#operator.__concat__ "Link to this definition")

对于序列 _a_ 和 _b_，返回 `a + b`。

operator.contains(_a_, _b_)[¶](#operator.contains "Link to this definition")

operator.\_\_contains\_\_(_a_, _b_)[¶](#operator.__contains__ "Link to this definition")

返回 `b in a` 检测的结果。 请注意操作数是反序的。

operator.countOf(_a_, _b_)[¶](#operator.countOf "Link to this definition")

返回 _b_ 在 _a_ 中的出现次数。

operator.delitem(_a_, _b_)[¶](#operator.delitem "Link to this definition")

operator.\_\_delitem\_\_(_a_, _b_)[¶](#operator.__delitem__ "Link to this definition")

移除 _a_ 中索引号为 _b_ 的值。

operator.getitem(_a_, _b_)[¶](#operator.getitem "Link to this definition")

operator.\_\_getitem\_\_(_a_, _b_)[¶](#operator.__getitem__ "Link to this definition")

返回 _a_ 中索引为 _b_ 的值。

operator.indexOf(_a_, _b_)[¶](#operator.indexOf "Link to this definition")

返回 _b_ 在 _a_ 中首次出现所在的索引号。

operator.setitem(_a_, _b_, _c_)[¶](#operator.setitem "Link to this definition")

operator.\_\_setitem\_\_(_a_, _b_, _c_)[¶](#operator.__setitem__ "Link to this definition")

将 _a_ 中索引号为 _b_ 的值设为 _c_。

operator.length\_hint(_obj_, _default\=0_)[¶](#operator.length_hint "Link to this definition")

返回对象 _obj_ 的估计长度。 首先尝试返回其实际长度，再使用 [`object.__length_hint__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__length_hint__ "object.__length_hint__") 得出估计值，最后返回默认值。

Added in version 3.4.

以下操作适用于可调用对象:

operator.call(_obj_, _/_, _\*args_, _\*\*kwargs_)[¶](#operator.call "Link to this definition")

operator.\_\_call\_\_(_obj_, _/_, _\*args_, _\*\*kwargs_)[¶](#operator.__call__ "Link to this definition")

返回 `obj(*args, **kwargs)`。

Added in version 3.11.

The `operator` module also defines tools for generalized attribute and item lookups. These are useful for making fast field extractors as arguments for [`map()`](https://docs.python.org/zh-cn/3/builtins/functions.html#map "map"), [`sorted()`](https://docs.python.org/zh-cn/3/builtins/functions.html#sorted "sorted"), [`itertools.groupby()`](https://docs.python.org/zh-cn/3/library/itertools.html#itertools.groupby "itertools.groupby"), or other functions that expect a function argument.

operator.attrgetter(_attr_)[¶](#operator.attrgetter "Link to this definition")

operator.attrgetter(_\*attrs_)

返回一个可从操作数中获取 _attr_ 的可调用对象。 如果请求了一个以上的属性，则返回一个属性元组。 属性名称还可包含点号。 例如：

-   在 `f = attrgetter('name')` 之后，调用 `f(b)` 将返回 `b.name`。
    
-   在 `f = attrgetter('name', 'date')` 之后，调用 `f(b)` 将返回 `(b.name, b.date)`。
    
-   在 `f = attrgetter('name.first', 'name.last')` 之后，调用 `f(b)` 将返回 `(b.name.first, b.name.last)`。
    

等价于:

def attrgetter(\*items):
    if any(not isinstance(item, str) for item in items):
        raise TypeError('attribute name must be a string')
    if len(items) \== 1:
        attr \= items\[0\]
        def g(obj):
            return resolve\_attr(obj, attr)
    else:
        def g(obj):
            return tuple(resolve\_attr(obj, attr) for attr in items)
    return g

def resolve\_attr(obj, attr):
    for name in attr.split("."):
        obj \= getattr(obj, name)
    return obj

operator.itemgetter(_item_)[¶](#operator.itemgetter "Link to this definition")

operator.itemgetter(_\*items_)

返回一个使用操作数的 [`__getitem__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__getitem__ "object.__getitem__") 方法从操作数中获取 _item_ 的可调用对象。 如果指定了多个条目，则返回一个查找值的元组。 例如：

-   在 `f = itemgetter(2)` 之后，调用 `f(r)` 将返回 `r[2]`。
    
-   在 `g = itemgetter(2, 5, 3)` 之后，调用 `g(r)` 将返回 `(r[2], r[5], r[3])`。
    

等价于:

def itemgetter(\*items):
    if len(items) \== 1:
        item \= items\[0\]
        def g(obj):
            return obj\[item\]
    else:
        def g(obj):
            return tuple(obj\[item\] for item in items)
    return g

条目可以是操作数的 [`__getitem__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__getitem__ "object.__getitem__") 方法所接受的任何类型。 字典接受任意 [hashable](https://docs.python.org/zh-cn/3/glossary.html#term-hashable) 值。 列表、元组和字符串接受索引或切片对象：

\>>> itemgetter(1)('ABCDEFG')
'B'
\>>> itemgetter(1, 3, 5)('ABCDEFG')
('B', 'D', 'F')
\>>> itemgetter(slice(2, None))('ABCDEFG')
'CDEFG'
\>>> soldier \= dict(rank\='captain', name\='dotterbart')
\>>> itemgetter('rank')(soldier)
'captain'

使用 [`itemgetter()`](#operator.itemgetter "operator.itemgetter") 从元组的记录中提取特定字段的例子：

\>>> inventory \= \[('apple', 3), ('banana', 2), ('pear', 5), ('orange', 1)\]
\>>> getcount \= itemgetter(1)
\>>> list(map(getcount, inventory))
\[3, 2, 5, 1\]
\>>> sorted(inventory, key\=getcount)
\[('orange', 1), ('banana', 2), ('apple', 3), ('pear', 5)\]

operator.methodcaller(_name_, _/_, _\*args_, _\*\*kwargs_)[¶](#operator.methodcaller "Link to this definition")

返回一个在操作数上调用 _name_ 方法的可调用对象。 如果给出额外的参数和/或关键字参数，它们也将被传给该方法。 例如：

-   在 `f = methodcaller('name')` 之后，调用 `f(b)` 将返回 `b.name()`。
    
-   在 `f = methodcaller('name', 'foo', bar=1)` 之后，调用 `f(b)` 将返回 `b.name('foo', bar=1)`。
    

等价于:

def methodcaller(name, /, \*args, \*\*kwargs):
    def caller(obj):
        return getattr(obj, name)(\*args, \*\*kwargs)
    return caller

## 将运算符映射到函数[¶](#mapping-operators-to-functions "Link to this heading")

This table shows how abstract operations correspond to operator symbols in the Python syntax and the functions in the `operator` module.

| 
运算

 | 

语法

 | 

函数

 |
| --- | --- | --- |
| 

加法

 | 

`a + b`

 | 

`add(a, b)`

 |
| 

拼接

 | 

`seq1 + seq2`

 | 

`concat(seq1, seq2)`

 |
| 

包含测试

 | 

`obj in seq`

 | 

`contains(seq, obj)`

 |
| 

除法

 | 

`a / b`

 | 

`truediv(a, b)`

 |
| 

除法

 | 

`a // b`

 | 

`floordiv(a, b)`

 |
| 

Bitwise And, or Intersection

 | 

`a & b`

 | 

`and_(a, b)`

 |
| 

Bitwise Exclusive Or, or Symmetric Difference

 | 

`a ^ b`

 | 

`xor(a, b)`

 |
| 

Bitwise Inversion, or Complement

 | 

`~ a`

 | 

`invert(a)`

 |
| 

Bitwise Or, or Union

 | 

`a | b`

 | 

`or_(a, b)`

 |
| 

取幂

 | 

`a ** b`

 | 

`pow(a, b)`

 |
| 

标识

 | 

`a is b`

 | 

`is_(a, b)`

 |
| 

标识

 | 

`a is not b`

 | 

`is_not(a, b)`

 |
| 

标识

 | 

`a is None`

 | 

`is_none(a)`

 |
| 

标识

 | 

`a is not None`

 | 

`is_not_none(a)`

 |
| 

索引赋值

 | 

`obj[k] = v`

 | 

`setitem(obj, k, v)`

 |
| 

索引删除

 | 

`del obj[k]`

 | 

`delitem(obj, k)`

 |
| 

索引取值

 | 

`obj[k]`

 | 

`getitem(obj, k)`

 |
| 

左移

 | 

`a << b`

 | 

`lshift(a, b)`

 |
| 

取模

 | 

`a % b`

 | 

`mod(a, b)`

 |
| 

乘法

 | 

`a * b`

 | 

`mul(a, b)`

 |
| 

矩阵乘法

 | 

`a @ b`

 | 

`matmul(a, b)`

 |
| 

取负（算术）

 | 

`- a`

 | 

`neg(a)`

 |
| 

取反（逻辑）

 | 

`not a`

 | 

`not_(a)`

 |
| 

正数

 | 

`+ a`

 | 

`pos(a)`

 |
| 

右移

 | 

`a >> b`

 | 

`rshift(a, b)`

 |
| 

切片赋值

 | 

`seq[i:j] = values`

 | 

`setitem(seq, slice(i, j), values)`

 |
| 

切片删除

 | 

`del seq[i:j]`

 | 

`delitem(seq, slice(i, j))`

 |
| 

切片取值

 | 

`seq[i:j]`

 | 

`getitem(seq, slice(i, j))`

 |
| 

字符串格式化

 | 

`s % obj`

 | 

`mod(s, obj)`

 |
| 

减法

 | 

`a - b`

 | 

`sub(a, b)`

 |
| 

真值测试

 | 

`obj`

 | 

`truth(obj)`

 |
| 

比较

 | 

`a < b`

 | 

`lt(a, b)`

 |
| 

比较

 | 

`a <= b`

 | 

`le(a, b)`

 |
| 

相等

 | 

`a == b`

 | 

`eq(a, b)`

 |
| 

不等

 | 

`a != b`

 | 

`ne(a, b)`

 |
| 

比较

 | 

`a >= b`

 | 

`ge(a, b)`

 |
| 

比较

 | 

`a > b`

 | 

`gt(a, b)`

 |

## 原地运算符[¶](#in-place-operators "Link to this heading")

许多运算都有“原地”版本。 以下列出的是提供对原地运算符相比通常语法更底层访问的函数，例如 [statement](https://docs.python.org/zh-cn/3/glossary.html#term-statement) `x += y` 相当于 `x = operator.iadd(x, y)`。 换一种方式来讲就是 `z = operator.iadd(x, y)` 等价于语句块 `z = x; z += y`。

在这些例子中，请注意当调用一个原地方法时，运算和赋值是分成两个步骤来执行的。 下面列出的原地函数只执行第一步即调用原地方法。 第二步赋值则不加处理。

对于不可变的目标例如字符串、数字和元组，更新的值会被计算，但不会再被赋值给输入变量：

\>>> a \= 'hello'
\>>> iadd(a, ' world')
'hello world'
\>>> a
'hello'

对于可变的目标例如列表和字典，原地方法将执行更新，因此不需要后续赋值操作：

\>>> s \= \['h', 'e', 'l', 'l', 'o'\]
\>>> iadd(s, \[' ', 'w', 'o', 'r', 'l', 'd'\])
\['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'\]
\>>> s
\['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'\]

operator.iadd(_a_, _b_)[¶](#operator.iadd "Link to this definition")

operator.\_\_iadd\_\_(_a_, _b_)[¶](#operator.__iadd__ "Link to this definition")

`a = iadd(a, b)` 等价于 `a += b`。

operator.iand(_a_, _b_)[¶](#operator.iand "Link to this definition")

operator.\_\_iand\_\_(_a_, _b_)[¶](#operator.__iand__ "Link to this definition")

`a = iand(a, b)` 等价于 `a &= b`。

operator.iconcat(_a_, _b_)[¶](#operator.iconcat "Link to this definition")

operator.\_\_iconcat\_\_(_a_, _b_)[¶](#operator.__iconcat__ "Link to this definition")

`a = iconcat(a, b)` 等价于 `a += b` 其中 _a_ 和 _b_ 为序列。

operator.ifloordiv(_a_, _b_)[¶](#operator.ifloordiv "Link to this definition")

operator.\_\_ifloordiv\_\_(_a_, _b_)[¶](#operator.__ifloordiv__ "Link to this definition")

`a = ifloordiv(a, b)` 等价于 `a //= b`。

operator.ilshift(_a_, _b_)[¶](#operator.ilshift "Link to this definition")

operator.\_\_ilshift\_\_(_a_, _b_)[¶](#operator.__ilshift__ "Link to this definition")

`a = ilshift(a, b)` 等价于 `a <<= b`。

operator.imod(_a_, _b_)[¶](#operator.imod "Link to this definition")

operator.\_\_imod\_\_(_a_, _b_)[¶](#operator.__imod__ "Link to this definition")

`a = imod(a, b)` 等价于 `a %= b`。

operator.imul(_a_, _b_)[¶](#operator.imul "Link to this definition")

operator.\_\_imul\_\_(_a_, _b_)[¶](#operator.__imul__ "Link to this definition")

`a = imul(a, b)` 等价于 `a *= b`。

operator.imatmul(_a_, _b_)[¶](#operator.imatmul "Link to this definition")

operator.\_\_imatmul\_\_(_a_, _b_)[¶](#operator.__imatmul__ "Link to this definition")

`a = imatmul(a, b)` 等价于 `a @= b`。

Added in version 3.5.

operator.ior(_a_, _b_)[¶](#operator.ior "Link to this definition")

operator.\_\_ior\_\_(_a_, _b_)[¶](#operator.__ior__ "Link to this definition")

`a = ior(a, b)` 等价于 `a |= b`。

operator.ipow(_a_, _b_)[¶](#operator.ipow "Link to this definition")

operator.\_\_ipow\_\_(_a_, _b_)[¶](#operator.__ipow__ "Link to this definition")

`a = ipow(a, b)` 等价于 `a **= b`。

operator.irshift(_a_, _b_)[¶](#operator.irshift "Link to this definition")

operator.\_\_irshift\_\_(_a_, _b_)[¶](#operator.__irshift__ "Link to this definition")

`a = irshift(a, b)` 等价于 `a >>= b`。

operator.isub(_a_, _b_)[¶](#operator.isub "Link to this definition")

operator.\_\_isub\_\_(_a_, _b_)[¶](#operator.__isub__ "Link to this definition")

`a = isub(a, b)` 等价于 `a -= b`。

operator.itruediv(_a_, _b_)[¶](#operator.itruediv "Link to this definition")

operator.\_\_itruediv\_\_(_a_, _b_)[¶](#operator.__itruediv__ "Link to this definition")

`a = itruediv(a, b)` 等价于 `a /= b`。

operator.ixor(_a_, _b_)[¶](#operator.ixor "Link to this definition")

operator.\_\_ixor\_\_(_a_, _b_)[¶](#operator.__ixor__ "Link to this definition")

`a = ixor(a, b)` 等价于 `a ^= b`。
