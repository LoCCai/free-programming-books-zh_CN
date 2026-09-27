> Weeks of programming can save you hours of planning. – Unknown

不同於靜態網頁的路由是直接對應於檔案的目錄結構，一個_Web_開發框架會將路由功能納入其中，來獲得最大的彈性。也就是您可以指定任意_URL_對應到任一個_Controller_的_Action_。另一方面，我們也不在_Views_中直接寫死_URL_網址，而是透過_Helper_輔助方法根據你的路由設定來產生_URL_，這樣也可以確定該網址一定有對應的_Controller和Action_，不然就會出現_NoMethodError_找不到_Helper_方法的錯誤。

也就是，路由系統做幾件事情：

1\. 辨識_HTTP Request_的_URL_網址，然後對應到設定的_Controller Action_。

2\. 處理網址內的參數字串，例如：_/users/show/123_送到_Users controller_的_show action_時，會將`params[:id]` 設定為 123

3\. 辨識_link\_to_和_redirect\_to_的參數產生_URL_字串，例如

```
link_to 'hola!', { :controller=> 'welcome', :action => 'say' }
```

會產生

```
<a href="/welcome/say">hola!</a>
```

_Rails_這麼彈性的路由功能，可以怎麼用呢？例如設計一個部落格網站，如果是沒有使用框架的_CGI_或_PHP_網頁開發，會長得這樣：

```
http://example.org/?p=123
```

但是如果我們想要將編號放在網址列中呢？

```
http://example.org/posts/123
```

或是希望根據日期：

```
http://example.org/posts/2011/04/21/
```

或者是根據不同作者加上文章的標籤(將關鍵字放在網址中有助於_SEO_)：

```
http://example.org/ihower/posts/123-ruby-on-rails
```

這些在_Rails_只需要修改_config/routes.rb_這一個路由檔案，就可以完全自由自定。讓我們看看有哪些設定方式吧：

## [](#一般路徑regular-routes)一般路徑_Regular Routes_

```
get 'meetings/:id', :to => 'events#show'
post 'meetings', :to => 'events#create'
```

這裡的`events#show`表示指向_events controller_的_show action_。通常會簡寫成：

```
get 'meetings/:id' => 'events#show'
```

其中有冒號`:id`的部分，會被轉成一個參數`params[:id]`傳進_Controller_裡。

> 注意到在_routes.rb_中，越上面越優先。是如果有網址同時符合多個規則，會使用最上面的規則。

## [](#外卡路由)外卡路由

```
match ':controller(/:action(/:id(.:format)))', :via => :all
```

這是我們在上一章所使用的方式，也是_Rails 3.0_之前版本的預設方式。其中的括弧用法表示這部份可有可無，也就是上述這一行設定就包括六種路徑方式：

```
match '/:controller', via: :all
match '/:controller/:action', via: :all
match '/:controller/:action/:id', via: :all
match '/:controller.:format', via: :all
match '/:controller/:action.:format', via: :all
match '/:controller/:action/:id.:format', via: :all
```

例如，像這樣的網址`http://localhost:3000/welcome/say`便會對應到_welcome controller_的_say action_。外卡路由是一種非常簡便的對應方式。這種方式的缺點當網站的_Action_變多的時候，會容易讓_Controller_的設計變得混亂沒有規則。稍後介紹的_RESTful_路由則是_Rails_對此提出的組織路由方案。

還有，`(.format)`這一段則會讓路由可以接受`.json`、`.xml`等有副檔名的網址，並且轉成`params[:format]`參數傳進_Controller_裡，搭配`respond_to`而回傳不同的格式。

## [](#命名路由named-routes)命名路由_Named Routes_

_Named Routes_可以幫助我們產生_URL helper_如`meetings_url`或`meetings_path`，而不需要用`{:controller => 'meetings', :action => 'index'}`的方式：

```
get '/meetings' => 'events#index', :as => "meetings"
```

