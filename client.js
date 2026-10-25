window.__ModuleLoader__.load({
  id: 'dsh-deepseek-web-embed',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'deepseek.web';
    const PANEL_ID = 'deepseek-web';
    const STYLE_ID = 'dsh-deepseek-web-embed/page.css';
    const WORKSPACE_KEY = 'deepseek-web';
    const HOME_URL = 'https://chat.deepseek.com/';
    const SETTINGS_KEY = 'dsh.deepseekWeb.settings.v1';
    const SESSION_KEY = 'dsh.deepseekWeb.session.v1';
    const CHROME_UA =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
    const MAX_STORAGE_BYTES = 131072;
    const EMPTY_STATUS = new Map();

    const inject = ['slots', 'locale', 'layout', 'shortcuts', 'uiSession', 'uiWorkspace'];

    const zh = {
      'panel.label': 'DeepSeek 网页',
      'shortcut.open': '打开 DeepSeek 网页',
      'page.title': 'DeepSeek 网页版',
      'page.subtitle': '你自己的账号，与 DSH 会话完全分开',

      'action.back': '返回 DSH',
      'action.reload': '刷新网页',
      'action.external': '在浏览器打开',
      'action.settings': '设置',
      'action.retry': '重试',
      'action.close': '关闭',

      'status.idle': 'DSH 空闲',
      'status.running': 'DSH 运行中 {n}',
      'status.pending': 'DSH 待处理 {n}',
      'status.unknown': 'DSH 状态不可用',
      'status.runningHint': 'DSH 的任务在后台继续运行；点击回到对话。',
      'status.pendingHint': '有请求正在等待你处理；点击回到对话。',

      'approval.text': 'DSH 有 {n} 个请求等待处理',
      'approval.action': '返回处理',

      'loading.title': '正在打开 DeepSeek 网页…',
      'loading.restore': '正在恢复登录状态…',
      'loading.hint': '首次打开需要一点时间加载页面。',

      'login.title': '请登录你的 DeepSeek 账号',
      'login.hint': '登录信息只保存在本机；DSH 不会读取或转发你的对话。',
      'login.expired': '保存的登录已失效，请重新登录；本地快照已清除。',
      'login.envHint': '如果页面提示“使用环境异常”，请在设置中开启「兼容浏览器标识」后重试。',

      'error.title': '网页加载失败',
      'error.hint': '检查网络后重试；也可以直接在系统浏览器中打开。',
      'error.attach': '无法创建内嵌浏览器。请确认正在使用 DSH Desktop，并重启 DSH 后再试。',
      'error.crash': '内嵌页面崩溃了，点击重试会重新加载。',
      'error.load': '页面没有加载完成，可能是网络或站点问题。',

      'unsupported.title': '仅桌面版支持内嵌网页',
      'unsupported.hint': '当前环境没有 Electron webview。请用系统浏览器打开，或使用右侧栏的 Browser 页签。',

      'settings.title': 'DeepSeek 网页设置',
      'settings.remember': '记住登录',
      'settings.rememberHint': '在本机保存登录令牌，重启 DSH 后自动恢复。',
      'settings.restoreLast': '恢复上次会话',
      'settings.restoreLastHint': '下次打开时回到上次的对话地址。',
      'settings.compatUA': '兼容浏览器标识',
      'settings.compatUAHint': '站点拒绝 Electron 默认标识时开启；会以标准 Chrome 标识加载页面。',
      'settings.clear': '清除本地登录',
      'settings.clearHint': '只清除本机保存的令牌和快照；要彻底退出，请在网页内使用退出登录。',
      'settings.privacy': '插件不读取、不转发网页对话，只保存登录相关键和上次地址。',
      'settings.saved': '设置已保存',

      'toast.copied': '链接已复制，请粘贴到浏览器打开',
      'toast.cleared': '已清除本地登录',
      'toast.external': '已尝试在系统浏览器打开',
      'toast.externalFailed': '无法打开系统浏览器，链接已复制',
    };

    const en = {
      'panel.label': 'DeepSeek Web',
      'shortcut.open': 'Open DeepSeek Web',
      'page.title': 'DeepSeek Web',
      'page.subtitle': 'Your own account, completely separate from DSH sessions',

      'action.back': 'Back to DSH',
      'action.reload': 'Reload page',
      'action.external': 'Open in browser',
      'action.settings': 'Settings',
      'action.retry': 'Retry',
      'action.close': 'Close',

      'status.idle': 'DSH idle',
      'status.running': 'DSH running {n}',
      'status.pending': 'DSH pending {n}',
      'status.unknown': 'DSH status unavailable',
      'status.runningHint': 'DSH work continues in the background. Click to return.',
      'status.pendingHint': 'A request is waiting for you. Click to return.',

      'approval.text': '{n} DSH request(s) waiting',
      'approval.action': 'Handle now',

      'loading.title': 'Opening DeepSeek Web…',
      'loading.restore': 'Restoring your login…',
      'loading.hint': 'The first open takes a moment to load the page.',

      'login.title': 'Sign in to your DeepSeek account',
      'login.hint': 'Login data stays on this machine. DSH never reads or forwards your chat.',
      'login.expired': 'The saved login expired. Please sign in again; the local snapshot was cleared.',
      'login.envHint': 'If the page reports an unsupported environment, enable "Browser-compatible identity" in Settings and retry.',

      'error.title': 'The page could not load',
      'error.hint': 'Check your network and retry, or open it in your system browser.',
      'error.attach': 'Could not create the embedded browser. Make sure you are on DSH Desktop and restart DSH.',
      'error.crash': 'The embedded page crashed. Retry to load it again.',
      'error.load': 'The page did not finish loading. This may be a network or site issue.',

      'unsupported.title': 'Embedding is desktop-only',
      'unsupported.hint': 'This environment has no Electron webview. Open it in your system browser or use the right-sidebar Browser tab.',

      'settings.title': 'DeepSeek Web settings',
      'settings.remember': 'Remember login',
      'settings.rememberHint': 'Store the login token on this machine and restore it after a DSH restart.',
      'settings.restoreLast': 'Restore last conversation',
      'settings.restoreLastHint': 'Open the last conversation URL next time.',
      'settings.compatUA': 'Browser-compatible identity',
      'settings.compatUAHint': 'Enable when the site rejects Electron\u2019s default identity. Loads the page with a standard Chrome identity.',
      'settings.clear': 'Clear local login',
      'settings.clearHint': 'Removes the locally stored token and snapshot. To sign out completely, use the site\u2019s own sign-out.',
      'settings.privacy': 'This plugin never reads or forwards your web chat. It stores only login-related keys and the last URL.',
      'settings.saved': 'Settings saved',

      'toast.copied': 'Link copied. Paste it into your browser.',
      'toast.cleared': 'Local login cleared',
      'toast.external': 'Tried to open the system browser',
      'toast.externalFailed': 'Could not open the system browser; the link was copied',
    };

    const CSS = `
.dweb-root{position:relative;box-sizing:border-box;display:flex;flex:1 1 auto;flex-direction:column;align-self:stretch;width:100%;height:100%;min-height:0;overflow:hidden;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#1f2328);font:inherit}
.dweb-persistent{position:fixed;z-index:2;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;background:#fff;visibility:visible;pointer-events:auto}
.dweb-persistent[data-visible="false"]{visibility:hidden;pointer-events:none}
.dweb-topbar{box-sizing:border-box;display:flex;align-items:center;gap:8px;flex:none;height:44px;padding:0 10px 0 8px;border-bottom:1px solid var(--dsw-alias-border-l1,#e6e8eb);background:var(--dsw-alias-bg-layer-1,#fafafa);z-index:3}
.dweb-back{box-sizing:border-box;display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 9px;border:1px solid transparent;border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary,#57606a);font:inherit;font-size:12px;cursor:pointer;white-space:nowrap}
.dweb-back:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary,#1f2328) 7%,transparent);color:var(--dsw-alias-label-primary,#1f2328)}
.dweb-back:focus-visible{outline:2px solid var(--dsw-alias-brand-primary,#4d6bfe);outline-offset:1px}
.dweb-backGlyph{font-size:14px;line-height:1}
.dweb-brand{display:flex;align-items:center;gap:7px;min-width:0;color:var(--dsw-alias-label-primary,#1f2328)}
.dweb-brandIcon{display:grid;place-items:center;flex:none;width:22px;height:22px;border-radius:7px;background:color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 13%,transparent);color:var(--dsw-alias-brand-primary,#4d6bfe)}
.dweb-brandText{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:600;letter-spacing:-.01em}
.dweb-spacer{flex:1;min-width:8px}
.dweb-chip{display:inline-flex;align-items:center;gap:6px;height:24px;padding:0 8px;border:0;border-radius:999px;background:transparent;color:var(--dsw-alias-label-tertiary,#8b949e);font:inherit;font-size:11px;line-height:1;white-space:nowrap}
button.dweb-chip{cursor:pointer}
button.dweb-chip:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary,#1f2328) 6%,transparent);color:var(--dsw-alias-label-secondary,#57606a)}
.dweb-chip:focus-visible{outline:2px solid var(--dsw-alias-brand-primary,#4d6bfe);outline-offset:1px}
.dweb-chipDot{width:6px;height:6px;border-radius:50%;background:currentColor;flex:none}
.dweb-chip-running{color:var(--dsw-alias-brand-primary,#4d6bfe);background:color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 9%,transparent)}
.dweb-chip-pending{color:var(--dsw-alias-state-warn-primary,#b7791f);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#b7791f) 12%,transparent)}
.dweb-actions{display:flex;align-items:center;gap:2px;flex:none}
.dweb-iconBtn{display:grid;place-items:center;width:28px;height:28px;padding:0;border:0;border-radius:7px;background:transparent;color:var(--dsw-alias-label-tertiary,#8b949e);font:inherit;font-size:15px;line-height:1;cursor:pointer}
.dweb-iconBtn:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary,#1f2328) 7%,transparent);color:var(--dsw-alias-label-primary,#1f2328)}
.dweb-iconBtn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary,#4d6bfe);outline-offset:1px}
.dweb-iconBtn[data-active="true"]{background:color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 11%,transparent);color:var(--dsw-alias-brand-primary,#4d6bfe)}
.dweb-approval{display:flex;align-items:center;justify-content:space-between;gap:12px;flex:none;padding:7px 12px;border-bottom:1px solid color-mix(in srgb,var(--dsw-alias-state-warn-primary,#b7791f) 32%,transparent);background:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#b7791f) 9%,var(--dsw-alias-bg-base,#fff));color:var(--dsw-alias-state-warn-primary,#8a5a00);font-size:12px;line-height:18px}
.dweb-approvalText{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dweb-approvalBtn{flex:none;height:26px;padding:0 10px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-warn-primary,#b7791f) 45%,transparent);border-radius:7px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-state-warn-primary,#8a5a00);font:inherit;font-size:12px;cursor:pointer;white-space:nowrap}
.dweb-approvalBtn:hover{background:color-mix(in srgb,var(--dsw-alias-state-warn-primary,#b7791f) 10%,var(--dsw-alias-bg-base,#fff))}
.dweb-hint{display:flex;align-items:center;gap:8px;flex:none;padding:7px 12px;border-bottom:1px solid var(--dsw-alias-border-l1,#e6e8eb);background:color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 6%,var(--dsw-alias-bg-base,#fff));color:var(--dsw-alias-label-secondary,#57606a);font-size:12px;line-height:18px}
.dweb-hintText{min-width:0}
.dweb-hint strong{color:var(--dsw-alias-label-primary,#1f2328);font-weight:600}
.dweb-stage{position:relative;flex:1;min-height:0;overflow:hidden;background:#fff}
.dweb-webview{display:flex;flex:1 1 auto;width:100%;min-width:0;height:100%;min-height:0;border:0;background:#fff}
.dweb-overlay{position:absolute;inset:0;z-index:10;display:grid;place-items:center;box-sizing:border-box;padding:24px;background:color-mix(in srgb,var(--dsw-alias-bg-base,#fff) 88%,transparent);backdrop-filter:blur(2px)}
.dweb-card{box-sizing:border-box;width:min(460px,100%);padding:22px 22px 18px;border:1px solid var(--dsw-alias-border-l1,#e6e8eb);border-radius:14px;background:var(--dsw-alias-bg-overlay,#fff);box-shadow:0 18px 48px color-mix(in srgb,var(--dsw-alias-label-primary,#1f2328) 12%,transparent);text-align:center}
.dweb-cardIcon{display:grid;place-items:center;width:44px;height:44px;margin:0 auto 12px;border-radius:13px;background:color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 11%,transparent);color:var(--dsw-alias-brand-primary,#4d6bfe);font-size:22px;line-height:1}
.dweb-cardTitle{margin:0;font-size:15px;line-height:22px;font-weight:600;color:var(--dsw-alias-label-primary,#1f2328)}
.dweb-cardText{margin:7px auto 0;max-width:370px;color:var(--dsw-alias-label-tertiary,#6e7781);font-size:12px;line-height:18px}
.dweb-cardActions{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px;margin-top:16px}
.dweb-primary{height:30px;padding:0 14px;border:1px solid var(--dsw-alias-brand-primary,#4d6bfe);border-radius:8px;background:var(--dsw-alias-brand-primary,#4d6bfe);color:#fff;font:inherit;font-size:12px;cursor:pointer}
.dweb-primary:hover{filter:brightness(.96)}
.dweb-secondary{height:30px;padding:0 13px;border:1px solid var(--dsw-alias-border-l2,#d0d7de);border-radius:8px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-secondary,#57606a);font:inherit;font-size:12px;cursor:pointer}
.dweb-secondary:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary,#1f2328) 5%,var(--dsw-alias-bg-base,#fff))}
.dweb-spinner{width:26px;height:26px;margin:0 auto 12px;border:2.5px solid color-mix(in srgb,var(--dsw-alias-brand-primary,#4d6bfe) 24%,transparent);border-top-color:var(--dsw-alias-brand-primary,#4d6bfe);border-radius:50%;animation:dweb-spin .8s linear infinite}
@keyframes dweb-spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){.dweb-spinner{animation-duration:2.4s}}
.dweb-loadingText{color:var(--dsw-alias-label-secondary,#57606a);font-size:12px;line-height:18px}
.dweb-loadingHint{margin-top:4px;color:var(--dsw-alias-label-tertiary,#8b949e);font-size:11px;line-height:16px}
.dweb-menu{position:absolute;top:48px;right:10px;z-index:20;box-sizing:border-box;width:328px;max-width:calc(100vw - 20px);max-height:calc(100% - 60px);overflow:auto;padding:12px;border:1px solid var(--dsw-alias-border-l1,#e6e8eb);border-radius:12px;background:var(--dsw-alias-bg-overlay,#fff);box-shadow:0 16px 44px color-mix(in srgb,var(--dsw-alias-label-primary,#1f2328) 16%,transparent);color:var(--dsw-alias-label-primary,#1f2328)}
.dweb-menuTitle{margin:0 0 8px;padding:0 2px;font-size:12px;font-weight:600;line-height:18px;color:var(--dsw-alias-label-secondary,#57606a)}
.dweb-setting{display:flex;align-items:flex-start;gap:8px;padding:7px 2px;cursor:pointer;border-radius:7px}
.dweb-setting:hover{background:color-mix(in srgb,var(--dsw-alias-label-primary,#1f2328) 4%,transparent)}
.dweb-setting input{flex:none;width:14px;height:14px;margin:2px 0 0;accent-color:var(--dsw-alias-brand-primary,#4d6bfe)}
.dweb-settingCopy{display:block;min-width:0}
.dweb-settingTitle{display:block;font-size:12px;line-height:18px;font-weight:500}
.dweb-settingHint{display:block;margin-top:1px;color:var(--dsw-alias-label-tertiary,#8b949e);font-size:11px;line-height:16px}
.dweb-menuSep{height:1px;margin:8px 0;background:var(--dsw-alias-border-l1,#e6e8eb)}
.dweb-menuAction{width:100%;height:30px;border:1px solid var(--dsw-alias-border-l2,#d0d7de);border-radius:8px;background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-state-error-primary,#cf222e);font:inherit;font-size:12px;cursor:pointer}
.dweb-menuAction:hover{background:color-mix(in srgb,var(--dsw-alias-state-error-primary,#cf222e) 6%,var(--dsw-alias-bg-base,#fff))}
.dweb-menuNote{margin:7px 2px 0;color:var(--dsw-alias-label-tertiary,#8b949e);font-size:11px;line-height:16px}
.dweb-toast{position:fixed;left:50%;bottom:22px;z-index:30;max-width:min(520px,calc(100vw - 32px));transform:translateX(-50%);box-sizing:border-box;padding:8px 12px;border:1px solid var(--dsw-alias-border-l2,#d0d7de);border-radius:8px;background:var(--dsw-alias-bg-overlay,#fff);box-shadow:0 8px 24px color-mix(in srgb,var(--dsw-alias-label-primary,#1f2328) 14%,transparent);color:var(--dsw-alias-label-secondary,#57606a);font-size:12px;line-height:18px;text-align:center}
@media (max-width:720px){.dweb-backLabel{display:none}.dweb-brandText{font-size:12px}.dweb-chip{font-size:10px;padding:0 6px}.dweb-topbar{gap:4px;padding:0 6px}}
`;

    function readJson(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === 'object' ? parsed : fallback;
      } catch {
        return fallback;
      }
    }

    function writeJson(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    }

    function removeKey(key) {
      try {
        localStorage.removeItem(key);
      } catch {
        // storage may be unavailable
      }
    }

    function loadSettings() {
      const raw = readJson(SETTINGS_KEY, {});
      return {
        remember: raw.remember !== false,
        restoreLast: raw.restoreLast !== false,
        compatUA: raw.compatUA === true,
      };
    }

    function saveSettings(settings) {
      writeJson(SETTINGS_KEY, {
        remember: settings.remember !== false,
        restoreLast: settings.restoreLast !== false,
        compatUA: settings.compatUA === true,
      });
    }

    function loadSession() {
      const raw = readJson(SESSION_KEY, null);
      if (!raw || typeof raw !== 'object') return null;
      const storage = raw.storage && typeof raw.storage === 'object' ? raw.storage : null;
      const url = typeof raw.url === 'string' ? raw.url : '';
      if (!storage && !url) return null;
      return { storage, url, savedAt: Number(raw.savedAt) || 0 };
    }

    function saveSession(session) {
      if (!session) {
        removeKey(SESSION_KEY);
        return;
      }
      writeJson(SESSION_KEY, {
        storage: session.storage || undefined,
        url: session.url || HOME_URL,
        savedAt: Date.now(),
      });
    }

    function clearSession() {
      removeKey(SESSION_KEY);
    }

    function parseUrl(value) {
      try {
        return new URL(String(value || ''));
      } catch {
        return null;
      }
    }

    function isChatUrl(value) {
      const url = parseUrl(value);
      return Boolean(url && url.protocol === 'https:' && url.hostname === 'chat.deepseek.com');
    }

    function isAllowedHost(hostname) {
      return (
        hostname === 'chat.deepseek.com' ||
        hostname === 'account.deepseek.com' ||
        hostname === 'platform.deepseek.com' ||
        hostname.endsWith('.deepseek.com')
      );
    }

    function isAllowedUrl(value) {
      const url = parseUrl(value);
      return Boolean(
        url &&
          url.protocol === 'https:' &&
          isAllowedHost(url.hostname) &&
          !url.username &&
          !url.password,
      );
    }

    function isAuthStorageKey(key) {
      return (
        key === 'userToken' ||
        key.startsWith('hif_') ||
        /token/i.test(key) ||
        /auth/i.test(key)
      );
    }

    function tryOpenExternal(url) {
      try {
        const win = window.open(url, '_blank');
        if (win) {
          try {
            win.opener = null;
          } catch {
            // ignore
          }
          return true;
        }
        // The Electron shell denies the popup and hands the URL to the system
        // browser, so a null window still means the desktop handled it.
        return Boolean(globalThis.dshDesktop);
      } catch {
        return false;
      }
    }

    function copyText(text) {
      try {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.top = '-1000px';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand('copy');
        area.remove();
        return ok;
      } catch {
        return false;
      }
    }

    function desktopBrowser() {
      const desktop = globalThis.dshDesktop;
      if (!desktop || desktop.protocolVersion !== 1 || !desktop.browser) return undefined;
      return desktop.browser;
    }

    function compatibleUserAgent() {
      try {
        const ua = String(navigator.userAgent || '');
        const cleaned = ua
          .replace(/\s(?:Electron|DeepSeek Harness|dsh)\/[^\s]+/gi, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim();
        return cleaned || CHROME_UA;
      } catch {
        return CHROME_UA;
      }
    }

    function releaseQuietly(browser, lease) {
      if (!browser || !lease) return;
      Promise.resolve(browser.release(lease)).catch(() => {});
    }

    class Guest {
      constructor(options) {
        this.host = options.host;
        this.getSettings = options.getSettings;
        this.getSession = options.getSession;
        this.onPhase = options.onPhase;
        this.onExternal = options.onExternal;
        this.onUrl = options.onUrl;
        this.onSaved = options.onSaved;
        this.onAuthExpired = options.onAuthExpired;

        this.disposed = false;
        this.started = false;
        this.el = null;
        this.lease = null;
        this.offOpen = null;
        this.poll = null;
        this.evalTimer = null;
        this.resizeObserver = null;
        this.evaluating = false;
        this.evalAgain = false;
        this.restoreAttempted = false;
        this.hadToken = false;
        this.lastToken = '';
        this.lastExternalAt = 0;
        this.phase = 'loading';
      }

      setPhase(phase, detail) {
        if (this.disposed) return;
        this.phase = phase;
        this.onPhase(phase, detail || '');
      }

      async start() {
        if (this.disposed || this.started) return;
        this.started = true;
        const browser = desktopBrowser();
        if (!browser) {
          this.setPhase('unsupported', 'no-desktop');
          return;
        }

        this.setPhase('loading');
        let reservation;
        try {
          reservation = await browser.acquire(WORKSPACE_KEY);
        } catch {
          this.setPhase('unsupported', 'acquire-failed');
          return;
        }
        if (this.disposed) {
          releaseQuietly(browser, reservation.lease);
          return;
        }
        this.lease = reservation.lease;

        try {
          this.offOpen = browser.onOpenRequested(this.lease, (url) => this.openGuestExternal(url));
        } catch {
          this.offOpen = null;
        }

        const el = document.createElement('webview');
        el.className = 'dweb-webview';
        el.style.display = 'flex';
        el.style.flex = '1 1 auto';
        el.style.width = '100%';
        el.style.height = '100%';
        el.style.minHeight = '0';
        el.setAttribute('name', this.lease);
        el.setAttribute('partition', reservation.partition);
        el.setAttribute('src', 'about:blank#' + this.lease);
        el.setAttribute('allowpopups', '');
        el.setAttribute('aria-label', 'DeepSeek');
        this.el = el;
        this.bind(el);
        this.host.appendChild(el);

        if (typeof ResizeObserver === 'function') {
          this.resizeObserver = new ResizeObserver(() => this.fit());
          this.resizeObserver.observe(this.host);
        }
        this.fit();

        const attached = await new Promise((resolve) => {
          let settled = false;
          const finish = (ok) => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            el.removeEventListener('dom-ready', ready);
            resolve(ok);
          };
          const ready = () => finish(true);
          const timer = setTimeout(() => finish(false), 10000);
          el.addEventListener('dom-ready', ready);
        });

        if (this.disposed) return;
        if (!attached) {
          this.setPhase('error', 'attach-timeout');
          return;
        }

        const settings = this.getSettings();
        if (settings.compatUA) this.applyUserAgent();

        const target = this.targetUrl();
        try {
          await el.loadURL(target);
        } catch {
          if (!this.disposed) this.setPhase('error', 'load-failed');
          return;
        }

        if (this.disposed) return;
        this.poll = setInterval(() => this.capture(), 8000);
      }

      targetUrl() {
        const settings = this.getSettings();
        const session = this.getSession();
        const saved = session && typeof session.url === 'string' ? session.url : '';
        if (settings.restoreLast && saved && isChatUrl(saved) && !saved.includes('/sign_in')) return saved;
        return HOME_URL;
      }

      applyUserAgent() {
        try {
          if (this.el && typeof this.el.setUserAgent === 'function') {
            this.el.setUserAgent(compatibleUserAgent());
          }
        } catch {
          // compatibility only
        }
      }

      fit() {
        if (!this.el || !this.host || this.disposed) return;
        try {
          const rect = this.host.getBoundingClientRect();
          if (rect.width > 0) this.el.style.width = Math.round(rect.width) + 'px';
          if (rect.height > 0) this.el.style.height = Math.round(rect.height) + 'px';
        } catch {
          // ignore layout races
        }
      }

      blur() {
        try {
          if (this.el && typeof this.el.blur === 'function') this.el.blur();
        } catch {
          // ignore
        }
        try {
          if (this.el) {
            const pending = this.el.executeJavaScript(
              'try{if(document.activeElement&&document.activeElement.blur)document.activeElement.blur()}catch(e){}',
              false,
            );
            if (pending && typeof pending.catch === 'function') pending.catch(() => {});
          }
        } catch {
          // ignore
        }
      }

      bind(el) {
        this.onDomReady = () => this.scheduleEvaluate();
        this.onNavigate = (event) => {
          const url = event && typeof event.url === 'string' ? event.url : this.safeUrl();
          if (url) this.onUrl(url);
          this.scheduleEvaluate();
        };
        this.onInPage = (event) => {
          const url = event && typeof event.url === 'string' ? event.url : this.safeUrl();
          if (url) this.onUrl(url);
        };
        this.onWillNavigate = (event) => {
          const url = event && typeof event.url === 'string' ? event.url : '';
          if (!url || isAllowedUrl(url)) return;
          try {
            event.preventDefault();
          } catch {
            // not cancelable on every Electron version
          }
          if (/^https?:/i.test(url)) this.openGuestExternal(url);
        };
        this.onFail = (event) => {
          if (!event || event.isMainFrame !== true) return;
          if (event.errorCode === -3) return;
          const validated = String(event.validatedURL || '');
          if (validated.startsWith('about:')) return;
          this.setPhase('error', 'load-failed');
        };
        this.onCrash = () => this.setPhase('error', 'crash');
        this.onNewWindow = (event) => {
          if (event && typeof event.url === 'string') this.openGuestExternal(event.url);
        };

        el.addEventListener('dom-ready', this.onDomReady);
        el.addEventListener('did-navigate', this.onNavigate);
        el.addEventListener('did-navigate-in-page', this.onInPage);
        el.addEventListener('will-navigate', this.onWillNavigate);
        el.addEventListener('did-fail-load', this.onFail);
        el.addEventListener('render-process-gone', this.onCrash);
        el.addEventListener('new-window', this.onNewWindow);
      }

      openGuestExternal(url) {
        if (!url || !/^https?:/i.test(url)) return;
        const now = Date.now();
        if (now - this.lastExternalAt < 800) return;
        this.lastExternalAt = now;
        this.onExternal(url);
      }

      scheduleEvaluate() {
        if (this.disposed) return;
        if (this.evalTimer) clearTimeout(this.evalTimer);
        this.evalTimer = setTimeout(() => {
          this.evalTimer = null;
          this.evaluate();
        }, 500);
      }

      async evaluate() {
        if (this.disposed || !this.el) return;
        if (this.evaluating) {
          this.evalAgain = true;
          return;
        }
        this.evaluating = true;
        try {
          await this.evaluateOnce();
        } catch {
          // transient page errors are expected while the SPA boots
        } finally {
          this.evaluating = false;
          if (this.evalAgain && !this.disposed) {
            this.evalAgain = false;
            this.scheduleEvaluate();
          }
        }
      }

      async evaluateOnce() {
        const url = this.safeUrl();
        if (!url || !isChatUrl(url)) return;
        const settings = this.getSettings();
        const state = await this.readState();
        if (this.disposed) return;

        if (state.token) {
          if (url.includes('/sign_in')) {
            if (this.restoreAttempted) {
              this.restoreAttempted = false;
              this.onAuthExpired();
              this.setPhase('login', 'expired');
            } else {
              this.setPhase('login');
            }
            return;
          }
          this.hadToken = true;
          this.lastToken = state.token;
          this.setPhase('ready');
          this.persist(state.storage, url);
          return;
        }

        if (this.hadToken && url.includes('/sign_in')) {
          this.hadToken = false;
          this.onAuthExpired();
          this.setPhase('login', 'expired');
          return;
        }

        if (settings.remember && !this.restoreAttempted) {
          const saved = this.getSession();
          if (saved && saved.storage && saved.storage.userToken) {
            this.restoreAttempted = true;
            this.setPhase('restoring');
            await this.writeStorage(saved.storage);
            if (!this.disposed && this.el) {
              try {
                await this.el.reload();
              } catch {
                // ignore
              }
            }
            return;
          }
        }

        if (url.includes('/sign_in')) {
          if (this.restoreAttempted) {
            this.restoreAttempted = false;
            this.onAuthExpired();
            this.setPhase('login', 'expired');
            return;
          }
          this.setPhase('login');
          return;
        }

        this.setPhase('ready');
      }

      async readState() {
        const raw = await this.el.executeJavaScript(
          '(function(){try{return JSON.stringify({t:localStorage.getItem("userToken")||"",' +
            's:Object.fromEntries(Object.keys(localStorage).map(function(k){return [k,localStorage.getItem(k)]}))})}catch(e){return "{}"}})()',
          false,
        );
        const parsed = JSON.parse(String(raw || '{}'));
        return {
          token: typeof parsed.t === 'string' ? parsed.t : '',
          storage: parsed.s && typeof parsed.s === 'object' ? parsed.s : {},
        };
      }

      async writeStorage(storage) {
        const entries = Object.entries(storage || {}).slice(0, 80);
        let code = '';
        for (const [key, value] of entries) {
          if (typeof key !== 'string' || typeof value !== 'string') continue;
          if (value.length > 20000) continue;
          code +=
            'try{localStorage.setItem(' +
            JSON.stringify(key) +
            ',' +
            JSON.stringify(value) +
            ')}catch(e){}';
        }
        if (!code) return;
        await this.el.executeJavaScript('(function(){' + code + '})()', false);
      }

      persist(storage, url) {
        const settings = this.getSettings();
        const cleanUrl = isChatUrl(url) && !url.includes('/sign_in') ? url : HOME_URL;
        if (!settings.remember) {
          const current = this.getSession();
          if (!current || current.url !== cleanUrl) {
            const next = { url: cleanUrl, savedAt: Date.now() };
            this.onSaved(next);
          }
          return;
        }

        const safe = {};
        let bytes = 0;
        for (const [key, value] of Object.entries(storage || {})) {
          if (typeof key !== 'string' || typeof value !== 'string') continue;
          if (!isAuthStorageKey(key)) continue;
          if (key.length > 200 || value.length > 20000) continue;
          bytes += key.length + value.length;
          if (bytes > MAX_STORAGE_BYTES) break;
          safe[key] = value;
        }
        if (!safe.userToken) return;

        const current = this.getSession();
        if (
          current &&
          current.url === cleanUrl &&
          current.storage &&
          current.storage.userToken === safe.userToken
        ) {
          return;
        }
        const next = { storage: safe, url: cleanUrl, savedAt: Date.now() };
        this.onSaved(next);
      }

      async capture() {
        if (this.disposed || !this.el) return;
        if (this.phase === 'error' || this.phase === 'unsupported') return;
        try {
          const url = this.safeUrl();
          if (!url || !isChatUrl(url) || url.includes('/sign_in')) return;
          const state = await this.readState();
          if (!state.token || this.disposed) return;
          this.hadToken = true;
          if (state.token !== this.lastToken) {
            this.lastToken = state.token;
            this.setPhase('ready');
          }
          this.persist(state.storage, url);
        } catch {
          // ignore transient read failures
        }
      }

      captureNow() {
        this.scheduleEvaluate();
      }

      async clearStorage(keys) {
        const list = Array.isArray(keys) ? keys : [];
        let code = '';
        for (const key of list) {
          if (typeof key !== 'string' || !key) continue;
          code += 'try{localStorage.removeItem(' + JSON.stringify(key) + ')}catch(e){}';
        }
        code += 'try{localStorage.removeItem("userToken")}catch(e){}';
        try {
          if (this.el) await this.el.executeJavaScript('(function(){' + code + '})()', false);
        } catch {
          // ignore
        }
      }

      reload() {
        if (this.disposed || !this.el) return;
        try {
          this.el.reload();
        } catch {
          // ignore
        }
      }

      safeUrl() {
        try {
          return this.el ? this.el.getURL() || '' : '';
        } catch {
          return '';
        }
      }

      async dispose() {
        if (this.disposed) return;
        this.disposed = true;
        this.started = false;

        if (this.poll) clearInterval(this.poll);
        this.poll = null;
        if (this.evalTimer) clearTimeout(this.evalTimer);
        this.evalTimer = null;
        if (this.resizeObserver) {
          try {
            this.resizeObserver.disconnect();
          } catch {
            // ignore
          }
          this.resizeObserver = null;
        }

        const el = this.el;
        this.el = null;
        if (el) {
          try {
            el.removeEventListener('dom-ready', this.onDomReady);
            el.removeEventListener('did-navigate', this.onNavigate);
            el.removeEventListener('did-navigate-in-page', this.onInPage);
            el.removeEventListener('will-navigate', this.onWillNavigate);
            el.removeEventListener('did-fail-load', this.onFail);
            el.removeEventListener('render-process-gone', this.onCrash);
            el.removeEventListener('new-window', this.onNewWindow);
          } catch {
            // ignore
          }
          try {
            el.remove();
          } catch {
            // ignore
          }
        }

        if (this.offOpen) {
          try {
            this.offOpen();
          } catch {
            // ignore
          }
          this.offOpen = null;
        }

        const lease = this.lease;
        this.lease = null;
        const browser = desktopBrowser();
        if (lease && browser) {
          try {
            await browser.release(lease);
          } catch {
            // ignore
          }
        }
      }
    }

    function useDshStatus(ctx) {
      const source = ctx.uiSession && ctx.uiSession.sessionStatus ? ctx.uiSession.sessionStatus : undefined;
      const subscribe = React.useCallback(
        (listener) => {
          if (!source) return () => {};
          try {
            return source.subscribe(listener);
          } catch {
            return () => {};
          }
        },
        [source],
      );
      const getSnapshot = React.useCallback(() => {
        if (!source) return EMPTY_STATUS;
        try {
          const value = source.getSnapshot();
          return value instanceof Map ? value : EMPTY_STATUS;
        } catch {
          return EMPTY_STATUS;
        }
      }, [source]);
      const snapshot = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

      let running = 0;
      let pending = 0;
      let pendingId = null;
      if (snapshot && typeof snapshot.forEach === 'function') {
        snapshot.forEach((state, id) => {
          if (state && state.running) running += 1;
          if (state && state.pendingInteraction) {
            pending += 1;
            if (!pendingId) pendingId = id;
          }
        });
      }
      return { available: Boolean(source), running, pending, pendingId };
    }

    function apply(ctx) {
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'deepseek-web: dictionaries');
      const t = ctx.locale.bind(NS);

      ctx.effect(() => {
        const tag = document.createElement('style');
        tag.dataset.plugin = 'dsh-deepseek-web-embed';
        tag.dataset.pluginCss = STYLE_ID;
        tag.textContent = CSS;
        document.head.appendChild(tag);
        return () => tag.remove();
      }, 'deepseek-web: styles');

      function DeepSeekMark({ size }) {
        return h(
          'svg',
          {
            width: size,
            height: size,
            viewBox: '0 0 24 24',
            fill: 'none',
            'aria-hidden': 'true',
          },
          h('path', {
            d: 'M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6.6l-4.1 3.1c-.6.5-1.3 0-1.3-.7V7Z',
            stroke: 'currentColor',
            strokeWidth: 1.7,
            strokeLinejoin: 'round',
          }),
          h('path', {
            d: 'M8.2 9.4c1.1 1.3 2.4 2 3.8 2s2.7-.7 3.8-2',
            stroke: 'currentColor',
            strokeWidth: 1.7,
            strokeLinecap: 'round',
          }),
        );
      }

      function DeepSeekIcon({ size = 18 }) {
        return h(DeepSeekMark, { size });
      }

      /**
       * The guest survives page switches. The main slot unmounts when a DSH
       * conversation is selected, so the webview cannot live inside the page
       * component: it stays in a fixed layer positioned over the page's stage,
       * hidden while another view is active. Reopening the panel only moves and
       * reveals the layer; the page never reloads.
       */
      const runtime = {
        host: null,
        guest: null,
        stage: null,
        observer: null,
        settings: loadSettings(),
        session: loadSession(),
        url: HOME_URL,
        phase: 'loading',
        detail: '',
        pageMounted: false,
        callbacks: {},
      };

      function ensureHost() {
        if (runtime.host) return runtime.host;
        const host = document.createElement('div');
        host.className = 'dweb-persistent';
        host.dataset.visible = 'false';
        document.body.appendChild(host);
        runtime.host = host;
        return host;
      }

      function updateVisible() {
        if (!runtime.host) return;
        const visible =
          runtime.pageMounted && (runtime.phase === 'ready' || runtime.phase === 'login');
        runtime.host.dataset.visible = visible ? 'true' : 'false';
      }

      function positionHost() {
        const stage = runtime.stage;
        const host = runtime.host;
        if (!stage || !host) return;
        try {
          const rect = stage.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) return;
          host.style.left = Math.round(rect.left) + 'px';
          host.style.top = Math.round(rect.top) + 'px';
          host.style.width = Math.round(rect.width) + 'px';
          host.style.height = Math.round(rect.height) + 'px';
          if (runtime.guest) runtime.guest.fit();
        } catch {
          // ignore layout races while the panel is mounting
        }
      }

      function ensureGuest() {
        ensureHost();
        if (runtime.guest) return runtime.guest;
        const guest = new Guest({
          host: runtime.host,
          getSettings: () => runtime.settings,
          getSession: () => runtime.session,
          onPhase: (next, why) => {
            runtime.phase = next;
            runtime.detail = why || '';
            updateVisible();
            runtime.callbacks.onPhase?.(next, why || '');
          },
          onUrl: (url) => {
            if (!url) return;
            if (isChatUrl(url) && !url.includes('/sign_in')) runtime.url = url;
            runtime.callbacks.onUrl?.(url);
          },
          onExternal: (url) => {
            if (!url) return;
            if (!tryOpenExternal(url)) {
              const copied = copyText(url);
              runtime.callbacks.notify?.(
                t(copied ? 'toast.copied' : 'toast.externalFailed'),
              );
            }
          },
          onSaved: (next) => {
            runtime.session = next;
            saveSession(next);
            runtime.callbacks.onSaved?.(next);
          },
          onAuthExpired: () => {
            clearSession();
            runtime.session = null;
            runtime.callbacks.onAuthExpired?.();
          },
        });
        runtime.guest = guest;
        return guest;
      }

      function attachStage(stage) {
        if (!stage) return;
        if (runtime.stage !== stage) {
          if (runtime.observer) {
            try {
              runtime.observer.disconnect();
            } catch {
              // ignore
            }
            runtime.observer = null;
          }
          runtime.stage = stage;
        }
        runtime.pageMounted = true;
        ensureGuest();
        positionHost();
        updateVisible();
        if (typeof ResizeObserver === 'function' && !runtime.observer) {
          runtime.observer = new ResizeObserver(() => positionHost());
          runtime.observer.observe(stage);
        }
        window.removeEventListener('resize', positionHost);
        window.addEventListener('resize', positionHost);
        requestAnimationFrame(() => {
          positionHost();
          if (runtime.guest) runtime.guest.fit();
        });
      }

      function detachStage() {
        runtime.pageMounted = false;
        if (runtime.guest) runtime.guest.blur();
        updateVisible();
        if (runtime.observer) {
          try {
            runtime.observer.disconnect();
          } catch {
            // ignore
          }
          runtime.observer = null;
        }
        window.removeEventListener('resize', positionHost);
        runtime.stage = null;
      }

      async function restartGuest() {
        const previous = runtime.guest;
        runtime.guest = null;
        runtime.phase = 'loading';
        runtime.detail = '';
        updateVisible();
        runtime.callbacks.onPhase?.('loading', '');
        if (previous) {
          try {
            await previous.dispose();
          } catch {
            // ignore
          }
        }
        const guest = ensureGuest();
        guest.start().catch(() => {
          runtime.phase = 'error';
          runtime.detail = 'load-failed';
          updateVisible();
          runtime.callbacks.onPhase?.('error', 'load-failed');
        });
      }

      function disposeRuntime() {
        detachStage();
        const guest = runtime.guest;
        runtime.guest = null;
        if (guest) {
          try {
            guest.dispose();
          } catch {
            // ignore
          }
        }
        if (runtime.host) {
          runtime.host.remove();
          runtime.host = null;
        }
      }

      ctx.effect(() => () => disposeRuntime(), 'deepseek-web: persistent guest');

      function DeepSeekPage() {
        const [phase, setPhase] = React.useState(runtime.phase || 'loading');
        const [detail, setDetail] = React.useState(runtime.detail || '');
        const [settings, setSettings] = React.useState(runtime.settings);
        const [session, setSession] = React.useState(runtime.session);
        const [currentUrl, setCurrentUrl] = React.useState(runtime.url || HOME_URL);
        const [menuOpen, setMenuOpen] = React.useState(false);
        const [toast, setToast] = React.useState('');

        const stageRef = React.useRef(null);
        const menuRef = React.useRef(null);
        const settingsRef = React.useRef(settings);
        const sessionRef = React.useRef(session);
        const toastTimer = React.useRef(null);
        const status = useDshStatus(ctx);

        settingsRef.current = settings;
        sessionRef.current = session;
        runtime.settings = settings;
        runtime.session = session;

        const notify = React.useCallback((message) => {
          if (!message) return;
          setToast(message);
          if (toastTimer.current) clearTimeout(toastTimer.current);
          toastTimer.current = setTimeout(() => setToast(''), 3600);
        }, []);
        const notifyRef = React.useRef(notify);
        notifyRef.current = notify;

        React.useEffect(
          () => () => {
            if (toastTimer.current) clearTimeout(toastTimer.current);
          },
          [],
        );

        runtime.callbacks = {
          onPhase: (next, why) => {
            setPhase(next);
            setDetail(why || '');
          },
          onUrl: (url) => {
            if (!isChatUrl(url)) return;
            setCurrentUrl(url);
          },
          onSaved: (next) => {
            sessionRef.current = next;
            setSession(next);
          },
          onAuthExpired: () => {
            sessionRef.current = null;
            setSession(null);
          },
          notify: (message) => notifyRef.current(message),
        };

        React.useEffect(() => {
          const stage = stageRef.current;
          if (!stage) return undefined;
          attachStage(stage);
          const guest = ensureGuest();
          if (!guest.started) {
            setPhase('loading');
            setDetail('');
            guest.start().catch(() => {
              runtime.phase = 'error';
              runtime.detail = 'load-failed';
              updateVisible();
              setPhase('error');
              setDetail('load-failed');
            });
          } else {
            setPhase(runtime.phase);
            setDetail(runtime.detail || '');
          }
          return () => {
            runtime.callbacks = {};
            detachStage();
          };
        }, []);

        React.useEffect(() => {
          if (!menuOpen) return undefined;
          const close = (event) => {
            const root = menuRef.current;
            if (root && event.target instanceof Node && root.contains(event.target)) return;
            setMenuOpen(false);
          };
          document.addEventListener('mousedown', close);
          return () => document.removeEventListener('mousedown', close);
        }, [menuOpen]);

        const backToDsh = React.useCallback(() => {
          try {
            ctx.layout.selectPanel(null);
          } catch {
            // ignore
          }
        }, []);

        const jumpToDsh = React.useCallback(
          (sessionId) => {
            try {
              ctx.layout.selectPanel(null);
            } catch {
              // ignore
            }
            if (sessionId) {
              try {
                ctx.uiWorkspace.openSession(sessionId);
              } catch {
                // ignore
              }
            }
          },
          [],
        );

        const changeSetting = React.useCallback((key, value) => {
          const next = { ...settingsRef.current, [key]: value };
          settingsRef.current = next;
          runtime.settings = next;
          setSettings(next);
          saveSettings(next);
          if (key === 'remember' && value === false) {
            clearSession();
            runtime.session = null;
            sessionRef.current = null;
            setSession(null);
          }
          if (key === 'remember' && value === true) {
            const guest = runtime.guest;
            if (guest) guest.captureNow();
          }
          if (key === 'compatUA') {
            setPhase('loading');
            setDetail('');
            restartGuest().catch(() => {
              setPhase('error');
              setDetail('load-failed');
            });
          }
        }, []);

        const clearLocalLogin = React.useCallback(async () => {
          const stored = runtime.session || sessionRef.current;
          const keys = stored && stored.storage ? Object.keys(stored.storage) : [];
          clearSession();
          runtime.session = null;
          sessionRef.current = null;
          setSession(null);
          const guest = runtime.guest;
          if (guest) {
            await guest.clearStorage(keys);
            guest.reload();
          }
          notify(t('toast.cleared'));
        }, [notify, t]);

        const openExternal = React.useCallback(() => {
          const url = currentUrl && !currentUrl.includes('/sign_in') ? currentUrl : HOME_URL;
          if (tryOpenExternal(url)) {
            notify(t('toast.external'));
            return;
          }
          const copied = copyText(url);
          notify(t(copied ? 'toast.copied' : 'toast.externalFailed'));
        }, [currentUrl, notify, t]);

        const reload = React.useCallback(() => {
          const guest = runtime.guest;
          if (guest && (phase === 'ready' || phase === 'login')) {
            guest.reload();
            return;
          }
          setPhase('loading');
          setDetail('');
          restartGuest().catch(() => {
            setPhase('error');
            setDetail('load-failed');
          });
        }, [phase]);

        const showLoading = phase === 'loading' || phase === 'restoring';
        const showUnsupported = phase === 'unsupported';
        const showError = phase === 'error';

        const errorMessage = (() => {
          if (detail === 'attach-timeout' || detail === 'acquire-failed') return t('error.attach');
          if (detail === 'crash') return t('error.crash');
          if (detail === 'load-failed') return t('error.load');
          return t('error.hint');
        })();

        const chip =
          !status.available
            ? h(
                'span',
                { className: 'dweb-chip', title: t('status.unknown') },
                h('span', { className: 'dweb-chipDot' }),
                t('status.unknown'),
              )
            : status.pending > 0
              ? h(
                  'button',
                  {
                    type: 'button',
                    className: 'dweb-chip dweb-chip-pending',
                    title: t('status.pendingHint'),
                    onClick: () => jumpToDsh(status.pendingId),
                  },
                  h('span', { className: 'dweb-chipDot' }),
                  t('status.pending', { n: status.pending }),
                )
              : status.running > 0
                ? h(
                    'button',
                    {
                      type: 'button',
                      className: 'dweb-chip dweb-chip-running',
                      title: t('status.runningHint'),
                      onClick: () => jumpToDsh(null),
                    },
                    h('span', { className: 'dweb-chipDot' }),
                    t('status.running', { n: status.running }),
                  )
                : h(
                    'span',
                    { className: 'dweb-chip' },
                    h('span', { className: 'dweb-chipDot' }),
                    t('status.idle'),
                  );

        const settingRow = (key, title, hint) =>
          h(
            'label',
            { className: 'dweb-setting' },
            h('input', {
              type: 'checkbox',
              checked: Boolean(settings[key]),
              onChange: (event) => changeSetting(key, event.target.checked),
            }),
            h(
              'span',
              { className: 'dweb-settingCopy' },
              h('span', { className: 'dweb-settingTitle' }, title),
              h('span', { className: 'dweb-settingHint' }, hint),
            ),
          );

        return h(
          'div',
          {
            className: 'dweb-root',
            style: {
              flex: '1 1 auto',
              alignSelf: 'stretch',
              width: '100%',
              height: '100%',
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            },
          },
          h(
            'div',
            { className: 'dweb-topbar' },
            h(
              'button',
              {
                type: 'button',
                className: 'dweb-back',
                onClick: backToDsh,
                title: t('action.back'),
              },
              h('span', { className: 'dweb-backGlyph', 'aria-hidden': 'true' }, '\u2190'),
              h('span', { className: 'dweb-backLabel' }, t('action.back')),
            ),
            h(
              'div',
              { className: 'dweb-brand' },
              h('span', { className: 'dweb-brandIcon' }, h(DeepSeekMark, { size: 15 })),
              h('span', { className: 'dweb-brandText' }, t('page.title')),
            ),
            h('span', { className: 'dweb-spacer' }),
            chip,
            h(
              'div',
              { className: 'dweb-actions' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dweb-iconBtn',
                  title: t('action.reload'),
                  'aria-label': t('action.reload'),
                  onClick: reload,
                },
                '\u21bb',
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dweb-iconBtn',
                  title: t('action.external'),
                  'aria-label': t('action.external'),
                  onClick: openExternal,
                },
                '\u2197',
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dweb-iconBtn',
                  title: t('action.settings'),
                  'aria-label': t('action.settings'),
                  'aria-expanded': menuOpen ? 'true' : 'false',
                  'data-active': menuOpen ? 'true' : 'false',
                  onClick: () => setMenuOpen((value) => !value),
                },
                '\u2699',
              ),
            ),
          ),
          status.pending > 0 &&
            h(
              'div',
              { className: 'dweb-approval', role: 'status' },
              h(
                'span',
                { className: 'dweb-approvalText' },
                t('approval.text', { n: status.pending }),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dweb-approvalBtn',
                  onClick: () => jumpToDsh(status.pendingId),
                },
                t('approval.action'),
              ),
            ),
          phase === 'login' &&
            h(
              'div',
              { className: 'dweb-hint' },
              h(
                'span',
                { className: 'dweb-hintText' },
                detail === 'expired' ? t('login.expired') : t('login.hint'),
                ' ',
                h('span', null, t('login.envHint')),
              ),
            ),
          h(
            'div',
            { className: 'dweb-stage', ref: stageRef },
            showLoading &&
              h(
                'div',
                { className: 'dweb-overlay' },
                h(
                  'div',
                  { className: 'dweb-card', role: 'status' },
                  h('div', { className: 'dweb-spinner' }),
                  h('div', { className: 'dweb-loadingText' }, t(phase === 'restoring' ? 'loading.restore' : 'loading.title')),
                  h('div', { className: 'dweb-loadingHint' }, t('loading.hint')),
                ),
              ),
            showUnsupported &&
              h(
                'div',
                { className: 'dweb-overlay' },
                h(
                  'div',
                  { className: 'dweb-card', role: 'alert' },
                  h('div', { className: 'dweb-cardIcon' }, '\u26a0'),
                  h('h2', { className: 'dweb-cardTitle' }, t('unsupported.title')),
                  h('p', { className: 'dweb-cardText' }, t('unsupported.hint')),
                  h(
                    'div',
                    { className: 'dweb-cardActions' },
                    h(
                      'button',
                      { type: 'button', className: 'dweb-primary', onClick: openExternal },
                      t('action.external'),
                    ),
                    h(
                      'button',
                      { type: 'button', className: 'dweb-secondary', onClick: backToDsh },
                      t('action.back'),
                    ),
                  ),
                ),
              ),
            showError &&
              h(
                'div',
                { className: 'dweb-overlay' },
                h(
                  'div',
                  { className: 'dweb-card', role: 'alert' },
                  h('div', { className: 'dweb-cardIcon' }, '\u26a0'),
                  h('h2', { className: 'dweb-cardTitle' }, t('error.title')),
                  h('p', { className: 'dweb-cardText' }, errorMessage),
                  h(
                    'div',
                    { className: 'dweb-cardActions' },
                    h(
                      'button',
                      { type: 'button', className: 'dweb-primary', onClick: reload },
                      t('action.retry'),
                    ),
                    h(
                      'button',
                      { type: 'button', className: 'dweb-secondary', onClick: openExternal },
                      t('action.external'),
                    ),
                    h(
                      'button',
                      { type: 'button', className: 'dweb-secondary', onClick: backToDsh },
                      t('action.back'),
                    ),
                  ),
                ),
              ),
          ),
          menuOpen &&
            h(
              'div',
              {
                className: 'dweb-menu',
                ref: menuRef,
                role: 'dialog',
                'aria-label': t('settings.title'),
              },
              h('h3', { className: 'dweb-menuTitle' }, t('settings.title')),
              settingRow('remember', t('settings.remember'), t('settings.rememberHint')),
              settingRow('restoreLast', t('settings.restoreLast'), t('settings.restoreLastHint')),
              settingRow('compatUA', t('settings.compatUA'), t('settings.compatUAHint')),
              h('div', { className: 'dweb-menuSep' }),
              h(
                'button',
                { type: 'button', className: 'dweb-menuAction', onClick: clearLocalLogin },
                t('settings.clear'),
              ),
              h('div', { className: 'dweb-menuNote' }, t('settings.clearHint')),
              h('div', { className: 'dweb-menuNote' }, t('settings.privacy')),
            ),
          toast && h('div', { className: 'dweb-toast', role: 'status' }, toast),
        );
      }

      ctx.slots.inject('main', () =>
        ctx.slots.register(
          {
            name: 'main',
            key: PANEL_ID,
            locale: NS,
          },
          DeepSeekPage,
        ),
      );

      ctx.slots.inject('sidebar.panellist', () =>
        ctx.slots.register(
          {
            name: 'sidebar.panellist',
            id: PANEL_ID,
            order: 25,
            locale: NS,
            label: () => t('panel.label'),
          },
          DeepSeekIcon,
        ),
      );

      ctx.inject(['shortcuts'], (scope) => {
        scope.effect(
          () =>
            scope.shortcuts.register({
              id: 'deepseek-web.open',
              label: () => t('shortcut.open'),
              aliases: ['deepseek', 'web chat', 'DeepSeek 网页'],
              defaults: {
                'desktop:windows': { code: 'KeyD', modifiers: ['primary', 'shift'] },
                'desktop:macos': { code: 'KeyD', modifiers: ['primary', 'shift'] },
                'desktop:linux': { code: 'KeyD', modifiers: ['primary', 'shift'] },
                'web:windows': { code: 'KeyD', modifiers: ['primary', 'shift'] },
                'web:macos': { code: 'KeyD', modifiers: ['primary', 'shift'] },
                'web:linux': { code: 'KeyD', modifiers: ['primary', 'shift'] },
              },
              regions: ['page', 'editable', 'terminal'],
              modals: [],
              resolve: () => ({
                status: 'handled',
                run: () => {
                  try {
                    const panel = ctx.layout.panelInfo
                      ? ctx.layout.panelInfo.getSnapshot().activePanelId
                      : null;
                    ctx.layout.selectPanel(panel === PANEL_ID ? null : PANEL_ID);
                  } catch {
                    // panel may not be registered yet
                  }
                },
              }),
            }),
          'deepseek-web: shortcut',
        );
      });
    }

    return { inject, apply };
  },
});
