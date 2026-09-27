> Talk is cheap. Show me the code. - Linus Torvalds

舉凡使用者註冊認證信、忘記密碼通知信、電子報、各種訊息通知，_E-mail_寄送都是現代網站必備的一項功能。_Rails_的_ActionMailer_元件提供了很方便的_Email_整合。

## [](#actionmailer設定)_ActionMailer_設定

_Rails_在_config/environments_目錄下針對不同執行環境會有不同的郵件伺服器設定。在_development.rb_開發模式中，以下設定會忽略任何寄信的錯誤：

```
# Don't care if the mailer can't send.
config.action_mailer.raise_delivery_errors = false
```

建議可以改成 `true`，這樣可以提早發現錯誤。

寄信方式的選項包括有`:test`、`:sendmail`和`smtp`三種可以選擇。`sendmail`是使用伺服器的_/usr/bin/sendmail_程式，不過因為因為不是每台伺服器都有適當安裝_sendmail_。而`:test`代表並不會實際寄信出去，而是存在`ActionMailer::Base.deliveries`陣列中方便做自動化測試。

最推薦的方式是採用`:smtp`協定來實際寄信出去，例如以下是一個使用_Gmail_寄信的範例，請修改_config/environments/development.rb_或_config/environments/production.rb_：

```
config.action_mailer.delivery_method = :smtp
config.action_mailer.default_url_options = { host: "http://localhost:3000" }
config.action_mailer.smtp_settings = {
    :address => "smtp.gmail.com",
    :port => "587",
    :domain => "gmail.com",
    :authentication => "plain",
    :user_name => "[email protected]",
    :password => "123456",
    :enable_starttls_auto => true
 }
```

其中`default_url_options`設定是因為在_Email_這個情境下，如果要在_Email_中放超連結，必須是絕對網址。所以我們必須設定網站的網址。

另外實務上，我們其實並不會將帳號密碼寫死進程式裡面，而是希望拆出來另存一個設定檔。例如我們可以放到_config/email.yml_如下，_YAML_第一層是適用的_Rails_環境：

```
development:
  address: "smtp.gmail.com"
  port: 587
  domain: "gmail.com"
  authentication: "plain"
  user_name: "[email protected]"
  password: "123456"
  enable_starttls_auto: true
production:
  address: "smtp.mailgun.org"
  port: 587
  domain: "ihower.com"
  authentication: "plain"
  user_name: "[email protected]"
  password: "1234567890"
  enable_starttls_auto: true
```

這樣的話，`smtp_settings`就可以改成：

```
config.action_mailer.smtp_settings = config_for(:email).symbolize_keys
```

其中`config_for`這個方法會讀取_config_目錄下的_YAML_設定檔，並根據當時的_Rails_啟動環境。而`symbolize_keys`這個方法會將_Hash_中的_String key_換成_Symbol key_，這是因為`smtp_settings`吃的是_Symbol key_，如果沒有轉的話，會讀不到設定。

> 通常_config/email.yml_會加到你的`.gitignore`列表中，讓_git_忽略不要_commit_這個檔案，因為有帳號密碼在裡面。

## [](#建立一個mailer寄信程式)建立一個_Mailer_寄信程式

和_Controller_一樣，_Rails_也用_generate_指令產生_Mailer_類別，此類別中的一個方法就對應一個_Email_樣板。以下是一個產生_Mailer_的範例：

```
rails generate mailer UserMailer notify_comment
```

如此便會產生_app/mailers/user\_mailer.rb_檔案，並包含一個`notify_comment`的_Action_，其_template_在_app/views/user\_mailer/notify\_comment.text.erb_(純文字格式)和_notify\_comment.html.erb_(HTML格式)。如果兩種格式的樣板檔案都有，那麼_Rails_會合併成一封_Multiple Content Types_的_Email_。

讓我們看看 user\_mailer.rb 的程式：

```
class UserMailer < ActionMailer::Base
    default :from => "寄件人名字 <[email protected]>"

    def notify_comment(user, comment)
        @comment = comment
        mail(:to => user.email, :subject => "New Comment")
    end
end
```

