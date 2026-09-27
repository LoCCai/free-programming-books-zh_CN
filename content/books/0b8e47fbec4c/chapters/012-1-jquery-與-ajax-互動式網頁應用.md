AJAX 是與伺服器交換數據並更新部分網頁的技術，而不需要重新加載整個網頁。 這堂課會教大家如何使用 jQuery 對 HTML 進行操作，以及如何在 Rails 中製作 Ajax 高互動性的網頁效果。

## [](#1-jquery-101)1\. jQuery 101

## [](#1-1-什麽是-jquery-和-dom)1-1 什麽是 jQuery 和 DOM

[jQuery](https://jquery.com)是一套最多人使用的 JavaScript 函式庫，可以撰寫各種網頁效果，有豐富的社區和各種 Plugins 外掛。

它的主要作用是操縱網頁的 DOM(Document Object Model)：瀏覽器會解析 HTML 然後顯示在畫面上，這個解析出來的結構就叫做 DOM，在瀏覽器內部這是一個樹狀的資料結構：

```
html
  - head
    - title
     - a web page
  - body class="home"
    - h1 id="header"
     - a headline
    - p
     - some
     - span
      - text
     - text
```

瀏覽器提供了 DOM API 讓開發者可以操縱這些結構，透過 jQuery 我們可以很方便地從 HTML 取得要操縱的 HTML 元素，並在 DOM 裡面進行插入、修改、刪除元素，這樣瀏覽器的畫面就會跟著變化了。

## [](#1-2-新增練習網頁)1-2 新增練習網頁

### [](#安裝-jquery)安裝 jQuery

在 Rails 6 之前是用 [Asset Pipeline](https://ihower.tw/rails/assets-pipeline.html) 來管理 JavaScript，請在 Gemfile 加上 `gem 'jquery-rails'`，然後執行 `bundle`，接著在 `app/assets/javascripts/application.js` 裡面補上 `//= require jquery`。

在 Rails 6 之後則預設是用 [Webpacker](https://github.com/rails/webpacker) 來管理 JavaScript。首先在專案資料夾內執行 `yarn add jquery` ，然後在 `config/webpack/environment.js` 裡面的 `const { environment } = require('@rails/webpacker')` 下方加入

```
const webpack = require('webpack')
environment.plugins.prepend('Provide',
  new webpack.ProvidePlugin({
    $: 'jquery/src/jquery',
    jQuery: 'jquery/src/jquery'
  })
)
```

讓我們新增一個專案，並新增一些頁面來進行示範：

`rails new ajax-exercise`

`cd ajax-posting-app`

`git init`

`rails g controller pages`

編輯 `config/routes.rb`

```
get "/jquery-1" => "pages#jquery_1"
get "/jquery-2" => "pages#jquery_2"
get "/jquery-3" => "pages#jquery_3"
get "/jquery-4" => "pages#jquery_4"
get "/jquery-5" => "pages#jquery_5"

root "pages#jquery_1"

```

編輯 `app/views/layouts/application.html.erb`

```
   <body>
+    <%= link_to "jQuery 練習一", jquery_1_path %> |
+    <%= link_to "jQuery 練習二", jquery_2_path %> |
+    <%= link_to "jQuery 練習三", jquery_3_path %> |
+    <%= link_to "jQuery 練習四", jquery_4_path %> |
+    <%= link_to "jQuery 練習五", jquery_5_path %>

```

安裝 [bootstrap-sass](https://github.com/twbs/bootstrap-sass) (步驟省略，之後的截圖是有安裝 Bootstrap，畫面比較漂亮，沒做不影響功能)

啟動伺服器 `rails server`

(請接著做下一節再打開瀏覽器)

## [](#1-3-如何動態增加內容到網頁上)1-3 如何動態增加內容到網頁上

目標：點擊一個 HTML 元素後，動態置換一段內容

新增 `app/views/pages/jquery_1.html.erb`

```
<p>
  <a id="my-click">Click Me</a>
</p>

<div id="foo" style="border: 1px solid red;">
  <p>bar</p>
</div>

<script>
  $("#my-click").click(function(){
    $("#foo").html('<h1>zoo</h1>');
  })
</script>

```

瀏覽 `http://localhost:3000/jquery-1`

![image](https://ihower.tw/rails/part2/01-ajax/images/1.png)

點擊 Click Me 連結的話，你會發現 `<p>bar</p>` 就動態置換成 `<h1>zoo</h1>` 了。

![image](https://ihower.tw/rails/part2/01-ajax/images/2.png)

解說：

-   `<script>...</script>` 包起來的部分就是寫 JavaScript 的地方
-   \`這個錢號 $ 等同於 jQuery
-   `$("#my-click")` 是 jQuery 的選擇器用法，會挑出 id 是 `my-click` 的元素，在這裡就是指 Click Me 的超連結。在 HTML 上 id 是唯一的，不能有重復的 id。
-   `.click( function(){...} )` 會綁訂一個點擊(click)事件在該元素上面，當用戶點擊這個元素時，就會執行裡面的 function
-   `$("#foo").html('<h1>zoo</h1>')` 會把 #foo 這個元素的內容置換成 `<h1>zoo</h1>`

請試試看把 `html` 換成以下用法，觀察看看有什麽差別：

-   `text` 文字替換
-   `prepend` 把內容插在指定元素裡面的最前面
-   `append` 把內容插在指定元素裡面的最後面
-   `before` 把內容插在指定元素的前面
-   `after` 把內容插在指定元素的後面

請先搭配看下一節如何除錯。

## [](#1-4-如何除錯)1-4 如何除錯?

請使用 Chrome 開發者工具：在 HTML 畫面上按右鍵，點 Inspect，就會看到以下畫面：

![image](https://ihower.tw/rails/part2/01-ajax/images/3-debug.png)

如果 JavaScript 寫錯的話，在 Console 可以看到錯誤，例如我們把 `click` 拼錯成 `clickk` 的話：

![image](https://ihower.tw/rails/part2/01-ajax/images/4-debug.png)

> 從錯誤的地方開始，以下的 JavaScript 程序都不會執行喔

想在 JavaScript 程序中觀察變數的話，可以用 `alert` 或 `console.log` 語法，例如：

```
  $("#my-click").click(function(){
    alert("test");
  })

```

![image](https://ihower.tw/rails/part2/01-ajax/images/5-debug.png)

不過跳 alert 有時候太惱人了，可以改用 `console.log` 就會出現在開發者工具的 Console 裡面：

```

  console.log("checkpoint A");

  $("#my-click").click(function(){
    console.log("checkpoint C");
  })

  console.log("checkpoint B");

```

就會出現：

![image](https://ihower.tw/rails/part2/01-ajax/images/6-debug.png)

## [](#1-5-documentready-事件解說)1-5 document.ready 事件解說

在用 `$("xxxx")` jQuery 選擇器的時候，HTML 必須先加載完，jQuery 才能夠找得到元素。因此我們剛剛是先寫 HTML 在上，把 `script` 寫在下麵。如果倒過來的話：

```
<script>
  $("#my-click").click(function(){
    $("#foo").html('<h1>zoo</h1>');
  })
</script>

<p>
  <a id="my-click">Click Me</a>
</p>

<div id="foo" style="border: 1px solid red;">
  <p>bar</p>
</div>
```

你會發現沒有效果，點了沒反應，因為 `click`事件並沒有順利綁在超連結上。

但是傳統上我們習慣將 JavaScript 放在 HTML 上方加載，例如寫在 `app/assets/javascripts/application.js` 裡面，因此這時候我們需要用 `$(document).ready` 把程序包起來，也就是改成：

```
  <script>
+ // 這是 javascript 註解
+ // 也可以縮寫成 $(function() {
+ $(document).ready(function(){
    $("#my-click").click(function(){
      $("#foo").html('<h1>zoo</h1>');
    })
+ })
  </script>

  <p>
    <a id="my-click">Click Me</a>
  </p>

  <div id="foo" style="border: 1px solid red;">
    <p>bar</p>
  </div>
```

`$(document).ready` 是一個瀏覽器的事件，會在加載 HTML 完成之後，才執行裡面的 function，就可以解決這個問題。

## [](#1-6-如何隱藏和打開內容)1-6 如何隱藏和打開內容

目標：點擊一個元素後，動態隱藏和打開一段內容

新增 `app/views/pages/jquery_2.html.erb`

```
<p>
  <a id="my-open-click">Open</a>
</p>

<div id="foo" style="border: 1px solid red;">
  <a id="my-hide-click">Hide</a>
  <p>bar</p>
</div>


<script>
  $("#foo").hide();

  $("#my-open-click").click(function(){
    $("#foo").show();
  })

  $("#my-hide-click").click(function(){
    $("#foo").hide();
  })
</script>

```

瀏覽 `http://localhost:3000/jquery-2`

![image](https://ihower.tw/rails/part2/01-ajax/images/7-hide.png)

點擊 Open

![image](https://ihower.tw/rails/part2/01-ajax/images/8-show.png)

再點擊 Hide 就會隱藏起來了。

請試試看把 `hide` 和 `show` 分別改成

-   `fadeOut` 和 `fadeIn`
-   `slideUp` 和 `slideDown`

會有不同的動畫效果。

## [](#1-7-鼠標移過去自動打開和隱藏內容)1-7 鼠標移過去自動打開和隱藏內容

目標：鼠標移過去，就會自動打開和隱藏一段內容

新增 `app/views/pages/jquery_3.html.erb`

```
<p>
  <a id="my-toggle-click">Toggle</a>
</p>

<div id="foo" style="border: 1px solid red;">
  <p>bar</p>
</div>

<script>
  $("#foo").hide();   // 先馬上藏起來

  $("#my-toggle-click").hover(function(){
    $("#foo").toggle();   // 移過去會有開關的效果
  })

</script>
```

瀏覽 `http://localhost:3000/jquery-3`

鼠標移過去就會打開內容，鼠標移走內容就會隱藏起來。

解說：

這裡我們改用 `hover` 事件，這會在鼠標移過去和移出去的時候，都會觸發。然後搭配 `toggle` 方法就可以一開一關了。

jQuery 支援了非常多的[瀏覽器事件](https://www.w3schools.com/jquery/jquery_events.asp)，從鼠標單點、雙點、移過去、移出去，到鍵盤輸入哪一個按鍵等等，在瀏覽器裡面發生的事情都可以綁事件上去。

最後，請試試看把 `toggle` 改成

-   `slideToggle`
-   `fadeToggle`

會有不同的動畫效果。

## [](#1-8-如何替換和移除內容)1-8 如何替換和移除內容

目標：點擊一個元素後，動態替換和刪除內容

新增 `app/views/pages/jquery_4.html.erb`

```
<p>
  <a id="my-replace-click">Replace</a>
  <a id="my-remove-click">Remove</a>
  <a id="my-remove-all-click">Remove All</a>
</p>

<div id="foo" style="border: 1px solid red;">
  <p>bar</p>
</div>

<div class="zoo"><p>a</p></div>
<div class="zoo"><p>b</p></div>
<div class="zoo"><p>c</p></div>

<script>
  $("#my-replace-click").click(function(){
    $("#foo").replaceWith('<div id="foo" style="border:1px solid green"><p>foo</p></div>');
  })

  $("#my-remove-click").click(function(){
    $("#foo").remove();
  })

  $("#my-remove-all-click").click(function(){
    $(".zoo").remove();
  })
</script>
```

瀏覽 `http://localhost:3000/jquery-4`

![image](https://ihower.tw/rails/part2/01-ajax/images/9.png)

點擊 Replace

![image](https://ihower.tw/rails/part2/01-ajax/images/10-replace.png)

解說：`replaceWith` 會連同指定元素一起置換掉，因此整個 `#foo` 包含 `<div>` 都一起被換掉了。

點擊 Remove 移除一個元素：

![image](https://ihower.tw/rails/part2/01-ajax/images/11-remove.png)

點擊 Remove All 移除 a,b,c 三個元素：

![image](https://ihower.tw/rails/part2/01-ajax/images/12-remove-all.png)

解說：這裡我們改用 `$(".zoo")` 選擇器來挑選出所有 class 裡面有 `zoo` 的元素。跟 id 不同，一份 HTML 上可以有多個重復的 class。

## [](#1-9-如何改變-class-屬性)1-9 如何改變 class 屬性

目標：點擊一個元素後，動態替換元素的 class，這樣就會套用不同的 CSS 來改變外觀

新增 `app/views/pages/jquery_5.html.erb`

```
<style>
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>

<p>
  <a id="my-add-class-click">Add Class</a>

  <a id="my-remove-class-click">Remove Class</a>
</p>

<div id="foo">
  <h1>bar</h1>
</div>

<script>
  $("#my-add-class-click").click(function(){
    $("#foo").removeClass('error');
    $("#foo").addClass('success');
  })

  $("#my-remove-class-click").click(function(){
    $("#foo").removeClass('success');
    $("#foo").addClass('error');
  })
</script>
```

瀏覽 `http://localhost:3000/jquery-4`

![image](https://ihower.tw/rails/part2/01-ajax/images/13-class.png)

點擊 Add Class

![image](https://ihower.tw/rails/part2/01-ajax/images/14.png)

點擊 Remove Class

![image](https://ihower.tw/rails/part2/01-ajax/images/15.png)

jQuery 也有 API 可以[直接改 CSS](http://api.jquery.com/css/)。

## [](#1-10-jquery-小結)1-10 jQuery 小結

這章示範的就是最常見的 jQuery 使用套路了，包括：

-   用選擇器 Selector 選取出目標元素，我們學到最簡單的可以用 id 或 class 來選，例如 `$("#某個ID")` 和 `$(".某個class")`。
-   綁定一個事件(Event)上去，例如 `click` 和 `hover` 事件
-   當事件被觸發的時候，執行某個 DOM 操作來改變 HTML，可能是改變元素的屬性、插入新內容、新增或移除 class 屬性等等。目前學到的用法有：
    -   `html`
    -   `append`
    -   `prepend`
    -   `before`
    -   `after`
    -   `remove`
    -   `replaceWith`
    -   `toggle`
    -   `addClass` 和 `removeClass`

其實大部分的 jQuery 代碼的工作就是去新增內容、改變 HTML、調整 CSS 等方式操控網頁，例如跳出選單、輪播廣告、滑動標題圖片等等，這些就是執行上述步驟。

* * *
