# 大模型生成Token的方式

> 代码已更新到 Happy-LLM 仓库第五章的代码中。

## 贪婪解码（Greedy Decoding）

### 原理说明
贪婪解码是最简单直接的文本生成策略。在每一步生成时，它总是选择概率最大的那个token作为下一个token，然后继续生成，直到遇到停止条件或达到最大长度。

**核心思想**：局部最优选择 → 希望全局最优

**数学表达**：
```
token_t = argmax P(token_t | token_1, token_2, ..., token_{t-1})
```

### 代码实现
基于我们实现的 `_greedy_decode` 方法：

```python
def _greedy_decode(self, logits: torch.Tensor) -> torch.Tensor:
    """
    贪婪解码：选择概率最大的token

    Args:
        logits: 模型输出的logits，形状为 (batch_size, vocab_size)

    Returns:
        选择的token索引，形状为 (batch_size, 1)
    """
    _, idx_next = torch.topk(logits, k=1, dim=-1)
    return idx_next
```

**关键步骤解析**：
1. `torch.topk(logits, k=1, dim=-1)`：找到logits中最大值的位置
2. 返回最大概率token的索引
3. 该token被添加到序列中，继续下一轮生成

### 使用示例
```python
# 在 generate_super 函数中调用贪婪解码
output = model.generate_super(
    input_ids,
    do_sample=False,      # 不使用采样
    num_beams=1,          # 不使用束搜索
    temperature=0.0,      # 温度为0确保确定性
    max_new_tokens=100
)
```

### 优缺点分析

**优点**：
- ✅ **速度快**：每步只需要一次前向传播和简单的argmax操作
- ✅ **结果确定**：相同的输入总是产生相同的输出
- ✅ **内存效率高**：不需要维护多个候选序列
- ✅ **实现简单**：算法逻辑直观易懂

**缺点**：
- ❌ **容易陷入局部最优**：每步的局部最优不一定等于全局最优
- ❌ **缺乏多样性**：总是产生相同的序列，缺乏创造性
- ❌ **可能产生重复内容**：容易陷入重复循环
- ❌ **忽略长程依赖**：不考虑序列的整体连贯性

### 典型例子
假设模型生成了以下概率分布：

```
输入: "今天天气"
下一token概率:
- "很" (0.4)
- "不错" (0.3)
- "真好" (0.2)
- "不太好" (0.1)
```

贪婪解码会选择"很"，生成"今天天气很"，然后继续这个过程。

### 使用场景
- **确定性任务**：如数学计算、代码生成
- **需要一致性的应用**：如API服务、自动化脚本
- **计算资源受限的环境**：需要快速生成结果
- **基准测试**：作为其他算法的对比基准

## 采样解码（Sampling Decoding）

### 原理说明
采样解码不是选择概率最大的token，而是基于模型的概率分布进行随机采样。这样可以在每次生成时产生不同的结果，增加文本的多样性和创造性。

**核心思想**：基于概率分布随机选择 → 增加多样性

**数学表达**：

```
token_t ~ P(token_t | token_1, token_2, ..., token_{t-1})
```

### 关键参数

#### 1. Temperature（温度）
- **作用**：控制概率分布的平滑程度
- **原理**：将logits除以temperature，然后进行softmax
- **效果**：
  - `temperature > 1`：分布更平滑，增加随机性
  - `temperature < 1`：分布更尖锐，更接近贪婪解码
  - `temperature → 0`：等价于贪婪解码

#### 2. Top-k Sampling
- **作用**：限制候选token的范围
- **原理**：只考虑概率最高的k个token，其他token概率设为0
- **效果**：避免选择概率很低的"奇怪"token，提高质量

### 代码实现
基于我们实现的 `_random_sample` 方法：

```python
def _random_sample(self, logits: torch.Tensor, temperature: float = 1.0, top_k: int = None) -> torch.Tensor:
    """
    随机采样：基于概率分布随机选择token

    Args:
        logits: 模型输出的logits，形状为 (batch_size, vocab_size)
        temperature: 温度参数，控制随机性
        top_k: 只考虑概率最高的k个token

    Returns:
        选择的token索引，形状为 (batch_size, 1)
    """
    # 1. 温度缩放
    logits = logits / temperature

    # 2. Top-k过滤
    if top_k is not None:
        v, _ = torch.topk(logits, min(top_k, logits.size(-1)))
        logits[logits < v[:, [-1]]] = -float('Inf')

    # 3. 计算概率并采样
    probs = F.softmax(logits, dim=-1)
    idx_next = torch.multinomial(probs, num_samples=1)
    return idx_next
```

