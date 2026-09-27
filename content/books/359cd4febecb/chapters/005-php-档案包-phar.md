要获取 PHPUnit，最简单的方法是下载 PHPUnit 的 [PHP 档案包 (PHAR)](https://link.w3cschool.cn/?target=http%3A%2F%2Fphp.net%2Fphar)，它将 PHPUnit 所需要的所有必要组件（以及某些可选组件）捆绑在单个文件中：

要使用 PHP档案包(PHAR)需要有 [phar](https://link.w3cschool.cn/?target=http%3A%2F%2Fphp.net%2Fmanual%2Fen%2Fphar.installation.php) 扩展。

要使用 PHAR 的 `--self-update` 功能需要有 [openssl](https://link.w3cschool.cn/?target=http%3A%2F%2Fphp.net%2Fmanual%2Fen%2Fopenssl.installation.php) 扩展。

如果启用了 [Suhosin](https://link.w3cschool.cn/?target=http%3A%2F%2Fsuhosin.org%2F) 扩展，需要在 `php.ini` 中允许执行 PHAR：

```
suhosin.executor.include.whitelist = phar
```

### Note

要从 `https://phar.phpunit.de/` 下载，需要[支持 TLS/SNI](https://link.w3cschool.cn/?target=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FServer_Name_Indication)的客户端，例如 wget 1.14（或更高版本）。

如果要全局安装 PHAR：

```
$ wget https://phar.phpunit.de/phpunit.phar
$ chmod +x phpunit.phar
$ sudo mv phpunit.phar /usr/local/bin/phpunit
$ phpunit --version
PHPUnit x.y.z by Sebastian Bergmann and contributors.
```

也可以直接使用下载的 PHAR 文件：

```
$ wget https://phar.phpunit.de/phpunit.phar
$ php phpunit.phar --version
PHPUnit x.y.z by Sebastian Bergmann and contributors.
```

### Windows

整体上说，在 Windows 下安装 PHAR 和手工[在 Windows 下安装 Composer](https://link.w3cschool.cn/?target=https%3A%2F%2Fgetcomposer.org%2Fdoc%2F00-intro.md%23installation-windows) 是一样的过程：

1.  为 PHP 的二进制可执行文件建立一个目录，例如 `C:\bin`
    
2.  将 **`;C:\bin`** 附加到 `PATH` 环境变量中（[相关帮助](https://link.w3cschool.cn/?target=http%3A%2F%2Fstackoverflow.com%2Fquestions%2F6318156%2Fadding-python-path-on-windows-7)）
    
3.  下载 [](https://link.w3cschool.cn/?target=https%3A%2F%2Fphar.phpunit.de%2Fphpunit.phar)[https://phar.phpunit.de/phpunit.phar](https://link.w3cschool.cn/?target=https%3A%2F%2Fphar.phpunit.de%2Fphpunit.phar) 并将文件保存到 `C:\bin\phpunit.phar`
    
4.  打开命令行（例如，按 **Windows**+**R** » 输入 **`cmd`** » **ENTER**)
    
5.  建立外包覆批处理脚本（最后得到 `C:\bin\phpunit.cmd`）：

```
C:\Users\username> cd C:\bin
C:\bin> echo @php "%~dp0phpunit.phar" %* > phpunit.cmd
C:\bin> exit
```

1.  新开一个命令行窗口，确认一下可以在任意路径下执行 PHPUnit：

```
C:\Users\username> phpunit --version
PHPUnit x.y.z by Sebastian Bergmann and contributors.
```

对于 Cygwin 或 MingW32 (例如 TortoiseGit) shell 环境，可以跳过第五步。 取而代之的是，把文件保存为 `phpunit` （没有 `.phar` 扩展名），然后用 **`chmod 775 phpunit`** 将其设为可执行。

### 校验 PHPUnit PHAR 发行包

由 PHPUnit 项目分发的所有官方代码发行包都由发行包管理器进行签名。在 [phar.phpunit.de](https://link.w3cschool.cn/?target=https%3A%2F%2Fphar.phpunit.de%2F) 上有 PGP 签名和 SHA1 散列值可用于校验。

下面的例子详细说明了如何对发行包进行校验。首先下载 `phpunit.phar` 和与之对应的单独 PGP 签名 `phpunit.phar.asc`：

```
wget https://phar.phpunit.de/phpunit.phar
wget https://phar.phpunit.de/phpunit.phar.asc
```

用单独的签名(`phpunit.phar`)对 PHPUnit 的 PHP 档案包(`phpunit.phar.asc`)进行校验：

```
gpg phpunit.phar.asc
gpg: Signature made Sat 19 Jul 2014 01:28:02 PM CEST using RSA key ID 6372C20A
gpg: Can't check signature: public key not found
```

在本地系统中没有发行包管理器的公钥(`6372C20A`)。为了能进行校验，必须从某个密钥服务器上取得发行包管理器的公钥。其中一个服务器是 `pgp.uni-mainz.de`。所有密钥服务器是链接在一起的，因此连接到任一密钥服务器都可以。

```
gpg --keyserver pgp.uni-mainz.de --recv-keys 0x4AA394086372C20A
gpg: requesting key 6372C20A from hkp server pgp.uni-mainz.de
gpg: key 6372C20A: public key "Sebastian Bergmann <sb@sebastian-bergmann.de>" imported
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
```

现在已经取得了条目名称为"Sebastian Bergmann [sb@sebastian-bergmann.de](mailto:sb@sebastian-bergmann.de)"的公钥。不过无法检验这个密钥确实是由名叫 Sebastian Bergmann 的人创建的。但是可以先试着校验发行包的签名：

```
gpg phpunit.phar.asc
gpg: Signature made Sat 19 Jul 2014 01:28:02 PM CEST using RSA key ID 6372C20A
gpg: Good signature from "Sebastian Bergmann <sb@sebastian-bergmann.de>"
gpg:                 aka "Sebastian Bergmann <sebastian@php.net>"
gpg:                 aka "Sebastian Bergmann <sebastian@thephp.cc>"
gpg:                 aka "Sebastian Bergmann <sebastian@phpunit.de>"
gpg:                 aka "Sebastian Bergmann <sebastian.bergmann@thephp.cc>"
gpg:                 aka "[jpeg image of size 40635]"
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: D840 6D0D 8294 7747 2937  7831 4AA3 9408 6372 C20A
```

此时，签名已经没问题了，但是这个公钥还不能信任。签名没问题意味着文件未被篡改。可是由于公钥加密系统的性质，还需要再校验密钥 `6372C20A` 确实是由真正的 Sebastian Bergmann 创建的。

任何攻击者都能创建公钥并将其上传到公钥服务器。他们可以建立一个带恶意的发行包，并用这个假密钥进行签名。这样，如果尝试对这个损坏了的发行包进行签名校验，由于密钥是“真”密钥，校验将成功完成。因此，需要对这个密钥的真实性进行校验。如何对公钥的真实性进行校验已经超出了本文档的范畴。

有个比较谨慎的做法是创建一个脚本来管理 PHPUnit 的安装，在运行测试套件之前校验 GnuPG 签名。例如：

```

#!/usr/bin/env bash
clean=1 # 是否在测试完成之后删除 phpunit.phar ？
aftercmd="php phpunit.phar --bootstrap bootstrap.php src/tests"
gpg --fingerprint D8406D0D82947747293778314AA394086372C20A
if [ $? -ne 0 ]; then
    echo -e "\033[33mDownloading PGP Public Key...\033[0m"
    gpg --recv-keys D8406D0D82947747293778314AA394086372C20A
    # Sebastian Bergmann <sb@sebastian-bergmann.de>
    gpg --fingerprint D8406D0D82947747293778314AA394086372C20A
    if [ $? -ne 0 ]; then
        echo -e "\033[31mCould not download PGP public key for verification\033[0m"
        exit
    fi
fi

if [ "$clean" -eq 1 ]; then
    # 如果存在就清理掉
    if [ -f phpunit.phar ]; then
        rm -f phpunit.phar
    fi
    if [ -f phpunit.phar.asc ]; then
        rm -f phpunit.phar.asc
    fi
fi

# 抓取最新的发行版和对应的签名
if [ ! -f phpunit.phar ]; then
    wget https://phar.phpunit.de/phpunit.phar
fi
if [ ! -f phpunit.phar.asc ]; then
    wget https://phar.phpunit.de/phpunit.phar.asc
fi

# 在运行前先校验
gpg --verify phpunit.phar.asc phpunit.phar
if [ $? -eq 0 ]; then
    echo
    echo -e "\033[33mBegin Unit Testing\033[0m"
    # 运行测试套件
    `$after_cmd`
    # 清理
    if [ "$clean" -eq 1 ]; then
        echo -e "\033[32mCleaning Up!\033[0m"
        rm -f phpunit.phar
        rm -f phpunit.phar.asc
    fi
else
    echo
    chmod -x phpunit.phar
    mv phpunit.phar /tmp/bad-phpunit.phar
    mv phpunit.phar.asc /tmp/bad-phpunit.phar.asc
    echo -e "\033[31mSignature did not match! PHPUnit has been moved to /tmp/bad-phpunit.phar\033[0m"
    exit 1
fi
```
