\# 5. Unobtrusive JavaScript

## [](#5-1-jquery-ujs-解說)5-1 jquery-ujs 解說

Rails 的 `:remote => true` 的這個功能，在 Rails 是透過 [jquery-ujs](https://github.com/rails/jquery-ujs) 這個 gem 所提供的，你可以在 `Gemfile` 中找到它，以及在 `app/assets/javascripts/application.js` 裡面加載了 `//= require jquery_ujs`。

之所以叫 UJS 是因為全名叫做 Unobtrusive JavaScript。那麽什麽是 Unobtrusive 呢？用個範例來說吧，以下代碼會將超連結改成用表單DELETE送出，並且用一個提示視窗來作確認：

```
link_to 'Remove', post_path(1), :method => :delete, :data => { :confirm => "Sure?" }
```

在 Rails 3 以前的版本，會輸出：

```
<a onclick="if (confirm('Sure?')) { var f = document.createElement('form'); f.style.display = 'none'; this.parentNode.appendChild(f); f.method = 'POST'; f.action = this.href;var m = document.createElement('input'); m.setAttribute('type', 'hidden'); m.setAttribute('name', '_method'); m.setAttribute('value', 'delete'); f.appendChild(m);f.submit(); };return false;" href="/events/1">Remove</a>
```

看起來有點複雜，其實只是透過 onclick 屬性把 JavaScript 代碼寫在裡面。

在 Rails 3 之後，則會輸出：

```
<a rel="nofollow" data-confirm="Sure?" data-method="delete" class="delete" href="/events/1">Remove</a>
```

然後在 jquery\_ujs 的 JavaScript 庫裡面會檢查 DOM 裡面有 `data-confirm` 和 `data-method` 的超連結，再去綁訂事件。

Unobtrusive 的概念就是將 JavaScript 代碼與 HTML 分開，除了可以讓 HTML 碼乾凈之外，也可以支援更換不同的 JavaScript 庫。

jquery-ujs 的功能包括了：

-   讓超連結可以用 :method 參數支援非 GET 方法
-   用超連結、按鈕和表單可以用 `:remote => true` 支援 Ajax
-   超連結、按鈕和表單可以用 `:data => { :confirm => "Are you sure? }` 參數，跳出確認對話視窗
-   送出按鈕可以用 `:data => { :disable_with => "Please wait..." }` 參數在送出表單時暫時關閉按鈕避免重復送出
-   在 Layout 的 head 中有輸出一段 `<%= csrf_meta_tag %>` 的作用也是搭配給 UJS 使用的，這會讓 jQuery 的 $ajax 送出時附帶 CSRF 表單安全驗證碼，我們會在之後的網路安全一章討論到什麽是CSRF。

總之，如果 jquery-ujs 沒有順利加載的話，不只 `:remote => true` 不能用，所有非 GET 方法的超連結會壞掉，會變成 GET 出去。另外還有 Devise 的登出按鈕因為用了 `:method => :delete` 也會無法作用。

* * *
