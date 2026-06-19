# Same Day Jetwash — Improvement Backlog

This file consolidates the 6 code/UX audit dimensions plus the PostHog analytics review into one prioritized, de-duplicated fix backlog. Effort is S/M/L. Sources are noted per item.

## Quick wins
The 5 highest impact-to-effort fixes — ship these first.

- [ ] **Fix quote-form 2-column lock on mobile** — Remove the inline `style="grid-template-columns:1fr 1fr"` on `quote.html:127`; drive columns from CSS (single-column default, 2-col only ≥600px). The primary conversion surface is cramped to half-width fields on every phone. _(effort S, source: Mobile finesse)_
- [ ] **Stack consent banner above the sticky CTA bar** — Banner (`z-index 9999`, `js/consent.js:87`) covers the sticky Call/Quote bar (`z-index 40`, `css/v2.css:1018`) on first mobile visit, hiding the two highest-intent CTAs. Position banner at `bottom:70px` on mobile. _(effort M, source: Layout / Mobile finesse / PostHog)_
- [ ] **Remove or hide homepage FAQPage schema** — `index.html:55-66` ships FAQPage JSON-LD with no matching visible content — a Google structured-data policy violation risking a manual action. Render the 4 Q&As visibly or delete the block. _(effort S, source: SEO/A11y)_
- [ ] **Loosen contact-field validation + review spam filter** — Accept UK phone formats (spaces/`+44`/`0`) and emails; show inline real-time hints; whitelist the "spam detected" false-positive that hard-blocked a real user. With only 4 production conversions, each lost submit is material. _(effort M, source: PostHog)_
- [ ] **Add focus indicators + darken accent for text** — One global `:focus-visible { outline:3px solid var(--accent) }` rule (currently none site-wide, WCAG 2.4.7 fail) and switch body-link/price colour to `--accent-hover` (~5.6:1) to clear AA contrast. Two tiny CSS changes, sitewide a11y lift. _(effort S, source: SEO/A11y)_

## P0 — broken / blocks conversion

- [ ] **Quote form locked to 2 columns on phones** — `quote.html:127` inline grid override forces half-width Postcode/Service/Property/Area/Time fields at 375/414px; selects truncate. Move column control to CSS (1-col default, 2-col ≥600px). _(effort S, source: Mobile finesse)_
- [ ] **Cookie banner covers sticky Call/Quote bar on first mobile visit** — `js/consent.js:87` (z-index 9999) overlays `.sticky-cta` (`css/v2.css:1018`, z-index 40); both `position:fixed; bottom:0`. Stack the banner above the bar (`bottom:70px` on <768px). _(effort M, source: Mobile finesse / Layout / PostHog)_
- [ ] **Homepage FAQPage schema has no visible FAQ content** — `index.html:55-66` emits 4 Q&As only in JSON-LD; Google policy requires visible matching content. Render a visible FAQ section or remove the schema. _(effort S, source: SEO/A11y)_
- [ ] **Guide/cost pages have no conversion path** — 73 guide views are the #1 entry point (block-paving-cleaning-cost ×15, best-pressure-washers ×9, patio-cost ×8) but readers spend 130s+ then leave; only 4 production quote submissions total. Add a mid-article + sticky quote CTA and an inline postcode+service mini-form after each cost table, plus contextual links to `/quote` and the matching `/areas` page. _(effort L, source: PostHog)_
- [ ] **Contact-field validation blocks real submissions** — One user hit `invalid_format` 4× in a session; another was hard-blocked by a "spam detected" submit error. Accept UK phone/email formats, show inline hints, and fix the spam false-positive. _(effort M, source: PostHog)_

## P1 — high-impact polish & UX

