> The most depressing thing about life as a programmer, I think, is if you’re faced with a chunk of code that either someone else wrote or, worse still, you wrote yourself but you no longer dare to modify. That’s depressing. - Peyton Jones

> 請注意本章內容銜接前三章，請先完成前三章內容。

我們在上一章學習了資料庫關連，那麼要如何搭配 RESTful 路由設計 controller 及表單呢？我們在這裡將綜合前幾章所學，來實作各種形式的 Resource 應用。

## [](#一對多-resources)一對多 Resources

### [](#範例一-設計一個-event-has_many-attendees)範例一: 設計一個 event has\_many :attendees

延續上一章一對多關聯建立好的`Attendee`，我們希望實作瀏覽個別 event 有哪些 attendees, 並可以 CRUD。請修改 config/routes.rb 為

```
resources :events do
  resources :attendees, :controller => 'event_attendees'
end
```

執行以下指令產生 controller 檔案

```
rails g controller event_attendees
```

編輯 app/controllers/event\_attendees\_controller.rb，插入如下內容:

```
before_action :find_event

def index
  @attendees = @event.attendees
end

def show
  @attendee = @event.attendees.find( params[:id] )
end

def new
  @attendee = @event.attendees.build
end

def create
  @attendee = @event.attendees.build( attendee_params )
  if @attendee.save
    redirect_to event_attendees_url( @event )
  else
    render :action => :new
  end
end

def edit
  @attendee = @event.attendees.find( params[:id] )
end

def update
  @attendee = @event.attendees.find( params[:id] )

  if @attendee.update( attendee_params )
    redirect_to event_attendees_url( @event )
  else
    render :action => :edit
  end

end

def destroy
  @attendee = @event.attendees.find( params[:id] )
  @attendee.destroy

  redirect_to event_attendees_url( @event )
end

protected

def find_event
  @event = Event.find( params[:event_id] )
end

def attendee_params
	params.require(:attendee).permit(:name)
end
```

編輯 app/views/events/index.html.erb，在迴圈中加入

```
<%= link_to 'attendees', event_attendees_path(event) %>
```

編輯 app/views/event\_attendees/index.html.erb

```
<ul>
<% @attendees.each do |attendee| %>
	<li>
	  <%= attendee.name %>
	  <%= link_to 'show', event_attendee_path(@event, attendee) %>
	  <%= link_to 'edit', edit_event_attendee_path(@event, attendee) %>
	  <%= link_to 'destroy', event_attendee_path(@event, attendee),
	                            :method => :delete %>
	</li>
<% end %>

</ul>

	  <%= link_to 'new attendee', new_event_attendee_path(@event) %>
```

編輯 app/views/event\_attendees/show.html.erb

```
<p><%= @attendee.name %> </p>
```

編輯 app/views/event\_attendees/new.html.erb

```
<%= form_for @attendee, :url => event_attendees_path(@event) do |f| %>
   <%= f.text_field :name %>
   <%= f.submit %>
<% end %>
```

編輯 app/views/event\_attendees/edit.html.erb

```
<%= form_for @attendee, :url => event_attendee_path(@event, @attendee), :html => { :method => :patch } do |f| %>
   <%= f.text_field :name %>
   <%= f.submit %>
<% end %>
```

### [](#範例二-讓-event-可以用-select-單選一個-category)範例二: 讓 event 可以用 select 單選一個 category

另一種常見的_1對多_用法，則是用下拉選單。延續上一章建好的_Category model_，讓我們編輯 app/models/event.rb 加上關連:

```
class Event < ApplicationRecord
    belongs_to :category
end
```

編輯 app/models/category.rb 加上關連

```
class Category < ApplicationRecord
    has_many :events
end
```

首先，我們需要先建立一些 Category 的資料，進入 rails console 輸入：

```
Category.create( :name => "Course" )
Category.create( :name => "Meeting" )
Category.create( :name => "Conference" )
```

接著編輯 app/views/events/\_form.html.erb 這個樣板，讓我們來加上一個下拉選單。在表單中加入：

```
<%= f.collection_select(:category_id, Category.all, :id, :name) %>
```

或是用以下的寫法，效果是一樣的：

```
<%= f.select :category_id, Category.all.map{ |c| [c.name, c.id] } %>
```

