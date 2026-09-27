## [](#5-1-目標)5-1 目標

> 這一章依賴 Web API 設計實作 課程，如果你還沒有完成，請先回去完成或先跳過。

跟上一章講到驗收測試，並且提到了自動化測試 HTML 的局限性。接下來我們來談談 Web API 的自動化測試。

和 HTML 不同，Web API 的 JSON 可以完全被程序自動驗證(後端工程師歡呼!)。因此寫自動化測試，可以完全取代用 Postman 手動測試的過程，連瀏覽器都不需要打開。

在前後端團隊分離的公司裡面(前端包括 iOS、Android 或 Web App)，所謂的後端工程師就是專門提供這些 Web API 給前端使用，並透過自動化測試來驗證結果和保證質量。

## [](#5-2-安裝-rspec-rails)5-2 安裝 rspec-rails

接下來請回到 Web API 設計實作 課程的訂票專案。

編輯 Gemfile

```
  group :development, :test do

+   gem 'rspec-rails'
    gem 'byebug', platform: :mri

end

```

執行 `rails g rspec:install`

執行 `rm -rf test`

執行 `git add` 和 `git commit "Add Rspec"`

## [](#5-3-測試註冊-api)5-3 測試註冊 API

Web API 測試的重點是：

1.  檢查回傳的 HTTP 狀態碼
2.  檢查回傳的 JSON
3.  檢查資料真的有被新建、修改或刪除

新增 `spec/requests/auth_spec.rb`

```
require 'rails_helper'

RSpec.describe "API_V1::Auth", :type => :request do

  example "register" do
    post "/api/v1/signup", params: { :email => "[email protected]", :password => "12345678"}

    expect(response).to have_http_status(200)

    # 檢查資料庫中真的有存進去
    new_user = User.last
    expect(new_user.email).to eq("[email protected]")

    # 檢查回傳的 JSON
    expect(response.body).to eq( { :user_id => new_user.id }.to_json )
  end

  example "register failed" do
    post "/api/v1/signup", params: { :email => "[email protected]" }

    # 測試沒有傳密碼，註冊失敗的情形
    expect(response).to have_http_status(400)

    expect(response.body).to eq( { :message => "Failed", :errors => {:password => ["can't be blank"]}  }.to_json )
  end

```

> `example` 和 `it` 的作用是一樣的

執行 `rspec spec/requests/auth_spec.rb` 測試通過。

兩個測試案例分別測試成功和失敗的情形。

## [](#5-4-測試登入登出-api)5-4 測試登入登出 API

編輯 `spec/requests/auth_spec.rb`

```
  require 'rails_helper'

  RSpec.describe "API_V1::Auth", :type => :request do

  # (略)...

+  before do
+    @user = User.create!( :email => "[email protected]", :password => "12345678")
+  end
+
+  example "valid login and logout" do
+    post "/api/v1/login", params: { :email => @user.email, :password => "12345678" }
+
+    expect(response).to have_http_status(200)
+    # 檢查回傳的 JSON
+    expect(response.body).to eq(
+      {
+        :message => "Ok",
+        :auth_token => @user.authentication_token,
+        :user_id => @user.id
+      }.to_json
+    )
+
+    post "/api/v1/logout"
+    expect(response).to have_http_status(401)
+
+    post "/api/v1/logout", params: { :auth_token => @user.authentication_token }
+    expect(response).to have_http_status(200)
+    old_token = @user.authentication_token
+    @user.reload
+    # 檢查登出後 `authentication_token` 會改掉
+    expect(@user.authentication_token).not_to eq(old_token)
+  end
+
+  example "invalid auth token login" do
+    post "/api/v1/login", params: { :email => @user.email, :password => "xxx" }
+
+    # 檢查登入失敗回傳 401
+    expect(response).to have_http_status(401)
+    expect(response.body).to eq(
+      { :message => "Email or Password is wrong" }.to_json
+    )
+  end

  end

```

兩個測試案例測試登入成功和登入失敗。

## [](#5-5-測試查詢列車-api)5-5 測試查詢列車 API

新增 `spec/requests/train_spec.rb`

