# Research-Pillar Loop — Progress Log

Append-only. Newest at top. Each cycle = one entry.

---

## 2026-05-21 — Cycle 4 (COMPLETE) — Q-03 can pressure washing damage block paving — REWRITE SHIPPED

**Query**: Can pressure washing damage block paving
**Page**: `guides/can-pressure-washing-damage-driveway.html`
**Status**: ✅ Rewritten and committed locally on `claude/research-pillar-loop`

**Sources surveyed this cycle**: 0 new — every source needed was already in the Cycle 1/2/3 library (Marshalls, BS 7533-101, Tobermore, Karcher, UKSRG/BS 7976, HSE). This is the first cycle that pays back the upfront research investment.

**What shipped this cycle**:
- 2 brand-new H2 sections inserted near the top: **"Why 'what PSI?' is the wrong question"** (the labelled originalAnalyticalContribution — a 3-row Setup × PSI × Nozzle × Standoff matrix showing why a 3,000 PSI rotary at 200mm is safer than a 1,500 PSI turbo at 50mm) and **"Manufacturer warranty implications"** (Marshalls disclaimer + BS 7533-101 structural framing + HSE PTV liability framing).
- Hero rewritten to lead with the Marshalls technique guidance (medium pressure, 30°, 200mm) rather than the misleading "what PSI" framing every competitor uses.
- Key Facts box re-bulleted to put manufacturer technique + Karcher K7 PSI + BS 7533-101 + HSE PTV up front.
- Block-paving subsection in Safe-PSI table gained inline Marshalls + BS 7533-101 citations.
- `## Sources` H2 at end with 6 numbered entries — Marshalls, BSI BS 7533-101, Tobermore, Kärcher K7, UKSRG BS 7976, HSE slips — each with publication, document title, URL, accessed date 2026-05-21. Each has an id anchor.
- Article schema: `citation` property added (6 CreativeWork entries), bumped `dateModified` to 2026-05-21, added `inLanguage: en-GB`.
- Meta + og + twitter descriptions rewritten (147 chars).

