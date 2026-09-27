-   模块： exceptions
-   目的： excpetions模块定义了在整个标准库和解释器中使用的内置错误.
-   python版本： 1.5+

## 描述[¶](#id1 "Permalink to this headline")

Python之前就支持将简单的字符串信息和类一样作为异常. 从Python 1.5开始, 所有的标准库模块使用类作为异常. 而从Python 2.5开始, 字符串的异常会导致一个DeprecationWarning, 而对于字符串异常的支持会在未来的版本中去掉.

## 基类[¶](#id2 "Permalink to this headline")

在标准库文档的描述中, 异常类以分层结构定义. 这样做除了结构清晰之外, 异常的继承关系也很有用, 可以通过捕获基类的异常来捕获相关的异常. 大部分情况下, 这些基类异常不会直接被引发.

### BaseException[¶](#baseexception "Permalink to this headline")

所有异常的基类. 实现逻辑为使用 str() 将传给构造函数的参数创建为一个异常的字符串表达式.

### Exception[¶](#exception "Permalink to this headline")

不会导致运行的应用程序退出的异常的基类. 所有用户自定义的异常应该使用Exception作为基类.

### StandardError[¶](#standarderror "Permalink to this headline")

在标准库中使用的内置异常的基类.

### ArithmeticError[¶](#arithmeticerror "Permalink to this headline")

数学相关错误的基类.

### LookupError[¶](#lookuperror "Permalink to this headline")

因无法找到某些东西产生的错误的基类.

### EnvironmentError[¶](#environmenterror "Permalink to this headline")

因Python之外的原因(操作系统, 文件系统, 等等)产生的错误的基类.

## 异常的引发[¶](#id3 "Permalink to this headline")

### AssertionError[¶](#assertionerror "Permalink to this headline")

一个AssertionError由一个失败的 assert 语句引发.

assert False, 'The assertion failed'

$ python exceptions\_AssertionError\_assert.py
Traceback (most recent call last):
File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_AssertionError\_assert.py", line 12, in <module>
assert False, 'The assertion failed'
AssertionError: The assertion failed

