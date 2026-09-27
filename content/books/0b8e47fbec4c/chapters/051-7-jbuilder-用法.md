### [](#7-1-前言)7-1 前言

通常在 Web API 中，這幾個 POST/PATCH/DELETE 操作的回傳值都很簡單，我們可以在 controller 裡面用 `render :json` 就解決了。但是 GET 拿資料可能會很複雜，因為資料欄位很多。這裡介紹使用 [JBuilder](https://github.com/rails/jbuilder) 來定義 JSON 格式的作法，這是一個 Rails 預設就安裝的 gem，你可以在 `Gemfile` 中看到它。

### [](#7-2-修改-train-api)7-2 修改 train API

新增 `app/views/api/v1/trains/show.json.jbuilder` 檔案，這就是 JBuilder 樣板，用來定義 JSON 長什麽樣子：

```

json.number @train.number
json.available_seats @train.available_seats
json.created_at @train.created_at

```

修改 `app/controllers/api/v1/trains_controller.rb`，拿掉 `render :json` 的部分：

```

 def show
   @train = Train.find_by_number!( params[:train_number] )

-    render :json => {
-      :number => @train.number,
-      :available_seats => @train.available_seats
-    }
 end

```

用瀏覽器瀏覽 `http://localhost:3000/api/v1/trains/0822` 確認正常。

### [](#7-3-修改-trains-api-輸出-array-資料)7-3 修改 trains API 輸出 array 資料

新增 `app/views/api/v1/trains/index.json.jbuilder`

```
json.data do
  json.array! @trains do |train|
    json.number train.number
    json.train_url api_v1_train_url(train.number)
  end
end

```

修改 `app/controllers/api/v1/trains_controller.rb`，拿掉 `render :json` 的部分：

```
   def index
     @trains = Train.all
-    render :json => {
-      :data => @trains.map{ |train|
-        { :number => train.number,
-            :train_url => api_v1_train_url(train.number)
-        }
-      }
-    }
   end

```

用瀏覽器瀏覽 `http://localhost:3000/api/v1/trains` 確認正常。

### [](#7-4-可以使用-partial-樣板)7-4 可以使用 partial 樣板

我們發現上述的 `index.json.jbuilder` 和 `show.json.jbuilder` 非常相像，因為都是描述 `train`，這時候我們可以來使用 partial 樣板的功能。

新增 `app/views/api/v1/trains/_item.json.jbuilder`

```

json.number train.number
json.available_seats train.available_seats
json.created_at train.created_at

```

修改 `app/views/api/v1/trains/show.json.jbuilder`

```
- json.number @train.number
- json.available_seats @train.available_seats
- json.created_at @train.created_at

+ json.partial! 'item', train: @train

```

修改 `app/views/api/v1/trains/index.json.jbuilder`

```
 json.data do
-  json.array! @trains do |train|
-    json.number train.number
-    json.train_url api_v1_train_url(train.number)
-  end

+  json.array! @trains, :partial => "item", :as => :train

 end

```

用瀏覽器瀏覽 `http://localhost:3000/api/v1/trains` 和 `http://localhost:3000/api/v1/trains/0822` 依舊正常。

### [](#7-5-輸出分頁資料)7-5 輸出分頁資料

`GET /api/v1/trains` 這個 API 我們並沒有做分頁，如果資料量很多的話，會需要一個分頁的機制，不然客戶端會一次下載太多資料。

首先讓我們加上分頁的 Gem，請修改 `Gemfile`

```

   # ...(略)
+  gem 'will_paginate'

```

執行 `bundle` 然後重啟伺服器。

修改 `app/controllers/api/v1/trains_controller.rb`

```

  def index
-   @trains = Train.all
+   @trains = Train.paginate( :page => params[:page] )
  end

```

修改 `app/views/api/v1/trains/index.json.jbuilder`

```
+ json.meta do
+   json.current_page @trains.current_page
+   json.total_pages @trains.total_pages
+   json.per_page @trains.per_page
+   json.total_entries @trains.total_entries

+   if @trains.current_page == @trains.total_pages
+     json.next_url nil # 最後一頁就沒有下一頁了
+   else
+     json.next_url api_v1_trains_url( :page => @trains.next_page )
+   end

+   if @trains.current_page == 1
+     json.previous_url nil # 第一頁就沒有上一頁
+   else
+     json.previous_url api_v1_trains_url( :page => @trains.previous_page )
+   end
+ end

json.data do
  json.array! @trains, :partial => "item", :as => :train
end

```

這裡新增了一個 meta 雜湊，來描述總共有多少頁、多少筆、下一頁、上一頁等等資訊。

> 因為列車資料不夠多，我們可以進 `rails c` 輸入 `100.times { |i| Train.create( :number => "T#{i}" ) }` 就會產生一百筆資料。

![image](https://ihower.tw/rails/part2/03-web-api/images/trains-paging.png)

繼續瀏覽 `http://localhost:3000/api/v1/trains?page=2` 就會到第二頁。

### [](#7-6-新增-train-logo-圖片)7-6 新增 Train Logo 圖片

在繼續下一節之前，我們希望 train 能有 Logo 圖片

執行 `rails g uploader train_logo`

執行 `rails g migration add_train_logo_to_trains train_logo:string`

執行 `rake db:migrate`

編輯 `app/models/train.rb`，插入一行：

```
    # ...(略)
+   mount_uploader :train_logo, TrainLogoUploader

```

因為現有的 train 資料並沒有圖片，我們可以進 `rails console`，然後執行

```
t = Train.first
t.train_logo = open("https://aihao.tw/images/ac-logo.png")
# 或是你本機電腦上的一張圖片 t.train_logo = open("/Users/your_username/Pictures/your_image.png")

t.save
```

就會存一張圖片了。

編輯 `app/views/api/v1/trains/_item.json.jbuilder` 加入圖片資訊：

```

  json.number train.number

+ if train.train_logo.present?
+   json.logo_url asset_url( train.train_logo.url )
+   json.logo_file_size train.train_logo.size
+   json.logo_content_type train.train_logo.content_type
+ else
+   json.logo_url nil
+   json.logo_file_size nil
+   json.logo_content_type nil
+ end

 json.available_seats train.available_seats
 json.created_at train.created_at

```

瀏覽 `http://localhost:3000/api/v1/trains` 會得到：

![image](https://ihower.tw/rails/part2/03-web-api/images/train-with-logo.png)

### [](#7-7-修改-reservations-api)7-7 修改 reservations API

延續上一節，假設客戶端手機App上我的訂票頁面，除了顯示我的訂票之外，也想要顯示 train 的 logo。那麽根據目前的 Web API 設計，會需要發送多個 HTTP request 請求才能顯示 train 圖片，例如：

```
GET /api/v1/reserveations   # 假設拿到三張票分別是 0822, 0606, 0826
GET /api/v1/train/0822      # 拿 train logo
GET /api/v1/train/0606      # 拿 train logo
GET /api/v1/train/0826      # 拿 train logo
```

手機的網路速度是不快的，每多發送一次請求，就很耗時間。因此我們會希望減少需要請求的次數。因此我們要修改 `GET /api/v1/reservations` 的回傳 JSON，順便回傳完整 train 資料就好了：

修改 `app/controllers/api/v1/reservations_controller.rb`，把 `render :json` 拆除

```

   def index
     @reservations = current_user.reservations

-    render :json => {
-      :data => @reservations.map { |reservation|
-        {
-          :booking_code => reservation.booking_code,
-          :train_number => reservation.train.number,
-          :seat_number => reservation.seat_number,
-          :customer_name => reservation.customer_name,
-          :customer_phone => reservation.customer_phone
-        }
-      }
-    }

   end

  def show
    @reservation = Reservation.find_by_booking_code!( params[:booking_code] )

-   render :json => {
-     :booking_code => @reservation.booking_code,
-     :train_number => @reservation.train.number,
-     :seat_number => @reservation.seat_number,
-     :customer_name => @reservation.customer_name,
-     :customer_phone => @reservation.customer_phone
-   }
  end

```

新增 `app/views/api/v1/reservations/_item.json.jbuilder`

```

json.booking_code reservation.booking_code
json.train_number reservation.train.number
json.train do
  json.partial! 'api/v1/trains/item', train: reservation.train
end
json.seat_number reservation.seat_number
json.customer_name reservation.customer_name
json.customer_phone reservation.customer_phone

```

新增 `app/views/api/v1/reservations/show.json.jbuilder`

```

json.partial! 'item', reservation: @reservation

```

新增 `app/views/api/v1/reservations/index.json.jbuilder`

```

json.data do
  json.array! @reservations, :partial => "item", :as => :reservation
end

```

最後的結果會是：

![image](https://ihower.tw/rails/part2/03-web-api/images/reservation-with-train.png) 這樣客戶端就只需要一個 request 就能拿到需要的資料了。

* * *
