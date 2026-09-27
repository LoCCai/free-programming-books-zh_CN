> 此章步驟不相容 Rails 6 以上版本

> The first 90% of the code accounts for the first 90% of the development time. The remaining 10% of the code accounts for the other 90% of the development time. – Tom Cargill, 貝爾實驗室的物件導向程式專家

> 請注意本章內容銜接前一章，請先完成前一章內容。

## [](#什麼是-restful)什麼是 RESTful？

_RESTful_路由設計是_Rails_的一項獨到的發明，它使用了_REST_的概念來建立一整組的命名路由_(named routes)_。

什麼是_REST_呢？表象化狀態轉變_Representational State Transfer_，簡稱_REST_，是_Roy Fielding_博士在_2000_年他的博士論文中提出來的一種軟體架構風格。相較於_SOAP_、_XML-RPC_更為簡潔容易使用，也是眾多網路服務中最為普遍的_API_格式，像是_Amazon_、_Yahoo!_、_Google_等提供的_API_服務均有_REST_介面。

_REST_有主要有兩個核心精神：1. 使用_Resource_來當做識別的資源，也就是使用一個_URL_網址來代表一個_Resource_ 2. 同一個_Resource_則可以有不同的_Representations_格式變化。這一章的路由實作了_Resource_概念，而_Representation_則是用了`respond_to`方法來實作，稍候我們也會介紹如何使用。

