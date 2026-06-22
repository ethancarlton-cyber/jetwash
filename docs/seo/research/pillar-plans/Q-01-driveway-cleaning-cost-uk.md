# Q-01 — Driveway Cleaning Cost UK 2026

**Query**: "How much does it cost to clean a driveway UK 2026"
**Linked page**: `guides/driveway-cleaning-cost-uk.html`
**Status**: ✅ **DONE** — research complete AND article rewritten with 7 inline citations, a £/m² cost build-up table, Sources section, schema citations, all 6 of 6 usefulness criteria satisfied. Committed locally on `claude/research-pillar-loop` 2026-05-21 (Cycle 2).
**Priority**: P0 — highest commercial intent in the priorityQueries list
**Last touched**: 2026-05-21 (Cycle 2 — rewrite shipped)

---

## Stance / angle

> Most UK cost guides quote £3–£6/m² as if it's a normal market range. Our first-principles build-up shows £3/m² is the **floor**, not the low end of normal. Anything significantly below £3/m² means the cleaner is either uninsured, skipping pre-treatment / surface cleaner / re-sand, or paying themselves below NLW. This guide gives Surrey homeowners the build-up to spot quotes that don't add up — and the right questions to ask.

This is differentiated from every competitor because they all quote £3-6/m² with no source or methodology. We show the workings.

---

## The £/m² cost build-up table

**First-principles cost build-up for a 40m² block paving driveway in Surrey, 2026.**

Inputs (all sourced):
| Input | Value | Source |
|---|---|---|
| NLW (legal labour floor) | £12.71/hr | gov.uk April 2026 |
| Realistic skilled tradesperson rate | £25-40/hr to client | Phoenix Gray UK construction rates 2026 |
| Karcher K7 water draw | 600 L/hr | Karcher manufacturer datasheet |
| Thames Water tariff (Surrey) | £4.21/m³ combined | Thames Water 2026/27 charges |
| Kiln-dried sand for 40m² | ~25kg bag, ~£8 | Builders merchant retail |
| Pre-treatment biocide | ~£3/job | Lithofin / Resiblock retail |
| Public liability amortised | ~£3/job | Annual £350-500 / 150 jobs |

Build-up:
- Labour (2 hrs @ £30/hr): £60
- Water (1.2 m³ @ £4.21): £5.05
- Consumables (sand + biocide): £11
- Insurance/overhead amortised: £8
- **Direct cost: ~£84 (£2.10/m²)**
- + 25% margin: ~£105 (£2.63/m²)
- + travel + VAT considerations: realistic floor ~£120-£150 (£3.00-£3.75/m²)

This is the table no UK competitor publishes. It's the moat.

---

## Sources to cite (minimum 5)

1. Met Office Wisley 1991-2020 — for Surrey rainfall context
2. Thames Water 2026/27 charges — for water input
3. gov.uk NLW April 2026 — for labour floor
4. Karcher K7 manufacturer datasheet — for water-draw input
5. Marshalls Garden Paving Cleaning & Maintenance Guidelines (Dec 2017) — for technique constraints / mistakes-to-avoid
6. BS 7533-101:2021 — for paving construction context
7. Phoenix Gray UK Construction Labour Rates 2026 — for labour rate (cross-ref)

All in sources-library.md.

---

## Usefulness criteria targeted (need ≥3 of 6)

- ✅ **counterintuitive-insight** — "£3/m² is the floor, not the low end of normal" + "Surrey is drier than UK average (Wisley 648mm vs UK 1147mm)"
- ✅ **local-temporal-specificity** — Thames Water Surrey tariff, Wisley climate, RH1 specifics, named Surrey towns
- ✅ **actionable-recommendation** — "How to spot a sub-floor quote" decision tree + questions to ask
- ✅ **numeric-specificity** — every £ figure now sourced (water £4.21/m³, NLW £12.71/hr, K7 600 L/hr, Wisley 648mm)
- ✅ **mistakes-to-avoid** — turbo nozzle violates Marshalls guidance (200mm min, 30°, medium pressure)
- ⏳ **decision-framework** — adds the "DIY vs pro" decision criteria explicitly with break-even maths

Targeting 5 of 6.

---

## Structure of rewritten article

Keep the existing strong elements (Surrey area focus, table of contents, sticky form, FAQ section, related guides). Add:

1. Hero — keep, but tighten the lede to lead with the floor-vs-range insight
2. Key Facts box — replace one bullet with the Wisley counterintuitive finding
3. **NEW section** "What goes into a £/m² rate — the build-up" — the first-principles table (the original data table for this page)
4. **NEW section** "How to spot a sub-floor quote" — using the build-up to identify red flags
5. Existing "Cost by size" + "Cost by material" — keep, but add inline citation for each range
6. Existing "What's included" + "What pushes the price up" — keep, add Marshalls-cited technique constraints
7. Existing "Surrey prices by area" — keep, add Met Office rainfall context (corrects the moss-frequency framing)
8. Existing "DIY vs pro" — keep, add break-even maths using sourced inputs
9. **NEW section** "## Sources" — list all cited sources with publication, title, URL, accessed date
10. **NEW** — schema additions: add "citation" entries to the Article schema for top 3 sources

---

## Schema changes needed

Existing schema has Article, BreadcrumbList, FAQPage. Add `citation` property to Article schema with the top sources:

```json
"citation": [
  {"@type": "CreativeWork", "name": "Wisley Location Long-Term Averages 1991-2020", "publisher": "Met Office", "url": "https://www.metoffice.gov.uk/research/climate/maps-and-data/location-specific-long-term-averages/gcpevmgzn"},
  {"@type": "CreativeWork", "name": "Thames Water 2026/27 Charges", "publisher": "Thames Water", "url": "https://www.thameswater.co.uk/help/account-and-billing/understand-your-bill/value"},
  {"@type": "CreativeWork", "name": "Marshalls Garden Paving & Driveways Cleaning & Maintenance Guidelines", "publisher": "Marshalls plc", "url": "https://media.marshalls.co.uk/image/upload/v1552901960/cleaning-maintenance-guidelines-marshalls-garden-paving-and-driveways.pdf"}
]
```

---

## Next session pick-up instructions

✅ **Q-01 is DONE** as of 2026-05-21 (Cycle 2). The rewrite shipped with:
- 7 inline `<sup>` citations linking to anchored Sources section entries (`src-wisley`, `src-thames`, `src-nlw`, `src-marshalls`, `src-karcher`, `src-bsi`, `src-phoenix`)
- Two new H2 sections: "The £/m² build-up" (inputs table + maths, introduced in plain trader English) and "How to spot a sub-floor quote" (red-flag checklist)
- Lede rewritten to lead with the floor-vs-range stance
- Key Facts box re-bulleted with sourced Surrey-specific data
- Surrey-prices section gained "One thing the cost guides get wrong about Surrey" subhead with Wisley/Met Office data
- DIY vs pro section gained full break-even maths with Thames Water + Phoenix Gray citations
- Article schema: `citation` property with 6 CreativeWork entries, `dateModified` bumped to 2026-05-21, `inLanguage` added
- Block paving subsection: BS 7533-101:2021 + Marshalls "200mm, 30°, medium-pressure" citations inline

**Next query for the loop**: Q-04 "How often should you pressure wash a driveway UK" — the F-001 Wisley/Met Office finding is the natural backbone for the counterintuitive angle (Surrey at 648mm/yr means 18–24 months not 12), and F-003 Marshalls technique applies. Existing page `guides/how-often-clean-driveway.html` exists; treat it the same way as Q-01.
