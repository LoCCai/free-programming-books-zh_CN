> Measuring programming progress by lines of code is like measuring aircraft building progress by weight. - Bill Gates

在_Rails_中，_Helper_指的是可以在_Template_中使用的輔助方法，主要用途是可以將資料轉化成輸出用的_HTML_字串，例如我們已經用過了_Rails_內建的`link_to`方法，它可以將字串變成超連結。_Rails_還內建了許多_Helper_方法，可以讓我們建構_HTML_更為容易。我們在一章中將介紹其中較為常用的幾個方法。

另一個使用_Helper_的理由是可以簡化_Template_中的複雜結構，將_Template_中較為複雜的程式都用_Helper_包裝起來，最好讓_Template_只包含單純的變數以及最簡單的條件邏輯和迴圈，這樣就算是不會程式的網頁設計師，也能夠輕易了解套版甚至修改_Template_樣板。

> 因為_Helper_預設只能在_Template_中使用，如果想在_rails console_中呼叫，必須加上`helper`，例如`helper.link_to`。另外，雖然機會不多，如果真的要在_Rails Controller_或_Model_程式中呼叫_Helper_，則可以加上`ApplicationController.helpers`前置詞。

## [](#靜態檔案輔助方法)靜態檔案輔助方法

使用_Rails_內建的靜態檔案_(Assets)_輔助方法有幾個好處：

-   _Rails_會合併_Stylesheet_和_JavasSript_檔案，可以加速瀏覽器的下載。
-   _Rails_會編譯_Sass_和_CoffeeScript_等透過_Assets template engine_產生的_Stylesheet_和_JavasSript_
-   _Rails_會在靜態檔案網址中加上時間序號，如果內容有修改則會重新產生。這樣的好處是強迫用戶的瀏覽器一定會下載到最新的版本，而不會有瀏覽器快取到舊版本的問題。
-   變更_Assets host_主機位址時，可以一次搞定，例如上_CDN_時。透過_Helpers_，_Rails_可以幫所有的_Assets_加上靜態檔案伺服器網址。

幾個常用的方法：

-   `javascript_include_tag`
-   `stylesheet_link_tag`
-   `auto_discovery_link_tag`
-   `favicon_link_tag`
-   `image_tag`
-   `video_tag`
-   `audio_tag`

## [](#格式化輔助方法)格式化輔助方法

### [](#simple_format)simple\_format

將`\n`換行字元換成_HTML_的`<br>`標籤。在表單輸入的`<textarea></textarea>`中，換行其實是`\n`控制字元，因此輸出在網頁上時，`\n`代表的是在_HTML_原始碼中換行，因此我們經常需要將`\n`再換成`<br>`標籤，這樣瀏覽器看到的畫面才有換行的呈現。

```
<%= simple_format("foo\nbar") %>
# 輸出 "<p>foo\n<br />bar</p>"
```

### [](#truncate)truncate

擷取前幾個字元

```
<%= truncate("Once upon a time in a world far far away") %>
# 輸出 "Once upon a time in a world..."

<%= truncate("Once upon a time in a world far far away", length: 17) %>
# 輸出 "Once upon a ti..."
```

### [](#strip_tags)strip\_tags

移除_HTML_標籤

### [](#strip_links)strip\_links

移除_HTML_超連結標籤

### [](#distance_of_time_in_words)distance\_of\_time\_in\_words

輸出很潮的時間距離，例如

```
distance_of_time_in_words(Time.now, Time.now + 60.minutes)
=> "about 1 hour"
```

### [](#distance_of_time_in_words_to_now)distance\_of\_time\_in\_words\_to\_now

```
distance_of_time_in_words_to_now(Time.now - 1.second)
=> "less than a minute"
```

### [](#time_tag)time\_tag

輸出_HTML5_時間標籤

```
time_tag(Time.now)
=> "<time datetime=\"2014-11-03T23:55:11+08:00\">November 03, 2014 23:55</time>"
```

### [](#number_with_delimiter)number\_with\_delimiter

```
number_with_delimiter(1234567)
=> "1,234,567"
```

### [](#number_with_precision)number\_with\_precision

```
number_with_precision(123.4567, precision: 2)
=> "123.46"
```

## [](#url輔助方法)_URL_輔助方法

-   `link_to` 文字超連結

除了學過的 `<%= link_to '超連結文字', xxx_path %>`用法之外，如果超連結文字很多甚至有圖片，可以用 block 的方式改寫，例如：

```
<%= link_to user_path(user) do %>
  <%= image_tag user.avatar.url %> <%= user.display_name %>
<% end %>
```

