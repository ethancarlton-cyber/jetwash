// JetWash — guide-article conversion CTAs (2026-06-18)
// PostHog showed /guides/* pages are the #1 entry point (130s+ dwell) but barely
// convert: on mobile the sticky sidebar quote-card collapses to the very bottom,
// so a reader scrolling the long article hits NO inline enquiry prompt until the
// end. This module injects two native-looking CTAs INTO the article flow:
//   1. a mid-article block (after an early <h2>, or the first table)
//   2. an end-of-article block (appended to .prose, before the FAQ/related blocks)
// Scoped to guide pages only, idempotent (no double-injection), no layout-shift jank.

(function () {
  'use strict';

  var PHONE = '+441737652515';
  var PHONE_DISPLAY = '01737 652 515';
  var QUOTE_URL = '/quote';

  function isGuidePage() {
    return /^\/guides\/[^\/]+/.test(window.location.pathname);
  }

  // Pull a short, human surface label out of the H1 so the end CTA can say
  // "Get an exact price for your block paving". Falls back gracefully.
  function surfaceLabel() {
    var h1 = document.querySelector('.hero h1, h1');
    var raw = h1 ? (h1.textContent || '') : '';
    raw = raw.replace(/—.*$/, '')        // drop everything after an em-dash
            .replace(/[–—:].*$/, '') // or en-dash / colon
            .trim();
    // Strip intent words, years and stray digits to leave the surface noun phrase.
    raw = raw.replace(/\b(cost|costs|prices?|pricing|guide|uk|cleaning|clean|removal|explained|comparison|review|reviews)\b/gi, ' ')
             .replace(/\b(19|20)\d{2}\b/g, ' ')
             .replace(/^\s*best\s+/i, ' ') // "best pressure washers" -> "pressure washers"
             .replace(/\s+/g, ' ')
             .trim();
    if (!raw || raw.length < 3 || raw.length > 40) return 'surface';
    return raw.toLowerCase();
  }

  function track(location) {
    try {
      if (window.posthog && window.posthog.capture) {
        window.posthog.capture('guide_cta_click', {
          cta_location: location,
          page: window.location.pathname
        });
      }
    } catch (e) { /* analytics must never break the page */ }
  }

  // Build a CTA element. `variant` is 'mid' or 'end'.
  function buildCta(variant, surface) {
    var wrap = document.createElement('aside');
    wrap.className = 'guide-cta guide-cta--' + variant;
    wrap.setAttribute('data-guide-cta', variant);
    wrap.setAttribute('aria-label', 'Get a free quote');

    var heading, blurb;
    if (variant === 'end') {
      heading = 'Get an exact price for your ' + surface;
      blurb = 'Send a couple of details and Patrick calls you back the same day with a real, no-obligation price. No site visit needed.';
    } else {
      heading = 'Want a price for your own job?';
      blurb = 'Skip the guesswork &mdash; get a free, no-obligation quote with a same-day callback.';
    }

    wrap.innerHTML =
      '<div class="guide-cta__inner">' +
        '<h2 class="guide-cta__title">' + heading + '</h2>' +
        '<p class="guide-cta__sub">' + blurb + '</p>' +
        '<div class="guide-cta__actions">' +
          '<a href="' + QUOTE_URL + '" class="btn btn--accent btn--lg guide-cta__quote">Get a free quote</a>' +
          '<a href="tel:' + PHONE + '" class="btn btn--ghost-light btn--lg guide-cta__call">Call ' + PHONE_DISPLAY + '</a>' +
        '</div>' +
      '</div>';

    var quoteBtn = wrap.querySelector('.guide-cta__quote');
    var callBtn = wrap.querySelector('.guide-cta__call');
    if (quoteBtn) quoteBtn.addEventListener('click', function () { track(variant + '_quote'); });
    if (callBtn) callBtn.addEventListener('click', function () { track(variant + '_call'); });
    return wrap;
  }

  // Choose a robust insertion point for the mid CTA: after the section that
  // follows the first <h2> (so it lands after the first real chunk of content),
  // or after the first <table> if one comes sooner. Never as the very first or
  // very last child.
  function insertMid(prose, surface) {
    var children = Array.prototype.slice.call(prose.children);
    var firstH2Index = -1;
    var firstTableIndex = -1;
    for (var i = 0; i < children.length; i++) {
      var tag = children[i].tagName;
      if (tag === 'H2' && firstH2Index === -1) firstH2Index = i;
      if (tag === 'TABLE' && firstTableIndex === -1) firstTableIndex = i;
      if (children[i].querySelector && children[i].querySelector('table') && firstTableIndex === -1) firstTableIndex = i;
    }

    var anchorIndex = -1;
    // Prefer: 2 blocks after the first h2 (lets the intro paragraph breathe),
    // but if there's an early table, drop the CTA right after it instead.
    if (firstH2Index !== -1) anchorIndex = Math.min(firstH2Index + 2, children.length - 1);
    if (firstTableIndex !== -1 && (anchorIndex === -1 || firstTableIndex < anchorIndex)) {
      anchorIndex = firstTableIndex;
    }
    if (anchorIndex === -1) anchorIndex = Math.floor(children.length / 2); // fallback: middle

    // Don't land on the very first or very last element.
    if (anchorIndex < 1) anchorIndex = Math.min(1, children.length - 2);
    if (anchorIndex >= children.length - 1) anchorIndex = children.length - 2;
    if (anchorIndex < 0) return; // article too short — skip mid CTA

    var anchor = children[anchorIndex];
    var cta = buildCta('mid', surface);
    anchor.parentNode.insertBefore(cta, anchor.nextSibling);
  }

  function insertEnd(prose, surface) {
    var cta = buildCta('end', surface);
    prose.appendChild(cta);
  }

  function init() {
    if (!isGuidePage()) return;
    var prose = document.querySelector('article.prose');
    if (!prose) return;
    if (prose.querySelector('[data-guide-cta]')) return; // already injected

    var surface = surfaceLabel();
    insertMid(prose, surface);
    insertEnd(prose, surface);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
