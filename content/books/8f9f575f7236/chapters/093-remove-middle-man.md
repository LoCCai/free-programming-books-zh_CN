### Problem

A class has too many methods that simply delegate to other objects.

### Solution

Delete these methods and force the client to call the end methods directly.

Before

![Remove Middle Man - Before](https://refactoringguru.cn/images/refactoring/diagrams/Remove%20Middle%20Man%20-%20Before.png?id=f51110f3e0d4423b3f9088e92fc3dce4)

After

![Remove Middle Man - After](https://refactoringguru.cn/images/refactoring/diagrams/Remove%20Middle%20Man%20-%20After.png?id=f7de1016e76545f7c51af09463ce5f4c)

### Why Refactor

To describe this technique, we'll use the terms from [Hide Delegate](https://refactoringguru.cn/hide-delegate), which are:

-   _Server_ is the object to which the client has direct access.
    
-   _Delegate_ is the end object that contains the functionality needed by the client.
    

There are two types of problems:

1.  The _server-class_ doesn't do anything itself and simply creates needless complexity. In this case, give thought to whether this class is needed at all.
    
2.  Every time a new feature is added to the _delegate_, you need to create a delegating method for it in the _server-class_. If a lot of changes are made, this will be rather tiresome.
    

### How to Refactor

1.  Create a getter for accessing the _delegate-class_ object from the _server-class_ object.
    
2.  Replace calls to delegating methods in the _server-class_ with direct calls for methods in the _delegate-class_.