-   `mail_to` E-mail
-   `button_to` 按鈕連結，這個預設會改用 POST 出去(實際是個只有按鈕的表單)。因此如果超連結有用 `:method => :post` 等非 GET 方法時，建議可以考慮改用 `button_to` 而不是 `link_to`，這樣在 JavaScript 失效的情況下仍然可以作用，滿足網頁無障礙的標準。
-   `current_page?(url)` 是否目前是_url_這個頁面，通常是在_layout_上搭配_tab_樣式做_active_效果

## [](#自定helper)自定_Helper_

除了使用_Rails_內建的_Helper_，我們可以建立自定的_Helper_，只需要將方法定義在_app/helpers/_目錄下的任意一個檔案就可以了。在產生_Controller_的同時，_Rails_就會自動產生一個同名的_Helper_檔案，照慣例該_Controller_下的_Template_所用的_Helper_，就放在該檔案下。如果是全站使用的_Helper_，則會放在_app/helpers/application\_helper\_rb_，例如：

```
module ApplicationHelper
    def gravatar_url(email)
     gravatar_email = Digest::MD5.hexdigest(email.downcase)
     return "http://www.gravatar.com/avatar/#{gravatar_email}?s=48"
    end
end
```

如此便可以在_Template_中這樣使用：

```
<%= image_tag gravatar_url(user.email) %>
```

> _Helper_是全域的，定義在哪一個檔案中沒有關係，檔案名稱也不需要與_Controller_名稱對應。

如果想要寫出 Helper 可以傳 Block 參數，例如上述的 `link_to` 傳 block，像這樣：

```
<%= my_helper do %>
  blah
<% end %>
```

則可以這樣定義 Helper:

```
def my_helper(&block)
  tmp = capture(&block)
  "header #{tmp} footer"   # 最後輸出 header blah foobar
end
```

或是這樣用

```
def my_helper(&block)
  content_tag(:p, {}, &block)   # 最後輸出 <p>blah</p>
end
```

另外，_Controller_裡面定義的方法，也可以用`helper_method`曝露出來當作_Helper_，例如

```
class ApplicationController < ActionController::Base
  #...
  helper_method :current_user

  protected

  def current_user
    @current_user = User.find(session[:user_id]) if session[:user_id]
  end
end
```

## [](#如何安全地處理html逸出問題)如何安全地處理_HTML_逸出問題？

_Rails_在輸出任何內容在網頁上時，為了安全性都會作_HTML_逸出，例如會將`<`符號變成`&lt;`。也就是說如果使用者在表單中輸入了

```
<script>alert("Hack you!");</script>
```

那麼_Rails_在輸出`<%= @event.description %>`時，並不會乖乖地顯示一模一樣的`<script>alert("Hack you!");</script>`，因為如果如此的話，每個瀏覽這個網頁的使用者，就會去執行這個_JavaSCript_而被迫跳出一個`alert`視窗。

_Rails_會逸出_HTML_輸出成為：

```
&lt;script&gt;alert(&quot;Hack you!&quot;);&lt;/script&gt;
```

這樣使用者就會看到 `<script>alert("Hack you!");</script>`，而不是去執行`<script>alert("Hack you!");</script>`。

