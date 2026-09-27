## [](#part-2-關於-model)Part 2: 關於 Model

## [](#10-善用-module-抽取相關代碼)10\. 善用 Module 抽取相關代碼

情境：如果將代碼從 Controller 重構到 Model 做得不錯了，接下來如何進一步重構 Model 代碼？

重構前：在 Model 中有一些高度相關的代碼，希望能夠更清楚他們是一起的，或是希望能在不同 Model 中也能重復使用。

```
class User < ActiveRecord::Base

  validates_presence_of :cellphone
  before_save :parse_cellphone

  def parse_cellphone
    # do something
  end

  def self.foobar
    # do something
  end

end
```

重構後：善用 Ruby 的 module 語法，可以將這些相關代碼抽取出來，放在 `app/models/concerns` 目錄下，包括 model 的 validates 宣告、回呼宣告、關聯宣告、物件方法、類方法等等都可抽取出來。

```
module HasCellphone

  def self.included(base)
    base.validates_presence_of :cellphone
    base.before_save :parse_cellphone
    base.extend ClassMethods
  end

  def parse_cellphone
    # do something
  end

  module ClassMethods
    def foobar
      # do something
    end
  end

end
```

或是使用 [Rails ActiveSupport::Concern](http://api.rubyonrails.org/v5.1/classes/ActiveSupport/Concern.html) 語法，可以更簡潔一點：

```
module HasCellphone
  extend ActiveSupport::Concern

  included do
    validates_presence_of :cellphone
    before_save :parse_cellphone
  end

  def parse_cellphone
    # do something
  end

  class_methods do
    def foobar
      # do something
    end
  end

end
```

最後在 model 裡面 include 即可。

```
class User < ActiveRecord::Base
  include HasCellphone
end

```

其他 model 也可以沿用這段代碼，只要 include 即可：

```
class Contact < ActiveRecord::Base
  include HasCellphone
end
```

這一招其實 controller 也可以用，在 rails 中 `app/controllers/concerns` 目錄就是拿來放 controller 的 module 檔案。

* * *
