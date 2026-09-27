以前的Sublime Text 2包管理出现问题了，不能安装新包，让人开发很捉急，今天装了个3，这个问题解决了

那我们就一起用Sublime Text 3 来玩Node.js吧！

cn node说的很清楚，在这里就不细表

<a href="http://cnodejs.org/topic/51ee453af4963ade0ebde85e">http://cnodejs.org/topic/51ee453af4963ade0ebde85e</a>

这里说说他们说的一个问题

<figure>
	<a href="/images/article/10.jpg">
		<img src="https://raw.githubusercontent.com/hacke2/hacke2.github.io/HEAD/_posts/images/article/10.jpg" alt="home" />
	</a>
	<figcaption>重新运行后端口占用</figcaption>
</figure>

我也是在这边搞了半天，最后用下面方法解决的

<!--more-->

```js
{
	//这里加了一句关闭
	"cmd": ["taskkill /F /IM node.exe", ""],
	"cmd": ["node", "$file"]
}
```


<figure>
	<a href="/images/article/9.jpg">
		<img src="https://raw.githubusercontent.com/hacke2/hacke2.github.io/HEAD/_posts/images/article/9.jpg" alt="home" />
	</a>
	<figcaption>重新运行后端口占用</figcaption>
</figure>

但也出现一个问题，如果你的app.js正在运行，而你在这边调试单元测试，这样会把主程序也会关掉，这个东西
不能常用，还是使用Grunt最为妥当

完整Nodejs.sublime-build

```js
{
  "cmd": ["node", "$file"],
  "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
  "selector": "source.js",
  "shell":true,
  "encoding": "utf-8",
  "windows":
    {
	"cmd": ["taskkill /F /IM node.exe", ""],
    	"cmd": ["node", "$file"]
    },
  "linux":
    {
        "cmd": ["killall node; node", "$file"]
    }
}
```
    
    

<strong>end from <a href="{{ site.url }}"> {{ site.url }}</a></strong>
