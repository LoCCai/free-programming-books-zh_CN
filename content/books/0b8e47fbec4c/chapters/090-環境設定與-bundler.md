> Complication is What Happens When You Try to Solve a Problem You Don’t Understand - Andy Boothe

這一章我們走訪_Rails_的一些設定、Bundler，以及_Command Line_指令的用法。

## [](#目錄結構)目錄結構

這一節讓我們走訪一個 Rails 的目錄結構：

### [](#app)app/

app 目錄是你主要工作的地方，不同子目錄存放了 Models、Controllers、Views、Helpers 和 Assets 等檔案。

### [](#appcontrollers)app/controllers

Controller 的類別檔案存放在這裡

### [](#appmodels)app/models

Model 的類別檔案存放在這裡

### [](#appviews)app/views

View 的樣本(template)檔案，依照不同 Controllers 分子目錄存放。

### [](#apphelpers)app/helpers

Helper 一些在 Views 中可以使用的小方法，用來產生較複雜的 HTML。預設的 Helper 檔案命名是對應 Controller 的，不過並不強制，定義在任一個 Helper 檔案中的方法，都可以在任何 Views 中使用。

### [](#appassets)app/assets

Assets 靜態檔案存放在這裡，包括有_JavaScript_、_Stylesheets_樣式表和_Images_圖檔。詳細的用法會在_Assets_一章中介紹。

### [](#config)config/

雖然 Rails 的原則是慣例優於設定，不過還是有一些需要設定的地方。這個目錄下存放了例如資料庫設定檔 database.yml、路由設定 routes.rb、應用程式設定檔 application.rb 和不同執行環境的設定檔在 config/environments 目錄下。

### [](#db)db/

資料庫 Schema(綱要) 和定義檔 migrations

### [](#lib)lib/

如果你有一些共用的類別或模組檔案，可以放在這裡，然後用_require_載入。例如一個放在_lib/foobar.rb_的類別或模組檔案，可以在要使用的_.rb_檔案中這樣載入：

```
require "foobar"
```

如果放在子目錄_lib/foo/bar.rb_的話：

```
require "foo/bar"
```

### [](#libtasks)lib/tasks