然後修改`EventsController`的`event_params`好可以接收到`category_id`參數。這樣資料就會存進資料庫了。

```
def event_params
	params.require(:event).permit(:name, :description, :category_id)
end
```

如此就會出現下拉選單了。讓我們來修改 app/views/events/show.html.erb 可以顯示出 category 的名字：

```
<p>Category: <%= @event.category.name %></p>
```

> 不過 @event.category 可能是 nil，這會導致 nil.name 發生錯誤。一個簡單的方式是改使用 @event.category.try(:name)，另一招則是在 Event model 加入以下程式，就會有 @event.category\_name 可以使用，而且允許 @event.category 是 nil

```
delegate :name, :to => :category, :prefix => true, :allow_nil => true
```

如此便完成了。

## [](#一對一-resource)一對一 Resource

### [](#案例一建立location表單)案例一：建立_Location_表單

延續上一章新增的一對一的關係_Location Model_，也就是一個_Location_屬於一個_Event_。我們來建立一個表單介面可以編輯_Location_：

執行以下指令產生 controller 檔案

```
rails g controller event_locations
```

編輯`config/routes.rb`加上一個`Singular Resource`，因為一個_Event_只有一個_Location_，所以我們使用了單數_Resource_：

```
resources :events do
    resource :location, :controller => 'event_locations'
end
```

注意到我們的_Controller_檔名還是複數，使用_RESTful_路由的_Controller_，無論在`config/routes.rb`中使用單數_resource_或複數_resources_形式，檔名一律都是複數。

編輯`app/controllers/event_locations_controller.rb`:

```
class EventLocationsController < ApplicationController
  before_action :find_event

  def show
    @location = @event.location
  end

  def new
    @location = @event.build_location
  end

  def create
    @location = @event.build_location( location_params )
    if @location.save
      redirect_to event_location_url( @event )
    else
      render :action => :new
    end
  end

  def edit
    @location = @event.location
  end

  def update
    @location = @event.location

    if @location.update( location_params )
      redirect_to event_location_url( @event )
    else
      render :action => :edit
    end

  end

  def destroy
    @location = @event.location
    @location.destroy

    redirect_to event_location_url( @event )
  end

  protected

  def find_event
    @event = Event.find( params[:event_id] )
  end

  def location_params
    params.require(:location).permit(:name)
  end
end
```

因為是單數_resource_的關係，所以就沒有_index_這個_Action_了，也沒有`event_locations_path`和`event_location_path(event, location)`這種路由方法。

編輯_app/views/events/index.html.erb_，在迴圈中加入

```
<%= link_to 'location', event_location_path(event) %>
```

編輯_app/views/event\_locations/show.html.erb_

```
<h1><%= @event.name %></h1>

<% if @event.location %>
  <p><%= @event.location.name %></p>
  <p><%= link_to "edit", edit_event_location_path(@event) %></p>
  <p><%= link_to "destroy", event_location_path(@event), :method => :delete %></p>
<% else %>
  <p>N/A</p>
  <p><%= link_to "Add location", new_event_location_path(@event) %></p>
<% end %>
```

編輯_app/views/event\_locations/new.html.erb_

```
<%= form_for @location, :url => event_location_path(@event) do |f| %>
  <%= f.text_field :name %>
  <%= f.submit %>
<% end %>
```

編輯_app/views/event\_locations/edit.html.erb_

```
<%= form_for @location, :url => event_location_path(@event), :method => :patch do |f| %>
  <%= f.text_field :name %>
  <%= f.submit %>
<% end %>
```

### [](#案例二用-nested-model-順帶編輯跟新增)案例二：用 Nested Model 順帶編輯跟新增

由於_Location_和_Event_是一對一關係，可以說_Location_是_Event_的附屬資料。因此我們也可以將_Location_的表單直接做在_Event_的表單裡，這樣_Location_甚至不需要自己的_Controller_了：

編輯_app/models/event.rb_加上：

```
accepts_nested_attributes_for :location, :allow_destroy => true, :reject_if => :all_blank
```

