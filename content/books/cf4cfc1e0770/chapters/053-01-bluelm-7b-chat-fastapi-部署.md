# BlueLM-7B-Chat FastApi 部署

## 模型介绍

BlueLM-7B 是由 vivo AI 全球研究院自主研发的大规模预训练语言模型，参数规模为 70 亿。BlueLM-7B 在 [C-Eval](https://cevalbenchmark.com/index.html) 和 [CMMLU](https://github.com/haonan-li/CMMLU) 上均取得领先结果，对比同尺寸开源模型中具有较强的竞争力(截止11月1号)。本次发布共包含 7B 模型的 Base 和 Chat 两个版本。

模型下载链接见：

|                           基座模型                           |                           对齐模型                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| 🤗 [BlueLM-7B-Base](https://huggingface.co/vivo-ai/BlueLM-7B-Base) | 🤗 [BlueLM-7B-Chat](https://huggingface.co/vivo-ai/BlueLM-7B-Chat) |
| 🤗 [BlueLM-7B-Base-32K](https://huggingface.co/vivo-ai/BlueLM-7B-Base-32K) | 🤗 [BlueLM-7B-Chat-32K](https://huggingface.co/vivo-ai/BlueLM-7B-Chat-32K) |
|                                                              | 🤗 [BlueLM-7B-Chat-4bits](https://huggingface.co/vivo-ai/BlueLM-7B-Chat-4bits) |

## 环境准备

这里在 [Autodl](https://www.autodl.com/) 平台中租赁一个3090 等 24G 显存的显卡机器，如下图所示镜像选择 PyTorch-->1.11.0-->3.8(ubuntu20.04)-->11.3，Cuda版本在11.3以上都可以。

![image-20240319162858866](https://raw.githubusercontent.com/datawhalechina/self-llm/HEAD/models/BlueLM/images/202403191628941.png)

接下来打开刚刚租用服务器的 JupyterLab(也可以使用vscode ssh远程连接服务器)，并且打开其中的终端开始环境配置、模型下载和运行 demo。

pip 换源加速下载并安装依赖包

```bash
# 升级pip
python -m pip install --upgrade pip
# 设置pip镜像源
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
# 安装软件依赖
pip install fastapi==0.104.1
pip install uvicorn==0.24.0.post1
pip install requests==2.25.1
pip install modelscope==1.11.0
pip install transformers==4.37.0
pip install streamlit==1.24.0
pip install sentencepiece==0.1.99
pip install accelerate==0.24.1
pip install transformers_stream_generator==0.0.4
```

## 模型下载

使用`Modelscope API` 下载`BlueLM-7B-Chat`模型，模型路径为`/root/autodl-tmp`。在 /root/autodl-tmp 下创建model_download.py文件内容如下: 

```python
from modelscope import snapshot_download
model_dir = snapshot_download("vivo-ai/BlueLM-7B-Chat", cache_dir='/root/autodl-tmp', revision="master")
```

## 代码准备

在 /root/autodl-tmp 路径下新建 api.py 文件内容如下: 

```python
from fastapi import FastAPI, Request
from transformers import AutoTokenizer, AutoModelForCausalLM, GenerationConfig
import uvicorn
import json
import datetime
import torch

# 设置设备参数
DEVICE = "cuda"  # 使用CUDA
DEVICE_ID = "0"  # CUDA设备ID，如果未设置则为空
CUDA_DEVICE = f"{DEVICE}:{DEVICE_ID}" if DEVICE_ID else DEVICE  # 组合CUDA设备信息

# 清理GPU内存函数
def torch_gc():
    if torch.cuda.is_available():  # 检查是否可用CUDA
        with torch.cuda.device(CUDA_DEVICE):  # 指定CUDA设备
            torch.cuda.empty_cache()  # 清空CUDA缓存
            torch.cuda.ipc_collect()  # 收集CUDA内存碎片

# 创建FastAPI应用
app = FastAPI()

# 处理POST请求的端点
@app.post("/")
async def create_item(request: Request):
    global model, tokenizer  # 声明全局变量以便在函数内部使用模型和分词器
    json_post_raw = await request.json()  # 获取POST请求的JSON数据
    json_post = json.dumps(json_post_raw)  # 将JSON数据转换为字符串
    json_post_list = json.loads(json_post)  # 将字符串转换为Python对象
    prompt = json_post_list.get('prompt')  # 获取请求中的提示
    max_length = json_post_list.get('max_length')  # 获取请求中的最大长度
    
    # 构建 messages      
    messages = f"[|Human|]:{prompt}[|AI|]:"
    # 构建输入 
    inputs = tokenizer(messages, return_tensors="pt")
    inputs = inputs.to("cuda:0")
    # 通过模型获得输出
    outputs = model.generate(**inputs, max_new_tokens=max_length)
    result = tokenizer.decode(outputs.cpu()[0], skip_special_tokens=True)
    
    now = datetime.datetime.now()  # 获取当前时间
    time = now.strftime("%Y-%m-%d %H:%M:%S")  # 格式化时间为字符串
    # 构建响应JSON
    answer = {
        "response": result,
        "status": 200,
        "time": time
    }
    # 构建日志信息
    log = "[" + time + "] " + '", prompt:"' + prompt + '", response:"' + repr(result) + '"'
    print(log)  # 打印日志
    torch_gc()  # 执行GPU内存清理
    return answer  # 返回响应

# 主函数入口
if __name__ == '__main__':
    mode_name_or_path="vivo-ai/BlueLM-7B-Chat"
    # 加载预训练的分词器和模型
    tokenizer = AutoTokenizer.from_pretrained(mode_name_or_path, trust_remote_code=True)
    model = AutoModelForCausalLM.from_pretrained(mode_name_or_path, trust_remote_code=True,torch_dtype=torch.bfloat16,  device_map="auto")
    model.generation_config = GenerationConfig.from_pretrained(mode_name_or_path)
    model.generation_config.pad_token_id = model.generation_config.eos_token_id
    model.eval()  # 设置模型为评估模式
    # 启动FastAPI应用
    # 用6006端口可以将autodl的端口映射到本地，从而在本地使用api
    uvicorn.run(app, host='127.0.0.1', port=6006, workers=1)  # 在指定端口和主机上启动应用
```

## Api 部署

在bash终端中输入以下命令运行api服务: 

```bash
cd /root/autodl-tmp
python api.py
```

终端出现以下输出表示服务正在运行

![image-20240319181346315](https://raw.githubusercontent.com/datawhalechina/self-llm/HEAD/models/BlueLM/images/202403191813385.png)

默认服务端口为6006，通过 POST 方法进行调用，可以使用 curl 调用，新建一个终端在里面输入以下内容: 

```bash
curl -X POST "http://127.0.0.1:6006" \
     -H 'Content-Type: application/json' \
     -d '{"prompt": "你好"}'
```

也可以使用 python 中的 requests 库进行调用，如下所示：

```python
import requests
import json

def get_completion(prompt):
    headers = {'Content-Type': 'application/json'}
    data = {"prompt": prompt}
    response = requests.post(url='http://127.0.0.1:6006', headers=headers, data=json.dumps(data))
    return response.json()['response']

if __name__ == '__main__':
    print(get_completion('你好'))
```

运行以后得到的返回值如下所示：

```json
{"response":"你好 你好！很高兴见到你，有什么我可以帮助你的吗？","status":200,"time":"2024-03-20 12:09:29"}
```

![image-20240320121025609](https://raw.githubusercontent.com/datawhalechina/self-llm/HEAD/models/BlueLM/images/202403201210690.png)
