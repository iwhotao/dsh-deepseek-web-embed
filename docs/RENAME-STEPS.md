# 发布前需要改的 3 处（改包名时）

以下内容来自当前 `client.js` 与 `cordis.patch.yml`，**尚未修改**。如果你决定用公开包名 `dsh-deepseek-web-embed`，请按下表替换；如果继续用 `@local/deepseek-web-embed`，跳过本文件。

## 1. client.js — 模块 id

当前：

```js
window.__ModuleLoader__.load({
  id: '@local/deepseek-web-embed',
```

替换为：

```js
window.__ModuleLoader__.load({
  id: 'dsh-deepseek-web-embed',
```

## 2. client.js — 样式标签归属

当前：

```js
const tag = document.createElement('style');
tag.dataset.plugin = '@local/deepseek-web-embed';
```

替换为：

```js
const tag = document.createElement('style');
tag.dataset.plugin = 'dsh-deepseek-web-embed';
```

## 3. cordis.patch.yml — bundle 名称

当前：

```yaml
- insert:
    - id: deepseek-web-embed
      name: '@local/deepseek-web-embed'
```

替换为：

```yaml
- insert:
    - id: deepseek-web-embed
      name: 'dsh-deepseek-web-embed'
```

`id` 不用改，`deepseek-web-embed` 是 loader 条目 id，与包名无关。

## 4. 本机 profile（只有你要在本机改用新包名时才需要）

`C:\Users\24951\.dsh\profiles\desktop\package.json`：

- `dependencies` 中把 `@local/deepseek-web-embed` 改为 `dsh-deepseek-web-embed`；
- `dsh.profile.bundles` 中同样改名；
- 重建 `node_modules/dsh-deepseek-web-embed` junction 指向插件目录。

如果只是发到 GitHub 给别人用，本机可以继续保留 `@local` 版本，不动 profile。

## 5. 发布前检查

```powershell
# 确认没有把本地登录态提交进仓库
git status
git ls-files

# 确认包名与模块 id 一致
Select-String -Path client.js -Pattern "id: '|dataset.plugin ="
Select-String -Path cordis.patch.yml -Pattern "name:"
```