`accepts_nested_attributes_for`這個方法可以讓更新_event_資料時，也可以直接更新_location_的關聯資料。也就是說，我們可以完全不需要修改_events\_controller_的新增和編輯_Action_，就可以透過本來的`params[:event]`參數來新增或修改_location_了。這裡有兩個特別的參數，`:allow_destroy`是說我們可以在表單中多放一個`_destroy`核選塊來表示刪除，而`:reject_if`表示說在什麼條件下，就當做沒有要真的動作，例如`:all_blank`就表示如果資料都是空的，就不建立_location_資料(當然也就不會檢查_location_的驗證了)。這是因為雖然要顯示_location_表單，但是不表示使用者一定要輸入。有輸入就表示必須通過_Location Model_的資料驗證。

編輯_app/views/events/\_form.html.erb_加上_Location_的表單，這裡使用了`fields_for`來達成嵌套表單：

```
<%= f.fields_for :location do |location_form| %>
<p>
<%= location_form.label :name, "Location Name" %>
<%= location_form.text_field :name %>

<% unless location_form.object.new_record? %>
    <%= location_form.label :_destroy, 'Remove:' %>
    <%= location_form.check_box :_destroy %>
<% end %>
</p>
<% end %>
```

編輯_app/helpers/events\_helper.rb_新增一個_Helper_：

```
def setup_event(event)
    event.build_location unless event.location
    event
end
```

我們會用`setup_event(@event)`來置換`form_for`中的`@event`，這是因為如果`@event.location`是`nil`的話，_Location_表單就完全不會顯示，所以假如沒有，就需要預先`build_location`给它。

編輯_app/views/events/new.html.erb_：

```
<%= form_for setup_event(@event), :url => events_path do |f| %>
```

編輯_app/views/events/edit.html.erb_：

```
<%= form_for setup_event(@event), :url => event_path(@event), :method => :put do |f| %>
```

最後記得修改`EventsController`的`event_params`好可以接收到`location`參數

```
def event_params
	params.require(:event).permit(:name, :description, :category_id, :location_attributes => [:id, :name, :_destroy] )
end
```

## [](#多對多-resources)多對多 Resources

上一章中，我們也新增了_EventGroupShip_這個_Model_作為_Event_和_Group_之間的_Joining table_，那麼要怎麼設計表單呢？

### [](#案例-在-event-newedit-中-可以使用-checkbox-多選-group)案例： 在 event new/edit 中, 可以使用 checkbox 多選 group

最常見的方式就是提供_check\_box_核選方塊讓使用者可以勾選了，此例中我們打算在_event_的表單中放入_group_清單來做勾選。

編輯_app/views/events/\_form.html.erb_

```
 <%= f.collection_check_boxes(:group_ids, Group.all, :id, :name) %>
```

或是用以下的寫法，效果是一樣的：

```
<% @groups.each do |g| %>
  <%= check_box_tag "event[group_ids][]", g.id, @event.groups.map(&:id).include?(g.id) %> <%= g.name %>
<% end %>
<%= hidden_field_tag 'event[group_ids][]','' %>
```

這是因為_event_有`has_many :groups`的關係，所以可以透過屬性`group_ids`直接設定關連。另外，會多一個隱藏的空字串`event[group_ids][]`是因為當_check box_都沒有核選時，瀏覽器不會送出這個屬性，我們就無法判斷是反核選還是沒有選，所以加上一個空值的隱藏欄位讓_Rails_可以移除所有關連。

最後記得修改`EventsController`的`event_params`好可以接收到`group_ids`參數：

```
def event_params
	params.require(:event).permit(:name, :description, :category_id, :location_attributes => [:id, :name, :_destroy], :group_ids => [] )
end
```

接著修改_show.html.erb_顯示出_Group_名稱：

```
<p>Group:
	<% @event.groups.each do |g| %>
		<%= g.name %>
	<% end %>
</p>
```

## [](#客製-resources-collection)客製 Resources (collection)

### [](#案例一-新增不同的頁面)案例一: 新增不同的頁面

我們想要 events 除了 index 頁面之外，再新加其他不一樣的頁面，例如統計資訊、最新推薦、最新活動等等。這時候我們可以新增額外的路由、新的_action_方法和_template_樣板：

首先修改 routes.rb 在 events 的 resources 區塊中加入 collection 區塊，collection 表示這一個路由是針對 events 集合來操作：

```
resources :events do
    collection do
        get :latest
    end
end
```

