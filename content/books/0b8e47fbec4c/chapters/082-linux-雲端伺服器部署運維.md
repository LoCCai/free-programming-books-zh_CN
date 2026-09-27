這堂課將說明指導如何操作和運維 Linux 雲端伺服器，以及部署(deploy) Rails 代碼到自己購買的雲端伺服器。

進行本教程前，建議你先完成網路概論教程。

Part 1: 雲服務

## [](#1-什麽是雲服務)1\. 什麽是雲服務

雲服務是將電腦運算所需要的硬體和軟體資源，透過互聯網遠程使用，而不需要自備電腦或機房。白話的說，就是去租用別人的電腦。

傳統 IT 要建立網站伺服器，需要自行購買電腦硬體、購買網路設備、租用機房實體空間等等，在開站前就必須投資大筆的硬體成本。近年來的雲服務就像水電等公共基礎設施，用多少算多少，你不需要自己蓋電廠或凈水場。

總而言之，雲服務的好處有：

-   抽象化的資源：你不需要擔心底層的硬體設備，包括運算資源(CPU)、儲存資源(硬盤)、網路資源(頻寬)等等都可以租用
-   隨租隨有：隨時可以租、隨時可以退租
-   擴充性：根據需求，隨時可以租更多來對付更大的用戶流量
-   用多少算多少：用了多少資源，就算多少錢

這年頭的新創網路公司，幾乎都會選擇使用雲服務來架設網站伺服器，快速方便又經濟實惠。

## [](#雲服務類型和廠商)雲服務類型和廠商

雲服務可以分成 IaaS、PaaS 和 SaaS 類型，分別為：

-   IaaS：基礎設施服務，Infrastructure-as-a-Service
-   PaaS：平臺服務，Platform-as-a-Service
-   SaaS：軟體服務，Software-as-a-Service

