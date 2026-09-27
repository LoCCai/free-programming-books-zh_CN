[![\_images/cover.jpg](https://sicp.readthedocs.io/en/latest/_images/cover.jpg)](https://sicp.readthedocs.io/en/latest/_images/cover.jpg)

这个文档的目标是成为中文化的、完整的[《计算机程序的构造和解释》](http://book.douban.com/subject/1148282)一书的解题集。

这个解题集的特色是：

对于每道习题，除了习题答案之外，还给出习题的讲解和相关资料(如果有的话)；

使用 MIT Scheme 作为编程环境，完全避免了代码不兼容的问题；

所有代码都经过测试，确保准确性。

[相关软件和链接](https://sicp.readthedocs.io/en/latest/relate.html) 介绍了这个解题集中用到的程序和工具。

## 第一章： 构造过程抽象[¶](#chp1 "Permalink to this headline")

-   1.1 程序设计的基本元素
    
    > -   1.1.1 表达式
    > -   1.1.2 命名和环境
    > -   1.1.3 组合式的求值
    > -   1.1.4 复合过程
    > -   1.1.5 过程应用的代换模型
    > -   1.1.6 条件表达式和谓词([练习 1.1](https://sicp.readthedocs.io/en/latest/chp1/1.html)，[练习 1.2](https://sicp.readthedocs.io/en/latest/chp1/2.html)，[练习 1.3](https://sicp.readthedocs.io/en/latest/chp1/3.html)，[练习 1.4](https://sicp.readthedocs.io/en/latest/chp1/4.html)，[练习 1.5](https://sicp.readthedocs.io/en/latest/chp1/5.html))
    > -   1.1.7 实例： 采用牛顿法求平方根([练习 1.6](https://sicp.readthedocs.io/en/latest/chp1/6.html)，[练习 1.7](https://sicp.readthedocs.io/en/latest/chp1/7.html)，[练习 1.8](https://sicp.readthedocs.io/en/latest/chp1/8.html))
    > -   1.1.8 过程作为黑箱抽象
    
-   1.2 过程与它们所产生的计算
    
    > -   1.2.1 线性的递归和迭代([练习 1.9](https://sicp.readthedocs.io/en/latest/chp1/9.html)，[练习 1.10](https://sicp.readthedocs.io/en/latest/chp1/10.html))
    > -   1.2.2 树形递归([练习 1.11](https://sicp.readthedocs.io/en/latest/chp1/11.html)，[练习 1.12](https://sicp.readthedocs.io/en/latest/chp1/12.html)，[练习 1.13](https://sicp.readthedocs.io/en/latest/chp1/13.html))
    > -   1.2.3 增长的阶([练习 1.14](https://sicp.readthedocs.io/en/latest/chp1/14.html)，[练习 1.15](https://sicp.readthedocs.io/en/latest/chp1/15.html))
    > -   1.2.4 求幂([练习 1.16](https://sicp.readthedocs.io/en/latest/chp1/16.html)，[练习 1.17](https://sicp.readthedocs.io/en/latest/chp1/17.html)，[练习 1.18](https://sicp.readthedocs.io/en/latest/chp1/18.html)，[练习 1.19](https://sicp.readthedocs.io/en/latest/chp1/19.html))
    > -   1.2.5 最大公约数([练习 1.20](https://sicp.readthedocs.io/en/latest/chp1/20.html))
    > -   1.2.6 实例： 素数检测([练习 1.21](https://sicp.readthedocs.io/en/latest/chp1/21.html)，[练习 1.22](https://sicp.readthedocs.io/en/latest/chp1/22.html)，[练习 1.23](https://sicp.readthedocs.io/en/latest/chp1/23.html)，[练习 1.24](https://sicp.readthedocs.io/en/latest/chp1/24.html)，[练习 1.25](https://sicp.readthedocs.io/en/latest/chp1/25.html)，[练习 1.26](https://sicp.readthedocs.io/en/latest/chp1/26.html)，[练习 1.27](https://sicp.readthedocs.io/en/latest/chp1/27.html)，[练习 1.28](https://sicp.readthedocs.io/en/latest/chp1/28.html))
    
-   1.3 用高阶函数做抽象
    
    > -   1.3.1 过程作为参数([练习 1.29](https://sicp.readthedocs.io/en/latest/chp1/29.html)，[练习 1.30](https://sicp.readthedocs.io/en/latest/chp1/30.html)，[练习 1.31](https://sicp.readthedocs.io/en/latest/chp1/31.html)，[练习 1.32](https://sicp.readthedocs.io/en/latest/chp1/32.html)，[练习 1.33](https://sicp.readthedocs.io/en/latest/chp1/33.html))
    > -   1.3.2 用 lambda 构造过程([练习 1.34](https://sicp.readthedocs.io/en/latest/chp1/34.html))
    > -   1.3.3 过程作为一般性的方法([练习 1.35](https://sicp.readthedocs.io/en/latest/chp1/35.html)，[练习 1.36](https://sicp.readthedocs.io/en/latest/chp1/36.html)，[练习 1.37](https://sicp.readthedocs.io/en/latest/chp1/37.html)，[练习 1.38](https://sicp.readthedocs.io/en/latest/chp1/38.html)，[练习 1.39](https://sicp.readthedocs.io/en/latest/chp1/39.html))
    > -   1.3.4 过程作为返回值([练习 1.40](https://sicp.readthedocs.io/en/latest/chp1/40.html)，[练习 1.41](https://sicp.readthedocs.io/en/latest/chp1/41.html)，[练习 1.42](https://sicp.readthedocs.io/en/latest/chp1/42.html)，[练习 1.43](https://sicp.readthedocs.io/en/latest/chp1/43.html)，[练习 1.44](https://sicp.readthedocs.io/en/latest/chp1/44.html)，[练习 1.45](https://sicp.readthedocs.io/en/latest/chp1/45.html)，[练习 1.46](https://sicp.readthedocs.io/en/latest/chp1/46.html))
    

## 第二章： 构造数据抽象[¶](#chp2 "Permalink to this headline")

-   2.1 数据抽象导引
    
    > -   2.1.1 实例： 有理数的算术运算([练习 2.1](https://sicp.readthedocs.io/en/latest/chp2/1.html))
    > -   2.1.2 抽象屏障([练习 2.2](https://sicp.readthedocs.io/en/latest/chp2/2.html)，[练习 2.3](https://sicp.readthedocs.io/en/latest/chp2/3.html))
    > -   2.1.3 数据意味着什么([练习 2.4](https://sicp.readthedocs.io/en/latest/chp2/4.html)，[练习 2.5](https://sicp.readthedocs.io/en/latest/chp2/5.html)，[练习 2.6](https://sicp.readthedocs.io/en/latest/chp2/6.html))
    > -   2.1.4 扩展练习： 区间算术(chp2/7，chp2/8，chp2/9，chp2/10，chp2/11，chp2/12，chp2/13，chp2/14，chp2/15，chp2/16)
    
-   2.2 层次性数据和闭包性质
    
    > -   2.2.1 序列的表示([练习 2.17](https://sicp.readthedocs.io/en/latest/chp2/17.html)，[练习 2.18](https://sicp.readthedocs.io/en/latest/chp2/18.html)，[练习 2.19](https://sicp.readthedocs.io/en/latest/chp2/19.html)，[练习 2.20](https://sicp.readthedocs.io/en/latest/chp2/20.html)，[练习 2.21](https://sicp.readthedocs.io/en/latest/chp2/21.html)，[练习 2.22](https://sicp.readthedocs.io/en/latest/chp2/22.html)，[练习 2.23](https://sicp.readthedocs.io/en/latest/chp2/23.html))
    > -   2.2.2 层次性结构([练习 2.24](https://sicp.readthedocs.io/en/latest/chp2/24.html)，[练习 2.25](https://sicp.readthedocs.io/en/latest/chp2/25.html)，[练习 2.26](https://sicp.readthedocs.io/en/latest/chp2/26.html)，[练习 2.27](https://sicp.readthedocs.io/en/latest/chp2/27.html)，[练习 2.28](https://sicp.readthedocs.io/en/latest/chp2/28.html)，[练习 2.29](https://sicp.readthedocs.io/en/latest/chp2/29.html)，[练习 2.30](https://sicp.readthedocs.io/en/latest/chp2/30.html)，[练习 2.31](https://sicp.readthedocs.io/en/latest/chp2/31.html)，[练习 2.32](https://sicp.readthedocs.io/en/latest/chp2/32.html))
    > -   2.2.3 序列作为一种约定的界面([练习 2.33](https://sicp.readthedocs.io/en/latest/chp2/33.html)，[练习 2.34](https://sicp.readthedocs.io/en/latest/chp2/34.html)，[练习 2.35](https://sicp.readthedocs.io/en/latest/chp2/35.html)，[练习 2.36](https://sicp.readthedocs.io/en/latest/chp2/36.html)，[练习 2.37](https://sicp.readthedocs.io/en/latest/chp2/37.html)，[练习 2.38](https://sicp.readthedocs.io/en/latest/chp2/38.html)，[练习 2.39](https://sicp.readthedocs.io/en/latest/chp2/39.html)，[练习 2.40](https://sicp.readthedocs.io/en/latest/chp2/40.html)，[练习 2.41](https://sicp.readthedocs.io/en/latest/chp2/41.html)，[练习 2.42](https://sicp.readthedocs.io/en/latest/chp2/42.html)，[练习 2.43](https://sicp.readthedocs.io/en/latest/chp2/43.html))
    > -   2.2.4 实例： 一个图形语言([练习 2.44](https://sicp.readthedocs.io/en/latest/chp2/44.html)，[练习 2.45](https://sicp.readthedocs.io/en/latest/chp2/45.html)，[练习 2.46](https://sicp.readthedocs.io/en/latest/chp2/46.html)，[练习 2.47](https://sicp.readthedocs.io/en/latest/chp2/47.html)，[练习 2.48](https://sicp.readthedocs.io/en/latest/chp2/48.html)，[练习 2.49](https://sicp.readthedocs.io/en/latest/chp2/49.html)，[练习 2.50](https://sicp.readthedocs.io/en/latest/chp2/50.html)，[练习 2.51](https://sicp.readthedocs.io/en/latest/chp2/51.html)，[练习 2.52](https://sicp.readthedocs.io/en/latest/chp2/52.html))
    
-   2.3 符号数据
    
    > -   2.3.1 引号([练习 2.53](https://sicp.readthedocs.io/en/latest/chp2/53.html)，[练习 2.54](https://sicp.readthedocs.io/en/latest/chp2/54.html)，[练习 2.55](https://sicp.readthedocs.io/en/latest/chp2/55.html))
    > -   2.3.2 实例： 符号求导([练习 2.56](https://sicp.readthedocs.io/en/latest/chp2/56.html)，[练习 2.57](https://sicp.readthedocs.io/en/latest/chp2/57.html)，[练习 2.58](https://sicp.readthedocs.io/en/latest/chp2/58.html))
    > -   2.3.3 实例： 集合的表示([练习 2.59](https://sicp.readthedocs.io/en/latest/chp2/59.html)，[练习 2.60](https://sicp.readthedocs.io/en/latest/chp2/60.html)，[练习 2.61](https://sicp.readthedocs.io/en/latest/chp2/61.html)，[练习 2.62](https://sicp.readthedocs.io/en/latest/chp2/62.html)，[练习 2.63](https://sicp.readthedocs.io/en/latest/chp2/63.html)，[练习 2.64](https://sicp.readthedocs.io/en/latest/chp2/64.html)，[练习 2.65](https://sicp.readthedocs.io/en/latest/chp2/65.html)，[练习 2.66](https://sicp.readthedocs.io/en/latest/chp2/66.html))
    > -   2.3.4 实例： Huffman 编码树([练习 2.67](https://sicp.readthedocs.io/en/latest/chp2/67.html)，[练习 2.68](https://sicp.readthedocs.io/en/latest/chp2/68.html)，[练习 2.69](https://sicp.readthedocs.io/en/latest/chp2/69.html)，[练习 2.70](https://sicp.readthedocs.io/en/latest/chp2/70.html)，[练习 2.71](https://sicp.readthedocs.io/en/latest/chp2/71.html)，[练习 2.72](https://sicp.readthedocs.io/en/latest/chp2/72.html))
    
-   2.4 抽象数据的多重表示
    
    > -   2.4.1 复数的表示
    > -   2.4.2 带标志数据
    > -   2.4.3 数据导向的程序设计的可加性([练习 2.73](https://sicp.readthedocs.io/en/latest/chp2/73.html)，[练习 2.74](https://sicp.readthedocs.io/en/latest/chp2/74.html)，[练习 2.75](https://sicp.readthedocs.io/en/latest/chp2/75.html)，[练习 2.76](https://sicp.readthedocs.io/en/latest/chp2/76.html))
    
-   2.5 带有通用型操作的系统
    
    > -   2.5.1 通用型算术运算([练习 2.77](https://sicp.readthedocs.io/en/latest/chp2/77.html)，[练习 2.78](https://sicp.readthedocs.io/en/latest/chp2/78.html)，[练习 2.79](https://sicp.readthedocs.io/en/latest/chp2/79.html)， [练习 2.80](https://sicp.readthedocs.io/en/latest/chp2/80.html))
    > -   2.5.2 不同类型数据的组合([练习 2.81](https://sicp.readthedocs.io/en/latest/chp2/81.html)，chp2/82，chp2/83，chp2/84，chp2/85，chp2/86)
    > -   2.5.3 实例： 符号代数(chp2/87，chp2/88，chp2/89，chp2/90，chp2/91，chp2/92，chp2/93，chp2/94，chp2/95，chp2/96，chp2/97)
    

## 第三章： 模块化、对象和状态[¶](#chp3 "Permalink to this headline")

-   3.1 赋值和局部状态
    
    > -   3.1.1 局部状态变量([练习 3.1](https://sicp.readthedocs.io/en/latest/chp3/1.html)，[练习 3.2](https://sicp.readthedocs.io/en/latest/chp3/2.html)，[练习 3.3](https://sicp.readthedocs.io/en/latest/chp3/3.html)，[练习 3.4](https://sicp.readthedocs.io/en/latest/chp3/4.html))
    > -   3.1.2 引进赋值带来的利益([练习 3.5](https://sicp.readthedocs.io/en/latest/chp3/5.html)，[练习 3.6](https://sicp.readthedocs.io/en/latest/chp3/6.html))
    > -   3.1.3 引进赋值的代价([练习 3.7](https://sicp.readthedocs.io/en/latest/chp3/7.html)，[练习 3.8](https://sicp.readthedocs.io/en/latest/chp3/8.html))
    
-   3.2 求值的环境模型
    
    > -   3.2.1 求值规则
    > -   3.2.2 简单过程的应用([练习 3.9](https://sicp.readthedocs.io/en/latest/chp3/9.html))
    > -   3.2.3 将框架看作局部状态的展台([练习 3.10](https://sicp.readthedocs.io/en/latest/chp3/10.html))
    > -   3.2.4 内部定义([练习 3.11](https://sicp.readthedocs.io/en/latest/chp3/11.html))
    
-   3.3 用变动数据做模拟
    
    > -   3.3.1 变动的表结构([练习 3.12](https://sicp.readthedocs.io/en/latest/chp3/12.html)，[练习 3.13](https://sicp.readthedocs.io/en/latest/chp3/13.html)，[练习 3.14](https://sicp.readthedocs.io/en/latest/chp3/14.html)，[练习 3.15](https://sicp.readthedocs.io/en/latest/chp3/15.html)，[练习 3.16](https://sicp.readthedocs.io/en/latest/chp3/16.html)，[练习 3.17](https://sicp.readthedocs.io/en/latest/chp3/17.html)，[练习 3.18](https://sicp.readthedocs.io/en/latest/chp3/18.html)，[练习 3.19](https://sicp.readthedocs.io/en/latest/chp3/19.html)，[练习 3.20](https://sicp.readthedocs.io/en/latest/chp3/20.html))
    > -   3.3.2 队列的表示([练习 3.21](https://sicp.readthedocs.io/en/latest/chp3/21.html)，[练习 3.22](https://sicp.readthedocs.io/en/latest/chp3/22.html)，[练习 3.23](https://sicp.readthedocs.io/en/latest/chp3/23.html))
    > -   3.3.3 表格的表示([练习 3.24](https://sicp.readthedocs.io/en/latest/chp3/24.html)，[练习 3.25](https://sicp.readthedocs.io/en/latest/chp3/25.html)，[练习 3.26](https://sicp.readthedocs.io/en/latest/chp3/26.html)，[练习 3.27](https://sicp.readthedocs.io/en/latest/chp3/27.html))
    > -   3.3.4 数字电路的模拟器([练习 3.28](https://sicp.readthedocs.io/en/latest/chp3/28.html)，[练习 3.29](https://sicp.readthedocs.io/en/latest/chp3/29.html)，[练习 3.30](https://sicp.readthedocs.io/en/latest/chp3/30.html)，[练习 3.31](https://sicp.readthedocs.io/en/latest/chp3/31.html)，[练习 3.32](https://sicp.readthedocs.io/en/latest/chp3/32.html))
    > -   3.3.5 约束的传播([练习 3.33](https://sicp.readthedocs.io/en/latest/chp3/33.html)，[练习 3.34](https://sicp.readthedocs.io/en/latest/chp3/34.html)，[练习 3.35](https://sicp.readthedocs.io/en/latest/chp3/35.html)，[练习 3.36](https://sicp.readthedocs.io/en/latest/chp3/36.html)，[练习 3.37](https://sicp.readthedocs.io/en/latest/chp3/37.html))
    
-   3.4 并发：时间是一个本质问题
    
    > -   3.4.1 并发系统中时间的性质([练习 3.38](https://sicp.readthedocs.io/en/latest/chp3/38.html))
    > -   3.4.2 控制并发的机制([练习 3.39](https://sicp.readthedocs.io/en/latest/chp3/39.html)，[练习 3.40](https://sicp.readthedocs.io/en/latest/chp3/40.html)，[练习 3.41](https://sicp.readthedocs.io/en/latest/chp3/41.html)，[练习 3.42](https://sicp.readthedocs.io/en/latest/chp3/42.html)，[练习 3.43](https://sicp.readthedocs.io/en/latest/chp3/43.html)，[练习 3.44](https://sicp.readthedocs.io/en/latest/chp3/44.html)，[练习 3.45](https://sicp.readthedocs.io/en/latest/chp3/45.html)，[练习 3.46](https://sicp.readthedocs.io/en/latest/chp3/46.html)，[练习 3.47](https://sicp.readthedocs.io/en/latest/chp3/47.html)，[练习 3.48](https://sicp.readthedocs.io/en/latest/chp3/48.html)，[练习 3.49](https://sicp.readthedocs.io/en/latest/chp3/49.html))
    
-   3.5 流
    
    > -   3.5.1 流作为延时的表([练习 3.50](https://sicp.readthedocs.io/en/latest/chp3/50.html)，[练习 3.51](https://sicp.readthedocs.io/en/latest/chp3/51.html)，[练习 3.52](https://sicp.readthedocs.io/en/latest/chp3/52.html))
    > -   3.5.2 无穷流([练习 3.53](https://sicp.readthedocs.io/en/latest/chp3/53.html)，[练习 3.54](https://sicp.readthedocs.io/en/latest/chp3/54.html)，[练习 3.55](https://sicp.readthedocs.io/en/latest/chp3/55.html)，[练习 3.56](https://sicp.readthedocs.io/en/latest/chp3/56.html)，[练习 3.57](https://sicp.readthedocs.io/en/latest/chp3/57.html)，[练习 3.58](https://sicp.readthedocs.io/en/latest/chp3/58.html)，[练习 3.59](https://sicp.readthedocs.io/en/latest/chp3/59.html)，chp3/60，chp3/61，chp3/62)
    > -   3.5.3 流计算模式的使用([练习 3.63](https://sicp.readthedocs.io/en/latest/chp3/63.html)，[练习 3.64](https://sicp.readthedocs.io/en/latest/chp3/64.html)，[练习 3.65](https://sicp.readthedocs.io/en/latest/chp3/65.html)，[练习 3.66](https://sicp.readthedocs.io/en/latest/chp3/66.html)，chp3/67，chp3/68，chp3/69，chp3/70，chp3/71，chp3/72，chp3/73，chp3/74，chp3/75，chp3/76)
    > -   3.5.4 流和延时求值(chp3/77，chp3/78，chp3/79，chp3/80)
    > -   3.5.5 函数式程序的模块化和对象的模块化(chp3/81，chp3/82)
    

## 第四章： 元语言抽象[¶](#chp4 "Permalink to this headline")

-   4.1 元循环求值器
    
    > -   4.1.1 求值器的内核([练习 4.1](https://sicp.readthedocs.io/en/latest/chp4/1.html))
    > -   4.1.2 表达式的表示([练习 4.2](https://sicp.readthedocs.io/en/latest/chp4/2.html)，[练习 4.3](https://sicp.readthedocs.io/en/latest/chp4/3.html)，[练习 4.4](https://sicp.readthedocs.io/en/latest/chp4/4.html)，[练习 4.5](https://sicp.readthedocs.io/en/latest/chp4/5.html)，[练习 4.6](https://sicp.readthedocs.io/en/latest/chp4/6.html)，[练习 4.7](https://sicp.readthedocs.io/en/latest/chp4/7.html)，[练习 4.8](https://sicp.readthedocs.io/en/latest/chp4/8.html)，[练习 4.9](https://sicp.readthedocs.io/en/latest/chp4/9.html)，[练习 4.10](https://sicp.readthedocs.io/en/latest/chp4/10.html))
    > -   4.1.3 求值器数据结构([练习 4.11](https://sicp.readthedocs.io/en/latest/chp4/11.html)，[练习 4.12](https://sicp.readthedocs.io/en/latest/chp4/12.html)，[练习 4.13](https://sicp.readthedocs.io/en/latest/chp4/13.html))
    > -   4.1.4 作为程序运行这个求值器([练习 4.14](https://sicp.readthedocs.io/en/latest/chp4/14.html))
    > -   4.1.5 将数据作为程序(chp4/15)
    > -   4.1.6 内部表示(chp4/16，chp4/17，chp4/18，chp4/19，chp4/20，chp4/21)
    > -   4.1.7 将语法分析和执行分离(chp4/22，chp4/23，chp4/24)
    
-   4.2 Scheme 的变形 —— 惰性求值
    
    > -   4.2.1 正则序和应用序(chp4/25，chp4/26)
    > -   4.2.2 一个采用惰性求值的解释器(chp4/27，chp4/28，chp4/29，chp4/30，chp4/31)
    > -   4.2.3 将流作为惰性的表(chp4/32，chp4/33，chp4/34)
    
-   4.3 Scheme 的变形 —— 非确定性求值
    
    > -   4.3.1 amb 和搜索(chp4/35，chp4/36，chp4/37)
    > -   4.3.2 非确定性程序的实例(chp4/38，chp4/39，chp4/40，chp4/41，chp4/42，chp4/43，chp4/44，chp4/45，chp4/46，chp4/47，chp4/48，chp4/49)
    > -   4.3.3 实现 amb 求值器(chp4/50，chp4/51，chp4/52，chp4/53，chp4/54)
    
-   4.4 逻辑程序设计
    
    > -   4.4.1 演绎信息检索(chp4/55，chp4/56，chp4/57，chp4/58，chp4/59，chp4/60，chp4/61，chp4/62，chp4/63)
    > -   4.4.2 查询系统如何工作
    > -   4.4.3 逻辑程序设计是数理逻辑吗(chp4/64，chp4/65，chp4/66，chp4/67，chp4/68，chp4/69)
    > -   4.4.4 查询系统的实现(chp4/70，chp4/71，chp4/72，chp4/73，chp4/74，chp4/75，chp4/76，chp4/77，chp4/78，chp4/79)
    

## 第五章： 寄存器机器里的计算[¶](#chp5 "Permalink to this headline")

-   5.1 寄存器机器的设计(chp5/1)
    
    > -   5.1.1 一种描述寄存器机器的语言(chp5/2)
    > -   5.1.2 机器设计的抽象(chp5/3)
    > -   5.1.3 子程序
    > -   5.1.4 采用堆栈实现递归(chp5/4，chp5/5，chp5/6)
    > -   5.1.5 指令总结
    
-   5.2 一个寄存器机器模拟器(chp5/7)
    
    > -   5.2.1 机器模型
    > -   5.2.2 汇编程序(chp5/8)
    > -   5.2.3 为指令生成执行过程(chp5/9，chp5/10，chp5/11，chp5/12，chp5/13)
    > -   5.2.4 监视机器执行(chp5/14，chp5/15，chp5/16，chp5/17，chp5/18，chp5/19)
    
-   5.3 存储分配和废料收集
    
    > -   5.3.1 将存储看作向量(chp5/20，chp5/21，chp5/22)
    > -   5.3.2 维持一种无穷存储的假象
    
-   5.4 显式控制的求值器
    
    > -   5.4.1 显式控制求值器的内核
    > -   5.4.2 序列的求值和尾递归
    > -   5.4.3 条件、赋值和定义(chp5/23，chp5/24，chp5/25)
    > -   5.4.4 求值器的运行(chp5/26，chp5/27，chp5/28，chp5/29，chp5/30)
    
-   5.5 编译
    
    > -   5.5.1 编译器的结构(chp5/31，chp5/32)
    > -   5.5.2 表达式的编译
    > -   5.5.3 组合式的编译
    > -   5.5.4 指令序列的组合
    > -   5.5.5 编译代码的实例(chp5/33，chp5/34，chp5/35，chp5/36，chp5/37，chp5/38)
    > -   5.5.6 词法地址(chp5/39，chp5/40，chp5/41，chp5/42，chp5/43，chp5/44)
    > -   5.5.7 编译代码和求值器的互连(chp5/45，chp5/46，chp5/47，chp5/48，chp5/49，chp5/50，chp5/51，chp5/52)
    

## 下载离线版本[¶](#id8 "Permalink to this headline")

[HTML 格式](https://media.readthedocs.org/htmlzip/sicp/latest/sicp.zip)

注意，因为文档总是在不断地更新和修正当中，请定期下载最新的离线文档，确保获得最好的阅读体验。
