> Controlling complexity is the essence of computer programming. — Brian Kernighan

_HTTP_通訊協定是一種_Request-Response_(請求-回應)的流程，客戶端(通常是瀏覽器)向伺服器送出一個_HTTP request_封包，然後伺服器就回應一個_response_封包。在上一章中，我們介紹了_Rails_如何使用路由來分派_request_到_Controller_的其中一個_Action_。而每個_Action_的任務就是根據客戶端傳來的資料與_Model_互動，然後回應結果給客戶端。這一章中我們將仔細介紹負責回應請求的_Controller_。

## [](#applicationcontroller)ApplicationController

透過`rails g controller`指令產生出來的 controller 都會繼承自`ApplicationController`。因此定義在這裡的方法可以被所有_Controller_取用，你可以在這邊定義一些共用的方法。預設的_application\_controller.rb_長的如下：

```
class ApplicationController < ActionController::Base
  protect_from_forgery
end
```

其中的`protect_from_forgery`方法啟動了_CSRF_安全性功能，所有非_GET_的_HTTP request_都必須帶有一個_Token_參數才能存取，_Rails_會自動在所有表單中幫你插入_Token_參數，預設的_Layout_中也有一行`<%= csrf_meta_tag %>`標籤可以讓_JavaScript_讀取到這個_Token_。

但是當需要開放_API_給非瀏覽器客戶端時，例如手機端或第三方應用的回呼(webhook)，這時候我們會需要關閉這個功能，例如：

```
class ApisController < ApplicationController
  skip_before_action :verify_authenticity_token # 整個 ApisController 關閉檢查
end
```

> CSRF 網路攻擊 http://en.wikipedia.org/wiki/Cross-site\_request\_forgery

> 注意，請將方法放在_protected_或_private_之下，如果是_public_方法，就會變成一個公開的_Action_可以給瀏覽器呼叫到。

## [](#產生controller與action)產生_Controller_與_Action_

我們在_Part1_示範過，要產生一個_Controller_檔案，請輸入

```
rails g controller events
```

如此便會產生_app/controllers/events\_controller.rb_，依照_RESTful_設計的慣例，所有的_Controller_命名都是複數，而檔案名稱依照慣例都是_{name}\_controller.rb_。

一個_Action_就是_Controller_裡的一個_Public_方法：

```
class EventsController < ApplicationController
  def show
    # ...
  end
end
```

