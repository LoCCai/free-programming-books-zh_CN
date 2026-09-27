## [](#8-1-情境準備)8-1 情境準備

這一章我們示範如何在表單實作多選 UI。示範的情境是後台可以管理用戶資料，針對每個用戶可以編輯屬於哪一個分組(Group)。

首先製作後台可以編輯用戶資料：

編輯 `config/routes.rb`

```
  namespace :admin do
    root "events#index"
    resources :events
+    resources :users
  end
```

執行 `rails g controller admin::users`

編輯 `app/controllers/admin/users_controller.rb`

```
class Admin::UsersController < AdminController

  def index
    @users = User.all
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      redirect_to admin_users_path
    else
      render "edit"
    end
  end

  protected

  def user_params
    params.require(:user).permit(:email)
  end

end
```

> Rails 的 controller 預設會繼承自 ApplicationController，這裡改成繼承自 AdminController，這樣定義在 app/controllers/admin\_controller.rb 的所有方法都會被繼承下來，包括 `layout "admin"`

編輯 `app/views/admin/users/index.html.erb`

```
<h1>Admin Users</h1>

<table class="table">
<tr>
  <th>ID</th>
  <th>Email</th>
  <th>Actions</th>
</tr>
<% @users.each do |user| %>
  <tr>
    <td><%= user.id %></td>
    <td><%= user.email %></td>
    <td><%= link_to "Edit", edit_admin_user_path(user), :class => "btn btn-default" %></td>
  </tr>
<% end %>
</table>
```

![image](https://ihower.tw/rails/part2/02-recipes/images/8.png)

編輯 `app/views/admin/users/edit.html.erb`

```
<h1>Edit User</h1>

<% if @user.errors.any? %>
  <div id="error_explanation">
    <ul>
    <% @user.errors.full_messages.each do |msg| %>
      <li><%= msg %></li>
    <% end %>
    </ul>
  </div>
<% end %>

<%= form_for [:admin, @user] do |f| %>

  <div class="form-group">
    <%= f.label :email %>
    <%= f.text_field :email, :class => "form-control" %>
  </div>

  <div class="form-group">
    <%= f.submit "Update", :class => "btn btn-primary" %>
    <%= link_to "Cancel", admin_users_path %>
  </div>

<% end %>
```

編輯 `app/views/layout/admin.html.erb`

```
  <% if current_user %>
    <li class="active"><%= link_to('活動管理', admin_events_path) %></li>
+   <li><%= link_to('用戶管理', admin_users_path) %></li>
  <% end %>
```

![image](https://ihower.tw/rails/part2/02-recipes/images/8-2.png)

## [](#8-2-建立-model)8-2 建立 Model

針對每個用戶可以編輯屬於哪一個分組(Group)，因此需要建立 Group model。

執行 `rails g model group name:string`

一個 User 可以屬於很多 Group、一個 Group 可以有很多 User，這是多對多的關系，因此需要一個關聯的 Model，可以命名為 Membership

執行 `rails g model membership`

編輯 `db/migrate/20170415120527_create_memberships.rb`

```
class CreateMemberships < ActiveRecord::Migration[5.0]
  def change
    create_table :memberships do |t|
      t.integer :user_id, :index => true
      t.integer :group_id, :index => true
      t.timestamps
    end
  end
end
```

執行 `rake db:migrate`

編輯 `app/models/user.rb`

```
+  has_many :memberships
+  has_many :groups, :through => :memberships

```

編輯 `app/models/membership.rb`

```
class Membership < ApplicationRecord

  belongs_to :user
  belongs_to :group

end
```

編輯 `app/models/group.rb`

```
class Group < ApplicationRecord

  has_many :memberships
  has_many :users, :through => :memberships

end
```

建立一些假資料，進入 `rails c`

`100.times{ |i| Group.create!( :name => "No.1 #{i} Group") }`

## [](#8-3-用-checkbox-可以多選分組)8-3 用 checkbox 可以多選分組

用核選方塊是最常見的多選 UI 方式

編輯 `app/views/admin/users/edit.html.erb`

```
+  <div class="form-group">
+    <%= f.label :group_ids %>
+    <%= f.collection_check_boxes(:group_ids, Group.all, :id, :name) %>
+  </div>
```

> 如果你用 [simple\_form](https://github.com/plataformatec/simple_form) 而不是 Rails 內建的 `form_for` 來製作表單的話，寫 `<%= f.association :groups, :as => :check_boxes %>` 效果是一樣的。

編輯 `app/controllers/admin/users_controller.rb`

```
   def user_params
-    params.require(:user).permit(:email)
+    params.require(:user).permit(:email, :group_ids => [])
   end
```

![image](https://ihower.tw/rails/part2/02-recipes/images/8-3.png)

顯示的部分，可以修改 `app/views/admin/users/index.html.erb`

```
   <th>Email</th>
+  <th>Groups</th>

   # 略

     <td><%= user.email %></td>
+    <td>
+      <% user.groups.each do |g| %>
+        <%= g.name %><br>
+      <% end %>
+    </td>
```

![image](https://ihower.tw/rails/part2/02-recipes/images/8-5.png)

為了避免 N+1 Query 效能問題，可以再修改 `app/controllers/admin/users_controller.rb`

```
   def index
-    @users = User.all
+    @users = User.includes(:groups).all
   end
```

改之前，很多針對 groups 的資料庫查詢：

![image](https://ihower.tw/rails/part2/02-recipes/images/8-6.png)

改之後，只剩下一個針對 groups 的資料庫查詢：

![image](https://ihower.tw/rails/part2/02-recipes/images/8-7.png)

## [](#8-4-用-select-multiple-加上-select2-plugin)8-4 用 Select multiple 加上 Select2 Plugin

當多選的選項太多時，也可以用 Select2 來改進 UI。

> 請先完成上一章的單選 Select2 的安裝

編輯 `app/views/admin/users/edit.html.erb`

```
   <div class="form-group">
     <%= f.label :group_ids %>
-    <%= f.collection_check_boxes(:group_ids, Group.all, :id, :name) %>
+    <%= f.select :group_ids, Group.all.map{ |g| [g.name, g.id] }, {}, :multiple => true, :class => "form-control" %>
  </div>
```

同一頁最下方補上：

```
<script>
  $("#user_group_ids").select2()
</script>
```

![image](https://ihower.tw/rails/part2/02-recipes/images/8-4.png)

* * *
