> Actually, I’m trying to make Ruby natural, not simple. Ruby is simple in appearance, but is very complex inside, just like our human body. - Matz, Ruby 發明人

_Ruby_是個美麗、靈巧而且方便又實用的程式語言，而_Ruby on Rails_正是 Ruby 程式語言爆發成長的催化劑。在了解_Ruby on Rails_的程式之前，學習_Ruby_程式語言是最重要的基礎功課之一，我們在這一章節將快速帶過一些基本的語法，網路上也有_Ruby Taiwan_社群所翻譯的文章可以一讀：

-   _Ruby_中文官方網站：[Ruby簡介](http://www.ruby-lang.org/zh_TW/about/)
-   _Ruby_中文官方網站：[二十分鐘Ruby體驗](http://www.ruby-lang.org/zh_TW/documentation/quickstart/)
-   _Ruby_中文官方網站：[從其他程式語言到Ruby](http://www.ruby-lang.org/zh_TW/documentation/ruby-from-other-languages/)
-   [Ruby使用手冊](http://guides.ruby.tw/ruby/)

免費的英文資源也很多，我推薦以下三個教學網站作為練習之用：

-   [Introduction to Programming with Ruby by Tealeaf Academy](http://www.gotealeaf.com/books/ruby) 和 [Object Oriented Programming with Ruby](https://launchschool.com/books/oo_ruby) 除了入門的內容，還包括完整練習題和解答
-   [Learn Ruby the Hard Way](http://ruby.learncodethehardway.org/book/) 以習題為主的教材
-   [Codecademy](http://www.codecademy.com/en/tracks/ruby) 從做中學的線上互動教學

## [](#各種ruby實作)各種_Ruby_實作

除了用_C_語言實作的官方版本[_Ruby_](http://ruby-lang.org/)(又叫做_CRuby_或_MRI, Matz’s Ruby Interpreter_)，也有其他不同實作的_Ruby_環境。這些實作都以_[RubySpec](http://rubyspec.org/)_作為其語法的標準：

-   _[JRuby](http://jruby.org/)_是由_Java_實作的_Ruby_，運行在高效能、支援系統執行緒及有非常多函數庫的_Java_虛擬機器_(JVM)_上。_JRuby_算是目前_Ruby_要開發跨平台(_Windows_、_Mac_和_Linux_)桌面軟體最好的選擇。
-   _[Rubinuis](http://rubini.us/)_是用_C++_、_Ruby_和_LLVM_編譯器技術實作的_Ruby VM_，可以在_Mac OS X_、_Debian/Ubuntu_、_FreeBSD_、_Windows_上執行。_LLVM_可以說是當代最重要的編譯器架構，擁有各種編譯器最佳化技術。能給_Ruby_帶來多少效能改善幅度，值得關注。

## [](#irbinteractive-ruby)_IRB(Interactive Ruby)_

_IRB_是一個互動的_Ruby_環境，可以讓我們練習和語法，做些簡單的實驗。請輸入`irb`就會進入互動模式：

```
$ irb
irb: Interactive Ruby
irb(main):001:0>
irb(main):001:0> 1 + 1
=> 2
```

在`irb`之中，每行執行完_Ruby_都會自動幫你`puts`輸出結果。

不過，一旦程式稍微複雜一點，還是打開文字編輯器吧。讓我們編輯一個檔案_hello.rb_。_Ruby_腳本附檔名的慣例是_.rb_，內容如下：

```
puts "Hello, World!!"
```

存檔後，輸入：

```
$ ruby hello.rb
```

就會執行這個腳本了，它會在螢幕上輸出_Hello, World!!_。

## [](#程式語言分類)程式語言分類

根據需不需要事先宣告變數型別，我們可以分類出靜態分型_(Static typing_)與動態分型_(Dynamic typing)_程式語言，前者例如_Java_、_C_、_C++_，後者例如_Ruby_、_Perl_、_Python_和_PHP_。根據會不會隱性自動轉換型別，又可以區分出不會自動轉換型別的強分型_(Strong typing)_與自動轉換型別的弱分型_(Weak typing)_，前者例如_Ruby_、_Perl_、_Python_、_Java_，後者例如_PHP_、_C_、_C++_是弱分型。讓我們舉個例吧：

```
/* PHP */
$i = 1;
echo "Value is " . $i ;
# Value is 1

/* C */
int a = 5;
float b = a;
```

以上的_PHP_和_C_會隱性地自動轉型，但是以下的_Ruby_程式會檢查型別不相配而發生錯誤，這一點從_PHP_過來的朋友要特別注意。

```
# Ruby
i = 1
puts "Value is " + i

# TypeError: can't convert Fixnum into String
#   from (irb):2:in `+'
#   from (irb):2
```

另外，通常動態分型的程式語言多半也是直譯式_(interpreted)_程式語言，也就是不需要事先編譯，透過直譯器_(interpreter)_執行即可，當然_Ruby_也不例外。相對的，編譯式_(compiled)_語言則是事先編譯成執行檔才行執行。總結以上，_Ruby_是個動態強分型的直譯式程式語言。

## [](#整數integer)整數_Integer_

任何整數都是_Fixnum_物件：

```
5
-205
9999999999
0
```

完整的_Fixnum API_請參考_[Ruby doc](http://www.ruby-doc.org/core/classes/Fixnum.html)_文件。

## [](#浮點數float)浮點數_Float_

中間帶有點號的就是浮點數_Float_物件：

```
54.321
0.001
-12.312
0.0
```

浮點數四則運算範例如下：

```
puts 1.0 + 2.0
puts 2.0 * 3.0
puts 5.0 - 8.0
puts 9.0 / 2.0

# 3.0
# 6.0
# -3.0
# 4.5
```

要注意的是，整數四則運算結果，也會是整數：

```
puts 1 + 2
puts 2 * 3
puts 5 - 8
puts 9 / 2

# 3
# 6
# -3
# 4
```

以下是一個更複雜的四則運算例子：

```
puts 5 * (12 - 8) + -15
puts 98 + (59872 / (13*8)) * -52
```

完整的_Float API_請參考_[Ruby doc](http://www.ruby-doc.org/core/classes/Float.html)_文件。

## [](#字串string)字串_String_

使用單引號或雙引號括起來的是字串_String_物件：

```
puts 'Hello, world!'
puts ''
puts 'Good-bye.'
```

字串相加可以使用加號，要注意的是字串不能直接跟數字相加，會發生例外錯誤：

```
puts 'I like ' + 'apple pie.'
puts 'You\'re smart!'

puts '12' + 12
#<TypeError: can't convert Fixnum into String>
```

更多字串方法示範：

```
var1 = 'stop'
var2 = 'foobar'
var3 = "aAbBcC"

puts var1.reverse # pots
puts var2.length # 6
puts var3.upcase # AABBCC
puts var3.downcase # aabbcc
```

為了方便字串的組合，_Ruby_也支持內插的方式：

```
verb = 'work'
where = 'office'

puts "I #{verb} at the #{where}" # 輸出 I work at the office
```

注意到使用雙引號(“)的字串才會進行內插處理。如果換成單引號(‘)：

```
puts 'I #{verb} at the #{where}' # 輸出 I #{verb} at the #{where}
```

完整的_String API_請參考_[Ruby String API](http://www.ruby-doc.org/core/classes/String.html)_文件。

## [](#ruby完全地物件導向)_Ruby_完全地物件導向

你可能已經注意到，在_Ruby_裡每樣東西都是物件，包括字串和數字。所有的方法都是對物件呼叫，你不會看到全域函式，例如_PHP_的`strlen("test")`用法，在_Ruby_中是`"test".length`。

```
# 輸出「UPPER」
puts "upper".upcase

# 輸出 -5 的絕對值
puts -5.abs

# 輸出 Fixnum 類別
puts 99.class

# 輸出五次「Ruby Rocks!」
5.times do
  puts "Ruby Rocks!"
end
```

## [](#區域變數local-variable)區域變數_Local Variable_

區域變數使用小寫開頭，偏好單字之間以底線`_`來分隔。範例如下：

```
composer = 'Mozart'
puts composer + ' was "da bomb", in his day.'

my_composer = 'Beethoven'
puts 'But I prefer ' + my_composer + ', personally.'
```

如果存取一個尚未初始過的區域變數，會得到以下錯誤：

```
NameError: undefined local variable or method `qwer' for main:Object
from (irb):1
from /Users/ihower/.rvm/rubies/ruby-2.1.5/bin/irb:11:in `<main>'
```

## [](#型別轉換conversions)型別轉換_Conversions_

剛剛提到數字和字串物件不能直接相加，你必須使用`to_s`(轉成字串)、`to_i`(轉成整數)或`to_f`(轉成浮點數)來手動轉型，範例如下：

```
var1 = 2
var2 = '5'

puts var1.to_s + var2 # 25
puts var1 + var2.to_i # 7

puts 9.to_f / 2 # 4.5
```

## [](#常數constant)常數_Constant_

大寫開頭的是為常數，範例如下：

```
Foo = 1
Foo = 2 # (irb):3: warning: already initialized constant Foo

RUBY_PLATFORM # => "x86_64-darwin10.7.0"
ENV # => { "PATH" => "....", "LC_ALL" => "zh_TW.UTF-8" }
```

## [](#空值nil)空值_nil_

表示未設定值、未定義的狀態：

```
nil # nil
nil.class # NilClass

nil.nil? # true
42.nil? # false

nil == nil # true
false == nil # false
```

## [](#註解)註解

_Ruby_偏好一律使用單行註解：

```
# this is a comment line
# this is a comment line
```

多行註解比較少見：

```
=begin
    This is a comment line
    This is a comment line
=end
```

## [](#字串符號symbols)字串符號_Symbols_

_Symbol_是唯一且不會變動的識別名稱，用冒號開頭：

```
:this_is_a_symbol
```

為什麼不就用字串呢？這是因為相同名稱的_Symbol_不會再重複建構物件，所以使用_Symbol_可以執行的更有效率。範例如下：

```
puts "foobar".object_id      # 輸出 2151854740
puts "foobar".object_id      # 輸出 2151830100
puts :foobar.object_id       # 輸出 577768
puts :foobar.object_id       # 輸出 577768
```

`object_id`方法會回傳_Ruby_內部的記憶體配置編號。你會發現兩個字串就算內容相同，也是不同的物件。但是_Symbol_只要內容相同，就是相同的物件。這種特性讓_Symbol_的主要用途是作為雜湊_Hash_的鍵(Key)，一會就會介紹到。

## [](#陣列array)陣列_Array_

使用中括號，索引從`0`開始。注意到陣列中的元素是不限同一類別，想放什麼都可以：

```
a = [ 1, "cat", 3.14 ]

puts a[0] # 輸出 1
puts a.size # 輸出 3

a[2] = nil
puts a.inspect # 輸出 [1, "cat", nil]
a[99] # nil
```

> `inspect`方法會將物件轉成適合給人看的字串

如果讀取一個沒有設定的陣列元素，預設值是`nil`。更多陣列方法範例：

```
colors = ["red", "blue"]

colors.push("black")
colors << "white"
puts colors.join(", ") # red, blue, black, white

colors.pop
puts colors.last #black
```

使用`each`方法走訪陣列：

```
languages = ['Ruby', 'Javascript', 'Perl']

languages.each do |lang|
  puts 'I love ' + lang + '!'
end

# I Love Ruby!
# I Love Javascript!
# I Love Perl!
```

完整的_Array API_請參考_\[Ruby Array API(http://www.ruby-doc.org/core/classes/Array.html)_文件。

## [](#雜湊hash)雜湊_Hash_

_Hash_是一種_鍵值對(Key-Value)_的資料結構，雖然你可以使用任何物件當作_Key_，但是通常我們使用_Symbol_當作_Key_。例如：

```
config = { :foo => 123, :bar => 456 }
puts config[:foo] # 輸出 123
config["nothing"] # 是 nil
```

在_Ruby 1.9_後支援新的語法，比較簡約：

```
config = { foo: 123, bar: 456 } # 等同於 { :foo => 123, :bar => 456 }
```

如果讀取一個不存在的值，例如上述範例的`nothing`，預設值是`nil`。

使用`each`方法可以走訪雜湊：

```
config = { :foo => 123, :bar => 456 }
config.each do |key, value|
  puts "#{key} is #{value}"
end

# foo is 123
# bar is 456
```

完整的_Hash API_請參考_[Ruby Hash API](http://www.ruby-doc.org/core/classes/Hash.html)_文件。

## [](#流程控制flow-control)流程控制_Flow Control_

讓我們來看看一些流程控制：

### [](#比較方法)比較方法

```
puts 1 > 2 # 大於
puts 1 < 2 # 小於
puts 5 >= 5 # 大於等於
puts 5 <= 4 # 小於等於
puts 1 == 1 # 等於
puts 2 != 1 # 不等於

puts ( 2 > 1 ) && ( 2 > 3 ) # 和
puts ( 2 > 1 ) || ( 2 > 3 ) # 或
```

### [](#控制結構if)控制結構_If_

_else if_寫成`elsif`：

```
total = 26000

if total > 100000
  puts "large account"
elsif total > 25000
  puts "medium account"
else
  puts "small account"
end
```

另外如果要執行的`if`程式只有一行，可以將`if`放到行末即可：

```
puts "greater than ten" if total > 10
```

### [](#三元運算子)三元運算子

三元運算子`expression ? true_expresion : false_expression`可以讓我們處理簡易的_if else_條件，例如以下的程式：

```
x = 3
if x > 3
  y = "foo"
else
  y = "bar"
end
```

改用三元運算子之後，可以縮減程式行數：

```
x = 3
y = ( x > 3 ) ? "foo" : "bar"
```

### [](#控制結構case)控制結構_Case_

```
case name
  when "John"
    puts "Howdy John!"
  when "Ryan"
    puts "Whatz up Ryan!"
  else
    puts "Hi #{name}!"
end
```

### [](#迴圈-while-loop-until-next-and-break)迴圈 while, loop, until, next and break

_while_用法範例：

```
i=0
while ( i < 10 )
  i += 1
  next if i % 2 == 0 #跳過雙數
end
```

_until_用法範例：

```
i = 0
i += 1 until i > 10
puts i
# 輸出 11
```

_loop_用法範例：

```
i = 0
loop do
  i += 1
  break if i > 10 # 中斷迴圈
end
```

不過你很快就會發現寫_Ruby_很少用到_while_、_until_、_loop_，我們會使用迭代器。

### [](#真或假)真或假

記住，只有`false`和`nil`是假，其他都為真。

```
puts "not execute" if nil
puts "not execute" if false

puts "execute" if true # 輸出 execute
puts "execute" if “” # 輸出 execute (和JavaScript不同)
puts "execute" if 0 # 輸出 execute (和C不同)
puts "execute" if 1 # 輸出 execute
puts "execute" if "foo" # 輸出 execute
puts "execute" if Array.new # 輸出 execute
```

## [](#正規表示法regular-expressions)正規表示法_Regular Expressions_

與_Perl_類似的語法，使用`=~`：

```
# 抓出手機號碼
phone = "123-456-7890"
if phone =~ /(\d{3})-(\d{3})-(\d{4})/
  ext  = $1
  city = $2
  num  = $3
end
```

## [](#方法定義methods)方法定義_Methods_

使用`def`開頭`end`結尾來定義一個方法：

```
def say_hello(name)
  result = "Hi, " + name
  return result
end

puts say_hello('ihower')
# 輸出 Hi, ihower
```

方法中的`return`是可以省略的，_Ruby_就會回傳最後一行運算的值。上述方法可以改寫成：

```
def say_hello(name)
  "Hi, " + name
end
```

呼叫方法時，括號也是可以省略的，例如：

```
say_hello 'ihower'
```

不過，除了一些方法慣例不加之外(例如`puts`和_Rails_中的`redirect_to`、`render`方法)，絕大部分的情況加上括號比較無疑義。

我們也可以給參數預設值：

```
def say_hello(name = "nobody")
  result = "Hi, " + name
  return result
end

puts say_hello
# 輸出 Hi, nobody
```

## [](#與的慣例)`?`與`!`的慣例

方法名稱可以用`?`或`!`結尾，前者表示會回傳_Boolean_值，後者暗示會有某種副作用_(side-effect)_。範例如下：

```
array=[2,1,3]

array.empty? # false
array.sort # [1,2,3]

array.inspect # [2,1,3]

array.sort! # [1,2,3]
array.inspect # [1,2,3]
```

## [](#物件導向)物件導向

物件導向_(Object-Oriented Programming)_一種將「資料」和「方法」封裝到物件的設計方式，我們定義「類別 Class」，然後依此產生出「物件 Object」，類別可說是物件的樣板。

_Ruby_的類別其實也是一種常數，所以也是大寫開頭，使用`new`方法可以建立出物件，例如之前所學的字串、陣列和雜湊，也可以用以下方式建立：

```
color_string = String.new
color_string = "" # 等同

color_array = Array.new
color_array = [] # 等同

color_hash = Hash.new
color_hash = {} # 等同

time  = Time.new # 內建的時間類別
puts time
```

來看看如何自定類別：

```
class Person # 大寫開頭的常數

  def initialize(name) # 建構式
    @name = name # 物件變數
  end

  def say(word)
    puts "#{word}, #{@name}" # 字串相加
  end

end

p1 = Person.new("ihower")
p2 = Person.new("ihover")

p1.say("Hello") # 輸出 Hello, ihower
p2.say("Hello") # 輸出 Hello, ihover
```

> 注意到雙引號裡的字串可以使用`#{var}`來做字串嵌入，相較起用加號`+`相加字串可以更有效率。

除了物件方法與物件變數，_Ruby_也有屬於類別的方法和變數：

```
class Person

  @@name = “ihower” # 類別變數

  def self.say # 類別方法
    puts @@name
  end

end

Person.say # 輸出 ihower
```

### [](#資料封裝)資料封裝

所有的物件變數(`@`開頭)、類別變數(`@@`開頭)，都是封裝在類別內部的，類別外無法存取：

```
class Person
  def initialize(name)
    @name = name
  end
end

p = Person.new('ihower')
p.name                      # 出現 NoMethodError 錯誤
p.name = 'peny'             # 出現 NoMethodError 錯誤
```

為了可以存取到`@name`，我們必須定義方法：

```
class Person

  def initialize(name)
    @name = name
  end

  def name
    @name
  end

  def name=(name)
    @name = name
  end
end

p = Person.new('ihower')
=> #<Person:0x007fe9e408b8f0 @name="ihower">
p.name
=> "ihower"
p.name="peny"
=> "peny"
p.name
=> "peny"
p
=> #<Person:0x007fe9e408b8f0 @name="peny">
```

### [](#類別class定義範圍內也可以執行程式)類別`Class`定義範圍內也可以執行程式

跟其他程式語言不太一樣，_Ruby_的類別層級內也可以執行程式，例如以下：

```
class Demo
  puts "foobar"
end
```

當你載入這個類別的時候，就會執行`puts "foobar"`輸出_foobar_。會放在這裡的程式，主要的用途是來做_Meta-programming_。例如，上述定義物件變數的存取方法實在太常見了，因此_Ruby_提供了`attr_accessor`、`attr_writer`、`attr_reader`類別方法可以直接定義這些方法。上述的程式可以改寫成：

```
class Person
  attr_accessor :name

  def initialize(name)
    @name = name
  end
end

p = Person.new('ihower')
=> #<Person:0x007fe9e3094410 @name="ihower">
p.name
=> "ihower"
p.name="peny"
=> "peny"
p.name
=> "peny"
p
=> #<Person:0x007fe9e3094410 @name="peny">
```

這裡的`attr_accessor`其實就是一個類別方法。

### [](#方法封裝)方法封裝

類別中的方法預設是`public`的，宣告`private`或`protected`的話，該行以下的方法就會套用：

```
class MyClass

  def public_method
  end

  private

  def private_method_1
  end

  def private_method_2
  end

  protected

  def protected_method
  end

end
```

_Ruby_的_private_和_protected_定義和其他程式語言不同，都是可以在整個繼承體系內呼叫。兩著差別在於_private_只有在物件內部才能呼叫，預設的接收者_(receiver)_就是物件本身，也就是_self_。而_protected_方法除了可以在本身內部呼叫以外，還可以被子類別的物件、或是另一個相同類別的物件呼叫。

> 在物件導向的術語中，`object.call_method`的意思是_object_收到執行_call\_method_的指令，也就是_object_是_call\_method_方法的接受者_(receiver)_。因此，你甚至可以改寫成`object.__send__(:call_method)`

### [](#class-繼承)Class 繼承

_Ruby_使用小於`<`符號代表類別繼承：

```
class Pet
  attr_accessor :name, :age

  def say(word)
    puts "Say: #{word}"
  end
end

class Cat < Pet
  def say(word)
    puts "Meow~"
    super
  end
end

class Dog < Pet
  def say(word, person)
    puts "Bark at #{person}!"
    super(word)
  end
end

Cat.new.say("Hi")
Dog.new.say("Hi", "ihower")
```

輸出

```
Meow~
Say: Hi
Bark at ihower!
Say: Hi
```

這個範例中，`Cat`和`Dog`子類別覆寫了_Pet say_方法，其中的`super`是用來呼叫被覆寫掉的_Pet say_方法。另外，沒有括號的`super`和有括號的`super()`是有差異的，前者_Ruby_會自動將所有參數都代進去來呼叫父類別的方法，後者則是自己指定參數。此例中如果_Dog say_裡只寫`super`，則會發生_wrong number of arguments_的錯誤，這是因為_Ruby_會傳`say("Hi", "ihower")`給_Pet say_而發生錯誤。

### [](#module)Module

_Module_是_Ruby_一個非常好用的功能，它跟_Class_類別非常相似，你可以在裡面定義方法。只是你不能用_new_來建立它。它的第一個用途是可以當做_Namespace_來放一些工具方法：

```
module MyUtil

  def self.foobar
    puts "foobar"
  end

end

MyUtil.foobar
# 輸出 foobar
```

另一個更重要的功能是_Mixins_，可以將一個_Module_混入類別之中，這樣這個類別就會擁有此_Module_的方法。這回讓我們拆成兩個檔案，_debug.rb_和_foobar.rb_，然後在_foobar.rb_中用`require`來引用_debug.rb_：

首先是_debug.rb_

```
module Debug
  def who_am_i?
    puts "#{self.class.name}: #{self.inspect}"
  end
end
```

然後是_foobar.rb_

```
require "./debug"
class Foo
  include Debug # 這個動作叫做 Mixin
end

class Bar
  include Debug
end

f = Foo.new
b = Bar.new
f.who_am_i? # 輸出 Foo: #<Foo:0x00000102829170>
b.who_am_i? # 輸出 Bar: #<Bar:0x00000102825b88>
```

_Ruby_使用_Module_來解決多重繼承的問題，不同類別之間但是擁有相同的方法，就可以改放在_Module_裡面，然後`include`它即可。

## [](#迴圈走訪與迭代器iterator)迴圈走訪與迭代器_Iterator_

不同於`while`迴圈用法，_Ruby_習慣使用迭代器_(Iterator)_來走訪迴圈，例如`each`是一個陣列的方法，它會走訪其中的元素，其中的`do ... end`是`each`方法的參數，稱作_Code Block_，是一個匿名函式_(anonymous function)_。範例程式如下：

```
languages = ['Ruby', 'Javascript', 'Perl']
languages.each do |lang|
  puts "I love #{lang}!"
end
# I Love Ruby!
# I Love Javascript!
# I Love Perl!
```

其中兩個直線`|`中間的_lang_被稱作_Block variable_區塊變數，每次迭代都會被設定成不同元素。其他迭代器範例如：

```
# 反覆三次
3.times do
  puts 'Good Job!'
end
# Good Job!
# Good Job!
# Good Job!

# 從一數到九
1.upto(9) do |x|
  puts x
end

# 多一個索引區塊變數
languages = ['Ruby', 'Javascript', 'Perl']
languages.each_with_index do |lang, i|
    puts "#{i}, I love #{lang}!"
end
# 0, I Love Ruby!
# 1, I Love Javascript!
# 2, I Love Perl!
```

_(Code block)_的形式除了`do ... end`，也可以改用大括號。通常單行會會用大括號，多行會用`do ... end`的形式。

```
3.times { puts "Hello" }
```

透過迭代器，我們就比較少用到`while`、`until`、`for`等迴圈語法了。

### [](#其他迭代方式範例)其他迭代方式範例

```
# 迭代並造出另一個陣列
a = ["a", "b", "c", "d"]
b = a.map {|x| x + "!" }
puts b.inspect

# 結果是 ["a!", "b!", "c!", "d!"]

# 找出符合條件的值
b = [1, 2, 3].find_all{ |x| x % 2 == 0 }
b.inspect
# 結果是 [2]

# 迭代並根據條件刪除
a = [51, 101, 256]
a.delete_if {|x| x >= 100 }
# 結果是 [51]

# 客製化排序
[2, 1, 3].sort! { |a, b| b <=> a }
# 結果是 [3, 2, 1]

# 計算總和
(5..10).inject {|sum, n| sum + n }
# 結果是 45

# 找出最長字串find the longest word
longest = ["cat", "sheep", "bear"].inject do |memo, word|
  ( memo.length > word.length ) ? memo : word
end
# 結果是 "sheep"
```

> `<=>`是比較運算子，當兩個數字相等於回傳`0`，第一個數字較大時回傳`1`，反之回傳`-1`

### [](#僅執行一次呼叫)僅執行一次呼叫

除了迭代，_Code block_只會執行一次的特性也很有用，例如用來開啟檔案。往常我們在檔案處理完畢之後，會使用`close`方法關閉：

```
file = File.new("testfile", "r")
# ...處理檔案
file.close
```

改用_Code block_語法之後，_Ruby_就會在_Code block_結束後自動關檔：

```
File.open("testfile", "r") do |file|
  # ...處理檔案
end
# 檔案自動關閉
```

_Code block_的這個特性不只讓你少打`close`方法，更可以避免你忘記關閉檔案(不然就語法錯誤了)，也有視覺上縮排的好處。

### [](#yield)Yield

在方法中使用`yield`可以執行_Code block_參數：

```
# 定義方法
def call_block
  puts "Start"
  yield
  yield
  puts "End"
end

call_block { puts "Blocks are cool!" }
# 輸出
# "Start"
# "Blocks are cool!"
# "Blocks are cool!"
# "End"
```

### [](#帶有參數的code-block)帶有參數的_Code block_

```
def call_block
  yield(1)
  yield(2)
  yield(3)
end

call_block { |i|
  puts "#{i}: Blocks are cool!"
}
# 輸出
# "1: Blocks are cool!"
# "2: Blocks are cool!"
# "3: Blocks are cool!"
```

### [](#proc-object)Proc object

可以將_Code block_明確轉成一個變數：

```
def call_block(&block)
  block.call(1)
  block.call(2)
  block.call(3)
end

call_block { |i| puts "#{i}: Blocks are cool!" }

# 輸出
# "1: Blocks are cool!"
# "2: Blocks are cool!"
# "3: Blocks are cool!"

# 或是先宣告出 proc object (有三種寫法，大同小異)
proc_1 = Proc.new { |i| puts "#{i}: Blocks are cool!" }
proc_2 = lambda { |i| puts "#{i}: Blocks are cool!" }
proc_3 = -> (i) {  puts "#{i}: Blocks are cool!"  }

call_block(&proc_1)
call_block(&proc_2)
call_block(&proc_3)

# 分別輸出
# "1: Blocks are cool!"
# "2: Blocks are cool!"
# "3: Blocks are cool!"
```

## [](#傳遞不定參數)傳遞不定參數

```
def my_sum(*val)
  val.inject { |sum, v| sum + v }
end

puts my_sum(1, 2, 3, 4) # val 變數就是 [1, 2, 3, 4]
# 輸出 10
```

其中_my\_sum_方法中的`val`是一個包含所有參數的陣列。

## [](#參數尾巴的hash可以省略-)參數尾巴的_Hash_可以省略`{ }`

```
def my_print(a, b, options)
  puts a
  puts b
  puts options[:x]
  puts options[:y]
  puts options[:z]
end

my_print("A", "B", { :x => 123, :z => 456 } )
my_print("A", "B", :x => 123, :z => 456) # 結果相同
# 輸出 A
# 輸出 B
# 輸出 123
# 輸出 nil
# 輸出 456
```

## [](#例外處理)例外處理

使用_rescue_可以將例外救回來：

```
begin
  puts 10 / 0 # 這會丟出 ZeroDivisionError 的例外錯誤
rescue => e
  puts e.class # 如果發生例外會執行 rescue 這一段
ensure
  # 無論有沒有發生例外，ensure 這一段都一定會執行
end
# 輸出 ZeroDivisionError
```

使用_raise_可以手動觸發例外錯誤：

```
raise "Not works!!"
# 丟出一個 RuntimeError

# 自行自定例外物件
class MyException < RuntimeError
end

raise MyException
```

_Metaprogramming_是很進階的技巧，這裡示範`define_method`方法可以動態定義方法：

```
class Dragon
  define_method(:foo) { puts "bar" }

  ['a', 'b', 'c', 'd', 'e', 'f'].each do |x|
    define_method(x) { puts x }
  end
end

dragon = Dragon.new
dragon.foo # 輸出 bar
dragon.a # 輸出 a
dragon.f # 輸出 f
```

### [](#introspection反射機制)_Introspection_反射機制

_Ruby_擁有許多反射方法，可以動態知道物件的資訊：

```
# 這個物件有什麼方法
Object.methods
=> ["send", "name", "class_eval", "object_id", "new", "singleton_methods", ...]

# 這個物件有這個方法嗎？
Object.respond_to? :name
=> true
```

## [](#其他常見慣例)其他常見慣例

```
result ||= a
```

如果`result`是`nil`或`false`的話，將`a`指派給`result`，如果不是的話，什麼都不做。以上這段程式等同於

```
result || ( result = a )
```

## [](#ruby-應用)Ruby 應用

除了本書介紹的_Ruby on Rails_之外，_Ruby_也有各式各樣的應用，以下茲舉一些使用_Ruby_發展的專案：

-   [Sinatra](http://www.sinatrarb.com/)：輕量級的_Web_框架
-   網頁設計
    -   [Sass](http://sass-lang.com/)：CSS Pre-Processor
    -   [Less](http://lesscss.org/)：CSS Pre-Processor
    -   [Compass](http://compass-style.org/)：CSS 設計框架
    -   [Middleman](http://middlemanapp.com/): 靜態網站產生工具
    -   [Jekyll](http://jekyllrb.com/): 靜態網站和Blog產生工具
-   自動化測試
    -   [Cucumber](http://cukes.info/)：BDD 測試框架
    -   [Watir](http://watir.com/)：自動化瀏覽器測試工具
-   DevOps
    -   [Chef](https://www.getchef.com/)：伺服器部署工具
    -   [Puppet](http://puppetlabs.com/)：伺服器部署工具
    -   [Vagrant](https://www.vagrantup.com/)：虛擬機(VM)工具
-   iOS/Mac
    -   [CocoaPods](http://cocoapods.org/)：Objective-C 的套件管理工具
    -   [RubyMotion](http://www.rubymotion.com/) _是由_Objective-C_實作的_Ruby_，運作在_iOS_和_Mac OS X_作業系統上，也可以在_App Store\*上架。這個平台需要商業收費。
-   [Redmine](http://www.redmine.org/)：專案管理系統

你可以在_[The Ruby Toolbox](https://www.ruby-toolbox.com/)_和_[Awesome Ruby](http://awesome-ruby.com/)_找到更多推薦的_Ruby_套件和應用。

## [](#課程投影片)課程投影片

-   [Ruby 程式語言入門導覽](https://ihower.tw/rails/files/ihower-ruby-intro.pdf)
-   [Ruby 程式語言進階](https://ihower.tw/rails/files/ihower-ruby-advanced.pdf)

* * *
