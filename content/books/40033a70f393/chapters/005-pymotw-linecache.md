-   模块： linecache
-   目的： 从文件或者导入模块中检索文本行, 对结果采用缓冲来提高读文件的效率.
-   python版本： 1.4+

## 描述[¶](#id1 "Permalink to this headline")

python标准库处理python源文件中linecache模块被广泛的使用. 缓冲的实现是读取文件的内容, 并解析成行, 保存在内存的字典中. API 根据索引返回列表中的请求行. 在读取文件和寻找需要的行信息上可以节省一定时间. 这对于从同一个文件中查询多行内容是非常有用的, 比如为一个error report产生trackback.

## 示例[¶](#id2 "Permalink to this headline")

import linecache
import os
import tempfile

我们使用Lorem Ipsum generator产生的文本作为输入样例:

lorem \= '''Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Vivamus eget elit. In posuere mi non risus. Mauris id quam posuere

lectus sollicitudin varius. Praesent at mi. Nunc eu velit. Sed augue
massa, fermentum id, nonummy a, nonummy sit amet, ligula. Curabitur
eros pede, egestas at, ultricies ac, pellentesque eu, tellus.

Sed sed odio sed mi luctus mollis. Integer et nulla ac augue convallis
accumsan. Ut felis. Donec lectus sapien, elementum nec, condimentum ac,
interdum non, tellus. Aenean viverra, mauris vehicula semper porttitor,
ipsum odio consectetuer lorem, ac imperdiet eros odio a sapien. Nulla
mauris tellus, aliquam non, egestas a, nonummy et, erat. Vivamus

sagittis porttitor eros.'''

\# Create a temporary text file with some text in it
fd, temp\_file\_name \= tempfile.mkstemp()

os.close(fd)
f \= open(temp\_file\_name, 'wt')

try:
    f.write(lorem)
finally:
    f.close()

现在我们有了一个可用的临时文件, 让我们更深入一步. 从文件中读取的第5行是单一行. 注意, 在linecache中的行号是从1开始的. 但是我们自己对字符串进行分割, 那么索引号是从0开始. 我们还需要从缓冲中返回的值进行过滤去除换行符.

\# Pick out the same line from source and cache.
\# (Notice that linecache counts from 1)
print 'SOURCE: ', lorem.split('\\n')\[4\]
print 'CACHE : ', linecache.getline(temp\_file\_name, 5).rstrip()

下一步看下, 如果我们需要的行为空将会发生什么.

\# Blank lines include the newline
print '\\nBLANK : "%s"' % linecache.getline(temp\_file\_name, 6)

如果请求的行号超过了文件中有效行号的范围, 那么linecache会返回一个空字符串.

\# The cache always returns a string, and uses
\# an empty string to indicate a line which does
\# not exist.
not\_there \= linecache.getline(temp\_file\_name, 500)
print '\\nNOT THERE: "%s" includes %d characters' %  (not\_there, len(not\_there))

即使这个文件不存在, 模块也不会抛出任何异常.

\# Errors are even hidden if linecache cannot find the file
no\_such\_file \= linecache.getline('this\_file\_does\_not\_exist.txt', 1)
print '\\nNO FILE: ', no\_such\_file

虽然linecache模块经常用在输出tracebacks上, 另一个重要特性是可以通过指定模块名在sys.path中寻找python模块源码. 如果在当前路径中无法找到文件, 那么linecache中的缓冲直接搜索sys.path中的模块.

\# Look for the linecache module, using
\# the built in sys.path search.
module\_line \= linecache.getline('linecache.py', 3)
print '\\nMODULE : ', module\_line

## 示例输出[¶](#id3 "Permalink to this headline")

SOURCE:  eros pede, egestas at, ultricies ac, pellentesque eu, tellus.
CACHE :  eros pede, egestas at, ultricies ac, pellentesque eu, tellus.

BLANK : "
"

NOT THERE: "" includes 0 characters

NO FILE:

MODULE :  This is intended to read lines from modules imported -- hence if a filename