**关键步骤解析**：
1. **温度缩放**：调整概率分布的平滑程度
2. **Top-k过滤**：移除低概率候选，提高质量
3. **概率归一化**：使用softmax得到概率分布
4. **随机采样**：根据概率分布随机选择token

### 使用示例
```python
# 基本采样
output = model.generate_super(
    input_ids,
    do_sample=True,         # 启用采样
    num_beams=1,           # 不使用束搜索
    temperature=0.8,       # 中等温度
    max_new_tokens=100
)

# 带top-k的采样
output = model.generate_super(
    input_ids,
    do_sample=True,
    num_beams=1,
    temperature=1.0,       # 较高温度增加随机性
    top_k=50,             # 只考虑前50个候选
    max_new_tokens=100
)
```

### 温度参数详解

**不同温度的效果对比**：

```python
# 示例概率分布
original_probs = [0.6, 0.2, 0.1, 0.05, 0.05]

# Temperature = 0.1 (低温度，接近贪婪)
scaled_probs = [0.85, 0.08, 0.04, 0.015, 0.015]
# 结果：很可能选择第一个token

# Temperature = 1.0 (标准温度)
scaled_probs = [0.6, 0.2, 0.1, 0.05, 0.05]
# 结果：按原始概率采样

# Temperature = 2.0 (高温度，增加随机性)
scaled_probs = [0.35, 0.25, 0.18, 0.11, 0.11]
# 结果：各个token都有机会被选中
```

### Top-k机制详解

**Top-k过滤过程**：

```python
# 假设词汇表大小为1000，top_k=50
logits = [0.1, 2.3, 0.5, 1.8, 0.3, 3.2, 0.9, 0.2, 1.5, 0.7, ...]  # 1000个值

# 步骤1：找到前50个最大值
v, _ = torch.topk(logits, 50)
threshold = v[-1]  # 第50大的值

# 步骤2：过滤
logits[logits < threshold] = -float('Inf')
# 结果：只有50个token有非零概率，其他950个token概率为0
```

### 优缺点分析

**优点**：
- ✅ **多样性好**：每次生成可能产生不同的结果
- ✅ **创造性高**：能产生意想不到的内容
- ✅ **避免重复**：不容易陷入重复循环
- ✅ **可调性强**：通过参数控制随机程度

**缺点**：
- ❌ **结果不确定**：相同输入可能产生不同输出
- ❌ **质量不稳定**：可能产生低质量或不连贯的内容
- ❌ **需要调参**：temperature和top_k需要仔细调节
- ❌ **计算开销**：需要计算完整的概率分布

### 使用场景
- **创意写作**：故事生成、诗歌创作
- **对话系统**：让对话更加自然和有趣
- **数据增强**：生成多样化的训练数据
- **探索性任务**：需要探索多种可能性的场景

## 束搜索（Beam Search）

### 原理说明
束搜索是一种启发式搜索算法，它在每一步生成时保留多个候选序列（束），而不是只选择一个最佳序列。通过维护多条路径，它能够在计算效率和生成质量之间取得平衡。

**核心思想**：维护多条候选路径 → 选择累积概率最高的序列

**算法流程**：
1. **初始化**：从输入序列开始
2. **扩展**：为每个候选序列生成多个扩展
3. **评分**：计算每个新序列的累积概率
4. **筛选**：保留分数最高的N个候选
5. **重复**：继续扩展直到结束条件

### 关键概念

#### 束宽度（Beam Width）
- **定义**：每步保留的候选序列数量
- **权衡**：
  - 宽度=1：等价于贪婪解码
  - 宽度越大：搜索空间越大，质量越高，但计算成本也越大

#### 累积概率
- **计算方式**：序列概率 = 各个token概率的乘积
- **数值稳定性**：通常使用对数概率求和
- **公式**：`log P(sequence) = Σ log P(token_i | context)`

### 代码实现
基于我们实现的 `_beam_search` 方法：

