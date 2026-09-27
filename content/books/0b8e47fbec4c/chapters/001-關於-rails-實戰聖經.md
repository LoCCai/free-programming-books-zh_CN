## [](#ruby-on-rails-實戰聖經)Ruby on Rails 實戰聖經

## [](#關於本書)關於本書

我是 [ihower](https://ihower.tw)，本書介紹 [Ruby on Rails](http://rubyonrails.org) 這套開放原始碼的網站開發框架。

內容涵蓋了 Ruby on Rails 大部分的常用功能以及介紹，本書拆分成數個部分：

-   Part 1 為入門導覽，實作一個活動管理系統。這部分有二十六集的[教學系列影片 (Youtube)](https://www.youtube.com/watch?v=As4mjYMznPY&feature=youtu.be&list=PLo1BzMywo4MkpcVN2Qfjiopr0_GL5CgYN)涵蓋 Part1 的所有內容。影片是我在 [ALPHA Camp](https://tw.alphacamp.co) Bootcamp 時期拍攝的(當時的 Rails 版本是 4.2)。
    
-   Part 2: 是我在[北京全棧營](https://fullstack.qzy.camp/)時期製作的 Step by Step 教材(當時的 Rails 版本是 5.0)，現已免費開放(感謝 xdite)。當初是針對中國大陸的學生寫的簡體版本，這裡重新編排和更新內容。
    
-   Part 3: 深入介紹 Rails 的各種元件和進階主題
    
-   Git 版本控制: 現代軟體開發必備工具
    
-   應用程式開發基礎: 給初學者的基礎電腦科學知識，包括程式語言、資料庫、網路概論等等內容。
    

由於本書寫作時間跨越 Rails 3.2 至 Rails 6，因此有些截圖和最新版本不同，也不保證所有步驟能夠相容於最新版本，若有已知問題會補充說明。另外內容有些繁簡電腦術語([對照表](https://ihower.tw/rails/chinese.html))混用，還請多多見諒。

勘誤請來信 [\[email protected\]](https://ihower.tw/cdn-cgi/l/email-protection#fc9594938b998ebc9b919d9590d29f9391)。

## [](#關於作者)關於作者

張文鈿，網路上的代號為 ihower，曾擔任日本 [RubyKaigi](http://rubykaigi.org/2011/en/schedule/details/17M05)、中國 [RubyConf China](http://rubyconfchina.org)、台灣 [RubyConf Taiwan](https://rubyconf.tw/)、[COSCUP](http://coscup.org) 歷屆講者。2006年開始接觸 Rails，從此愛上 Ruby 這個極具豐富樂趣及高生產力的程式語言，並於2018年成立[愛好資訊科技有限公司](https://aihao.tw)。

歡迎追蹤 Twitter 帳號 [@ihower](https://twitter.com/ihower) 和部落格 [https://ihower.tw](https://ihower.tw)

## [](#訂閱電子報)訂閱電子報

歡迎訂閱 [Rails 實戰聖經](https://ihower.tw/opt-in/rails)，不定時發送。

## [](#telegram-社群)Telegram 社群

歡迎加入[愛好 Rails 公開群](https://t.me/joinchat/J8m4Oh2VgZ9kODM1)，分享討論 Ruby on Rails 相關技術。

![](https://ihower.tw/rails/images/telegram.png)

## [](#目標讀者)目標讀者

本書的目標讀者為網站開發工程師(Web Application Developer)，比較不適合完全沒有網頁開發經驗的朋友，在學習 Rails 前，最好對以下知識有基本認識：

-   基本的程式設計能力，了解什麼是變數、控制流程、迴圈、函式、陣列等等
-   HTML/CSS 網頁設計
-   對網路通訊協定 HTTP 有基礎認識
-   對 RDBMS 關聯式資料庫和 SQL 語法有基本了解
-   基本的指令列操作 (CLI: Command line interface)，Unix-like 作業系統為佳

如果您有 PHP/MySQL、Node.js、ASP、JSP 等網頁應用程式開發經驗，相信這些對您應該不陌生。 若您沒有這些經驗知識，可以先參考本書的[應用程式開發基礎](https://ihower.tw/cs/index.html)章節。

## [](#本書想要涵蓋的重要新功能但還沒空寫)本書想要涵蓋的重要新功能，但還沒空寫

-   Active Storage: Rails 內建的檔案上傳儲存功能
    -   [Rails Guides: Active Storage Overview](https://guides.rubyonrails.org/active_storage_overview.html)
    -   若上傳的檔案是公開，無需登入就可下載的，則不建議用 Active Storage，改用 [carrierwave](https://github.com/carrierwaveuploader/carrierwave) 會比較簡單。若你上傳的檔案是需要登入檢查權限才能下載的，比較適合用 Active Storage 方案
-   [Action Text](https://guides.rubyonrails.org/action_text_overview.html): Rails 內建的 Rich Editor
    -   搭配 Active Storage 可做檔案上傳
    -   但他的設計特點是用獨立的 DB table 來存放文字資料，而不是在本來的 model 用一個欄位存。例如你有 Post, Article models，都想加個 description 資料，但他的設計是都會存在 action\_text\_rich\_texts 這個 table 裡面，而不是放在 posts, articles table 的 description 欄位。此設計在不同情境下有好有壞。
-   [Zeitwerk](https://guides.rubyonrails.org/autoloading_and_reloading_constants.html) autoloading 自動載入模式
    -   [Rails autoloading — now it works, and how!](https://www.urbanautomaton.com/blog/2020/11/04/rails-autoloading-heaven/)

## [](#本書不涵蓋的功能)本書不涵蓋的功能

筆者認為用不到或不好用的功能：

-   [Webpacker](https://github.com/rails/webpacker): 與 Rails 整合在一起的 webpack 前端打包工具
    -   可參考 [高見龍的如何在 Rails 使用 Webpacker系列](https://kaochenlong.com/2019/11/21/webpacker-with-rails-part-1/)
    -   但 Rails 7 後已經拆掉棄用 Webpacker 了，參考 [Rei: Rails 7 前端方案前瞻](https://geeknote.net/Rei/posts/286)
-   [Hotwire](https://hotwired.dev/): 包括 Turbo 和 Stimulus
    -   Rails 7 之後取代了 [Rails UJS](https://github.com/rails/rails/tree/main/actionview/app/assets/javascripts)，成為 Rails 新的內建 Ajax 解決方案
    -   不過我認為前端用原來的 rails-ujs 方案搭配 Vue.js 比較好，詳見[我的演講分享](https://ihower.tw/blog/archives/10995) 和 [Rails 前端打包工具組合 (2022版)](https://ihower.tw/blog/archives/11006)
-   Encrypted Credentials: 原本的 secrets.yml 方法比較簡單好用
-   Active Record 的 has\_secure\_token: 用 Devise gem 就好了
-   Active Record 的 enums: 資料就用 string 儲存就好了，可讀性比較高
-   Action Mailbox: 很少會做收信功能
-   Action Cable: 開發起來是蠻方便的，但是 Ruby 伺服器不太適合做 real-time 應用，因此不敢上 production 實用。除非 WebSockets 伺服器要換成用 [AnyCable](https://anycable.io/)
-   Rails 內建的 Testing: 本書和大多數人都會改用 RSpec 來寫測試
-   Routing Concern, Shallow 用法: 不必要，沒用到
-   ActionController 的 Live Streaming: 就是 [Server-Sent Events](https://caniuse.com/eventsource) 方案。但是要做 real-time 的話會優先考慮更多人用的 WebSockets 方案。
-   Action Mailer Previews: 本書改用 letter\_opener gem
-   Rails API-only 模式: 這麼做就浪費 Rails server-side rendering 的強項了
-   Multiple database support: 沒用到

## [](#線上參考資源英文)線上參考資源(英文)

-   [Rails Guides](http://guides.rubyonrails.org/)
-   [Ruby API Documentation](http://www.ruby-doc.org/)
-   [Rails API Documentation](http://api.rubyonrails.org/)

* * *
