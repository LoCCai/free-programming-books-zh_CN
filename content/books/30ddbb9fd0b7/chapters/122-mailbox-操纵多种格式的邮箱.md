**源代码：** [Lib/mailbox.py](https://github.com/python/cpython/tree/3.14/Lib/mailbox.py)

* * *

本模块定义了两个类，[`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 和 [`Message`](#mailbox.Message "mailbox.Message")，用于访问和操作磁盘中的邮箱及其所包含的电子邮件。 `Mailbox` 提供了类似字典的从键到消息的映射。 `Message` 为 [`email.message`](https://docs.python.org/zh-cn/3/library/email.message.html#module-email.message "email.message: The base class representing email messages.") 模块的 [`Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") 类扩展了特定格式专属的状态和行为。 支持的邮箱格式有 Maildir, mbox, MH, Babyl 和 MMDF。

## `Mailbox` 对象[¶](#mailbox-objects "Link to this heading")

_class_ mailbox.Mailbox[¶](#mailbox.Mailbox "Link to this definition")

一个邮箱，它可以被检视和修改。

`Mailbox` 类定义了一个接口并且它不应被实例化。 而是应该让格式专属的子类继承 `Mailbox` 并且你的代码应当实例化一个特定的子类。

`Mailbox` 接口类似于字典，其中每个小键都有对应的消息。 键是由 `Mailbox` 实例发出的，它们将由实例来使用并且只对该 `Mailbox` 实例有意义。 键会持续标识一条消息，即使对应的消息已被修改，例如被另一条消息所替代。

可以使用类似于集合的方法 [`add()`](#mailbox.Mailbox.add "mailbox.Mailbox.add") 将消息添加到 `Mailbox` 实例并使用 `del` 语句或类似于集合的方法 [`remove()`](#mailbox.Mailbox.remove "mailbox.Mailbox.remove") 和 [`discard()`](#mailbox.Mailbox.discard "mailbox.Mailbox.discard") 将其移除。

`Mailbox` 接口语义在某些值得注意的方面与字典语义有所不同。 每次请求消息时，都会基于邮箱的当前状态生成一个新的表示形式（通常为 [`Message`](#mailbox.Message "mailbox.Message") 实例）。 类似地，当向 `Mailbox` 实例添加消息时，所提供的消息表示形式的内容将被复制。 无论在哪种情况下 `Mailbox` 实例都不会保留对消息表示形式的引用。

默认的 `Mailbox` [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator) 会迭代消息表示形式，而不像默认的 [`字典`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#dict "dict") 迭代器那样迭代键。 此外，在迭代期间修改邮箱是安全且有明确定义的。 在创建迭代器之后被添加到邮箱的消息将对该迭代不可见。 在迭代器产出消息之前从邮箱移除的消息将被静默地跳过，但是使用来自迭代器的键也有可能导致 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError") 异常，如果对应的消息后来被移除的话。

警告

在修改可能同时被其他某个进程修改的邮箱时要非常小心。 用于此种任务的最安全邮箱格式是 [`Maildir`](#mailbox.Maildir "mailbox.Maildir")；请尽量避免使用 [`mbox`](#mailbox.mbox "mailbox.mbox") 之类的单文件格式进行并发写入。 如果你正在修改一个邮箱，你 _必须_ 在读取文件中的任何消息或者执行添加或删除消息等修改操作 _之前_ 通过调用 [`lock()`](#mailbox.Mailbox.lock "mailbox.Mailbox.lock") 和 [`unlock()`](#mailbox.Mailbox.unlock "mailbox.Mailbox.unlock") 方法来锁定它。 如果未锁定邮箱则将导致丢失消息或损坏整个邮箱的风险。

`Mailbox` 实例具有下列方法：

add(_message_)[¶](#mailbox.Mailbox.add "Link to this definition")

将 _message_ 添加到邮箱并返回分配给它的键。

形参 _message_ 可以是 [`Message`](#mailbox.Message "mailbox.Message") 实例、[`email.message.Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") 实例、字符串、字节串或文件型对象（应当以二进制模式打开）。 如果 _message_ 是适当的格式专属 `Message` 子类的实例（举例来说，如果它是一个 [`mboxMessage`](#mailbox.mboxMessage "mailbox.mboxMessage") 实例而这是一个 [`mbox`](#mailbox.mbox "mailbox.mbox") 实例），将使用其格式专属的信息。 在其他情况下，则会使用合理的默认值作为格式专属的信息。

在 3.2 版本发生变更: 增加了对二进制输入的支持。

remove(_key_)[¶](#mailbox.Mailbox.remove "Link to this definition")

\_\_delitem\_\_(_key_)[¶](#mailbox.Mailbox.__delitem__ "Link to this definition")

discard(_key_)[¶](#mailbox.Mailbox.discard "Link to this definition")

从邮箱中删除对应于 _key_ 的消息。

当消息不存在时，如果此方法是作为 [`remove()`](#mailbox.Mailbox.remove "mailbox.Mailbox.remove") 或 [`__delitem__()`](#mailbox.Mailbox.__delitem__ "mailbox.Mailbox.__delitem__") 调用则会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError") 异常，而如果此方法是作为 [`discard()`](#mailbox.Mailbox.discard "mailbox.Mailbox.discard") 调用则不会引发异常。 如果下层邮箱格式支持来自其他进程的并发修改则 `discard()` 的行为可能是更为适合的。

\_\_setitem\_\_(_key_, _message_)[¶](#mailbox.Mailbox.__setitem__ "Link to this definition")

将 _key_ 所对应的消息替换为 _message_。 如果没有与 _key_ 所对应的消息则会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError") 异常。

与 [`add()`](#mailbox.Mailbox.add "mailbox.Mailbox.add") 一样，形参 _message_ 可以是 [`Message`](#mailbox.Message "mailbox.Message") 实例、[`email.message.Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") 实例、字符串、字节串或文件型对象（应当以二进制模式打开）。 如果 _message_ 是适当的格式专属 `Message` 子类的实例（举例来说，如果它是一个 [`mboxMessage`](#mailbox.mboxMessage "mailbox.mboxMessage") 实例而这是一个 [`mbox`](#mailbox.mbox "mailbox.mbox") 实例），将使用其格式专属的信息。 在其他情况下，当前与 _key_ 所对应的消息的格式专属信息则会保持不变。

iterkeys()[¶](#mailbox.Mailbox.iterkeys "Link to this definition")

返回一个迭代所有键的 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator)

keys()[¶](#mailbox.Mailbox.keys "Link to this definition")

与 [`iterkeys()`](#mailbox.Mailbox.iterkeys "mailbox.Mailbox.iterkeys") 类似，不同之处是返回 [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 而不是 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator)

itervalues()[¶](#mailbox.Mailbox.itervalues "Link to this definition")

\_\_iter\_\_()[¶](#mailbox.Mailbox.__iter__ "Link to this definition")

返回一个迭代所有消息的表示形式的 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator)。 消息会被表示为适当的格式专属 [`Message`](#mailbox.Message "mailbox.Message") 子类的实例，除非当 `Mailbox` 实例被初始化时指定了自定义的消息工厂函数。

备注

[`__iter__()`](#mailbox.Mailbox.__iter__ "mailbox.Mailbox.__iter__") 的行为与字典不同，后者是对键进行迭代。

values()[¶](#mailbox.Mailbox.values "Link to this definition")

与 [`itervalues()`](#mailbox.Mailbox.itervalues "mailbox.Mailbox.itervalues") 类似，不同之处是返回 [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 而不是 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator)

iteritems()[¶](#mailbox.Mailbox.iteritems "Link to this definition")

返回一个包含 (_key_, _message_) 对的 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator)，其中 _key_ 为键而 _message_ 为消息表示形式。 消息会被表示为适当的格式专属 [`Message`](#mailbox.Message "mailbox.Message") 子类的实例，除非当 `Mailbox` 实例被初始化时指定了自定义的消息工厂函数。

items()[¶](#mailbox.Mailbox.items "Link to this definition")

与 [`iteritems()`](#mailbox.Mailbox.iteritems "mailbox.Mailbox.iteritems") 类似，不同之处是返回包含键值对的 [`list`](https://docs.python.org/zh-cn/3/builtins/stdtypes.html#list "list") 而不是键值对的 [iterator](https://docs.python.org/zh-cn/3/glossary.html#term-iterator)。

get(_key_, _default\=None_)[¶](#mailbox.Mailbox.get "Link to this definition")

\_\_getitem\_\_(_key_)[¶](#mailbox.Mailbox.__getitem__ "Link to this definition")

返回对应于 _key_ 的消息的表示形式。 当对应的消息不存在时，如果该方法是通过 [`get()`](#mailbox.Mailbox.get "mailbox.Mailbox.get") 调用则返回 _default_，而如果该方法是通过 `__getitem__()` 调用则会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError")。 消息会被表示为适当的格式专属 [`Message`](#mailbox.Message "mailbox.Message") 子类的实例，除非当 `Mailbox` 被初始化时指定了自定义的消息工厂函数。

get\_message(_key_)[¶](#mailbox.Mailbox.get_message "Link to this definition")

将对应于 _key_ 的消息的表示形式作为适当的格式专属 [`Message`](#mailbox.Message "mailbox.Message") 子类的实例返回，或者如果对应的消息不存在则会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError") 异常。

get\_bytes(_key_)[¶](#mailbox.Mailbox.get_bytes "Link to this definition")

返回对应于 _key_ 的消息的字节表示形式，或者如果对应的消息不存在则会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError") 异常。

Added in version 3.2.

get\_string(_key_)[¶](#mailbox.Mailbox.get_string "Link to this definition")

返回对应于 _key_ 的消息的字符串表示形式，或者如果对应的消息不存在则会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError") 异常。 消息是通过 [`email.message.Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") 处理来将其转换为纯 7bit 表示形式的。

get\_file(_key_)[¶](#mailbox.Mailbox.get_file "Link to this definition")

返回对应于 _key_ 的消息的 [文件类](https://docs.python.org/zh-cn/3/glossary.html#term-file-like-object) 表示形式，或者如果对应的消息不存在则会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError") 异常。 文件型对象的行为相当于以二进制模式打开。 当不再需要此文件时应当将其关闭。

备注

不同于其他消息表示形式，[文件类](https://docs.python.org/zh-cn/3/glossary.html#term-file-like-object) 表示形式并不一定独立于创建它们的 `Mailbox` 实例或下层的邮箱。 每个子类都会提供更具体的文档。

\_\_contains\_\_(_key_)[¶](#mailbox.Mailbox.__contains__ "Link to this definition")

如果 _key_ 有对应的消息则返回 `True`，否则返回 `False`。

\_\_len\_\_()[¶](#mailbox.Mailbox.__len__ "Link to this definition")

返回邮箱中消息的数量。

clear()[¶](#mailbox.Mailbox.clear "Link to this definition")

从邮箱中删除所有消息。

pop(_key_, _default\=None_)[¶](#mailbox.Mailbox.pop "Link to this definition")

返回对应于 _key_ 的消息的表示形式并删除该消息。 如果对应的消息不存在则返回 _default_。 消息会被表示为适当的格式专属 [`Message`](#mailbox.Message "mailbox.Message") 子类的实例，除非当 `Mailbox` 实例被初始化时指定了自定义的消息工厂函数。

popitem()[¶](#mailbox.Mailbox.popitem "Link to this definition")

返回一个任意的 (_key_, _message_) 对，其中 _key_ 为键而 _message_ 为消息的表示形式，并删除对应的消息。 如果邮箱为空，则会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError") 异常。 消息会被表示为适当的格式专属 [`Message`](#mailbox.Message "mailbox.Message") 子类的实例，除非当 `Mailbox` 实例被初始化时指定了自定义的消息工厂函数。

update(_arg_)[¶](#mailbox.Mailbox.update "Link to this definition")

形参 _arg_ 应当是 _key_ 到 _message_ 的映射或 (_key_, _message_) 对的可迭代对象。 用来更新邮箱以使得对于每个给定的 _key_ 和 _message_，与 _key_ 相对应的消息会被设为 _message_，就像通过使用 [`__setitem__()`](#mailbox.Mailbox.__setitem__ "mailbox.Mailbox.__setitem__") 一样。 类似于 `__setitem__()`，每个 _key_ 都必须在邮箱中有一个对应的消息否则将会引发 [`KeyError`](https://docs.python.org/zh-cn/3/builtins/exceptions.html#KeyError "KeyError") 异常。 因此在通常情况下将 _arg_ 设为 `Mailbox` 实例是不正确的。

备注

与字典不同，关键字参数是不受支持的。

flush()[¶](#mailbox.Mailbox.flush "Link to this definition")

将所有待定的更改写入到文件系统。 对于某些 [`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 子类来说，更改总是被立即写入因而 `flush()` 将不做任何事，但你仍然应当养成调用此方法的习惯。

lock()[¶](#mailbox.Mailbox.lock "Link to this definition")

在邮箱上获取一个独占式咨询锁以使其他进程知道不能修改它。 如果锁无法被获取则会引发 [`ExternalClashError`](#mailbox.ExternalClashError "mailbox.ExternalClashError")。 所使用的具体锁机制取决于邮箱的格式。 在对邮箱内容进行任何修改之前你应当 _总是_ 锁定它。

unlock()[¶](#mailbox.Mailbox.unlock "Link to this definition")

释放邮箱上的锁，如果存在的话。

close()[¶](#mailbox.Mailbox.close "Link to this definition")

刷新邮箱，如有必要则将其解锁，并关闭所有打开的文件。 对于某些 `Mailbox` 子类来说，此方法不会做任何事。

### `Maildir` 对象[¶](#maildir-objects "Link to this heading")

_class_ mailbox.Maildir(_dirname_, _factory\=None_, _create\=True_)[¶](#mailbox.Maildir "Link to this definition")

[`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 的一个子类，用于 Maildir 格式的邮箱。 形参 _factory_ 是一个可调用对象，它接受一个文件类消息表示形式（其行为相当于以二进制模式打开）并返回一个自定义的表示形式。 如果 _factory_ 为 `None`，则会使用 [`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 作为默认的消息表示形式。 如果 _create_ 为 `True`，则当邮箱不存在时会创建它。

如果 _create_ 为 `True` 且 _dirname_ 路径存在，它将被视为已有的 maildir 而无需尝试验证其目录布局。

使用 _dirname_ 这个名称而不使用 _path_ 是出于历史原因。

Maildir 是一种基于目录的邮箱格式，它是针对 qmail 邮件传输代理而发明的，现在也得到了其他程序的广泛支持。 Maildir 邮箱中的消息存储在一个公共目录结构中的单独文件内。 这样的设计允许 Maildir 邮箱被多个彼此无关的程序访问和修改而不会导致数据损坏，因此文件锁定操作是不必要的。

Maildir 邮箱包含三个子目录，分别是: `tmp`, `new` 和 `cur`。 消息会不时地在 `tmp` 子目录中创建然后移至 `new` 子目录来结束投递。 后续电子邮件客户端可能将消息移至 `cur` 子目录并将有关消息状态的信息存储在附带到其文件名的特殊 "info" 小节中。

Courier 邮件传输代理所引入的文件夹风格也是受支持的。 主邮箱中任何子目录只要其名称的第一个字符是 `'.'` 就会被视为文件夹。 文件夹名称会被 `Maildir` 表示为不带前缀 `'.'` 的形式。 每个文件夹自身都是一个 Maildir 邮箱但不应包含其他文件夹。 逻辑嵌套关系是使用 `'.'` 来划定层级，例如 "Archived.2005.07"。

colon[¶](#mailbox.Maildir.colon "Link to this definition")

Maildir 规范要求使用在特定消息文件名中使用冒号 (`':'`)。 但是，某些操作系统不允许将此字符用于文件名，如果你希望在这些操作系统上使用类似 Maildir 的格式，你应当指定改用另一个字符。 叹号 (`'!'`) 是一个受欢迎的选择。 例如:

import mailbox
mailbox.Maildir.colon \= '!'

`colon` 属性也可以在每个实例上分别设置。

在 3.13 版本发生变更: 现在 [`Maildir`](#mailbox.Maildir "mailbox.Maildir") 会忽略以点号打头的文件。

`Maildir` 实例具有 [`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 的所有方法及下列附加方法：

list\_folders()[¶](#mailbox.Maildir.list_folders "Link to this definition")

返回所有文件夹名称的列表。

get\_folder(_folder_)[¶](#mailbox.Maildir.get_folder "Link to this definition")

返回表示名称为 _folder_ 的文件夹的 `Maildir` 实例。 如果文件夹不存在则会引发 [`NoSuchMailboxError`](#mailbox.NoSuchMailboxError "mailbox.NoSuchMailboxError") 异常。

add\_folder(_folder_)[¶](#mailbox.Maildir.add_folder "Link to this definition")

创建一个名称为 _folder_ 的文件夹并返回代表它的 `Maildir` 实例。

remove\_folder(_folder_)[¶](#mailbox.Maildir.remove_folder "Link to this definition")

删除名称为 _folder_ 的文件夹。 如果文件夹包含任何消息，则将引发 [`NotEmptyError`](#mailbox.NotEmptyError "mailbox.NotEmptyError") 异常且该文件夹将不会被删除。

clean()[¶](#mailbox.Maildir.clean "Link to this definition")

从邮箱中删除最近 36 小时内未被访问过的临时文件。 Maildir 规范要求邮件阅读程序应当时常进行此操作。

get\_flags(_key_)[¶](#mailbox.Maildir.get_flags "Link to this definition")

以字符串形式返回在对应于 _key_ 的消息上设置的旗标。 这等同于 `get_message(key).get_flags()` 但更为快速，因为它不会打开消息文件。 在迭代键时可使用此方法来确定哪些消息是值得获取的。

如果你确实有一个 [`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 对象，请改用其 [`get_flags()`](#mailbox.MaildirMessage.get_flags "mailbox.MaildirMessage.get_flags") 方法，因为由消息的 [`set_flags()`](#mailbox.MaildirMessage.set_flags "mailbox.MaildirMessage.set_flags"), [`add_flag()`](#mailbox.MaildirMessage.add_flag "mailbox.MaildirMessage.add_flag") 和 [`remove_flag()`](#mailbox.MaildirMessage.remove_flag "mailbox.MaildirMessage.remove_flag") 方法所做的修改在邮箱的 [`__setitem__()`](#mailbox.Maildir.__setitem__ "mailbox.Maildir.__setitem__") 方法被调用之前都不会在这里反映出来。

Added in version 3.13.

set\_flags(_key_, _flags_)[¶](#mailbox.Maildir.set_flags "Link to this definition")

在对应于 _key_ 的消息上，设置由 _flags_ 指定的旗标并取消设置所有其他旗标。 调用 `some_mailbox.set_flags(key, flags)` 就类似于

one\_message \= some\_mailbox.get\_message(key)
one\_message.set\_flags(flags)
some\_mailbox\[key\] \= one\_message

但更为快速，因为它不会打开消息文件。

如果你确实有一个 [`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 对象，请改用其 [`set_flags()`](#mailbox.MaildirMessage.set_flags "mailbox.MaildirMessage.set_flags") 方法，因为用此邮箱方法所做的修改对消息对象的方法 [`get_flags()`](#mailbox.MaildirMessage.get_flags "mailbox.MaildirMessage.get_flags") 来说将不可见。

Added in version 3.13.

add\_flag(_key_, _flag_)[¶](#mailbox.Maildir.add_flag "Link to this definition")

在对应于 _key_ 的消息上，设置由 _flag_ 指定的旗标而不改变其他旗标。 要一次性添加多个旗标，_flag_ 可以是包含多个字符的字符串。

对于是使用此方法还是使用消息对象的 [`add_flag()`](#mailbox.MaildirMessage.add_flag "mailbox.MaildirMessage.add_flag") 方法的考量与 [`set_flags()`](#mailbox.Maildir.set_flags "mailbox.Maildir.set_flags") 类似；参见那里的讨论。

Added in version 3.13.

remove\_flag(_key_, _flag_)[¶](#mailbox.Maildir.remove_flag "Link to this definition")

在对应于 _key_ 的消息上，取消设置由 _flag_ 指定的旗标而不改变其他旗标。 要一次性移除多个旗标，_flag_ 可以是包含多个字符的字符串。

对于是使用此方法还是使用消息对象的 [`remove_flag()`](#mailbox.MaildirMessage.remove_flag "mailbox.MaildirMessage.remove_flag") 方法的考量与 [`set_flags()`](#mailbox.Maildir.set_flags "mailbox.Maildir.set_flags") 类似；参见那里的讨论。

Added in version 3.13.

get\_info(_key_)[¶](#mailbox.Maildir.get_info "Link to this definition")

以字符串形式返回包含对应于 _key_ 的消息的信息的字符串。 这等同于 `get_message(key).get_info()` 但更为快速，因为它不会打开消息文件。 在迭代键时可使用此方法来确定哪些消息是值得获取的。

如果你确实有一个 [`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 对象，请改用其 [`get_info()`](#mailbox.MaildirMessage.get_info "mailbox.MaildirMessage.get_info") 方法，因为由消息的 [`set_info()`](#mailbox.MaildirMessage.set_info "mailbox.MaildirMessage.set_info") 方法所做的修改在邮箱的 [`__setitem__()`](#mailbox.Maildir.__setitem__ "mailbox.Maildir.__setitem__") 方法被调用之前都不会在这里反映出来。

Added in version 3.13.

set\_info(_key_, _info_)[¶](#mailbox.Maildir.set_info "Link to this definition")

将对应于 _key_ 的消息的信息设为 _info_。 调用 `some_mailbox.set_info(key, flags)` 就类似于

one\_message \= some\_mailbox.get\_message(key)
one\_message.set\_info(info)
some\_mailbox\[key\] \= one\_message

但更为快速，因为它不会打开消息文件。

如果你确实有一个 [`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 对象，请改用其 [`set_info()`](#mailbox.MaildirMessage.set_info "mailbox.MaildirMessage.set_info") 方法，因为用此邮箱方法所做的修改对消息对象的方法 [`get_info()`](#mailbox.MaildirMessage.get_info "mailbox.MaildirMessage.get_info") 来说将不可见。

Added in version 3.13.

`Maildir` 所实现的某些 [`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 方法值得进行特别说明：

add(_message_)[¶](#mailbox.Maildir.add "Link to this definition")

\_\_setitem\_\_(_key_, _message_)[¶](#mailbox.Maildir.__setitem__ "Link to this definition")

update(_arg_)[¶](#mailbox.Maildir.update "Link to this definition")

警告

这些方法会基于当前进程 ID 来生成唯一文件名。 当使用多线程时，可能发生未被检测到的名称冲突并导致邮箱损坏，除非是对线程进行协调以避免使用这些方法同时操作同一个邮箱。

flush()[¶](#mailbox.Maildir.flush "Link to this definition")

对 Maildir 邮箱的所有更改都会立即被应用，所以此方法并不会做任何事情。

lock()[¶](#mailbox.Maildir.lock "Link to this definition")

unlock()[¶](#mailbox.Maildir.unlock "Link to this definition")

Maildir 邮箱不支持（或要求）锁定操作，所以此方法并不会做任何事情。

close()[¶](#mailbox.Maildir.close "Link to this definition")

`Maildir` 实例不保留任何打开的文件并且下层的邮箱不支持锁定操作。 所以此方法不会做任何事情。

get\_file(_key_)[¶](#mailbox.Maildir.get_file "Link to this definition")

根据主机平台的不同，当返回的文件保持打开状态时可能无法修改或移除下层的消息。

### `mbox` 对象[¶](#mbox-objects "Link to this heading")

_class_ mailbox.mbox(_path_, _factory\=None_, _create\=True_)[¶](#mailbox.mbox "Link to this definition")

[`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 的子类，用于 mbox 格式的邮箱。 形参 _factory_ 是一个可调用对象，它接受一个文件类消息表示形式（其行为相当于以二进制模式打开）并返回一个自定义的表示形式。 如果 _factory_ 为 `None`，则会使用 [`mboxMessage`](#mailbox.mboxMessage "mailbox.mboxMessage") 作为默认的消息表示形式。 如果 _create_ 为 `True`，则当邮箱不存在时会创建它。

mbox 格式是在 Unix 系统上存储电子邮件的经典格式。 mbox 邮箱中的所有消息都存储在一个单独文件中，每条消息的开头由前五个字符为 "From " 的行来指明。

还有一些 mbox 格式的变种对原始格式中发现的缺点做了改进。 为了保证兼容性，`mbox` 只实现了原始格式，或称 _mboxo_ 格式。 这意味着当存储消息时，如果存在 标头，它将被忽略并且消息体中出现于行开头的任何 "From " 都会被转换为 ">From "，但是当读取消息时 ">From " 则不会被转换为 "From "。

`mbox` 所实现的某些 [`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 方法值得进行特别的说明：

get\_bytes(_key_, _from\_\=False_)[¶](#mailbox.mbox.get_bytes "Link to this definition")

注意：此方法相比其他类有一个额外形参 (_from\__)。 mbox 文件条目的第一行是 Unix "From " 行。 如果 _from\__ 为 False，则文件的第一行将被丢弃。

get\_file(_key_, _from\_\=False_)[¶](#mailbox.mbox.get_file "Link to this definition")

在 `mbox` 实例上调用 [`flush()`](#mailbox.Mailbox.flush "mailbox.Mailbox.flush") 或 [`close()`](#mailbox.Mailbox.close "mailbox.Mailbox.close") 之后再使用文件可能产生无法预料的结果或者引发异常。

注意：此方法相比其他类有一个额外形参 (_from\__)。 mbox 文件条目的第一行是 Unix "From " 行。 如果 _from\__ 为 False，则文件的第一行将被丢弃。

get\_string(_key_, _from\_\=False_)[¶](#mailbox.mbox.get_string "Link to this definition")

注意：此方法相比其他类有一个额外形参 (_from\__)。 mbox 文件条目的第一行是 Unix "From " 行。 如果 _from\__ 为 False，则文件的第一行将被丢弃。

lock()[¶](#mailbox.mbox.lock "Link to this definition")

unlock()[¶](#mailbox.mbox.unlock "Link to this definition")

使用三种锁机制 --- dot 锁，以及在受支持的情况下可用的 `flock()` 和 `lockf()` 系统调用。

### `MH` 对象[¶](#mh-objects "Link to this heading")

_class_ mailbox.MH(_path_, _factory\=None_, _create\=True_)[¶](#mailbox.MH "Link to this definition")

[`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 的子类，用于 MH 格式的邮箱。 形参 _factory_ 是一个可调用对象，它接受一个文件类消息表示形式（其行为相当于以二进制模式打开）并返回一个自定义的表示形式。 如果 _factory_ 为 `None`，则会使用 [`MHMessage`](#mailbox.MHMessage "mailbox.MHMessage") 作为默认的消息表示形式。 如果 _create_ 为 `True`，则当邮箱不存在时会创建它。

MH 是一种基于目录的邮箱格式，它是针对 MH Message Handling System 电子邮件用户代理而发明的。 在 MH 邮箱的每条消息都放在单独文件中。 MH 邮箱中除了邮件消息还可以包含其他 MH 邮箱 (称为 _文件夹_)。 文件夹可以无限嵌套。 MH 邮箱还支持 _序列_，这是一种命名列表，用来对消息进行逻辑分组而不必将其移入子文件夹。 序列是在每个文件夹中名为 `.mh_sequences` 的文件内定义的。

`MH` 类可以操作 MH 邮箱，但它并不试图模拟 **mh** 的所有行为。 特别地，它并不会修改 `context` 或 `.mh_profile` 文件也不会受其影响，这两个文件是 **mh** 用来存储状态和配置数据的。

`MH` 实例具有 [`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 的所有方法及下列附加方法：

在 3.13 版本发生变更: 不包含 `.mh_sequences` 文件的受支持文件夹。

list\_folders()[¶](#mailbox.MH.list_folders "Link to this definition")

返回所有文件夹名称的列表。

get\_folder(_folder_)[¶](#mailbox.MH.get_folder "Link to this definition")

返回表示名称为 _folder_ 的文件夹的 `MH` 实例。 如果文件夹不存在则会引发 [`NoSuchMailboxError`](#mailbox.NoSuchMailboxError "mailbox.NoSuchMailboxError") 异常。

add\_folder(_folder_)[¶](#mailbox.MH.add_folder "Link to this definition")

创建名称为 _folder_ 的文件夹并返回表示它的 `MH` 实例。

remove\_folder(_folder_)[¶](#mailbox.MH.remove_folder "Link to this definition")

删除名称为 _folder_ 的文件夹。 如果文件夹包含任何消息，则将引发 [`NotEmptyError`](#mailbox.NotEmptyError "mailbox.NotEmptyError") 异常且该文件夹将不会被删除。

get\_sequences()[¶](#mailbox.MH.get_sequences "Link to this definition")

返回映射到键列表的序列名称字典。 如果不存在任何序列，则返回空字典。

set\_sequences(_sequences_)[¶](#mailbox.MH.set_sequences "Link to this definition")

根据由映射到键列表的名称组成的字典 _sequences_ 来重新定义邮箱中的序列，该字典与 [`get_sequences()`](#mailbox.MH.get_sequences "mailbox.MH.get_sequences") 返回值的形式一样。

pack()[¶](#mailbox.MH.pack "Link to this definition")

根据需要重命名邮箱中的消息以消除序号中的空缺。 序列列表中的条目会做相应的修改。

备注

已发出的键会因此操作而失效并且不应当被继续使用。

`MH` 所实现的某些 [`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 方法值得进行特别的说明：

remove(_key_)[¶](#mailbox.MH.remove "Link to this definition")

\_\_delitem\_\_(_key_)[¶](#mailbox.MH.__delitem__ "Link to this definition")

discard(_key_)[¶](#mailbox.MH.discard "Link to this definition")

这些方法会立即删除消息。 通过在名称前加缀一个逗号作为消息删除标记的 MH 惯例不会被使用。

lock()[¶](#mailbox.MH.lock "Link to this definition")

unlock()[¶](#mailbox.MH.unlock "Link to this definition")

使用三种锁机制 --- dot 锁，以及在受支持的情况下可用的 `flock()` 和 `lockf()` 系统调用。 对于 MH 邮箱来说，锁定邮箱意味着锁定 `.mh_sequences` 文件，并且仅在执行任何对它们有影响的操作期间锁定单独消息文件。

get\_file(_key_)[¶](#mailbox.MH.get_file "Link to this definition")

根据主机平台的不同，当返回的文件保持打开状态时可能无法移除下层的消息。

flush()[¶](#mailbox.MH.flush "Link to this definition")

对 MH 邮箱的所有更改都会立即被应用，所以此方法并不会做任何事情。

close()[¶](#mailbox.MH.close "Link to this definition")

`MH` 实例不会保留任何打开的文件，所以此方法等价于 [`unlock()`](#mailbox.MH.unlock "mailbox.MH.unlock")。

### `Babyl` 对象[¶](#babyl-objects "Link to this heading")

_class_ mailbox.Babyl(_path_, _factory\=None_, _create\=True_)[¶](#mailbox.Babyl "Link to this definition")

[`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 的子类，用于 Babyl 格式的邮箱。 形参 _factory_ 是一个可调用对象，它接受一个文件类表示形式（其行为相当于以二进制模式打开）并返回一个自定义的表示形式。 如果 _factory_ 为 `None`，则会使用 [`BabylMessage`](#mailbox.BabylMessage "mailbox.BabylMessage") 作为默认的消息表示形式。 如果 _create_ 为 `True`，则当邮箱不存在时会创建它。

Babyl 是 Rmail 电子邮件用户代理所使用的单文件邮箱格式，包括在 Emacs 中。 每条消息的开头由一个包含 Control-Underscore (`'\037'`) 和 Control-L (`'\014'`) 这两个字符的行来指明。 消息的结束由下一条消息的开头来指明，或者当为最后一条消息时则由一个包含 Control-Underscore (`'\037'`) 字符的行来指明。

Babyl 邮箱中的消息带有两组标头：原始标头和所谓的可见标头。 可见标头通常为原始标头经过重格式化和删减以更易读的子集。 Babyl 邮箱中的每条消息都附带了一个 _标签_ 列表，即记录消息相关额外信息的短字符串，邮箱中所有的用户定义标签列表会存储于 Babyl 的选项部分。

`Babyl` 实例具有 [`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 的所有方法及下列附加方法：

get\_labels()[¶](#mailbox.Babyl.get_labels "Link to this definition")

返回邮箱中使用的所有用户定义标签名称的列表。

备注

邮箱中存在哪些标签会通过检查实际的消息来确定而非查询 Babyl 选项部分的标签列表，但 Babyl 选项部分会在邮箱被修改时更新。

`Babyl` 所实现的某些 [`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 方法值得进行特别的说明：

get\_file(_key_)[¶](#mailbox.Babyl.get_file "Link to this definition")

在 Babyl 邮箱中，消息的标头并不是与消息体存储在一起的。 要生成文件类表示形式，标头和消息体会被一起拷贝到一个 [`io.BytesIO`](https://docs.python.org/zh-cn/3/library/io.html#io.BytesIO "io.BytesIO") 实例中，它具有与文件相似的 API。 因此，文件型对象实际上独立于下层邮箱，但与字符串表达形式相比并不会更节省内存。

lock()[¶](#mailbox.Babyl.lock "Link to this definition")

unlock()[¶](#mailbox.Babyl.unlock "Link to this definition")

使用三种锁机制 --- dot 锁，以及在受支持的情况下可用的 `flock()` 和 `lockf()` 系统调用。

### `MMDF` 对象[¶](#mmdf-objects "Link to this heading")

_class_ mailbox.MMDF(_path_, _factory\=None_, _create\=True_)[¶](#mailbox.MMDF "Link to this definition")

[`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 的子类，用于 MMDF 格式的邮箱。 形参 _factory_ 是一个可调用对象，它接受一个文件类消息表示形式（其行为相当于以二进制模式打开）并返回一个自定义的表示形式。 如果 _factory_ 为 `None`，则会使用 [`MMDFMessage`](#mailbox.MMDFMessage "mailbox.MMDFMessage") 作为默认的消息表示形式。 如果 _create_ 为 `True`，则当邮箱不存在时会创建它。

MMDF 是一种专用于电子邮件传输代理 Multichannel Memorandum Distribution Facility 的单文件邮箱格式。 每条消息使用与 mbox 消息相同的形式，但其前后各有包含四个 Control-A (`'\001'`) 字符的行。 与 mbox 格式一样，每条消息的开头由一个前五个字符为 "From " 的行来指明，但当存储消息时额外出现的 "From " 不会被转换为 ">From " 因为附加的消息分隔符可防止将这些内容误认为是后续消息的开头。

`MMDF` 所实现的某些 [`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 方法值得进行特别的说明：

get\_bytes(_key_, _from\_\=False_)[¶](#mailbox.MMDF.get_bytes "Link to this definition")

注意：此方法相比其他类有一个额外形参 (_from\__)。 mbox 文件条目的第一行是 Unix "From " 行。 如果 _from\__ 为 False，则文件的第一行将被丢弃。

get\_file(_key_, _from\_\=False_)[¶](#mailbox.MMDF.get_file "Link to this definition")

在 `MMDF` 实例上调用 [`flush()`](#mailbox.Mailbox.flush "mailbox.Mailbox.flush") 或 [`close()`](#mailbox.Mailbox.close "mailbox.Mailbox.close") 之后再使用文件可能产生无法预料的结果或者引发异常。

注意：此方法相比其他类有一个额外形参 (_from\__)。 mbox 文件条目的第一行是 Unix "From " 行。 如果 _from\__ 为 False，则文件的第一行将被丢弃。

lock()[¶](#mailbox.MMDF.lock "Link to this definition")

unlock()[¶](#mailbox.MMDF.unlock "Link to this definition")

使用三种锁机制 --- dot 锁，以及在受支持的情况下可用的 `flock()` 和 `lockf()` 系统调用。

参见

[tin 上的 mmdf 指南页面](http://www.tin.org/bin/man.cgi?section=5&topic=mmdf)

MMDF 格式的规格说明，来自新闻阅读器 tin 的文档。

[MMDF](https://en.wikipedia.org/wiki/MMDF)

一篇描述 Multichannel Memorandum Distribution Facility 的维基百科文章。

## `Message` 对象[¶](#message-objects "Link to this heading")

_class_ mailbox.Message(_message\=None_)[¶](#mailbox.Message "Link to this definition")

[`email.message`](https://docs.python.org/zh-cn/3/library/email.message.html#module-email.message "email.message: The base class representing email messages.") 模块的 [`Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") 的子类。 `mailbox.Message` 的子类添加了特定邮箱格式专属的状态和行为。

如果省略了 _message_，则新实例会以默认的空状态被创建。 如果 _message_ 是一个 [`email.message.Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") 实例，其内容会被拷贝；此外，如果 _message_ 是一个 `Message` 实例则任何格式专属信息会被尽可能地转换。 如果 _message_ 是一个字符串、字节串或文件，则它应当包含符合 [**RFC 5322**](https://datatracker.ietf.org/doc/html/rfc5322.html) 规范的消息，该消息会被读取和解析。 文件应当以二进制模式打开，但也接受文本模式以保持向下兼容。

各个子类所提供的格式专属状态和行为各有不同，但总的来说只有那些不仅限于特定邮箱的特性才会被支持（虽然这些特性可能专属于特定邮箱格式）。 例如，单文件邮箱格式的文件偏移量和基于目录的邮箱格式的文件名都不会被保留，因为它们都仅适用于对应的原始邮箱。 但消息是否已被用户读取或标记为重要等状态则会被保留，因为它们适用于消息本身。

不要求使用 `Message` 实例来表示使用 [`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 实例所提取到的消息。 在某些情况下，生成 `Message` 表示形式所需的时间和内存空间可能是不可接受的。 对于此类情况，`Mailbox` 实例还提供了字符串和文件类表示形式，并可在初始化 `Mailbox` 实例时设置自定义的消息工厂函数。

### `MaildirMessage` 对象[¶](#maildirmessage-objects "Link to this heading")

_class_ mailbox.MaildirMessage(_message\=None_)[¶](#mailbox.MaildirMessage "Link to this definition")

具有 Maildir 专属行为的消息。 形参 _message_ 的含义与 [`Message`](#mailbox.Message "mailbox.Message") 构造器一致。

通常，邮件用户代理应用程序会在用户第一次打开并关闭邮箱之后将 `new` 子目录中的所有消息移至 `cur` 子目录，将这些消息记录为旧消息，无论它们是否真的已被阅读。 `cur` 下的每条消息都有一个 "info" 部分被添加到其文件名中以存储有关其状态的信息。 （某些邮件阅读器还会把 "info" 部分也添加到 `new` 下的消息中。） "info" 部分可以采用两种形式之一：它可能包含 "2," 后面跟一个经标准化的旗标列表（例如 "2,FR"）或者它可能包含 "1," 后面跟所谓的实验性信息。 Maildir 消息的标准旗标如下:

| 
旗标

 | 

含意

 | 

说明

 |
| --- | --- | --- |
| 

D

 | 

草稿

 | 

正在撰写中

 |
| 

F

 | 

已标记

 | 

已被标记为重要

 |
| 

P

 | 

已检视

 | 

转发，重新发送或退回

 |
| 

R

 | 

已回复

 | 

已回复

 |
| 

S

 | 

已查看

 | 

已阅读

 |
| 

T

 | 

已删除

 | 

标记为可被删除

 |

`MaildirMessage` 实例提供了下列方法：

get\_subdir()[¶](#mailbox.MaildirMessage.get_subdir "Link to this definition")

返回 "new" (如果消息应当被存储在 `new` 子目录下) 或者 "cur" (如果消息应当被存储在 `cur` 子目录下)。

备注

一条消息通常会在其邮箱被访问后从 `new` 移至 `cur`，无论该消息是否已被阅读。 如果 `"S" in msg.get_flags()` 为 `True` 则说明消息 `msg` 已被阅读。

set\_subdir(_subdir_)[¶](#mailbox.MaildirMessage.set_subdir "Link to this definition")

设置消息应当被存储到的子目录。 形参 _subdir_ 必须为 "new" 或 "cur"。

get\_flags()[¶](#mailbox.MaildirMessage.get_flags "Link to this definition")

返回一个指明当前所设旗标的字符串。 如果消息符合标准的 Maildir 格式，则结果为零或按字母顺序各自出现一次的 `'D'`, `'F'`, `'P'`, `'R'`, `'S'` 和 `'T'` 的拼接。 如果未设任何旗标或者如果 "info" 包含实验性语义则返回空字符串。

set\_flags(_flags_)[¶](#mailbox.MaildirMessage.set_flags "Link to this definition")

设置由 _flags_ 所指定的旗标并重置所有其它旗标。

add\_flag(_flag_)[¶](#mailbox.MaildirMessage.add_flag "Link to this definition")

设置由 _flag_ 所指明的旗标而不改变其他旗标。 要一次性添加一个以上的旗标，_flag_ 可以为包含一个以上字符的字符串。 当前 "info" 会被覆盖，无论它是否只包含实验性信息而非旗标。

remove\_flag(_flag_)[¶](#mailbox.MaildirMessage.remove_flag "Link to this definition")

Unset the flag(s) specified by _flag_ without changing other flags. To remove more than one flag at a time, _flag_ may be a string of more than one character. If "info" contains experimental information rather than flags, the current "info" is not modified.

get\_date()[¶](#mailbox.MaildirMessage.get_date "Link to this definition")

以表示 Unix 纪元秒数的浮点数形式返回消息的发送日期。

set\_date(_date_)[¶](#mailbox.MaildirMessage.set_date "Link to this definition")

将消息的发送日期设为 _date_，一个表示 Unix 纪元秒数的浮点数。

get\_info()[¶](#mailbox.MaildirMessage.get_info "Link to this definition")

返回一个包含消息的 "info" 的字符串。 这适用于访问和修改实验性的 "info" (即不是由旗标组成的列表)。

set\_info(_info_)[¶](#mailbox.MaildirMessage.set_info "Link to this definition")

将 "info" 设为 _info_，这应当是一个字符串。

当一个 `MaildirMessage` 实例基于 [`mboxMessage`](#mailbox.mboxMessage "mailbox.mboxMessage") 或 [`MMDFMessage`](#mailbox.MMDFMessage "mailbox.MMDFMessage") 实例被创建时，将会忽略 和 标头并进行下列转换：

| 
结果状态

 | 

[`mboxMessage`](#mailbox.mboxMessage "mailbox.mboxMessage") 或 [`MMDFMessage`](#mailbox.MMDFMessage "mailbox.MMDFMessage") 状态

 |
| --- | --- |
| 

"cur" 子目录

 | 

O 旗标

 |
| 

F 旗标

 | 

F 旗标

 |
| 

R 旗标

 | 

A 旗标

 |
| 

S 旗标

 | 

R 旗标

 |
| 

T 旗标

 | 

D 旗标

 |

当一个 `MaildirMessage` 实例基于 [`MHMessage`](#mailbox.MHMessage "mailbox.MHMessage") 实例被创建时，将进行下列转换：

| 
结果状态

 | 

[`MHMessage`](#mailbox.MHMessage "mailbox.MHMessage") 状态

 |
| --- | --- |
| 

"cur" 子目录

 | 

"unseen" 序列

 |
| 

"cur" 子目录和 S 旗标

 | 

非 "unseen" 序列

 |
| 

F 旗标

 | 

"flagged" 序列

 |
| 

R 旗标

 | 

"replied" 序列

 |

当一个 `MaildirMessage` 实例基于 [`BabylMessage`](#mailbox.BabylMessage "mailbox.BabylMessage") 实例被创建时，将进行下列转换：

| 
结果状态

 | 

[`BabylMessage`](#mailbox.BabylMessage "mailbox.BabylMessage") 状态

 |
| --- | --- |
| 

"cur" 子目录

 | 

"unseen" 标签

 |
| 

"cur" 子目录和 S 旗标

 | 

非 "unseen" 标签

 |
| 

P 旗标

 | 

"forwarded" 或 "resent" 标签

 |
| 

R 旗标

 | 

"answered" 标签

 |
| 

T 旗标

 | 

"deleted" 标签

 |

### `mboxMessage` 对象[¶](#mboxmessage-objects "Link to this heading")

_class_ mailbox.mboxMessage(_message\=None_)[¶](#mailbox.mboxMessage "Link to this definition")

具有 mbox 专属行为的消息。 形参 _message_ 的含义与 [`Message`](#mailbox.Message "mailbox.Message") 构造器一致。

mbox 邮箱中的消息会一起存储在单个文件中。 发件人的信封地址和发送时间通常存储在指明每条消息的起始的以 "From " 打头的行中，不过在 mbox 的各种实现之间此数据的确切格式具有相当大的差异。 指明消息状态的各种旗标，例如是否已读或标记为重要等等通常存储在 和 标头中。

传统的 mbox 消息旗标如下:

| 
旗标

 | 

含意

 | 

说明

 |
| --- | --- | --- |
| 

R

 | 

已阅读

 | 

已阅读

 |
| 

O

 | 

旧消息

 | 

之前已经过 MUA 检测

 |
| 

D

 | 

已删除

 | 

标记为可被删除

 |
| 

F

 | 

已标记

 | 

已被标记为重要

 |
| 

A

 | 

已回复

 | 

已回复

 |

"R" 和 "O" 旗标存储在 标头中，而 "D", "F" 和 "A" 旗标存储在 标头中。 旗标和标头通常会按上述顺序显示。

`mboxMessage` 实例提供了下列方法：

get\_from()[¶](#mailbox.mboxMessage.get_from "Link to this definition")

返回一个表示在 mbox 邮箱中标记消息起始的 "From " 行的字符串。 开头的 "From " 和末尾的换行符会被去除。

set\_from(_from\__, _time\_\=None_)[¶](#mailbox.mboxMessage.set_from "Link to this definition")

将 "From " 行设为 _from\__，这应当被指定为不带开头的 "From " 或末尾的换行符。 为方便起见，可以指定 _time\__ 并将经过适当的格式化再添加到 _from\__。 如果指定了 _time\__，它应当是一个 [`time.struct_time`](https://docs.python.org/zh-cn/3/library/time.html#time.struct_time "time.struct_time") 实例、适合传给 [`time.strftime()`](https://docs.python.org/zh-cn/3/library/time.html#time.strftime "time.strftime") 的元组或者 `True` (以使用 [`time.gmtime()`](https://docs.python.org/zh-cn/3/library/time.html#time.gmtime "time.gmtime"))。

get\_flags()[¶](#mailbox.mboxMessage.get_flags "Link to this definition")

返回一个指明当前所设旗标的字符串。 如果消息符合规范格式，则结果为零或各自出现一次的 `'R'`, `'O'`, `'D'`, `'F'` 和 `'A'` 按上述顺序的拼接。

set\_flags(_flags_)[¶](#mailbox.mboxMessage.set_flags "Link to this definition")

设置由 _flags_ 所指明的旗标并重置所有其他旗标。 形参 _flags_ 应当为零或各自出现多次的 `'R'`, `'O'`, `'D'`, `'F'` 和 `'A'` 按任意顺序的拼接。

add\_flag(_flag_)[¶](#mailbox.mboxMessage.add_flag "Link to this definition")

设置由 _flag_ 所指明的旗标而不改变其他旗标。 要一次性添加一个以上的旗标，_flag_ 可以为包含一个以上字符的字符串。

remove\_flag(_flag_)[¶](#mailbox.mboxMessage.remove_flag "Link to this definition")

Unset the flag(s) specified by _flag_ without changing other flags. To remove more than one flag at a time, _flag_ may be a string of more than one character.

当一个 `mboxMessage` 实例基于 [`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 实例被创建时，将根据 `MaildirMessage` 实例的发送日期生成 "From " 行，并进行下列转换：

| 
结果状态

 | 

[`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 状态

 |
| --- | --- |
| 

R 旗标

 | 

S 旗标

 |
| 

O 旗标

 | 

"cur" 子目录

 |
| 

D 旗标

 | 

T 旗标

 |
| 

F 旗标

 | 

F 旗标

 |
| 

A 旗标

 | 

R 旗标

 |

当一个 `mboxMessage` 实例基于 [`MHMessage`](#mailbox.MHMessage "mailbox.MHMessage") 实例被创建时，将进行下列转换：

| 
结果状态

 | 

[`MHMessage`](#mailbox.MHMessage "mailbox.MHMessage") 状态

 |
| --- | --- |
| 

R 旗标 和 O 旗标

 | 

非 "unseen" 序列

 |
| 

O 旗标

 | 

"unseen" 序列

 |
| 

F 旗标

 | 

"flagged" 序列

 |
| 

A 旗标

 | 

"replied" 序列

 |

当一个 `mboxMessage` 实例基于 [`BabylMessage`](#mailbox.BabylMessage "mailbox.BabylMessage") 实例被创建时，将进行下列转换：

| 
结果状态

 | 

[`BabylMessage`](#mailbox.BabylMessage "mailbox.BabylMessage") 状态

 |
| --- | --- |
| 

R 旗标 和 O 旗标

 | 

非 "unseen" 标签

 |
| 

O 旗标

 | 

"unseen" 标签

 |
| 

D 旗标

 | 

"deleted" 标签

 |
| 

A 旗标

 | 

"answered" 标签

 |

当一个 `mboxMessage` 实例基于 [`MMDFMessage`](#mailbox.MMDFMessage "mailbox.MMDFMessage") 实例被创建时，"From " 行会被拷贝并直接对应所有旗标：

| 
结果状态

 | 

[`MMDFMessage`](#mailbox.MMDFMessage "mailbox.MMDFMessage") 状态

 |
| --- | --- |
| 

R 旗标

 | 

R 旗标

 |
| 

O 旗标

 | 

O 旗标

 |
| 

D 旗标

 | 

D 旗标

 |
| 

F 旗标

 | 

F 旗标

 |
| 

A 旗标

 | 

A 旗标

 |

### `MHMessage` 对象[¶](#mhmessage-objects "Link to this heading")

_class_ mailbox.MHMessage(_message\=None_)[¶](#mailbox.MHMessage "Link to this definition")

具有 MH 专属行为的消息。 形参 _message_ 的含义与 [`Message`](#mailbox.Message "mailbox.Message") 构造器一致。

MH 消息不支持传统意义上的标记或旗标，但它们支持序列，即对任意消息的逻辑分组。 某些邮件阅读程序 (但不包括标准 **mh** 和 **nmh**) 以与其他格式使用旗标类似的方式来使用序列，如下所示:

| 
序列

 | 

说明

 |
| --- | --- |
| 

unseen

 | 

未阅读，但之前已经过 MUA 检测

 |
| 

已回复

 | 

已回复

 |
| 

已标记

 | 

已被标记为重要

 |

`MHMessage` 实例提供了下列方法：

get\_sequences()[¶](#mailbox.MHMessage.get_sequences "Link to this definition")

返回一个包含此消息的序列的名称的列表。

set\_sequences(_sequences_)[¶](#mailbox.MHMessage.set_sequences "Link to this definition")

设置包含此消息的序列的列表。

add\_sequence(_sequence_)[¶](#mailbox.MHMessage.add_sequence "Link to this definition")

将 _sequence_ 添加到包含此消息的序列的列表。

remove\_sequence(_sequence_)[¶](#mailbox.MHMessage.remove_sequence "Link to this definition")

将 _sequence_ 从包含此消息的序列的列表中移除。

当一个 `MHMessage` 实例基于 [`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 实例被创建时，将进行下列转换：

| 
结果状态

 | 

[`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 状态

 |
| --- | --- |
| 

"unseen" 序列

 | 

非 S 旗标

 |
| 

"replied" 序列

 | 

R 旗标

 |
| 

"flagged" 序列

 | 

F 旗标

 |

当一个 `MHMessage` 实例基于 [`mboxMessage`](#mailbox.mboxMessage "mailbox.mboxMessage") 或 [`MMDFMessage`](#mailbox.MMDFMessage "mailbox.MMDFMessage") 实例被创建时，将会忽略 和 标头并进行下列转换：

| 
结果状态

 | 

[`mboxMessage`](#mailbox.mboxMessage "mailbox.mboxMessage") 或 [`MMDFMessage`](#mailbox.MMDFMessage "mailbox.MMDFMessage") 状态

 |
| --- | --- |
| 

"unseen" 序列

 | 

非 R 旗标

 |
| 

"replied" 序列

 | 

A 旗标

 |
| 

"flagged" 序列

 | 

F 旗标

 |

当一个 `MHMessage` 实例基于 [`BabylMessage`](#mailbox.BabylMessage "mailbox.BabylMessage") 实例被创建时，将进行下列转换：

| 
结果状态

 | 

[`BabylMessage`](#mailbox.BabylMessage "mailbox.BabylMessage") 状态

 |
| --- | --- |
| 

"unseen" 序列

 | 

"unseen" 标签

 |
| 

"replied" 序列

 | 

"answered" 标签

 |

### `BabylMessage` 对象[¶](#babylmessage-objects "Link to this heading")

_class_ mailbox.BabylMessage(_message\=None_)[¶](#mailbox.BabylMessage "Link to this definition")

具有 Babyl 专属行为的消息。 形参 _message_ 的含义与 [`Message`](#mailbox.Message "mailbox.Message") 构造器一致。

某些消息标签被称为 _属性_，根据惯例被定义为具有特殊的含义。 这些属性如下所示:

| 
标签

 | 

说明

 |
| --- | --- |
| 

unseen

 | 

未阅读，但之前已经过 MUA 检测

 |
| 

deleted

 | 

标记为可被删除

 |
| 

filed

 | 

复制到另一个文件或邮箱

 |
| 

answered

 | 

已回复

 |
| 

forwarded

 | 

已转发

 |
| 

edited

 | 

已被用户修改

 |
| 

resent

 | 

已重发

 |

默认情况下，Rmail 只显示可见标头。 不过，`BabylMessage` 类会使用原始标头因为它们更为完整。 如果需要可以显式地访问可见标头。

`BabylMessage` 实例提供了下列方法：

get\_labels()[¶](#mailbox.BabylMessage.get_labels "Link to this definition")

返回邮件上的标签列表。

set\_labels(_labels_)[¶](#mailbox.BabylMessage.set_labels "Link to this definition")

将消息上的标签列表设置为 _labels_ 。

add\_label(_label_)[¶](#mailbox.BabylMessage.add_label "Link to this definition")

将 _label_ 添加到消息上的标签列表中。

remove\_label(_label_)[¶](#mailbox.BabylMessage.remove_label "Link to this definition")

从消息上的标签列表中删除 _label_ 。

get\_visible()[¶](#mailbox.BabylMessage.get_visible "Link to this definition")

返回一个 [`Message`](#mailbox.Message "mailbox.Message") 实例，其标头为消息的可见标头而其消息体为空。

set\_visible(_visible_)[¶](#mailbox.BabylMessage.set_visible "Link to this definition")

将消息的可见标头设为与 _message_ 中的标头一致。 形参 _visible_ 应当是一个 [`Message`](#mailbox.Message "mailbox.Message") 实例，[`email.message.Message`](https://docs.python.org/zh-cn/3/library/email.compat32-message.html#email.message.Message "email.message.Message") 实例，字符串或文件型对象（且应当以文本模式打开）。

update\_visible()[¶](#mailbox.BabylMessage.update_visible "Link to this definition")

当一个 `BabylMessage` 实例的原始标头被修改时，可见标头不会自动进行对应修改。 此方法将按以下方式更新可见标头：每个具有对应原始标头的可见标头会被设为原始标头的值，每个没有对应原始标头的可见标头会被移除，而任何存在于原始标头但不存在于可见标头中的 , , , , 和 会被添加至可见标头。

当一个 `BabylMessage` 实例基于 [`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 实例被创建时，将进行下列转换：

| 
结果状态

 | 

[`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 状态

 |
| --- | --- |
| 

"unseen" 标签

 | 

非 S 旗标

 |
| 

"deleted" 标签

 | 

T 旗标

 |
| 

"answered" 标签

 | 

R 旗标

 |
| 

"forwarded" 标签

 | 

P 旗标

 |

当一个 `BabylMessage` 实例基于 [`mboxMessage`](#mailbox.mboxMessage "mailbox.mboxMessage") 或 [`MMDFMessage`](#mailbox.MMDFMessage "mailbox.MMDFMessage") 实例被创建时，将会忽略 和 标头并进行下列转换：

| 
结果状态

 | 

[`mboxMessage`](#mailbox.mboxMessage "mailbox.mboxMessage") 或 [`MMDFMessage`](#mailbox.MMDFMessage "mailbox.MMDFMessage") 状态

 |
| --- | --- |
| 

"unseen" 标签

 | 

非 R 旗标

 |
| 

"deleted" 标签

 | 

D 旗标

 |
| 

"answered" 标签

 | 

A 旗标

 |

当一个 `BabylMessage` 实例基于 [`MHMessage`](#mailbox.MHMessage "mailbox.MHMessage") 实例被创建时，将进行下列转换：

| 
结果状态

 | 

[`MHMessage`](#mailbox.MHMessage "mailbox.MHMessage") 状态

 |
| --- | --- |
| 

"unseen" 标签

 | 

"unseen" 序列

 |
| 

"answered" 标签

 | 

"replied" 序列

 |

### `MMDFMessage` 对象[¶](#mmdfmessage-objects "Link to this heading")

_class_ mailbox.MMDFMessage(_message\=None_)[¶](#mailbox.MMDFMessage "Link to this definition")

具有 MMDF 专属行为的消息。 形参 _message_ 的含义与 [`Message`](#mailbox.Message "mailbox.Message") 构造器一致。

与 mbox 邮箱中的消息类似，MMDF 消息会将发件人的地址和发送日期存储在以 "From " 打头的初始行中。 同样地，指明消息状态的旗标通常存储在 和 标头中。

传统的 MMDF 消息旗标与 mbox 消息的类似，如下所示:

| 
旗标

 | 

含意

 | 

说明

 |
| --- | --- | --- |
| 

R

 | 

已阅读

 | 

已阅读

 |
| 

O

 | 

旧消息

 | 

之前已经过 MUA 检测

 |
| 

D

 | 

已删除

 | 

标记为可被删除

 |
| 

F

 | 

已标记

 | 

已被标记为重要

 |
| 

A

 | 

已回复

 | 

已回复

 |

"R" 和 "O" 旗标存储在 标头中，而 "D", "F" 和 "A" 旗标存储在 标头中。 旗标和标头通常会按上述顺序显示。

`MMDFMessage` 实例提供了下列方法，与 [`mboxMessage`](#mailbox.mboxMessage "mailbox.mboxMessage") 所提供的类似：

get\_from()[¶](#mailbox.MMDFMessage.get_from "Link to this definition")

返回一个表示在 mbox 邮箱中标记消息起始的 "From " 行的字符串。 开头的 "From " 和末尾的换行符会被去除。

set\_from(_from\__, _time\_\=None_)[¶](#mailbox.MMDFMessage.set_from "Link to this definition")

将 "From " 行设为 _from\__，这应当被指定为不带开头的 "From " 或末尾的换行符。 为方便起见，可以指定 _time\__ 并将经过适当的格式化再添加到 _from\__。 如果指定了 _time\__，它应当是一个 [`time.struct_time`](https://docs.python.org/zh-cn/3/library/time.html#time.struct_time "time.struct_time") 实例、适合传给 [`time.strftime()`](https://docs.python.org/zh-cn/3/library/time.html#time.strftime "time.strftime") 的元组或者 `True` (以使用 [`time.gmtime()`](https://docs.python.org/zh-cn/3/library/time.html#time.gmtime "time.gmtime"))。

get\_flags()[¶](#mailbox.MMDFMessage.get_flags "Link to this definition")

返回一个指明当前所设旗标的字符串。 如果消息符合规范格式，则结果为零或各自出现一次的 `'R'`, `'O'`, `'D'`, `'F'` 和 `'A'` 按上述顺序的拼接。

set\_flags(_flags_)[¶](#mailbox.MMDFMessage.set_flags "Link to this definition")

设置由 _flags_ 所指明的旗标并重置所有其他旗标。 形参 _flags_ 应当为零或各自出现多次的 `'R'`, `'O'`, `'D'`, `'F'` 和 `'A'` 按任意顺序的拼接。

add\_flag(_flag_)[¶](#mailbox.MMDFMessage.add_flag "Link to this definition")

设置由 _flag_ 所指明的旗标而不改变其他旗标。 要一次性添加一个以上的旗标，_flag_ 可以为包含一个以上字符的字符串。

remove\_flag(_flag_)[¶](#mailbox.MMDFMessage.remove_flag "Link to this definition")

Unset the flag(s) specified by _flag_ without changing other flags. To remove more than one flag at a time, _flag_ may be a string of more than one character.

当一个 `MMDFMessage` 实例基于 [`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 实例被创建时，"From " 行会基于 `MaildirMessage` 实例的发送日期被生成，并进行下列转换：

| 
结果状态

 | 

[`MaildirMessage`](#mailbox.MaildirMessage "mailbox.MaildirMessage") 状态

 |
| --- | --- |
| 

R 旗标

 | 

S 旗标

 |
| 

O 旗标

 | 

"cur" 子目录

 |
| 

D 旗标

 | 

T 旗标

 |
| 

F 旗标

 | 

F 旗标

 |
| 

A 旗标

 | 

R 旗标

 |

当一个 `MMDFMessage` 实例基于 [`MHMessage`](#mailbox.MHMessage "mailbox.MHMessage") 实例被创建时，将进行下列转换：

| 
结果状态

 | 

[`MHMessage`](#mailbox.MHMessage "mailbox.MHMessage") 状态

 |
| --- | --- |
| 

R 旗标 和 O 旗标

 | 

非 "unseen" 序列

 |
| 

O 旗标

 | 

"unseen" 序列

 |
| 

F 旗标

 | 

"flagged" 序列

 |
| 

A 旗标

 | 

"replied" 序列

 |

当一个 `MMDFMessage` 实例基于 [`BabylMessage`](#mailbox.BabylMessage "mailbox.BabylMessage") 实例被创建时，将进行下列转换：

| 
结果状态

 | 

[`BabylMessage`](#mailbox.BabylMessage "mailbox.BabylMessage") 状态

 |
| --- | --- |
| 

R 旗标 和 O 旗标

 | 

非 "unseen" 标签

 |
| 

O 旗标

 | 

"unseen" 标签

 |
| 

D 旗标

 | 

"deleted" 标签

 |
| 

A 旗标

 | 

"answered" 标签

 |

当一个 `MMDFMessage` 实例基于 [`mboxMessage`](#mailbox.mboxMessage "mailbox.mboxMessage") 实例被创建时，"From " 行会被拷贝并直接对应所有旗标：

| 
结果状态

 | 

[`mboxMessage`](#mailbox.mboxMessage "mailbox.mboxMessage") 状态

 |
| --- | --- |
| 

R 旗标

 | 

R 旗标

 |
| 

O 旗标

 | 

O 旗标

 |
| 

D 旗标

 | 

D 旗标

 |
| 

F 旗标

 | 

F 旗标

 |
| 

A 旗标

 | 

A 旗标

 |

## 异常[¶](#exceptions "Link to this heading")

`mailbox` 模块中定义了下列异常类：

_exception_ mailbox.Error[¶](#mailbox.Error "Link to this definition")

所有其他模块专属的异常的基类。

_exception_ mailbox.NoSuchMailboxError[¶](#mailbox.NoSuchMailboxError "Link to this definition")

在期望获得一个邮箱但未找到时被引发，例如当使用不存在的路径来实例化一个 [`Mailbox`](#mailbox.Mailbox "mailbox.Mailbox") 子类时 (且将 _create_ 形参设为 `False`)，或是当打开一个不存在的路径时。

_exception_ mailbox.NotEmptyError[¶](#mailbox.NotEmptyError "Link to this definition")

在期望一个邮箱为空但不为空时被引发，例如当删除一个包含消息的文件夹时。

_exception_ mailbox.ExternalClashError[¶](#mailbox.ExternalClashError "Link to this definition")

Raised when some mailbox-related condition beyond the control of the program causes it to be unable to proceed, such as when failing to acquire a lock that another program already holds, or when a uniquely generated file name already exists.

_exception_ mailbox.FormatError[¶](#mailbox.FormatError "Link to this definition")

在某个文件中的数据无法被解析时被引发，例如当一个 [`MH`](#mailbox.MH "mailbox.MH") 实例尝试读取已损坏的 `.mh_sequences` 文件时。

## 例子[¶](#examples "Link to this heading")

一个打印邮箱中所有看起来值得关注的消息的主题的简单示例:

import mailbox
for message in mailbox.mbox('~/mbox'):
    subject \= message\['subject'\]       \# 可能为 None。
    if subject and 'python' in subject.lower():
        print(subject)

要将所有邮件从 Babyl 邮箱拷贝到 MH 邮箱，并转换所有可转换的格式专属信息:

import mailbox
destination \= mailbox.MH('~/Mail')
destination.lock()
for message in mailbox.Babyl('~/RMAIL'):
    destination.add(mailbox.MHMessage(message))
destination.flush()
destination.unlock()

这个示例将来自多个邮件列表的邮件分类放入不同的邮箱，小心避免由于其他程序的并发修改导致的邮件损坏，由于程序中断导致的邮件丢失，或是由于邮箱中消息格式错误导致的意外终止:

import mailbox
import email.errors

list\_names \= ('python-list', 'python-dev', 'python-bugs')

boxes \= {name: mailbox.mbox('~/email/%s' % name) for name in list\_names}
inbox \= mailbox.Maildir('~/Maildir', factory\=None)

for key in inbox.iterkeys():
    try:
        message \= inbox\[key\]
    except email.errors.MessageParseError:
        continue                \# 消息格式错误。 不做处理。

    for name in list\_names:
        list\_id \= message\['list-id'\]
        if list\_id and name in list\_id:
            \# 获取要使用的邮箱
            box \= boxes\[name\]

            \# 在移除原始消息之前将副本写入磁盘。
            \# 如果发生崩溃，你可能重复写入消息，
            \# 但那也比完全丢失这条消息要好。
            box.lock()
            box.add(message)
            box.flush()
            box.unlock()

            \# 移除原始消息
            inbox.lock()
            inbox.discard(key)
            inbox.flush()
            inbox.unlock()
            break               \# 已发现目标，停止查找。

for box in boxes.itervalues():
    box.close()
