### Signs and Symptoms

A method accesses the data of another object more than its own data.

![](https://refactoringguru.cn/images/refactoring/content/smells/feature-envy-01.png?id=f520a24562e3f4b7848eca94792c329f)

### Reasons for the Problem

This smell may occur after fields are moved to a data class. If this is the case, you may want to move the operations on data to this class as well.

### Treatment

As a basic rule, if things change at the same time, you should keep them in the same place. Usually data and functions that use this data are changed together (although exceptions are possible).

-   If a method clearly should be moved to another place, use [Move Method](https://refactoringguru.cn/move-method).
    
-   If only part of a method accesses the data of another object, use [Extract Method](https://refactoringguru.cn/extract-method) to move the part in question.
    
-   If a method uses functions from several other classes, first determine which class contains most of the data used. Then place the method in this class along with the other data. Alternatively, use [Extract Method](https://refactoringguru.cn/extract-method) to split the method into several parts that can be placed in different places in different classes.
    

![](https://refactoringguru.cn/images/refactoring/content/smells/feature-envy-02.png?id=a90a3545498c7c22e605ceeb1f23d005)

### Payoff

-   Less code duplication (if the data handling code is put in a central place).
    
-   Better code organization (methods for handling data are next to the actual data).
    

![](https://refactoringguru.cn/images/refactoring/content/smells/feature-envy-03.png?id=ea63eeab9eda1910348d0930c8592780)

### When to Ignore

-   Sometimes behavior is purposefully kept separate from the class that holds the data. The usual advantage of this is the ability to dynamically change the behavior (see [Strategy](https://refactoringguru.cn/design-patterns/strategy), [Visitor](https://refactoringguru.cn/design-patterns/visitor) and other patterns).
