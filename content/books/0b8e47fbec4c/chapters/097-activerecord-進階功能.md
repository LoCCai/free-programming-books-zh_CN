> Most of you are familiar with the virtues of a programmer. There are three, of course: laziness, impatience, and hubris. - Larry Wall

本章介紹其他_ActiveRecord_的常用進階功能。

## [](#單一表格繼承stisingle-table-inheritance)單一表格繼承_STI(Single-table inheritance)_

如何將物件導向中的繼承概念，對應到關聯式資料庫的設計，是個大哉問。_Rails_內建了其中最簡單的一個解法，只用一個資料表儲存繼承體系中的物件，搭配一個`type`欄位用來指名這筆資料的類別名稱。

要開啟_STI_功能，依照慣例只要有一個欄位叫做`type`，型態字串即可。假設以下的`contacts` 資料表有欄位叫做`type`，那麼這三個_Models_實際上就會共用`contacts`一個資料表，當然，還有這兩個子類別也都繼承到父類別的`validates_presence_of :name`：

```
class Contact < ApplicationRecord
    validates_presence_of :name
end

class Company < Contact
end

class Person < Contact
end
```

讓我們進入_rails console_實驗看看，_Rails_會根據你使用的類別，自動去設定`type`欄位：

```
contact = Person.create( :name => "ihower")
contact.type # "Person"
contact.id # 1
contact = Company.create( :name => "ALPHA Camp" )
contact.id # 2
contact.type # "Company"
```

> 很遺憾，也因為這個慣例的關係，你不能將`type`這麼名字挪做它用。

_STI_最大的問題在於欄位的浪費，如果繼承體系中交集的欄位不多，那麼使用_STI_就會非常的浪費空間。如果有較多的不共用的欄位，筆者會建議不要使用這個功能，讓個別的類別有自己的資料表。要關閉_STI_，請父類別加上`self.abstract_class = true`

```
class Contact < ApplicationRecord
    self.abstract_class = true
    validates_presence_of :name
end

class Company < Contact
end

class Person < Contact
end
```

這樣_Company_和_Person_就需要有自己的_Migrations_建立_companies_和_people_資料表了。

