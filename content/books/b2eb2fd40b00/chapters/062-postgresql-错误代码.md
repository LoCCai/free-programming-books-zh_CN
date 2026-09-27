**类 00 — 成功完成** 00000成功完成  
(SUCCESSFUL COMPLETION)successful\_completion **类 01 — 警告** 01000警告  
(WARNING)warning 0100C返回了动态结果  
(DYNAMIC RESULT SETS RETURNED)dynamic\_result\_sets\_returned 01008警告，隐含补齐了零比特位  
(IMPLICIT ZERO BIT PADDING)implicit\_zero\_bit\_padding 01003在集合函数里消除了 NULL  
(NULL VALUE ELIMINATED IN SET FUNCTION)null\_value\_eliminated\_in\_set\_function 01007没有赋予权限  
(PRIVILEGE NOT GRANTED)privilege\_not\_granted 01006没有撤销权限  
(PRIVILEGE NOT REVOKED)privilege\_not\_revoked 01004字符串数据在右端截断  
(STRING DATA RIGHT TRUNCATION)string\_data\_right\_truncation 01P01废弃的特性  
(DEPRECATED FEATURE)deprecated\_feature **类 02 — 没有数据(按照 SQL 标准的要求，这也是警告类)** 02000没有数据  
(NO DATA)no\_data 02001返回了没有附加动态结果集  
(NO ADDITIONAL DYNAMIC RESULT SETS RETURNED)no\_additional\_dynamic\_result\_sets\_returned **类 03 — SQL 语句尚未结束** 03000SQL 语句尚未结束  
(SQL STATEMENT NOT YET COMPLETE)sql\_statement\_not\_yet\_complete **类 08 — 连接异常** 08000连接异常  
(CONNECTION EXCEPTION)connection\_exception 08003连接不存在  
(CONNECTION DOES NOT EXIST)connection\_does\_not\_exist 08006连接失败  
(CONNECTION FAILURE)connection\_failure 08001SQL 客户端不能建立 SQL 连接  
(SQLCLIENT UNABLE TO ESTABLISH SQLCONNECTION)sqlclient\_unable\_to\_establish\_sqlconnection 08004SQL 服务器拒绝建立 SQL 连接  
(SQLSERVER REJECTED ESTABLISHMENT OF SQLCONNECTION)sqlserver\_rejected\_establishment\_of\_sqlconnection 08007未知的事务解析  
(TRANSACTION RESOLUTION UNKNOWN)transaction\_resolution\_unknown 08P01违反协议  
(PROTOCOL VIOLATION)protocol\_violation **类 09 — 触发器动作异常** 09000触发器动作异常  
(TRIGGERED ACTION EXCEPTION)triggered\_action\_exception **类 0A — 不支持特性** 0A000不支持此特性  
(FEATURE NOT SUPPORTED)feature\_not\_supported **类 0B — 非法事务初始化** 0B000非法事务初始化  
(INVALID TRANSACTION INITIATION)invalid\_transaction\_initiation **类 0F — 定位器异常** 0F000定位器异常  
(LOCATOR EXCEPTION)locator\_exception 0F001非法的定位器声明  
(INVALID LOCATOR SPECIFICATION)invalid\_locator\_specification **类 0L — 非法赋权人** 0L000非法赋权人  
(INVALID GRANTOR)invalid\_grantor 0LP01非法赋权操作  
(INVALID GRANT OPERATION)invalid\_grant\_operation **类 0P — 非法角色声明** 0P000非法角色声明  
(INVALID ROLE SPECIFICATION)invalid\_role\_specification **类 21 — 势违例** 21000势违例  
(CARDINALITY VIOLATION)cardinality\_violation **类 22 — 数据异常** 22000数据异常  
(DATA EXCEPTION)data\_exception 2202E数组下标错误  
(ARRAY SUBSCRIPT ERROR)array\_subscript\_error 22021字符不在准备好的范围内  
(CHARACTER NOT IN REPERTOIRE)character\_not\_in\_repertoire 22008日期时间字段溢出  
(DATETIME FIELD OVERFLOW)datetime\_field\_overflow 22012被零除  
(DIVISION BY ZERO)division\_by\_zero 22005赋值中出错  
(ERROR IN ASSIGNMENT)error\_in\_assignment 2200B逃逸字符冲突  
(ESCAPE CHARACTER CONFLICT)escape\_character\_conflict 22022指示器溢出  
(INDICATOR OVERFLOW)indicator\_overflow 22015内部字段溢出  
(INTERVAL FIELD OVERFLOW)interval\_field\_overflow 2201E对数运算的非法参数  
(INVALID ARGUMENT FOR LOGARITHM)invalid\_argument\_for\_logarithm 2201F指数函数的非法参数  
(INVALID ARGUMENT FOR POWER FUNCTION)invalid\_argument\_for\_power\_function 2201G宽桶函数的非法参数  
(INVALID ARGUMENT FOR WIDTH BUCKET FUNCTION)invalid\_argument\_for\_width\_bucket\_function 22018类型转换时非法的字符值  
(INVALID CHARACTER VALUE FOR CAST)invalid\_character\_value\_for\_cast 22007非法日期时间格式  
(INVALID DATETIME FORMAT)invalid\_datetime\_format 22019非法的逃逸字符  
(INVALID ESCAPE CHARACTER)invalid\_escape\_character 2200D非法的逃逸字节  
(INVALID ESCAPE OCTET)invalid\_escape\_octet 22025非法逃逸序列  
(INVALID ESCAPE SEQUENCE)invalid\_escape\_sequence 22P06非标准使用逃逸字符  
(NONSTANDARD USE OF ESCAPE CHARACTER)nonstandard\_use\_of\_escape\_character 22010非法指示器参数值  
(INVALID INDICATOR PARAMETER VALUE)invalid\_indicator\_parameter\_value 22020非法限制值  
(INVALID LIMIT VALUE)invalid\_limit\_value 22023非法参数值  
(INVALID PARAMETER VALUE)invalid\_parameter\_value 2201B非法正则表达式  
(INVALID REGULAR EXPRESSION)invalid\_regular\_expression 22009非法时区显示值  
(INVALID TIME ZONE DISPLACEMENT VALUE)invalid\_time\_zone\_displacement\_value 2200C非法使用逃逸字符  
(INVALID USE OF ESCAPE CHARACTER)invalid\_use\_of\_escape\_character 2200G最相关类型不匹配  
(MOST SPECIFIC TYPE MISMATCH)most\_specific\_type\_mismatch 22004不允许 NULL 值  
(NULL VALUE NOT ALLOWED)null\_value\_not\_allowed 22002NULL 值不能做指示器参数  
(NULL VALUE NO INDICATOR PARAMETER)null\_value\_no\_indicator\_parameter 22003数字值超出范围  
(NUMERIC VALUE OUT OF RANGE)numeric\_value\_out\_of\_range 22026字符串数据长度不匹配  
(STRING DATA LENGTH MISMATCH)string\_data\_length\_mismatch 22001字符串数据右边被截断  
(STRING DATA RIGHT TRUNCATION)string\_data\_right\_truncation 22011抽取子字符串错误  
(SUBSTRING ERROR)substring\_error 22027截断错误  
(TRIM ERROR)trim\_error 22024未结束的 C 字符串  
(UNTERMINATED C STRING)unterminated\_c\_string 2200F零长度的字符串  
(ZERO LENGTH CHARACTER STRING)zero\_length\_character\_string 22P01浮点异常  
(FLOATING POINT EXCEPTION)floating\_point\_exception 22P02非法文本表现形式  
(INVALID TEXT REPRESENTATION)invalid\_text\_representation 22P03非法二进制表现形式  
(INVALID BINARY REPRESENTATION)invalid\_binary\_representation 22P04错误的 COPY 格式  
(BAD COPY FILE FORMAT)bad\_copy\_file\_format 22P05不可翻译字符  
(UNTRANSLATABLE CHARACTER)untranslatable\_character **类 23 — 违反完整性约束** 23000违反完整性约束  
(INTEGRITY CONSTRAINT VIOLATION)integrity\_constraint\_violation 23001违反限制  
(RESTRICT VIOLATION)restrict\_violation 23502违反非空  
(NOT NULL VIOLATION)not\_null\_violation 23503违反外键约束  
(FOREIGN KEY VIOLATION)foreign\_key\_violation 23505违反唯一约束  
(UNIQUE VIOLATION)unique\_violation 23514违反检查  
(CHECK VIOLATION)check\_violation **类 24 — 非法游标状态** 24000非法游标状态  
(INVALID CURSOR STATE)invalid\_cursor\_state **类 25 — 非法事务状态** 25000非法事务状态  
(INVALID TRANSACTION STATE)invalid\_transaction\_state 25001活跃的 SQL 状态  
(ACTIVE SQL TRANSACTION)active\_sql\_transaction 25002分支事务已经激活  
(BRANCH TRANSACTION ALREADY ACTIVE)branch\_transaction\_already\_active 25008持有的游标要求同样的隔离级别  
(HELD CURSOR REQUIRES SAME ISOLATION LEVEL)held\_cursor\_requires\_same\_isolation\_level 25003对分支事务的不恰当的访问方式  
(INAPPROPRIATE ACCESS MODE FOR BRANCH TRANSACTION)inappropriate\_access\_mode\_for\_branch\_transaction 25004对分支事务的不恰当的隔离级别  
(INAPPROPRIATE ISOLATION LEVEL FOR BRANCH TRANSACTION)inappropriate\_isolation\_level\_for\_branch\_transaction 25005分支事务没有活跃的 SQL 事务  
(NO ACTIVE SQL TRANSACTION FOR BRANCH TRANSACTION)no\_active\_sql\_transaction\_for\_branch\_transaction 25006只读的 SQL 事务  
(READ ONLY SQL TRANSACTION)read\_only\_sql\_transaction 25007不支持混和的模式和数据语句  
(SCHEMA AND DATA STATEMENT MIXING NOT SUPPORTED)schema\_and\_data\_statement\_mixing\_not\_supported 25P01没有活跃的 SQL 事务  
(NO ACTIVE SQL TRANSACTION)no\_active\_sql\_transaction 25P02在失败的 SQL 事务中  
(IN FAILED SQL TRANSACTION)in\_failed\_sql\_transaction **类 26 — 非法 SQL 语句名** 26000非法 SQL 语句名  
(INVALID SQL STATEMENT NAME)invalid\_sql\_statement\_name **类 27 — 触发的数据改变违规** 27000触发的数据改变违规  
(TRIGGERED DATA CHANGE VIOLATION)triggered\_data\_change\_violation **类 28 — 非法授权声明** 28000非法授权声明  
(INVALID AUTHORIZATION SPECIFICATION)invalid\_authorization\_specification **类 2B — 依然存在依赖的优先级描述符** 2B000依然存在依赖的优先级描述符  
(DEPENDENT PRIVILEGE DESCRIPTORS STILL EXIST)dependent\_privilege\_descriptors\_still\_exist 2BP01依赖性对象仍然存在  
(DEPENDENT OBJECTS STILL EXIST)dependent\_objects\_still\_exist **类 2D — 非法的事务终止** 2D000非法的事务终止  
(INVALID TRANSACTION TERMINATION)invalid\_transaction\_termination **类 2F — SQL 过程异常** 2F000SQL 过程异常  
(SQL ROUTINE EXCEPTION)sql\_routine\_exception 2F005执行的函数没有返回语句  
(FUNCTION EXECUTED NO RETURN STATEMENT)function\_executed\_no\_return\_statement 2F002不允许修改 SQL 数据  
(MODIFYING SQL DATA NOT PERMITTED)modifying\_sql\_data\_not\_permitted 2F003企图使用禁止的 SQL 语句  
(PROHIBITED SQL STATEMENT ATTEMPTED)prohibited\_sql\_statement\_attempted 2F004不允许读取 SQL 数据  
(READING SQL DATA NOT PERMITTED)reading\_sql\_data\_not\_permitted **类 34 — 非法游标名** 34000非法游标名  
(INVALID CURSOR NAME)invalid\_cursor\_name **类 38 — 外部过程异常** 38000外部过程异常  
(EXTERNAL ROUTINE EXCEPTION)external\_routine\_exception 38001不允许包含的 SQL  
(CONTAINING SQL NOT PERMITTED)containing\_sql\_not\_permitted 38002不允许修改 SQL 数据  
(MODIFYING SQL DATA NOT PERMITTED)modifying\_sql\_data\_not\_permitted 38003企图使用禁止的 SQL 语句  
(PROHIBITED SQL STATEMENT ATTEMPTED)prohibited\_sql\_statement\_attempted 38004不允许读取 SQL 数据  
(READING SQL DATA NOT PERMITTED)reading\_sql\_data\_not\_permitted **类 39 — 外部过程调用异常** 39000外部过程调用异常  
(EXTERNAL ROUTINE INVOCATION EXCEPTION)external\_routine\_invocation\_exception 39001返回了非法的 SQLSTATE  
(INVALID SQLSTATE RETURNED)invalid\_sqlstate\_returned 39004不允许 NULL  
(NULL VALUE NOT ALLOWED)null\_value\_not\_allowed 39P01违反触发器协议  
(TRIGGER PROTOCOL VIOLATED)trigger\_protocol\_violated 39P02违反 SRF 协议  
(SRF PROTOCOL VIOLATED)srf\_protocol\_violated **类 3B — 保存点异常** 3B000保存点异常  
(SAVEPOINT EXCEPTION)savepoint\_exception 3B001无效的保存点声明  
(INVALID SAVEPOINT SPECIFICATION)invalid\_savepoint\_specification **类 3D — 非法数据库名** 3D000非法数据库名  
(INVALID CATALOG NAME)invalid\_catalog\_name **类 3F — 非法模式名** 3F000非法模式名  
(INVALID SCHEMA NAME)invalid\_schema\_name **类 40 — 事务回滚** 40000事务回滚  
(TRANSACTION ROLLBACK)transaction\_rollback 40002违反事务完整性约束  
(TRANSACTION INTEGRITY CONSTRAINT VIOLATION)transaction\_integrity\_constraint\_violation 40001串行化失败  
(SERIALIZATION FAILURE)serialization\_failure 40003不知道语句是否结束  
(STATEMENT COMPLETION UNKNOWN)statement\_completion\_unknown 40P01侦测到死锁  
(DEADLOCK DETECTED)deadlock\_detected **类 42 — 语法错误或者违反访问规则** 42000语法错误或者违反访问规则  
(SYNTAX ERROR OR ACCESS RULE VIOLATION)syntax\_error\_or\_access\_rule\_violation 42601语法错误  
(SYNTAX ERROR)syntax\_error 42501权限不够  
(INSUFFICIENT PRIVILEGE)insufficient\_privilege 42846无法进行类型转换  
(CANNOT COERCE)cannot\_coerce 42803分组错误  
(GROUPING ERROR)grouping\_error 42830非法的外键  
(INVALID FOREIGN KEY)invalid\_foreign\_key 42602非法名字  
(INVALID NAME)invalid\_name 42622名字太长  
(NAME TOO LONG)name\_too\_long 42939保留名字  
(RESERVED NAME)reserved\_name 42804数据类型不匹配  
(DATATYPE MISMATCH)datatype\_mismatch 42P18未决的数据类型  
(INDETERMINATE DATATYPE)indeterminate\_datatype 42809错误的对象类型  
(WRONG OBJECT TYPE)wrong\_object\_type 42703未定义的字段  
(UNDEFINED COLUMN)undefined\_column 42883未定义的函数  
(UNDEFINED FUNCTION)undefined\_function 42P01未定义的表  
(UNDEFINED TABLE)undefined\_table 42P02未定义的参数  
(UNDEFINED PARAMETER)undefined\_parameter 42704未定义对象  
(UNDEFINED OBJECT)undefined\_object 42701重复的字段  
(DUPLICATE COLUMN)duplicate\_column 42P03重复的游标  
(DUPLICATE CURSOR)duplicate\_cursor 42P04重复的数据库  
(DUPLICATE DATABASE)duplicate\_database 42723重复的函数  
(DUPLICATE FUNCTION)duplicate\_function 42P05重复的预备语句  
(DUPLICATE PREPARED STATEMENT)duplicate\_prepared\_statement 42P06重复的模式  
(DUPLICATE SCHEMA)duplicate\_schema 42P07重复的表  
(DUPLICATE TABLE)duplicate\_table 42712重复的别名  
(DUPLICATE ALIAS)duplicate\_alias 42710重复的对象  
(DUPLICATE OBJECT)duplicate\_object 42702模糊的字段  
(AMBIGUOUS COLUMN)ambiguous\_column 42725模糊的函数  
(AMBIGUOUS FUNCTION)ambiguous\_function 42P08模糊的参数  
(AMBIGUOUS PARAMETER)ambiguous\_parameter 42P09模糊的别名  
(AMBIGUOUS ALIAS)ambiguous\_alias 42P10非法字段引用  
(INVALID COLUMN REFERENCE)invalid\_column\_reference 42611非法字段定义  
(INVALID COLUMN DEFINITION)invalid\_column\_definition 42P11非法游标定义  
(INVALID CURSOR DEFINITION)invalid\_cursor\_definition 42P12非法数据库定义  
(INVALID DATABASE DEFINITION)invalid\_database\_definition 42P13非法函数定义  
(INVALID FUNCTION DEFINITION)invalid\_function\_definition 42P14非法预备语句定义  
(INVALID PREPARED STATEMENT DEFINITION)invalid\_prepared\_statement\_definition 42P15非法模式定义  
(INVALID SCHEMA DEFINITION)invalid\_schema\_definition 42P16非法表定义  
(INVALID TABLE DEFINITION)invalid\_table\_definition 42P17非法对象定义  
(INVALID OBJECT DEFINITION)invalid\_object\_definition **类 44 — 违反 WITH CHECK 选项** 44000违反 WITH CHECK 选项  
(WITH CHECK OPTION VIOLATION)with\_check\_option\_violation **类 53 — 资源不够** 53000资源不够  
(INSUFFICIENT RESOURCES)insufficient\_resources 53100磁盘满  
(DISK FULL)disk\_full 53200内存耗尽  
(OUT OF MEMORY)out\_of\_memory 53300太多连接  
(TOO MANY CONNECTIONS)too\_many\_connections **类 54 — 超过程序限制** 54000超过程序限制  
(PROGRAM LIMIT EXCEEDED)program\_limit\_exceeded 54001语句太复杂  
(STATEMENT TOO COMPLEX)statement\_too\_complex 54011字段太多  
(TOO MANY COLUMNS)too\_many\_columns 54023参数太多  
(TOO MANY ARGUMENTS)too\_many\_arguments **类 55 — 对象不在预先要求的状态** 55000对象不在预先要求的状态  
(OBJECT NOT IN PREREQUISITE STATE)object\_not\_in\_prerequisite\_state 55006对象在使用中  
(OBJECT IN USE)object\_in\_use 55P02无法修改运行时参数  
(CANT CHANGE RUNTIME PARAM)cant\_change\_runtime\_param 55P03锁不可获得  
(LOCK NOT AVAILABLE)lock\_not\_available **类 57 — 操作者干涉** 57000操作者干涉  
(OPERATOR INTERVENTION)operator\_intervention 57014查询被取消  
(QUERY CANCELED)query\_canceled 57P01管理员关机  
(ADMIN SHUTDOWN)admin\_shutdown 57P02崩溃关机  
(CRASH SHUTDOWN)crash\_shutdown 57P03现在无法连接  
(CANNOT CONNECT NOW)cannot\_connect\_now **类 58 — 系统错误(PostgreSQL 自己内部的错误)** 58030IO 错误  
(IO ERROR)io\_error 58P01未定义的文件  
(UNDEFINED FILE)undefined\_file 58P02重复的文件  
(DUPLICATE FILE)duplicate\_file **类 F0 — 配置文件错误** F0000配置文件错误  
(CONFIG FILE ERROR)config\_file\_error F0001锁文件存在  
(LOCK FILE EXISTS)lock\_file\_exists **类 P0 — PL/pgSQL 错误** P0000PLPGSQL 错误  
(PLPGSQL ERROR)plpgsql\_error P0001抛出异常  
(RAISE EXCEPTION)raise\_exception P0002未找到数据  
(NO DATA FOUND)no\_data\_found P0003行太多  
(TOO MANY ROWS)too\_many\_rows **类 XX — 内部错误** XX000内部错误  
(INTERNAL ERROR)internal\_error XX001数据损坏  
(DATA CORRUPTED)data\_corrupted XX002索引损坏  
(INDEX CORRUPTED)index\_corrupted
