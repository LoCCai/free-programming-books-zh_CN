## [](#part-3-關於-view)Part 3: 關於 View

## [](#11-將代碼放回-controller)11\. 將代碼放回 controller

> 關於 View，最重要的守則就是在 template 中絕對沒有商務邏輯。

重構前：在 View 出現了 `@posts = Post.all`

```
<% @posts = Post.all %>

<% @posts.each do |post| %>
 <%= post.title %>
 <%= post.content %>
<% end %>
```

重構後：應該在 controller 中就先讀取 @posts

```
class PostsController < ApplicationController

  def index
    @posts = Post.all
  end

end
```

```
<% @posts.each do |post| %>
 <%= post.title %>
 <%= post.content %>
<% end %>
```

## [](#12-將代碼重構到-model)12\. 將代碼重構到 Model

情境：在 View 中需要一些條件判斷，來決定要不要顯示某些內容

重構前：需要檢查有登入、該用戶是該篇文章作者或是編輯員

```
<% if current_user && (current_user == @post.user ||
                       @post.editors.include?(current_user) %>
  <%= link_to 'Edit this post', edit_post_url(@post) %>
<% end %>
```

重構後：這一整段條件判斷，可以重構到 Model 的一個方法。這樣 View 裡面只需要調用 `@post.editable_by?(current_user)` 即可，代碼乾凈又清楚。

```
<% if @post.editable_by?(current_user) %>
  <%= link_to 'Edit this post', edit_post_url(@post) %>
<% end %>
```

```
class Post < ActiveRecord::Base
  def ediable_by?(user)
    user && ( user == self.user || self.editors.include?(user)
  end
end
```

## [](#13-將代碼重構到-helper)13\. 將代碼重構到 Helper

情境：

-   HTML 與 Ruby 高度混雜
-   該段程式碼有很多 if / else
-   該段程式碼衣服穿很多層 simple\_format(truncate(auto\_link(@post.content), :length => 30) )

重構前：我們想要把文章內容自動加超連結、截斷只留前30字前、保留換行等等：

```
<%= simple_format(truncate(auto_link(@post.content), :length => 30) ) %>
```

重構後：抽取出一個 `pretty_content` helper 方法，這樣在各處 template 都可以重復使用這個 helper，而且也比較清楚。

```

module PostsHelper
  def pretty_content(content)
    simple_format(truncate(auto_link(content), :length => 30) )
  end
end

```

```
<%= pretty_content(@post.content) %>
```

> 那到底什麽情境適合把代碼重構到 Model? 什麽時候用 Helper 呢？如果跟 HTML 畫面顯示無關，跟商務邏輯有關，則放到 Model 裡面。如果跟 HTML 畫面顯示有關，則適合放在 Helper 裡面。一般來說，在 Model 裡面是不會處理 HTML 代碼的，這是 Helper 的事情。

## [](#14-將代碼重構到-partial-樣板)14\. 將代碼重構到 Partial 樣板

情境：Helper 是 Ruby 代碼，裡面不適合放太多的 HTML。如果你有一整段的 HTML 代碼想要抽取出來，應該用 Partial 樣板。

重構前：

```
def render_product_item(product)
  content_tag(:div, :class => "col-md-3") do
    content_tag(:div, link_to(product.title), product_path(product) ) +
    content_tag(:p, tag(:hr)) +
    content_tag(:span, product.price + "元")
  end
end
```

```
  <%= render_product_item(@product) %>
```

重構後：應該改用 partial 而不是 helper。

```

<div class="col-md-3">
  <div><%=link_to(product.title), product_path(product) %></div>
  <p>
    <hr>
    <span><%= product.price %>元</span>
  </p>
</div>
```

```
  <%= render :partial => "item", :locals => { :product => @product } %>
```

## [](#15-使用-partial-盡量用區域變數取代物件變數)15\. 使用 Partial 盡量用區域變數取代物件變數

情境：在使用 Partial 時

```
class Post < ApplicationController
  def show
    @post = Post.find(params[:id)
  end
end
```

重構前：在 action 中宣告的物件變數例如 `@post`，會穿透到這個 template 內所有使用的 partial。雖然很方便，但是如果 partial 內要用到的變數很多，就會搞不清楚到底要準備哪些變數才能使用這個 partial。

```
<%= render :partial => "sidebar" %>
```

```
<%= @post.title %>
```

重構後：將 @post 傳入這個 partial，這樣在這個 partial 裡面，就會變成區域變數 `post`。這個好處是可以增加這個 partial 的可重復使用性，也比較清楚要傳這些變數才能使用。

```
<%= render :partial => "sidebar", :locals => { :post => @post } %>
```

```
<%= post.title %>
```

## [](#16-整理-helper-檔案)16\. 整理 Helper 檔案

情境：每次 rails g controller XXX 時，Rails 都會自動新增對應的 XXX\_helper.rb 檔案

重構前：很多 Helper 檔案打開來裡面都是空的，沒有用到

```
app/helpers/user_posts_helper.rb
app/helpers/author_posts_helper.rb
app/helpers/editor_posts_helper.rb
app/helpers/admin_posts_helper.rb
```

重構後：簡化集中到少數的 Helper 檔案即可。這些 Helper 檔案跟 Controller 並沒有對應的關系，所有 Helper 檔案裡面宣告的方法都是通用的，不會因為放在哪一個 Helper 檔案而有差異。因此我們可以重新編排整理。

```
app/helpers/posts_helper.rb
```

* * *
