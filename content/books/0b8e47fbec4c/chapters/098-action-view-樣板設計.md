> Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler

在這一章中我們將進入_MVC_架構中的_View_，也就是提供介面給用戶操作，與我們的應用程式做互動。

_ActionView_是_Rails_中處理_View_的元件名稱，而提供給用戶的文件，我們會用_Template_樣板來呈現。本章假設讀者們都對_HTML_有基本的認識。

## [](#template樣板)_Template_樣板

什麼是_Template_樣板呢？我們知道伺服器最終提供給瀏覽器的格式是_HTML_文件，而_Template_樣板就是動態產生_HTML_的方式。

> 相對的說，我們用靜態_HTML_來稱呼不經過程式產生的_HTML_文件

_Rails_預設用來產生_Template_的方式是_Embedded Ruby(ERb)_，如果你曾經使用過_PHP_、_JSP_或_ASP_，那麼你會非常熟悉這種內嵌程式碼的風格，這是一種最為直覺且容易學習的方法。例如以下是一小段嵌入目前時間的_ERb_，中間`<%= %>`的部份便是_Ruby_程式：

```
<h1><%= Time.now.to_s %></h1>
```

_Rails_的_Template_檔案位置和名稱也是有玄機的，例如_app/views/welcome/index.html.erb_來說，_welcome_目錄是它的_Controller_名稱，檔案第一段_index_是它的_Action_名稱，附檔名則是用來指定要用什麼方式來產生什麼格式的文件：_index.html.erb_表示用_ERb_產生_HTML_格式的文件。會有這樣慣例的原因，你可能已經猜到，那就是使用_ERb_不代表一定就是用來產生HTML。用什麼_Template_引擎(在_Rails_中又叫作_Template Handler_)產生文件，和文件的_Format_格式是兩回事情。所以_ERb_其實可以用來產生任何文字檔格式，例如_CSV_、_XML_、_JavaScript_等等。

雖然可以，但_ERb_並不是產生_XML_的最好方式，通常在我們會用_Builder_來產生_XML_，例如一個叫做_show.xml.builder_的檔案：

```
people do |p|
  p.person "test"
end
```

就會產生以下的_XML_：

```
<people>
  <person>test<person>
</people>
```

以下是內建的樣板引擎與格式組合：

| 格式 | 引擎 | 用法 |
| --- | --- | --- |
| html、xhtml、js 任何文字格式都可以 | erb | HTML 樣板，用 &lt% ruby code %> 和 &lt%= ruby variable %> 來內遷 Ruby 程式 |
| html、xhtml、js 任何文字格式都可以 | ruby | Ruby 程式，最後的 return 值就是輸出 |
| html、xhtml、js 任何文字格式都可以 | raw | 直接輸出不處理 |
| json | jbuilder | 請參考 https://github.com/rails/jbuilder |
| xml、rss、atom | builder | 請參考 https://github.com/jimweirich/builder |

## [](#擴充template-handler)擴充_Template Handler_

