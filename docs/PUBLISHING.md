# 发布到 GitHub / npm 的说明

这份文档是**发布用副本**，不改变插件当前的运行方式：原 `package.json`、`client.js`、`cordis.patch.yml` 都没动。

插件现在以 `@local/deepseek-web-embed` 的本地包名运行在 desktop profile 里。要公开发布，需要把包名统一成一个公开名字，否则别人安装后模块 id 对不上。

下面所有示例默认最终包名为 **`dsh-deepseek-web-embed`**，GitHub 用户名用 `whotao` 演示，请替换成你自己的。

---

## 0. 发布前检查清单

- [ ] 补上仓库文件：`LICENSE`、`.gitignore`（已提供）
- [ ] `package.json` 改为公开包名和元数据（见第 1 节；使用 `package.json.publish.json` 覆盖）
- [ ] 同步 `client.js` 里的模块 id 与 `cordis.patch.yml` 里的包名（见第 2 节）
- [ ] 在 GitHub 网页创建空仓库（不要勾选 README/.gitignore）
- [ ] 本地 `git init`、提交、推送
- [ ] 打 tag、发 Release
- [ ] 可选：发布到 npm、提交到 DSH 插件目录

---

## 1. 改成公开包名

用 `package.json.publish.json` 覆盖 `package.json`：

```powershell
cd C:\Users\24951\Documents\deepseek-harness\default-workspace\deepseek-web-embed
Copy-Item package.json.publish.json package.json -Force
```

`package.json.publish.json` 与当前文件**结构完全相同**，只改了这几项：

| 字段 | 原值 | 新值 |
|---|---|---|
| `name` | `@local/deepseek-web-embed` | `dsh-deepseek-web-embed` |
| `private` | `true` | 已移除 |
| `description` | 同 | 同 |
| `license` | 无 | `MIT` |
| `author` | 无 | `whotao` |
| `repository` | 无 | `git+https://github.com/whotao/dsh-deepseek-web-embed.git` |
| `homepage` / `bugs` / `keywords` | 无 | 已补 |

如果你不想改包名、只在 GitHub 上放源码，可以跳过这一节；但这样别人无法通过 `dsh plugin add` 安装，只能 clone 后本地 link。

---

## 2. 同步模块 id（改包名时必须做）

`client.js` 第 2 行左右：

```js
window.__ModuleLoader__.load({
  id: '@local/deepseek-web-embed',
```

改成：

```js
  id: 'dsh-deepseek-web-embed',
```

同时检查 `client.js` 里的：

```js
tag.dataset.plugin = '@local/deepseek-web-embed';
```

改成 `dsh-deepseek-web-embed`。

`cordis.patch.yml`：

```yaml
- insert:
    - id: deepseek-web-embed
      name: '@local/deepseek-web-embed'
```

改成：

```yaml
- insert:
    - id: deepseek-web-embed
      name: 'dsh-deepseek-web-embed'
```

> 注意：改了包名后，你本机 desktop profile 里的 `link:` 依赖也要同步改，并重建 junction，否则本机加载会失败。发布给别人则不需要这一步。

---

## 3. 创建 GitHub 仓库并推送

### 3.1 网页创建空仓库

打开 <https://github.com/new>：

- Repository name：`dsh-deepseek-web-embed`
- Visibility：Public
- **不要**勾选 *Add a README file*、*.gitignore*、*license*
- Create repository

### 3.2 本地初始化

本机 git 身份已是 `whotao <2495169842@qq.com>`，无需再设。

```powershell
cd C:\Users\24951\Documents\deepseek-harness\default-workspace\deepseek-web-embed
git init
git add .
git commit -m "feat: DeepSeek web chat as a full-page DSH tab"
git branch -M main
git remote add origin https://github.com/whotao/dsh-deepseek-web-embed.git
git push -u origin main
```

### 3.3 认证

HTTPS 推送推荐用 Personal Access Token：

1. GitHub → Settings → Developer settings → Personal access tokens → **Tokens (classic)** → Generate new token
2. 勾选 `repo`
3. 推送时用户名填 GitHub 用户名，**密码填 token**

或者用 SSH：

```powershell
ssh-keygen -t ed25519 -C "2495169842@qq.com"
# 把 ~/.ssh/id_ed25519.pub 加到 GitHub → Settings → SSH and GPG keys
git remote set-url origin git@github.com:whotao/dsh-deepseek-web-embed.git
```

### 3.4 检查提交内容

推送前确认没有把本机登录态或 node_modules 提交上去：

```powershell
git status
git ls-files
```

应该只有这些文件：

```text
.gitignore
LICENSE
README.md
client.js
cordis.patch.yml
icon.svg
index.js
package.json            (或 package.json.publish.json)
package-meta.yml
docs/PUBLISHING.md
```

---

## 4. 打 tag 并发 Release

```powershell
git tag v1.0.2
git push origin v1.0.2
```

GitHub → Releases → *Draft a new release*：

- Tag：`v1.0.2`
- Title：`v1.0.2`
- 正文模板：

```markdown
## 变更
- 首个公开版本

## 兼容性
- DSH Desktop 0.2.1-rc.3 实测可用
- Web profile 不支持内嵌（无 Electron webview）

## 已知限制
- 依赖 DSH 内部 dshDesktop.browser 租约接口，DSH 升级后可能失效
- 内嵌分区为进程级，DSH 重启后 cookie 丢失，靠 token 快照恢复
- 站点拒绝 Electron UA 时需开启“兼容浏览器标识”

## 免责声明
非官方插件，与 DeepSeek 无隶属关系；不调用 chat.deepseek.com 私有接口。
请遵守 DeepSeek 用户协议，仅用于个人正常使用。
```

---

## 5. 可选：安装方式

### 从 GitHub 安装

```powershell
& 'D:\DeepSeek Harness\resources\runtime\cli\bin\dsh.cmd' plugin --profile desktop add github:whotao/dsh-deepseek-web-embed
```

装完确认 profile 的 `package.json` 中 `dsh.profile.bundles` 出现 `dsh-deepseek-web-embed`，重启 DSH。

### 从 npm 安装（先发布再写）

本机没有全局 node/npm，需要调用 DSH 自带 node 对应的 npm，或安装 Node.js 后：

```powershell
npm login
npm publish --access public
```

发布前确认 `package.json` 的 `files` 包含：

```json
"files": [
  "index.js",
  "client.js",
  "cordis.patch.yml",
  "icon.svg",
  "README.md",
  "LICENSE"
]
```

---

## 6. 可选：提交到 DSH 插件目录

可以提交到 [dsh.pub](https://dsh.pub/submit/)、[awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)、[dsh-market](https://github.com/dsh-market/dsh-market)。

一般要求：

- GitHub 公开仓库；
- `README`（中英至少一份）；
- `LICENSE`；
- `package.json` 含 `dsh.bundle` 与 `dsh.client`；
- 有可复现的安装方式。

本插件已满足结构要求，缺的只是公开仓库和 LICENSE。

---

## 7. 本机继续用本地版

如果暂时不改包名，本机可以继续用 `@local/deepseek-web-embed` 的 link 安装，GitHub 只作为源码和 issue 仓库。

如果决定改包名，建议顺序：

1. 按第 2 节改三个文件；
2. 修改 desktop profile 的 `dependencies` 和 `dsh.profile.bundles`；
3. 重建 `node_modules/dsh-deepseek-web-embed` junction；
4. 重启 DSH 验证；
5. 再推送 GitHub。
