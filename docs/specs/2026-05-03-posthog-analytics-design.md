# PostHog Analytics — Design Spec

**Project:** JetWash (samedayjetwash.com)
**Date:** 2026-05-03
**Status:** Approved — ready for implementation plan
**Author:** Brainstormed with Ethan

---

## Goal

Replace Google Analytics 4 with PostHog so every user interaction on every page is captured in a way that makes user behaviour easy to inspect and improve. Keep Google Search Console untouched — it remains the SEO source of truth.

Success looks like: opening the PostHog dashboard answers "what did users do on this site, where did they drop off, where did they come from, where can we improve?" without writing a query.

---

## Constraints

- **Zero-cost mandate** — must run on PostHog free tier indefinitely
- **Pure static site** — vanilla HTML/CSS/JS, no build step, no npm at runtime
- **UK GDPR + PECR** — analytics requires explicit consent
- **Anonymous lead-gen model** — site collects PII (name/phone/postcode) via quote form; PII must never leak into autocaptured events or session replays
- **All 67 HTML pages** must be updated in a single deploy — no partial rollout

---

## Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Analytics tool | PostHog (replace GA4) | Autocapture + replay + funnels in one tool; free tier covers 10× current volume |
| Account | New free PostHog account dedicated to JetWash | Free tier allows only 1 project per org; keeps JetWash data separate from Coldread |
| Region | EU Cloud (`eu.posthog.com`) | UK data residency, GDPR alignment |
| GA4 | Removed entirely | PostHog supersedes; GSC works independently |
| Consent UX | Cookie banner with explicit Accept / Decline | PECR-compliant, ICO-aligned |
| Default state | No tracking until accept | Strictest interpretation, lowest legal risk |
| Session replay | Enabled, all inputs masked by default | Maximum CRO insight, zero PII leak |
| Person profiles | `identified_only` | Saves person-count quota; visitors only become "people" after quote submit |
| Identify trigger | Quote form submit | Links full pre-submit journey to lead email |
| PII handling | Phone/email/full-postcode redacted via `before_send`; only postcode area (e.g. `RH1`) and dial code captured |

---

## Account & Project

- **Project name:** JetWash
- **Project ID:** `171650`
- **Region:** EU Cloud
- **Public ingest key:** `phc_Ckia5DcgrWeEBkZi7xWDSt8FoDZ4SEnt8D6usPpR9EpT` — used in client code, domain-scoped, safe to commit
- **Personal API key:** stored out-of-band by Ethan; **NOT in this repo** — needed only if we later integrate the management API for cohort/dashboard automation
- **Ingest host:** `https://eu.i.posthog.com`
- **Asset host:** `https://eu-assets.i.posthog.com`

---

## Architecture

### File layout

```
Projects/jetwash/js/
├── consent.js     ← NEW — cookie banner + consent state machine
├── posthog.js     ← NEW — PostHog init, named events, identify
├── form.js        ← MODIFIED — calls JWAnalytics.* instead of Analytics.*
├── nav.js         ← unchanged
└── analytics.js   ← DELETED — GA4 removed
```

### Load order (every HTML page, in `<head>`)

```html
<script src="/js/consent.js" defer></script>
<script src="/js/posthog.js" defer></script>
<script src="/js/nav.js" defer></script>
<script src="/js/form.js" defer></script>  <!-- only on form pages -->
```

`defer` keeps script execution non-blocking and ordered.

### Consent state machine

```
Page load
  ↓
consent.js reads localStorage["jw_consent"]
  ├── "accepted" → fires window event "consent:granted" → posthog.js inits PostHog with full capture
  ├── "denied"   → posthog.js stays dormant; no network requests; no cookies set
  └── (unset)    → consent.js shows banner
                    ├── User clicks Accept  → store + fire "consent:granted"
                    └── User clicks Decline → store + fire "consent:denied"
```

Re-prompt schedule: if `localStorage["jw_consent_at"]` is older than 12 months, banner re-appears (UK ICO guidance).

### Vercel CSP

`vercel.json` `headers` block updated with:

```
Content-Security-Policy:
  default-src 'self';
  connect-src 'self' https://eu.i.posthog.com https://eu-assets.i.posthog.com https://api.web3forms.com;
  script-src 'self' 'unsafe-inline' https://eu-assets.i.posthog.com;
  img-src 'self' data: https://eu-assets.i.posthog.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
```

---

## Components

### `js/consent.js`

**Public API attached to `window.JWConsent`:**

| Method | Returns | Description |
|--------|---------|-------------|
| `status()` | `"accepted" \| "denied" \| "unset"` | Current consent state |
| `accept()` | `void` | Store accept, fire `consent:granted` |
| `deny()` | `void` | Store deny, fire `consent:denied` |
| `onChange(fn)` | `void` | Subscribe to changes |
| `showBanner()` | `void` | Force re-show (e.g. from privacy page link) |

