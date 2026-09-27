-   模块：optparse
-   目的：命令行参数解析, 可以取代getopt
-   python版本：2.3

## 描述[¶](#id1 "Permalink to this headline")

optparse是一个当前可选的命令行解析模块, 它提供了一些在getopt中不含有的特性, 如type conversion(类型转换), option callbacks(参数回调)以及automatice help generation(自动化帮助生成). 本文没有详细介绍optparse的很多特性, 但它可以帮助你在写命令行程序时能够快速入门.

## 创建一个OptionParser[¶](#optionparser "Permalink to this headline")

optparser解析参数需要经过2个阶段. 首先, 构建OptionParser实例并配置相关的选项, 然后填入一个参数序列并处理.

import optparse
parser \= optparse.OptionParser()

通常, 一旦分析器被建立, 每一个选项需要明确的添加到parser中, 并说明当命令行遇到相关的选项时需要如何处理. 在构建OptionParser时也可以传入一个选项列表, 但这种形式不经常使用.

## 定义选项[¶](#id2 "Permalink to this headline")

利用add\_option()方法可以每次增加一个选项. 在参数列表的开始, 任何未命名的字符串参数都将被视为选项名. 如果要为一个选项创建别名, 比如为同一个选项增加一个短的或长的命名, 那么简单传递同名字符串即可.

不同于getopt, 只能分析选项, optparse是一个完整的选项分析库, Option(选项)可以被不同的方法处理, 通过在add\_option()方法中指定action(行为)参数. 支持的行为包括存储参数(单独或作为列表的一部分), 当一个选项出现时(包括对布尔开关true/false的特殊处理)存储其常量值, 计算一个选项出现的次数以及调用一个callback(回调函数).

默认的行为是存储这个选项的参数. 如果给定了type(类型), 那么在存储前, 这个参数值将被转化成这个类型. 如果给定了dest(目标参数), 那么当命令行参数被解析时, 选项值被存储在该选项对象的dest中.

## 分析一个命令行[¶](#id3 "Permalink to this headline")

一旦所有的选项被定义好, 命令行被作为一个参数字符串传递给parse\_args()方法. 一般, 参数可以从sys.argv\[1:\]中得到, 当然你可以传递自己的列表. 选项处理时使用GNU/POSIX语法, 因此, 选项和参数值可以在参数序列中混合使用.

从parse\_args()方法返回的是一个二维元组, 包含一个optparse Values实例和在命令行中未被解析的参数列表. Values实例将选项值作为属性, 如果你定义了一个选项的dest为”myoption”, 可以通过option.myoption访问该选项的值.

## 简单示例[¶](#id4 "Permalink to this headline")

如下一个简单例子有三个不同的选项, 一个布尔选项(-a), 一个字符串选项(-b)和一个整型选项(-c).

import optparse
parser \= optparse.OptionParser()
parser.add\_option('-a', action\="store\_true", default\=False)
parser.add\_option('-b', action\="store", dest\="b")
parser.add\_option('-c', action\="store", dest\="c", type\="int")
print parser.parse\_args(\['-a', '-bval', '-c', '3'\])

命令行中选项解析的规则和getopt.gnu\_getopt()一样, 因此有两种方法传递单字符串选项的值, 上述示例使用了两种方法-bval和-c val.

$ python optparse\_short.py
(<Values at 0xe29b8: {'a': True, 'c': 3, 'b': 'val'}>, \[\])

注意, c所关联的值的类型是整型, OptionParser在存储之前会转换成指定类型. 不同于getopt, optparse处理长选项名时和短选项名是没有任何区别的.

parser \= optparse.OptionParser()
parser.add\_option('--noarg', action\="store\_true", default\=False)
parser.add\_option('--witharg', action\="store", dest\="witharg")
parser.add\_option('--witharg2', action\="store", dest\="witharg2", type\="int")
print parser.parse\_args(\[ '--noarg', '--witharg', 'val', '--witharg2=3' \])

结果相同的：

$ python optparse\_long.py
(<Values at 0xd3ad0: {'noarg': True, 'witharg': 'val', 'witharg2': 3}>, \[\])

## 与getopt的比较[¶](#getopt "Permalink to this headline")

如下实现一个与getopt之前示例相同功能的optparse例子:

import optparse
import sys
print 'ARGV      :', sys.argv\[1:\]
parser \= optparse.OptionParser()
parser.add\_option('-o', '--output',
            dest\="output\_filename",
            default\="default.out",
            )
parser.add\_option('-v', '--verbose',
            dest\="verbose",
            default\=False,
            action\="store\_true",
            )
