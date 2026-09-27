> Give someone a program, you frustrate them for a day; teach them how to program, you frustrate them for a lifetime. - David Leinweber

在這一章中，我們將介紹如何安裝_Ruby on Rails_的開發環境。開發_Rails_的環境需要：

-   _Ruby 2.2.2_以上版本或_JRuby_，本書使用_2.4.0_。
-   資料庫系統，_Rails_預設使用_[SQLite](http://www.sqlite.org/)_可以作為新手開發練習之用，正式上線環境則推薦使用_[MySQL](http://www.mysql.com/)_或_[PostgreSQL](http://www.postgresql.org/)_。
-   _Ruby on Rails_，本書適用_5.0+_版本。

> _[JRuby](http://jruby.org/)_與_Ruby_最大的差異在於一些需要編譯的_RubyGem_套件：有些因為效能要求而用_C_語言撰寫的_RubyGem_在_JRuby_上不一定能夠安裝使用。所幸這些多半都有替代的套件可以使用，但不在本書介紹範圍。

以上差不多就是最基本的開發需求。如果需要部署到正式上線環境，則至少還需要一個專門的網站伺服器(_Apache_或_Nginx_等)，我們會在佈署一章再詳細說明。接下來我們會根據不同作業系統來說明如何安裝_Rails_開發環境。

## [](#作業系統)作業系統

_Ruby_可以運行在_Windows_、_Linux_、_Mac OS X_、_BSD_和_Solaris_上。雖然_Rails_可以在_Windows_上執行，但是有些套件只有支援_Unix-like_作業系統，以及_Ruby_程式在_Unix-like_系統上執行起來也比較快速及穩定。這是因為絕大多數的_Ruby_和_Rails_開發人員都是使用_Mac_和_Linux_系統。

> _Unix-like_泛指各種傳統的_Unix_系統，比如_FreeBSD_、_OpenBSD_、_Solaris_，以及各種與_Unix_類似的系統，例如_Linux_、_Mac OS X_等等。有的是自由軟體，有的是商業軟體，但都相當程度地保留了原始_Unix_系統的特性，以及有許多相似之處。

因此，_Rails_的正式上線環境中都會強烈建議使用_Unix-like_作業系統。作為開發人員，擁有良好使用者介面、底層又與_Unix_類似的_Mac_作業系統就變成了首選的開發平台，大部分的專業_Ruby_工作者，也都是使用_Mac_電腦。不過，使用_Windows_的朋友也別太擔心，本書的內容大致適用，入門學習應該沒問題。只是如果讀者的每日工作就是進行_Web_網站開發，那麼我會建議您考慮使用_[Mac OS](https://www.apple.com/osx/)_系統或試試_[Ubuntu Desktop](http://www.ubuntu.com/desktop)_作業系統。和學習_Ruby_一樣，從 _Windows_轉換到頭來_Mac_也是非常有趣的事情，可以獲得不少樂趣。

> 這是使用開源軟體需要考慮的因素：開源軟體是靠社群維護的，因此較多人使用的主流平台(作業系統、資料庫等)就會支援較佳，而越少人用的平台就會地雷較多。

## [](#資料庫)資料庫

_Rails_支援的資料庫包括_SQLite3_、_MySQL_、_Postgres_、_[IBM DB2](http://programmingzen.com/category/databases/db2/)_、_[Oracle](https://github.com/rsim/oracle-enhanced)_和_[SQL Server](http://www.engineyard.com/blog/2011/modern-sql-server-rails/)_等。除了安裝資料庫軟體，我們也需要安裝搭配的_Ruby_函式庫(稱作_Adapter_或_Driver_)。作為新手的單機練習，使用_SQLite_就可以了，本章會先介紹_SQLite_的安裝方式。[附錄](https://ihower.tw/rails/advanced-installation.html)則會介紹如何安裝_MySQL_和_PostgreSQL_。

## [](#開發環境)開發環境

### [](#命令列視窗)命令列視窗

有許多工作需要透過指令列介面_CLI (Command Line Interface)_完成，像是安裝套件、執行_rails_指令、執行測試等等。雖然有一些_GUI_圖型介面工具可以輔助，但是到頭來你會發現還是直接在指令列輸入最快最可靠，發生問題的時候也容易除錯。

_Mac OS_下要進入命令列視窗，請打開_Go->Utilities_中的_Terminal_，或是筆者推薦可以安裝_[iTerm2](http://iterm2.com/)_。_Ubuntu Desktop_下是_Applications->Accessories_下的_Terminal_。_Windows_則是「開始->附屬應用程式」中的「命令提示字元」。

_Unix-like_的指令和_Windows_的指令很多是不同的，以下是一些常用的指令：

| 用途 | _Unix-like_ | _Windows_ |
| --- | --- | --- |
| 移動所在目錄 | cd XXX | cd XXX |
| 移動到上一層目錄 | cd .. | cd .. |
| 顯示目前所在目錄 | pwd | cd |
| 顯示目前目錄的檔案 | ls | dir |
| 刪除檔案 | rm XXX | erase XXX |
| 刪除目錄 | rmdir XXX | rmdir XXX |
| 建立目錄 | mkdir XXX | mkdir XXX |

另外，在輸入檔名或目錄名時，可以按_tab_來自動完成。

不熟稔_CLI_的話，建議可以閱讀_[The designer’s guide to the OSX command prompt](http://wiseheartdesign.com/articles/2010/11/12/the-designers-guide-to-the-osx-command-prompt/)_和_[The Command Line Crash Course](http://cli.learncodethehardway.org/book/)_進行惡補。

### [](#開發軟體)開發軟體

在開始寫點程式之前，讓我們先介紹一下有什麼推薦的編輯器。相較於靜態語言如_C++、Java_喜歡功能豐富的_IDE(Integrated Development Environment)_軟體，動態語言雖然也有一些_IDE_軟體，但是更多人比較偏好簡單的文字編輯器_(Editor)_加上命令列視窗就可以打遍天下。這是因為對表達能力強的動態語言來說，_IDE_提供的自動產生程式碼、編譯程式、複雜的瀏覽功能等等都不是這麼需要。

#### [](#editor文字編輯器)_Editor_文字編輯器

-   [Sublime Text](http://www.sublimetext.com/) (_Windows_、_Linux_、_Mac_平台)
-   [ATOM](https://atom.io) (_Windows_、_Linux_、_Mac_平台)
-   [Vim](http://www.vim.org/)

#### [](#ide軟體)_IDE_軟體

-   [JetBrains RubyMine](http://www.jetbrains.com/ruby/)

> 無論用什麼編輯器，請注意檔案的格式要儲存成_UTF-8_，無_BOM(byte-order mark)_表頭。

### [](#版本控制系統)版本控制系統

版本控制系統可以保存所有的程式變更，記錄誰改變什麼、在什麼時候、因為什麼原因，是團隊開發不可或缺的協同工具。_Ruby_社群普遍使用_[Git](http://git-scm.com/)_這套分散式版本控制系統。雖然學習_Rails_不必要學會_Git_，但是因為_Rails_本身以及絕大部分的相關套件都是使用_Git_版本控制系統、並放在_[GitHub](https://github.com)_上。所以你最好還是安裝有_Git_並學會基本的操作。關於_Git_的介紹請參考附錄。

## [](#安裝ruby及資料庫)安裝_Ruby_及資料庫

以下是分別在_Mac OSX_、_Ubuntu Desktop_作業系統上，安裝_Ruby_最快速方便的方式。在上手_Rails_的開發之後，可以再參考[附錄](https://ihower.tw/rails/advanced-installation.html)，依需求安裝不同開發環境。

### [](#mac-os-x)Mac OS X

我們使用_[Homebrew](http://brew.sh/)_這套工具來管理_MacOS_上的套件，這可以方便安裝一些常用的工具軟體，例如_Git_、_MySQL_，甚至是_Memcached_、_Elasticsearch_、_Redis_、_MongoDB_等等都可以透過_Homebrew_安裝。本書的_Mac_安裝步驟中會使用到_Homebrew_，它的安裝步驟是執行：

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

過程中會跳出一個視窗詢問是否安裝_XCode_的命令列開發者工具_(Command Line Tools)_，請選擇安裝。如果沒有的話，請手動執行 `xcode-select --install` 這個指令。

完成後回到命令列繼續_Homebrew_的安裝。

_Mac OS_雖然內建了_Ruby_，卻是比較舊的版本，這裡我們透過_Homebrew_安裝最新版的_Ruby_：

```
$ brew install ruby
```

完成之後輸入以下指令可以看到安裝的版本：

```
$ ruby -v
ruby 2.4.1p111 (2017-03-22 revision 58053) [x86_64-darwin16]
```

### [](#windows)Windows

請至_[RubyInstaller](http://rubyinstaller.org/)_下載_Ruby_安裝包，如果_Windows_是64位元則下載_(x64)_的版本。安裝過程中請點選將_Ruby_加入可執行的路徑_(Add Ruby executables to your PATH)_。

> 我們開發用的_SQLite3_資料庫函式庫在_Windows_上不支援_Ruby 2.2_的版本，請下載_2.1_的版本。(2015-06-09 的實驗結果，後來有沒有支援不清楚)

安裝成功之後，打開「附屬應用程式」的「命令提示字元」，輸入以下指令可以看到安裝的版本：

```
$ ruby -v
ruby 2.1.5p273 (2014-11-13 revision 48405) [x64-mingw32]
```

另外，有一些_RubyGems_套件會需要編譯動作，所以還需要_Development Kit_。請下載_DevKit-mingw64-32-4.7.2-20130224-1151-sfx.exe_ 或64位元的_DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe_，解壓縮放在_C:\\DevKit_下，接著在「命令提示字元」中進入這個目錄，輸入以下指令：

```
$ cd C:\DevKit
$ ruby dk.rb init
$ ruby dk.rb install
```

> 另一種在_Windows_開發的方式則是使用虛擬機器_(Virtual Machine)_，例如用_[VirtualBox](http://www.virtualbox.org/)_來跑_[Ubuntu Desktop Edition](http://www.ubuntu.com/desktop)_，或是使用_[Cygwin](http://www.cygwin.com/)_來提供_Unix-like_環境。如此就可以避開_Windows_上的種種地雷。

## [](#rubygems簡介)_RubyGems_簡介

_RubyGems_是_Ruby_的套件管理系統，讓你輕易安裝及管理_Ruby_函式庫。你可以在_[RubyGems](http://rubygems.org)_上找到所有的_Ruby_開源套件。另外，讀者如果想找_Ruby_或_Rails_有哪些好用的套件，也可以瀏覽看看_[The Ruby Toolbox](http://ruby-toolbox.com/)_，這個站依照套件的熱門程度排序，非常方便。

### [](#常用指令)常用指令

```
gem -v 告訴你 RubyGems 的版本
gem update --system 升級RubyGems的版本
gem install gem_name 安裝某個套件
gem list 列出安裝的套件
gem update gem_name 更新最新版本
gem update 更新所有你安裝的Gems
gem install -v x.x.x gemname 安裝特定版本
gem uninstall gem_name 反安裝
```

> 執行`gem install gem_name`的時候，它會在安裝完之後，自動產生此套件的_RDoc_和_ri_文件。不過有鑑於目前網路發達，往往直接 _Google_或是在套件官網就可以查詢到文件，所以其實不太需要在本地端機器產生文件，況且安裝的時間耗時又佔硬碟空間。要省略這個步驟，有兩種方式：

每次安裝時，加上以下參數：

```
$ gem install gem_name --no-ri --no-rdoc
```

或是新增一個`~/.gemrc`檔案內容如下，預設就不產生文件：

```
gem: --no-ri --no-rdoc
```

## [](#安裝ruby-on-rails)安裝_Ruby on Rails_

```
$ gem install rails --no-ri --no-rdoc
```

為了節省安裝時間可不安裝文件檔，這裡加上`--no-ri`跟`--no-rdoc`參數。安裝完成之後，輸入`rails -v`你應該會看到_Rails 5.1.0_。

> 使用者_Windows_的朋友可能需要手動安裝，請參考 [INSTALLING USING UPDATE PACKAGES](http://guides.rubygems.org/ssl-certificate-update/#installing-using-update-packages)

中國大陸地區的朋友如果碰到網路連線問題(你懂的)，請改使用[RubyGems鏡像- Ruby China](https://gems.ruby-china.org/)。

* * *