_Rails_預設只有內建_ERb_和_Builder_這兩套樣板引擎，但要擴充非常容易。例如在_Rails_社群中，也很流行用_[HAML](http://haml.info/)_和_[Slim](http://slim-lang.com/)_這兩套樣板引擎來取代_ERb_。這兩套都利用縮排的技術簡化_HTML_撰寫的格式，例如以下的_HAML_:

```
%section.container
    %h1= post.title
    %h2= post.subtitle
    .content
        = post.content
```

等同於以下的_ERb_：

```
<section class=”container”>
    <h1><%= post.title %></h1>
    <h2><%= post.subtitle %></h2>
    <div class=”content”>
        <%= post.content %>
    </div>
</section>
```

要安裝使用，只需要在_Gemfile_檔案中加上`gem "haml-rails"`然後`bundle install`即可。不過相較於_ERb_，使用_HAML_雖然可以更為有效率地撰寫_HTML_樣板，但是還是需要考量團隊中的網頁設計師是否能夠配合使用。

## [](#使用renderer在controller中直接回傳結果)使用_Renderer_在_Controller_中直接回傳結果

有一些格式的本質不一定需要_Template_引擎，可以在_Controller_中直接_render_其結果即可，例如_JSON_和_CSV_或是_XML_。_Rails_對_ActiveRecord model_提供了`to_xml`和`to_json`方法。而_CSV_則可以使用_FasterCSV_函式庫。範例如下：

```
require 'csv'
class PeopleController < ApplicationController

def index
    @people = Person.all
    respond_to do |format|
      format.html
      format.json{ render :json => @person.to_json }
      format.xml { render :xml => @person.to_xml }
      format.csv do
        csv_string = CSV.generate do |csv|
            csv << ["Name", "Created At"]
            @people.each do |person|
                csv << [person.name, person.created_at]
            end
        end
        render :plain => csv_string
      end
    end
end
```

## [](#erb標籤)_ERb_標籤

除了上述介紹的_ERb_標籤`<%= %>`會輸出中間的`Ruby`程式執行結果，還有一些其他用法：

```
<% %>
```

這樣就不會輸出任何結果，通常用在`if`或迴圈條件中，例如：

```
<% @people.each do |person| %>
    <% if person.name.present? %>
        <p><%= person.name %></p>
    <% end %>
<% end %>
```

上述的`<% %>`標籤雖然不會輸出_HTML_內容，但是還是在_HTML_原始碼中換行了，為了避免輸出時多餘的換行，可以改用`<%- -%>`。不過實際上並沒有很多人在乎就是了，畢竟這不影響用戶的頁面。

```
<%# blah blah %>
```

這是註解，不會輸出任何內容。不過如果需要整段多行註解，有個小技巧可以善用：

```
<% if false %>
    <%= foo %>
    <hr>
    <%= bar %>
<% end %>
```

## [](#layout版型)_Layout_版型

_Layout_可以用來包裹_Template_樣板，讓不同_View_可以共用_Layout_作為文件的頭尾。因此我們可以為全站的頁面建立共用的版型。這個檔案預設是_app/views/layouts/application.html.erb_。如果在_app/views/layouts_目錄下有跟某_Controller_同名的_Layout_檔案，那這個_Controller_下的所有_Views_就會使用這個同名的_Layout_。

預設的_Layout_長得如下：

```
<!DOCTYPE html>
<html>
<head>
  <title>YourApplicationName</title>
  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
  <%= csrf_meta_tags %>
</head>
<body>

<%= yield %>

</body>
</html>
```

其中的`<%= yield %>`會被替換成個別`Action`的樣板。

> 開頭的`<!DOCTYPE html>`說明了這是一份_HTML5_文件，這種宣告法向下相容於所有瀏覽器的_HTML4_。

如果需要指定_Controller_的_Layout_，可以這麼做：

```
class EventsController < ApplicationController
   layout "special"
end
```

這樣就會指定_Events Controller_下的_Views_都使用_app/views/layouts/special.html.erb_這個_Layout_，你可以加上參數`:only`或`:except`表示只有特定的_Action_：

```
class EventsController < ApplicationController
   layout "special", :only => :index
end
```

或是

```
class EventsController < ApplicationController
   layout "special", :except => [:show, :edit, :new]
end
```

請注意到使用字串和_Symbol_是不同的。使用_Symbol_的話，它會透過一個同名的方法來動態決定，例如以下的_Layout_是透過`determine_layout`這個方法來決定：

```
class EventsController < ApplicationController
   layout :determine_layout

	private

	def determine_layout
   	   ( rand(100)%2 == 0 )? "event_open" : "event_closed"
	end
end
```

除了在_Controller_層級設定_Layout_，我們也可以設定個別的_Action_使用不同的_Layout_，例如:

```
def show
   @event = Event.find(params[:id])
	render :layout => "foobar"
end
```

這樣_show Action_的樣板就會套用_foobar Layout_。更常見的情形是關掉_Layout_，這時候我們可以寫`render :layout => false`。

### [](#自定layout內容)自定_Layout_內容

除了`<%= yield %>`會載入_Template_內容之外，我們也可以預先自定一些其他的區塊讓_Template_可以置入內容。例如，要在_Layout_中放一個側欄用的區塊，取名叫做`:sidebar`：

```
<div id="sidebar">
    <%= yield :sidebar %>
</div>
<div id="content">
    <%= yield %>
</div>
```

那麼在_Template_樣板中，任意地方放:

```
<%= content_for :sidebar do %>
   <ul>
       <li>foo</li>
       <li>bar</li>
   </ul>
<% end %>
```

那麼這段內容就會被置入到_Layout_的`<%= yield :sidebar %>`之中。

除了側欄之外，也常用這招讓每一頁的_HTML meta_特製化，例如我們可以放[Facebook Open Graph](http://ogp.me/)，這樣分享到_Facebook_時，就會抓取你設定的中介資料：

```
<head>
  <title>YourApplicationName</title>
  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
  <%= csrf_meta_tags %>
  <%= yield :head %>
</head>
```

在_Template_樣板中，加入：

```
<%= content_for :head do %>
    <%= tag(:meta, :content => @event.name, :property => "og:title") %>
    <%= tag(:meta, :content => @event.description, :property => "og:description") %>
    <%= tag(:meta, :content => "article", :property => "og:type") %>
    <%= tag(:meta, :content => @event.logo.url, :property => "og:image") %>
    <%= tag(:meta, :content => event_url(@event), :property => "og:url") %>
<% end %>
```

## [](#在template中可以使用的變數)在_Template_中可以使用的變數

我們已經認識到，在_Controller Action_中使用`@`的物件變數，就會被傳進_Template_中可以被存取。除此之外，還包括`cookies`、`session`、`flash`、`params`、`request`、`response`等在_Controller_中使用的變數也可以在_Template_中使用。

比較特別的是，_Template_中的`controller`變數，我們可以用這個變數讓每一頁有不同的_CSS class_，例如

```
<%= tag(:body, :class => "#{controller.controller_name} #{controller.action_name}") %>
```

這樣會輸出成

```
<body class="events show">
```

## [](#局部樣板partials)局部樣板_Partials_

局部樣板可以將_Template_中重複的程式碼抽出來，例如我們在_Part1_中示範過的新增和編輯的表單。_Partial Template_的命名慣例是底線開頭，但是呼叫時不需加上底線，例如：

```
<%= render :partial => "common/nav" %>
```

在這個情境下，可以省略`:partial`鍵：

```
<%= render "common/nav" %>
```

這樣便會使用_app/views/common/\_nav.html.erb_這個樣板。如果使用_Partial_的樣板和_Partial_所在的目錄相同，可以省略第一段的_common_路徑。

在_Partial_樣板中是可以直接使用實例變數的(也就是`@`開頭的變數)。不過好的實務作法是透過`:locals`明確傳遞區域變數，這樣程式會比較清楚，_Partial_樣板也比較容易被重複使用：

```
<%= render :partial => "common/nav", :locals => { :a => 1, :b => 2 } %>
```

在這個情境下，也可以進一步把`locals`鍵也省略：

```
<%= render "common/nav", :a => 1, :b => 2 %>
```

這樣在_partial_樣板中，就可以存取到區域變數`a`和`b`。

### [](#陣列型collection)陣列型_Collection_

如果是陣列的資料，像是`tr`或`li`這類會一直重複的_Template_元素，我們可以使用`collection`參數來處理，例如像以下的程式：

```
<ul>
    <% @people.each do |person| %>
        <%= render :partial => "person", :locals => { :person => person } %>
    <% end %>
<ul>
```

我們可以改寫成使用_collection_參數來支援陣列形式：

```
<ul>
    <%= render :partial => "person", :collection => @people, :as => :person %>
<ul>
```

在_\_person.html.erb_這個_partial_中，會有一個額外的索引變數`person_counter`紀錄編號。

使用_collection_的好處不只是少打字而已，還有執行效能上的大大改善，_Rails_內部會針對這種形式做執行效率最佳化。

## [](#更多線上資源)更多線上資源

-   [Layouts and Rendering in Rails](http://guides.rubyonrails.org/layouts_and_rendering.html)

* * *
