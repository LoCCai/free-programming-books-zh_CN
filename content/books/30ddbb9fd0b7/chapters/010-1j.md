**源代码:** [Lib/stringprep.py](https://github.com/python/cpython/tree/3.14/Lib/stringprep.py)

* * *

。这种比较的具体执行可能会取决于应用域的不同，例如是否要区分大小写等等。 有时也可能需要限制允许的标识为仅由"可打印"字符组成。

[**RFC 3454**](https://datatracker.ietf.org/doc/html/rfc3454.html) 定义了在因特网协议中 Unicode 字符串的“预备”过程。 在将字符串连线传输之前，它们会先使用预备过程进行处理，之后它们将具有特定的标准形式。该 RFC 定义了一系列表格，它们可以被组合为选项配置。 每个配置必须定义所使用的表格，`stringprep` 过程的其他可选项也是配置的组成部分。`stringprep` 配置的一个例子是 `nameprep`，它被用于国际化域名。

`stringprep` 模块只暴露了来自 [**RFC 3454**](https://datatracker.ietf.org/doc/html/rfc3454.html) 的表格。由于这些表格如果表示为字典或列表将会非常庞大，该模块在内部使用 Unicode 字符数据库。模块源代码本身是使用 `mkstringprep.py` 工具生成的。

因此，这些表格是以函数而非数据结构的形式暴露的。RFC 中有两种类型的表格：集合与映射。对于集合，`stringprep` ，即当形参属于该集合时返回 `True` 的函数。对于映射，它提供了映射函数：给定键，返回对应的值。 以下是该模块中所有可用函数的列表。

stringprep.in\_table\_a1(_code_)[¶](#stringprep.in_table_a1 "Link to this definition")

确定 _code_ 是否属于 tableA.1 (Unicode 3.2 中的未分配码位)。

stringprep.in\_table\_b1(_code_)[¶](#stringprep.in_table_b1 "Link to this definition")

确定 _code_ 是否属于 tableB.1 (通常映射为空值)。

stringprep.map\_table\_b2(_code_)[¶](#stringprep.map_table_b2 "Link to this definition")

返回 _code_ 依据 tableB.2 (配合 NFKC 使用的大小写转换映射) 所映射的值。

stringprep.map\_table\_b3(_code_)[¶](#stringprep.map_table_b3 "Link to this definition")

返回 _code_ 依据 tableB.3 (不附带正规化的大小写折叠映射) 所映射的值。

stringprep.in\_table\_c11(_code_)[¶](#stringprep.in_table_c11 "Link to this definition")

确定 _code_ 是否属于 tableC.1.1 (ASCII 空白字符)。

stringprep.in\_table\_c12(_code_)[¶](#stringprep.in_table_c12 "Link to this definition")

确定 _code_ 是否属于 tableC.1.2 (非 ASCII 空白字符)。

stringprep.in\_table\_c11\_c12(_code_)[¶](#stringprep.in_table_c11_c12 "Link to this definition")

确定 _code_ 是否属于 tableC.1 (空白字符，C.1.1 和 C.1.2 的并集)。

stringprep.in\_table\_c21(_code_)[¶](#stringprep.in_table_c21 "Link to this definition")

确定 _code_ 是否属于 tableC.2.1 (ASCII 控制字符)。

stringprep.in\_table\_c22(_code_)[¶](#stringprep.in_table_c22 "Link to this definition")

确定 _code_ 是否属于 tableC.2.2 (非 ASCII 控制字符)。

stringprep.in\_table\_c21\_c22(_code_)[¶](#stringprep.in_table_c21_c22 "Link to this definition")

确定 _code_ 是否属于 tableC.2 (控制字符，C.2.1 和 C.2.2 的并集)。

stringprep.in\_table\_c3(_code_)[¶](#stringprep.in_table_c3 "Link to this definition")

确定 _code_ 是否属于 tableC.3 (私有使用)。

stringprep.in\_table\_c4(_code_)[¶](#stringprep.in_table_c4 "Link to this definition")

确定 _code_ 是否属于 tableC.4 (非字符码位)。

stringprep.in\_table\_c5(_code_)[¶](#stringprep.in_table_c5 "Link to this definition")

确定 _code_ 是否属于 tableC.5 (替代码)。

stringprep.in\_table\_c6(_code_)[¶](#stringprep.in_table_c6 "Link to this definition")

确定 _code_ 是否属于 tableC.6 (不适用于纯文本)。

stringprep.in\_table\_c7(_code_)[¶](#stringprep.in_table_c7 "Link to this definition")

确定 _code_ 是否属于 tableC.7 (不适用于规范表示)。

stringprep.in\_table\_c8(_code_)[¶](#stringprep.in_table_c8 "Link to this definition")

确定 _code_ 是否属于 tableC.8 (改变显示属性或已弃用)。

stringprep.in\_table\_c9(_code_)[¶](#stringprep.in_table_c9 "Link to this definition")

确定 _code_ 是否属于 tableC.9 (标记字符)。

stringprep.in\_table\_d1(_code_)[¶](#stringprep.in_table_d1 "Link to this definition")

确定 _code_ 是否属于 tableD.1 (带有双向属性 "R" 或 "AL" 的字符)。

stringprep.in\_table\_d2(_code_)[¶](#stringprep.in_table_d2 "Link to this definition")

确定 _code_ 是否属于 tableD.2 (带有双向属性 "L" 的字符)。
