### Signs and Symptoms

One class uses the internal fields and methods of another class.

![](https://refactoringguru.cn/images/refactoring/content/smells/inappropriate-intimacy-01.png?id=31bf185f4ff946f13e28d27d377a4b6c)

### Reasons for the Problem

Keep a close eye on classes that spend too much time together. Good classes should know as little about each other as possible. Such classes are easier to maintain and reuse.

### Treatment

-   The simplest solution is to use [Move Method](https://refactoringguru.cn/move-method) and [Move Field](https://refactoringguru.cn/move-field) to move parts of one class to the class in which those parts are used. But this works only if the first class truly doesn't need these parts.
    
    ![](https://refactoringguru.cn/images/refactoring/content/smells/inappropriate-intimacy-02.png?id=3f23c8df6eb8cf91b46e39fa912ff85c)
    
-   Another solution is to use [Extract Class](https://refactoringguru.cn/extract-class) and [Hide Delegate](https://refactoringguru.cn/hide-delegate) on the class to make the code relations "official".
    
-   If the classes are mutually interdependent, you should use [Change Bidirectional Association to Unidirectional](https://refactoringguru.cn/change-bidirectional-association-to-unidirectional).
    
-   If this "intimacy" is between a subclass and the superclass, consider [Replace Delegation with Inheritance](https://refactoringguru.cn/replace-delegation-with-inheritance).
    

![](https://refactoringguru.cn/images/refactoring/content/smells/inappropriate-intimacy-03.png?id=de33e2285073feaabd1a81cffdcd386c)

### Payoff

-   Improves code organization.
    
-   Simplifies support and code reuse.
