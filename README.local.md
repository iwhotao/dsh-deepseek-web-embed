# DeepSeek Web for DeepSeek Harness

> A full-page **chat.deepseek.com** tab inside DSH Desktop. Your own account, your own browser session, completely separate from DSH conversations.
>
> 在 DSH 里开一个独立的 **DeepSeek 网页版**页面：用你自己的账号登录 `chat.deepseek.com`，像手机 App / 网页一样聊天。

> **非官方插件**，与 DeepSeek 无隶属关系。插件不调用 `chat.deepseek.com` 的私有接口，也不会读取或转发你的网页对话。请遵守 [DeepSeek 用户协议](https://cdn.deepseek.com/policies/zh-CN/deepseek-terms-of-use.html)。
>
> This is an unofficial plugin. It does not call private endpoints and never reads or forwards your web chat. Use it in line with DeepSeek's Terms of Use.

---

## 它是什么 / What it is

DSH 通过 Electron `<webview>` 内嵌真实的 `chat.deepseek.com` 页面。你手动登录、手动聊天；插件只负责 **入口、内嵌浏览器、登录态快照、DSH 状态提示**。

Webview embeds the real page; you sign in and chat manually. The plugin only handles the entry, the browser surface, a login snapshot, and DSH status hints.

它**不是**：

- ❌ DeepSeek API Provider（不注册 `ctx.llm`，不用免费额度跑 agent）
- ❌ 反向代理（不构造私有请求、不处理 PoW、不解析 SSE）
- ❌ 会话桥（不把网页对话写进 DSH，也不把 DSH 内容注入网页）

## 功能 / Features

- 左侧边栏一级入口 **DeepSeek 网页** / sidebar entry, opens the center page
- `Ctrl+Shift+D` 打开 / 收起 / toggle
- **后台保活**：返回 DSH 后网页不关闭，再点开直接出现，不重新加载 / the page stays alive; reopening is instant
- 顶部状态条：DSH 运行中 / 待处理请求，并可直接跳回 / DSH running + pending-approval chips with a jump-back action
- 记住登录：重启 DSH 自动恢复（可关闭）/ remembered login across restarts (opt-out)
- 恢复上次会话地址 / restore the last conversation URL
- 外链、弹窗统一交给系统浏览器 / external links go to the system browser
- 明确的加载失败、内嵌不可用、登录失效提示 / explicit error, unsupported, and expired-login states
- 中文 + English UI，跟随 DSH 语言 / localized UI

## 安全性说明 / Safety notes

- 插件是纯客户端（Host 侧只有一个空的 `apply()`）：不注册 LLM provider、不创建或修改 DSH 会话、不写 session 事件；
- 只在本机保存登录相关键（`userToken`、`hif_*` 等）、上次 URL 和三个设置开关；
- 网页内容、cookie、聊天记录都留在 Electron 的 webview 分区里，与 DSH 会话数据隔离；
- **不会**伪造指纹、不会自动发请求、不会绕限流；行为等价于用一个内嵌浏览器正常访问网页。

## 安装 / Install

### 从 GitHub 安装 / From GitHub

```powershell
& 'D:\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd' plugin --profile desktop add github:whotao/dsh-deepseek-web-embed
```

安装后确认 profile 的 `package.json` 中 `dsh.profile.bundles` 出现 `dsh-deepseek-web-embed`，然后重启 DSH。

### 从 npm 安装 / From npm

```powershell
& 'D:\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd' plugin --profile desktop add dsh-deepseek-web-embed
```

### 本地开发 / Local source

在 profile 的 `package.json` 中加入依赖和 bundle：

```json
{
  "dependencies": {
    "dsh-deepseek-web-embed": "link:C:/path/to/deepseek-web-embed"
  },
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "dsh-deepseek-web-embed"
      ]
    }
  }
}
```

> 注意：本地目录副本如果仍使用 `@local/deepseek-web-embed` 包名与模块 id，请保持一致；仓库默认已是 `dsh-deepseek-web-embed`。

## 使用 / Usage

1. 点侧边栏 **DeepSeek 网页**，或按 `Ctrl+Shift+D`；
2. 在页面里登录你的 DeepSeek 账号；
3. 正常聊天。登录成功后插件会自动保存登录快照；
4. 返回 DSH：点左上角 **返回 DSH**，或再按一次 `Ctrl+Shift+D`；
5. DSH 有审批 / 提问时，顶部会出现琥珀色“待处理 N”提示，点“返回处理”即可。

## 设置 / Settings

| 项 | 默认 | 说明 |
|---|---|---|
| 记住登录 | 开 | 本机保存登录令牌，重启 DSH 自动恢复 |
| 恢复上次会话 | 开 | 下次打开回到上次的 `chat.deepseek.com` 地址 |
| 兼容浏览器标识 | 关 | 站点提示“使用环境异常”时开启；仅更换 webview UA |
| 清除本地登录 | — | 删除本机快照与页面登录键；彻底退出请用网页内退出 |

## 已知限制 / Known limitations

- **仅 DSH Desktop**：Web profile 没有 Electron webview，会显示降级提示；
- 依赖 DSH 内部的 `globalThis.dshDesktop.browser` 租约接口，DSH 升级后可能失效；
- DSH 给内嵌浏览器的分区是进程级的（不是 `persist:`），DSH 重启后 cookie 不保留，靠 token 快照恢复；
- 后台保活会常驻一个 Chromium guest 进程（通常几百 MB 内存），重启 DSH 或禁用插件才会释放；
- 站点若未来要求 cookie 才能保持登录，自动恢复可能失败，但手动登录始终可用；
- 站点可用性、速度与政策变化由 DeepSeek 决定，本插件不做任何保证。

## 隐私 / Privacy

- 插件不发起自己的网络请求；
- 不读取、不转发网页对话；
- 只在本机保存登录相关键、上次 URL、设置开关。

## 目录结构 / Layout

```
deepseek-web-embed/
├─ package.json
├─ package.json.publish.json   # 发布用包名与元数据（不改运行时文件）
├─ package-meta.yml            # 发布元数据说明
├─ cordis.patch.yml
├─ index.js                    # 空 Host，仅满足 bundle 契约
├─ client.js                   # 全部 UI / webview / 登录快照
├─ icon.svg
├─ LICENSE
├─ README.md
└─ docs/PUBLISHING.md
```

无构建步骤，无运行时依赖（React 由 DSH 提供）。

## 许可 / License

[MIT](LICENSE)
