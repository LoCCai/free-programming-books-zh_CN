## [](#4-1-前言)4-1 前言

這一章將示範直接用 jQuery 的 Ajax 功能，而不使用 Rails 的 `:remote => true` 方法來做 Ajax 效果。

這是因為 Rails 的 `:remote => true` 功能只能放在超連結或表單上，因此不屬於這兩種情形的需求，就需要自行綁事件上去，觸發時送 Ajax Request 到伺服器。

這一章將示範：

-   將刪除改成自行綁事件
-   貼文無限捲軸
-   使用核選方塊(checkbox)做開關
-   使用下拉選單(select)分類貼文

另外，搭配 jQuery Plugin 的話，也必須自己寫 Ajax 代碼。這章最後也會示範使用 jQuery Raty - A Star Rating Plugin 來做評等。

## [](#4-2-把刪除改成自行綁事件)4-2 把刪除改成自行綁事件

上一章我們用 Rails 內建的 `:remote => true` 來幫我們送 Ajax，這背後的原理其實就是自己去綁定事件，然後送 Ajax。

接下來我們來改寫看看如何自行綁事件送 Ajax，首先修改 `_post.html.erb`，刪掉本來的 :method 和 :remote 行為，補上一個 delete-post class 讓我們等會綁事件上去：

```
- <%= link_to "Delete", post_path(post), :method => :delete, :class => "btn btn-danger", :remote => true %>
+ <%= link_to "Delete", post_path(post), :class => "delete-post btn btn-danger" %>

```

然後在 `app/views/posts/index.html.erb` 下方加入：

```
  <script>
+   // 這會綁 click 事件到所有有 `.delete-post` class 的元素上，也就是所有的刪除按鈕
+   $(".delete-post").click(function(evt){
+     // `evt` 是瀏覽器的事件物件，evt.preventDefault(); 會終止這個元素的預設行為：
+     // 超連結 a 的預設行為是跳到下一頁，如果沒有這行的話，送出 ajax 後會跳去 show page
+     evt.preventDefault();
+     // this 是個特別的變數，代表觸發事件的元素。使用 attr 可以讀取元素的屬性，這裡要拿到超連結的網址
+     var url = $(this).attr("href");
+
+     // 送出 Ajax
+     $.ajax({
+       url: url,
+       method: 'DELETE',
+       dataType: 'script' // 要求伺服器回傳 javascript
+     })
+   })
  </script>
```

一但需要自己在前端綁事件，就會覺得把 JavaScript 代碼集中在前端的話，責任區分會比較清楚。因此我們來改成用 JSON 格式吧，把 `dataType` 改成 JSON，然後加一個 success 的回呼，伺服器回傳資料後，就會觸發 success 的函式：

```
  <script>
    $(".delete-post").click(function(evt){
      evt.preventDefault();
      var url = $(this).attr("href");

      // 送出 Ajax
      $.ajax({
        url: url,
        method: 'DELETE',
-       dataType: 'script'
+       dataType: 'json', // 要求伺服器回傳 json
+       success: function(data){   // data 就是伺服器回傳的 JSON 資料
+         $("#post-" + data["id"]).remove();
+       }
      })
    })
  </script>
```

修改 `app/controllers/posts_controller.rb` 改成直接回傳 JSON

```
   def destroy
     @post = current_user.posts.find(params[:id])
     @post.destroy

+    render :json => { :id => @post.id }
   end
```

接著刪除 `app/views/posts/destroy.js.erb` 樣板，我們不需要 Remote JavaScript 了。

如果團隊中有專門的前端工程師，也會偏好這種方式。這樣前後端的工作可以拆分的比較清楚。 後端處理資料庫和回傳 JSON 資料即可，頁面怎麽變化全由前端工程師負責。

## [](#4-3-貼文無限捲軸)4-3 貼文無限捲軸

目標：實作貼文的無限捲軸 (Endless Page)，當用戶捲到畫面最下方時，自動加載更早的資料。

這個任務需要偵測瀏覽器捲軸的行為，沒辦法用 `:remote => true` 了，需要自己去綁定事件，偵測用戶捲到視窗最下面。

編輯`app/views/posts/index.html.erb`

```
  <script>
+  // 記下目前畫面最小的貼文 ID
+  var current_post_id = <%= @posts.last.id %>;
+
+  // 當捲軸動的時候，會觸發這個事件
+  $(window).scroll(function(){
+    // 當捲到最下面的時候
+    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
+      var url = "/posts?max_id=" + current_post_id;
+      if (url) {
+        $.ajax({
+          method: "GET",
+          url: url,
+          dataType: "script"
+        })
+      } else {
+        console.log("data ended")
+      }
+    }
+  })
  </script>
```

