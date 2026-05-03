# PostHog Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace GA4 with PostHog across all 80 HTML pages of `samedayjetwash.com`, gated by a UK GDPR-compliant cookie banner, with full autocapture + named events + session replay.

**Architecture:** Two new vanilla-JS modules (`js/consent.js`, `js/posthog.js`). PostHog snippet is loaded dynamically only after the user accepts the cookie banner. All form events hooked into the existing `js/form.js`. Old `js/analytics.js` is deleted. CSP headers in `vercel.json` updated to allow PostHog domains. Single deploy; manual verification on Vercel preview branch before promoting to production.

**Tech Stack:** Vanilla JavaScript (no build, no npm runtime deps), Vercel static hosting, PostHog EU Cloud (`eu.i.posthog.com`).

**Spec:** `docs/specs/2026-05-03-posthog-analytics-design.md`

---

## Working Branch

Create a feature branch before starting any task:

```bash
git -C /c/Users/devel/Desktop/Coding/Ethan/Projects/jetwash checkout -b feat/posthog-analytics
```

---

## Task 1: Update `vercel.json` CSP & connect-src headers

**Files:**
- Modify: `Projects/jetwash/vercel.json`

- [ ] **Step 1.1: Add Content-Security-Policy header to root path**

Find this block in `vercel.json`:
```json
{
  "source": "/(.*)",
  "headers": [
    { "key": "X-Content-Type-Options", "value": "nosniff" },
    { "key": "X-Frame-Options", "value": "DENY" },
    { "key": "X-XSS-Protection", "value": "1; mode=block" }
  ]
}
```

Add a new header after `X-XSS-Protection`:
```json
{
  "key": "Content-Security-Policy",
  "value": "default-src 'self'; connect-src 'self' https://eu.i.posthog.com https://eu-assets.i.posthog.com https://api.web3forms.com; script-src 'self' 'unsafe-inline' https://eu-assets.i.posthog.com; img-src 'self' data: https://eu-assets.i.posthog.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com"
}
```

- [ ] **Step 1.2: Verify JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('Projects/jetwash/vercel.json','utf8')); console.log('valid')"`

Expected: `valid`

- [ ] **Step 1.3: Commit**

```bash
git -C Projects/jetwash add vercel.json
git -C Projects/jetwash commit -m "feat(analytics): add CSP headers for PostHog + Web3Forms"
```

---

## Task 2: Create `js/consent.js` — cookie banner + consent state machine

**Files:**
- Create: `Projects/jetwash/js/consent.js`

- [ ] **Step 2.1: Write the full module**

Create `Projects/jetwash/js/consent.js` with this content verbatim:

```js
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
```

- [ ] **Step 2.2: Smoke-check the file syntax**

Run: `node -e "new Function(require('fs').readFileSync('Projects/jetwash/js/consent.js','utf8')); console.log('parsed ok')"`

Expected: `parsed ok`

- [ ] **Step 2.3: Commit**

```bash
git -C Projects/jetwash add js/consent.js
git -C Projects/jetwash commit -m "feat(analytics): add cookie consent banner module"
```

---

## Task 3: Create `js/posthog.js` — PostHog init + named events + identify

**Files:**
- Create: `Projects/jetwash/js/posthog.js`

- [ ] **Step 3.1: Write the full module**

Create `Projects/jetwash/js/posthog.js` with this content verbatim:

