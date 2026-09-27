**源代码:** [Lib/ctypes](https://github.com/python/cpython/tree/3.14/Lib/ctypes)

* * *

`ctypes` 是 Python 的外部函数库。 它提供了与 C 兼容的数据类型，并允许调用 DLL 或共享库中的函数。 可使用该模块以纯 Python 形式对这些库进行封装。

这是一个 [optional module](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module)。 如果它在你的 CPython 副本中缺失，请查看你的发行方（也就是说，向你提供 Python 的人）的文档。 如果你就是发行方，请参阅 [针对可选模块的要求](https://docs.python.org/zh-cn/3/using/configure.html#optional-module-requirements)。

警告

`ctypes` provides low-level access to native libraries and the process's memory, bypassing Python's safety mechanisms and allowing execution of arbitrary native code. Incorrect use can corrupt data and objects, reveal sensitive information, cause crashes, or otherwise compromise the running process.

## ctypes 教程[¶](#ctypes-tutorial "Link to this heading")

注意：部分示例代码引用了 ctypes [`c_int`](#ctypes.c_int "ctypes.c_int") 类型。在 `sizeof(long) == sizeof(int)` 的平台上此类型是 [`c_long`](#ctypes.c_long "ctypes.c_long") 的一个别名。所以，在程序输出 `c_long` 而不是你期望的 `c_int` 时不必感到迷惑 --- 它们实际上是同一种类型。

### 载入动态连接库[¶](#loading-dynamic-link-libraries "Link to this heading")

`ctypes` 导出了 [`cdll`](#ctypes.cdll "ctypes.cdll")，在 Windows 上还有 [`windll`](#ctypes.windll "ctypes.windll") 和 [`oledll`](#ctypes.oledll "ctypes.oledll") 对象，用于载入动态链接库。

你可以通过访问对象属性的方式来加载共享库。 `cdll` 可加载使用标准 `cdecl` 调用规范导出函数的共享库，而 `windll` 库则使用 `stdcall` 调用规范来调用函数。 [`oledll`](#ctypes.oledll "ctypes.oledll") 也使用 `stdcall` 调用规范，并会假定库函数会返回 Windows `HRESULT` 错误代码。 这种错误代码被用于在函数调用失败时自动引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 异常。

这是一些 Windows 下的例子。 请注意 `msvcrt` 是包含大部分 C 函数的 MS 标准 C 库，并会使用 `cdecl` 调用惯例:

\>>> from ctypes import \*
\>>> print(windll.kernel32)
<WinDLL 'kernel32', handle ... at ...>
\>>> print(cdll.msvcrt)
<CDLL 'msvcrt', handle ... at ...>
\>>> libc \= cdll.msvcrt
\>>>

Windows 会自动添加通常的 `.dll` 文件扩展名。

备注

通过 `cdll.msvcrt` 调用的标准 C 函数，可能会导致调用一个过时的，与当前 Python 所不兼容的函数。因此，请尽量使用标准的 Python 函数，而不要使用 `msvcrt` 模块。

其他系统要求文件名 _包括_ 扩展名才能加载共享库，因此不能使用属性访问来加载库。 你或者应使用 dll 加载器的 [`LoadLibrary()`](#ctypes.LibraryLoader.LoadLibrary "ctypes.LibraryLoader.LoadLibrary") 方法，或者应通过调用构造器创建 [`CDLL`](#ctypes.CDLL "ctypes.CDLL") 的实例来加载库。

例如，在 Linux 上:

\>>> cdll.LoadLibrary("libc.so.6")
<CDLL 'libc.so.6', handle ... at ...>
\>>> libc \= CDLL("libc.so.6")
\>>> libc
<CDLL 'libc.so.6', handle ... at ...>
\>>>

在 macOS 上:

\>>> cdll.LoadLibrary("libc.dylib")
<CDLL 'libc.dylib', handle ... at ...>
\>>> libc \= CDLL("libc.dylib")
\>>> libc
<CDLL 'libc.dylib', handle ... at ...>

### 操作导入的动态链接库中的函数[¶](#accessing-functions-from-loaded-dlls "Link to this heading")

通过操作 dll 对象的属性来操作这些函数:

\>>> libc.printf
<\_FuncPtr object at 0x...>
\>>> print(windll.kernel32.GetModuleHandleA)
<\_FuncPtr object at 0x...>
\>>> print(windll.kernel32.MyOwnFunction)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "ctypes.py", line 239, in \_\_getattr\_\_
    func \= \_StdcallFuncPtr(name, self)
AttributeError: function 'MyOwnFunction' not found
\>>>

请注意 win32 系统的动态库如 `kernel32` 和 `user32` 通常会同时导出一个函数的 ANSI 版本和 UNICODE 版本。 UNICODE 版本导出时会在名称后加上 `W`，而 ANSI 版本导出时会在名称后加上 `A`。 win32 `GetModuleHandle` 函数会为给定的模块名称返回一个 _模块句柄_，它具有以下的 C 原型，以及一个被用来根据是否定义了 UNICODE 将其中之一暴露为 `GetModuleHandle` 的宏:

/\* ANSI version \*/
HMODULE GetModuleHandleA(LPCSTR lpModuleName);
/\* UNICODE version \*/
HMODULE GetModuleHandleW(LPCWSTR lpModuleName);

_windll_ 不会通过这样的魔法手段来帮你决定选择哪一种函数，你必须显式的调用 `GetModuleHandleA` 或 `GetModuleHandleW`，并分别使用字节对象或字符串对象作参数。

有时候，dll 导出的函数名不符合 Python 的标识符规范，比如 `"??2@YAPAXI@Z"`。此时，你必须使用 [`getattr()`](https://docs.python.org/zh-cn/3/builtins/functions.html#getattr "getattr") 来获得该函数:

\>>> getattr(cdll.msvcrt, "??2@YAPAXI@Z")
<\_FuncPtr object at 0x...>
\>>>

Windows 下，有些 dll 导出的函数没有函数名，而是通过其顺序号调用。对此类函数，你也可以通过 dll 对象的数值索引来操作这些函数:

\>>> cdll.kernel32\[1\]
<\_FuncPtr object at 0x...>
\>>> cdll.kernel32\[0\]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "ctypes.py", line 310, in \_\_getitem\_\_
    func \= \_StdcallFuncPtr(name, self)
AttributeError: function ordinal 0 not found
\>>>

### 调用函数[¶](#calling-functions "Link to this heading")

你可以像任何其它 Python 可调用对象一样调用这些函数。 这个例子使用了 `rand()` 函数，它不接收任何参数并返回一个伪随机整数:

\>>> print(libc.rand())
1804289383

在 Windows 上，你可以调用 `GetModuleHandleA()` 函数，它返回一个 win32 模块句柄 (将 `None` 作为唯一参数传入以使用 `NULL` 指针来调用它):

\>>> print(hex(windll.kernel32.GetModuleHandleA(None)))
0x1d000000
\>>>

如果你用 `cdecl` 调用方式调用 `stdcall` 约定的函数，则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") 异常，反之亦然:

\>>> cdll.kernel32.GetModuleHandleA(None)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: Procedure probably called with not enough arguments (4 bytes missing)
\>>>

\>>> windll.msvcrt.printf(b"spam")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: Procedure probably called with too many arguments (4 bytes in excess)
\>>>

你必须阅读这些库的头文件或说明文档来确定它们的正确的调用协议。

在 Windows 上，`ctypes` 使用 win32 结构化异常处理来防止由于在调用函数时使用无效参数导致的程序崩溃:

\>>> windll.kernel32.GetModuleHandleA(32)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
OSError: exception: access violation reading 0x00000020
\>>>

The [`faulthandler`](https://docs.python.org/zh-cn/3/library/faulthandler.html#module-faulthandler "faulthandler: Dump the Python traceback.") module can help debug crashes, such as segmentation faults produced by erroneous C library calls.

`None`、整数、字节串对象和（Unicode）字符串是仅有的可以直接作为这些函数调用的形参的原生 Python 对象。 `None` 将作为 C `NULL` 指针传入，字节串对象和字符串将作为指向包含其数据 (char\* 或 wchar\_t\*) 的内存块的指针传入。 Python 整数将作为平台默认的 C int 类型传入，它们的值会被截断以适应 C 类型的长度。

在我们开始附带其他形参类型调用函数之前，我们必须仔细了解 `ctypes` 的数据类型。

### 基础数据类型[¶](#fundamental-data-types "Link to this heading")

`ctypes` 定义了一些基本的 C 兼容数据类型：compatible data types:

| 
ctypes 类型

 | 

C 类型

 | 

Python 类型

 | 

[`_type_`](#ctypes._SimpleCData._type_ "ctypes._SimpleCData._type_")

 |
| --- | --- | --- | --- |
| 

[`c_bool`](#ctypes.c_bool "ctypes.c_bool")

 | 

\_Bool

 | 

[`bool`](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")

 | 

`'?'`

 |
| 

[`c_char`](#ctypes.c_char "ctypes.c_char")

 | 

char

 | 

单字符 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")

 | 

`'c'`

 |
| 

[`c_wchar`](#ctypes.c_wchar "ctypes.c_wchar")

 | 

`wchar_t`

 | 

单字符 [`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str")

 | 

`'u'`

 |
| 

[`c_byte`](#ctypes.c_byte "ctypes.c_byte")

 | 

char

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

`'b'`

 |
| 

[`c_ubyte`](#ctypes.c_ubyte "ctypes.c_ubyte")

 | 

unsigned char

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

`'B'`

 |
| 

[`c_short`](#ctypes.c_short "ctypes.c_short")

 | 

short

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

`'h'`

 |
| 

[`c_ushort`](#ctypes.c_ushort "ctypes.c_ushort")

 | 

unsigned short

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

`'H'`

 |
| 

[`c_int`](#ctypes.c_int "ctypes.c_int")

 | 

int

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

`'i'` \*

 |
| 

[`c_int8`](#ctypes.c_int8 "ctypes.c_int8")

 | 

`int8_t`

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

\*

 |
| 

[`c_int16`](#ctypes.c_int16 "ctypes.c_int16")

 | 

`int16_t`

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

\*

 |
| 

[`c_int32`](#ctypes.c_int32 "ctypes.c_int32")

 | 

`int32_t`

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

\*

 |
| 

[`c_int64`](#ctypes.c_int64 "ctypes.c_int64")

 | 

`int64_t`

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

\*

 |
| 

[`c_uint`](#ctypes.c_uint "ctypes.c_uint")

 | 

unsigned int

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

`'I'` \*

 |
| 

[`c_uint8`](#ctypes.c_uint8 "ctypes.c_uint8")

 | 

`uint8_t`

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

\*

 |
| 

[`c_uint16`](#ctypes.c_uint16 "ctypes.c_uint16")

 | 

`uint16_t`

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

\*

 |
| 

[`c_uint32`](#ctypes.c_uint32 "ctypes.c_uint32")

 | 

`uint32_t`

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

\*

 |
| 

[`c_uint64`](#ctypes.c_uint64 "ctypes.c_uint64")

 | 

`uint64_t`

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

\*

 |
| 

[`c_long`](#ctypes.c_long "ctypes.c_long")

 | 

long

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

`'l'`

 |
| 

[`c_ulong`](#ctypes.c_ulong "ctypes.c_ulong")

 | 

unsigned long

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

`'L'`

 |
| 

[`c_longlong`](#ctypes.c_longlong "ctypes.c_longlong")

 | 

long long

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

`'q'` \*

 |
| 

[`c_ulonglong`](#ctypes.c_ulonglong "ctypes.c_ulonglong")

 | 

unsigned long long

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

`'Q'` \*

 |
| 

[`c_size_t`](#ctypes.c_size_t "ctypes.c_size_t")

 | 

`size_t`

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

\*

 |
| 

[`c_ssize_t`](#ctypes.c_ssize_t "ctypes.c_ssize_t")

 | 

[`Py_ssize_t`](https://docs.python.org/zh-cn/3/c-api/intro.html#c.Py_ssize_t "Py_ssize_t")

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

\*

 |
| 

[`c_time_t`](#ctypes.c_time_t "ctypes.c_time_t")

 | 

`time_t`

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")

 | 

\*

 |
| 

[`c_float`](#ctypes.c_float "ctypes.c_float")

 | 

float

 | 

[`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")

 | 

`'f'`

 |
| 

[`c_double`](#ctypes.c_double "ctypes.c_double")

 | 

double

 | 

[`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")

 | 

`'d'`

 |
| 

[`c_longdouble`](#ctypes.c_longdouble "ctypes.c_longdouble")

 | 

long double

 | 

[`float`](https://docs.python.org/zh-cn/3/builtins/functions.html#float "float")

 | 

`'g'` \*

 |
| 

[`c_char_p`](#ctypes.c_char_p "ctypes.c_char_p")

 | 

char\* (以 NUL 结尾)

 | 

[`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 或 `None`

 | 

`'z'`

 |
| 

[`c_wchar_p`](#ctypes.c_wchar_p "ctypes.c_wchar_p")

 | 

wchar\_t\* (以 NUL 结尾)

 | 

[`str`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#str "str") 或 `None`

 | 

`'Z'`

 |
| 

[`c_void_p`](#ctypes.c_void_p "ctypes.c_void_p")

 | 

void\*

 | 

[`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 或 `None`

 | 

`'P'`

 |
| 

[`py_object`](#ctypes.py_object "ctypes.py_object")

 | 

[PyObject](https://docs.python.org/zh-cn/3/c-api/structures.html#c.PyObject "PyObject")\*

 | 

[`object`](https://docs.python.org/zh-cn/3/builtins/functions.html#object "object")

 | 

`'O'`

 |
| 

[VARIANT\_BOOL](#ctypes-wintypes)

 | 

short int

 | 

[`bool`](https://docs.python.org/zh-cn/3/builtins/functions.html#bool "bool")

 | 

`'v'`

 |

此外，如果 IEC 60559 兼容的复数计算 (附件 G) 在 C 和 `libffi` 中都受到支持，则下列复数类型将可用：

| 
ctypes 类型

 | 

C 类型

 | 

Python 类型

 | 

[`_type_`](#ctypes._SimpleCData._type_ "ctypes._SimpleCData._type_")

 |
| --- | --- | --- | --- |
| 

[`c_float_complex`](#ctypes.c_float_complex "ctypes.c_float_complex")

 | 

float complex

 | 

[`complex`](https://docs.python.org/zh-cn/3/builtins/functions.html#complex "complex")

 | 

`'F'`

 |
| 

[`c_double_complex`](#ctypes.c_double_complex "ctypes.c_double_complex")

 | 

double complex

 | 

[`complex`](https://docs.python.org/zh-cn/3/builtins/functions.html#complex "complex")

 | 

`'D'`

 |
| 

[`c_longdouble_complex`](#ctypes.c_longdouble_complex "ctypes.c_longdouble_complex")

 | 

long double complex

 | 

[`complex`](https://docs.python.org/zh-cn/3/builtins/functions.html#complex "complex")

 | 

`'G'`

 |

所有这些类型都可以通过使用正确类型和值的可选初始值调用它们来创建:

\>>> c\_int()
c\_long(0)
\>>> c\_wchar\_p("Hello, World")
c\_wchar\_p(140018365411392)
\>>> c\_ushort(\-3)
c\_ushort(65533)
\>>>

数字类型的构造器将使用 [`__bool__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__bool__ "object.__bool__"), [`__index__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__index__ "object.__index__") (for `int`), [`__float__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__float__ "object.__float__") 或 [`__complex__()`](https://docs.python.org/zh-cn/3/reference/datamodel.html#object.__complex__ "object.__complex__") 对输入进行转换。 这意味着 [`c_bool`](#ctypes.c_bool "ctypes.c_bool") 可接受任何具有逻辑值的对象:

\>>> empty\_list \= \[\]
\>>> c\_bool(empty\_list)
c\_bool(False)

由于这些类型是可变的，它们的值也可以在以后更改:

\>>> i \= c\_int(42)
\>>> print(i)
c\_long(42)
\>>> print(i.value)
42
\>>> i.value \= \-99
\>>> print(i.value)
\-99
\>>>

给指针类型 [`c_char_p`](#ctypes.c_char_p "ctypes.c_char_p"), [`c_wchar_p`](#ctypes.c_wchar_p "ctypes.c_wchar_p") 和 [`c_void_p`](#ctypes.c_void_p "ctypes.c_void_p") 的实例赋新值会改变它们所指向的 _内存位置_，而不是内存块的 _内容_ (当然不是，因为 Python 字符串对象是不可变的):

\>>> s \= "Hello, World"
\>>> c\_s \= c\_wchar\_p(s)
\>>> print(c\_s)
c\_wchar\_p(139966785747344)
\>>> print(c\_s.value)
Hello World
\>>> c\_s.value \= "Hi, there"
\>>> print(c\_s)              \# 内存分配已改变
c\_wchar\_p(139966783348904)
\>>> print(c\_s.value)
Hi, there
\>>> print(s)                \# 第一个对象未改变
Hello, World
\>>>

但你要注意不能将它们传递给会改变指针所指内存的函数。如果你需要可改变的内存块，ctypes 提供了 [`create_string_buffer()`](#ctypes.create_string_buffer "ctypes.create_string_buffer") 函数，它提供多种方式创建这种内存块。当前的内存块内容可以通过 `raw` 属性存取，如果你希望将它作为NUL结束的字符串，请使用 `value` 属性:

\>>> from ctypes import \*
\>>> p \= create\_string\_buffer(3)            \# 创建一个 3 字节的缓冲区，初始化为 NUL 字节
\>>> print(sizeof(p), repr(p.raw))
3 b'\\x00\\x00\\x00'
\>>> p \= create\_string\_buffer(b"Hello")     \# 创建一个包含以 NUL 结束的字符串的缓冲区
\>>> print(sizeof(p), repr(p.raw))
6 b'Hello\\x00'
\>>> print(repr(p.value))
b'Hello'
\>>> p \= create\_string\_buffer(b"Hello", 10) \# 创建一个 10 字节的缓冲区
\>>> print(sizeof(p), repr(p.raw))
10 b'Hello\\x00\\x00\\x00\\x00\\x00'
\>>> p.value \= b"Hi"
\>>> print(sizeof(p), repr(p.raw))
10 b'Hi\\x00lo\\x00\\x00\\x00\\x00\\x00'
\>>>

[`create_string_buffer()`](#ctypes.create_string_buffer "ctypes.create_string_buffer") 函数取代了旧的 `c_buffer()` 函数（后者仍可作为别名使用）。 要创建一个包含 C 类型 `wchar_t` 的 unicode 字符的可变内存块，请使用 [`create_unicode_buffer()`](#ctypes.create_unicode_buffer "ctypes.create_unicode_buffer") 函数。

### 调用函数，继续[¶](#calling-functions-continued "Link to this heading")

注意 printf 将打印到真正标准输出设备，而 _不是_ [`sys.stdout`](https://docs.python.org/zh-cn/3/library/sys.html#sys.stdout "sys.stdout")，因此这些实例只能在控制台提示符下工作，而不能在 _IDLE_ 或 _PythonWin_ 中运行:

\>>> printf \= libc.printf
\>>> printf(b"Hello, %s\\n", b"World!")
Hello, World!
14
\>>> printf(b"Hello, %S\\n", "World!")
Hello, World!
14
\>>> printf(b"%d bottles of beer\\n", 42)
42 bottles of beer
19
\>>> printf(b"%f bottles of beer\\n", 42.5)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ctypes.ArgumentError: argument 2: TypeError: Don't know how to convert parameter 2
\>>>

正如前面所提到的，除整数、字符串和字节串外的所有 Python 类型都必须包装在其对应的 `ctypes` 类型中，这样它们才能被转换为所需的 C 数据类型:

\>>> printf(b"An int %d, a double %f\\n", 1234, c\_double(3.14))
An int 1234, a double 3.140000
31
\>>>

### 调用可变函数[¶](#calling-variadic-functions "Link to this heading")

在许多平台上通过 ctypes 调用可变函数与调用带有固定数量形参的函数是完全一样的。 在某些平台，特别是针对 Apple 平台的 ARM64 上，可变函数的调用约定与常规函数则是不同的。

在这些平台上要求为常规、非可变函数参数指定 [`argtypes`](#ctypes._CFuncPtr.argtypes "ctypes._CFuncPtr.argtypes") 属性：

libc.printf.argtypes \= \[ctypes.c\_char\_p\]

因为指定该属性不会影响可移植性所以建议总是为所有可变函数指定 [`argtypes`](#ctypes._CFuncPtr.argtypes "ctypes._CFuncPtr.argtypes")。

### 使用自定义的数据类型调用函数[¶](#calling-functions-with-your-own-custom-data-types "Link to this heading")

你也可以通过自定义 `ctypes` 参数转换方式来允许你自己的类实例被用作函数参数。 `ctypes` 会寻找 `_as_parameter_` 属性并使用它作为函数参数。 属性必须为整数、字符串、`ctypes` 实例，或者具有 `_as_parameter_` 属性的对象:

\>>> class Bottles:
...     def \_\_init\_\_(self, number):
...         self.\_as\_parameter\_ \= number
...
\>>> bottles \= Bottles(42)
\>>> printf(b"%d bottles of beer\\n", bottles)
42 bottles of beer
19
\>>>

If you don't want to store the instance's data in the `_as_parameter_` instance variable, you could define a [`@property`](https://docs.python.org/zh-cn/3/builtins/functions.html#property "property") which makes the attribute available on request.

### 指定必选参数的类型(函数原型)[¶](#specifying-the-required-argument-types-function-prototypes "Link to this heading")

可以通过设置 [`argtypes`](#ctypes._CFuncPtr.argtypes "ctypes._CFuncPtr.argtypes") 属性来指定从 DLL 导出函数的必选参数类型。

[`argtypes`](#ctypes._CFuncPtr.argtypes "ctypes._CFuncPtr.argtypes") 必须是一个 C 数据类型的序列（这里 `printf()` 函数可能不是一个好例子，因为它会根据格式字符串的不同接受可变数量和不同类型的形参，但另一方面这对尝试此功能来说也很方便）:

\>>> printf.argtypes \= \[c\_char\_p, c\_char\_p, c\_int, c\_double\]
\>>> printf(b"String '%s', Int %d, Double %f\\n", b"Hi", 10, 2.2)
String 'Hi', Int 10, Double 2.200000
37
\>>>

指定数据类型可以防止不合理的参数传递（就像 C 函数的原型），并且会自动尝试将参数转换为需要的类型:

\>>> printf(b"%d %d %d", 1, 2, 3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ctypes.ArgumentError: argument 2: TypeError: 'int' object cannot be interpreted as ctypes.c\_char\_p
\>>> printf(b"%s %d %f\\n", b"X", 2, 3)
X 2 3.000000
13
\>>>

如果你定义了自己的类并将其传递给函数调用，则你必须为它们实现 [`from_param()`](#ctypes._CData.from_param "ctypes._CData.from_param") 类方法才能够在 [`argtypes`](#ctypes._CFuncPtr.argtypes "ctypes._CFuncPtr.argtypes") 序列中使用它们。 `from_param()` 类方法接受传递给函数调用的 Python 对象，它应该进行类型检查或者其他必要的操作以确保这个对象是可接受的，然后返回对象本身、它的 `_as_parameter_` 属性，或在此情况下作为 C 函数参数传入的任何东西。 同样，结果应该是整数、字符串、字节串、`ctypes` 实例或是具有 `_as_parameter_` 属性的对象。

### 返回类型[¶](#return-types "Link to this heading")

在默认情况下都会假定函数返回 C int 类型。 其他返回类型可通过设置函数对象的 [`restype`](#ctypes._CFuncPtr.restype "ctypes._CFuncPtr.restype") 属性来指定。

`time()` 的 C 原型是 `time_t time(time_t *)`。 由于 `time_t` 的类型可能不同于默认返回类型 int，你应当指定 `restype` 属性:

\>>> libc.time.restype \= c\_time\_t

参数类型可以使用 [`argtypes`](#ctypes._CFuncPtr.argtypes "ctypes._CFuncPtr.argtypes") 来指定:

\>>> libc.time.argtypes \= (POINTER(c\_time\_t),)

调用该函数时如果要将 `NULL` 指针作为第一个参数，请使用 `None`:

\>>> print(libc.time(None))
1150640792

下面是一个更高级的示例，它使用了 `strchr()` 函数，该函数接收一个字符串指针和一个字符，并返回一个字符串指针:

\>>> strchr \= libc.strchr
\>>> strchr(b"abcdef", ord("d"))
8059983
\>>> strchr.restype \= c\_char\_p    \# c\_char\_p is a pointer to a string
\>>> strchr(b"abcdef", ord("d"))
b'def'
\>>> print(strchr(b"abcdef", ord("x")))
None
\>>>

如果你想要避免上面的 [`ord("x")`](https://docs.python.org/zh-cn/3/builtins/functions.html#ord "ord") 调用，你可以设置 [`argtypes`](#ctypes._CFuncPtr.argtypes "ctypes._CFuncPtr.argtypes") 属性，第二个参数将从单字符 Python 字节串对象转换为 C char：

\>>> strchr.restype \= c\_char\_p
\>>> strchr.argtypes \= \[c\_char\_p, c\_char\]
\>>> strchr(b"abcdef", b"d")
b'def'
\>>> strchr(b"abcdef", b"def")
Traceback (most recent call last):
ctypes.ArgumentError: argument 2: TypeError: one character bytes, bytearray or integer expected
\>>> print(strchr(b"abcdef", b"x"))
None
\>>> strchr(b"abcdef", b"d")
b'def'
\>>>

如果外部函数返回一个整数，你也可以使用一个 Python 可调用对象（例如函数或类）作为 [`restype`](#ctypes._CFuncPtr.restype "ctypes._CFuncPtr.restype") 属性。 该可调用对象被调用时将附带 C 函数返回的 _整数_，其调用结果将被用作函数调用的结果值。 这对于检查错误返回值并自动引发异常来说很有用处:

\>>> GetModuleHandle \= windll.kernel32.GetModuleHandleA
\>>> def ValidHandle(value):
...     if value \== 0:
...         raise WinError()
...     return value
...
\>>>
\>>> GetModuleHandle.restype \= ValidHandle
\>>> GetModuleHandle(None)
486539264
\>>> GetModuleHandle("something silly")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 3, in ValidHandle
OSError: \[Errno 126\] The specified module could not be found.
\>>>

`WinError` 函数可以调用 Windows 的 `FormatMessage()` API 获取错误码的字符串说明，然后 _返回_ 一个异常。 `WinError` 接收一个可选的错误码作为参数，如果没有的话，它将调用 [`GetLastError()`](#ctypes.GetLastError "ctypes.GetLastError") 获取错误码。

请注意通过 [`errcheck`](#ctypes._CFuncPtr.errcheck "ctypes._CFuncPtr.errcheck") 属性可提供更强大的错误检查机制；详情见参考手册。

### 传递指针（或以引用方式传递形参）[¶](#passing-pointers-or-passing-parameters-by-reference "Link to this heading")

有时候 C 函数接口可能由于要往某个地址写入值，或者数据太大不适合作为值传递，从而希望接收一个 _指针_ 作为数据参数类型。这和 _传递参数引用_ 类似。

`ctypes` 导出了 [`byref()`](#ctypes.byref "ctypes.byref") 函数用于通过引用传递参数，使用 [`pointer()`](#ctypes.pointer "ctypes.pointer") 函数也能达到同样的效果，只不过 `pointer()` 需要更多步骤，因为它要先构造一个真实指针对象。所以在 Python 代码本身不需要使用这个指针对象的情况下，使用 `byref()` 效率更高:

\>>> i \= c\_int()
\>>> f \= c\_float()
\>>> s \= create\_string\_buffer(b'\\000' \* 32)
\>>> print(i.value, f.value, repr(s.value))
0 0.0 b''
\>>> libc.sscanf(b"1 3.14 Hello", b"%d %f %s",
...             byref(i), byref(f), s)
3
\>>> print(i.value, f.value, repr(s.value))
1 3.1400001049 b'Hello'
\>>>

### 结构体和联合[¶](#structures-and-unions "Link to this heading")

结构体和联合必须派生自 [`Structure`](#ctypes.Structure "ctypes.Structure") 和 [`Union`](#ctypes.Union "ctypes.Union") 基类，这两个基类是在 `ctypes` 模块中定义的。 每个子类都必须定义 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_") 属性。 `_fields_` 必须是一个 _2元组_ 的列表，其中包含一个 _字段名称_ 和一个 _字段类型_。

type 字段必须是一个 `ctypes` 类型，比如 [`c_int`](#ctypes.c_int "ctypes.c_int")，或者任何其他派生 `ctypes` 类型：结构、联合、数组、指针。

这是一个简单的 POINT 结构体，它包含名称为 _x_ 和 _y_ 的两个变量，还展示了如何通过构造函数初始化结构体:

\>>> from ctypes import \*
\>>> class POINT(Structure):
...     \_fields\_ \= \[("x", c\_int),
...                 ("y", c\_int)\]
...
\>>> point \= POINT(10, 20)
\>>> print(point.x, point.y)
10 20
\>>> point \= POINT(y\=5)
\>>> print(point.x, point.y)
0 5
\>>> POINT(1, 2, 3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: too many initializers
\>>>

当然，你可以构造更复杂的结构体。一个结构体可以通过设置 type 字段包含其他结构体或者自身。

这是一个 RECT 结构体，它包含了两个 POINT ，分别叫 _upperleft_ 和 _lowerright_:

\>>> class RECT(Structure):
...     \_fields\_ \= \[("upperleft", POINT),
...                 ("lowerright", POINT)\]
...
\>>> rc \= RECT(point)
\>>> print(rc.upperleft.x, rc.upperleft.y)
0 5
\>>> print(rc.lowerright.x, rc.lowerright.y)
0 0
\>>>

嵌套结构体可以通过几种方式构造初始化:

\>>> r \= RECT(POINT(1, 2), POINT(3, 4))
\>>> r \= RECT((1, 2), (3, 4))

字段 [descriptor](https://docs.python.org/zh-cn/3/glossary.html#term-descriptor) 可以从 _class_ 提取，它们在调试时很有用处因为它们能提供有用的信息。 参见 [`CField`](#ctypes.CField "ctypes.CField"):

\>>> POINT.x
<ctypes.CField 'x' type=c\_int, ofs=0, size=4>
\>>> POINT.y
<ctypes.CField 'y' type=c\_int, ofs=4, size=4>
\>>>

警告

`ctypes` 不支持带位域的结构体、联合以值的方式传给函数。 这可能在 32 位 x86 平台上可以正常工作，但是对于一般情况，这种行为是未定义的。 带位域的结构体、联合应该总是通过指针传递给函数。

### 结构/联合布局、对齐和字节顺序[¶](#structure-union-layout-alignment-and-byte-order "Link to this heading")

默认情况下，结构体和联合的字段布局方式与 C 编译器的处理方式相同。可以通过在子类定义中指定 [`_layout_`](#ctypes.Structure._layout_ "ctypes.Structure._layout_") 类属性来完全覆盖此行为；有关详细信息，请参阅该属性的文档。

通过分别设置类属性 [`_pack_`](#ctypes.Structure._pack_ "ctypes.Structure._pack_") 和/或 [`_align_`](#ctypes.Structure._align_ "ctypes.Structure._align_") 可以为字段和/或为结构体本身指定最大对齐值。 请参阅相应属性文档了解详情。

`ctypes` 中的结构体和联合使用的是本地字节序。要使用非本地字节序，可以使用 [`BigEndianStructure`](#ctypes.BigEndianStructure "ctypes.BigEndianStructure"), [`LittleEndianStructure`](#ctypes.LittleEndianStructure "ctypes.LittleEndianStructure"), [`BigEndianUnion`](#ctypes.BigEndianUnion "ctypes.BigEndianUnion") 和 [`LittleEndianUnion`](#ctypes.LittleEndianUnion "ctypes.LittleEndianUnion") 基类中的一个。 这些类不能包含指针字段。

### 结构体和联合中的位域[¶](#bit-fields-in-structures-and-unions "Link to this heading")

可以创建包含位字段的结构体和联合。 位字段只适用于整数字段，位宽度是由 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_") 元组中的第三项来指定的:

\>>> class Int(Structure):
...     \_fields\_ \= \[("first\_16", c\_int, 16),
...                 ("second\_16", c\_int, 16)\]
...
\>>> print(Int.first\_16)
<ctypes.CField 'first\_16' type=c\_int, ofs=0, bit\_size=16, bit\_offset=0>
\>>> print(Int.second\_16)
<ctypes.CField 'second\_16' type=c\_int, ofs=0, bit\_size=16, bit\_offset=16>

需要注意的是，位域在内存中的分配和布局并非 C 标准所定义；其实现取决于具体的编译器。默认情况下，Python 会尝试匹配当前平台上“原生”编译器的行为。有关默认行为以及如何修改它的详细信息，请参阅 [`_layout_`](#ctypes.Structure._layout_ "ctypes.Structure._layout_") 属性。

### 数组[¶](#arrays "Link to this heading")

数组是一个序列，包含指定个数元素，且必须类型相同。

创建数组类型的推荐方式是使用一个类型乘以一个正数:

TenPointsArrayType \= POINT \* 10

下面是一个构造的数据案例，结构体中包含了 4 个 POINT 和一些其他东西:

\>>> from ctypes import \*
\>>> class POINT(Structure):
...     \_fields\_ \= ("x", c\_int), ("y", c\_int)
...
\>>> class MyStruct(Structure):
...     \_fields\_ \= \[("a", c\_int),
...                 ("b", c\_float),
...                 ("point\_array", POINT \* 4)\]
\>>>
\>>> print(len(MyStruct().point\_array))
4
\>>>

和平常一样，通过调用它创建实例:

arr \= TenPointsArrayType()
for pt in arr:
    print(pt.x, pt.y)

以上代码会打印几行 `0 0` ，因为数组内容被初始化为 0.

也能通过指定正确类型的数据来初始化:

\>>> from ctypes import \*
\>>> TenIntegers \= c\_int \* 10
\>>> ii \= TenIntegers(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
\>>> print(ii)
<c\_long\_Array\_10 object at 0x...>
\>>> for i in ii: print(i, end\=" ")
...
1 2 3 4 5 6 7 8 9 10
\>>>

### 指针[¶](#pointers "Link to this heading")

指针实例是通过在 `ctypes` 类型上调用 [`pointer()`](#ctypes.pointer "ctypes.pointer") 函数来创建的:

\>>> from ctypes import \*
\>>> i \= c\_int(42)
\>>> pi \= pointer(i)
\>>>

指针实例拥有 [`contents`](#ctypes._Pointer.contents "ctypes._Pointer.contents") 属性，它返回指针指向的真实对象，如上面的 `i` 对象:

\>>> pi.contents
c\_long(42)
\>>>

请注意 `ctypes` 没有 OOR (original object return)，在你每次提取属性时它都会构造一个新的、等价的对象:

\>>> pi.contents is i
False
\>>> pi.contents is pi.contents
False
\>>>

将这个指针的 contents 属性赋值为另一个 [`c_int`](#ctypes.c_int "ctypes.c_int") 实例将会导致该指针指向该实例的内存地址:

\>>> i \= c\_int(99)
\>>> pi.contents \= i
\>>> pi.contents
c\_long(99)
\>>>

指针对象也可以通过整数下标进行访问:

\>>> pi\[0\]
99
\>>>

通过整数下标赋值可以改变指针所指向的真实内容:

\>>> print(i)
c\_long(99)
\>>> pi\[0\] \= 22
\>>> print(i)
c\_long(22)
\>>>

使用 0 以外的索引也是合法的，但是你必须确保知道自己为什么这么做，就像 C 语言中: 你可以访问或者修改任意内存内容。 通常只会在函数接收指针是才会使用这种特性，而且你 _知道_ 这个指针指向的是一个数组而不是单个值。

警告

Because pointer objects support subscription, they implicitly support [iteration](https://docs.python.org/zh-cn/3/glossary.html#term-iterator). Unless doing this in a controlled manner, such as by manually calling [`next()`](https://docs.python.org/zh-cn/3/builtins/functions.html#next "next") on a [`pointer()`](#ctypes.pointer "ctypes.pointer") iterator, this will typically lead to infinite loops or crashes, because ctypes has no way of knowing when to stop iteration. In other words, a `pointer` iterator will infinitely yield arbitrary memory.

在内部，[`pointer()`](#ctypes.pointer "ctypes.pointer") 函数不只是创建了一个指针实例，它首先创建了一个指针 _类型_。 这是通过 [`POINTER()`](#ctypes.POINTER "ctypes.POINTER") 函数完成的，它接收任意 `ctypes` 类型，并返回一个新类型:

\>>> PI \= POINTER(c\_int)
\>>> PI
<class 'ctypes.LP\_c\_long'>
\>>> PI(42)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: expected c\_long instead of int
\>>> PI(c\_int(42))
<ctypes.LP\_c\_long object at 0x...>
\>>>

无参调用指针类型可以创建一个 `NULL` 指针。 `NULL` 指针的布尔值是 `False`

\>>> null\_ptr \= POINTER(c\_int)()
\>>> print(bool(null\_ptr))
False
\>>>

`ctypes` 会在解引用指针时检测 `NULL` 值 (但解引用无效的非 `NULL` 指针仍会导致 Python 崩溃):

\>>> null\_ptr\[0\]
Traceback (most recent call last):
    ....
ValueError: NULL pointer access
\>>>

\>>> null\_ptr\[0\] \= 1234
Traceback (most recent call last):
    ....
ValueError: NULL pointer access
\>>>

### 没有 GIL 时的线程安全性[¶](#thread-safety-without-the-gil "Link to this heading")

从 Python 3.13 开始，[GIL](https://docs.python.org/zh-cn/3/glossary.html#term-GIL) 在 [free-threaded build](https://docs.python.org/zh-cn/3/glossary.html#term-free-threaded-build) 中可被禁用。 在 ctypes 中，对单个对象的并发读写是安全的，但跨多个对象则是不安全的：

> \>>> number \= c\_int(42)
> \>>> pointer\_a \= pointer(number)
> \>>> pointer\_b \= pointer(number)

在上述情况下，如果 GIL 已禁用，只有当一个对象对地址进行读写时才是安全的。因此，`pointer_a` 可以在多个线程之间共享和写入，但前提是 `pointer_b` 不同时尝试执行相同操作。如果这是个问题，可以考虑使用 [`threading.Lock`](https://docs.python.org/zh-cn/3/library/threading.html#threading.Lock "threading.Lock") 来同步对内存的访问：

> \>>> import threading
> \>>> lock \= threading.Lock()
> \>>> \# Thread 1
> \>>> with lock:
> ...    pointer\_a.contents \= 24
> \>>> \# Thread 2
> \>>> with lock:
> ...    pointer\_b.contents \= 42

### 类型转换[¶](#type-conversions "Link to this heading")

通常，ctypes 会进行严格的类型检查。 这意味着，如果在某个函数的 [`argtypes`](#ctypes._CFuncPtr.argtypes "ctypes._CFuncPtr.argtypes") 列表中有 `POINTER(c_int)` 或在结构体定义中将其用作成员字段的类型，则只接受完全相同类型的实例。 此规则也有一些例外情况，在这些情况下 ctypes 可以接受其他对象。 例如，你可以传入兼容的数组实例而不是指针类型。 因此，对于 `POINTER(c_int)`，ctypes 接受一个 c\_int 数组:

\>>> class Bar(Structure):
...     \_fields\_ \= \[("count", c\_int), ("values", POINTER(c\_int))\]
...
\>>> bar \= Bar()
\>>> bar.values \= (c\_int \* 3)(1, 2, 3)
\>>> bar.count \= 3
\>>> for i in range(bar.count):
...     print(bar.values\[i\])
...
1
2
3
\>>>

此外，如果一个函数参数在 [`argtypes`](#ctypes._CFuncPtr.argtypes "ctypes._CFuncPtr.argtypes") 中显式地声明为指针类型 (如 `POINTER(c_int)`)，则可以向该函数传递所指向的类型的对象 (在本例中为 `c_int`)。 在这种情况下，ctypes 将自动应用所需的 [`byref()`](#ctypes.byref "ctypes.byref") 转换。

可以给指针内容赋值为 `None` 将其设置为 `NULL`

\>>> bar.values \= None
\>>>

有时你会遇到不兼容类型的实例。 在 C 中，你可以将一个类型强制转换为另一个类型。 `ctypes` 提供了可通过相同方式使用的 [`cast()`](#ctypes.cast "ctypes.cast") 函数。 上面定义的 `Bar` 结构体接受 `POINTER(c_int)` 指针或 [`c_int`](#ctypes.c_int "ctypes.c_int") 数组作为其 `values` 字段，但不能是其他类型的实例:

\>>> bar.values \= (c\_byte \* 4)()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: incompatible types, c\_byte\_Array\_4 instance instead of LP\_c\_long instance
\>>>

这种情况下, 需要手动使用 [`cast()`](#ctypes.cast "ctypes.cast") 函数。

[`cast()`](#ctypes.cast "ctypes.cast") 函数可以将一个指针实例强制转换为另一种 ctypes 类型。 `cast()` 接收两个参数，一个 ctypes 指针对象或者可以被转换为指针的其他类型对象，和一个 ctypes 指针类型。 返回第二个类型的一个实例，该返回实例和第一个参数指向同一片内存空间:

\>>> a \= (c\_byte \* 4)()
\>>> cast(a, POINTER(c\_int))
<ctypes.LP\_c\_long object at ...>
\>>>

所以 [`cast()`](#ctypes.cast "ctypes.cast") 可以用来给结构体 `Bar` 的 `values` 字段赋值:

\>>> bar \= Bar()
\>>> bar.values \= cast((c\_byte \* 4)(), POINTER(c\_int))
\>>> print(bar.values\[0\])
0
\>>>

### 不完整类型[¶](#incomplete-types "Link to this heading")

_不完整类型_ 即还没有定义成员的结构体、联合或者数组。在 C 中，它们通常用于前置声明，然后在后面定义:

struct cell; /\* 前向声明 \*/

struct cell {
    char \*name;
    struct cell \*next;
};

直接翻译成 ctypes 的代码如下，但是这行不通:

\>>> class cell(Structure):
...     \_fields\_ \= \[("name", c\_char\_p),
...                 ("next", POINTER(cell))\]
...
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 2, in cell
NameError: name 'cell' is not defined
\>>>

因为新的 `class cell` 在 class 语句本身中是不可用的。 在 `ctypes` 中，我们可以先定义 `cell` 类，在 class 语句之后设置 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_") 属性:

\>>> from ctypes import \*
\>>> class cell(Structure):
...     pass
...
\>>> cell.\_fields\_ \= \[("name", c\_char\_p),
...                  ("next", POINTER(cell))\]
\>>>

让我们试试。我们定义两个 `cell` 实例，让它们互相指向对方，然后通过指针链式访问几次:

\>>> c1 \= cell()
\>>> c1.name \= b"foo"
\>>> c2 \= cell()
\>>> c2.name \= b"bar"
\>>> c1.next \= pointer(c2)
\>>> c2.next \= pointer(c1)
\>>> p \= c1
\>>> for i in range(8):
...     print(p.name, end\=" ")
...     p \= p.next\[0\]
...
foo bar foo bar foo bar foo bar
\>>>

### 回调函数[¶](#callback-functions "Link to this heading")

`ctypes` 允许根据 Python 可调用对象创建 C 可调用函数指针。 它们有时被称为 _回调函数_。

首先，你必须为回调函数创建一个类，这个类知道调用约定，包括返回值类型以及函数接收的参数类型及个数。

[`CFUNCTYPE()`](#ctypes.CFUNCTYPE "ctypes.CFUNCTYPE") 工厂函数使用 `cdecl` 调用约定创建回调函数类型。在 Windows 上， [`WINFUNCTYPE()`](#ctypes.WINFUNCTYPE "ctypes.WINFUNCTYPE") 工厂函数使用 `stdcall` 调用约定为回调函数创建类型。

这些工厂函数的第一个参数是返回值类型，回调函数的参数类型作为剩余参数。

这里展示一个使用标准 C 库的 `qsort()` 函数例子，使用它在一个回调函数的协助下对条目进行排序。 `qsort()` 将被用来给一个整数的数组排序:

\>>> IntArray5 \= c\_int \* 5
\>>> ia \= IntArray5(5, 1, 7, 33, 99)
\>>> qsort \= libc.qsort
\>>> qsort.restype \= None
\>>>

`qsort()` 被调用时必须传入一个指向要排序的数据的指针、数据数组中的条目数、每条目的大小以及一个指向比较函数即回调函数的指针。 回调函数将附带两个指向条目的指针进行调用，如果第一个条目小于第二个条目则它必须返回一个负整数，如果两者相等则返回零，在其他情况下则返回一个正整数。

所以，我们的回调函数要接收两个整数指针，返回一个整数。首先我们创建回调函数的 `类型`

\>>> CMPFUNC \= CFUNCTYPE(c\_int, POINTER(c\_int), POINTER(c\_int))
\>>>

首先，这是一个简单的回调，它会显示传入的值:

\>>> def py\_cmp\_func(a, b):
...     print("py\_cmp\_func", a\[0\], b\[0\])
...     return 0
...
\>>> cmp\_func \= CMPFUNC(py\_cmp\_func)
\>>>

结果:

\>>> qsort(ia, len(ia), sizeof(c\_int), cmp\_func)
py\_cmp\_func 5 1
py\_cmp\_func 33 99
py\_cmp\_func 7 33
py\_cmp\_func 5 7
py\_cmp\_func 1 7
\>>>

现在我们可以比较两个元素并返回有用的结果了:

\>>> def py\_cmp\_func(a, b):
...     print("py\_cmp\_func", a\[0\], b\[0\])
...     return a\[0\] \- b\[0\]
...
\>>>
\>>> qsort(ia, len(ia), sizeof(c\_int), CMPFUNC(py\_cmp\_func))
py\_cmp\_func 5 1
py\_cmp\_func 33 99
py\_cmp\_func 7 33
py\_cmp\_func 1 7
py\_cmp\_func 5 7
\>>>

我们可以轻易地验证，现在数组是有序的了:

\>>> for i in ia: print(i, end\=" ")
...
1 5 7 33 99
\>>>

这些工厂函数可以当作装饰器工厂，所以可以这样写:

\>>> @CFUNCTYPE(c\_int, POINTER(c\_int), POINTER(c\_int))
... def py\_cmp\_func(a, b):
...     print("py\_cmp\_func", a\[0\], b\[0\])
...     return a\[0\] \- b\[0\]
...
\>>> qsort(ia, len(ia), sizeof(c\_int), py\_cmp\_func)
py\_cmp\_func 5 1
py\_cmp\_func 33 99
py\_cmp\_func 7 33
py\_cmp\_func 1 7
py\_cmp\_func 5 7
\>>>

备注

请确保你在 C 代码使用 [`CFUNCTYPE()`](#ctypes.CFUNCTYPE "ctypes.CFUNCTYPE") 对象期间一直持有指向它们的引用。 `ctypes` 不会确保这一点，而如果没有这样做，它们可能被垃圾回收，并在你的程序执行回调时发生崩溃。

注意，如果回调函数在Python之外的另外一个线程使用(比如，外部代码调用这个回调函数)， ctypes 会在每一次调用上创建一个虚拟 Python 线程。这个行为在大多数情况下是合理的，但也意味着如果有数据使用 [`threading.local`](https://docs.python.org/zh-cn/3/library/threading.html#threading.local "threading.local") 方式存储，将无法访问，就算它们是在同一个 C 线程中调用的 。

### 访问 dll 的导出变量[¶](#accessing-values-exported-from-dlls "Link to this heading")

某些共享库不仅会导出函数，还会导出变量。 一个例子就是 Python 库本身的 [`Py_Version`](https://docs.python.org/zh-cn/3/c-api/apiabiversion.html#c.Py_Version "Py_Version")，Python 运行时版本号被编码为单个整数常量。

`ctypes` 可以通过类型的 [`in_dll()`](#ctypes._CData.in_dll "ctypes._CData.in_dll") 类方法访问这样的值。 _pythonapi_ 是一个用于访问 Python C api 的预定义符号:

\>>> version \= ctypes.c\_int.in\_dll(ctypes.pythonapi, "Py\_Version")
\>>> print(hex(version.value))
0x30c00a0

一个扩展例子, 同时也展示了使用指针访问 Python 导出的 [`PyImport_FrozenModules`](https://docs.python.org/zh-cn/3/c-api/import.html#c.PyImport_FrozenModules "PyImport_FrozenModules") 指针对象。

对文档中这个值的解释说明

> 该指针被初始化为指向一个 [`_frozen`](https://docs.python.org/zh-cn/3/c-api/import.html#c._frozen "_frozen") 记录的数组，以一个所有成员均为 `NULL` 或零的记录表示结束。 当一个冻结模块被导入时，它将在此表中被搜索。 第三方代码可以利用此方式来提供动态创建的冻结模块集。

因此可以证明操纵这个指针是有用的。 为了限制样例的大小，我们只展示如何使用 `ctypes` 读取这个表:

\>>> from ctypes import \*
\>>>
\>>> class struct\_frozen(Structure):
...     \_fields\_ \= \[("name", c\_char\_p),
...                 ("code", POINTER(c\_ubyte)),
...                 ("size", c\_int),
...                 ("get\_code", POINTER(c\_ubyte)),  \# 函数指针
...                \]
...
\>>>

我们定义了 [`_frozen`](https://docs.python.org/zh-cn/3/c-api/import.html#c._frozen "_frozen") 数据类型，所以我们可以获取表的指针:

\>>> FrozenTable \= POINTER(struct\_frozen)
\>>> table \= FrozenTable.in\_dll(pythonapi, "\_PyImport\_FrozenBootstrap")
\>>>

由于 `table` 是一个指向 `struct_frozen` 数组的 `指针`，我们可以遍历它，只不过需要自己判断循环是否结束，因为指针本身并不包含长度。 它早晚会因为访问到野指针或者什么的把自己搞崩溃，所以我们最好在遇到 `NULL` 后就让它退出循环:

\>>> for item in table:
...     if item.name is None:
...         break
...     print(item.name.decode("ascii"), item.size)
...
\_frozen\_importlib 31764
\_frozen\_importlib\_external 41499
zipimport 12345
\>>>

Python 的冻结模块和冻结包(由负 `size` 成员表示)并不是广为人知的事情，它们仅仅用于实验。例如，可以使用 `import __hello__` 尝试一下这个功能。

### 意外[¶](#surprises "Link to this heading")

在 `ctypes` 存在一些边界情况会使你的预期与实际发生的事情有所不同。

比如下面的例子:

\>>> from ctypes import \*
\>>> class POINT(Structure):
...     \_fields\_ \= ("x", c\_int), ("y", c\_int)
...
\>>> class RECT(Structure):
...     \_fields\_ \= ("a", POINT), ("b", POINT)
...
\>>> p1 \= POINT(1, 2)
\>>> p2 \= POINT(3, 4)
\>>> rc \= RECT(p1, p2)
\>>> print(rc.a.x, rc.a.y, rc.b.x, rc.b.y)
1 2 3 4
\>>> \# 现在交换这两个
\>>> rc.a, rc.b \= rc.b, rc.a
\>>> print(rc.a.x, rc.a.y, rc.b.x, rc.b.y)
3 4 3 4
\>>>

嗯。我们预想应该打印 `3 4 1 2` 。但是为什么呢? 这是 `rc.a, rc.b = rc.b, rc.a` 这行代码展开后的步骤:

\>>> temp0, temp1 \= rc.b, rc.a
\>>> rc.a \= temp0
\>>> rc.b \= temp1
\>>>

注意 `temp0` 和 `temp1` 对象始终引用了对象 `rc` 的内容。然后执行 `rc.a = temp0` 会把 `temp0` 的内容拷贝到 `rc` 的空间。这也改变了 `temp1` 的内容。最终导致赋值语句 `rc.b = temp1` 没有产生预想的效果。

记住，访问被包含在结构体、联合、数组中的对象并不会将其 _复制_ 出来，而是得到了一个代理对象，它是对根对象的内部内容的一层包装。

下面是另一个可能和预期有偏差的例子:

\>>> s \= c\_char\_p()
\>>> s.value \= b"abc def ghi"
\>>> s.value
b'abc def ghi'
\>>> s.value is s.value
False
\>>>

备注

使用 [`c_char_p`](#ctypes.c_char_p "ctypes.c_char_p")  实例化的对象只能将其值设置为 bytes 或者整数。

为什么这里打印了 `False` ？ ctypes 实例是一些内存块加上一些用于访问这些内存块的 [descriptor](https://docs.python.org/zh-cn/3/glossary.html#term-descriptor) 组成。将 Python 对象存储在内存块并不会存储对象本身，而是存储了对象的 `内容` 。每次访问对象的内容都会构造一个新的 Python 对象。

### 变长数据类型[¶](#variable-sized-data-types "Link to this heading")

`ctypes` 对变长数据和结构体提供了一些支持。

The [`resize()`](#ctypes.resize "ctypes.resize") function can be used to resize the memory buffer of an existing ctypes object. The function takes the object as first argument, and the requested size in bytes as the second argument. The memory block cannot be made smaller than the natural memory block specified by the objects type, a [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError") is raised if this is tried:

\>>> short\_array \= (c\_short \* 4)()
\>>> print(sizeof(short\_array))
8
\>>> resize(short\_array, 4)
Traceback (most recent call last):
    ...
ValueError: minimum size is 8
\>>> resize(short\_array, 32)
\>>> sizeof(short\_array)
32
\>>> sizeof(type(short\_array))
8
\>>>

这非常好，但是要怎么访问数组中额外的元素呢？因为数组类型已经定义包含4个元素，导致我们访问新增元素时会产生以下错误:

\>>> short\_array\[:\]
\[0, 0, 0, 0\]
\>>> short\_array\[7\]
Traceback (most recent call last):
    ...
IndexError: invalid index
\>>>

通过 `ctypes` 使用变长数据类型的另一种方式是使用 Python 的动态特性，并在已获知所需的大小之后，根据具体情况（重新）定义数据类型。

## ctypes 参考手册[¶](#ctypes-reference "Link to this heading")

### 寻找动态链接库[¶](#finding-shared-libraries "Link to this heading")

在编译型语言中，动态链接库会在编译、链接或者程序运行时访问。

[`find_library()`](#ctypes.util.find_library "ctypes.util.find_library") 函数的目的是以类似于编译器或运行时加载器的方式来定位库（在有多个共享库版本的平台上应当加载最新的版本），而 ctypes 库加载器的行为类似于程序已经运行时直接调用运行时加载器。

`ctypes.util` 模块提供了一个函数，可以帮助确定要加载的库。

ctypes.util.find\_library(_name_)

尝试寻找一个库然后返回其路径名， _name_ 是库名称, 且去除了 _lib_ 等前缀和 `.so` 、 `.dylib` 、版本号等后缀(这是 posix 连接器 `-l` 选项使用的格式)。如果没有找到对应的库，则返回 `None` 。

确切的功能取决于系统。

在 Linux 中，[`find_library()`](#ctypes.util.find_library "ctypes.util.find_library") 会尝试运行外部程序 (`/sbin/ldconfig`, `gcc`, `objdump` 和 `ld`) 来查找库文件。 它会返回库文件的文件名。

请注意如果这些程序的输出不与 Python 所使用的动态链接器相对应，此函数的结果可能会造成误导。

在 3.6 版本发生变更: 在Linux 上，如果其他方式找不到的话，会使用环境变量 `LD_LIBRARY_PATH` 搜索动态链接库。

这是一些例子:

\>>> from ctypes.util import find\_library
\>>> find\_library("m")
'libm.so.6'
\>>> find\_library("c")
'libc.so.6'
\>>> find\_library("bz2")
'libbz2.so.1.0'
\>>>

在 macOS 和 Android 上，[`find_library()`](#ctypes.util.find_library "ctypes.util.find_library") 使用系统的标准命名方案和路径来定位库，并在成功时返回完整的路径名:

\>>> from ctypes.util import find\_library
\>>> find\_library("c")
'/usr/lib/libc.dylib'
\>>> find\_library("m")
'/usr/lib/libm.dylib'
\>>> find\_library("bz2")
'/usr/lib/libbz2.dylib'
\>>> find\_library("AGL")
'/System/Library/Frameworks/AGL.framework/AGL'
\>>>

在 Windows 中，[`find_library()`](#ctypes.util.find_library "ctypes.util.find_library") 会沿着系统搜索路径进行搜索，并返回完整的路径名称，但由于没有预定义的命名方案因此像 `find_library("c")` 这样的调用会失败并返回 `None`。

如果使用 `ctypes` 包装一个共享库，更好的做法 _可能_ 是在开发时确定好共享库的名称，并将其硬编码到包装器模块中而不是在运行时使用 [`find_library()`](#ctypes.util.find_library "ctypes.util.find_library") 来定位库。

### 列出已加载的共享库[¶](#listing-loaded-shared-libraries "Link to this heading")

在编写依赖于从共享库加载的代码时，了解当前进程中已加载哪些共享库可能会很有用。

`ctypes.util` 模块提供了 [`dllist()`](#ctypes.util.dllist "ctypes.util.dllist") 函数，该函数会调用各种平台提供的不同 API，以帮助确定当前进程中已加载了哪些共享库。

此函数的确切输出取决于系统。在大多数平台上，该列表的第一个条目代表当前进程本身，可能是空字符串。例如，在基于 glibc 的 Linux 上，返回结果可能如下：

\>>> from ctypes.util import dllist
\>>> dllist()
\['', 'linux-vdso.so.1', '/lib/x86\_64-linux-gnu/libm.so.6', '/lib/x86\_64-linux-gnu/libc.so.6', ... \]

### 加载共享库[¶](#loading-shared-libraries "Link to this heading")

将共享库加载至 Python 进程有多种方式。 其中之一是实例化 [`CDLL`](#ctypes.CDLL "ctypes.CDLL") 或它的某个子类：

_class_ ctypes.CDLL(_name_, _mode\=DEFAULT\_MODE_, _handle\=None_, _use\_errno\=False_, _use\_last\_error\=False_, _winmode\=None_)[¶](#ctypes.CDLL "Link to this definition")

代表已加载的共享库。

这个库中的函数使用标准的 C 调用惯例，并将返回 int。 Python [global interpreter lock](https://docs.python.org/zh-cn/3/glossary.html#term-global-interpreter-lock) 会在调用任何从这些库导出的函数之前被释放，并在调用之后重新获取。 如需要不同的函数行为，应使用某个子类: [`OleDLL`](#ctypes.OleDLL "ctypes.OleDLL"), [`WinDLL`](#ctypes.WinDLL "ctypes.WinDLL") 或 [`PyDLL`](#ctypes.PyDLL "ctypes.PyDLL")。

如果你持有对某个已加载共享库的 [`句柄`](#ctypes.CDLL._handle "ctypes.CDLL._handle")，可将其作为 _handle_ 参数传入以使用一个新的 `CDLL` 对象来包装打开的库。 在此情况下，_name_ 仅被用于设置 [`_name`](#ctypes.CDLL._name "ctypes.CDLL._name") 属性，但它可能会被调整和/或验证。

如果 _handle_ 为 `None`，则会使用下层系统平台的 _[dlopen(3)](https://manpages.debian.org/dlopen\(3\))_ 或 `LoadLibrary()` 函数将库加载到进程中，并获取其句柄。

_name_ 是要打开的共享库的路径名。 如果 _name_ 未包含路径分隔符，则会以平台专属的方式查找库。

在非 Windows 系统中，_name_ 可以为 `None`。 在此情况下，调用 `dlopen()` 时将传入 `NULL`，这会将主程序作为“库”打开。 （有些系统在 _name_ 为空时也会这样做；`None`/`NULL` 更具可移植性。）

CPython 实现细节

由于 CPython 链接了 `libc`，以 `None` 作为 _name_ 值往往被用于访问 C 标准库:

\>>> printf \= ctypes.CDLL(None).printf
\>>> printf.argtypes \= \[ctypes.c\_char\_p\]
\>>> printf(b"hello\\n")
hello
6

要访问 Python C API，首选可跨平台的 [`ctypes.pythonapi`](#ctypes.pythonapi "ctypes.pythonapi")。

_mode_ 可以指定库加载方式。详情请参见 _[dlopen(3)](https://manpages.debian.org/dlopen\(3\))_ 手册页。 在 Windows 上， 会忽略 _mode_ ，在 posix 系统上， 总是会加上 RTLD\_NOW ，且无法配置。

对于 _use\_errno_ 形参，如果设为真值，ctypes 将启用一种允许以安全方式访问系统 [`errno`](https://docs.python.org/zh-cn/3/library/errno.html#module-errno "errno: Standard errno system symbols.") 错误号的机制。 `ctypes` 会维护一份系统 `errno` 变量的线程级局部副本；如果你调用附带 `use_errno=True` 创建的外部函数那么在函数调用之前的 `errno` 值将与 ctypes 的私有副本进行交换，在函数调用之后也会立即进行同样的交换。

The function [`ctypes.get_errno()`](#ctypes.get_errno "ctypes.get_errno") returns the value of the ctypes private copy, and the function [`ctypes.set_errno()`](#ctypes.set_errno "ctypes.set_errno") changes the ctypes private copy to a new value and returns the former value.

当 _use\_last\_error_ 形参设为真值时，为 Windows 错误代码也启用与由 [`GetLastError()`](#ctypes.GetLastError "ctypes.GetLastError") 和 `SetLastError()` Windows API 函数管理相同的机制；[`ctypes.get_last_error()`](#ctypes.get_last_error "ctypes.get_last_error") 和 [`ctypes.set_last_error()`](#ctypes.set_last_error "ctypes.set_last_error") 会被用于请求和更改 Windows 错误代码的 ctypes 私有副本。

_winmode_ 形参用于在 Windows 上指定库的加载方式（因为 _mode_ 会被忽略）。 它接受任何对 Win32 API `LoadLibraryEx` 旗标形参来说合法的值。 当被省略时，默认使用表示最安全的 DLL 加载的旗标，这将避免 DLL 劫持等问题。 传入 DLL 的完整路径是确保正确加载库及其依赖的最安全的方式。

在 Windows 上创建 [`CDLL`](#ctypes.CDLL "ctypes.CDLL") 实例可能会失败，即使 DLL 名称确实存在。 当某个被加载 DLL 所依赖的 DLL 未找到时，将引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 错误并附带消息 _"\[WinError 126\] The specified module could not be found"._ 此错误消息不包含缺失 DLL 的名称，因为 Windows API 并不会返回此类信息，这使得此错误难以诊断。 要解决此错误并确定是哪一个 DLL 未找到，你需要找出所依赖的 DLL 列表并使用 Windows 调试与跟踪工具确定是哪一个未找到。

在 3.8 版本发生变更: 增加了 _winmode_ 参数。

该类的实例没有公有方法。 由共享库导出的函数可以通过属性或索引来访问。 请注意通过属性访问函数会对结果进行缓存因而在重复访问时每次都将返回同一个对象。 另一方面，通过索引访问函数时每次都将返回一个新对象:

\>>> from ctypes import CDLL
\>>> libc \= CDLL("libc.so.6")  \# 在 Linux
\>>> libc.time \== libc.time
True
\>>> libc\['time'\] \== libc\['time'\]
False

可使用的公有属性如下所示。 它们的名称以下划线开头以免与导出的函数名称冲突：

\_handle[¶](#ctypes.CDLL._handle "Link to this definition")

用于访问库的系统句柄。

\_name[¶](#ctypes.CDLL._name "Link to this definition")

传入构造函数的库名称。

_class_ ctypes.OleDLL[¶](#ctypes.OleDLL "Link to this definition")

请参阅超类 [`CDLL`](#ctypes.CDLL "ctypes.CDLL") 获取通用信息。

这个库中的函数使用 `stdcall` 调用约定，并且预期返回 Windows 专属的 [`HRESULT`](#ctypes.HRESULT "ctypes.HRESULT") 代码。 `HRESULT` 值包含指明函数调用是失败还是成功的信息，并带有附加错误码。 如果返回值提示失败信号，则会自动引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError")。

_class_ ctypes.WinDLL[¶](#ctypes.WinDLL "Link to this definition")

请参阅超类 [`CDLL`](#ctypes.CDLL "ctypes.CDLL") 获取通用信息。

这些库中的函数使用 `stdcall` 调用约定，并且预期默认返回 int。

_class_ ctypes.PyDLL[¶](#ctypes.PyDLL "Link to this definition")

请参阅超类 [`CDLL`](#ctypes.CDLL "ctypes.CDLL") 获取通用信息。

当这个库中的函数被调用时，Python GIL _不会_ 在函数调用期间被释放，并且在函数执行之后会检查 Python 错误旗标。 如果设置了错误旗标，则会引发 Python 异常。

因此，这只在直接调用 Python C API 函数时有用处。

ctypes.RTLD\_GLOBAL[¶](#ctypes.RTLD_GLOBAL "Link to this definition")

用于 _mode_ 参数的标识值。在此标识不可用的系统上，它被定义为整数0。

ctypes.RTLD\_LOCAL[¶](#ctypes.RTLD_LOCAL "Link to this definition")

Flag to use as _mode_ parameter. On platforms where this is not available, it is the same as _RTLD\_GLOBAL_.

ctypes.DEFAULT\_MODE[¶](#ctypes.DEFAULT_MODE "Link to this definition")

加载动态链接库的默认模式。在 OSX 10.3 上，它是 _RTLD\_GLOBAL_ ，其余系统上是 _RTLD\_LOCAL_ 。

共享库也可以通过使用一个预制对象来加载，这种对象是 [`LibraryLoader`](#ctypes.LibraryLoader "ctypes.LibraryLoader") 类的实例，具体做法是调用 [`LoadLibrary()`](#ctypes.LibraryLoader.LoadLibrary "ctypes.LibraryLoader.LoadLibrary") 方法，或是将库作为加载器实例的属性来提取。

_class_ ctypes.LibraryLoader(_dlltype_)[¶](#ctypes.LibraryLoader "Link to this definition")

加载共享库的类。 _dlltype_ 应当为 [`CDLL`](#ctypes.CDLL "ctypes.CDLL"), [`PyDLL`](#ctypes.PyDLL "ctypes.PyDLL"), [`WinDLL`](#ctypes.WinDLL "ctypes.WinDLL") 或 [`OleDLL`](#ctypes.OleDLL "ctypes.OleDLL") 类型之一。

`__getattr__()` 具有特殊的行为：它允许通过一个作为库加载器实例的属性访问共享库来加载它。 访问结果会被缓存，因此每次重复的属性访问都会返回相同的库。

LoadLibrary(_name_)[¶](#ctypes.LibraryLoader.LoadLibrary "Link to this definition")

加载一个共享库到进程中并将其返回。 此方法总是返回一个新的库实例。

可用的预制库加载器有如下这些:

ctypes.cdll[¶](#ctypes.cdll "Link to this definition")

创建 [`CDLL`](#ctypes.CDLL "ctypes.CDLL") 实例。

ctypes.windll[¶](#ctypes.windll "Link to this definition")

创建 [`WinDLL`](#ctypes.WinDLL "ctypes.WinDLL") 实例。

ctypes.oledll[¶](#ctypes.oledll "Link to this definition")

创建 [`OleDLL`](#ctypes.OleDLL "ctypes.OleDLL") 实例。

ctypes.pydll[¶](#ctypes.pydll "Link to this definition")

创建 [`PyDLL`](#ctypes.PyDLL "ctypes.PyDLL") 实例。

要直接访问 C Python api，可以使用一个现成的 Python 共享库对象:

ctypes.pythonapi[¶](#ctypes.pythonapi "Link to this definition")

一个将 Python C API 函数作为属性公开出来的 [`PyDLL`](#ctypes.PyDLL "ctypes.PyDLL") 实例。 请注意所有这些函数都应返回 C int，当然也并非总是如此，因此您必须分配正确的 `restype` 属性才能使用这些函数。

通过这些对象中的任何一个加载库都将引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.dlopen` 并附带字符串参数 `name`，即用于加载库的名称。

在加载的库上访问一个函数将引发一个审计事件 `ctypes.dlsym` 并附带参数 `library` (库对象) 和 `name` (以字符串或整数表示的符号名称).

在只有库句柄而非对象可用的情况下，访问函数会引发一个审计事件 `ctypes.dlsym/handle` 并附带参数 `handle` (原始库句柄) 和 `name`。

### 外部函数[¶](#foreign-functions "Link to this heading")

正如前一节的说明，外部函数可作为已加载共享库的属性来访问。 用此方式创建的函数对象默认接受任意数量的参数，接受任意 ctypes 数据实例作为参数，并且返回库加载器所指定的默认结果类型。

它们是私有局部类 `_FuncPtr` 的实例（未在 `ctypes` 中暴露），该类继承自私有的 [`_CFuncPtr`](#ctypes._CFuncPtr "ctypes._CFuncPtr") 类：

\>>> import ctypes
\>>> lib \= ctypes.CDLL(None)
\>>> issubclass(lib.\_FuncPtr, ctypes.\_CFuncPtr)
True
\>>> lib.\_FuncPtr is ctypes.\_CFuncPtr
False

_class_ ctypes.\_CFuncPtr[¶](#ctypes._CFuncPtr "Link to this definition")

C 可调用外部函数的基类。

外部函数的实例也是兼容 C 的数据类型；它们代表 C 函数指针。

此行为可通过对外部函数对象的特殊属性赋值来自定义。

restype[¶](#ctypes._CFuncPtr.restype "Link to this definition")

分配一个 ctypes 类型来指定外部函数的结果类型。 使用 `None` 来表示 void，即不返回任何结果的函数。

赋值为一个非 ctypes 类型的可调用 Python 对象也是可以的，在这种情况下函数应返回 C int，并且该可调用对象将附带此整数被调用，以允许进一步的处理或错误检查。 这种用法已被弃用，为了更灵活地进行后续处理或错误检查请使用 ctypes 数据类型作为 `restype` 并将 [`errcheck`](#ctypes._CFuncPtr.errcheck "ctypes._CFuncPtr.errcheck") 属性赋值为一个可调用对象。

argtypes[¶](#ctypes._CFuncPtr.argtypes "Link to this definition")

赋值为一个 ctypes 类型的元组来指定函数所接受的参数类型。 使用 `stdcall` 调用规范的函数只能附带与此元组长度相同数量的参数进行调用；使用 C 调用规范的函数还可接受额外的未指明参数。

当调用外部函数时，每个实际参数都会被传给 [`argtypes`](#ctypes._CFuncPtr.argtypes "ctypes._CFuncPtr.argtypes") 元组中条目的 [`from_param()`](#ctypes._CData.from_param "ctypes._CData.from_param") 类方法，该方法允许将实际参数适配为此外部函数所接受的对象。 例如，`argtypes` 元组中的 [`c_char_p`](#ctypes.c_char_p "ctypes.c_char_p") 条目将使用 ctypes 转换规则把作为参数传入的字符串转换为字节串对象。

新特性：现在可以在 argtypes 中放入非 ctypes 类型的条目，但每个条目必须具有 [`from_param()`](#ctypes._CData.from_param "ctypes._CData.from_param") 方法用于返回一个可作为参数的值（整数、字符串、ctypes 实例）。 这样就允许定义可将将自定义对象适配为函数参数的适配器。

errcheck[¶](#ctypes._CFuncPtr.errcheck "Link to this definition")

将一个 Python 函数或其他可调用对象赋值给此属性。 该可调用对象将附带三个及以上的参数被调用。

callable(_result_, _func_, _arguments_)

_result_ 是外部函数返回的结果，由 `restype` 属性指明。

_func_ 是外部函数对象本身，这样就允许重新使用相同的可调用对象来对多个函数进行检查或后续处理。

_arguments_ 是一个包含最初传递给函数调用的形参的元组，这样就允许对所用参数的行为进行特别处理。

此函数所返回的对象将会由外部函数调用返回，但它还可以在外部函数调用失败时检查结果并引发异常。

在 Windows 上，当外部函数调用引发一个系统异常时（例如由于访问冲突），它将被捕获并被替换为适当的 Python 异常。 此外，还将引发一个审计事件 `ctypes.set_exception` 并附带参数 `code`，以允许审计钩子将原异常替换为它自己的异常。

调用外部函数的某些方式以及本模块中的部分函数可能会引发一个审计事件 `ctypes.call_function`，并附带参数 `function pointer` 和 `arguments`。

### 函数原型[¶](#function-prototypes "Link to this heading")

外部函数也可通过实例化函数原型来创建。 函数原型类似于 C 中的函数原型；它们在不定义具体实现的情况下描述了一个函数（返回类型、参数类型、调用约定）。 工厂函数必须使用函数所需要的结果类型和参数类型来调用，并可被用作装饰器工厂函数，在此情况下可以通过 `@wrapper` 语法应用于函数。 请参阅 [回调函数](#ctypes-callback-functions) 了解有关示例。

ctypes.CFUNCTYPE(_restype_, _\*argtypes_, _use\_errno\=False_, _use\_last\_error\=False_)[¶](#ctypes.CFUNCTYPE "Link to this definition")

返回的函数原型会创建使用标准 C 调用约定的函数。 该函数在调用过程中将释放 GIL。 如果 _use\_errno_ 设为真值，则在调用之前和之后系统 [`errno`](https://docs.python.org/zh-cn/3/library/errno.html#module-errno "errno: Standard errno system symbols.") 变量的 ctypes 私有副本会与真正的 `errno` 值进行交换；_use\_last\_error_ 会为 Windows 错误码执行同样的操作。

ctypes.WINFUNCTYPE(_restype_, _\*argtypes_, _use\_errno\=False_, _use\_last\_error\=False_)[¶](#ctypes.WINFUNCTYPE "Link to this definition")

返回的函数原型会创建使用 `stdcall` 调用约定的函数。 该函数在调用过程中将会释放 GIL。 _use\_errno_ 和 _use\_last\_error_ 具有与上文相同的含义。

ctypes.PYFUNCTYPE(_restype_, _\*argtypes_)[¶](#ctypes.PYFUNCTYPE "Link to this definition")

返回的函数原型会创建使用 Python 调用约定的函数。 该函数在调用过程中将 _不会_ 释放 GIL。

这些工厂函数所创建的函数原型可通过不同的方式来实例化，具体取决于调用中的类型与数量:

prototype(_address_)

在指定地址上返回一个外部函数，地址值必须为整数。

prototype(_callable_)

基于 Python _callable_ 创建一个 C 可调用函数（回调函数）。

prototype(_func\_spec_\[, _paramflags_\])

返回由一个共享库导出的外部函数。 _func\_spec_ 必须为一个 2 元组 `(name_or_ordinal, library)`。 第一项是字符串形式的所导出函数名称，或小整数形式的所导出函数序号。 第二项是该共享库实例。

prototype(_vtbl\_index_, _name_\[, _paramflags_\[, _iid_\]\])

返回将调用一个 COM 方法的外部函数。 _vtbl\_index_ 虚拟函数表中的索引。 _name_ 是 COM 方法的名称。 _iid_ 是可选的指向接口标识符的指针，它被用于扩展的错误报告。

如果未指定 _iid_，则当 COM 方法调用失败时会引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError")。如果指定了 _iid_，则会改为引发 [`COMError`](#ctypes.COMError "ctypes.COMError")。

COM 方法使用特殊的调用约定：除了在 `argtypes` 元组中指定的形参，它们还要求一个指向 COM 接口的指针作为第一个参数。

可选的 _paramflags_ 形参会创建相比上述特性具有更多功能的外部函数包装器。

_paramflags_ 必须为一个与 [`argtypes`](#ctypes._CFuncPtr.argtypes "ctypes._CFuncPtr.argtypes") 长度相同的元组。

此元组中的每一项都包含有关形参的更多信息，它必须为包含一个、两个或更多条目的元组。

第一项是包含形参指令旗标组合的整数。

> 1
> 
> 指定函数的一个输入形参。
> 
> 2
> 
> 输出形参。 外部函数会填入一个值。
> 
> 4
> 
> 默认为整数零值的输入形参。

可选的第二项是字符串形式的形参名称。 如果指定此项，则可以使用该形参名称来调用外部函数。

可选的第三项是该形参的默认值。

下面的例子演示了如何包装 Windows 的 `MessageBoxW` 函数以使其支持默认形参和命名参数。 相应的 Windows 头文件的 C 声明是这样的:

WINUSERAPI int WINAPI
MessageBoxW(
    HWND hWnd,
    LPCWSTR lpText,
    LPCWSTR lpCaption,
    UINT uType);

这是使用 `ctypes` 的包装:

\>>> from ctypes import c\_int, WINFUNCTYPE, windll
\>>> from ctypes.wintypes import HWND, LPCWSTR, UINT
\>>> prototype \= WINFUNCTYPE(c\_int, HWND, LPCWSTR, LPCWSTR, UINT)
\>>> paramflags \= (1, "hwnd", 0), (1, "text", "Hi"), (1, "caption", "Hello from ctypes"), (1, "flags", 0)
\>>> MessageBox \= prototype(("MessageBoxW", windll.user32), paramflags)

现在 `MessageBox` 外部函数可以通过以下方式来调用:

\>>> MessageBox()
\>>> MessageBox(text\="Spam, spam, spam")
\>>> MessageBox(flags\=2, text\="foo bar")

第二个例子演示了输出形参。 这个 win32 `GetWindowRect` 函数通过将指定窗口的维度拷贝至调用者必须提供的 `RECT` 结构体来提取这些值。 这是相应的 C 声明:

WINUSERAPI BOOL WINAPI
GetWindowRect(
     HWND hWnd,
     LPRECT lpRect);

这是使用 `ctypes` 的包装:

\>>> from ctypes import POINTER, WINFUNCTYPE, windll, WinError
\>>> from ctypes.wintypes import BOOL, HWND, RECT
\>>> prototype \= WINFUNCTYPE(BOOL, HWND, POINTER(RECT))
\>>> paramflags \= (1, "hwnd"), (2, "lprect")
\>>> GetWindowRect \= prototype(("GetWindowRect", windll.user32), paramflags)
\>>>

带有输出形参的函数如果输出形参存在单一值则会自动返回该值，或是当输出形参存在多个值时返回包含这些值的元组，因此当 GetWindowRect 被调用时现在将返回一个 RECT 实例。

输出形参可以与 [`errcheck`](#ctypes._CFuncPtr.errcheck "ctypes._CFuncPtr.errcheck") 协议相结合以执行进一步的输出处理和错误检查。 Win32 `GetWindowRect` API 函数返回一个 `BOOL` 来表示成功或失败，因此该函数可以执行错误检查，并在 API 调用失败时引发异常:

\>>> def errcheck(result, func, args):
...     if not result:
...         raise WinError()
...     return args
...
\>>> GetWindowRect.errcheck \= errcheck
\>>>

If the [`errcheck`](#ctypes._CFuncPtr.errcheck "ctypes._CFuncPtr.errcheck") function returns the argument tuple it receives unchanged, `ctypes` continues the normal processing it does on the output parameters. If you want to return a tuple of window coordinates instead of a `RECT` instance, you can retrieve the fields in the function and return them instead, the normal processing will no longer take place:

\>>> def errcheck(result, func, args):
...     if not result:
...         raise WinError()
...     rc \= args\[1\]
...     return rc.left, rc.top, rc.bottom, rc.right
...
\>>> GetWindowRect.errcheck \= errcheck
\>>>

### 工具函数[¶](#utility-functions "Link to this heading")

ctypes.addressof(_obj_)[¶](#ctypes.addressof "Link to this definition")

以整数形式返回内存缓冲区地址。 _obj_ 必须为一个 ctypes 类型的实例。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.addressof` 并附带参数 `obj`。

ctypes.alignment(_obj\_or\_type_)[¶](#ctypes.alignment "Link to this definition")

返回一个 ctypes 类型的对齐要求。 _obj\_or\_type_ 必须为一个 ctypes 类型或实例。

ctypes.byref(_obj_\[, _offset_\])[¶](#ctypes.byref "Link to this definition")

返回指向 _obj_ 的轻量指针，该对象必须为一个 ctypes 类型的实例。 _offset_ 默认值为零，且必须为一个将被添加到内部指针值的整数。

`byref(obj, offset)` 对应于这段 C 代码:

(((char \*)&obj) + offset)

返回的对象只能被用作外部函数调用形参。 它的行为类似于 `pointer(obj)`，但构造起来要快很多。

ctypes.CopyComPointer(_src_, _dst_)[¶](#ctypes.CopyComPointer "Link to this definition")

将 COM 指针从 _src_ 复制到 _dst_，并返回 Windows 特定的 `HRESULT` 值。

如果 _src_ 不为 `NULL`，则会调用其 `AddRef` 方法，从而增加引用计数。

相反，在赋值新值之前，_dst_ 的引用计数不会被递减。除非 _dst_ 为 `NULL`，否则调用者有责任在必要时通过调用其 `Release` 方法来递减引用计数。

Added in version 3.14.

ctypes.cast(_obj_, _type_)[¶](#ctypes.cast "Link to this definition")

此函数类似于 C 的强制转换运算符。 它返回一个 _type_ 的新实例，该实例指向与 _obj_ 相同的内存块。 _type_ 必须为指针类型，而 _obj_ 必须为可以被作为指针来解读的对象。

ctypes.create\_string\_buffer(_init_, _size\=None_)[¶](#ctypes.create_string_buffer "Link to this definition")

ctypes.create\_string\_buffer(_size_)

此函数会创建一个可变的字符缓冲区。 返回的对象是一个 [`c_char`](#ctypes.c_char "ctypes.c_char") 的 ctypes 数组。

如果给出了 _size_ (并且不为 `None`)，则它必须是一个 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int")。 它指明所返回数组的大小。

如果给出了 _init_ 参数，则它必须为 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes")。 它会被用于初始化数组项。 不按此方式初始化的字节串将被设为零 (NUL)。

如果未给出 _size_ (或者为 `None`)，缓冲区将设为比 _init_ 大一个元素，实际就是增加一个 NUL 结束符。

如果同时给出两个参数，则 _size_ 必须不小于 `len(init)`。

警告

如果 _size_ 等于 `len(init)`，则不会增加一个 NUL 结束符。 不可将这样的缓冲区视为 C 字符串。

例如：

\>>> bytes(create\_string\_buffer(2))
b'\\x00\\x00'
\>>> bytes(create\_string\_buffer(b'ab'))
b'ab\\x00'
\>>> bytes(create\_string\_buffer(b'ab', 2))
b'ab'
\>>> bytes(create\_string\_buffer(b'ab', 4))
b'ab\\x00\\x00'
\>>> bytes(create\_string\_buffer(b'abcdef', 2))
Traceback (most recent call last):
   ...
ValueError: byte string too long

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.create_string_buffer` 并附带参数 `init`, `size`。

ctypes.create\_unicode\_buffer(_init_, _size\=None_)[¶](#ctypes.create_unicode_buffer "Link to this definition")

ctypes.create\_unicode\_buffer(_size_)

此函数会创建一个可变的 unicode 字符缓冲区。 返回的对象是一个 [`c_wchar`](#ctypes.c_wchar "ctypes.c_wchar") 的 ctypes 数组。

此函数接受与 [`create_string_buffer()`](#ctypes.create_string_buffer "ctypes.create_string_buffer") 相同的参数但是 _init_ 必须是一个字符串而 _size_ 是对 [`c_wchar`](#ctypes.c_wchar "ctypes.c_wchar") 计数。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.create_unicode_buffer` 并附带参数 `init`, `size`。

ctypes.DllCanUnloadNow()[¶](#ctypes.DllCanUnloadNow "Link to this definition")

此函数是一个允许使用 ctypes 实现进程内 COM 服务器的钩子。 它将由 \_ctypes 扩展所导出的 DllCanUnloadNow 函数来调用。

ctypes.DllGetClassObject()[¶](#ctypes.DllGetClassObject "Link to this definition")

此函数是一个允许使用 ctypes 实现进程内 COM 服务器的钩子。 它将由 `_ctypes` 扩展 DLL 所导出的 DllGetClassObject 函数来调用。

ctypes.util.find\_library(_name_)[¶](#ctypes.util.find_library "Link to this definition")

尝试寻找一个库并返回路径名称。 _name_ 是库名称并且不带任何前缀如 `lib` 以及后缀如 `.so`，`.dylib` 或版本号（形式与 posix 链接器选项 `-l` 所用的一致）。 如果找不到库，则返回 `None`。

确切的功能取决于系统。

完整文档见 [寻找动态链接库](#ctypes-finding-shared-libraries)。

ctypes.util.find\_msvcrt()[¶](#ctypes.util.find_msvcrt "Link to this definition")

返回 Python 以及扩展模块所使用的 VC 运行时库的文件名。 如果库名称无法确定，则返回 `None`。

如果你需要通过调用 `free(void *)` 来释放内存，例如某个扩展模块所分配的内存，重要的一点是你应当使用分配内存的库中的函数。

ctypes.util.dllist()[¶](#ctypes.util.dllist "Link to this definition")

尝试提供当前进程中已加载的共享库的路径列表。这些路径未经过任何形式的标准化或处理。如果底层平台 API 失败，该函数可能会引发 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError")。确切功能因系统而异。

在大多数平台上，列表的第一个元素代表当前的可执行文件。它可能是空字符串。

[适用范围](https://docs.python.org/zh-cn/3/library/intro.html#availability): Windows, macOS, iOS, glibc, BSD libc, musl

Added in version 3.14.

ctypes.FormatError(\[_code_\])[¶](#ctypes.FormatError "Link to this definition")

返回错误代码 _code_ 的文本描述。如果未指定错误代码，则通过调用 Windows API 函数 [`GetLastError()`](#ctypes.GetLastError "ctypes.GetLastError") 使用最后一个错误代码。

ctypes.GetLastError()[¶](#ctypes.GetLastError "Link to this definition")

返回 Windows 在调用线程中设置的最近的错误码。 此函数会直接调用 Windows `GetLastError()` 函数，它并不返回错误码的 ctypes 私有副本。

ctypes.get\_errno()[¶](#ctypes.get_errno "Link to this definition")

返回调用线程中系统 [`errno`](https://docs.python.org/zh-cn/3/library/errno.html#module-errno "errno: Standard errno system symbols.") 变量的 ctypes 私有副本的当前值。

引发一个不带参数的 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.get_errno`。

ctypes.get\_last\_error()[¶](#ctypes.get_last_error "Link to this definition")

返回调用线程中系统 `LastError` 变量的 ctypes 私有副本的当前值。

引发一个不带参数的 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.get_last_error`。

ctypes.memmove(_dst_, _src_, _count_)[¶](#ctypes.memmove "Link to this definition")

与标准 C memmove 库函数相同：将 _count_ 个字节从 _src_ 拷贝到 _dst_。 _dst_ 和 _src_ 必须为整数或可被转换为指针的 ctypes 实例。

ctypes.memset(_dst_, _c_, _count_)[¶](#ctypes.memset "Link to this definition")

与标准 C memset 库函数相同：将位于地址 _dst_ 的内存块用 _count_ 个字节的 _c_ 值填充。 _dst_ 必须为指定地址的整数或 ctypes 实例。

ctypes.POINTER(_type_, _/_)[¶](#ctypes.POINTER "Link to this definition")

创建或返回一个 ctypes 指针类型。指针类型会在内部进行缓存和重用，因此重复调用此函数的成本较低。_type_ 必须是一个 ctypes 类型。

生成的指针类型会缓存到 _type_ 的 `__pointer_type__` 属性中。可以在首次调用 `POINTER` 之前设置该属性，以指定自定义指针类型。但不建议这样做：在不依赖可能在未来 Python 版本中发生变化的实现细节的情况下，手动创建合适的指针类型非常困难。

ctypes.pointer(_obj_, _/_)[¶](#ctypes.pointer "Link to this definition")

创建一个新的指针实例，指向 _obj_。 返回的对象类型为 `POINTER(type(obj))`。

注意：如果你只是想向外部函数调用传递一个对象指针，你应当使用更为快速的 `byref(obj)`。

ctypes.resize(_obj_, _size_)[¶](#ctypes.resize "Link to this definition")

此函数可改变 _obj_ 的内部内存缓冲区大小，其参数必须为 ctypes 类型的实例。 没有可能将缓冲区设为小于对象类型的本机大小值，该值由 `sizeof(type(obj))` 给出，但将缓冲区加大则是可能的。

ctypes.set\_errno(_value_)[¶](#ctypes.set_errno "Link to this definition")

设置调用线程中系统 [`errno`](https://docs.python.org/zh-cn/3/library/errno.html#module-errno "errno: Standard errno system symbols.") 变量的 ctypes 私有副本的当前值为 _value_ 并返回原来的值。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.set_errno` 并附带参数 `errno`。

ctypes.set\_last\_error(_value_)[¶](#ctypes.set_last_error "Link to this definition")

在调用线程中将系统 `LastError` 变量的 ctypes 私有副本的当前值设为 _value_ 并返回之前的值。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.set_last_error` 并附带参数 `error`。

ctypes.sizeof(_obj\_or\_type_)[¶](#ctypes.sizeof "Link to this definition")

返回 ctypes 类型或实例的内存缓冲区以字节表示的大小。 其功能与 C `sizeof` 运算符相同。

ctypes.string\_at(_ptr_, _size\=\-1_)[¶](#ctypes.string_at "Link to this definition")

返回位于 _void \*ptr_ 的字节串。 如果指定了 _size_，它将被用作字节串的大小，否则将假定字节串以零值结尾。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.string_at` 并附带参数 `ptr`, `size`。

ctypes.WinError(_code\=None_, _descr\=None_)[¶](#ctypes.WinError "Link to this definition")

创建一个 [`OSError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#OSError "OSError") 的实例。如果未指定 _code_，则会调用 [`GetLastError()`](#ctypes.GetLastError "ctypes.GetLastError") 来确定错误代码。如果未指定 _descr_，则会调用 [`FormatError()`](#ctypes.FormatError "ctypes.FormatError") 来获取错误的文本描述。

ctypes.wstring\_at(_ptr_, _size\=\-1_)[¶](#ctypes.wstring_at "Link to this definition")

返回位于 _void \*ptr_ 的宽字符串。 如果指定了 _size_，它将被用作字符串的字符数量，否则将假定字符串以零值结尾。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.wstring_at` 并附带参数 `ptr`, `size`。

ctypes.memoryview\_at(_ptr_, _size_, _readonly\=False_)[¶](#ctypes.memoryview_at "Link to this definition")

返回一个长度为 _size_ 的 [`memoryview`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#memoryview "memoryview") 对象，该对象引用从 _void \*ptr_ 开始的内存。

如果 _readonly_ 为 True，返回的 `memoryview` 对象将无法用于修改底层内存。（通过其他方式所做的更改仍会反映在返回的对象中。）

此函数与 [`string_at()`](#ctypes.string_at "ctypes.string_at") 类似，主要区别在于它不会对指定内存进行复制。它是 `memoryview((c_byte * size).from_address(ptr))` 的语义等效替代方案，但效率更高。（虽然 [`from_address()`](#ctypes._CData.from_address "ctypes._CData.from_address") 只接受整数，但 _ptr_ 也可以是 [`ctypes.POINTER`](#ctypes.POINTER "ctypes.POINTER") 或 [`byref()`](#ctypes.byref "ctypes.byref") 对象。）

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.memoryview_at`，附带参数 `address`、`size`、`readonly`。

Added in version 3.14.

### 数据类型[¶](#data-types "Link to this heading")

_class_ ctypes.\_CData[¶](#ctypes._CData "Link to this definition")

这个非公有类是所有 ctypes 数据类型的共同基类。 另外，所有 ctypes 类型的实例都包含一个存放 C 兼容数据的内存块；该内存块的地址可由 [`addressof()`](#ctypes.addressof "ctypes.addressof") 辅助函数返回。 还有一个实例变量被公开为 [`_objects`](#ctypes._CData._objects "ctypes._CData._objects")；此变量包含其他在内存块包含指针的情况下需要保持存活的 Python 对象。

ctypes 数据类型的通用方法，它们都是类方法（严谨地说，它们是 [metaclass](https://docs.python.org/zh-cn/3/glossary.html#term-metaclass) 的方法）:

from\_buffer(_source_\[, _offset_\])[¶](#ctypes._CData.from_buffer "Link to this definition")

此方法返回一个共享 _source_ 对象缓冲区的 ctypes 实例。 _source_ 对象必须支持可写缓冲区接口。 可选的 _offset_ 形参指定以字节表示的源缓冲区内偏移量；默认值为零。 如果源缓冲区不够大则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.cdata/buffer` 并附带参数 `pointer`, `size`, `offset`。

from\_buffer\_copy(_source_\[, _offset_\])[¶](#ctypes._CData.from_buffer_copy "Link to this definition")

此方法创建一个 ctypes 实例，从 _source_ 对象缓冲区拷贝缓冲区，该对象必须是可读的。 可选的 _offset_ 形参指定以字节表示的源缓冲区内偏移量；默认值为零。 如果源缓冲区不够大则会引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.cdata/buffer` 并附带参数 `pointer`, `size`, `offset`。

from\_address(_address_)[¶](#ctypes._CData.from_address "Link to this definition")

此方法会使用 _address_ 所指定的内存返回一个 ctypes 类型的实例，该参数必须为一个整数。

这个方法以及其他间接调用了它的方法会引发一个 [审计事件](https://docs.python.org/zh-cn/3/library/sys.html#auditing) `ctypes.cdata`，附带参数 `address`。

from\_param(_obj_)[¶](#ctypes._CData.from_param "Link to this definition")

此方法会将 _obj_ 适配为一个 ctypes 类型。 当该类型出现在外部函数的 [`argtypes`](#ctypes._CFuncPtr.argtypes "ctypes._CFuncPtr.argtypes") 元组中时它将会被调用并传入在外部函数中使用的实际对象；它必须返回一个可被用作函数调用形参的对象。

所有 ctypes 数据类型都带有这个类方法的默认实现，它通常会返回 _obj_，如果该对象是此类型的实例的话。 某些类型也能接受其他对象。

in\_dll(_library_, _name_)[¶](#ctypes._CData.in_dll "Link to this definition")

此方法返回一个由共享库导出的 ctypes 类型。 _name_ 为导出数据的符号名称，_library_ 为所加载的共享库。

ctypes 数据类型的常见类变量：

\_\_pointer\_type\_\_[¶](#ctypes._CData.__pointer_type__ "Link to this definition")

通过为相应的 ctypes 数据类型调用 [`POINTER()`](#ctypes.POINTER "ctypes.POINTER") 所创建的指针类型。如果尚未创建指针类型，则该属性不存在。

Added in version 3.14.

ctypes 数据类型的常见实例变量:

\_b\_base\_[¶](#ctypes._CData._b_base_ "Link to this definition")

有时 ctypes 数据实例并不拥有它们所包含的内存块，它们只是共享了某个基对象的部分内存块。 [`_b_base_`](#ctypes._CData._b_base_ "ctypes._CData._b_base_") 只读成员是拥有内存块的根 ctypes 对象。

\_b\_needsfree\_[¶](#ctypes._CData._b_needsfree_ "Link to this definition")

这个只读变量在 ctypes 数据实例自身已分配了内存块时为真值，否则为假值。

\_objects[¶](#ctypes._CData._objects "Link to this definition")

这个成员或者为 `None`，或者为一个包含需要保持存活以使内存块的内存保持有效的 Python 对象的字典。 这个对象只是出于调试目的而对外公开；绝对不要修改此字典的内容。

### 基础数据类型[¶](#ctypes-fundamental-data-types-2 "Link to this heading")

_class_ ctypes.\_SimpleCData[¶](#ctypes._SimpleCData "Link to this definition")

这个非公有类是所有基本 ctypes 数据类型的基类。 它在这里被提及是因为它包含基本 ctypes 数据类型共有的属性。 [`_SimpleCData`](#ctypes._SimpleCData "ctypes._SimpleCData") 是 [`_CData`](#ctypes._CData "ctypes._CData") 的子类，因此继承了其方法和属性。 非指针及不包含指针的 ctypes 数据类型现在将可以被封存。

实例拥有一个属性:

value[¶](#ctypes._SimpleCData.value "Link to this definition")

这个属性包含实例的实际值。 对于整数和指针类型，它是一个整数，对于字符类型，它是一个单字符字符串对象或字符串，对于字符指针类型，它是一个 Python 字节串对象或字符串。

当从 ctypes 实例提取 `value` 属性时，通常每次会返回一个新的对象。 `ctypes` 并 _没有_ 实现原始对象返回，它总是会构造一个新的对象。 所有其他 ctypes 对象实例也同样如此。

每个子类都有一个类属性：

\_type\_[¶](#ctypes._SimpleCData._type_ "Link to this definition")

包含一个内部类型码的类属性，表示为单字符的字符串。 请参阅 [基础数据类型](#ctypes-fundamental-data-types) 中的概览。

Types marked \* in the summary may be (or always are) aliases of a different [`_SimpleCData`](#ctypes._SimpleCData "ctypes._SimpleCData") subclass, and will not necessarily use the listed type code. For example, if the platform's long, long long and time\_t C types are the same, then [`c_long`](#ctypes.c_long "ctypes.c_long"), [`c_longlong`](#ctypes.c_longlong "ctypes.c_longlong") and [`c_time_t`](#ctypes.c_time_t "ctypes.c_time_t") all refer to a single class, `c_long`, whose [`_type_`](#ctypes._SimpleCData._type_ "ctypes._SimpleCData._type_") code is `'l'`. The `'L'` code will be unused.

当作为外部函数调用结果，或者举例来说，作为结构字段成员或数组条目被提取时，基本数据类型会被透明地转换为原生 Python 类型。 换句话说，如果某个外部函数的 [`restype`](#ctypes._CFuncPtr.restype "ctypes._CFuncPtr.restype") 是 [`c_char_p`](#ctypes.c_char_p "ctypes.c_char_p")，那么你将总是得到一个 Python 字节串对象，而 _不是_ 一个 `c_char_p` 实例。

基本数据类型的子类 _不会_ 继承这种行为。 因此，如果一个外部函数的 `restype` 是 [`c_void_p`](#ctypes.c_void_p "ctypes.c_void_p") 的子类，则你将从函数调用得到一个该子类的实例。 当然，你可以通过访问 `value` 属性来获取指针的值。

这些是基本 ctypes 数据类型:

_class_ ctypes.c\_byte[¶](#ctypes.c_byte "Link to this definition")

代表 C signed char 数据类型，并将值解读为一个小整数。 该构造器接受一个可选的整数初始值；不会执行溢出检查。

_class_ ctypes.c\_char[¶](#ctypes.c_char "Link to this definition")

代表 C char 数据类型，并将值解读为单个字符。 该构造器接受一个可选的字符串初始值，字符串的长度必须恰好为一个字符。

_class_ ctypes.c\_char\_p[¶](#ctypes.c_char_p "Link to this definition")

当指向一个以零为结束符的字符串时代表 C char\* 数据类型。 对于通用字符指针来说也可能指向二进制数据，必须要使用 `POINTER(c_char)`。 该构造器接受一个整数地址，或者一个字节串对象。

_class_ ctypes.c\_double[¶](#ctypes.c_double "Link to this definition")

代表 C double 数据类型。 该构造器接受一个可选的浮点数初始值。

_class_ ctypes.c\_longdouble[¶](#ctypes.c_longdouble "Link to this definition")

代表 C long double 数据类型。 该构造器接受一个可选的浮点数初始值。 在 `sizeof(long double) == sizeof(double)` 的平台上它是 [`c_double`](#ctypes.c_double "ctypes.c_double") 的一个别名。

_class_ ctypes.c\_float[¶](#ctypes.c_float "Link to this definition")

代表 C float 数据类型。 该构造器接受一个可选的浮点数初始值。

_class_ ctypes.c\_double\_complex[¶](#ctypes.c_double_complex "Link to this definition")

代表 C 语言中的 double complex 数据类型（如果可用）。该构造器接受一个可选的 [`complex`](https://docs.python.org/zh-cn/3/builtins/functions.html#complex "complex") 初始化器。

Added in version 3.14.

_class_ ctypes.c\_float\_complex[¶](#ctypes.c_float_complex "Link to this definition")

代表 C 语言中的 float complex 数据类型（如果可用）。该构造器接受一个可选的 [`complex`](https://docs.python.org/zh-cn/3/builtins/functions.html#complex "complex") 初始化器。

Added in version 3.14.

_class_ ctypes.c\_longdouble\_complex[¶](#ctypes.c_longdouble_complex "Link to this definition")

代表 C 语言中的 long double complex 数据类型（如果可用）。该构造器接受一个可选的 [`complex`](https://docs.python.org/zh-cn/3/builtins/functions.html#complex "complex") 初始化器。

Added in version 3.14.

_class_ ctypes.c\_int[¶](#ctypes.c_int "Link to this definition")

代表 C signed int 数据类型。 该构造器接受一个可选的整数初始值；不会执行溢出检查。 在 `sizeof(int) == sizeof(long)` 的平台上它是 [`c_long`](#ctypes.c_long "ctypes.c_long") 的一个别名。

_class_ ctypes.c\_int8[¶](#ctypes.c_int8 "Link to this definition")

代表 C 8 位 signed int 数据类型。 它是 [`c_byte`](#ctypes.c_byte "ctypes.c_byte") 的一个别名。

_class_ ctypes.c\_int16[¶](#ctypes.c_int16 "Link to this definition")

代表 C 16 位 signed int 数据类型。 通常是 [`c_short`](#ctypes.c_short "ctypes.c_short") 的一个别名。

_class_ ctypes.c\_int32[¶](#ctypes.c_int32 "Link to this definition")

代表 C 32 位 signed int 数据类型。 通常是 [`c_int`](#ctypes.c_int "ctypes.c_int") 的一个别名。

_class_ ctypes.c\_int64[¶](#ctypes.c_int64 "Link to this definition")

代表 C 64 位 signed int 数据类型。 通常是 [`c_longlong`](#ctypes.c_longlong "ctypes.c_longlong") 的一个别名。

_class_ ctypes.c\_long[¶](#ctypes.c_long "Link to this definition")

代表 C signed long 数据类型。 该构造器接受一个可选的整数初始值；不会执行溢出检查。

_class_ ctypes.c\_longlong[¶](#ctypes.c_longlong "Link to this definition")

代表 C signed long long 数据类型。 该构造器接受一个可选的整数初始值；不会执行溢出检查。 在 `sizeof(long long) == sizeof(long)` 的平台上它是 [`c_long`](#ctypes.c_long "ctypes.c_long") 的一个别名。

_class_ ctypes.c\_short[¶](#ctypes.c_short "Link to this definition")

代表 C signed short 数据类型。 该构造器接受一个可选的整数初始值；不会执行溢出检查。

_class_ ctypes.c\_size\_t[¶](#ctypes.c_size_t "Link to this definition")

代表 C `size_t` 数据类型。 通常是另一个无符号整数类型的别名。

_class_ ctypes.c\_ssize\_t[¶](#ctypes.c_ssize_t "Link to this definition")

代表 [`Py_ssize_t`](https://docs.python.org/zh-cn/3/c-api/intro.html#c.Py_ssize_t "Py_ssize_t") 数据类型。 这是 `size_t` 的有符号版本；即 POSIX `ssize_t` 类型。 通常是某个整数类型的别名。

Added in version 3.2.

_class_ ctypes.c\_time\_t[¶](#ctypes.c_time_t "Link to this definition")

代表 C `time_t` 数据类型。 通常是某个整数类型的别名。

Added in version 3.12.

_class_ ctypes.c\_ubyte[¶](#ctypes.c_ubyte "Link to this definition")

代表 C unsigned char 数据类型，它将值解读为一个小整数。 该构造器接受一个可选的整数初始值；不会执行溢出检查。

_class_ ctypes.c\_uint[¶](#ctypes.c_uint "Link to this definition")

代表 C unsigned int 数据类型。 该构造器接受一个可选的整数初始值；不会执行溢出检查。 在 `sizeof(int) == sizeof(long)` 的平台上它是 [`c_ulong`](#ctypes.c_ulong "ctypes.c_ulong") 的一个别名。

_class_ ctypes.c\_uint8[¶](#ctypes.c_uint8 "Link to this definition")

代表 C 8 位 unsigned int 数据类型。 它是 [`c_ubyte`](#ctypes.c_ubyte "ctypes.c_ubyte") 的一个别名。

_class_ ctypes.c\_uint16[¶](#ctypes.c_uint16 "Link to this definition")

代表 C 16 位 unsigned int 数据类型。 通常是 [`c_ushort`](#ctypes.c_ushort "ctypes.c_ushort") 的一个别名。

_class_ ctypes.c\_uint32[¶](#ctypes.c_uint32 "Link to this definition")

代表 C 32 位 unsigned int 数据类型。 通常是 [`c_uint`](#ctypes.c_uint "ctypes.c_uint") 的一个别名。

_class_ ctypes.c\_uint64[¶](#ctypes.c_uint64 "Link to this definition")

代表 C 64 位 unsigned int 数据类型。 通常是 [`c_ulonglong`](#ctypes.c_ulonglong "ctypes.c_ulonglong") 的一个别名。

_class_ ctypes.c\_ulong[¶](#ctypes.c_ulong "Link to this definition")

代表 C unsigned long 数据类型。 该构造器接受一个可选的整数初始值；不会执行溢出检查。

_class_ ctypes.c\_ulonglong[¶](#ctypes.c_ulonglong "Link to this definition")

代表 C unsigned long long 数据类型。 该构造器接受一个可选的整数初始值；不会执行溢出检查。 在 `sizeof(long long) == sizeof(long)` 的平台上它是 [`c_long`](#ctypes.c_long "ctypes.c_long") 的一个别名。

_class_ ctypes.c\_ushort[¶](#ctypes.c_ushort "Link to this definition")

代表 C unsigned short 数据类型。 该构造器接受一个可选的整数初始值；不会执行溢出检查。

_class_ ctypes.c\_void\_p[¶](#ctypes.c_void_p "Link to this definition")

代表 C void\* 类型。 该值被表示为整数形式。 该构造器接受一个可选的整数初始值。

_class_ ctypes.c\_wchar[¶](#ctypes.c_wchar "Link to this definition")

代表 C `wchar_t` 数据类型，并将值解读为单个字符的 unicode 字符串。 该构造器接受一个可选的字符串初始值，字符串的长度必须恰好为一个字符。

_class_ ctypes.c\_wchar\_p[¶](#ctypes.c_wchar_p "Link to this definition")

代表 C wchar\_t\* 数据类型，它必须为指向以零为结束符的宽字符串的指针。 该构造器接受一个整数地址，或一个字符串。

_class_ ctypes.c\_bool[¶](#ctypes.c_bool "Link to this definition")

代表 C bool 数据类型 (更准确地说，是 C99 \_Bool)。 它的值可以为 `True` 或 `False`，并且该构造器接受任何具有逻辑值的对象。

_class_ ctypes.HRESULT[¶](#ctypes.HRESULT "Link to this definition")

代表一个 `HRESULT` 值，它包含某个函数或方法调用的成功或错误信息。

_class_ ctypes.py\_object[¶](#ctypes.py_object "Link to this definition")

代表 C [PyObject](https://docs.python.org/zh-cn/3/c-api/structures.html#c.PyObject "PyObject")\* 数据类型。 不带参数地调用此构造器将创建一个 `NULL` PyObject\* 指针。

`ctypes.wintypes` 模块提供了不少其他 Windows 专属的数据类型，例如 `HWND`, `WPARAM`, `VARIANT_BOOL` 或 `DWORD`。 还定义了一些有用的结构体如 `MSG` 或 `RECT`。

### 结构化数据类型[¶](#structured-data-types "Link to this heading")

_class_ ctypes.Union(_\*args_, _\*\*kw_)[¶](#ctypes.Union "Link to this definition")

本机字节序的联合所对应的抽象基类。

联合与结构体共享共同的属性和行为；详情请参见 [`Structure`](#ctypes.Structure "ctypes.Structure") 的文档。

_class_ ctypes.BigEndianUnion(_\*args_, _\*\*kw_)[¶](#ctypes.BigEndianUnion "Link to this definition")

_大端_ 字节序的联合所对应的抽象基类。

Added in version 3.11.

_class_ ctypes.LittleEndianUnion(_\*args_, _\*\*kw_)[¶](#ctypes.LittleEndianUnion "Link to this definition")

_小端_ 字节序的联合所对应的抽象基类。

Added in version 3.11.

_class_ ctypes.BigEndianStructure(_\*args_, _\*\*kw_)[¶](#ctypes.BigEndianStructure "Link to this definition")

_大端_ 字节序的结构体所对应的抽象基类。

_class_ ctypes.LittleEndianStructure(_\*args_, _\*\*kw_)[¶](#ctypes.LittleEndianStructure "Link to this definition")

_小端_ 字节序的结构体所对应的抽象基类。

非本机字节序的结构体和联合不能包含指针类型字段，或任何其他包含指针类型字段的数据类型。

_class_ ctypes.Structure(_\*args_, _\*\*kw_)[¶](#ctypes.Structure "Link to this definition")

_本机_ 字节序的结构体所对应的抽象基类。

具体的结构和联合类型必须通过子类化这些类型之一来创建，并且至少要定义一个 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_") 类变量。 `ctypes` 将创建允许通过直接属性访问读写这些字段的 [descriptor](https://docs.python.org/zh-cn/3/glossary.html#term-descriptor)。 它们是

\_fields\_[¶](#ctypes.Structure._fields_ "Link to this definition")

一个定义结构体字段的序列。 其中的条目必须为 2 元组或 3 元组。 元组的第一项是字段名称，第二项指明字段类型；它可以是任何 ctypes 数据类型。

对于整数类型字段例如 [`c_int`](#ctypes.c_int "ctypes.c_int")，可以给定第三个可选项。 它必须是一个定义字段比特位宽度的小正整数。

字段名称在一个结构体或联合中必须唯一。 不会检查这个唯一性，但当名称出现重复时将只有一个字段可被访问。

可以在定义 Structure 子类的类语句 _之后_ 再定义 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_") 类变量，这将允许创建直接或间接引用其自身的数据类型:

class List(Structure):
    pass
List.\_fields\_ \= \[("pnext", POINTER(List)),
                 ...
                \]

类变量 `_fields_` 只能设置一次。后续的赋值操作将会引发 [`AttributeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#AttributeError "AttributeError")。

此外，类变量 `_fields_` 必须在结构体或联合类型首次使用前定义：包括创建实例或子类、对其调用 [`sizeof()`](#ctypes.sizeof "ctypes.sizeof") 等情况。后续对 `_fields_` 的赋值会引发 [`AttributeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#AttributeError "AttributeError")。如果在上述使用场景前未设置 `_fields_`，则该结构体或联合将没有自身的字段，就如同 `_fields_` 为空一样。

结构体类型的子子类会继承基类的字段，再加上子子类中定义的 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_")，如果有的话。

\_pack\_[¶](#ctypes.Structure._pack_ "Link to this definition")

一个可选的小整数，它允许重写实例中结构体字段的对齐值。

这仅针对与 MSVC 兼容的内存布局实现 (参见 [`_layout_`](#ctypes.Structure._layout_ "ctypes.Structure._layout_"))。

将 `_pack_` 设为 0 与完全不设置它是一样的。 在其他情况下，该值必须为二的正整数乘方。 其效果等价于 C 中的 `#pragma pack(N)`，只是 `ctypes` 可能允许比编译器所接受的更大的 _n_ 值。

当为 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_") 赋值时，`_pack_` 必须已被定义，否则它将不起作用。

从 3.14 版起已弃用，将在 3.19 版中移除: 由于历史原因，如果 `_pack_` 为非零值，默认情况下将使用与 MSVC 兼容的布局。在非 Windows 平台上，这一默认行为已被弃用，并计划在 Python 3.19 中变为错误。如果确实需要此行为，请显式将 [`_layout_`](#ctypes.Structure._layout_ "ctypes.Structure._layout_") 设置为 `'ms'`。

\_align\_[¶](#ctypes.Structure._align_ "Link to this definition")

一个可选的小整数，它允许增加针对内存执行打包或解包时的对齐值。

该值必须不为负数。 其效果等价于 GCC 中的 `__attribute__((aligned(N)))` 或 MSVC 中的 `#pragma align(N)`，只是 `ctypes` 可能允许编译器会拒绝的值。

`_align_` 只能 _增加_ 一个结构体要求的对齐值。 将其设为 0 或 1 将没有任何效果。

不建议使用不为二的乘方的值，这可能导致意外的行为。

当为 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_") 赋值时 `_align_` 必须已被定义，否则它将不起作用。

Added in version 3.13.

\_layout\_[¶](#ctypes.Structure._layout_ "Link to this definition")

一个可选字符串，用于指定结构体/联合的布局。目前它可以设置为：

-   `"ms"`：微软编译器（MSVC）所使用的布局。在 GCC 和 Clang 上，可以通过 `__attribute__((ms_struct))` 来选择此布局。
    
-   `"gcc-sysv"`：GCC 在 System V 或“类 SysV”数据模型中使用的布局，适用于 Linux 和 macOS 系统。采用此布局时，[`_pack_`](#ctypes.Structure._pack_ "ctypes.Structure._pack_") 必须保持未设置状态或设为零。
    

如果未显式设置，`ctypes` 将使用与平台约定相匹配的默认值。此默认值可能会在未来的 Python 版本中发生变化（例如，当新平台获得官方支持时，或者当发现相似平台之间存在差异时）。目前，默认值如下：

-   在Windows平台上： `"ms"`
    
-   当指定了 [`_pack_`](#ctypes.Structure._pack_ "ctypes.Structure._pack_") 时: `"ms"`。（此行为已弃用，详见 `_pack_` 的文档。）
    
-   在非Windows平台上: `"gcc-sysv"`
    

在为 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_") 赋值时，`_layout_` 必须已被定义，否则它将不起作用。

Added in version 3.14.

\_anonymous\_[¶](#ctypes.Structure._anonymous_ "Link to this definition")

一个可选的序列，它会列出未命名（匿名）字段的名称。 当 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_") 被赋值时必须已经定义了 [`_anonymous_`](#ctypes.Structure._anonymous_ "ctypes.Structure._anonymous_")，否则它将没有效果。

在此变量中列出的字段必须为结构体或联合类型字段。 `ctypes` 将在结构体类型中创建描述器以允许直接访问嵌套字段，而无需创建对应的结构体或联合字段。

以下是一个示例类型（Windows）:

class \_U(Union):
    \_fields\_ \= \[("lptdesc", POINTER(TYPEDESC)),
                ("lpadesc", POINTER(ARRAYDESC)),
                ("hreftype", HREFTYPE)\]

class TYPEDESC(Structure):
    \_anonymous\_ \= ("u",)
    \_fields\_ \= \[("u", \_U),
                ("vt", VARTYPE)\]

`TYPEDESC` 结构体描述了一个 COM 数据类型，`vt` 字段指明哪个联合字段是有效的。 由于 `u` 字段被定义为匿名字段，现在可以直接从 TYPEDESC 实例访问成员。 `td.lptdesc` 和 `td.u.lptdesc` 是等价的，但前者速度更快，因为它不需要创建临时的联合实例:

td \= TYPEDESC()
td.vt \= VT\_PTR
td.lptdesc \= POINTER(some\_type)
td.u.lptdesc \= POINTER(some\_type)

可以定义结构体的子类，它们会继承基类的字段。 如果子类定义具有单独的 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_") 变量，在其中指定的字段会被添加到基类的字段中。

结构体和联合的构造器均可接受位置和关键字参数。 位置参数用于按照 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_") 中的出现顺序来初始化成员字段。 构造器中的关键字参数会被解读为属性赋值，因此它们将以相应的名称来初始化 `_fields_`，或为不存在于 `_fields_` 中的名称创建新的属性。

_class_ ctypes.CField(_\*args_, _\*\*kw_)[¶](#ctypes.CField "Link to this definition")

结构 ([`Structure`](#ctypes.Structure "ctypes.Structure")) 和联合 ([`Union`](#ctypes.Union "ctypes.Union")) 字段的描述符。 例如:

\>>> class Color(Structure):
...     \_fields\_ \= (
...         ('red', c\_uint8),
...         ('green', c\_uint8),
...         ('blue', c\_uint8),
...         ('intense', c\_bool, 1),
...         ('blinking', c\_bool, 1),
...    )
...
\>>> Color.red
<ctypes.CField 'red' type=c\_ubyte, ofs=0, size=1>
\>>> Color.green.type
<class 'ctypes.c\_ubyte'>
\>>> Color.blue.byte\_offset
2
\>>> Color.intense
<ctypes.CField 'intense' type=c\_bool, ofs=3, bit\_size=1, bit\_offset=0>
\>>> Color.blinking.bit\_offset
1

所有属性均为只读。

`CField` 对象通过 [`_fields_`](#ctypes.Structure._fields_ "ctypes.Structure._fields_") 创建；请勿直接实例化该类。

Added in version 3.14: 以前，描述符只有 `offset` 和 `size` 属性以及一个可读的字符串表示形式；`CField` 类无法直接使用。

name[¶](#ctypes.CField.name "Link to this definition")

字段的名称，为字符串形式。

type[¶](#ctypes.CField.type "Link to this definition")

字段的类型，为一个 [ctypes 类](#ctypes-data-types)。

offset[¶](#ctypes.CField.offset "Link to this definition")

byte\_offset[¶](#ctypes.CField.byte_offset "Link to this definition")

字段的偏移量，以字节为单位。

对于位域，这是基础字节对齐的 _存储单元_ 的偏移量；详见 [`bit_offset`](#ctypes.CField.bit_offset "ctypes.CField.bit_offset")。

byte\_size[¶](#ctypes.CField.byte_size "Link to this definition")

字段的大小，以字节为单位。

对于位域，这是基础 _存储单元_ 的大小。通常，它与位域类型的大小相同。

size[¶](#ctypes.CField.size "Link to this definition")

对于非位域，与 [`byte_size`](#ctypes.CField.byte_size "ctypes.CField.byte_size") 等效。

对于位域，该属性包含一个向后兼容的位打包值，它结合了 [`bit_size`](#ctypes.CField.bit_size "ctypes.CField.bit_size") 和 [`bit_offset`](#ctypes.CField.bit_offset "ctypes.CField.bit_offset")。建议优先使用这两个显式属性。

is\_bitfield[¶](#ctypes.CField.is_bitfield "Link to this definition")

如果这是位域，则为 True。

bit\_offset[¶](#ctypes.CField.bit_offset "Link to this definition")

bit\_size[¶](#ctypes.CField.bit_size "Link to this definition")

位域在其 _存储单元_ 内的位置，即位于从 [`byte_offset`](#ctypes.CField.byte_offset "ctypes.CField.byte_offset") 开始的 [`byte_size`](#ctypes.CField.byte_size "ctypes.CField.byte_size") 字节内存范围内。

要获取位域的值，请先将存储单元作为整数读取，然后按 `bit_offset` 进行 [左移](https://docs.python.org/zh-cn/3/reference/expressions.html#shifting) 操作，并取结果的最低 `bit_size` 位。

对于非位域，`bit_offset` 为零，且 `bit_size` 等于 `byte_size * 8`。

is\_anonymous[¶](#ctypes.CField.is_anonymous "Link to this definition")

如果此字段是匿名的（即它包含应合并到所属结构体或联合中的嵌套子字段），则为 True。

### 数组与指针[¶](#arrays-and-pointers "Link to this heading")

_class_ ctypes.Array(_\*args_)[¶](#ctypes.Array "Link to this definition")

数组的抽象基类。

创建实体数组类型的推荐方式是通过将任意 `ctypes` 数据类型与一个非负整数相乘。 作为替代方式，你也可以子类化这个类型并定义 [`_length_`](#ctypes.Array._length_ "ctypes.Array._length_") 和 [`_type_`](#ctypes.Array._type_ "ctypes.Array._type_") 类变量。 数组元素可使用标准的抽取和切片操作来进行读写；对于切片读取，结果对象本身 _不是_ 一个 [`Array`](#ctypes.Array "ctypes.Array")。

Array 是对应其元素类型的 [泛型](https://docs.python.org/zh-cn/3/library/typing.html#generics) 对象。

\_length\_[¶](#ctypes.Array._length_ "Link to this definition")

一个指明数组中元素数量的正整数。 超出范围的抽取会导致 [`IndexError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#IndexError "IndexError")。 该值将由 [`len()`](https://docs.python.org/zh-cn/3/builtins/functions.html#len "len") 返回。

\_type\_[¶](#ctypes.Array._type_ "Link to this definition")

指明数组中每个元素的类型。

Array 子类构造器可接受位置参数，用来按顺序初始化元素。

ctypes.ARRAY(_type_, _length_)[¶](#ctypes.ARRAY "Link to this definition")

创建一个数组。 等价于 `type * length`，其中 _type_ 是一个 `ctypes` 数据类型而 _length_ 是一个整数。

_class_ ctypes.\_Pointer[¶](#ctypes._Pointer "Link to this definition")

私有对象，指针的抽象基类。

实际的指针类型是通过调用 [`POINTER()`](#ctypes.POINTER "ctypes.POINTER") 并附带其将指向的类型来创建的；这会由 [`pointer()`](#ctypes.pointer "ctypes.pointer") 自动完成。

如果一个指针指向的是数组，则其元素可使用标准的抽取和切片方式来读写。 指针对象没有长度，因此 [`len()`](https://docs.python.org/zh-cn/3/builtins/functions.html#len "len") 将引发 [`TypeError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#TypeError "TypeError")。 抽取负值将会从指针 _之前_ 的内存中读取（与 C 一样），并且超出范围的抽取将可能因非法访问而导致崩溃（视你的运气而定）。

\_type\_[¶](#ctypes._Pointer._type_ "Link to this definition")

指明所指向的类型。

contents[¶](#ctypes._Pointer.contents "Link to this definition")

返回指针所指向的对象。 对此属性赋值会使指针改为指向所赋值的对象。

### 异常[¶](#exceptions "Link to this heading")

_exception_ ctypes.ArgumentError[¶](#ctypes.ArgumentError "Link to this definition")

此异常会在外部函数无法对某个传入参数执行转换时被引发。

_exception_ ctypes.COMError(_hresult_, _text_, _details_)[¶](#ctypes.COMError "Link to this definition")

当 COM 方法调用失败时，会引发此异常。

hresult[¶](#ctypes.COMError.hresult "Link to this definition")

表示错误代码的整数值。

text[¶](#ctypes.COMError.text "Link to this definition")

错误消息。

details[¶](#ctypes.COMError.details "Link to this definition")

5 元组 `(descr, source, helpfile, helpcontext, progid)`。

_descr_ 是文本描述。_source_ 是引发错误的类或应用程序所对应的依赖于语言的 `ProgID`。_helpfile_ 是帮助文件的路径。_helpcontext_ 是帮助上下文标识符。_progid_ 是定义该错误的接口的 `ProgID`。

Added in version 3.14.