其中_default_方法可以設定預設的寄件人。而 mail 方法可以設定收件人和郵件主旨。和_View_一樣，`@user`物件變數可以在_app/views/user\_mailer/notify\_comment.text.erb_或_app/views/user\_mailer/notify\_comment.html.erb_或樣板中存取到。而_mail_方法則還可以接受其他參數包括`cc`、`bcc`。

我們可以在_rails console_中測試，執行`UserMailer.notify_comment(user, comment).deliver_now!`就會寄信出去。(這裡我們假設存在一個_user_和_comment_物件代表使用者和新留言，例如`user = User.first`和`comment = Comment.last`)

實務上，我們會在_controller_之中，例如使用者張貼留言之後寄發信件：

```
def create
  comment = Comment.new(comment_params)
  if comment.save
    UserMailer.notify_comment(current_user, comment).deliver_later!
    redirect_to comments_path
  else
    render :action => :new
  end
end
```

如果只需要純文字版，就砍掉_app/views/user\_mailer/notify\_comment.html.erb_這個檔案，然後在_app/views/user\_mailer/notify\_comment.text.erb_純文字格式中，可以加入以下文字跟網址：

```
有新留言在 <%= comments_url %>
```

另外，因為寄信這個動作比較耗時，通常我們也會搭配使用非同步的機制，因此上述用法分成了`deliver_now!`和`deliver_later!`兩種，而後者就會搭配_ActiveJob_進行非同步的寄送，我們在非同步一章會詳細介紹如何設定。

### [](#helper-的使用)Helper 的使用

在 email 樣本中，預設是不會載入 `app/helpers` 裡面的 Helper 方法的，如果你要使用的話，可以在該 Mailer 類別中宣告如下：

```
class UserMailer < ApplicationMailer
  helper :application # 這樣會載入 app/helpers/application_helper.rb
  helper :users     # 這樣會載入 app/helpers/users_helper.rb
  # ...
 end
```

## [](#開發預覽)開發預覽

開發期間我們需要常常測試預覽寄出的_Email_內容，但是實際寄送出去又很沒效率。我們可以安裝_letter\_opener_這個_gem_，修改_Gemfile_加入：

```
gem "letter_opener", :group => :development
```

然後將`config.action_mailer.delivery_method`改成`:letter_opener`

這樣在開發模式下，就會開瀏覽器進行預覽，而不會真的寄信出去。

## [](#第三方寄信服務)第三方寄信服務

由於_Gmail_是個人用途使用，用量有限，並不適合開站做生意使用。我們實務上我們會使用第三方服務來確保_Email_遞送的可靠性，例如：

-   [mailgun](https://www.mailgun.com/)
-   [SendGrid](http://sendgrid.com/)
-   [Postmark](https://postmarkapp.com/)
-   [MailChimp](http://mailchimp.com/)
-   [AWS SES](http://aws.amazon.com/ses/)

> 大量寄送 Email 會是一門學問，請參考 [如何正確發送(大量) Email 信件](https://ihower.tw/blog/archives/3481) 這篇文章

## [](#email-css-處理)Email CSS 處理

-   Email 會被各種奇形怪狀的閱讀器所瀏覽，這些環境中的 CSS 支援非常受限：
    -   https://blog.othree.net/log/2016/08/25/modern-html-email-develop/
    -   https://www.campaignmonitor.com/css/
    -   http://templates.mailchimp.com/development/css/
-   解法: 需要將 CSS inline 內嵌到 HTML 裡面
    -   安裝 https://github.com/fphilipe/premailer-rails

我們也可以套現成的 Email Responsive Template 樣板，例如：

-   http://blog.mailgun.com/transactional-html-email-templates/
-   https://github.com/leemunroe/responsive-html-email-template
-   https://htmlemail.io/ $49

## [](#收信)收信

_Active Mailer_也可以辦到收信，但是你需要自行架設郵件伺服器。因此需要這個功能的話，也會使用第三方服務，例如[mailgun](https://www.mailgun.com/)和[MailChimp](http://mailchimp.com/)都有提供收信的_Webhook_服務：信寄到第三方服務，然後第三方再呼叫網站的_HTTP API_，這樣就省去你自己架設郵件伺服器的困難。

## [](#更多線上資源)更多線上資源

-   [Action Mailer Basics](http://guides.rubyonrails.org/action_mailer_basics.html)

* * *