```python
def _beam_search(self, idx: torch.Tensor, max_new_tokens: int, num_beams: int,
                 temperature: float = 1.0, top_k: int = None, stop_id: int = None) -> torch.Tensor:
    """
    束搜索：维护多个候选序列，选择最优路径

    Args:
        idx: 输入序列，形状为 (batch_size, seq_len)
        max_new_tokens: 最大生成token数量
        num_beams: 束宽度，表示保留的候选路径数量
        temperature: 温度参数，控制分布的平滑程度
        top_k: top-k过滤参数，限制候选token范围
        stop_id: 停止生成的token ID，遇到则停止

    Returns:
        生成的token序列，形状为 (batch_size, generated_length)
    """
    # 1. 初始化束
    beams = [idx.clone() for _ in range(num_beams)]
    beam_scores = torch.zeros(num_beams, device=idx.device)
    beam_scores[0] = 0.0  # 第一个候选是原始序列
    beam_scores[1:] = float('-inf')  # 其他候选初始分数为负无穷

    # 2. 主循环：逐步生成token
    for step in range(max_new_tokens):
        new_beams = []
        new_scores = []

        # 3. 扩展每个候选序列
        for beam_idx, beam in enumerate(beams):
            if beam_scores[beam_idx] == float('-inf'):
                continue  # 跳过无效候选

            # 前向传播获取logits
            output = self(beam)
            logits = output.logits[:, -1, :]

            # 应用温度和top-k
            if temperature != 1.0:
                logits = logits / temperature
            if top_k is not None:
                v, _ = torch.topk(logits, min(top_k, logits.size(-1)))
                logits[logits < v[:, [-1]]] = -float('Inf')

            # 计算对数概率
            log_probs = F.log_softmax(logits, dim=-1)

            # 获取前num_beams个候选token
            top_log_probs, top_indices = torch.topk(log_probs, k=num_beams, dim=-1)

            # 4. 为当前候选生成多个扩展
            for k in range(num_beams):
                token = top_indices[:, k:k+1]
                log_prob = top_log_probs[:, k]

                new_beam = torch.cat([beam, token], dim=1)
                new_score = beam_scores[beam_idx] + log_prob.item()

                new_beams.append(new_beam)
                new_scores.append(new_score)

        # 5. 筛选最佳候选
        if not new_beams:
            break

        # 按分数排序，选择前num_beams个
        sorted_indices = sorted(range(len(new_scores)), key=lambda i: new_scores[i], reverse=True)
        beams = [new_beams[i] for i in sorted_indices[:num_beams]]
        beam_scores = [new_scores[i] for i in sorted_indices[:num_beams]]

        # 检查停止条件
        if stop_id is not None and beams[0][0, -1] == stop_id:
            break

    # 6. 返回最佳序列
    return beams[0][:, idx.shape[1]:]  # 只返回生成部分
```

### 束搜索过程示例

假设束宽度=3，输入="今天天气"：

**第1步扩展**：
```
候选1: "今天天气很好" (分数: 0.4)
候选2: "今天天气不错" (分数: 0.3)
候选3: "今天天气真好" (分数: 0.2)
```

**第2步扩展**（每个候选再扩展3个）：
```
候选1.1: "今天天气很好啊" (分数: 0.4 + 0.1 = 0.5)
候选1.2: "今天天气很好。" (分数: 0.4 + 0.2 = 0.6) ← 保留
候选1.3: "今天天气很好，" (分数: 0.4 + 0.05 = 0.45)

候选2.1: "今天天气不错啊" (分数: 0.3 + 0.15 = 0.45)
候选2.2: "今天天气不错。" (分数: 0.3 + 0.1 = 0.4) ← 保留
候选2.3: "今天天气不错，" (分数: 0.3 + 0.08 = 0.38)

候选3.1: "今天天气真好啊" (分数: 0.2 + 0.12 = 0.32)
候选3.2: "今天天气真好。" (分数: 0.2 + 0.25 = 0.45) ← 保留
候选3.3: "今天天气真好，" (分数: 0.2 + 0.1 = 0.3)
```

**筛选结果**（保留分数最高的3个）：
```
最佳候选: "今天天气很好。" (分数: 0.6)
次佳候选: "今天天气不错。" (分数: 0.4)
第三候选: "今天天气真好。" (分数: 0.45)
```

### 使用示例
```python
# 基本束搜索
output = model.generate_super(
    input_ids,
    do_sample=False,        # 不使用采样
    num_beams=3,           # 束宽度为3
    temperature=1.0,       # 标准温度
    max_new_tokens=100
)

# 带top-k的束搜索
output = model.generate_super(
    input_ids,
    do_sample=False,
    num_beams=5,           # 更大的束宽度
    temperature=0.8,       # 稍微降低温度
    top_k=50,             # 限制候选范围
    max_new_tokens=100
)
```

