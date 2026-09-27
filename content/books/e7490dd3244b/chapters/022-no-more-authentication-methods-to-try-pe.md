> 简言之就是ssh client更新了，不支持rsa的私钥，导致无法登陆。

ssh登陆服务器，出现类似下面的提示：

```
debug3: authmethod_is_enabled publickey
debug1: Next authentication method: publickey
debug1: Offering public key: /home/user/.ssh/id_rsa RSA ... agent
debug1: send_pubkey_test: no mutual signature algorithm <-- ssh-rsa is not enabled 
debug1: No more authentication methods to try.
user@hostname: Permission denied (publickey).
```

本来以为是key弄错了，或者服务器被hei了。加上 `-v` 参数才发现问题。

解决方案也很简单，就是在 ~/.ssh/config 中增加:

```
Host *
    ServerAliveInterval 30
    PubkeyAcceptedKeyTypes +ssh-rsa
```

如果是出现：no matching host key type found. Their offer: ssh-rsa,ssh-dss 的错误，还需要配置：

```
HostKeyAlgorithms=ssh-rsa,ssh-dss
```

具体原因： [https://www.openssh.com/txt/release-8.2](https://www.openssh.com/txt/release-8.2) 参考：[https://confluence.atlassian.com/bitbucketserverkb/ssh-rsa-key-rejected-with-message-no-mutual-signature-algorithm-1026057701.html](https://confluence.atlassian.com/bitbucketserverkb/ssh-rsa-key-rejected-with-message-no-mutual-signature-algorithm-1026057701.html)