> 注意到在此 routes.rb 上請不要多一行 resources :events，這樣根據優先權會優先判斷成 events show action。

接著在_events\_controller.rb_新增一個同名的_latest action_:

```
def latest
  @events = Event.order("id DESC").limit(3)
end
```

以及它的樣板檔案_/app/views/events/latest.html.erb_。

### [](#案例二一次刪除多筆資料)案例二：一次刪除多筆資料

_RESTful_中的_destroy action_是用來刪除一筆資料的，如果我們想同時操作多筆資料，就會新增額外的路由和_action_才處理。例如我們新增這樣的路由一次刪除所有資料：

```
resources :events do
  collection do
    post :bulk_delete
  end
end
```

在樣板中加入一個按鈕可以執行這個操作：

```
<%= button_to "Delete All", bulk_delete_events_path, :method => :post %>
```

在_events\_controller.rb_新增_bulk\_delete_方法：

```
def bulk_delete
  Event.destroy_all
  redirect_to events_path
end
```

不過，更常見的作法是用核選方塊勾選要操作哪些資料。讓我們改一下路由加上_bulk\_update_:

```
resources :events do
  collection do
  	    post :bulk_update
  end
end
```

接著修改_app/views/events/index.html.erb_幫每個_event_加上核選方塊，並用表單整個包起來：

```
<%= form_tag bulk_update_events_path do %>

<ul>
  <% @events.each do |e| %>
    <li>
 	      <%= check_box_tag "ids[]", e.id, false %>
      <%= e.name %>
    </li>
  <% end %>
</ul>

<%= submit_tag "Delete" %>
<%= submit_tag "Publish" %>

<% end %>
```

新增一個_bulk\_update_方法：

```
def bulk_update
  ids = Array(params[:ids])
  events = ids.map{ |i| Event.find_by_id(i) }.compact

  if params[:commit] == "Publish"
    events.each{ |e| e.update( :status => "published" ) }
  elsif params[:commit] == "Delete"
    events.each{ |e| e.destroy }
  end

  redirect_to events_url
end
```

## [](#客製-resources-member)客製 Resources (member)

### [](#案例一新增-event-dashboard-頁面)案例一：新增 event dashboard 頁面

我們想要 event 除了 show 頁面之外，還有其他的頁面，例如每個活動專屬的 dashboard。首先修改 routes.rb 在 events 的 resources 區塊中加入 member 區塊，member 表示這一個路由是針對特定一個 event 來操作(必須傳入某一個 event)：

```
resources :events do
    member do
        get :dashboard
    end
end
```

這樣在_events\_controller.rb_之中就可以多一個_action_叫做`dashboard`：

```
def dashboard
    @event = Event.find(params[:id])
end
```

這個樣板檔案是_app/views/events/dashboard.html.erb_，我們可以在這一頁提供不同於_index_的內容。

連結的 helper 是 dashboard\_event\_path(event)，例如我們可以在 app/views/events/index.html.erb 的迴圈中加入：

```
<%= link_to 'Dashboard', dashboard_event_path(event) %>
```

回過頭來看這種客製_member_路由，也可以說是一種_sub-resource_的簡化，等同於：

```
resoruces :events do
    resource :dashboard
end
```

然後這個_dashboard controller_只有一個_Action_叫做_show_。

### [](#案例二直接操作-event-資料)案例二：直接操作 event 資料

雖然透過_event update_動作我們可以修改_event_的所有資料，但是有些操作如果有單獨的_action_會比較簡單直覺。例如使用者可以點選參加這個活動以及離開這個活動，這時候就可以自訂_member_路由：

```
resources :events do
  member do
    post :join
    post :withdraw
  end
end
```

接著在_event.html.erb_中加上兩個按鈕：

```
<%= button_to "Join", join_event_path(@event) %>
<%= button_to "Withdraw", withdraw_event_path(@event) %>
```

以及_events\_controller.rb_新增兩個_actions_，假設我們有一個_User model_(可以透過使用者認證一章的_Devise_產生，這樣登入後就會有`current_user`變數代表登入後的_user_)、以及一個_event_和_user_的多對多關係_Membership model_：

