Part 2: Linux 指令入門

## [](#4-認識命令行-cli-接口)4\. 認識命令行 CLI 接口

Command Line Interface (CLI) 就是指用文字輸入的方式來操作電腦，相對於 Graphical user interface (GUI) 圖形用戶界面來說，CLI 可說是開發者們的好朋友，因為很多操作用 CLI 的方式比起 GUI 可以更有效率的執行，在伺服器上更是只有提供 CLI 可以使用，伺服器不需要 GUI 來耗費額外的運算資源，伺服器不需要接上螢幕，只有需要運維的時候我們會透過網路遠端登入進去操作。

不同作業系統有不同的 CLI 指令，由於 Mac 和 Linux 都是 [UNIX-like](https://zh.wikipedia.org/wiki/%E7%B1%BBUnix%E7%B3%BB%E7%BB%9F) 作業系統，所以作業系統的架構和 CLI 指令十分相像，因此可以跑在 Linux 上的開源軟體(特別是 Web 後端用到的軟體，例如各種資料庫、網站伺服器、Ruby/Python/PHP 程式語言語言等等) 也都支援 Mac，反而 Windows 支援比較差，CLI 指令也完全不同。這也是為什麽 Web 開發者愛用 Mac 的原因，因為接近 Linux 伺服器的環境。

![unix](https://ihower.tw/rails/part2/08-linux-deployment/images/unix.png)

> 微軟在 2014 年換 CEO 後才意識到這個問題，在 Windows 10 上推出了 [Linux Subsystem 和 Bash on Ubuntu on Windows](https://msdn.microsoft.com/en-us/commandline/wsl/about) 來試圖力輓狂瀾…

## [](#名詞釋疑-terminal-console-和-shell)名詞釋疑: Terminal, Console 和 Shell

Terminal 是指 CLI 輸入輸出的接口程序，例如 mac 內建的 Terminal，或是另外裝的 [iTerm2](https://www.iterm2.com)。使用 Terminal 時會需要設定要用哪一種 Shell。

Shell 是指和電腦溝通的指令，這有分很多種，Unix 上常見使用 Bash Shell，Mac 也是預設用 Bash，但也有人推薦改用 Zsh 更為花俏。Windows 則是用 PowerShell。Shell 可以只當作是 Shell command 用，但也可以當作 Shell script 使用，就像程式語言一樣。

Console 指某特定的指令語言環境，例如 mysql console (輸入 SQL 指令)、irb console (輸入 Ruby 程序)、rails console (輸入 rails 程序)

## [](#terminal-視窗操作技巧)Terminal 視窗操作技巧

-   `Control+c` 取消目前指令
-   `Control+z` 中斷目前指令
-   `Control+a` 跳到指令最前面
-   `Control+e` 跳到指令最後面
-   `Control+l` 清除畫面 (或用 clear 指令)

## [](#一些簡單的-cli-指令)一些簡單的 CLI 指令

> 這些指令 Mac 和 Linux 大部分都是通用的

-   `date` 會顯示系統時間
-   `uname -a` 顯示系統版本
-   `uptime` 查電腦開機多久了
-   `which` 查詢執行檔的確切位置
-   `history` 查詢剛剛執行過的指令

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/40.png)

-   `man` 可以查指令的文件，按 `q` 可以離開

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/41.png)

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/42.png)

## [](#認識-path-環境變數)認識 PATH 環境變數

剛剛執行 `which date` 和 `which uptime` 時，告訴我們這兩個執行檔真正的位置放在 `/bin/date` 和 `/usr/bin/uptime`。

為什麽 Linux 知道要去哪些目錄去找執行檔在哪裡呢? 為什麽不需要執行 `/bin/date`，只需要執行 `date` 就夠了?

在 Linux 中有個特別的環境變數叫做 `PATH`，你可以用 `echo` 指令來輸出：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/56.png)

PATH 這個環境變數定義了要去哪些目錄去找執行檔。

> 在 Ruby 程序中，`ENV` 這個常數就是作業系統的環境變數，用 `ENV["PATH"]` 可以讀到

用 `export` 指令可以設定環境變數。

## [](#其他-cli-參考資料)其他 CLI 參考資料

先加入書籤，之後有空看。

