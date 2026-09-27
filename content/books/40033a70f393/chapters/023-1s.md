-   模块： fnmatch
-   目的： 对文件名和Unix风格模式进行比较.
-   python版本：1.4+

使用fnmatch模块处理Unix风格的文件名的比较.

## 描述[¶](#id1 "Permalink to this headline")

fnmatch模块用来全局模式上比较文件名(比如在Unix Shell中的模式).

## 简单匹配[¶](#id2 "Permalink to this headline")

fnmatch() 比较一个简单的文件名和一个模式并且返回一个布尔类型, 即匹配返回True, 不匹配返回Fasle. 如果操作系统使用了一个大小写不敏感的文件系统, 那么这种比较也是大小写不敏感的, 否则是大小写敏感的.

import fnmatch
import os

pattern \= 'fnmatch\_\*.py'
print 'Pattern :', pattern
print

files \= os.listdir('.')
for name in files:
    print 'Filename: %-25s %s' % (name, fnmatch.fnmatch(name, pattern))

这个例子中, 模式匹配所有以fnmatch\_开头, 以 .py 结尾的文件名.

$ python fnmatch\_fnmatch.py

Pattern : fnmatch\_\*.py

Filename: .svn False
Filename: \_\_init\_\_.py False
Filename: fnmatch\_filter.py True
Filename: fnmatch\_fnmatch.py True
Filename: fnmatch\_fnmatchcase.py True
Filename: fnmatch\_translate.py True

为了在各个不同文件系统或操作系统设置也能强制匹配大小写, 可以使用 fnmatchcase() .

import fnmatch
import os

pattern \= 'FNMATCH\_\*.PY'
print 'Pattern :', pattern
print

files \= os.listdir('.')

for name in files:
    print 'Filename: %-25s %s' % (name, fnmatch.fnmatchcase(name, pattern))

由于我的笔记本使用大小写敏感的文件系统, 所以修改后的模式不匹配任何一个文件.

$ python fnmatch\_fnmatchcase.py
Pattern : FNMATCH\_\*.PY

Filename: .svn False
Filename: \_\_init\_\_.py False
Filename: fnmatch\_filter.py False
Filename: fnmatch\_fnmatch.py False
Filename: fnmatch\_fnmatchcase.py False
Filename: fnmatch\_translate.py False

## 过滤[¶](#id3 "Permalink to this headline")

你可以使用 filter() 来测试一系列的文件名. 它返回匹配模式参数的名字列表.

import fnmatch
import os

pattern \= 'fnmatch\_\*.py'
print 'Pattern :', pattern

files \= os.listdir('.')
print 'Files :', files

print 'Matches :', fnmatch.filter(files, pattern)

在这个例子中, filter() 返回这篇文章中所有示例源文件的名字. #即他们都以fnmatch\_开头.

$ python fnmatch\_filter.py

Pattern : fnmatch\_\*.py
Files : \['.svn', '\_\_init\_\_.py', 'fnmatch\_filter.py', 'fnmatch\_fnmatch.py', 'fnmatch\_fnmatchcase.py', 'fnmatch\_translate.py'\]
Matches : \['fnmatch\_filter.py', 'fnmatch\_fnmatch.py', 'fnmatch\_fnmatchcase.py', 'fnmatch\_translate.py'\]

## 翻译模式[¶](#id4 "Permalink to this headline")

在内部, fnmatch将这种全局模式转换成一个正则式, 然后使用re模块来比较名字和模式. translate() 函数是一个公共API用于将全局模式转换成正则式.

import fnmatch

pattern \= 'fnmatch\_\*.py'
print 'Pattern :', pattern
print 'Regex :', fnmatch.translate(pattern)

Note

为了得到一个有效的表达式，有些特殊字符被转义。

$ python fnmatch\_translate.py
Pattern : fnmatch\_\*.py
Regex : fnmatch\\\_.\*\\.py$
