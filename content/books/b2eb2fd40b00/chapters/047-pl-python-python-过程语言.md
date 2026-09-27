## 章40. PL/Python - Python 过程语言

**目录**

40.1. [PL/Python 函数](https://www.jinbuguo.com/postgresql/manual/plpython-funcs.html)

40.2. [触发器函数](https://www.jinbuguo.com/postgresql/manual/plpython-trigger.html)

40.3. [数据库访问](https://www.jinbuguo.com/postgresql/manual/plpython-database.html)

PL/Python 过程语言允许用 [Python 语言](http://www.python.org)编写 PostgreSQL 函数。

要在特定数据库里安装 PL/Python ，使用 createlang plpythonu _dbname_

> **【提示】**如果一门语言安装到了 template1 里面，那么所有随后创建的数据库都会自动安装该语言。

到目前为止，PL/Python 只能当作一种"不可信任的"语言(意思是它没有提供任何限制用户可为与不可为的手段)。因此，它被重新命名为 plpythonu 。可信任的 plpython 可能在将来的某个时间能够获得，条件是在 Python 里开发出了新的安全执行机制。

> **【注意】**使用源码包的用户必须在安装过程中声明打开 PL/Python 的编译。二进制包的用户可能会在独立的子包中找到 PL/Python 。
