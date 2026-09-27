-   模块: atexit
-   目的: 当一程序关闭时, 注册一个需要被调用的函数.
-   Python版本: 2.1.3+

## 描述[¶](#id1 "Permalink to this headline")

atexit模块提供了一个简单的接口, 一般情况下, 用于注册当程序关闭时需要调用的函数. sys模块虽然也提供了类似功能的钩子, sys.exitfunc, 但是它只能注册一个函数. 而atexit注册表可以被多个模块和库同时使用.

## 示例[¶](#id2 "Permalink to this headline")

一个简单的例子, 它通过atexit.register()注册一个函数:

import atexit

def all\_done():

    print 'all\_done()'

print 'Registering'
atexit.register(all\_done)
print 'Registered'

由于上面的程序实际上不做任何其他事情, 所以在程序关闭时立即调用了all\_done():

$ python atexit\_simple.py
Registering
Registered
all\_done()

注册多个函数也是有可能的, 并且可以传递参数给它们. 这在安全地断开数据库连接, 或删除临时文件等情况下, 都是非常有用的. 因为可以将参数传递给注册函数, 所以我们甚至不需要保留一个单独需要清理东西的列表 – 我们只需要多次注册一个清理函数.

def my\_cleanup(name):

    print 'my\_cleanup(%s)' % name

atexit.register(my\_cleanup, 'first')
atexit.register(my\_cleanup, 'second')
atexit.register(my\_cleanup, 'third')

注意: 这里函数调用的顺序是按照它们注册顺序的逆序的. 这就允许模块按照它们被导入顺序的逆序(由此来注册它们的atexit函数)来清理, 这样可以减少模块间的依赖关系.

$ python atexit\_multiple.py
my\_cleanup(third)
my\_cleanup(second)
my\_cleanup(first)

## 什么时候atexit函数不被调用?[¶](#atexit "Permalink to this headline")

由atexit注册的那些回调函数不会被调用的情况有以下几种:

> -   程序由于收到信号退出. ## 这个信号是??
> -   直接调用os.\_exit()
> -   在python解释器中, 检测到很严重的错误.

为了举例程序是通过信号被杀死的, 我们可以修改 subprocess summary 中的一个例子. 这里有2个文件需要被调用, 分别是父进程和子进程:

import os
import signal
import subprocess
import time

proc \= subprocess.Popen('atexit\_signal\_child.py')
print 'PARENT: Pausing before sending signal...'
time.sleep(1)
print 'PARENT: Signaling %s' % proc.pid
os.kill(proc.pid, signal.SIGTERM)

子进程中设置atexit回调函数, 以证明它没有被调用.

import atexit
import time

def not\_called():
    print 'CHILD: atexit handler should not have been called'

print 'CHILD: Registering atexit handler'
atexit.register(not\_called)

print 'CHILD: Pausing to wait for signal'
time.sleep(5)

运行之后, 输出信息如下:

$ python atexit\_signal\_parent.py
CHILD: Registering atexit handler
CHILD: Pausing to wait for signal
PARENT: Pausing before sending signal...
PARENT: Signaling 2038

注意到子进程中没有调用not\_called(), 所以就没有打印出相应的信息. 类似的, 如果一个程序绕过正常的退出路径的话, 它也不会执行atexit回调函数.

import atexit
import os

def not\_called():

    print 'This should not be called'

print 'Registering'
atexit.register(not\_called)
print 'Registered'

print 'Exiting...'
os.\_exit(0)

由于我们直接调用os.\_eixt()退出程序, 所以atexit的回调函数不会被调用.

$ python atexit\_os\_exit.py
Registering
Registered
Exiting...

如果我们使用sys.exit()的话, atexit的回调函数仍然会被执行.

import atexit
import sys

def all\_done():

    print 'all\_done()'

print 'Registering'
atexit.register(all\_done)
print 'Registered'

print 'Exiting...'
sys.exit()

$ python atexit\_sys\_exit.py
Registering
Registered
Exiting...
all\_done()

在Python解释器中模拟出一个严重错误来验证程序的退出也没有调用atexit回调函数,,,这个就留给读者了吧. :-)

## 在atexit回调函数中的异常[¶](#id3 "Permalink to this headline")

在atexit回调函数中引发异常后的回溯信息会被输出到控制台, 最后引发的异常会重新被抛出以作为程序的最终错误信息.

def exit\_with\_exception(message):
    raise RuntimeError(message)

atexit.register(exit\_with\_exception, 'Registered first')
atexit.register(exit\_with\_exception, 'Registered second')

Note

注册时的顺序决定了执行的顺序. 如果一个回调函数中的错误引入了另外一个错误(比他先注册但是比他后调用), 那么, 最终的信息可能对于用户来说不是最有用的. ## 这个例子, 程序首先在second上抛出异常, 但最终显示的是first异常信息, 这主要还是因为atexit回调函数不是按照注册顺序来执行的.

$ python atexit\_exception.py
Error in atexit.\_run\_exitfuncs:
Traceback (most recent call last):
 File "/Library/Frameworks/Python.framework/Versions/2.5/lib/python2.5/atexit.py", line 24, in \_run\_exitfuncs
 func(\*targs, \*\*kargs)
 File "atexit\_exception.py", line 36, in exit\_with\_exception
 raise RuntimeError(message)
RuntimeError: Registered second
Error in atexit.\_run\_exitfuncs:
Traceback (most recent call last):
 File "/Library/Frameworks/Python.framework/Versions/2.5/lib/python2.5/atexit.py", line 24, in \_run\_exitfuncs
 func(\*targs, \*\*kargs)
 File "atexit\_exception.py", line 36, in exit\_with\_exception
 raise RuntimeError(message)
RuntimeError: Registered first
Error in sys.exitfunc:
Traceback (most recent call last):
 File "/Library/Frameworks/Python.framework/Versions/2.5/lib/python2.5/atexit.py", line 24, in \_run\_exitfuncs
 func(\*targs, \*\*kargs)
 File "atexit\_exception.py", line 36, in exit\_with\_exception
 raise RuntimeError(message)
RuntimeError: Registered first

一般情况下, 你可以设置在清理函数中安静的处理和记录所有异常, 这样在程序退出时, 就不会使输出信息显得很乱.

## 参考[¶](#id4 "Permalink to this headline")

-   [Python Module of the Week](http://www.doughellmann.com/projects/PyMOTW/)
-   [Sample Code](http://www.doughellmann.com/downloads/PyMOTW-1.8.tar.gz)
