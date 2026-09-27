唯一因实现困难而放弃维护的项目 Taint，被 Qwen3.8 复活：2亿 Token、406 元、约5小时，完成这个 XSS/注入检测扩展的 PHP8 适配。

最近几天忙里偷闲, 一直在完善taint, 今天我觉得终于算做到了80%的满意了, 根据80:20原则, 我觉得可以做为一个里程碑的版本了 :).  
什么是Taint? An extension used for detecting XSS codes(tainted string), And also can be used to spot sql injection vulnerabilities, shell inject, etc.  
经过我实际测试, [Taint-0.3.0](http://pecl.php.net/package/taint)能检测出实际的一些开源产品的(别问是什么)隐藏的XSS code, SQL注入, Shell注入等漏洞, 并且这些漏洞如果要用静态分析工具去排查, 将会非常困难, 比如对于如下的例子:

<?php
   $name = $\_GET\["name"\];
   $value = strval($\_GET\["tainted"\]);
   echo $$name;

对于请求:

http://\*\*\*\*.com/?name=value&tainted=xxx

静态分析工具, 往往无能为力, 而Taint却可以准确无误的爆出这类型问题.

之前, 小顿和我提过一个想法, 就是从PHP语言层面去分析,找出一些可能的注入漏洞代码. 当时我一来没时间, 而来也确实不知道从何处下手..  
直到上周的时候, 我看到了这个RFC: [RFC:Taint](https://wiki.php.net/rfc/taint).  
但是这个RFC的问题在于, 它需要为PHP打Patch, 修改了PHP本身的数据结构, 这对于以后维护, 升级PHP来说, 很不方便, 也会有一些隐患.  
虽然这样, 但这个RFC却给了我一个启发, 于是我就完成了这样的一个扩展:[Taint Extension](http://pecl.php.net/package/taint)