```js
// JetWash — PostHog analytics integration
// Public API: window.JWAnalytics
// Loads and initialises PostHog ONLY after window event "consent:granted"

(function() {
  'use strict';

  var POSTHOG_KEY = 'phc_Ckia5DcgrWeEBkZi7xWDSt8FoDZ4SEnt8D6usPpR9EpT';
  var POSTHOG_HOST = 'https://eu.i.posthog.com';
  var initialised = false;

  // ===== PII scrubbing =====
  var EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  var UK_PHONE_RE = /(?:\+44\s?|0)(?:7\d{3}|1\d{3}|2\d|3\d{2})[\s\d]{6,}\d/g;
  var POSTCODE_RE = /\b([A-Z]{1,2}\d[A-Z\d]?)\s*\d[A-Z]{2}\b/gi;

  function scrubString(s) {
    if (typeof s !== 'string') return s;
    return s
      .replace(EMAIL_RE, '[EMAIL]')
      .replace(UK_PHONE_RE, '[PHONE]')
      .replace(POSTCODE_RE, '$1');
  }
  function scrubObject(o) {
    if (!o || typeof o !== 'object') return o;
    if (Array.isArray(o)) return o.map(scrubObject);
    var out = {};
    Object.keys(o).forEach(function(k) {
      var v = o[k];
      if (typeof v === 'string') out[k] = scrubString(v);
      else if (v && typeof v === 'object') out[k] = scrubObject(v);
      else out[k] = v;
    });
    return out;
  }
  function beforeSend(event) {
    if (!event || !event.properties) return event;
    event.properties = scrubObject(event.properties);
    return event;
  }

  // ===== PostHog snippet (injected on consent only) =====
  function loadPostHogSnippet() {
    if (window.posthog && window.posthog.__SV) return;
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  }

  function initPostHog() {
    if (initialised) return;
    try {
      loadPostHogSnippet();
      window.posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: 'identified_only',
        autocapture: true,
        capture_pageview: true,
        capture_pageleave: true,
        session_recording: {
          maskAllInputs: true,
          maskTextSelector: '[data-private]',
          recordCrossOriginIframes: false
        },
        before_send: beforeSend
      });
      initialised = true;
      attachAutoEvents();
      flushPageTypeEvent();
    } catch (e) {
      try { console.warn('[JWAnalytics] init failed', e); } catch (_) {}
    }
  }

  function safeCapture(event, props) {
    if (!initialised) return;
    try {
      if (window.posthog && window.posthog.capture) {
        window.posthog.capture(event, props || {});
      }
    } catch (e) {
      try { console.warn('[JWAnalytics] capture failed', event, e); } catch (_) {}
    }
  }

  function pageMeta() {
    return {
      page: window.location.pathname,
      page_title: document.title,
      referrer: document.referrer || null
    };
  }

  // ===== Page-type auto-fire =====
  var AREA_POSTCODES = {
    'redhill':'RH1','reigate':'RH2','horley':'RH6','dorking':'RH4','banstead':'SM7',
    'crawley':'RH10','epsom':'KT17','caterham':'CR3','oxted':'RH8','leatherhead':'KT22',
    'merstham':'RH1','earlswood':'RH1','salfords':'RH1','nutfield':'RH1','chipstead':'CR5',
    'godstone':'RH9','betchworth':'RH3'
  };
  function areaToPostcode(slug) { return AREA_POSTCODES[slug] || null; }

  var SERVICE_SLUGS = [
    'driveway-cleaning','patio-cleaning','block-paving-cleaning','decking-cleaning',
    'render-cleaning','roof-cleaning','gutter-cleaning','soft-washing','commercial-jetwashing'
  ];

  function flushPageTypeEvent() {
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    var areaMatch = path.match(/^\/areas\/([^\/]+)$/);
    var guideMatch = path.match(/^\/guides\/([^\/]+)$/);
    if (areaMatch) {
      var area = areaMatch[1];
      safeCapture('area_view', Object.assign(pageMeta(), { area: area, postcode_area: areaToPostcode(area) }));
    } else if (guideMatch) {
      safeCapture('guide_view', Object.assign(pageMeta(), { guide_slug: guideMatch[1] }));
    } else {
      var slug = path.replace(/^\//, '');
      if (SERVICE_SLUGS.indexOf(slug) !== -1) {
        safeCapture('service_view', Object.assign(pageMeta(), { service: slug }));
      }
    }
  }

  // ===== Auto-attached event delegation =====
  var seenScrollMilestones = {};
  function attachAutoEvents() {
    document.addEventListener('click', function(e) {
      if (!e.target || !e.target.closest) return;
      var anchor = e.target.closest('a');
      if (anchor) {
        if (anchor.getAttribute('href') && anchor.getAttribute('href').indexOf('tel:') === 0) {
          var locEl = anchor.closest('[data-cta-location]');
          var location = locEl ? locEl.getAttribute('data-cta-location') : 'inline';
          safeCapture('phone_click', Object.assign(pageMeta(), { location: location }));
          return;
        }
        if (anchor.host && anchor.host !== window.location.host && /^https?:/.test(anchor.protocol || '')) {
          safeCapture('external_link_click', Object.assign(pageMeta(), { destination: anchor.href }));
        }
      }
      var cta = e.target.closest('[data-cta]');
      if (cta) {
        var label = cta.getAttribute('data-cta') || (cta.textContent || '').trim().slice(0, 80);
        var dest = cta.getAttribute('href') || cta.getAttribute('data-cta-destination') || null;
        safeCapture('cta_click', Object.assign(pageMeta(), { cta_label: label, cta_destination: dest }));
      }
    }, true);

    var lastScrollFire = 0;
    window.addEventListener('scroll', function() {
      var now = Date.now();
      if (now - lastScrollFire < 200) return;
      lastScrollFire = now;
      var doc = document.documentElement;
      var scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      var scrolled = (window.scrollY) / scrollable;
      [0.25, 0.5, 0.75, 1].forEach(function(threshold) {
        if (scrolled >= threshold && !seenScrollMilestones[threshold]) {
          seenScrollMilestones[threshold] = true;
          safeCapture('scroll_depth', Object.assign(pageMeta(), { depth: Math.round(threshold * 100) }));
        }
      });
    }, { passive: true });
  }

  // ===== Public API =====
  window.JWAnalytics = {
    trackPhoneClick: function(location) {
      safeCapture('phone_click', Object.assign(pageMeta(), { location: location || 'inline' }));
    },
    trackCTAClick: function(label, destination) {
      safeCapture('cta_click', Object.assign(pageMeta(), { cta_label: label, cta_destination: destination || null }));
    },
    trackQuoteStart: function(field) {
      safeCapture('quote_form_started', Object.assign(pageMeta(), { field: field || null }));
    },
    trackQuoteFieldComplete: function(field) {
      safeCapture('quote_form_field_completed', Object.assign(pageMeta(), { field: field || null }));
    },
    trackQuoteValidationError: function(field, errorType) {
      safeCapture('quote_form_validation_error', Object.assign(pageMeta(), { field: field || null, error_type: errorType || null }));
    },
    trackQuoteSubmit: function(props) {
      safeCapture('quote_form_submitted', Object.assign(pageMeta(), props || {}));
    },
    trackQuoteSubmitError: function(error) {
      safeCapture('quote_form_submit_error', Object.assign(pageMeta(), { error: String(error || '').slice(0, 200) }));
    },
    trackServiceView: function(service) {
      safeCapture('service_view', Object.assign(pageMeta(), { service: service }));
    },
    trackAreaView: function(area, postcodeArea) {
      safeCapture('area_view', Object.assign(pageMeta(), { area: area, postcode_area: postcodeArea || areaToPostcode(area) }));
    },
    trackGuideView: function(slug) {
      safeCapture('guide_view', Object.assign(pageMeta(), { guide_slug: slug }));
    },
    trackCalculatorUse: function(surface, areaM2, condition, extras, price) {
      safeCapture('calculator_used', Object.assign(pageMeta(), {
        surface: surface, area_m2: areaM2, condition: condition,
        extras: Array.isArray(extras) ? extras : [], quoted_price: price
      }));
    },
    identifyLead: function(email, props) {
      if (!initialised) return;
      try {
        if (window.posthog && window.posthog.identify) {
          window.posthog.identify(email, scrubObject(props || {}));
        }
      } catch (e) {
        try { console.warn('[JWAnalytics] identify failed', e); } catch (_) {}
      }
    }
  };

  // ===== Bootstrap =====
  window.addEventListener('consent:granted', initPostHog);
  if (window.JWConsent && window.JWConsent.status() === 'accepted') {
    initPostHog();
  }
})();
```