Rake 任務檔案存放在這裡，我們會在 [Rails 錦囊妙計](https://ihower.tw/rails/rails-recipes.html) 一章介紹 Rake。

### [](#log)log/

不同執行環境的 log 檔案會分別記錄在這裡

### [](#public)public/

這個目錄對 Web 伺服器來說，就是文件根目錄(document root)，也就是唯一可以在網路上讀取到的目錄。

### [](#bin)bin/

Rails 的腳本檔案，例如執行_bin/rake_。

### [](#test)test/

單元測試、功能測試及整合測試的檔案。本書會改用_RSpec_做測試，所以這一個目錄會被砍掉。_RSpec_的測試檔案會放在_spec/_目錄下。

### [](#tmp)tmp/

. 用來存放暫時用途的檔案

### [](#vendorassets)vendor/assets

可將第三方的_CSS/JavaScript_函式庫(沒有提供_Gem_安裝版本的)複製一份放在這裡。

### [](#其他根目錄下的檔案)其他根目錄下的檔案

-   config.ru 用來啟動應用程式的 Rack 設定檔
-   Gemfile 設定你的 Rails 應用程式會使用哪些 Gems
-   README.md 你的應用程式使用手冊。你可以用來告訴其他人你的應用程式是做什麼用的，如何使用等等。這會是_Github_上的專案首頁。
-   Rakefile 用來載入可以被命令列執行的 Rake 任務

## [](#多重環境)多重環境

Rails 應用程式預設提供了三種不同的執行模式：

-   development environment 開發模式，用在你的開發的時候
-   test environment 測試模式，用在執行測試程式時
-   production environment 正式上線模式，用在實際的上線運作環境

不同環境的差異在於有不同的設定，除了資料庫設定 database.yml 裡分開設定之外，個別的環境設定放在 config/environments/development.rb、config/environments/test.rb 和 config/environments/production.rb，它們可以有不同的 Log 層級、Session 設定、Email 設定等等。除了預設的這三種模式，我們也可以自定模式，只需要建立對應的檔案即可，例如 config/environments/staging.rb。我們會在下一節詳述這些檔案裡面的設定。

> staging 可以用來表示準上線模式，用來做正式上線前的 QA 測試用途。

因為程式本身是不是寫死是哪一種執行模式，那麼要怎麼區分呢？根據不同情況有不同方法，包括：

根據環境變數 RAILS\_ENV 或 RACK\_ENV 來決定使用哪一種模式，例如使用_rake_時：

```
RAILS_ENV=production bin/rake db:migrate
```

下一節會介紹的_rails_指令根據參數決定:

```
bin/rails console production
bin/rails server -e production
```

最後，應用程式伺服器則看伺服器設定檔，例如_Passenger_裡會設定`RackEnv`參數，佈署一章會詳細介紹。

## [](#rails-指令)Rails 指令

我們已經陸續使用過一些指令了，讓我們看看全部的指令吧：

### [](#generate-可縮寫為-g)generate 可縮寫為 g

產生各種不同類型的檔案，例如

```
bin/rails generate model person
bin/rails g controller people
```

### [](#console-可縮寫為-c)console 可縮寫為 c

開啟一個 Rails 主控台

```
bin/rails console
bin/rails c
```

預設的環境是 developement，如果需要指定環境，請多輸入環境名稱即可，例如：

```
bin/rails c production
```

_Rails_也有提供沙箱模式_(Sandbox)_，任何資料庫的修改都會在離開時回復(原理是資料庫_Transaction_)：

```
bin/rails c --sandbox
```

在主控台中輸入`exit`就會離開。

### [](#server-可縮寫為-s)server 可縮寫為 s

開啟一個 Rails 伺服器

```
bin/rails s
```

預設是使用 Port 3000 和 development 環境，如果需要指定：

```
bin/rails s -p 4000 -e production
```

### [](#new)new

建立一個新 Rails 專案

```
bin/rails new my_app
```

將會建立一個叫做 MyApp 的 Rails 專案在 ./my\_app 目錄下。加上`--database`參數可以改變設定檔的預設值，例如：

```
bin/rails new my_app --database=mysql
```

其他說明可以輸入 rails 看到全部的指令。

### [](#其他指令)其他指令

-   dbconsole 開起一個資料庫主控台 (可簡寫為 rails db)，讓你直接輸入 SQL 指令。
-   destroy 刪除 “generate” 所產生的檔案
-   runner 在 Rails 環境中執行一段程式，例如 rails runner “puts Person.count”

## [](#rails-啟動與應用程式設定)Rails 啟動與應用程式設定

> 不同的 Rails 版本產生的設定檔可能會略有差異，這些設定檔也沒有列出所有_Rails_設定，只有列出比較常用的。

啟動整個 Rails 程序(包括 rails server, rails runner, rails console 等) 時，會執行 application.rb 的應用程式設定，讓我們來看看這個檔案一些比較重要的部分吧。如果你對這個檔案有修改，無論在什麼模式下，都必須重新啟動 Rails 設定才會生效。

```
# Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
# Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
# config.time_zone = 'Central Time (US & Canada)'
```

設定預設的應用程式時區，預設是 UTC。在 Rails 中，資料庫裡面儲存的時間皆為 UTC 時間，而設定此時區會自動幫你處理轉換動作。例如設定 Taipei 的話，從資料庫讀取出來時會自動加八小時，存進資料庫時會自動減八小時。

```
# The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
# config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
# config.i18n.default_locale = :de
```

設定預設的應用程式語系，預設是:en。我們會在”I18n 多國語系及時區”一章介紹如何使用。

### [](#其他初始設定檔initialzers)其他初始設定檔(initialzers)

如果將所有的設定都放到 application.rb 就太混亂了，所以非 Rails 核心的設定，我們會放在_config/initializers_目錄下。這個目錄下的所有.rb檔案會在Rails啟動時都會自動載入執行。預設產生的檔案有五個：

#### [](#filter_parameter_logging)filter\_parameter\_logging

```
# Configure sensitive parameters which will be filtered from the log file.
Rails.application.config.filter_parameters += [:password]
```

設定 filter\_paramsters 可以避免任何叫做 password 的參數值記錄到 log 中，有效防止使用者的原始密碼外洩到 log 檔案。

#### [](#backtrace-silencers)backtrace silencers

可以讓你選擇性地移除例外追蹤(exception backtrace)訊息，例如有些套件可能會很吵，妨礙你除錯。

#### [](#inflections)inflections

Rails 的命名慣例十分倚賴英文的單複數，例如將單數的類別名稱 Person 轉成複數的表格名稱 people。Inflector 就是負責將字串轉換成單複數的類別，雖然它內建了一些基本的轉換規格，但是英文常常有例外的時候，你可以在這個檔案中加上新的規格來做修正。如果你不太確定 Rails 轉換的對不對，請進入 console 主控台試試看：

```
$ rails c
$ Loading development environment (Rails 3.2.8)
$ > "Business".singularize  => "Busines" # 轉單數
$ > "moose".pluralize => "mooses"  # 轉複數
```

很不幸地這兩個例子 Rails 都沒轉對，這時候你就可以利用 inflections.rb 來修正。

> Rails 核心不接受有關單複數轉換的單字錯誤回報，畢竟它不是想做字典。

#### [](#mime_types)mime\_types

Rails 預設支援了如下常見的標準 MIME(Multipurpose Internet Mail Extensions) 格式，MIME 被用在 HTTP 通訊協定中的請求標頭 Accept 和回應標頭 Content-Type 中，來說明此文件的格式。例如 Accept:application/xml,application/xhtml+xml,text/html; 和 Content-Type:text/html; charset=UTF-8。而 Rails 會在 Controller 的 respond\_to 方法中辨識並回應所請求的格式樣板，例如瀏覽器請求 application/xml 就會回應 xml 格式

| type/subtype | respond\_to symbol | 別名/說明 |
| --- | --- | --- |
| text/html | :html, :xhtml | application/xhtml+xml |
| text/plain | :text, :txt |  |
| text/javascript | :js | application/javascript, application/x-javascript |
| text/css | :css |  |
| text/calendar | :ics | iCalendar 格式 |
| text/csv | :csv |  |
| application/xml | :xml | text/xml, application/x-xml |
| application/rss+xml | :rss |  |
| application/atom+xml | :atom |  |
| application/x-yaml | :yaml | text/yaml |
| application/x-www-form-urlencoded | :url\_encoded\_form | 預設的 HTML forms 格式 |
| multipart/form-data | :multipart\_form | HTML forms 格式(包含二進位檔案資料) |
| application/json | :json | text/x-json application/jsonrequest |

如果你需要客製，可以在這裡註冊。

#### [](#sesssion_store)sesssion\_store

Rails 預設使用了 Cookie 來儲存 Session 訊息。它會用上述的 key 編碼之後，直接存放在使用者瀏覽器 Cookie 上。除了 Cookie Session，我們也可以使用 ActiveRecord 儲存在資料庫中。我們會在 Controller 一章中詳細介紹及比較。

#### [](#configsecretsyml)config/secrets.yml

這個設定檔包括了亂數產生的一組`secret_key_base`用來編碼需要保護的_Cookie_訊息。修改這組 key 會讓已經存放在使用者瀏覽器上的 Cookie Session 和 Signed Cookie 失效。你可以用來強制使用者需要重新登入。

```
development:
  secret_key_base: 8dd8d723d33d474710ab65b....
  some_api_key: SOMEKEY

test:
  secret_key_base: 175fa99b200ba23cf82fec6c....

# Do not keep production secrets in the repository,
# instead read values from the environment.
production:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
```

除了本來的`secret_key_base`之外，你也可以用這個檔案放其他設定，例如第三方應用的_Key_或_Token_。上述的例子透過`Rails.application.secrets.some_api_key`方法就會回傳`SOMEKEY`。

> 請小心這個檔案不要將`production`用的_secret_公開，例如上傳到_Github_的公開儲存庫。因為如果有人拿到`secret_key_base`那他就可以破解_Rails_預設的_Cookie-based Session_，造成安全上的嚴重漏洞。一般_Production_環境的作法是會將含有`production`完整設定的`config/secrets.yml`只放一份在伺服器上，或是透過環境變數來設定。詳細的作法可以參考佈署一章。

## [](#環境設定檔)環境設定檔

我們在上一節”多重環境設定”曾經介紹不同環境會有不同的設定檔，讓我們來更深入看看有哪些設定值，以及這些值是如果影響 Development、Production 和 Test 環境的不同：

### [](#development-模式)Development 模式

```
# In the development environment your application's code is reloaded on
# every request. This slows down response time but is perfect for development
# since you don't have to restart the web server when you make code changes.
config.cache_classes = false
```

使用 Rails 開發可以快速的原因之一，就是當你修改一個小東西，只要重新整理瀏覽器就可以馬上看到修改後的結果。這個秘訣就在於 cache\_classes = false 會讓每一次的 HTTP 請求都重新載入類別檔案。更仔細的說，當這個值是 false 的時候，Rails 會改用 Ruby 的 load 方法，每次執行都會重新載入一次。相反地，如果這個值是 true，則會用 Ruby 的 require 方法，只會在第一次碰到的時候載入，之後碰到 require 相同的檔案，就會自動忽略，也就是說如果你啟動 Rails 後，檔案有修改想看到結果，必須重新啟動 Rails 才行，否則無法立即看到結果。

```
# Show full error reports and disable caching
config.consider_all_requests_local = true
```

_Rails_只有在連線是來自本地端的時候，才會將發生錯誤時的_Call stack trace_資訊給瀏覽器顯示。這個設定將所有連線都當做本地端連線，好讓開發模式時所有人連線都可以看到錯誤訊息。

```
config.action_controller.perform_caching = false
```

是否啟用 Controller 層級的快取(我們會在 Controller 一章介紹到有哪些快取方法)，一般來說在開發模式不會啟用，除非你要測試它。

```
# Don't care if the mailer can't send
config.action_mailer.raise_delivery_errors = false
```

如果寄信失敗，是否要丟出例外。建議可以改成 true。

> 建議可以在開發模式設定 config.action\_mailer.perform\_deliveries = false，這樣就不會真的寄信出去。我們會再 ActionMailer 一章詳細介紹如何實作寄信功能。

### [](#production-模式)Production 模式

```
# The production environment is meant for finished, "live" apps.
# Code is not reloaded between requests
config.cache_classes = true
```

cache\_classes = true 表示在 production 中，類別檔案載入進記憶體中就快取起來了，大大獲得效能。不像在 development 環境中每一次 HTTP 請求就會重新載入一次。

```
# Full error reports are disabled and caching is turned on
 config.consider_all_requests_local       = false
config.action_controller.perform_caching = true
```

不同於 development，如果在 production 環境出現例外錯誤，不會顯示程式 call stack 訊息，而是回傳 public/500.html 頁面。

```
# Disable Rails's static asset server (Apache or nginx will already do this)
config.serve_static_assets = false
```

“X-Sendfile” 是網頁伺服器提供的功能，可以讓下載檔案的動作完全委派給網頁伺服器，Rails 送出 X-Sendfile 標頭後就毋需再佔住資源。

```
# Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
# config.force_ssl = true
```

是否限制全站必須_SSL_才能使用。

```
# See everything in the log (default is :info)
# config.log_level = :debug
```

我們在 RESTful 應用程式 一章最後介紹了 Logger。這裡可以設定 Logger 的層級。預設 production 是 :info，其他則是 :debug

```
# Use a different logger for distributed setups
# config.logger = ActiveSupport::TaggedLogging.new(SyslogLogger.new)
```

可以更換掉 Rails 內建的 Logger，例如換成使用 syslog 的 [SyslogLogger](http://seattlerb.rubyforge.org/SyslogLogger/)。

```
# Use a different cache store in production
# config.cache_store = :mem_cache_store
```

設定不同的快取儲存庫，預設是 :memory\_store，也就是每個 Rails process 各自用記憶體存放。業界最常用的則是 [memcached](http://memcached.org/) 記憶體快取伺服器。

```
# Enable serving of images, stylesheets, and javascripts from an asset server
# config.action_controller.asset_host = "http://assets.example.com"
```

預設的靜態檔案位置是目前主機的 public 目錄，你可以透過修改 asset\_host 變更位置。例如你的靜態檔案放在不同台機器或 CDN(Content delivery network) 上。

> 這就是為什麼 Rails 在 View 中會使用 Helper 方法的原因之一，我們不會平舖直敘的寫 ![](https://ihower.tw/rails/images/rails.png)，而是使用 <%= image\_tag(“rails.png”) %> 目的就在於透過程式來獲得修改位置的彈性。其他還包括 stylesheets、javascripts 等靜態檔案都有 Helper 可以使用。

```
# Disable delivery errors, bad email addresses will be ignored
# config.action_mailer.raise_delivery_errors = false

# Enable locale fallbacks for I18n (makes lookups for any locale fall back to
# the I18n.default_locale when a translation can not be found)
config.i18n.fallbacks = true
```

如果 I18n 翻譯檔找不到，則找用預設語系的文字。我們會在_I18n_一章詳細介紹多國語系功能。

### [](#test-模式)Test 模式

```
# Show full error reports and disable caching
config.consider_all_requests_local       = true
config.action_controller.perform_caching = false

# Raise exceptions instead of rendering exception templates
config.action_dispatch.show_exceptions = false
```

不同於 development 或 production 碰到例外會捕捉例外後，給瀏覽器顯示出 call stack trace 或 public/500.html 畫面，在 test 模式就不處理，讓例外直接爆出。

```
# Tell Action Mailer not to deliver emails to the real world.
# The :test delivery method accumulates sent emails in the
# ActionMailer::Base.deliveries array.
config.action_mailer.delivery_method = :test
```

測試模式下不會真的去寄送_email_

### [](#資料庫設定檔-databaseyml)資料庫設定檔 database.yml

幾乎每一個 Rails 應用程式都會與資料庫互動。而資料庫需要一個設定檔是 config/database.yml。如果你打開這個檔案，你會發現預設設定是 SQLite3。這個檔案包含三個不同的部分，對應到三個 Rails 預設環境。

一個 Mysql 的設定檔範例如下：

```
development:
  adapter: mysql
  encoding: utf8mb4
  database: blog_development
  username: root
  password:
production:
  adapter: mysql
  encoding: utf8mb4
  database: blog_production
  username: root
  password:
test:
  adapter: mysql
  encoding: utf8mb4
  database: blog_test
  username: root
  password:
```

## [](#bundler-與-gemfile-設定檔)Bundler 與 Gemfile 設定檔

Bundler [http://gembundler.com/](http://gembundler.com/) 是管理應用程式 Gem 依存性(dependencies)管理工具，它會根據 Gemfile 的設定自動下載及安裝 Gem 套件，並且幫你解決不同套件之間的依存關係，更重要的是，它可以讓不同開發者之間和佈署時，所有依存套件的版本都能夠一致。

在 Rails3 之後要使用的 Gems，都必須宣告在 Gemfile 設定檔中，沒寫在裡面的話，就算手動 require 也找不到。這跟 Rails2 以前可以直接 require 任意 rubygems 不同，在使用 Bundler 的環境中，要 require 什麼 rubygems 必須透過 Gemfile 管理。

> Bundler 不只用在 Rails，其他例如 Sinatra 或是舊版 Rails2 也都可以使用

Gemfile 的寫法說明如下：

```
  # 第二個參數可以指定版本
  gem "rails", "5.1.0"

  # 也可以不指定版本，這樣會安裝最新的穩定版本 (不包括 .pre 或 .rc 結尾的版本)
  gem 'mysql2'

  # 如果 require 的檔名不同，可以加上 :require
  gem 'yajl-ruby', :require => 'yajl'

  # 可以用 Git 當做來源(根目錄要有 .gemspec 檔案)，甚至可以指定 branch, tag 或 ref。
  gem 'authlogic', :git => 'git://github.com/odorcicd/authlogic.git',
                            :branch => 'rails3'

  # 也可以直接用電腦裡的其他目錄
  # gem "rails", :path => '/Users/ihower/github/rails'

  # Group 功能可以讓特定環境才會載入
  group :development, :test do
     gem "rspec", "~> 2.0"
     gem "rspec-rails", "~> 2.0"
  end
```

> 版號的指定方式除了指定特定版本，還可以指定大於等於 >= 某個版本。不過最建議的方式則是使用 ~> 的語法。”~> x.y.z” 的意思是版號 x,y 固定，但可以大於等於 z。例如 “~> 1.3.5” 的意思是 1.3.5, 1.3.6, 1.3.9 可以安裝，但是 1.4.0, 1.5.5, 2.0.1 就不行。這種寫法的好處是，通常版號的命名有其慣例：x major 版號升級表示有 API 發生不向後的相容性變動，y minor 版號升級表示有功能新增，z tiny 版號升級表示 bugs 修正。因此 “~> x.y.z” 可以讓我們保有升級彈性，又不致於升級太多讓程式發生不相容錯誤。這種命名是開放源碼社群的慣例，叫做 [Semantic Versioning](http://semver.org)。

### [](#安裝及更新-gems)安裝及更新 Gems

如果你修改了這個檔案，請執行 bundle install，這樣 Bundler 就會檢查並安裝這些函式庫，並產生一個 Gemfile.lock 檔案。Gemfile.lock 檔案會詳細列出所有使用到的套件版本，你應該把這個檔案也 commit 送進版本控制系統，這樣其他開發者及上線的版本就都會安裝完全一樣的版本了。

執行 bundle update gem\_name 則會更新此 gem 的版本。bundle update 則會檢查所有的 gem 更新到最新版本。一般來說你只需要在每次 Gemfile 修改後，執行 bundle install 即可。如果有套件關連性 bundle install 無法解決，它會提示你執行 bundle update。

什麼時候該執行 bundle install 或 bundle update 呢？一般來說，總是執行 bundle install 即可。這個指令只會做必要的更新到 Gemfile.lock，執行速度較快，它不會幫你升級現有的 Gem。而 bundle update 會重新產生整個 Gemfile.lock 檔案，更新所有 Gem 到最新版本。但是，一次升級太多套件，可能會造成除錯上的困難。因此會建議如果要升級，請執行 bundle update gem\_name 一次升級一個套件。

怎麼知道可以升級哪些_Gem_呢？

```
bundle outdated
```

這個指令就會列出有新版本可以升級的_gems_。

如果你想知道打開套件的原始碼，可以輸入：

```
bundle open GEM_NAME
```

這樣就會用預設的編輯器打開了。

> 如何設定預設編輯器呢? 如果你使用_Mac_和_Bash_的話，編輯`~/.bash_profile`加上`export EDITOR="vim"`這樣就會用_VIM_當作預設編輯器。

### [](#打包-gems)打包 Gems

執行以下指令，會將所有用到的 Gems 打包進 vendor/cache 目錄。如此執行 bundle install 時就不會連線到 http://rubygems.org 下載套件。

```
bundle package
```

什麼時候需要用到這個功能呢？例如你希望佈署的時候避免外部連線，或是你有非公開的 gems 不會上傳到 http://rubygems.org 網站上。

> 如果你有非 Rails 的 script 需要執行(也就是放在 Gemfile 檔案中的 Gem 所自行提供的執行檔)，使用 bundle exec 可以正確的載入 Bundler 的環境。例如 bundle exec rspec spec/

## [](#名稱慣例)名稱慣例

在 Rails 中有一些命名上的慣例：

### [](#類別命名與自動載入)類別命名與自動載入

檔名使用小寫、單數，用底線區隔。例如當 Rails 看到一個 OrderItem 的類別或模組(Module)，它會在_Rails_設定的自動載入目錄(包括_app/models_和_app/models/concerns_等等)中去載入叫做 order\_item.rb 的檔案，也就是自動 require “order\_item”。

如果是有嵌套的類別或模組，例如 Admin::OrderItem，則會多一層目錄，例如載入_app/models/admin/order\_item.rb_ 的檔案，也就是自動 require “admin/order\_item”。

如果你想要新增目錄到_Rails_設定的自動載入目錄，可以編輯_config/application.rb_加上

```
config.eager_load_paths += %W( #{config.root}/lib )
```

這樣就會自動載入_lib_目錄了。如果你沒有設定 eager\_load\_paths，或是你的檔案沒有依照慣例命名，那麼你會需要在程式中手動 require 它。基本上，只要依照命名慣例，你不太需要在程式中寫 require。

> eager\_load\_paths 目錄是指 Rails 會自動根據命名慣例載入，而 Ruby 的 $LOAD\_PATH 常數則是 require 時會尋找的目錄。像 lib 這個目錄 Rails 預設就只有加到 $LOAD\_PATH 之中，所以你放在 lib 的檔案是可以 require 到，但是因為預設沒有加到 eager\_load\_paths 之中，所以沒有自動載入的機制。

### [](#model-命名)Model 命名

類別名稱使用大寫、單數，沒有底線。而檔名使用小寫、單數，用底線。資料庫表格名稱用小寫且為複數。例如：

-   資料庫表格 line\_items
-   檔名 app/models/line\_item.rb
-   類別名稱 LineItem

### [](#controller-命名)Controller 命名

假設有一個_stores controller_的話：

-   檔名 app/controllers/stores\_controller.rb
-   類別名稱 StoresController

如果需要將_controllers_檔案做分類，這時候可以使用_Module_，將檔案放在子目錄下，例如後台專用的_controllers_：

-   檔名 app/controllers/admin/stores\_controller.rb
-   類別名稱 Admin::StoresController

### [](#view-命名)View 命名

例如一個叫做 People 的 controller，其中的 index action：

-   檔名 app/views/people/index.html.erb
-   Helper 名稱 module PeopleHelper
-   檔名 app/helpers/people\_helper.rb

## [](#rails-元件導覽)Rails 元件導覽

Rails 包含許多個別的函式庫元件：

-   Action Pack
-   Action Controller
-   Action Dispatch
-   Action View
-   Action Mailer
-   Active Model
-   Active Record
-   Active Support
-   Railties

### [](#action-pack)Action Pack

Action Pack 是個包含 Action Controller、Action View 和 Action Dispatch 的 gem。也就是 “MVC” 中的 “VC” 部分。

### [](#action-controller)Action Controller

Action Controller 是 Rails 應用程式中，管理 Controllers 的元件。Action Controller 框架處理傳給 Rails 的 HTTP 請求，萃取出參數，然後分派給所屬的 Action。Action Controller 還提供了 session 管理、樣板演算顯示(template rendering) 和 redirect 功能。

### [](#action-view)Action View

Action View 負責 Rails 應用程式中的 Views。它預設可以產生 HTML 或 XML 輸出。Action View 負責樣板的演算顯示(template rendering)，包括嵌套(nesting)或局部(partial)樣板，甚至也內建支援一些 Ajax。

### [](#action-dispatch)Action Dispatch

Action Dispatch 處理 HTTP 請求的路由(routing)，它把 HTTP 請求發派(dispatch)到它該去的地方，也許是你的應用程式或其他 Rack 程式。

### [](#action-mailer)Action Mailer

Action Mailer 是個建構 E-mail 功能的框架。你可以使用 Action Mailer 來接收來信，或是使用樣板來寄出純文字或複雜的 multipart 信件。

### [](#active-model)Active Model

Active Model 在 Action Pack gem 和 ORM gem (例如 Active Record) 之間定義了一組介面。Active Model 允許 Rails 可以依你的需求把 Active Record 換成其他 ORM 框架。

### [](#active-record)Active Record

Active Record 是 Rails 應用程式中的 Models 基礎。它不依存特定的資料庫系統，提供了 CRUD 功能、先進的查詢能力以及可以跟其他 Models 關聯的本事。

### [](#active-support)Active Support

Active Support 是 Rails 裡的工具函式庫，它也擴充了一些 Ruby 標準函式庫。除了被用在 Rails 核心程式中，你也可以在你的程式中使用。

### [](#railties)Railties

Railties 是 Rails 的核心程式碼，用來把以上各種的框架函式庫以及 Plugin 全部組合在一起。

## [](#更多線上資源)更多線上資源

-   [Configuring Rails Applications](http://guides.rubyonrails.org/configuring.html)
-   [A Guide to The Rails Command Line](http://guides.rubyonrails.org/command_line.html)
-   [Autoloading and Reloading Constants](http://guides.rubyonrails.org/autoloading_and_reloading_constants.html)

* * *