> 另一篇參考文章 [IaaS，PaaS，SaaS 的區別](http://www.ruanyifeng.com/blog/2017/07/iaas-paas-saas.html)

以下分別介紹這幾種類型。

## [](#iaas)IaaS

IaaS 類型(Infrastructure as a Service)的雲服務，你可以租到一臺有最高權限的虛擬機，可以隨你的意願安裝任何軟體。

這裡說明一下什麽是[虛擬機(Virtual Machine)](https://zh.wikipedia.org/zh-cn/虛擬機器)：一臺電腦上會有一個作業系統，這叫做 Host OS (主人)，但是上面可以透過 VM 軟體再安裝不同的作業系統，這叫做 Guest OS (客人)，每個 Guest OS 都是獨立互相隔離的。

在 Mac 上我們可以透過 [VirualBox](https://www.virtualbox.org)、[VMware Fusion](https://www.vmware.com) 或 [Parallels Desktop](https://www.parallels.com/) 等軟體，在 Mac 上再安裝 Windows 或 Linux 作業系統。

在雲服務中其實也有用了 VM 技術來分租給用戶，實際上那一臺伺服器可能是 8 CPU 核心 16GB 記憶體，但是分租給八個用戶，每個人分配到 1 核心 CPU 和 2GB 記憶體。透過 VM 技術，不同用戶的作業系統是完全獨立的，你不會感覺到別的用戶跟你共享同一臺電腦。有些售價非常便宜雲服務商，為什麽售價可以這麽便宜，就是它把一臺伺服器分租給過多的用戶，並且沒有保障你有固定的 CPU 資源可以使用。

讓我們看看知名的 IaaS 服務商：

### [](#國外的雲服務商)國外的雲服務商

-   [Amazon Web Service](http://aws.amazon.com/ec2/) 亞馬遜是目前全世界最大的雲服務商，也是雲服務的領導廠商，在各大洲都布有機房。
-   [Microsoft Azure](http://azure.microsoft.com/zh-tw/services/virtual-machines/) 微軟的雲服務，亞洲的機房在香港和新加坡
-   [Google Cloud Compute Engine](https://cloud.google.com/compute/) 谷歌的雲服務，亞洲的機房在台灣、東京、新加坡
-   [Linode](https://www.linode.com/) 亞洲的機房在東京和新加坡
-   [DigitalOcean](https://www.digitalocean.com/) 新加坡機房
-   [Vultr](https://www.vultr.com/) 東京機房

其中 Linode、DigitalOcean 等傳統上叫做 VPS(Vitual Private Server) 廠商，只提供虛擬機產品，通常價格比較便宜，計價方式也很簡單，一個月只需要美金五塊、十塊起跳，它套裝就包括很夠力 CPU 效能、流量頻寬、硬盤空間等，挑東京機房離台灣和中國大陸也近，所以成為小網站或個人裝機的高C/P值首選。

Amazon、Microsoft 和 Google 這種屬於雲計算平臺，以豐富的雲端生態系見長，除了虛擬機之外，它還有提供資料庫、檔案儲存和 NoSQL 資料庫等等各式各樣的代管服務(不用你自己安裝，它已經裝好並幫你維護)，但同時設定和計價模式也複雜的多，適合專業的網路服務。這些廠商也有提供教育訓練跟證照，在稍有規模的公司裡面，是由專人(叫做系統管理員、System Administrator、DevOps)或運維部門負責操作的。

### [](#中國大陸的雲服務商)中國大陸的雲服務商

-   [阿里雲](https://www.alibabacloud.com/zh)
-   [騰訊雲](https://www.qcloud.com/?lang=zh)
-   [青雲](https://www.qingcloud.com)
-   [UCloud](https://www.ucloud.cn)
-   [Amazon 中國](https://www.amazonaws.cn/?nc1=h_ls)
-   [美團雲](https://www.mtyun.com)

注意到亞馬遜中國的用戶帳號，和國外 Amazon 的帳號是分開的。為了符合中國法規，在境內營業的公司，伺服器都必須設在中國大陸境內。

## [](#paas)PaaS

PaaS 類型的雲服務則是提供固定的程序執行環境，支援特定的程式語言和框架，只要將程式上傳到平臺上就可以執行。其中支援 Ruby 的廠商有：

-   [Heroku](https://www.heroku.com)
-   [IBM Bluemix](https://www.ibm.com/cloud-computing/bluemix)
-   [redhat Openshift](https://www.openshift.com)

之前的教程中，我們將寫好的 Rails 網站部署到 Heroku 上，而 Heroku 的服務其實是兩個服務的總和：IaaS 雲端伺服器和 Rails 的環境。

為了吸引客戶，這些 PaaS 通常會有免費方案可以試用。不過一但需要更多運算資源時，這些 PaaS 的價格比起 IaaS 就貴的多，而且大多只有在美國有機房。因此如果有能力自己運維 Linux 伺服器的話，比較少公司會選擇用 PaaS 平臺。

## [](#saas)SaaS

SaaS (Software as a Service) 類型的雲服務只能執行特定軟體，例如：

-   [金數據](https://jinshuju.net) 人人可用的在線表單工具
-   [Tower](https://hk.tower.im) 你的網上辦公室
-   [strikingly](https://www.strikingly.com) Landing Page
-   [Github](https://github.com)
-   ….非常多，只要是線上用租的軟體都算

SaaS 軟體算是近年來的軟體趨勢，早年的軟體都是一套一套賣斷的，現在則逐漸流行用月租或年租的 SaaS 方式。例如早些年微軟的 Office 軟體就是賣斷的軟體，一套一套賣，現在因為網路發達，加上 Google 推出免費的 Office 線上軟體做競爭，所以微軟也開始推出 SaaS 模式的 Office 365。

## [](#2-租用雲端伺服器linode)2\. 租用雲端伺服器(Linode)

接下來我們要來實際租一臺 IaaS 類型的雲端伺服器，然後在上面運行我們的 Rails 專案：

-   有國際信用卡(VISA/MASTER)的學員，建議使用 Linode 伺服器(日本東京機房)
-   中國大陸的朋友，若沒有國際信用卡，建議用阿里雲

## [](#linux-作業系統)Linux 作業系統

雲端伺服器的作業系統幾乎都是使用 Linux 作業系統，Linux 是一套開源且免費的作業系統。當我們提 Linux 時，通常是講 Linux Kernel (內核)。給一般用戶安裝的又分為不同的發行版本(Linux distribution)，例如 Ubuntu、Linux Mint、Debian、CentOS、Redhat 等等由不同廠商或社區維護。不同發行版會預裝不同的軟體，也有桌面版和伺服器版本之分 (伺服器版本就不需要 GUI 視窗接口)。

這裡推薦初學者使用最多人使用的 [Ubuntu Server](https://www.ubuntu.com/server) 版，比較不會碰到安裝問題，就算碰到也較容易搜尋到解答。依照 Ubuntu 的命名慣例，建議挑`.04`是 LTS (Long Term Support) 版本。目前最近的 LTS 版本是 16.04。

## [](#租用-linode-伺服器)租用 Linode 伺服器

以下是在 Linode 租伺服器的流程：

(使用阿里雲的學員請跳到下一章)

## [](#step-0-註冊-linode)Step 0. 註冊 Linode

前往 [https://www.linode.com](https://www.linode.com/?r=037302ca3f330ec5ca6e910cd1977560d6ff0f3b) 註冊，然後進入 Linode Manager 後台。

## [](#step-1-選擇機器)Step 1. 選擇機器

用最小的 1G 記憶體就夠了，地點選離我們最近的 Tokyo 2 機房。

> 記憶體會影響網站可以服務多少用戶，如果用戶多就需要比較多的記憶體。

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/1.png)

## [](#step-2-安裝作業系統)Step 2. 安裝作業系統

選擇 Ubuntu 16.04 並設定 root 密碼

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/2.png)

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/3.png)

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/4.png)

> root 密碼請務必有足夠的複雜度，如果太好猜被人破解，你的伺服器就會被人入侵拿去做壞事喔，例如去挖比特幣或是網路攻擊的跳板。

## [](#step-3-開機)Step 3. 開機

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/5.png)

確保真的有開好機

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/6.png)

## [](#step-4-登入伺服器)Step 4. 登入伺服器

把 IP 位址記下來，用 SSH 就可以遠端登入伺服器：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/7.png)

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/8.png)

輸入 exit 可以離開伺服器。

## [](#如何移除伺服器)如何移除伺服器？

如果練習完畢，或是覺得做壞了想要重來。別擔心，雲端伺服器就是另一臺電腦，隨時可以砍掉重練。

如果你要砍掉的話，先關機：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/10.png)

然後點移除(Remove)

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/9.png)

> 注意：所有的雲端伺服器如果你只是點關機、中止或停止的按鈕，該伺服器還是會繼續算錢的。你要點移除、刪除或釋放的按鈕，在主控臺上看不到那一臺機器後，才不會繼續算錢。常常有學員忘記移除掉沒有使用的伺服器，就會繼續被扣錢喔。

## [](#3-租用雲端伺服器阿里雲)3\. 租用雲端伺服器(阿里雲)

接下來示範如何租用阿里雲：

## [](#step-0-註冊阿里雲)Step 0. 註冊阿里雲

前往 [https://www.aliyun.com/](https://www.aliyun.com/)，大陸用戶請確認選擇的是中國站：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/11.png)

註冊後需要實名認證，才可以繼續購買伺服器。

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/12.png)

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/13.png)

充值 100 元：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/20.png)

## [](#step-1-選擇機器-1)Step 1. 選擇機器

在選單找到雲端伺服器 ECS 服務：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/14.png)

雲端伺服器 ECS > 實例，單擊創建實例

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/15.png)

配置很多，讓我們稍加說明：

### [](#計費方式和地域)計費方式和地域

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/16.png)

計費分成包年包月和按量付費，前者長期來說會比較便宜，不過如果只是短時間做練習，可以選後者。

不同地點會影響連線速度，你可以挑離給最近的。不同地域可以用的伺服器等級也不一樣，這裡建議用比較新的華北三。

### [](#網路安全組)網路安全組

阿里雲內建了防火牆功能，你需要打開對內連線 Port 22 (SSH 登入用)、Port 80 (HTTP)、Port 443 (HTTPS)。這裡請選預設安全組：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/21.png)

### [](#挑選實例)挑選實例

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/17.png)

可以選最便宜的 1G 記憶體就夠了。

> 記憶體會影響網站可以服務多少用戶，如果用戶多就需要比較多的記憶體。

### [](#鏡像)鏡像

挑選作業系統，請選 Ubuntu 16.04

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/18.png)

### [](#安全設置)安全設置

請設置 root 密碼

> root 密碼請務必有足夠的複雜度，如果太好猜被人破解，你的伺服器就會被人入侵拿去做壞事喔，例如去挖比特幣或是網路攻擊的跳板。

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/19.png)

## [](#step-3-開機-1)Step 3. 開機

開通後，前往控制台實例，等待啟動後，找到分配給你的 IP 位置：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/22-0.png)

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/22.png)

## [](#step-4-登入伺服器-1)Step 4. 登入伺服器

SSH 登入主機

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/23.png)

## [](#如何移除伺服器-1)如何移除伺服器？

如果練習完畢，或是覺得做壞了想要重來。別擔心，雲端伺服器就是另一臺電腦，隨時可以砍掉重練。

首先先停止伺服器

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/34.png)

然後點釋放設置

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/35.png)

確定主控台沒有這個伺服器了

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/36.png)

> 注意：所有的雲端伺服器如果你只是點關機、中止或停止的按鈕，該伺服器還是會繼續算錢的。你要點移除、刪除或釋放的按鈕，在主控臺上看不到那一臺機器後，才不會繼續算錢。常常有學員忘記移除掉沒有使用的伺服器，就會繼續被扣錢喔。

* * *