- [ ] **Newer service pages are image-starved and reuse other services' heroes** — render/roof/gutter/soft-washing/window/fascia-soffit-cladding/solar-panel/commercial pages carry only 5-8 imgs, often one on-topic (their own hero). Source a correct hero + 2-3 unique in-content shots + a before/after pair per page. _(effort L, source: Imagery)_
- [ ] **Mismatched alt text & wrong related-service thumbnails** — e.g. `window-cleaning.html:369` shows `hero-render-cleaning.webp` alt "Roof being soft-washed"; related-services strip shows render photo on Roof card, patio on Commercial card. Interim: repoint each related card at the correct existing hero; final: rewrite alt to match real pixels. _(effort M, source: Imagery)_
- [ ] **No keyboard focus indicators site-wide (WCAG 2.4.7 fail)** — only `.skip-link:focus` exists; `.quote-form input:focus` actively removes the outline (`css/v2.css`). Add a global `:focus-visible` outline for links/buttons/nav-toggle/inputs/selects. _(effort S, source: SEO/A11y)_
- [ ] **Accent blue links/prices fail AA contrast** — `--accent #1E6FE5` on white is ~4.0:1 (below 4.5:1) for `.prose a`, "See all services", `.service-card__price`. Use `--accent-hover` (~5.6:1) or a dedicated `--accent-text` token for text. _(effort S, source: SEO/A11y)_
- [ ] **Header crowds/overflows in the 481–767px band** — wordmark (nowrap) + hamburger + phone icon + "Get a quote" all render with no shrink; horizontal-scroll risk. Add `min-width:0` + truncation to `.brand`, and hide `.header-cta__quote` up to 767px (sticky bar already carries Quote+Call). `css/v2.css:148-247, 1135-1169`. _(effort M, source: Layout / Mobile finesse)_
- [ ] **Homepage hero sub-paragraph is a ~70-word wall on mobile** — `index.html:~124` pushes the CTAs well below the first viewport at 375px. Trim to 1-2 short sentences ("Driveways from £80, 2-hour callback"); move operator bio to the body. _(effort S, source: Mobile finesse)_
- [ ] **Homepage hero form forces email; no phone-only option** — `index.html:152-156` hard-requires email, inconsistent with the `/quote` "phone OR email" pattern; phone-preferring locals abandon. Reuse `lead-capture.js` contact validation for a flexible contact field. _(effort M, source: Enquiry path)_
- [ ] **Consent banner buttons below 44px tap target** — `js/consent.js:91/96` Accept/Decline compute to ~30-34px on mobile; mis-taps record wrong GDPR consent. Set `min-height:44px` + ≥8px gap. _(effort S, source: Mobile finesse)_
- [ ] **Area pages drive phone intent but conversions are invisible** — Crawley organic produced the only real phone taps; only RH1 converts via form. Ensure `phone_click` tracking on every area page tap-to-call and mirror the quote form high on each `/areas` page. _(effort M, source: PostHog)_
- [ ] **Homepage & /quote visitors stall at 25-50% scroll** — only 2 `cta_click` site-wide; many sessions have 0 clicks. Move the primary quote CTA + trust signals (reviews, "same day", "from £80", guarantee) above the fold; put the form first on `/quote`. _(effort M, source: PostHog)_
- [ ] **Hero footnote contrast borderline on dark hero** — `css/v2.css:325` `rgba(255,255,255,0.65)` carries guarantee/USP copy; dips below 4.5:1 over light hero areas. Raise to `0.8` or darken the gradient floor. _(effort S, source: SEO/A11y)_

## P2 — nice-to-have

