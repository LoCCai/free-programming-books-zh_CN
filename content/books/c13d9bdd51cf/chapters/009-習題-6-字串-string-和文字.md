雖然你已經在程式中寫過字串了，你還沒學過它們的用處。在這章習題中我們將使用複雜的字串來建立一系列的變數，從中你將學到它們的用途。首先我們解釋一下字串是什麼東西。

字串通常是指你想要展示給別人的，或者是你想要從程式裡「導出」的一小段字符。Ruby 可以通過文字裡的雙引號 `"` 或者是單引號 `'` 識別出字串來。這在你以前的 `puts`練習中你已經見過很多次了。如果你把單引號或者雙引號括起來的文字放到 `puts` 後面，他們就會被 Ruby 印出來。

字串可以包含你目前學過的格式化字串。你只要將格式化的變數放到字串中，跟著一個百分比符號 `%` (percent)，再緊跟著變數名稱即可。唯一要注意的地方，是如果你想要在字串中通過格式化字串放入多個變數的結果，你需要將變數放到 `[]` 中括號(brackets) 中，而且變數之間用 `,` 逗號(comma)隔開。就像你逛商店時說「我要買牛奶、麵包、雞蛋、湯」一樣，只不過程式設計師說的是”\[milk, eggs, bread, soup\]”。

另一種方式是使用字串插值 (string interpolation) 這種技巧，將變數注入到你的字串中。方法是使用 `#{}` 井號和大括號(pound and curly brace)。與其使用這種格式化字串

<table><tbody><tr><td><pre><span>1</span>
<span>2</span>
<span>3</span>
</pre></td><td><pre><code><span><span>name1</span> <span>=</span> <span>"Joe"</span>
</span><span><span>name2</span> <span>=</span> <span>"Mary"</span>
</span><span><span>puts</span> <span>"Hello %s, where is %s?"</span> <span>%</span> <span>[</span><span>name1</span><span>,</span> <span>name2</span><span>]</span>
</span></code></pre></td></tr></tbody></table>

我們可以鍵入：

<table><tbody><tr><td><pre><span>1</span>
<span>2</span>
<span>3</span>
</pre></td><td><pre><code><span><span>name1</span> <span>=</span> <span>"Joe"</span>
</span><span><span>name2</span> <span>=</span> <span>"Mary"</span>
</span><span><span>puts</span> <span>"Hello </span><span>#{</span><span>name1</span><span>}</span><span>, where is </span><span>#{</span><span>name2</span><span>}</span><span>?"</span>
</span></code></pre></td></tr></tbody></table>

我們將鍵入大量的字串、變數和格式化字串，並且將它們印出來。我們還將練習使用簡寫的變數名稱。程式設計師喜歡使用惱人的隱晦簡寫來節省打字時間，所以我們現在就將提早學會這件事，這樣你就能讀懂並寫出這些東西了。

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
</pre></td><td><pre><code><span><span>x</span> <span>=</span> <span>"There are </span><span>#{</span><span>10</span><span>}</span><span> types of people."</span>
</span><span><span>binary</span> <span>=</span> <span>"binary"</span>
</span><span><span>do_not</span> <span>=</span> <span>"don't"</span>
</span><span><span>y</span> <span>=</span> <span>"Those who know </span><span>#{</span><span>binary</span><span>}</span><span> and those who </span><span>#{</span><span>do_not</span><span>}</span><span>."</span>
</span><span>
</span><span><span>puts</span> <span>x</span>
</span><span><span>puts</span> <span>y</span>
</span><span>
</span><span><span>puts</span> <span>"I said: </span><span>#{</span><span>x</span><span>}</span><span>."</span>
</span><span><span>puts</span> <span>"I also said: '</span><span>#{</span><span>y</span><span>}</span><span>'."</span>
</span><span>
</span><span><span>hilarious</span> <span>=</span> <span>false</span>
</span><span><span>joke_evaluation</span> <span>=</span> <span>"Isn't that joke so funny?! </span><span>#{</span><span>hilarious</span><span>}</span><span>"</span>
</span><span>
</span><span><span>puts</span> <span>joke_evaluation</span>
</span><span>
</span><span><span>w</span> <span>=</span> <span>"This is the left side of..."</span>
</span><span><span>e</span> <span>=</span> <span>"a string with a right side."</span>
</span><span>
</span><span><span>puts</span> <span>w</span> <span>+</span> <span>e</span>
</span></code></pre></td></tr></tbody></table>

你應該看到的結果

```
There are 10 types of people.
Those who know binary and those who don't.
I said: There are 10 types of people..
I also said: 'Those who know binary and those who don't.'.
Isn't that joke so funny?! false
This is the left side of...a string with a right side.
```

## 加分習題

1.  遍歷程式，在每一行的上面寫一行註釋，給自己解釋這一行的作用。
2.  找到所有的「字串包含字串」的位置，總共有四個位置。
3.  你確定只有四個位置嗎？你怎麼知道的？說不定我在騙你呢。
4.  解釋一下為什麼 `w` 和 `e` 用 `+` 連起來就可以生成一個更長的字串。
