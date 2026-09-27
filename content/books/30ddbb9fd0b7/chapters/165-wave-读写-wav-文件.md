**源代码:** [Lib/wave.py](https://github.com/python/cpython/tree/3.14/Lib/wave.py)

* * *

The `wave` module provides a convenient interface to the Waveform Audio "WAVE" (or "WAV") file format. Only uncompressed PCM encoded wave files are supported.

在 3.12 版本发生变更: 增加了对 `WAVE_FORMAT_EXTENSIBLE` 标头的支持，要求扩展格式为 `KSDATAFORMAT_SUBTYPE_PCM`。

`wave` 模块定义了以下函数和异常：

wave.open(_file_, _mode\=None_)[¶](#wave.open "Link to this definition")

If _file_ is a string, open the file by that name, otherwise treat it as a file-like object. _mode_ can be:

`'rb'`

只读模式。

`'wb'`

只写模式。

注意不支持同时读写 WAV 文件。

_mode_ 设为 `'rb'` 时返回一个 [`Wave_read`](#wave.Wave_read "wave.Wave_read") 对象，而 _mode_ 设为 `'wb'` 时返回一个 [`Wave_write`](#wave.Wave_write "wave.Wave_write") 对象。如果省略 _mode_ 并指定 _file_ 来传入一个文件型对象，则 `file.mode` 会被用作 _mode_ 的默认值。

如果你传入一个文件型对象，当调用 wave 对象的 `close()` 方法时并不会真正关闭它；调用者需要负责关闭文件对象。

[`open()`](#wave.open "wave.open") 函数可以在 [`with`](https://docs.python.org/zh-cn/3/reference/compound_stmts.html#with) 语句中使用。 当 `with` 代码块结束时，[`Wave_read.close()`](#wave.Wave_read.close "wave.Wave_read.close") 或 [`Wave_write.close()`](#wave.Wave_write.close "wave.Wave_write.close") 方法会被调用。

在 3.4 版本发生变更: 添加了对不可查找文件的支持。

_exception_ wave.Error[¶](#wave.Error "Link to this definition")

当不符合 WAV 格式规范或遇到实现缺陷时引发的错误。

## Wave\_read 对象[¶](#wave-read-objects "Link to this heading")

_class_ wave.Wave\_read[¶](#wave.Wave_read "Link to this definition")

读取一个 WAV 文件。

由 [`open()`](#wave.open "wave.open") 返回的 Wave\_read 对象，有以下几种方法:

close()[¶](#wave.Wave_read.close "Link to this definition")

关闭由 `wave` 打开的流，并使实例不可用。 此方法会在对象回收时自动调用。

getnchannels()[¶](#wave.Wave_read.getnchannels "Link to this definition")

返回声道数量 (`1` 为单声道，`2` 为立体声)。

getsampwidth()[¶](#wave.Wave_read.getsampwidth "Link to this definition")

返回采样字节长度。

getframerate()[¶](#wave.Wave_read.getframerate "Link to this definition")

返回采样频率。

getnframes()[¶](#wave.Wave_read.getnframes "Link to this definition")

返回音频总帧数。

getcomptype()[¶](#wave.Wave_read.getcomptype "Link to this definition")

返回压缩类型（只支持 `'NONE'` 类型）。

getcompname()[¶](#wave.Wave_read.getcompname "Link to this definition")

[`getcomptype()`](#wave.Wave_read.getcomptype "wave.Wave_read.getcomptype") 的人类可读版本。通常 `'not compressed'` 对应 `'NONE'`。

getparams()[¶](#wave.Wave_read.getparams "Link to this definition")

返回一个 [`namedtuple()`](https://docs.python.org/zh-cn/3/library/collections.html#collections.namedtuple "collections.namedtuple") `(nchannels, sampwidth, framerate, nframes, comptype, compname)`，等价于 `get*()` 方法的输出。

readframes(_n_)[¶](#wave.Wave_read.readframes "Link to this definition")

读取并返回以 [`bytes`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#bytes "bytes") 对象表示的最多 _n_ 帧音频。

rewind()[¶](#wave.Wave_read.rewind "Link to this definition")

重置文件指针至音频开头。

The following two methods are defined for compatibility with the old `aifc` module, and don't do anything interesting.

getmarkers()[¶](#wave.Wave_read.getmarkers "Link to this definition")

Returns `None`.

从 3.13 版起已弃用，将在 3.15 版中移除: The method only existed for compatibility with the `aifc` module which has been removed in Python 3.13.

getmark(_id_)[¶](#wave.Wave_read.getmark "Link to this definition")

Raise an error.

从 3.13 版起已弃用，将在 3.15 版中移除: The method only existed for compatibility with the `aifc` module which has been removed in Python 3.13.

以下两个方法定义了一个在二者间通用的"位置"概念，在其他方面则依赖于具体实现。

setpos(_pos_)[¶](#wave.Wave_read.setpos "Link to this definition")

设置文件指针到指定位置。

tell()[¶](#wave.Wave_read.tell "Link to this definition")

返回当前文件指针位置。

## Wave\_write 对象[¶](#wave-write-objects "Link to this heading")

_class_ wave.Wave\_write[¶](#wave.Wave_write "Link to this definition")

写入一个 WAV 文件。

Wave\_write 对象，由 [`open()`](#wave.open "wave.open") 返回。

对于可查找的输出流，`wave` 头将自动更新以反映实际写入的帧数。 对于不可查找的流，当写入第一帧时 _nframes_ 值必须是准确的。 要获取准确的 _nframes_ 值可以通过调用 [`setnframes()`](#wave.Wave_write.setnframes "wave.Wave_write.setnframes") 或 [`setparams()`](#wave.Wave_write.setparams "wave.Wave_write.setparams") 并附带 [`close()`](#wave.Wave_write.close "wave.Wave_write.close") 被调用之前将要写入的帧数然后使用 [`writeframesraw()`](#wave.Wave_write.writeframesraw "wave.Wave_write.writeframesraw") 来写入帧数据，或者通过调用 [`writeframes()`](#wave.Wave_write.writeframes "wave.Wave_write.writeframes") 并附带所有要写入的帧。 在后一种情况下 `writeframes()` 将计算数据中的帧数并在写入帧数据之前相应地设置 _nframes_。

在 3.4 版本发生变更: 添加了对不可查找文件的支持。

Wave\_write 对象具有以下方法:

close()[¶](#wave.Wave_write.close "Link to this definition")

确保 _nframes_ 正确，并关闭由 `wave` 打开的文件。 此方法会在对象回收时调用。 如果输出流不可查找且 _nframes_ 与实际写入的帧数不匹配，将引发异常。

setnchannels(_n_)[¶](#wave.Wave_write.setnchannels "Link to this definition")

设置声道数。

getnchannels()[¶](#wave.Wave_write.getnchannels "Link to this definition")

返回声道数。

setsampwidth(_n_)[¶](#wave.Wave_write.setsampwidth "Link to this definition")

设置采样宽度为 _n_ 个字节。

getsampwidth()[¶](#wave.Wave_write.getsampwidth "Link to this definition")

返回以字节数表示的采样宽度。

setframerate(_n_)[¶](#wave.Wave_write.setframerate "Link to this definition")

设置采样频率为 _n_。

在 3.2 版本发生变更: 对此方法的非整数输入会被舍入到最接近的整数。

getframerate()[¶](#wave.Wave_write.getframerate "Link to this definition")

返回帧速率。

setnframes(_n_)[¶](#wave.Wave_write.setnframes "Link to this definition")

设置总帧数为 _n_。 如果与之后实际写入的帧数不一致此值将会被更改（如果输出流不可查找则此更改尝试将引发错误）。

getnframes()[¶](#wave.Wave_write.getnframes "Link to this definition")

返回已写入的音频帧数。

setcomptype(_type_, _name_)[¶](#wave.Wave_write.setcomptype "Link to this definition")

设置压缩格式。目前只支持 `NONE` 即无压缩格式。

getcomptype()[¶](#wave.Wave_write.getcomptype "Link to this definition")

返回压缩类型 (`'NONE'`)。

getcompname()[¶](#wave.Wave_write.getcompname "Link to this definition")

返回人类可读的压缩类型名称。

setparams(_tuple_)[¶](#wave.Wave_write.setparams "Link to this definition")

The _tuple_ should be `(nchannels, sampwidth, framerate, nframes, comptype, compname)`, with values valid for the `set*()` methods. Sets all parameters.

getparams()[¶](#wave.Wave_write.getparams "Link to this definition")

返回包含当前输出形参的 [`namedtuple()`](https://docs.python.org/zh-cn/3/library/collections.html#collections.namedtuple "collections.namedtuple") `(nchannels, sampwidth, framerate, nframes, comptype, compname)`。

tell()[¶](#wave.Wave_write.tell "Link to this definition")

返回当前文件指针，其指针含义和 [`Wave_read.tell()`](#wave.Wave_read.tell "wave.Wave_read.tell") 以及 [`Wave_read.setpos()`](#wave.Wave_read.setpos "wave.Wave_read.setpos") 是一致的。

writeframesraw(_data_)[¶](#wave.Wave_write.writeframesraw "Link to this definition")

写入音频数据但不更新 _nframes_。

writeframes(_data_)[¶](#wave.Wave_write.writeframes "Link to this definition")

写入音频帧并确保 _nframes_ 是正确的。 如果输出流不可查找且在 _data_ 被写入之后写入的总帧数与之前设定的 _nframes_ 值不匹配将会引发错误。

注意在调用 [`writeframes()`](#wave.Wave_write.writeframes "wave.Wave_write.writeframes") 或 [`writeframesraw()`](#wave.Wave_write.writeframesraw "wave.Wave_write.writeframesraw") 之后再设置任何格式参数是无效的，而且任何这样的尝试将引发 [`wave.Error`](#wave.Error "wave.Error")。