- [ ] **No before/after imagery on most service pages** — the site's strongest conversion asset (index gallery) is absent from patio/decking/block-paving/render/soft-washing/window/solar/fascia/commercial. Wire existing `images/bank` pairs where they exist (render→E3/D3, decking→E4/D4, block-paving→E1/D1, patio→E2/D2, commercial→E7/D7); shoot new for the rest. _(effort M, source: Imagery)_
- [ ] **Header "Get a quote" hidden on phones ≤480px** — `css/v2.css:1165-1169`; long-guide readers looking to the header for "quote" find only phone + hamburger. Keep a compact icon-only quote affordance in the header. _(effort S, source: Enquiry path)_
- [ ] **Calculator produces a price but no tracked hand-off into the quote form** — `calculator_used` fires (e.g. £350) but no flow into `quote_form_started`. After the price, surface a tracked "Book this for £X — get my exact quote" button that carries surface/area/price/condition into `/quote`. Also fix the tailored-quote branch (`calculator.html:462-473`) dropping area/condition. _(effort M, source: PostHog / Enquiry path)_
- [ ] **~127MB of unreferenced image assets shipping in the deploy** — `images/generated/`, `images-backup/`, `images/style-test/`, `images/bank/*.png` originals, `images/bark-uploads/`, root `Gemini_Generated_Image_*.png` (4MB), `form-debug.png`. Exclude via `.vercelignore`; delete the root strays. _(effort S, source: Imagery)_
- [ ] **review.html / review-all.html ship to deploy with 8 broken images** — internal QA artifacts at web root resolve at `/review`; reference 8 non-existent screenshots, use legacy `.html` links, and load no JS (dead mobile nav, no consent banner). Remove both files from the published site. _(effort S, source: Bugs / Layout)_
- [ ] **Orphaned `css/style.css` (2198 lines) still in repo** — referenced by zero pages; implements a conflicting older header/logo system (`.logo-text`) that misleads anyone editing the header pain-point. Delete or archive. _(effort S, source: Layout)_
- [ ] **Form abandonment under-instrumented** — `quote_form_field_completed` fires only for contact/postcode; no per-field drop-off measurable. Emit field-level events for every field + a `quote_form_abandoned` on partial-data unload. _(effort M, source: PostHog)_
- [ ] **Mini-forms use placeholder-only labels** — homepage hero + 22 area-page forms (`index.html:152-154`, `areas/*.html`) have no `<label>`; only `aria-label` + disappearing placeholder. Add visually-hidden `<label for>` tied to unique input ids. _(effort M, source: SEO/A11y)_
- [ ] **No `<main>` landmark; skip-link targets a mid-page section** — `index.html` skip-link jumps to `#main` on a `<section>` after the H1; no `<main>` on any page. Wrap primary content in `<main id="main">` including the H1. _(effort M, source: SEO/A11y)_
- [ ] **Price-card rows wrap untidily on narrow service heroes** — `css/v2.css:395`; long labels wrap while price stays centered, ragged rows on the dark hero. `min-width:0; flex:1` on label, `white-space:nowrap; flex:none` on price. _(effort S, source: Mobile finesse)_
- [ ] **Before/after pairs render as two tiny images at 375px** — `css/v2.css:753` keeps 1fr 1fr at all widths (~165px halves); the cleaning result is hard to read. Stack before-over-after below ~400px; bump labels to 0.75rem. _(effort M, source: Mobile finesse)_
- [ ] **Hero buttons/trust badges wrap untidily on narrow phones** — `css/v2.css:316/330`; make hero buttons full-width on mobile so they stack cleanly; tidy the trust row. _(effort S, source: Mobile finesse)_
- [ ] **Sticky-bar height hard-coded at 70px ignores safe-area inset** — `css/v2.css:1055` `body{padding-bottom:70px}` under-reserves on notched iPhones (~95-100px actual), clipping footer links. Use `calc(64px + env(safe-area-inset-bottom))`. _(effort S, source: Mobile finesse / Layout)_
- [ ] **CSP `img-src` omits `eu.i.posthog.com`** — `vercel.json` allows it in `connect-src` only; PostHog replay/pixel image requests get CSP-blocked. Add the ingestion host to `img-src`. _(effort S, source: Bugs)_
- [ ] **Test/localhost traffic pollutes conversion counts** — 8 of 12 `quote_form_submitted` came from localhost dev; "TEST - Claude" person inflates numbers ~3×. Guard PostHog init on hostname (or separate project) + add a saved insight filter excluding localhost/test. _(effort S, source: PostHog)_
- [ ] **Header CTA markup inconsistency (`.header-cta__phone` vs `.header-cta__call`)** — ~15 area pages still carry the stale `.header-cta__phone` class, giving two different phone-CTA treatments. Standardise on `.header-cta__call` (accent button) and remove the unused class/CSS. _(effort S, source: Layout)_
- [ ] **No WhatsApp / instant-message enquiry path** — `/quote` copy says "fastest way to a price" but offers only `tel:`. Add a `wa.me/44…` click-to-chat with a pre-filled message alongside Call (confirm Patrick wants it). _(effort S, source: Enquiry path)_
- [ ] **Sticky-bar CTA order inverted on /quote** — `quote.html:297-300` is Quote|Call vs Call|Quote everywhere else; muscle-memory/consistency cost. Standardise on Call-primary sitewide. _(effort S, source: Enquiry path)_
- [ ] **Two overlapping form handlers target `#quoteForm`** — `form.js` + `lead-capture.js` both bind; double-bind prevented only by a hand-set `data-jw-lead-capture-bound` attribute — latent double-POST hazard. Consolidate to one handler. _(effort M, source: Enquiry path)_
- [ ] **Submit failures use a blocking `alert()`** — `js/form.js:69-75` / `lead-capture.js:111`; jarring on mobile, reads as "site broken". Replace with an inline error banner (keep the "call 01737 652 515" fallback + retry). _(effort S, source: Enquiry path)_
- [ ] **No responsive image markup (no `<picture>`/srcset/AVIF)** — every image is a single fixed ~1376px WebP; mobile-organic audience over-downloads. Generate 480/768/1376 widths + WebP/AVIF `<picture>` (extend existing `compress_images.py`). _(effort M, source: Imagery)_
- [ ] **Stale global `body{padding-bottom:70px}` before desktop reset** — duplicate of the sticky-bar height issue; ensure the desktop reset and safe-area handling are consistent. `css/v2.css:1055-1059`. _(effort S, source: Layout)_
- [ ] **Long select option labels truncate in narrow cells** — `quote.html` service/time selects; even after the single-column fix, shorten "Any time during business hours"→"Any time" and "Fascia, soffit & cladding"→"Fascia & soffit" for mobile. _(effort S, source: Mobile finesse)_
- [ ] **Guide table horizontal-scroll has no affordance** — `css/v2.css:993` `.table-responsive` overflow-x:auto with no hint that columns continue off-screen at 375px. Add a right-edge fade or "scroll →" hint, or stack key pricing tables. _(effort M, source: Mobile finesse)_
- [ ] **Homepage hero quote-form footnote is small & link-dense** — `index.html:~166` / `css/v2.css:466`; 13px centered with adjacent tap-to-call + privacy links. Bump to 0.875rem, add spacing/line-height, pad the `tel:` target. _(effort S, source: Mobile finesse)_
- [ ] **Header flex ordering relies on a fragile `order:9` hack** — `css/v2.css:1111-1131`; visual order mixes source order + one explicit value. Make `order` explicit on all three header flex children per breakpoint. _(effort S, source: Layout)_
- [ ] **Homepage title/canonical location string is split** — `index.html:8` title "| Redhill" vs og:title "| Redhill & Reigate" vs schema "Same Day JetWash Reigate". Pick one canonical brand+location string across title/og/twitter/schema. _(effort S, source: SEO/A11y)_
- [ ] **review/review-all use legacy `.html` links** — violates the clean-URL standard (extra 301 hop). Moot if the files are removed (see P2 removal item); otherwise strip `.html`. _(effort S, source: Bugs)_
- [ ] **CTA-banner backgrounds reuse off-topic heroes** — decorative `alt=""` is correct, but e.g. window page's CTA bg is `hero-render`. Once each service has its own hero, point CTA banner bg at it. _(effort S, source: Imagery / SEO)_
- [ ] **Duplicate service-card alt strings across pages** — soft-washing card reuses the render hero (HTML-comment stand-in). Source a dedicated soft-washing image; alt text itself is fine. _(effort S, source: SEO / Imagery)_

