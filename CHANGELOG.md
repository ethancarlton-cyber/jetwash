# Changelog — Front-End Integration (single deploy)

Consolidation of 18 front-end PRs (#19–#36) into one integration branch
(`claude/integration-all-fe`) for a single production release.

All changes are static HTML/CSS/JS — zero new dependencies, zero new cost.

## Brand

- **#36 New Same Day Jetwash wordmark logo + favicon + social banner.** Replaced
  the old droplet `brand__mark` with an SVG wordmark in the header/footer across
  103 pages; added `favicon.svg` / `favicon.ico` / `favicon-32.png` /
  `apple-touch-icon.png` and Open Graph / Twitter social-share images.

## Conversion & Forms

- **#22 Quote & hero contact validation.** Quote form and homepage hero accept a
  real UK phone **or** email in one field, with correct spam handling (no more
  false-positive blocks of legitimate submissions).
- **#35 Phone-or-email across all inline & sidebar forms (97 forms).** Unified
  `js/lead-capture.js` so every inline/sidebar lead form accepts phone OR email,
  maps the value into the correct Web3Forms field (Phone/Email) for clean lead
  emails, and reports validation errors inline.
- **#23 Guide-article CTAs.** Added quote CTAs to 59 guide articles via
  `js/guide-cta.js`.
- **#30 Area-page enquiry CTA + phone tracking.** Scoped `phone_click` events and
  area context to 22 area pages via `js/area-cta.js`.
- **#31 Before/after galleries on service pages.** Added before/after galleries to
  6 service pages.
- **#28 Calculator → quote hand-off.** The cost calculator now passes the
  estimated price + surface/area details into the quote form for prefill.
- **#34 Quote autofill + header call CTA.** Restored browser autofill on the quote
  form and standardised the header call-now CTA.

## Mobile

- **#20 Mobile quote-form columns.** Quote-form fields stack full-width on phones.
- **#21 Consent banner over sticky CTA.** Consent banner clears the sticky mobile
  CTA bar and uses 44px minimum tap targets.
- **#26 Trimmed mobile hero.** Tightened the hero so the primary CTA sits above the
  fold on phones.

## Layout

- **#29 Header overflow fix.** Header no longer overflows in the 481–767px width
  band.
- **#32 Homepage trust strip.** Added an honest trust strip
  (`hero__trust`) below the hero — 2-hour callback, driveways from £80,
  same/next-day Surrey, no obligation (all pre-existing, true signals).

## Accessibility & SEO

- **#25 Focus & contrast.** Global `:focus-visible` indicators and AA-compliant
  accent text colour in `css/v2.css`.
- **#24 Visible homepage FAQ.** Rendered the homepage FAQ content visibly to match
  the existing FAQPage schema.
- **#27 Service image & alt fixes.** Corrected mismatched service images and
  misleading `alt` text.

## Analytics

- **#33 PostHog session replay through CSP.** Added `worker-src 'self' blob:` to
  `vercel.json` and `_headers` so PostHog session replay loads under CSP.

## Docs / Internal

- **#19 Front-end backlog + logo concepts.** Added `TODO-IMPROVEMENTS.md` and three
  logo concept files under `design/logo-concepts/` (not shipped to live pages).
