# 安全策略

## 这个插件做什么、不做什么

- 这是一个**纯客户端** DSH 插件：Host 侧只有一个空的 `apply()`，不注册 LLM provider、不创建或修改 DSH 会话。
- 它通过 DSH Desktop 提供的 `globalThis.dshDesktop.browser` 租约接口创建 Electron `<webview>`，加载 `chat.deepseek.com`。
- 它**不**调用 `chat.deepseek.com` 的私有 API，**不**处理 PoW，**不**解析或转发网页回答，**不**自动发送消息。

## 数据保存在哪里

- 登录快照（`userToken`、`hif_*` 等登录相关键）、上次 URL、三个设置开关，保存在 DSH 渲染进程的 `localStorage`：
  - 登录快照：`dsh.deepseekWeb.session.v1`
  - 设置：`dsh.deepseekWeb.settings.v1`
- 网页内容、cookie、聊天记录都留在 Electron webview 的进程级分区里，不在 DSH 会话数据中。
- 插件不向任何服务器发送数据。

## 登录态的风险

登录快照等同于账号凭据，以明文保存在本机 DSH 存储中。出于安全考虑：

- 介意的话在设置里关闭“记住登录”；
- 使用“清除本地登录”可删除本机快照；
- 共享电脑上建议不要开启“记住登录”。

## 报告漏洞

如果发现安全问题（例如注入、XSS、凭据泄露路径），请通过 GitHub Security Advisories 私密报告，或发邮件到 2495169842@qq.com。请不要在公开 issue 中附带 token、cookie 或截图中的账号信息。

## 供应链

插件没有运行时依赖，没有构建步骤，源码即发布内容。安装时请以仓库中的 commit 为准，并自行审阅 `client.js`。
