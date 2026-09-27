## 阿里云

[https://cr.console.aliyun.com/](https://cr.console.aliyun.com/)

## DaoCloud

[https://www.daocloud.io/mirror#accelerator-doc](https://www.daocloud.io/mirror#accelerator-doc)

## 使用

**_注：_** 上面的两家服务是免费的。

以阿里云在 Mac 下使用为例：

登陆控制台，获取专属下载地址，如 `https://xxxx.mirror.aliyuncs.com`

使用 Docker-Machine 安装虚拟机：

```
docker-machine create --engine-registry-mirror=https://xxxx.mirror.aliyuncs.com -d virtualbox default
```

查看机器的环境配置，并配置到本地，并通过 Docker 客户端访问 Docker 服务。

```
docker-machine env default
eval "$(docker-machine env default)"
docker info
```

阿里云 9 折推荐码：

> 0kbwsn

注册地址： [http://t.cn/zjxZrUk](http://t.cn/zjxZrUk)

[在 GitHub 上编辑本页面](https://github.com/willin/leader.js.cool/edit/main/docs/content/zh/basic/knowledge/docker.md)

更新时间： Fri, Aug 29, 2025

[Promise 思想](https://leader.js.cool/basic/knowledge/promise) [跨平台的Web中文字体解决方案](https://leader.js.cool/basic/knowledge/fonts)
