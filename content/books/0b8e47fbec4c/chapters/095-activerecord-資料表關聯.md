> Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it. — Brian W. Kernighan

在「ActiveRecord - 基本操作與關聯設計」一章我們已經有了關聯設計的基本概念，這一章我們將進一步深入了解細節的設定，以及多型關聯設計。

## [](#has_many-的集合物件)has\_many 的集合物件

在關聯的集合上，我們有以下方法可以使用：

-   «(\*records) and create
-   any? and empty?
-   build and new
-   count
-   delete\_all
-   destroy\_all
-   find(id)
-   ids
-   include?(record)
-   first, last
-   reload

例如：

```
> e = Event.first
> e.attendees.destroy_all
```

## [](#has_many-的設定)has\_many 的設定

### [](#class_name)class\_name

可以變更關聯的類別名稱，例如以下新增了`paid_attendees`關聯，和另一個`has_many :attendees`都關聯到同一個_attendees table_：

```
class Event < ApplicationRecord
	has_many :attendees
	has_many :paid_attendees, :class_name => "Attendee"
	#...
end
```

### [](#foreign_key)foreign\_key

可以變更_Foreign Key_的欄位名稱，例如改成`paid_user_id`：

```
class Event < ApplicationRecord
    belongs_to :paid_user, :class_name => "User", :foreign_key => "paid_user_id"
    #...
end
```

### [](#scope)scope

在第二個參數傳入匿名函式，可以設定關聯的範圍條件，例如：

```
class Event < ApplicationRecord
	has_many :attendees
	has_many :paid_attendees, -> { where(:status => "paid") }, :class_name => 'Attendee'
	#...
end
```

這個語法跟我們之前學過的_Arel_串接寫法是一樣的，所以可以繼續串接加上排序等其他條件：

```
class Event < ApplicationRecord
	has_many :attendees
	has_many :paid_attendees, -> { where(:status => "paid").order("id DESC") }, :class_name => 'Attendee'
	#...
end
```

### [](#dependent)dependent

可以設定當物件刪除時，怎麼處理依賴它的資料，例如：

```
class Event < ApplicationRecord
  has_many :attendees, :dependent => :destroy
end
```

其中`:dependent`可以設定有幾種不同的處理方式，例如：

-   `:destroy` 把依賴的_attendees_也一併刪除，並且執行_Attendee_的_destroy_回呼
-   `:delete` 把依賴的_attendees_也一併刪除，但不執行_Attendee_的_destroy_回呼
-   `:nullify` 不會幫忙刪除_attendees_，但會把_attendees_的外部鍵`event_id`都設成`NULL`
-   `:restrict_with_exception` 如果有任何依賴的_attendees_資料，則連_event_都不允許刪除。執行刪除時會丟出錯誤例外`ActiveRecord::DeleteRestrictionError`。
-   `:restrict_with_error` 不允許刪除。執行刪除時會回傳`false`，在`@event.errors`中會留有錯誤訊息。

如果沒有設定`:dependent`的話，就不會特別去處理。

> 要不要執行_attendee_的刪除回呼差在執行效率，如果需要回呼的話，必須一筆筆把_attendee_讀取出來變成_attendee_物件，然後呼叫它的_destroy_。如果用`:delete`的話，只需要一個_SQL_語句就可以刪除全部_attendee_了。

### [](#through)through

透過關聯來建立另一個關聯集合，用於建立多對多的關係。

```
class Event < ApplicationRecord
	has_many :event_groupships
   has_many :groups, :through => :event_groupships
end
```

### [](#source)source

搭配`through`設定使用，當關聯的名稱不一致的時候，需要加上`source`指名是哪一種物件。

```
class Event < ApplicationRecord
	has_many :event_groupships
   has_many :classifications, :through => :event_groupships, :source => :group
end
```

## [](#has_one-的集合物件)has\_one 的集合物件

多了兩個方法可以新增關聯物件：

-   `build_{association_name}`
-   `create_{association_name}`

例如：

```
e = Event.first
e.build_location
```

## [](#has_one-的設定)has\_one 的設定

`class_name`、`dependent`、_scope_條件等設定，都和_has\_many_一樣。

## [](#belongs_to-的設定)belongs\_to 的設定

### [](#optional)optional

在 Rails 5.1 之後的版本，belongs\_to 關聯的 model 預設改成必填了，也就是一定要有。透過 `optional => true` 可以允許 event 沒有 category 的情況。

```
class Event < ApplicationRecord
  belongs_to :category, :optional => true
end
```

> 如果你是從舊版 Rails 升級上來，可以在 `config/application.rb` 中加入 `Rails.application.config.active_record.belongs_to_required_by_default = false` 改回舊版的預設行為。

### [](#class_name-1)class\_name

可以變更關聯的類別名稱，例如：

```
class Event < ApplicationRecord
    belongs_to :manager, :class_name => "User" # 預設的外部鍵叫做 manager_id
end
```

### [](#foreign_key-1)foreign\_key

可以變更_Foreign Key_的欄位名稱，例如改成`user_id` ：

```
class Event < ApplicationRecord
    belongs_to :manager, :class_name => "User", :foreign_key => "user_id"
end
```