### 优缺点分析

**优点**：
- ✅ **质量较高**：比贪婪解码质量更好
- ✅ **确定性**：结果相对稳定（相同输入产生相同输出）
- ✅ **平衡性好**：在质量和效率之间取得平衡
- ✅ **避免明显错误**：不容易选择明显不合适的token

**缺点**：
- ❌ **计算开销大**：需要维护多个候选序列
- ❌ **内存占用高**：存储多个候选序列和分数
- ❌ **仍可能局部最优**：虽然比贪婪好，但仍可能错过全局最优
- ❌ **多样性有限**：仍然偏向高概率路径，创造性不如采样

### 束宽度选择建议

| 束宽度 | 适用场景 | 优点 | 缺点 |
|--------|----------|------|------|
| 1-2 | 实时应用、计算资源有限 | 速度快、资源占用少 | 质量相对较低 |
| 3-5 | 一般对话、文本生成 | 质量较好、速度适中 | 资源占用中等 |
| 6-10 | 高质量生成、翻译 | 质量很高 | 计算开销大 |
| 10+ | 专业应用、研究 | 最高质量 | 开销很大 |

### 使用场景
- **机器翻译**：需要准确性和流畅性的平衡
- **文本摘要**：生成连贯的摘要内容
- **对话系统**：生成有逻辑的回复
- **代码生成**：需要语法正确和逻辑合理
- **长文本生成**：如文章写作、报告生成

## 辅助模型投机解码（Assisted Decoding）

### 原理说明
投机解码是一种**用小模型加速大模型推理**的技术。它通过"草稿-验证"的方式，让小先生成候选token，然后大家模型快速验证，减少大模型的前向传播次数。

**核心思想**：小模型投机生成 → 大模型批量验证 → 减少大模型计算负担

### 工作流程

#### 1. 草稿生成阶段
```
输入: "今天天气"
小模型快速生成草稿: "今天天气很好，适合出门散步"
```

#### 2. 验证阶段
大模型一次性验证整个草稿序列：
- ✅ 接受的token："今天天气很好，"
- ❌ 拒绝的token：从"适合"开始拒绝
- 🔧 大模型重新生成："适合在家休息"

#### 3. 最终结果
```
输出: "今天天气很好，适合在家休息"
```

### 关键优势

**速度提升**：
- 小模型推理快 → 生成多个候选token
- 大模型批量验证 → 一次处理多个token
- 减少90%+的大模型前向传播

**质量保证**：
- 大模型有最终否决权
- 只有大模型认可的token才会被保留
- 不会降低生成质量

### 具体例子对比

**传统方式**（大模型逐个生成）：
```
第1步: 大模型 → "今天"
第2步: 大模型 → "今天天气"
第3步: 大模型 → "今天天气很"
第4步: 大模型 → "今天天气很好"
第5步: 大模型 → "今天天气很好，"
第6步: 大模型 → "今天天气很好，适合"
... (每步都需要大模型前向传播)
```

**投机解码**：
```
第1步: 小模型快速草稿 → "今天天气很好，适合出门散步"
第2步: 大模型批量验证 → 接受"今天天气很好，"，拒绝"适合出门散步"
第3步: 大模型重新生成 → "适合在家休息"
```

这样原本需要6次大模型推理的过程，现在只需要2次！

### 技术实现要点

#### 1. 草稿长度控制
- **草稿不宜过长**：通常2-10个token
- **接受率平衡**：太长接受率低，太短加速效果不明显
- **动态调整**：根据接受率调整草稿长度

#### 2. 验证机制
```python
# 伪代码
def assisted_decoding(input_ids, assistant_model, main_model):
    # 小模型生成草稿
    draft_tokens = assistant_model.generate_draft(input_ids, max_draft_len=5)

    # 大模型验证
    accepted_count = main_model.verify_draft(input_ids, draft_tokens)

    # 构建最终结果
    if accepted_count == len(draft_tokens):
        return draft_tokens  # 全部接受
    else:
        # 部分接受，大模型重新生成剩余部分
        accepted_part = draft_tokens[:accepted_count]
        remaining_part = main_model.generate_remaining(input_ids + accepted_part)
        return accepted_part + remaining_part
```

### 总结
投机解码本质上是用**计算资源换时间**，通过小模型的"投机"来减少大模型的计算负担。它是一种聪明的工程优化，在不牺牲质量的前提下显著提升推理速度。