**Validation against researchPillarStandard**:
- ✅ minimumWordCount ≥ 1500 (HTML word count 4,962)
- ✅ openingFormat answer-first (Marshalls technique stated in hero sub within ~30 words)
- ✅ minimumAuthoritativeCitations ≥ 5 (6 distinct sources, 13 inline `<sup>` instances)
- ✅ originalAnalyticalContribution labelled in-page ("Original analytical contribution:" sentence before the PSI×nozzle×standoff matrix)
- ✅ sourcesSectionRequired (## Sources with 6 entries, all required fields)
- ✅ mustSpanSourceClasses ≥ 3 (material manufacturer Marshalls + material manufacturer Tobermore + manufacturer datasheet Kärcher + BS standard BS 7533-101 + trade body UKSRG + .gov.uk HSE = 5 classes)
- ✅ mustIncludeAtLeastOnePrimaryDataSource (BS 7533-101 + Kärcher datasheet + HSE = three)
- ✅ usefulnessCriteria all 6 of 6 satisfied (counterintuitive: PSI is wrong question; local: cites UK manufacturers Marshalls/Tobermore/Brett/Bradstone by name; actionable: ask cleaner for documented technique compliance; numeric: 180 bar, 200mm, 30°, PTV 36; mistakes: turbo nozzle voids warranty; framework: warranty-risk decision criteria)

**Pre-flight checks**:
- ✅ 0 `.html` href violations
- ✅ 8 instances of `01737 652 515` (phone CTA prominent)
- ✅ 3 JSON-LD blocks parse as valid JSON

**Sources newly added to sources-library.md this cycle**: 0 (library reused — first compounding-payback cycle)

**New findings added to findings.md**: 0 (existing F-003 + F-005 + F-006 already cover Q-03)

**Next cycle pick**: **Q-06** "Why does moss grow on driveways in the UK" → `guides/moss-removal-from-driveways.html`. F-001 (Surrey 43% drier) gives the regional angle, F-005 (HSE PTV) gives the safety angle, F-006 (Lithofin Algex annual spring) gives the prevention angle, Marshalls covers the technique side. All sources ready — should be another compounding-payback cycle.

---

## 2026-05-21 — Cycle 3 (COMPLETE) — Q-04 how often clean driveway — REWRITE SHIPPED

**Query**: How often should you pressure wash a driveway UK
**Page**: `guides/how-often-clean-driveway.html`
**Status**: ✅ Rewritten and committed locally on `claude/research-pillar-loop`

**Sources surveyed this cycle (new on top of Cycle 1 library)**:
- ✅ UK Slip Resistance Group — pendulum tester intro (BS 7976) — **CITED**
- ✅ HSE — Slips and trips at work — **CITED**
- ✅ Lithofin — Algex product page + technical info — **CITED**
- ✅ Met Office — Regional values portal (consulted but exact 30-yr regional averages not directly downloadable from the public table; cited Wisley as Surrey reference)
- ✅ Velocity Safety + Slip Audit + Grestec + Munro Instruments (consulted for PTV threshold cross-reference, NOT cited — they reference HSE/UKSRG which we cite directly)
- ✅ Marshalls technical info hub (consulted to confirm cleaning frequency guidance; specific quote on shaded paving extracted from the existing Marshalls Dec 2017 PDF)
- Survey total this cycle: 7 new sources consulted, 3 cited (plus 3 reused from Cycle 1 library = 6 total citations in article)

**What shipped this cycle**:
- 3 brand-new H2 sections inserted before the existing surface-frequency table: **"Why the generic UK advice doesn't apply to Surrey"** (Met Office Wisley 648mm vs UK 1,147mm), **"The Surrey cleaning cadence matrix"** (the labelled originalAnalyticalContribution — 4 shade × 3 surface = 12-cell matrix derived from rainfall + Lithofin reapplication + HSE PTV threshold), **"What HSE slip-risk means for your drive"** (BS 7976 PTV thresholds and how moss/algae contamination drops the wet-PTV).
- Hero lede rewritten to lead with the Surrey 43%-drier stance.
- Key Facts box re-bulleted with Wisley + Algex + HSE PTV + Marshalls.
- "Factors" section: each subhead now has an inline citation (Marshalls on shade, Wisley on climate, UKSRG on oil slip-risk, BS 7533-101 on sealing).
- "Season" section: now anchored to the Lithofin manufacturer "preferably in spring" guidance with cite.
- `## Sources` H2 at end with 6 numbered entries (each with publication, document title, URL, accessed date 2026-05-21) — `src-wisley`, `src-lithofin`, `src-uksrg`, `src-hse`, `src-marshalls`, `src-bsi`.
- Article schema: `citation` property added (6 CreativeWork entries), bumped `dateModified` to 2026-05-21, added `inLanguage: en-GB`, rewrote description to reflect the cadence-matrix angle.
- Meta + og + twitter descriptions rewritten to lead with "18-24 months, not the generic UK 12".

**Validation against researchPillarStandard**:
- ✅ minimumWordCount ≥ 1500 (HTML word count 4,106; rendered prose well above 1,500)
- ✅ openingFormat answer-first (Surrey-specific cadence stated in first ~30 words of lede)
- ✅ minimumAuthoritativeCitations ≥ 5 (6 distinct sources, 17 inline `<sup>` instances)
- ✅ originalAnalyticalContribution labelled in-page ("Original analytical contribution:" sentence before the cadence matrix)
- ✅ sourcesSectionRequired (## Sources with 6 entries, all required fields)
- ✅ mustSpanSourceClasses ≥ 3 (gov.uk HSE + BS standard BS 7976 + manufacturer datasheet Lithofin + material manufacturer Marshalls + .gov.uk Met Office = 5 classes)
- ✅ mustIncludeAtLeastOnePrimaryDataSource (Met Office Wisley + HSE + Lithofin = three)
- ✅ usefulnessCriteria all 6 of 6 satisfied (counterintuitive: 43% drier; local: Wisley/Surrey; actionable: matrix + spring biocide; numeric: 648mm, 1147mm, PTV 36, 12 months Algex; mistakes: skipping spring biocide + turbo nozzle; framework: cadence matrix)

**Pre-flight checks**:
- ✅ 0 `.html` href violations
- ✅ 8 instances of `01737 652 515` (phone CTA prominent)
- ✅ 3 JSON-LD blocks parse as valid JSON (Article + BreadcrumbList + FAQPage)

**Sources newly added to sources-library.md this cycle**: 3
- Lithofin ALGEX (manufacturer datasheet, re-usable for Q-06/Q-11/Q-14/Q-15)
- BS 7976 via UKSRG (BS standard, re-usable for Q-06/Q-11 + all service pages)
- HSE Slips & Trips (.gov.uk, re-usable for Q-06/Q-11 + all service pages)

**New findings added to findings.md**: 2
- F-005 (HSE / BS 7976 PTV ≥36 is the wet-surface slip-risk threshold) — used across Q-04/Q-06/Q-11 + all service pages
- F-006 (Lithofin Algex manufacturer guidance: annual spring biocide) — used across Q-04/Q-06/Q-11/Q-14/Q-15

**Next cycle pick**: **Q-03** "Can pressure washing damage block paving" → `guides/can-pressure-washing-damage-driveway.html`. F-003 (Marshalls 200mm/30°/medium-pressure) is the primary angle, BS 7533-101 covers the structural side, Karcher datasheets cover the PSI threshold. F-005 (HSE PTV) gives a secondary safety angle. Strong candidate because Q-05 (best PSI for block paving) is the natural pair — both could share the same Karcher datasheet expansion.

---

## 2026-05-21 — Cycle 2 (COMPLETE) — Q-01 driveway cleaning cost UK — REWRITE SHIPPED

**Query**: How much does it cost to clean a driveway UK 2026
**Page**: `guides/driveway-cleaning-cost-uk.html`
**Status**: ✅ Rewritten and committed locally on `claude/research-pillar-loop`

**What shipped this cycle**:
- 2 new H2 sections inserted before existing content: **"The £/m² build-up: where the £3 floor comes from"** (the labelled originalAnalyticalContribution — first-principles inputs table + maths for a 40m² Surrey block paving drive) and **"How to spot a sub-floor quote"** (red-flag checklist using the build-up).
- Hero lede rewritten to lead with the floor-vs-range insight (not the generic £3–£6/m² framing every competitor uses).
- Key Facts box re-bulleted: Wisley 648mm + Thames Water £4.21/m³ + NLW £12.71/hr now front-and-centre.
- Surrey prices section: added "One thing the cost guides get wrong about Surrey" subhead — Met Office Wisley data shows Surrey is 43% drier than UK average, so cleaning frequency is 18–24 months not 12, materially lowering £/yr cost.
- DIY vs pro: replaced bullet comparison with full break-even maths citing Thames Water + Phoenix Gray labour rates.
- Block paving subsection in Cost-by-material: added BS 7533-101:2021 citation + Marshalls "200mm, 30°, medium-pressure" quote.
- New `## Sources` section at end with 7 numbered entries (publication, document title, accessed date 2026-05-21), each with an `id` anchor (`src-wisley`, `src-thames`, etc.) so the inline `<sup>` citations link to them.
- Article schema: added `citation` property (6 entries), bumped `dateModified` to 2026-05-21, added `inLanguage: en-GB`, rewrote description to reflect the first-principles angle.
- Meta description + og:description + twitter:description rewritten to lead with the floor-vs-range stance (138 chars).

**Validation against researchPillarStandard**:
- ✅ minimumWordCount ≥ 1500 (HTML word count 6,050; rendered prose well above 1,500)
- ✅ openingFormat answer-first (£3/m² floor stated in the first 22 words of the lede)
- ✅ minimumAuthoritativeCitations ≥ 5 (7 inline <sup> citations to acceptedSourceClasses — Met Office, Thames Water, gov.uk, Marshalls, Karcher, BSI, Phoenix Gray)
- ✅ originalAnalyticalContribution labelled in-page ("Original analytical contribution:" sentence before the build-up table)
- ✅ sourcesSectionRequired (## Sources with 7 entries, each with publication + title + URL + accessed date)
- ✅ mustSpanSourceClasses ≥ 3 (gov.uk + BS/EN standard + manufacturer datasheet + material manufacturer + utility tariff = 5 classes)
- ✅ mustIncludeAtLeastOnePrimaryDataSource (Met Office Wisley 1991-2020 + Thames Water 2026/27 + gov.uk NLW = three)
- ✅ usefulnessCriteria all 6 of 6 satisfied (counterintuitive: £3 is floor + Surrey drier than UK; local: Wisley/Thames; actionable: red-flag checklist; numeric: every £ sourced; mistakes: turbo nozzle violates Marshalls; framework: DIY vs pro break-even)

**Pre-flight checks**:
- ✅ 0 `.html"` occurrences in href attributes (clean URLs maintained)
- ✅ 8 instances of `01737 652 515` (phone CTA prominent — header, hero, footer, sticky bar, sources tag, FAQ-area "or call")
- ✅ 3 JSON-LD blocks all parse as valid JSON (Article + BreadcrumbList + FAQPage)

**Sources newly added to sources-library.md this cycle**: none — all 8 sources from Cycle 1 were used; the article validates the existing library rather than expanding it.

**Findings status**: F-001 (Surrey rainfall), F-002 (£3 floor), F-003 (Marshalls technique), F-004 (Thames Water premium) all cited in the rewritten article. No new findings added this cycle.

**Next cycle pick**: Q-04 "How often should you pressure wash a driveway UK" — recommended because F-001 (Wisley 648mm) already makes it the easiest counterintuitive-insight win using research already in the library. Existing page `guides/how-often-clean-driveway.html` exists but needs the same treatment.

---

## 2026-05-20 — Cycle 1 (in progress) — Q-01 driveway cleaning cost UK

**Query**: How much does it cost to clean a driveway UK 2026
**Existing page**: `guides/driveway-cleaning-cost-uk.html` (4500 words, 0 citations)
**Status**: In progress — research complete, writing the article

**Stance/angle decided**: "Most UK cost guides quote £3–£6/m² as if it's a market average. The real story is a *floor* — anything significantly below £3/m² implies corner-cutting (no insurance, no pre-treatment, no surface cleaner, sub-minimum-wage labour). This guide builds the £/m² from first principles using ONS labour rates, Thames Water tariffs, and Karcher manufacturer specs — so readers can spot quotes that don't add up."

**Original analytical contribution**: First-principles cost build-up table for a 40m² block paving driveway in Surrey 2026 — labour + materials + water + insurance + margin = defensible floor of ~£120–£150. No UK competitor publishes this calculation.

**Sources surveyed (≥20)**: 8 done in cycle (see sources-library.md), 12 more to add as I write
- Checkatrade, MyJobQuote, Pureseal Services (competitor blogs — discovery only, NOT cited)
- Karcher manufacturer datasheets (K5, K7) — cited
- Marshalls Cleaning & Maintenance Guidelines (PDF Dec 2017) — cited
- Thames Water 2026/27 charges — cited
- ONS / PayScale / Phoenix Gray construction labour rates 2026 — cited
- Met Office Wisley (Surrey) 1991-2020 averages — cited
- BS 7533-101:2021 (BSI) — cited
- BSI thenbs.com publication index — discovery

**Sources cited target**: 7+ (above the 5 minimum)

**Usefulness criteria targeted**: at least 4 of 6
- ✅ counterintuitive-insight: Surrey is drier than UK average (648mm Wisley vs 1147mm UK), corrects "wet UK" framing for moss regrowth
- ✅ local-temporal-specificity: Wisley Met Office, Thames Water Surrey tariff, RH1-specific
- ✅ actionable-recommendation: how to spot a sub-floor quote (£<3/m² red flag), what to ask
- ✅ numeric-specificity: every £ figure now sourced (water £4.21/m³, NLW £12.71/hr, K7 600L/hr, etc.)
- ✅ mistakes-to-avoid: turbo nozzle voids Marshalls guidance (200mm min, 30°, medium pressure only)

**Recordkeeping files seeded this cycle**: README.md, progress-log.md (this file), sources-library.md, findings.md, pillar-plans/Q-01-driveway-cleaning-cost-uk.md

**Result**: To be filled in on commit — file path, word count, citation count, commit SHA
