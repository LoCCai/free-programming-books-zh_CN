> 此章步驟不相容 Rails 6 以上版本

> Much of the essence of building a program is in fact the debugging of the specification. - Fred Brooks, The Mythical Man-Month 作者

> 請注意本章內容銜接後一章，請與後一章一起完成。

初入門像_Rails_這樣的功能豐富的開發框架，難處就像雞生蛋、蛋生雞的問題：要了解運作的原理，你必須了解其中的元件，但是如果個別學習其中的元件，又將耗費許多的時間而見樹不見林。因此，為了能夠讓各位讀者能夠儘快建構出一個基本的應用程式，有個大局觀。我們將從一個_CRUD_程式開始。所謂的_CRUD_即為_Create_、_Read_、_Update_、_Delete_等四項基本資料庫操作，本章將示範如何做出這個基本的應用程式，以及幾項_Rails_常用功能。細節的原理說明則待_Part 2_後續章節。

## [](#rails的mvc元件)_Rails_的_MVC_元件

我們在第一章_Ruby on Rails_簡介有介紹了什麼是_MVC_架構，而在_Rails_中分成幾個不同元件來對應：

-   _ActiveRecord_是_Rails_的_Model_元件
-   _ActionPack_包含了_ActionDispatch_、_ActionController_和_ActionView_，分別是_Rails_的_Routing_、_Controller_和_View_元件