parser.add\_option('--version',
            dest\="version",
            default\=1.0,
            type\="float",
            )
options, remainder \= parser.parse\_args()
print 'VERSION   :', options.version
print 'VERBOSE   :', options.verbose
print 'OUTPUT    :', options.output\_filename
print 'REMAINING :', remainder

注意, -o和–output选项是如何在同一时刻被定义的, 命令行中可以使用任何一种选项.

$ python optparse\_getoptcomparison.py -o output.txt
ARGV      : \['-o', 'output.txt'\]
VERSION   : 1.0
VERBOSE   : False
OUTPUT    : output.txt
REMAINING : \[\]
$ python optparse\_getoptcomparison.py --output output.txt
ARGV      : \['--output', 'output.txt'\]
VERSION   : 1.0
VERBOSE   : False
OUTPUT    : output.txt
REMAINING : \[\]

另外, 长选项名的唯一前缀也可以被使用.

$ python optparse\_getoptcomparison.py --out output.txt
ARGV      : \['--out', 'output.txt'\]
VERSION   : 1.0
VERBOSE   : False
OUTPUT    : output.txt
REMAINING : \[\]

## Option Callbacks(选项回调)[¶](#option-callbacks "Permalink to this headline")

除了直接为选项存储参数, 另一种选择是定义callback function, 当命令行中出现该选项时调用, 选项的callbacks有4个参数, 分别是引起callback的optparse.Option实例, 命令行中的选项字符串, 选项关联的参数值以及处理解析工作的optparse.OptionParser实例.

import optparse

def flag\_callback(option, opt\_str, value, parser):
    print 'flag\_callback:'
    print '\\toption:', repr(option)
    print '\\topt\_str:', opt\_str
    print '\\tvalue:', value
    print '\\tparser:', parser
    return

def with\_callback(option, opt\_str, value, parser):
    print 'with\_callback:'
    print '\\toption:', repr(option)
    print '\\topt\_str:', opt\_str
    print '\\tvalue:', value
    print '\\tparser:', parser
    return

parser \= optparse.OptionParser()
parser.add\_option('--flag', action\="callback", callback\=flag\_callback)
parser.add\_option('--with',
    action\="callback",
    callback\=with\_callback,
    type\="string",
    help\="Include optional feature")
parser.parse\_args(\['--with', 'foo', '--flag'\])

在这个例子中, –with选项被配置成处理字符串参数(当然, 其他类型也是同样支持的).

$ python optparse\_callback.py
with\_callback:
     option: <Option at 0x78b98: --with>
     opt\_str: --with
     value: foo
     parser: <optparse.OptionParser instance at 0x78b48>
flag\_callback:
     option: <Option at 0x7c620: --flag>
     opt\_str: --flag
     value: None
     parser: <optparse.OptionParser instance at 0x78b48>

## 帮助信息[¶](#id5 "Permalink to this headline")

OptionParser自动为每个选项集合包含一个help选项, 因此, 用户在运行程序时在命令行输入–help来看介绍, 帮助信息为所有选项指示它们是否需要传入一个参数, 也可以通过在add\_option()中定义帮助文本来为一个选项定义更多的描述.

parser \= optparse.OptionParser()
parser.add\_option('--no-foo', action\="store\_true",
    default\=False,
    dest\="foo",
    help\="Turn off foo",
)
parser.add\_option('--with', action\="store", help\="Include optional feature")
parser.parse\_args()

选项按字母顺序显示, 别名显示在同一行, 当选项带有一个参数时, dest值将作为参数名字出现在help输出中, 帮助信息将出现在这列中.

$ python optparse\_help.py --help
Usage: optparse\_help.py \[options\]

Options:
-h, --help   show this help message and exit
--no-foo     Turn off foo
--with=WITH  Include optional feature

利用nargs选项可以配置callbacks接收多个参数.

def with\_callback(option, opt\_str, value, parser):
    print 'with\_callback:'
    print '\\toption:', repr(option)
    print '\\topt\_str:', opt\_str
    print '\\tvalue:', value
    print '\\tparser:', parser
    return

parser \= optparse.OptionParser()
parser.add\_option('--with',
    action\="callback",
    callback\=with\_callback,
    type\="string",
    nargs\=2,
    help\="Include optional feature")
parser.parse\_args(\['--with', 'foo', 'bar'\])

在这个例子中, 参数作为一个元组传递给callback function的value参数.

$ python optparse\_callback\_nargs.py
with\_callback:
     option: <Option at 0x7c4e0: --with>
     opt\_str: --with
     value: ('foo', 'bar')
     parser: <optparse.OptionParser instance at 0x78a08>