其中`:as`的部份就會產生一個`meetings_path`和`meetings_url`的_Helpers_，`_path`和`_url`的差別在於前者是相對路徑，後者是絕對路徑。一般來說比較常用`_path`方法，除非像是在_Email_信件中，才必須用`_url`提供包含_Domain_的完整網址。

> 雖然_RESTful_已經是設計_Rails_最常見的路徑模式，但是在一些特殊的情況、不符合_CRUD_模型的情結就不一定適用了，例如有多重步驟的表單(又叫作_Wizard_) 時，使用命名路由反而會比較簡潔，例如`step1_path, step2_path, step3_path`等。

## [](#redirect)Redirect

在路由中可以直接設定轉向：

```
get "/foo" => redirect("/bar")
get "/ihower" => redirect("https://ihower.tw")
```

## [](#設定首頁)設定首頁

要設定網站的首頁，請設定：

```
root :to => 'welcome#show'
```

## [](#http動詞verb限定)_HTTP_動詞_(Verb)_限定

可以透過 :via 參數指定 HTTP Verb 動詞

```
match "account/overview" => "account#overview", :via => :get
match "account/setup" => "account#setup", :via => [:get, :post]
match "account/overview" => "account#overview", :via => :all
```

或是

```
get "account/overview" => "account#overview"
get "account/setup" => "account#setup"
post "account/setup" => "account#setup"
```

## [](#scope-規則)Scope 規則

`scope`方法可以讓我們_DRY_我們的路由規則，將共通的_controller_、_constraints_、網址前置_path_和_URL Helper_前置名稱移到`scope`成為參數。例如

```
get 'foo/meetings/:id', :to => 'events#show'
post 'foo/meetings', :to => 'events#create'
```

可以改寫成

```
scope :controller => "events", :path => "/foo", :as => "bar" do
  get 'meetings/:id' => :show, :as => "meeting"
  post 'meetings' => :create	, :as => "meetings"
end
```

其中`as`會產生_URL helper_是`bar_meeting_url`和`bar_meetings_url`。

### [](#scope-module)Scope Module

_Module_參數則可以讓_Controller_分_Module_，例如

```
scope :path => '/api/v1/', :module => "api_v1", :as => 'v1' do
  resources :projects
end
```

如此_controller_會是`ApiV1::ProjectsController`，網址如_/api/v1/projects_，而_URL Helper_如`v1_projects_path`這樣的形式。

### [](#領域名稱namespace)領域名稱_Namespace_

_Namespace_是_Scope_的一種特定應用，特別適合例如後台介面，這樣就整組`controller`、網址`path`、_URL Helper_前置名稱\`都影響到：

```
namespace :admin do
  resources :projects
end
```

如此_controller_會是`Admin::ProjectsController`，網址如_/admin/projects_，而_URL Helper_如`admin_projects_path`這樣的形式。

在_Namespace_下也可以設定它的首頁，例如：

```
namespace :admin do
	root "projects#index"
end
```

就樣連`http://localhost:3000/admin/`就會使用_ProjectsController index action_了。

## [](#特殊條件限定)特殊條件限定

我們可以利用`:constraints`設定一些參數限制，例如限制`:id`必須是整數。

```
match "/events/show/:id" => "events#show", :constraints => {:id => /\d/}
```

另外也可以限定_subdomain_子網域：

```
namespace :admin do
  constraints subdomain: 'admin' do
   		 resources :photos
  end
end
```

甚至可以限定_IP_位置：

```
constraints(:ip => /(^127.0.0.1$)|(^192.168.[0-9]{1,3}.[0-9]{1,3}$)/) do
    match "/events/show/:id" => "events#show"
end
```

## [](#restful路由)_RESTful_路由

我們在第六章介紹過_RESTful_路由的來龍去脈，接下來仔細看看其中的設定。

### [](#複數資源)複數資源

```
resources :events
```

