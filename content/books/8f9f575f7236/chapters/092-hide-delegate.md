### Problem

The client gets object B from a field or method of object А. Then the client calls a method of object B.

### Solution

Create a new method in class A that delegates the call to object B. Now the client doesn't know about, or depend on, class B.

Before

![Hide Delegate - Before](https://refactoringguru.cn/images/refactoring/diagrams/Hide%20Delegate%20-%20Before.png?id=f7de1016e76545f7c51af09463ce5f4c)

After

![Hide Delegate - After](https://refactoringguru.cn/images/refactoring/diagrams/Hide%20Delegate%20-%20After.png?id=f51110f3e0d4423b3f9088e92fc3dce4)

### Why Refactor

To start with, let's look at terminology:

-   _Server_ is the object to which the client has direct access.
    
-   _Delegate_ is the end object that contains the functionality needed by the client.
    

A call chain appears when a client requests an object from another object, then the second object requests another one, and so on. These sequences of calls involve the client in navigation along the class structure. Any changes in these interrelationships will require changes on the client side.

### Benefits

-   Hides delegation from the client. The less that the client code needs to know about the details of relationships between objects, the easier it's to make changes to your program.

### Drawbacks

-   If you need to create an excessive number of delegating methods, _server-class_ risks becoming an unneeded go-between, leading to an excess of [Middle Man](https://refactoringguru.cn/smells/middle-man).

### How to Refactor

1.  For each method of the _delegate-class_ called by the client, create a method in the _server-class_ that delegates the call to the _delegate-class_.
    
2.  Change the client code so that it calls the methods of the _server-class_.
    
3.  If your changes free the client from needing the _delegate-class_, you can remove the access method to the _delegate-class_ from the _server-class_ (the method that was originally used to get the _delegate-class_).
