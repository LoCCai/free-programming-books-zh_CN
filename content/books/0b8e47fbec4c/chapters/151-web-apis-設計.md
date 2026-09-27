> 本章內容與「Part 2-3 Web API 設計實作」有些重複，可以先去看 [3\. 建立 API 伺服器](https://ihower.tw/rails/fullstack-web-api-design.html)

## [](#學習目的)學習目的

-   目標讀者: 應用程式初學開發者，特別是 Application Developer
-   目的: 了解 Web APIs 該如何設計，有哪些設計上的考量。讓前後端合作起來能夠更順利。
    -   後端工程師可以根據 Models 有哪些資料，就設計和實作出好用的 APIs
    -   前端工程師(Mobile)可以指引後端設計師提供更好用的 API，甚至開出規格，碰到新的 APIs 也可以很快了解。
-   設計 Web APIs 的用途包括：
    -   提供給手機 iOS, Android 應用程式的 Web API
    -   提供 JavaScript MVC application 的 Web API
    -   建立 API 平台，開放 APIs 給第三方開發者使用

## [](#rest-基礎)REST 基礎

### [](#什麼是-rest)什麼是 REST?

-   為何要設計 Web APIs? 為什麼採用 REST?
-   目前的主流風格(Style): REST
    -   [wikipedia: REST](https://zh.wikipedia.org/wiki/REST)
    -   [什麼是REST跟RESTful?](https://ihower.tw/blog/archives/1542)
    -   [RESTful API Design](http://www.slideshare.net/AmigoChan/restful-api-design)
    -   [What RESTful actually means](https://codewords.recurse.com/issues/five/what-restful-actually-means)
-   REST 滿足以下條件
    -   Client-Server 使用者端/伺服器端的架構
    -   Cacheable 伺服器端的 Response 可以支援快取
    -   Layered 伺服器端可以有分層的架構，例如 Reserve-proxy Server 或 Load balancer
    -   Stateless 不同的API呼叫之間是沒有前後文關係的，具有無狀態性。因為網路的不穩定性 1. 每次的 Request 必須帶有足夠的資訊讓伺服器端可以處理，例如帶有 token 可以讓伺服器識別是哪一個用戶 2. 每一個 Request 操作都必須是 atomic 的，不應該用兩個 requests 去完成一個應該一起完成或一起失敗的動作，就像 DB 的 transaction 一樣。
    -   Uniform interface 一致的 API 介面：由 Resource 名詞 (即 URI) 搭配有限的 Verb 動作 (即 HTTP Method)，加上不同的 Representation 格式 (即 Content Types) 所組成
-   [Richardson Maturity Model](http://martinfowler.com/articles/richardsonMaturityModel.html) 將 REST 分成成熟度 Level 0、Level 1 - Resources、Level 2 - HTTP Verbs、Level 3 - Hypermedia Controls。常見的 API REST 成熟度會在 Level 2~3 之間。

### [](#rest-api-介面基礎)REST API 介面基礎

[簡明RESTful API設計要點](https://tw.twincl.com/programming/*641y)

<table><tbody><tr><td>用 URL 當作 Resource，搭配不同 HTTP Verb</td><td>GET (讀取)</td><td>POST (新增)</td><td>PATCH (更新)</td><td>PUT (取代)</td><td>DELETE (刪除)</td></tr><tr><td>/events</td><td>list events</td><td>create an event</td><td>bulk update</td><td>N/A</td><td>bulk delete</td></tr><tr><td>/events/123</td><td>event</td><td>N/A</td><td>if exists update event, else error</td><td>if exists update event, else create it</td><td>delete</td></tr></tbody></table>

-   根據 REST 風格，一個 HTTP Request 由「HTTP Method 動詞 + URL 名詞 + Content Types 格式」所組成
-   不過實務上也可能混用 POST 的 \[RPC\](https://en.wikipedia.org/wiki/Remote\_procedure\_call) 風格，雖然不符合嚴格的 REST 定義，但也算常見的設計。例如
    -   `POST /topics/bulk_update`
    -   `POST /topics/1/subscribe` 和 `POST /topics/1/unsubscribe`

#### [](#url)URL

-   Rails 偏好用複數當作名詞
-   關聯關係喜歡用 nested resource
    -   `/events/{event_id}/attendees`
-   發揮想像力，API 幾乎都可以具象出一個 Resource 名詞來進行操作，例如：
    -   `POST /groups/1/add_user?user_id=2` 變成 `POST /memberships?group_id=1&user_id=2`
    -   `POST /groups/1/remove_user?user_id=2` 變成 `DELETE /memberships/{membership_id}`
-   GET 可設計搭配 ? query string 過濾和排序結果
    -   `GET /events?order=count&filter=public`

#### [](#request-method)Request Method

-   操作的兩種性質：
    -   Safe: 是否會修改到伺服器資料
    -   Idempotent: 是否可以重傳(retry)
-   常用 HTTP Methods 有:
    -   GET 讀取
    -   POST 新增或其他操作
    -   DELETE 刪除
    -   PATCH (部分)修改
    -   PUT (整個)替換

<table><tbody><tr><td></td><td>SAFE?</td><td>IDEMPOTENT?</td></tr><tr><td>GET</td><td>Y</td><td>Y</td></tr><tr><td>POST</td><td>N</td><td>N</td></tr><tr><td>PATCH</td><td>N</td><td>N</td></tr><tr><td>PUT</td><td>N</td><td>Y</td></tr><tr><td>DELETE</td><td>N</td><td>Y</td></tr></tbody></table>

-   參考資料
    -   [常見的HTTP METHOD的不同性質分析](http://data-sci.info/2015/10/24/%E5%B8%B8%E8%A6%8B%E7%9A%84http-method%E7%9A%84%E4%B8%8D%E5%90%8C%E6%80%A7%E8%B3%AA%E5%88%86%E6%9E%90%EF%BC%9Agetpost%E5%92%8C%E5%85%B6%E4%BB%964%E7%A8%AEmethod%E7%9A%84%E5%B7%AE%E5%88%A5/)
    -   [HTTP Verbs: 談 POST, PUT 和 PATCH 的應用](https://ihower.tw/blog/archives/6483)

#### [](#http-status-code)HTTP Status Code

-   最基本常見會用到 200 成功, 400 客戶端參數錯誤, 401 Unauthorized 你沒登入, 403 權限不夠, 404 找無此資源, 500 伺服器錯誤
    -   [Dropbox: How many HTTP status codes should your API use?](https://blogs.dropbox.com/developers/2015/04/how-many-http-status-codes-should-your-api-use/)
-   Google GData API 用了 200,201,304,400,401,403,404,409,410,500
-   Netflixx 用了 200,201,304,400,401,403,404,412,500
-   Digg 用了200,400,401,403,404,410,500,503
-   遵守嚴格的定義可以參考 [Choosing an HTTP Status Code](http://racksburg.com/choosing-an-http-status-code/)
    -   [Choosing an HTTP Status Code](http://faq.biznetgiocloud.com/index.php?action=artikel&cat=1&id=240&artlang=en) 上一個連結才是原出處，但網站壞了 XD

#### [](#response-format)Response Format

-   JSON 目前最流行的格式
-   XML
-   Binary Format
    -   例如 http://msgpack.org/ 和 https://github.com/google/protobuf
-   如何告訴 server 你希望的格式是什麼? 有兩種方式：
    -   放到 URL 裡面，例如 GET /events.json
    -   放到 Header 裡面 Accept: application/json
        -   這個格式的定義叫做 [MIME](https://en.wikipedia.org/wiki/MIME)

#### [](#request-format-client-端用什麼格式送出資料)Request Format (Client 端用什麼格式送出資料?)

-   [四種常見的POST 提交數據方式](https://imququ.com/post/four-ways-to-post-data-in-http.html)
-   application/x-www-form-urlencoded (網頁表單預設，不能上傳檔案)
-   multipart/form-data (如果要包含上傳檔案的話，要用這個)
-   application/json (這不能上傳檔案)

#### [](#versioning)Versioning

-   相容性議題：API 一旦釋出上線，要改就不是這麼容易了，特別是搭配 Mobile App、Desktop App 等等，客戶端程式需要用戶安裝和手動升級。如果是 Web App 就沒關係。
-   不是每一次改 API 都需要改這個版號，盡量將 API 可以做成向後相容，就不需要跳版本。例如：
    -   新增一個欄位屬性，是向後相容的
    -   修改屬性名稱、刪除欄位、修改格式等等，會造成不向後相容。client app 抓不到該欄位可能會當機。
-   版號放 URL 還是 Header ?
    -   簡單來說，放 URL 即可，例如 `/api/v1/events`

## [](#web-api-文件撰寫)Web API 文件撰寫

### [](#如何跟前端開發者合作)如何跟前端開發者合作?

-   前端包括 iOS、Android、JavaScript 等等開發者
-   先討論定義 API 的格式，然後先做出回傳假資料的 API 部署上去，這樣就可以分頭做事了
-   [鄉民: API格式應該由前端開，還是後端開？](https://www.ptt.cc/bbs/Soft_Job/M.1456388123.A.8B8.html)
    -   從後端開 API，會圍繞在 model 開出 CRUD 的 API，容易白做工、而且沒有針對需求做最佳化

### [](#如何寫文件)如何寫文件

-   寫文件很重要，這樣才能團隊協同開發
    -   這個 API 是要給其他開發者使用的! API friendly!
        -   Request
            -   HTTP method
            -   HTTP content-type
                -   網頁表單送出是用 application/x-www-form-urlencoded 格式
                -   Rails 也可以吃 application/json，可以正常解析成 params 變數
            -   URL endpoint
            -   parameters
                -   type: string? number? array? hash?
                -   required or optional
        -   Response
            -   HTTP code
            -   format
            -   example
-   舉例: 拿活動資料
    -   `GET /api/v1/events`
    -   JSON Example: `{ "data": [....] }`
-   舉例: 新增活動資料
    -   `POST /api/v1/events`
    -   參數:
        -   name: string
        -   status: string ( draft 或 published)
    -   成功: HTTP status 200
        -   範例: `{ "id": 123 }`
    -   失敗: HTTP status 400
    -   範例: …

### [](#文件相關工具)文件相關工具

透過一些工具的幫忙，我們可以標準化文件的撰寫，進一步產生漂亮的文件格式，甚至產生一些樣本程式碼協助開發和測試：

-   [http://swagger.io/](https://swagger.io/)
-   [http://raml.org/](http://raml.org/)
-   [https://apiblueprint.org/](https://apiblueprint.org/)
-   [https://apiary.io/](https://apiary.io/)
-   [https://www.opencredo.com/2015/07/28/rest-api-tooling-review/](https://www.opencredo.com/2015/07/28/rest-api-tooling-review/)
-   [https://github.com/tripit/slate](https://github.com/tripit/slate)

### [](#api-文件範例)API 文件範例

-   [Github](https://developer.github.com/v3/)
-   [Stripe](https://stripe.com/docs/api#charge_object)
-   [Paypal](https://developer.paypal.com/docs/api/)
-   [Twitter](https://dev.twitter.com/rest/public)
-   [Facebook](https://developers.facebook.com/docs/graph-api)

## [](#web-api-測試)Web API 測試

Web APIs 建議由伺服器端撰寫自動化測試，最有效率且能保證正確性。 不負責伺服器端的客戶端開發者，可以用以下方式進行人工測試：

-   Chrome extension: JSON formatter 或 JSON View
-   Chrome extension: advanced-rest-client 或 postman
-   brew install httpie
-   App Store 的 Paw $890 (高級 HTTP client)
-   [Insomnia](https://insomnia.rest/) Free app
-   怎麼將內網的 localhost 讓外部網路可以連線進來呢？
    -   推薦 [https://ngrok.com/](https://ngrok.com/) 這個工具
    -   [使用說明介紹](https://tenten.co/blog/how-to-use-ngrok-to-connect-your-localhost/)

## [](#web-api-設計美學)Web API 設計美學

### [](#設計技巧)設計技巧

-   HTTP request/response 的天性
    -   Stateless: 每個 requests 之間沒有前後文關係，每個 request 都必須帶有完整的資訊讓 server 可以完成操作，例如: 需要帶 token 才能識別使用者
    -   Atomic: 不應該用兩個 requests 去完成一個應該一起完成或一起失敗的動作，就像 DB 的 transaction 一樣。
    -   另外，和 function call 相比，API 設計的粒度比較大。因為每次的 request/response 成本比較高。
-   REST 風格 vs. RPC 風格
    -   以 REST 概念為主、RPC 為輔。操作和運算 operate 類型的可用 RPC 概念來設計，例如：
        -   `POST /calculate`
        -   `POST /translate`
        -   `POST /convert`
-   JSON response 第一層用 hash，不要用 array
-   如何處理分頁?
    -   Hypermedia API 和 HATEOAS 概念:
        -   [http://en.wikipedia.org/wiki/HATEOAS](https://en.wikipedia.org/wiki/HATEOAS)
        -   [https://api.github.com/](https://api.github.com/)
    -   max\_id 和 since\_id 策略，例如 [https://dev.twitter.com/rest/reference/get/statuses/user\_timeline](https://dev.twitter.com/rest/reference/get/statuses/user_timeline)
-   如何處理空值 null，建議不要完全砍掉，請留 null。例如 `{ name: "Foo", display_name: null }` 而不是 `{ name: "Foo" }`
-   可以設計支援 Partial response
    -   `GET /events?fields=id,name,created_at`
-   有些人設計愛用 header (REST 基本教義派會把 metadata 例如 version、token 都放 header 裡面)，有些人則喜歡放在 URL 和 body 裡面，用起來比較方便。前者例如 [https://developer.github.com/v3/](https://developer.github.com/v3/)
-   Idempotent Retry 特別是離線應用，搭配 UUID 作 PUT 操作
    -   [https://ihower.tw/blog/archives/6483](https://ihower.tw/blog/archives/6483)
-   JSON 時間格式: 用 [ISO 8601 標準](https://zh.wikipedia.org/wiki/ISO_8601)
-   API Rate Limit，如果 API 會開放給外部使用者，通常會制定一個呼叫上限，例如 [Github](https://developer.github.com/v3/#rate-limiting) 是每小時 5000 requests。
-   有沒有什麼設計標準?
    -   有人在推廣，但不怎麼必要，畢竟有學習成本，卻沒什麼好處(?)
    -   [http://jsonapi.org/](http://jsonapi.org/)
    -   [http://stateless.co/hal\_specification.html](http://stateless.co/hal_specification.html)
    -   [https://jwt.io/](https://jwt.io/)

### [](#api-design-guideline)API Design Guideline

-   [https://github.com/WhiteHouse/api-standards](https://github.com/WhiteHouse/api-standards) 美國白宮，有點簡單
-   [http://apigee.com/about/resources/ebooks/web-api-design](http://apigee.com/about/resources/ebooks/web-api-design) 電子書
    -   [https://pages.apigee.com/rs/apigee/images/api-design-ebook-2012-03.pdf](https://pages.apigee.com/rs/apigee/images/api-design-ebook-2012-03.pdf) PDF 下載連結
    -   [http://www.slideshare.net/apigee/restful-api-design-second-edition](http://www.slideshare.net/apigee/restful-api-design-second-edition) 這不錯
-   [http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
-   [Heroku HTTP API Design Guide](https://github.com/interagent/http-api-design)
-   [Microsoft REST API Guidelines](https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md) 僅供參考

### [](#除了rest-之外還有什麼其他的設計風格)除了REST 之外，還有什麼其他的設計風格?

-   傳統 RPC：單一 URL endpoint，將方法呼叫和參數都包在 body 中
    -   [SOAP](https://zh.wikipedia.org/wiki/SOAP) 落伍了，但傳產和銀行很愛用
    -   [XML-RPC](https://zh.wikipedia.org/wiki/XML-RPC)
    -   [JSON-RPC](https://en.wikipedia.org/wiki/JSON-RPC)
-   [GraphQL](https://facebook.github.io/react/blog/2015/05/01/graphql-introduction.html) Facebook 開源作品。第一眼看 GraphQL 覺得很強大，不過比起 REST 實作上還是複雜很多。如果用 REST 不覺得寫 ad-hoc query 管理上會痛的話，就沒有需要用 GraphQL 了。
    -   範例 [The GitHub GraphQL API](http://githubengineering.com/the-github-graphql-api/)
-   [Falcor](http://netflix.github.io/falcor/) Netflix 開源作品

### [](#補充-webhook-api)補充: Webhook API

上述的 REST API 都是從客戶端去伺服器存取資料，但是有時候我們希望反過來，當事件發生的時候，從伺服器端主動推資料過來，這樣我們就可以更即時且更有效率的做資料串接應用。

有些網站就有提供 Webhook 的方式，提供你設定當某事件發生時，從網站 POST 資料到你指定的網址，例如: 你在 Github 專案的 Settings 裡面，可以找到 Webhooks 設定。這可以設定當有人 push code 或發 pull reuqest 時，Github 會將該事件資料 POST 到你指定的網址。

當然，這種方式不適用於移動裝置，因為你的手機並沒有固定的 IP 位址。

## [](#web-api-認證設計)Web API 認證設計

### [](#登入-token-機制)登入 token 機制

-   why?
    -   安全性(亂數產生的強度比密碼高、也可以加上 expired 時間)
    -   獨立性(使用者改密碼可以不影響 token，除非手動產生過 token)
-   使用者用帳號密碼登入後，拿到專用 auth\_token，之後每個 request 都必須帶這個 auth\_token 參數
-   `POST /api/v1/login` 帶參數帳號 `email` 和密碼 `password`，回傳 token
-   `POST /api/v1/logout` 帶參數 `token`，作用是重設一個新 token

### [](#如何支援-facebook-登入)如何支援 facebook 登入?

-   在手機端會自行實作 facebook 登入 (手機跟 Web 共用 facebook app ID)，拿到 access\_token
-   需要用一樣的 facebook app ID，這樣 fb user id 才會一樣
-   用手機端的 facebook access\_token 進行登入 `POST /api/v1/login`
-   用手機傳來的 access\_token 跟 facebook 再確認一次，沒問題再回傳 user\_token

### [](#其他安全性議題)其他安全性議題

-   使用 HTTPS
-   用 HMAC 簽章 request

### [](#api-provider-和-client-app-認證常見手法)API Provider 和 Client APP 認證常見手法

-   API provider 跟 API client 同一家，是 in-house 開發
    -   使用者透過 輸入帳號密碼 即可拿到 token
-   API provider 跟 API client 不同家，是開放 API 平台給別人用
    -   如果 API client app 就是用戶自己，可以直接在網頁上提供每個使用者 access\_token，這樣最簡單
    -   如果 API client 是要提供給下游用戶使用：可以提供單一的 App 專用 API Key，或是提供註冊多個 application 拿到 app id，然後使用 OAuth 機制進行授權

## [](#web-apis-參考資料和-open-data-資料集)Web APIs 參考資料和 Open Data 資料集

### [](#參考資料)參考資料

-   [http://mamund.site44.com/talks/2015-04-codepalousa/api-methodology.html](http://mamund.site44.com/talks/2015-04-codepalousa/api-methodology.html) RESTful API 設計參考文獻列表
-   Building Hypermedia APIs with HTML5 & Node, O’Reilly
-   [http://restcookbook.com/](http://restcookbook.com/)
-   [http://shop.oreilly.com/product/9780596801694.do](http://shop.oreilly.com/product/9780596801694.do)
-   [http://shop.oreilly.com/product/9780596805838.do](http://shop.oreilly.com/product/9780596805838.do)

### [](#open-data-資料集)Open Data 資料集

[Open Data 開放資料](https://zh.wikipedia.org/wiki/%E9%96%8B%E6%94%BE%E8%B3%87%E6%96%99)是近年來的趨勢，政府不應該浪費預算在開發應用程式，而是只要將原始資料整理釋出，使用程式可以讀取的格式(例如XML或JSON)，不應該有授權限制也不索取費用。由民間進行應用程式開發：

-   [政府開放資料](http://data.gov.tw/)
-   [g0v 開放資料](http://data.g0v.tw/)
-   [SheetHub](http://sheethub.com)
-   [資策會 Social Event Radar](http://api.ser.ideas.iii.org.tw/docs/#!/fb_fanpage_search)
-   [台北市政府開放資料](http://data.taipei/)
    -   [YouBike臺北市公共自行車即時資訊](http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=ddb80380-f1b3-4f8e-8016-7ed9cba571d5)
-   [A collective list of JSON APIs for use in web development](https://github.com/toddmotto/public-apis)

* * *
