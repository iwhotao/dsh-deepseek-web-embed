# Changelog

所有版本的显著变更记录在此文件。

## [1.0.2] - 2026-10-25

### Added

- 发布所需的仓库文件：`LICENSE`、`.gitignore`、`SECURITY.md`、`README.github.md`、`package.json.publish.json`、`package-meta.yml`、`docs/PUBLISHING.md`。

### Changed

- 后台保活：webview 与 guest 不再随主区页面卸载，返回 DSH 只隐藏页面，再点开无需重新加载。
- webview 所在固定层按主区占位区域实时定位，跟随侧边栏、右栏与窗口尺寸变化。

### Fixed

- 页面只显示顶部窄条：根容器与 webview 的高度约束改为 flex 撑满。

## [1.0.1] - 2026-10-25

### Fixed

- 自动登录失效时不再无限 reload；写入快照后只在登录页停留一次。
- 兼容 DSH 在页面切换时卸载主面板导致的状态丢失。

## [1.0.0] - 2026-10-25

### Added

- 侧边栏入口、`Ctrl+Shift+D` 快捷键、主区整页 DeepSeek 网页。
- Electron `<webview>` 内嵌 `chat.deepseek.com`，独立分区。
- 记住登录、恢复上次会话、清除本地登录、兼容浏览器标识。
- DSH 运行中 / 待处理请求状态条，可跳回对话。
- 中英文文案。
