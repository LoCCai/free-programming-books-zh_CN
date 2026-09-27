> “Life’s too short to build something nobody wants” - Ash Maurya, Running Lean 作者

_Ruby on Rails_是一套非常有生產力、維護性高、容易佈署的_Web_開發框架。從一開始不知名的玩具，到現在它已經成為全世界_Web_應用程式開發的首選框架之一。進入學習的旅程之前，我們先了解為什麼它如此特別？

## [](#什麼是網站開發框架web-framework)什麼是網站開發框架_(Web framework)_？

從_1990_年_Tim Berners-Lee_發明全球資訊網之後，就開始有了動態網頁的需求，早期最風行的方法是使用_Perl CGI_，會在_Perl_程式中，輸出_HTML_內容，例如以下是一個簡單的計數器：

```
#!/usr/bin/perl

open(FILE, "count.txt");
$num = <FILE>; $num++;
close (FILE);

open(WRITETO, ">count.txt");
print WRITETO "$num";
close (WRITETO);

print <<PRINTAREA;
content-type:text/html\n\n
<style>
<!--
body {background-color: black; line-height:1;
margin-top: 0cm;
margin-left: 0cm;
margin-right: 0cm}
-->
</style>
<body><center>
<b><font size=1 color=white>
$num</font></b>
PRINTAREA
```

讀者可以發現，這樣的方式在_HTML_內容佔多數的情況，顯著十分不容易維護及閱讀。大約在2000年左右，_PHP_、_ASP_等以樣板_(Template)_為主的程式語言出現了，同時期搭配著關聯式資料庫如_MySQL_一起流行起來。這種寫法與上述的_Perl CGI_恰巧相反，是在_HTML_樣板中內嵌入程式和_SQL_指令，例如以下是一個_PHP&MySQL_程式，其中用`<?php ... ?>`括起來的部份，就是_PHP_程式：

```
<?php
  $db = mysql_connect("localhost", "root", "password");
  mysql_query("SET NAMES 'utf8'");
  mysql_select_db($SERVER['db']);
?>
<html>
  <?php
    $sql="select * from news where Class='1' or Class='3' order by CTDate desc limit 0,5";
    $result= mysql_query($sql);
    while ( $arr=mysql_fetch_array($result) ) {
      echo <<<NEWSEND
        <div class="box">
          <span class="box-title-1"> <b>【$arr[Title]】</b> $arr[CTDate] </span>
          <div class="box-content">
            $arr[Text]
          </div>
        </div>
      NEWSEND;
    }
  ?>
</html>
```

這種用法非常容易使用。特別像是討論區、部落格_(Blog)_、內容管理系統_(CMS)_、_Wiki_這類系統，重點主要在資料的保存和顯示，牽扯的複雜商業邏輯不多，特別適合這樣的開發方式。程式只是資料庫系統的糖衣介面，不需要_MVC_架構、不需要頁面與程式邏輯分開、不需要物件導向技術，也可以開發的很好。

但是近年來隨著_Web 2.0_和雲端風潮帶來越來越多的_Web_應用程式開發需求，網站軟體的規模開始增加，需要加入更多的商業邏輯和功能，這樣的開發方式，導致了整個專案的結構變得十分混雜，不利於團隊合作開發。要接手維護這樣的網站，常常會不知道如何閱讀及修改起，因為所有的商務邏輯與_HTML_混雜在一起，不同人開發就有不同的程式架構，缺乏程式文件是常有的事情，也不容易進行測試。

於是我們有了_Web_開發框架的需求，引入完整的物件導向觀念和技術。而所謂的框架就是制定好了一套規範和慣例，讓開發者在該架構下來進行開發。

> 維基百科是這樣定義的：「軟體框架_(Software framework)_」是為了實現某個業界標準或完成特定基本任務的軟體組件規範，也指為了實現某個軟體組件規範時，提供規範所要求之基礎功能的軟體產品。框架的功能類似於基礎設施，與具體的軟體應用無關，但是提供並實現最為基礎的軟體架構和體系。軟體開發者通常依據特定的框架實現更為複雜的商業運用和業務邏輯。這樣的軟體應用可以在支持同一種框架的軟體系統中運行。

