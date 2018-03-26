/**
 * @see {@link https://developer.chrome.com/extensions/manifest}
 */
module.exports = {
  name: 'Knoman',
  description: 'Knowledge manager chrome extension',
  author: 'lorenzai knoman<lorenzai.knoman@gmail.com>',
  version: '1.0.0',
  manifest_version: 2,
  icons: {
    '16': 'icons/icon-16.png',
    '128': 'icons/icon-128.png'
  },
  /**
   * @see {@link https://developer.chrome.com/extensions/declare_permissions}
   */
  permissions: [
    'activeTab',
    'tabs',
    'background',
    'unlimitedStorage',
    'storage',
    'pageCapture',
    'tabCapture',
    'webNavigation',
    'webRequest',
    'webRequestBlocking',
    'https://*/*',
    'http://*/*'
  ],
  browser_action: {
    default_icon: {
      '19': 'icons/icon-19.png',
      '38': 'icons/icon-38.png'
    },
    default_title: 'Knoman',
    default_popup: 'pages/popup.html'
  },
  background: {
    persistent: true,
    page: 'pages/background.html'
  },
  options_page: 'pages/options.html',
  content_scripts: [{
    js: [
      'js/manifest.js',
      'js/vendor.js',
      'js/content.js'
    ],
    run_at: 'document_start',
    matches: ['<all_urls>'],
    all_frames: false
  }],
  content_security_policy: "script-src 'self'; object-src 'self'",
  web_accessible_resources: [
    'js/content.js'
  ]
}
