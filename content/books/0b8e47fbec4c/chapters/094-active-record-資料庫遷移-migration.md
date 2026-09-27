> Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning. - Rick Cook

Migrations（資料庫遷移）可以讓你用 Ruby 程式來修改資料庫結構。相較於直接進資料庫系統使用 SQL 修改結構(例如使用 phpMyAdmin 工具來修改)，使用 Migrations 可以讓我們有記錄地進行資料庫修改，每次變更就是一筆 Migration 記錄。在沒有 Migration 之前，如果你手動修改了資料庫，那麼你就必須通知其他開發者也進行一樣的修改步驟。另外，在正式佈署的伺服器上，你也必須追蹤並執行同樣的變更才行。而這些步驟如果沒有記錄下來，就很容易出錯。

Migrations 會自動追蹤哪些變更已經執行過了、那些還沒有，你只要新增 Migration 檔案，然後執行 rake db:migrate 就搞定了。它會自己搞清楚該跑哪些 migrations，如此所有的開發者和正式佈署的伺服器上，就可以輕易的同步最新的資料庫結構。另外一個優點是： Migration 是獨立於資料庫系統的，所以你不需要煩惱各種資料庫系統的語法差異，像是不同型態之類的。當然，如果要針對某個特定資料庫系統撰寫專屬功能的話，還是可以透過直接寫 SQL 的方式。

## [](#新增-migration-檔案)新增 Migration 檔案

執行以下指令，就會在 db/migrate/ 目錄下產生如 20110203070100\_migration\_name.rb 的檔案

```
rails g migration migration_name
```

> 注意到在 migration\_name.rb 前面有著如 YYYYMMDDHHMMSS 的時序前置，用來表明執行的順序。在早先的 Rails 版本中，是使用編號 1,2,3 來指名執行的順序，但是如果有不同分支多人開發就可能會有重複的編號，因此在 Rails 2.1 之後的版本改採用時間戳章，讓 Rails 能夠應付多人開發的狀況。

> migration\_name 常見的命名方式有`Add欄位名To表格名`或是`Remove欄位名From表格名`，不過這沒有一定，能描述目的即可。

讓我們打開這個檔案看看：

```
class MigrationName < ActiveRecord::Migration[5.1]

  def change
  end

end
```

在這個類別中，包含了一個方法是_change_，這會在執行這個 migration 時執行。

## [](#migration-可用的方法)Migration 可用的方法

在上述_change_方法裡，我們有以下方法可以使用：

對資料表做修改:

-   create\_table(name, options) 新增資料表
-   drop\_table(name) 移除資料表
-   rename\_table(old\_name, new\_name) 修改資料表名稱
-   change\_table 修改資料表欄位

個別修改資料表欄位:

-   add\_column(table, column, type, options) 新增一個欄位
-   rename\_column(table, old\_column\_name, new\_column\_name) 修改欄位名稱
-   remove\_column(table, column) 移除欄位
-   change\_column(table, column, type, options) 修改欄位的型態(type)
-   change\_column\_default(table, column, new\_default\_value) 變更欄位的預設值

新增、移除索引:

-   add\_index(table, columns, options) 新增索引
-   remove\_index(table, index) 移除索引

options 可為空，或是`:unique => true`表示這是唯一。

新增、移除外部鍵限制:

-   add\_foreign\_key(from\_table, to\_table, options)
-   remove\_foreign\_key(from\_table, to\_table, options)

options 可為空，或是可自定`:column => from_table_foreign_key_column` (預設是`{to_table}_id`)和`:primary_key => to_table_primary_key_column`(預設是`id`)。

### [](#新增和移除-table)新增和移除 Table

執行 rails g model 時，Rails就會順便新增對應的 Migration 檔案。以上一章產生的_categories migration_為例：

```
class CreateCategories < ActiveRecord::Migration[5.1]
    def change
        create_table :categories do |t|
          t.string :name
          t.integer :position
          t.timestamps
        end

        add_column :events, :category_id, :integer
        add_index :events, :category_id
    end
end
```

其中的 timestamps 會建立叫做 created\_at 和 updated\_at 的時間欄位，這是Rails的常用慣例。它會自動設成資料新增的時間以及會後更新時間。

### [](#修改-table)修改 Table

我們來試著新增一個欄位吧：

```
rails g migration add_description_to_categories
```

打開 db/migrate/20110411163049\_add\_description\_to\_categories.rb

```
class AddDescriptionToCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :description, :text
  end
end
```

完成後，執行`bin/rake db:migrate`便會實際在資料庫新增這個欄位。

