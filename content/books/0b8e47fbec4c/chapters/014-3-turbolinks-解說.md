## [](#3-1-turbolinks-坑)3-1 Turbolinks 坑

[Turbolinks](https://github.com/turbolinks/turbolinks) 是一個 Rails 內建的頁面加速工具，在 `Gemfile` 和 `application.js` 可以發現它的蹤跡。這是一個 Javascript 套件會在換頁的時候，不重新載入 HTML 的 `head`，只載入新的 `body`，來加速換頁。

雖然有加速的效果，但是卻很干擾其他 `javascript` 源碼的載入：

### [](#第一個坑)第一個坑

網上所有 jQuery 的教學文章，都是用`$(document).ready(function(){...})` 或`$(function(){...})`，在 HTML 載入完畢後執行 js 源碼。但是用了 Turbolink 只會觸發第一次而已，換頁時不會再執行。

在 1-4 中我們示範了 `$(document).ready` 用法，如果你點超連結去別的頁面，然後再點回來，會發現那段 JavaScript 就不會執行了。

解法：有用到 `$(document).ready(function(){...})` 的地方都要改成用 `$(document).on("turbolinks:load", function(){...})`

### [](#第二個坑)第二個坑

單頁(page-specific)才用到的 javascript 代碼，如果寫在 `body` 裡面，跳頁回來時，會觸發兩次。某些 js code 重復執行兩次沒關系，但有些會有問題。

解法一：關掉 Turbolinks 的快取功能，把 `<meta name="turbolinks-cache-control" content="no-cache">` 放到 layout 的 `head` 裡面。

解法二：把layout 的`<body>` 改成`<body id="<%= "#{controller_name}-#{action_name}"%>">`，這樣就可以在全局載入的 `application.js` 中指定只有這一頁才執行的js code，例如：

```
  $(document).on("turbolinks:load", function() {
    if ( $("#products-show").length > 0 ) {
      console.log("product-show");
    }
  })
```

如果同學們還沒有寫到 jQuery 效果或用到 jQuery Plugins 的話，可能還沒感覺。

如果你不想處理或無法理解這兩個坑的原因，我建議你拆除 Turbolinks 來迴避這些坑。

## [](#3-2-拆除-turbolinks)3-2 拆除 Turbolinks

如果你的 JavaScript 有以下症狀：

症狀一: 重新整理 JavaScript 就正常，點別頁再點回來，就不正常(沒加載執行或重復執行兩遍)

症狀二: 若您將 JavaScript 放在網頁最底層才載入，這會跟 Turbolinks 的設計沖突，造成異常。

請進行拆除 Turbolinks 的步驟：

修改 `Gemfile`，拿掉 turbolinks：

```

-  # Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
-  gem 'turbolinks', '~> 5'

```

修改 `app/assets/javascripts/application.js`，拿掉 turbolinks 的加載：

```

-  //= require turbolinks

```

修改 `app/views/layout/application.html.erb`，拿掉 turbolinks 屬性：

```
-  <%= javascript_include_tag 'application', 'data-turbolinks-track': 'reload' %>
+  <%= javascript_include_tag 'application' %>

```

執行 `bundle`，重啟伺服器。

* * *