## Workstreams
Same backlog, grouped into the client's themes.

### Logo & header
- Orphaned `css/style.css` (2198 lines) misleads header edits — delete/archive _(P2)_
- Header crowds/overflows in 481–767px band — `min-width:0` + truncate brand, hide quote button to 767px _(P1)_
- Header "Get a quote" hidden on phones ≤480px — keep a compact icon-only quote affordance _(P2)_
- Header CTA inconsistency `.header-cta__phone` vs `.header-cta__call` on ~15 area pages _(P2)_
- Fragile `order:9` header flex hack — make ordering explicit _(P2)_

### Mobile finesse
- Consent banner buttons below 44px tap target _(P1)_
- Homepage hero sub-paragraph wall of text — trim on mobile _(P1)_
- Price-card rows wrap untidily on narrow heroes _(P2)_
- Before/after pairs too tiny at 375px — stack below ~400px _(P2)_
- Hero buttons/trust badges wrap untidily — full-width buttons _(P2)_
- Sticky-bar 70px ignores safe-area inset — `calc(64px + env(...))` _(P2)_
- Long select labels truncate — shorten copy _(P2)_
- Guide table scroll has no affordance — add fade/hint _(P2)_
- Hero quote-form footnote small & link-dense _(P2)_

### More images
- Newer service pages image-starved / reuse other heroes — source real per-service photography _(P1)_
- Mismatched alt text & wrong related-service thumbnails _(P1)_
- No before/after on most service pages — wire existing `images/bank` pairs + shoot new _(P2)_
- ~127MB unreferenced assets shipping — exclude via `.vercelignore` _(P2)_
- No responsive `<picture>`/srcset/AVIF — generate 480/768/1376 sets _(P2)_
- CTA-banner backgrounds reuse off-topic heroes _(P2)_
- Duplicate soft-washing service-card image _(P2)_

