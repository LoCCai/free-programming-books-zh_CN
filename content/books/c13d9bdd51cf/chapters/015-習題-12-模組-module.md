看看這段 code

<table><tbody><tr><td><pre><span>1</span>
<span>2</span>
<span>3</span>
<span>4</span>
<span>5</span>
<span>6</span>
<span>7</span>
<span>8</span>
<span>9</span>
<span>10</span>
</pre></td><td><pre><code><span><span>require</span> <span>'open-uri'</span>
</span><span>
</span><span><span>open</span><span>(</span><span>"http://www.ruby-lang.org/en"</span><span>)</span> <span>do</span> <span>|</span><span>f</span><span>|</span>
</span><span>  <span>f</span><span>.</span><span>each_line</span> <span>{</span><span>|</span><span>line</span><span>|</span> <span>p</span> <span>line</span><span>}</span>
</span><span>  <span>puts</span> <span>f</span><span>.</span><span>base_uri</span>         <span># &lt;URI::HTTP:0x40e6ef2 URL:http://www.ruby-lang.org/en/&gt;</span>
</span><span>  <span>puts</span> <span>f</span><span>.</span><span>content_type</span>     <span># "text/html"</span>
</span><span>  <span>puts</span> <span>f</span><span>.</span><span>charset</span>          <span># "iso-8859-1"</span>
</span><span>  <span>puts</span> <span>f</span><span>.</span><span>content_encoding</span> <span># []</span>
</span><span>  <span>puts</span> <span>f</span><span>.</span><span>last_modified</span>    <span># Thu Dec 05 02:45:02 UTC 2002</span>
</span><span><span>end</span>
</span></code></pre></td></tr></tbody></table>

在第一行是 require。這是一個 Ruby 中在你所寫的腳本中加入其他來源（如：Ruby Gems 或者是你寫的其他東西）的功能(features) 的方法。與其一次給你所有功能，Ruby 會問你你打算使用什麼。這可使你的程式保持輕薄，又可當做之後其他程式設計師閱讀你的程式時的參考。

## 等一下！功能 (Features) 還有另外一個名字

我在這裡稱呼他們為「功能(features)」。但實際上沒人這樣稱呼。我這樣做只是取了點巧，使你在學習時先不用理解「行話」。在繼續進行之前你得先知道它們的真名 `modules`（模組）。

從現在開始我們將把這些我們 require 進來的功能稱作 `modules`（模組）。我會這樣說：「你想要 require `open-uri` module。」也有人給它另外一個稱呼：「函式庫(libraries)」。但在這裡我們還是先叫它們 `modules` （模組）吧。

## 加分習題

1.  上網搜尋 `require` 與 `include` 的差異點。它們有什麼不同？
2.  你能 `require` 一段沒有特別包含 `module` 的腳本嗎？
3.  搞懂 Ruby 會去系統的哪裡找你 require 的 modules。
