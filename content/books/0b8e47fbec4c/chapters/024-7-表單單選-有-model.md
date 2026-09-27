## [](#7-1-情境和-model-準備)7-1 情境和 Model 準備

這一章我們同樣示範如何在表單實作一個單選的 UI，例如活動(Event)需要一個分類，但是跟上一章是固定有限的選項不同，我們希望分類是可以持續編輯的，因此需要再新增一個 Category Model，然後讓 Category has\_many Event 來建立數據關系。

執行 `rails g model category name:string`

編輯 `db/migrate/20170414082617_create_categories.rb`

```
  class CreateCategories < ActiveRecord::Migration[5.0]
    def change
      create_table :categories do |t|
        t.string :name

        t.timestamps
      end

+     add_column :events, :category_id, :integer
+     add_index :events, :category_id
    end
  end
```

執行 `rake db:migrate`

編輯 `app/models/category.rb` 加上關聯：

```
  class Category < ApplicationRecord
+   has_many :events
  end
```

編輯 `app/models/event.rb` 加上關聯：

```
  class Event < ApplicationRecord

+   belongs_to :category, :optional => true

```

針對 Category model 的 CRUD 接口這裡就省略了，你可以透過 `rails g controller admin::categories` 蓋一個後台去編輯。

請直接進 `rails console` 手動加一些分類：

```
10.times{ |i| Category.create!( :name => "#{i} Category" ) }
```

## [](#7-2-使用-select-下拉選單)7-2 使用 Select 下拉選單

接著來編輯後台表單，在編輯活動時，可以選擇分類。

編輯 `app/views/admin/events/_form.html.erb`

```
+  <div class="form-group">
+    <%= f.label :category_id %>
+    <%= f.select :category_id, Category.all.map{ |c| [c.name, c.id] }, {}, :class => "form-control" %>
+  </div>

```

> 如果你用 [simple\_form](https://github.com/plataformatec/simple_form) 而不是 Rails 內建的 `form_for` 來製作表單的話，是寫 `<%= f.association :category %>` 效果是一樣的。

編輯 `app/controllers/admin/events_controller.rb`

```
   def event_params
-    params.require(:event).permit(:name, :description, :friendly_id, :status)
+    params.require(:event).permit(:name, :description, :friendly_id, :status, :category_id)
   end
```

成果：

![image](https://ihower.tw/rails/part2/02-recipes/images/7.png)

## [](#7-3-顯示分類並避免-nil-錯誤)7-3 顯示分類並避免 nil 錯誤

在前臺的活動頁面，需要顯示該活動的分類。

編輯 `app/views/events/show.html.erb`

```
+ <h2><%= @event.category.name %></h2>

```

![image](https://ihower.tw/rails/part2/02-recipes/images/7-2.png)

活動的 `category_id` 是後來才增加的欄位，因此有些活動是沒有 `category_id` 資料的。這時如果我們去點其他還沒有選分類的活動，會發現出現以下的錯誤：

![image](https://ihower.tw/rails/part2/02-recipes/images/7-3.png)

這是因為 `@event.category` 是 `nil`，再調用 `nil.name` 就會出現 `NoMethodError` 了。

針對這種情況，Rails 提供了一個 `try` 方法，參數就是要調用的方法名稱。透過 `try` 不管是不是 `nil`，都不會報錯：

```
- <h2><%= @event.category.name %></h2>
+ <h2><%= @event.category.try(:name) %></h2>

```

這樣就算沒有選 Cateogry 也不會報錯了：

![image](https://ihower.tw/rails/part2/02-recipes/images/7-4.png)

## [](#7-4-使用-jquery-select2-plugin)7-4 使用 jQuery Select2 Plugin

當選項非常多時，單純的下拉選單，可能就不好選了。例如，請進 `rails console` 手動再多加一些分類：

```
100.times{ |i| Category.create!( :name => "#{i+100} Category" ) }
```

![image](https://ihower.tw/rails/part2/02-recipes/images/7-5.png)

這種情況，可以安裝 jQuery Plugin: [Select2](https://select2.github.io/) 是一個非常好用的單選、多選選單，非常適合選項非常多的情境。

這個 jQuery Plugin 有包好的 gem: [select2-rails](https://github.com/argerim/select2-rails)，請編輯 Gemfile，加上

```
gem "select2-rails"

```

執行 `bundle`，重啟伺服器。

編輯 `app/assets/javascripts/application.js`

```
   //= require jquery
   //= require jquery_ujs
   //= require turbolinks
   //= require bootstrap-sprockets
+  //= require select2

```

編輯 `app/asssets/stylesheets/application.scss`

```
   @import "bootstrap-sprockets";
   @import "bootstrap";
+  @import "select2";
+  @import "select2-bootstrap";

```

> 這個 Select2 有提供配合 Bootstrap 的樣式

編輯 `app/views/admin/events/_form.html.erb`，在最下方加入：

```
<script>
  $("#event_category_id").select2( { theme: "bootstrap"} );
</script>
```

其中 `event_category_id` 是這個 select 下拉選單的 HTML ID。

以下是最後的成果，你可以打一些關鍵字 Select2 就會幫你做過濾來減少選項。

![image](https://ihower.tw/rails/part2/02-recipes/images/7-6.png)

* * *