> 關於_REST_的理論可以參考筆者整理的[什麼是REST跟RESTful？](https://ihower.tw/blog/archives/1542)。不過，了解理論並不是在_Rails_中使用_RESTful_路由的前提條件，所以大可以跳過不甚理解沒關係。我們只要知道它可以帶來什麼技術上的具體好處，以及如何使用就足夠了。

_RESTful_帶給_Rails_最大的好處是：它幫助我們用一種比較標準化的方式來命名跟組織_Controllers_和_Actions_。在沒有_RESTful_之前，我們上一章介紹了外卡路由設計方式，也就是一個個指定_Controller_和_Action_，雖然十分地簡便，但是卻沒有什麼準則。同一個_Action_讓不同的開發者設計，就很可能放在不同的_Controller_之下，更常見的是讓一個_Controller_放太多不相關的_Action_，造成單一_Controller_過於龐大。

將_RESTful_帶入_Rails_路由系統的點子，出自它對應了_HTTP_動詞_POST_、_GET_、_PATCH/PUT_、_DELETE_到資料的新增、讀取、更新、刪除等四項操作。一旦將_HTTP_動詞考慮進來，如此我們就將上一章手工打造_CRUD_的路由

-   `/events/create`
-   `/events/show/1`
-   `/events/update/1`
-   `/events/destroy/1`

變成

-   `POST /events`對應到_Controller_中的_create action_
-   `GET /events/1`對應到_Controller_中的_show action_
-   `PATCH /events/1`對應到_Controller_中的_update action_
-   `DELETE /events/1`對應到_Controller_中的_destroy action_

> 什麼是_HTTP method_？在_HTTP_通訊協定中制定了九種動詞_(Verbs)_來跟伺服器溝通，分別是_HEAD_、_GET_、_POST_、_PUT_、_PATCH_、_DELETE_、_TRACE_、_OPTIONS_、_CONNECT_。其中最常見的就是_GET_和_POST_：_GET_用來讀取資料，這個動作不應該造成任何資料變更。而_POST_用於送出資料，這個動作不會被快取。而因為_HTML_只能送出_GET_或透過表單送出_POST_，_Rails_為了突破這個限制，在_POST_加上一個隱藏參數`_method=PATCH`或`_method=DELETE`就可以當做_PATCH_和_DELETE_請求了。

> _HTTP GET_和其他動詞最大的差別在於它被認為是一個純讀取、不會修改任何資料的操作，不像_POST_、_PATCH_、_DELETE_會修改伺服器上的資料。我們一般用瀏覽器_GET_網頁，可以回上一頁或重新整理，但是_POST_網頁要重新整理時，瀏覽器會提示你是否要在執行一次，就是這個道理。

_Rails_用這套慣例來大大簡化了路由設定。那程式該怎麼寫呢？我們在_config/routes.rb_加入以下一行程式：

```
resources :events
```

如此就會自動建立四個命名路由_(named routes)_，搭配四個_HTTP_動詞，對應到七個_Actions_。它的實際作用，就如同以下的_routes.rb_設定：

```
get    '/events'          => "events#index",   :as => "events"
post   '/events'          => "events#create",  :as => "events"
get    '/events/:id'      => "events#show",    :as => "event"
patch  '/events/:id'      => "events#update",  :as => "event"
put    '/events/:id'      => "events#update",  :as => "event"
delete '/events/:id'      => "events#destroy", :as => "event"
get    '/events/new'      => "events#new",     :as => "new_event"
get    '/events/:id/edit' => "events#edit",    :as => "edit_event"
```

用這張表格會更清楚：

| Helper | GET | POST | PATCH/PUT | DELETE |
| --- | --- | --- | --- | --- |
| event\_path(@event) | /events/1  
show action |  | /events/1  
update action | /events/1  
destroy action |
| events\_path | /events  
index action | /events  
create action |  |  |  |
| edit\_event\_path(@event) | /events/1/edit  
edit action |  |  |  |  |
| new\_event\_path | /events/new  
new action |  |  |  |  |

輸入`bin/rake routes`也會列出目前設定的路由規則有哪些：

```
$ bin/rake routes

 	       Prefix Verb   URI Pattern                  Controller#Action
           events GET    /events(.:format)            events#index
                  POST   /events(.:format)            events#create
        new_event GET    /events/new(.:format)        events#new
       edit_event GET    /events/:id/edit(.:format)   events#edit
            event GET    /events/:id(.:format)        events#show
                  PATCH  /events/:id(.:format)        events#update
                  PUT    /events/:id(.:format)        events#update
                  DELETE /events/:id(.:format)        events#destroy
          welcome GET    /welcome(.:format)           welcome#index
welcome_say_hello GET    /welcome/say_hello(.:format) welcome#say
             root GET    /                            welcome#index
```

其中的_Prefix_指的是在_View_的_Helper_命名，搭配`_path`(相對網址，不帶有`http://your_domain`)或`_url`(絕對網址，帶有`http://your_domain`)結尾就可以組合出_Helper_方法，例如`welcome_say_hello_path`方法會產生出_/welcome/say\_hello_這樣的網址。一般來說在網站的情境內都會使用相對網址，會用到絕對網址的情境則是在寄出去_Email_裡面的超連結。

另外，注意到這七個_Action_方法的名字，_Rails_是定好的，無法修改。這一套慣例建議你背起來，你可以這樣記憶：

-   _show_、_new_、_edit_、_update_、_destroy_是單數，對單一元素操作
-   _index_、_create_是複數，對群集操作
-   `event_path(@event)`需要參數，根據_HTTP_動詞決定_show_、_update_、_destroy_
-   `events_path`毋需參數，根據_HTTP_動詞決定_index_、_create_

因此，最後我們不寫：

```
link_to event.name, :controller => 'events', :action => :show , :id => event.id
```

而改寫成：

```
link_to event.name, event_path(event)
```

只需記得_resources_名稱，就可以推導出一整組的_URL Helper_方法。_Rails_就是利用這樣的高階概念，來簡化路由的設計。

> 瀏覽器支援_PATCH/PUT_跟_DELETE_嗎？_Rails_其實偷藏了`_method`參數。_HTML_規格只定義了_GET/POST_，所以_HTML_表單是沒有_PUT/DELETE_的。但是_XmlHttpRequest_規格(也就是_Ajax_用的)有定義_GET/POST/PUT/PATCH/DELETE/HEAD/OPTIONS_。

## [](#修改成一個restful版本的crud)修改成一個_RESTful_版本的_CRUD_

根據上一節所學到_RESTful_技巧，接續上一章的_CRUD_應用程式，來改造成_RESTful_應用程式，相信各位讀者可以從中發現到_RESTful_所帶來的簡潔好處。讓我們開始動手修改吧：

### [](#步驟一)步驟一

編輯_config/routes.rb_，加入一個_Resources_：

```
resources :events
```

請加在上方，_routes.rb_裡面越上面的規則優先權較高。

### [](#步驟二)步驟二

編輯_app/views/events/index.html.erb_，修改各個`link_to`的路徑：

```
<% @events.each do |event| %>
  <li>
    <%= event.name %>
    <%= link_to "Show", event_path(event) %>
    <%= link_to 'Edit', edit_event_path(event) %>
    <%= button_to 'Delete', event_path(event), :method => :delete, :data => { :confirm => "Are you sure?" } %>
  </li>
<% end %>
</ul>

<%= link_to 'New Event', new_event_path %>
```

注意到刪除的地方，我們多一個參數`:method => :delete`。非`GET`的操作，顧及網頁親和力我們順道把`link_to`改成用`button_to`。`link_to`如果瀏覽器的_JavaScript_沒開，就會無法送出_GET_之外的操作。`button_to`就無此困擾，因為_Rails_是產生`form`標籤夾帶`_method`參數。建議你可以用瀏覽器打開_HTML_原始碼觀察看看_Rails_實際產生出來的_HTML_標籤，可以有更好的認識。額外加上的`:confirm`參數則會讓_Rails_的_JavaScript_跳出確認視窗。

#### [](#步驟三)步驟三

編輯_app/views/events/show.html.erb_，修改`link_to`的路徑：

```
<%= @event.name %>
<%= simple_format(@event.description) %>

<p><%= link_to 'Back to index', events_path %></p>
```

### [](#步驟四)步驟四

修改_app/views/events/new.html.erb_的表單送出位置如下：

```
<%= form_for @event, :url => events_path do |f| %>
```

> 在本例中，你也可以完全省略`:url`參數，_Rails_可以根據`@event`推算出路由。

### [](#步驟五)步驟五

修改_app/views/events/edit.html.erb_的表單送出位置如下：

```
<%= form_for @event, :url => event_path(@event), :method => :patch do |f| %>
```

> `:url`和`:method`也可以省略，_Rails_自動會根據`@event`是新建的還是修改來決定要不要使用`PATCH`。

### [](#步驟六)步驟六

修改_app/controllers/events\_controller.rb_，將_create Action_和_destroy Action_裡的`redirect_to`改成

```
redirect_to events_url
```

而_update Action_中的`redirect_to`改成

```
redirect_to event_url(@event)
```

### [](#步驟七)步驟七

一旦完成_RESTful_之後，我們在上一章一開始設定的外卡路由就用不到了，編輯_config/routes.rb_將以下程式註砍掉：

```
match ':controller(/:action(/:id(.:format)))', :via => :all
```

外卡路由雖然設定上很方便，但已經不被推薦使用，它讓所有_Actions_都可以透過_GET_訪問到，而有安全上的顧慮。我們希望限制接收表單的_create Action_只允許_POST_請求。

至於就完成了_RESTful_的改造，將來我們就不會再用到外卡路由了。會直接使用`resources`的方式來建立_CRUD_應用。

## [](#常見錯誤)常見錯誤

### [](#unknown-action)Unknown action

明明有在_config/routes.rb_裡面定義了_resources_路由，但是出現以下的_Unknown action_錯誤：

![image](https://ihower.tw/rails/images/restful-unknown-action.png)

排除打錯字之外，其原因多半是跟_routes.rb_裡面的定義順序有關。注意到在_routes.rb_裡面，越上面的路由規則越優先，例如如果你定義成：

```
Rails.application.routes.draw do
    match ':controller(/:action(/:id(.:format)))', :via => :all
    resources :events
end
```

那麼網址_/events/4_就會優先比對到`:controller/:action`而去找`4`這個_Action_，這就錯了。

### [](#routing-error)Routing Error

這錯誤通常發生在`link_to`裡，它抱怨找不到適合的路由規則來產生網址：

![image](https://ihower.tw/rails/images/restful-routing-error.png)

如果你是用外卡路由，那麼如以下程式亂給一個不存在的_Controller_，就會產生一樣的錯誤了：

```
link_to "foobar", :controller => "No such controller", :action => "blah"
```

因為`{ :controller => "No such controller", :action => "blah" }`比對不出有這個路由規則。但是如果是用_RESTful_路由呢？那多半是因為參數傳錯了，例如：

```
link_to "Show", event_path(@foobar)
```

這個`@foobar`沒有定義所以是`nil`，`event_path(@foobar)`對_Rails_內部來說等同於`{ :controller => "events", :action => "show", :id => nil }`，這就造成了找不到路由的錯誤，它必須知道`:id`才能知道是那一個活動的_show Action_網址。

## [](#使用respond_to)使用_respond\_to_

`respond_to`可以讓我們在同一個_Action_中，支援不同的資料格式，例如_XML_、_JSON_、_Atom_等。讓我們來實作看看。

> _Atom_是一種基於_XML_的供稿格式，被設計為_RSS_的替代品，廣泛應用於_Blog feed_。

### [](#步驟一-1)步驟一

修改_app/controllers/events\_controller.rb_的_index Action_加上_XML_、_JSON_和_Atom_的支援，其中`to_xml`和`to_json`是_ActiveRecord_內建的方法，可以將_ActiveRecord_物件快速地轉成_XML_和_JSON_資料格式。也因為是純資料格式，所以不像_HTML_需要_erb template_檔案，我們可以直接在_Action_中直接呼叫`render`將內容回傳給瀏覽器：

```
def index
  @events = Event.page(params[:page]).per(5)

  respond_to do |format|
    format.html # index.html.erb
    format.xml { render :xml => @events.to_xml }
    format.json { render :json => @events.to_json }
    format.atom { @feed_title = "My event list" } # index.atom.builder
  end
end
```

至於_Atom_格式比較複雜一點，可以使用_template_。這裡使用了_builder_這個引擎可以用_Ruby_語法來產生_XML_。新增_app/views/events/index.atom.builder_檔案，內容如下：

```
atom_feed do |feed|
  feed.title( @feed_title )
  feed.updated( @events.last.created_at )
  @events.each do |event|
    feed.entry(event) do |entry|
      entry.title( event.name )
      entry.content( event.description, :type => 'html' )
    end
  end
end
```

打開瀏覽器分別瀏覽看看_http://localhost:3000/events.xml_、_http://localhost:3000/events.json_、_http://localhost:3000/events.atom_這幾個附檔名不同的網址。

### [](#步驟二-1)步驟二

修改_app/controllers/events\_controller.rb_的_show Action_加上_XML_和_JSON_的支援，這回我們試試看比較手工的方式，用_Builder_格式來建構_XML_，以及手動組_Hash_再轉成_JSON_字串：

```
def show
  @event = Event.find(params[:id])
  respond_to do |format|
    format.html { @page_title = @event.name } # show.html.erb
    format.xml # show.xml.builder
    format.json { render :json => { id: @event.id, name: @event.name }.to_json }
  end
end
```

編輯_app/views/events/show.xml.builder_：

```
xml.event do |e|
  e.name @event.name
  e.description @event.description
end
```

打開瀏覽器分別瀏覽看看_http://localhost:3000/events/1.xml_、_http://localhost:3000/events/1.json_等網址。

> 產生_JSON_還有其他方式，除了呼叫`to_json`或手動轉_Hash_物件來自訂格式之外，_Rails_有內建_JSON_專用的_template_引擎叫做_[jbuilder](https://github.com/rails/jbuilder)_，你可以產生一個_app/views/events/show.json.jbuilder_的檔案來產生_JSON_。如果需求是要製作給第三方或手機的_Web APIs_，那麼我們就會改用_jbuilder_樣板的方式，這樣比較好寫和好維護。

### [](#步驟三-1)步驟三

如果想要加上這些格式的超連結，可以在_URL Helper_中傳入`:format`參數。讓我們修改_app/views/events/index.html.erb_加上不同格式的超連結：

```
<% @events.each do |event| %>
  <li>
    <%= link_to event.name, event_path(event) %>
    <%= link_to " (XML)", event_path(event, :format => :xml) %>
    <%= link_to " (JSON)", event_path(event, :format => :json) %>
    <%= link_to 'edit', edit_event_path(event) %>
    <%= button_to 'delete', event_path(event), :method => :delete, :data => { :confirm => "Are you sure?" } %>
  </li>
<% end %>
</ul>

<%= link_to 'new event', new_event_path %>
<%= link_to "Atom feed", events_path(:format => :atom) %>
```

## [](#行數統計)行數統計

到目前為止，總共寫了多少程式了呢？_Rails_提供了一個簡單的指令可以知道：

```
$ bin/rake stats
```

就會輸出這樣的表格：

```
+----------------------+-------+-------+---------+---------+-----+-------+
| Name                 | Lines |   LOC | Classes | Methods | M/C | LOC/M |
+----------------------+-------+-------+---------+---------+-----+-------+
| Controllers          |    86 |    61 |       2 |       7 |   3 |     6 |
| Helpers              |     4 |     4 |       0 |       0 |   0 |     0 |
| Models               |     2 |     2 |       1 |       0 |   0 |     0 |
| Libraries            |     0 |     0 |       0 |       0 |   0 |     0 |
| Integration tests    |     0 |     0 |       0 |       0 |   0 |     0 |
| Functional tests     |    49 |    39 |       1 |       0 |   0 |     0 |
| Unit tests           |    11 |     6 |       2 |       0 |   0 |     0 |
+----------------------+-------+-------+---------+---------+-----+-------+
| Total                |   152 |   112 |       6 |       7 |   1 |    14 |
+----------------------+-------+-------+---------+---------+-----+-------+
  Code LOC: 67     Test LOC: 45     Code to Test Ratio: 1:0.7
```

其中_LOC_是指不包含空行的行數。

## [](#如何除錯)如何除錯？

如果是_Model_中的程式，你可以在命令列下輸入_rails console_，然後在_Console_中呼叫看看_Model_的方法看看正確與否。而除錯_Controller_和_Views_一個簡單的方法是你可以使用_debug_這個_Helper_方法，例如在_app/views/events/show.html.erb_中插入：

```
<%= debug(@event) %>
```

這樣就會輸出`@event`這個值的詳細內容。不過，更為常見的是使用_Logger_來記錄資訊到_log/development.log_裡。

### [](#關於logger)關於_Logger_

在_Rails_環境中，你可以直接使用_logger_或是`Rails.logger`來拿到這個_Logger_物件，它有幾個方法可以呼叫：

-   logger.debug 除錯用的訊息，_Production_環境會忽略
-   logger.info 值得記錄的一般訊息
-   logger.warn 值得記錄的警告訊息
-   logger.error 錯誤訊息，但還不到網站無法執行的地步
-   logger.fatal 嚴重錯誤到網站無法執行的訊息

例如，你想要觀察程式中變數_@event_的值，你可以插入以下程式到要觀察的程式段落之中：

```
Rails.logger.debug("event: #{@event.inspect}")
```

接著開瀏覽器跑實際跑過這段程式，那麼就會在`rails server`的標準輸出中，看到這個除錯訊息。或是你也可以另開一個指令視窗執行`tail -f log/development.log`來觀察_log_檔案。

> 在_Production_環境中，_log/production.log_會逐漸長大，可以[使用 logrotate 定期整理 Rails Log 檔案](https://ihower.tw/blog/archives/3565)。

我們會在測試一章進一步介紹如何撰寫測試程式，撰寫單元測試可以大大降低除錯時間。

## [](#更多線上資源)更多線上資源

-   [Getting Started with Rails](http://guides.rubyonrails.org/getting_started.html)
-   [Debugging Rails Applications](http://guides.rubyonrails.org/debugging_rails_applications.html)

* * *
