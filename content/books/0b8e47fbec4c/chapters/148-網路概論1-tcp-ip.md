-   目標讀者: 應用程式初學開發者，特別是 Application Developer
-   目的: 了解網路是如何運作的基礎知識
-   學校會教理論 [OSI 模型](https://zh.wikipedia.org/wiki/OSI%E6%A8%A1%E5%9E%8B)，這堂課使用比較實務的 RFC 1122 模型：
    -   Application Layer 例如 HTTP、FTP、SSH 等
    -   Transport Layer 例如 TCP、UDP
    -   Internet Layer 例如 IP
    -   Link Layer 例如 [Ethernet](https://zh.wikipedia.org/wiki/%E4%BB%A5%E5%A4%AA%E7%BD%91)、無線網路 802.11n
-   身為 Application Developer，我們主要在應用層 (Application Layer) 活動，最大宗就是熟悉 HTTP，但仍要基本了解底層是怎麼運作的

## [](#前言)前言

本教程將幫助大家瞭解網路是如何運作，什麽是 TCP/IP、DNS 和 HTTP 協議。身為一個 Web 應用程序員 ，你需要知道當我們在網頁瀏覽器的地址欄中輸入一個網址後，背後到底發生了哪些事情。希望在學完這份教程後，你能夠順利回答這個問題。

## [](#1-數位網路是如何運作的)1\. 數位網路是如何運作的？

電腦和電腦之間，是如何透過網路來進行數據傳輸的呢？讓我們先回答一個問題：數位網路跟傳統類比電話有什麽不一樣?

傳統的類比電話使用的是[電路交換](https://zh.wikipedia.org/zh-cn/電路交換)的方式：呼叫方撥打電話後，中間經過電話交換機將線路接到受話方。講電話的時候整條線路會被完全佔用，一條電話線同時間只能一個人在講電話。

數位網路使用的是[封包交換](https://zh.wikipedia.org/zh-cn/分組交換)的方式：我們會把要傳輸的數據拆碎成適當大小的區塊(例如 1500 bytes)，每個小區塊叫做封包(Packet)，每個封包有個首部(Header)會寫上接收方的地址，要傳輸的數據本身叫做酬載(Payload)，然後再通過網路來傳輸。

就像寄信一樣，我們把要寄出去的東西放在信封裡面，這個信封可以想像成是封包的首部(Header)，信封裡面的東西就是封包的酬載(Payload)。

封包交換網路比起傳統的電路交換網路，整個網路基礎設施可以運作的更有效率。因為拆成封包之後，線路就可以讓大家共享，不同人不同電腦可以同時傳輸不同的數據，最佳化整個線路的連線負載能力。

## [](#什麽是網路傳輸協議)什麽是網路傳輸協議？

所謂的網路傳輸協議，就是那個封包的首部的格式，就像信封要怎麽寫有固定的格式。我們需要規範這個格式，才可以順利地讓封包發送出去，讓中間傳輸的網路設備知道要寄到哪裡去。

## [](#網路分層的設計)網路分層的設計

網路傳輸協議有一個非常重要的設計就是分層(Layer)，實務上被分為四層：

-   數據鏈路層 (Link Layer)：用來處理局部網中硬體連接的傳輸，例如 Etherent 協議、無線網路 802.11n 協議、3G/4G 手機網路
-   網路層 (Internet Layer)：用來處理互聯網中的網路設備和網路設備之間的傳輸，例如 IP 協議
-   傳輸層 (Transport Layer)：用來處理電腦到電腦之間的可靠傳輸，例如 TCP 和 UDP 協議
-   應用層 (Application Layer)，網路應用程序之間如何處理數據，例如 HTTP 協議

> 教科書上會教 [OSI 理論模型](https://zh.wikipedia.org/wiki/OSI模型)分成七層，這裡採用實務的 [RFC 1122](https://tools.ietf.org/html/rfc1122) 說法。

你可以想像分層的意思就是封包了四個信封，一層包一層。當我們的瀏覽器打開一個網站的時候，伺服器回傳的 HTML 源碼是最裡面的酬載(Payload)，會被包在 HTTP 信封內，然後再包一層 IP 信封，然後再包一層 TCP 信封，然後再包一層 Etherent 信封，才會抵達你的電腦。

```
--------------------------------------------------------------------
| Etherent 首部 | IP 首部 | TCP 首部 | HTTP 首部 | 實際的數據 HTML 源碼 |
--------------------------------------------------------------------
```

![image](http://linux.vbird.org/linux_server/0110network_basic//packet_total.png) 圖片出處 [http://linux.vbird.org/](http://linux.vbird.org/)

這樣設計的好處是某一層如果需要改變的時候，只需要替換那一層信封就好了。而且層次化之後，要設計新協議也會簡單許多，我們不需要每次都重新設計全部的協議。

接下來幾章讓我們大概說明一下這幾層協議的作用。這些只需要大概瞭解原理跟一些專業術語即可，不需要瞭解協議的完整細節。我們主要會針對應用層的 DNS 和 HTTP 協議重點說明。

## [](#2-數據鏈路層-link-layer)2\. 數據鏈路層 (Link Layer)

家裡或公司的電腦要連上網，首先必須接上網路線或用無線網路，來連結到家裡的路由器(Router)，這之間就需要一層信封寫上電腦的地址，這樣路由器把數據傳回來的時候，才知道要送到哪一臺電腦上。

這一層的傳輸協議根據不同的硬體連接方式有不同的協議，最常見的有：

-   有線網路使用[以太網 (Ethernet)](https://zh.wikipedia.org/wiki/以太網)協議。這種硬體使用 RJ-45 網路線(擰成4對的8根電線)，又可以細分為 100M、1000M 不同頻寬的規格。
-   無線網路的 [IEEE 802.11](https://zh.wikipedia.org/zh-cn/IEEE_802.11) 協議，又可以分成 802.11b, , 802.11g, 802.11n 等等不同規格。
-   移動通信網路使用 [3G](https://zh.wikipedia.org/zh-cn/3G)、[4G](https://zh.wikipedia.org/zh-cn/4G) 協議。

每一個網路設備在出廠的時候，都會配有一個 [Mac 地址](https://zh.wikipedia.org/zh-cn/MAC地址)(Media Access Control Address)，這個地址將用於「直接」相連在一起的硬體。例如連結到同一臺路由器的公司電腦，這台路由器就會用 Mac 地址來決定封包要寄到哪一臺去(我們會說：這是同一個局域網)。

在命令行輸入 `ifconfig` 可以看到 Mac 地址

![image](https://ihower.tw/cs/networking/1.png)

在 Mac 上 `en0` 接口就是你的無線網卡

打開 Mac 的 Networking 配置，也可以看到這個 Mac 地址

![image](https://ihower.tw/cs/networking/2.png)

當你有數據要傳到公開的網站時，首先會從你的電腦傳到家裡或公司的路由器，信封會填上路由路的 Mac 地址，然後發送出去。路由器收到之後，會把這一層的信封拆掉，換上與路由器直接連接的 ISP 路由器的 Mac 地址，然後寄到下一個網路設備，以此類推直到目的地網站伺服器。

> 互聯網服務供應商，Internet Service Provider，簡稱ISP。指的是例如中華電信、中國移動、中國聯通的互聯網電信運營商。

## [](#3-網路層-internet-layer)3\. 網路層 (Internet Layer)

數據鏈路層使用的 Mac 地址，只有直接相連網路設備才會知道。你的電腦知道路由器的 Mac 地址、路由器知道跟他連結的設備的 Mac 地址。但是我們並不知道家裡或公司路由器出去之後的網路設備的 Mac 地址，我們也不可能知道互聯網上所有網路設備 Mac 地址。

互聯網上的節點數太多了，封包是由一個路由器傳遞給下一個路由器，每個傳遞都更接近目的地。而這個目的地需要一個地址，而這就是 IP 協議所處理的。在 IP 協議中，定義了[IP 地址](https://zh.wikipedia.org/zh-cn/IP地址)，其中第四版 [IPv4](https://zh.wikipedia.org/zh-cn/IPv4) 由 4 bytes(32位二進制)的數字組成，也就是大家常看到的 XXX.XXX.XXX.XXX 形式，例如 ihower.tw 伺服器的 IP 地址是 `172.104.102.228`。

這個 IP 地址是全球唯一的，IP 地址最多可有4,294,967,296個，乍看之下好像很多，但是由於互聯網的大量普及，IPv4的42億個地址的分配已經於2011年2月3日全部分配完畢，這會分給[不同國家](https://zh.wikipedia.org/zh-cn/各國IPv4位址分配列表)、公司組織、學校等等使用。

IP 地址設在計的時候，保留了一些[私有IP地址](https://zh.wikipedia.org/wiki/專用網路)地址用於局域網，最常見的是 `192.168.0.0` 到 `192.168.255.255` 這個範圍，你在家裡或公司連上無線路由器時，就會被分配到這個位址。另外還保留一個 `127.0.0.1` 代表的是本機電腦。私有IP地址

## [](#cidr-塊)CIDR 塊

[CIDR](https://zh.wikipedia.org/zh-cn/無類別域間路由)是一種 IP 位址的表示法，用來表示一整個區塊的 IP 位置。

`a.b.c.0/16` 的意思是 `a.b.0.0` 到 `a.b.0.255`，共 65,536 個地址 `a.b.c.0/24` 的意思是 `a.b.c.0` 到 `a.b.c.255`，共 256 個地址 `a.b.c.0/32` 的意思是 `a.b.c.d` 一個地址

詳見[CIDR](https://zh.wikipedia.org/zh-cn/無類別域間路由)的說明，這個用法在你配置網路防火牆的時候會用到。

## [](#ipv6)IPv6

既然 IPv4 地址不夠了，新的標準 [IPv6](https://zh.wikipedia.org/zh-cn/IPv6) 使用了 16 bytes 來表示網路位置，具體數量為 340,282,366,920,938,463,463,374,607,431,768,211,456 個，真的是用不完了。不過實務上對一般用戶似乎很少用到。這是因為要使用 IPv6，必須客戶端到伺服器中間的網路設備都要支援 IPv6，而大部分的 ISP 營運商都還沒預設支援 IPv6。

> [Apple 要求從 2016/6/1 開始，所有上架的 App 必須 IPv6 相容](http://shoshino21.logdown.com/posts/736331-send-apple-for-review-ipv6-support-specifically-should-be-in-line-with-what-conditions)

## [](#nat-技術)NAT 技術

剛剛提到 IPv 4的42億個地址已經被分配完畢，但是似乎大家不是很著急要升級 IPv6 這件事情，這是什麽原因呢？ 這是因為我們用了[NAT](https://zh.wikipedia.org/zh-cn/網路地址轉換)技術，因此不需要每一臺需要上網的電腦，都需要一個公開的 IP 地址。

透過 NAT 技術，家裡或公司只有路由器那一臺網路設備需要公開的 IP 地址，局域網內使用私有 IP 地址即可。這台路由器會記得當初封包是從拿一臺電腦送出來的，當封包從互聯網返回時，會做一個 IP 地址轉換。

這也是因為局域網內的電腦只需要上網，不需要做成伺服器讓互聯網上的其他電腦可以連線。換言之，一臺電腦如果要是互聯網上可以被連線的伺服器，必須要有一個公開的 IP 地址。

## [](#ifconfig-指令)`ifconfig` 指令

`ifconfig` 可以查看 IP 地址

![image](https://ihower.tw/cs/networking/3.png)

打開 Mac 的 Networking 配置，也可以看到這個 IP 地址

![image](https://ihower.tw/cs/networking/4.png)

> 截圖中的 [DHCP 協議](https://zh.wikipedia.org/zh-cn/動態主機設置協議) 指的是當電腦連上路由器時，會自動請路由器分配一個局域網的私有 IP 地址給你。Subnet Mask 是著這個局域網的 IP 範圍，其中 `255.255.255.0` 意思是整段私有 IP 地址數字前面 24bit 是固定的，也就是範圍會是 `192.168.1.1` 到 `192.168.1.255`。Router(路由器)的地址是 `192.168.1.1`，你的封包首先會送到這台網路設備，由路由路決定下一站去哪裡。broadcast 地址 `192.168.1.255` 是向全局域網廣播的地址，結尾 `.255` 是廣播的意思。

## [](#ping-指令)ping 指令

![image](https://ihower.tw/cs/networking/5.png)

ping 可以用來測試封包送到目的地所需要的時間，其中的 time 是 RTT(Round Trip Time) 也就是往返時間，單位是 ms (千分之一秒)。

這個時間主要取決於地理位置，如果你在台灣 ping tw.yahoo.com，會得到 10ms 內超快的速度。如果去 ping 日本的伺服器，大約是 40ms，去 ping 美國的伺服器要 200ms (例如 amazon.com)，要去歐洲或南美洲就更遠了。

這個速度的物理限制是光速，要去美國的海底電纜是走太平洋，往返到地球另一端就是需要這麽多時間。這就是為什麽網站的連線速度要好，就得把伺服器擺的離用戶比較近的原因。

> 不是每一臺伺服器都會回應 ping 信息，有些伺服器會關閉這個功能。

## [](#traceroute-指令)traceroute 指令

traceroute 可以用來追蹤到達目的地過程中，每台路由器節點的回應：

![image](https://ihower.tw/cs/networking/6.png)

跟 ping 一樣，不是每台路由器都會回應這個信息，有些路由器會關閉這個功能。

## [](#4-傳輸層-transport-layer)4\. 傳輸層 (Transport Layer)

IP 封包有 IP 地址可以抵達對方電腦，但是一臺電腦上有很多不同種類的應用程序，到底這個封包抵達對方電腦後，是要給哪一個程序去處理呢? 封包送回來後，又是你電腦的那一個程序去處理？

在傳輸層協議 [TCP](https://zh.wikipedia.org/zh-cn/傳輸控制協議) 和 [UDP](https://zh.wikipedia.org/zh-cn/用戶數據報協議) 中定義了 Port number，在封包首部上會寫上來源埠(Source Port Number)和目的埠(Destination Port Number)。Port Number 就像不同碼頭，編號從 0~65535。

以客戶端瀏覽器發出的封包為例，瀏覽器會隨機選一個來源埠出去，目的埠會是 80 (http) 或 443 (https)，除非你在瀏覽器的自行指定不同的目的埠，例如 `http://localhost:3000`，那就會改用 3000 port，因為 `rails s` 伺服器在本機預設用 3000 port。

伺服器會用哪些 Port 詳見[TCP/UDP埠列表](https://zh.wikipedia.org/zh-cn/TCP/UDP埠列表)，不同的應用程序就會用不同的 Port。每一個需要用到網路的程序，都必須跟作業系統登記申請一個 Port 來使用，作業系統會確認說一個 Port 只能分給一個程序使用。

如果你要編號 1024 以下的話，作業系統還會要求你有 root 權限。1024 以上則不需要，例如 `rails` 伺服器就預設使用了 Port 3000。

![image](https://ihower.tw/cs/networking/7.png)

> 這個 localhost 會被解析成 127.0.0.1 代表本機地址

另外，IP 協議讓我們可以將封包從互聯網的一端傳送到另一端，但是沒有保證封包的可靠傳輸。傳輸過程中可能被中間的路由器丟失(有意或無意、網路壅塞被丟包、外界噪聲干擾等等)，不同封包也可能因為經過不同路由器而造成抵達的順序不同。

因此在 TCP 協議中實作了更多步驟來保證資料傳輸的正確性，包括會重發遺失的封包、舍棄重復的封包、無錯誤資料傳輸、阻塞/流量控制、確認有建立三方交握，連線已建立才作傳輸等等算法。TCP 是一個非常複雜的協議< 也是使用最為廣泛的協議，和 IP 協議合稱 TCP/IP，大部分的應用層協議，包括 HTTP 都是基於 TCP/IP 的。

> TCP/IP 是大學本科網路概論課程的重頭戲，會完整介紹如何實作 TCP 協議。TCP/IP 的首部是二進制格式，本教程就不講解規格細節了。

## [](#網路工具)網路工具

透過 [Wireshark](https://zh.wikipedia.org/zh-cn/Wireshark) 或 [Packet Peeper](https://packetpeeper.org) 之類的軟體可以進行網路封包的擷取：

![image](https://ihower.tw/cs/networking/8.jpg)

## [](#5-應用層-application-layer)5\. 應用層 (Application Layer)

TCP/IP 協議是作業系統就會提供的網路功能，而在我們電腦上會有不同的應用軟體，這些軟體會基於 TCP/IP 實作[應用層協議](https://zh.wikipedia.org/wiki/應用層)，例如：

-   DNS
-   HTTP
-   SSH
-   FTP 檔案傳輸
-   SMTP 寄email
-   POP 收email
-   SMB 微軟的網路文件共享系統
-   Bitcoin
-   BitTorrent

其中最常用的就是 DNS 協議和瀏覽器使用的 HTTP 協議了，接下來的章節會重點詳述這兩個協議。

## [](#補充資料)補充資料

-   [網路架構大概論：歷史、規格、名詞一次搞懂](http://www.techbang.com/albums/107)
-   [鳥哥的 Linux 私房菜: 基礎網路概念](http://linux.vbird.org/linux_server/0110network_basic.php)
-   [我是一個網卡](http://gold.xitu.io/entry/5763cb427f578500546c91d4)
-   [網路非常概論](http://www.slideshare.net/GuanHsiungLiaw/ss-52836041)
-   [Khan: Internet 101 影片](https://www.khanacademy.org/computing/computer-science/internet-intro)

* * *