> 除了_STI_之外，在_Patterns of Enterprise Application Architecture_一書中也有介紹其他資料庫處理OO繼承的設計模式，包括[Class Table Inheritance](http://martinfowler.com/eaaCatalog/classTableInheritance.html)、[Concrete Table Inheritance](http://martinfowler.com/eaaCatalog/concreteTableInheritance.html)和[Inheritance Mappers](http://martinfowler.com/eaaCatalog/inheritanceMappers.html)

## [](#交易transactions)交易_Transactions_

_Transaction_(交易)保證所有資料的操作都只有在成功的情況下才會寫入到資料庫，最著名的例子也就是銀行的帳戶交易，只有在帳戶提領金額及存入帳戶這兩個動作都成功的情況下才會將這筆操作寫入資料庫，否則在其中一個動作因為某些原因失敗的話就會放棄所有已做的操作將資料回復到交易前的狀態。在_Rails_中使用交易的方式像這樣：

```
ActiveRecord::Base.transaction do
  david.withdrawal(100)
  mary.deposit(100)
end
```

你可以在一個交易中包含不同_Active Record_的類別或物件，這是因為交易是以資料庫連線為範圍，而不是個別_Model_：

```
User.transaction do
  User.create!(:name => 'ihower')
  Feed.create!
end
```

注意到這裡我們要使用`create!`而不是`create`，這是因為前者驗證失敗才會丟出例外，好讓整個交易失敗。同理，在交易裡做更新應該使用`update!`而不是`update`。

單一_Model_的`save`及`destroy`方法已經幫你使用_transaction_包起來了，當資料驗證失敗或其中的回呼發生例外時，_Rails_就會觸發_rollback_。所以下述的交易區塊是多餘的不需要寫：

```
User.transaction do # 這是多餘的
  User.create!(:name => 'ihower')
end
```

另外，由於資料的更新要在交易完成後才能被讀取到，所以如果你在`after_save`回呼裡讓外部服務存取(例如呼叫全文搜尋引擎做索引)，很可能因為交易尚未完成，會讀取不到更新。這時候必須改用`after_commit`這個回呼，才能確保讀取到交易完成後的資料。

## [](#dirty-objects)Dirty objects

_Dirty Objects_功能可以追蹤_Model_的屬性是否有改變：

```
person = Person.find_by_name('Uncle Bob')
person.changed?       # => false 沒有改變任何值

# 讓我們來改一些值
person.name = 'Bob'
person.changed?       # => true 有改變
person.name_changed?  # => true 這個屬性有改變
person.name_was       # => 'Uncle Bob' 改變之前的值
person.name_change    # => ['Uncle Bob', 'Bob']
person.name = 'Bill'
person.name_change    # => ['Uncle Bob', 'Bill']

# 儲存進資料庫
person.save
person.changed?       # => false
person.name_changed?  # => false

# 看看哪些屬性改變了
person.name = 'Bob'
person.changed        # => ['name']
person.changes        # => { 'name' => ['Bill', 'Bob'] }
```

> 注意到_Model_資料一旦儲存進資料庫，追蹤記錄就重算消失了。

什麼時候會用到這個功能呢？通常是在儲存進資料庫前的回呼、驗證或_Observer_中，你想根據修改了什麼來做些動作，這時候_Dirty Objects_功能就派上用場了。

## [](#序列化-serialize)序列化 Serialize

序列化(_Serialize_)通常指的是將一個物件轉換成一個可被資料庫儲存及傳輸的純文字形態，反之將這筆資料從資料庫讀出後轉回物件的動作我們就稱之為反序列(_Deserialize_)，_Rails_提供了`serialize`讓你指定需要序列化資料的欄位，任何物件在存入資料庫時就會自動序列化成_YAML_格式，而當從資料庫取出時就會自動幫你反序列成原先的物件。這個欄位通常用_text_型態，有比較大的空間可以儲存資料，然後將一個_Hash_物件序列化之後存進去。

常用的情境例如雜七雜八的使用者_settings_：

```
class User < ApplicationRecord
  serialize :settings
end

> user = User.create(:settings => { "sex" => "male", "url" => "foo" })
> User.find(user.id).settings # => { "sex" => "male", "url" => "foo" }
```

或是一些不需要資料庫索引和正規化的一整包資料，例如_KML_軌跡資料等等。

> 雖然序列化很方便可以讓你儲存任意的物件，但是缺點是序列化資料就失去了透過資料庫查詢索引的功效，你無法在_SQL_的_where_條件中指定序列化後的資料。

## [](#store)Store

_Store_又在包裹了上一節的序列化功能，是個簡單又實用的功能，讓你可以將某個欄位指定儲存為_Hash_值。舉例來說，上一節的_settings_也可以改用_store_來設定：

```
class User < ApplicationRecord
  store :settings, :accessors => [:sex, :url]
end
```

特別的是其中`accessors`用來設定可以直接存取的屬性，這樣就可以像平常一樣那樣操作_sex_和_url_這兩個屬性，讓我們進_console_實驗看看:

```
> user = User.new(:sex => "male", :url => "http://example.com")
> user.sex
 => "male"
> user.url
 => "http://example.com"
> user.settings
 => {:sex => "male", :url => "http://example.com"}
```

因為`store`就像使用_hash_一樣，你也可以直接操作它，加入新的資料：

```
> user.settings[:food] = "pizza"
> user.settings
 => {:sex => "male", :url => "http://example.com", :food => "pizza"}
```

## [](#json-欄位)JSON 欄位

在較新的資料庫系統(PostgreSQL、MySQL >= 5.7 以上版本)，都已經開始支援 JSON 格式的欄位，因此我們已經不太需要用 Serialize 序列化的技巧來把資料硬塞進 text 欄位。

在 migration 檔案中，我們可以指定欄位格式是 `json`，例如:

```
class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles do |t|
      t.json :data
      t.timestamps
    end
  end
end

```

如此不需要宣告 `serialize :data`，就可以儲存 hash、array 等資料，Rails 會自動幫你轉 JSON 後存進資料庫，取出來時幫你解析回來。

另外，資料庫本身也有支援查詢和操作 JSON 欄位的 SQL 語法，請參考[The JSON Data Type](https://dev.mysql.com/doc/refman/8.0/en/json.html)。

## [](#更多線上資源)更多線上資源

-   [Active Record Query Interface](http://guides.rubyonrails.org/active_record_querying.html)

* * *
