All these smells are incomplete or incorrect application of object-oriented programming principles.

You have a complex `switch` operator or sequence of `if` statements.

Temporary fields get their values (and thus are needed by objects) only under certain circumstances. Outside of these circumstances, they're empty.

If a subclass uses only some of the methods and properties inherited from its parents, the hierarchy is off-kilter. The unneeded methods may simply go unused or be redefined and give off exceptions.

Two classes perform identical functions but have different method names.
