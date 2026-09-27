Part 4: 自動化部署 Rails

## [](#11-新增-deploy-用戶)11\. 新增 deploy 用戶

將下來我們想要找地方放我們 Rails 專案代碼。因為 root 和 ihower 帳號權限很大，習慣上我們會在伺服器上另開一個專門的帳號來放_Rails_代碼。這裡我們另開一個 deploy 帳號來使用：

在遠端執行 `sudo adduser --disabled-password deploy` 新增帳號

> `--disabled-password deploy` 參數會讓`deploy`無法用密碼登入，因為我們打算用 SSH Key 來登入更安全。

## [](#設定用-ssh-key-登入-deploy-帳號)設定用 SSH Key 登入 deploy 帳號

在遠端執行 `sudo su deploy` 切換到 deploy 身份：

執行 `mkdir ~/.ssh`

執行 `touch ~/.ssh/authorized_keys`

回到本機電腦把公鑰印出來，執行 `cat ~/.ssh/id_rsa.pub` 就會印在畫面上。

回到遠端伺服器繼續：

`nano ~/.ssh/authorized_keys` 把公鑰貼上去

`chmod 700 ~/.ssh`

`chmod 644 ~/.ssh/authorized_keys`

這樣就好了，本機可以直接 `ssh deploy@<主機IP位置>` 無須輸入密碼。

## [](#12-安裝-capistrano)12\. 安裝 Capistrano

[Capistrano](http://capistranorb.com) 是 Rails 社區中最常使用的佈署工具，以下是安裝和使用步驟。

以下使用實戰應用的專案來進行示範：

## [](#修改-gemfile-加入-capistrano)修改 Gemfile 加入 capistrano

首先在本機的 Rails 專案修改 `Gemfile`：

```
+  gem 'mysql2'  # mysql2 和 pg 擇一安裝即可
+  gem 'pg'

   group :development, :test do
+    gem 'capistrano-rails'
+    gem 'capistrano-passenger'

     gem 'rspec-rails'
     gem 'byebug', platform: :mri
   end
```

資料庫用 MySQL 的話，加上 `gem "mysql2"`，資料庫用 PG 的話，則用 `gem "pg"`。

執行 `bundle` 安裝

## [](#本機設定-capistrano)本機設定 capistrano

執行 `cap install`，這會新增一些配置檔案。

編輯 `Capfile`：

```
   require "capistrano/scm/git"
   install_plugin Capistrano::SCM::Git

+  require 'capistrano/rails'
+  require 'capistrano/passenger'
```

修改 `config/deploy.rb`

```
+  sh "ssh-add"

   # config valid only for current version of Capistrano
   lock "3.8.1"

-  set :application, "my_app_name"
+  set :application, "rails_recipes"   # 請用你自己的專案名稱

-  set :repo_url, "[email protected]:me/my_repo.git"
+  set :repo_url, "[email protected]:ihower/rails-recipes.git"    # 請用你自己專案的git位置

   # Default branch is :master
   # ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

   # Default deploy_to directory is /var/www/my_app_name
   # set :deploy_to, "/var/www/my_app_name"
+  set :deploy_to, "/home/deploy/rails-recipes"     # 這樣伺服器上代碼的目錄位置，放在 deploy 帳號下。請用你自己的專案名稱。

   # Default value for :format is :airbrussh.
   # set :format, :airbrussh

   # You can configure the Airbrussh format using :format_options.
   # These are the defaults.
   # set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

   # Default value for :pty is false
   # set :pty, true

   # Default value for :linked_files is []
-  # append :linked_files, "config/database.yml", "config/secrets.yml"
+  append :linked_files, "config/database.yml", "config/secrets.yml"

   # Default value for linked_dirs is []
-  # append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"
+  append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

+  set :passenger_restart_with_touch, true

   # Default value for default_env is {}
   # set :default_env, { path: "/opt/ruby/bin:$PATH" }

   # Default value for keep_releases is 5
-  # set :keep_releases, 5
+  set :keep_releases, 5

```

修改 `config/deploy/production.rb`，設定要用哪一個 branch 放在伺服器上，以及伺服器的 IP 位置：

```
+   set :branch, "master"
-   # server "example.com", user: "deploy", roles: %w{app db web}, my_property: :my_value
+     server "47.92.82.116", user: "deploy", roles: %w{app db web}, my_property: :my_value

```

在本機執行 `cap production deploy:check`，這會自動登入遠端伺服器建立一些 Capistrano 需要的架構目錄(稍後會解說)。

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/30.png)

