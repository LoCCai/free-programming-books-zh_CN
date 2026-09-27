## [](#2-1-適用情境)2-1 適用情境

在做 model 的 CRUD 時，一個 `resources :events` 這樣的路由，它的 show 頁面的網址總是這樣：

`/events/123`

這樣的網址有幾個缺點:

1.  SEO(Search Engine Optimization、搜尋引擎優化) 不夠好。只有數字，而不是有意義的文字。
2.  洩露了資料庫中的資料量，聰明的用戶可以透過修改網址，就可以猜到資料庫有多少筆資料。

讓我們依序解決這個問題，這裡提供三種層次的解決方案：

-   方案一：網址上除了數字 ID，可以再加上文字
-   方案二：不要用資料庫的遞增數字 ID，而是用一個亂數產生的 ID
-   方案三：除了用亂數 ID，也可以讓用戶自定義 ID

## [](#2-2-方案一網址-id文字)2-2 方案一：網址 ID+文字

方案一：網址上除了數字 ID，可以再加上文字

![image](https://ihower.tw/rails/part2/02-recipes/images/1-to-param.png)

修改 `app/models/event.rb`，加上一個 `to_param` 方法：

```
  # app/models/event.rb
  class Event < ApplicationRecord

    validates_presence_of :name

+   def to_param
+     "#{self.id}-#{self.name}"
+   end

  end
```

這樣就好了，出來的網址就會變成 `/events/123-活動名稱`。

### [](#解說一)解說一：

在調用路由方法時，Rails 預設都會用 to\_param 方法來轉換 ID，例如：

`event_path(@event)` 等同於 `event_path(@event.to_param)`

而這個 `to_param` 方法其實是一個 Rails 預設就有的方法，它本來是這樣的：

```
def to_param
  self.id
end
```

這就是為什麽你不需要特地寫 `event_path(@event.id)`，因為 Rails 預設調用了 `to_param`

### [](#解說二)解說二：

在 controller 中的 `@event = Event.find(params[:id])` 為什麽不需要修改呢? 因為 Rails 在 `find` 的時候，會先調用 `to_i` 轉成純數字的 ID。

而任意字串 `to_i` 之後，只會留下前面的數字，後面非數字的字串都會忽略掉。

於是 `"123-XXXXX".to_i` 就變成 `123` 了，和本來的數字 ID 是一致的。

## [](#2-3-方案二-亂數-id)2-3 方案二: 亂數 ID

### [](#方案二不要用資料庫的遞增數字-id而是用一個亂數產生的-id)方案二：不要用資料庫的遞增數字 ID，而是用一個亂數產生的 ID

![image](https://ihower.tw/rails/part2/02-recipes/images/1-uuid.png)

如果不要顯示資料庫的遞增整數 ID 的話，我們需要在 events 上新增另一個欄位來做識別。

執行 `rails g migration add_friendly_id_to_events`

編輯 `201704XXXXXXXX_add_friendly_id_to_events.rb`

```
  class AddFriendlyIdToEvents < ActiveRecord::Migration[5.0]

    def change
+     add_column :events, :friendly_id, :string
+     add_index :events, :friendly_id, :unique => true

+     Event.find_each do |e|
+       e.update( :friendly_id => SecureRandom.uuid )
+     end
    end

  end
```

記得這個欄位需要加上唯一索引。

編輯 `app/controllers/events_controller`，改成用 `friendly_id` 這個欄位來找 event：

```
   def show
-    @event = Event.find(params[:id])
+    @event = Event.find_by_friendly_id!(params[:id])
   end
```

編輯 `app/controllers/admin/events_controller`

```
   def show
-    @event = Event.find(params[:id])
+    @event = Event.find_by_friendly_id!(params[:id])
   end

   def edit
-    @event = Event.find(params[:id])
+    @event = Event.find_by_friendly_id!(params[:id])

   def update
-    @event = Event.find(params[:id])
+    @event = Event.find_by_friendly_id!(params[:id])

   def destroy
-    @event = Event.find(params[:id])
+    @event = Event.find_by_friendly_id!(params[:id])

```

編輯 app/models/event.rb，修改 to\_param 改成用 friendly\_id，並在新增的時候自動產生亂數的 friendly\_id。

```
  class Event < ApplicationRecord

    validates_presence_of :name

+   before_validation :generate_friendly_id, :on => :create

    def to_param
-     "#{self.id}-#{self.name}"
+     self.friendly_id
    end

+   protected

+   def generate_friendly_id
+     self.friendly_id ||= SecureRandom.uuid
+   end

end
```

## [](#2-4-方案三-用戶可以自定義-id)2-4 方案三: 用戶可以自定義 ID

### [](#方案三不要用資料庫的遞增數字-id並且用戶可以自定義-id)方案三：不要用資料庫的遞增數字 ID，並且用戶可以自定義 ID

![image](https://ihower.tw/rails/part2/02-recipes/images/1-edit2.png)

基於方案二，我們只要讓管理員可以編輯 friendly\_id 欄位即可：

編輯 `app/views/admin/events/_form.html.erb`

```
 <div class="form-group">
+  <%= f.label :friendly_id %>
+  <%= f.text_field :friendly_id, :required => true, :class => "form-control" %>
+  <p class="help-block">限小寫英數字及橫線，將作為網址的一部分</p>
+</div>

```

編輯 `app/controllers/admin/events_controller.rb`

```
   def event_params
-    params.require(:event).permit(:name, :description)
+    params.require(:event).permit(:name, :description, :friendly_id)
   end

```

這樣在後台就可以編輯 `friendly_id` 了。

![image](https://ihower.tw/rails/part2/02-recipes/images/1-edit.png)

由於這個欄位輸入的資料，會出現在網址上，所以最好加上一些資料驗證：

編輯 `app/models/event.rb`

```
-  validates_presence_of :name
+  validates_presence_of :name, :friendly_id
+
+  validates_uniqueness_of :friendly_id
+  validates_format_of :friendly_id, :with => /\A[a-z0-9\-]+\z/

```

這裡不但要檢查必填，還檢查了必須唯一，而且格式只限小寫英數字及橫線。

* * *
