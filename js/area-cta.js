// JetWash — area-page enquiry tracking enrichment
// Scoped STRICTLY to /areas/<slug> pages.
//
// Why this exists:
//   Area pages already ship a prominent, above-the-fold enquiry path — a hero
//   with Call + "Get a quote" buttons and a "Free <Area> quote in 30 seconds"
//   form strip directly under the hero. They do NOT, however, give analytics
//   enough context: the global phone_click handler (js/posthog.js) fires on
//   every tel: link but tags every tap as a generic location:"inline" with no
//   area attached. PostHog therefore can't tell which area page or which part
//   of the page drove a phone tap — exactly the signal we need for local-SEO
//   conversion analysis (Crawley organic produced real phone taps).
//
// What this does (no CTA injection — the CTAs are already strong):
//   1. Tags each tel: link's nearest section with data-cta-location, so the
//      existing global phone_click handler reports a meaningful location
//      (hero / quote-strip / services / sticky-bar / header / body).
//   2. Registers area + postcode_area as PostHog super-properties, so EVERY
//      event fired on the page (phone_click, cta_click, form events, etc.)
//      carries the area context — without touching the shared handler.
//
// Fail-silent and consent-gated: it only registers super-properties once
// PostHog is actually initialised (which only happens after consent:granted),
// and it never throws. Idempotent — safe if the script loads twice.

(function () {
  'use strict';

  // ---- Scope guard: only run on /areas/<slug> (not the /areas index) ----
  var path = (window.location.pathname || '').replace(/\/+$/, '') || '/';
  var areaMatch = path.match(/^\/areas\/([^\/]+)$/);
  if (!areaMatch) return;
  var area = areaMatch[1];

  // Keep in sync with AREA_POSTCODES in js/posthog.js.
  var AREA_POSTCODES = {
    'redhill': 'RH1', 'reigate': 'RH2', 'horley': 'RH6', 'dorking': 'RH4', 'banstead': 'SM7',
    'crawley': 'RH10', 'epsom': 'KT17', 'caterham': 'CR3', 'oxted': 'RH8', 'leatherhead': 'KT22',
    'merstham': 'RH1', 'earlswood': 'RH1', 'salfords': 'RH1', 'nutfield': 'RH1', 'chipstead': 'CR5',
    'godstone': 'RH9', 'betchworth': 'RH3'
  };
  var postcodeArea = AREA_POSTCODES[area] || null;

  // ---- 1. Tag tel: links with a meaningful data-cta-location ----
  // The global phone_click handler reads the nearest [data-cta-location]
  // ancestor. We set it on the tel: anchor itself so the value is precise and
  // we don't disturb the shared markup.
  function locationForTelLink(anchor) {
    if (anchor.closest('.sticky-cta')) return 'sticky_bar';
    if (anchor.closest('.site-header')) return 'header';
    if (anchor.closest('.hero')) return 'hero';
    if (anchor.closest('.quote-strip')) return 'quote_strip';
    if (anchor.closest('.cta-banner')) return 'cta_banner';
    if (anchor.closest('aside')) return 'sidebar';
    if (anchor.closest('.services-grid__callout')) return 'services_callout';
    if (anchor.closest('.prose')) return 'body';
    return 'inline';
  }

  function tagTelLinks() {
    var links = document.querySelectorAll('a[href^="tel:"]');
    Array.prototype.forEach.call(links, function (a) {
      if (a.hasAttribute('data-cta-location')) return; // respect any explicit value
      a.setAttribute('data-cta-location', locationForTelLink(a));
    });
  }

  // ---- 2. Register area context as PostHog super-properties ----
  // register() merges these into the properties of every subsequent capture,
  // including the global phone_click. Only meaningful once PostHog has loaded,
  // which only happens after consent — so we attempt now and again on consent.
  var registered = false;
  function registerAreaContext() {
    if (registered) return;
    try {
      if (window.posthog && window.posthog.__SV && typeof window.posthog.register === 'function') {
        window.posthog.register({ area: area, postcode_area: postcodeArea });
        registered = true;
      }
    } catch (e) { /* fail silent */ }
  }

  function init() {
    try { tagTelLinks(); } catch (e) { /* fail silent */ }
    registerAreaContext();
    // PostHog may not be initialised yet (consent not granted). Re-try on consent.
    if (!registered) {
      window.addEventListener('consent:granted', function () {
        // posthog.init runs synchronously inside the same handler chain; defer.
        setTimeout(registerAreaContext, 0);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
