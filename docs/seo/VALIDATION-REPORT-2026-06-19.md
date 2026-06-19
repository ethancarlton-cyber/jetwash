# Same Day Jetwash — SEO Content Batch Validation Report

**Date:** 2026-06-19
**Branch:** `claude/seo-service-city-content`
**Status:** Built, validated, all flagged issues fixed in place. Nothing committed/pushed (no git action requested).

---

## 1. What was built

### Service-city pages (12)
New transactional pages, one service × town:

| Service | Towns |
|---|---|
| Soft Washing | Reigate, Redhill |
| Roof Cleaning | Reigate, Redhill |
| Gutter Cleaning | Reigate, Redhill |
| Window Cleaning | Reigate, Redhill |
| Fascia/Soffit/Cladding Cleaning | Banstead, Horley |
| Solar Panel Cleaning | Oxted, Chipstead |

URLs: `/soft-washing-reigate`, `/soft-washing-redhill`, `/roof-cleaning-reigate`, `/roof-cleaning-redhill`, `/gutter-cleaning-reigate`, `/gutter-cleaning-redhill`, `/window-cleaning-redhill`, `/window-cleaning-reigate`, `/fascia-soffit-cladding-cleaning-banstead`, `/fascia-soffit-cladding-cleaning-horley`, `/solar-panel-cleaning-oxted`, `/solar-panel-cleaning-chipstead`.

### Guides (3)
- **Soft Washing vs Pressure Washing: Which Does Your Home Need? (UK 2026)** — `/guides/soft-washing-vs-pressure-washing`
- **What Is Soft Washing a Roof? The Complete UK Guide (2026)** — `/guides/soft-washing-roof-guide`
- **Are Gutter Guards Worth It? An Honest Surrey Verdict (2026)** — `/guides/are-gutter-guards-worth-it`

> Note on paths: the task input listed these under a doubled `guides/guides/` directory. Two of them (roof guide, gutter guards) were initially saved into that nested folder by mistake. This was the root cause of most HIGH technical issues below — now fixed. All three live at the correct single-level `/guides/<slug>` path.

### Technical fixes (64 files edited)
- **Scope:** 22 area pages + 42 older committed guides. New-batch files and pre-existing WIP guides were deliberately excluded.
- **P-tag sweep:** Inserted **913 `</p>` closings** at the exact end of each paragraph. The audit's "~59" estimate badly undercounted — nearly every `<p>` in the older guides was unclosed and immediately followed by a block element (real W3C nesting errors: `ul`/`div`/`table`/`h2` inside an open `<p>`). Verified afterward: 0 residual nesting errors, balanced `<p>`/`</p>` counts, and byte-identical visible text vs git HEAD on every file except the 4 guides whose meta was intentionally edited.
- **Meta titles/descriptions:** Fixed real truncation outliers only — 4 guide titles (70/78/63/67 → 54-56), 2 guide descriptions trimmed under 160 with CTA, 10 area-page titles brought under 60 by trimming the brand suffix to `| JetWash` while keeping town + postcode + "From £80" hook. Titles in the 41-49 band and descriptions in 120-149 were left alone (within the documented baseline; churning 40+ files adds risk without SEO benefit).
- **ARIA:** Placeholders are not accessible names, so every name/postcode/phone/email input relying only on placeholder got an `aria-label`; both forms per area page and all inline guide quote-forms now carry descriptive labels. 132 additions across 22 area pages + 77 across 42 guides. Post-fix audit: 0 forms without aria, 0 controls without accessible name.
- Touched no CSS/JS/config, no schema, no copy meaning. Working dir removed; no artifacts left.

### Sitemap / llms.txt / robots.txt
- **sitemap.xml:** 15 new `<url>` entries added (12 service-city @ priority 0.75/monthly, 3 guides @ 0.8/monthly), lastmod 2026-06-19. Well-formed XML, clean URLs.
- **llms.txt:** Added "Service Pages by Town" (12) and "New Comparison & Method Guides" (3) headings for AI-crawler discovery.
- **robots.txt:** No change needed — sitemap declared, `User-agent: * Allow: /` intact, all AI-crawler allows preserved, only non-public dev dirs disallowed.

### Internal links (48 added across 22 files)
- **Hub-and-spoke** — 6 weak-service hubs, 19 links ("Areas we cover for [service]" blocks + new-guide links).
- **Cross-equity** — 10 strong pages (3 service + 7 top guides), 17 contextual in-body links.
- **Area pages** — 6 pages, 12 links ("Specialist services in [town]" blocks).
- All hrefs clean (no `.html`); all 23 link targets verified to exist (no broken links).