![image](https://ihower.tw/rails/images/basic-mvc-diagram.png)

這張圖示中的執行步驟是：

1.  瀏覽器發出_HTTP request_請求給_Rails_
2.  路由(Routing)根據規則決定派往哪一個_Controller_的_Action_
3.  負責處理的_Controller Action_操作_Model_資料
4.  _Model_存取資料庫或資料處理
5.  _Controller Action_將得到的資料餵給_View_樣板
6.  回傳最後的_HTML_成品給瀏覽器

其中，路由主要是根據_HTTP Method_方法(_GET_、_POST_或是_PATCH_、_DELETE_等)以及網址來決定派往到哪一個_Controller_的_Action_。例如，我們在「Rails起步走」一章中的`get "welcome/say_hello" => "welcome#say"`意思就是，將_GET welcome/say\_hello_的這個_HTTP request_請求，派往到_welcome controller_的_say action_。

## [](#認識activerecord操作資料庫)認識_ActiveRecord_操作資料庫

_ActiveRecord_是_Rails_的_ORM(Object-relational mapping)_元件，負責與資料庫溝通，讓你可以使用物件導向語法來操作關聯式資料庫，它的對應概念如下：

-   將資料庫表格_(table)_對應到一個類別_(class)_
-   類別方法就是操作這個表格_(table)_，例如新增資料、多筆資料更新或多筆資料刪除
-   資料表中的一筆資料_(row)_對應到一個物件_(object)_
-   物件方法就是操作這筆資料，例如更新或刪除這筆資料
-   資料表的欄位_(column)_就是物件的屬性_(object attribute)_

所以說資料庫裡面的資料表，我們用一個_Model_類別表示。而其中的一筆資料，就是一個_Model_物件。

> 不了解關聯式資料庫的讀者，推薦閱讀[MySQL 超新手入門](http://www.codedata.com.tw/database/mysql-tutorial-getting-started)從第0章至第5章CRUD與資料維護。

> ActiveRecord 這個名稱的由來是它使用了 Martin Fowler 的_[Active Record](http://martinfowler.com/eaaCatalog/activeRecord.html)_設計模式。

第三章「_Rails_起步走」我們提到了_Scaffold_鷹架功能，有經驗的_Rails_程式設計師雖然不用鷹架產生程式碼，不過還是會使用_Rails_的_generator_功能來分別產生_Model_和_Controller_檔案。這裡讓我們來產生一個_Model_：

```
$ rails g model event name:string description:text is_public:boolean capacity:integer
```

> 這些指令必須要在_Rails_專案目錄下執行，承第三章也就是_demo_目錄下。

接著執行以下指令就會建立資料表(如果是使用_SQLite3_資料庫話，會產生_db/development.sqlite3_這個檔案)：

```
$ bin/rake db:migrate
```

接著，讓我們使用`rails console`(可以簡寫為`rails c`) 進入主控台模式做練習：

```
# 新增
> event = Event.new
> event.name = "Ruby course"
> event.description = "fooobarrr"
> event.capacity = 20
> event.save # 儲存進資料庫，讀者可以觀察另一個指令視窗
> event.id # 輸出主鍵 1，在 Rails 中的主鍵皆為自動遞增的整數 ID

> event = Event.new( :name => "another ruby course", :capacity => 30)
> event.save
> event.id # 輸出主鍵 2，這是第二筆資料

# 查詢
> event = Event.where( :capacity => 20 ).first
> events = Event.where( ["capacity >= ?", 20 ] ).limit(3).order("id desc")

# 更新
> e = Event.find(1) # 找到主鍵為 1 的資料
> e.name # 輸出 Ruby course
> e.update( :name => 'abc', :is_public => false )

# 刪除
> e.destroy
```

和_irb_一樣，要離開_rails console_請輸入`exit`。如果輸入的程式亂掉沒作用時，直接`Ctrl+Z`離開也沒關係。

> 對資料庫好奇的朋友，可以安裝_[DB Browser for SQlite](http://sqlitebrowser.org/)_這套工具，實際打開_db/development.sqlite3_這個檔案觀察看看。

## [](#認識migration建立資料表)認識_Migration_建立資料表

_Rails_使用了_Migration_資料庫遷移機制來定義資料庫結構_(Schema)_，檔案位於_db/migrate/_目錄下。它的目的在於:

-   讓資料庫的修改也可以納入版本控制系統，所有的變更都透過撰寫_Migration_檔案執行
-   方便應用程式更新升級，例如讓軟體從第三版更新到第五版，資料庫更新只需要執行`rake db:migrate`
-   跨資料庫通用，不需修改程式就可以用在_SQLite3_、_MySQL_、_Postgres_等不同資料庫

在上一節產生_Model_程式時，_Rails_就會自動幫你產生對應的_Migration_檔案，也就是如_db/migrate/20110519123430\_create\_events.rb_的檔案。_Rails_會用時間戳章來命名檔案，所以每次產生檔名都不同，這樣可以避免多人開發時的衝突。其內容如下：

```
# db/migrate/20110519123430_create_events.rb
class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :name
      t.text :description
      t.boolean :is_public
      t.integer :capacity

      t.timestamps
    end
  end
end
```

其中的_create\_table_區塊就是定義資料表結構的程式。上一節中我們已經執行過`bin/rake db:migrate`來建立此資料表。其中 `timestamps` 實際上會建立兩個時間(datetime)欄位：資料建立時間 `created_at` 和最後更新時間 `updated_at`，並且 Rails 會在資料存進資料庫時，自動設定這兩個欄位的值。

_Migration_檔案不需要和_Model_一一對應，像我們來新增一個_Migration_檔案來新增一個資料庫欄位，請執行:

```
$ rails g migration add_status_to_events
```

如此就會產生一個空的 migration 檔案在 db/migrate 目錄下。Migration 有提供 API 讓我們可以變更資料庫結構。例如，我們可以新增一個欄位。輸入`rails g migration add_status_to_events`然後編輯這個_Migration_檔案：

```
# db/migrate/20110519123819_add_status_to_events.rb
class AddStatusToEvents < ActiveRecord::Migration[5.1]
  def change
    add_column :events, :status, :string
  end
end
```

接著執行`bin/rake db:migrate`就會在_events_表格中新增一個_status_的欄位，欄位型別是_string_。_Rails_會記錄你已經對資料庫操作過哪些_Migrations_，像此例中就只會跑這個_Migration_而已，就算你多執行幾次`bin/rake db:migrate`也只會對資料庫操作一次。

> _Rails_透過資料庫中的_schema\_migrations_這張_table_來記錄已經跑過哪些_Migrations_。

## [](#認識activerecord資料驗證validation)認識_ActiveRecord_資料驗證_(Validation)_

_ActiveRecord_的資料驗證_(Validation)_功能，可以幫助我們檢查資料的正確性。如果驗證失敗，就會無法存進資料庫。

編輯_app/models/event.rb_加入

```
class Event < ApplicationRecord
    validates_presence_of :name
end
```

其中的_validates\_presence\_of_宣告了_name_這個屬性是必填。我們按_Ctrl+Z_離開主控台重新進入，或是輸入 _reload!_，這樣才會重新載入。

```
> e = Event.new
> e.save # 回傳 false
> e.errors.full_messages # 列出驗證失敗的原因
> e.name = 'ihower'
> e.save
> e.errors.full_messages # 儲存成功，變回空陣列 []
```

呼叫_save_時，_ActiveRecord_就會驗證資料的正確性。而這裡因為沒有填入_name_，所以回傳_false_表示儲存失敗。

## [](#實做基本的crud應用程式)實做基本的_CRUD_應用程式

有了_Event model_，接下來讓我們實作出完整的_CRUD_使用者介面流程吧，這包含了列表頁面、新增頁面、編輯頁面以及個別資料頁面。

### [](#外卡路由)外卡路由

我們在「_Rails_起步走」一章分別為_welcome/say\_hello_和_welcome_設定路由，也就如何將網址對應到_Controller_和_Action_。但是如果每個路徑都需要一條條設定會太麻煩了。這一章我們使用一種外卡路由的設定，編輯_config/routes.rb_在最後插入一行：

```
  # ....
  match ':controller(/:action(/:id(.:format)))', :via => :all
end
```

外卡路由很容易理解，它會將_/foo/bar_這樣的網址自動對應到_Controller foo_的_bar Action_、如果是_/foo_這樣的網址，則預設對應到_index action_。我們再下一章中我們會再改用另一種稱作_RESTful_路由方式。

### [](#列出所有資料)列出所有資料

執行_rails g controller events_，首先編輯_app/controllers/events\_controller.rb_加入

```
def index
  @events = Event.all
end
```

`Event.all`會抓出所有的資料，回傳一個陣列給實例變數_(instance variables)_指派給`@events`。在_Rails_會讓_Action_裡的實例變數(也就是有`@`開頭的變數)通通傳到_View_樣板裡面可以使用。這個_Action_預設使用的樣板是_app/views/events/_目錄下與_Action_同名的檔案，也就是接下來要編輯的_app/views/events/index.html.erb_，內容如下:

```
<ul>
<% @events.each do |event| %>
  <li>
 	  <%= event.name %>
  <%= link_to 'Show', :controller => 'events', :action => 'show', :id => event %>
  <%= link_to 'Edit', :controller => 'events', :action => 'edit', :id => event %>
  <%= link_to 'Delete', :controller => 'events', :action => 'destroy', :id => event %>
  </li>
<% end %>
</ul>
<%= link_to 'New Event', :controller => 'events', :action => 'new' %>
```

這個_View_迭代了`@events`陣列並顯示內容跟超連結，有幾件值得注意的事情：

`<%`和`<%=`不太一樣，前者只執行不輸出，像用來迭代的`each`和`end`這兩行就不需要輸出。而後者`<%=` 裡的結果會輸出給瀏覽器。

`link_to`建立超連結到一個特定的位置，這裡為瀏覽、編輯和刪除都提供了超連結。

連往_http://localhost:3000/events_就會看到這一頁。目前還沒有任何資料，讓我們繼續實作點擊_New Event_超連結之後的動作。

### [](#新增資料)新增資料

建立一篇新的活動需要兩個_Actions_。第一個是_new Action_，它用來實例化一個空的`Event`物件，編輯_app/controllers/events\_controller.rb_加入

```
def new
  @event = Event.new
end
```

這個_app/views/events/new.html.erb_會顯示空的`Event`給使用者：

```
<%= form_for @event, :url => { :controller => 'events', :action => 'create' } do |f| %>
    <%= f.label :name, "Name" %>
    <%= f.text_field :name %>

    <%= f.label :description, "Description" %>
    <%= f.text_area :description %>

    <%= f.submit "Create" %>
<% end %>
```

這個`form_for`的程式碼區塊_(Code block)_被用來建立_HTML_表單。在區塊中，你可以使用各種函式來建構表單。例如`f.text_field :name`建立出一個文字輸入框，並填入`@event`的_name_屬性資料。但這個表單只能基於這個_Model_有的屬性(在這個例子是_name_跟_description_)。_Rails_偏好使用`form_for`而不是讓你手寫表單_HTML_，這是因為程式碼可以更加簡潔，而且可以明確地連結在_Model_物件上。

`form_for`區塊也很聰明，_New Event_的表單跟_Edit Event_的表單，其中的送出網址跟按鈕文字會不同的(根據`@event`的不同，前者是新建的，後者是已經建立過的)。

> 如果你需要建立任意欄位的_HTML_表單，而不綁在某一個_Model_上，你可以使用`form_tag`函式。它也提供了建構表單的函式而不需要綁在_Model_實例上。我們會在_Action View: Helpers_一章介紹。

當一個使用者點擊表單的_Create_按鈕時，瀏覽器就會送出資料到_Controller_的_create Action_。也是一樣編輯_app/controllers/events\_controller.rb_加入：

```
def create
  @event = Event.new(params[:event])
  @event.save

  redirect_to :action => :index
end
```

_create Action_會透過從表單傳進來的資料，也就是_Rails_提供的`params`參數(這是一個_Hash_)，來實例化一個新的`@event`物件。成功儲存之後，便將使用者重導_(redirect)_至_index Action_顯示活動列表。

讓我們來實際測試看看，在瀏覽器中實際按下表單的_Create_按鈕後，出現了`ActiveModel::ForbiddenAttributesError in EventsController#create`的錯誤訊息，這是因為_Rails_會檢查使用者傳進來的參數必須經過一個過濾的安全步驟，這個機制叫做_Strong Parameters_，讓我們回頭修改_app/controllers/events\_controller.rb_

```
def create
  @event = Event.new(event_params)
  @event.save

  redirect_to :action => :index
end

private

def event_params
  params.require(:event).permit(:name, :description)
end
```

我們新加了一個`event_params`方法，其中透過`require`和`permit`將`params`這個_Hash_過濾出`params[:event][:name]`和`params[:event][:description]`。

> `private`以下的所有方法都會變成_private_方法，所以記得放在檔案的最底下。

再次測試看看，應該就可以順利新增資料了。

### [](#顯示個別資料)顯示個別資料

當你在_index_頁面點擊_show_的活動連結，就會前往_http://localhost:3000/events/show/1_這個網址。_Rails_會呼叫_show action_並設定`params[:id]`為`1`。以下是_show Action_：

編輯_app/controllers/events\_controller.rb_加入

```
def show
  @event = Event.find(params[:id])
end
```

這個_show Action_用`find`方法從資料庫中找出該篇活動。找到資料之後，_Rails_用_show.html.erb_樣板顯示出來。新增_app/views/events/show.html.erb_，內容如下:

```
<%= @event.name %>
<%= simple_format(@event.description) %>

<p><%= link_to 'Back to index', :controller => 'events', :action => 'index' %></p>
```

其中`simple_format`是一個內建的_View Helper_，它的作用是可以將換行字元`\n`置換成`<br />`，有基本的_HTML_換行效果。

### [](#編輯資料)編輯資料

如同建立新活動，編輯活動也有兩個步驟。第一個是請求特定一篇活動的_edit_頁面。這會呼叫_Controller_的_edit Action_，編輯_app/controllers/events\_controller.rb_加入

```
def edit
  @event = Event.find(params[:id])
end
```

找到要編輯的活動之後，_Rails_接著顯示_edit.html.erb_頁面，新增_app/views/events/edit.html.erb_檔案，內容如下:

```
<%= form_for @event, :url => { :controller => 'events', :action => 'update', :id => @event } do |f| %>
    <%= f.label :name, "Name" %>
    <%= f.text_field :name %>

    <%= f.label :description, "Description" %>
    <%= f.text_area :description %>

    <%= f.submit "Update" %>
<% end %>
```

這裡跟_new Action_很像，只是送出表單後，是前往_Controller_的_update Action_：

```
def update
  @event = Event.find(params[:id])
  @event.update(event_params)

  redirect_to :action => :show, :id => @event
end
```

在_update Action_裡，_Rails_一樣透過`params[:id]`參數找到要編輯的資料。接著`update`方法會根據表單傳進來的參數修改到資料上，這裡我們沿用`event_params`這個方法過濾使用者傳進來的資料。如果一切正常，使用者會被導向到活動的_show_頁面。

### [](#刪除資料)刪除資料

最後，點擊_Destroy_超連結會前往_destroy Action_，編輯_app/controllers/events\_controller.rb_加入

```
def destroy
  @event = Event.find(params[:id])
  @event.destroy

  redirect_to :action => :index
end
```

`destroy`方法會刪除對應的資料庫資料。完成之後，將使用者導向_index_頁面。

> _Rails_的程式風格非常注重變數命名的單數複數，像上述的_index Action_中是用`@events`複數命名，代表這是一個群集陣列。其他則是用`@event`單數命名。

## [](#認識版型layout)認識版型_(Layout)_

_Layout_可以用來包裹樣板，讓不同樣板共用相同的_HTML_開頭和結尾部分。當_Rails_要顯示一個樣板給瀏覽器時，它會將樣板的_HTML_放到_Layout_的_HTML_之中。預設的_Layout_檔案是_app/views/layouts/application.html.erb_，其中`yield`就是會被替換成樣板的地方。所有的樣版預設都會套這個_Layout_。我們會再 _Action View_一章中介紹如何更換不同_Layout_。

現在，讓我們修改_Layout_中的`<title>`：

```
<!DOCTYPE html>
<html>
<head>
  <title><%= @page_title || "Event application" %></title>
  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
  <%= csrf_meta_tags %>
</head>
<body>

<%= yield %>

</body>
</html>
```

如此我們可以在_show Action_中設定`@page_title`的值：

```
def show
  @event = Event.find(params[:id])
  @page_title = @event.name
end
```

這樣的話，進去_show_頁面的_title_就會是活動名稱。其他頁面因為沒有設定`@page_title`，就會是”Event application”。

## [](#認識局部樣板partial-template)認識局部樣板_(Partial Template)_

利用局部樣板_(Partial)_機制，我們可以將重複的樣板獨立出一個單獨的檔案，來讓其他樣板共享引用。例如_new.html.erb_和_edit.html.erb_都有以下相同的樣板程式：

```
<%= f.label :name, "Name" %>
<%= f.text_field :name %>

<%= f.label :description, "Description" %>
<%= f.text_area :description %>
```

一般來說，新增和編輯時的表單欄位都是相同的，所以讓我們將這段樣板程式獨立出一個局部樣板，這樣要修改欄位的時候，只要修改一個檔案即可。局部樣板的命名都是底線`_`開頭，新增一個檔案叫做`_form.html.erb`，內容就如上。如此_new.html.erb_就可以變成：

```
<%= form_for @event, :url => { :controller => 'events', :action => 'create' } do |f| %>
    <%= render :partial => 'form', :locals => { :f => f } %>
    <%= f.submit "Create" %>
<% end %>
```

而_edit.html.erb_則是：

```
<%= form_for @event, :url => { :controller => 'events', :action => 'update', :id => @event } do |f| %>
    <%= render :partial => 'form', :locals => { :f => f } %>
    <%= f.submit "Update" %>
<% end %>
```

透過`<%= render :partial => 'form', :locals => { :f => f } %>`會引用`_form.html.erb`這個局部樣板，並將變數`f`傳遞進去變成區域變數。

## [](#before_action方法)`before_action`方法

透過`before_action`，我們可以將_Controller_中重複的程式獨立出來。

在_events\_controller.rb_開頭內新增一行：

```
class EventsController < ApplicationController
  before_action :set_event, :only => [ :show, :edit, :update, :destroy]
  # ....
  # ... 下略
```

在下方`private`後面新增一個方法如下：

```
def set_event
  @event = Event.find(params[:id])
end
```

> _Controller_中的公開_(public)_方法都是_Action_，也就是可以讓瀏覽器呼叫使用的動作。使用`protected`或`private`可以避免內部方法被當做_Action_使用。

刪除_show_、_edit_、_update_、_destroy_方法中的

```
@event = Event.find(params[:id])
```

## [](#加入資料驗證)加入資料驗證

我們在資料驗證一節中，已經加入了_name_的必填驗證，因此當使用者送出沒有_name_的表單，就會無法儲存進資料庫。我們希望目前的程式能夠在驗證失敗後，提示使用者儲存失敗，並讓使用者有機會可以修改再送出。

修改_app/controllers/events\_controller.rb_的_create_和_update Action_

```
def create
  @event = Event.new(event_params)
  if @event.save
    redirect_to :action => :index
  else
    render :action => :new
  end
end
```

如果活動因為驗證錯誤而儲存失敗，這裡會回傳給使用者帶有錯誤訊息的_new Action_，好讓使用者可以修正問題再試一次。實際上，`render :action => "new"`會回傳_new Action_所使用的樣板，而不是執行_new action_這個方法。如果改成使用`redirect_to`會讓瀏覽器重新導向到_new Action_，但是如此一來`@event`就被重新建立而失去使用者剛輸入的資料。

```
def update
  if @event.update(event_params)
    redirect_to :action => :show, :id => @event
  else
    render :action => :edit
  end
end
```

更新時也是一樣，如果驗證有任何問題，它會顯示_edit_頁面好讓使用者可以修正資料。

而為了可以在儲存失敗時顯示錯誤訊息，接著編輯`_form.html.erb`中加入

```
<% if @event.errors.any? %>
      <ul>
      <% @event.errors.full_messages.each do |msg| %>
        <li><%= msg %></li>
      <% end %>
      </ul>
<% end %>
```

## [](#認識flash訊息)認識_Flash_訊息

請在_app/views/layouts/application.html.erb_ _Layout_檔案之中，`yield`之前加入：

```
<p style="color: green"><%= flash[:notice] %></p>
<p style="color: red"><%= flash[:alert] %></p>
```

接著讓我們回到_app/controllers/events\_controller.rb_，在_create Action_中加入

```
flash[:notice] = "event was successfully created"
```

在_update Action_中加入

```
flash[:notice] = "event was successfully updated"
```

在_destroy Action_中加入

```
flash[:alert] = "event was successfully deleted"
```

「event was successfully created」訊息會被儲存在_Rails_的特殊_flash_變數中，好讓訊息可以被帶到另一個 _action_，它提供使用者一些有用的資訊。在這個_create Action_中，使用者並沒有真的看到任何頁面，因為它馬上就被導向到新的活動頁面。而這個_flash_變數就帶著訊息到下一個_Action_，好讓使用者可以在_show Action_頁面看到 「event was successfully created.」這個訊息。

## [](#分頁外掛)分頁外掛

上述的程式用`Event.all`一次抓出所有活動，這在資料量一大的時候非常浪費效能和記憶體。通常會用分頁機制來限制抓取資料的筆數。

編輯_Gemfile_加入以下程式，這個檔案設定了此應用程式使用哪些套件。這裡我們使用_[kaminari](https://github.com/amatsuda/kaminari)_這個分頁套件：

```
gem "kaminari"
```

執行`bundle install`就會安裝。裝好後需要重新啟動伺服器才會載入。

修改_app/controllers/events\_controller.rb_的_index Action_如下

```
def index
  @events = Event.page(params[:page]).per(5)
end
```

編輯_app/views/events/index.html.erb_，加入

```
<%= paginate @events %>
```

連往_http://localhost:3000/events/_，你可能需要多加幾筆資料就會看到分頁連結了。

* * *
