* * *

type: doc layout: reference category: "Syntax"

## title: "This 表达式"

为了表示当前的 _接收者_ 我们使用 _**`this`**_ 表达式：

-   在[类](https://hltj.gitbooks.io/kotlin-reference-chinese/content/txt/classes.html#%E7%BB%A7%E6%89%BF)的成员中，_**`this`**_ 指的是该类的当前对象。
-   在[扩展函数](https://hltj.gitbooks.io/kotlin-reference-chinese/content/txt/extensions.html)或者[带有接收者的函数字面值](https://hltj.gitbooks.io/kotlin-reference-chinese/content/txt/lambdas.html#%E5%B8%A6%E6%9C%89%E6%8E%A5%E6%94%B6%E8%80%85%E7%9A%84%E5%87%BD%E6%95%B0%E5%AD%97%E9%9D%A2%E5%80%BC)中， _**`this`**_ 表示在点左侧传递的 _接收者_ 参数。

如果 _**`this`**_ 没有限定符，它指的是最内层的包含它的作用域。要引用其他作用域中的 _**`this`**_，请使用 _标签限定符_：

## 限定的 _**`this`**_

要访问来自外部作用域的_**`this`**_（一个[类](https://hltj.gitbooks.io/kotlin-reference-chinese/content/txt/classes.html) 或者[扩展函数](https://hltj.gitbooks.io/kotlin-reference-chinese/content/txt/extensions.html)， 或者带标签的[带有接收者的函数字面值](https://hltj.gitbooks.io/kotlin-reference-chinese/content/txt/lambdas.html#%E5%B8%A6%E6%9C%89%E6%8E%A5%E6%94%B6%E8%80%85%E7%9A%84%E5%87%BD%E6%95%B0%E5%AD%97%E9%9D%A2%E5%80%BC)）我们使用`this@label`，其中 `@label` 是一个代指 _**`this`**_ 来源的标签：

```
class A { // 隐式标签 @A
    inner class B { // 隐式标签 @B
        fun Int.foo() { // 隐式标签 @foo
            val a = this@A // A 的 this
            val b = this@B // B 的 this

            val c = this // foo() 的接收者，一个 Int
            val c1 = this@foo // foo() 的接收者，一个 Int

            val funLit = lambda@ fun String.() {
                val d = this // funLit 的接收者
            }


            val funLit2 = { s: String ->
                // foo() 的接收者，因为它包含的 lambda 表达式
                // 没有任何接收者
                val d1 = this
            }
        }
    }
}
```

## No results matching ""
