> 本章內容與 [Part 2-3 Web API 設計實作](https://ihower.tw/rails/fullstack-web-api-introduction.html)有些重複，可以先去看 Part 2-3。

> Good code is its own best documentation. As you’re about to add a comment, ask yourself, ‘How can I improve the code so that this comment isn’t needed?’ Improve the code and then document it to make it even clearer. – Steve McConnell, Code Complete 作者

-   設計 Web APIs 的用途包括：
    -   提供給手機 iOS, Android 應用程式的 Web API
    -   提供 JavaScript MVC application 的 Web API
    -   建立 API 平台，開放 APIs 給第三方開發者使用

> Rails 5.0 提供了 API mode 可以產生一個 Rails 專案**「只 Only」**作為 API server，但這是不必要的，除非你想擠一點效能出來，但是你會關掉整個 ActionView。

## [](#router-路由實作)Router 路由實作

拆開到 /api/v1，例如：

```
scope :path => '/api/v1/', :module => "api_v1", :as => 'v1', :defaults => { :format => :json } do
  resources :topics
end
```

-   Why? 保持 API Versioning 相容性，因應不隨意變更 API 格式
-   也有人偏好不用 resources 語法，乖乖一條條將路由規格列出來。因為每個 API 都需要列出來與 client 端合作，寫文件時仍會一條條列出來。

## [](#controller-實作)Controller 實作

-   和路由一樣也是拆開，因為 API 需求跟 server-rending HTML 會差很多，例如 params 參數設計的格式就長的很不一樣，後者會搭配 ActionView 的 Form helper 變成 `params[:event][:name]`，前者則偏好簡單設計成 `params[:name]`
-   也因此 business logic 盡量重構到 Model，這樣才可以提高 code reusability
-   新加 ApiController 與 ApplicationController 拆開：因為不需要防禦 CSRF，認證方式也不同：

```
# app/controllers/api_controller.rb
class ApiController < ActionController::Base
  skip_before_action :verify_authenticity_token
end
```

-   新增 API 專用的 Controller，並繼承上述的 ApiController。例如 `rails g controller api_v1::events`

```
# app/controllers/api_v1/events_controller.rb
class ApiV1::EventsController < ApiController
end
```

-   使用正確的 HTTP Status Code
    -   例如 `render :json => { :message => "your error message" }, :status => 400`
-   Response Format 採用 JSON。但是要如何產生 JSON 格式呢? 有幾種方法:
    -   to\_json 方法
        -   超級簡單，直接在 controller 裡面就可以 render :json => obj.to\_json
        -   彈性低，不好擴充。比較適合簡單的情況，例如 `400` 時。
    -   jbuilder 方式: https://github.com/rails/jbuilder
        -   也是 Rails 內建
        -   template 裡面可以根據不同條件組合，例如有登入沒登入
        -   可拆 partial，彈性高
    -   serializer 方式: https://github.com/rails-api/active\_model\_serializers
        -   需額外安裝 gem
-   Request Format 支援哪些? (Client 端用什麼格式送出資料?)
    -   Rails 支援 application/x-www-form-urlencoded、multipart/form-data 和 application/json
    -   [四種常見的POST 提交數據方式](https://imququ.com/post/four-ways-to-post-data-in-http.html)
    -   Rails 可以吃 form data 也可以吃 JSON
    -   瀏覽器表單是用 application/x-www-form-urlencoded，如果有檔案上傳(在 form attribute 加上 enctype=”multipart/form-data” 則改用 multipart/form-data。
    -   JSON 不能做檔案上傳，檔案上傳要用 multipart/form-data

## [](#jbuilder-錦囊妙計)jBuilder 錦囊妙計

重點包括：

-   如何輸出 array 資料
-   可以使用 partial template 作 re-use
-   如何輸出使用者上傳檔案(例如用 paperclip) 的網址
-   如何輸出分頁 paging 的資料，加上總共有幾頁等資訊
-   如何處理 inline relationship 資料

## [](#api-的自動化測試)API 的自動化測試

手動測試的方式，參考 [https://ihower.tw/cs/web-apis.html#sec3](https://ihower.tw/cs/web-apis.html#sec3)

-   寫 RSpec Request 測試，不然很難測試非 GET 的操作
-   測試中 Ruby Hash 的 symbol key 轉 JSON 再轉回來，key 會變成字串
-   測試中若要比對 Ruby Time 時間物件和 `JSON.parse` 出來的時間物件，前者要多轉一次 `as_json`，不然會差一點。

## [](#上述範例)上述範例

-   實作 [https://github.com/ihower/rails-exercise-ac8/blob/master/app/views/api\_v1/topics/index.json.jbuilder](https://github.com/ihower/rails-exercise-ac8/blob/master/app/views/api_v1/topics/index.json.jbuilder)
-   測試 [https://github.com/ihower/rails-exercise-ac8/blob/master/spec/requests/api\_v1/topics\_spec.rb](https://github.com/ihower/rails-exercise-ac8/blob/master/spec/requests/api_v1/topics_spec.rb)

## [](#實作-web-apis-使用者認證)實作 Web APIs 使用者認證

不像瀏覽器有 cookie，每個 request 都必須帶有我們自行設計的 token 參數，我們才可以識別使用者。

首先是 Model 部分，主要新增一個欄位 `authentication_token` 欄位，並用 Devise.friendly\_token 產生亂數 token:

產生 Migration，指令是 `rails g migration add_token_to_users`

```
class AddTokenToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :authentication_token, :string
    add_index :users, :authentication_token, :unique => true

    User.find_each do |u|
      puts "generate user #{u.id} token"
      u.generate_authentication_token
      u.save!
    end
  end
end
```

修改 User Model 加上`generate_authentication_token`方法：

```
class User < ApplicationRecord
  #.....
  before_create :generate_authentication_token

  def generate_authentication_token
     self.authentication_token = Devise.friendly_token
  end
end
```

接著我們在 ApiController 上實作 `before_action :authenticate_user_from_token!` ，如果有帶`auth_token`就進行登入(但這裡沒有強制一定要登入)：

```
class ApiController < ActionController::Base
  before_action :authenticate_user_from_token!

    def authenticate_user_from_token!

    if params[:auth_token].present?
      user = User.find_by_authentication_token( params[:auth_token] )

      # Devise: 設定 current_user
      sign_in(user, store: false) if user
    end
  end
end
```

如果是強制一定要登入的`action`，用法跟之前 Device 一樣，例如以下整個 EventsController 就一定要登入了，不然會回傳錯誤：

```
class ApiV1::EventsController < ApiController

  before_action :authenticate_user!

end
```

上述的部分也可以安裝現成的套件 [https://github.com/gonzalo-bulnes/simple\_token\_authentication](https://github.com/gonzalo-bulnes/simple_token_authentication)

接下來實作 API 的登入和登出，讓使用者可以用帳號密碼，或是 facebook access\_token 來登入，來換得上述的 `authentication_token`。也就是 `POST /api/v1/login` 先用 email 帳號密碼登入，拿到 auth\_token：

-   實作 Controller Code: [https://github.com/ihower/rails-exercise-ac7/blob/master/app/controllers/api\_v1/auth\_controller.rb](https://github.com/ihower/rails-exercise-ac7/blob/master/app/controllers/api_v1/auth_controller.rb)
-   實作 Model Code: [https://github.com/ihower/rails-exercise-ac7/blob/master/app/models/user.rb#L24](https://github.com/ihower/rails-exercise-ac7/blob/master/app/models/user.rb#L24) (透過 get\_fb\_data 這個方法去驗證用戶傳過來的 facebook token 是否正確)
-   測試 Request Spec: [https://github.com/ihower/rails-exercise-ac7/blob/master/spec/requests/auth\_spec.rb](https://github.com/ihower/rails-exercise-ac7/blob/master/spec/requests/auth_spec.rb)

用戶端拿到 auth\_token 後，之後的每個 request 都必須帶入 auth\_token。

上述的作法是整合 Devise 和 omniauth-facebook，如果不想整合 Devise 的話，也可以自己把 `current_user` 做出來，例如這份 [Example code](https://github.com/ihower/social-exercise-ac3/blob/master/app/controllers/api_controller.rb)

## [](#其他議題)其他議題

-   [API Rate Limit](https://github.com/kickstarter/rack-attack)

* * *