- [ ] **Step 3.2: Smoke-check the file syntax**

Run: `node -e "new Function(require('fs').readFileSync('Projects/jetwash/js/posthog.js','utf8')); console.log('parsed ok')"`

Expected: `parsed ok`

- [ ] **Step 3.3: Commit**

```bash
git -C Projects/jetwash add js/posthog.js
git -C Projects/jetwash commit -m "feat(analytics): add PostHog integration module"
```

---

## Task 4: Hook tracking into `js/form.js`

**Files:**
- Modify: `Projects/jetwash/js/form.js`

- [ ] **Step 4.1: Add `trackQuoteValidationError` calls in `nextStep()`**

Find this block in `js/form.js` (around line 16-19):
```js
    // Validate service selected
    if (!serviceSelect || !serviceSelect.value) {
        if (serviceError) serviceError.textContent = 'Please select a service';
        valid = false;
    }
```

Replace with:
```js
    // Validate service selected
    if (!serviceSelect || !serviceSelect.value) {
        if (serviceError) serviceError.textContent = 'Please select a service';
        valid = false;
        if (window.JWAnalytics) JWAnalytics.trackQuoteValidationError('service', 'required');
    }
```

Find (around line 22-28):
```js
    // Validate postcode
    if (postcodeInput) {
        var postcodeResult = validatePostcode(postcodeInput.value);
        if (!postcodeResult.valid) {
            if (postcodeError) postcodeError.textContent = postcodeResult.message;
            valid = false;
        }
    }
```