```
def join
  @event = Event.find(params[:id])
  Membership.find_or_create_by( :event => @event, :user => current_user )

  redirect_back(fallback_location: root_path)
end

def withdraw
  @event = Event.find(params[:id])
  @membership = Membership.find_by( :event => @event, :user => current_user )
  @membership.destroy

  redirect_back(fallback_location: root_path)
end
```

另一個路由設計的思路是獨立出_resources_，例如：

```
resources :events do
  resources :memberships
end
```

這樣樣板中的路由_Helper_會變成：

```
<%= button_to "Join", event_memberships_path(@event) %>

<% membership = Membership.find_by( :event => @event, :user => current_user ) %>
<%= button_to "Withdraw", event_membership_path(@event, membership) %>
```

獨立出來的_memberships\_controller.rb_內容則是：

```
def create
  @event = Event.find(params[:event_id])
  Membership.find_or_create_by( :event => @event, :user => current_user )

  redirect_back(fallback_location: root_path)
end

def destroy
  @event = Event.find(params[:event_id])
  @membership = @event.memberships.find( params[:id] )
  @membership.destroy

  redirect_back(fallback_location: root_path)
end
```

你喜歡哪一種設計呢?

## [](#不總是需要新的路由)不總是需要新的路由

在上述_member_和_collection_的案例中，我們增加了新的_action_方法和_template_樣板來處理。但如果只是資料不同、樣板相同，我們也可以繼續沿用本來的_action_方法和_template_樣板即可。以下示範兩種案例：

### [](#案例一讓-event-index-可以進行關鍵字搜尋)案例一：讓 event index 可以進行關鍵字搜尋

可以根據搜尋結果來顯示所有 events。首先在`app/views/events/index.html.erb`上方加入一個關鍵字搜尋的表單：

```
<%= form_tag events_path, :method => :get do %>
  <%= text_field_tag "keyword" %>
  <%= submit_tag "Search" %>
<% end %>
```

接著修改_index action_:

```
def index
  if params[:keyword]
    @events = Event.where( [ "name like ?", "%#{params[:keyword]}%" ] )
  else
    @events = Event.all
  end

  @events = @events.page(params[:page]).per(5)
end
```

_ActiveRecord_的查詢是可以串接的，並且直到最後真的要用時才會去查詢資料庫。這裡我們先檢查是否有`params[:keyword]`參數來進行過濾，最後統一進行分頁。

> SQL 的 like 查詢會比對資料表的所有資料，如果資料量很大效能影響很大，請改用全文搜尋引擎。

### [](#案例二讓-event-index-可以依照參數排序)案例二：讓 event index 可以依照參數排序

一樣修改 index action：

```
def index
  sort_by = (params[:order] == 'name') ? 'name' : 'created_at'
  @events = Event.order(sort_by).page(params[:page]).per(5)
end
```

> 注意到我們必須先檢查 params\[:order\] 的內容，而不應該直接 order(params\[:order\])。這會導致有 SQL Injection 安全問題。

在 index.html.erb 中加入排序的超連結：

```
<%= link_to 'Sort by Name', events_path( :order => "name") %>
<%= link_to 'Sort by Default', events_path %>
```

> 同一個_index action_可能會需要同時兼顧搜尋、排序、分頁的功能，這會需要修改_index action_根據參數來串接這些查詢，並且_template_樣板中的超連結也必須包含目前的狀態，例如目前是第二頁、遞降排序等等。

## [](#namespace-resources)Namespace Resources

### [](#案例新增-event-的管理後台)案例：新增 event 的管理後台

原有的 events\_controller 會作為前台一般使用者之用。為了後台管理用途，我們會另外再新增一個 controller 來操作 Event 這個 model

```
rails g controller admin::events
```

這樣會產生新的 controller 和 view，放在 admin 目錄下。而通常我們會讓 admin 管理後台的 layout 不同，以及加上使用者權限驗證，例如以下使用最簡單的_HTTP_驗證：

```
class Admin::EventsController < ApplicationController

    before_action :authenticate
    layout "admin"

    # ....

    protected

    def authenticate
       authenticate_or_request_with_http_basic do |user_name, password|
           user_name == "username" && password == "password"
       end
    end

end
```

那路由要怎麼搭配呢？編輯 routes.rb

```
namespace :admin do
  resources :events
end
```

這樣它的路由 Helper 就會是 admin\_events\_path 或 admin\_event\_path(event) 等

* * *
