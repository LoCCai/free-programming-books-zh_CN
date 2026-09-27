Part 5: Linux 基本運維

## [](#14-運維常用指令)14\. 運維常用指令

要部署新代碼上伺服器，記得需要先 `git push` 到 Github 上，再執行 `cap production deploy`

## [](#如何檢視-log)如何檢視 log

-   用 deploy 身分登入
-   `cd ~/rails-recipes/current` 進到 Rails 目錄下
-   `tail -n 500 log/production.log` 這樣會顯示最後500行
-   `tail -f log/production.log` 這樣會一直掛著顯示

除了 Rails 的錯誤訊息，錯誤也有可能發生在 Nginx，這時候可以找 nginx log，位置在 `/var/log/nginx/error.log`，需要用 root 身分才能看。

## [](#如何查看系統狀態)如何查看系統狀態

-   `free -h` 顯示記憶體用量
-   `df -h` 顯示硬盤剩餘空間
-   `sudo passenger-status` 顯示 Passenger 狀態，主要觀察 Passenger 開了多少個 Rails 進程(預設最多開6個，如果機器的記憶體夠多，你可以調整 Nginx 設定 [passenger\_max\_pool\_size](https://www.phusionpassenger.com/library/config/nginx/reference/) 增加更多進程來服務更多流量)
-   `sudo passenger-memory-stats` 顯示 Passenger 記憶體狀態，主要觀察每個 Rails 進程耗費多少記憶體

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/60.png)

-   `top` 系統狀態，主要可以看 CPU 負載情形，以及哪些進程在忙

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/59.png)

> load average 三個數字分別代表最近1分鐘、5分鐘和15分鐘的系統平均負載。這個數字表示有多少進程在等待被 CPU 執行，數字越小越好，表示系統不忙。如果你的伺服器只有單顆 CPU，那這個數字應該要小於1。兩顆CPU則要小於2。

-   `ps ax` 顯示目前所有進程(process)，用 `sudo kill -9 <PID>` 可以強制刪除該程序，這是最後手段。

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/61.png)

網站如果無法正常運作，第一個檢查網路是否正常，是不是可以 SSH 連線進去。如果第一關就卡住了，可能整台機器已經蒙了，這時候需要回到雲服務的後台，強制關機重開。

如果可以連線進去，就先檢查目前系統負載情形，是不是記憶體不夠了? 或是硬盤滿了? 如果是 Passenger 進程太多人塞住了，可以先嘗試重開 Nginx 讓網站恢復運作。如果還是沒多久還是一樣，就需要進一步看 log 檢查是哪一個環節不正常。

## [](#網站伺服器重啟指令)網站伺服器重啟指令

預設安裝完以及開機後，就會啟動 Nginx。如果有修改 Nginx 設定檔，需要重開 Nginx。

啟動 `sudo service nginx start` 停止 `sudo service nginx stop` 重開 `sudo service nginx restart`

如果只是要重開 Rails，可以不重開 Nginx。在你的 Rails 目錄下(例如 `/home/deploy/rails-recipes/current` 這個目錄)執行 `touch tmp/restart.txt` 即可，這樣 Passenger 就會知道要重新加載 Rails，而不需要重開 Nginx。

## [](#在遠端如何進-rails-console)在遠端如何進 rails console?

-   用 deploy 身分登入，例如 ssh deploy@your\_server\_ip 或用 root 登入再切換身分 sudo su deploy
-   `cd ~/your_project/current`
-   執行 `bundle exec rails c production`

## [](#如何在遠端跑-rake)如何在遠端跑 rake?

例如想在伺服器上執行 `rake db:seed`，可以這樣做：

-   用 deploy 身分登入，例如 ssh deploy@your\_server\_ip 或用 root 登入再切換身分 sudo su deploy
-   `cd ~/your_project/current`
-   執行 `RAILS_ENV=production bundle exec rake db:seed`

## [](#15-整理-log-檔案)15\. 整理 Log 檔案

Linux 內建有 logrotate 工具，可以定期清空和壓縮 Log 檔案。如果你不整理的話，Rails 的 production.log 會不斷成長到撐爆硬盤空間。

用 root 權限新增 `/etc/logrotate.d/rails` 檔案，內容如下：