_[XSS](https://www.google.com.tw/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CCIQFjAAahUKEwjt9f2q2cHIAhUGopQKHR2lB8c&url=https%3A%2F%2Fzh.wikipedia.org%2Fzh-tw%2F%25E8%25B7%25A8%25E7%25B6%25B2%25E7%25AB%2599%25E6%258C%2587%25E4%25BB%25A4%25E7%25A2%25BC&usg=AFQjCNF8VkRPPXzEP2unCuKIWcM0Tr9HQA&sig2=dBgQWwKP9_IDbIwKBx8A5w)_是很常見的網站攻擊手法，攻擊者可以以此植入一些惡意的_JavaScript_讓其他使用者不經意執行，包括竊取_Cookie_和盜用權限等等。_Rails_預設採用了全部逸出的方式來防睹這個安全性。不過，也因此開發者必須了解如何正確地關閉這個功能，當你想要顯示出_HTML_不要逸出的時候。

### [](#如何顯示使用者輸入的html內容)如何顯示使用者輸入的_HTML_內容？

如果你的表單允許使用者輸入_HTML_，那麼你會想要在輸出的時候，可以開放一些白名單不要做_HTML_逸出，這時候就使用`sanitize`這個輔助方法，例如：

```
<%= sanitize( @event.description ) %>
```

預設允許的_HTML_標籤和屬性如下：

```
ActionView::Base.sanitized_allowed_tags
=> #<Set: {"strong", "em", "b", "i", "p", "code", "pre", "tt", "samp", "kbd", "var", "sub", "sup", "dfn", "cite", "big", "small", "address", "hr", "br", "div", "span", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "dl", "dt", "dd", "abbr", "acronym", "a", "img", "blockquote", "del", "ins"}>
ActionView::Base.sanitized_allowed_attributes
=> #<Set: {"href", "src", "width", "height", "alt", "cite", "datetime", "title", "class", "name", "xml:lang", "abbr"}>
```

如果需要增加，可以在`config/application.rb`中新增，例如：

```
config.action_view.sanitized_allowed_tags = %w[table tr td]
config.action_view.sanitized_allowed_attributes = "rel"
```

當然，如果表單輸入資料的地方，只限於後台有權限可信任使用者，我們也可以完全放行不要逸出：

```
<%= raw( @event.description ) %>
```

或

```
<%= @event.description.html_safe %>
```

### [](#自訂-helper-的技巧)自訂 Helper 的技巧

當你想要自訂一個_Helper_組合一些標籤和變數的時候，你可能第一次會嘗試這樣寫：

```
def user_link(user)
  "<div>" +
    link_to(user.name, user_path(user)) + "<br>" + user.description +
  "</div>"
end
```

這裡我們試圖組合一個字串是`<div>`包超連結和`user.description`變數。不過輸出在畫面上的時候，_Rails_還是會做了_HTML_逸出，造成顯示不正確，變成了：

```
&lt;div&gt;&lt;a href=&quot;/conferences/ae98a23f8fa23a3b060f&quot;&gt;foo&lt;/a&gt;&lt;br&gt;bar&lt;/div&gt;
```

這是因為_Rails_預設會將字串判斷成尚未逸出，如果一個未逸出的字串跟一個逸出的安全字串相加，就會髒掉也變成一個未逸出的字串。

為了正確顯示，接下來你可能會嘗試關閉_HTML_逸出：

```
def user_link(user)
  str = "<div>" +
    link_to(user.name, conference_path(user)) + "<br>" + @event.description +
  "</div>"

  str.html_safe # 或 raw(str)
end
```

這樣畫面上就顯示正確了。不過這卻是一個錯誤的作法，因為讓整個`str`不要逸出，卻讓其中的`@event.description`變成一個安全上的漏洞。

一個辦法是我們小心翼翼的幫每個不用逸出的字串加上`html_safe`：

```
def user_link(user)
  "<div class='user'>".html_safe +
    link_to(user.name, conference_path(user)) + "<br>".html_safe + @event.description +
  "</div>".html_safe
end
```

或用 `safe_join` 方法：

```
def user_link(user)
  safe_join([ "<div class='user'>".html_safe,
    link_to(user.name, conference_path(user)),
    "<br>".html_safe,
    @event.description,
    "</div>".html_safe])
end
```

> 如果你用原生的 Array#join 來把陣列串接成字串的話 `["<div class='user'>".html_safe, link_to(user.name, conference_path(user)), "<br>".html_safe, @event.description, "</div>".html_safe].join` 最後輸出仍會逸出，要改用 `safe_join`

另一個比較漂亮程式化的作法，則是善用_Rails_內建的`content_tag`和`tag`方法來產生_HTML_：

```
def user_link(user)
  content_tag(:div,
      link_to(user.name, conference_path(user)) + tag(:br) + @event.description,
    :class => 'user' )
end
```

其中`content_tag(:div, "YOUR_CONTENT", :class => "YOUR_CSS_CLASS" )`可以產生`<div class="YOUR_CSS_CLASS"> YOUR_CONTENT </div>`的_HTML_。`tag(:br)`會產生`<br />`。

## [](#表單輔助方法)表單輔助方法

對網頁應用程式來說，表單是非常重要的用戶輸入介面。_Rails_在這方面也提供了很多好用的_Helper_方法。基本上，_Rails_處理表單分成兩種類型：

一種是對應到_Model_物件的新增、修改，我們會使用`form_for`這個_Helper_。它的好處在於透過傳入_Model_物件，可以在修改的時候自動幫你將預設值帶入。例如我們已經在_Part1_使用過的_event_表單：

```
<%= form_for @event do |f| %>
    <%= f.text_field :name %>
    <%= f.submit %>
<% end %>
```

另一種是就是沒有對應_Model_的表單，我們使用`form_tag`這個方法。例如：

```
<%= form_tag "/search" do %>
    <%= text_field_tag :keyword %>
    <%= submit_tag %>
<% end %>
```

和`form_for`有些類似，但是其中不需要傳_Block_變數`f`，其中的欄位_Helper_需要多加_\_tag_結尾。不像`form_for`的欄位名稱一定要是_Model_的屬性之一，在`form_tag`之中的欄位名稱則完全不受限。

幾個常用的表單欄位輔助方法：

-   label
-   text\_field
-   text\_area
-   radio\_button
-   check\_box
-   file\_field
-   select
    -   使用 select 有一個坑：如果你要加 `class` 的話，必須這樣寫 `f.select :xxx, {}, :class => "your-class-name"`，多出來的 `{}` 是因為[這個 select API](http://api.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html#method-i-select) 的最後兩個參數都是 Hash，必須多包一個 {} 才能讓 `:class` 擠到最後的參數去。
-   select\_date
-   select\_datetime
-   hidden\_field
-   submit

> 搭配_model_用的`f.check_box :column_name`和`check_box_tag :input_name`有微妙的差異，前者會多產生一個隱藏的`hidden_field :column_name, "0"`來表示沒有勾選的狀態，後者則不會。這是因為如果你沒有勾選的話，瀏覽器就不會送出_check\_box_的資料，因此_Rails_用了一個隱藏欄位來處理反勾選。

搭配_ActiveRecord_關聯的輔助方法：

-   collection\_select
-   collection\_radio\_buttons
-   collection\_check\_boxes

一些_HTML5_的輔助方法

-   color\_field
-   date\_field
-   email\_field
-   month\_field
-   number\_field
-   url\_field
-   range\_field
-   search\_field

以下這些屬性可以設成`true`加到表單方法方法裡面

```
disabled readonly multiple checked autobuffer autoplay controls loop selected hidden scoped async defer reversed ismap seamless muted required autofocus novalidate formnovalidate open pubdate itemscope allowfullscreen default inert sortable truespeed typemustmatch
```

例如

```
<%= f.text_field :name, :required => true, :autofocus => true, :placeholder => "Please enter your name" %>
```

會產生出這樣的_HTML5_標籤，瀏覽器會檢查必填、有_Placeholder_和_Auto focus_：

```
<input placeholder="Please enter your name" required="required" autofocus="autofocus" class="form-control" type="text" name="event[name]" id="event_name">
```

## [](#如何處理model中不存在的屬性)如何處理_Model_中不存在的屬性

使用_form\_for_時，其中的欄位必須是_Model_有的屬性，那如果資料庫沒有這個欄位呢?這時候你依需要在_Model_程式中加上存取方法，例如：

```
class Event < ApplicationRecord

  #...
  def custom_field
      # 根據其他屬性的值或條件，來決定這個欄位的值
  end

  def custom_field=(value)
      # 根據value，來調整其他屬性的值
  end

end
```

這樣就可以在_form\_for_裡使用`custom_field`了。

```
<%= form_for @event do |f| %>
    <%= f.text_field :custom_field %>
    <%= f.submit %>
<% end %>
```

記得把`:custom_field`也加到_Strong Parameters_清單裡，這樣按下送出後，就可以跟著`@event`本來的欄位一起處理了。

## [](#資料驗證錯誤時的處理)資料驗證錯誤時的處理

當_Model_物件儲存失敗時，我們通常會重新顯示表單，這時候該怎麼顯示_Model_的錯誤訊息呢? 以下是一個預設的範例：

```
<%= form_for(@person) do |f| %>
  <% if @person.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(@person.errors.count, "error") %> prohibited this person from being saved:</h2>

      <ul>
      <% @person.errors.full_messages.each do |msg| %>
        <li><%= msg %></li>
      <% end %>
      </ul>
    </div>
  <% end %>

  <%= f.text_field :name %>
  <%= f.submit %>
<% end %>
```

透過檢查`@person.errors`我們可以把所有的錯誤訊息顯示出來。除了這種作法，我們也可以把錯誤訊息放在輸入框的旁邊：

```
<%= form_for(@person) do |f| %>
  <%= f.text_field :name %>
  <% if @person.errors[:name].presence %>
      <%= @person.errors[:name].join(", ") %>
  <% end %>

  <%= f.submit %>
<% end %>
```

## [](#如何在-controller-和-model-裡面呼叫-helper-方法)如何在 Controller 和 Model 裡面呼叫 Helper 方法

雖然違反 MVC 原則，不過有時候要處理的問題就是 HTML，因此也是有可能在 Controller 或 Model 內，想要呼叫 Helper 方法。

如果是在 Controller 裡面，可以直接透過 `helpers` 來轉接，例如想要用 `link_to` 方法:

```
class UsersController < ApplicationController

  def index
    link_html = helpers.link_to("回首頁", root_path)
    # ......
  end

end
```

如果是在 Model 內，則改用 `ApplicationController.helpers`，例如:

```
class User < ActiveRecord::Base

  def link_html
    ApplicationController.helpers.link_to("用戶連結", self.id)
  end

end
```

## [](#更多線上資源)更多線上資源

-   [Layouts and Rendering in Rails](http://guides.rubyonrails.org/layouts_and_rendering.html)
-   [Rails Form helpers](http://guides.rubyonrails.org/form_helpers.html)

* * *
