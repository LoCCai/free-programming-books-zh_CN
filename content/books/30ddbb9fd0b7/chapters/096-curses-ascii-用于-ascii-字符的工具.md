**源代码:** [Lib/curses/ascii.py](https://github.com/python/cpython/tree/3.14/Lib/curses/ascii.py)

* * *

`curses.ascii` 模块提供了一些 ASCII 字符的名称常量以及在各种 ASCII 字符类中执行成员检测的函数。 所提供的表示控制字符名称的常量如下：

| 
名称

 | 

含意

 |
| --- | --- |
| 

curses.ascii.NUL[¶](#curses.ascii.NUL "Link to this definition")



 |  |
| 

curses.ascii.SOH[¶](#curses.ascii.SOH "Link to this definition")



 | 

标题开始，控制台中断

 |
| 

curses.ascii.STX[¶](#curses.ascii.STX "Link to this definition")



 | 

文本开始

 |
| 

curses.ascii.ETX[¶](#curses.ascii.ETX "Link to this definition")



 | 

文本结束

 |
| 

curses.ascii.EOT[¶](#curses.ascii.EOT "Link to this definition")



 | 

传输结束

 |
| 

curses.ascii.ENQ[¶](#curses.ascii.ENQ "Link to this definition")



 | 

查询，附带 [`ACK`](#curses.ascii.ACK "curses.ascii.ACK") 流量控制

 |
| 

curses.ascii.ACK[¶](#curses.ascii.ACK "Link to this definition")



 | 

确认

 |
| 

curses.ascii.BEL[¶](#curses.ascii.BEL "Link to this definition")



 | 

蜂鸣器

 |
| 

curses.ascii.BS[¶](#curses.ascii.BS "Link to this definition")



 | 

退格

 |
| 

curses.ascii.TAB[¶](#curses.ascii.TAB "Link to this definition")



 | 

制表符

 |
| 

curses.ascii.HT[¶](#curses.ascii.HT "Link to this definition")



 | 

[`TAB`](#curses.ascii.TAB "curses.ascii.TAB") 的别名："水平制表符"

 |
| 

curses.ascii.LF[¶](#curses.ascii.LF "Link to this definition")



 | 

换行

 |
| 

curses.ascii.NL[¶](#curses.ascii.NL "Link to this definition")



 | 

[`LF`](#curses.ascii.LF "curses.ascii.LF") 的别名： "新行"

 |
| 

curses.ascii.VT[¶](#curses.ascii.VT "Link to this definition")



 | 

垂直制表符

 |
| 

curses.ascii.FF[¶](#curses.ascii.FF "Link to this definition")



 | 

换页

 |
| 

curses.ascii.CR[¶](#curses.ascii.CR "Link to this definition")



 | 

回车

 |
| 

curses.ascii.SO[¶](#curses.ascii.SO "Link to this definition")



 | 

Shift-out，开始替换字符集

 |
| 

curses.ascii.SI[¶](#curses.ascii.SI "Link to this definition")



 | 

Shift-in，恢复默认字符集

 |
| 

curses.ascii.DLE[¶](#curses.ascii.DLE "Link to this definition")



 | 

Data-link escape，数据链接转义

 |
| 

curses.ascii.DC1[¶](#curses.ascii.DC1 "Link to this definition")



 | 

XON，用于流控制

 |
| 

curses.ascii.DC2[¶](#curses.ascii.DC2 "Link to this definition")



 | 

Device control 2，块模式流控制

 |
| 

curses.ascii.DC3[¶](#curses.ascii.DC3 "Link to this definition")



 | 

XOFF，用于流控制

 |
| 

curses.ascii.DC4[¶](#curses.ascii.DC4 "Link to this definition")



 | 

设备控制4

 |
| 

curses.ascii.NAK[¶](#curses.ascii.NAK "Link to this definition")



 | 

否定确认

 |
| 

curses.ascii.SYN[¶](#curses.ascii.SYN "Link to this definition")



 | 

同步空闲

 |
| 

curses.ascii.ETB[¶](#curses.ascii.ETB "Link to this definition")



 | 

传输块结束

 |
| 

curses.ascii.CAN[¶](#curses.ascii.CAN "Link to this definition")



 | 

取消

 |
| 

curses.ascii.EM[¶](#curses.ascii.EM "Link to this definition")



 | 

媒体结束

 |
| 

curses.ascii.SUB[¶](#curses.ascii.SUB "Link to this definition")



 | 

替换

 |
| 

curses.ascii.ESC[¶](#curses.ascii.ESC "Link to this definition")



 | 

退出

 |
| 

curses.ascii.FS[¶](#curses.ascii.FS "Link to this definition")



 | 

文件分隔符

 |
| 

curses.ascii.GS[¶](#curses.ascii.GS "Link to this definition")



 | 

组分隔符

 |
| 

curses.ascii.RS[¶](#curses.ascii.RS "Link to this definition")



 | 

记录分隔符，块模式终止符

 |
| 

curses.ascii.US[¶](#curses.ascii.US "Link to this definition")



 | 

单位分隔符

 |
| 

curses.ascii.SP[¶](#curses.ascii.SP "Link to this definition")



 | 

空格

 |
| 

curses.ascii.DEL[¶](#curses.ascii.DEL "Link to this definition")



 | 

删除

 |

请注意其中有许多在现今已经没有实际作用。 这些助记符是来源于数字计算机之前的电传打印机规范。

此模块提供了下列函数，对应于标准 C 库中的函数:

curses.ascii.isalnum(_c_)[¶](#curses.ascii.isalnum "Link to this definition")

检测 ASCII 字母数字类字符；它等价于 `isalpha(c) or isdigit(c)`。

curses.ascii.isalpha(_c_)[¶](#curses.ascii.isalpha "Link to this definition")

检测 ASCII 字母类字符；它等价于 `isupper(c) or islower(c)`。

curses.ascii.isascii(_c_)[¶](#curses.ascii.isascii "Link to this definition")

检测字符值是否在 7 位 ASCII 集范围内。

curses.ascii.isblank(_c_)[¶](#curses.ascii.isblank "Link to this definition")

Checks for an ASCII blank character; space or horizontal tab.

curses.ascii.iscntrl(_c_)[¶](#curses.ascii.iscntrl "Link to this definition")

检测 ASCII 控制字符（在 0x00 到 0x1f 或 0x7f 范围内）。

curses.ascii.isdigit(_c_)[¶](#curses.ascii.isdigit "Link to this definition")

检测 ASCII 十进制数码，即 `'0'` 至 `'9'`。 它等价于 `c in string.digits`。

curses.ascii.isgraph(_c_)[¶](#curses.ascii.isgraph "Link to this definition")

Checks for any ASCII printable character except space.

curses.ascii.islower(_c_)[¶](#curses.ascii.islower "Link to this definition")

检测 ASCII 小写字母字符。

curses.ascii.isprint(_c_)[¶](#curses.ascii.isprint "Link to this definition")

检测任意 ASCII 可打印字符，包括空格。

curses.ascii.ispunct(_c_)[¶](#curses.ascii.ispunct "Link to this definition")

Checks for any ASCII printable character which is not a space or an alphanumeric character.

curses.ascii.isspace(_c_)[¶](#curses.ascii.isspace "Link to this definition")

检测 ASCII 空白字符；包括空格，换行，回车，进纸，水平制表和垂直制表。

curses.ascii.isupper(_c_)[¶](#curses.ascii.isupper "Link to this definition")

检测 ASCII 大写字母字符。

curses.ascii.isxdigit(_c_)[¶](#curses.ascii.isxdigit "Link to this definition")

检测 ASCII 十六进制数码。 这等价于 `c in string.hexdigits`。

curses.ascii.isctrl(_c_)[¶](#curses.ascii.isctrl "Link to this definition")

Checks for an ASCII control character (ordinal values 0 to 31). Unlike [`iscntrl()`](#curses.ascii.iscntrl "curses.ascii.iscntrl"), this does not include the delete character (0x7f).

curses.ascii.ismeta(_c_)[¶](#curses.ascii.ismeta "Link to this definition")

检测非 ASCII 字符（码位值 0x80 及以上）。

这些函数接受整数或单字符字符串；当参数为字符串时，会先使用内置函数 [`ord()`](https://docs.python.org/zh-cn/3/builtins/functions.html#ord "ord") 进行转换。

请注意所有这些函数都是检测根据你传入的字符串的字符所生成的码位值；它们实际上完全不会知晓本机的字符编码格式。

以下两个函数接受单字符字符串或整数形式的字节值；它们会返回相同类型的值。

curses.ascii.ascii(_c_)[¶](#curses.ascii.ascii "Link to this definition")

返回对应于 _c_ 的低 7 比特位的 ASCII 值。

curses.ascii.ctrl(_c_)[¶](#curses.ascii.ctrl "Link to this definition")

返回对应于给定字符的控制字符（字符比特值会与 0x1f 进行按位与运算）。

curses.ascii.alt(_c_)[¶](#curses.ascii.alt "Link to this definition")

返回对应于给定 ASCII 字符的 8 比特位字符（字符比特值会与 0x80 进行按位或运算）。

以下函数接受单字符字符串或整数值；它会返回一个字符串。

curses.ascii.unctrl(_c_)[¶](#curses.ascii.unctrl "Link to this definition")

返回 ASCII 字符 _c_ 的字符串表示形式。 如果 _c_ 是可打印字符，则字符串为字符本身。 如果该字符是控制字符 (0x00--0x1f) 则字符串由一个插入符 (`'^'`) 加相应的大写字母组成。 如果该字符是 ASCII 删除符 (0x7f) 则字符串为 `'^?'`。 如果该字符设置了元比特位 (0x80)，元比特位会被去除，应用以上规则后将在结果之前添加 `'!'`。

curses.ascii.controlnames[¶](#curses.ascii.controlnames "Link to this definition")

一个 33 元素的字符串数组，其中按从 0 (NUL) 到 0x1f (US) 的顺序包含了三十二个 ASCII 控制字符的 ASCII 助记符，另加空格符的助记符 `SP`。
