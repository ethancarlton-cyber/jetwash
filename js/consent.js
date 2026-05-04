// JetWash — Cookie consent banner & state machine
// Public API: window.JWConsent
// Fires window events: "consent:granted" | "consent:denied"

(function() {
  'use strict';

  var STORAGE_KEY = 'jw_consent';
  var TIMESTAMP_KEY = 'jw_consent_at';
  var REPROMPT_MS = 365 * 24 * 60 * 60 * 1000; // 12 months
  var listeners = [];

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, val); return true; } catch (e) { return false; }
  }

  function status() {
    var stored = safeGet(STORAGE_KEY);
    if (stored !== 'accepted' && stored !== 'denied') return 'unset';
    var ts = parseInt(safeGet(TIMESTAMP_KEY) || '0', 10);
    if (!ts || Date.now() - ts > REPROMPT_MS) return 'unset';
    return stored;
  }

  function fire(state) {
    var name = state === 'accepted' ? 'consent:granted' : 'consent:denied';
    try { window.dispatchEvent(new CustomEvent(name)); } catch (e) {}
    listeners.forEach(function(fn) { try { fn(state); } catch (e) {} });
  }

  function persist(state) {
    safeSet(STORAGE_KEY, state);
    safeSet(TIMESTAMP_KEY, String(Date.now()));
  }

  function accept() { persist('accepted'); hideBanner(); fire('accepted'); }
  function deny() { persist('denied'); hideBanner(); fire('denied'); }

  function escHandler(e) {
    if (e.key === 'Escape') { deny(); }
  }

  function hideBanner() {
    var banner = document.getElementById('jw-consent-banner');
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    document.removeEventListener('keydown', escHandler);
  }

  function showBanner() {
    if (document.getElementById('jw-consent-banner')) return;
    if (!document.body) {
      document.addEventListener('DOMContentLoaded', showBanner);
      return;
    }
    var banner = document.createElement('div');
    banner.id = 'jw-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = [
      '<div class="jw-consent-text">',
      'We use cookies and analytics to understand how visitors use this site so we can make it better. ',
      'No data is sold or shared with advertisers. ',
      '<a href="/privacy">Privacy policy</a>.',
      '</div>',
      '<div class="jw-consent-buttons">',
      '<button type="button" id="jw-consent-deny" class="jw-consent-btn jw-consent-deny">Decline</button>',
      '<button type="button" id="jw-consent-accept" class="jw-consent-btn jw-consent-accept">Accept</button>',
      '</div>'
    ].join('');
    document.body.appendChild(banner);
    document.getElementById('jw-consent-accept').addEventListener('click', accept);
    document.getElementById('jw-consent-deny').addEventListener('click', deny);
    document.addEventListener('keydown', escHandler);
    setTimeout(function() {
      var btn = document.getElementById('jw-consent-accept');
      if (btn) btn.focus();
    }, 100);
  }

  function injectStyles() {
    if (document.getElementById('jw-consent-styles')) return;
    var s = document.createElement('style');
    s.id = 'jw-consent-styles';
    s.textContent = [
      '#jw-consent-banner{position:fixed;bottom:0;left:0;right:0;background:#1D3557;color:#fff;padding:1rem 1.25rem;z-index:9999;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;font-family:Inter,system-ui,sans-serif;font-size:.95rem;line-height:1.4;box-shadow:0 -4px 16px rgba(0,0,0,.2)}',
      '#jw-consent-banner .jw-consent-text{flex:1 1 320px;min-width:280px}',
      '#jw-consent-banner a{color:#90CDF4;text-decoration:underline}',
      '#jw-consent-banner .jw-consent-buttons{display:flex;gap:.5rem}',
      '#jw-consent-banner .jw-consent-btn{font-family:inherit;font-size:.95rem;padding:.6rem 1.2rem;border-radius:9999px;cursor:pointer;font-weight:600;border:none;transition:transform .1s ease,opacity .15s ease}',
      '#jw-consent-banner .jw-consent-btn:hover{transform:translateY(-1px)}',
      '#jw-consent-banner .jw-consent-accept{background:#2196F3;color:#fff}',
      '#jw-consent-banner .jw-consent-deny{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4)}',
      '#jw-consent-banner .jw-consent-btn:focus{outline:2px solid #fff;outline-offset:2px}',
      '@media (max-width:480px){#jw-consent-banner{flex-direction:column;align-items:stretch;text-align:center}#jw-consent-banner .jw-consent-buttons{justify-content:center}}'
    ].join('');
    if (document.head) document.head.appendChild(s);
    else document.addEventListener('DOMContentLoaded', function() { document.head.appendChild(s); });
  }

  function init() {
    injectStyles();
    var current = status();
    if (current === 'unset') {
      showBanner();
    } else if (current === 'accepted') {
      setTimeout(function() { fire('accepted'); }, 0);
    }
  }

  window.JWConsent = {
    status: status,
    accept: accept,
    deny: deny,
    onChange: function(fn) { if (typeof fn === 'function') listeners.push(fn); },
    showBanner: showBanner,
  };

  init();
})();