-   [快樂的 Linux 命令行](http://billie66.github.io/TLCL/)
-   [Unix/Linux 命令參考](https://i.linuxtoy.org/files/pdf/fwunixref.pdf)
-   [Ten Steps to Linux Survival 電子書](http://www.oreilly.com/programming/free/ten-steps-to-linux-survival.csp)
-   [Command Line Crash Course](https://learnpythonthehardway.org/book/appendixa.html)

Linux 的文件系統和 Mac 很像，以下介紹相關的指令：

-   `pwd` 顯示目前所在的工作目錄
-   `cd` 可以切換目前的工作目錄

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/43.png)

在 Linux 中有哪些目錄呢？大概說明一下：

-   `/` 是根目錄
-   `/home` 用戶目錄，每個用戶會有自己的家目錄。（在 Mac 上是 `/Users`)
-   `/etc` 放各種軟體的配置文件，例如 mysql, nginx
-   `/var` 放 log 日誌
-   `/usr` 應用程序的安裝目錄 user program
-   `/tmp` 暫存目錄，作業系統會定期清除，重開機也會清除
-   `~` 這個符號是家目錄的意思，如果目前登入的用戶是 `root`，那個 `cd ~` 會前往 `/root`。如果目前是用 ihower 帳號登入，`cd ~` 就會前往 `/home/ihower/`

## [](#一些檔案管理的指令)一些檔案管理的指令

-   `ls -la` 顯示所有檔案，包含 `.` 開頭的隱藏檔案

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/44.png)

這會顯示檔案和目錄的權限(下一章會說明)、檔案大小、最後修改時間。

-   `mkdir` 新增目錄
-   `touch` 創建一個空文件
-   `cp` 複製檔案
-   `mv` 移動檔案或目錄(也可以更名)
-   `ln -s` 建立捷徑別名

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/45.png)

在截圖中，我先建立一個空目錄是 `test`，然後創建一個文件 README.txt，接著複製和移動。最後用 `ln -s` 建立一個捷徑別名(可以看到 abc 指向 todo.txt)

-   `rm` 刪除檔案
-   `rm -r` 刪除整個目錄和以下的檔案

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/46.png)

截圖中用 `rm` 指令刪除了 abc 和 README.txt。`rm` 不能刪除目錄，而 `rmdir` 指令只能刪除空目錄，要用 `rm -r` 指令才可以整個目錄含以下的檔案都刪除掉。

## [](#如何編輯和瀏覽文件)如何編輯和瀏覽文件

在 CLI 中沒有像 Atom 的 GUI 編輯器，作業系統內建的是 nano 或 vi，讓我們練習一下：

輸入 `nano abc.txt`

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/47.png)

按 control + X 再按 Y 再按 Enter 就可以存盤離開。

請務必熟悉一下如何編輯文件，因為我們會時常需要在伺服器上直接編輯各種設定檔。

vi 和 vim 是另一套更為 geek 的文檔編輯器，功能強大但比較難上手使用，有興趣的學員可以自行 google 如何使用。

## [](#如何傳檔案)如何傳檔案？

SSH 通信協議除了可以讓我們登入遠端的伺服器，也可以作為檔案傳輸使用，又叫做 SFTP。CLI 的指令是 `scp`。

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/48.png)

截圖中，第一個指令將本機的 test.txt 傳到伺服器上 root 帳號的 `~/` 目錄。

第二個指令則是將伺服器上的 `~/text.txt` 傳回本機。

> 在 Mac 上可以用 FTP 軟體例如 [Cyberduck](https://cyberduck.io)，通訊協議選 SFTP 就可以連線傳檔。

## [](#如何打包壓縮檔案)如何打包壓縮檔案

壓縮和打包是可以分開的：`gzip` 只能壓縮一個檔案、`tar` 可以打包整個目錄順便壓縮。

-   `gzip` 壓縮檔案
-   `gzip -d` 解壓縮檔案
-   `tar zcvf xxx.tar.gz xxx` 將 xxx 目錄打包並壓縮成 `xxx.tar.gz` 檔案
-   `tar zxcf xxx.tar.gz`。將 `xxx.tar.gz` 解壓縮

如果你要和伺服器傳輸很多檔案，建議先壓縮打包成一個檔案再傳，速度會快很多。

## [](#6-linux-權限管理)6\. Linux 權限管理

## [](#開自己的帳號)開自己的帳號

剛剛登入伺服器用的 `root` 帳號擁有最大的權限，通常我們會另開一個帳號作為平常登入管理之用：

> 有了自己的管理帳號後，稍後的 Linux 安全性章節會說明如何讓 root 無法遠端登入，不然每台伺服器預設都有 root 帳號，要破解密碼的話只要去猜 root 密碼即可。

執行 `adduser ihower`

> 請把 `ihower` 換成你自己的用戶 ID

設定密碼後，一直按 Enter 即可。

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/49.png)

輸入 `exit` 離開伺服器，重新 SSH 登入看看：

`ssh [[email protected]](https://ihower.tw/cdn-cgi/l/email-protection)`

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/51.png)

執行 `pwd` 發現家目錄是 `/home/ihower`

如果試圖去編輯 `/root/abc.txt`，或是 `cd /root` 的話，會出現 `Permission denied` 沒有權限的錯誤，因為這個目錄需要 root 權限。那怎麽辦呢?

`su` 指令可以切換身份，例如切換成 root 帳號：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/52.png)

輸入 root 密碼，就可以變身成 root。

切過去後，如果再輸入 `exit` 則會返回上一層的 ihower 身份。

> `su -` 的 `-` 的意思是可以把 ihower 的環境變數帶過去

## [](#sudo-權限)sudo 權限

很多時候我們只想執行一個指令需要 root 權限，如果每次都要用 `su` 切換身份輸入 root 密碼太麻煩了。Linux 上有一種機制是 sudo 權限，可以暫時提升權限。