Replace with:
```js
    // Validate postcode
    if (postcodeInput) {
        var postcodeResult = validatePostcode(postcodeInput.value);
        if (!postcodeResult.valid) {
            if (postcodeError) postcodeError.textContent = postcodeResult.message;
            valid = false;
            if (window.JWAnalytics) JWAnalytics.trackQuoteValidationError('postcode', 'invalid_format');
        }
    }
```

- [ ] **Step 4.2: Add `trackQuoteFieldComplete` on postcode blur**

Find this block (around line 100-114):
```js
    // Real-time postcode validation on blur
    if (postcodeInput && postcodeError) {
        postcodeInput.addEventListener('blur', function() {
            if (!this.value.trim()) return;
            var result = validatePostcode(this.value);
            if (!result.valid) {
                postcodeError.textContent = result.message;
                postcodeError.style.color = '#ef4444';
            } else if (result.message) {
                postcodeError.textContent = result.message;
                postcodeError.style.color = '#f59e0b';
            } else {
                postcodeError.textContent = '';
            }
        });
    }
```

Replace with:
```js
    // Real-time postcode validation on blur
    if (postcodeInput && postcodeError) {
        postcodeInput.addEventListener('blur', function() {
            if (!this.value.trim()) return;
            var result = validatePostcode(this.value);
            if (!result.valid) {
                postcodeError.textContent = result.message;
                postcodeError.style.color = '#ef4444';
                if (window.JWAnalytics) JWAnalytics.trackQuoteValidationError('postcode', 'invalid_format');
            } else if (result.message) {
                postcodeError.textContent = result.message;
                postcodeError.style.color = '#f59e0b';
                if (window.JWAnalytics) JWAnalytics.trackQuoteFieldComplete('postcode');
            } else {
                postcodeError.textContent = '';
                if (window.JWAnalytics) JWAnalytics.trackQuoteFieldComplete('postcode');
            }
        });
    }
```

- [ ] **Step 4.3: Add `trackQuoteFieldComplete` on contact blur**

Find this block (around line 116-127):
```js
    // Real-time contact validation on blur
    if (contactInput && contactError) {
        contactInput.addEventListener('blur', function() {
            if (!this.value.trim()) return;
            var result = validateContact(this.value);
            if (!result.valid) {
                contactError.textContent = result.message;
            } else {
                contactError.textContent = '';
            }
        });
    }
```

Replace with:
```js
    // Real-time contact validation on blur
    if (contactInput && contactError) {
        contactInput.addEventListener('blur', function() {
            if (!this.value.trim()) return;
            var result = validateContact(this.value);
            if (!result.valid) {
                contactError.textContent = result.message;
                if (window.JWAnalytics) JWAnalytics.trackQuoteValidationError('contact', 'invalid_format');
            } else {
                contactError.textContent = '';
                if (window.JWAnalytics) JWAnalytics.trackQuoteFieldComplete('contact');
            }
        });
    }
```

- [ ] **Step 4.4: Add `trackQuoteStart` on first form interaction + replace placeholder block**

Find this block (around line 239-243):
```js
    // Track form interactions
    quoteForm.addEventListener('focus', function(e) {
        // Analytics event tracking placeholder
    }, true);
```

Replace with:
```js
    // Track first interaction with the form (fires once per page load)
    var quoteStarted = false;
    function markStarted(field) {
        if (quoteStarted) return;
        quoteStarted = true;
        if (window.JWAnalytics) JWAnalytics.trackQuoteStart(field);
    }
    quoteForm.addEventListener('focus', function(e) {
        var field = e.target && e.target.name ? e.target.name : (e.target && e.target.id ? e.target.id : 'unknown');
        markStarted(field);
    }, true);
    quoteForm.addEventListener('input', function(e) {
        var field = e.target && e.target.name ? e.target.name : (e.target && e.target.id ? e.target.id : 'unknown');
        markStarted(field);
    }, true);
```

