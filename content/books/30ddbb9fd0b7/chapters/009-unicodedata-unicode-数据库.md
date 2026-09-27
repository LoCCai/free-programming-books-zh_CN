* * *

This module provides access to the Unicode Character Database (UCD) which defines character properties for all Unicode characters. The data contained in this database is compiled from the [UCD version 16.0.0](https://www.unicode.org/Public/16.0.0/ucd).

该模块使用与 Unicode 标准附件 #44 [“Unicode 字符数据库”](https://www.unicode.org/reports/tr44/) 中所定义的相同名称和符号。 它定义了以下函数：

unicodedata.lookup(_name_)[¶](#unicodedata.lookup "Link to this definition")

按名称查找字符。如果找到具有给定名称的字符，则返回相应的字符。 如果没有找到，则引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError")。例如:

\>>> unicodedata.lookup('LEFT CURLY BRACKET')
'{'

此函数返回的字符与字符串字面值中 `\N` 转义序列生成的字符相同。例如:

\>>> unicodedata.lookup('MIDDLE DOT') \== '\\N{MIDDLE DOT}'
True

在 3.3 版本发生变更: 已添加对名称别名 [\[1\]](#id3) 和命名序列 [\[2\]](#id4) 的支持。

unicodedata.name(_chr_, _default\=None_, _/_)[¶](#unicodedata.name "Link to this definition")

返回分配给字符 _chr_ 的名称（字符串形式）。如果未定义名称，则返回 _default_；如果未指定 _default_，则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。例如:

\>>> unicodedata.name('½')
'VULGAR FRACTION ONE HALF'
\>>> unicodedata.name('\\uFFFF', 'fallback')
'fallback'

unicodedata.decimal(_chr_, _default\=None_, _/_)[¶](#unicodedata.decimal "Link to this definition")

返回分配给字符 _chr_ 的十进制值作为整数。 如果没有定义这样的值，则返回 _default_ ，如果没有给出，则 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 被引发。例如:

\>>> unicodedata.decimal('\\N{ARABIC-INDIC DIGIT NINE}')
9
\>>> unicodedata.decimal('\\N{SUPERSCRIPT NINE}', \-1)
\-1

unicodedata.digit(_chr_, _default\=None_, _/_)[¶](#unicodedata.digit "Link to this definition")

返回分配给字符 _chr_ 的数字值作为整数。 如果没有定义这样的值，则返回 _default_ ，如果没有给出，则引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError"):

\>>> unicodedata.digit('\\N{SUPERSCRIPT NINE}')
9

unicodedata.numeric(_chr_, _default\=None_, _/_)[¶](#unicodedata.numeric "Link to this definition")

返回分配给字符 _chr_ 的数值作为浮点数。 如果没有定义这样的值，则返回 _default_ ，如果没有给出，则引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")

\>>> unicodedata.numeric('½')
0.5

unicodedata.category(_chr_)[¶](#unicodedata.category "Link to this definition")

Returns the general category assigned to the character _chr_ as string. General category names consist of two letters. See the [General Category Values section of the Unicode Character Database documentation](https://www.unicode.org/reports/tr44/tr44-34.html#General_Category_Values) for a list of category codes. For example:

\>>> unicodedata.category('A')  \# 'L'etter, 'u'ppercase
'Lu'

unicodedata.bidirectional(_chr_)[¶](#unicodedata.bidirectional "Link to this definition")

Returns the bidirectional class assigned to the character _chr_ as string. If no such value is defined, an empty string is returned. See the [Bidirectional Class Values section of the Unicode Character Database](https://www.unicode.org/reports/tr44/tr44-34.html#Bidi_Class_Values) documentation for a list of bidirectional codes. For example:

\>>> unicodedata.bidirectional('\\N{ARABIC-INDIC DIGIT SEVEN}') \# 'A'rabic, 'N'umber
'AN'

unicodedata.combining(_chr_)[¶](#unicodedata.combining "Link to this definition")

Returns the canonical combining class assigned to the character _chr_ as integer. Returns `0` if no combining class is defined. See the [Canonical Combining Class Values section of the Unicode Character Database](https://www.unicode.org/reports/tr44/tr44-34.html#Canonical_Combining_Class_Values) for more information.

unicodedata.east\_asian\_width(_chr_)[¶](#unicodedata.east_asian_width "Link to this definition")

Returns the east asian width assigned to the character _chr_ as string. For a list of widths and or more information, see the [Unicode Standard Annex #11](https://www.unicode.org/reports/tr11/tr11-43.html).

unicodedata.mirrored(_chr_)[¶](#unicodedata.mirrored "Link to this definition")

返回分配给字符 _chr_ 的镜像属性为整数。如果字符在双向文本中被识别为“镜像”字符，则返回 `1` ，否则返回 `0` 。例如:

\>>> unicodedata.mirrored('>')
1

unicodedata.decomposition(_chr_)[¶](#unicodedata.decomposition "Link to this definition")

返回分配给字符 _chr_ 的字符分解映射作为字符串。如果未定义此类映射，则返回空字符串。例如:

\>>> unicodedata.decomposition('Ã')
'0041 0303'

unicodedata.normalize(_form_, _unistr_)[¶](#unicodedata.normalize "Link to this definition")

返回 Unicode 字符串 _unistr_ 的正规形式 _form_ 。 _form_ 的有效值为 'NFC' 、 'NFKC' 、 'NFD' 和 'NFKD' 。

Unicode 标准基于规范等价和兼容性等效的定义定义了 Unicode 字符串的各种规范化形式。在 Unicode 中，可以以各种方式表示多个字符。 例如，字符 U+00C7 （带有 CEDILLA 的 LATIN CAPITAL LETTER C ）也可以表示为序列 U+0043（ LATIN CAPITAL LETTER C ）U+0327（ COMBINING CEDILLA ）。

对于每个字符，有两种正规形式：正规形式 C 和正规形式 D 。正规形式D（NFD）也称为规范分解，并将每个字符转换为其分解形式。 正规形式C（NFC）首先应用规范分解，然后再次组合预组合字符。

除了这两种形式之外，还有两种基于兼容性等效的其他正规形式。 在 Unicode 中，支持某些通常会与其他字符统一的字符。 例如， U+2160（ROMAN NUMERAL ONE）与 U+0049（LATIN CAPITAL LETTER I）实际上是相同的。 但是，为了与现有字符集（例如 gb2312 ）兼容，Unicode 仍然支持它。

正规形式KD（NFKD）将应用兼容性分解，也就是用其等价项替换所有兼容性字符。 正规形式KC（NFKC）首先应用兼容性分解，然后是规范组合。

即使两个 unicode 字符串被规范化并且人类读者看起来相同，如果一个具有组合字符而另一个没有，则它们可能无法相等。

unicodedata.is\_normalized(_form_, _unistr_)[¶](#unicodedata.is_normalized "Link to this definition")

判断 Unicode 字符串 _unistr_ 是否为正规形式 _form_。 _form_ 的有效值为 'NFC', 'NFKC', 'NFD' 和 'NFKD'。

Added in version 3.8.

此外，该模块暴露了以下常量：

unicodedata.unidata\_version[¶](#unicodedata.unidata_version "Link to this definition")

此模块中使用的 Unicode 数据库的版本。

unicodedata.ucd\_3\_2\_0[¶](#unicodedata.ucd_3_2_0 "Link to this definition")

This is an object that has the same methods as the entire module, but uses the Unicode database version 3.2 instead, for applications that require this specific version of the Unicode database (such as IDNA).

备注
