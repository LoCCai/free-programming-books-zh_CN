这篇文章和那个读取天气预报的类似.<br/> 首先你需要根据WebService的描述，即WSDL语言生成本地的访问文件（java文件）。你需要用的axis中的org.apache.axis.wsdl.WSDL2Java，关于这个的使用网上有很多教程，这里我就最简单的描述一下

## [WebService深入学习之三：编写客户端访问你的WebService](https://www.the5fire.com/WebService%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0%E4%B9%8B%E4%B8%89%EF%BC%9A%E7%BC%96%E5%86%99%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AE%BF%E9%97%AE%E4%BD%A0%E7%9A%84WebService.html)

接着上篇文章，这里要写一个简单的程序来读取你编写的WebService，使用java语言，当然你也可以使用C#来编写。 首先你需要把引入你的jar包，就是axis的lib目录下的那些东东。 然后编写程序： \[cc lang="java"\] package client; i

## [WebService深入学习之二：WebService HelloWorld](https://www.the5fire.com/WebService%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0%E4%B9%8B%E4%BA%8C%EF%BC%9AWebService-HelloWorld.html)

﻿ 几乎学习所有的新技术一开始都要写这么一个demo，webservice自然也不能例外。 其实这个HelloWorld十分简单，就和你的java版HelloWorld一样。不过你需要把其后缀改为.jws \[cc lang="java"\] public class Hell

## [WebService深入学习之一：安装axis](https://www.the5fire.com/WebService%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0%E4%B9%8B%E4%B8%80%EF%BC%9A%E5%AE%89%E8%A3%85axis.html)

[J2EE](https://www.the5fire.com/category/j2ee/) 标签: [WebService深入学习](https://www.the5fire.com/tag/WebService%E6%B7%B1%E5%85%A5%E5%AD%A6%E4%B9%A0/) [安装axis](https://www.the5fire.com/tag/%E5%AE%89%E8%A3%85axis/) 2011-01-25 阅读: 14634

上午买完票，下午睡个觉之后继续研究WebService，以前也写过这方面的内容——《<a href="http://www.the5fire.net/?p=188">使用Webservice读取网络上的天气预报</a>》，不过那个只是简单的使用存根方法读取网络上的数据，没有认真研
