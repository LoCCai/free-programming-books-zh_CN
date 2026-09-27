Added in version 3.6.

**源代码:** [Lib/secrets.py](https://github.com/python/cpython/tree/3.14/Lib/secrets.py)

* * *

`secrets` 模块用于生成高度加密的随机数，适于管理密码、账户验证、安全凭据以及相关的加密数据。

具体而言，应当使用 `secrets` 来代替 [`random`](https://docs.python.org/zh-cn/3/library/random.html#module-random "random: Generate pseudo-random numbers with various common distributions.") 模块中的默认伪随机数生成器，后者被设计用于建模和模拟，而不宜用于安全或加密。

## 随机数[¶](#random-numbers "Link to this heading")

The `secrets` module provides access to the most secure source of randomness that your operating system provides.

_class_ secrets.SystemRandom[¶](#secrets.SystemRandom "Link to this definition")

用操作系统提供的最高质量源生成随机数的类。详见 [`random.SystemRandom`](https://docs.python.org/zh-cn/3/library/random.html#random.SystemRandom "random.SystemRandom")。

secrets.choice(_seq_)[¶](#secrets.choice "Link to this definition")

返回一个从非空序列中随机选取的元素。

secrets.randbelow(_exclusive\_upper\_bound_)[¶](#secrets.randbelow "Link to this definition")

返回 \[0, _exclusive\_upper\_bound_) 范围内的随机整数。

secrets.randbits(_k_)[¶](#secrets.randbits "Link to this definition")

返回有 _k_ 个随机比特位的非负整数。

## 生成 Token[¶](#generating-tokens "Link to this heading")

The `secrets` module provides functions for generating secure tokens, suitable for applications such as password resets, hard-to-guess URLs, and similar.

secrets.token\_bytes(_nbytes\=None_)[¶](#secrets.token_bytes "Link to this definition")

Return a random byte string containing _nbytes_ number of bytes.

If _nbytes_ is not specified or `None`, [`DEFAULT_ENTROPY`](#secrets.DEFAULT_ENTROPY "secrets.DEFAULT_ENTROPY") is used instead.

\>>> token\_bytes(16)
b'\\xebr\\x17D\*t\\xae\\xd4\\xe3S\\xb6\\xe2\\xebP1\\x8b'

secrets.token\_hex(_nbytes\=None_)[¶](#secrets.token_hex "Link to this definition")

Return a random text string, in hexadecimal. The string has _nbytes_ random bytes, each byte converted to two hex digits.

If _nbytes_ is not specified or `None`, [`DEFAULT_ENTROPY`](#secrets.DEFAULT_ENTROPY "secrets.DEFAULT_ENTROPY") is used instead.

\>>> token\_hex(16)
'f9bf78b9a18ce6d46a0cd2b0b86df9da'

secrets.token\_urlsafe(_nbytes\=None_)[¶](#secrets.token_urlsafe "Link to this definition")

Return a random URL-safe text string, containing _nbytes_ random bytes. The text is Base64 encoded, so on average each byte results in approximately 1.3 characters.

If _nbytes_ is not specified or `None`, [`DEFAULT_ENTROPY`](#secrets.DEFAULT_ENTROPY "secrets.DEFAULT_ENTROPY") is used instead.

\>>> token\_urlsafe(16)
'Drmhze6EPcv0fN\_81Bj-nA'

### Token 应当使用多少个字节？[¶](#how-many-bytes-should-tokens-use "Link to this heading")

To be secure against [brute-force attacks](https://en.wikipedia.org/wiki/Brute-force_attack), tokens need to have sufficient randomness. Unfortunately, what is considered sufficient will necessarily increase as computers get more powerful and able to make more guesses in a shorter period. As of 2015, it is believed that 32 bytes (256 bits) of randomness is sufficient for the typical use-case expected for the `secrets` module.

要自行管理 Token 长度的用户，可以通过为 `token_*` 函数指定 [`int`](https://docs.python.org/zh-cn/3/builtins/functions.html#int "int") 参数显式指定 Token 要使用多大的随机性。该参数以字节数表示随机性大小。

Otherwise, if no argument is provided, or if the argument is `None`, the `token_*` functions use [`DEFAULT_ENTROPY`](#secrets.DEFAULT_ENTROPY "secrets.DEFAULT_ENTROPY") instead.

secrets.DEFAULT\_ENTROPY[¶](#secrets.DEFAULT_ENTROPY "Link to this definition")

`token_*` 函数所使用的默认随机字节数。

该值可能随时发生变化，包括在维护版本发布的时候。

## 其他函数[¶](#other-functions "Link to this heading")

secrets.compare\_digest(_a_, _b_)[¶](#secrets.compare_digest "Link to this definition")

Return `True` if strings or [bytes-like objects](https://docs.python.org/zh-cn/3/glossary.html#term-bytes-like-object) _a_ and _b_ are equal, otherwise `False`, using a "constant-time compare" to reduce the risk of [timing attacks](https://web.archive.org/web/20250815071532/https://codahale.com/a-lesson-in-timing-attacks/). See [`hmac.compare_digest()`](https://docs.python.org/zh-cn/3/library/hmac.html#hmac.compare_digest "hmac.compare_digest") for additional details.

## 应用技巧与最佳实践[¶](#recipes-and-best-practices "Link to this heading")

本节展示了一些使用 `secrets` 来管理基本安全级别的应用技巧和最佳实践。

生成长度为八个字符的字母数字密码：

import string
import secrets
alphabet \= string.ascii\_letters + string.digits
password \= ''.join(secrets.choice(alphabet) for i in range(8))

备注

应用程序不应该 [**以可恢复的格式存储密码**](https://cwe.mitre.org/data/definitions/257.html)，无论是纯文本的还是加密的。 它们应当使用高加密强度的单向（不可逆）哈希函数加盐并执行哈希运算。

生成长度为十个字符的字母数字密码，包含至少一个小写字母，至少一个大写字母以及至少三个数字：

import string
import secrets
alphabet \= string.ascii\_letters + string.digits
while True:
    password \= ''.join(secrets.choice(alphabet) for i in range(10))
    if (any(c.islower() for c in password)
            and any(c.isupper() for c in password)
            and sum(c.isdigit() for c in password) \>= 3):
        break

生成 [XKCD 风格的密码串](https://xkcd.com/936/)：

import secrets
\# 在标准 Linux 系统中，使用方便的字典文件。
\# 其他系统平台可能需要提供它们专用的词列表。
with open('/usr/share/dict/words') as f:
    words \= \[word.strip() for word in f\]
    password \= ' '.join(secrets.choice(words) for i in range(4))

生成包含安全 Token 的难以猜测的临时 URL，适用于密码恢复应用：

import secrets
url \= 'https://example.com/reset=' + secrets.token\_urlsafe()
