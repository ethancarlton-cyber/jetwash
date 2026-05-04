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
