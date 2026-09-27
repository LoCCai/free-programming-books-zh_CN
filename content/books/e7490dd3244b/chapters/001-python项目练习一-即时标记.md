这是《python基础教程》后面的实践，照着写写，一方面是来熟悉python的代码方式，另一方面是练习使用python中的基本的以及非基本的语法，做到熟能生巧。

这个项目一开始比较简单，不过重构之后就有些复杂了，但是更灵活了。

按照书上所说，重构之后的程序，分为四个模块：处理程序模块，过滤器模块，规则（其实应该是处理规则），语法分析器。

先来说处理程序模块，这个模块的作用有两个，一个是提供那些固定的html标记的输出（每一个标记都有start和end），另一个是对这个标记输出的开始和结束提供了一个友好的访问接口。来看下程序handlers.py：

```
class Handler:
    '''
    '''
    def callback(self, prefix, name, *args):
        method = getattr(self,prefix+name,None)
        if callable(method): return method(*args)
    def start(self, name):
        self.callback('start_', name)
    def end(self, name):
        self.callback('end_', name)
    def sub(self, name):
        def substitution(match):
            result = self.callback('sub_', name, match)
            if result is None: match.group(0)
            return result
        return substitution

class HTMLRenderer(Handler):
    '''

    '''
    def start_document(self):
        print '<html><head><title>...</title></head><body>'
    def end_document(self):
        print '</body></html>'
    def start_paragraph(self):
        print '<p>'
    def end_paragraph(self):
        print '</p>'
    def start_heading(self):
        print '<h2>'
    def end_heading(self):
        print '</h2>'
    def start_list(self):
        print '<ul>'
    def end_list(self):
        print '</ul>'
    def start_listitem(self):
        print '<li>'
    def end_listitem(self):
        print '</li>'
    def start_title(self):
        print '<h1>'
    def end_title(self):
        print '</h1>'
    def sub_emphasis(self, match):
        return '<em>%s</em>' % match.group(1)
    def sub_url(self,  match):
        return '<a href="%s">%s</a>' % (match.group(1),match.group(1))
    def sub_mail(self,  match):
        return '<a href="mailto:%s">%s</a>' % (match.group(1),match.group(1))
    def feed(self, data):
        print data
```

这个程序堪称是整个“项目”的基石所在：提供了标签的输出，以及字符串的替换。理解起来也比较简单。

再来看第二个模块“过滤器”，这个模块更为简单，其实就是一个正则表达式的字符串。相关代码如下：

```
self.addFilter(r'\*(.+?)\*', 'emphasis')
self.addFilter(r'(http://[\.a-z0-9A-Z/]+)', 'url')
self.addFilter(r'([\.a-zA-Z]+@[\.a-zA-Z]+[a-zA-Z]+)','mail')
```

这就是三个过滤器了，分别是：强调牌过滤器（用×号标出的），url牌过滤器，email牌过滤器。熟悉正则表达式的同学理解起来是没有压力的。

再来看第三个模块“规则”，这个模块，抛开那祖父类不说，其他类应该有的两个方法是condition和action，前者是用来判断读进来的字符串是不是符合自家规则，后者是用来执行操作的，所谓的执行操作就是指调用“处理程序模块”，输出前标签、内容、后标签。 来看下这个模块的代码，其实这个里面几个类的关系，画到类图里面看会比较清晰。 rules.py:

```
class Rule:
    def action(self, block, handler):
        handler.start(self.type)
        handler.feed(block)
        handler.end(self.type)
        return True

class HeadingRule(Rule):
    type = 'heading'
    def condition(self, block):
        return not '\n' in block and len(block) <= 70 and not block[-1] == ':'

class TitleRule(HeadingRule):
    type = 'title'
    first = True

    def condition(self, block):
        if not self.first: return False
        self.first = False
        return HeadingRule.condition(self, block)

class ListItemRule(Rule):
    type = 'listitem'
    def condition(self, block):
        return block[0] == '-'
    def action(self,block,handler):
        handler.start(self.type)
        handler.feed(block[1:].strip())
        handler.end(self.type)
        return True

class ListRule(ListItemRule):
    type = 'list'
    inside = False
    def condition(self, block):
        return True
    def action(self,block, handler):
        if not self.inside and ListItemRule.condition(self,block):
            handler.start(self.type)
            self.inside = True
        elif self.inside and not ListItemRule.condition(self,block):
            handler.end(self.type)
            self.inside = False
        return False

class ParagraphRule(Rule):
    type = 'paragraph'
    def condition(self, block):
        return True
```

补充utils.py:

```
def line(file):
    for line in file:yield line
    yield '\n'

def blocks(file):
    block = []
    for line in lines(file):
        if line.strip():
            block.append(line)
        elif block:
            yield ''.join(block).strip()
            block = []
```

最后隆重的来看下“语法分析器模块”，这个模块的作用其实就是协调读入的文本和其他模块的关系。在往重点说就是，提供了两个存放“规则”和“过滤器”的列表，这么做的好处就是使得整个程序的灵活性得到了极大的提高，使得规则和过滤器变成的热插拔的方式，当然这个也归功于前面在写规则和过滤器时每一种类型的规则（过滤器）都单独的写成了一个类，而不是用if..else来区分。 看代码：

```
import sys, re
from handlers import *
from util import *
from rules import *

class Parser:
    def __init__(self,handler):
        self.handler = handler
        self.rules = []
        self.filters = []

    def addRule(self, rule):
        self.rules.append(rule)

    def addFilter(self,pattern,name):
        def filter(block, handler):
            return re.sub(pattern, handler.sub(name),block)
        self.filters.append(filter)

    def parse(self, file):
        self.handler.start('document')
        for block in blocks(file):
            for filter in self.filters:
                block = filter(block, self.handler)
            for rule in self.rules:
                if rule.condition(block):
                    last = rule.action(block, self.handler)
                    if last:break
        self.handler.end('document')

class BasicTextParser(Parser):
    def __init__(self,handler):
        Parser.__init__(self,handler)
        self.addRule(ListRule())
        self.addRule(ListItemRule())
        self.addRule(TitleRule())
        self.addRule(HeadingRule())
        self.addRule(ParagraphRule())

        self.addFilter(r'\*(.+?)\*', 'emphasis')
        self.addFilter(r'(http://[\.a-z0-9A-Z/]+)', 'url')
        self.addFilter(r'([\.a-zA-Z]+@[\.a-zA-Z]+[a-zA-Z]+)','mail')

handler = HTMLRenderer()
parser = BasicTextParser(handler)

parser.parse(sys.stdin)
```

这个模块里面的处理思路是，遍历客户端（也就是程序执行的入口）给插进去的所有的规则和过滤器，来处理读进来的文本。

有一个细节的地方也要说一下，其实是和前面写的呼应一下，就是在遍历规则的时候通过调用condition这个东西来判断是否符合当前规则。

我觉得这个程序很像是命令行模式，有空可以复习一下该模式，以保持记忆网节点的牢固性。

最后说一下我以为的这个程序的用途， 1、用来做代码高亮分析，如果改写成js版的话，可以做一个在线代码编辑器。 2、可以用来学习，供我写博文用。

还有其他的思路，可以留下您的真知灼见。

补充一个类图，很简陋，但是应该能说明之间的关系。另外我还是建议如果看代码捋不清关系最好自己画图，自己画图才能熟悉整个结构。

![关系图](http://www.the5fire.com/wp-content/uploads/2011/12/001.png)
