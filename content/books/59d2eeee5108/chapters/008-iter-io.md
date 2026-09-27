This module implements a [IterIO](#werkzeug.contrib.iterio.IterIO "werkzeug.contrib.iterio.IterIO") that converts an iterator into a stream object and the other way round. Converting streams into iterators requires the [greenlet](http://codespeak.net/py/dist/greenlet.html) module.

To convert an iterator into a stream all you have to do is to pass it directly to the [IterIO](#werkzeug.contrib.iterio.IterIO "werkzeug.contrib.iterio.IterIO") constructor. In this example we pass it a newly created generator:

def foo():
    yield "something\\n"
    yield "otherthings"
stream \= IterIO(foo())
print stream.read()         \# read the whole iterator

The other way round works a bit different because we have to ensure that the code execution doesn’t take place yet. An [IterIO](#werkzeug.contrib.iterio.IterIO "werkzeug.contrib.iterio.IterIO") call with a callable as first argument does two things. The function itself is passed an [IterIO](#werkzeug.contrib.iterio.IterIO "werkzeug.contrib.iterio.IterIO") stream it can feed. The object returned by the [IterIO](#werkzeug.contrib.iterio.IterIO "werkzeug.contrib.iterio.IterIO") constructor on the other hand is not an stream object but an iterator:

def foo(stream):
    stream.write("some")
    stream.write("thing")
    stream.flush()
    stream.write("otherthing")
iterator \= IterIO(foo)
print iterator.next()       \# prints something
print iterator.next()       \# prints otherthing
iterator.next()             \# raises StopIteration

_class_ werkzeug.contrib.iterio.IterIO[¶](#werkzeug.contrib.iterio.IterIO "永久链接至目标")

Instances of this object implement an interface compatible with the standard Python file object. Streams are either read-only or write-only depending on how the object is created.

If the first argument is an iterable a file like object is returned that returns the contents of the iterable. In case the iterable is empty read operations will return the sentinel value.

If the first argument is a callable then the stream object will be created and passed to that function. The caller itself however will not receive a stream but an iterable. The function will be be executed step by step as something iterates over the returned iterable. Each call to flush() will create an item for the iterable. If flush() is called without any writes in-between the sentinel value will be yielded.

Note for Python 3: due to the incompatible interface of bytes and streams you should set the sentinel value explicitly to an empty bytestring (b'') if you are expecting to deal with bytes as otherwise the end of the stream is marked with the wrong sentinel value.

0.9 新版功能: sentinel parameter was added.