**Banner UI:**
- Bottom-fixed bar (`position: fixed; bottom: 0`)
- Background `#1D3557` (project navy), text white
- Copy: *"We use cookies and analytics to understand how visitors use this site so we can make it better. No data is sold or shared with advertisers."*
- "Accept" button (`#2196F3` / vibrant blue) and "Decline" button (transparent border)
- "Privacy policy" link → `/privacy`
- Auto-dismisses on click; persists choice via `localStorage`
- Keyboard accessible: Tab to navigate, Esc treats as "Decline"
- Mobile-responsive — wraps to two rows on `< 480px`

**Storage keys:**
- `jw_consent` — `"accepted"` or `"denied"`
- `jw_consent_at` — ISO timestamp of decision

**Failure mode:** if `localStorage` is unavailable (Safari private mode), `status()` returns `"unset"` and the banner shows on every visit; consent is treated as denied for that session.

### `js/posthog.js`

**Public API attached to `window.JWAnalytics`:**

| Method | Properties captured |
|--------|---------------------|
| `trackPhoneClick(location)` | `location` (header/sticky/footer/inline), `page` |
| `trackCTAClick(label, destination)` | `cta_label`, `cta_destination`, `page` |
| `trackQuoteStart(field)` | `field`, `page` |
| `trackQuoteFieldComplete(field)` | `field`, `page` |
| `trackQuoteValidationError(field, errorType)` | `field`, `error_type`, `page` |
| `trackQuoteSubmit(properties)` | `service`, `postcode_area`, `referrer`, `page` |
| `trackQuoteSubmitError(error)` | `error`, `page` |
| `trackServiceView(service)` | `service` |
| `trackAreaView(area, postcodeArea)` | `area`, `postcode_area` |
| `trackGuideView(slug)` | `guide_slug` |
| `trackCalculatorUse(surface, areaM2, condition, extras, price)` | all five |
| `identifyLead(email, properties)` | calls `posthog.identify(email, props)` |

**Init flow:**
1. Listen for `consent:granted` window event.
2. If `JWConsent.status() === "accepted"` already, init immediately on script load.
3. Init = inject the official PostHog snippet then call `posthog.init` with:
   ```js
   {
     api_host: 'https://eu.i.posthog.com',
     person_profiles: 'identified_only',
     autocapture: true,
     capture_pageview: true,
     capture_pageleave: true,
     session_recording: {
       maskAllInputs: true,
       maskTextSelector: '[data-private]',
       recordCrossOriginIframes: false,
     },
     before_send: scrubPII,  // strips email/phone/full-postcode patterns
   }
   ```
4. Auto-fire page-type events from URL pattern:
   - `/areas/{slug}` → `trackAreaView(slug, postcodeArea)`
   - `/guides/{slug}` → `trackGuideView(slug)`
   - service slugs (`/driveway-cleaning`, `/patio-cleaning`, etc.) → `trackServiceView(service)`
5. Auto-attach delegated event listeners on `document`:
   - `click` on `a[href^="tel:"]` → `trackPhoneClick`
   - `click` on `[data-cta]` → `trackCTAClick`
   - `click` on outbound `a[href]` (host !== `samedayjetwash.com`) → `external_link_click`
   - Scroll milestones at 25 / 50 / 75 / 100 % → `scroll_depth`

**`scrubPII(event)`:**
- Regex-replaces email patterns in any string property → `[EMAIL]`
- Regex-replaces UK phone patterns (07/01/02/03 + 9-10 digits) → `[PHONE]`
- Regex-replaces full UK postcodes (`[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}`) → keeps area only (`RH1`)
- Applied recursively to all event properties before send

### `js/form.js` (modifications)

Replace existing `Analytics.trackQuoteStart()`, `Analytics.trackQuoteComplete()`, etc. calls with `JWAnalytics.trackQuoteStart()`, `JWAnalytics.trackQuoteSubmit()`. Add new hooks for:
- `trackQuoteFieldComplete` on each field's `blur` event when value passes validation
- `trackQuoteValidationError` on validation failure
- `trackQuoteSubmitError` on Web3Forms non-200 response
- `identifyLead(email, { name, postcode_area, service })` on successful submit (BEFORE redirecting / showing thanks message)

### Privacy page update (`/privacy`)

Existing `privacy.html` updated to add a section:

> **Analytics:** We use PostHog (hosted in the EU) to understand how visitors use this site so we can improve it. PostHog stores a cookie in your browser, captures clicks, page views, and a session replay (with all form inputs masked — your typed information is never recorded). You can decline this when you first visit, or change your choice at any time by [clicking here](javascript:JWConsent.showBanner()). PostHog's own privacy policy: https://posthog.com/privacy.

---

## Events

### Layer 1 — autocapture (automatic, every page)

PostHog's `autocapture: true` plus `capture_pageview` / `capture_pageleave` covers:
- `$pageview` (URL, title, referrer, UTM params)
- `$pageleave` (duration on page)
- `$autocapture` (every click — element tag, text, class, id, href)
- `$rageclick`, `$dead_click` (auto-detected friction signals)
- Browser, OS, screen size, country/region (from IP), device type, session ID

