[](https://refactoringguru.cn/)/ [Refactoring](https://refactoringguru.cn/refactoring) / [Code Smells](https://refactoringguru.cn/refactoring/smells)

All the smells in this group contribute to excessive coupling between classes or show what happens if coupling is replaced by excessive delegation.

[Feature Envy](https://refactoringguru.cn/smells/feature-envy)

A method accesses the data of another object more than its own data.

[Inappropriate Intimacy](https://refactoringguru.cn/smells/inappropriate-intimacy)

One class uses the internal fields and methods of another class.

[Message Chains](https://refactoringguru.cn/smells/message-chains)

In code you see a series of calls resembling `$a->b()->c()->d()`

[Middle Man](https://refactoringguru.cn/smells/middle-man)

If a class performs only one action, delegating work to another class, why does it exist at all?