### Seamless enquiry path
- Homepage hero form forces email; no phone-only option _(P1)_
- No WhatsApp / instant-message path _(P2)_
- Sticky-bar CTA order inverted on /quote _(P2)_
- Two overlapping form handlers on `#quoteForm` — consolidate _(P2)_
- Submit failures use a blocking `alert()` — inline banner _(P2)_
- Calculator price has no tracked hand-off into the quote form _(P2)_

### Bugs & layout
- Cookie banner covers sticky CTA bar on first mobile visit _(P0)_
- review.html / review-all.html ship with 8 broken images — remove _(P2)_
- review/review-all legacy `.html` links _(P2, moot if removed)_
- CSP `img-src` omits `eu.i.posthog.com` _(P2)_
- Stale global `body{padding-bottom:70px}` _(P2)_

### Conversion (from recordings)
- Guide/cost pages have no conversion path — sticky + inline mini-form _(P0)_
- Contact-field validation blocks real submissions — loosen + fix spam filter _(P0)_
- Quote form 2-column lock on mobile _(P0)_
- Homepage FAQPage schema policy violation _(P0)_
- Area pages drive invisible phone conversions — track `phone_click`, mirror form _(P1)_
- Homepage & /quote stall at 25-50% scroll — CTA + trust above the fold _(P1)_
- Calculator hand-off into the quote form _(P2)_
- Form abandonment under-instrumented — per-field events _(P2)_
- Test/localhost traffic pollutes conversion counts — guard init + filter _(P2)_

**TL;DR DONE:** Consolidated all 7 audits into one deduped, prioritized, workstream-grouped backlog ready for TODO-IMPROVEMENTS.md.