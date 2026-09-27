> A language that doesn’t affect the way you think about programming is not worth knowing. - Alan Perlis

–

> Rails 前端打包工具，近年來變化較大，詳見 [Blog文章(2022版)](https://ihower.tw/blog/archives/11006) 說明。

> 本章 Asset Pipeline 內容有個摘要版本在[這裡](https://github.com/ihower/jdstore)。

_Assets_指的是_JavaScript_、_Stylesheets_和圖檔等靜態檔案，這些檔案並不會隨_Requests_不同而有所不同。而在_Rails_目錄中，只有_public_這個目錄是公開讀取的，所以通常我們會將靜態檔案都放在_public_這個目錄下，好讓瀏覽器可以直接讀取。但是隨著_JavaScript_和_Stylesheet_檔案越來越多時，如何管理這些檔案變為一項議題，為了加快瀏覽器的下載速度，我們會合併_JavaScript_和_Stylesheet_檔案，來減少瀏覽器_Request_下載次數。更進一步的還會壓縮這些檔案來加速下載時間。像是_Yahoo!_和_Google_都有各自開源出自己的壓縮工具_[YUI Compressor](http://developer.yahoo.com/yui/compressor/)_和_[Closure Compiler](https://code.google.com/closure/compiler/)_。

而_Rails_的_Assets pipeline_可以讓我們突破_public_目錄限制，可以將靜態檔案依需求放在不同目錄下，_Rails_會幫你組合並壓縮起來。特別是有一些_Rails_的外掛套件需要使用_JavaScript_等靜態檔案，在沒有這個功能之前，我們必須將_JavaScript_等檔案複製放在_public_目錄下，這樣瀏覽器才能讀取的到。

_Assets_的位置在_app/assets/_下，首先最重要的就是_app/assets/javascripts/application.js_和_app/assets/stylesheets/application.css_，這兩個檔案看起來充滿註解，其實它是個_manifest_檔案，列出了所有要載入的靜態檔案，這些檔案的位置依照慣例放在_app/assets_或_vendor/assets_目錄下。

讓我們先看看_application.js_

```
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
```

其中的`require jquery`和`require jquery_ujs`會載入_JQuery_和_Rails_的_JQuery adapater_，這是因為我們在_Gemfile_中有裝_jquery-rails_這個套件，所以這裡可以讀取的到。`require turbolinks`在上一章有提到。而`require_tree .`會載入這個目錄下的所有_JavaScript_檔案。總之，這個_manifest_的最後輸出結果就是通通壓縮成一個_application.js_檔案。

同理_application.css_也是一樣載入所有_stylesheets_目錄下的_CSS_檔案，最後壓縮成_application.css_：

```
/*
 * This is a manifest file that'll be compiled into application.css, which will include all the files
 * listed below.
 *
 * Any CSS and SCSS file within this directory, lib/assets/stylesheets, vendor/assets/stylesheets,
 * or vendor/assets/stylesheets of plugins, if any, can be referenced here using a relative path.
 *
 * You're free to add application-wide styles to this file and they'll appear at the bottom of the
 * compiled file so the styles you add here take precedence over styles defined in any styles
 * defined in the other CSS/SCSS files in this directory. It is generally better to create a new
 * file per style scope.
 *
 *= require_tree .
 *= require_self
 */
```

> 實務上不喜歡用 `require_tree` 的方式來一次載入全部的 css 和 javascript，而是喜歡逐條 `require`載入，一來比較清楚，二來也可以確保 css 和 javascript 載入的順序是正確的。另外也不喜歡用 `require_self` 將 css 寫在 `application.css` 裡面，我們應該放到另一個檔案再 `require` 它即可。

讓我們看看_View_，在_Layout_檔案中：

```
<%= stylesheet_link_tag    "application" %>
<%= javascript_include_tag "application" %>
```

因為最後輸出都壓縮成一個檔案了，所以這裡只需要載入_application.css_和_application.js_。

除了`require_tree`之外，還有其他的用法，你都可以使用絕對或是相對路徑來指定檔案位置，副檔名可有可無：

-   `require` \[路徑\]:載入某支特定檔案，如果這支檔案被載入多次，Sprockets 也會很聰明的只幫你載入一次。
-   `require_tree` \[路徑\] : 會將路徑下包含子目錄的檔案全部載入。
-   `require_self` \[路徑\] : 告訴 Sprockets 再載入其他的檔案前，先將自己的內容插入。

你可以看 [Sprockets 的官方說明](https://github.com/rails/sprockets) 來獲得更多的資訊。

另外，在_Rails_中的_assets_目錄其實有三個：

-   `app/assets`(放置我們自己為了自己的程式所寫的 js、css 或是 images)
-   `lib/assets`(可以放我們自己寫的 js 和 css library)
-   `vendor/assets`(放一些我們從別的地方借用的 assets，例如說一些 jQuery 的套件)

這三個目錄，在預設情況下這三個資料夾的東西是共通的(因為都會被打包成一個檔案)，你可以把你的 rails app 跑起來後在 `http://localhost:3000/assets/application.js` 中看到你所有的 js 都在這支檔案中，css 同理亦然，你可以在 terminal 中輸入 `Rails.application.config.assets.paths` 來查看所有的 assets 路徑。你可以發現，除了原本我們剛剛說的三個 assets 目錄之外，還出現了包含在我們 GemFile 中的 jquery，這代表你的 assets 現在也可以包成 gem 來用，如果你有很多個 projects 常重複使用一些共通的 assets，不妨考慮包成 gem 來使用，方便又愉快。

### [](#支援-preprocessor-預處理)支援 Preprocessor 預處理

放在_app/assets_目錄下的_Assets_，_Rails_支援使用不同的語法，例如使用_[Sass](http://sass-lang.com/)_語法產生_CSS_、_[CoffeeScript](http://coffeescript.org/)_產生_JavaScript_，或是用_ERb_樣板也可以。使用的方法是將附檔名命名成_.sass_、_.scss_、_.coffee_、_.css.erb_或_.js.erb_，_Rails_就會編譯出結果給瀏覽器。

_Sass_是一種_CSS3_語法的擴充，可以使用巢狀、變數、混入、選擇子繼承等等功能，可以更有效率有彈性的撰寫_Stylesheet_。_Sass_最後會編譯出合法的_CSS_讓瀏覽器使用。使用上它區分成兩種形式的語法_scss_和_sass_，前者可以與現有的_css_程式碼直接混合在一起，後者則透過縮排來省略了大括號`{}`(就像_Python_用縮排一樣)。_CoffeeScript_也是類似原理，它是一種迷你的程式語言，編譯之後會輸出可讀性高、符合_[JavaScript Lint](http://www.javascriptlint.com/)_規範的_JavaScript_程式碼。

學習這兩種新語法需要額外的時間投入，但是對需要常常撰寫_CSS_和_JavaScript_的設計師來說，應該是很不錯的工具，讀者可以自行斟酌是否採用。

## [](#安裝-bootstrap-樣式)安裝 Bootstrap 樣式

[Bootstrap](https://getbootstrap.com/) 是一個目前非常流行的前端框架，非常適合作為團隊開發時，前端、後端開發者當作預設的前端框架。

這裡我們使用 [boostrap-sass](https://github.com/twbs/bootstrap-sass) 這個官方的 gem，安裝步驟如下：

-   編輯 Gemfile 加上 `gem 'bootstrap-sass'`，然後 `bundle`
-   將 `app/assets/stylesheets/application.css` 改成 `app/assets/stylesheets/application.scss`，這是因為 Bootstrap 使用 Sass 語法，內容如下
    
    ```
      @import "bootstrap-sprockets";
      @import "bootstrap";
      @import "bootstrap/theme";  // this is optional
    ```
    

這裡 `@import` 的作用等同於本來的 `require`，會載入該 css 檔案編譯成同一份 CSS 檔案。注意結尾是沒有 `.css` 副檔名的，加了反而之後在 production 上會有問題(註)不會載入。另外，結尾一定要有分號 `;`，不然也會出錯。

> 這是因為 CSS 本身也有 `@import` 語法，所以加了 `.css` 後，`@import` 反而就不編譯了，而是直接顯示出例如 `@import "bootstrap.css"`;，瀏覽器看到這個 css 語法會去下載`bootstrap.css`這個檔案，當然是下載不到因為整個 assets pipepline 最後只會編譯出一個 `.css` 檔案，就是 `application-加上一長串digest碼.css`。

-   修改 `app/assets/javascripts/application.js`，在下方加上
    
    ```
    //= require bootstrap-sprockets
    ```
    

這樣我們就安裝好了。

其他參考資料 https://launchschool.com/blog/integrating-rails-and-bootstrap-part-1

## [](#如何處理-image-圖檔)如何處理 image 圖檔

放在_app/assets/images_下的圖片該怎麼使用呢？在實際佈署後，_Rails_會將檔案名稱加以編碼，例如_rails.png_會變成_rails-bd9ad5a560b5a3a7be0808c5cd76a798.png_。這麼做的原因是當圖片有變更的時候，編碼就會不同而有不同的檔名，這樣就可以避免瀏覽器快取到舊的檔案。也因為檔案名稱會變動，所以放在_app/assets/images_下的圖片，要用的時候就沒有辦法寫死檔名。在一般的_View_中，可以使用`image_tag`這個_Helper_：

```
<%= image_tag("rails.png") %>
```

如果在_CSS_裡的話，有兩種辦法：一是將檔案命名為_erb_結尾，例如_app/assets/stylesheets/main.css.erb_，然後使用`asset_path`這個_Helper_：

```
h1 {
  background-image: url('<%= asset_path("rails.png") %>');
}
```

另一種方法是使用_Sass_或_SCSS_語法。其中_SCSS_相容於_CSS_。例如命名為_app/assets/stylesheets/main.scss_，然後使用`image-url`這個_Sass_提供的方法：

```
h1 {
    background-image: image-url("rails.png")
}
```

如果是_js_檔案中想要拿圖片的位置，就只能用_js.erb_的格式，然後內嵌_asset\_path Helper_方法了。

### [](#其他-helper)其他 Helper

Assets 提供了很多路徑 helper 來讓你指向你的 assets，可以在 erb 樣板中使用：

```
audio_path("horse.wav")   # => /audios/horse.wav
audio_tag("sound")        # => <audio src="https://ihower.tw/audios/sound" />
font_path("font.ttf")     # => /fonts/font.ttf
image_path("edit.png")    # => "/images/edit.png"
image_tag("icon.png")     # => <img src="https://ihower.tw/images/icon.png" alt="Icon" />
video_path("hd.avi")      # => /videos/hd.avi
video_tag("trailer.ogg")  # => <video src="https://ihower.tw/videos/trailer.ogg" />
```

Sass 還提供了像是 `-url` 和 `-path` 這樣的 helper 來協助你，因此你可以在 `scss` 樣板中這樣使用：

```
image-url("rails.png")         # => url(/assets/rails.png)
image-path("rails.png")        # => "/assets/rails.png"
asset-url("rails.png", image)  # => url(/assets/rails.png)
asset-path("rails.png", image) # => "/assets/rails.png"
```

## [](#precompile-編譯靜態檔案)Precompile 編譯靜態檔案

開發的時候，_Rails_會自動將_Asset_的壓縮結果快取在_tmp_下，所以開發者不需要特別處理。但是實際正式上線時，最後壓縮的檔案還是必須放在_public_目錄下由網頁伺服器直接提供(或是由CDN)效能較好，以下的_rake_指令可以產生出來：

```
rake assets:precompile
```

產生出來的檔案在_public/assets/_下。

```
rake assets:clobber
```

這樣會刪除。

注意，如果在開發模式下執行了`rake assets:precompile`，那麼因為放在_public/assets/_下的靜態檔案會優先丟給瀏覽器，所以這時候再修改_app/assets_下的原始碼會沒有作用。所以，開發時請記得要刪除這個目錄。

## [](#一些實務技巧)一些實務技巧

### [](#前端套件安裝)前端套件安裝

前端套件五花八門，當我們想要安裝一個第三方前端套件時，會先優先找找看有沒有包成 gem 的合用版本。 如果沒有 gem 或不合用，再手動下載放到 /vendor/assets/下。

不過如果 CSS 裡面有圖片的話，則很可能會有路徑問題，需要手動修理。如果只是 JavaScript 就比較沒有問題。

例如我們想要安裝 [Autosize](http://www.jacklmoore.com/autosize/) 這個 jQuery plugin，但是找到的 [autosize-rails](https://github.com/calebthompson/autosize-rails/) gem 年久失修。因此只好自己手動複製它的程式碼 [autosize.min.js](https://github.com/jackmoore/autosize/blob/master/dist/autosize.min.js)，放到 `vendor/assets/javascripts/autosize.min.js`，然後在 `app/assets/javascript/application.js` 裡面去載入它：

```
//= require autosize.min

$(document).on("turbolinks:load", function(){
  autosize($('textarea'));
});
```

如果該前端套件不需要跟我們的 application.js 壓縮在一起，而且它已經是壓縮過後的版本，也可以考慮就放到 `public` 目錄下，就完全不經過 Asset Pipeline，你可以在 HTML layout 中直接載入它。

### [](#自己的-javascript-程式碼要寫在哪裡)自己的 JavaScript 程式碼要寫在哪裡?

如果只有那一個 HTML template 有用到的 javascript script，我們可以直接塞到該 template 下方：

```
  <script>
    //your js code
  </script>
```

當然這樣的缺點就是它其實沒有經過 Asset Pipeline，當然也就沒有壓縮或預處理的功能。另外，在新版的 Turbolinks 中，因為 Turbolinks 的快取功能，會讓上述放在 body 中的 script 重複執行兩遍，我們在 Ajax 一章的 Turbolinks 一節說明過。

如果是每一頁都會執行，或是共用的 javascript function，我們放進 assets/javascript/ 下。例如編輯 `assets/javascript/application.js` 我們多一個 `common.js` 檔案：

```
  //= require jquery
  //= require jquery_ujs
  //= require turbolinks
  //= require bootstrap-sprockets
  //= require common
```

新增 `assets/javascript/common.js` 檔案，內容例如：

```
  function your_function() {
    // your js code
  }

  $(document).on("turbolinks:load", function(){
   /// you js code
  });
```

另外還有一個小技巧是可以將 js 和 css code 放進 Asset Pipeline 裡面，但是只有特定頁面才會作用(這一招不管 Turbolinks 有沒有移除都適用)。方法是每一頁的 `body` 標籤加上 `id`，修改 `app/views/layout/application.html.erb`：

```
<body id="<%= controller.controller_name %>-<%= controller.action_name %>">
```

這樣如果 `welcome` controller 的 `index` 頁面的話，就會產生出 `<body id="welcome-index">` 的標籤。如此這樣我們的 css 或 javascript 就可以定位了。例如可以在上述的 `assets/javascript/common.js` 寫：

```
$(document).on("turbolinks:load", function() {
  if ( $("#welcome-index").length > 0 ) {
    console.log("this is welcome-index page");
  }
})
```

> Rails 產生 controller 檔案時，也會產生一個同名的 `.coffee` 和 `.scss` 檔案，這沒有什麼實際的用途，它並不是說該 controller 的頁面才會執行該 js 和 css。建議可以砍掉這個檔案，自己安排 js 和 css 的檔案即可。

### [](#自己的-css-程式碼要寫在哪裡)自己的 CSS 程式碼要寫在哪裡?

和上一節類似，我們可以新增一個 `app/assets/stylesheets/style.scss`來放我們自己的 CSS，然後編輯 `app/assets/stylesheets/application.scss` 去載入它：

```
@import "bootstrap-sprockets";
@import "bootstrap";
@import "bootstrap/theme";
@import "style";
```

當然，你可以依照自己的需求去分拆 CSS 檔案，只要在 `app/assets/stylesheets/application.scss` 中依序載入即可。

## [](#如何新增-manifest-檔案-拆成數個壓縮檔)如何新增 manifest 檔案 (拆成數個壓縮檔)?

Rails 預設只會壓 _application.js_和_application.css_ 這兩個 JavaScript 和 CSS 檔案，如果你的網站不大的話就夠用了。不過如果你需要根據不同情境 layout 區分不同的 JavaScript 和 CSS 時，就需要新增 manifest 檔案來拆開，例如區分前台、後台等等。

在上述的_application.js_和_application.css_中，預設會壓縮所有_app/assets_目錄下的檔案，要拆開的話，首先需要修改其中的內容把`require_tree`那行移除，那麼就只會壓縮你所指定的目錄或檔案。

例如，要新增新的_Manifest_檔案的話，假設叫做_app/assets/javascripts/widget.js_，內容如：

```
//= require ./foobar
```

這樣就會將_assets/javascripts/foobar_這個目錄下的檔案通通壓縮成_widget.js_，而在_View_中，加上：

```
<%= javascript_include_tag "widget" %>
```

就會載入這個 widget.js。注意到如果啟用了_assets_功能，`javascript_include_tag`也只能接受一個參數，即_Manifest_檔案的名稱。

為了讓`rake assets:precompile`也能產生新的壓縮檔案，你還需要編輯_config/initializers/assets.rb_加入：

```
Rails.application.config.assets.precompile += %w( widget.js )
```

## [](#更多線上資源)更多線上資源

-   [前端补充知识: Asset Pipeline](https://github.com/ihower/jdstore)
-   [The Asset Pipeline](http://guides.rubyonrails.org/asset_pipeline.html)
-   [SASS Basic](http://asciicasts.com/episodes/268-sass-basics)
-   [CoffeeScript Basics](http://asciicasts.com/episodes/267-coffeescript-basics)

* * *
