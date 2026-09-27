* * *

本模块提供了相关API用于管理、存储和访问上下文相关的状态。 [`ContextVar`](#contextvars.ContextVar "contextvars.ContextVar") 类用于声明 _上下文变量_ 并与其一起使用。函数 [`copy_context()`](#contextvars.copy_context "contextvars.copy_context") 和类 [`Context`](#contextvars.Context "contextvars.Context") 用于管理异步框架中的当前上下文。

当在并发代码中使用时，有状态的上下文管理器应当使用上下文变量而不是 [`threading.local()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.local "threading.local") 以防止它们的状态意外地泄露到其他代码中。

更多信息参见 [**PEP 567**](https://peps.python.org/pep-0567/) 。

Added in version 3.7.

## 上下文变量[¶](#context-variables "Link to this heading")

_class_ contextvars.ContextVar(_name_\[, _\*_, _default_\])[¶](#contextvars.ContextVar "Link to this definition")

此类用于声明一个新的上下文变量，如:

var: ContextVar\[int\] \= ContextVar('var', default\=42)

_name_ 参数用于内省和调试，必需。

调用 [`ContextVar.get()`](#contextvars.ContextVar.get "contextvars.ContextVar.get") 时，如果上下文中没有找到此变量的值，则返回可选的仅限关键字参数 _default_ 。

**重要：** 上下文变量应该在顶级模块中创建，且永远不要在闭包中创建。 [`Context`](#contextvars.Context "contextvars.Context") 对象拥有对上下文变量的强引用，这会阻止上下文变量被垃圾收集器正确回收。

`ContextVar`s are [generic](https://docs.python.org/zh-cn/3/library/typing.html#generics) over the type of their contained value.

name[¶](#contextvars.ContextVar.name "Link to this definition")

上下文变量的名称，只读属性。

Added in version 3.7.1.

get(\[_default_\])[¶](#contextvars.ContextVar.get "Link to this definition")

返回当前上下文中此上下文变量的值。

如果当前上下文中此变量没有值，则此方法会:

-   如果提供了 _default_，返回其值；或者
    
-   返回上下文变量本身的默认值， 如果创建此上下文变量时提供了默认值；或者
    
-   抛出 [`LookupError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#LookupError "LookupError") 异常。
    

set(_value_)[¶](#contextvars.ContextVar.set "Link to this definition")

调用此方法设置上下文变量在当前上下文中的值。

必选参数 _value_ 是上下文变量的新值。

返回一个 [`Token`](#contextvars.Token "contextvars.Token") 对象，可通过 [`ContextVar.reset()`](#contextvars.ContextVar.reset "contextvars.ContextVar.reset") 方法将上下文变量还原为之前某个状态。

出于方便考虑，token 对象可被用作上下文管理器以避免手动调用 [`ContextVar.reset()`](#contextvars.ContextVar.reset "contextvars.ContextVar.reset"):

var \= ContextVar('var', default\='default value')

with var.set('new value'):
    assert var.get() \== 'new value'

assert var.get() \== 'default value'

这是以下代码的快捷写法:

var \= ContextVar('var', default\='default value')

token \= var.set('new value')
try:
    assert var.get() \== 'new value'
finally:
    var.reset(token)

assert var.get() \== 'default value'

Added in version 3.14: 增加对使用 token 作为上下文管理器的支持。

reset(_token_)[¶](#contextvars.ContextVar.reset "Link to this definition")

将上下文变量重置为调用 [`ContextVar.set()`](#contextvars.ContextVar.set "contextvars.ContextVar.set") 之前、创建 _token_ 时候的状态。

例如:

var \= ContextVar('var')

token \= var.set('new value')
\# 使用 'var' 的代码；var.get() 将返回 'new value'。
var.reset(token)

\# 在重置调用之后 var 将不再有值，
\# 因此 var.get() 将引发一个 LookupError。

同一个 _token_ 不能被重复使用。

_class_ contextvars.Token[¶](#contextvars.Token "Link to this definition")

_Token_ 对象是由 [`ContextVar.set()`](#contextvars.ContextVar.set "contextvars.ContextVar.set") 方法返回的。 它们可以被传入 [`ContextVar.reset()`](#contextvars.ContextVar.reset "contextvars.ContextVar.reset") 方法来恢复在对应的 _set_ 之前状态的变量值。 同一个 token 不能多次重置上下文变量。

Token 支持 [上下文管理器协议](https://docs.python.org/zh-cn/3/reference/datamodel.html#context-managers) 以自动重置上下文变量。 参见 [`ContextVar.set()`](#contextvars.ContextVar.set "contextvars.ContextVar.set")。

Tokens are [generic](https://docs.python.org/zh-cn/3/library/typing.html#generics) over the same type as the [`ContextVar`](#contextvars.ContextVar "contextvars.ContextVar") which created them.

Added in version 3.14: 增加对用作上下文管理器的支持。

var[¶](#contextvars.Token.var "Link to this definition")

只读属性。指向创建此 token 的 [`ContextVar`](#contextvars.ContextVar "contextvars.ContextVar") 对象。

old\_value[¶](#contextvars.Token.old_value "Link to this definition")

一个只读属性。 会被设为在创建此令牌的 [`ContextVar.set()`](#contextvars.ContextVar.set "contextvars.ContextVar.set") 方法调用之前该变量所具有的值。 如果调用之前变量没有设置值则它会指向 [`Token.MISSING`](#contextvars.Token.MISSING "contextvars.Token.MISSING")。

MISSING[¶](#contextvars.Token.MISSING "Link to this definition")

[`Token.old_value`](#contextvars.Token.old_value "contextvars.Token.old_value") 会用到的一个标记对象。

## 手动上下文管理[¶](#manual-context-management "Link to this heading")

contextvars.copy\_context()[¶](#contextvars.copy_context "Link to this definition")

返回当前 [`Context`](#contextvars.Context "contextvars.Context") 对象的拷贝。

以下代码片段会获取当前上下文的拷贝并打印设置到其中的所有变量及其值:

ctx: Context \= copy\_context()
print(list(ctx.items()))

此函数具有 _O_(1) 复杂度，也就是说对于只包含几个上下文变量和很多上下文变量的情况运行速度是相同的。

_class_ contextvars.Context[¶](#contextvars.Context "Link to this definition")

[`ContextVars`](#contextvars.ContextVar "contextvars.ContextVar") 与其值的映射。

`Context()` 创建一个不包含任何值的空上下文。如果要获取当前上下文的拷贝，使用 [`copy_context()`](#contextvars.copy_context "contextvars.copy_context") 函数。

每个线程有它自己在用的 `Context` 对象栈。 [current context](https://docs.python.org/zh-cn/3/glossary.html#term-current-context) 是位于当前线程的栈的顶部的 `Context` 对象。 栈中所有的 `Context` 对象都被视为是 _进入过的_。

_进入_ 一个上下文，这可以通过调用其 [`run()`](#contextvars.Context.run "contextvars.Context.run") 方法来完成，将把该上下文推入当前线程的栈的顶部使它成为当前上下文。

_退出_ 当前上下文，这可以通过从传给 [`run()`](#contextvars.Context.run "contextvars.Context.run") 方法的回调退出，通过将该上下文弹出上下文栈的顶部将当前上下文恢复至该上下文被进入之前的上下文来完成。

由于每个线程都有它自己的上下文栈，[`ContextVar`](#contextvars.ContextVar "contextvars.ContextVar") 对象的行为类似于 [`threading.local()`](https://docs.python.org/zh-cn/3/library/threading.html#threading.local "threading.local") 在不同线程中赋值时的行为。

尝试进入一个已被进入的上下文，包括在其他线程中被进入的上下文，将会引发 [`RuntimeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#RuntimeError "RuntimeError")。

在退出一个上下文之后，它可以在稍后被重新进入（从任何线程）。

任何通过 [`ContextVar.set()`](#contextvars.ContextVar.set "contextvars.ContextVar.set") 方法对 [`ContextVar`](#contextvars.ContextVar "contextvars.ContextVar") 值的修改都将在当前上下文中被记录。 [`ContextVar.get()`](#contextvars.ContextVar.get "contextvars.ContextVar.get") 方法将返回关联到当前上下文的值。 退出一个上下文将有效地撤销在进入该上下文期间对上下文变量的任何修改（如有必要，这些值可通过重新进入相应的上下文来恢复）。

Context 实现了 [`collections.abc.Mapping`](https://docs.python.org/zh-cn/3/library/collections.abc.html#collections.abc.Mapping "collections.abc.Mapping") 接口。

run(_callable_, _\*args_, _\*\*kwargs_)[¶](#contextvars.Context.run "Link to this definition")

进入 Context，执行 `callable(*args, **kwargs)`，然后退出 Context。 返回 _callable_ 的返回值，或者如果发生了异常则传播该异常。

示例:

import contextvars

var \= contextvars.ContextVar('var')
var.set('spam')
print(var.get())  \# 'spam'

ctx \= contextvars.copy\_context()

def main():
    \# 在调用 'copy\_context()' 和 'ctx.run(main)' 之前
    \# 'var' 被设为 'spam'，因此：
    print(var.get())  \# 'spam'
    print(ctx\[var\])  \# 'spam'

    var.set('ham')

    \# 在将 'var' 设为 'ham' 之后：
    print(var.get())  \# 'ham'
    print(ctx\[var\])  \# 'ham'

\# 'main' 函数对 'var' 的任何修改
\# 都将包含在 'ctx' 中。
ctx.run(main)

\# 'main()' 函数是在 'ctx' 上下文中运行的，
\# 因此对 'var' 的修改将包含在其中：
print(ctx\[var\])  \# 'ham'

\# 不过，在 'ctx' 之外，'var' 仍为 'spam'：
print(var.get())  \# 'spam'

copy()[¶](#contextvars.Context.copy "Link to this definition")

返回此上下文对象的浅拷贝。

var in context

如果 _context_ 中设置了 _var_ 的值，返回 `True`，否则返回 `False`。

context\[var\]

返回 _var_ [`ContextVar`](#contextvars.ContextVar "contextvars.ContextVar") 变量的值。如果上下文对象中未设置该变量，则抛出 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError") 异常。

get(_var_\[, _default_\])[¶](#contextvars.Context.get "Link to this definition")

如果 _var_ 在上下文对象中具有值则返回 _var_ 的值。 在其他情况下返回 _default_。 如果未给出 _default_ 则返回 `None`。

iter(context)

返回一个存储在上下文对象中的变量的迭代器。

len(proxy)

返回上下文对象中所设的变量的数量。

keys()[¶](#contextvars.Context.keys "Link to this definition")

返回上下文对象中的所有变量的列表。

values()[¶](#contextvars.Context.values "Link to this definition")

返回上下文对象中所有变量值的列表。

items()[¶](#contextvars.Context.items "Link to this definition")

返回包含上下文对象中所有变量及其值的 2 元组的列表。

## asyncio 支持[¶](#asyncio-support "Link to this heading")

上下文变量在 [`asyncio`](https://docs.python.org/zh-cn/3/library/asyncio.html#module-asyncio "asyncio: Asynchronous I/O.") 中有原生的支持并且无需任何额外配置即可被使用。 例如，以下是一个简单的回显服务器，它使用上下文变量来让远程客户端的地址在处理该客户端的 Task 中可用:

import asyncio
import contextvars

client\_addr\_var \= contextvars.ContextVar('client\_addr')

def render\_goodbye():
    \# The address of the currently handled client can be accessed
    \# without passing it explicitly to this function.

    client\_addr \= client\_addr\_var.get()
    return f'Good bye, client @ {client\_addr}\\r\\n'.encode()

async def handle\_request(reader, writer):
    addr \= writer.transport.get\_extra\_info('socket').getpeername()
    client\_addr\_var.set(addr)

    \# In any code that we call is now possible to get
    \# client's address by calling 'client\_addr\_var.get()'.

    while True:
        line \= await reader.readline()
        print(line)
        if not line.strip():
            break

    writer.write(b'HTTP/1.1 200 OK\\r\\n')  \# status line
    writer.write(b'\\r\\n')  \# headers
    writer.write(render\_goodbye())  \# body
    writer.close()

async def main():
    srv \= await asyncio.start\_server(
        handle\_request, '127.0.0.1', 8081)

    async with srv:
        await srv.serve\_forever()

asyncio.run(main())

\# To test it you can use telnet or curl:
\#     telnet 127.0.0.1 8081
\#     curl 127.0.0.1:8081