### Layer 2 — named events (explicit)

| Event | Trigger | Properties |
|-------|---------|------------|
| `phone_click` | `tel:` link clicked | `location`, `page` |
| `cta_click` | `[data-cta]` element clicked | `cta_label`, `cta_destination`, `page` |
| `quote_form_started` | First keystroke in any quote form field | `field`, `page` |
| `quote_form_field_completed` | Field blurred with valid value | `field`, `page` |
| `quote_form_validation_error` | Validation fails | `field`, `error_type`, `page` |
| `quote_form_submitted` | Web3Forms returns success | `service`, `postcode_area`, `referrer`, `page` |
| `quote_form_submit_error` | Web3Forms returns error | `error`, `page` |
| `service_view` | Service page loaded | `service` |
| `area_view` | Area page loaded | `area`, `postcode_area` |
| `guide_view` | Guide page loaded | `guide_slug` |
| `calculator_used` | Cost calculator returns price | `surface`, `area_m2`, `condition`, `extras[]`, `quoted_price` |
| `external_link_click` | Outbound `a` clicked | `destination`, `page` |
| `scroll_depth` | 25/50/75/100% milestones | `depth`, `page` |

### Layer 3 — identification

`posthog.identify(email)` fired only on successful quote submit. Properties:
- `name`
- `postcode_area` (e.g. `RH1`)
- `service`
- `phone_dial_code` (e.g. `+44`)

Full phone, full postcode, and PII not in this list are never sent to PostHog.

### Layer 4 — session replay

- Enabled post-consent
- All inputs masked (`maskAllInputs: true`)
- Any element with `data-private` attribute has its text masked
- Cross-origin iframes not recorded
- Quota cap: 5K sessions/month (free tier) — at current ~500-2000 sessions/month, headroom is ~3-4× current traffic

---

## Error handling

| Failure | Behaviour |
|---------|-----------|
| PostHog SDK fails to load | Page works normally; no events captured; silent console warning |
| `posthog.capture()` throws | Wrapped in try/catch; logs to console only; never throws to caller |
| `localStorage` unavailable | Consent treated as `unset` per session; banner shows; tracking stays off |
| Pre-init event fired (before consent) | Discarded, not queued |
| Web3Forms returns error | `trackQuoteSubmitError` fires; user sees existing error UI |
| CSP violation | Logged to browser console; tracked via PostHog if SDK loaded; does not break page |

---

## Rollout

### Phase 1 — implement (single PR)
1. Create `js/consent.js` and `js/posthog.js`
2. Modify `js/form.js` to call `JWAnalytics.*`
3. Update `vercel.json` CSP headers
4. Update `privacy.html` with analytics section + re-consent link
5. Find/replace across all 67 HTML pages:
   - Remove `<script src="/js/analytics.js" defer></script>`
   - Add `<script src="/js/consent.js" defer></script>` and `<script src="/js/posthog.js" defer></script>`
6. Delete `js/analytics.js`
7. Push to feature branch → Vercel preview deploy

### Phase 2 — verify on preview
- [ ] Cookie banner appears in incognito on first visit, all 5 page types (homepage, service, area, guide, quote)
- [ ] Accept → events appear in PostHog Live Events tab within 5 seconds
- [ ] Decline → no network requests to `eu.i.posthog.com` (verified in DevTools Network tab)
- [ ] Quote form: `quote_form_started`, `quote_form_field_completed`, `quote_form_submitted` all fire
- [ ] `posthog.identify` fires on submit with email
- [ ] Session replay shows masked inputs (form values rendered as `*****`)
- [ ] Phone tap on mobile fires `phone_click`
- [ ] CTA buttons fire `cta_click` with correct labels
- [ ] Calculator use fires `calculator_used`
- [ ] Re-show banner from privacy page works
- [ ] CSP headers don't block any required resources (no console errors)

### Phase 3 — promote to production
- Merge to `main` → Vercel auto-deploys to `samedayjetwash.com`
- Smoke check on production (incognito, accept, see events)
- Monitor PostHog for 48h, confirm normal traffic patterns

### Phase 4 — clean up
- Remove old GA4 property in Google Analytics dashboard (optional — can also leave it if you want a sunset window)
- Update CLAUDE.md "Analytics & Monitoring" section: GA4 → PostHog

---

## Out of scope

- Server-side analytics (no backend; not needed)
- A/B testing / feature flags (PostHog supports it; punt to a future spec when there's a hypothesis to test)
- Cohorts and funnels in code (build them ad-hoc in PostHog UI)
- Heatmap embedding (use PostHog's UI, no integration needed)
- GA4 → PostHog historical data import (not supported; clean break)
- Cookie banner reuse on Cookie Guardian landing page (file is reusable; integration when that project needs it)

---

## Open questions

None — all decisions made.
