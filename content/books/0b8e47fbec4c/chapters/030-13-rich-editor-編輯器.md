## [](#13-1-如何顯示用戶輸入的-html)13-1 如何顯示用戶輸入的 HTML

後台在編輯 Event 描述時，用了多行輸入框(text\_area)來輸入活動描述。不知道你有沒有嘗試過輸入 HTML 代碼，結果會怎麽樣？ 例如以下的輸入：

![image](https://ihower.tw/rails/part2/02-recipes/images/13-1.png)

### [](#simple_format)simple\_format

目前在 `app/views/admin/events/show.html.erb` 頁面上，顯示的部分是用 `<%= simple_format @event.description %>`，結果是：

![image](https://ihower.tw/rails/part2/02-recipes/images/13-2.png)

好像哪裡怪怪的，顏色跟表格不見了，觀察看看原始碼:

![image](https://ihower.tw/rails/part2/02-recipes/images/13-3.png)

跟當初輸入的不一樣，`table` 標籤不見了、`style`屬性也不見了。這是因為 simple\_format 的安全機制會過濾 HTML 的輸出。

另外，`simple_format` 的作用是換行：在輸入框中的換行，輸出時會多包一個 `<p>` 標籤來區分段落。這裡也看出了 `simple_format` 其實不適合用在用戶輸入 HTML 的情況，因為它會自作聰明多包一層 `<p>`。

### [](#移除-simple_format改回-rails-預設輸出行為)移除 simple\_format，改回 Rails 預設輸出行為

那如果不要用 `simple_format` helper 呢，來改成 `<%= @event.description %>`，結果是：

![image](https://ihower.tw/rails/part2/02-recipes/images/13-4.png)

![image](https://ihower.tw/rails/part2/02-recipes/images/13-5.png)

這下子 HTML 完全被脫逸(escaped)了，例如 `<` 會變成 `&lt;`。這是 Rails 預設的安全機制，但也不是我們這裡想要的結果。

### [](#raw-或-html_safe)raw 或 html\_safe

那可以叫 Rails 不要脫逸 HTML 嗎？來改成 `<%= raw @event.description %>` 或 `<%= @event.description.html_safe %>`

![image](https://ihower.tw/rails/part2/02-recipes/images/13-6.png)

![image](https://ihower.tw/rails/part2/02-recipes/images/13-7.png)

結果看起來對了，但是 Rails 既然預設會脫逸 HTML，想必有其設計的道理吧？沒錯，這的確會造成安全性的問題，例如用戶可以輸入 JavaScript 程序：

![image](https://ihower.tw/rails/part2/02-recipes/images/13-8-hack.png)

![image](https://ihower.tw/rails/part2/02-recipes/images/13-9-hackyou.png)

這麽當其他用戶瀏覽到這一頁時，瀏覽器就會盲目的執行這段 JavaScript 代碼，例如這裡會跳出惱人的 `alert` 視窗，而惡意的駭客會植入邪惡的 JavaScript 程序，例如輸入 `<script>location.href='https://ihower.tw'</script>` 就會把用戶騙去 ihower 的網頁 😵😵😵 或是刪除用戶資料或竊取登入權限等等。這種攻擊方式叫做 [XSS](https://zh.wikipedia.org/zh-cn/跨網站指令碼) 跨站腳本攻擊，是最常見的網路攻擊手法之一。任何網站只要允許用戶輸入資料，就有這個風險。防範的方式就是在輸出時，進行過濾或一律脫逸。

而當我們用 `raw` 或 `html_safe` 的話，就是告訴 Rails 這個輸出字串是安全的。

> 當然，在這個情境中，我們可以假設能進入後台的用戶就是可信任的管理員，應該不會自己駭自己的網站，因此直接 `raw` 輸出當是無妨。但如果是一般用戶在前臺輸入、編輯自己的個人資料，就不能信任了。

### [](#sanitize-白名單過濾)sanitize 白名單過濾

需要顯示用戶輸入的 HTML 又要有安全性，那就需要一種白名單的過濾機制了，Rails 提供了 `sanitize` helper。

請修改 `app/views/admin/events/show.html.erb`

```
-  <%= simple_format @event.description %>
+  <%= sanitize @event.description %>
```

以及前臺的 `app/views/events/show.html.erb`

```
-  <%= simple_format @event.description %>
+  <%= sanitize @event.description %>
```

結果：

![image](https://ihower.tw/rails/part2/02-recipes/images/13-10-sanitize.png)

![image](https://ihower.tw/rails/part2/02-recipes/images/13-11.png)

看起來比較正常了，比起 `simple_format` 不會多管閒事多包 `<p>` 標籤，但是還是少了 `table` 標籤和 `style` 屬性。這是因為預設的白名單是：

-   允許的 HTML 標籤 `strong em b i p code pre tt samp kbd var sub sup dfn cite big small address hr br div span h1 h2 h3 h4 h5 h6 ul ol li dl dt dd abbr acronym a img blockquote del ins`
-   允許的 HTML 屬性 `href src width height alt cite datetime title class name xml:lang abbr`

恰巧 table 跟 style 不在裡面，我們需要自己加。請修改 `config/application.rb`

```
+  config.action_view.sanitized_allowed_tags = Rails::Html::WhiteListSanitizer.allowed_tags + %w(table tr td)
+  config.action_view.sanitized_allowed_attributes = Rails::Html::WhiteListSanitizer.allowed_attributes + %w(style border)
```

重啟伺服器，再看一次結果：

![image](https://ihower.tw/rails/part2/02-recipes/images/13-12-ok.png)

![image](https://ihower.tw/rails/part2/02-recipes/images/13-13-ok.png)

這樣就既滿足安全性要求，又達到我們要的結果了。

## [](#13-2-輸入-html使用-rich-editor)13-2 輸入 HTML：使用 Rich Editor

上一節中，就算我們允許 HTML 輸入，但是那個輸入的界面卻不是普通人可以接受的，所以通常我們用另外安裝所見即所得(WYSIWYG) 的編輯器，又叫做 Rich Editor。

這種編輯器是一種前端 Plugin，今天叫示範安裝其中一套叫做 [ckeditor](http://ckeditor.com)，這有現成的 Rails gem [https://github.com/galetahub/ckeditor](https://github.com/galetahub/ckeditor) 可以直接安裝比較方便。

修改 `Gemfile`

```
+  gem 'ckeditor', '4.2.4'

```

編輯 `app/assets/javascripts/admin.js`

```
  //= require jquery
  //= require jquery_ujs
  //= require turbolinks
  //= require bootstrap-sprockets
  //= require select2
  //= require nested_form_fields
  //= require bootstrap-datepicker/core
  //= require bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN
+ //= require ckeditor/init

```

編輯 `app/views/admin/events/_form.html.erb`

```
-  <%= f.text_area :description, :class => "form-control" %>
+  <%= f.cktext_area :description, ckeditor: { language: 'zh-CN'} %>

```

> 如果用 `simple_form` 的話，可以用 `f.input :description, as: :ckeditor`

編輯 `config/initializers/assets.rb`

```
-  # Rails.application.config.assets.precompile += %w( admin.css admin.js )
+  Rails.application.config.assets.precompile += %w( admin.css admin.js ckeditor/* )

```

運行 bundle，重啟 Rails server

編輯看看 Event 就有厲害的編輯器了：

![image](https://ihower.tw/rails/part2/02-recipes/images/13-14-ckeditor.png)

![image](https://ihower.tw/rails/part2/02-recipes/images/13-15.png)

如果覺得預設的工具列(toolbar)太複雜，可以改用 mini toolbar 配置：

```
-  <%= f.cktext_area :description, ckeditor: { language: 'zh-CN'} %>
+  <%= f.cktext_area :description, ckeditor: { toolbar: 'mini', language: 'zh-CN'} %>

```

![image](https://ihower.tw/rails/part2/02-recipes/images/13-16.png)

Ckeditor 還可以進一步自訂義工具列的長相，就請自行參考文檔了。

* * *