## [](#資料庫的欄位定義)資料庫的欄位定義

為了能夠讓不同資料庫通用，以下是_Migration_中的資料型態與實際資料庫使用的型態對照：

| Rails中的型態 | 說明 | MySQL | Postgres | SQLite3 |
| --- | --- | --- | --- | --- |
| :string | 有限長度字串 | varchar(255) | character varying(255) | varchar(255) |
| :text | 不限長度文字 | text | text | text |
| :integer | 整數 | int(4) | integer | integer |
| :float | 浮點數 | float | float | float |
| :decimal | 十進位數 | decimal | decimal | decimal |
| :datetime | 日期時間 | datetime | timestamp | datetime |
| :timestamp | 時間戳章 | datetime | timestamp | datetime |
| :time | 時間 | time | time | datetime |
| :date | 日期 | date | date | date |
| :binary | 二進位 | blob | bytea | blob |
| :boolean | 布林值 | tinyint | boolean | boolean |
| :json | JSON | json | json | json |
| :references | 用來參照到其他Table的外部鍵 | int(4) | integer | integer |

另外，欄位也還有一些參數可以設定：

-   `:null` 是否允許_NULL_，預設是允許，即`true`
-   `:default` 預設值
-   `:limit` 用於_string_、_text_、_integer_、_binary_指定最大值
-   `:index => true` 直接加上索引
-   `:index => { :unique => true }` 加上唯一索引
-   `:foreign_key => true` 加上外部鍵限制

例如：

```
create_table :events do |t|
    t.string :name, :null => false, :limit => 60, :default => "N/A"
    t.references :category # 等同於 t.integer :category_id
end
```

