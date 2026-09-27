### Problem

You have two classes with common fields and methods.

### Solution

Create a shared superclass for them and move all the identical fields and methods to it.

Before

![Extract Superclass - Before](https://refactoringguru.cn/images/refactoring/diagrams/Extract%20Superclass%20-%20Before.png?id=e8192774aeefddece5b3c1a7a868127d)

After

![Extract Superclass - After](https://refactoringguru.cn/images/refactoring/diagrams/Extract%20Superclass%20-%20After.png?id=1cff46d95be1632df8af715e14ea88c9)

### Why Refactor

One type of code duplication occurs when two classes perform similar tasks in the same way, or perform similar tasks in different ways. Objects offer a built-in mechanism for simplifying such situations via inheritance. But oftentimes this similarity remains unnoticed until classes are created, necessitating that an inheritance structure be created later.

### Benefits

-   Code deduplication. Common fields and methods now "live" in one place only.

### When Not to Use

-   You can not apply this technique to classes that already have a superclass.

### How to Refactor

1.  Create an abstract superclass.
    
2.  Use [Pull Up Field](https://refactoringguru.cn/pull-up-field), [Pull Up Method](https://refactoringguru.cn/pull-up-method), and [Pull Up Constructor Body](https://refactoringguru.cn/pull-up-constructor-body) to move the common functionality to a superclass. Start with the fields, since in addition to the common fields you will need to move the fields that are used in the common methods.
    
3.  Look for places in the client code where use of subclasses can be replaced with your new class (such as in type declarations).