```
require 'rails_helper'

RSpec.describe "API_V1::Trains", :type => :request do

  before do
    @train1 = Train.create!( :number => "0822")
    @train2 = Train.create!( :number => "0603")
  end

  example "GET /api/v1/trains" do
    get "/api/v1/trains"

    expect(response).to have_http_status(200)

    expected_result = {
      "meta": {
        "current_page": 1,
        "total_pages": 1,
        "per_page": 30,
        "total_entries": 2,
        "next_url": nil,
        "previous_url": nil
      },
      "data": [
        { "number": @train1.number,
          "logo_url": nil,
          "logo_file_size": nil,
          "logo_content_type": nil,
          "available_seats": ["1A","1B","1C","2A","2B","2C","3A","3B","3C","4A","4B","4C","5A","5B","5C","6A","6B","6C"],
          "created_at": @train1.created_at },
        { "number": @train2.number,
          "logo_url": nil,
          "logo_file_size": nil,
          "logo_content_type": nil,
          "available_seats": ["1A","1B","1C","2A","2B","2C","3A","3B","3C","4A","4B","4C","5A","5B","5C","6A","6B","6C"],
          "created_at": @train2.created_at }
      ]
    }
    expect(response.body).to eq( expected_result.to_json )
  end

  example "GET /api/v1/trains/{train_number}" do
    get "/api/v1/trains/0822"

    expect(response).to have_http_status(200)

    expected_result = { "number": @train1.number,
          "logo_url": nil,
          "logo_file_size": nil,
          "logo_content_type": nil,
          "available_seats": ["1A","1B","1C","2A","2B","2C","3A","3B","3C","4A","4B","4C","5A","5B","5C","6A","6B","6C"],
          "created_at": @train1.created_at }

    expect(response.body).to eq( expected_result.to_json )
  end

end

```

## [](#5-6-測試查詢訂票修改定票取消訂票-api)5-6 測試查詢訂票、修改定票、取消訂票 API

新增 `spec/requests/reservation_spec.rb`

```
require 'rails_helper'

RSpec.describe "API_V1::Reservations", :type => :request do

  before do
    @train1 = Train.create!( :number => "0822")
    @train2 = Train.create!( :number => "0603")

    @user = User.create!( :email => "[email protected]", :password => "12345678" )
    @reservation = Reservation.create!( :train_id => @train1.id, :seat_number => "1A",
                                        :customer_name => "foo", :customer_phone => "12345678" )
  end

  example "GET /api/v1/reservations/{booking_code}" do
    get "/api/v1/reservations/#{@reservation.booking_code}"

    expect(response).to have_http_status(200)
    expect(response.body).to eq( { :booking_code => @reservation.booking_code,
                                   :train_number => @reservation.train.number,
                                   :train => {
                                     :number => @train1.number,
                                     :logo_url => nil,
                                     :logo_file_size => nil,
                                     :logo_content_type => nil,
                                     :available_seats => ["1B","1C","2A","2B","2C","3A","3B","3C","4A","4B","4C","5A","5B","5C","6A","6B","6C"],
                                     :created_at => @train1.created_at
                                   },
                                   :seat_number => @reservation.seat_number,
                                   :customer_name => @reservation.customer_name,
                                   :customer_phone => @reservation.customer_phone
                                  }.to_json )
  end

  example "DELETE /api/v1/reservations/{booking_code}" do
    delete "/api/v1/reservations/#{@reservation.booking_code}"

    expect(response).to have_http_status(200)

    expect(response.body).to eq( { :message => "已取消定位" }.to_json )
    expect( Reservation.count ).to eq(0)
  end

  example "PATCH /api/v1/reservations/{booking_code}" do
    patch "/api/v1/reservations/#{@reservation.booking_code}", :params => { :customer_name => "bar", :customer_phone => "987654321" }

    expect(response).to have_http_status(200)

    expect(response.body).to eq( { :message => "更新成功" }.to_json )

    @reservation.reload

    expect( @reservation.customer_name ).to eq("bar")
    expect( @reservation.customer_phone ).to eq("987654321")
  end

end

```

## [](#5-7-測試訂票-api)5-7 測試訂票 API

編輯 `spec/requests/reservation_spec.rb`

```

+  describe "POST /api/v1/reservations" do
+    example "success without auth_token" do
+      post "/api/v1/reservations", :params => { :train_number => @train1.number, :seat_number => "1B",
+                                                :customer_name => "zoo", :customer_phone => "55555555"}
+
+      expect(response).to have_http_status(200)
+
+      created_reservation = Reservation.last
+
+      expect(response.body).to eq( { :booking_code => created_reservation.booking_code,
+                                     :reservation_url => api_v1_reservation_url(+created_reservation.booking_code) }.to_json )
+
+      expect(created_reservation.customer_name).to eq("zoo")
+      expect(created_reservation.customer_phone).to eq("55555555")
+      expect(created_reservation.user_id).to eq(nil)
+    end
+
+    example "success with auth_token" do
+      post "/api/v1/reservations", :params => { :auth_token => @user.authentication_token,
+                                                :train_number => @train1.number, :seat_number => "1B",
+                                                :customer_name => "zoo", :customer_phone => "55555555"}
+
+      expect(response).to have_http_status(200)
+
+      created_reservation = Reservation.last
+
+      expect(response.body).to eq( { :booking_code => created_reservation.booking_code,
+                                     :reservation_url => api_v1_reservation_url(+created_reservation.booking_code) }.to_json )
+
+      expect(created_reservation.customer_name).to eq("zoo")
+      expect(created_reservation.customer_phone).to eq("55555555")
+      expect(created_reservation.user_id).to eq(@user.id)
+    end
+
+    example "failed" do
+      post "/api/v1/reservations", :params => { :train_number => @train1.number, :seat_number => "1A", +:customer_name => "zoo", :customer_phone => "55555555"}
+
+      expect(response).to have_http_status(400)
+
+      expect(response.body).to eq( { :message => "訂票失敗", :errors => { :seat_number => ["has already been +taken"] } }.to_json )
+    end
+  end

```

