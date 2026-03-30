# JetWash Conversion Plan — Get First Enquiry

**Created**: 2026-03-30
**Status**: Active
**Goal**: Convert 350-488 daily impressions into form submissions
**Source**: 4-perspective strategy review (SEO, Marketing, CEO, UX/CRO)

---

## Diagnosis

Three compounding failures:
1. **Wrong traffic** — 70-80% of impressions from UK-wide informational guide pages, not local buyers
2. **No conversion where users are** — guide pages (28) and area pages (22) have zero/minimal inline CTAs or forms
3. **Trust gap** — no phone, no reviews, no visible identity = visitors won't submit form

---

## Stage 1: Quick Wins (Deploy First)

Trivial-to-low effort. Zero risk. Can all be done in one session.

### T1: Fix calculator JS bug
- **File**: `calculator.html` line 771
- **Bug**: `surfaceSelect` and `areaSize` are undefined — the calculator email form submits empty data
- **Fix**: Use correct variable names (`surface`, `area`)
- **Impact**: Calculator email leads are literally broken right now
- **Status**: [x] DONE (2026-03-30) — fixed undefined vars in calculator.html line 770

### T2: Make phone number optional, add email alternative on quote form
- **File**: `quote.html`
- **Change**: Make phone field optional, add email field as alternative contact method
- **Why**: Many users won't give phone number to unknown site. Email is lower commitment. Calculator page already captures email — main form should too
- **Impact**: HIGH — removes single biggest form friction point
- **Status**: [x] DONE (2026-03-30) — email field added, phone optional, validation updated

### T3: Move quote form above the fold on mobile
- **File**: `quote.html`
- **Problem**: Form is ~600px below top on mobile (1.5 screens of scrolling). Hero section + trust badges + intro text push it down
- **Fix**: Collapse/reduce hero section on mobile, get first form field within 300px of top
- **Impact**: HIGH — users currently may not even see the form on mobile
- **Status**: [x] DONE (2026-03-30) — hero condensed on mobile, trust badges hidden, form within ~300px of top

### T4: Fix duplicate nav CTAs and sticky bar
- **Files**: All pages with nav + sticky CTA bar
- **Problems**:
  - Two "Free Quote" nav links in header (duplicate)
  - Both sticky bar buttons link to /quote (one says "Get Free Quote", other says "Get Quote" — identical destination)
- **Fix**: Remove duplicate nav CTA. Differentiate sticky bar — one button "Get Free Quote" to /quote, other button "Cost Calculator" to /calculator (or remove second button)
- **Impact**: LOW-MEDIUM — less confusion, better UX
- **Status**: [x] DONE (2026-03-30) — duplicate nav removed, sticky bar now "Get Free Quote" + "Call Now: 01737 652 515"

### T5: Add urgency/seasonal messaging sitewide
- **Files**: Service pages, area pages, guide pages, homepage
- **Problem**: Zero urgency triggers anywhere = no reason to act now vs bookmark and forget
- **Fix**: Add seasonal messaging ("Spring 2026 slots filling fast", "Get your patio ready for summer"), limited availability cues, consequence-of-inaction messaging
- **Impact**: MEDIUM — creates reason to act today
- **Status**: [x] DONE (2026-03-30) — urgency blocks on all 60 content pages (9 service verified, 22 area + 28 guide + 1 homepage added)

---

## Stage 2: High Impact Changes (Deploy Second)

Medium effort. These are the changes most likely to generate the first enquiry.

### W1: Embed inline mini-forms on top 10 highest-traffic pages
- **Files**: Top service pages + top area pages + top guide pages
- **What**: Compact 3-field form (name, postcode, email) embedded directly in content — no page transition required
- **Why**: Currently every content page requires 2+ clicks and a page load to reach the form. Each page transition loses 50-70% of visitors. Inline forms capture leads where users already are.
- **Pattern**: Place after first major content section. Match existing site styling. Include trust micro-copy ("Free, no-obligation quote • Response within 2 hours")
- **Target pages** (prioritise by likely traffic):
  1. `driveway-cleaning.html`
  2. `patio-cleaning.html`
  3. `block-paving-cleaning.html`
  4. `areas/redhill.html`
  5. `areas/reigate.html`
  6. `guides/driveway-cleaning-cost-uk.html`
  7. `guides/patio-cleaning-cost-uk.html`
  8. `guides/block-paving-cleaning-cost-uk.html`
  9. `pricing.html`
  10. `calculator.html`
- **Impact**: **HIGHEST** — all 4 reviewers agreed this is the #1 change
- **Status**: [x] DONE (2026-03-30) — 10 inline forms with Web3Forms, unique subject lines per page

### W2: Add inline CTAs + urgency blocks to ALL area pages (22) and guide pages (28)
- **Files**: All `areas/*.html` and `guides/*.html`
- **Problem**: Area pages have ZERO inline CTAs (single button at very bottom after 280+ lines). Guide pages have one weak bridge-cta at bottom only. Service pages already have inline CTAs — area and guide pages don't.
- **Fix**: Copy the `inline-cta` and `urgency-block` pattern from service pages. Place mid-content (after first major section) and near bottom. Guides should have location-aware CTA: "In Surrey? Get your exact price — free quote, 2-hour response"
- **Impact**: HIGH — these pages generate most impressions but have weakest conversion elements
- **Status**: [x] DONE (2026-03-30) — 90 CTAs across 45 pages (20 area + 25 guide, 2 per page)

