### 背景

一个每天只需要运行一次的策略（每天只需要去交易所拿一次行情数据，计算完成后输出结果），放到EC2里跑有点浪费资源，不如部署到aws lambda中。

本篇内容主要记录在使用lambda时遇到的依赖资源过大的问题。

> 下面主要分两部分来记录，

### 第一部分：lambda使用

关于lambda应该不用详细介绍，直接看这里即可：[lambda文档](https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/welcome.html)

lambda的使用比较简单，创建时有三种方式，前两种（从头开始创建和使用蓝图）可以直接在aws面板上编辑代码，或者上传代码压缩包（zip）来部署，第三种是基于容器来部署。

根据项目不同情况，有三种部署方式：

#### 1\. 没有外部依赖的代码，比如:

```
import json


def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps({'content': 'hi the5fire'})
    }
```

可以直接在面板编辑并更新项目。

#### 2\. 有外部依赖的情况，比如:

```
import json

import requests


def lambda_handler(event, context):
    r = requests.get('https://api.github.com/user', auth=('user', 'pass'))

    return {
        'statusCode': 200,
        'body': json.dumps({'content': f'hi the5fire, code:{r.status_code}'})
    }
```

这种情况需要处理外部依赖，有两个方案：

方案一：在部署项目时需要把依赖打包一起部署。打包命令如下 ：

```
pip install -r requirements.txt --target .
zip -r lambda_function.zip . -x '*.git*'
```

之后把zip包在aws lambda管理面板上传即可。

方案二：可以通过layer的方式处理

即在lambda管理面包上找到【层】的菜单，进去创建一个新的层，把依赖单独打包上传到该层，最后关联到你的lambda函数下面即可。

这两个方案都有一个限制就是你的整个项目+依赖包的大小不能超过`250M`，如果超了，那就看第三种方式。

#### 3\. 使用容器部署的方式，也就是ECR

简单来说就是把你的代码放进容器里，镜像打包注册到aws的ecr，然后lambda直接运行容器.

在项目中增加一个Dockerfile:

```
FROM public.ecr.aws/lambda/python:3.12

# Copy requirements.txt
COPY .  ${LAMBDA_TASK_ROOT}

# Install the specified packages
RUN pip install -r requirements.txt

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "lambda_function.lambda_handler" ]
```

项目结构如下:

```
.
|-- .github/workflows/deploy.yml
|-- Dockerfile
|-- README.md
|-- lambda_function.py
|-- requirements.txt
|-- strategy.py
```

部署的话需要使用docker和aws cli工具，参考这里：[https://docs.aws.amazon.com/zh\_cn/lambda/latest/dg/python-image.html](https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/python-image.html)，我自己的使用方式也会放到下面github action workflow配置中。

### 第二部分：github action配置

使用github action部署lambda之前，需要先去aws的IAM管理后台创建访问KEY，然后配置到github 的action/secrets中。

对于使用zip部署的方式也分两种情况，压缩包小于10M可以直接在上传，大于10M、小于250M的需要通过s3来上传。

所以这部分的action配置也分两种。

1.  直接上传zip文件的方式:

```
# .github/workflows/deploy.yml
name: Deploy Lambda Function

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Set up Python 3.12
      uses: actions/setup-python@v2
      with:
        python-version: 3.12

    - name: Install & zip
      run: |
        pip install --upgrade pip
        pip install -r ./requirements.txt
        zip -r lambda_function.zip . -x '*.git*'

    - name: Deploy to AWS Lambda
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_DEFAULT_REGION: ${{ secrets.AWS_REGION }}

      run: |
        # Assuming you have an IAM role ARN for your Lambda function
        aws lambda update-function-code \
          --function-name helloworld \
          --zip-file fileb://lambda_function.zip
```

1.  通过 s3 上传zip包并部署:

这里需要先到aws s3上创建桶

```
name: Deploy Lambda Function

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Set up Python 3.12
      uses: actions/setup-python@v2
      with:
        python-version: 3.12

    - name: Install & zip
      run: |
        pip install --upgrade pip
        pip install -r ./requirements.txt --target .
        zip -r lambda_function.zip . -x '*.git*'

    - name: Deploy to AWS Lambda
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        AWS_DEFAULT_REGION: ${{ secrets.AWS_REGION }}

      run: |
        # Assuming you have an IAM role ARN for your Lambda function
        aws s3 cp ./lambda_function.zip s3://${{ secrets.BUCKET_NAME }}/
        aws lambda update-function-code --function-name ${{ secrets.FUNCTION_NAME }} \
          --s3-bucket ${{ secrets.BUCKET_NAME }} --s3-key lambda_function.zip
```

1.  使用ecr方式部署:

这一步需要配置aws account id，你在ECR创建完存储库之后就可以从URI上看到。

```
name: Deploy Lambda Function

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      AWS_DEFAULT_REGION: ${{ secrets.AWS_REGION }}

    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: get login
      run: |
        aws ecr get-login-password --region ${{ secrets.AWS_REGION}}| docker login --username AWS --password-stdin ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com

    - name: update image

      run: |
        docker build -t docker-image:test .
        docker tag docker-image:test ${{secrets.AWS_ACCOUNT_ID }}.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/${{ secrets.FUNCTION_NAME }}:latest
        docker push ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/${{ secrets.FUNCTION_NAME }}:latest

    - name: update function
      run: |
         aws lambda update-function-code \
            --function-name ${{ secrets.FUNCTION_NAME }} \
            --image-uri ${{secrets.AWS_ACCOUNT_ID}}.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/${{ secrets.FUNCTION_NAME }}:latest
```

需要说明的是，我这里都是只使用github action来做update function code，并没有使用它来创建function的需求，因此没写这创建的逻辑。对于使用ecr来部署的lambda function来说，需要先提交代码到github上，运行action后生成镜像，然后再创建lambda。

最后，关于出口IP固定的配置，参考文档：[使用 Lambda 函数、Amazon VPC 和无服务器架构生成静态出站 IP 地址](https://docs.aws.amazon.com/zh_cn/prescriptive-guidance/latest/patterns/generate-a-static-outbound-ip-address-using-a-lambda-function-amazon-vpc-and-a-serverless-architecture.html)

示例代码： [https://github.com/the5fire/action-lambda-demo/commits/main/](https://github.com/the5fire/action-lambda-demo/commits/main/)
