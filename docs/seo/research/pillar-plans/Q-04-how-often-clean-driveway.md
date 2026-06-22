# Q-04 — How Often Should You Pressure Wash a Driveway UK

**Query**: "How often should you pressure wash a driveway UK"
**Linked page**: `guides/how-often-clean-driveway.html`
**Status**: Cycle 3 — rewrite shipped 2026-05-21
**Priority**: P0 — companion to Q-01, natural follow-on query
**Last touched**: 2026-05-21 (Cycle 3)

---

## Stance / angle

> Every UK guide quotes "every 12 months" — but that's anchored to a UK national rainfall average of ~1,147mm/yr that doesn't apply to Surrey. Wisley (RH1's closest Met Office station) records just 648mm/yr — 43% drier than UK average. Combined with HSE/BS 7976 slip-resistance thresholds (PTV ≥36 = low risk) and manufacturer biocide reapplication intervals (Lithofin Algex: annual), a defensible Surrey cleaning cadence is 18–24 months for most drives, dropping to 12 only for north-facing or heavily shaded surfaces. Cleaning more often than that is overpriced; less than that risks the HSE slip-risk threshold.

## Surrey cleaning-frequency table

**How often to clean a Surrey (RH1) drive — worked out from rainfall, shade and the HSE slip-risk threshold.**

A 4×4 matrix combining:
- Met Office regional rainfall (Wisley 648mm reference vs UK 1,147mm)
- Shade exposure (south-facing, mixed, north-facing, dense shade/under-tree)
- HSE/UKSRG PTV ≥36 minimum (when does moss/algae reduce friction below that?)
- Lithofin Algex annual reapplication as the maintenance cycle anchor

Output: months-between-deep-cleans for each combination, derived from sourced inputs not "industry experience".

## Sources to cite (≥5)

1. Met Office Wisley 1991-2020 (existing — F-001)
2. Met Office UK national rainfall (existing)
3. Lithofin Algex manufacturer technical datasheet — annual reapplication (NEW)
4. UKSRG / BS 7976 pendulum test — PTV ≥36 = low slip risk (NEW)
5. HSE slips & trips guidance — endorses pendulum test methodology (NEW)
6. Marshalls Cleaning & Maintenance Guidelines (existing — F-003)
7. BS 7533-101:2021 (existing)

## Usefulness criteria targeted (need ≥3 of 6) — targeting all 6

- ✅ counterintuitive-insight — Surrey is 43% drier than UK; "every 12 months" advice is wrong for RH1
- ✅ local-temporal-specificity — Wisley 648mm, NW UK comparison, Surrey-specific cadence
- ✅ actionable-recommendation — annual spring biocide + 18-24 month deep clean
- ✅ numeric-specificity — 648mm, 1,147mm, PTV 36, 12-month Algex
- ✅ mistakes-to-avoid — skipping spring biocide, turbo nozzle (Marshalls), letting PTV drop below 36
- ✅ decision-framework — shade × surface × usage matrix → cadence

## Structure

1. Hero — lead with floor-vs-range insight (most UK guides quote 12 months — Surrey is different)
2. Key Facts box — Wisley + Algex + PTV + Marshalls
3. **NEW** "Where the 12-month default comes from — and why Surrey is different" H2
4. **NEW** "How often to clean your Surrey drive" H2 (the original data table for this page)
5. **NEW** "What HSE slip-risk means for outdoor surfaces" H2
6. Keep existing "Frequency by surface type" but re-anchor to the matrix
7. Keep existing "Signs", "Factors", "DIY vs pro", "Consequences", "Season" but cite Lithofin in season
8. **NEW** "## Sources" H2 at end with 7 numbered entries
9. Schema: add `citation` property to Article schema

## Next session

Q-04 complete. Next pick: **Q-03** "Can pressure washing damage block paving" — F-003 Marshalls + BS 7533-101 ready, plus Karcher datasheets give the PSI side.
