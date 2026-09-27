-   線上練習環境 [http://jsbin.com/](http://jsbin.com/) 或 [https://jsfiddle.net/](https://jsfiddle.net/)
-   jQuery
    -   官網文件 http://api.jquery.com/
    -   版本1.x 2.x 的差異
    -   用途
        -   定位 selectors & Traverse
        -   修改 DOM manipulation
        -   綁事件 Event
        -   動畫 animate
        -   API 串接 Ajax
-   Selector
    -   by tag
    -   by class
    -   by id
    -   by attribute [https://api.jquery.com/category/selectors/attribute-selectors/](https://api.jquery.com/category/selectors/attribute-selectors/)
    -   Filter [https://api.jquery.com/category/selectors/basic-filter-selectors/](https://api.jquery.com/category/selectors/basic-filter-selectors/)
-   Traverse 常用於從 $(this) 出發去找目標
    -   parents
    -   parent
    -   closest
    -   first
    -   last
    -   prev
    -   next
    -   find 找下多層
    -   children 只找下一層而已
    -   filter
-   DOM manipulation
    -   插入
        -   append
        -   prepend
        -   after
        -   before
        -   appendTo
        -   prependTo
        -   insertAfter
        -   insertBefore
    -   remove
    -   attr
        -   例如超連結的 attr(“href”)
    -   text
    -   html
    -   val
        -   針對 input, select and textarea 的 value 資料
    -   css
    -   toggleClass
        -   addClass
        -   removeClass
    -   toggle
        -   show
        -   hide
    -   slideToggle
        -   slideDown
        -   slideUp
    -   fadeToggle
        -   fadeIn
        -   fadeOut
    -   animate
-   Event
    -   ready
    -   on
        -   Direct event v.s. Delegated event
        -   http://jsbin.com/tinopojeni/1/edit?html,js,output
    -   click
    -   trigger 指定事件
    -   Mouse events: click, focusin, mousedown, mousemove, mouseover, mouseenter, dbclock, focusout, mouseup
    -   Keyboard Events: keypress, keydown, keyup
    -   Form events: blur, select, change, focus, submit
    -   bubble up 特性
    -   如何阻止超連結 # 作用? event.preventDefault()
    -   停止往上傳遞事件 event.stopPropagation()

### [](#參考資料)參考資料

-   Udacity: JavaScript Basic
-   Udacity: Intro to jQuery
-   CodeSchool: Try jQuery

### [](#example-code)Example Code:

-   [https://github.com/ihower/rails-exercise-ac5/blob/master/app/views/welcome/jquery.html.erb](https://github.com/ihower/rails-exercise-ac5/blob/master/app/views/welcome/jquery.html.erb) (ac5)
-   [https://github.com/ihower/rails-exercise-ac6/blob/master/app/views/welcome/jquery.html.erb](https://github.com/ihower/rails-exercise-ac6/blob/master/app/views/welcome/jquery.html.erb) (ac6)
-   [https://github.com/ihower/rails-exercise-ac7/blob/master/app/views/welcome/jquery.html.erb](https://github.com/ihower/rails-exercise-ac7/blob/master/app/views/welcome/jquery.html.erb) (ac7)

## [](#ajax)Ajax

-   Ajax = JavaScript 送 Request，然後處理 response，過程中瀏覽器不會跳一整頁。
-   facebook and twitter timeline example: it’s JSON including HTML
-   append 第三方圖片，用 img src (但這不算是 ajax)
-   Debugging with Chrome DevTools

### [](#jquery-的-ajax-用法)jQuery 的 Ajax 用法

官方文件 >http://api.jquery.com/category/ajax/>

-   jQuery $.ajax

```
       $.ajax( <url>, { success: function(res) {  $(<selector>).html(res) } } )
       $.get(<url>, function(res) { ... })
       $.ajax( <url>, { data: { foobar: 1 },  success: function(res) {  $(<selector>).html(res) } } )
* Ajax Error handling (e.g. timeout)

       $ajax(<url>, { success: function(res){ ... }, error: function(request, error_type, error_message) { ... } } )
       $ajax(<url>, { success: function(res){ ... }, error: function(request, error_type, error_message) { ... } , timeout: 3000 } )
```

-   Add ajax loading status?
    -   beforeSend
    -   complete
-   小心動態插入的 element 會沒有綁到 event。要使用 Delegated Event
-   Ajax Form

```
       $('form').on("submit", function(e) {
          e.preventDefault();
          $.ajax( <url>, { type: 'POST', data: { "foo":  $("#foo").val() }    });
```

-   其中 `data: $('form').serialize()`
    -   [https://api.jquery.com/serialize/](https://api.jquery.com/serialize/)
-   注意: 無法處理檔案上傳
-   再補上 success callback 把 form 移掉等等
-   JSON Response
    -   $.ajax 加上
        -   dataType: ‘json’ 代表 parse the response as JSON
        -   contentType: ‘application/json’ 跟 server 說要 JSON 格式
        -   success callback 的 response 變成 json object 了
        -   codeschool 這裡手動組 HTML
        -   ajax url 可以換成 `$('form').attr('action')`
    -   `$.getJSON(url, function(data){ ... } )`
    -   `$.getJSON(url, function(data){ ... } ).error(function(e)`{…} )

關於 jQuery Ajax，推薦以下兩個教材：

-   Udacity: Intro to Ajax
-   codeSchool: jQuery The Return Flight

* * *
