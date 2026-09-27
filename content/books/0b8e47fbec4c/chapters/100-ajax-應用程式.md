> 本章內容與 [Part 2-1 Ajax 互動式網頁應用](https://ihower.tw/rails/fullstack-ajax-1.html)有些重複，可以先去看 Part 2-1。

> It’s not a bug - it’s an undocumented feature. - Unknown

### [](#什麼是-ajax)什麼是 Ajax?

Ajax 是 Asynchronous JavaScript and XML的縮寫，是一種不需要重新整理頁面，透過 JavaScript 來與伺服器交換資料、更新網頁內容的技術。目的在於改善使用者的操作介面，提昇流暢度。它主要是透過瀏覽器提供的`XMLHttpRequestObject`來達成，不過因為要支援跨瀏覽器，大多數人們會選擇使用 JavaScript Library 來處理 Ajax，例如最流行的 JQuery。

> 如果你對 jQuery 和 Ajax 完全陌生的話，推薦 [CodeSchool: Try jQuery](https://www.codeschool.com/courses/try-jquery)、[Code School: jQuery Ajax](https://www.codeschool.com/courses/jquery-the-return-flight) 或 [Udacity: Intro to AJAX](https://www.udacity.com/course/intro-to-ajax--ud110)

雖然_Ajax_的縮寫中包括_XML_，但是實務上並不一定要用_XML_格式，事實上也已經很少人使用_XML_當作傳輸的格式了。總歸來說，依照_Ajax_使用的格式分類，有三種方式：

-   向伺服器請求 HTML 片段，然後客戶端瀏覽器上的 JavaScript 再替換掉頁面上的元素
-   向伺服器請求 JavaScript 程式腳本，然後客戶端瀏覽器執行它
-   向伺服器請求 JSON 或 XML 資料格式，然後客戶端瀏覽器的 JavaScript 解析後再動作。

第一種方式非常簡單，但是限制是一次只能更新一小塊內容。

Rails 預設使用第二種方式，一方面程式撰寫較容易，另一方面也是貫徹 Rails 將 template 統一在 server-side rendering 的設計哲學。

第三種方式則將 JavaScript 程式都放在客戶端瀏覽器上，相較於第二種則多了解析 JSON 或 XML 的部份。以_Web API_的設計角度來看，與表現層無關的_JSON_格式是比較乾淨的，可以獲得比較好的重複使用性。如果團隊中有專門的前端工程師，他們會比較喜歡這種方式。

## [](#unobtrusive-javascript)Unobtrusive JavaScript

Rails 使用一種叫做 [Unobtrusive JavaScript(UJS)](https://github.com/rails/jquery-ujs) 的方式來掛載內建的 JavaScript 功能，也就是你在 `app/assets/javascripts/application.js` 裡面載入的 `//= require jquery_ujs`，這些功能包括

-   讓超連結可以用 `:method` 參數支援非 GET 方法
-   用超連結、按鈕和表單可以用 `:remote => true` 支援 Ajax
-   超連結、按鈕和表單可以用 `"data-confirm"` 參數可以跳確認對話視窗
-   送出按鈕可以用 `data-disable-with` 參數在送出表單時暫時關閉按鈕避免重複送出

什麼是_Unobtrusive_呢？用個範例來說吧，以下代碼會將超連結改成用表單_DELETE_送出，並且用一個提示視窗來作確認：

```
link_to 'Remove', event_path(1), :method => :delete, :data => { :confirm => "Sure?" }
```

在_Rails 3_以前的版本，會輸出：

```
<a onclick="if (confirm('Sure?')) { var f = document.createElement('form'); f.style.display = 'none'; this.parentNode.appendChild(f); f.method = 'POST'; f.action = this.href;var m = document.createElement('input'); m.setAttribute('type', 'hidden'); m.setAttribute('name', '_method'); m.setAttribute('value', 'delete'); f.appendChild(m);f.submit(); };return false;" href="/events/1">Remove</a>
```

在_Rails 3_之後，會輸出：

```
<a rel="nofollow" data-confirm="Sure?" data-method="delete" class="delete" href="/events/1">Remove</a>
```

_Unobtrusive_也就是將_JavaScript_程式與_HTML_完全分開，除了可以讓_HTML_碼乾淨之外，也可以支援更換不同的_JavaScript Library_，例如把_Rails_內建的_jQuery_換成_[Protytype.js](http://prototypejs.org/)_或_[angular.js](https://angularjs.org/)_等等。

> 在_Layout_中有輸出一段`<%= csrf_meta_tag %>`的作用就是搭配給_UJS_使用的，讓_JavaScript_可以拿到_CSRF_安全驗證碼，我們會在_安全_一章討論到什麼是_CSRF_。

## [](#第一種方式替換-html-片段)第一種方式：替換 HTML 片段

編輯 app/views/events/index.html.erb 最下方加入：

```
<%= link_to 'Hello!', welcome_say_hello_path, :id => "ajax-load"  %>

<div id="content">
</div>

<script>
$('#ajax-load').click( function(e){
  e.preventDefault();
  var url =  $(this).attr("href");
  $.ajax(url, {
    success: function(response) {
      $("#content").html(response);
    }
  });
</script>
```

如此點下超連結後，就會把回傳的_HTML_置入到`<div id="content">`裡面。

## [](#第二種方式使用-javascript-腳本)第二種方式：使用 JavaScript 腳本

編輯 app/views/events/index.html.erb，在迴圈中間加入

```
<%= link_to 'ajax show', event_path(event), :remote => true %>
```

在迴圈外插入一個`<div id="event_area"></div>`

編輯 app/controllers/events\_controller.rb，在 show action 中加入

```
respond_to do |format|
  format.html
  format.js
end
```

新增 app/views/events/\_event.html.erb，內容與 show.html.erb 相同

新增 app/views/events/show.js.erb，內容如下

```
$('#event_area').html("<%= escape_javascript(render :partial => 'event') %>")
             .css({ backgroundColor: '#ffff99' });
```

瀏覽 http://localhost:3000/events

> `escape_javascript()`可以縮寫為`j()`。

上述 `:remote => true` 背後的原理，如同以下的 jQuery 程式碼：

```
$("#ajaxscript").click(function(e){
  e.preventDefault();
  var url =  $(this).attr("href");
  $.ajax(url, {
    dataType: "script"
  })
})
```

你會發現到這段程式碼其實非常一般化，這也是為什麼 Rails 可以將它變成 `:remote => true` 的原因。

### [](#ajax-按鈕)Ajax 按鈕

除了超連結 `link_to`之外，按鈕 button\_to 加上`:remote => true`參數也會變成 Ajax。

```
button_to "Remove",event_path(@event)
```

除了已經看過的 `:data => { :confirm => "Are you Sure?" }`之外，`disable_with`可以避免使用者連續按下送出：

```
button_to "Remove", event_path(@event), :data => { :disable_with => 'Removing' }
```

### [](#ajax-表單)Ajax 表單

除了超連結 link\_to 加上 :remote 可以變成 Ajax 之外，表單 form\_for 也可以加上`:remote`變成 Ajax。

```
form_for @event, :remote => true
```

## [](#第三種方式使用-json-資料格式)第三種方式：使用 JSON 資料格式

_JavaScript Object Notation(JSON)_是一種源自_JavaScript_的資料格式，是目前_Web_應用程式之間的準標準資料交換格式，在_Rails_之中，每個物件都有`to_json`方法可以很方便的轉換資料格式。

```
<%= link_to 'ajax show', event_path(event), :remote => true, :data => { :type => :json }, :class => "ajax_update" %>
```

點擊_ajax show_就會送出_Ajax request_了，但接下來要怎麼撰寫處理_JSON_的程式呢？以下是一個範例：

```
<script>
$(document).ready(function() {
    $('.ajax_update').on("ajax:success", function(event, data) {
        var event_area = $('#event_area');
        event_area.html( data.name );
    });
});
</script>
```

使用 JSON 通常還會搭配 client-side template 機制，將回傳的資料搭配 template 後，再插入到 HTML 之中。

另一種變形的用法則是將_HTML_片段當做_JSON_的資料來傳遞。

另一種_JSON_的變形是_JSONP(JSON with Padding)_，將_JSON_資料包在一個_JavaScript function_裡，這個做的用處是讓這個_API_可以跨網域被呼叫。要回傳_JSONP_格式，需要用`render :js`並多一個參數是`:callback`。例如以下的程式可以搭配 jQuery 的 jsonp 格式：

```
respond_to do |format|
  format.js { render :json => @user.to_json, :callback => params[:callback] }
end
```

### [](#example-code)Example code

-   三種用法示範
    -   [https://github.com/ihower/rails-exercise-ac5/blob/master/app/views/welcome/ajax.html.erb](https://github.com/ihower/rails-exercise-ac5/blob/master/app/views/welcome/ajax.html.erb) (ac5)
    -   [https://github.com/ihower/rails-exercise-ac6/blob/master/app/views/welcome/ajax.html.erb](https://github.com/ihower/rails-exercise-ac6/blob/master/app/views/welcome/ajax.html.erb) (ac6)
    -   [https://github.com/ihower/rails-exercise-ac7/blob/master/app/views/welcome/ajax.html.erb](https://github.com/ihower/rails-exercise-ac7/blob/master/app/views/welcome/ajax.html.erb) (ac7)
    -   [https://github.com/ihower/rails-exercise-ac8/blob/master/app/views/welcome/ajax.html.erb](https://github.com/ihower/rails-exercise-ac8/blob/master/app/views/welcome/ajax.html.erb) (ac8)
-   Ajax 按鈕刪除: 刪除資料，並在 HTML 上移除該元素
    -   [https://github.com/ihower/rails-exercise-ac7/blob/master/app/views/comments/\_comment.html.erb](https://github.com/ihower/rails-exercise-ac7/blob/master/app/views/comments/_comment.html.erb) (ac7)
    -   [https://github.com/ihower/rails-exercise-ac8/blob/master/app/views/topics/show.html.erb](https://github.com/ihower/rails-exercise-ac8/blob/master/app/views/topics/show.html.erb) (ac8)
-   Ajax 按贊: 針對主題按贊或取消贊、訂閱或反訂閱等等
    -   [https://github.com/ihower/rails-exercise-ac7/blob/master/app/views/topics/show.html.erb](https://github.com/ihower/rails-exercise-ac7/blob/master/app/views/topics/show.html.erb) (ac7)
    -   [https://github.com/ihower/rails-exercise-ac8/blob/master/app/views/topics/show.html.erb](https://github.com/ihower/rails-exercise-ac8/blob/master/app/views/topics/show.html.erb) (ac8)
-   Ajax 表單新增: 使用 Ajax 新增，在頁面上新增該筆
    -   [https://github.com/ihower/rails-exercise-ac7/blob/master/app/views/topics/show.html.erb](https://github.com/ihower/rails-exercise-ac7/blob/master/app/views/topics/show.html.erb) (ac7)
    -   [https://github.com/ihower/rails-exercise-ac8/blob/master/app/views/topics/show.html.erb](https://github.com/ihower/rails-exercise-ac8/blob/master/app/views/topics/show.html.erb) (ac8)
-   Ajax 編輯: 也就是 In-place form editing (點選文字原地編輯)
    -   [https://github.com/ihower/rails-exercise-ac5/blob/master/app/views/event\_attendees/\_item.html.erb](https://github.com/ihower/rails-exercise-ac5/blob/master/app/views/event_attendees/_item.html.erb)
    -   [https://github.com/ihower/rails-exercise-ac5/blob/master/app/views/events/show.html.erb](https://github.com/ihower/rails-exercise-ac5/blob/master/app/views/events/show.html.erb)
-   Ajax 開關 (Toggle Attributes): 設計一個 checkbox 介面的開關
    -   [https://github.com/ihower/rails-exercise-ac5/blob/master/app/views/events/show.html.erb](https://github.com/ihower/rails-exercise-ac5/blob/master/app/views/events/show.html.erb)
-   Ajax 無限捲軸 (Endless Page)
    -   [https://github.com/ihower/rails-exercise-ac5/blob/master/app/views/events/show.html.erb](https://github.com/ihower/rails-exercise-ac5/blob/master/app/views/events/show.html.erb)
-   Ajax 檔案上傳: HTML 表單沒辦法用 Ajax 上傳檔案，需要額外裝 gem 做 workaround:
    -   [https://github.com/JangoSteve/remotipart](https://github.com/JangoSteve/remotipart)

## [](#turbolinks)Turbolinks

事實上，_Rails_預設讓每個換頁都用上了_Ajax_技巧，這一招叫做_[Turbolinks](https://github.com/turbolinks/turbolinks-classic/tree/2-5-stable)_，在預設的_Gemfile_中可以看到`gem "turbolinks"`，以及_Layout_中的`data-turbolinks-track`。

它的作用是讓每一個超連結都只用_Ajax_的方式將整個`body`內容替換掉，這樣換頁時就不需要重新載入`head`部份的標籤，包括_JavaScript_和_CSS_等等，只重新入載入 boby 的部分，目的是可以改善換頁時的速度。

也因為它沒有整頁重新載入，所以如果有放在_application.js_裡面的 jQuery ready 事件處理，會變成只有第一次載入頁面才執行到，換頁時就失效了，所以必須改成 Turbolinks 的 `turbolinks:load` 事件，也就是：

```
$(document).ready(function(){
  //...
}
```

都要改寫成

```
$(document).on("turbolinks:load", function(){
 //...
})
```

> Rails 4 用的舊版[turbolinks-classic](https://github.com/turbolinks/turbolinks-classic) 是用 `page:change` 事件

另外，它的快取也會影響頁面內的 JavaScript，你放在 body 內的 javascript，在瀏覽回來時會執行兩遍，並且官方認為[這是 feature 不是 bug](https://github.com/turbolinks/turbolinks/issues/167)，有些 Javascript 重複執行兩遍沒關係，但是有些就有問題。如果想關掉這個快取功能：放個 `<meta name="turbolinks-cache-control" content="no-cache">` 在 layout 的 head 之中可以關掉 Turbolinks 快取功能。

如果要針對特定的超連結關閉 Turbolinks，可以加上 `data-turbolinks="false"` 的屬性來：

```
<div id="some-div" data-turbolinks="false">
  <a href="/">Home (without Turbolinks)</a>
</div>
```

例如 Facebook Share 的 Javascript code 就被 turbolinks 影響，請參考 [turbolinks + facebook share button](http://adz.cool/posts/181188-rails-notes-turbolinks-facebook-sdk)

因為 Turbolinks 影響了_JavaScript_的_Event Bindings_行為，所以在搭配一些_JavaScript_比較吃重的應用程式，搭配使用_JavaScript_ 前端框架時，就會盡量移除不要使用，以免互相影響。

⚠ 總之，如果你碰到 js 靈異現象(貼上來的js code 換頁回來後不執行，但是重新整理就沒問題。或是跳頁回來重複執行了兩次等等，可以試試看拆掉 Turbolinks：把 Gemfile、applicatio.js 和 layout head 裡面相關的 Turbolink 代碼拿掉即可，就可以直接繞過這個大坑。

## [](#瀏覽器同源政策和-cors)瀏覽器同源政策和 CORS

跨網域(cross-domain) 的 AJAX 會被 Same-origin policy 瀏覽器安全政策所限制：

-   [瀏覽器同源政策及其規避方法](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)
-   [跨域資源共享CORS 詳解](http://www.ruanyifeng.com/blog/2016/04/cors.html)
-   [實作 Cross-Origin Resource Sharing (CORS) 解決 Ajax 發送跨網域存取 Request](http://blog.toright.com/posts/3205/%E5%AF%A6%E4%BD%9C-cross-origin-resource-sharing-cros-%E8%A7%A3%E6%B1%BA-ajax-%E7%99%BC%E9%80%81%E8%B7%A8%E7%B6%B2%E5%9F%9F%E5%AD%98%E5%8F%96-request.html)
-   [同源政策 (Same-origin policy)](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Same_origin_policy_for_JavaScript)

解決的方式可以用 CORS 或JSON-P，這要看 server-side 伺服器端支援哪一種。CORS 是一個新的網路標準，而 JSON-P 一種向後相同的 hack 方式。

#### [](#json-p)JSON-P

[JSONP](https://zh.wikipedia.org/wiki/JSONP)算是一種 workaround 解，在 jQuery 中可以用以下語法：

```
     $.ajax({
       url:,
       dataType: "jsonp",
       success: function(data) {
               //...
               clearTimeout(wikiRequestTimeout);
       }
     })
```

JSONP 缺點: 1. 只能送 HTTP GET 2. 沒有辦法 error handling，只能等 timeout，例如設定一個 timeout 顯示錯誤訊息，然後在上述成功時再`clearTimeout`。

```
   var wikiRequestTimeout = setTimeout(function(){
     ....append error text
   }, 8000);
```

### [](#cors)CORS

CORS 則是目前的新標準解決方案：

-   [HTTP access control (CORS)](https://developer.mozilla.org/zh-TW/docs/HTTP/Access_control_CORS)
-   [An In-depth Look at CORS](http://www.sitepoint.com/an-in-depth-look-at-cors/)
-   [OBeyTech 初探CORS](http://obeyo-blog.logdown.com/posts/205379)

Rails 範例 Code: [https://github.com/ihower/rails-exercise-ac5/pull/2](https://github.com/ihower/rails-exercise-ac5/pull/2)

## [](#更多線上資源)更多線上資源

-   [A Tour of Rails’ jQuery UJS](https://robots.thoughtbot.com/a-tour-of-rails-jquery-ujs)
-   [Working with JavaScript in Rails](http://guides.rubyonrails.org/working_with_javascript_in_rails.html)

* * *
