## [](#4-1-什麽是-sql)4-1 什麽是 SQL

在 Rails 中我們利用 ActiveRecord 語法來操作資料庫的資料，例如查詢所有活動：

`@events = Event.all`

這段 Ruby 代碼，實際上會被轉成資料庫語言 [SQL](https://zh.wikipedia.org/zh-cn/SQL) 來對資料庫做查詢 ：

`SELECT "events".* FROM "events"`

在 Rails log 中，只要對資料庫做任何 CRUD 操作，都會是一個 SQL，例如這些都是 SQL

![image](https://ihower.tw/rails/part2/05-web-security/images/4-1.png)

> 之後會有資料庫課程教各位理解資料庫原理和 SQL，理解 SQL 就可以做出比較複雜的數據分析功能，可以把 ActiveRecord 數據查詢用的更好。

## [](#4-2-什麽是-sql-injection-攻擊)4-2 什麽是 SQL Injection 攻擊?

在實際的網站應用中，我們會將用戶輸入的參數，動態地組合出 SQL 來對資料庫查詢。例如：

`@registrations = Registration.where( :status => params[:status] )`

就會根據用戶瀏覽器傳過來的 `params[:status]` 參數不同，而組合出不同的 SQL 句子。假如參數 `params[:status]` 是 `pending`，那這個 SQL 句就會是：

`SELECT "registrations".* FROM "registrations" WHERE "registrations"."status" = 'pending'`

## [](#實際攻擊示範)實際攻擊示範

在本課程的範例中，有一個功能是關鍵字查詢留言，請瀏覽至任一個活動頁面：

![image](https://ihower.tw/rails/part2/05-web-security/images/4-2.png)

按下 Search 按鈕後，對應的處理代碼在 `app/controllers/events_controller.rb` 中的 show action:

```
  @comments = @comments.where( "comments.content LIKE '%#{params[:keyword]}%'")
```

這段 ActiveRecord 語法會被轉成如以下的 SQL 句：

```
SELECT "comments".* FROM "comments" WHERE "comments"."event_id" = ? AND (comments.content LIKE '%這是搜尋關鍵字%')  [["event_id", 95]]
```

很不幸的，這種寫法存在 SQL Injection 漏洞，用以下的關鍵字就可以進行攻擊，刪除所有留言數據：

```
sorry'); DELETE * FROM comments; --
```

![image](https://ihower.tw/rails/part2/05-web-security/images/4-3.png)

按下 Search 按鈕後，悲慘的事情就發生了，所有留言都被刪除了 😳😳😳😳😳

這是怎麽辦到的？我們把攻擊的關鍵字代入 SQL 句子，就會變成：

`SELECT "comments".* FROM "comments" WHERE "comments"."event_id" = ? AND (comments.content LIKE '%sorry'); DELETE * FROM comments; --%') [["event_id", 95]]`

這會被資料庫解讀成三個 SQL 句子：

1.  `SELECT "comments".* FROM "comments" WHERE "comments"."event_id" = ? AND (comments.content LIKE '%sorry');`
2.  `DELETE * FROM comments;`
3.  `--%') [["event_id", 95]]`

其中第二句就達成刪除的效果，第三句的 `--` 是 SQL 的註解。

由此可知，SQL Injection 資料庫注入攻擊可以破壞我們的資料庫、修改數據資料、跳過登入密碼檢查等等，是非常有破壞力的攻擊行為。

## [](#4-3-如何防禦-sql-注入攻擊-)4-3 如何防禦 SQL 注入攻擊 ？

跟防禦 XSS 一樣的道理，所有用戶傳進來要代入 SQL 的參數，都必須加以逸出：

```
-  @comments = @comments.where( "comments.content LIKE '%#{params[:keyword]}%'")

+  keyword = ActiveRecord::Base::connection.quote_string( params[:keyword] )
+  @comments = @comments.where( "comments.content LIKE '%#{keyword}%'")

```

不過代入用戶參數的情景實在太常見了，在 Rails 會通常會用特別的寫法來指定 SQL 條件，讓 Rails 能夠知道哪一部分需要逸出：

```
-  @comments = @comments.where( "comments.content LIKE '%#{params[:keyword]}%'")
+  @comments = @comments.where( "comments.content LIKE ?", "%#{params[:keyword]}%")

```

其中 `?` 代表要代入的參數。

最後的 SQL 句子變成：

```
SELECT "comments".* FROM "comments" WHERE "comments"."event_id" = ? AND (comments.content LIKE '%sorry''); DELETE * FROM comments; --%')  [["event_id", 95]]
```

其中 `sorry')` 變成 `sorry'')` 了，這樣資料庫就知道這此單引號不是結束的單引號。

> 你可以再測試看看還會不會有這個漏洞，送出後會先看到沒有任何資料是正常的，因為查不到任何留言是符合關鍵字。請迴首頁再進來，留言還是正常沒有被刪除掉。

另一種常見的寫法是用 Hash，例如

```
@registrations = Registraion.where( "status = '#{params[:status]}' ) # 自己組字串，這不安全，有 SQL 注入漏洞

@registrations = Registraion.where( :status => params[:status] ) # Hash 寫法，這是安全的
@registrations = Registraion.where( "status = ?", params[:status] ) # Array 寫法，這是安全的

```

## [](#4-4-漏網之魚)4-4 漏網之魚

上一節中我們示範了在 `where` 語法中，用 Hash 或 Array 寫法可以自動做逸出。但是在 ActiveReocrd 中，還有一些方法並沒有幫我們做逸出，包括 `order`、`pluck` 等等，詳見 [Rails SQL Injection](https://rails-sqli.org)。

所以當我們需要將用戶傳過來的參數傳進去時，除了逸出之外，也可以採用白名單的過濾方式。

在範例中，可以根據用戶指定的順序來做排序：

![image](https://ihower.tw/rails/part2/05-web-security/images/4-4.png)

用戶可以點不同連結來進行排序，會傳不同 `sort` 參數。用戶傳過來的參數都是不可以信任的，用戶大可以直接修改網址就可以傳任意參數進來 🙀🙀🙀

請修改 `app/controllers/events_controller.rb`，我們只能允許特定的查詢參數：

```
-  if params[:sort] # 本來這樣有漏洞，你太相信用戶傳進來的參數了
+  if params[:sort] && ["id DESC", "id ASC"].include?(params[:sort])  # 只有白名單內的參數可以用
    @comments = @comments.order(params[:sort])
  end

```

* * *
