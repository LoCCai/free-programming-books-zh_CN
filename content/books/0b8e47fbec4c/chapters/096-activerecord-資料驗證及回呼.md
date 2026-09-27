> I’m not a great programmer; I’m just a good programmer with great habits. - Kent Beck

這一章我們探討一個_ActiveRecord Model_的生命週期，包括了儲存時的資料驗證，以及不同階段的回呼機制。

## [](#validation-資料驗證)Validation 資料驗證

ActiveRecord 的 Validation 驗證功能，透過 Rails 提供的方法，你可以設定資料的規則來檢查資料的正確性。如果驗證失敗，就無法存進資料庫。

那在什麼時候會觸發這個行為呢？_Rails_在儲存的時候，會自動呼叫_model_物件的`valid?`方法進行驗證，並將驗證結果放在`errors`裡面。所以我們前一章可以看到

```
> e = Event.new
> e.errors # 目前還是空的
> e.errors.empty? # true
> e.valid? # 進行驗證
> e.errors.empty? # false
> e.errors.full_messages # 拿到所有驗證失敗的訊息
```

> 和 Database integrity 不同，這裡是在應用層設計驗證功能，好處是撰寫程式非常容易，Rails 已經整合進 HTML 表單的使用者介面。但是如果你的資料庫不只有 Rails 讀取，那你除了靠 ActiveRecord 之外，也必須要 DB 層實作 integrity 才能確保資料的正確性。

### [](#確保必填)確保必填

validates\_presence\_of 是最常用的規則，用來檢查資料為非 nil 或空字串。

```
class Person < ApplicationRecord
 validates_presence_of :name
 validates_presence_of :login
 validates_presence_of :email
end
```

你也可以合併成一行

```
class Person < ApplicationRecord
 validates_presence_of :name, :login, :email
end
```

### [](#確保字串長度)確保字串長度

validates\_length\_of 會檢查字串的長度

```
class Person < ApplicationRecord
  validates_length_of :name, :minimum => 2 # 最少 2
  validates_length_of :bio, :maximum => 500 # 最多 500
  validates_length_of :password, :in => 6..20 # 介於 6~20
  validates_length_of :registration_number, :is => 6 # 剛好 6
end
```

### [](#確保數字)確保數字

validates\_numericality\_of 會檢查必須是一個數字，以及數字的大小

```
class Player < ApplicationRecord
  validates_numericality_of :points
  validates_numericality_of :games_played, :only_integer => true # 必須是整數
  validates_numericality_of :age, :greater_than => 18
end
```

除了 greater\_than，還有 greater\_than\_or\_equal\_to, equal\_to, less\_than, less\_than\_or\_equal\_to 等參數可以使用。

### [](#確保唯一)確保唯一

檢查資料在資料表中必須唯一。:scope 參數可以設定範圍，例如底下的 :scope => :year 表示，在 Holiday 資料表中，相同 year 的 name 必須唯一。

```
class Account < ApplicationRecord
  validates_uniqueness_of :email
end

class Holiday < ApplicationRecord
  validates_uniqueness_of :name, :scope => :year
end
```

另外還有個參數是 :case\_sensitive 預設是 true，表示要區分大小寫。

> 這條規則並沒有辦法百分百確定唯一，如果很接近的時間內有多個 Rails processes 一起更新資料庫，就有可能發生重複的情況。比較保險的作法是資料庫也要設定唯一性。

### [](#確保格式正確)確保格式正確

透過正規表示法檢查資料的格式是否正確，例如可以用來檢查 Email、URL 網址、郵遞區號、手機號碼等等格式的正確性。

```
class User < ApplicationRecord
    validates_format_of :email, :with => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
    validates_format_of :url, :with =>  /(^$)|(^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$)/ix
end
```

