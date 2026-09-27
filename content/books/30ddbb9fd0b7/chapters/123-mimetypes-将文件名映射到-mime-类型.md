**源代码:** [Lib/mimetypes.py](https://github.com/python/cpython/tree/3.14/Lib/mimetypes.py)

* * *

`mimetypes` 模块可以在文件名或 URL 和关联到文件扩展名的 MIME 类型之间执行转换。 所提供的转换包括从文件名到 MIME 类型和从 MIME 类型到文件扩展名；后一种转换不支持编码格式。

该模块提供了一个类和一些便捷函数。 这些函数是该模块通常的接口，但某些应用程序可能也会希望使用类。

下列函数提供了此模块的主要接口。 如果此模块尚未被初始化，它们将会调用 [`init()`](#mimetypes.init "mimetypes.init")，如果它们依赖于 `init()` 所设置的信息的话。

mimetypes.guess\_type(_url_, _strict\=True_)[¶](#mimetypes.guess_type "Link to this definition")

根据 _url_ 给出的文件名、路径或 URL 来猜测文件的类型，URL 可以为字符串或 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object)。

返回值是一个元组 `(type, encoding)` 其中 _type_ 在无法猜测（后缀不存在或者未知）时为 `None`，或者为 `'type/subtype'` 形式的字符串，可以作为 MIME 标头。

_encoding_ 在无编码格式时为 `None`，或者为程序所用的编码格式 (例如 **compress** 或 **gzip**)。 它可以作为 标头，但 **不可** 作为 标头。 映射是表格驱动的。 编码格式后缀对大小写敏感；类型后缀会先以大小写敏感方式检测再以大小写不敏感方式检测。

可选的 _strict_ 参数是一个旗标，指明要将已知 MIME 类型限制在 [IANA 已注册的](https://www.iana.org/assignments/media-types/media-types.xhtml) 官方类型之内。 但是，此模块的行为也取决于底层操作系统。只能识别操作系统识别的或在Python内部数据库中明确注册的文件类型。当 _strict_ 为 `True` 时（默认值），则仅支持 IANA 类型；当 _strict_ 为 `False` 时，则还支持某些附加的非标准但常用的 MIME 类型。

自 3.13 版起已处于 [Soft deprecated](https://docs.python.org/zh-cn/3/glossary.html#term-soft-deprecated) 状态: Passing a file path instead of URL. Use [`guess_file_type()`](#mimetypes.guess_file_type "mimetypes.guess_file_type") for this.

mimetypes.guess\_file\_type(_path_, _\*_, _strict\=True_)[¶](#mimetypes.guess_file_type "Link to this definition")

根据由 _path_ 给出的文件路径猜测其类型。 类似于 [`guess_type()`](#mimetypes.guess_type "mimetypes.guess_type") 函数，但可接受路径而非 URL。 路径可以是字符串、字节串对象或 [path-like object](https://docs.python.org/zh-cn/3/glossary.html#term-path-like-object)。

Added in version 3.13.

mimetypes.guess\_all\_extensions(_type_, _strict\=True_)[¶](#mimetypes.guess_all_extensions "Link to this definition")

根据由 _type_ 给出的文件 MIME 类型猜测其扩展名。 返回值是由所有可能的文件扩展名组成的字符串列表，包括开头的点号 (`'.'`)。 这些扩展名不保证能关联到任何特定的数据流，但是将会由 [`guess_type()`](#mimetypes.guess_type "mimetypes.guess_type") 和 [`guess_file_type()`](#mimetypes.guess_file_type "mimetypes.guess_file_type") 映射到 MIME 类型 _type_。

可选的 _strict_ 参数具有与 [`guess_type()`](#mimetypes.guess_type "mimetypes.guess_type") 函数一致的含义。

mimetypes.guess\_extension(_type_, _strict\=True_)[¶](#mimetypes.guess_extension "Link to this definition")

根据由 _type_ 给出的文件 MIME 类型猜测其扩展名。 返回值是一个表示文件扩展名的字符串，包括开头的点号 (`'.'`)。 该扩展名不保证能关联到任何特定的数据流，但是将会由 [`guess_type()`](#mimetypes.guess_type "mimetypes.guess_type") 和 [`guess_file_type()`](#mimetypes.guess_file_type "mimetypes.guess_file_type") 映射到 MIME 类型 _type_。 如果不能猜测出 _type_ 的扩展名，则返回 `None`。

可选的 _strict_ 参数具有与 [`guess_type()`](#mimetypes.guess_type "mimetypes.guess_type") 函数一致的含义。

有一些附加函数和数据项可被用于控制此模块的行为。

mimetypes.init(_files\=None_)[¶](#mimetypes.init "Link to this definition")

初始化内部数据结构。 _files_ 如果给出则必须是一个文件名序列，它应当被用于协助默认的类型映射。 如果省略则要使用的文件名会从 [`knownfiles`](#mimetypes.knownfiles "mimetypes.knownfiles") 中获取； 在 Windows 上，将会载入当前注册表设置。 在 _files_ 或 `knownfiles` 中指定的每个文件名的优先级将高于在它之前的文件名。 [`init()`](#mimetypes.init "mimetypes.init") 允许被重复调用。

为 _files_ 指定一个空列表将防止应用系统默认选项：将只保留来自内置列表的常用值。

如果 _files_ 为 `None` 则内部数据结构会完全重建为其初始默认值。 这是一个稳定操作并将在多次调用时产生相同的结果。

在 3.2 版本发生变更: 在之前版本中，Windows 注册表设置会被忽略。

mimetypes.read\_mime\_types(_file_)[¶](#mimetypes.read_mime_types "Link to this definition")

Load the type map given in the file named by _file_, if it exists. _file_ must be a string specifying the name of the file to read. The type map is returned as a dictionary mapping file extensions, including the leading dot (`'.'`), to strings of the form `'type/subtype'`. If the file does not exist or cannot be read, `None` is returned.

mimetypes.add\_type(_type_, _ext_, _strict\=True_)[¶](#mimetypes.add_type "Link to this definition")

添加一个从 MIME 类型 _type_ 到扩展名 _ext_ 的映射。 当扩展名已知时，新类型将替代旧类型。 当类型已知时，扩展名将被添加到已知扩展名列表。

当 _strict_ 为 `True` 时（默认值），映射将被添加到官方 MIME 类型，否则添加到非标准类型。

mimetypes.inited[¶](#mimetypes.inited "Link to this definition")

指明全局数据结构是否已被初始化的旗标。 这会由 [`init()`](#mimetypes.init "mimetypes.init") 设为 `True`。

mimetypes.knownfiles[¶](#mimetypes.knownfiles "Link to this definition")

通常安装的类型映射文件名列表。 这些文件一般被命名为 `mime.types` 并会由不同的包安装在不同的位置。

mimetypes.suffix\_map[¶](#mimetypes.suffix_map "Link to this definition")

将后缀映射到其他后缀的字典。 它被用来允许识别已编码的文件，其编码格式和类型是由相同的扩展名来指明的。 例如，`.tgz` 扩展名被映射到 `.tar.gz` 以允许编码格式和类型被分别识别。

mimetypes.encodings\_map[¶](#mimetypes.encodings_map "Link to this definition")

映射文件扩展名到编码格式类型的字典。

mimetypes.types\_map[¶](#mimetypes.types_map "Link to this definition")

映射文件扩展名到 MIME 类型的字典。

mimetypes.common\_types[¶](#mimetypes.common_types "Link to this definition")

映射文件扩展名到非标准但常见的 MIME 类型的字典。

此模块一个使用示例:

\>>> import mimetypes
\>>> mimetypes.init()
\>>> mimetypes.knownfiles
\['/etc/mime.types', '/etc/httpd/mime.types', ... \]
\>>> mimetypes.suffix\_map\['.tgz'\]
'.tar.gz'
\>>> mimetypes.encodings\_map\['.gz'\]
'gzip'
\>>> mimetypes.types\_map\['.tgz'\]
'application/x-tar-gz'

## MimeTypes 对象[¶](#mimetypes-objects "Link to this heading")

[`MimeTypes`](#mimetypes.MimeTypes "mimetypes.MimeTypes") 类可以被用于那些需要多个 MIME 类型数据库的应用程序；它提供了 `mimetypes` 模块所提供的类似接口。

_class_ mimetypes.MimeTypes(_filenames\=()_, _strict\=True_)[¶](#mimetypes.MimeTypes "Link to this definition")

This class represents a MIME-types database. By default, it provides access to the same database as the rest of this module. The initial database is created from Python's built-in MIME type tables. It may be extended by loading additional `mime.types`\-style files into the database using the [`read()`](#mimetypes.MimeTypes.read "mimetypes.MimeTypes.read") or [`readfp()`](#mimetypes.MimeTypes.readfp "mimetypes.MimeTypes.readfp") methods. The mapping dictionaries may also be cleared before loading additional data if the default data is not desired.

可选的 _filenames_ 形参可被用来让附加文件被载入到默认数据库“之上”。

suffix\_map[¶](#mimetypes.MimeTypes.suffix_map "Link to this definition")

Dictionary mapping suffixes to suffixes. This is used to allow recognition of encoded files for which the encoding and the type are indicated by the same extension. For example, the `.tgz` extension is mapped to `.tar.gz` to allow the encoding and type to be recognized separately. This is initialized with some predefined values.

encodings\_map[¶](#mimetypes.MimeTypes.encodings_map "Link to this definition")

Dictionary mapping filename extensions to encoding types. This is initialized with some predefined values.

types\_map[¶](#mimetypes.MimeTypes.types_map "Link to this definition")

Tuple containing two dictionaries, mapping filename extensions to MIME types: the first dictionary is for the non-standards types and the second one is for the standard types. They are initialized with some predefined values and MIME type information loaded from files specified by the _filenames_ argument.

types\_map\_inv[¶](#mimetypes.MimeTypes.types_map_inv "Link to this definition")

Tuple containing two dictionaries, mapping MIME types to a list of filename extensions: the first dictionary is for the non-standards types and the second one is for the standard types. They are initialized with some predefined values and MIME type information loaded from files specified by the _filenames_ argument.

guess\_extension(_type_, _strict\=True_)[¶](#mimetypes.MimeTypes.guess_extension "Link to this definition")

类似于 [`guess_extension()`](#mimetypes.guess_extension "mimetypes.guess_extension") 函数，使用存储的表作为对象的一部分。

guess\_type(_url_, _strict\=True_)[¶](#mimetypes.MimeTypes.guess_type "Link to this definition")

类似于 [`guess_type()`](#mimetypes.guess_type "mimetypes.guess_type") 函数，使用存储的表作为对象的一部分。

guess\_file\_type(_path_, _\*_, _strict\=True_)[¶](#mimetypes.MimeTypes.guess_file_type "Link to this definition")

类似于 [`guess_file_type()`](#mimetypes.guess_file_type "mimetypes.guess_file_type") 函数，使用存储的表作为对象的一部分。

Added in version 3.13.

guess\_all\_extensions(_type_, _strict\=True_)[¶](#mimetypes.MimeTypes.guess_all_extensions "Link to this definition")

类似于 [`guess_all_extensions()`](#mimetypes.guess_all_extensions "mimetypes.guess_all_extensions") 函数，使用存储的表作为对象的一部分。

read(_filename_, _strict\=True_)[¶](#mimetypes.MimeTypes.read "Link to this definition")

从名称为 _filename_ 的文件载入 MIME 信息。 此方法使用 [`readfp()`](#mimetypes.MimeTypes.readfp "mimetypes.MimeTypes.readfp") 来解析文件。

如果 _strict_ 为 `True`，信息将被添加到标准类型列表，否则添加到非标准类型列表。

readfp(_fp_, _strict\=True_)[¶](#mimetypes.MimeTypes.readfp "Link to this definition")

从打开的文件 _fp_ 载入 MIME 类型信息。 文件必须具有标准 `mime.types` 文件的格式。

如果 _strict_ 为 `True`，信息将被添加到标准类型列表，否则添加到非标准类型列表。

read\_windows\_registry(_strict\=True_)[¶](#mimetypes.MimeTypes.read_windows_registry "Link to this definition")

从 Windows 注册表载入 MIME 类型信息。

如果 _strict_ 为 `True`，信息将被添加到标准类型列表，否则添加到非标准类型列表。

Added in version 3.2.

add\_type(_type_, _ext_, _strict\=True_)[¶](#mimetypes.MimeTypes.add_type "Link to this definition")

添加一个从 MIME 类型 _type_ 到扩展名 _ext_ 的映射。有效的扩展名以“.”开头或为空。 当扩展名已知时，新类型将替代旧类型。 当类型已知时，扩展名将被添加到已知扩展名列表。

当 _strict_ 为 `True` 时（默认值），映射将被添加到官方 MIME 类型，否则添加到非标准类型。

从 3.14 版起已弃用，将在 3.16 版中移除: 无效的、未点分隔的扩展名在 Python 3.16 中将引发 [`ValueError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#ValueError "ValueError")。

## 命令行用法[¶](#command-line-usage "Link to this heading")

`mimetypes` 模块可以在命令行下作为脚本来执行。

python \-m mimetypes \[\-h\] \[\-e\] \[\-l\] type \[type ...\]

可以接受以下选项：

\-h[¶](#cmdoption-mimetypes-h "Link to this definition")

\--help[¶](#cmdoption-mimetypes-help "Link to this definition")

显示帮助信息并退出。

\-e[¶](#cmdoption-mimetypes-e "Link to this definition")

\--extension[¶](#cmdoption-mimetypes-extension "Link to this definition")

猜测扩展名而不是类型。

\-l[¶](#cmdoption-mimetypes-l "Link to this definition")

\--lenient[¶](#cmdoption-mimetypes-lenient "Link to this definition")

此外，还可以搜索一些常见但非标准的类型。

默认情况下，脚本将 MIME 类型转换为文件扩展名。 但是，如果指定了 `--extension`，它会将文件扩展名转换为 MIME 类型。

For each `type` entry, the script writes a line into the standard output stream. If an unknown type occurs, it writes an error message into the standard output stream and exits with the return code `1`.

## 命令行示例[¶](#command-line-example "Link to this heading")

以下是一些 `mimetypes` 命令行界面的典型用法示例：

$ \# get a MIME type by a file name
$ python \-m mimetypes filename.png
type: image/png encoding: None

$ \# get a MIME type by a URL
$ python \-m mimetypes https://example.com/filename.txt
type: text/plain encoding: None

$ \# get a complex MIME type
$ python \-m mimetypes filename.tar.gz
type: application/x-tar encoding: gzip

$ \# get a MIME type for a rare file extension
$ python \-m mimetypes filename.pict
error: media type unknown for filename.pict

$ \# now look in the extended database built into Python
$ python \-m mimetypes \--lenient filename.pict
type: image/pict encoding: None

$ \# get a file extension by a MIME type
$ python \-m mimetypes \--extension text/javascript
.js

$ \# get a file extension by a rare MIME type
$ python \-m mimetypes \--extension text/xul
error: unknown type text/xul

$ \# now look in the extended database again
$ python \-m mimetypes \--extension \--lenient text/xul
.xul

$ \# try to feed an unknown file extension
$ python \-m mimetypes filename.sh filename.nc filename.xxx filename.txt
type: application/x-sh encoding: None
type: application/x-netcdf encoding: None
error: media type unknown for filename.xxx
type: text/plain encoding: None

$ \# try to feed an unknown MIME type
$ python \-m mimetypes \--extension audio/aac audio/opus audio/future audio/x-wav
.aac
.opus
error: unknown type audio/future
