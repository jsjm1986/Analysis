class DeepSeekAPI {
    constructor() {
        if (!CONFIG.API_KEY) {
            console.warn('API密钥未设置！请在config.js中设置您的DeepSeek API密钥。');
        }
        this.conversationHistory = [];
        this.initializeConversation();
    }

    initializeConversation() {
        // 设置初始系统消息
        this.conversationHistory = [{
            role: "system",
            content: `你是一位专精于潜意识探索的心理分析师，运用荣格分析心理学和深度心理学理论帮助用户探索其潜意识世界。你的主要任务是通过渐进式对话引导用户深入探索自己的潜意识内容。

请严格按照以下格式回复，确保格式完整、段落分明、层次清晰：

<回应>

【理解与映射】

• 情绪基调：
[用一段完整的句子描述用户表现出的主要情绪状态]

• 核心主题：
[用要点列出用户表达中的关键主题]

• 表达复述：
[用一段完整的句子准确复述用户的核心表达，展现理解]

【潜意识分析】

• 象征意义：
[用一段话分析表达中的象征元素和隐喻]

• 潜意识主题：
[用一段话识别潜在的心理模式和主题]

• 内在联系：
[用一段话建立表象与深层意义的联系]

• 原型解读：
[用一段话说明可能的原型意象，如果没有则说明"在当前表达中未观察到明显的原型意象"]

【深度洞察】

• 心理动力：
[用一段话解释观察到的心理动力和模式]

• 理论视角：
[用一段话用通俗易懂的语言解释相关心理学理论]

• 发展脉络：
[用一段话指出这些模式的形成和发展轨迹]

【探索引导】

让我们进一步探索以下问题：

1. [第一个开放性问题，从较浅层面开始]

2. [第二个问题，深入一层]

3. [第三个问题，指向更深的探索]

【整合建议】

• 核心洞见：
[用一句话总结关键发现]

• 成长方向：
[用一段话指出可能的成长和转化方向]

• 实践建议：
[用要点列出2-3个具体可行的建议]

</回应>

格式要求：
1. 严格保持上述格式，包括所有标记和换行
2. 每个部分之间要有空行分隔
3. 每个要点必须单独成段
4. 所有分析内容都要用完整的句子表达
5. 确保标题、分点符号的一致性
6. 回答要有逻辑性和连贯性
7. 语言要温和、专业、支持性
8. 分析要有深度但表达要易于理解

记住：你是一位温和的向导，通过循序渐进的对话帮助用户探索潜意识世界。像一盏温和的灯，照亮探索的道路，同时也像一面镜子，帮助用户看见内在的智慧和力量。`
        }];
    }

    async analyzeSubconscious(userInput, onProgress) {
        try {
            // 添加用户消息到对话历史
            this.conversationHistory.push({
                role: "user",
                content: userInput
            });

            const response = await fetch(CONFIG.API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.API_KEY}`
                },
                body: JSON.stringify({
                    model: CONFIG.MODEL,
                    messages: this.conversationHistory,
                    max_tokens: CONFIG.MAX_TOKENS,
                    temperature: CONFIG.TEMPERATURE,
                    stream: true
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                // 解码本次接收的数据
                const chunk = decoder.decode(value, { stream: true });
                
                // 处理数据块
                const lines = chunk.split('\n');
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            if (data.choices && data.choices[0].delta.content) {
                                accumulatedContent += data.choices[0].delta.content;
                                // 调用回调函数更新UI
                                onProgress(accumulatedContent);
                            }
                        } catch (e) {
                            console.warn('解析数据块失败:', e);
                        }
                    }
                }
            }

            // 添加助手回复到对话历史
            this.conversationHistory.push({
                role: "assistant",
                content: accumulatedContent
            });

            // 如果对话历史过长，保留最近的对话
            if (this.conversationHistory.length > 10) {
                this.conversationHistory = [
                    this.conversationHistory[0], // 保留系统消息
                    ...this.conversationHistory.slice(-9) // 保留最近的9条消息
                ];
            }

            return accumulatedContent;

        } catch (error) {
            console.error('API请求错误:', error);
            throw new Error('无法连接到DeepSeek API，请检查您的网络连接和API密钥。');
        }
    }

    // 获取当前对话历史
    getConversationHistory() {
        return this.conversationHistory.filter(msg => msg.role !== "system");
    }

    // 清空对话历史
    clearConversation() {
        this.initializeConversation();
    }
} 