### W3: Rewrite all 22 area page meta titles and descriptions
- **Files**: All `areas/*.html`
- **Problem**: Every area page uses identical bland template:
  - Title: "Jetwashing [Town] ([Postcode]) | Pressure Washing"
  - Description: "Jetwashing [Town] ([Postcode]). Professional pressure washing for driveways, patios, block paving..."
- **Fix**: Make each unique with urgency + pricing signals:
  - Title: "Jetwashing [Town] | Same Day Service | Free Quote"
  - Description: "Professional jet washing in [Town] from £80. Same-day slots, 2-hour callback. Driveways, patios, block paving. Free no-obligation quote."
- **Impact**: MEDIUM-HIGH — better CTR from SERPs on transactional local queries
- **Status**: [x] DONE (2026-03-30) — all 22 pages with unique titles + descriptions with local details

### W4: Change pricing page "Learn More" to "Get Quote"
- **File**: `pricing.html`
- **Problem**: 6 pricing cards each have "Learn More" button linking to service pages — sends people AWAY from conversion into more content reading
- **Fix**: Change to "Get Quote for [Service]" linking to /quote with service pre-selected (or to inline mini-form if W1 is done)
- **Impact**: MEDIUM — turns pricing browsers into leads instead of sending them deeper into content
- **Status**: [x] DONE (2026-03-30) — all 6 cards now "Get Quote" → /quote

### W5: Pass calculator selections to quote form via URL params
- **Files**: `calculator.html`, `quote.html`
- **Problem**: User calculates a price then clicks "Get an Exact Quote" — lands on blank quote form with none of their selections carried over. Momentum lost.
- **Fix**: "Get Exact Quote" link passes params (`?surface=driveway&area=40&condition=moderate`), quote form reads params and pre-fills service dropdown + adds note to details field
- **Impact**: MEDIUM — preserves user momentum from calculator to form
- **Status**: [x] DONE (2026-03-30) — URL params built dynamically, quote form pre-fills from calculator

---

## Stage 3: Strategic Decisions (Need Owner Input)

These change the business model and require deliberate decisions.

### S1: Add a phone number
- **Finding**: A phone number (`01737 652515`) already exists in `form.js` lines 156 and 163 as a fallback message — but is not displayed anywhere on the site
- **All 4 reviewers agree**: No phone number is the single biggest conversion killer. 60-70% of local trade enquiries come via phone. The "2-hour callback guarantee" is a negative vs competitors who offer immediate phone access.
- **Options**:
  - A) Display the existing number in header, footer, and sticky CTA bar
  - B) Get a free/cheap virtual number (VoIP) if 01737 number isn't suitable
  - C) Keep phone hidden but make the sticky bar phone button a WhatsApp/text link instead
- **Impact**: CRITICAL — transforms site from "anonymous form" to "real business you can call"
- **Owner decision**: [x] Yes, add phone — use 01737 652515
- **Status**: [x] DONE (2026-03-30) — added to header, footer, quote page, homepage, schema on all 69 pages

### S2: Reveal some identity
- **Finding**: The site looks "too polished for a local tradesman" — which makes it MORE suspicious, not less. Affluent Surrey homeowners are cautious about cowboys.
- **Options**:
  - A) Add a first name + area: "Run by [Name] in Redhill" — minimal identity, maximum trust lift
  - B) Add an "About" section with a personal story (no photo/surname needed)
  - C) Keep fully anonymous
- **Impact**: HIGH — even a first name changes perception from "faceless lead farm" to "local person"
- **Owner decision needed**: [ ] Yes, add identity / [ ] No, stay anonymous
- **Status**: [ ] Awaiting decision

---

## Bugs Found During Review

| Bug | File | Severity | Status |
|-----|------|----------|--------|
| Calculator email form sends empty data (undefined vars line 771) | calculator.html | HIGH | [ ] Not fixed |
| Duplicate nav CTAs (two "Free Quote" links) | index.html lines 220-221, calculator.html lines 400-401 | LOW | [ ] Not fixed |
| Both sticky bar buttons go to same page | All pages | LOW | [ ] Not fixed |
| form.js fallback mentions phone number not shown on site | form.js lines 156, 163 | INFO | [ ] Noted |

---

## Metrics to Track

Once changes deploy, monitor in Google Search Console + Web3Forms:
- **Impressions** (currently 350-488/day) — should stay stable or grow
- **Clicks** (currently near-zero?) — should increase with better meta titles
- **Form submissions** (currently 0) — THE metric. Target: 1+ per week
- **Calculator email leads** (currently broken) — should start appearing after T1 fix

---

## Execution Notes

- Deploy stages in order: Stage 1 first, then Stage 2, then S1/S2 when decided
- Each stage should be a team deployment: lead + implementer(s) + validator
- Validator must check: mobile UX, form functionality, clean URLs, schema intact
- After each stage deploy, request re-indexing of modified pages in GSC
- Monitor Web3Forms dashboard for submissions after each deploy
