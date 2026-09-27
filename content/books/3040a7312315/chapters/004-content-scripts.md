## Contents

1.  [Manifest](https://open.chrome.360.cn/extension_dev/content_scripts.html#registration)
    1.  [Include和exclude语句](https://open.chrome.360.cn/extension_dev/content_scripts.html#include-exclude-globs)
2.  [编程式注入](https://open.chrome.360.cn/extension_dev/content_scripts.html#pi)
    
3.  [执行环境](https://open.chrome.360.cn/extension_dev/content_scripts.html#execution-environment)
    
4.  [与嵌入的页面通信](https://open.chrome.360.cn/extension_dev/content_scripts.html#host-page-communication)
    
5.  [安全性](https://open.chrome.360.cn/extension_dev/content_scripts.html#security-considerations)
    
6.  [引用扩展里的文件](https://open.chrome.360.cn/extension_dev/content_scripts.html#extension-files)
    
7.  [例子](https://open.chrome.360.cn/extension_dev/content_scripts.html#examples)
    
8.  [视频（Youtube）](http://code.google.com/chrome/extensions/content_scripts.html#videos)
    

## Content Scripts

Content scripts是在Web页面内运行的javascript脚本。通过使用标准的DOM，它们可以获取浏览器所访问页面的详细信息，并可以修改这些信息。

下面是content scipt可以做的一些事情范例：

-   从页面中找到没有写成超链接形式的url，并将它们转成超链接。
-   放大页面字体使文字更清晰
-   找到并处理DOM中的[microformat](http://microformats.org/)

当然，content scripts也有一些限制，它们不能做的事情包括 ：

-   不能使用除了[chrome.extension](https://open.chrome.360.cn/extension_dev/extension.html)之外的chrome.\* 的接口
-   不能访问它所在扩展中定义的函数和变量
-   不能访问web页面或其它content script中定义的函数和变量
-   不能做[cross-site XMLHttpRequests](https://open.chrome.360.cn/extension_dev/xhr.html)

这些限制其实并不像看上去那么糟糕。Content scripts 可以使用[messages](https://open.chrome.360.cn/extension_dev/messaging.html)机制与它所在的扩展通信，来间接使用chrome.\*接口，或访问扩展数据。Content scripts还可以通过共享的DOM来[与web页面通信](https://open.chrome.360.cn/extension_dev/content_scripts.html#host-page-communication)。更多功能参见[执行环境](https://open.chrome.360.cn/extension_dev/content_scripts.html#execution-environment)。

## Manifest

如果content scipt的代码总是需要注入，可以在[extension manifest](https://open.chrome.360.cn/extension_dev/manifest.html)中的 content\_scipt字段注册它。如下面的例子：

{
  "name": "My extension",
  ...
  **"content\_scripts": \[
    {
      "matches": \["http://www.google.com/\*"\],
      "css": \["mystyles.css"\],
      "js": \["jquery.js", "myscript.js"\]
    }
  \]**,
  ...
}

如果只是在某些情况下需要注入，可以使用[permission](https://open.chrome.360.cn/extension_dev/manifest.html#permissions)字段，详见[Programmatic injection](https://open.chrome.360.cn/extension_dev/content_scripts.html#pi)。

{
  "name": "My extension",
  ...
  **"permissions": \[
    "tabs", "http://www.google.com/\*"
  \]**,
  ...
}

使用 `content_scripts` 字段，一个扩展可以向一个页面注入多个content\_script脚本；每个content script脚本可以包括多个javascript脚本和css文件。content\_script字段中的每一项都可以包括下列属性：

| Name | Type | Description |
| --- | --- | --- |
| `matches` | array of strings | _必须。_ 定义哪些页面需要注入content script。查看[Match Patterns](https://open.chrome.360.cn/extension_dev/match_patterns.html)以了解详细语法。 |
| `css` | array of strings | _可选。_需要向匹配页面中注入的CSS文件。这些文件将在页面的DOM树创建和显示之前，按照定义的顺序依次注入。 |
| `js` | array of strings | _可选。_ 需要向页面中注入的javascript文件，按定义顺序注入。 |
| `run_at` | string | _可选。_ 控制content script注入的时机。可以是document\_start， document\_end或者document\_idle。缺省时是document\_idle。
如果是document\_start, 文件将在所有CSS加载完毕，但是没有创建DOM并且没有运行任何脚本的时候注入。

如果是document\_end，则文件将在创建完DOM之后，但还没有加载类似于图片或frame等的子资源前立刻注入。

如果是document\_idle，浏览器会在document\_end和发出[window.onload](http://www.whatwg.org/specs/web-apps/current-work/#handler-onload)事件之间的某个时机注入。具体的时机取决与文档加载的复杂度，为加快页面加载而优化。

**注意：**在document\_idle的情况下，content script不一定会接收到window.onload事件，因为它有可能在事件发出之后才加载。在大多数情况下， 在content script中监听onload事件是不必要的，因为浏览器会确保在DOM创建完成后才执行它。 如果一定要在window.onload的时候运行，可以通过[document.readyState](http://www.whatwg.org/specs/web-apps/current-work/#dom-document-readystate)属性来检查onload事件是否已经发出。

 |
| `all_frames` | boolean | _可选。_控制是在匹配页面的所有frame中运行还是只在最上层的frame中运行。

缺省是false，也就是只在最上层frame中运行。

 |
| `include_globs` | array of string | _可选。_控制将content\_script注入到哪些匹配的页面中。模拟Greasemonkey中的@include关键字。 详细信息可以查看下面的[Include and exclude globs](https://open.chrome.360.cn/extension_dev/content_scripts.html#include-exclude-globs)。 |
| `exclude_globs` | array of string | _可选。_控制将content\_script注入到哪些匹配的页面中。模拟Greasemonkey中的@exclude关键字。 详细信息可以查看下面的[Include and exclude globs](https://open.chrome.360.cn/extension_dev/content_scripts.html#include-exclude-globs)。 |

### Include和exclude语句

一个content script被注入页面的条件是： 页面url匹配任意一条match模式， 并且匹配任意一条include glob模式，并且不匹配任何exclude glob模式。 由于matches属性是必选的，因此include glob和exclude glob都只能用来限制哪些匹配的页面会被影响。

另外， 这两个属性与matches属性的语法是不同的， 它们更灵活一些。 在这两个属性中可以包含\*号和？号作为通配符。 其中\*可以匹配任意长度的字符串，而？匹配任意的单个字符。

例如，语句"http://???.example.com/foo/\*"" 可以匹配下面的所有情况：

-   "http://www.example.com/foo/bar"
-   "http://the.example.com/foo/"

但是它不能匹配下面的这些情况：

-   "http://my.example.com/foo/bar"
-   "http://example.com/foo/"
-   "http://www.example.com/foo"

## 编程式注入

如果不需要将javascript 和css注入到每一个匹配的网页里面，可以通过程序来控制代码的注入。 例如， 可以只在用户点击了一个browser action图标后才注入脚本。

如果要将代码注入页面，扩展必须具有[cross-origin 权限](https://open.chrome.360.cn/extension_dev/xhr.html#requesting-permission)， 还必须可以使用chrome.tabs模块。 可以通过在manifest文件的[permissions](https://open.chrome.360.cn/extension_dev/manifest.html#permissions)字段里声明来取得这些权限。

一旦设置好了权限，就可以通过调用[executeScript()](https://open.chrome.360.cn/extension_dev/tabs.html#method-executeScript)来注入javascript脚本。如果要注入css，可以调用[insertCSS()](https://open.chrome.360.cn/extension_dev/tabs.html#method-insertCSS)。

下面的代码（见例子[make\_page\_red](http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/api/browserAction/make_page_red/)） 演示了点击按钮后向当前标签的页面中注入并执行javascript代码。

_/\* in background.html \*/_
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null,
                           {code:"document.body.bgColor='red'"});
});

_/\* in manifest.json \*/_
"permissions": \[
  "tabs", "http://\*/\*"
\],

当浏览器显示一个http网页并且用户点击了扩展的browser action按钮后，扩展会将页面的bgcolor属性设置为红色。 如果这个页面没有用css设置它的背景颜色的话， 它会变成红色。

一般来说，可以将代码放在文件里面而不是像上面那个例子那样直接注入。 可以这样写：

chrome.tabs.executeScript(null, {file: "content\_script.js"});

## 执行环境

Content script是在一个特殊环境中运行的，这个环境成为isolated world（隔离环境）。它们可以访问所注入页面的DOM,但是不能访问里面的任何javascript变量和函数。 对每个content script来说，就像除了它自己之外再没有其它脚本在运行。 反过来也是成立的： 页面里的javascript也不能访问content script中的任何变量和函数。

例如，这个简单的页面：

hello.html
==========
<html>
  <button id="mybutton">click me</button>
  <script>
    var greeting = "hello, ";
    var button = document.getElementById("mybutton");
    button.person\_name = "Bob";
    button.addEventListener("click", function() {
      alert(greeting + button.person\_name + ".");
    }, false);
  </script>
</html>

现在，将下面这个脚本注入hello.html：

contentscript.js
================
var greeting = "hola, ";
var button = document.getElementById("mybutton");
button.person\_name = "Roberto";
button.addEventListener("click", function() {
  alert(greeting + button.person\_name + ".");
}, false);

然后，如果按下按钮， 可以同时看到两个问候。

隔离环境使得content script可以修改它的javascript环境而不必担心会与这个页面上的其它content script冲突。 例如，一个content script可以包含JQuery v1而页面可以包含JQuery v2， 它们之间不会产生冲突。

另一个重要的优点是隔离环境可以将页面上的脚本与扩展中的脚本完全隔离开。这使得开发者可以在content script中提供更多的功能，而不让web页面利用它们。

## 与嵌入的页面通信

尽管content script的执行环境与所在的页面是隔离的，但它们还是共享了页面的DOM。 如果页面需要与content script通信（或者通过content script与扩展通信）， 就必须通过这个共享的DOM。

下面这个例子是通过自定义的DOM事件和把数据放到固定的地方来实现的：

http://foo.com/example.html
===========================
var customEvent = document.createEvent('Event');
customEvent.initEvent('myCustomEvent', true, true);

function fireCustomEvent(data) {
  hiddenDiv = document.getElementById('myCustomEventDiv');
  hiddenDiv.innerText = data
  hiddenDiv.dispatchEvent(customEvent);
}

contentscript.js
================
var port = chrome.extension.connect();

document.getElementById('myCustomEventDiv').addEventListener('myCustomEvent', function() {
  var eventData = document.getElementById('myCustomEventDiv').innerText;
  port.postMessage({message: "myCustomEvent", values: eventData});
});

在上面的例子中，html页面（不属于扩展）创建了一个自定义事件， 当它向DOM中的一个特定元素写入事件数据后就会激活并派发这个自定义事件。 Content script在这个特定元素上监听这个自定义事件， 从这个元素中获取数据，并向扩展进程post一个消息。 通过这种方式， 页面建立了与扩展的通信链接。 这个方法也适用于反向的通信。

## 安全性

在写content script的时候，有两个安全问题必须注意。 首先， 要小心不要给原页面带来新的安全漏洞。 例如， 如果content script要从其它网站获取数据（比如[通过背景页面做XMLHttpRequest调用](https://open.chrome.360.cn/extension_dev/messaging.html)）， 在将数据注入前，应该进行处理以防止[cross-site scripting](http://en.wikipedia.org/wiki/Cross-site_scripting)攻击，比如用innerText注入而不是用innerHTML注入。特别要小心的是在一个HTTPS的页面上获取HTTP的内容，因为这个内容很可能是被人用[man-in-the-middle](http://en.wikipedia.org/wiki/Man-in-the-middle_attack)方式破坏过的。

其次，尽管在独立环境中运行content script的机制已经提供了一些保护，如果不加区分的使用web页面上的内容还是可以被恶意的web页面攻击的。

contentscript.js
================
var data = document.getElementById("json-data")
// WARNING! Might be evaluating an evil script!
var parsed = eval("(" + data + ")")

contentscript.js
================
var elmt\_id = ...
// WARNING! elmt\_id might be "); ... evil script ... //"!
window.setTimeout("animate(" + elmt\_id + ")", 200);

建议使用安全一些的API：

contentscript.js
================
var data = document.getElementById("json-data")
// JSON.parse does not evaluate the attacker's scripts.
var parsed = JSON.parse(data)

contentscript.js
================
var elmt\_id = ...
// The closure form of setTimeout does not evaluate scripts.
window.setTimeout(function() {
  animate(elmt\_id);
}, 200);

## 引用扩展里的文件

通过chrome.extension.getURL()来获取扩展里文件的URL。可以像使用其它url一样使用这些URL，如下面的例子所示：

_//Code for displaying /images/myimage.png:_
var imgURL = **chrome.extension.getURL("images/myimage.png")**;
document.getElementById("someImage").src = imgURL;

## 例子

例子[contentscript\_xhr](http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/howto/contentscript_xhr)显示了一个扩展如何从content script里进行cross-site请求。可以在[examples/api/messaging](http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/api/messaging/) 里的消息通信部分找到更多例子。

可以看[make\_page\_red](http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/api/browserAction/make_page_red/) 和[email\_this\_page](http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/extensions/email_this_page/) 这两个例子了解程序注入。

更多例子和源代码，可以查看[例子](https://open.chrome.360.cn/extension_dev/samples.html)