你會看到一個 ERROR 說伺服器上缺少一些檔案，讓我們進遠端伺服器上新增這些檔案：

## [](#遠端設定-databaseyml-和-secretsyml)遠端設定 database.yml 和 secrets.yml

請用 deploy 身份登入 `ssh [[email protected]](https://ihower.tw/cdn-cgi/l/email-protection)`，或是切換到 deploy 身份 `sudo su deploy`：

在遠端新增 `/home/deploy/rails-recipes/shared/config/database.yml` 這個檔案，內容是：

如果是 MySQL 資料庫：

```
production:
  adapter: mysql2
  encoding: utf8mb4
  database: rails_recipes
  host: localhost
  username: root
  password: xxxxxxxxxx

```

如果是 PG 資料庫：

```
production:
  adapter: postgresql
  pool: 25
  database: rails_recipes
  host: localhost
  username: postgres
  password: xxxxxxxxxx
```

> password 記得換成你的資料庫密碼

在本機執行 `rake secret`，這會產生一段亂數的key，等會要用。

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/31.png)

在遠端新增 `/home/deploy/rails-reipes/shared/config/secrets.yml` 這個檔案，內容是：

```
production:
  secret_key_base: 把剛剛的亂數key貼上來

```

本機再次執行 `cap production deploy:check`

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/32.png)

## [](#執行部署)執行部署

本機執行部署 `cap production deploy`，這個指令會登入遠端伺服器，把 Github 上的代碼抓下來，然後自動執行 bundle 安裝套件、跑資料庫 migration 和編譯 assets 編譯等等步驟：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/29.png)

第一次會比較久，需耗時數十分鐘，取決於網路環境與 CPU 速度：

如果您用中國大陸境內的伺服器，跑 `01 bundle install --path /home/deploy/rails-recipes/shared/bundle` 這一步可能因為網路問題而失敗。建議你可以修改 `Gemfile` 第一行，改成 `source 'https://gems.ruby-china.org'` 使用境內的 rubygems.org 鏡像伺服器，因為伺服器本身是沒有翻牆的。改完請執行 `bundle`，然後 git commit 和 git push 上去。然後再重新執行 `cap production deploy`。

如果伺服器 CPU 等級比較差，跑 `01 bundle exec rake assets:precompile` 這一步會比較久，如果出現 `Errno::ECONNRESET: Connection reset by peer - recvfrom(2)` 請重試幾次 `cap production deploy`。

完成後，capistrano 的設定就告一個段落了，可以 commit 了。

之後有修改代碼，只要 git push 到 Github 上，然後再次執行 `cap production deploy`，這樣伺服器上就會拉下最新的代碼。

## [](#capistrano-目錄結構解說)Capistrano 目錄結構解說

在遠端的部署目錄 `/home/deploy/rails-receips` 下，Capistrano 建立了一些目錄：

-   releases
    -   20170728140659
    -   20170728141211
    -   20170728174109
    -   20170729041358
    -   …..
-   current
-   shared
    -   bundle
    -   config
    -   log
    -   public/system
    -   public/assets
    -   tmp

每次執行 `cap production deploy` 時，capistrano 都會在 releases 都會建一個新的目錄，然後從 git repo 把最新的代碼抓下來，執行 bundle 安裝套件、跑資料庫 migration、編譯 assets 編譯等等步驟，都完成之後，會更新 current 目錄(這是一個 `ln -s` 的捷徑)指向最新的 releases/xxxx 目錄，最後 `touch tmp/restart.txt` 告訴 Passenger 重啟 Rails。

這樣做的好處是在部署過程中，伺服器仍然可以穩穩地用本來的版本，不會受到新版本的影響，直到部署過程都完成之後，才會修改 current 目錄重啟 Rails。

