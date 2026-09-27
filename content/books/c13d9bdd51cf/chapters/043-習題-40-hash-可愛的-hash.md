接下來我要教你另外一種讓你傷腦筋的容器型資料結構，因為一旦你學會這種資料結構，你將擁有超酷的能力。這是最有用的容器：Hash。

Ruby 將這種資料類型叫做「Hash」，有的語言裡它的名稱是「dictionaries」。這兩種名字我都會用到，不過這並不重要，重要的是它們和陣列的區別。你看，針對陣列你可以做這樣的事情：

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
<span>11</span>
</pre></td><td><pre><code><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>015</span> <span>&gt;</span> <span>things</span> <span>=</span> <span>[</span><span>'a'</span><span>,</span><span>'b'</span><span>,</span><span>'c'</span><span>,</span><span>'d'</span><span>]</span>
</span><span> <span>=&gt;</span> <span>[</span><span>"a"</span><span>,</span> <span>"b"</span><span>,</span> <span>"c"</span><span>,</span> <span>"d"</span><span>]</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>016</span> <span>&gt;</span> <span>print</span> <span>things</span><span>[</span><span>1</span><span>]</span>
</span><span><span>b</span> <span>=&gt;</span> <span>nil</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>017</span> <span>&gt;</span> <span>things</span><span>[</span><span>1</span><span>]</span> <span>=</span> <span>'z'</span>
</span><span> <span>=&gt;</span> <span>"z"</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>01</span><span>8</span> <span>&gt;</span> <span>print</span> <span>things</span><span>[</span><span>1</span><span>]</span>
</span><span><span>z</span> <span>=&gt;</span> <span>nil</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>01</span><span>9</span> <span>&gt;</span> <span>print</span> <span>things</span>
</span><span><span>[</span><span>"a"</span><span>,</span> <span>"z"</span><span>,</span> <span>"c"</span><span>,</span> <span>"d"</span><span>]</span> <span>=&gt;</span> <span>nil</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>020</span> <span>&gt;</span>
</span></code></pre></td></tr></tbody></table>

你可以使用數字作為陣列的「索引」，也就是你可以通過數字找到陣列中的元素。而 Hash 所作的，是讓你可以通過任何東西找到元素，不只是數字。是的，Hash 可以將一個物件和另外一個東西關聯，不管它們的類型是什麼，我們來看看：

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
<span>11</span>
<span>12</span>
<span>13</span>
<span>14</span>
<span>15</span>
<span>16</span>
<span>17</span>
</pre></td><td><pre><code><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>001</span> <span>&gt;</span> <span>stuff</span> <span>=</span> <span>{</span><span>:name</span> <span>=&gt;</span> <span>"Rob"</span><span>,</span> <span>:age</span> <span>=&gt;</span> <span>30</span><span>,</span> <span>:height</span> <span>=&gt;</span> <span>5</span><span>*</span><span>12</span><span>+</span><span>10</span><span>}</span>
</span><span> <span>=&gt;</span> <span>{</span><span>:name</span><span>=&gt;</span><span>"Rob"</span><span>,</span> <span>:age</span><span>=&gt;</span><span>30</span><span>,</span> <span>:height</span><span>=&gt;</span><span>70</span><span>}</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>002</span> <span>&gt;</span> <span>puts</span> <span>stuff</span><span>[</span><span>:name</span><span>]</span>
</span><span><span>Rob</span>
</span><span> <span>=&gt;</span> <span>nil</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>003</span> <span>&gt;</span> <span>puts</span> <span>stuff</span><span>[</span><span>:age</span><span>]</span>
</span><span><span>30</span>
</span><span> <span>=&gt;</span> <span>nil</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>004</span> <span>&gt;</span> <span>puts</span> <span>stuff</span><span>[</span><span>:height</span><span>]</span>
</span><span><span>70</span>
</span><span> <span>=&gt;</span> <span>nil</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>005</span> <span>&gt;</span> <span>stuff</span><span>[</span><span>:city</span><span>]</span> <span>=</span> <span>"New York"</span>
</span><span> <span>=&gt;</span> <span>"New York"</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>006</span> <span>&gt;</span> <span>puts</span> <span>stuff</span><span>[</span><span>:city</span><span>]</span>
</span><span><span>New</span> <span>York</span>
</span><span> <span>=&gt;</span> <span>nil</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>007</span> <span>&gt;</span>
</span></code></pre></td></tr></tbody></table>

