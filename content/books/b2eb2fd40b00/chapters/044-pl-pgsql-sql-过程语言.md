## 章37. PL/pgSQL - SQL 过程语言

**目录**

37.1. [概述](https://www.jinbuguo.com/postgresql/manual/plpgsql-overview.html)

37.1.1. [使用 PL/pgSQL 的优点](https://www.jinbuguo.com/postgresql/manual/plpgsql-overview.html#PLPGSQL-ADVANTAGES)

37.1.2. [所支持的参数和结果数据类型](https://www.jinbuguo.com/postgresql/manual/plpgsql-overview.html#PLPGSQL-ARGS-RESULTS)

37.2. [开发 PL/pgSQL 的一些提示](https://www.jinbuguo.com/postgresql/manual/plpgsql-development-tips.html)

37.3. [PL/pgSQL 的结构](https://www.jinbuguo.com/postgresql/manual/plpgsql-structure.html)

37.4. [声明](https://www.jinbuguo.com/postgresql/manual/plpgsql-declarations.html)

37.4.1. [函数参数的别名](https://www.jinbuguo.com/postgresql/manual/plpgsql-declarations.html#PLPGSQL-DECLARATION-ALIASES)

37.4.2. [拷贝类型](https://www.jinbuguo.com/postgresql/manual/plpgsql-declarations.html#PLPGSQL-DECLARATION-TYPE)

37.4.3. [行类型](https://www.jinbuguo.com/postgresql/manual/plpgsql-declarations.html#PLPGSQL-DECLARATION-ROWTYPES)

37.4.4. [记录类型](https://www.jinbuguo.com/postgresql/manual/plpgsql-declarations.html#PLPGSQL-DECLARATION-RECORDS)

37.4.5. [RENAME](https://www.jinbuguo.com/postgresql/manual/plpgsql-declarations.html#PLPGSQL-DECLARATION-RENAMING-VARS)

37.5. [表达式](https://www.jinbuguo.com/postgresql/manual/plpgsql-expressions.html)

37.6. [基本语句](https://www.jinbuguo.com/postgresql/manual/plpgsql-statements.html)

37.6.1. [赋值](https://www.jinbuguo.com/postgresql/manual/plpgsql-statements.html#PLPGSQL-STATEMENTS-ASSIGNMENT)

37.6.2. [执行一个没有结果的查询](https://www.jinbuguo.com/postgresql/manual/plpgsql-statements.html#PLPGSQL-STATEMENTS-SQL-NORESULT)

37.6.3. [执行一个仅有单行结果的查询](https://www.jinbuguo.com/postgresql/manual/plpgsql-statements.html#PLPGSQL-STATEMENTS-SQL-ONEROW)

37.6.4. [什么也不做](https://www.jinbuguo.com/postgresql/manual/plpgsql-statements.html#PLPGSQL-STATEMENTS-NULL)

37.6.5. [执行动态命令](https://www.jinbuguo.com/postgresql/manual/plpgsql-statements.html#PLPGSQL-STATEMENTS-EXECUTING-DYN)

37.6.6. [获取结果状态](https://www.jinbuguo.com/postgresql/manual/plpgsql-statements.html#PLPGSQL-STATEMENTS-DIAGNOSTICS)

37.7. [控制结构](https://www.jinbuguo.com/postgresql/manual/plpgsql-control-structures.html)

37.7.1. [从函数返回](https://www.jinbuguo.com/postgresql/manual/plpgsql-control-structures.html#PLPGSQL-STATEMENTS-RETURNING)

37.7.2. [条件](https://www.jinbuguo.com/postgresql/manual/plpgsql-control-structures.html#PLPGSQL-CONDITIONALS)

37.7.3. [简单循环](https://www.jinbuguo.com/postgresql/manual/plpgsql-control-structures.html#PLPGSQL-CONTROL-STRUCTURES-LOOPS)

37.7.4. [遍历命令结果](https://www.jinbuguo.com/postgresql/manual/plpgsql-control-structures.html#PLPGSQL-RECORDS-ITERATING)

37.7.5. [捕获错误](https://www.jinbuguo.com/postgresql/manual/plpgsql-control-structures.html#PLPGSQL-ERROR-TRAPPING)

37.8. [游标](https://www.jinbuguo.com/postgresql/manual/plpgsql-cursors.html)

37.8.1. [声明游标变量](https://www.jinbuguo.com/postgresql/manual/plpgsql-cursors.html#PLPGSQL-CURSOR-DECLARATIONS)

37.8.2. [打开游标](https://www.jinbuguo.com/postgresql/manual/plpgsql-cursors.html#PLPGSQL-CURSOR-OPENING)

37.8.3. [使用游标](https://www.jinbuguo.com/postgresql/manual/plpgsql-cursors.html#PLPGSQL-CURSOR-USING)

37.9. [错误和消息](https://www.jinbuguo.com/postgresql/manual/plpgsql-errors-and-messages.html)

37.10. [触发器过程](https://www.jinbuguo.com/postgresql/manual/plpgsql-trigger.html)

37.11. [从 Oracle PL/SQL 进行移植](https://www.jinbuguo.com/postgresql/manual/plpgsql-porting.html)

37.11.1. [移植样例](https://www.jinbuguo.com/postgresql/manual/plpgsql-porting.html#AEN40696)

37.11.2. [其它注意事项](https://www.jinbuguo.com/postgresql/manual/plpgsql-porting.html#PLPGSQL-PORTING-OTHER)

37.11.3. [附录](https://www.jinbuguo.com/postgresql/manual/plpgsql-porting.html#PLPGSQL-PORTING-APPENDIX)

PL/pgSQL 是 PostgreSQL 数据库系统的一个可加载的过程语言。PL/pgSQL 的设计目标是创建一种可加载的过程语言，可以

-   用于创建函数和触发器过程
    
-   为 SQL 语言增加控制结构
    
-   执行复杂的计算
    
-   继承所有用户定义类型、函数、操作符
    
-   定义为被服务器信任的语言
    
-   容易使用
    

除了用于用户定义类型的输入/输出转换和计算函数以外，任何可以在 C 语言函数里定义的东西都可以在 PL/pgSQL 里使用。比如，可以创建复杂的条件计算函数，并随后将之用于定义操作符或者用于函数索引中。
