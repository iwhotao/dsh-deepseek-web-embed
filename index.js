/**
 * Host half of the deepseek-web-embed bundle.
 *
 * The whole feature is presentation: a browser tab that hosts chat.deepseek.com
 * inside the Electron renderer. The host owns no state, no credentials and no
 * network transport, so this half intentionally only satisfies the bundle
 * contract.
 */
export function apply() {}
