Part 1: 關於 Controller

## [](#2-將代碼從-controller-重構到-model)2\. 將代碼從 Controller 重構到 Model

[Skinny Controller, Fat Model](http://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model) 是一篇在 Rails 社區非常有名的文章，這篇 2006 年 Rails 2 時期的舊文章，定調了 Fat Controller 是一種反模式(anti-pattern)。放在 Controller 的代碼一般來說比較難進行重用(re-use)和單元測試，可讀性也較差，我們希望將更多代碼放在 Model 裡面。

一個 Rails 專案如果 controller 代碼很多，但是 model 代碼打開卻沒有自定義什麽方法，給人的印象上就是這是軟體開發初學者所寫的專案。

基本上，一段 Controller 的 action 代碼如果超過15行以上，很可能這段代碼表示太肥大了，應該進行重構。

以下示範幾個情境，適合將 Controller 的代碼重構到 Model，目的都是在簡化 controller 的代碼。

## [](#3-善用-model-scope)3\. 善用 Model scope

情境：在 action 中需要依照不同條件撈取 Model 數據

重構前：在 action 中用 where 指定不同條件

```
class PostsController < ApplicationController
  def index
    @public_posts = Post.where(:state => 'public' ).limit(10)
                  .order('id desc')
    @draft_posts  = Post.where(:state => ‘draft').limit(10)
                  .order('id desc')
  end
end
```

重構後：把 where 條件搬到 model 的 scope 宣告，這樣就可以在 controller 使用已經定義好的 scope。可讀性變好，而且可以在不同地方重復沿用這個 scope。

```
class Post < ActiveRecord::Base
  scope :published, -> { where(:state => ‘published').limit(10)
                        .order('id desc') }
  scope :draft, -> { where(:state => ‘draft').limit(10)
                    .order('id desc') }
end
```

```
class UsersController < ApplicationController
  def index
    @published_post = Post.published
    @draft_post = Post.draft
  end
end
```

## [](#4-善用-model-association)4\. 善用 Model association

情境：新建數據時，想要關聯建立的用戶

重構前：

```
class PostsController < ApplicationController
  def create
    @post = Post.new(params[:post])
    @post.user_id = current_user.id
    @post.save
  end
end
```

重構後：由於 User has\_many posts 的關系，我們可以用 `current_user.posts.build` 來取代 `@post.user_id = current_user.id` 的作用。

```
class PostsController < ApplicationController
  def create
    @post = current_user.posts.build(params[:post])
    @post.save
  end
end
```

```
class User < ActiveRecord::Base
  has_many :posts
end
```

## [](#5-有關聯的權限檢查-scope-access)5\. 有關聯的權限檢查 scope access

情境：讀取數據時，想要檢查用戶有沒有操作該數據的權限

重構前：需要檢查 `@post.user` 等於 `current_user`

```
class PostsController < ApplicationController
  def edit
    @post = Post.find(params[:id)
    if @post.user != current_user
      flash[:warning] = 'Access denied'
      redirect_to posts_url
    end
  end
end
```

重構後：直接用 `current_user.posts.find` 就可以了。如果該 post 不屬於該 user，就會找不到數據。不過，如果權限允許管理員的話，這招就不行了。

```
class PostsController < ApplicationController
  def edit
    # raise RecordNotFound exception (404 error) if not found
    @post = current_user.posts.find(params[:id)
  end
end
```

## [](#6-使用-model-虛擬屬性)6\. 使用 Model 虛擬屬性

情境：在表單中，操作不是直接對應 Model 屬性的欄位。例如下述範例，假設 User model 裡面有 `first_name` 和 `last_name` 欄位，但是畫面顯示時，我們希望改用 `full_name` 來操作。這個 `full_name` 並不是資料庫中真正的欄位，而是 first\_name 和 last\_name 兩個欄位合在一起顯示而已。

重構前：表單只能用原始的 `text_field_tag` 方法，並且在 action 中拆開 `params[:full_name]` 塞進 model 的 first\_name 和 last\_name 欄位

```
<% form_for @user do |f| %>
    <%= text_filed_tag :full_name %>
<% end %>
```

```
class UsersController < ApplicationController
  def create
    @user = User.new(params[:user)
    @user.first_name = params[:full_name].split(' ', 2).first
    @user.last_name = params[:full_name].split(' ', 2).last
    @user.save
  end
end
```

重構後：在 model 中新增 `full_name` 和 `full_name=` 方法，這樣在表單就可以把 `full_name` 當作一般的 model 欄位使用。而 controller action 更是簡化到不需要處理 `full_name`。這個 `full_name` 並沒有實際對應資料庫的欄位，因此稱之虛擬屬性。

```
class User < ActiveRecord::Base
  def full_name
    [first_name, last_name].join(' ')
  end

  def full_name=(name)
    split = name.split(' ', 2)
    self.first_name = split.first
    self.last_name = split.last
  end
end
```

```
<% form_for @user do |f| %>
  <%= f.text_field :full_name %>
<% end %>
```

```
class UsersController < ApplicationController

  def create
    @user = User.create(params[:user)
  end

end

```

## [](#7-使用-model-回呼callback)7\. 使用 Model 回呼(callback)

情境：新增文章時，有一個核選方塊 `auto_tagging`，如果打勾表示想要系統自動下標籤。

重構前：需要在 action 中檢查 `params[:auto_tagging]`，然後調用 model 方法產生標籤(這裡假設有一個 AsiaSearch.generate\_tags 方法可以自動下標籤)

```
<% form_for @post do |f| %>
  <%= f.text_field :content %>
  <%= check_box_tag 'auto_tagging' %>
<% end %>
```

```
class PostController < ApplicationController
  def create
    @post = Post.new(params[:post])
    if params[:auto_tagging] == '1'
      @post.tags = AsiaSearch.generate_tags(@post.content)
    else
      @post.tags = ""
    end
    @post.save
  end
end
```

重構後：新增一個虛擬屬性 `auto_tagging`，以及一個 before\_save 回呼來檢查要不要自動下標籤。如此在 action 中就可以不必檢查和處理 auto\_tagging。這段過程會自動在 Post 存儲前，自動調用 `generate_taggings` 方法進行處理。

```
class Post < ActiveRecord::Base
  attr_accessor :auto_tagging
  before_save :generate_taggings

  private
  def generate_taggings
    return unless auto_tagging == '1' self.tags = Asia.search(self.content)
  end
end
```

```
<% form_for :note, ... do |f| %>
  <%= f.text_field :content %>
  <%= f.check_box :auto_tagging %>
<% end %>
```

```
class PostController < ApplicationController
  def create
    @post = Post.new(params[:post])
    @post.save
  end
end
```

## [](#8-將邏輯放到-model)8\. 將邏輯放到 Model

情境：有一個發布文章 publish 的 action 有很多操作的相關步驟，需要設定很多 model 欄位。

重構前：所有操作都在 action 之中

```
class PostController < ApplicationController
 def publish
   @post = Post.find(params[:id])
   @post.is_published = true
   @post.approved_by = current_user

   if @post.create_at > Time.now - 7.days
     @post.popular = 100
   else
     @post.popular = 0
   end

   @post.save
   redirect_to post_url(@post)
  end
end
```

重構後：把相關的操作全部搬到 Model 的自定義方法 `publish!`，這樣 action 中只需要調用 `@post.publish!` 即可，非常可讀清楚。這個 `publish!` 方法也可以在其它各處使用。

```
class Post < ActiveRecord::Base
  def publish!(user)
    self.is_published = true
    self.approved_by = user
    if self.create_at > Time.now-7.days
      self.popular = 100
    else
      self.popular = 0
    end
    self.save!
  end
end
```

```
class PostController < ApplicationController
  def publish
    @post = Post.find(params[:id])
    @post.publish!(current_user)

    redirect_to post_url(@post)
  end
end
```

## [](#9-使用工廠方法factory-method取代複雜的建構過程)9\. 使用工廠方法(Factory Method)取代複雜的建構過程

情境：建立 model 需要複雜的建構過程，例如以下建構 Invoice 需要設定很多屬性。

重構前：都在 create action 中完成

```
class InvoiceController < ApplicationController
  def create
    @invoice = Invoice.new(params[:invoice])
    @invoice.address = current_user.address
    @invoice.phone = current_user.phone
    @invoice.vip = ( @invoice.amount > 1000 )

    if Time.now.day > 15
      @invoice.delivery_time = Time.now + 2.month
    else
      @invoice.delivery_time = Time.now + 1.month
    end

    @invoice.save
  end
end
```

重構後：在 model 中新寫一個類方法 `new_by_user`，把建構的過程全部搬進來。這樣 controller action 裡面只需要調用這個方法即可。這一招跟上一節是一樣的道理。這種建構用途的方法又叫做工廠方法。

```
class Invoice < ActiveRecord::Base
  def self.new_by_user(params, user)
    invoice = self.new(params)
    invoice.address = user.address
    invoice.phone = user.phone
    invoice.vip = ( invoice.amount > 1000 )
    if Time.now.day > 15
      invoice.delivery_time = Time.now + 2.month
    else
      invoice.delivery_time = Time.now + 1.month
    end
    return invoice
  end
end
```

```
class InvoiceController < ApplicationController
  def create
    @invoice = Invoice.new_by_user(params[:invoice], current_user)
    @invoice.save
  end
end
```

* * *
