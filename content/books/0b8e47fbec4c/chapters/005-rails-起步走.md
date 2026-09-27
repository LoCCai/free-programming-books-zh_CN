> There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies and the other way is to make it so complicated that there are no obvious deficiencies. - C.A.R. Hoare,

在這一章中，我們將開始介紹如何建立一個最簡單的_Hello, World!_程式，以及用最快速的方式製作_CRUD_應用。

> _CRUD_指的是_Create_(新增)、_Read_(讀取)、_Update_(更新)、_Delete_(刪除)四種操作資料的基本方式。

在上一章安裝_Rails_後，你會在命令列中得到一個`rails`的指令，這個指令可以初始一個_Rails_專案目錄。

## [](#開始建立第一個rails應用程式)開始建立第一個_Rails_應用程式

首先請打開一個命令列視窗_(Terminal)_，然後找個目錄適合放你的_Rails_專案，就說是`projects`好了：

```
$ mkdir projects
$ cd projects
```

接著，輸入以下指令就會建立一個叫做_demo_的_Rails_專案：

```
$ rails new demo --skip-test-unit
```

> 如果出現建立出來的目錄不是_demo_而是_new_，表示你的_Rails_版本是舊版的，請輸入`rails -v`檢查_Rails_的版本必須是_3.0_以上。不是的話，請回上一章末執行`gem install rails`安裝_Rails 4_。

你會看到以下訊息顯示出總共新增了哪些檔案：

```
create
create  README
create  Rakefile
create  config.ru
create  .gitignore
create  Gemfile
create  app
...(略)...
create  vendor/plugins
create  vendor/plugins/.gitkeep
```

這樣就建立出_demo_目錄，讓我們繼續，進入剛產生出來的_demo_目錄下：

```
$ cd demo
```

這個目錄下包含了一個_Rails_專案基本會用到的目錄結構和檔案，讓我們簡單走訪一下，輸入`ls`_(Windows讀者請輸入dir)_顯示出此目錄下的檔案：

| 檔案/目錄 | 用途 |
| --- | --- |
| Gemfile | 設定Rails應用程式會使用哪些Gems套件 |
| README | 專案說明：你可以用來告訴其他人你的應用程式是做什麼用的，如何使用等等。 |
| Rakefile | 用來載入可以被命令列執行的一些Rake任務 |
| app/ | 放Controllers、Models和Views檔案，接下來的內容主要都在這個目錄。 |
| config/ | 應用程式設定檔、路由規則、資料庫設定等等 |
| config.ru | 用來啟動應用程式的Rack伺服器設定檔 |
| db/ | 資料庫的結構綱要 |
| doc/ | 用來放你的文件 |
| lib/ | 放一些自定的Module和類別檔案 |
| log/ | 應用程式的Log記錄檔 |
| public/ | 唯一可以在網路上看到的目錄，這是你的圖檔、JavaScript、CSS和其他靜態檔案擺放的地方 |
| bin/ | 放rails這個指令和放其他的script指令 |
| test/ | 單元測試、fixtures及整合測試等程式 |
| tmp/ | 暫時性的檔案 |
| vendor/ | 用來放第三方程式碼外掛的目錄 |

## [](#啟動伺服器)啟動伺服器

_Rails_使用了一套叫做_Bundler_的工具可以幫助我們檢查及安裝這個_Rails_應用程式所有依存的套件，在_demo_目錄下輸入：

```
$ bundle install
```

> 可以只輸入`bundle`就是`bundle install`了。 每次有修改_Gemfile_這個檔案，都需要重新執行`bundle`

會出現

```
Fetching source index for http://rubygems.org/
...
Your bundle is complete! Use `bundle show [gemname]` to see where a bundled gem is installed.
```

在開發用的電腦上，我們不需要安裝如_Apache_、_IIS_的網站伺服器。_Ruby_本身就有提供了_HTTP_伺服器可以執行_Rails_，要啟動它，我們另開啟一個指令視窗，_cd_進到剛剛建立的_Rails_專案目錄然後輸入_bin/rails server_：

```
$ cd projects/demo
$ bin/rails server
```

> _Windows_作業系統請輸入`ruby bin/rails server`

就會出現以下訊息：

