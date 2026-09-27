Part 7: 購買域名、HTTPS、HTTP/2

## [](#22-域名購買和設定)22\. 域名購買和設定

接下來我們來實際購買一個域名，有了域名我們才能設定 HTTPS 加密連線。

-   有國際信用卡的，推薦從 [Namechaep](https://www.namecheap.com) 購買
-   中國大陸境內可以從 [阿裡里(萬網)](https://wanwang.aliyun.com/domain/) 購買

以下是示範用 Namecheap 進行購買：

## [](#namecheap-購買設定步驟)Namecheap 購買設定步驟

[https://www.namecheap.com](https://www.namecheap.com)

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/70.png)

> 例如 rails-recipes.win 一年才 USD $0.66，便宜!

購買後，需要認證 E-mail

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/71.png)

進入該網域的 Manage 畫面

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/72.png)

NAMESERVERS 用 Namecheap 內建提供的即可

> Linode 也有提供 DNS 服務，如果你想在 Linode 設定 DNS 紀錄，這裡可以用 Custom DNS，填上 Linode 的 DNS 位址，就可以改用 Linode 的 DNS 服務。阿里雲跟 AWS 也有自己的 DNS 服務，提供比較多的功能。

進化 Advanced DNS 畫面

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/73.png)

刪除目前的兩個 RECORDS，按 ADD NEW RECORD 新增一個 A Record，讓 `www` 指向我們的伺服器 IP 地址。

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/74.png)

設定 DNS 需要一些時間才會生效。你可以在用 `nslookup` 或 `dig` 指令查詢 DNS 是否已經生效。

> 如果等不及的話，你可以先修改本機電腦的 `/etc/hosts` 自行加上 DNS 對應。只是這個紀錄只有你本機有效而已。

## [](#修改-nginx-設定)修改 Nginx 設定

進入遠端伺服器，用 root 權限修改 `/etc/nginx/sites-enabled/rails-recipes.conf`

把 server\_name 改成我們的網域名稱：

```
server_name www.rails-recipes.win;

```

重啟 `sudo service nginx restart`

瀏覽 `http://www.rails-recipes.win` 確認完成

## [](#中國境內-icp-備案)中國境內 ICP 備案

如果伺服器主機和 DNS 伺服器在中國境內，必須將網域名稱和主機IP進行備案。如果沒有備案，雲服務商會進行定期檢查屏蔽，DNS 解析也可能會被中國大陸境內的 DNS 查詢系統屏蔽：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/99.png)

> 實際測試發現 http 在開站兩天後就被阿里雲屏蔽、但 https 或 IP 地址連線沒問題。

不同備案的省市和不同的網域名稱，會有不同申請規定。在哪一家雲服務商購買主機，就用那家的備案系統進行申請，例如[阿里雲備案](https://beian.aliyun.com)

如果伺服器主機在中國境外，就不需要也不能備案，但可能被牆封鎖。另外也無法申請中國境內的金流服務和 CDN 服務等。

## [](#23-安裝-https-憑證和-http2)23\. 安裝 HTTPS 憑證和 HTTP/2

要啟用 HTTPS 加密連線和 HTTP/2 的話，需要申請該域名的 SSL 憑證：

1.  需要購買 SSL 憑證：在 [Namechaep](https://www.namecheap.com)、[阿里雲](https://common-buy.aliyun.com/?spm=5176.2020520163.cas.1.2arDtO&commodityCode=cas#/buy) 等各家域名商都可以購買的到。
2.  或是使用 [Let’s Encrypt](https://letsencrypt.org) 的免費憑證。Let’s Encrypt 是由許多大公司以及各大非營利團體為了推廣 HTTPS 而贊助的一家免費發布 SSL 憑證的機構。不過它的效期只有三個月的效期，到期需要更新。憑證過期的話，瀏覽器會跳出警告訊息。

申請憑證的流程大致上是：

1.  先自己生成一個私鑰、一個申請用的憑證CSR
2.  將 CSR 傳上去給憑證機構
3.  憑證機構認證你真的擁有這個網域
4.  下載 SSL 憑證
5.  將私鑰和 SSL 憑證安裝到網站伺服器上

如果主要用戶不在中國境內、伺服器放在國外，建議可以用 [Cloudflare](https://cloudflare.com) 這個 CDN 服務，這包含免費的 SSL 憑證，可以免去申請安裝的麻煩。它的 [Flexible SSL](https://www.cloudflare.com/ssl/) 模式，可以讓終端使用者到 CloudFlare 是加密連線，而你的伺服器不需要安裝。使用 Cloudflare 需要將 DNS 也給它管理，在註冊的流程中會要求你去修改 Namecheap 改用 Custom DNS。

## [](#lets-encrypt-憑證申請)Let’s Encrypt 憑證申請

[Let’s Encrypt](https://letsencrypt.org/zh-tw/getting-started/) 依照網頁上的說明，使用 [certbot](https://certbot.eff.org/) 進行安裝即可。

接著在伺服器上，用 root 身份用 `crontab -e` 指令，加上每天定期執行檢查更新：

```
0 1 * * * certbot renew
```

大功告成之後可以看到：

![image](https://ihower.tw/rails/part2/08-linux-deployment/images/75.png)

> [https://www.ssllabs.com/ssltest/index.html](https://www.ssllabs.com/ssltest/index.html) 可以檢測 SSL 是否安裝完美。SSL 有很多安全性相關標準。

* * *
