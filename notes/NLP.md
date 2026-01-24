# A Brief History of Large Language Models (LLMs)

> **Note:** The evolution of Large Language Models is driven not only by neural architectures, but also by **compute scaling**, **data availability**, **training strategies**, and **alignment methods**.

---

## 1. Early Foundations: Statistical NLP  
### Text Classification & Logistic Regression

Early NLP systems relied on statistical methods and linear models:
- Bag-of-Words (BoW)
- TF-IDF
- Logistic regression
- Naive Bayes

These approaches ignored word order and deep semantics, limiting contextual understanding.

---

## 2. Neural Networks Enter NLP  
### Feedforward Neural Networks

Neural networks enabled nonlinear feature learning, but:
- Used sparse word representations
- Lacked shared semantic structure

This constrained generalization.

---

## 3. Distributed Word Representations  
### Word Vectors & Vector Semantics

Dense embeddings introduced semantic structure:
- Word2Vec
- GloVe
- FastText

Semantic relationships emerged geometrically  
(e.g., *king − man + woman ≈ queen*).

---

## 4. Language Modeling as a Core Objective  
### Probabilistic Language Models

Language modeling estimates:

$P(w_1, w_2, ..., w_T)$


Using the chain rule:

$P(w_t \mid w_1, ..., w_{t-1})$

#### n-gram Models & Markov Assumption

Assume:

$P(w_t \mid w_{t-n+1}, ..., w_{t-1})$

Limitations:
- Fixed context window
- Data sparsity
- Weak generalization

---

## 5. Recurrent Neural Networks (RNNs)  
### Modeling Sequential Dependencies

RNNs introduced hidden states to model sequences, but suffered from:
- Vanishing/exploding gradients
- Limited parallelism

#### LSTM / GRU

Gating mechanisms enabled:
- Longer-range dependencies
- Sequence-to-sequence learning

---

## 6. The Transformer Revolution  
### Attention as the Core Mechanism

The Transformer architecture replaces recurrence and convolution with **self-attention**, allowing each token to directly attend to every other token in the sequence. This enables efficient modeling of long-range dependencies and full parallelization during training.

---

### Self-Attention: Query, Key, and Value

Each input token is projected into three vectors:

- **Query (Q):** what the token is searching for  
- **Key (K):** what the token represents  
- **Value (V):** the information the token carries  

$Q = XW_Q,\quad K = XW_K,\quad V = XW_V$

---

### Scaled Dot-Product Attention