也可以在 [unittest](http://docs.python.org/library/unittest.html#module-unittest "(in Python v2.7)") 模块中像 failIf() 一样使用.

import unittest

class AssertionExample(unittest.TestCase):
    def test(self):
        self.failUnless(False)

unittest.main()

$ python exceptions\_AssertionError\_unittest.py
F
======================================================================
FAIL: test (\_\_main\_\_.AssertionExample)
----------------------------------------------------------------------
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_AssertionError\_unittest.py", line 17, in test
  self.failUnless(False)
AssertionError

----------------------------------------------------------------------
Ran 1 test in 0.000s

FAILED (failures=1)

### AttributeError[¶](#attributeerror "Permalink to this headline")

若引用一个属性或对一个属性赋值时发生错误, 则会引发AttributeError.

例如, 当引用一个不存在的属性时:

class NoAttributes(object):
    pass

o \= NoAttributes()
print o.attribute

$ python exceptions\_AttributeError.py
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_AttributeError.py", line 16, in <module>
  print o.attribute
AttributeError: 'NoAttributes' object has no attribute 'attribute'

或者尝试修改一个只读属性:

class MyClass(object):

    @property
    def attribute(self):
        return 'This is the attribute value'

o \= MyClass()
print o.attribute
o.attribute \= 'New value'

$ python exceptions\_AttributeError\_assignment.py
This is the attribute value
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_AttributeError\_assignment.py", line 20, in <module>
  o.attribute = 'New value'
AttributeError: can't set attribute

### EOFError[¶](#eoferror "Permalink to this headline")

当一个内置函数, 如 input() 或 raw\_input(), 直到输入流的结尾也没有读到任何数据时, 会引发EOFError异常. 而对于文件的方法, 如 read(), 如果文件为空, 则会在文件末尾处返回一个空字符串.

while True:
    data \= raw\_input('prompt:')
    print 'READ:', data

$ echo hello | python PyMOTW/exceptions/exceptions\_EOFError.py
prompt:READ: hello
prompt:Traceback (most recent call last):
  File "PyMOTW/exceptions/exceptions\_EOFError.py", line 13, in <module>
  data = raw\_input('prompt:')
EOFError: EOF when reading a line

### FloatingPointError[¶](#floatingpointerror "Permalink to this headline")

若浮点异常控制(fpectl)启用, 则会在浮点运算出错时引发FloatingPointError. 启用:mod:fpectl 需要有 \--with-fpectl 选项编译的解释器. [fpectl](http://docs.python.org/library/fpectl.html#module-fpectl "(in Python v2.7)") 在stdlib文档 <http://docs.python.org/lib/module-fpectl.html>中不推荐使用。

import math
import fpectl

print 'Control off:', math.exp(1000)
fpectl.turnon\_sigfpe()
print 'Control on:', math.exp(1000)

### GeneratorExit[¶](#generatorexit "Permalink to this headline")

若调用generator的 close() 方法, 则在generator内引发GeneratorExit异常.

def my\_generator():
    try:
        for i in range(5):
            print 'Yielding', i
            yield i
    except GeneratorExit:
        print 'Exiting early'

g \= my\_generator()
print g.next()
g.close()

$ python exceptions\_GeneratorExit.py
Yielding 0
0
Exiting early

### IOError[¶](#ioerror "Permalink to this headline")

输入或输出失败时引发IOError. 例如, 磁盘已满或输入文件不存在.

f \= open('/does/not/exist', 'r')

$ python exceptions\_IOError.py
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_IOError.py", line 12, in <module>
  f = open('/does/not/exist', 'r')
IOError: \[Errno 2\] No such file or directory: '/does/not/exist'

### ImportError[¶](#importerror "Permalink to this headline")

当一个模块, 或者模块的成员, 不能被引入时引发ImportError. 以下是几种可能引发ImportError的情况.

1.  若一个模块不存在.

import module\_does\_not\_exist

$ python exceptions\_ImportError\_nomodule.py
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_ImportError\_nomodule.py", line 12, in <module>
  import module\_does\_not\_exist
ImportError: No module named module\_does\_not\_exist

2.  若执行了 from X import Y, 而X模块中不存在Y, 则引发ImportError.

from exceptions import MadeUpName

$ python exceptions\_ImportError\_missingname.py
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_ImportError\_missingname.py", line 12, in <module>
  from exceptions import MadeUpName
ImportError: cannot import name MadeUpName

### IndexError[¶](#indexerror "Permalink to this headline")

当引用的序列下标越界时引发IndexError.

my\_seq \= \[ 0, 1, 2 \]
print my\_seq\[3\]

$ python exceptions\_IndexError.py
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_IndexError.py", line 13, in <module>
  print my\_seq\[3\]
IndexError: list index out of range

### KeyError[¶](#keyerror "Permalink to this headline")

类似地, 当一个字典中的键无法找到时引发KeyError.

d \= { 'a':1, 'b':2 }
print d\['c'\]

$ python exceptions\_KeyError.py
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_KeyError.py", line 13, in <module>
  print d\['c'\]
KeyError: 'c'

KeyboardInterrupt ~~~~~~~~~~~~~~~~~~\`

KeyboardInterrupt发生在用户按下Ctrl-C(或Delete)使一个正在运行的程序停止时. 和大部分别的异常不同, KeyboardInterrupt直接继承了BaseException, 以防止其被用来捕获Exception的全局异常处理器捕获.

try:
    print 'Press Return or Ctrl-C:',
    ignored \= raw\_input()
except Exception, err:
    print 'Caught exception:', err
except KeyboardInterrupt, err:
    print 'Caught KeyboardInterrupt'
else:
    print 'No exception'

在提示符下按下Ctrl-C导致KeyboardInterrupt异常.

$ python PyMOTW/exceptions/exceptions\_KeyboardInterrupt.py
Press Return or Ctrl-C: ^CCaught KeyboardInterrupt

### MemoryError[¶](#memoryerror "Permalink to this headline")

如果程序用完了内存并且有可能恢复(例如, 通过删除某些对象)时, 引发MemoryError.

import itertools

\# Try to create a MemoryError by allocating a lot of memory
l \= \[\]
for i in range(3):
    try:
        for j in itertools.count(1):
            print i, j
            l.append('\*' \* (2\*\*30))
    except MemoryError:
        print '(error, discarding existing list)'
        l \= \[\]

$ python PyMOTW/exceptions/exceptions\_MemoryError.py
0 1
0 2
0 3
python(13482) malloc: \*\*\* mmap(size=1073745920) failed (error code=12)
\*\*\* error: can't allocate region
\*\*\* set a breakpoint in malloc\_error\_break to debug
(error, discarding existing list)
1 1
1 2
1 3
python(13482) malloc: \*\*\* mmap(size=1073745920) failed (error code=12)
\*\*\* error: can't allocate region
\*\*\* set a breakpoint in malloc\_error\_break to debug
(error, discarding existing list)
2 1
2 2
2 3
python(13482) malloc: \*\*\* mmap(size=1073745920) failed (error code=12)
\*\*\* error: can't allocate region
\*\*\* set a breakpoint in malloc\_error\_break to debug
(error, discarding existing list)

### NameError[¶](#nameerror "Permalink to this headline")

若代码引用当前作用域下不存在的名字, 则引发NameError. 例如, 一个不存在的变量名.

def func():
    print unknown\_name

func()

$ python exceptions\_NameError.py
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_NameError.py", line 15, in <module>
    func()
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_NameError.py", line 13, in func
    print unknown\_name
NameError: global name 'unknown\_name' is not defined

### NotImplementedError[¶](#notimplementederror "Permalink to this headline")

用户自定义基类可以引发NotImplementedError来模拟 _接口_ , 意思是一个方法或行为需要在子类中定义.

class BaseClass(object):
    """Defines the interface"""
    def \_\_init\_\_(self):
        super(BaseClass, self).\_\_init\_\_()
    def do\_something(self):
        """The interface, not implemented"""
        raise NotImplementedError(self.\_\_class\_\_.\_\_name\_\_ + '.do\_something')

class SubClass(BaseClass):
    """Implementes the interface"""
    def do\_something(self):
        """really does something"""
        print self.\_\_class\_\_.\_\_name\_\_ + ' doing something!'

SubClass().do\_something()
BaseClass().do\_something()

$ python exceptions\_NotImplementedError.py
SubClass doing something!
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_NotImplementedError.py", line 27, in <module>
    BaseClass().do\_something()
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_NotImplementedError.py", line 18, in do\_something
    raise NotImplementedError(self.\_\_class\_\_.\_\_name\_\_ + '.do\_something')
NotImplementedError: BaseClass.do\_something

### OSError[¶](#oserror "Permalink to this headline")

OSError是为 [os](http://docs.python.org/library/os.html#module-os "(in Python v2.7)") 模块服务的错误类, 当一个系统相关的函数返回错误时引发.

import os

for i in range(10):
    print i, os.ttyname(i)

$ python exceptions\_OSError.py
0
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_OSError.py", line 15, in <module>
    print i, os.ttyname(i)
OSError: \[Errno 25\] Inappropriate ioctl for device

### OverflowError[¶](#overflowerror "Permalink to this headline")

当一个算术操作超过了变量类型的限制时, 引发OverflowError. 长整型会在其值增加时分配更多的空间, 因此会最终引发MemoryError. 浮点数的异常处理不是标准化的, 所以不会检查浮点数. 普通的整数在需要时会被转化为长整型.

import sys

print 'Regular integer: (maxint=%s)' % sys.maxint
try:
    i \= sys.maxint \* 3
    print 'No overflow for ', type(i), 'i =', i
except OverflowError, err:
    print 'Overflowed at ', i, err

print
print 'Long integer:'
for i in range(0, 100, 10):
    print '%2d' % i, 2L \*\* i

print
print 'Floating point values:'
try:
    f \= 2.0\*\*i
    for i in range(100):
        print i, f
        f \= f \*\* 2
except OverflowError, err:
    print 'Overflowed after ', f, err

$ python exceptions\_OverflowError.py
Regular integer: (maxint=2147483647)
No overflow for  <type 'long'> i = 6442450941

Long integer:
0 1
10 1024
20 1048576
30 1073741824
40 1099511627776
50 1125899906842624
60 1152921504606846976
70 1180591620717411303424
80 1208925819614629174706176
90 1237940039285380274899124224

Floating point values:
0 1.23794003929e+27
1 1.53249554087e+54
2 2.34854258277e+108
3 5.5156522631e+216
Overflowed after  5.5156522631e+216 (34, 'Result too large')

### ReferenceError[¶](#referenceerror "Permalink to this headline")

当使用:mod:weakref 代理访问已经被作为垃圾回收的对象时, 引发ReferenceError.

import gc
import weakref

class ExpensiveObject(object):
    def \_\_init\_\_(self, name):
        self.name \= name
    def \_\_del\_\_(self):
        print '(Deleting %s)' % self

obj \= ExpensiveObject('obj')
p \= weakref.proxy(obj)

print 'BEFORE:', p.name
obj \= None
print 'AFTER:', p.name

$ python exceptions\_ReferenceError.py
BEFORE: obj
(Deleting <\_\_main\_\_.ExpensiveObject object at 0x844f0>)
AFTER:
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_ReferenceError.py", line 26, in <module>
    print 'AFTER:', p.name
ReferenceError: weakly-referenced object no longer exists

### RuntimeError[¶](#runtimeerror "Permalink to this headline")

RuntimeError在没有其它具体的异常可用时被引发. 解释器本身并不会经常引发这个异常, 但是一些用户代码可能会.

### StopIteration[¶](#stopiteration "Permalink to this headline")

当一个迭代器完成后, 它的 next() 方法引发StopIteration. 这个异常不被认为是错误.

l\=\[0,1,2\]
i\=iter(l)

print i
print i.next()
print i.next()
print i.next()
print i.next()

$ python exceptions\_StopIteration.py
<listiterator object at 0x808b0>
0
1
2
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_StopIteration.py", line 19, in <module>
    print i.next()
StopIteration

### SyntaxError[¶](#syntaxerror "Permalink to this headline")

分析器发现无法理解的源码时引发SyntaxError. 可能是在引入一个模块, 调用exec, 或 eval() 时发生. 异常的属性确切找到输入的哪一部分导致了异常.

try:
    print eval('five times three')
except SyntaxError, err:
    print 'Syntax error %s (%s\-%s): %s' % \\
           (err.filename, err.lineno, err.offset, err.text)
    print err

$ python exceptions\_SyntaxError.py
Syntax error <string> (1-10): five times three
invalid syntax (<string>, line 1)

### SystemError[¶](#systemerror "Permalink to this headline")

解释器本身发生错误, 并且有可能继续正常运行时, 引发SystemError. SystemError可能表示解释器本身的bug, 并且需要报告给维护者.

### SystemExit[¶](#systemexit "Permalink to this headline")

当调用sys.exit()时, 引发SystemExit, 而不是立即退出. 这样允许 try:finally 代码块的完成清理工作, 以及调用者(比如调试器和测试框架)捕获异常, 从而避免退出.

### TypeError[¶](#typeerror "Permalink to this headline")

连接类型不正确的对象, 或使用类型不正确的对象调用函数时, 引发TypeError.

result \= ('tuple',) + 'string'

$ python exceptions\_TypeError.py
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_TypeError.py", line 12, in <module>
    result = ('tuple',) + 'string'
TypeError: can only concatenate tuple (not "str") to tuple

### UnboundLocalError[¶](#unboundlocalerror "Permalink to this headline")

UnboundLocalError是NameError的一种, 针对本地变量名.

def throws\_global\_name\_error():
    print unknown\_global\_name

def throws\_unbound\_local():
    local\_val \= local\_val + 1
    print local\_val

try:
    throws\_global\_name\_error()
except NameError, err:
    print 'Global name error:', err

try:
    throws\_unbound\_local()
except UnboundLocalError, err:
    print 'Local name error:', err

全局NameError和UnboundLocal的区别是使用变量名的方式. 因为变量名”local\_val”出现在表达式的左边, 所以被解释为一个本地变量名.

$ python exceptions\_UnboundLocalError.py
Global name error: global name 'unknown\_global\_name' is not defined
Local name error: local variable 'local\_val' referenced before assignment

### UnicodeError[¶](#unicodeerror "Permalink to this headline")

UnicodeError是ValueError的子类, 当出现Unicode问题时引发. UnicodeError有不同的子类: UnicodeEncodeError, UnicodeDecodeError和UnicodeTranslateError.

### ValueError[¶](#valueerror "Permalink to this headline")

当一个函数得到一个类型正确但是非有效值时, 引发ValueError.

print chr(1024)

$ python exceptions\_ValueError.py
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_ValueError.py", line 12, in <module>
    print chr(1024)
ValueError: chr() arg not in range(256)

### ZeroDivisionError[¶](#zerodivisionerror "Permalink to this headline")

当0作为一个除法操作的分母时, 引发ZeroDivisionError.

print 1/0

$ python exceptions\_ZeroDivisionError.py
Traceback (most recent call last):
  File "/Users/dhellmann/Documents/PyMOTW/in\_progress/exceptions/PyMOTW/exceptions/exceptions\_ZeroDivisionError.py", line 12, in <module>
    print 1/0
ZeroDivisionError: integer division or modulo by zero

## Warning列表[¶](#warning "Permalink to this headline")

还有一些异常用来在:mod:warnings 模块中使用.

-   Warning: 所有警告的基类.
-   UserWarning: 所有来自用户代码的警告的基类.
-   DeprecationWarning: 用在不再被维护的特性上.
-   PendingDeprecationWarning: 用在很快就会不推荐使用的特性上.
-   SyntaxWarning: 用在值得商榷的表达式上.
-   RuntimeWarning: 运行时可能发生问题的事件的警告.
-   FutureWarning: 对于语言或库的改变会在之后实现时警告.
-   ImportWarning: 导入一个模块的问题的警告.
-   UnicodeWarning: 关于unicode文本的问题的警告.