非常多的_Web_框架都實踐一個叫做_MVC_的軟體架構設計模式，將軟體分成三個部分：

-   _Model_物件包裝了資料與商業邏輯，例如操作資料庫
-   _View_表示使用者介面，顯示及編輯表單，可內嵌_Ruby_程式的_HTML_
-   _Controller_負責將資料送進送出_Model_，處理從外界(也就是瀏覽器)來的_HTTP Request_請求，與_Model_互動後輸出_View_(也就是_HTML_)

![image](https://ihower.tw/rails/images/intro-mvc-diagram.jpg)

這張圖示中的執行步驟是：

1.  瀏覽器發出_HTTP request_請求
2.  負責處理的_Controller_操作_Model_資料
3.  _Model_存取資料庫
4.  _Controller_將得到的資料餵給_View_樣板
5.  回傳最後的_HTML_成品給瀏覽器

透過_MVC_模式，我們可以有系統的組織程式碼，並且分離商業邏輯和使用者介面，讓前端與後端開發者可以獨立作業，也讓程式碼有著一致性的結構，檔案位置清楚，這些慣例_Web_框架都幫你想好了。有了程式規範，也就比較容易維護開發了。

> 也有不實踐_MVC_的小型_Web_框架，通常稱做_Micro-framework_，例如_[Sinatra](http://www.sinatrarb.com/)_，我們會在_Ruby_錦囊妙計一章中簡單介紹這個不同思維的_Web_開發框架。

> 桌面軟體的_MVC_和_Web MVC_有一些差異，主要是因為_Web MVC_中的_View_沒有辦法透過_Observer_模式來進行更新。有興趣的朋友可以參考_[Model View Controller: History, theory and usage](http://amix.dk/blog/post/19615)_這篇文章。

_Web_框架通常包括以下功能，

### [](#orm)ORM

ORM_(Object-relational mapping)_可以用物件導向語法來操作關聯式資料庫，容易使用、撰碼十分有效率，不需要撰寫繁瑣的_SQL_語法，也增加了程式碼維護性。例如：

```
SELECT * FROM orders, users WHERE orders.user_id = users.id AND orders.status = "Paid" LIMIT 5 ORDER BY orders.created_at;
```

這一段_SQL_敘述，在_Rails_中的語法是：

```
Order.where(:status => "paid").includes(:user).limit(5).order("created_at")
```

### [](#url路由)_URL_路由

不同於_PHP_直接使用檔案目錄結構來對應網址，例如網址是`/foo/bar`，就得有個檔案在`/foo/bar.php`下。這種一對一的方式雖然直覺，但是卻大大限制了程式架構和開發，網址也常常不漂亮，不利於_SEO(Search engine optimization)_。

使用_Web_框架則沒有這種問題，你擁有最大的彈性，您可以指定任意_URL_對應到任一個_Controller_的動作，跟檔案位置是無關的。

此外，_Web_框架也附帶了非常多開發_Web_會用到的函式庫，例如_Template_、_Email_、_Session_、快取、_JavaScript/Ajax_、測試等等。這也是為什麼使用_Web_框架可以大大加速網站專案的開發時程，因為開發_Web_應用程式會用到的功能大部分都內建了，我們不需要重複開發輪子。

## [](#什麼是ruby-on-rails)什麼是_Ruby on Rails_？

_Ruby on Rails_(官方簡稱為_Rails_，_RoR_非官方簡稱)是使用_Ruby_這套開放原始碼(採用_MIT_授權)、物件導向程式語言所開發的_Web_開發框架，主要用於開發資料庫網站應用程式。_Rails_是一套專業的開發框架，採用了_MVC(Model-View-Control)_模式、內建支援單元測試和整合測試、支援_Ajax_和_RESTful_介面、_ORM_機制，以及支援各種最新的業界標準像是_HTML5_、_JQuery_等等功能。它的發明人是_David Heinemeier Hanson(DHH)_，_DHH_是_2004_年將_Rails_從_[37signals](http://www.37signals.com/)_商業產品中獨立出來成為開源專案。

它的設計目標是只要開發者熟悉它的慣例，它就可以讓網站開發變的非常容易。而相對於其他程式語言和框架，_Rails_可以讓你用更少的程式碼達成更多的功能，它甚至讓網站開發變得更有趣。

_Rails_的哲學包括以下指導原則：

-   不要重複自己(_DRY: Don’t Repeat Yourself_) – 撰寫出重複的程式碼是件壞事
-   慣例勝於設定(_Convention Over Configuration_) – _Rails_會預設各種好的設定跟慣例，而不是要求你設定每一個細節到設定檔中。
-   _REST_是網站應用程式的最佳模式 – 使用_Resources_和標準的_HTTP verbs_(動詞)來組織你的應用程式是最快的方式(我們會在路徑一章詳細介紹這個強大的設計)

## [](#為何選擇rails)為何選擇_Rails_？

這是一個開發框架的時代，熟悉開發框架的人，可以很快的完成任務以及熟悉網站程式的架構。而各種程式語言要入門上手，其實都不會太困難。我認為重點會在於你不能夠熟悉做事情的框架。

所以，撇開程式語言的偏好，_Ruby on Rails_是目前網站開發框架中做前端(提供動態_HTML_給瀏覽器)應用伺服器最為成功和技術先進的。它的概念也深深影響了非常多其他程式語言的後進網站開發框架，例如_ASP.NET MVC_、_CakePHP_、_Grails_、_TurboGears_、_Pylons_、_web2py_、_catalyst_等等(模仿是最大的恭維)。我們可以用非常有效率的程式碼開發出網站應用程式。另外，可能會讓你感到意外的是，它也是目前動態語言中，生態圈最為豐富的網站開發框架，相關的書籍、研討會、顧問公司、第三方服務、外掛套件等等十分豐富。因為使用_Rails_的人數眾多，所以在開發上各個方向都有人提供了最佳實務，像是如何寫出好的程式碼、網站安全性、網站性能、擴充性、全文搜尋、非同步處理等等，這是一個非常活躍的社群。

當然，最重要的一個理由，就是採用_Rails_後生產力暴增：寫新的應用程式、增加新功能變成容易地多。讓你可以用更少程式碼做更多的事情，而且程式也更容易維護。當然，學習新工具總是需要時間投資的，一開始可能沒辦法立刻見效。但是如果你有長期的開發工作，而且網站有一定的複雜性，那麼一個短期學習_Ruby on Rails_的投資，長期來說將會是非常值得的。

## [](#rails-不是什麼)Rails 不是什麼

-   如上所述，_Rails_是一個打造網站應用程式的開發框架，如果你只需要靜態的_HTML_，那是絕不需要用到_Rails_的。
-   _Rails_不是_CMS(Content Management System)_內容管理系統。_CMS_是一套寫好的架站系統，可以讓你不需要寫程式就可以架站。市面上流行成熟的_CMS_系統多為_PHP_寫成，例如_Drupal_、_WordPress_等。當然也有用_Ruby_寫的，例如_Radiant_。如果這些架站系統剛好符合你的需求，那就不一定需要_Rails_。
-   _Rails_是一套網站開發框架幫助你建立網站應用程式，它不是程式語言。

## [](#什麼是ruby)什麼是_Ruby_？

_Rails_是一套使用_Ruby_開發的網站框架。如果您對_Ruby_一無所知就一頭栽進_Rails_，恐怕不是個好主意。

_Ruby_是一套開放原碼、物件導向的動態直譯式_(interpreted)_程式語言，它有著簡單哲學、高生產力、精巧、自然的語法。他的創造者是來自日本的松本行弘(又名_Matz_)，設計的靈感來自於_Lisp_、_Perl_和_Smalltalk_，設計的目的是要讓程式設計師能夠快樂地寫程式。

讓我們看一個非常簡單的範例：

```
str = "May Ruby be with you!"
5.times { puts str }
```

這的範例就簡單告訴我們有關_Ruby_的三件事情了：

-   動態分型_(typing)_，不需要宣告型態
-   每樣東西都是物件，包括數字
-   使用_Code Block_形式的匿名函式_(anonymous function)_隨處可見

我們會在_Ruby_一章介紹基本的語法，讓各位讀者可以很快的入門。

## [](#動態語言的好處)動態語言的好處

為什麼開發伺服器端應用程式，使用動態語言(_Ruby_、_Python_、_PHP_、_Perl_等)比起靜態語言(_Java_、_C++_等)有更好的優勢呢？

> 靜態語言和動態語言的差別在於，前者的變數型別需要事前宣告，後者則是執行期才動態決定。實務上，就看程式需不需要事前編譯這個動作了。

著名的”人月神話”一書作者_Fred Brooks_曾說：「一個程式設計師一天能產生的程式碼行數是差不多的，無論什麼程式語言」。因此一個具有表達能力的高階程式語言，就會比低階的程式語言能完成更多功能。相較於靜態程式語言，使用更高階的動態腳本語言可以幫助我們：

1.  用更少程式碼做更多事情，大大增加生產力
2.  更快因應客戶開發需求，敏捷開發

不過，動態語言也不是沒有缺點：

1.  執行效能是絕對比不上靜態語言的
2.  沒有編譯期可以檢查型別錯誤

但是，我們知道現在的電腦越來越快、越來越便宜、上網越來越容易、記憶體越來越多、硬碟越來越大。另外，行動裝置也越來越多，需要搭配的網路服務需求也增加了。這些趨勢告訴我們有更多的軟體的需求，另一方面由於硬體效能的增強，人力開發成本比起軟體的執行期的效能，也越來越重要。同樣一個程式，用動態語言執行的效能已經可以達到實用(例如每秒可以處理_50~500_個的_HTTP_請求，也可以透過增加伺服器來擴展架構)，也許用靜態語言後的執行速度可以再快一倍，但是卻需要十倍以上的時間來開發，這件事情是不是值得呢？

> 在硬體資源有限的行動裝置及嵌入式系統上，仍是靜態語言的天下，這一點需要更多時間才有動態語言的生存空間。

沒有編譯期可以檢查型別錯誤的問題，也隨著單元測試和_TDD(Test-driven development)_測試驅動開發等敏捷最佳實務而逐漸降低重要性。而大部分的_Bug_會出自於商業邏輯錯誤，而不是型別錯誤上。

## [](#為何選擇ruby)為何選擇_Ruby_？

Ruby 是一套非常重視使用性(_Usability_)的物件導向程式語言，非常看重程式碼的可讀性及維護性。_Matz_在設計_Ruby_時，就特別考量一般人容不容易了解(他說我們都是凡人，像_Lisp_是給神人用的)。這也是為什麼你常常會聽到_Ruby_的程式碼自然簡潔又漂亮。您可以看看這份 _Ruby_創造者_Matz_的[_Why Ruby?_投影片](https://ihower.tw/rails/files/whyruby-matz-rubyconfchina.pdf)或是_Matz_的演講:_[RubyConf 2008](http://rubyconf2008.confreaks.com/matzs-keynote.html)_、_[RubyConf 2009](http://confreaks.net/videos/159-rubyconf2009-keynote-address)_、_[Mountain West Ruby Conference 2010](http://confreaks.net/videos/11-mwrc2010-ruby124c41)_，相信您會更了解及喜愛_Ruby_的哲學。

_Ruby_也是目前做_Domain-specific language(DSL)_，特別是_Internal DSL_最為成功的程式語言。透過_DSL_，程式不但可以擁有非常好的可讀性，也可以大幅增加生產力。成功的_DSL_函式庫例如有：_Rake_建構工具、_RSpec_測試工具、_Chef_伺服器設定工具、_Cucumber_驗收測試等。這些函式庫正積極地影響我們對軟體開發的想法。我們相信，還會有更多更有趣的_DSL_函式庫出現。

* * *