$\text{Attention}(Q, K, V)
= \text{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V$


- Dot products measure relevance
- Scaling stabilizes gradients
- Softmax yields attention weights

Each token’s output is a **context-dependent weighted sum** of value vectors.

---

### Multi-Head Attention

Instead of a single attention operation, Transformers use **multi-head attention**:
- Each head attends to different subspaces
- Captures diverse linguistic relations
- Outputs are concatenated and projected

---

### Causal Masking (Autoregressive Models)

Decoder-only models (e.g., GPT) apply **causal masking**:
- Prevents attending to future tokens
- Enforces left-to-right generation
- Preserves autoregressive training

---

### Positional Encoding

Self-attention is permutation-invariant, so positional information must be injected.

#### Absolute Positional Embeddings
- Fixed or learned vectors added to token embeddings

#### Relative Positional Encoding
- Models relative token distances
- Improves length generalization

#### Rotary Positional Embeddings (RoPE)

RoPE applies position-dependent rotations to **Q and K** vectors:
- Encodes relative position in dot products
- Parameter-efficient
- Enables strong long-context extrapolation

---

## Advanced Attention Mechanisms  
### Scaling Attention for Large Models

As models and context lengths grow, vanilla attention becomes a computational and memory bottleneck. Several advanced techniques address this.

---

### KV Cache (Inference Optimization)

During autoregressive decoding:
- Keys and values from previous tokens are cached
- Only queries are recomputed for new tokens
- Reduces per-token complexity from \(O(T^2)\) to \(O(T)\)

KV caching is essential for fast LLM inference.

---

### Multi-Query Attention (MQA)

MQA shares **one set of keys and values across all attention heads**:
- Reduces memory footprint
- Accelerates inference
- Slightly reduces expressiveness

Used in early large-scale systems to improve efficiency.

---

### Grouped-Query Attention (GQA)

GQA is a compromise between full multi-head attention and MQA:
- Multiple query heads share a smaller number of KV heads
- Balances efficiency and expressiveness
- Widely adopted in modern LLMs

GQA significantly reduces KV cache size while maintaining performance.

---

### FlashAttention

FlashAttention is a **memory-efficient attention algorithm**:
- Computes attention in tiled blocks
- Avoids materializing the full attention matrix
- Optimized for GPU SRAM (on-chip memory)

Benefits:
- Lower memory usage
- Faster training and inference
- Enables longer context lengths

FlashAttention is now standard in high-performance Transformer implementations.

---

### Why Attention Scales

These innovations allow attention to:
- Scale to longer sequences
- Reduce memory and latency bottlenecks
- Support trillion-parameter and long-context models

Attention is therefore not just a modeling choice, but a **systems-level optimization frontier**.

---

### Key Takeaway

> Modern LLMs rely on self-attention as both a representational mechanism and a carefully engineered system, combining architectural design (Q/K/V, RoPE) with efficiency techniques (GQA, FlashAttention, KV caching).


---

## 7. Transformer-Based Model Families

### Decoder-Only (Autoregressive)
**GPT**
- Next-token prediction
- Strong generative capabilities

### Encoder-Only
**BERT**
- Bidirectional context
- Masked language modeling

### Encoder–Decoder
**T5**
- Unified text-to-text framework
- Strong for structured generation

---

## 8. Scaling Laws and Mixture of Experts (MoE)

### Scaling Laws

Performance improves predictably with:
- Model parameters
- Training data
- Compute

This led to extremely large models with emergent abilities.

### Mixture of Experts (MoE)

To scale efficiently, **MoE architectures** activate only a subset of parameters per token:
- Sparse expert routing
- Conditional computation
- Higher capacity with lower compute cost

Key ideas:
- Gating network selects experts
- Only a few experts run per token
- Enables trillion-parameter models

Examples:
- Switch Transformer
- GLaM
- Mixtral

MoE primarily addresses **training and inference efficiency**, not alignment.

---

## 9. Prompt Engineering  
### Inference-Time Control

Large pretrained models can be steered without updating weights:
- Instruction prompting
- Few-shot / zero-shot prompting
- Chain-of-thought prompting
- Role and system prompts

Prompt engineering shifts control from **training-time** to **inference-time**.

---

## 10. Fine-Tuning Strategies  

### Standard Fine-Tuning (Supervised Fine-Tuning, SFT)
- Uses task- or domain-specific data
- Trains the model with the standard language modeling objective
- Answer tokens are masked during training
- No explicit instruction–response structure
- Adapts models to specific domains or tasks

### Instructional Fine-Tuning (Instruction Tuning)
- Uses datasets formatted as instruction–response pairs
- Teaches models to follow human-written instructions
- Still optimizes next-token prediction
- Changes the training data distribution, not the loss function
- Enables general-purpose, instruction-following behavior

---

## 11. Parameter-Efficient Fine-Tuning (PEFT) 
Please note that why PEFT is not grouped with standard fine-tuning and instructional fine-tuning is that PEFT describes how many parameters the fine-tuning will update while the other two determine what data and objective of the fine-tuning. 

### LoRA and Related Methods

To reduce cost, **PEFT** methods update only a small number of parameters.

#### LoRA (Low-Rank Adaptation)

LoRA:
- Freezes base model weights
- Injects low-rank matrices into attention layers
- Trains only these low-rank updates

Benefits:
- Orders of magnitude fewer trainable parameters
- Fast training
- Easy deployment and model merging

Other PEFT methods:
- Adapters
- Prefix tuning
- Prompt tuning

LoRA is now the **dominant fine-tuning method** for open-source LLMs.

---

## 12. Reinforcement Learning from Human Feedback (RLHF)

RLHF aligns model behavior with human preferences:
1. Supervised fine-tuning (SFT)
2. Reward model training
3. Policy optimization (e.g., PPO)

Optimizes for:
- Helpfulness
- Safety
- Human intent

---

## 13. Alignment and Safety

Modern LLM development emphasizes alignment:
- Reducing hallucinations
- Preventing harmful outputs
- Improving controllability

Techniques include:
- RLHF
- Constitutional AI
- Automated evaluators
- Red-teaming and monitoring

---


