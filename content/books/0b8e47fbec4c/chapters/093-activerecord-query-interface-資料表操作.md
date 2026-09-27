> A person does not really understand something until after teaching it to a computer. – Donald Knuth

這一章將介紹更多_ActiveRecord_的_CRUD_方式。

## [](#讀取資料)讀取資料

ActiveRecord 使用了 Arel 技術來實作查詢功能，你可以自由組合 where、limit、select、order 等條件。

> Arel 是 relational algebra” library。但根據 2.0 實作者 tenderlove 的說法，也可以說是一種 SQL compiler。 http://engineering.attinteractive.com/2010/12/architecture-of-arel-2-0/

### [](#first-和-last)first 和 last

拿出資料庫中的第一筆和最後一筆資料：

```
c1 = Category.first
c2 = Category.last
```

### [](#all-和-none)all 和 none

拿出資料庫中全部的資料和無。

```
categories = Category.all
categories_null_object = Category.none
```

> 如果資料量較多，請不要在正式上線環境中執行.all 把所有資料拿出來，這樣會耗費非常多的記憶體。請用分頁或縮小查詢範圍。

> `none` 看起來很沒有用，主要是為了造出 [Null object](https://en.wikipedia.org/wiki/Null_Object_pattern)。

### [](#find)find

已知資料的主鍵 ID 的值的話，可以使用 find 方法：

```
c3 = Category.find(1)
c4 = Category.find(2)
```

find 也可以接受陣列參數，這樣就會一次找尋多個並回傳陣列：

```
arr = Category.find([1,2])
# 或是
arr = Category.find(1,2)
```

## [](#find_by_)find\_by\_\*

這個動態的方法可以非常簡單的直接條件查詢欄位，例如：

```
category = Category.find_by_name("Business")
category = Category.find_by_name_and_position("Business", 123)
```

> 如果找不到資料的話，會丟 ActiveRecord::RecordNotFound 例外。如果是 find\_by\_id 就不會丟出例外，而是回傳 nil。

### [](#reload)reload

這個方法可以將物件從資料庫裡重新載入一次：

```
> e = Event.first
> e.name = "test"
> e.reload
```

### [](#pluck)pluck

這個方法可以非常快速的撈出指定欄位的資料：

```
Event.pluck(:name)
=> ["foo", "bar"]
Category.pluck(:id, :name)
=> [ [1, "Tech"], [2, "Business"] ]
```

### [](#find_by_sql)find\_by\_sql

如果需要手動撰寫 SQL，可以使用`find_by_sql`和`count_by_sql`，例如：

```
c8 = Category.find_by_sql("select * from categories")
```

不過需要用到的機會應該很少。

### [](#where-查詢條件)where 查詢條件

where 可以非常彈性的組合出 SQL 查詢，例如：

```
c9 = Category.where( :name => 'Ruby', :position => 1 )
c10 = Category.where( "name = ? or position = ?", 'Ruby', 2 )
```

其中參數有兩種寫法，一種是 Hash，另一種是用`?`替換組合出`SQL`。前者的寫法雖然比較簡潔，但是就沒辦法寫出 or 的查詢。注意到不要使用字串寫法，例如

```
Category.where("name = #{params[:name]}") # 請不要這樣寫
```

這是因為字串寫法會有_SQL injection_的安全性問題，所以請改用_Hash_或`?`的形式來帶入變數。

### [](#wherenot)where.not

`where.not`可以組合出不等於的查詢，例如：

```
Category.where.not( :name => 'Ruby' )
```

會查詢所有`name`不是`Ruby`的資料，這跟`Category.where("name != ?", 'Ruby')`是一樣的作用。

### [](#limit)limit

limit 可以限制筆數

```
c = Category.limit(5).all
c.size # 5
```

### [](#order)order

order 可以設定排序條件

```
Category.order("position")
Category.order("position DESC")
Category.order("position DESC, name ASC")
```

如果要消去_order_條件，可以用`reorder`：

```
Category.order("position").reorder("name") # 改用 name 排序
Category.order("position").reorder(nil) # 取消所有排序
```

### [](#offset)offset

offset 可以設定忽略前幾筆不取出，通常用於資料分頁：

```
c = Category.limit(2)
c.first.id # 1
c = Category.limit(2).offset(3)
c.first.id # 4
```

### [](#select)select

預設的 SQL 查詢會取出資料的所有欄位，有時候你可能不需要所有資料，為了效能我們可以只取出其中特定欄位：

```
Category.select("id, name")
```

> 例如欄位中有 Binary 資料時，你不會希望每次都讀取出龐大的 Binary 資料佔用記憶體，而只希望在使用者要下載的時候才讀取出來。

### [](#readonly)readonly

```
c = Category.readonly.first
```

如此查詢出來的`c`就無法修改或刪除，不然會丟出`ActiveRecord::ReadOnlyRecord`例外。

### [](#group-和-having)group 和 having

`group`運用了資料庫的`group_by`功能，讓我們可以將_SQL_計算後(例如_count_)的結果依照某一個欄位分組後回傳，例如說今天我有一批訂單，裡面有分店的銷售金額，我希望能這些金額全部加總起來變成的各分店銷售總金額，這時候我就可以這麼做：

```
Order.select("store_name, sum(sales)").group("store")
```

這樣會執行類似這樣的_SQL_:

```
SELECT store_name, sum(sales) FROM orders GROUP BY store_name
```

`having`則是讓`group`可以再增加條件，例如我們想為上面的查詢增加條件是找出業績銷售超過10000的分店，那麼我可以這麼下：

```
Order.select("store_name, sum(sales)").group("store").having("sum(sales) > ?", 10000)
```

所執行的_SQL_便會是:

```
SELECT store_name, sum(sales) FROM orders GROUP BY store_name HAVING sum(sales) > 10000
```

### [](#串接寫法)串接寫法

以上的 where, order , limit, offset, joins, select 等等，都可以自由串接起來組合出最終的 SQL 條件：

```
c12 = Category.where( :name => 'Ruby' ).order("id desc").limit(3)
```

### [](#find_each-批次處理)find\_each 批次處理

如果資料量很大，但是又需要全部拿出來處理，可以使用 find\_each 批次處理

```
Category.where("position > 1").find_each do |category|
    category.do_some_thing
end
```

預設會批次撈 1000 筆，如果需要設定可以加上 :batch\_size 參數。

## [](#新增資料)新增資料

_ActiveRecord_提供了四種_API_，分別是save、save!、create和create!：

```
> a = Category.new( :name => 'Ruby', :position => 1 )
> a.save

> b = Category.new( :name => 'Perl', :position => 2 )
> b.save!

> Category.create( :name => 'Python', :position => 3 )
> c = Category.create!( :name => 'PHP', :position => 4 )
```

其中_create_和_create!_就等於`new`完就_save_和_save!_，有無驚嘆號的差別在於_validate_資料驗證不正確的動作，無驚嘆號版本會回傳布林值(true或false)，有驚嘆號版本則是驗證錯誤會丟出例外。

何時使用驚嘆號版本呢？save和create通常用在會處理回傳布林值(true/false)的情況下(例如在 controller 裡面根據成功失敗決定 render 或 redirect)，否則在預期應該會儲存成功的情況下，請用 save!或create! 來處理，這樣一旦碰到儲存失敗的情形，才好追蹤 bug。

透過`:validate => false`參數可以略過驗證

```
> c.save( :validate => false )
```

### [](#new_record)new\_record?

這個方法可以知道物件是否已經存在於資料庫：

```
> c.new_record?
=> false
> c.persisted?
=> true
```

### [](#first_or_initialize-和-first_or_create)first\_or\_initialize 和 first\_or\_create

這個方法可以很方便的先查詢有沒有符合條件的資料，沒有的話就初始化，例如：

```
c = Category.where( :name => "Ruby" ).first || Category.new( :name => "Ruby" )
```

可以改寫成

```
c = Category.where( :name => "Ruby" ).first_or_initialize
```

如果要直接存進資料庫，可以改用`first_or_create`：

```
c = Category.where( :name => "Ruby" ).first_or_create
```

或是_Validate_失敗丟例外的版本：

```
c = Category.where( :name => "Ruby" ).first_or_create!
```

## [](#更新資料)更新資料

更新一個_ActiveRecord_物件：

```
c13 = Category.first
c13.update(attributes)
c13.update!(attributes)
c13.update_column(attribute_name, value)
c13.update_columns(attributes)
```

> 注意 update\_column 會略過 validation 資料驗證 注意 mass assign 安全性問題，詳見安全性一章。

我們也可以用`update_all`來一次更新資料庫的多筆資料：

```
> Category.where( :name => "Old Name" ).update_all( :name => "New Name" )
```

### [](#increment-和-decrement)increment 和 decrement

數字欄位可以使用`increment`和`decrement`方法，也有`increment!`和`decrement!`立即存進資料庫的用法。

```
post = Post.first
post.increment!(:comments_count)
post.decrement!(:comments_count)
```

> 有 `!` 的版本會直接 `save`

另外也有 class 方法可以使用，這樣就不需要先撈物件：

```
Post.increment_count(:comments_count, post_id)
```

### [](#toggle)toggle

_Boolean_欄位可以使用`toggle`方法，同樣也有`toggle!`

## [](#刪除資料)刪除資料

一種是先抓到該物件，然後刪除：

```
c12 = Category.first
c12.destroy
```

另一種是直接對類別呼叫刪除，例如：

```
Category.delete(2) #
Category.delete([2,3,4])
Category.where( ["position > ?", 3] ).delete_all
Category.where( ["position > ?", 3] ).destroy_all
```

delete 不會有 callback 回呼，destroy 有 callback 回呼。什麼是回呼請詳見下一章。

## [](#統計方法)統計方法

```
Category.count
Category.average(:position)
Category.maximum(:position)
Category.minimum(:position)
Category.sum(:position)
```

其中我們可以利用上述的 where 條件縮小範圍，例如：

```
Category.where( :name => "Ruby").count
```

## [](#scopes-作用域)Scopes 作用域

_Model Scopes_是一項非常酷的功能，它可以將常用的查詢條件宣告起來，讓程式變得乾淨易讀，更厲害的是可以串接使用。例如，我們編輯_app/models/event.rb_，加上兩個_Scopes_：

```
class Event < ApplicationRecord
    scope :open_public, -> { where( :is_public => true ) }
    scope :recent_three_days, -> { where(["created_at > ? ", Time.now - 3.days ]) }
end

> Event.create( :name => "public event", :is_public => true )
> Event.create( :name => "private event", :is_public => false )
> Event.create( :name => "private event", :is_public => true )

> Event.open_public
> Event.open_public.recent_three_days
```

> `-> {...}`是Ruby語法，等同於`Proc.new{...}`或`lambda{...}`，用來建立一個匿名方法物件

串接的順序沒有影響的，都會一併套用。我們也可以串接在_has\_many_關聯後：

```
> user.events.open_public.recent_three_days
```

接著，我們可以設定一個預設的_Scope_，通常會拿來設定排序：

```
class Event < ApplicationRecord
    default_scope -> { order('id DESC') }
end
```

`unscoped`方法可以暫時取消預設的_default\_scope_：

```
Event.unscoped do
    Event.all
    # SELECT * FROM events
end
```

最後，_Scope_也可以接受參數，例如：

```
class Event < ApplicationRecord
    scope :recent, ->(date) { where("created_at > ?", date) }

    # 等同於 scope :recent, lambda{ |date| where(["created_at > ? ", date ]) }
    # 或 scope :recent, Proc.new{ |t| where(["created_at > ? ", t ]) }
end

Event.recent( Time.now - 7.days )
```

不過，筆者會推薦上述這種帶有參數的_Scope_，改成如下的類別方法，可以比較明確看清楚參數是什麼，特別是你想給預設值的時候：

```
class Event < ApplicationRecord
    def self.recent(t=Time.now)
        where(["created_at > ? ", t ])
    end
end

Event.recent( Time.now - 7.days )
```

這樣的效果是一樣的，也是一樣可以和其他_Scope_做串接。

`all`方法可以將_Model_轉成可以串接的形式，方便依照參陣列合出不同查詢，例如

```
fruits = Fruit.all
fruits = fruits.where(:colour => 'red') if options[:red_only]
fruits = fruits.limit(10) if limited?
```

> 可以呼叫`to_sql`方法觀察實際_ORM_轉出來的_SQL_，例如`Event.open_public.recent_three_days.to_sql`

### [](#or)or

or 可以組合出「或」的條件，搭配 Scope 特別好用，例如:

```
Event.open_public.or( Event.recent_three_days )
```

這樣就會抓出 `open_public` 或 `recent_three_days` 的資料。

```
Fruits.where(:colour => 'red').or( Fruits.where(:colour => 'green') )
```

當然用 where 來組合也是可以的。注意 or 的參數也是一個完整的查詢句即可。

## [](#虛擬屬性virtual-attribute)虛擬屬性(Virtual Attribute)

有時候表單裡操作的屬性資料，不一定和資料庫的欄位完全對應。例如資料表分成_first\_name_和_last\_name_兩個欄位好了，但是表單輸入和顯示的時候，只需要一個屬性叫做_full\_name_，這時候你就可以在_model_裡面定義這樣的方法：

```
def full_name
    "#{self.first_name} #{self.last_name}"
end

def full_name=(value)
    self.first_name, self.last_name = value.to_s.split(" ", 2)
end
```

## [](#自訂資料表名稱或主鍵欄位)自訂資料表名稱或主鍵欄位

我們在[環境設定與Bundler](https://ihower.tw/rails/environments-and-bundler.html)一章曾提及_Rails_的命名慣例，資料表的名稱預設就是_Model_類別名稱的複數小寫，例如_Event_的資料表是_events_、_EventCategory_的資料表是_event\_categories_。不過英文博大精深，_Rails_轉出來的複數不一定是正確的英文單字，這時候你可以修改`config/initializers/inflections.rb`進行訂正。

如果你的資料表不使用這個命名慣例，例如連接到舊的資料庫，或是主鍵欄位不是`id`，也可以手動指定：

```
class Category < ApplicationRecord
  self.table_name = "your_table_name"
  self.primary_key = "your_primary_key_name"
end
```

## [](#更多線上資源)更多線上資源

-   [Active Record Query Interface](http://guides.rubyonrails.org/active_record_querying.html)

* * *