```
/home/deploy/rails-recipes/shared/log/*.log {
  monthly
  dateext
  missingok
  rotate 65535
  notifempty
  copytruncate
}
```

> `rails-recipes` 請換成你的專案名稱

-   其中 daily 表示每天整理，也可以改成 weekly 或 monthly
-   dateext 表示檔案補上 rotate 的日期
-   missingok 表示如果找不到 log 檔也沒關系
-   rotate 表示保留65535份，建議如果硬盤空間夠的話，就不要砍log檔了，以供未來備查
-   compress 表示壓縮起來，預設用 gzip
-   delaycompress 表示延後壓縮直到下一次 rotate
-   notifempty 表示如果 log 檔是空的，就不 rotate
-   copytruncate 先複製 log 檔的內容後，在清空的作法，因為有些程式一定 log 在本來的檔名，例如 rails。另一種方法是 create。

設定好之後，可以等明天，或是執行 `sudo /usr/sbin/logrotate -f /etc/logrotate.conf` 測試看看，會發現 rails 專案下的 log/production.log 被依日期拆開了。

## [](#16-非同步處理)16\. 非同步處理

## [](#sidekiq-安裝)Sidekiq 安裝

在實戰應用中有安裝 Redis 和 Sidekiq 來做非同步處理，要在 Ubuntu 上安裝 Redis 很簡單：

請執行 `sudo apt-get install redis-server` 就裝好了。