訂票其實有三種情況，分別是 1. 有登入帶 `auth_token` 訂票 2. 沒登入訂票 3. 訂票失敗(因為座位重復)

> 在 Web API 課程中比較早完成的同學，做到這裡你可能會測試失敗，因為之前在 `app/models/reservation.rb` 中是寫 `belongs_to :user` 這表示 `user` 是必填，需要改成 `belongs_to :user, :optional => true` 讓 user 是選填。

## [](#5-8-測試查詢我全部的訂單-api)5-8 測試查詢我全部的訂單 API

編輯 `spec/requests/reservation_spec.rb`

```
+  describe "GET /api/v1/reservations" do
+    example "failed" do
+      get "/api/v1/reservations", :params => {  }
+      expect(response).to have_http_status(401)
+    end
+
+    example "success" do
+
+      @reservation1 = Reservation.create!( :user_id => @user.id, :train_id => @train1.id, :seat_number => "1B",
+                                           :customer_name => "foo", :customer_phone => "12345678" )
+      @reservation2 = Reservation.create!( :user_id => @user.id, :train_id => @train1.id, :seat_number => "1C",
+                                           :customer_name => "foo", :customer_phone => "12345678" )
+
+      get "/api/v1/reservations", :params => { :auth_token => @user.authentication_token }
+
+      expect(response).to have_http_status(200)
+      expect(response.body).to eq( { :data => [
+                                      { :booking_code => @reservation1.booking_code,
+                                        :train_number => @reservation1.train.number,
+                                         :train => {
+                                           :number => @train1.number,
+                                           :logo_url => nil,
+                                           :logo_file_size => nil,
+                                           :logo_content_type => nil,
+                                           :available_seats => ["2A","2B","2C","3A","3B","3C","4A","4B","4C","5A","5B","5C","6A","6B","6C"],
+                                           :created_at => @train1.created_at
+                                         },
+                                         :seat_number => @reservation1.seat_number,
+                                         :customer_name => @reservation1.customer_name,
+                                         :customer_phone => @reservation1.customer_phone
+                                      },
+                                    { :booking_code => @reservation2.booking_code,
+                                        :train_number => @reservation2.train.number,
+                                         :train => {
+                                           :number => @train1.number,
+                                           :logo_url => nil,
+                                           :logo_file_size => nil,
+                                           :logo_content_type => nil,
+                                           :available_seats => ["2A","2B","2C","3A","3B","3C","4A","4B","4C","5A","5B","5C","6A","6B","6C"],
+                                           :created_at => @train1.created_at
+                                         },
+                                         :seat_number => @reservation2.seat_number,
+                                         :customer_name => @reservation2.customer_name,
+                                         :customer_phone => @reservation2.customer_phone
+                                      }
+                                  ] }.to_json )
+
+
+    end
+  end

```

這裡測試兩種情況 1. 沒有登入帶 `auth_token` 的話，會失敗 2. 成功查詢我的訂票

## [](#5-9-測試查詢和更新我的資料-api)5-9 測試查詢和更新我的資料 API

新增 `spec/requests/user_spec.rb`

> 補充使用 Rails 6+ 的同學，請在 rails\_helper 中的 RSpec.configure 加上 config.include ActionDispatch::TestProcess 的設定。才可以使用 fixture\_file\_upload 這個方法。

```
require 'rails_helper'

RSpec.describe "API_V1::Users", :type => :request do

  before do
    @user = User.create!( :email => "[email protected]", :password => "12345678")
  end

  example "GET /me" do
    get "/api/v1/me", params: { :auth_token => @user.authentication_token }

    expect(response).to have_http_status(200)

    @user.reload

    expect(response.body).to eq(
       {
        :email => @user.email,
        :avatar => @user.avatar,
        :updated_at => @user.updated_at,
        :created_at => @user.created_at
      }.to_json )
  end

  it "PATCH /me" do
    # 上傳檔案，請放一個圖檔在 spec/fixtures 目錄下
    file = fixture_file_upload("#{Rails.root}/spec/fixtures/rails.png", "image/png")

    patch "/api/v1/me", params: { :auth_token => @user.authentication_token, :email => "[email protected]", :avatar => file }

    expect(response).to have_http_status(200)

    expect(response.body).to eq( { :message => "OK" }.to_json )

    @user.reload

    expect(@user.email).to eq("[email protected]")
    expect(@user.avatar).not_to eq(nil)
  end

end
```

* * *