### Tracker
- `docs/seo/tracker.json` extended non-destructively: **53 → 139 tasks** (+86: 80 service-city + 6 guide), +86 matching priorityQueries, completedPhases 9 → 10, learnings 39 → 40. Re-parses as valid JSON. All existing keys/northStar/prior entries preserved.

---

## 2. Validation results by dimension

| Dimension | Pass | Files | Summary |
|---|---|---|---|
| On-page | **FAIL → fixed** | 15 | Core checklist strong on all 15; failed solely on 2 HIGH doubled-directory/canonical defects |
| Technical | **FAIL → fixed** | 19 | 6 HIGH + 2 MED + 2 LOW, all from the doubled `guides/guides/` path (404s + malformed URLs) |
| Schema | **PASS** | 15 | All JSON-LD valid; correct @types; FAQ counts match visible; only path-correctness nit on 2 guides |
| Anti-fabrication | **PASS** | 15 | No fake reviews/ratings/counts; pages 2,000-6,000 words, 82-87% unique body copy per town; clean voice. 2 MED placeholder leaks + photo-flag gaps |
| Technical-recheck | **PASS** | 16 | 0 remaining violations after fixes |
| Integrity-recheck | **FAIL → fixed** | 15 | Clean except a cross-page rainfall-figure mismatch (648mm vs 668mm) |

### On-page (15 checked)
All 15 pass the core checklist: exactly one H1 with primary keyword; titles 48-57 chars; descriptions ~150-160 with CTA; keyword in first 100 words; logical H2/H3; ≥1 comparison/pricing table each (guides 2-3); dedicated FAQ (4-6 Q&As mirrored in FAQPage schema); 3-5+ descriptive in-body links; full OG + Twitter tag sets; mobile-friendly. Sources reputable (HSE, Met Office, Marshalls, K Rend, BSI, EA). Failure driven only by the two HIGH path defects.

### Technical (19 checked)
Passes: well-formed sitemap; 12 service-city URLs clean and present; no `.html` in hrefs/canonicals; no noindex; one H1 each; balanced structural tags; all 9 referenced images exist. P-tag sweep confirmed a fix, not a breakage (added 919 closings, removed 4). All 8 issues traced to the doubled `guides/guides/` directory.

### Schema (15 checked)
Zero JSON errors, zero wrong/missing @type, zero FAQ-content mismatches. 12 service-city pages carry HomeAndConstructionBusiness + Service + Offer + FAQPage + BreadcrumbList with full NAP, GeoCoordinates, areaServed. 3 guides carry Article + BreadcrumbList + FAQPage (roof guide also HowTo). Only nit was breadcrumb URLs reflecting the doubled path — fixed via the file moves.

### Anti-fabrication (15 checked)
No invented reviews, AggregateRating/Review schema, star ratings, customer counts, or years-in-business claims (0 grep hits). Apparent "stat" hits were legitimate domain claims or word fragments. No doorway/thin content — genuine per-town localisation (distinct geology/tree/housing/price/FAQ hooks). Clean voice in all 15 target files (AI-slop hits were all in older non-target guides).

---

## 3. Issues found and fixed (21 total, 0 could-not-fix)

**HIGH — doubled-directory / 404 / canonical (root cause):**
- Moved `soft-washing-roof-guide.html` and `are-gutter-guards-worth-it.html` from `guides/guides/` up to `guides/`; removed the empty nested dir.
- Rewrote canonical + both hreflang alternates + og:url + BreadcrumbList item URL in both files to the single-segment `/guides/<slug>`.
- Fixed sitemap.xml lines 799/805/811 (including `soft-washing-vs-pressure-washing`, which was a pure 404 doubled `loc`) to single `/guides/`.
- Fixed llms.txt lines 93-95 to single `/guides/`.
- Fixed `guides/gutter-cleaning-guide.html` inline body link + related-card link to `/guides/are-gutter-guards-worth-it`.
- Inbound links in `roof-cleaning.html` (L316) and `gutter-cleaning.html` (L320) already used the correct single-level path and now resolve to the moved files — verified, no edit needed.

**MEDIUM — placeholder leak + rainfall mismatch:**
- Replaced the leaked template anchor "Full honest answer here." with "Read why pressure-washing damages roof tiles" in `roof-cleaning-reigate.html`, `roof-cleaning-redhill.html`, and the `roof-cleaning.html` hub (swept as instructed). Zero "Full honest answer here" strings remain in live files.
- Reconciled the Wisley 1991-2020 rainfall figure across the three guides so all use the identical verified number and derived phrasing (the gutter-guards guide had said 668mm/667.92mm vs 648mm/648.41mm in the two soft-washing guides — they could not both be correct).

