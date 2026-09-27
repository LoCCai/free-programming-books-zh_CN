### Problem

Is domain data stored in classes responsible for the GUI?

### Solution

Then it's a good idea to separate the data into separate classes, ensuring connection and synchronization between the domain class and the GUI.

Before

![Duplicate Observed Data - Before](https://refactoringguru.cn/images/refactoring/diagrams/Duplicate%20Observed%20Data%20-%20Before.png?id=bd26ed6d7d9921504165fd46b7f6124c)

After

![Duplicate Observed Data - After](https://refactoringguru.cn/images/refactoring/diagrams/Duplicate%20Observed%20Data%20-%20After.png?id=b86fa0ff2f9ff7c76d4a183607153458)

### Why Refactor

You want to have multiple interface views for the same data (for example, you have both a desktop app and a mobile app). If you fail to separate the GUI from the domain, you will have a very hard time avoiding code duplication and a large number of mistakes.

### Benefits

-   You split responsibility between business logic classes and presentation classes (cf. the _Single Responsibility Principle_), which makes your program more readable and understandable.
    
-   If you need to add a new interface view, create new presentation classes; you don't need to touch the code of the business logic (cf. the _Open/Closed Principle_).
    
-   Now different people can work on the business logic and the user interfaces.
    

### When Not to Use

-   This refactoring technique, which in its classic form is performed using the [Observer](https://refactoringguru.cn/design-patterns/observer) template, isn't applicable for web apps, where all classes are recreated between queries to the web server.
    
-   All the same, the general principle of extracting business logic into separate classes can be justified for web apps as well. But this will be implemented using different refactoring techniques depending on how your system is designed.
    

### How to Refactor

1.  Hide direct access to domain data in the _GUI class_. For this, it's best to use [Self Encapsulate Field](https://refactoringguru.cn/self-encapsulate-field). So you create the getters and setters for this data.
    
2.  In handlers for _GUI class_ events, use setters to set new field values. This will let you pass these values to the associated _domain object_.
    
3.  Create a domain class and copy necessary fields from the _GUI class_ to it. Create getters and seters for all these fields.
    
4.  Create an Observer pattern for these two classes:
    
    -   In the _domain class_, create an array for storing observer objects (_GUI objects_), as well as methods for registering, deleting and notifying them.
        
    -   In the _GUI class_, create a field for storing references to the _domain class_ as well as the `update()` method, which will be reacting to changes in the object and update the values of fields in the _GUI class_. Note that value updates should be established directly in the method, in order to avoid recursion.
        
    -   In the _GUI class_ constructor, create an instance of _domain class_ and save it in the field you have created. Register the _GUI object_ as an observer in the _domain object_.
        
    -   In the setters for _domain class_ fields, call the method for notifying the observer (in other words, method for updating in the _GUI class_), in order to pass the new values to the GUI.
        
    -   Change the setters of the _GUI class_ fields so that they set new values in the domain object directly. Watch out to make sure that values aren't set through a _domain class_ setter—otherwise infinite recursion will result.
