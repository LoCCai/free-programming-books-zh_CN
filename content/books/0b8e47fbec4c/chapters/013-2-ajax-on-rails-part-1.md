## [](#2-1-ajax-簡介)2-1 Ajax 簡介

回想之前的超連結或是表單送出，瀏覽器會整頁替換：

例如點超連結時，瀏覽器會用 GET 送出，然後整個瀏覽器刷新到下一頁：

![image](https://ihower.tw/rails/part2/01-ajax/images/ajax-1.png)

如果用表單送出的話，瀏覽器會先用 POST 送出，Rails 伺服器處理完之後，通常我們會用 `redirect` 語法來回傳 HTTP 狀態碼 301，當瀏覽器看到 301 後就會送 GET 去抓下一頁。(為何這樣設計?請參考「Web API 設計實作」教程的 [3-2 什麽是 REST API](https://ihower.tw/rails/fullstack-web-api-3.html))

![image](https://ihower.tw/rails/part2/01-ajax/images/ajax-2.png)

> 為何這樣設計? 這是因為互聯網的慣例是用 GET 來單純讀取資料，不會修改資料。而 POST 則是執行某個操作，會修改到伺服器的資料。互聯網也會假設 GET 是可以重復讀取並快取的，而 POST 不行。因此搜尋引擎只會用 GET 抓資料，像[這篇文章](https://www.puritys.me/docs-blog/article-204-我被-Google-駭客攻擊了.html)就鬧了笑話，這個人用 GET 來刪除資料，造成 Google 爬蟲一爬就不小心刪除了，他還以為是 Google 故意駭他…lol 另外，像瀏覽器的表單送出是用 POST，如果我們在 action 中不 redirect (也就是不讓瀏覽器去 GET 另一頁)，而是直接 render 返回，那麽如果用戶重新整理畫面的話，瀏覽器會跳出以下的警告視窗，要求用戶確認是否再 POST 一次，因為這可能會造成重復操作(重復新增)。如果是 GET 的話，重新整理就不會有這種警告了。

![images](https://ihower.tw/rails/part2/03-web-api/images/post-confirm.png)

接下來要介紹的 Ajax(Asynchronous JavaScript and XML) 非同步的 JavaScript 與 XML 技術，則可以不需要整頁替換，只更新部分網頁，這可以大大的改進 UI 反應速度。目前已經不流行用 XML 了，因此常見的回傳會用 JSON 和 Script 格式：

用 JSON 格式，必須寫自定義的 JavaScript 去處理 Ajax 的發送和接收處理。JavaScript 強者或團隊中有前端工程師會偏好這種方式。

![image](https://ihower.tw/rails/part2/01-ajax/images/ajax-3.png)

另一種是用 Script 格式，伺服器回傳 JavaScript，瀏覽器拿到後直接執行即可。這種方式 Rails 有內建 [jquery-ujs](https://github.com/rails/jquery-ujs) gem，會幫我們綁好事件去處理 Ajax 發送和接收。這是比較簡單的作法，對 jQuery 技能的要求也比較低。

![image](https://ihower.tw/rails/part2/01-ajax/images/ajax-4.png)

這一章我們會示範用 Script 的方式來做 Ajax。

## [](#2-2-目標)2-2 目標

製作一個可以分享內容，用戶可以按讚的的網站。User Story 包括：

-   用戶可以貼文
-   用戶可以瀏覽所有貼文
-   用戶可以刪除自己的貼文
-   用戶可以針對貼文按讚，每篇貼文只能按讚一次

非功能性的要求是，利用 Ajax 技術改善 UI，讓操作的反應變成神速。

## [](#2-3-建立-models)2-3 建立 Models

首先來安裝 Devise 產生 User Model

編輯 `Gemfile` 加上 `gem "devise"`

執行 `bundle`，然後重啟伺服器

執行 `rails g devise:install`

執行 `rails g devise user`

編輯 `app/views/layout/application.html.erb`，插入：

```
  <body>
+   <% if flash[:notice] %>
+     <%= flash[:notice] %>
+   <% end %>

+   <% if flash[:alert] %>
+     <%= flash[:alert] %>
+   <% end %>

+  <% if current_user %>
+     <%= link_to('登出', destroy_user_session_path, :method => :delete) %>
+    <%= link_to('修改密碼', edit_registration_path(:user)) %>
+  <% else %>
+    <%= link_to('註冊', new_registration_path(:user)) %> |
+    <%= link_to('登入', new_session_path(:user)) %>
+   <% end %>

...(略)
```

執行 `rails g model post content:text user_id:integer`

編輯 `app/models/user.rb`，加上 posts 關聯，以及一個 `display_name` 方法來顯示用戶名稱。

```
  class User < ApplicationRecord

+   has_many :posts

+   def display_name
+     # # 取 email 的前半來顯示，如果你也可以另開一個欄位是 nickname 讓用戶可以自己編輯顯示名稱
+     self.email.split("@").first
+   end

...(略)
```

編輯 `app/models/post.rb`，加上 user 關聯

```
  class Post < ApplicationRecord
+   validates_presence_of :content
+   belongs_to :user

...(略)
```

執行 `rake db:migrate`

## [](#2-4-瀏覽貼文和產生假資料)2-4 瀏覽貼文和產生假資料

編輯 `config/routes.rb`

```

+ resources :posts

- root "pages#jquery_1"
+ root "posts#index"

```

執行 `rails g controller posts`

編輯 `app/controllers/posts_controller.rb`

```

+  def index
+    @posts = Post.order("id DESC").all    # 新貼文放前面
+  end

```

新增 `app/views/posts/index.html.erb`

```
<% @posts.each do |post| %>

<div class="panel panel-default">
  <div class="panel-heading"><%= post.user.display_name %></div>
  <div class="panel-body">
    <%= post.content %>
  </div>
</div>

<% end %>

```

沒有資料就不好玩了，除了進 `rails console` 自己新增之外，我們也可以自己寫一個小程序來產生一堆假資料。

[Faker](https://github.com/stympy/faker) 這個 gem 可以隨機產生假文，編輯 Gemfile 加上：

```
  group :development do
+   gem 'faker'

  # (略)
```

寫個 rake 程序來產生假資料，新增 `lib/tasks/dev.rake`，放在這個目錄下的 rake 檔案是用來編寫任務腳本，讓我們在 Terminal 中可以執行它：

```

namespace :dev do

  task :fake => :environment do
    users = []
    10.times do
      users << User.create!( :email => Faker::Internet.email, :password => "12345678")
    end

    50.times do |i|
      post = Post.create!( :content => Faker::Lorem.paragraph,
                            :user_id => users.sample.id )

    end
  end

end

```

執行 `rake dev:fake` 就會執行這個任務，產生 10 筆假用戶和 50 筆文章。

瀏覽 `http://localhost:3000` 可以看到貼文一覽了：

![image](https://ihower.tw/rails/part2/01-ajax/images/16-posts.png)

> 請自行安裝 Bootstrap 畫面才會漂亮喔，不裝也沒關系不影響學習 Ajax

## [](#2-5-新增和刪除貼文)2-5 新增和刪除貼文

在做 Ajax 效果之前，請先完成基本功能，接下來製作新增和刪除。

編輯 `app/controllers/posts_controller.rb`

```
  class PostsController < ApplicationController

+   before_action :authenticate_user!, :only => [:create, :destroy]

+   def create
+     @post = Post.new(post_params)
+     @post.user = current_user
+     @post.save
+
+     redirect_to posts_path
+   end
+
+   def destroy
+     @post = current_user.posts.find(params[:id]) # 只能刪除自己的貼文
+     @post.destroy
+
+     redirect_to posts_path
+   end
+
+   protected
+
+   def post_params
+     params.require(:post).permit(:content)
+    end

  end

```

編輯 `app/views/posts/index.html.erb`

```
+ <%= form_for Post.new do |f| %>
+   <div class="form-group">
+     <%= f.text_area :content, :class => "form-control" %>
+   </div>
+   <div class="form-group">
+     <%= f.submit :class => "btn btn-primary" %>
+   </div>
+ <% end %>

  <% @posts.each do |post| %>

  <div class="panel panel-default">
    <div class="panel-heading"><%= post.user.display_name %></div>
    <div class="panel-body">
      <%= post.content %>

+     <% if current_user && post.user == current_user %>
+       <p class="text-right">
+         <%= link_to "Delete", post_path(post), :method => :delete, :class => "btn btn-danger" %>
+       </p>
+     <% end %>
    </div>
  </div>

  <% end %>
```

測試看看新增貼文和刪除，要先註冊登入才能貼文喔：

![image](https://ihower.tw/rails/part2/01-ajax/images/17-new.png)

## [](#2-6-ajax-刪除)2-6 Ajax 刪除

接下來是本課程的重點戲 Ajax。首先我們要讓 Delete 刪除的超連結變成 Ajax 送出。

編輯 `app/views/posts/index.html.erb`

```
-  <%= link_to "Delete", post_path(post), :method => :delete, :class => "btn btn-danger" %>
+  <%= link_to "Delete", post_path(post), :method => :delete, :remote => true, :class => "btn btn-danger" %>
```

透過 `:remote => true` 就會變成 Ajax 送出了，不需要自己寫 `$("xxx").click` 去綁事件。

接著編輯 `app/controllers/posts_controller.rb`

```

  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy

-   redirect_to posts_path
+   render :js => "alert('ok');"
  end

```

這裡改成返回一段 JavaScript 字串代碼，內容是 `alert('ok');`，實際測試看看，點刪除：

![image](https://ihower.tw/rails/part2/01-ajax/images/18-ajax-delete.png)

伺服器回傳了 `alert('ok');` 字串，瀏覽器拿到之後就去執行，於是跳出一個 alert 視窗。

> 這一招又叫做 Remote JavaScript (RJS)，把遠端的 JavaScript 代碼抓回來執行。

做到這裡，那一筆貼文雖然在資料庫中已經被刪除了，但因為是 Ajax 沒有整頁重新整理，所以那一筆貼文看起來還在網頁上面，如果你重新整理畫面的話，那一筆才會不見。

我們希望的 UI 效果是立即移除畫面上的那一筆貼文，這時候得用到上一章 jQuery 學到的 `$("xxxx").remove()` 用法：

因為要在 controller 裡面放 JavaScript 字串是很痛苦的，接下來改成用 erb 樣板的方式來寫 JavaScript：

再次編輯 `app/controllers/posts_controller.rb`，把 `render :js` 砍掉：

```

  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy

-   render :js => "alert('ok');"
  end

```

編輯 `app/views/posts/index.html.erb`，針對每一筆貼文 div 補上一個 id 來做定位：

```
-  <div class="panel panel-default">
+  <div id="post-<%= post.id %>" class="panel panel-default">
```

新增 `app/views/posts/destroy.js.erb` 樣板：

```
  $("#post-<%= @post.id %>").remove();

```

解說：

-   針對要被移除的 `<div>` 區塊，我們補上了一個 id，例如 `<div id="post-123">`，這樣等會 jQuery 要移除的時候，就可以直接抓到要移除哪一個元素了
-   一個 action 如果沒有寫明 `redirect` 或 `render` 的話，就會預設去找 action 名稱的樣板。於是這裡就會去找 `destroy.js.erb`
-   `destroy.js.erb` 裡面要寫回傳的 JavaScript 代碼，這個檔案也是 erb 樣板，所以可以用 `<%= XXX %>` 內嵌 Ruby 語法

再次測試看看刪除，你會發現刪除的操作變成超級神速。

### [](#ajax-要如何除錯)Ajax 要如何除錯?

由於前端沒有換頁，所以就算代碼寫錯了，按鈕按下去也不會有任何反應。這時候請看 `rails server` 的 log，或是打開 Chrome 開發者模式的 Network 進行觀察：

![image](https://ihower.tw/rails/part2/01-ajax/images/19.png)

這截圖說明了伺服器回傳 `$("#post-76").remove();` JavaScript 字串，瀏覽器去執行這個字串就把 id post-76 這個 div 給移除了。

## [](#2-7-ajax-新增)2-7 Ajax 新增

除了 `link_to`、`button_to` 可以加上 `:remote => true` 變成 Ajax 之外。`form_for` 也可以用這招。接下來做做看新增貼文：

編輯 `app/views/posts/index.html.erb`

```
-  <%= form_for Post.new do |f| %>
+  <%= form_for Post.new, :remote => true do |f| %>

```

編輯 `app/controllers/posts_controller.rb`，把 `redirect_to` 砍掉：

```

  def create
    @post = Post.new(post_params)
    @post.user = current_user
    @post.save

-   redirect_to posts_path

  end
```

這時候如果你新增的話，按下送出網頁看起來沒有反應，其實資料庫已經插入這一筆，重新整理就會出現。

我們希望的 UI 效果是在 HTML 上插入一整個新貼文的內容，也就是得在 `app/views/posts/create.js.erb` 用 `$("XXX").prepend("YYY")` 的語法來達成。問題是 XXX 跟 YYY 要填什麽？

先來解決 XXX，我們預期新的貼文放在本來貼文的上方，所以要在 HTML 上定位出本來的貼文區塊，請編輯 `app/views/posts/index.html.erb` 用一個 div 整個包起來

```
+  <div id="post-list">
  <% @posts.each do |post| %>
    # 略...
  <% end %>
+ </div>

```

接著是 YYY，這個要插入的 HTML 字串跟目前在 `index.html.erb` 樣板上面的貼文 HTML 是一模一樣的，這時候想到來用 partial 樣板，再次編輯 `app/views/posts/index.html.erb`，把整塊貼文的部分搬去 partial:

```
  <div id="post-list">
   <% @posts.each do |post| %>
-    <div id="post-<%= post.id %>" class="panel panel-default">
-    <div class="panel-heading">
-      <%= post.user.display_name %>
-    </div>
-    <div class="panel-body">
-      <%= post.content %>
-
-      <% if current_user && post.user == current_user %>
-        <p class="text-right">
-          <%= link_to "Delete", post_path(post), :method => :delete, :class => "btn btn-danger", :remote => true %>
-        </p>
-      <% end %>
-    </div>
-    </div>

+   <%= render :partial => "post", :locals => { :post => post } %>
  <% end %>
</div>

```

新增 `app/views/posts/_post.html.erb` 這個 Partial 樣板：

```
<div id="post-<%= post.id %>" class="panel panel-default">
  <div class="panel-heading">
    <%= post.user.display_name %>
  </div>
  <div class="panel-body">
    <%= post.content %>

    <% if current_user && post.user == current_user %>
      <p class="text-right">
        <%= link_to "Delete", post_path(post), :method => :delete, :class => "btn btn-danger", :remote => true %>
      </p>
    <% end %>
  </div>
</div>

```

重新整理 index 畫面應該還是正常的。

接著可以寫 `app/views/posts/create.js.erb` 了

```
$("#post-list").prepend("<%=j render :partial => "post", :locals => { :post => @post } %>");

```

就一行，這樣就可以重復利用 partial 樣板，把整個 partial 變成一個 JavaScript 字串，然後塞入 `<div id="#post-list">` 里。

其中 `j` 等同於 `escape_javascript`，這會做逸出好讓 partial 字串可以變成合法的 JavaScript 字串：

![image](https://ihower.tw/rails/part2/01-ajax/images/20-create.png)

如果你把 j 拿掉，會變成以下這樣，瀏覽器是無法正確執行這段 JavaScript 代碼的：

![image](https://ihower.tw/rails/part2/01-ajax/images/21.png)

## [](#2-8-ajax-新增-清空表單和錯誤處理)2-8 Ajax 新增: 清空表單和錯誤處理

接下來還有兩個小地方可以改進，第一是送出後，輸入框應該清空。

修改`app/views/posts/create.js.erb`，新增一行 `$("#post_content").val("");`

```
   $("#post-list").prepend("<%=j render :partial => "post", :locals => { :post => @post } %>");
+  $("#post_content").val("");

```

用 `.val("")` 就可以把輸入框的值設定為空。

第二是儲存失敗的情況處理，假設貼文是空的，那麽 @post 會儲存失敗，這時候應該有錯誤訊息提示。修改`app/views/posts/create.js.erb`

```
+ <% if @post.valid? %>
  $("#post-list").prepend("<%=j render :partial => "post", :locals => { :post => @post } %>");
  $("#post_content").val("");
+ <% else %>
+   alert("貼文失敗");
+ <% end %>

```

增加一個 if else 的情況區分，當 `valid?` 成功時，插入新貼文，當儲存失敗時，跳一個 alert 視窗。

## [](#2-9-製作按讚功能)2-9 製作按讚功能

接下來製作用戶可以針對貼文按讚，先來做一個基本版沒有 Ajax 效果的版本：

一個用戶可以針對很多貼文按讚，一篇貼文可以有很多用戶按讚，這是一個多對多的模型，讓我們新增一個 Like model：

執行 `rails g model like`

編輯 `db/migrate/201703XXXXXXXX_create_likes.rb`

```
  class CreateLikes < ActiveRecord::Migration[5.0]
    def change
      create_table :likes do |t|
+       t.integer :user_id, :index => true
+       t.integer :post_id, :index => true
        t.timestamps
      end
    end
  end

```

編輯 `app/models/like.rb`，加上關聯

```
+  belongs_to :user
+  belongs_to :post

```

編輯 `app/models/post.rb`，加上關聯和一個 `find_like` 方法：由於一個用戶只能針對一篇貼文按一個讚，所以透過用戶 ID 和貼文 ID，就可以找到唯一的 Like，等會我們會用這個方法來判斷一個用戶不能重復按讚。

```
   belongs_to :user

+  has_many :likes, :dependent => :destroy
+  has_many :liked_users, :through => :likes, :source => :user

+  def find_like(user)
+    self.likes.where( :user_id => user.id ).first
+  end

```

編輯 `app/models/user.rb`，加上關聯

```

   has_many :posts

+  has_many :likes, :dependent => :destroy
+  has_many :liked_posts, :through => :likes, :source => :post

```

> 因為已經有了 `has_many :posts`，所以這裡要取不同名稱 `:liked_posts`，也因為取了不同名稱，需要額外指定 source。這個 source 指的 `:post` 是在 Like model 裡面的 `belongs_to :post`。

編輯 `config/routes.rb`

```
-  resources :posts
+  resources :posts do
+    member do
+      post "like" => "posts#like"
+      post "unlike" => "posts#unlike"
+    end
+  end

```

編輯 `app/views/posts/_post.html.erb` 加上按讚的按鈕：

```
  <div class="panel-body">
     <%= post.content %>

+    <div class="text-right">
+
+      <% if post.liked_users.any? %>
+        <%= post.liked_users.map{ |u| u.display_name }.join(",") %> 點了贊
+      <% end %>
+
+      <% if current_user # 有登入才可以按讚 %>
+        <% if post.find_like(current_user) %>
+          <%= link_to "-1", unlike_post_path(post), :method => :post, :class => "btn btn-primary" %>
+        <% else %>
+          <%= link_to "+1", like_post_path(post), :method => :post, :class => "btn btn-primary" %>
+        <% end %>
+      <% end %>

      # (略，刪除按鈕在這裡)

+    </div>
  </div>

```

最後是 controller，請編輯 `app/controllers/posts_controller.rb`，加上 like 和 unlike 方法：

```

+  def like
+    @post = Post.find(params[:id])
+    unless @post.find_like(current_user)  # 如果已經按讚過了，就略過不再新增
+      Like.create( :user => current_user, :post => @post)
+    end
+
+    redirect_to posts_path
+  end
+
+  def unlike
+    @post = Post.find(params[:id])
+    like = @post.find_like(current_user)
+    like.destroy
+
+    redirect_to posts_path
+  end
+
```

實際測試看看按讚 +1 和取消按讚 -1

![image](https://ihower.tw/rails/part2/01-ajax/images/21-like.png)

## [](#2-10-ajax-按讚)2-10 Ajax 按讚

接著改進為神速 Ajax 按讚，流程是：

1.  把本來的 +1 和 -1 按鈕，改成 `:remote => true` 用 Ajax 送出
2.  伺服器會新建或刪除 Like 資料進資料庫
3.  伺服器回傳的 JavaScript 要替換掉整塊按讚的 HTML 部分，包括 XXX 按了讚，以及把 +1 改成 -1 按鈕或 -1 改成 +1 按鈕。

這裡又需要用到 Partial 樣板了，這樣才能在一開始顯示 HTML 時，以及在 Ajax 中去重復使用同一份 erb 代碼。

編輯 `app/views/posts/_post.html.erb` 把本來整塊的按讚 HTML 搬到 Partial 去，並用一個 span 包起來，方便等會定位：

```

-   <% if post.liked_users.any? %>
-     <%= post.liked_users.map{ |u| u.display_name }.join(",") %> 點了贊
-   <% end %>
-
-   <% if current_user # 有登入才可以按讚 %>
-     <% if post.find_like(current_user) %>
-       <%= link_to "-1", unlike_post_path(post), :method => :post, :class => "btn btn-primary" %>
-     <% else %>
-       <%= link_to "+1", like_post_path(post), :method => :post, :class => "btn btn-primary" %>
-     <% end %>
-   <% end %>

+    <span id="post-like-<%= post.id %>">
+      <%= render :partial => "like", :locals => { :post => post } %>
+    </span>


```

新增 `app/views/posts/_like.html.erb`，並在本來的 like 和 unlike 按鈕上加上 `:remote => true` 變成 Ajax：

```
<% if post.liked_users.any? %>
  <%= post.liked_users.map{ |u| u.display_name }.join(",") %> 點了贊
<% end %>

<% if current_user # 有登入才可以按讚 %>
  <% if post.find_like(current_user) %>
    <%= link_to "取消讚", unlike_post_path(post), :method => :post, :remote => true, :class => "btn btn-primary" %>
  <% else %>
    <%= link_to "讚", like_post_path(post), :method => :post, :remote => true, :class => "btn btn-primary" %>
  <% end %>
<% end %>

```

編輯 `app/controllers/posts_controller.rb`，把 like 和 unlike 裡面的 `redirect_to` 拿掉：

```

  def like
    # (略)
-   redirect_to posts_path
  end

  def unlike
    # (略)
-   redirect_to posts_path
+   render "like"
  end

```

不管 like 或 unlike，反正我們都會把整塊 `<span id="post-like-XXX">` 替換掉。因此 unlike 裡面我們用 `render "like"` 重復使用同一個 `like.js.erb` 樣板。

新增 `app/views/posts/like.js.erb`

```
str = "<%=j render :partial => "like", :locals => { :post => @post } %>";
$("#post-like-<%= @post.id %>").html(str);

```

測試看看，現在可以神速按讚了。

## [](#2-11-顯示和更新多少人按讚)2-11 顯示和更新多少人按讚

接下來我們想額外在畫面上顯示總共有多少人按讚，像這樣：

![image](https://ihower.tw/rails/part2/01-ajax/images/22.png)

編輯 `app/views/posts/_post.html.erb`

```
   <div class="panel-body">
+    <span id="post-thumbsup-<%= post.id %>" class="label label-success"><%= post.likes.count %> 👍</span>

```

修改 `app/views/posts/like.js.erb` 除了替換按讚的區塊，也需要同時更新上述的 👍 數量：

```
   str = "<%=j render :partial => "like", :locals => { :post => @post } %>";
   $("#post-like-<%= @post.id %>").html(str);

+  $("#post-thumbsup-<%= @post.id %>").html("<%= @post.likes.count %>" + " 👍")

```

這樣就可以同時更新 HTML 上的兩個地方。

## [](#2-12-ajax-小結)2-12 Ajax 小結

Ajax 是一種增強 UI 的方式，我們會先把基本功能完成，再根據需要改成 Ajax 效果。

這一章練習了刪除、按讚、新增貼文，畫面上比較單純的按鈕型操作，最適合用 Ajax 效果，例如刪除、按讚、收藏、加入購物車等等。 如果是比較複雜的填表單操作，要做 Ajax 效果就會比較費工，因為需要考慮錯誤處理(儲存失敗)的情況。

Rails 內建透過 `:remote => true` 的方式，就可以很快製作出 Ajax 效果。 再稍後的章節中，我們會示範進階的用法：在一些情況下，我們必須手寫 jQuery 去綁事件送 Ajax，取得 JSON 回傳並更新 DOM。

* * *