Capistrano 也需要調整，我們可以使用 [https://github.com/seuros/capistrano-sidekiq](https://github.com/seuros/capistrano-sidekiq) 這個 gem

首先編輯 `Gemfile` 加上 `gem 'capistrano-sidekiq'`：

```
  group :development, :test do
    gem 'capistrano-rails'
    gem 'capistrano-passenger'
+   gem 'capistrano-sidekiq'

```

執行 `bundle`

編輯 `Capfile` 加上 `require 'capistrano/sidekiq'`

```
   require 'capistrano/rails'
   require 'capistrano/passenger'
+  require 'capistrano/sidekiq'

```

執行 `cap production deploy`，遠端伺服器上就會跑起來 Sidekiq 了。

你可以在遠端伺服器上用 `ps ax | grep 'sidekiq'` 指令檢查看看是否有 Sidekiq 進程：

!\[images/62.png\]

> `grep` 指令可以過濾文字，`|` 可以將前面的輸出導到後面指令的輸入。

之後每次 `cap production deploy` 進行佈署的時候，這也會重開 sidekiq。

## [](#cron-固定排程)Cron 固定排程

Sidekiq 是不定時由用戶的某個行為來觸發，但有時候我們需要的是某個固定時間由系統排程來執行，例如每天凌晨四點進行備份、每天凌晨寄信提醒繳費、每周一凌晨一點產生報表等等。這種情況可以透過 Linux 內建的例行性排程機制 Cron。

> [例行性工作排程(crontab)](http://linux.vbird.org/linux_basic/0430cron.php)

首先，你先將需要執行的任務寫成一個 rake 指令，這樣就可以在主機上用 crontab 指令去執行這個 rake。

不過由於 crontab 的格式不是非常友善，我們可以透過 [whenever](https://github.com/javan/whenever) 這個 Gem 來編輯，用 Ruby 的語法撰寫 crontab 語法，並且他支援搭配 capistrano 在佈署時自動更新 crontab，非常方便。

### [](#安裝方式)安裝方式

修改 Gemfile 加上

```
+ gem 'whenever', :require => false

```

接著執行 `bundle` 和 `wheneverize .` 就會產生設定檔。

### [](#排程設定)排程設定

修改 `config/schedule.rb` 加入你要的排程工作，例如：

```
env :PATH, ENV['PATH']
set :output, 'log/cron.log'

# 每個小時調用一次 rake check_event_registrations
every 1.hour do
  rake "check_event_registrations"
end

# 每天調用一次 rake fetch_user_feeds
every 1.day do
  rake "fetch_user_feeds"
end

```

### [](#capistrano-設定)Capistrano 設定

在 `Capfile` 加入 `require "whenever/capistrano"`

這樣就會在 `cap production deploy` 自動化佈署時，自動更新伺服器上的 crontab。

## [](#17-安全防護)17\. 安全防護

## [](#調整伺服器-ssh-設定)調整伺服器 SSH 設定

伺服器開了自己帳號之後，我們可以不允許 root 遠端登入：

用 root 權限編輯 `/etc/ssh/sshd_config`

修改 `PermitRootLogin no` 這樣就不允許 root 選端登入。

如果你有設好用公鑰登入，也可以修改 `PasswordAuthentication no`，這樣就不能用輸入密碼的方式登入。這樣伺服器會安全的多，因為駭客就不能猜密碼了。只是說如果你不是用自己的電腦想要登入伺服器，沒有公鑰檔案的話就沒有辦法登入了。

最後，執行 `sudo service ssh restart` 就會重啟 SSH 套用設定。

## [](#防火牆)防火牆

像 Linode 並沒有內建防火牆功能，我們可以用 ufw 這個工具來設定 Linux 要開放哪些 Port。

以下是開放 Port 22, 80, 443 的指令：

-   `sudo apt-get install ufw`
-   `sudo ufw default deny`
-   `sudo ufw allow 22`
-   `sudo ufw allow 80`
-   `sudo ufw allow 443`
-   `sudo ufw enable` 啟用防火牆
-   `sudo ufw status` 顯示目前狀態

如果發現網站被特定IP攻擊，也可以用 ufw 來丟棄特定來源的封包：

-   `sudo ufw insert 1 deny from <要ban掉的IP>`
-   `sudo ufw reload`

## [](#18-伺服器數據備份)18\. 伺服器數據備份

一個正式運營中的網站，數據備份是一件非常重要的事情，無論是天災人禍，不怕一萬只怕萬一。

伺服器上要備份的數據有哪些？

1.  源代碼：這個我們都放在 Github 上了，加上 Git 分佈式的特性，每個開發者都有一份完成的 repo，因此不需要備份伺服器上的源代碼。
2.  資料庫：這是最重要的，需要匯出。
3.  用戶上傳的檔案：如果你有做檔案上傳的功能，就會需要備份這些檔案。不過如果有用七牛雲或 AWS S3 來放檔案的話，就不需要擔心了。

備份數據需要存放在不同台機器才保險。除了備份程序之外，復原的程序也很重要，需要實際驗證。很多公司以為做了備份，但真的發生事情要復原時，才發現備份的檔案不能用。

## [](#手動備份)手動備份

匯出資料庫：

MySQL 的指令是 `mysqldump -u root -p rails_recipes > rails_recipes.sql`

參數 `-u root` 表示用資料庫的 root 帳號、`-p` 表示要輸入密碼、匯出 `rails_recipes` 資料庫到 `rails_recipes.sql` 這個檔案

PostreSQL 的指令是 `pg_dump -W -U postgres -h localhost rails_recipes > rails_recipes.sql`

接著我們可以 `gzip rails_recipes.sql` 壓縮起來，備份到其他電腦即可。

資料庫匯入：

MySQL 的指令是 `mysql -u root -p rails_recipes < rails_recipes.sql`

PostgreSQL 的指令是 `psql -W -U postgres -h localhost rails_recipes < rails_recipes.sql`

用戶上傳的檔案：

放在 `/home/deploy/rails-recipes/shared/public/system` 目錄下，請打包壓縮備份回其他電腦。

## [](#自動備份)自動備份

使用 [https://github.com/backup/backup](https://github.com/backup/backup) 這個 Ruby 工具可以幫助我們設定好自動備份，可以參考 [https://gist.github.com/ihower/5a28624f9420fb9a7c49](https://gist.github.com/ihower/5a28624f9420fb9a7c49) 這會備份整個 mysql 資料庫，打包壓縮整個 /srv 目錄，上傳到指定的 AWS S3 bucket，最後寄送 email 通知完成。

在伺服器上執行 `crontab -e` 可以編輯例行性工作排程(crontab)，以下是一個每日凌晨 4:30 自動執行的範例：

```
30 4 * * * /bin/bash -l -c '/usr/local/bin/backup perform -t my_backup -c /home/ihower/Backup/config.rb'
```

* * *