- [ ] **Step 4.5: Hook submit success + identify + submit error**

Find this block (around line 215-236):
```js
        fetch(quoteForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if (data.success) {
                quoteForm.style.display = 'none';
                var successDiv = document.getElementById('formSuccess');
                if (successDiv) successDiv.style.display = 'block';
            } else {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                alert('Error: ' + (data.message || 'Form submission failed. Please call us at 01737 652 515 instead.'));
            }
        })
        .catch(function(error) {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            alert('Network error: Could not submit form. Please call us at 01737 652 515 or try again later.');
        });
```

Replace with:
```js
        // Pre-submit: derive analytics-safe properties
        var serviceVal = (formData.get && formData.get('service')) || (document.getElementById('service') || {}).value || '';
        var postcodeVal = (formData.get && formData.get('postcode')) || (postcodeInput ? postcodeInput.value : '');
        var postcodeArea = (postcodeVal || '').toString().trim().toUpperCase().replace(/\s.*$/, '').replace(/[0-9]+$/, '');
        var nameVal = ((formData.get && formData.get('name')) || (nameInput ? nameInput.value : '') || '').toString().trim();
        var leadEmail = contactResult.type === 'email' ? contactValue : null;
        var leadDial = null;
        if (contactResult.type === 'phone') {
            leadDial = /^\+44/.test(contactValue) ? '+44' : (/^0/.test(contactValue) ? '+44' : null);
        }

        fetch(quoteForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if (data.success) {
                if (window.JWAnalytics) {
                    JWAnalytics.trackQuoteSubmit({
                        service: serviceVal,
                        postcode_area: postcodeArea || null,
                        contact_type: contactResult.type || null
                    });
                    if (leadEmail) {
                        JWAnalytics.identifyLead(leadEmail, {
                            name: nameVal || null,
                            postcode_area: postcodeArea || null,
                            service: serviceVal || null,
                            phone_dial_code: leadDial
                        });
                    }
                }
                quoteForm.style.display = 'none';
                var successDiv = document.getElementById('formSuccess');
                if (successDiv) successDiv.style.display = 'block';
            } else {
                if (window.JWAnalytics) JWAnalytics.trackQuoteSubmitError(data.message || 'unknown');
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                alert('Error: ' + (data.message || 'Form submission failed. Please call us at 01737 652 515 instead.'));
            }
        })
        .catch(function(error) {
            if (window.JWAnalytics) JWAnalytics.trackQuoteSubmitError(error && error.message ? error.message : 'network_error');
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            alert('Network error: Could not submit form. Please call us at 01737 652 515 or try again later.');
        });
```

- [ ] **Step 4.6: Smoke-check the file syntax**

Run: `node -e "new Function(require('fs').readFileSync('Projects/jetwash/js/form.js','utf8')); console.log('parsed ok')"`

Expected: `parsed ok`

- [ ] **Step 4.7: Commit**

```bash
git -C Projects/jetwash add js/form.js
git -C Projects/jetwash commit -m "feat(analytics): hook quote form events into JWAnalytics"
```

---

## Task 5: Sweep all HTML pages — replace `analytics.js` with new scripts

**Files:**
- Modify: ~80 HTML files across `Projects/jetwash/`, `Projects/jetwash/areas/`, `Projects/jetwash/guides/`

The current `<script>` reference is **`<script src="js/analytics.js" defer></script>`** (relative path, no leading slash). It must be replaced with two new script tags.

- [ ] **Step 5.1: Write a one-shot sweep script**

Create `Projects/jetwash/scripts/swap-analytics-scripts.mjs` with:

```js
// One-shot sweep: replace the legacy analytics.js include with consent.js + posthog.js
// Run from Projects/jetwash/: node scripts/swap-analytics-scripts.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'node:fs';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const OLD = '<script src="js/analytics.js" defer></script>';
const NEW = '<script src="js/consent.js" defer></script>\n    <script src="js/posthog.js" defer></script>';

// Collect HTML files via git ls-files to avoid node_modules + ignored dirs
const files = execSync('git ls-files "*.html"', { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean);

let changed = 0;
let skipped = 0;
for (const rel of files) {
  const path = `${ROOT}/${rel}`;
  const src = readFileSync(path, 'utf8');
  if (!src.includes(OLD)) { skipped++; continue; }
  const out = src.replaceAll(OLD, NEW);
  writeFileSync(path, out);
  changed++;
  console.log(`updated: ${rel}`);
}
console.log(`\nchanged=${changed}  skipped=${skipped}  total=${files.length}`);
```