新開的帳號沒有 sudo 權限，首先需要將 ihower 加到 sudo 清單：

新增 `/etc/sudoers.d/ihower` 這個檔案，內容是

```
ihower  ALL=(ALL:ALL) ALL

```

> 或是執行 `gpasswd -a ihower sudo` 也可以讓 ihower 新增 sudo 權限

存盤離開。讓我們實驗看看編輯 root 的 `/root/abc.txt`，剛剛如果直接編輯是沒有權限的。現在請在需要 root 權限的指令前加上 `sudo`

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/53.png)

注意到 sudo 後要再次輸入自己密碼，不是 root 的密碼。

## [](#檔案和目錄權限)檔案和目錄權限

Linux 對於每個檔案和目錄，依據不同用戶有著嚴格的權限控制：可否讀、可否寫、可否執行。

執行 `ls -la` 顯示一下當前目前目錄的所有檔案：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/50.png)

第二欄的 root 表示這個檔案屬於 root 用戶，也就是檔案 owner 擁有者。

第三欄的 root 表示這個檔案屬於 root 群組(group)。預設每個用戶會屬於跟自己同名的群組。

而第一欄的欄位共十位，第一位表示是文件還是目錄，`d` 是目錄、`-`是文件。

剩下9位，每三位一組，第一組是檔案 owner 擁有者的權限、第二組是群組(group)群限、第三組是其他用戶。

每組分別是三位來表示，分別是 `rwx`，`r` 表示讀、`w`表示寫入、`x`表示可以執行，`-` 表示沒有權限。

截圖中 abc.txt 是 `-rw-r--r--` 表示這是一個檔案、檔案擁有者是 `rw-` 可以讀寫、無法執行、群組和其他人是 `r--` 表示可以讀不能寫入。

### [](#如何變更檔案權限)如何變更檔案權限？

`chown` 指令可以變更檔案擁有者和群組，例如 `chown ihower:ihower abc.txt` 可以將檔案 abc.txt 的擁有者設定為 `ihower`，群組設定為 `ihower`。如果要修改整個目錄包含以下檔案，則可以用 `chown -R`

`chmod` 指令可以變更檔案的權限，例如 `chmod 644 abc.txt` 就會設定成 `rw-r--r--`。這需要瞭解一下什麽是 Octal Permissions 表示方式：

-   `r 是 4`
-   `w 是 2`
-   `x 是 1`

你要的權限就是把數字加起來，例如 `rw-` 就是 4+2 是 6。`r--` 就是 4。於是 `rw-r--r--` 就是 644 了。

如果理解的話，之後碰到檔案存取權限問題時，就知道如何處理了。

## [](#免密碼登入)免密碼登入

遠端登入除了輸入密碼之外，SSH 還可以用非對稱加密(Public Key Encryption)的方式來做登入。

在非對稱加密算法中，會有兩把鑰匙(key)，一把叫做公鑰(public key)、一把叫做密鑰(private key)。

-   透過公鑰加密的密文，只有密鑰能夠解開
-   透過密鑰加密的密文，只有公鑰能夠解開

於是我們就可以用這個機制來做登入：首先我們把自己的公鑰先放在伺服器上，那麽之後登入時，伺服器會送一個亂數字串給用戶，用戶用密鑰加密後返回伺服器，如果伺服器可以用公鑰解回來，就表示認證成功。

以下是設定的步驟，：

`mkdir ~/.ssh`

`touch ~/.ssh/authorized_keys`

回到本機電腦把公鑰印出來，執行 `cat ~/.ssh/id_rsa.pub` 就會印在畫面上。

回到遠端伺服器繼續：

`nano ~/.ssh/authorized_keys` 把公鑰貼上去

`chmod 700 ~/.ssh`

`chmod 644 ~/.ssh/authorized_keys`

這樣就好了，你可以試試看再次登入就不用打密碼了，太棒了！

以下是操作的截圖：

![images](https://ihower.tw/rails/part2/08-linux-deployment/images/54.png)

這是本機 cat 公鑰的截圖：

![images](https://ihower.tw/rails/part2/08-linux-deployment/images/55.png)

### [](#本機沒有-id_rsapub-)本機沒有 id\_rsa.pub ？

因為 Github 也是用一樣的認證機制，所以之前操作 git 時你應該已經產生過這個 SSH key，並且在 Github 後台貼上你自己的公鑰，所以在 `git push` 時不需要打密碼。

如果本機真的沒有 `~/.ssh/id_rsa.pub` 公鑰的話，需要先產生你自己的公鑰私鑰，請執行 `ssh-keygen -t rsa` 就會產生公鑰 `~/.ssh/id_rsa.pub` 以及密鑰 `~/.ssh/id_rsa` 這兩個檔案。請一直按 Enter，不需要設定 passphrse 密碼(不然你每次用key都要輸入一次密碼很麻煩)。

公鑰可以公開給別人沒關系，密鑰就千萬要保管好喔。

* * *
