> Before software can be reusable it first has to be usable. - Ralph Johnson

## [](#websocket-簡介)WebSocket 簡介

由於 HTTP 的限制，早期瀏覽器要作即時通訊，有各種奇技淫巧 [Polling, Comet, Long Polling](http://ryanlu-blog.logdown.com/posts/207766-polling-comet-long-polling-websocket) 等等，直到瀏覽器支援的標準出現 WebSocket 才開始進入正軌。

[WebSocket](https://en.wikipedia.org/wiki/WebSocket) 通訊協定可以讓瀏覽器和伺服器，進行持續性的雙向連線溝通。目前支援程度還不錯 [Can I use?](http://caniuse.com/#feat=websockets)

-   一些故事 [Realtime Web Apps 2015](http://duncanhsieh.github.io/presentation-realtime-web-apps-2015/)
-   [websocketd](http://websocketd.com/) Quick Demo

![image](https://heroku-blog-files.s3.amazonaws.com/1462551364-http-protocol.png)

![image](https://heroku-blog-files.s3.amazonaws.com/1462551384-websocket-protocol.png)

(圖示來源 [https://blog.heroku.com/real\_time\_rails\_implementing\_websockets\_in\_rails\_5\_with\_action\_cable](https://blog.heroku.com/real_time_rails_implementing_websockets_in_rails_5_with_action_cable))

但由於需要與 Server 端進行持續性的連線，對於原本採用 Process-Based 設計的 Rails 比較不適合，因此會將這部分的元件拆出去，解法有：

-   將即時通訊的部分拆出去成為獨立的 Ruby 元件，獨立於 Rails 處理一般 HTTP requests 流量的 Process 之外，詳見下一節。
-   整套改成用其他程式語言，例如 Node.js 有
    -   [http://sailsjs.org/](http://sailsjs.org/) (Rails-like MVC, integrated with [socket.io](http://socket.io/))
    -   [https://www.meteor.com/](https://www.meteor.com/) (Full-stack, including websocket)

> 另一個與 WebSocket 類似功能的網路標準是 [SSE](https://en.wikipedia.org/wiki/Server-sent_events)，但是功能比較少只能單向，而且跨瀏覽器支援度又不好，雖然 Rails 有內建(因為對 server 比較好實作)但很少人使用。

## [](#認識-pubsub-訂閱模型)認識 Pub/Sub 訂閱模型

[Publish–subscribe pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) 發布/訂閱設計模式是一種在即時通訊上很常用的架構，可以將通訊拆成發布方和訂閱方，發布方非同步地將訊息傳送給不定數量的訂閱方。Pub/Sub 部分可以從你的主應用 Process 外，獨立出來成為一個單獨的運作元件。

### [](#pubsub-middleware)Pub/Sub middleware

附帶有 Pub/Sub 功能的資料庫：

-   Redis
-   PostgreSQL

或是專門的 Message Queue 軟體中的一個功能：

-   [RabbitMQ](https://www.rabbitmq.com/getstarted.html)
-   第三方服務 [AWS SQS](https://aws.amazon.com/sqs/)
-   第三方服務 [Google Pub/Sub](https://cloud.google.com/pubsub/)

### [](#pubsub-模型--websocket-的-ruby-框架)Pub/Sub 模型 + WebSocket 的 Ruby 框架

-   https://faye.jcoglan.com/
-   Rails 5 內建的 ActionCable

### [](#第三方服務-pubsub--websocket)第三方服務 Pub/Sub + WebSocket

-   https://pusher.com/
-   https://www.pubnub.com/

## [](#rails-5-actioncable-簡介和安裝)Rails 5: ActionCable 簡介和安裝

因為越來越多的即時通訊需求，Rails 在 5.0 之後新增的 ActionCable 元件來支援 WebSocket，整合了後端 Rails 和前端 JavaScript 呼叫介面，可以很方便的開發即時通訊的應用。

[ActionCable 官方文件](https://github.com/rails/rails/tree/master/actioncable)

![image](https://heroku-blog-files.s3.amazonaws.com/1462551406-rails-rack.png)

(圖示來源 [https://blog.heroku.com/real\_time\_rails\_implementing\_websockets\_in\_rails\_5\_with\_action\_cable](https://blog.heroku.com/real_time_rails_implementing_websockets_in_rails_5_with_action_cable))

### [](#安裝方式)安裝方式

-   升級 Rails5 並使用 `gem "puma"`，不能用 webrick 了
-   安裝 Redis

  brew install redis
  brew services start redis

-   修改 config/cable.yml 把 async 都改成用 redis
-   修改 config/application.rb 加上 `config.action_cable.mount_path = '/cable'`
-   修改 app/assets/javascripts/application.js 要載入 cable.js

## [](#actioncable-應用)ActionCable 應用

即時聊天室是最常見的應用，讓我們用這個例子來舉例。

### [](#單一公開聊天室)單一公開聊天室

WebSocket 雖然支援雙向通訊，但是在實作上最重要需要即時的部分，其實只有接收資料。送資料給 Server 其實不一定需要走 WebSocket 連線，也可以用 Ajax。以下兩篇教學文章，剛好分別用了不同的方式來實作：

方法一：送出的部分沿用 ajax request，如同 [Real-Time Rails: Implementing WebSockets in Rails 5 with Action Cable](https://blog.heroku.com/real_time_rails_implementing_websockets_in_rails_5_with_action_cable) 這篇教學

方法二：送出的部分也走 websocket 路線，如同 [Create a Chat App with Rails 5, ActionCable, and Devise](https://www.sitepoint.com/create-a-chat-app-with-rails-5-actioncable-and-devise/) 這篇教學

範例程式: [https://github.com/ihower/rails-exercise-ac9/tree/rails5](https://github.com/ihower/rails-exercise-ac9/tree/rails5)

![image](https://heroku-blog-files.s3.amazonaws.com/1462551420-redis-messages.png)

> 在 ActionCable 中可以用 partial template 在 server-side 回傳給瀏覽器，這樣就可以重用伺服器的 erb template。

注意到用 WebSocket 連線，如果瀏覽器有跳頁的話，是會重新連線的。這就是為什麼 SPA(Single-Page Application) 的形式比較適合做即時通訊，在那個應用頁面中，所有的操作都是用 Ajax，這就才不會跳頁。而在 Rails 中則是搭配了 Turbolinks 的 Ajax 換頁效果，才不會每頁都重連 Websocket (什麼? 你聽我在 Ajax 一章的建議已經拆除 Turbolinks 了??)

### [](#多個聊天室整合-devise-認證broadcast-的部分改成用-activejob)多個聊天室、整合 Devise 認證、Broadcast 的部分改成用 ActiveJob

參考 [Create a Chat App with Rails 5, ActionCable, and Devise](https://www.sitepoint.com/create-a-chat-app-with-rails-5-actioncable-and-devise/) 這篇教學

當 Broadcast 的呼叫是發生在一般 request/response lifecycle 時，建議改放在 ActiveJob 裡，因為需要通知的用戶可能很多。

### [](#其他常見的即時通訊應用)其他常見的即時通訊應用

-   使用者在線狀態
-   1 對 1 通訊
    -   [Build a Messaging System with Rails and ActionCable](https://www.sitepoint.com/build-a-messaging-system-with-rails-and-actioncable/) Part 1
    -   [Real-Time Messaging with Rails and ActionCable](https://www.sitepoint.com/rails-and-actioncable-adding-advanced-features/) Part 2
-   即時通知
-   各種狀態更新，例如非同步操作的完成通知
-   即時資料更新，例如 facebook 留言
-   同步協作，例如 Trollo
-   即時遊戲

### [](#其他-actioncable-沒有幫你作的事情)其他 ActionCable 沒有幫你作的事情

參考 [https://blog.ably.io/rails-5-actioncable-the-good-and-bad-parts-1b56c3b31404](https://blog.ably.io/rails-5-actioncable-the-good-and-bad-parts-1b56c3b31404)

Abrupt failures can corrupt state, no ACK/NACK support, Message Ordering 等等都是沒有保證的

例如如果你重新整理一下網頁，WebSocket 會重新連線，那這中間斷掉時間發布的新訊息，你就不會收到。

## [](#actioncable-佈署)ActionCable 佈署

-   修改 config/environments/production.rb 加上 production 網址 `config.action_cable.allowed_request_origins = ["https://foobar.com"]`
    -   Rails 5.0.1 之後變預設了 [ActionCable now permits same-origin connections by default](https://github.com/rails/rails/commit/dae404473409fcab0e07976aec626df670e52282)
-   記得裝 Redis `sudo apt-get install redis-server`
-   websocket server 可以跟 rails process 放一起，也可以分開。前者比較簡單，但後者可以分開 scale-up。
    -   要拆開的話，砍掉 `config.action_cable.mount_path` 這個設定，改成設定 `config.action_cable.url` 。但是如果拆開的 domain 和 port 不同的話，本來可以順便用 cookie 做認證可能會有問題，因為 cookie 不會送來，你可以改 `config/initializers/session_store.rb` 多一個參數是 `domain: :all` 或 `domain: ["your_website.example.com", "your_ws.example.com"]` 將 session cookie 擴大到跨 subdomain 都可以吃的到。
-   Passenger 和 Nginx 設定
    -   [https://www.phusionpassenger.com/library/config/nginx/action\_cable\_integration/](https://www.phusionpassenger.com/library/config/nginx/action_cable_integration/)
-   CloudFlare 也有支援，但沒有講清楚到底可以接受多少連線數量
    -   [https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-CloudFlare-with-WebSockets](https://support.cloudflare.com/hc/en-us/articles/200169466-Can-I-use-CloudFlare-with-WebSockets)
-   iOS 當然也可以接 websocket，可以 google 看看 “ios websocket”
-   [Websocket Shootout: Clojure, C++, Elixir, Go, NodeJS, and Ruby](https://hashrocket.com/blog/posts/websocket-shootout) 在一個 Process 下的效能 benchmark，很遺憾 Rails ActionCable 的效能敬陪末座。若依照 每mb的連線數 重新排序:
    -   C++ 55
    -   Node.js 43
    -   Go 30
    -   Clojure 18
    -   Elixir: 13
    -   Ruby: 3
    -   JRuby: 2
-   [AnyCable](https://evilmartians.com/chronicles/anycable-actioncable-on-steroids) 可以關注看看，用其他語言的實作來取代 Rails 的 Websocket Server

* * *