修改 `app/controllers/posts_controller.rb`，跟之前做分頁一樣，我們繼續沿用了 index action，只是會根據 `params[:max_id]` 回傳更早的資料：

```

   def index
-    @posts = Post.order("id DESC").all
+    @posts = Post.order("id DESC").limit(20)
+
+    if params[:max_id]
+      @posts = @posts.where( "id < ?", params[:max_id])
+    end
+
+    respond_to do |format|
+      format.html  # 如果客戶端要求 HTML，則回傳 index.html.erb
+      format.js    # 如果客戶端要求 JavaScript，回傳 index.js.erb
+    end
   end
```

`respond_to` 可以讓 Rails 根據 request 請求的格式(在 $ajax 中我們有指定了 dataType)，來回傳不同格式。

新增 `app/views/posts/index.js.erb`

```
<% @posts.each do |post| %>
  $("#post-list").append("<hr>")
  $("#post-list").append("<%=j render :partial => "post", :locals => { :post => post } %>");
<% end %>

<% if @posts.any? %>
var current_post_id = <%= @posts.last.id %>;
<% end %>

```

這樣畫面捲到最下方時，就會自動加載，並且更新 `current_post_id` 的值，這樣下次再抓就會抓到更早的資料。

![image](https://ihower.tw/rails/part2/01-ajax/images/endless-page.gif)

## [](#4-4-使用核選方塊checkbox做開關)4-4 使用核選方塊(checkbox)做開關

目標：做一個勾選的核選方塊，管理員可以打勾標記成垃圾。

執行 `rails g migration add_flag_to_posts`

編輯 `db/migrate/201704XXXXXXXX_add_flag_to_posts.rb`

```
 class AddFlagToPosts < ActiveRecord::Migration[5.0]
   def change
+    add_column :users, :role, :string
+    add_column :posts, :flag_at, :datetime
   end
 end

```

執行 `rake db:migrate`

編輯 `app/models/user.rb`

```
+  def is_admin?
+    role == "admin"
+  end

```

執行 `rails console` 新增一個管理員帳號

```
  User.create!( :email => "[email protected]", :password => "123456", :role => "admin" )
```

然後改用這個帳號登入。

編輯 `config/routes.rb` 新增一個 `toggle_flag` 路由：

```
   resources :posts do
     member do
       post "like" => "posts#like"
       post "unlike" => "posts#unlike"
+      post "toggle_flag" => "posts#toggle_flag"
     end
   end
```

編輯 `app/views/posts/_post.html.erb` 加上 checkbox 核選方塊，以及顯示標記時間：

```

  <div class="panel-body">
    # (略)
  </div>

+  <div class="panel-footer">
+    <% if current_user && current_user.is_admin? %>
+      <label>
+      <%= check_box_tag "mark_flag[#{post.id}]", 1, post.flag_at.present?,
+            :data => { :url => toggle_flag_post_path(post) }, :class => "toggle-flag" %> 標記為垃圾
+        <span id="post-flag-<%= post.id %>"><%= post.flag_at %></span>
+      </label>
+    <% end %>
+  </div>
```

編輯 `app/views/posts/index.html.erb` 綁上 click 事件送出 Ajax 請求：

```
   <script>
+  $(".toggle-flag").on('change', function(){
+    var url = $(this).data("url");
+
+    $.ajax({
+      url: url,
+      method: "POST",
+      dataType: "json",
+      success: function(data){
+        if ( data["flag_at"] ) {
+          $("#post-flag-" + data["id"]).html(data["flag_at"]);
+        } else {
+          $("#post-flag-" + data["id"]).html("");
+        }
+      }
+    });
+  });
   </script>
```

解說:

-   `$("XXXX").on` 是綁事件的語法，之前學過的 `$("XXX").click(function(){...}` 可以改寫成 `$("XXX").on("click", function(){...})` 是一樣的。這裡用的事件名稱是 `change`，表示輸入框有變動的話，就會觸發。
-   在 HTML 元素屬性上的 `data-XXX`，在 jQuery 中可以用 `.data("XXX")` 去讀取到它的值。

最後編輯 `app/controllers/posts_controller.rb` 新增一個 toggle\_flag action 接收處理：

```
+  def toggle_flag
+    @post = Post.find(params[:id])
+
+    if @post.flag_at
+      @post.flag_at = nil
+    else
+      @post.flag_at = Time.now
+    end
+
+    @post.save!
+
+    render :json => { :message => "ok", :flag_at => @post.flag_at, :id => @post.id }
+  end
```

最後成果：

![image](https://ihower.tw/rails/part2/01-ajax/images/ajax-checkbox.png)

## [](#4-5-瀏覽器-bubble-up-事件模型)4-5 瀏覽器 Bubble Up 事件模型

前述的刪除和打勾的例子，有個大 Bug，就是剛新增的貼文沒作用。你可以試試看先新增一筆貼文，然後點點看刪除和打勾，會發現竟然沒作用。

這是怎麽回事呢? 這是因為瀏覽器並不會為新增的元素自動綁事件上去。所以後來 Ajax 新增上去的貼文是沒有事件的。

那要怎麽解決呢? 我們需要瞭解一下瀏覽器的事件機制，假設有以下 HTML:

```
<body>
  <div>
     <p>
        <a>XXX</a>
     </p>
  </div>
</body>
```

當我們 click 點擊 XXX 時，瀏覽器不只會觸發 a 元素的 click 事件，也會往外層一路觸發，包括 p 的 click 事件、div 的 click 事件、body 的 click 事件。這叫做 Bubble Up 事件模型。

瞭解這個模型之後，我們就可以將事件綁在可靠的上一層元素上，這裡也就是 #post-list 的 div 上，反正點擊裡面的元素，最終都會 Bubble Up 上來觸發。

請修改 `app/views/posts/index.html.erb`

```

-  $(".delete-post").click(function(evt){
+  $("#post-list").on('click', ".delete-post", function(evt){

   // 略

-  $(".toggle-flag").on('change', function(){
+  $("#post-list").on('change', ".toggle-flag", function(){

```

一樣是用 `on` 語法，但是改成綁在 `#post-list` 上，以及重點是多了第二個參數去過濾出真正觸發的元素，在這裡也就是 `.delete-post` 和 `.toggle-flag`。

## [](#4-6-使用-jquery-traversing-走訪元素)4-6 使用 jQuery Traversing 走訪元素

上述的範例中，有用到 `this` 可以知道是哪一個元素被點擊了，所以我們才可以用 `$(this).data("url")` 去讀取到該元素的 data 屬性。

既然已經知道是哪一個元素被點擊了，那其實可以利用 jQuery 的 [Traversing](https://api.jquery.com/category/traversing/) API，就可以進行定位：

例如我們可以這樣修改刪除：

```
  $("#post-list").on('click', ".delete-post",function(evt){
    evt.preventDefault();
    var url = $(this).attr("href");
+   var that = this;

    $.ajax({
      url: url,
      method: 'DELETE',
      dataType: 'json',
      success: function(data){
-       $("#post-" + data["id"]).remove();
+       $(that).closest(".panel").remove();
      }
    })
    //return false;
  })
```

解說：

-   由於 success 是個非同步的回呼，裡面的 `this` 不等同於外層的 `this`。所以我們得先在外層記下 `that` 是觸發事件的元素。
-   `closest` 會找最近的上一層元素，這裡就會找到包住整個貼文的 class 是 panel 的 div 區塊。

繼續修改 checkbox 開關：

```
  $("#post-list").on('change', ".toggle_flag",function(){
    var url = $(this).data("url");
+   var that = this;

    $.ajax({
      url: url,
      method: "POST",
      dataType: "json",
      success: function(data){
        if ( data["flag_at"] ) {
-         $("#post-flag-" + data["id"]).html(data["flag_at"]);
+         $(that).closest("label").find("span").html(data["flag_at"]);
        } else {
-         $("#post-flag-" + data["id"]).html("");
+         $(that).closest("label").find("span").html("");
        }
      }
    });
  });
```

解說：

`find` 會找下層的元素。一個常見的技巧是，先往上層找到共同的祖先是`label`，然後往裡層找目標`span`。

這樣做的好處是什麽呢? 這樣寫我們就不需要額外塞 post id 到 div 上來定位了。透過點擊的元素，我們就可以走訪到要操作的 DOM 上。

## [](#4-7-使用下拉選單select分類貼文)4-7 使用下拉選單(select)分類貼文

目標：做一個下拉選單可以分類，選了就立即生效，不需要再點送出

讓我們產生一個分類 Category model，讓 Post 貼文屬於一種分類：

執行 `rails g model category`

編輯 `db/migrate/201704XXXXXXXX_create_categories.rb`

```
  class CreateCategories < ActiveRecord::Migration[5.0]
    def change
      create_table :categories do |t|
+       t.string :name
        t.timestamps
      end

+     add_column :posts, :category_id, :integer
+     add_index :posts, :category_id
    end
  end
```

執行 `rake db:migrate`

編輯 `app/models/post.rb`

```

  class Post < ApplicationRecord
+   belongs_to :category, :optional => true

    # (略)
  end
```

編輯 `app/models/category.rb`

```
  class Category < ApplicationRecord

+   has_many :posts

  end
```

執行 `rails c` 新增一些分類資料：

```
 Category.create!( :name => "Ruby" )
 Category.create!( :name => "JavaScript" )
 Category.create!( :name => "PHP" )
 Category.create!( :name => "Java" )
 Category.create!( :name => "Python" )
```

編輯 `app/views/posts/_post.html.erb` 加上下拉選單：

```
  <div class="panel-footer">
    <% if current_user && current_user.is_admin? %>
+      <%= select_tag "category_id[#{post.id}]", options_for_select(Category.all.map{ |x| [x.name, x.id]}, post.category_id),
+                     :data => { :url => post_path(post) }, :prompt => "請選擇分類", :class => "select_category" %>

```

編輯 `app/views/posts/index.html.erb` 綁上事件：

```
  <script>
+   $("#post-list").on('change', ".select_category", function(){
+     var url = $(this).data("url");
+
+     $.ajax({
+       url: url,
+       method: "PATCH",
+       dataType: "json",
+       data: {
+         post: {
+           category_id: $(this).val()
+         }
+       }
+     });
+   });
  </script>
```

其中 `$ajax` 裡面的 `data` 就是要送出去的參數，透過 `$(this).val()` 可以抓到選單的值。

編輯 `app/controllers/posts_controller.rb` 加上 `update` action：

```

+  def update
+    @post = Post.find(params[:id])
+    @post.update!( post_params )
+
+    render :json => { :id => @post.id, :message => "ok"}
+  end

   #(略)

   def post_params
-    params.require(:post).permit(:content)
+    params.require(:post).permit(:content, :category_id)
   end

```

最後成果：

![image](https://ihower.tw/rails/part2/01-ajax/images/ajax-select0.png)

## [](#4-8-ajax-動畫效果)4-8 Ajax 動畫效果

上一節的下拉選單送出 Ajax 後，雖然資料庫已經更新了，但是並沒有任何視覺回饋，用戶可能會感到疑惑到底成功了沒有。所以通常我們還會製作一些動畫效果，好告訴用戶操作確實完成了。

讓我們找一張動畫圖片，在 [http://loading.io](http://loading.io) 可以產生和下載git 圖片，或用這張動圖 ![ajax-loader.gif](https://ihower.tw/rails/part2/01-ajax/images/ajax-loader.gif)（請按右鍵另存新檔)，請將動圖請放在`public/images/` 目錄下，並命名為 `ajax-loader.gif`。

![image](https://ihower.tw/rails/part2/01-ajax/images/ajax-loader.gif)

修改 `app/views/posts/index.html.erb`

```
  <script>
  $("#post-list").on('change', ".select_category",function(){
    var url = $(this).data("url");
    var that = this;

    $.ajax({
        url: url,
        method: "PATCH",
        dataType: "json",
        data: {
          post: {
            category_id: $(this).val()
          }
-       }
+       },
+       beforeSend: function(){
+         $(that).after( $(' <img src="https://ihower.tw/images/ajax-loader.gif" id="ajax-loading"> ') );
+       },
+       complete: function(){
+         $("#ajax-loading").remove();
+       }
      });
    });
  </script>
```

其中 `beforeSend` 會在 Ajax 送出前觸發，而`complete` 會在完成後觸發。分別是插入這張動畫 gif 圖片，以及在 Ajax 完成後移除圖片。

因為是本地開發，感覺可能會一閃而過，我們可以暫時故意地在 action 做延遲：

```
  def update
+   sleep(1)
    # (略 )
  end

```

但這只是看看效果，試完請移除掉。

最後成果：

![image](https://ihower.tw/rails/part2/01-ajax/images/ajax-select.png)

## [](#4-9-jquery-plugin-整合示範)4-9 jQuery Plugin 整合示範

目標: 使用 [jQuery Raty](http://www.sahmeran.nl/nieuw/modules/rating_raty/) 這個 jQuery Plugin，進行貼文的星星評等，並計算平均分數。

![image](https://ihower.tw/rails/part2/01-ajax/images/star-rating.png)

前往 [https://github.com/wbotelhos/raty](https://github.com/wbotelhos/raty) 點選 “Clone or download” 按鈕，然後點 Download ZIP 下載回來。

解壓縮後：

-   將 lib/jquery.raty.css 放到 vendor/assets/stylesheets/ 目錄下
-   將 lib/jquery.raty.js 放到 vendor/assets/javascripts/ 目錄下
-   將 images 下的圖片，放在 public/images 目錄下

修改 `app/assets/javascript/application.js`，

```
+    //= require jquery.raty
     //= require_tree .
```

修改 `app/assets/stylesheets/application.scss`

```
@import "bootstrap-sprockets";
@import "bootstrap";
@import "jquery.raty";
```

> 如果你沒裝 Bootstrap 的話，這裡是 application.css 寫 `//=require jquery.raty`

修改 `app/views/posts/_post.html.erb`

```
   <div class="panel-body">
     <span id="post-thumbsup-<%= post.id %>" class="label label-success"><%= post.likes.count %> 👍</span>

+    <div class="raty"></div>

```

修改 `app/views/posts/index.html.erb`

```
  <script>
+   $(".raty").raty( { path: '/images/' } );
  </script>
```

瀏覽畫面，應該就會看看星星了，也可以點點看。但是目前還沒串好資料庫。

![image](https://ihower.tw/rails/part2/01-ajax/images/rating1.png)

接下來希望點了星星評等，會實際紀錄進資料庫。

## [](#4-10-jquery-plugin-整合示範cont)4-10 jQuery Plugin 整合示範(cont)

一個用戶可以針對很多貼文評分，一篇貼文也可以有多人評分，讓我們新增一個 PostScore model 來紀錄分數：

執行 `rails g model post_score`

修改 \`db/migrate/201704XXXXXXXX\_create\_post\_scores.rb

```
  class CreatePostScores < ActiveRecord::Migration[5.0]
    def change
      create_table :post_scores do |t|
+       t.integer :post_id, :index => true
+       t.integer :score
+       t.integer :user_id
        t.timestamps
      end
    end
  end

```

執行 `rake db:migrate`

編輯 `app/models/post_score.rb`

```
  class PostScore < ApplicationRecord
+
+   belongs_to :post
+   belongs_to :user
+
  end
```

編輯 `app/models/post.rb`

```
+  has_many :scores, :class_name => "PostScore"
+
+  def find_score(user)
+    user && self.scores.where( :user_id => user.id ).first
+  end
+
+
+  def average_score
+    self.scores.average(:score)
+  end

```

編輯 `config/routes.rb`

```
   resources :posts do
     member do
       post "like" => "posts#like"
       post "unlike" => "posts#unlike"
       post "toggle_flag" => "posts#toggle_flag"
+      post "rate" => "posts#rate"
     end
   end
```

再次修改 `app/views/posts/_post.html.erb`，加上平均分數，以及 data 屬性包括用戶給的分數 score 和打分的 url，好讓 jQuery 可以處理。

```
   <div class="panel-body">
     <span id="post-thumbsup-<%= post.id %>" class="label label-success"><%= post.likes.count %> 👍</span>

-    <div class="raty"></div>
+    <span class="average-score"><%= post.average_score %></span>
+    <div class="raty" data-score="<%= post.find_score(current_user).try(:score) || 0 %>" data-score-url="<%= rate_post_path(post) %>"></div>
+

```

修改 `app/views/posts/index.html.erb`

```
  <script>
-   $(".raty").raty( { path: '/images/' } );
+   $(".raty").raty({
+     path: '/images/',
+     score: function() { return $(this).data('score'); },
+     click: function(score) {
+       var that = this;
+       $.ajax({
+         url: $(this).data("score-url"),
+         method: "POST",
+         data: { score: score },
+         dataType: "json",
+         success: function(data){
+           $(that).closest(".panel-body").find(".average-score").html( data["average_score"] );
+         }
+       })
+     }
+   });
  </script>
```

根據 raty 的文檔，其中：

-   `score` 是初始函式，我們已經用 `data-score` 屬性將用戶之前的評分放上去，這裡再用 `$(this).data('score');` 抓到值。
-   `click` 是當用戶點擊星星時，會觸發的函式。這裡就是會送出 Ajax 請求。

編輯 `app/controllers/posts_controller.rb` 加上接收的 action：

```
+  def rate
+    @post = Post.find(params[:id])
+
+    existing_score = @post.find_score(current_user)
+    if existing_score
+      existing_score.update( :score => params[:score] )
+    else
+      @post.scores.create( :score => params[:score], :user => current_user )
+    end
+
+    render :json => { :average_score => @post.average_score }
+  end
```

最後成果：

![image](https://ihower.tw/rails/part2/01-ajax/images/rating2.png)

* * *
