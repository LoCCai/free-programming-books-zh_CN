## [](#課程介紹)課程介紹

這一門課將介紹常見的網路攻擊和 Ruby on Rails 的防禦手法，以及一些網路安全的知識點。包括

-   XSS 跨站腳本攻擊
-   CSRF 跨站請求偽造
-   SQL Injection 資料庫註入攻擊
-   Mass Assignment 大量賦值
-   Cookie-bases Session 破解加密
-   DoS 拒絕服務攻擊
-   Tools 安全檢查工具
-   密碼是如何存儲的？認識雜湊函數
-   HTTPS 加密連線和非對稱加密

## [](#1-前言與案例準備)1\. 前言與案例準備

## [](#1-1-前言)1-1 前言

為了讓大家可以快速開始進行攻擊，請在 Github 上 Fork 這個專案：[https://github.com/ihower/hackme-app](https://github.com/ihower/hackme-app)，然後 Clone 回去。

Fork 後，請依序執行：

`git clone [[email protected]](https://ihower.tw/cdn-cgi/l/email-protection):你的帳號/hackme-app.git`

`cd hackme-app`

`bin/setup`

`bundle exec rake dev:fake`

在這個專案中，已經裝好了 Devise、Bootstrap、RSpec，並且建立好了以下功能：

-   用戶登入、登出
-   用戶可以瀏覽不同活動
-   用戶可以針對活動留言
-   管理員可以針對特定留言，進行高亮(Highlight)顯示
-   用戶可以瀏覽商品
-   用戶可以將商品加入購物車

執行 `rails server`

接著打開瀏覽器 http://localhost:3000

資料庫中已經有三個用戶：

帳號: `[[email protected]](https://ihower.tw/cdn-cgi/l/email-protection)` 密碼: `12345678` 說明: 這是你，超級駭客

帳號: `[[email protected]](https://ihower.tw/cdn-cgi/l/email-protection)` 密碼: `12345678` 說明: 這是要被駭的路人

帳號: `[[email protected]](https://ihower.tw/cdn-cgi/l/email-protection)` 密碼: `12345678` 說明: 這是要被駭的網站管理員

請瀏覽看看前臺其中一個活動頁面：

![image](https://ihower.tw/rails/part2/05-web-security/images/1-3.png)

## [](#1-2-法律警告)1-2 法律警告

本課程的目的是為了讓大家能夠更好的保護自己，瞭解駭客是如何攻擊的，進而瞭解 Rails 是如何進行防禦的。所謂「害人之心不可有，防人之心不可無」，看到別人家裡沒鎖門，不代表你可以進去破壞或偷東西。這在每個國家都是犯法的行為！你可以善意地提醒人家沒鎖門，但是千萬不要自以為是越過法律的界線喔。

* * *
