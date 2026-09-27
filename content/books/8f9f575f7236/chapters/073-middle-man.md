### Signs and Symptoms

If a class performs only one action, delegating work to another class, why does it exist at all?

![](https://refactoringguru.cn/images/refactoring/content/smells/middle-man-01.png?id=14c65845c4e0cf03e7e9e48108090c98)

### Reasons for the Problem

This smell can be the result of overzealous elimination of [Message Chains](https://refactoringguru.cn/smells/message-chains).

In other cases, it can be the result of the useful work of a class being gradually moved to other classes. The class remains as an empty shell that doesn't do anything other than delegate.

### Treatment

-   If most of a method's classes delegate to another class, [Remove Middle Man](https://refactoringguru.cn/remove-middle-man) is in order.

### Payoff

-   Less bulky code.

![](https://refactoringguru.cn/images/refactoring/content/smells/middle-man-02.png?id=f507c0fd9a7bde8df8c22b9027d0a404)

### When to Ignore

Don't delete middle man that have been created for a reason:

-   A middle man may have been added to avoid interclass dependencies.
    
-   Some design patterns create middle man on purpose (such as [Proxy](https://refactoringguru.cn/design-patterns/proxy) or [Decorator](https://refactoringguru.cn/design-patterns/decorator)).
