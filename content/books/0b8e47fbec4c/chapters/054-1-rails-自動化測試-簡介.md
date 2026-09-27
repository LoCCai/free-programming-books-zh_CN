撰寫自動化測試是晉升專業開發者的必備技能。這堂課會用實際的案例，教大家怎麽利用這個技巧來幫助開發。

-   閏年程序
-   停車計費應用
-   Web API 自動化測試

## [](#一個簡單的閏年程序)一個簡單的閏年程序

## [](#1-1-閏年程序第一版)1-1 閏年程序(第一版)

所謂的自動化測試，就是用程序去測試程序，聽起來好像有點玄妙。讓我們用一個簡單的題目來舉例：

請寫一個方法判斷閏年，閏年的規則是這樣的：

-   西元年分除以400可整除，為閏年。
-   西元年分除以4可整除但除以100不可整除，為閏年。
-   西元年分除以4不可整除，為平年。
-   西元年分除以100可整除但除以400不可整除，為平年

我們來寫程序吧，請新增一個檔案 `leap_year.rb`，內容如下：

```
def is_leap_year?(year)
  if year % 4 == 0
    return true
  else
    return false
  end

  # 同學們可能會發現這不是正確的版本，讓我們繼續做下去
end
```

接下來你怎麽知道這個方法對不對呢? 讓我們試試看：

執行 `irb`，輸入：

```
require_relative './leap_year'
is_leap_year?(2016)   # => 應該得到 true
is_leap_year?(2017)   # => 應該得到 false

```

好像對了嗎? 讓我們想想想，好像應該再測測看 2100 年，照規格應該是平年才對。

```
is_leap_year?(2100)   # => 得到 true，但是應該要 false 才對

```

果然寫錯了，讓我們回去修 bug…

離開`irb`，請輸入 `exit`。

## [](#1-2-閏年程序第二版)1-2 閏年程序(第二版)

修改 `leap_year.rb`，改寫成：

```
def is_leap_year?(year)
  if year % 4 == 0
    if year % 100 == 0
      return false
    else
      return true
    end
  else
    return false
  end
end
```

再進來`irb`測測看，執行 `irb`：

```
require_relative './leap_year'
is_leap_year?(2016)   # => 應該得到 true
is_leap_year?(2017)   # => 應該得到 false
is_leap_year?(2100)   # => 應該得到 false 了
```

看起來好像都對了嗎? 我們可能會再多輸入幾個年份試試看。

但我相信這樣往返檢查程序是否正確的過程，大家一定不陌生。

而自動化測試想要做的事情，就是去自動化這個過程。

## [](#1-3-使用-rspec-自動化測試)1-3 使用 RSpec 自動化測試

首先請各位安裝 Rspec，這是一個自動化測試的框架。輸入：

`gem install rspec`

新增一個檔案 `.rspec`，內容如下：

```
--format documentation
--color
```

接著新增一個檔案 `leap_year_spec.rb`：

```
require_relative './leap_year'

describe "Leap Year" do
  it "2016 is leap year" do
    result = is_leap_year?(2016)  # 把 2016 傳進去
    expect(result).to eq(true)    # 檢查結果應該要是 true
  end

  it "2017 is common year" do
    result = is_leap_year?(2017)  # 把 2017 傳進去
    expect(result).to eq(false)   # 檢查結果應該要是 false
  end

  it "2100 is common year" do
    result = is_leap_year?(2100)  # 把 2100 傳進去
    expect(result).to eq(false)   # 檢查結果應該要是 false
  end

  it "2400 is leap year" do
    result = is_leap_year?(2400)  # 把 2400 傳進去
    expect(result).to eq(true)    # 檢查結果應該要是 true
  end

end

```

其中每一個 `it` 包起來的就是一個要測試的案例，我們會在裡面用 `expect` 方法去檢查結果是否如我們所預期。

這裡除了剛剛測試的 2016、2017、2100 案例之外，我們還多補了一個檢查 2400 年，這應該是潤年。

執行 `rspec leap_year_spec.rb` 就會自動測試這四個測試案例(test example)。

![image](https://ihower.tw/rails/part2/04-testing/images/1-1.png)

紅字表示測試沒有通過了(這很正常，代表我們發現還有 bug)，它指出 2400 年的檢查結果不正確。

### [](#1-4-閏年程序完成版)1-4 閏年程序(完成版)

讓我們回去繼續改程序，改寫成如下版本：

```
def is_leap_year?(year)
  if year % 4 == 0
    if year % 100 == 0
      if year % 400 == 0
        return true
      else
        return false
      end
    else
      return true
    end
  else
    return false
  end
end

```

再執行一次`rspec leap_year_spec.rb`，出現：

![image](https://ihower.tw/rails/part2/04-testing/images/1-2.png)

一片綠字就表示測試通過了，這四個測試案例都通過，我們不需要進`irb`檢查了，這個 RSpec 測試程序就幫我們檢查好了。

如果你還不放心閏年程序是不是都正確了，也可以繼續加更多測試案例進來檢查。就判斷閏年來說，用這四個測試資料就是關鍵的測試案例了。

## [](#1-5-重構閏年程序最終版)1-5 重構閏年程序(最終版)

最後，我們覺得那段源碼有點醜，我們想要重構一下，重構意思是在不影響功能的情況下讓代碼變得更漂亮，例如上述的邏輯可以改成這樣：

```
def is_leap_year?(y)
  y % 400 == 0 || ( y % 4 == 0 && y % 100 != 0)
end

```

但是怎麽確認改成這樣，結果還是正確的呢?

只要再執行一次 `rspec leap_year_spec.rb` 觀察測試結果通過就知道了。

![image](https://ihower.tw/rails/part2/04-testing/images/1-2.png)

自動化測試提供了重構的安全網。

* * *