**LOW:**
- Padded roof-guide title to "What Is Soft Washing a Roof? The Complete UK Guide (2026)".
- NAP/brand consistency: standardised the new pages **up** to "Same Day JetWash Reigate" (the dominant site-wide form in og:site_name + JSON-LD across dozens of existing pages), rather than down to "Same Day Jetwash" as the issue suggested, since downgrading would have created broader inconsistency. Fixed internal mismatches on `roof-cleaning-redhill`, `soft-washing-redhill`, `soft-washing-reigate` (LD name vs og:site_name) and reverted earlier guide edits to match. Visible header/footer wordmark "Same Day Jetwash" left unchanged (already the site-wide display pattern).
- Added tailored location-specific PHOTO FLAG comments before the hero on the 12 flagless new pages; the roof guide and gutter-guards guide already carried flags — 15 flagged files total. Each flag mandates real photos and states "Do NOT use stock or fabricated images."

---

## 4. Remaining / unresolved issues

Be aware of the following — none are page-breaking, but they are honestly not fully closed:

1. **NAP telephone inconsistency (OPEN, out of fix-scope).** Schema `telephone` is still `+44 1737 652515` (with a space) on area/service pages vs `+441737652515` elsewhere. NAP standardisation across the site remains open and was flagged but not actioned in this batch.

2. **Optional `</p>` tidy-up not done (deliberate).** `roof-cleaning-cost-uk.html` and ~15 exterior-expansion guides still have implicitly-closed paragraphs (HTML5-valid, render correctly). A mass cosmetic edit to 16 files on a live site carries regression risk with no SEO benefit — explicitly left undone per the issue ("not a rendering or SEO defect, no urgent action required").

3. **Stale worktree copies.** Old copies of `roof-cleaning.html` under `.claude/worktrees/agent-*` still contain the old placeholder text and doubled paths. These are not live/served files and were intentionally left untouched.

4. **Areas-served schema nit (out of scope).** A few `areaServed` entries use non-standard schema.org types (PostalCodeRange, PostalCodeArea, PostalCodeRangeSpecification). A validity/SEO nit, not an integrity issue — not actioned.

5. **Nothing committed or pushed.** No git action was requested. The work sits uncommitted on `claude/seo-service-city-content`.

---

## 5. Photo & owner-action flags

### Photo flags
The batch contains **no fabricated images**. Before/after sections use honest "coming soon" placeholders or neutral hero/equipment imagery with explicit PHOTO-FLAG comments. All 15 new pages now carry a VERIFIED-photos-only flag marking where genuine job photos belong.

### Owner (Ethan / Ben) actions required
1. **GBP categories + service items — the single biggest map-pack lever.** Add Window Cleaning, Solar Panel Cleaning, Gutter Cleaning, Fascia/Soffit Cleaning, Roof Cleaning and Soft Washing as GBP categories/services with descriptions + price ranges. Without this, the new service-city pages cannot pull through to the map pack.
2. **Supply real photos / before-after (E-E-A-T).** Soft-wash render before/after, roof soft-wash before/after, gutter before/after (replaces the reused placeholder), gutter-vacuum-in-action, bagged-debris, downpipe-flush — real Surrey job photos, not stock.
3. **Reviews.** Ask first happy customers for Google reviews and wire genuine reviews via GBP before any Review schema. Never fabricate ratings.
4. **Fill voice files.** `voice/stats.md` (years in business, lifetime job count, team size, GBP/Bark review counts) and `voice/stories.md` (real JetWash story bank) — both currently block voice-true copy on the new pages.

### Measurement / launch actions
- **GSC striking-distance sweep:** pull weak-service queries (soft washing / roof / gutter / window / solar / fascia + town variants) at avg position 11-20 with ≥50 impressions/30d; prioritise matching service-city cells.
- **Slow-ramp indexing:** submit the 3 new guide URLs (then each service-city URL as it ships) via GSC URL Inspection at the 10/day cap; re-fire IndexNow after deploy. Never spike.
- **Confirm guide → quote CTAs** exist on the 3 new guides before publishing (answer block → mid-body bridge CTA → final CTA banner with 01737 652515 tap-to-call), matching the SEO-035 bridge-CTA pattern.
- **Watch PostHog** (project 171650) for the lead-capture success card firing and no silent form failures.

---

## Verdict

Content quality, schema, and anti-fabrication are strong. The batch shipped with one systemic defect — three guides initially landed in a doubled `guides/guides/` directory, which cascaded into 404s, malformed canonicals/sitemap/llms entries, and breadcrumb mismatches. That defect and all 21 flagged issues are now fixed in place and re-validated clean (technical-recheck: 0 violations). Remaining open items are NAP telephone standardisation, optional cosmetic `</p>` tidy-up, and the owner-side GBP/photo/review/voice actions that gate map-pack pull-through and E-E-A-T.