你將看到除了通過數字以外，我們在 Ruby 還可以用字串來從 Hash 中獲取 `stuff`，我們還可以用字串來往 Hash 中添加元素。當然它支持的不只有字串，我們還可以做這樣的事情：

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
<span>11</span>
<span>12</span>
<span>13</span>
<span>14</span>
</pre></td><td><pre><code><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>004</span> <span>&gt;</span> <span>stuff</span><span>[</span><span>1</span><span>]</span> <span>=</span> <span>"Wow"</span>
</span><span> <span>=&gt;</span> <span>"Wow"</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>005</span> <span>&gt;</span> <span>stuff</span><span>[</span><span>2</span><span>]</span> <span>=</span> <span>"Neato"</span>
</span><span> <span>=&gt;</span> <span>"Neato"</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>006</span> <span>&gt;</span> <span>puts</span> <span>stuff</span><span>[</span><span>1</span><span>]</span>
</span><span><span>Wow</span>
</span><span> <span>=&gt;</span> <span>nil</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>007</span> <span>&gt;</span> <span>puts</span> <span>stuff</span><span>[</span><span>2</span><span>]</span>
</span><span><span>Neato</span>
</span><span> <span>=&gt;</span> <span>nil</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>00</span><span>8</span> <span>&gt;</span> <span>puts</span> <span>stuff</span>
</span><span><span>{</span><span>:name</span><span>=&gt;</span><span>"Rob"</span><span>,</span> <span>:age</span><span>=&gt;</span><span>30</span><span>,</span> <span>:height</span><span>=&gt;</span><span>70</span><span>,</span> <span>:city</span><span>=&gt;</span><span>"New York"</span><span>,</span> <span>1</span><span>=&gt;</span><span>"Wow"</span><span>,</span> <span>2</span><span>=&gt;</span><span>"Neato"</span><span>}</span>
</span><span> <span>=&gt;</span> <span>nil</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>00</span><span>9</span> <span>&gt;</span>
</span></code></pre></td></tr></tbody></table>

在這裡我使用了數字。其實我可以使用任何東西，不過這麼說並不准確，不過你先這麼理解就行了。

當然了，一個只能放東西進去的 Hash是沒啥意思的，所以我們還要有刪除物件的方法，也就是使用 `delete` 這個關鍵字：

<table><tbody><tr><td><pre><span>1</span>
<span>2</span>
<span>3</span>
<span>4</span>
<span>5</span>
<span>6</span>
<span>7</span>
<span>8</span>
<span>9</span>
</pre></td><td><pre><code><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>00</span><span>9</span> <span>&gt;</span> <span>stuff</span><span>.</span><span>delete</span><span>(</span><span>:city</span><span>)</span>
</span><span> <span>=&gt;</span> <span>"New York"</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>010</span> <span>&gt;</span> <span>stuff</span><span>.</span><span>delete</span><span>(</span><span>1</span><span>)</span>
</span><span> <span>=&gt;</span> <span>"Wow"</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>011</span> <span>&gt;</span> <span>stuff</span><span>.</span><span>delete</span><span>(</span><span>2</span><span>)</span>
</span><span> <span>=&gt;</span> <span>"Neato"</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>012</span> <span>&gt;</span> <span>stuff</span>
</span><span> <span>=&gt;</span> <span>{</span><span>:name</span><span>=&gt;</span><span>"Rob"</span><span>,</span> <span>:age</span><span>=&gt;</span><span>30</span><span>,</span> <span>:height</span><span>=&gt;</span><span>70</span><span>}</span>
</span><span><span>ruby</span><span>-</span><span>1</span><span>.</span><span>9</span><span>.</span><span>2</span><span>-</span><span>p180</span> <span>:</span><span>013</span> <span>&gt;</span>
</span></code></pre></td></tr></tbody></table>