- [ ] **Step 5.2: Run the sweep**

```bash
cd Projects/jetwash && node scripts/swap-analytics-scripts.mjs
```

Expected output: `changed=80  skipped=...  total=...` (give or take — should be ~80 changed).

- [ ] **Step 5.3: Verify no `analytics.js` references remain**

```bash
cd Projects/jetwash && git grep "analytics.js" -- "*.html"
```

Expected: empty output (no matches).

- [ ] **Step 5.4: Verify both new scripts present in a sample of pages**

```bash
cd Projects/jetwash && git grep -l "consent.js" -- "*.html" | wc -l && git grep -l "posthog.js" -- "*.html" | wc -l
```

Expected: same count for both lines (~80).

- [ ] **Step 5.5: Spot-check the homepage**

```bash
cd Projects/jetwash && grep -E "consent\.js|posthog\.js|analytics\.js" index.html
```

Expected:
```
    <script src="js/consent.js" defer></script>
    <script src="js/posthog.js" defer></script>
```

- [ ] **Step 5.6: Commit**

```bash
git -C Projects/jetwash add -A "*.html" scripts/swap-analytics-scripts.mjs
git -C Projects/jetwash commit -m "feat(analytics): swap GA4 analytics.js for PostHog consent+posthog scripts across all pages"
```

---

## Task 6: Update `privacy.html` with analytics + re-consent section

**Files:**
- Modify: `Projects/jetwash/privacy.html`

- [ ] **Step 6.1: Find the existing privacy content area**

