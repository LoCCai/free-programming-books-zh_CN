## [](#6-1-情境準備)6-1 情境準備

這一章我們要示範如何在表單實作一個單選的 UI，單選的選項是固定的，不需要額外建立 Model 來存選項。例如活動(Event)需要一個狀態欄位，有多少種「狀態」是固定的、有限的。在後台可以編輯，前臺可以顯示。或是活動可以選擇固定種類的分類等等，都屬於這種 UI。

首先，在資料庫新增一個欄位來存這個狀態，我們會用字串代號來代表不同狀態，而不直接存給用戶看的中文：

-   draft 代表草稿活動
-   public 代表公開活動
-   private 代表私密活動

> 這個範例使用字串來代表不同狀態，有些程序員喜歡用數字。用字串的優點是一目瞭然，可讀性高。用數字的優點是資料庫佔的空間較少效能較高一些，但是缺點是光看數字是不懂意義的。

這是因為：

1.  要顯示給用戶的的中文，可能會因為需求而改變。但是資料庫的資料不會改。
2.  多國語系的支援，實際顯示給用戶的會依照用戶語系而改變
3.  程序可能會依賴這個代碼，寫程序時一律寫英文比較一致，例如 `if event.status == 'draft'`

請執行 `rails g migration add_status_to_events`

編輯 `20170414072940_add_status_to_events.rb`

```
  class AddStatusToEvents < ActiveRecord::Migration[5.0]
    def change
+     add_column :events, :status, :string, :default => "draft"
    end
  end
```

執行 `rake db:migrate`

可以編輯 `app/models/event.rb`，加上資料驗證

```
  class Event < ApplicationRecord

+   STATUS = ["draft", "public", "private"]
+   validates_inclusion_of :status, :in => STATUS
```

## [](#6-2-顯示輸出)6-2 顯示輸出

資料庫存的是代碼而已，實際顯示給用戶時，需要轉換成中文，作法有兩種：

### [](#方法一用-helper)方法一：用 Helper

編輯 `app/helpers/events_helper.rb`

```
  module EventsHelper

+   def display_event_status(event)
+     case event.status
+       when "draft"
+         "草稿"
+       else
+         ""
+     end
+   end

  end
```

編輯 `app/views/events/show.html.erb`

```
+ <h2><%= display_event_status(@event) %></h2>

```

### [](#方法二用-i18n)方法二：用 I18n

如果已經配置了多國語系，可以改用 i18n，以下我們會用這種做法。

編輯 `app/views/events/show.html.erb`

```
+ <h2><%= t(@event.status, :scope => "event.status") %></h2>

```

編輯 `config/locals/zh-CN.yml`

```
  "zh-CN":
+   event:
+     status:
+       draft: 草稿
+       public: 公開
+       private: 私密

```

> 如果只做中文版，就不編輯 en.yml 也沒關系。

## [](#6-3-使用-select-下拉選單)6-3 使用 Select 下拉選單

接著我們編輯後台的表單，加一個下拉選單來選擇狀態：

編輯 `app/views/admin/events/_form.html.erb`

```
+   <div class="form-group">
+     <%= f.label :status %>
+
+     <%= f.select :status, Event::STATUS.map{ |s| [t(s, :scope => "event.status"), s] }, {}, :class => "form-control" %>

+   </div>
```

其中第二個參數 `Event::STATUS.map{ |s| [t(s, :scope => "event.status"), s] }` 是一個二維陣列，表示下拉的選項、第三個和第四個參數都是 Hash，為了順利讓第四個參數(設置 Bootstrap 樣式需要的 class)傳進去，所以要補一個空的 Hash 在第三個參數。詳見 [Rails select 文檔](http://api.rubyonrails.org/classes/ActionView/Helpers/FormOptionsHelper.html#method-i-select)。

編輯 `app/controllers/admin/events_controller.rb`

```
   def event_params
-    params.require(:event).permit(:name, :description, :friendly_id)
+    params.require(:event).permit(:name, :description, :friendly_id, :status)
   end
```

這樣就可以選擇狀態了：

![image](https://ihower.tw/rails/part2/02-recipes/images/6-3.png)

## [](#6-4-改用-radio-button-ui)6-4 改用 Radio Button UI

如果選項是 3 個以下，可以考慮改用 Radio Button，對用戶會更方便(鼠標只要點一次就可以選擇)：

再次編輯 `app/views/admin/events/_form.html.erb`，把 `f.select :status` 改成：

```
  <% Event::STATUS.each do |status| %>
    <label>
      <%= f.radio_button :status, status %>
      <%= t(status, :scope => "event.status") %>
    </label>
  <% end %>
```

> 用 label 標籤包起來的話，點選文字才會有選 radio 的效果

![image](https://ihower.tw/rails/part2/02-recipes/images/6-1.png)

## [](#6-5-使用-radio-button-加上-bootstrap-button-樣式)6-5 使用 Radio Button 加上 Bootstrap Button 樣式

Radio Button UI 也可以考慮搭配 Bootstrap 按鈕樣式，請修改成：

```
  <div class="btn-group" data-toggle="buttons">
    <% Event::STATUS.each do |status| %>
      <label class="btn btn-default <%= (status == f.object.status)? 'active' : '' %>">
        <%= f.radio_button :status, status %>
        <%= t(status, :scope => "event.status") %>
      </label>
    <% end %>
  </div>
```

![image](https://ihower.tw/rails/part2/02-recipes/images/6-2.png)

這樣就很漂亮了。

* * *