```
=> Booting Puma
=> Rails 5.1.0.beta1 application starting in development on http://localhost:3000
=> Run `rails server -h` for more startup options
Puma starting in single mode...
* Version 3.7.1 (ruby 2.4.0-p0), codename: Snowy Sagebrush
* Min threads: 5, max threads: 5
* Environment: development
* Listening on tcp://localhost:3000
Use Ctrl-C to stop
```

> rails server 可以簡寫為 rails s

> 使用_Ubuntu_作業系統的朋友，如果啟動伺服器時出現_Could not find a JavaScript runtime_的錯誤，請編輯_Gemfile_這個檔案加上一行`gem 'therubyracer'`，輸入`bundle install`安裝這個套件，然後再啟動一次`rails server`即可。這是因為在_Ubuntu_作業系統上預設沒有任何_JavaScript_直譯器可以給_Rails_使用。你可以裝_Node.js_或是安裝_therubyracer_這個_Ruby_套件來獲得_JavaScript_直譯器。

接著打開你的瀏覽器前往_[http://localhost:3000](http://localhost:3000)_，我們可以看到_Rails_的預設首頁。這個_Welcome Aboard_的畫面可以確認設定無誤，點選_About your application’s environment_超連結可以看到更多環境資訊。

![image](https://ihower.tw/rails/images/firststep-welcome-screenshot.png)

要中斷伺服器的話，請按_Ctrl+C_(若不靈光請改試_Ctrl+Z_)。在_development_開發模式的話，除了修改_config_或_vender_目錄下的檔案需要重新啟動之外，其他修改通常不需要重新啟動，修改的檔案會自動重新載入。如果是 _production_正式上線模式的話，修改任何檔案都必須重新啟動伺服器才會有效果。

## [](#第一個hello-world)第一個_Hello World!!_

讓程式說_Hello World!_可是我們學寫程式的一大傳統。我們提過_Rails_是_MVC_框架，顯示_Hello World!_不需要用到資料庫，所以我們只要先寫_Controller_和_View_，以及讓路由指派到這個_Controller_即可，輸入以下指令就會產生出一個叫做_welcome_的空_Controller_檔案：

```
$ bin/rails generate controller welcome
```

> 可以簡寫為`bin/rails g controller welcome`

接下來在路由檔案_config/routes.rb_新增一行設定：

```
Rails.application.routes.draw do
  get "welcome/say_hello" => "welcome#say"
  # ...
end
```

`get`這一行的意思是將`http://localhost:3000/welcome/say_hello`這樣的網址對應到_welcome Controller_的_say Action_。

編輯_app/controllers/welcome\_controller.rb_，加入一個`say`方法：

```
class WelcomeController < ApplicationController
  def say
  end
end
```

在_Controller_中，一個公開函式_(public method)_就代表一個_Action_，一個_Action_對應一個_HTTP_的請求和回應。接著我們打開瀏覽器瀏覽_http://localhost:3000/welcome/say\_hello_，你會看到一個錯誤如下：

```
Missing template welcome/say, application/say with {:locale=>[:en], :formats=>[:html], :variants=>[], :handlers=>[:erb, :builder, :raw, :ruby, :coffee, :jbuilder]}. Searched in: * "/Users/ihower/projects/demo/app/views"
```

這是因為我們還沒有準備好_View_檔案。請新增_app/views/welcome/say.html.erb_這個檔案，依照慣例目錄名就是_Controller_名稱、檔案名是_Action_名稱，第一個附檔名說明了這是_HTML_格式的檔案，第二個附檔名說明這是_ERb_樣板(我們會在_View_一章仔細介紹樣板)。編輯該檔案內容如下：

```
<h1>Hello, World!</h1>
```

這時再重新整理一次瀏覽器，你就會看到_Hello, World!_了。

讓我們再新增一個頁面並加入超連結。再次編輯路由檔案_config/routes.rb_加入一個路由，變成這樣：

```
Rails.application.routes.draw do
  get "welcome/say_hello" => "welcome#say"
  get "welcome" => "welcome#index"
  # ...
end
```

這一行的意思是將`http://localhost:3000/welcome`這樣的網址對應到_welcome Controller_的_index Action_。 編輯_app/controllers/welcome\_controller.rb_加入

```
class WelcomeController < ApplicationController

  #...

  def index
  end
end
```

新增_app/views/welcome/index.html.erb_內容是

```
<p>Hola! It's <%= Time.now %></p>
<p><%= link_to 'Hello!', welcome_say_hello_path %></p>
```

`Time`是_Ruby_內建的時間類別，`Time.now`會輸出目前時間。`link_to`是_Rails_內建的方法可以輸出超連結，而_welcome\_say\_hello\_path_會輸出`/welcome/say_hello`這個網址。這種出現在_View_中的輔助方法統稱作_Helper_。瀏覽_http://localhost:3000/welcome_，將看到_Hola!_及_Hello!_超連結。

![image](https://ihower.tw/rails/images/firststep-hello-screenshot.png)

### [](#設定首頁)設定首頁

如何將網站首頁變更為_welcome#index_呢？編輯_config/routes.rb_，加上以下的程式碼，變成這樣：

```
Rails.application.routes.draw do
  get "welcome/say_hello" => "welcome#say"
  get "welcome" => "welcome#index"

  root :to => "welcome#index"
  # ...
end
```

> _Ruby_的單行註解是用`#`井號

這一行的意思是，將網站根目錄導引至_welcome Controller_的_index Action_。那在_View_中要怎麼建立回首頁的連結呢？編輯_app/views/welcome/say.html.erb_在Hello, World!下一行加入：

```
<h1>Hello, World!</h1>
<p><%= link_to "Home", root_path %></p>
```

如此一來，網頁的首頁就會顯示Hola!和時間，連到_http://localhost:3000/welcome/say\_hello_的時候也會在底下顯示一個「Home」的連結，點下去就會回到首頁了。

## [](#設定及建立資料庫)設定及建立資料庫

操作資料庫是動態網站非常基本的功能，在撰寫_CRUD_應用程式之前，我們必須先設定好資料庫。_Rails_的資料庫設定檔是_config/database.yml_，如果你打開這個檔案，預設的設定是_SQLite3_。這個檔案裡包含三段不同環境的設定，對應到三個_Rails_執行環境：

-   _development_ 開發模式，用在你的開發的時候
-   _test_ 測試模式，用在執行自動測試時
-   _production_ 正式上線模式，用在實際的上線運作環境

### [](#設定sqlite資料庫)設定_SQLite_資料庫

_Rails_內建支援_[SQLite](http://www.sqlite.org/)_這是一套非常輕量的非伺服器型資料庫程式，它的資料庫就只是一個檔案而已。流量大的正式上線環境雖然不適合_SQLite_，不過拿來開發和測試卻非常好用。_Rails_預設也使用_SQLite_資料庫來建立新的專案，以下是預設的設定資料_config/database.yml_：

```
# SQLite version 3.x
#   gem install sqlite3
#
#   Ensure the SQLite 3 gem is defined in your Gemfile
#   gem 'sqlite3'
#
default: &default
  adapter: sqlite3
  pool: 5
  timeout: 5000

development:
  <<: *default
  database: db/development.sqlite3

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: db/test.sqlite3

production:
  <<: *default
  database: db/production.sqlite3
```

> 中間那段註解告訴你不要把_test_資料庫設成跟_production_或_development_同一個

本書接下來也都使用_SQLite_資料庫，因為它完全不需要什麼設定就可以使用。

> _[YAML](http://www.yaml.org/)_是一種可讀性高，用來表達設定資料的資料格式。它嚴格要求縮排(建議為兩個空白)，且冒號後面必須有一個空格。一般我們會預期_YAML_的值解析出來是字串，因此如果內容是數字或多行文字時，建議加上引號以避免字串解析錯誤。例如 `password: "123456"`。如果沒有加上引號，這串數字會被解析成_Fixnum_物件而不是字串_String_，後續可能造成型別判斷錯誤。

### [](#建立資料庫)建立資料庫

資料庫設定好了，輸入以下的指令可以讓_Rails_建立出空的資料庫：

```
$ bin/rake db:create
```

這將在_db/_目錄下建立出_development.sqlite3_這個資料庫檔案。

> _Rake_是一種_Ruby_的命令列工具，你可以輸入`rake -T`列出所有可用的指令。我們會在稍後的章節中詳細介紹_Rake_。

## [](#你的第一個crud程式)你的第一個_CRUD_程式

_Rails_的_scaffold_鷹架功能會自動產生一組_Model_、_Views_跟_Controller_程式碼，完成一個簡易的_CRUD_程式以供展示及學習之用。請輸入：

```
$ bin/rails g scaffold person name:string bio:text birthday:date
```

產生的檔案簡單說明如下，請注意_Model_的名稱是用單數_person_，而_Controller_照_RESTful_慣例是用複數_people_：

<table><tbody><tr><td>db/migrate/20141021135430_create_people.rb</td><td>用來建立people資料庫資料表的Migration(你的檔案開頭名稱會有不同的時間)</td></tr><tr><td>app/models/person.rb</td><td>person model檔案</td></tr><tr><td>app/controllers/people_controller.rb</td><td>people controller檔案</td></tr><tr><td>app/views/people/index.html.erb</td><td>用來顯示所有文章的index頁面</td></tr><tr><td>app/views/people/edit.html.erb</td><td>用來編輯文章的頁面</td></tr><tr><td>app/views/people/show.html.erb</td><td>用來顯示特定一篇文章的頁面</td></tr><tr><td>app/views/people/new.html.erb</td><td>用來新增文章的頁面</td></tr><tr><td>app/views/people/_form.html.erb</td><td>用來顯示編輯和新增文章的表單局部(Partial)樣板</td></tr><tr><td>app/helpers/people_helper.rb</td><td>可在文章Views中使用的Helper方法</td></tr><tr><td>config/routes.rb</td><td>設定URL路由規則的檔案，scaffold再此新增了一行resources :people</td></tr><tr><td>app/assets/stylesheets/scaffold.scss</td><td>Scaffold鷹架提供的樣式檔案</td></tr><tr><td>app/assets/stylesheets/people.scss</td><td>people的CSS樣式檔案</td></tr><tr><td>app/assets/javascripts/people.coffee</td><td>people的JavaScript檔案</td></tr></tbody></table>

雖然鷹架_(scaffolding)_可以幫助你快速上手，但是可沒辦法產生出完美符合需求的程式碼。因此有經驗的_Rails_程式設計師甚少使用預設的鷹架產生程式碼，而是偏好使用_Rails_的_generator_來分別產生_Model_和_Controller_檔案，甚至客製出自己專屬的_scaffold_程式。

_scaffold_產生出來的程式中，有一項是資料庫遷移檔_(database migration)_。_Migration_的用途是建立和修改資料庫資料表。_Rails_使用_rake_指令來執行_Migrations_。_Migration_的檔名中包含了_Timestamp_(時間戳章)，用來確保它們可以依照建立時間依序執行。

請輸入以下指令執行_Migration_：

```
$ bin/rake db:migrate
```

_Rails_這時會建立_people_資料表：

```
==  Createpeople: migrating ====================================================
-- create_table(:people)
   -> 0.0019s
==  Createpeople: migrated (0.0020s) ===========================================
```

因為預設是跑在_development_模式，這個指令會用_config/database.yml_設定裡的_development_那段所指定的資料庫。

此時瀏覽_[http://localhost:3000/people](http://localhost:3000/people)_就可以操作了，十分神奇吧！不過，這裡就不詳細說明其產生出來的程式碼了，讀者讀畢稍後章節後，自會明白。

![image](https://ihower.tw/rails/images/firststep-scaffold-screenshot.png)

## [](#常見錯誤)常見錯誤

### [](#nomethoderror)NoMethodError

_NoMethodError_非常明顯，就是你打錯方法名稱了，例如此例中把`link_to`打成`link_too`。根據錯誤訊息你應該可以很容易找到錯誤是發生在哪個檔案、哪一行。

### [](#nameerror)NameError

讀取一個不存在、沒有初始過的區域變數會出現_NameError_的錯誤

### [](#syntaxerror-unexpected-end)SyntaxError: unexpected $end

_SyntaxError_加上_unexpected $end, expecting keyword\_end_的話，那一定是你少了(或多了)`end`關鍵字，`def`跟`do`都必須要有對應的`end`。不過很可惜_Rails_沒辦法提示你是那一行少了(或多了)`end`，發生錯誤的行數都會告訴你是最後一行。如果真的不太好找，你可以單獨用`ruby -w`去執行發生錯誤的程式，例如`ruby -w app/controller/welcome_controller`，這會打開_Ruby_的警告模式來獲得更準確的語法錯誤訊息。

* * *
