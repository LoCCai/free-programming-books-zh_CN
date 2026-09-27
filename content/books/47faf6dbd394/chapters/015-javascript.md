[W3Techs](http://w3techs.com/)在2012年1月7日, 发出最新的"全球www网站技术报告".  
该统计基于对全球Alexa排名前100W的www网站做分析而得出.  
统计报告([Usage of server-side programming languages for websites](http://w3techs.com/technologies/overview/programming_language/all))显示, 相比2011年12月, 使用PHP构建的前100W名中的网站,又增长了约0.1%(30个), PHP占据的份额增长至77.3%, 依旧排名第一.

之前我对Javascript的原型链中, 原型继承与标识符查找有些迷惑,  
如, 如下的代码:

function Foo() {};
var foo = new Foo();
Foo.prototype.label = "laruence";
alert(foo.label); //output: laruence
alert(Foo.label);//output: undefined

一个朋友问了一个js问题, 一段看不出有任何问题的代码, 在ie下报错:"object doesn't support this property or method".

function foo(obj) {
   productTree = obj.toString();
   document.getElementById('productTree').innerHTML = productTree;
}

1\. 关于事件处理函数引用的一个佐证  
2\. Javascript正则的效率问题

setTimeout(function() {
    alert('你好!');
}, 0);
setInterval(callbackFunction, 100);

认为setTimeout中的问候方法会立即被执行,因为这并不是凭空而说,而是JavaScript API文档明确定义第二个参数意义为隔多少毫秒后,回调方法就会被执行. 这里设成0毫秒,理所当然就立即被执行了.  
同理对setInterval的callbackFunction方法每间隔100毫秒就立即被执行深信不疑!  
但随着JavaScript应用开发经验不断的增加和丰富,有一天你发现了一段怪异的代码而百思不得其解.....

Javascript是一种很灵活的语言, 而This关键字又是灵活中的灵活, 但是因为它的灵活, 也注定了它的难用.  
以前我用this的时候, 都会觉得不踏实, 老是担心它不知道怎么地就会指到另外的什么地方.  
其实, 这都是因为, 我们对它的不了解.  
刚好最近再给百度学院做《Javascript高级-作用域/原型链》的ppt, 而swit1983网友也刚好提这个问题, 索性就把这部分内容独立总结出来, 与大家分享.

yuchen网友发来一个问题, 大体意思就是在JS中, 同样的正则, 同样的字符串, 循环匹配结果却不一样 ,

<script type='text/javascript'>
var reTest = /^aid=(.\*)/ig;
var aData = \[ 'aid=^$', 'aid=^$', 'aid=^$', 'aid=^$' \];
for (var i=0, l=aData.length; i<l; i++) {
	alert(reTest.test(aData\[i\]));
}
</script>

结果却是:

true
false
true
false

为什么会这样呢?

首先看一个例子:

var name = 'laruence';
function echo() {
	alert(name);
	var name = 'eve';
	alert(name);
	alert(age);
}
echo();
	

运行结果是什么呢?

最近应友人邀请, 要帮忙写个文档处理脚本, 考虑到如果使用PHP或者Perl需要在友人的机器上,搭建一个运行环境,比较复杂, 使用起来也不友好, 本着以人为本的信念, 决定采用hta实现.  
本文就使用js来实现文档处理, 和使用js编写ActiveX做一个简单介绍  
....

如果用greaseMonkey编写脚本来做一些Web自动化的事情, 最关键的点会是哪里呢?  
"模拟浏览器事件",  
试想, 如果一定按钮, 点击以后, 触发了一系列的动作,  
如果使用脚本去实现自动化, 那么我们必须去寻找这一系列的动作, 然后找到切入点函数, 模拟参数, 调用. 这会是个很复杂的过程...  
但是, 如果我们采用"模拟浏览器事件"的方式, 只要简单的模拟下点击动作, 那些一系列的动作, 我们都可以不关心, 那不是很高效, 也很简单么?
