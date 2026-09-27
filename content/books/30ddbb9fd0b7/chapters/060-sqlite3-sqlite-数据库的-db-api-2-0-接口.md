**源代码：** [Lib/sqlite3/](https://github.com/python/cpython/tree/3.14/Lib/sqlite3/)

SQLite 是一个 C 语言库，它可以提供一种轻量级的基于磁盘的数据库，这种数据库不需要独立的服务器进程，也允许需要使用一种非标准的 SQL 查询语言来访问它。一些应用程序可以使用 SQLite 作为内部数据存储。可以用它来创建一个应用程序原型，然后再迁移到更大的数据库，比如 PostgreSQL 或 Oracle。

`sqlite3` 模块由 Gerhard Häring 编写。它提供了 [**PEP 249**](https://peps.python.org/pep-0249/) 所描述的符合 DB-API 2.0 规范的 SQL 接口，并需要有第三方的 [SQLite](https://sqlite.org/) 库。

这是一个 [optional module](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module)。如果它在你的 CPython 副本中缺失，请查看你的发行方（也就是说，向你提供 Python 的人）的文档。如果你就是发行方，请参阅 [针对可选模块的要求](https://docs.python.org/zh-cn/3/using/configure.html#optional-module-requirements)。

本文档包括了四个主要部分：

-   [教程](#sqlite3-tutorial) 将教你如何使用 `sqlite3` 模块。
    
-   [参考](#sqlite3-reference) 描述了该模块定义的类与函数。
    
-   [常用方案指引](#sqlite3-howtos) 详细介绍了如何处理一些特定的任务。
    
-   [说明](#sqlite3-explanation) 提供了关于事务控制（transaction control）的更深一步的背景。
    

## 教程[¶](#tutorial "Link to this heading")

在本篇教程中，你将会使用 `sqlite3` 模块的基本功能创建一个存储 Monty Python 的电影作品信息的数据库。本篇教程假定您在阅读前对于数据库的基本概念有所了解，例如 [cursors](https://en.wikipedia.org/wiki/Cursor_\(databases\)) 与 [transactions](https://en.wikipedia.org/wiki/Database_transaction)。

首先，我们需要创建一个新的数据库并打开一个数据库连接以允许 `sqlite3` 通过它来动作。调用 [`sqlite3.connect()`](#sqlite3.connect "sqlite3.connect") 来创建与当前工作目录下 `tutorial.db` 数据库的连接，如果它不存在则会隐式地创建它：

import sqlite3
con \= sqlite3.connect("tutorial.db")

上面的代码中，返回的 [`Connection`](#sqlite3.Connection "sqlite3.Connection") 对象 `con` 代表一个与在磁盘上的数据库（on-disk database）的连接。

为了执行 SQL 语句并且从 SQL 查询中取得结果，我们需要使用游标 (cursor) 。在下面的代码中，我们调用函数 [`con.cursor()`](#sqlite3.Connection.cursor "sqlite3.Connection.cursor") 创建了一个游标 ([`Cursor`](#sqlite3.Cursor "sqlite3.Cursor")) ：

cur \= con.cursor()

通过上面的操作，我们已经得到了与数据库的连接 (connection) 与游标 (cursor) ，现在我们便可以在数据库中创建一张名为 `movie` 的表了，它包括电影名（title，在下方代码中对应“title”）、上映年份（release year，在下方代码中对应“year”）以及电影评分（review score，在下方代码中对应“score”）这三列。在本篇教程中，出于简洁的考虑，我们在创建表的 SQL 语句声明中只列出表头名 (column names) ，而没有像一般的 SQL 语句那样同时声明数据列的对应数据类型 —— 这一点得益于 SQLite 的 [flexible typing](https://www.sqlite.org/flextypegood.html) 特性，它使得我们在使用 SQLite 时，指明数据类型这一项工作是可选的。如下面的代码所示，我们通过调用函数 [`cur.execute(...)`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute") 执行创建表格的 `CREATE TABLE` 语句：

cur.execute("CREATE TABLE movie(title, year, score)")

我们可以通过查询 SQLite 内置的 `sqlite_master` 表以验证新表是否已经创建，本例中，此时该表应该已经包括了一条 `movie` 的表定义（更多内容请参考 [The Schema Table](https://www.sqlite.org/schematab.html)）。下面的代码将通过调用函数 [`cur.execute(...)`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute") 执行查询，把结果赋给 `res`，而后调用 [`res.fetchone()`](#sqlite3.Cursor.fetchone "sqlite3.Cursor.fetchone") 获取结果行：

\>>> res \= cur.execute("SELECT name FROM sqlite\_master")
\>>> res.fetchone()
('movie',)

我们可以看到表已被创建，因为查询结果返回了一个包含表名的 [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple")。如果我们在 `sqlite_master` 中查询一个不存在的表 `spam`，则 `res.fetchone()` 将返回 `None`:

\>>> res \= cur.execute("SELECT name FROM sqlite\_master WHERE name='spam'")
\>>> res.fetchone() is None
True

现在，让我们再次调用 [`cur.execute(...)`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute") 去添加由 SQL 字面量 (literals) 提供的两行数据：

cur.execute("""
    INSERT INTO movie VALUES
        ('Monty Python and the Holy Grail', 1975, 8.2),
        ('And Now for Something Completely Different', 1971, 7.5)
""")

`INSERT` 语句将隐式地创建一个事务，事务需要在将更改保存到数据库前提交 (更多细节请参考 [事务控制](#sqlite3-controlling-transactions))。 我们通过在一个连接对象 (本例中为 `con`) 上调用 [`con.commit()`](#sqlite3.Connection.commit "sqlite3.Connection.commit") 提交事务：

con.commit()

我们可以通过执行一个 `SELECT` 查询以验证数据是否被正确地插入表中。下面的代码中，我们使用我们已经很熟悉的函数 [`cur.execute(...)`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute") 将查询结果赋给 `res`，而后调用 [`res.fetchall()`](#sqlite3.Cursor.fetchall "sqlite3.Cursor.fetchall") 返回所有的结果行：

\>>> res \= cur.execute("SELECT score FROM movie")
\>>> res.fetchall()
\[(8.2,), (7.5,)\]

上面的代码中，结果是一个包含了两个元组 (`tuple`) 的列表 ([`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list")) ，其中每一个元组代表一个数据行，每个数据行都包括该行的 `score` 值。

现在，让我们调用 [`cur.executemany(...)`](#sqlite3.Cursor.executemany "sqlite3.Cursor.executemany") 再插入三行数据：

data \= \[
    ("Monty Python Live at the Hollywood Bowl", 1982, 7.9),
    ("Monty Python's The Meaning of Life", 1983, 7.5),
    ("Monty Python's Life of Brian", 1979, 8.0),
\]
cur.executemany("INSERT INTO movie VALUES(?, ?, ?)", data)
con.commit()  \# 记得在执行 INSERT 之后提交事务。

请注意，占位符 (placeholders) `?` 是用来在查询中绑定数据 `data` 的。 在绑定 Python 的值到 SQL 语句中时，请使用占位符取代 ([字符串格式化](https://docs.python.org/zh-cn/3/tutorial/inputoutput.html#tut-formatting) ) 以避免 [SQL 注入攻击](https://en.wikipedia.org/wiki/SQL_injection) (详情参见 [如何在 SQL 查询中使用占位符来绑定值](#sqlite3-placeholders))。

同样的，我们可以通过执行 `SELECT` 查询验证新的数据行是否已经插入表中，这一次我们将迭代查询的结果：

\>>> for row in cur.execute("SELECT year, title FROM movie ORDER BY year"):
...     print(row)
(1971, 'And Now for Something Completely Different')
(1975, 'Monty Python and the Holy Grail')
(1979, "Monty Python's Life of Brian")
(1982, 'Monty Python Live at the Hollywood Bowl')
(1983, "Monty Python's The Meaning of Life")

如上可见，每一行都是包括 `(year,title)` 这两个元素的元组 ([`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple") ) ，它与我们查询中选中的数据列相匹配。

最后，让我们先通过调用 [`con.close()`](#sqlite3.Connection.close "sqlite3.Connection.close") 关闭现存的与数据库的连接，而后打开一个新的连接、创建一个新的游标、执行一个新的查询以验证我们是否将数据库写入到了本地磁盘上：

\>>> con.close()
\>>> new\_con \= sqlite3.connect("tutorial.db")
\>>> new\_cur \= new\_con.cursor()
\>>> res \= new\_cur.execute("SELECT title, year FROM movie ORDER BY score DESC")
\>>> title, year \= res.fetchone()
\>>> print(f'The highest scoring Monty Python movie is {title!r}, released in {year}')
The highest scoring Monty Python movie is 'Monty Python and the Holy Grail', released in 1975
\>>> new\_con.close()

现在您已经成功地使用模块 `sqlite3` 创建了一个 SQLite 数据库，并且学会了以多种方式往其中插入数据与检索值。

参见

-   阅读 [常用方案指引](#sqlite3-howtos) 以获取更多信息：
    
    -   [如何在 SQL 查询中使用占位符来绑定值](#sqlite3-placeholders)
        
    -   [如何将自定义 Python 类型适配到 SQLite 值](#sqlite3-adapters)
        
    -   [如何将 SQLite 值转换为自定义 Python 类型](#sqlite3-converters)
        
    -   [如何使用连接上下文管理器](#sqlite3-connection-context-manager)
        
    -   [如何创建并使用行工厂对象](#sqlite3-howto-row-factory)
        
-   参阅 [说明](#sqlite3-explanation) 以获取关于事务控制的更深一步的背景。
    

## 参考[¶](#reference "Link to this heading")

### 模块函数[¶](#module-functions "Link to this heading")

sqlite3.connect(_database_, _timeout\=5.0_, _detect\_types\=0_, _isolation\_level\='DEFERRED'_, _check\_same\_thread\=True_, _factory\=sqlite3.Connection_, _cached\_statements\=128_, _uri\=False_, _\*_, _autocommit\=sqlite3.LEGACY\_TRANSACTION\_CONTROL_)[¶](#sqlite3.connect "Link to this definition")

打开一个与 SQLite 数据库的连接。

参数:

-   **database** ([path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object)) -- 要打开的数据库文件的路径。 你可以传入 `":memory:"` 来创建一个 [仅存在于内存中的 SQLite 数据库](https://sqlite.org/inmemorydb.html)，并打开它的一个连接。
    
-   **timeout** ([_float_](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")) -- 当一个表被锁定时连接在最终引发 [`OperationalError`](#sqlite3.OperationalError "sqlite3.OperationalError") 之前应该等待多少秒。 如果另一个连接开启了一个事务来修改一个表，该表将被锁定直到该事务完成提交。默认值为五秒。
    
-   **detect\_types** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- 制是否以及如何查找要转换为 Python 类型的非 [SQLite 原生支持的](#sqlite3-types) 数据类型，将使用通过 [`register_converter()`](#sqlite3.register_converter "sqlite3.register_converter") 注册的转换器。 （使用 `|`，即按位或）将它设为 [`PARSE_DECLTYPES`](#sqlite3.PARSE_DECLTYPES "sqlite3.PARSE_DECLTYPES") 和 [`PARSE_COLNAMES`](#sqlite3.PARSE_COLNAMES "sqlite3.PARSE_COLNAMES") 的任意组合来启用此选项。 如果这两个旗标都已设置则列名将优先于声明的类型。 当为默认值 (`0`) 时，类型检测将被禁用。, type detection is disabled.
    
-   **isolation\_level** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") _|_ _None_) -- 控制旧式的事务处理行为。更多信息请参阅 [`Connection.isolation_level`](#sqlite3.Connection.isolation_level "sqlite3.Connection.isolation_level") 和 [通过 isolation\_level 属性进行事务控制](#sqlite3-transaction-control-isolation-level)。可以为 `\`；或者为 `None` 表示禁止隐式地开启事务。除非 [`Connection.autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 设为 [`LEGACY_TRANSACTION_CONTROL`](#sqlite3.LEGACY_TRANSACTION_CONTROL "sqlite3.LEGACY_TRANSACTION_CONTROL") (默认值) 否则没有任何影响。
    
-   **check\_same\_thread** ([_bool_](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")) -- 如果为 `True` (默认)，则 [`ProgrammingError`](#sqlite3.ProgrammingError "sqlite3.ProgrammingError") 将在数据库连接被它的创建者以外的线程使用时被引发。如果为 `False`，则连接可以在多个线程中被访问；写入操作需要由用户进行序列化以避免数据损坏。请参阅 [`threadsafety`](#sqlite3.threadsafety "sqlite3.threadsafety") 了解详情。
    
-   **factory** ([_Connection_](#sqlite3.Connection "sqlite3.Connection")) -- 如果您不想使用默认的 [`Connection`](#sqlite3.Connection "sqlite3.Connection") 类创建连接，那么您可以通过传入一个自定义的 `Connection` 类的子类给该参数以创建连接。
    
-   **cached\_statements** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- 该参数指明 `sqlite3` 模块应该为该连接进行内部缓存的语句 (statements) 数量。默认情况下，它的值为 128。
    
-   **uri** ([_bool_](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")) -- 如果将该参数的值设置为 `True`，参数 _database_ 将会被解释为一个由文件路径与可选的查询字符串组成的 URI 链接。 链接的前缀协议部分 _必需_ 为 `"file:"`，后面的文件路径可以是相对路径或绝对路径。 查询字符串允许向 SQLite 传递参数，以实现不同的 [如何使用 SQLite URI](#sqlite3-uri-tricks)。
    
-   **autocommit** ([_bool_](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")) -- 控制 [**PEP 249**](https://peps.python.org/pep-0249/) 事务处理行为。更多信息参见 [`Connection.autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 和 [通过 autocommit 属性进行事务控制](#sqlite3-transaction-control-autocommit)。 _autocommit_ 目前默认值为 [`LEGACY_TRANSACTION_CONTROL`](#sqlite3.LEGACY_TRANSACTION_CONTROL "sqlite3.LEGACY_TRANSACTION_CONTROL")。在未来的 Python 版本中默认值将变为 `False`.
    

返回类型:

[_Connection_](#sqlite3.Connection "sqlite3.Connection")

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `sqlite3.connect` 并附带参数 `database`。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `sqlite3.connect/handle` 并附带参数 `connection_handle`.

在 3.4 版本发生变更: 增加了 _uri_ 参数。

在 3.10 版本发生变更: 增加了 `sqlite3.connect/handle` 审计事件。

在 3.12 版本发生变更: 增加了 _autocommit_ 形参。

在 3.13 版本发生变更: Positional use of the parameters _timeout_, _detect\_types_, _isolation\_level_, _check\_same\_thread_, _factory_, _cached\_statements_, and _uri_ is deprecated. They will become keyword-only parameters in Python 3.15.

sqlite3.complete\_statement(_statement_)[¶](#sqlite3.complete_statement "Link to this definition")

如果传入的字符串语句 (statement) 看起来像是包括一条或多条完整的 SQL 语句，那么该函数将返回 `True` 。请注意，除了检查未封闭的字符串字面 (unclosed string literals) 以及语句是否以分号结束外，它不会执行任何的语法检查 (syntactic verification) 与语法解析 (synatatic parsing) 。

例如：

\>>> sqlite3.complete\_statement("SELECT foo FROM bar;")
True
\>>> sqlite3.complete\_statement("SELECT foo")
False

该函数可能在这样的情形下非常有用：在通过命令行 (command-line) 输入数据时，可使用该函数判断输入文本是否可以构成一个完整的 SQL 语句，或者判断在调用函数 [`execute()`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute") 前是否还需要额外的输入。

请参阅 [Lib/sqlite3/\_\_main\_\_.py](https://github.com/python/cpython/tree/3.14/Lib/sqlite3/__main__.py) 中的 `runsource()` 了解实际使用情况。

sqlite3.enable\_callback\_tracebacks(_flag_, _/_)[¶](#sqlite3.enable_callback_tracebacks "Link to this definition")

是否启用回调回溯 (callback tracebacks) 。默认情况下，在 SQLite 中，您不会在用户定义的函数、聚合函数 (aggregates) 、转换函数 (converters) 、验证回调函数 (authorizer callbacks) 等中得到任何回溯信息。如果您想调试它们，您可以在将形式参数 _flag_ 设置为 `True` 的情况下调用该函数。之后您便可以从 [`sys.stderr`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stderr "sys.stderr") 的回调中得到回溯信息。使用 `False` 将再次禁用该功能。

备注

用户自定义函数回调中的错误将被记录为不可引发的异常。请使用 [`不可引发的钩子处理器`](https://docs.python.org/zh-cn/3/library/sys.html#sys.unraisablehook "sys.unraisablehook") 执行对失败回调的内省。

sqlite3.register\_adapter(_type_, _adapter_, _/_)[¶](#sqlite3.register_adapter "Link to this definition")

注册 _adapter_ [callable](https://docs.python.org/zh-cn/3/glossary.html#term-callable) 以将 Python 类型 _type_ 适配为一个 SQLite 类型。 该适配器在调用时会传入一个 _type_ 类型的 Python 对象作为其唯一参数，并且必须返回一个 [SQLite 原生支持的类型](#sqlite3-types) 的值。

sqlite3.register\_converter(_typename_, _converter_, _/_)[¶](#sqlite3.register_converter "Link to this definition")

注册 _converter_ [callable](https://docs.python.org/zh-cn/3/glossary.html#term-callable) 以将 _typename_ 类型的 SQLite 对象转换为一个特定类型的 Python 对象。转换器会针对所有类型为 _typename_ 的 SQLite 值唤起；它会传递一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象并且应该返回一个所需的 Python 类型的对象。请参阅 [`connect()`](#sqlite3.connect "sqlite3.connect") 的 _detect\_types_ 形参了解有关类型检测工作方式的详情。

注：_typename_ 以及您在查询中使用的类型名是不大小写敏感的。

### 模块常量[¶](#module-constants "Link to this heading")

sqlite3.LEGACY\_TRANSACTION\_CONTROL[¶](#sqlite3.LEGACY_TRANSACTION_CONTROL "Link to this definition")

将 [`autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 设为该常量以选择旧式（Python 3.12 之前）事务控制行为。更多信息请参阅 [通过 isolation\_level 属性进行事务控制](#sqlite3-transaction-control-isolation-level).

sqlite3.PARSE\_DECLTYPES[¶](#sqlite3.PARSE_DECLTYPES "Link to this definition")

将这个旗标值传递给 [`connect()`](#sqlite3.connect "sqlite3.connect") 的 _detect\_types_ 形参，以使用创建数据库表时为每列声明的类型的查找转换器函数。`sqlite3` 将使用声明类型的第一个单词作为转换字典键来查找转换函数。例如：

CREATE TABLE test(
   i integer primary key,  ! will look up a converter named "integer"
   p point,                ! will look up a converter named "point"
   n number(10)            ! will look up a converter named "number"
 )

此旗标可以使用 `|` (按位或) 运算符与 [`PARSE_COLNAMES`](#sqlite3.PARSE_COLNAMES "sqlite3.PARSE_COLNAMES") 组合。

备注

生成的字段 (例如 `MAX(p)`) 将作为 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 返回。使用 `PARSE_COLNAMES` 为这样的查询设置类型。

sqlite3.PARSE\_COLNAMES[¶](#sqlite3.PARSE_COLNAMES "Link to this definition")

将这个旗标值传递给 [`connect()`](#sqlite3.connect "sqlite3.connect") 的 _detect\_types_ 形参以使用类型名称来查找转换器函数，类型名称解析自查询列名，将作为转换器字典键。 查询列名必须包装在双引号 (`"`) 中而类型名称必须包装在方括号 (`[]`) 中。

SELECT MAX(p) as "p \[point\]" FROM test;  ! will look up converter "point"

此旗标可以使用 `|` (按位或) 运算符与 [`PARSE_DECLTYPES`](#sqlite3.PARSE_DECLTYPES "sqlite3.PARSE_DECLTYPES") 组合。

sqlite3.SQLITE\_OK[¶](#sqlite3.SQLITE_OK "Link to this definition")

sqlite3.SQLITE\_DENY[¶](#sqlite3.SQLITE_DENY "Link to this definition")

sqlite3.SQLITE\_IGNORE[¶](#sqlite3.SQLITE_IGNORE "Link to this definition")

应当由传给 [`Connection.set_authorizer()`](#sqlite3.Connection.set_authorizer "sqlite3.Connection.set_authorizer") 的 _authorizer\_callback_ [callable](https://docs.python.org/zh-cn/3/glossary.html#term-callable) 返回的旗标，用于指明是否：

-   访问被允许 (`SQLITE_OK`)。
    
-   SQL 语句附带异常的执行失败 (`SQLITE_DENY`)。
    
-   该列应被视为 NULL (`SQLITE_IGNORE`)。
    

sqlite3.apilevel[¶](#sqlite3.apilevel "Link to this definition")

指明所支持的 DB-API 级别的字符串常量。 根据 DB-API 的需要设置。 硬编码为 `"2.0"`。

sqlite3.paramstyle[¶](#sqlite3.paramstyle "Link to this definition")

指明 `sqlite3` 模块所预期的形参标记格式化类型。 根据 DB-API 的需要设置。 硬编码为 `"qmark"`。

备注

`named` DB-API 形参风格也受到支持。

sqlite3.sqlite\_version[¶](#sqlite3.sqlite_version "Link to this definition")

以 [`字符串`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 表示的运行时 SQLite 库版本号。

sqlite3.sqlite\_version\_info[¶](#sqlite3.sqlite_version_info "Link to this definition")

以 [`整数`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple") 表示的运行时 SQLite 库版本号。

sqlite3.threadsafety[¶](#sqlite3.threadsafety "Link to this definition")

DB-API 2.0 所要求的整数常量，指明 `sqlite3` 模块支持的线程安全级别。该属性将基于编译下层 SQLite 库所使用的默认 [线程模式](https://sqlite.org/threadsafe.html) 来设置。SQLite 的线程模式有：

1.  **Single-thread**: 在此模式下，所有的互斥都被禁用并且 SQLite 同时在多个线程中使用将是不安全的。
    
2.  **Multi-thread**: 在此模式下，只要单个数据库连接没有被同时用于两个或多个线程之中 SQLite 就可以安全地被多个线程所使用。
    
3.  **Serialized**: 在序列化模式下，SQLite 可以安全地被多个线程所使用而没有额外的限制。
    

从 SQLite 线程模式到 DB-API 2.0 线程安全级别的映射关系如下：

| 
SQLite 线程模式

 | 

[**threadsafety**](https://peps.python.org/pep-0249/#threadsafety)

 | 

[SQLITE\_THREADSAFE](https://sqlite.org/compile.html#threadsafe)

 | 

DB-API 2.0 含义

 |
| --- | --- | --- | --- |
| 

single-thread

 | 

0

 | 

0

 | 

各个线程不能共享模块

 |
| 

multi-thread

 | 

1

 | 

2

 | 

线程可以共享模块，但不能共享连接

 |
| 

serialized

 | 

3

 | 

1

 | 

线程可以共享模块、连接和游标

 |

在 3.11 版本发生变更: 动态设置 _threadsafety_ 而不是将其硬编码为 `1`。

sqlite3.SQLITE\_DBCONFIG\_DEFENSIVE[¶](#sqlite3.SQLITE_DBCONFIG_DEFENSIVE "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_DQS\_DDL[¶](#sqlite3.SQLITE_DBCONFIG_DQS_DDL "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_DQS\_DML[¶](#sqlite3.SQLITE_DBCONFIG_DQS_DML "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_ENABLE\_FKEY[¶](#sqlite3.SQLITE_DBCONFIG_ENABLE_FKEY "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_ENABLE\_FTS3\_TOKENIZER[¶](#sqlite3.SQLITE_DBCONFIG_ENABLE_FTS3_TOKENIZER "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_ENABLE\_LOAD\_EXTENSION[¶](#sqlite3.SQLITE_DBCONFIG_ENABLE_LOAD_EXTENSION "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_ENABLE\_QPSG[¶](#sqlite3.SQLITE_DBCONFIG_ENABLE_QPSG "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_ENABLE\_TRIGGER[¶](#sqlite3.SQLITE_DBCONFIG_ENABLE_TRIGGER "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_ENABLE\_VIEW[¶](#sqlite3.SQLITE_DBCONFIG_ENABLE_VIEW "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_LEGACY\_ALTER\_TABLE[¶](#sqlite3.SQLITE_DBCONFIG_LEGACY_ALTER_TABLE "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_LEGACY\_FILE\_FORMAT[¶](#sqlite3.SQLITE_DBCONFIG_LEGACY_FILE_FORMAT "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_NO\_CKPT\_ON\_CLOSE[¶](#sqlite3.SQLITE_DBCONFIG_NO_CKPT_ON_CLOSE "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_RESET\_DATABASE[¶](#sqlite3.SQLITE_DBCONFIG_RESET_DATABASE "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_TRIGGER\_EQP[¶](#sqlite3.SQLITE_DBCONFIG_TRIGGER_EQP "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_TRUSTED\_SCHEMA[¶](#sqlite3.SQLITE_DBCONFIG_TRUSTED_SCHEMA "Link to this definition")

sqlite3.SQLITE\_DBCONFIG\_WRITABLE\_SCHEMA[¶](#sqlite3.SQLITE_DBCONFIG_WRITABLE_SCHEMA "Link to this definition")

这些常量被用于 [`Connection.setconfig()`](#sqlite3.Connection.setconfig "sqlite3.Connection.setconfig") 和 [`getconfig()`](#sqlite3.Connection.getconfig "sqlite3.Connection.getconfig") 方法。

这些常量的可用性会根据 Python 编译时使用的 SQLite 版本而发生变化。

Added in version 3.12.

从 3.12 版起已弃用，已在 3.14 版中移除: `version` 和 `version_info` 常量。

### 连接对象[¶](#connection-objects "Link to this heading")

_class_ sqlite3.Connection[¶](#sqlite3.Connection "Link to this definition")

每个打开的 SQLite 数据库均以 `Connection` 对象来表示，这种对象是使用 [`sqlite3.connect()`](#sqlite3.connect "sqlite3.connect") 创建的。 它们的主要目的是创建 [`Cursor`](#sqlite3.Cursor "sqlite3.Cursor") 对象，以及 [事务控制](#sqlite3-controlling-transactions)。

在 3.13 版本发生变更: 如果未在 `Connection` 对象被删除前调用 [`close()`](#sqlite3.Connection.close "sqlite3.Connection.close") 则会发出 [`ResourceWarning`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ResourceWarning "ResourceWarning").

SQLite 数据库连接对象有如下的属性和方法：

cursor(_factory\=Cursor_)[¶](#sqlite3.Connection.cursor "Link to this definition")

创建并返回 [`Cursor`](#sqlite3.Cursor "sqlite3.Cursor") 对象。cursor 方法接受一个可选参数 _factory_。如果提供了这个参数，它必须是一个 [callable](https://docs.python.org/zh-cn/3/glossary.html#term-callable) 并且返回 `Cursor` 或其子类的实例。

blobopen(_table_, _column_, _rowid_, _/_, _\*_, _readonly\=False_, _name\='main'_)[¶](#sqlite3.Connection.blobopen "Link to this definition")

打开一个 [`Blob`](#sqlite3.Blob "sqlite3.Blob") 句柄指向现有的 BLOB。

参数:

-   **table** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) -- 二进制大对象 blob 所在表的名称。
    
-   **column** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) -- 二进制大对象 blob 所在表的列名。
    
-   **rowid** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- blob 所在的行 ID。
    
-   **readonly** ([_bool_](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")) -- 如果 blob 应当不带写入权限打开则设为 `True`。默认为 `False`。
    
-   **name** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) -- 二进制大对象 blob 所在的数据库名。 默认为 `"main"`。
    

抛出:

[**OperationalError**](#sqlite3.OperationalError "sqlite3.OperationalError") -- 当尝试打开 `WITHOUT ROWID` 的表中的某个 blob 时。

返回类型:

[Blob](#sqlite3.Blob "sqlite3.Blob")

备注

blob 的大小无法使用 [`Blob`](#sqlite3.Blob "sqlite3.Blob") 类来修改。可使用 SQL 函数 `zeroblob` 来创建固定大小的 blob。

Added in version 3.11.

commit()[¶](#sqlite3.Connection.commit "Link to this definition")

向数据库提交任何待处理事务。如果 [`autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 为 `True`，或者没有已开启的事务，则此方法不会做任何操作。如果 `autocommit` 为 `False`，则如果有一个待处理事务被此方法提交则会隐式地开启一个新事务。

rollback()[¶](#sqlite3.Connection.rollback "Link to this definition")

回滚到任何待处理事务的起始位置。如果 [`autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 为 `True`，或者没有已开启的事务，则此方法不会做任何操作。如果 `autocommit` 为 `False`，则如果此方法回滚了一个待处理事务则会隐式地开启一个新事务。

close()[¶](#sqlite3.Connection.close "Link to this definition")

关闭数据库连接。如果 [`autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 为 `False`，则任何待处理事务都会被隐式地回滚。如果 `autocommit` 为 `True` 或 [`LEGACY_TRANSACTION_CONTROL`](#sqlite3.LEGACY_TRANSACTION_CONTROL "sqlite3.LEGACY_TRANSACTION_CONTROL")，则不会执行隐式的事务控制。请确保在关闭之前 [`commit()`](#sqlite3.Connection.commit "sqlite3.Connection.commit") 以避免丢失待处理的更改。

execute(_sql_, _parameters\=()_, _/_)[¶](#sqlite3.Connection.execute "Link to this definition")

创建一个新的 [`Cursor`](#sqlite3.Cursor "sqlite3.Cursor") 对象，并在其上使用给出的 _sql_ 和 _parameters_ 调用 [`execute()`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute")。返回新的游标对象。

executemany(_sql_, _parameters_, _/_)[¶](#sqlite3.Connection.executemany "Link to this definition")

创建一个新的 [`Cursor`](#sqlite3.Cursor "sqlite3.Cursor") 对象，并在其上使用给出的 _sql_ 和 _parameters_ 调用 [`executemany()`](#sqlite3.Cursor.executemany "sqlite3.Cursor.executemany")。返回新的游标对象。

executescript(_sql\_script_, _/_)[¶](#sqlite3.Connection.executescript "Link to this definition")

创建一个新的 [`Cursor`](#sqlite3.Cursor "sqlite3.Cursor") 对象，并在其上使用给出的 _sql\_script_ 调用 [`executescript()`](#sqlite3.Cursor.executescript "sqlite3.Cursor.executescript")。返回新的游标对象。

create\_function(_name_, _narg_, _func_, _\*_, _deterministic\=False_)[¶](#sqlite3.Connection.create_function "Link to this definition")

创建或移除用户定义的 SQL 函数。

参数:

-   **name** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) -- SQL 函数的名称。
    
-   **narg** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- SQL 函数可接受的参数数量，如果是 `-1`，则该函数可以接受任意数量的参数。
    
-   **func** ([callback](https://docs.python.org/zh-cn/3/glossary.html#term-callback) | None) -- 当该 SQL 函数被唤起时将会调用的 [callable](https://docs.python.org/zh-cn/3/glossary.html#term-callable)。该可调用对象必须返回 [一个 SQLite 原生支持的类型](#sqlite3-types)。设为 `None` 将移除现有的 SQL 函数。
    
-   **deterministic** ([_bool_](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")) -- 如为 `True`，创建的 SQL 函数将被标记为 [deterministic](https://sqlite.org/deterministic.html)，这允许 SQLite 执行额外的优化。
    

在 3.8 版本发生变更: 增加了 _deterministic_ 形参。

示例：

\>>> import hashlib
\>>> def md5sum(t):
...     return hashlib.md5(t).hexdigest()
\>>> con \= sqlite3.connect(":memory:")
\>>> con.create\_function("md5", 1, md5sum)
\>>> for row in con.execute("SELECT md5(?)", (b"foo",)):
...     print(row)
('acbd18db4cc2f85cedef654fccc4a4d8',)
\>>> con.close()

在 3.13 版本发生变更: Passing _name_, _narg_, and _func_ as keyword arguments is deprecated. These parameters will become positional-only in Python 3.15.

create\_aggregate(_name_, _n\_arg_, _aggregate\_class_)[¶](#sqlite3.Connection.create_aggregate "Link to this definition")

创建或移除用户自定义的 SQL 聚合函数。

参数:

-   **name** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) -- SQL 聚合函数的名称。
    
-   **n\_arg** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- SQL 聚合函数可接受的参数数量。如为 `-1`，则可以接受任意数量的参数。
    
-   **aggregate\_class** ([class](https://docs.python.org/zh-cn/3/glossary.html#term-class) | None) -- 一个类必须实现下列方法： \* `step()`: 向聚合添加一行。 \* `finalize()`: 将聚合的最终结果作为 [一个 SQLite 原生支持的类型](#sqlite3-types) 返回。`step()` 方法需要接受的参数数量是由 _n\_arg_ 控制的。设为 `None` 将移除现有的 SQL 聚合函数。
    

示例：

class MySum:
    def \_\_init\_\_(self):
        self.count \= 0

    def step(self, value):
        self.count += value

    def finalize(self):
        return self.count

con \= sqlite3.connect(":memory:")
con.create\_aggregate("mysum", 1, MySum)
cur \= con.execute("CREATE TABLE test(i)")
cur.execute("INSERT INTO test(i) VALUES(1)")
cur.execute("INSERT INTO test(i) VALUES(2)")
cur.execute("SELECT mysum(i) FROM test")
print(cur.fetchone()\[0\])

con.close()

在 3.13 版本发生变更: Passing _name_, _n\_arg_, and _aggregate\_class_ as keyword arguments is deprecated. These parameters will become positional-only in Python 3.15.

create\_window\_function(_name_, _num\_params_, _aggregate\_class_, _/_)[¶](#sqlite3.Connection.create_window_function "Link to this definition")

创建或移除用户定义的聚合窗口函数。

参数:

-   **name** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) -- 要创建或移除的 SQL 聚合窗口函数的名称。
    
-   **num\_params** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- SQL 聚合窗口函数可接受的参数数量。如为 `-1`，则可以接受任意数量的参数。
    
-   **aggregate\_class** ([class](https://docs.python.org/zh-cn/3/glossary.html#term-class) | None) -- 一个必须实现下列方法的类： \* `step()`: 向当前窗口添加一行。 \* `value()`: 返回聚合的当前值。 \* `inverse()`: 从当前窗口移除一行。 \* `finalize()`: 将聚合的最终结果作为 [一个 SQLite 原生支持的类型](#sqlite3-types) 返回。`step()` 和 `value()` 方法需要接受的参数数量是由 _num\_params_ 控制的。设为 `None` 将移除现有的 SQL 聚合窗口函数。
    

抛出:

[**NotSupportedError**](#sqlite3.NotSupportedError "sqlite3.NotSupportedError") -- 如果在早于 SQLite 3.25.0，不支持聚合窗口函数的版本上使用。

Added in version 3.11.

示例：

\# 来自 https://www.sqlite.org/windowfunctions.html#udfwinfunc 的示例
class WindowSumInt:
    def \_\_init\_\_(self):
        self.count \= 0

    def step(self, value):
        """添加一行到当前窗口。"""
        self.count += value

    def value(self):
        """返回聚合的当前值。"""
        return self.count

    def inverse(self, value):
        """从当前窗口移除一行。"""
        self.count \-= value

    def finalize(self):
        """返回聚合的最终值。

        任何清理动作都应放在此处。
        """
        return self.count

con \= sqlite3.connect(":memory:")
cur \= con.execute("CREATE TABLE test(x, y)")
values \= \[
    ("a", 4),
    ("b", 5),
    ("c", 3),
    ("d", 8),
    ("e", 1),
\]
cur.executemany("INSERT INTO test VALUES(?, ?)", values)
con.create\_window\_function("sumint", 1, WindowSumInt)
cur.execute("""
    SELECT x, sumint(y) OVER (
        ORDER BY x ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ) AS sum\_y
    FROM test ORDER BY x
""")
print(cur.fetchall())
con.close()

create\_collation(_name_, _callable_, _/_)[¶](#sqlite3.Connection.create_collation "Link to this definition")

使用排序函数 _callable_ 创建一个名为 _name_ 的排序规则。 _callable_ 被传递给两个 [`字符串`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 参数，并且它应该返回一个 [`整数`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")。

-   如果前者的排序高于后者则为 `1`
    
-   如果前者的排序低于后者则为 `-1`
    
-   如果它们的顺序相同则为 `0`
    

下面的例子显示了一个反向排序的排序方法：

def collate\_reverse(string1, string2):
    if string1 \== string2:
        return 0
    elif string1 < string2:
        return 1
    else:
        return \-1

con \= sqlite3.connect(":memory:")
con.create\_collation("reverse", collate\_reverse)

cur \= con.execute("CREATE TABLE test(x)")
cur.executemany("INSERT INTO test(x) VALUES(?)", \[("a",), ("b",)\])
cur.execute("SELECT x FROM test ORDER BY x COLLATE reverse")
for row in cur:
    print(row)
con.close()

通过将 _callable_ 设为 `None` 来移除一个排序规则函数。

在 3.11 版本发生变更: 排序规则的名称可以包含任意 Unicode 字符。在之前，只允许 ASCII 字符。

interrupt()[¶](#sqlite3.Connection.interrupt "Link to this definition")

从其他的线程调用此方法以中止可能正在连接上执行的任何查询。被中止的查询将引发 [`OperationalError`](#sqlite3.OperationalError "sqlite3.OperationalError")。

注册 [callable](https://docs.python.org/zh-cn/3/glossary.html#term-callable) _authorizer\_callback_ 用于在每次尝试访问数据库中表的某一列时被唤起。该回调应当返回 [`SQLITE_OK`](#sqlite3.SQLITE_OK "sqlite3.SQLITE_OK")、[`SQLITE_DENY`](#sqlite3.SQLITE_DENY "sqlite3.SQLITE_DENY") 或 [`SQLITE_IGNORE`](#sqlite3.SQLITE_IGNORE "sqlite3.SQLITE_IGNORE") 中的一个以提示下层 SQLite 库应当如何处理对该列的访问。

该回调的第一个参数指明哪种操作将被授权。第二个和第三个参数根据第一个参数的具体值将为传给操作的参数或为 `None`。 第四个参数如果适用则为数据库名称（"main", "temp" 等）。 第五个参数是负责尝试访问的最内层触发器或视图的名称或者如果该尝试访问是直接来自输入的 SQL 代码的话则为 `None`。

请参阅 SQLite 文档了解第一个参数可能的值以及依赖于第一个参数的第二个和第三个参数的含义。所有必需的常量均在 `sqlite3` 模块中可用。

将 `None` 作为 _authorizer\_callback_ 传入将禁用授权回调。

在 3.11 版本发生变更: 增加对使用 `None` 禁用授权回调的支持。

在 3.13 版本发生变更: Passing _authorizer\_callback_ as a keyword argument is deprecated. The parameter will become positional-only in Python 3.15.

set\_progress\_handler(_progress\_handler_, _n_)[¶](#sqlite3.Connection.set_progress_handler "Link to this definition")

注册 [callable](https://docs.python.org/zh-cn/3/glossary.html#term-callable) _progress\_handler_ 以针对 SQLite 虚拟机的每 _n_ 条指令被唤起。 如果你想要在长时间运行的操作，例如更新 GUI 期间获得来自 SQLite 的调用这将很有用处。

如果你想清除任何先前安装的进度处理器，可在调用该方法时传入 `None` 作为 _progress\_handler_。

从处理函数返回非零值将终止当前正在执行的查询并导致它引发 [`DatabaseError`](#sqlite3.DatabaseError "sqlite3.DatabaseError") 异常。

在 3.13 版本发生变更: Passing _progress\_handler_ as a keyword argument is deprecated. The parameter will become positional-only in Python 3.15.

set\_trace\_callback(_trace\_callback_)[¶](#sqlite3.Connection.set_trace_callback "Link to this definition")

注册 [callable](https://docs.python.org/zh-cn/3/glossary.html#term-callable) _trace\_callback_ 以针对 SQLite 后端实际执行的每条 SQL 语句被唤起。

传给该回调的唯一参数是被执行的语句 (作为 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str"))。回调的返回值将被忽略。请注意后端不仅会运行传给 [`Cursor.execute()`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute") 方法的语句。其他来源还包括 `sqlite3` 模块的 [事务管理](#sqlite3-controlling-transactions) 以及在当前数据库中定义的触发器的执行。

传入 `None` 作为 _trace\_callback_ 将禁用追踪回调。

备注

在跟踪回调中产生的异常不会被传播。作为开发和调试的辅助手段，使用 [`enable_callback_tracebacks()`](#sqlite3.enable_callback_tracebacks "sqlite3.enable_callback_tracebacks") 来启用打印跟踪回调中产生的异常的回调。

Added in version 3.3.

在 3.13 版本发生变更: Passing _trace\_callback_ as a keyword argument is deprecated. The parameter will become positional-only in Python 3.15.

enable\_load\_extension(_enabled_, _/_)[¶](#sqlite3.Connection.enable_load_extension "Link to this definition")

如果 _enabled_ 为 `True` 则允许 SQLite 从共享库加载 SQLite 扩展；否则，不允许加载 SQLite 扩展。 SQLite 扩展可以定义新的函数、聚合或全新的虚拟表实现。一个知名的扩展是与随同 SQLite 一起分发的全文搜索扩展。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `sqlite3.enable_load_extension` 并附带参数 `connection`, `enabled`.

Added in version 3.2.

在 3.10 版本发生变更: 增加了 `sqlite3.enable_load_extension` 审计事件。

con.enable\_load\_extension(True)

\# 加载 fts (fulltext search) 扩展
con.execute("select load\_extension('./fts3.so')")

\# 你也可以使用 API 调用来加载该扩展：
\# con.load\_extension("./fts3.so")

\# 禁止扩展再次加载
con.enable\_load\_extension(False)

\# 来自 SQLite wiki 的示例
con.execute("CREATE VIRTUAL TABLE recipe USING fts3(name, ingredients)")
con.executescript("""
    INSERT INTO recipe (name, ingredients) VALUES('broccoli stew', 'broccoli peppers cheese tomatoes');
    INSERT INTO recipe (name, ingredients) VALUES('pumpkin stew', 'pumpkin onions garlic celery');
    INSERT INTO recipe (name, ingredients) VALUES('broccoli pie', 'broccoli cheese onions flour');
    INSERT INTO recipe (name, ingredients) VALUES('pumpkin pie', 'pumpkin sugar flour butter');
    """)
for row in con.execute("SELECT rowid, name, ingredients FROM recipe WHERE name MATCH 'pie'"):
    print(row)

load\_extension(_path_, _/_, _\*_, _entrypoint\=None_)[¶](#sqlite3.Connection.load_extension "Link to this definition")

从共享库加载 SQLite 扩展。请在调用此方法前通过 [`enable_load_extension()`](#sqlite3.Connection.enable_load_extension "sqlite3.Connection.enable_load_extension") 来启用扩展加载。

参数:

-   **path** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) -- SQLite 扩展的路径。
    
-   **entrypoint** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") _|_ _None_) -- 入口点名称。如果为 `None` (默认值)，SQLite 将自行生成入口点名称；请参阅 SQLite 文档 [Loading an Extension](https://www.sqlite.org/loadext.html#loading_an_extension) 了解详情。
    

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `sqlite3.load_extension` 并附带参数 `connection`, `path`.

Added in version 3.2.

在 3.10 版本发生变更: 增加了 `sqlite3.load_extension` 审计事件。

在 3.12 版本发生变更: 增加了 _entrypoint_ 形参。

iterdump(_\*_, _filter\=None_)[¶](#sqlite3.Connection.iterdump "Link to this definition")

返回一个 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator) 用来将数据库转储为 SQL 源代码。在保存内存数据库以便将来恢复时很有用处。类似于 **sqlite3** shell 中的 `.dump` 命令。

参数:

**filter** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") _|_ _None_) -- 可选的 `LIKE` 模式用于确定要转储的数据库对象，例如 `prefix_%`。如为 `None` (默认值)，则将包括所有数据库对象。

示例：

\# 将文件 example.db 转换为 SQL 转储文件 dump.sql
con \= sqlite3.connect('example.db')
with open('dump.sql', 'w') as f:
    for line in con.iterdump():
        f.write('%s\\n' % line)
con.close()

在 3.13 版本发生变更: 添加了 _filter_ 形参。

backup(_target_, _\*_, _pages\=\-1_, _progress\=None_, _name\='main'_, _sleep\=0.250_)[¶](#sqlite3.Connection.backup "Link to this definition")

创建 SQLite 数据库的备份。

即使数据库是通过其他客户端访问或通过同一连接并发访问也是有效的。

参数:

-   **target** ([_Connection_](#sqlite3.Connection "sqlite3.Connection")) -- 用于保存备份的数据库连接。
    
-   **pages** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- 每次要拷贝的页数。如果小于等于 `0`，则一次性拷贝整个数据库。默认为 `-1`。
    
-   **progress** ([callback](https://docs.python.org/zh-cn/3/glossary.html#term-callback) | None) -- 如果设为一个 [callable](https://docs.python.org/zh-cn/3/glossary.html#term-callable)，它将针对每次备份迭代附带三个整数参数被唤起：上次迭代的状态 _status_，待拷贝的剩余页数 _remaining_，以及总页数 _total_。默认值为 `None`。
    
-   **name** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) -- 要备份的数据库名称。可能为代表主数据库的 `\ DATABASE` SQL 语句所附加的自定义数据库名称。
    
-   **sleep** ([_float_](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")) -- 连续尝试备份剩余页所要间隔的休眠秒数。
    

示例 1，将现有数据库拷贝至另一个数据库：

def progress(status, remaining, total):
    print(f'已复制 {total} 页中的 {total\-remaining} 页……')

src \= sqlite3.connect('example.db')
dst \= sqlite3.connect('backup.db')
with dst:
    src.backup(dst, pages\=1, progress\=progress)
dst.close()
src.close()

示例 2，将现有数据库拷贝至一个临时副本：

src \= sqlite3.connect('example.db')
dst \= sqlite3.connect(':memory:')
src.backup(dst)
dst.close()
src.close()

Added in version 3.7.

getlimit(_category_, _/_)[¶](#sqlite3.Connection.getlimit "Link to this definition")

获取一个连接的运行时限制。

参数:

**category** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- 要查询的 [SQLite limit category](https://www.sqlite.org/c3ref/c_limit_attached.html)。

返回类型:

[int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

抛出:

[**ProgrammingError**](#sqlite3.ProgrammingError "sqlite3.ProgrammingError") -- 如果 _category_ 不能被下层的 SQLite 库所识别。

示例，查询 [`Connection`](#sqlite3.Connection "sqlite3.Connection") `con` 上一条 SQL 语句的最大长度（默认值为 1000000000）:

\>>> con.getlimit(sqlite3.SQLITE\_LIMIT\_SQL\_LENGTH)
1000000000

Added in version 3.11.

setlimit(_category_, _limit_, _/_)[¶](#sqlite3.Connection.setlimit "Link to this definition")

设置连接运行时限制。如果试图将限制提高到超出强制上界则会静默地截短到强制上界。无论限制值是否被修改，都将返回之前的限制值。

参数:

-   **category** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- 要设置的 [SQLite limit category](https://www.sqlite.org/c3ref/c_limit_attached.html)。
    
-   **limit** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- 新的限制值。如为负值，当前限制将保持不变。
    

返回类型:

[int](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

抛出:

[**ProgrammingError**](#sqlite3.ProgrammingError "sqlite3.ProgrammingError") -- 如果 _category_ 不能被下层的 SQLite 库所识别。

示例，将 [`Connection`](#sqlite3.Connection "sqlite3.Connection") `con` 上附加的数据库数量限制为 1（默认限制为 10）:

\>>> con.setlimit(sqlite3.SQLITE\_LIMIT\_ATTACHED, 1)
10
\>>> con.getlimit(sqlite3.SQLITE\_LIMIT\_ATTACHED)
1

Added in version 3.11.

getconfig(_op_, _/_)[¶](#sqlite3.Connection.getconfig "Link to this definition")

查询一个布尔类型的连接配置选项。

参数:

**op** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- 一个 [SQLITE\_DBCONFIG 代码](#sqlite3-dbconfig-constants)。

返回类型:

[bool](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")

Added in version 3.12.

setconfig(_op_, _enable\=True_, _/_)[¶](#sqlite3.Connection.setconfig "Link to this definition")

设置一个布尔类型的连接配置选项。

参数:

-   **op** ([_int_](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")) -- 一个 [SQLITE\_DBCONFIG 代码](#sqlite3-dbconfig-constants)。
    
-   **enable** ([_bool_](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")) -- 如果该配置选项应当启用则为 `True` (默认值)；如果应当禁用则为 `False`。
    

Added in version 3.12.

serialize(_\*_, _name\='main'_)[¶](#sqlite3.Connection.serialize "Link to this definition")

将一个数据库序列化为 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象。对于普通的磁盘数据库文件，序列化就是磁盘文件的一个副本。 对于内存数据库或“临时”数据库，序列化就是当数据库备份到磁盘时要写入到磁盘的相同字节序列。

参数:

**name** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) -- 要序列化的数据库名称。 默认为 `"main"`。

返回类型:

[bytes](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")

备注

此方法仅在下层 SQLite 库具有序列化 API 时可用。

Added in version 3.11.

deserialize(_data_, _/_, _\*_, _name\='main'_)[¶](#sqlite3.Connection.deserialize "Link to this definition")

将一个 [`已序列化的`](#sqlite3.Connection.serialize "sqlite3.Connection.serialize") 数据库反序列化至 [`Connection`](#sqlite3.Connection "sqlite3.Connection")。此方法将导致数据库连接从 _name_ 数据库断开，并基于包含在 _data_ 中的序列化数据将 _name_ 作为内存数据库重新打开。

参数:

-   **data** ([_bytes_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")) -- 已序列化的数据库。
    
-   **name** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) -- 反序列化的目标数据库名称。 默认为 `"main"`。
    

抛出:

-   [**OperationalError**](#sqlite3.OperationalError "sqlite3.OperationalError") -- 如果当前数据库连接正在执行读取事务或备份操作。
    
-   [**DatabaseError**](#sqlite3.DatabaseError "sqlite3.DatabaseError") -- 如果 _data_ 不包含有效的 SQLite 数据库。
    
-   [**OverflowError**](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OverflowError "OverflowError") -- 如果 [`len(data)`](https://docs.python.org/zh-cn/3/builtins/functions.html#len "len") 大于 `2**63 - 1`。
    

备注

此方法仅在下层的 SQLite 库具有反序列化 API 时可用。

Added in version 3.11.

autocommit[¶](#sqlite3.Connection.autocommit "Link to this definition")

该属性控制符合 [**PEP 249**](https://peps.python.org/pep-0249/) 的事务行为。 `autocommit` 有三个可用的值：

-   `False`: 选择符合 [**PEP 249**](https://peps.python.org/pep-0249/) 的事务行为，即 `sqlite3` 将保证总是开启一个事务。使用 [`commit()`](#sqlite3.Connection.commit "sqlite3.Connection.commit") 和 [`rollback()`](#sqlite3.Connection.rollback "sqlite3.Connection.rollback") 来关闭事务。
    
    这是 `autocommit` 推荐的取值。
    
-   `True`: 使用 SQLite 的 [autocommit mode](https://www.sqlite.org/lang_transaction.html#implicit_versus_explicit_transactions)。在此模式下 [`commit()`](#sqlite3.Connection.commit "sqlite3.Connection.commit") 和 [`rollback()`](#sqlite3.Connection.rollback "sqlite3.Connection.rollback") 将没有任何效果。
    
-   [`LEGACY_TRANSACTION_CONTROL`](#sqlite3.LEGACY_TRANSACTION_CONTROL "sqlite3.LEGACY_TRANSACTION_CONTROL"): Python 3.12 之前 (不符合 [**PEP 249**](https://peps.python.org/pep-0249/)) 的事务控制。 请参阅 [`isolation_level`](#sqlite3.Connection.isolation_level "sqlite3.Connection.isolation_level") 了解详情。
    
    这是 `autocommit` 当前的默认值。
    

将 `autocommit` 更改为 `False` 将开启一个新事务，而将其更改为 `True` 将提交任何待处理事务。

详情参见 [通过 autocommit 属性进行事务控制](#sqlite3-transaction-control-autocommit)。

Added in version 3.12.

in\_transaction[¶](#sqlite3.Connection.in_transaction "Link to this definition")

这个只读属性对应于低层级的 SQLite [autocommit mode](https://www.sqlite.org/lang_transaction.html#implicit_versus_explicit_transactions)。

如果一个事务处于活动状态（有未提交的更改）则为 `True`，否则为 `False`。

Added in version 3.2.

isolation\_level[¶](#sqlite3.Connection.isolation_level "Link to this definition")

控制 `sqlite3` 的 [旧式事务处理模式](#sqlite3-transaction-control-isolation-level)。 如果设为 `None`，则绝不会隐式地开启事务。 如果设为 `"DEFERRED"`, `"IMMEDIATE"` 或 `"EXCLUSIVE"` 中的一个，即与下层的 [SQLite transaction behaviour](https://www.sqlite.org/lang_transaction.html#deferred_immediate_and_exclusive_transactions) 对应，则会执行 [隐式事务管理](#sqlite3-transaction-control-isolation-level)。

如果未被 [`connect()`](#sqlite3.connect "sqlite3.connect") 的 _isolation\_level_ 形参覆盖，则默认为 `""`，这是 `"DEFERRED"` 的一个别名。

备注

建议使用 [`autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 来控制事务处理而不是使用 `isolation_level`。除非 `autocommit` 设为 [`LEGACY_TRANSACTION_CONTROL`](#sqlite3.LEGACY_TRANSACTION_CONTROL "sqlite3.LEGACY_TRANSACTION_CONTROL") (默认值) 否则 `isolation_level` 将不起作用。

row\_factory[¶](#sqlite3.Connection.row_factory "Link to this definition")

针对从该连接创建的 [`Cursor`](#sqlite3.Cursor "sqlite3.Cursor") 对象的初始 [`row_factory`](#sqlite3.Cursor.row_factory "sqlite3.Cursor.row_factory")。 为该属性赋值不会影响属于该连接的现有游标的 `row_factory`，只影响新的游标。默认为 `None`，表示将每一行作为 [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple") 返回。

详情参见 [如何创建并使用行工厂对象](#sqlite3-howto-row-factory)。

在 3.14.6 版本发生变更: Deleting the `row_factory` attribute is no longer allowed.

text\_factory[¶](#sqlite3.Connection.text_factory "Link to this definition")

一个接受 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 形参并返回其文本表示形式的 [callable](https://docs.python.org/zh-cn/3/glossary.html#term-callable)。该可调用对象将针对数据类型为 `TEXT` 的 SQLite 值被唤起。在默认情况下，该属性将被设为 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")。

请参阅 [如何处理非 UTF-8 文本编码格式](#sqlite3-howto-encoding) 了解详情。

在 3.14.6 版本发生变更: Deleting the `text_factory` attribute is no longer allowed.

total\_changes[¶](#sqlite3.Connection.total_changes "Link to this definition")

返回自打开数据库连接以来已修改、插入或删除的数据库行的总数。

### 游标对象[¶](#cursor-objects "Link to this heading")

> 一个代表被用于执行 SQL 语句，并管理获取操作的上下文的 [database cursor](https://en.wikipedia.org/wiki/Cursor_\(databases\)) 的 `Cursor` 对象。游标对象是使用 [`Connection.cursor()`](#sqlite3.Connection.cursor "sqlite3.Connection.cursor")，或是通过使用任何 [连接快捷方法](#sqlite3-connection-shortcuts) 来创建的。
> 
> Cursor 对象属于 [迭代器](https://docs.python.org/zh-cn/3/glossary.html#term-iterator)，这意味着如果你通过 [`execute()`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute") 来执行 `SELECT` 查询，你可以简单地迭代游标来获取结果行：
> 
> for row in cur.execute("SELECT t FROM data"):
>     print(row)

_class_ sqlite3.Cursor[¶](#sqlite3.Cursor "Link to this definition")

[`Cursor`](#sqlite3.Cursor "sqlite3.Cursor") 游标实例具有以下属性和方法。

execute(_sql_, _parameters\=()_, _/_)[¶](#sqlite3.Cursor.execute "Link to this definition")

执行一条 SQL 语句，可以选择使用 [占位符](#sqlite3-placeholders) 来绑定 Python 值。

参数:

-   **sql** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) -- 一条 SQL 语句。
    
-   **parameters** ([`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict") | [sequence](https://docs.python.org/zh-cn/3/glossary.html#term-sequence)) -- 要绑定到 _sql_ 中占位符的 Python 值。如果使用命名占位符则会使用 `dict`。如果使用非命名占位符则会使用 sequence。参见 [如何在 SQL 查询中使用占位符来绑定值](#sqlite3-placeholders)。
    

抛出:

[**ProgrammingError**](#sqlite3.ProgrammingError "sqlite3.ProgrammingError") -- 当 _sql_ 包含多个 SQL 语句。当使用了 [命名占位符](#sqlite3-placeholders) 且 _parameters_ 是一个序列而不是 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict")。

如果 [`autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 为 [`LEGACY_TRANSACTION_CONTROL`](#sqlite3.LEGACY_TRANSACTION_CONTROL "sqlite3.LEGACY_TRANSACTION_CONTROL")，[`isolation_level`](#sqlite3.Connection.isolation_level "sqlite3.Connection.isolation_level") 不为 `None`，_sql_ 为一条 `INSERT`, `UPDATE`, `DELETE` 或 `REPLACE` 语句，并且没有开启事务，则会在执行 _sql_ 之前隐式地开启事务。

在 3.14 版本发生变更: 如果使用了 [命名占位符](#sqlite3-placeholders) 且 _parameters_ 是一个序列而不是 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict") 则会发出 [`ProgrammingError`](#sqlite3.ProgrammingError "sqlite3.ProgrammingError")。

使用 [`executescript()`](#sqlite3.Cursor.executescript "sqlite3.Cursor.executescript") 来执行多条 SQL 语句。

executemany(_sql_, _parameters_, _/_)[¶](#sqlite3.Cursor.executemany "Link to this definition")

对于 _parameters_ 中的每一项，重复执行 [参数化的](#sqlite3-placeholders) DML SQL 语句 _sql_。

使用与 [`execute()`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute") 相同的隐式事务处理。

参数:

-   **sql** ([_str_](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")) -- 一条 SQL DML 语句。
    
-   **parameters** ([iterable](https://docs.python.org/zh-cn/3/glossary.html#term-iterable)) -- 一个用来绑定到 _sql_ 中的占位符的形参的 iterable。参见 [如何在 SQL 查询中使用占位符来绑定值](#sqlite3-placeholders)。
    

抛出:

[**ProgrammingError**](#sqlite3.ProgrammingError "sqlite3.ProgrammingError") -- 当 _sql_ 包含多个 SQL 语句或者不是一个 DML 语句时，当使用了 [命名占位符](#sqlite3-placeholders) 并且 _parameters_ 中的条目是序列而不是 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict") 时。

示例：

rows \= \[
    ("row1",),
    ("row2",),
\]
\# cur 是一个 sqlite3.Cursor 对象
cur.executemany("INSERT INTO data VALUES(?)", rows)

在 3.14 版本发生变更: 如果使用了 [命名占位符](#sqlite3-placeholders) 并且 _parameters_ 中的条目是序列而不是 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict") 时则会发出 [`ProgrammingError`](#sqlite3.ProgrammingError "sqlite3.ProgrammingError")。

executescript(_sql\_script_, _/_)[¶](#sqlite3.Cursor.executescript "Link to this definition")

执行 _sql\_script_ 中的 SQL 语句。如果 [`autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 为 [`LEGACY_TRANSACTION_CONTROL`](#sqlite3.LEGACY_TRANSACTION_CONTROL "sqlite3.LEGACY_TRANSACTION_CONTROL") 并且存在待处理的事务，则首先隐式执行一条 `COMMIT` 语句。 不会执行其他隐式事务控制；任何事务控制都必须添加至 _sql\_script_。

_sql\_script_ 必须为 [`字符串`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")。

示例：

\# cur 是一个 sqlite3.Cursor 对象
cur.executescript("""
    BEGIN;
    CREATE TABLE person(firstname, lastname, age);
    CREATE TABLE book(title, author, published);
    CREATE TABLE publisher(name, address);
    COMMIT;
""")

fetchone()[¶](#sqlite3.Cursor.fetchone "Link to this definition")

如果 [`row_factory`](#sqlite3.Cursor.row_factory "sqlite3.Cursor.row_factory") 为 `None`，则将下一行查询结果集作为 [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple") 返回。 否则，将其传给指定的行工厂函数并返回函数结果。如果没有更多可用数据则返回 `None`。

fetchmany(_size\=cursor.arraysize_)[¶](#sqlite3.Cursor.fetchmany "Link to this definition")

将下一个多行查询结果集作为 [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 返回。如果没有更多可用行时则返回一个空列表。

每次调用要获取的行数是由 _size_ 形参指定的。如果未指定 _size_，则由 [`arraysize`](#sqlite3.Cursor.arraysize "sqlite3.Cursor.arraysize") 确定要获取的行数。 如果可用的行少于 _size_，则返回可用的行数。

请注意 _size_ 形参会涉及到性能方面的考虑。为了获得优化的性能，通常最好是使用 arraysize 属性。如果使用 _size_ 形参，则最好在从一个 [`fetchmany()`](#sqlite3.Cursor.fetchmany "sqlite3.Cursor.fetchmany") 调用到下一个调用之间保持相同的值。

在 3.14.1 版本发生变更: 负的 _size_ 值将被拒绝并引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

fetchall()[¶](#sqlite3.Cursor.fetchall "Link to this definition")

将全部（剩余的）查询结果行作为 [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 返回。如果没有可用的行则返回空列表。请注意 [`arraysize`](#sqlite3.Cursor.arraysize "sqlite3.Cursor.arraysize") 属性可能会影响此操作的性能。

close()[¶](#sqlite3.Cursor.close "Link to this definition")

立即关闭 cursor（而不是在当 `__del__` 被调用的时候）。

从这一时刻起该 cursor 将不再可用，如果再尝试用该 cursor 执行任何操作将引发 [`ProgrammingError`](#sqlite3.ProgrammingError "sqlite3.ProgrammingError") 异常。

setinputsizes(_sizes_, _/_)[¶](#sqlite3.Cursor.setinputsizes "Link to this definition")

DB-API 要求的方法。在 `sqlite3` 不做任何事情。

setoutputsize(_size_, _column\=None_, _/_)[¶](#sqlite3.Cursor.setoutputsize "Link to this definition")

DB-API 要求的方法。在 `sqlite3` 不做任何事情。

arraysize[¶](#sqlite3.Cursor.arraysize "Link to this definition")

用于控制 [`fetchmany()`](#sqlite3.Cursor.fetchmany "sqlite3.Cursor.fetchmany") 返回行数的可读取/写入属性。该属性的默认值为 1，表示每次调用将获取单独一行。

connection[¶](#sqlite3.Cursor.connection "Link to this definition")

提供属于该游标的 SQLite [`Connection`](#sqlite3.Connection "sqlite3.Connection") 的只读属性。通过调用 [`con.cursor()`](#sqlite3.Connection.cursor "sqlite3.Connection.cursor") 创建的 [`Cursor`](#sqlite3.Cursor "sqlite3.Cursor") 对象将具有一个指向 _con_ 的 [`connection`](#sqlite3.Cursor.connection "sqlite3.Cursor.connection") 属性：

\>>> con \= sqlite3.connect(":memory:")
\>>> cur \= con.cursor()
\>>> cur.connection \== con
True
\>>> con.close()

description[¶](#sqlite3.Cursor.description "Link to this definition")

提供上一次查询的列名称的只读属性。为了与 Python DB API 保持兼容，它会为每个列返回一个 7 元组，每个元组的最后六个条目均为 `None`.

对于没有任何匹配行的 `SELECT` 语句同样会设置该属性。

lastrowid[¶](#sqlite3.Cursor.lastrowid "Link to this definition")

提供上一次插入的行的行 ID 的只读属性。它只会在使用 [`execute()`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute") 方法的 `INSERT` 或 `REPLACE` 语句成功后被更新。对于其他语句，则在 [`executemany()`](#sqlite3.Cursor.executemany "sqlite3.Cursor.executemany") 或 [`executescript()`](#sqlite3.Cursor.executescript "sqlite3.Cursor.executescript")，或者如果插入失败，`lastrowid` 的值将保持不变。`lastrowid` 的初始值为 `None`.

备注

对 `WITHOUT ROWID` 表的插入不被记录。

在 3.6 版本发生变更: 增加了 `REPLACE` 语句的支持。

rowcount[¶](#sqlite3.Cursor.rowcount "Link to this definition")

提供 `INSERT`, `UPDATE`, `DELETE` 和 `REPLACE` 语句所修改行数的只读属性；对于其他语句则为 `-1`，包括 CTE 查询。只有 [`execute()`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute") 和 [`executemany()`](#sqlite3.Cursor.executemany "sqlite3.Cursor.executemany") 方法会在语句运行完成后更新此属性。这意味着任何结果行都必须按顺序被提取以使 `rowcount` 获得更新。

row\_factory[¶](#sqlite3.Cursor.row_factory "Link to this definition")

控制从该 `Cursor` 获取的行的表示形式。如为 `None`，一行将表示为一个 [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple")。可设置形式包括 [`sqlite3.Row`](#sqlite3.Row "sqlite3.Row")；或者接受两个参数的 [callable](https://docs.python.org/zh-cn/3/glossary.html#term-callable)，一个 [`Cursor`](#sqlite3.Cursor "sqlite3.Cursor") 对象和由行内所有值组成的 `tuple`，以及返回代表一个 SQLite 行的自定义对象。

默认为当 `Cursor` 被创建时设置的 [`Connection.row_factory`](#sqlite3.Connection.row_factory "sqlite3.Connection.row_factory")。对该属性赋值不会影响父连接的 `Connection.row_factory`.

详情参见 [如何创建并使用行工厂对象](#sqlite3-howto-row-factory)。

在 3.14.6 版本发生变更: Deleting the `row_factory` attribute is no longer allowed.

### Row 对象[¶](#row-objects "Link to this heading")

_class_ sqlite3.Row[¶](#sqlite3.Row "Link to this definition")

一个被用作 [`Connection`](#sqlite3.Connection "sqlite3.Connection") 对象的高度优化的 [`row_factory`](#sqlite3.Connection.row_factory "sqlite3.Connection.row_factory") 的 `Row` 实例。它支持迭代、相等性检测、[`len()`](https://docs.python.org/zh-cn/3/builtins/functions.html#len "len") 以及基于列名称的 [mapping](https://docs.python.org/zh-cn/3/glossary.html#term-mapping) 访问和数字序列。

两个 `Row` 对象如果具有相同的列名称和值则比较结果相等。

详情参见 [如何创建并使用行工厂对象](#sqlite3-howto-row-factory)。

keys()[¶](#sqlite3.Row.keys "Link to this definition")

在一次查询之后，立即将由列名称组成的 [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 作为 [`字符串`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 返回，它是 [`Cursor.description`](#sqlite3.Cursor.description "sqlite3.Cursor.description") 中每个元组的第一个成员。

在 3.5 版本发生变更: 添加了对切片操作的支持。

### Blob 对象[¶](#blob-objects "Link to this heading")

_class_ sqlite3.Blob[¶](#sqlite3.Blob "Link to this definition")

Added in version 3.11.

[`Blob`](#sqlite3.Blob "sqlite3.Blob") 实例是可以读写 SQLite BLOB 数据的 [file-like object](https://docs.python.org/zh-cn/3/glossary.html#term-file-like-object)。调用 [`len(blob)`](https://docs.python.org/zh-cn/3/builtins/functions.html#len "len") 可得到 blob 的大小（字节数）。 请使用索引和 [切片](https://docs.python.org/zh-cn/3/glossary.html#term-slice) 来直接访问 blob 数据。

将 [`Blob`](#sqlite3.Blob "sqlite3.Blob") 作为 [context manager](https://docs.python.org/zh-cn/3/glossary.html#term-context-manager) 使用以确保使用结束后 blob 句柄自动关闭。

con \= sqlite3.connect(":memory:")
con.execute("CREATE TABLE test(blob\_col blob)")
con.execute("INSERT INTO test(blob\_col) VALUES(zeroblob(13))")

\# 写入到我们的 blob，使用两次 write 操作：
with con.blobopen("test", "blob\_col", 1) as blob:
    blob.write(b"hello, ")
    blob.write(b"world.")
    \# 修改我们的 blob 的开头和末尾字节
    blob\[0\] \= ord("H")
    blob\[\-1\] \= ord("!")

\# 读取我们的 blob 的内容
with con.blobopen("test", "blob\_col", 1) as blob:
    greeting \= blob.read()

print(greeting)  \# 输出 "b'Hello, world!'"
con.close()

close()[¶](#sqlite3.Blob.close "Link to this definition")

关闭 blob。

从这一时刻起该 blob 将不再可用。如果再尝试用该 blob 执行任何操作将引发 [`Error`](#sqlite3.Error "sqlite3.Error") (或其子类) 异常。

read(_length\=\-1_, _/_)[¶](#sqlite3.Blob.read "Link to this definition")

从 blob 的当前偏移位置读取 _length_ 个字节的数据。如果到达了 blob 的末尾，则将返回 EOF 之前的数据。当未指定 _length_，或指定负值时，[`read()`](#sqlite3.Blob.read "sqlite3.Blob.read") 将读取至 blob 的末尾。

write(_data_, _/_)[¶](#sqlite3.Blob.write "Link to this definition")

在 blob 的当前偏移位置上写入 _data_。此函数不能改变 blob 的长度。写入数据超出 blob 的末尾将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError").

tell()[¶](#sqlite3.Blob.tell "Link to this definition")

返回 blob 的当前访问位置。

seek(_offset_, _origin\=os.SEEK\_SET_, _/_)[¶](#sqlite3.Blob.seek "Link to this definition")

将 Blob 的当前访问位置设为 _offset_。 _origin_ 参数默认为 [`os.SEEK_SET`](https://docs.python.org/zh-cn/3/library/os.html#os.SEEK_SET "os.SEEK_SET") (blob 的绝对位置)。 _origin_ 的其他值包括 [`os.SEEK_CUR`](https://docs.python.org/zh-cn/3/library/os.html#os.SEEK_CUR "os.SEEK_CUR") (相对于当前位置寻址) 和 [`os.SEEK_END`](https://docs.python.org/zh-cn/3/library/os.html#os.SEEK_END "os.SEEK_END") (相对于 blob 末尾寻址)。

### PrepareProtocol 对象[¶](#prepareprotocol-objects "Link to this heading")

_class_ sqlite3.PrepareProtocol[¶](#sqlite3.PrepareProtocol "Link to this definition")

PrepareProtocol 类型的唯一目的是作为 [**PEP 246**](https://peps.python.org/pep-0246/) 风格的适配协议让对象能够 [将自身适配](#sqlite3-conform) 为 [原生 SQLite 类型](#sqlite3-types)。

### 异常[¶](#exceptions "Link to this heading")

异常层次是由 DB-API 2.0 ([**PEP 249**](https://peps.python.org/pep-0249/)) 定义的。

_exception_ sqlite3.Warning[¶](#sqlite3.Warning "Link to this definition")

目前此异常不会被 `sqlite3` 模块引发，但可能会被使用 `sqlite3` 的应用程序引发，例如当一个用户自定义的函数在插入操作中截断了数据时。`Warning` 是 [`Exception`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#Exception "Exception") 的一个子类。

_exception_ sqlite3.Error[¶](#sqlite3.Error "Link to this definition")

本模块中其他异常的基类。使用它来捕捉所有的错误，只需一条 [`except`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#except) 语句。`Error` 是 [`Exception`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#Exception "Exception") 的子类。

如果异常是产生于 SQLite 库的内部，则以下两个属性将被添加到该异常：

sqlite\_errorcode[¶](#sqlite3.Error.sqlite_errorcode "Link to this definition")

来自 [SQLite API](https://sqlite.org/rescode.html) 的数字错误代码

Added in version 3.11.

sqlite\_errorname[¶](#sqlite3.Error.sqlite_errorname "Link to this definition")

来自 [SQLite API](https://sqlite.org/rescode.html) 的数字错误代码符号名称

Added in version 3.11.

_exception_ sqlite3.InterfaceError[¶](#sqlite3.InterfaceError "Link to this definition")

因错误使用低层级 SQLite C API 而引发的异常，换句话说，如果此异常被引发，则可能表明 `sqlite3` 模块中存在错误。 `InterfaceError` 是 [`Error`](#sqlite3.Error "sqlite3.Error") 的一个子类。

_exception_ sqlite3.DatabaseError[¶](#sqlite3.DatabaseError "Link to this definition")

对与数据库有关的错误引发的异常。它作为几种数据库错误的基础异常。它只通过专门的子类隐式引发。`DatabaseError` 是 [`Error`](#sqlite3.Error "sqlite3.Error") 的一个子类。

_exception_ sqlite3.DataError[¶](#sqlite3.DataError "Link to this definition")

由于处理的数据有问题而产生的异常，比如数字值超出范围，字符串太长。`DataError` 是 [`DatabaseError`](#sqlite3.DatabaseError "sqlite3.DatabaseError") 的子类。

_exception_ sqlite3.OperationalError[¶](#sqlite3.OperationalError "Link to this definition")

与数据库操作有关的错误而引发的异常，不一定在程序员的控制之下。例如，数据库路径没有找到，或者一个事务无法被处理。 `OperationalError` 是 [`DatabaseError`](#sqlite3.DatabaseError "sqlite3.DatabaseError") 的子类。

_exception_ sqlite3.IntegrityError[¶](#sqlite3.IntegrityError "Link to this definition")

当数据库的关系一致性受到影响时引发的异常。例如外键检查失败等。它是 [`DatabaseError`](#sqlite3.DatabaseError "sqlite3.DatabaseError") 的子类。

_exception_ sqlite3.InternalError[¶](#sqlite3.InternalError "Link to this definition")

当 SQLite 遇到一个内部错误时引发的异常。如果它被引发，可能表明运行中的 SQLite 库有问题。`InternalError` 是 [`DatabaseError`](#sqlite3.DatabaseError "sqlite3.DatabaseError") 的子类。

_exception_ sqlite3.ProgrammingError[¶](#sqlite3.ProgrammingError "Link to this definition")

针对 `sqlite3` API 编程错误引发的异常，例如向查询提供错误数量的绑定，或试图在已关闭的 [`Connection`](#sqlite3.Connection "sqlite3.Connection") 上执行操作。`ProgrammingError` 是 [`DatabaseError`](#sqlite3.DatabaseError "sqlite3.DatabaseError") 的一个子类。

_exception_ sqlite3.NotSupportedError[¶](#sqlite3.NotSupportedError "Link to this definition")

在下层的 SQLite 库不支持某个方法或数据库 API 的情况下引发的异常。例如，在 [`create_function()`](#sqlite3.Connection.create_function "sqlite3.Connection.create_function") 中把 _deterministic_ 设为 `True`，而下层的 SQLite 库不支持确定性函数的时候。`NotSupportedError` 是 [`DatabaseError`](#sqlite3.DatabaseError "sqlite3.DatabaseError") 的一个子类。

### SQLite 与 Python 类型[¶](#sqlite-and-python-types "Link to this heading")

SQLite 原生支持如下的类型: `NULL`，`INTEGER`，`REAL`，`TEXT`，`BLOB`。

因此可以将以下 Python 类型发送到 SQLite 而不会出现任何问题：

| 
Python 类型

 | 

SQLite 类型

 |
| --- | --- |
| 

`None`

 | 

`NULL`

 |
| 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

`INTEGER`

 |
| 

[`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")

 | 

`REAL`

 |
| 

[`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")

 | 

`TEXT`

 |
| 

[`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")

 | 

`BLOB`

 |

这是 SQLite 类型默认转换为 Python 类型的方式：

| 
SQLite 类型

 | 

Python 类型

 |
| --- | --- |
| 

`NULL`

 | 

`None`

 |
| 

`INTEGER`

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 |
| 

`REAL`

 | 

[`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")

 |
| 

`TEXT`

 | 

取决于 [`text_factory`](#sqlite3.Connection.text_factory "sqlite3.Connection.text_factory") , 默认为 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")

 |
| 

`BLOB`

 | 

[`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")

 |

`sqlite3` 模块的类型系统可通过两种方式来扩展：你可以通过 [对象适配器](#sqlite3-adapters) 将额外的 Python 类型保存在 SQLite 数据库中，你也可以让 `sqlite3` 模块通过 [转换器](#sqlite3-converters) 将 SQLite 类型转换为不同的 Python 类型。

### 默认适配器和转换器（已弃用）[¶](#default-adapters-and-converters-deprecated "Link to this heading")

备注

自 Python 3.12 起，默认适配器和转换器已被弃用。取而代之的是使用 [适配器和转换器范例程序](#sqlite3-adapter-converter-recipes)，并根据您的需要定制它们。

弃用的默认适配器和转换器包括：

-   将 [`datetime.date`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.date "datetime.date") 对象转换为 [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 格式 [`字符串`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 的适配器。
    
-   将 [`datetime.datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.datetime "datetime.datetime") 对象转换为 ISO 8601 格式字符串的适配器。
    
-   从 [已声明的](#sqlite3-converters) "date" 类型到 [`datetime.date`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.date "datetime.date") 对象的转换器。
    
-   A converter for declared "timestamp" types to [`datetime.datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.datetime "datetime.datetime") objects. Fractional parts will be truncated to 6 digits (microsecond precision).
    

备注

默认的 "时间戳" 转换器忽略了数据库中的 UTC 偏移，总是返回一个原生的 [`datetime.datetime`](https://docs.python.org/zh-cn/3/library/datetime.html#datetime.datetime "datetime.datetime") 对象。要在时间戳中保留 UTC 偏移，可以不使用转换器，或者用 [`register_converter()`](#sqlite3.register_converter "sqlite3.register_converter") 注册一个偏移感知的转换器。

自 3.12 版本弃用.

### 命令行接口[¶](#command-line-interface "Link to this heading")

`sqlite3` 模块可以作为脚本被唤起，使用解释器的 [`-m`](https://docs.python.org/zh-cn/3/using/cmdline.html#cmdoption-m) 开关选项，以提供一个简单的 SQLite shell。 参数签名如下:

python \-m sqlite3 \[\-h\] \[\-v\] \[filename\] \[sql\]

输入 `.quit` 或 CTRL-D 退出 shell。

\-h, \--help[¶](#cmdoption-python-m-sqlite3-h-v-filename-sql-h "Link to this definition")

打印 CLI 帮助。

\-v, \--version[¶](#cmdoption-python-m-sqlite3-h-v-filename-sql-v "Link to this definition")

打印下层 SQLite 库版本。

Added in version 3.12.

## 常用方案指引[¶](#how-to-guides "Link to this heading")

### 如何在 SQL 查询中使用占位符来绑定值[¶](#how-to-use-placeholders-to-bind-values-in-sql-queries "Link to this heading")

SQL 操作通常会需要使用来自 Python 变量的值。不过，请谨慎使用 Python 的字符串操作来拼装查询，因为这样易受 [SQL injection attacks](https://en.wikipedia.org/wiki/SQL_injection)。例如，攻击者可以简单地添加结束单引号并注入 `OR TRUE` 来选择所有的行:

\>>> \# 绝不要这样做 -- 很不安全！
\>>> symbol \= input()
' OR TRUE; --
\>>> sql \= "SELECT \* FROM stocks WHERE symbol = '%s'" % symbol
\>>> print(sql)
SELECT \* FROM stocks WHERE symbol = '' OR TRUE; --'
\>>> cur.execute(sql)

请改用 DB-API 的形参替换。要将变量插入到查询字符串中，可在字符串中使用占位符，并通过将实际值作为游标的 [`execute()`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute") 方法的第二个参数以由多个值组成的 [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple") 形式提供给查询来替换它们。

SQL 语句可以使用两种占位符之一：问号占位符（问号风格）或命名占位符（命名风格）。对于问号风格，_parameters_ 要是一个长度必须与占位符的数量相匹配的 [sequence](https://docs.python.org/zh-cn/3/glossary.html#term-sequence)，否则将引发 [`ProgrammingError`](#sqlite3.ProgrammingError "sqlite3.ProgrammingError")。 对于命名风格，_parameters_ 必须是 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict") （或其子类）的实例，它必须包含与所有命名参数相对应的键；任何额外的条目都将被忽略。下面是一个同时使用这两种风格的示例：

con \= sqlite3.connect(":memory:")
cur \= con.execute("CREATE TABLE lang(name, first\_appeared)")

\# 这是用于 executemany() 的名称风格：
data \= (
    {"name": "C", "year": 1972},
    {"name": "Fortran", "year": 1957},
    {"name": "Python", "year": 1991},
    {"name": "Go", "year": 2009},
)
cur.executemany("INSERT INTO lang VALUES(:name, :year)", data)

\# 这是用于 SELECT 查询的问号风格：
params \= (1972,)
cur.execute("SELECT \* FROM lang WHERE first\_appeared = ?", params)
print(cur.fetchall())
con.close()

备注

[**PEP 249**](https://peps.python.org/pep-0249/) 数字占位符 _不_ 被支持。如果使用，它们将被解读为命名占位符。

### 如何将自定义 Python 类型适配到 SQLite 值[¶](#how-to-adapt-custom-python-types-to-sqlite-values "Link to this heading")

SQLite 仅支持一个原生数据类型的有限集。要在 SQLite 数据库中存储自定义 Python 类型，请将它们 _适配_ 到 [SQLite 原生可识别的 Python 类型](#sqlite3-types) 之一。

有两种方式可将 Python 对象适配到 SQLite 类型：让你的对象自行适配，或是使用 _适配器可调用对象_。后者将优先于前者发挥作用。 对于导出自定义类型的库，启用该类型的自行适配可能更为合理。而作为一名应用程序开发者，通过注册自定义适配器函数进行直接控制可能更为合理。

#### 如何编写可适配对象[¶](#how-to-write-adaptable-objects "Link to this heading")

假设我们有一个代表笛卡尔坐标系中的坐标值对 `Point`，`x` 和 `y` 的类，该坐标值在数据库中将存储为一个文本字符串。 这可以通过添加一个返回已适配值的 `__conform__(self, protocol)` 方法来实现。传给 _protocol_ 的对象将为 [`PrepareProtocol`](#sqlite3.PrepareProtocol "sqlite3.PrepareProtocol") 类型。

class Point:
    def \_\_init\_\_(self, x, y):
        self.x, self.y \= x, y

    def \_\_conform\_\_(self, protocol):
        if protocol is sqlite3.PrepareProtocol:
            return f"{self.x};{self.y}"

con \= sqlite3.connect(":memory:")
cur \= con.cursor()

cur.execute("SELECT ?", (Point(4.0, \-3.2),))
print(cur.fetchone()\[0\])
con.close()

#### 如何注册适配器可调用对象[¶](#how-to-register-adapter-callables "Link to this heading")

另一种可能的方式是创建一个将 Python 对象转换为 SQLite 兼容类型的函数。随后可使用 [`register_adapter()`](#sqlite3.register_adapter "sqlite3.register_adapter") 来注册该函数。

class Point:
    def \_\_init\_\_(self, x, y):
        self.x, self.y \= x, y

def adapt\_point(point):
    return f"{point.x};{point.y}"

sqlite3.register\_adapter(Point, adapt\_point)

con \= sqlite3.connect(":memory:")
cur \= con.cursor()

cur.execute("SELECT ?", (Point(1.0, 2.5),))
print(cur.fetchone()\[0\])
con.close()

### 如何将 SQLite 值转换为自定义 Python 类型[¶](#how-to-convert-sqlite-values-to-custom-python-types "Link to this heading")

编写适配器使你可以将自定义 Python 类型转换为 SQLite 值。为了能将 SQLite 值转换为自定义 Python 类型，我们可使用 _转换器_。

让我们回到 `Point` 类。我们以以分号分隔的字符串形式在 SQLite 中存储了 x 和 y 坐标值。

首先，我们将定义一个转换器函数，它接受这样的字符串作为形参并根据该参数构造一个 `Point` 对象。

备注

转换器函数 **总是** 接受传入一个 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象，无论下层的 SQLite 数据类型是什么。

def convert\_point(s):
    x, y \= map(float, s.split(b";"))
    return Point(x, y)

我们现在需要告诉 `sqlite3` 何时应当转换一个给定的 SQLite 值。这是在连接到一个数据库时完成的，使用 [`connect()`](#sqlite3.connect "sqlite3.connect") 的 _detect\_types_ 形参。有三个选项：

-   隐式：将 _detect\_types_ 设为 [`PARSE_DECLTYPES`](#sqlite3.PARSE_DECLTYPES "sqlite3.PARSE_DECLTYPES")
    
-   显式：将 _detect\_types_ 设为 [`PARSE_COLNAMES`](#sqlite3.PARSE_COLNAMES "sqlite3.PARSE_COLNAMES")
    
-   同时：将 _detect\_types_ 设为 `sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES`。列名的优先级高于声明的类型。
    

下面的示例演示了隐式和显式的方法：

class Point:
    def \_\_init\_\_(self, x, y):
        self.x, self.y \= x, y

    def \_\_repr\_\_(self):
        return f"Point({self.x}, {self.y})"

def adapt\_point(point):
    return f"{point.x};{point.y}"

def convert\_point(s):
    x, y \= list(map(float, s.split(b";")))
    return Point(x, y)

\# 注册适配器和转换器
sqlite3.register\_adapter(Point, adapt\_point)
sqlite3.register\_converter("point", convert\_point)

\# 1) 使用声明的类型来解析
p \= Point(4.0, \-3.2)
con \= sqlite3.connect(":memory:", detect\_types\=sqlite3.PARSE\_DECLTYPES)
cur \= con.execute("CREATE TABLE test(p point)")

cur.execute("INSERT INTO test(p) VALUES(?)", (p,))
cur.execute("SELECT p FROM test")
print("with declared types:", cur.fetchone()\[0\])
cur.close()
con.close()

\# 2) 使用列名称来解析
con \= sqlite3.connect(":memory:", detect\_types\=sqlite3.PARSE\_COLNAMES)
cur \= con.execute("CREATE TABLE test(p)")

cur.execute("INSERT INTO test(p) VALUES(?)", (p,))
cur.execute('SELECT p AS "p \[point\]" FROM test')
print("with column names:", cur.fetchone()\[0\])
cur.close()
con.close()

### 适配器和转换器范例程序[¶](#adapter-and-converter-recipes "Link to this heading")

本小节显示了通用适配器和转换器的范例程序。

import datetime as dt
import sqlite3

def adapt\_date\_iso(val):
    """Adapt datetime.date to ISO 8601 date."""
    return val.isoformat()

def adapt\_datetime\_iso(val):
    """Adapt datetime.datetime to timezone-naive ISO 8601 date."""
    return val.replace(tzinfo\=None).isoformat()

def adapt\_datetime\_epoch(val):
    """Adapt datetime.datetime to Unix timestamp."""
    return int(val.timestamp())

sqlite3.register\_adapter(dt.date, adapt\_date\_iso)
sqlite3.register\_adapter(dt.datetime, adapt\_datetime\_iso)
sqlite3.register\_adapter(dt.datetime, adapt\_datetime\_epoch)

def convert\_date(val):
    """Convert ISO 8601 date to datetime.date object."""
    return dt.date.fromisoformat(val.decode())

def convert\_datetime(val):
    """Convert ISO 8601 datetime to datetime.datetime object."""
    return dt.datetime.fromisoformat(val.decode())

def convert\_timestamp(val):
    """Convert Unix epoch timestamp to datetime.datetime object."""
    return dt.datetime.fromtimestamp(int(val))

sqlite3.register\_converter("date", convert\_date)
sqlite3.register\_converter("datetime", convert\_datetime)
sqlite3.register\_converter("timestamp", convert\_timestamp)

### 如何使用连接快捷方法[¶](#how-to-use-connection-shortcut-methods "Link to this heading")

通过使用 [`Connection`](#sqlite3.Connection "sqlite3.Connection") 类的 [`execute()`](#sqlite3.Connection.execute "sqlite3.Connection.execute"), [`executemany()`](#sqlite3.Connection.executemany "sqlite3.Connection.executemany") 与 [`executescript()`](#sqlite3.Connection.executescript "sqlite3.Connection.executescript") 方法，您可以简化您的代码，因为无需再显式创建（通常是多余的） [`Cursor`](#sqlite3.Cursor "sqlite3.Cursor") 对象。此时 `Cursor` 对象会被隐式创建并且由这些快捷方法返回。这样一来，您仅需在 `Connection` 对象上调用一次方法就可以执行 `SELECT` 语句，并对其进行迭代。

\# 创建并填充表。
con \= sqlite3.connect(":memory:")
con.execute("CREATE TABLE lang(name, first\_appeared)")
data \= \[
    ("C++", 1985),
    ("Objective-C", 1984),
\]
con.executemany("INSERT INTO lang(name, first\_appeared) VALUES(?, ?)", data)

\# 打印表内容
for row in con.execute("SELECT name, first\_appeared FROM lang"):
    print(row)

print("I just deleted", con.execute("DELETE FROM lang").rowcount, "rows")

\# close() 不是一个快捷方法也不会被自动调用；
\# 连接对象应当被手动关闭
con.close()

### 如何使用连接上下文管理器[¶](#how-to-use-the-connection-context-manager "Link to this heading")

[`Connection`](#sqlite3.Connection "sqlite3.Connection") 对象可被用作上下文管理器以便在离开上下文管理器代码块时自动提交或回滚开启的事务。如果 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句体无异常地结束，事务将被提交。如果提交失败，或者如果 `with` 语句体引发了未捕获的异常，则事务将被回滚。 如果 [`autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 为 `False`，则会在提交或回滚后隐式地开启一个新事务。

如果在离开 `with` 语句体时没有开启的事务，或者如果 [`autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 为 `True`，则上下文管理器将不做任何操作。

con \= sqlite3.connect(":memory:")
con.execute("CREATE TABLE lang(id INTEGER PRIMARY KEY, name VARCHAR UNIQUE)")

\# 成功，con.commit() 将在此后被自动调用
with con:
    con.execute("INSERT INTO lang(name) VALUES(?)", ("Python",))

\# con.rollback() 会在 with 代码块结束时被自动调用并附带一个异常；
\# 该异常仍会被引发并且必须被捕获
try:
    with con:
        con.execute("INSERT INTO lang(name) VALUES(?)", ("Python",))
except sqlite3.IntegrityError:
    print("couldn't add Python twice")

\# 被用作上下文管理器的连接对象只能提交或回滚事务，
\# 因此连接对象必须被手动关闭
con.close()

### 如何使用 SQLite URI[¶](#how-to-work-with-sqlite-uris "Link to this heading")

一些有用的 URI 技巧包括：

-   以只读模式打开一个数据库：
    

\>>> con \= sqlite3.connect("file:tutorial.db?mode=ro", uri\=True)
\>>> con.execute("CREATE TABLE readonly(data)")
Traceback (most recent call last):
OperationalError: attempt to write a readonly database
\>>> con.close()

-   如果一个数据库尚不存在则不会隐式地新建数据库；如果无法新建数据库则将引发 [`OperationalError`](#sqlite3.OperationalError "sqlite3.OperationalError"):
    

\>>> con \= sqlite3.connect("file:nosuchdb.db?mode=rw", uri\=True)
Traceback (most recent call last):
OperationalError: unable to open database file

-   创建一个名为 shared 的内存数据库：
    

db \= "file:mem1?mode=memory&cache=shared"
con1 \= sqlite3.connect(db, uri\=True)
con2 \= sqlite3.connect(db, uri\=True)
with con1:
    con1.execute("CREATE TABLE shared(data)")
    con1.execute("INSERT INTO shared VALUES(28)")
res \= con2.execute("SELECT data FROM shared")
assert res.fetchone() \== (28,)

con1.close()
con2.close()

关于此特性的更多信息，包括可用的形参列表，可以在 [SQLite URI documentation](https://www.sqlite.org/uri.html) 中找到。

### 如何创建并使用行工厂对象[¶](#how-to-create-and-use-row-factories "Link to this heading")

在默认情况下，`sqlite3` 会以 [`tuple`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#tuple "tuple") 来表示每一行。如果 `tuple` 不适合你的需求，你可以使用 [`sqlite3.Row`](#sqlite3.Row "sqlite3.Row") 类或自定义的 [`row_factory`](#sqlite3.Cursor.row_factory "sqlite3.Cursor.row_factory")。

虽然 `row_factory` 同时作为 [`Cursor`](#sqlite3.Cursor "sqlite3.Cursor") 和 [`Connection`](#sqlite3.Connection "sqlite3.Connection") 的属性存在，但推荐设置 [`Connection.row_factory`](#sqlite3.Connection.row_factory "sqlite3.Connection.row_factory")，这样在该连接上创建的所有游标都将使用同一个行工厂对象。

`Row` 提供了针对列的序列方式和大小写不敏感的名称方式访问，具有优于 `tuple` 的最小化内存开销和性能影响。 要使用 `Row` 作为行工厂对象，请将其赋值给 `row_factory` 属性：

\>>> con \= sqlite3.connect(":memory:")
\>>> con.row\_factory \= sqlite3.Row

现在查询将返回 `Row` 对象：

\>>> res \= con.execute("SELECT 'Earth' AS name, 6378 AS radius")
\>>> row \= res.fetchone()
\>>> row.keys()
\['name', 'radius'\]
\>>> row\[0\]         \# 通过索引访问。
'Earth'
\>>> row\["name"\]    \# 通过名称访问。
'Earth'
\>>> row\["RADIUS"\]  \# 列名不区分大小写。
6378
\>>> con.close()

备注

`FROM` 子句可以在 `SELECT` 语句中省略，像在上面的示例中那样。在这种情况下，SQLite 将返回单独的行，其中的列由表达式来定义，例如使用字面量并给出相应的别名 `expr AS alias`。

你可以创建自定义 [`row_factory`](#sqlite3.Cursor.row_factory "sqlite3.Cursor.row_factory") 用来返回 [`dict`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict") 形式的行，将列名映射到相应的值。

def dict\_factory(cursor, row):
    fields \= \[column\[0\] for column in cursor.description\]
    return {key: value for key, value in zip(fields, row)}

使用它，现在查询将返回 `dict` 而不是 `tuple`:

\>>> con \= sqlite3.connect(":memory:")
\>>> con.row\_factory \= dict\_factory
\>>> for row in con.execute("SELECT 1 AS a, 2 AS b"):
...     print(row)
{'a': 1, 'b': 2}
\>>> con.close()

以下行工厂函数将返回一个 [named tuple](https://docs.python.org/zh-cn/3/glossary.html#term-named-tuple):

from collections import namedtuple

def namedtuple\_factory(cursor, row):
    fields \= \[column\[0\] for column in cursor.description\]
    cls \= namedtuple("Row", fields)
    return cls.\_make(row)

`namedtuple_factory()` 可以像下面这样使用：

\>>> con \= sqlite3.connect(":memory:")
\>>> con.row\_factory \= namedtuple\_factory
\>>> cur \= con.execute("SELECT 1 AS a, 2 AS b")
\>>> row \= cur.fetchone()
\>>> row
Row(a=1, b=2)
\>>> row\[0\]  \# 索引访问。
1
\>>> row.b   \# 属性访问。
2
\>>> con.close()

经过一些调整，上面的范例程序可以被适配为使用 [`dataclass`](https://docs.python.org/zh-cn/3/library/dataclasses.html#dataclasses.dataclass "dataclasses.dataclass")，或任何其他自定义类，而不是 [`namedtuple`](https://docs.python.org/zh-cn/3/library/collections.html#collections.namedtuple "collections.namedtuple").

### 如何处理非 UTF-8 文本编码格式[¶](#how-to-handle-non-utf-8-text-encodings "Link to this heading")

在默认情况下，`sqlite3` 使用 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 来适配 `TEXT` 数据类型的 SQLite 值。这对 UTF-8 编码的文本来说很适用，但对于其他编码格式和无效的 UTF-8 来说则可能出错。你可以使用自定义的 [`text_factory`](#sqlite3.Connection.text_factory "sqlite3.Connection.text_factory") 来处理这种情况。

由于 SQLite 的 [flexible typing](https://www.sqlite.org/flextypegood.html)，遇到包含非 UTF-8 编码格式的 `TEXT` 数据类型甚至任意数据的表字段的情况并不少见。作为演示，让我们假定有一个使用 ISO-8859-2 (Latin-2) 编码的文本的数据库，例如一个捷克语 - 英语字典条目的表。假定我们现在有一个 [`Connection`](#sqlite3.Connection "sqlite3.Connection") 实例 `con` 已连接到这个数据库，我们将可以使用这个 [`text_factory`](#sqlite3.Connection.text_factory "sqlite3.Connection.text_factory") 来解码使用 Latin-2 编码的文本：

con.text\_factory \= lambda data: str(data, encoding\="latin2")

对于存储在 `TEXT` 表字段中的无效 UTF-8 或任意数据，你可以使用以下技巧，借用自 [Unicode 指南](https://docs.python.org/zh-cn/3/howto/unicode.html#unicode-howto):

con.text\_factory \= lambda data: str(data, errors\="surrogateescape")

备注

`sqlite3` 模块 API 不支持包含替代符的字符串。

## 说明[¶](#explanation "Link to this heading")

### 事务控制[¶](#transaction-control "Link to this heading")

`sqlite3` 提供了多个方法来控制在何时以及怎样控制数据库事务的开启和关闭。推荐使用 [通过 autocommit 属性进行事务控制](#sqlite3-transaction-control-autocommit)，而 [通过 isolation\_level 属性进行事务控制](#sqlite3-transaction-control-isolation-level) 则保留了 Python 3.12 之前的行为。

#### 通过 `autocommit` 属性进行事务控制[¶](#transaction-control-via-the-autocommit-attribute "Link to this heading")

控制事务行为的推荐方式是通过 [`Connection.autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 属性，最好是使用 [`connect()`](#sqlite3.connect "sqlite3.connect") 的 _autocommit_ 形参来设置该属性。

建议将 _autocommit_ 设为 `False`，表示使用兼容 [**PEP 249**](https://peps.python.org/pep-0249/) 的事务控制。这意味着：

-   `sqlite3` 会确保事务始终处于开启状态，因此 [`connect()`](#sqlite3.connect "sqlite3.connect")、[`Connection.commit()`](#sqlite3.Connection.commit "sqlite3.Connection.commit") 和 [`Connection.rollback()`](#sqlite3.Connection.rollback "sqlite3.Connection.rollback") 将隐式地开启一个新事务（对于后两者，在关闭待处理事务后会立即执行）。开启事务时 `sqlite3` 会使用 `BEGIN DEFERRED` 语句。
    
-   事务应当显式地使用 `commit()` 执行提交。
    
-   事务应当显式地使用 `rollback()` 执行回滚。
    
-   如果数据库执行 [`close()`](#sqlite3.Connection.close "sqlite3.Connection.close") 时有待处理的更改则会隐式地执行回滚。
    

将 _autocommit_ 设为 `True` 以启用 SQLite 的 [autocommit mode](https://www.sqlite.org/lang_transaction.html#implicit_versus_explicit_transactions)。 在此模式下，[`Connection.commit()`](#sqlite3.Connection.commit "sqlite3.Connection.commit") 和 [`Connection.rollback()`](#sqlite3.Connection.rollback "sqlite3.Connection.rollback") 将没有任何作用。请注意 SQLite 的自动提交模式与兼容 [**PEP 249**](https://peps.python.org/pep-0249/) 的 [`Connection.autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 属性不同；请使用 [`Connection.in_transaction`](#sqlite3.Connection.in_transaction "sqlite3.Connection.in_transaction") 查询底层的 SQLite 自动提交模式。

将 _autocommit_ 设为 [`LEGACY_TRANSACTION_CONTROL`](#sqlite3.LEGACY_TRANSACTION_CONTROL "sqlite3.LEGACY_TRANSACTION_CONTROL") 以将事务控制行为保留给 [`Connection.isolation_level`](#sqlite3.Connection.isolation_level "sqlite3.Connection.isolation_level") 属性。更多信息参见 [通过 isolation\_level 属性进行事务控制](#sqlite3-transaction-control-isolation-level).

#### 通过 `isolation_level` 属性进行事务控制[¶](#transaction-control-via-the-isolation-level-attribute "Link to this heading")

备注

推荐的控制事务方式是通过 [`autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 属性。参见 [通过 autocommit 属性进行事务控制](#sqlite3-transaction-control-autocommit).

如果 [`Connection.autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 被设为 [`LEGACY_TRANSACTION_CONTROL`](#sqlite3.LEGACY_TRANSACTION_CONTROL "sqlite3.LEGACY_TRANSACTION_CONTROL") (默认值)，则事务行为由 [`Connection.isolation_level`](#sqlite3.Connection.isolation_level "sqlite3.Connection.isolation_level") 属性控制。 否则，`isolation_level` 将没有任何作用。

如果连接的属性 [`isolation_level`](#sqlite3.Connection.isolation_level "sqlite3.Connection.isolation_level") 不为 `None`，新的事务会在 [`execute()`](#sqlite3.Cursor.execute "sqlite3.Cursor.execute") 和 [`executemany()`](#sqlite3.Cursor.executemany "sqlite3.Cursor.executemany") 执行 `INSERT`, `UPDATE`, `DELETE` 或 `REPLACE` 语句之前隐式地开启；对于其他语句，则不会执行隐式的事务处理。可分别使用 [`commit()`](#sqlite3.Connection.commit "sqlite3.Connection.commit") 和 [`rollback()`](#sqlite3.Connection.rollback "sqlite3.Connection.rollback") 方法提交和回滚未应用的事务。 你可以通过 `isolation_level` 属性来选择下层的 [SQLite transaction behaviour](https://www.sqlite.org/lang_transaction.html#deferred_immediate_and_exclusive_transactions) — 也就是说，`sqlite3` 是否要隐式地执行以及执行何种类型的 `BEGIN` 语句

如果 [`isolation_level`](#sqlite3.Connection.isolation_level "sqlite3.Connection.isolation_level") 被设为 `None`，则完全不会隐式地开启任何事务。这将使下层 SQLite 库处于 [autocommit mode](https://www.sqlite.org/lang_transaction.html#implicit_versus_explicit_transactions)，但也允许用户使用显式 SQL 语句执行他们自己的事务处理。下层 SQLite 库的自动提交模式可使用 [`in_transaction`](#sqlite3.Connection.in_transaction "sqlite3.Connection.in_transaction") 属性来查询。

[`executescript()`](#sqlite3.Cursor.executescript "sqlite3.Cursor.executescript") 方法会在执行给定的 SQL 脚本之前隐式地提交任何挂起的事务，无论 [`isolation_level`](#sqlite3.Connection.isolation_level "sqlite3.Connection.isolation_level") 的值是什么。

在 3.6 版本发生变更: 在以前 `sqlite3` 会在 DDL 语句之前隐式地提交已开启的事务。现在则不会再这样做。

在 3.12 版本发生变更: 现在推荐的控制事务方式是通过 [`autocommit`](#sqlite3.Connection.autocommit "sqlite3.Connection.autocommit") 属性。