Read `privacy.html` and locate either:
- An existing "Cookies" or "Analytics" section heading, OR
- The `</main>` closing tag (we'll insert before it if no analytics section exists).

```bash
grep -nE "Cookies|Analytics|</main>" Projects/jetwash/privacy.html | head
```

- [ ] **Step 6.2: Insert/replace the analytics paragraph**

If a Cookies/Analytics section exists, **replace its body** with this paragraph (preserve the existing heading tag — match the page's heading level, e.g. `<h2>` or `<h3>`):

```html
<p>We use PostHog (hosted in the EU) to understand how visitors use this site so we can improve it. PostHog stores a small cookie in your browser, captures clicks, page views, and a session replay where every form input is masked — your typed name, phone number, postcode and email are never recorded. We do not sell or share this data with advertisers.</p>
<p>You can decline this when you first visit. To change your choice at any time, <a href="#" onclick="if(window.JWConsent){JWConsent.showBanner();}return false;">click here to re-open the cookie banner</a>.</p>
<p>PostHog's own privacy policy: <a href="https://posthog.com/privacy" target="_blank" rel="noopener">posthog.com/privacy</a>.</p>
```

If no Cookies/Analytics section exists, insert the following block immediately before `</main>`:

```html
<section>
  <h2>Cookies & Analytics</h2>
  <p>We use PostHog (hosted in the EU) to understand how visitors use this site so we can improve it. PostHog stores a small cookie in your browser, captures clicks, page views, and a session replay where every form input is masked — your typed name, phone number, postcode and email are never recorded. We do not sell or share this data with advertisers.</p>
  <p>You can decline this when you first visit. To change your choice at any time, <a href="#" onclick="if(window.JWConsent){JWConsent.showBanner();}return false;">click here to re-open the cookie banner</a>.</p>
  <p>PostHog's own privacy policy: <a href="https://posthog.com/privacy" target="_blank" rel="noopener">posthog.com/privacy</a>.</p>
</section>
```

- [ ] **Step 6.3: Verify the page still parses as HTML**

```bash
node -e "const h=require('fs').readFileSync('Projects/jetwash/privacy.html','utf8'); console.log('len='+h.length, h.includes('PostHog')?'posthog-ok':'MISSING')"
```

Expected: `len=<some number> posthog-ok`

- [ ] **Step 6.4: Commit**

```bash
git -C Projects/jetwash add privacy.html
git -C Projects/jetwash commit -m "docs(privacy): add PostHog analytics disclosure + re-consent link"
```

---

## Task 7: Delete `js/analytics.js`

**Files:**
- Delete: `Projects/jetwash/js/analytics.js`

- [ ] **Step 7.1: Confirm no remaining references in the codebase**

```bash
cd Projects/jetwash && git grep "analytics.js" || echo "no references"
```

Expected: `no references`

- [ ] **Step 7.2: Delete the file**

```bash
git -C Projects/jetwash rm js/analytics.js
```

- [ ] **Step 7.3: Commit**

```bash
git -C Projects/jetwash commit -m "chore(analytics): remove deprecated GA4 analytics.js"
```

---

## Task 8: Verify on Vercel preview deploy

**Files:** none (manual browser-based verification)

- [ ] **Step 8.1: Push the feature branch**

```bash
git -C Projects/jetwash push -u origin feat/posthog-analytics
```

Vercel will auto-build a preview URL — find it in the Vercel dashboard or the GitHub PR check.

- [ ] **Step 8.2: Verify cookie banner appears on first visit (incognito)**

Open the preview URL in **incognito/private** mode in Chrome. Check:
- [ ] Banner appears at the bottom of the page
- [ ] Banner has "Accept" and "Decline" buttons + "Privacy policy" link
- [ ] Press Tab — focus moves between buttons
- [ ] Press Esc — banner closes (treated as Decline)
- [ ] Open `localStorage` (DevTools → Application → Local Storage): `jw_consent=denied`, `jw_consent_at=<timestamp>`
- [ ] Repeat in fresh incognito; click **Accept**
- [ ] `jw_consent=accepted` in localStorage

- [ ] **Step 8.3: Verify NO requests fire when declined**

Fresh incognito → Open DevTools → Network tab → filter by `posthog`. Click **Decline**. Click around the page (homepage, service link, area link).

Expected: **zero requests** to `eu.i.posthog.com` or `eu-assets.i.posthog.com`.

- [ ] **Step 8.4: Verify events fire when accepted**

Fresh incognito → Network tab → filter `posthog`. Click **Accept**. Then:
- Watch homepage load → at least one request to `eu-assets.i.posthog.com/static/array.js` and one POST to `eu.i.posthog.com/e/` (page view)
- Click a service card → see another POST (autocapture click)
- Tap a `tel:` link (or a CTA) → see another POST

Open PostHog dashboard → Activity → **Live events**. Confirm `$pageview`, `$autocapture`, `phone_click` (or `cta_click`) are arriving in real time, with project ID `171650`.

- [ ] **Step 8.5: Verify form events on `/quote`**

Navigate to the preview's `/quote` page (still consented). Fill the form. Confirm in PostHog Live events:
- [ ] `quote_form_started` fires on first input
- [ ] `quote_form_field_completed` fires on postcode blur with valid value
- [ ] `quote_form_validation_error` fires when you intentionally submit an empty service field
- [ ] `quote_form_submitted` fires on successful submit
- [ ] A new "person" appears in PostHog Persons with the email you entered (or a hashed identifier if email)

- [ ] **Step 8.6: Verify session replay masks inputs**

PostHog → Session replay → open the most recent session you generated. Play it back. Confirm:
- [ ] Mouse movement, scroll, clicks are visible
- [ ] When the playback hits the form, **typed input values appear masked** (rendered as `*****` or hidden)

- [ ] **Step 8.7: Verify CSP doesn't break anything**

Open DevTools → Console on every page type (homepage, /driveway-cleaning, /areas/redhill, /guides/<any>, /quote, /privacy, /calculator). Expected: **no CSP violation errors**, no 4xx/5xx network errors apart from expected ones.

- [ ] **Step 8.8: Verify privacy page re-consent link works**

Visit `/privacy` with consent already accepted. Click the "click here to re-open the cookie banner" link. Banner re-appears. Click Decline. Reload page → no PostHog requests fire on subsequent navigation.

- [ ] **Step 8.9: If any verification fails**

Fix on the feature branch, push, re-verify. Don't proceed to Task 9 until all items in Steps 8.2–8.8 pass.

---

## Task 9: Promote to production

**Files:** none

- [ ] **Step 9.1: Open the PR**

```bash
gh pr create --base main --head feat/posthog-analytics --title "feat: replace GA4 with PostHog (consent-gated)" --body "Replaces Google Analytics 4 with PostHog (EU Cloud) across all pages. Cookie banner gates all tracking. Session replay enabled with full input masking. Spec: docs/specs/2026-05-03-posthog-analytics-design.md. Plan: docs/specs/2026-05-03-posthog-analytics-plan.md."
```

- [ ] **Step 9.2: Merge after Vercel preview check passes**

In the GitHub PR UI, confirm the Vercel "Visit Preview" check is green, then **Squash and merge** to `main`.

- [ ] **Step 9.3: Verify on production**

Wait ~2 minutes for Vercel to auto-deploy. Then in incognito on `https://samedayjetwash.com`:
- Banner appears
- Accept → events visible in PostHog Live
- localStorage `jw_consent=accepted`

- [ ] **Step 9.4: Pull latest main locally**

```bash
git -C Projects/jetwash checkout main && git -C Projects/jetwash pull
```

---

## Task 10: Update project docs to reflect the swap

**Files:**
- Modify: `Projects/jetwash/CLAUDE.md`
- Optional: append a TIMELINE entry if `docs/TIMELINE.md` exists

- [ ] **Step 10.1: Update CLAUDE.md "Analytics & Monitoring" section**

In `Projects/jetwash/CLAUDE.md`, find the section:

```
### Analytics & Monitoring (FREE)
- **Google Analytics**: FREE forever, unlimited pageviews
- **Google Search Console**: FREE, essential for SEO (CONFIGURED)
- **Bing Webmaster Tools**: FREE
```

Replace with:

```
### Analytics & Monitoring (FREE)
- **PostHog (EU Cloud)**: FREE 1M events/mo + 5K session replays/mo. Project ID 171650. Cookie banner gates all tracking. Spec: docs/specs/2026-05-03-posthog-analytics-design.md
- **Google Search Console**: FREE, essential for SEO (CONFIGURED)
- **Bing Webmaster Tools**: FREE
```

- [ ] **Step 10.2: Search for any other GA4 references in CLAUDE.md / docs**

```bash
cd Projects/jetwash && git grep -nE "Google Analytics|GA4|gtag|G-YSH4MVSPDJ" -- "*.md" "CLAUDE.md"
```

For each hit, decide: leave (historical context) or update (current-state claim). Update any that present GA4 as the **current** analytics tool.

- [ ] **Step 10.3: Commit**

```bash
git -C Projects/jetwash add CLAUDE.md
git -C Projects/jetwash commit -m "docs: replace GA4 references with PostHog in CLAUDE.md"
git -C Projects/jetwash push
```

- [ ] **Step 10.4: Sunset the GA4 property (optional, in Google Analytics UI — manual)**

In `analytics.google.com`, archive or delete the `G-YSH4MVSPDJ` property after a 7-14 day window of confirmed PostHog data flow. Not done in code; track separately if desired.

---

## Done criteria

- [ ] Cookie banner gates all tracking on every page
- [ ] All 80 HTML pages load `consent.js` + `posthog.js` (and not `analytics.js`)
- [ ] PostHog Live Events shows incoming traffic in project 171650
- [ ] Quote form on `/quote` produces `quote_form_submitted` events with `service` + `postcode_area`
- [ ] Session replay masks form inputs
- [ ] CSP headers in `vercel.json` allow PostHog domains and don't break the page
- [ ] `js/analytics.js` deleted
- [ ] CLAUDE.md updated to reflect PostHog as current analytics tool

---

## Self-review notes

- **Spec coverage:** Tasks 2-3 cover Components section. Task 4 covers form integration. Task 5 covers HTML sweep. Task 6 covers privacy disclosure + re-consent. Task 1 covers CSP. Task 8 covers Phase 2 verification checklist from spec. Task 9 covers Phase 3 promote. Task 10 covers Phase 4 cleanup.
- **Placeholder scan:** clean — every step has either complete code or an exact command.
- **Type consistency:** `JWAnalytics` and `JWConsent` namespaces used identically in spec, posthog.js, consent.js, form.js. Method names match.
- **Risks worth flagging:**
  - Task 5 sweep depends on the exact string `<script src="js/analytics.js" defer></script>`. If any page uses different whitespace or an absolute path (`/js/`), the sweep skips it. Step 5.3 (`git grep "analytics.js"`) catches this.
  - Task 6 (privacy.html edit) is the only step requiring human judgement (find existing section vs. insert new). Acceptable — a single page, easy to eyeball.
  - PostHog's `before_send` config option requires posthog-js v1.187+ (2024-11). The official snippet auto-fetches the latest from `eu-assets.i.posthog.com/static/array.js`, so this is satisfied. If PostHog changes the option name in the future, replace `before_send` with the docs-current name.
