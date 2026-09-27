本章的目的是讓讀者可以從一個完整的_Rails_專案中學習：

## [](#job-board)Job Board

_[Ruby Jobs in Taiwan](http://jobs.ruby.tw)_是一個簡單的_Job Board_系統，原始碼開放在_[Github](https://github.com/rubytaiwan/jobs.ruby.tw)_上，功能包括：

1.  使用者註冊、登入、登出。使用 [Devise Gem](https://github.com/plataformatec/devise)
2.  使用者可以張貼工作，並設定工作的張貼期限
3.  使用者可以編輯、下架、刪除自己張貼的工作

功能雖然簡單，但是包含了_Model spec_、_Controler spec_和_Acceptence Test_可供學習。

## [](#簡易論壇系統)簡易論壇系統

-   開發一個簡易論壇系統。系統要有 Forum 與 Post 兩個 Model，寫出 CRUD 介面，並且文章網址是使用 http://forum.local/forums/1/posts/2 這種表示。
-   可以使用 http://http://getbootstrap.com/ 套版
-   使用者必須能夠 註冊 / 登入，登入後才可以發表 Post，不然只能瀏覽。只有自己的 Post 才能進行修改與刪除。請使用 devise gem。
-   論壇的文章要能夠分頁，每一頁 20 筆，每一個論壇要秀出現在論壇裡有多少文章數量。請使用 [Kaminari Gem](https://github.com/amatsuda/kaminari)。
-   可依照文章時間排序，請使用 Model 的 scope 功能。
-   每篇文章可以上傳附件。請使用 [Paperclip Gem](https://github.com/thoughtbot/paperclip/)。
-   建立一個後台，讓管理員可以刪改所有文章，網址是 http://forum.local/admin/。只有身分是 admin 的人可以進後台。admin 的判別方是 column 裡加一個 boolean，判斷是否是 admin。
-   用 Rake 撰寫的產生假資料的步驟。執行 rake dev:fake 即會產生假文章與假論壇。

* * *
