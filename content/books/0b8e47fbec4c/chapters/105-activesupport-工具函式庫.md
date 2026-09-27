> I thought of objects being like biological cells and/or individual computers on a network, only able to communicate with messages — Alan Kay, creator of Smalltalk

Active Support 是 Rails 裡的工具函式庫，它也擴充了一些 Ruby 標準函式庫。除了被用在 Rails 核心程式中，你也可以在你的程式中使用。本章介紹其中的一小部分較為常用的功能。

### [](#blank-和-present)blank? 和 present?

在_Rails_中下面幾種情況被定義是_blank_:

-   `nil`或是`false`
-   只由空白組成的字串
-   空陣列或是空_Hash_
-   任何物件當使用`empty?`方法呼叫時回應為`true`時

> 在_Ruby1.9_中的字串支援辨識_Unicode_字元，因此某些字元像是_U2029_(分隔線也會被視為是空白。

> 以數字來說，0或是0.0並不是_blank_

舉例來說在`ActionDispatch::Session::AbstractStore`中就使用了`blank?`方法來確定_session key_是否存在:

```
def ensure_session_key!
  if @key.blank?
    raise ArgumentError, 'A key is required...'
  end
end
```

`present?`方法就是`blank?`方法的相反，判斷是否存在，因此`present?`方法與`!blank?`方法兩者表達的意思是一樣的。

### [](#try)try

`try`是一個相當實用的功能，當我們去呼叫一個物件的方法，而該物件當時卻是`nil`的時候，_Rails_會拋出`method_missing`的例外，最常見的例子像是我們想判斷某些動作只有管理員可以進行操作，因此我們通常會這樣寫:

```
if current_user.is_admin?
    # do something
end
```

但這樣的寫法當使用者其實是未登入時我們的`current_user`便會回傳`nil`，而再去呼叫`is_admin?`方法時便會發生錯誤拋出例外，`try`方法便是運用在這樣的情況，剛剛的例子我們可以改寫成

```
if current_user.try(:is_admin?)
    # do something
end
```

這樣子當使用者並未登入的時候會直接回傳`nil`而不會再去呼叫後面的`is_admin?`方法

### [](#to_param)to\_param

_Rails_中所有的物件都支援`to_param`方法，這個方法會幫我們將物件轉為可用的數值並以字串表示：

```
7.to_param # => "7" to_param 方法預設會去呼叫物件的 to_s 方法
```

_Rails_中某些類別去覆寫了`to_param`方法，像是`nil`、`true`、`false`等在呼叫`to_param`時會回傳自己本身，而陣列會將所有的元素印出來並加上”/”:

```
[0, true, String].to_param # => "0/true/String"
```

值得注意的是，在_Rails_的_Routing_系統中，我們常使用`/:id`來表示該物件的id，事實上是_Rails_改寫了`ActiveRecord::Base`中的`to_param`方法，讓它回傳資料庫的 id，當然我們也可以自己去改寫他:

```
class User
  def to_param
    "#{id}-#{name.parameterize}"
  end
end
```

那麼當我們呼叫`user_path(@user)`的時候，_Rails_就會轉換成 “#{id}-#{name.parameterize}”，這技巧常使用在改寫_URL_的表現方式

### [](#to_query)to\_query

`to_query`會幫我們去呼叫物件的`to_param`方法，並且幫我們整理成查詢的格式並輸出，例如我們去改寫_User Model_的`to_param`方法:

```
class User
  def to_param
    "#{id}-#{name.parameterize}"
  end
end

current_user.to_query('user') # => user=357-john-smith
```

`to_query`會將輸出的符號都以逸出程式碼(_escape_)取代，無論是鍵或是值，因此更方便去處理:

```
account.to_query('company[name]')
# => "company%5Bname%5D=Johnson+%26+Johnson"
```

當呼叫陣列的`to_query`方法時會呼叫陣列中所有元素的`to_query`方法，並且使用`"[]"`做為鍵值，並在每個元素與元素間插入`"&"`做為區隔:

```
[3.4, -45.6].to_query('sample')
# => "sample%5B%5D=3.4&sample%5B%5D=-45.6"
```

呼叫_Hash_的`to_query`方法時，當沒有給予_query_的字串時預設會以_Hash_本身的鍵值做為_query_字串輸出(`to_query(key)`):

```
{:c => 3, :b => 2, :a => 1}.to_query # => "a=1&b=2&c=3"
```

換句話說你也可以自己指定做為_query_的字串，這個字串會變為_Hash_本身鍵值的_namespace_:

```
{:id => 89, :name => "John Smith"}.to_query('user')
# => "user%5Bid%5D=89&user%5Bname%5D=John+Smith"
```

## [](#擴充-class)擴充 Class

### [](#class-attributes)Class Attributes

#### [](#class_attribute)class\_attribute

`class_attribute`這個方法可以宣告一個或多個類別變數，且此類別變數是可以被繼承的類別所覆寫的：

```
class A
  class_attribute :x
end

class B < A; end

class C < B; end

A.x = :a
B.x # => :a
C.x # => :a

B.x = :b
A.x # => :a
C.x # => :b

C.x = :c
A.x # => :a
B.x # => :b
```

也可以在實例變數的層級被讀取或覆寫：

```
A.x = 1

a1 = A.new
a2 = A.new
a2.x = 2

a1.x # => 1, comes from A
a2.x # => 2, overridden in a2
```

`class_attribute`同時也幫你定義了查詢的方法，你可以在變數名稱後面加上問號來看此變數是否已經被定義，以上面的例子來說就是`x?`，結果會回傳`true`或`false`

####`cattr_reader`、`cattr_writer`與`cattr_accessor`

`cattr_reader`、`cattr_writer`與`cattr_accessor`這三個方法就像是`attr_*`的類別變數版本，透過這三個方法可以建立相對應的類別變數及存取方法：

```
class MysqlAdapter < AbstractAdapter
  # Generates class methods to access @@emulate_booleans.
  cattr_accessor :emulate_booleans
  self.emulate_booleans = true
end
```

同時也會幫我們建立實例變數的方法，讓我們可以在實例變數層級來存取：

```
module ActionView
  class Base
	cattr_accessor :field_error_proc
	@@field_error_proc = Proc.new{ ... }
  end
end
```

如此我們便可以在`ActionView`中存取`field_error_proc`。

> 更多關於_class\_attribute_的部份可以參考[深入Rails3: ActiveSupport 的 class\_attribute](https://ihower.tw/blog/archives/4878/)

## [](#擴充-string)擴充 String

### [](#安全輸出)安全輸出

當輸出_HTML_格式的資料時需要格外注意，例如當你文章的標題存成`Flanagan & Matz rules!`時，在沒有格式化的情況下`&`會被逸出碼所取代成`&amp;`，另一方面是安全性上的問題，因為使用者可能就會在欄位中寫入攻擊性的_script_造成安全性問題，因此在處理字串輸出時我們都會對輸出進行處理:

我們可以使用`html_safe?`方法來判斷字串是否是_html_安全格式，一般字串預設是`false`:

```
"".html_safe? # => false
```

你可以透過`html_safe`方法來指定字串:

```
s = "".html_safe
s.html_safe? # => true
```

你必須注意`html_safe`這個方法並不會幫你處理_html_中的_tag_，這方法只是單純的指定該字串是否為`html_safe`，你必須自己去處理_tag_的部份:

```
s = "<script>...</script>".html_safe
s.html_safe? # => true
s            # => "<script>...</script>"
```

當你使用像是`concat`、`<<`或是`+`的方式將一個不是`html_safe`的字串與一個`html_safe`的字串作結合時，會輸出成一個`html_safe`的字串，但將原先不是`html_safe`的字串內容作逸出碼的處理:

```
"".html_safe + "<" # => "&lt;"
"".html_safe + "<".html_safe # => "<" 如果是 html_safe 的內容則不會作逸出碼的處理
```

但在_Rails3_之後版本的_View_會自動幫你把不安全的部份作逸出處理，因此你大可直接在_View_中使用像是`<%= @post.title %>`來輸出，但由於這樣會直接把_HTML_的部份都去除，如果你希望保持_HTML_的格式那麼你可以使用`raw`這個_helper_來幫你輸出:

```
<%= raw @post.content %>
```

> 基於上述安全性的前提，任何可能改變原有字串的方法都會將原先的字串變為_unsafe_的狀態，像是`downcase`、`gsub`、`strip`、`chomp`、`underscore`等，但是複製的方法像是`dup`或是`clone`並不會影響。

### [](#truncated)truncated

`truncate`方法會將字串截斷為指定的長度:

```
"Oh dear! Oh dear! I shall be late!".truncate(20)
# => "Oh dear! Oh dear!..."
```

你可以使用`omission`參數將擷取後的字串的後面取代為指定的文字:

```
"Oh dear! Oh dear! I shall be late!".truncate(20, :omission => '&hellip;')
# => "Oh dear! Oh &hellip;"
```

你必須注意`truncate`後的字串不是`html_safe`的，因此在你沒有使用`raw`來作處理的時候會將`html`格式直接輸出:

```
"<p>Oh dear! Oh dear! I shall be late!</p>".truncate(20, :omission => "(blah)")
=> "<p>Oh dear! Oh(blah)"
```

為了避免擷取的部分會將單字直接從中擷取，你可以用`:separator`參數來取代被擷取的單字部分:

```
"Oh dear! Oh dear! I shall be late!".truncate(18)
# => "Oh dear! Oh dea..."
"Oh dear! Oh dear! I shall be late!".truncate(18, :separator => ' ')
# => "Oh dear! Oh..."
```

> `:separator`無法使用正規表示法

### [](#inquiry)inquiry

`inquiry`方法會將字串轉型為`StringInquirer`物件，可以讓我們像用一般方法的方式來比對字串是否符合，最常見的例子就是判斷_Rails_正在使用的版本:

```
Rails.env.production? # 等同於 Rails.env == "production"
```

因此你可以用`inquiry`將一般字串轉型後來達到一樣的效果:

```
"production".inquiry.production? # => true
"active".inquiry.inactive?       # => false
```

### [](#key-based-interpolation)Key-based Interpolation

_Ruby1.9_以後的版本支援使用`%`符號做為字串中的變數鍵值:

```
"I say %{foo}" % {:foo => "wadus"}          # => "I say wadus"
"I say %{woo}" % {:foo => "wadus"}          # => KeyError
```

### [](#字串轉換相關)字串轉換相關

`to_date`、`to_time`與`to_datetime`三個方法是與轉換時間相關的方法，可以幫我們將字串轉型為時間物件:

```
"2010-07-27".to_date              # => Tue, 27 Jul 2010
"2010-07-27 23:37:00".to_time     # => Tue Jul 27 23:37:00 UTC 2010
"2010-07-27 23:37:00".to_datetime # => Tue, 27 Jul 2010 23:37:00 +0000
```

`to_time`另外還接受`:utc`或是`:local`的參數用來指定時區，預設為`:utc`:

```
"2010-07-27 23:42:00".to_time(:utc)   # => Tue Jul 27 23:42:00 UTC 2010
"2010-07-27 23:42:00".to_time(:local) # => Tue Jul 27 23:42:00 +0200 2010
```

### [](#其他實用的方法)其他實用的方法

`pluralize`方法可以幫我們將名詞字串轉為複數的名詞:

```
"table".pluralize     # => "tables"
"ruby".pluralize      # => "rubies"
"equipment".pluralize # => "equipment"
```

而`singularize`方法則是可以幫我們轉為單數:

```
"tables".singularize    # => "table"
"rubies".singularize    # => "ruby"
"equipment".singularize # => "equipment"
```

`camelize`可以幫我們將字串轉為駝峰式的字串:

```
"product".camelize    # => "Product"
"admin_user".camelize # => "AdminUser"
```

在_Rails_中也會將路徑中”/”符號轉為_Class_及_Module_中的命名空間符號`::`

```
"backoffice/session".camelize # => "Backoffice::Session"
```

而`underscore`則是將原先駝峰式的字串轉為路徑式的字串:

```
"Product".underscore   # => "product"
"AdminUser".underscore # => "admin_user"
"Backoffice::Session".underscore # => "backoffice/session"
```

`titleize`方法可以將字串標題化，將單字的開頭皆轉為大寫:

```
"alice in wonderland".titleize # => "Alice In Wonderland"
"fermat's enigma".titleize     # => "Fermat's Enigma"
```

`dasherize`可以將字串中的底線轉為橫線:

```
"name".dasherize         # => "name"
"contact_data".dasherize # => "contact-data"
```

`demodulize`可以將整串的`namespace`去除僅留下最後的_Class name_或是_Module name_:

```
"Backoffice::UsersController".demodulize    # => "UsersController"
"Admin::Hotel::ReservationUtils".demodulize # => "ReservationUtils"
```

`deconstantize`則是相反的作用，將上層的部分全部找出來:

```
"Backoffice::UsersController".deconstantize    # => "Backoffice"
"Admin::Hotel::ReservationUtils".deconstantize # => "Admin::Hotel"
```

必須注意的是這是處理字串，因此若直接僅給予_Class name_或是_Module name_是無法找出上層參照的

```
"Product".deconstantize  # => ""
```

`parameterize`可以將字串轉為適合_url_的方式:

```
"John Smith".parameterize # => "john-smith"
"Kurt Gödel".parameterize # => "kurt-godel"
```

`tableize`除了會將單數名詞轉為複數之外，還會將駝峰式的名詞改為底線:

```
"InvoiceLine".tableize # => "invoice_lines"
```

> `tableize`的作用其實在於幫助你找出_Model_的資料表名稱

`classify`則是`tableize`的相反，能夠幫你從資料表的名稱轉為_Model_:

```
"people".classify        # => "Person"
"invoices".classify      # => "Invoice"
"invoice_lines".classify # => "InvoiceLine"
```

`humanize`可以幫你將_Model_的屬性轉為較容易閱讀的形式:

```
"name".humanize           # => "Name"
"author_id".humanize      # => "Author"
"comments_count".humanize # => "Comments count"
```

## [](#擴充-enumerable)擴充 Enumerable

### [](#group_by)group\_by

`group_by`可以將列舉依照指定的欄位分組出來，例如將記錄依照日期排序出來:

```
latest_transcripts.group_by(&:day).each do |day, transcripts|
  p "#{day} -> #{transcripts.map(&:class).join(', ')}"
end
"2006-03-01 -> Transcript"
"2006-02-28 -> Transcript"
"2006-02-27 -> Transcript, Transcript"
"2006-02-26 -> Transcript, Transcript"
"2006-02-25 -> Transcript"
"2006-02-24 -> Transcript, Transcript"
"2006-02-23 -> Transcript"
```

### [](#sum)sum

`sum`可以算出集合的加總:

```
[1, 2, 3].sum # => 6
(1..100).sum  # => 5050
```

`sum`的作用其實就是幫你將元素彼此用`+`方法連結起來:

```
[[1, 2], [2, 3], [3, 4]].sum    # => [1, 2, 2, 3, 3, 4]
%w(foo bar baz).sum             # => "foobarbaz"
{:a => 1, :b => 2, :c => 3}.sum # => [:b, 2, :c, 3, :a, 1]
```

對空集合呼叫`sum`預設回傳0，但你也可以改寫:

```
[].sum    # => 0
[].sum(1) # => 1
```

如果給予一個_block_，那麼會迭代執行集合中的元素運算後再將結果加總起來:

```
(1..5).sum {|n| n * 2 } # => 30
[2, 4, 6, 8, 10].sum    # => 30
```

空集合的元素也可以這樣被改寫:

```
[].sum(1) {|n| n**3} # => 1
```

### [](#each_with_object)each\_with\_object

`inject`方法可以為集合中的元素迭代的給予指定的元素並運算:

```
[2, 3, 4].inject(1) {|product, i| product*i } # => 24
```

如果給予`inject`的參數為一個空區塊，那麼`inject`會將結果整理成_Hash_，但需注意在運算的結尾必須回傳運算結果:

```
%w{foo bar blah}.inject({}) do |hash, string|
  hash[string] = "something"
  hash # 需要回傳運算結果
end
 => {"foo"=>"something" "bar"=>"something" "blah"=>"something"}
```

`each_with_object`這個方法也可以達到一樣的效果，差別在於你不用回傳運算結果:

```
%w{foo bar blah}.each_with_object({}){|string, hash| hash[string] = "something"}
=> {"foo"=>"something", "bar"=>"something", "blah"=>"something"}
```

### [](#index_by)index\_by

`index_by`可以幫我們將集合元素以指定的欄位做為鍵值整理成_Hash_:

```
invoices.index_by(&:number)
# => {'2009-032' => <Invoice ...>, '2009-008' => <Invoice ...>, ...}
```

> 鍵值通常必須是唯一的，若不是唯一的話將會以最後出現的元素做為判斷值。

### [](#many)many?

`many?`是可個好用的方法可以幫助我們快速的判斷集合的數量是否大於1:

```
<% if pages.many? %>
  <%= pagination_links %>
<% end %>
```

如果對`many?`傳入區塊運算時，`many?`僅會回傳運算結果是`true`的結果:

```
@see_more = videos.many? {|video| video.category == params[:category]}
```

## [](#擴充-array)擴充 Array

### [](#隨機挑選)隨機挑選

```
shape_type = ["Circle", "Square", "Triangle"].sample
# => Square, for example

shape_types = ["Circle", "Square", "Triangle"].sample(2)
# => ["Triangle", "Circle"], for example
```

### [](#增加元素)增加元素

`prepend`會將新元素插入在整個陣列的最前方(`index`為0的位置)

```
%w(a b c d).prepend('e')  # => %w(e a b c d)
[].prepend(10)            # => [10]
```

`append`會將元素插入在陣列的最後方:

```
%w(a b c d).append('e')  # => %w(a b c d e)
[].append([1,2])         # => [[1,2]]
```

在_Rails_中我們常常會看到一個方法可以傳入不定數量的參數，例如:

```
my_method :arg1
my_method :arg1, :arg2, :argN
my_method :arg1, :foo => 1, :bar => 2
```

一個方法能夠接收不定數量的多個參數主要仰賴的是`extract_options!`這個方法會幫我們將傳入的集合參數展開，若沒有傳入參數時這個方法便會回傳空_Hash_

```
def my_method(*args)
  options = args.extract_options!
  puts "參數:  #{args.inspect}"
  puts "選項:    #{options.inspect}"
end

my_method(1, 2)
# 參數:  [1, 2]
# 選項:    {}

my_method(1, 2, :a => :b)
# 參數:  [1, 2]
# 選項:    {:a=>:b}
```

因此`extract_options!`這個方法可以很方便的幫你展開一個陣列中選項元素，最主要的作用就是展開傳入方法的參數。

### [](#grouping)Grouping

`in_groups_of`方法可以將陣列依照我們指定的數量做分組:

```
[1, 2, 3].in_groups_of(2) # => [[1, 2], [3, nil]]
```

如果給予一個_block_的話可以將分組的元素做_yield_:

```
<% sample.in_groups_of(3) do |a, b, c| %>
  <tr>
    <td><%=h a %></td>
    <td><%=h b %></td>
    <td><%=h c %></td>
  </tr>
<% end %>
```

在元素數量不夠分組的時候預設在不足的元素部分補`nil`，像第一個例子中最後一個元素是`nil`，你也可以在呼叫`in_groups_of`方法的同時傳入第二個參數做為不足元素的填充值:

```
[1, 2, 3].in_groups_of(2, 0) # => [[1, 2], [3, 0]]
```

你也可以傳入`false`指定當元素不足的時候就不要以`nil`做為填充值，也由於這層關係你無法指定`false`來做為一個填充值:

```
[1, 2, 3].in_groups_of(2, false) # => [[1, 2], [3]]
```

`in_groups_of`這個方法最常拿來使用在當你頁面每一列想要有n個元素來呈現的時候，例如假設我們有一個待辦清單的網站，我們希望頁面上每一列可以有四筆清單，我們可以這樣寫:

```
<% @tasks.in_groups_of(4) do |tasks| %>
  <ul>
    <% tasks.each do |task| %>
      <li><%= task.name %></li>
    <% end %>
  </ul>
<% end %>
```

`split`這個方法會依照你給的條件來判斷陣列內的元素做分割:

```
[1, 2, 3, 4, 5].split(3)                # => [[1, 2], [4, 5]] 如果陣列內元素是3的話做分割
(1..10).to_a.split { |i| i % 3 == 0 }   # => [[1, 2], [4, 5], [7, 8], [10]] 如果陣內元素是3的倍數就做分割
```

## [](#擴充-hash)擴充 Hash

### [](#merging-合併)Merging 合併

_Ruby_本身有_Hash#merge_方法來合併兩個_Hash_

```
{:a => 1, :b => 1}.merge(:a => 0, :c => 2)
# => {:a => 0, :b => 1, :c => 2}
```

#### [](#reverse_merge與reverse_merge)`reverse_merge`與`reverse_merge!`

在合併_Hash_時可能會遇到有一樣的_key_造成需要判斷以哪個_key_值做為依據的情況:

```
a = {:a => 1, :b => 2}
b = {:a => 3, :c => 4}

a.merge(b) # Ruby 本身的 merge 不會改變原先呼叫的 hash，並且以後面的 hash 為優先產生一個新的 hash
=> {:a=>3, :b=>2, :c=>4}
a # => {:a=>1, :b=>2}
b # => {:a=>3, :c=>4}

a.reverse_merge(b) # reverse_merge 不會改變原先呼叫的 hash，以前面呼叫的 hash 為優先產生一個新的 hash
=> {:a=>1, :c=>4, :b=>2}
a # => {:a=>1, :b=>2}
b # => {:a=>3, :c=>4}

a.reverse_merge!(b) # reverse_merge! 會以前面呼叫的 hash 優先並直接改變原先呼叫的 hash，不會產生新的 hash
=> {:a=>1, :b=>2, :c=>4}
a # => {:a=>1, :b=>2, :c=>4}
b # {:a=>3, :c=>4}
```

因此`reverse_merge`這個方法常用在指定_hash_的預設值:

```
options = options.reverse_merge(:length => 30, :omission => "...")
```

#### [](#deep_merge與deep_merge)`deep_merge`與`deep_merge!`

在兩個_hash_的鍵值相同，而值也是個_hash_的情況下，我們可以使用`deep_merge`將兩個_hash_組合:

```
{:a => {:b => 1}}.deep_merge(:a => {:c => 2})
# => {:a => {:b => 1, :c => 2}}
```

> `deep_merge!`的版本則是會直接更改呼叫的_hash_值

### [](#key-鍵值)Key 鍵值

#### [](#except與except)`except`與`except!`

`except`方法可以將指定的鍵值從_hash_中移除:

```
{:a => 1, :b => 2}.except(:a) # => {:b => 2}
```

`except`通常用在我們更新資料時對一些不想被更改的資料欄位做保護的動作:

```
params[:account] = params[:account].except(:plan_id) unless admin?
@account.update(params[:account])
```

`except!`會直接更改原本呼叫的_hash_而不是產生一個新的_hash_

#### [](#stringify_keys-與-stringify_keys)`stringify_keys` 與 `stringify_keys!`

`stringify_keys`可以將_hash_中的鍵值改為字串:

```
{nil => nil, 1 => 1, :a => :a}.stringify_keys
# => {"" => nil, "a" => :a, "1" => 1}
```

如果_hash_中有衝突發生，則以後者優先:

```
{"a" => 1, :a => 2}.stringify_keys
=> {"a"=>2}
```

這方法方便我們將傳入的_hash_做一致性的處理，而不用去考慮使用者傳入的_hash_是用_symbol_或是字串

`stringify_keys!`的版本會直接更改呼叫的_hash_值

#### [](#symbolize_keys與symbolize_keys)`symbolize_keys`與`symbolize_keys!`

`symbolize_keys`則是會把_hash_中的鍵值都呼叫`to_sym`方法將之改為_symbol_:

```
{nil => nil, 1 => 1, "a" => "a"}.symbolize_keys
# => {1 => 1, nil => nil, :a => "a"}
```

如果_hash_中有衝突發生，以後面的優先:

```
{"a" => 1, :a => 2}.symbolize_keys
=> {:a=>2}
```

`symbolize_keys!`版本會直接更改呼叫的_hash_值

#### [](#to_options與to_options)`to_options`與`to_options!`

`to_options`與`to_options!`方法作用與`symbolize_keys`方法是一樣的

#### [](#assert_valid_keys)`assert_valid_keys`

`assert_valid_keys`是用來指定_hash_鍵值的白名單，沒有在白名單裡的鍵值出現在_hash_中都會拋出例外:

```
{:a => 1}.assert_valid_keys(:a) # => {:a=>1}
{:a => 1}.assert_valid_keys("a") # ArgumentError: Unknown key: a
```

### [](#分割-hash)分割 Hash

`slice`方法可以幫我們從_hash_中切出指定的值:

```
{:a => 1, :b => 2, :c => 3}.slice(:a, :c)
# => {:c => 3, :a => 1}

{:a => 1, :b => 2, :c => 3}.slice(:b, :X)
# => {:b => 2} # 不存在的值會被忽略
```

> 這方法也常用來做為檢驗_hash_的白名單使用，將核可的值從_hash_中抽出

`slice!`的版本會直接更改呼叫的_hash_值

### [](#抽取)抽取

`extract!`方法會將_hash_中指定的值取出變為一個新的_hash_，並將原先的_hash_中減去我們抽取出來的部分:

```
hash = {:a => 1, :b => 2}
rest = hash.extract!(:a) # => {:a => 1}
hash                     # => {:b => 2}
```

## [](#擴充-datetime)擴充 DateTime

`DateTime`本身已經寫好很多實用的方法可以方便我們計算時間:

```
yesterday
tomorrow
beginning_of_week (at_beginning_of_week)
end_of_week (at_end_of_week)
monday
sunday
weeks_ago
prev_week
next_week
months_ago
months_since
beginning_of_month (at_beginning_of_month)
end_of_month (at_end_of_month)
prev_month
next_month
beginning_of_quarter (at_beginning_of_quarter)
end_of_quarter (at_end_of_quarter)
beginning_of_year (at_beginning_of_year)
end_of_year (at_end_of_year)
years_ago
years_since
prev_year
next_year
```

> `DateTime`並不支援日光節約時間

`DateTime.current`類似於 `Time.now.to_datetime`，但他的結果會依使用者本身的時區而定，如果在時區有設定的情況下，還會有些其他好用的方法像是`DateTime.yesterday`、`DateTime.tomorrow`，也可以使用像是`past?`及`future?`來與`DateTime.current`做判斷

`seconds_since_midnight`會回傳從午夜00:00:00到指定時間所經過的秒數:

```
now = DateTime.current     # => Mon, 07 Jun 2010 20:26:36 +0000
now.seconds_since_midnight # => 73596
```

`utc`可以把時間轉為_UTC_格式

```
now = DateTime.current # => Mon, 07 Jun 2010 19:27:52 -0400
now.utc                # => Mon, 07 Jun 2010 23:27:52 +0000
```

`utc?`可以判斷是否為_UTC_格式

```
now = DateTime.now # => Mon, 07 Jun 2010 19:30:47 -0400
now.utc?           # => false
now.utc.utc?       # => true
```

`advance`是個非常好用的方法，當我們想要找出相對於一個時間加加減減後的另一個時間非常好用:

```
d = DateTime.current
# => Thu, 05 Aug 2010 11:33:31 +0000
d.advance(:years => 1, :months => 1, :days => 1, :hours => 1, :minutes => 1, :seconds => 1)
# => Tue, 06 Sep 2011 12:34:32 +0000
```

要注意的是你如果呼叫多次`advance`去做計算，其結果可能與呼叫一次是有差異的，你可以參考下面的例子:

```
d = DateTime.new(2010, 2, 28, 23, 59, 59)
# => Sun, 28 Feb 2010 23:59:59 +0000
d.advance(:months => 1, :seconds => 1)
# => Mon, 29 Mar 2010 00:00:00 +0000
d.advance(:seconds => 1).advance(:months => 1)
# => Thu, 01 Apr 2010 00:00:00 +0000
```

`change`可以傳入參數給指定的時間將它改為我們想要的時間:

```
now = DateTime.current
# => Tue, 08 Jun 2010 01:56:22 +0000
now.change(:year => 2011, :offset => Rational(-6, 24))
# => Wed, 08 Jun 2011 01:56:22 -0600 將年份跟時區指定為我們傳入的參數
```

如果你傳入的參數只有`hour`的時候並且為0的時候，分鐘及秒數都會被設為0:

```
now.change(:hour => 0)
# => Tue, 08 Jun 2010 00:00:00 +0000
```

同樣的，如果傳入的參數只有`min`並且值為0的時候，秒數就會被設為0:

```
now.change(:min => 0)
# => Tue, 08 Jun 2010 01:00:00 +0000
```

`DateTime`也可以方便得用時間間隔來做加減:

```
now = DateTime.current
# => Mon, 09 Aug 2010 23:15:17 +0000
now + 1.year
# => Tue, 09 Aug 2011 23:15:17 +0000
now - 1.week
# => Mon, 02 Aug 2010 23:15:17 +0000
```

## [](#擴充-time)擴充 Time

`Time`繼承從`DateTime`來很多好用的方法:

```
past?
today?
future?
yesterday
tomorrow
seconds_since_midnight
change
advance
ago
since (in)
beginning_of_day (midnight, at_midnight, at_beginning_of_day)
end_of_day
beginning_of_week (at_beginning_of_week)
end_of_week (at_end_of_week)
monday
sunday
weeks_ago
prev_week
next_week
months_ago
months_since
beginning_of_month (at_beginning_of_month)
end_of_month (at_end_of_month)
prev_month
next_month
beginning_of_quarter (at_beginning_of_quarter)
end_of_quarter (at_end_of_quarter)
beginning_of_year (at_beginning_of_year)
end_of_year (at_end_of_year)
years_ago
years_since
prev_year
next_year
```

> `Time`的`change`方法接受一個額外的參數`:usec`

> `Time`不同於`DateTime`，是能正確計算出時區間的差異，`DateTime`是不支援時光節約時間的

```
Time.zone_default
# => #<ActiveSupport::TimeZone:0x7f73654d4f38 @utc_offset=nil, @name="Madrid", ...>

# In Barcelona, 2010/03/28 02:00 +0100 becomes 2010/03/28 03:00 +0200 due to DST.
t = Time.local_time(2010, 3, 28, 1, 59, 59)
# => Sun Mar 28 01:59:59 +0100 2010
t.advance(:seconds => 1)
# => Sun Mar 28 03:00:00 +0200 2010
```

使用`since`或是`ago`時，如果得到的時間無法用`Time`來呈現時，會自動轉型為`DateTime`

### [](#timecurrent)Time.current

`Time.current`類似於`Time.now`會回傳現在時間，唯一的差別在於`Time.current`會依照使用者的時區來回傳，在有定義時區的情況下你也可以使用像是`Time.yesterday`、`Time.tomorrow`的方法，以及像是`past?`、`today?`、`future?`等用來與`Time.current`比較的方法

> 也因為如此，當我們在做時間的處理時盡量使用像是`Time.current`而少用`Time.now`，不然很有可能會出現時區問題所造成的錯誤計算

### [](#all_dayall_weekall_monthall_quarter-與-all_year)all\_day、all\_week、all\_month、all\_quarter 與 all\_year

上面所列的`all_*`方法會回傳與指定時間相較的一個區間:

```
now = Time.current
# => Mon, 09 Aug 2010 23:20:05 UTC +00:00
now.all_day
# => Mon, 09 Aug 2010 00:00:00 UTC +00:00..Mon, 09 Aug 2010 23:59:59 UTC +00:00
now.all_week
# => Mon, 09 Aug 2010 00:00:00 UTC +00:00..Sun, 15 Aug 2010 23:59:59 UTC +00:00
now.all_month
# => Sat, 01 Aug 2010 00:00:00 UTC +00:00..Tue, 31 Aug 2010 23:59:59 UTC +00:00
now.all_quarter
# => Thu, 01 Jul 2010 00:00:00 UTC +00:00..Thu, 30 Sep 2010 23:59:59 UTC +00:00
now.all_year
# => Fri, 01 Jan 2010 00:00:00 UTC +00:00..Fri, 31 Dec 2010 23:59:59 UTC +00:00
```

### [](#time-constructors)Time Constructors

`Active Support`定義了 `Time.current`，等同於`Time.zone.now`，如果使用者已經有定義時區的話，那麼`Time.now`也會得到一樣的效果:

```
Time.zone_default
# => #<ActiveSupport::TimeZone:0x7f73654d4f38 @utc_offset=nil, @name="Madrid", ...>
Time.current
# => Fri, 06 Aug 2010 17:11:58 CEST +02:00
```

`local_time`這個_class method_可以幫助我們建立基於使用者時區設定的時間物件:

```
Time.zone_default
# => #<ActiveSupport::TimeZone:0x7f73654d4f38 @utc_offset=nil, @name="Madrid", ...>
Time.local_time(2010, 8, 15)
# => Sun Aug 15 00:00:00 +0200 2010
```

`utc_time`可以回傳_UTC_格式的時間物件:

```
Time.zone_default
# => #<ActiveSupport::TimeZone:0x7f73654d4f38 @utc_offset=nil, @name="Madrid", ...>
Time.utc_time(2010, 8, 15)
# => Sun Aug 15 00:00:00 UTC 2010
```

`local_time`與`utc_time`這兩個方法都接受七個時間參數:`year`、`month`、`day`、`hour`、`min`、`sec`以及`usec`，`year`是必填參數，`month`和`day`預設為1，而其他參數預設為0

時間也可以使用簡單的加減:

```
now = Time.current
# => Mon, 09 Aug 2010 23:20:05 UTC +00:00
now + 1.year
#  => Tue, 09 Aug 2011 23:21:11 UTC +00:00
now - 1.week
# => Mon, 02 Aug 2010 23:21:11 UTC +00:00
```

## [](#concerns)Concerns

假設我們現在有一個_Module A_與_Module B_有相依關係：

```
Module A
  self.included(base)
    include B
    # 當 Module A 被 include 後便 include Module B
  end
end
```

今天當我們想要_include Module A_時，由於_Module A_與_Module B_的相依關係，我們必須同時將兩個_Module_都_include_進來：

```
class Something
  include A, B
end
```

但我們其實沒有必要我想要_include_的_Module_之間的相依關係，如此便有了`ActiveSupport::Concern`的意義，就是讓我們只需要_include_我們想要使用的_Module_，其他的相依關係我們不需要去考慮他，你所需要作的只是在_Module A_中`extend ActiveSupport::Concern`：

```
Module A
  extend ActiveSupport::Concern
  included do
    include B
    # 當 Module A 被 include 後便 include Module B
  end
end
```

如此一來我們只需要`include A`就可以搞定了！

更多內容請請參考：[深入Rails3: ActiveSupport::Concern](https://ihower.tw/blog/archives/3949/)

## [](#benchmarks)Benchmarks

`benchmark`方法可以用來測試_template_的執行時間並記錄起來：

```
<% benchmark "Process data files" do %>
  <%= expensive_files_operation %>
<% end %>
```

這樣將會在你的_log_記錄中增加一筆像是`“Process data files (345.2ms)”`的紀錄，你便可用來測量並改善你的程式碼。

你也可以設定`log`的層級，預設是`info`：

```
<% benchmark "Low-level files", :level => :debug do %>
  <%= lowlevel_files_operation %>
<% end %>
```

## [](#configurable)Configurable

`Configurable`這個模組是_Rails_本身用來作為`AbstractController::Base`的設定使用，我們可以借用這個功能來為我們的類別增加設定選項：

```
class Employee
  include ActiveSupport::Configurable
end

employee = Employee.new
employee.config.sex = male
employee.config.permission = :normal
employee.config.salary = 22000
```

`config_accessor`方法可以幫助我們將這些設定轉為方法：

```
class Employee
  include ActiveSupport::Configurable
  config_accessor  :sex, :permission, :salary

  # 現在你可以使用 employee.sex, employee.permission, employee.salary 來取用這些設定
end
```

上面的範例讓每個`Employee`的實例變數都能有自己的設定，但其實我們也可以有類別層級的設定讓每個實例變數都能共享設定：

```
# 設定類別層級的設定
Employee.config.duty_hour = 8

# 新增一個employee
employee = Employee.new
employee.config.duty_hour # => 8

# 由實例變數更改設定
employee.config.duty_hour = 5

# 會更改類別層級設定
Employee.config.duty_hour # => 5
```

## [](#更多線上資源)更多線上資源

-   [Active Support Core Extensions](http://guides.rubyonrails.org/active_support_core_extensions.html)

* * *
