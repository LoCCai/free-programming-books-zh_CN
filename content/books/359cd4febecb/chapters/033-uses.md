## @uses

`@uses` 标注用来指明那些将会在测试中执行到但同时又不打算让其被测试所覆盖的代码。在对代码单元进行测试时所必须的值对象就是个很好的例子。

```
/**
 * @covers BankAccount::deposit
 * @uses   Money
 */
public function testMoneyCanBeDepositedInAccount()
{
    // ...
}
```

在严格覆盖模式中，意外覆盖的代码将导致测试判定为失败，这个标注就显得特别有用。关于严格覆盖模式的更多信息，参见[the section called “意外的代码覆盖”](#)。
