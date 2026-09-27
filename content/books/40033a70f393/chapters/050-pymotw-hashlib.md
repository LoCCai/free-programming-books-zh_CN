-   模块： hashlib
-   目的： 加密哈希和消息摘要
-   python版本： 2.5

## 描述[¶](#id1 "Permalink to this headline")

hashlib模块封装了md5和sha模块, 形成一致的API. 想使用特定的哈希算法, 可以使用合适的构造函数来创建一个哈希对象. 不管具体使用了什么样的哈希算法, 都可以使用相同的API来操作.

hashlib是基于OpenSSL的, 库中提供的所有算法应该是可用的, 包括:

-   md5()
-   sha1()
-   sha224()
-   sha256()
-   sha384()
-   sha512()

## MD5例子[¶](#md5 "Permalink to this headline")

计算一块数据(这里是一个ASCII字符串)的MD5摘要, 创建哈希, 增加数据, 然后计算摘要.

import hashlib

from hashlib\_data import lorem

h \= hashlib.md5()
h.update(lorem)
print h.hexdigest()

这个例子使用了hexdigest()方法而不是digest()方法, 这样可让输出结果可打印出来. 如果想获得二进制的摘要值, 你可以使用digest().

$ python hashlib\_md5.py
c3abe541f361b1bfbbcfecbf53aad1fb

## SHA1例子[¶](#sha1 "Permalink to this headline")

对刚才相同的数据产生一个SHA1摘要, 其计算过程是类似的:

import hashlib

from hashlib\_data import lorem

h \= hashlib.sha1()
h.update(lorem)
print h.hexdigest()

当然, 产生的摘要值由于使用了不同的算法而不同.

$ python hashlib\_sha1.py
ac2a96a4237886637d5352d606d7a7b6d7ad2f29

## new()[¶](#new "Permalink to this headline")

有时候, 通过一个字符串形式的名字来引用算法, 而不是直接使用构造函数, 这可能在使用时更加方便. 例如, 可以在一个配置文件中存储哈希类型. 在这些情况下, 我们可以直接使用new()函数来创建一个新的哈希计算器.

import hashlib
import sys

try:
    hash\_name \= sys.argv\[1\]
except IndexError:
    print 'Specify the hash name as the first argument.'
else:
    try:
        data \= sys.argv\[2\]
    except IndexError:
        from hashlib\_data import lorem as data

    h \= hashlib.new(hash\_name)
    h.update(data)
    print h.hexdigest()

当使用不同的参数运行时:

$ python hashlib\_new.py sha1
ac2a96a4237886637d5352d606d7a7b6d7ad2f29
$ python hashlib\_new.py sha256
88b7404fc192fcdb9bb1dba1ad118aa1ccd580e9faa110d12b4d63988cf20332
$ python hashlib\_new.py sha512
f58c6935ef9d5a94d296207ee4a7d9bba411539d8677482b7e9d60e4b7137f68d25f9747cab62fe752ec5ed1e5b2fa4cdbc8c9203267f995a5d17e4408dccdb4
$ python hashlib\_new.py md5
c3abe541f361b1bfbbcfecbf53aad1fb

## 调用update()多次[¶](#update "Permalink to this headline")

哈希计算器的update()函数可以重复被调用. 每次会根据新增加的文本更新摘要值. 例如: 当文件非常大, 而不能一次性读入内存时, 使用不断update()会很有效果.

import hashlib

from hashlib\_data import lorem

h \= hashlib.md5()
h.update(lorem)
all\_at\_once \= h.hexdigest()

def chunkize(size, text):
    "Return parts of the text in size-based increments."
    start \= 0
    while start < len(text):
        chunk \= text\[start:start+size\]
        yield chunk
        start += size
    return

h \= hashlib.md5()
for chunk in chunkize(64, lorem):
    h.update(chunk)
line\_by\_line \= h.hexdigest()

print 'All at once :', all\_at\_once
print 'Line by line:', line\_by\_line
print 'Same :', (all\_at\_once \== line\_by\_line)

这个例子中有一点点小花招, 因为他也可以处理小文件, 但她说明了在不断读取数据时如何递增的使用update()来产生新的摘要.

$ python hashlib\_update.py
All at once : c3abe541f361b1bfbbcfecbf53aad1fb
Line by line: c3abe541f361b1bfbbcfecbf53aad1fb
Same : True

## 参考[¶](#id2 "Permalink to this headline")

-   [Voidspace: IronPython and Hashlib](http://www.voidspace.org.uk/python/weblog/arch_d7_2006_10_07.shtml#e497)
-   [hmac module](http://docs.python.org/lib/module-hmac.html)