也由於每次部署都會建立新的 `releases/xxx` 目錄，因此不同版本之間需要共享的檔案和目錄，就會放在 `shared` 下，例如 `bundle` 目錄是放安裝的 Ruby 套件、`public/system` 是預設用戶上傳檔案放的位置、`public/assets` 是靜態檔案編譯後放的位置。

在 `config/deploy.rb` 的設定中，`linked_files` 和 `linked_dirs` 就是在配置部署過程中，需要將這些 `shared` 下的檔案和目錄，連結到新的 `releases` 目錄裡面去。

## [](#13-完成-nginx-設定)13\. 完成 Nginx 設定

在遠端用 root 權限編輯 `/etc/nginx/nginx.conf` 這個檔案：

```
  # 讓 Nginx 可以讀到環境變數 PATH，Rails 需要這一行才能調用到 nodejs 來編譯靜態檔案
+ env PATH;

	user www-data;
	worker_processes auto;
	pid /run/nginx.pid;

	events {
	  worker_connections 768;
	  # multi_accept on;
	}

  http {

    # 關閉 Passenger 和 Nginx 在 HTTP Response Header 的版本資訊，減少資訊洩漏
+   passenger_show_version_in_header off;
+   server_tokens       off;

    # 設定檔案上傳可以到100mb，預設只有1Mb超小氣的，上傳一張圖片就爆了
+   client_max_body_size 100m;

    gzip on;
    gzip_disable "msie6";

    # 最佳化 gzip 壓縮
+   gzip_comp_level    5;
+   gzip_min_length    256;
+   gzip_proxied       any;
+   gzip_vary          on;
+   gzip_types application/atom+xml application/javascript application/x-javascript application/json application/rss+xml application/vnd.ms-fontobject application/x-font-ttf application/x-web-app-manifest+json application/xhtml+xml application/xml font/opentype image/svg+xml image/x-icon text/css text/xml text/plain text/javascript text/x-component;

    # 打開 passenger 模組
-   # include /etc/nginx/passenger.conf;
+   include /etc/nginx/passenger.conf;

    # 下略
```

在遠端用 root 權限新增 `/etc/nginx/sites-enabled/rails-recipes.conf` 這個檔案(檔名可以自訂無所謂)

```
server {
  listen 80;
  server_name 47.92.82.116;   # 用你自己的伺服器 IP 位置

  root /home/deploy/rails-recipes/current/public; # 用你自己的專案名稱位置

  passenger_enabled on;

  passenger_min_instances 1;

  location ~ ^/assets/ {
    expires 1y;
    add_header Cache-Control public;
    add_header ETag "";
    break;
   }
}

```

以上設定包括設定 Assets 靜態檔案成為永不過期(Rails的Assets Pipeline會加上版本號，所以不需要擔心)、設定 Passenger 至少開一個進程(Process)。其中 `server_name` 應該填網域名稱。不過如果目前沒有的話，只好先填 IP 位置。

如果有多個 domain 連到同一個網站，可以用空白區隔，例如：

`server_name abc.ihower.tw xyz.ihower.tw ihower.tw;`

這樣三個網址都會連到同一個 Rails 了。如果之後想在同一個伺服器裝多個網站，那麽就需要有不同的網域名稱，每個網站有自己的 `/etc/nginx/sites-enabled/xxxxx.conf` 設定檔案，這樣 Nginx 才能區別用戶是要打開那一個網站。

最後執行 `sudo service nginx restart` 才會套用新的 Nginx 設定。

> 如果 Nginx 設定檔格式不對，例如結尾少了分號 `;`，那麽 `sudo service nginx restart` 會失敗，Nginx 伺服器就死掉了。這時候請回頭修好設定檔，然後執行 `sudo service nginx start` 就會啟動 Nginx 了。如果無法啟動請檢查 `/etc/nginx/nginx.conf` 和 `/etc/nginx/sites-enabled/rails-recipes.conf`。

打開瀏覽器連過去，應該可以看到實戰應用的首頁了，大功告成。

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/33.png)

* * *