> 除了繼承自`ApplicationController`，我們也可以繼承更底層的`ActionController::Metal`，請參考[Rails3: 新的 Metal 機制](https://ihower.tw/blog/archives/4561)。

在_Action_方法中我們要處理_request_，基本上會做三件事情: 1. 收集_request_的資訊，例如使用者傳進來的參數 2. 操作_Model_來做資料的處理 3. 回傳_response_結果，這個動作稱作_render_

## [](#request資訊收集)_Request_資訊收集

在_Controller_的_Action_之中，_Rails_提供了一些方法可以讓你得知此_request_各種資訊，包括：

-   action\_name 目前的_Action_名稱
-   cookies _Cookie_ 下述
-   headers _HTTP_標頭
-   params 包含用戶所有傳進來的參數_Hash_，這是最常使用的資訊
-   request 各種關於此_request_的詳細資訊，較常用的例如：
    -   xml\_http\_request? 或 xhr?，這個方法可以知道是不是 Ajax 請求
    -   host\_with\_port
    -   remote\_ip
    -   headers
-   response 代表要回傳的內容，會由_Rails_設定好。通常你會用到的時機是你想加特別的_Response Header_。
-   session _Session_下述

> 正確的說，_params_這個_Hash_是`ActiveSupport::HashWithIndifferentAccess`物件，而不是普通的_Hash_而已。_Ruby_內建的_Hash_，用_Symbol_的`hash[:foo]`和用字串的`hash["foo"]`是不一樣的，這在混用的時候常常搞錯而取不到值，算是常見的臭蟲來源。_Rails_在這裡使用的`ActiveSupport::HashWithIndifferentAccess`物件，無論鍵是_Symbol_或字串，都指涉相同的值，減少麻煩。

## [](#render結果)_Render_結果

在根據_request_資訊做好資料處理之後，我們接下來就要回傳結果給用戶。事實上，就算你什麼都不處理，_Action_方法裡面空空如也，甚至不定義_Action_，_Rails_預設也還是會執行_render_方法。這個_render_方法會回傳預設的_Template_，依照_Rails_慣例就是_app/views/{controller\_name}/{action\_name}_。如果找不到樣板檔案的話，會出現_Template is missing_的錯誤。

當然，有時候我們會需要自定_render_，也許是指定不同的_Template_，也許是不需要_Template_。這時候有以下參數可以使用：

### [](#直接回傳結果)直接回傳結果

-   `render :plain => "Hello"` 直接回傳字串內容，不使用任何樣板。
-   `render :xml => @event.to_xml` 回傳_XML_格式
-   `render :json => @event.to_json` 回傳_JSON_格式(再加上`:callback`就會是_JSONP_)

### [](#指定template)指定_Template_

-   `:template` 指定_Template_，例如`render :template => "index"`或可以省略成`render "index"`，如果是不同_Controller_的_Template_再加上_Controller_名稱，例如`render "events/index"`。
-   `:action` 指定同一個_Controller_中另一個_Action_的_Template_(注意到只是使用它的_Template_，而不會執行該_Action_內的程式)

### [](#其他參數)其他參數

-   `:status` 設定_HTTP status_，預設是_200_，也就是正常。其他常用代碼包括_401_權限不足、_404_找不到頁面、_500_伺服器錯誤等。
-   `:layout` 可以指定這個_Action_的_Layout_，設成_false_即關掉_Layout_

補充一提，在特定情況你想把`render`的結果存成一個字串，例如拿到局部樣板_Partials_成為一個字串，這時候可以改使用`render_to_string :partial => "foobar"`

## [](#redirect)Redirect

如果_Action_不要_render_任何結果，而是要使用者轉向到別頁，可以使用_redirect\_to_

-   `redirect_to events_url`
-   `redirect_back(fallback_location: root_path)` 回到上一頁。若不知道上一頁，則回到首頁。

> 注意，一個_Action_中只能有一個`render`或一個`redirect_to`。不然你會得到一個`DoubleRenderError`例外錯誤。

## [](#串流-sending-data)串流 Sending data

如果需要回傳二進位_Binary_資料，有兩個方法可以使用：

`send_data(data, options={})` 回傳二進位字串，接受以下參數：

-   其中`data`參數是二進位的字串：
-   `:filename` 使用者儲存下來的檔案名稱
-   `:type` 預設是_application/octet-stream_
-   `:disposition` _inline_或_attachment_
-   `:status` 預設是_200_

`send_file(file_location, options={})` 回傳一個檔案，接受以下參數：

-   其中`file_location`是檔案路徑和檔名：
-   `:filename` 使用者儲存下來的檔案名稱
-   `:type` 預設是_application/octet-stream_
-   `:disposition` _inline_或_attachment_
-   `:status` 預設是_200_

不過實務上我們很少在上線環境上直接用_Rails_來推送靜態檔案，因為大檔的傳輸時間會浪費寶貴的_Rails_運算資源。我們會改用_X-Sendfile Header_將傳檔的任務委派給網頁伺服器(例如_Apache_或_Nginx_)處理，來降低_Rails_伺服器的負擔。或是搭配第三方雲儲存服務例如_AWS S3_將傳檔的任務外包出去。

## [](#respond_to)respond\_to

我們在第六章_RESTful_應用程式中曾經示範過用法，`respond_to`可以用來回應不同的資料格式。_Rails_內建支援格式包括有`:html, :text, :js, :css, :ics, :csv, :xml, :rss, :atom, :yaml, :json`等。如果需要擴充，可以編輯_config/initializers/mime\_types.rb_這個檔案。

如果你想要設定一個_else_的情況，你可以用`:any`：

```
respond_to do |format|
  format.html
  format.xml { render :xml => @event.to_xml }
  format.any { render :plain => "WTF" }
end
```

另外，_Rails_也支援單行的簡單寫法：

```
respond_to :html, :json, :js
```

這樣其實就是：

```
respond_to do |format|
  format.html
  format.json
  format.js
end
```

## [](#cookies)Cookies

Cookies 是瀏覽器的功能可以讓我們將資料存在用戶的瀏覽器上，並且之後每個 HTTP Request，瀏覽器都會將你所設的 Cookies 再送回來伺服器，因此可以拿來追蹤識別不同用戶，以下是一些基本的用法範例：

```
# Sets a simple session cookie.
cookies[:user_name] = "david"

# Sets a cookie that expires in 1 hour.
cookies[:login] = { :value => "XJ-122", :expires => 1.hour.from_now }

# Example for deleting:
cookies.delete :user_name

cookies[:key] = {
   :value => 'a yummy cookie',
   :expires => 1.year.from_now,
   :domain => 'domain.com'
}

cookies.delete(:key, :domain => 'domain.com')
```

因為資料是存放在使用者瀏覽器，所以存了什麼內容用戶是可以看到的，甚至也可以進行修改。所以如果需要保護不能讓使用者亂改，_Rails_也提供了_Signed_方法幫你加密(會用`config/secrets.yml`這個檔案裡面設定的金鑰來做對稱式加密)：

```
cookies.signed[:user_preference] = @current_user.preferences
```

另外，如果是盡可能永遠留在使用者瀏覽器的資料，可以使用_Permanent_方法：

```
cookies.permanent[:remember_me] = [current_user.id, current_user.salt]
```

兩者也可以加在一起用：

```
cookies.permanent.signed[:remember_me] = [current_user.id, current_user.salt]
```

## [](#sessions)Sessions

_HTTP_是一種無狀態的通訊協定，為了能夠讓瀏覽器能夠在跨_request_之間記住資訊，因此基於瀏覽器的 Cookies，Rails 再提供了所謂的 Session 可以更方便的操作，用來記住登入的狀態、記住使用者購物車的內容等等。

要操作_Session_，直接操作`session`這個_Hash_變數即可。例如：

```
session[:cart_id] = @cart.id
```

> Session 原理可以參考_[Session\_ID](https://en.wikipedia.org/wiki/Session_ID)_，基本上也是利用瀏覽器的_cookie_來追蹤_requests_請求。

### [](#session-storage)Session storage

_Rails_預設採用_Cookies session storage_來儲存_Session_資料，它是將_Session_資料透過_config/secrets.yml_的`secret_key_base`加密編碼後放到瀏覽器的_Cookie_之中，最大的好處是對伺服器的效能負擔很低，缺點是大小最多存_4Kb_，另外雖然有加密不能讓使用者去修改，但是畢竟資料還是存在用戶的瀏覽器上，仍然存在被破解的風險(因此請保護好你的 `config/secrets.yml` 鑰匙，如果外洩了就可以破解)，因此不適合用在高度安全要求的網站應用。

除了_Cookies session storage_，_Rails_也支援其他方式，你可以修改_config/initializers/session\_store.rb_：

-   `:active_record_store` 使用資料庫來儲存
-   `:mem_cache_store` 使用_[Memcached](http://memcached.org/)_快取系統來儲存，適合高流量的網站

一般來說使用預設的_Cookies session storage_即可，如果對安全性較高要求，可以使用資料庫。如果希望兼顧效能，可以考慮使用_Memcached_。

採用`:active_record_store`的話，必須安裝_activerecord-session\_store gem_，然後產生_sessions_資料表：

```
$ rails g active_record:session_migration
$ rake db:migrate
```

## [](#flash訊息)_Flash_訊息

我們在_Part1_示範過用_Flash_來傳遞訊息。它的用處在於_redirect_時，能夠從這一個_request_傳遞文字訊息到下一個_request_，例如從_create Action_傳遞「成功建立」的訊息到_show Action_。

`flash`是一個_Hash_，其中的鍵你可以自定，常用`:notice`、`:warning`或`:error`等。例如我們在第一個_Action_中設定它：

```
def create
  @event = Event.create(params[:event])
  flash[:notice] = "成功建立"
  redirect_to event_url(@event)
end
```

那麼在下一個_Action_中，我們就可以在_Template_中讀取到這個訊息，通常我們會放在_Layout_中：

```
<p><%= flash[:notice] %></p>
```

或是直接用`notice`這個_Helper_：

```
<p><%= notice %></p>
```

使用過一次之後，_Rails_就會自動清除_flash_。

另外，有時候你等不及到下一個_Action_，就想讓_Template_在同一個_Action_中讀取到_flash_值，這時候你可以寫成：

```
flash.now[:notice] = "foobar"
```

最後，_Rails_預設針對`notice`和`alert`這兩個類型可以直接塞進`redirect_to`當作參數，例如：

```
redirect_to event_url(@event), :notice => "成功建立"
```

你也可以自行擴充，例如新增一個_warning_：

```
# app/controllers/application_controller.rb
class ApplicationController < ActionController::Base
  add_flash_types :warning
  #...
end

# in your controller
redirect_to user_path(@user), warning: "Incomplete profile"

# in your view
<%= warning %>
```

## [](#filters)Filters

可將_Controller_中重複的程式抽出來，有三種方法可以定義在進入_Action_之前、之中或之後執行特定方法，分別是`before_action`、`after_action`和`around_action`，其中`before_action`最為常用。這三個方法可以接受_Code block_、一個_Symbol_方法名稱或是一個物件(_Rails_會呼叫此物件的`filter`方法)。

### [](#before_action)before\_action

_before\_action_最常用於準備跨_Action_共用的資料，或是使用者權限驗證等等：

```
class EventsControler < ApplicationController
  before_action :find_event, :only => :show

  def show
  end

  protected

  def find_event
    @event = Event.find(params[:id])
  end

end
```

每一個都可以搭配`:only`或`:except`參數。

### [](#around_action)around\_action

```
# app/controllers/benchmark_filter.rb
class BenchmarkFilter
    def self.filter(controller)
     timer = Time.now
     Rails.logger.debug "---#{controller.controller_name} #{controller.action_name}"
     yield # 這裡讓出來執行Action動作
     elapsed_time = Time.now - timer
     Rails.logger.debug "---#{controller.controller_name} #{controller.action_name} finished in %0.2f" % elapsed_time
    end
end

# app/controller/events_controller.rb
class EventsControler < ApplicationController
    around_action BenchmarkFilter
end
```

### [](#filter的順序)_Filter_的順序

當有多個_Filter_時，_Rails_是由上往下依序執行的。如果需要加到第一個執行，可以使用`prepend_before_action`方法，同理也有`prepend_after_action`和`prepend_around_action`。

如果需要取消從父類別繼承過來的_Filter_，可以使用`skip_before_action :filter_method_name`方法，同理也有`skip_after_action`和`skip_around_action`。

## [](#rescue_from)rescue\_from

`rescue_from`可以在_Controller_中宣告救回特定的例外，改用你指定的方法處理，例如：

```
class ApplicationController < ActionController::Base

    rescue_from ActiveRecord::RecordInvalid, :with => :show_error

    protected

    def show_error
        # render something
    end

end
```

那些沒有被攔截到的錯誤例外，使用者會看到_Rails_預設的_500_錯誤畫面。一般來說比較常會用到`rescue_from`的時機，可能會是使用某些第三方函式庫，該函式庫可能會丟出一些例外是你想要做額外的錯誤處理。例如在[pundit](https://github.com/elabs/pundit)這個檢查權限的套件，如果發生權限不夠的情況，會丟出`Pundit::NotAuthorizedError`的例外，這時候就可以捕捉這個例外，改成回到首頁：

```
rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

protected

def user_not_authorized
 flash[:alert] = I18n.t(:user_not_authorized)
 redirect_to(request.referrer || root_path)
end
```

順道一提，關於如何設計好例外處理，可以參考筆者的一份投影片：[Exception Handling: Designing Robust Software in Ruby](https://ihower.tw/blog/archives/7909)

## [](#http-basic-authenticate)HTTP Basic Authenticate

_Rails_內建支援_HTTP Basic Authenticate_，可以很簡單實作出認證功能：

```
class PostsController < ApplicationController
    before_action :authenticate

    protected

    def authenticate
     authenticate_or_request_with_http_basic do |username, password|
       username == "foo" && password == "bar"
     end
    end
end
```

或是這樣寫：

```
class PostsController < ApplicationController
    http_basic_authenticate_with :name => "foo", :password => "bar"
end
```

## [](#偵測客戶端裝置提供不同內容)偵測客戶端裝置提供不同內容

透過設定`request.variant`我們可以提供不同的_Template_內容，這可以拿來針對不同的客戶端裝置，提供不同的內容，例如利用`request.user_agent`來自動偵測電腦、手機和平板裝置：

```
class ApplicationController < ActionController::Base

before_action :detect_browser

private

def detect_browser
  case request.user_agent
    when /iPad/i
      request.variant = :tablet
    when /iPhone/i
      request.variant = :phone
    when /Android/i && /mobile/i
      request.variant = :phone
    when /Android/i
      request.variant = :tablet
    when /Windows Phone/i
      request.variant = :phone
    else
      request.variant = :desktop
   end
end
```

接著在需要支援的_action_中，加上

```
def index
  # ...
  respond_to do |format|
    format.html
    format.html.phone
    format.html.tablet
  end
end
```

_Template_的命名則是_index.html+phone.erb_和_index.html+tablet.erb_。

## [](#更多線上資源)更多線上資源

-   [Action Controller Overview](http://guides.rubyonrails.org/action_controller_overview.html)

* * *
