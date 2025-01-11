document.addEventListener('DOMContentLoaded', () => {
    const api = new DeepSeekAPI();
    const userInput = document.getElementById('userInput');
    const exploreBtn = document.getElementById('exploreBtn');
    const chatHistory = document.getElementById('chatHistory');
    const inputGuide = document.querySelector('.input-guide');

    let isAnalyzing = false;
    let currentAssistantMessage = null;

    // 移动端检测
    const isMobile = window.innerWidth <= 768;

    // 如果是移动端，初始化引导区域为折叠状态
    if (isMobile) {
        inputGuide.classList.add('collapsed');
        
        // 添加引导区域的点击切换功能
        inputGuide.addEventListener('click', (e) => {
            if (e.target.closest('.input-guide')) {
                inputGuide.classList.toggle('collapsed');
            }
        });

        // 点击其他区域时折叠引导区域
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.input-guide') && !inputGuide.classList.contains('collapsed')) {
                inputGuide.classList.add('collapsed');
            }
        });
    }

    const createMessageElement = (content, isUser = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`;
        
        if (isUser) {
            messageDiv.textContent = content;
        } else {
            // 处理AI回复的格式
            const formattedContent = content
                .replace(/\n\n/g, '<br><br>')  // 保持段落间距
                .replace(/【(.*?)】/g, '<strong>【$1】</strong>')  // 加粗标题
                .replace(/•(.*?)：/g, '<br>• <em>$1</em>：')  // 强调要点
                .replace(/^\d\./gm, '<br>$&')  // 保持数字列表格式
                .replace(/\[(.*?)\]/g, '<span class="highlight">$1</span>');  // 高亮中括号内容
            
            messageDiv.innerHTML = formattedContent;
        }
        
        return messageDiv;
    };

    const updateAssistantMessage = (content) => {
        if (currentAssistantMessage) {
            currentAssistantMessage.innerHTML = createMessageElement(content).innerHTML;
            scrollToBottom();
        }
    };

    const scrollToBottom = () => {
        chatHistory.scrollTop = chatHistory.scrollHeight;
    };

    const showLoading = () => {
        exploreBtn.disabled = true;
        exploreBtn.textContent = '思考中...';
        exploreBtn.style.opacity = '0.7';
    };

    const hideLoading = () => {
        exploreBtn.disabled = false;
        exploreBtn.textContent = '发送';
        exploreBtn.style.opacity = '1';
    };

    const handleExploration = async () => {
        if (isAnalyzing) return;

        const input = userInput.value.trim();
        if (!input) {
            alert('请输入您的想法或感受');
            return;
        }

        // 如果是移动端，发送消息时折叠引导区域
        if (isMobile && !inputGuide.classList.contains('collapsed')) {
            inputGuide.classList.add('collapsed');
        }

        // 添加用户消息到界面
        chatHistory.appendChild(createMessageElement(input, true));
        userInput.value = '';
        scrollToBottom();

        isAnalyzing = true;
        showLoading();

        try {
            // 创建一个空的助手消息元素
            currentAssistantMessage = document.createElement('div');
            currentAssistantMessage.className = 'message assistant';
            chatHistory.appendChild(currentAssistantMessage);
            scrollToBottom();

            // 使用流式输出
            await api.analyzeSubconscious(input, (content) => {
                updateAssistantMessage(content);
            });

        } catch (error) {
            if (currentAssistantMessage) {
                currentAssistantMessage.innerHTML = `
                    <div class="error-message">
                        <p>抱歉，出现了一些问题：${error.message}</p>
                    </div>
                `;
            }
        } finally {
            hideLoading();
            isAnalyzing = false;
            currentAssistantMessage = null;
            scrollToBottom();
        }
    };

    exploreBtn.addEventListener('click', handleExploration);

    // 支持按下Enter键发送，Shift+Enter换行
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleExploration();
        }
    });

    // 自动调整文本框高度
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 150) + 'px';
    });

    // 处理软键盘弹出时的视口调整
    if (isMobile) {
        const viewport = document.querySelector('meta[name=viewport]');
        viewport.setAttribute('content', viewport.content + ', height=' + window.innerHeight);
        
        window.addEventListener('resize', () => {
            if (document.activeElement.tagName === 'TEXTAREA') {
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
            }
        });
    }

    // 初始欢迎消息
    chatHistory.appendChild(createMessageElement(`
        <p>欢迎来到潜意识探索之旅。我是您的深度心理分析向导，专注于帮助您探索内在的未知领域。</p>
        <p>在这里，我们将一起：</p>
        <ul>
            <li>探索您的梦境和想象中的象征意义</li>
            <li>理解重复出现的行为模式和情绪</li>
            <li>发现潜意识中的深层需求和愿望</li>
            <li>认识内在的矛盾与可能性</li>
        </ul>
        <p>您可以分享：</p>
        <ul>
            <li>印象深刻的梦境</li>
            <li>反复出现的想法或感受</li>
            <li>内心的困惑或矛盾</li>
            <li>直觉或预感</li>
        </ul>
        <p>让我们开始这段探索之旅。请告诉我，最近有什么引起您的注意或困扰的内容？</p>
    `));
}); 