现在被称为 PostgreSQL 的对象-关系型数据库管理系统是从伯克利编写的 POSTGRES 软件包发展而来的。经过十几年的发展，PostgreSQL 是目前世界上可以获得的最先进的开放源码数据库系统。

## Postgres95

1994 年，Andrew Yu 和 Jolly Chen 向 POSTGRES 中增加了 SQL 语言的解释器，并随后将 Postgres95 的源代码发布到互联网上供大家使用，从而成为一个开放源码的原伯克利 POSTGRES 的继承者。

Postgres95 所有源代码都是完全的 ANSI C ，而且代码量减少了 25% 。并且有许多内部修改以利于提高性能和代码的可维护性。Postgres95 版本 1.0.x 在进行 Wisconsin Benchmark 测试时大概比 POSTGRES v4.2 快 30%-50% 。除了修正了一些错误，下面的是一些主要改进：

-   原来的查询语言 PostQUEL 被 SQL 取代(在服务器端实现)。在 PostgreSQL 之前还不支持子查询(见下文)，但这个功能可以在 Postgres95 里面由用户定义的 SQL 函数实现。重新实现了聚集。同时还增加了对 GROUP BY 查询子句的支持。
    
-   新增加了利用 GNU Readline 进行交互 SQL 查询(psql)。这个程序很大程度上取代了老的 monitor 程序。
    
-   增加了新的前端库(libpgtcl)，用以支持以 Tcl 为基础的客户端。一个样本 shell(pgtclsh)，提供了新的 Tcl 命令用于 Tcl 程序和 Postgres95 后端之间的交互。
    
-   彻底重写了大对象的接口。保留了将大对象倒转(inversion)作为存储大对象的唯一机制。去掉了倒转(inversion)文件系统。
    
-   去掉了记录级的规则系统。但我们仍然可以通过重写规则使用规则。
    
-   在发布的源码中增加了一个简短的常用 SQL 和 Postgres95 特有的 SQL 特性的教程。
    
-   用 GNU make 取代了 BSD make 用于编译。Postgres95 可以使用不加补丁的 GCC 进行编译(修正了偶数字节数据的对齐问题)。
    

## PostgreSQL

到了 1996 年，我们很明显的看出"Postgres95"这个名字已经经不起时间的考验了。于是我们起了一个新名字 PostgreSQL 用于反映最初的 POSTGRES 和最新的使用 SQL 的版本之间的关系。同时版本号也重新从 6.0 开始，将版本号放回到最初的由伯克利 POSTGRES 项目开始的顺序中。

Postgres95 版本的开发重点放在标明和理解现有的后端代码的问题上。PostgreSQL 开发重点转到了一些有争议的特性和功能上面，当然各个方面的工作同时都在进行。

自那以来，PostgreSQL 发生的变化可以在[发行注记](http://www.postgresql.org/docs/current/static/release.html)里面找到。
