## 章39. PL/Perl - Perl 过程语言

**目录**

39.1. [PL/Perl 函数和参数](https://www.jinbuguo.com/postgresql/manual/plperl-funcs.html)

39.2. [从 PL/Perl 访问数据库](https://www.jinbuguo.com/postgresql/manual/plperl-database.html)

39.3. [PL/Perl 里的数据值](https://www.jinbuguo.com/postgresql/manual/plperl-data.html)

39.4. [PL/Perl 里的全局变量](https://www.jinbuguo.com/postgresql/manual/plperl-global.html)

39.5. [可信的和不可信的 PL/Perl](https://www.jinbuguo.com/postgresql/manual/plperl-trusted.html)

39.6. [PL/Perl 触发器](https://www.jinbuguo.com/postgresql/manual/plperl-triggers.html)

39.7. [限制及缺少的特性](https://www.jinbuguo.com/postgresql/manual/plperl-missing.html)

PL/Perl 是一种可加载的过程语言，通过它可以用 [Perl 语言](http://www.perl.com)编写 PostgreSQL 函数。

使用 PL/Perl 的优点是允许在函数中大量使用来自 Perl 的处理字符串的操作和函数。PL/pgSQL 很难分析的复杂字符串对 Perl 来说却是小菜一碟。

要在特定数据库里安装 PL/Perl ，使用 createlang plperl _dbname_

> **【提示】**如果某种编程语言安装到 template1 ，那么所有随后创建的数据库都会自动安装这种语言。

> **【注意】**使用源码包的用户必须在安装过程中特别打开 PL/Perl 的编译。请参考[节14.1](https://www.jinbuguo.com/postgresql/manual/install-short.html)获取更多信息。二进制包的用户可能会在一些独立的子包中找到 PL/Perl 。
