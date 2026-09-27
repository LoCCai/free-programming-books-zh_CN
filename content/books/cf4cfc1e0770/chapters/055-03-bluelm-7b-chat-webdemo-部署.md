# BlueLM-7B-Chat WebDemo 部署

## 模型介绍

BlueLM-7B 是由 vivo AI 全球研究院自主研发的大规模预训练语言模型，参数规模为 70 亿。BlueLM-7B 在 [C-Eval](https://cevalbenchmark.com/index.html) 和 [CMMLU](https://github.com/haonan-li/CMMLU) 上均取得领先结果，对比同尺寸开源模型中具有较强的竞争力(截止11月1号)。本次发布共包含 7B 模型的 Base 和 Chat 两个版本。

模型下载链接见：

|                           基座模型                           |                           对齐模型                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| 🤗 [BlueLM-7B-Base](https://huggingface.co/vivo-ai/BlueLM-7B-Base) | 🤗 [BlueLM-7B-Chat](https://huggingface.co/vivo-ai/BlueLM-7B-Chat) |
| 🤗 [BlueLM-7B-Base-32K](https://huggingface.co/vivo-ai/BlueLM-7B-Base-32K) | 🤗 [BlueLM-7B-Chat-32K](https://huggingface.co/vivo-ai/BlueLM-7B-Chat-32K) |
|                                                              |                  🤗 [BlueLM-7B-Chat-4bits](https://huggingface.co/vivo-ai/BlueLM-7B-Chat-4bits)                   |

## 环境准备

在 autodl 平台中租赁一个 3090 等 24G 显存的显卡机器，如下图所示镜像选择 PyTorch-->1.11.0-->3.8(ubuntu20.04)-->11.3，Cuda版本在11.3以上都可以。

![](https://raw.githubusercontent.com/datawhalechina/self-llm/HEAD/models/BlueLM/images/202403191628941.png)

接下来打开刚刚租用服务器的 JupyterLab(也可以使用vscode ssh远程连接服务器)，并且打开其中的终端开始环境配置、模型下载和运行 demo。

pip 换源加速下载并安装依赖包

```bash
# 升级pip
python -m pip install --upgrade pip
# 设置pip镜像源
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
# 安装软件依赖
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

在`/root/autodl-tmp`路径下新建 `chatBot.py` 文件并在其中输入以下内容：

```python
# 导入所需的库
from transformers import AutoTokenizer, AutoModelForCausalLM, GenerationConfig, TextStreamer
import torch
import streamlit as st

# 在侧边栏中创建一个标题和一个链接
with st.sidebar:
    st.markdown("## BlueLM-7B-Chat")
    "[开源大模型食用指南 self-llm](https://github.com/datawhalechina/self-llm.git)"
    # 创建一个滑块，用于选择最大长度，范围在0到1024之间，默认值为512
    max_length = st.slider("max_length", 0, 1024, 512, step=1)

# 创建一个标题和一个副标题
st.title("💬 BlueLM Chatbot")
st.caption("🚀 A streamlit chatbot powered by Self-LLM")

# 定义模型路径
mode_name_or_path = '/root/autodl-tvivo-ai/BlueLM-7B-Chat'

# 定义一个函数，用于获取模型和tokenizer
@st.cache_resource
def get_model():
    # 从预训练的模型中获取tokenizer
    tokenizer = AutoTokenizer.from_pretrained(mode_name_or_path, trust_remote_code=True)
    # 从预训练的模型中获取模型，并设置模型参数
    model = AutoModelForCausalLM.from_pretrained(mode_name_or_path, trust_remote_code=True,torch_dtype=torch.bfloat16,  device_map="auto")
    # 从预训练的模型中获取生成配置
    model.generation_config = GenerationConfig.from_pretrained(mode_name_or_path)
    # 设置生成配置的pad_token_id为生成配置的eos_token_id
    model.generation_config.pad_token_id = model.generation_config.eos_token_id
    # 设置模型为评估模式
    model.eval()  
    return tokenizer, model

# 加载BlueLM的model和tokenizer
tokenizer, model = get_model()

def build_prompt(messages, prompt):
    """
    构建会话提示信息。

    参数:
    messages - 包含会话历史的元组列表，每个元组是（用户查询，AI响应）。
    prompt - 当前用户输入的文本。

    返回值:
    res - 构建好的包含会话历史和当前用户提示的字符串。
    """
    res = ""
    # 遍历历史消息，构建会话历史字符串
    for query, response in messages:
        res += f"[|Human|]:{query}[|AI|]:{response}</s>"
    # 添加当前用户提示
    res += f"[|Human|]:{prompt}[|AI|]:"
    return res


class BlueLMStreamer(TextStreamer):
    """
    BlueLM流式处理类，用于处理模型的输入输出流。

    参数:
    tokenizer - 用于分词和反分词的tokenizer实例。
    """
    def __init__(self, tokenizer: "AutoTokenizer"):
        self.tokenizer = tokenizer
        self.tokenIds = []
        self.prompt = ""
        self.response = ""
        self.first = True

    def put(self, value):
        """
        添加token id到流中。

        参数:
        value - 要添加的token id。
        """
        if self.first:
            self.first = False
            return
        self.tokenIds.append(value.item())
        # 将token ids解码为文本
        text = tokenizer.decode(self.tokenIds, skip_special_tokens=True)

    def end(self):
        """
        结束流处理，将当前流中的文本作为响应，并重置流状态。
        """
        self.first = True
        # 将token ids解码为文本
        text = tokenizer.decode(self.tokenIds, skip_special_tokens=True)
        self.response = text
        self.tokenIds = []



# 初始化session状态，如果messages不存在则初始化为空，并添加欢迎信息
if "messages" not in st.session_state:
    st.session_state.messages = []
    st.session_state.messages.append(("", "你好，有什么可以帮助你吗？"))


# 遍历并显示历史消息
for msg in st.session_state.messages:
    st.chat_message("assistant").write(msg[1])


# 处理用户输入
if prompt_text := st.chat_input():
    prompt_text = prompt_text.strip()
    st.chat_message("user").write(prompt_text)
    messages = st.session_state.messages
    # 使用BlueLMStreamer处理流式模型输入
    streamer = BlueLMStreamer(tokenizer=tokenizer)
    # 构建当前会话的提示信息
    prompt = build_prompt(messages=messages, prompt=prompt_text)
    # 将提示信息编码为模型输入
    inputs_tensor = tokenizer(prompt, return_tensors="pt")
    inputs_tensor = inputs_tensor.to("cuda:0")
    input_ids = inputs_tensor["input_ids"]
    # 通过模型生成响应
    outputs = model.generate(input_ids=input_ids, max_new_tokens=max_length, streamer=streamer)
    # 将模型的响应显示给用户
    st.chat_message("assistant").write(streamer.response)
    # 更新会话历史
    st.session_state.messages.append((prompt_text, streamer.response))

```

## 运行 demo

在终端中运行以下命令，启动streamlit服务，并按照 `autodl` 的指示将端口映射到本地，然后在浏览器中打开链接 http://localhost:6006/ ，即可看到聊天界面。

```bash
streamlit run /root/autodl-tmp/chatBot.py --server.address 127.0.0.1 --server.port 6006
```

如下所示：

![image-20240320215320315](https://raw.githubusercontent.com/datawhalechina/self-llm/HEAD/models/BlueLM/images/202403202153465.png)