參考資料：[ActiveRecord::ConnectionAdapters::TableDefinition](http://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/TableDefinition.html)

### [](#欄位名稱慣例)欄位名稱慣例

我們已經介紹過了 timestamps 方法會自動新增兩個時間欄位，Rails 還保留了幾個名稱作為慣例之用：

| 欄位名稱 | 用途 |
| --- | --- |
| id | 預設的主鍵欄位名稱 |
| {tablename}\_id | 預設的外部鍵欄位名稱 |
| created\_at | 如果有這個欄位，Rails便會在新增時設定時間 |
| updated\_at | 如果有這個欄位，Rails便會在修改時設定時間 |
| created\_on | 如果有這個欄位，Rails便會在新增時設定時間 |
| updated\_on | 如果有這個欄位，Rails便會在修改時設定時間 |
| {tablename}\_count | 如果有使用 Counter Cache 功能，這是預設的欄位名稱 |
| type | 如果有這個欄位，Rails便會啟動STI功能(詳見ActiveRecord章節) |
| lock\_version | 如果有這個欄位，Rails便會啟動Optimistic Locking功能(詳見ActiveRecord章節) |

## [](#migration-搭配的-rake-任務)Migration 搭配的 Rake 任務

-   rake db:create 依照目前的 RAILS\_ENV 環境建立資料庫
-   rake db:create:all 建立所有環境的資料庫
-   rake db:drop 依照目前的 RAILS\_ENV 環境刪除資料庫
-   rake db:drop:all 刪除所有環境的資料庫
-   rake db:migrate 執行Migration動作
-   rake db:rollback STEP=n 回復上N個 Migration 動作
-   rake db:migrate:up VERSION=20080906120000 執行特定版本的Migration
-   rake db:migrate:down VERSION=20080906120000 回復特定版本的Migration
-   rake db:seed 執行 db/seeds.rb 載入種子資料
-   rake db:version 目前資料庫的Migration版本
-   rake db:migrate:status 顯示目前 migrations 執行的情況

> 如果需要指定Rails環境，例如production，可以輸入 RAILS\_ENV=production rake db:migrate

## [](#種子資料-seed)種子資料 Seed

種子資料_Seed_的意思是，有一些資料是應用程式跑起來必要基本資料，而這些資料的產生我們會放在_db/seeds.rb_這個檔案。例如，讓我們打開來，加入一些基本的_Category_資料：

```
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Category.create!( :name => "Science" )
Category.create!( :name => "Art" )
Category.create!( :name => "Education" )
```

輸入`rake db:seed`就會執行這個檔案了。通常執行的時機是第一次建立好資料庫和跑完_Migration_之後。

## [](#data-migration-資料遷移)Data Migration 資料遷移

Migrations 不只可以用來變更資料表定義，它也很常用來遷移資料。新增或修改欄位時，還蠻常也需要根據現有的資料，來設定新欄位的值。這時候我們就會在 Migration 利用 ActiveRecord 來操作資料。

不過，如果你在Migration中修改了資料表欄位，隨即又使用這個Model來做資料更新，那麼因為Rails會快取資料表的欄位定義，所以會無法讀到剛剛修改的資料表。這時候有幾個辦法可以處理：

第一是呼叫 reset\_column\_information 重新讀取資料表定義。

第二是在 Migration 中用 ActiveReocrd::Base 定義一個新的空白 Model 來暫時使用。

第三是用 execute 功能來執行任意的 SQL。

也有蠻多團隊的最佳實務是只在 Rails migration 裡面做 schema 變更，而把變更資料的工作放在 rake 裡面做。如此的好處是避免在部署的流程一起執行 data migration，而是可以分開在背景手動執行，較有運營上的彈性。拆開 rake 也比較方便進行開發測試。

-   [https://dev.to/jetthoughts/data-migrations-with-rails-291b](https://dev.to/jetthoughts/data-migrations-with-rails-291b)

## [](#production上跑migration注意事項)_Production_上跑_Migration_注意事項

有些修改資料庫 schema 的操作，會暫時鎖住資料表無法寫入。因此如果你的 Production 有上百萬筆資料，跑 Migration 時有可能會影響網站的正常運作，甚至倒站。因此建議用_staging server_用接近_production_的資料來先測試會跑多久。或是參考以下這篇文件，分步驟來進行 Migrations 操作，來避免倒站的情況：

-   [https://github.com/ankane/strong\_migrations](https://github.com/ankane/strong_migrations)

### [](#bulk參數)_bulk_參數

`:bulk => true`可以讓變更資料庫欄位的_Migration_更有效率的執行，如果沒有加這個參數，或是直接使用`add_column`、`rename_column`、`remove_column`等方法，那麼_Rails_會拆開_SQL_來執行，例如：

```
change_table(:users) do |t|
  t.string :company_name
  t.change :birthdate, :datetime
end
```

會產生：

```
ALTER TABLE `users` ADD `im_handle` varchar(255)
ALTER TABLE `users` ADD `company_id` int(11)
ALTER TABLE `users` CHANGE `updated_at` `updated_at` datetime DEFAULT NULL
```

加上`:bulk => true`之後：

```
change_table(:users, :bulk => true) do |t|
  t.string :company_name
  t.change :birthdate, :datetime
end
```

會合併產生一行_SQL_：

```
ALTER TABLE `users` ADD COLUMN `im_handle` varchar(255), ADD COLUMN `company_id` int(11), CHANGE `updated_at` `updated_at` datetime DEFAULT NULL
```

這對已有不少資料量的資料庫來說，會有不少執行速度上的差異，可以減少資料庫因為修改被_Lock_鎖定的時間。

## [](#schema檔案的格式)_Schema_檔案的格式

_db/schema.rb_這個檔案是根據_Migrations_遷移最後的結果，自動產生出來的終極資料庫綱要檔案。這樣如果要全新建立一個資料庫，就不需要用_Migrations_一個一個從頭跑到尾(例如老_Rails_專案是非常有可能沒辦法順利跑完的)，可以用`bundle exex rake db:schema:load`這個指令直接載入綱要進空的資料庫。

> 老專案通常會直接從同事拿到資料庫匯出的檔案來做匯入，因為除了Schema之外，也需要有數據資料來開發。使用 MySQL 的話，在本機可用 `mysql -u root 資料庫名稱 < 資料庫匯出的檔案.sql` 這樣的指令來做匯入。

另外，每次跑自動化測試的時候，為了節省建立資料庫的時間，也會使用這個_Schema_綱要。這個綱要預設的格式是`:ruby`，也因此沒辦法表達出特定資料庫所專屬的功能，像是觸發（triggers）或是預存程序（stored procedures）等等。所以如果你的 Migration 中有自定的 SQL 陳述句，需要把_schema_的格式設定成`:sql`。請修改_config/application.rb_加上

```
# Use SQL instead of Active Record's schema dumper when creating the database.
# This is necessary if your schema can't be completely dumped by the schema dumper,
# like if you have constraints or database-specific column types
# config.active_record.schema_format = :sql
```

> 改用 :sql 的話，Rails 會倒出現有的 development 資料庫，產生 #{Rails.env}\_structure.sql 檔案來作為測試資料庫之用。

## [](#更多線上資源)更多線上資源

-   [Active Record Migrations](http://guides.rubyonrails.org/migrations.html)

* * *
