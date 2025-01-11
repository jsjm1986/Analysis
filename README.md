# 潜意识探索 - DeepSeek驱动的心理分析工具

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
[![DeepSeek](https://img.shields.io/badge/由DeepSeek驱动-blue)](https://deepseek.com/)

一个基于DeepSeek大语言模型的潜意识探索工具，通过深度对话帮助用户探索内心世界，发现潜意识模式，促进自我认知和成长。

## 📚 目录
- [文档](#-文档)
- [快速链接](#-快速链接)
- [特点](#-特点)
- [探索方法](#-探索方法)
- [技术栈](#-技术栈)
- [快速开始](#-快速开始)
- [主要功能](#-主要功能)
- [移动端特性](#-移动端特性)
- [界面特点](#-界面特点)
- [隐私说明](#-隐私说明)
- [配置选项](#-配置选项)
- [使用建议](#-使用建议)
- [贡献指南](#-贡献指南)
- [许可证](#-许可证)
- [相关资源](#-相关资源)
- [社区](#-社区)
- [联系方式](#-联系方式)

## 📚 文档
- [English Documentation](README_EN.md)
- [中文文档](README.md)
- [在线演示](https://your-demo-url.com)
- [API文档](https://platform.deepseek.com/docs)

## 🔗 快速链接
- [项目主页](https://github.com/yourusername/subconsciousness-explorer)
- [问题追踪](https://github.com/yourusername/subconsciousness-explorer/issues)
- [发布说明](https://github.com/yourusername/subconsciousness-explorer/releases)
- [贡献指南](CONTRIBUTING.md)

## 🌟 特点

- 🧠 专业的心理分析框架
- 💭 深度的潜意识探索
- 🎨 优雅的用户界面
- 📱 完善的移动端支持
- ⚡ 流畅的实时响应
- 🔒 注重隐私保护

## 🛠 探索方法

### 多维度分析框架

我们采用整合性的分析框架，从以下维度深入探索潜意识：

1. **情感层面**
   - 核心情绪识别
   - 情感模式分析
   - 情绪触发点探索
   - 情感需求解读

2. **认知层面**
   - 思维模式识别
   - 信念系统分析
   - 价值观探索
   - 决策倾向解读

3. **关系层面**
   - 人际互动模式
   - 依恋方式分析
   - 关系期待探索
   - 边界意识解读

4. **行为层面**
   - 习惯性反应模式
   - 应对策略分析
   - 行为动机探索
   - 自我保护机制

5. **象征层面**
   - 梦境象征解读
   - 意象分析
   - 隐喻理解
   - 原型探索

### 探索方式

1. **开放式对话**
   - 采用非引导性提问
   - 保持好奇和开放态度
   - 鼓励自由联想
   - 关注即时体验

2. **深度反思**
   - 探索情绪根源
   - 识别重复模式
   - 连接过往经验
   - 整合内在资源

3. **整合分析**
   - 多角度观察
   - 建立关联性
   - 寻找核心主题
   - 提供成长建议

### 探索原则

1. **安全性原则**
   - 营造安全的探索环境
   - 尊重个人边界
   - 循序渐进
   - 保护隐私信息

2. **整体性原则**
   - 关注整体脉络
   - 建立系统联系
   - 平衡各个层面
   - 寻求内在和谐

3. **发展性原则**
   - 关注成长潜能
   - 激发内在资源
   - 提供发展方向
   - 支持自我实现

## 🛠️ 技术栈

- 前端：[HTML5](https://developer.mozilla.org/zh-CN/docs/Web/HTML/HTML5) + [CSS3](https://developer.mozilla.org/zh-CN/docs/Web/CSS) + [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- UI设计：响应式设计 + 深色主题
- AI模型：[DeepSeek Chat API](https://platform.deepseek.com/)
- 数据处理：流式输出

## 🚀 快速开始

1. 克隆项目
```bash
git clone https://github.com/yourusername/subconsciousness-explorer.git
cd subconsciousness-explorer
```

2. 配置API密钥
在 `js/config.js` 中设置您的DeepSeek API密钥：
```javascript
const CONFIG = {
    API_KEY: 'your-api-key-here',
    // ... 其他配置
};
```

3. 启动项目
使用任意HTTP服务器启动项目，例如：
```bash
# 使用Python启动简单的HTTP服务器
python -m http.server 8000
```

4. 访问应用
打开浏览器访问 `http://localhost:8000`

## 💡 主要功能

- **深度对话分析**：基于专业的心理分析框架进行对话
- **实时反馈**：流式输出，即时查看AI响应
- **多维度解析**：包括情绪、需求、冲突等多个维度
- **引导式探索**：循序渐进的探索过程
- **移动端优化**：完善的移动设备支持

## 📱 移动端特性

- 响应式布局
- 触摸优化
- 软键盘适配
- 可折叠引导区
- 优化的交互体验

## 🎨 界面特点

- 深邃的视觉主题
- 流畅的动画效果
- 清晰的信息层级
- 舒适的阅读体验
- 优雅的交互设计

## 🔒 隐私说明

- 所有对话数据仅在浏览器中临时保存
- 不收集用户个人信息
- 仅将必要的对话内容发送至API
- 不保存历史会话记录

## 🔧 配置选项

在 `js/config.js` 中可以配置以下参数：

```javascript
const CONFIG = {
    API_KEY: '',           // DeepSeek API密钥
    MAX_TOKENS: 1000,      // 最大输出长度
    TEMPERATURE: 0.7,      // 输出随机性
    MODEL: 'deepseek-chat' // 使用的模型
};
```

## 📝 使用建议

1. 选择安静的环境进行对话
2. 保持开放和好奇的心态
3. 诚实地表达想法和感受
4. 给自己充足的思考时间
5. 定期回顾和整理洞察

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目。在提交PR之前，请确保：

1. 代码风格保持一致
2. 新功能有充分的注释
3. 所有更改都经过测试
4. 更新相关文档

## 📄 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- DeepSeek团队提供的强大API支持
- 所有为项目提供反馈和建议的用户

## 📞 相关资源

- [DeepSeek平台文档](https://platform.deepseek.com/docs)
- [API参考](https://platform.deepseek.com/reference)
- [开发博客](https://your-blog-url.com)
- [社区论坛](https://your-forum-url.com)

## 🤝 社区

- [Discord服务器](https://discord.gg/your-server)
- [Twitter](https://twitter.com/your-account)
- [Reddit社区](https://reddit.com/r/your-subreddit)

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- [提交Issue](https://github.com/yourusername/subconsciousness-explorer/issues)
- [发送邮件](mailto:your-email@example.com)
- [加入Discord](https://discord.gg/your-server)

---

**注意**：使用本工具不能替代专业的心理咨询。如果您正在经历严重的心理困扰，请寻求专业心理医生的帮助。 