### [](#單數資源singular-resoruce)單數資源_Singular Resoruce_

除了一般複數型_Resources_，在單數的使用情境下也可以設定成單數_Resource_：

```
resource :map
```

特別之處在於那就沒有_index action_了，所有的_URL Helper_也皆為單數形式，顯示出來的網址也是單數。

> 但是_Singular resource_的檔案命名仍為複數，例如_maps\_controller.rb_

### [](#套疊nested-resources)套疊_Nested Resources_

當一個_Resource_一定會依存另一個_Resource_時，我們可以套疊多層的_Resources_，例如以下是任務一定屬於在專案底下：

```
resources :projects do
  resources :tasks
end
```

如此產生的_URL Helper_如`project_tasks_path(@project)`和`project_task_path(@project, @task)`，它的網址會如_projects/123/tasks_和_projects/123/tasks/123_。

> 實務上不建議設計超過兩層，一來是路由會太長，二來也是不必要的依賴。

### [](#指定controller)指定Controller

_resource_預設採用同名的_controller_，我們可以改指定，例如

```
resources :projects do
  resources :tasks, :controller => "project_tasks"
end
```

### [](#自定群集路由collection)自定群集路由_Collection_

除了慣例中的七個_Actions_外，如果你需要自定群集的_Action_，可以這樣設定：

```
resources :products do
  collection do
    get  :sold
    post :on_offer
  end

  # 或
  get  :sold, :on => :collection
  post :on_offer, :on => :collection
end
```

如此便會有`sold_products_path`和`on_offer_products_path`這兩個_URL Helper_，產生出如_products/sold_和_products/on\_offer_這樣的網址。

### [](#自定特定元素路由member)自定特定元素路由_Member_

如果需要自定對特定元素的_Action_：

```
resources :products do
  member do
  	get :sold
  end

  # 或
  get :sold, :on => :member
end
```

如此會有`sold_product_path(@product)`這個_URL Helper_，產生出如_products/123/sold_這樣的網址。

### [](#限定部分支援)限定部分支援

透過`except`或`only`參數，我們不一定要啟用預設的七個_Resource_路由，例如

```
resources :events, :except => [:index, :show]
resources :events, :only => :create
```

### [](#patch-vs-put)PATCH v.s. PUT

_PATCH_是一個相對新的_HTTP verb_，_Rails_為了保持相容性這兩個_HTTP verbs_都會進到_update action_之中。而編輯表單預設則是用_PATCH_。在_REST_語意上的差別是：

-   PATCH 用於修改部分資料
-   PUT 用來替換資料(replace)

對_HTTP API_設計有興趣的讀者，可以參考[https://ihower.tw/blog/archives/6483](https://ihower.tw/blog/archives/6483)一文。

## [](#rake-routes)rake routes

如果你不清楚這些路由設定到底最後的規則是什麼，你可以執行：

```
rake routes
```

這樣就會產生出所有_URL Helper_、_URL 網址_和對應的_Controller Action_都列出來。

## [](#常見錯誤)常見錯誤

### [](#routing-error)Routing Error

當_URL_找不到任何路由規則可以符合時，會出現這個錯誤。例如一個_GET_的路由，你用`button_to`送出_POST_，這樣就不符合規則。

### [](#actioncontrollerurlgenerationerror)ActionController::UrlGenerationError

當一個路由_Helper_的參數不夠的時候，會出現這個錯誤。例如`event_path(event)`這個方法的_event_參數不能是`nil`。如果你打錯成`event_path(@events)`而`@events`是個`nil`，就會出現這個錯誤。

## [](#結論)結論

透過_RESTful_和_Named Route_，我們就不再需要透過外卡路由的_Hash_來指定路由了。所有的路由規則都可以在_routes.rb_一目了然。

## [](#線上參考資料)線上參考資料

-   [Rails Routing from the Outside In](http://guides.rubyonrails.org/routing.html)

* * *
