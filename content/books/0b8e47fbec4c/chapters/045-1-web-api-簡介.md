這堂課將解決兩個問題：

1.  現在互聯網上越來越多的公開資料可以抓來使用，也有越來越多的第三方服務可以串接，我們將學會如何串接第三方的應用服務，例如抓天氣資料、抓餐廳資料等等
    
2.  除了網站 App 之外，很多公司也會製作手機 App，那麽我們的 Rails 網站要如何提供資料給其他應用程序? 例如提供給手機 iOS, Android 應用程式，或是一個開放平臺，給別的開發者串接使用。
    

## [](#1-抓取第三方資料)1\. 抓取第三方資料

### [](#1-1-實作目標)1-1 實作目標

串接 [聚合數據 全國天氣預報](https://www.juhe.cn/docs/api/id/39/aid/167) 的 API，存下所有城市資料，並更新指定城市的天氣資訊。

### [](#1-2-抓天氣資訊)1-2 抓天氣資訊

如果要用程序抓天氣資訊，要怎麽抓呢? 我們可能先想到氣象局，那先去 [http://www.cma.gov.cn/2011qxfw/2011qtqyb/](http://www.cma.gov.cn/2011qxfw/2011qtqyb/) 逛逛，找到 [北京](http://www.weather.com.cn/weather1d/101010100.shtml) 天氣這一頁有氣溫資料，讓我們寫個程序來抓吧：

首先安裝 [rest-client](https://github.com/rest-client/rest-client) 這個 gem，可以讓我們用 Ruby 發送 HTTP 請求：

在 Terminal 裡面執行：

```
gem install rest-client
```

你應該會看到 `Successfully installed rest-client-2.0.1` 的訊息。

接著開一個 irb 實驗看看，執行 `irb` 後，輸入以下 ruby 程序(請一行一行輸入)：

```
require 'rest-client'
response = RestClient.get "http://www.weather.com.cn/weather1d/101010100.shtml"
response.body
```

哇，頭暈了，這資料怎麽這麽亂。這是因為回傳的內容 HTML 是給瀏覽器顯示用的，包括各種排版顏色字號的等等資料。而我們只想到氣溫，在這裡面比對出單純的氣溫資料，是個苦逼工啊。讓我們努力看看：

```
require 'nokogiri'
doc = Nokogiri::HTML.parse(response.body)
doc.css(".today .tem").map{ |x| x.text }  # 得到 ["\n13°C\n", "\n2°C\n", "\n"]
```

透過 Nokogiri 這個庫可以幫助我們解析 HTML，透過 CSS selector 從文件中比對出想要的資訊。

以上這種方式就叫做網路爬蟲(web crawler)，但是這種方式不但辛苦，而且如果萬一對方改了網址、調整了 HTML 結構，這段程式就很容易壞掉。那怎麽辦？

我們希望能夠用 API 來存取資料。

### [](#1-3-什麽是-api)1-3 什麽是 API?

API(Application Programming Interface)講的就是程序跟程序的接口，定義接口叫什麽名字、要傳什麽參數進去、它會回傳什麽東西回來、可能會發生的錯誤等等。

在寫 Ruby 程序的時候，我們會呼叫庫(library)的方法，這時候 API 指的是方法(method)的名字、參數、回傳值等等，例如 Ruby Hash 的 [API 文件](https://ruby-doc.org/core-2.4.0/Hash.html)。

對 Web 應用來說，客戶端和伺服器之間是用 HTTP 通訊協定：抓資料的一方叫做 Client 客戶端，送出 HTTP request，在之前的課程中，這個角色就是瀏覽器，在這堂課中，我們會自己撰寫 Ruby 程序作為客戶端。回傳資料的一方叫做 server 服務端，回傳 HTTP response，服務端例如我們已經學過的 Ruby on Rails。

Web 應用的 API 就是在定義網址 URL 長怎樣、請求的 HTTP 方法(GET或POST等)是什麽、要傳什麽參數過去、返回的資料格式又是什麽。這份教材要示範的，就是屬於這一種 API。

其中返回格式最常用的是 JSON 或 XML。這兩種是最常見的資料交換格式，專門用來讓機器之間交換資料用的，只有純粹的資料，不像 HTML 有沒有雜七雜八的排版資訊。一個 JSON 字串例如：

`{ "id": 123, "name": "foobar"}`

就是在描述一個雜湊，不同程式語言都可以產生和解析這一個字串，讓我們在 `irb` 中實驗看看，我們可以把任意的 Ruby 資料，轉成 JSON 字串：

```
require 'json'
{ :id => 123, :name => "foobar" }.to_json       # => "{\"id\":123,\"name\":\"foobar\"}"
```

你可以再開另一個 Terminal，再進入 `irb`，把剛剛的 JSON 字串貼上來

```
require 'json'
JSON.parse( "{\"id\":123,\"name\":\"foobar\"}" )   # => {"id"=>123, "name"=>"foobar"}
```

這樣就又把 JSON 字串又轉回 Ruby 了。

所以如果能有 Web API 提供 JSON 資料的話，就可以透過程式語言直接解析拿到純粹的資料，非常方便又可靠。

### [](#1-4-註冊聚合數據拿到-api-key)1-4 註冊聚合數據，拿到 API Key

讓我們找找看有沒有提供天氣 API 的服務商，找到了由聚合數據提供的 [全國天氣預報 API](https://www.juhe.cn/docs/api/id/39)，請先註冊，然後申請天氣預報數據：

![image](https://ihower.tw/rails/part2/03-web-api/images/juhe-1.png)

然後就可以拿到 API Key，請記下這個憑證，等會呼叫 API 時會用到:

![image](https://ihower.tw/rails/part2/03-web-api/images/juhe-2.png)

API 服務商都會要求你先註冊，然後呼叫 API 時需要帶著這個 API Key 參數，用來記錄呼叫者和使用次數。

### [](#1-5-安裝-postman-進行初步測試)1-5 安裝 Postman 進行初步測試

要怎麽對 Web API 進行手動的測試呢? 我們來裝一個 Chrome Extension 叫做 [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)，這就是一個萬用的表單工具。

首先進入 Chrome 選單上的 Windows > Extensions，然後安裝 Postman：

![image](https://ihower.tw/rails/part2/03-web-api/images/postman-1.png)

透過這個工具，我們可以指定 URL 地址、HTTP 方法和要傳遞的參數。讓我們實驗看。 根據 [全國天氣預報 文檔](https://www.juhe.cn/docs/api/id/39/aid/167) 的說明，讓我們試試看來抓「支持城市列表」

![image](https://ihower.tw/rails/part2/03-web-api/images/juhe-3.png)

在 Postman 中輸入接口的 URL 地址和參數：

![image](https://ihower.tw/rails/part2/03-web-api/images/postman-2.png)

點擊 Send 就可以看到結果了：

![image](https://ihower.tw/rails/part2/03-web-api/images/postman-3.png)

### [](#1-6-用-rest-client-抓下來觀察看看)1-6 用 rest-client 抓下來觀察看看

接下來實驗 Ruby 客戶端，用 Ruby 程序來抓取上述的資料。

進入 `irb`：

```
require 'rest-client'
require 'json'
response = RestClient.get "http://v.juhe.cn/weather/citys", :params => { :key => "1e32c7a622462f55f14330762c99af7d" }
data = JSON.parse(response.body)
```

這個 data 變數就是單純的 Ruby 雜湊資料了，是全部的城市。接下來我們可以觀察一下這個資料的樣子，文檔上面也有範例：

```
data.keys          # => ["resultcode", "reason", "result", "error_code"]
data["result"][0]  # => {"id"=>"1", "province"=>"北京", "city"=>"北京", "district"=>"北京"}
```

![image](https://ihower.tw/rails/part2/03-web-api/images/rest-client.png)

* * *