接下來我們要做一個練習，你必須「非常」仔細，我要求你將這個練習寫下來，然後試著弄懂它做了些什麼。這個練習很有趣，做完以後你可能會有豁然開朗的感覺。

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
<span>11</span>
<span>12</span>
<span>13</span>
<span>14</span>
<span>15</span>
<span>16</span>
<span>17</span>
<span>18</span>
<span>19</span>
<span>20</span>
<span>21</span>
<span>22</span>
<span>23</span>
<span>24</span>
<span>25</span>
<span>26</span>
<span>27</span>
</pre></td><td><pre><code><span><span>cities</span> <span>=</span> <span>{</span><span>'CA'</span> <span>=&gt;</span> <span>'San Francisco'</span><span>,</span>
</span><span>  <span>'MI'</span> <span>=&gt;</span> <span>'Detroit'</span><span>,</span>
</span><span>  <span>'FL'</span> <span>=&gt;</span> <span>'Jacksonville'</span><span>}</span>
</span><span>
</span><span><span>cities</span><span>[</span><span>'NY'</span><span>]</span> <span>=</span> <span>'New York'</span>
</span><span><span>cities</span><span>[</span><span>'OR'</span><span>]</span> <span>=</span> <span>'Portland'</span>
</span><span>
</span><span><span>def</span> <span>find_city</span><span>(</span><span>map</span><span>,</span> <span>state</span><span>)</span>
</span><span>  <span>if</span> <span>map</span><span>.</span><span>include?</span> <span>state</span>
</span><span>    <span>return</span> <span>map</span><span>[</span><span>state</span><span>]</span>
</span><span>  <span>else</span>
</span><span>    <span>return</span> <span>"Not found."</span>
</span><span>  <span>end</span>
</span><span><span>end</span>
</span><span>
</span><span><span># ok pay attention!</span>
</span><span><span>cities</span><span>[</span><span>:find</span><span>]</span> <span>=</span> <span>method</span><span>(</span><span>:find_city</span><span>)</span>
</span><span>
</span><span><span>while</span> <span>true</span>
</span><span>  <span>print</span> <span>"State? (ENTER to quit) "</span>
</span><span>  <span>state</span> <span>=</span> <span>gets</span><span>.</span><span>chomp</span>
</span><span>
</span><span>  <span>break</span> <span>if</span> <span>state</span><span>.</span><span>empty?</span>
</span><span>
</span><span>  <span># this line is the most important ever! study!</span>
</span><span>  <span>puts</span> <span>cities</span><span>[</span><span>:find</span><span>].</span><span>call</span><span>(</span><span>cities</span><span>,</span> <span>state</span><span>)</span>
</span><span><span>end</span>
</span></code></pre></td></tr></tbody></table>

## 你應該看到的結果

```
$ ruby ex40.rb 
State? (ENTER to quit) > CA
San Francisco
State? (ENTER to quit) > FL
Jacksonville
State? (ENTER to quit) > O
Not found.
State? (ENTER to quit) > OR
Portland
State? (ENTER to quit) > VT
Not found.
State? (ENTER to quit) >
```

## 加分習題

1.  在 Ruby 文件中找到 Hash 相關的內容，學著對 Hash 做更多的操作。
2.  找出一些 Hash 無法做到的事情。例如比較重要的一個就是 Hash 的內容是無序的，你可以檢查一下看看是否真是這樣。
3.  試著把 `for` 迴圈執行到 Hash 上面，然後試著在 `for` 迴圈中使用 Hash 的 each 函式，看看會有什麼樣的結果。
