**目录**

42.1. [查询经过的路径](https://www.jinbuguo.com/postgresql/manual/query-path.html)

42.2. [连接是如何建立起来的](https://www.jinbuguo.com/postgresql/manual/connect-estab.html)

42.3. [分析器阶段](https://www.jinbuguo.com/postgresql/manual/parser-stage.html)

42.3.1. [分析器](https://www.jinbuguo.com/postgresql/manual/parser-stage.html#AEN61447)

42.3.2. [转换处理](https://www.jinbuguo.com/postgresql/manual/parser-stage.html#AEN61483)

42.4. [PostgreSQL 规则系统](https://www.jinbuguo.com/postgresql/manual/rule-system.html)

42.5. [规划器/优化器](https://www.jinbuguo.com/postgresql/manual/planner-optimizer.html)

42.6. [执行器](https://www.jinbuguo.com/postgresql/manual/executor.html)

> **【作者】**本章最初是 [_Enhancement of the ANSI SQL Implementation of PostgreSQL_](https://www.jinbuguo.com/postgresql/manual/biblio.html#SIM98) 的一部分，它是 Stefan Simkovics 在维也纳理工大学写的硕士论文，是由 O.Univ.Prof.Dr. Georg Gottlob 和 Univ.Ass. Mag. Katrin Seyr 指导的。

本章给出了 PostgreSQL 后端服务器的内部结构的一个概貌。在阅读完毕下面的章节后，你应该对查询是如何处理的有一个概念了。本章并不准备提供对 PostgreSQL 内部操作的详细描述，因为这样的一份文档将会非常庞大。本章只是试图帮助读者了解从后端收到查询后到结果返回给客户端之间一般操作顺序。