> 正規表示法(regular expression)是一種用來比較字串非常有效率的方式，讀者可以利用 [Rubular](http://rubular.com/) 進行練習。

### [](#確保資料只能是某些值)確保資料只能是某些值

用來檢查資料必須只能某些值，例如以下的 status 只能是 pending 或 sent。

```
class Message < ApplicationRecord
    validates_inclusion_of :status, :in => ["pending", "sent"]
end
```

另外還有較少用到的 validates\_exclusion\_of 則是確保資料一定不會是某些值。

### [](#可共用的驗證參數)可共用的驗證參數

以下這些參數都可以用在套用在上述的驗證方法上：

#### [](#allow_nil)allow\_nil

允許資料是 nil。也就是如果資料是 nil，那就略過這個檢查。

```
class Coffee < ApplicationRecord
  validates_inclusion_of :size, :in => %w(small medium large), :message => "%{value} is not a valid size", :allow_nil => true
end
```

#### [](#allow_blank)allow\_blank

允許資料是 nil 或空字串。

```
class Topic < ApplicationRecord
  validates_length_of :title, :is => 5, :allow_blank => true
end

Topic.create("title" => "").valid? # => true
Topic.create("title" => nil).valid? # => true
```

#### [](#message)message

設定驗證錯誤時的訊息，若沒有提供則會用 Rails 內建的訊息。

```
class Account < ApplicationRecord
  validates_uniqueness_of :email, :message => "你的 Email 重複了"
end
```

#### [](#on)on

可以設定只有新建立(:create)或只有更新時(:update)才驗證。預設值是都要檢查(:save)。

```
class Account < ApplicationRecord
  validates_uniqueness_of :email, :on => :create
end
```

#### [](#if-unless)if, unless

可以設定只有某些條件下才進行驗證

```
class Event < ApplicationRecord
  validates_presence_of :description, :if => :normal_user?

  def normal_user?
      !self.user.try(:admin?)
  end
end
```

### [](#整合寫法)整合寫法

在 Rails3 之後也可以用以下的整合寫法：

```
validates :name,  :presence => true,
                  :length => {:minimum => 1, :maximum => 254}

validates :email, :presence => true,
                  :length => {:minimum => 3, :maximum => 254},
                  :uniqueness => true,
                  :email => true
```

如果需要客製化錯誤訊息的話：

```
validates :name,  :presence => { :message => "不能空白" } ,
                  :length => {:minimum => 1, :maximum => 254, :message => "長度不正確" }
```

### [](#如何自定-validation)如何自定 validation？

使用 validate 方法傳入一個同名方法的 Symbol 即可。

```
validate :my_validation

private

def my_validation
    if name =~ /foo/
        errors.add(:name, "can not be foo")
    elsif name =~ /bar/
        errors.add(:name, "can not be bar")
    elsif name == 'xxx'
        errors.add(:base, "can not be xxx")
  	end
end
```

在你的驗證方法之中，你會使用到 errors 來將錯誤訊息放進去，如果這個錯誤是因為某一屬性造成，我們就用那個屬性當做 errors 的 key，例如本例的 :name。如果原因不特別屬於某一個屬性，照慣例會用 `:base`。

### [](#資料庫層級的驗證)資料庫層級的驗證

在本章開頭就有提到，_Rails_的驗證只是在應用層輸入資料時做檢查，沒有辦法保證資料庫裡面的資料一定是正確的。如果您想要在這方面嚴謹一些，可以在_migration_新增欄位時，加上`:null => false`確保有值、`:limit`參數限制長度，或是透過_Unique Key_確保唯一性，例如：

```
        create_table :registrations do |t|
          t.string :name, :null => false, :limit => 100
          t.integer :serial
          t.timestamps
        end

        add_index :registrations, :serial, :unique => true
```

這樣資料庫就會確認_name_必須有值(不能是_NULL_)，長度不能大於_100 bytes_。_serial_是唯一的。

### [](#忽略資料驗證)忽略資料驗證

透過`:validate`參數我們可以在`save`時忽略資料驗證：

```
> event.save( :validate => false )
```

如果透過`update_column`更新特定欄位的值，也會忽略資料驗證：

```
> event.update_column( :name , nil )
```

## [](#回呼-callback)回呼 Callback

在介紹過驗證之後，接下來讓我們來看看回呼。回呼可以在_Model_資料的生命週期，掛載事件上去，例如我們可以在資料儲存進資料庫前，做一些修正，或是再儲存成功之後，做一些其他動作。回呼大致可以分成三類：

1.  在_Validation_驗證前後
2.  在儲存進資料庫前後
3.  在從資料庫移除前後

以下是當一個物件儲存時的流程，其中_1~7_就是回呼可以觸發的時機：

-   (-) save
-   (-) valid
-   (1) before\_validation
-   (-) validate
-   (2) after\_validation
-   (3) before\_save
-   (4) before\_create
-   (-) create
-   (5) after\_create
-   (6) after\_save
-   (7) after\_commit

來看幾個使用情境範例

### [](#before_validation)`before_validation`

常用來清理資料或設定預設值：

```
class Event < ApplicationRecord

  before_validation :setup_defaults

  protected

  def setup_defaults
    self.name.try(:strip!) # 把前後空白去除
  	 self.description = self.name if self.description.blank?
    self.is_public ||= true
  end
end
```

### [](#after_save)`after_save`

常用來觸發去相關聯資料的方法或資料：

```
class Attendee < ApplicationRecord

	belongs_to :event
after_save :check_event_status!

protected

def check_event_status!
  self.event.check_event_status!
end   end
```

### [](#after_destroy)`after_destroy`

可以用來清理乾淨相關聯的資料

### [](#其他注意事項)其他注意事項

-   回呼的方法一般會放在`protected`或`private`下，確保從_Model_外部是無法呼叫的。
-   `before_validation`和`before_save`的差別在於後者不會經過_Validation_資料驗證。
-   在回呼中如果想要中斷，可以用 `throws :abort`。在 Rails 5 之前的版本則是用 `return false` (這是一個很難 debug 的坑，因為你可能不小心 `return false` 而不自知)

其中`after_rollback`和`after_commit`這兩個回呼和_Transaction_交易有關。_Rollback_指的是在_transaction_區塊中發生例外時，_Rails_會將原先_transaction_中已經被執行的所有資料操作回復到執行_transaction_前的狀態，`after_rollback`就是讓你在_rollback_完成時所觸發的回呼，而`after_commit`是指在_transaction_完成後才觸發的回呼，如果要觸發非同步的操作，會需要放在_after\_commit_之中，才能確保非同步的_Process_進程能夠拿到剛剛才存進去的資料。關於_transaction_的部份請參考_ActiveRecord_進階功能一章的交易一節。

## [](#更多線上資源)更多線上資源

-   [Active Record Validations](http://guides.rubyonrails.org/active_record_validations.html)
-   [Active Record Callbacks](http://guides.rubyonrails.org/active_record_callbacks.html)

* * *