### [](#touch)touch

這會在修改時，也順道修改關聯資料的`updated_at`時間：

```
class Attendee < ApplicationRecord
	belongs_to :event, :touch => true
end
```

### [](#counter_cache)counter\_cache

針對關聯作計數的快取，假設_Event_身上有_attendees\_count_這個欄位，那麼：

```
class Attendee < ApplicationRecord
	belongs_to :event, :counter_cache => true
end
```

這樣_ActiveRecord_就會自動更新_attendees\_count_的數字。

## [](#joins-和-includes-查詢)joins 和 includes 查詢

針對_Model_中的`belongs_to`和`has_many`關連，可以使用`joins`，也就是_INNER JOIN_

```
Event.joins(:category)
# SELECT "events".* FROM "events" INNER JOIN "categories" ON "categories"."id" = "events"."category_id"
```

可以一次關連多個：

```
 Event.joins(:category, :location)
```

透過_joins_抓出來的_event_物件是沒有包括其關連物件的，因為_Rails_預設只有`select event.*`而沒有`select categories.*`，因此_joins_主要的用途是來搭配_where_的條件查詢，幫忙過濾_events_資料：

```
Event.joins(:category).where("categories.name is NOT NULL")
# SELECT "events".* FROM "events" INNER JOIN "categories" ON "categories"."id" = "events"."category_id" WHERE (categories.name is NOT NULL)
```

如果需要其關連物件的資料，例如上述的_categories_，我們會偏好使用`includes`。_includes_會將關連物件的資料也一併讀取出來，避免_N+1_問題(見效能一章)，例如：

```
Event.includes(:category)
# SELECT * FROM events
# SELECT * FROM categories WHERE categories.id IN (1,2,3...)
```

同理，也可以一次載入多個關連：

```
Event.includes(:category, :attendees)
# SELECT "events".* FROM "events"
# SELECT "categories".* FROM "categories" WHERE "categories"."id" IN (1,2,3...)
# SELECT "attendees".* FROM "attendees" WHERE "attendees"."event_id" IN (4, 5, 6, 7, 8...)
```

`includes`方法也可以加上條件：

```
Event.includes(:category).where( :category => { :position => 1 } )
```

## [](#sql-explain)SQL Explain

-   [http://www.rubyletter.com/blog/2017/03/13/rubyist-guide-to-postgres-explain.html](http://www.rubyletter.com/blog/2017/03/13/rubyist-guide-to-postgres-explain.html)

## [](#多型關聯polymorphic-associations)多型關聯(Polymorphic Associations)

多型關連_(Polymorphic Associations)_可以讓一個 Model 不一定關連到某一個特定的 Model，秘訣在於除了整數的`_id`外部鍵之外，再加一個字串的`_type`欄位說明是哪一種_Model_。

例如一個`Comment model`，我們可以透過多型關連讓它`belongs_to`到各種不同的 _Model_上，假設我們已經有了_Article_與_Photo_這兩個_Model_，然後我們希望這兩個_Model_都可以被留言。不用多型關連的話，你得分別建立_ArticleComment_和_PhotoComment_的_model_。用多型關連的話，無論有多少種需要被留言的_Model_，只需要一個_Comment model_即可：

```
rails g model comment content:text commentable_id:integer commentable_type
```

這樣會產生下面的 Migration 檔案：

```
class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :commentable_id
      t.string :commentable_type

      t.timestamps
    end
  end
end
```

這個_Migration_檔案中，我們用_content_這個欄位來儲存留言的內容，_commentable\_id_用來儲存被留言的物件的_id_而_commentable\_type_則用來儲存被留言物件的種類，以這個例子來說被留言的物件就是_Article_與_Photo_這兩種_Model_，這個_Migration_檔案也可以改寫成下面這樣：

```
class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.text :content
      t.belongs_to :commentable, :polymorphic => true

      t.timestamps
    end
  end
end
```

回到我們的_Model_，我們必須指定他們的關聯關係：

```
class Comment < ApplicationRecord
  belongs_to :commentable, :polymorphic => true
end

class Article < ApplicationRecord
  has_many :comments, :as => :commentable
end

class Photo < ApplicationRecord
  has_many :comments, :as => :commentable
end
```

這樣會告訴_Rails_如何去設定你的多型關係，現在讓我們進_console_實驗看看：

```
article = Article.first

# 透過關連新增留言
comment = article.comments.create(:content => "First Comment")

# 你可以發現 Rails 很聰明的幫我們指定了被留言物件的種類和id
comment.commentable_type => "Article"
comment.commentable_id => 1

# 也可以透過 commentable 反向回查關連的物件
comment.commentable => #<Article id: 1, ....>
```

> _DBA_背景的同學可能會注意到_PolymorphicAassociations_無法做到保證_Referential integrity_特性。原因很簡單，既然不知道`_id`會指到哪個`table`，自然也就沒辦法在資料庫層級加上_Foreign key constraint_。

## [](#更多線上資源)更多線上資源

-   [Active Record Associations](http://guides.rubyonrails.org/association_basics.html)

* * *
